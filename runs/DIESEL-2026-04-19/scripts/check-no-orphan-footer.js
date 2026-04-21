#!/usr/bin/env node
/**
 * check-no-orphan-footer.js
 *
 * Regression guard for the data-flow inversion canon (v2.6, 2026-04-20).
 *
 * An "orphan footer" is an activity_footer in pm-3-6 whose logistic values
 * (ambiente / estrategia / tecnica / materiales / material_apoyo / duracion)
 * do NOT match the upstream source of truth:
 *
 *   - Session-wide values     → pm-3-1.sessions_logistics[s]
 *   - Activity-wide values    → pm-3-2-sX.activity_logistics[activity_id]
 *   - Evidence block (if any) → pm-4-1 / pm-4-2
 *
 * If values diverge, SOMEONE edited pm-3-6 directly — that breaks the
 * contract. Fix: edit upstream (PM-3.1 or PM-3.2) and re-run
 * `derive_activity_footer_from_playbook.js`.
 *
 * Exits with code 1 if any orphan is detected.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Same session mapping as the deriver — KEEP IN SYNC.
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

// KEEP IN SYNC with the deriver EVIDENCE_MAP.
const EVIDENCE_MAP = {
  'A3.3.S2.4': { code: 'E1', instrument_source: 'pm-4-1', instrument_key: 'instrument_1_reading' },
  'A3.3.S3.4': { code: 'E2', instrument_source: 'pm-4-1', instrument_key: 'instrument_2_writing' },
  'A3.3.S4.2': { code: 'E3', instrument_source: 'pm-4-1', instrument_key: 'instrument_3_listening' },
  'A3.3.S4.4': { code: 'E4', instrument_source: 'pm-4-1', instrument_key: 'instrument_4_speaking' },
  'A3.3.S5.3': { code: 'E5', instrument_source: 'pm-4-1', instrument_key: 'instrument_5_language_functions' },
  'A3.3b.2':   { code: 'E6', instrument_source: 'pm-4-2', instrument_key: null }
};

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function harvestActivities(pm36) {
  const out = [];
  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      for (const it of obj) {
        if (it && typeof it === 'object' && (it.actividad_id || it.activity_id)) out.push(it);
        else walk(it);
      }
    } else for (const k of Object.keys(obj)) walk(obj[k]);
  }
  walk(pm36.seccion_3_actividades_aprendizaje);
  return out;
}

function normMats(v) {
  if (!v) return '';
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

(function main() {
  const pm31 = readJson(path.join(ROOT, 'pm-3-1.json'));
  const pm36 = readJson(path.join(ROOT, 'pm-3-6.json'));
  const pm41 = readJson(path.join(ROOT, 'pm-4-1.json'));
  const pm42 = readJson(path.join(ROOT, 'pm-4-2.json'));

  const sessMap = new Map((pm31.sessions_logistics || []).map(e => [e.s, e]));
  const pm32Map = new Map();
  for (let s = 1; s <= 8; s++) {
    const p = path.join(ROOT, `pm-3-2-s${s}.json`);
    if (fs.existsSync(p)) pm32Map.set(s, readJson(p));
  }

  const activities = harvestActivities(pm36);
  const problems = [];

  for (const act of activities) {
    const id = act.actividad_id || act.activity_id;
    const f = act.activity_footer || {};
    const s = sessionOf(id);
    const sessLog = s ? sessMap.get(s) : null;
    const pm32 = s ? pm32Map.get(s) : null;
    const actLog = pm32 && pm32.activity_logistics ? pm32.activity_logistics[id] : null;

    if (!sessLog) { problems.push({ id, issue: 'no pm-3-1.sessions_logistics for session ' + s }); continue; }
    if (!actLog)  { problems.push({ id, issue: 'no pm-3-2-s' + s + '.activity_logistics[' + id + ']' }); continue; }

    // Expected values
    const expected = {
      ambiente: sessLog.ambiente,
      estrategia: actLog.estrategia || sessLog.estrategia_dominante,
      tecnica: actLog.tecnica,
      duracion_horas: actLog.duracion_horas,
      materiales: normMats(actLog.materiales),
      material_apoyo: actLog.material_apoyo
    };

    for (const k of Object.keys(expected)) {
      const ev = expected[k];
      const av = k === 'materiales' ? normMats(f.materiales) : f[k];
      if ((ev == null && av == null) || (ev == null && av === '')) continue;
      if (String(ev || '') !== String(av || '')) {
        problems.push({
          id, issue: `footer.${k} mismatch`,
          expected: String(ev).slice(0, 80),
          actual: String(av).slice(0, 80)
        });
      }
    }

    // Evidence block check
    const em = EVIDENCE_MAP[id];
    if (em) {
      if (!f.evidencia) {
        problems.push({ id, issue: `missing evidencia block (canonical: ${em.code})` });
      } else {
        let expCodigo = em.code;
        let expNombre, expTipo, expTec, expInstr;
        if (em.instrument_source === 'pm-4-1') {
          const ins = pm41[em.instrument_key];
          if (!ins) {
            problems.push({ id, issue: `pm-4-1.${em.instrument_key} missing` });
          } else {
            expNombre = ins.instrument_name_es;
            expTipo = ins.evidence_type_sena;
            expTec = ins.evaluation_technique;
            expInstr = ins.instrument_name_es;
          }
        } else if (em.instrument_source === 'pm-4-2') {
          expNombre = 'Cuestionario Técnico Consolidado';
          expTipo = 'Conocimiento';
          expTec = 'Preguntas';
          expInstr = 'Cuestionario Técnico Consolidado (25 pts · 5 secciones × 5 ítems × 1 pt)';
        }
        const evP = f.evidencia;
        if (evP.codigo !== expCodigo) problems.push({ id, issue: `evidencia.codigo ${evP.codigo} ≠ ${expCodigo}` });
        if (expTipo && evP.tipo_sena !== expTipo) problems.push({ id, issue: `evidencia.tipo_sena ${evP.tipo_sena} ≠ ${expTipo}` });
        if (expTec && evP.tecnica_evaluacion !== expTec) problems.push({ id, issue: `evidencia.tecnica_evaluacion ${evP.tecnica_evaluacion} ≠ ${expTec}` });
        if (expInstr && evP.instrumento !== expInstr) problems.push({ id, issue: `evidencia.instrumento ${(evP.instrumento||'').slice(0,60)} ≠ ${expInstr.slice(0,60)}` });
      }
    } else if (f.evidencia) {
      problems.push({ id, issue: 'has evidencia block but is NOT in EVIDENCE_MAP' });
    }
  }

  if (problems.length) {
    console.error(`[check-no-orphan-footer] ✗ ${problems.length} problem(s):`);
    problems.forEach(p => {
      const extras = p.expected ? `\n    expected: ${p.expected}\n    actual:   ${p.actual}` : '';
      console.error(`  - ${p.id}: ${p.issue}${extras}`);
    });
    console.error('\nFIX: edit upstream (pm-3-1.sessions_logistics or pm-3-2-sX.activity_logistics),');
    console.error('then re-run scripts/derive_activity_footer_from_playbook.js.');
    process.exit(1);
  }

  console.log(`[check-no-orphan-footer] ✓ ${activities.length} footers coherent with upstream`);
  const evCount = activities.filter(a => EVIDENCE_MAP[a.actividad_id || a.activity_id]).length;
  console.log(`  evidence blocks verified: ${evCount}/6`);
})();
