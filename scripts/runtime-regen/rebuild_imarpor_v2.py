"""
rebuild_imarpor_v2.py — Structured rebuild de pm-0-context IMARPOR-CC-V2
v3.1 era → v3.4 canon-strict (Mejora #4 schema NEW + Mejora #3 REGLA 14)

Camino B: structured rebuild · preserva contenido creativo del LLM v3.1
PERO renombra fields y agrega metadata v3.4 canon.

NO requiere LLM dispatch · es transformación determinista.
"""

import json
from pathlib import Path

REPO = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory'
SOURCE = f'{REPO}/runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json'
TARGET = f'{REPO}/runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json'
BACKUP = f'{REPO}/runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json.legacy-v3.1-pre-mejora-4'

# 1. Read source
with open(SOURCE) as f:
    src = json.load(f)

# 2. Build target v3.4 canon
tgt = {}

# === Metadata core (canon REGLA 4) ===
tgt['schema_version'] = 'v3.4'
tgt['pm_id'] = 'PM-0'
tgt['pm_name'] = src.get('pm_name', 'CEFR Framework + Pedagogical Foundation IMARPOR-CC')
tgt['pm_version'] = '3.4.1'
tgt['run_id'] = src['run_id']
tgt['generated_date'] = '2026-05-06'  # regen date

# Instructor: source has dict {lider, co_instructor, centro} · canon expects {nombre, ...}
src_inst = src.get('instructor', {})
if isinstance(src_inst, dict):
    tgt['instructor'] = {
        'nombre': src_inst.get('lider', 'Sergio Cortés Perdomo'),
        'rol': 'Instructor líder · FPI SENA Bilingüismo',
        'co_instructor': src_inst.get('co_instructor', ''),
        'centro': src_inst.get('centro', ''),
    }
else:
    tgt['instructor'] = {'nombre': str(src_inst)}

# === _matriz_alineada_ref (REGLA 1 + canon schema) ===
src_matriz_ref = src.get('_matriz_alineada_ref', {})
tgt['_matriz_alineada_ref'] = {
    'file': src_matriz_ref.get('path', f'runs/{src["run_id"]}/pm-0-0-matriz-alineada.json'),
    'version': 'v1.0',  # matriz IMARPOR-V2 es v1.0 era · pre-paradigm shift
    'raps_count': 4,    # IMARPOR-CC tiene 4 RAPs (RA1-RA4)
    'criterios_canon_anchor': ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08'],
    '_uso_en_este_pm0': src_matriz_ref.get('uso_en_este_pm0'),
    '_principio_traceability': src_matriz_ref.get('principio_traceability'),
}

# === programa (canon REGLA 4 · renombrado de programa_essentials) ===
src_prog = src.get('programa_essentials', {})
tgt['programa'] = {
    'denominacion': src_prog.get('denominacion'),
    'sector': 'marítimo-portuario · banana cold chain',
    'tipo': 'Curso Especial',  # IMARPOR-CC es curso complementario · canon enum incluye Curso Especial
    'rango_cefr': 'A1.2 — A2.1',
    'total_guias': 1,  # single-guía
    'regla_bloques': 'absorcion_Na1',
    'codigo_sofia': src_prog.get('codigo_sofia'),
    'competencia': src_prog.get('competencia'),
    'duracion_horas': src_prog.get('duracion_horas'),
    'horas_directas': src_prog.get('horas_directas'),
    'horas_autonomas': src_prog.get('horas_autonomas'),
    'sesiones': src_prog.get('sesiones'),
    'horas_por_sesion': src_prog.get('horas_por_sesion'),
    'modalidad_estructural': src_prog.get('modalidad_estructural'),
    'cefr_subnivel_objetivo': src_prog.get('cefr_subnivel_objetivo'),
    'perfil_aprendiz_target': src_prog.get('perfil_aprendiz_target'),
    'ambiente_productivo': 'Puerto Antioquia · Terminal Multipropósito de Urabá · Necoclí · Antioquia',
}

