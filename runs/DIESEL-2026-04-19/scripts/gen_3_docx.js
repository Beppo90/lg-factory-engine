#!/usr/bin/env node
/**
 * gen_3_docx.js — Generates 3 review DOCX:
 *   1. pm-3-2-s1-review.docx  (S1 piloto DIESEL G1)
 *   2. pm-4-1-review.docx     (5 instrumentos formativos)
 *   3. pm-4-2-review.docx     (Cuestionario Consolidado E6)
 *
 * Output path: /sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, PageOrientation, LevelFormat,
  Footer, PageNumber
} = require('docx');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19';

// ------- Paleta SENA institucional v2.6.6 (verde protagonista + azul oscuro) -------
// Nombres legacy preservados; valores remapeados a identidad de marca SENA.
const NAVY = '0B2E45';      // azul oscuro SENA — títulos, encabezados de tabla
const ORANGE = '39A900';    // verde SENA institucional — acentos, bordes, CTAs (legacy)
const GREY = '666666';
const LIGHT = 'F2F2F2';
const ACCENT = 'D5E8F0';
const WHITE = 'FFFFFF';

// ------- Helpers -------
const P = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text: String(text ?? ''), font: 'Calibri', size: opts.size || 20, bold: !!opts.bold, italics: !!opts.italics, color: opts.color || undefined })],
  alignment: opts.alignment || AlignmentType.LEFT,
  spacing: { after: opts.after ?? 80 },
});

const Runs = (runs, opts = {}) => new Paragraph({
  children: runs.map(r => new TextRun({ text: String(r.text ?? ''), font: 'Calibri', size: r.size || 20, bold: !!r.bold, italics: !!r.italics, color: r.color || undefined, underline: r.underline || undefined })),
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

const standardFooter = (title) => ({
  default: new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `${title} · DIESEL-2026-04-19 · `, font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ text: ' / ', font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Calibri', size: 16, color: GREY }),
      ],
    })],
  }),
});

// ----------------------------------------------------------------
// DOC 1: pm-3-2-s1-review.docx
// ----------------------------------------------------------------
function buildS1Doc() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-3-2-s1.json'), 'utf8'));
  const children = [];

  // Title
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({ text: 'PM-3.2 — Playbook Build-Out · Session 1 (Piloto)', font: 'Calibri', size: 40, bold: true, color: NAVY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: d.session_name || '', font: 'Calibri', size: 24, color: ORANGE, bold: true })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    border: { bottom: { color: ORANGE, space: 2, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({ text: `${d.programa} · ${d.guide} · ${d.cefr} · ${d.duracion_min} min`, font: 'Calibri', size: 18, color: GREY, italics: true })],
  }));

  // Identity
  children.push(H1('1. Identidad del documento'));
  children.push(kv('PM', d.pm_id + ' v' + d.pm_version));
  children.push(kv('Run', d.run_id));
  children.push(kv('Session', `${d.session} — ${d.session_name}`));
  children.push(kv('Programa', `${d.programa} (${d.programa_codigo})`));
  children.push(kv('Guía', d.guide));
  children.push(kv('CEFR', d.cefr));
  children.push(kv('Duración', `${d.duracion_min} min · ${d.session_header?.duracion_horas} h`));
  children.push(kv('Status', d.status));
  children.push(kv('Piloto note', d.piloto_note || '—'));

  // Pedagogical positioning
  children.push(H1('2. Posición pedagógica SENA'));
  children.push(kv('Momento SENA', d.momento_sena));
  children.push(kv('Estrategia didáctica', d.estrategia_didactica));
  children.push(kv('Justificación', d.justificacion_didactica));

  // Header info
  if (d.session_header) {
    children.push(H1('3. Header de la sesión'));
    children.push(kv('Título', d.session_header.titulo));
    children.push(kv('Subtítulo', d.session_header.subtitulo));
    children.push(H4('Worksheets asignados'));
    for (const w of d.session_header.worksheets_asignados || []) children.push(bullet(w));
    if (d.session_header.habilidades_soporte) {
      children.push(H4('Habilidades soporte'));
      for (const h of d.session_header.habilidades_soporte) children.push(bullet(h));
    }
    children.push(H4('Nota del instructor'));
    children.push(P(d.session_header.nota_instructor || '', { italics: true, color: GREY }));
  }

  // Materials
  if (d.materials_checklist?.length) {
    children.push(H1('4. Lista de materiales'));
    const rows = [new TableRow({
      children: [headerCell('Material', 6000), headerCell('Cantidad', 2500), headerCell('✓', 1580)],
      tableHeader: true,
    })];
    for (const m of d.materials_checklist) {
      rows.push(new TableRow({
        children: [cell(m.item, 6000), cell(m.cantidad, 2500), cell(m.verificado ? '✓' : '☐', 1580)],
      }));
    }
    children.push(new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } }));
    children.push(P('', { after: 120 }));
  }

  // Board plan
  if (d.board_plan) {
    children.push(H1('5. Board Plan'));
    children.push(P(String(d.board_plan), { after: 100 }));
  }

  // Timeline
  if (d.timeline?.length) {
    children.push(H1('6. Timeline de 360 minutos'));
    const rows = [new TableRow({
      children: [
        headerCell('Tiempo', 1500),
        headerCell('Min', 700),
        headerCell('Bloque', 1400),
        headerCell('Actividad', 4000),
        headerCell('Agrupación', 2480),
      ],
      tableHeader: true,
    })];
    for (const t of d.timeline) {
      rows.push(new TableRow({
        children: [
          cell(t.tiempo, 1500),
          cell(String(t.duracion_min), 700),
          cell(t.bloque, 1400, { fill: ACCENT, bold: true }),
          cell(t.actividad, 4000),
          cell(t.agrupacion || '—', 2480),
        ],
      }));
    }
    children.push(new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } }));
    children.push(P('', { after: 120 }));
    for (const t of d.timeline) {
      if (t.notas) children.push(P(`  • ${t.bloque} (${t.tiempo}): ${t.notas}`, { italics: true, color: GREY }));
    }
  }

  // SET-UP
  if (d.set_up) {
    children.push(H1('7. SET-UP (' + (d.set_up.duracion_min || 25) + ' min)'));
    if (d.set_up.warm_up) {
      children.push(H3('Warm-up: ' + d.set_up.warm_up.nombre));
      children.push(kv('Duración', `${d.set_up.warm_up.duration_min} min`));
      children.push(H4('Pasos'));
      for (const p of d.set_up.warm_up.pasos || []) children.push(bullet(p));
    }
    if (d.set_up.teacher_talk_opening) {
      children.push(H3('Teacher Talk — Opening'));
      children.push(Runs([
        { text: d.set_up.teacher_talk_opening, italics: true },
      ]));
    }
    // Render any remaining sub-keys
    for (const key of Object.keys(d.set_up)) {
      if (['duracion_min', 'warm_up', 'teacher_talk_opening'].includes(key)) continue;
      const v = d.set_up[key];
      if (v == null) continue;
      children.push(H3(key));
      if (typeof v === 'string') children.push(P(v));
      else if (Array.isArray(v)) { for (const item of v) children.push(bullet(typeof item === 'string' ? item : JSON.stringify(item))); }
      else if (typeof v === 'object') {
        for (const [kk, vv] of Object.entries(v)) {
          children.push(kv(kk, typeof vv === 'string' ? vv : JSON.stringify(vv).substring(0, 300)));
        }
      }
    }
  }

  // WHILE blocks
  if (d.while) {
    children.push(H1('8. WHILE — Bloques principales'));
    const whileBlocks = Array.isArray(d.while) ? d.while : Object.entries(d.while).map(([k, v]) => ({ key: k, ...v }));
    for (const b of whileBlocks) {
      const title = (b.bloque || b.key || '') + (b.nombre ? ' — ' + b.nombre : '');
      children.push(H2('▸ ' + title + (b.duracion_min ? ` (${b.duracion_min} min)` : '')));
      if (b.tecnica_didactica) children.push(kv('Técnica didáctica', b.tecnica_didactica));
      if (b.objetivo) children.push(kv('Objetivo', b.objetivo));
      if (b.agrupacion) children.push(kv('Agrupación', b.agrupacion));
      if (b.teacher_talk_instruction) {
        children.push(H4('Teacher Talk'));
        const tt = typeof b.teacher_talk_instruction === 'string' ? b.teacher_talk_instruction : JSON.stringify(b.teacher_talk_instruction, null, 2);
        children.push(P(tt, { italics: true }));
      }
      if (b.icq) {
        children.push(H4('ICQs'));
        const icqs = Array.isArray(b.icq) ? b.icq : [b.icq];
        for (const q of icqs) children.push(bullet(typeof q === 'string' ? q : JSON.stringify(q)));
      }
      if (b.answer_key_inline) {
        children.push(H4('Answer key (inline)'));
        const ak = b.answer_key_inline;
        if (typeof ak === 'string') children.push(P(ak));
        else if (Array.isArray(ak)) for (const a of ak) children.push(bullet(typeof a === 'string' ? a : JSON.stringify(a)));
        else for (const [k, v] of Object.entries(ak)) children.push(kv(k, typeof v === 'string' ? v : JSON.stringify(v).substring(0, 200)));
      }
      if (b.facilitation_notes) {
        children.push(H4('Facilitation notes'));
        const n = Array.isArray(b.facilitation_notes) ? b.facilitation_notes : [b.facilitation_notes];
        for (const note of n) children.push(bullet(typeof note === 'string' ? note : JSON.stringify(note)));
      }
      if (b.checkpoint) { children.push(H4('Checkpoint')); children.push(P(typeof b.checkpoint === 'string' ? b.checkpoint : JSON.stringify(b.checkpoint))); }
      if (b.transition) { children.push(H4('Transition')); children.push(P(typeof b.transition === 'string' ? b.transition : JSON.stringify(b.transition))); }
    }
  }

  // WRAP-UP
  if (d.wrap_up) {
    children.push(H1('9. WRAP-UP'));
    const wu = d.wrap_up;
    if (wu.duracion_min) children.push(kv('Duración', wu.duracion_min + ' min'));
    for (const [k, v] of Object.entries(wu)) {
      if (k === 'duracion_min') continue;
      children.push(H3(k));
      if (typeof v === 'string') children.push(P(v));
      else if (Array.isArray(v)) for (const x of v) children.push(bullet(typeof x === 'string' ? x : JSON.stringify(x)));
      else if (typeof v === 'object') for (const [kk, vv] of Object.entries(v)) children.push(kv(kk, typeof vv === 'string' ? vv : JSON.stringify(vv).substring(0, 200)));
    }
  }

  // pm0_protocol
  if (d.pm0_protocol) {
    children.push(H1('10. PM-0 Protocol (inherited)'));
    const p = d.pm0_protocol;
    if (p.__inherited_from__) children.push(P('Inherited from: ' + p.__inherited_from__, { italics: true, color: GREY }));
    if (p.__contract_version__) children.push(P('Contract version: ' + p.__contract_version__, { italics: true, color: GREY }));

    if (p.l1_management) {
      children.push(H3('L1 Management'));
      children.push(kv('L1 %', p.l1_management.l1_percentage + '%'));
      children.push(kv('Rationale', p.l1_management.l1_rationale || '—'));
      children.push(kv('Source', p.l1_management.source || '—'));
    }
    if (p.feedback) {
      children.push(H3('Feedback mode'));
      children.push(kv('Mode', p.feedback.mode));
      children.push(kv('Rationale', p.feedback.rationale || '—'));
      const techs = p.feedback.accuracy_techniques || p.feedback.fluency_techniques || p.feedback.mixed_techniques || [];
      if (techs.length) { children.push(H4('Techniques')); for (const t of techs) children.push(bullet(typeof t === 'string' ? t : JSON.stringify(t))); }
    }
    if (p.grammar_groups) {
      children.push(H3('Grammar groups'));
      for (const g of p.grammar_groups) children.push(bullet(`${g.group_id} · ${g.group_name} · ${g.nivel_activacion} · ej: ${g.ejemplo_en_sesion || '—'}`));
      if (p.grammar_carga_check) {
        children.push(H4('Grammar carga check'));
        children.push(kv('Intro activos', p.grammar_carga_check.intro_count));
        children.push(kv('Max permitido', p.grammar_carga_check.max_allowed));
        children.push(kv('Status', p.grammar_carga_check.status));
      }
    }
    if (p.stress_pronunciation) {
      children.push(H3('Stress / pronunciation focus'));
      const fw = p.stress_pronunciation.focus_words || [];
      for (const w of fw) children.push(bullet(typeof w === 'string' ? w : JSON.stringify(w)));
    }
    if (p.success_vocabulary) {
      children.push(H3('SUCCESS vocabulary'));
      const tw = p.success_vocabulary.target_words || [];
      children.push(P('Target words: ' + tw.join(', ')));
      const fa = p.success_vocabulary.factors_applied || [];
      if (fa.length) children.push(P('Factors: ' + fa.join(', ')));
    }
    if (p.cefr_descriptor_focus) {
      children.push(H3('CEFR descriptor focus'));
      if (typeof p.cefr_descriptor_focus === 'string') children.push(P(p.cefr_descriptor_focus));
      else for (const [k, v] of Object.entries(p.cefr_descriptor_focus)) children.push(kv(k, typeof v === 'string' ? v : JSON.stringify(v).substring(0, 200)));
    }
  }

  // Totals check
  if (d.totals_check) {
    children.push(H1('11. Totales & verificación'));
    for (const [k, v] of Object.entries(d.totals_check)) children.push(kv(k, typeof v === 'string' ? v : JSON.stringify(v)));
  }
  if (d.rap_status) { children.push(H1('12. RAP status')); children.push(P(d.rap_status)); }

  return new Document({
    creator: 'FPI CD Engine v2.5.1',
    title: 'PM-3.2 S1 Review · DIESEL G1',
    styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      footers: standardFooter('PM-3.2 S1 Piloto'),
      children,
    }],
  });
}

// ----------------------------------------------------------------
// DOC 2: pm-4-1-review.docx
// ----------------------------------------------------------------
function buildPM41Doc() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-4-1.json'), 'utf8'));
  const children = [];

  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({ text: 'PM-4.1 — Instrumentos de Evaluación Formativa', font: 'Calibri', size: 40, bold: true, color: NAVY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: '5 instrumentos derivados · ' + d.guide, font: 'Calibri', size: 22, color: ORANGE, bold: true })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    border: { bottom: { color: ORANGE, space: 2, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({ text: d.program_name + ' · ' + d.cefr_level + ' · RAP ' + d.rap_id, font: 'Calibri', size: 18, color: GREY, italics: true })],
  }));

  // Identity
  children.push(H1('1. Identidad & rol pedagógico'));
  children.push(kv('PM', d.pm_id + ' v' + d.pm_version));
  children.push(kv('Run', d.run_id));
  children.push(kv('Universo', d.universe_anchor));
  children.push(kv('Rol', d.identity.role));
  children.push(kv('Formato output', d.identity.output_format));
  children.push(P(d.identity.relation_to_pm_4_2, { italics: true, color: GREY }));

  // Canon
  children.push(H1('2. Canon de puntuación DIESEL G1'));
  children.push(P(d.canon_scoring.description, { bold: true }));
  const canonRows = [new TableRow({
    children: [headerCell('Evidencia', 5080), headerCell('Instrumento / PM', 3500), headerCell('Puntos', 1500)],
    tableHeader: true,
  })];
  const bd = d.canon_scoring.breakdown;
  const canonList = [
    ['E1 Reading', 'Cuestionario No 1 (PM-4.1)', bd.E1_reading_pm_4_1_cuestionario_1],
    ['E2 Writing', 'Rúbrica No 2 (PM-4.1)', bd.E2_writing_pm_4_1_rubrica_2],
    ['E3 Listening', 'Lista Chequeo No 3 (PM-4.1)', bd.E3_listening_pm_4_1_lista_chequeo_3],
    ['E4 Speaking', 'Escala No 4 (PM-4.1)', bd.E4_speaking_pm_4_1_escala_estimacion_4],
    ['E5 Language Functions', 'Escala No 5 (PM-4.1)', bd.E5_language_functions_pm_4_1_escala_estimacion_5],
    ['E6 Cuestionario Consolidado', 'PM-4.2', bd.E6_cuestionario_consolidado_pm_4_2],
    ['E-Misión Final', 'PM-3.5', bd.E_mision_final_pm_3_5],
    ['TOTAL', '', bd.TOTAL],
  ];
  for (const [ev, inst, pts] of canonList) {
    const isTotal = ev === 'TOTAL';
    canonRows.push(new TableRow({
      children: [
        cell(ev, 5080, { bold: isTotal, fill: isTotal ? ACCENT : undefined }),
        cell(inst, 3500, { bold: isTotal, fill: isTotal ? ACCENT : undefined }),
        cell(String(pts), 1500, { bold: isTotal, fill: isTotal ? ACCENT : undefined }),
      ],
    }));
  }
  children.push(new Table({ rows: canonRows, width: { size: CONTENT_W, type: WidthType.DXA } }));
  children.push(P('', { after: 120 }));

  // 5 instruments
  const instrumentKeys = ['instrument_1_reading', 'instrument_2_writing', 'instrument_3_listening', 'instrument_4_speaking', 'instrument_5_language_functions'];
  for (let idx = 0; idx < instrumentKeys.length; idx++) {
    const i = d[instrumentKeys[idx]];
    children.push(H1(`${idx + 1}. ${i.instrument_code} · ${i.instrument_name_es}`));
    children.push(kv('Evidencia SENA', `${i.evidence_code} — ${i.evidence_type_sena}`));
    children.push(kv('Técnica de evaluación', i.evaluation_technique));
    children.push(kv('Sesión / Fase', `S${i.applied_in_session} · ${i.applied_in_phase_sena}`));
    children.push(kv('Duración', String(i.duration_minutes) + (typeof i.duration_minutes === 'number' ? ' min' : '')));
    children.push(kv('Ambiente', i.ambiente));
    children.push(kv('Puntos', String(i.points_total)));

    // Header bilingual
    if (i.header_bilingual) {
      children.push(H3('Encabezado impreso'));
      for (const [k, v] of Object.entries(i.header_bilingual)) children.push(kv(k, v));
    }

    // Reading: items
    if (i.items) {
      children.push(H3('Ítems del cuestionario'));
      for (const it of i.items) {
        children.push(H4(`Ítem ${it.item} (${it.type}) — ${it.points} pt`));
        children.push(P(it.stem_en, { bold: true }));
        if (it.stem_es_support) children.push(P(it.stem_es_support, { italics: true, color: GREY }));
        for (const [k, v] of Object.entries(it.options || {})) {
          children.push(P(`  ${k}) ${v}`));
        }
        children.push(Runs([
          { text: 'Correcta: ', bold: true, color: ORANGE },
          { text: it.correct, bold: true },
          { text: it.rationale ? '   — ' + it.rationale : '', italics: true, color: GREY },
        ]));
      }
      if (i.answer_key) {
        children.push(H4('Answer key'));
        children.push(P(i.answer_key.join(' · ')));
      }
    }

    // Writing: criteria
    if (i.criteria) {
      children.push(H3('Criterios de la rúbrica'));
      const rows = [new TableRow({
        children: [headerCell('Criterio', 4500), headerCell('Max', 800), headerCell('Excelente', 1600), headerCell('Adecuado', 1600), headerCell('Incipiente', 1580)],
        tableHeader: true,
      })];
      for (const c of i.criteria) {
        rows.push(new TableRow({
          children: [
            cell(c.criterion_name, 4500),
            cell(String(c.points_max), 800),
            cell(c.level_excellent_1pt || c.level_excellent_1_5pt, 1600),
            cell(c.level_adequate_0_5pt || c.level_adequate_1pt, 1600),
            cell(c.level_incipient_0pt, 1580),
          ],
        }));
      }
      children.push(new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } }));
      children.push(P('', { after: 120 }));
      if (i.total_field) children.push(P(i.total_field, { bold: true }));
      if (i.qualitative_feedback_field) children.push(P(i.qualitative_feedback_field, { italics: true }));
    }

    // Listening: checklist
    if (i.checklist_items) {
      children.push(H3('Checklist de observación'));
      const rows = [new TableRow({
        children: [headerCell('#', 500), headerCell('Criterio', 4500), headerCell('Evidencia observable', 3500), headerCell('✓/✗', 1580)],
        tableHeader: true,
      })];
      for (const it of i.checklist_items) {
        rows.push(new TableRow({
          children: [
            cell(String(it.item), 500),
            cell(it.criterion, 4500),
            cell(it.observable_evidence, 3500),
            cell(it.score_field, 1580),
          ],
        }));
      }
      children.push(new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } }));
      children.push(P('', { after: 120 }));
      if (i.total_field) children.push(P(i.total_field, { bold: true }));
    }

    // Speaking: observation_criteria
    if (i.observation_criteria) {
      children.push(H3('Criterios de observación (Escala 2/1/0)'));
      const rows = [new TableRow({
        children: [headerCell('Criterio', 4200), headerCell('Logrado (2)', 2000), headerCell('En proceso (1)', 2000), headerCell('No logrado (0)', 1880)],
        tableHeader: true,
      })];
      for (const c of i.observation_criteria) {
        rows.push(new TableRow({
          children: [
            cell(c.criterion_name, 4200),
            cell(c.score_2_logrado, 2000),
            cell(c.score_1_en_proceso, 2000),
            cell(c.score_0_no_logrado, 1880),
          ],
        }));
      }
      children.push(new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } }));
      children.push(P('', { after: 120 }));
      if (i.raw_total_field) children.push(P(i.raw_total_field, { bold: true }));
      if (i.final_score_formula) children.push(P(i.final_score_formula, { bold: true, color: ORANGE }));
      if (i.expected_errors_a1_1) {
        children.push(H4('Errores esperados A1.1'));
        for (const e of i.expected_errors_a1_1) children.push(bullet(e));
      }
      if (i.plan_b_if_learner_freezes) {
        children.push(H4('Plan B si el aprendiz se congela'));
        for (const p of i.plan_b_if_learner_freezes) children.push(bullet(p));
      }
    }

    // Language Functions: stations
    if (i.stations) {
      children.push(H3('Estaciones del Role Carousel'));
      for (const s of i.stations) {
        children.push(H4(`Estación ${s.station} — ${s.function}`));
        children.push(kv('Escenario', s.scenario));
        children.push(P('Chunks requeridos: ' + s.required_chunks.join(' · '), { italics: true }));
        children.push(kv('Conector requerido', s.connector_required));
        children.push(kv('1 pt si', s.score_1pt_if));
        children.push(kv('0 pt si', s.score_0pt_if));
      }
      if (i.total_field) children.push(P(i.total_field, { bold: true }));
    }

    if (i.cross_reference_to_e6) children.push(P(i.cross_reference_to_e6, { italics: true, color: GREY }));
  }

  // Consolidated summary
  if (d.consolidated_summary_for_instructor) {
    children.push(H1('8. Resumen consolidado para el instructor'));
    const s = d.consolidated_summary_for_instructor;
    children.push(kv('Instrumentos totales', String(s.total_instrumentos)));
    children.push(kv('Puntos Fase Apropiación', String(s.total_puntos_fase_apropiacion)));
    const rows = [new TableRow({
      children: [headerCell('S', 800), headerCell('E', 800), headerCell('Instrumento', 5080), headerCell('Pts', 800), headerCell('Tipo', 2600)],
      tableHeader: true,
    })];
    for (const m of s.instruments_map) {
      rows.push(new TableRow({
        children: [cell(String(m.session), 800), cell(m.evidence, 800), cell(m.instrument, 5080), cell(String(m.pts), 800), cell(m.type, 2600)],
      }));
    }
    children.push(new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } }));
    children.push(P('', { after: 120 }));
    children.push(P(s.s6_note, { italics: true }));
    children.push(P(s.final_mission_note, { italics: true }));
  }

  // Validation
  if (d.validacion) {
    children.push(H1('9. Validación'));
    for (const [k, v] of Object.entries(d.validacion)) {
      children.push(Runs([
        { text: k + ': ', bold: true, color: NAVY },
        { text: String(v), color: String(v).startsWith('PASS') ? ORANGE : GREY, bold: String(v).startsWith('PASS') },
      ]));
    }
  }
  if (d.siguiente_paso) { children.push(H1('10. Siguiente paso')); children.push(P(d.siguiente_paso)); }

  return new Document({
    creator: 'FPI CD Engine v2.5.1',
    title: 'PM-4.1 Review · DIESEL G1',
    styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      footers: standardFooter('PM-4.1 · 5 Instrumentos'),
      children,
    }],
  });
}

// ----------------------------------------------------------------
// DOC 3: pm-4-2-review.docx
// ----------------------------------------------------------------
function buildPM42Doc() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-4-2.json'), 'utf8'));
  const children = [];

  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({ text: 'PM-4.2 — Cuestionario Consolidado E6', font: 'Calibri', size: 40, bold: true, color: NAVY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: '25 ítems · 25 puntos · Sesión 6', font: 'Calibri', size: 24, color: ORANGE, bold: true })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    border: { bottom: { color: ORANGE, space: 2, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({ text: d.program_name + ' · ' + d.guide + ' · ' + d.cefr_level, font: 'Calibri', size: 18, color: GREY, italics: true })],
  }));

  // Identity
  children.push(H1('1. Identidad del instrumento'));
  children.push(kv('PM', d.pm_id + ' v' + d.pm_version));
  children.push(kv('Run', d.run_id));
  children.push(kv('Universo', d.universe_anchor));
  children.push(kv('Sesión de aplicación', `S${d.applied_in_session} · ${d.applied_in_phase_sena}`));
  children.push(kv('Duración', d.duration_minutes + ' min'));
  children.push(kv('Modalidad', d.modality));
  children.push(kv('Ambiente', d.ambiente));

  // Identity deeper
  children.push(H3('Rol pedagógico'));
  children.push(P(d.identity.role));
  children.push(P(d.identity.relation_to_pm_4_1, { italics: true, color: GREY }));
  children.push(kv('Principio de diseño', d.identity.design_principle));

  // Canon structure
  children.push(H1('2. Estructura canónica'));
  const cs = d.canon_structure;
  children.push(kv('Ítems totales', String(cs.total_items)));
  children.push(kv('Puntos totales', String(cs.total_points)));
  children.push(kv('Secciones', `${cs.sections} secciones × ${cs.items_per_section} ítems × ${cs.points_per_item} pt`));
  children.push(kv('Formato', cs.format));
  children.push(kv('Canon ref', cs.canon_reference));

  const csRows = [new TableRow({
    children: [headerCell('Sec', 700), headerCell('Skill', 2800), headerCell('Pts', 900), headerCell('Fuente PM', 5680)],
    tableHeader: true,
  })];
  for (const s of cs.sections_list) {
    csRows.push(new TableRow({
      children: [cell(String(s.section), 700), cell(s.skill, 2800), cell(String(s.pts), 900), cell(s.source_pm, 5680)],
    }));
  }
  children.push(new Table({ rows: csRows, width: { size: CONTENT_W, type: WidthType.DXA } }));
  children.push(P('', { after: 120 }));

  // Header bilingual (what learner sees)
  children.push(H1('3. Encabezado del aprendiz'));
  const h = d.header_bilingual;
  for (const [k, v] of Object.entries(h)) children.push(kv(k, String(v)));

  // Sections
  const sectionKeys = ['section_1_reading', 'section_2_writing', 'section_3_listening', 'section_4_vocabulary', 'section_5_grammar'];
  for (let idx = 0; idx < sectionKeys.length; idx++) {
    const s = d[sectionKeys[idx]];
    children.push(H1(`Sección ${idx + 1}: ${s.section_title_en}`));
    children.push(P(s.instruction_en, { bold: true }));
    children.push(P(s.instruction_es, { italics: true, color: GREY }));
    if (s.anchor_text_reprint_en) {
      children.push(H4('Master Anchor Text (reimpresión)'));
      children.push(P(s.anchor_text_reprint_en, { italics: true }));
    }
    if (s.audio_reference) children.push(P('Audio referencia: ' + s.audio_reference, { italics: true, color: GREY }));

    for (const it of s.items) {
      children.push(H3(`Ítem ${it.item} · ${it.skill} · ${it.type}`));
      children.push(P(it.stem_en, { bold: true }));
      for (const [k, v] of Object.entries(it.options || {})) {
        children.push(P(`  ${k}) ${v}`));
      }
      children.push(Runs([
        { text: 'Correcta: ', bold: true, color: ORANGE },
        { text: it.correct, bold: true, color: ORANGE },
        { text: it.grammar_tested ? '   [' + it.grammar_tested + ']' : it.category_tested ? '   [' + it.category_tested + ']' : '', italics: true, color: GREY },
      ]));
    }
  }

  // Answer key master
  children.push(H1('9. Answer Key Master'));
  const ak = d.answer_key_master;
  const akRows = [new TableRow({
    children: [headerCell('Sección', 3500), headerCell('Respuestas', 6580)],
    tableHeader: true,
  })];
  for (const [k, v] of Object.entries(ak)) {
    if (!Array.isArray(v)) continue;
    akRows.push(new TableRow({
      children: [cell(k, 3500, { bold: true }), cell(v.join(' · '), 6580)],
    }));
  }
  children.push(new Table({ rows: akRows, width: { size: CONTENT_W, type: WidthType.DXA } }));
  children.push(P('', { after: 120 }));
  children.push(P('Ítems totales: ' + ak.total_items + ' · Puntos totales: ' + ak.total_points, { bold: true }));

  // Scoring matrix
  if (d.scoring_matrix_instructor) {
    children.push(H1('10. Matriz de calificación'));
    const sm = d.scoring_matrix_instructor;
    children.push(P(sm.instruction, { italics: true }));
    for (const [k, v] of Object.entries(sm.section_scores_fields)) children.push(kv(k, v));
    children.push(H3('Escala interpretativa'));
    for (const [k, v] of Object.entries(sm.interpretation_scale)) children.push(kv(k, v));
  }

  // Coverage checks
  if (d.vocabulary_coverage_check) {
    children.push(H1('11. Cobertura de vocabulario'));
    children.push(kv('Cobertura 20/20', d.vocabulary_coverage_check.coverage_20_of_20 ? '✓ PASS' : '✗ FAIL'));
    children.push(P('Términos testeados: ' + d.vocabulary_coverage_check.terms_in_quiz.join(', ')));
    children.push(P(d.vocabulary_coverage_check.note, { italics: true, color: GREY }));
  }
  if (d.grammar_coverage_check) {
    children.push(H1('12. Cobertura gramatical'));
    children.push(P('Grupos en Sección 5: ' + d.grammar_coverage_check.groups_tested_in_section_5.join(', ')));
    children.push(P('Grupos en otras secciones: ' + d.grammar_coverage_check.groups_not_in_section_5_but_in_other_sections.join(', ')));
    children.push(P(d.grammar_coverage_check.coverage, { italics: true }));
  }

  // Validation
  if (d.validacion) {
    children.push(H1('13. Validación'));
    for (const [k, v] of Object.entries(d.validacion)) {
      children.push(Runs([
        { text: k + ': ', bold: true, color: NAVY },
        { text: String(v), color: String(v).startsWith('PASS') ? ORANGE : GREY, bold: String(v).startsWith('PASS') },
      ]));
    }
  }

  if (d.siguiente_paso) { children.push(H1('14. Siguiente paso')); children.push(P(d.siguiente_paso)); }

  return new Document({
    creator: 'FPI CD Engine v2.5.1',
    title: 'PM-4.2 Cuestionario E6 Review · DIESEL G1',
    styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      footers: standardFooter('PM-4.2 · Cuestionario E6'),
      children,
    }],
  });
}

// ----------------------------------------------------------------
// Main
// ----------------------------------------------------------------
async function main() {
  const outputs = [
    { name: 'pm-3-2-s1-review.docx', builder: buildS1Doc },
    { name: 'pm-4-1-review.docx', builder: buildPM41Doc },
    { name: 'pm-4-2-review.docx', builder: buildPM42Doc },
  ];
  for (const o of outputs) {
    const doc = o.builder();
    const buf = await Packer.toBuffer(doc);
    const p = path.join(RUN_DIR, o.name);
    fs.writeFileSync(p, buf);
    console.log('  [ok] ' + p + ' (' + buf.length + ' bytes)');
  }
  console.log('[done] 3 DOCX review generados');
}

main().catch(e => { console.error(e); process.exit(1); });
