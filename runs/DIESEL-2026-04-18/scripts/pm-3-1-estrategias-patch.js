"use strict";
const fs = require("fs");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  Header, Footer, PageNumber,
} = docx;

const JSON_PATH  = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-3-1.json";
const JSON_VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-18/pm-3-1.json";
const DOCX_PATH  = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-3-1-playbook-outline.docx";
const DOCX_VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-18/pm-3-1-playbook-outline.docx";

// ─── ESTRATEGIAS Y TÉCNICAS POR SESIÓN ───────────────────────────────────────
const ESTRATEGIAS = [
  {
    session: 1, nombre: "The Wake-Up Call",
    momento_sena: "3.1 — Reflexión Inicial",
    estrategia: "Aprendizaje Basado en Problemas + Estudio de Casos",
    justificacion: "El titular de prensa ('Three mechanics hospitalized') es la situación problémica detonante que activa el conflicto cognitivo y la necesidad del inglés técnico como respuesta profesional.",
    tecnicas: [
      { bloque: "A", actividad: "Análisis del titular Motor Age", tecnica: "Análisis de situación problémica / preguntas detonantes" },
      { bloque: "B", actividad: "Workshop Map — zonas del taller", tecnica: "Observación activa y descripción guiada" },
      { bloque: "C", actividad: "The Story + The Debate", tecnica: "Debate argumentativo con marcos de acuerdo/desacuerdo" },
      { bloque: "D", actividad: "KWL + Gap Cards + Peer Interview", tecnica: "KWL chart / Diagnóstico / Entrevista de pares" },
    ],
  },
  {
    session: 2, nombre: "Reading the Workshop",
    momento_sena: "3.1 — Reflexión Inicial (cierre) → 3.2 Contextualización",
    estrategia: "Aprendizaje Basado en Tareas",
    justificacion: "La tarea es leer un texto técnico real, clasificar el léxico por categorías y construir el Word Wall. La tarea tiene producto concreto (Word Wall + cuestionario E1) y es auténtica del entorno diesel.",
    tecnicas: [
      { bloque: "A", actividad: "Word Wall Setup — 20 términos Toolbelt", tecnica: "Construcción de organizador visual (Word Wall)" },
      { bloque: "B", actividad: "Pre-Reading + Jigsaw Reading", tecnica: "Lectura cooperativa Jigsaw (grupos expertos)" },
      { bloque: "C", actividad: "Category Race + Gap Fill", tecnica: "Carrera de categorías / Relleno de espacios en contexto" },
      { bloque: "D", actividad: "Comprehension Check — E1", tecnica: "Cuestionario de comprensión lectora (Evidencia 1)" },
    ],
  },
  {
    session: 3, nombre: "Write It Right",
    momento_sena: "3.2 — Contextualización",
    estrategia: "Aprendizaje Basado en Tareas",
    justificacion: "La tarea es producir dos documentos técnicos reales del taller: Daily Inspection Checklist y Work Order. Las actividades de gramática son andamiaje funcional para ejecutar esa tarea de escritura (E2).",
    tecnicas: [
      { bloque: "A", actividad: "Grammar Induction desde el texto S2 + Error Log", tecnica: "Inducción gramatical por descubrimiento de colores / Error Log diagnóstico" },
      { bloque: "B", actividad: "Grammar Stations — 3 estaciones rotativas", tecnica: "Estaciones de práctica rotativas (Imperatives / There is-are / Prepositions)" },
      { bloque: "C", actividad: "Genre Analysis + Modeled Writing", tecnica: "Análisis de género textual / Escritura modelada co-construida" },
      { bloque: "D", actividad: "Independent Writing + Peer Review — E2", tecnica: "Producción escrita individual / Revisión entre pares (Lista de Verificación No 2)" },
    ],
  },
  {
    session: 4, nombre: "Tuning In & Speaking Up",
    momento_sena: "3.3 — Apropiación",
    estrategia: "Aprendizaje Basado en Tareas + Simulaciones",
    justificacion: "La tarea de escucha es comprender el Bay 2 Safety Briefing en condiciones de evaluación real. La tarea oral es presentar un Workshop Readiness Report en rol de técnico ante un supervisor real (el instructor), simulando el entorno productivo.",
    tecnicas: [
      { bloque: "A", actividad: "Scene Setup + Pre-Listening", tecnica: "Activación de esquemas previos / Predicción temática" },
      { bloque: "B", actividad: "First Listen (global) + Second Listen (detail)", tecnica: "Escucha activa secuencial: comprensión global → comprensión de detalle" },
      { bloque: "C", actividad: "Comprehension Check — E3 (Cuestionario No 3)", tecnica: "Cuestionario de comprensión auditiva (Evidencia 3)" },
      { bloque: "E", actividad: "Live Oral Performance — E4 (Workshop Readiness Report)", tecnica: "Demostración oral en vivo / Role-play supervisor–técnico" },
    ],
  },
  {
    session: 5, nombre: "The Workshop in Action",
    momento_sena: "3.3 — Apropiación",
    estrategia: "Simulaciones + Aprendizaje Basado en Tareas",
    justificacion: "La sesión completa recrea la apertura operativa de un bay diesel. Las 5 funciones comunicativas se practican en drills y se integran en una simulación de 3-4 minutos que replica con fidelidad el contexto productivo real.",
    tecnicas: [
      { bloque: "A", actividad: "Communication Function Map — F1 a F5", tecnica: "Mapa de funciones comunicativas (organizador gráfico relacional)" },
      { bloque: "B", actividad: "Function Drills F1–F5 en parejas", tecnica: "Drills de práctica estímulo-respuesta por función" },
      { bloque: "C", actividad: "Integrated Simulation — E5 (apertura de taller)", tecnica: "Simulación integrada de role-play / Observación entre pares (Peer Observation Sheet)" },
      { bloque: "D", actividad: "Synthesis Card + Quiz Preview", tecnica: "Tarjeta de síntesis personal / Vista previa del Cuestionario Consolidado" },
    ],
  },
  {
    session: 6, nombre: "Prove What You Know",
    momento_sena: "3.3 — Apropiación (evaluación formativa integradora)",
    estrategia: "Seminario Investigativo + Evaluación Formativa Integrada",
    justificacion: "El Cuestionario Consolidado No 6 actúa como instrumento de indagación sobre el propio aprendizaje. La revisión colectiva de respuestas y el diagnóstico por sección promueven la metacognición y la construcción crítica del conocimiento sobre las brechas restantes.",
    tecnicas: [
      { bloque: "A", actividad: "Cuestionario Consolidado No 6 — E6 (25 ítems)", tecnica: "Cuestionario consolidado de selección múltiple (Evidencia 6)" },
      { bloque: "B", actividad: "Revisión grupal de respuestas + retroalimentación oral", tecnica: "Socialización de resultados / Conversatorio argumentado" },
      { bloque: "C", actividad: "Diagnóstico reflexivo + Gráfico de Progresión", tecnica: "Diagnóstico por sección / Gráfico de progresión de habilidades (5 dimensiones)" },
    ],
  },
  {
    session: 7, nombre: "Final Mission Preparation",
    momento_sena: "3.4 — Transferencia (preparación)",
    estrategia: "Simulaciones + Aprendizaje Basado en Tareas",
    justificacion: "Los ensayos en S7 son ensayos de transferencia controlada: el aprendiz aplica todo lo aprendido en S1-S6 en un entorno simulado del sector productivo con retroalimentación inmediata entre pares y del instructor.",
    tecnicas: [
      { bloque: "A", actividad: "Bay Inspection — Asignación de bay y roles", tecnica: "Taller de práctica / Lectura de especificación de tarea" },
      { bloque: "B", actividad: "Rehearsal Ronda 1 — Preparación y ensayo", tecnica: "Ensayo guiado en equipo de 3 + Peer Observation Sheet" },
      { bloque: "C", actividad: "Supervisor Feedback en vivo", tecnica: "Simulación con retroalimentación estructurada entre pares (3 categorías)" },
      { bloque: "D", actividad: "Segundo Ensayo con mejoras incorporadas", tecnica: "Práctica de campo (segundo ensayo con incorporación de feedback)" },
    ],
  },
  {
    session: 8, nombre: "The Full Circle",
    momento_sena: "3.4 — Transferencia (performance final)",
    estrategia: "Simulaciones",
    justificacion: "S8 es la transferencia plena al entorno productivo: la Misión Final recrea una apertura real de bay diesel ante un Coordinador de Formación. Es la demostración auténtica del RAP en contexto de taller.",
    tecnicas: [
      { bloque: "A", actividad: "Final Mission — Bay Opening Briefing en vivo (E7)", tecnica: "Simulación de entorno productivo real / Performance evaluada (Escala de Estimación No 6)" },
      { bloque: "B", actividad: "Cierre reflexivo + Redistribución Gap Cards S1", tecnica: "Reflexión circular de cierre / Redistribución de Gap Cards (antes–después)" },
    ],
  },
];

