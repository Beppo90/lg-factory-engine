"use strict";
const fs = require("fs");
const path = require("path");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  convertInchesToTwip, PageOrientation, Header, Footer, PageNumber,
  NumberFormat, TableBorders, HeadingLevel
} = docx;

// ─── COLORS ──────────────────────────────────────────────────────────────────
const NAVY   = "1C2B3C";
const ORANGE = "F59316";
const WHITE  = "FFFFFF";
const LGRAY  = "F2F2F2";
const MGRAY  = "D9D9D9";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const pt = n => n * 2; // half-points

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

function grayBox(lines) {
  const children = [];
  lines.forEach(line => {
    children.push(new TextRun({ text: line, size: pt(11), font: "Calibri", break: 1 }));
  });
  return new Paragraph({
    children: [new TextRun({ text: "", size: pt(11) }), ...children],
    shading: { type: ShadingType.CLEAR, fill: LGRAY },
    border: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: MGRAY },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY },
      left:   { style: BorderStyle.SINGLE, size: 4, color: MGRAY },
      right:  { style: BorderStyle.SINGLE, size: 4, color: MGRAY },
    },
    spacing: { before: 100, after: 100 },
    indent: { left: 180, right: 180 },
  });
}

function boxedText(lines, fillColor) {
  const fill = fillColor || LGRAY;
  return lines.map((line, i) => new Paragraph({
    children: [new TextRun({ text: line, size: pt(11), font: "Calibri" })],
    shading: { type: ShadingType.CLEAR, fill },
    border: i === 0 ? {
      top: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
      left: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
      right: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
    } : i === lines.length - 1 ? {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
      left: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
      right: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
    } : {
      left: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
      right: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
    },
    indent: { left: 180, right: 180 },
    spacing: { before: 0, after: 0 },
  }));
}

function body(text, bold, italic, size) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, italics: italic||false, size: pt(size||11), font: "Calibri" })],
    spacing: { before: 60, after: 60 },
    indent: { left: 120, right: 120 },
  });
}

function boldBody(text) { return body(text, true); }

function indent2(text, bold) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, size: pt(11), font: "Calibri" })],
    indent: { left: 360, right: 120 },
    spacing: { before: 40, after: 40 },
  });
}

function responseLine(label) {
  return new Paragraph({
    children: [
      new TextRun({ text: label ? label + " " : "", bold: true, size: pt(11), font: "Calibri" }),
      new TextRun({ text: "_".repeat(80), size: pt(11), font: "Calibri" }),
    ],
    indent: { left: 360, right: 120 },
    spacing: { before: 80, after: 80 },
  });
}

function responseLines(n, label) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(responseLine(i === 0 ? label : ""));
  return arr;
}

function spacer(before) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: before||120, after: 0 } });
}

function hr() {
  return new Paragraph({
    children: [new TextRun("")],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
    spacing: { before: 120, after: 120 },
  });
}

function activityHeader(id, nameEN, nameES, session, materials) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: `${id} — ${nameEN} / ${nameES}`, bold: true, color: WHITE, size: pt(12), font: "Arial" }),
      ],
      shading: { type: ShadingType.CLEAR, fill: "2E4057" },
      spacing: { before: 200, after: 60 },
      indent: { left: 120, right: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `Sesión: ${session}   ·   Materiales: ${materials}`, size: pt(10), font: "Calibri", italics: true })],
      shading: { type: ShadingType.CLEAR, fill: LGRAY },
      spacing: { before: 0, after: 80 },
      indent: { left: 120, right: 120 },
    }),
  ];
}

function dimension(label, en, es) {
  return [
    orangeLabel(`[${label}]`),
    new Paragraph({
      children: [
        new TextRun({ text: "EN: ", bold: true, size: pt(11), font: "Calibri" }),
        new TextRun({ text: en, size: pt(11), font: "Calibri" }),
      ],
      indent: { left: 240, right: 120 },
      spacing: { before: 40, after: 20 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "ES: ", bold: true, size: pt(11), font: "Calibri" }),
        new TextRun({ text: es, size: pt(11), font: "Calibri", italics: true }),
      ],
      indent: { left: 240, right: 120 },
      spacing: { before: 20, after: 80 },
    }),
  ];
}

