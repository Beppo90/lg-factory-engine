#!/usr/bin/env python3
"""
Wave E.preview-fix · Extract 30 cards descripciones para Agent rewrite
========================================================================

Output: descripciones-30-cards-input.json con campos clave por card
para pasar al Agent · LLM rescribe a descripcion_aprendiz canon SENA.
"""
import json
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

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
        # Extract solo lo esencial para el rewrite
        compact = {
            '_uid': f"{f.replace('.json','')}_{c.get('numero_actividad', '?')}",
            '_source_pm': f.replace('.json',''),
            'numero_actividad': c.get('numero_actividad'),
            'session': str(c.get('session', '')).replace('SS','').replace('S',''),
            'tipo_bloque': c.get('tipo_bloque'),
            'bloque_id_referencia': c.get('bloque_id_referencia'),
            'rap_target': c.get('rap_target'),
            'dimension': c.get('dimension'),
            'enunciado': c.get('enunciado'),
            'descripcion_actual': c.get('descripcion'),
            'ambiente': c.get('ambiente'),
            'estrategias': c.get('estrategias_didacticas_activas', []),
            'tecnicas': c.get('tecnicas_didacticas', []),
            'duracion_horas': c.get('duracion_horas'),
        }
        all_cards.append(compact)

# Sort by numero_actividad
all_cards.sort(key=lambda c: int(str(c.get('numero_actividad', 0)).replace('SS','').replace('S','')))

output = {
    'metadata': {
        'task': 'Wave E.preview-fix · descripcion → descripcion_aprendiz',
        'date': '2026-05-02',
        'total_cards': len(all_cards),
        'target_length': '80-150 words per descripcion_aprendiz',
        'tone': 'SENA impersonal · "el instructor", "los aprendices", "cada equipo"',
        'forbidden_personajes': ['Manuel', 'Manuel Padilla', 'Mariana', 'Mariana Restrepo', 'Hernando', 'Hernando Ríos', 'Carolina', 'Carolina Vargas', 'Yurlenis', 'Yurlenis Palacios', 'Pipa', 'Andrés', 'Andrés Mejía', 'Captain Lim', 'Captain Lim Wei-Ming', 'Sergio', 'Luis Mejía'],
        'preserve_arquetipos': 'galería visual · K-W-L · post-it · tríos · DRTA · simulación · mesa redonda · investigación guiada · práctica de campo · etc.',
    },
    'cards': all_cards,
}

output_path = RUN_DIR / 'descripciones-30-cards-input.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)
print(f'✅ Extract: {output_path.name} · {len(all_cards)} cards · {output_path.stat().st_size // 1024} KB')

# Stats
total_words = sum(len((c.get('descripcion_actual') or '').split()) for c in all_cards)
print(f'\nStats descripcion_actual:')
print(f'  Total palabras: {total_words}')
print(f'  Promedio por card: {total_words // len(all_cards)}')
print(f'  Target post-rewrite: 80-150 palabras × 30 = 2400-4500 palabras totales')
