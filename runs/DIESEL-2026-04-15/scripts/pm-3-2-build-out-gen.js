"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageNumberElement, PageBreak, TableOfContents,
  SimpleField
} = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const fs = require("fs");

// ─── Colour constants ────────────────────────────────────────────────────────
const NAVY   = "1C2B3C";
const WHITE  = "FFFFFF";
const LIGHT_GRAY = "F2F4F6";
const MID_GRAY   = "D0D5DB";

// ─── Page geometry (US Letter, 1" margins, DXA) ───────────────────────────
const PAGE_W  = 12240;
const PAGE_H  = 15840;
const MARGIN  = 1440;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9360

// ─── Helper: safe string ─────────────────────────────────────────────────────
function s(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return JSON.stringify(v);
}

// ─── Helper: split on \n → array of strings ──────────────────────────────────
function lines(v) {
  return s(v).split("\n").map(l => l.trim()).filter(l => l.length > 0);
}

// ─── Helper: fresh border object ────────────────────────────────────────────
function mkBorder(style, color, size) {
  return { style: style || BorderStyle.SINGLE, color: color || "000000", size: size || 4 };
}

function noBorders() {
  return {
    top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  };
}

function thinBorders() {
  return {
    top:    { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY },
    left:   { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY },
    right:  { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY },
  };
}

// ─── Paragraph helpers ───────────────────────────────────────────────────────

function para(text, opts) {
  opts = opts || {};
  const runs = [];
  const txt = s(text);
  if (txt) {
    runs.push(new TextRun({
      text: txt,
      font: opts.font || "Calibri",
      size: opts.size || 22,
      bold: opts.bold || false,
      italics: opts.italic || false,
      color: opts.color || undefined,
    }));
  }
  return new Paragraph({
    children: runs,
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.spaceBefore || 0, after: opts.spaceAfter || 80 },
    indent: opts.indent ? { left: opts.indent } : undefined,
    pageBreakBefore: opts.pageBreak || false,
    border: opts.border || undefined,
  });
}

function h1(text, pageBreak) {
  return new Paragraph({
    children: [new TextRun({ text: s(text), font: "Arial", size: 32, bold: true, color: NAVY })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    pageBreakBefore: pageBreak === true,
  });
}

function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text: s(text), font: "Arial", size: 26, bold: true, color: NAVY })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
  });
}

function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text: s(text), font: "Arial", size: 22, bold: true })],
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 80 },
  });
}

function bodyPara(text, opts) {
  opts = opts || {};
  return para(text, { font: "Calibri", size: 22, ...opts });
}

function italicPara(text) {
  return new Paragraph({
    children: [new TextRun({ text: s(text), font: "Calibri", size: 22, italics: true })],
    spacing: { before: 0, after: 60 },
  });
}

function boldPara(text) {
  return new Paragraph({
    children: [new TextRun({ text: s(text), font: "Calibri", size: 22, bold: true })],
    spacing: { before: 60, after: 60 },
  });
}

function labeledPara(label, value) {
  return new Paragraph({
    children: [
      new TextRun({ text: s(label) + ": ", font: "Calibri", size: 22, bold: true }),
      new TextRun({ text: s(value), font: "Calibri", size: 22 }),
    ],
    spacing: { before: 40, after: 40 },
  });
}

function bulletPara(text, level) {
  level = level || 0;
  return new Paragraph({
    children: [new TextRun({ text: s(text), font: "Calibri", size: 22 })],
    bullet: { level: level },
    spacing: { before: 40, after: 40 },
  });
}

function spacer() {
  return new Paragraph({ children: [], spacing: { before: 0, after: 80 } });
}

function hrPara() {
  return new Paragraph({
    children: [new TextRun({ text: "" })],
    border: {
      bottom: { style: BorderStyle.SINGLE, color: MID_GRAY, size: 6 }
    },
    spacing: { before: 120, after: 120 },
  });
}

// ─── Render any value as paragraphs ─────────────────────────────────────────
function renderValue(val, indent) {
  indent = indent || 0;
  const paras = [];
  if (val === null || val === undefined) return paras;
  if (typeof val === "string") {
    lines(val).forEach(l => paras.push(new Paragraph({
      children: [new TextRun({ text: l, font: "Calibri", size: 22 })],
      spacing: { before: 0, after: 40 },
      indent: indent ? { left: indent } : undefined,
    })));
  } else if (typeof val === "number" || typeof val === "boolean") {
    paras.push(bodyPara(String(val)));
  } else if (Array.isArray(val)) {
    val.forEach(item => {
      if (typeof item === "string") {
        paras.push(bulletPara(item, 0));
      } else if (typeof item === "object") {
        paras.push(...renderValue(item, indent + 360));
      }
    });
  } else if (typeof val === "object") {
    Object.entries(val).forEach(([k, v]) => {
      paras.push(new Paragraph({
        children: [new TextRun({ text: k + ":", font: "Calibri", size: 22, bold: true })],
        spacing: { before: 60, after: 20 },
        indent: indent ? { left: indent } : undefined,
      }));
      paras.push(...renderValue(v, indent + 360));
    });
  }
  return paras;
}

// ─── Render a labeled section ────────────────────────────────────────────────
function renderSection(label, val) {
  const paras = [];
  paras.push(h3(label));
  paras.push(...renderValue(val));
  return paras;
}

// ─── Table helpers ───────────────────────────────────────────────────────────

// Header cell (navy background, white bold text)
function headerCell(text, width) {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text: s(text), font: "Calibri", size: 20, bold: true, color: WHITE })],
      spacing: { before: 0, after: 0 },
    })],
    shading: { type: ShadingType.CLEAR, fill: NAVY, color: NAVY },
    borders: thinBorders(),
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    width: { size: width, type: WidthType.DXA },
  });
}

// Body cell
function bodyCell(text, width, opts) {
  opts = opts || {};
  const fill = opts.shade ? LIGHT_GRAY : "FFFFFF";
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text: s(text), font: "Calibri", size: 20, bold: opts.bold || false })],
      spacing: { before: 0, after: 0 },
    })],
    shading: { type: ShadingType.CLEAR, fill: fill, color: fill },
    borders: thinBorders(),
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
  });
}

// Multiline body cell
function multilineCell(textArr, width, opts) {
  opts = opts || {};
  const fill = opts.shade ? LIGHT_GRAY : "FFFFFF";
  const children = (Array.isArray(textArr) ? textArr : [s(textArr)]).map(t =>
    new Paragraph({
      children: [new TextRun({ text: s(t), font: "Calibri", size: 20 })],
      spacing: { before: 0, after: 40 },
    })
  );
  if (children.length === 0) children.push(new Paragraph({ children: [] }));
  return new TableCell({
    children,
    shading: { type: ShadingType.CLEAR, fill: fill, color: fill },
    borders: thinBorders(),
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
  });
}