// ─── PATCH JSON ───────────────────────────────────────────────────────────────
const d = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

d.sessions_detail.forEach(s => {
  const est = ESTRATEGIAS.find(e => e.session === s.session);
  if (est) {
    s.logistics_box = s.logistics_box || {};
    s.logistics_box.momento_sena     = est.momento_sena;
    s.logistics_box.estrategia       = est.estrategia;
    s.logistics_box.justificacion    = est.justificacion;
    s.logistics_box.tecnicas         = est.tecnicas;
  }
});

d.estrategias_resumen = {
  nota: "Las estrategias didácticas activas cubren los cuatro momentos del ciclo SENA. La estrategia dominante del programa es Aprendizaje Basado en Tareas (S2-S5, S7), complementada con Aprendizaje Basado en Problemas (S1), Simulaciones (S4-S5, S7-S8) y Evaluación Formativa Integrada (S6).",
  ciclo_sena: {
    "3.1_reflexion_inicial": "S1 (Aprendizaje Basado en Problemas) + S2 (Aprendizaje Basado en Tareas)",
    "3.2_contextualizacion": "S3 (Aprendizaje Basado en Tareas)",
    "3.3_apropiacion":       "S4–S5 (ABT + Simulaciones) + S6 (Evaluación formativa)",
    "3.4_transferencia":     "S7–S8 (Simulaciones)",
  },
};

