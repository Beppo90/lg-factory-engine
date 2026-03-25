"""
LG Factory — CLI Orchestrator
Single command to run the full PM chain pipeline.

Usage:
  python run.py --program maritime --unit 1 --provider anthropic
  python run.py --program maritime --unit 1 --dry-run
  python run.py --program maritime --unit 1 --validate-only
"""

import argparse
import json
import sys
import time
from pathlib import Path

# Add orchestrator to path
sys.path.insert(0, str(Path(__file__).parent))

from engine.pm_engine import ContextStore, execute_pm, build_prompt
from engine.gfpi_assembler import extract_all_from_artifacts, assemble_gfpi, validate_gfpi, save_gfpi
from engine.validator import validate_unit_coherence, print_validation_report, run_all_validations
from engine.docx_exporter import generate_unit_docx, generate_gfpi_docx

BASE_DIR = Path(__file__).parent
CONFIG_DIR = BASE_DIR / "config"
OUTPUT_DIR = BASE_DIR / "output"
GUIDES_DIR = BASE_DIR.parent / "guides"


def load_config():
    """Load all config files."""
    programs_raw = json.loads((CONFIG_DIR / "programs.json").read_text())
    programs = programs_raw.get("programs", programs_raw)
    pm_chain_raw = json.loads((CONFIG_DIR / "pm_chain.json").read_text())
    pm_chain = pm_chain_raw.get("pm_chain", pm_chain_raw)
    archetypes = json.loads((CONFIG_DIR / "archetypes.json").read_text())
    return programs, pm_chain, archetypes


def get_archetype_description(pm_code: str, archetype_code: str, unit_number: str) -> str:
    """Generate archetype description from code like 'A+C+E'."""
    # Archetype descriptions by PM
    descriptions = {
        "PM-2.1": {
            "A": "Crisis — ship arrives without safety documentation",
            "B": "Debate — does a seafarer need English to work?",
            "C": "News — real incident where safety equipment was critical",
            "D": "Personal — self-assessment of nautical knowledge",
            "E": "Competition — challenge to name ship parts"
        },
        "PM-2.2": {
            "A": "Visual — labeled ship diagram with recognition marking",
            "B": "Scenario — PSC inspection scenario",
            "C": "Scale — self-assessment scale 1-5",
            "D": "Prediction — predict English/Spanish cognates",
            "E": "Group Map — team drawing activity"
        },
        "PM-2.3": {
            "A": "TBLT Cycle — task-based reading with diagram completion",
            "B": "Comprehension Strategies — K-W-L",
            "C": "Information Gap — different diagrams, exchange info",
            "D": "Cooperative Jigsaw — each member reads a section",
            "E": "Multimodal — reading + real inspection images",
            "F": "HOTS Focus — divergent questions about PSC"
        },
        "PM-2.4": {
            "A": "Exploratory — free description of a ship",
            "B": "Academic/Formal — Vessel Description Report",
            "C": "Collaborative TBLT — team inspection guide",
            "D": "AI-Mediated — skeleton structure completion",
            "E": "Genre-Based — Safety Equipment Checklist"
        },
        "PM-2.5": {
            "A": "Phonics & Spelling — nautical pronunciation",
            "B": "Vocabulary Development — categorization of 20 terms",
            "C": "Reading Fluency — reading anchor aloud",
            "D": "Writing Scaffolding — demonstrative sentences",
            "E": "Interactive Literacy — matching game"
        },
        "PM-2.6": {
            "A": "Micro-Skills — identify demonstratives in audio",
            "B": "Phase-Based — pre/listening → gist → detail → task",
            "C": "TBLT — listen and complete ship diagram",
            "D": "Bloom Progression — remember → understand → analyze",
            "E": "Advanced — PSC report listening extraction",
            "F": "Multimedia — real ship tour video"
        },
        "PM-2.7": {
            "A": "Phoneme Focus — /θ/, /ʃ/ vs /tʃ/",
            "B": "Prosody & Rhythm — demonstrative intonation",
            "C": "Shadowing & Repetition — repeat after audio",
            "D": "Chunking & Fluency — natural pause groups",
            "E": "Minimal Pairs — ship/sheep, bow/bough"
        },
        "PM-2.8": {
            "A": "Gap Tasks — A describes, B fills diagram",
            "B": "Role-Based — PSC Inspector / Chief Officer",
            "C": "Multimedia Output — podcast recording",
            "D": "Rehearsal & Scaffolding — guided → free",
            "E": "Interaction Dynamics — chain description"
        },
        "PM-2.10": {
            "A": "Discovery — inductive rule finding",
            "B": "Controlled Practice — repetitive drills",
            "C": "Communicative Grammar — mystery ship game",
            "D": "Creative Production — future ship invention",
            "E": "Editing & Error Analysis — correct inspection report"
        },
        "PM-3.5": {
            "A": "Professional Simulation — PSC inspection",
            "B": "Problem-Solution — diagnose safety deficiency",
            "C": "Production — Ship Identification Guide",
            "D": "Collaborative Project — team vessel documentation",
            "E": "Gamified — escape room with ship riddles"
        }
    }

    if not archetype_code:
        return "Transversal — no archetype selection (functions injected into sessions)"

    codes = archetype_code.split("+")
    parts = []
    pm_descs = descriptions.get(pm_code, {})
    for c in codes:
        c = c.strip()
        desc = pm_descs.get(c, f"Archetype {c}")
        parts.append(f"{c}) {desc}")
    return " + ".join(parts)


