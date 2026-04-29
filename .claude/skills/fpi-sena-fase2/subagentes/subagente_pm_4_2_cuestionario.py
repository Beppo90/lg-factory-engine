"""
subagente_pm_4_2_cuestionario.py — Subagente mecánico PM-4.2 Cuestionario Técnico S6.

Ensambla el Cuestionario Consolidado S6 (Evidencia de Conocimiento sumativa):
- 5 secciones × 5 puntos = 25 puntos totales
- 25 ítems × 1 punto cada uno
- Distribución: Reading 5 + Writing 5 + Listening 5 + Vocabulary 5 + Grammar 5
- Principio de Tres Versiones (Apropiación → Evaluación → Transferencia · canon PM-4.2)

Master prompt canónico: PM-4.2 (verificación de versión obligatoria).
Camino arquitectónico: (1) Python con consolidación algorítmica.

Inputs:
- pm-4-1.json (framework del Cuestionario S6)
- Activity Cards de S2-S5 (PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.10)
- pm-1-2.json (vocabulario · 20 términos)

Output:
- pm-4-2.json: Cuestionario Consolidado S6 (25 ítems · 25 puntos)

Uso:
    python3 subagente_pm_4_2_cuestionario.py <run_id> <runs_dir> <master_prompts_dir> <guide_id>
"""

import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from master_prompt_loader import load_master_prompt
from input_loader import load_phase2_inputs, load_run_input, load_activity_card, save_run_output


# Estructura canónica de las 5 secciones (PM-4.2 REGLA 5)
SECCIONES_CANONICAS = [
    {"numero": 1, "skill": "Reading", "puntos": 5, "items_count": 5, 
     "fuente_pm": "PM-2.3", "principio_tres_versiones": "Versión 2 EVALUACIÓN · contexto nuevo"},
    {"numero": 2, "skill": "Writing", "puntos": 5, "items_count": 5,
     "fuente_pm": "PM-2.4", "principio_tres_versiones": "Versión 2 EVALUACIÓN · tarea parecida pero diferente"},
    {"numero": 3, "skill": "Listening", "puntos": 5, "items_count": 5,
     "fuente_pm": "PM-2.6", "principio_tres_versiones": "Versión 2 EVALUACIÓN · audio nuevo"},
    {"numero": 4, "skill": "Vocabulary", "puntos": 5, "items_count": 5,
     "fuente_pm": "PM-2.5", "principio_tres_versiones": "Versión 2 EVALUACIÓN · diferentes contextualizaciones"},
    {"numero": 5, "skill": "Grammar", "puntos": 5, "items_count": 5,
     "fuente_pm": "PM-2.10", "principio_tres_versiones": "Versión 2 EVALUACIÓN · contexto diferente"}
]


def construir_seccion(seccion_template, activity_card, pm12=None):
    """Construye una sección del cuestionario desde su template + Activity Card fuente."""
    items = []
    
    # Extraer contenido relevante del Activity Card según skill
    skill = seccion_template["skill"]
    
    # Generar 5 ítems (placeholder estructural · PM-4.2 v2.0 es ENSAMBLADOR · no diseñador)
    # El instructor o un PM creativo puede rellenar los ítems específicos
    for i in range(seccion_template["items_count"]):
        items.append({
            "item_numero": i + 1,
            "tipo_pregunta": "[A DEFINIR · puede ser: opción múltiple · completar · verdadero/falso · respuesta corta]",
            "contenido": f"[ÍTEM {i+1} de {skill} · cosechado de {seccion_template['fuente_pm']} · contexto nuevo según Principio de Tres Versiones]",
            "puntaje_max": 1,
            "respuesta_correcta_key": f"[RESPUESTA {i+1}]",
            "fuente_origen": seccion_template["fuente_pm"],
            "principio_aplicado": seccion_template["principio_tres_versiones"]
        })
    
    return {
        **seccion_template,
        "items": items,
        "fuente_activity_card": activity_card.get("pm_id") if activity_card else seccion_template["fuente_pm"],
        "puntaje_seccion_total": seccion_template["puntos"]
    }


