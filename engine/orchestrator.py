"""
LG Factory Engine — Orchestrator v0.2
SPEC-003 §1-3, 9-10: 6-moment flow, dependency graph, main loop.

The Orchestrator does exactly 6 things:
1. Resolve execution order (what PM runs next, based on 6-moment flow)
2. Prepare inputs (gather outputs from completed PMs)
3. Dispatch to PM Runner (send prompt, receive output)
4. Manage gates (pause at G0-G6, present options)
5. Manage confirmations (ask about optional products C-1-C-5)
6. Persist state (save after every event)
"""

import json
import random
import time
from datetime import datetime
from pathlib import Path

from engine.models import (
    RunState, RunStatus, UnitState, PMDefinition, ProgramConfig,
    PMOutput, HumanDecision, NextAction, GateId, DecisionType,
    DecisionSource, Archetype, ArchetypeProfile, VersionInfo,
    Severity, ErrorEntry, ProductCategory,
)
from engine.state import StateManager
from engine.pm_runner import run_pm, load_prompt_template, compute_hash
from engine.checkpoints import CheckpointHandler, CLICheckpointHandler
from engine.adapters.base import LLMAdapter

CONFIG_DIR = Path(__file__).parent.parent / "config"

# Phase 2 execution order (SPEC-003 §3)
PHASE_2_ORDER = [
    "PM-2.1", "PM-2.2", "PM-2.3", "PM-2.4", "PM-2.5",
    "PM-2.6", "PM-2.7", "PM-2.8", "PM-2.9", "PM-2.10",
]

# Optional Achiever's Outputs (Moment 4)
ACHIEVERS_OPTIONAL = ["PM-3.3", "PM-3.4", "PM-4.2"]

# Optional Instructor's Playbook (Moment 5)
PLAYBOOK_OPTIONAL = ["PM-3.1", "PM-3.2"]

# Confirmation IDs mapped to PM IDs
CONFIRMATION_MAP = {
    "PM-3.3": "C-1",
    "PM-3.4": "C-2",
    "PM-4.2": "C-3",
    "PM-3.1": "C-4",
    "PM-3.2": "C-5",
}


def load_registry() -> dict:
    """Load PM registry from config."""
    path = CONFIG_DIR / "pm-registry.json"
    data = json.loads(path.read_text(encoding='utf-8'))
    registry = {}
    for pm_id, pm_data in data.items():
        registry[pm_id] = PMDefinition(
            id=pm_data["id"],
            name=pm_data["name"],
            phase=pm_data["phase"],
            prompt_template=pm_data["prompt_template"],
            inputs=None,
            outputs=None,
            dependencies=pm_data.get("dependencies", []),
            checkpoint=GateId(pm_data["checkpoint"]) if pm_data.get("checkpoint") else None,
            is_transversal=pm_data.get("is_transversal", False),
            is_per_unit=pm_data.get("is_per_unit", True),
            max_output_tokens=pm_data.get("max_output_tokens", 6000),
            optional=pm_data.get("optional", False),
            auto_generate=pm_data.get("auto_generate", False),
            product_category=ProductCategory(pm_data["product_category"]) if pm_data.get("product_category") else None,
            auto_archetype_rule=pm_data.get("auto_archetype_rule"),
            insert_locations=pm_data.get("insert_locations", ["learning_guide"]),
        )
    return registry


def load_archetypes() -> dict:
    """Load archetypes registry from config."""
    path = CONFIG_DIR / "archetypes.json"
    return json.loads(path.read_text(encoding='utf-8'))


def has_decision(state: RunState, gate_id: str) -> bool:
    """Check if a gate decision has been recorded."""
    return any(d.gate.value == gate_id for d in state.decisions)


def is_skipped(state: RunState, pm_id: str) -> bool:
    """Check if an optional product was skipped (asked but rejected)."""
    return pm_id in state.rejected_products


def is_confirmed(state: RunState, pm_id: str) -> bool:
    """Check if an optional product was confirmed."""
    return pm_id in state.confirmed_products


def is_asked(state: RunState, pm_id: str) -> bool:
    """Check if the instructor has already been asked about this product."""
    return pm_id in state.asked_products