function entregable(producto, formato, criterio) {
  return [
    new Paragraph({
      children: [new TextRun({ text: "Lineamientos para la entrega", bold: true, color: WHITE, size: pt(11), font: "Arial" })],
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      spacing: { before: 160, after: 60 },
      indent: { left: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Producto: ", bold: true, size: pt(11), font: "Calibri" }),
        new TextRun({ text: producto, size: pt(11), font: "Calibri" }),
      ],
      indent: { left: 240, right: 120 }, spacing: { before: 40, after: 20 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Formato: ", bold: true, size: pt(11), font: "Calibri" }),
        new TextRun({ text: formato, size: pt(11), font: "Calibri" }),
      ],
      indent: { left: 240, right: 120 }, spacing: { before: 20, after: 20 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Criterio mínimo: ", bold: true, size: pt(11), font: "Calibri" }),
        new TextRun({ text: criterio, size: pt(11), font: "Calibri" }),
      ],
      indent: { left: 240, right: 120 }, spacing: { before: 20, after: 100 },
    }),
  ];
}

function simpleTable(headers, rows, colWidths) {
  const w = colWidths || headers.map(() => Math.floor(100 / headers.length));
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })],
        alignment: AlignmentType.CENTER,
      })],
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      width: { size: w[i], type: WidthType.PCT },
      verticalAlign: VerticalAlign.CENTER,
    })),
    tableHeader: true,
  });
  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: String(cell), size: pt(10), font: "Calibri" })],
        alignment: AlignmentType.LEFT,
      })],
      width: { size: w[i], type: WidthType.PCT },
    })),
  }));
  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
  });
}

function quizItem(n, question, a, b, c, correct) {
  const paras = [
    new Paragraph({
      children: [new TextRun({ text: `${n}. ${question}`, bold: true, size: pt(11), font: "Calibri" })],
      indent: { left: 360, right: 120 }, spacing: { before: 120, after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `a) ${a}`, size: pt(11), font: "Calibri" })],
      indent: { left: 540, right: 120 }, spacing: { before: 20, after: 20 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `b) ${b}`, size: pt(11), font: "Calibri" })],
      indent: { left: 540, right: 120 }, spacing: { before: 20, after: 20 },
    }),
  ];
  if (c) paras.push(new Paragraph({
    children: [new TextRun({ text: `c) ${c}`, size: pt(11), font: "Calibri" })],
    indent: { left: 540, right: 120 }, spacing: { before: 20, after: 60 },
  }));
  return paras;
}

// ─── DOCUMENT SECTIONS ───────────────────────────────────────────────────────

function sec1() {
  // Section 1 — Identificación
  const fields = [
    ["Programa de Formación", "Mantenimiento de los Motores Diesel"],
    ["Código del Programa", "123456"],
    ["Versión del Programa", "1.0"],
    ["Nombre del Proyecto", "The Diesel Workshop — Comunicación Técnica en Inglés"],
    ["Fase del Proyecto", "APROPIACIÓN"],
    ["Actividad del Proyecto", "Desarrollar competencias de comunicación técnica en inglés A1.1–A1.2"],
    ["Competencia", "Comunicarse en inglés técnico en contextos de mantenimiento diesel"],
    ["Resultado de Aprendizaje (RAP)", "El aprendiz comunica información técnica básica en inglés en el entorno de mantenimiento de motores diesel"],
    ["Duración de la Guía", "48 horas (6 sesiones × 6h directas + 8h trabajo autónomo distribuido)"],
    ["Ambiente de Formación", "Aula de formación con espacio para trabajo en grupos y simulaciones orales"],
    ["Material de Formación", "Guía de Aprendizaje (este documento, autocontenido)"],
    ["Fecha de Elaboración", "2026-04-15"],
    ["Elaboró", "LG Factory Engine v2.0 · Run: DIESEL-2026-04-18"],
  ];
  return [
    navyHeader("SECCIÓN 1 — IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE"),
    new Paragraph({
      children: [new TextRun({ text: "GFPI-F-135  |  Guía de Aprendizaje No 1.1  |  The Workshop Specialist", bold: true, size: pt(11), font: "Calibri" })],
      alignment: AlignmentType.CENTER, spacing: { before: 120, after: 120 },
    }),
    simpleTable(["Campo", "Información"], fields, [35, 65]),
    spacer(200),
  ];
}

