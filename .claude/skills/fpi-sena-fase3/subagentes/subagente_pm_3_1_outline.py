"""
subagente_pm_3_1_outline.py — Subagente CREATIVO PM-3.1 Playbook Outline (Session Map).

Camino arquitectónico (2): Task tool con master prompt PM-3.1 v2.6 inyectado.
Per PLAN-FASE-3-ARQUITECTURA.md v1.2 §11.1 #2 corregido (REGLA 21 reincidencia detectada
2026-04-29 · NO Camino 1 mecánico como erróneamente marqué en v1.0.1/v1.1).

Productor del Playbook Outline (PM-3.1 master prompt v2.6 · 30 keys canónicos · pm0_alignment_by_session
crítico) que PM-3.2 Build-Outs consumen via pm_3_2_propagation_contract.

Genera pm-3-1.json shape MGV v2.6 canon:
- header (18 sub-keys: programa metadata + universo_narrativo + avatares)
- overview_table (list 8 sesiones con worksheets + foco + autonomo)
- sessions_detail (string note · DELEGADO a pm-3-2-sX.json per canon v2.6)
- skills_progression_map · ambientes_resumen · estrategias_resumen · voc_dimensions_table
- pm0_alignment_by_session (CRÍTICO v2.5.1+ · cierra BUG-PM31-001)
- autonomous_work_map · master_materials_list · validation_pm31_v251
- pm_3_2_propagation_contract · siguiente_paso

Wrapper Python prepara bundle vía preparar_bundle_phase3() · NO ejecuta Task tool
automáticamente. El orquestador (Claude principal) decide cuándo invocar usando este bundle.

Uso:
    python3 subagente_pm_3_1_outline.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase3


PM_ID = "PM-3.1"
SUBAGENTE_VERSION = "1.0"  # Hito 2 Task 1 · 2026-04-29


def preparar_bundle_pm_3_1(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    """Prepara bundle Task tool canónico para PM-3.1 Playbook Outline.
    
    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para que orquestador lance Task tool · NO se ejecuta automáticamente.
    
    Raises:
        ValueError si gate canon §6.4 no cumplido (pm-2-11.ready_for_phase_3 != True)
        ValueError si algún Activity Card .enriched != True (Gate 2 Fase 2 incompleto)
    """
    print(f"[PM-3.1 outline] Preparando bundle Task tool Camino 2 LLM...")
    print(f"  run: {run_id} · guide: {guide_id} · runs_dir: {runs_dir}")
    
    bundle = preparar_bundle_phase3(
        pm_id=PM_ID,
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=repo_root,
        guide_id=guide_id
    )
    
    # Anotaciones específicas de PM-3.1 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon corregido v1.2 (REGLA 21 reincidencia)"
    bundle["productor_de"] = "Playbook Outline (PM-3.1) · pm0_alignment_by_session consumido por PM-3.2 ×8"
    bundle["dependencias_downstream"] = [
        "PM-3.2 Build-Out (8 ejecuciones · consume pm_3_2_propagation_contract + pm0_alignment_by_session)"
    ]
    bundle["shape_canonico_esperado"] = {
        "top_level_keys": 30,
        "ground_truth_ref": "runs/MGV-2026-04-20/pm-3-1.json (canon más maduro v2.6)",
        "campos_criticos_v_2_5_1": [
            "pm0_alignment_by_session (list 8 · cierra BUG-PM31-001)",
            "validation_pm31_v251 (17 sub-keys)",
            "pm_3_2_propagation_contract (5 sub-keys)"
        ],
        "campo_delegado": "sessions_detail = string note 'Se incluyen en pm-3-2-sX.json' (NO inline list per canon v2.6 · cambio arquitectónico vs DIESEL legacy)"
    }
    
    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Fase 3: {bundle['inputs_loaded']['activity_cards_count']} Activity Cards · all enriched={bundle['inputs_loaded']['all_activity_cards_enriched']}")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']}")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    print(f"     Validation behavioral real requiere lanzar + comparar contra ref op MGV (Hito 4 Test E2E).")
    
    return bundle


if __name__ == "__main__":
    args = parse_subagente_args(__file__)
    
    bundle = preparar_bundle_pm_3_1(
        run_id=args.run_id,
        runs_dir=args.runs_dir,
        master_prompts_dir=args.master_prompts_dir,
        repo_root=str(Path(args.runs_dir).parent),
        guide_id=args.guide_id
    )
    
    print(f"\n=== BUNDLE STRUCTURE (smoke shape · estático · NO se lanza Task tool) ===")
    summary = {
        "subagent_type": bundle["subagent_type"],
        "pm_id": bundle["pm_id"],
        "subagente_version": bundle["subagente_version"],
        "camino_arquitectonico": bundle["camino_arquitectonico"],
        "expected_output_file": bundle["expected_output_file"],
        "bundle_size_chars": bundle["bundle_size_chars"],
        "validation_post_hoc_count": len(bundle["validation_post_hoc"]),
        "shape_canonico_esperado": bundle["shape_canonico_esperado"],
        "dependencias_downstream": bundle["dependencias_downstream"],
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