def run_pipeline(program_key: str, unit_number: str, provider: str,
                 dry_run: bool = False, validate_only: bool = False,
                 start_from: str = None):
    """Run the full PM chain for a unit."""

    programs, pm_chain, archetypes = load_config()
    program_config = programs.get(program_key)
    if not program_config:
        print(f"ERROR: Program '{program_key}' not found in config.")
        print(f"Available: {list(programs.keys())}")
        return

    unit_config = program_config["units"].get(unit_number)
    if not unit_config:
        print(f"ERROR: Unit '{unit_number}' not found in program '{program_key}'.")
        print(f"Available: {list(program_config['units'].keys())}")
        return

    unit_config["_unit_number"] = unit_number

    print(f"\n{'='*60}")
    print(f"  LG FACTORY — ORCHESTRATOR")
    print(f"  Program: {program_config['name']}")
    print(f"  Unit: {unit_number} — {unit_config['name']}")
    print(f"  Provider: {provider}")
    print(f"  Mode: {'DRY RUN' if dry_run else 'VALIDATE ONLY' if validate_only else 'LIVE'}")
    print(f"{'='*60}")

    context = ContextStore()
    output_dir = OUTPUT_DIR / program_key / f"unit_{unit_number}"

    # Load archetype selections
    unit_archetypes = archetypes.get(program_key, {}).get(f"unit_{unit_number}", {})

    # PM chain for Fase 2 (per unit)
    fase2_pms = [
        "PM-2.1", "PM-2.2", "PM-2.3", "PM-2.4", "PM-2.5",
        "PM-2.6", "PM-2.7", "PM-2.8", "PM-2.9", "PM-2.10"
    ]

    start = time.time()

    # Step 1: PM-1.2 (Scope & Sequence)
    if not start_from or start_from == "PM-1.2":
        print(f"\n--- PM-1.2: Scope & Sequence + Curación ---")
        if not validate_only:
            output = execute_pm("PM-1.2", context, unit_config, program_config,
                               provider=provider, dry_run=dry_run)
            if not dry_run:
                _save_pm_output(output, output_dir, "PM-1.2", unit_number, program_key)

    # Step 2: Fase 2 — each PM in sequence
    for pm_code in fase2_pms:
        if start_from and pm_code < start_from:
            continue

        archetype_code = unit_archetypes.get(pm_code) if unit_archetypes else None

        if pm_code == "PM-2.9":
            archetype_desc = "Transversal — functions injected into sessions 2-5"
        elif not archetype_code:
            print(f"\n--- {pm_code}: SKIPPED (no archetype selected) ---")
            continue
        else:
            archetype_desc = get_archetype_description(pm_code, archetype_code, unit_number)

        print(f"\n--- {pm_code}: Archetypes [{archetype_code}] ---")

        if not validate_only:
            output = execute_pm(pm_code, context, unit_config, program_config,
                               archetype_desc=archetype_desc,
                               provider=provider, dry_run=dry_run)
            if not dry_run:
                _save_pm_output(output, output_dir, pm_code, unit_number, program_key)

    # Step 3: Assemble GFPI
    elapsed = time.time() - start
    print(f"\n{'='*60}")
    print(f"  PIPELINE COMPLETE — {elapsed:.1f}s")
    print(f"{'='*60}")

    if not dry_run:
        artifacts = context.get_all_artifacts()
        if artifacts:
            sections, source_map = extract_all_from_artifacts(artifacts)
            validation = validate_gfpi(sections)
            print(f"\n  GFPI Status: {validation['status']}")
            print(f"  Coverage: {validation['coverage']}")
            if validation['missing']:
                print(f"  Missing sections:")
                for m in validation['missing']:
                    print(f"    - {m}")

            # Assemble and save GFPI
            gfpi_content = assemble_gfpi(
                sections, program_config['name'],
                unit_config['name'], unit_number
            )
            save_gfpi(gfpi_content, output_dir, program_key, unit_number)

        # Generate DOCX
        try:
            unit_outputs = {}
            for pm_code in ["PM-1.2"] + fase2_pms:
                artifact = context.get_artifact(pm_code, "output")
                if artifact:
                    unit_outputs[pm_code] = artifact

            if unit_outputs:
                docx_path = output_dir / f"{program_config['name']} — Unidad {unit_number} — {unit_config['name']}.docx"
                generate_unit_docx(
                    unit_outputs, program_config['name'],
                    unit_config['name'], unit_number,
                    program_config['cefr'],
                    unit_config['grammar_targets'],
                    unit_config['key_vocabulary'],
                    docx_path
                )
        except ImportError:
            print("  DOCX export skipped (pip install python-docx)")

        # Save context for resume
        context_path = output_dir / "context.json"
        context.save(context_path)
        print(f"\n  Context saved: {context_path}")

    print(f"\n  Output directory: {output_dir}")


