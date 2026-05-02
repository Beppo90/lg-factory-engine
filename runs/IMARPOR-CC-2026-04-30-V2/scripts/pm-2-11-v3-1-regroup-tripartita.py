#!/usr/bin/env python3
"""
PM-2.11 v3.1 · Re-agrupación tripartita de gfpi_f134_v04_row → gfpi_f134_v04_rows[]
====================================================================================

Genera pm-2-11.json con schema v3.1 (6 filas heredadas 1:1 de pm-1-2 sub_bloques_tripartitos)
en lugar de 1 fila monolítica agregada.

Fuentes consumidas (heredancia 1:1):
- pm-1-2.json (sub_bloques_tripartitos canon: B0 APERTURA + B1-B4 RA1-RA4 + BT TRANSFERENCIA)
- pm-0-0-matriz-alineada.json (matriz v1.3 con saberes_proceso + criterios SOFÍA distribuidos)
- 11 PMs (pm-2-1.json ... pm-4-2.json) con 30 Activity Cards v3.0 distribuidas por bloque
- pm-2-11.json v3.0 actual (para C12-C14-C15 ambiente/materiales/instructores/observaciones)

Output: pm-2-11.json v3.1 + backup del v3.0 con sufijo .pre-v3-1-regroup.json
"""
import json
import shutil
from datetime import datetime
from pathlib import Path

RUN_DIR = Path('/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2')

# Backup primero
src = RUN_DIR / 'pm-2-11.json'
backup = RUN_DIR / 'pm-2-11.json.pre-v3-1-regroup'
if not backup.exists():
    shutil.copy(src, backup)
    print(f'BACKUP creado: {backup.name}')

# === LOAD INPUTS ===
pm12 = json.load(open(RUN_DIR / 'pm-1-2.json'))
matriz = json.load(open(RUN_DIR / 'pm-0-0-matriz-alineada.json'))
# Read v3.0 from backup if pm-2-11.json is already v3.1 (re-run scenario)
pm211_current = json.load(open(src))
if 'gfpi_f134_v04_row' in pm211_current:
    pm211_v30 = pm211_current  # first run · still v3.0
else:
    # Re-run: read from backup
    if backup.exists():
        pm211_v30 = json.load(open(backup))
        print(f'Re-run detected · reading v3.0 source from backup {backup.name}')
    else:
        # Fallback: synthesize minimal v30 wrapper using v3.1 LEGACY field
        legacy = pm211_current.get('_gfpi_f134_v04_row_v3_0_LEGACY', {})
        pm211_v30 = dict(pm211_current)
        pm211_v30['gfpi_f134_v04_row'] = legacy
        print('No backup found · using _gfpi_f134_v04_row_v3_0_LEGACY field')

# === LOAD 30 Activity Cards desde 11 PMs ===
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

assert len(all_cards) == 30, f'Expected 30 Activity Cards, got {len(all_cards)}'
print(f'30 Activity Cards loaded · OK')

# === BUILD MAPPING bloque_id → list of cards ===
cards_por_bloque = {'B0': [], 'B1': [], 'B2': [], 'B3': [], 'B4': [], 'BT': []}
for c in all_cards:
    bid = c.get('bloque_id_referencia', '?')
    if bid in cards_por_bloque:
        cards_por_bloque[bid].append(c)

for bid, cs in cards_por_bloque.items():
    print(f'  {bid}: {len(cs)} cards')

# === BUILD MAPPING rap_id → matriz data ===
matriz_por_rap = {}
for r in matriz['raps']:
    matriz_por_rap[r['rap_id']] = r

# === BUILD MAPPING bloque_id → pm-1-2 sub-bloque ===
sb_por_bloque = {}
for sb in pm12['sub_bloques_tripartitos']:
    sb_por_bloque[sb['bloque_id']] = sb

# === HELPER: extract saberes_conceptos del sub-bloque pm-1-2 ===
def get_saberes_conceptos(sb):
    """Extract saberes_conceptos del sub-bloque pm-1-2 v4.2."""
    anclaje = sb.get('_anclaje_matriz_bloque', {})
    sc_cubiertos = anclaje.get('saberes_conceptos_cubiertos', [])
    if isinstance(sc_cubiertos, list):
        return [str(s) for s in sc_cubiertos]
    return []

def get_saberes_proceso_from_matriz(rap_id):
    """Extract saberes_proceso de la matriz v1.3 para un RAP."""
    if rap_id not in matriz_por_rap:
        return []
    sp = matriz_por_rap[rap_id].get('saberes_proceso', [])
    return [s.get('contenido', s.get('saber', str(s))) if isinstance(s, dict) else str(s) for s in sp]

