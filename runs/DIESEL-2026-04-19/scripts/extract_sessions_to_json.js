#!/usr/bin/env node
/**
 * extract_sessions_to_json.js — Fase 2 DIESEL-04-19 v2.6.6 upgrade
 *
 * Parsea los 7 .md narrativos de PM-3.2 (pm-3-2-s1.md..s6a.md + pm-3-2-s6b-s8.md)
 * y emite 8 JSONs canónicos schema v2.6.6: pm-3-2-s1.json..pm-3-2-s8.json
 *
 * Mapping:
 *   s1.md → s1.json
 *   s2.md → s2.json
 *   s3.md → s3.json
 *   s4.md → s4.json
 *   s5.md → s5.json
 *   s6a.md + (§4 "S6b — ORIENTACIÓN" de s6b-s8.md) → s6.json
 *   (§5 "S7 — PREPARACIÓN" de s6b-s8.md) → s7.json
 *   (§6 "S8 — THE FINAL MISSION" de s6b-s8.md) → s8.json
 *
 * Estrategia de extracción:
 * - Metadata granular: extraída programáticamente del frontmatter bold (PM, Fase SENA, L1, Gramática, Evidencias, Duración)
 * - Secciones 1-9: preservadas como body_markdown (sin rewrite)
 * - pm0_protocol: skeleton __pending_fase_3__ (se puebla con pm-3-2-pm0-patch.js post Fase 3)
 * - activity_logistics: {} (se puebla en Fase 3 desde pm-3-6.json)
 * - data_flow_contract: canon v2.6
 *
 * Preserva 100% del contenido pedagógico DIESEL — no hay rewrites ni traducciones.
 */

const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19';
const RUN_ID = 'DIESEL-2026-04-19';
const PROGRAMA = 'Mantenimiento de Motores Diesel';
const PROGRAMA_CODIGO = '';   // no registrado en pm-1-1 DIESEL (vacío)
const GUIDE = 'G1 — The Workshop Specialist';
const GUIA_NUMERO = 1;
const CEFR = 'A1.1';
const MODEL = 'claude-opus-4-7';
const GENERATED_AT = '2026-04-21';
const GENERATED_BY = 'Instructor Sergio Cortés Perdomo';
const PM_VERSION = '2.6.6';
const PM_VERIFIED = 'PM-3.2 — Playbook Build-Out — Step by Step.md (Required Output Schema v2.6.6)';

// ---- helpers ----

/** Parse H2 sections from markdown. Returns array of {heading_raw, heading_id, body}. */
function splitH2Sections(md) {
  const lines = md.split('\n');
  const sections = [];
  let current = null;
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      if (current) sections.push(current);
      current = { heading_raw: m[1].trim(), heading_id: null, body_lines: [] };
      // extract H2 id (first token like "1.", "2.", "3.", "NOTA", etc.)
      const idm = m[1].match(/^(\d+\.|[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]+)/);
      if (idm) current.heading_id = idm[1].replace(/\.$/, '');
    } else if (current) {
      current.body_lines.push(line);
    }
  }
  if (current) sections.push(current);
  // trim empty trailing lines
  for (const s of sections) {
    while (s.body_lines.length && s.body_lines[s.body_lines.length - 1].trim() === '') s.body_lines.pop();
    s.body = s.body_lines.join('\n');
    delete s.body_lines;
  }
  return sections;
}

