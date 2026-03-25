#!/usr/bin/env python3
"""
LG Factory Engine — CLI
SPEC-003 §14: Command-line interface.

Usage:
  python cli.py run --program maritime-g1 --profile balanced
  python cli.py run --program maritime-g1 --dry-run
  python cli.py list
  python cli.py status --run-id abc123
"""

import argparse
import json
import sys
from pathlib import Path

# Ensure engine is importable
sys.path.insert(0, str(Path(__file__).parent))

from engine.models import ProgramConfig, InstitutionalConfig, Instructor, UnitSpec, VocabTerm, CEFRLevel, NarrativeUniverse, Character, ArchetypeProfile
from engine.orchestrator import run_pipeline
from engine.state import StateManager
from engine.checkpoints import CLICheckpointHandler


def load_program_config(program_id: str) -> ProgramConfig:
    """Load a program config from JSON and convert to dataclass."""
    config_path = Path(__file__).parent / "config" / "programs" / f"{program_id}.json"
    if not config_path.exists():
        print(f"ERROR: Program config not found: {config_path}")
        print(f"Available programs:")
        programs_dir = Path(__file__).parent / "config" / "programs"
        for f in programs_dir.glob("*.json"):
            print(f"  - {f.stem}")
        sys.exit(1)

    data = json.loads(config_path.read_text(encoding='utf-8'))

    # Build dataclass
    instructor = Instructor(**data["institution"]["instructor"])
    institution = InstitutionalConfig(
        name=data["institution"]["name"],
        format=data["institution"]["format"],
        instructor=instructor,
        center=data["institution"].get("center"),
    )

    universe = None
    if "universe" in data:
        chars = [Character(**c) for c in data["universe"].get("characters", [])]
        universe = NarrativeUniverse(
            company=data["universe"]["company"],
            location=data["universe"]["location"],
            vessel=data["universe"].get("vessel"),
            characters=chars,
            scenarios=data["universe"].get("scenarios", []),
        )

    units = []
    for u in data["units"]:
        vocab = [VocabTerm(**v) for v in u.get("vocabulary", [])]
        units.append(UnitSpec(
            number=u["number"],
            name=u["name"],
            grammar_targets=u["grammar_targets"],
            theme=u["theme"],
            vocabulary=vocab,
        ))

    cefr = CEFRLevel(data.get("cefr_level", "A1.1"))
    profile = ArchetypeProfile(data.get("archetype_profile", "manual"))

    return ProgramConfig(
        id=data["id"],
        name=data["name"],
        institution=institution,
        domain=data["domain"],
        cefr_level=cefr,
        units=units,
        code=data.get("code"),
        competencia=data.get("competencia"),
        resultado_aprendizaje=data.get("resultado_aprendizaje"),
        universe=universe,
        sessions_per_unit=data.get("sessions_per_unit", 8),
        hours_per_session=data.get("hours_per_session", 3),
        skip_pm_1_1=data.get("skip_pm_1_1", False),
        archetype_profile=profile,
    )


def cmd_run(args):
    """Run the pipeline."""
    program_config = load_program_config(args.program)

    # Limit units if specified
    if args.units:
        program_config.units = program_config.units[:args.units]
        print(f"  Limited to {args.units} unit(s)")

    # Override profile if specified
    profile = None
    if args.profile:
        profile = ArchetypeProfile(args.profile)

    # Choose adapter
    adapter = None
    if not args.dry_run:
        if args.provider == "anthropic":
            from engine.adapters.claude import ClaudeAdapter
            adapter = ClaudeAdapter()
        elif args.provider == "google":
            from engine.adapters.google import GoogleAdapter
            adapter = GoogleAdapter()
        else:
            print(f"Provider '{args.provider}' not implemented yet. Use --dry-run.")
            sys.exit(1)

    state_mgr = StateManager(Path("output") if not args.output else Path(args.output))
    checkpoint = CLICheckpointHandler()

    run_pipeline(
        program_config=program_config,
        adapter=adapter,
        checkpoint_handler=checkpoint,
        state_manager=state_mgr,
        dry_run=args.dry_run,
        profile=profile,
    )


def cmd_list(args):
    """List all runs."""
    state_mgr = StateManager()
    runs = state_mgr.list_runs(args.program)

    if not runs:
        print("No runs found.")
        return

    print(f"\n{'Run ID':<12} {'Program':<20} {'Status':<15} {'Created'}")
    print(f"{'─'*12} {'─'*20} {'─'*15} {'─'*20}")
    for run in runs:
        print(f"{run['run_id'][:8]:<12} {run['program_id']:<20} {run['status']:<15} {run.get('created_at', 'N/A')[:19]}")


# ─── WORKSPACE COMMANDS ──────────────────────────────────────

