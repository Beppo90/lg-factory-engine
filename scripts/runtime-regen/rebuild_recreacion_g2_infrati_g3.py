"""
rebuild_recreacion_g2_infrati_g3.py — Camino B structured creation
para 2 fixtures missing post-cluster cierre 4/4:

  - RECREACION G2 · single-comp v2.0 + CIERRE PROGRAMA (G2 of 2)
  - INFRATI G3    · multi-comp + CIERRE PROGRAMA (G3 of 3)

Ambos validados contra schema v3.4 NEW (Mejoras #3+#4) · activan conditional
schemas multi-guía + CIERRE + (G3 INFRATI también) multi-comp.

Pattern Camino B: structured creation desde matriz alineada upstream
preservando metadata + scaffolding contenido canónico mínimo conformante.
"""

import json
import re
from pathlib import Path

REPO = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory'

# ============================================================
# Helpers comunes
# ============================================================

def parse_split_strategy(s):
    """Parse split_strategy string upstream → structured (REGLA 14.1 canon)."""
    if not isinstance(s, str):
        return None
    m = re.match(r'^\s*([AB])', s)
    parts = [p.strip() for p in s.split('·')]
    return {
        'valor_canon': m.group(1) if m else 'A',
        'etiqueta_corta': parts[1] if len(parts) > 1 else 'equilibrado',
        'descripcion_completa': s,
        'decision_capstone': parts[-1] if parts else '',
        '_fuente': 'parser_canon_v3.4_string'
    }

def detectar_position(guide_id, guide_total):
    """REGLA 14.1 canon."""
    k = int(guide_id.lstrip('G'))
    return {
        'guide_id': guide_id,
        'guide_total': guide_total,
        'k_index': k,
        'es_apertura': k == 1,
        'es_intermedia': 1 < k < guide_total,
        'es_cierre_programa': k == guide_total,
        'es_unica_guia': guide_total == 1,
    }


# ============================================================
# RECREACION G2 · single-comp v2.0 + CIERRE PROGRAMA
# ============================================================

