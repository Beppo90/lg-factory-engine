const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
} = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const fs = require("fs");
const path = require("path");

// Load JSON
const data = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-3-1.json",
  "utf8"
));

const data35 = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-3-5.json",
  "utf8"
));

const data41 = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-4-1.json",
  "utf8"
));

const data42 = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-4-2.json",
  "utf8"
));

// === CONSTANTS ===
const NAVY = "1C2B3C";
const ORANGE = "F59316";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F5F5F5";
const MED_GRAY = "DDDDDD";
const PAGE_WIDTH_DXA = 12240;
const MARGIN_DXA = 1440;
const CONTENT_WIDTH_DXA = PAGE_WIDTH_DXA - 2 * MARGIN_DXA; // 9360

// === BORDER HELPERS ===
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// === STYLE HELPERS ===
function heading1(text) {
  return new Paragraph({
    style: "Heading1",
    children: [new TextRun({ text, font: "Arial", bold: true, color: WHITE, size: 28 })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 240, after: 120 },
    indent: { left: 120, right: 120 },
  });
}

function heading2(text) {
  return new Paragraph({
    style: "Heading2",
    children: [new TextRun({ text, font: "Arial", bold: true, color: NAVY, size: 24 })],
    spacing: { before: 200, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 2, color: ORANGE },
    },
  });
}

function heading3(text) {
  return new Paragraph({
    style: "Heading3",
    children: [new TextRun({ text, font: "Arial", bold: true, color: ORANGE, size: 22 })],
    spacing: { before: 160, after: 60 },
  });
}

function bodyPara(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22, ...opts })],
    spacing: { before: 60, after: 60 },
  });
}

function boldLabel(label, value) {
  return new Paragraph({
    children: [
      new TextRun({ text: label + ": ", font: "Calibri", size: 22, bold: true }),
      new TextRun({ text: value, font: "Calibri", size: 22 }),
    ],
    spacing: { before: 60, after: 60 },
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// === TABLE HELPERS ===
function makeCell(text, opts = {}) {
  const {
    bold = false,
    color = "000000",
    bgColor = null,
    width = null,
    vertAlign = VerticalAlign.TOP,
    italic = false,
    fontSize = 20,
    colSpan = 1,
  } = opts;
  const cellOpts = {
    children: [
      new Paragraph({
        children: [new TextRun({ text: String(text || ""), font: "Calibri", size: fontSize, bold, color, italic })],
        spacing: { before: 40, after: 40 },
      }),
    ],
    margins: cellMargins,
    verticalAlign: vertAlign,
    columnSpan: colSpan,
    borders: {
      top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder,
    },
  };
  if (bgColor) {
    cellOpts.shading = { type: ShadingType.CLEAR, fill: bgColor };
  }
  if (width) {
    cellOpts.width = { size: width, type: WidthType.DXA };
  }
  return new TableCell(cellOpts);
}

function makeHeaderCell(text, width, bgColor = NAVY) {
  return makeCell(text, { bold: true, color: WHITE, bgColor, width, fontSize: 20 });
}

// === HEADER ROW HELPER ===
function makeTableHeaderRow(headers, widths, bgColor = NAVY) {
  return new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => makeHeaderCell(h, widths[i], bgColor)),
  });
}

// === SHADED ROW (alternating) ===
function makeDataRow(cells, widths, shade = false) {
  return new TableRow({
    children: cells.map((c, i) => makeCell(c, { width: widths[i], bgColor: shade ? LIGHT_GRAY : null })),
  });
}

// =============================================
// DOCUMENT SECTIONS
// =============================================

// 1. COVER PAGE
function buildCoverPage() {
  return [
    new Paragraph({ spacing: { before: 1440, after: 240 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "PM-3.1", font: "Arial Black", size: 64, bold: true, color: NAVY })],
      spacing: { before: 0, after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Playbook Outline", font: "Arial", size: 48, bold: true, color: ORANGE })],
      spacing: { before: 0, after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.guide, font: "Arial", size: 36, bold: true, color: NAVY })],
      spacing: { before: 0, after: 240 },
    }),
    // Divider line
    new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ORANGE } },
      spacing: { before: 0, after: 240 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.header.programa, font: "Calibri", size: 26, color: NAVY })],
      spacing: { before: 120, after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Tipo: ${data.header.tipo}`, font: "Calibri", size: 22, color: "444444" })],
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `CEFR Level: ${data.header.cefr_level}`, font: "Calibri", size: 22, color: "444444" })],
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Run ID: ${data.run_id}`, font: "Calibri", size: 22, color: "444444" })],
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Generated: ${data.generated_at}`, font: "Calibri", size: 22, color: "666666" })],
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Total: ${data.header.intensidad_total_horas}h | ${data.header.sesiones_total} sessions × ${data.header.duracion_sesion_min / 60}h`, font: "Calibri", size: 22, color: "444444" })],
      spacing: { before: 0, after: 80 },
    }),
    pageBreak(),
  ];
}

// 2. PROGRAM METADATA TABLE
function buildMetadataSection() {
  const h = data.header;
  const metaRows = [
    ["Program", h.programa],
    ["Type", h.tipo],
    ["Guide Number", `${h.guia_numero}`],
    ["Guide Name", h.guia_nombre],
    ["CEFR Level", h.cefr_level],
    ["Total Intensity (hours)", `${h.intensidad_total_horas}h`],
    ["Direct Hours", `${h.horas_directa}h`],
    ["Autonomous Hours", `${h.horas_autonoma}h`],
    ["Total Sessions", `${h.sesiones_total}`],
    ["Session Duration", `${h.duracion_sesion_min} min (${h.duracion_sesion_min / 60}h)`],
    ["Run ID", data.run_id],
    ["PM ID", data.pm_id],
    ["Status", data.status],
  ];

  const colW = [2800, 6560];
  const rows = metaRows.map(([k, v], i) =>
    new TableRow({
      children: [
        makeCell(k, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[0] }),
        makeCell(v, { width: colW[1], bgColor: i % 2 === 0 ? LIGHT_GRAY : null }),
      ],
    })
  );

  return [
    heading1("Program Metadata"),
    new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows,
    }),
    new Paragraph({ spacing: { after: 120 } }),
    bodyPara(h.nota || "", { italic: true, color: "666666" }),
  ];
}

// 3. SESSION OVERVIEW TABLE
function buildSessionOverview() {
  const headers = ["#", "Session Name", "Worksheets", "Focus / Skills", "Autonomous Work"];
  const colW = [400, 1600, 900, 3600, 2860];

  const rows = [
    makeTableHeaderRow(headers, colW),
    ...data.overview_table.map((s, i) =>
      new TableRow({
        children: [
          makeCell(`S${s.session}`, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[0] }),
          makeCell(s.nombre, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[1] }),
          makeCell(s.worksheets.join(", "), { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[2] }),
          makeCell(`${s.foco}${s.habilidades && s.habilidades !== "—" ? " | " + s.habilidades : ""}`, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[3] }),
          makeCell(s.autonomo, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[4] }),
        ],
      })
    ),
  ];

  return [
    heading1("Session Overview"),
    new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows,
    }),
  ];
}

// 4. SKILLS PROGRESSION MAP
function buildSkillsProgressionMap() {
  const skills = ["R", "L", "V", "G", "W", "S"];
  const headers = ["Session", ...skills.map(s => s)];
  const colW = [900, 1410, 1410, 1410, 1410, 1410, 1410];

  const rows = [
    makeTableHeaderRow(headers, colW, NAVY),
    ...data.skills_progression_map.map((row, i) =>
      new TableRow({
        children: [
          makeCell(`S${row.session}`, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[0] }),
          ...skills.map((s, j) => {
            const val = row[s] || "—";
            const color = val === "●" ? NAVY : val === "○" ? ORANGE : "888888";
            return makeCell(val, { color, bold: val !== "—", bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[j + 1] });
          }),
        ],
      })
    ),
  ];

  return [
    heading2("Skills Progression Map"),
    bodyPara("Legend: ● = Primary focus   ○ = Support skill   — = Not this session", { italic: true, color: "555555" }),
    new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows,
    }),
  ];
}

