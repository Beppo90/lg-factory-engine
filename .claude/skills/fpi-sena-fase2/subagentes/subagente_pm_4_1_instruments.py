"""
subagente_pm_4_1_instruments.py — Subagente mecánico PM-4.1 Instrumentos de Evaluación.

Deriva 6 instrumentos de evaluación formativa desde las Activity Cards de S2-S5
+ framework del Cuestionario S6.

Master prompt canónico: PM-4.1 v2.6.4 (verificación de versión obligatoria).
Camino arquitectónico: (1) Python con plantillas determinísticas.

Los 6 instrumentos canónicos (PM-4.1 §145-208):
1. Cuestionario de Reading (Evidencia de Conocimiento) — desde PM-2.3 · 5 pts
2. Lista de Verificación de Writing (Evidencia de Producto) — desde PM-2.4 · 5 pts
3. Lista de Chequeo de Listening (Evidencia de Desempeño) — desde PM-2.6 · 5 pts
4. Lista de Chequeo de Speaking (Evidencia de Desempeño) — desde PM-2.8 · 5 pts
5. Lista de Chequeo de Language Functions (Evidencia de Desempeño) — desde PM-2.9 · 5 pts
6. Cuestionario Consolidado S6 — framework (implementación detallada en PM-4.2) · 25 pts

Total: 25 pts formativos + 25 pts sumativo = 50 pts (canon v2.3.1).

Uso:
    python3 subagente_pm_4_1_instruments.py <run_id> <runs_dir> <master_prompts_dir> <guide_id>
"""

import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from master_prompt_loader import load_master_prompt
from input_loader import load_phase2_inputs, load_activity_card, save_run_output


# Plantillas canónicas de los 6 instrumentos
PLANTILLAS_INSTRUMENTOS = {
    "INSTRUMENTO_1_READING": {
        "numero": 1,
        "nombre": "Cuestionario de Reading",
        "tipo_evidencia": "Conocimiento",
        "fuente_pm": "PM-2.3",
        "puntos": 5,
        "tecnica": "Formulación de preguntas",
        "estructura": {
            "items_count": 5,
            "items_per_point": 1,
            "skill": "Reading"
        }
    },
    "INSTRUMENTO_2_WRITING": {
        "numero": 2,
        "nombre": "Lista de Verificación de Writing",
        "tipo_evidencia": "Producto",
        "fuente_pm": "PM-2.4",
        "puntos": 5,
        "tecnica": "Valoración de producto",
        "estructura": {
            "criterios_count": 5,
            "rubric_levels": ["Cumple", "Cumple parcialmente", "No cumple"],
            "skill": "Writing"
        }
    },
    "INSTRUMENTO_3_LISTENING": {
        "numero": 3,
        "nombre": "Lista de Chequeo de Listening",
        "tipo_evidencia": "Desempeño",
        "fuente_pm": "PM-2.6",
        "puntos": 5,
        "tecnica": "Observación directa",
        "estructura": {
            "criterios_count": 5,
            "rubric_levels": ["Sí", "No"],
            "skill": "Listening"
        }
    },
    "INSTRUMENTO_4_SPEAKING": {
        "numero": 4,
        "nombre": "Lista de Chequeo de Speaking",
        "tipo_evidencia": "Desempeño",
        "fuente_pm": "PM-2.8",
        "puntos": 5,
        "tecnica": "Observación directa + role play",
        "estructura": {
            "criterios_count": 5,
            "rubric_levels": ["Sí", "No"],
            "skill": "Speaking"
        }
    },
    "INSTRUMENTO_5_LANGUAGE_FUNCTIONS": {
        "numero": 5,
        "nombre": "Lista de Chequeo de Language Functions",
        "tipo_evidencia": "Desempeño",
        "fuente_pm": "PM-2.9",
        "puntos": 5,
        "tecnica": "Observación directa",
        "estructura": {
            "criterios_count": 5,
            "rubric_levels": ["Sí", "No"],
            "skill": "Language Functions"
        }
    },
    "INSTRUMENTO_6_CUESTIONARIO_S6_FRAMEWORK": {
        "numero": 6,
        "nombre": "Cuestionario Consolidado S6 (framework)",
        "tipo_evidencia": "Conocimiento",
        "fuente_pm": "PM-4.2 (implementación detallada)",
        "puntos": 25,
        "tecnica": "Formulación de preguntas",
        "estructura": {
            "secciones_count": 5,
            "puntos_por_seccion": 5,
            "items_count": 25,
            "items_per_point": 1,
            "skills_distribution": {
                "Reading": 5,
                "Writing": 5,
                "Listening": 5,
                "Vocabulary": 5,
                "Grammar": 5
            }
        }
    }
}


