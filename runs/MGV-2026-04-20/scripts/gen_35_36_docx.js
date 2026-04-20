#!/usr/bin/env node
/**
 * gen_35_36_docx.js — Generates 2 review DOCX:
 *   1. pm-3-5-review.docx  (Final Mission ABP — Brief + Checklist + Rúbrica)
 *   2. pm-3-6-review.docx  (GFPI-F-135 Learning Guide V02)
 *
 * Output: /sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20/
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, PageOrientation,
  Footer, PageNumber
} = require('/tmp/node_modules/docx');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';

const NAVY = '1C2B3C';
const ORANGE = 'F59316';
const GREY = '666666';
const LIGHT = 'F2F2F2';
const ACCENT = 'D5E8F0';
const WHITE = 'FFFFFF';

const P = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text: String(text ?? ''), font: 'Calibri', size: opts.size || 20, bold: !!opts.bold, italics: !!opts.italics, color: opts.color || undefined })],
  alignment: opts.alignment || AlignmentType.LEFT,
  spacing: { after: opts.after ?? 80 },
});

const Runs = (runs, opts = {}) => new Paragraph({
  children: runs.map(r => new TextRun({ text: String(r.text ?? ''), font: 'Calibri', size: r.size || 20, bold: !!r.bold, italics: !!r.italics, color: r.color || undefined })),
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
        new TextRun({ text: `${title} · MGV-2026-04-20 · `, font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ text: ' / ', font: 'Calibri', size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Calibri', size: 16, color: GREY }),
      ],
    })],
  }),
});

// Render a single inline appendix (full content) as a contained block within an activity
const renderInlineAppendix = (apKey, apDoc) => {
  const out = [];
  const c = apDoc.contenido_inline || {};
  const titulo = apDoc.titulo || apKey;

  // Heading band
  out.push(new Paragraph({
    children: [new TextRun({ text: '📎 ' + titulo, font: 'Calibri', size: 20, bold: true, color: WHITE })],
    shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' },
    spacing: { before: 160, after: 0 },
    border: {
      top: { style: BorderStyle.SINGLE, color: NAVY, size: 6 },
      bottom: { style: BorderStyle.NONE, size: 0 },
      left: { style: BorderStyle.SINGLE, color: NAVY, size: 6 },
      right: { style: BorderStyle.SINGLE, color: NAVY, size: 6 },
    },
  }));

  const wrap = (innerChildren) => new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        children: innerChildren,
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: LIGHT, color: 'auto' },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0 },
          left: { style: BorderStyle.SINGLE, color: NAVY, size: 6 },
          right: { style: BorderStyle.SINGLE, color: NAVY, size: 6 },
          bottom: { style: BorderStyle.SINGLE, color: NAVY, size: 6 },
        }
      })]
    })]
  });

  const inner = [];

  // Dispatch by tipo
  if (c.tipo === 'reading_text') {
    inner.push(new Paragraph({ children: [new TextRun({ text: 'Source: ' + (c.source_credit || ''), font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 40 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: 'Genre: ' + (c.genre || '') + ' · ' + (c.reading_time || ''), font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 100 } }));
    // Split English text by paragraphs (double-newline or sentence groups)
    const paras = String(c.text_en || '').split(/\n\n+/).filter(Boolean);
    for (const p of paras) {
      inner.push(new Paragraph({ children: [new TextRun({ text: p.trim(), font: 'Calibri', size: 20, color: NAVY })], spacing: { after: 100 } }));
    }
    // ES support in italics grey
    inner.push(new Paragraph({ children: [new TextRun({ text: 'ES support: ', font: 'Calibri', size: 16, bold: true, italics: true, color: GREY })], spacing: { after: 20 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: String(c.text_es_support || ''), font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 60 } }));
    if (c.nota_uso) inner.push(new Paragraph({ children: [new TextRun({ text: '→ ' + c.nota_uso, font: 'Calibri', size: 16, italics: true, color: ORANGE })], spacing: { after: 60 } }));
  }
  else if (c.tipo === 'writing_model') {
    if (c.titulo_modelo) inner.push(new Paragraph({ children: [new TextRun({ text: c.titulo_modelo, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 60 } }));
    if (c.nota_uso) inner.push(new Paragraph({ children: [new TextRun({ text: c.nota_uso, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 100 } }));
    for (const m of (c.moves_estructura || [])) {
      inner.push(new Paragraph({ children: [new TextRun({ text: m.move, font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { before: 60, after: 20 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: m.ejemplo, font: 'Calibri', size: 20, color: NAVY })], spacing: { after: 20 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: 'Función: ' + m.funcion + (m.nota_gramatical ? ' · ' + m.nota_gramatical : ''), font: 'Calibri', size: 14, italics: true, color: GREY })], spacing: { after: 60 } }));
    }
    if (c.anti_modelo_warning) {
      inner.push(new Paragraph({ children: [new TextRun({ text: c.anti_modelo_warning.label, font: 'Calibri', size: 18, bold: true, color: 'B00020' })], spacing: { before: 100, after: 20 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: c.anti_modelo_warning.ejemplo_malo, font: 'Calibri', size: 18, italics: true, color: 'B00020' })], spacing: { after: 30 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: 'Por qué falla: ' + c.anti_modelo_warning.por_que_falla, font: 'Calibri', size: 14, italics: true, color: GREY })], spacing: { after: 40 } }));
    }
  }
  else if (c.tipo === 'audio_script') {
    inner.push(new Paragraph({ children: [new TextRun({ text: c.titulo, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 20 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: `Duración: ${c.duration_seconds}s · ${c.total_words} palabras · ${(c.chunks||[]).length} turnos`, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 80 } }));
    for (const ch of (c.chunks || [])) {
      inner.push(new Paragraph({
        children: [
          new TextRun({ text: `[${ch.speaker}] `, font: 'Calibri', size: 18, bold: true, color: ORANGE }),
          new TextRun({ text: ch.texto, font: 'Calibri', size: 20, color: NAVY }),
        ],
        spacing: { after: 40 },
      }));
    }
    if (c.nota_uso) inner.push(new Paragraph({ children: [new TextRun({ text: '→ ' + c.nota_uso, font: 'Calibri', size: 16, italics: true, color: ORANGE })], spacing: { before: 60, after: 40 } }));
  }
  else if (c.tipo === 'word_wall') {
    if (c.nota_uso) inner.push(new Paragraph({ children: [new TextRun({ text: c.nota_uso, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 100 } }));
    for (const cat of (c.categorias || [])) {
      inner.push(new Paragraph({ children: [new TextRun({ text: cat.categoria, font: 'Calibri', size: 20, bold: true, color: ORANGE })], spacing: { before: 80, after: 40 } }));
      const tbl = new Table({
        width: { size: CONTENT_W - 320, type: WidthType.DXA },
        rows: [
          new TableRow({ children: [
            headerCell('#', 500),
            headerCell('Term', 1400),
            headerCell('Español', 1800),
            headerCell('Definition (EN)', CONTENT_W - 320 - 500 - 1400 - 1800),
          ]}),
          ...(cat.terminos || []).map(t => new TableRow({
            children: [
              cell(String(t.n), 500, { bold: true, fill: ACCENT }),
              cell(t.term, 1400, { bold: true }),
              cell(t.espanol, 1800, { italics: true, color: GREY }),
              cell(t.definition_en, CONTENT_W - 320 - 500 - 1400 - 1800),
            ]
          }))
        ]
      });
      inner.push(tbl);
    }
  }
  else if (c.tipo === 'mission_brief') {
    inner.push(new Paragraph({ children: [new TextRun({ text: c.titulo, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 40 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.header_bilingual, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 100 } }));
    // The mission
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_mission.headline_en, font: 'Calibri', size: 20, bold: true, color: ORANGE })], spacing: { after: 40 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_mission.scenario_en, font: 'Calibri', size: 20, color: NAVY })], spacing: { after: 40 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_mission.scenario_es_support, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 60 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_mission.your_role_en, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 20 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_mission.your_audience_en, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 80 } }));
    // Briefing
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_briefing.headline, font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { before: 80, after: 40 } }));
    for (const item of c.the_briefing.lista) inner.push(new Paragraph({ children: [new TextRun({ text: item, font: 'Calibri', size: 18 })], bullet: { level: 0 }, spacing: { after: 30 } }));
    // Deliverable
    inner.push(new Paragraph({ children: [new TextRun({ text: c.the_deliverable.headline, font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { before: 80, after: 40 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: 'Format: ' + c.the_deliverable.format_options, font: 'Calibri', size: 18 })], spacing: { after: 30 } }));
    for (const item of (c.the_deliverable.obligatory_content || [])) inner.push(new Paragraph({ children: [new TextRun({ text: item, font: 'Calibri', size: 18 })], bullet: { level: 0 }, spacing: { after: 30 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: 'Entrega: ' + c.the_deliverable.entrega, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 60 } }));
    // Rules
    inner.push(new Paragraph({ children: [new TextRun({ text: '⏱ Reglas', font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { before: 60, after: 30 } }));
    for (const item of (c.the_rules.tiempos || [])) inner.push(new Paragraph({ children: [new TextRun({ text: 'Tiempo: ' + item, font: 'Calibri', size: 16 })], spacing: { after: 20 } }));
    for (const item of (c.the_rules.criterios_exito || [])) inner.push(new Paragraph({ children: [new TextRun({ text: '✓ ' + item, font: 'Calibri', size: 16 })], spacing: { after: 20 } }));
  }
  else if (c.tipo === 'planning_template') {
    inner.push(new Paragraph({ children: [new TextRun({ text: c.titulo, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 20 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.formato, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 80 } }));
    const tbl = new Table({
      width: { size: CONTENT_W - 320, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          headerCell('#', 500),
          headerCell('Zona', 2000),
          headerCell('Pregunta', CONTENT_W - 320 - 500 - 2000 - 1500),
          headerCell('Espacio', 1500),
        ]}),
        ...(c.zonas || []).map(z => new TableRow({
          children: [
            cell(String(z.n), 500, { bold: true, fill: ACCENT }),
            cell(z.label, 2000, { bold: true }),
            cell(z.pregunta, CONTENT_W - 320 - 500 - 2000 - 1500),
            cell(z.espacio, 1500, { italics: true, color: GREY }),
          ]
        }))
      ]
    });
    inner.push(tbl);
    if (c.nota_uso) inner.push(new Paragraph({ children: [new TextRun({ text: '→ ' + c.nota_uso, font: 'Calibri', size: 16, italics: true, color: ORANGE })], spacing: { before: 60, after: 40 } }));
  }
  else if (c.tipo === 'self_assessment') {
    inner.push(new Paragraph({ children: [new TextRun({ text: c.titulo, font: 'Calibri', size: 20, bold: true, color: NAVY })], spacing: { after: 20 } }));
    inner.push(new Paragraph({ children: [new TextRun({ text: c.instrucciones, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 100 } }));
    for (const [i, it] of (c.items || []).entries()) {
      inner.push(new Paragraph({ children: [new TextRun({ text: `Q${i+1}. ${it.pregunta}`, font: 'Calibri', size: 18, bold: true, color: NAVY })], spacing: { before: 60, after: 30 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: (it.escala || []).join('   ·   '), font: 'Calibri', size: 16 })], spacing: { after: 40 } }));
    }
    if (c.design_star) {
      inner.push(new Paragraph({ children: [new TextRun({ text: '★ Design Star peer award', font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { before: 100, after: 30 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: c.design_star.instrucciones, font: 'Calibri', size: 16 })], spacing: { after: 30 } }));
      inner.push(new Paragraph({ children: [new TextRun({ text: 'Ejemplo: ' + c.design_star.ejemplo, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 40 } }));
    }
  }
  else {
    // Fallback — print description only
    if (apDoc.descripcion) inner.push(new Paragraph({ children: [new TextRun({ text: apDoc.descripcion, font: 'Calibri', size: 18 })], spacing: { after: 40 } }));
    if (apDoc.extension_aproximada) inner.push(new Paragraph({ children: [new TextRun({ text: 'Extensión: ' + apDoc.extension_aproximada, font: 'Calibri', size: 16, italics: true, color: GREY })], spacing: { after: 40 } }));
  }

  out.push(wrap(inner));
  return out;
};

// Sutil activity footer — una sola línea en gris pequeño, labels en cursiva semi-bold
const activityFooter = (f) => {
  if (!f) return null;
  const sep = '  ·  ';
  const parts = [
    { label: 'Ambiente', value: f.ambiente },
    { label: 'Estrategia', value: f.estrategia },
    { label: 'Técnica', value: f.tecnica },
    { label: 'Materiales', value: f.materiales },
    { label: 'Material de apoyo', value: f.material_apoyo },
    { label: 'Duración', value: f.duracion_horas },
  ];
  const runs = [];
  parts.forEach((p, i) => {
    if (i > 0) runs.push(new TextRun({ text: sep, font: 'Calibri', size: 14, color: GREY }));
    runs.push(new TextRun({ text: p.label + ': ', font: 'Calibri', size: 14, color: GREY, italics: true, bold: true }));
    runs.push(new TextRun({ text: String(p.value ?? '—'), font: 'Calibri', size: 14, color: GREY, italics: true }));
  });
  return new Paragraph({
    children: runs,
    spacing: { before: 60, after: 160 },
    border: { top: { style: BorderStyle.SINGLE, color: 'D9D9D9', size: 4, space: 4 } },
  });
};

const callout = (label, body) => {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        children: [
          new Paragraph({ children: [new TextRun({ text: label, font: 'Calibri', size: 18, bold: true, color: ORANGE })], spacing: { after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: body, font: 'Calibri', size: 18, italics: true, color: NAVY })], spacing: { after: 0 } })
        ],
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: ACCENT, color: 'auto' },
        margins: { top: 100, bottom: 100, left: 200, right: 200 },
        borders: {
          left: { style: BorderStyle.SINGLE, color: ORANGE, size: 24 },
          top: { style: BorderStyle.NONE, size: 0 },
          right: { style: BorderStyle.NONE, size: 0 },
          bottom: { style: BorderStyle.NONE, size: 0 },
        }
      })]
    })]
  });
};

// ============================================================
// DOC 1: pm-3-5-review.docx — Final Mission
// ============================================================
function buildPM35Doc() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-3-5.json'), 'utf8'));
  const children = [];

  // Cover
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 0 },
    children: [new TextRun({ text: 'PM-3.5 — FINAL MISSION', font: 'Calibri', size: 44, bold: true, color: NAVY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: 'The Integrative Task — Transferencia ABP', font: 'Calibri', size: 26, italics: true, color: ORANGE })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 240 },
    children: [new TextRun({ text: `${d.guide.guia_nombre_esp} (${d.guide.guia_nombre_espanol}) · Guide ${d.guide.guia_numero} · CEFR ${d.guide.cefr_level} · ${d.programa.nombre} (${d.programa.codigo})`, font: 'Calibri', size: 18, color: GREY })],
  }));

  // Identidad
  children.push(H2('Identidad del documento'));
  children.push(kv('PM Code', d.pm_id));
  children.push(kv('Version', d.pm_version));
  children.push(kv('Run', d.run_id));
  children.push(kv('Subfase SENA', d.subfase_sena));
  children.push(kv('Ubicación en la guía', d.ubicacion_en_guia));
  children.push(kv('Genera evidencia formal GFPI-F-134', String(d.genera_evidencia_formal_gfpi_f134)));
  children.push(kv('Tipo evidencia SENA (no sumativa)', d.tipo_evidencia_sena_no_sumativa.join(' + ')));

  // Canon 55
  children.push(H3('Puntos canon 55'));
  children.push(kv('Misión Final = pts canon', d.puntos_canon_55.puntos_misión_final));
  children.push(note(d.puntos_canon_55.nota));

  // Arquetipo
  children.push(H2('Arquetipo elegido'));
  children.push(kv('Arquetipo primario', d.arquetipo_elegido.primario));
  children.push(kv('Combinado con', d.arquetipo_elegido.combinado_con));
  children.push(P(d.arquetipo_elegido.justificación_pedagógica, { italics: true, color: GREY }));

  // Universo
  children.push(H2('Universo narrativo'));
  children.push(kv('Estudio', d.universo_narrativo.estudio));
  children.push(H4('Personajes de referencia'));
  for (const [k, v] of Object.entries(d.universo_narrativo.personajes_de_referencia)) {
    children.push(bullet(`${k}: ${v}`));
  }
  children.push(H4('Escenario familiar'));
  children.push(P(d.universo_narrativo.escenario_familiar));

  // 5 sub-fases
  children.push(H2('Estructura ABP — 5 sub-fases'));
  for (const [k, sf] of Object.entries(d.abp_5_subfases)) {
    children.push(H3(`${sf.nombre}`));
    children.push(kv('Ubicación temporal', sf.ubicación_temporal));
    children.push(kv('Responsable', sf.responsable_aprendiz));
    children.push(kv('Demanda cognitiva (Bloom)', sf.demanda_cognitiva_bloom));
    children.push(P(sf.actividad_central));
    if (sf.producto_intermedio) children.push(kv('Producto intermedio', sf.producto_intermedio));
    if (sf.producto_final_artefacto) children.push(kv('Producto final', sf.producto_final_artefacto));
    if (sf.producto_consecuente_de_la_presentacion) children.push(kv('Producto consecuente', sf.producto_consecuente_de_la_presentacion));
    if (sf.producto_no_evidencia_formal) children.push(kv('Producto (no evidencia formal)', sf.producto_no_evidencia_formal));
    if (sf.advertencia_critica) children.push(callout('⚠️ ADVERTENCIA CRÍTICA', sf.advertencia_critica));
    const ft = activityFooter(sf.activity_footer);
    if (ft) children.push(ft);
  }

  // ============ DOC 1 - MISSION BRIEF ============
  children.push(H1('Documento 1 — Mission Brief (para el aprendiz)'));
  const d1 = d.documento_1_mission_brief;
  children.push(P(d1.titulo, { bold: true, size: 26, color: NAVY }));
  children.push(note(d1.header_bilingual));

  children.push(H3(d1.the_mission.headline_en));
  children.push(P(d1.the_mission.scenario_familiar_en));
  children.push(note(d1.the_mission.scenario_familiar_es_si_a11));
  children.push(P(d1.the_mission.your_role_en, { bold: true, color: NAVY }));
  children.push(P(d1.the_mission.your_audience_en, { bold: true, color: NAVY }));

  children.push(H3('THE TEAM AND ROLES'));
  children.push(kv('Modelo individual (default)', d1.the_team_and_roles.modelo_individual_default));
  children.push(kv('Alternativa dúo', d1.the_team_and_roles.modelo_alternativo_dúo_si_grupo_grande));
  children.push(kv('Rol instructor en S8', d1.the_team_and_roles.rol_instructor_en_s8));

  children.push(H3('THE BRIEFING'));
  children.push(P(d1.the_briefing.que_se_espera_en, { bold: true }));
  for (const item of d1.the_briefing.lista_expectativas_bilingue) children.push(bullet(item));

  children.push(H3('THE DELIVERABLE'));
  children.push(P(d1.the_deliverable.headline_en, { bold: true, color: ORANGE }));
  children.push(kv('Format options', d1.the_deliverable.format_options_en));
  children.push(H4('Obligatory content'));
  for (const item of d1.the_deliverable.obligatory_content_en) children.push(bullet(item));
  children.push(callout('EXAMPLE LABEL (model only)', d1.the_deliverable.ejemplo_de_etiqueta_modelo));
  children.push(H4('Obligaciones lingüísticas A1.1'));
  for (const item of d1.the_deliverable.obligaciones_lingüísticas_a11) children.push(bullet(item));
  children.push(kv('Entrega formal', d1.the_deliverable.entrega_formal));

  children.push(H3('THE RULES'));
  children.push(P(d1.the_rules.headline_en, { bold: true }));
  children.push(H4('Tiempos'));
  for (const item of d1.the_rules.tiempos) children.push(bullet(item));
  children.push(H4('Restricciones'));
  for (const item of d1.the_rules.restricciones) children.push(bullet(item));
  children.push(H4('Criterios de éxito'));
  for (const item of d1.the_rules.criterios_de_exito_en) children.push(bullet(item));

  children.push(H3('YOUR TOOLKIT'));
  children.push(P(d1.your_toolkit.headline_en, { bold: true }));
  children.push(kv('Vocabulario 20 términos canon', d1.your_toolkit.vocabulary_20_terms_canon));
  children.push(kv('Vocabulario extensión', d1.your_toolkit.vocabulario_extension_diseño));
  children.push(H4('Grammar A1.1 obligatorio'));
  for (const item of d1.your_toolkit.grammar_a11_obligatorio) children.push(bullet(item));
  children.push(H4('Language Functions de la guía'));
  for (const item of d1.your_toolkit.language_functions_de_la_guía) children.push(bullet(item));
  children.push(H4('Chunks funcionales pretextualizados'));
  for (const item of d1.your_toolkit.chunks_funcionales_pretextualizados) children.push(bullet(item));

  children.push(H3('Micro-Cápsulas Visuales'));
  for (const c of d1.micro_capsulas_visuales) children.push(callout('💡 TIP', c.replace(/^>\s*/, '').replace(/\*+/g, '')));

  // ============ DOC 2 - OBSERVATION CHECKLIST ============
  children.push(H1('Documento 2 — Observation Checklist (Desempeño Oral)'));
  const d2 = d.documento_2_observation_checklist;
  children.push(P(d2.titulo, { bold: true, size: 26, color: NAVY }));
  children.push(note(d2.header_bilingual));
  children.push(H4('Instrucciones para el instructor'));
  for (const item of d2.instrucciones_para_instructor) children.push(bullet(item));

  // Tabla de criterios
  children.push(H3('Criterios (5)'));
  for (const c of d2.criterios) {
    children.push(H4(`Criterio ${c.n}`));
    children.push(kv('ES', c.criterio_es));
    children.push(kv('EN', c.criterio_en));
    const tbl = new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [headerCell('Nivel', 1800), headerCell('Descriptor', CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('2 pts', 1800, { bold: true, fill: LIGHT }), cell(c.rubrica['2_pts'], CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('1 pt', 1800, { bold: true, fill: LIGHT }), cell(c.rubrica['1_pt'], CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('0 pts', 1800, { bold: true, fill: LIGHT }), cell(c.rubrica['0_pts'], CONTENT_W - 1800)] }),
      ]
    });
    children.push(tbl);
  }
  children.push(P(d2.tabla_calificacion_individual.totales, { bold: true, color: ORANGE }));

  // ============ DOC 3 - PRODUCT RUBRIC ============
  children.push(H1('Documento 3 — Product Rubric (Mood Board)'));
  const d3 = d.documento_3_product_rubric;
  children.push(P(d3.titulo, { bold: true, size: 26, color: NAVY }));
  children.push(note(d3.header_bilingual));
  children.push(H4('Instrucciones para el instructor'));
  for (const item of d3.instrucciones_para_instructor) children.push(bullet(item));

  for (const c of d3.criterios) {
    children.push(H4(`Criterio ${c.n}`));
    children.push(kv('ES', c.criterio_es));
    children.push(kv('EN', c.criterio_en));
    const tbl = new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [headerCell('Nivel', 1800), headerCell('Descriptor', CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('Excelente (4)', 1800, { bold: true, fill: LIGHT }), cell(c.niveles.excelente_4, CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('Adecuado (3)', 1800, { bold: true, fill: LIGHT }), cell(c.niveles.adecuado_3, CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('En desarrollo (2)', 1800, { bold: true, fill: LIGHT }), cell(c.niveles.en_desarrollo_2, CONTENT_W - 1800)] }),
        new TableRow({ children: [cell('Inicial (1)', 1800, { bold: true, fill: LIGHT }), cell(c.niveles.inicial_1, CONTENT_W - 1800)] }),
      ]
    });
    children.push(tbl);
  }
  children.push(P(d3.tabla_calificacion_individual.totales, { bold: true, color: ORANGE }));
  children.push(H4('Cálculo canon 55'));
  children.push(kv('Fórmula', d3.calculo_canon_55.formula));
  children.push(kv('Ejemplo', d3.calculo_canon_55.ejemplo));

  // Self-Reflection
  children.push(H1('Ficha Self-Reflection (Sub-fase 5)'));
  const fa = d.ficha_autoevaluacion_subfase5;
  children.push(P(fa.titulo, { bold: true, size: 24, color: NAVY }));
  children.push(note(fa.instrucciones_aprendiz));
  for (const it of fa.items_a11_emoji_scale) {
    children.push(P('Q: ' + it.q, { bold: true }));
    children.push(P('Scale: ' + it.scale.join(' | ')));
  }
  children.push(H4('Design Star peer evaluation'));
  children.push(kv('Instrucciones', fa.design_star_peer_evaluation.instrucciones));
  children.push(kv('Ejemplo modelo', fa.design_star_peer_evaluation.ejemplo_modelo));

  // Logística
  children.push(H1('Logística de la Misión Final'));
  const lg = d.logistics_box_misión_final;
  children.push(kv('Duración total', lg.duracion_total_actividad_abp));
  children.push(H3('Ambientes físicos requeridos'));
  for (const a of lg.ambientes_fisicos_requeridos) children.push(bullet(a));
  children.push(H3('Materiales obligatorios del aprendiz'));
  for (const a of lg.materiales_obligatorios_aprendiz) children.push(bullet(a));
  children.push(H3('Rol del instructor durante ABP'));
  for (const a of lg.rol_instructor_durante_abp) children.push(bullet(a));
  children.push(H3('Plan B — Alternativas'));
  for (const a of lg.plan_b_alternativas) children.push(bullet(a));

  // Alineación curricular
  children.push(H1('Alineación curricular'));
  children.push(kv('RAP', d.alineación_curricular.rap));
  children.push(H3('Alineación E1-E6'));
  for (const e of d.alineación_curricular.alineación_evidencias_e1_a_e6) children.push(bullet(e));
  children.push(P(d.alineación_curricular.transferencia_demostrada, { italics: true, color: GREY }));

  // Validation
  children.push(H1('Validation Checks (12)'));
  for (const [k, v] of Object.entries(d.validation_checks)) {
    children.push(Runs([
      { text: '✓ ', bold: true, color: ORANGE },
      { text: k.replace(/_/g, ' ') + ': ', bold: true, color: NAVY },
      { text: v }
    ]));
  }

  return new Document({
    creator: 'FPI CD Engine v2.5.1',
    title: 'PM-3.5 Final Mission — Review',
    description: 'MGV-2026-04-20 G1 The Visual Communicator — Final Mission ABP',
    styles: {
      default: { document: { run: { font: 'Calibri' } } },
    },
    sections: [{
      properties: {
        page: {
          size: { orientation: PageOrientation.PORTRAIT, width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 }
        }
      },
      footers: standardFooter('PM-3.5 Final Mission'),
      children
    }]
  });
}

