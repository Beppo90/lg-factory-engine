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
from input_loader import load_phase2_inputs, load_pm20_blueprint, load_arquetipos_elegidos, load_phase3_inputs


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



# ═══════════════════════════════════════════════════════════════════════════
# FASE 3 BUNDLER · paralelo a preparar_bundle() pero sin arquetipos
# ═══════════════════════════════════════════════════════════════════════════

# Mapping pm_id Fase 3 → ref operacional MGV ground truth (canon más maduro v2.6)
REF_OPERACIONALES_PHASE3 = {
    "PM-3.1": "runs/MGV-2026-04-20/pm-3-1.json",
    "PM-3.2": "runs/MGV-2026-04-20/pm-3-2-s1.json",  # ejemplo · subagente PM-3.2 elige sesión específica
    "PM-3.3": "runs/DIESEL-2026-04-15/pm-3-3-spec.json",  # único run con PPTX completo
    "PM-3.4": "runs/MGV-2026-04-20/pm-3-4-content.json",
    "PM-3.5": "runs/MGV-2026-04-20/pm-3-5.json",
    "PM-3.6": "runs/MGV-2026-04-20/pm-3-6.json",
}


def cargar_ref_operacional_phase3(pm_id, repo_root):
    """Carga ref operacional Fase 3 desde MGV-2026-04-20 (canon más maduro v2.6)."""
    if pm_id not in REF_OPERACIONALES_PHASE3:
        return None, f"PM {pm_id} no tiene ref operacional Fase 3 registrado"
    
    rel_path = REF_OPERACIONALES_PHASE3[pm_id]
    abs_path = Path(repo_root) / rel_path
    
    if not abs_path.exists():
        return None, f"Ref operacional Fase 3 no encontrado: {abs_path}"
    
    return json.loads(abs_path.read_text(encoding="utf-8")), str(abs_path)