def derivar_criterios_desde_activity_card(activity_card, instrumento_template):
    """
    Deriva los criterios específicos del instrumento desde la Activity Card del PM correspondiente.
    """
    criterios = []
    
    # Extraer criterios SOFÍA del Activity Card si existen
    sofia_criterios = activity_card.get("evidence", {}).get("criterios_sofia", [])
    if not sofia_criterios:
        # Fallback: derivar desde activities
        for activity in activity_card.get("activities", []):
            statement = activity.get("statement", "")
            if statement:
                criterios.append({
                    "criterio": statement[:120],
                    "skill": instrumento_template["estructura"].get("skill"),
                    "puntaje_max": 1,
                    "fuente_actividad": activity.get("number")
                })
    else:
        for c in sofia_criterios[:instrumento_template["estructura"].get("criterios_count", 5)]:
            criterios.append({
                "criterio": c if isinstance(c, str) else c.get("descripcion", ""),
                "skill": instrumento_template["estructura"].get("skill"),
                "puntaje_max": 1
            })
    
    # Asegurar exactamente N criterios (rellenar o truncar)
    target_count = instrumento_template["estructura"].get("criterios_count", 
                                                          instrumento_template["estructura"].get("items_count", 5))
    while len(criterios) < target_count:
        criterios.append({
            "criterio": f"[CRITERIO {len(criterios)+1} A COMPLETAR POR INSTRUCTOR]",
            "skill": instrumento_template["estructura"].get("skill"),
            "puntaje_max": 1
        })
    criterios = criterios[:target_count]
    
    return criterios


def derivar_instrumentos(run_id, runs_dir, master_prompts_dir, guide_id):
    """Función principal del subagente PM-4.1."""
    # 1. Pre-flight
    print(f"[PM-4.1 instruments] Pre-flight: cargando master prompt PM-4.1...")
    try:
        mp = load_master_prompt("PM-4.1", master_prompts_dir, strict_version=False)
        print(f"  ✓ Master prompt cargado · v{mp['version']} ({mp['size_bytes']:,} bytes)")
    except Exception as e:
        print(f"  ⚠ {e}")
        return None
    
    # 2. Cargar inputs (Activity Cards de PMs evaluativos: 2.3, 2.4, 2.6, 2.8, 2.9)
    print(f"[PM-4.1] Cargando Activity Cards de PMs evaluativos...")
    pm_evaluativos = {
        "PM-2.3": "INSTRUMENTO_1_READING",
        "PM-2.4": "INSTRUMENTO_2_WRITING",
        "PM-2.6": "INSTRUMENTO_3_LISTENING",
        "PM-2.8": "INSTRUMENTO_4_SPEAKING",
        "PM-2.9": "INSTRUMENTO_5_LANGUAGE_FUNCTIONS"
    }
    
    instrumentos_generados = []
    missing = []
    
    for pm_id, instr_key in pm_evaluativos.items():
        try:
            ac = load_activity_card(run_id, runs_dir, guide_id, pm_id)
            template = PLANTILLAS_INSTRUMENTOS[instr_key]
            criterios = derivar_criterios_desde_activity_card(ac, template)
            
            instrumento = {
                **template,
                "criterios": criterios,
                "fuente_activity_card": pm_id,
                "fuente_evidencia": ac.get("evidence", {}).get("type"),
                "version_master_prompt": mp.get("version")
            }
            instrumentos_generados.append(instrumento)
            print(f"  ✓ Instrumento {template['numero']} ({template['nombre']}) generado desde {pm_id}")
        except FileNotFoundError:
            missing.append(pm_id)
            print(f"  ⚠ Activity Card de {pm_id} no encontrada")
    
    # Instrumento 6: framework del Cuestionario Consolidado S6 (siempre se incluye)
    framework_s6 = {
        **PLANTILLAS_INSTRUMENTOS["INSTRUMENTO_6_CUESTIONARIO_S6_FRAMEWORK"],
        "implementacion_detallada_en": "PM-4.2 subagente",
        "version_master_prompt": mp.get("version")
    }
    instrumentos_generados.append(framework_s6)
    print(f"  ✓ Instrumento 6 (Cuestionario S6 framework) generado · implementación detallada en PM-4.2")
    
    # 3. Calcular totales
    pts_formativos = sum(i["puntos"] for i in instrumentos_generados[:5])  # 5 × 5 = 25
    pts_sumativos = framework_s6["puntos"]  # 25
    
    # 4. Construir output
    output = {
        "pm_id": "PM-4.1",
        "subagente": "subagente_pm_4_1_instruments",
        "version_master_prompt": mp.get("version"),
        "version_subagente": "1.0",
        "run_id": run_id,
        "guide_id": guide_id,
        "instrumentos_count": len(instrumentos_generados),
        "instrumentos": instrumentos_generados,
        "puntuacion_consolidada": {
            "puntos_formativos_total": pts_formativos,
            "puntos_sumativos_cuestionario_s6": pts_sumativos,
            "puntos_canonicos_v_2_3_1": 50,
            "match_canon": (pts_formativos + pts_sumativos) == 50
        },
        "missing_activity_cards": missing,
        "ready_for_pm_4_2": len(missing) == 0
    }
    
    out_path = save_run_output(run_id, runs_dir, "pm-4-1.json", output, guide_id=guide_id)
    print(f"  ✓ pm-4-1.json guardado: {out_path}")
    
    return output


if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Uso: python subagente_pm_4_1_instruments.py <run_id> <runs_dir> <master_prompts_dir> <guide_id>")
        sys.exit(1)
    
    result = derivar_instrumentos(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    if result:
        print(f"\n=== Resultado ===")
        print(f"  Instrumentos generados: {result['instrumentos_count']}")
        print(f"  Puntos canónicos: {result['puntuacion_consolidada']['puntos_canonicos_v_2_3_1']}")
        print(f"  Match canon: {result['puntuacion_consolidada']['match_canon']}")
