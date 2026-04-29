"""
task_tool_bundler.py — Helper compartido para construir bundles de invocación
canónica del Task tool · Camino arquitectónico (2) para subagentes creativos.

Cada subagente creativo (PM-2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10) usa
este helper para preparar el bundle que el orquestador (Claude) lanza vía Task tool.

El bundle contiene TODO lo que el subagente necesita:
- master prompt completo (texto inyectado · NO path)
- inputs estructurados (pm-0-context, pm-1-2, pm-2-0)
- estilo declarado por instructor (mgv_compendio_metodologico vs diesel_secuencia_encadenada)
- arquetipos seleccionados (1, varios o TODOS)
- ref operacional más cercana (MGV o DIESEL según estilo)
- previous_pms_chain (cadena de dependencias dentro de la sesión)
- deliverable spec (qué debe producir · schema · campos obligatorios)

NO LANZA Task tool · solo PREPARA el bundle. El orquestador (Claude) decide
cuándo invocar y maneja el output post-hoc.
"""

import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR))

from master_prompt_loader import load_master_prompt
from input_loader import load_phase2_inputs, load_pm20_blueprint, load_arquetipos_elegidos


# Mapeo PM → ref operacional canon según estilo declarado
REF_OPERACIONALES = {
    "mgv_compendio_metodologico": {
        "PM-2.1": "runs/MGV-2026-04-20/pm-2-1.json",
        "PM-2.2": "runs/MGV-2026-04-20/pm-2-2.json",
        "PM-2.3": "runs/MGV-2026-04-20/pm-2-3.json",
        "PM-2.4": "runs/MGV-2026-04-20/pm-2-4.json",
        "PM-2.5": "runs/MGV-2026-04-20/pm-2-5.json",
        "PM-2.6": "runs/MGV-2026-04-20/pm-2-6.json",
        "PM-2.8": "runs/MGV-2026-04-20/pm-2-8.json",
        "PM-2.9": "runs/MGV-2026-04-20/pm-2-9.json",
        "PM-2.10": "runs/MGV-2026-04-20/pm-2-10.json"
    },
    "diesel_secuencia_encadenada": {
        "PM-2.1": "runs/DIESEL-2026-04-19/pm-2-1.json",
        "PM-2.2": "runs/DIESEL-2026-04-19/pm-2-2.json",
        "PM-2.3": "runs/DIESEL-2026-04-19/pm-2-3.json",
        "PM-2.4": "runs/DIESEL-2026-04-19/pm-2-4.json",
        "PM-2.5": "runs/DIESEL-2026-04-19/pm-2-5.json",
        "PM-2.6": "runs/DIESEL-2026-04-19/pm-2-6.json",
        "PM-2.8": "runs/DIESEL-2026-04-19/pm-2-8.json",
        "PM-2.9": "runs/DIESEL-2026-04-19/pm-2-9.json",
        "PM-2.10": "runs/DIESEL-2026-04-19/pm-2-10.json"
    }
}


def cargar_ref_operacional(pm_id, estilo, repo_root):
    """Carga el ref operacional más cercano según el estilo declarado por el instructor."""
    if estilo not in REF_OPERACIONALES:
        return None, f"Estilo desconocido: {estilo}"
    if pm_id not in REF_OPERACIONALES[estilo]:
        return None, f"PM {pm_id} no tiene ref operacional para estilo {estilo}"
    
    rel_path = REF_OPERACIONALES[estilo][pm_id]
    abs_path = Path(repo_root) / rel_path
    
    if not abs_path.exists():
        return None, f"Ref operacional no encontrado: {abs_path}"
    
    return json.loads(abs_path.read_text(encoding="utf-8")), str(abs_path)