def _save_pm_output(output: str, output_dir: Path, pm_code: str,
                     unit_number: str, program_key: str):
    """Save individual PM output as markdown."""
    pm_dir = output_dir / "worksheets"
    pm_dir.mkdir(parents=True, exist_ok=True)
    path = pm_dir / f"U{unit_number}-{pm_code}.md"
    path.write_text(output, encoding='utf-8')
    print(f"  Saved: {path.name}")


def main():
    parser = argparse.ArgumentParser(
        description="LG Factory — Curriculum Design Orchestrator",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run.py --program maritime --unit 1 --dry-run
  python run.py --program maritime --unit 1 --provider anthropic
  python run.py --program maritime --unit 1 --validate-only
  python run.py --program maritime --unit 1 --start-from PM-2.3
        """
    )
    parser.add_argument('--program', help='Program key (e.g., maritime, adso)')
    parser.add_argument('--unit', help='Unit number (e.g., 1, 2, 3)')
    parser.add_argument('--provider', default='anthropic', choices=['anthropic', 'openai'],
                        help='LLM provider (default: anthropic)')
    parser.add_argument('--dry-run', action='store_true', help='Show prompts without calling API')
    parser.add_argument('--validate-only', action='store_true', help='Run validation on existing outputs')
    parser.add_argument('--start-from', help='Start from a specific PM (e.g., PM-2.3)')
    parser.add_argument('--list-programs', action='store_true', help='List available programs')
    parser.add_argument('--list-units', help='List units for a program')

    args = parser.parse_args()

    if args.list_programs:
        programs, _, _ = load_config()
        for key, config in programs.items():
            units = list(config.get('units', {}).keys())
            print(f"  {key}: {config['name']} — Units: {', '.join(units)}")
        return

    if args.list_units:
        programs, _, _ = load_config()
        prog = programs.get(args.list_units)
        if prog:
            for num, unit in prog['units'].items():
                print(f"  Unit {num}: {unit['name']} — Grammar: {', '.join(unit['grammar_targets'])}")
        else:
            print(f"Program '{args.list_units}' not found.")
        return

    if not args.program or not args.unit:
        parser.error("--program and --unit are required (or use --list-programs)")

    run_pipeline(
        program_key=args.program,
        unit_number=args.unit,
        provider=args.provider,
        dry_run=args.dry_run,
        validate_only=args.validate_only,
        start_from=args.start_from
    )


if __name__ == '__main__':
    main()
