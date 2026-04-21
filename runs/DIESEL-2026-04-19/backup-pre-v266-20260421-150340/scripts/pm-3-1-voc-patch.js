"use strict";
const fs = require("fs");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  Header, Footer, PageNumber,
} = docx;

const PATHS = {
  json_in:  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-1.json",
  json_out1: "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-1.json",
  json_out2: "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-1.json",
  docx_out1: "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-1-playbook-outline.docx",
  docx_out2: "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-1-playbook-outline.docx",
};

// ─── V+O+C DIMENSIONS TABLE DATA ─────────────────────────────────────────────
const VOC_TABLE = [
  {
    session: 1, nombre: "The Wake-Up Call",
    cognitiva:     "Identificar el problema de seguridad descrito en el titular y relacionarlo con las causas posibles en un taller diesel.",
    procedimental: "Mapear las 7 zonas del taller diesel usando el workshop layout como referencia, describiendo su ubicación con preposiciones de lugar.",
    actitudinal:   "Valorar la importancia de la seguridad y del inglés técnico como herramienta de comunicación profesional en el taller.",
  },
  {
    session: 2, nombre: "Reading the Workshop",
    cognitiva:     "Clasificar los 20 términos del Toolbelt según las cinco categorías del taller de motores diesel.",
    procedimental: "Construir el Word Wall organizando físicamente las tarjetas en su categoría, siguiendo el modelo del instructor.",
    actitudinal:   "Valorar la importancia del vocabulario técnico en inglés como herramienta de comunicación segura en el entorno de mantenimiento de motores.",
  },
  {
    session: 3, nombre: "Write It Right",
    cognitiva:     "Identificar las tres estructuras gramaticales (imperativos, There is/are, preposiciones de lugar) en el texto técnico de la Sesión 2 mediante marcación por colores.",
    procedimental: "Producir un Daily Inspection Checklist y un Work Order completo en inglés aplicando las tres estructuras gramaticales en formato de documento técnico.",
    actitudinal:   "Reconocer la precisión gramatical en inglés como condición necesaria para la documentación técnica segura en el taller diesel.",
  },
  {
    session: 4, nombre: "Tuning In & Speaking Up",
    cognitiva:     "Comprender el diálogo Bay 2 Safety Briefing identificando instrucciones de seguridad, ubicaciones y vocabulario del Toolbelt.",
    procedimental: "Presentar un Workshop Readiness Report oral de 60-90 segundos describiendo el estado del bay usando ≥8 términos del Toolbelt.",
    actitudinal:   "Demostrar responsabilidad profesional al comunicar el estado de seguridad del bay con precisión y sin lectura de apuntes.",
  },
  {
    session: 5, nombre: "The Workshop in Action",
    cognitiva:     "Identificar las 5 funciones comunicativas del Workshop Specialist y las estructuras lingüísticas que activan cada una.",
    procedimental: "Realizar una simulación integrada de apertura de taller demostrando las 5 funciones comunicativas en secuencia natural y coordinada.",
    actitudinal:   "Demostrar trabajo en equipo y conducta profesional en inglés durante la simulación de apertura de taller.",
  },
  {
    session: 6, nombre: "Prove What You Know",
    cognitiva:     "Demostrar dominio integrado de las 5 habilidades de inglés técnico respondiendo 25 ítems del Cuestionario Consolidado sin materiales de apoyo.",
    procedimental: "Completar el diagnóstico por sección e identificar acciones de refuerzo específicas para cada habilidad con puntaje inferior a 3/5.",
    actitudinal:   "Reconocer con honestidad las fortalezas y brechas propias como punto de partida para la preparación de la Misión Final.",
  },
  {
    session: 7, nombre: "Final Mission Preparation",
    cognitiva:     "Analizar los 8 requisitos de la Misión Final e identificar los mínimos de funciones comunicativas asignados al rol propio.",
    procedimental: "Ensayar el briefing de apertura de taller en equipo de 3, incorporando la retroalimentación estructurada de pares en la Ronda 2.",
    actitudinal:   "Comprometerse con la preparación individual y colectiva necesaria para demostrar el nivel A1.1 en la Misión Final.",
  },
  {
    session: 8, nombre: "The Full Circle",
    cognitiva:     "Comparar el nivel actual de competencia con la Gap Card inicial e identificar el progreso logrado a lo largo de las 8 sesiones.",
    procedimental: "Ejecutar la Misión Final completa (3-4 min) demostrando las 5 funciones comunicativas, 15 términos del Toolbelt y los 8 requisitos sin leer de apuntes.",
    actitudinal:   "Celebrar el aprendizaje logrado y comprometerse con la continuación del desarrollo del inglés técnico en el entorno laboral real.",
  },
];

