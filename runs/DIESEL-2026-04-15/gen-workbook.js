const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak, TabStopType,
  TabStopPosition
} = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const fs = require("fs");

// Design system
const NAVY = "1C2B3C";
const ORANGE = "F59316";
const LIGHT_BG = "F3F5F7";
const WHITE = "FFFFFF";
const GRAY = "CCCCCC";
const DARK_GRAY = "4A4A4A";
const MID_GRAY = "E8EAED";

// Page / margin constants (US Letter)
const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const MARGIN = 1080; // 0.75 inch
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 10080

// Helper: blank border (no border)
function noBorder() {
  return { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
}
function noBorders() {
  return { top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() };
}

// Helper: thin border
function thinBorder(color) {
  color = color || GRAY;
  return { style: BorderStyle.SINGLE, size: 4, color };
}
function thinBorders(color) {
  const b = thinBorder(color);
  return { top: b, bottom: b, left: b, right: b };
}

// Helper: line (writing lines)
function writingLine(text) {
  return new Paragraph({
    children: [new TextRun({ text: text || "", font: "Calibri", size: 22, color: DARK_GRAY })],
    spacing: { before: 0, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GRAY } }
  });
}

function blankLines(n) {
  const lines = [];
  for (let i = 0; i < n; i++) {
    lines.push(writingLine(""));
  }
  return lines;
}

// Helper: spacer paragraph
function spacer(pts) {
  return new Paragraph({ children: [], spacing: { before: pts || 60, after: 0 } });
}

// Helper: section header (navy background)
function sectionHeader(text, sessionCode) {
  const children = [new TextRun({ text: sessionCode ? sessionCode + "  " : "", font: "Arial", size: 24, bold: true, color: ORANGE })];
  children.push(new TextRun({ text: text, font: "Arial", size: 24, bold: true, color: WHITE }));
  return new Paragraph({
    children,
    spacing: { before: 240, after: 120 },
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    indent: { left: 120, right: 120 }
  });
}

// Helper: activity title bar (orange left border)
function activityTitle(text, evidenceBadge) {
  const children = [];
  if (evidenceBadge) {
    children.push(new TextRun({ text: "  EVIDENCE " + evidenceBadge + "  ", font: "Arial", size: 18, bold: true, color: WHITE, highlight: undefined }));
    // We'll simulate badge with orange text
    children.push(new TextRun({ text: "  ", font: "Arial", size: 20 }));
  }
  children.push(new TextRun({ text: text, font: "Arial", size: 22, bold: true, color: NAVY }));
  return new Paragraph({
    children,
    spacing: { before: 200, after: 80 },
    border: { left: { style: BorderStyle.SINGLE, size: 16, color: ORANGE } },
    indent: { left: 160 }
  });
}

// Helper: evidence badge paragraph
function evidenceBadge(code) {
  return new Paragraph({
    children: [
      new TextRun({ text: " EVIDENCE " + code + " ", font: "Arial", size: 18, bold: true, color: WHITE })
    ],
    spacing: { before: 0, after: 80 },
    shading: { fill: ORANGE, type: ShadingType.CLEAR }
  });
}

// Helper: instruction text
function instruction(text) {
  return new Paragraph({
    children: [new TextRun({ text: text, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
    spacing: { before: 60, after: 80 }
  });
}

// Helper: body text
function bodyText(text, opts) {
  opts = opts || {};
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22, bold: opts.bold, color: opts.color || DARK_GRAY })],
    spacing: { before: opts.before || 40, after: opts.after || 60 }
  });
}

// Helper: bold label + plain text on same line
function labelLine(label, value) {
  return new Paragraph({
    children: [
      new TextRun({ text: label + ": ", font: "Calibri", size: 22, bold: true, color: NAVY }),
      new TextRun({ text: value || "", font: "Calibri", size: 22, color: DARK_GRAY })
    ],
    spacing: { before: 60, after: 60 }
  });
}

