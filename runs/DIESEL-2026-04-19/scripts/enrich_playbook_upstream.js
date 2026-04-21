#!/usr/bin/env node
/**
 * enrich_playbook_upstream.js
 *
 * PHASE A + B of the Data-Flow Inversion (canon v2.6 + correction 2026-04-20)
 *
 * Goal: move the activity_footer source of truth UPSTREAM.
 *   - PM-3.1 (session-wide) carries: ambiente, momento_sena, estrategia_dominante.
 *   - PM-3.2-sX (activity-wide) carries: estrategia, tecnica, duracion_horas,
 *     materiales[], material_apoyo  — keyed by pm-3-6 activity_id.
 *
 * PM-3.5 / PM-3.6 must then DERIVE the footer from these upstream sources
 * via `derive_activity_footer_from_playbook.js` (Phase C).
 *
 * Why: single source of truth. Currently the footer is duplicated/hardcoded
 * in pm-3-6 and orphaned from the Playbook. This script lifts it back up.
 *
 * Strategy: this is a one-time REVERSE-MIGRATION. We read the current
 * pm-3-6 activity_footers (the best working values we have), group them
 * by their logical session, and deposit:
 *   - session-wide values (ambiente + momento + estrategia dominante)
 *     into pm-3-1.sessions_logistics[s=1..8]
 *   - activity-wide values (estrategia + tecnica + duracion + materiales
 *     + material_apoyo) into pm-3-2-sX.activity_logistics keyed by activity_id.
 *
 * From that point onward pm-3-6 is PURE DERIVED, not authored.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PM31 = path.join(ROOT, 'pm-3-1.json');
const PM36 = path.join(ROOT, 'pm-3-6.json');

// ─── Activity → session mapping (authoritative) ─────────────────────────────
// Based on the pm-3-6 activity_id taxonomy.
function sessionOf(id) {
  if (/^A3\.1\./.test(id)) return 1;     // Reflexión Inicial (S1)
  if (/^A3\.2\./.test(id)) return 1;     // Contextualización  (S1)
  const mSub = id.match(/^A3\.3\.S(\d)\./);
  if (mSub) return parseInt(mSub[1], 10); // Apropiación S2–S5
  if (/^A3\.3b\./.test(id)) return 6;     // Evaluación consolidación (S6)
  // Transferencia S7–S8 — split by sub-phase:
  if (/^A3\.4\.[12]$/.test(id)) return 7; // PLAN, DESIGN → S7
  if (/^A3\.4\.[345]$/.test(id)) return 8; // PERFORM, PRESENT, ASSESS → S8
  return null;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }
function clone(o) { return JSON.parse(JSON.stringify(o)); }

// Walk the pm-3-6 activity tree and harvest every activity as a flat list.
function harvestActivities(pm36) {
  const s3 = pm36.seccion_3_actividades_aprendizaje || {};
  const out = [];
  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      for (const it of obj) {
        if (it && typeof it === 'object' && (it.actividad_id || it.activity_id)) {
          out.push(it);
        } else walk(it);
      }
    } else {
      for (const k of Object.keys(obj)) walk(obj[k]);
    }
  }
  walk(s3);
  return out;
}

// Pick the most representative string in an array (the mode, ties broken by
// first occurrence). Used to aggregate session-wide values from multiple
// activities.
function modeString(arr) {
  const counts = new Map();
  const firstIdx = new Map();
  arr.forEach((v, i) => {
    if (!v) return;
    const k = String(v).trim();
    counts.set(k, (counts.get(k) || 0) + 1);
    if (!firstIdx.has(k)) firstIdx.set(k, i);
  });
  if (!counts.size) return null;
  let best = null, bestCount = -1, bestFirst = Infinity;
  for (const [k, c] of counts) {
    if (c > bestCount || (c === bestCount && firstIdx.get(k) < bestFirst)) {
      best = k; bestCount = c; bestFirst = firstIdx.get(k);
    }
  }
  return best;
}

// ─── Main ───────────────────────────────────────────────────────────────────
(function main() {
  console.log('[enrich_playbook_upstream] START');

  const pm36 = readJson(PM36);
  const pm31 = readJson(PM31);

  const activities = harvestActivities(pm36);
  console.log('  harvested', activities.length, 'activities from pm-3-6');

  // Group activities by session
  const bySession = new Map();
  for (const act of activities) {
    const id = act.actividad_id || act.activity_id;
    const s = sessionOf(id);
    if (!s) { console.warn('  ⚠ no session mapping for', id); continue; }
    if (!bySession.has(s)) bySession.set(s, []);
    bySession.get(s).push(act);
  }

  // ────────────────────────────────────────────────────────────────────────
  // PHASE A — populate pm-3-1.sessions_logistics[s=1..8]
  // Session-wide keys: ambiente, momento_sena, estrategia_dominante
  // Sources (priority):
  //   1) pm-3-1.logistics_box_summary.ambiente_por_sesion[s-1]  (canonical)
  //   2) pm-3-2-sX.momento_sena / estrategia_didactica          (canonical)
  //   3) fallback: mode of activity_footer values from pm-3-6
  // ────────────────────────────────────────────────────────────────────────
  const ambienteBySession = {};
  const ambList = (pm31.logistics_box_summary && pm31.logistics_box_summary.ambiente_por_sesion) || [];
  ambList.forEach(e => { if (e && e.s) ambienteBySession[e.s] = e.ambiente; });

  const estrategiaDomBySession = {};
  const estArr = (pm31.estrategias_resumen && pm31.estrategias_resumen.estrategia_dominante_por_sesion) || [];
  estArr.forEach(e => { if (e && e.session) estrategiaDomBySession[e.session] = e.estrategia; });

  const sessionsLogistics = [];
  for (let s = 1; s <= 8; s++) {
    const pm32Path = path.join(ROOT, `pm-3-2-s${s}.json`);
    const pm32 = fs.existsSync(pm32Path) ? readJson(pm32Path) : null;
    const acts = bySession.get(s) || [];

    // ambiente — prefer PM-3.1 summary, fallback to activity_footer mode
    const ambiente = ambienteBySession[s] ||
      modeString(acts.map(a => a.activity_footer && a.activity_footer.ambiente)) ||
      'Ambiente convencional (aula)';

    // momento_sena — prefer PM-3.2 session-level
    const momento_sena = (pm32 && pm32.momento_sena) || null;

    // estrategia_dominante — prefer PM-3.1 estrategias_resumen, fallback to PM-3.2, then footer mode
    const estrategia_dominante = estrategiaDomBySession[s] ||
      (pm32 && pm32.estrategia_didactica) ||
      modeString(acts.map(a => a.activity_footer && a.activity_footer.estrategia)) ||
      null;

    sessionsLogistics.push({
      s,
      ambiente,
      momento_sena,
      estrategia_dominante,
      note: 'Session-wide logistics. Derived DOWNSTREAM in pm-3-6 activity_footer.'
    });
  }
  pm31.sessions_logistics = sessionsLogistics;

  // Add contract note at top level so future generators know where to read.
  pm31.data_flow_contract = pm31.data_flow_contract || {};
  pm31.data_flow_contract.activity_footer = {
    canon_version: '2.6-dataflow-inversion-2026-04-20',
    principle: 'Activity footer in pm-3-6 is DERIVED, not authored.',
    session_wide_source: 'pm-3-1.sessions_logistics[s]',
    activity_wide_source: 'pm-3-2-sX.activity_logistics[activity_id]',
    evidence_lookup_source: 'pm-4-1.instrument_{1..5}_* + pm-4-2 for E6',
    deriver_script: 'scripts/derive_activity_footer_from_playbook.js'
  };

  // ────────────────────────────────────────────────────────────────────────
  // PHASE B — populate pm-3-2-sX.activity_logistics[activity_id]
  // Activity-wide keys: estrategia, tecnica, duracion_horas, materiales[],
  //                     material_apoyo, nombre_short
  // Source: reverse-migrate from current pm-3-6 activity_footer.
  // ────────────────────────────────────────────────────────────────────────
  const perSessionReport = [];
  for (let s = 1; s <= 8; s++) {
    const pm32Path = path.join(ROOT, `pm-3-2-s${s}.json`);
    if (!fs.existsSync(pm32Path)) {
      console.warn(`  ⚠ pm-3-2-s${s}.json not found, skipping`);
      continue;
    }
    const pm32 = readJson(pm32Path);
    const acts = bySession.get(s) || [];

    const actLogistics = {};
    for (const act of acts) {
      const id = act.actividad_id || act.activity_id;
      const f = act.activity_footer || {};
      // Prefer explicit `materiales` array at activity-level, else split footer string.
      let materiales = [];
      if (Array.isArray(act.materiales) && act.materiales.length) {
        materiales = act.materiales.slice();
      } else if (f.materiales) {
        materiales = String(f.materiales).split(/\s*,\s*/).filter(Boolean);
      }

      actLogistics[id] = {
        nombre_short: (act.nombre_aprendiz || '').slice(0, 80),
        estrategia: f.estrategia || null,
        tecnica: f.tecnica || null,
        duracion_horas: f.duracion_horas || (act.tiempo_min ? +(act.tiempo_min / 60).toFixed(2) + ' horas' : null),
        materiales,
        material_apoyo: f.material_apoyo || 'no aplica',
        produce_evidencia: act.produce_evidencia === true
      };
    }

    pm32.activity_logistics = actLogistics;

    // Add a small contract note on the session file too
    pm32.data_flow_contract = pm32.data_flow_contract || {};
    pm32.data_flow_contract.activity_logistics = {
      canon_version: '2.6-dataflow-inversion-2026-04-20',
      keyed_by: 'pm-3-6 activity_id',
      consumed_by: 'scripts/derive_activity_footer_from_playbook.js'
    };

    writeJson(pm32Path, pm32);
    perSessionReport.push({ s, activities_enriched: Object.keys(actLogistics).length });
  }

  writeJson(PM31, pm31);

  console.log('[enrich_playbook_upstream] DONE');
  console.log('  pm-3-1.sessions_logistics populated for 8 sessions');
  console.log('  pm-3-2-sX.activity_logistics populated:');
  perSessionReport.forEach(r => console.log(`    S${r.s}: ${r.activities_enriched} activities`));
  const total = perSessionReport.reduce((a, b) => a + b.activities_enriched, 0);
  console.log('  TOTAL activity_logistics entries:', total, '(expected 30)');
})();
