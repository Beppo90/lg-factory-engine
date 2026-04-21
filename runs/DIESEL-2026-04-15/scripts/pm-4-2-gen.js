"use strict";
// Generator — PM-4.2 — Cuestionario Consolidado No 6 — 25 ítems
const fs = require("fs");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  Header, Footer, PageNumber, PageBreak,
} = docx;

const DATA = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-15/pm-4-2.json", "utf8"
));

const NAVY = "1C2B3C"; const ORANGE = "F59316"; const WHITE = "FFFFFF";
const LGRAY = "F2F2F2"; const MGRAY = "D9D9D9"; const DGRAY = "555555";
const pt = n => n * 2;

// ─── HELPERS ────────────────────────────────────────────────────────────────

function pageBreak() {
  return new Paragraph({ children: [new TextRun({ break: 1 })] });
}

function navyHeader(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(13), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 200, after: 120 }, indent: { left: 120, right: 120 },
  });
}

function orangeHeader(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(11), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: ORANGE },
    spacing: { before: 140, after: 80 }, indent: { left: 120, right: 120 },
  });
}

function sectionBanner(sec) {
  return new Table({
    rows: [new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: sec.title, bold: true, color: WHITE, size: pt(12), font: "Arial" })] })],
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          width: { size: 65, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 120, right: 80 },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `${sec.points_possible} pts  ·  ${sec.item_count} ítems`, bold: true, color: WHITE, size: pt(10), font: "Arial" })], alignment: AlignmentType.RIGHT })],
          shading: { type: ShadingType.CLEAR, fill: ORANGE },
          width: { size: 35, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 80, right: 120 },
        }),
      ]
    })],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 80, bottom: 40 },
  });
}

function body(text, bold, italic) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, italic: italic||false, size: pt(10.5), font: "Calibri" })],
    spacing: { before: 50, after: 50 }, indent: { left: 120, right: 120 },
  });
}

function bodyIndented(text, bold, italic) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, italic: italic||false, size: pt(10.5), font: "Calibri" })],
    spacing: { before: 40, after: 40 }, indent: { left: 360, right: 120 },
  });
}

function bodySmall(text, bold, italic) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, italic: italic||false, size: pt(9), font: "Calibri", color: DGRAY })],
    spacing: { before: 30, after: 30 }, indent: { left: 120, right: 120 },
  });
}

function spacer(n) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: n||100, after: 0 } });
}

function simpleTable(headers, rows, colWidths) {
  const w = colWidths || headers.map(() => Math.floor(100 / headers.length));
  return new Table({
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(9.5), font: "Calibri" })], alignment: AlignmentType.CENTER })],
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          width: { size: w[i], type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 60, bottom: 60, left: 80, right: 80 },
        })),
      }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((cell, i) => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: pt(9.5), font: "Calibri" })] })],
          shading: { type: ShadingType.CLEAR, fill: ri % 2 === 0 ? WHITE : LGRAY },
          width: { size: w[i], type: WidthType.PCT },
          margins: { top: 55, bottom: 55, left: 80, right: 80 },
        }))
      })),
    ],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
  });
}

// ─── COVER PAGE ─────────────────────────────────────────────────────────────

function coverPage() {
  const h = DATA.header_institucional;
  const ac = DATA.administration_conditions;
  return [
    spacer(300),
    new Paragraph({
      children: [new TextRun({ text: "SENA — SERVICIO NACIONAL DE APRENDIZAJE", bold: true, size: pt(12), font: "Arial", color: NAVY })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: "Mantenimiento de los Motores Diesel — Tecnológico", size: pt(10), font: "Calibri", color: DGRAY })],
      alignment: AlignmentType.CENTER, spacing: { before: 40 },
    }),
    spacer(200),
    new Paragraph({
      children: [new TextRun({ text: "CUESTIONARIO CONSOLIDADO No 6", bold: true, size: pt(20), font: "Arial", color: WHITE })],
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      spacing: { before: 160, after: 160 },
      indent: { left: 200, right: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "EVIDENCIA 6 — S6 «Prove What You Know»", bold: true, size: pt(13), font: "Arial", color: WHITE })],
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: ORANGE },
      spacing: { before: 80, after: 80 },
      indent: { left: 200, right: 200 },
    }),
    spacer(120),
    new Paragraph({
      children: [new TextRun({ text: "The Workshop Specialist  ·  Guía No 1  ·  CEFR A1.1", bold: true, size: pt(12), font: "Arial", color: NAVY })],
      alignment: AlignmentType.CENTER,
    }),
    spacer(200),
    simpleTable(
      ["Sección", "Habilidad", "Ítems", "Puntos"],
      [
        ["S1", "Reading Comprehension", "1–5", "5"],
        ["S2", "Vocabulary", "6–10", "5"],
        ["S3", "Grammar", "11–15", "5"],
        ["S4", "Listening Comprehension", "16–20", "5"],
        ["S5", "Language Functions", "21–25", "5"],
        ["TOTAL", "", "25 ítems", "25 pts"],
      ],
      [15, 40, 20, 25]
    ),
    spacer(200),
    simpleTable(
      ["Parámetro", "Detalle"],
      [
        ["Duración", `${ac.duration_min} minutos`],
        ["Materiales permitidos", ac.materials_permitted],
        ["Formato de respuesta", ac.format],
        ["Sistema de puntuación", ac.scoring],
        ["Sesión", `Sesión ${ac.session} — ${DATA.guide}`],
        ["Referencia", `${h.gfpi_ref} — RAP: ${h.rap_code}`],
      ],
      [25, 75]
    ),
    spacer(200),
    new Paragraph({
      children: [new TextRun({ text: "DISTRIBUIR CARA ABAJO  —  ESTUDIANTES ESCRIBEN NOMBRE Y FECHA ANTES DE VOLTEAR", bold: true, size: pt(10), font: "Arial", color: ORANGE })],
      alignment: AlignmentType.CENTER,
    }),
    pageBreak(),
  ];
}