function sec2() {
  return [
    navyHeader("SECCIÓN 2 — PRESENTACIÓN"),
    body("Estimado aprendiz:"),
    body("Bienvenido a The Diesel Workshop. Esta guía de aprendizaje es su hoja de ruta para desarrollar competencias de comunicación técnica en inglés en el nivel CEFR A1.1–A1.2, en el contexto real del mantenimiento de motores diesel."),
    body("A lo largo de ocho sesiones, usted acompañará a Carlos Mendoza (Técnico Líder), Valentina Cruz (Aprendiz) y Santiago Ríos (Técnico) en los bays del taller. Con ellos aprenderá a nombrar herramientas y zonas del taller, leer y escribir documentos técnicos, escuchar y hablar en situaciones reales de trabajo, y demostrar las cinco funciones comunicativas del Workshop Specialist en inglés."),
    body("Esta guía es un documento autocontenido: todos los textos, ejercicios, diálogos, cuestionarios y plantillas de respuesta están incluidos aquí. No necesita materiales adicionales externos. Ábrala, léala y siga las instrucciones de cada actividad."),
    body("Al final de las ocho sesiones, participará en la Misión Final — una simulación completa de apertura de taller en inglés que integrará todo lo aprendido."),
    body("¡Mucho éxito, Workshop Specialist!", true),
    spacer(200),
  ];
}

