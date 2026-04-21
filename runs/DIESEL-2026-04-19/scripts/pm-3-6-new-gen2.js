"use strict";
// Sections 3.2, 3.3, 3.4 — PM-3.6 SENA Learning Guide
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
} = docx;

const NAVY = "1C2B3C"; const ORANGE = "F59316"; const WHITE = "FFFFFF";
const LGRAY = "F2F2F2"; const MGRAY = "D9D9D9";
const pt = n => n * 2;

// ── Reuse helpers inline ──────────────────────────────────────────────────────
function navyHeader(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(13), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 240, after: 120 },
    indent: { left: 120, right: 120 },
  });
}
function orangeLabel(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(11), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: ORANGE },
    spacing: { before: 120, after: 60 },
    indent: { left: 120 },
  });
}
function boxedText(lines, fillColor) {
  const fill = fillColor || LGRAY;
  return lines.map((line, i) => new Paragraph({
    children: [new TextRun({ text: line, size: pt(10.5), font: "Calibri" })],
    shading: { type: ShadingType.CLEAR, fill },
    border: i === 0 ? { top: { style: BorderStyle.SINGLE, size: 6, color: NAVY }, left: { style: BorderStyle.SINGLE, size: 6, color: NAVY }, right: { style: BorderStyle.SINGLE, size: 6, color: NAVY } }
      : i === lines.length - 1 ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY }, left: { style: BorderStyle.SINGLE, size: 6, color: NAVY }, right: { style: BorderStyle.SINGLE, size: 6, color: NAVY } }
      : { left: { style: BorderStyle.SINGLE, size: 6, color: NAVY }, right: { style: BorderStyle.SINGLE, size: 6, color: NAVY } },
    indent: { left: 180, right: 180 }, spacing: { before: 0, after: 0 },
  }));
}
function body(text, bold, italic) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, italics: italic||false, size: pt(11), font: "Calibri" })],
    spacing: { before: 60, after: 60 }, indent: { left: 120, right: 120 },
  });
}
function boldBody(text) { return body(text, true); }
function indent2(text, bold) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, size: pt(11), font: "Calibri" })],
    indent: { left: 360, right: 120 }, spacing: { before: 40, after: 40 },
  });
}
function responseLine(label) {
  return new Paragraph({
    children: [
      new TextRun({ text: label ? label + " " : "", bold: true, size: pt(11), font: "Calibri" }),
      new TextRun({ text: "_".repeat(78), size: pt(11), font: "Calibri" }),
    ],
    indent: { left: 360, right: 120 }, spacing: { before: 80, after: 80 },
  });
}
function responseLines(n, label) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(responseLine(i === 0 ? label : ""));
  return arr;
}
function spacer(before) { return new Paragraph({ children: [new TextRun("")], spacing: { before: before||120, after: 0 } }); }
function activityHeader(id, nameEN, nameES, session, materials) {
  return [
    new Paragraph({
      children: [new TextRun({ text: `${id} — ${nameEN} / ${nameES}`, bold: true, color: WHITE, size: pt(12), font: "Arial" })],
      shading: { type: ShadingType.CLEAR, fill: "2E4057" },
      spacing: { before: 200, after: 60 }, indent: { left: 120, right: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `Sesión: ${session}   ·   Materiales: ${materials}`, size: pt(10), font: "Calibri", italics: true })],
      shading: { type: ShadingType.CLEAR, fill: LGRAY },
      spacing: { before: 0, after: 80 }, indent: { left: 120, right: 120 },
    }),
  ];
}
function dimension(label, en, es) {
  return [
    orangeLabel(`[${label}]`),
    new Paragraph({ children: [new TextRun({ text: "EN: ", bold: true, size: pt(11), font: "Calibri" }), new TextRun({ text: en, size: pt(11), font: "Calibri" })], indent: { left: 240, right: 120 }, spacing: { before: 40, after: 20 } }),
    new Paragraph({ children: [new TextRun({ text: "ES: ", bold: true, size: pt(11), font: "Calibri" }), new TextRun({ text: es, size: pt(11), font: "Calibri", italics: true })], indent: { left: 240, right: 120 }, spacing: { before: 20, after: 80 } }),
  ];
}
function entregable(producto, formato, criterio) {
  return [
    new Paragraph({ children: [new TextRun({ text: "Lineamientos para la entrega", bold: true, color: WHITE, size: pt(11), font: "Arial" })], shading: { type: ShadingType.CLEAR, fill: NAVY }, spacing: { before: 160, after: 60 }, indent: { left: 120 } }),
    new Paragraph({ children: [new TextRun({ text: "Producto: ", bold: true, size: pt(11), font: "Calibri" }), new TextRun({ text: producto, size: pt(11), font: "Calibri" })], indent: { left: 240, right: 120 }, spacing: { before: 40, after: 20 } }),
    new Paragraph({ children: [new TextRun({ text: "Formato: ", bold: true, size: pt(11), font: "Calibri" }), new TextRun({ text: formato, size: pt(11), font: "Calibri" })], indent: { left: 240, right: 120 }, spacing: { before: 20, after: 20 } }),
    new Paragraph({ children: [new TextRun({ text: "Criterio mínimo: ", bold: true, size: pt(11), font: "Calibri" }), new TextRun({ text: criterio, size: pt(11), font: "Calibri" })], indent: { left: 240, right: 120 }, spacing: { before: 20, after: 100 } }),
  ];
}
function simpleTable(headers, rows, colWidths) {
  const w = colWidths || headers.map(() => Math.floor(100 / headers.length));
  return new Table({
    rows: [
      new TableRow({ children: headers.map((h, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: w[i], type: WidthType.PCT }, verticalAlign: VerticalAlign.CENTER })), tableHeader: true }),
      ...rows.map(row => new TableRow({ children: row.map((cell, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: pt(10), font: "Calibri" })] })], width: { size: w[i], type: WidthType.PCT } })) })),
    ],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
  });
}
function quizItem(n, question, a, b, c) {
  const paras = [
    new Paragraph({ children: [new TextRun({ text: `${n}. ${question}`, bold: true, size: pt(11), font: "Calibri" })], indent: { left: 360, right: 120 }, spacing: { before: 120, after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: `a) ${a}`, size: pt(11), font: "Calibri" })], indent: { left: 540, right: 120 }, spacing: { before: 20, after: 20 } }),
    new Paragraph({ children: [new TextRun({ text: `b) ${b}`, size: pt(11), font: "Calibri" })], indent: { left: 540, right: 120 }, spacing: { before: 20, after: 20 } }),
  ];
  if (c) paras.push(new Paragraph({ children: [new TextRun({ text: `c) ${c}`, size: pt(11), font: "Calibri" })], indent: { left: 540, right: 120 }, spacing: { before: 20, after: 60 } }));
  return paras;
}