# ══════════════════════════════════════════════════════════════════
#  RESOLVE_NEXT — 6-MOMENT FLOW (SPEC-003 §10)
# ══════════════════════════════════════════════════════════════════

def resolve_next(state: RunState, registry: dict) -> NextAction:
    """
    The scheduler — determines what happens next based on the current moment.

    MOMENTO 1: Topic Creation (PM-1.1 → G0)
    MOMENTO 2: Setting the Universe (PM-1.2 → G1)
    MOMENTO 3: Building the LG (PM-2.1–2.10 + PM-4.1, per unit)
    MOMENTO 4: Achiever's Outputs (optional: PM-3.3, PM-3.4, PM-4.2)
    MOMENTO 5: Instructor's Playbook (optional: PM-3.1, PM-3.2)
    MOMENTO 6: Validation & Export
    """

    # ─── MOMENTO 1: Topic Creation ───────────────────────────
    if state.current_moment == 1:
        if "PM-1.1" not in state.completed_pms:
            return NextAction(type="run_pm", pm_id="PM-1.1", unit=None)
        if not has_decision(state, "G0"):
            return NextAction(type="checkpoint", gate=GateId.G0)
        # Advance to moment 2
        state.current_moment = 2

    # ─── MOMENTO 2: Setting the Universe ─────────────────────
    if state.current_moment == 2:
        if "PM-1.2" not in state.completed_pms:
            return NextAction(type="run_pm", pm_id="PM-1.2", unit=None)
        if not has_decision(state, "G1"):
            return NextAction(type="checkpoint", gate=GateId.G1)
        # Advance to moment 3
        state.current_moment = 3

    # ─── MOMENTO 3: Building the LG (per unit) ──────────────
    if state.current_moment == 3:
        current_unit = state.current_unit

        # Find next pending unit if current is done
        if current_unit is not None:
            unit_key = str(current_unit)
            if unit_key not in state.unit_states:
                state.unit_states[unit_key] = UnitState(
                    unit_number=current_unit, status="in_progress"
                )
            unit_state = state.unit_states[unit_key]

            # Check Phase 2 PMs for this unit
            for pm_id in PHASE_2_ORDER:
                if pm_id not in unit_state.completed_pms:
                    pm_def = registry.get(pm_id)
                    if pm_def:
                        deps_met = all(
                            dep in unit_state.completed_pms or dep == "PM-1.2"
                            for dep in pm_def.dependencies
                        )
                        if deps_met:
                            return NextAction(type="run_pm", pm_id=pm_id, unit=current_unit)

            # All Phase 2 PMs done for this unit → generate PM-4.1
            phase2_done = all(p in unit_state.completed_pms for p in PHASE_2_ORDER)
            if phase2_done and "PM-4.1" not in unit_state.completed_pms:
                return NextAction(type="run_pm", pm_id="PM-4.1", unit=current_unit)

            # Mark unit as phase2 complete
            if "PM-4.1" in unit_state.completed_pms:
                unit_state.status = "phase2_complete"

        # Find next unit to process
        if state.program:
            for unit_spec in state.program.units:
                unit_key = str(unit_spec.number)
                if unit_key not in state.unit_states or state.unit_states[unit_key].status == "pending":
                    state.current_unit = unit_spec.number
                    state.unit_states[unit_key] = UnitState(
                        unit_number=unit_spec.number, status="in_progress"
                    )
                    return NextAction(type="run_pm", pm_id="PM-2.1", unit=unit_spec.number)

        # All units complete → advance to moment 4
        state.current_moment = 4

    # ─── MOMENTO 4: Achiever's Outputs (optional) ───────────
    if state.current_moment == 4:
        for pm_id in ACHIEVERS_OPTIONAL:
            if is_skipped(state, pm_id):
                continue
            if is_confirmed(state, pm_id):
                # Check if it's been generated
                if pm_id not in state.completed_pms:
                    return NextAction(type="run_pm", pm_id=pm_id, unit=None)
                continue
            if not is_asked(state, pm_id):
                return NextAction(
                    type="confirm_optional",
                    pm_id=pm_id,
                    confirmation_id=CONFIRMATION_MAP[pm_id],
                )
        # All Achiever's handled → advance to moment 5
        state.current_moment = 5

    # ─── MOMENTO 5: Instructor's Playbook (optional) ────────
    if state.current_moment == 5:
        # PM-3.1
        if not is_skipped(state, "PM-3.1"):
            if not is_asked(state, "PM-3.1"):
                return NextAction(
                    type="confirm_optional",
                    pm_id="PM-3.1",
                    confirmation_id="C-4",
                )
            if is_confirmed(state, "PM-3.1") and "PM-3.1" not in state.completed_pms:
                return NextAction(type="run_pm", pm_id="PM-3.1", unit=None)

        # PM-3.2 (only if PM-3.1 was generated)
        if "PM-3.1" in state.completed_pms:
            if not is_skipped(state, "PM-3.2"):
                if not is_asked(state, "PM-3.2"):
                    return NextAction(
                        type="confirm_optional",
                        pm_id="PM-3.2",
                        confirmation_id="C-5",
                    )
                if is_confirmed(state, "PM-3.2") and "PM-3.2" not in state.completed_pms:
                    return NextAction(type="run_pm", pm_id="PM-3.2", unit=None)

        # All Playbook handled → advance to moment 6
        state.current_moment = 6

    # ─── MOMENTO 6: Validation & Export ──────────────────────
    if state.current_moment == 6:
        if state.validation is None:
            return NextAction(type="validate")
        if state.validation.status != "critical_errors":
            # PM-3.6: GFPI-F-135 Integrator (per unit)
            if state.program:
                for unit_spec in state.program.units:
                    unit_key = str(unit_spec.number)
                    if unit_key in state.unit_states:
                        if "PM-3.6" not in state.unit_states[unit_key].completed_pms:
                            return NextAction(type="run_pm", pm_id="PM-3.6", unit=unit_spec.number)
            return NextAction(type="export")

    return NextAction(type="done")