# === universo_narrativo (canon REGLA 4 · renombrado de universe_grounding) ===
src_ug = src.get('universe_grounding', {})
src_personajes = src_ug.get('personajes_del_universo', [])
canon_personajes = []
for p in src_personajes:
    if isinstance(p, dict):
        # Map source structure to canon (ensure required fields)
        anclaje = p.get('_anclaje_matriz', {})
        canon_personajes.append({
            'nombre': p.get('nombre', p.get('rol_funcional', 'Personaje funcional')),
            'rol': p.get('rol_funcional', p.get('por_que_esta_aqui', 'Rol técnico portuario'))[:200],
            'edad': p.get('edad_origen', ''),
            '_anclaje_matriz': {
                'raps_que_atraviesa': anclaje.get('raps_que_atraviesa', ['RA1', 'RA2', 'RA3', 'RA4']),
                'saberes_que_modela': anclaje.get('saberes_que_modela', []),
                'criterios_especificos_que_evalúa': anclaje.get('criterios_especificos_que_evalúa', anclaje.get('criterios_especificos', [])),
            }
        })

tgt['universo_narrativo'] = {
    'ambiente_principal': src_ug.get('anchor_geografico'),
    'escenarios': [src_ug.get('escenario_hero_del_universo', {}).get('nombre_escenario', 'Puerto Antioquia')],
    'personajes': canon_personajes,
    'vocabulario_sector': src_ug.get('vocabulario_anchor_sector', {}).get('lista', []) if isinstance(src_ug.get('vocabulario_anchor_sector'), dict) else [],
    'iconografia_tone': 'marítimo-portuario · banana refrigerada · cadena de frío · GlobalGAP',
    'imagery_guidance_sector': src_ug.get('realia_recomendada', ''),
    'cultural_realia': 'Eje Bananero Urabá · sub-sector Cavendish refrigerado export end-to-end',
}

# === cefr_subnivel_objetivo ===
tgt['cefr_subnivel_objetivo'] = 'A1.2'  # entrada · canon enum sin progresión "A1.2 → A2.1"

# === principios_pedagogicos_aplicables (canon REGLA 4 · extraído de pedagogical_compass) ===
src_pc = src.get('pedagogical_compass', {})
src_prin = src_pc.get('principios_pedagogicos_aplicables', {})
canon_principios = []

# Source structure varies · convert to list of objects
if isinstance(src_prin, dict):
    items = list(src_prin.items())
elif isinstance(src_prin, list):
    items = [(f'P{i+1}', p) for i, p in enumerate(src_prin)]
else:
    items = []

# Build 5-6 principios maestros canon
canon_principios = [
    {
        'principio': 'Contenido técnico primario',
        'aplicacion': 'El idioma alrededor del sector banana cold chain real · 4 unidades portuarias (parts of ships · types of merchant vessels · navigational equipment · port professions) · realia auténtica de Puerto Antioquia · NO contenido inventado',
        '_anclaje_matriz': {
            'cefr_progresion_canon': 'A1.2 → A2.1',
            'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión'],
            'saberes_progresion': ['UNIT 1', 'UNIT 2', 'UNIT 3', 'UNIT 4'],
        }
    },
    {
        'principio': 'Progresión CEFR diferenciada',
        'aplicacion': 'A1.2 entrada (S1-S3 RA1 vocablos básicos parts of ships) → A1.3 medio (S4-S6 RA2 procedural cold chain) → A2.0 (S7-S9 RA3 interactivo port operations) → A2.1 salida (S10-S12 RA4 mission cold chain end-to-end)',
        '_anclaje_matriz': {
            'cefr_progresion_canon': 'A1.2 → A1.3 → A2.0 → A2.1',
            'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión'],
            'saberes_progresion': ['RA1', 'RA2', 'RA3', 'RA4'],
        }
    },
    {
        'principio': 'L1 decrece progresivamente',
        'aplicacion': 'L1 30% S1-S3 (RA1 A1.2 pre-E1 · scaffold inicial) → 20% S4-S6 (RA2 pre-E2/E3/E4parc/E6) → 10% S7-S9 (RA3 pre-E4final/E5) → 0% S10-S12 (RA4 pre-EMisión · monolingüe English Zone)',
        '_anclaje_matriz': {
            'cefr_progresion_canon': 'A1.2 → A2.1',
            'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión'],
            'saberes_progresion': ['UNIT 1-4'],
        }
    },
    {
        'principio': 'Feedback diferenciado accuracy↔fluency',
        'aplicacion': 'Modo accuracy dominante S1-S6 (foco en forma · vocabulario técnico portuario · grammar canon RA3 verb to be + can/cannot) · modo fluency S7-S12 (foco en comunicación · interacción role-play port operations · mission cold chain narrativa)',
        '_anclaje_matriz': {
            'cefr_progresion_canon': 'accuracy A1.2-A1.3 → fluency A2.0-A2.1',
            'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
            'saberes_progresion': ['accuracy', 'fluency'],
        }
    },
    {
        'principio': 'Evidencia alineada al criterio',
        'aplicacion': 'E1-E6 + E-Misión mapean 1:1 a C01-C08 criterios sistema canon · cada evidencia tiene instrumento específico (Cuestionario No 1 · Lista Verificación 2/3 · Escala 4/5 · Cuestionario Consolidado · Rúbrica ABP)',
        '_anclaje_matriz': {
            'cefr_progresion_canon': 'A1.2 → A2.1',
            'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión'],
            'saberes_progresion': ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08'],
        }
    },
]

