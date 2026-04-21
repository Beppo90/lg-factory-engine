#!/usr/bin/env node
/**
 * preview_scaffolds_v263.js
 *
 * Extiende el preview v2.6.2 aprobado añadiendo la propuesta v2.6.3:
 * scaffolds inline (work-in-place) embebidos DENTRO de la tarjeta de
 * actividad, entre el "Paso a paso" y el "Entregable".
 *
 * Muestra 3 estilos canónicos:
 *
 *   1. KWL 3×4 — scaffold propio de reflexión (A3.1.1)
 *   2. Checklist diagnóstico 5×8 — scaffold propio de diagnóstico (A3.1.2)
 *   3. Preview de instrumento formal (E1) — 2 de 10 ítems con badge
 *      de instrumento oficial (A3.3.S2.4)
 *
 * Convenciones v2.6.3:
 *   - Encabezado del bloque: "Scaffold · Tu espacio de trabajo / Your workspace"
 *     en STEEL small-caps 9pt bold.
 *   - Marco tabla exterior: LGREY 4 (fino).
 *   - Header de tabla: shading CREAM, texto STEEL bold small-caps 9pt.
 *   - Celdas body: blancas, alto suficiente para escribir (≥ 500 twips).
 *   - EN dominante (11pt NAVY) + ES debajo italic 7pt DKGREY — consistente
 *     con v2.6.2, sin prefijos EN/ES.
 *   - Para scaffold tipo "preview_of_instrument": badge ORANGE con ★ +
 *     código del instrumento, y nota al pie remitiendo al PM-4.x.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, HeadingLevel, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition, ShadingType,
  Table, TableRow, TableCell, WidthType, VerticalAlign,
} = require('docx');

const ROOT = path.resolve(__dirname, '..');
const pm36 = JSON.parse(fs.readFileSync(path.join(ROOT, 'pm-3-6.json'), 'utf8'));

// ── Palette ────────────────────────────────────────────────────────────────
const NAVY = '1C2B3C';
const ORANGE = 'F59316';
const STEEL = '2E4057';
const DKGREY = '5A6A7A';
const LGREY = 'D0D6DC';
const CREAM = 'FFF8EE';
const WHITE = 'FFFFFF';

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

// ── Shared renderers (from v2.6.2) ─────────────────────────────────────────
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
    spacing: { before: 140, after: 40 },
    children: [new TextRun({
      text: label.toUpperCase(), font: 'Calibri', size: 18,
      color: STEEL, bold: true, characterSpacing: 40
    })]
  });
}

function activityHeader(act) {
  const paragraphs = [];
  paragraphs.push(new Paragraph({
    spacing: { before: 280, after: 40 },
    children: [new TextRun({
      text: `${act.id} · ${act.tipo_actividad_sena.toUpperCase()}`,
      font: 'Calibri', size: 16, color: ORANGE, bold: true, characterSpacing: 40
    })]
  }));
  paragraphs.push(new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [new TextRun({
      text: act.titulo_en, font: 'Calibri', size: 28, color: NAVY, bold: true
    })]
  }));
  paragraphs.push(new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({
      text: act.titulo_es, font: 'Calibri', size: 16, color: DKGREY, italics: true
    })]
  }));
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
    ch.push(new Paragraph({
      spacing: { before: 40, after: 20 },
      indent: { left: 360, hanging: 360 },
      children: [
        new TextRun({ text: `${num}.\t`, font: 'Calibri', size: 22, color: ORANGE, bold: true }),
        new TextRun({ text: p.en, font: 'Calibri', size: 22, color: NAVY })
      ]
    }));
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
    ch.push(new Paragraph({
      spacing: { before: 40, after: 0 },
      indent: { left: 200 },
      children: [
        new TextRun({ text: `${r.label}    `, font: 'Calibri', size: 18, color: STEEL, bold: true }),
        new TextRun({ text: r.val.en, font: 'Calibri', size: 22, color: NAVY })
      ]
    }));
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

// ─────────────────────────────────────────────────────────────────────────
// ── v2.6.3 SCAFFOLD RENDERERS ────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────

function scaffoldHeader(titulo_en, titulo_es, { badge = null } = {}) {
  const ch = [];
  ch.push(sectionHeader('Scaffold · Tu espacio de trabajo / Your workspace'));
  if (badge) {
    ch.push(new Paragraph({
      spacing: { before: 0, after: 80 },
      children: [new TextRun({
        text: `★ ${badge}`, font: 'Calibri', size: 16, color: ORANGE, bold: true, characterSpacing: 30
      })]
    }));
  }
  ch.push(new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text: titulo_en, font: 'Calibri', size: 20, color: NAVY, bold: true })]
  }));
  ch.push(new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [new TextRun({ text: titulo_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
  }));
  return ch;
}

function softBorder(color = LGREY, size = 4) {
  return { style: BorderStyle.SINGLE, size, color };
}
function allSoftBorders(color = LGREY, size = 4) {
  return {
    top: softBorder(color, size), bottom: softBorder(color, size),
    left: softBorder(color, size), right: softBorder(color, size),
    insideHorizontal: softBorder(color, size), insideVertical: softBorder(color, size)
  };
}

function headerCell(en, es, widthPct) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: CREAM },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 40, bottom: 40, left: 100, right: 100 },
    children: [
      new Paragraph({
        spacing: { before: 0, after: 0 },
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: en, font: 'Calibri', size: 18, color: STEEL, bold: true, characterSpacing: 30 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: es, font: 'Calibri', size: 12, color: DKGREY, italics: true })]
      })
    ]
  });
}

function bodyCell(text, { widthPct, minHeight = 0, color = NAVY, italic = false, size = 22, align = AlignmentType.LEFT, bold = false } = {}) {
  const children = [new Paragraph({
    spacing: { before: 0, after: 0 },
    alignment: align,
    children: [new TextRun({ text: text || '', font: 'Calibri', size, color, italics: italic, bold })]
  })];
  // Reserve writable space with empty paragraphs (~260 twips per line)
  if (minHeight) {
    const n = Math.max(0, Math.ceil(minHeight / 260) - 1);
    for (let i = 0; i < n; i++) children.push(new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: '', size })] }));
  }
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: WHITE },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 40, bottom: 40, left: 100, right: 100 },
    children
  });
}

// ── Scaffold 1: KWL chart ───────────────────────────────────────────────
function scaffoldKWL() {
  const ch = [];
  ch.push(...scaffoldHeader(
    'K–W–L · Know, Want to know, Learned',
    'Lo que sé, lo que quiero saber, lo que aprendí'
  ));
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell('K — What I already know', 'Lo que ya sé', 33),
      headerCell('W — What I want to know', 'Lo que quiero saber', 34),
      headerCell('L — What I learned', 'Lo que aprendí', 33)
    ]
  });
  // 3 body rows × ~900 twips each → room for 2 handwritten lines, no wasted space.
  const makeRow = () => new TableRow({
    children: [
      bodyCell('', { widthPct: 33, minHeight: 900 }),
      bodyCell('', { widthPct: 34, minHeight: 900 }),
      bodyCell('', { widthPct: 33, minHeight: 900 })
    ]
  });
  ch.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allSoftBorders(LGREY, 4),
    rows: [headerRow, makeRow(), makeRow(), makeRow()]
  }));
  ch.push(new Paragraph({
    spacing: { before: 100, after: 40 },
    children: [new TextRun({
      text: 'Tip: fill K & W before the lesson, then return to L at the end.',
      font: 'Calibri', size: 18, color: DKGREY, italics: true
    })]
  }));
  ch.push(new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({
      text: 'Consejo: completa K y W antes de la clase, y vuelve a L al cerrar la sesión.',
      font: 'Calibri', size: 14, color: DKGREY, italics: true
    })]
  }));
  return ch;
}

// ── Scaffold 2: Checklist diagnóstico (Vocabulary Pre-Diagnostic) ───────
function scaffoldChecklist() {
  const ch = [];
  ch.push(...scaffoldHeader(
    'Self-check · 8 of 20 design terms (sample)',
    'Autoevaluación · 8 de 20 términos de diseño (muestra)'
  ));

  const terms = [
    { en: 'Hierarchy',   es: 'jerarquía' },
    { en: 'White space', es: 'espacio en blanco' },
    { en: 'Typography',  es: 'tipografía' },
    { en: 'Contrast',    es: 'contraste' },
    { en: 'Alignment',   es: 'alineación' },
    { en: 'Grid',        es: 'retícula' },
    { en: 'Kerning',     es: 'interletrado' },
    { en: 'Palette',     es: 'paleta' }
  ];

  // Tight proportions: term takes half, 3 narrow checkbox columns share the rest.
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell('Term', 'Término', 52),
      headerCell('✓  I know it', 'Lo sé', 16),
      headerCell('~  Seen it', 'Lo he visto', 16),
      headerCell('?  New', 'Es nuevo', 16)
    ]
  });

  const rows = [headerRow, ...terms.map(t => new TableRow({
    children: [
      new TableCell({
        width: { size: 52, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: WHITE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 40, bottom: 40, left: 140, right: 100 },
        children: [
          new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              new TextRun({ text: t.en, font: 'Calibri', size: 22, color: NAVY, bold: true }),
              new TextRun({ text: `   ${t.es}`, font: 'Calibri', size: 14, color: DKGREY, italics: true })
            ]
          })
        ]
      }),
      bodyCell('☐', { widthPct: 16, minHeight: 340, size: 26, align: AlignmentType.CENTER, color: STEEL }),
      bodyCell('☐', { widthPct: 16, minHeight: 340, size: 26, align: AlignmentType.CENTER, color: STEEL }),
      bodyCell('☐', { widthPct: 16, minHeight: 340, size: 26, align: AlignmentType.CENTER, color: STEEL })
    ]
  }))];

  ch.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allSoftBorders(LGREY, 4),
    rows
  }));
  ch.push(new Paragraph({
    spacing: { before: 100, after: 40 },
    children: [new TextRun({
      text: 'Mark one box per row. "New to me" is valuable information — do not leave blanks.',
      font: 'Calibri', size: 18, color: DKGREY, italics: true
    })]
  }));
  ch.push(new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({
      text: 'Marca una casilla por fila. "Es nuevo" también es información valiosa — no dejes filas vacías.',
      font: 'Calibri', size: 14, color: DKGREY, italics: true
    })]
  }));
  return ch;
}

// ── Scaffold 3: Preview de instrumento formal (Quiz E1) ────────────────
function scaffoldQuizPreview() {
  const ch = [];
  ch.push(...scaffoldHeader(
    'Quiz preview · 2 of 10 sample items',
    'Vista previa del quiz · 2 de 10 ítems de muestra',
    { badge: 'FORMAL INSTRUMENT  ·  PM-4.1 instrument_1_reading  ·  10 items total' }
  ));

  const items = [
    {
      n: 1,
      q_en: 'According to the text, what is the main purpose of kerning?',
      q_es: 'Según el texto, ¿cuál es el propósito principal del interletrado (kerning)?',
      opts: [
        { k: 'A', en: 'To align paragraphs to a grid.',
                es: 'Alinear párrafos a una retícula.' },
        { k: 'B', en: 'To adjust the space between individual letter pairs.',
                es: 'Ajustar el espacio entre pares específicos de letras.' },
        { k: 'C', en: 'To change the color palette of a layout.',
                es: 'Cambiar la paleta de colores de un diseño.' },
        { k: 'D', en: 'To resize images inside a poster.',
                es: 'Redimensionar imágenes dentro de un afiche.' }
      ]
    },
    {
      n: 2,
      q_en: 'Which element creates visual hierarchy in the example poster?',
      q_es: '¿Qué elemento crea jerarquía visual en el afiche del ejemplo?',
      opts: [
        { k: 'A', en: 'Equal font size for all words.',
                es: 'Tamaño de letra igual para todas las palabras.' },
        { k: 'B', en: 'A bold headline paired with a smaller subtitle.',
                es: 'Un titular en negrita combinado con un subtítulo más pequeño.' },
        { k: 'C', en: 'A single color used across the whole poster.',
                es: 'Un solo color usado en todo el afiche.' },
        { k: 'D', en: 'Random alignment of all text blocks.',
                es: 'Alineación aleatoria de todos los bloques de texto.' }
      ]
    }
  ];

  items.forEach((it, idx) => {
    // Item number + question EN (first item slightly less space before)
    ch.push(new Paragraph({
      spacing: { before: idx === 0 ? 40 : 100, after: 0 },
      indent: { left: 360, hanging: 360 },
      children: [
        new TextRun({ text: `${it.n}.\t`, font: 'Calibri', size: 22, color: ORANGE, bold: true }),
        new TextRun({ text: it.q_en, font: 'Calibri', size: 22, color: NAVY, bold: true })
      ]
    }));
    // Question ES italic — tight
    ch.push(new Paragraph({
      spacing: { before: 0, after: 40 },
      indent: { left: 360 },
      children: [new TextRun({ text: it.q_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    // Options — compact rhythm (EN + ES pair per option, minimal breathing)
    it.opts.forEach(o => {
      ch.push(new Paragraph({
        spacing: { before: 0, after: 0 },
        indent: { left: 720, hanging: 360 },
        children: [
          new TextRun({ text: `○  ${o.k}.\t`, font: 'Calibri', size: 22, color: STEEL, bold: true }),
          new TextRun({ text: o.en, font: 'Calibri', size: 22, color: NAVY })
        ]
      }));
      ch.push(new Paragraph({
        spacing: { before: 0, after: 20 },
        indent: { left: 1080 },
        children: [new TextRun({ text: o.es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
      }));
    });
  });

  ch.push(new Paragraph({
    spacing: { before: 160, after: 40 },
    border: { top: { color: LGREY, space: 4, style: BorderStyle.SINGLE, size: 2 } },
    children: [new TextRun({
      text: 'The full 10-item quiz is the formal E1 instrument, applied as evidence during the Session 6 consolidation.',
      font: 'Calibri', size: 16, color: DKGREY, italics: true
    })]
  }));
  ch.push(new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({
      text: 'El quiz completo de 10 ítems es el instrumento formal E1, aplicado como evidencia durante la consolidación en la Sesión 6.',
      font: 'Calibri', size: 14, color: DKGREY, italics: true
    })]
  }));
  return ch;
}

// ─────────────────────────────────────────────────────────────────────────
// ── Preview activities (3 scaffolds) ─────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────

const preview = [
  {
    id: 'A3.1.1',
    tipo_actividad_sena: 'Actividad cognitiva',
    tiempo_min: 20,
    agrupacion: 'individual',
    titulo_en: 'KWL — What you bring to the table',
    titulo_es: 'KWL — Lo que traes contigo',
    descripcion: {
      en: 'Before we open the unit, put on paper what you already bring. This 3-column chart will travel with you through the whole guide: we will reopen it in Session 6 and add what you learned.',
      es: 'Antes de abrir la unidad, pon por escrito lo que ya traes contigo. Este cuadro de 3 columnas te acompañará toda la guía: lo volveremos a abrir en la Sesión 6 para sumar lo que aprendiste.'
    },
    pasos: [
      { en: 'Read the three column headers — K, W, L.', es: 'Lee los tres encabezados — K, W, L.' },
      { en: 'In K, write 2 or 3 things you already know about visual design.', es: 'En K, escribe 2 o 3 cosas que ya sabes de diseño visual.' },
      { en: 'In W, write 2 or 3 questions you want to answer by the end of the guide.', es: 'En W, escribe 2 o 3 preguntas que quieres responder al final de la guía.' },
      { en: 'Leave the L column empty for now — you will come back to it in Session 6.', es: 'Deja la columna L vacía por ahora — volverás a ella en la Sesión 6.' },
      { en: 'Share your K and W with a partner in one minute each.', es: 'Comparte tus K y W con un compañero en un minuto cada uno.' }
    ],
    scaffold: 'kwl',
    entregable: {
      producto:        { en: 'KWL chart with columns K and W completed.',
                         es: 'Cuadro KWL con las columnas K y W diligenciadas.' },
      formato:         { en: 'Inline table inside this guide.',
                         es: 'Tabla embebida dentro de esta guía.' },
      criterio_minimo: { en: 'At least 2 items in K and 2 in W.',
                         es: 'Mínimo 2 entradas en K y 2 en W.' }
    }
  },
  {
    id: 'A3.1.2',
    tipo_actividad_sena: 'Actividad cognitiva',
    tiempo_min: 25,
    agrupacion: 'individual',
    titulo_en: 'Vocabulary Pre-Diagnostic — Map Your Starting Point',
    titulo_es: 'Pre-diagnóstico de vocabulario — Tu punto de partida',
    descripcion: {
      en: 'This checklist is your personal map of design vocabulary. It is not graded; its only job is to show your starting point so you can measure your growth later.',
      es: 'Esta lista es tu mapa personal del vocabulario de diseño. No tiene nota; su único rol es mostrar tu punto de partida para que midas tu crecimiento después.'
    },
    pasos: [
      { en: 'Read each term on the table slowly, one at a time.', es: 'Lee cada término de la tabla despacio, uno a uno.' },
      { en: 'For every row, mark exactly one checkbox.', es: 'Para cada fila, marca exactamente una casilla.' },
      { en: 'Mark ✓ if you can explain the term in English.', es: 'Marca ✓ si puedes explicar el término en inglés.' },
      { en: 'Mark ~ if the word looks familiar but you could not explain it.', es: 'Marca ~ si la palabra te resulta familiar pero no podrías explicarla.' },
      { en: 'Mark ? if the word is new to you. No blanks.', es: 'Marca ? si la palabra es nueva. Sin vacíos.' },
      { en: 'Keep this page. We will reopen it together at the end of Session 6.', es: 'Conserva esta página. La volveremos a abrir juntos al final de la Sesión 6.' }
    ],
    scaffold: 'checklist',
    entregable: {
      producto:        { en: 'Checklist with one box marked in every row.',
                         es: 'Lista con una casilla marcada en cada fila.' },
      formato:         { en: 'Inline table inside this guide.',
                         es: 'Tabla embebida dentro de esta guía.' },
      criterio_minimo: { en: 'Zero blank rows.',
                         es: 'Ninguna fila vacía.' }
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
      en: 'This is Evidence 1. Below you see 2 sample items so you know what the full quiz will look like. The complete 10-item quiz is the formal instrument and will be applied in Session 6.',
      es: 'Esta es la Evidencia 1. Abajo ves 2 ítems de muestra para que reconozcas la forma del quiz. El quiz completo de 10 ítems es el instrumento formal y se aplicará en la Sesión 6.'
    },
    pasos: [
      { en: 'Read the full text once before trying any item.', es: 'Lee el texto completo una vez antes de intentar cualquier ítem.' },
      { en: 'Read item 1 below and circle a single letter: A, B, C or D.', es: 'Lee el ítem 1 y encierra una sola letra: A, B, C o D.' },
      { en: 'Go back to the text to confirm the evidence — do not guess.', es: 'Vuelve al texto para confirmar la evidencia — no adivines.' },
      { en: 'Repeat for item 2.', es: 'Repite con el ítem 2.' },
      { en: 'When the formal E1 is applied in Session 6, you will follow the same rule for the full 10 items.', es: 'Cuando se aplique la E1 formal en la Sesión 6, seguirás la misma regla con los 10 ítems completos.' }
    ],
    scaffold: 'quiz_preview',
    entregable: {
      producto:        { en: 'Circled answers for the 2 sample items.',
                         es: 'Respuestas encerradas en círculo para los 2 ítems de muestra.' },
      formato:         { en: 'Inline sample; formal instrument in PM-4.1.',
                         es: 'Muestra embebida; instrumento formal en PM-4.1.' },
      criterio_minimo: { en: 'Both sample items answered with one clear circle and text-based justification in the margin.',
                         es: 'Los dos ítems de muestra respondidos con un círculo claro y una justificación al margen basada en el texto.' }
    }
  }
];

// ── Assembly ───────────────────────────────────────────────────────────
function renderActivity(act) {
  const real = findActivity(act.id);
  const af = real && real.activity_footer ? real.activity_footer : null;
  const ch = [];
  ch.push(...activityHeader(act));
  ch.push(...bilingualBlock(act.descripcion.en, act.descripcion.es, {
    enSize: 22, esSize: 14, spacingAfter: 180
  }));
  ch.push(...stepsBlock(act.pasos));
  // Scaffold inline — v2.6.3 novelty
  if (act.scaffold === 'kwl') ch.push(...scaffoldKWL());
  else if (act.scaffold === 'checklist') ch.push(...scaffoldChecklist());
  else if (act.scaffold === 'quiz_preview') ch.push(...scaffoldQuizPreview());
  ch.push(...deliverableBlock(act.entregable));
  ch.push(...renderFooter(af));
  return ch;
}

const titleBlock = [
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [new TextRun({
      text: 'PM-3.6 · PREVIEW v2.6.3 — Scaffolds Inline', font: 'Calibri', size: 18, color: ORANGE, bold: true, characterSpacing: 60
    })]
  }),
  new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({
      text: 'Work-in-place: cada actividad trae su scaffold embebido',
      font: 'Calibri', size: 36, color: NAVY, bold: true
    })]
  }),
  new Paragraph({
    spacing: { before: 0, after: 400 },
    border: { bottom: { color: ORANGE, space: 8, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({
      text: '3 estilos canónicos: (1) KWL propio  ·  (2) Checklist diagnóstico propio  ·  (3) Preview de instrumento formal con badge y remisión a PM-4.1. Scaffold va siempre entre "Paso a paso" y "Entregable".',
      font: 'Calibri', size: 18, color: DKGREY, italics: true
    })]
  })
];

const divider = () => new Paragraph({
  spacing: { before: 260, after: 260 },
  border: { bottom: { color: LGREY, space: 2, style: BorderStyle.DOUBLE, size: 6 } },
  children: [new TextRun({ text: ' ', size: 2 })]
});

const doc = new Document({
  creator: 'FPI SENA Factory · v2.6.3 preview',
  styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
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
      divider(),
      ...renderActivity(preview[1]),
      divider(),
      ...renderActivity(preview[2])
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  const out = path.join(ROOT, 'pm-3-6-PREVIEW-v263.docx');
  fs.writeFileSync(out, buf);
  console.log('OK', path.basename(out), `(${(buf.length / 1024).toFixed(1)} KB)`);
});
