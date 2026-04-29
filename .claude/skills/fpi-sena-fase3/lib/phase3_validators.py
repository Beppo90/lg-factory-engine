"""
phase3_validators.py — 8 checks bloqueantes + 2 warnings · Fase 3 pedagogical fidelity.

Per PLAN-FASE-3-ARQUITECTURA.md v1.1 §8 (canon canonizado v1.0.1 hotfix · refinado v1.1).

Análogo a validation_helpers.py de Fase 2 (16 checks PM-2.11) · pero acotado a Fase 3:
- 8 checks bloqueantes (FAIL bloquea Hito-Fase3-4 cierre)
- 2 warnings (FAIL no bloquea · solo nota)

Llamados por subagente_pm_3_assembler.py (futuro · análogo a pm_2_11_row_assembler) o
directamente por el orquestador post-Hito-Fase3-4 antes de Gate 4.

⚠ STUB Hito 1 Task 6 · 2026-04-29
Implementación específica de cada check emerge cuando construyo subagentes Hito 2-4
y descubro shape real de pm-3-1 + pm-3-2-sX + pm-3-5 + pm-3-6 (REGLA 20-shape · grep
antes de asumir paths).
"""

from pathlib import Path
from typing import Optional


# === Checks BLOQUEANTES (8 · per PLAN v1.1 §8) ===

def check_3_1_playbook_timing_sum_horas(pm_3_1_path: str, pm_2_0_path: str) -> dict:
    """Check 3.1 · Playbook timing suma horas == pm-2-0.session_blueprint suma.
    
    BLOQUEANTE. La suma de horas en pm-3-1.json (Playbook Outline timing) debe coincidir
    con la suma del Session Blueprint canonizado en Fase 2.
    """
    return _stub_check("Check 3.1", "Playbook timing suma horas", bloqueante=True)


def check_3_2_build_outs_teacher_talk_bilingue(pm_3_2_paths: list) -> dict:
    """Check 3.2 · Cada Build-Out tiene Teacher Talk bilingüe (EN primary + ES cursive support).
    
    BLOQUEANTE. Los 8 pm-3-2-sX.json deben emitir Teacher Talk con anatomía bilingüe canon.
    """
    return _stub_check("Check 3.2", "Build-Outs Teacher Talk bilingüe", bloqueante=True)


def check_3_3_workbook_chapters_count(pm_3_4_path: str, pm_2_0_path: str) -> dict:
    """Check 3.3 · Workbook chapters count == sessions con autonomous_hours > 0.
    
    BLOQUEANTE. El número de capítulos del Workbook debe corresponder con las sesiones
    presenciales que asignan trabajo autónomo (default 7 para 8 sesiones · gap F PLAN v1.1).
    """
    return _stub_check("Check 3.3", "Workbook chapters count", bloqueante=True)


def check_3_4_final_mission_integrates_e1_e5(pm_3_5_path: str) -> dict:
    """Check 3.4 · Final Mission integra E1-E5 explícitamente en sub-fases ABP.
    
    BLOQUEANTE. La Misión Final canon v2.6 debe declarar explícitamente cómo cada sub-fase
    ABP (5 sub-fases) consolida una de las 5 evidencias formales E1-E5.
    """
    return _stub_check("Check 3.4", "Final Mission integra E1-E5", bloqueante=True)


def check_3_5_gfpi_f135_schema_v2_6_5(pm_3_6_path: str) -> dict:
    """Check 3.5 · GFPI-F-135 schema v2.6.5 conforme + 2ª persona narrativa.
    
    BLOQUEANTE. El pm-3-6.json debe conformar al schema canónico v2.6.5 (per PM-3.6 master
    prompt frontmatter · ver runs/MGV-2026-04-20/pm-3-6.json como ground truth).
    """
    return _stub_check("Check 3.5", "GFPI-F-135 schema v2.6.5", bloqueante=True)


def check_3_6_anti_copia_fantasma_cross_program(pm_3_paths: list, ref_run_dirs: list) -> dict:
    """Check 3.6 · Anti-copia-fantasma cross-program (docx hash distinct + heurísticas texto).
    
    BLOQUEANTE. Extensión de CHECK 9 anti-copia-fantasma (DM v2.4+) a documentos docx
    Fase 3. SHA hash debe diferir vs runs anteriores · heurísticas texto cross-program
    (no copiar narrativa MGV en run DIESEL · etc.).
    """
    return _stub_check("Check 3.6", "Anti-copia-fantasma cross-program docx", bloqueante=True)


def check_3_7_activity_footer_propagation_bidirectional(pm_2_X_paths: list, pm_3_2_paths: list) -> dict:
    """Check 3.7 · Activity_footer propagation Fase 2 ↔ PM-3.2 consistente.
    
    BLOQUEANTE. Canon MGV: activity_footer fluye bidireccional Fase 2 (pm-2-X.json) ↔
    PM-3.2 build-out. Si propagación se rompe, los Activity Cards Fase 2 quedan
    desincronizados con Build-Outs Fase 3.
    """
    return _stub_check("Check 3.7", "Activity_footer propagation bidirectional", bloqueante=True)


def check_3_8_canva_spec_sin_hardcoding(pm_3_3_spec_path: str, pm_3_3_pptx_path: str) -> dict:
    """Check 3.8 · Canva spec sin hardcoding de contenido (canon v2.4).
    
    BLOQUEANTE. PM-3.3 master prompt v2.4 explícitamente prohíbe hardcoding · el
    pm-3-3-spec.json debe ser fuente única de verdad · el script generador renderiza
    DESDE el spec sin embebido directo.
    """
    return _stub_check("Check 3.8", "Canva spec sin hardcoding", bloqueante=True)


