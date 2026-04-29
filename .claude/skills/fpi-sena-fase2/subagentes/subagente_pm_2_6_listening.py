"""
subagente_pm_2_6_listening.py — Subagente CREATIVO PM-2.6 Listening Auditory Anchor.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.6 v2.0 · 6 arquetipos canónicos (A-F):
  - A — Micro-Skills Foundation / Scene Setup
  - B — Phase-Based Framework (Pre/While/Post)
  - C — TBLT Listening (Task-Based)
  - D — Bloom Progression (Cognitive Scaling) / Role play
  - E — Advanced Techniques (Shadowing + Dictogloss + Predictive)
  - F — Multimedia Production (Audio → Creative Output)

Story B asignada por PM-1.2 (Listening script).
Paralelo a PM-2.8 en S4 (Listening + Speaking).
Productor de E3 Listening (5 pts · evidencia formal).
"""
import sys, json
from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))
from task_tool_bundler import preparar_bundle

PM_ID = "PM-2.6"

def preparar_bundle_pm_2_6(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    print(f"[PM-2.6 listening] Preparando bundle Task tool...")
    bundle = preparar_bundle(PM_ID, run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = "1.0"
    bundle["consume_de"] = "Story B asignada por PM-1.2 (Listening script)"
    bundle["paralelo_con"] = "PM-2.8 speaking (mismo S4 · paralelizables)"
    bundle["produce_evidencia"] = "E3 Listening (5 pts · evidencia formal · Conocimiento)"
    bundle["catalogo_arquetipos_canonico"] = [
        "A — Micro-Skills Foundation", "B — Phase-Based Framework (Pre/While/Post)",
        "C — TBLT Listening (Task-Based)", "D — Bloom Progression / Role play",
        "E — Advanced Techniques (Shadowing + Dictogloss + Predictive)",
        "F — Multimedia Production (Audio → Creative Output)"
    ]
    bundle["status"] = "READY"
    print(f"  ✓ Bundle {bundle['bundle_size_chars']:,} chars")
    return bundle

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_6_listening.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    bundle = preparar_bundle_pm_2_6(sys.argv[1], sys.argv[2], sys.argv[3],
                                     sys.argv[4] if len(sys.argv) > 4 else str(Path(sys.argv[2]).parent),
                                     sys.argv[5] if len(sys.argv) > 5 else None)
    print(f"\nExpected output: {bundle['expected_output_file']}")