def cmd_workspace_list(args):
    """List all workspaces."""
    from engine.admin import AnthropicAdminClient
    client = AnthropicAdminClient()
    result = client.list_workspaces(limit=args.limit)

    print(f"\n{'ID':<40} {'Name':<30} {'Status':<10} {'Created'}")
    print(f"{'─'*40} {'─'*30} {'─'*10} {'─'*20}")
    for ws in result.data:
        archived = " (archived)" if ws.archived_at else ""
        print(f"{ws.id:<40} {ws.name:<30} {ws.status:<10} {ws.created_at[:19]}{archived}")

    if result.has_more:
        print(f"\n  More results available. Use --after-id {result.last_id}")


def cmd_workspace_create(args):
    """Create a new workspace."""
    from engine.admin import AnthropicAdminClient
    client = AnthropicAdminClient()
    ws = client.create_workspace(args.name)
    print(f"\n  ✓ Workspace created:")
    print(f"    ID:   {ws.id}")
    print(f"    Name: {ws.name}")
    print(f"    Created: {ws.created_at}")


def cmd_key_list(args):
    """List API keys."""
    from engine.admin import AnthropicAdminClient
    client = AnthropicAdminClient()

    kwargs = {"limit": args.limit}
    if args.status:
        kwargs["status"] = args.status
    if args.workspace:
        kwargs["workspace_id"] = args.workspace

    result = client.list_api_keys(**kwargs)

    print(f"\n{'ID':<40} {'Name':<25} {'Status':<10} {'Key Hint':<15} {'Workspace'}")
    print(f"{'─'*40} {'─'*25} {'─'*10} {'─'*15} {'─'*30}")
    for key in result.data:
        ws = key.workspace_id[:30] if key.workspace_id else "(default)"
        print(f"{key.id:<40} {key.name:<25} {key.status:<10} {key.partial_key_hint:<15} {ws}")

    if result.has_more:
        print(f"\n  More results available. Use --after-id {result.last_id}")


def cmd_key_create(args):
    """Create a new API key."""
    from engine.admin import AnthropicAdminClient
    client = AnthropicAdminClient()
    result = client.create_api_key(name=args.name, workspace_id=args.workspace)

    print(f"\n  ✓ API Key created:")
    print(f"    Name:  {result.get('name', 'N/A')}")
    if "key" in result:
        print(f"    Key:   {result['key']}")
        print(f"    ⚠️  SAVE THIS KEY — it won't be shown again")
    else:
        print(f"    ID:    {result.get('id', 'N/A')}")


def main():
    parser = argparse.ArgumentParser(
        prog="lgfactory",
        description="LG Factory Engine — ESP Curriculum Design Pipeline",
    )
    subparsers = parser.add_subparsers(dest="command")

    # run
    run_parser = subparsers.add_parser("run", help="Run the pipeline")
    run_parser.add_argument("--program", required=True, help="Program ID (e.g., maritime-g1)")
    run_parser.add_argument("--dry-run", action="store_true", help="Dry run — no API calls")
    run_parser.add_argument("--provider", default="anthropic", choices=["anthropic", "google"])
    run_parser.add_argument("--profile", choices=["balanced", "production", "engagement", "manual"])
    run_parser.add_argument("--units", type=int, help="Limit to first N units (saves tokens)")
    run_parser.add_argument("--output", help="Output directory")

    # list
    list_parser = subparsers.add_parser("list", help="List all runs")
    list_parser.add_argument("--program", help="Filter by program ID")

    # workspace
    ws_parser = subparsers.add_parser("workspace", help="Manage Anthropic workspaces")
    ws_sub = ws_parser.add_subparsers(dest="ws_action")

    ws_list = ws_sub.add_parser("list", help="List workspaces")
    ws_list.add_argument("--limit", type=int, default=20, help="Items per page (1-1000)")

    ws_create = ws_sub.add_parser("create", help="Create a workspace")
    ws_create.add_argument("name", help="Workspace name (e.g., 'sena-cartagena')")

    # keys
    key_parser = subparsers.add_parser("keys", help="Manage API keys")
    key_sub = key_parser.add_subparsers(dest="key_action")

    key_list = key_sub.add_parser("list", help="List API keys")
    key_list.add_argument("--limit", type=int, default=20, help="Items per page")
    key_list.add_argument("--status", choices=["active", "inactive", "archived"], help="Filter by status")
    key_list.add_argument("--workspace", help="Filter by workspace ID")
    key_list.add_argument("--after-id", help="Pagination cursor")
    key_list.add_argument("--before-id", help="Pagination cursor")

    key_create = key_sub.add_parser("create", help="Create an API key")
    key_create.add_argument("name", help="Key name (e.g., 'sergio-maritime')")
    key_create.add_argument("--workspace", help="Workspace ID (omit for default)")

    args = parser.parse_args()

    if args.command == "run":
        cmd_run(args)
    elif args.command == "list":
        cmd_list(args)
    elif args.command == "workspace":
        if args.ws_action == "list":
            cmd_workspace_list(args)
        elif args.ws_action == "create":
            cmd_workspace_create(args)
        else:
            ws_parser.print_help()
    elif args.command == "keys":
        if args.key_action == "list":
            cmd_key_list(args)
        elif args.key_action == "create":
            cmd_key_create(args)
        else:
            key_parser.print_help()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
