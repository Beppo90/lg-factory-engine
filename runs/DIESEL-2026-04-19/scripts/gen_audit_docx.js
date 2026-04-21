#!/usr/bin/env node
/**
 * gen_audit_docx.js — Emite los 3 DOCX FINAL para auditoría del instructor DIESEL G1.
 *   1. pm-3-1-FINAL-G1.docx   — Playbook Outline (overview + pm0_alignment + voc + ambientes + estrategias)
 *   2. pm-3-2-FINAL-G1.docx   — Playbook Build-Out consolidado: 8 sesiones en un solo documento
 *   3. pm-3-6-FINAL-G1.docx   — GFPI-F-135 Guía del Aprendiz (8 secciones + apéndices embebidos)
 *
 * Run: DIESEL-2026-04-19 · Programa 522309 · Guía G1 · A1.1 · Canon v2.6
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, PageOrientation, LevelFormat,
  Footer, Header, PageNumber, PageBreak
} = require('/tmp/node_modules/docx');

// Canon v2.6.5 — Shared renderers (fuente única de verdad, ver PM-3.6 REGLA 20)
const { renderSeccion4Evidencias } = require('./lib/render_seccion4_evidencias');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19';

// ------- Paleta SENA institucional v2.6.6 (verde protagonista + azul oscuro) -------
// Nombres legacy (NAVY, ORANGE, GREEN, BEIGE, CREAM) preservados para evitar
// rename cascada en ~145 puntos de uso. Los valores fueron remapeados a la
// identidad de marca SENA: verde institucional #39A900 como acento hero,
// azul oscuro #0B2E45 como títulos/headers, fondos con tintes verdes.
const NAVY = '0B2E45';        // azul oscuro SENA — títulos, encabezados de tabla
const ORANGE = '39A900';      // verde SENA institucional — acentos, bordes dimension, CTAs (nombre legacy)
const STEEL = '1A4068';       // azul medio para sub-headers (armonizado con NAVY SENA)
const DKGREY = '5A6A7A';      // texto secundario fuerte (DIESEL canónico)
const GREY = '666666';        // notas, pies, legends
const LIGHT = 'F2F2F2';       // zebra striping tablas
const LGREY = 'F3F5F7';       // shading dimensionBlock (DIESEL canónico)
const ACCENT = 'D5E8F0';      // llamadas suaves (azul tenue, compatible con NAVY SENA)
const WHITE = 'FFFFFF';
const GREEN = '007832';       // verde oscuro SENA — badges, sellos FORMAL INSTRUMENT
// Extensión categórica (Ronda 1 — categorías de slide/skill)
const BEIGE = 'F0F8EC';       // entregableBox shading (verde tenue, ex beige)
const CREAM = 'E8F5E3';       // evidenceBox shading (verde suave SENA, ex cream)
const SKY = 'C5DCE8';         // categoría Reading
const GREEN_CAT = 'CDE3CC';   // categoría Writing
const PURPLE = 'DCD0E8';      // categoría Language Functions
const RED = 'F0C8C8';         // categoría Speaking

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

// =========================================================================
// Helpers visuales pedagógicos (Ronda 1 — DIESEL canónico)
// =========================================================================

/**
 * dimensionBlock(label, contenidoEN, contenidoES) — bloque bilingüe con barra naranja
 * izquierda y shading LGREY. Usado para dimensiones COG/PROC/ACT del VOC.
 */
const dimensionBlock = (label, contentEN, contentES) => {
  const hasEN = contentEN && String(contentEN).trim();
  const hasES = contentES && String(contentES).trim();
  const runs = [];
  if (label) runs.push(new TextRun({ text: String(label), font: 'Calibri', size: 22, bold: true, color: NAVY }));
  if (hasEN && hasES) {
    if (label) runs.push(new TextRun({ text: '  ', font: 'Calibri', size: 20 }));
    runs.push(new TextRun({ text: 'EN: ', font: 'Calibri', size: 20, bold: true, color: ORANGE }));
    runs.push(new TextRun({ text: String(contentEN), font: 'Calibri', size: 20 }));
    runs.push(new TextRun({ text: '  ·  ES: ', font: 'Calibri', size: 20, bold: true, color: ORANGE }));
    runs.push(new TextRun({ text: String(contentES), font: 'Calibri', size: 20, italics: true }));
  } else if (hasEN || hasES) {
    if (label) runs.push(new TextRun({ text: '  ', font: 'Calibri', size: 20 }));
    runs.push(new TextRun({ text: String(contentEN || contentES), font: 'Calibri', size: 20 }));
  }
  return new Paragraph({
    children: runs,
    indent: { left: 240 },
    spacing: { before: 80, after: 80 },
    shading: { type: ShadingType.CLEAR, fill: LGREY, color: 'auto' },
    border: {
      left: { color: ORANGE, space: 8, style: BorderStyle.SINGLE, size: 18 },
    },
  });
};

/**
 * evidenceBox(title, body) — caja con borde naranja grueso + shading CREAM.
 * Ideal para evidencias formales del apartado 8 del GFPI-F-134.
 */
const evidenceBox = (title, body) => {
  const bodyText = Array.isArray(body) ? body.join('\n') : (body ?? '');
  return new Table({
    rows: [new TableRow({
      children: [new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: String(title), font: 'Calibri', size: 22, bold: true, color: NAVY })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: String(bodyText), font: 'Calibri', size: 20, color: '333333' })],
            spacing: { after: 40 },
          }),
        ],
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: CREAM, color: 'auto' },
        margins: { top: 140, bottom: 140, left: 200, right: 200 },
        borders: {
          top: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 8 },
          bottom: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 8 },
          left: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 8 },
          right: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 8 },
        },
      })],
    })],
    width: { size: CONTENT_W, type: WidthType.DXA },
  });
};

/**
 * entregableBox(label, descripcion, criterios) — tabla 2-col header navy,
 * filas con shading BEIGE para entregables finales de sesión/guía.
 */
const entregableBox = (label, descripcion, criterios) => {
  const hdr = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text: 'ENTREGABLE', font: 'Calibri', size: 20, bold: true, color: WHITE })],
        })],
        width: { size: 2400, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
      }),
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text: String(label), font: 'Calibri', size: 20, bold: true, color: WHITE })],
        })],
        width: { size: 7680, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
      }),
    ],
  });
  const rows = [hdr];
  if (descripcion) {
    rows.push(new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Descripción', font: 'Calibri', size: 18, bold: true, color: NAVY })] })],
          width: { size: 2400, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: BEIGE, color: 'auto' },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
        new TableCell({
          children: [P(descripcion)],
          width: { size: 7680, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: BEIGE, color: 'auto' },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
      ],
    }));
  }
  if (criterios) {
    const critArr = Array.isArray(criterios) ? criterios : [criterios];
    rows.push(new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Criterios', font: 'Calibri', size: 18, bold: true, color: NAVY })] })],
          width: { size: 2400, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: BEIGE, color: 'auto' },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
        new TableCell({
          children: critArr.map(c => bullet(String(c))),
          width: { size: 7680, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: BEIGE, color: 'auto' },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
      ],
    }));
  }
  return new Table({ rows, width: { size: CONTENT_W, type: WidthType.DXA } });
};

/**
 * stepsBlock(pasos) — lista numerada bilingüe.
 * Acepta [{en, es}, ...] o [{step, en, es}, ...] o ['paso 1', 'paso 2'].
 */
const stepsBlock = (pasos) => {
  if (!Array.isArray(pasos)) return [];
  const out = [];
  pasos.forEach((p, i) => {
    const n = i + 1;
    if (typeof p === 'string') {
      out.push(new Paragraph({
        children: [
          new TextRun({ text: `${n}. `, font: 'Calibri', size: 20, bold: true, color: ORANGE }),
          new TextRun({ text: p, font: 'Calibri', size: 20 }),
        ],
        indent: { left: 360 },
        spacing: { after: 60 },
      }));
    } else if (typeof p === 'object' && p !== null) {
      const en = p.en || p.EN || p.ingles || p.english || '';
      const es = p.es || p.ES || p.espanol || p.spanish || '';
      if (en) {
        out.push(new Paragraph({
          children: [
            new TextRun({ text: `${n}. EN: `, font: 'Calibri', size: 20, bold: true, color: ORANGE }),
            new TextRun({ text: en, font: 'Calibri', size: 20 }),
          ],
          indent: { left: 360 },
          spacing: { after: 30 },
        }));
      }
      if (es) {
        out.push(new Paragraph({
          children: [
            new TextRun({ text: '    ES: ', font: 'Calibri', size: 19, bold: true, color: DKGREY }),
            new TextRun({ text: es, font: 'Calibri', size: 19, italics: true, color: DKGREY }),
          ],
          indent: { left: 600 },
          spacing: { after: 60 },
        }));
      }
    }
  });
  return out;
};

// =========================================================================
// Helpers visuales nuevos (Ronda 2 — pm-3-6-new-gen)
// =========================================================================

/**
 * responseLine(label) — un renglón subrayado "_"*78 para que el aprendiz escriba.
 */
const responseLine = (label = '') => new Paragraph({
  children: [
    ...(label ? [new TextRun({ text: String(label) + ' ', font: 'Calibri', size: 22, bold: true, color: NAVY })] : []),
    new TextRun({ text: '_'.repeat(78), font: 'Calibri', size: 22, color: GREY }),
  ],
  indent: { left: 360, right: 120 },
  spacing: { before: 60, after: 60 },
});

/**
 * responseLines(n, label) — n renglones subrayados. El label solo va en el primero.
 */
const responseLines = (n = 3, label = '') => {
  const out = [];
  for (let i = 0; i < n; i++) out.push(responseLine(i === 0 ? label : ''));
  return out;
};

/**
 * quizItem(n, question, choices) — ítem de cuestionario estandarizado.
 * choices: array de strings (a, b, c, d...) O {a, b, c, d}.
 */
const quizItem = (n, question, ...choices) => {
  const out = [];
  let opts = choices;
  if (choices.length === 1 && typeof choices[0] === 'object' && !Array.isArray(choices[0])) {
    opts = Object.values(choices[0]);
  }
  if (choices.length === 1 && Array.isArray(choices[0])) {
    opts = choices[0];
  }
  out.push(new Paragraph({
    children: [
      new TextRun({ text: `${n}. `, font: 'Calibri', size: 22, bold: true, color: NAVY }),
      new TextRun({ text: String(question), font: 'Calibri', size: 22 }),
    ],
    spacing: { before: 140, after: 80 },
  }));
  const letters = ['a', 'b', 'c', 'd', 'e'];
  opts.forEach((opt, i) => {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: `   ${letters[i]}) `, font: 'Calibri', size: 20, bold: true, color: ORANGE }),
        new TextRun({ text: String(opt ?? ''), font: 'Calibri', size: 20 }),
      ],
      indent: { left: 480 },
      spacing: { after: 40 },
    }));
  });
  return out;
};

/**
 * boxedText(lines, fillColor) — caja multi-línea estilo periódico con bordes navy.
 */
const boxedText = (lines, fillColor = LIGHT) => {
  const arr = Array.isArray(lines) ? lines : [lines];
  return new Table({
    rows: [new TableRow({
      children: [new TableCell({
        children: arr.map(l => typeof l === 'string'
          ? new Paragraph({
              children: [new TextRun({ text: l, font: 'Calibri', size: 20 })],
              spacing: { after: 40 },
            })
          : new Paragraph({
              children: [new TextRun({
                text: String(l.text ?? ''),
                font: 'Calibri',
                size: l.size || 20,
                bold: !!l.bold,
                italics: !!l.italics,
                color: l.color || undefined,
              })],
              alignment: l.align || AlignmentType.LEFT,
              spacing: { after: 40 },
            })),
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: fillColor, color: 'auto' },
        margins: { top: 160, bottom: 160, left: 240, right: 240 },
        borders: {
          top: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 12 },
          bottom: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 12 },
          left: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 12 },
          right: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 12 },
        },
      })],
    })],
    width: { size: CONTENT_W, type: WidthType.DXA },
  });
};

/**
 * activityHeader(id, nameEN, nameES, session, materials) — encabezado de actividad
 * con shading STEEL y texto blanco. Diferencia visual vs H3.
 */
