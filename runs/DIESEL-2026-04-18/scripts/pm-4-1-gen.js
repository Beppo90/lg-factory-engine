"use strict";
// Generator — PM-4.1 — Instrumentos de Evaluación (E1–E6 + Final Mission)
const fs = require("fs");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  Header, Footer, PageNumber, convertInchesToTwip, PageBreak,
} = docx;

const DATA = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-4-1.json", "utf8"
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
    spacing: { before: 160, after: 80 }, indent: { left: 120, right: 120 },
  });
}

function body(text, bold, italic) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, italic: italic||false, size: pt(10.5), font: "Calibri" })],
    spacing: { before: 50, after: 50 }, indent: { left: 120, right: 120 },
  });
}

function bodySmall(text, bold) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, size: pt(9), font: "Calibri", color: DGRAY })],
    spacing: { before: 30, after: 30 }, indent: { left: 120, right: 120 },
  });
}

function spacer(n) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: n||100, after: 0 } });
}

function hrLine() {
  return new Paragraph({
    children: [new TextRun("")],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
    spacing: { before: 60, after: 60 },
  });
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
          margins: { top: 60, bottom: 60, left: 80, right: 80 },
        }))
      })),
    ],
    width: { size: 100, type: WidthType.PCT },
  });
}

// Student header fields row
function studentHeaderTable(fields) {
  return new Table({
    rows: [
      new TableRow({
        children: fields.map(f => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: f, size: pt(9.5), font: "Calibri" })] })],
          width: { size: Math.floor(100 / fields.length), type: WidthType.PCT },
          margins: { top: 60, bottom: 60, left: 80, right: 80 },
          shading: { type: ShadingType.CLEAR, fill: LGRAY },
        }))
      })
    ],
    width: { size: 100, type: WidthType.PCT },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      left: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      right: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      insideH: { style: BorderStyle.NONE },
      insideV: { style: BorderStyle.SINGLE, size: 2, color: MGRAY },
    },
  });
}

// ─── COVER PAGE ─────────────────────────────────────────────────────────────

function coverPage() {
  const h = DATA.header_institucional;
  return [
    spacer(400),
    new Paragraph({
      children: [new TextRun({ text: "SENA — SERVICIO NACIONAL DE APRENDIZAJE", bold: true, size: pt(12), font: "Arial", color: NAVY })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: h.programa.toUpperCase(), bold: true, size: pt(11), font: "Arial", color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { before: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `Tecnología | Intensidad: ${h.intensidad_horas} horas`, size: pt(10), font: "Calibri", color: DGRAY })],
      alignment: AlignmentType.CENTER, spacing: { before: 40 },
    }),
    spacer(300),
    new Paragraph({
      children: [new TextRun({ text: "PAQUETE DE INSTRUMENTOS DE EVALUACIÓN", bold: true, size: pt(18), font: "Arial", color: WHITE })],
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      spacing: { before: 160, after: 160 },
      indent: { left: 200, right: 200 },
    }),
    spacer(120),
    new Paragraph({
      children: [new TextRun({ text: `${h.guia_nombre}`, bold: true, size: pt(15), font: "Arial", color: NAVY })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: `Guía de Aprendizaje No ${h.guia_numero}  ·  CEFR ${h.cefr}`, size: pt(11), font: "Calibri", color: DGRAY })],
      alignment: AlignmentType.CENTER, spacing: { before: 60 },
    }),
    spacer(200),
    simpleTable(
      ["Instrumento", "Evidencia", "Habilidad", "Sesión", "Puntos"],
      [
        ["No 1", "E1", "Reading", "S2", "5"],
        ["No 2", "E2", "Writing", "S3", "5"],
        ["No 3", "E3", "Listening", "S4", "5"],
        ["No 4", "E4", "Speaking", "S4", "5"],
        ["No 5", "E5", "Language Functions", "S5", "5"],
        ["No 6", "Final Mission", "Integrative", "S8", "5"],
        ["TOTAL", "", "", "", "30"],
      ],
      [18, 12, 22, 12, 12]
    ),
    spacer(200),
    new Paragraph({
      children: [new TextRun({ text: `Referencia: ${h.gfpi_ref}  ·  RAP: ${h.rap_code}`, size: pt(9), font: "Calibri", color: DGRAY })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: `Run: DIESEL-2026-04-18  ·  LG Factory Engine v2.0`, size: pt(9), font: "Calibri", color: DGRAY })],
      alignment: AlignmentType.CENTER,
    }),
    pageBreak(),
  ];
}