# ══════════════════════════════════════════════════════════════════
#  INPUT RESOLUTION
# ══════════════════════════════════════════════════════════════════

def resolve_inputs(
    pm_def: PMDefinition, state: RunState, unit_number: int,
    registry: dict,
) -> dict:
    """Gather inputs for a PM from completed outputs."""
    inputs = {}
    unit_key = str(unit_number) if unit_number else "global"
    unit_state = state.unit_states.get(unit_key, UnitState(unit_number or 0))

    # Always include program-level data
    if state.program:
        inputs["program_name"] = state.program.name
        inputs["cefr"] = state.program.cefr_level.value if hasattr(state.program.cefr_level, 'value') else str(state.program.cefr_level)
        if state.program.universe:
            chars = "\n".join(f"- {c.name} ({c.role})" for c in state.program.universe.characters)
            inputs["universe"] = f"{state.program.universe.company}, {state.program.universe.location}\n{chars}"

    # Unit-level data
    if unit_number and state.program:
        unit_spec = None
        for u in state.program.units:
            if u.number == unit_number:
                unit_spec = u
                break
        if unit_spec:
            inputs["unit_number"] = str(unit_spec.number)
            inputs["unit_name"] = unit_spec.name
            inputs["grammar_targets"] = ", ".join(unit_spec.grammar_targets)
            inputs["key_vocabulary"] = ", ".join(v.term for v in unit_spec.vocabulary[:20])
            if unit_spec.stories:
                inputs["authentic_source"] = "; ".join(s.title for s in unit_spec.stories[:2])

    # Previous PM outputs from unit
    for dep_pm_id in pm_def.dependencies:
        if dep_pm_id == "PM-1.2":
            continue
        dep_output = unit_state.completed_pms.get(dep_pm_id)
        if dep_output:
            inputs[f"{dep_pm_id.lower().replace('.', '_')}_output"] = dep_output.worksheet[:1000]

    # All phase 2 outputs for dependent PMs (PM-3.x, PM-4.x)
    if any(d in PHASE_2_ORDER for d in pm_def.dependencies):
        phase2_outputs = {}
        for p in PHASE_2_ORDER:
            if p in unit_state.completed_pms:
                phase2_outputs[p] = unit_state.completed_pms[p].worksheet[:500]
        inputs["previous_context"] = json.dumps(phase2_outputs, indent=2)
        inputs["all_phase2_outputs"] = phase2_outputs
        inputs["all_pm2_outputs"] = phase2_outputs

    # Global completed PMs
    if pm_def.id in ("PM-3.1", "PM-3.2", "PM-3.3", "PM-3.4", "PM-4.2"):
        all_outputs = {}
        for us in state.unit_states.values():
            for pid, pout in us.completed_pms.items():
                if pid.startswith("PM-2.") or pid == "PM-4.1":
                    all_outputs[f"{pid}_unit{us.unit_number}"] = pout.worksheet[:500]
        inputs["all_unit_outputs"] = json.dumps(all_outputs, indent=2)

    # PM-4.1 output for PM-3.1 (dual insertion)
    if pm_def.id == "PM-3.1":
        pm41_outputs = {}
        for us in state.unit_states.values():
            if "PM-4.1" in us.completed_pms:
                pm41_outputs[f"unit_{us.unit_number}"] = us.completed_pms["PM-4.1"].worksheet[:1000]
        inputs["pm_4_1_output"] = json.dumps(pm41_outputs, indent=2)

    # GFPI sections for PM-3.6
    if pm_def.id == "PM-3.6":
        gfpi_sections = {}
        for pid, pout in state.completed_pms.items():
            if pout.gfpi_section:
                gfpi_sections[f"Global_{pid}"] = pout.gfpi_section
        if unit_state:
            for pid, pout in unit_state.completed_pms.items():
                if pout.gfpi_section:
                    gfpi_sections[f"Unit_{pid}"] = pout.gfpi_section
        inputs["all_gfpi_sections"] = json.dumps(gfpi_sections, indent=2)

    return inputs


