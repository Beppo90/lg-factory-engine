# SPEC-003: ORCHESTRATOR PIPELINE — LG FACTORY ENGINE
## Specs-Driven Design · v0.2 DRAFT
## Author: Sergio Cortés Perdomo + Mimo
## Date: 2026-03-22 (Updated 2026-03-24 — Flow v2 correction)
## Changelog:
##   v0.2 — §2, §3, §10 updated per FLOW-v2 (6-moment flow)

---

## 0. ABOUT THIS DOCUMENT

The Orchestrator is the **brain** of LG Factory Engine. It knows what to run, in what order, with what inputs, and when to stop and ask the human.

**What you'll learn here:**
- **State machines:** How to model a system that moves through defined stages
- **Dependency graphs:** How to determine execution order from relationships
- **Error recovery:** How to handle failures without losing progress
- **Separation of concerns:** The Orchestrator doesn't generate content — it coordinates

---

## 1. ORCHESTRATOR RESPONSIBILITIES

The Orchestrator does exactly 6 things:

1. **Resolve execution order** — Given the PM dependency graph and the 6-moment flow, determine which PM runs next
2. **Prepare inputs** — Gather the outputs of completed PMs that the next PM needs
3. **Dispatch to PM Runner** — Send the prompt to the LLM adapter and receive output
4. **Manage gates** — Pause at human gates (G0–G6), present options, collect decisions
5. **Manage confirmations** — Ask instructor about optional products (C-1–C-5)
6. **Persist state** — Save RunState after every PM completion (crash-safe)

