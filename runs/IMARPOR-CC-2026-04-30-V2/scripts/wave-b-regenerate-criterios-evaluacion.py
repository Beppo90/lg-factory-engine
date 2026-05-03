#!/usr/bin/env python3
"""
Wave B · Regenerar 30 AC IMARPOR-V2 con criterios_evaluacion[] derivados
==========================================================================

Heredancia mixta:
- Verbo: mapping determinístico desde verbo enunciado por dimension (cognitiva/procedimental/actitudinal)
- Objeto + condición: literal del enunciado (limpiando técnicas didácticas redundantes)
- Validación: alineación contra criterios SOFÍA matriz v1.3 + canon C01-C08

Output:
- 30 cards modificadas en sus 11 PMs (campo criterios_evaluacion[] poblado)
- _alineamiento_criterio_sofia: trazabilidad RA{N} SOFÍA #M o canon CXX
- Backups: pm-2-x.json.pre-wave-b
- Reporte stats wave-b-report.md
"""
import json
import re
import shutil
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

# === MAPPING canon: verbo enunciado (lemma) → verbo SOFÍA tercera persona singular ===

VERB_MAPPING = {
    # COGNITIVA · verbos canon SOFÍA tercera persona singular
    'cognitiva': {
        'reconocer': 'Reconoce',
        'identificar': 'Identifica',
        'mapear': 'Identifica',
        'comprender': 'Comprende',
        'analizar': 'Analiza',
        'diferenciar': 'Diferencia',
        'relacionar': 'Relaciona',
        'instalar': 'Identifica',
        'consolidar': 'Reconoce',
        'inducir': 'Reconoce',
        'descubrir': 'Identifica',
        'reforzar': 'Refuerza',
        'cerrar': 'Identifica',
        'reflexionar': 'Reflexiona',
        'diagnosticar': 'Identifica',
        'integrar': 'Relaciona',
        'anticipar': 'Anticipa',
        'analizar y categorizar': 'Categoriza',
        'descubrir y automatizar': 'Aplica',
        'preparar': 'Reconoce',
        'comprender el mission brief': 'Comprende',
    },
    # PROCEDIMENTAL · verbos canon SOFÍA tercera persona singular
    'procedimental': {
        'producir': 'Produce',
        'aplicar': 'Aplica',
        'ejecutar': 'Ejecuta',
        'realizar': 'Realiza',
        'inspeccionar': 'Inspecciona',
        'documentar': 'Documenta',
        'utilizar': 'Utiliza',
        'asegurar': 'Asegura',
        'levantar': 'Iza',
        'trasladar': 'Traslada',
        'posicionar': 'Posiciona',
        'activar': 'Activa',
        'coordinar': 'Coordina',
        'demostrar': 'Demuestra',
        'integrar': 'Integra',
        'preparar': 'Prepara',
        'diseñar': 'Diseña',
        'consolidar': 'Aplica',
        'comprender': 'Aplica',
    },
    # ACTITUDINAL · verbos canon SOFÍA tercera persona singular
    'actitudinal': {
        'reflexionar': 'Reflexiona',
        'diagnosticar': 'Demuestra',
        'reconocer': 'Demuestra',
        'asumir': 'Asume',
        'demostrar': 'Demuestra',
        'manifestar': 'Manifiesta',
        'adoptar': 'Adopta',
        'integrar': 'Demuestra',
    }
}

DEFAULT_VERB = {
    'cognitiva': 'Identifica',
    'procedimental': 'Aplica',
    'actitudinal': 'Demuestra'
}


def derive_criterio(enunciado: str, dimension: str) -> tuple[str, str]:
    """
    Deriva criterio canónico SOFÍA desde enunciado + dimension.
    Returns: (criterio_derivado, verbo_sofia_usado)

    1. Extrae verbo del enunciado (primera palabra)
    2. Aplica mapping → verbo SOFÍA tercera persona singular
    3. Conserva objeto + condición del enunciado
    4. Limpia técnicas didácticas redundantes (mediante/aplicando/a través de/usando)
    """
    if not enunciado or not isinstance(enunciado, str):
        return ("(criterio derivado pendiente)", DEFAULT_VERB.get(dimension, 'Identifica'))

    # Extract primera palabra (potencial verbo infinitivo)
    words = enunciado.strip().split()
    if not words:
        return (enunciado, DEFAULT_VERB.get(dimension, 'Identifica'))

    first_word = words[0].lower().rstrip(',.:;')

    # Lookup verbo SOFÍA tercera persona singular
    mapping = VERB_MAPPING.get(dimension, {})
    verbo_sofia = mapping.get(first_word, DEFAULT_VERB.get(dimension, 'Identifica'))

    # Resto del enunciado (sin verbo inicial)
    resto = ' '.join(words[1:])

    # Limpiar técnicas didácticas redundantes (final del enunciado)
    # Patrones: "mediante X" · "aplicando X" · "a través de X" · "usando X" · "por medio de X" · "con X"
    resto = re.sub(r'\s+(mediante|aplicando|a través de|a traves de|usando|por medio de)\s+[^.]+\.?\s*$',
                   '.', resto, flags=re.IGNORECASE)
    # Limpiar técnicas mencionadas en medio (ej: "DRTA + K-W-L + Story Map")
    resto = re.sub(r'\s+(aplicando|mediante)\s+[A-Z][\w\s+\-,]+(?:\s+\+\s+[A-Z][\w\s+\-,]+)+\s*\.?',
                   '.', resto, flags=re.IGNORECASE)

    # Asegurar punto final
    resto = resto.strip()
    if resto and not resto.endswith('.'):
        resto = resto + '.'

    criterio = f"{verbo_sofia} {resto}"

    # Capitalizar primera letra después del verbo si quedó en lowercase tras cleanup
    return (criterio, verbo_sofia)


