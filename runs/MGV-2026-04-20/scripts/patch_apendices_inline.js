#!/usr/bin/env node
/**
 * patch_apendices_inline.js — Ciclo 2 (Canon v2.6 REGLA 11/12)
 * ------------------------------------------------------------------
 * Añade el campo `apendices_referenciados: [appendix_key]` a cada
 * actividad que consume apéndices, para que renderContenidoInline()
 * los embeba dentro de la actividad (doble-render: inline + índice).
 *
 * Mapa canónico MGV G1:
 *   S2.1 (Toolbelt intro)      → apendice_d  (reference — full en S2.3)
 *   S2.2 (Master Anchor)       → apendice_a  (full)
 *   S2.3 (Classification Drill)→ apendice_d  (full)
 *   S3.2 (Font Card Modeling)  → apendice_b  (full)
 *   S4.2 (Listening Sophia)    → apendice_c  (full)
 *   S6.4 (Bridge)              → apendice_e  (reference — full en S7.1)
 *   S7.1 (PLAN Mission)        → apendice_e + apendice_f  (full)
 *   S8.5 (ASSESS Reflection)   → apendice_g  (full)
 *
 * Canon: mantiene apendices_embebidos top-level como índice.
 */

const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';
const PM36_PATH = path.join(RUN_DIR, 'pm-3-6.json');

const MAP = {
  // S2 — Reading + Vocabulary (subseccion_3_3_apropiacion_s2_a_s5 → sesion_2_reading_vocabulary)
  'A3.3.S2.1': ['apendice_d_toolbelt_20_terms_visual'],
  'A3.3.S2.2': ['apendice_a_master_anchor_text'],
  'A3.3.S2.3': ['apendice_d_toolbelt_20_terms_visual'],
  // S3 — Writing + Grammar
  'A3.3.S3.2': ['apendice_b_andres_sample_font_card'],
  // S4 — Listening + Speaking
  'A3.3.S4.2': ['apendice_c_sophia_laura_color_conversation'],
  // S6 — Bridge to Final Mission
  'A3.3b.4': ['apendice_e_final_mission_brief'],
  // S7 — PLAN (Transferencia)
  'A3.4.1': ['apendice_e_final_mission_brief', 'apendice_f_sample_planning_canvas'],
  // S8 — ASSESS
  'A3.4.5': ['apendice_g_self_reflection_card'],
};

function walk(obj, patched) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    for (const item of obj) walk(item, patched);
    return;
  }
  // Es una actividad si tiene actividad_id
  if (obj.actividad_id && MAP[obj.actividad_id]) {
    obj.apendices_referenciados = MAP[obj.actividad_id].slice();
    patched.push({ id: obj.actividad_id, refs: obj.apendices_referenciados });
  }
  for (const [k, v] of Object.entries(obj)) walk(v, patched);
}

const data = JSON.parse(fs.readFileSync(PM36_PATH, 'utf8'));
const patched = [];
walk(data, patched);

// Meta tracking
data.pm_version = (data.pm_version || '1.0.0').replace(/\d+$/, m => String(+m + 1));
data._ciclo_2_patch = {
  applied_at: new Date().toISOString().split('T')[0],
  regla_canon: 'REGLA 11/12 — doble render (inline + índice)',
  actividades_patcheadas: patched.length,
  mapping: MAP,
};

fs.writeFileSync(PM36_PATH, JSON.stringify(data, null, 2));

console.log(`Ciclo 2 patch applied — ${patched.length} activities now reference appendices inline:\n`);
for (const p of patched) {
  console.log(`  ${p.id.padEnd(12)} → ${p.refs.join(', ')}`);
}
console.log(`\npm-3-6.json updated: pm_version=${data.pm_version}`);