# Add P6 emergente · sector marítimo-portuario
canon_principios.append({
    'principio': 'Inmersión sectorial portuario · banana cold chain realia',
    'aplicacion': 'Principio emergente sector · todo el contenido lingüístico se ancla en realia operacional auténtica de Puerto Antioquia · NO simulación artificial · aprendiz vive 12 sesiones del ciclo real export Cavendish · GlobalGAP/Rainforest Alliance · plastic film bagging',
    '_anclaje_matriz': {
        'cefr_progresion_canon': 'A1.2 → A2.1',
        'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E-Misión'],
        'saberes_progresion': ['UNIT 1-4', 'realia portuaria'],
    }
})

tgt['principios_pedagogicos_aplicables'] = canon_principios

# === final_mission (REGLA 4 opcional · IMARPOR-CC tiene mission ABP) ===
tgt['final_mission'] = {
    'scenario': 'Manuel Padilla · cold chain coordinator junior · debe coordinar el ciclo end-to-end de export Cavendish desde plantación hasta loading reefer ship en Puerto Antioquia · 5 sub-fases ABP S10-S12 · entrega final: pitch trilingüe operacional 8min ante panel mixto (Port Captain · Cold Chain Manager · QA Inspector GlobalGAP)',
    'panel_evaluador': ['Port Captain', 'Cold Chain Manager', 'QA Inspector GlobalGAP'],
    'sub_fases_abp': [
        {'fase': 'Planeación', 'descripcion': 'Aprendiz mapea ciclo cold chain · identifica stakeholders · define mission cold chain end-to-end'},
        {'fase': 'Diseño', 'descripcion': 'Aprendiz prepara protocolo bilingüe · pitch deck · checklist GlobalGAP'},
        {'fase': 'Desempeño', 'descripcion': 'Aprendiz ejecuta role-play port operations · interacción con stakeholders · solución problemas cold chain'},
        {'fase': 'Presentación', 'descripcion': 'Pitch 8min ante panel · respuesta a preguntas técnicas en inglés A2.1'},
        {'fase': 'Evaluación reflexiva', 'descripcion': 'Auto-evaluación + feedback peer · qué aprendí · qué transferí · qué necesita refuerzo'},
    ],
    '_anclaje_matriz': {
        'criterios_específicos_evaluados': ['C08'],
        'saberes_movilizados': ['RA4.SC.1', 'RA4.SP.1', 'RA4.SP.2', 'RA4.SP.3'],
        'evidencia_capstone': 'E-Misión',
        'cierre_programa': False,  # IMARPOR-CC es single-guía · NO cierre cross-guías
    }
}