const activityHeader = (id, nameEN, nameES, session, materials) => {
  const titleRun = [];
  if (id) titleRun.push(new TextRun({ text: String(id) + '  ', font: 'Calibri', size: 22, bold: true, color: ORANGE }));
  if (nameEN) titleRun.push(new TextRun({ text: String(nameEN), font: 'Calibri', size: 22, bold: true, color: WHITE }));
  if (nameES) titleRun.push(new TextRun({ text: '  ·  ' + String(nameES), font: 'Calibri', size: 20, italics: true, color: 'D0D8E0' }));
  const metaRuns = [];
  if (session) metaRuns.push(new TextRun({ text: 'Sesión ' + String(session), font: 'Calibri', size: 18, color: 'D0D8E0' }));
  if (session && materials) metaRuns.push(new TextRun({ text: '  ·  ', font: 'Calibri', size: 18, color: 'D0D8E0' }));
  if (materials) metaRuns.push(new TextRun({ text: 'Materiales: ' + (Array.isArray(materials) ? materials.join(', ') : String(materials)), font: 'Calibri', size: 18, color: 'D0D8E0' }));
  const cells = [
    new Paragraph({ children: titleRun, spacing: { after: metaRuns.length ? 40 : 0 } }),
  ];
  if (metaRuns.length) cells.push(new Paragraph({ children: metaRuns }));
  return new Table({
    rows: [new TableRow({
      children: [new TableCell({
        children: cells,
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: STEEL, color: 'auto' },
        margins: { top: 140, bottom: 140, left: 200, right: 200 },
      })],
    })],
    width: { size: CONTENT_W, type: WidthType.DXA },
  });
};

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
        new TextRun({ text: 'DIESEL G1 · Run DIESEL-2026-04-19 · Canon v2.6  —  Página ', font: 'Calibri', size: 16, color: GREY }),
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
// =========================================================================
// §0 — Marco CEFR de referencia (Ciclo 2 — portado de pm-0-gen.js DIESEL)
// =========================================================================
function renderCefrReferenceSection(currentLevel = 'A1.1') {
  const ch = [];
  ch.push(H1('0. Marco CEFR de referencia'));
  ch.push(note('Common European Framework of Reference for Languages (Council of Europe, 2001/2020). ' +
    'La FPI SENA ancla sus programas técnicos bilingües a los niveles A1–A2 del CEFR. ' +
    'Esta guía opera en A1.1, el sub-nivel inicial (≈0-60h de instrucción comunicativa).'));

  // Tabla 1 — 6 niveles CEFR con gradiente + marcado A1★
  ch.push(H3('Niveles CEFR (A1 → C2)'));
  // Gradiente CEFR remapeado a identidad SENA (v2.6.6): verde claro (A1) →
  // verde institucional (B2) → azul oscuro SENA (C2). Conserva la jerarquía
  // comunicativa de niveles (más intensidad = mayor dominio) sin usar naranjas.
  const cefrLevels = [
    { nivel: 'A1', etiqueta: '★ Breakthrough', desc: 'Usuario básico inicial · frases cotidianas · necesidades concretas', fill: 'DCEEDC', highlight: true },
    { nivel: 'A2', etiqueta: 'Waystage', desc: 'Usuario básico · expresiones rutinarias · información personal', fill: 'C2E3B9', highlight: false },
    { nivel: 'B1', etiqueta: 'Threshold', desc: 'Usuario independiente · textos sencillos · situaciones conocidas', fill: '8ED18B', highlight: false },
    { nivel: 'B2', etiqueta: 'Vantage', desc: 'Usuario independiente · ideas complejas · interacción fluida', fill: '39A900', highlight: false },
    { nivel: 'C1', etiqueta: 'Effective', desc: 'Usuario competente · textos exigentes · uso flexible', fill: '007832', highlight: false },
    { nivel: 'C2', etiqueta: 'Mastery', desc: 'Usuario competente · comprende todo · expresión matizada', fill: '0B2E45', highlight: false },
  ];
  const cefrHeaderRow = new TableRow({ tableHeader: true, children: [
    headerCell('Nivel', 1200),
    headerCell('Etiqueta', 2400),
    headerCell('Descripción', 6480),
  ]});
  const cefrDataRows = cefrLevels.map(l => new TableRow({ children: [
    new TableCell({
      children: [new Paragraph({ children: [new TextRun({
        text: l.nivel + (l.highlight ? '  ★' : ''),
        font: 'Calibri', size: 22, bold: true, color: l.highlight ? WHITE : NAVY,
      })] })],
      width: { size: 1200, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: l.highlight ? ORANGE : l.fill, color: 'auto' },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
    }),
    new TableCell({
      children: [new Paragraph({ children: [new TextRun({
        text: l.etiqueta, font: 'Calibri', size: 20, bold: l.highlight, color: NAVY,
      })] })],
      width: { size: 2400, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: l.fill, color: 'auto' },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
    }),
    new TableCell({
      children: [P(l.desc)],
      width: { size: 6480, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: l.fill, color: 'auto' },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
    }),
  ]}));
  ch.push(new Table({
    rows: [cefrHeaderRow, ...cefrDataRows],
    width: { size: CONTENT_W, type: WidthType.DXA },
  }));
  ch.push(note('★ Nivel anclaje FPI SENA — esta guía opera en A1.1 (sub-nivel inicial de A1).'));

  // Tabla 2 — Descriptores A1.1 por habilidad (can-do statements)
  ch.push(H3('Descriptores A1.1 por habilidad — "Can-do" statements'));
  const descriptorsA1 = [
    ['Reading', 'Puede reconocer nombres, palabras familiares y frases muy básicas en carteles, anuncios y textos cortos del dominio técnico.'],
    ['Listening', 'Puede entender instrucciones cortas pronunciadas despacio, nombres de objetos conocidos y números del dominio técnico.'],
    ['Speaking — Interacción', 'Puede saludar, presentarse, identificar objetos y hacer preguntas simples usando "this is / what is" sobre elementos conocidos.'],
    ['Speaking — Expresión', 'Puede describir objetos cotidianos y del taller usando adjetivos básicos y frases memorizadas.'],
    ['Writing', 'Puede rellenar fichas con datos personales o técnicos básicos; puede escribir frases simples sobre objetos conocidos.'],
    ['Vocabulary', 'Maneja ~60–120 palabras del dominio técnico (toolbelt), números 0–100, colores, formas y adjetivos evaluativos básicos.'],
    ['Grammar', 'Usa "to be" afirmativo/negativo/interrogativo · artículos a/an/the · plurales regulares · presente simple con verbos de rutina.'],
    ['Pronunciation', 'Diferencia sonidos-trampa comunes (e.g. /θ/ vs /t/, /v/ vs /b/) con apoyo de IPA; usa stress correcto en palabras bisílabas frecuentes.'],
  ];
  ch.push(makeTable(['Habilidad', 'Descriptor (puede...)'], descriptorsA1, [2600, 7480]));

  // Nota operacional
  ch.push(P('', { after: 80 }));
  ch.push(quote('En A1.1 se privilegia input comprensible altamente contextualizado (realia técnica del programa), ' +
    'repetición espaciada del vocabulario toolbelt, y producción controlada con modelos visuales. ' +
    'El uso del L1 (español) como andamiaje es esperado hasta ~40% del tiempo de aula y disminuye progresivamente.'));
  return ch;
}

