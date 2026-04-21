// PM-3.5 Final Mission Master Document Generator
"use strict";

const fs = require("fs");
const path = require("path");

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
  NumberFormat
} = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");

// ── Colours ──────────────────────────────────────────────────────────────────
const NAVY   = "1C2B3C";
const ORANGE = "F59316";
const WHITE  = "FFFFFF";
const LIGHT_GREY = "F2F4F6";

// ── DXA helpers ──────────────────────────────────────────────────────────────
const PAGE_W   = 12240;
const PAGE_H   = 15840;
const MARGIN   = 1440;
const BODY_W   = PAGE_W - MARGIN * 2;   // 9360 DXA

// ── Border helpers ────────────────────────────────────────────────────────────
function thinBorder() {
  return { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
}
function noBorder() {
  return { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
}

// ── Text helpers ──────────────────────────────────────────────────────────────
function run(text, opts = {}) {
  return new TextRun({
    text,
    font: opts.font || "Calibri",
    size: opts.size || 22,          // 11pt = 22 half-points
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color || undefined,
  });
}

function boldRun(text, opts = {}) {
  return run(text, { ...opts, bold: true });
}

function arialRun(text, opts = {}) {
  return run(text, { ...opts, font: "Arial" });
}

function para(children, opts = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: opts.spacing || { after: 120 },
    indent: opts.indent || undefined,
  });
}

function emptyPara() {
  return new Paragraph({ children: [new TextRun("")], spacing: { after: 80 } });
}

function pageBreakPara() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ── Section heading ───────────────────────────────────────────────────────────
function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: "Arial",
        size: 26,
        bold: true,
        color: WHITE,
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: NAVY, fill: NAVY },
    spacing: { before: 240, after: 160 },
    indent: { left: 120, right: 120 },
  });
}

function subHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: 24,
        bold: true,
        color: NAVY,
      }),
    ],
    spacing: { before: 200, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 2, color: ORANGE },
    },
  });
}

function labelPara(label, value) {
  return para([
    new TextRun({ text: label + ": ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
    new TextRun({ text: value, font: "Calibri", size: 22 }),
  ]);
}

// ── Bullet list item ──────────────────────────────────────────────────────────
function bulletItem(text, opts = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: opts.font || "Calibri",
        size: opts.size || 22,
        bold: opts.bold || false,
        color: opts.color || undefined,
      }),
    ],
    bullet: { level: opts.level || 0 },
    spacing: { after: 80 },
  });
}

function numberedItem(text, numId, level = 0) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22 })],
    numbering: { reference: "main-numbering", level },
    spacing: { after: 80 },
  });
}

// ── Table cell helpers ────────────────────────────────────────────────────────
function headerCell(text, w) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: WHITE })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: NAVY, fill: NAVY },
    width: { size: w, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: {
      top: thinBorder(), bottom: thinBorder(),
      left: thinBorder(), right: thinBorder(),
    },
    verticalAlign: VerticalAlign.CENTER,
  });
}

function orangeHeaderCell(text, w) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: WHITE })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: ORANGE, fill: ORANGE },
    width: { size: w, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: {
      top: thinBorder(), bottom: thinBorder(),
      left: thinBorder(), right: thinBorder(),
    },
    verticalAlign: VerticalAlign.CENTER,
  });
}