// 5. AUTONOMOUS WORK MAP
function buildAutonomousWorkMap() {
  const headers = ["Assigned", "Reviewed", "Activity", "Workbook Ref", "Time (min)"];
  const colW = [700, 700, 4360, 2200, 1400];

  const rows = [
    makeTableHeaderRow(headers, colW, ORANGE),
    ...data.autonomous_work_map.map((row, i) =>
      new TableRow({
        children: [
          makeCell(row.asignado_en, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[0] }),
          makeCell(row.revisado_en, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[1] }),
          makeCell(row.actividad, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[2] }),
          makeCell(row.workbook_ref, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, italic: true, width: colW[3] }),
          makeCell(`${row.tiempo_min}`, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[4] }),
        ],
      })
    ),
  ];

  return [
    heading2("Autonomous Work Map"),
    new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows,
    }),
  ];
}

// 6. EVALUATION SUMMARY
function buildEvaluationSummary() {
  const evidences = [
    { num: 1, skill: "Reading", session: "S2", instrument: "Cuestionario No 1", desc: "5 comprehension questions on adapted Popular Mechanics text" },
    { num: 2, skill: "Writing", session: "S3", instrument: "Lista de Verificación No 2", desc: "Daily Inspection Checklist + Work Order for Bay 2 (min 8 items + 6 fields)" },
    { num: 3, skill: "Listening", session: "S4", instrument: "Cuestionario No 3", desc: "5 questions on Bay 2 Safety Briefing dialogue (without script)" },
    { num: 4, skill: "Speaking", session: "S4", instrument: "Escala de Estimación No 4", desc: "Workshop Readiness Report role-play 60-90 sec (5 criteria)" },
    { num: 5, skill: "Language Functions", session: "S5", instrument: "Escala de Estimación No 5", desc: "Integrated simulation: 5 communication functions in workshop opening" },
    { num: 6, skill: "Consolidated Quiz", session: "S6", instrument: "Cuestionario No 6 (PM-4.2)", desc: "25 items: 5R + 5V + 5G + 5L + 5LF = full RAP synthesis" },
  ];

  const headers = ["Evidence", "Skill Domain", "Session", "Instrument", "Description"];
  const colW = [700, 1200, 600, 2000, 4860];

  const rows = [
    makeTableHeaderRow(headers, colW, NAVY),
    ...evidences.map((e, i) =>
      new TableRow({
        children: [
          makeCell(`Ev. ${e.num}`, { bold: true, color: WHITE, bgColor: NAVY, width: colW[0] }),
          makeCell(e.skill, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[1] }),
          makeCell(e.session, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[2] }),
          makeCell(e.instrument, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[3] }),
          makeCell(e.desc, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: colW[4] }),
        ],
      })
    ),
    // Final Mission row
    new TableRow({
      children: [
        makeCell("FINAL", { bold: true, color: WHITE, bgColor: ORANGE, width: colW[0] }),
        makeCell("Speaking (Integrated)", { bold: true, bgColor: LIGHT_GRAY, width: colW[1] }),
        makeCell("S7-S8", { bgColor: LIGHT_GRAY, width: colW[2] }),
        makeCell("PM-3.5 + Escala No 4", { bgColor: LIGHT_GRAY, width: colW[3] }),
        makeCell("Workshop Readiness Report: team bay inspection + live oral report 60-90 sec + supervisor Q&A (5 criteria × 5 pts = max 25 pts)", { bgColor: LIGHT_GRAY, width: colW[4] }),
      ],
    }),
  ];

  return [
    heading1("Evaluation Summary"),
    new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows,
    }),
  ];
}

// 7. SESSION DETAIL (one per session, page break before each)
function buildSessionDetail(sess) {
  const items = [];

  // Session header (navy background block)
  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Session ${sess.session}: ${sess.nombre}`, font: "Arial", bold: true, size: 32, color: WHITE }),
      ],
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      spacing: { before: 0, after: 0 },
      indent: { left: 120, right: 120 },
    })
  );

  // Sub-header with worksheets & skills
  const skillsFoco = sess.habilidades_foco && sess.habilidades_foco.length > 0 ? sess.habilidades_foco.join(", ") : "—";
  const skillsSoporte = sess.habilidades_soporte && sess.habilidades_soporte.length > 0 ? sess.habilidades_soporte.join(", ") : "—";
  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Worksheets: ${sess.worksheets.join(", ")}  |  Focus: ${skillsFoco}  |  Support: ${skillsSoporte}  |  Duration: ${sess.duracion_min} min`, font: "Calibri", size: 20, color: WHITE }),
      ],
      shading: { type: ShadingType.CLEAR, fill: "2E4A6B" },
      spacing: { before: 0, after: 120 },
      indent: { left: 120, right: 120 },
    })
  );

  // SET-UP
  if (sess.set_up) {
    items.push(heading2("Set-Up"));
    items.push(boldLabel("Duration", `${sess.set_up.duracion_min} min`));
    if (sess.set_up.objective) items.push(boldLabel("Objective", sess.set_up.objective));
    if (sess.set_up.warm_up) {
      items.push(new Paragraph({
        children: [new TextRun({ text: "Warm-Up: ", font: "Calibri", size: 22, bold: true, color: ORANGE })],
        spacing: { before: 80, after: 40 },
      }));
      items.push(bodyPara(sess.set_up.warm_up));
    }
    if (sess.set_up.teacher_talk) {
      items.push(new Paragraph({
        children: [
          new TextRun({ text: "Teacher Talk: ", font: "Calibri", size: 22, bold: true, color: NAVY }),
          new TextRun({ text: sess.set_up.teacher_talk, font: "Calibri", size: 22, italic: true, color: "333333" }),
        ],
        spacing: { before: 80, after: 80 },
      }));
    }
  }

  // WHILE (bloques)
  if (sess.while && sess.while.bloques) {
    items.push(heading2("While (Main Activities)"));
    items.push(boldLabel("Total Duration", `${sess.while.duracion_min} min`));

    sess.while.bloques.forEach(bloque => {
      // Block header
      items.push(
        new Paragraph({
          children: [new TextRun({ text: `Block ${bloque.letra} — ${bloque.duracion_min} min`, font: "Arial", size: 22, bold: true, color: WHITE })],
          shading: { type: ShadingType.CLEAR, fill: ORANGE },
          spacing: { before: 120, after: 0 },
          indent: { left: 60 },
        })
      );
      items.push(bodyPara(bloque.actividad, { bold: false }));
      if (bloque.agrupacion) items.push(boldLabel("Grouping", bloque.agrupacion));
      if (bloque.instruccion) items.push(bodyPara(bloque.instruccion));
    });

    // Transitions
    if (sess.while.transiciones && sess.while.transiciones.length > 0) {
      items.push(heading3("Transitions"));
      sess.while.transiciones.forEach((t, i) => {
        items.push(new Paragraph({
          children: [
            new TextRun({ text: `${i + 1}. `, font: "Calibri", size: 22, bold: true, color: ORANGE }),
            new TextRun({ text: t, font: "Calibri", size: 22, italic: true }),
          ],
          spacing: { before: 40, after: 40 },
        }));
      });
    }
  }

  // WRAP-UP
  if (sess.wrap_up) {
    items.push(heading2("Wrap-Up"));
    if (sess.wrap_up.exit_ticket) {
      items.push(new Paragraph({
        children: [new TextRun({ text: "Exit Ticket: ", font: "Calibri", size: 22, bold: true, color: ORANGE })],
        spacing: { before: 80, after: 40 },
      }));
      items.push(bodyPara(sess.wrap_up.exit_ticket));
    }
    if (sess.wrap_up.teacher_talk) {
      items.push(new Paragraph({
        children: [
          new TextRun({ text: "Teacher Talk: ", font: "Calibri", size: 22, bold: true, color: NAVY }),
          new TextRun({ text: sess.wrap_up.teacher_talk, font: "Calibri", size: 22, italic: true, color: "333333" }),
        ],
        spacing: { before: 80, after: 80 },
      }));
    }
    if (sess.wrap_up.trabajo_autonomo) {
      const ta = sess.wrap_up.trabajo_autonomo;
      items.push(heading3("Autonomous Work"));
      if (ta.workbook_ref) items.push(boldLabel("Workbook Ref", ta.workbook_ref));
      if (ta.tiempo_min !== undefined) items.push(boldLabel("Time", `${ta.tiempo_min} min`));
      if (ta.actividad) items.push(bodyPara(ta.actividad));
    }
  }

  // LOGISTICS BOX
  if (sess.logistics_box) {
    const lb = sess.logistics_box;
    items.push(heading2("Logistics Box"));

    // Materials table
    if (lb.materiales && lb.materiales.length > 0) {
      items.push(heading3("Materials Needed"));
      const matColW = [400, 8960];
      const matRows = [
        makeTableHeaderRow(["#", "Material"], matColW, NAVY),
        ...lb.materiales.map((m, i) =>
          new TableRow({
            children: [
              makeCell(`${i + 1}`, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: matColW[0] }),
              makeCell(m, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: matColW[1] }),
            ],
          })
        ),
      ];
      items.push(new Table({
        width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
        columnWidths: matColW,
        rows: matRows,
      }));
    }

    if (lb.agrupacion) items.push(boldLabel("Grouping Flow", lb.agrupacion));
    if (lb.recursos_canva) items.push(boldLabel("Canva Resources", lb.recursos_canva));
    if (lb.plan_b) {
      items.push(new Paragraph({
        children: [
          new TextRun({ text: "Plan B: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
          new TextRun({ text: lb.plan_b, font: "Calibri", size: 22, italic: true }),
        ],
        spacing: { before: 80, after: 80 },
      }));
    }
  }

  return items;
}