// ============================================================
// DOC 2: pm-3-6-review.docx — GFPI-F-135 Learning Guide V02
// ============================================================
function buildPM36Doc() {
  const d = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-3-6.json'), 'utf8'));
  const apendicesDict = d.apendices_embebidos || {};
  const children = [];

  // Cover
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 0 },
    children: [new TextRun({ text: 'GFPI-F-135 V02', font: 'Calibri', size: 36, bold: true, color: ORANGE })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: 'GUÍA DE APRENDIZAJE DEL APRENDIZ', font: 'Calibri', size: 28, bold: true, color: NAVY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: d.seccion_1_identificacion.english_learning_guide_n, font: 'Calibri', size: 22, italics: true, color: NAVY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 240 },
    children: [new TextRun({ text: `Generado desde Playbook MGV-2026-04-20 · Tono: 2ª persona aprendiz · CEFR A1.1`, font: 'Calibri', size: 16, color: GREY })],
  }));

  // ===== Sección 1 — Identificación =====
  children.push(H1('1. Identificación de la Guía de Aprendizaje'));
  const s1 = d.seccion_1_identificacion;
  children.push(P(s1.titulo_oficial, { bold: true, size: 18, color: GREY }));

  children.push(H3('1.1 Datos del Programa'));
  for (const [k, v] of Object.entries(s1.datos_programa)) children.push(kv(k.replace(/_/g, ' '), String(v)));

  children.push(H3('1.2 Datos de la Guía'));
  for (const [k, v] of Object.entries(s1.datos_guia)) children.push(kv(k.replace(/_/g, ' '), String(v)));

  children.push(H3('1.3 Competencia y RAP'));
  for (const [k, v] of Object.entries(s1.datos_competencia_y_rap)) children.push(kv(k.replace(/_/g, ' '), String(v)));

  children.push(kv('Línea tecnológica', s1.linea_tecnologica));
  children.push(kv('Red tecnológica', s1.red_tecnologica));
  children.push(kv('Modalidad', s1.modalidad));

  // ===== Sección 2 — Presentación =====
  children.push(H1('2. Presentation — Welcome to Pixel & Ink Studio'));
  const s2 = d.seccion_2_presentacion;
  children.push(H3('What you will learn'));
  children.push(P(s2.que_aprenderas_en));
  children.push(note(s2.que_aprenderas_es_supervivencia));

  children.push(H3('What it will help you do'));
  for (const item of s2.para_que_te_servira) children.push(bullet(item));

  children.push(H3('Your narrative universe'));
  children.push(kv('Your studio', s2.universo_narrativo_aprendiz.tu_estudio));
  children.push(kv('Your role', s2.universo_narrativo_aprendiz.tu_rol));
  children.push(H4('Your team'));
  for (const item of s2.universo_narrativo_aprendiz.tu_equipo) children.push(bullet(item));

  children.push(callout('🎯 PROMESA PEDAGÓGICA', s2.promesa_pedagógica));

  // ===== Sección 3 — Actividades =====
  children.push(H1('3. Learning Activities'));
  const s3 = d.seccion_3_actividades_aprendizaje;

  // 3.1
  const sub31 = s3.subseccion_3_1_reflexion_inicial_s1;
  children.push(H2(sub31.titulo_aprendiz));
  children.push(note(`Fuente: ${sub31.fuente_pm_3_2} · Duración total: ${sub31.duracion_total_min} min`));
  for (const a of sub31.actividades) renderActivity(children, a, apendicesDict);

  // 3.2
  const sub32 = s3.subseccion_3_2_contextualizacion_s1;
  children.push(H2(sub32.titulo_aprendiz));
  children.push(note(`Fuente: ${sub32.fuente_pm_3_2} · Duración total: ${sub32.duracion_total_min} min`));
  for (const a of sub32.actividades) renderActivity(children, a, apendicesDict);

  // 3.3 (apropiación) — itera por sesión
  const sub33 = s3.subseccion_3_3_apropiacion_s2_a_s5;
  children.push(H2(sub33.titulo_aprendiz));
  children.push(note(`Fuente: ${sub33.fuente_pm_3_2} · Duración total: ${sub33.duracion_total_min} min`));
  children.push(callout('📌 NOTA EVIDENCIAS', sub33.nota_evidencias_aprendiz));

  for (const sk of ['sesion_2_reading_vocabulary', 'sesion_3_writing_grammar', 'sesion_4_listening_speaking', 'sesion_5_language_functions']) {
    const ses = sub33[sk];
    children.push(H3(ses.titulo));
    children.push(note(`Fuente: ${ses.fuente_pm_3_2} · Duración: ${ses.duracion_min} min`));
    for (const a of ses.actividades_principales) renderActivity(children, a, apendicesDict);
  }

  // 3.3.b consolidación
  const sub33b = s3.subseccion_3_3b_evaluacion_consolidacion_s6;
  children.push(H2(sub33b.titulo_aprendiz));
  children.push(note(`Fuente: ${sub33b.fuente_pm_3_2} · Duración: ${sub33b.duracion_min} min`));
  children.push(callout('📌 NOTA APRENDIZ', sub33b.nota_aprendiz));
  for (const a of sub33b.actividades) renderActivity(children, a, apendicesDict);

  // 3.4
  const sub34 = s3.subseccion_3_4_transferencia_s7_s8;
  children.push(H2(sub34.titulo_aprendiz));
  children.push(note(`Fuente: ${sub34.fuente_pm_3_5} · Duración total: ${sub34.duracion_total_min} min`));
  children.push(callout('🚨 ADVERTENCIA APRENDIZ', sub34.advertencia_aprendiz));
  for (const a of sub34.actividades) renderActivity(children, a, apendicesDict);
  children.push(H4('Evaluación Misión Final — Total'));
  for (const [k, v] of Object.entries(sub34.evaluacion_misión_final_total)) children.push(kv(k.replace(/_/g, ' '), v));

  // ===== Sección 4 — Evidencias =====
  children.push(H1('4. Your 6 Pieces of Evidence'));
  const s4 = d.seccion_4_planteamiento_evidencias;
  children.push(P(s4.introduccion, { italics: true }));
  children.push(H3('Evidencias formales E1-E6'));
  for (const e of s4.evidencias) {
    children.push(H4(`${e.codigo} — ${e.nombre_aprendiz}`));
    children.push(kv('What it is', e.que_es));
    children.push(kv('When generated', e.cuando_se_genera));
    children.push(kv('How evaluated', e.como_se_evalua));
    children.push(kv('Score (canon)', e.puntaje_canon));
    children.push(kv('SENA type', e.tipo_sena));
  }
  children.push(H3('Evidencia complementaria (no formal)'));
  for (const [k, v] of Object.entries(s4.evidencia_complementaria_no_formal)) children.push(kv(k.replace(/_/g, ' '), v));

  // Tabla resumen canon 55
  children.push(H3('Tabla resumen — Canon 55 pts'));
  const tr = s4.tabla_resumen_canon_55;
  const headerWidths = [3000, 1800, 1200, 2700, 1380];
  const tbl = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    rows: [
      new TableRow({ children: tr.encabezado.map((h, i) => headerCell(h, headerWidths[i])) }),
      ...tr.filas.map(row => new TableRow({
        children: row.map((c, i) => cell(String(c), headerWidths[i], { bold: row[0] === 'TOTAL', fill: row[0] === 'TOTAL' ? ACCENT : undefined }))
      }))
    ]
  });
  children.push(tbl);

  // ===== Sección 5 — Glosario =====
  children.push(H1('5. Glossary of Key Terms (20 Toolbelt Words)'));
  const s5 = d.seccion_5_glosario;
  children.push(P(s5.introduccion, { italics: true }));
  for (const cat of s5.categorias) {
    children.push(H3(cat.categoria));
    const gtbl = new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          headerCell('#', 600),
          headerCell('Term', 1500),
          headerCell('Español', 1800),
          headerCell('Definition (EN)', 4000),
          headerCell('Example (EN)', CONTENT_W - 600 - 1500 - 1800 - 4000)
        ] }),
        ...cat.terminos.map(t => new TableRow({
          children: [
            cell(String(t.n), 600, { bold: true, fill: LIGHT }),
            cell(t.term, 1500, { bold: true }),
            cell(t.espanol, 1800, { italics: true, color: GREY }),
            cell(t.definition_en, 4000),
            cell(t.ejemplo_en, CONTENT_W - 600 - 1500 - 1800 - 4000, { italics: true })
          ]
        }))
      ]
    });
    children.push(gtbl);
  }

  // ===== Sección 6 — Referencias =====
  children.push(H1('6. References (Suggested Resources)'));
  const s6 = d.seccion_6_referentes_bibliograficos;
  children.push(H3('Fuentes curadas (PM-1.2)'));
  for (const f of s6.fuentes_curadas_pm12) {
    children.push(H4(f.titulo));
    children.push(kv('Tipo', f.tipo));
    children.push(kv('Fuente', f.fuente));
    children.push(kv('Uso en guía', f.uso_en_guia));
  }
  children.push(H3('Recursos adicionales recomendados (A1.1)'));
  for (const r of s6.recursos_adicionales_recomendados_a11) children.push(bullet(r));
  children.push(note(s6.nota));

  // ===== Sección 7 — Control documento =====
  children.push(H1('7. Control del Documento'));
  const s7 = d.seccion_7_control_documento;
  const cdW = [3500, 2500, 2500, CONTENT_W - 3500 - 2500 - 2500];
  const cdTbl = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    rows: [
      new TableRow({ children: s7.tabla.encabezado.map((h, i) => headerCell(h, cdW[i])) }),
      ...s7.tabla.filas.map(row => new TableRow({
        children: row.map((c, i) => cell(String(c), cdW[i]))
      }))
    ]
  });
  children.push(cdTbl);

  // ===== Sección 8 — Control cambios =====
  children.push(H1('8. Control de Cambios'));
  const s8 = d.seccion_8_control_cambios;
  const ccW = [2500, 1800, 2200, 1500, CONTENT_W - 2500 - 1800 - 2200 - 1500];
  const ccTbl = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    rows: [
      new TableRow({ children: s8.tabla.encabezado.map((h, i) => headerCell(h, ccW[i])) }),
      ...s8.tabla.filas.map(row => new TableRow({
        children: row.map((c, i) => cell(String(c), ccW[i]))
      }))
    ]
  });
  children.push(ccTbl);

  // Apéndices (índice)
  children.push(H1('Apéndices Embebidos (Índice)'));
  const ap = d.apendices_embebidos;
  for (const [k, a] of Object.entries(ap)) {
    children.push(H3(a.titulo));
    if (a.fuente_pm_2_3) children.push(kv('Fuente', a.fuente_pm_2_3));
    if (a.fuente_pm_2_4) children.push(kv('Fuente', a.fuente_pm_2_4));
    if (a.fuente_pm_2_5) children.push(kv('Fuente', a.fuente_pm_2_5));
    if (a.fuente_pm_2_6) children.push(kv('Fuente', a.fuente_pm_2_6));
    if (a.fuente_pm_3_5) children.push(kv('Fuente', a.fuente_pm_3_5));
    if (a.descripcion) children.push(kv('Descripción', a.descripcion));
    if (a.extension_aproximada) children.push(kv('Extensión aprox.', a.extension_aproximada));
  }

  // Validation checks
  children.push(H1('Validation Checks (14)'));
  for (const [k, v] of Object.entries(d.validation_checks)) {
    children.push(Runs([
      { text: '✓ ', bold: true, color: ORANGE },
      { text: k.replace(/_/g, ' ') + ': ', bold: true, color: NAVY },
      { text: v }
    ]));
  }

  return new Document({
    creator: 'FPI CD Engine v2.5.1',
    title: 'PM-3.6 GFPI-F-135 V02 — Review',
    description: 'MGV-2026-04-20 G1 The Visual Communicator — Learning Guide V02',
    styles: { default: { document: { run: { font: 'Calibri' } } } },
    sections: [{
      properties: {
        page: {
          size: { orientation: PageOrientation.PORTRAIT, width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 }
        }
      },
      footers: standardFooter('GFPI-F-135 V02 — The Visual Communicator'),
      children
    }]
  });
}