function buildPM31Docx() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-3-1.json'), 'utf8'));
  const ch = [];

  // Cover
  ch.push(...coverPage(
    'PM-3.1 Playbook Outline',
    'G1 — The Workshop Assistant',
    {
      'Programa': d.header?.programa || 'Desarrollo de Medios Gráficos Visuales (522309)',
      'Tipo': d.header?.tipo || 'Tecnológico',
      'Guía': d.guide || 'G1 — The Workshop Assistant',
      'CEFR': 'A1.1',
      'Duración': '60h (48 directas + 12 autónomas)',
      'Status': d.status || 'completed',
      'Generado': d.generated_at || '2026-04-20',
      'Canon': d.pipeline_version ? `v${d.pipeline_version}` : 'v2.6',
    }
  ));

  // 0. Marco CEFR de referencia (Ciclo 2 — portado de pm-0-gen.js DIESEL)
  ch.push(...renderCefrReferenceSection('A1.1'));

  // 1. Identidad y BUG-PM31-001
  ch.push(H1('1. Identidad y metadatos'));
  ch.push(kv('PM', `${d.pm_id} ${d.pm_name} v${d.pm_version}`));
  ch.push(kv('Run', d.run_id));
  ch.push(kv('Guía', d.guide));
  if (d.guia_numero) ch.push(kv('Guía número', String(d.guia_numero)));
  if (d.guia_nombre_esp) ch.push(kv('Guía (ES)', d.guia_nombre_esp));
  ch.push(kv('Generado', d.generated_at));
  ch.push(kv('Generado por', d.generated_by));
  ch.push(kv('Pipeline', d.pipeline_version));
  if (d.pm_verified_against_prompt) ch.push(kv('Verificado contra prompt', d.pm_verified_against_prompt));
  if (d.status) ch.push(kv('Status', d.status));
  if (d.bug_fix_reference) {
    ch.push(H3('BUG-PM31-001 — Referencia de fix'));
    ch.push(kv('Bug ID', d.bug_fix_reference.bug_id));
    if (d.bug_fix_reference.descripcion) ch.push(P(d.bug_fix_reference.descripcion, { italics: true }));
    if (d.bug_fix_reference.fix_version) ch.push(kv('Fix version', d.bug_fix_reference.fix_version));
    if (d.bug_fix_reference.mecanismo_fix) ch.push(kv('Mecanismo', d.bug_fix_reference.mecanismo_fix));
    if (d.bug_fix_reference.este_json_implementa_el_fix != null) ch.push(kv('Este JSON implementa el fix', String(d.bug_fix_reference.este_json_implementa_el_fix)));
  }

  // 2. Header pedagógico
  if (d.header && typeof d.header === 'object') {
    ch.push(pageBreak());
    ch.push(H1('2. Header pedagógico'));
    const h = d.header;
    if (h.programa) ch.push(kv('Programa', h.programa));
    if (h.programa_codigo) ch.push(kv('Código programa', h.programa_codigo));
    if (h.tipo) ch.push(kv('Tipo', h.tipo));
    if (h.guia_numero) ch.push(kv('Guía número', String(h.guia_numero)));
    if (h.guia_nombre) ch.push(kv('Guía nombre', h.guia_nombre));
    if (h.cefr_level) ch.push(kv('CEFR', h.cefr_level));
    if (h.rap_codigo) ch.push(kv('RAP', h.rap_codigo));
    if (h.intensidad_total_horas != null) ch.push(kv('Intensidad total', `${h.intensidad_total_horas}h`));
    if (h.horas_directa != null) ch.push(kv('Horas directas', `${h.horas_directa}h`));
    if (h.horas_autonoma != null) ch.push(kv('Horas autónomas', `${h.horas_autonoma}h`));
    if (h.sesiones_total != null) ch.push(kv('Sesiones', String(h.sesiones_total)));
    if (h.duracion_sesion_min != null) ch.push(kv('Duración sesión (min)', String(h.duracion_sesion_min)));
    if (h.duracion_sesion_horas != null) ch.push(kv('Duración sesión (h)', String(h.duracion_sesion_horas)));
    if (h.duracion_autonoma_por_sesion != null) ch.push(kv('Autónomo por sesión', String(h.duracion_autonoma_por_sesion)));
    if (h.nota) ch.push(P(h.nota, { italics: true }));
  }

  // 3. Inputs consumidos
  if (d.inputs_consumed && typeof d.inputs_consumed === 'object') {
    ch.push(pageBreak());
    ch.push(H1('3. Inputs consumidos'));
    const ic = d.inputs_consumed;
    if (ic.entrada_1_gfpi_f134) {
      ch.push(H3('Entrada 1 — GFPI-F-134'));
      ch.push(P(String(ic.entrada_1_gfpi_f134)));
    }
    if (Array.isArray(ic.entrada_2_worksheets)) {
      ch.push(H3('Entrada 2 — Worksheets'));
      for (const w of ic.entrada_2_worksheets) ch.push(bullet(String(w)));
    } else if (ic.entrada_2_worksheets) {
      ch.push(H3('Entrada 2 — Worksheets'));
      ch.push(P(String(ic.entrada_2_worksheets)));
    }
    if (ic.entrada_3_pm0_anchor) {
      ch.push(H3('Entrada 3 — PM-0 anchor'));
      const a = ic.entrada_3_pm0_anchor;
      if (typeof a === 'object') {
        for (const [k, v] of Object.entries(a)) {
          ch.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))));
        }
      } else {
        ch.push(P(String(a)));
      }
    }
    // fallback: render any other keys
    for (const [k, v] of Object.entries(ic)) {
      if (['entrada_1_gfpi_f134', 'entrada_2_worksheets', 'entrada_3_pm0_anchor'].includes(k)) continue;
      ch.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))));
    }
  }

  // 4. Overview table (8 sesiones) — enriched with foco, habilidades, autonomo
  ch.push(pageBreak());
  ch.push(H1('4. Overview — Mapa de 8 Sesiones'));
  if (Array.isArray(d.overview_table)) {
    const headers = ['S#', 'Nombre', 'Momento SENA', 'Horas', 'Foco', 'Worksheets', 'Habilidades', 'Evidencia', 'Autónomo'];
    const widths = [550, 1500, 1100, 650, 1400, 1500, 1100, 1200, 1080];
    const rows = d.overview_table.map(s => [
      `S${s.session ?? s.numero ?? ''}`,
      s.nombre || s.session_name || '—',
      s.momento_sena || s.fase || '—',
      `${s.horas_directas ?? s.horas ?? '7.5'}h`,
      s.foco || '—',
      Array.isArray(s.worksheets) ? s.worksheets.join(', ') : (s.worksheets || '—'),
      Array.isArray(s.habilidades) ? s.habilidades.join(', ') : (s.habilidades || '—'),
      s.evidencia_formal || s.evidencia || '—',
      Array.isArray(s.autonomo) ? s.autonomo.join(' · ') : (typeof s.autonomo === 'object' && s.autonomo ? JSON.stringify(s.autonomo) : (s.autonomo || '—')),
    ]);
    ch.push(makeTable(headers, rows, widths));
  }

  // 5. Skills progression map — schema canónico: {leyenda, tabla[{session, R,L,V,P,G,W,S}]}
  if (d.skills_progression_map) {
    ch.push(pageBreak());
    ch.push(H1('5. Skills Progression Map'));
    const sp = d.skills_progression_map;
    // Caso A: dict canónico {leyenda, tabla}
    if (sp && typeof sp === 'object' && !Array.isArray(sp) && (sp.leyenda || Array.isArray(sp.tabla))) {
      if (sp.leyenda) ch.push(P(sp.leyenda, { italics: true }));
      if (Array.isArray(sp.tabla) && sp.tabla.length) {
        const headers = ['Sesión', 'R', 'L', 'V', 'P', 'G', 'W', 'S'];
        const rows = sp.tabla.map(r => [
          r.session != null ? `S${r.session}` : '—',
          r.R || '—', r.L || '—', r.V || '—',
          r.P || '—', r.G || '—', r.W || '—', r.S || '—',
        ]);
        ch.push(makeTable(headers, rows, [1200, 1280, 1280, 1280, 1280, 1280, 1280, 1280]));
      }
      // leyenda de códigos
      ch.push(P('R: Reading · L: Listening · V: Vocabulary · P: Pronunciation · G: Grammar · W: Writing · S: Speaking', { italics: true, size: 18 }));
    }
    // Caso B: lista plana de filas (fallback)
    else if (Array.isArray(sp)) {
      const headers = ['Sesión', 'R', 'L', 'V', 'P', 'G', 'W', 'S'];
      const rows = sp.map(r => (typeof r === 'object' && r !== null) ? [
        r.session != null ? `S${r.session}` : (r.skill || '—'),
        r.R || '—', r.L || '—', r.V || '—',
        r.P || '—', r.G || '—', r.W || '—', r.S || '—',
      ] : [String(r), '', '', '', '', '', '', '']);
      ch.push(makeTable(headers, rows, [1200, 1280, 1280, 1280, 1280, 1280, 1280, 1280]));
    }
    // Caso C: dict genérico (fallback)
    else if (sp && typeof sp === 'object') {
      for (const [k, v] of Object.entries(sp)) {
        if (Array.isArray(v)) {
          ch.push(H3(k.replaceAll('_', ' ')));
          for (const item of v) {
            if (typeof item === 'object' && item !== null) {
              // render as kv list
              const parts = Object.entries(item).map(([kk, vv]) => `${kk}: ${vv}`).join(' · ');
              ch.push(bullet(parts));
            } else {
              ch.push(bullet(String(item)));
            }
          }
        } else if (typeof v === 'object' && v !== null) {
          ch.push(H3(k.replaceAll('_', ' ')));
          for (const [kk, vv] of Object.entries(v)) {
            ch.push(kv(kk.replaceAll('_', ' '), Array.isArray(vv) ? vv.join(' · ') : String(vv)));
          }
        } else {
          ch.push(kv(k.replaceAll('_', ' '), String(v)));
        }
      }
    }
  }

  // 6. pm0_alignment_by_session (canon v2.6)
  ch.push(pageBreak());
  ch.push(H1('6. PM-0 Alignment por Sesión (Canon v2.6)'));
  ch.push(note('Cross-reference obligatorio con pm-0-context.json. Fixed BUG-PM31-001.'));
  if (Array.isArray(d.pm0_alignment_by_session)) {
    for (const s of d.pm0_alignment_by_session) {
      ch.push(H3(`S${s.session} — ${s.nombre || ''}`));

      // L1 target % — estructura {value, source, rationale}
      const l1 = s.l1_percentage_target;
      if (l1 && typeof l1 === 'object') {
        ch.push(kv('L1 target %', `${l1.value}%`));
        if (l1.rationale) ch.push(P(l1.rationale, { italics: true, size: 18 }));
        if (l1.source) ch.push(P(`Fuente: ${l1.source}`, { italics: true, size: 16 }));
      } else if (l1 != null) {
        ch.push(kv('L1 target %', `${l1}%`));
      }

      // Dominant feedback mode — estructura {mode, rationale, techniques[]}
      const fb = s.dominant_feedback_mode;
      if (fb && typeof fb === 'object') {
        ch.push(kv('Dominant feedback mode', fb.mode || '—'));
        if (fb.rationale) ch.push(P(fb.rationale, { italics: true, size: 18 }));
        if (Array.isArray(fb.techniques)) for (const t of fb.techniques) ch.push(bullet(t));
      } else if (fb) {
        ch.push(kv('Dominant feedback mode', String(fb)));
      }

      // Grammar groups activos — schema v2.6: LIST de {group_id, group_name, nivel_activacion, ejemplo_en_sesion}
      if (Array.isArray(s.grammar_groups_active) && s.grammar_groups_active.length) {
        ch.push(P('Grammar groups activos:', { bold: true }));
        for (const g of s.grammar_groups_active) {
          ch.push(bullet(`${g.group_id || ''} — ${g.group_name || ''}  (${g.nivel_activacion || '—'})`));
          if (g.ejemplo_en_sesion) ch.push(P(`   Ejemplo: ${g.ejemplo_en_sesion}`, { italics: true, size: 18 }));
        }
      } else if (s.grammar_groups_active && typeof s.grammar_groups_active === 'object') {
        // Legacy dict schema {intro, consolida, aplica}
        const g = s.grammar_groups_active;
        ch.push(P('Grammar groups activos:', { bold: true }));
        if (g.intro) ch.push(bullet(`INTRO: ${(g.intro || []).join(', ')}`));
        if (g.consolida) ch.push(bullet(`CONSOLIDA: ${(g.consolida || []).join(', ')}`));
        if (g.aplica) ch.push(bullet(`APLICA: ${(g.aplica || []).join(', ')}`));
      }
      if (s.grammar_carga_check) ch.push(P(`Carga: ${s.grammar_carga_check}`, { italics: true, size: 18 }));

      // Stress focus — estructura {target_words, techniques[], source}
      if (s.stress_focus && typeof s.stress_focus === 'object') {
        ch.push(P('Stress focus:', { bold: true }));
        const tw = s.stress_focus.target_words;
        if (Array.isArray(tw)) {
          for (const w of tw) {
            if (typeof w === 'object') {
              ch.push(bullet(`${w.word} ${w.ipa || ''} — tónica: ${w.tonica || '—'}`));
            } else {
              ch.push(bullet(String(w)));
            }
          }
        } else if (typeof tw === 'string') {
          ch.push(P(tw, { italics: true, size: 18 }));
        }
        if (Array.isArray(s.stress_focus.techniques)) {
          ch.push(P('Técnicas:', { bold: true, size: 18 }));
          for (const t of s.stress_focus.techniques) ch.push(bullet(t));
        }
      }

      // SUCCESS factors — estructura {target_vocabulary, factors_applied[], operationalization, source}
      if (s.success_factors_priorized && typeof s.success_factors_priorized === 'object') {
        ch.push(P('SUCCESS factors:', { bold: true }));
        const tv = s.success_factors_priorized.target_vocabulary;
        if (Array.isArray(tv)) ch.push(kv('Vocabulario target', tv.join(', ')));
        else if (typeof tv === 'string') ch.push(kv('Vocabulario target', tv));
        if (Array.isArray(s.success_factors_priorized.factors_applied)) {
          ch.push(kv('Factores aplicados', s.success_factors_priorized.factors_applied.join(', ')));
        }
        if (s.success_factors_priorized.operationalization) {
          ch.push(P(s.success_factors_priorized.operationalization, { italics: true, size: 18 }));
        }
      }

      // CEFR descriptor — estructura {subnivel, habilidad_principal, descriptor_activo, source}
      const cefr = s.cefr_descriptor_focus;
      if (cefr && typeof cefr === 'object') {
        ch.push(kv('CEFR descriptor', `${cefr.subnivel || ''} · ${cefr.habilidad_principal || ''}`));
        if (cefr.descriptor_activo) ch.push(P(cefr.descriptor_activo, { italics: true, size: 18 }));
      } else if (cefr) {
        ch.push(kv('CEFR descriptor', String(cefr)));
      }
    }
  }

  // 4. Ambientes resumen
  ch.push(pageBreak());
  ch.push(H1('7. Ambientes de Aprendizaje'));
  if (d.ambientes_resumen) {
    ch.push(note(d.ambientes_resumen.nota || ''));
    ch.push(kv('Tipo de ambiente', d.ambientes_resumen.tipo_ambiente));
    if (d.ambientes_resumen.recursos_fijos) {
      ch.push(H4('Recursos fijos'));
      for (const r of d.ambientes_resumen.recursos_fijos) ch.push(bullet(r));
    }
    const rv = d.ambientes_resumen.recursos_variables_por_sesion;
    if (rv) {
      ch.push(H4('Recursos variables por sesión'));
      if (typeof rv === 'string') {
        ch.push(P(rv, { italics: true }));
      } else if (typeof rv === 'object') {
        for (const [k, v] of Object.entries(rv)) {
          ch.push(kv(k, Array.isArray(v) ? v.join(', ') : String(v)));
        }
      }
    }
  }

  // 5. Estrategias resumen
  ch.push(pageBreak());
  ch.push(H1('8. Estrategias Didácticas por Sesión'));
  if (d.estrategias_resumen) {
    ch.push(note(d.estrategias_resumen.nota || ''));
    // ciclo_sena puede ser string u objeto {3.1_reflexion_inicial, 3.2_contextualizacion, 3.3_apropiacion, 3.4_transferencia}
    const cs = d.estrategias_resumen.ciclo_sena;
    if (cs) {
      if (typeof cs === 'string') {
        ch.push(kv('Ciclo SENA', cs));
      } else if (typeof cs === 'object') {
        ch.push(H3('Ciclo SENA'));
        for (const [k, v] of Object.entries(cs)) {
          ch.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : String(v)));
        }
      }
    }
    const est = d.estrategias_resumen.estrategia_dominante_por_sesion || {};
    const rows = Object.entries(est).map(([k, v]) => [k, typeof v === 'string' ? v : (v?.estrategia || JSON.stringify(v))]);
    if (rows.length) ch.push(makeTable(['Sesión', 'Estrategia dominante'], rows, [1500, 8580]));
  }

  // 6. V+O+C Dimensiones — aplica dimensionBlock (Ronda 1 DIESEL)
  ch.push(pageBreak());
  ch.push(H1('9. Tabla V+O+C — Dimensiones de Aprendizaje (8 sesiones)'));
  const renderDim = (dim) => {
    if (!dim) return '';
    if (typeof dim === 'string') return dim;
    if (typeof dim === 'object') {
      const v = dim.verbo || dim.verb || '';
      const o = dim.objeto || dim.object || '';
      const c = dim.condicion || dim.condition || '';
      return [v, o, c].filter(Boolean).join(' · ') || JSON.stringify(dim);
    }
    return String(dim);
  };
  if (Array.isArray(d.voc_dimensions_table)) {
    for (const row of d.voc_dimensions_table) {
      ch.push(H3(`S${row.session ?? row.sesion ?? ''} — ${row.nombre || ''}`));
      if (row.cognitiva) ch.push(dimensionBlock('COGNITIVA (Saber)', renderDim(row.cognitiva), ''));
      if (row.procedimental) ch.push(dimensionBlock('PROCEDIMENTAL (Hacer)', renderDim(row.procedimental), ''));
      if (row.actitudinal) ch.push(dimensionBlock('ACTITUDINAL (Ser)', renderDim(row.actitudinal), ''));
    }
  }

  // 7. Autonomous map
  ch.push(pageBreak());
  ch.push(H1('10. Mapa de Trabajo Autónomo'));
  if (d.autonomous_work_map) {
    const a = d.autonomous_work_map;
    ch.push(kv('Total horas autónomas', a.total_horas_autonomas || '12h'));
    if (a.desglose_por_sesion_horas) {
      ch.push(H4('Desglose por sesión'));
      for (const [k, v] of Object.entries(a.desglose_por_sesion_horas)) ch.push(kv(k, `${v}h`));
    }
    if (Array.isArray(a.asignaciones)) {
      ch.push(H4('Asignaciones'));
      // schema: {asignado_en, revisado_en, actividad, referencia_workbook, tiempo_min}
      const asigRows = a.asignaciones.map(x => {
        if (typeof x === 'string') return ['—', '—', x, '—', '—'];
        return [
          x.asignado_en || '—',
          x.revisado_en || '—',
          x.actividad || '—',
          x.referencia_workbook || '—',
          x.tiempo_min != null ? `${x.tiempo_min} min` : '—',
        ];
      });
      ch.push(makeTable(['Asignado en', 'Revisado en', 'Actividad', 'Referencia workbook', 'Tiempo'], asigRows, [1100, 1100, 3800, 2780, 1300]));
    }
    if (a.check) ch.push(kv('Check', a.check));
  }

  // 11. Master materials list
  if (d.master_materials_list && typeof d.master_materials_list === 'object') {
    ch.push(pageBreak());
    ch.push(H1('11. Master Materials List'));
    const mm = d.master_materials_list;
    if (Array.isArray(mm.impresos) && mm.impresos.length) {
      ch.push(H3('Impresos'));
      for (const x of mm.impresos) ch.push(bullet(String(x)));
    }
    if (Array.isArray(mm.digitales) && mm.digitales.length) {
      ch.push(H3('Digitales'));
      for (const x of mm.digitales) ch.push(bullet(String(x)));
    }
    if (Array.isArray(mm.equipamiento) && mm.equipamiento.length) {
      ch.push(H3('Equipamiento'));
      for (const x of mm.equipamiento) ch.push(bullet(String(x)));
    }
    if (Array.isArray(mm.aula) && mm.aula.length) {
      ch.push(H3('Aula'));
      for (const x of mm.aula) ch.push(bullet(String(x)));
    }
    // fallback for any additional keys
    for (const [k, v] of Object.entries(mm)) {
      if (['impresos', 'digitales', 'equipamiento', 'aula'].includes(k)) continue;
      if (Array.isArray(v)) {
        ch.push(H3(k.replaceAll('_', ' ')));
        for (const x of v) ch.push(bullet(typeof x === 'object' ? JSON.stringify(x) : String(x)));
      } else if (typeof v === 'object' && v !== null) {
        ch.push(H3(k.replaceAll('_', ' ')));
        for (const [kk, vv] of Object.entries(v)) ch.push(kv(kk.replaceAll('_', ' '), Array.isArray(vv) ? vv.join(' · ') : String(vv)));
      } else {
        ch.push(kv(k.replaceAll('_', ' '), String(v)));
      }
    }
  }

  // 12. Validaciones PM-3.1
  ch.push(pageBreak());
  ch.push(H1('12. Validaciones PM-3.1 (canon v2.6)'));
  if (d.validation_pm31_v251) {
    // Schema: each check = {status, detail}
    const valRows = Object.entries(d.validation_pm31_v251).map(([k, v]) => {
      const label = k.replaceAll('_', ' ');
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        return [label, v.status || '—', v.detail || (v.nota || '—')];
      }
      return [label, '—', String(v ?? '—')];
    });
    if (valRows.length) ch.push(makeTable(['Check', 'Estado', 'Detalle'], valRows, [3600, 1800, 4680]));
  }

  // 13. Contrato de propagación a PM-3.2
  if (d.pm_3_2_propagation_contract && typeof d.pm_3_2_propagation_contract === 'object') {
    ch.push(pageBreak());
    ch.push(H1('13. Contrato de propagación a PM-3.2'));
    const pc = d.pm_3_2_propagation_contract;
    if (pc.nota) ch.push(note(pc.nota));
    if (pc.regla) ch.push(kv('Regla', pc.regla));
    if (pc.script_canonico) ch.push(kv('Script canónico', pc.script_canonico));
    if (pc.mapping_pm0_alignment_to_pm0_protocol && typeof pc.mapping_pm0_alignment_to_pm0_protocol === 'object') {
      ch.push(H3('Mapping pm0_alignment → pm0_protocol'));
      const mapRows = Object.entries(pc.mapping_pm0_alignment_to_pm0_protocol).map(([k, v]) => [k, Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))]);
      if (mapRows.length) ch.push(makeTable(['pm0_alignment (pm-3-1)', 'pm0_protocol (pm-3-2)'], mapRows, [4800, 5280]));
    }
    if (pc.validacion_check_14_extendida_v252) {
      ch.push(H3('Validación Check-14 extendida (v2.5.2)'));
      const v14 = pc.validacion_check_14_extendida_v252;
      if (typeof v14 === 'object') {
        for (const [k, v] of Object.entries(v14)) {
          ch.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))));
        }
      } else {
        ch.push(P(String(v14)));
      }
    }
  }

  // 14. Siguiente paso
  if (d.siguiente_paso && typeof d.siguiente_paso === 'object') {
    ch.push(pageBreak());
    ch.push(H1('14. Siguiente Paso'));
    const sp = d.siguiente_paso;
    if (sp.next_pm) ch.push(kv('Próximo PM', sp.next_pm));
    if (sp.pm_3_2_deliverable) { ch.push(H3('Deliverable PM-3.2')); ch.push(P(String(sp.pm_3_2_deliverable))); }
    if (Array.isArray(sp.paralelo_recomendado)) {
      ch.push(H3('Paralelo recomendado'));
      for (const x of sp.paralelo_recomendado) ch.push(bullet(String(x)));
    } else if (sp.paralelo_recomendado) {
      ch.push(kv('Paralelo recomendado', String(sp.paralelo_recomendado)));
    }
    if (sp.compuerta_a_fase_4) { ch.push(H3('Compuerta a Fase 4')); ch.push(P(String(sp.compuerta_a_fase_4))); }
    // Fallback any other keys
    for (const [k, v] of Object.entries(sp)) {
      if (['next_pm', 'pm_3_2_deliverable', 'paralelo_recomendado', 'compuerta_a_fase_4'].includes(k)) continue;
      ch.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))));
    }
  }

  // Build doc
  return new Document({
    creator: 'FPI CD Engine v2.6',
    title: 'PM-3.1 Playbook Outline FINAL — DIESEL G1',
    description: 'Playbook Outline for final audit — DIESEL-2026-04-19 G1',
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
    'G1 — The Workshop Assistant · 8 Sesiones',
    {
      'Programa': 'Desarrollo de Medios Gráficos Visuales (522309)',
      'Guía': 'G1 — The Workshop Assistant',
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
        const fb = p0.feedback;
        ch.push(kv('Feedback mode', fb.mode || fb.dominant_mode || fb.dominant || '—'));
        if (fb.rationale) ch.push(P(fb.rationale, { italics: true, size: 18 }));
        if (Array.isArray(fb.accuracy_techniques) && fb.accuracy_techniques.length) {
          ch.push(H4('Accuracy techniques'));
          for (const t of fb.accuracy_techniques) ch.push(bullet(String(t)));
        }
        if (Array.isArray(fb.fluency_techniques) && fb.fluency_techniques.length) {
          ch.push(H4('Fluency techniques'));
          for (const t of fb.fluency_techniques) ch.push(bullet(String(t)));
        }
        if (Array.isArray(fb.mixed_techniques) && fb.mixed_techniques.length) {
          ch.push(H4('Mixed techniques'));
          for (const t of fb.mixed_techniques) ch.push(bullet(String(t)));
        }
      }
      if (p0.l1_management) {
        const l1m = p0.l1_management;
        const pct = (l1m.l1_percentage != null ? l1m.l1_percentage : (l1m.target_percentage != null ? l1m.target_percentage : null));
        const unit = l1m.l1_percentage_unit || '%';
        ch.push(kv('L1 target', pct != null ? `${pct}${unit}` : '—'));
        if (l1m.l1_rationale) ch.push(P(l1m.l1_rationale, { italics: true, size: 18 }));
        if (l1m.english_zone) ch.push(kv('English Zone', l1m.english_zone));
        if (Array.isArray(l1m.legitimate_uses) && l1m.legitimate_uses.length) {
          ch.push(kv('Usos legítimos L1', l1m.legitimate_uses.join(' · ')));
        }
        if (l1m.source) ch.push(P(`Fuente: ${l1m.source}`, { italics: true, size: 16 }));
      }
      if (p0.stress_pronunciation) {
        const sp = p0.stress_pronunciation;
        if (Array.isArray(sp.focus_words) && sp.focus_words.length) {
          ch.push(H4('Stress focus words'));
          for (const w of sp.focus_words) {
            if (typeof w === 'object' && w !== null) {
              const parts = [w.word || w.palabra || '—'];
              if (w.ipa) parts.push(w.ipa);
              if (w.tonica) parts.push(`tónica: ${w.tonica}`);
              ch.push(bullet(parts.join(' · ')));
            } else {
              ch.push(bullet(String(w)));
            }
          }
        }
        if (Array.isArray(sp.techniques) && sp.techniques.length) {
          ch.push(H4('Stress techniques'));
          for (const t of sp.techniques) ch.push(bullet(String(t)));
        }
        if (sp.source) ch.push(P(`Fuente: ${sp.source}`, { italics: true, size: 16 }));
      }
      if (p0.success_vocabulary) {
        const sv = p0.success_vocabulary;
        if (Array.isArray(sv.target_words) && sv.target_words.length) {
          ch.push(kv('Target vocabulary', sv.target_words.join(', ')));
        }
        const factors = sv.factors_applied || sv.success_factors_applied;
        if (Array.isArray(factors) && factors.length) {
          ch.push(kv('SUCCESS factors', factors.join(', ')));
        }
        if (sv.operationalization) {
          ch.push(H4('Operationalization'));
          ch.push(P(String(sv.operationalization)));
        }
      }
    }

    // Materials — schema: array de {item, cantidad, verificado} OR dict de arrays
    if (s.materials_checklist) {
      ch.push(H2('4. Materials Checklist'));
      const mc = s.materials_checklist;
      if (Array.isArray(mc)) {
        // Render as table
        const rows = mc.map(m => (typeof m === 'object' && m !== null) ? [
          m.item || m.nombre || m.name || '—',
          m.cantidad || m.qty || m.quantity || '—',
          (m.verificado === true ? '☑' : (m.verificado === false ? '☐' : '—')),
        ] : [String(m), '—', '—']);
        ch.push(makeTable(['Ítem', 'Cantidad', 'Verificado'], rows, [6400, 1600, 1280]));
      } else if (typeof mc === 'object') {
        for (const [k, v] of Object.entries(mc)) {
          if (Array.isArray(v)) {
            ch.push(H4(k.replaceAll('_', ' ')));
            for (const x of v) {
              if (typeof x === 'object' && x !== null) {
                const label = x.item || x.nombre || '—';
                const qty = x.cantidad ? ` (${x.cantidad})` : '';
                ch.push(bullet(`${label}${qty}`));
              } else {
                ch.push(bullet(String(x)));
              }
            }
          } else if (typeof v === 'object' && v !== null) {
            ch.push(kv(k, Object.entries(v).map(([kk, vv]) => `${kk}: ${vv}`).join(' · ')));
          } else {
            ch.push(kv(k, String(v)));
          }
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
      const su = s.set_up;
      if (su.duracion_min) ch.push(kv('Duración', `${su.duracion_min} min`));
      // warm_up puede ser string u objeto {nombre, pasos, ...}
      if (su.warm_up) {
        if (typeof su.warm_up === 'string') {
          ch.push(kv('Warm-up', su.warm_up));
        } else if (typeof su.warm_up === 'object') {
          const wu = su.warm_up;
          ch.push(H4(`Warm-up${wu.nombre ? ' — ' + wu.nombre : ''}`));
          if (wu.descripcion) ch.push(P(wu.descripcion));
          if (Array.isArray(wu.pasos)) {
            for (const p of wu.pasos) ch.push(bullet(typeof p === 'string' ? p : JSON.stringify(p)));
          }
          if (wu.duracion_min) ch.push(kv('Duración warm-up', `${wu.duracion_min} min`));
          if (wu.materiales) ch.push(kv('Materiales warm-up', Array.isArray(wu.materiales) ? wu.materiales.join(', ') : String(wu.materiales)));
        }
      }
      if (su.teacher_talk_opening) { ch.push(H4('Teacher Talk — Opening')); ch.push(quote(su.teacher_talk_opening)); }
      if (Array.isArray(su.pasos)) { ch.push(H4('Pasos')); for (const p of su.pasos) ch.push(bullet(typeof p === 'string' ? p : JSON.stringify(p))); }
      if (su.objetivo) ch.push(kv('Objetivo', su.objetivo));
      if (su.objective) ch.push(kv('Objective', su.objective));
      if (Array.isArray(su.icq)) { ch.push(H4('ICQ')); for (const q of su.icq) ch.push(bullet(typeof q === 'string' ? q : JSON.stringify(q))); }
      if (Array.isArray(su.facilitation_notes)) { ch.push(H4('Facilitation notes')); for (const n of su.facilitation_notes) ch.push(bullet(typeof n === 'string' ? n : JSON.stringify(n))); }
      if (su.checkpoint) {
        if (typeof su.checkpoint === 'string') ch.push(kv('Checkpoint', su.checkpoint));
        else if (typeof su.checkpoint === 'object') {
          ch.push(H4('Checkpoint'));
          for (const [k, v] of Object.entries(su.checkpoint)) ch.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : String(v)));
        }
      }
      if (su.transition) ch.push(quote(`Transición: ${typeof su.transition === 'string' ? su.transition : JSON.stringify(su.transition)}`));
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
        // activityHeader: sub-header con shading STEEL (Ronda 2)
        ch.push(activityHeader(
          `WHILE ${letra}`,
          nombre,
          b.nombre_es || '',
          s.header?.sesion_numero || s.sesion || '',
          b.materiales_requeridos || b.materials || null
        ));
        if (b.duracion_min) ch.push(kv('Duración', `${b.duracion_min} min`));
        if (b.agrupacion) ch.push(kv('Agrupación', b.agrupacion));
        if (b.worksheet_ref || b.pm_source) ch.push(kv('Worksheet / Source', b.worksheet_ref || b.pm_source));
        if (b.tecnica_didactica) ch.push(kv('Técnica didáctica', b.tecnica_didactica));
        if (b.objetivo) ch.push(kv('Objetivo', b.objetivo));
        if (b.teacher_talk_instruction) { ch.push(H4('Teacher Talk — Instruction')); ch.push(quote(b.teacher_talk_instruction)); }
        if (Array.isArray(b.instrucciones_paso_a_paso)) { ch.push(H4('Pasos')); for (const p of b.instrucciones_paso_a_paso) ch.push(bullet(p)); }
        if (Array.isArray(b.icq)) { ch.push(H4('ICQ')); for (const q of b.icq) ch.push(bullet(q)); }
        if (b.answer_key_inline) {
          ch.push(H4('Answer Key'));
          const aki = b.answer_key_inline;
          if (typeof aki === 'string') {
            ch.push(note(aki));
          } else if (typeof aki === 'object' && aki !== null) {
            for (const [k, v] of Object.entries(aki)) {
              const label = k.replaceAll('_', ' ');
              if (Array.isArray(v)) {
                ch.push(P(label + ':', { bold: true, size: 20 }));
                for (const item of v) ch.push(bullet(typeof item === 'string' ? item : JSON.stringify(item)));
              } else if (typeof v === 'object' && v !== null) {
                ch.push(P(label + ':', { bold: true, size: 20 }));
                for (const [kk, vv] of Object.entries(v)) {
                  ch.push(kv(kk.replaceAll('_', ' '), Array.isArray(vv) ? vv.join(' · ') : String(vv)));
                }
              } else {
                ch.push(kv(label, String(v)));
              }
            }
          }
        }
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
    title: 'PM-3.2 Playbook Build-Out FINAL — DIESEL G1',
    description: '8 sesiones consolidadas para auditoría — DIESEL-2026-04-19 G1',
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
  const ci = apx.contenido_inline;
  // Schema MGV v2.6: {tipo, ...props directas} (sin wrapper `data`). Fallback: {tipo, data}.
  const d = (ci.data && typeof ci.data === 'object') ? ci.data : ci;
  const tipo = ci.tipo;

  // Caja inline de apéndice con borde naranja + shading BEIGE (Ciclo 2 REGLA 11/12)
  const innerChildren = [];
  innerChildren.push(new Paragraph({
    children: [
      new TextRun({ text: '▸ ', font: 'Calibri', size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: String(apx.id || apx.titulo || ''), font: 'Calibri', size: 22, bold: true, color: NAVY }),
    ],
    spacing: { after: 60 },
  }));
  if (apx.titulo && apx.id && apx.id !== apx.titulo) {
    innerChildren.push(new Paragraph({
      children: [new TextRun({ text: String(apx.titulo), font: 'Calibri', size: 20, italics: true, color: NAVY })],
      spacing: { after: 80 },
    }));
  }
  if (tipo) innerChildren.push(new Paragraph({
    children: [new TextRun({ text: `Tipo: ${tipo}`, font: 'Calibri', size: 16, italics: true, color: GREY })],
    spacing: { after: 60 },
  }));

  // Branches por tipo — soporta schema directo MGV y wrapper `data` (legacy DIESEL)
  if (tipo === 'reading_text') {
    if (d.title) innerChildren.push(H4(d.title));
    if (d.source_credit) innerChildren.push(P(d.source_credit, { italics: true, size: 16, color: GREY }));
    if (d.genre) innerChildren.push(kv('Genre', d.genre));
    if (d.reading_time) innerChildren.push(kv('Reading time', d.reading_time));
    if (d.text_en) { innerChildren.push(H4('Text (EN)')); innerChildren.push(P(d.text_en)); }
    if (d.text_es_support) { innerChildren.push(H4('Texto de apoyo (ES)')); innerChildren.push(P(d.text_es_support, { italics: true })); }
    if (Array.isArray(d.paragraphs)) for (const p of d.paragraphs) innerChildren.push(P(p));
    else if (d.text && !d.text_en) innerChildren.push(P(d.text));
    if (Array.isArray(d.glossary)) {
      innerChildren.push(H4('Glossary'));
      for (const g of d.glossary) innerChildren.push(bullet(`${g.term}: ${g.definition || g.def || ''}`));
    }
    if (d.nota_uso) innerChildren.push(note(d.nota_uso));
  } else if (tipo === 'writing_model') {
    if (d.titulo_modelo || d.title) innerChildren.push(H4(d.titulo_modelo || d.title));
    if (d.instruction) innerChildren.push(quote(d.instruction));
    if (Array.isArray(d.moves_estructura)) {
      innerChildren.push(H4('Moves / Structure'));
      for (const m of d.moves_estructura) {
        if (typeof m === 'string') innerChildren.push(bullet(m));
        else if (typeof m === 'object' && m !== null) {
          innerChildren.push(P(`${m.move || m.label || ''}`, { bold: true, color: NAVY }));
          if (m.ejemplo || m.example) innerChildren.push(quote(m.ejemplo || m.example));
          if (m.funcion) innerChildren.push(kv('Función', m.funcion));
          if (m.nota_gramatical) innerChildren.push(note(m.nota_gramatical));
        }
      }
    }
    if (Array.isArray(d.fields)) for (const f of d.fields) innerChildren.push(bullet(`${f.label}: ${f.example || f.hint || '____'}`));
    if (d.sample) { innerChildren.push(H4('Sample')); innerChildren.push(P(d.sample)); }
    if (d.anti_modelo_warning) {
      innerChildren.push(H4('Anti-modelo (Avoid)'));
      const am = d.anti_modelo_warning;
      if (typeof am === 'string') innerChildren.push(quote(`⚠ ${am}`));
      else if (typeof am === 'object' && am !== null) {
        if (am.label) innerChildren.push(P(am.label, { bold: true, color: 'A83030' }));
        if (am.ejemplo_malo) innerChildren.push(quote(am.ejemplo_malo));
        if (am.por_que_falla) innerChildren.push(note(`Por qué falla: ${am.por_que_falla}`));
      }
    }
    if (d.nota_uso) innerChildren.push(note(d.nota_uso));
  } else if (tipo === 'audio_script') {
    if (d.titulo || d.title) innerChildren.push(H4(d.titulo || d.title));
    if (d.total_words != null) innerChildren.push(kv('Total words', d.total_words));
    if (d.duration_seconds != null) innerChildren.push(kv('Duration', `${d.duration_seconds}s`));
    if (d.scene) innerChildren.push(P(`Scene: ${d.scene}`, { italics: true }));
    if (Array.isArray(d.chunks)) {
      innerChildren.push(H4('Script'));
      for (const c of d.chunks) {
        if (typeof c === 'string') innerChildren.push(P(c));
        else if (typeof c === 'object' && c !== null) {
          const speaker = c.speaker || c.hablante || '';
          const line = c.line || c.texto || c.text || '';
          innerChildren.push(new Paragraph({
            children: [
              new TextRun({ text: speaker ? `${speaker}: ` : '', font: 'Calibri', size: 20, bold: true, color: ORANGE }),
              new TextRun({ text: String(line), font: 'Calibri', size: 20 }),
            ],
            spacing: { after: 40 },
          }));
        }
      }
    } else if (Array.isArray(d.turns)) {
      for (const t of d.turns) innerChildren.push(P(`${t.speaker}: ${t.line}`));
    }
    if (d.full_text) { innerChildren.push(H4('Full text')); innerChildren.push(P(d.full_text, { italics: true })); }
    if (d.nota_uso) innerChildren.push(note(d.nota_uso));
  } else if (tipo === 'word_wall') {
    if (d.total_cards != null) innerChildren.push(kv('Total cards', d.total_cards));
    if (Array.isArray(d.categorias)) {
      for (const cat of d.categorias) {
        innerChildren.push(H4(cat.categoria || cat.category || cat.name || 'Category'));
        if (Array.isArray(cat.terminos)) {
          const rows = cat.terminos.map(t => [
            String(t.n || '—'),
            t.term || t.word || '—',
            t.espanol || t.es || '—',
            t.example || t.ejemplo || '—',
          ]);
          innerChildren.push(makeTable(['#', 'Term (EN)', 'Español', 'Example'], rows, [600, 2200, 2200, 5080]));
        } else if (Array.isArray(cat.words) || Array.isArray(cat.terms)) {
          innerChildren.push(P((cat.words || cat.terms).join(', ')));
        }
      }
    } else if (Array.isArray(d.categories)) {
      const rows = d.categories.map(c => [c.category || c.name || '—', (c.words || c.terms || []).join(', ')]);
      innerChildren.push(makeTable(['Category', 'Words'], rows, [2500, 7580]));
    }
    if (d.nota_uso) innerChildren.push(note(d.nota_uso));
  } else if (tipo === 'mission_brief') {
    // Helper local: renderizar un sub-bloque {headline, lista/scenario/...}
    const renderSection = (label, section) => {
      if (section == null) return;
      if (typeof section === 'string') { innerChildren.push(H4(label)); innerChildren.push(P(section)); return; }
      if (typeof section !== 'object') return;
      const hl = section.headline || section.headline_en || section.title;
      innerChildren.push(H4(hl || label));
      // Descripción principal (scenarios)
      if (section.scenario_en) innerChildren.push(P(section.scenario_en));
      if (section.scenario_es || section.scenario_es_support) {
        innerChildren.push(P(section.scenario_es || section.scenario_es_support, { italics: true, color: DKGREY }));
      }
      if (section.scenario && !section.scenario_en) innerChildren.push(P(section.scenario));
      // Rol / audiencia (campos del mission brief)
      if (section.your_role_en) innerChildren.push(P(section.your_role_en, { bold: true, color: NAVY }));
      if (section.your_audience_en) innerChildren.push(P(section.your_audience_en, { bold: true, color: NAVY }));
      // Listas principales
      if (Array.isArray(section.lista)) for (const li of section.lista) innerChildren.push(bullet(typeof li === 'string' ? li : JSON.stringify(li)));
      // Obligatorio / obligatory_content
      const obligatorioArr = section.obligatorio || section.obligatory_content;
      if (Array.isArray(obligatorioArr)) {
        innerChildren.push(P('Obligatorio / Required:', { bold: true, color: ORANGE }));
        for (const li of obligatorioArr) innerChildren.push(bullet(typeof li === 'string' ? li : JSON.stringify(li)));
      }
      // Format options
      if (section.format_options) innerChildren.push(kv('Format', section.format_options));
      // Entrega / entrega_en
      if (section.entrega) innerChildren.push(kv('Entrega', section.entrega));
      if (section.entrega_en) innerChildren.push(kv('Submission', section.entrega_en));
      // Sub-secciones tiempos/proceso
      if (Array.isArray(section.tiempos)) {
        innerChildren.push(P('Tiempos:', { bold: true, color: NAVY }));
        for (const t of section.tiempos) innerChildren.push(bullet(typeof t === 'string' ? t : JSON.stringify(t)));
      }
      if (Array.isArray(section.proceso)) {
        innerChildren.push(P('Proceso:', { bold: true, color: NAVY }));
        for (const t of section.proceso) innerChildren.push(bullet(typeof t === 'string' ? t : JSON.stringify(t)));
      }
      // Restricciones / rules
      if (Array.isArray(section.restricciones)) {
        innerChildren.push(P('Restricciones:', { bold: true, color: 'A83030' }));
        for (const t of section.restricciones) innerChildren.push(bullet(typeof t === 'string' ? t : JSON.stringify(t)));
      }
      // Criterios de éxito
      const exitoArr = section.criterios_exito || section.success_criteria;
      if (Array.isArray(exitoArr)) {
        innerChildren.push(P('Criterios de Éxito / Success Criteria:', { bold: true, color: ORANGE }));
        for (const t of exitoArr) innerChildren.push(bullet(typeof t === 'string' ? t : JSON.stringify(t)));
      }
      // Fallback: resto de campos
      const handled = new Set([
        'headline','headline_en','title',
        'scenario_en','scenario_es','scenario','scenario_es_support',
        'your_role_en','your_audience_en',
        'lista','obligatorio','obligatory_content',
        'format_options','entrega','entrega_en',
        'tiempos','proceso',
        'restricciones','criterios_exito','success_criteria',
      ]);
      for (const [k, v] of Object.entries(section)) {
        if (handled.has(k)) continue;
        const niceKey = k.replaceAll('_',' ');
        if (typeof v === 'string') innerChildren.push(kv(niceKey, v));
        else if (Array.isArray(v)) {
          innerChildren.push(P(niceKey + ':', { bold: true }));
          for (const item of v) innerChildren.push(bullet(typeof item === 'string' ? item : JSON.stringify(item)));
        } else if (typeof v === 'object' && v !== null) {
          for (const [kk, vv] of Object.entries(v)) innerChildren.push(kv(`${niceKey} · ${kk.replaceAll('_',' ')}`, Array.isArray(vv) ? vv.join(' · ') : String(vv)));
        }
      }
    };

    if (d.titulo || d.title) innerChildren.push(H4(d.titulo || d.title));
    if (d.header_bilingual) {
      const hb = d.header_bilingual;
      if (typeof hb === 'string') innerChildren.push(P(hb, { bold: true, color: NAVY }));
      else {
        if (hb.en) innerChildren.push(P(hb.en, { bold: true, color: NAVY }));
        if (hb.es) innerChildren.push(P(hb.es, { italics: true, color: DKGREY }));
      }
    }
    renderSection('The Mission', d.the_mission || d.scenario);
    renderSection('The Briefing', d.the_briefing || d.briefing);
    renderSection('The Deliverable', d.the_deliverable || d.deliverable);
    renderSection('The Rules', d.the_rules || d.rules);
    if (d.roles) {
      innerChildren.push(H4('Roles'));
      (Array.isArray(d.roles) ? d.roles : [d.roles]).forEach(r => innerChildren.push(bullet(typeof r === 'string' ? r : `${r.name || r.nombre || ''}: ${r.description || r.descripcion || ''}`)));
    }
  } else if (tipo === 'planning_template') {
    if (d.titulo || d.title) innerChildren.push(H4(d.titulo || d.title));
    if (d.formato) innerChildren.push(kv('Formato', d.formato));
    if (Array.isArray(d.zonas)) {
      for (const z of d.zonas) {
        if (typeof z === 'string') innerChildren.push(bullet(z));
        else if (typeof z === 'object' && z !== null) {
          innerChildren.push(bullet(`${z.zona || z.label || ''}: ${z.prompt || z.hint || z.descripcion || '____'}`));
        }
      }
    }
    if (Array.isArray(d.sections)) for (const s of d.sections) innerChildren.push(bullet(`${s.label}: ${s.hint || '____'}`));
    if (d.nota_uso) innerChildren.push(note(d.nota_uso));
  } else if (tipo === 'self_assessment') {
    if (d.titulo || d.title) innerChildren.push(H4(d.titulo || d.title));
    if (d.instrucciones) innerChildren.push(P(d.instrucciones, { italics: true, color: DKGREY }));
    if (Array.isArray(d.items)) {
      let idx = 1;
      for (const i of d.items) {
        if (typeof i === 'string') { innerChildren.push(P(`${idx}. ${i}`, { bold: true })); idx++; continue; }
        if (typeof i === 'object' && i !== null) {
          const q = i.question || i.pregunta || i.texto || '';
          innerChildren.push(P(`${idx}. ${q}`, { bold: true }));
          // Render escala as inline "choice boxes"
          if (Array.isArray(i.escala)) {
            const escalaLine = i.escala.map(s => `☐ ${s}`).join('   ');
            innerChildren.push(P(escalaLine, { size: 20 }));
          } else if (Array.isArray(i.opciones)) {
            const opLine = i.opciones.map(s => `☐ ${s}`).join('   ');
            innerChildren.push(P(opLine, { size: 20 }));
          } else if (Array.isArray(i.options)) {
            const opLine = i.options.map(s => `☐ ${s}`).join('   ');
            innerChildren.push(P(opLine, { size: 20 }));
          }
          innerChildren.push(P('', { after: 60 }));
          idx++;
        }
      }
    }
    if (d.design_star) {
      innerChildren.push(H4('⭐ Design Star (Peer Recognition)'));
      if (typeof d.design_star === 'string') innerChildren.push(P(d.design_star));
      else if (typeof d.design_star === 'object') {
        if (d.design_star.instrucciones) innerChildren.push(P(d.design_star.instrucciones, { italics: true }));
        if (d.design_star.ejemplo) innerChildren.push(quote(d.design_star.ejemplo));
        // Fallback for other fields
        const handled = new Set(['instrucciones', 'ejemplo']);
        for (const [k, v] of Object.entries(d.design_star)) {
          if (handled.has(k)) continue;
          innerChildren.push(kv(k.replaceAll('_',' '), Array.isArray(v) ? v.join(' · ') : String(v)));
        }
      }
    }
  } else {
    // Fallback: dump estructurado
    for (const [k, v] of Object.entries(d)) {
      if (k === 'tipo') continue;
      if (Array.isArray(v)) {
        innerChildren.push(P(k.replaceAll('_', ' ') + ':', { bold: true }));
        for (const item of v) innerChildren.push(bullet(typeof item === 'string' ? item : JSON.stringify(item)));
      } else if (typeof v === 'object' && v !== null) {
        innerChildren.push(kv(k.replaceAll('_',' '), JSON.stringify(v)));
      } else {
        innerChildren.push(kv(k.replaceAll('_',' '), String(v)));
      }
    }
  }

  // Envolver todo en una caja inline con borde naranja + shading BEIGE
  ch.push(new Table({
    rows: [new TableRow({
      children: [new TableCell({
        children: innerChildren,
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: BEIGE, color: 'auto' },
        margins: { top: 140, bottom: 140, left: 200, right: 200 },
        borders: {
          top: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 6 },
          bottom: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 6 },
          left: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 12 },
          right: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 6 },
        },
      })],
    })],
    width: { size: CONTENT_W, type: WidthType.DXA },
  }));
  ch.push(P('', { after: 120 }));  // breathing room post-box
  return ch;
}