// Helper: make a simple table row
function makeRow(cells, opts) {
  opts = opts || {};
  return new TableRow({
    tableHeader: opts.header || false,
    children: cells.map((cell, i) => {
      const colWidth = opts.colWidths ? opts.colWidths[i] : Math.floor(CONTENT_WIDTH / cells.length);
      return new TableCell({
        borders: thinBorders(opts.borderColor || GRAY),
        width: { size: colWidth, type: WidthType.DXA },
        shading: { fill: cell.fill || WHITE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: Array.isArray(cell.children) ? cell.children : [
          new Paragraph({
            children: [new TextRun({ text: cell.text || "", font: cell.font || "Calibri", size: cell.size || 20, bold: cell.bold || false, color: cell.color || DARK_GRAY })],
            alignment: cell.align || AlignmentType.LEFT,
            spacing: { before: 0, after: 0 }
          })
        ]
      });
    })
  });
}

// --- PAGE BREAK ---
function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ============================================================
// COVER PAGE
// ============================================================
function buildCover(data) {
  return [
    // large colored block at top
    new Paragraph({
      children: [
        new TextRun({ text: "SENA  |  " + data.program, font: "Arial", size: 24, bold: true, color: ORANGE })
      ],
      spacing: { before: 0, after: 120 },
      shading: { fill: NAVY, type: ShadingType.CLEAR },
      indent: { left: 120, right: 120 }
    }),
    spacer(480),
    new Paragraph({
      children: [new TextRun({ text: data.guide, font: "Arial", size: 28, bold: true, color: ORANGE })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 }
    }),
    new Paragraph({
      children: [new TextRun({ text: "Cuaderno del Aprendiz", font: "Arial", size: 48, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: "Student Workbook", font: "Arial", size: 32, color: DARK_GRAY })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 480 }
    }),
    // CEFR badge
    new Table({
      width: { size: 3600, type: WidthType.DXA },
      columnWidths: [3600],
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({ children: [
          new TableCell({
            borders: noBorders(),
            width: { size: 3600, type: WidthType.DXA },
            shading: { fill: ORANGE, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "CEFR " + data.cefr, font: "Arial", size: 28, bold: true, color: WHITE })]
            })]
          })
        ]})
      ]
    }),
    spacer(480),
    // student fields
    ...data.fields.map(f => new Paragraph({
      children: [new TextRun({ text: f, font: "Calibri", size: 22, color: DARK_GRAY })],
      spacing: { before: 120, after: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GRAY } }
    })),
    spacer(240),
    new Paragraph({
      children: [new TextRun({ text: "Run: " + "DIESEL-2026-04-15", font: "Calibri", size: 18, color: GRAY })],
      alignment: AlignmentType.RIGHT
    })
  ];
}

// ============================================================
// INTRO PAGE
// ============================================================
function buildIntro(data) {
  const paras = [];
  paras.push(sectionHeader("How to Use This Workbook"));
  paras.push(spacer(120));
  paras.push(bodyText("Welcome to the Cuaderno del Aprendiz for Guia 1.1 — The Workshop Specialist. This workbook is YOUR space to write, practice, and reflect. Bring it to every session.", { before: 80 }));
  paras.push(spacer(80));

  // Symbols guide
  paras.push(activityTitle("Symbols Used in This Workbook"));
  const symRows = [
    makeRow([
      { text: "Symbol", bold: true, fill: NAVY, color: WHITE },
      { text: "What to do", bold: true, fill: NAVY, color: WHITE }
    ], { colWidths: [2000, 8080] })
  ];
  data.symbols_guide.forEach(s => {
    symRows.push(makeRow([
      { text: s.symbol, bold: true, color: ORANGE },
      { text: s.meaning }
    ], { colWidths: [2000, 8080] }));
  });
  paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: [2000, 8080], rows: symRows }));

  paras.push(spacer(160));
  paras.push(activityTitle("Session Overview"));
  const ovRows = [
    makeRow([
      { text: "Session", bold: true, fill: NAVY, color: WHITE },
      { text: "Title", bold: true, fill: NAVY, color: WHITE },
      { text: "Focus", bold: true, fill: NAVY, color: WHITE }
    ], { colWidths: [1200, 5040, 3840] })
  ];
  data.session_overview.forEach((s, i) => {
    ovRows.push(makeRow([
      { text: s.tab, bold: true, color: ORANGE, fill: i % 2 === 0 ? WHITE : MID_GRAY },
      { text: s.title, fill: i % 2 === 0 ? WHITE : MID_GRAY },
      { text: s.focus, fill: i % 2 === 0 ? WHITE : MID_GRAY }
    ], { colWidths: [1200, 5040, 3840] }));
  });
  paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: [1200, 5040, 3840], rows: ovRows }));

  paras.push(spacer(160));
  paras.push(new Paragraph({
    children: [new TextRun({ text: data.evaluations_note, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
    spacing: { before: 80, after: 80 },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: ORANGE } },
    indent: { left: 160 }
  }));

  return paras;
}

// ============================================================
// S1 — KWL Chart + Gap Cards + Writing Box
// ============================================================
function buildS1(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S1"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "kwl_chart") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      // KWL table - 3 equal columns
      const colW = Math.floor(CONTENT_WIDTH / 3);
      const headerRow = makeRow(
        mat.columns.map(col => ({
          text: col.letter + " — " + col.heading,
          bold: true,
          fill: NAVY,
          color: WHITE
        })),
        { colWidths: [colW, colW, colW] }
      );
      const promptRow = makeRow(
        mat.columns.map(col => ({
          text: col.prompt,
          fill: LIGHT_BG
        })),
        { colWidths: [colW, colW, colW] }
      );
      // Writing rows
      const writeRows = [];
      for (let i = 0; i < 8; i++) {
        writeRows.push(makeRow(
          mat.columns.map(col => ({
            children: [writingLine("")]
          })),
          { colWidths: [colW, colW, colW] }
        ));
      }
      paras.push(new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [colW, colW, colW],
        rows: [headerRow, promptRow, ...writeRows]
      }));
      paras.push(spacer(120));
    }

    if (mat.type === "gap_cards_table") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Scale: " + mat.scale, font: "Calibri", size: 18, bold: true, color: ORANGE })],
        spacing: { before: 60, after: 80 }
      }));

      // Gap cards table: #, statement, S1, S8, Delta
      const col1 = 560;
      const col2 = 6320;
      const col3 = 1080;
      const col4 = 1080;
      const col5 = 1040; // total = 10080
      const colWidths = [col1, col2, col3, col4, col5];

      const hRow = makeRow([
        { text: "#", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "Statement — I can ...", bold: true, fill: NAVY, color: WHITE },
        { text: mat.columns[0], bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: mat.columns[1], bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "Delta (S8 - S1)", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER }
      ], { colWidths });

      const gcRows = [hRow];
      mat.statements.forEach((s, i) => {
        gcRows.push(makeRow([
          { text: String(s.n), align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: s.statement, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths }));
      });

      paras.push(new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: colWidths,
        rows: gcRows
      }));
      paras.push(spacer(120));
    }

    if (mat.type === "open_writing_box") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.prompt));
      paras.push(...blankLines(mat.lines || 4));
      paras.push(spacer(80));
    }
  });

  return paras;
}

