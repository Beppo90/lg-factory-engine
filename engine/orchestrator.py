"""
LG Factory Engine — Orchestrator
SPEC-003 §1-3, 9-10: State machine, dependency graph, main loop.

The Orchestrator does exactly 5 things:
1. Resolve execution order (what PM runs next)
2. Prepare inputs (gather outputs from completed PMs)
3. Dispatch to PM Runner (send prompt, receive output)
4. Manage checkpoints (pause at gates, present options)
5. Persist state (save after every event)
"""

import json
import time
from datetime import datetime
from pathlib import Path

from engine.models import (
    RunState, RunStatus, UnitState, PMDefinition, ProgramConfig,
    PMOutput, HumanDecision, NextAction, GateId, DecisionType,
    DecisionSource, Archetype, ArchetypeProfile, VersionInfo,
    Severity, ErrorEntry,
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

# Phase 3 global PMs (run once for entire program)
PHASE_3_GLOBAL = ["PM-3.1", "PM-3.2", "PM-3.3", "PM-3.4"]

# Phase 3 per-unit PMs
PHASE_3_UNIT = ["PM-3.5", "PM-4.1", "PM-4.2"]

# Final per-unit PM
FINAL_PM = "PM-3.6"


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
        )
    return registry


def load_archetypes() -> dict:
    """Load archetypes registry from config."""
    path = CONFIG_DIR / "archetypes.json"
    return json.loads(path.read_text(encoding='utf-8'))


def resolve_next(state: RunState, registry: dict) -> NextAction:
    """SPEC-003 §10: Determine what happens next."""

    current_unit = state.current_unit

    if current_unit is not None:
        unit_key = str(current_unit)
        if unit_key not in state.unit_states:
            state.unit_states[unit_key] = UnitState(unit_number=current_unit)
        unit_state = state.unit_states[unit_key]

        # Check Phase 2 PMs
        for pm_id in PHASE_2_ORDER:
            if pm_id not in unit_state.completed_pms:
                pm_def = registry[pm_id]
                # Check dependencies
                deps_met = all(
                    dep in unit_state.completed_pms or dep == "PM-1.1"
                    for dep in pm_def.dependencies
                )
                if deps_met:
                    return NextAction(type="run_pm", pm_id=pm_id, unit=current_unit)

        # Phase 2 complete for this unit — run Phase 3 per-unit
        phase2_done = all(p in unit_state.completed_pms for p in PHASE_2_ORDER)
        if phase2_done:
            for pm_id in PHASE_3_UNIT:
                if pm_id not in unit_state.completed_pms:
                    return NextAction(type="run_pm", pm_id=pm_id, unit=current_unit)

        # Mark unit as phase2+3 complete
        all_unit_pms_done = all(
            p in unit_state.completed_pms
            for p in PHASE_2_ORDER + PHASE_3_UNIT
        )
        if all_unit_pms_done and unit_state.status in ("in_progress", "phase2_complete"):
            unit_state.status = "phase4_complete"

    # Check for next unit
    units = state.program.units if state.program else []
    for unit_spec in units:
        unit_key = str(unit_spec.number)
        if unit_key not in state.unit_states or state.unit_states[unit_key].status == "pending":
            state.current_unit = unit_spec.number
            state.unit_states[unit_key] = UnitState(
                unit_number=unit_spec.number, status="in_progress", phase=1
            )
            return NextAction(type="run_pm", pm_id="PM-1.2", unit=unit_spec.number)

    # All units Phase 2+3 complete — run Phase 3 global
    all_units_done = all(
        state.unit_states.get(str(u.number), UnitState(0)).status in ("phase4_complete", "validated", "exported")
        for u in units
    )
    if all_units_done:
        for pm_id in PHASE_3_GLOBAL:
            if pm_id not in state.unit_states.get("global", UnitState(0)).completed_pms:
                return NextAction(type="run_pm", pm_id=pm_id, unit=None)

        # Run PM-3.6 (GFPI integrator) per unit
        for unit_spec in units:
            unit_key = str(unit_spec.number)
            unit_state = state.unit_states.get(unit_key)
            if unit_state and FINAL_PM not in unit_state.completed_pms:
                return NextAction(type="run_pm", pm_id=FINAL_PM, unit=unit_spec.number)

        # All done — validate
        if state.validation is None:
            return NextAction(type="validate")

        # Validation done — export
        if state.validation.status != "critical_errors":
            return NextAction(type="export")

    return NextAction(type="done")


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

    # Previous PM outputs
    for dep_pm_id in pm_def.dependencies:
        if dep_pm_id == "PM-1.1":
            continue
        dep_output = unit_state.completed_pms.get(dep_pm_id)
        if dep_output:
            inputs[f"{dep_pm_id.lower().replace('.', '_')}_output"] = dep_output.worksheet[:1000]

    # All phase 2 outputs for dependent PMs
    if any(d in PHASE_2_ORDER for d in pm_def.dependencies):
        phase2_outputs = {}
        for p in PHASE_2_ORDER:
            if p in unit_state.completed_pms:
                phase2_outputs[p] = unit_state.completed_pms[p].worksheet[:500]
        inputs["previous_context"] = json.dumps(phase2_outputs, indent=2)

    return inputs


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
    profile_rules = archetypes_data.get("profiles", {}).get(profile.value if hasattr(profile, 'value') else str(profile), {}).get("rules", {})
    profile_suggestion = None
    if pm_id in profile_rules:
        # Pick first available archetype from profile
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


