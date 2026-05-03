#!/usr/bin/env python3
"""
Wave D.1 · Extract baseline glosario desde pm-1-2.json (mecánico)
====================================================================

Mecánico Python · cero invención. Extrae 95 términos canon (B0 + B1-B4)
con sus definiciones + ejemplos ya disponibles en pm-1-2 sub_bloques.

Output: glosario-baseline-imarpor-v2.json (95 entradas con 3 fields canon ya disponibles)
- english_term
- english_definition
- example_in_context (ejemplo_uso de pm-1-2)
- equivalente_espanol: PENDIENTE (Wave D.2 · LLM Agent)
- category: B0_diagnostic | B1_RA1 | B2_RA2 | B3_RA3 | B4_RA4

Wave D.2 (next) · LLM Agent agrega equivalente_espanol + procesa 61 embedded acronyms.
"""
import json
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

# === LOAD pm-1-2 ===
pm12 = json.load(open(RUN_DIR / 'pm-1-2.json'))

baseline_entries = []
seen_terms = set()

for sb in pm12['sub_bloques_tripartitos']:
    bid = sb['bloque_id']
    rap = sb.get('rap_target', '-')
    tipo = sb['tipo_bloque']

    # Determinar categoría
    if bid == 'B0':
        category = 'B0_diagnostic'
    elif bid in ['B1','B2','B3','B4']:
        category = f'{bid}_{rap}'
    else:  # BT
        category = 'BT_transferencia'

    # Vocabulario diagnostic (B0)
    vd = sb.get('vocabulario_diagnostico', [])
    for term_obj in vd:
        if isinstance(term_obj, dict):
            term = term_obj.get('termino', '').strip()
            defin = term_obj.get('definicion_l1_o_visual', '')
        else:
            term = str(term_obj).strip()
            defin = ''

        if term and term.lower() not in seen_terms:
            seen_terms.add(term.lower())
            baseline_entries.append({
                'english_term': term,
                'english_definition': defin if defin else '(definition pending)',
                'example_in_context': '(example pending · Wave D.2 LLM)',
                'equivalente_espanol': '(translation pending · Wave D.2 LLM)',
                'category': category,
                '_source': f'pm-1-2.{bid}.vocabulario_diagnostico',
                '_anclaje_matriz': term_obj.get('_anclaje_matriz', {}) if isinstance(term_obj, dict) else {},
            })

    # Key vocabulary (B1-B4)
    kv = sb.get('key_vocabulary_per_rap', [])
    for term_obj in kv:
        if isinstance(term_obj, dict):
            term = term_obj.get('termino', '').strip()
            defin = term_obj.get('definicion', '')
            ejemplo = term_obj.get('ejemplo_uso', '')
        else:
            term = str(term_obj).strip()
            defin = ''
            ejemplo = ''

        if term and term.lower() not in seen_terms:
            seen_terms.add(term.lower())
            baseline_entries.append({
                'english_term': term,
                'english_definition': defin if defin else '(definition pending)',
                'example_in_context': ejemplo if ejemplo else '(example pending · Wave D.2 LLM)',
                'equivalente_espanol': '(translation pending · Wave D.2 LLM)',
                'category': category,
                '_source': f'pm-1-2.{bid}.key_vocabulary_per_rap',
                '_anclaje_matriz': term_obj.get('_anclaje_matriz', {}) if isinstance(term_obj, dict) else {},
            })

# Sort alphabetically by english_term
baseline_entries.sort(key=lambda x: x['english_term'].lower())

# === SAVE baseline ===
output = {
    'metadata': {
        'wave': 'D.1',
        'date': '2026-05-02',
        'method': 'mecanico_extract_pm-1-2',
        'baseline_count': len(baseline_entries),
        'pending_for_wave_d_2': '+61 embedded acronyms · +ES translations · +context enrichment',
    },
    'entries': baseline_entries,
}

output_path = RUN_DIR / 'glosario-baseline-imarpor-v2.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

# Stats
print(f'=== Wave D.1 · Baseline glosario extraído ===\n')
print(f'Total entradas baseline: {len(baseline_entries)}')
print(f'\nDistribución por categoría:')
from collections import Counter
cat_counts = Counter(e['category'] for e in baseline_entries)
for cat, n in cat_counts.most_common():
    print(f'  {cat}: {n}')

print(f'\nEntries con definicion ya: {sum(1 for e in baseline_entries if "(definition pending)" not in e["english_definition"])}/{len(baseline_entries)}')
print(f'Entries con ejemplo ya: {sum(1 for e in baseline_entries if "(example pending" not in e["example_in_context"])}/{len(baseline_entries)}')
print(f'Entries con ES translation: 0/{len(baseline_entries)} ← Wave D.2 target')

print(f'\n✅ Output: {output_path.name} ({output_path.stat().st_size // 1024} KB)')
print(f'\n=== Sample 5 entries ===')
for e in baseline_entries[:5]:
    print(f"\n  {e['english_term']} ({e['category']})")
    print(f"    Def: {e['english_definition']}")
    print(f"    Ex:  {e['example_in_context']}")
    print(f"    ES:  {e['equivalente_espanol']}")
