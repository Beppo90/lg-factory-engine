"""
subagente_pm_3_6_gfpi_f135.py — Subagente CREATIVO PM-3.6 GFPI-F-135 Learning Guide Integrator.

Camino arquitectónico (2): Task tool con master prompt PM-3.6 v3.5 inyectado.

⚠️ CANON v3.5 ACTUALIZADO (2026-05-03 · post-validación preview v6 prólogo cinematográfico):
- Hereda descripcion_aprendiz + recursos_aprendiz[] desde Activity Cards v3.2 (NO descripcion legacy)
- Bilingüismo Opción D escalada CEFR-aware (3.1+3.2 ESP · 3.3+3.4 EN protagonista + ES cursiva 9pt #707070 scaffold)
- 3 secciones materiales separadas: Recursos preparados (cuerpo) + Materiales formación (footer cursivo) + Material apoyo (footer cursivo)
- Footer info actividad cursiva 9pt color gris discreta (Ambiente · Estrategias · Técnica · Materiales · Evidencias · Duración)
- Sec 2 PRESENTACIÓN estilo PRÓLOGO cinematográfico 4 párrafos bilingüe
- Logo SENA real centrado en encabezado (PNG real · NO placeholder)
- 7 reglas NEW PM-3.6 v3.5 (60-66) + 7 validation checks bloqueantes

PIPELINE ETL CANON (cuando wrappers PM-2.x todavía emiten cards v3.0/v3.1):
.claude/skills/fpi-sena-fase3/scripts/canon/etl-cards-v32-aprendiz/
ejecutar este pipeline ANTES del subagente PM-3.6 para migrar cards a v3.2.

Camino arquitectónico (2): Task tool con master prompt PM-3.6 v2.6.5 inyectado.
Per PLAN-FASE-3-ARQUITECTURA.md v1.2 §5.3 corregido (REGLA 21 cascada · NO Camino 1
mecánico · pm-3-6-new-gen.js prohibido como port · contiene contenido pedagógico
hardcoded que viola canon "fuente única de verdad" del master prompt).

Productor de la Guía del Aprendiz GFPI-F-135 (PM-3.6 master prompt v3.5 · 26 keys
canónicos · transformación INSTRUCTOR → APRENDIZ en 2ª persona) que consume Playbook
completo (PM-3.1 + 8× PM-3.2 + PM-3.5) y la fila GFPI-F-134 ensamblada (PM-2.11).

Genera pm-3-6.json shape canon v3.5 (APRENDIZ-FACING SHIFT post-validación 2026-05-03):
- header (pm_id, pm_name, pm_version, run_id, generated_date, instructor, phase, subfase_sena)
- tono_redaccion · fuente_unica_de_verdad
- seccion_1_identificacion (programa, guía, nivel, intensidad)
- seccion_2_presentacion (qué aprenderás, para qué)
- seccion_3_actividades_aprendizaje (subseccion_3_1 a subseccion_3_4 · derivado de Playbook)
- seccion_4_planteamiento_evidencias (derivado de fila F-134 col 8 + 9)
- seccion_5_glosario (20 términos clave · vocabulario PM-1.2)
- seccion_6_referentes_bibliograficos
- seccion_7_control_documento · seccion_8_control_cambios
- apendices_embebidos (texto lectura, guion listening · v2.6 inline)
- validation_checks

Wrapper Python prepara bundle vía preparar_bundle_phase4() · NO ejecuta Task tool
automáticamente. El orquestador (Claude principal) decide cuándo invocar usando este bundle.

Phase 4 derivado · depende de Gate 3 (Sergio aprueba Playbook completo: pm-3-1 + 8× pm-3-2-sX
+ pm-3-5 marcados enriched: true). En smoke shape contra fixture legacy MGV-2026-04-20,
strict_gate3=False permite cargar inputs sin marcadores enriched (predecesor del skill Fase 3).

Uso:
    python3 subagente_pm_3_6_gfpi_f135.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase4


PM_ID = "PM-3.6"
SUBAGENTE_VERSION = "1.0"  # Hito 2 Task 2 · 2026-04-29


def preparar_bundle_pm_3_6(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None, strict_gate3=False):
    """Prepara bundle Task tool canónico para PM-3.6 GFPI-F-135 Learning Guide Integrator.

    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para que orquestador lance Task tool · NO se ejecuta automáticamente.

    Raises:
        ValueError si gate canon §6.4 no cumplido (pm-2-11.ready_for_phase_3 != True)
        ValueError si algún Activity Card .enriched != True (Gate 2 Fase 2 incompleto)
        ValueError si strict_gate3=True y algún Phase 3 output no tiene .enriched: true
        FileNotFoundError si pm-3-1, pm-3-2-sX, pm-3-5 no existen (Phase 3 no cerrada)
    """
    print(f"[PM-3.6 GFPI-F-135] Preparando bundle Task tool Camino 2 LLM...")
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

    # Anotaciones específicas de PM-3.6 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon corregido v1.2 (REGLA 21 cascada PM-3.1)"
    bundle["productor_de"] = "Guía del Aprendiz GFPI-F-135 (transformación INSTRUCTOR → APRENDIZ en 2ª persona)"
    bundle["dependencias_upstream"] = [
        "PM-3.1 Playbook Outline (pm-3-1.json · estructura general)",
        "PM-3.2 Build-Out ×8 (pm-3-2-s1..s8.json · Playbook completo · fuente única de verdad)",
        "PM-3.5 Final Mission (pm-3-5.json · transferencia ABP)",
        "PM-2.11 Row Assembler (pm-2-11.json · fila GFPI-F-134 col 8 evidencias)",
    ]
    bundle["shape_canonico_esperado"] = {
        "top_level_keys": 26,
        "ground_truth_ref": "runs/MGV-2026-04-20/pm-3-6.json (canon v2.6.5)",
        "campos_criticos": [
            "seccion_3_actividades_aprendizaje (5 subsecciones · 3.1 reflexión / 3.2 contextualización / 3.3 apropiación / 3.3b evaluación / 3.4 transferencia)",
            "seccion_4_planteamiento_evidencias (filas_evidencia derivadas de F-134 col 8)",
            "apendices_embebidos (texto lectura inline + guion listening inline · v2.6)",
            "tono_redaccion: '2ª persona · directo al aprendiz' (REGLA 1 master prompt)",
        ],
        "transformacion_canonica": "INSTRUCTOR (Playbook tono pedagógico) → APRENDIZ (Guía tono operativo · 'Analyze the text...' no 'Haz que analicen...')",
        "regla_etiquetado_dimension": "Cada actividad lleva etiqueta [COGNITIVA] [PROCEDIMENTAL] [ACTITUDINAL] (REGLA 7 master prompt v2.6.5)",
    }
    bundle["smoke_shape_deuda"] = {
        "estado": "Smoke shape behavioral incompleto · ningún fixture tiene Phase 4 inputs enriched: true",
        "razon": "MGV-2026-04-20 es pre-canon (no tiene marcadores enriched) · IMARPOR-CC-2026-04-27 no tiene aún Phase 3 outputs (PM-3.2 ×8 + PM-3.5 wrappers pendientes Hito 3)",
        "resolucion": "Behavioral validation real ocurre post-Hito 3 cuando IMARPOR-CC tenga Playbook completo + Sergio marca enriched: true (Gate 3) · entonces strict_gate3=True valida fixture canon-conforme",
        "documentado_en": "PLAN-FASE-3-ARQUITECTURA.md §6.1 (Phase 4 derivados depend on Gate 3)",
    }

    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Fase 3: {bundle['inputs_loaded']['activity_cards_count']} Activity Cards · all enriched={bundle['inputs_loaded']['all_activity_cards_enriched']}")
    print(f"  ✓ Inputs Fase 4 (Playbook completo):")
    print(f"      pm31_loaded: {bundle['inputs_loaded']['pm31_loaded']}")
    print(f"      pm32_sessions_count: {bundle['inputs_loaded']['pm32_sessions_count']}")
    print(f"      pm35_loaded: {bundle['inputs_loaded']['pm35_loaded']}")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']}")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    print(f"     Validation behavioral real requiere Phase 3 outputs reales (post-Hito 3 IMARPOR-CC).")

    return bundle


if __name__ == "__main__":
    args = parse_subagente_args(__file__)

    # Smoke shape default: strict_gate3=False · permite fixtures legacy
    # Production: strict_gate3=True · requiere Sergio aprobación Gate 3 (enriched: true en Phase 3 outputs)
    strict_gate3 = "--strict-gate3" in sys.argv

    bundle = preparar_bundle_pm_3_6(
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
        "dependencias_upstream": bundle["dependencias_upstream"],
        "smoke_shape_deuda": bundle["smoke_shape_deuda"],
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
