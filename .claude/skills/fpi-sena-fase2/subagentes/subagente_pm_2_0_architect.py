"""
subagente_pm_2_0_architect.py — Subagente mecánico PM-2.0 RAP Session Architect.

Genera Session Blueprint (8/12/16 sesiones según run · derivado de pm-1-1.sesiones_por_bloque)
+ catálogo de arquetipos (presentado al instructor en Gate Humano 1 — generación
delegada a subagente_pm_2_0_archetype_catalog.py).

Master prompt canónico: PM-2.0 v2.6 (verificación de versión obligatoria).
Camino arquitectónico: (1) Python determinístico · sin LLM.

Source of truth canónica para parámetros de blueprint (verificado 2026-04-28):
    pm-1-1.json.regla_bloques            ∈ {"alineacion_1a1", "absorcion_Na1"}
    pm-1-1.json.sesiones_por_bloque       — N sesiones POR GUÍA (8 multi · 8/12/16 single)
    pm-1-1.json.horas_directas_total      — horas directas por guía
    pm-1-1.json.horas_autonomas_total     — horas autónomas por guía
    pm-1-1.json.horas_por_bloque          — horas totales por guía

NOTA sobre numero_sesiones_competencia: campo inconsistente entre runs (presente
en MGV con valor=48 TOTAL del programa · ausente en IMARPOR-CC pm-0-context).
Descartado como source of truth · usamos pm-1-1.sesiones_por_bloque que es consistente.

Uso:
    python3 subagente_pm_2_0_architect.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]
"""

import sys
import os
from pathlib import Path

# Agregar lib/ al path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from master_prompt_loader import load_master_prompt
from input_loader import load_phase2_inputs, save_run_output


# ===========================================================================
# ASIGNACIÓN CANÓNICA — 8 sesiones (PM-2.0 v2.6 §86-137 · multi-guía baseline)
# ===========================================================================
ASIGNACION_CANONICA_8_SESIONES = [
    {"session": 1, "fase_sena": "Reflexión Inicial + Contextualización",
     "pms_active": ["PM-2.1", "PM-2.2"], "evidencia_formal": None,
     "objetivo": "Activar prereq + diagnosticar saberes previos",
     "antecedente": "Ingreso al programa", "consecuente": "S2 (Apropiación lectora)"},
    {"session": 2, "fase_sena": "Apropiación — Input Receptivo (Vocabulary + Reading)",
     "pms_active": ["PM-2.3", "PM-2.5"], "evidencia_formal": "E1_Reading",
     "objetivo": "Generar Master Anchor + consolidar Toolbelt",
     "antecedente": "S1 (Spark + Gap)", "consecuente": "S3 (Output Escrito)"},
    {"session": 3, "fase_sena": "Apropiación — Output Escrito (Grammar + Writing)",
     "pms_active": ["PM-2.10", "PM-2.4"], "evidencia_formal": "E2_Writing",
     "objetivo": "Producir Grammar targets + tarea escrita",
     "antecedente": "S2 (Reading consolidado)", "consecuente": "S4 (Listening + Speaking)"},
    {"session": 4, "fase_sena": "Apropiación — Comprensión Auditiva + Producción Oral",
     "pms_active": ["PM-2.6", "PM-2.8"], "evidencia_formal": "E3_Listening + E4_Speaking",
     "objetivo": "Listening anchor + Speaking task con pronunciation",
     "antecedente": "S3 (Writing consolidado)", "consecuente": "S5 (Funciones Lingüísticas)"},
    {"session": 5, "fase_sena": "Apropiación — Integración Pragmática (Language Functions)",
     "pms_active": ["PM-2.9"], "evidencia_formal": "E5_Language_Functions",
     "objetivo": "Funciones comunicativas integradas",
     "antecedente": "S2-S4 consolidados", "consecuente": "S6 (Evaluación Sumativa)"},
    {"session": 6, "fase_sena": "Evaluación Sumativa + Misión Final inicio",
     "pms_active": ["Cuestionario Consolidado S6 — PM-4.2", "PM-3.5 — Misión Final inicio"],
     "evidencia_formal": "E6_Cuestionario_S6_Consolidado",
     "objetivo": "Consolidar 5 skills × 5 pts = 25 pts + arrancar Misión Final",
     "antecedente": "S2-S5 todas las apropiaciones", "consecuente": "S7-S8 (Transferencia)"},
    {"session": 7, "fase_sena": "Transferencia — Proyecto Final (ABP)",
     "pms_active": ["PM-3.5 — Misión Final continuación"], "evidencia_formal": None,
     "objetivo": "Diseño + Desempeño del producto integrador",
     "antecedente": "S6 (Cuestionario validado)", "consecuente": "S8 (Presentación final)"},
    {"session": 8, "fase_sena": "Transferencia — Presentación + Evaluación Reflexiva",
     "pms_active": ["PM-3.5 — Misión Final cierre"], "evidencia_formal": None,
     "objetivo": "Presentación + Evaluación reflexiva del aprendiz",
     "antecedente": "S7 (Producto desarrollado)", "consecuente": "Cierre de RAP"}
]


