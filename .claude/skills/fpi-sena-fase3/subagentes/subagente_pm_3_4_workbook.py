"""
subagente_pm_3_4_workbook.py — Subagente CREATIVO PM-3.4 Workbook Autonomous Work.

Camino arquitectónico (2): Task tool con master prompt PM-3.4 v4.0 inyectado.
Per PLAN-FASE-3-ARQUITECTURA.md v1.5 §7 Hito-Fase3-4 (PM-3.4 Phase 4 derivado · paralelo
PM-3.3 + PM-3.6 + PM-3.7).

Productor del Workbook autónomo del aprendiz (PM-3.4 v4.0 · 13 keys top-level canon ·
estructura tripartita REINFORCE / EXTEND / PREPARE per chapter).

Genera pm-3-4.json shape canon v4.0:
- Metadata 13 top-level keys: version (4.0) · pm_id · run_id · guide · generated_at · model ·
  status · header (9 sub-keys) · introduction · description · chapters[N] ·
  consolidated_answer_key · derivation_source
- Chapters[N]: chapter_number · session · session_name · duracion_autonoma_min ·
  habilidades_foco_sesion · reinforce · extend · prepare
- Cada sección REINFORCE/EXTEND/PREPARE: title · instructions_es · instructions_en ·
  duracion_min · bloom_level · activities[]

Wrapper Python prepara bundle vía preparar_bundle_phase4() · NO ejecuta Task tool
automáticamente. El orquestador (Claude principal) decide cuándo invocar usando este
bundle.

Phase 4 derivado · depende de Gate 3 (Sergio aprueba Playbook completo: pm-3-1 +
12× pm-3-2-sX + pm-3-5 marcados enriched: true).

Uso:
    python3 subagente_pm_3_4_workbook.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase4


PM_ID = "PM-3.4"
SUBAGENTE_VERSION = "1.0"  # Hito-Fase3-4 · 2026-04-30


def preparar_bundle_pm_3_4(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None, strict_gate3=False):
    """Prepara bundle Task tool canónico para PM-3.4 Workbook Autonomous Work.

    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para que orquestador lance Task tool · NO se ejecuta automáticamente.

    Raises:
        ValueError si gate canon §6.4 no cumplido (pm-2-11.ready_for_phase_3 != True)
        ValueError si algún Activity Card .enriched != True (Gate 2 Fase 2 incompleto)
        ValueError si strict_gate3=True y algún Phase 3 output no tiene .enriched: true
        FileNotFoundError si pm-3-1, pm-3-2-sX, pm-3-5 no existen (Phase 3 no cerrada)
    """
    print(f"[PM-3.4 Workbook] Preparando bundle Task tool Camino 2 LLM v4.0...")
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

    # Anotaciones específicas de PM-3.4 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon v4.0 · REINFORCE/EXTEND/PREPARE anatomía tripartita (master prompt bumped 2026-04-30)"
    bundle["productor_de"] = "Workbook Autónomo del Aprendiz (gym de la guía · prácticas entre sesiones presenciales)"
    bundle["dependencias_upstream"] = [
        "PM-3.1 Outline (pm-3-1.json · mapa trabajo autónomo + sessions_logistics)",
        "PM-3.2 Build-Outs ×12 (pm-3-2-sX.json · WRAP-UP sections con asignaciones detalladas)",
        "PM-3.5 Final Mission (pm-3-5.json · referencia transferencia)",
        "PM-2.3..2.10 Activity Cards (worksheets content que workbook refuerza · arquetipos elegidos)",
        "PM-1.2 Scope (vocabulary 30+ términos · grammar targets · nivel CEFR · universo narrativo)",
        "PM-2.11 Row (gfpi_f134_row · cross-reference horas autónomas)",
    ]
    bundle["dependencias_downstream"] = [
        "Aprendiz IMARPOR-CC (documento físico/digital · workbook autónomo)",
        "Coordinación académica SENA (revisión Gate 4)",
        "Instructor (Answer Key documento separado · futuro · derivación posterior)",
    ]
    bundle["shape_canonico_esperado"] = {
        "top_level_keys": 13,
        "ground_truth_ref": "runs/DIESEL-2026-04-19/pm-3-4.json (canon v4.0 más maduro)",
        "campos_criticos_v_4_0": [
            "version: '4.0' (bumped from v2.0 · master prompt v4.0)",
            "chapters[N]: 8 default · 12 IMARPOR-CC (single-guía 12 sesiones)",
            "Cada chapter con REINFORCE + EXTEND + PREPARE secciones tripartitas (REGLA 11)",
            "bloom_level por sección obligatorio (REGLA 16)",
            "derivation_source con paths upstream completos (REGLA 14)",
            "consolidated_answer_key separate (REGLA 15)",
        ],
        "anatomía_tripartita": {
            "REINFORCE": "Bloom L1-L2 · refuerzo Apropiación reciente · 15-25 min · activities (labeling/matching/reflection/drill)",
            "EXTEND": "Bloom L3-L5 · HOTS aplicación/análisis/creación · 15-25 min · activities (drawing/mapping/categorization/writing/justification)",
            "PREPARE": "Bloom L1-L2 · pre-activación flipped sesión siguiente · 10-20 min · activities (pre_reading/pre_listening/vocabulary_preview)",
        },
        "principio_tres_versiones": "Las 3 versiones (Apropiación · Evaluación S6 · Workbook) abordan mismo contenido desde ángulos distintos · NO copy literal · cada version diferentes tasks",
    }
    bundle["volumen_canon_v_4_0"] = {
        "default_chapters": 8,
        "IMARPOR_CC_chapters": 12,
        "razon_imarpor_cc": "single-guía Curso Complementario 12 sesiones · 1 capítulo por sesión presencial · respeta estructura tripartita",
        "tiempo_total_autonomo": "≈6 horas (DIESEL canon) · escala con N sessions",
    }
    bundle["smoke_shape_deuda"] = {
        "estado": "Behavioral validation requiere Phase 3 outputs reales (Gate 3 closed) · IMARPOR-CC ya tiene los 14 inputs requeridos",
        "razon": "PM-3.4 (igual PM-3.6/PM-3.7) consume Playbook completo + Activity Cards · Gate 3 simulado = strict_gate3=False acepta operational reality post-Hito 3",
        "primera_ejecucion": "Cuando se genere primer pm-3-4.json IMARPOR-CC + Sergio aprueba · ese se vuelve ref op para futuros runs (REF_OPERACIONALES_PHASE3 actualizable)",
    }

    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Fase 3: {bundle['inputs_loaded']['activity_cards_count']} Activity Cards · all enriched={bundle['inputs_loaded']['all_activity_cards_enriched']}")
    print(f"  ✓ Inputs Fase 4 (Playbook completo):")
    print(f"      pm31_loaded: {bundle['inputs_loaded']['pm31_loaded']}")
    print(f"      pm32_sessions_count: {bundle['inputs_loaded']['pm32_sessions_count']}")
    print(f"      pm35_loaded: {bundle['inputs_loaded']['pm35_loaded']}")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']} (DIESEL pm-3-4.json v4.0)")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")

    return bundle


if __name__ == "__main__":
    args = parse_subagente_args(__file__)
    strict_gate3 = "--strict-gate3" in sys.argv

    bundle = preparar_bundle_pm_3_4(
        run_id=args.run_id,
        runs_dir=args.runs_dir,
        master_prompts_dir=args.master_prompts_dir,
        repo_root=str(Path(args.runs_dir).parent),
        guide_id=args.guide_id,
        strict_gate3=strict_gate3
    )

    print(f"\n=== BUNDLE STRUCTURE (smoke shape · estático) ===")
    summary = {
        "subagent_type": bundle["subagent_type"],
        "pm_id": bundle["pm_id"],
        "subagente_version": bundle["subagente_version"],
        "camino_arquitectonico": bundle["camino_arquitectonico"],
        "expected_output_file": bundle["expected_output_file"],
        "bundle_size_chars": bundle["bundle_size_chars"],
        "shape_canonico_esperado": bundle["shape_canonico_esperado"],
        "volumen_canon_v_4_0": bundle["volumen_canon_v_4_0"],
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