function renderActivity(children, a, apendicesDict) {
  children.push(H4(`${a.actividad_id} — ${a.nombre_aprendiz}`));
  if (a.etiquetas_dimension && a.etiquetas_dimension.length) {
    const tags = a.etiquetas_dimension.join(' ');
    children.push(P(tags, { bold: true, color: ORANGE, size: 18 }));
  }
  children.push(P(a.instruccion_2pers_en));
  if (a.instruccion_supervivencia_es) children.push(note(a.instruccion_supervivencia_es));
  const fields = ['tiempo_min', 'agrupacion', 'ubicacion_temporal', 'producto_intermedio', 'evaluacion_formativa', 'advertencia'];
  for (const f of fields) if (a[f]) children.push(kv(f.replace(/_/g, ' '), String(a[f])));
  if (a.materiales) children.push(kv('Materiales', a.materiales.join(' · ')));
  if (a.texto_embebido) children.push(note(a.texto_embebido));
  if (a.audio_script_embebido) children.push(note(a.audio_script_embebido));
  if (a.bloque_entregable) {
    const be = a.bloque_entregable;
    children.push(callout(`📋 EVIDENCIA ${be.evidencia_codigo} — ${be.evidencia_nombre}`,
      `Producto: ${be.producto_a_entregar}\nFormato: ${be.formato}\nCriterio mínimo: ${be.extension_o_criterio_minimo}\nEntrega: ${be.entrega}\nPuntaje: ${be.puntaje}`));
  }
  // Inline appendices referenced by this activity
  if (apendicesDict && Array.isArray(a.apendices_referenciados) && a.apendices_referenciados.length) {
    for (const apKey of a.apendices_referenciados) {
      const apDoc = apendicesDict[apKey];
      if (apDoc) {
        const blocks = renderInlineAppendix(apKey, apDoc);
        for (const b of blocks) children.push(b);
      }
    }
  }
  const ft = activityFooter(a.activity_footer);
  if (ft) children.push(ft);
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  const targets = [
    { name: 'pm-3-5-review.docx', build: buildPM35Doc },
    { name: 'pm-3-6-review.docx', build: buildPM36Doc },
  ];
  for (const t of targets) {
    try {
      const doc = t.build();
      const buf = await Packer.toBuffer(doc);
      const out = path.join(RUN_DIR, t.name);
      fs.writeFileSync(out, buf);
      const sz = fs.statSync(out).size;
      console.log(`[ok] ${t.name} (${(sz/1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`[fail] ${t.name}: ${e.message}`);
      console.error(e.stack);
    }
  }
  console.log('[done] DOCX review PM-3.5 + PM-3.6');
}

main().catch(e => { console.error(e); process.exit(1); });
