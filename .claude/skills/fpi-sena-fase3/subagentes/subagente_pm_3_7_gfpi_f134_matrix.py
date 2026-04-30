"""
subagente_pm_3_7_gfpi_f134_matrix.py — Subagente CREATIVO PM-3.7 GFPI-F-134 Matrix Aggregator + xlsx Renderer.

v2.0 (2026-04-30) · CANON V04 oficial SENA · multi-RAP shape.
v1.0 (2026-04-29) · Vf legacy · single-RAP single-row.

Camino arquitectónico (2): Task tool con master prompt PM-3.7 v2.0 inyectado.
Per PLAN-FASE-3-ARQUITECTURA.md v1.4 §5.2 + §7 Hito-Fase3-4 (PM-3.7 NEW Phase 4 derivado · 4to paralelo
junto a PM-3.3 + PM-3.4 + PM-3.6).

Productor de la Matriz Pedagógica GFPI-F-134 oficial SENA (PM-3.7 master prompt v2.0 · 14 cols xlsx V04
canon · vista agregada cross-PM · multi-RAP rows[]). Dos artefactos:
- pm-3-7.json (datos organizados 14 cols + metadata · 26+ keys)
- pm-3-7-gfpi-f134-matrix.xlsx (plantilla canónica `master-prompts/canon/GFPI-F-134_Vf.xlsx` poblada
  hoja 2 · openpyxl template-based · preserve merged cells + styles)

NOTA: este wrapper produce SOLO el JSON via Camino 2 LLM. La rendering xlsx (openpyxl) es step
mecánico post-LLM ejecutado por `lib/xlsx_renderer.py` (futuro · Hito-Fase3-4 task #5). Separation
of concerns canon: LLM = creative aggregation + transformación pedagógica · openpyxl = mechanical
template population.

Genera pm-3-7.json shape canon v2.0 (per PM-3.7 master prompt EXTENSIÓN v2.0 REGLAS 8-15):
- Metadata block (13 keys): pm_id · pm_name · pm_version · run_id · guide_id · generated_date ·
  instructor · phase · subfase_sena · genera_evidencia_formal_gfpi_f134 (False) · tipo_artefacto_sena
  ('vista_agregada_oficial') · xlsx_render_target · xlsx_template_source
- Data 14 cols xlsx Vf hoja 2:
  col_1_fase_proyecto · col_2_actividad_proyecto (← PM-0 derived)
  col_3_competencia · col_4_resultado_aprendizaje (← PM-2.11 exact match)
  col_5_actividades_aprendizaje_a_desarrollar (← 9 ACs + 8× PM-3.2 síntesis S2-S5)
  col_6_horas_trabajo_directo · col_7_horas_trabajo_independiente (← PM-2.11.col_7_horas)
  col_8_estrategias_didacticas_activas (← PM-3.1.estrategias_resumen + 9 ACs · síntesis NO copy-paste)
  col_9_ambiente · col_10_materiales_formacion · col_11_instructores_responsables (← PM-2.11.col_10 + PM-3.1.ambientes_resumen)
  col_12_criterios_evaluacion (← PM-2.11.col_5 + col_11)
  col_13_descripcion_evidencia_aprendizaje (← PM-2.11.col_8 + PM-4.1 + PM-4.2)
  col_14_observaciones (← PM-3.2-sX context o PM-3.1.siguiente_paso)
- Saberes (NO en xlsx hoja 2 directly · contexto): saberes_conceptos_y_principios · saberes_procesos
- Validation block: validation_checks (12 checks) · cross_references · enriched: false ·
  _enriched_false_rationale · derivations_log

Wrapper Python prepara bundle vía preparar_bundle_phase4() · NO ejecuta Task tool automáticamente.
El orquestador (Claude principal) decide cuándo invocar usando este bundle.

Phase 4 derivado · depende de Gate 3 (Sergio aprueba Playbook completo: pm-3-1 + 8× pm-3-2-sX +
pm-3-5 marcados enriched: true) PLUS pm-0-context (siempre disponible Phase 1 cerrado). Phase 1+2
inputs siempre disponibles · Phase 3 outputs aparecen post-Hito 3.

Ref operacional: NULL (PM-3.7 nuevo · master prompt v1.0 mapping table es spec canónica · NO MGV
reference todavía). Cuando construyamos primer pm-3-7.json IMARPOR-CC con Sergio aprobación, ese
mismo se vuelve ref op para futuros runs.

Uso:
    python3 subagente_pm_3_7_gfpi_f134_matrix.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase4


PM_ID = "PM-3.7"
SUBAGENTE_VERSION = "2.0"  # Canon V04 oficial SENA · 2026-04-30 · multi-RAP shape


def preparar_bundle_pm_3_7(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None, strict_gate3=False):
    """Prepara bundle Task tool canónico para PM-3.7 GFPI-F-134 Matrix Aggregator.

    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para que orquestador lance Task tool · NO se ejecuta automáticamente.

    Raises:
        ValueError si gate canon §6.4 no cumplido (pm-2-11.ready_for_phase_3 != True)
        ValueError si algún Activity Card .enriched != True (Gate 2 Fase 2 incompleto)
        ValueError si strict_gate3=True y algún Phase 3 output no tiene .enriched: true
        FileNotFoundError si pm-3-1, pm-3-2-sX, pm-3-5 no existen (Phase 3 no cerrada)
    """
    print(f"[PM-3.7 GFPI-F-134 Matrix] Preparando bundle Task tool Camino 2 LLM...")
    print(f"  run: {run_id} · guide: {guide_id} · runs_dir: {runs_dir}")
    print(f"  strict_gate3: {strict_gate3} (False permite smoke shape contra fixtures legacy)")

    bundle = preparar_bundle_phase4(
        pm_id=PM_ID,
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=repo_root,
        guide_id=guide_id,
        strict_gate3=strict_gate3
    )

    # Anotaciones específicas de PM-3.7 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon v2.0 V04 oficial SENA · multi-RAP shape (master prompt v2.0 · 2026-04-30)"
    bundle["productor_de"] = "Matriz Pedagógica GFPI-F-134 V04 oficial SENA (vista agregada · 14 cols · 1 hoja PLANEACIÓN POR RAPS · multi-RAP rows R15+)"
    bundle["dependencias_upstream"] = [
        "PM-0 Context (pm-0-context.json · Fase Proyecto + Actividad Proyecto + Saberes derivables · datos institucionales)",
        "PM-2.3..2.10 9 Activity Cards (estrategias didácticas embedded en content + activity_card)",
        "PM-2.11 Row Assembler (pm-2-11.json · gfpi_f134_row_complete · cols 1, 2, 5, 7, 8, 9, 10, 11)",
        "PM-3.1 Playbook Outline (pm-3-1.json · estrategias_resumen YA agregado · ambientes_resumen YA agregado)",
        "PM-3.2 Build-Out ×8 (pm-3-2-s1..s8.json · sessions detail contextual)",
        "PM-3.5 Final Mission (pm-3-5.json · transferencia ABP)",
        "PM-4.1 Instrumentos (pm-4-1.json · 6 evidencias formales)",
        "PM-4.2 Cuestionario S6 (pm-4-2.json · consolidado 25 pts)",
    ]
    bundle["dependencias_downstream"] = [
        "lib/xlsx_renderer.py · openpyxl template-based · consume pm-3-7.json + master-prompts/canon/GFPI-F-134_Vf.xlsx · produce runs/<RUN-ID>/pm-3-7-gfpi-f134-matrix.xlsx",
        "Instructor SENA (entrega oficial curricular)",
        "Coordinación académica (revisión Gate 4)",
    ]
    bundle["shape_canonico_esperado"] = {
        "top_level_keys_min": 26,
        "ground_truth_ref": "NULL (PM nuevo · master prompt v1.0 mapping table es spec canónica · NO MGV ref todavía)",
        "campos_criticos": [
            "14 col_X data fields populated (cols 3, 4, 6, 7, 12, 13 obligatorias · NO nulls)",
            "col_5_actividades sintetizada de 9 ACs + 8× PM-3.2 (REGLA 1 Apropiación focus S2-S5)",
            "col_8_estrategias síntesis pedagógica · NO list de 9 ACs (REGLA 2 · max 8 items agregados)",
            "saberes_conceptos + saberes_procesos derivados de PM-0 + PM-1.2 + universo_narrativo",
            "validation_checks 12 PASS bloqueantes",
            "cross_references populated (alimenta_a + consume_de + no_consume_de)",
            "derivations_log transparente (cuando upstream null · documentar fuente derivada)",
        ],
        "transformacion_canonica": "Síntesis cross-PM (PM-0 + 9 ACs + PM-2.11 + PM-3.1 + PM-3.2 + PM-4.x) → vista agregada oficial SENA",
        "regla_apropiacion_focus": "S2-S5 dominan · S1/S6/S7-S8 contextuales (REGLA 1 master prompt)",
        "regla_sintesis_no_redundante": "ESTRATEGIAS DIDÁCTICAS son agregación pedagógica · NO inventario 9 ACs (REGLA 2)",
    }
    bundle["xlsx_render_pendiente"] = {
        "estado": "JSON output es entregable de este wrapper · xlsx render es step posterior mecánico",
        "tool": "lib/xlsx_renderer.py (openpyxl · template-based)",
        "template_source": "master-prompts/canon/GFPI-F-134_V04.xlsx (canon V04 oficial · 2026-04-30)",
        "output_target": f"runs/{run_id}/{(guide_id+'/') if guide_id else ''}pm-3-7-gfpi-f134-matrix.xlsx",
        "preserve": "merged cells (48) + styles + headers row 13-14 + SUM formulas R22",
        "populate": "metadata rows 6-11 (E6-E11) + data rows R15/R18/R20/R21 (one per RAP)",
        "renderer_function": "lib/xlsx_renderer.py::render_gfpi_f134_v04_matrix(pm37_data, template_path, output_path)",
    }
    bundle["smoke_shape_deuda"] = {
        "estado": "Smoke shape behavioral incompleto · ningún fixture tiene Phase 4 inputs completos",
        "razon": "PM-3.7 (igual que PM-3.6/3.4/3.3) requiere Phase 3 outputs (pm-3-1 + 8× pm-3-2 + pm-3-5) que no existen hasta cierre Hito 3",
        "resolucion": "Behavioral validation post-Hito 3 cuando IMARPOR-CC tenga Playbook completo + Sergio marca enriched: true (Gate 3) · entonces strict_gate3=True valida fixture canon-conforme",
        "documentado_en": "PLAN-FASE-3-ARQUITECTURA.md §6.1 Phase 4 + §7 Hito-Fase3-4 task list",
        "primera_ejecucion": "Cuando se genere primer pm-3-7.json IMARPOR-CC + Sergio aprueba · ese mismo se vuelve ref op para futuros runs (REF_OPERACIONALES_PHASE3 actualizable)",
    }

    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Fase 3: {bundle['inputs_loaded']['activity_cards_count']} Activity Cards · all enriched={bundle['inputs_loaded']['all_activity_cards_enriched']}")
    print(f"  ✓ Inputs Fase 4 (Playbook completo):")
    print(f"      pm31_loaded: {bundle['inputs_loaded']['pm31_loaded']}")
    print(f"      pm32_sessions_count: {bundle['inputs_loaded']['pm32_sessions_count']}")
    print(f"      pm35_loaded: {bundle['inputs_loaded']['pm35_loaded']}")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']} (NULL esperado · PM nuevo v1.0)")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"  ✓ xlsx render pendiente: {bundle['xlsx_render_pendiente']['output_target']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    print(f"     Validation behavioral real requiere Phase 3 outputs reales (post-Hito 3 IMARPOR-CC).")

    return bundle




def _detect_rap_count(pm12_data):
    """Detect RAP count from pm-1-2.rap_origen field per REGLA 10.

    Patterns:
    - 'RAP-CC-INTEGRADO (absorbe RAP-01 a RAP-04 SOFIA)' -> 4
    - 'RAP-XX absorbe RAP-A a RAP-D' -> 4
    - 'RAP-01' (single) -> 1
    """
    import re
    rap_origen = pm12_data.get('rap_origen', '') or ''
    m = re.search(r'RAP-?0?(\d+)\s+a\s+RAP-?0?(\d+)', rap_origen)
    if m:
        start = int(m.group(1))
        end = int(m.group(2))
        return end - start + 1
    return 1

if __name__ == "__main__":
    args = parse_subagente_args(__file__)

    # Smoke shape default: strict_gate3=False · permite fixtures legacy
    # Production: strict_gate3=True · requiere Sergio aprobación Gate 3 (enriched: true en Phase 3 outputs)
    strict_gate3 = "--strict-gate3" in sys.argv

    bundle = preparar_bundle_pm_3_7(
        run_id=args.run_id,
        runs_dir=args.runs_dir,
        master_prompts_dir=args.master_prompts_dir,
        repo_root=str(Path(args.runs_dir).parent),
        guide_id=args.guide_id,
        strict_gate3=strict_gate3
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
        "dependencias_upstream_count": len(bundle["dependencias_upstream"]),
        "xlsx_render_pendiente": bundle["xlsx_render_pendiente"],
        "smoke_shape_deuda": bundle["smoke_shape_deuda"],
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