def construir_prompt_canonico(master_prompt_text, inputs, arquetipos, ref_op, deliverable_spec):
    """
    Construye el prompt completo que el Task tool usará como instrucción del subagente.
    
    El prompt sigue estructura canónica (REGLA 19 + jerarquía canónica + ramificación):
    1. CONTRATO DE GENERACIÓN: master prompt completo (TEXTO inyectado · no path)
    2. JERARQUÍA CANÓNICA recordatorio
    3. ESTILO DECLARADO por instructor (Gate Humano 1)
    4. INPUTS estructurados
    5. REF OPERACIONAL (ground truth · usar como guía de calidad NO como copia)
    6. DELIVERABLE SPEC (schema esperado · campos obligatorios)
    7. ANTI-PATRÓN recordatorio (NO inventar · usar canon · marcar enriched: false)
    """
    
    estilo = arquetipos.get("estilo")
    if estilo == "mgv_compendio_metodologico":
        archetypes_list = arquetipos.get("integration_all_archetypes_policy", {}).get("archetypes_integrated", [])
        ramif_text = (
            f"ESTILO: mgv_compendio_metodologico (compendio metodológico)\n"
            f"ARQUETIPOS A INTEGRAR ({len(archetypes_list)}): {archetypes_list}\n"
            f"RAMIFICACIÓN: documenta TODOS los arquetipos como menú · cada uno con frases fijas + Language Bank + Micro-Cápsulas\n"
            f"ESTRUCTURA OUTPUT: integration_all_archetypes_policy + content con sub-objetos archetype_X_NAME (uno por arquetipo)\n"
            f"BLOOM CEILING: {arquetipos.get('integration_all_archetypes_policy', {}).get('bloom_ceiling_a11', 'no declarado')}"
        )
    elif estilo == "diesel_secuencia_encadenada":
        archetypes_list = arquetipos.get("archetype_used", [])
        archetype_mode = arquetipos.get("archetype_mode", "")
        ramif_text = (
            f"ESTILO: diesel_secuencia_encadenada (secuencia encadenada)\n"
            f"ARQUETIPOS USADOS ({len(archetypes_list)}): {archetypes_list}\n"
            f"ARCHETYPE MODE: {archetype_mode}\n"
            f"RAMIFICACIÓN: 1 Activity Card con N actividades (cada activity.archetype específico) · array momentos[] espejando activities[]\n"
            f"ESTRUCTURA OUTPUT: archetype_used [N] + archetype_mode + activity_card.activities[i].archetype específico"
        )
    else:
        ramif_text = f"ESTILO DESCONOCIDO: {estilo} · ERROR · usar default mgv_compendio_metodologico"
    
    prompt = f"""Eres un subagente del orquestador FPI SENA Fase 2. Tu trabajo es generar 1 Activity Card siguiendo el master prompt canónico inyectado abajo.

═══════════════════════════════════════════════════════════════════════════
TU CONTRATO DE GENERACIÓN — MASTER PROMPT CANÓNICO (LEE COMPLETO ANTES DE GENERAR)
═══════════════════════════════════════════════════════════════════════════

{master_prompt_text}

═══════════════════════════════════════════════════════════════════════════
JERARQUÍA CANÓNICA DE AUTORIDAD (RECORDATORIO · DM v2.12 §11)
═══════════════════════════════════════════════════════════════════════════

NIVEL 1 — Directiva del instructor (capturada en runs maduros · MÁXIMA AUTORIDAD)
NIVEL 2 — Implementación operacional (DIESEL/MGV runs · refleja directiva)
NIVEL 3 — Master prompts canon (deben actualizarse cuando contradigan 1-2)

Si hay conflicto entre fuentes: gana nivel 1 · luego 2 · luego 3.

═══════════════════════════════════════════════════════════════════════════
ESTILO DECLARADO POR INSTRUCTOR (Gate Humano 1 · arquetipos-elegidos.json)
═══════════════════════════════════════════════════════════════════════════

{ramif_text}

═══════════════════════════════════════════════════════════════════════════
INPUTS ESTRUCTURADOS (anclas pedagógicas + universo)
═══════════════════════════════════════════════════════════════════════════

pm-0-context (anclas pedagógicas):
{json.dumps(inputs.get('pm0_context', {}), indent=2, ensure_ascii=False)[:3000]}
...

pm-1-2 (universo de la guía · 4 bloques canónicos):
{json.dumps(inputs.get('pm12', {}), indent=2, ensure_ascii=False)[:3000]}
...

pm-2-0 blueprint (Session Blueprint):
{json.dumps(inputs.get('pm20', {}), indent=2, ensure_ascii=False)[:1500]}
...

═══════════════════════════════════════════════════════════════════════════
REF OPERACIONAL (ground truth canónico · USA como guía de calidad NO como copia)
═══════════════════════════════════════════════════════════════════════════

Ref: {inputs.get('ref_op_path', 'no disponible')}

{json.dumps(ref_op, indent=2, ensure_ascii=False)[:3000] if ref_op else 'NO DISPONIBLE'}
...

═══════════════════════════════════════════════════════════════════════════
DELIVERABLE — Activity Card según schema
═══════════════════════════════════════════════════════════════════════════

{json.dumps(deliverable_spec, indent=2, ensure_ascii=False)}

═══════════════════════════════════════════════════════════════════════════
REGLAS CRÍTICAS (anti-patrones documentados · NO violar)
═══════════════════════════════════════════════════════════════════════════

1. NO copies contenido del ref operacional · es ground truth de OTRA guía · usa solo como guía de calidad pedagógica
2. NO inventes arquetipos · usa SOLO los declarados en estilo/archetypes
3. NO improvises estructura · sigue master prompt LITERAL
4. NO marques enriched: true · debe ser enriched: false (espera Instructor Selection · Gate Humano 2)
5. SI tienes duda sobre algún campo · sigue master prompt · NO inventes
6. Output final: 1 archivo JSON Activity Card según schema canónico
7. CHECK 9 anti-copia-fantasma se valida post-hoc en PM-2.11 · genera contenido ORIGINAL para esta guía específica

DELIVERABLE FINAL: 1 archivo JSON con la Activity Card completa · listo para que PM-2.11 ensamble + valide los 16 checks.
"""
    return prompt


