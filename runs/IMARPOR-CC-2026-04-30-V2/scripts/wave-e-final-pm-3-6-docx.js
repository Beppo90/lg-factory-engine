#!/usr/bin/env node
/**
 * Wave E FINAL · pm-3-6.docx IMARPOR-V2 NO TRUNCADO
 * ===================================================
 * Render canon v3.5 completo con TODAS las cards y entradas:
 * - 4 cards 3.1 Reflexión (B0 PM-2.1)
 * - 4 cards 3.2 Contextualización (B0 PM-2.2 · solo contextualización · no incluye PM-2.1)
 * - 21 cards 3.3 Apropiación (B1+B2+B3+B4 con headers RAP separadores · numeración POR RAP reset)
 * - 5 cards 3.4 Transferencia (BT)
 * - Tabla Sec 4 con TODAS las 21 actividades de 3.3 (instrumentos numerados ACUMULADO 1-N)
 * - Glosario Sec 5 con TODAS las 122 entradas
 * - Sin watermark PREVIEW · documento FINAL
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat,
        TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, PageBreak, ImageRun } = require('/tmp/npm-docx/node_modules/docx');
const fs = require('fs');

const RUN_DIR = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2';
const REPO_ROOT = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory';

// === LOAD INPUTS ===
const pm0ctx = JSON.parse(fs.readFileSync(`${RUN_DIR}/pm-0-context.json`, 'utf8'));
const matriz = JSON.parse(fs.readFileSync(`${RUN_DIR}/pm-0-0-matriz-alineada.json`, 'utf8'));
const glosario = JSON.parse(fs.readFileSync(`${RUN_DIR}/glosario-imarpor-v2.json`, 'utf8'));

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
        cards = v; break;
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
const competencia = pme.competencia;
const raps = matriz.raps;

const text = (str, opts = {}) => new TextRun({ text: str, ...opts });
const para = (children, opts = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts });
const heading = (str, level) => new Paragraph({
  heading: level,
  children: [new TextRun({ text: str, bold: true })],
  spacing: { before: 240, after: 120 },
});

const footerInfo = (label, value) => para([
  text(label, { italics: true, size: 18, color: '707070', bold: true }),
  text(value, { italics: true, size: 18, color: '707070' }),
], { spacing: { after: 30 } });

function renderActivityNarrative(card, includeEvidence = true) {
  const num = card.numero_actividad || '?';
  const dim = (card.dimension || 'cognitiva').toLowerCase();
  const enun = card.enunciado || card.titulo || '?';
  const desc_es = card.descripcion_aprendiz || card.descripcion || '(descripción pendiente)';
  const desc_en = card.descripcion_aprendiz_en || null;
  const recursos_es = card.recursos_aprendiz || [];
  const recursos_en = card.recursos_aprendiz_en || null;
  const ambiente = card.ambiente || 'Aula convencional';
  const estrategias = (card.estrategias_didacticas_activas || []).join(' + ') || '(no declarada)';
  const tecnicas = (card.tecnicas_didacticas || []).join(' + ') || '(no declarada)';
  const materiales_formacion_arr = card.materiales_formacion || card.materiales || [];
  const materiales_formacion = Array.isArray(materiales_formacion_arr) ? materiales_formacion_arr.join(' · ') : String(materiales_formacion_arr || '(no declarado)');
  const matApoyoArr = card.material_apoyo || [];
  const matApoyo = Array.isArray(matApoyoArr) ? matApoyoArr.map(m => {
    if (typeof m === 'object') return (m.descripcion || m.nombre || '') + (m.link ? ` · Link: ${m.link}` : '');
    return String(m);
  }).filter(Boolean).join('; ') : String(matApoyoArr || 'No aplica');
  const ev = card.evidencias;
  const dur = card.duracion_horas || card.duracion_h || '?';
  const has_en = desc_en !== null;

  const blocks = [];

  if (has_en) {
    blocks.push(para([
      text(`${num}. Activity (${dim}): `, { bold: true }),
      text(enun, { bold: true }),
    ], { spacing: { before: 200, after: 30 } }));
    blocks.push(para([
      text(`${num}. Actividad ${dim}: `, { bold: false, italics: true, size: 18, color: '707070' }),
      text(enun, { italics: true, size: 18, color: '707070' }),
    ], { spacing: { after: 100 } }));
  } else {
    blocks.push(para([
      text(`${num}. Actividad ${dim}: `, { bold: true }),
      text(enun, { bold: true }),
    ], { spacing: { before: 200, after: 100 } }));
  }

  if (has_en) {
    blocks.push(para([
      text('Activity description: ', { bold: true }),
      text(desc_en),
    ], { spacing: { after: 30 }, alignment: AlignmentType.JUSTIFIED }));
    blocks.push(para([
      text('Descripción de la actividad: ', { bold: false, italics: true, size: 18, color: '707070' }),
      text(desc_es, { italics: true, size: 18, color: '707070' }),
    ], { spacing: { after: 100 }, alignment: AlignmentType.JUSTIFIED }));
  } else {
    blocks.push(para([
      text('Descripción de la actividad: ', { bold: true }),
      text(desc_es),
    ], { spacing: { after: 100 }, alignment: AlignmentType.JUSTIFIED }));
  }

  if (recursos_es.length > 0) {
    if (has_en && recursos_en && recursos_en.length === recursos_es.length) {
      blocks.push(para([text('Resources prepared by the instructor:', { bold: true })], { spacing: { after: 40 } }));
      for (const r_en of recursos_en) {
        blocks.push(para([text('   • ', { bold: false }), text(String(r_en))], { spacing: { after: 20 }, indent: { left: 240 } }));
      }
      blocks.push(para([text('Recursos preparados por el instructor:', { italics: true, size: 18, color: '707070', bold: true })], { spacing: { before: 60, after: 30 } }));
      for (const r_es of recursos_es) {
        blocks.push(para([text('   • ', { italics: true, size: 18, color: '707070' }), text(String(r_es), { italics: true, size: 18, color: '707070' })], { spacing: { after: 20 }, indent: { left: 240 } }));
      }
    } else {
      blocks.push(para([text('Recursos preparados por el instructor:', { bold: true })], { spacing: { after: 40 } }));
      for (const r of recursos_es) {
        blocks.push(para([text('   • ', { bold: false }), text(String(r))], { spacing: { after: 20 }, indent: { left: 240 } }));
      }
    }
    blocks.push(para([], { spacing: { after: 100 } }));
  }

  blocks.push(footerInfo('Ambiente requerido: ', ambiente));
  blocks.push(footerInfo('Estrategias didácticas activas: ', estrategias));
  blocks.push(footerInfo('Técnica didáctica: ', tecnicas));
  blocks.push(footerInfo('Materiales de formación: ', materiales_formacion));
  blocks.push(footerInfo('Material de apoyo: ', matApoyo));

  if (includeEvidence) {
    if (ev && typeof ev === 'object' && ev.aplica) {
      blocks.push(para([text('Evidencias de aprendizaje:', { italics: true, size: 18, color: '707070', bold: true })], { spacing: { after: 20 } }));
      blocks.push(para([
        text(`   Evidencia de ${(ev.tipo || '').toLowerCase()}: `, { italics: true, size: 18, color: '707070' }),
        text(ev.nombre || '?', { italics: true, size: 18, color: '707070' }),
      ], { spacing: { after: 20 } }));
      blocks.push(para([text(`   Técnica de evaluación: ${ev.tecnica_evaluacion || '?'}`, { italics: true, size: 18, color: '707070' })], { spacing: { after: 20 } }));
      blocks.push(para([text(`   Instrumento de evaluación No ${ev.instrumento_numero || '?'}: ${ev.instrumento_tipo || '?'}`, { italics: true, size: 18, color: '707070' })], { spacing: { after: 60 } }));
    } else {
      blocks.push(footerInfo('Evidencias de aprendizaje: ', 'No aplica.'));
      blocks.push(footerInfo('Instrumentos de evaluación: ', 'No aplica.'));
    }
  }
  blocks.push(footerInfo('Duración de la actividad: ', `${dur} horas.`));
  blocks.push(para([], { spacing: { after: 200 } }));
  return blocks;
}

// === BUILD CHILDREN ===
const children = [];

// LOGO SENA
const logoPath = `${REPO_ROOT}/sena-logo.png`;
if (fs.existsSync(logoPath)) {
  children.push(para([new ImageRun({
    type: 'png', data: fs.readFileSync(logoPath),
    transformation: { width: 80, height: 80 },
    altText: { title: 'Logo SENA', description: 'Servicio Nacional de Aprendizaje', name: 'sena-logo' }
  })], { alignment: AlignmentType.CENTER, spacing: { after: 120 } }));
}

children.push(para([text('PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL', { bold: true, size: 26 })], { alignment: AlignmentType.CENTER, spacing: { after: 60 } }));
children.push(para([text('GUÍA DE APRENDIZAJE', { bold: true, size: 28 })], { alignment: AlignmentType.CENTER, spacing: { after: 360 } }));

// SECCIÓN 1
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
  children.push(para([text(`• ${k}: `, { bold: true }), text(String(v))], { spacing: { after: 80 } }));
}
children.push(para([text('• Resultados de Aprendizaje:', { bold: true })], { spacing: { after: 40 } }));
for (let i = 0; i < raps.length; i++) {
  let enun = raps[i].rap_titulo || raps[i].enunciado_rap || `(RAP ${raps[i].rap_id})`;
  enun = enun.replace(/^RA\s*\d+\s+/, '').trim();
  children.push(para([text(`   – RAP ${i + 1}: `, { bold: true }), text(enun)], { spacing: { after: 40 }, indent: { left: 360 } }));
}
children.push(para([text('• Duración de la Guía de Aprendizaje: ', { bold: true }), text(`${pme.duracion_horas} horas`)], { spacing: { after: 360 } }));

// SECCIÓN 2 PRESENTACIÓN PRÓLOGO
children.push(heading('2. PRESENTACIÓN', HeadingLevel.HEADING_1));
const PROLOGO = [
  [`Imagine Friday at 4 PM in Puerto Antioquia. The sun is hot. The sea breeze carries the sweet smell of Cavendish bananas. The MV CARIBBEAN STAR is approaching berth 3. On board: 80 reefer containers waiting to load. Inside each container: 27 tonnes of perishable cargo. The temperature must stay at 13.3°C — not 14, not 13. For the next 7 days the ship will sail to Hamburg, Antwerp and Dover. The cold chain cannot break.`,
   `Imagine viernes 4 PM en Puerto Antioquia. El sol calienta. La brisa marina lleva el aroma dulce de las bananas Cavendish. El MV CARIBBEAN STAR se aproxima al berth 3. A bordo: 80 contenedores reefer esperando ser cargados. Dentro de cada contenedor: 27 toneladas de carga perecedera. La temperatura debe mantenerse a 13.3°C — ni 14, ni 13. Por los próximos 7 días el buque navegará a Hamburgo, Antwerp y Dover. La cadena de frío no puede romperse.`],
  [`Now imagine the bridge of the ship. The captain speaks English. The pilot speaks English. The bosun speaks English. They wait for one voice on the VHF radio: yours. You are the bilingual operator who connects the Spanish-speaking yard with the English-speaking bridge. You give the green light. You read the SMCP message markers. You spell with NATO Phonetic. You confirm the setpoint. The cargo travels safely because you are there.`,
   `Ahora imagine el puente de mando. El capitán habla inglés. El piloto habla inglés. El bosun habla inglés. Esperan una voz en la radio VHF: la suya. Usted es el operador bilingüe que conecta el patio hispanohablante con el puente angloparlante. Usted da la luz verde. Usted lee los message markers SMCP. Usted deletrea con NATO Phonetic. Usted confirma el setpoint. La carga viaja segura porque usted está ahí.`],
  [`This guide is your training journey. In 12 sessions you will travel from CEFR level A1.2 to A2.1 across 4 RAPs, 6 formal evidences, and 1 final mission: the Pre-Departure Banana Reefer Compliance Check. Every activity has a purpose. Every word in English has a place on the ship, on the yard, or on the bridge. The journey is short — only 100 hours — but the destination is real: a job, a salary, a future in the cold chain industry of Urabá.`,
   `Esta guía es su viaje de formación. En 12 sesiones viajará desde el nivel CEFR A1.2 hasta A2.1 a través de 4 RAPs, 6 evidencias formales y 1 misión final: el Pre-Departure Banana Reefer Compliance Check. Cada actividad tiene un propósito. Cada palabra en inglés tiene un lugar en el buque, en el patio o en el puente. El viaje es corto — solo 100 horas — pero el destino es real: un empleo, un salario, un futuro en la industria de la cadena de frío de Urabá.`],
  [`This SENA training combines direct instruction with independent learning. Your instructor will guide every session, but your effort outside class will make the difference. Work with your classmates · ask questions · use the SENA library at https://biblioteca.sena.edu.co. Welcome aboard. The ship is waiting.`,
   `Esta formación SENA combina instrucción directa con aprendizaje independiente. Su instructor guiará cada sesión, pero su esfuerzo fuera de clase hará la diferencia. Trabaje con sus compañeros · pregunte · consulte la biblioteca SENA en https://biblioteca.sena.edu.co. Bienvenido a bordo. El buque espera.`]
];
for (const [en, es] of PROLOGO) {
  children.push(para([text(en)], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));
  children.push(para([text(es, { italics: true, size: 18, color: '707070' })], { spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED }));
}

// SECCIÓN 3
children.push(heading('3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE', HeadingLevel.HEADING_1));
children.push(para([
  text('Descripción de la(s) Actividad(es): ', { bold: true }),
  text(`Las actividades de aprendizaje son las acciones planeadas y estructuradas, de tal forma que los aprendices pueden lograr la apropiación de conocimientos, el desarrollo de sus habilidades y destrezas y alcanzar la competencia en ${competencia.toLowerCase()}. Las actividades que se proponen en esta guía de aprendizaje, están distribuidas entre actividades a desarrollar antes de aprender, mientras se aprende y después de aprender.`)
], { spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED }));

// 3.1 · todas las cards pm-2-1 (B0)
children.push(heading('3.1 Actividades de reflexión inicial', HeadingLevel.HEADING_2));
const cards_3_1 = allCards.filter(c => c._source_pm === 'pm-2-1').sort((a,b) => parseInt(a.numero_actividad) - parseInt(b.numero_actividad));
let local_3_1 = 1;
for (const c of cards_3_1) {
  const ccopy = {...c, numero_actividad: local_3_1++};
  renderActivityNarrative(ccopy, false).forEach(b => children.push(b));
}

// 3.2 · todas las cards pm-2-2 (B0)
children.push(heading('3.2 Actividades de contextualización e identificación de conocimientos necesarios para el aprendizaje', HeadingLevel.HEADING_2));
const cards_3_2 = allCards.filter(c => c._source_pm === 'pm-2-2').sort((a,b) => parseInt(a.numero_actividad) - parseInt(b.numero_actividad));
let local_3_2 = 1;
for (const c of cards_3_2) {
  const ccopy = {...c, numero_actividad: local_3_2++};
  renderActivityNarrative(ccopy, false).forEach(b => children.push(b));
}

// 3.3 · TODAS las cards B1+B2+B3+B4 con headers RAP separadores · numeración POR RAP reset
children.push(heading('3.3 Actividades de apropiación', HeadingLevel.HEADING_2));
const RAP_BLOCKS = [['B1', 1, 'RA1'], ['B2', 2, 'RA2'], ['B3', 3, 'RA3'], ['B4', 4, 'RA4']];
for (const [bid, rapIdx, rapKey] of RAP_BLOCKS) {
  const cards_b = allCards.filter(c => c.bloque_id_referencia === bid).sort((a,b) => parseInt(a.numero_actividad) - parseInt(b.numero_actividad));
  let rapEnun = (raps[rapIdx-1].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim();
  children.push(para([
    text(`RAP ${rapIdx}: `, { bold: true, size: 24 }),
    text(rapEnun, { bold: true, size: 24 })
  ], { spacing: { before: 240, after: 120 }, shading: { fill: 'EEEEEE', type: ShadingType.CLEAR } }));
  let local_idx = 1;
  for (const c of cards_b) {
    const ccopy = {...c, numero_actividad: local_idx++};
    renderActivityNarrative(ccopy, true).forEach(b => children.push(b));
  }
}

// 3.4 · todas las cards BT
children.push(heading('3.4 Actividades de Transferencia del Conocimiento', HeadingLevel.HEADING_2));
const cards_3_4 = allCards.filter(c => c.bloque_id_referencia === 'BT').sort((a,b) => parseInt(a.numero_actividad) - parseInt(b.numero_actividad));
let local_3_4 = 1;
for (const c of cards_3_4) {
  const ccopy = {...c, numero_actividad: local_3_4++};
  renderActivityNarrative(ccopy, true).forEach(b => children.push(b));
}

// === SECCIÓN 4 · TABLA COMPLETA · TODAS las actividades de 3.3 (NO 3.1 · NO 3.2 · NO 3.4) ===
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading('4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO', HeadingLevel.HEADING_1));

const cellPad = { top: 80, bottom: 80, left: 120, right: 120 };
const border = { style: BorderStyle.SINGLE, size: 6, color: '666666' };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: '39A900', type: ShadingType.CLEAR };
const rapShading = { fill: 'EEEEEE', type: ShadingType.CLEAR };
const colW = [1100, 1100, 2400, 2200, 1900, 1660];
const tableWidth = colW.reduce((a,b)=>a+b, 0);

const headerRow = new TableRow({ tableHeader: true, children: [
  'Fase del proyecto formativo','Actividad del proyecto formativo','Actividad de Aprendizaje',
  'Evidencias de Aprendizaje','Criterios de Evaluación','Técnicas e Instrumentos de Evaluación',
].map((h, i) => new TableCell({
  width: { size: colW[i], type: WidthType.DXA }, margins: cellPad, borders, shading: headerShading,
  children: [para([text(h, { bold: true, color: 'FFFFFF', size: 18 })])]
})) });

function rapSepRow(idx, enun) {
  return new TableRow({ children: [
    new TableCell({ width: { size: colW[0], type: WidthType.DXA }, margins: cellPad, borders, shading: rapShading, children: [para([text('No aplica')])] }),
    new TableCell({ width: { size: colW[1], type: WidthType.DXA }, margins: cellPad, borders, shading: rapShading, children: [para([text('No aplica')])] }),
    new TableCell({ columnSpan: 4, width: { size: colW[2]+colW[3]+colW[4]+colW[5], type: WidthType.DXA }, margins: cellPad, borders, shading: rapShading, children: [para([text(`RAP ${idx}: `, { bold: true }), text(enun, { bold: true })])] }),
  ]});
}

function actRow(card, ln, ic) {
  const dim = card.dimension || 'cognitiva';
  const enun = card.enunciado || '?';
  const ev = card.evidencias;
  const criterios = card.criterios_evaluacion || [];
  let evCell, critCell, instCell;
  if (ev && ev.aplica) {
    evCell = `Evidencia de ${(ev.tipo||'').toLowerCase()}: ${ev.nombre || '?'}`;
    instCell = `Técnica: ${ev.tecnica_evaluacion || '?'}\nInstrumento de Evaluación No ${ic.value}: ${ev.instrumento_tipo || '?'}`;
    ic.value++;
  } else { evCell = 'No aplica'; instCell = 'No aplica'; }
  critCell = criterios.join('\n') || '(criterio pending)';
  const actCell = `${ln}. Actividad ${dim}.\n${enun}`;
  return new TableRow({ children: [
    new TableCell({ width: { size: colW[0], type: WidthType.DXA }, margins: cellPad, borders, children: [para([text('No aplica')])] }),
    new TableCell({ width: { size: colW[1], type: WidthType.DXA }, margins: cellPad, borders, children: [para([text('No aplica')])] }),
    new TableCell({ width: { size: colW[2], type: WidthType.DXA }, margins: cellPad, borders, children: actCell.split('\n').map(s => para([text(s)])) }),
    new TableCell({ width: { size: colW[3], type: WidthType.DXA }, margins: cellPad, borders, children: [para([text(evCell)])] }),
    new TableCell({ width: { size: colW[4], type: WidthType.DXA }, margins: cellPad, borders, children: critCell.split('\n').map(s => para([text(s)])) }),
    new TableCell({ width: { size: colW[5], type: WidthType.DXA }, margins: cellPad, borders, children: instCell.split('\n').map(s => para([text(s)])) }),
  ]});
}

const tableRows = [headerRow];
const ic = { value: 1 };
for (const [bid, rapIdx, rapKey] of RAP_BLOCKS) {
  const cards_b = allCards.filter(c => c.bloque_id_referencia === bid).sort((a,b) => parseInt(a.numero_actividad) - parseInt(b.numero_actividad));
  let rapEnun = (raps[rapIdx-1].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim();
  tableRows.push(rapSepRow(rapIdx, rapEnun));
  let lnum = 1;
  for (const c of cards_b) tableRows.push(actRow(c, lnum++, ic));
}
children.push(new Table({ width: { size: tableWidth, type: WidthType.DXA }, columnWidths: colW, rows: tableRows }));

// === SECCIÓN 5 · GLOSARIO COMPLETO ·  TODAS las 122 entradas ===
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading('5. GLOSARIO BILINGÜE / BILINGUAL GLOSSARY', HeadingLevel.HEADING_1));
children.push(para([text('This glossary collects the technical terminology of the Maritime and Port English program · Banana Cold Chain Track. Each entry includes the term in English, its technical definition, a contextualized example, and the equivalent in Spanish.')], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));
children.push(para([text('Este glosario reúne la terminología técnica del programa Inglés Marítimo y Portuario · Línea Banana/Cold Chain.', { italics: true, size: 18, color: '707070' })], { spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED }));

// Sort entries alphabetically by english_term
const entries = [...glosario.entries].sort((a,b) => a.english_term.toLowerCase().localeCompare(b.english_term.toLowerCase()));
let last_letter = '';
for (const e of entries) {
  const first_letter = e.english_term.charAt(0).toUpperCase();
  if (first_letter !== last_letter) {
    children.push(para([text(first_letter, { bold: true, size: 28, color: '0B2E45' })], { spacing: { before: 240, after: 80 } }));
    last_letter = first_letter;
  }
  children.push(para([text(e.english_term, { bold: true, size: 24 })], { spacing: { before: 120, after: 40 } }));
  children.push(para([text('   English definition: ', { italics: true, bold: true }), text(e.english_definition)], { spacing: { after: 30 }, indent: { left: 360 } }));
  children.push(para([text('   Example in context: ', { italics: true, bold: true }), text(e.example_in_context)], { spacing: { after: 30 }, indent: { left: 360 } }));
  children.push(para([text('   Equivalente en español: ', { italics: true, size: 18, color: '707070', bold: true }), text(e.equivalente_espanol, { italics: true, size: 18, color: '707070' })], { spacing: { after: 80 }, indent: { left: 360 } }));
}

// === BUILD DOCUMENT ===
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
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
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: { default: new Header({ children: [
      para([text('SERVICIO NACIONAL DE APRENDIZAJE SENA', { size: 16, color: '888888' })], { alignment: AlignmentType.CENTER })
    ]})},
    footers: { default: new Footer({ children: [
      para([
        text('GFPI-F-135 V04', { size: 16, color: '666666', bold: true }),
        text('\t'),
        text('Página ', { size: 16, color: '666666' }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '666666' }),
        text(' de ', { size: 16, color: '666666' }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: '666666' }),
      ], { tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }] })
    ]})},
    children
  }]
});

const outPath = `${RUN_DIR}/pm-3-6.docx`;
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`\n✅ pm-3-6.docx FINAL generado · ${sizeKB} KB`);
  console.log(`   Path: ${outPath}`);
  console.log(`\nContenido completo (NO truncado):`);
  console.log(`  - Sec 1: Identificación (8 campos · logo SENA real)`);
  console.log(`  - Sec 2: Presentación (PRÓLOGO 4 párrafos bilingüe)`);
  console.log(`  - Sec 3.1: ${cards_3_1.length} actividades reflexión inicial (ESP)`);
  console.log(`  - Sec 3.2: ${cards_3_2.length} actividades contextualización (ESP)`);
  console.log(`  - Sec 3.3: ${RAP_BLOCKS.reduce((sum,[bid]) => sum + allCards.filter(c=>c.bloque_id_referencia===bid).length, 0)} actividades apropiación (4 RAPs · bilingüe)`);
  console.log(`  - Sec 3.4: ${cards_3_4.length} actividades transferencia (bilingüe)`);
  console.log(`  - Sec 4: tabla completa con ${RAP_BLOCKS.reduce((sum,[bid]) => sum + allCards.filter(c=>c.bloque_id_referencia===bid).length, 0)} actividades apropiación (instrumentos 1-${ic.value-1})`);
  console.log(`  - Sec 5: ${entries.length} entradas glosario bilingüe`);
});