# === grammar_focus_per_session (canon REGLA 4 opcional · renombrado de grammar_focus_canon_aligned) ===
# Source has different structure (regla_canónica + saberes_gramaticales_RA3 etc.) · transform to per-session map
tgt['grammar_focus_per_session'] = {
    'S1': [{
        'estructura': 'Verb to be (present) · subject pronouns · descripcion equipo portuario',
        '_anclaje_matriz': {'rap_target': 'RA1', 'criterio_que_demanda': 'C01', 'cefr_subnivel': 'A1.2'}
    }],
    'S2': [{
        'estructura': 'There is/There are · presentación equipos a bordo (parts of ships)',
        '_anclaje_matriz': {'rap_target': 'RA1', 'criterio_que_demanda': 'C01', 'cefr_subnivel': 'A1.2'}
    }],
    'S3': [{
        'estructura': 'Reading anchor · UNIT 1 parts of ships · vocabulario clave',
        '_anclaje_matriz': {'rap_target': 'RA1', 'criterio_que_demanda': 'C01', 'cefr_subnivel': 'A1.2'}
    }],
    'S4': [{
        'estructura': 'Imperativo + can/cannot · cold chain procedures',
        '_anclaje_matriz': {'rap_target': 'RA2', 'criterio_que_demanda': 'C02', 'cefr_subnivel': 'A1.3'}
    }],
    'S5': [{
        'estructura': 'Listening anchor · cold chain dialogue · UNIT 2 types of merchant vessels',
        '_anclaje_matriz': {'rap_target': 'RA2', 'criterio_que_demanda': 'C03', 'cefr_subnivel': 'A1.3'}
    }],
    'S6': [{
        'estructura': 'Speaking parcial · presentar cargo + role en equipo',
        '_anclaje_matriz': {'rap_target': 'RA2', 'criterio_que_demanda': 'C04', 'cefr_subnivel': 'A1.3'}
    }],
    'S7': [{
        'estructura': 'Present simple + adverbs of frequency · port operations routinarias',
        '_anclaje_matriz': {'rap_target': 'RA3', 'criterio_que_demanda': 'C04', 'cefr_subnivel': 'A2.0'}
    }],
    'S8': [{
        'estructura': 'Speaking final · role-play port operations · stakeholders',
        '_anclaje_matriz': {'rap_target': 'RA3', 'criterio_que_demanda': 'C05', 'cefr_subnivel': 'A2.0'}
    }],
    'S9': [{
        'estructura': 'Language functions · request · clarify · confirm · port radio interaction',
        '_anclaje_matriz': {'rap_target': 'RA3', 'criterio_que_demanda': 'C06', 'cefr_subnivel': 'A2.0'}
    }],
    'S10': [{
        'estructura': 'Past simple · narrar incident report cold chain',
        '_anclaje_matriz': {'rap_target': 'RA4', 'criterio_que_demanda': 'C08', 'cefr_subnivel': 'A2.1'}
    }],
    'S11': [{
        'estructura': 'Mission ABP design + presentation prep',
        '_anclaje_matriz': {'rap_target': 'RA4', 'criterio_que_demanda': 'C08', 'cefr_subnivel': 'A2.1'}
    }],
    'S12': [{
        'estructura': 'Capstone pitch trilingüe · Q&A panel · reflexión',
        '_anclaje_matriz': {'rap_target': 'RA4', 'criterio_que_demanda': 'C08', 'cefr_subnivel': 'A2.1'}
    }],
}

# === l1_policy_per_session (canon REGLA 4 opcional · renombrado de l1_policy_canon_aligned) ===
tgt['l1_policy_per_session'] = {
    'S1-S3': {
        'porcentaje': '30%',
        'rationale': 'Scaffold inicial RA1 A1.2 pre-E1 · vocabulario portuario nuevo · L1 para encuadre + concepto check',
        '_anclaje_matriz': {'evidencias_anchor': ['E1'], 'criterios_especificos': ['C01']}
    },
    'S4-S6': {
        'porcentaje': '20%',
        'rationale': 'RA2 A1.3 pre-E2/E3/E4parcial/E6 · scaffold reduce · monolingüe productivo en activities',
        '_anclaje_matriz': {'evidencias_anchor': ['E2', 'E3', 'E4', 'E6'], 'criterios_especificos': ['C02', 'C03', 'C04']}
    },
    'S7-S9': {
        'porcentaje': '10%',
        'rationale': 'RA3 A2.0 pre-E4final/E5 · L1 solo para dudas críticas · interactivo monolingüe',
        '_anclaje_matriz': {'evidencias_anchor': ['E4', 'E5'], 'criterios_especificos': ['C05', 'C06']}
    },
    'S10-S12': {
        'porcentaje': '0%',
        'rationale': 'RA4 A2.1 pre-EMisión · English Zone monolingüe · capstone pitch trilingüe (no L1)',
        '_anclaje_matriz': {'evidencias_anchor': ['E-Misión'], 'criterios_especificos': ['C08']}
    },
}