# ══════════════════════════════════════════════════════════════════
#  AUTO ARCHETYPE SELECTION (PM-3.4, PM-4.2)
# ══════════════════════════════════════════════════════════════════

def auto_select_archetypes(
    pm_def: PMDefinition, state: RunState, archetypes_data: dict,
) -> list[Archetype]:
    """
    Select archetypes automatically for auto-generate PMs.
    PM-3.4: 2 archetypes per source PM (PM-2.3 to PM-2.10)
    PM-4.2: 1 archetype per source PM (PM-2.3 to PM-2.10)
    """
    profile = state.program.archetype_profile if state.program else ArchetypeProfile.BALANCED
    profile_rules = archetypes_data.get("profiles", {}).get(
        profile.value if hasattr(profile, 'value') else str(profile), {}
    ).get("rules", {})

    count_per_pm = 2 if pm_def.id == "PM-3.4" else 1
    selected = []

    for source_pm_id in PHASE_2_ORDER:
        if source_pm_id in ("PM-2.1", "PM-2.2"):
            continue  # PM-3.4 and PM-4.2 use PM-2.3 to PM-2.10

        pm_archetypes = archetypes_data.get("archetypes", {}).get(source_pm_id, [])
        if not pm_archetypes:
            continue

        # Use profile preference if available
        if source_pm_id in profile_rules:
            preferred_ids = profile_rules[source_pm_id]
            for arch_id in preferred_ids[:count_per_pm]:
                match = next((a for a in pm_archetypes if a["id"] == arch_id), None)
                if match:
                    selected.append(Archetype(
                        id=match["id"], name=match["name"],
                        pm_id=source_pm_id, description=match["description"],
                    ))
        else:
            # Fallback: pick first N
            for a in pm_archetypes[:count_per_pm]:
                selected.append(Archetype(
                    id=a["id"], name=a["name"],
                    pm_id=source_pm_id, description=a["description"],
                ))

    return selected


# ══════════════════════════════════════════════════════════════════
#  ARCHETYPE SELECTION (G2 gate)
# ══════════════════════════════════════════════════════════════════

