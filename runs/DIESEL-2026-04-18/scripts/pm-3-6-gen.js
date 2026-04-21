"use strict";
var _a = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
var Document = _a.Document, Packer = _a.Packer, Paragraph = _a.Paragraph, TextRun = _a.TextRun,
    Table = _a.Table, TableRow = _a.TableRow, TableCell = _a.TableCell,
    Header = _a.Header, Footer = _a.Footer, AlignmentType = _a.AlignmentType,
    HeadingLevel = _a.HeadingLevel, LevelFormat = _a.LevelFormat, BorderStyle = _a.BorderStyle,
    WidthType = _a.WidthType, ShadingType = _a.ShadingType, VerticalAlign = _a.VerticalAlign,
    PageBreak = _a.PageBreak, PageNumber = _a.PageNumber;
var fs = require("fs");

// ── Constants ─────────────────────────────────────────────────────────────────
var NAVY   = "1C2B3C";
var ORANGE = "F59316";
var LGREY  = "F3F5F7";
var WHITE  = "FFFFFF";
var BLACK  = "000000";
var DKGREY = "5A6A7A";
var CONTENT_WIDTH = 9360;

// ── Data ──────────────────────────────────────────────────────────────────────
var DATA = JSON.parse(fs.readFileSync(
  "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-18/pm-3-6.json",
  "utf8"
));

// ── Helpers ───────────────────────────────────────────────────────────────────
function border(color, size) {
  return { style: BorderStyle.SINGLE, size: size || 4, color: color || "CCCCCC" };
}
function allBorders(color, size) {
  return { top: border(color, size), bottom: border(color, size), left: border(color, size), right: border(color, size) };
}
var CM = { top: 80, bottom: 80, left: 120, right: 120 };
function shade(fill) { return { fill: fill, type: ShadingType.CLEAR }; }

function navyHeaderRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map(function(lbl, i) {
      return new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        borders: allBorders(NAVY, 6), shading: shade(NAVY), margins: CM, verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: lbl, bold: true, size: 20, color: WHITE, font: "Arial" })] })]
      });
    })
  });
}

function dataRow(cells, widths, opts) {
  var shadeFill = (opts && opts.shade) ? opts.shade : "FFFFFF";
  var rowBold = (opts && opts.bold) ? true : false;
  return new TableRow({
    children: cells.map(function(txt, i) {
      return new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        borders: allBorders("CCCCCC", 4), shading: shade(shadeFill), margins: CM,
        children: [new Paragraph({ children: [new TextRun({ text: String(txt), size: 20, font: "Calibri", bold: rowBold, color: BLACK })] })]
      });
    })
  });
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: text, bold: true, size: 32, font: "Arial", color: NAVY })]
  });
}
function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text: text, bold: true, size: 26, font: "Arial", color: NAVY })]
  });
}
function subSubHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text: text, bold: true, size: 22, font: "Arial", color: NAVY })]
  });
}
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }
function spacer(pts) {
  pts = pts || 80;
  return new Paragraph({ spacing: { before: pts, after: pts }, children: [new TextRun("")] });
}

// ── Dimension label block ─────────────────────────────────────────────────────
function dimensionBlock(dim) {
  var items = [];
  // Label line
  items.push(new Paragraph({
    spacing: { before: 80, after: 20 },
    indent: { left: 160 },
    children: [new TextRun({ text: "[" + dim.label + "]", bold: true, size: 20, font: "Calibri", color: ORANGE })]
  }));
  // EN instruction
  items.push(new Paragraph({
    spacing: { before: 20, after: 20 },
    shading: shade(LGREY),
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: ORANGE, space: 8 } },
    indent: { left: 200 },
    children: [
      new TextRun({ text: "EN: ", bold: true, size: 20, font: "Calibri", color: NAVY }),
      new TextRun({ text: dim.en || dim.instruccion || "", size: 20, font: "Calibri", color: BLACK })
    ]
  }));
  // ES instruction
  items.push(new Paragraph({
    spacing: { before: 0, after: 60 },
    shading: shade(LGREY),
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: ORANGE, space: 8 } },
    indent: { left: 200 },
    children: [
      new TextRun({ text: "ES: ", bold: true, size: 20, font: "Calibri", color: DKGREY }),
      new TextRun({ text: dim.es || dim.instruccion || "", size: 20, font: "Calibri", color: DKGREY })
    ]
  }));
  return items;
}