// ============================================================
// S2 — Word Wall + Cuestionario + Matching
// ============================================================
function buildS2(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S2"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "word_wall_table") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      // Build term list flat, grouped by category color
      const catColors = { ENVIRONMENT: "E8F5E9", "TOOLS & EQUIPMENT": "E3F2FD", SAFETY: "FFEBEE", "MAINTENANCE TYPES": "FFFDE7", "DOCUMENTS + QUALITY": "F3E5F5" };
      const col1 = 3360, col2 = 2520, col3 = 4200;
      const colWidths = [col1, col2, col3];

      const hRow = makeRow([
        { text: "Term", bold: true, fill: NAVY, color: WHITE },
        { text: "Category", bold: true, fill: NAVY, color: WHITE },
        { text: "My Sentence (write your own)", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths });

      const rows = [hRow];
      mat.categories.forEach(cat => {
        const bg = catColors[cat.name] || LIGHT_BG;
        cat.terms.forEach(term => {
          rows.push(makeRow([
            { text: term, fill: bg },
            { text: cat.name, fill: bg, color: DARK_GRAY },
            { children: [...blankLines(1)] }
          ], { colWidths }));
        });
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: colWidths, rows }));
      paras.push(spacer(120));
    }

    if (mat.type === "cuestionario") {
      paras.push(pageBreak());
      if (mat.evidence) paras.push(evidenceBadge(mat.evidence));
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      mat.items.forEach(item => {
        const children = [new TextRun({ text: item.n + ". " + item.q, font: "Calibri", size: 22, bold: true, color: NAVY })];
        paras.push(new Paragraph({ children, spacing: { before: 120, after: 60 } }));

        if (item.format === "true_false") {
          paras.push(new Paragraph({
            children: [new TextRun({ text: "Answer: ___________", font: "Calibri", size: 22, color: DARK_GRAY })],
            spacing: { before: 40, after: 80 }
          }));
        } else if (item.options) {
          Object.entries(item.options).forEach(([key, val]) => {
            paras.push(new Paragraph({
              children: [new TextRun({ text: "  " + key + ")  " + val, font: "Calibri", size: 21, color: DARK_GRAY })],
              spacing: { before: 20, after: 20 }
            }));
          });
          paras.push(new Paragraph({
            children: [new TextRun({ text: "  My answer: _____", font: "Calibri", size: 21, color: DARK_GRAY })],
            spacing: { before: 40, after: 80 }
          }));
        }
      });
    }

    if (mat.type === "matching_exercise") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      const colA = 2880, colB = 7200;
      const hRow = makeRow([
        { text: "Column A — Term", bold: true, fill: NAVY, color: WHITE },
        { text: "Column B — Definition", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: [colA, colB] });

      const maxLen = Math.max(mat.column_a.length, mat.column_b.length);
      const rows = [hRow];
      for (let i = 0; i < maxLen; i++) {
        const a = mat.column_a[i];
        const b = mat.column_b[i];
        const fill = i % 2 === 0 ? WHITE : MID_GRAY;
        rows.push(makeRow([
          { text: a ? a.n + ".  ___  " + a.term : "", fill },
          { text: b ? b.letter + ")  " + b.definition : "", fill }
        ], { colWidths: [colA, colB] }));
      }

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: [colA, colB], rows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// S3 — Checklists + Writing Forms
// ============================================================
function buildS3(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S3"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "daily_inspection_checklist") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      // Header fields in a 2x2 table
      const hfCols = [Math.floor(CONTENT_WIDTH / 2), Math.floor(CONTENT_WIDTH / 2)];
      const hfRows = [];
      for (let i = 0; i < mat.header_fields.length; i += 2) {
        hfRows.push(makeRow([
          { text: mat.header_fields[i] || "", fill: LIGHT_BG },
          { text: mat.header_fields[i + 1] || "", fill: LIGHT_BG }
        ], { colWidths: hfCols }));
      }
      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: hfCols, rows: hfRows }));
      paras.push(spacer(80));

      // Checklist items table
      const c1 = 560, c2 = 4520, c3 = 2400, c4 = 2600;
      const itemColWidths = [c1, c2, c3, c4];
      const iHead = makeRow([
        { text: "#", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "Item", bold: true, fill: NAVY, color: WHITE },
        { text: "Status", bold: true, fill: NAVY, color: WHITE },
        { text: "Observation", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: itemColWidths });

      const itemRows = [iHead];
      mat.items.forEach((item, i) => {
        itemRows.push(makeRow([
          { text: String(item.n), align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.item, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.status, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { children: [writingLine("")], fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: itemColWidths }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: itemColWidths, rows: itemRows }));
      paras.push(spacer(80));
      paras.push(bodyText(mat.bay_status_field, { bold: true }));
      paras.push(new Paragraph({
        children: [new TextRun({ text: mat.required_actions_space, font: "Calibri", size: 22, color: DARK_GRAY })],
        spacing: { before: 60, after: 60 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GRAY } }
      }));
      paras.push(spacer(100));
    }

    if (mat.type === "work_order_header") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      const wocols = [2400, 7680];
      const woHead = makeRow([
        { text: "Field", bold: true, fill: NAVY, color: WHITE },
        { text: "Your Answer", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: wocols });

      const woRows = [woHead];
      mat.fields.forEach((f, i) => {
        woRows.push(makeRow([
          { text: f.n + ". " + f.label, bold: true, fill: i % 2 === 0 ? LIGHT_BG : WHITE },
          { children: [writingLine("")], fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: wocols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: wocols, rows: woRows }));
      paras.push(spacer(120));
    }

    if (mat.type === "writing_self_checklist") {
      paras.push(pageBreak());
      if (mat.evidence) paras.push(evidenceBadge(mat.evidence));
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      const sccols = [560, 7280, 1440, 800];
      const scHead = makeRow([
        { text: "#", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "Criterion", bold: true, fill: NAVY, color: WHITE },
        { text: "Check", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "", fill: NAVY }
      ], { colWidths: sccols });

      const scRows = [scHead];
      mat.criteria.forEach((c, i) => {
        scRows.push(makeRow([
          { text: String(c.n), align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: c.criterion, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: c.check, align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: sccols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: sccols, rows: scRows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// S4 — Stock Cards, Chunk Cards, Listening, Speaking Prep
// ============================================================
function buildS4(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S4"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "stock_card_a") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      mat.fields.forEach(f => {
        paras.push(new Paragraph({
          children: [
            new TextRun({ text: "  ", font: "Calibri", size: 20 }),
            new TextRun({ text: f, font: "Calibri", size: 20, color: DARK_GRAY })
          ],
          spacing: { before: 40, after: 40 },
          numbering: undefined
        }));
      });
      paras.push(spacer(100));
    }

    if (mat.type === "stock_card_b") {
      paras.push(activityTitle(mat.title + " (Reference)"));
      paras.push(instruction(mat.instructions));

      const ssTable = new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [CONTENT_WIDTH],
        rows: mat.sentence_starters.map((ss, i) => makeRow([
          { text: ss, fill: i % 2 === 0 ? LIGHT_BG : WHITE }
        ], { colWidths: [CONTENT_WIDTH] }))
      });
      paras.push(ssTable);
      paras.push(spacer(120));
    }

    if (mat.type === "chunk_cards_reference") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      // 2-column layout for chunk cards
      const ccW = Math.floor(CONTENT_WIDTH / 2) - 80;
      const cards = mat.cards;
      for (let i = 0; i < cards.length; i += 2) {
        const leftCard = cards[i];
        const rightCard = cards[i + 1];

        const makeCardContent = (card) => {
          if (!card) return [new Paragraph({ children: [] })];
          return [
            new Paragraph({ children: [new TextRun({ text: card.term, font: "Arial", size: 24, bold: true, color: NAVY })], spacing: { before: 0, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: card.ipa, font: "Calibri", size: 20, italics: true, color: ORANGE })], spacing: { before: 0, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: "Chunks: " + card.chunks.join(" | "), font: "Calibri", size: 20, color: DARK_GRAY })], spacing: { before: 0, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: card.example, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })], spacing: { before: 0, after: 0 } })
          ];
        };

        const rowData = rightCard
          ? [
            { children: makeCardContent(leftCard), fill: LIGHT_BG },
            { children: makeCardContent(rightCard), fill: WHITE }
          ]
          : [
            { children: makeCardContent(leftCard), fill: LIGHT_BG },
            { children: [new Paragraph({ children: [] })], fill: WHITE }
          ];

        paras.push(new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [Math.floor(CONTENT_WIDTH / 2), Math.floor(CONTENT_WIDTH / 2)],
          rows: [makeRow(rowData, { colWidths: [Math.floor(CONTENT_WIDTH / 2), Math.floor(CONTENT_WIDTH / 2)] })]
        }));
        paras.push(spacer(60));
      }
      paras.push(spacer(80));
    }

    if (mat.type === "cuestionario") {
      paras.push(pageBreak());
      if (mat.evidence) paras.push(evidenceBadge(mat.evidence));
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      mat.items.forEach(item => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: item.n + ". " + item.q, font: "Calibri", size: 22, bold: true, color: NAVY })],
          spacing: { before: 120, after: 60 }
        }));
        if (item.options) {
          Object.entries(item.options).forEach(([k, v]) => {
            paras.push(new Paragraph({
              children: [new TextRun({ text: "  " + k + ")  " + v, font: "Calibri", size: 21, color: DARK_GRAY })],
              spacing: { before: 20, after: 20 }
            }));
          });
          paras.push(new Paragraph({
            children: [new TextRun({ text: "  My answer: _____", font: "Calibri", size: 21, color: DARK_GRAY })],
            spacing: { before: 40, after: 80 }
          }));
        }
      });
    }

    if (mat.type === "speaking_prep") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      mat.prompts.forEach(p => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: p.n + ". " + p.prompt, font: "Calibri", size: 22, bold: true, color: NAVY })],
          spacing: { before: 120, after: 60 }
        }));
        paras.push(...blankLines(p.lines || 2));
        paras.push(spacer(60));
      });
    }
  });

  return paras;
}