def get_archetype_for_pm(
    pm_id: str, unit_number: int, state: RunState,
    archetypes_data: dict, checkpoint_handler: CheckpointHandler,
    registry: dict,
) -> tuple:
    """Get archetype selection for a PM — profile auto or human gate."""
    pm_archetypes = archetypes_data.get("archetypes", {}).get(pm_id, [])
    if not pm_archetypes:
        return None, None

    # Convert to Archetype objects
    archetypes = [
        Archetype(
            id=a["id"], name=a["name"], pm_id=pm_id, description=a["description"],
            interactivity=a.get("interactivity", "medium"),
            generation_complexity=a.get("generation_complexity", "moderate"),
        )
        for a in pm_archetypes
    ]

    # Get profile suggestion
    profile = state.program.archetype_profile if state.program else ArchetypeProfile.MANUAL
    profile_rules = archetypes_data.get("profiles", {}).get(
        profile.value if hasattr(profile, 'value') else str(profile), {}
    ).get("rules", {})
    profile_suggestion = None
    if pm_id in profile_rules:
        for arch_id in profile_rules[pm_id]:
            if any(a.id == arch_id for a in archetypes):
                profile_suggestion = arch_id
                break

    # If not manual mode and profile has suggestion, auto-select
    if profile != ArchetypeProfile.MANUAL and profile_suggestion:
        selected_arch = next(a for a in archetypes if a.id == profile_suggestion)
        return selected_arch, profile_suggestion

    # Manual mode — human selects at G2
    pm_def = registry.get(pm_id)
    pm_name = pm_def.name if pm_def else pm_id
    unit_name = ""
    if state.program:
        for u in state.program.units:
            if u.number == unit_number:
                unit_name = u.name
                break

    selection = checkpoint_handler.present_archetype_selection(
        pm_id, pm_name, archetypes, unit_name, profile_suggestion,
    )

    selected_arch = next((a for a in archetypes if a.id == selection.archetype_id), archetypes[0])
    return selected_arch, selection.archetype_id


# ══════════════════════════════════════════════════════════════════
#  MAIN PIPELINE LOOP
# ══════════════════════════════════════════════════════════════════