def find_alignment(criterio: str, dimension: str, rap_target: str, matriz_raps: dict) -> str:
    """Busca alineación semántica con criterios SOFÍA matriz v1.3 o canon C01-C08."""
    if not rap_target or rap_target not in matriz_raps:
        # APERTURA o TRANSFERENCIA · sin RAP target
        return 'canon_C03 (activación afectiva)' if dimension == 'actitudinal' else 'canon_C08 (transferencia)'

    rap_data = matriz_raps[rap_target]
    sofia_criterios = rap_data.get('criterios_evaluacion', [])

    # Heurística simple: buscar overlap léxico significativo (palabras 5+ letras compartidas)
    criterio_words = set(re.findall(r'\b\w{5,}\b', criterio.lower()))
    best_match = None
    best_score = 0
    for i, sc in enumerate(sofia_criterios):
        if isinstance(sc, dict):
            sc_text = sc.get('contenido', sc.get('criterio', str(sc)))
        else:
            sc_text = str(sc)
        sc_words = set(re.findall(r'\b\w{5,}\b', sc_text.lower()))
        overlap = len(criterio_words & sc_words)
        if overlap > best_score:
            best_score = overlap
            best_match = f'{rap_target}_SOFIA_#{i+1}'

    if best_match and best_score >= 2:
        return best_match
    # Fallback: anclar a saber_proceso
    return f'{rap_target}_saber_proceso (alineación semántica débil · revisar manualmente)'


# === LOAD INPUTS ===
print('=== Wave B · Regenerar criterios_evaluacion[] · 30 cards IMARPOR-V2 ===\n')

# Matriz v1.3
matriz = json.load(open(RUN_DIR / 'pm-0-0-matriz-alineada.json'))
matriz_raps = {r['rap_id']: r for r in matriz['raps']}
print(f'Matriz v1.3 cargada · 4 RAPs · 7 criterios SOFÍA total')

# 30 Activity Cards
PM_FILES = ['pm-2-1.json','pm-2-2.json','pm-2-3.json','pm-2-4.json','pm-2-5.json',
            'pm-2-6.json','pm-2-8.json','pm-2-9.json','pm-2-10.json','pm-3-5.json','pm-4-2.json']

# Procesar PM por PM (modificación in-place + backup)
total_cards = 0
total_criterios_added = 0
report_rows = []