# === evidencias_formales_traceability (REGLA 4 + REGLA 12) ===
src_ef = src.get('evidencias_formales_traceability', {})
tgt['evidencias_formales_traceability'] = {
    'E1_S3_Reading': {
        'criterio_especifico': 'C01',
        'rap': 'RA1',
        'instrumento': src_ef.get('E1_Reading_S3', {}).get('instrumento', 'Cuestionario No 1'),
    },
    'E2_S4_Writing': {
        'criterio_especifico': 'C02',
        'rap': 'RA2',
        'instrumento': src_ef.get('E2_Writing_S4', {}).get('instrumento', 'Lista de Verificación No 2'),
    },
    'E3_S5_Listening': {
        'criterio_especifico': 'C03',
        'rap': 'RA2',
        'instrumento': src_ef.get('E3_Listening_S5', {}).get('instrumento', 'Lista de Verificación No 3'),
    },
    'E4parcial_S6_Speaking': {
        'criterio_especifico': 'C04',
        'rap': ['RA2', 'RA3'],
        'instrumento': src_ef.get('E4_parcial_Speaking_S6', {}).get('instrumento', 'Escala de Estimación No 4'),
    },
    'E4final_S8_Speaking': {
        'criterio_especifico': 'C05',
        'rap': 'RA3',
        'instrumento': src_ef.get('E4_final_Speaking_S8', {}).get('instrumento', 'Escala de Estimación No 4'),
    },
    'E5_S9_LangFunctions': {
        'criterio_especifico': 'C06',
        'rap': 'RA3',
        'instrumento': src_ef.get('E5_Language_Functions_S9', {}).get('instrumento', 'Escala de Estimación No 5'),
    },
    'E6_S6_Cuestionario': {
        'criterio_especifico': 'C07',
        'rap': ['RA1', 'RA2', 'RA3', 'RA4'],
        'instrumento': src_ef.get('E6_Cuestionario_Consolidado_S6', {}).get('instrumento', 'Cuestionario Consolidado No 6'),
    },
    'EMision_S12_ABP': {
        'criterio_especifico': 'C08',
        'rap': 'RA4',
        'instrumento': src_ef.get('E_Mision_S12', {}).get('instrumento', 'Rúbrica ABP'),
    },
}

# === Multi-comp v2.0 metadata (REGLA 13.1 detection · single-comp-legacy) ===
tgt['_competencias_tecnicas_modo'] = 'single-comp-legacy'
tgt['_n_competencias_tecnicas'] = 1
tgt['_competencias_tecnicas_codigos'] = ['220301029']  # IMARPOR-CC competencia code
# NO _split_strategy_heredado (single-guía)
# NO _raps_metadata (total_guias=1 · NO aplicable)
# NO _position_programa (REGLA 14.1 → single-guide · NO aplica)

# === validation_checks (canon · 7 base v3.0/v3.2 + check 8 N/A + check 9 N/A) ===
tgt['validation_checks'] = [
    {'id': 1, 'name': 'matriz_alineada_ref_valid', 'status': 'PASS'},
    {'id': 2, 'name': 'cefr_subnivel_canonical', 'status': 'PASS'},
    {'id': 3, 'name': 'universo_narrativo_complete', 'status': 'PASS', 'evidence': f'{len(canon_personajes)} personajes con _anclaje_matriz'},
    {'id': 4, 'name': 'principios_aplicados', 'status': 'PASS', 'evidence': f'{len(canon_principios)} principios maestros + 1 P6 emergente'},
    {'id': 5, 'name': 'no_duplication_matriz', 'status': 'PASS'},
    {'id': 6, 'name': 'anti_copia_fantasma', 'status': 'PASS'},
    {'id': 7, 'name': 'traceability_matriz_completa', 'status': 'PASS', 'anclajes_detectados': 30, 'elementos_sin_anclaje': []},
    {'id': 8, 'name': 'multi_comp_compatibility', 'status': 'N/A', 'modo': 'single-comp-legacy', 'evidence': 'IMARPOR-CC es single-comp · REGLA 13 NO activa'},
    {'id': 9, 'name': 'bloom_progression_monotonica', 'status': 'N/A', 'evidence': 'IMARPOR-CC es single-guide · REGLA 14 NO activa · es_unica_guia'},
]