// ─── Timeline Table ──────────────────────────────────────────────────────────
function makeTimelineTable(timeline) {
  if (!Array.isArray(timeline) || timeline.length === 0) return [];
  const col1 = 1200; // time
  const col2 = 1200; // duration
  const col3 = 1800; // block
  const col4 = 2880; // activity
  const col5 = 2280; // notes
  const total = col1 + col2 + col3 + col4 + col5; // 9360
  const rows = [
    new TableRow({
      children: [
        headerCell("Time", col1),
        headerCell("Min", col2),
        headerCell("Block", col3),
        headerCell("Activity", col4),
        headerCell("Notes / Grouping", col5),
      ],
      tableHeader: true,
    })
  ];
  timeline.forEach((t, i) => {
    const shade = i % 2 === 1;
    rows.push(new TableRow({
      children: [
        bodyCell(t.tiempo || t.time || "", col1, { shade }),
        bodyCell(String(t.duracion_min || t.duration_min || ""), col2, { shade }),
        bodyCell(t.bloque || t.block || "", col3, { shade }),
        bodyCell(t.actividad || t.activity || t.title || "", col4, { shade }),
        bodyCell(t.notas || t.notes || t.agrupacion || "", col5, { shade }),
      ],
    }));
  });
  return [
    new Table({
      columnWidths: [col1, col2, col3, col4, col5],
      rows,
      width: { size: total, type: WidthType.DXA },
    }),
    spacer(),
  ];
}

// ─── Materials Table ─────────────────────────────────────────────────────────
function makeMaterialsTable(items) {
  if (!Array.isArray(items) || items.length === 0) return [];
  const col1 = 5760;
  const col2 = 2160;
  const col3 = 1440;
  const total = col1 + col2 + col3; // 9360
  const rows = [
    new TableRow({
      children: [
        headerCell("Material / Item", col1),
        headerCell("Cantidad", col2),
        headerCell("Check", col3),
      ],
      tableHeader: true,
    })
  ];
  items.forEach((item, i) => {
    const shade = i % 2 === 1;
    rows.push(new TableRow({
      children: [
        bodyCell(item.item || s(item), col1, { shade }),
        bodyCell(item.cantidad || "", col2, { shade }),
        bodyCell("☐", col3, { shade }),
      ],
    }));
  });
  return [
    new Table({ columnWidths: [col1, col2, col3], rows, width: { size: total, type: WidthType.DXA } }),
    spacer(),
  ];
}

// ─── Two-column info table ────────────────────────────────────────────────────
function makeTwoColTable(pairs) {
  // pairs = [[label, value], ...]
  if (!Array.isArray(pairs) || pairs.length === 0) return [];
  const col1 = 2880;
  const col2 = 6480;
  const rows = pairs.map(([lbl, val], i) => {
    const shade = i % 2 === 1;
    return new TableRow({
      children: [
        bodyCell(s(lbl), col1, { shade, bold: true }),
        bodyCell(s(val), col2, { shade }),
      ],
    });
  });
  return [
    new Table({ columnWidths: [col1, col2], rows, width: { size: 9360, type: WidthType.DXA } }),
    spacer(),
  ];
}

// ─── Answer key table ────────────────────────────────────────────────────────
function makeAnswerKeyTable(ak) {
  const paras = [];
  if (!ak) return paras;
  if (typeof ak === "string") {
    paras.push(bodyPara(ak));
    return paras;
  }
  if (Array.isArray(ak)) {
    ak.forEach(item => {
      if (typeof item === "string") paras.push(bulletPara(item));
      else paras.push(...renderValue(item));
    });
    return paras;
  }
  if (typeof ak === "object") {
    Object.entries(ak).forEach(([k, v]) => {
      paras.push(boldPara(k + ":"));
      if (typeof v === "string") {
        paras.push(bodyPara(v, { spaceAfter: 60 }));
      } else if (Array.isArray(v)) {
        v.forEach(item => paras.push(bulletPara(s(item))));
      } else if (typeof v === "object") {
        paras.push(...renderValue(v, 360));
      }
      paras.push(spacer());
    });
  }
  return paras;
}

// ─── Render activities list ───────────────────────────────────────────────────
function renderActivities(activities) {
  const paras = [];
  if (!Array.isArray(activities)) return paras;
  activities.forEach((act, idx) => {
    if (typeof act === "string") {
      paras.push(bulletPara(act));
      return;
    }
    if (typeof act !== "object") return;
    const title = act.activity || act.title || act.nombre || `Activity ${idx + 1}`;
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: `[${act.time || ""}] `, font: "Calibri", size: 20, bold: true, color: NAVY }),
        new TextRun({ text: s(title), font: "Calibri", size: 22, bold: true }),
      ],
      spacing: { before: 100, after: 40 },
    }));
    if (act.purpose) {
      paras.push(new Paragraph({
        children: [
          new TextRun({ text: "Purpose: ", font: "Calibri", size: 20, bold: true }),
          new TextRun({ text: s(act.purpose), font: "Calibri", size: 20, italics: true }),
        ],
        spacing: { before: 0, after: 40 },
        indent: { left: 360 },
      }));
    }
    if (act.procedure) {
      lines(act.procedure).forEach(l => paras.push(new Paragraph({
        children: [new TextRun({ text: l, font: "Calibri", size: 20 })],
        spacing: { before: 0, after: 40 },
        indent: { left: 360 },
      })));
    }
    if (act.facilitation_note || act.facilitation_notes) {
      const note = act.facilitation_note || act.facilitation_notes;
      (Array.isArray(note) ? note : [note]).forEach(n => paras.push(new Paragraph({
        children: [new TextRun({ text: s(n), font: "Calibri", size: 20, italics: true, color: "555555" })],
        spacing: { before: 0, after: 40 },
        indent: { left: 360 },
      })));
    }
    if (act.icq || act.icqs) {
      const icq = act.icq || act.icqs;
      paras.push(boldPara("ICQ:"));
      (Array.isArray(icq) ? icq : [icq]).forEach(q => paras.push(new Paragraph({
        children: [new TextRun({ text: s(q), font: "Calibri", size: 20, italics: true })],
        spacing: { before: 0, after: 40 },
        indent: { left: 360 },
      })));
    }
  });
  return paras;
}