// ── Step-by-step block ────────────────────────────────────────────────────────
function stepsBlock(pasos) {
  if (!pasos || pasos.length === 0) return [];
  var items = [];
  items.push(new Paragraph({
    spacing: { before: 80, after: 20 },
    indent: { left: 160 },
    children: [new TextRun({ text: "Paso a paso / Step-by-step:", bold: true, size: 20, font: "Calibri", color: NAVY })]
  }));
  pasos.forEach(function(paso, idx) {
    var num = String(idx + 1) + ".";
    // EN step
    items.push(new Paragraph({
      spacing: { before: 30, after: 10 },
      indent: { left: 360, hanging: 200 },
      children: [
        new TextRun({ text: num + " EN: ", bold: true, size: 20, font: "Calibri", color: NAVY }),
        new TextRun({ text: typeof paso === "string" ? paso : (paso.en || paso), size: 20, font: "Calibri", color: BLACK })
      ]
    }));
    // ES step
    if (paso.es) {
      items.push(new Paragraph({
        spacing: { before: 0, after: 30 },
        indent: { left: 560 },
        children: [
          new TextRun({ text: "ES: ", bold: true, size: 19, font: "Calibri", color: DKGREY }),
          new TextRun({ text: paso.es, size: 19, font: "Calibri", color: DKGREY, italics: true })
        ]
      }));
    }
  });
  return items;
}

// ── Entregable box ─────────────────────────────────────────────────────────────
function entregableBox(ent) {
  if (!ent) return [];
  var W = [2400, 6960];
  var rows = [
    navyHeaderRow(["Componente", "Especificación"], W),
    dataRow(["Producto a entregar", ent.producto || ""], W, { shade: "FFFBF5" }),
    dataRow(["Formato", ent.formato || ""], W, { shade: "FFFBF5" }),
    dataRow(["Criterio mínimo", ent.criterio_minimo || ""], W, { shade: "FFFBF5" })
  ];
  return [
    spacer(40),
    new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: W, rows: rows })
  ];
}

// ── Evidence box ──────────────────────────────────────────────────────────────
function evidenceBox(ev) {
  if (!ev) return [];
  return [
    spacer(40),
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: [CONTENT_WIDTH],
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        borders: allBorders(ORANGE, 8), shading: shade("FFF8EE"), margins: CM,
        children: [new Paragraph({ children: [
          new TextRun({ text: "EVIDENCIA  ", bold: true, size: 20, font: "Arial", color: ORANGE }),
          new TextRun({ text: ev.descripcion, size: 20, font: "Calibri", color: BLACK })
        ] })]
      })] })]
    })
  ];
}

// ── Build one activity ────────────────────────────────────────────────────────
function buildActivity(act) {
  var items = [];
  var titleEN = act.nombre_en || "";
  var titleES = act.nombre_es || act.nombre || "";
  var heading = act.id + " — " + titleES + (titleEN ? " / " + titleEN : "");
  items.push(spacer(60));
  items.push(subSubHeading(heading));
  // Session + materials line
  var matLine = (act.sesion || "") + (act.materiales && act.materiales.length ? "  ·  Materiales: " + act.materiales.join(" · ") : "");
  if (matLine.trim()) {
    items.push(new Paragraph({
      spacing: { before: 20, after: 40 },
      children: [new TextRun({ text: matLine, size: 18, font: "Calibri", color: DKGREY, italics: true })]
    }));
  }
  // Dimensions
  if (act.dimensiones && act.dimensiones.length) {
    act.dimensiones.forEach(function(dim) {
      dimensionBlock(dim).forEach(function(x) { items.push(x); });
    });
  }
  // Steps
  stepsBlock(act.pasos).forEach(function(x) { items.push(x); });
  // Entregable
  entregableBox(act.entregable).forEach(function(x) { items.push(x); });
  // Evidence
  if (act.evidencia) evidenceBox(act.evidencia).forEach(function(x) { items.push(x); });
  if (act.evidencia_final) evidenceBox(act.evidencia_final).forEach(function(x) { items.push(x); });
  return items;
}

