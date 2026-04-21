#!/usr/bin/env node
/**
 * derive_activity_footer_from_playbook.js
 *
 * PHASE C of the Data-Flow Inversion (canon v2.6 + correction 2026-04-20)
 *
 * Reads upstream:
 *   - pm-3-1.sessions_logistics[s]            → ambiente, momento_sena, estrategia
 *   - pm-3-2-sX.activity_logistics[act_id]    → tecnica, duracion, materiales, material_apoyo
 *   - pm-4-1.instrument_{1..5}_*              → evidence E1–E5 (technique + instrument)
 *   - pm-4-2.*                                → evidence E6 (Cuestionario Consolidado)
 *
 * Rewrites every activity_footer in pm-3-6 (and pm-3-5 if present) so that
 * it is 100% derived from upstream. For the 6 evidence-producing activities
 * it ALSO appends an `evidencia` block with: code, name, tipo_sena,
 * tecnica_evaluacion, instrumento.
 *
 * After this runs, the footer in pm-3-6 is a view, not a truth.
 *
 * Idempotent: running it twice on an already-derived pm-3-6 is a no-op.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PM31 = path.join(ROOT, 'pm-3-1.json');
const PM36 = path.join(ROOT, 'pm-3-6.json');
const PM35 = path.join(ROOT, 'pm-3-5.json');
const PM41 = path.join(ROOT, 'pm-4-1.json');
const PM42 = path.join(ROOT, 'pm-4-2.json');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }

// ─── Activity → session mapping (same rule as enrich_playbook_upstream.js) ──
function sessionOf(id) {
  if (/^A3\.1\./.test(id)) return 1;
  if (/^A3\.2\./.test(id)) return 1;
  const mSub = id.match(/^A3\.3\.S(\d)\./);
  if (mSub) return parseInt(mSub[1], 10);
  if (/^A3\.3b\./.test(id)) return 6;
  if (/^A3\.4\.[12]$/.test(id)) return 7;
  if (/^A3\.4\.[345]$/.test(id)) return 8;
  return null;
}

// ─── Evidence map — which activity_id yields which formal evidence ──────────
// Source: canon E1–E6, PM-4.1 / PM-4.2 identity.
const EVIDENCE_MAP = {
  'A3.3.S2.4': { code: 'E1', instrument_source: 'pm-4-1', instrument_key: 'instrument_1_reading' },
  'A3.3.S3.4': { code: 'E2', instrument_source: 'pm-4-1', instrument_key: 'instrument_2_writing' },
  'A3.3.S4.2': { code: 'E3', instrument_source: 'pm-4-1', instrument_key: 'instrument_3_listening' },
  'A3.3.S4.4': { code: 'E4', instrument_source: 'pm-4-1', instrument_key: 'instrument_4_speaking' },
  'A3.3.S5.3': { code: 'E5', instrument_source: 'pm-4-1', instrument_key: 'instrument_5_language_functions' },
  'A3.3b.2':   { code: 'E6', instrument_source: 'pm-4-2', instrument_key: null }
};

// Resolve an evidence block from the instrument sources.
function resolveEvidence(actId, pm41, pm42) {
  const meta = EVIDENCE_MAP[actId];
  if (!meta) return null;
  if (meta.instrument_source === 'pm-4-1') {
    const ins = pm41[meta.instrument_key];
    if (!ins) return null;
    return {
      codigo: meta.code,
      nombre: ins.instrument_name_es || `Instrumento ${meta.code}`,
      tipo_sena: ins.evidence_type_sena || null,
      tecnica_evaluacion: ins.evaluation_technique || null,
      instrumento: ins.instrument_name_es || null,
      instrument_code: ins.instrument_code || null
    };
  }
  if (meta.instrument_source === 'pm-4-2') {
    return {
      codigo: meta.code,
      nombre: 'Cuestionario Técnico Consolidado',
      tipo_sena: 'Conocimiento',
      tecnica_evaluacion: 'Preguntas',
      instrumento: 'Cuestionario Técnico Consolidado (25 pts · 5 secciones × 5 ítems × 1 pt)',
      instrument_code: 'PM-4.2'
    };
  }
  return null;
}

// ─── Build the canonical footer object from upstream data ───────────────────
function buildFooter({ sessLog, actLog, evidence }) {
  const f = {
    ambiente: sessLog ? sessLog.ambiente : null,
    estrategia: (actLog && actLog.estrategia) || (sessLog && sessLog.estrategia_dominante) || null,
    tecnica: actLog ? actLog.tecnica : null,
    duracion_horas: actLog ? actLog.duracion_horas : null,
    materiales: actLog && actLog.materiales && actLog.materiales.length
      ? actLog.materiales.join(', ')
      : null,
    material_apoyo: (actLog && actLog.material_apoyo) || 'no aplica'
  };
  if (evidence) f.evidencia = evidence;
  return f;
}

// Walk pm-3-6 / pm-3-5 activity tree and rewrite every activity_footer.
function deriveFootersInDocument(doc, rootKey, pm31, pm32Map, pm41, pm42, stats) {
  const root = doc[rootKey];
  if (!root) return;
  const sessionsLogisticsByS = new Map(
    (pm31.sessions_logistics || []).map(e => [e.s, e])
  );

  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      for (const it of obj) {
        if (it && typeof it === 'object' && (it.actividad_id || it.activity_id)) {
          const id = it.actividad_id || it.activity_id;
          const s = sessionOf(id);
          const sessLog = s ? sessionsLogisticsByS.get(s) : null;
          const pm32 = s ? pm32Map.get(s) : null;
          const actLog = pm32 && pm32.activity_logistics ? pm32.activity_logistics[id] : null;
          if (!actLog) {
            stats.missing_activity_logistics.push(id);
          }
          const isEvidence = EVIDENCE_MAP[id] !== undefined;
          const evidence = isEvidence ? resolveEvidence(id, pm41, pm42) : null;

          it.activity_footer = buildFooter({ sessLog, actLog, evidence });

          stats.rewritten++;
          if (evidence) stats.with_evidence++;
        } else walk(it);
      }
    } else {
      for (const k of Object.keys(obj)) walk(obj[k]);
    }
  }
  walk(root);
}

// ─── Main ───────────────────────────────────────────────────────────────────
(function main() {
  console.log('[derive_activity_footer_from_playbook] START');

  const pm31 = readJson(PM31);
  const pm41 = readJson(PM41);
  const pm42 = readJson(PM42);

  // Load all 8 pm-3-2-sX
  const pm32Map = new Map();
  for (let s = 1; s <= 8; s++) {
    const p = path.join(ROOT, `pm-3-2-s${s}.json`);
    if (fs.existsSync(p)) pm32Map.set(s, readJson(p));
  }

  const stats = { rewritten: 0, with_evidence: 0, missing_activity_logistics: [] };

  // PM-3.6 — learner guide
  const pm36 = readJson(PM36);
  deriveFootersInDocument(pm36, 'seccion_3_actividades_aprendizaje', pm31, pm32Map, pm41, pm42, stats);

  // Add a top-level contract flag so future readers know the footer is derived.
  pm36.data_flow_contract = pm36.data_flow_contract || {};
  pm36.data_flow_contract.activity_footer = {
    canon_version: '2.6-dataflow-inversion-2026-04-20',
    origin: 'DERIVED',
    upstream_session_wide: 'pm-3-1.sessions_logistics[s]',
    upstream_activity_wide: 'pm-3-2-sX.activity_logistics[activity_id]',
    evidence_lookup: 'pm-4-1.instrument_{1..5}_* + pm-4-2 (E6)',
    regenerator: 'scripts/derive_activity_footer_from_playbook.js',
    principle: 'DO NOT edit activity_footer directly in pm-3-6. Edit upstream and re-run deriver.'
  };

  writeJson(PM36, pm36);
  console.log('  pm-3-6.json   → rewritten', stats.rewritten, 'footers (evidence:', stats.with_evidence + ')');

  // PM-3.5 — Final Mission; reset stats, some activities may live here too.
  if (fs.existsSync(PM35)) {
    const pm35 = readJson(PM35);
    const stats35 = { rewritten: 0, with_evidence: 0, missing_activity_logistics: [] };
    // pm-3-5 uses a different top key — try common ones
    const root35 = pm35.seccion_3_actividades_aprendizaje
      ? 'seccion_3_actividades_aprendizaje'
      : (pm35.actividades ? 'actividades' : null);
    if (root35) {
      deriveFootersInDocument(pm35, root35, pm31, pm32Map, pm41, pm42, stats35);
      pm35.data_flow_contract = pm35.data_flow_contract || {};
      pm35.data_flow_contract.activity_footer = pm36.data_flow_contract.activity_footer;
      writeJson(PM35, pm35);
      console.log('  pm-3-5.json   → rewritten', stats35.rewritten, 'footers (evidence:', stats35.with_evidence + ')');
    } else {
      console.log('  pm-3-5.json   → no activity root found, skipping');
    }
  }

  if (stats.missing_activity_logistics.length) {
    console.log('  ⚠ missing activity_logistics for:', stats.missing_activity_logistics.join(', '));
  }

  console.log('[derive_activity_footer_from_playbook] DONE');
})();
