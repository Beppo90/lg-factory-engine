#!/usr/bin/env python3
"""Wave E.fix-v4 · Cleanup mecánico 'Sergio' → 'el instructor' cross-cards (descripcion_aprendiz · recursos_aprendiz · material_apoyo · descripcion técnica original)."""
import json, re, shutil
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

REPLACEMENTS = [
    (r'\bSergio\s+Cortés\s+Perdomo\b', 'el instructor'),
    (r'\bSergio\s+Cortés\b', 'el instructor'),
    (r'\(canon\s+Sergio[^)]*\)', ''),
    (r'\b(?:el\s+instructor\s+)?Sergio\b', 'el instructor'),
]

def clean(text):
    if not isinstance(text, str):
        return text
    out = text
    for pat, rep in REPLACEMENTS:
        out = re.sub(pat, rep, out, flags=re.IGNORECASE)
    out = re.sub(r'\s{2,}', ' ', out).strip()
    return out

def clean_recursive(obj):
    """Aplica clean a strings nested en dict/list."""
    if isinstance(obj, str):
        return clean(obj)
    if isinstance(obj, dict):
        return {k: clean_recursive(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [clean_recursive(x) for x in obj]
    return obj

PM_FILES = ['pm-2-1.json','pm-2-2.json','pm-2-3.json','pm-2-4.json','pm-2-5.json',
            'pm-2-6.json','pm-2-8.json','pm-2-9.json','pm-2-10.json','pm-3-5.json','pm-4-2.json']

stats = {'cards_modified': 0, 'cards_total': 0}
for pm_file in PM_FILES:
    pm_path = RUN_DIR / pm_file
    backup_path = RUN_DIR / f'{pm_file}.pre-wave-e-fix-v4'
    if not backup_path.exists():
        shutil.copy(pm_path, backup_path)

    j = json.load(open(pm_path))
    cards = j.get('activity_cards', j.get('actividades', []))
    cards_key = 'activity_cards' if 'activity_cards' in j else ('actividades' if 'actividades' in j else None)
    is_single = False
    if not cards and 'activity_card' in j:
        cards = [j['activity_card']]; cards_key = 'activity_card_single'; is_single = True
    if not cards:
        for k, v in j.items():
            if isinstance(v, list) and v and isinstance(v[0], dict) and ('pm_id' in v[0] or 'session' in v[0]):
                cards = v; cards_key = k; break

    for c in cards:
        stats['cards_total'] += 1
        # Snapshot pre-clean
        before = json.dumps(c, ensure_ascii=False)
        # Apply clean recursive on string fields
        for field in ['descripcion','descripcion_aprendiz','enunciado','titulo','recursos_aprendiz']:
            if field in c:
                c[field] = clean_recursive(c[field])
        for field in ['material_apoyo','materiales_formacion','materiales']:
            if field in c:
                c[field] = clean_recursive(c[field])
        if 'evidencias' in c:
            c['evidencias'] = clean_recursive(c['evidencias'])

        after = json.dumps(c, ensure_ascii=False)
        if before != after:
            stats['cards_modified'] += 1

    if is_single:
        j['activity_card'] = cards[0]
    elif cards_key:
        j[cards_key] = cards

    with open(pm_path, 'w', encoding='utf-8') as f:
        json.dump(j, f, ensure_ascii=False, indent=2)

print(f'Cards procesadas: {stats["cards_total"]}/30 · modificadas: {stats["cards_modified"]} · 11 backups .pre-wave-e-fix-v4 creados')
