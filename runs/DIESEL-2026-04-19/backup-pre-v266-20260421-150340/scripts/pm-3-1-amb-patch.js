"use strict";
const fs = require("fs");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  Header, Footer, PageNumber,
} = docx;

const JSON_PATH  = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-1.json";
const JSON_VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-1.json";
const DOCX_PATH  = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-1-playbook-outline.docx";
const DOCX_VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-1-playbook-outline.docx";

// ─── AMBIENTES POR SESIÓN ─────────────────────────────────────────────────────
const AMBIENTES = {
  1: "Aula de formación con proyector o pantalla, pizarra, espacio en pared para Safety Wall (mural de post-its) y mesas configurables para trabajo en grupos de 3-4.",
  2: "Aula de formación con proyector, espacio permanente en pared para Word Wall (20 términos Toolbelt), mesas en islas o U para trabajo en parejas.",
  3: "Aula de formación con proyector y pizarra tricolor (marcadores rojo, azul, verde), espacio físico para 3 estaciones de gramática rotativas.",
  4: "Aula de formación con sistema de audio reproducible (parlantes o audífonos colectivos) y espacio frontal despejado para presentaciones orales individuales o en parejas.",
  5: "Aula de formación con espacio central despejado para simulaciones de role-play en grupos de 3, Word Wall visible como referencia permanente.",
  6: "Aula de formación configurada para evaluación individual: silencio garantizado, escritorios individuales, sistema de audio para sección Listening del Cuestionario Consolidado.",
  7: "Aula de formación con área de presentación designada (frente de clase) para ensayos por equipos de 3; espacio de observación para equipo par. Opcional: acceso a taller real o bay simulado.",
  8: "Aula de formación configurada como taller simulado: tres bays designados (Bay 1/2/3), área de audiencia para equipos observadores, espacio para fotografías de cierre y redistributición de Gap Cards S1.",
};

// ─── PATCH JSON ───────────────────────────────────────────────────────────────
const d = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

d.sessions_detail.forEach(s => {
  if (!s.logistics_box) s.logistics_box = {};
  s.logistics_box.ambiente = AMBIENTES[s.session] || "Aula de formación.";
});

// Add top-level summary
d.ambientes_resumen = {
  nota: "Todas las sesiones se desarrollan en aula de formación presencial. El ambiente físico se adapta por sesión según la actividad dominante: clase magistral inductiva (S1-S2), estaciones rotativas (S3), evaluación oral (S4, S7-S8), simulación (S5), evaluación escrita (S6).",
  tipo_ambiente: "Aula convencional con adaptaciones por sesión",
  recursos_fijos: [
    "Proyector o pantalla de proyección",
    "Pizarra o tablero blanco con marcadores de colores",
    "Conexión eléctrica para dispositivos del instructor",
    "Espacio en pared para Word Wall permanente (S2–S8)",
    "Mesas reconfigurables para trabajo individual, parejas y grupos",
  ],
  recursos_variables_por_sesion: "Ver campo 'ambiente' en cada logistics_box de sessions_detail",
};

const jsonOut = JSON.stringify(d, null, 2);
fs.writeFileSync(JSON_PATH, jsonOut);
fs.writeFileSync(JSON_VAULT, jsonOut);
console.log("✓ JSON patched con ambientes —", jsonOut.length, "bytes");

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const NAVY = "1C2B3C"; const WHITE = "FFFFFF"; const LGRAY = "F2F2F2";
const MGRAY = "D9D9D9"; const ORANGE = "F59316";
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
function spacer() { return new Paragraph({ children: [new TextRun("")], spacing: { before: 140, after: 0 } }); }

function hCell(text, fill, w) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })],
    shading: { type: ShadingType.CLEAR, fill: fill || NAVY },
    width: { size: w, type: WidthType.PCT },
    verticalAlign: VerticalAlign.CENTER,
  });
}

function dCell(text, bg, w, italic) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, size: pt(10), font: "Calibri", italics: italic||false })] })],
    shading: { type: ShadingType.CLEAR, fill: bg || "FFFFFF" },
    width: { size: w, type: WidthType.PCT },
  });
}

function materialesCell(items, bg) {
  return new TableCell({
    children: items.map(item => new Paragraph({
      children: [
        new TextRun({ text: "· ", bold: true, size: pt(10), font: "Calibri", color: NAVY }),
        new TextRun({ text: item, size: pt(10), font: "Calibri" }),
      ],
      spacing: { before: 20, after: 20 },
    })),
    shading: { type: ShadingType.CLEAR, fill: bg || "FFFFFF" },
    width: { size: 55, type: WidthType.PCT },
  });
}