// ─── INSTRUMENT HEADER BANNER ────────────────────────────────────────────────

function instBanner(inst) {
  const rows = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `INSTRUMENTO No ${inst.evidence_number === "Final" ? "6 — Final Mission" : inst.evidence_number}`, bold: true, color: WHITE, size: pt(13), font: "Arial" })], alignment: AlignmentType.LEFT })],
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          width: { size: 55, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 120, right: 80 },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `${inst.skill.toUpperCase()}  ·  ${inst.tipo_evidencia.toUpperCase()}  ·  S${inst.session}`, bold: true, color: WHITE, size: pt(10), font: "Arial" })], alignment: AlignmentType.RIGHT })],
          shading: { type: ShadingType.CLEAR, fill: ORANGE },
          width: { size: 45, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 80, right: 120 },
        }),
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          columnSpan: 2,
          children: [new Paragraph({ children: [new TextRun({ text: inst.title, bold: true, size: pt(11), font: "Calibri", color: NAVY })], alignment: AlignmentType.LEFT })],
          shading: { type: ShadingType.CLEAR, fill: LGRAY },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        })
      ]
    }),
  ];
  return new Table({
    rows, width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60 },
  });
}

// Admin info row
function adminRow(inst) {
  const items = [
    `Técnica: ${inst.technique}`,
    `Administración: ${inst.administered}`,
    `Puntos: ${inst.total_points}`,
  ];
  return new Paragraph({
    children: items.map((t, i) => [
      new TextRun({ text: t, size: pt(9), font: "Calibri", color: DGRAY }),
      i < items.length - 1 ? new TextRun({ text: "   |   ", size: pt(9), font: "Calibri", color: MGRAY }) : null,
    ]).flat().filter(Boolean),
    spacing: { before: 60, after: 80 }, indent: { left: 120 },
  });
}

// ─── INSTRUMENT 1 — Reading MC Quiz ──────────────────────────────────────────

function buildInst1(inst) {
  const out = [];
  out.push(instBanner(inst));
  out.push(adminRow(inst));
  out.push(studentHeaderTable(["Nombre:", "Fecha:", "Ficha:", "Instructor:"]));
  out.push(spacer(80));
  out.push(orangeHeader("INSTRUCTIONS"));
  out.push(body(inst.instructions_student));
  out.push(body(inst.instructions_es, false, true));
  out.push(spacer(80));
  out.push(orangeHeader("QUESTIONS"));
  inst.questions.forEach(q => {
    out.push(body(`${q.n}. ${q.q}`, true));
    const isTF = q.options.TRUE !== undefined;
    if (isTF) {
      out.push(body("    TRUE         FALSE"));
    } else {
      Object.entries(q.options).forEach(([k, v]) => {
        out.push(body(`    ${k})  ${v}`));
      });
    }
    out.push(body(`Puntaje: ___ / 1     Bloom: ${q.bloom}`, false, true));
    out.push(spacer(60));
  });
  out.push(spacer(60));
  out.push(orangeHeader("ANSWER KEY — Uso exclusivo del instructor"));
  const keys = Object.entries(inst.answer_key).map(([k, v]) => `${k}. ${v}`).join("   |   ");
  out.push(body(keys, false, true));
  out.push(body(inst.scoring, false, true));
  out.push(spacer(80));
  out.push(body(`Puntaje total: ___ / ${inst.total_points}`, true));
  return out;
}