const jsonOut = JSON.stringify(d, null, 2);
fs.writeFileSync(JSON_PATH, jsonOut);
fs.writeFileSync(JSON_VAULT, jsonOut);
console.log("✓ JSON patched —", jsonOut.length, "bytes");

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const NAVY = "1C2B3C"; const WHITE = "FFFFFF"; const LGRAY = "F2F2F2";
const MGRAY = "D9D9D9"; const ORANGE = "F59316";
const pt = n => n * 2;

function navyPar(text, size) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(size||12), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 200, after: 100 }, indent: { left: 120, right: 120 },
  });
}
function body(text, bold) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, size: pt(11), font: "Calibri" })],
    spacing: { before: 60, after: 60 }, indent: { left: 120, right: 120 },
  });
}
function indent2(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: pt(10), font: "Calibri" })],
    indent: { left: 360, right: 120 }, spacing: { before: 30, after: 30 },
  });
}
function spacer() { return new Paragraph({ children: [new TextRun("")], spacing: { before: 140, after: 0 } }); }

// MOMENTO color map
const MOMENTO_COLORS = {
  "3.1": "1A5276", // dark blue
  "3.2": "1D6A54", // dark green
  "3.3": "7E5109", // dark amber
  "3.4": "6C3483", // dark purple
};

