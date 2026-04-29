"""
subagente_pm_2_10_grammar.py — Subagente CREATIVO PM-2.10 Grammar Structure Use.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.10 v2.0 · 5 arquetipos canónicos (A-E):
  - A — Inductive Discovery + Error Log (Discovery First obligatorio)
  - B — Error Log + Grammar Stations
  - C — Grammar Stations / Integrated Production
  - D — Grammar in Real Formats
  - E — (5° · ver master prompt)

PRODUCTOR de Grammar targets que PM-2.4 CONSUME (canon dependencia v1.2).
Se ejecuta en S3 (intro/discovery) y S5 (consolidación).

Sin dependencias previas en S3 · primer PM en orden ejecución de S3.
"""
import sys, json
from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))
from task_tool_bundler import preparar_bundle

PM_ID = "PM-2.10"

def preparar_bundle_pm_2_10(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    print(f"[PM-2.10 grammar] Preparando bundle Task tool...")
    bundle = preparar_bundle(PM_ID, run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = "1.0"
    bundle["productor_de"] = "Grammar targets (consumido por PM-2.4 writing)"
    bundle["dependencias_downstream"] = ["PM-2.4 writing (CONSUMIDOR de Grammar targets)"]
    bundle["se_ejecuta_en_sesiones"] = ["S3 (intro/discovery)", "S5 (consolidación)"]
    bundle["catalogo_arquetipos_canonico"] = [
        "A — Inductive Discovery + Error Log (Discovery First obligatorio)",
        "B — Error Log + Grammar Stations",
        "C — Grammar Stations / Integrated Production",
        "D — Grammar in Real Formats",
        "E — (5° · ver master prompt PM-2.10)"
    ]
    bundle["status"] = "READY"
    print(f"  ✓ Bundle {bundle['bundle_size_chars']:,} chars")
    return bundle

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_10_grammar.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    bundle = preparar_bundle_pm_2_10(sys.argv[1], sys.argv[2], sys.argv[3],
                                     sys.argv[4] if len(sys.argv) > 4 else str(Path(sys.argv[2]).parent),
                                     sys.argv[5] if len(sys.argv) > 5 else None)
    print(f"\nExpected output: {bundle['expected_output_file']}")
