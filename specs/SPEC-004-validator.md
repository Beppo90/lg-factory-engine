# SPEC-004: VALIDATOR & COHERENCE ENGINE — LG FACTORY ENGINE
## Specs-Driven Design · v0.1 DRAFT
## Author: Sergio Cortés Perdomo + Claude
## Date: 2026-03-22

---

## 0. ABOUT THIS DOCUMENT

The Validator is the **quality gate**. It catches errors that no single PM can detect because they only become visible when you compare outputs ACROSS PMs.

**What you'll learn here:**
- **Cross-cutting concerns:** Problems that span multiple components
- **Rule engines:** How to define and execute validation rules declaratively
- **Severity classification:** Not all errors are equal — some block, some warn
- **Deterministic checking:** Unlike LLM output, validation is reproducible and testable

---

## 1. VALIDATOR RESPONSIBILITIES

The Validator does exactly 3 things:

1. **Runs coherence checks** across all PM outputs for a unit/program
2. **Classifies findings** by severity (critical, warning, info)
3. **Produces a structured report** that the Orchestrator presents at G5

The Validator does NOT:
- Fix errors (it reports them — the human or a PM re-run fixes them)
- Run during PM execution (it runs AFTER all PMs complete)
- Call the LLM (all checks are deterministic string/structure operations)

---

## 2. THE 8 COHERENCE CHECKS

Each check has: an ID, what it verifies, how it verifies, and what severity a failure gets.

### CHECK 1 — vocab_consistency
**What:** The 20 vocabulary terms from PM-1.2 appear consistently across all outputs.

**Rules:**
- All 20 terms must appear in PM-2.5 (Literacy/Vocab) worksheet
- All 20 terms must appear in PM-4.2 (Cuestionario) quiz items
- All 20 terms must appear in PM-3.6 GFPI Section 5 (Glosario)
- At least 15 of 20 terms must appear in PM-2.3 (Reading) worksheet
- At least 10 of 20 terms must appear in PM-2.6 (Listening) script

**Implementation:**
```python
def check_vocab_consistency(state: RunState, unit: int) -> list[ValidationCheck]:
    results = []
    vocab_terms = [t.term.lower() for t in state.program.units[unit].vocabulary]

    # Check PM-2.5
    pm25_text = state.unit_states[unit].completed_pms["PM-2.5"].worksheet.lower()
    missing_in_25 = [t for t in vocab_terms if t not in pm25_text]
    results.append(ValidationCheck(
        check_id="vocab_in_pm25",
        name="All 20 terms present in Vocabulary worksheet",
        severity="critical" if len(missing_in_25) > 0 else "info",
        passed=len(missing_in_25) == 0,
        details=f"Missing: {missing_in_25}" if missing_in_25 else "All 20 terms present",
        affected_pms=["PM-2.5"]
    ))

    # Check PM-4.2
    pm42_text = state.unit_states[unit].completed_pms["PM-4.2"].worksheet.lower()
    missing_in_42 = [t for t in vocab_terms if t not in pm42_text]
    results.append(ValidationCheck(
        check_id="vocab_in_pm42",
        name="All 20 terms tested in Cuestionario",
        severity="critical" if len(missing_in_42) > 5 else "warning",
        passed=len(missing_in_42) <= 5,
        details=f"Missing {len(missing_in_42)} terms: {missing_in_42}" if missing_in_42 else "All terms present",
        affected_pms=["PM-4.2"]
    ))

    # Check PM-2.3 (at least 15)
    pm23_text = state.unit_states[unit].completed_pms["PM-2.3"].worksheet.lower()
    found_in_23 = [t for t in vocab_terms if t in pm23_text]
    results.append(ValidationCheck(
        check_id="vocab_in_reading",
        name="At least 15 of 20 terms in Reading worksheet",
        severity="warning" if len(found_in_23) < 15 else "info",
        passed=len(found_in_23) >= 15,
        details=f"Found {len(found_in_23)}/20 terms",
        affected_pms=["PM-2.3"]
    ))

    return results
```