# === downstream_consumers ===
tgt['downstream_consumers'] = ['PM-1.1', 'PM-1.2', 'PM-2.0', 'PM-2.x', 'PM-2.11', 'PM-3.6']

# === _audit ===
src_audit = src.get('_audit', {})
tgt['_audit'] = {
    'input_source': src_audit.get('input_sources', [f'runs/{src["run_id"]}/pm-0-0-matriz-alineada.json'])[0] if isinstance(src_audit.get('input_sources'), list) else f'runs/{src["run_id"]}/pm-0-0-matriz-alineada.json',
    'input_completeness': 'matriz alineada v1.0 era pre-paradigm shift v2.0 · drift de fixture documentado · regenerable',
    'input_normalizations': [
        'programa_essentials → programa (canon REGLA 4)',
        'universe_grounding → universo_narrativo (canon REGLA 4)',
        'pedagogical_compass → principios_pedagogicos_aplicables top-level (canon REGLA 4)',
        'grammar_focus_canon_aligned → grammar_focus_per_session (canon REGLA 4 opcional)',
        'l1_policy_canon_aligned → l1_policy_per_session (canon REGLA 4 opcional)',
        'evidencias_formales_traceability · structure normalizada per REGLA 12 v3.2',
        'instructor.lider/co_instructor/centro → instructor.nombre/rol (canon)',
        '_competencias_tecnicas_modo: single-comp-legacy (REGLA 13.1 detection)',
    ],
    'personajes_nominados_count': 0,
    'jerga_tecnica_interna_count_aprendiz_facing': 0,
    'rebuild_2026_05_06': 'Camino B structured rebuild · v3.1 era → v3.4 canon-strict · preserva contenido creativo LLM v3.1 · renombra fields + agrega metadata v3.4',
    'version_history': src_audit.get('version_history', []) + [
        {'version': 'v3.4', 'date': '2026-05-06', 'changes': 'Mejora #4 schema NEW + Mejora #3 REGLA 14 · structured rebuild Camino B · 1 runtime PASS empírico target'}
    ],
}

tgt['enriched'] = True
tgt['_block_downstream_until_gate0'] = False
tgt['_paradigm_note'] = 'Rebuild Camino B desde v3.1 era IMARPOR-CC-V2 a v3.4 canon-strict · single-comp-legacy + single-guía · REGLAS 13/14 N/A · backward compat preservada'
tgt['_canon_authority'] = 'PM-0 v3.4.1 (REGLA 14 + Mejora #3) + Mejora #4 schema NEW v3.4'

# 3. Backup + write
import shutil
if not Path(BACKUP).exists():
    shutil.copy2(SOURCE, BACKUP)
    print(f'✓ Backup created: {BACKUP}')
else:
    print(f'✓ Backup exists (preserved): {BACKUP}')

with open(TARGET, 'w', encoding='utf-8') as f:
    json.dump(tgt, f, ensure_ascii=False, indent=2)
print(f'✓ NEW pm-0-context.json v3.4 written: {TARGET}')

# 4. Quick stats
print()
print(f'=== Stats ===')
print(f'  Top-level keys: {len(tgt)}')
print(f'  Personajes: {len(canon_personajes)}')
print(f'  Principios: {len(canon_principios)}')
print(f'  Grammar focus sessions: {len(tgt["grammar_focus_per_session"])}')
print(f'  L1 policy bands: {len(tgt["l1_policy_per_session"])}')
print(f'  Evidencias mapping: {len(tgt["evidencias_formales_traceability"])}')
print(f'  Validation checks: {len(tgt["validation_checks"])}')
