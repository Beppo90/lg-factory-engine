#!/usr/bin/env python3
"""Apply recursos_aprendiz[] a las 30 cards · backups + verificación."""
import json, shutil
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

recursos_data = json.load(open(RUN_DIR / 'recursos-aprendiz-30-cards.json'))
recursos_by_uid = {r['_uid']: r['recursos_aprendiz'] for r in recursos_data['extracts']}
print(f'Recursos cargados: {len(recursos_by_uid)}/30')

PM_FILES = ['pm-2-1.json','pm-2-2.json','pm-2-3.json','pm-2-4.json','pm-2-5.json',
            'pm-2-6.json','pm-2-8.json','pm-2-9.json','pm-2-10.json','pm-3-5.json','pm-4-2.json']

total_applied = 0
for pm_file in PM_FILES:
    pm_path = RUN_DIR / pm_file
    backup_path = RUN_DIR / f'{pm_file}.pre-wave-e-fix-v2'
    if not backup_path.exists():
        shutil.copy(pm_path, backup_path)

    j = json.load(open(pm_path))
    cards = j.get('activity_cards', j.get('actividades', []))
    cards_key = 'activity_cards' if 'activity_cards' in j else ('actividades' if 'actividades' in j else None)
    is_single = False
    if not cards and 'activity_card' in j:
        cards = [j['activity_card']]
        cards_key = 'activity_card_single'
        is_single = True
    if not cards:
        for k, v in j.items():
            if isinstance(v, list) and v and isinstance(v[0], dict) and ('pm_id' in v[0] or 'session' in v[0] or 'tipo_bloque' in v[0]):
                cards = v
                cards_key = k
                break

    pm_base = pm_file.replace('.json', '')
    for c in cards:
        uid = f"{pm_base}_{c.get('numero_actividad', '?')}"
        if uid in recursos_by_uid:
            c['recursos_aprendiz'] = recursos_by_uid[uid]
            total_applied += 1

    if is_single:
        j['activity_card'] = cards[0]
    elif cards_key:
        j[cards_key] = cards

    with open(pm_path, 'w', encoding='utf-8') as f:
        json.dump(j, f, ensure_ascii=False, indent=2)

print(f'\n✅ recursos_aprendiz aplicado a {total_applied}/30 cards · 11 backups .pre-wave-e-fix-v2 creados')