def run_pipeline(
    program_config: ProgramConfig,
    adapter: LLMAdapter,
    checkpoint_handler: CheckpointHandler = None,
    state_manager: StateManager = None,
    dry_run: bool = False,
    profile: ArchetypeProfile = None,
    skip_checkpoints: bool = False,
):
    """SPEC-003 §9: Main pipeline loop."""

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
    print(f"  LG FACTORY ENGINE")
    print(f"  Program: {program_config.name}")
    print(f"  Units: {len(program_config.units)}")
    print(f"  Profile: {program_config.archetype_profile.value if hasattr(program_config.archetype_profile, 'value') else program_config.archetype_profile}")
    print(f"  Run ID: {state.run_id[:8]}")
    print(f"  Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"{'='*60}")

    start_time = time.time()

    while state.status == RunStatus.RUNNING:
        # 1. Determine next action
        action = resolve_next(state, registry)

        if action.type == "done":
            state.status = RunStatus.COMPLETE
            state_manager.save(state)
            break

        if action.type == "run_pm":
            pm_def = registry.get(action.pm_id)
            if not pm_def:
                print(f"  ERROR: PM {action.pm_id} not in registry")
                state.status = RunStatus.ERROR
                state_manager.save(state)
                break

            unit_num = action.unit or 0
            unit_key = str(unit_num) if unit_num else "global"

            # 2. Handle archetype selection
            selected_arch, arch_desc = None, ""
            if pm_def.is_transversal:
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

            # 3. Resolve inputs
            inputs = resolve_inputs(pm_def, state, unit_num, registry)

            # 4. Execute PM
            state.current_pm = action.pm_id
            state_manager.save(state)

            print(f"\n  → Executing {action.pm_id}: {pm_def.name} (Unit {unit_num})")

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
                if unit_key not in state.unit_states:
                    state.unit_states[unit_key] = UnitState(unit_number=unit_num)
                state.unit_states[unit_key].completed_pms[action.pm_id] = output

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
                    # Claude Sonnet pricing: ~$3/M input, $15/M output
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

        elif action.type == "validate":
            state.status = RunStatus.VALIDATING
            state_manager.save(state)

            # Run validation (SPEC-004 — simplified for now)
            from engine.validator import run_validation
            report = run_validation(state)
            state.validation = report

            if report.status == "critical_errors" and not skip_checkpoints:
                action_result = checkpoint_handler.present_validation_report(report)
                if action_result == "abort":
                    state.status = RunStatus.ERROR
                    state_manager.save(state)
                    break
                elif action_result == "revalidate":
                    state.validation = None
                    state.status = RunStatus.RUNNING
                    state_manager.save(state)
                    continue
            elif not skip_checkpoints:
                checkpoint_handler.present_validation_report(report)
            else:
                print(f"\n  Validation: {report.status} ({report.passed}/{report.total} passed)")

            state.status = RunStatus.RUNNING
            state_manager.save(state)

        elif action.type == "export":
            state.status = RunStatus.EXPORTING
            state_manager.save(state)

            # Build file manifest
            manifest = []
            for unit_key, unit_state in state.unit_states.items():
                for pm_id, pm_output in unit_state.completed_pms.items():
                    if pm_output.file_path:
                        manifest.append(pm_output.file_path)

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
                    if u.status in ("phase4_complete", "validated", "exported")
                ])

            state.status = RunStatus.COMPLETE
            state_manager.save(state)

    elapsed = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"  PIPELINE {'COMPLETE' if state.status == RunStatus.COMPLETE else 'ENDED'}")
    print(f"  Duration: {elapsed:.1f}s")
    if state.metering:
        print(f"  Tokens: {state.metering.total_tokens:,}")
        print(f"  API calls: {state.metering.total_api_calls}")
        print(f"  Est. cost: ${state.metering.cost_estimate_usd:.4f}")
    print(f"  Output: {state_manager.get_run_dir(state.program_id, state.run_id)}")
    print(f"{'='*60}")

    return state