// ─── STUDENT HEADER ─────────────────────────────────────────────────────────

function studentHeaderBlock() {
  const fields = DATA.student_header.fields;
  const rows1 = [fields[0], fields[1], fields[2]];
  const rows2 = [fields[3], fields[4]];

  return [
    new Table({
      rows: [
        new TableRow({
          children: rows1.map(f => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: f, size: pt(10), font: "Calibri" })] })],
            width: { size: 33, type: WidthType.PCT },
            shading: { type: ShadingType.CLEAR, fill: LGRAY },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
          }))
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: rows2[0], size: pt(10), font: "Calibri" })] })],
              width: { size: 67, type: WidthType.PCT },
              shading: { type: ShadingType.CLEAR, fill: LGRAY },
              margins: { top: 80, bottom: 80, left: 100, right: 100 },
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: rows2[1], size: pt(10), font: "Calibri", bold: true })] })],
              width: { size: 33, type: WidthType.PCT },
              shading: { type: ShadingType.CLEAR, fill: NAVY },
              margins: { top: 80, bottom: 80, left: 100, right: 100 },
            }),
          ]
        }),
      ],
      width: { size: 100, type: WidthType.PCT },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
        left: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
        right: { style: BorderStyle.SINGLE, size: 6, color: NAVY },
      },
    }),
    spacer(80),
  ];
}

// ─── INSTRUCTIONS ────────────────────────────────────────────────────────────

function instructionsBlock() {
  return [
    orangeHeader("INSTRUCTIONS / INSTRUCCIONES"),
    body(DATA.student_instructions.en, true),
    body(DATA.student_instructions.es, false, true),
    spacer(80),
  ];
}

// ─── SECTION BUILDER ─────────────────────────────────────────────────────────

function buildSection(sec) {
  const out = [];
  out.push(sectionBanner(sec));
  if (sec.subtitle) {
    out.push(body(`${sec.subtitle}`, false, true));
  }
  if (sec.context_note) {
    out.push(body(`${sec.context_note}`, false, true));
    if (sec.context_note_es) out.push(body(`${sec.context_note_es}`, false, true));
  }
  // Functions reference for S5
  if (sec.functions_reference) {
    const fr = sec.functions_reference;
    out.push(spacer(40));
    out.push(body("Referencia de funciones:", true));
    Object.entries(fr).forEach(([k, v]) => out.push(bodyIndented(`${k}: ${v}`)));
  }
  out.push(spacer(80));

  sec.items.forEach((item, idx) => {
    const isTF = item.options && (item.options.TRUE !== undefined || item.options.FALSE !== undefined);

    out.push(new Paragraph({
      children: [
        new TextRun({ text: `${item.item_number}. `, bold: true, size: pt(10.5), font: "Calibri" }),
        new TextRun({ text: item.question, size: pt(10.5), font: "Calibri" }),
      ],
      spacing: { before: 80, after: 40 }, indent: { left: 120, right: 120 },
    }));

    if (isTF) {
      out.push(bodyIndented("○  TRUE                    ○  FALSE"));
    } else {
      const opts = Object.entries(item.options);
      opts.forEach(([k, v]) => {
        out.push(bodyIndented(`○  ${k.toUpperCase()})  ${v}`));
      });
    }
    out.push(spacer(60));
  });

  return out;
}

// ─── ANSWER KEY PAGE ─────────────────────────────────────────────────────────

