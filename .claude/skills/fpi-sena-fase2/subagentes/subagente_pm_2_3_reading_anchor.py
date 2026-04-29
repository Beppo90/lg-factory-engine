"""
subagente_pm_2_3_reading_anchor.py — Subagente CREATIVO PM-2.3 Reading: The Master Anchor.

Camino arquitectónico (2): Task tool con master prompt inyectado · NO Python determinístico.

Este subagente NO genera Activity Card directamente · usa task_tool_bundler.py para
PREPARAR el bundle que el orquestador (Claude) lanza vía Task tool en runtime.

Productor del Master Anchor Text (PM-2.3 master prompt §70-86) que PM-2.5 consume.

6 arquetipos canónicos (modo extensible):
- A — TBLT CYCLE
- B — COMPREHENSION STRATEGIES
- C — INFORMATION GAP
- D — COOPERATIVE
- E — MULTIMODAL
- F — HOTS FOCUS

Modo MGV-style: documenta los 6 arquetipos como compendio metodológico.
Modo DIESEL-style: 3-4 arquetipos en secuencia encadenada (canon DIESEL pm-2-3.json).

Uso:
    python3 subagente_pm_2_3_reading_anchor.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]
    
Output: bundle JSON listo para que orquestador lance Task tool.
        El bundle se imprime en stdout · NO se ejecuta automáticamente.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from task_tool_bundler import preparar_bundle


PM_ID = "PM-2.3"
SCHEMA_VERSION = "1.0"


def preparar_bundle_pm_2_3(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    """
    Prepara bundle de invocación canónica para PM-2.3 reading anchor.
    
    Returns:
        dict con bundle completo (subagent_type + prompt + expected_output + validations)
        listo para Task tool · NO se lanza automáticamente.
    """
    print(f"[PM-2.3 reading anchor] Preparando bundle Task tool...")
    print(f"  run: {run_id} · guide: {guide_id} · runs_dir: {runs_dir}")
    
    bundle = preparar_bundle(
        pm_id=PM_ID,
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=repo_root,
        guide_id=guide_id
    )
    
    # Anotaciones específicas de PM-2.3 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SCHEMA_VERSION
    bundle["productor_de"] = "Master Anchor Text (consumido por PM-2.5)"
    bundle["dependencias_downstream"] = ["PM-2.5 vocabulary (consume Master Anchor)"]
    bundle["catalogo_arquetipos_canonico"] = [
        "A — TBLT CYCLE",
        "B — COMPREHENSION STRATEGIES",
        "C — INFORMATION GAP",
        "D — COOPERATIVE",
        "E — MULTIMODAL",
        "F — HOTS FOCUS"
    ]
    
    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Estilo declarado: {bundle['inputs_loaded']['arquetipos_elegidos']['estilo']}")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']}")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    print(f"     Validation behavioral real requiere lanzar + comparar contra ground truth (Semana 4 o sesión siguiente).")
    
    return bundle


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_3_reading_anchor.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    
    run_id = sys.argv[1]
    runs_dir = sys.argv[2]
    master_prompts_dir = sys.argv[3]
    repo_root = sys.argv[4] if len(sys.argv) > 4 else str(Path(runs_dir).parent)
    guide_id = sys.argv[5] if len(sys.argv) > 5 else None
    
    bundle = preparar_bundle_pm_2_3(run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    
    # Smoke shape: mostrar estructura del bundle (NO lanzar)
    print(f"\n=== BUNDLE STRUCTURE (smoke shape · estático · NO se lanza Task tool) ===")
    summary = {
        "subagent_type": bundle["subagent_type"],
        "expected_output_file": bundle["expected_output_file"],
        "bundle_size_chars": bundle["bundle_size_chars"],
        "validations_count": len(bundle["validation_post_hoc"]),
        "inputs_loaded_summary": {
            k: v if not isinstance(v, dict) else "loaded" 
            for k, v in bundle["inputs_loaded"].items()
        },
        "estilo_declarado": bundle["inputs_loaded"]["arquetipos_elegidos"].get("estilo"),
        "ref_op_path": bundle["inputs_loaded"]["ref_op_path"]
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