// ============================================================
// S5 — Language Functions + Phrase Cards + Communication Card + Peer Eval
// ============================================================
function buildS5(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S5"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "language_functions_reference") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      const funcCols = [800, 2400, 2800, 2680, 1400];
      const funcHead = makeRow([
        { text: "Code", bold: true, fill: NAVY, color: WHITE },
        { text: "Function", bold: true, fill: NAVY, color: WHITE },
        { text: "Grammar", bold: true, fill: NAVY, color: WHITE },
        { text: "Examples", bold: true, fill: NAVY, color: WHITE },
        { text: "Direction", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: funcCols });

      const funcRows = [funcHead];
      mat.functions.forEach((f, i) => {
        funcRows.push(makeRow([
          { text: f.code, bold: true, color: ORANGE, align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: f.name, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: f.grammar, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { children: f.examples.map(e => new Paragraph({ children: [new TextRun({ text: "• " + e, font: "Calibri", size: 19, color: DARK_GRAY })], spacing: { before: 20, after: 20 } })), fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: f.who, fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: funcCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: funcCols, rows: funcRows }));
      paras.push(spacer(120));
    }

    if (mat.type === "phrase_cards_sort") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      const pcCols = [560, 7920, 1600];
      const pcHead = makeRow([
        { text: "#", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "Phrase", bold: true, fill: NAVY, color: WHITE },
        { text: "Function Code", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER }
      ], { colWidths: pcCols });

      const pcRows = [pcHead];
      mat.cards.forEach((c, i) => {
        pcRows.push(makeRow([
          { text: String(c.n), align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: c.phrase, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: c.function_space, align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: pcCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: pcCols, rows: pcRows }));
      paras.push(spacer(120));
    }

    if (mat.type === "personal_communication_card") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      mat.sections.forEach(sec => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: sec.function, font: "Arial", size: 22, bold: true, color: WHITE })],
          spacing: { before: 120, after: 0 },
          shading: { fill: NAVY, type: ShadingType.CLEAR },
          indent: { left: 120 }
        }));
        paras.push(new Paragraph({
          children: [new TextRun({ text: "When: " + sec.trigger, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
          spacing: { before: 60, after: 40 },
          shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
          indent: { left: 120 }
        }));
        paras.push(new Paragraph({
          children: [new TextRun({ text: sec.write_prompt, font: "Calibri", size: 20, color: DARK_GRAY })],
          spacing: { before: 40, after: 60 },
          indent: { left: 120 }
        }));
        paras.push(...blankLines(sec.lines || 2));
        paras.push(spacer(60));
      });
    }

    if (mat.type === "peer_evaluation_sheet") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      const peCols = [3000, 3000, 4080];
      const peHead = makeRow(
        mat.columns.map(c => ({ text: c, bold: true, fill: NAVY, color: WHITE })),
        { colWidths: peCols }
      );
      const peRows = [peHead];
      mat.rows.forEach((r, i) => {
        peRows.push(makeRow([
          { text: r.function, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { children: [writingLine("")], fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { children: [writingLine("")], fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: peCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: peCols, rows: peRows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// S6 — Cuestionario Consolidado + Skills Progression Map
// ============================================================
function buildS6(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S6"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "cuestionario_consolidado") {
      if (mat.evidence) paras.push(evidenceBadge(mat.evidence));
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      mat.sections.forEach(sec => {
        paras.push(pageBreak());
        paras.push(new Paragraph({
          children: [new TextRun({ text: sec.section, font: "Arial", size: 22, bold: true, color: WHITE })],
          spacing: { before: 120, after: 40 },
          shading: { fill: ORANGE, type: ShadingType.CLEAR },
          indent: { left: 120 }
        }));
        if (sec.note) {
          paras.push(new Paragraph({
            children: [new TextRun({ text: sec.note, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
            spacing: { before: 40, after: 100 },
            indent: { left: 120 }
          }));
        }

        sec.items.forEach(item => {
          paras.push(new Paragraph({
            children: [new TextRun({ text: item.n + ". " + item.q, font: "Calibri", size: 22, bold: true, color: NAVY })],
            spacing: { before: 120, after: 60 }
          }));
          if (item.format === "true_false") {
            paras.push(new Paragraph({
              children: [new TextRun({ text: "Answer: ___________", font: "Calibri", size: 22 })],
              spacing: { before: 40, after: 80 }
            }));
          } else if (item.options) {
            Object.entries(item.options).forEach(([k, v]) => {
              paras.push(new Paragraph({
                children: [new TextRun({ text: "  " + k + ")  " + v, font: "Calibri", size: 21, color: DARK_GRAY })],
                spacing: { before: 20, after: 20 }
              }));
            });
            paras.push(new Paragraph({
              children: [new TextRun({ text: "  My answer: _____", font: "Calibri", size: 21, color: DARK_GRAY })],
              spacing: { before: 40, after: 80 }
            }));
          }
        });
      });
    }

    if (mat.type === "skills_progression_map") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      const spmCols = [3600, 2160, 2160, 2160];
      const spmHead = makeRow(
        mat.columns.map(c => ({ text: c, bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER })),
        { colWidths: spmCols }
      );
      const spmRows = [spmHead];
      mat.skills.forEach((s, i) => {
        spmRows.push(makeRow([
          { text: s, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: spmCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: spmCols, rows: spmRows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// S7 — Role Card + Final Mission Task + Practice Feedback
// ============================================================
function buildS7(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S7"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "role_card_template") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      mat.fields.forEach(f => {
        if (f.sentence_slots) {
          paras.push(new Paragraph({
            children: [new TextRun({ text: f.label, font: "Calibri", size: 22, bold: true, color: NAVY })],
            spacing: { before: 120, after: 60 }
          }));
          f.sentence_slots.forEach(slot => {
            paras.push(new Paragraph({
              children: [
                new TextRun({ text: "  Sentence " + slot.n + " " + slot.function_label, font: "Calibri", size: 22, bold: true, color: ORANGE }),
              ],
              spacing: { before: 80, after: 40 }
            }));
            paras.push(...blankLines(2));
          });
        } else if (f.lines) {
          paras.push(new Paragraph({
            children: [new TextRun({ text: f.label, font: "Calibri", size: 22, bold: true, color: NAVY })],
            spacing: { before: 100, after: 60 }
          }));
          paras.push(...blankLines(f.lines));
        } else {
          paras.push(new Paragraph({
            children: [
              new TextRun({ text: f.label + ": ", font: "Calibri", size: 22, bold: true, color: NAVY }),
              new TextRun({ text: f.value, font: "Calibri", size: 22, color: DARK_GRAY })
            ],
            spacing: { before: 100, after: 40 }
          }));
        }
      });
      paras.push(spacer(120));
    }

    if (mat.type === "final_mission_task_card") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(new Paragraph({
        children: [new TextRun({ text: mat.scenario, font: "Calibri", size: 21, italics: true, color: DARK_GRAY })],
        spacing: { before: 80, after: 100 },
        shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
        indent: { left: 120, right: 120 }
      }));

      paras.push(new Paragraph({
        children: [new TextRun({ text: "Requirements:", font: "Arial", size: 22, bold: true, color: NAVY })],
        spacing: { before: 80, after: 60 }
      }));
      mat.requirements.forEach(r => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: r, font: "Calibri", size: 21, color: DARK_GRAY })],
          spacing: { before: 40, after: 40 },
          indent: { left: 360 }
        }));
      });

      paras.push(spacer(100));
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Roles & Responsibilities:", font: "Arial", size: 22, bold: true, color: NAVY })],
        spacing: { before: 80, after: 60 }
      }));

      const roleCols = [2400, 5880, 1800];
      const roleHead = makeRow([
        { text: "Role", bold: true, fill: NAVY, color: WHITE },
        { text: "Responsibilities", bold: true, fill: NAVY, color: WHITE },
        { text: "Min. Functions", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: roleCols });

      const roleRows = [roleHead];
      mat.roles_table.forEach((r, i) => {
        roleRows.push(makeRow([
          { text: r.role, bold: true, fill: i % 2 === 0 ? LIGHT_BG : WHITE },
          {
            children: r.responsibilities.map(resp => new Paragraph({
              children: [new TextRun({ text: "• " + resp, font: "Calibri", size: 19 })],
              spacing: { before: 20, after: 20 }
            })),
            fill: i % 2 === 0 ? LIGHT_BG : WHITE
          },
          { text: r.minimum_functions, fill: i % 2 === 0 ? LIGHT_BG : WHITE }
        ], { colWidths: roleCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: roleCols, rows: roleRows }));
      paras.push(spacer(120));
    }

    if (mat.type === "practice_feedback_form") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      mat.rounds.forEach(round => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: round.round, font: "Arial", size: 22, bold: true, color: WHITE })],
          spacing: { before: 100, after: 40 },
          shading: { fill: DARK_GRAY, type: ShadingType.CLEAR },
          indent: { left: 120 }
        }));
        round.fields.forEach(f => {
          paras.push(new Paragraph({
            children: [new TextRun({ text: f.label + (f.value ? ": " + f.value : ":"), font: "Calibri", size: 22, bold: true, color: NAVY })],
            spacing: { before: 80, after: 40 }
          }));
          if (!f.value) {
            paras.push(...blankLines(f.lines || 2));
          }
        });
        paras.push(spacer(60));
      });
    }
  });

  return paras;
}

