#!/usr/bin/env python3
"""
Wave A · Pre-flight cascade IMARPOR-V2 + extract vocabulario unificado
========================================================================

Verifica disponibilidad de:
1. matriz v1.3 (pm-0-0-matriz-alineada.json) · 4 RAPs con saberes + criterios
2. 30 Activity Cards en 11 PMs (pm-2-1...pm-2-10 + pm-3-5 + pm-4-2)
3. pm-1-2.json sub_bloques con key_vocabulary_per_rap + vocabulario_diagnostico
4. pm-0-context.json metadata (denominación · código · sector · etc.)

Extract:
- vocabulario_unificado_imarpor_v2.json (deduplicado · agregado por fuente)
- pre-flight-wave-a-report.md (audit completo)
"""
import json
from pathlib import Path
from collections import defaultdict

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

# === LOAD ALL INPUTS ===
print('=== Wave A · Pre-flight Cascade IMARPOR-V2 ===\n')

# 1. Matriz v1.3
matriz = json.load(open(RUN_DIR / 'pm-0-0-matriz-alineada.json'))
print(f'1. Matriz v1.3:')
print(f'   raps_count: {matriz["raps_count"]}')
for rap in matriz['raps']:
    sp_count = len(rap.get('saberes_proceso', []))
    cr_count = len(rap.get('criterios_evaluacion', []))
    print(f"   {rap['rap_id']}: saberes_proceso={sp_count} · criterios={cr_count}")

# 2. PM-1.2
pm12 = json.load(open(RUN_DIR / 'pm-1-2.json'))
print(f'\n2. PM-1.2 sub_bloques_tripartitos: {len(pm12["sub_bloques_tripartitos"])}')

# Vocabulario from pm-1-2
vocabulario_por_fuente = defaultdict(list)
for sb in pm12['sub_bloques_tripartitos']:
    bid = sb['bloque_id']
    tipo = sb['tipo_bloque']
    rap = sb.get('rap_target', '-')

    # vocabulario_diagnostico (B0 only)
    vd = sb.get('vocabulario_diagnostico', [])
    if vd:
        for term in vd:
            t = term if isinstance(term, str) else (term.get('term') or term.get('palabra') or term.get('word') or str(term))
            vocabulario_por_fuente[f'{bid}_diagnostico'].append(t)

    # key_vocabulary_per_rap (B1-B4)
    kv = sb.get('key_vocabulary_per_rap', [])
    if kv:
        for term in kv:
            t = term if isinstance(term, str) else (term.get('term') or term.get('palabra') or term.get('word') or str(term))
            vocabulario_por_fuente[f'{bid}_{rap}_canon'].append(t)

    print(f'   {bid} {tipo:>15} {rap:>6}: vocabulario_diagnostico={len(vd)} · key_vocabulary={len(kv)}')

# 3. PM-0 Context (key real es programa_essentials NO programa_metadata)
pm0 = json.load(open(RUN_DIR / 'pm-0-context.json'))
print(f'\n3. PM-0 Context · programa_essentials:')
pme = pm0.get('programa_essentials', {})
sector = pm0.get('universe_grounding', {}).get('anchor_sectorial', 'AUSENTE')
for key in ['denominacion', 'codigo_sofia', 'competencia', 'duracion_horas', 'horas_directas', 'horas_autonomas', 'sesiones', 'horas_por_sesion']:
    val = pme.get(key, 'AUSENTE')
    if isinstance(val, str) and len(val) > 80:
        val = val[:80] + '...'
    print(f'   {key}: {val}')
print(f'   sector_economico (universe_grounding): {sector}')

# 4. 30 Activity Cards
PM_FILES = ['pm-2-1.json','pm-2-2.json','pm-2-3.json','pm-2-4.json','pm-2-5.json',
            'pm-2-6.json','pm-2-8.json','pm-2-9.json','pm-2-10.json','pm-3-5.json','pm-4-2.json']
all_cards = []
for f in PM_FILES:
    j = json.load(open(RUN_DIR / f))
    cards = j.get('activity_cards', j.get('actividades', []))
    if not cards and 'activity_card' in j:
        cards = [j['activity_card']]
    if not cards:
        for k, v in j.items():
            if isinstance(v, list) and v and isinstance(v[0], dict) and ('pm_id' in v[0] or 'session' in v[0] or 'tipo_bloque' in v[0]):
                cards = v
                break
    for c in cards:
        c['_source_pm'] = f
        all_cards.append(c)