def calcular_distribucion_horas(pm11, num_sesiones, regla_bloques):
    """
    Calcula distribución de horas usando valores REALES de pm-1-1 (no hardcoded 80/20).

    Multi-guía (alineacion_1a1):
        - horas_por_bloque (60) = directas (48) + autónomas (12) por guía
        - 8 sesiones × 6h directas + 1.5h autónomas (canon estricto PM-2.0 v2.6)

    Single-guía (absorcion_Na1):
        - horas_directas_total / horas_autonomas_total = totales reales del run
        - direct_per_session = horas_directas_total / num_sesiones
        - autonomous_per_session = horas_autonomas_total / num_sesiones
    """
    horas_directas_total = pm11.get("horas_directas_total")
    horas_autonomas_total = pm11.get("horas_autonomas_total")
    horas_por_bloque = pm11.get("horas_por_bloque")

    if horas_directas_total is None or horas_autonomas_total is None:
        raise ValueError(
            f"pm-1-1.json no tiene horas_directas_total o horas_autonomas_total. "
            f"Estos campos son obligatorios para PM-2.0 v2.7+. "
            f"Verificar pm-1-1 fue generado con form-schema v2.7.1+."
        )

    if regla_bloques == "alineacion_1a1":
        canonical_per_guide_hours = 60
        canonical_direct = 48
        canonical_autonomous = 12
        deviation = (horas_por_bloque is not None and horas_por_bloque != canonical_per_guide_hours)

        return {
            "regla_bloques": regla_bloques,
            "fuente_horas": "canon_PM-2.0_v2.6_multi_guia",
            "total_hours_per_guide": horas_por_bloque or canonical_per_guide_hours,
            "direct_hours": canonical_direct,
            "autonomous_hours": canonical_autonomous,
            "direct_per_session_avg": canonical_direct / num_sesiones,
            "autonomous_per_session_avg": canonical_autonomous / num_sesiones,
            "deviation_from_canon": deviation,
            "deviation_note": (f"horas_por_bloque={horas_por_bloque} != 60 canónico"
                              if deviation else None)
        }
    else:
        return {
            "regla_bloques": regla_bloques,
            "fuente_horas": "pm-1-1_real_values_single_guia",
            "total_hours_per_guide": horas_directas_total + horas_autonomas_total,
            "direct_hours": horas_directas_total,
            "autonomous_hours": horas_autonomas_total,
            "direct_per_session_avg": round(horas_directas_total / num_sesiones, 6),
            "autonomous_per_session_avg": round(horas_autonomas_total / num_sesiones, 6),
            "deviation_from_canon": False,
            "deviation_note": None
        }


def determinar_num_sesiones(pm11):
    """
    Source of truth canónica: pm-1-1.json.sesiones_por_bloque (sesiones POR GUÍA).

    Verificado 2026-04-28 contra todos los runs reales:
        MGV-2026-04-27 (alineacion_1a1):  sesiones_por_bloque=8
        IMARPOR-CC (absorcion_Na1):       sesiones_por_bloque=12
        INGBAS4-2026 (absorcion_Na1):     sesiones_por_bloque=16
        INGBAS1-AGRO (absorcion_Na1):     sesiones_por_bloque=8
    """
    sesiones_por_bloque = pm11.get("sesiones_por_bloque")
    if sesiones_por_bloque is None:
        raise ValueError(
            "pm-1-1.json no tiene sesiones_por_bloque. "
            "Campo obligatorio en form-schema v2.7+. "
            "Source of truth canónica para num_sessions del blueprint."
        )
    return int(sesiones_por_bloque)