// ─── Render a block (set_up, while bloque, wrap_up) — old format S1-S3 ───────
function renderBloqueOld(bloque) {
  const paras = [];
  const name = bloque.nombre || bloque.name || bloque.letra || "";
  const dur = bloque.duracion_min || "";
  paras.push(h2(`[${bloque.letra || ""}] ${name} (${dur} min)`));

  if (bloque.tecnica_didactica) {
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: "Técnica Didáctica: ", font: "Calibri", size: 20, bold: true, color: "1C2B3C" }),
        new TextRun({ text: s(bloque.tecnica_didactica), font: "Calibri", size: 20, italics: true, color: "F59316" }),
      ],
      spacing: { before: 40, after: 80 },
      border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
      indent: { left: 200 },
    }));
  }

  if (bloque.objetivo) paras.push(...renderSection("Objetivo", bloque.objetivo));
  if (bloque.worksheet_ref) paras.push(labeledPara("Worksheet Ref", bloque.worksheet_ref));
  if (bloque.agrupacion) paras.push(labeledPara("Grouping", bloque.agrupacion));

  if (bloque.instrucciones_paso_a_paso) {
    paras.push(h3("Instrucciones Paso a Paso"));
    const steps = bloque.instrucciones_paso_a_paso;
    (Array.isArray(steps) ? steps : lines(steps)).forEach(l => paras.push(bulletPara(l)));
  }

  if (bloque.teacher_talk_instruction) {
    paras.push(h3("Teacher Talk — Instruction"));
    lines(bloque.teacher_talk_instruction).forEach(l => italicPara(l) && paras.push(italicPara(l)));
  }

  if (bloque.icq) {
    paras.push(h3("Instruction Check Questions (ICQ)"));
    (Array.isArray(bloque.icq) ? bloque.icq : [bloque.icq]).forEach(q => paras.push(bulletPara(q)));
  }

  if (bloque.answer_key_inline) {
    paras.push(h3("Answer Key (Inline)"));
    paras.push(...makeAnswerKeyTable(bloque.answer_key_inline));
  }

  if (bloque.facilitation_notes) {
    paras.push(h3("Facilitation Notes"));
    const fn = bloque.facilitation_notes;
    (Array.isArray(fn) ? fn : [fn]).forEach(n => paras.push(bulletPara(n)));
  }

  if (bloque.checkpoint) {
    paras.push(h3("Formative Checkpoint"));
    paras.push(bodyPara(bloque.checkpoint));
  }

  if (bloque.transition) {
    paras.push(h3("Transition"));
    paras.push(italicPara(bloque.transition));
  }

  // Student materials embedded
  const materialKeys = ["dialogue", "dialogues", "texto", "text", "word_list", "word_lists",
    "phrase_cards", "sentence_starters", "rubric", "criteria", "vocabulary",
    "student_material", "student_materials"];
  materialKeys.forEach(mk => {
    if (bloque[mk]) {
      paras.push(h3(mk.replace(/_/g, " ").toUpperCase()));
      paras.push(...renderValue(bloque[mk]));
    }
  });

  paras.push(spacer());
  return paras;
}

// ─── Render a block — new format S4-S8 ───────────────────────────────────────
function renderBloqueNew(key, bloque) {
  const paras = [];
  if (!bloque || typeof bloque !== "object") return paras;

  const blockLabel = bloque.block || key.toUpperCase();
  const title = bloque.title || bloque.label || "";
  const dur = bloque.duration_min || "";
  const time = bloque.time || "";

  if (blockLabel.toLowerCase() === "break") {
    paras.push(h2(`BREAK (${dur} min) ${time}`));
    if (bloque.instructor_note) paras.push(bodyPara("Instructor Note: " + bloque.instructor_note));
    if (bloque.transition_back) {
      paras.push(boldPara("Transition Back:"));
      paras.push(italicPara(bloque.transition_back));
    }
    paras.push(spacer());
    return paras;
  }

  paras.push(h2(`${blockLabel}${title ? " — " + title : ""} (${dur} min) ${time}`));

  if (bloque.tecnica_didactica) {
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: "Técnica Didáctica: ", font: "Calibri", size: 20, bold: true, color: "1C2B3C" }),
        new TextRun({ text: s(bloque.tecnica_didactica), font: "Calibri", size: 20, italics: true, color: "F59316" }),
      ],
      spacing: { before: 40, after: 80 },
      border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
      indent: { left: 200 },
    }));
  }

  if (bloque.tecnica_didactica) {
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: "Técnica Didáctica: ", font: "Calibri", size: 20, bold: true, color: "1C2B3C" }),
        new TextRun({ text: s(bloque.tecnica_didactica), font: "Calibri", size: 20, italics: true, color: "F59316" }),
      ],
      spacing: { before: 40, after: 80 },
      border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
      indent: { left: 200 },
    }));
  }

  if (bloque.tecnica_didactica) {
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: "Técnica Didáctica: ", font: "Calibri", size: 20, bold: true, color: "1C2B3C" }),
        new TextRun({ text: s(bloque.tecnica_didactica), font: "Calibri", size: 20, italics: true, color: "F59316" }),
      ],
      spacing: { before: 40, after: 80 },
      border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
      indent: { left: 200 },
    }));
  }

  if (bloque.bloom) paras.push(labeledPara("Bloom", bloque.bloom));
  if (bloque.purpose) paras.push(...renderSection("Purpose", bloque.purpose));
  if (bloque.pm_source) paras.push(labeledPara("PM Source", bloque.pm_source));

  // Teacher talk
  const tt = bloque.teacher_talk;
  if (tt) {
    paras.push(h3("Teacher Talk"));
    if (typeof tt === "string") {
      lines(tt).forEach(l => paras.push(italicPara(l)));
    } else if (typeof tt === "object") {
      Object.entries(tt).forEach(([k, v]) => {
        paras.push(boldPara(k.replace(/_/g, " ") + ":"));
        (Array.isArray(v) ? v : lines(v)).forEach(l => paras.push(italicPara(l)));
      });
    }
  }

  // Activities
  if (bloque.activities) {
    paras.push(h3("Activities"));
    paras.push(...renderActivities(bloque.activities));
  }

  // Evidence conditions
  const evidKeys = ["evidence_conditions", "evidence_4_conditions", "evidence_5_conditions",
                    "evidence_3_conditions", "evidence_6_conditions"];
  evidKeys.forEach(ek => {
    if (bloque[ek]) {
      paras.push(h3("Evidence Conditions — " + ek));
      paras.push(...renderValue(bloque[ek]));
    }
  });

  // Differentiation
  if (bloque.differentiation) {
    paras.push(h3("Differentiation"));
    const diff = bloque.differentiation;
    if (diff.fast_finishers) {
      paras.push(boldPara("Fast Finishers:"));
      paras.push(...renderValue(diff.fast_finishers));
    }
    if (diff.more_support || diff.more_support_needed) {
      paras.push(boldPara("More Support:"));
      paras.push(...renderValue(diff.more_support || diff.more_support_needed));
    }
  }

  // Formative checkpoint
  if (bloque.formative_checkpoint) {
    paras.push(h3("Formative Checkpoint"));
    paras.push(...renderValue(bloque.formative_checkpoint));
  }

  // Logistics
  if (bloque.logistics) {
    paras.push(h3("Logistics"));
    paras.push(...renderValue(bloque.logistics));
  }

  // Plan B
  if (bloque.plan_b) {
    paras.push(h3("Plan B"));
    paras.push(...renderValue(bloque.plan_b));
  }

  paras.push(spacer());
  return paras;
}

// ─── Render SET-UP old format ────────────────────────────────────────────────
function renderSetUpOld(su) {
  const paras = [];
  if (!su) return paras;
  paras.push(h2(`SET-UP (${su.duracion_min || ""} min)`));

  if (su.warm_up) {
    paras.push(h3("Warm-Up: " + (su.warm_up.nombre || "")));
    if (su.warm_up.pasos) {
      (Array.isArray(su.warm_up.pasos) ? su.warm_up.pasos : [su.warm_up.pasos]).forEach(p => paras.push(bulletPara(p)));
    }
  }

  if (su.teacher_talk_opening) {
    paras.push(h3("Teacher Talk — Opening"));
    lines(su.teacher_talk_opening).forEach(l => paras.push(italicPara(l)));
  }

  if (su.objective) paras.push(...renderSection("Objective", su.objective));

  if (su.icq) {
    paras.push(h3("ICQ"));
    (Array.isArray(su.icq) ? su.icq : [su.icq]).forEach(q => paras.push(bulletPara(q)));
  }

  if (su.facilitation_notes) {
    paras.push(h3("Facilitation Notes"));
    (Array.isArray(su.facilitation_notes) ? su.facilitation_notes : [su.facilitation_notes]).forEach(n => paras.push(bulletPara(n)));
  }

  if (su.checkpoint) {
    paras.push(h3("Checkpoint"));
    paras.push(bodyPara(su.checkpoint));
  }

  paras.push(spacer());
  return paras;
}