// ============================================================
// S8 — Gap Cards Re-rating, KWL L, Letter, Peer Celebration, Portfolio
// ============================================================
function buildS8(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title, "S8"));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "gap_cards_s8_rerating") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(new Paragraph({
        children: [new TextRun({ text: mat.note, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
        spacing: { before: 40, after: 100 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: ORANGE } },
        indent: { left: 160 }
      }));

      const gcCols = [560, 1440, 2400, 2400, 3280];
      const gcHead = makeRow(
        mat.columns.map(c => ({ text: c, bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER })),
        { colWidths: gcCols }
      );
      const gcRows = [gcHead];
      for (let i = 1; i <= 20; i++) {
        gcRows.push(makeRow([
          { text: String(i), align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: "", fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: gcCols }));
      }

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: gcCols, rows: gcRows }));
      paras.push(spacer(120));
    }

    if (mat.type === "kwl_l_column") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(80));

      mat.prompts.forEach(p => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: p, font: "Calibri", size: 20, italics: true, color: ORANGE })],
          spacing: { before: 80, after: 40 }
        }));
        paras.push(...blankLines(2));
      });
      paras.push(spacer(60));
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Additional space:", font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
        spacing: { before: 80, after: 40 }
      }));
      paras.push(...blankLines(mat.writing_space_lines - mat.prompts.length * 2));
    }

    if (mat.type === "letter_to_s1_self") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));
      paras.push(new Paragraph({
        children: [new TextRun({ text: mat.opening_sentence, font: "Calibri", size: 22, italics: true, color: DARK_GRAY })],
        spacing: { before: 60, after: 100 }
      }));
      mat.frames.forEach(f => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: f, font: "Calibri", size: 20, italics: true, color: ORANGE })],
          spacing: { before: 60, after: 40 }
        }));
        paras.push(...blankLines(2));
      });
      paras.push(spacer(60));
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Continue:", font: "Calibri", size: 20, color: DARK_GRAY })],
        spacing: { before: 60, after: 40 }
      }));
      paras.push(...blankLines(mat.writing_space_lines - mat.frames.length * 2 - 1));
    }

    if (mat.type === "peer_celebration_form") {
      paras.push(pageBreak());
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      mat.fields.forEach(f => {
        paras.push(new Paragraph({
          children: [new TextRun({ text: f.label, font: "Calibri", size: 22, bold: true, color: NAVY })],
          spacing: { before: 100, after: 60 }
        }));
        paras.push(...blankLines(f.lines || 2));
      });
      paras.push(spacer(80));
    }

    if (mat.type === "portfolio_checklist") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));
      paras.push(spacer(60));

      const pfCols = [560, 1440, 1200, 3280, 800, 1800];
      const pfHead = makeRow([
        { text: "", bold: true, fill: NAVY, color: WHITE },
        { text: "Evidence", bold: true, fill: NAVY, color: WHITE },
        { text: "Skill", bold: true, fill: NAVY, color: WHITE },
        { text: "Instrument", bold: true, fill: NAVY, color: WHITE },
        { text: "Session", bold: true, fill: NAVY, color: WHITE },
        { text: "Points", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: pfCols });

      const pfRows = [pfHead];
      mat.items.forEach((item, i) => {
        pfRows.push(makeRow([
          { text: "[ ]", align: AlignmentType.CENTER, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.evidence, bold: true, color: ORANGE, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.skill, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.instrument, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.session, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: item.pts, fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: pfCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: pfCols, rows: pfRows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// APPENDIX A — Toolbelt 20 Reference
// ============================================================
function buildAppendixA(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "toolbelt_reference_table") {
      paras.push(activityTitle(mat.title));
      paras.push(instruction(mat.instructions));

      const tbCols = [560, 2400, 2400, 1680, 3040];
      const tbHead = makeRow([
        { text: "#", bold: true, fill: NAVY, color: WHITE, align: AlignmentType.CENTER },
        { text: "Term", bold: true, fill: NAVY, color: WHITE },
        { text: "Category", bold: true, fill: NAVY, color: WHITE },
        { text: "IPA", bold: true, fill: NAVY, color: WHITE },
        { text: "My Sentence", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: tbCols });

      const catBgs = {
        "Environment": "E8F5E9",
        "Tools & Equipment": "E3F2FD",
        "Safety": "FFEBEE",
        "Maintenance Types": "FFFDE7",
        "Documents + Quality": "F3E5F5"
      };

      const tbRows = [tbHead];
      mat.terms.forEach((t, i) => {
        const bg = catBgs[t.category] || WHITE;
        tbRows.push(makeRow([
          { text: String(t.n), align: AlignmentType.CENTER, fill: bg },
          { text: t.term, bold: true, fill: bg },
          { text: t.category, fill: bg },
          { text: t.ipa, fill: bg },
          { children: [writingLine("")] }
        ], { colWidths: tbCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: tbCols, rows: tbRows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// APPENDIX B — Language Functions Full Reference
// ============================================================
function buildAppendixB(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "language_functions_full_reference") {
      paras.push(activityTitle(mat.title));
      paras.push(spacer(80));

      mat.functions.forEach((f, i) => {
        const fill = i % 2 === 0 ? LIGHT_BG : WHITE;
        paras.push(new Paragraph({
          children: [
            new TextRun({ text: f.code + "  ", font: "Arial", size: 24, bold: true, color: ORANGE }),
            new TextRun({ text: f.name, font: "Arial", size: 22, bold: true, color: NAVY })
          ],
          spacing: { before: 160, after: 40 },
          shading: { fill: fill, type: ShadingType.CLEAR },
          indent: { left: 120 }
        }));
        paras.push(new Paragraph({
          children: [new TextRun({ text: "Grammar: " + f.grammar, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
          spacing: { before: 20, after: 40 },
          indent: { left: 240 }
        }));
        paras.push(new Paragraph({
          children: [new TextRun({ text: "Key phrases:", font: "Calibri", size: 20, bold: true, color: DARK_GRAY })],
          spacing: { before: 20, after: 20 },
          indent: { left: 240 }
        }));
        f.key_phrases.forEach(kp => {
          paras.push(new Paragraph({
            children: [new TextRun({ text: "  • " + kp, font: "Calibri", size: 20, color: DARK_GRAY })],
            spacing: { before: 10, after: 10 },
            indent: { left: 360 }
          }));
        });
        paras.push(new Paragraph({
          children: [new TextRun({ text: "Workshop examples:", font: "Calibri", size: 20, bold: true, color: DARK_GRAY })],
          spacing: { before: 40, after: 20 },
          indent: { left: 240 }
        }));
        f.workshop_examples.forEach(ex => {
          paras.push(new Paragraph({
            children: [new TextRun({ text: "  \u2192 " + ex, font: "Calibri", size: 20, italics: true, color: DARK_GRAY })],
            spacing: { before: 10, after: 10 },
            indent: { left: 360 }
          }));
        });
        paras.push(spacer(60));
      });
    }
  });

  return paras;
}

// ============================================================
// APPENDIX C — Evaluation Overview
// ============================================================
function buildAppendixC(session) {
  const paras = [];
  paras.push(pageBreak());
  paras.push(sectionHeader(session.title));
  paras.push(spacer(80));

  session.student_materials.forEach(mat => {
    if (mat.type === "evaluation_overview") {
      paras.push(activityTitle(mat.title));
      paras.push(new Paragraph({
        children: [new TextRun({ text: mat.intro, font: "Calibri", size: 21, color: DARK_GRAY })],
        spacing: { before: 80, after: 100 }
      }));

      const evCols = [2200, 900, 3280, 1800, 1900];
      const evHead = makeRow([
        { text: "Evidence", bold: true, fill: NAVY, color: WHITE },
        { text: "Session", bold: true, fill: NAVY, color: WHITE },
        { text: "What You Do", bold: true, fill: NAVY, color: WHITE },
        { text: "Conditions", bold: true, fill: NAVY, color: WHITE },
        { text: "Score", bold: true, fill: NAVY, color: WHITE }
      ], { colWidths: evCols });

      const evRows = [evHead];
      mat.evidences.forEach((ev, i) => {
        evRows.push(makeRow([
          { text: ev.evidence, bold: true, color: ORANGE, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: ev.session, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: ev.what, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: ev.conditions, fill: i % 2 === 0 ? WHITE : MID_GRAY },
          { text: ev.score, fill: i % 2 === 0 ? WHITE : MID_GRAY }
        ], { colWidths: evCols }));
      });

      paras.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: evCols, rows: evRows }));
      paras.push(spacer(120));
    }
  });

  return paras;
}

// ============================================================
// MAIN
// ============================================================
const data = JSON.parse(fs.readFileSync("/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-15/pm-3-4.json", "utf8"));

// Find sections by session key
const findSection = (key) => data.sections.find(s => s.session === key);

const coverData = findSection("COVER").student_materials[0];
const introData = findSection("INTRO").student_materials[0];

const allContent = [
  ...buildCover(coverData),
  pageBreak(),
  ...buildIntro(introData),
  ...buildS1(findSection("S1")),
  ...buildS2(findSection("S2")),
  ...buildS3(findSection("S3")),
  ...buildS4(findSection("S4")),
  ...buildS5(findSection("S5")),
  ...buildS6(findSection("S6")),
  ...buildS7(findSection("S7")),
  ...buildS8(findSection("S8")),
  ...buildAppendixA(findSection("APPENDIX_A")),
  ...buildAppendixB(findSection("APPENDIX_B")),
  ...buildAppendixC(findSection("APPENDIX_C"))
];

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Cuaderno del Aprendiz  |  Guia 1.1 The Workshop Specialist  |  SENA Mantenimiento de Motores Diesel", font: "Calibri", size: 16, color: GRAY }),
              new TextRun({ text: "\t", font: "Calibri", size: 16 }),
              new TextRun({ text: "Page ", font: "Calibri", size: 16, color: GRAY }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: GRAY })
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_BG } }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "SENA  |  A1.1-A1.2  |  Run: DIESEL-2026-04-15", font: "Calibri", size: 16, color: GRAY }),
              new TextRun({ text: "\t", font: "Calibri", size: 16 }),
              new TextRun({ text: "PM-3.4 Student Workbook", font: "Calibri", size: 16, color: GRAY })
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_BG } }
          })
        ]
      })
    },
    children: allContent
  }]
});

const OUTPUT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-15/pm-3-4-workbook.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Written: " + OUTPUT);
  console.log("Size: " + buffer.length + " bytes");
}).catch(err => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