# === Warnings (2 · per PLAN v1.1 §8) ===

def check_3_9_bilinguismo_cursive_support_consistente(all_pm_3_paths: list) -> dict:
    """Check 3.9 · Bilingüismo cursive support consistente en todos los docx.
    
    WARNING. El soporte bilingüe (English primary + Spanish cursive support) debe ser
    consistente en todos los documentos docx Fase 3. WARNING NO bloqueante.
    """
    return _stub_check("Check 3.9", "Bilingüismo cursive support consistente", bloqueante=False)


def check_3_10_pptx_deck_slides_match_sessions(pm_3_3_pptx_path: str, pm_3_1_path: str) -> dict:
    """Check 3.10 · PPTX deck slides == sessions del Playbook.
    
    WARNING. Cantidad de slides del Canva Deck debería corresponder con las sesiones del
    Playbook (tipicamente 1-2 slides por sesión + intro + cierre). WARNING NO bloqueante.
    """
    return _stub_check("Check 3.10", "PPTX deck slides count", bloqueante=False)


# === Helper privado · stub para Hito 1 (implementación emerge Hito 2-4) ===

def _stub_check(check_id: str, name: str, bloqueante: bool) -> dict:
    """Stub temporal para Hito 1 · cada check se implementa cuando el subagente
    correspondiente exista (Hito 2-4) y conozcamos shape real del JSON a validar.
    
    REGLA 20-shape strict: NO asumir paths/keys de pm-3-X.json antes de tenerlos generados.
    """
    return {
        "check_id": check_id,
        "name": name,
        "status": "STUB_NOT_IMPLEMENTED",
        "bloqueante": bloqueante,
        "actual": None,
        "expected": None,
        "detail": f"Check {check_id} stub Hito 1 Task 6 · implementación emerge Hito 2-4 (REGLA 20-shape · grep antes de asumir)"
    }


# === API canónica para PM-3-assembler futuro ===

def ejecutar_8_bloqueantes_2_warnings(pm_3_paths: dict, pm_2_paths: dict, ref_run_dirs: list) -> dict:
    """Función principal · ejecuta los 8 checks bloqueantes + 2 warnings · retorna veredicto.
    
    Análogo a validation_helpers.ejecutar_16_checks() de Fase 2.
    
    Args:
        pm_3_paths: dict con keys pm_3_1, pm_3_2_sX (list 8), pm_3_3_spec, pm_3_3_pptx,
                    pm_3_4, pm_3_5, pm_3_6
        pm_2_paths: dict con keys pm_2_0, pm_2_X_list (list 9)
        ref_run_dirs: lista runs anteriores para CHECK 9 cross-fixture
    
    Returns:
        dict con resultados de los 10 checks + veredicto + ready_for_gate_4
    """
    checks = []
    
    # 8 bloqueantes
    checks.append(check_3_1_playbook_timing_sum_horas(pm_3_paths.get('pm_3_1'), pm_2_paths.get('pm_2_0')))
    checks.append(check_3_2_build_outs_teacher_talk_bilingue(pm_3_paths.get('pm_3_2_sX', [])))
    checks.append(check_3_3_workbook_chapters_count(pm_3_paths.get('pm_3_4'), pm_2_paths.get('pm_2_0')))
    checks.append(check_3_4_final_mission_integrates_e1_e5(pm_3_paths.get('pm_3_5')))
    checks.append(check_3_5_gfpi_f135_schema_v2_6_5(pm_3_paths.get('pm_3_6')))
    checks.append(check_3_6_anti_copia_fantasma_cross_program(list(pm_3_paths.values()), ref_run_dirs))
    checks.append(check_3_7_activity_footer_propagation_bidirectional(pm_2_paths.get('pm_2_X_list',[]), pm_3_paths.get('pm_3_2_sX',[])))
    checks.append(check_3_8_canva_spec_sin_hardcoding(pm_3_paths.get('pm_3_3_spec'), pm_3_paths.get('pm_3_3_pptx')))
    
    # 2 warnings
    checks.append(check_3_9_bilinguismo_cursive_support_consistente(list(pm_3_paths.values())))
    checks.append(check_3_10_pptx_deck_slides_match_sessions(pm_3_paths.get('pm_3_3_pptx'), pm_3_paths.get('pm_3_1')))
    
    bloqueantes_pass = sum(1 for c in checks if c['bloqueante'] and c['status'] == 'PASS')
    bloqueantes_total = sum(1 for c in checks if c['bloqueante'])
    warnings_pass = sum(1 for c in checks if not c['bloqueante'] and c['status'] == 'PASS')
    warnings_total = sum(1 for c in checks if not c['bloqueante'])
    
    return {
        "checks": checks,
        "bloqueantes": f"{bloqueantes_pass}/{bloqueantes_total}",
        "warnings": f"{warnings_pass}/{warnings_total}",
        "veredicto": f"BLOQUEANTES {bloqueantes_pass}/{bloqueantes_total} · WARNINGS {warnings_pass}/{warnings_total}",
        "ready_for_gate_4": bloqueantes_pass == bloqueantes_total
    }


if __name__ == "__main__":
    print("phase3_validators · self-test")
    result = ejecutar_8_bloqueantes_2_warnings({}, {}, [])
    print(f"  Total checks: {len(result['checks'])}")
    print(f"  Veredicto: {result['veredicto']}")
    print(f"  Ready for Gate 4: {result['ready_for_gate_4']}")
    print(f"  All STUB_NOT_IMPLEMENTED (esperado en Hito 1): {all(c['status']=='STUB_NOT_IMPLEMENTED' for c in result['checks'])}")