// 8. NOTES SECTION
function buildNotesSection() {
  const items = [
    heading1("Pedagogical Notes & Design Principles"),
  ];
  data.notes.forEach((note, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: ORANGE }),
        new TextRun({ text: note, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 80, after: 80 },
      indent: { left: 300 },
    }));
  });
  return items;
}

// 9. MASTER MATERIALS LIST
function buildMasterMaterials() {
  const ml = data.master_materials_list;
  const items = [heading1("Master Materials List")];

  // Printed
  items.push(heading2("Printed Materials"));
  const printColW = [400, 8960];
  const printRows = [
    makeTableHeaderRow(["#", "Item"], printColW, NAVY),
    ...ml.impresos.map((m, i) =>
      new TableRow({
        children: [
          makeCell(`${i + 1}`, { bold: true, bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: printColW[0] }),
          makeCell(m, { bgColor: i % 2 === 0 ? LIGHT_GRAY : null, width: printColW[1] }),
        ],
      })
    ),
  ];
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: printColW,
    rows: printRows,
  }));

  // Digital
  items.push(heading2("Digital Resources"));
  ml.digitales.forEach((d, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}. `, font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: d, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 240 },
    }));
  });

  // Equipment
  items.push(heading2("Equipment"));
  ml.equipamiento.forEach((e, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}. `, font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: e, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 240 },
    }));
  });

  // Classroom setup
  items.push(heading2("Classroom Setup"));
  ml.aula.forEach((a, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}. `, font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: a, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 240 },
    }));
  });

  return items;
}

// =============================================
// APPENDIX A — INSTRUMENTOS DE EVALUACIÓN (PM-4.1)
// =============================================

const ALT_ROW = "F3F5F7";

function makeFreshThinBorder() {
  return { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
}

function makeFreshCell(text, opts = {}) {
  const {
    bold = false,
    color = "000000",
    bgColor = null,
    width = null,
    vertAlign = VerticalAlign.TOP,
    italic = false,
    fontSize = 20,
    colSpan = 1,
    rowSpan = 1,
    align = AlignmentType.LEFT,
  } = opts;
  const cellOpts = {
    children: [
      new Paragraph({
        alignment: align,
        children: [new TextRun({ text: String(text || ""), font: "Calibri", size: fontSize, bold, color, italic })],
        spacing: { before: 60, after: 60 },
      }),
    ],
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: vertAlign,
    columnSpan: colSpan,
    rowSpan: rowSpan > 1 ? rowSpan : undefined,
    borders: {
      top: makeFreshThinBorder(),
      bottom: makeFreshThinBorder(),
      left: makeFreshThinBorder(),
      right: makeFreshThinBorder(),
    },
  };
  if (bgColor) {
    cellOpts.shading = { type: ShadingType.CLEAR, fill: bgColor };
  }
  if (width) {
    cellOpts.width = { size: width, type: WidthType.DXA };
  }
  return new TableCell(cellOpts);
}

function makeFreshHeaderCell(text, width, bgColor) {
  return makeFreshCell(text, { bold: true, color: WHITE, bgColor: bgColor || NAVY, width, fontSize: 20 });
}

function instrumentHeaderTable(inst) {
  // 5-column info table: Name | Type | Session | Points | Word Wall
  const colW = [2800, 1600, 900, 900, 3160];
  const wordWallVisible = inst.administered && inst.administered.toLowerCase().includes("visible") ? "Yes (Y)" : "No (N)";
  return new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          makeFreshHeaderCell("Instrument Name", colW[0]),
          makeFreshHeaderCell("Type / Technique", colW[1]),
          makeFreshHeaderCell("Session", colW[2]),
          makeFreshHeaderCell("Points", colW[3]),
          makeFreshHeaderCell("Word Wall Visible", colW[4]),
        ],
      }),
      new TableRow({
        children: [
          makeFreshCell(inst.title, { width: colW[0], bgColor: ALT_ROW }),
          makeFreshCell(inst.technique || inst.tipo_evidencia || "", { width: colW[1], bgColor: ALT_ROW }),
          makeFreshCell(`S${inst.session}`, { width: colW[2], bgColor: ALT_ROW, align: AlignmentType.CENTER }),
          makeFreshCell(`${inst.total_points} pts`, { width: colW[3], bgColor: ALT_ROW, align: AlignmentType.CENTER }),
          makeFreshCell(wordWallVisible, { width: colW[4], bgColor: ALT_ROW }),
        ],
      }),
    ],
  });
}

function studentHeaderTable(fields) {
  // Two columns of fields side by side for the student header
  const colW = [4680, 4680];
  const rows = [];
  for (let i = 0; i < fields.length; i += 2) {
    const left = fields[i] || "";
    const right = fields[i + 1] || "";
    rows.push(new TableRow({
      children: [
        makeFreshCell(left + "  _______________________", { width: colW[0] }),
        right ? makeFreshCell(right + "  _______________________", { width: colW[1] }) : makeFreshCell("", { width: colW[1] }),
      ],
    }));
  }
  if (rows.length === 0) return null;
  return new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colW,
    rows,
  });
}

function instructorHeaderTable(fields) {
  const colW = [4680, 4680];
  const rows = [];
  for (let i = 0; i < fields.length; i += 2) {
    const left = fields[i] || "";
    const right = fields[i + 1] || "";
    rows.push(new TableRow({
      children: [
        makeFreshCell(left + "  _______________________", { width: colW[0] }),
        right ? makeFreshCell(right + "  _______________________", { width: colW[1] }) : makeFreshCell("", { width: colW[1] }),
      ],
    }));
  }
  if (rows.length === 0) return null;
  return new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colW,
    rows,
  });
}

function buildEvaluationFormTable(inst) {
  // Determine if it's a scale (1-5) or checklist (Si/No/Parcial)
  const isScale = inst.title.toLowerCase().includes("escala");
  const isChequeo = inst.title.toLowerCase().includes("chequeo") || inst.title.toLowerCase().includes("verificaci");
  const items = [];

  if (inst.criteria && inst.criteria.length > 0) {
    // Criteria-based form (Writing, Speaking, Language Functions, Final Mission)
    if (isScale) {
      // Rating columns 1-2-3-4-5 + comments
      const colW = [400, 4160, 700, 700, 700, 700, 700, 1200];
      const headerRow = new TableRow({
        tableHeader: true,
        children: [
          makeFreshHeaderCell("#", colW[0]),
          makeFreshHeaderCell("Criterion", colW[1]),
          makeFreshHeaderCell("1", colW[2]),
          makeFreshHeaderCell("2", colW[3]),
          makeFreshHeaderCell("3", colW[4]),
          makeFreshHeaderCell("4", colW[5]),
          makeFreshHeaderCell("5", colW[6]),
          makeFreshHeaderCell("Comments", colW[7]),
        ],
      });
      const dataRows = inst.criteria.map((c, idx) => {
        const bg = idx % 2 === 0 ? null : ALT_ROW;
        return new TableRow({
          height: { value: 480, rule: "atLeast" },
          children: [
            makeFreshCell(`${c.n}`, { width: colW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
            makeFreshCell(c.criterion, { width: colW[1], bgColor: bg }),
            makeFreshCell("", { width: colW[2], bgColor: bg }),
            makeFreshCell("", { width: colW[3], bgColor: bg }),
            makeFreshCell("", { width: colW[4], bgColor: bg }),
            makeFreshCell("", { width: colW[5], bgColor: bg }),
            makeFreshCell("", { width: colW[6], bgColor: bg }),
            makeFreshCell("", { width: colW[7], bgColor: bg }),
          ],
        });
      });
      // Score row
      const scoreRow = new TableRow({
        children: [
          makeFreshCell("", { width: colW[0], bgColor: "E8ECF0" }),
          makeFreshCell("TOTAL SCORE", { width: colW[1], bold: true, bgColor: "E8ECF0" }),
          makeFreshCell("", { width: colW[2], colSpan: 5, bgColor: "E8ECF0" }),
          makeFreshCell("___ / " + inst.total_points, { width: colW[7], bold: true, bgColor: "E8ECF0", align: AlignmentType.CENTER }),
        ],
      });
      return new Table({
        width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
        columnWidths: colW,
        rows: [headerRow, ...dataRows, scoreRow],
      });
    } else {
      // Lista de verificación for writing — Si / No columns
      const colW = [400, 5560, 800, 800, 800, 1000];
      const headerRow = new TableRow({
        tableHeader: true,
        children: [
          makeFreshHeaderCell("#", colW[0]),
          makeFreshHeaderCell("Criterion", colW[1]),
          makeFreshHeaderCell("Si", colW[2]),
          makeFreshHeaderCell("No", colW[3]),
          makeFreshHeaderCell("Parcial", colW[4]),
          makeFreshHeaderCell("Pts", colW[5]),
        ],
      });
      const dataRows = inst.criteria.map((c, idx) => {
        const bg = idx % 2 === 0 ? null : ALT_ROW;
        return new TableRow({
          height: { value: 480, rule: "atLeast" },
          children: [
            makeFreshCell(`${c.n}`, { width: colW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
            makeFreshCell(c.criterion, { width: colW[1], bgColor: bg }),
            makeFreshCell("", { width: colW[2], bgColor: bg }),
            makeFreshCell("", { width: colW[3], bgColor: bg }),
            makeFreshCell("", { width: colW[4], bgColor: bg }),
            makeFreshCell(`${c.points || ""}`, { width: colW[5], bgColor: bg, align: AlignmentType.CENTER }),
          ],
        });
      });
      const scoreRow = new TableRow({
        children: [
          makeFreshCell("", { width: colW[0], bgColor: "E8ECF0" }),
          makeFreshCell("TOTAL SCORE", { width: colW[1], bold: true, bgColor: "E8ECF0" }),
          makeFreshCell("", { width: colW[2], colSpan: 3, bgColor: "E8ECF0" }),
          makeFreshCell("___ / " + inst.total_points, { width: colW[5], bold: true, bgColor: "E8ECF0", align: AlignmentType.CENTER }),
        ],
      });
      return new Table({
        width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
        columnWidths: colW,
        rows: [headerRow, ...dataRows, scoreRow],
      });
    }
  } else if (inst.questions && inst.questions.length > 0) {
    // Multiple choice questionnaire form
    const colW = [400, 5060, 800, 800, 800, 1500];
    const headerRow = new TableRow({
      tableHeader: true,
      children: [
        makeFreshHeaderCell("#", colW[0]),
        makeFreshHeaderCell("Question", colW[1]),
        makeFreshHeaderCell("a)", colW[2]),
        makeFreshHeaderCell("b)", colW[3]),
        makeFreshHeaderCell("c)", colW[4]),
        makeFreshHeaderCell("T/F", colW[5]),
      ],
    });
    const dataRows = inst.questions.map((q, idx) => {
      const bg = idx % 2 === 0 ? null : ALT_ROW;
      const optA = q.options && q.options.a ? q.options.a : "";
      const optB = q.options && q.options.b ? q.options.b : "";
      const optC = q.options && q.options.c ? q.options.c : "";
      const tfOpts = (q.options && (q.options.TRUE || q.options.FALSE)) ? "TRUE / FALSE" : "";
      return new TableRow({
        height: { value: 560, rule: "atLeast" },
        children: [
          makeFreshCell(`${q.n}`, { width: colW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
          makeFreshCell(q.q, { width: colW[1], bgColor: bg }),
          makeFreshCell(optA, { width: colW[2], bgColor: bg, fontSize: 18 }),
          makeFreshCell(optB, { width: colW[3], bgColor: bg, fontSize: 18 }),
          makeFreshCell(optC, { width: colW[4], bgColor: bg, fontSize: 18 }),
          makeFreshCell(tfOpts, { width: colW[5], bgColor: bg, fontSize: 18, italic: true }),
        ],
      });
    });
    const scoreRow = new TableRow({
      children: [
        makeFreshCell("", { width: colW[0], bgColor: "E8ECF0" }),
        makeFreshCell("TOTAL SCORE", { width: colW[1], bold: true, bgColor: "E8ECF0" }),
        makeFreshCell("", { width: colW[2], colSpan: 3, bgColor: "E8ECF0" }),
        makeFreshCell("___ / " + inst.total_points, { width: colW[5], bold: true, bgColor: "E8ECF0", align: AlignmentType.CENTER }),
      ],
    });
    return new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows: [headerRow, ...dataRows, scoreRow],
    });
  }
  return null;
}

function buildPeerEvalForm(peerForm) {
  const items = [];
  items.push(new Paragraph({
    children: [new TextRun({ text: peerForm.title, font: "Arial", bold: true, size: 22, color: NAVY })],
    spacing: { before: 160, after: 80 },
  }));
  items.push(new Paragraph({
    children: [new TextRun({ text: peerForm.instructions, font: "Calibri", size: 20, italic: true, color: "555555" })],
    spacing: { before: 0, after: 100 },
  }));
  const colW = [3000, 800, 5560];
  const hdrRow = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Communication Function", colW[0]),
      makeFreshHeaderCell("Observed (checkmark)", colW[1]),
      makeFreshHeaderCell("Example sentence heard", colW[2]),
    ],
  });
  const dataRows = peerForm.items.map((item, idx) => {
    const bg = idx % 2 === 0 ? null : ALT_ROW;
    return new TableRow({
      height: { value: 480, rule: "atLeast" },
      children: [
        makeFreshCell(item.function, { width: colW[0], bgColor: bg }),
        makeFreshCell("", { width: colW[1], bgColor: bg }),
        makeFreshCell("", { width: colW[2], bgColor: bg }),
      ],
    });
  });
  const feedbackRow = new TableRow({
    children: [
      makeFreshCell("Strength observed:", { width: colW[0], bold: true, bgColor: ALT_ROW }),
      makeFreshCell("", { width: colW[1] + colW[2], colSpan: 2, bgColor: ALT_ROW }),
    ],
  });
  const suggRow = new TableRow({
    children: [
      makeFreshCell("Suggestion:", { width: colW[0], bold: true }),
      makeFreshCell("", { width: colW[1] + colW[2], colSpan: 2 }),
    ],
  });
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colW,
    rows: [hdrRow, ...dataRows, feedbackRow, suggRow],
  }));
  return items;
}

function scaleReferenceTable(scaleRef) {
  if (!scaleRef) return null;
  const colW = [700, 8660];
  const keys = Object.keys(scaleRef);
  const hdrRow = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Score", colW[0]),
      makeFreshHeaderCell("Descriptor", colW[1]),
    ],
  });
  const dataRows = keys.map((k, idx) => {
    const bg = idx % 2 === 0 ? null : ALT_ROW;
    return new TableRow({
      children: [
        makeFreshCell(k, { width: colW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
        makeFreshCell(scaleRef[k], { width: colW[1], bgColor: bg }),
      ],
    });
  });
  return new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colW,
    rows: [hdrRow, ...dataRows],
  });
}

function signatureLine() {
  return new Paragraph({
    children: [new TextRun({ text: "Instructor signature: _____________________________   Date: _______________", font: "Calibri", size: 20, color: "444444" })],
    spacing: { before: 200, after: 80 },
    indent: { left: 120 },
  });
}

function buildSingleInstrument(inst) {
  const items = [];

  // Page break before each instrument
  items.push(pageBreak());

  // Instrument heading 2
  items.push(heading2(inst.title));

  // Info table
  items.push(instrumentHeaderTable(inst));
  items.push(new Paragraph({ spacing: { after: 100 } }));

  // Instructions box
  const instrText = inst.instructions_student || inst.instructions_instructor || "";
  const instrEs = inst.instructions_es || "";
  if (instrText) {
    items.push(new Paragraph({
      children: [new TextRun({ text: "Instructions: ", font: "Calibri", size: 20, bold: true, color: NAVY }), new TextRun({ text: instrText, font: "Calibri", size: 20 })],
      spacing: { before: 60, after: 40 },
      shading: { type: ShadingType.CLEAR, fill: "EEF2F6" },
      indent: { left: 120, right: 120 },
    }));
  }
  if (instrEs) {
    items.push(new Paragraph({
      children: [new TextRun({ text: "Instrucciones: ", font: "Calibri", size: 20, bold: true, color: "555555" }), new TextRun({ text: instrEs, font: "Calibri", size: 20, italic: true, color: "555555" })],
      spacing: { before: 0, after: 100 },
      shading: { type: ShadingType.CLEAR, fill: "EEF2F6" },
      indent: { left: 120, right: 120 },
    }));
  }

  // Student / Instructor header
  const headerFields = inst.student_header ? inst.student_header.fields : (inst.instructor_header ? inst.instructor_header.fields : null);
  if (headerFields && headerFields.length > 0) {
    const tbl = inst.student_header ? studentHeaderTable(headerFields) : instructorHeaderTable(headerFields);
    if (tbl) {
      items.push(tbl);
      items.push(new Paragraph({ spacing: { after: 100 } }));
    }
  }

  // Scale reference
  if (inst.scale_reference) {
    items.push(new Paragraph({
      children: [new TextRun({ text: "Rating Scale Reference", font: "Arial", bold: true, size: 20, color: NAVY })],
      spacing: { before: 100, after: 60 },
    }));
    const scTbl = scaleReferenceTable(inst.scale_reference);
    if (scTbl) {
      items.push(scTbl);
      items.push(new Paragraph({ spacing: { after: 100 } }));
    }
  }

  // Main evaluation table
  const evalTable = buildEvaluationFormTable(inst);
  if (evalTable) {
    items.push(evalTable);
    items.push(new Paragraph({ spacing: { after: 100 } }));
  }

  // Signature line
  items.push(signatureLine());

  // Peer evaluation form for INST-5
  if (inst.peer_evaluation_form_simplified) {
    const peerItems = buildPeerEvalForm(inst.peer_evaluation_form_simplified);
    items.push(...peerItems);
  }

  return items;
}

function buildAppendixA() {
  const items = [
    pageBreak(),
    heading1("APPENDIX A — Instrumentos de Evaluación (PM-4.1)"),
    new Paragraph({
      children: [new TextRun({ text: data41.description, font: "Calibri", size: 20, italic: true, color: "555555" })],
      spacing: { before: 60, after: 120 },
    }),
  ];
  for (const inst of data41.instruments) {
    items.push(...buildSingleInstrument(inst));
  }
  return items;
}

// =============================================
// APPENDIX B — CUESTIONARIO CONSOLIDADO No 6 (PM-4.2)
// =============================================

function buildQuestionaireHeaderBlock() {
  const items = [];

  // Title paragraph
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "CUESTIONARIO CONSOLIDADO No 6 — EVIDENCE 6", font: "Arial", bold: true, size: 28, color: WHITE })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 0, after: 0 },
    indent: { left: 120, right: 120 },
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: data42.guide + "  |  " + data42.header_institucional.programa, font: "Calibri", size: 22, color: WHITE })],
    shading: { type: ShadingType.CLEAR, fill: "2E4A6B" },
    spacing: { before: 0, after: 120 },
    indent: { left: 120, right: 120 },
  }));

  // Sub-fields table
  const colW = [3000, 1500, 1500, 3360];
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          makeFreshHeaderCell("Nombre del Aprendiz", colW[0]),
          makeFreshHeaderCell("Fecha", colW[1]),
          makeFreshHeaderCell("Ficha", colW[2]),
          makeFreshHeaderCell("Tiempo: 90 minutos", colW[3]),
        ],
      }),
      new TableRow({
        height: { value: 480, rule: "atLeast" },
        children: [
          makeFreshCell("", { width: colW[0] }),
          makeFreshCell("", { width: colW[1] }),
          makeFreshCell("", { width: colW[2] }),
          makeFreshCell("Score: ___ / 25", { width: colW[3], bold: true, align: AlignmentType.CENTER }),
        ],
      }),
    ],
  }));

  items.push(new Paragraph({ spacing: { after: 100 } }));

  // Instructions box
  items.push(new Paragraph({
    children: [
      new TextRun({ text: "Instructions (EN): ", font: "Calibri", size: 20, bold: true, color: NAVY }),
      new TextRun({ text: data42.student_instructions.en, font: "Calibri", size: 20 }),
    ],
    spacing: { before: 60, after: 0 },
    shading: { type: ShadingType.CLEAR, fill: "EEF2F6" },
    indent: { left: 120, right: 120 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 2, color: NAVY },
    },
  }));
  items.push(new Paragraph({
    children: [
      new TextRun({ text: "Instrucciones (ES): ", font: "Calibri", size: 20, bold: true, color: "555555" }),
      new TextRun({ text: data42.student_instructions.es, font: "Calibri", size: 20, italic: true, color: "555555" }),
    ],
    spacing: { before: 0, after: 120 },
    shading: { type: ShadingType.CLEAR, fill: "EEF2F6" },
    indent: { left: 120, right: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 2, color: NAVY },
    },
  }));

  return items;
}

function buildQuestionaireSection(section) {
  const items = [];

  // Section header
  items.push(new Paragraph({
    children: [new TextRun({ text: `${section.title} (Items ${section.items[0].item_number}–${section.items[section.items.length - 1].item_number}, ${section.points_possible} points)`, font: "Arial", bold: true, size: 22, color: WHITE })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 160, after: 0 },
    indent: { left: 120, right: 120 },
  }));
  if (section.subtitle) {
    items.push(new Paragraph({
      children: [new TextRun({ text: section.subtitle, font: "Calibri", size: 20, color: WHITE })],
      shading: { type: ShadingType.CLEAR, fill: "2E4A6B" },
      spacing: { before: 0, after: 80 },
      indent: { left: 120, right: 120 },
    }));
  }
  if (section.context_note) {
    items.push(new Paragraph({
      children: [new TextRun({ text: section.context_note, font: "Calibri", size: 18, italic: true, color: "555555" })],
      spacing: { before: 40, after: 80 },
      indent: { left: 120 },
    }));
  }

  // Each item
  for (const item of section.items) {
    const isTrueFalse = item.options && (item.options.TRUE !== undefined || item.options.FALSE !== undefined);
    const shade = (item.item_number % 2 === 0) ? ALT_ROW : null;

    // Item question line
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${item.item_number}. `, font: "Calibri", size: 22, bold: true }),
        new TextRun({ text: item.question, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 120, after: 40 },
      shading: shade ? { type: ShadingType.CLEAR, fill: shade } : undefined,
      indent: { left: 120 },
    }));

    if (isTrueFalse) {
      items.push(new Paragraph({
        children: [new TextRun({ text: "     ( )  TRUE          ( )  FALSE", font: "Calibri", size: 22 })],
        spacing: { before: 40, after: 100 },
        shading: shade ? { type: ShadingType.CLEAR, fill: shade } : undefined,
        indent: { left: 120 },
      }));
    } else {
      const opts = [
        { key: "a", text: item.options && item.options.a ? item.options.a : "" },
        { key: "b", text: item.options && item.options.b ? item.options.b : "" },
        { key: "c", text: item.options && item.options.c ? item.options.c : "" },
      ];
      for (let oi = 0; oi < opts.length; oi++) {
        if (!opts[oi].text) continue;
        items.push(new Paragraph({
          children: [new TextRun({ text: `     ( )  ${opts[oi].key})  ${opts[oi].text}`, font: "Calibri", size: 22 })],
          spacing: { before: 20, after: oi === opts.length - 1 ? 100 : 20 },
          shading: shade ? { type: ShadingType.CLEAR, fill: shade } : undefined,
          indent: { left: 120 },
        }));
      }
    }
  }

  return items;
}