function momentoColor(momento) {
  for (const k of Object.keys(MOMENTO_COLORS)) {
    if (momento.startsWith(k)) return MOMENTO_COLORS[k];
  }
  return NAVY;
}

// ─── BUILD STRATEGIES TABLE ───────────────────────────────────────────────────
function buildEstrategiasTable() {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      mkH("Sesión", NAVY, 11),
      mkH("Momento SENA", NAVY, 18),
      mkH("Estrategia Didáctica", NAVY, 25),
      mkH("Técnicas Didácticas por Actividad", NAVY, 46),
    ],
  });

  const dataRows = ESTRATEGIAS.map((row, i) => {
    const mc = momentoColor(row.momento_sena);
    const bg = i % 2 === 0 ? "FFFFFF" : LGRAY;

    // Técnicas cell: one line per bloque
    const tecnicasChildren = row.tecnicas.map(t =>
      new Paragraph({
        children: [
          new TextRun({ text: `[${t.bloque}] `, bold: true, size: pt(10), font: "Calibri", color: NAVY }),
          new TextRun({ text: t.actividad + " → ", size: pt(10), font: "Calibri", italics: true, color: "555555" }),
          new TextRun({ text: t.tecnica, size: pt(10), font: "Calibri", bold: true }),
        ],
        spacing: { before: 30, after: 30 },
      })
    );

    return new TableRow({
      children: [
        // Sesión
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: `S${row.session}`, bold: true, size: pt(12), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }),
            new Paragraph({ children: [new TextRun({ text: row.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER }),
          ],
          shading: { type: ShadingType.CLEAR, fill: "2E4057" },
          width: { size: 11, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
        }),
        // Momento
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.momento_sena, bold: true, size: pt(10), font: "Calibri", color: WHITE })] })],
          shading: { type: ShadingType.CLEAR, fill: mc },
          width: { size: 18, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
        }),
        // Estrategia + justificación
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: row.estrategia, bold: true, size: pt(10), font: "Calibri" })], spacing: { before: 30, after: 30 } }),
            new Paragraph({ children: [new TextRun({ text: row.justificacion, size: pt(9), font: "Calibri", italics: true, color: "555555" })], spacing: { before: 20, after: 20 } }),
          ],
          shading: { type: ShadingType.CLEAR, fill: bg },
          width: { size: 25, type: WidthType.PCT },
        }),
        // Técnicas
        new TableCell({
          children: tecnicasChildren,
          shading: { type: ShadingType.CLEAR, fill: bg },
          width: { size: 46, type: WidthType.PCT },
        }),
      ],
    });
  });

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
  });
}

function mkH(text, fill, w) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })],
    shading: { type: ShadingType.CLEAR, fill: fill || NAVY },
    width: { size: w, type: WidthType.PCT },
    verticalAlign: VerticalAlign.CENTER,
  });
}

// ─── RESUMEN TABLE (estrategia dominante por momento) ────────────────────────
function buildResumenTable() {
  const rows = [
    ["3.1 — Reflexión Inicial", "S1–S2", "Aprendizaje Basado en Problemas · Aprendizaje Basado en Tareas",
     "Análisis de situación problémica · Debate argumentativo · KWL chart · Lectura cooperativa Jigsaw · Construcción Word Wall"],
    ["3.2 — Contextualización", "S3", "Aprendizaje Basado en Tareas",
     "Inducción gramatical por descubrimiento · Error Log · Estaciones rotativas · Escritura técnica guiada · Revisión entre pares"],
    ["3.3 — Apropiación", "S4–S6", "ABT + Simulaciones · Evaluación Formativa",
     "Escucha activa · Demostración oral · Role-play · Mapa de funciones · Drills F1–F5 · Simulación integrada · Cuestionario consolidado"],
    ["3.4 — Transferencia", "S7–S8", "Simulaciones",
     "Taller de práctica · Peer Observation Sheet · Performance evaluada · Reflexión circular de cierre"],
  ];
  const colors = ["1A5276", "1D6A54", "7E5109", "6C3483"];
  const header = new TableRow({ tableHeader: true, children: ["Momento SENA", "Sesiones", "Estrategia Didáctica", "Técnicas Didácticas"].map((h, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: [22, 10, 28, 40][i], type: WidthType.PCT } })) });
  const dataRows = rows.map((r, i) => new TableRow({ children: r.map((cell, j) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: cell, bold: j===0, size: pt(10), font: "Calibri", color: j===0 ? WHITE : "222222" })] })], shading: { type: ShadingType.CLEAR, fill: j===0 ? colors[i] : (i%2===0?"FFFFFF":LGRAY) }, width: { size: [22, 10, 28, 40][j], type: WidthType.PCT } })) }));
  return new Table({ rows: [header, ...dataRows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } });
}

