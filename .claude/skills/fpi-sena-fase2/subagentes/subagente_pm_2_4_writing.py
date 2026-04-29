"""
subagente_pm_2_4_writing.py — Subagente CREATIVO PM-2.4 Writing Task-Based.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.4 v2.0 · 5 arquetipos canónicos (A-E):
  - A — Genre Analysis
  - B — Modeled Writing
  - C — Collaborative TBLT / Independent Writing Task
  - D — (4° · ver master prompt)
  - E — Genre-Based Peer Review

CONSUMIDOR de PM-2.10 (Grammar targets · canon dependencia v1.2).
Productor de E2 Writing (5 pts · evidencia formal).
"""
import sys, json
from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))
from task_tool_bundler import preparar_bundle

PM_ID = "PM-2.4"
DEPENDENCIA_OBLIGATORIA = "PM-2.10"  # Grammar targets

def verificar_dependencia(run_id, runs_dir, guide_id):
    pm210_path = (Path(runs_dir) / run_id / (guide_id or "") / "pm-2-10.json")
    if not pm210_path.exists():
        return {"status": "MISSING", "pm_dependiente": "PM-2.10", "path_buscado": str(pm210_path),
                "warning": "PM-2.4 CONSUME Grammar targets de PM-2.10 (canon dependencia v1.2 · master prompt PM-2.4 línea 43)",
                "accion_recomendada": "Lanzar subagente_pm_2_10_grammar.py PRIMERO"}
    return {"status": "OK", "path": str(pm210_path), "size_bytes": pm210_path.stat().st_size}

def preparar_bundle_pm_2_4(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    print(f"[PM-2.4 writing] Preparando bundle Task tool...")
    chain_info = verificar_dependencia(run_id, runs_dir, guide_id)
    if chain_info["status"] == "MISSING":
        print(f"  ⚠ {chain_info['warning']}")
    bundle = preparar_bundle(PM_ID, run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = "1.0"
    bundle["consume_de"] = "Grammar targets de PM-2.10"
    bundle["dependencia_obligatoria"] = DEPENDENCIA_OBLIGATORIA
    bundle["previous_pms_chain"] = chain_info
    bundle["produce_evidencia"] = "E2 Writing (5 pts · evidencia formal · Producto)"
    bundle["catalogo_arquetipos_canonico"] = [
        "A — Genre Analysis", "B — Modeled Writing",
        "C — Collaborative TBLT / Independent Writing Task",
        "D — (4° · ver master prompt PM-2.4)",
        "E — Genre-Based Peer Review"
    ]
    bundle["status"] = "BLOCKED_MISSING_DEPENDENCY" if chain_info["status"] == "MISSING" else "READY"
    print(f"  ✓ Bundle {bundle['bundle_size_chars']:,} chars · status {bundle['status']}")
    return bundle

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_4_writing.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    bundle = preparar_bundle_pm_2_4(sys.argv[1], sys.argv[2], sys.argv[3],
                                     sys.argv[4] if len(sys.argv) > 4 else str(Path(sys.argv[2]).parent),
                                     sys.argv[5] if len(sys.argv) > 5 else None)
    print(f"\nExpected output: {bundle['expected_output_file']}")