// ─── SECTION 3.2 — CONTEXTUALIZACIÓN (S3) ────────────────────────────────────
function sec32() {
  const out = [];
  out.push(navyHeader("3.2  ACTIVIDAD DE CONTEXTUALIZACIÓN — Comprensión  |  Sesión 3"));

  // ── A11: Error Log ───────────────────────────────────────────────────────
  out.push(...activityHeader("A11", "Error Log — Diagnose & Correct", "Error Log — Diagnosticar y Corregir", "S3", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Identify grammatical errors in 10 workshop sentences by applying the three grammar rules: Imperatives, There is/are, and Prepositions of place.",
    "Identificar errores gramaticales en 10 oraciones de taller aplicando las tres reglas: Imperativos, There is/are y Preposiciones de lugar."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Correct each sentence and name the grammar rule that was broken.",
    "Corregir cada oración y nombrar la regla gramatical que fue incumplida."));

  out.push(body("Las siguientes 10 oraciones contienen un error gramatical cada una. Para cada oración: (a) identifique el error, (b) escriba la corrección, y (c) indique la regla incumplida (Imperative / There is-are / Preposition). Trabaje en parejas."));
  out.push(spacer(60));
  out.push(...boxedText([
    "  REFERENCIA GRAMATICAL:",
    "  🔴 IMPERATIVE: Base verb, no subject. ✓ Check the floor jack.  ✗ You check the floor jack.",
    "  🔵 THERE IS / THERE ARE: IS + singular.  ARE + plural.",
    "  🟢 PREPOSITIONS: in / on / next to / behind / near / between",
  ], "EBF0F5"));
  out.push(spacer(80));

  const errors = [
    ["1", "You check the floor jack.", "", "", ""],
    ["2", "There are a spill near Bay 2.", "", "", ""],
    ["3", "The torque wrench is in next to the workbench.", "", "", ""],
    ["4", "Please wear your safety goggles.", "", "", ""],
    ["5", "There is three wrenches in the toolbox.", "", "", ""],
    ["6", "Put the socket on next to the ratchet.", "", "", ""],
    ["7", "Checking the floor jack before lifting.", "", "", ""],
    ["8", "There is many hazards in the workshop today.", "", "", ""],
    ["9", "The fire extinguisher is on next the bay door.", "", "", ""],
    ["10", "Organize your tools in the workbench.", "", "", ""],
  ];
  out.push(simpleTable(
    ["#", "Oración con error", "Error identificado", "Corrección", "Regla"],
    errors, [6, 32, 20, 25, 17]
  ));
  out.push(...entregable(
    "Tabla de Error Log completada con 10 oraciones corregidas",
    "En esta guía (tabla)",
    "Mínimo 7/10 oraciones correctamente diagnosticadas y corregidas"
  ));

  // ── A12: Inducción Gramatical ────────────────────────────────────────────
  out.push(...activityHeader("A12", "Grammar Induction from the Article", "Inducción Gramatical desde el Artículo", "S3", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Identify the three grammar structures (Imperatives, There is/are, Prepositions of place) in the Session 2 article by color-coding examples.",
    "Identificar las tres estructuras gramaticales en el artículo de la Sesión 2 mediante marcación por colores."));

  out.push(body("Regrese al artículo 'Tools Every Diesel Technician Needs' (Actividad A8). Siga las instrucciones de marcación por colores:"));
  out.push(indent2("🔴 ROJO — Subraye todos los IMPERATIVOS (verb + object, sin sujeto)"));
  out.push(indent2("🔵 AZUL — Subraye todas las frases THERE IS / THERE ARE"));
  out.push(indent2("🟢 VERDE — Subraye todas las PREPOSICIONES DE LUGAR (in, on, next to, near, behind)"));
  out.push(spacer(60));
  out.push(body("Luego, en parejas, escriba 3 oraciones originales propias (una por cada estructura), usando vocabulario del Toolbelt y el contexto del taller diesel:"));
  out.push(spacer(40));
  out.push(body("🔴 Mi oración IMPERATIVA:"));
  out.push(...responseLines(2));
  out.push(body("🔵 Mi oración THERE IS / THERE ARE:"));
  out.push(...responseLines(2));
  out.push(body("🟢 Mi oración de PREPOSICIÓN:"));
  out.push(...responseLines(2));
  out.push(...entregable(
    "Artículo marcado por colores + 3 oraciones originales producidas",
    "En esta guía",
    "Al menos 2 ejemplos correctamente marcados por color; 3 oraciones originales con estructura correcta"
  ));

  // ── A13: Grammar Stations ────────────────────────────────────────────────
  out.push(...activityHeader("A13", "Grammar Stations", "Estaciones de Gramática", "S3", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Practice each of the three grammar structures in focused rotation stations, producing original workshop sentences.",
    "Practicar cada una de las tres estructuras gramaticales en estaciones de rotación, produciendo oraciones originales de taller."));

  out.push(body("El instructor organizará la clase en 3 grupos. Cada grupo inicia en una estación diferente y rota cada 15 minutos. Complete el trabajo de su estación antes de rotar."));
  out.push(spacer(80));
  out.push(boldBody("🔴 ESTACIÓN 1 — IMPERATIVOS"));
  out.push(body("Reescriba las siguientes instrucciones en forma correcta de imperativo:"));
  const station1 = [
    ["1", "You should check the floor jack.", ""],
    ["2", "Please be organized.", ""],
    ["3", "Wearing PPE is important.", ""],
    ["4", "The technician cleans the bay.", ""],
    ["5", "It is important to inspect the extinguisher.", ""],
  ];
  out.push(simpleTable(["#", "Oración incorrecta", "Imperativo correcto"], station1, [8, 46, 46]));
  out.push(body("Escriba 3 instrucciones que Carlos le daría a Valentina en su primer día:"));
  out.push(...responseLines(3));
  out.push(spacer(80));

  out.push(boldBody("🔵 ESTACIÓN 2 — THERE IS / THERE ARE"));
  out.push(body("Escriba 8 oraciones describiendo el taller diesel: 4 con THERE IS y 4 con THERE ARE. Use términos del Toolbelt."));
  out.push(simpleTable(
    ["THERE IS (singular)", "THERE ARE (plural)"],
    [["", ""], ["", ""], ["", ""], ["", ""]],
    [50, 50]
  ));
  out.push(spacer(80));

  out.push(boldBody("🟢 ESTACIÓN 3 — PREPOSICIONES DE LUGAR"));
  out.push(body("Usando el plano del taller (Actividad A2), escriba 8 oraciones de ubicación. Cada oración describe DÓNDE está algo:"));
  const station3rows = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
  out.push(simpleTable(["Oración de ubicación (in / on / next to / behind / near)", "Preposición usada"], station3rows, [75, 25]));
  out.push(...entregable(
    "Trabajo completado de las 3 estaciones (Estación 1: 5 imperativos + 3 propios; Estación 2: tabla 8 oraciones; Estación 3: tabla 8 oraciones)",
    "En esta guía (tres tablas de estaciones)",
    "Mínimo 4/5 imperativos correctos (E1); 6/8 oraciones correctas en E2 y E3"
  ));

  // ── A14: Safety Report ───────────────────────────────────────────────────
  out.push(...activityHeader("A14", "Safety Report — Integrated Writing", "Safety Report — Escritura Integrada", "S3", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Write a complete 8-10 sentence Safety Report for Bay 2 using all three grammar structures.",
    "Redactar un Safety Report completo de 8-10 oraciones para el Bay 2 usando las tres estructuras gramaticales."));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Recognize the importance of accurate written communication for workplace safety documentation.",
    "Reconocer la importancia de la comunicación escrita precisa en la documentación de seguridad del lugar de trabajo."));

  out.push(body("Imagine que es el lunes por la mañana y usted es Valentina Cruz. Acaba de llegar al Bay 2 y debe escribir un Safety Report para Carlos. Use OBLIGATORIAMENTE las 3 estructuras: mínimo 2 imperativos, 2 frases There is/are y 2 preposiciones de lugar. Trabajo individual. 10 minutos."));
  out.push(spacer(60));
  out.push(...boxedText([
    "  BAY 2 SAFETY REPORT — Monday Morning",
    "  Technician: _________________________  Date: _____________",
    "  ─────────────────────────────────────────────────────────",
  ], "EBF0F5"));
  for (let i = 0; i < 10; i++) out.push(responseLine(""));
  out.push(...boxedText([
    "  Lista de verificación de estructuras usadas:",
    "  ☐ Al menos 2 IMPERATIVOS (rojo)   ☐ Al menos 2 THERE IS/ARE (azul)   ☐ Al menos 2 PREPOSICIONES (verde)",
  ], "EBF0F5"));
  out.push(...entregable(
    "Safety Report de Bay 2 escrito individualmente (8-10 oraciones)",
    "En esta guía (espacio de respuesta)",
    "Mínimo 8 oraciones; uso verificado de las 3 estructuras; al menos 5 términos del Toolbelt"
  ));

  // ── A15: E2 — Checklist + Work Order ────────────────────────────────────
  out.push(...activityHeader("A15", "E2 — Daily Inspection Checklist + Work Order",
    "E2 — Lista de Inspección Diaria + Orden de Trabajo", "S3", "Esta guía — trabajo individual"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Complete a Daily Inspection Checklist and a Work Order header in English for Bay 2 following the technical document format.",
    "Completar una Lista de Inspección Diaria y un encabezado de Orden de Trabajo en inglés para el Bay 2 siguiendo el formato de documento técnico."));

  out.push(...boxedText([
    "  EVIDENCIA 2 — Producto  |  Lista de verificación No 2  |  5 puntos",
    "  Instrucciones: Complete los dos documentos técnicos de forma individual en inglés.",
    "  Sin consultar apuntes ni compañeros. Entregue al instructor al finalizar.",
  ], "EBF0F5"));
  out.push(spacer(80));

  out.push(boldBody("DOCUMENTO 1 — DAILY INSPECTION CHECKLIST / Lista de Inspección Diaria"));
  out.push(simpleTable(
    ["#", "Inspection Item / Ítem de Inspección", "Status (✓ OK / ✗ Problem)", "Notes / Notas"],
    [
      ["1", "PPE available and in good condition", "", ""],
      ["2", "Floor jack — no leaks, lift tested", "", ""],
      ["3", "Fire extinguisher accessible — next to bay door", "", ""],
      ["4", "No oil spills on the floor", "", ""],
      ["5", "Tools organized in toolbox", "", ""],
      ["6", "Workbench clean and clear", "", ""],
      ["7", "Safety goggles and gloves in place", "", ""],
      ["8", "Bay door opens and closes correctly", "", ""],
    ],
    [6, 44, 26, 24]
  ));
  out.push(body("Technician / Técnico: _________________________   Date / Fecha: _______________"));
  out.push(body("Signature / Firma: _________________________   Bay: ☐ Bay 1  ☐ Bay 2  ☐ Bay 3"));
  out.push(spacer(100));

  out.push(boldBody("DOCUMENTO 2 — WORK ORDER HEADER / Encabezado de Orden de Trabajo"));
  out.push(simpleTable(
    ["Campo / Field", "Información / Information"],
    [
      ["Work Order No.", ""],
      ["Date / Fecha", ""],
      ["Bay", ""],
      ["Lead Technician", ""],
      ["Apprentice", ""],
      ["Vehicle Type / Tipo de vehículo", ""],
      ["Issue Description / Descripción del problema", ""],
      ["Maintenance Type / Tipo de mantenimiento", "☐ Preventive   ☐ Corrective"],
      ["Tools Required / Herramientas requeridas", ""],
      ["Estimated Duration", ""],
    ],
    [35, 65]
  ));
  out.push(...entregable(
    "Daily Inspection Checklist completo + Work Order Header completo",
    "En esta guía — entregado al instructor",
    "Todos los campos del Checklist marcados; todos los campos del Work Order diligenciados en inglés (Evidencia 2 — 5 puntos)"
  ));

  return out;
}