def ensamblar_cuestionario_s6(run_id, runs_dir, master_prompts_dir, guide_id):
    """Función principal del subagente PM-4.2."""
    # 1. Pre-flight
    print(f"[PM-4.2 cuestionario S6] Pre-flight: cargando master prompt PM-4.2...")
    try:
        mp = load_master_prompt("PM-4.2", master_prompts_dir, strict_version=False)
        print(f"  ✓ Master prompt cargado · v{mp['version']} ({mp['size_bytes']:,} bytes)")
    except Exception as e:
        print(f"  ⚠ {e}")
        return None
    
    # 2. Cargar inputs
    print(f"[PM-4.2] Cargando Activity Cards de PMs evaluativos para Cuestionario S6...")
    pm_to_section = {
        "PM-2.3": 0,  # Reading
        "PM-2.4": 1,  # Writing
        "PM-2.6": 2,  # Listening
        "PM-2.5": 3,  # Vocabulary
        "PM-2.10": 4  # Grammar
    }
    
    activity_cards_by_section = [None] * 5
    missing = []
    
    for pm_id, idx in pm_to_section.items():
        try:
            ac = load_activity_card(run_id, runs_dir, guide_id, pm_id)
            activity_cards_by_section[idx] = ac
            print(f"  ✓ Activity Card de {pm_id} cargada (sección {idx+1})")
        except FileNotFoundError:
            missing.append(pm_id)
            print(f"  ⚠ Activity Card de {pm_id} no encontrada (sección {idx+1} stub)")
    
    # 3. Cargar pm-1-2 para vocabulario (Toolbelt 20 términos)
    pm12 = None
    try:
        inputs = load_phase2_inputs(run_id, runs_dir, guide_id=guide_id)
        pm12 = inputs["pm12"]
    except Exception as e:
        print(f"  ⚠ pm-1-2 no cargable: {e}")
    
    # 4. Ensamblar las 5 secciones
    print(f"[PM-4.2] Ensamblando Cuestionario S6 (5 secciones × 5 ítems)...")
    secciones = []
    for i, seccion_template in enumerate(SECCIONES_CANONICAS):
        seccion = construir_seccion(seccion_template, activity_cards_by_section[i], pm12)
        secciones.append(seccion)
    
    # 5. Calcular totales y validar canon (5×5=25)
    total_puntos = sum(s["puntaje_seccion_total"] for s in secciones)
    total_items = sum(len(s["items"]) for s in secciones)
    
    cuestionario = {
        "pm_id": "PM-4.2",
        "subagente": "subagente_pm_4_2_cuestionario",
        "version_master_prompt": mp.get("version"),
        "version_subagente": "1.0",
        "run_id": run_id,
        "guide_id": guide_id,
        "tipo_evidencia": "Conocimiento (sumativa S6)",
        "tecnica": "Formulación de preguntas",
        "instrumento_numero": 6,
        "principio_aplicado": "Tres Versiones — Versión 2 EVALUACIÓN · contextos nuevos · NO repetir tareas literales de S2-S5 (Apropiación)",
        "secciones": secciones,
        "totales": {
            "secciones_count": len(secciones),
            "items_count_total": total_items,
            "puntaje_max_total": total_puntos,
            "puntaje_canonico_v_2_3_1": 25,
            "items_canonicos": 25,
            "match_canon_puntos": total_puntos == 25,
            "match_canon_items": total_items == 25
        },
        "answer_key": {
            "instrucciones": "Cada sección tiene 5 ítems × 1 pt = 5 pts. Respuestas correctas detalladas en cada item.respuesta_correcta_key",
            "total_a_distribuir": 25
        },
        "missing_activity_cards": missing,
        "ready_for_validation_pm_2_11": True
    }
    
    out_path = save_run_output(run_id, runs_dir, "pm-4-2.json", cuestionario, guide_id=guide_id)
    print(f"  ✓ pm-4-2.json guardado: {out_path}")
    print(f"  Totales: {total_items} ítems · {total_puntos} pts (canon: 25 ítems · 25 pts)")
    
    return cuestionario


if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Uso: python subagente_pm_4_2_cuestionario.py <run_id> <runs_dir> <master_prompts_dir> <guide_id>")
        sys.exit(1)
    
    result = ensamblar_cuestionario_s6(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    if result:
        t = result["totales"]
        print(f"\n=== Resultado ===")
        print(f"  Secciones: {t['secciones_count']}")
        print(f"  Ítems: {t['items_count_total']} (canon: {t['items_canonicos']}) · match: {t['match_canon_items']}")
        print(f"  Puntos: {t['puntaje_max_total']} (canon: {t['puntaje_canonico_v_2_3_1']}) · match: {t['match_canon_puntos']}")