function renderActivityFooter(af) {
  if (!af) return [];
  // Footer sutil canon SENA GFPI-F-135: una sola línea inline, etiquetas en bold
  // pequeñas + valores en cursiva pequeña. Todo tamaño 14 (7pt) color DKGREY.
  //
  // Línea 1 — LOGÍSTICA (siempre presente):
  //   - Ambiente requerido                        (espacio físico / tipo de aula)
  //   - Estrategias o técnicas didácticas activas (metodología: ABP, ABT, etc.)
  //   - Técnica didáctica                         (técnica puntual dentro de la estrategia)
  //   - Duración
  //   - Materiales de formación                   (materiales que SÍ están en la guía)
  //   - Material de apoyo                         (externo: URLs, PDFs, libros de profundización)
  //
  // Línea 2 — EVIDENCIA (solo cuando af.evidencia está presente):
  //   - Evidencia de aprendizaje  (código + nombre canónico)
  //   - Tipo de evidencia         (Conocimiento / Desempeño / Producto)
  //   - Técnica de evaluación     (Preguntas / Observación / Verificación del producto)
  //   - Instrumento de evaluación (Cuestionario No X / Lista de Chequeo / Escala / Rúbrica)
  //
  // Esta segunda línea usa bullet ◆ en ORANGE y color STEEL para diferenciarse
  // del footer logístico. Así el instructor ve de inmediato cuáles actividades
  // producen evidencia formal GFPI-F-134 y con qué instrumento se evalúa.
  //
  // Fuente de verdad (canon v2.6, 2026-04-20):
  //   - Línea 1 deriva de pm-3-1.sessions_logistics + pm-3-2-sX.activity_logistics
  //   - Línea 2 deriva de pm-4-1.instrument_{1..5}_* + pm-4-2 (E6)
  const paragraphs = [];

  // ── Línea 1 — logística ────────────────────────────────────────────────
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
      spacing: { before: 40, after: af.evidencia ? 20 : 120 },
      border: { top: { color: 'D0D6DC', space: 4, style: BorderStyle.SINGLE, size: 2 } },
    }));
  }

  // ── Línea 2 — evidencia (solo si aplica) ───────────────────────────────
  if (af.evidencia) {
    const ev = af.evidencia;
    const evSegments = [];
    const nombreCompleto = ev.codigo && ev.nombre
      ? `${ev.codigo} — ${ev.nombre}`
      : (ev.codigo || ev.nombre || null);
    if (nombreCompleto) evSegments.push({ label: 'Evidencia de aprendizaje', value: nombreCompleto });
    if (ev.tipo_sena) evSegments.push({ label: 'Tipo de evidencia', value: String(ev.tipo_sena) });
    if (ev.tecnica_evaluacion) evSegments.push({ label: 'Técnica de evaluación', value: String(ev.tecnica_evaluacion) });
    if (ev.instrumento) evSegments.push({ label: 'Instrumento de evaluación', value: String(ev.instrumento) });

    if (evSegments.length) {
      const evRuns = [new TextRun({ text: '◆ ', font: 'Calibri', size: 14, color: ORANGE, bold: true })];
      evSegments.forEach((seg, i) => {
        if (i > 0) evRuns.push(new TextRun({ text: ' · ', font: 'Calibri', size: 14, color: STEEL }));
        evRuns.push(new TextRun({ text: `${seg.label}: `, font: 'Calibri', size: 14, bold: true, color: STEEL }));
        evRuns.push(new TextRun({ text: seg.value, font: 'Calibri', size: 14, italics: true, color: STEEL }));
      });
      paragraphs.push(new Paragraph({
        children: evRuns,
        spacing: { before: 20, after: 120 },
      }));
    }
  }

  return paragraphs;
}