function dataCell(children, w, opts = {}) {
  const paragraphs = Array.isArray(children)
    ? children.map(c =>
        new Paragraph({
          children: Array.isArray(c) ? c : [c],
          spacing: { after: 60 },
          alignment: opts.alignment || AlignmentType.LEFT,
        })
      )
    : [new Paragraph({
        children: Array.isArray(children) ? children : [children],
        spacing: { after: 0 },
        alignment: opts.alignment || AlignmentType.LEFT,
      })];

  return new TableCell({
    children: paragraphs,
    shading: opts.shaded
      ? { type: ShadingType.CLEAR, color: LIGHT_GREY, fill: LIGHT_GREY }
      : undefined,
    width: { size: w, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: {
      top: thinBorder(), bottom: thinBorder(),
      left: thinBorder(), right: thinBorder(),
    },
    verticalAlign: VerticalAlign.CENTER,
  });
}

function simpleDataCell(text, w, opts = {}) {
  return dataCell(
    [new TextRun({ text, font: "Calibri", size: 22, bold: opts.bold || false, color: opts.color || undefined })],
    w, opts
  );
}

// ── SECTION BUILDERS ─────────────────────────────────────────────────────────

// 1. Cover / Title Block
function buildCover(d) {
  const hi = d.header_institucional;
  return [
    emptyPara(),
    emptyPara(),
    new Paragraph({
      children: [
        new TextRun({
          text: "SENA — Servicio Nacional de Aprendizaje",
          font: "Arial",
          size: 20,
          color: NAVY,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: hi.programa.toUpperCase(),
          font: "Arial",
          size: 32,
          bold: true,
          color: NAVY,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: hi.tipo_programa,
          font: "Arial",
          size: 24,
          color: NAVY,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    // Orange rule
    new Paragraph({
      children: [new TextRun({ text: "" })],
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE } },
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: d.task_specification.title.toUpperCase(),
          font: "Arial",
          size: 40,
          bold: true,
          color: NAVY,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: d.task_specification.subtitle,
          font: "Arial",
          size: 28,
          bold: true,
          color: ORANGE,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: d.guide,
          font: "Arial",
          size: 24,
          italics: true,
          color: NAVY,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
    }),
    // Metadata table
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: [2340, 7020],
      rows: [
        new TableRow({
          children: [
            simpleDataCell("PM ID", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(d.pm_id, 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("Run ID", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(d.run_id, 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("CEFR Level", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(hi.cefr + " — A1.1–A1.2", 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("Guía", 2340, { bold: true, color: ORANGE }),
            simpleDataCell("No. " + hi.guia_numero + " — " + hi.guia_nombre, 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("Tarea Tipo", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(hi.tarea_tipo, 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("GFPI Ref.", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(hi.gfpi_ref, 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("Generated", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(d.generated_at + " | " + d.model, 7020),
          ],
        }),
        new TableRow({
          children: [
            simpleDataCell("Used In", 2340, { bold: true, color: ORANGE }),
            simpleDataCell(d.used_in.join(" | "), 7020),
          ],
        }),
      ],
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    }),
    emptyPara(),
    new Paragraph({
      children: [
        new TextRun({
          text: d.description,
          font: "Calibri",
          size: 20,
          italics: true,
          color: "666666",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
    }),
  ];
}

// 2. Task Specification
function buildTaskSpec(d) {
  const ts = d.task_specification;
  const sc = ts.scenario;
  const blocks = [
    pageBreakPara(),
    sectionHeading("Section 1 — Task Specification"),
    emptyPara(),
    subHeading("Scenario"),
    labelPara("Setting", sc.setting),
    para([run(sc.context)]),
    para([new TextRun({ text: sc.context_es, font: "Calibri", size: 22, italics: true, color: "555555" })]),
    labelPara("Bay Assignment", sc.bay),
    emptyPara(),
    subHeading("Characters"),
  ];

  // Characters
  Object.entries(sc.characters).forEach(([name, desc]) => {
    blocks.push(
      para([
        new TextRun({ text: name + " — ", font: "Calibri", size: 22, bold: true, color: NAVY }),
        new TextRun({ text: desc, font: "Calibri", size: 22 }),
      ])
    );
  });

  blocks.push(emptyPara(), subHeading("Task Requirements"));
  ts.task_requirements.forEach((req, i) => {
    blocks.push(
      para([
        new TextRun({ text: String(i + 1) + ".  ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
        new TextRun({ text: req, font: "Calibri", size: 22 }),
      ], { indent: { left: 360 } })
    );
  });

  // Roles table
  blocks.push(emptyPara(), subHeading("Roles Table"));

  const colWidths = [1560, 2700, 5100];
  const rolesRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("ROL", colWidths[0]),
        headerCell("FUNCIONES REQUERIDAS", colWidths[1]),
        headerCell("ACCIONES CLAVE", colWidths[2]),
      ],
    }),
  ];

  Object.entries(ts.roles_table).forEach(([roleName, roleData]) => {
    rolesRows.push(
      new TableRow({
        children: [
          simpleDataCell(roleName, colWidths[0], { bold: true, color: NAVY }),
          dataCell(
            roleData.functions_required.map(f =>
              [new TextRun({ text: "• " + f, font: "Calibri", size: 20 })]
            ),
            colWidths[1]
          ),
          dataCell(
            roleData.key_actions.map(a =>
              [new TextRun({ text: "• " + a, font: "Calibri", size: 20 })]
            ),
            colWidths[2]
          ),
        ],
      })
    );
  });

  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: colWidths,
      rows: rolesRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    })
  );

  // Function Reference
  blocks.push(emptyPara(), subHeading("Communicative Function Reference"));
  const fr = ts.function_reference;
  const frColWidths = [780, 2340, 3900, 2340];
  const frRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("CODE", frColWidths[0]),
        headerCell("FUNCTION", frColWidths[1]),
        headerCell("STRUCTURE / EXAMPLES", frColWidths[2]),
        headerCell("TABLERO COLOUR", frColWidths[3]),
      ],
    }),
  ];
  Object.entries(fr).forEach(([code, fdata]) => {
    frRows.push(
      new TableRow({
        children: [
          simpleDataCell(code, frColWidths[0], { bold: true, color: ORANGE }),
          simpleDataCell(fdata.name, frColWidths[1]),
          simpleDataCell(fdata.structure, frColWidths[2]),
          simpleDataCell(fdata.color, frColWidths[3]),
        ],
      })
    );
  });
  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: frColWidths,
      rows: frRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    })
  );

  // Toolbelt Reference
  blocks.push(emptyPara(), subHeading("Toolbelt-20 Reference"));
  const tb = ts.toolbelt_20_reference;
  ["ENVIRONMENT", "TOOLS_EQUIPMENT", "SAFETY", "MAINTENANCE", "DOCUMENTS"].forEach(cat => {
    if (Array.isArray(tb[cat])) {
      blocks.push(
        para([
          new TextRun({ text: cat.replace(/_/g, " / ") + ": ", font: "Calibri", size: 22, bold: true, color: NAVY }),
          new TextRun({ text: tb[cat].join(", "), font: "Calibri", size: 22 }),
        ])
      );
    }
  });
  blocks.push(
    para([
      new TextRun({ text: "Tip: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: tb.tip.replace(/^Tip: /, ""), font: "Calibri", size: 22, italics: true }),
    ])
  );

  // Permitted Materials S8
  blocks.push(emptyPara(), subHeading("Permitted Materials — Session 8 (Live Performance)"));
  const pm = ts.permitted_materials_s8;
  blocks.push(labelPara("Visible (allowed)", pm.visible));
  blocks.push(
    para([
      new TextRun({ text: "Not Permitted: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: pm.not_permitted.join(" | "), font: "Calibri", size: 22 }),
    ])
  );

  return blocks;
}

// 3. Model Assets
function buildModelAssets(d) {
  const ma = d.model_assets;
  const blocks = [
    pageBreakPara(),
    sectionHeading("Section 2 — Model Assets"),
    emptyPara(),
  ];

  // Script sections
  [ma.sample_opening_60sec, ma.sample_middle_interactions, ma.sample_closing_30sec].forEach(script => {
    blocks.push(subHeading(script.title));
    const scriptColWidths = [1560, 5460, 2340];
    const scriptRows = [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell("SPEAKER", scriptColWidths[0]),
          headerCell("LINE", scriptColWidths[1]),
          orangeHeaderCell("FUNCTION", scriptColWidths[2]),
        ],
      }),
    ];
    script.lines.forEach((line, idx) => {
      scriptRows.push(
        new TableRow({
          children: [
            simpleDataCell(line.speaker, scriptColWidths[0], { bold: true, color: NAVY, shaded: idx % 2 === 1 }),
            simpleDataCell(line.line, scriptColWidths[1], { shaded: idx % 2 === 1 }),
            simpleDataCell(line.function, scriptColWidths[2], { shaded: idx % 2 === 1 }),
          ],
        })
      );
    });
    blocks.push(
      new Table({
        width: { size: BODY_W, type: WidthType.DXA },
        columnWidths: scriptColWidths,
        rows: scriptRows,
        borders: {
          top: thinBorder(), bottom: thinBorder(),
          left: thinBorder(), right: thinBorder(),
          insideH: thinBorder(), insideV: thinBorder(),
        },
      }),
      emptyPara()
    );
  });

  // Toolbelt terms in model
  blocks.push(
    subHeading("Toolbelt Terms Used in Model"),
    para([
      new TextRun({ text: "Terms (" + ma.toolbelt_count_in_model + "): ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: ma.toolbelt_terms_in_model.join(", "), font: "Calibri", size: 22 }),
    ]),
    para([
      new TextRun({ text: "Note: ", font: "Calibri", size: 22, bold: true }),
      new TextRun({ text: ma.note, font: "Calibri", size: 22, italics: true }),
    ]),
    emptyPara()
  );

  // Stock Card A
  blocks.push(subHeading(ma.stock_card_a_bay_status.title));
  ma.stock_card_a_bay_status.items.forEach(item => {
    blocks.push(bulletItem(item));
  });
  blocks.push(emptyPara());

  // Stock Card B
  blocks.push(subHeading(ma.stock_card_b_sentence_starters.title));
  ma.stock_card_b_sentence_starters.starters.forEach(s => {
    blocks.push(bulletItem(s));
  });
  blocks.push(emptyPara());

  // Pronunciation Targets
  blocks.push(subHeading(ma.pronunciation_targets.title));
  const pronColWidths = [2340, 2808, 4212];
  const pronRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("TERM", pronColWidths[0]),
        headerCell("IPA", pronColWidths[1]),
        headerCell("CHUNKS", pronColWidths[2]),
      ],
    }),
  ];
  ma.pronunciation_targets.terms.forEach((t, idx) => {
    pronRows.push(
      new TableRow({
        children: [
          simpleDataCell(t.term, pronColWidths[0], { bold: true, shaded: idx % 2 === 1 }),
          simpleDataCell(t.ipa, pronColWidths[1], { shaded: idx % 2 === 1 }),
          simpleDataCell(t.chunks, pronColWidths[2], { shaded: idx % 2 === 1 }),
        ],
      })
    );
  });
  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: pronColWidths,
      rows: pronRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    })
  );

  return blocks;
}

// 4. Evaluation Instrument
function buildEvalInstrument(d) {
  const ei = d.evaluation_instrument;
  const blocks = [
    pageBreakPara(),
    sectionHeading("Section 3 — Evaluation Instrument"),
    emptyPara(),
    subHeading(ei.title),
    labelPara("Evaluator", ei.evaluator),
    labelPara("Total Points", String(ei.total_points) + " / 5"),
    emptyPara(),
    subHeading("Criteria Summary"),
  ];

  // Criteria table
  const critColWidths = [468, 5148, 1404, 2340];
  const critRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("#", critColWidths[0]),
        headerCell("CRITERIO / CRITERION", critColWidths[1]),
        headerCell("SCALE", critColWidths[2]),
        headerCell("WEIGHT", critColWidths[3]),
      ],
    }),
  ];
  ei.criteria_summary.forEach((c, idx) => {
    critRows.push(
      new TableRow({
        children: [
          simpleDataCell(String(c.n), critColWidths[0], { bold: true, color: ORANGE, shaded: idx % 2 === 1 }),
          simpleDataCell(c.criterion, critColWidths[1], { shaded: idx % 2 === 1 }),
          simpleDataCell(c.scale, critColWidths[2], { alignment: AlignmentType.CENTER, shaded: idx % 2 === 1 }),
          simpleDataCell(c.weight, critColWidths[3], { shaded: idx % 2 === 1 }),
        ],
      })
    );
  });
  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: critColWidths,
      rows: critRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    }),
    emptyPara()
  );

  // Scoring formula
  blocks.push(
    subHeading("Scoring Formula"),
    para([
      new TextRun({ text: ei.scoring, font: "Calibri", size: 22 }),
    ]),
    emptyPara(),
    para([
      new TextRun({ text: "Follow-up Question: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: ei.follow_up_question, font: "Calibri", size: 22 }),
    ]),
    emptyPara(),
    subHeading("Holistic Scale Reference")
  );

  // Holistic scale table
  const scaleColWidths = [936, 8424];
  const scaleRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("SCORE", scaleColWidths[0]),
        headerCell("DESCRIPTOR", scaleColWidths[1]),
      ],
    }),
  ];
  Object.entries(ei.scale_reference)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .forEach(([score, desc], idx) => {
      scaleRows.push(
        new TableRow({
          children: [
            simpleDataCell(score + " / 5", scaleColWidths[0], { bold: true, color: ORANGE, shaded: idx % 2 === 1 }),
            simpleDataCell(desc, scaleColWidths[1], { shaded: idx % 2 === 1 }),
          ],
        })
      );
    });
  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: scaleColWidths,
      rows: scaleRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    })
  );

  return blocks;
}