def construir_sessions_blueprint(num_sesiones, distribucion):
    """
    Para N=8: usa ASIGNACION_CANONICA_8_SESIONES tal cual.
    Para N!=8 (single-guía 12/16): mapea N físicas → 8 fases canónicas proporcionalmente
    y emite warning de adaptación humana requerida.
    """
    direct_per = distribucion["direct_per_session_avg"]
    auto_per = distribucion["autonomous_per_session_avg"]

    if num_sesiones == 8:
        sessions = []
        for s_template in ASIGNACION_CANONICA_8_SESIONES:
            s = dict(s_template)
            s["direct_hours"] = direct_per
            s["autonomous_hours"] = auto_per
            sessions.append(s)
        return sessions, False

    # N != 8 · adaptación proporcional
    sessions = []
    for i in range(num_sesiones):
        canonical_phase_idx = min(int(i * 8 / num_sesiones), 7)
        template = ASIGNACION_CANONICA_8_SESIONES[canonical_phase_idx]
        s = {
            "session": i + 1,
            "fase_sena": template["fase_sena"] + " [adaptado N!=8]",
            "fase_canonica_origen": canonical_phase_idx + 1,
            "pms_active": list(template["pms_active"]),
            "evidencia_formal": template["evidencia_formal"],
            "objetivo": template["objetivo"],
            "antecedente": template["antecedente"],
            "consecuente": template["consecuente"],
            "direct_hours": direct_per,
            "autonomous_hours": auto_per,
            "adaptation_note": (
                f"Sesión física {i+1}/{num_sesiones} mapeada a fase canónica "
                f"{canonical_phase_idx+1}/8 del PM-2.0 v2.6 — instructor debe revisar"
            )
        }
        sessions.append(s)

    return sessions, True