// ── Build one section (3.1/3.2/3.3/3.4) ──────────────────────────────────────
function buildSubSection(secData) {
  var items = [];
  items.push(pageBreak());
  items.push(subHeading(secData.titulo));
  items.push(new Paragraph({
    spacing: { before: 40, after: 20 },
    children: [new TextRun({ text: "Sesiones: ", bold: true, size: 20, font: "Calibri", color: NAVY }),
               new TextRun({ text: secData.sesiones, size: 20, font: "Calibri", color: BLACK })]
  }));
  items.push(new Paragraph({
    spacing: { before: 20, after: 80 },
    children: [new TextRun({ text: secData.descripcion, size: 20, font: "Calibri", color: BLACK })]
  }));
  secData.actividades.forEach(function(act) {
    buildActivity(act).forEach(function(x) { items.push(x); });
  });
  return items;
}

// ── Section 1 ─────────────────────────────────────────────────────────────────
function buildSection1() {
  var id = DATA.section1_identificacion;
  var rows = [
    ["Programa de Formación", id.programa_formacion],
    ["Código del Programa", id.codigo_programa],
    ["Versión del Programa", id.version_programa],
    ["Nombre del Proyecto", id.nombre_proyecto],
    ["Fase del Proyecto", id.fase_proyecto],
    ["Actividad del Proyecto", id.actividad_proyecto],
    ["Competencia", id.competencia],
    ["Resultado de Aprendizaje (RAP)", id.rap_descripcion],
    ["Código RAP", id.rap_code],
    ["Duración de la Guía", id.duracion_guia],
    ["Ambiente de Formación", id.ambiente_formacion],
    ["Material de Formación", id.material_formacion],
    ["Fecha de Elaboración", id.fecha_elaboracion],
    ["Elaboró", id.elaboro]
  ];
  var W = [3000, 6360];
  var tableRows = [navyHeaderRow(["Campo / Field", "Información / Information"], W)];
  rows.forEach(function(r) { tableRows.push(dataRow([r[0], r[1]], W, { shade: "F8F9FA" })); });
  return [
    sectionHeading("1. Identificación de la Guía de Aprendizaje"),
    spacer(80),
    new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [
        new TextRun({ text: "GFPI-F-135", bold: true, size: 22, font: "Arial", color: ORANGE }),
        new TextRun({ text: "  |  Guía de Aprendizaje No 1.1  |  The Workshop Specialist", size: 20, font: "Calibri", color: NAVY })
      ]
    }),
    spacer(60),
    new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: W, rows: tableRows })
  ];
}

// ── Section 2 ─────────────────────────────────────────────────────────────────
function buildSection2() {
  return [
    pageBreak(),
    sectionHeading("2. Presentación"),
    spacer(80),
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [new TextRun({ text: DATA.section2_presentacion, size: 22, font: "Calibri", color: BLACK })]
    })
  ];
}

