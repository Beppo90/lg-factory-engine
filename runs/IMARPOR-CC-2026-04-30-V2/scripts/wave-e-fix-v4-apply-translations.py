#!/usr/bin/env python3
"""Wave E.fix-v4 · Apply EN translations a las 26 cards non-B0."""
import json, shutil
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')
trans_data = json.load(open(RUN_DIR / 'descripciones-recursos-en-19-cards.json'))
trans_by_uid = {t['_uid']: t for t in trans_data['translations']}

PM_FILES = ['pm-2-1.json','pm-2-2.json','pm-2-3.json','pm-2-4.json','pm-2-5.json',
            'pm-2-6.json','pm-2-8.json','pm-2-9.json','pm-2-10.json','pm-3-5.json','pm-4-2.json']

applied = 0
for pm_file in PM_FILES:
    pm_path = RUN_DIR / pm_file
    j = json.load(open(pm_path))
    cards = j.get('activity_cards', j.get('actividades', []))
    cards_key = 'activity_cards' if 'activity_cards' in j else ('actividades' if 'actividades' in j else None)
    is_single = False
    if not cards and 'activity_card' in j:
        cards = [j['activity_card']]; cards_key = 'activity_card_single'; is_single = True
    if not cards:
        for k, v in j.items():
            if isinstance(v, list) and v and isinstance(v[0], dict) and ('pm_id' in v[0]):
                cards = v; cards_key = k; break

    pm_base = pm_file.replace('.json', '')
    for c in cards:
        uid = f"{pm_base}_{c.get('numero_actividad', '?')}"
        if uid in trans_by_uid:
            t = trans_by_uid[uid]
            c['descripcion_aprendiz_en'] = t.get('descripcion_aprendiz_en', '')
            c['recursos_aprendiz_en'] = t.get('recursos_aprendiz_en', [])
            c['_cefr_level_en'] = t.get('cefr_level', '')
            applied += 1

    if is_single:
        j['activity_card'] = cards[0]
    elif cards_key:
        j[cards_key] = cards

    with open(pm_path, 'w', encoding='utf-8') as f:
        json.dump(j, f, ensure_ascii=False, indent=2)

print(f'EN translations aplicadas: {applied}/26 cards non-B0')