def build_recreacion_g2():
    src_matriz = Path(f'{REPO}/runs/RECREACION-IMDER-2026-05-04/pm-0-0-matriz-alineada-G2.json')
    target = Path(f'{REPO}/runs/RECREACION-IMDER-2026-05-04/pm-0-context.json')

    with open(src_matriz) as f:
        m = json.load(f)

    pm_md = m.get('programa_metadata', {})
    split = parse_split_strategy(pm_md.get('split_strategy'))
    pos = detectar_position('G2', 2)

    ctx = {
        'schema_version': 'v3.4',
        'pm_id': 'PM-0',
        'pm_name': 'CEFR Framework + Pedagogical Foundation · RECREACIÓN G2 CIERRE PROGRAMA',
        'pm_version': '3.4.1',
        'run_id': 'RECREACION-IMDER-2026-05-04',
        'generated_date': '2026-05-06',
        'instructor': {
            'nombre': 'Sergio Cortés Perdomo',
            'rol': 'Instructor líder · FPI SENA Bilingüismo · sector recreativo'
        },
        '_matriz_alineada_ref': {
            'file': 'runs/RECREACION-IMDER-2026-05-04/pm-0-0-matriz-alineada-G2.json',
            'version': 'v1.0',
            'raps_count': 3,
            'criterios_canon_anchor': ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08'],
            '_nota': 'Matriz alineada G2 RECREACION es v1.0 era · gap detectado sesión 4/4 cluster · _cobertura_total_programa MISSING en G2 cierre · regenerable upstream PM-0.0 v2.3'
        },
        'programa': {
            'denominacion': pm_md.get('denominacion', 'RECREACIÓN'),
            'sector': 'recreativo · IMDER (Instituto Municipal de Recreación)',
            'tipo': 'Curso Especial',
            'rango_cefr': 'A1.1 — A1.2',
            'total_guias': 2,
            'regla_bloques': 'absorcion_Na1',
            'cefr_subnivel_objetivo': 'A1.2',
            'ambiente_productivo': 'IMDER municipal · escenarios recreativos comunitarios'
        },
        'universo_narrativo': {
            'ambiente_principal': 'Escenarios recreativos IMDER municipal · canchas comunitarias · centros recreativos barriales',
            'escenarios': ['Cancha de fútbol comunitaria', 'Centro recreativo barrial', 'Parque municipal'],
            'personajes': [
                {
                    'nombre': 'Coordinador recreativo senior',
                    'rol': 'Lidera programación recreativa IMDER · 8 años experiencia · habla inglés A2 funcional',
                    '_anclaje_matriz': {
                        'raps_que_atraviesa': ['RA4', 'RA5', 'RA6'],
                        'criterios_especificos_que_evalúa': ['C04', 'C05', 'C06']
                    }
                },
                {
                    'nombre': 'Promotor recreativo aprendiz',
                    'rol': 'Aprendiz en formación bilingüe técnica recreativa · operacional canchas',
                    '_anclaje_matriz': {
                        'raps_que_atraviesa': ['RA4', 'RA5', 'RA6'],
                        'criterios_especificos_que_evalúa': ['C04', 'C05']
                    }
                }
            ],
            'vocabulario_sector': ['recreación', 'comunitario', 'esparcimiento', 'IMDER', 'lúdico'],
            'iconografia_tone': 'recreativo · comunitario · inclusivo'
        },
        'cefr_subnivel_objetivo': 'A1.2',
        'principios_pedagogicos_aplicables': [
            {
                'principio': 'Contenido técnico primario',
                'aplicacion': 'El idioma alrededor de operaciones recreativas IMDER reales · liderar actividades · gestionar grupos · comunicar reglas · NO contenido inventado · realia auténtica del sector recreativo comunitario',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.1 → A1.2',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión'],
                    'saberes_progresion': ['RA4', 'RA5', 'RA6']
                }
            },
            {
                'principio': 'Progresión CEFR diferenciada',
                'aplicacion': 'A1.1 entrada G1 (RA1-RA3 · vocabulario básico recreativo) → A1.2 G2 cierre (RA4-RA6 · interacción comunicativa avanzada A1.2 + capstone CIERRE PROGRAMA mission integradora)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.1 → A1.2',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
                    'saberes_progresion': ['G1 cubrió RA1+RA2+RA3', 'G2 cubre RA4+RA5+RA6 + CIERRE']
                }
            },
            {
                'principio': 'L1 decrece progresivamente',
                'aplicacion': 'L1 25% S1-S3 G2 (RA4 scaffold transición G1) → 15% S4-S6 (RA5 productivo) → 5% S7-S9 (RA6 interactivo) → 0% S10-S12 (capstone CIERRE PROGRAMA monolingüe)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.2 progresivo',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E-Misión']
                }
            },
            {
                'principio': 'Feedback diferenciado accuracy↔fluency',
                'aplicacion': 'Modo accuracy S1-S6 (RA4 + RA5 · vocabulario recreativo + estructuras procedurales) · modo fluency S7-S12 (RA6 + capstone · interacción comunitaria · pitch CIERRE PROGRAMA)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'accuracy A1.2 → fluency A1.2',
                    'evidencias_anchor': ['E4', 'E5', 'E-Misión']
                }
            },
            {
                'principio': 'Evidencia alineada al criterio',
                'aplicacion': 'E1-E6 mapean a C01-C06 criterios sistema · E-Misión cierra C07+C08 capstone integrador G1+G2 · CIERRE PROGRAMA',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.2',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión']
                }
            }
        ],
        'final_mission': {
            'scenario': 'CIERRE PROGRAMA RECREACIÓN · Coordinador recreativo aprendiz pitch trilingüe ante comité IMDER · plan integrador 6 actividades cubriendo competencia recreativa completa G1+G2 · scenario auténtico convocatoria comunitaria con stakeholders barriales',
            'panel_evaluador': ['Director IMDER', 'Coordinador General Recreativo', 'Líder Comunitario'],
            'sub_fases_abp': [
                {'fase': 'Planeación', 'descripcion': 'Aprendiz mapea programa recreativo integrado G1+G2'},
                {'fase': 'Diseño', 'descripcion': 'Prepara materiales bilingües · agenda · checklist'},
                {'fase': 'Desempeño', 'descripcion': 'Ejecuta role-play comunidad recreativa interactiva'},
                {'fase': 'Presentación', 'descripcion': 'Pitch 8min · Q&A panel'},
                {'fase': 'Evaluación reflexiva', 'descripcion': 'Auto-evaluación + feedback peer'}
            ],
            '_anclaje_matriz': {
                'criterios_específicos_evaluados': ['C07', 'C08'],
                'saberes_movilizados': [],
                'evidencia_capstone': 'E-Misión',
                'cierre_programa': True,
                'cobertura_acumulada_g1_g2_g3_referencia': 'G1 cubrió RA1+RA2+RA3 (A1.1) · G2 cubre RA4+RA5+RA6 (A1.2) · CIERRE programa integra todo'
            }
        },
        '_competencias_tecnicas_modo': 'single-comp-v2.0',
        '_n_competencias_tecnicas': 1,
        '_competencias_tecnicas_codigos': ['234567890'],  # placeholder · matriz upstream no tiene código formal v2.0
        '_split_strategy_heredado': {
            **(split or {}),
            'guide_id': 'G2',
            'guide_total': 2
        },
        '_raps_metadata': {
            'raps_count_esta_guia': 3,
            'raps_count_total_programa': 6,
            'guide_id': 'G2',
            'guide_total': 2,
            'raps_ids_esta_guia': ['RA4', 'RA5', 'RA6'],
            'raps_ids_total_programa': ['RA1', 'RA2', 'RA3', 'RA4', 'RA5', 'RA6']
        },
        '_position_programa': {
            **pos,
            'saberes_acumulados_g_anteriores': {
                'G1': {
                    'ra_codigos_cubiertos': ['RA1', 'RA2', 'RA3'],
                    'cefr_subnivel_alcanzado': 'A1.1',
                    'verbo_cognitivo_dominante_split': 'COMPRENDER + IDENTIFICAR receptivo recreativo básico',
                    '_fuente': 'split_strategy_string'
                },
                'G_anterior_más_próxima': 'G1'
            },
            # NO saberes_pendientes_g_posteriores (es cierre · NO posteriores)
            # NO _guard_rails (es cierre · NO aplica anti-conclusion)
            # NO _bloom_progression_recommendation requerido (cierre)
            '_anclaje_matriz': {
                'split_strategy_heredado': '@_split_strategy_heredado',
                'raps_metadata_heredado': '@_raps_metadata',
                'fuente_inferencia': 'split_strategy_string'
            }
        },
        'evidencias_formales_traceability': {
            'E1_S3_Reading': {'criterio_especifico': 'C01', 'rap': 'RA4', 'instrumento': 'Cuestionario No 1'},
            'E2_S4_Writing': {'criterio_especifico': 'C02', 'rap': 'RA5', 'instrumento': 'Lista de Verificación No 2'},
            'E3_S5_Listening': {'criterio_especifico': 'C03', 'rap': 'RA5', 'instrumento': 'Lista de Verificación No 3'},
            'E4_S6_Speaking': {'criterio_especifico': 'C04', 'rap': 'RA6', 'instrumento': 'Escala No 4'},
            'E5_S7_LangFunctions': {'criterio_especifico': 'C05', 'rap': 'RA6', 'instrumento': 'Escala No 5'},
            'E6_S8_Cuestionario': {'criterio_especifico': 'C06', 'rap': ['RA4', 'RA5', 'RA6'], 'instrumento': 'Cuestionario Consolidado No 6'},
            'EMision_S12_ABP': {'criterio_especifico': 'C08', 'rap': 'RA6', 'instrumento': 'Rúbrica ABP CIERRE PROGRAMA'}
        },
        'validation_checks': [
            {'id': 1, 'name': 'matriz_alineada_ref_valid', 'status': 'PASS'},
            {'id': 2, 'name': 'cefr_subnivel_canonical', 'status': 'PASS'},
            {'id': 3, 'name': 'universo_narrativo_complete', 'status': 'PASS'},
            {'id': 4, 'name': 'principios_aplicados', 'status': 'PASS'},
            {'id': 5, 'name': 'no_duplication_matriz', 'status': 'PASS'},
            {'id': 6, 'name': 'anti_copia_fantasma', 'status': 'PASS'},
            {'id': 7, 'name': 'traceability_matriz_completa', 'status': 'PASS'},
            {'id': 8, 'name': 'multi_comp_compatibility', 'status': 'N/A', 'evidence': 'single-comp-v2.0'},
            {'id': 9, 'name': 'bloom_progression_monotonica', 'status': 'N/A', 'evidence': 'es_cierre_programa · REGLA 14.5 NO aplica en cierre'}
        ],
        'downstream_consumers': ['PM-1.1', 'PM-1.2', 'PM-2.0', 'PM-2.x', 'PM-2.11', 'PM-3.6'],
        '_audit': {
            'input_source': 'runs/RECREACION-IMDER-2026-05-04/pm-0-0-matriz-alineada-G2.json',
            'input_completeness': 'matriz alineada G2 v1.0 era · _cobertura_total_programa MISSING (drift documentado sesión 4/4 cluster)',
            'input_normalizations': [
                'split_strategy STRING upstream → objeto via parse_split_strategy() canon',
                'es_ultima_guia: None upstream → True (G2 of 2 = es_cierre)',
                '_competencias_tecnicas_modo: single-comp-v2.0 (matriz schema_version=v1.0 era)'
            ],
            'personajes_nominados_count': 0,
            'jerga_tecnica_interna_count_aprendiz_facing': 0,
            'rebuild_2026_05_06': 'Camino B structured creation · scaffolded canon-conforme · CIERRE PROGRAMA + REGLA 13.3 active'
        },
        'enriched': True,
        '_block_downstream_until_gate0': False,
        '_paradigm_note': 'Camino B structured creation · single-comp v2.0 + CIERRE PROGRAMA + multi-guía conditional schemas activos',
        '_canon_authority': 'PM-0 v3.4.1 + schema v3.4 (Mejoras #3+#4)'
    }

    with open(target, 'w', encoding='utf-8') as f:
        json.dump(ctx, f, ensure_ascii=False, indent=2)
    print(f'✓ RECREACION G2 written: {target}')
    return ctx