// ─── INSTRUMENT 2 — Writing Verification List ────────────────────────────────

function buildInst2(inst) {
  const out = [];
  out.push(instBanner(inst));
  out.push(adminRow(inst));
  out.push(studentHeaderTable(["Nombre:", "Fecha:", "Ficha:", "Instructor:"]));
  out.push(spacer(80));
  out.push(orangeHeader("SCENARIO"));
  out.push(body(inst.scenario));
  out.push(body(`Entregables: ${inst.deliverables.join(" / ")}`, false, true));
  out.push(spacer(60));
  out.push(orangeHeader("INSTRUCTIONS"));
  out.push(body(inst.instructions_student));
  out.push(body(inst.instructions_es, false, true));
  out.push(spacer(80));
  out.push(orangeHeader("LISTA DE VERIFICACIÓN — CRITERIOS DE EVALUACIÓN"));
  out.push(simpleTable(
    ["#", "Criterio", "Pts", "Peer ✓/✗", "Instructor ✓/✗"],
    inst.criteria.map(c => [c.n, c.criterion, c.points, "", ""]),
    [5, 52, 8, 17, 18]
  ));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Campo de puntaje", "Resultado"],
    [
      ["Puntaje peer review", "___ / 5"],
      ["Puntaje instructor", "___ / 5"],
      ["Puntaje final", "___ / 5"],
    ],
    [50, 50]
  ));
  out.push(spacer(60));
  out.push(body(inst.answer_key_note, false, true));
  out.push(body(`Formato: ${inst.scoring_grid.format}`, false, true));
  return out;
}

// ─── INSTRUMENT 3 — Listening MC Quiz ────────────────────────────────────────

function buildInst3(inst) {
  const out = [];
  out.push(instBanner(inst));
  out.push(adminRow(inst));
  out.push(studentHeaderTable(["Nombre:", "Fecha:", "Ficha:", "Instructor:"]));
  out.push(spacer(80));
  out.push(orangeHeader("FUENTE DEL DIÁLOGO"));
  out.push(body(inst.source_dialogue));
  out.push(spacer(60));
  out.push(orangeHeader("INSTRUCTIONS"));
  out.push(body(inst.instructions_student));
  out.push(body(inst.instructions_es, false, true));
  out.push(spacer(80));
  out.push(orangeHeader("QUESTIONS"));
  inst.questions.forEach(q => {
    out.push(body(`${q.n}. ${q.q}`, true));
    Object.entries(q.options).forEach(([k, v]) => {
      out.push(body(`    ${k})  ${v}`));
    });
    out.push(body(`Línea fuente: "${q.dialogue_line}"     Bloom: ${q.bloom}`, false, true));
    out.push(spacer(60));
  });
  out.push(orangeHeader("ANSWER KEY — Uso exclusivo del instructor"));
  const keys = Object.entries(inst.answer_key).map(([k, v]) => `${k}. ${v}`).join("   |   ");
  out.push(body(keys, false, true));
  out.push(body(inst.scoring, false, true));
  out.push(spacer(80));
  out.push(body(`Puntaje total: ___ / ${inst.total_points}`, true));
  return out;
}

// ─── INSTRUMENT 4 — Speaking Rating Scale ────────────────────────────────────