// 5. Preparation Guide
function buildPrepGuide(d) {
  const pg = d.preparation_guide;
  const s7 = pg.s7_prep_summary;
  const blocks = [
    pageBreakPara(),
    sectionHeading("Section 4 — Preparation Guide (Session 7)"),
    emptyPara(),
    subHeading(s7.title),
    emptyPara(),
  ];

  // Rounds table
  const roundColWidths = [936, 2574, 2574, 3276];
  const roundRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("ROUND", roundColWidths[0]),
        headerCell("FOCUS", roundColWidths[1]),
        headerCell("TOOL", roundColWidths[2]),
        headerCell("OUTPUT", roundColWidths[3]),
      ],
    }),
  ];
  s7.rounds.forEach((r, idx) => {
    roundRows.push(
      new TableRow({
        children: [
          simpleDataCell("Round " + r.round, roundColWidths[0], { bold: true, color: ORANGE, shaded: idx % 2 === 1 }),
          simpleDataCell(r.focus, roundColWidths[1], { shaded: idx % 2 === 1 }),
          simpleDataCell(r.tool, roundColWidths[2], { shaded: idx % 2 === 1 }),
          simpleDataCell(r.output, roundColWidths[3], { shaded: idx % 2 === 1 }),
        ],
      })
    );
  });
  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: roundColWidths,
      rows: roundRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    }),
    emptyPara(),
    para([
      new TextRun({ text: "Between Rounds: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: s7.between_rounds, font: "Calibri", size: 22, italics: true }),
    ]),
    emptyPara()
  );

  // Role Card Guide
  const rcg = pg.role_card_guide;
  blocks.push(subHeading(rcg.title));
  rcg.sections.forEach(s => {
    blocks.push(bulletItem(s));
  });
  blocks.push(
    emptyPara(),
    para([
      new TextRun({ text: "Note: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: rcg.note, font: "Calibri", size: 22, italics: true }),
    ]),
    emptyPara()
  );

  // Autonomous Prep
  const ap = pg.autonomous_prep_s7;
  blocks.push(
    subHeading("Autonomous Preparation — S7 (" + ap.duration_h + " hr)"),
  );
  ap.tasks.forEach(t => {
    blocks.push(bulletItem(t));
  });

  return blocks;
}

// 6. Administration Guide
function buildAdminGuide(d) {
  const ag = d.administration_guide_s8;
  const blocks = [
    pageBreakPara(),
    sectionHeading("Section 5 — Administration Guide (Session 8)"),
    emptyPara(),
    subHeading("Pre-Performance Protocol"),
  ];

  ag.pre_performance.forEach(item => {
    blocks.push(bulletItem(item));
  });

  blocks.push(emptyPara(), subHeading("During Performance"));
  ag.during_performance.forEach(item => {
    blocks.push(bulletItem(item));
  });

  blocks.push(emptyPara(), subHeading("After Each Performance"));
  ag.after_each_performance.forEach(item => {
    blocks.push(bulletItem(item));
  });

  // Timing table
  blocks.push(emptyPara(), subHeading("Timing Per Team"));
  const timing = ag.timing_per_team;
  const timColWidths = [4680, 4680];
  const timRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("PHASE", timColWidths[0]),
        headerCell("TIME", timColWidths[1]),
      ],
    }),
    new TableRow({ children: [simpleDataCell("Performance", timColWidths[0]), simpleDataCell(timing.performance, timColWidths[1])] }),
    new TableRow({ children: [simpleDataCell("Follow-up Question", timColWidths[0], { shaded: true }), simpleDataCell(timing.follow_up, timColWidths[1], { shaded: true })] }),
    new TableRow({ children: [simpleDataCell("Marking & Transition", timColWidths[0]), simpleDataCell(timing.marking_transition, timColWidths[1])] }),
    new TableRow({ children: [simpleDataCell("Observer Share", timColWidths[0], { shaded: true }), simpleDataCell(timing.observer_share, timColWidths[1], { shaded: true })] }),
    new TableRow({ children: [simpleDataCell("TOTAL PER TEAM", timColWidths[0], { bold: true, color: NAVY }), simpleDataCell(timing.total, timColWidths[1], { bold: true, color: NAVY })] }),
  ];
  blocks.push(
    new Table({
      width: { size: BODY_W, type: WidthType.DXA },
      columnWidths: timColWidths,
      rows: timRows,
      borders: {
        top: thinBorder(), bottom: thinBorder(),
        left: thinBorder(), right: thinBorder(),
        insideH: thinBorder(), insideV: thinBorder(),
      },
    }),
    emptyPara()
  );

  // Post all performances
  blocks.push(subHeading("Post — All Performances"));
  ag.post_all_performances.forEach(item => {
    blocks.push(bulletItem(item));
  });

  blocks.push(
    emptyPara(),
    para([
      new TextRun({ text: "Feedback Return: ", font: "Calibri", size: 22, bold: true, color: ORANGE }),
      new TextRun({ text: ag.feedback_return, font: "Calibri", size: 22 }),
    ])
  );

  return blocks;
}

