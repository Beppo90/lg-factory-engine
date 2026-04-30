"""
subagente_pm_3_2_build_out.py — Subagente CREATIVO PM-3.2 Playbook Build-Out (Step by Step).

Camino arquitectónico (2): Task tool con master prompt PM-3.2 v2.5 inyectado.
Per PLAN-FASE-3-ARQUITECTURA.md v1.4 §5.2 + §7 Hito 3 (PM-3.2 ×8 paralelo).

Productor de Playbook Build-Out por sesión (PM-3.2 master prompt v2.5 · 39 keys canónicos
MGV · plan minuto-a-minuto con SET-UP + WHILE + WRAP-UP + Teacher Talk + Answer Key + 
Differentiation + propagación obligatoria estrategias didácticas desde pm-3-1).

Granularidad: UNA sesión por ejecución. Para guía de N sesiones (8 single-guía multi-RAP ·
12 IMARPOR-CC Curso Complementario) ejecutar PM-3.2 N veces.

Inputs:
- Phase 1+2 cerrada (pm-0-context + pm-1-2 + pm-2-11 + 9 ACs + pm-2-0 + pm-4-1 + pm-4-2)
- pm-3-1.json (Playbook Outline · Phase 3 partial dependency · pm0_alignment_by_session +
  estrategias_resumen + ambientes_resumen + pm_3_2_propagation_contract)
- session_number (1..N · canon)

Output: pm-3-2-s{N}.json (39 keys MGV v2.5 canon)
- Header: pm_id · pm_name · pm_version · run_id · guide · programa · session · session_name
- Pedagogy: estrategia_didactica · justificacion_didactica · momento_sena (propagados PM-3.1)
- pm0_protocol (11 sub-keys · injection canon §pm0_protocol)
- session_header · timeline · materials_checklist · board_plan · habilidades_foco/soporte
- set_up · while · wrap_up (3 dicts blocks)
- answer_key_consolidado · differentiation · instructor_self_check
- activity_logistics · totals_check · data_flow_contract · rap_status
- duracion_min · cefr · worksheets · status

Wrapper Python prepara bundle vía preparar_bundle_phase3() + post-procesa con pm-3-1 outline
+ session_number context. NO ejecuta Task tool automáticamente · orquestador decide.

Uso:
    python3 subagente_pm_3_2_build_out.py <run_id> <runs_dir> <master_prompts_dir> <session_number> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch (1 sesión específica).
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase3
from input_loader import load_run_input


PM_ID = "PM-3.2"
SUBAGENTE_VERSION = "1.0"  # Hito 3 piloto · 2026-04-29


def preparar_bundle_pm_3_2(run_id, runs_dir, master_prompts_dir, repo_root, session_number, guide_id=None):
    """Prepara bundle Task tool canónico para PM-3.2 Build-Out de UNA sesión específica.

    Args:
        run_id: ej "IMARPOR-CC-2026-04-27"
        runs_dir, master_prompts_dir, repo_root: paths estándar
        session_number: int 1..N · qué sesión generar
        guide_id: opcional · single-guía absorpción

    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para Task tool launch · NO se ejecuta automáticamente.

    Raises:
        ValueError si pm-3-1.json no existe (Hito 2 no cerrado) o session_number fuera de rango
        ValueError si gate canon §6.4 no cumplido (pm-2-11.ready_for_phase_3 != True)
    """
    print(f"[PM-3.2 Build-Out] Preparando bundle Task tool Camino 2 LLM · sesión S{session_number}...")
    print(f"  run: {run_id} · guide: {guide_id} · session_number: {session_number}")

    # 1. Bundle base (Fase 1+2 inputs · gate §6.4 + 9 ACs enriched)
    bundle = preparar_bundle_phase3(
        pm_id=PM_ID,
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=repo_root,
        guide_id=guide_id
    )

    # 2. Load pm-3-1.json (Phase 3 partial dependency)
    try:
        pm31 = load_run_input(run_id, runs_dir, "pm-3-1.json", guide_id=guide_id)
    except FileNotFoundError as e:
        raise ValueError(
            f"PM-3.2 requiere pm-3-1.json (Playbook Outline) · ejecutar PM-3.1 primero (Hito 2). "
            f"Error: {e}"
        )

    # 3. Validate session_number range
    overview = pm31.get("overview_table", [])
    pm0_alignment = pm31.get("pm0_alignment_by_session", [])
    num_sessions = max(len(overview), len(pm0_alignment))
    if num_sessions == 0:
        raise ValueError(f"pm-3-1.json no tiene overview_table ni pm0_alignment_by_session populated")
    if session_number < 1 or session_number > num_sessions:
        raise ValueError(
            f"session_number={session_number} fuera de rango · pm-3-1 tiene {num_sessions} sesiones"
        )

    # 4. Extract session-specific data from pm-3-1
    session_idx = session_number - 1
    session_overview = overview[session_idx] if session_idx < len(overview) else {}
    session_pm0_alignment = pm0_alignment[session_idx] if session_idx < len(pm0_alignment) else {}

    # 5. Append PM-3.1 + session-specific context to bundle prompt
    extra_context = (
        "\n═══════════════════════════════════════════════════════════════════════════\n"
        f"SESIÓN OBJETIVO · S{session_number} de {num_sessions}\n"
        "═══════════════════════════════════════════════════════════════════════════\n"
        f"\n⚠ PM-3.2 genera UNA sesión por ejecución. Esta ejecución debe producir\n"
        f"   pm-3-2-s{session_number}.json con shape MGV v2.5 canon (39 keys).\n"
        f"\n--- Session Overview (de pm-3-1.overview_table[{session_idx}]) ---\n"
        f"{json.dumps(session_overview, indent=2, ensure_ascii=False)}\n"
        f"\n--- PM-0 Alignment (de pm-3-1.pm0_alignment_by_session[{session_idx}]) ---\n"
        f"{json.dumps(session_pm0_alignment, indent=2, ensure_ascii=False)}\n"
        f"\n═══════════════════════════════════════════════════════════════════════════\n"
        f"PLAYBOOK OUTLINE COMPLETO (pm-3-1.json · Phase 3 upstream dependency)\n"
        f"═══════════════════════════════════════════════════════════════════════════\n"
        f"\n--- pm-3-1 top-level shape (orientación general · NO copiar contenido literal) ---\n"
        f"{json.dumps({k: (v if not isinstance(v, (dict, list)) else f'<{type(v).__name__} len={len(v)}>') for k,v in pm31.items()}, indent=2, ensure_ascii=False)}\n"
        f"\n--- pm-3-1.estrategias_resumen (CRÍTICO · propagar a estrategia_didactica de S{session_number}) ---\n"
        f"{json.dumps(pm31.get('estrategias_resumen', {}), indent=2, ensure_ascii=False)[:2000]}\n"
        f"\n--- pm-3-1.ambientes_resumen ---\n"
        f"{json.dumps(pm31.get('ambientes_resumen', {}), indent=2, ensure_ascii=False)[:1500]}\n"
        f"\n--- pm-3-1.pm_3_2_propagation_contract (consume strict · contrato downstream) ---\n"
        f"{json.dumps(pm31.get('pm_3_2_propagation_contract', {}), indent=2, ensure_ascii=False)}\n"
    )
    bundle["prompt"] = bundle["prompt"] + extra_context

    # 6. Override expected_output_file (session-specific)
    output_path = f"runs/{run_id}/{guide_id+'/' if guide_id else ''}pm-3-2-s{session_number}.json"
    bundle["expected_output_file"] = output_path
    bundle["bundle_size_chars"] = len(bundle["prompt"])

    # 7. Anotaciones específicas
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["session_number"] = session_number
    bundle["num_sessions_total"] = num_sessions
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon v2.5 · 1 sesión por ejecución"
    bundle["productor_de"] = f"Playbook Build-Out S{session_number} · plan minuto-a-minuto + Teacher Talk + Answer Key"
    bundle["dependencias_upstream"] = [
        "PM-3.1 Outline (pm-3-1.json · session_overview + pm0_alignment + estrategias_resumen + ambientes_resumen)",
        "PM-2.11 Row (pm-2-11.json · gate §6.4)",
        "9 Activity Cards (Fase 2 enriched)",
        "PM-0 Context · PM-1.2 Scope · PM-2.0 Blueprint",
    ]
    bundle["dependencias_downstream"] = [
        "PM-3.5 Final Mission (consume pm-3-2-s6/s7/s8 specifically · transferencia ABP)",
        "PM-3.4 Workbook (consume pm-3-2-sX WRAP-UP secciones)",
        "PM-3.6 GFPI-F-135 (consume Playbook completo)",
        "PM-3.7 GFPI-F-134 Matrix (consume Playbook completo)",
    ]
    bundle["shape_canonico_esperado"] = {
        "top_level_keys": 39,
        "ground_truth_ref": "runs/MGV-2026-04-20/pm-3-2-s1.json (canon v2.5 más maduro)",
        "campos_criticos_v_2_5": [
            "estrategia_didactica + justificacion_didactica + momento_sena (propagados de pm-3-1.estrategias_resumen[i])",
            "pm0_protocol (11 sub-keys · CEFR + grammar groups + feedback + L1 + stress + success vocabulary)",
            "set_up + while + wrap_up (3 bloques pedagógicos detallados)",
            "timeline (lista 8+ items · franjas tiempo)",
            "answer_key_consolidado + differentiation + instructor_self_check",
            "data_flow_contract (validation downstream consumers)",
        ],
        "session_focus": f"S{session_number} de {num_sessions}",
        "session_overview_extracted": bool(session_overview),
        "pm0_alignment_extracted": bool(session_pm0_alignment),
    }

    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Fase 1+2: 9 ACs + pm-2-11 + pm-2-0 + pm-1-2 + pm-0-context + pm-4-1 + pm-4-2")
    print(f"  ✓ pm-3-1 Phase 3 upstream loaded · num_sessions={num_sessions}")
    print(f"  ✓ Session focus: S{session_number} (overview={'✓' if session_overview else '✗'} · pm0_alignment={'✓' if session_pm0_alignment else '✗'})")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']}")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")

    return bundle


if __name__ == "__main__":
    # Custom CLI: ... <run_id> <runs_dir> <master_prompts_dir> <session_number> [guide_id]
    if len(sys.argv) < 5:
        print("Uso: python subagente_pm_3_2_build_out.py <run_id> <runs_dir> <master_prompts_dir> <session_number> [guide_id]")
        sys.exit(1)

    run_id = sys.argv[1]
    runs_dir = sys.argv[2]
    master_prompts_dir = sys.argv[3]
    session_number = int(sys.argv[4])
    guide_id = sys.argv[5] if len(sys.argv) > 5 else None

    bundle = preparar_bundle_pm_3_2(
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=str(Path(runs_dir).parent),
        session_number=session_number,
        guide_id=guide_id
    )

    print(f"\n=== BUNDLE STRUCTURE (smoke shape · estático · NO se lanza Task tool) ===")
    summary = {
        "subagent_type": bundle["subagent_type"],
        "pm_id": bundle["pm_id"],
        "subagente_version": bundle["subagente_version"],
        "session_number": bundle["session_number"],
        "num_sessions_total": bundle["num_sessions_total"],
        "camino_arquitectonico": bundle["camino_arquitectonico"],
        "expected_output_file": bundle["expected_output_file"],
        "bundle_size_chars": bundle["bundle_size_chars"],
        "validation_post_hoc_count": len(bundle["validation_post_hoc"]),
        "shape_canonico_esperado": bundle["shape_canonico_esperado"],
        "dependencias_upstream_count": len(bundle["dependencias_upstream"]),
        "dependencias_downstream_count": len(bundle["dependencias_downstream"]),
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