function buildInst4(inst) {
  const out = [];
  out.push(instBanner(inst));
  out.push(adminRow(inst));
  out.push(new Table({
    rows: [new TableRow({
      children: inst.instructor_header.fields.map(f => new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: f, size: pt(9.5), font: "Calibri" })] })],
        width: { size: Math.floor(100 / inst.instructor_header.fields.length), type: WidthType.PCT },
        margins: { top: 60, bottom: 60, left: 80, right: 80 },
        shading: { type: ShadingType.CLEAR, fill: LGRAY },
      }))
    })],
    width: { size: 100, type: WidthType.PCT },
  }));
  out.push(spacer(80));
  out.push(orangeHeader("TASK"));
  out.push(body(inst.task));
  out.push(spacer(60));
  out.push(orangeHeader("INSTRUCCIONES PARA EL INSTRUCTOR"));
  out.push(body(inst.instructions_instructor));
  out.push(spacer(60));
  out.push(orangeHeader("ESCALA DE REFERENCIA"));
  out.push(simpleTable(
    ["Puntuación", "Descriptor"],
    Object.entries(inst.scale_reference).map(([k, v]) => [k, v]),
    [15, 85]
  ));
  out.push(spacer(80));
  out.push(orangeHeader("CRITERIOS DE EVALUACIÓN"));
  out.push(simpleTable(
    ["#", "Criterio", "1", "2", "3", "4", "5", "Comentario observado"],
    inst.criteria.map(c => [c.n, c.criterion, "○", "○", "○", "○", "○", ""]),
    [5, 40, 7, 7, 7, 7, 7, 20]
  ));
  out.push(spacer(80));
  out.push(orangeHeader("BANCO DE PREGUNTAS DE SEGUIMIENTO"));
  inst.follow_up_question_bank.forEach((q, i) => out.push(body(`${i + 1}. ${q}`)));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Campo", "Resultado"],
    [
      ["Suma criterios (1–5 × 5)", "___ / 25"],
      ["Puntaje final (÷5)", "___ / 5"],
    ],
    [50, 50]
  ));
  return out;
}

// ─── INSTRUMENT 5 — Language Functions Rating Scale ──────────────────────────

function buildInst5(inst) {
  const out = [];
  out.push(instBanner(inst));
  out.push(adminRow(inst));
  out.push(new Table({
    rows: [new TableRow({
      children: inst.instructor_header.fields.map(f => new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: f, size: pt(9), font: "Calibri" })] })],
        width: { size: Math.floor(100 / inst.instructor_header.fields.length), type: WidthType.PCT },
        margins: { top: 50, bottom: 50, left: 60, right: 60 },
        shading: { type: ShadingType.CLEAR, fill: LGRAY },
      }))
    })],
    width: { size: 100, type: WidthType.PCT },
  }));
  out.push(spacer(80));
  out.push(orangeHeader("TASK"));
  out.push(body(inst.task));
  out.push(spacer(60));
  out.push(orangeHeader("INSTRUCCIONES PARA EL INSTRUCTOR"));
  out.push(body(inst.instructions_instructor));
  out.push(spacer(60));
  out.push(orangeHeader("ESCALA DE REFERENCIA"));
  out.push(simpleTable(
    ["Score", "Descriptor"],
    Object.entries(inst.scale_reference).map(([k, v]) => [k, v]),
    [12, 88]
  ));
  out.push(spacer(80));
  out.push(orangeHeader("CRITERIOS — ESCALA INSTRUCTOR (FORMA COMPLETA)"));
  out.push(simpleTable(
    ["#", "Función", "Criterio", "1", "2", "3", "4", "5", "Ejemplo escuchado"],
    inst.criteria.map(c => [c.n, c.function, c.criterion, "○", "○", "○", "○", "○", ""]),
    [5, 8, 32, 7, 7, 7, 7, 7, 20]
  ));
  out.push(spacer(80));
  out.push(orangeHeader("FORMA SIMPLIFICADA — EVALUACIÓN ENTRE PARES"));
  const pf = inst.peer_evaluation_form_simplified;
  out.push(body(pf.instructions, false, true));
  out.push(simpleTable(
    ["Función", "¿Visible? ✓", "Ejemplo escuchado"],
    pf.items.map(i => [i.function, "   ", ""]),
    [40, 15, 45]
  ));
  out.push(spacer(60));
  out.push(body("Fortaleza del equipo: _______________________________________________"));
  out.push(body("Sugerencia: _______________________________________________"));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Campo", "Resultado"],
    [
      ["Suma criterios (1–5 × 5)", "___ / 25"],
      ["Puntaje final (÷5)", "___ / 5"],
    ],
    [50, 50]
  ));
  return out;
}

// ─── INSTRUMENT 6 — Final Mission Rating Scale ────────────────────────────────

