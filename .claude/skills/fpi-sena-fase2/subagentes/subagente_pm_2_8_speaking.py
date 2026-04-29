"""
subagente_pm_2_8_speaking.py — Subagente CREATIVO PM-2.8 Speaking The Mission.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.8 v2.0 · 5 arquetipos canónicos (A-E · incluye pronunciation scaffolding):
  - A — Input + Model
  - B — Stock Cards + Preparation / Rehearsal + Scaffolding (chunk card drilling)
  - C — Live Performance (role play evaluado)
  - D — Pronunciation Scaffold (Chunk Cards)
  - E — (5° · ver master prompt)

NOTA: PM-2.7 deprecated · funcionalidad pronunciation absorbida en PM-2.8.
Paralelo a PM-2.6 en S4 (Listening + Speaking).
Productor de E4 Speaking (5 pts · evidencia formal).
"""
import sys, json
from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))
from task_tool_bundler import preparar_bundle

PM_ID = "PM-2.8"

def preparar_bundle_pm_2_8(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    print(f"[PM-2.8 speaking] Preparando bundle Task tool...")
    bundle = preparar_bundle(PM_ID, run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = "1.0"
    bundle["incluye"] = "Pronunciation scaffolding (PM-2.7 deprecated · absorbido en PM-2.8)"
    bundle["paralelo_con"] = "PM-2.6 listening (mismo S4)"
    bundle["produce_evidencia"] = "E4 Speaking (5 pts · evidencia formal · Desempeño)"
    bundle["catalogo_arquetipos_canonico"] = [
        "A — Input + Model", "B — Stock Cards + Preparation / Rehearsal",
        "C — Live Performance (role play evaluado)",
        "D — Pronunciation Scaffold (Chunk Cards)",
        "E — (5° · ver master prompt PM-2.8)"
    ]
    bundle["status"] = "READY"
    print(f"  ✓ Bundle {bundle['bundle_size_chars']:,} chars")
    return bundle

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_8_speaking.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    bundle = preparar_bundle_pm_2_8(sys.argv[1], sys.argv[2], sys.argv[3],
                                     sys.argv[4] if len(sys.argv) > 4 else str(Path(sys.argv[2]).parent),
                                     sys.argv[5] if len(sys.argv) > 5 else None)
    print(f"\nExpected output: {bundle['expected_output_file']}")