// ─── SECTION 3.3 — APROPIACIÓN (S4–S6) ───────────────────────────────────────
function sec33() {
  const out = [];
  out.push(navyHeader("3.3  ACTIVIDAD DE APROPIACIÓN — Desarrollo de Competencias  |  Sesiones 4–6"));

  // ── A16: Bay 2 Safety Briefing Dialogue ─────────────────────────────────
  out.push(...activityHeader("A16", "Bay 2 Safety Briefing — Listen & Comprehend",
    "Bay 2 Safety Briefing — Escuche y Comprenda", "S4", "Esta guía + audio reproducido por instructor"));
  out.push(...dimension("COGNITIVA — Saber",
    "Comprehend the Bay 2 Safety Briefing dialogue by identifying speakers, safety instructions, and locations mentioned.",
    "Comprender el diálogo Bay 2 Safety Briefing identificando hablantes, instrucciones de seguridad y ubicaciones mencionadas."));

  out.push(body("El instructor leerá el siguiente diálogo en voz alta dos veces a ritmo natural. En la primera escucha, SOLO escuche. En la segunda, siga el texto con su dedo e identifique las funciones comunicativas marcadas."));
  out.push(spacer(80));
  const dialogue = [
    ["CARLOS", "Good morning, Valentina. Welcome to Bay 2."],
    ["VALENTINA", "Good morning, Carlos. Thank you."],
    ["CARLOS", "First, put on your PPE. Gloves and goggles."],
    ["VALENTINA", "OK. I have my gloves. Where are the goggles?"],
    ["CARLOS", "The goggles are on the workbench."],
    ["VALENTINA", "Thank you. (puts on goggles)"],
    ["CARLOS", "Good. Now look at the floor. There is an oil spill."],
    ["VALENTINA", "Where? Near the bay door?"],
    ["CARLOS", "Yes. It is near the bay door. Clean it now."],
    ["VALENTINA", "OK. I understand. (cleans the spill)"],
    ["CARLOS", "The fire extinguisher is always next to the bay door."],
    ["VALENTINA", "The fire extinguisher is next to the bay door. OK."],
    ["CARLOS", "Now check the floor jack. Look for leaks. Test the lift."],
    ["VALENTINA", "I check the floor jack. No leaks. The lift works."],
    ["CARLOS", "Good work. Check your Daily Inspection Checklist."],
    ["VALENTINA", "(checks checklist) Checklist complete. Bay 2 is ready."],
    ["CARLOS", "Excellent, Valentina. You are ready to work."],
    ["VALENTINA", "Thank you, Carlos."],
  ];
  out.push(simpleTable(
    ["Speaker", "Line"],
    dialogue, [18, 82]
  ));
  out.push(spacer(80));
  out.push(body("Después de la segunda escucha, responda:"));
  out.push(body("¿Qué instrucciones de seguridad da Carlos? / What safety instructions does Carlos give?"));
  out.push(...responseLines(3));
  out.push(body("¿Qué preposiciones de lugar escucha? / What prepositions of place do you hear?"));
  out.push(...responseLines(2));
  out.push(...entregable(
    "Respuestas de comprensión del diálogo completadas",
    "En esta guía",
    "Mínimo 3 instrucciones de seguridad identificadas; mínimo 2 preposiciones identificadas"
  ));

  // ── A17: E3 — Quiz No 3 Listening ────────────────────────────────────────
  out.push(...activityHeader("A17", "Quiz No 3 — E3: Listening Comprehension",
    "Cuestionario No 3 — E3: Comprensión Auditiva", "S4", "Esta guía — SIN diálogo ni Word Wall"));
  out.push(...dimension("COGNITIVA — Saber",
    "Demonstrate listening comprehension of the Bay 2 Safety Briefing by answering 5 multiple-choice questions based solely on what was heard.",
    "Demostrar comprensión auditiva del Bay 2 Safety Briefing respondiendo 5 preguntas de selección múltiple basadas exclusivamente en lo escuchado."));

  out.push(...boxedText([
    "  EVIDENCIA 3 — Desempeño  |  Cuestionario No 3  |  5 puntos",
    "  Reciba el cuestionario cara abajo. NO lo voltee hasta la señal.",
    "  SIN texto del diálogo. SIN Word Wall. SIN apuntes. SIN teléfono.",
    "  Nombre: ________________________________  Ficha: _________  Fecha: _________",
  ], "EBF0F5"));
  out.push(spacer(60));
  out.push(...quizItem(1, "What does Carlos ask Valentina to put on first?",
    "A work order", "Gloves and goggles", "A torque wrench"));
  out.push(...quizItem(2, "Where is the oil spill?",
    "Under the workbench", "On the toolbox", "Near the bay door"));
  out.push(...quizItem(3, "Where should the fire extinguisher always be?",
    "On the workbench", "In the toolbox", "Next to the bay door"));
  out.push(...quizItem(4, "How does Carlos say to check the floor jack?",
    "Look for spills and clean it", "Look for leaks and test the lift", "Put it on the workbench"));
  out.push(...quizItem(5, "What does Valentina say at the end?",
    "Bay 2 has a problem.", "The floor jack is broken.", "Checklist complete. Bay 2 is ready."));
  out.push(...entregable(
    "Cuestionario No 3 respondido individualmente (5 ítems)",
    "En esta guía — entregado al instructor al finalizar",
    "Mínimo 3/5 ítems correctos (Evidencia 3 — 5 puntos)"
  ));

  // ── A18: Workshop Readiness Report + E4 Speaking ────────────────────────
  out.push(...activityHeader("A18", "Workshop Readiness Report + E4 Speaking",
    "Reporte de Preparación del Taller + E4 Expresión Oral", "S4", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Deliver a 60-90 second Workshop Readiness Report describing Bay 2 using Toolbelt vocabulary and grammar structures.",
    "Presentar un Reporte de Preparación de Taller de 60-90 segundos describiendo el Bay 2 usando vocabulario del Toolbelt y estructuras gramaticales."));

  out.push(body("Estudie el modelo de reporte a continuación. Luego prepare y presente su propio Workshop Readiness Report para el bay que le asigne el instructor."));
  out.push(spacer(60));
  out.push(...boxedText([
    "  MODELO — WORKSHOP READINESS REPORT (60 seg)",
    "  'Good morning. This is the Bay 2 Readiness Report.'",
    "  'There is a workbench on the left. The tools are in the toolbox.'",
    "  'The wrench is on the workbench. The floor jack is next to the vehicle.'",
    "  'There is no spill on the floor. The floor is clean.'",
    "  'The fire extinguisher is next to the bay door. PPE is ready.'",
    "  'Bay 2 is ready for operation. Checklist: complete.'",
  ], "EBF0F5"));
  out.push(spacer(80));
  out.push(body("Prepare su reporte aquí (notas — no leerá de este papel durante la presentación):"));
  out.push(...responseLines(8));
  out.push(spacer(80));
  out.push(...boxedText([
    "  EVIDENCIA 4 — Desempeño  |  Escala de Estimación No 4  |  5 puntos",
    "  El instructor evaluará su presentación oral con los siguientes criterios:",
    "  1. Usa vocabulario técnico del Toolbelt (≥8 términos)           1 - 2 - 3 - 4 - 5",
    "  2. Describe el bay con There is/are correctamente               1 - 2 - 3 - 4 - 5",
    "  3. Ubica herramientas con preposiciones (on, under, next to)    1 - 2 - 3 - 4 - 5",
    "  4. Pronunciación comprensible de términos técnicos              1 - 2 - 3 - 4 - 5",
    "  5. Responde pregunta del supervisor sin leer el reporte         1 - 2 - 3 - 4 - 5",
  ], "FFF8EC"));
  out.push(...entregable(
    "Presentación oral de Workshop Readiness Report (60-90 segundos)",
    "Oral — individual o en parejas — evaluado en vivo por el instructor",
    "Uso de ≥8 términos del Toolbelt; al menos 2 preposiciones; responde 1 pregunta del instructor sin leer (Evidencia 4 — 5 puntos)"
  ));

  // ── A19: Mapa de Funciones Comunicativas ─────────────────────────────────
  out.push(...activityHeader("A19", "Communication Functions Map", "Mapa de Funciones Comunicativas", "S5", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Identify the 5 communication functions of the Workshop Specialist and the structures that activate each one.",
    "Identificar las 5 funciones comunicativas del Workshop Specialist y las estructuras que activan cada una."));

  out.push(body("Estudie el siguiente mapa de funciones comunicativas. Estas son las 5 funciones que debe dominar para la Misión Final."));
  out.push(spacer(60));
  out.push(simpleTable(
    ["Función", "Nombre", "Estructura", "Ejemplo"],
    [
      ["F1", "Dar instrucciones\nGiving instructions", "Imperative: Verb + Object", "'Check the floor jack.'"],
      ["F2", "Solicitar herramientas\nRequesting tools", "'Can I have the ___?' / 'I need the ___.'", "'Can I have the torque wrench?'"],
      ["F3", "Describir condiciones\nDescribing conditions", "There is/are + preposition", "'There is a spill near Bay 1.'"],
      ["F4", "Reportar al supervisor\nReporting to supervisor", "'Bay ___ is ready, Carlos.'", "'Bay 2 is ready, Carlos.'"],
      ["F5", "Confirmar comprensión\nConfirming understanding", "'Understood.' / 'Got it.' / 'Copy that.'", "'Got it. I'll do it now.'"],
    ],
    [8, 22, 35, 35]
  ));
  out.push(spacer(80));
  out.push(body("Diagrama de interacciones — ¿Quién usa cada función con quién?"));
  out.push(...boxedText([
    "  CARLOS (Supervisor) ──F1──▶ VALENTINA / SANTIAGO",
    "  VALENTINA ──F2──▶ SANTIAGO  (solicitar herramientas entre técnicos)",
    "  VALENTINA / SANTIAGO ──F3──▶ TODOS  (describir condiciones del bay)",
    "  VALENTINA / SANTIAGO ──F4──▶ CARLOS  (reportar al supervisor)",
    "  TODOS ──F5──▶ TODOS  (confirmar comprensión de cualquier mensaje)",
  ], "EBF0F5"));
  out.push(...entregable(
    "Mapa de funciones completado con comprensión demostrada en la clasificación de frases (A20)",
    "En esta guía (referencia + actividad siguiente)",
    "Identificar correctamente la función de mínimo 12/15 frases en la Actividad A20"
  ));

  // ── A20: Clasificación de Frases ─────────────────────────────────────────
  out.push(...activityHeader("A20", "Phrase Card Classification", "Clasificación de Tarjetas de Frases", "S5", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Classify 15 workshop phrases into their corresponding communication function (F1–F5).",
    "Clasificar 15 frases del taller en su función comunicativa correspondiente (F1–F5)."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Practice producing each communication function using the provided phrase cards and drill structures.",
    "Practicar la producción de cada función comunicativa usando las tarjetas de frases y estructuras de drill."));

  out.push(body("Lea las 15 frases a continuación. Para cada una, identifique la función comunicativa (F1, F2, F3, F4 o F5) basándose en el Mapa de Funciones (Actividad A19)."));
  out.push(spacer(60));
  const phrases15 = [
    ["1", "Check the floor jack before you start.", ""],
    ["2", "Put on your goggles and gloves.", ""],
    ["3", "Clean the oil spill near the bay door.", ""],
    ["4", "Can I have the torque wrench?", ""],
    ["5", "I need the socket set.", ""],
    ["6", "Where is the ratchet? Can I use it?", ""],
    ["7", "There is a spill near Bay 1.", ""],
    ["8", "There are three tools on the workbench.", ""],
    ["9", "The floor jack is under the vehicle.", ""],
    ["10", "Bay 2 is ready, Carlos.", ""],
    ["11", "There is a problem with the floor jack.", ""],
    ["12", "Preventive maintenance checklist: complete.", ""],
    ["13", "Understood.", ""],
    ["14", "Got it. I'll do it now.", ""],
    ["15", "Checklist complete. Bay 2 is ready.", ""],
  ];
  out.push(simpleTable(
    ["#", "Frase / Phrase", "Función (F1–F5)"],
    phrases15, [8, 72, 20]
  ));
  out.push(...entregable(
    "Tabla de clasificación de 15 frases completada",
    "En esta guía (tabla)",
    "Mínimo 12/15 clasificaciones correctas"
  ));

  // ── A21: Drills F1–F5 ────────────────────────────────────────────────────
  out.push(...activityHeader("A21", "Communication Drills F1–F5", "Drills de Funciones Comunicativas F1–F5", "S5", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Practice the 5 communication functions through structured stimulus-response drills in pairs.",
    "Practicar las 5 funciones comunicativas mediante drills estímulo-respuesta estructurados en pares."));

  out.push(body("Con un compañero, realice los siguientes drills. Pareja A lee el estímulo; Pareja B produce la respuesta usando la función indicada. Luego cambien de rol."));
  out.push(spacer(60));
  out.push(boldBody("DRILL F1 — Dar instrucciones (Imperativo):"));
  const drillF1 = [
    ["Estímulo A", "Respuesta B (Imperativo)"],
    ["El floor jack — ¿qué hago?", "Check the floor jack."],
    ["¡No hay PPE!", "Put on your gloves and goggles."],
    ["¡Derrame de aceite!", "Clean the spill near the bay door."],
    ["Las herramientas están desordenadas.", "Organize your tools in the toolbox."],
  ];
  out.push(simpleTable(drillF1[0], drillF1.slice(1), [50, 50]));
  out.push(spacer(60));

  out.push(boldBody("DRILL F2 — Solicitar herramientas:"));
  out.push(body("Pareja A necesita estas herramientas. Produce la solicitud. Pareja B responde: 'Here you go.' o 'I am using it. One minute.'"));
  out.push(simpleTable(
    ["Herramienta necesitada", "Solicitud F2", "Respuesta de Pareja B"],
    [["torque wrench", "", ""], ["socket set", "", ""], ["ratchet", "", ""], ["floor jack", "", ""]],
    [30, 40, 30]
  ));
  out.push(spacer(60));

  out.push(boldBody("DRILLS F3, F4, F5 — Describir, Reportar, Confirmar:"));
  out.push(body("Scenario: Bay 2, Monday morning. Use todas las funciones en secuencia:"));
  out.push(indent2("1. Pareja A (como Valentina): describe una condición del bay usando THERE IS + preposición. (F3)"));
  out.push(indent2("2. Pareja A: reporta al supervisor usando 'Bay 2 is ___' o 'There is a problem with ___' (F4)"));
  out.push(indent2("3. Pareja B (como Carlos): da una instrucción (F1). Pareja A confirma comprensión (F5)."));
  out.push(indent2("4. Cambien de roles y repitan."));
  out.push(...entregable(
    "Participación en todos los drills F1–F5 con respuestas orales producidas",
    "Oral — actividad de pares",
    "Producir al menos 3 respuestas correctas en cada función durante la práctica"
  ));

  // ── A22: Simulación Integrada + E5 ───────────────────────────────────────
  out.push(...activityHeader("A22", "Integrated Simulation — E5 Language Functions",
    "Simulación Integrada — E5 Funciones del Lenguaje", "S5", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Perform a 3-4 minute workshop opening simulation demonstrating all 5 communication functions in natural, coordinated sequence.",
    "Realizar una simulación de apertura de taller de 3-4 minutos demostrando las 5 funciones comunicativas en secuencia natural y coordinada."));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Demonstrate professional conduct in English communication within a simulated team work environment.",
    "Demostrar conducta profesional en la comunicación en inglés dentro de un entorno de trabajo en equipo simulado."));

  out.push(body("Forme un equipo de tres. Asigne los roles: Carlos Mendoza (Técnico Líder), Valentina Cruz (Aprendiz), Santiago Ríos (Técnico). Lean el modelo de simulación a continuación, luego realicen SU propia versión (no memorizada — natural)."));
  out.push(spacer(60));
  const simScript = [
    ["CARLOS", "F1", "Good morning. Check your PPE before you start."],
    ["VALENTINA", "F5", "Understood."],
    ["VALENTINA", "F2", "Santiago, can I have the torque wrench?"],
    ["SANTIAGO", "F5", "Here you go."],
    ["VALENTINA", "F3", "There is an oil spill near the bay door."],
    ["CARLOS", "F1", "Clean it now. Then check the floor jack."],
    ["SANTIAGO", "F5", "Got it. I'll do it now."],
    ["VALENTINA", "F4", "Bay 2 is ready, Carlos. Checklist: complete."],
    ["CARLOS", "—", "Good work."],
  ];
  out.push(simpleTable(
    ["Speaker", "Función", "Line (modelo)"],
    simScript, [18, 12, 70]
  ));
  out.push(spacer(80));
  out.push(...boxedText([
    "  EVIDENCIA 5 — Desempeño  |  Escala de Estimación No 5  |  5 puntos",
    "  El equipo observador registra qué funciones aparecen y da retroalimentación estructurada.",
    "  1. Da instrucciones usando imperativos (F1)            1 - 2 - 3 - 4 - 5",
    "  2. Solicita herramientas con fórmulas correctas (F2)   1 - 2 - 3 - 4 - 5",
    "  3. Describe condiciones con There is/are (F3)          1 - 2 - 3 - 4 - 5",
    "  4. Reporta al supervisor con información completa (F4) 1 - 2 - 3 - 4 - 5",
    "  5. Confirma comprensión con expresiones correctas (F5) 1 - 2 - 3 - 4 - 5",
  ], "FFF8EC"));
  out.push(body("Notas de retroalimentación del equipo observador:"));
  out.push(...responseLines(3));
  out.push(...entregable(
    "Simulación de apertura de taller (3-4 min) con las 5 funciones comunicativas visibles",
    "Oral — grupos de 3 — evaluado en vivo",
    "Las 5 funciones comunicativas presentes; duración ≥3 min; sin leer de apuntes (Evidencia 5 — 5 puntos)"
  ));

  // ── A23: E6 — Cuestionario Consolidado No 6 ──────────────────────────────
  out.push(...activityHeader("A23", "E6 — Cuestionario Consolidado No 6",
    "E6 — Cuestionario Consolidado No 6", "S6", "Esta guía — SIN materiales"));
  out.push(...dimension("COGNITIVA — Saber",
    "Demonstrate integrated mastery of all 5 workshop English skills through a 25-item multiple-choice assessment.",
    "Demostrar dominio integrado de las 5 habilidades de inglés técnico de taller mediante una evaluación de 25 ítems de selección múltiple."));

  out.push(...boxedText([
    "  EVIDENCIA 6 — Conocimiento  |  Cuestionario Consolidado No 6  |  25 puntos",
    "  Nombre: ________________________________  Ficha: _________  Fecha: _________",
    "  Instrucciones: Encierre en círculo la letra correcta. SIN Word Wall, SIN apuntes.",
    "  SIN Communication Card, SIN teléfono. Tiempo: 90 minutos.",
  ], "EBF0F5"));
  out.push(spacer(80));

  out.push(boldBody("SECCIÓN 1 — READING COMPREHENSION (ítems 1–5)"));
  out.push(body("Answer the questions based on the article 'Tools Every Diesel Technician Needs' (Session 2)."));
  out.push(...quizItem(1, "What is the main topic of the article?", "Workshop safety rules", "Essential tools for diesel technicians", "How to clean a workshop"));
  out.push(...quizItem(2, "A torque wrench is used to ___.", "Lift vehicles", "Apply the correct force to a bolt", "Measure oil levels"));
  out.push(...quizItem(3, "True or False: The ratchet works well in large spaces.", "TRUE", "FALSE", null));
  out.push(...quizItem(4, "Where does a technician keep tools organized?", "On the workbench", "In the toolbox", "Under the vehicle"));
  out.push(...quizItem(5, "What does 'calibration' mean in the article?", "Cleaning the tool", "Checking that the tool is accurate", "Replacing a broken tool"));

  out.push(spacer(60));
  out.push(boldBody("SECCIÓN 2 — VOCABULARY (ítems 6–10)"));
  out.push(body("Answer the questions about the 20 Toolbelt terms."));
  out.push(...quizItem(6, "What is a 'workbench'?", "A storage box for tools", "A flat surface to work on", "A type of wrench"));
  out.push(...quizItem(7, "'Hazard' means ___.", "A tool for lifting", "Something dangerous", "A document"));
  out.push(...quizItem(8, "Which of these is PPE (Personal Protective Equipment)?", "Torque wrench", "Safety goggles", "Floor jack"));
  out.push(...quizItem(9, "A 'work order' is ___.", "An instruction to lift a vehicle", "A document describing a repair task", "A safety tool"));
  out.push(...quizItem(10, "'Preventive maintenance' means ___.", "Fixing a broken machine", "Regular care to avoid breakdowns", "Measuring tool accuracy"));

  out.push(spacer(60));
  out.push(boldBody("SECCIÓN 3 — GRAMMAR (ítems 11–15)"));
  out.push(body("Answer the grammar questions."));
  out.push(...quizItem(11, "Which sentence is an imperative?", "I check the floor jack.", "Check the floor jack.", "The floor jack is checked."));
  out.push(...quizItem(12, "Complete: '___ a spill near the bay door.'", "There are", "There is", "Is there"));
  out.push(...quizItem(13, "Complete: 'The tools ___ in the toolbox.'", "is", "are", "has"));
  out.push(...quizItem(14, "Complete: 'The fire extinguisher is ___ the bay door.'", "on", "under", "next to"));
  out.push(...quizItem(15, "Which sentence has a correct preposition?", "The wrench is near of the workbench.", "The wrench is on the workbench.", "The wrench is in front the workbench."));

  out.push(spacer(60));
  out.push(boldBody("SECCIÓN 4 — LISTENING COMPREHENSION (ítems 16–20)"));
  out.push(body("Answer the questions about the Bay 2 Safety Briefing dialogue (Session 4)."));
  out.push(...quizItem(16, "In the dialogue, who is the supervisor?", "Valentina Cruz", "Carlos Mendoza", "Santiago Ríos"));
  out.push(...quizItem(17, "What PPE does Carlos ask Valentina to wear?", "Gloves only", "Goggles only", "Gloves and goggles"));
  out.push(...quizItem(18, "Where is the oil spill in the dialogue?", "Under the workbench", "Near the bay door", "In the toolbox"));
  out.push(...quizItem(19, "Carlos says the fire extinguisher is always ___.", "On the workbench", "In the toolbox", "Next to the bay door"));
  out.push(...quizItem(20, "What does Valentina say at the end of the dialogue?", "Bay 2 has a problem.", "I need more PPE.", "Checklist complete. Bay 2 is ready."));

  out.push(spacer(60));
  out.push(boldBody("SECCIÓN 5 — LANGUAGE FUNCTIONS (ítems 21–25)"));
  out.push(body("Answer the questions about the 5 communication functions."));
  out.push(...quizItem(21, "Carlos says: 'Check the torque wrench.' What function is this?", "Reporting to supervisor", "Giving instructions", "Confirming understanding"));
  out.push(...quizItem(22, "Valentina says: 'Can I have the socket set?' What function is this?", "Requesting tools or help", "Describing conditions", "Giving instructions"));
  out.push(...quizItem(23, "'There is a spill near Bay 2.' What function is this?", "Confirming understanding", "Reporting to supervisor", "Describing conditions"));
  out.push(...quizItem(24, "Santiago says: 'Bay 3 is ready, Carlos.' What function is this?", "Reporting to supervisor", "Giving instructions", "Requesting help"));
  out.push(...quizItem(25, "Valentina says: 'Got it. I'll do it now.' What function is this?", "Describing conditions", "Confirming understanding", "Requesting tools"));

  out.push(...entregable(
    "Cuestionario Consolidado No 6 — 25 ítems respondidos",
    "En esta guía — entregado al instructor",
    "Puntaje mínimo de aprobación: 13/25. Diagnóstico por sección: <3/5 = habilidad en refuerzo (Evidencia 6 — 25 puntos)"
  ));

  // ── A24: Revisión + Gráfico de Progresión ───────────────────────────────
  out.push(...activityHeader("A24", "Answer Review + Skills Progression Chart",
    "Revisión de Respuestas + Gráfico de Progresión", "S6", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Diagnose personal performance by section in the Cuestionario Consolidado and identify specific reinforcement needs.",
    "Diagnosticar el desempeño personal por sección en el Cuestionario Consolidado e identificar necesidades específicas de refuerzo."));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Commit to specific reinforcement actions before the Final Mission based on honest self-diagnosis.",
    "Comprometerse con acciones de refuerzo específicas antes de la Misión Final basadas en un autodiagnóstico honesto."));

  out.push(body("Durante la revisión colectiva del Cuestionario, complete la siguiente ficha de diagnóstico:"));
  out.push(spacer(60));
  out.push(simpleTable(
    ["Sección", "Habilidad", "Mi puntaje", "¿<3/5?", "Acción de refuerzo"],
    [
      ["S1 (ítems 1–5)", "Reading", "   / 5", "☐", ""],
      ["S2 (ítems 6–10)", "Vocabulary", "   / 5", "☐", ""],
      ["S3 (ítems 11–15)", "Grammar", "   / 5", "☐", ""],
      ["S4 (ítems 16–20)", "Listening", "   / 5", "☐", ""],
      ["S5 (ítems 21–25)", "Language Functions", "   / 5", "☐", ""],
      ["TOTAL", "All skills", "   / 25", "—", ""],
    ],
    [18, 22, 14, 10, 36]
  ));
  out.push(spacer(80));
  out.push(body("Comparta con un compañero: una habilidad de la que está orgulloso y una que aún necesita más trabajo antes de la Misión Final."));
  out.push(body("Habilidad más fuerte / Strongest skill:"));
  out.push(...responseLines(1));
  out.push(body("Habilidad que más necesita refuerzo / Skill needing most work:"));
  out.push(...responseLines(1));
  out.push(...entregable(
    "Ficha de diagnóstico completada + acción de refuerzo definida para cada sección <3/5",
    "En esta guía",
    "Todas las secciones con puntaje registrado; mínimo 1 acción de refuerzo escrita para cada sección marcada"
  ));

  return out;
}

