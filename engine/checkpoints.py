"""
LG Factory Engine — Checkpoint Handler v0.2
SPEC-003 §5: Human interaction layer (G0-G6 gates + C-1-C-5 confirmations).

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

    def present_macrotheme_selection(self, suggested: list[str], program_type: str) -> str:
        """G0: Show suggested macrothemes, human selects one or enters free."""
        raise NotImplementedError

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

    def ask_optional_product(self, pm_id: str, pm_name: str, category: str) -> bool:
        """C-1 to C-5: Ask if instructor wants an optional product."""
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

    def present_macrotheme_selection(self, suggested: list[str], program_type: str) -> str:
        self._print_header("GATE G0 — Macrotheme Selection")

        count = 6 if program_type == "técnica" else 10
        print(f"\n Program type: {program_type} → {count} macrothemes suggested\n")

        if suggested:
            for i, theme in enumerate(suggested, 1):
                print(f" [{i}] {theme}")
            print(f" [{len(suggested)+1}] Enter a custom macrotheme")
            print()

            choice = self._get_input(
                f"Select macrotheme [1-{len(suggested)+1}]: ",
                [str(i) for i in range(1, len(suggested)+2)]
            )
            idx = int(choice) - 1
            if idx < len(suggested):
                return suggested[idx]

        # Custom input
        try:
            custom = input(" Enter your macrotheme: ").strip()
        except (EOFError, KeyboardInterrupt):
            custom = "Custom Macrotheme"
        return custom if custom else "Custom Macrotheme"

    def present_story_selection(self, curated_sources: list[dict]) -> list[str]:
        self._print_header("GATE G1 — Story Selection")

        print("\n PM-1.2 curated 3 authentic sources. Select 2:\n")
        for i, src in enumerate(curated_sources, 1):
            title = src.get('title', src.get('id', f'Source {i}')) if isinstance(src, dict) else str(src)
            genre = src.get('genre', 'N/A') if isinstance(src, dict) else 'N/A'
            url = src.get('url', 'N/A') if isinstance(src, dict) else 'N/A'
            print(f" [{i}] {title}")
            print(f"     Genre: {genre}")
            print(f"     URL: {url}")
            if isinstance(src, dict) and src.get('instructor_notes'):
                print(f"     Note: {src['instructor_notes']}")
            print()

        choices = []
        while len(choices) < 2:
            c = self._get_input(f"Select story {len(choices)+1} [1-3]: ", ["1", "2", "3"])
            idx = int(c) - 1
            if idx not in choices:
                choices.append(idx)

        selected = []
        for i in choices:
            if isinstance(curated_sources[i], dict):
                selected.append(curated_sources[i].get('id', f'story-{i+1}'))
            else:
                selected.append(f'story-{i+1}')
        print(f"\n Selected: {selected}")
        return selected

    def present_archetype_selection(
        self, pm_id: str, pm_name: str, archetypes: list[Archetype],
        unit_name: str, profile_suggestion: str = None,
    ) -> ArchetypeSelection:
        self._print_header("GATE G2 — Archetype Selection", pm_id, unit_name)

        print(f"\n {pm_name}\n")
        for arch in archetypes:
            interactivity = arch.interactivity.value if hasattr(arch.interactivity, 'value') else str(arch.interactivity)
            complexity = arch.generation_complexity.value if hasattr(arch.generation_complexity, 'value') else str(arch.generation_complexity)
            print(f" [{arch.id}] {arch.name}")
            print(f"     {arch.description}")
            print(f"     Interactivity: {interactivity} | Complexity: {complexity}")
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
            if isinstance(functions, list):
                print(f" Session {session}: {', '.join(functions)}")
            else:
                print(f" Session {session}: {functions}")

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
            icon = "✅" if check.passed else {"critical": "❌", "warning": "⚠️", "info": "ℹ️"}.get(check.severity.value if hasattr(check.severity, 'value') else str(check.severity), "?")
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

    def ask_optional_product(self, pm_id: str, pm_name: str, category: str) -> bool:
        """C-1 to C-5: Ask if instructor wants an optional product."""
        conf_id = {
            "PM-3.3": "C-1", "PM-3.4": "C-2", "PM-4.2": "C-3",
            "PM-3.1": "C-4", "PM-3.2": "C-5",
        }.get(pm_id, "?")

        self._print_header(f"CONFIRMATION {conf_id} — Optional Product")

        print(f"\n Product: {pm_name}")
        print(f" Category: {category}")
        print()

        # Product-specific descriptions
        descriptions = {
            "PM-3.3": "Text description for creating a Canva Deck / PPTX / NotebookLM presentation",
            "PM-3.4": "Autonomous Workbook (REINFORCE + EXTEND + PREPARE)\n     Auto-generated using 2 archetypes per PM from PM-2.3 to PM-2.10",
            "PM-4.2": "Technical Quiz IE-01 + Answer Key\n     Auto-generated using 1 archetype per PM from PM-2.3 to PM-2.10",
            "PM-3.1": "Playbook Outline — Session Map for the instructor\n     Includes PM-4.1 evaluation instruments",
            "PM-3.2": "Playbook Build-Out — Step by step session details\n     Requires PM-3.1 (Playbook Outline)",
        }
        desc = descriptions.get(pm_id, "")
        if desc:
            print(f" {desc}\n")

        confirm = self._get_input(f"Generate {pm_name}? [Y/n]: ", ["Y", "N", ""])
        return confirm in ["Y", ""]

class NullCheckpointHandler(CheckpointHandler):
    """Auto-approves everything — for testing/dry-run mode."""

    def present_macrotheme_selection(self, suggested: list[str], program_type: str) -> str:
        return suggested[0] if suggested else "Default Macrotheme"

    def present_story_selection(self, curated_sources: list[dict]) -> list[str]:
        if len(curated_sources) >= 2:
            return [
                curated_sources[0].get('id', 'story-1') if isinstance(curated_sources[0], dict) else 'story-1',
                curated_sources[1].get('id', 'story-2') if isinstance(curated_sources[1], dict) else 'story-2',
            ]
        return ['story-1', 'story-2']

    def present_archetype_selection(self, pm_id, pm_name, archetypes, unit_name, profile_suggestion=None):
        return ArchetypeSelection(
            pm_id=pm_id, unit_number=0,
            archetype_id=profile_suggestion or (archetypes[0].id if archetypes else "A"),
            source=DecisionSource.PROFILE_AUTO,
        )

    def present_transversal_map(self, injection_map):
        return True

    def present_final_mission(self, mission_design):
        return True

    def present_validation_report(self, report):
        return "approve"

    def present_export_preview(self, file_manifest):
        return True

    def ask_retry(self, pm_id, error_msg):
        return False

    def ask_optional_product(self, pm_id, pm_name, category):
        return True  # Auto-confirm all optional products in test mode
