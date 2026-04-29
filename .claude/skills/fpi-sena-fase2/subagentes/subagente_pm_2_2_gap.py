"""
subagente_pm_2_2_gap.py — Subagente CREATIVO PM-2.2 Gap Analysis · Contextualización.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.2 v3.0 canonizada Opción A 2026-04-28 · 2 modos canonizados:
  - mgv_compendio_metodologico (DEFAULT) · 1 arquetipo THE_MIRROR + estructura WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT
  - diesel_secuencia_encadenada (EXTENSIBLE) · 4 arquetipos (A KWL · B Diagnosis visual · C Gap card · D Peer interview)

CONSUMIDOR de PM-2.1 (Spark activa motivación · Gap diagnostica gaps).
"""
import sys, json
from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))
from task_tool_bundler import preparar_bundle

PM_ID = "PM-2.2"
DEPENDENCIA_OBLIGATORIA = "PM-2.1"

def verificar_dependencia(run_id, runs_dir, guide_id):
    pm21_path = (Path(runs_dir) / run_id / (guide_id or "") / "pm-2-1.json")
    if not pm21_path.exists():
        return {"status": "MISSING", "pm_dependiente": "PM-2.1", "path_buscado": str(pm21_path),
                "warning": "PM-2.2 espera output de PM-2.1 (Spark activa motivación · Gap diagnostica) · sin pm-2-1.json el contenido será incoherente",
                "accion_recomendada": "Lanzar subagente_pm_2_1_spark.py PRIMERO"}
    return {"status": "OK", "path": str(pm21_path), "size_bytes": pm21_path.stat().st_size}

def preparar_bundle_pm_2_2(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    print(f"[PM-2.2 gap] Preparando bundle Task tool...")
    chain_info = verificar_dependencia(run_id, runs_dir, guide_id)
    if chain_info["status"] == "MISSING":
        print(f"  ⚠ {chain_info['warning']}")
    bundle = preparar_bundle(PM_ID, run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = "1.0"
    bundle["consume_de"] = "PM-2.1 Spark (activación motivacional)"
    bundle["dependencia_obligatoria"] = DEPENDENCIA_OBLIGATORIA
    bundle["previous_pms_chain"] = chain_info
    bundle["dependencias_downstream"] = ["PM-2.3 reading (gap analysis activa interés para reading)"]
    bundle["catalogo_arquetipos_canonico_modo_default"] = ["THE_MIRROR (estructura WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT)"]
    bundle["catalogo_arquetipos_canonico_modo_extensible"] = [
        "A — Self-assessment/KWL", "B — Diagnosis visual",
        "C — Gap card", "D — Peer interview"
    ]
    bundle["status"] = "BLOCKED_MISSING_DEPENDENCY" if chain_info["status"] == "MISSING" else "READY"
    print(f"  ✓ Bundle {bundle['bundle_size_chars']:,} chars · status {bundle['status']}")
    return bundle

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_2_gap.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    bundle = preparar_bundle_pm_2_2(sys.argv[1], sys.argv[2], sys.argv[3],
                                     sys.argv[4] if len(sys.argv) > 4 else str(Path(sys.argv[2]).parent),
                                     sys.argv[5] if len(sys.argv) > 5 else None)
    print(f"\nExpected output: {bundle['expected_output_file']}")