def preparar_bundle(pm_id, run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    """
    Función principal del bundler · prepara TODO el bundle para que el orquestador
    lance Task tool.
    
    Returns:
        dict con keys:
        - subagent_type: "general-purpose"
        - prompt: string completo (master prompt + inputs + estilo + ref op + deliverable)
        - expected_output: descripción del archivo JSON esperado
        - validation_post_hoc: list de checks a ejecutar después
        - inputs_loaded: metadata de qué se cargó (auditable)
        - bundle_size_chars: tamaño del prompt construido
    
    Raises:
        FileNotFoundError, ValueError según master_prompt_loader e input_loader
    """
    # 1. Pre-flight: cargar master prompt
    mp = load_master_prompt(pm_id, master_prompts_dir, strict_version=True)
    
    # 2. Cargar inputs Fase 1+2
    inputs = load_phase2_inputs(run_id, runs_dir, guide_id=guide_id)
    pm20 = load_pm20_blueprint(run_id, runs_dir)
    
    # 3. Cargar arquetipos elegidos (Gate Humano 1)
    try:
        arquetipos_all = load_arquetipos_elegidos(run_id, runs_dir)
        arquetipos_pm = next((e for e in arquetipos_all["elecciones"] if e["pm"] == pm_id), None)
        if not arquetipos_pm:
            raise ValueError(f"arquetipos-elegidos.json no tiene entrada para {pm_id}")
    except FileNotFoundError:
        # Fallback para smoke-test sin Gate Humano 1 cumplido
        arquetipos_pm = {
            "pm": pm_id,
            "estilo": "mgv_compendio_metodologico",
            "integration_all_archetypes_policy": {
                "archetypes_integrated": ["A", "B", "C", "D", "E", "F"][:6],  # default todos
                "bloom_ceiling_a11": "L3 Apply máximo (default fallback · no Gate Humano 1)"
            }
        }
    
    # 4. Cargar ref operacional según estilo
    ref_op, ref_op_path = cargar_ref_operacional(pm_id, arquetipos_pm["estilo"], repo_root)
    
    # 5. Construir inputs bundle
    inputs_bundle = {
        "pm0_context": inputs["pm0_context"],
        "pm12": inputs["pm12"],
        "pm20": pm20,
        "ref_op_path": ref_op_path
    }
    
    # 6. Definir deliverable spec según PM (cada PM tiene schema específico)
    deliverable_spec = construir_deliverable_spec(pm_id, arquetipos_pm)
    
    # 7. Construir prompt canónico
    prompt = construir_prompt_canonico(
        master_prompt_text=mp["text"],
        inputs=inputs_bundle,
        arquetipos=arquetipos_pm,
        ref_op=ref_op,
        deliverable_spec=deliverable_spec
    )
    
    return {
        "subagent_type": "general-purpose",
        "prompt": prompt,
        "expected_output_file": f"runs/{run_id}/{guide_id or ''}/pm-{pm_id.replace('PM-', '').replace('.', '-')}.json",
        "expected_output_schema": deliverable_spec.get("schema_reference"),
        "validation_post_hoc": [
            "schema_v2.6.3 conforme",
            "check_9_anti_copia (delegado a PM-2.11)",
            "Check 8 V+O+C (delegado a PM-2.11)",
            "enriched: false marcado (Gate Humano 2 pendiente)"
        ],
        "inputs_loaded": {
            "master_prompt": {"pm_id": mp["pm_id"], "version": mp["version"], "size_bytes": mp["size_bytes"]},
            "pm0_context_loaded": inputs["pm0_context"] is not None,
            "pm12_loaded": inputs["pm12"] is not None,
            "pm20_loaded": pm20 is not None,
            "arquetipos_elegidos": arquetipos_pm,
            "ref_op_path": ref_op_path
        },
        "bundle_size_chars": len(prompt)
    }


def construir_deliverable_spec(pm_id, arquetipos_pm):
    """Construye spec del deliverable esperado según el PM y el estilo."""
    estilo = arquetipos_pm.get("estilo", "mgv_compendio_metodologico")
    
    spec = {
        "pm_id": pm_id,
        "schema_reference": "Activity Card Schema v2.0 (Fase 2 GFPI-F-134) · ver master-prompts/Activity Card — Schema.md",
        "campos_obligatorios": [
            "run_id", "pm_code", "pm_name", "pm_version", "guia_numero", "guia_nombre",
            "rap_origen", "rap_codigo", "competencia_codigo", "cefr_level", "session", "fase_sena",
            "generated_at", "instructor", "previous_pms",
            "archetypes_policy",  # o integration_all_archetypes_policy
            "pm0_anchor", "universe_anchor",
            "identity", "content", "activity_card",
            "pm0_protocol_session_level",
            "validacion", "siguiente_paso"
        ],
        "estilo_aplicado": estilo,
        "enriched_initial": False,  # Gate Humano 2 lo cambia a True post-aprobación
        "rationale_enriched_false": "Espera Instructor Selection (Gate Humano 2) antes de propagar a PM-2.11"
    }
    
    if estilo == "mgv_compendio_metodologico":
        spec["estructura_output"] = "content debe tener sub-objetos archetype_X_NAME (uno por arquetipo integrado)"
        spec["estructura_extra"] = "integration_all_archetypes_policy con applicable_to_this_pm: true + archetypes_integrated + bloom_ceiling"
    elif estilo == "diesel_secuencia_encadenada":
        spec["estructura_output"] = "activity_card.activities[N] cada uno con archetype específico + momentos[] paralelo"
        spec["estructura_extra"] = "archetype_used [N] top-level + archetype_mode descripción"
    
    return spec


if __name__ == "__main__":
    # Self-test: preparar bundle de PM-2.3 contra MGV-2026-04-20 G1
    if len(sys.argv) < 5:
        print("Uso: python task_tool_bundler.py <pm_id> <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    
    pm_id = sys.argv[1]
    run_id = sys.argv[2]
    runs_dir = sys.argv[3]
    mp_dir = sys.argv[4]
    repo_root = sys.argv[5] if len(sys.argv) > 5 else str(Path(runs_dir).parent)
    guide_id = sys.argv[6] if len(sys.argv) > 6 else None
    
    print(f"=== Preparando bundle para {pm_id} run {run_id} guide {guide_id} ===")
    bundle = preparar_bundle(pm_id, run_id, runs_dir, mp_dir, repo_root, guide_id)
    
    print(f"  Subagent type: {bundle['subagent_type']}")
    print(f"  Bundle size: {bundle['bundle_size_chars']:,} chars")
    print(f"  Master prompt: {bundle['inputs_loaded']['master_prompt']}")
    print(f"  pm-0-context loaded: {bundle['inputs_loaded']['pm0_context_loaded']}")
    print(f"  pm-1-2 loaded: {bundle['inputs_loaded']['pm12_loaded']}")
    print(f"  pm-2-0 loaded: {bundle['inputs_loaded']['pm20_loaded']}")
    print(f"  Ref operacional: {bundle['inputs_loaded']['ref_op_path']}")
    print(f"  Estilo declarado: {bundle['inputs_loaded']['arquetipos_elegidos']['estilo']}")
    print(f"  Expected output: {bundle['expected_output_file']}")
    print(f"  Validations post-hoc: {len(bundle['validation_post_hoc'])} checks")
