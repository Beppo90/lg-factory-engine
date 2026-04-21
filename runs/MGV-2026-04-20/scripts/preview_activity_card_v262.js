#!/usr/bin/env node
/**
 * preview_activity_card_v262.js
 *
 * Genera un DOCX standalone de una sola página con DOS actividades de
 * ejemplo renderizadas en el estilo v2.6.2 propuesto, para aprobación
 * visual del instructor ANTES de migrar las 30 actividades reales.
 *
 * Muestra:
 *   1. A3.1.2 — Vocabulary Pre-Diagnostic (sin evidencia, individual)
 *   2. A3.3.S2.4 — EVIDENCE E1 Reading Quiz (con bloque evidencia)
 *
 * Reglas v2.6.2 aplicadas:
 *   - EN primero (Calibri 11pt NAVY regular), ES debajo (Calibri 7pt
 *     DKGREY italic) — sin prefijos "EN:" / "ES:"
 *   - 5–7 pasos numerados, número en ORANGE bold
 *   - V+O+C NO visible para el aprendiz
 *   - Encabezado: "Axxx · Actividad cognitiva" + título + (tiempo · agrupación)
 *   - Entregable con Producto / Formato / Criterio mínimo (bilingüe EN+ES)
 *   - Footer sutil v2.6.1 intacto (Línea 1 logística + Línea 2 evidencia)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, HeadingLevel, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition, ShadingType,
} = require('docx');

const ROOT = path.resolve(__dirname, '..');
const pm36 = JSON.parse(fs.readFileSync(path.join(ROOT, 'pm-3-6.json'), 'utf8'));

// ── Palette (same as gen_audit_docx.js) ────────────────────────────────────
const NAVY = '1C2B3C';
const ORANGE = 'F59316';
const STEEL = '2E4057';
const DKGREY = '5A6A7A';
const LGREY = 'D0D6DC';
const CREAM = 'FFF8EE';

// ── Resolve real footers from pm-3-6 ───────────────────────────────────────
function findActivity(id) {
  let found = null;
  (function walk(o) {
    if (!o || typeof o !== 'object' || found) return;
    if (Array.isArray(o)) return o.forEach(walk);
    if ((o.actividad_id || o.activity_id) === id) { found = o; return; }
    for (const k of Object.keys(o)) walk(o[k]);
  })(pm36.seccion_3_actividades_aprendizaje);
  return found;
}

// ── Sample content for the 2 preview activities ────────────────────────────
const preview = [
  {
    id: 'A3.1.2',
    tipo_actividad_sena: 'Actividad cognitiva',
    tiempo_min: 25,
    agrupacion: 'individual',
    titulo_en: 'Vocabulary Pre-Diagnostic — Map Your Starting Point',
    titulo_es: 'Pre-diagnóstico de vocabulario — Tu punto de partida',
    descripcion: {
      en: 'This diagnostic is your personal map of design vocabulary. It is not graded and there are no wrong answers — the only goal is to make your starting point visible so you can measure your growth.',
      es: 'Este diagnóstico es tu mapa personal del vocabulario de diseño. No tiene nota y no hay respuestas incorrectas — el único objetivo es hacer visible tu punto de partida para que puedas medir tu crecimiento.'
    },
    pasos: [
      { en: 'Take the diagnostic sheet with 20 design words.',
        es: 'Toma la hoja diagnóstica con 20 palabras de diseño.' },
      { en: 'Read each word slowly. Pause on each one.',
        es: 'Lee cada palabra con calma. Detente en cada una.' },
      { en: 'Mark ✓ if you know the word in English.',
        es: 'Marca ✓ si conoces la palabra en inglés.' },
      { en: 'Mark ? if the word is new or unclear.',
        es: 'Marca ? si la palabra es nueva o no te queda clara.' },
      { en: 'Do not leave any word blank — "unknown" is valuable information.',
        es: 'No dejes ninguna palabra en blanco — "no lo sé" también es información valiosa.' },
      { en: 'Keep the sheet. You will compare it again in Session 6 to see how far you have come.',
        es: 'Guarda la hoja. La volverás a comparar en la Sesión 6 para ver cuánto has avanzado.' }
    ],
    entregable: {
      producto:        { en: 'Diagnostic sheet with all 20 terms marked (✓ or ?).',
                         es: 'Hoja diagnóstica con los 20 términos marcados (✓ o ?).' },
      formato:         { en: 'Printed A4 sheet provided by the instructor.',
                         es: 'Hoja A4 impresa entregada por el instructor.' },
      criterio_minimo: { en: '20 terms marked, zero blanks.',
                         es: 'Los 20 términos marcados, ningún espacio vacío.' }
    }
  },
  {
    id: 'A3.3.S2.4',
    tipo_actividad_sena: 'Actividad cognitiva',
    tiempo_min: 25,
    agrupacion: 'individual',
    titulo_en: 'Reading Quiz — "The Story of Two Letters" (EVIDENCE E1)',
    titulo_es: 'Quiz de lectura — "The Story of Two Letters" (EVIDENCIA E1)',
    descripcion: {
      en: 'This is Evidence 1 of your learning path. You will answer 10 short questions about the reading we worked in Session 2. Trust what you studied — the answer is always in the text.',
      es: 'Esta es la Evidencia 1 de tu ruta de aprendizaje. Responderás 10 preguntas cortas sobre la lectura que trabajamos en la Sesión 2. Confía en lo que estudiaste — la respuesta siempre está en el texto.'
    },
    pasos: [
      { en: 'Receive the quiz sheet (10 questions, multiple choice A/B/C/D).',
        es: 'Recibe la hoja del quiz (10 preguntas, opción múltiple A/B/C/D).' },
      { en: 'Read the full text "The Story of Two Letters" once before answering.',
        es: 'Lee el texto completo "The Story of Two Letters" una vez antes de responder.' },
      { en: 'Answer each question by circling a single letter — A, B, C, or D.',
        es: 'Responde cada pregunta encerrando en un círculo una sola letra — A, B, C o D.' },
      { en: 'Return to the text to find evidence for every answer; do not guess.',
        es: 'Vuelve al texto para encontrar la evidencia de cada respuesta; no adivines.' },
      { en: 'When you finish, review your 10 answers once. Change only if you are sure.',
        es: 'Cuando termines, revisa tus 10 respuestas una vez. Cámbialas solo si estás seguro.' },
      { en: 'Write your name and the date in the header and submit the sheet to the instructor.',
        es: 'Escribe tu nombre y la fecha en el encabezado y entrega la hoja al instructor.' }
    ],
    entregable: {
      producto:        { en: 'Completed quiz sheet with 10 answers circled.',
                         es: 'Hoja del quiz con las 10 respuestas encerradas en círculo.' },
      formato:         { en: 'Printed A4 sheet (1 per learner).',
                         es: 'Hoja A4 impresa (1 por aprendiz).' },
      criterio_minimo: { en: 'All 10 questions answered with one clear circled letter; name and date filled in.',
                         es: 'Las 10 preguntas respondidas con una sola letra claramente encerrada; nombre y fecha diligenciados.' }
    }
  }
];

// ── Renderers ──────────────────────────────────────────────────────────────
function bilingualBlock(en, es, { enSize = 22, esSize = 14, spacingAfter = 120, indent = 0 } = {}) {
  return [
    new Paragraph({
      spacing: { before: 0, after: 20 },
      indent: indent ? { left: indent } : undefined,
      children: [new TextRun({ text: en, font: 'Calibri', size: enSize, color: NAVY })]
    }),
    new Paragraph({
      spacing: { before: 0, after: spacingAfter },
      indent: indent ? { left: indent } : undefined,
      children: [new TextRun({ text: es, font: 'Calibri', size: esSize, color: DKGREY, italics: true })]
    })
  ];
}

function sectionHeader(label) {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    children: [new TextRun({
      text: label.toUpperCase(), font: 'Calibri', size: 18,
      color: STEEL, bold: true, characterSpacing: 40
    })]
  });
}

function activityHeader(act) {
  const paragraphs = [];
  // Top eyebrow: "A3.1.2 · ACTIVIDAD COGNITIVA"
  paragraphs.push(new Paragraph({
    spacing: { before: 280, after: 40 },
    children: [new TextRun({
      text: `${act.id} · ${act.tipo_actividad_sena.toUpperCase()}`,
      font: 'Calibri', size: 16, color: ORANGE, bold: true, characterSpacing: 40
    })]
  }));
  // Title EN (large NAVY bold)
  paragraphs.push(new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [new TextRun({
      text: act.titulo_en, font: 'Calibri', size: 28, color: NAVY, bold: true
    })]
  }));
  // Title ES (subtle italic DKGREY)
  paragraphs.push(new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({
      text: act.titulo_es, font: 'Calibri', size: 16, color: DKGREY, italics: true
    })]
  }));
  // Metadata line: (25 min · individual)
  paragraphs.push(new Paragraph({
    spacing: { before: 0, after: 120 },
    border: { bottom: { color: LGREY, space: 4, style: BorderStyle.SINGLE, size: 4 } },
    children: [new TextRun({
      text: `${act.tiempo_min} min  ·  ${act.agrupacion}`,
      font: 'Calibri', size: 18, color: DKGREY, italics: true
    })]
  }));
  return paragraphs;
}

function stepsBlock(pasos) {
  const ch = [];
  ch.push(sectionHeader('Paso a paso · Step by step'));
  pasos.forEach((p, i) => {
    const num = String(i + 1);
    // Line 1: number (ORANGE bold) + EN (NAVY regular)
    ch.push(new Paragraph({
      spacing: { before: 40, after: 20 },
      indent: { left: 360, hanging: 360 },
      children: [
        new TextRun({ text: `${num}.\t`, font: 'Calibri', size: 22, color: ORANGE, bold: true }),
        new TextRun({ text: p.en, font: 'Calibri', size: 22, color: NAVY })
      ]
    }));
    // Line 2: ES indented, italic small DKGREY
    ch.push(new Paragraph({
      spacing: { before: 0, after: 80 },
      indent: { left: 360 },
      children: [new TextRun({
        text: p.es, font: 'Calibri', size: 14, color: DKGREY, italics: true
      })]
    }));
  });
  return ch;
}

function deliverableBlock(ent) {
  const ch = [];
  ch.push(sectionHeader('Entregable · Deliverable'));
  const rows = [
    { label: 'Producto',        val: ent.producto },
    { label: 'Formato',         val: ent.formato },
    { label: 'Criterio mínimo', val: ent.criterio_minimo }
  ];
  rows.forEach(r => {
    // Line: Label (STEEL bold small-caps) + EN (NAVY)
    ch.push(new Paragraph({
      spacing: { before: 40, after: 0 },
      indent: { left: 200 },
      children: [
        new TextRun({ text: `${r.label}    `, font: 'Calibri', size: 18, color: STEEL, bold: true }),
        new TextRun({ text: r.val.en, font: 'Calibri', size: 22, color: NAVY })
      ]
    }));
    // ES
    ch.push(new Paragraph({
      spacing: { before: 0, after: 80 },
      indent: { left: 1280 },
      children: [new TextRun({
        text: r.val.es, font: 'Calibri', size: 14, color: DKGREY, italics: true
      })]
    }));
  });
  return ch;
}

// Footer — reuse the v2.6.1 format, reading real af from pm-3-6.
function renderFooter(af) {
  if (!af) return [];
  const paragraphs = [];
  const logistics = [];
  if (af.ambiente) logistics.push({ label: 'Ambiente requerido', value: String(af.ambiente) });
  if (af.estrategia) logistics.push({ label: 'Estrategias o técnicas didácticas activas', value: String(af.estrategia) });
  if (af.tecnica) logistics.push({ label: 'Técnica didáctica', value: String(af.tecnica) });
  if (af.duracion_horas != null) {
    const dh = String(af.duracion_horas);
    const val = /\b(h|hora|horas)\b/i.test(dh) ? dh : `${dh}h`;
    logistics.push({ label: 'Duración', value: val });
  }
  const matsArr = Array.isArray(af.materiales) ? af.materiales : (af.materiales ? [af.materiales] : []);
  if (matsArr.length) logistics.push({ label: 'Materiales de formación', value: matsArr.join(', ') });
  if (af.material_apoyo) logistics.push({ label: 'Material de apoyo', value: String(af.material_apoyo) });

  if (logistics.length) {
    const runs = [new TextRun({ text: '▸ ', font: 'Calibri', size: 14, color: ORANGE })];
    logistics.forEach((seg, i) => {
      if (i > 0) runs.push(new TextRun({ text: ' · ', font: 'Calibri', size: 14, color: DKGREY }));
      runs.push(new TextRun({ text: `${seg.label}: `, font: 'Calibri', size: 14, bold: true, color: DKGREY }));
      runs.push(new TextRun({ text: seg.value, font: 'Calibri', size: 14, italics: true, color: DKGREY }));
    });
    paragraphs.push(new Paragraph({
      children: runs,
      spacing: { before: 240, after: af.evidencia ? 20 : 120 },
      border: { top: { color: LGREY, space: 4, style: BorderStyle.SINGLE, size: 2 } }
    }));
  }

  if (af.evidencia) {
    const ev = af.evidencia;
    const evSegments = [];
    const nombreCompleto = ev.codigo && ev.nombre ? `${ev.codigo} — ${ev.nombre}` : (ev.codigo || ev.nombre);
    if (nombreCompleto) evSegments.push({ label: 'Evidencia de aprendizaje', value: nombreCompleto });
    if (ev.tipo_sena) evSegments.push({ label: 'Tipo de evidencia', value: ev.tipo_sena });
    if (ev.tecnica_evaluacion) evSegments.push({ label: 'Técnica de evaluación', value: ev.tecnica_evaluacion });
    if (ev.instrumento) evSegments.push({ label: 'Instrumento de evaluación', value: ev.instrumento });

    const evRuns = [new TextRun({ text: '◆ ', font: 'Calibri', size: 14, color: ORANGE, bold: true })];
    evSegments.forEach((seg, i) => {
      if (i > 0) evRuns.push(new TextRun({ text: ' · ', font: 'Calibri', size: 14, color: STEEL }));
      evRuns.push(new TextRun({ text: `${seg.label}: `, font: 'Calibri', size: 14, bold: true, color: STEEL }));
      evRuns.push(new TextRun({ text: seg.value, font: 'Calibri', size: 14, italics: true, color: STEEL }));
    });
    paragraphs.push(new Paragraph({
      children: evRuns,
      spacing: { before: 20, after: 160 }
    }));
  }
  return paragraphs;
}

// ── Assemble the preview document ──────────────────────────────────────────
function renderActivity(act) {
  const real = findActivity(act.id);
  const af = real && real.activity_footer ? real.activity_footer : null;
  const ch = [];
  ch.push(...activityHeader(act));
  // Description (no section header — it's the lead-in)
  ch.push(...bilingualBlock(act.descripcion.en, act.descripcion.es, {
    enSize: 22, esSize: 14, spacingAfter: 180
  }));
  ch.push(...stepsBlock(act.pasos));
  ch.push(...deliverableBlock(act.entregable));
  ch.push(...renderFooter(af));
  return ch;
}

const titleBlock = [
  new Paragraph({
    spacing: { before: 0, after: 80 },
    alignment: AlignmentType.LEFT,
    children: [new TextRun({
      text: 'PM-3.6 · PREVIEW v2.6.2 — Activity Card', font: 'Calibri', size: 18, color: ORANGE, bold: true, characterSpacing: 60
    })]
  }),
  new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({
      text: 'Propuesta de redacción orientada al aprendiz',
      font: 'Calibri', size: 36, color: NAVY, bold: true
    })]
  }),
  new Paragraph({
    spacing: { before: 0, after: 400 },
    border: { bottom: { color: ORANGE, space: 8, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({
      text: 'EN arriba (Calibri 11pt NAVY) · ES debajo (Calibri 7pt italic DKGREY, casi imperceptible) · 5–7 pasos numerados · V+O+C invisible al aprendiz · Footer sutil v2.6.1 intacto.',
      font: 'Calibri', size: 18, color: DKGREY, italics: true
    })]
  })
];

const doc = new Document({
  creator: 'FPI SENA Factory · v2.6.2 preview',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 900, right: 1000, bottom: 900, left: 1000 },
        size: { orientation: PageOrientation.PORTRAIT }
      }
    },
    children: [
      ...titleBlock,
      ...renderActivity(preview[0]),
      new Paragraph({
        spacing: { before: 260, after: 260 },
        border: { bottom: { color: LGREY, space: 2, style: BorderStyle.DOUBLE, size: 6 } },
        children: [new TextRun({ text: ' ', size: 2 })]
      }),
      ...renderActivity(preview[1])
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  const out = path.join(ROOT, 'pm-3-6-PREVIEW-v262.docx');
  fs.writeFileSync(out, buf);
  console.log('OK', path.basename(out), `(${(buf.length / 1024).toFixed(1)} KB)`);
});