function buildInst6(inst) {
  const out = [];
  out.push(instBanner(inst));
  out.push(adminRow(inst));
  out.push(new Table({
    rows: [new TableRow({
      children: inst.instructor_header.fields.map(f => new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: f, size: pt(9), font: "Calibri" })] })],
        width: { size: Math.floor(100 / inst.instructor_header.fields.length), type: WidthType.PCT },
        margins: { top: 50, bottom: 50, left: 60, right: 60 },
        shading: { type: ShadingType.CLEAR, fill: LGRAY },
      }))
    })],
    width: { size: 100, type: WidthType.PCT },
  }));
  out.push(spacer(80));
  out.push(orangeHeader("TASK — CAPSTONE"));
  out.push(body(inst.task));
  out.push(spacer(60));
  out.push(orangeHeader("INSTRUCCIONES PARA EL INSTRUCTOR / TRAINING COORDINATOR"));
  out.push(body(inst.instructions_instructor));
  out.push(spacer(60));
  out.push(orangeHeader("ESCALA DE REFERENCIA"));
  out.push(simpleTable(
    ["Score", "Descriptor"],
    Object.entries(inst.scale_reference).map(([k, v]) => [k, v]),
    [12, 88]
  ));
  out.push(spacer(80));
  out.push(orangeHeader("CRITERIOS DE EVALUACIÓN — FINAL MISSION"));
  out.push(simpleTable(
    ["#", "Criterio", "1", "2", "3", "4", "5", "Comentario"],
    inst.criteria.map(c => [c.n, c.criterion, "○", "○", "○", "○", "○", ""]),
    [5, 42, 7, 7, 7, 7, 7, 18]
  ));
  out.push(spacer(80));
  out.push(orangeHeader("BANCO DE PREGUNTAS DE SEGUIMIENTO (elegir 1)"));
  inst.follow_up_question_bank.forEach((q, i) => out.push(body(`${i + 1}. ${q}`)));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Campo", "Resultado"],
    [
      ["Suma criterios (1–5 × 6)", "___ / 30"],
      ["Puntaje final (÷6)", "___ / 5"],
      ["Fortaleza observada", ""],
      ["Aspecto a fortalecer", ""],
      ["Nota para próxima guía", ""],
    ],
    [40, 60]
  ));
  return out;
}

// ─── ASSEMBLE ────────────────────────────────────────────────────────────────

async function main() {
  console.log("Building PM-4.1 — Instrumentos de Evaluación...");

  const builders = [buildInst1, buildInst2, buildInst3, buildInst4, buildInst5, buildInst6];
  const instruments = DATA.instruments;

  const sections = [
    ...coverPage(),
  ];

  instruments.forEach((inst, idx) => {
    const builder = builders[idx];
    const content = builder(inst);
    sections.push(...content);
    if (idx < instruments.length - 1) sections.push(pageBreak());
  });

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
              new TextRun({ text: `GFPI-F-134  ·  Guía No 1 — The Workshop Specialist  ·  Instrumentos de Evaluación`, size: pt(8.5), font: "Calibri", color: "666666" }),
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
              new TextRun({ text: "SENA  ·  Mantenimiento de Motores Diesel  ·  PM-4.1 Instrumentos  ·  Página ", size: pt(8.5), font: "Calibri", color: "666666" }),
              new TextRun({ children: [PageNumber.CURRENT], size: pt(8.5), font: "Calibri", color: "666666" }),
            ],
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
          })],
        }),
      },
      children: sections,
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

  const OUT1 = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-4-1-instrumentos.docx";
  const OUT2 = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-18/pm-4-1-instrumentos.docx";

  fs.writeFileSync(OUT1, buf);
  fs.writeFileSync(OUT2, buf);

  console.log(`✓ Written ${buf.length} bytes`);
  console.log(`  → ${OUT1}`);
  console.log(`  → ${OUT2}`);
}

main().catch(e => { console.error(e); process.exit(1); });
