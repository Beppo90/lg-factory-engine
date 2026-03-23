"""
LG Factory Engine — Checkpoint Handler
SPEC-003 §5: Human interaction layer.

V1: CLI prompts. V2: Web UI. The interface is decoupled from the engine.
"""

import sys
from engine.models import (
    GateId, Archetype, ArchetypeSelection, DecisionType,
    DecisionSource, HumanDecision, ValidationReport, Severity,
)
from datetime import datetime


class CheckpointHandler:
    """Abstract checkpoint handler — presents options, collects decisions."""

    def present_story_selection(self, curated_sources: list[dict]) -> list[str]:
        """G1: Show 3 curated sources, human selects 2."""
        raise NotImplementedError

    def present_archetype_selection(
        self, pm_id: str, pm_name: str, archetypes: list[Archetype],
        unit_name: str, profile_suggestion: str = None,
    ) -> ArchetypeSelection:
        """G2: Show archetype options for this PM, human selects one."""
        raise NotImplementedError

    def present_transversal_map(self, injection_map: dict) -> bool:
        """G3: Show where PM-2.9 functions will be injected."""
        raise NotImplementedError

    def present_final_mission(self, mission_design: dict) -> bool:
        """G4: Show Final Mission design, human approves."""
        raise NotImplementedError

    def present_validation_report(self, report: ValidationReport) -> str:
        """G5: Show coherence report, human decides action."""
        raise NotImplementedError

    def present_export_preview(self, file_manifest: list[str]) -> bool:
        """G6: Show list of files to export, human confirms."""
        raise NotImplementedError


class CLICheckpointHandler(CheckpointHandler):
    """CLI implementation of checkpoint handler."""

    def _print_header(self, title: str, pm_id: str = None, unit_name: str = None):
        print(f"\n{'═'*60}")
        print(f" {title}")
        if pm_id:
            print(f" PM: {pm_id}")
        if unit_name:
            print(f" Unit: {unit_name}")
        print(f"{'═'*60}")

    def _get_input(self, prompt: str, valid: list[str] = None) -> str:
        while True:
            try:
                val = input(f" {prompt}").strip()
            except (EOFError, KeyboardInterrupt):
                print("\n Aborting...")
                sys.exit(1)
            if valid is None or val.upper() in [v.upper() for v in valid]:
                return val.upper()
            print(f" Invalid. Choose from: {', '.join(valid)}")

    def present_story_selection(self, curated_sources: list[dict]) -> list[str]:
        self._print_header("GATE G1 — Story Selection")

        print("\n PM-1.2 curated 3 authentic sources. Select 2:\n")
        for i, src in enumerate(curated_sources, 1):
            print(f" [{i}] {src.get('title', 'N/A')}")
            print(f"     Source: {src.get('source', 'N/A')} | Genre: {src.get('genre', 'N/A')}")
            print(f"     URL: {src.get('url', 'N/A')}")
            if src.get('instructor_notes'):
                print(f"     Note: {src['instructor_notes']}")
            print()

        choices = []
        while len(choices) < 2:
            c = self._get_input(f"Select story {len(choices)+1} [1-3]: ", ["1", "2", "3"])
            idx = int(c) - 1
            if idx not in choices:
                choices.append(idx)

        selected = [curated_sources[i].get("id", f"story-{i+1}") for i in choices]
        print(f"\n Selected: {selected}")
        return selected

    def present_archetype_selection(
        self, pm_id: str, pm_name: str, archetypes: list[Archetype],
        unit_name: str, profile_suggestion: str = None,
    ) -> ArchetypeSelection:
        self._print_header("GATE G2 — Archetype Selection", pm_id, unit_name)

        print(f"\n {pm_name}\n")
        for arch in archetypes:
            print(f" [{arch.id}] {arch.name}")
            print(f"     {arch.description}")
            print(f"     Interactivity: {arch.interactivity.value} | Complexity: {arch.generation_complexity.value}")
            print()

        if profile_suggestion:
            print(f" Profile suggests: {profile_suggestion}")
            override = self._get_input(f" Use suggested ({profile_suggestion})? [Y/n]: ", ["Y", "N", ""])
            if override in ["Y", ""]:
                return ArchetypeSelection(
                    pm_id=pm_id,
                    unit_number=0,
                    archetype_id=profile_suggestion,
                    source=DecisionSource.PROFILE_AUTO,
                )

        choice = self._get_input(f"Your choice [{','.join(a.id for a in archetypes)}]: ",
                                  [a.id for a in archetypes])

        return ArchetypeSelection(
            pm_id=pm_id,
            unit_number=0,
            archetype_id=choice,
            source=DecisionSource.HUMAN if not profile_suggestion else DecisionSource.PROFILE_OVERRIDE,
        )

    def present_transversal_map(self, injection_map: dict) -> bool:
        self._print_header("GATE G3 — Transversal Functions")

        print("\n PM-2.9 will inject these functions into sessions:\n")
        for session, functions in injection_map.items():
            print(f" Session {session}: {', '.join(functions)}")

        approve = self._get_input("\nApprove injection map? [Y/n]: ", ["Y", "N", ""])
        return approve in ["Y", ""]

    def present_final_mission(self, mission_design: dict) -> bool:
        self._print_header("GATE G4 — Final Mission Approval")

        print(f"\n Mission: {mission_design.get('name', 'N/A')}")
        print(f" Oral: {mission_design.get('oral', 'N/A')}")
        print(f" Product: {mission_design.get('product', 'N/A')}")

        approve = self._get_input("\nApprove mission design? [Y/n]: ", ["Y", "N", ""])
        return approve in ["Y", ""]

    def present_validation_report(self, report: ValidationReport) -> str:
        self._print_header("GATE G5 — Coherence Report")

        status_icon = {"clean": "✅", "warnings": "⚠️", "critical_errors": "❌"}.get(report.status, "?")
        print(f"\n Status: {status_icon} {report.status.upper()}")
        print(f" Checks: {report.total} total | {report.passed} passed | {report.warnings} warnings | {report.critical} critical\n")

        for check in report.checks:
            icon = "✅" if check.passed else {"critical": "❌", "warning": "⚠️", "info": "ℹ️"}.get(check.severity.value, "?")
            print(f" {icon} {check.check_id}: {check.name}")
            if check.details and not check.passed:
                print(f"    → {check.details}")
            if check.affected_pms:
                print(f"    → Affected: {', '.join(check.affected_pms)}")

        print()
        action = self._get_input("Action: [A]pprove  [R]e-run validation  [Q]uit: ", ["A", "R", "Q"])
        return {"A": "approve", "R": "revalidate", "Q": "abort"}[action]

    def present_export_preview(self, file_manifest: list[str]) -> bool:
        self._print_header("GATE G6 — Export Preview")

        print(f"\n Files to export ({len(file_manifest)}):\n")
        for f in file_manifest:
            print(f"  📄 {f}")

        confirm = self._get_input("\nConfirm export? [Y/n]: ", ["Y", "N", ""])
        return confirm in ["Y", ""]

    def ask_retry(self, pm_id: str, error_msg: str) -> bool:
        """Ask user if they want to retry a failed PM."""
        self._print_header("ERROR — PM Failed")
        print(f"\n PM: {pm_id}")
        print(f" Error: {error_msg}")
        retry = self._get_input("\nRetry this PM? [Y/n]: ", ["Y", "N", ""])
        return retry in ["Y", ""]