def run_pipeline(
    program_config: ProgramConfig,
    adapter: LLMAdapter,
    checkpoint_handler: CheckpointHandler = None,
    state_manager: StateManager = None,
    dry_run: bool = False,
    profile: ArchetypeProfile = None,
    skip_checkpoints: bool = False,
):
    """SPEC-003 §9: Main pipeline loop — 6-moment flow."""

    if checkpoint_handler is None:
        checkpoint_handler = CLICheckpointHandler()
    if state_manager is None:
        state_manager = StateManager()

    # Load configs
    registry = load_registry()
    archetypes_data = load_archetypes()

    # Apply profile if specified
    if profile:
        program_config.archetype_profile = profile

    # In dry run, skip all checkpoints
    if dry_run:
        skip_checkpoints = True

    # Create or load state
    state = state_manager.create_run(program_config.id)
    state.program = program_config
    state.status = RunStatus.RUNNING
    state_manager.save(state)

    print(f"\n{'='*60}")
    print(f"  LG FACTORY ENGINE v0.2")
    print(f"  Program: {program_config.name}")
    print(f"  Units: {len(program_config.units)}")
    print(f"  Profile: {program_config.archetype_profile.value if hasattr(program_config.archetype_profile, 'value') else program_config.archetype_profile}")
    print(f"  Run ID: {state.run_id[:8]}")
    print(f"  Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"  Flow: 6-moment conversational")
    print(f"{'='*60}")

    start_time = time.time()

    while state.status in (RunStatus.RUNNING, RunStatus.WAITING_HUMAN, RunStatus.WAITING_CONFIRMATION):

        # Resume from waiting states
        if state.status == RunStatus.WAITING_HUMAN:
            state.status = RunStatus.RUNNING
        if state.status == RunStatus.WAITING_CONFIRMATION:
            state.status = RunStatus.RUNNING

        # 1. Determine next action
        action = resolve_next(state, registry)

        if action.type == "done":
            state.status = RunStatus.COMPLETE
            state_manager.save(state)
            break

        # ─── RUN PM ──────────────────────────────────────
        if action.type == "run_pm":
            pm_def = registry.get(action.pm_id)
            if not pm_def:
                print(f"  ERROR: PM {action.pm_id} not in registry")
                state.status = RunStatus.ERROR
                state_manager.save(state)
                break

            unit_num = action.unit or 0
            unit_key = str(unit_num) if unit_num else "global"

            # Handle archetype selection
            selected_arch, arch_desc = None, ""

            if pm_def.auto_generate:
                # Auto-select archetypes (PM-3.4, PM-4.2)
                auto_archetypes = auto_select_archetypes(pm_def, state, archetypes_data)
                arch_desc = f"Auto-selected: {len(auto_archetypes)} archetypes"
                print(f"\n  → Auto-generating {action.pm_id}: {pm_def.name}")
                print(f"    {pm_def.auto_archetype_rule}")
            elif pm_def.is_transversal:
                arch_desc = "Transversal — no archetype"
            elif not skip_checkpoints and pm_def.checkpoint == GateId.G2:
                selected_arch, arch_desc = get_archetype_for_pm(
                    action.pm_id, unit_num, state, archetypes_data,
                    checkpoint_handler, registry,
                )
            else:
                # Auto-select from profile
                profile_rules = archetypes_data.get("profiles", {}).get(
                    program_config.archetype_profile.value if hasattr(program_config.archetype_profile, 'value') else str(program_config.archetype_profile),
                    {}
                ).get("rules", {})
                pm_archetypes = archetypes_data.get("archetypes", {}).get(action.pm_id, [])
                if action.pm_id in profile_rules and pm_archetypes:
                    for arch_id in profile_rules[action.pm_id]:
                        match = next((a for a in pm_archetypes if a["id"] == arch_id), None)
                        if match:
                            selected_arch = Archetype(
                                id=match["id"], name=match["name"],
                                pm_id=action.pm_id, description=match["description"],
                            )
                            arch_desc = f"{match['id']}) {match['name']} — {match['description']}"
                            break
                if not selected_arch and pm_archetypes:
                    a = pm_archetypes[0]
                    selected_arch = Archetype(
                        id=a["id"], name=a["name"],
                        pm_id=action.pm_id, description=a["description"],
                    )
                    arch_desc = f"{a['id']}) {a['name']} — {a['description']}"

            # Resolve inputs
            inputs = resolve_inputs(pm_def, state, unit_num, registry)

            # Execute PM
            state.current_pm = action.pm_id
            state_manager.save(state)

            print(f"\n  → Executing {action.pm_id}: {pm_def.name} (Unit {unit_num}) [Moment {state.current_moment}]")

            try:
                output = run_pm(
                    pm_def=pm_def,
                    inputs=inputs,
                    adapter=adapter,
                    archetype=selected_arch,
                    archetype_desc=arch_desc,
                    dry_run=dry_run,
                )

                # Store output
                if pm_def.is_per_unit:
                    if unit_key not in state.unit_states:
                        state.unit_states[unit_key] = UnitState(unit_number=unit_num)
                    state.unit_states[unit_key].completed_pms[action.pm_id] = output
                else:
                    state.completed_pms[action.pm_id] = output

                # Save worksheet to disk
                file_paths = state_manager.save_worksheet_content(
                    state, action.pm_id, unit_num,
                    output.worksheet, output.gfpi_section,
                )
                output.file_path = str(file_paths["worksheet"])

                # Update metering
                if state.metering:
                    state.metering.total_tokens += output.tokens_consumed
                    state.metering.total_api_calls += 1
                    state.metering.cost_estimate_usd += output.tokens_consumed * 0.000005

                state.current_pm = None
                state_manager.save(state)
                print(f"  ✓ {action.pm_id} complete ({output.tokens_consumed} tokens)")

            except Exception as e:
                error = ErrorEntry(
                    timestamp=datetime.utcnow(),
                    severity=Severity.CRITICAL,
                    message=str(e),
                    pm_id=action.pm_id,
                    unit_number=unit_num,
                )
                state.error_log.append(error)
                state.current_pm = None
                state_manager.save(state)

                if checkpoint_handler.ask_retry(action.pm_id, str(e)):
                    continue
                else:
                    state.status = RunStatus.ERROR
                    state_manager.save(state)
                    break

        # ─── CHECKPOINT (G0-G6) ──────────────────────────
        elif action.type == "checkpoint":
            state.status = RunStatus.WAITING_HUMAN
            state_manager.save(state)

            print(f"\n  ⏸  Gate {action.gate.value} — waiting for human decision...")

            if action.gate == GateId.G0:
                # Macrotheme selection
                suggested = []
                if state.program and state.program.macrotheme:
                    suggested = [state.program.macrotheme]
                decision_value = checkpoint_handler.present_macrotheme_selection(
                    suggested, state.program.program_type.value if state.program and state.program.program_type else "técnica"
                )
                state.decisions.append(HumanDecision(
                    gate=GateId.G0,
                    decision_type=DecisionType.MACROTHEME_SELECTION,
                    value=decision_value,
                    timestamp=datetime.utcnow(),
                    options_presented=suggested,
                ))
                if state.program:
                    state.program.macrotheme = decision_value

            elif action.gate == GateId.G1:
                # Story selection
                curated = []
                if state.program:
                    for u in state.program.units:
                        curated.extend(u.curated_sources)
                selected = checkpoint_handler.present_story_selection(curated)
                state.decisions.append(HumanDecision(
                    gate=GateId.G1,
                    decision_type=DecisionType.STORY_SELECTION,
                    value=[s.title for s in selected] if selected else [],
                    timestamp=datetime.utcnow(),
                    options_presented=[s.title for s in curated],
                ))

            elif action.gate == GateId.G3:
                # Transversal map approval
                approved = checkpoint_handler.present_transversal_map({})
                state.decisions.append(HumanDecision(
                    gate=GateId.G3,
                    decision_type=DecisionType.APPROVAL if approved else DecisionType.REJECTION,
                    value="approved" if approved else "rejected",
                    timestamp=datetime.utcnow(),
                ))

            elif action.gate == GateId.G5:
                # Validation report
                if state.validation:
                    action_result = checkpoint_handler.present_validation_report(state.validation)
                    state.decisions.append(HumanDecision(
                        gate=GateId.G5,
                        decision_type=DecisionType.APPROVAL,
                        value=action_result,
                        timestamp=datetime.utcnow(),
                    ))
                    if action_result == "abort":
                        state.status = RunStatus.ERROR
                        state_manager.save(state)
                        break
                    elif action_result == "revalidate":
                        state.validation = None
                        state.status = RunStatus.RUNNING
                        state_manager.save(state)
                        continue

            elif action.gate == GateId.G6:
                # Export confirmation
                manifest = []
                for us in state.unit_states.values():
                    for po in us.completed_pms.values():
                        if po.file_path:
                            manifest.append(po.file_path)
                confirmed = checkpoint_handler.present_export_preview(manifest)
                state.decisions.append(HumanDecision(
                    gate=GateId.G6,
                    decision_type=DecisionType.APPROVAL,
                    value="confirmed" if confirmed else "cancelled",
                    timestamp=datetime.utcnow(),
                ))

            state.status = RunStatus.RUNNING
            state_manager.save(state)

        # ─── CONFIRM OPTIONAL PRODUCT (C-1 to C-5) ───────
        elif action.type == "confirm_optional":
            state.status = RunStatus.WAITING_CONFIRMATION
            state_manager.save(state)

            pm_def = registry.get(action.pm_id)
            pm_name = pm_def.name if pm_def else action.pm_id
            category = "Achiever's Output" if action.pm_id in ACHIEVERS_OPTIONAL else "Instructor's Playbook"

            print(f"\n  ? Confirmación {action.confirmation_id}: ¿Quiere {pm_name} ({category})?")

            confirmed = checkpoint_handler.ask_optional_product(
                action.pm_id, pm_name, category
            )

            state.asked_products.append(action.pm_id)
            if confirmed:
                state.confirmed_products.append(action.pm_id)
                print(f"  ✓ {pm_name} confirmado")
            else:
                state.rejected_products.append(action.pm_id)
                print(f"  ✗ {pm_name} rechazado — se omite")

            state.status = RunStatus.RUNNING
            state_manager.save(state)

        # ─── VALIDATE ────────────────────────────────────
        elif action.type == "validate":
            state.status = RunStatus.VALIDATING
            state_manager.save(state)

            from engine.validator import run_validation
            report = run_validation(state)
            state.validation = report

            print(f"\n  Validation: {report.status} ({report.passed}/{report.total} passed)")

            if report.status == "critical_errors" and not skip_checkpoints:
                state.status = RunStatus.RUNNING
                state_manager.save(state)
                continue  # Will hit G5 in checkpoint handler
            elif not skip_checkpoints:
                checkpoint_handler.present_validation_report(report)

            state.status = RunStatus.RUNNING
            state_manager.save(state)

        # ─── EXPORT ──────────────────────────────────────
        elif action.type == "export":
            state.status = RunStatus.EXPORTING
            state_manager.save(state)

            from engine.docx_exporter import generate_unit_docx, generate_gfpi_docx

            manifest = []
            out_dir = Path(state_manager.get_run_dir(state.program_id, state.run_id))

            # Build DOCX Instructor Playbooks & GFPI Learner Guides per unit
            if state.program:
                for unit_spec in state.program.units:
                    unit_key = str(unit_spec.number)
                    if unit_key not in state.unit_states:
                        continue
                    us = state.unit_states[unit_key]

                    # Instructor Playbook DOCX
                    unit_outputs_md = {pid: pout.worksheet for pid, pout in us.completed_pms.items()}
                    pb_path = out_dir / f"Instructor-Playbook-Unit{unit_spec.number}.docx"
                    try:
                        generate_unit_docx(
                            unit_outputs=unit_outputs_md,
                            program_name=state.program.name,
                            unit_name=unit_spec.name,
                            unit_number=str(unit_spec.number),
                            cefr=state.program.cefr_level.value if hasattr(state.program.cefr_level, 'value') else str(state.program.cefr_level),
                            grammar_targets=unit_spec.grammar_targets,
                            key_vocabulary=[v.term for v in unit_spec.vocabulary],
                            output_path=pb_path
                        )
                        manifest.append(str(pb_path))
                    except Exception as e:
                        print(f"  Failed to build Playbook Docx: {e}")

                    # GFPI Learner Guide DOCX (from PM-3.6 output)
                    if "PM-3.6" in us.completed_pms:
                        gfpi_path = out_dir / f"GFPI-F-135-Learner-Unit{unit_spec.number}.docx"
                        try:
                            generate_gfpi_docx(
                                gfpi_content=us.completed_pms["PM-3.6"].worksheet,
                                program_name=state.program.name,
                                unit_name=unit_spec.name,
                                unit_number=str(unit_spec.number),
                                output_path=gfpi_path
                            )
                            manifest.append(str(gfpi_path))
                        except Exception as e:
                            print(f"  Failed to build GFPI Docx: {e}")

            # Append fallback markdown paths
            for us in state.unit_states.values():
                for po in us.completed_pms.values():
                    if po.file_path and po.file_path not in manifest:
                        manifest.append(po.file_path)
            for po in state.completed_pms.values():
                if po.file_path and po.file_path not in manifest:
                    manifest.append(po.file_path)

            if manifest and not skip_checkpoints:
                if checkpoint_handler.present_export_preview(manifest):
                    print(f"\n  Export confirmed. {len(manifest)} files ready.")
                else:
                    print("\n  Export cancelled.")
            elif manifest:
                print(f"\n  Export: {len(manifest)} files ready.")

            if state.metering:
                state.metering.completed_at = datetime.utcnow()
                state.metering.guides_completed = len([
                    u for u in state.unit_states.values()
                    if u.status in ("phase2_complete", "phase4_complete", "validated", "exported")
                ])

            state.status = RunStatus.COMPLETE
            state_manager.save(state)

    elapsed = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"  PIPELINE {'COMPLETE' if state.status == RunStatus.COMPLETE else 'ENDED'}")
    print(f"  Duration: {elapsed:.1f}s")
    print(f"  Moment reached: {state.current_moment}/6")
    if state.metering:
        print(f"  Tokens: {state.metering.total_tokens:,}")
        print(f"  API calls: {state.metering.total_api_calls}")
        print(f"  Est. cost: ${state.metering.cost_estimate_usd:.4f}")
    print(f"  Output: {state_manager.get_run_dir(state.program_id, state.run_id)}")
    print(f"{'='*60}")

    return state
