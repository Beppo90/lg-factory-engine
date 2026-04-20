#!/usr/bin/env node
/**
 * gen_audit_docx.js — Emite los 3 DOCX FINAL para auditoría del instructor MGV G1.
 *   1. pm-3-1-FINAL-G1.docx   — Playbook Outline (overview + pm0_alignment + voc + ambientes + estrategias)
 *   2. pm-3-2-FINAL-G1.docx   — Playbook Build-Out consolidado: 8 sesiones en un solo documento
 *   3. pm-3-6-FINAL-G1.docx   — GFPI-F-135 Guía del Aprendiz (8 secciones + apéndices embebidos)
 *
 * Run: MGV-2026-04-20 · Programa 522309 · Guía G1 · A1.1 · Canon v2.6
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, PageOrientation, LevelFormat,
  Footer, Header, PageNumber, PageBreak
} = require('/tmp/node_modules/docx');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';

// ------- Paleta canon MGV (navy + orange) -------
const NAVY = '1C2B3C';
const ORANGE = 'F59316';
const GREY = '666666';
const LIGHT = 'F2F2F2';
const ACCENT = 'D5E8F0';
const WHITE = 'FFFFFF';
const GREEN = '4CAF50';

// ------- Helpers -------
const P = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text: String(text ?? ''), font: 'Calibri', size: opts.size || 20, bold: !!opts.bold, italics: !!opts.italics, color: opts.color || undefined })],
  alignment: opts.alignment || AlignmentType.LEFT,
  spacing: { after: opts.after ?? 80 },
});

const H1 = (text) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 36, bold: true, color: NAVY })],
  spacing: { before: 240, after: 180 },
  border: { bottom: { color: ORANGE, space: 2, style: BorderStyle.SINGLE, size: 18 } },
});

const H2 = (text) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 28, bold: true, color: NAVY })],
  spacing: { before: 200, after: 120 },
});

const H3 = (text) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 24, bold: true, color: ORANGE })],
  spacing: { before: 160, after: 80 },
});

const H4 = (text) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 22, bold: true, color: NAVY })],
  spacing: { before: 120, after: 60 },
});

const bullet = (text, level = 0) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 20 })],
  bullet: { level },
  spacing: { after: 40 },
});

const kv = (k, v) => new Paragraph({
  children: [
    new TextRun({ text: String(k) + ': ', font: 'Calibri', size: 20, bold: true, color: NAVY }),
    new TextRun({ text: String(v ?? '—'), font: 'Calibri', size: 20 }),
  ],
  spacing: { after: 40 },
});

const note = (text) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 18, italics: true, color: GREY })],
  spacing: { after: 60 },
});

// Safe array join — accepts array, string, or undefined
const arrJoin = (val, sep = ' · ') => {
  if (val == null) return '';
  if (Array.isArray(val)) return val.join(sep);
  return String(val);
};

const quote = (text) => new Paragraph({
  children: [new TextRun({ text: String(text), font: 'Calibri', size: 20, italics: true, color: NAVY })],
  indent: { left: 360 },
  border: { left: { color: ORANGE, space: 8, style: BorderStyle.SINGLE, size: 18 } },
  spacing: { after: 100 },
});

const pageBreak = () => new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true });

// Tables
const CONTENT_W = 10080;
const cell = (txt, width, opts = {}) => new TableCell({
  children: Array.isArray(txt) ? txt : [P(txt, opts)],
  width: { size: width, type: WidthType.DXA },
  shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill, color: 'auto' } : undefined,
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
});

const headerCell = (txt, width) => new TableCell({
  children: [new Paragraph({
    children: [new TextRun({ text: String(txt), font: 'Calibri', size: 20, bold: true, color: WHITE })],
    alignment: AlignmentType.LEFT,
  })],
  width: { size: width, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' },
  margins: { top: 100, bottom: 100, left: 120, right: 120 },
});

const makeTable = (headers, rows, widths) => {
  const hdrRow = new TableRow({ children: headers.map((h, i) => headerCell(h, widths[i])), tableHeader: true });
  const dataRows = rows.map((row, rIdx) => new TableRow({
    children: row.map((c, i) => cell(c, widths[i], { fill: rIdx % 2 === 0 ? WHITE : LIGHT })),
  }));
  return new Table({
    rows: [hdrRow, ...dataRows],
    width: { size: CONTENT_W, type: WidthType.DXA },
  });
};

const standardFooter = (title) => ({
  default: new Footer({
    children: [new Paragraph({
      children: [
        new TextRun({ text: title, font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ text: '  ·  ', font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ text: 'MGV G1 · Run MGV-2026-04-20 · Canon v2.6  —  Página ', font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ text: ' de ', font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Calibri', size: 16, color: GREY }),
      ],
      alignment: AlignmentType.CENTER,
    })],
  }),
});

const coverPage = (title, subtitle, meta) => [
  new Paragraph({ children: [new TextRun({ text: 'FPI CD Engine · Canon v2.6', font: 'Calibri', size: 18, color: ORANGE, bold: true })], alignment: AlignmentType.CENTER, spacing: { before: 600, after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: title, font: 'Calibri', size: 56, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: subtitle, font: 'Calibri', size: 32, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 480 } }),
  new Paragraph({ children: [new TextRun({ text: '— FINAL PARA AUDITORÍA —', font: 'Calibri', size: 20, italics: true, color: ORANGE })], alignment: AlignmentType.CENTER, spacing: { after: 240 } }),
  ...Object.entries(meta).map(([k, v]) => new Paragraph({
    children: [
      new TextRun({ text: k + ': ', font: 'Calibri', size: 20, bold: true, color: NAVY }),
      new TextRun({ text: String(v), font: 'Calibri', size: 20 }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  })),
  pageBreak(),
];

// =========================================================================
// Render 1: pm-3-1-FINAL-G1.docx
// =========================================================================
function buildPM31Docx() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-3-1.json'), 'utf8'));
  const ch = [];

  // Cover
  ch.push(...coverPage(
    'PM-3.1 Playbook Outline',
    'G1 — The Visual Communicator',
    {
      'Programa': d.header?.programa || 'Desarrollo de Medios Gráficos Visuales (522309)',
      'Tipo': d.header?.tipo || 'Tecnológico',
      'Guía': d.guide || 'G1 — The Visual Communicator',
      'CEFR': 'A1.1',
      'Duración': '60h (48 directas + 12 autónomas)',
      'Status': d.status || 'completed',
      'Generado': d.generated_at || '2026-04-20',
      'Canon': d.pipeline_version ? `v${d.pipeline_version}` : 'v2.6',
    }
  ));

  // 1. Identidad y BUG-PM31-001
  ch.push(H1('1. Identidad del documento'));
  ch.push(kv('PM', `${d.pm_id} ${d.pm_name} v${d.pm_version}`));
  ch.push(kv('Run', d.run_id));
  ch.push(kv('Guía', d.guide));
  ch.push(kv('Generado', d.generated_at));
  ch.push(kv('Generado por', d.generated_by));
  ch.push(kv('Pipeline', d.pipeline_version));
  if (d.bug_fix_reference) {
    ch.push(H3('BUG-PM31-001 — Cerrado'));
    ch.push(kv('Bug ID', d.bug_fix_reference.bug_id));
    ch.push(P(d.bug_fix_reference.descripcion, { italics: true }));
    ch.push(kv('Fix version', d.bug_fix_reference.fix_version));
    ch.push(kv('Mecanismo', d.bug_fix_reference.mecanismo_fix));
  }

  // 2. Overview table (8 sesiones)
  ch.push(pageBreak());
  ch.push(H1('2. Overview — Mapa de 8 Sesiones'));
  if (Array.isArray(d.overview_table)) {
    const headers = ['S#', 'Nombre', 'Momento SENA', 'Horas', 'Worksheets', 'Evidencia'];
    const widths = [700, 2300, 1800, 900, 2480, 1900];
    const rows = d.overview_table.map(s => [
      `S${s.session ?? s.numero ?? ''}`,
      s.nombre || s.session_name || '—',
      s.momento_sena || s.fase || '—',
      `${s.horas_directas ?? s.horas ?? '7.5'}h`,
      (s.worksheets || []).join(', ') || '—',
      s.evidencia_formal || s.evidencia || '—',
    ]);
    ch.push(makeTable(headers, rows, widths));
  }

  // 3. pm0_alignment_by_session (canon v2.6)
  ch.push(pageBreak());
  ch.push(H1('3. PM-0 Alignment por Sesión (Canon v2.6)'));
  ch.push(note('Cross-reference obligatorio con pm-0-context.json. Fixed BUG-PM31-001.'));
  if (Array.isArray(d.pm0_alignment_by_session)) {
    for (const s of d.pm0_alignment_by_session) {
      ch.push(H3(`S${s.session} — ${s.nombre || ''}`));
      ch.push(kv('L1 target %', s.l1_percentage_target != null ? `${s.l1_percentage_target}%` : '—'));
      ch.push(kv('Dominant feedback mode', s.dominant_feedback_mode));
      if (s.grammar_groups_active) {
        const g = s.grammar_groups_active;
        ch.push(P('Grammar groups activos:', { bold: true }));
        if (g.intro) ch.push(bullet(`INTRO: ${(g.intro || []).join(', ')}`));
        if (g.consolida) ch.push(bullet(`CONSOLIDA: ${(g.consolida || []).join(', ')}`));
        if (g.aplica) ch.push(bullet(`APLICA: ${(g.aplica || []).join(', ')}`));
      }
      if (s.stress_focus) {
        ch.push(kv('Stress focus', Array.isArray(s.stress_focus) ? s.stress_focus.join(' · ') : JSON.stringify(s.stress_focus)));
      }
      if (s.success_factors_priorized) {
        ch.push(kv('SUCCESS factors', Array.isArray(s.success_factors_priorized) ? s.success_factors_priorized.join(', ') : JSON.stringify(s.success_factors_priorized)));
      }
      if (s.cefr_descriptor_focus) {
        ch.push(kv('CEFR descriptor', s.cefr_descriptor_focus));
      }
    }
  }

  // 4. Ambientes resumen
  ch.push(pageBreak());
  ch.push(H1('4. Ambientes de Aprendizaje'));
  if (d.ambientes_resumen) {
    ch.push(note(d.ambientes_resumen.nota || ''));
    ch.push(kv('Tipo de ambiente', d.ambientes_resumen.tipo_ambiente));
    if (d.ambientes_resumen.recursos_fijos) {
      ch.push(H4('Recursos fijos'));
      for (const r of d.ambientes_resumen.recursos_fijos) ch.push(bullet(r));
    }
    if (d.ambientes_resumen.recursos_variables_por_sesion) {
      ch.push(H4('Recursos variables por sesión'));
      for (const [k, v] of Object.entries(d.ambientes_resumen.recursos_variables_por_sesion)) {
        ch.push(kv(k, Array.isArray(v) ? v.join(', ') : String(v)));
      }
    }
  }

  // 5. Estrategias resumen
  ch.push(pageBreak());
  ch.push(H1('5. Estrategias Didácticas por Sesión'));
  if (d.estrategias_resumen) {
    ch.push(note(d.estrategias_resumen.nota || ''));
    ch.push(kv('Ciclo SENA', d.estrategias_resumen.ciclo_sena));
    const est = d.estrategias_resumen.estrategia_dominante_por_sesion || {};
    const rows = Object.entries(est).map(([k, v]) => [k, typeof v === 'string' ? v : (v?.estrategia || JSON.stringify(v))]);
    if (rows.length) ch.push(makeTable(['Sesión', 'Estrategia dominante'], rows, [1500, 8580]));
  }

  // 6. V+O+C Dimensiones
  ch.push(pageBreak());
  ch.push(H1('6. Tabla V+O+C — Dimensiones de Aprendizaje (8 sesiones)'));
  if (Array.isArray(d.voc_dimensions_table)) {
    for (const row of d.voc_dimensions_table) {
      ch.push(H3(`S${row.session ?? row.sesion ?? ''} — ${row.nombre || ''}`));
      if (row.cognitiva) ch.push(kv('COGNITIVA (Saber)', `${row.cognitiva.verbo || ''} · ${row.cognitiva.objeto || ''} · ${row.cognitiva.condicion || ''}`));
      if (row.procedimental) ch.push(kv('PROCEDIMENTAL (Hacer)', `${row.procedimental.verbo || ''} · ${row.procedimental.objeto || ''} · ${row.procedimental.condicion || ''}`));
      if (row.actitudinal) ch.push(kv('ACTITUDINAL (Ser)', `${row.actitudinal.verbo || ''} · ${row.actitudinal.objeto || ''} · ${row.actitudinal.condicion || ''}`));
    }
  }

  // 7. Autonomous map
  ch.push(pageBreak());
  ch.push(H1('7. Mapa de Trabajo Autónomo'));
  if (d.autonomous_work_map) {
    const a = d.autonomous_work_map;
    ch.push(kv('Total horas autónomas', a.total_horas_autonomas || '12h'));
    if (a.desglose_por_sesion_horas) {
      ch.push(H4('Desglose por sesión'));
      for (const [k, v] of Object.entries(a.desglose_por_sesion_horas)) ch.push(kv(k, `${v}h`));
    }
    if (Array.isArray(a.asignaciones)) {
      ch.push(H4('Asignaciones'));
      for (const x of a.asignaciones) ch.push(bullet(typeof x === 'string' ? x : JSON.stringify(x)));
    }
    if (a.check) ch.push(kv('Check', a.check));
  }

  // 8. Validaciones PM-3.1
  ch.push(pageBreak());
  ch.push(H1('8. Validaciones PM-3.1 (canon v2.6)'));
  if (d.validation_pm31_v251) {
    for (const [k, v] of Object.entries(d.validation_pm31_v251)) {
      const label = k.replaceAll('_', ' ');
      const value = typeof v === 'object' ? JSON.stringify(v) : String(v);
      ch.push(kv(label, value));
    }
  }
  if (d.pm_3_2_propagation_contract) {
    ch.push(H3('Contrato de propagación a PM-3.2'));
    ch.push(note(d.pm_3_2_propagation_contract.nota || ''));
    ch.push(kv('Regla', d.pm_3_2_propagation_contract.regla));
    ch.push(kv('Script canónico', d.pm_3_2_propagation_contract.script_canonico));
  }

  // Build doc
  return new Document({
    creator: 'FPI CD Engine v2.6',
    title: 'PM-3.1 Playbook Outline FINAL — MGV G1',
    description: 'Playbook Outline for final audit — MGV-2026-04-20 G1',
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } } },
      footers: standardFooter('PM-3.1 Playbook Outline'),
      children: ch,
    }],
  });
}

// =========================================================================
// Render 2: pm-3-2-FINAL-G1.docx — 8 sesiones consolidadas
// =========================================================================
function buildPM32Docx() {
  const ch = [];

  // Cover
  ch.push(...coverPage(
    'PM-3.2 Playbook Build-Out',
    'G1 — The Visual Communicator · 8 Sesiones',
    {
      'Programa': 'Desarrollo de Medios Gráficos Visuales (522309)',
      'Guía': 'G1 — The Visual Communicator',
      'CEFR': 'A1.1',
      'Sesiones': '8 × 7.5h = 60h (48 directas + 12 autónomas)',
      'Status': 'completed',
      'Canon': 'v2.6 (pm0_protocol propagado + activity_footer)',
    }
  ));

  // TOC
  ch.push(H1('Tabla de Contenido'));
  const sessions = [];
  for (let i = 1; i <= 8; i++) {
    const p = path.join(RUN_DIR, `pm-3-2-s${i}.json`);
    if (!fs.existsSync(p)) { console.warn(`Missing ${p}`); continue; }
    const s = JSON.parse(fs.readFileSync(p, 'utf8'));
    sessions.push(s);
    ch.push(bullet(`S${s.session} — ${s.session_name || s.session_header?.titulo_ingles || ''}`));
  }

  // For each session
  for (const s of sessions) {
    ch.push(pageBreak());
    ch.push(H1(`SESSION ${s.session} — ${s.session_name || s.session_header?.titulo_ingles || ''}`));

    // Identidad
    ch.push(H2('1. Identidad'));
    ch.push(kv('PM', `${s.pm_id} v${s.pm_version}`));
    ch.push(kv('Duración', `${s.duracion_min} min (${(s.duracion_min/60).toFixed(1)} h)`));
    ch.push(kv('CEFR', s.cefr));
    ch.push(kv('Worksheets', (s.worksheets || []).join(' · ')));
    ch.push(kv('Habilidades foco', (s.habilidades_foco || []).join(' · ')));
    ch.push(kv('Habilidades soporte', (s.habilidades_soporte || []).join(' · ')));
    ch.push(kv('Status', s.status));

    // Posición pedagógica
    ch.push(H2('2. Posición Pedagógica SENA'));
    ch.push(kv('Momento SENA', s.momento_sena));
    ch.push(kv('Estrategia didáctica', s.estrategia_didactica));
    if (s.justificacion_didactica) ch.push(quote(s.justificacion_didactica));

    // PM-0 protocol (canon v2.6)
    if (s.pm0_protocol) {
      ch.push(H2('3. PM-0 Protocol (Canon v2.6)'));
      const p0 = s.pm0_protocol;
      if (p0.grammar_groups) {
        const g = p0.grammar_groups;
        if (g.intro) ch.push(kv('Grammar INTRO', arrJoin(g.intro, ', ')));
        if (g.consolida) ch.push(kv('Grammar CONSOLIDA', arrJoin(g.consolida, ', ')));
        if (g.aplica) ch.push(kv('Grammar APLICA', arrJoin(g.aplica, ', ')));
      }
      if (p0.feedback) {
        ch.push(kv('Feedback mode', p0.feedback.dominant_mode || p0.feedback.dominant || '—'));
        if (p0.feedback.accuracy_techniques) ch.push(kv('Accuracy techniques', arrJoin(p0.feedback.accuracy_techniques, ', ')));
        if (p0.feedback.fluency_techniques) ch.push(kv('Fluency techniques', arrJoin(p0.feedback.fluency_techniques, ', ')));
      }
      if (p0.l1_management) {
        ch.push(kv('L1 target %', p0.l1_management.target_percentage + '%'));
        if (p0.l1_management.english_zone) ch.push(kv('English Zone', p0.l1_management.english_zone));
        if (p0.l1_management.legitimate_uses) ch.push(kv('Usos legítimos L1', arrJoin(p0.l1_management.legitimate_uses)));
      }
      if (p0.stress_pronunciation) {
        const sp = p0.stress_pronunciation;
        if (sp.focus_words) ch.push(kv('Stress focus words', arrJoin(sp.focus_words)));
        if (sp.techniques) ch.push(kv('Stress techniques', arrJoin(sp.techniques)));
      }
      if (p0.success_vocabulary) {
        const sv = p0.success_vocabulary;
        if (sv.target_words) ch.push(kv('Target vocabulary', arrJoin(sv.target_words)));
        if (sv.success_factors_applied) ch.push(kv('SUCCESS factors', arrJoin(sv.success_factors_applied, ', ')));
      }
    }

    // Materials
    if (s.materials_checklist) {
      ch.push(H2('4. Materials Checklist'));
      for (const [k, v] of Object.entries(s.materials_checklist)) {
        if (Array.isArray(v)) {
          ch.push(H4(k.replaceAll('_', ' ')));
          for (const x of v) ch.push(bullet(typeof x === 'string' ? x : JSON.stringify(x)));
        } else {
          ch.push(kv(k, String(v)));
        }
      }
    }

    // Board Plan
    if (s.board_plan) {
      ch.push(H2('5. Board Plan'));
      if (Array.isArray(s.board_plan)) {
        for (const x of s.board_plan) ch.push(bullet(typeof x === 'string' ? x : JSON.stringify(x)));
      } else if (typeof s.board_plan === 'object') {
        for (const [k, v] of Object.entries(s.board_plan)) ch.push(kv(k, Array.isArray(v) ? v.join(' · ') : String(v)));
      }
    }

    // Timeline
    if (Array.isArray(s.timeline)) {
      ch.push(H2('6. Timeline 360 min'));
      const tRows = s.timeline.map(t => [t.tiempo || t.time || '—', (t.duracion_min || t.min || '') + ' min', t.bloque || t.block || '—', t.nombre || t.label || '']);
      ch.push(makeTable(['Tiempo', 'Duración', 'Bloque', 'Nombre'], tRows, [1400, 1200, 1800, 5680]));
    }

    // SET-UP
    if (s.set_up) {
      ch.push(H2('7. SET-UP'));
      if (s.set_up.warm_up) ch.push(kv('Warm-up', s.set_up.warm_up));
      if (s.set_up.duracion_min) ch.push(kv('Duración', `${s.set_up.duracion_min} min`));
      if (s.set_up.teacher_talk_opening) { ch.push(H4('Teacher Talk — Opening')); ch.push(quote(s.set_up.teacher_talk_opening)); }
      if (Array.isArray(s.set_up.pasos)) { ch.push(H4('Pasos')); for (const p of s.set_up.pasos) ch.push(bullet(p)); }
      if (s.set_up.objetivo) ch.push(kv('Objetivo', s.set_up.objetivo));
      if (Array.isArray(s.set_up.icq)) { ch.push(H4('ICQ')); for (const q of s.set_up.icq) ch.push(bullet(q)); }
      if (Array.isArray(s.set_up.facilitation_notes)) { ch.push(H4('Facilitation notes')); for (const n of s.set_up.facilitation_notes) ch.push(bullet(n)); }
      if (s.set_up.checkpoint) ch.push(kv('Checkpoint', s.set_up.checkpoint));
      if (s.set_up.transition) ch.push(quote(`Transición: ${s.set_up.transition}`));
    }

    // WHILE blocks (dual schema support)
    if (s.while) {
      ch.push(H2('8. WHILE — Bloques principales'));
      let blocks = [];
      if (Array.isArray(s.while.bloques)) {
        blocks = s.while.bloques;  // S1 schema
      } else {
        for (const k of ['while_a', 'while_b', 'while_c', 'while_d', 'while_e']) {
          if (s.while[k]) blocks.push({ letra: k.replace('while_', '').toUpperCase(), ...s.while[k] });
        }
      }
      for (const b of blocks) {
        const letra = b.letra || b.bloque || '?';
        const nombre = b.nombre || b.title || '';
        ch.push(H3(`WHILE ${letra} — ${nombre}`));
        if (b.duracion_min) ch.push(kv('Duración', `${b.duracion_min} min`));
        if (b.agrupacion) ch.push(kv('Agrupación', b.agrupacion));
        if (b.worksheet_ref || b.pm_source) ch.push(kv('Worksheet / Source', b.worksheet_ref || b.pm_source));
        if (b.tecnica_didactica) ch.push(kv('Técnica didáctica', b.tecnica_didactica));
        if (b.objetivo) ch.push(kv('Objetivo', b.objetivo));
        if (b.teacher_talk_instruction) { ch.push(H4('Teacher Talk — Instruction')); ch.push(quote(b.teacher_talk_instruction)); }
        if (Array.isArray(b.instrucciones_paso_a_paso)) { ch.push(H4('Pasos')); for (const p of b.instrucciones_paso_a_paso) ch.push(bullet(p)); }
        if (Array.isArray(b.icq)) { ch.push(H4('ICQ')); for (const q of b.icq) ch.push(bullet(q)); }
        if (b.answer_key_inline) { ch.push(H4('Answer Key')); ch.push(note(b.answer_key_inline)); }
        if (Array.isArray(b.facilitation_notes)) { ch.push(H4('Facilitation Notes')); for (const n of b.facilitation_notes) ch.push(bullet(n)); }
        if (b.checkpoint) ch.push(kv('Checkpoint', b.checkpoint));
        if (b.transition) ch.push(quote(`Transición: ${b.transition}`));
      }
      if (Array.isArray(s.while.breaks)) {
        ch.push(H3('Breaks'));
        for (const br of s.while.breaks) ch.push(bullet(typeof br === 'string' ? br : `${br.tiempo || ''} · ${br.nombre || br.duracion_min + ' min'}`));
      }
    }

    // WRAP-UP
    if (s.wrap_up) {
      ch.push(H2('9. WRAP-UP'));
      if (s.wrap_up.duracion_min) ch.push(kv('Duración', `${s.wrap_up.duracion_min} min`));
      if (s.wrap_up.teacher_talk_closing) { ch.push(H4('Teacher Talk — Closing')); ch.push(quote(s.wrap_up.teacher_talk_closing)); }
      if (Array.isArray(s.wrap_up.pasos)) { ch.push(H4('Pasos')); for (const p of s.wrap_up.pasos) ch.push(bullet(p)); }
      if (s.wrap_up.sintesis) ch.push(kv('Síntesis', s.wrap_up.sintesis));
      if (s.wrap_up.reflexion_aprendiz) ch.push(kv('Reflexión del aprendiz', s.wrap_up.reflexion_aprendiz));
      if (s.wrap_up.bridge_next_session) ch.push(quote(`Bridge → S${s.session + 1}: ${s.wrap_up.bridge_next_session}`));
    }

    // Differentiation + self-check
    if (s.differentiation) {
      ch.push(H2('10. Differentiation / Plan B'));
      for (const [k, v] of Object.entries(s.differentiation)) ch.push(kv(k, typeof v === 'string' ? v : JSON.stringify(v)));
    }
    if (s.instructor_self_check) {
      ch.push(H2('11. Instructor Self-Check'));
      if (Array.isArray(s.instructor_self_check)) for (const x of s.instructor_self_check) ch.push(bullet(x));
      else for (const [k, v] of Object.entries(s.instructor_self_check)) ch.push(kv(k, v));
    }
    if (s.totals_check) {
      ch.push(H2('12. Totals Check'));
      for (const [k, v] of Object.entries(s.totals_check)) ch.push(kv(k, String(v)));
    }
  }

  return new Document({
    creator: 'FPI CD Engine v2.6',
    title: 'PM-3.2 Playbook Build-Out FINAL — MGV G1',
    description: '8 sesiones consolidadas para auditoría — MGV-2026-04-20 G1',
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } } },
      footers: standardFooter('PM-3.2 Playbook Build-Out'),
      children: ch,
    }],
  });
}

// =========================================================================
// Render 3: pm-3-6-FINAL-G1.docx
// =========================================================================
function renderContenidoInline(apx) {
  const ch = [];
  if (!apx.contenido_inline) return ch;
  const { tipo, data } = apx.contenido_inline;
  ch.push(H3(`${apx.id || ''} — ${apx.titulo || ''}`));
  if (tipo) ch.push(note(`Tipo: ${tipo}`));

  if (tipo === 'reading_text' && data) {
    if (data.title) ch.push(H4(data.title));
    if (data.subtitle) ch.push(P(data.subtitle, { italics: true }));
    if (Array.isArray(data.paragraphs)) for (const p of data.paragraphs) ch.push(P(p));
    else if (data.text) ch.push(P(data.text));
    if (Array.isArray(data.glossary)) {
      ch.push(H4('Glossary'));
      for (const g of data.glossary) ch.push(bullet(`${g.term}: ${g.definition || g.def || ''}`));
    }
  } else if (tipo === 'writing_model' && data) {
    if (data.title) ch.push(H4(data.title));
    if (data.instruction) ch.push(quote(data.instruction));
    if (Array.isArray(data.fields)) for (const f of data.fields) ch.push(bullet(`${f.label}: ${f.example || f.hint || '____'}`));
    if (data.sample) { ch.push(H4('Sample')); ch.push(P(data.sample)); }
  } else if (tipo === 'audio_script' && data) {
    if (data.scene) ch.push(P(`Scene: ${data.scene}`, { italics: true }));
    if (Array.isArray(data.turns)) for (const t of data.turns) ch.push(P(`${t.speaker}: ${t.line}`));
    else if (data.transcript) ch.push(P(data.transcript));
  } else if (tipo === 'word_wall' && data) {
    if (Array.isArray(data.categories)) {
      const rows = data.categories.map(c => [c.category || c.name || '—', (c.words || c.terms || []).join(', ')]);
      ch.push(makeTable(['Category', 'Words'], rows, [2500, 7580]));
    }
  } else if (tipo === 'mission_brief' && data) {
    if (data.scenario) { ch.push(H4('Scenario')); ch.push(P(data.scenario)); }
    if (data.roles) { ch.push(H4('Roles')); (Array.isArray(data.roles) ? data.roles : [data.roles]).forEach(r => ch.push(bullet(typeof r === 'string' ? r : `${r.name}: ${r.description || ''}`))); }
    if (data.briefing) { ch.push(H4('Briefing')); ch.push(P(data.briefing)); }
    if (data.deliverable) { ch.push(H4('Deliverable')); ch.push(P(data.deliverable)); }
    if (data.rules) { ch.push(H4('Rules')); (Array.isArray(data.rules) ? data.rules : [data.rules]).forEach(r => ch.push(bullet(r))); }
  } else if (tipo === 'planning_template' && data) {
    if (data.title) ch.push(H4(data.title));
    if (Array.isArray(data.sections)) for (const s of data.sections) ch.push(bullet(`${s.label}: ${s.hint || '____'}`));
  } else if (tipo === 'self_assessment' && data) {
    if (data.title) ch.push(H4(data.title));
    if (Array.isArray(data.items)) for (const i of data.items) ch.push(bullet(typeof i === 'string' ? i : i.question || JSON.stringify(i)));
  } else {
    // Fallback: dump as bullets
    if (typeof data === 'object' && data !== null) {
      for (const [k, v] of Object.entries(data)) ch.push(kv(k, Array.isArray(v) ? v.join(' · ') : String(v)));
    }
  }
  return ch;
}

function renderActivityFooter(af) {
  if (!af) return [];
  const rows = [
    ['Ambiente', af.ambiente || '—'],
    ['Estrategia', af.estrategia || '—'],
    ['Técnica', af.tecnica || '—'],
    ['Materiales', Array.isArray(af.materiales) ? af.materiales.join(' · ') : (af.materiales || '—')],
    ['Material de apoyo', af.material_apoyo || '—'],
    ['Duración (h)', af.duracion_horas != null ? String(af.duracion_horas) : '—'],
  ];
  return [
    new Paragraph({ children: [new TextRun({ text: '▸ Activity Footer (canon v2.6)', font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { before: 80, after: 40 } }),
    makeTable(['Campo', 'Valor'], rows, [2500, 7580]),
  ];
}

function renderActividades(actividades, apendicesById) {
  const ch = [];
  if (!Array.isArray(actividades)) return ch;
  for (const a of actividades) {
    const actId = a.id || a.actividad_id || '';
    const actTitulo = a.titulo || a.nombre || a.nombre_aprendiz || '';
    ch.push(H4(`${actId} — ${actTitulo}`));
    // dimension labels (array or single)
    const dims = a.etiquetas_dimension || (a.dimension ? [a.dimension] : null);
    if (Array.isArray(dims) && dims.length) ch.push(P(dims.map(x => `[${x}]`).join(' '), { bold: true, color: ORANGE }));
    else if (a.dimension) ch.push(P(`[${a.dimension}]`, { bold: true, color: ORANGE }));

    // Instrucciones (bilingual)
    if (a.instruccion_2pers_en) { ch.push(H4('Instruction (EN)')); ch.push(P(a.instruccion_2pers_en)); }
    if (a.instruccion_supervivencia_es) { ch.push(H4('Supervivencia (ES)')); ch.push(P(a.instruccion_supervivencia_es, { italics: true })); }
    if (a.instruccion) ch.push(P(a.instruccion));

    // Basic metadata
    if (a.tiempo_min != null) ch.push(kv('Tiempo', `${a.tiempo_min} min`));
    if (a.agrupacion) ch.push(kv('Agrupación', a.agrupacion));
    if (a.produce_evidencia) ch.push(kv('Produce evidencia', String(a.produce_evidencia)));

    // Pasos (if present)
    if (Array.isArray(a.pasos)) { ch.push(H4('Pasos')); for (const p of a.pasos) ch.push(bullet(p)); }

    // Entregable
    if (a.entregable) {
      ch.push(P('📋 ENTREGABLE', { bold: true, color: NAVY }));
      if (typeof a.entregable === 'string') ch.push(P(a.entregable));
      else for (const [k, v] of Object.entries(a.entregable)) ch.push(kv(k, typeof v === 'object' ? JSON.stringify(v) : String(v)));
    }

    // Double render: inline appendices BEFORE activity_footer (REGLA 12)
    if (Array.isArray(a.apendices_referenciados)) {
      for (const apId of a.apendices_referenciados) {
        const apx = apendicesById[apId];
        if (apx) ch.push(...renderContenidoInline(apx));
      }
    }

    // Activity footer LAST (canon v2.6 REGLA 10)
    if (a.activity_footer) ch.push(...renderActivityFooter(a.activity_footer));
  }
  return ch;
}

// Recursive walker: a subsección puede tener `actividades` directamente,
// o puede tener sub-objetos `sesion_N_*` que contienen `actividades_principales`.
function renderSubseccion(block, apendicesById, level = 2) {
  const ch = [];
  if (!block || typeof block !== 'object') return ch;

  // Metadata de la subsección
  if (block.titulo_aprendiz) ch.push(P(block.titulo_aprendiz, { bold: true }));
  if (block.fuente_pm_3_2) ch.push(note(`Fuente: ${block.fuente_pm_3_2}`));
  if (block.fuente_pm_3_5) ch.push(note(`Fuente: ${block.fuente_pm_3_5}`));
  if (block.duracion_total_min != null) ch.push(kv('Duración total', `${block.duracion_total_min} min`));
  if (block.duracion_min != null) ch.push(kv('Duración', `${block.duracion_min} min`));
  if (block.nota_aprendiz) ch.push(quote(block.nota_aprendiz));
  if (block.nota_evidencias_aprendiz) ch.push(quote(block.nota_evidencias_aprendiz));
  if (block.advertencia_aprendiz) ch.push(quote(block.advertencia_aprendiz));
  if (block.introduccion) ch.push(P(block.introduccion, { italics: true }));

  // Actividades directas
  const directActs = block.actividades || block.activities || block.actividades_principales;
  if (Array.isArray(directActs) && directActs.length) {
    ch.push(...renderActividades(directActs, apendicesById));
  }

  // Sub-sesiones (keys que empiezan con sesion_)
  for (const [k, v] of Object.entries(block)) {
    if (!/^sesion_\d/i.test(k)) continue;
    if (!v || typeof v !== 'object') continue;
    const label = (v.titulo || v.titulo_aprendiz || k).replace(/_/g, ' ');
    ch.push(H3(label));
    ch.push(...renderSubseccion(v, apendicesById, level + 1));
  }

  return ch;
}

function buildPM36Docx() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-3-6.json'), 'utf8'));
  const ch = [];

  ch.push(...coverPage(
    'GFPI-F-135 Guía del Aprendiz',
    'G1 — The Visual Communicator',
    {
      'Programa': 'Desarrollo de Medios Gráficos Visuales (522309)',
      'Guía': 'G1 — The Visual Communicator',
      'CEFR': 'A1.1',
      'RAP': d.seccion_1_identificacion?.rap || d.seccion_1_identificacion?.rap_codigo || '240202501-01',
      'Tono': d.tono_redaccion || 'Segunda persona · Directo · Operativo',
      'Canon': `v${d.pm_version || '2.6'}`,
    }
  ));

  // Sección 1 — Identificación (expand nested objects into labelled sub-blocks)
  const s1 = d.seccion_1_identificacion || {};
  ch.push(H1('1. Identificación de la Guía'));
  for (const [k, v] of Object.entries(s1)) {
    const label = k.replaceAll('_', ' ');
    if (v == null) {
      ch.push(kv(label, '—'));
    } else if (Array.isArray(v)) {
      ch.push(kv(label, v.join(' · ')));
    } else if (typeof v === 'object') {
      // Expand nested object as H3 sub-block with one kv per key
      ch.push(H3(label.charAt(0).toUpperCase() + label.slice(1)));
      for (const [kk, vv] of Object.entries(v)) {
        const subLabel = kk.replaceAll('_', ' ');
        const subVal = Array.isArray(vv) ? vv.join(' · ') : (typeof vv === 'object' && vv !== null ? JSON.stringify(vv) : String(vv ?? '—'));
        ch.push(kv(subLabel, subVal));
      }
    } else {
      ch.push(kv(label, String(v)));
    }
  }

  // Sección 2 — Presentación (corregido para schema real v2.6)
  const s2 = d.seccion_2_presentacion || {};
  ch.push(pageBreak());
  ch.push(H1('2. Presentación'));
  if (s2.titulo_aprendiz) { ch.push(H2(s2.titulo_aprendiz)); }

  if (s2.que_aprenderas_en) {
    ch.push(H3('What you will learn'));
    ch.push(P(s2.que_aprenderas_en));
  }
  if (s2.que_aprenderas_es_supervivencia) {
    ch.push(P(s2.que_aprenderas_es_supervivencia, { italics: true, color: GREY }));
  }

  if (Array.isArray(s2.para_que_te_servira) && s2.para_que_te_servira.length) {
    ch.push(H3('Para qué te servirá'));
    for (const item of s2.para_que_te_servira) ch.push(bullet(item));
  }

  if (s2.universo_narrativo_aprendiz) {
    ch.push(H3('Universo narrativo'));
    const un = s2.universo_narrativo_aprendiz;
    if (un.tu_estudio) ch.push(kv('Tu estudio', un.tu_estudio));
    if (un.tu_rol) ch.push(kv('Tu rol', un.tu_rol));
    if (Array.isArray(un.tu_equipo) && un.tu_equipo.length) {
      ch.push(P('Tu equipo:', { bold: true }));
      for (const m of un.tu_equipo) ch.push(bullet(m));
    }
  }

  const promesa = s2['promesa_pedagógica'] || s2.promesa_pedagogica;
  if (promesa) {
    ch.push(H3('Promesa pedagógica'));
    ch.push(P(promesa));
  }

  // Fallback soft para esquemas antiguos
  if (s2.que_aprenderas && !s2.que_aprenderas_en) { ch.push(H3('¿Qué aprenderás?')); ch.push(P(s2.que_aprenderas)); }
  if (s2.para_que && !s2.para_que_te_servira) { ch.push(H3('¿Para qué?')); ch.push(P(s2.para_que)); }
  if (s2.aplicacion_laboral) { ch.push(H3('Aplicación laboral')); ch.push(P(s2.aplicacion_laboral)); }
  if (Array.isArray(s2.objetivos_aprendizaje)) { ch.push(H3('Objetivos')); for (const o of s2.objetivos_aprendizaje) ch.push(bullet(o)); }

  // Build apendices index
  const apendicesById = {};
  if (Array.isArray(d.apendices_embebidos)) {
    for (const ap of d.apendices_embebidos) apendicesById[ap.id] = ap;
  }

  // Sección 3 — Actividades de Aprendizaje (subsecciones 3.1–3.4)
  const s3 = d.seccion_3_actividades_aprendizaje || {};
  ch.push(pageBreak());
  ch.push(H1('3. Actividades de Aprendizaje'));

  // Auto-discover subsections in order by key pattern: subseccion_3_X_*
  const subEntries = Object.entries(s3)
    .filter(([k]) => /^subseccion_3_/i.test(k))
    .sort(([a], [b]) => a.localeCompare(b));

  for (const [k, block] of subEntries) {
    if (!block) continue;
    // Derive label from key: subseccion_3_3_apropiacion_s2_a_s5 → 3.3 Apropiación (S2 a S5)
    const m = k.match(/^subseccion_(\d+)_(\d+)([a-z]?)_(.+)$/i);
    const num = m ? `${m[1]}.${m[2]}${m[3] || ''}` : k;
    const restLabel = (m ? m[4] : k).replaceAll('_', ' ');
    ch.push(H2(`${num} — ${restLabel}`));
    ch.push(...renderSubseccion(block, apendicesById, 2));
  }

  // Sección 4 — Evidencias
  ch.push(pageBreak());
  ch.push(H1('4. Planteamiento de Evidencias de Aprendizaje'));
  const s4 = d.seccion_4_planteamiento_evidencias || {};
  if (Array.isArray(s4.evidencias)) {
    const rows = s4.evidencias.map(e => [
      e.codigo || e.id || '—',
      e.nombre || e.tipo || '—',
      e.tipo || e.categoria || '—',
      e.puntos != null ? String(e.puntos) + ' pts' : '—',
      e.instrumento || '—',
      e.sesion || e.cuando || '—',
    ]);
    ch.push(makeTable(['Código', 'Nombre', 'Tipo', 'Puntos', 'Instrumento', 'Sesión'], rows, [900, 2500, 1600, 1100, 2180, 1800]));
    for (const e of s4.evidencias) {
      ch.push(H3(`${e.codigo || e.id || ''} — ${e.nombre || ''}`));
      for (const [k, v] of Object.entries(e)) {
        if (['codigo', 'id', 'nombre'].includes(k)) continue;
        ch.push(kv(k, Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))));
      }
    }
  } else {
    for (const [k, v] of Object.entries(s4)) ch.push(kv(k, typeof v === 'string' ? v : JSON.stringify(v)));
  }

  // Sección 5 — Glosario
  ch.push(pageBreak());
  ch.push(H1('5. Glosario (Key Vocabulary)'));
  const s5 = d.seccion_5_glosario || {};
  const terms = s5.terminos || s5.glossary || [];
  if (Array.isArray(terms) && terms.length) {
    const rows = terms.map(t => [t.term || t.termino || '—', t.definition || t.definicion || '—', t.example || t.ejemplo || '—']);
    ch.push(makeTable(['Term', 'Definition', 'Example'], rows, [2000, 5000, 3080]));
  }

  // Sección 6 — Referencias
  ch.push(pageBreak());
  ch.push(H1('6. Referentes Bibliográficos'));
  const s6 = d.seccion_6_referentes_bibliograficos || {};
  if (Array.isArray(s6.referencias)) for (const r of s6.referencias) ch.push(bullet(typeof r === 'string' ? r : `${r.titulo || ''} · ${r.autor || ''} · ${r.fuente || r.url || ''}`));
  else if (Array.isArray(s6)) for (const r of s6) ch.push(bullet(String(r)));
  else for (const [k, v] of Object.entries(s6)) ch.push(kv(k, Array.isArray(v) ? v.join(' · ') : String(v)));

  // Sección 7 — Control del documento
  ch.push(pageBreak());
  ch.push(H1('7. Control del Documento'));
  const s7 = d.seccion_7_control_documento || {};
  for (const [k, v] of Object.entries(s7)) ch.push(kv(k, typeof v === 'object' ? JSON.stringify(v) : String(v)));

  // Sección 8 — Control de cambios
  ch.push(H1('8. Control de Cambios'));
  const s8 = d.seccion_8_control_cambios || {};
  if (Array.isArray(s8.cambios) && s8.cambios.length) {
    const rows = s8.cambios.map(c => [c.version || '—', c.fecha || '—', c.responsable || '—', c.cambio || '—']);
    ch.push(makeTable(['Versión', 'Fecha', 'Responsable', 'Cambio'], rows, [1500, 1800, 2500, 4280]));
  } else {
    ch.push(note('Sin cambios registrados (primera versión).'));
  }

  // Índice consolidado de apéndices (REGLA 12 canon v2.6)
  if (Object.keys(apendicesById).length) {
    ch.push(pageBreak());
    ch.push(H1('Apéndices Consolidados (Índice)'));
    ch.push(note('REGLA 12 v2.6 — Doble render: cada apéndice ya fue renderizado inline en su actividad. Este índice lista todos los apéndices con su ubicación de uso.'));
    const rows = Object.values(apendicesById).map(ap => [ap.id || '—', ap.titulo || '—', ap.ubicacion_seccion || '—', ap.contenido_inline?.tipo || '—']);
    ch.push(makeTable(['ID', 'Título', 'Ubicación', 'Tipo'], rows, [1200, 4500, 2200, 2180]));
  }

  // Validation checks
  if (d.validation_checks) {
    ch.push(pageBreak());
    ch.push(H1('Validation Checks'));
    for (const [k, v] of Object.entries(d.validation_checks)) ch.push(kv(k.replaceAll('_', ' '), typeof v === 'object' ? JSON.stringify(v) : String(v)));
  }

  return new Document({
    creator: 'FPI CD Engine v2.6',
    title: 'GFPI-F-135 Guía del Aprendiz FINAL — MGV G1',
    description: 'Guía del aprendiz para auditoría — MGV-2026-04-20 G1',
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } } },
      footers: standardFooter('GFPI-F-135 Guía del Aprendiz'),
      children: ch,
    }],
  });
}

// =========================================================================
// Main
// =========================================================================
async function main() {
  const outputs = [
    ['pm-3-1-FINAL-G1.docx', buildPM31Docx],
    ['pm-3-2-FINAL-G1.docx', buildPM32Docx],
    ['pm-3-6-FINAL-G1.docx', buildPM36Docx],
  ];
  for (const [name, builder] of outputs) {
    try {
      const doc = builder();
      const buf = await Packer.toBuffer(doc);
      const out = path.join(RUN_DIR, name);
      fs.writeFileSync(out, buf);
      console.log(`OK  ${name}  (${(buf.length/1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`FAIL ${name}:`, err.message);
      console.error(err.stack);
    }
  }
}

main();