def construir_prompt_canonico_phase3(master_prompt_text, inputs, ref_op, deliverable_spec):
    """Construye prompt canónico Fase 3 · SIN bloque arquetipos (no aplica a Fase 3).
    
    Estructura del prompt:
    1. Header subagente Fase 3
    2. Master prompt completo (REGLA 19 cumplida vía inyección)
    3. Inputs estructurados (pm-2-11 + 9 Activity Cards + pm-4-X + pm-2-0 + pm-1-2 + pm-0-context)
    4. Ref operacional MGV ground truth (NO copiar contenido · solo guía calidad)
    5. Deliverable spec (schema esperado · campos canónicos)
    6. Anti-patrones recordatorio (REGLA 20-shape · CHECK 9 · enriched: false)
    """
    pm_id = inputs.get("pm_id_target", "PM-3.X")
    
    sections = []
    
    # Header
    sections.append(
        f"Eres un subagente del orquestador FPI SENA Fase 3. Tu trabajo es generar 1 output canónico\n"
        f"para {pm_id} siguiendo el master prompt canónico inyectado abajo.\n"
    )
    
    # Master prompt INTEGRO (REGLA 19 cumplida)
    sections.append(
        "═══════════════════════════════════════════════════════════════════════════\n"
        "TU CONTRATO DE GENERACIÓN — MASTER PROMPT CANÓNICO (LEE COMPLETO ANTES DE GENERAR)\n"
        "═══════════════════════════════════════════════════════════════════════════\n"
        f"\n{master_prompt_text}\n"
    )
    
    # Inputs estructurados
    sections.append(
        "═══════════════════════════════════════════════════════════════════════════\n"
        "INPUTS DEL RUN ACTUAL (Fase 1 + Fase 2 cerrada · canon §6.4 cumplido)\n"
        "═══════════════════════════════════════════════════════════════════════════\n"
        f"\nrun_id: {inputs.get('run_id', 'UNKNOWN')}\n"
        f"guide_id: {inputs.get('guide_id', 'None (single-guía absorpción)')}\n"
        f"\n--- pm-0-context.json ---\n{json.dumps(inputs.get('pm0_context', {}), indent=2, ensure_ascii=False)[:3000]}...\n"
        f"\n--- pm-1-2.json ---\n{json.dumps(inputs.get('pm12', {}), indent=2, ensure_ascii=False)[:3000]}...\n"
        f"\n--- pm-2-11.json (GFPI-F-134 row · ready_for_phase_3 validated) ---\n{json.dumps(inputs.get('pm211', {}), indent=2, ensure_ascii=False)[:3000]}...\n"
        f"\n--- 9 Activity Cards (enriched: true) keys: {list(inputs.get('activity_cards', {}).keys())}\n"
        f"\n--- pm-2-0.json (Session Blueprint) ---\n{json.dumps(inputs.get('pm20', {}), indent=2, ensure_ascii=False)[:2000]}...\n"
        f"\nNota: las 9 Activity Cards completas están disponibles si necesitas inspeccionarlas (path runs/{inputs.get('run_id')}/pm-2-X.json).\n"
    )
    
    # Ref operacional ground truth
    if ref_op:
        sections.append(
            "═══════════════════════════════════════════════════════════════════════════\n"
            "REF OPERACIONAL · GROUND TRUTH MGV-2026-04-20 (canon más maduro v2.6)\n"
            "═══════════════════════════════════════════════════════════════════════════\n"
            f"\n⚠ USAR COMO GUÍA DE CALIDAD · NO COPIAR CONTENIDO (CHECK 9 anti-copia-fantasma activo).\n"
            f"El universo MGV es 'Pixel & Ink Studio' (gráfico) · si el run actual es marítimo (IMARPOR-CC),\n"
            f"el contenido del ref op NO debe filtrarse · solo el SHAPE/STRUCTURE/PEDAGOGY.\n"
            f"\n--- Ref op shape (top-level keys + sample) ---\n"
            f"{json.dumps({k: (v if not isinstance(v, (dict, list)) else f'<{type(v).__name__} len={len(v)}>') for k,v in ref_op.items()}, indent=2, ensure_ascii=False)}\n"
        )
    
    # Deliverable spec
    sections.append(
        "═══════════════════════════════════════════════════════════════════════════\n"
        "DELIVERABLE SPEC · qué generar exactamente\n"
        "═══════════════════════════════════════════════════════════════════════════\n"
        f"\n{json.dumps(deliverable_spec, indent=2, ensure_ascii=False)}\n"
    )
    
    # Anti-patrones recordatorio
    sections.append(
        "═══════════════════════════════════════════════════════════════════════════\n"
        "RECORDATORIOS · anti-patrones a evitar\n"
        "═══════════════════════════════════════════════════════════════════════════\n"
        "\n"
        "1. NO copiar contenido del ref operacional MGV (CHECK 9 anti-copia-fantasma).\n"
        "   Universo del run actual ≠ universo MGV. Replica SHAPE · NUNCA contenido.\n"
        "\n"
        "2. NO inventes campos no documentados en master prompt o deliverable spec.\n"
        "   Si el shape canónico tiene N keys, emite exactamente N (no más, no menos).\n"
        "\n"
        "3. Marca 'enriched: false' en el output (Gate Humano 3 Playbook approval pendiente).\n"
        "\n"
        "4. Si el master prompt tiene 'PRE-GENERATION CHECKLIST' (PM-3.5 v2.6 lo tiene), CÚMPLELO antes de generar.\n"
    )
    
    return "\n".join(sections)