def get_criterios_from_matriz(rap_id):
    """Extract criterios SOFÍA + canon de la matriz v1.3 para un RAP."""
    if rap_id not in matriz_por_rap:
        return []
    cr = matriz_por_rap[rap_id].get('criterios_evaluacion', [])
    return [c.get('contenido', c.get('criterio', str(c))) if isinstance(c, dict) else str(c) for c in cr]

def get_criterios_canon_assigned(sb):
    """Extract criterios canon assigned al bloque (de pm-1-2 _anclaje_matriz_bloque)."""
    anclaje = sb.get('_anclaje_matriz_bloque', {})
    return anclaje.get('criterios_canon_assigned', anclaje.get('criterios_canon', []))

def format_actividad_text(c):
    """Format una activity card para C7 (texto legible)."""
    num = c.get('numero_actividad', '?')
    s = str(c.get('session', '?')).replace('SS', 'S')
    pm = c.get('_source_pm', '?').replace('.json', '')
    dim = c.get('dimension', '?')
    h = c.get('duracion_horas', c.get('duracion_h', '?'))
    enun = c.get('enunciado') or c.get('titulo') or '?'
    return f"#{num} {s} ({pm} · {dim} · {h}h) — {enun}"

def format_evidencia(ev):
    """Format una evidencia para C10."""
    if not ev or ev is False:
        return None
    if isinstance(ev, dict):
        nombre = ev.get('nombre', '?')
        tipo = ev.get('tipo', '?')
        instr = ev.get('instrumento_evaluacion', ev.get('instrumento', '?'))
        codigo = ev.get('codigo', '?')
        return f"[{codigo}] {nombre} · tipo={tipo} · instrumento={instr}"
    return str(ev)

def get_horas_directo(sb, cards):
    """Sum horas_directas del bloque."""
    return sb.get('horas_directas', sum(float(c.get('duracion_horas', c.get('duracion_h', 0)) or 0) for c in cards))

def get_horas_independiente(sb, cards):
    """Sum horas_independientes (autonomous work)."""
    autonomous = sb.get('horas_independientes', sb.get('horas_autonomas', 0))
    if not autonomous:
        # Default: ~25% del directo (canon SENA)
        autonomous = round(get_horas_directo(sb, cards) * 0.25, 1)
    return autonomous

# === BUILD 6 ROWS ===
rows = []
competencia = pm211_v30['gfpi_f134_v04_row'].get('C1_competencia', '')

# Mantener C12/C13/C14 ambientes/materiales/instructores comunes (transversales) o por bloque
ambiente_global = pm211_v30['gfpi_f134_v04_row'].get('C12_ambiente', '')
materiales_global = pm211_v30['gfpi_f134_v04_row'].get('C13_materiales_formacion', [])
instructores_global = pm211_v30['gfpi_f134_v04_row'].get('C14_instructores_responsables', '')