// ─── SECTION 3.1 — REFLEXIÓN INICIAL (S1–S2) ─────────────────────────────────
function sec31() {
  const out = [];
  out.push(navyHeader("SECCIÓN 3 — ACTIVIDADES DE APRENDIZAJE"));
  out.push(navyHeader("3.1  ACTIVIDAD DE REFLEXIÓN INICIAL — Análisis  |  Sesiones 1–2"));

  // ── A1: El Titular de Seguridad ──────────────────────────────────────────
  out.push(...activityHeader("A1", "The Safety Headline", "El Titular de Seguridad", "S1", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Identify the safety problem described in the headline and relate it to possible causes in a diesel workshop.",
    "Identificar el problema de seguridad descrito en el titular y relacionarlo con posibles causas en un taller diesel."));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Reflect on the personal and professional consequences of poor PPE compliance in technical work environments.",
    "Reflexionar sobre las consecuencias personales y profesionales del incumplimiento del uso de EPP en entornos técnicos."));

  out.push(body("Observe el siguiente titular de prensa y responda las preguntas que siguen, en grupos de tres o cuatro aprendices:"));
  out.push(spacer(80));
  out.push(...boxedText([
    "  THREE MECHANICS HOSPITALIZED AFTER WORKSHOP FIRE",
    "  Investigators blamed poor PPE compliance at the facility.",
    "  Bogotá, Colombia — Motor Age Safety Report",
  ], "EBF0F5"));
  out.push(spacer(80));
  out.push(boldBody("Discussion Questions / Preguntas de discusión:"));
  out.push(body("1. What happened? / ¿Qué sucedió?"));
  out.push(...responseLines(2));
  out.push(body("2. Why did it happen? / ¿Por qué ocurrió?"));
  out.push(...responseLines(2));
  out.push(body("3. What is PPE? / ¿Qué es el EPP?"));
  out.push(...responseLines(2));
  out.push(body("4. What should the mechanics have done? / ¿Qué debieron hacer los mecánicos?"));
  out.push(...responseLines(2));
  out.push(spacer(80));
  out.push(...boxedText([
    "  Useful phrases / Frases útiles:",
    "  I think...  /  Creo que...",
    "  The problem is...  /  El problema es...",
    "  They should...  /  Ellos debieron...",
    "  PPE means...  /  EPP significa...",
  ], "FFF8EC"));
  out.push(...entregable(
    "Respuestas escritas a las 4 preguntas de discusión",
    "En esta guía (espacios provistos)",
    "Mínimo 1 oración por respuesta; mínimo 2 respuestas en inglés"
  ));

  // ── A2: El Mapa del Taller ───────────────────────────────────────────────
  out.push(...activityHeader("A2", "The Workshop Map", "El Mapa del Taller", "S1", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Name in English the seven functional zones of The Diesel Workshop using spatial vocabulary.",
    "Nombrar en inglés las siete zonas funcionales de The Diesel Workshop usando vocabulario espacial."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Describe the location of each workshop zone using the pattern 'This is the ___ . The ___ is next to the ___ .'",
    "Describir la ubicación de cada zona del taller usando el patrón 'This is the ___ . The ___ is next to the ___ .'"));

  out.push(body("Estudie el plano del taller presentado a continuación. Cada zona está numerada. En parejas, escriba dos oraciones de descripción por zona asignada por el instructor, siguiendo el modelo indicado."));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Zona / Zone", "Nombre en inglés / English Name", "Descripción (sus 2 oraciones)"],
    [
      ["1", "Service Bay 1", ""],
      ["2", "Service Bay 2", ""],
      ["3", "Service Bay 3", ""],
      ["4", "Parts Room", ""],
      ["5", "Tool Storage", ""],
      ["6", "Wash Area", ""],
      ["7", "Hazmat Zone", ""],
    ],
    [10, 30, 60]
  ));
  out.push(spacer(80));
  out.push(...boxedText([
    "  Modelo / Model:",
    "  'This is the Service Bay. The Service Bay is next to the Parts Room.'",
    "  'This is the Wash Area. The Wash Area is near the Hazmat Zone.'",
  ], "EBF0F5"));
  out.push(...entregable(
    "Tabla completada con 2 oraciones por zona asignada",
    "En esta guía (tabla de respuesta)",
    "2 oraciones por zona; uso correcto de 'This is' y una preposición de lugar"
  ));

  // ── A3: El Debate del Taller ─────────────────────────────────────────────
  out.push(...activityHeader("A3", "The Workshop Debate", "El Debate del Taller", "S1", "Esta guía"));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Argue your position on three professional statements using agreement and disagreement frames in English.",
    "Argumentar la posición propia sobre tres afirmaciones profesionales usando frases de acuerdo y desacuerdo en inglés."));

  out.push(body("Lea las tres afirmaciones a continuación. Marque su posición (De acuerdo / En desacuerdo) y escriba una razón en inglés. Luego participe en el debate grupal dirigido por el instructor."));
  out.push(spacer(80));

  const debateStmts = [
    "① Preventive maintenance is more important than corrective maintenance.",
    "② A mechanic who doesn't speak English cannot read a diesel engine manual.",
    "③ PPE rules are just bureaucracy — an experienced mechanic doesn't need them.",
  ];
  debateStmts.forEach((stmt, i) => {
    out.push(body(stmt, true));
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "   ☐ I agree  /  De acuerdo     ☐ I disagree  /  En desacuerdo", size: pt(11), font: "Calibri" }),
      ],
      indent: { left: 360 }, spacing: { before: 40, after: 40 },
    }));
    out.push(body("   My reason / Mi razón:"));
    out.push(...responseLines(2));
    out.push(spacer(60));
  });

  out.push(...boxedText([
    "  Frames / Estructuras útiles:",
    "  I think... because...  /  Creo que... porque...",
    "  I agree because...  /  Estoy de acuerdo porque...",
    "  I disagree because...  /  No estoy de acuerdo porque...",
  ], "FFF8EC"));
  out.push(...entregable(
    "Posición marcada y razón escrita para cada una de las 3 afirmaciones",
    "En esta guía",
    "Razón escrita para mínimo 2 de las 3 afirmaciones; mínimo 1 frase en inglés por razón"
  ));

  // ── A4: KWL ─────────────────────────────────────────────────────────────
  out.push(...activityHeader("A4", "KWL — What I Know / Want / Learned", "KWL — Lo que Sé, Quiero y Aprendí", "S1", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Activate prior technical knowledge about diesel workshop tools, safety, and documents.",
    "Activar conocimiento técnico previo sobre herramientas, seguridad y documentos del taller diesel."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Complete the KWL chart individually, filling columns K and W in Session 1 and column L in Session 8.",
    "Completar la tabla KWL individualmente, llenando las columnas K y W en la Sesión 1 y la columna L en la Sesión 8."));

  out.push(body("Complete la tabla KWL. En la Sesión 1, llene las columnas K (lo que ya sabe) y W (lo que quiere aprender). La columna L (lo que aprendió) se llenará al final de la Sesión 8."));
  out.push(spacer(80));
  out.push(simpleTable(
    [
      "K — What I KNOW\nLo que YA SÉ",
      "W — What I WANT to know\nLo que QUIERO aprender",
      "L — What I LEARNED\nLo que APRENDÍ (S8)",
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [33, 33, 34]
  ));
  out.push(...entregable(
    "Tabla KWL con columnas K y W completadas (S1); columna L completada (S8)",
    "En esta guía (tabla)",
    "Mínimo 3 ideas en la columna K y 3 en la columna W en la Sesión 1"
  ));

  // ── A5: Gap Card + Peer Interview ────────────────────────────────────────
  out.push(...activityHeader("A5", "Gap Card + Peer Interview", "Tarjeta de Brecha + Entrevista de Pares", "S1", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Self-assess current level in 6 workshop English competencies using the Gap Card scale.",
    "Autoevaluar el nivel actual en 6 competencias de inglés técnico de taller usando la escala de la Tarjeta de Brecha."));
  out.push(...dimension("ACTITUDINAL — Ser",
    "Recognize personal learning gaps as the starting point for professional growth in technical English.",
    "Reconocer las brechas de aprendizaje propias como punto de partida para el crecimiento profesional en inglés técnico."));

  out.push(body("PARTE 1: Lea cada afirmación de la Gap Card y marque su nivel actual: ✓ = Sí puedo  ◐ = Talvez  ✗ = Aún no."));
  out.push(spacer(60));
  const gapStatements = [
    "Puedo nombrar 15 de las 20 herramientas y términos técnicos en inglés.",
    "Puedo clasificar los términos del taller en sus 5 categorías correctamente.",
    "Puedo escribir un Daily Inspection Checklist completo en inglés.",
    "Puedo describir condiciones del taller usando There is / There are.",
    "Puedo dar instrucciones de seguridad usando imperativos en inglés.",
    "Puedo participar en una simulación de apertura de taller en inglés.",
  ];
  out.push(simpleTable(
    ["#", "Afirmación / Statement", "✓  /  ◐  /  ✗"],
    gapStatements.map((s, i) => [String(i + 1), s, ""]),
    [8, 72, 20]
  ));
  out.push(spacer(80));
  out.push(body("PARTE 2: Con un compañero, realice la siguiente entrevista. El entrevistador pregunta; el entrevistado responde. Luego cambien de rol."));
  out.push(spacer(60));
  const interview = [
    "1. What tools do you use most in your daily work? / ¿Qué herramientas usa más en su trabajo diario?",
    "2. What type of maintenance do you do: preventive or corrective? / ¿Qué tipo de mantenimiento realiza?",
    "3. Do you always wear PPE? Which equipment? / ¿Siempre usa EPP? ¿Cuál?",
    "4. What happens at your workshop when there is a spill? / ¿Qué ocurre en su taller cuando hay un derrame?",
    "5. What English words from the workshop do you already know? / ¿Qué palabras en inglés del taller ya conoce?",
  ];
  interview.forEach(q => {
    out.push(body(q, true));
    out.push(...responseLines(2));
  });
  out.push(...entregable(
    "Gap Card completada (S1) + Respuestas de la entrevista de pares escritas",
    "En esta guía",
    "Todas las 6 casillas de la Gap Card marcadas; mínimo 3 respuestas de la entrevista anotadas"
  ));

  // ── A6: Toolbelt — 20 Términos ───────────────────────────────────────────
  out.push(...activityHeader("A6", "Toolbelt — 20 Technical Terms", "Toolbelt — 20 Términos Técnicos", "S2", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Recognize and define the 20 Toolbelt technical terms organized in 5 workshop categories.",
    "Reconocer y definir los 20 términos técnicos del Toolbelt organizados en 5 categorías del taller."));

  out.push(body("Estudie los 20 términos del Toolbelt presentados a continuación. Son los términos fundamentales del Workshop Specialist. El instructor los presentará uno a uno con imagen y oración contextualizada."));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Categoría", "Término / Term", "Definición A1.1"],
    [
      ["ENVIRONMENT", "workshop", "A place where mechanics repair vehicles / El lugar donde los mecánicos reparan vehículos"],
      ["ENVIRONMENT", "service bay", "The area where a vehicle is repaired / El área donde se repara un vehículo"],
      ["ENVIRONMENT", "workbench", "The table where you organize and use tools / La mesa donde se organizan y usan las herramientas"],
      ["ENVIRONMENT", "toolbox", "The box that holds all your tools / La caja que guarda todas las herramientas"],
      ["TOOLS", "wrench", "A hand tool for turning bolts / Herramienta manual para girar pernos"],
      ["TOOLS", "ratchet", "A tool that turns in one direction; fast in tight spaces / Herramienta que gira en un sentido; eficiente en espacios reducidos"],
      ["TOOLS", "socket", "A piece that fits on the ratchet for different bolt sizes / Pieza que encaja en el ratchet para distintos tamaños de pernos"],
      ["TOOLS", "torque wrench", "Applies the exact force to a bolt — no more, no less / Aplica la fuerza exacta a un perno"],
      ["TOOLS", "floor jack", "Lifts the vehicle safely for inspection / Levanta el vehículo de forma segura"],
      ["SAFETY", "PPE", "Personal Protective Equipment (gloves, goggles, boots, helmet) / Equipo de Protección Personal"],
      ["SAFETY", "safety goggles", "Protect your eyes from sparks and chemicals / Protegen los ojos de chispas y químicos"],
      ["SAFETY", "gloves", "Protect your hands during work / Protegen las manos durante el trabajo"],
      ["SAFETY", "hazard", "A danger in the workshop — something that can hurt you / Un peligro en el taller"],
      ["SAFETY", "spill", "Liquid on the floor (oil, coolant) — a slip hazard / Líquido en el piso — riesgo de caída"],
      ["SAFETY", "fire extinguisher", "Puts out fires — must always be accessible / Extingue incendios — siempre debe ser accesible"],
      ["MAINTENANCE", "preventive maintenance", "Care before a problem happens — regular intervals / Mantenimiento antes de que ocurra un problema"],
      ["MAINTENANCE", "corrective maintenance", "Repair after a problem happens / Reparación después de que ocurre un problema"],
      ["DOCUMENTS", "work order", "The document describing what to repair and how / El documento que describe qué reparar y cómo"],
      ["DOCUMENTS", "checklist", "A list of items to verify — check one by one / Lista de ítems a verificar"],
      ["DOCUMENTS", "calibration", "Making sure a tool is accurate — within tolerance / Verificar que una herramienta es precisa"],
    ],
    [18, 22, 60]
  ));
  out.push(...entregable(
    "Dominio oral de los 20 términos demostrado en el Flashcard Battle",
    "Oral — actividad de pares con tarjetas",
    "Nombrar correctamente ≥15 de los 20 términos al ser mostrada la imagen"
  ));

  // ── A7: Flashcard Battle ─────────────────────────────────────────────────
  out.push(...activityHeader("A7", "Flashcard Battle", "Batalla de Flashcards", "S2", "Esta guía"));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Practice rapid recognition of the 20 Toolbelt terms using competitive paired repetition.",
    "Practicar el reconocimiento rápido de los 20 términos del Toolbelt mediante repetición competitiva en pares."));

  out.push(body("Con su compañero, realice el siguiente procedimiento de práctica:"));
  out.push(indent2("Ronda 1 — Pareja A muestra la imagen; Pareja B dice el término en inglés. Tienen 60 segundos. Cuente cuántos acierta. Cambien de rol."));
  out.push(indent2("Ronda 2 — Pareja A muestra el término escrito; Pareja B lo define: 'It is a tool for ___.' o 'It is in the workshop.' 60 segundos cada uno."));
  out.push(indent2("Ronda 3 — Pareja A describe sin nombrar el término; Pareja B adivina. 90 segundos."));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Ronda", "Rol A", "Rol B", "Tiempo", "Mi puntaje"],
    [
      ["1", "Muestra imagen", "Dice término", "60 seg", "   / 20"],
      ["2", "Muestra término escrito", "Define", "60 seg", "   / 20"],
      ["3", "Describe", "Adivina", "90 seg", "   / 20"],
    ],
    [12, 28, 28, 16, 16]
  ));
  out.push(...entregable(
    "Puntajes registrados en la tabla de las 3 rondas",
    "En esta guía (tabla de puntajes)",
    "Participar en las 3 rondas; puntaje ≥10/20 en al menos una ronda"
  ));

  // ── A8: Lectura Jigsaw ───────────────────────────────────────────────────
  out.push(...activityHeader("A8", "Jigsaw Reading — Tools Every Diesel Technician Needs",
    "Lectura Jigsaw — Herramientas que todo Técnico Diesel Necesita", "S2", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Extract key facts from a specialized technical article using jigsaw cooperative reading.",
    "Extraer hechos clave de un artículo técnico especializado mediante lectura cooperativa jigsaw."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Teach the content of an assigned article section to peers using at least 3 Toolbelt terms.",
    "Enseñar el contenido de una sección del artículo asignada a los compañeros usando al menos 3 términos del Toolbelt."));

  out.push(body("Lea el artículo adaptado a continuación. El instructor asignará una sección a cada grupo experto (Sección 1, 2 o 3). Lea su sección con atención, subrayando los términos del Toolbelt. Luego, en el grupo mixto, enseñe su sección a los compañeros."));
  out.push(spacer(80));

  // Embedded article
  out.push(...boxedText([
    "  TOOLS EVERY DIESEL TECHNICIAN NEEDS",
    "  Adapted from Motor Age Technical Review — A1.1 Level",
    "",
    "  SECTION 1 — HAND TOOLS",
    "  Every diesel technician uses hand tools every day.",
    "  A wrench is for turning bolts. It is a basic tool.",
    "  A ratchet is fast in tight spaces. It turns bolts quickly.",
    "  A socket fits on the ratchet. Different bolts need different sockets.",
    "  Keep your tools in the toolbox. A clean toolbox is a safe toolbox.",
    "",
    "  SECTION 2 — POWER TOOLS AND SAFETY",
    "  A floor jack lifts the vehicle safely. Always check the floor jack before use.",
    "  PPE protects the technician. PPE means Personal Protective Equipment.",
    "  Safety goggles protect your eyes. Gloves protect your hands.",
    "  A fire extinguisher puts out fires. It must always be next to the bay door.",
    "  Never work without PPE. Safety is not optional.",
    "",
    "  SECTION 3 — MEASURING AND DOCUMENTS",
    "  A torque wrench applies the correct force to a bolt — not too much, not too little.",
    "  Calibration ensures accuracy. A tool that is not calibrated can cause damage.",
    "  A work order describes what to fix and how. It is the technician's guide for each job.",
    "  A checklist verifies that every step is complete. Always check — never assume.",
  ], "EBF0F5"));
  out.push(spacer(80));
  out.push(boldBody("Tarjeta de Notas Jigsaw / Jigsaw Note Card (llene SOLO su sección asignada):"));
  out.push(body("Mi sección: ☐ Sección 1 — Hand Tools   ☐ Sección 2 — Power Tools & Safety   ☐ Sección 3 — Measuring & Documents"));
  out.push(body("Herramientas / Tools en mi sección:"));
  out.push(...responseLines(2));
  out.push(body("¿Qué hace cada herramienta? / What does each tool DO?"));
  out.push(...responseLines(3));
  out.push(body("Una oración que quiero enseñar a mis compañeros / One sentence I want to teach:"));
  out.push(...responseLines(2));
  out.push(...entregable(
    "Tarjeta de Notas Jigsaw completada + participación oral enseñando la sección",
    "En esta guía (tarjeta de notas) + oral en grupo",
    "3 herramientas identificadas; 1 oración de enseñanza en inglés producida"
  ));

  // ── A9: Category Race + Gap Fill ────────────────────────────────────────
  out.push(...activityHeader("A9", "Category Race + Gap Fill", "Carrera de Categorías + Relleno de Espacios", "S2", "Esta guía"));
  out.push(...dimension("COGNITIVA — Saber",
    "Classify the 20 Toolbelt terms into their 5 correct workshop categories.",
    "Clasificar los 20 términos del Toolbelt en sus 5 categorías correctas del taller."));
  out.push(...dimension("PROCEDIMENTAL — Hacer",
    "Complete gap-fill sentences using the correct Toolbelt term in context.",
    "Completar oraciones de relleno usando el término correcto del Toolbelt en contexto."));

  out.push(body("PARTE 1 — CARRERA DE CATEGORÍAS: Escriba cada uno de los 20 términos del Toolbelt en su categoría correcta. Tiene 5 minutos. El par que termine primero correctamente gana."));
  out.push(spacer(80));
  out.push(simpleTable(
    ["ENVIRONMENT (4)", "TOOLS (5)", "SAFETY (6)", "MAINTENANCE (2)", "DOCUMENTS (3)"],
    [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]],
    [20, 20, 20, 20, 20]
  ));
  out.push(spacer(120));
  out.push(body("PARTE 2 — GAP FILL: Complete las oraciones con el término correcto del Toolbelt:"));
  out.push(spacer(60));
  const gapFill = [
    "1. The _______________ is always next to the bay door in case of fire.",
    "2. A _______________ applies the exact force to a bolt — not too much, not too little.",
    "3. Carlos tells Valentina: 'Put on your _______________ — protect your eyes.'",
    "4. There is an oil _______________ near Bay 2. Clean it now.",
    "5. The mechanic keeps all tools organized in the _______________ .",
    "6. A _______________ ensures that a measuring tool gives accurate readings.",
    "7. _______________ means regular maintenance before a problem happens.",
    "8. A _______________ is fast in tight spaces — perfect for bolts in small areas.",
  ];
  gapFill.forEach(line => out.push(body(line)));
  out.push(...entregable(
    "Tabla de categorías completada + 8 oraciones de Gap Fill respondidas",
    "En esta guía",
    "Mínimo 16/20 términos clasificados correctamente; mínimo 6/8 oraciones Gap Fill correctas"
  ));

  // ── A10: E1 — Quiz No 1 ─────────────────────────────────────────────────
  out.push(...activityHeader("A10", "Quiz No 1 — E1: Reading Comprehension", "Cuestionario No 1 — E1: Comprensión de Lectura", "S2",
    "Esta guía — SIN apuntes ni Word Wall"));
  out.push(...dimension("COGNITIVA — Saber",
    "Demonstrate comprehension of the article 'Tools Every Diesel Technician Needs' by answering 5 multiple-choice questions without reference materials.",
    "Demostrar comprensión del artículo 'Tools Every Diesel Technician Needs' respondiendo 5 preguntas de selección múltiple sin materiales de consulta."));

  out.push(...boxedText([
    "  EVIDENCIA 1 — Conocimiento  |  Quiz No 1  |  5 puntos",
    "  Instrucciones: Encierre en círculo la letra de la respuesta correcta.",
    "  Trabaje en silencio. Sin Word Wall. Sin apuntes. Sin teléfono.",
    "  Nombre: ________________________________  Ficha: _________  Fecha: _________",
  ], "EBF0F5"));
  out.push(spacer(60));
  out.push(...quizItem(1, "What is the main topic of the article?",
    "Workshop safety rules", "Essential tools for diesel technicians", "How to clean a workshop"));
  out.push(...quizItem(2, "A torque wrench is used to ___.",
    "Lift vehicles", "Apply the correct force to a bolt", "Measure oil levels"));
  out.push(...quizItem(3, "True or False: The ratchet works well in large open spaces.",
    "TRUE", "FALSE", null));
  out.push(...quizItem(4, "Where does a technician keep tools organized?",
    "On the workbench", "In the toolbox", "Under the vehicle"));
  out.push(...quizItem(5, "What does 'calibration' mean in the article?",
    "Cleaning the tool", "Checking that the tool is accurate", "Replacing a broken tool"));
  out.push(...entregable(
    "Cuestionario No 1 respondido (5 ítems selección múltiple)",
    "En esta guía — entregado al instructor al finalizar",
    "Mínimo 3/5 ítems correctos para nivel suficiente (Evidencia 1 — 5 puntos)"
  ));

  return out;
}

module.exports = { sec1, sec2, sec31 };