def preparar_bundle_phase3(pm_id, run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    """Bundler Fase 3 · paralelo a preparar_bundle() pero sin arquetipos.
    
    Diferencias vs preparar_bundle() (Fase 2):
    - NO carga arquetipos-elegidos.json (Fase 3 outputs no tienen arquetipos discretos)
    - NO ramificación estilo mgv vs diesel (Fase 3 tiene shape canónico fijo per master prompt)
    - Carga inputs Fase 3 (load_phase3_inputs · más extensos: pm-2-11 + 9 ACs + pm-4-X)
    - Ref operacional: MGV-2026-04-20 (canon más maduro v2.6)
    - Construye prompt sin bloque arquetipos
    
    Per PLAN-FASE-3-ARQUITECTURA.md v1.2 §11.1 #9 (D.1.5) + corrección §5.3 PM-3.1+3.6 → Camino 2 LLM.
    
    Args:
        pm_id: ej "PM-3.1"
        run_id: ej "IMARPOR-CC-2026-04-27"
        runs_dir: path al directorio runs/
        master_prompts_dir: path al directorio master-prompts/
        repo_root: path raíz del repo (para refs operacionales)
        guide_id: opcional · single-guía absorpción
    
    Returns:
        dict con keys análogas a preparar_bundle() (subagent_type, prompt, expected_output_file,
        validation_post_hoc, inputs_loaded, bundle_size_chars)
    
    Raises:
        FileNotFoundError, ValueError según master_prompt_loader e input_loader
    """
    # 1. Pre-flight: cargar master prompt Fase 3
    mp = load_master_prompt(pm_id, master_prompts_dir, strict_version=True)
    
    # 2. Cargar inputs Fase 3 (incluye gate canon §6.4 strict)
    p3 = load_phase3_inputs(run_id, runs_dir, guide_id=guide_id)
    
    # 3. Cargar ref operacional MGV ground truth
    ref_op, ref_op_path = cargar_ref_operacional_phase3(pm_id, repo_root)
    
    # 4. Construir inputs bundle (incluye pm_id_target para context)
    inputs_bundle = {
        "pm_id_target": pm_id,
        "run_id": run_id,
        "guide_id": guide_id,
        "pm0_context": p3["pm0_context"],
        "pm12": p3["pm12"],
        "pm20": p3["pm20"],
        "pm211": p3["pm211"],
        "activity_cards": p3["activity_cards"],
        "pm41": p3["pm41"],
        "pm42": p3["pm42"],
    }
    
    # 5. Deliverable spec minimal Fase 3 (emerge per PM en Hitos 2-4 · I.2 strict)
    deliverable_spec = {
        "pm_id": pm_id,
        "expected_output_file": f"runs/{run_id}/{guide_id+'/' if guide_id else ''}pm-{pm_id.replace('PM-', '').replace('.', '-')}.json",
        "shape_reference": f"Ver ref operacional MGV-2026-04-20 + master prompt {pm_id} arriba inyectado · respetar canon estricto",
        "enriched_initial": False,
        "gate_humano_pendiente": "Gate 3 (Playbook approval) post-generación"
    }
    
    # 6. Construir prompt canónico Fase 3 (sin arquetipos block)
    prompt = construir_prompt_canonico_phase3(
        master_prompt_text=mp["text"],
        inputs=inputs_bundle,
        ref_op=ref_op,
        deliverable_spec=deliverable_spec
    )
    
    return {
        "subagent_type": "general-purpose",
        "prompt": prompt,
        "expected_output_file": deliverable_spec["expected_output_file"],
        "expected_output_schema": deliverable_spec.get("shape_reference"),
        "validation_post_hoc": [
            "shape conforme master prompt {pm_id} v{version}",
            "enriched: false marcado (Gate Humano 3 Playbook approval pendiente)",
            "anti-copia-fantasma vs ref operacional MGV (CHECK 9)",
            "REGLA 20-shape · grep paths reales antes de validar internals",
        ],
        "inputs_loaded": {
            "master_prompt": {"pm_id": mp["pm_id"], "version": mp["version"], "size_bytes": mp["size_bytes"]},
            "pm0_context_loaded": p3["pm0_context"] is not None,
            "pm12_loaded": p3["pm12"] is not None,
            "pm20_loaded": p3["pm20"] is not None,
            "pm211_ready_for_phase_3": p3["pm211"].get("ready_for_phase_3", False),
            "activity_cards_count": len(p3["activity_cards"]),
            "all_activity_cards_enriched": all(ac.get("enriched", False) for ac in p3["activity_cards"].values()),
            "pm41_loaded": p3["pm41"] is not None,
            "pm42_loaded": p3["pm42"] is not None,
            "ref_op_path": ref_op_path,
        },
        "bundle_size_chars": len(prompt)
    }


# ═══════════════════════════════════════════════════════════════════════════

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