// ── Section 3 ─────────────────────────────────────────────────────────────────
function buildSection3() {
  var sec = DATA.section3_actividades;
  var items = [pageBreak(), sectionHeading("3. Actividades de Aprendizaje")];
  buildSubSection(sec["3_1_reflexion"]).forEach(function(x) { items.push(x); });
  buildSubSection(sec["3_2_contextualizacion"]).forEach(function(x) { items.push(x); });
  buildSubSection(sec["3_3_apropiacion"]).forEach(function(x) { items.push(x); });
  buildSubSection(sec["3_4_transferencia"]).forEach(function(x) { items.push(x); });

  // Misión Final spec block
  var mf = sec["3_4_transferencia"].mision_final_spec;
  if (mf) {
    items.push(spacer(80));
    items.push(new Paragraph({
      spacing: { before: 80, after: 40 },
      children: [new TextRun({ text: mf.titulo || "MISIÓN FINAL — Especificación de la Tarea", bold: true, size: 26, font: "Arial", color: ORANGE })]
    }));
    items.push(new Paragraph({
      spacing: { before: 40, after: 60 },
      children: [new TextRun({ text: mf.escenario, size: 20, font: "Calibri", color: BLACK })]
    }));

    // Roles table
    var rW = [2600, 2600, 4160];
    var rolesRows = [navyHeaderRow(["Personaje", "Título", "Funciones Mínimas"], rW)];
    mf.roles_table.forEach(function(r) {
      rolesRows.push(new TableRow({
        children: [
          new TableCell({ width: { size: rW[0], type: WidthType.DXA }, borders: allBorders("CCCCCC", 4), shading: shade("F8F9FA"), margins: CM,
            children: [new Paragraph({ children: [new TextRun({ text: r.personaje, bold: true, size: 20, font: "Calibri", color: BLACK })] })] }),
          new TableCell({ width: { size: rW[1], type: WidthType.DXA }, borders: allBorders("CCCCCC", 4), shading: shade("F8F9FA"), margins: CM,
            children: [new Paragraph({ children: [new TextRun({ text: r.titulo, size: 20, font: "Calibri", color: BLACK })] })] }),
          new TableCell({ width: { size: rW[2], type: WidthType.DXA }, borders: allBorders("CCCCCC", 4), shading: shade("F8F9FA"), margins: CM,
            children: r.funciones_minimas.map(function(f) {
              return new Paragraph({ spacing: { before: 30, after: 30 }, children: [new TextRun({ text: f, size: 20, font: "Calibri", color: BLACK })] });
            }) })
        ]
      }));
    });
    items.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: rW, rows: rolesRows }));

    // Task requirements
    items.push(spacer(60));
    items.push(new Paragraph({ spacing: { before: 60, after: 40 },
      children: [new TextRun({ text: "Requisitos de la Tarea:", bold: true, size: 22, font: "Arial", color: NAVY })] }));
    mf.task_requirements.forEach(function(req) {
      items.push(new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { before: 40, after: 40 },
        children: [new TextRun({ text: req, size: 20, font: "Calibri", color: BLACK })]
      }));
    });

    items.push(spacer(40));
    items.push(new Paragraph({ spacing: { before: 40, after: 20 },
      children: [
        new TextRun({ text: "Nota sobre materiales: ", bold: true, size: 20, font: "Calibri", color: NAVY }),
        new TextRun({ text: mf.nota_materiales || "", size: 20, font: "Calibri", color: BLACK })
      ]
    }));
    items.push(new Paragraph({ spacing: { before: 20, after: 60 },
      children: [
        new TextRun({ text: "Duración: ", bold: true, size: 20, font: "Calibri", color: NAVY }),
        new TextRun({ text: mf.duracion || "3 a 4 minutos por equipo.", size: 20, font: "Calibri", color: BLACK })
      ]
    }));
  }
  return items;
}

// ── Section 4 ─────────────────────────────────────────────────────────────────
function buildSection4() {
  var ev = DATA.section4_evaluacion;
  var items = [pageBreak(), sectionHeading("4. Evaluación"), spacer(80)];
  var eW = [1400, 3400, 1600, 1000, 1160];
  var evidRows = [navyHeaderRow(["Evidencia", "Instrumento", "Tipo", "Sesión", "Pts"], eW)];
  ev.tabla_evidencias.forEach(function(row) {
    evidRows.push(dataRow([row.evidencia, row.instrumento, row.tipo, row.sesion, row.puntos], eW));
  });
  evidRows.push(new TableRow({ children: [
    new TableCell({ width: { size: eW[0]+eW[1]+eW[2]+eW[3], type: WidthType.DXA }, columnSpan: 4,
      borders: allBorders("CCCCCC", 4), shading: shade(LGREY), margins: CM,
      children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "TOTAL", bold: true, size: 20, font: "Arial", color: NAVY })] })] }),
    new TableCell({ width: { size: eW[4], type: WidthType.DXA }, borders: allBorders("CCCCCC", 4), shading: shade(LGREY), margins: CM,
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(ev.total_puntos), bold: true, size: 20, font: "Arial", color: NAVY })] })] })
  ]}));
  items.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: eW, rows: evidRows }));

  items.push(spacer(80));
  items.push(subHeading("Bandas de Desempeño — Cuestionario Consolidado E6"));
  var bands = ev.bandas_cuestionario_e6;
  var bW = [2000, 7360];
  var bandRows = [navyHeaderRow(["Puntaje", "Nivel de Desempeño"], bW)];
  [["23–25", bands["23_25"]], ["18–22", bands["18_22"]], ["13–17", bands["13_17"]], ["8–12", bands["8_12"]], ["0–7", bands["0_7"]]].forEach(function(p) {
    bandRows.push(dataRow([p[0], p[1]], bW));
  });
  items.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: bW, rows: bandRows }));

  items.push(spacer(80));
  items.push(subHeading("Filosofía de Evaluación"));
  items.push(new Paragraph({ spacing: { before: 60, after: 60 },
    children: [new TextRun({ text: ev.filosofia_evaluacion, size: 22, font: "Calibri", color: BLACK })] }));
  return items;
}