/** Parse the frontmatter block (H1 + bold lines before first H2). */
function parseFrontmatter(md) {
  const fmEnd = md.indexOf('\n## ');
  const fm = fmEnd >= 0 ? md.slice(0, fmEnd) : md;
  const lines = fm.split('\n');

  const h1 = (lines[0] || '').replace(/^#\s+/, '').trim();

  // H1 looks like "PM-3.2 — S1: The Wake-Up Call"
  // extract session label + session_name
  const h1m = h1.match(/^PM-3\.2\s+—\s+(S[0-9a-z+]+(?:\s*\+\s*S[0-9]+)*)\s*:\s*(.+)$/);
  const sessionLabel = h1m ? h1m[1] : null;
  const sessionName = h1m ? h1m[2].trim() : h1;

  const meta = {};
  for (const line of lines.slice(1)) {
    const m = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
    if (m) meta[m[1].trim()] = m[2].trim();
  }

  // parse "Duración: 300 min instructivos (6h SENA) + 20 min break = 320 min pared"
  let duracion_min = null;
  if (meta['Duración']) {
    const dm = meta['Duración'].match(/(\d+)\s*min\s*instructivos/);
    if (dm) duracion_min = parseInt(dm[1], 10);
  }

  // parse "L1 máx.: 30% · Gramática activa: ..."
  let l1_max_pct = null, gramatica_activa = null;
  if (meta['L1 máx.']) {
    const lm = meta['L1 máx.'].match(/(\d+)\s*%/);
    if (lm) l1_max_pct = parseInt(lm[1], 10);
    const gm = meta['L1 máx.'].match(/Gramática activa:\s*\*?\*?(.+?)$/);
    if (gm) gramatica_activa = gm[1].trim();
  }

  // parse "Fase SENA: Reflexión Inicial (3.1) + Contextualización (3.2)"
  const momento_sena = meta['Fase SENA'] || null;

  // parse "PMs: PM-2.1 (The Spark) + PM-2.2 (Gap Analysis)"
  const pms = meta['PMs'] || null;

  // parse "Evidencias: Cuestionario No 1 (Reading — 5 pts, Evidencia de Conocimiento)"
  const evidencias_raw = meta['Evidencias'] || null;

  return {
    h1_raw: h1,
    session_label: sessionLabel,
    session_name: sessionName,
    momento_sena,
    pms,
    duracion_min,
    l1_max_pct,
    gramatica_activa,
    evidencias_raw,
    raw_meta: meta,
  };
}

/** Map section heading_id to canonical JSON field. */
function canonicalFieldFor(headingId, headingRaw) {
  if (!headingId) return null;
  const id = headingId.toString();
  if (id === '1') return 'materials_checklist';
  if (id === '2') return 'board_plan';
  if (id === '3') return 'timeline';
  if (id === '4') return 'set_up';
  if (id === '5') return 'while_';
  if (id === '6') return 'wrap_up';
  if (id === '7') return 'answer_key_consolidado';
  if (id === '8') return 'differentiation';
  if (id === '9') return 'instructor_self_check';
  return null;
}

/** Build pm0_protocol skeleton — marked __pending_fase_3__ to be filled by pm-3-2-pm0-patch.js */
function pm0Skeleton(sessionNum, l1Pct, gramatica) {
  return {
    __pending_fase_3__: true,
    __filled_by__: 'scripts/pm-3-2-pm0-patch.js (Fase 3 del upgrade)',
    __source__: 'pm-3-1.json.pm0_alignment_by_session (a sembrar en Fase 3)',
    grammar_groups_hint: gramatica || null,
    feedback: { mode: null, __pending__: true },
    l1_management: {
      l1_percentage: l1Pct,
      l1_percentage_unit: '%',
      __pending_source__: 'pm-0-context.json l1_policy_per_guide',
    },
    stress_pronunciation: { __pending__: true },
    success_vocabulary: { __pending__: true },
    cefr_descriptor_focus: {
      subnivel: CEFR,
      __pending__: true,
    },
  };
}

/** Build data_flow_contract canon v2.6 */
function dataFlowContract() {
  return {
    activity_logistics: {
      canon_version: '2.6-dataflow-inversion-2026-04-20',
      keyed_by: 'pm-3-6 activity_id',
      consumed_by: 'scripts/derive_activity_footer_from_playbook.js',
    },
  };
}

/** Build one session JSON from parsed frontmatter + sections. */
function buildSessionJson(opts) {
  const { sessionNum, sessionName, sessionLabel, frontmatter, sections, mdSource, notes } = opts;

  const obj = {
    pm_id: 'PM-3.2',
    pm_name: 'Playbook Build-Out — Step by Step',
    pm_version: PM_VERSION,
    pm_verified_against_prompt: PM_VERIFIED,

    session: sessionNum,
    session_label: sessionLabel,
    session_name: sessionName,

    run_id: RUN_ID,
    guide: GUIDE,
    guia_numero: GUIA_NUMERO,
    programa: PROGRAMA,
    programa_codigo: PROGRAMA_CODIGO,

    duracion_min: frontmatter.duracion_min,
    cefr: CEFR,

    model: MODEL,
    generated_at: GENERATED_AT,
    generated_by: GENERATED_BY,
    status: 'structured_from_md_v266',

    pipeline_note: notes || `Estructurado desde ${mdSource} en Fase 2 del upgrade DIESEL-04-19 v2.6.6. Contenido pedagógico preservado 100%.`,

    momento_sena: frontmatter.momento_sena,
    estrategia_didactica: null,     // pending Fase 3 fill via pm-3-2-estrategias-patch.js
    justificacion_didactica: null,  // pending Fase 3
    pms_involucrados: frontmatter.pms,

    l1_management_summary: {
      l1_max_pct: frontmatter.l1_max_pct,
      unit: '%',
    },
    gramatica_activa: frontmatter.gramatica_activa,
    evidencias_declaradas: frontmatter.evidencias_raw,

    session_header: {
      titulo: `SESSION ${sessionNum}: ${sessionName}`,
      subtitulo: `DIESEL Guía 1 · The Workshop Specialist · Build-Out — Playbook ${RUN_ID}`,
      duracion_min: frontmatter.duracion_min,
      duracion_horas: frontmatter.duracion_min ? Math.round((frontmatter.duracion_min / 60) * 10) / 10 : null,
      nota_instructor: 'Documento interno del instructor — no distribuir a aprendices',
    },

    // --- sections preserved as body_markdown ---
    sections_from_md: {},

    // --- canon skeletons ---
    pm0_protocol: pm0Skeleton(sessionNum, frontmatter.l1_max_pct, frontmatter.gramatica_activa),
    activity_logistics: {},    // pending Fase 3: derive from pm-3-6.json
    data_flow_contract: dataFlowContract(),

    // --- markdown source traceability ---
    _source_md: mdSource,
  };

  // Map sections
  for (const s of sections) {
    const field = canonicalFieldFor(s.heading_id, s.heading_raw);
    if (!field) {
      // keep unknown sections under a catch-all
      obj.sections_from_md._other = obj.sections_from_md._other || [];
      obj.sections_from_md._other.push({
        heading: s.heading_raw,
        body_markdown: s.body,
      });
      continue;
    }
    obj.sections_from_md[field] = {
      heading: s.heading_raw,
      body_markdown: s.body,
    };
  }

  return obj;
}

// ---- main extractors ----

/** Direct extractor for S1..S5 (simple 1:1 md → json) */
function extractSimple(mdFilename, sessionNum) {
  const mdPath = path.join(RUN_DIR, mdFilename);
  const md = fs.readFileSync(mdPath, 'utf8');
  const fm = parseFrontmatter(md);
  const sections = splitH2Sections(md);
  return buildSessionJson({
    sessionNum,
    sessionName: fm.session_name,
    sessionLabel: fm.session_label,
    frontmatter: fm,
    sections,
    mdSource: mdFilename,
  });
}

/** S6 extractor — merges s6a.md + "S6b — ORIENTACIÓN" portion of s6b-s8.md */
function extractS6() {
  // Part A: full s6a.md
  const s6aPath = path.join(RUN_DIR, 'pm-3-2-s6a.md');
  const s6aMd = fs.readFileSync(s6aPath, 'utf8');
  const fmA = parseFrontmatter(s6aMd);
  const sectionsA = splitH2Sections(s6aMd);

  // Part B: §4 "S6b — ORIENTACIÓN Y RECONOCIMIENTO" from s6b-s8.md (lines 1..131)
  const s6b8Path = path.join(RUN_DIR, 'pm-3-2-s6b-s8.md');
  const s6b8Md = fs.readFileSync(s6b8Path, 'utf8');
  const s6b8Lines = s6b8Md.split('\n');
  // Extract S6b slice: from "## 4. S6b" (first line where it appears) until "## 5. S7"
  let startIdx = s6b8Lines.findIndex(l => /^##\s+4\.\s+S6b\s+—/.test(l));
  let endIdx = s6b8Lines.findIndex(l => /^##\s+5\.\s+S7\s+—/.test(l));
  if (startIdx < 0 || endIdx < 0) {
    throw new Error(`Could not locate S6b section in s6b-s8.md (start=${startIdx}, end=${endIdx})`);
  }
  const s6bBody = s6b8Lines.slice(startIdx + 1, endIdx).join('\n').trim();

  // Merge: take s6a.md as spine, append S6b as additional section
  const obj = buildSessionJson({
    sessionNum: 6,
    sessionName: fmA.session_name + ' + S6b: Final Mission Orientation',
    sessionLabel: 'S6 (S6a + S6b)',
    frontmatter: {
      ...fmA,
      // extend duracion_min: S6a (180) + S6b (150 from s6b-s8 header)
      duracion_min: (fmA.duracion_min || 180) + 150,
      momento_sena: `${fmA.momento_sena} + Transferencia — Orientación Final Mission (3.4)`,
      evidencias_raw: fmA.evidencias_raw + ' + S6b: Sin evidencias (orientación Final Mission ABP)',
    },
    sections: sectionsA,
    mdSource: 'pm-3-2-s6a.md + pm-3-2-s6b-s8.md (§4 "S6b — ORIENTACIÓN")',
    notes: 'Sesión S6 compuesta: S6a (Evaluación Sumativa — Cuestionario Consolidado, 180 min) + S6b (Orientación Final Mission, 150 min) = 330 min instructivos. Contenido S6b embedded como sección adicional.',
  });

  // Append S6b content as dedicated section
  obj.sections_from_md.s6b_orientacion = {
    heading: 'S6b — ORIENTACIÓN Y RECONOCIMIENTO (Transferencia — inicio Final Mission)',
    body_markdown: s6bBody,
    source: 'pm-3-2-s6b-s8.md §4',
    duracion_min: 150,
  };

  return obj;
}

/** S7 extractor — extracts "S7 — PREPARACIÓN" portion of s6b-s8.md */
function extractS7() {
  const s6b8Path = path.join(RUN_DIR, 'pm-3-2-s6b-s8.md');
  const s6b8Md = fs.readFileSync(s6b8Path, 'utf8');
  const fmFull = parseFrontmatter(s6b8Md);

  const lines = s6b8Md.split('\n');
  const startIdx = lines.findIndex(l => /^##\s+5\.\s+S7\s+—/.test(l));
  const endIdx = lines.findIndex(l => /^##\s+6\.\s+S8\s+—/.test(l));
  if (startIdx < 0 || endIdx < 0) throw new Error('S7 section bounds not found');
  const s7Body = lines.slice(startIdx + 1, endIdx).join('\n').trim();
  const s7Heading = lines[startIdx].replace(/^##\s+/, '').trim();

  // also pull common sections (7,8,9) applicable to S6b+S7+S8
  const commonAnswerKey = extractSectionByPredicate(lines, /^##\s+7\.\s+ANSWER/, /^##\s+8\.\s+DIFF/);
  const commonDiff = extractSectionByPredicate(lines, /^##\s+8\.\s+DIFF/, /^##\s+9\.\s+INSTR/);
  const commonSelfCheck = extractSectionByPredicate(lines, /^##\s+9\.\s+INSTR/, /^##\s+NOTA\s+FINAL/);

  // Dedicated semantic key for transferencia sessions (override numeric-id mapping)
  const sections = [];

  const obj = buildSessionJson({
    sessionNum: 7,
    sessionName: 'S7: Preparación y Coaching (Final Mission)',
    sessionLabel: 'S7',
    frontmatter: {
      ...fmFull,
      duracion_min: 360,
      momento_sena: 'Transferencia — Preparación Final Mission (3.4)',
      evidencias_raw: 'Sin evidencias GFPI-F-134 formales (transferencia)',
    },
    sections,
    mdSource: 'pm-3-2-s6b-s8.md (§5 "S7 — PREPARACIÓN Y COACHING")',
    notes: 'Sesión S7 extraída de s6b-s8.md — sección dedicada a preparación y coaching del proyecto Final Mission. 360 min instructivos. Sin evidencias formales (Transferencia ABP).',
  });

  // Semantic main body (override numeric-id mapping to avoid "while_" coincidence)
  obj.sections_from_md.final_mission_body = {
    heading: s7Heading,
    body_markdown: s7Body,
    source: 'pm-3-2-s6b-s8.md §5',
    duracion_min: 360,
  };

  // Attach shared tail sections
  obj.sections_from_md.answer_key_consolidado_shared = {
    heading: 'ANSWER KEY CONSOLIDADO (compartido S6b+S7+S8)',
    body_markdown: commonAnswerKey,
    source: 'pm-3-2-s6b-s8.md §7',
  };
  obj.sections_from_md.differentiation_shared = {
    heading: 'DIFFERENTIATION NOTES (compartido S6b+S7+S8)',
    body_markdown: commonDiff,
    source: 'pm-3-2-s6b-s8.md §8',
  };
  obj.sections_from_md.instructor_self_check_shared = {
    heading: 'INSTRUCTOR SELF-CHECK (compartido S6b+S7+S8)',
    body_markdown: commonSelfCheck,
    source: 'pm-3-2-s6b-s8.md §9',
  };

  return obj;
}

/** S8 extractor — extracts "S8 — THE FINAL MISSION" portion of s6b-s8.md */
function extractS8() {
  const s6b8Path = path.join(RUN_DIR, 'pm-3-2-s6b-s8.md');
  const s6b8Md = fs.readFileSync(s6b8Path, 'utf8');
  const fmFull = parseFrontmatter(s6b8Md);

  const lines = s6b8Md.split('\n');
  const startIdx = lines.findIndex(l => /^##\s+6\.\s+S8\s+—/.test(l));
  const endIdx = lines.findIndex(l => /^##\s+7\.\s+ANSWER/.test(l));
  if (startIdx < 0 || endIdx < 0) throw new Error('S8 section bounds not found');
  const s8Body = lines.slice(startIdx + 1, endIdx).join('\n').trim();
  const s8Heading = lines[startIdx].replace(/^##\s+/, '').trim();

  // NOTA FINAL tail
  const notaIdx = lines.findIndex(l => /^##\s+NOTA\s+FINAL/.test(l));
  const notaFinal = notaIdx >= 0 ? lines.slice(notaIdx + 1).join('\n').trim() : '';

  // Dedicated semantic key — avoid mapping heading_id "6" to wrap_up
  const sections = [];

  const obj = buildSessionJson({
    sessionNum: 8,
    sessionName: 'S8: The Final Mission — Workshop Readiness Report',
    sessionLabel: 'S8',
    frontmatter: {
      ...fmFull,
      duracion_min: 360,
      momento_sena: 'Transferencia — Ejecución Final Mission (3.4)',
      evidencias_raw: 'Sin evidencias GFPI-F-134 formales (cierre ABP — evalúa transferencia y progresión CEFR)',
    },
    sections,
    mdSource: 'pm-3-2-s6b-s8.md (§6 "S8 — THE FINAL MISSION")',
    notes: 'Sesión S8 extraída de s6b-s8.md — ejecución y entrega del proyecto Final Mission (Workshop Readiness Report). 360 min instructivos. Sin evidencias formales (cierre ABP).',
  });

  // Semantic main body
  obj.sections_from_md.final_mission_body = {
    heading: s8Heading,
    body_markdown: s8Body,
    source: 'pm-3-2-s6b-s8.md §6',
    duracion_min: 360,
  };

  if (notaFinal) {
    obj.sections_from_md.nota_final_transferencia = {
      heading: 'NOTA FINAL — Cierre ABP S6b+S7+S8',
      body_markdown: notaFinal,
      source: 'pm-3-2-s6b-s8.md (tail)',
    };
  }

  return obj;
}

/** Helper: extract lines between two regex predicates. */
function extractSectionByPredicate(lines, startRe, endRe) {
  const s = lines.findIndex(l => startRe.test(l));
  const e = lines.findIndex(l => endRe.test(l));
  if (s < 0) return '';
  const end = e >= 0 ? e : lines.length;
  return lines.slice(s + 1, end).join('\n').trim();
}

// ---- main ----

function main() {
  const outputs = [];

  // S1..S5: direct
  for (let i = 1; i <= 5; i++) {
    const obj = extractSimple(`pm-3-2-s${i}.md`, i);
    outputs.push({ sessionNum: i, obj });
  }

  // S6: merge s6a + S6b slice
  outputs.push({ sessionNum: 6, obj: extractS6() });

  // S7: slice
  outputs.push({ sessionNum: 7, obj: extractS7() });

  // S8: slice
  outputs.push({ sessionNum: 8, obj: extractS8() });

  // Write all 8 JSONs
  for (const { sessionNum, obj } of outputs) {
    const outPath = path.join(RUN_DIR, `pm-3-2-s${sessionNum}.json`);
    fs.writeFileSync(outPath, JSON.stringify(obj, null, 2) + '\n');
    const size = fs.statSync(outPath).size;
    console.log(`  ✓ pm-3-2-s${sessionNum}.json  (${(size / 1024).toFixed(1)} KB)`);
  }

  console.log(`\n✓ 8 JSONs generados en ${RUN_DIR}`);
}

main();
