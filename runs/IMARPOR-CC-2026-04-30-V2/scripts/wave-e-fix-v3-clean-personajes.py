#!/usr/bin/env python3
"""
Wave E.preview-fix-v3 · Cleanup mecánico personajes en material_apoyo + evidencias.nombre
==========================================================================================

Reemplaza nombres de personajes por roles funcionales en:
- card.material_apoyo[].descripcion
- card.material_apoyo[].link (si aplica)
- card.evidencias.nombre
- card.evidencias.tecnica_evaluacion (si aplica)

Mantiene MV CARIBBEAN STAR · Puerto Antioquia · términos técnicos.

Backups: pm-2-x.json.pre-wave-e-fix-v3
"""
import json
import re
import shutil
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

# Mapping ordenado: full names primero (para no fragmentar) · luego short names
REPLACEMENTS = [
    # Captain Lim primero (compound)
    (r'\bCaptain\s+Lim\s+Wei-Ming\b', 'el capitán del buque'),
    (r'\bCaptain\s+Lim\b', 'el capitán del buque'),
    # Cast operacional
    (r'\bManuel\s+Padilla\b', 'el operador junior reefer'),
    (r'\bManuel\b(?!\s+Reefer)', 'el operador junior reefer'),  # NO reemplazar "Manuel Reefer" si es nombre técnico
    (r'\bMariana\s+Restrepo\b', 'el cold chain coordinator'),
    (r'\bMariana\s+Suárez\b', 'el cold chain coordinator'),
    (r'\bMariana\b', 'el cold chain coordinator'),
    (r'\bHernando\s+Ríos\b', 'el safety manager'),
    (r'\bHernando\b', 'el safety manager'),
    (r'\bCarolina\s+Vargas\b', 'el port pilot'),
    (r'\bCarolina\b', 'el port pilot'),
    (r'\bYurlenis\s+Palacios\b', 'el tally clerk'),
    (r'\bYurlenis(\s+the\s+Tally\s+Clerk)?\b', 'el tally clerk'),
    (r'\bAndrés\s+Mejía\b', 'el bosun'),
    (r'\bAndrés\b', 'el bosun'),
    (r'\bPipa\b', 'el refrigeration technician'),
    (r'\bSergio\s+Cortés(\s+Perdomo)?\b', 'el instructor'),
    (r'\(canon\s+Sergio[^)]*\)', ''),  # eliminar metadata "(canon Sergio post-Wave N)"
    (r'\bSergio\b', 'el instructor'),
    (r'\bLuis\s+Mejía\b', 'el estibador'),
    (r'\bLuis\b', 'el estibador'),
    # Roles compuestos típicos en ejemplos
    (r'\bPilot,\s+Captain\s+Lim,\s+Bosun\s+&\s+Pipa\b', 'pilot · capitán · bosun · refrigeration technician'),
    (r'\bMariana,\s+Carolina\s+&\s+Yurlenis\b', 'cold chain coordinator · port pilot · tally clerk'),
    # Limpieza espacios dobles + comas dobles que pueden quedar
    (r'\s{2,}', ' '),
    (r',\s*,', ','),
    (r'\s+\.', '.'),
]

def clean_text(text):
    """Aplica todos los replacements. Devuelve string limpio."""
    if not isinstance(text, str):
        return text
    cleaned = text
    for pattern, replacement in REPLACEMENTS:
        cleaned = re.sub(pattern, replacement, cleaned, flags=re.IGNORECASE)
    return cleaned.strip()

PM_FILES = ['pm-2-1.json','pm-2-2.json','pm-2-3.json','pm-2-4.json','pm-2-5.json',
            'pm-2-6.json','pm-2-8.json','pm-2-9.json','pm-2-10.json','pm-3-5.json','pm-4-2.json']

stats = {'cards_modified': 0, 'material_apoyo_modified': 0, 'evidencias_nombre_modified': 0, 'cards_total': 0}

for pm_file in PM_FILES:
    pm_path = RUN_DIR / pm_file
    backup_path = RUN_DIR / f'{pm_file}.pre-wave-e-fix-v3'

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

    for c in cards:
        stats['cards_total'] += 1
        modified = False

        # Clean material_apoyo
        ma = c.get('material_apoyo', [])
        if isinstance(ma, list):
            for m in ma:
                if isinstance(m, dict):
                    orig_desc = m.get('descripcion', '') or ''
                    new_desc = clean_text(orig_desc)
                    if new_desc != orig_desc:
                        m['descripcion'] = new_desc
                        stats['material_apoyo_modified'] += 1
                        modified = True
                    orig_link = m.get('link', '') or ''
                    new_link = clean_text(orig_link)
                    if new_link != orig_link:
                        m['link'] = new_link
                        modified = True

        # Clean evidencias.nombre
        ev = c.get('evidencias', {})
        if isinstance(ev, dict):
            orig_nombre = ev.get('nombre', '') or ''
            new_nombre = clean_text(orig_nombre)
            if new_nombre != orig_nombre:
                ev['nombre'] = new_nombre
                stats['evidencias_nombre_modified'] += 1
                modified = True

        if modified:
            stats['cards_modified'] += 1

    if is_single:
        j['activity_card'] = cards[0]
    elif cards_key:
        j[cards_key] = cards

    with open(pm_path, 'w', encoding='utf-8') as f:
        json.dump(j, f, ensure_ascii=False, indent=2)

print('=== Wave E.preview-fix-v3 · Cleanup mecánico ===\n')
print(f'Total cards procesadas: {stats["cards_total"]}/30')
print(f'Cards modificadas: {stats["cards_modified"]}/30')
print(f'  material_apoyo items modificados: {stats["material_apoyo_modified"]}')
print(f'  evidencias.nombre modificados: {stats["evidencias_nombre_modified"]}')
print(f'\n11 backups .pre-wave-e-fix-v3 creados')
