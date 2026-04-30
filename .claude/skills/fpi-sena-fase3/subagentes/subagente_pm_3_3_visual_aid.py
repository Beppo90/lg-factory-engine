"""
subagente_pm_3_3_visual_aid.py — Subagente CREATIVO PM-3.3 Visual Aid Generator (student-facing tool-agnostic).

v3.0 (2026-04-30) · canon Sergio decisión arquitectónica.
v2.4 (legacy · pre-2026-04) · Canva Deck instructor-facing PPTX (deprecated · ver master prompt v3.0).

Camino arquitectónico (2): Task tool con master prompt PM-3.3 v3.0 inyectado.
Per master prompt PM-3.3 v3.0 EXTENSIÓN REGLAS 11-17.

Productor de un único archivo Markdown student-facing tool-agnostic:
- pm-3-3.md (1 archivo · 1 sección por actividad · 7 secciones canónicas por actividad)

NO produce pptx · NO produce spec.json · NO requiere renderer Python/JS.
La herramienta de consumo (Claude Design · PPTX · Canva · NotebookLM · cualquier otra) ES el renderer.

Genera pm-3-3.md shape canon v3.0 (per master prompt PM-3.3 v3.0 REGLA 15):
- Frontmatter (run_id · guide_id · pm_version · paleta_canon · tools_compatibles · universo_narrativo)
- Cómo usar este documento (instrucciones de consumo)
- Tabla de contenido (anchor links · 1 per actividad)
- Actividades organizadas por sesión (1 sección per S1..SN)
- Cada actividad tiene 7 secciones canónicas (REGLA 12):
  1. IDENTIFICACIÓN (sesión · momento · tipo SENA · scaffold · evidencia)
  2. CONCEPTO VISUAL (hero idea · tono · anclaje narrativo)
  3. BLOQUES DE CONTENIDO (headline · subhead · body · CTA)
  4. LAYOUT DEL SCAFFOLD (wireframe textual · regiones · interacción)
  5. EVIDENCIA & RÚBRICA VISIBLE (producto · criterio · rúbrica)
  6. RESTRICCIONES DE DISEÑO (paleta SENA + universo guía dinámico)
  7. PROMPT DE GENERACIÓN (frase narrativa para tool externo)

Wrapper Python prepara bundle vía preparar_bundle_phase4() · NO ejecuta Task tool automáticamente.
El orquestador (Claude principal) decide cuándo invocar usando este bundle.

Phase 4 derivado · paralelo a PM-3.4 + PM-3.6 + PM-3.7 · post Gate 3 (Sergio aprueba Playbook completo:
pm-3-1 + 8× pm-3-2-sX + pm-3-5 marcados enriched: true) PLUS PM-3.6 (cross-ref activities +
evidencias) y pm-0-context (siempre disponible Phase 1 cerrado).

Ref operacional: NULL (PM-3.3 v3.0 nuevo · master prompt v3.0 spec canónica · NO MGV/DIESEL ref
todavía · v2.4 deck NO es ref operacional v3.0). Cuando construyamos primer pm-3-3.md IMARPOR-CC
con Sergio aprobación, ese mismo se vuelve ref op para futuros runs.

Uso:
    python3 subagente_pm_3_3_visual_aid.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]

Output: bundle dict con prompt completo listo para Task tool launch.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from cli_parser import parse_subagente_args
from task_tool_bundler import preparar_bundle_phase4


PM_ID = "PM-3.3"
SUBAGENTE_VERSION = "3.0"  # Master prompt v2.4 → v3.0 paradigm shift · 2026-04-30


def preparar_bundle_pm_3_3(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None, strict_gate3=False):
    """Prepara bundle Task tool canónico para PM-3.3 Visual Aid Generator (v3.0 student-facing .md).

    Returns:
        dict bundle completo (subagent_type + prompt + expected_output + validation_post_hoc)
        listo para que orquestador lance Task tool · NO se ejecuta automáticamente.

    Raises:
        ValueError si gate canon §6.4 no cumplido (pm-2-11.ready_for_phase_3 != True)
        ValueError si algún Activity Card .enriched != True (Gate 2 Fase 2 incompleto)
        ValueError si strict_gate3=True y algún Phase 3 output no tiene .enriched: true
        FileNotFoundError si pm-3-1, pm-3-2-sX, pm-3-5, pm-3-6 no existen
    """
    print(f"[PM-3.3 visual aid] Preparando bundle Task tool Camino 2 LLM v3.0...")
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

    # Anotaciones específicas de PM-3.3 v3.0 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SUBAGENTE_VERSION
    bundle["camino_arquitectonico"] = "Camino 2 LLM puro · canon v3.0 student-facing tool-agnostic (master prompt v2.4 → v3.0 · 2026-04-30 · Sergio decision)"
    bundle["productor_de"] = "Visual Aid Markdown student-facing tool-agnostic (pm-3-3.md · 1 archivo · 1 sección per actividad · 7 secciones canónicas REGLA 12)"
    bundle["paradigm_shift_v3_0"] = {
        "v2_4_legacy": "pm-3-3-spec.json + .pptx (instructor-facing · pptxgenjs renderer JS)",
        "v3_0_canon": "pm-3-3.md (student-facing · tool-agnostic · NO renderer Python/JS · external tool ES renderer)",
        "destinatario": "Aprendiz (NOT instructor)",
        "tools_compatibles": ["Claude Design", "PPTX", "Canva", "NotebookLM", "cualquier herramienta visual"],
        "razon": "Sergio Cortés · 2026-04-30 · output debe ser portable · tool-agnostic · 1 archivo .md per guía",
    }
    bundle["dependencias_upstream"] = [
        "PM-0 Context (pm-0-context.json · Programa metadata + sector económico)",
        "PM-1.2 (pm-1-2.json · universo_narrativo: personajes + lugares + vocabulario · CRÍTICO REGLA 14)",
        "PM-2.3..2.10 9 Activity Cards (contenido visual de cada actividad)",
        "PM-3.1 Playbook Outline (pm-3-1.json · estrategias_resumen + ambientes_resumen)",
        "PM-3.2 Build-Out ×N sesiones (pm-3-2-s1..sN.json · sessions detail)",
        "PM-3.5 Final Mission (pm-3-5.json · transferencia ABP)",
        "PM-3.6 GFPI-F-135 (pm-3-6.json · cross-ref activities + evidencias formales E1-E6)",
    ]
    bundle["dependencias_downstream"] = [
        "Aprendiz (consume directo · copia secciones a tool visual de su elección)",
        "Instructor (puede generar visuals para apoyar clase · usando tool de su preferencia)",
        "NO hay downstream PMs · pm-3-3.md es terminal output · external tool ES renderer",
    ]
    bundle["shape_canonico_esperado"] = {
        "output_format": ".md (Markdown · UTF-8 · single file)",
        "output_filename": f"runs/{run_id}/{(guide_id+'/') if guide_id else ''}pm-3-3.md",
        "ground_truth_ref": "NULL (PM-3.3 v3.0 nuevo · master prompt v3.0 spec canónica)",
        "estructura_top_level_REGLA_15": [
            "# Visual Aid Guide — [Programa] — Guía [N] · [Nombre Guía] (H1)",
            "## Frontmatter (run_id · guide_id · generated_date · pm_version=3.0 · paleta_canon · tools_compatibles · universo_narrativo)",
            "## Cómo usar este documento (instrucciones de consumo · cross-tool)",
            "## Tabla de contenido (anchor links · 1 per actividad)",
            "## Actividades · organizadas por sesión (### Sesión N — titulo · agrupa M actividades)",
        ],
        "estructura_por_actividad_REGLA_12": [
            "### Actividad [actividad_id] — [titulo_es] / [titulo_en] (H3)",
            "1. IDENTIFICACIÓN (sesión · momento · tiempo · agrupación · tipo SENA · scaffold · evidencia)",
            "2. CONCEPTO VISUAL (hero idea · tono · anclaje narrativo)",
            "3. BLOQUES DE CONTENIDO (headline · subhead · body · CTA)",
            "4. LAYOUT DEL SCAFFOLD (wireframe textual · regiones · interacción)",
            "5. EVIDENCIA & RÚBRICA VISIBLE (producto · criterio · rúbrica)",
            "6. RESTRICCIONES DE DISEÑO (paleta SENA + universo guía)",
            "7. PROMPT DE GENERACIÓN (frase narrativa tool-agnostic)",
        ],
        "design_constraints_REGLA_13": {
            "SI_universal": [
                "paleta SENA hex codes (#39A900 verde acento · #0B2E45 azul titular)",
                "universo narrativo dinámico (extraído de pm-1-2.universo_narrativo · NO hardcoded)",
                "imagery guidance (real photos · profesional · contexto laboral · NO infantil)",
                "iconografía tone (technical · adult · sector-adecuada)",
                "jerarquía tipográfica (heading > body > caption · sin pixels)",
                "mood/tone (concentrado · energético · reflexivo · etc.)",
            ],
            "NO_tool_locked": [
                "dimensiones específicas (Calibri 24pt PPTX-only · Inter 16px Claude Design-only)",
                "schema-specific keys (Canva element types · Claude Design components · Slidev frontmatter)",
                "slide layout names (LAYOUT_16x9 pptxgenjs-only · CSS classes Tailwind-only)",
                "animation/transition specs (PPTX-only · Reveal.js-only)",
                "tool-specific markdown extensions (NotebookLM [!callout] · MDX <Component/>)",
            ],
        },
        "validation_checks_v3_0_REGLA_16": "10 checks (output .md único · frontmatter · 7 secciones canónicas · paleta + universo · NO tool-locks · TOC · cross-ref pm-3-6 · anti-copia-fantasma)",
    }
    bundle["smoke_shape_deuda"] = {
        "estado": "Smoke shape behavioral incompleto · ningún fixture tiene v3.0 ref op todavía",
        "razon": "PM-3.3 v3.0 nuevo paradigm · v2.4 deck NO es comparable",
        "resolucion": "Behavioral validation post primer run IMARPOR-CC · ejemplo layout 1-2 actividades para Sergio aprobación · luego full run 25 actividades",
        "primera_ejecucion": "Cuando se genere primer pm-3-3.md IMARPOR-CC + Sergio aprueba · ese mismo se vuelve ref op para futuros runs (REF_OPERACIONALES_PHASE3 actualizable)",
    }

    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Inputs Fase 3: {bundle['inputs_loaded']['activity_cards_count']} Activity Cards · all enriched={bundle['inputs_loaded']['all_activity_cards_enriched']}")
    print(f"  ✓ Inputs Fase 4 (Playbook completo):")
    print(f"      pm31_loaded: {bundle['inputs_loaded']['pm31_loaded']}")
    print(f"      pm32_sessions_count: {bundle['inputs_loaded']['pm32_sessions_count']}")
    print(f"      pm35_loaded: {bundle['inputs_loaded']['pm35_loaded']}")
    print(f"  ✓ Output paradigm v3.0: pm-3-3.md (NO pptx · NO spec.json · tool-agnostic)")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    print(f"     Recomendado: primer run produce ejemplo layout 1-2 actividades para aprobación · luego full run.")

    return bundle


if __name__ == "__main__":
    args = parse_subagente_args(__file__)

    # Smoke shape default: strict_gate3=False · permite fixtures legacy
    # Production: strict_gate3=True · requiere Sergio aprobación Gate 3
    strict_gate3 = "--strict-gate3" in sys.argv

    bundle = preparar_bundle_pm_3_3(
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
        "paradigm_shift_v3_0": bundle["paradigm_shift_v3_0"],
        "shape_canonico_esperado": bundle["shape_canonico_esperado"],
        "dependencias_upstream_count": len(bundle["dependencias_upstream"]),
        "smoke_shape_deuda": bundle["smoke_shape_deuda"],
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
