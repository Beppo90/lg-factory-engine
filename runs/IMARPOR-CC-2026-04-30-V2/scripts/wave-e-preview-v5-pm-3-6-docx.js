#!/usr/bin/env node
/**
 * Wave E.preview v5 · pm-3-6-PREVIEW.docx IMARPOR-V2 con 5 ajustes Sergio (2026-05-03)
 * ====================================================================================
 *
 * 1. Logo SENA real insertado centrado en encabezado Sec 1
 * 2. Bilingüismo Opción D escalada CEFR-aware:
 *    - Sec 2 PRESENTACIÓN: EN protagonista regular + ES cursiva pequeña scaffold abajo
 *    - 3.1+3.2 (B0): solo ESP (canon canon previo CEFR pre-A1)
 *    - 3.3+3.4 (B1-B4+BT): EN protagonista regular + ES cursiva pequeña scaffold abajo
 * 3. 3 secciones materiales separadas:
 *    - "Recursos preparados por el instructor" (worksheets · NEW v3.5)
 *    - "Materiales de formación" (CORE técnico · obligatorios)
 *    - "Material de apoyo" (complementarios · ilustrativos)
 * 4. Footer info actividad cursiva tamaño 9pt color gris discreta
 * 5. Bug fix: usar card.materiales_formacion (NOT card.materiales)
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat,
        TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, PageBreak, ImageRun } = require('/tmp/npm-docx/node_modules/docx');
const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory/runs/IMARPOR-CC-2026-04-30-V2';
const REPO_ROOT = '/sessions/beautiful-eager-faraday/mnt/fpi-sena-factory';

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

// Footer info field · cursiva discreta · tamaño 9pt · color gris (REGLA Sergio v3.5)
const footerInfo = (label, value) => para([
  text(label, { italics: true, size: 18, color: '707070', bold: true }),
  text(value, { italics: true, size: 18, color: '707070' }),
], { spacing: { after: 30 } });

// Render activity narrative (bilingüe Opción D escalada CEFR-aware)
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
  // BUG FIX v5: use materiales_formacion (NOT materiales)
  const materiales_formacion_arr = card.materiales_formacion || card.materiales || [];
  const materiales_formacion = Array.isArray(materiales_formacion_arr) ? materiales_formacion_arr.join(' · ') : String(materiales_formacion_arr || '(no declarado)');
  const matApoyoArr = card.material_apoyo || [];
  const matApoyo = Array.isArray(matApoyoArr) ? matApoyoArr.map(m => {
    if (typeof m === 'object') return (m.descripcion || m.nombre || '') + (m.link ? ` · Link: ${m.link}` : '');
    return String(m);
  }).filter(Boolean).join('; ') : String(matApoyoArr || 'No aplica');
  const ev = card.evidencias;
  const dur = card.duracion_horas || card.duracion_h || '?';
  const has_en = desc_en !== null;  // si es B1-B4+BT card → tiene EN

  const blocks = [];

  // Header línea 1 · siempre EN-ES bilingüe si has_en, solo ES si solo ES
  if (has_en) {
    // EN protagonista
    blocks.push(para([
      text(`${num}. Activity (${dim}): `, { bold: true }),
      text(enun, { bold: true }),
    ], { spacing: { before: 200, after: 30 } }));
    // ES cursiva pequeña scaffold (encima del EN sería redundante para enunciado · pongo ES debajo)
    blocks.push(para([
      text(`${num}. Actividad ${dim}: `, { bold: false, italics: true, size: 18, color: '707070' }),
      text(enun, { italics: true, size: 18, color: '707070' }),
    ], { spacing: { after: 100 } }));
  } else {
    // Solo ES (3.1+3.2)
    blocks.push(para([
      text(`${num}. Actividad ${dim}: `, { bold: true }),
      text(enun, { bold: true }),
    ], { spacing: { before: 200, after: 100 } }));
  }

  // Descripción · EN protagonista regular + ES cursiva scaffold
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
    // Solo ES (3.1+3.2)
    blocks.push(para([
      text('Descripción de la actividad: ', { bold: true }),
      text(desc_es),
    ], { spacing: { after: 100 }, alignment: AlignmentType.JUSTIFIED }));
  }

  // Recursos preparados por el instructor (NEW v3.5 · bilingüe escalado)
  if (recursos_es.length > 0) {
    if (has_en && recursos_en && recursos_en.length === recursos_es.length) {
      blocks.push(para([
        text('Resources prepared by the instructor:', { bold: true }),
      ], { spacing: { after: 40 } }));
      for (const r_en of recursos_en) {
        blocks.push(para([
          text('   • ', { bold: false }),
          text(String(r_en)),
        ], { spacing: { after: 20 }, indent: { left: 240 } }));
      }
      blocks.push(para([
        text('Recursos preparados por el instructor:', { italics: true, size: 18, color: '707070', bold: true }),
      ], { spacing: { before: 60, after: 30 } }));
      for (const r_es of recursos_es) {
        blocks.push(para([
          text('   • ', { italics: true, size: 18, color: '707070' }),
          text(String(r_es), { italics: true, size: 18, color: '707070' }),
        ], { spacing: { after: 20 }, indent: { left: 240 } }));
      }
    } else {
      // Solo ES (3.1+3.2)
      blocks.push(para([
        text('Recursos preparados por el instructor:', { bold: true }),
      ], { spacing: { after: 40 } }));
      for (const r of recursos_es) {
        blocks.push(para([
          text('   • ', { bold: false }),
          text(String(r)),
        ], { spacing: { after: 20 }, indent: { left: 240 } }));
      }
    }
    blocks.push(para([], { spacing: { after: 100 } }));
  }

  // === FOOTER INFO · cursiva discreta tamaño 9pt color gris (REGLA Sergio v3.5) ===
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
      blocks.push(para([
        text(`   Técnica de evaluación: ${ev.tecnica_evaluacion || '?'}`, { italics: true, size: 18, color: '707070' }),
      ], { spacing: { after: 20 } }));
      blocks.push(para([
        text(`   Instrumento de evaluación No ${ev.instrumento_numero || '?'}: ${ev.instrumento_tipo || '?'}`, { italics: true, size: 18, color: '707070' }),
      ], { spacing: { after: 60 } }));
    } else {
      blocks.push(footerInfo('Evidencias de aprendizaje: ', 'No aplica.'));
      blocks.push(footerInfo('Instrumentos de evaluación: ', 'No aplica.'));
    }
  }

  blocks.push(footerInfo('Duración de la actividad: ', `${dur} horas.`));
  blocks.push(para([], { spacing: { after: 200 } }));

  return blocks;
}

// === BUILD DOCUMENT CHILDREN ===
const children = [];

// Watermark PREVIEW
children.push(para([
  text('⚠️ DOCUMENTO PREVIEW v5 · NO ES VERSIÓN FINAL ⚠️', {
    color: 'CC0000', bold: true, size: 28
  })
], { alignment: AlignmentType.CENTER, spacing: { after: 240 } }));

// === LOGO SENA REAL (centrado · 80x80 px) ===
const logoPath = `${REPO_ROOT}/sena-logo.png`;
if (fs.existsSync(logoPath)) {
  children.push(para([
    new ImageRun({
      type: 'png',
      data: fs.readFileSync(logoPath),
      transformation: { width: 80, height: 80 },
      altText: { title: 'Logo SENA', description: 'Servicio Nacional de Aprendizaje', name: 'sena-logo' }
    })
  ], { alignment: AlignmentType.CENTER, spacing: { after: 120 } }));
} else {
  children.push(para([text('[LOGO SENA]', { color: '888888' })], { alignment: AlignmentType.CENTER }));
}

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

children.push(para([text('• Resultados de Aprendizaje:', { bold: true })], { spacing: { after: 40 } }));
for (let i = 0; i < raps.length; i++) {
  const r = raps[i];
  let enun = r.rap_titulo || r.enunciado_rap || r.enunciado || `(RAP ${r.rap_id})`;
  enun = enun.replace(/^RA\s*\d+\s+/, '').trim();
  children.push(para([
    text(`   – RAP ${i + 1}: `, { bold: true }), text(enun),
  ], { spacing: { after: 40 }, indent: { left: 360 } }));
}
children.push(para([
  text('• Duración de la Guía de Aprendizaje: ', { bold: true }),
  text(`${pme.duracion_horas} horas`),
], { spacing: { after: 360 } }));

// === SECCIÓN 2 · PRESENTACIÓN · estilo PRÓLOGO cinematográfico bilingüe Opción D (NEW v6) ===
// EN protagonista CEFR A1.2-A2.1 controlado · ES cursiva scaffold imperceptible
// Anclaje universo canon: Friday 4 PM Puerto Antioquia · MV CARIBBEAN STAR · 80 reefers · 13.3°C · Urabá-Europa
children.push(heading('2. PRESENTACIÓN', HeadingLevel.HEADING_1));

// === PRÓLOGO · 4 párrafos cinematográficos ===

// Párrafo 1 · ESCENA APERTURA
children.push(para([
  text(`Imagine Friday at 4 PM in Puerto Antioquia. The sun is hot. The sea breeze carries the sweet smell of Cavendish bananas. The MV CARIBBEAN STAR is approaching berth 3. On board: 80 reefer containers waiting to load. Inside each container: 27 tonnes of perishable cargo. The temperature must stay at 13.3°C — not 14, not 13. For the next 7 days the ship will sail to Hamburg, Antwerp and Dover. The cold chain cannot break.`)
], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));

children.push(para([
  text(`Imagine viernes 4 PM en Puerto Antioquia. El sol calienta. La brisa marina lleva el aroma dulce de las bananas Cavendish. El MV CARIBBEAN STAR se aproxima al berth 3. A bordo: 80 contenedores reefer esperando ser cargados. Dentro de cada contenedor: 27 toneladas de carga perecedera. La temperatura debe mantenerse a 13.3°C — ni 14, ni 13. Por los próximos 7 días el buque navegará a Hamburgo, Antwerp y Dover. La cadena de frío no puede romperse.`,
  { italics: true, size: 18, color: '707070' })
], { spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED }));

// Párrafo 2 · APRENDIZ PROTAGONISTA
children.push(para([
  text(`Now imagine the bridge of the ship. The captain speaks English. The pilot speaks English. The bosun speaks English. They wait for one voice on the VHF radio: yours. You are the bilingual operator who connects the Spanish-speaking yard with the English-speaking bridge. You give the green light. You read the SMCP message markers. You spell with NATO Phonetic. You confirm the setpoint. The cargo travels safely because you are there.`)
], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));

children.push(para([
  text(`Ahora imagine el puente de mando. El capitán habla inglés. El piloto habla inglés. El bosun habla inglés. Esperan una voz en la radio VHF: la suya. Usted es el operador bilingüe que conecta el patio hispanohablante con el puente angloparlante. Usted da la luz verde. Usted lee los message markers SMCP. Usted deletrea con NATO Phonetic. Usted confirma el setpoint. La carga viaja segura porque usted está ahí.`,
  { italics: true, size: 18, color: '707070' })
], { spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED }));

// Párrafo 3 · EL VIAJE PEDAGÓGICO
children.push(para([
  text(`This guide is your training journey. In 12 sessions you will travel from CEFR level A1.2 to A2.1 across 4 RAPs, 6 formal evidences, and 1 final mission: the Pre-Departure Banana Reefer Compliance Check. Every activity has a purpose. Every word in English has a place on the ship, on the yard, or on the bridge. The journey is short — only 100 hours — but the destination is real: a job, a salary, a future in the cold chain industry of Urabá.`)
], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));

children.push(para([
  text(`Esta guía es su viaje de formación. En 12 sesiones viajará desde el nivel CEFR A1.2 hasta A2.1 a través de 4 RAPs, 6 evidencias formales y 1 misión final: el Pre-Departure Banana Reefer Compliance Check. Cada actividad tiene un propósito. Cada palabra en inglés tiene un lugar en el buque, en el patio o en el puente. El viaje es corto — solo 100 horas — pero el destino es real: un empleo, un salario, un futuro en la industria de la cadena de frío de Urabá.`,
  { italics: true, size: 18, color: '707070' })
], { spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED }));

// Párrafo 4 · MENCIÓN SENA + LLAMADO
children.push(para([
  text(`This SENA training combines direct instruction with independent learning. Your instructor will guide every session, but your effort outside class will make the difference. Work with your classmates · ask questions · use the SENA library at https://biblioteca.sena.edu.co. Welcome aboard. The ship is waiting.`)
], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));

children.push(para([
  text(`Esta formación SENA combina instrucción directa con aprendizaje independiente. Su instructor guiará cada sesión, pero su esfuerzo fuera de clase hará la diferencia. Trabaje con sus compañeros · pregunte · consulte la biblioteca SENA en https://biblioteca.sena.edu.co. Bienvenido a bordo. El buque espera.`,
  { italics: true, size: 18, color: '707070' })
], { spacing: { after: 360 }, alignment: AlignmentType.JUSTIFIED }));

// === SECCIÓN 3 ===
children.push(heading('3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE', HeadingLevel.HEADING_1));

children.push(para([
  text('Descripción de la(s) Actividad(es): ', { bold: true }),
  text(`Las actividades de aprendizaje son las acciones planeadas y estructuradas, de tal forma que los aprendices pueden lograr la apropiación de conocimientos, el desarrollo de sus habilidades y destrezas y alcanzar la competencia en ${competencia.toLowerCase()}. Las actividades que se proponen en esta guía de aprendizaje, están distribuidas entre actividades a desarrollar antes de aprender, mientras se aprende y después de aprender.`)
], { spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED }));

// 3.1 Reflexión inicial (1 card sample · solo ESP)
children.push(heading('3.1 Actividades de reflexión inicial', HeadingLevel.HEADING_2));
const card_3_1 = allCards.find(c => c._source_pm === 'pm-2-1' && c.numero_actividad === 1);
if (card_3_1) renderActivityNarrative(card_3_1, false).forEach(b => children.push(b));

// 3.2 Contextualización (1 card sample · solo ESP)
children.push(heading('3.2 Actividades de contextualización e identificación de conocimientos necesarios para el aprendizaje', HeadingLevel.HEADING_2));
const card_3_2 = allCards.find(c => c._source_pm === 'pm-2-2' && c.numero_actividad === 3);
if (card_3_2) renderActivityNarrative(card_3_2, false).forEach(b => children.push(b));

// 3.3 Apropiación · RAP 1 + 2 cards bilingüe
children.push(heading('3.3 Actividades de apropiación', HeadingLevel.HEADING_2));
children.push(para([
  text(`RAP 1: `, { bold: true, size: 24 }),
  text((raps[0].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim() || '(RA1)', { bold: true, size: 24 })
], { spacing: { before: 240, after: 120 }, shading: { fill: 'EEEEEE', type: ShadingType.CLEAR } }));

const cards_b1 = allCards.filter(c => c.bloque_id_referencia === 'B1').sort((a,b) => parseInt(a.numero_actividad)-parseInt(b.numero_actividad));
let local_idx = 1;
for (const c of cards_b1.slice(0, 2)) {
  const ccopy = {...c, numero_actividad: local_idx++};
  renderActivityNarrative(ccopy, true).forEach(b => children.push(b));
}
children.push(para([text('[... actividades restantes RAP 1 + RAP 2 + RAP 3 + RAP 4 omitidas en preview ...]', { italics: true, color: '888888' })], { alignment: AlignmentType.CENTER, spacing: { after: 240 } }));

// 3.4 Transferencia (1 card sample · bilingüe)
children.push(heading('3.4 Actividades de Transferencia del Conocimiento', HeadingLevel.HEADING_2));
const card_3_4 = allCards.find(c => c.bloque_id_referencia === 'BT' && c.numero_actividad === 32);
if (card_3_4) {
  const ccopy = {...card_3_4, numero_actividad: 1};
  renderActivityNarrative(ccopy, true).forEach(b => children.push(b));
}

// === SECCIÓN 4 · TABLA SAMPLE ===
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading('4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO', HeadingLevel.HEADING_1));

const cellPad = { top: 80, bottom: 80, left: 120, right: 120 };
const border = { style: BorderStyle.SINGLE, size: 6, color: '666666' };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: '39A900', type: ShadingType.CLEAR };
const rapShading = { fill: 'EEEEEE', type: ShadingType.CLEAR };
const colW = [1100, 1100, 2400, 2200, 1900, 1660];
const tableWidth = colW.reduce((a,b)=>a+b, 0);

const headerRow = new TableRow({
  tableHeader: true,
  children: [
    'Fase del proyecto formativo','Actividad del proyecto formativo','Actividad de Aprendizaje',
    'Evidencias de Aprendizaje','Criterios de Evaluación','Técnicas e Instrumentos de Evaluación',
  ].map((h, i) => new TableCell({
    width: { size: colW[i], type: WidthType.DXA }, margins: cellPad, borders, shading: headerShading,
    children: [para([text(h, { bold: true, color: 'FFFFFF', size: 18 })])]
  })),
});

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
tableRows.push(rapSepRow(1, (raps[0].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim()));
let lnum = 1;
for (const c of cards_b1.slice(0, 3)) tableRows.push(actRow(c, lnum++, ic));

tableRows.push(rapSepRow(2, (raps[1].rap_titulo || '').replace(/^RA\s*\d+\s+/, '').trim()));
const cards_b2 = allCards.filter(c => c.bloque_id_referencia === 'B2').sort((a,b) => parseInt(a.numero_actividad)-parseInt(b.numero_actividad));
lnum = 1;
for (const c of cards_b2.slice(0, 1)) tableRows.push(actRow(c, lnum++, ic));

children.push(new Table({ width: { size: tableWidth, type: WidthType.DXA }, columnWidths: colW, rows: tableRows }));
children.push(para([text('[... filas restantes omitidas en preview ...]', { italics: true, color: '888888' })], { alignment: AlignmentType.CENTER, spacing: { before: 200, after: 360 } }));

// === SECCIÓN 5 · GLOSARIO sample ===
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading('5. GLOSARIO BILINGÜE / BILINGUAL GLOSSARY', HeadingLevel.HEADING_1));

children.push(para([
  text('This glossary collects the technical terminology of the Maritime and Port English program · Banana Cold Chain Track. Each entry includes the term in English, its technical definition, a contextualized example, and the equivalent in Spanish.')
], { spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED }));
children.push(para([
  text('Este glosario reúne la terminología técnica del programa Inglés Marítimo y Portuario · Línea Banana/Cold Chain.', { italics: true, size: 18, color: '707070' })
], { spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED }));

const sampleTerms = ['AIS', 'Affirmative', 'B/L', 'Cavendish', 'reefer plug', 'SMCP', 'tally clerk', 'berth'];
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
    text('   Equivalente en español: ', { italics: true, size: 18, color: '707070', bold: true }),
    text(e.equivalente_espanol, { italics: true, size: 18, color: '707070' }),
  ], { spacing: { after: 120 }, indent: { left: 360 } }));
}
children.push(para([text(`[... ${glosario.entries.length - samplesGlos.length} entradas restantes omitidas en preview · total ${glosario.entries.length} entradas en versión final ...]`, { italics: true, color: '888888' })], { alignment: AlignmentType.CENTER, spacing: { before: 200, after: 240 } }));

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

const outPath = `${RUN_DIR}/pm-3-6-PREVIEW-v5.docx`;
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log(`\n✅ Preview v5 generado: pm-3-6-PREVIEW-v5.docx · ${Math.round(fs.statSync(outPath).size / 1024)} KB`);
});