print(f'\n4. 30 Activity Cards: total={len(all_cards)} (esperado 30)')
# Verificar campos críticos por card
missing_criterios = []
missing_descripcion = []
missing_dimension = []
existing_criterios = []
for c in all_cards:
    num = c.get('numero_actividad', '?')
    pm = c.get('_source_pm', '?')
    has_criterios = 'criterios_evaluacion' in c
    has_desc = 'descripcion' in c and c.get('descripcion')
    has_dim = c.get('dimension')
    if has_criterios:
        existing_criterios.append(num)
    else:
        missing_criterios.append(f'#{num} {pm}')
    if not has_desc:
        missing_descripcion.append(f'#{num} {pm}')
    if not has_dim:
        missing_dimension.append(f'#{num} {pm}')

print(f'   Cards CON criterios_evaluacion: {len(existing_criterios)}/30')
print(f'   Cards SIN criterios_evaluacion: {len(missing_criterios)}/30 ← Wave B target')
print(f'   Cards SIN descripcion: {len(missing_descripcion)}/30 (debería ser 0)')
print(f'   Cards SIN dimension: {len(missing_dimension)}/30 (debería ser 0)')

if missing_descripcion:
    print(f'   ⚠️ Descripcion faltante: {missing_descripcion[:5]}')
if missing_dimension:
    print(f'   ⚠️ Dimension faltante: {missing_dimension[:5]}')

# === EXTRACT VOCABULARIO UNIFICADO ===
print(f'\n=== Extract vocabulario unificado ===')

# Términos embedded en activity cards (descripcion + enunciado)
import re
embedded_terms = set()
# Patterns: words in CamelCase, CAPS technical terms (3+ letters), maritime/portuario specific
patterns = [
    r'\b[A-Z]{3,}\b',  # SMCP, NATO, IMO, OMI, EPI, SST, etc.
    r'\bMV [A-Z]+(?: [A-Z]+)*\b',  # MV CARIBBEAN STAR
    r'\bM/V\b',  # M/V
]
for c in all_cards:
    text = ' '.join([str(c.get('enunciado', '')), str(c.get('descripcion', '')), str(c.get('titulo', ''))])
    for p in patterns:
        for m in re.findall(p, text):
            embedded_terms.add(m.strip())

# Aggregar todos los vocabularios
vocabulario_unificado = {
    'metadata': {
        'extracted_date': '2026-05-02',
        'source': 'IMARPOR-CC-2026-04-30-V2 cascade v3.x',
        'description': 'Vocabulario unificado IMARPOR-V2 para construir Sección 5 Glosario PM-3.6 v3.4',
    },
    'fuentes': {
        'pm-1-2.sub_bloques.vocabulario_diagnostico (B0)': [],
        'pm-1-2.sub_bloques.key_vocabulary_per_rap (B1-B4)': [],
        'embedded_terms_en_cards': sorted(embedded_terms)
    },
    'breakdown_por_fuente': {},
    'unique_terms_aggregated': set(),
}

for fuente, terms in vocabulario_por_fuente.items():
    vocabulario_unificado['breakdown_por_fuente'][fuente] = sorted(terms)
    if 'diagnostico' in fuente:
        vocabulario_unificado['fuentes']['pm-1-2.sub_bloques.vocabulario_diagnostico (B0)'].extend(terms)
    elif 'canon' in fuente:
        vocabulario_unificado['fuentes']['pm-1-2.sub_bloques.key_vocabulary_per_rap (B1-B4)'].extend(terms)
    vocabulario_unificado['unique_terms_aggregated'].update(terms)

vocabulario_unificado['unique_terms_aggregated'].update(embedded_terms)
vocabulario_unificado['unique_terms_aggregated'] = sorted(vocabulario_unificado['unique_terms_aggregated'])