// ─── PATCH JSON ───────────────────────────────────────────────────────────────
const d = JSON.parse(fs.readFileSync(PATHS.json_in, "utf8"));
d.voc_dimensions_table = VOC_TABLE;
d.voc_dimensions_note = "Tabla añadida en rev 2026-04-18. Cada instrucción sigue la fórmula V+O+C: Verbo (infinitivo) + Objeto + Condición. Referencia pedagógica para el instructor.";
const jsonOut = JSON.stringify(d, null, 2);
fs.writeFileSync(PATHS.json_out1, jsonOut);
fs.writeFileSync(PATHS.json_out2, jsonOut);
console.log("✓ JSON patched —", jsonOut.length, "bytes");

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const NAVY = "1C2B3C"; const ORANGE = "F59316"; const WHITE = "FFFFFF";
const LGRAY = "F2F2F2"; const MGRAY = "D9D9D9"; const DGRAY = "4A4A4A";
const pt = n => n * 2;

function navyPar(text, size) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(size||13), font: "Arial" })],
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
function spacer() {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: 120, after: 0 } });
}

// Build the full V+O+C reference table
function buildVocTable() {
  const ORANGE_BG = "FFF3E0";
  const COG_COLOR  = "1565C0"; // deep blue
  const PROC_COLOR = "2E7D32"; // deep green
  const ACT_COLOR  = "7B1FA2"; // deep purple

  // Header row
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell("Sesión", NAVY, WHITE, 14, true),
      cell("COGNITIVA — Saber", "1565C0", WHITE, 12, true),
      cell("PROCEDIMENTAL — Hacer", "2E7D32", WHITE, 12, true),
      cell("ACTITUDINAL — Ser", "7B1FA2", WHITE, 12, true),
    ],
  });

  const dataRows = VOC_TABLE.map((row, i) => {
    const bg = i % 2 === 0 ? "FFFFFF" : LGRAY;
    return new TableRow({
      children: [
        // Session label cell
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: `S${row.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }),
            new Paragraph({ children: [new TextRun({ text: row.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER }),
          ],
          shading: { type: ShadingType.CLEAR, fill: "2E4057" },
          width: { size: 11, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
        }),
        // Cognitiva
        vocCell(row.cognitiva, bg, COG_COLOR),
        // Procedimental
        vocCell(row.procedimental, bg, PROC_COLOR),
        // Actitudinal
        vocCell(row.actitudinal, bg, ACT_COLOR),
      ],
    });
  });

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
  });
}

function cell(text, fill, color, size, bold) {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: bold||false, color: color||"000000", size: pt(size||11), font: "Calibri" })],
      alignment: AlignmentType.CENTER,
    })],
    shading: { type: ShadingType.CLEAR, fill },
    verticalAlign: VerticalAlign.CENTER,
  });
}

function vocCell(text, bg, accentColor) {
  // Parse V+O+C: find the first word (verb) to highlight
  const parts = text.split(" ");
  const verb = parts[0];
  const rest = " " + parts.slice(1).join(" ");
  return new TableCell({
    children: [new Paragraph({
      children: [
        new TextRun({ text: verb, bold: true, size: pt(10), font: "Calibri", color: accentColor }),
        new TextRun({ text: rest, size: pt(10), font: "Calibri", color: "222222" }),
      ],
      spacing: { before: 40, after: 40 },
    })],
    shading: { type: ShadingType.CLEAR, fill: bg },
    width: { size: 29, type: WidthType.PCT },
  });
}

// ─── BUILD DOCX ──────────────────────────────────────────────────────────────
async function main() {
  const overview = d.overview_table;

  // Overview table (existing sessions_summary)
  const overviewRows = overview.map((s, i) => new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({ children: [new TextRun({ text: `S${s.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: s.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER }),
        ],
        shading: { type: ShadingType.CLEAR, fill: "2E4057" },
        width: { size: 15, type: WidthType.PCT },
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: s.foco, size: pt(10), font: "Calibri" })] })],
        width: { size: 55, type: WidthType.PCT },
        shading: { type: ShadingType.CLEAR, fill: i % 2 === 0 ? "FFFFFF" : LGRAY },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: s.habilidades, size: pt(10), font: "Calibri" })] })],
        width: { size: 15, type: WidthType.PCT },
        shading: { type: ShadingType.CLEAR, fill: i % 2 === 0 ? "FFFFFF" : LGRAY },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: s.autonomo || "—", size: pt(9), font: "Calibri", italics: true })] })],
        width: { size: 15, type: WidthType.PCT },
        shading: { type: ShadingType.CLEAR, fill: i % 2 === 0 ? "FFFFFF" : LGRAY },
      }),
    ],
  }));

  const overviewHeader = new TableRow({
    tableHeader: true,
    children: ["Sesión", "Foco", "Habilidades", "Trabajo autónomo"].map((h, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })],
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      width: { size: [15, 55, 15, 15][i], type: WidthType.PCT },
    })),
  });

  const children = [
    // ── COVER ──
    navyPar("PM-3.1 — PLAYBOOK OUTLINE / GUÍA DE APRENDIZAJE 1.1", 14),
    navyPar("The Workshop Specialist  |  Mantenimiento de Motores Diesel  |  CEFR A1.1", 11),
    spacer(),
    body("Run: DIESEL-2026-04-19  ·  Engine: LG Factory Engine v2.0  ·  Rev: 2026-04-18 (+ V+O+C Dimensions)"),
    body("Programa: Mantenimiento de los Motores Diesel  ·  Guía No 1.1  ·  8 sesiones  ·  60h totales"),
    spacer(),

    // ── SESSION ARC OVERVIEW ──
    navyPar("ARCO DE SESIONES — OVERVIEW TABLE", 12),
    body("Leyenda de habilidades: R = Reading  V = Vocabulary  G = Grammar  L = Listening  S = Speaking  W = Writing  ● = foco  ○ = soporte"),
    spacer(),
    new Table({ rows: [overviewHeader, ...overviewRows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } }),
    spacer(),

    // ── V+O+C DIMENSIONS TABLE ──
    navyPar("TABLA DE DIMENSIONES V+O+C — REFERENCIA PEDAGÓGICA POR SESIÓN", 12),
    body("Cada instrucción sigue la fórmula: Verbo (infinitivo) + Objeto + Condición. El verbo de cada instrucción aparece resaltado en el color de su dimensión.", false),
    body("Uso: Esta tabla es referencia interna del instructor para alinear el diseño de actividades con las tres dimensiones de aprendizaje SENA: Saber (cognitiva), Hacer (procedimental) y Ser (actitudinal)."),
    spacer(),
    buildVocTable(),
    spacer(),

    // ── FORMULA REFERENCE ──
    navyPar("FÓRMULA V+O+C — REFERENCIA RÁPIDA", 12),
    new Table({
      rows: [
        new TableRow({ tableHeader: true, children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Dimensión", bold: true, color: WHITE, size: pt(11), font: "Calibri" })] })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: 20, type: WidthType.PCT } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Verbo guía", bold: true, color: WHITE, size: pt(11), font: "Calibri" })] })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: 25, type: WidthType.PCT } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Ejemplo canónico (V + O + C)", bold: true, color: WHITE, size: pt(11), font: "Calibri" })] })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: 55, type: WidthType.PCT } }),
        ]}),
        ...[
          ["COGNITIVA — Saber", "identificar, clasificar, recordar, comprender, analizar, interpretar, relacionar",
           "Clasificar los 20 términos del Toolbelt según las cinco categorías del taller de motores diesel."],
          ["PROCEDIMENTAL — Hacer", "construir, operar, producir, organizar, completar, realizar, presentar, aplicar, redactar",
           "Construir el Word Wall organizando físicamente las tarjetas en su categoría, siguiendo el modelo del instructor."],
          ["ACTITUDINAL — Ser", "valorar, argumentar, reflexionar, demostrar, comprometerse, reconocer",
           "Valorar la importancia del vocabulario técnico en inglés como herramienta de comunicación segura en el entorno de mantenimiento de motores."],
        ].map((row, i) => new TableRow({
          children: row.map((cell, j) => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: cell, size: pt(10), font: "Calibri", bold: j === 0 })] })],
            shading: { type: ShadingType.CLEAR, fill: i % 2 === 0 ? "FFFFFF" : LGRAY },
            width: { size: [20, 25, 55][j], type: WidthType.PCT },
          })),
        })),
      ],
      width: { size: 100, type: WidthType.PCT },
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
    }),
    spacer(),

    // ── SKILLS MAP ──
    navyPar("MAPA DE HABILIDADES Y EVIDENCIAS", 12),
    new Table({
      rows: [
        new TableRow({ tableHeader: true, children: ["Sesión", "Evidencia", "Instrumento", "Tipo", "Pts"].map((h, i) => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })],
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          width: { size: [10, 12, 45, 18, 15][i], type: WidthType.PCT },
        })) }),
        ...[
          ["S2", "E1 — Reading",    "Cuestionario No 1 (5 ítems MC)",             "Conocimiento", "5"],
          ["S3", "E2 — Writing",    "Lista de Verificación No 2 (10 criterios)",   "Producto",     "5"],
          ["S4", "E3 — Listening",  "Cuestionario No 3 (5 ítems MC)",             "Desempeño",    "5"],
          ["S4", "E4 — Speaking",   "Escala de Estimación No 4 (5 criterios)",    "Desempeño",    "5"],
          ["S5", "E5 — Funciones",  "Escala de Estimación No 5 (5 criterios)",    "Desempeño",    "5"],
          ["S6", "E6 — Consolidado","Cuestionario Consolidado No 6 (25 ítems)",   "Conocimiento", "25"],
          ["S8", "E7 — Final Mission","Escala de Estimación No 6 (5 criterios)",  "Desempeño",    "10"],
          ["",   "TOTAL",           "",                                           "",             "60"],
        ].map((r, i) => new TableRow({
          children: r.map((cell, j) => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: cell, size: pt(10), font: "Calibri", bold: r[1] === "TOTAL" })] })],
            shading: { type: ShadingType.CLEAR, fill: r[1] === "TOTAL" ? "E8EAF0" : (i % 2 === 0 ? "FFFFFF" : LGRAY) },
            width: { size: [10, 12, 45, 18, 15][j], type: WidthType.PCT },
          })),
        })),
      ],
      width: { size: 100, type: WidthType.PCT },
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
    }),
    spacer(),

    // ── FOOTER NOTE ──
    body("PM-3.1 Playbook Outline — Documento exclusivo del instructor. No distribuir a aprendices.  |  Rev 2026-04-18 — añade tabla V+O+C Dimensions", false),
  ];

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [new TextRun({ text: "PM-3.1 Playbook Outline  |  The Workshop Specialist  |  DIESEL-2026-04-19", size: pt(9), font: "Calibri", color: "888888" })],
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              new TextRun({ text: "INSTRUCTOR ONLY  ·  SENA Mantenimiento Motores Diesel  ·  Guía 1.1  ·  Pág. ", size: pt(9), font: "Calibri", color: "888888" }),
              new TextRun({ children: [PageNumber.CURRENT], size: pt(9), font: "Calibri", color: "888888" }),
            ],
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
          })],
        }),
      },
      children,
    }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(PATHS.docx_out1, buf);
  fs.writeFileSync(PATHS.docx_out2, buf);
  console.log(`✓ Docx written — ${buf.length} bytes`);
  console.log(`  → ${PATHS.docx_out2}`);
}

main().catch(e => { console.error(e); process.exit(1); });