// ─── SECTION 3.4 — TRANSFERENCIA (S7–S8) ─────────────────────────────────────
function sec34() {
  const out = [];
  out.push(navyHeader("3.4  ACTIVIDAD DE TRANSFERENCIA — Misión Final  |  Sesiones 7–8"));

  // ── A25: Misión Final — Lectura y Planificación ──────────────────────────
  out.push(...activityHeader("A25", "Final Mission — Read & Plan",
    "Misión Final — Lectura y Planificación", "S7", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Identify the scenario, roles, task requirements, and communication function minimums of the Final Mission.",
    "Identificar el escenario, los roles, los requisitos de la tarea y los mínimos de funciones comunicativas de la Misión Final."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Draft a preparation plan for Session 8 assigning practice tasks and reinforcement actions per team member.",
    "Redactar un plan de preparación para la Sesión 8 asignando tareas de práctica y acciones de refuerzo por miembro del equipo."));

  out.push(body("Lea con atención la especificación de la Misión Final. Forme su equipo de tres y asigne roles. Luego complete el plan de preparación."));
  out.push(spacer(60));

  out.push(...boxedText([
    "  MISIÓN FINAL — THE DIESEL WORKSHOP: BAY 2 OPENING BRIEFING",
    "  ─────────────────────────────────────────────────────────────────",
    "  ESCENARIO: Lunes 7:00 AM. Bay 2. The Diesel Workshop, Bogotá.",
    "  El Coordinador de Formación llega a inspeccionar el equipo.",
    "  Carlos abre el briefing de apertura. Valentina y Santiago demuestran",
    "  sus competencias comunicativas en inglés en secuencia natural.",
    "  ─────────────────────────────────────────────────────────────────",
    "  DURACIÓN: 3 a 4 minutos por equipo (cronometrado).",
    "  ─────────────────────────────────────────────────────────────────",
    "  TABLA DE ROLES Y MÍNIMOS DE FUNCIONES:",
  ], "EBF0F5"));

  out.push(simpleTable(
    ["Personaje / Character", "Título", "F1", "F2", "F3", "F4", "F5"],
    [
      ["Carlos Mendoza", "Lead Technician / Supervisor", "≥3", "0", "≥1", "≥1", "≥1"],
      ["Valentina Cruz", "Apprentice", "≥1", "≥2", "≥2", "≥1", "≥2"],
      ["Santiago Ríos", "Technician", "≥1", "≥1", "≥2", "≥1", "≥2"],
    ],
    [22, 25, 9, 9, 9, 9, 17]
  ));
  out.push(spacer(60));

  out.push(boldBody("8 REQUISITOS DE LA TAREA:"));
  const requirements = [
    "1. Carlos abre el briefing identificando el bay: 'Good morning. Bay ___ status report.'",
    "2. Cada miembro usa al menos 3 términos del Toolbelt distintos (15 total entre el equipo).",
    "3. Se cumple el mínimo de funciones comunicativas por rol (ver tabla).",
    "4. Al menos 2 descripciones de condiciones del bay usando There is/are (F3).",
    "5. Al menos 1 solicitud de herramienta usando Can I have / I need (F2).",
    "6. Al menos 2 confirmaciones de comprensión con expresiones variadas (F5).",
    "7. Carlos cierra el briefing: 'Bay ___ is ready. Briefing complete.' o equivalente.",
    "8. Ningún miembro lee sus líneas de apuntes durante la performance.",
  ];
  requirements.forEach(r => out.push(body(r)));
  out.push(spacer(80));

  out.push(boldBody("MI PLAN DE PREPARACIÓN PARA LA SESIÓN 8:"));
  out.push(body("Mi rol en el equipo: ☐ Carlos Mendoza   ☐ Valentina Cruz   ☐ Santiago Ríos"));
  out.push(body("Funciones que más necesito practicar:"));
  out.push(...responseLines(2));
  out.push(body("Términos del Toolbelt que usaré (mínimo 5):"));
  out.push(...responseLines(2));
  out.push(body("Mi plan de ensayo individual antes de S8:"));
  out.push(...responseLines(3));
  out.push(...entregable(
    "Plan de preparación completado + comprensión de requisitos de la Misión Final demostrada",
    "En esta guía",
    "Rol asignado; funciones a reforzar identificadas; plan de ensayo escrito"
  ));

  // ── A26: Tarjeta de Rol ───────────────────────────────────────────────────
  out.push(...activityHeader("A26", "Role Card + Rehearsal Round 1",
    "Tarjeta de Rol + Ensayo Ronda 1", "S7", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Complete the Role Card with personal lines and demonstrate them in Rehearsal Round 1 within the team.",
    "Completar la Tarjeta de Rol con líneas propias y demostrarlas en el Ensayo Ronda 1 con el equipo."));

  out.push(body("Complete su Tarjeta de Rol con las líneas que producirá durante la Misión Final. Estas son sus líneas — no guión memorizado, sino frases de referencia. Durante la performance, NO lea de esta tarjeta."));
  out.push(spacer(60));
  out.push(...boxedText([
    "  TARJETA DE ROL / ROLE CARD",
    "  Nombre del personaje: _______________________   Rol: _______________________",
    "  ─────────────────────────────────────────────────────────────────────",
  ], "FFF8EC"));
  const funciones = ["F1 — Dar instrucciones (mis líneas):", "F2 — Solicitar herramientas:", "F3 — Describir condiciones del bay:", "F4 — Reportar al supervisor:", "F5 — Confirmar comprensión:"];
  funciones.forEach(f => {
    out.push(body(f, true));
    out.push(...responseLines(2));
  });
  out.push(spacer(80));

  out.push(boldBody("ENSAYO RONDA 1 — Peer Observation Sheet (para el equipo observador):"));
  out.push(body("El equipo observador marca ✓ cada vez que aparece una función comunicativa durante el ensayo:"));
  out.push(simpleTable(
    ["Función", "Aparece (✓)", "Términos Toolbelt usados", "Nota de mejora"],
    [
      ["F1 — Instrucción", "", "", ""],
      ["F2 — Solicitud", "", "", ""],
      ["F3 — Condición", "", "", ""],
      ["F4 — Reporte", "", "", ""],
      ["F5 — Confirmación", "", "", ""],
    ],
    [22, 15, 30, 33]
  ));
  out.push(body("Retroalimentación estructurada del equipo observador:"));
  out.push(body("✓ Qué funcionó bien:"));
  out.push(...responseLines(2));
  out.push(body("△ Qué mejorar:"));
  out.push(...responseLines(2));
  out.push(body("? Una pregunta para el equipo:"));
  out.push(...responseLines(1));
  out.push(...entregable(
    "Tarjeta de Rol completada + Peer Observation Sheet diligenciado como equipo observador",
    "En esta guía",
    "Tarjeta de Rol con al menos 1 línea por función activa; Peer Observation con retroalimentación escrita en las 3 categorías"
  ));

  // ── A27: Gap Card Final ─────────────────────────────────────────────────
  out.push(...activityHeader("A27", "Final Gap Card — Self-Assessment",
    "Gap Card Final — Autoevaluación", "S8", "Esta guía"));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Compare current competency level with the initial Gap Card (Session 1) and reflect on personal learning achieved.",
    "Comparar el nivel de competencia actual con la Gap Card inicial (Sesión 1) y reflexionar sobre el aprendizaje personal logrado."));

  out.push(body("Complete la Gap Card Final. Compare sus respuestas con las de la Sesión 1 (Actividad A5). Luego complete la columna L de su tabla KWL (Actividad A4)."));
  out.push(spacer(60));
  const gapFinal = [
    "1. Puedo nombrar 15 de los 20 términos técnicos del Toolbelt en inglés.",
    "2. Puedo clasificar los 20 términos del Toolbelt en sus 5 categorías correctas.",
    "3. Puedo escribir un Daily Inspection Checklist completo en inglés.",
    "4. Puedo describir condiciones del taller usando There is / There are.",
    "5. Puedo dar instrucciones de seguridad usando imperativos en inglés.",
    "6. Puedo participar en una simulación de apertura de taller en inglés.",
  ];
  out.push(simpleTable(
    ["#", "Afirmación", "S1 (antes)", "S8 (ahora)", "¿Logré avance?"],
    gapFinal.map((s, i) => [String(i + 1), s, "", "", ""]),
    [6, 54, 12, 12, 16]
  ));
  out.push(spacer(80));
  out.push(body("Reflexión final (escriba 2-3 oraciones en inglés sobre su aprendizaje):"));
  out.push(...responseLines(3));
  out.push(...entregable(
    "Gap Card Final completada + Columna L del KWL completada + Reflexión escrita",
    "En esta guía",
    "Las 6 afirmaciones de la Gap Card marcadas; ≥3 entradas en la columna L del KWL; reflexión de ≥2 oraciones en inglés"
  ));

  // ── A28: E7 — Misión Final ────────────────────────────────────────────────
  out.push(...activityHeader("A28", "E7 — Final Mission Performance",
    "E7 — Misión Final: Performance", "S8", "Esta guía — SIN apuntes durante la performance"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Perform the complete Bay Opening Briefing (3-4 min) demonstrating all 5 communication functions, 15 Toolbelt terms, and 8 task requirements.",
    "Realizar el Briefing de Apertura de Bay completo (3-4 min) demostrando las 5 funciones comunicativas, 15 términos del Toolbelt y los 8 requisitos de la tarea."));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Demonstrate professional conduct, team coordination, and authentic English communication in a high-stakes performance context.",
    "Demostrar conducta profesional, coordinación de equipo y comunicación auténtica en inglés en un contexto de performance de alta exigencia."));

  out.push(body("El Coordinador de Formación señalará el orden de los equipos. Confirme el bay asignado. El equipo ejecuta el briefing completo sin leer de apuntes. El Coordinador realizará una pregunta de seguimiento sorpresa."));
  out.push(spacer(60));
  out.push(...boxedText([
    "  PROCEDIMIENTO DE PERFORMANCE:",
    "  1. Esperar señal del Coordinador de Formación. Confirmar el bay asignado.",
    "  2. Carlos abre: 'Good morning. Bay ___ status report. This is Carlos Mendoza, Lead Technician.'",
    "  3. Cada miembro demuestra sus funciones en secuencia natural — SIN leer apuntes.",
    "  4. Responder con calma la pregunta sorpresa del Coordinador. Mantener el rol.",
    "  5. Carlos cierra: 'Bay ___ is ready. Briefing complete.' o equivalente.",
  ], "EBF0F5"));
  out.push(spacer(80));
  out.push(...boxedText([
    "  EVIDENCIA 7 — Desempeño  |  Escala de Estimación No 6  |  10 puntos",
    "  Nombre del equipo: ______________________________________",
    "  Rol: ☐ Carlos Mendoza   ☐ Valentina Cruz   ☐ Santiago Ríos",
    "  Bay asignado: ☐ Bay 1   ☐ Bay 2   ☐ Bay 3   Duración: ________ min",
    "  ─────────────────────────────────────────────────────────────",
    "  CRITERIOS DE EVALUACIÓN:",
    "  1. Uso correcto de las 5 funciones comunicativas (F1–F5)     1 - 2 - 3 - 4 - 5",
    "  2. Vocabulario Toolbelt: ≥15 términos entre el equipo        1 - 2 - 3 - 4 - 5",
    "  3. Gramática: imperativos, There is/are, preposiciones       1 - 2 - 3 - 4 - 5",
    "  4. Fluidez y pronunciación comprensible                      1 - 2 - 3 - 4 - 5",
    "  5. Respuesta a pregunta sorpresa del Coordinador             1 - 2 - 3 - 4 - 5",
    "  Puntaje total: ____ / 25 → Calificación: ____ / 10",
  ], "FFF8EC"));
  out.push(...entregable(
    "Performance de la Misión Final — Briefing de apertura de Bay 2 (3-4 minutos)",
    "Oral — equipo de 3 — evaluado en vivo por el Coordinador de Formación",
    "Cumplir los 8 requisitos de la tarea; duración ≥3 min; sin leer apuntes (Evidencia 7 — 10 puntos)"
  ));

  return out;
}

module.exports = { sec32, sec33, sec34 };