// ─── Render WRAP-UP old format ───────────────────────────────────────────────
function renderWrapUpOld(wu) {
  const paras = [];
  if (!wu) return paras;
  paras.push(h2(`WRAP-UP (${wu.duracion_min || ""} min)`));

  if (wu.exit_ticket) {
    paras.push(h3("Exit Ticket"));
    paras.push(...renderValue(wu.exit_ticket));
  }

  if (wu.teacher_talk_closing) {
    paras.push(h3("Teacher Talk — Closing"));
    lines(wu.teacher_talk_closing).forEach(l => paras.push(italicPara(l)));
  }

  if (wu.trabajo_autonomo) {
    paras.push(h3("Trabajo Autónomo"));
    paras.push(...renderValue(wu.trabajo_autonomo));
  }

  if (wu.preview_next_session) {
    paras.push(h3("Preview Next Session"));
    paras.push(bodyPara(wu.preview_next_session));
  }

  if (wu.facilitation_notes) {
    paras.push(h3("Facilitation Notes"));
    (Array.isArray(wu.facilitation_notes) ? wu.facilitation_notes : [wu.facilitation_notes]).forEach(n => paras.push(bulletPara(n)));
  }

  paras.push(spacer());
  return paras;
}

// ─── Render BREAKS (old format) ──────────────────────────────────────────────
function renderBreaksOld(breaks) {
  if (!breaks) return [];
  const paras = [];
  paras.push(h2("BREAK"));
  paras.push(...renderValue(breaks));
  paras.push(spacer());
  return paras;
}

// ─── Session-level header block ──────────────────────────────────────────────
function renderSessionHeaderOld(d) {
  const paras = [];
  const sh = d.session_header || {};
  const pairs = [
    ["PM ID", d.pm_id || ""],
    ["Session", d.session || ""],
    ["Title", sh.titulo || d.session_name || ""],
    ["Subtitle", sh.subtitulo || ""],
    ["CEFR", d.cefr || ""],
    ["Duration", `${d.duracion_min || ""} min (${sh.duracion_horas || ""} hours)`],
    ["Worksheets", (d.worksheets || []).join(", ")],
    ["Skills Focus", (d.habilidades_foco || []).join(", ") || "—"],
    ["Skills Support", (d.habilidades_soporte || []).join(", ")],
    ["Generated", d.generated_at || ""],
    ["Status", d.status || ""],
    ["Momento SENA", d.momento_sena || "—"],
    ["Estrategia Didáctica", d.estrategia_didactica || "—"],
    ["Justificación", d.justificacion_didactica || ""],
  ];
  if (sh.nota_instructor) {
    paras.push(new Paragraph({
      children: [new TextRun({ text: sh.nota_instructor, font: "Calibri", size: 20, italics: true, color: "444444" })],
      border: { bottom: { style: BorderStyle.SINGLE, color: NAVY, size: 4 } },
      spacing: { before: 80, after: 120 },
    }));
  }
  paras.push(...makeTwoColTable(pairs));
  return paras;
}

function renderSessionHeaderNew(d) {
  const h = d.header || {};
  const pairs = [
    ["PM ID", d.pm_id || ""],
    ["Session", d.session || ""],
    ["Title", h.nombre_sesion || d.session_name || ""],
    ["CEFR", h.cefr || d.cefr || ""],
    ["Duration", `${h.duracion_total_min || d.duracion_min || ""} min | Direct: ${h.horas_directas || ""} h | Autonomous: ${h.horas_autonomas || ""} h`],
    ["Fase SENA", d.fase_sena || ""],
    ["Ambiente", h.ambiente || ""],
    ["Worksheets", (d.worksheets_used || []).join(", ")],
    ["Evidences", (d.evidences_generated || []).join(", ")],
    ["Characters", Array.isArray(h.personajes) ? h.personajes.join(" | ") : s(h.personajes)],
    ["Generated", d.generated_at || ""],
    ["Status", d.status || ""],
    ["Momento SENA", d.momento_sena || "—"],
    ["Estrategia Didáctica", d.estrategia_didactica || "—"],
    ["Justificación", d.justificacion_didactica || ""],
  ];
  return makeTwoColTable(pairs);
}

// ─── Render scenario assets ──────────────────────────────────────────────────
function renderScenarioAssets(assets) {
  const paras = [];
  if (!assets || typeof assets !== "object") return paras;
  paras.push(h2("Scenario Assets / Student Materials"));
  Object.entries(assets).forEach(([k, v]) => {
    paras.push(h3(k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())));
    paras.push(...renderValue(v));
    paras.push(spacer());
  });
  return paras;
}

// ─── Render logistics box ─────────────────────────────────────────────────────
function renderLogisticsBox(lb) {
  const paras = [];
  if (!lb) return paras;
  paras.push(h2("Logistics Box"));
  if (lb.materials_checklist) {
    paras.push(h3("Materials Checklist"));
    paras.push(...makeMaterialsTable(Array.isArray(lb.materials_checklist) ?
      lb.materials_checklist :
      Object.entries(lb.materials_checklist).map(([k, v]) => ({ item: k + ": " + s(v) }))));
  }
  if (lb.room_setup) {
    paras.push(h3("Room Setup"));
    paras.push(...renderValue(lb.room_setup));
  }
  if (lb.audio_plan) {
    paras.push(h3("Audio Plan"));
    paras.push(...renderValue(lb.audio_plan));
  }
  if (lb.technology) {
    paras.push(h3("Technology"));
    paras.push(...renderValue(lb.technology));
  }
  if (lb.pre_session_preparation) {
    paras.push(h3("Pre-Session Preparation"));
    paras.push(...renderValue(lb.pre_session_preparation));
  }
  paras.push(spacer());
  return paras;
}

// ─── Render Plan B ────────────────────────────────────────────────────────────
function renderPlanB(planb) {
  const paras = [];
  if (!planb) return paras;
  paras.push(h2("Plan B — Contingency Notes"));
  if (planb.session_level_contingencies) {
    paras.push(...renderValue(planb.session_level_contingencies));
  } else {
    Object.entries(planb).forEach(([k, v]) => {
      paras.push(boldPara("If " + k.replace(/^if_/, "").replace(/_/g, " ") + ":"));
      paras.push(...renderValue(v));
      paras.push(spacer());
    });
  }
  return paras;
}