function buildAppendixB() {
  const items = [
    pageBreak(),
    heading1("APPENDIX B — Cuestionario Consolidado No 6 (PM-4.2)"),
    ...buildQuestionaireHeaderBlock(),
  ];

  for (const section of data42.sections) {
    items.push(...buildQuestionaireSection(section));
  }

  // Score box at end
  items.push(new Paragraph({ spacing: { before: 200, after: 0 } }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Score: _____ / 25  |  Band: _________________", font: "Calibri", size: 26, bold: true, color: NAVY })],
    spacing: { before: 120, after: 120 },
    shading: { type: ShadingType.CLEAR, fill: "EEF2F6" },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
    },
    indent: { left: 720, right: 720 },
  }));

  return items;
}

// =============================================
// APPENDIX C — FINAL MISSION ADMINISTRATION GUIDE (PM-3.5)
// =============================================

function buildAppendixC() {
  const d = data35;
  const ts = d.task_specification;
  const ma = d.model_assets;
  const ei = d.evaluation_instrument;
  const pg = d.preparation_guide;
  const ag = d.administration_guide_s8;
  const items = [];

  // === PAGE BREAK + APPENDIX HEADING ===
  items.push(new Paragraph({
    pageBreakBefore: true,
    children: [new TextRun({ text: "APPENDIX C — FINAL MISSION ADMINISTRATION GUIDE (PM-3.5)", font: "Arial", bold: true, color: WHITE, size: 28 })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 240, after: 120 },
    indent: { left: 120, right: 120 },
  }));
  items.push(new Paragraph({
    children: [new TextRun({ text: "Internal instructor document. Not distributed to apprentices.", font: "Calibri", size: 20, italic: true, color: "555555" })],
    spacing: { before: 60, after: 120 },
  }));

  // === C.1 TASK SPECIFICATION ===
  items.push(heading2("C.1 Task Specification"));

  // Scenario text
  items.push(heading3("Scenario"));
  items.push(boldLabel("Setting", ts.scenario.setting));
  items.push(bodyPara(ts.scenario.context));
  items.push(bodyPara(ts.scenario.context_es, { italic: true, color: "555555" }));
  items.push(boldLabel("Bay Assigned", ts.scenario.bay));

  // Roles table — 3 columns: Role, Functions Required, Key Actions
  items.push(heading3("Roles Table"));
  const rolesColW = [1400, 3600, 4360];
  const rolesHdrRow = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Role / Character", rolesColW[0]),
      makeFreshHeaderCell("Functions Required", rolesColW[1]),
      makeFreshHeaderCell("Key Actions", rolesColW[2]),
    ],
  });

  const rolesData = [
    {
      name: "CARLOS — Lead Technician / Supervisor",
      fns: ts.roles_table.CARLOS.functions_required,
      acts: ts.roles_table.CARLOS.key_actions,
      bg: null,
    },
    {
      name: "VALENTINA — Apprentice",
      fns: ts.roles_table.VALENTINA.functions_required,
      acts: ts.roles_table.VALENTINA.key_actions,
      bg: ALT_ROW,
    },
    {
      name: "SANTIAGO — Technician",
      fns: ts.roles_table.SANTIAGO.functions_required,
      acts: ts.roles_table.SANTIAGO.key_actions,
      bg: null,
    },
  ];

  function makeMultilineCell(lines, width, opts = {}) {
    const { bold = false, color = "000000", bgColor = null, italic = false, fontSize = 20 } = opts;
    const children = lines.map((line, i) => new Paragraph({
      children: [new TextRun({ text: String(line || ""), font: "Calibri", size: fontSize, bold, color, italic })],
      spacing: { before: i === 0 ? 40 : 20, after: i === lines.length - 1 ? 40 : 20 },
    }));
    const cellOpts = {
      children,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: VerticalAlign.TOP,
      borders: {
        top: makeFreshThinBorder(),
        bottom: makeFreshThinBorder(),
        left: makeFreshThinBorder(),
        right: makeFreshThinBorder(),
      },
    };
    if (bgColor) cellOpts.shading = { type: ShadingType.CLEAR, fill: bgColor };
    if (width) cellOpts.width = { size: width, type: WidthType.DXA };
    return new TableCell(cellOpts);
  }

  const rolesRows = rolesData.map(r => new TableRow({
    children: [
      makeFreshCell(r.name, { width: rolesColW[0], bold: true, bgColor: r.bg }),
      makeMultilineCell(r.fns, rolesColW[1], { bgColor: r.bg }),
      makeMultilineCell(r.acts, rolesColW[2], { bgColor: r.bg }),
    ],
  }));

  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: rolesColW,
    rows: [rolesHdrRow, ...rolesRows],
  }));

  // 8 Task Requirements as numbered list
  items.push(heading3("Task Requirements"));
  ts.task_requirements.forEach((req, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: ORANGE }),
        new TextRun({ text: req, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });

  // Duration and Materials
  items.push(heading3("Duration and Permitted Materials"));
  items.push(boldLabel("Duration", "3–4 minutes per team (timed in S8)"));
  const pm = ts.permitted_materials_s8;
  items.push(boldLabel("Visible", pm.visible));
  items.push(boldLabel("Not Permitted", pm.not_permitted.join("; ")));

  // === C.2 MODEL ASSETS ===
  items.push(heading2("C.2 Model Assets"));

  // Helper: render a script section table
  function buildScriptTable(scriptObj) {
    const colW = [1200, 6000, 2160];
    const hdr = new TableRow({
      tableHeader: true,
      children: [
        makeFreshHeaderCell("Speaker", colW[0]),
        makeFreshHeaderCell("Line", colW[1]),
        makeFreshHeaderCell("Function Label", colW[2]),
      ],
    });
    const rows = scriptObj.lines.map((ln, i) => {
      const bg = i % 2 === 0 ? null : ALT_ROW;
      return new TableRow({
        children: [
          makeFreshCell(ln.speaker, { width: colW[0], bold: true, bgColor: bg }),
          makeFreshCell(ln.line, { width: colW[1], bgColor: bg, italic: true }),
          makeFreshCell(ln.function, { width: colW[2], bgColor: bg, color: "555555" }),
        ],
      });
    });
    return new Table({
      width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
      columnWidths: colW,
      rows: [hdr, ...rows],
    });
  }

  items.push(heading3(ma.sample_opening_60sec.title));
  items.push(buildScriptTable(ma.sample_opening_60sec));

  items.push(heading3(ma.sample_middle_interactions.title));
  items.push(buildScriptTable(ma.sample_middle_interactions));

  items.push(heading3(ma.sample_closing_30sec.title));
  items.push(buildScriptTable(ma.sample_closing_30sec));
  items.push(bodyPara(ma.note || "", { italic: true, color: "666666" }));

  // Stock Card A — Bay Status
  items.push(heading3(ma.stock_card_a_bay_status.title));
  const scaColW = [600, 8760];
  const scaRows = [
    new TableRow({
      tableHeader: true,
      children: [
        makeFreshHeaderCell("#", scaColW[0]),
        makeFreshHeaderCell("Bay Status Option", scaColW[1]),
      ],
    }),
    ...ma.stock_card_a_bay_status.items.map((item, i) => new TableRow({
      children: [
        makeFreshCell(`${i + 1}`, { width: scaColW[0], bold: true, bgColor: i % 2 === 0 ? null : ALT_ROW }),
        makeFreshCell(item, { width: scaColW[1], bgColor: i % 2 === 0 ? null : ALT_ROW }),
      ],
    })),
  ];
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: scaColW,
    rows: scaRows,
  }));

  // Stock Card B — Sentence Starters
  items.push(heading3(ma.stock_card_b_sentence_starters.title));
  const scbColW = [600, 8760];
  const scbRows = [
    new TableRow({
      tableHeader: true,
      children: [
        makeFreshHeaderCell("#", scbColW[0]),
        makeFreshHeaderCell("Sentence Starter", scbColW[1]),
      ],
    }),
    ...ma.stock_card_b_sentence_starters.starters.map((s, i) => new TableRow({
      children: [
        makeFreshCell(`${i + 1}`, { width: scbColW[0], bold: true, bgColor: i % 2 === 0 ? null : ALT_ROW }),
        makeFreshCell(s, { width: scbColW[1], bgColor: i % 2 === 0 ? null : ALT_ROW, italic: true }),
      ],
    })),
  ];
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: scbColW,
    rows: scbRows,
  }));

  // Chunk Cards (Pronunciation Targets)
  items.push(heading3(ma.pronunciation_targets.title));
  const ccColW = [2000, 2200, 2580, 2580];
  const ccHdr = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Term", ccColW[0]),
      makeFreshHeaderCell("IPA", ccColW[1]),
      makeFreshHeaderCell("Chunk 1", ccColW[2]),
      makeFreshHeaderCell("Chunk 2", ccColW[3]),
    ],
  });
  const ccRows = ma.pronunciation_targets.terms.map((t, i) => {
    const bg = i % 2 === 0 ? null : ALT_ROW;
    const chunkParts = (t.chunks || "").split(" — ");
    return new TableRow({
      children: [
        makeFreshCell(t.term, { width: ccColW[0], bold: true, bgColor: bg }),
        makeFreshCell(t.ipa, { width: ccColW[1], bgColor: bg, italic: true, color: "444444" }),
        makeFreshCell(chunkParts[0] || "", { width: ccColW[2], bgColor: bg }),
        makeFreshCell(chunkParts[1] || "", { width: ccColW[3], bgColor: bg }),
      ],
    });
  });
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: ccColW,
    rows: [ccHdr, ...ccRows],
  }));

  // === C.3 EVALUATION INSTRUMENT ===
  items.push(heading2("C.3 Evaluation Instrument — Escala de Estimación No 6"));
  items.push(boldLabel("Evaluator", ei.evaluator));
  items.push(boldLabel("Scoring Formula", ei.scoring));
  items.push(boldLabel("Follow-up Question", ei.follow_up_question));

  // Student name / date / group header fields
  items.push(heading3("Student Header Fields"));
  const shColW = [3120, 3120, 3120];
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: shColW,
    rows: [
      new TableRow({
        children: [
          makeFreshHeaderCell("Student Name", shColW[0]),
          makeFreshHeaderCell("Date", shColW[1]),
          makeFreshHeaderCell("Group / Ficha", shColW[2]),
        ],
      }),
      new TableRow({
        height: { value: 480, rule: "atLeast" },
        children: [
          makeFreshCell("", { width: shColW[0] }),
          makeFreshCell("", { width: shColW[1] }),
          makeFreshCell("", { width: shColW[2] }),
        ],
      }),
    ],
  }));

  // All 6 criteria table — criterion / 1 / 2 / 3 / 4 / 5
  items.push(heading3("Criteria — Full Rubric"));
  const crColW = [400, 4560, 700, 700, 700, 700, 700];
  const crHdr = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("#", crColW[0]),
      makeFreshHeaderCell("Criterion", crColW[1]),
      makeFreshHeaderCell("1", crColW[2]),
      makeFreshHeaderCell("2", crColW[3]),
      makeFreshHeaderCell("3", crColW[4]),
      makeFreshHeaderCell("4", crColW[5]),
      makeFreshHeaderCell("5", crColW[6]),
    ],
  });
  const crRows = ei.criteria_summary.map((c, i) => {
    const bg = i % 2 === 0 ? null : ALT_ROW;
    return new TableRow({
      height: { value: 480, rule: "atLeast" },
      children: [
        makeFreshCell(`${c.n}`, { width: crColW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
        makeFreshCell(c.criterion, { width: crColW[1], bgColor: bg }),
        makeFreshCell("", { width: crColW[2], bgColor: bg }),
        makeFreshCell("", { width: crColW[3], bgColor: bg }),
        makeFreshCell("", { width: crColW[4], bgColor: bg }),
        makeFreshCell("", { width: crColW[5], bgColor: bg }),
        makeFreshCell("", { width: crColW[6], bgColor: bg }),
      ],
    });
  });
  // Total score row
  const crScoreRow = new TableRow({
    children: [
      makeFreshCell("", { width: crColW[0], bgColor: "E8ECF0" }),
      makeFreshCell("TOTAL (sum ÷ 6 = holistic 1–5)", { width: crColW[1], bold: true, bgColor: "E8ECF0" }),
      makeFreshCell("", { width: crColW[2], colSpan: 5, bgColor: "E8ECF0" }),
      makeFreshCell("___ / 5", { width: crColW[6], bold: true, bgColor: "E8ECF0", align: AlignmentType.CENTER }),
    ],
  });
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: crColW,
    rows: [crHdr, ...crRows, crScoreRow],
  }));

  // Holistic scale table 1–5
  items.push(heading3("Holistic Scale Reference"));
  const hsColW = [700, 8660];
  const hsHdr = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Score", hsColW[0]),
      makeFreshHeaderCell("Descriptor", hsColW[1]),
    ],
  });
  const scaleKeys = Object.keys(ei.scale_reference).sort((a, b) => Number(b) - Number(a));
  const hsRows = scaleKeys.map((k, i) => {
    const bg = i % 2 === 0 ? null : ALT_ROW;
    return new TableRow({
      children: [
        makeFreshCell(k, { width: hsColW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
        makeFreshCell(ei.scale_reference[k], { width: hsColW[1], bgColor: bg }),
      ],
    });
  });
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: hsColW,
    rows: [hsHdr, ...hsRows],
  }));

  // === C.4 PREPARATION GUIDE (SESSION 7) ===
  items.push(heading2("C.4 Preparation Guide (Session 7)"));

  // 3-round rehearsal protocol table: Round / Focus / Tool / Output
  items.push(heading3(pg.s7_prep_summary.title));
  const rrColW = [600, 2560, 2200, 4000];
  const rrHdr = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Round", rrColW[0]),
      makeFreshHeaderCell("Focus", rrColW[1]),
      makeFreshHeaderCell("Tool / Method", rrColW[2]),
      makeFreshHeaderCell("Output / Feedback", rrColW[3]),
    ],
  });
  const rrRows = pg.s7_prep_summary.rounds.map((r, i) => {
    const bg = i % 2 === 0 ? null : ALT_ROW;
    return new TableRow({
      children: [
        makeFreshCell(`Round ${r.round}`, { width: rrColW[0], bold: true, bgColor: bg, align: AlignmentType.CENTER }),
        makeFreshCell(r.focus, { width: rrColW[1], bgColor: bg }),
        makeFreshCell(r.tool, { width: rrColW[2], bgColor: bg }),
        makeFreshCell(r.output, { width: rrColW[3], bgColor: bg }),
      ],
    });
  });
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: rrColW,
    rows: [rrHdr, ...rrRows],
  }));
  items.push(bodyPara("Between rounds: " + pg.s7_prep_summary.between_rounds, { italic: true, color: "555555" }));

  // Role Card template
  items.push(heading3(pg.role_card_guide.title));
  pg.role_card_guide.sections.forEach((s, i) => {
    items.push(new Paragraph({
      children: [new TextRun({ text: s, font: "Calibri", size: 20 })],
      spacing: { before: 40, after: 40 },
      indent: { left: 240 },
    }));
  });
  items.push(bodyPara(pg.role_card_guide.note, { italic: true, color: "666666" }));

  // Autonomous prep tasks
  items.push(heading3("Autonomous Prep Tasks (Session 7)"));
  items.push(boldLabel("Duration", `${pg.autonomous_prep_s7.duration_h * 60} min`));
  pg.autonomous_prep_s7.tasks.forEach((t, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: ORANGE }),
        new TextRun({ text: t, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });

  // === C.5 ADMINISTRATION GUIDE (SESSION 8) ===
  items.push(heading2("C.5 Administration Guide (Session 8)"));

  // Timing per team
  const tp = ag.timing_per_team;
  items.push(heading3("Timing Per Team"));
  items.push(boldLabel("Performance", tp.performance));
  items.push(boldLabel("Follow-up Q&A", tp.follow_up));
  items.push(boldLabel("Marking / Transition", tp.marking_transition));
  items.push(boldLabel("Observer Share", tp.observer_share));
  items.push(boldLabel("Total Per Team", tp.total));

  // Pre-performance protocol
  items.push(heading3("Pre-Performance Protocol"));
  ag.pre_performance.forEach((step, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: step, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });

  // During-performance notes
  items.push(heading3("During Performance Notes (One-Prompt Rule)"));
  ag.during_performance.forEach((step, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: step, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });

  // Post-performance protocol (after each)
  items.push(heading3("Post-Performance Protocol (After Each Team)"));
  ag.after_each_performance.forEach((step, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: step, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });

  // Post-all-performances
  items.push(heading3("Post All Performances — Exit from Training Coordinator Role"));
  ag.post_all_performances.forEach((step, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: ORANGE }),
        new TextRun({ text: step, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });
  items.push(boldLabel("Feedback Return", ag.feedback_return));

  // Follow-up question bank — pulled from evaluation_instrument
  items.push(heading3("Follow-Up Question Bank"));
  items.push(bodyPara(ei.follow_up_question, { italic: true, color: "555555" }));
  // Display the 5 reference functions as a question bank table
  const fqColW = [700, 2000, 6660];
  const fqHdr = new TableRow({
    tableHeader: true,
    children: [
      makeFreshHeaderCell("Fn.", fqColW[0]),
      makeFreshHeaderCell("Function Name", fqColW[1]),
      makeFreshHeaderCell("Example Structures / Follow-up Prompts", fqColW[2]),
    ],
  });
  const fnKeys = Object.keys(ts.function_reference);
  const fqRows = fnKeys.map((k, i) => {
    const fn = ts.function_reference[k];
    const bg = i % 2 === 0 ? null : ALT_ROW;
    return new TableRow({
      children: [
        makeFreshCell(k, { width: fqColW[0], bold: true, bgColor: bg, color: NAVY }),
        makeFreshCell(fn.name, { width: fqColW[1], bgColor: bg, bold: true }),
        makeFreshCell(fn.structure, { width: fqColW[2], bgColor: bg, italic: true }),
      ],
    });
  });
  items.push(new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: fqColW,
    rows: [fqHdr, ...fqRows],
  }));

  // Re-entry procedure from Training Coordinator role
  items.push(heading3("Re-Entry Procedure — Instructor Returns from Training Coordinator Role"));
  items.push(bodyPara("After all teams have performed, the instructor explicitly exits the Training Coordinator role using the following steps:"));
  const reentrySteps = [
    "Stand up from the side table / Training Coordinator seat.",
    "Move physically to the front of the classroom.",
    "Say aloud: 'I am your instructor now.' (This signals the role boundary is closed.)",
    "Lead one whole-class observation round: what functions were seen? which terms appeared across teams? what team interaction patterns emerged?",
    "Transition to WHILE-B (Full Circle activities) per the S8 session plan.",
  ];
  reentrySteps.forEach((step, i) => {
    items.push(new Paragraph({
      children: [
        new TextRun({ text: `${i + 1}.  `, font: "Calibri", size: 22, bold: true, color: ORANGE }),
        new TextRun({ text: step, font: "Calibri", size: 22 }),
      ],
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
    }));
  });

  return items;
}