// ─── BUILD AMBIENTE + MATERIALES TABLE ───────────────────────────────────────
function buildAmbMatTable() {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      hCell("Sesión", NAVY, 11),
      hCell("Ambiente de Aprendizaje", "2E4057", 34),
      hCell("Materiales de Formación", "2E4057", 55),
    ],
  });

  const dataRows = d.sessions_detail.map((s, i) => {
    const bg = i % 2 === 0 ? "FFFFFF" : LGRAY;
    const lb = s.logistics_box || {};
    const mats = lb.materiales || [];

    return new TableRow({
      children: [
        // Session
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: `S${s.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }),
            new Paragraph({ children: [new TextRun({ text: s.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER }),
          ],
          shading: { type: ShadingType.CLEAR, fill: "2E4057" },
          width: { size: 11, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
        }),
        // Ambiente
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: lb.ambiente || "—", size: pt(10), font: "Calibri" })] })],
          shading: { type: ShadingType.CLEAR, fill: bg },
          width: { size: 34, type: WidthType.PCT },
        }),
        // Materiales
        materialesCell(mats.slice(0, 12), bg), // cap at 12 items to avoid overflow
      ],
    });
  });

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
  });
}

// ─── BUILD V+O+C TABLE (reuse from previous) ─────────────────────────────────
const VOC = d.voc_dimensions_table || [];

function vocCell(text, bg, accentColor) {
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

function buildVocTable() {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      hCell("Sesión", NAVY, 11),
      hCell("COGNITIVA — Saber", "1565C0", 29),
      hCell("PROCEDIMENTAL — Hacer", "2E7D32", 29),
      hCell("ACTITUDINAL — Ser", "7B1FA2", 29),
    ],
  });

  const dataRows = VOC.map((row, i) => {
    const bg = i % 2 === 0 ? "FFFFFF" : LGRAY;
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: `S${row.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }),
            new Paragraph({ children: [new TextRun({ text: row.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER }),
          ],
          shading: { type: ShadingType.CLEAR, fill: "2E4057" },
          width: { size: 11, type: WidthType.PCT },
          verticalAlign: VerticalAlign.CENTER,
        }),
        vocCell(row.cognitiva, bg, "1565C0"),
        vocCell(row.procedimental, bg, "2E7D32"),
        vocCell(row.actitudinal, bg, "7B1FA2"),
      ],
    });
  });

  return new Table({ rows: [headerRow, ...dataRows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } });
}

// ─── OVERVIEW TABLE ───────────────────────────────────────────────────────────
function buildOverviewTable() {
  const overview = d.overview_table;
  const headerRow = new TableRow({
    tableHeader: true,
    children: ["Sesión", "Foco pedagógico", "Habilidades", "Trabajo autónomo"].map((h, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })],
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      width: { size: [13, 57, 13, 17][i], type: WidthType.PCT },
    })),
  });
  const dataRows = overview.map((s, i) => new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({ children: [new TextRun({ text: `S${s.session}`, bold: true, size: pt(11), font: "Arial", color: WHITE })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: s.nombre, size: pt(9), font: "Calibri", color: WHITE, italics: true })], alignment: AlignmentType.CENTER }),
        ],
        shading: { type: ShadingType.CLEAR, fill: "2E4057" },
        width: { size: 13, type: WidthType.PCT },
        verticalAlign: VerticalAlign.CENTER,
      }),
      dCell(s.foco, i%2===0?"FFFFFF":LGRAY, 57),
      dCell(s.habilidades, i%2===0?"FFFFFF":LGRAY, 13),
      dCell(s.autonomo || "—", i%2===0?"FFFFFF":LGRAY, 17, true),
    ],
  }));
  return new Table({ rows: [headerRow, ...dataRows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } });
}