// =========================================================================
// v2.6.3 — Activity Card con scaffolds inline (work-in-place)
// =========================================================================
// Canon: pm-3-6 actividades exponen:
//   titulo_en / titulo_es · tipo_actividad_sena · descripcion_aprendiz{en,es}
//   · paso_a_paso[] · scaffold_inline{tipo, titulo_en, titulo_es, badge?,
//   estructura} · entregable{producto, formato, criterio_minimo}
//
// Helpers v263 van con sufijo para no chocar con los legacy (stepsBlock,
// activityHeader, headerCell existen ya arriba con otra firma).
//
// Paleta local: BORDER_LGREY = D0D6DC (gris borde canon scaffold, más oscuro
// que LGREY de dimensionBlock). CREAM = FFF8EE ya declarado arriba.

const BORDER_LGREY = 'D0D6DC';

function bilingualBlock_v263(en, es, { enSize = 22, esSize = 14, spacingAfter = 120, indent = 0 } = {}) {
  return [
    new Paragraph({
      spacing: { before: 0, after: 20 },
      indent: indent ? { left: indent } : undefined,
      children: [new TextRun({ text: en || '', font: 'Calibri', size: enSize, color: NAVY })]
    }),
    new Paragraph({
      spacing: { before: 0, after: spacingAfter },
      indent: indent ? { left: indent } : undefined,
      children: [new TextRun({ text: es || '', font: 'Calibri', size: esSize, color: DKGREY, italics: true })]
    })
  ];
}