// ─── Render autonomous work ───────────────────────────────────────────────────
function renderAutonomousWork(aw) {
  const paras = [];
  if (!aw) return paras;
  paras.push(h2("Autonomous Work"));
  if (aw.duracion_h || aw.hours) paras.push(labeledPara("Duration", `${aw.duracion_h || aw.hours} hours`));
  if (aw.label) paras.push(labeledPara("Label", aw.label));
  if (aw.actividades) {
    paras.push(h3("Activities"));
    paras.push(...renderValue(aw.actividades));
  }
  if (aw.activities) {
    paras.push(h3("Activities"));
    paras.push(...renderValue(aw.activities));
  }
  if (aw.note) paras.push(bodyPara(aw.note, { italic: true }));
  paras.push(spacer());
  return paras;
}

// ─── Render instructor self-check ─────────────────────────────────────────────
function renderSelfCheck(isc) {
  const paras = [];
  if (!isc) return paras;
  paras.push(h2("Instructor Self-Check"));
  const items = Array.isArray(isc) ? isc : Object.values(isc);
  items.forEach(q => paras.push(bulletPara(s(q))));
  paras.push(spacer());
  return paras;
}

// ─── Render differentiation ───────────────────────────────────────────────────
function renderDifferentiation(diff) {
  const paras = [];
  if (!diff) return paras;
  paras.push(h2("Differentiation"));
  if (diff.fast_finishers) {
    paras.push(h3("Fast Finishers"));
    paras.push(...renderValue(diff.fast_finishers));
  }
  if (diff.more_support_needed || diff.more_support) {
    paras.push(h3("More Support Needed"));
    paras.push(...renderValue(diff.more_support_needed || diff.more_support));
  }
  if (diff.accessibility) {
    paras.push(h3("Accessibility"));
    paras.push(...renderValue(diff.accessibility));
  }
  paras.push(spacer());
  return paras;
}

// ─── S6 cuestionario renderer ─────────────────────────────────────────────────
function renderCuestionario(qs) {
  const paras = [];
  if (!qs) return paras;
  paras.push(h2(qs.title || "Cuestionario Consolidado"));
  if (qs.instructions) {
    paras.push(new Paragraph({
      children: [new TextRun({ text: s(qs.instructions), font: "Calibri", size: 22, italics: true })],
      spacing: { before: 80, after: 120 },
      border: { left: { style: BorderStyle.THICK, color: NAVY, size: 12 } },
      indent: { left: 240 },
    }));
  }
  if (Array.isArray(qs.sections)) {
    qs.sections.forEach((sec, idx) => {
      paras.push(h3(`Section ${idx + 1}: ${sec.section || ""}`));
      if (sec.source_text) {
        paras.push(boldPara("Source Text:"));
        lines(sec.source_text).forEach(l => paras.push(new Paragraph({
          children: [new TextRun({ text: l, font: "Calibri", size: 20 })],
          spacing: { before: 0, after: 40 },
          indent: { left: 360 },
        })));
      }
      if (Array.isArray(sec.questions)) {
        sec.questions.forEach(q => {
          paras.push(boldPara(`${q.id || ""}: ${q.question || s(q)}`));
          if (q.options) {
            (Array.isArray(q.options) ? q.options : Object.entries(q.options).map(([k,v])=>`${k}) ${v}`)).forEach(opt =>
              paras.push(new Paragraph({
                children: [new TextRun({ text: s(opt), font: "Calibri", size: 20 })],
                spacing: { before: 0, after: 30 },
                indent: { left: 720 },
              }))
            );
          }
          paras.push(spacer());
        });
      }
    });
  }
  return paras;
}

// ─── S6 consolidated answer key ──────────────────────────────────────────────
function renderConsolidatedAnswerKey(cak) {
  const paras = [];
  if (!cak) return paras;
  paras.push(h2("Consolidated Answer Key"));
  if (typeof cak === "object" && !Array.isArray(cak)) {
    const entries = Object.entries(cak);
    if (entries.length > 0) {
      // Build a compact table
      const cols = 6;
      const colW = Math.floor(9360 / cols);
      const colWidths = Array(cols).fill(colW);
      // header
      const headerCells = ["Item", "Answer", "Item", "Answer", "Item", "Answer"].map((t, i) =>
        headerCell(t, colWidths[i])
      );
      const tableRows = [new TableRow({ children: headerCells, tableHeader: true })];
      // chunk into groups of 3 for 3 pairs per row
      for (let i = 0; i < entries.length; i += 3) {
        const rowCells = [];
        for (let j = 0; j < 3; j++) {
          if (i + j < entries.length) {
            const [k, v] = entries[i + j];
            rowCells.push(bodyCell(k, colWidths[j * 2], { shade: (i / 3) % 2 === 1 }));
            rowCells.push(bodyCell(s(v), colWidths[j * 2 + 1], { shade: (i / 3) % 2 === 1, bold: true }));
          } else {
            rowCells.push(bodyCell("", colWidths[j * 2]));
            rowCells.push(bodyCell("", colWidths[j * 2 + 1]));
          }
        }
        tableRows.push(new TableRow({ children: rowCells }));
      }
      paras.push(new Table({ columnWidths: colWidths, rows: tableRows, width: { size: 9360, type: WidthType.DXA } }));
      paras.push(spacer());
    }
  }
  return paras;
}

// ─── S7/S8 session assets ────────────────────────────────────────────────────
function renderSessionAssets(assets) {
  return renderScenarioAssets(assets);
}

// ─── Capstone instrument ─────────────────────────────────────────────────────
function renderCapstoneInstrument(ci) {
  const paras = [];
  if (!ci) return paras;
  paras.push(h2(ci.title || "Capstone Instrument"));
  if (ci.evaluator) paras.push(labeledPara("Evaluator", ci.evaluator));
  if (ci.timing) paras.push(labeledPara("Timing", ci.timing));

  if (ci.criteria) {
    paras.push(h3("Evaluation Criteria"));
    paras.push(...renderValue(ci.criteria));
  }
  if (ci.scoring) {
    paras.push(h3("Scoring"));
    paras.push(...renderValue(ci.scoring));
  }
  if (ci.follow_up_question_bank) {
    paras.push(h3("Follow-Up Question Bank"));
    paras.push(...renderValue(ci.follow_up_question_bank));
  }
  if (ci.follow_up_note) paras.push(bodyPara(ci.follow_up_note, { italic: true }));
  paras.push(spacer());
  return paras;
}

// ─── Connections ─────────────────────────────────────────────────────────────
function renderConnections(conn) {
  const paras = [];
  if (!conn) return paras;
  paras.push(h2("Connections / Forward Links"));
  paras.push(...renderValue(conn));
  paras.push(spacer());
  return paras;
}

// ─── Skills Progression ──────────────────────────────────────────────────────
function renderSkillsProgression(sp) {
  const paras = [];
  if (!sp) return paras;
  paras.push(h2("Skills Progression Update"));
  paras.push(...renderValue(sp));
  paras.push(spacer());
  return paras;
}

