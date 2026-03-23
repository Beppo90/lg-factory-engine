"""
LG Factory Engine — Validator
SPEC-004: 8 coherence checks (simplified V1 implementation).

The Validator does NOT call the LLM. All checks are deterministic.
"""

import re
from datetime import datetime

from engine.models import RunState, ValidationCheck, ValidationReport, Severity


def check_vocab_consistency(state: RunState, unit_number: int) -> list[ValidationCheck]:
    """CHECK 1: 20 vocabulary terms appear consistently."""
    results = []
    unit_key = str(unit_number)
    unit_state = state.unit_states.get(unit_key)
    if not unit_state:
        return results

    # Get vocabulary from program config
    vocab_terms = []
    if state.program:
        for u in state.program.units:
            if u.number == unit_number:
                vocab_terms = [v.term.lower() for v in u.vocabulary]
                break

    if not vocab_terms:
        return results

    # Check PM-2.5 (all 20 terms)
    pm25 = unit_state.completed_pms.get("PM-2.5")
    if pm25:
        text = pm25.worksheet.lower()
        missing = [t for t in vocab_terms if t not in text]
        results.append(ValidationCheck(
            check_id="vocab_in_pm25",
            name="All 20 terms in Vocabulary worksheet",
            severity=Severity.CRITICAL if missing else Severity.INFO,
            passed=len(missing) == 0,
            details=f"Missing: {missing}" if missing else "All 20 present",
            affected_pms=["PM-2.5"],
            affected_units=[unit_number],
        ))

    # Check PM-4.2 (all 20 terms tested)
    pm42 = unit_state.completed_pms.get("PM-4.2")
    if pm42:
        text = pm42.worksheet.lower()
        missing = [t for t in vocab_terms if t not in text]
        results.append(ValidationCheck(
            check_id="vocab_in_pm42",
            name="All 20 terms tested in Cuestionario",
            severity=Severity.CRITICAL if len(missing) > 5 else Severity.WARNING if missing else Severity.INFO,
            passed=len(missing) <= 5,
            details=f"Missing {len(missing)}: {missing[:5]}" if missing else "All present",
            affected_pms=["PM-4.2"],
            affected_units=[unit_number],
        ))

    return results


def check_grammar_constraint(state: RunState, unit_number: int) -> list[ValidationCheck]:
    """CHECK 2: Grammar targets respected, no contamination."""
    results = []
    unit_key = str(unit_number)
    unit_state = state.unit_states.get(unit_key)
    if not unit_state:
        return results

    # Get declared grammar targets
    declared = []
    other_grammars = []
    if state.program:
        for u in state.program.units:
            if u.number == unit_number:
                declared = u.grammar_targets
            else:
                other_grammars.extend(u.grammar_targets)

    # Check PM-2.10 teaches the right grammar
    pm210 = unit_state.completed_pms.get("PM-2.10")
    if pm210 and declared:
        text = pm210.worksheet.lower()
        for target in declared:
            keywords = target.lower().split()
            found = any(kw in text for kw in keywords if len(kw) > 3)
            results.append(ValidationCheck(
                check_id=f"grammar_{target[:20].replace(' ', '_')}",
                name=f"PM-2.10 teaches: {target}",
                severity=Severity.CRITICAL if not found else Severity.INFO,
                passed=found,
                affected_pms=["PM-2.10"],
                affected_units=[unit_number],
            ))

    return results


def check_gfpi_completeness(state: RunState, unit_number: int) -> list[ValidationCheck]:
    """CHECK 7: All GFPI sections exist and are tagged."""
    results = []
    unit_key = str(unit_number)
    unit_state = state.unit_states.get(unit_key)
    if not unit_state:
        return results

    expected_tags = {
        "PM-1.2": ["1-IDENTIFICACION", "2-PRESENTACION", "5-GLOSARIO", "6-REFERENTES"],
        "PM-2.1": ["3.1-REFLEXION"],
        "PM-2.2": ["3.2-CONTEXTUALIZACION"],
        "PM-2.3": ["3.3-APROPIACION-READING"],
        "PM-2.4": ["3.3-APROPIACION-WRITING"],
        "PM-2.5": ["3.3-APROPIACION-VOCABULARY"],
        "PM-2.6": ["3.3-APROPIACION-LISTENING"],
        "PM-2.7": ["3.3-APROPIACION-PRONUNCIATION"],
        "PM-2.10": ["3.3-APROPIACION-GRAMMAR"],
        "PM-2.8": ["3.4-TRANSFERENCIA-SPEAKING"],
        "PM-3.5": ["3.4-TRANSFERENCIA-MISSION"],
    }

    missing_sections = []
    for pm_id, tags in expected_tags.items():
        pm_output = unit_state.completed_pms.get(pm_id)
        if not pm_output:
            missing_sections.append(f"{pm_id} (no output)")
            continue
        for tag in tags:
            if tag not in pm_output.gfpi_section:
                missing_sections.append(f"{pm_id} missing {tag}")

    results.append(ValidationCheck(
        check_id="gfpi_completeness",
        name="GFPI sections complete and tagged",
        severity=Severity.CRITICAL if len(missing_sections) > 3 else Severity.WARNING if missing_sections else Severity.INFO,
        passed=len(missing_sections) <= 3,
        details=f"Missing: {missing_sections}" if missing_sections else "All sections present",
        affected_units=[unit_number],
    ))

    return results


def check_archetype_documentation(state: RunState, unit_number: int) -> list[ValidationCheck]:
    """CHECK 5: Every PM output documents which archetype was used."""
    results = []
    unit_key = str(unit_number)
    unit_state = state.unit_states.get(unit_key)
    if not unit_state:
        return results

    pms_without_archetype = []
    for pm_id in ["PM-2.1", "PM-2.2", "PM-2.3", "PM-2.4", "PM-2.5",
                   "PM-2.6", "PM-2.7", "PM-2.8", "PM-2.10", "PM-3.5"]:
        pm_output = unit_state.completed_pms.get(pm_id)
        if pm_output and not pm_output.archetype_used:
            pms_without_archetype.append(pm_id)

    results.append(ValidationCheck(
        check_id="archetype_docs",
        name="Archetype documented for all PMs",
        severity=Severity.WARNING if pms_without_archetype else Severity.INFO,
        passed=len(pms_without_archetype) == 0,
        details=f"No archetype recorded: {pms_without_archetype}" if pms_without_archetype else "All documented",
        affected_pms=pms_without_archetype,
        affected_units=[unit_number],
    ))

    return results


ALL_CHECKS = [
    check_vocab_consistency,
    check_grammar_constraint,
    check_gfpi_completeness,
    check_archetype_documentation,
]


def run_validation(state: RunState) -> ValidationReport:
    """Run all coherence checks across all units."""
    all_results = []

    units = state.program.units if state.program else []
    for unit_spec in units:
        for check_fn in ALL_CHECKS:
            results = check_fn(state, unit_spec.number)
            all_results.extend(results)

    criticals = [r for r in all_results if r.severity == Severity.CRITICAL and not r.passed]
    warnings = [r for r in all_results if r.severity == Severity.WARNING and not r.passed]

    if criticals:
        status = "critical_errors"
    elif warnings:
        status = "warnings"
    else:
        status = "clean"

    return ValidationReport(
        run_id=state.run_id,
        checked_at=datetime.utcnow(),
        status=status,
        checks=all_results,
        total=len(all_results),
        passed=len([r for r in all_results if r.passed]),
        warnings=len(warnings),
        critical=len(criticals),
    )