function sectionHeader_v263(label) {
  return new Paragraph({
    spacing: { before: 140, after: 40 },
    children: [new TextRun({
      text: String(label).toUpperCase(), font: 'Calibri', size: 18,
      color: STEEL, bold: true, characterSpacing: 40
    })]
  });
}

function activityHeader_v263(a) {
  const paragraphs = [];
  const id = a.actividad_id || a.activity_id || a.id || '';
  const tipo = (a.tipo_actividad_sena || '').toUpperCase();
  paragraphs.push(new Paragraph({
    spacing: { before: 280, after: 40 },
    children: [new TextRun({
      text: tipo ? `${id} · ${tipo}` : id,
      font: 'Calibri', size: 16, color: ORANGE, bold: true, characterSpacing: 40
    })]
  }));
  paragraphs.push(new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [new TextRun({ text: a.titulo_en || '', font: 'Calibri', size: 28, color: NAVY, bold: true })]
  }));
  if (a.titulo_es) {
    paragraphs.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: a.titulo_es, font: 'Calibri', size: 16, color: DKGREY, italics: true })]
    }));
  }
  const metaParts = [];
  if (a.tiempo_min != null) metaParts.push(`${a.tiempo_min} min`);
  if (a.agrupacion) metaParts.push(a.agrupacion);
  if (metaParts.length) {
    paragraphs.push(new Paragraph({
      spacing: { before: 0, after: 120 },
      border: { bottom: { color: BORDER_LGREY, space: 4, style: BorderStyle.SINGLE, size: 4 } },
      children: [new TextRun({
        text: metaParts.join('  ·  '),
        font: 'Calibri', size: 18, color: DKGREY, italics: true
      })]
    }));
  }
  return paragraphs;
}

function stepsBlock_v263(pasos) {
  const ch = [];
  if (!Array.isArray(pasos) || !pasos.length) return ch;
  ch.push(sectionHeader_v263('Paso a paso · Step by step'));
  pasos.forEach((p, i) => {
    ch.push(new Paragraph({
      spacing: { before: 40, after: 20 },
      indent: { left: 360, hanging: 360 },
      children: [
        new TextRun({ text: `${i + 1}.\t`, font: 'Calibri', size: 22, color: ORANGE, bold: true }),
        new TextRun({ text: p.en || '', font: 'Calibri', size: 22, color: NAVY })
      ]
    }));
    ch.push(new Paragraph({
      spacing: { before: 0, after: 80 },
      indent: { left: 360 },
      children: [new TextRun({ text: p.es || '', font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
  });
  return ch;
}

function deliverableBlock_v263(ent) {
  const ch = [];
  if (!ent) return ch;
  ch.push(sectionHeader_v263('Entregable · Deliverable'));
  const rows = [
    { label: 'Producto',        val: ent.producto },
    { label: 'Formato',         val: ent.formato },
    { label: 'Criterio mínimo', val: ent.criterio_minimo }
  ];
  for (const r of rows) {
    if (!r.val || typeof r.val !== 'object') continue;
    ch.push(new Paragraph({
      spacing: { before: 40, after: 0 },
      indent: { left: 200 },
      children: [
        new TextRun({ text: `${r.label}    `, font: 'Calibri', size: 18, color: STEEL, bold: true }),
        new TextRun({ text: r.val.en || '', font: 'Calibri', size: 22, color: NAVY })
      ]
    }));
    ch.push(new Paragraph({
      spacing: { before: 0, after: 80 },
      indent: { left: 1280 },
      children: [new TextRun({ text: r.val.es || '', font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
  }
  return ch;
}

// ── Scaffold table primitives ──────────────────────────────────────────────

function softBorder_v263(color = BORDER_LGREY, size = 4) {
  return { style: BorderStyle.SINGLE, size, color };
}
function allSoftBorders_v263(color = BORDER_LGREY, size = 4) {
  return {
    top: softBorder_v263(color, size), bottom: softBorder_v263(color, size),
    left: softBorder_v263(color, size), right: softBorder_v263(color, size),
    insideHorizontal: softBorder_v263(color, size), insideVertical: softBorder_v263(color, size)
  };
}

function headerCell_v263(en, es, widthPct) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: CREAM },
    verticalAlign: 'center',
    margins: { top: 40, bottom: 40, left: 100, right: 100 },
    children: [
      new Paragraph({
        spacing: { before: 0, after: 0 },
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: en || '', font: 'Calibri', size: 18, color: STEEL, bold: true, characterSpacing: 30 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: es || '', font: 'Calibri', size: 12, color: DKGREY, italics: true })]
      })
    ]
  });
}

function bodyCell_v263(text, { widthPct, minHeight = 0, color = NAVY, italic = false, size = 22, align = AlignmentType.LEFT, bold = false } = {}) {
  const children = [new Paragraph({
    spacing: { before: 0, after: 0 },
    alignment: align,
    children: [new TextRun({ text: text || '', font: 'Calibri', size, color, italics: italic, bold })]
  })];
  if (minHeight) {
    const n = Math.max(0, Math.ceil(minHeight / 260) - 1);
    for (let i = 0; i < n; i++) children.push(new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: '', size })] }));
  }
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: WHITE },
    verticalAlign: 'top',
    margins: { top: 40, bottom: 40, left: 100, right: 100 },
    children
  });
}

function scaffoldHeader_v263(titulo_en, titulo_es, { badge } = {}) {
  const ch = [];
  ch.push(sectionHeader_v263('Scaffold · Tu espacio de trabajo / Your workspace'));
  if (badge) {
    ch.push(new Paragraph({
      spacing: { before: 0, after: 80 },
      children: [new TextRun({
        text: `★ ${badge}`, font: 'Calibri', size: 16, color: ORANGE, bold: true, characterSpacing: 30
      })]
    }));
  }
  if (titulo_en) ch.push(new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text: titulo_en, font: 'Calibri', size: 20, color: NAVY, bold: true })]
  }));
  if (titulo_es) ch.push(new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [new TextRun({ text: titulo_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
  }));
  return ch;
}

function tipStrip_v263(en, es) {
  const ch = [];
  if (en) ch.push(new Paragraph({
    spacing: { before: 100, after: 40 },
    children: [new TextRun({ text: en, font: 'Calibri', size: 18, color: DKGREY, italics: true })]
  }));
  if (es) ch.push(new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
  }));
  return ch;
}

// ── 10 Scaffold renderers ──────────────────────────────────────────────────

function renderScaffoldMatching(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const cols = Array.isArray(est.columnas) ? est.columnas : [];
  if (!cols.length) return ch;
  const headerRow = new TableRow({
    tableHeader: true,
    children: cols.map(c => headerCell_v263(c.header_en, c.header_es, c.width_pct || Math.floor(100 / cols.length)))
  });
  const bodyRows = [];
  if (Array.isArray(est.filas_prellenadas)) {
    for (const fila of est.filas_prellenadas) {
      bodyRows.push(new TableRow({
        children: fila.map((celda, idx) => {
          const widthPct = cols[idx] && cols[idx].width_pct ? cols[idx].width_pct : Math.floor(100 / cols.length);
          if (celda && typeof celda === 'object' && celda.label_en) {
            // Celda prellenada: EN bold + ES italic pequeño
            return new TableCell({
              width: { size: widthPct, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: WHITE },
              verticalAlign: 'center',
              margins: { top: 40, bottom: 40, left: 140, right: 100 },
              children: [new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({ text: celda.label_en, font: 'Calibri', size: 22, color: NAVY, bold: true }),
                  celda.label_es && celda.label_es !== celda.label_en
                    ? new TextRun({ text: `   ${celda.label_es}`, font: 'Calibri', size: 14, color: DKGREY, italics: true })
                    : new TextRun({ text: '' })
                ]
              })]
            });
          }
          return bodyCell_v263('', { widthPct, minHeight: 600 });
        })
      }));
    }
  } else {
    const nFilas = est.filas || 3;
    for (let i = 0; i < nFilas; i++) {
      bodyRows.push(new TableRow({
        children: cols.map(c => bodyCell_v263('', {
          widthPct: c.width_pct || Math.floor(100 / cols.length),
          minHeight: 600
        }))
      }));
    }
  }
  ch.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allSoftBorders_v263(BORDER_LGREY, 4),
    rows: [headerRow, ...bodyRows]
  }));
  return ch;
}

function renderScaffoldChecklist(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const checks = Array.isArray(est.columnas_check) ? est.columnas_check : [];
  const terms = Array.isArray(est.terminos) ? est.terminos : [];
  if (!terms.length || !checks.length) return ch;
  const termWidth = 52;
  const checkWidth = Math.floor((100 - termWidth) / checks.length);
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell_v263('Term', 'Término', termWidth),
      ...checks.map(c => headerCell_v263(c.header_en, c.header_es, checkWidth))
    ]
  });
  const rows = [headerRow, ...terms.map(t => new TableRow({
    children: [
      new TableCell({
        width: { size: termWidth, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: WHITE },
        verticalAlign: 'center',
        margins: { top: 40, bottom: 40, left: 140, right: 100 },
        children: [new Paragraph({
          spacing: { before: 0, after: 0 },
          children: [
            new TextRun({ text: t.en || '', font: 'Calibri', size: 22, color: NAVY, bold: true }),
            new TextRun({ text: `   ${t.es || ''}`, font: 'Calibri', size: 14, color: DKGREY, italics: true })
          ]
        })]
      }),
      ...checks.map(() => bodyCell_v263('☐', {
        widthPct: checkWidth, minHeight: 340, size: 26, align: AlignmentType.CENTER, color: STEEL
      }))
    ]
  }))];
  ch.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allSoftBorders_v263(BORDER_LGREY, 4),
    rows
  }));
  ch.push(...tipStrip_v263(
    'Mark exactly one box per row. Zero blanks.',
    'Marca exactamente una casilla por fila. Sin vacíos.'
  ));
  return ch;
}

function renderScaffoldForm(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const campos = Array.isArray(est.campos) ? est.campos : [];
  if (!campos.length) return ch;
  for (const f of campos) {
    // Label bilingüe: EN bold + ES italic debajo
    ch.push(new Paragraph({
      spacing: { before: 100, after: 0 },
      children: [new TextRun({ text: f.label_en || '', font: 'Calibri', size: 20, color: NAVY, bold: true })]
    }));
    if (f.label_es) ch.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: f.label_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    const nLines = Math.max(1, f.lines || 1);
    for (let i = 0; i < nLines; i++) {
      ch.push(new Paragraph({
        spacing: { before: 0, after: 60 },
        border: { bottom: { color: BORDER_LGREY, space: 2, style: BorderStyle.SINGLE, size: 4 } },
        children: [new TextRun({ text: ' ', font: 'Calibri', size: 22 })]
      }));
    }
  }
  return ch;
}

function renderScaffoldTChart(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const a = est.columna_a || {}, b = est.columna_b || {};
  const nFilas = est.filas || 4;
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell_v263(a.header_en, a.header_es, 50),
      headerCell_v263(b.header_en, b.header_es, 50)
    ]
  });
  const bodyRows = [];
  for (let i = 0; i < nFilas; i++) {
    bodyRows.push(new TableRow({
      children: [
        bodyCell_v263('', { widthPct: 50, minHeight: 600 }),
        bodyCell_v263('', { widthPct: 50, minHeight: 600 })
      ]
    }));
  }
  ch.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allSoftBorders_v263(BORDER_LGREY, 4),
    rows: [headerRow, ...bodyRows]
  }));
  return ch;
}

function renderScaffoldWritingTemplate(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const lineas = Array.isArray(est.lineas_gap) ? est.lineas_gap : [];
  for (const l of lineas) {
    ch.push(new Paragraph({
      spacing: { before: 100, after: 0 },
      children: [new TextRun({ text: l.prompt_en || '', font: 'Calibri', size: 20, color: NAVY, bold: true })]
    }));
    if (l.prompt_es) ch.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: l.prompt_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    const nLines = Math.max(1, l.lines || 1);
    for (let i = 0; i < nLines; i++) {
      ch.push(new Paragraph({
        spacing: { before: 0, after: 60 },
        border: { bottom: { color: BORDER_LGREY, space: 2, style: BorderStyle.SINGLE, size: 4 } },
        children: [new TextRun({ text: ' ', font: 'Calibri', size: 22 })]
      }));
    }
  }
  return ch;
}

function renderScaffoldListeningCapture(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const secs = Array.isArray(est.secciones) ? est.secciones : [];
  for (const s of secs) {
    // Section header (bilingual, subtle)
    ch.push(new Paragraph({
      spacing: { before: 120, after: 0 },
      children: [new TextRun({ text: s.header_en || '', font: 'Calibri', size: 20, color: STEEL, bold: true })]
    }));
    if (s.header_es) ch.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: s.header_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    if (s.tipo === 'boxes') {
      const nBoxes = typeof s.items === 'number' ? s.items : (Array.isArray(s.items) ? s.items.length : 3);
      const widthPct = Math.floor(100 / Math.max(1, nBoxes));
      const row = new TableRow({
        children: Array.from({ length: nBoxes }, (_, i) => bodyCell_v263(`${i + 1}`, {
          widthPct, minHeight: 600, size: 16, color: DKGREY, italic: true, align: AlignmentType.LEFT
        }))
      });
      ch.push(new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: allSoftBorders_v263(BORDER_LGREY, 4),
        rows: [row]
      }));
    } else if (s.tipo === 'gap') {
      const items = Array.isArray(s.items) ? s.items : [];
      for (const it of items) {
        ch.push(new Paragraph({
          spacing: { before: 80, after: 0 },
          children: [new TextRun({ text: it.prompt_en || '', font: 'Calibri', size: 20, color: NAVY })]
        }));
        if (it.prompt_es) ch.push(new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: it.prompt_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
        }));
        ch.push(new Paragraph({
          spacing: { before: 0, after: 40 },
          border: { bottom: { color: BORDER_LGREY, space: 2, style: BorderStyle.SINGLE, size: 4 } },
          children: [new TextRun({ text: ' ', font: 'Calibri', size: 22 })]
        }));
      }
    }
  }
  return ch;
}