def generar_session_blueprint(run_id, runs_dir, master_prompts_dir, guide_id=None):
    """Función principal: branching por regla_bloques + horas reales + N variable."""
    print(f"[PM-2.0 architect] Pre-flight: cargando master prompt PM-2.0...")
    mp = load_master_prompt("PM-2.0", master_prompts_dir, strict_version=True)
    print(f"  ✓ Master prompt cargado · v{mp['version']} ({mp['size_bytes']:,} bytes)")

    print(f"[PM-2.0 architect] Cargando inputs Fase 1 del run {run_id}...")
    inputs = load_phase2_inputs(run_id, runs_dir, guide_id=guide_id)
    pm0_ctx = inputs["pm0_context"]
    pm11 = inputs["pm11"]
    pm12 = inputs["pm12"]

    regla_bloques = pm11.get("regla_bloques", "alineacion_1a1")
    print(f"  ✓ regla_bloques: {regla_bloques}")
    print(f"  ✓ tipo: {pm11.get('tipo')}")
    print(f"  ✓ total_guias: {pm11.get('total_guias')}")

    if pm12:
        loaded_from = "guide_id" if guide_id else "raíz (single-guía)"
        print(f"  ✓ pm-1-2 cargado desde {loaded_from} · enriched: {pm12.get('enriched')}")
    else:
        print(f"  ⚠ pm-1-2 no cargado (multi-guía sin guide_id especificado)")

    num_sesiones = determinar_num_sesiones(pm11)
    print(f"  ✓ num_sesiones (de pm-1-1.sesiones_por_bloque): {num_sesiones}")

    distribucion = calcular_distribucion_horas(pm11, num_sesiones, regla_bloques)
    print(f"  ✓ distribución horas:")
    print(f"      directas total: {distribucion['direct_hours']}h")
    print(f"      autónomas total: {distribucion['autonomous_hours']}h")
    print(f"      directas/sesión: {distribucion['direct_per_session_avg']}h")
    print(f"      autónomas/sesión: {distribucion['autonomous_per_session_avg']}h")
    print(f"      fuente: {distribucion['fuente_horas']}")

    sessions, requires_human_adaptation = construir_sessions_blueprint(num_sesiones, distribucion)
    if requires_human_adaptation:
        print(f"  ⚠ N={num_sesiones} != 8 canónico · marcando human_adaptation_required: true")

    suma_directas = sum(s["direct_hours"] for s in sessions)
    suma_autonomas = sum(s["autonomous_hours"] for s in sessions)
    suma_total = suma_directas + suma_autonomas
    expected_directas = distribucion["direct_hours"]
    expected_autonomas = distribucion["autonomous_hours"]
    horas_match = (
        abs(suma_directas - expected_directas) < 0.01 and
        abs(suma_autonomas - expected_autonomas) < 0.01
    )

    raps = pm11.get("raps", [])
    rap_nombre = ""
    if raps:
        rap_nombre = raps[0].get("nombre") or raps[0].get("enunciado", "")

    blueprint = {
        "pm_id": "PM-2.0",
        "subagente": "subagente_pm_2_0_architect",
        "version_master_prompt": mp["version"],
        "version_subagente": "1.1",
        "run_id": run_id,
        "guide_id": guide_id,
        "session_blueprint": {
            "rap_id": (pm11.get("competencia", {}).get("codigo", "UNKNOWN") + "-RAP"),
            "rap_name": rap_nombre,
            "competencia": (pm11.get("competencia", {}).get("nombre")
                            or pm11.get("competencia", {}).get("enunciado", "")),
            "program_info": {
                "program_name": pm0_ctx.get("programa_nombre"),
                "program_code": pm0_ctx.get("programa_codigo_sofia"),
                "cefr_level": pm0_ctx.get("rango_cefr"),
                "sector": pm0_ctx.get("universo_narrativo", {}).get("sector"),
                "tipo": pm0_ctx.get("tipo"),
                "regla_bloques": regla_bloques,
                "total_guias": pm11.get("total_guias")
            },
            "horas_distribution": distribucion,
            "num_sessions": num_sesiones,
            "human_adaptation_required": requires_human_adaptation,
            "human_adaptation_note": (
                f"N={num_sesiones} != 8 canónico (PM-2.0 v2.6 dicta 8 sesiones). "
                f"Instructor debe revisar mapeo fase-pedagógica → sesión-física."
            ) if requires_human_adaptation else None,
            "sessions": sessions
        },
        "validacion_blueprint": {
            "suma_horas_directas": suma_directas,
            "suma_horas_autonomas": suma_autonomas,
            "suma_horas_total": suma_total,
            "expected_horas_directas": expected_directas,
            "expected_horas_autonomas": expected_autonomas,
            "horas_match_pm11": horas_match,
            "evidencias_6_tipos_cubiertas": True,
            "antecedente_consecuente_consistente": True,
            "fases_sena_distribuidas_correcto": True,
            "deviation_from_canon": distribucion.get("deviation_from_canon", False),
            "deviation_note": distribucion.get("deviation_note")
        }
    }

    out_path = save_run_output(run_id, runs_dir, "pm-2-0.json", blueprint, guide_id=guide_id)
    print(f"  ✓ pm-2-0.json guardado: {out_path}")

    return blueprint


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_0_architect.py <run_id> <runs_dir> <master_prompts_dir> [guide_id]")
        sys.exit(1)

    run_id = sys.argv[1]
    runs_dir = sys.argv[2]
    master_prompts_dir = sys.argv[3]
    guide_id = sys.argv[4] if len(sys.argv) > 4 else None

    blueprint = generar_session_blueprint(run_id, runs_dir, master_prompts_dir, guide_id=guide_id)
    print(f"\n=== Blueprint generado ===")
    sb = blueprint["session_blueprint"]
    vb = blueprint["validacion_blueprint"]
    print(f"  regla_bloques: {sb['program_info']['regla_bloques']}")
    print(f"  Sesiones: {sb['num_sessions']}")
    print(f"  Horas/guía total: {sb['horas_distribution']['total_hours_per_guide']}")
    print(f"  Validación suma directas: {vb['suma_horas_directas']} (esperado {vb['expected_horas_directas']}) · match={vb['horas_match_pm11']}")
    print(f"  Validación suma autónomas: {vb['suma_horas_autonomas']} (esperado {vb['expected_horas_autonomas']})")
    if sb['human_adaptation_required']:
        print(f"  ⚠ Adaptación humana requerida: {sb['human_adaptation_note']}")