// 7. Connections
function buildConnections(d) {
  const conn = d.connections;
  const blocks = [
    pageBreakPara(),
    sectionHeading("Section 6 — Connections & Curriculum Map"),
    emptyPara(),
    subHeading("Feeds From (Prerequisites)"),
  ];

  conn.feeds_from.forEach(item => {
    blocks.push(bulletItem(item));
  });

  blocks.push(emptyPara(), subHeading("Feeds Into (Next Steps)"));
  conn.feeds_into.forEach(item => {
    blocks.push(bulletItem(item));
  });

  blocks.push(
    emptyPara(),
    subHeading("Material Economy"),
    para([run(conn.economía)])
  );

  return blocks;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  const srcPath = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-15/pm-3-5.json";
  const outPath = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-15/pm-3-5-final-mission.docx";

  const d = JSON.parse(fs.readFileSync(srcPath, "utf8"));

  const allChildren = [
    ...buildCover(d),
    ...buildTaskSpec(d),
    ...buildModelAssets(d),
    ...buildEvalInstrument(d),
    ...buildPrepGuide(d),
    ...buildAdminGuide(d),
    ...buildConnections(d),
  ];

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "main-numbering",
          levels: [
            {
              level: 0,
              format: NumberFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 720, hanging: 360 } },
                run: { font: "Calibri", size: 22 },
              },
            },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22 },
          paragraph: { spacing: { after: 120 } },
        },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: "Arial", size: 28, bold: true, color: NAVY },
          paragraph: {
            spacing: { before: 240, after: 120 },
            outlineLevel: 0,
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
            spacing: { before: 200, after: 100 },
            outlineLevel: 1,
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
            spacing: { before: 160, after: 80 },
            outlineLevel: 2,
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H },
            margin: {
              top: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
              right: MARGIN,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PM-3.5 | Final Mission | Guía 1.1 — The Workshop Specialist",
                    font: "Arial",
                    size: 18,
                    bold: true,
                    color: NAVY,
                  }),
                ],
                border: {
                  bottom: { style: BorderStyle.SINGLE, size: 2, color: ORANGE },
                },
                spacing: { after: 80 },
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "SENA · Mantenimiento de Motores Diesel · CEFR A1.1–A1.2 · Page ",
                    font: "Calibri",
                    size: 18,
                    color: "666666",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Calibri",
                    size: 18,
                    color: "666666",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                border: {
                  top: { style: BorderStyle.SINGLE, size: 2, color: ORANGE },
                },
                spacing: { before: 80 },
              }),
            ],
          }),
        },
        children: allChildren,
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buf);
  console.log("Written:", outPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