function renderScaffoldQuizPreview(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const items = Array.isArray(est.items) ? est.items : [];
  items.forEach((it, idx) => {
    // Optional section label (for quizzes that group by skill, e.g. E6)
    if (it.section_en || it.section_es) {
      if (it.section_en) ch.push(new Paragraph({
        spacing: { before: 120, after: 0 },
        children: [new TextRun({ text: it.section_en, font: 'Calibri', size: 18, color: STEEL, bold: true, characterSpacing: 30 })]
      }));
      if (it.section_es) ch.push(new Paragraph({
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: it.section_es, font: 'Calibri', size: 12, color: DKGREY, italics: true })]
      }));
    }
    const n = it.n != null ? it.n : (idx + 1);
    ch.push(new Paragraph({
      spacing: { before: idx === 0 ? 40 : 100, after: 0 },
      indent: { left: 360, hanging: 360 },
      children: [
        new TextRun({ text: `${n}.\t`, font: 'Calibri', size: 22, color: ORANGE, bold: true }),
        new TextRun({ text: it.q_en || '', font: 'Calibri', size: 22, color: NAVY, bold: true })
      ]
    }));
    if (it.q_es) ch.push(new Paragraph({
      spacing: { before: 0, after: 40 },
      indent: { left: 360 },
      children: [new TextRun({ text: it.q_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    const opts = Array.isArray(it.opts) ? it.opts : [];
    for (const o of opts) {
      ch.push(new Paragraph({
        spacing: { before: 0, after: 0 },
        indent: { left: 720, hanging: 360 },
        children: [
          new TextRun({ text: `○  ${o.k || ''}.\t`, font: 'Calibri', size: 22, color: STEEL, bold: true }),
          new TextRun({ text: o.en || '', font: 'Calibri', size: 22, color: NAVY })
        ]
      }));
      if (o.es) ch.push(new Paragraph({
        spacing: { before: 0, after: 20 },
        indent: { left: 1080 },
        children: [new TextRun({ text: o.es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
      }));
    }
  });
  return ch;
}

function renderScaffoldSpeakingScript(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const turnos = Array.isArray(est.turnos) ? est.turnos : [];
  turnos.forEach((t, idx) => {
    // Rol eyebrow
    ch.push(new Paragraph({
      spacing: { before: idx === 0 ? 80 : 160, after: 0 },
      children: [new TextRun({
        text: `TURN ${idx + 1}  ·  ${String(t.rol || '').toUpperCase()}`,
        font: 'Calibri', size: 16, color: ORANGE, bold: true, characterSpacing: 30
      })]
    }));
    ch.push(new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: t.prompt_en || '', font: 'Calibri', size: 20, color: NAVY, bold: true })]
    }));
    if (t.prompt_es) ch.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: t.prompt_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    const nLines = Math.max(1, t.lines || 2);
    for (let i = 0; i < nLines; i++) {
      ch.push(new Paragraph({
        spacing: { before: 0, after: 60 },
        border: { bottom: { color: BORDER_LGREY, space: 2, style: BorderStyle.SINGLE, size: 4 } },
        children: [new TextRun({ text: ' ', font: 'Calibri', size: 22 })]
      }));
    }
  });
  return ch;
}

function renderScaffoldReflectionLines(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  if (est.prompt_en) ch.push(new Paragraph({
    spacing: { before: 80, after: 0 },
    children: [new TextRun({ text: est.prompt_en, font: 'Calibri', size: 22, color: NAVY, bold: true })]
  }));
  if (est.prompt_es) ch.push(new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: est.prompt_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
  }));
  const nLines = Math.max(1, est.lines || 4);
  for (let i = 0; i < nLines; i++) {
    ch.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      border: { bottom: { color: BORDER_LGREY, space: 2, style: BorderStyle.SINGLE, size: 4 } },
      children: [new TextRun({ text: ' ', font: 'Calibri', size: 22 })]
    }));
  }
  return ch;
}

function renderScaffoldRating(sc) {
  const ch = [];
  ch.push(...scaffoldHeader_v263(sc.titulo_en, sc.titulo_es, { badge: sc.badge }));
  const est = sc.estructura || {};
  const items = Array.isArray(est.items) ? est.items : [];
  // Emoji rating table: 1 col for prompt, 5 cols for scale (😞 🙁 😐 🙂 🤩)
  if (items.length) {
    const scaleEmojis = ['😞', '🙁', '😐', '🙂', '🤩'];
    const headerRow = new TableRow({
      tableHeader: true,
      children: [
        headerCell_v263('Statement', 'Afirmación', 60),
        ...scaleEmojis.map(e => new TableCell({
          width: { size: 8, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, color: 'auto', fill: CREAM },
          verticalAlign: 'center',
          margins: { top: 40, bottom: 40, left: 40, right: 40 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0 },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: e, font: 'Calibri', size: 24 })]
          })]
        }))
      ]
    });
    const rows = [headerRow, ...items.map(it => new TableRow({
      children: [
        new TableCell({
          width: { size: 60, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, color: 'auto', fill: WHITE },
          verticalAlign: 'center',
          margins: { top: 40, bottom: 40, left: 140, right: 100 },
          children: [
            new Paragraph({
              spacing: { before: 0, after: 0 },
              children: [new TextRun({ text: it.prompt_en || '', font: 'Calibri', size: 20, color: NAVY })]
            }),
            new Paragraph({
              spacing: { before: 0, after: 0 },
              children: [new TextRun({ text: it.prompt_es || '', font: 'Calibri', size: 14, color: DKGREY, italics: true })]
            })
          ]
        }),
        ...scaleEmojis.map(() => bodyCell_v263('☐', {
          widthPct: 8, minHeight: 420, size: 22, align: AlignmentType.CENTER, color: STEEL
        }))
      ]
    }))];
    ch.push(new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: allSoftBorders_v263(BORDER_LGREY, 4),
      rows
    }));
  }
  // Open peer + open self prompts
  const opens = [
    { key: 'open_peer', block: est.open_peer },
    { key: 'open_self', block: est.open_self }
  ];
  for (const o of opens) {
    if (!o.block) continue;
    ch.push(new Paragraph({
      spacing: { before: 140, after: 0 },
      children: [new TextRun({ text: o.block.prompt_en || '', font: 'Calibri', size: 20, color: NAVY, bold: true })]
    }));
    if (o.block.prompt_es) ch.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: o.block.prompt_es, font: 'Calibri', size: 14, color: DKGREY, italics: true })]
    }));
    const nLines = Math.max(1, o.block.lines || 2);
    for (let i = 0; i < nLines; i++) {
      ch.push(new Paragraph({
        spacing: { before: 0, after: 60 },
        border: { bottom: { color: BORDER_LGREY, space: 2, style: BorderStyle.SINGLE, size: 4 } },
        children: [new TextRun({ text: ' ', font: 'Calibri', size: 22 })]
      }));
    }
  }
  return ch;
}

// ── Dispatcher ─────────────────────────────────────────────────────────────

function renderScaffoldInline(sc) {
  if (!sc || !sc.tipo) return [];
  switch (sc.tipo) {
    case 'matching':          return renderScaffoldMatching(sc);
    case 'checklist':         return renderScaffoldChecklist(sc);
    case 'form':              return renderScaffoldForm(sc);
    case 't_chart':           return renderScaffoldTChart(sc);
    case 'writing_template':  return renderScaffoldWritingTemplate(sc);
    case 'listening_capture': return renderScaffoldListeningCapture(sc);
    case 'quiz_preview':      return renderScaffoldQuizPreview(sc);
    case 'speaking_script':   return renderScaffoldSpeakingScript(sc);
    case 'reflection_lines':  return renderScaffoldReflectionLines(sc);
    case 'rating':            return renderScaffoldRating(sc);
    default:
      return [note(`[scaffold_inline.tipo desconocido: ${sc.tipo}]`)];
  }
}

// ── Activity Card v2.6.3 ───────────────────────────────────────────────────

function renderActivityCard_v263(a, apendicesById) {
  const ch = [];
  ch.push(...activityHeader_v263(a));
  // Description (bilingual lead-in, NO section header)
  if (a.descripcion_aprendiz) {
    ch.push(...bilingualBlock_v263(
      a.descripcion_aprendiz.en, a.descripcion_aprendiz.es,
      { enSize: 22, esSize: 14, spacingAfter: 180 }
    ));
  }
  // Steps
  ch.push(...stepsBlock_v263(a.paso_a_paso));
  // Legacy input content: reading text / listening script / word wall (goes
  // BEFORE the scaffold: input → workspace → deliverable).
  if (Array.isArray(a.apendices_referenciados)) {
    for (const apId of a.apendices_referenciados) {
      const apx = apendicesById && apendicesById[apId];
      if (apx) ch.push(...renderContenidoInline(apx));
    }
  }
  // v2.6.3 scaffold inline (the learner workspace)
  if (a.scaffold_inline) ch.push(...renderScaffoldInline(a.scaffold_inline));
  // Deliverable
  ch.push(...deliverableBlock_v263(a.entregable));
  // Footer (preserved from v2.6.1 canon)
  if (a.activity_footer) ch.push(...renderActivityFooter(a.activity_footer));
  return ch;
}

// =========================================================================
// renderActividades — dispatcher: v2.6.3 si la actividad tiene titulo_en,
// fallback legacy v2.6.1/v2.6.2 en otro caso (defensivo).
// =========================================================================

