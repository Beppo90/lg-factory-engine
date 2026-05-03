#!/usr/bin/env node
/**
 * Wave E.preview · pm-3-6-PREVIEW.docx IMARPOR-V2
 * ===================================================
 *
 * Preview con muestra de las 5 secciones canon SENA v3.4:
 * - Sec 1: COMPLETA (8 campos heredados · solo ESP · placeholder logo central)
 * - Sec 2: PRESENTACIÓN preview (1 párrafo ESP + 1 párrafo EN)
 * - Sec 3: SAMPLE (3.1 con 1 act · 3.2 con 1 act · 3.3 RAP 1 con 2 acts · 3.4 con 1 act)
 * - Sec 4: SAMPLE TABLA (4 filas: RAP 1 sample con 3 acts)
 * - Sec 5: SAMPLE GLOSARIO (8 entradas variadas)
 * - Footer: "GFPI-F-135 V04"
 *
 * Output: pm-3-6-PREVIEW.docx para validación visual antes de Wave E completo.
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat,
        TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, PageBreak } = require('/tmp/npm-docx/node_modules/docx');
const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2';

// === LOAD INPUTS ===
const pm0ctx = JSON.parse(fs.readFileSync(`${RUN_DIR}/pm-0-context.json`, 'utf8'));
const pm12 = JSON.parse(fs.readFileSync(`${RUN_DIR}/pm-1-2.json`, 'utf8'));
const matriz = JSON.parse(fs.readFileSync(`${RUN_DIR}/pm-0-0-matriz-alineada.json`, 'utf8'));
const pm211 = JSON.parse(fs.readFileSync(`${RUN_DIR}/pm-2-11.json`, 'utf8'));
const glosario = JSON.parse(fs.readFileSync(`${RUN_DIR}/glosario-imarpor-v2.json`, 'utf8'));

// 30 cards
const PM_FILES = ['pm-2-1','pm-2-2','pm-2-3','pm-2-4','pm-2-5','pm-2-6','pm-2-8','pm-2-9','pm-2-10','pm-3-5','pm-4-2'];
let allCards = [];
for (const pm of PM_FILES) {
  const j = JSON.parse(fs.readFileSync(`${RUN_DIR}/${pm}.json`, 'utf8'));
  let cards = j.activity_cards || j.actividades || [];
  if (cards.length === 0 && j.activity_card) cards = [j.activity_card];
  if (cards.length === 0) {
    for (const k of Object.keys(j)) {
      const v = j[k];
      if (Array.isArray(v) && v.length && typeof v[0]==='object' && (v[0].pm_id || v[0].session || v[0].tipo_bloque)) {
        cards = v;
        break;
      }
    }
  }
  for (const c of cards) {
    c._source_pm = pm;
    allCards.push(c);
  }
}
console.log(`Loaded ${allCards.length} cards`);

// === HELPERS ===
const pme = pm0ctx.programa_essentials;
const sector = pm0ctx.universe_grounding.anchor_sectorial;
const competencia = pme.competencia;
const raps = matriz.raps;

// Helpers para crear paragraphs estandarizados
const text = (str, opts = {}) => new TextRun({ text: str, ...opts });
const para = (children, opts = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts });
const heading = (str, level) => new Paragraph({
  heading: level,
  children: [new TextRun({ text: str, bold: true })],
  spacing: { before: 240, after: 120 },
});

// Format card narrativo canon Sergio v3.0/v3.2
function renderActivityNarrative(card, includeEvidence = true) {
  const num = card.numero_actividad || '?';
  const dim = (card.dimension || 'cognitiva').toLowerCase();
  const enun = card.enunciado || card.titulo || '?';
  // PRIORIDAD: descripcion_aprendiz (canon Sergio aprendiz-facing v3.5) → fallback a descripcion legacy
  const desc = card.descripcion_aprendiz || card.descripcion || '(descripción pendiente)';
  const ambiente = card.ambiente || 'Ambiente convencional';
  const estrategias = (card.estrategias_didacticas_activas || []).join(' + ') || '(no declarada)';
  const tecnicas = (card.tecnicas_didacticas || []).join(' + ') || '(no declarada)';
  const materiales = (card.materiales || []).join(', ') || '(heredar pm-3-2)';
  const matApoyo = (card.material_apoyo || []).map(m => {
    if (typeof m === 'object') return (m.descripcion || m.nombre || '') + (m.link ? ` · Link: ${m.link}` : '');
    return String(m);
  }).join('\n   ') || 'No aplica';
  const ev = card.evidencias;
  const dur = card.duracion_horas || card.duracion_h || '?';

  const blocks = [];

  // Header línea 1
  blocks.push(para([
    text(`${num}. Actividad ${dim}: `, { bold: true }),
    text(enun, { bold: true }),
  ], { spacing: { before: 200, after: 100 } }));

  // Descripción
  blocks.push(para([
    text('Descripción de la actividad: ', { bold: true }),
    text(desc),
  ], { spacing: { after: 80 }, alignment: AlignmentType.JUSTIFIED }));

  // Recursos preparados por el instructor (NEW · canon Sergio v3.5 · después de Descripción)
  const recursos = card.recursos_aprendiz || [];
  if (recursos.length > 0) {
    blocks.push(para([
      text('Recursos preparados por el instructor:', { bold: true }),
    ], { spacing: { after: 40 } }));
    for (const r of recursos) {
      blocks.push(para([
        text('   • ', { bold: false }),
        text(String(r)),
      ], { spacing: { after: 30 }, indent: { left: 240 } }));
    }
    blocks.push(para([], { spacing: { after: 60 } }));  // separator
  }

  blocks.push(para([
    text('Ambiente requerido: ', { bold: true }), text(ambiente),
  ], { spacing: { after: 60 } }));

  blocks.push(para([
    text('Estrategias didácticas activas: ', { bold: true }), text(estrategias),
  ], { spacing: { after: 60 } }));

  blocks.push(para([
    text('Técnica didáctica: ', { bold: true }), text(tecnicas),
  ], { spacing: { after: 60 } }));

  blocks.push(para([
    text('Materiales de formación: ', { bold: true }), text(materiales),
  ], { spacing: { after: 60 } }));

  // Plan C v3.5 · OMITIR Material de apoyo del docx aprendiz · recursos_aprendiz lo absorbe
  // (legacy material_apoyo sigue en JSON para Playbook PM-3.2 instructor downstream)

  if (includeEvidence) {
    if (ev && typeof ev === 'object' && ev.aplica) {
      blocks.push(para([text('Evidencias de aprendizaje:', { bold: true })], { spacing: { after: 30 } }));
      blocks.push(para([
        text('   Evidencia de ', { italics: true }),
        text(`${(ev.tipo || '').toLowerCase()}: `, { italics: true }),
        text(ev.nombre || '?'),
      ], { spacing: { after: 30 } }));
      blocks.push(para([
        text('   Técnica de evaluación: ', { italics: true }),
        text(ev.tecnica_evaluacion || '?'),
      ], { spacing: { after: 30 } }));
      blocks.push(para([
        text(`   Instrumento de evaluación No ${ev.instrumento_numero || '?'}: `, { italics: true }),
        text(ev.instrumento_tipo || '?'),
      ], { spacing: { after: 60 } }));
    } else {
      blocks.push(para([
        text('Evidencias de aprendizaje: ', { bold: true }),
        text('No aplica.'),
      ], { spacing: { after: 30 } }));
      blocks.push(para([
        text('Instrumentos de evaluación: ', { bold: true }),
        text('No aplica.'),
      ], { spacing: { after: 60 } }));
    }
  }

  blocks.push(para([
    text('Duración de la actividad: ', { bold: true }),
    text(`${dur} horas.`),
  ], { spacing: { after: 200 } }));

  return blocks;
}

// === BUILD DOCUMENT CHILDREN ===
const children = [];

// Watermark de PREVIEW
children.push(para([
  text('⚠️ DOCUMENTO PREVIEW · NO ES VERSIÓN FINAL ⚠️', {
    color: 'CC0000', bold: true, size: 28
  })
], { alignment: AlignmentType.CENTER, spacing: { after: 240 } }));

// === LOGO PLACEHOLDER + ENCABEZADO ===
children.push(para([
  text('[ LOGO SENA CENTRAL ]', { bold: true, color: '888888' })
], { alignment: AlignmentType.CENTER, spacing: { after: 120 } }));

children.push(para([
  text('PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL', { bold: true, size: 26 })
], { alignment: AlignmentType.CENTER, spacing: { after: 60 } }));

children.push(para([
  text('GUÍA DE APRENDIZAJE', { bold: true, size: 28 })
], { alignment: AlignmentType.CENTER, spacing: { after: 360 } }));

// === SECCIÓN 1 · IDENTIFICACIÓN ===
children.push(heading('1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE', HeadingLevel.HEADING_1));

const ident = [
  ['Denominación del Programa de Formación', pme.denominacion],
  ['Código del Programa de Formación', String(pme.codigo_sofia)],
  ['Nombre del Proyecto Formativo (si aplica)', 'No aplica'],
  ['Fase del Proyecto (si aplica)', 'No aplica'],
  ['Actividad de Proyecto Formativo (si aplica)', 'No aplica'],
  ['Competencia', competencia],
];

for (const [k, v] of ident) {
  children.push(para([
    text(`• ${k}: `, { bold: true }), text(String(v))
  ], { spacing: { after: 80 } }));
}

// RAPs como sub-listado · usar rap_titulo (campo canon matriz v1.3)
children.push(para([text('• Resultados de Aprendizaje:', { bold: true })], { spacing: { after: 40 } }));
for (let i = 0; i < raps.length; i++) {
  const r = raps[i];
  // rap_titulo viene como "RA1 RECONOCER..." o "RA 1 RECONOCER..." · limpiar prefijo redundante
  let enun = r.rap_titulo || r.enunciado_rap || r.enunciado || `(RAP ${r.rap_id})`;
  enun = enun.replace(/^RA\s*\d+\s+/, '').trim();
  children.push(para([
    text(`   – RAP ${i + 1}: `, { bold: true }),
    text(enun),
  ], { spacing: { after: 40 }, indent: { left: 360 } }));
}

children.push(para([
  text('• Duración de la Guía de Aprendizaje: ', { bold: true }),
  text(`${pme.duracion_horas} horas`),
], { spacing: { after: 360 } }));

// === SECCIÓN 2 · PRESENTACIÓN (preview · 1 párrafo ESP + 1 párrafo EN) ===
children.push(heading('2. PRESENTACIÓN', HeadingLevel.HEADING_1));

children.push(para([text('Versión en español:', { bold: true, italics: true })], { spacing: { after: 80 } }));
children.push(para([
  text(`Estimado Aprendiz, bienvenido a esta formación SENA en ${pme.denominacion}, que busca incentivar su interés por nuevos conocimientos y para alcanzar o mejorar tanto sus habilidades y destrezas demostradas como aquellas que pueden ser adquiridas. En desarrollo de la formación se presentan dos momentos en las actividades de aprendizaje: el trabajo directo y el trabajo independiente considerado como autoaprendizaje, desde el cual se ofrece material organizado, para que de la misma manera, sus actividades de aprendizaje y sus evidencias entregadas, sean sistemáticas, ordenadas y metódicas. Se invita a realizar un aprendizaje colaborativo y a consultar el integrador de recursos de información del SENA en https://biblioteca.sena.edu.co. Bienvenidos.`)
], { spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED }));

children.push(para([text('English version (adapted to maritime/portuario · banana cold chain sector):', { bold: true, italics: true })], { spacing: { after: 80 } }));
children.push(para([
  text(`Dear Learner, welcome to this SENA training program in Maritime and Port English · Banana Cold Chain Track, designed for junior reefer operators like Manuel Padilla working at Puerto Antioquia and operationalizing English on board reefer vessels such as the MV CARIBBEAN STAR. The training combines direct instruction and independent learning · with structured materials to organize your study time effectively. You are encouraged to engage in collaborative learning and to consult the SENA library system at https://biblioteca.sena.edu.co. Welcome aboard.`)
], { spacing: { after: 360 }, alignment: AlignmentType.JUSTIFIED }));

// === SECCIÓN 3 · SAMPLE: 3.1 + 3.2 + 3.3 RAP 1 (2 cards) + 3.4 sample ===
children.push(heading('3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE', HeadingLevel.HEADING_1));

children.push(para([
  text('Descripción de la(s) Actividad(es): ', { bold: true }),
  text(`Las actividades de aprendizaje son las acciones planeadas y estructuradas, de tal forma que los aprendices pueden lograr la apropiación de conocimientos, el desarrollo de sus habilidades y destrezas y alcanzar la competencia en ${competencia.toLowerCase()}. Las actividades que se proponen en esta guía de aprendizaje, están distribuidas entre actividades a desarrollar antes de aprender, mientras se aprende y después de aprender.`)
], { spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED }));

// 3.1 Reflexión inicial (1 card sample · sin Evidencias)
children.push(heading('3.1 Actividades de reflexión inicial', HeadingLevel.HEADING_2));
const card_3_1 = allCards.find(c => c._source_pm === 'pm-2-1' && c.numero_actividad === 1);
if (card_3_1) renderActivityNarrative(card_3_1, false).forEach(b => children.push(b));

// 3.2 Contextualización (1 card sample · sin Evidencias)
children.push(heading('3.2 Actividades de contextualización e identificación de conocimientos necesarios para el aprendizaje', HeadingLevel.HEADING_2));
const card_3_2 = allCards.find(c => c._source_pm === 'pm-2-2' && c.numero_actividad === 3);
if (card_3_2) renderActivityNarrative(card_3_2, false).forEach(b => children.push(b));

// 3.3 Apropiación
children.push(heading('3.3 Actividades de apropiación', HeadingLevel.HEADING_2));

// RAP 1 header + 2 cards de B1
children.push(para([
  text(`RAP 1: `, { bold: true, size: 24 }),
  text((raps[0].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim() || '(RA1)', { bold: true, size: 24 })
], { spacing: { before: 240, after: 120 }, shading: { fill: 'EEEEEE', type: ShadingType.CLEAR } }));

// 2 cards B1 (renumerar 1, 2)
const cards_b1 = allCards.filter(c => c.bloque_id_referencia === 'B1').sort((a,b) => parseInt(a.numero_actividad)-parseInt(b.numero_actividad));
let local_idx = 1;
for (const c of cards_b1.slice(0, 2)) {
  // Renumerar localmente para preview (POR RAP reset)
  const ccopy = {...c, numero_actividad: local_idx++};
  renderActivityNarrative(ccopy, true).forEach(b => children.push(b));
}

children.push(para([text('[... actividades restantes RAP 1 + RAP 2 + RAP 3 + RAP 4 omitidas en preview ...]', { italics: true, color: '888888' })], { alignment: AlignmentType.CENTER, spacing: { after: 240 } }));

// 3.4 Transferencia (1 card sample)
children.push(heading('3.4 Actividades de Transferencia del Conocimiento', HeadingLevel.HEADING_2));
const card_3_4 = allCards.find(c => c.bloque_id_referencia === 'BT' && c.numero_actividad === 32);
if (card_3_4) {
  const ccopy = {...card_3_4, numero_actividad: 1};
  renderActivityNarrative(ccopy, true).forEach(b => children.push(b));
}

// === SECCIÓN 4 · TABLA SAMPLE 4 filas (RAP 1 con 3 actividades) ===
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading('4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO', HeadingLevel.HEADING_1));

const cellPad = { top: 80, bottom: 80, left: 120, right: 120 };
const border = { style: BorderStyle.SINGLE, size: 6, color: '666666' };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: '39A900', type: ShadingType.CLEAR };  // Verde SENA
const rapShading = { fill: 'EEEEEE', type: ShadingType.CLEAR };

const colW = [1100, 1100, 2400, 2200, 1900, 1660];  // Total ~10360 DXA
const tableWidth = colW.reduce((a,b)=>a+b, 0);

const headerRow = new TableRow({
  tableHeader: true,
  children: [
    'Fase del proyecto formativo',
    'Actividad del proyecto formativo',
    'Actividad de Aprendizaje',
    'Evidencias de Aprendizaje',
    'Criterios de Evaluación',
    'Técnicas e Instrumentos de Evaluación',
  ].map((h, i) => new TableCell({
    width: { size: colW[i], type: WidthType.DXA },
    margins: cellPad,
    borders,
    shading: headerShading,
    children: [para([text(h, { bold: true, color: 'FFFFFF', size: 18 })])]
  })),
});

// RAP separator row (single cell across columns)
function rapSeparatorRow(rapIdx, rapEnunciado) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: colW[0], type: WidthType.DXA }, margins: cellPad, borders, shading: rapShading,
        children: [para([text('No aplica')])]
      }),
      new TableCell({
        width: { size: colW[1], type: WidthType.DXA }, margins: cellPad, borders, shading: rapShading,
        children: [para([text('No aplica')])]
      }),
      new TableCell({
        columnSpan: 4,
        width: { size: colW[2]+colW[3]+colW[4]+colW[5], type: WidthType.DXA }, margins: cellPad, borders, shading: rapShading,
        children: [para([text(`RAP ${rapIdx}: `, { bold: true }), text(rapEnunciado, { bold: true })])]
      }),
    ]
  });
}

// Activity row
function activityRow(card, localNum, instrCounter) {
  const dim = card.dimension || 'cognitiva';
  const enun = card.enunciado || '?';
  const ev = card.evidencias;
  const criterios = card.criterios_evaluacion || [];
  let evCell, critCell, instCell;

  if (ev && ev.aplica) {
    evCell = `Evidencia de ${(ev.tipo||'').toLowerCase()}: ${ev.nombre || '?'}`;
    instCell = `Técnica: ${ev.tecnica_evaluacion || '?'}\nInstrumento de Evaluación No ${instrCounter.value}: ${ev.instrumento_tipo || '?'}`;
    instrCounter.value++;
  } else {
    evCell = 'No aplica';
    instCell = 'No aplica';
  }
  critCell = criterios.join('\n') || '(criterio pending)';

  const actCell = `${localNum}. Actividad ${dim}.\n${enun}`;

  return new TableRow({
    children: [
      new TableCell({ width: { size: colW[0], type: WidthType.DXA }, margins: cellPad, borders, children: [para([text('No aplica')])] }),
      new TableCell({ width: { size: colW[1], type: WidthType.DXA }, margins: cellPad, borders, children: [para([text('No aplica')])] }),
      new TableCell({ width: { size: colW[2], type: WidthType.DXA }, margins: cellPad, borders, children: actCell.split('\n').map(s => para([text(s)])) }),
      new TableCell({ width: { size: colW[3], type: WidthType.DXA }, margins: cellPad, borders, children: [para([text(evCell)])] }),
      new TableCell({ width: { size: colW[4], type: WidthType.DXA }, margins: cellPad, borders, children: critCell.split('\n').map(s => para([text(s)])) }),
      new TableCell({ width: { size: colW[5], type: WidthType.DXA }, margins: cellPad, borders, children: instCell.split('\n').map(s => para([text(s)])) }),
    ]
  });
}

const tableRows = [headerRow];
const instrCounter = { value: 1 };

// Sample: RAP 1 (3 actividades) + RAP 2 (1 actividad)
tableRows.push(rapSeparatorRow(1, (raps[0].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim()));
let lnum = 1;
for (const c of cards_b1.slice(0, 3)) {
  tableRows.push(activityRow(c, lnum++, instrCounter));
}

tableRows.push(rapSeparatorRow(2, raps[1].enunciado_rap || raps[1].enunciado || ''));
const cards_b2 = allCards.filter(c => c.bloque_id_referencia === 'B2').sort((a,b) => parseInt(a.numero_actividad)-parseInt(b.numero_actividad));
lnum = 1;
for (const c of cards_b2.slice(0, 1)) {
  tableRows.push(activityRow(c, lnum++, instrCounter));
}

children.push(new Table({
  width: { size: tableWidth, type: WidthType.DXA },
  columnWidths: colW,
  rows: tableRows,
}));

children.push(para([text('[... filas restantes RAP 2 + RAP 3 + RAP 4 omitidas en preview ...]', { italics: true, color: '888888' })], { alignment: AlignmentType.CENTER, spacing: { before: 200, after: 360 } }));

// === SECCIÓN 5 · GLOSARIO SAMPLE (8 entradas) ===
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading('5. GLOSARIO BILINGÜE / BILINGUAL GLOSSARY', HeadingLevel.HEADING_1));

children.push(para([
  text('Este glosario reúne la terminología técnica del programa Inglés Marítimo y Portuario · Línea Banana/Cold Chain. Cada entrada incluye el término en inglés, su definición técnica, un ejemplo contextualizado en el universo del programa, y su equivalente en español.', { italics: true })
], { spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED }));

// Sample 8 entries variadas (diferentes categorías)
const sampleTerms = ['AIS', 'Affirmative', 'B/L', 'Captain', 'Cavendish', 'reefer plug', 'SMCP', 'tally clerk'];
const samplesGlos = sampleTerms.map(t => glosario.entries.find(e => e.english_term.toLowerCase() === t.toLowerCase())).filter(Boolean);

for (const e of samplesGlos) {
  children.push(para([
    text(e.english_term, { bold: true, size: 24 })
  ], { spacing: { before: 200, after: 60 } }));
  children.push(para([
    text('   English definition: ', { italics: true, bold: true }),
    text(e.english_definition),
  ], { spacing: { after: 40 }, indent: { left: 360 } }));
  children.push(para([
    text('   Example in context: ', { italics: true, bold: true }),
    text(e.example_in_context),
  ], { spacing: { after: 40 }, indent: { left: 360 } }));
  children.push(para([
    text('   Equivalente en español: ', { italics: true, bold: true }),
    text(e.equivalente_espanol),
  ], { spacing: { after: 120 }, indent: { left: 360 } }));
}

children.push(para([text(`[... ${glosario.entries.length - samplesGlos.length} entradas restantes omitidas en preview · total ${glosario.entries.length} entradas en versión final ...]`, { italics: true, color: '888888' })], { alignment: AlignmentType.CENTER, spacing: { before: 200, after: 240 } }));

// === BUILD DOCUMENT ===
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } }, // 11pt default
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: '0B2E45' },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: '39A900' },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 }, // US Letter
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } // 0.75 inch margins
      }
    },
    headers: {
      default: new Header({ children: [
        para([text('SERVICIO NACIONAL DE APRENDIZAJE SENA', { size: 16, color: '888888' })],
              { alignment: AlignmentType.CENTER })
      ]})
    },
    footers: {
      default: new Footer({ children: [
        para([
          text('GFPI-F-135 V04', { size: 16, color: '666666', bold: true }),
          text('\t'),
          text('Página ', { size: 16, color: '666666' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '666666' }),
          text(' de ', { size: 16, color: '666666' }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: '666666' }),
        ], { tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }] })
      ]})
    },
    children
  }]
});

// === SAVE ===
const outPath = `${RUN_DIR}/pm-3-6-PREVIEW.docx`;
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`\n✅ Preview generado: pm-3-6-PREVIEW.docx · ${sizeKB} KB`);
  console.log(`Path: ${outPath}`);
  console.log(`\nContenido del preview:`);
  console.log(`  - Sec 1: COMPLETA (8 campos heredados)`);
  console.log(`  - Sec 2: PRESENTACIÓN (1 párrafo ESP + 1 párrafo EN)`);
  console.log(`  - Sec 3: SAMPLE (3.1 + 3.2 + 3.3 RAP 1 con 2 acts + 3.4 con 1 act)`);
  console.log(`  - Sec 4: TABLA SAMPLE (4 filas: RAP 1 con 3 acts + RAP 2 con 1 act)`);
  console.log(`  - Sec 5: GLOSARIO SAMPLE (8 entradas variadas)`);
  console.log(`  - Footer: GFPI-F-135 V04 + página`);
});