The Orchestrator does NOT:
- Generate content (that's PM Runner + LLM)
- Validate coherence (that's the Validator)
- Export files (that's the Exporter)
- Parse LLM output (that's the PM Runner's output parser)

---

## 2. STATE MACHINE

The pipeline moves through these states:

```
                    ┌──────────────┐
                    │ INITIALIZING │
                    └──────┬───────┘
                           │ load config + create RunState
                           ▼
              ┌─── RUNNING ◄────────────┐
              │     │                    │
              │     │ next PM ready      │ human decision
              │     ▼                    │ received
              │  EXECUTING_PM            │
              │     │                    │
              │     ├── success ─────────┤
              │     │                    │
              │     └── needs gate ─┐    │
              │                     ▼    │
              │             WAITING_HUMAN │
              │                     │    │
              │                     ├── decision received ──┘
              │                     │
              │     └── needs confirm ─┐
              │                        ▼
              │          WAITING_CONFIRMATION
              │                        │
              │                        ├── confirmed/rejected ──▶ RUNNING
              │                        │
              │     ├── all PMs done ──┐
              │                       ▼
              │                 VALIDATING
              │                    │
              │                    ├── clean ─────┐
              │                    │              ▼
              │                    │          EXPORTING
              │                    │              │
              │                    │              ▼
              │                    │          COMPLETE
              │                    │
              │                    └── critical ──┐
              │                                   ▼
              └────────────────────────────── ERROR ◄───┘
                                               │
                                               ▼
                                            PAUSED
                                         (resumable)
```

### State Transitions

| From | To | Trigger |
|------|----|---------|
| INITIALIZING | RUNNING | Config loaded, RunState created |
| RUNNING | EXECUTING_PM | Next PM resolved from dependency graph |
| EXECUTING_PM | RUNNING | PM completed successfully → save output → loop |
| EXECUTING_PM | WAITING_HUMAN | PM needs human gate (G0–G6) |
| WAITING_HUMAN | RUNNING | Human provides decision → save → continue |
| EXECUTING_PM | WAITING_CONFIRMATION | PM is optional, needs instructor yes/no (C-1–C-5) |
| WAITING_CONFIRMATION | RUNNING | Instructor confirms → generate; or rejects → skip |
| RUNNING | VALIDATING | All PMs + optional products completed |
| VALIDATING | EXPORTING | Validation passed (clean or warnings only) |
| VALIDATING | ERROR | Critical validation errors found |
| EXPORTING | COMPLETE | All files exported successfully |
| ANY | ERROR | Unrecoverable error (API failure after retries, etc.) |
| ANY | PAUSED | User requests pause, or session timeout |
| PAUSED | RUNNING | User resumes |
| ERROR | RUNNING | User fixes issue and retries |

---

## 3. DEPENDENCY GRAPH — 6-MOMENT FLOW

The execution order follows the 6-moment conversational flow defined in SPEC-001 §5 and FLOW-v2.

### Moment 1: Topic Creation

```
PM-1.1 (Ruta Macrotemática)
  │
  └─▶ G0: Select macrotheme (mandatory)
```

### Moment 2: Setting the Universe

```
PM-1.1 output ──▶ PM-1.2 (Scope & Sequence + Curación)
                      │
                      └─▶ G1: Select authentic texts (mandatory)
```

### Moment 3: Building the Learning Guide (per unit)

```
PM-1.2 output ──────────────────────────────────────────┐
  │                                                       │
  ├──▶ PM-2.1 (Spark)         → G2: select archetype     │
  ├──▶ PM-2.2 (Gap Analysis)  → G2: select archetype     │
  ├──▶ PM-2.3 (Reading) ──▶ PM-2.4 (Writing) → G2 each  │
  ├──▶ PM-2.5 (Literacy/Vocab)→ G2: select archetype     │
  ├──▶ PM-2.6 (Listening) ──▶ PM-2.7 (Pronunciation)     │
  │          └──▶ PM-2.8 (Speaking)                       │
  ├──▶ PM-2.10 (Grammar)      → G2: select archetype     │
  │                                                       │
  │    PM-2.1 thru PM-2.8 ──▶ PM-2.9 (Functions) → G3   │
  │                                                       │
  │    ALL Phase 2 complete ──▶ PM-4.1 (Evaluation)       │
  │                            (generated WITHIN Moment 3) │
  └───────────────────────────────────────────────────────┘
```

**Product:** Guía de Aprendizaje = 9 worksheets (PM-2.1–2.10) + PM-4.1 instruments

### Moment 4: Achiever's Outputs (optional)

After the Learning Guide is complete, the instructor is asked about each:

```
Guía complete ──▶ C-1: Want PM-3.3 (Canva Deck text)? ──▶ if yes, generate
              ──▶ C-2: Want PM-3.4 (Workbook)? ──▶ if yes, auto-generate
              ──▶ C-3: Want PM-4.2 (Quiz)? ──▶ if yes, auto-generate
```

**PM-3.4 auto-generation:** Uses PM-2.3 to PM-2.10 outputs. Selects 2 archetypes per PM automatically (no human gate).

**PM-4.2 auto-generation:** Uses PM-2.3 to PM-2.10 outputs. Selects 1 archetype per PM automatically (no human gate).

### Moment 5: Instructor's Playbook (optional)

After Achiever's Outputs, the instructor is asked about Playbook materials:

```
Achiever's complete ──▶ C-4: Want PM-3.1 (Playbook Outline)?
                            │
                            └─▶ if yes ──▶ C-5: Want PM-3.2 (Build-Out)?
                                              (requires PM-3.1)
```

**PM-3.1 note:** Includes PM-4.1 evaluation instruments (dual insertion — same content as in the Learning Guide).

### Moment 6: Validation & Export

```
All confirmed products complete ──▶ VALIDATOR
                                        │
                                        └─▶ G5: Review validation report
                                              │
                                              ▼
                                         EXPORTER → G6: Confirm export
```

### Recommended Sequential Order (V1)

```
MOMENTO 1:
  PM-1.1 → [G0: macrotheme selection]

MOMENTO 2:
  PM-1.2 → [G1: text selection]

MOMENTO 3 (per unit):
  PM-2.1 → [G2] → PM-2.2 → [G2]
  PM-2.3 → [G2] → PM-2.4 → [G2] → PM-2.5 → [G2]
  PM-2.6 → [G2] → PM-2.7 → [G2] → PM-2.8 → [G2]
  PM-2.9 → [G3]
  PM-2.10 → [G2]
  PM-4.1 (auto, no gate — generated within this moment)

MOMENTO 4 (optional — per confirmation):
  [C-1: yes?] → PM-3.3
  [C-2: yes?] → PM-3.4 (auto-archetypes)
  [C-3: yes?] → PM-4.2 (auto-archetypes)

MOMENTO 5 (optional — per confirmation):
  [C-4: yes?] → PM-3.1
    [C-5: yes?] → PM-3.2

MOMENTO 6:
  VALIDATE → [G5] → EXPORT → [G6] → COMPLETE
```

---

## 4. PM RUNNER

The PM Runner executes a single PM. It's the only component that talks to the LLM.

### Execution Flow

```python
# Pseudocode — not implementation
def run_pm(pm_def: PMDefinition, inputs: dict, archetype: Archetype | None) -> PMOutput:

    # 1. Load prompt template
    template = load_template(pm_def.prompt_template)

    # 2. Render prompt with inputs
    system_prompt = template.system.render(inputs)
    user_prompt = template.user.render(inputs, archetype=archetype)

    # 3. Call LLM
    raw_response = llm_adapter.generate(
        system=system_prompt,
        user=user_prompt,
        model=config.model,
        max_tokens=config.max_tokens_for_pm(pm_def.id)
    )

    # 4. Parse output
    worksheet = output_parser.extract_worksheet(raw_response)
    gfpi_section = output_parser.extract_gfpi(raw_response)

    # 5. Validate structure (not content — that's the Validator's job)
    assert worksheet is not None, f"PM {pm_def.id} produced no worksheet"
    assert gfpi_section is not None, f"PM {pm_def.id} produced no GFPI section"

    # 6. Return typed output
    return PMOutput(
        pm_id=pm_def.id,
        worksheet=worksheet,
        gfpi_section=gfpi_section,
        version=pm_def.version,
        archetype_used=archetype.id if archetype else None,
        tokens_consumed=raw_response.usage.total_tokens,
        llm_model=config.model
    )
```

### Auto-Generation Mode (PM-3.4, PM-4.2)

For PMs with `auto_generate: true`, the archetype selection is done automatically:

```python
def auto_select_archetypes(pm_def: PMDefinition, state: RunState, archetypes_data: dict) -> list[Archetype]:
    """Select archetypes automatically based on profile rules."""
    profile = state.program.archetype_profile
    rules = archetypes_data["profiles"][profile.value]["rules"]

    selected = []
    for source_pm_id in pm_def.dependencies:
        if source_pm_id in PHASE_2_ORDER:
            pm_archetypes = archetypes_data["archetypes"].get(source_pm_id, [])
            if pm_archetypes:
                # For PM-3.4: pick 2, for PM-4.2: pick 1
                count = 2 if pm_def.id == "PM-3.4" else 1
                for arch in pm_archetypes[:count]:
                    selected.append(Archetype(
                        id=arch["id"], name=arch["name"],
                        pm_id=source_pm_id, description=arch["description"]
                    ))
    return selected
```

### Output Parsing Strategy

The PM Runner uses **marker-based extraction**, not regex on arbitrary text:

```markdown
<!-- WORKSHEET START -->
[worksheet content here]
<!-- WORKSHEET END -->

<!-- GFPI SECTION: 3.3-APROPIACION-READING -->
[GFPI section content here]
<!-- END GFPI SECTION -->
```

**Why markers instead of regex?**
- Markers are part of the prompt instruction — we tell the LLM to use them
- Extraction is O(1) string search, not pattern matching
- If markers are missing, we know the LLM didn't follow instructions → retry

### Retry Logic

```
Attempt 1: Normal call
  ↓ failed (markers missing, timeout, rate limit)
Attempt 2: Same call + "IMPORTANT: Use the exact markers specified"
  ↓ failed
Attempt 3: Simplified prompt (fewer instructions, focus on structure)
  ↓ failed
→ ERROR: PM {id} failed after 3 attempts → pause pipeline → human decides
```

---

## 5. CHECKPOINT PROTOCOL

When the Orchestrator hits a gate (G0–G6) or confirmation prompt (C-1–C-5), it pauses and presents options to the human.

### Gate Interface (mandatory decisions)

```python
class CheckpointHandler:

    def present_macrotheme_selection(self, suggested: list[str], program_type: str) -> str:
        """G0: Show suggested macrothemes, human selects one or enters free"""

    def present_story_selection(self, curated_sources: list[CuratedSource]) -> list[Story]:
        """G1: Show 3 curated sources, human selects 2"""

    def present_archetype_selection(self, pm_id: PMId, archetypes: list[Archetype],
                                     unit_name: str, profile_suggestion: str) -> ArchetypeSelection:
        """G2: Show archetype options for this PM, human selects one"""

    def present_transversal_map(self, injection_map: dict) -> bool:
        """G3: Show where PM-2.9 functions will be injected, human approves"""

    def present_final_mission(self, mission_design: dict) -> bool:
        """G4: Show Final Mission design, human approves or requests changes"""

    def present_validation_report(self, report: ValidationReport) -> str:
        """G5: Show coherence report, human approves or flags issues"""
        # Returns: "approve" | "fix:{pm_id}" | "abort"

    def present_export_preview(self, file_manifest: list) -> bool:
        """G6: Show list of files to be exported, human confirms"""
```

### Confirmation Interface (optional products)

```python
class ConfirmationHandler:

    def ask_canva_deck(self, guide_summary: str) -> bool:
        """C-1: Ask if instructor wants Canva Deck text"""

    def ask_workbook(self, guide_summary: str) -> bool:
        """C-2: Ask if instructor wants Autonomous Workbook"""

    def ask_quiz(self, guide_summary: str) -> bool:
        """C-3: Ask if instructor wants Technical Quiz IE-01"""

    def ask_playbook(self, guide_summary: str) -> bool:
        """C-4: Ask if instructor wants Playbook Outline"""

    def ask_buildout(self, playbook_summary: str) -> bool:
        """C-5: Ask if instructor wants Playbook Build-Out (requires PM-3.1)"""
```

---

## 6. INPUT RESOLUTION

Before running a PM, the Orchestrator must **resolve its inputs** by gathering outputs from completed PMs.

```python
# Pseudocode
def resolve_inputs(pm_def: PMDefinition, run_state: RunState, unit: int) -> dict:
    inputs = {}

    for param_name, param_source in pm_def.inputs.required.items():
        if param_source == "program_config":
            inputs[param_name] = run_state.program
        elif param_source == "unit_spec":
            inputs[param_name] = run_state.program.units[unit]
        elif param_source.startswith("PM-"):
            # Output of another PM
            source_pm = param_source
            pm_output = run_state.unit_states[unit].completed_pms.get(source_pm)
            if pm_output is None:
                raise DependencyNotMet(f"{pm_def.id} requires {source_pm} but it hasn't run yet")
            inputs[param_name] = pm_output
        elif param_source == "human_decision":
            # From a gate
            inputs[param_name] = find_decision(run_state.decisions, pm_def.checkpoint, unit)

    return inputs
```

---

## 7. PERSISTENCE PROTOCOL

**Rule: State is saved after EVERY significant event.** This makes the pipeline crash-safe.

### Save Points

| Event | What's saved |
|-------|-------------|
| Pipeline starts | RunState with status=initializing |
| Config loaded | RunState with program config |
| PM starts executing | current_pm updated |
| PM completes | PMOutput added to unit_states |
| Human decision received | Decision added to decisions[] |
| Optional product confirmed | confirmed_products updated |
| Validation completes | ValidationReport saved |
| Export completes per file | File path recorded |
| Pipeline completes | status=complete, metering finalized |
| Error occurs | ErrorEntry added, status=error |

### File Format

```
output/
└── maritime-g1/
    └── run-2026-03-22-abc123/
        ├── state.json              ← RunState (updated continuously)
        ├── unit-1/
        │   ├── pm-1.2.md
        │   ├── pm-1.2-gfpi.md
        │   ├── pm-2.1.md
        │   ├── pm-2.1-gfpi.md
        │   ├── ...
        │   └── pm-4.1.md
        ├── assembly/
        │   ├── workbook.md         ← PM-3.4 (if confirmed)
        │   ├── quiz.md             ← PM-4.2 (if confirmed)
        │   ├── canva-spec.md       ← PM-3.3 (if confirmed)
        │   ├── playbook.md         ← PM-3.1 (if confirmed)
        │   ├── build-outs.md       ← PM-3.2 (if confirmed)
        │   └── gfpi-f-135.md
        ├── validation.json
        └── export/
```

---

## 8. RESUME PROTOCOL

When a pipeline is paused or crashes, it can resume:

```python
def resume(run_id: str):
    state = load_state(run_id)

    if state.status == "error":
        last_pm = state.current_pm
        retry = checkpoint_handler.ask_retry(last_pm, state.error_log[-1])
        if retry:
            state.status = "running"
        else:
            return

    if state.status == "waiting_human":
        gate = find_pending_gate(state)
        decision = present_checkpoint(gate)
        record_decision(state, decision)
        state.status = "running"

    if state.status == "waiting_confirmation":
        confirmation = find_pending_confirmation(state)
        result = present_confirmation(confirmation)
        record_confirmation(state, confirmation, result)
        state.status = "running"

    if state.status == "paused":
        state.status = "running"

    run_pipeline(state)
```

---

## 9. MAIN LOOP (PSEUDOCODE)

```python
def run_pipeline(state: RunState):
    save_state(state)

    while state.status == "running":
        next_action = resolve_next(state)

        if next_action.type == "run_pm":
            pm_def = pm_registry[next_action.pm_id]
            unit = next_action.unit

            # Handle archetype selection
            if pm_def.auto_generate:
                # Auto-select archetypes (PM-3.4, PM-4.2)
                archetypes = auto_select_archetypes(pm_def, state, archetypes_data)
                archetype = archetypes  # list for auto-generate PMs
            elif pm_def.archetypes and pm_def.checkpoint == "G2":
                archetype = get_or_request_archetype(state, pm_def, unit)
            else:
                archetype = None

            inputs = resolve_inputs(pm_def, state, unit)
            state.current_pm = pm_def.id
            save_state(state)

            try:
                output = pm_runner.run(pm_def, inputs, archetype)
                store_output(state, pm_def, unit, output)
                state.current_pm = None
                save_state(state)
            except PMExecutionError as e:
                handle_error(state, e)
                return

        elif next_action.type == "checkpoint":
            state.status = "waiting_human"
            save_state(state)
            decision = present_checkpoint(next_action.gate, state)
            state.decisions.append(decision)
            state.status = "running"
            save_state(state)

        elif next_action.type == "confirm_optional":
            state.status = "waiting_confirmation"
            save_state(state)
            confirmed = present_confirmation(next_action.confirmation_id, state)
            if confirmed:
                state.confirmed_products.append(next_action.pm_id)
                state.status = "running"
            else:
                # Skip this optional product
                mark_skipped(state, next_action.pm_id)
                state.status = "running"
            save_state(state)

        elif next_action.type == "validate":
            state.status = "validating"
            save_state(state)
            report = validator.run(state)
            state.validation = report
            save_state(state)

            if report.status == "critical_errors":
                human_action = checkpoint_handler.present_validation_report(report)
                if human_action.startswith("fix:"):
                    pm_to_fix = human_action.split(":")[1]
                    invalidate_pm(state, pm_to_fix)
                    state.status = "running"
                    save_state(state)
                    continue
                elif human_action == "abort":
                    state.status = "error"
                    save_state(state)
                    return

        elif next_action.type == "export":
            state.status = "exporting"
            save_state(state)
            exporter.export_all(state)
            state.status = "complete"
            state.metering.completed_at = now()
            save_state(state)
            return

        elif next_action.type == "done":
            state.status = "complete"
            save_state(state)
            return
```

---

## 10. resolve_next() LOGIC — 6-MOMENT FLOW

This is the **scheduler** — it determines what happens next based on the current moment and completed PMs.

```python
def resolve_next(state: RunState) -> NextAction:

    # ─── MOMENTO 1: Topic Creation ───────────────────────────
    if state.current_moment == 1:
        if "PM-1.1" not in state.completed_pms:
            return NextAction(type="run_pm", pm_id="PM-1.1", unit=None)
        elif not has_decision(state, "G0"):
            return NextAction(type="checkpoint", gate="G0")
        else:
            state.current_moment = 2
            save_state(state)

    # ─── MOMENTO 2: Setting the Universe ─────────────────────
    if state.current_moment == 2:
        if "PM-1.2" not in state.completed_pms:
            return NextAction(type="run_pm", pm_id="PM-1.2", unit=None)
        elif not has_decision(state, "G1"):
            return NextAction(type="checkpoint", gate="G1")
        else:
            state.current_moment = 3
            save_state(state)

    # ─── MOMENTO 3: Building the LG (per unit) ──────────────
    if state.current_moment == 3:
        current_unit = state.current_unit

        # Find next pending unit
        if current_unit is None:
            for unit_spec in state.program.units:
                unit_key = str(unit_spec.number)
                if unit_key not in state.unit_states:
                    state.current_unit = unit_spec.number
                    state.unit_states[unit_key] = UnitState(
                        unit_number=unit_spec.number, status="in_progress"
                    )
                    return NextAction(type="run_pm", pm_id="PM-2.1", unit=unit_spec.number)
            # All units done with Phase 2
            state.current_moment = 4
            save_state(state)
            return resolve_next(state)

        unit_state = state.unit_states.get(str(current_unit))

        # Phase 2 PMs in order
        PHASE_2_ORDER = ["PM-2.1", "PM-2.2", "PM-2.3", "PM-2.4", "PM-2.5",
                         "PM-2.6", "PM-2.7", "PM-2.8", "PM-2.9", "PM-2.10"]

        for pm_id in PHASE_2_ORDER:
            if pm_id not in unit_state.completed_pms:
                pm_def = pm_registry[pm_id]
                deps_met = all(
                    dep in unit_state.completed_pms or dep == "PM-1.2"
                    for dep in pm_def.dependencies
                )
                if deps_met:
                    return NextAction(type="run_pm", pm_id=pm_id, unit=current_unit)

        # All Phase 2 PMs done for this unit → generate PM-4.1
        if "PM-4.1" not in unit_state.completed_pms:
            return NextAction(type="run_pm", pm_id="PM-4.1", unit=current_unit)

        # This unit complete → move to next unit
        unit_state.status = "phase2_complete"
        state.current_unit = None
        save_state(state)
        return resolve_next(state)

    # ─── MOMENTO 4: Achiever's Outputs (optional) ───────────
    if state.current_moment == 4:
        optional_achievers = ["PM-3.3", "PM-3.4", "PM-4.2"]

        for pm_id in optional_achievers:
            # Already generated?
            if pm_id in state.completed_pms:
                continue
            # Already rejected?
            if pm_id in state.rejected_products:
                continue
            # Not yet asked?
            if pm_id not in state.asked_products:
                return NextAction(type="confirm_optional", pm_id=pm_id,
                                  confirmation_id=f"C-{pm_id}")
            # Confirmed → generate
            if pm_id in state.confirmed_products:
                return NextAction(type="run_pm", pm_id=pm_id, unit=None)

        # All Achiever's handled
        state.current_moment = 5
        save_state(state)

    # ─── MOMENTO 5: Instructor's Playbook (optional) ────────
    if state.current_moment == 5:
        # PM-3.1
        if "PM-3.1" not in state.completed_pms:
            if "PM-3.1" not in state.asked_products:
                return NextAction(type="confirm_optional", pm_id="PM-3.1",
                                  confirmation_id="C-4")
            if "PM-3.1" in state.confirmed_products:
                return NextAction(type="run_pm", pm_id="PM-3.1", unit=None)

        # PM-3.2 (only if PM-3.1 was generated)
        if "PM-3.1" in state.completed_pms and "PM-3.2" not in state.completed_pms:
            if "PM-3.2" not in state.asked_products:
                return NextAction(type="confirm_optional", pm_id="PM-3.2",
                                  confirmation_id="C-5")
            if "PM-3.2" in state.confirmed_products:
                return NextAction(type="run_pm", pm_id="PM-3.2", unit=None)

        # All Playbook handled
        state.current_moment = 6
        save_state(state)

    # ─── MOMENTO 6: Validation & Export ──────────────────────
    if state.current_moment == 6:
        if state.validation is None:
            return NextAction(type="validate")

        if state.validation.status != "critical_errors":
            return NextAction(type="export")

    return NextAction(type="done")
```

---

## 11. LLM ADAPTER INTERFACE

Abstraction layer so the engine isn't locked to one LLM provider (from SPEC-001 Constraint: LLM-agnostic).

```python
# Abstract base
class LLMAdapter:
    def generate(self, system: str, user: str, model: str, max_tokens: int) -> LLMResponse:
        raise NotImplementedError

    def count_tokens(self, text: str) -> int:
        raise NotImplementedError

class LLMResponse:
    content: str           # Raw text response
    usage: TokenUsage      # tokens consumed
    model: str             # model actually used
    stop_reason: str       # "end_turn", "max_tokens", etc.

class TokenUsage:
    input_tokens: int
    output_tokens: int
    total_tokens: int

# Claude implementation
class ClaudeAdapter(LLMAdapter):
    def __init__(self, api_key: str, default_model: str = "claude-sonnet-4-6"):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.default_model = default_model

    def generate(self, system: str, user: str, model: str = None, max_tokens: int = 4096) -> LLMResponse:
        response = self.client.messages.create(
            model=model or self.default_model,
            max_tokens=max_tokens,
            system=system,
            messages=[{"role": "user", "content": user}]
        )
        return LLMResponse(
            content=response.content[0].text,
            usage=TokenUsage(
                input_tokens=response.usage.input_tokens,
                output_tokens=response.usage.output_tokens,
                total_tokens=response.usage.input_tokens + response.usage.output_tokens
            ),
            model=response.model,
            stop_reason=response.stop_reason
        )
```

---

## 12. TOKEN BUDGET

Each PM has a token budget to control costs and prevent runaway generations.

| PM | Max Output Tokens | Rationale |
|----|------------------|-----------|
| PM-1.1 | 4,096 | Macrotheme list is structured |
| PM-1.2 | 4,096 | Scope doc is structured, moderate length |
| PM-2.1 to PM-2.8 | 6,000 | Worksheets can be detailed |
| PM-2.9 | 3,000 | Transversal map is compact |
| PM-2.10 | 6,000 | Grammar worksheets need examples |
| PM-3.1 | 8,000 | Playbook spans all sessions |
| PM-3.2 | 8,000 | Build-outs are detailed per session |
| PM-3.3 | 4,096 | Canva specs are structured |
| PM-3.4 | 8,000 | Workbook chapters are substantial |
| PM-3.5 | 4,096 | Final Mission is one task |
| PM-3.6 | 8,000 | GFPI assembly is long |
| PM-4.1 | 6,000 | Three instruments |
| PM-4.2 | 6,000 | 50-point quiz |

**Estimated total per unit:** ~72,000 output tokens × ~3x input tokens = ~288,000 total tokens
**Estimated per program (5 units):** ~1.4M tokens
**Estimated API cost (Claude Sonnet):** ~$4.20 per program at current pricing

---

## 13. ERROR TAXONOMY

| Error Type | Severity | Recovery | Example |
|-----------|----------|----------|---------|
| `LLMTimeoutError` | recoverable | Auto-retry (3x) | API didn't respond in 120s |
| `LLMRateLimitError` | recoverable | Exponential backoff | Too many requests |
| `MarkersMissingError` | recoverable | Retry with emphasis | LLM didn't use output markers |
| `DependencyNotMet` | critical | Bug — should never happen | PM-2.4 ran before PM-2.3 |
| `InvalidOutputStructure` | recoverable | Retry with simplified prompt | Worksheet missing sections |
| `ValidationCriticalError` | human | Present at G5, human decides | Vocabulary inconsistency |
| `ExportError` | recoverable | Retry export only | DOCX generation failed |
| `StateCorruption` | critical | Manual recovery | state.json is malformed |

---

## 14. CLI INTERFACE (V1)

```bash
# Start a new run (starts at PM-1.1, Moment 1)
$ lgfactory run --program maritime-g1 --profile balanced

# Resume a paused/failed run
$ lgfactory resume --run-id abc123

# List all runs
$ lgfactory list

# Show run status (includes current moment)
$ lgfactory status --run-id abc123

# Export a completed run to DOCX
$ lgfactory export --run-id abc123 --format docx

# Validate without exporting
$ lgfactory validate --run-id abc123

# Show token usage / cost estimate
$ lgfactory cost --run-id abc123

# Generate only optional products (after LG is complete)
$ lgfactory add-product --run-id abc123 --product workbook
$ lgfactory add-product --run-id abc123 --product quiz
$ lgfactory add-product --run-id abc123 --product playbook
```

---

## 15. AUTO-GENERATION RULES

### PM-3.4 (Workbook Autónomo)

| Rule | Value |
|------|-------|
| Source PMs | PM-2.3 to PM-2.10 (8 PMs) |
| Archetypes per PM | 2 (automatically selected) |
| Selection method | Profile-based (balanced/production/engagement) |
| Human gate | None (confirmation only: C-2) |
| Output sections | REINFORCE + EXTEND + PREPARE |

### PM-4.2 (Cuestionario IE-01)

| Rule | Value |
|------|-------|
| Source PMs | PM-2.3 to PM-2.10 (8 PMs) |
| Archetypes per PM | 1 (automatically selected) |
| Selection method | Profile-based (balanced/production/engagement) |
| Human gate | None (confirmation only: C-3) |
| Output sections | Reading + Writing + Listening + Vocabulary HOTS + Grammar HOTS + Answer Key |

### PM-4.1 (Instrumentos de Evaluación)

| Rule | Value |
|------|-------|
| Generation | Once per unit, during Moment 3 (after all Phase 2 PMs) |
| Insert locations | Learning Guide AND Instructor's Playbook (if PM-3.1 is confirmed) |
| Human gate | None (always generated) |
| Dual insertion | Single generation, two render targets in Assembler |

---

*SPEC-003: Orchestrator Pipeline — LG Factory Engine*
*Status: DRAFT v0.2 — Pending review after FLOW-v2 approval*
*Updated: 2026-03-24 per FLOW-v2 corrections*
*Depends on: SPEC-001 v0.2 (APPROVED), SPEC-002 (NEEDS UPDATE)*
*Next: SPEC-002 Data Models — add ProductCategory enum*