function renderActividades(actividades, apendicesById) {
  const ch = [];
  if (!Array.isArray(actividades)) return ch;
  for (const a of actividades) {
    // v2.6.3 path — preferred
    if (a && a.titulo_en) {
      ch.push(...renderActivityCard_v263(a, apendicesById));
      continue;
    }
    // Legacy fallback (v2.6.1 / v2.6.2)
    const actId = a.id || a.actividad_id || '';
    const actTitulo = a.titulo || a.nombre || a.nombre_aprendiz || '';
    ch.push(H4(`${actId} — ${actTitulo}`));
    const dims = a.etiquetas_dimension || (a.dimension ? [a.dimension] : null);
    if (Array.isArray(dims) && dims.length) ch.push(P(dims.map(x => `[${x}]`).join(' '), { bold: true, color: ORANGE }));
    else if (a.dimension) ch.push(P(`[${a.dimension}]`, { bold: true, color: ORANGE }));
    if (a.instruccion_2pers_en) { ch.push(H4('Instruction (EN)')); ch.push(P(a.instruccion_2pers_en)); }
    if (a.instruccion_supervivencia_es) { ch.push(H4('Supervivencia (ES)')); ch.push(P(a.instruccion_supervivencia_es, { italics: true })); }
    if (a.instruccion) ch.push(P(a.instruccion));
    if (a.tiempo_min != null) ch.push(kv('Tiempo', `${a.tiempo_min} min`));
    if (a.agrupacion) ch.push(kv('Agrupación', a.agrupacion));
    if (a.produce_evidencia) ch.push(kv('Produce evidencia', String(a.produce_evidencia)));
    if (Array.isArray(a.pasos)) { ch.push(H4('Pasos')); for (const p of a.pasos) ch.push(bullet(p)); }
    if (a.entregable) {
      ch.push(P('📋 ENTREGABLE', { bold: true, color: NAVY }));
      if (typeof a.entregable === 'string') ch.push(P(a.entregable));
      else for (const [k, v] of Object.entries(a.entregable)) ch.push(kv(k, typeof v === 'object' ? JSON.stringify(v) : String(v)));
    }
    if (Array.isArray(a.apendices_referenciados)) {
      for (const apId of a.apendices_referenciados) {
        const apx = apendicesById[apId];
        if (apx) ch.push(...renderContenidoInline(apx));
      }
    }
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
    'G1 — The Workshop Assistant',
    {
      'Programa': 'Desarrollo de Medios Gráficos Visuales (522309)',
      'Guía': 'G1 — The Workshop Assistant',
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

  // Sección 2 — Presentación (canon v2.6 + prólogo narrativo Ciclo 2.5)
  const s2 = d.seccion_2_presentacion || {};
  ch.push(pageBreak());
  ch.push(H1('2. Presentación'));
  if (s2.titulo_aprendiz) { ch.push(H2(s2.titulo_aprendiz)); }

  // ----- Helper: renderizar prosa multi-párrafo respetando saltos de línea -----
  const renderProse = (text, opts = {}) => {
    if (!text) return;
    const paragraphs = String(text).split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    for (const para of paragraphs) ch.push(P(para, opts));
  };

  // ----- PRÓLOGO (Ciclo 2.5) — apertura narrativa opcional, en caja destacada -----
  if (s2.prologo_en || s2.prologo_es_support) {
    // Caja de prólogo: fondo CREAM + borde naranja izquierdo 12pt, estilo "first page of a novel"
    const prologoChildren = [];
    prologoChildren.push(new Paragraph({
      children: [new TextRun({ text: 'PROLOGUE · PRÓLOGO', font: 'Calibri', size: 20, bold: true, color: ORANGE, characterSpacing: 40 })],
      spacing: { before: 0, after: 120 },
    }));
    if (s2.prologo_en) {
      const paras = String(s2.prologo_en).split(/\n\n+/).map(p => p.trim()).filter(Boolean);
      for (const para of paras) {
        prologoChildren.push(new Paragraph({
          children: [new TextRun({ text: para, font: 'Georgia', size: 24, color: NAVY })],
          spacing: { before: 60, after: 120, line: 320 },
        }));
      }
    }
    if (s2.prologo_es_support) {
      const paras = String(s2.prologo_es_support).split(/\n\n+/).map(p => p.trim()).filter(Boolean);
      for (const para of paras) {
        prologoChildren.push(new Paragraph({
          children: [new TextRun({ text: para, font: 'Georgia', size: 22, italics: true, color: DKGREY })],
          spacing: { before: 40, after: 100, line: 300 },
        }));
      }
    }
    ch.push(new Table({
      rows: [new TableRow({
        children: [new TableCell({
          children: prologoChildren,
          width: { size: CONTENT_W, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: CREAM, color: 'auto' },
          margins: { top: 280, bottom: 280, left: 320, right: 320 },
          borders: {
            top: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 6 },
            bottom: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 6 },
            left: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 18 },
            right: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 6 },
          },
        })],
      })],
      width: { size: CONTENT_W, type: WidthType.DXA },
    }));
    ch.push(P('', { after: 200 }));
  }

  // ----- WHAT YOU WILL LEARN — ahora en prosa multi-párrafo -----
  if (s2.que_aprenderas_en) {
    ch.push(H3('What you will learn · Qué aprenderás'));
    renderProse(s2.que_aprenderas_en);
  }
  if (s2.que_aprenderas_es_supervivencia) {
    renderProse(s2.que_aprenderas_es_supervivencia, { italics: true, color: DKGREY });
  }

  // ----- PARA QUÉ TE SERVIRÁ — bullets con hook narrativo -----
  if (Array.isArray(s2.para_que_te_servira) && s2.para_que_te_servira.length) {
    ch.push(H3('Para qué te servirá · Why this matters'));
    for (const item of s2.para_que_te_servira) ch.push(bullet(item));
  }

  // ----- UNIVERSO NARRATIVO — con escena de apertura opcional -----
  if (s2.universo_narrativo_aprendiz) {
    ch.push(H3('Universo narrativo · Your world for the next 8 sessions'));
    const un = s2.universo_narrativo_aprendiz;
    // Escena de apertura (Ciclo 2.5) — fragmento tipo "opening shot" en itálica Georgia
    if (un.escena_apertura_en || un.escena_apertura_es_support) {
      const sceneChildren = [];
      if (un.escena_apertura_en) {
        const paras = String(un.escena_apertura_en).split(/\n\n+/).map(p => p.trim()).filter(Boolean);
        for (const para of paras) {
          sceneChildren.push(new Paragraph({
            children: [new TextRun({ text: para, font: 'Georgia', size: 22, italics: true, color: NAVY })],
            spacing: { before: 60, after: 100, line: 300 },
          }));
        }
      }
      if (un.escena_apertura_es_support) {
        const paras = String(un.escena_apertura_es_support).split(/\n\n+/).map(p => p.trim()).filter(Boolean);
        for (const para of paras) {
          sceneChildren.push(new Paragraph({
            children: [new TextRun({ text: para, font: 'Georgia', size: 20, italics: true, color: DKGREY })],
            spacing: { before: 40, after: 80, line: 280 },
          }));
        }
      }
      ch.push(new Table({
        rows: [new TableRow({
          children: [new TableCell({
            children: sceneChildren,
            width: { size: CONTENT_W, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: BEIGE, color: 'auto' },
            margins: { top: 220, bottom: 220, left: 280, right: 280 },
            borders: {
              top: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 4 },
              bottom: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 4 },
              left: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 12 },
              right: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 4 },
            },
          })],
        })],
        width: { size: CONTENT_W, type: WidthType.DXA },
      }));
      ch.push(P('', { after: 140 }));
    }
    if (un.tu_estudio) { ch.push(P('Tu estudio · Your studio', { bold: true, color: NAVY })); ch.push(P(un.tu_estudio)); }
    if (un.tu_rol) { ch.push(P('Tu rol · Your role', { bold: true, color: NAVY })); ch.push(P(un.tu_rol)); }
    if (Array.isArray(un.tu_equipo) && un.tu_equipo.length) {
      ch.push(P('Tu equipo · Your team', { bold: true, color: NAVY }));
      for (const m of un.tu_equipo) ch.push(bullet(m));
    }
  }

  // ----- PROMESA PEDAGÓGICA — como invitación/juramento, en caja destacada -----
  const promesa = s2['promesa_pedagógica'] || s2.promesa_pedagogica;
  if (promesa) {
    ch.push(H3('Promesa pedagógica · Our promise to you'));
    const promesaChildren = [];
    const paras = String(promesa).split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    for (const para of paras) {
      promesaChildren.push(new Paragraph({
        children: [new TextRun({ text: para, font: 'Calibri', size: 22, color: NAVY })],
        spacing: { before: 60, after: 100, line: 300 },
      }));
    }
    ch.push(new Table({
      rows: [new TableRow({
        children: [new TableCell({
          children: promesaChildren,
          width: { size: CONTENT_W, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: LGREY, color: 'auto' },
          margins: { top: 220, bottom: 220, left: 280, right: 280 },
          borders: {
            top: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 8 },
            bottom: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 8 },
            left: { color: ORANGE, space: 4, style: BorderStyle.SINGLE, size: 18 },
            right: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 8 },
          },
        })],
      })],
      width: { size: CONTENT_W, type: WidthType.DXA },
    }));
    ch.push(P('', { after: 160 }));
  }

  // Fallback soft para esquemas antiguos
  if (s2.que_aprenderas && !s2.que_aprenderas_en) { ch.push(H3('¿Qué aprenderás?')); ch.push(P(s2.que_aprenderas)); }
  if (s2.para_que && !s2.para_que_te_servira) { ch.push(H3('¿Para qué?')); ch.push(P(s2.para_que)); }
  if (s2.aplicacion_laboral) { ch.push(H3('Aplicación laboral')); ch.push(P(s2.aplicacion_laboral)); }
  if (Array.isArray(s2.objetivos_aprendizaje)) { ch.push(H3('Objetivos')); for (const o of s2.objetivos_aprendizaje) ch.push(bullet(o)); }

  // Build apendices index
  // Build apendices index — schema v2.6 uses dict {apendice_a_...: {...}, apendice_b_...: {...}}
  // Legacy schema used list [{id, titulo, ...}]
  const apendicesById = {};
  if (Array.isArray(d.apendices_embebidos)) {
    for (const ap of d.apendices_embebidos) {
      if (ap && typeof ap === 'object') apendicesById[ap.id || ap.titulo || 'unknown'] = ap;
    }
  } else if (d.apendices_embebidos && typeof d.apendices_embebidos === 'object') {
    for (const [key, ap] of Object.entries(d.apendices_embebidos)) {
      if (ap && typeof ap === 'object') {
        // Derive short id: apendice_a_master_anchor_text → APÉNDICE A
        const letterMatch = key.match(/^apendice_([a-z])_/i);
        const derivedId = letterMatch ? `APÉNDICE ${letterMatch[1].toUpperCase()}` : key;
        apendicesById[key] = {
          ...ap,
          id: ap.id || derivedId,
          key_original: key,
        };
      }
    }
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

  // Sección 4 — Planteamiento de Evidencias (formato SENA v2.6.4: 6 columnas × N filas)
  // Canon v2.6.5: renderer compartido (fuente única de verdad — ver scripts/lib/render_seccion4_evidencias.js)
  const s4Children = renderSeccion4Evidencias(d, {
    docx: { Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, ShadingType },
    palette: { ORANGE, WHITE, GREY, CREAM: 'E8F5E3', CONTENT_W },
    helpers: { P, H1, H2, H3, cell, kv, quote, note, makeTable, pageBreak },
  });
  for (const el of s4Children) ch.push(el);

  // Sección 5 — Glosario (schema v2.6: categorias[].terminos[].{n, term, espanol, definition_en, ejemplo_en})
  ch.push(pageBreak());
  ch.push(H1('5. Glosario (Key Vocabulary)'));
  const s5 = d.seccion_5_glosario || {};
  if (s5.titulo_aprendiz) ch.push(H2(s5.titulo_aprendiz));
  if (s5.introduccion) ch.push(P(s5.introduccion));
  if (Array.isArray(s5.categorias) && s5.categorias.length) {
    for (const cat of s5.categorias) {
      ch.push(H3(cat.categoria || '—'));
      if (Array.isArray(cat.terminos) && cat.terminos.length) {
        const rows = cat.terminos.map(t => [
          t.n != null ? String(t.n) : '—',
          t.term || '—',
          t.espanol || '—',
          t.definition_en || '—',
          t.ejemplo_en || '—',
        ]);
        ch.push(makeTable(['#', 'Term', 'Español', 'Definition (EN)', 'Example (EN)'], rows, [600, 1400, 1800, 3200, 3080]));
      }
    }
  } else if (Array.isArray(s5.terminos) && s5.terminos.length) {
    // Fallback legacy schema
    const rows = s5.terminos.map(t => [t.term || t.termino || '—', t.definition || t.definicion || '—', t.example || t.ejemplo || '—']);
    ch.push(makeTable(['Term', 'Definition', 'Example'], rows, [2000, 5000, 3080]));
  }

  // Sección 6 — Referencias (schema v2.6: titulo_aprendiz, fuentes_curadas_pm12[{tipo, titulo, fuente, uso_en_guia}], recursos_adicionales_recomendados_a11[], nota)
  ch.push(pageBreak());
  ch.push(H1('6. Referentes Bibliográficos'));
  const s6 = d.seccion_6_referentes_bibliograficos || {};
  if (s6.titulo_aprendiz) ch.push(H2(s6.titulo_aprendiz));
  if (Array.isArray(s6.fuentes_curadas_pm12) && s6.fuentes_curadas_pm12.length) {
    ch.push(H3('Fuentes curadas (PM-1.2)'));
    for (const r of s6.fuentes_curadas_pm12) {
      if (typeof r === 'string') {
        ch.push(bullet(r));
      } else {
        ch.push(P(`• ${r.titulo || ''}`, { bold: true }));
        if (r.tipo) ch.push(kv('   Tipo', r.tipo));
        if (r.fuente) ch.push(kv('   Fuente', r.fuente));
        if (r.uso_en_guia) ch.push(kv('   Uso en la guía', r.uso_en_guia));
      }
    }
  }
  if (Array.isArray(s6.recursos_adicionales_recomendados_a11) && s6.recursos_adicionales_recomendados_a11.length) {
    ch.push(H3('Recursos adicionales recomendados (A1.1)'));
    for (const r of s6.recursos_adicionales_recomendados_a11) ch.push(bullet(typeof r === 'string' ? r : (r.titulo || r.url || JSON.stringify(r))));
  }
  if (Array.isArray(s6.referencias)) {
    ch.push(H3('Referencias'));
    for (const r of s6.referencias) ch.push(bullet(typeof r === 'string' ? r : `${r.titulo || ''} · ${r.autor || ''} · ${r.fuente || r.url || ''}`));
  }
  if (s6.nota) ch.push(P(s6.nota, { italics: true, color: GREY }));

  // Sección 7 — Control del documento (schema v2.6: {titulo, tabla: {encabezado[], filas[][]}})
  ch.push(pageBreak());
  ch.push(H1('7. Control del Documento'));
  const s7 = d.seccion_7_control_documento || {};
  if (s7.titulo && s7.titulo !== '7. Control del Documento') ch.push(H2(s7.titulo));
  if (s7.tabla && Array.isArray(s7.tabla.encabezado) && Array.isArray(s7.tabla.filas)) {
    const headers = s7.tabla.encabezado;
    const rows = s7.tabla.filas.map(r => Array.isArray(r) ? r.map(c => String(c ?? '—')) : [String(r)]);
    // default equal widths summing to ~10000
    const per = Math.floor(10080 / Math.max(headers.length, 1));
    const widths = headers.map(() => per);
    ch.push(makeTable(headers, rows, widths));
  } else {
    for (const [k, v] of Object.entries(s7)) {
      if (k === 'titulo') continue;
      ch.push(kv(k.replaceAll('_', ' '), typeof v === 'object' ? JSON.stringify(v) : String(v)));
    }
  }

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
    ch.push(H1('Apéndices Embebidos (Índice)'));
    ch.push(note('REGLA 12 v2.6 — Doble render: cada apéndice ya fue renderizado inline en su actividad. Este índice lista todos los apéndices con su origen PM y extensión aproximada.'));
    const rows = Object.values(apendicesById).map(ap => [
      ap.id || '—',
      ap.titulo || '—',
      ap.fuente_pm_2_3 || ap.fuente_pm_2_4 || ap.fuente_pm_2_6 || ap.fuente_pm_2_5 || ap.fuente_pm_2_8 || ap.fuente_pm_2_9 || ap.fuente_pm_2_10 || ap.fuente_pm_3_5 || ap.ubicacion_seccion || '—',
      ap.extension_aproximada || ap.contenido_inline?.tipo || '—',
    ]);
    ch.push(makeTable(['ID', 'Título', 'Fuente / Ubicación', 'Extensión / Tipo'], rows, [1200, 4200, 2800, 1880]));
  }

  // Cross references (si existe en schema)
  if (d.cross_references && typeof d.cross_references === 'object') {
    ch.push(pageBreak());
    ch.push(H1('Cross-References'));
    for (const [k, v] of Object.entries(d.cross_references)) {
      if (Array.isArray(v)) {
        ch.push(H3(k.replaceAll('_', ' ')));
        for (const x of v) ch.push(bullet(typeof x === 'object' ? JSON.stringify(x) : String(x)));
      } else if (typeof v === 'object' && v !== null) {
        ch.push(H3(k.replaceAll('_', ' ')));
        for (const [kk, vv] of Object.entries(v)) ch.push(kv(kk.replaceAll('_', ' '), Array.isArray(vv) ? vv.join(' · ') : (typeof vv === 'object' ? JSON.stringify(vv) : String(vv))));
      } else {
        ch.push(kv(k.replaceAll('_', ' '), String(v)));
      }
    }
  }

  // RAP status (si existe)
  if (d.rap_status && typeof d.rap_status === 'object') {
    ch.push(H1('RAP Status'));
    for (const [k, v] of Object.entries(d.rap_status)) {
      if (Array.isArray(v)) {
        ch.push(kv(k.replaceAll('_', ' '), v.join(' · ')));
      } else if (typeof v === 'object' && v !== null) {
        ch.push(H3(k.replaceAll('_', ' ')));
        for (const [kk, vv] of Object.entries(v)) ch.push(kv(kk.replaceAll('_', ' '), Array.isArray(vv) ? vv.join(' · ') : String(vv)));
      } else {
        ch.push(kv(k.replaceAll('_', ' '), String(v)));
      }
    }
  }

  // Validation checks
  if (d.validation_checks) {
    ch.push(pageBreak());
    ch.push(H1('Validation Checks'));
    const vc = d.validation_checks;
    if (Array.isArray(vc)) {
      for (const v of vc) {
        if (typeof v === 'object' && v !== null) {
          const lbl = v.check || v.nombre || v.id || '—';
          ch.push(kv(lbl, `${v.status || '—'} · ${v.detail || v.nota || ''}`));
        } else {
          ch.push(bullet(String(v)));
        }
      }
    } else if (typeof vc === 'object') {
      const valRows = Object.entries(vc).map(([k, v]) => {
        const label = k.replaceAll('_', ' ');
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          return [label, v.status || '—', v.detail || v.nota || JSON.stringify(v)];
        }
        return [label, '—', Array.isArray(v) ? v.join(' · ') : String(v ?? '—')];
      });
      if (valRows.length) ch.push(makeTable(['Check', 'Estado', 'Detalle'], valRows, [3600, 1800, 4680]));
    }
  }

  return new Document({
    creator: 'FPI CD Engine v2.6',
    title: 'GFPI-F-135 Guía del Aprendiz FINAL — DIESEL G1',
    description: 'Guía del aprendiz para auditoría — DIESEL-2026-04-19 G1',
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