// =============================================
// ASSEMBLE DOCUMENT
// =============================================

const docChildren = [
  // Cover
  ...buildCoverPage(),

  // Metadata + overview
  ...buildMetadataSection(),
  new Paragraph({ spacing: { after: 120 } }),
  ...buildSessionOverview(),
  new Paragraph({ spacing: { after: 120 } }),
  ...buildSkillsProgressionMap(),
  new Paragraph({ spacing: { after: 120 } }),
  ...buildAutonomousWorkMap(),
  new Paragraph({ spacing: { after: 120 } }),
  ...buildEvaluationSummary(),

  // Session details — each on new page
  ...data.sessions_detail.flatMap(sess => [
    pageBreak(),
    ...buildSessionDetail(sess),
  ]),

  // Notes
  pageBreak(),
  ...buildNotesSection(),

  // Master materials
  pageBreak(),
  ...buildMasterMaterials(),

  // Appendix A — Evaluation Instruments (PM-4.1)
  ...buildAppendixA(),

  // Appendix B — Cuestionario Consolidado No 6 (PM-4.2)
  ...buildAppendixB(),

  // Appendix C — Final Mission Administration Guide (PM-3.5)
  ...buildAppendixC(),
];

// =============================================
// CREATE DOCUMENT
// =============================================

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22 },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: "Arial", size: 28, bold: true, color: WHITE },
        paragraph: {
          outlineLevel: 0,
          spacing: { before: 240, after: 120 },
        },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: "Arial", size: 24, bold: true, color: NAVY },
        paragraph: {
          outlineLevel: 1,
          spacing: { before: 200, after: 80 },
        },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: "Arial", size: 22, bold: true, color: ORANGE },
        paragraph: {
          outlineLevel: 2,
          spacing: { before: 160, after: 60 },
        },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: "PM-3.1 | Playbook Outline | Guía 1.1 — The Workshop Specialist", font: "Calibri", size: 18, color: "666666" }),
              ],
              border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: "SENA · Mantenimiento de Motores Diesel · CEFR A1.1-A1.2 · DIESEL-2026-04-18 · Page ", font: "Calibri", size: 18, color: "666666" }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: "666666" }),
              ],
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      children: docChildren,
    },
  ],
});

// =============================================
// WRITE FILE
// =============================================

const outDir = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-18";
const outFile = path.join(outDir, "pm-3-1-playbook-outline.docx");

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outFile, buffer);
  console.log("DONE: Written to", outFile);
}).catch(err => {
  console.error("ERROR:", err);
  process.exit(1);
});