// ─── EVIDENCIAS TABLE ─────────────────────────────────────────────────────────
function buildEvidenciasTable() {
  const rows = [
    ["S2", "E1 — Reading",     "Cuestionario No 1 (5 ítems MC)",              "Conocimiento", "5"],
    ["S3", "E2 — Writing",     "Lista de Verificación No 2 (10 criterios)",   "Producto",     "5"],
    ["S4", "E3 — Listening",   "Cuestionario No 3 (5 ítems MC)",              "Desempeño",    "5"],
    ["S4", "E4 — Speaking",    "Escala de Estimación No 4 (5 criterios)",     "Desempeño",    "5"],
    ["S5", "E5 — Funciones",   "Escala de Estimación No 5 (5 criterios)",     "Desempeño",    "5"],
    ["S6", "E6 — Consolidado", "Cuestionario Consolidado No 6 (25 ítems)",    "Conocimiento", "25"],
    ["S8", "E7 — Final Mission","Escala de Estimación No 6 (5 criterios)",    "Desempeño",    "10"],
    ["",   "TOTAL",            "",                                            "",             "60"],
  ];
  const widths = [8, 16, 47, 17, 12];
  const header = new TableRow({ tableHeader: true, children: ["Ses.", "Evidencia", "Instrumento", "Tipo", "Pts"].map((h, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: widths[i], type: WidthType.PCT } })) });
  const dataRows = rows.map((r, i) => new TableRow({ children: r.map((cell, j) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: cell, size: pt(10), font: "Calibri", bold: r[1]==="TOTAL" })] })], shading: { type: ShadingType.CLEAR, fill: r[1]==="TOTAL" ? "E8EAF0" : (i%2===0?"FFFFFF":LGRAY) }, width: { size: widths[j], type: WidthType.PCT } })) }));
  return new Table({ rows: [header, ...dataRows], width: { size: 100, type: WidthType.PCT }, margins: { top: 60, bottom: 60, left: 80, right: 80 } });
}

// ─── ASSEMBLE & GENERATE DOCX ────────────────────────────────────────────────
async function main() {
  const children = [
    navyPar("PM-3.1 — PLAYBOOK OUTLINE  |  Guía 1.1: The Workshop Specialist", 13),
    navyPar("Mantenimiento de los Motores Diesel  |  CEFR A1.1  |  8 sesiones  |  60h", 11),
    spacer(),
    body("Run: DIESEL-2026-04-19  ·  Rev: 2026-04-18 (v1.2 — Ambientes + Materiales + V+O+C)"),
    body("Documento de uso exclusivo del instructor. No distribuir a aprendices."),
    spacer(),

    // ── 1. ARCO DE SESIONES ──
    navyPar("1. ARCO DE SESIONES — OVERVIEW", 12),
    body("Leyenda: R = Reading  V = Vocabulary  G = Grammar  L = Listening  S = Speaking  W = Writing  ● foco  ○ soporte"),
    spacer(),
    buildOverviewTable(),
    spacer(),

    // ── 2. AMBIENTES + MATERIALES ──
    navyPar("2. AMBIENTES DE APRENDIZAJE Y MATERIALES DE FORMACIÓN POR SESIÓN", 12),
    body("Ambiente de aprendizaje: espacio físico exacto donde ocurre la formación, con sus condiciones específicas por sesión."),
    body("Materiales de formación: recursos didácticos, impresos, consumibles, tecnología y herramientas necesarios para que el aprendiz ejecute la tarea."),
    spacer(),
    buildAmbMatTable(),
    spacer(),
    body("Recursos fijos presentes en todas las sesiones: proyector o pantalla · pizarra con marcadores · conexión eléctrica · mesas reconfigurables · Word Wall en pared (S2–S8).", false),
    spacer(),

    // ── 3. DIMENSIONES V+O+C ──
    navyPar("3. TABLA DE DIMENSIONES V+O+C — REFERENCIA PEDAGÓGICA POR SESIÓN", 12),
    body("Fórmula: Verbo (infinitivo) + Objeto + Condición. El verbo aparece resaltado en el color de la dimensión: azul = Cognitiva, verde = Procedimental, morado = Actitudinal."),
    spacer(),
    buildVocTable(),
    spacer(),

    // ── 4. EVIDENCIAS ──
    navyPar("4. MAPA DE EVIDENCIAS Y EVALUACIÓN", 12),
    buildEvidenciasTable(),
    spacer(),

    // ── 5. NOTAS ──
    navyPar("5. NOTAS PEDAGÓGICAS", 12),
    ...(d.notes || []).map(n => body("· " + n)),
    spacer(),

    body("PM-3.1 v1.2  |  DIESEL-2026-04-19  |  LG Factory Engine v2.0  |  Instructor only"),
  ];

  const doc = new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "PM-3.1 Playbook Outline  |  The Workshop Specialist  |  DIESEL-2026-04-19  |  INSTRUCTOR ONLY", size: pt(9), font: "Calibri", color: "888888" })], alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } } })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ children: [new TextRun({ text: "SENA  ·  Mantenimiento Motores Diesel  ·  Guía 1.1  ·  v1.2  ·  Pág. ", size: pt(9), font: "Calibri", color: "888888" }), new TextRun({ children: [PageNumber.CURRENT], size: pt(9), font: "Calibri", color: "888888" })], alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } } })] }) },
      children,
    }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(DOCX_PATH, buf);
  fs.writeFileSync(DOCX_VAULT, buf);
  console.log(`✓ Docx escrito — ${buf.length} bytes → vault`);
}

main().catch(e => { console.error(e); process.exit(1); });