**Severity:**
- 0 of 20 in PM-2.5 → CRITICAL (vocabulary worksheet is broken)
- >5 missing in PM-4.2 → CRITICAL (quiz doesn't test enough terms)
- <15 in PM-2.3 → WARNING (reading is thin on vocab, but might work)
- All present → INFO (pass)

---

### CHECK 2 — grammar_constraint
**What:** Grammar targets are respected — no PM introduces structures outside the unit's declared targets.

**Rules:**
- PM-2.10 (Grammar) worksheet must explicitly teach the declared grammar targets
- PM-2.4 (Writing) scaffold must use the declared grammar targets
- NO worksheet should use grammar structures from OTHER units
- PM-4.2 (Quiz) grammar section must test the declared targets

**Implementation:**
```python
GRAMMAR_MARKERS = {
    "Demonstratives": ["this is", "that is", "these are", "those are"],
    "Verb To Be": ["is a", "are the", "is the", "am a"],
    "Present Simple": ["works", "checks", "maintains", "commands"],
    "Imperative": ["report to", "secure all", "check the", "follow the"],
    "Present Progressive": ["is loading", "are mooring", "is approaching"],
    "Tag Questions": ["isn't it", "aren't they", "doesn't he"],
    "Quantifiers": ["much", "many", "little", "few"],
    "Modals": ["must", "should", "can", "could"],
    "SMCP": ["mayday", "pan pan", "securité"],
}

def check_grammar_constraint(state: RunState, unit: int) -> list[ValidationCheck]:
    results = []
    declared = state.program.units[unit].grammar_targets

    # Check PM-2.10 teaches the right grammar
    pm210_text = state.unit_states[unit].completed_pms["PM-2.10"].worksheet.lower()
    for target in declared:
        markers = GRAMMAR_MARKERS.get(target, [])
        found = any(m in pm210_text for m in markers)
        results.append(ValidationCheck(
            check_id=f"grammar_taught_{target}",
            name=f"Grammar worksheet teaches {target}",
            severity="critical" if not found else "info",
            passed=found,
            affected_pms=["PM-2.10"]
        ))

    # Check for grammar contamination (structures from other units)
    other_unit_grammars = []
    for other_unit in state.program.units:
        if other_unit.number != unit:
            other_unit_grammars.extend(other_unit.grammar_targets)

    for pm_id, pm_output in state.unit_states[unit].completed_pms.items():
        if pm_id.startswith("PM-2."):
            text = pm_output.worksheet.lower()
            for foreign_grammar in other_unit_grammars:
                markers = GRAMMAR_MARKERS.get(foreign_grammar, [])
                contamination = [m for m in markers if m in text]
                if contamination:
                    results.append(ValidationCheck(
                        check_id=f"grammar_contamination_{pm_id}_{foreign_grammar}",
                        name=f"{pm_id} contains {foreign_grammar} (from another unit)",
                        severity="warning",
                        passed=False,
                        details=f"Found markers: {contamination}",
                        affected_pms=[pm_id]
                    ))

    return results
```

**Severity:**
- PM-2.10 doesn't teach declared grammar → CRITICAL
- Foreign grammar found in worksheet → WARNING (might be incidental, human reviews)

---

### CHECK 3 — universe_coherence
**What:** Characters, company, location, and vessel are consistent across all outputs.

**Rules:**
- Company name must match exactly (e.g., "Caribbean Maritime Lines" not "Caribbean Maritime Co.")
- Character names must match exactly (no name drift)
- Location must be consistent
- Vessel name must be consistent (if applicable)

**Implementation:**
```python
def check_universe_coherence(state: RunState, unit: int) -> list[ValidationCheck]:
    results = []
    universe = state.program.universe

    for pm_id, pm_output in state.unit_states[unit].completed_pms.items():
        text = pm_output.worksheet

        # Check company name
        if universe.company and universe.company.lower() not in text.lower():
            # Not every PM must mention the company — only flag if it mentions A company
            if any(word in text.lower() for word in ["company", "corporation", "lines", "shipping"]):
                results.append(ValidationCheck(
                    check_id=f"universe_company_{pm_id}",
                    name=f"{pm_id} mentions a company but not '{universe.company}'",
                    severity="warning",
                    passed=False,
                    affected_pms=[pm_id]
                ))

        # Check character names (only if characters appear)
        for char in universe.characters:
            # Check for partial name matches that might indicate name drift
            first_name = char.name.split()[0]
            if first_name.lower() in text.lower():
                if char.name not in text:
                    results.append(ValidationCheck(
                        check_id=f"universe_character_{pm_id}_{first_name}",
                        name=f"{pm_id}: Character '{first_name}' appears but full name '{char.name}' doesn't match",
                        severity="warning",
                        passed=False,
                        affected_pms=[pm_id]
                    ))

    return results
```

---

### CHECK 4 — evidence_alignment
**What:** The SENA triada (Conocimiento, Desempeño, Producto) maps to actual activities.

**Rules:**
- PM-4.2 (Conocimiento) quiz items must reference vocabulary and grammar actually taught
- PM-4.1 Checklist (Desempeño) criteria must reference skills practiced in PM-2.8 (Speaking)
- PM-4.1 Rúbrica (Producto) criteria must reference the artifact produced in PM-3.5 (Final Mission)
- Total points: Conocimiento (50) + Desempeño (10-20) + Producto (20) = 80-90

**Severity:**
- Evidence references non-existent activity → CRITICAL
- Point totals don't match expected → WARNING
- All aligned → INFO

---

### CHECK 5 — archetype_documentation
**What:** Every PM output documents which archetype was used.

**Rules:**
- Every PM-2.x output (except PM-2.9) must include archetype identification
- PM-3.5 must include archetype identification
- Archetype ID must match one from the registry

**Implementation:** Check `PMOutput.archetype_used` is not null and exists in ArchetypeRegistry.

**Severity:**
- Missing archetype → WARNING (doesn't break content, but breaks traceability)

---

### CHECK 6 — cefr_level
**What:** All activities are appropriate for the declared CEFR level.

**Rules:**
- Vocabulary complexity should match level (A1 = high-frequency, concrete terms)
- Sentence length in activities should match level (A1 = short, simple sentences)
- Task complexity should match level (A1 = recognition/reproduction, not analysis/synthesis)

**Implementation:** Heuristic checks:
- Average sentence length in worksheets (A1 target: <12 words)
- Presence of complex structures (A1 should NOT have: passive voice, conditional, subjunctive)
- Instruction complexity (A1 instructions should be in L1 or very simple L2)

**Severity:**
- Complex structures found in A1 material → WARNING
- Average sentence length >20 words in A1 → WARNING
- This check is advisory, not blocking

---

### CHECK 7 — gfpi_completeness
**What:** All GFPI sections exist and are properly tagged.

**Rules:**
- Every PM must have produced a `<!-- GFPI SECTION -->` tagged output
- All 8 GFPI sections (1, 2, 3.1, 3.2, 3.3, 3.4, 4, 5, 6) must be present
- No section should be empty
- Markers must be properly closed (`<!-- END GFPI SECTION -->`)

**Severity:**
- Missing GFPI section → CRITICAL (GFPI-F-135 cannot be assembled)
- Empty section → CRITICAL
- Malformed markers → WARNING (might still be parseable)

---

### CHECK 8 — session_coverage
**What:** The Playbook Outline covers all 8 sessions and maps every PM to a session.

**Rules:**
- PM-3.1 output must define exactly `sessions_per_unit` sessions (default 8)
- Every PM-2.x must be assigned to at least one session
- No session should be empty (every session has at least one PM)
- Session 6 must include PM-2.8 + PM-3.5 (Final Mission)
- Session 7 must include PM-4.2 (Quiz)
- Session 8 must include PM-4.1 Feedback Loop

**Severity:**
- Missing session → CRITICAL
- PM not assigned to any session → WARNING
- Session 6 doesn't have Final Mission → CRITICAL

---

## 3. VALIDATION RUNNER

```python
ALL_CHECKS = [
    check_vocab_consistency,
    check_grammar_constraint,
    check_universe_coherence,
    check_evidence_alignment,
    check_archetype_documentation,
    check_cefr_level,
    check_gfpi_completeness,
    check_session_coverage,
]

def run_validation(state: RunState) -> ValidationReport:
    all_results = []

    for unit_num in state.unit_states:
        for check_fn in ALL_CHECKS:
            results = check_fn(state, unit_num)
            all_results.extend(results)

    # Classify overall status
    criticals = [r for r in all_results if r.severity == "critical" and not r.passed]
    warnings = [r for r in all_results if r.severity == "warning" and not r.passed]

    if criticals:
        status = "critical_errors"
    elif warnings:
        status = "warnings"
    else:
        status = "clean"

    return ValidationReport(
        run_id=state.run_id,
        checked_at=now(),
        status=status,
        checks=all_results,
        summary={
            "total": len(all_results),
            "passed": len([r for r in all_results if r.passed]),
            "warnings": len(warnings),
            "critical": len(criticals)
        }
    )
```

---

## 4. VALIDATION REPORT FORMAT

### CLI Output (G5 Gate)

```
═══════════════════════════════════════════════════════
 COHERENCE REPORT — maritime-g1 / Unit 1: Ship Overview
 Run: abc123 | Checked: 2026-03-22 18:45:00
═══════════════════════════════════════════════════════

 STATUS: ⚠️  WARNINGS (2 warnings, 0 critical)

 ✅ vocab_consistency      20/20 terms in PM-2.5
 ✅ vocab_consistency      20/20 terms in PM-4.2
 ✅ vocab_consistency      17/20 terms in PM-2.3 Reading
 ✅ grammar_constraint     PM-2.10 teaches Demonstratives ✓
 ✅ grammar_constraint     PM-2.10 teaches Verb To Be ✓
 ⚠️  grammar_constraint     PM-2.3 contains Present Simple markers
                           → Possible contamination from Unit 2
                           → Affected: PM-2.3 (Reading)
 ✅ universe_coherence     CML consistent across all PMs
 ✅ evidence_alignment     Triada SENA: 50+20+20 = 90 pts ✓
 ✅ archetype_docs         All 10 archetypes documented
 ⚠️  cefr_level            PM-2.4 avg sentence length: 14.2 words
                           → Slightly above A1 target (12 words)
                           → Affected: PM-2.4 (Writing)
 ✅ gfpi_completeness      All 8 sections present and tagged
 ✅ session_coverage       8 sessions, all PMs assigned

 TOTAL: 14 checks | 12 passed | 2 warnings | 0 critical

═══════════════════════════════════════════════════════
 Action: [A]pprove  [F]ix PM  [R]e-run validation  [Q]uit
═══════════════════════════════════════════════════════
```

### JSON Output

```json
{
  "run_id": "abc123",
  "checked_at": "2026-03-22T18:45:00Z",
  "status": "warnings",
  "summary": {
    "total": 14,
    "passed": 12,
    "warnings": 2,
    "critical": 0
  },
  "checks": [
    {
      "check_id": "vocab_in_pm25",
      "name": "All 20 terms present in Vocabulary worksheet",
      "severity": "info",
      "passed": true,
      "details": "All 20 terms present",
      "affected_pms": ["PM-2.5"],
      "affected_units": [1]
    }
  ]
}
```

---

## 5. EXTENSIBILITY

New checks can be added by:
1. Writing a function that takes `(state, unit)` and returns `list[ValidationCheck]`
2. Adding it to `ALL_CHECKS`
3. No other code changes needed

**Planned V2 checks:**
- `audio_script_accuracy`: Compare PM-2.6 listening script to PM-2.3 reading text (should share vocabulary but differ in medium)
- `workbook_alignment`: Verify PM-3.4 workbook chapters align with PM-3.1 playbook sessions
- `cultural_sensitivity`: Flag potentially culturally inappropriate content (LLM-assisted check — exception to "no LLM" rule)
- `accessibility`: Check reading level formulas (Flesch-Kincaid) against CEFR expectations

---

## 6. RELATIONSHIP TO OTHER COMPONENTS

```
PM Runner (generates content)
     │
     ▼
RunState (stores all outputs)
     │
     ▼
Validator (checks coherence) ─── deterministic, no LLM
     │
     ├── clean ────▶ Exporter
     │
     ├── warnings ──▶ G5 Gate (human approves) ──▶ Exporter
     │
     └── critical ──▶ G5 Gate (human decides)
                        ├── fix PM ──▶ Orchestrator re-runs PM
                        └── abort ──▶ Pipeline stops
```

---

*SPEC-004: Validator & Coherence Engine — LG Factory Engine*
*Status: DRAFT — Pending review*
*Depends on: SPEC-001 (APPROVED), SPEC-002 (DRAFT), SPEC-003 (DRAFT)*
*Next: Review all specs → begin implementation*