// ─── Evidence summary ────────────────────────────────────────────────────────
function renderEvidenceSummary(ev) {
  const paras = [];
  if (!ev) return paras;
  paras.push(h2("Evidence Summary"));
  if (Array.isArray(ev)) {
    ev.forEach(e => {
      paras.push(h3(`Evidence ${e.evidence_number || ""}: ${e.title || ""}`));
      const pairs = [];
      if (e.instrument_type) pairs.push(["Type", e.instrument_type]);
      if (e.total_items) pairs.push(["Total Items", e.total_items]);
      if (e.total_points) pairs.push(["Total Points", e.total_points]);
      if (pairs.length) paras.push(...makeTwoColTable(pairs));
      if (e.sections) paras.push(...renderValue(e.sections));
      paras.push(spacer());
    });
  } else if (typeof ev === "object") {
    paras.push(h3(`Evidence ${ev.evidence_number || ""}: ${ev.title || ""}`));
    const pairs = [];
    if (ev.instrument_type) pairs.push(["Type", ev.instrument_type]);
    if (ev.total_items) pairs.push(["Total Items", ev.total_items]);
    if (ev.total_points) pairs.push(["Total Points", ev.total_points]);
    if (pairs.length) paras.push(...makeTwoColTable(pairs));
    if (ev.sections) paras.push(...renderValue(ev.sections));
  }
  return paras;
}

// ─── Final Mission Task Spec ──────────────────────────────────────────────────
function renderFinalMissionSpec(spec) {
  const paras = [];
  if (!spec) return paras;
  paras.push(h2(spec.title || "Final Mission Task Specification"));
  if (spec.subtitle) paras.push(italicPara(spec.subtitle));
  if (spec.scenario) {
    paras.push(h3("Scenario"));
    paras.push(bodyPara(spec.scenario));
  }
  if (spec.roles) {
    paras.push(h3("Roles"));
    paras.push(...renderValue(spec.roles));
  }
  if (spec.required_language_functions) {
    paras.push(h3("Required Language Functions"));
    paras.push(...renderValue(spec.required_language_functions));
  }
  if (spec.timing_structure) {
    paras.push(h3("Timing Structure"));
    paras.push(...renderValue(spec.timing_structure));
  }
  if (spec.minimum_requirements) {
    paras.push(h3("Minimum Requirements"));
    paras.push(...renderValue(spec.minimum_requirements));
  }
  if (spec.language_minimum) {
    paras.push(h3("Language Minimum"));
    paras.push(...renderValue(spec.language_minimum));
  }
  if (spec.assessment_rubric) {
    paras.push(h3("Assessment Rubric"));
    paras.push(...renderValue(spec.assessment_rubric));
  }
  if (spec.sample_script) {
    paras.push(h3("Sample Script"));
    paras.push(...renderValue(spec.sample_script));
  }
  paras.push(spacer());
  return paras;
}

// ─── Board plan ───────────────────────────────────────────────────────────────
function renderBoardPlan(bp) {
  const paras = [];
  if (!bp) return paras;
  paras.push(h3("Board Plan"));
  lines(bp).forEach(l => paras.push(new Paragraph({
    children: [new TextRun({ text: l, font: "Courier New", size: 18 })],
    spacing: { before: 0, after: 30 },
  })));
  paras.push(spacer());
  return paras;
}

// ─── PM-0 Protocol ────────────────────────────────────────────────────────────
function renderPM0Protocol(p0) {
  const paras = [];
  if (!p0) return paras;

  // Section header — navy bg
  paras.push(new Paragraph({
    children: [new TextRun({ text: "🎯  PM-0 — PROTOCOLO PEDAGÓGICO", font: "Arial", size: 22, bold: true, color: "FFFFFF" })],
    shading: { type: "clear", fill: "1C2B3C" },
    spacing: { before: 240, after: 0 },
    indent: { left: 120, right: 120 },
  }));

  // Helper: labeled row
  function pm0Row(label, value) {
    if (!value) return;
    const items = Array.isArray(value) ? value : [value];
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: label + ":  ", font: "Arial", size: 20, bold: true, color: "F59316" }),
        new TextRun({ text: items[0], font: "Calibri", size: 20 }),
      ],
      spacing: { before: 80, after: 0 },
      indent: { left: 240 },
    }));
    items.slice(1).forEach(item => paras.push(new Paragraph({
      children: [new TextRun({ text: "• " + item, font: "Calibri", size: 20 })],
      spacing: { before: 40, after: 0 },
      indent: { left: 480 },
    })));
  }

  // Helper: subsection header
  function pm0Sub(title) {
    paras.push(new Paragraph({
      children: [new TextRun({ text: "▸  " + title, font: "Arial", size: 20, bold: true, color: "1C2B3C" })],
      spacing: { before: 120, after: 40 },
      indent: { left: 120 },
      border: { bottom: { style: "single", size: 2, color: "F59316" } },
    }));
  }

  // 1 — GRAMMAR
  if (p0.grammar_groups) {
    pm0Sub("SILABUS GRAMATICAL (PM-0 §5.6)");
    (Array.isArray(p0.grammar_groups) ? p0.grammar_groups : [p0.grammar_groups]).forEach(g => {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "• " + g, font: "Calibri", size: 20 })],
        spacing: { before: 40, after: 0 },
        indent: { left: 360 },
      }));
    });
  }

  // 2 — FEEDBACK DIFERENCIADO
  if (p0.feedback) {
    pm0Sub("FEEDBACK DIFERENCIADO (PM-0 §5.11)");
    const fb = p0.feedback;
    if (fb.mode) pm0Row("Modo dominante", fb.mode);
    if (fb.accuracy_techniques && fb.accuracy_techniques.length) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Técnicas de ACCURACY:  ", font: "Arial", size: 20, bold: true, color: "1A6B3C" })],
        spacing: { before: 80, after: 0 }, indent: { left: 240 },
      }));
      fb.accuracy_techniques.forEach(t => paras.push(new Paragraph({
        children: [new TextRun({ text: "✔  " + t, font: "Calibri", size: 20 })],
        spacing: { before: 40, after: 0 }, indent: { left: 480 },
      })));
    }
    if (fb.fluency_techniques && fb.fluency_techniques.length) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Técnicas de FLUENCY:  ", font: "Arial", size: 20, bold: true, color: "1A2535" })],
        spacing: { before: 80, after: 0 }, indent: { left: 240 },
      }));
      fb.fluency_techniques.forEach(t => paras.push(new Paragraph({
        children: [new TextRun({ text: "✔  " + t, font: "Calibri", size: 20 })],
        spacing: { before: 40, after: 0 }, indent: { left: 480 },
      })));
    }
    if (fb.notes) pm0Row("Nota instructor", fb.notes);
  }

  // 3 — L1 MANAGEMENT
  if (p0.l1_management) {
    pm0Sub("GESTIÓN DEL L1 (PM-0 §5.12)");
    const l1 = p0.l1_management;
    if (l1.l1_percentage) pm0Row("L1 permitido esta sesión", l1.l1_percentage);
    if (l1.english_zone_declaration) pm0Row("English Zone", l1.english_zone_declaration);
    if (l1.l1_allowed_for) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "L1 permitido en:  ", font: "Arial", size: 20, bold: true, color: "F59316" })],
        spacing: { before: 80, after: 0 }, indent: { left: 240 },
      }));
      (Array.isArray(l1.l1_allowed_for) ? l1.l1_allowed_for : [l1.l1_allowed_for]).forEach(item => paras.push(new Paragraph({
        children: [new TextRun({ text: "• " + item, font: "Calibri", size: 20 })],
        spacing: { before: 40, after: 0 }, indent: { left: 480 },
      })));
    }
    if (l1.reduction_strategy) pm0Row("Estrategia de reducción", l1.reduction_strategy);
  }

  // 4 — STRESS / PRONUNCIACIÓN
  if (p0.stress_pronunciation) {
    pm0Sub("NOTICING DE STRESS (PM-0 §5.13)");
    const sp = p0.stress_pronunciation;
    if (sp.focus_words && sp.focus_words.length) pm0Row("Palabras foco", sp.focus_words.join("  ·  "));
    if (sp.techniques && sp.techniques.length) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Técnicas:  ", font: "Arial", size: 20, bold: true, color: "F59316" })],
        spacing: { before: 80, after: 0 }, indent: { left: 240 },
      }));
      sp.techniques.forEach(t => paras.push(new Paragraph({
        children: [new TextRun({ text: "✔  " + t, font: "Calibri", size: 20 })],
        spacing: { before: 40, after: 0 }, indent: { left: 480 },
      })));
    }
    if (sp.board_marking) pm0Row("Marcado en tablero", sp.board_marking);
    if (sp.notes) pm0Row("Nota", sp.notes);
  }

  // 5 — SUCCESS VOCABULARY
  if (p0.success_vocabulary) {
    pm0Sub("VOCABULARIO SUCCESS (PM-0 §5.5)");
    const sv = p0.success_vocabulary;
    if (sv.target_words && sv.target_words.length) pm0Row("Términos tratados", sv.target_words.join("  ·  "));
    if (sv.factors_applied && sv.factors_applied.length) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "Factores SUCCESS aplicados:  ", font: "Arial", size: 20, bold: true, color: "F59316" })],
        spacing: { before: 80, after: 0 }, indent: { left: 240 },
      }));
      sv.factors_applied.forEach(f => paras.push(new Paragraph({
        children: [new TextRun({ text: "✔  " + f, font: "Calibri", size: 20 })],
        spacing: { before: 40, after: 0 }, indent: { left: 480 },
      })));
    }
  }

  paras.push(spacer());
  return paras;
}