function answerKeyPage() {
  const out = [];
  out.push(pageBreak());
  out.push(navyHeader("CLAVE DE RESPUESTAS — USO EXCLUSIVO DEL INSTRUCTOR"));
  out.push(spacer(60));

  const flat = DATA.consolidated_answer_key.flat;
  const sections = [
    { title: "Sección 1 — Reading", items: [1,2,3,4,5] },
    { title: "Sección 2 — Vocabulary", items: [6,7,8,9,10] },
    { title: "Sección 3 — Grammar", items: [11,12,13,14,15] },
    { title: "Sección 4 — Listening", items: [16,17,18,19,20] },
    { title: "Sección 5 — Language Functions", items: [21,22,23,24,25] },
  ];

  sections.forEach(sec => {
    out.push(orangeHeader(sec.title));
    out.push(simpleTable(
      sec.items.map(n => `Ítem ${n}`),
      [sec.items.map(n => flat[String(n)] || "?")],
      sec.items.map(() => 20)
    ));
    out.push(spacer(60));
  });

  // Score bands
  out.push(navyHeader("BANDAS DE CALIFICACIÓN"));
  const sg = DATA.scoring_guide;
  out.push(simpleTable(
    ["Puntaje", "Banda", "Descripción"],
    [
      ["23–25", "Destacado", sg.score_bands["23_25"]],
      ["18–22", "Competente", sg.score_bands["18_22"]],
      ["13–17", "Básico", sg.score_bands["13_17"]],
      ["8–12", "En proceso", sg.score_bands["8_12"]],
      ["0–7", "No logrado", sg.score_bands["0_7"]],
    ],
    [15, 18, 67]
  ));
  out.push(spacer(80));

  // Section diagnostic
  out.push(navyHeader("DIAGNÓSTICO POR SECCIÓN"));
  out.push(body(sg.section_diagnostic.note, false, true));
  out.push(spacer(60));
  const diag = [
    ["Reading < 3/5", sg.section_diagnostic.reading_low],
    ["Vocabulary < 3/5", sg.section_diagnostic.vocabulary_low],
    ["Grammar < 3/5", sg.section_diagnostic.grammar_low],
    ["Listening < 3/5", sg.section_diagnostic.listening_low],
    ["Functions < 3/5", sg.section_diagnostic.functions_low],
  ];
  out.push(simpleTable(["Sección débil", "Acción de refuerzo recomendada"], diag, [25, 75]));
  out.push(spacer(80));

  // Instructor notes
  out.push(navyHeader("NOTAS PARA EL INSTRUCTOR"));
  const ins = DATA.instructor_notes;
  out.push(body(`Distribución: ${ins.distribution}`));
  out.push(body(`Recolección: ${ins.collection}`));
  out.push(body(`Sesión de revisión: ${ins.review_session}`));
  out.push(body(`Devolución: ${ins.return}`));
  out.push(body(`Contribución: ${ins.contribution}`));

  return out;
}

// ─── ASSEMBLE ────────────────────────────────────────────────────────────────

async function main() {
  console.log("Building PM-4.2 — Cuestionario Consolidado No 6...");

  const testBody = [
    ...coverPage(),
    ...studentHeaderBlock(),
    ...instructionsBlock(),
  ];

  DATA.sections.forEach((sec, idx) => {
    testBody.push(...buildSection(sec));
    if (idx < DATA.sections.length - 1) testBody.push(spacer(120));
  });

  testBody.push(...answerKeyPage());

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [
              new TextRun({ text: `GFPI-F-134  ·  Cuestionario Consolidado No 6  ·  The Workshop Specialist  ·  A1.1`, size: pt(8.5), font: "Calibri", color: "666666" }),
            ],
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              new TextRun({ text: "SENA  ·  Mantenimiento de Motores Diesel  ·  E6 Cuestionario Consolidado  ·  Página ", size: pt(8.5), font: "Calibri", color: "666666" }),
              new TextRun({ children: [PageNumber.CURRENT], size: pt(8.5), font: "Calibri", color: "666666" }),
            ],
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
          })],
        }),
      },
      children: testBody,
    }],
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: pt(10.5) },
          paragraph: { spacing: { line: 276 } },
        },
      },
    },
  });

  const buf = await Packer.toBuffer(doc);

  const OUT1 = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-15/pm-4-2-cuestionario.docx";
  const OUT2 = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-15/pm-4-2-cuestionario.docx";

  fs.writeFileSync(OUT1, buf);
  fs.writeFileSync(OUT2, buf);

  console.log(`✓ Written ${buf.length} bytes`);
  console.log(`  → ${OUT1}`);
  console.log(`  → ${OUT2}`);
}

main().catch(e => { console.error(e); process.exit(1); });