// ─── REUSE HELPERS FROM PREVIOUS PATCHES ─────────────────────────────────────
function buildAmbMatTable() {
  const headerRow = new TableRow({ tableHeader: true, children: [mkH("Sesión", NAVY, 11), mkH("Ambiente de Aprendizaje", "2E4057", 34), mkH("Materiales de Formación", "2E4057", 55)] });
  const dataRows = d.sessions_detail.map((s, i) => {
    const bg = i % 2 === 0 ? "FFFFFF" : LGRAY;
    const lb = s.logistics_box || {};
    return new TableRow({ children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `S${s.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }), new Paragraph({ children: [new TextRun({ text: s.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER })], shading: { type: ShadingType.CLEAR, fill: "2E4057" }, width: { size: 11, type: WidthType.PCT }, verticalAlign: VerticalAlign.CENTER }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lb.ambiente || "—", size: pt(10), font: "Calibri" })] })], shading: { type: ShadingType.CLEAR, fill: bg }, width: { size: 34, type: WidthType.PCT } }),
      new TableCell({ children: (lb.materiales||[]).slice(0,10).map(m => new Paragraph({ children: [new TextRun({ text: "· ", bold: true, size: pt(10), font: "Calibri", color: NAVY }), new TextRun({ text: m, size: pt(10), font: "Calibri" })], spacing: { before: 20, after: 20 } })), shading: { type: ShadingType.CLEAR, fill: bg }, width: { size: 55, type: WidthType.PCT } }),
    ]});
  });
  return new Table({ rows: [headerRow, ...dataRows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } });
}

function buildVocTable() {
  const VOC = d.voc_dimensions_table || [];
  function vocCell(text, bg, ac) { const parts = text.split(" "); return new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: parts[0], bold: true, size: pt(10), font: "Calibri", color: ac }), new TextRun({ text: " " + parts.slice(1).join(" "), size: pt(10), font: "Calibri" })], spacing: { before: 40, after: 40 } })], shading: { type: ShadingType.CLEAR, fill: bg }, width: { size: 29, type: WidthType.PCT } }); }
  const header = new TableRow({ tableHeader: true, children: [mkH("Sesión", NAVY, 11), mkH("COGNITIVA — Saber", "1565C0", 29), mkH("PROCEDIMENTAL — Hacer", "2E7D32", 29), mkH("ACTITUDINAL — Ser", "7B1FA2", 29)] });
  const rows = VOC.map((row, i) => { const bg = i%2===0?"FFFFFF":LGRAY; return new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `S${row.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }), new Paragraph({ children: [new TextRun({ text: row.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER })], shading: { type: ShadingType.CLEAR, fill: "2E4057" }, width: { size: 11, type: WidthType.PCT }, verticalAlign: VerticalAlign.CENTER }), vocCell(row.cognitiva, bg, "1565C0"), vocCell(row.procedimental, bg, "2E7D32"), vocCell(row.actitudinal, bg, "7B1FA2")] }); });
  return new Table({ rows: [header, ...rows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } });
}

