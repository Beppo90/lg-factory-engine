"""
subagente_pm_2_1_spark.py — Subagente CREATIVO PM-2.1 The Spark · Reflexión Inicial.

Camino arquitectónico (2): Task tool con master prompt inyectado · NO Python determinístico.
Master prompt PM-2.1 v3.0 canonizada Opción A 2026-04-28 · 2 modos canonizados:
  - mgv_compendio_metodologico (DEFAULT) · 1 arquetipo NARRATIVE_SCENARIO + estructura EXPLORE/ENGAGE/DISCOVER
  - diesel_secuencia_encadenada (EXTENSIBLE) · 4 arquetipos secuencia encadenada (A Visual · B Story · C News · D Debate)

Sin dependencias previas (PM-2.1 es primer Spark de S1 · activa motivación).
Alimenta a PM-2.2 (Gap Analysis diagnostica).
"""
import sys, json
from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))
from task_tool_bundler import preparar_bundle

PM_ID = "PM-2.1"

def preparar_bundle_pm_2_1(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    print(f"[PM-2.1 spark] Preparando bundle Task tool...")
    bundle = preparar_bundle(PM_ID, run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = "1.0"
    bundle["productor_de"] = "Spark inicial · activación motivacional para S1"
    bundle["dependencias_downstream"] = ["PM-2.2 gap (diagnostica gaps)"]
    bundle["catalogo_arquetipos_canonico_modo_default"] = ["NARRATIVE_SCENARIO (estructura EXPLORE/ENGAGE/DISCOVER)"]
    bundle["catalogo_arquetipos_canonico_modo_extensible"] = [
        "A — Visual/Infografía", "B — Story/Narrativa",
        "C — News/Noticia técnica", "D — Debate/Encuesta"
    ]
    bundle["status"] = "READY"
    print(f"  ✓ Bundle {bundle['bundle_size_chars']:,} chars · estilo {bundle['inputs_loaded']['arquetipos_elegidos'].get('estilo')}")
    return bundle

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_1_spark.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    bundle = preparar_bundle_pm_2_1(sys.argv[1], sys.argv[2], sys.argv[3],
                                     sys.argv[4] if len(sys.argv) > 4 else str(Path(sys.argv[2]).parent),
                                     sys.argv[5] if len(sys.argv) > 5 else None)
    print(f"\nExpected output: {bundle['expected_output_file']}")