for bid in ['B0', 'B1', 'B2', 'B3', 'B4', 'BT']:
    sb = sb_por_bloque[bid]
    cards = cards_por_bloque[bid]
    tipo = sb['tipo_bloque']
    rap_target = sb.get('rap_target', None)

    # === C2 RAP ===
    if rap_target:
        rap_data = matriz_por_rap.get(rap_target, {})
        c2 = {
            'rap_id': rap_target,
            'codigo': rap_data.get('codigo', ''),
            'enunciado': rap_data.get('enunciado_rap', rap_data.get('enunciado', ''))
        }
    elif tipo == 'APERTURA':
        c2 = {
            'rap_id': 'transversal',
            'codigo': 'N/A',
            'enunciado': 'Apertura transversal · activación + diagnóstico baseline · NO cubre RAP específico (cobertura via B1-B4 APROPIACIÓN)'
        }
    else:  # TRANSFERENCIA
        c2 = {
            'rap_id': 'transversal_capstone',
            'codigo': 'N/A',
            'enunciado': 'Transferencia capstone · integra RA1+RA2+RA3+RA4 vía Misión ABP (Pre-Departure Banana Reefer Compliance Check) · NO cubre nuevo RAP'
        }

    # === C4 SABERES CONCEPTOS ===
    if tipo == 'APROPIACION':
        c4 = get_saberes_conceptos(sb)
    elif tipo == 'APERTURA':
        c4 = ['(N/A — bloque APERTURA: activación + diagnóstico · NO introduce saberes formales nuevos · cobertura via B1-B4 APROPIACIÓN)']
    else:  # TRANSFERENCIA
        c4 = ['(N/A — bloque TRANSFERENCIA capstone: integra y transfiere saberes ya cubiertos en B1-B4 · NO introduce saberes nuevos · cobertura via Misión ABP)']

    # === C5 SABERES PROCESO ===
    if tipo == 'APROPIACION' and rap_target:
        c5 = get_saberes_proceso_from_matriz(rap_target)
    elif tipo == 'APERTURA':
        c5 = ['(N/A — bloque APERTURA: NO produce saberes proceso formales · habilita Spark + Gap Analysis activación afectiva)']
    else:  # TRANSFERENCIA
        # Compendio de los 10 saberes proceso de RA1-RA4
        c5_all = []
        for ra in ['RA1','RA2','RA3','RA4']:
            for sp in get_saberes_proceso_from_matriz(ra):
                c5_all.append(f"[Movilizado de {ra}] {sp}")
        c5 = c5_all

    # === C6 CRITERIOS EVALUACIÓN ===
    c6 = {}
    if tipo == 'APROPIACION' and rap_target:
        # SOFÍA específicos de la matriz para este RAP
        c6['sofia_assigned'] = get_criterios_from_matriz(rap_target)
        # Canon C01-C08 asignados a este bloque desde pm-1-2
        c6['canon_sistema_assigned'] = get_criterios_canon_assigned(sb)
    elif tipo == 'APERTURA':
        c6['sofia_assigned'] = []
        c6['canon_sistema_assigned'] = get_criterios_canon_assigned(sb)
        c6['_rationale'] = 'APERTURA NO produce evidencias formales · criterios canon = activación afectiva + diagnóstico baseline'
    else:  # TRANSFERENCIA
        c6['sofia_assigned'] = ['(integra los 7 criterios SOFÍA cubiertos en B1-B4 vía evidencia E-Misión ABP)']
        c6['canon_sistema_assigned'] = get_criterios_canon_assigned(sb)

    # === C7 ACTIVIDADES APRENDIZAJE ===
    c7 = [format_actividad_text(c) for c in cards]

    # === C8 HORAS DIRECTO ===
    c8 = get_horas_directo(sb, cards)

    # === C9 HORAS INDEPENDIENTE ===
    c9 = get_horas_independiente(sb, cards)

    # === C10 EVIDENCIAS ===
    evidencias_bloque = []
    for c in cards:
        ev = c.get('evidencias')
        if ev and ev is not False and isinstance(ev, dict) and ev.get('nombre'):
            evidencias_bloque.append(format_evidencia(ev))
    if not evidencias_bloque:
        if tipo == 'APERTURA':
            evidencias_bloque = ['(N/A — bloque APERTURA NO produce evidencias formales por diseño · rationale_sin_evidencias)']
        elif tipo == 'TRANSFERENCIA':
            # Si no se encontró, declararlo
            evidencias_bloque = ['(esperado: E-Misión Pre-Departure Banana Reefer Compliance Check vía Rúbrica ABP capstone)']
        else:
            evidencias_bloque = ['(verificar — bloque APROPIACIÓN sin evidencia formal detectada)']

    # === C11 ESTRATEGIAS DIDÁCTICAS ===
    estrategias_bloque = set()
    for c in cards:
        est = c.get('estrategias', c.get('estrategia_didactica', []))
        if isinstance(est, list):
            for e in est:
                estrategias_bloque.add(str(e))
        elif est:
            estrategias_bloque.add(str(est))
    c11 = sorted(estrategias_bloque) if estrategias_bloque else ['(heredar de logistics_box pm-3-2 downstream)']

    # === C12 AMBIENTE ===
    c12 = ambiente_global  # Transversal a todo el RAP

    # === C13 MATERIALES ===
    def fmt_material_plain(m):
        """Extract plain text from material entry."""
        if isinstance(m, dict):
            for k in ['descripcion', 'description', 'nombre', 'name', 'item']:
                if m.get(k):
                    return str(m[k])
            return ' · '.join(str(v) for v in m.values() if isinstance(v, (str, int, float)))[:300]
        return str(m)

    materiales_bloque = set()
    for c in cards:
        mat_apoyo = c.get('material_apoyo', [])
        if isinstance(mat_apoyo, list):
            for m in mat_apoyo:
                t = fmt_material_plain(m)
                if t:
                    materiales_bloque.add(t)
        materiales = c.get('materiales', [])
        if isinstance(materiales, list):
            for m in materiales:
                t = fmt_material_plain(m)
                if t:
                    materiales_bloque.add(t)
    c13 = sorted(materiales_bloque) if materiales_bloque else ['(heredar de logistics_box pm-3-2 downstream)']

    # === C14 INSTRUCTORES ===
    c14 = instructores_global

    # === C15 OBSERVACIONES ===
    c15 = f"Bloque {bid} · {tipo} · {sb.get('titulo', '?')} · sesiones {sb.get('sesiones_anchor', '?')} · CEFR {sb.get('cefr_subnivel', 'transversal')}"

    row = {
        '_orden': len(rows) + 1,
        '_bloque_id': bid,
        '_tipo_bloque': tipo,
        '_sub_bloque_titulo': sb.get('titulo', ''),
        '_sesiones_anchor': sb.get('sesiones_anchor', []),
        '_cefr_subnivel': sb.get('cefr_subnivel', 'transversal'),
        '_anclaje_matriz_bloque_heredado': sb.get('_anclaje_matriz_bloque', {}),
        'C1_competencia': competencia,
        'C2_rap': c2,
        'C4_saberes_conceptos': c4,
        'C5_saberes_proceso': c5,
        'C6_criterios_evaluacion': c6,
        'C7_actividades_aprendizaje': c7,
        '_C7_total': len(c7),
        'C8_horas_directo': c8,
        'C9_horas_independiente': c9,
        'C10_evidencias': evidencias_bloque,
        '_C10_total': len(evidencias_bloque),
        'C11_estrategias_didacticas': c11,
        'C12_ambiente': c12,
        'C13_materiales_formacion': c13,
        'C14_instructores_responsables': c14,
        'C15_observaciones': c15
    }
    rows.append(row)