function buildOverviewTable() {
  const ov = d.overview_table;
  const header = new TableRow({ tableHeader: true, children: ["Sesión","Foco pedagógico","Habilidades","Trabajo autónomo"].map((h,i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text:h, bold:true, color:WHITE, size:pt(10), font:"Calibri" })], alignment:AlignmentType.CENTER })], shading:{type:ShadingType.CLEAR,fill:NAVY}, width:{size:[13,57,13,17][i],type:WidthType.PCT} })) });
  const rows = ov.map((s,i) => new TableRow({ children: [new TableCell({ children: [new Paragraph({children:[new TextRun({text:`S${s.session}`,bold:true,size:pt(11),font:"Arial",color:WHITE})],alignment:AlignmentType.CENTER}),new Paragraph({children:[new TextRun({text:s.nombre,size:pt(9),font:"Calibri",color:WHITE,italics:true})],alignment:AlignmentType.CENTER})], shading:{type:ShadingType.CLEAR,fill:"2E4057"}, width:{size:13,type:WidthType.PCT}, verticalAlign:VerticalAlign.CENTER }), new TableCell({children:[new Paragraph({children:[new TextRun({text:s.foco,size:pt(10),font:"Calibri"})]})],shading:{type:ShadingType.CLEAR,fill:i%2===0?"FFFFFF":LGRAY},width:{size:57,type:WidthType.PCT}}), new TableCell({children:[new Paragraph({children:[new TextRun({text:s.habilidades,size:pt(10),font:"Calibri"})]})],shading:{type:ShadingType.CLEAR,fill:i%2===0?"FFFFFF":LGRAY},width:{size:13,type:WidthType.PCT}}), new TableCell({children:[new Paragraph({children:[new TextRun({text:s.autonomo||"—",size:pt(10),font:"Calibri",italics:true})]})],shading:{type:ShadingType.CLEAR,fill:i%2===0?"FFFFFF":LGRAY},width:{size:17,type:WidthType.PCT}}) ] }));
  return new Table({rows:[header,...rows],width:{size:100,type:WidthType.PCT},margins:{top:60,bottom:60,left:80,right:80}});
}

function buildEvidenciasTable() {
  const erows=[["S2","E1 — Reading","Cuestionario No 1 (5 ítems MC)","Conocimiento","5"],["S3","E2 — Writing","Lista de Verificación No 2 (10 criterios)","Producto","5"],["S4","E3 — Listening","Cuestionario No 3 (5 ítems MC)","Desempeño","5"],["S4","E4 — Speaking","Escala de Estimación No 4 (5 criterios)","Desempeño","5"],["S5","E5 — Funciones","Escala de Estimación No 5 (5 criterios)","Desempeño","5"],["S6","E6 — Consolidado","Cuestionario Consolidado No 6 (25 ítems)","Conocimiento","25"],["S8","E7 — Misión Final","Escala de Estimación No 6 (5 criterios)","Desempeño","10"],["","TOTAL","","","60"]];
  const w=[8,16,47,17,12];
  const h=new TableRow({tableHeader:true,children:["Ses.","Evidencia","Instrumento","Tipo","Pts"].map((h,i)=>new TableCell({children:[new Paragraph({children:[new TextRun({text:h,bold:true,color:WHITE,size:pt(10),font:"Calibri"})],alignment:AlignmentType.CENTER})],shading:{type:ShadingType.CLEAR,fill:NAVY},width:{size:w[i],type:WidthType.PCT}}))});
  const dr=erows.map((r,i)=>new TableRow({children:r.map((c,j)=>new TableCell({children:[new Paragraph({children:[new TextRun({text:c,size:pt(10),font:"Calibri",bold:r[1]==="TOTAL"})]})],shading:{type:ShadingType.CLEAR,fill:r[1]==="TOTAL"?"E8EAF0":(i%2===0?"FFFFFF":LGRAY)},width:{size:w[j],type:WidthType.PCT}}))}));
  return new Table({rows:[h,...dr],width:{size:100,type:WidthType.PCT},margins:{top:60,bottom:60,left:80,right:80}});
}

