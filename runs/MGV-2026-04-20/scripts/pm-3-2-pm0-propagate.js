#!/usr/bin/env node
/**
 * pm-3-2-pm0-propagate.js — FPI CD Engine v2.5.1 canonical propagation script
 *
 * Run: node pm-3-2-pm0-propagate.js [session_number | all]
 *
 * Closes BUG-PM31-001. Takes pm-3-1.json.pm0_alignment_by_session[n-1]
 * and injects it into pm-3-2-sN.json.pm0_protocol using the mapping
 * declared in pm_3_2_propagation_contract.
 *
 * This replaces the retroactive patch pm-3-2-pm0-patch.js used in DIESEL.
 * In v2.5.1, Outline (PM-3.1) is the SOURCE OF TRUTH; Build-Out (PM-3.2)
 * inherits without redefining.
 */
const fs = require('fs');
const path = require('path');

const RUN_DIR = path.resolve(__dirname, '..');
const P31 = path.join(RUN_DIR, 'pm-3-1.json');

function mapAlignmentToProtocol(alignment) {
  return {
    __inherited_from__: 'pm-3-1.json.pm0_alignment_by_session[' + (alignment.session - 1) + ']',
    __contract_version__: 'v2.5.1',
    grammar_groups: alignment.grammar_groups_active.map(g => ({
      group_id: g.group_id,
      group_name: g.group_name,
      nivel_activacion: g.nivel_activacion,
      ejemplo_en_sesion: g.ejemplo_en_sesion,
    })),
    grammar_carga_check: alignment.grammar_carga_check,
    feedback: {
      mode: alignment.dominant_feedback_mode.mode,
      rationale: alignment.dominant_feedback_mode.rationale,
      accuracy_techniques: alignment.dominant_feedback_mode.mode.includes('ACCURACY')
        ? alignment.dominant_feedback_mode.techniques
        : [],
      fluency_techniques: alignment.dominant_feedback_mode.mode.includes('FLUENCY')
        ? alignment.dominant_feedback_mode.techniques
        : [],
      mixed_techniques: alignment.dominant_feedback_mode.mode.includes('MIXTO')
        ? alignment.dominant_feedback_mode.techniques
        : [],
    },
    l1_management: {
      l1_percentage: alignment.l1_percentage_target.value,
      l1_percentage_unit: '%',
      source: alignment.l1_percentage_target.source,
      l1_rationale: alignment.l1_percentage_target.rationale,
    },
    stress_pronunciation: {
      focus_words: alignment.stress_focus.target_words,
      techniques: alignment.stress_focus.techniques,
      source: alignment.stress_focus.source,
    },
    success_vocabulary: {
      target_words: alignment.success_factors_priorized.target_vocabulary,
      factors_applied: alignment.success_factors_priorized.factors_applied,
      operationalization: alignment.success_factors_priorized.operationalization,
      source: alignment.success_factors_priorized.source,
    },
    cefr_descriptor_focus: alignment.cefr_descriptor_focus,
    pedagogical_shift_hooks: alignment.pedagogical_shift_hooks,
    traceability_seed_22: alignment.traceability_seed_22,
  };
}

function loadOutline() {
  return JSON.parse(fs.readFileSync(P31, 'utf8'));
}

function propagateTo(session) {
  const outline = loadOutline();
  const alignment = outline.pm0_alignment_by_session.find(s => s.session === session);
  if (!alignment) throw new Error('No alignment for session ' + session + ' in pm-3-1.json');
  const buildOutPath = path.join(RUN_DIR, `pm-3-2-s${session}.json`);
  if (!fs.existsSync(buildOutPath)) {
    console.log(`[skip] ${buildOutPath} does not exist yet`);
    return null;
  }
  const buildOut = JSON.parse(fs.readFileSync(buildOutPath, 'utf8'));
  buildOut.pm0_protocol = mapAlignmentToProtocol(alignment);
  fs.writeFileSync(buildOutPath, JSON.stringify(buildOut, null, 2));
  console.log(`[ok] injected pm0_protocol into ${path.basename(buildOutPath)} (mode=${alignment.dominant_feedback_mode.mode}, L1=${alignment.l1_percentage_target.value}%)`);
  return buildOut.pm0_protocol;
}

function validatePropagation() {
  const outline = loadOutline();
  const report = { timestamp: new Date().toISOString(), sessions: [] };
  for (const a of outline.pm0_alignment_by_session) {
    const bp = path.join(RUN_DIR, `pm-3-2-s${a.session}.json`);
    if (!fs.existsSync(bp)) {
      report.sessions.push({ session: a.session, status: 'MISSING_BUILDOUT' });
      continue;
    }
    const bo = JSON.parse(fs.readFileSync(bp, 'utf8'));
    const p = bo.pm0_protocol;
    if (!p) {
      report.sessions.push({ session: a.session, status: 'NO_PM0_PROTOCOL' });
      continue;
    }
    const l1ok = p.l1_management && p.l1_management.l1_percentage === a.l1_percentage_target.value;
    const fbok = p.feedback && p.feedback.mode === a.dominant_feedback_mode.mode;
    const grok = p.grammar_groups && p.grammar_groups.length === a.grammar_groups_active.length;
    report.sessions.push({
      session: a.session,
      status: (l1ok && fbok && grok) ? 'PASS' : 'FAIL',
      checks: { l1_match: l1ok, feedback_match: fbok, grammar_count_match: grok },
    });
  }
  const allPass = report.sessions.every(s => s.status === 'PASS' || s.status === 'MISSING_BUILDOUT');
  report.overall = allPass ? 'PASS (or deferred)' : 'FAIL';
  fs.writeFileSync(path.join(RUN_DIR, 'pm-3-2-pm0-propagation-report.json'), JSON.stringify(report, null, 2));
  console.log('[validation]', report.overall);
  for (const s of report.sessions) console.log(`  S${s.session}: ${s.status}`);
  return report;
}

const arg = process.argv[2] || 'all';
if (arg === 'all') {
  for (let s = 1; s <= 8; s++) propagateTo(s);
  validatePropagation();
} else if (arg === 'validate') {
  validatePropagation();
} else {
  propagateTo(parseInt(arg, 10));
}