// ─── Totals check ─────────────────────────────────────────────────────────────
function renderTotalsCheck(tc) {
  const paras = [];
  if (!tc) return paras;
  paras.push(h3("Totals Check"));
  if (typeof tc === "object") {
    const pairs = Object.entries(tc).map(([k, v]) => [k, s(v)]);
    if (pairs.length) paras.push(...makeTwoColTable(pairs));
  }
  paras.push(spacer());
  return paras;
}

// ─── S1–S3 full session render ───────────────────────────────────────────────
function renderSessionOldFormat(d) {
  const paras = [];
  const sNum = d.session || "";
  const sName = d.session_name || "";

  // H1 + Session header
  paras.push(h1(`SESSION ${sNum}: ${sName}`, true));
  paras.push(hrPara());
  paras.push(...renderSessionHeaderOld(d));

  // Evidence generated
  if (d.evidence_generated) {
    paras.push(h2("Evidence Generated"));
    paras.push(...renderValue(d.evidence_generated));
    paras.push(spacer());
  }

  // Materials checklist
  if (d.materials_checklist) {
    paras.push(h2("Materials Checklist"));
    paras.push(...makeMaterialsTable(d.materials_checklist));
  }

  // Board plan
  if (d.board_plan) paras.push(...renderBoardPlan(d.board_plan));

  // Timeline
  if (d.timeline) {
    paras.push(h2("Timeline Overview"));
    paras.push(...makeTimelineTable(d.timeline));
  }

  // SET-UP
  if (d.set_up) paras.push(...renderSetUpOld(d.set_up));

  // WHILE blocks
  const wh = d.while || {};
  if (wh.bloques) {
    wh.bloques.forEach(bloque => paras.push(...renderBloqueOld(bloque)));
  }
  if (wh.breaks) paras.push(...renderBreaksOld(wh.breaks));

  // WRAP-UP
  if (d.wrap_up) paras.push(...renderWrapUpOld(d.wrap_up));

  // Motor Age reading article (S2)
  if (d.motor_age_article) {
    const art = d.motor_age_article;
    paras.push(h2("READING TEXT — " + s(art.title)));
    paras.push(new Paragraph({
      children: [new TextRun({ text: s(art.source), font: "Calibri", size: 18, italics: true, color: "555555" })],
      spacing: { before: 0, after: 80 },
    }));
    if (art.note_instructor) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: "⚠ " + s(art.note_instructor), font: "Calibri", size: 18, italics: true, color: "CC4400" })],
        spacing: { before: 0, after: 120 },
        border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
        indent: { left: 200 },
      }));
    }
    (art.sections || []).forEach(sec => {
      paras.push(h3(`Section ${sec.number}: ${sec.title}`));
      paras.push(new Paragraph({
        children: [new TextRun({ text: s(sec.text), font: "Calibri", size: 22 })],
        spacing: { before: 0, after: 120 },
      }));
    });
    if (art.comprehension_bridge) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: s(art.comprehension_bridge), font: "Calibri", size: 18, italics: true, color: "1C2B3C" })],
        spacing: { before: 0, after: 80 },
        border: { bottom: { style: BorderStyle.SINGLE, color: "D0D5DB", size: 4 } },
      }));
    }
    paras.push(spacer());
  }

  // Answer key consolidated
  if (d.answer_key_consolidado) {
    paras.push(h2("Answer Key — Consolidated"));
    paras.push(...makeAnswerKeyTable(d.answer_key_consolidado));
    paras.push(spacer());
  }

  // PM-0 Protocol
  if (d.pm0_protocol) paras.push(...renderPM0Protocol(d.pm0_protocol));

  // Differentiation
  if (d.differentiation) paras.push(...renderDifferentiation(d.differentiation));

  // Instructor self-check
  if (d.instructor_self_check) paras.push(...renderSelfCheck(d.instructor_self_check));

  // Totals check
  if (d.totals_check) paras.push(...renderTotalsCheck(d.totals_check));

  // RAP status
  if (d.rap_status) {
    paras.push(h3("RAP Status"));
    paras.push(...renderValue(d.rap_status));
  }

  return paras;
}