// ─── ASSEMBLE FULL DOCX ───────────────────────────────────────────────────────
async function main() {
  const children = [
    navyPar("PM-3.1 — PLAYBOOK OUTLINE  |  Guía 1.1: The Workshop Specialist", 13),
    navyPar("Mantenimiento de los Motores Diesel  |  CEFR A1.1  |  8 sesiones  |  60h  |  INSTRUCTOR ONLY", 10),
    spacer(),
    body("Run: DIESEL-2026-04-18  ·  Rev: 2026-04-18 v1.3 — Estrategias + Técnicas Didácticas + Ambientes + V+O+C"),
    spacer(),

    // 1. Overview
    navyPar("1. ARCO DE SESIONES — OVERVIEW", 11),
    body("Leyenda: R=Reading  V=Vocabulary  G=Grammar  L=Listening  S=Speaking  W=Writing  ●foco  ○soporte"),
    spacer(),
    buildOverviewTable(),
    spacer(),

    // 2. Estrategias + Técnicas
    navyPar("2. ESTRATEGIAS DIDÁCTICAS ACTIVAS Y TÉCNICAS DIDÁCTICAS POR SESIÓN", 11),
    body("Estrategia didáctica: orientación metodológica global que guía el diseño de la sesión. Técnica didáctica: acción específica asignada a cada actividad para ejecutarla de forma práctica.", false),
    spacer(),
    buildResumenTable(),
    spacer(),
    body("Tabla detallada por sesión:", true),
    spacer(),
    buildEstrategiasTable(),
    spacer(),

    // 3. Ambientes + Materiales
    navyPar("3. AMBIENTES DE APRENDIZAJE Y MATERIALES DE FORMACIÓN", 11),
    body("Ambiente: espacio físico exacto con condiciones específicas por sesión. Materiales: recursos didácticos, impresos, consumibles y tecnología necesarios para la ejecución de la tarea."),
    spacer(),
    buildAmbMatTable(),
    spacer(),
    body("Recursos fijos en todas las sesiones: proyector · pizarra con marcadores · conexión eléctrica · mesas reconfigurables · Word Wall en pared (S2–S8).", false),
    spacer(),

    // 4. V+O+C
    navyPar("4. DIMENSIONES DE APRENDIZAJE V+O+C POR SESIÓN", 11),
    body("Fórmula: Verbo (infinitivo) + Objeto + Condición. Azul = Cognitiva · Verde = Procedimental · Morado = Actitudinal."),
    spacer(),
    buildVocTable(),
    spacer(),

    // 5. Evidencias
    navyPar("5. MAPA DE EVIDENCIAS Y EVALUACIÓN", 11),
    buildEvidenciasTable(),
    spacer(),

    // 6. Notas
    navyPar("6. NOTAS PEDAGÓGICAS", 11),
    ...(d.notes || []).map(n => indent2("· " + n)),
    spacer(),

    body("PM-3.1 v1.3  |  DIESEL-2026-04-18  |  Instructor only"),
  ];

  const doc = new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "PM-3.1 Playbook Outline  |  The Workshop Specialist  |  DIESEL-2026-04-18  |  INSTRUCTOR ONLY", size: pt(9), font: "Calibri", color: "888888" })], alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } } })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ children: [new TextRun({ text: "SENA  ·  Mantenimiento Motores Diesel  ·  Guía 1.1  ·  v1.3  ·  Pág. ", size: pt(9), font: "Calibri", color: "888888" }), new TextRun({ children: [PageNumber.CURRENT], size: pt(9), font: "Calibri", color: "888888" })], alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } } })] }) },
      children,
    }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(DOCX_PATH, buf);
  fs.writeFileSync(DOCX_VAULT, buf);
  console.log(`✓ Docx escrito — ${buf.length} bytes → vault`);
}

main().catch(e => { console.error(e); process.exit(1); });