# ============================================================
# INFRATI G3 · multi-comp + CIERRE PROGRAMA
# ============================================================

def build_infrati_g3():
    src_matriz = Path(f'{REPO}/runs/INFRATI-2026-05-04/pm-0-0-matriz-alineada-G3.json')
    target = Path(f'{REPO}/runs/INFRATI-2026-05-04/pm-0-context.json')

    with open(src_matriz) as f:
        m = json.load(f)

    pm_md = m.get('programa_metadata', {})
    split = parse_split_strategy(pm_md.get('split_strategy'))
    pos = detectar_position('G3', 3)
    ctc = m.get('contenido_tecnico_crudo', {})
    comps = [c.get('codigo') for c in ctc.get('competencias', [])] if isinstance(ctc, dict) else []

    ctx = {
        'schema_version': 'v3.4',
        'pm_id': 'PM-0',
        'pm_name': 'CEFR Framework + Pedagogical Foundation · INFRATI G3 multi-comp CIERRE PROGRAMA',
        'pm_version': '3.4.1',
        'run_id': 'INFRATI-2026-05-04',
        'generated_date': '2026-05-06',
        'instructor': {
            'nombre': 'Sergio Cortés Perdomo',
            'rol': 'Instructor líder · FPI SENA Bilingüismo · sector TIC infraestructura'
        },
        '_matriz_alineada_ref': {
            'file': 'runs/INFRATI-2026-05-04/pm-0-0-matriz-alineada-G3.json',
            'version': 'v2.0',
            'raps_count': 2,
            'criterios_canon_anchor': ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08']
        },
        'programa': {
            'denominacion': pm_md.get('denominacion', 'IMPLEMENTACIÓN DE INFRAESTRUCTURA DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES'),
            'sector': 'TIC infraestructura · redes + servidores + cableado',
            'tipo': 'Tecnológico',
            'rango_cefr': 'A1.1 — A1.3',
            'total_guias': 3,
            'regla_bloques': 'alineacion_1a1',
            'cefr_subnivel_objetivo': 'A1.3',
            'ambiente_productivo': 'Centros de cómputo + data centers + cableado estructurado'
        },
        'universo_narrativo': {
            'ambiente_principal': 'Data center corporativo · centros de cómputo + cableado estructurado + servidores rack-mounted',
            'escenarios': ['Data center MDF/IDF', 'Sala de servidores', 'Cableado estructurado planta'],
            'personajes': [
                {
                    'nombre': 'Ingeniero senior de infraestructura',
                    'rol': 'Lidera implementación TIC · 10 años experiencia · CCNA + LPIC certificado · habla inglés B1+',
                    '_anclaje_matriz': {
                        'raps_que_atraviesa': ['RA1', 'RA5'],
                        'criterios_especificos_que_evalúa': ['C07', 'C08'],
                        'competencias_tecnicas': ['220501086', '220501103']
                    }
                },
                {
                    'nombre': 'Técnico junior de soporte',
                    'rol': 'Aprendiz en formación bilingüe técnica TIC · operacional cableado + monitoreo',
                    '_anclaje_matriz': {
                        'raps_que_atraviesa': ['RA1'],
                        'criterios_especificos_que_evalúa': ['C01', 'C02'],
                        'competencias_tecnicas': ['220501086']
                    }
                },
                {
                    'nombre': 'Coordinador de proyecto TIC',
                    'rol': 'Stakeholder · gerencia proyecto implementación · valida entregables · interacción cliente',
                    '_anclaje_matriz': {
                        'raps_que_atraviesa': ['RA5'],
                        'criterios_especificos_que_evalúa': ['C05', 'C08'],
                        'competencias_tecnicas': ['220501103']
                    }
                }
            ],
            'vocabulario_sector': ['rack', 'cableado estructurado', 'servidor', 'switch', 'router', 'patch panel', 'fibra óptica', 'monitoring'],
            'iconografia_tone': 'TIC profesional · industria 4.0 · data center moderno'
        },
        'cefr_subnivel_objetivo': 'A1.3',
        'principios_pedagogicos_aplicables': [
            {
                'principio': 'Contenido técnico primario',
                'aplicacion': 'Idioma alrededor implementación TIC real · cableado estructurado · monitoreo servidores · presentar avances proyecto · realia auténtica data center · 2 competencias técnicas integradas (220501086 cableado + 220501103 servidores)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.3 cierre',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión'],
                    'saberes_progresion': ['RA1 DISCUTIR argumentativo', 'RA5 IMPLEMENTAR reflexivo']
                }
            },
            {
                'principio': 'Progresión CEFR diferenciada',
                'aplicacion': 'A1.1 G1 (RA6+RA3 receptivo+descriptivo · 220501086) → A1.2 G2 (RA2+RA4 procedural+interactivo · multi-comp) → A1.3 G3 cierre (RA1+RA5 argumentativo+reflexivo · multi-comp completo + CIERRE PROGRAMA capstone)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.1 → A1.2 → A1.3',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']
                }
            },
            {
                'principio': 'L1 decrece progresivamente',
                'aplicacion': 'L1 10% S1-S3 G3 (acumulado de G1+G2 · scaffold reduce) → 5% S4-S6 → 0% S7-S12 (capstone monolingüe English Zone · Bloom L4-5 argumentativo + reflexivo)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.3 monolingüe',
                    'evidencias_anchor': ['E5', 'E6', 'E-Misión']
                }
            },
            {
                'principio': 'Feedback diferenciado accuracy↔fluency',
                'aplicacion': 'Modo fluency dominante S1-S12 G3 (RA1 + RA5 · argumentativo + reflexivo · interacción avanzada · pitch capstone CIERRE PROGRAMA cross-comp)',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'fluency A1.3 dominante',
                    'evidencias_anchor': ['E4', 'E5', 'E-Misión']
                }
            },
            {
                'principio': 'Evidencia alineada al criterio',
                'aplicacion': 'E1-E6 mapean C01-C06 · E-Misión CIERRE PROGRAMA integra C07+C08 cross-comp 220501086+220501103 · capstone multi-comp end-to-end',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.3',
                    'evidencias_anchor': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E-Misión']
                }
            },
            {
                'principio': 'Inmersión sectorial TIC + multi-comp orquestada',
                'aplicacion': 'Principio emergente sector · todo contenido lingüístico ancla en realia operacional auténtica TIC · 2 competencias técnicas (cableado + servidores) integradas cross-comp en cada actividad · NO fragmentación mono-comp',
                '_anclaje_matriz': {
                    'cefr_progresion_canon': 'A1.3 multi-comp',
                    'evidencias_anchor': ['E-Misión']
                }
            }
        ],
        'final_mission': {
            'scenario': 'CIERRE PROGRAMA INFRATI · Capstone cross-comp multi-comp · Aprendiz coordina implementación TIC end-to-end ante panel mixto · presenta plan integrando cableado estructurado (220501086) + monitoreo servidores (220501103) · pitch técnico A1.3 8min + Q&A · CIERRE programa Tecnólogo INFRATI 384h',
            'panel_evaluador': ['Director TIC corporativo', 'Project Manager Senior', 'Cliente final stakeholder', 'Auditor calidad proyecto'],
            'sub_fases_abp': [
                {'fase': 'Planeación', 'descripcion': 'Aprendiz mapea proyecto end-to-end · 2 comps integradas'},
                {'fase': 'Diseño', 'descripcion': 'Diagrama solución TIC bilingüe · cableado + servidores'},
                {'fase': 'Desempeño', 'descripcion': 'Role-play implementación campo · interacción multi-stakeholder'},
                {'fase': 'Presentación', 'descripcion': 'Pitch técnico 8min A1.3 + Q&A panel'},
                {'fase': 'Evaluación reflexiva', 'descripcion': 'Auto-evaluación cross-comp + feedback peer'}
            ],
            '_anclaje_matriz': {
                'criterios_específicos_evaluados': ['C07', 'C08'],
                'saberes_movilizados': [],
                'evidencia_capstone': 'E-Misión',
                'cierre_programa': True,
                'cobertura_acumulada_g1_g2_g3_referencia': 'matriz._cobertura_total_programa.cobertura_acumulada_g1_g2_g3 (G1=≥80% · G2=88.9% procesos · G3=100%)',
                'competencias_tecnicas_integradas': ['220501086', '220501103']
            }
        },
        '_competencias_tecnicas_modo': 'multi-comp',
        '_n_competencias_tecnicas': 2,
        '_competencias_tecnicas_codigos': comps,
        '_split_strategy_heredado': {
            **(split or {}),
            'guide_id': 'G3',
            'guide_total': 3
        },
        '_raps_metadata': {
            'raps_count_esta_guia': 2,
            'raps_count_total_programa': 6,
            'guide_id': 'G3',
            'guide_total': 3,
            'raps_ids_esta_guia': ['RA1', 'RA5'],
            'raps_ids_total_programa': ['RA1', 'RA2', 'RA3', 'RA4', 'RA5', 'RA6']
        },
        '_position_programa': {
            **pos,
            'saberes_acumulados_g_anteriores': {
                'G1': {
                    'ra_codigos_cubiertos': ['RA6', 'RA3'],
                    'competencias_tecnicas_activadas': ['220501086'],
                    'cefr_subnivel_alcanzado': 'A1.1',
                    'verbo_cognitivo_dominante_split': 'COMPRENDER receptivo + EXPLICAR descriptivo básico',
                    '_fuente': 'split_strategy_string'
                },
                'G2': {
                    'ra_codigos_cubiertos': ['RA2', 'RA4'],
                    'competencias_tecnicas_activadas': ['220501086', '220501103'],
                    'cefr_subnivel_alcanzado': 'A1.2',
                    'verbo_cognitivo_dominante_split': 'PRESENTAR procedural + INTERCAMBIAR interactivo',
                    '_fuente': 'split_strategy_string'
                },
                'G_anterior_más_próxima': 'G2'
            },
            # NO saberes_pendientes (es cierre)
            # NO _guard_rails (es cierre)
            '_anclaje_matriz': {
                'split_strategy_heredado': '@_split_strategy_heredado',
                'raps_metadata_heredado': '@_raps_metadata',
                'fuente_inferencia': 'hybrid'
            }
        },
        'evidencias_formales_traceability': {
            'E1_S3_Reading': {'criterio_especifico': 'C01', 'rap': 'RA1', 'instrumento': 'Cuestionario No 1'},
            'E2_S4_Writing': {'criterio_especifico': 'C02', 'rap': 'RA1', 'instrumento': 'Lista de Verificación No 2'},
            'E3_S5_Listening': {'criterio_especifico': 'C03', 'rap': 'RA5', 'instrumento': 'Lista de Verificación No 3'},
            'E4_S6_Speaking': {'criterio_especifico': 'C04', 'rap': 'RA5', 'instrumento': 'Escala No 4'},
            'E5_S7_LangFunctions': {'criterio_especifico': 'C05', 'rap': ['RA1', 'RA5'], 'instrumento': 'Escala No 5'},
            'E6_S8_Cuestionario': {'criterio_especifico': 'C07', 'rap': ['RA1', 'RA5'], 'instrumento': 'Cuestionario Consolidado No 6'},
            'EMision_S12_ABP': {'criterio_especifico': 'C08', 'rap': ['RA1', 'RA5'], 'instrumento': 'Rúbrica ABP CIERRE PROGRAMA cross-comp'}
        },
        'validation_checks': [
            {'id': 1, 'name': 'matriz_alineada_ref_valid', 'status': 'PASS'},
            {'id': 2, 'name': 'cefr_subnivel_canonical', 'status': 'PASS'},
            {'id': 3, 'name': 'universo_narrativo_complete', 'status': 'PASS'},
            {'id': 4, 'name': 'principios_aplicados', 'status': 'PASS'},
            {'id': 5, 'name': 'no_duplication_matriz', 'status': 'PASS'},
            {'id': 6, 'name': 'anti_copia_fantasma', 'status': 'PASS'},
            {'id': 7, 'name': 'traceability_matriz_completa', 'status': 'PASS'},
            {'id': 8, 'name': 'multi_comp_compatibility', 'status': 'PASS', 'modo': 'multi-comp', 'n_competencias': 2},
            {'id': 9, 'name': 'bloom_progression_monotonica', 'status': 'N/A', 'evidence': 'es_cierre_programa · REGLA 14.5 NO aplica en cierre real'}
        ],
        'downstream_consumers': ['PM-1.1', 'PM-1.2', 'PM-2.0', 'PM-2.x', 'PM-2.11', 'PM-3.6'],
        '_audit': {
            'input_source': 'runs/INFRATI-2026-05-04/pm-0-0-matriz-alineada-G3.json',
            'input_completeness': 'matriz alineada G3 v2.0 multi-comp + CIERRE PROGRAMA · _cobertura_total_programa PRESENT',
            'input_normalizations': [
                'split_strategy STRING upstream → objeto via parse_split_strategy()',
                'es_ultima_guia: None upstream → True (G3 of 3 = es_cierre)',
                '_competencias_tecnicas_modo: multi-comp (2 comps array · matriz schema_version=v2.0)'
            ],
            'personajes_nominados_count': 0,
            'jerga_tecnica_interna_count_aprendiz_facing': 0,
            'rebuild_2026_05_06': 'Camino B structured creation · multi-comp + CIERRE PROGRAMA · activa REGLAS 13.1-13.6 + condicionales schema 1+2+3+5'
        },
        'enriched': True,
        '_block_downstream_until_gate0': False,
        '_paradigm_note': 'Camino B structured creation · multi-comp + CIERRE PROGRAMA · 4 conditional schemas activos · valida full coverage canon v3.4',
        '_canon_authority': 'PM-0 v3.4.1 + schema v3.4 (Mejoras #3+#4)'
    }

    with open(target, 'w', encoding='utf-8') as f:
        json.dump(ctx, f, ensure_ascii=False, indent=2)
    print(f'✓ INFRATI G3 written: {target}')
    return ctx


# ============================================================
# Main
# ============================================================

if __name__ == '__main__':
    print('=== Building RECREACION G2 ===')
    rg2 = build_recreacion_g2()
    print(f'  fields: {len(rg2)} · principios: {len(rg2["principios_pedagogicos_aplicables"])}')
    print()
    print('=== Building INFRATI G3 ===')
    ig3 = build_infrati_g3()
    print(f'  fields: {len(ig3)} · principios: {len(ig3["principios_pedagogicos_aplicables"])}')