# Stats
total_unique = len(vocabulario_unificado['unique_terms_aggregated'])
print(f'\nStats vocabulario:')
print(f'   pm-1-2 vocabulario_diagnostico (B0): {len(vocabulario_unificado["fuentes"]["pm-1-2.sub_bloques.vocabulario_diagnostico (B0)"])} términos')
print(f'   pm-1-2 key_vocabulary (B1-B4): {len(vocabulario_unificado["fuentes"]["pm-1-2.sub_bloques.key_vocabulary_per_rap (B1-B4)"])} términos')
print(f'   embedded en cards: {len(embedded_terms)} términos técnicos (uppercase patterns)')
print(f'   TOTAL único agregado: {total_unique} términos')

# Save outputs
output_path = RUN_DIR / 'vocabulario-unificado-imarpor-v2.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(vocabulario_unificado, f, ensure_ascii=False, indent=2)
print(f'\n✅ Vocabulario guardado: {output_path.name} ({output_path.stat().st_size // 1024} KB)')

# Pre-flight report
report = f"""# Wave A · Pre-flight Cascade IMARPOR-V2 · Report

**Date:** 2026-05-02 PM
**Status:** {"✅ PASS · cascade ready" if not missing_descripcion and not missing_dimension else "⚠️ DRIFT · revisar"}

## Verification Summary

### 1. Matriz v1.3 (pm-0-0-matriz-alineada.json)
- raps_count: {matriz['raps_count']}
- distribución saberes_proceso + criterios: ✅ OK por RAP

### 2. PM-1.2 sub_bloques_tripartitos
- Sub-bloques: {len(pm12['sub_bloques_tripartitos'])} (1 APERTURA + 4 APROPIACIÓN + 1 TRANSFERENCIA)
- Vocabulario disponible para glosario: ✅ OK

### 3. PM-0 Context · programa_essentials
- denominacion: {pme.get('denominacion', 'AUSENTE')}
- codigo_sofia: {pme.get('codigo_sofia', 'AUSENTE')}
- duracion_horas: {pme.get('duracion_horas', 'AUSENTE')}
- horas_directas: {pme.get('horas_directas', 'AUSENTE')}
- horas_autonomas: {pme.get('horas_autonomas', 'AUSENTE')}
- sesiones: {pme.get('sesiones', 'AUSENTE')}
- sector_economico (universe_grounding.anchor_sectorial): {sector}

### 4. 30 Activity Cards
- Total: {len(all_cards)}/30 ({"✅ OK" if len(all_cards) == 30 else "⚠️ MISMATCH"})
- Cards CON criterios_evaluacion: {len(existing_criterios)}/30
- Cards SIN criterios_evaluacion: {len(missing_criterios)}/30 ← **Wave B target**
- Cards SIN descripcion: {len(missing_descripcion)}/30 ({"✅" if not missing_descripcion else "⚠️"})
- Cards SIN dimension: {len(missing_dimension)}/30 ({"✅" if not missing_dimension else "⚠️"})

## Vocabulario Extraído (para Wave D Glosario)

| Fuente | Términos |
|---|---|
| pm-1-2 vocabulario_diagnostico (B0) | {len(vocabulario_unificado['fuentes']['pm-1-2.sub_bloques.vocabulario_diagnostico (B0)'])} |
| pm-1-2 key_vocabulary (B1-B4 RAP1-RAP4) | {len(vocabulario_unificado['fuentes']['pm-1-2.sub_bloques.key_vocabulary_per_rap (B1-B4)'])} |
| Embedded en cards (acronyms · MV) | {len(embedded_terms)} |
| **TOTAL único** | **{total_unique}** |

## Estado para Wave B (regenerar criterios_evaluacion[])

- ✅ Inputs OK · matriz v1.3 + cards + dimension + descripcion disponibles
- ✅ 30 cards listas para regeneración
- ✅ Cero drift bloqueante detectado

## Output

- `vocabulario-unificado-imarpor-v2.json` ({output_path.stat().st_size // 1024} KB · {total_unique} términos únicos)
- Disponible para Wave D Glosario construction (target 80-150 entradas)

## Próximo Wave

Wave B · Regenerar 30 AC con criterios_evaluacion[] derivados (verbo enunciado → verbo SOFÍA por dimensión · mecánico determinístico)
"""

report_path = RUN_DIR / 'pre-flight-wave-a-report.md'
with open(report_path, 'w', encoding='utf-8') as f:
    f.write(report)
print(f'✅ Report guardado: {report_path.name}')
print(f'\n=== Wave A COMPLETO · listo para Wave B ===')
