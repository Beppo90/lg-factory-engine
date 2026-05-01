"""
subagente_pm_0_0_matriz.py — Subagente CREATIVO PM-0.0 Matriz Pedagógica Alineadora.

Camino arquitectónico (2): Task tool con master prompt PM-0.0 v1.0 inyectado.
Per PLAN-FASE-1-ARQUITECTURA.md v1.0 §3.2 + DM v3.0 paradigm shift (2026-05-01).

PRIMER subagente del pipeline · Phase 0 · pre-PM-0.

Productor de la Matriz Pedagógica Alineada (PM-0.0 master prompt v1.0 · 7 REGLAS canónicas ·
N RAPs dinámico). Toma información curricular SOFÍA agregada (saberes_conceptos +
saberes_proceso + criterios_evaluacion · sin clasificar por RAP) y ALINEA explícitamente
por cada RAP del programa. Output canónico:
- pm-0-0-matriz-alineada.json (matriz alineada · 7 validation_checks · audit completo)

NO produce pm-0-context.json (eso es PM-0 v3.0 · downstream).

Wrapper Python prepara bundle vía preparar_bundle_phase0() · NO ejecuta Task tool
automáticamente. El orquestador (Claude principal) decide cuándo invocar usando este bundle.

Phase 0 derivado · primer paso del pipeline · NO depende de outputs anteriores.
Single dependency: form xlsx parsed o contenido pegado directo.

Ref operacional: NULL (PM-0.0 NEW v1.0 · master prompt es spec canónica). Cuando
construyamos primer pm-0-0-matriz-alineada.json IMARPOR-CC-V2 con Sergio aprobación,
ese mismo se vuelve ref op para futuros runs.

UBICACIÓN: temporalmente en `.claude/skills/fpi-sena-fase3/subagentes/` por reutilización
de infra (master_prompt_loader · task_tool_bundler). Migration path canónico: cuando
fpi-sena-fase1 tenga su propia infra `lib/`, mover este wrapper a `fpi-sena-fase1/subagentes/`.

Uso:
    python3 subagente_pm_0_0_matriz.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase0


PM_ID = "PM-0.0"
SUBAGENTE_VERSION = "1.0"  # NEW · paradigm shift Phase 1 · 2026-05-01


def preparar_bundle_pm_0_0(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    """Prepara bundle Task tool canónico para PM-0.0 Matriz Pedagógica Alineadora.

    PRIMER subagente del pipeline · Phase 0 · pre-PM-0.

    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para que orquestador lance Task tool · NO se ejecuta automáticamente.

    Raises:
        FileNotFoundError si master prompt PM-0.0 no existe
        ValueError si pm-0-0-input.json o pm-0-context-input.json malformado (cuando se provee)
    """
    print(f"[PM-0.0 matriz alineadora] Preparando bundle Task tool Camino 2 LLM v1.0...")
    print(f"  run: {run_id} · guide: {guide_id} · runs_dir: {runs_dir}")

    bundle = preparar_bundle_phase0(
        pm_id=PM_ID,
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=repo_root,
        guide_id=guide_id
    )

    # Anotaciones específicas PM-0.0 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon v1.0 NEW · paradigm shift Phase 1 · primer subagente del pipeline (Sergio Cortés decisión 2026-05-01)"
    bundle["productor_de"] = "Matriz Pedagógica Alineada (PM-0.0) · alinea curricular SOFÍA agregado por cada RAP · fundamento de toda la cadena downstream"
    bundle["paradigm_shift_v3_0"] = {
        "estado_pre": "PM-0 reconstruía matriz GFPI-F-134 retroactivamente en PM-2.11 (final Phase 2) · LLM tomaba decisiones sin alineación RAP",
        "estado_post": "PM-0.0 alinea explícitamente saberes/procesos/criterios por cada RAP ANTES de PM-0 · diseño UbD verdadero de adentro hacia afuera",
        "razon": "Sergio Cortés · 2026-05-01 · sistema declaraba diseño de adentro hacia afuera desde DM v2.0 pero NO existía mecanismo operacional · v3.0 corrige"
    }
    bundle["dependencias_upstream"] = [
        "form xlsx parsed (pm-0-0-input.json o pm-0-context-input.json legacy)",
        "O contenido pegado directo (orquestador inyecta · NO archivo pre-existente)"
    ]
    bundle["dependencias_downstream"] = [
        "PM-0 v3.0 (consume matriz alineada · NO duplica · simplifica decisiones)",
        "PM-1.1 (ruta macrotemática POR RAP · NO agregada)",
        "PM-1.2 (scope/curación POR RAP)",
        "PM-2.0 (session blueprint con awareness RAP)",
        "PM-2.x (cada AC atribuida a RAP target via activity_card.rap_target field)",
        "PM-2.11 (simplificado · matriz YA alineada · solo agrega horas/instrumentos/ambientes)",
        "PM-3.7 V04 (multi-RAP rows con contenido REAL · no solo título)"
    ]
    bundle["shape_canonico_esperado"] = {
        "schema_version": "v1.0",
        "ground_truth_ref": "NULL (NEW v1.0 · master prompt PM-0.0 spec canónica · primer pm-0-0-matriz-alineada.json IMARPOR-CC-V2 será ref op futuro)",
        "campos_criticos": [
            "competencia (texto literal SOFÍA · 1 string)",
            "raps_count (N dinámico · 1-10+)",
            "raps[] (array · cada uno con: rap_id · rap_codigo_sofia · rap_titulo · saberes_conceptos · saberes_proceso · criterios · rationale_alineacion 50-200 words)",
            "alignment_audit (cobertura 100% · huérfanos · overlaps documentados)",
            "alignment_strategy (criterio_principal · overlap_policy · huerfanos_policy · secuencia_pedagogica)",
            "validation_checks 7 PASS bloqueantes",
            "downstream_consumers documentado"
        ],
        "transformacion_canonica": "Información curricular SOFÍA agregada (saberes/procesos/criterios sin clasificar) → matriz pedagógica alineada explícitamente por cada RAP",
        "regla_verbo_cognitivo": "Alineación por verbo cognitivo del RAP (RECONOCER → vocabulario · COMPRENDER → frases · APLICAR → reglas · DESCRIBIR → funciones)",
        "regla_cobertura_100": "Cero tolerancia huérfanos · todo saber/criterio del input asignado a 1+ RAP",
        "regla_verbatim_raps": "rap_titulo literal del input · NO paráfrasis · NO edits · canon SOFÍA respetado"
    }
    bundle["pm_3_x_cascade_impact"] = {
        "estado": "PM-0.0 output se vuelve fundamento de TODOS los PMs downstream",
        "consumers_inmediatos": "PM-0 v3.0 (capa pedagógica encima) · PM-1.1 (ruta POR RAP) · PM-1.2 (scope POR RAP)",
        "consumers_phase_2": "PM-2.0 (sesiones con awareness RAP) · PM-2.x (rap_target per AC) · PM-2.11 (simplificado)",
        "consumers_phase_3": "PM-3.x consume context PM-0 (que hereda matriz)",
        "consumers_phase_4": "PM-3.7 V04 (multi-RAP rows con contenido REAL)"
    }
    bundle["smoke_shape_deuda"] = {
        "estado": "Smoke shape behavioral incompleto · ningún fixture tiene v3.0 ref op todavía",
        "razon": "PM-0.0 v1.0 NEW paradigm shift · primer ejecución será IMARPOR-CC-V2 con Sergio aprobación",
        "resolucion": "Behavioral validation post primer run IMARPOR-CC-V2 · ese pm-0-0-matriz-alineada.json se vuelve ref op para futuros runs (REF_OPERACIONALES_PHASE0 establecible)",
        "primera_ejecucion": "Esta sesión maratón · Hito 7 · IMARPOR-CC-2026-04-30-V2"
    }

    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Phase 0:")
    print(f"      pm00_input_loaded: {bundle['inputs_loaded']['pm00_input_loaded']}")
    print(f"      legacy_input_loaded: {bundle['inputs_loaded']['legacy_input_loaded']}")
    print(f"      input_source: {bundle['inputs_loaded']['input_source']}")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    print(f"     Recomendado: validation independent post-Agent · 7 checks bloqueantes pre-Gate 0.")

    return bundle


if __name__ == "__main__":
    args = parse_subagente_args(__file__)

    bundle = preparar_bundle_pm_0_0(
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
        "paradigm_shift_v3_0": bundle["paradigm_shift_v3_0"],
        "shape_canonico_esperado": bundle["shape_canonico_esperado"],
        "dependencias_upstream_count": len(bundle["dependencias_upstream"]),
        "dependencias_downstream_count": len(bundle["dependencias_downstream"]),
        "smoke_shape_deuda": bundle["smoke_shape_deuda"]
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