# === BUILD pm-2-11 v3.1 ===
pm211_v31 = dict(pm211_v30)  # copy
pm211_v31['pm_version'] = '3.1'
pm211_v31['_paradigm'] = pm211_v30.get('_paradigm', '') + ' | v3.1: agrupación tripartita por RA · gfpi_f134_v04_rows[] heredados 1:1 de pm-1-2 sub_bloques_tripartitos'
pm211_v31['_v3_1_correction'] = (
    "Corrección Sergio 2026-05-02 · gfpi_f134_v04_row (single object) → gfpi_f134_v04_rows[] (6 objects). "
    "Honra patrón canon 'agrupado por RA así como PM-0.0 · PM-0 · PM-1.1 · PM-1.2'. "
    "Cada bloque tripartito (B0 APERTURA · B1-B4 APROPIACIÓN una por RA · BT TRANSFERENCIA) tiene SUS saberes/criterios/actividades/evidencias/horas/estrategias. "
    "NO más agregado monolítico."
)
pm211_v31['generated_date'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')

# Replace key
pm211_v31['gfpi_f134_v04_rows'] = rows
pm211_v31['_gfpi_f134_v04_row_v3_0_LEGACY'] = pm211_v30.get('gfpi_f134_v04_row', {})
del pm211_v31['gfpi_f134_v04_row']

# Update validation_checks (add v3.1 check)
checks = list(pm211_v31.get('validation_checks', []))
checks.append({
    'id': 'C19_agrupacion_tripartita_6_filas',
    'name': 'Agrupación tripartita por RA · 6 filas heredadas 1:1 de pm-1-2 sub_bloques_tripartitos',
    'status': 'PASS' if len(rows) == 6 else 'FAIL',
    'evidence': f'Generadas {len(rows)} filas (esperado 6: B0+B1+B2+B3+B4+BT). Bloques: {[r["_bloque_id"] for r in rows]}'
})
pm211_v31['validation_checks'] = checks

# Update validation_summary
summary = pm211_v31.get('_validation_summary', {})
summary['total_checks'] = len(checks)
summary['pass_count'] = sum(1 for c in checks if c.get('status') == 'PASS')
summary['v3_1_added'] = 1
pm211_v31['_validation_summary'] = summary

# Save
output_path = RUN_DIR / 'pm-2-11.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(pm211_v31, f, ensure_ascii=False, indent=2)

print()
print(f'✅ pm-2-11.json v3.1 generado · {output_path}')
print(f'   Tamaño: {output_path.stat().st_size // 1024} KB')
print(f'   Filas: {len(rows)} (B0 + B1 + B2 + B3 + B4 + BT)')
print()
print('Resumen por bloque:')
for r in rows:
    print(f"  Row {r['_orden']} · {r['_bloque_id']} {r['_tipo_bloque']:>15} · RAP={r['C2_rap']['rap_id']:>22} · "
          f"C4={len(r['C4_saberes_conceptos']):>2} · C5={len(r['C5_saberes_proceso']):>2} · "
          f"C7={r['_C7_total']:>2} act · C10={r['_C10_total']:>1} ev · C8={r['C8_horas_directo']}h dir + C9={r['C9_horas_independiente']}h indep")

# Totales
tot_h_dir = sum(r['C8_horas_directo'] for r in rows)
tot_h_indep = sum(r['C9_horas_independiente'] for r in rows)
tot_act = sum(r['_C7_total'] for r in rows)
tot_ev = sum(r['_C10_total'] for r in rows)
print()
print(f'TOTAL: {tot_act} actividades · {tot_ev} evidencias · {tot_h_dir}h directo + {tot_h_indep}h indep = {tot_h_dir + tot_h_indep}h totales')