// ── Section 5 ─────────────────────────────────────────────────────────────────
function buildSection5() {
  var terms = DATA.section5_glosario.terminos;
  var gW = [2200, 5360, 1800];
  var gRows = [navyHeaderRow(["Término", "Definición (EN)", "Categoría"], gW)];
  terms.forEach(function(t, i) {
    gRows.push(dataRow([t.termino, t.definicion_en, t.categoria], gW, { shade: i % 2 === 0 ? "FFFFFF" : LGREY }));
  });
  return [pageBreak(), sectionHeading("5. Glosario Técnico"), spacer(80),
    new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: gW, rows: gRows })];
}

// ── Section 6 ─────────────────────────────────────────────────────────────────
function buildSection6() {
  var items = [pageBreak(), sectionHeading("6. Bibliografía"), spacer(80)];
  DATA.section6_bibliografia.forEach(function(entry) {
    items.push(new Paragraph({
      numbering: { reference: "numbers", level: 0 },
      spacing: { before: 60, after: 60 },
      children: [new TextRun({ text: entry.ref, size: 20, font: "Calibri", color: BLACK })]
    }));
  });
  return items;
}

// ── Section 7 ─────────────────────────────────────────────────────────────────
function buildSection7() {
  var control = DATA.section7_control;
  var cW = [1200, 1800, 2760, 3600];
  var cRows = [navyHeaderRow(["Versión", "Fecha", "Autor", "Descripción"], cW)];
  control.forEach(function(row) { cRows.push(dataRow([row.version, row.fecha, row.autor, row.descripcion], cW)); });
  return [pageBreak(), sectionHeading("7. Control del Documento"), spacer(80),
    new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: cW, rows: cRows })];
}

// ── Header & Footer ───────────────────────────────────────────────────────────
function buildHeader() {
  return new Header({ children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 4 } },
    children: [new TextRun({ text: "GFPI-F-135  |  Gu\xEDa de Aprendizaje No 1.1  |  The Workshop Specialist", size: 18, font: "Calibri", color: NAVY })]
  })] });
}
function buildFooter() {
  return new Footer({ children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 4 } },
    children: [
      new TextRun({ text: "SENA  \xB7  Mantenimiento de Motores Diesel  \xB7  Versi\xF3n 1.0  \xB7  P\xE1gina ", size: 18, font: "Calibri", color: NAVY }),
      new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Calibri", color: NAVY })
    ]
  })] });
}

// ── Assemble ──────────────────────────────────────────────────────────────────
var allChildren = [];
buildSection1().forEach(function(x) { allChildren.push(x); });
buildSection2().forEach(function(x) { allChildren.push(x); });
buildSection3().forEach(function(x) { allChildren.push(x); });
buildSection4().forEach(function(x) { allChildren.push(x); });
buildSection5().forEach(function(x) { allChildren.push(x); });
buildSection6().forEach(function(x) { allChildren.push(x); });
buildSection7().forEach(function(x) { allChildren.push(x); });

var doc = new Document({
  numbering: { config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
  ]},
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } }
    ]
  },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: buildHeader() },
    footers: { default: buildFooter() },
    children: allChildren
  }]
});

var OUT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-18/pm-3-6-learning-guide.docx";
Packer.toBuffer(doc).then(function(buf) {
  fs.writeFileSync(OUT, buf);
  console.log("Written:", OUT, "—", buf.length, "bytes");
}).catch(function(err) {
  console.error("ERROR:", err.message);
  process.exit(1);
});