// ─── S4–S8 full session render ───────────────────────────────────────────────
function renderSessionNewFormat(d) {
  const paras = [];
  const sNum = d.session || "";
  const sName = d.session_name || (d.header && d.header.nombre_sesion) || "";

  // H1 + Session header
  paras.push(h1(`SESSION ${sNum}: ${sName}`, true));
  paras.push(hrPara());
  paras.push(...renderSessionHeaderNew(d));

  // Evidence note
  if (d.evidence_note) {
    paras.push(h3("Evidence Note"));
    paras.push(italicPara(d.evidence_note));
    paras.push(spacer());
  }

  // Evidence generated/summary
  if (d.evidences_generated && Array.isArray(d.evidences_generated)) {
    paras.push(h2("Evidences Generated"));
    d.evidences_generated.forEach(e => paras.push(bulletPara(s(e))));
    paras.push(spacer());
  }
  const evSum = d.evidences_summary || d.evidence_summary;
  if (evSum) paras.push(...renderEvidenceSummary(evSum));

  // Language functions reference (S5)
  if (d.language_functions_reference) {
    paras.push(h2("Language Functions Reference"));
    paras.push(...renderValue(d.language_functions_reference));
    paras.push(spacer());
  }

  // Scenario assets (S4)
  if (d.scenario_assets) paras.push(...renderScenarioAssets(d.scenario_assets));

  // Session assets (S5, S7, S8)
  if (d.session_assets) paras.push(...renderSessionAssets(d.session_assets));

  // Final mission task spec (S7)
  if (d.final_mission_task_specification) {
    paras.push(...renderFinalMissionSpec(d.final_mission_task_specification));
  }

  // Capstone instrument (S8)
  if (d.capstone_instrument) paras.push(...renderCapstoneInstrument(d.capstone_instrument));

  // Cuestionario (S6)
  if (d.cuestionario) paras.push(...renderCuestionario(d.cuestionario));

  // Timeline
  if (d.timeline) {
    paras.push(h2("Timeline Overview"));
    paras.push(...makeTimelineTable(d.timeline));
  }

  // Session plan blocks
  const sp = d.session_plan || {};
  const blockOrder = ["set_up", "while_a", "while_b", "while_c", "while_d", "while_e", "break", "wrap_up"];
  // Also handle any extra keys not in our list
  const allKeys = Object.keys(sp);
  const orderedKeys = [
    ...blockOrder.filter(k => k in sp),
    ...allKeys.filter(k => !blockOrder.includes(k))
  ];
  orderedKeys.forEach(key => {
    const bloque = sp[key];
    paras.push(...renderBloqueNew(key, bloque));
  });

  // Consolidated answer key (S6)
  if (d.consolidated_answer_key) {
    paras.push(...renderConsolidatedAnswerKey(d.consolidated_answer_key));
  }

  // Logistics box
  if (d.logistics_box) paras.push(...renderLogisticsBox(d.logistics_box));

  // Plan B
  if (d.plan_b) paras.push(...renderPlanB(d.plan_b));

  // Autonomous work
  if (d.autonomous_work) paras.push(...renderAutonomousWork(d.autonomous_work));

  // PM-0 Protocol
  if (d.pm0_protocol) paras.push(...renderPM0Protocol(d.pm0_protocol));

  // Instructor self-check
  if (d.instructor_self_check) paras.push(...renderSelfCheck(d.instructor_self_check));

  // Skills progression
  if (d.skills_progression_update) paras.push(...renderSkillsProgression(d.skills_progression_update));

  // Connections
  if (d.connections) paras.push(...renderConnections(d.connections));

  return paras;
}

// ─── Cover page ───────────────────────────────────────────────────────────────
function makeCoverPage() {
  return [
    new Paragraph({ children: [], spacing: { before: 2000, after: 0 } }),
    new Paragraph({
      children: [new TextRun({ text: "PM-3.2 — Build-Out Completo", font: "Arial", size: 48, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Guía 1.1 — The Workshop Specialist", font: "Arial", size: 32, bold: false, color: NAVY })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Mantenimiento de Motores Diesel", font: "Calibri", size: 26 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "SENA · CEFR A1.1–A1.2 · 8 Sessions · 360 min each", font: "Calibri", size: 24, color: "555555" })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Run ID: DIESEL-2026-04-15", font: "Calibri", size: 22, color: "777777" })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
    }),
    new Paragraph({
      children: [new TextRun({
        text: "FOR INSTRUCTOR USE ONLY — Contains complete Teacher Talk scripts, answer keys, facilitation notes, evaluation instruments, and all session materials.",
        font: "Calibri", size: 20, italics: true, color: "555555"
      })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 0 },
      border: {
        top: { style: BorderStyle.SINGLE, color: NAVY, size: 8 },
        bottom: { style: BorderStyle.SINGLE, color: NAVY, size: 8 },
      },
      indent: { left: 720, right: 720 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── Table of contents placeholder ───────────────────────────────────────────
function makeTOC() {
  return [
    new Paragraph({
      children: [new TextRun({ text: "TABLE OF CONTENTS", font: "Arial", size: 32, bold: true, color: NAVY })],
      spacing: { before: 200, after: 200 },
    }),
    new TableOfContents("Table of Contents", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── Header ───────────────────────────────────────────────────────────────────
function makeHeader() {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "PM-3.2 | Build-Out Completo | Guía 1.1 — The Workshop Specialist", font: "Calibri", size: 18, color: "666666" }),
        ],
        border: { bottom: { style: BorderStyle.SINGLE, color: MID_GRAY, size: 4 } },
        spacing: { before: 0, after: 60 },
      }),
    ],
  });
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function makeFooter() {
  return new Footer({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "SENA · Mantenimiento de Motores Diesel · CEFR A1.1–A1.2 · Page ", font: "Calibri", size: 18, color: "666666" }),
          new SimpleField("PAGE"),
        ],
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, color: MID_GRAY, size: 4 } },
        spacing: { before: 60, after: 0 },
      }),
    ],
  });
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════

const BASE = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-15";
const OUT  = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-15/pm-3-2-build-out-completo.docx";
const OUT2 = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-15/pm-3-2-build-out-completo.docx";

// Load all 8 JSON files
const sessions = [];
for (let i = 1; i <= 8; i++) {
  const raw = fs.readFileSync(`${BASE}/pm-3-2-s${i}.json`, "utf8");
  sessions.push(JSON.parse(raw));
}

console.log("Loaded all 8 JSON files.");

// Build all content
const allChildren = [];

// Cover
allChildren.push(...makeCoverPage());

// TOC
allChildren.push(...makeTOC());

// Sessions
sessions.forEach((d, idx) => {
  const sNum = d.session || (idx + 1);
  console.log(`Rendering session ${sNum}: ${d.session_name || (d.header && d.header.nombre_sesion) || ""}...`);
  if (sNum <= 3) {
    allChildren.push(...renderSessionOldFormat(d));
  } else {
    allChildren.push(...renderSessionNewFormat(d));
  }
});

console.log(`Total paragraphs/elements: ${allChildren.length}`);

// Define styles
const styles = {
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
      run: { font: "Arial", size: 32, bold: true, color: NAVY },
      paragraph: {
        spacing: { before: 400, after: 200 },
        outlineLevel: 0,
      },
    },
    {
      id: "Heading2",
      name: "Heading 2",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: "Arial", size: 26, bold: true, color: NAVY },
      paragraph: {
        spacing: { before: 240, after: 120 },
        outlineLevel: 1,
      },
    },
    {
      id: "Heading3",
      name: "Heading 3",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: "Arial", size: 22, bold: true },
      paragraph: {
        spacing: { before: 160, after: 80 },
        outlineLevel: 2,
      },
    },
  ],
};

// Build document
const doc = new Document({
  styles,
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      headers: { default: makeHeader() },
      footers: { default: makeFooter() },
      children: allChildren,
    },
  ],
});

console.log("Building DOCX...");

Packer.toBuffer(doc)
  .then(buf => {
    fs.writeFileSync(OUT, buf);
    if (typeof OUT2 !== "undefined") fs.writeFileSync(OUT2, buf);
    const kb = Math.round(buf.length / 1024);
    console.log(`DONE: ${kb} KB written to ${OUT}`);
  })
  .catch(err => {
    console.error("ERROR:", err.message);
    process.exit(1);
  });