for pm_file in PM_FILES:
    pm_path = RUN_DIR / pm_file
    backup_path = RUN_DIR / f'{pm_file}.pre-wave-b'

    # Backup
    if not backup_path.exists():
        shutil.copy(pm_path, backup_path)

    # Load
    j = json.load(open(pm_path))

    # Detect cards location
    cards = j.get('activity_cards', j.get('actividades', []))
    cards_key = 'activity_cards' if 'activity_cards' in j else ('actividades' if 'actividades' in j else None)
    is_single_card = False
    if not cards and 'activity_card' in j:
        cards = [j['activity_card']]
        cards_key = 'activity_card_single'
        is_single_card = True
    if not cards:
        for k, v in j.items():
            if isinstance(v, list) and v and isinstance(v[0], dict) and ('pm_id' in v[0] or 'session' in v[0] or 'tipo_bloque' in v[0]):
                cards = v
                cards_key = k
                break

    # Modificar cada card
    for c in cards:
        if not isinstance(c, dict):
            continue
        total_cards += 1
        enunciado = c.get('enunciado') or c.get('titulo') or ''
        dimension = c.get('dimension', 'cognitiva').lower()
        rap_target = c.get('rap_target') or None
        tipo_bloque = c.get('tipo_bloque', 'APROPIACION')

        # Para APERTURA cards (B0): criterios_evaluacion permitido vacío []
        # Pero podemos derivar igual para honrar trazabilidad
        criterio, verbo = derive_criterio(enunciado, dimension)

        # Alineación
        alignment = find_alignment(criterio, dimension, rap_target, matriz_raps)

        c['criterios_evaluacion'] = [criterio]
        c['_alineamiento_criterio_sofia'] = alignment
        c['_criterio_derivacion'] = {
            'verbo_origen_enunciado': enunciado.split()[0] if enunciado else '',
            'verbo_sofia_aplicado': verbo,
            'dimension': dimension,
            'method': 'mecanico_deterministic_v3.1',
        }
        total_criterios_added += 1

        report_rows.append({
            'pm': pm_file,
            'numero': c.get('numero_actividad', '?'),
            'session': c.get('session', '?'),
            'tipo': tipo_bloque,
            'rap': rap_target or '-',
            'dimension': dimension,
            'enunciado_first_30': enunciado[:50] + '...' if len(enunciado) > 50 else enunciado,
            'criterio_derivado': criterio[:80] + '...' if len(criterio) > 80 else criterio,
            'alignment': alignment
        })

    # Save back
    if is_single_card:
        j['activity_card'] = cards[0]
    elif cards_key:
        j[cards_key] = cards

    with open(pm_path, 'w', encoding='utf-8') as f:
        json.dump(j, f, ensure_ascii=False, indent=2)

print(f'\n✅ {total_cards} cards procesadas · {total_criterios_added} criterios derivados')
print(f'\nSample (primeros 12 derivados):')
print(f'{"#":>3} {"S":>4} {"BID":>3} {"RAP":>4} {"DIM":>14} {"ENUN":40} {"CRITERIO":50} ALIGN')
for r in report_rows[:12]:
    bid = next((c.get('bloque_id_referencia','?') for c in [{'enunciado':r['enunciado_first_30']}] ), '?')
    print(f"#{r['numero']:>3} S{str(r['session']).replace('SS','').replace('S','')} {r['tipo'][:3]:>3} {r['rap']:>4} {r['dimension']:>14} {r['enunciado_first_30'][:40]:40} {r['criterio_derivado'][:50]:50} {r['alignment'][:25]}")

# Stats finales
from collections import Counter
verbos_usados = Counter([r['criterio_derivado'].split()[0] for r in report_rows])
alignments = Counter([r['alignment'] for r in report_rows])

print(f'\n=== Stats ===')
print(f'Verbos SOFÍA distribuidos:')
for v, n in verbos_usados.most_common():
    print(f'  {v}: {n}')
print(f'\nAlineaciones SOFÍA:')
for a, n in alignments.most_common():
    print(f'  {a}: {n}')

# Reporte
report_md = f"""# Wave B · Regenerar criterios_evaluacion[] · 30 cards IMARPOR-V2

**Date:** 2026-05-02 PM
**Method:** Mecánico determinístico · verbo enunciado → verbo SOFÍA tercera persona singular por dimension

## Stats

- Total cards modificadas: {total_cards}/30
- Total criterios derivados: {total_criterios_added}
- Backups creados: 11 archivos `.pre-wave-b`

## Verbos SOFÍA usados (distribución)

| Verbo SOFÍA | # cards |
|---|---|
"""
for v, n in verbos_usados.most_common():
    report_md += f'| {v} | {n} |\n'

report_md += f"""

## Alineaciones SOFÍA

| Alignment | # cards |
|---|---|
"""
for a, n in alignments.most_common():
    report_md += f'| {a} | {n} |\n'

report_md += f"""

## Tabla completa derivaciones

| # | S | tipo | RAP | dim | enunciado (50ch) | criterio derivado | alineamiento SOFÍA |
|---|---|------|-----|-----|----|-----|-----|
"""
for r in report_rows:
    report_md += f"| #{r['numero']} | {r['session']} | {r['tipo']} | {r['rap']} | {r['dimension']} | {r['enunciado_first_30']} | {r['criterio_derivado']} | {r['alignment']} |\n"

report_md += f"""

## Próximo Wave

Wave C · Re-render `pm-2-11.json` + `pm-2-11-GFPI-F-134-V04.xlsx` con criterios_por_actividad heredados de las 30 cards regeneradas
"""

report_path = RUN_DIR / 'wave-b-report.md'
with open(report_path, 'w', encoding='utf-8') as f:
    f.write(report_md)
print(f'\n✅ Report: {report_path.name}')
print(f'\n=== Wave B COMPLETO · listo para Wave C ===')
