"use strict";
// Assembler — PM-3.6 SENA Learning Guide — Sections 4-7 + Document output
const fs = require("fs");
const docx = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, ShadingType, WidthType, VerticalAlign,
  Header, Footer, PageNumber, NumberFormat, convertInchesToTwip,
} = docx;

const { sec1, sec2, sec31 } = require("./pm-3-6-new-gen.js");
const { sec32, sec33, sec34 } = require("./pm-3-6-new-gen2.js");

const NAVY = "1C2B3C"; const ORANGE = "F59316"; const WHITE = "FFFFFF";
const LGRAY = "F2F2F2"; const MGRAY = "D9D9D9";
const pt = n => n * 2;

function navyHeader(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(13), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 240, after: 120 }, indent: { left: 120, right: 120 },
  });
}
function body(text, bold) {
  return new Paragraph({
    children: [new TextRun({ text, bold: bold||false, size: pt(11), font: "Calibri" })],
    spacing: { before: 60, after: 60 }, indent: { left: 120, right: 120 },
  });
}
function spacer(before) { return new Paragraph({ children: [new TextRun("")], spacing: { before: before||120, after: 0 } }); }
function simpleTable(headers, rows, colWidths) {
  const w = colWidths || headers.map(() => Math.floor(100 / headers.length));
  return new Table({
    rows: [
      new TableRow({ children: headers.map((h, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: pt(10), font: "Calibri" })], alignment: AlignmentType.CENTER })], shading: { type: ShadingType.CLEAR, fill: NAVY }, width: { size: w[i], type: WidthType.PCT }, verticalAlign: VerticalAlign.CENTER })), tableHeader: true }),
      ...rows.map(row => new TableRow({ children: row.map((cell, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: pt(10), font: "Calibri" })] })], width: { size: w[i], type: WidthType.PCT } })) })),
    ],
    width: { size: 100, type: WidthType.PCT },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
  });
}

// ─── SECTION 4 — EVALUACIÓN ───────────────────────────────────────────────────
function sec4() {
  const out = [];
  out.push(navyHeader("SECCIÓN 4 — EVALUACIÓN"));
  out.push(body("La siguiente tabla resume las evidencias de aprendizaje, los instrumentos de evaluación, el tipo de evidencia, la sesión en que se administra y los puntos asignados."));
  out.push(spacer(80));
  out.push(simpleTable(
    ["Evidencia", "Instrumento", "Tipo", "Sesión", "Puntos"],
    [
      ["E1 — Lectura", "Lista de Chequeo No 1 (5 ítems MC)", "Desempeño", "S2", "5"],
      ["E2 — Escritura", "Lista de Verificación No 2 (10 criterios)", "Producto", "S3", "5"],
      ["E3 — Listening", "Lista de Chequeo No 3 (5 ítems MC)", "Desempeño", "S4", "5"],
      ["E4 — Speaking", "Escala de Estimación No 4 (5 criterios)", "Desempeño", "S4", "5"],
      ["E5 — Funciones", "Escala de Estimación No 5 (5 criterios)", "Desempeño", "S5", "5"],
      ["E6 — Consolidado", "Cuestionario Consolidado No 6 (25 ítems)", "Conocimiento", "S6", "25"],
      ["E7 — Misión Final", "Escala de Estimación No 6 (6 criterios)", "Desempeño", "S8", "5"],
      ["TOTAL", "", "", "", "55"],
    ],
    [18, 38, 16, 12, 16]
  ));
  out.push(spacer(80));
  out.push(body("Bandas de calificación — Cuestionario Consolidado No 6 (E6):", true));
  out.push(simpleTable(
    ["Puntaje", "Banda", "Descripción"],
    [
      ["23–25", "Destacado", "Dominio sólido de A1.1 en las 5 habilidades"],
      ["18–22", "Competente", "A1.1 logrado con áreas de refuerzo menores"],
      ["13–17", "Básico", "A1.1 parcialmente logrado — refuerzo recomendado"],
      ["8–12", "En proceso", "Revisión de habilidades específicas necesaria"],
      ["0–7", "No logrado", "Requiere acompañamiento individualizado"],
    ],
    [18, 22, 60]
  ));
  out.push(spacer(80));
  out.push(body("La evaluación en esta guía está diseñada para ser formativa y diagnóstica. Cada cuestionario y escala tiene una función de aprendizaje: no es un obstáculo sino una oportunidad para saber exactamente qué domina y qué necesita reforzar antes de la siguiente etapa. El desempeño oral (E4, E5, E7) valora la capacidad de comunicarse de forma auténtica en inglés técnico en el contexto real del taller diesel."));
  out.push(spacer(80));
  out.push(body("Documentos de evaluación impresos — para uso del instructor:", true));
  out.push(simpleTable(
    ["Documento", "Código", "Contenido", "Uso"],
    [
      ["Paquete de Instrumentos", "PM-4.1", "6 instrumentos formales: Cuestionarios No 1, 3 — Listas de Verificación No 2 — Escalas de Estimación No 4, 5, 6", "Imprimir y aplicar por sesión. Incluye claves de respuesta para uso exclusivo del instructor."],
      ["Cuestionario Consolidado", "PM-4.2", "Cuestionario Consolidado No 6 — 25 ítems de selección múltiple — 5 secciones — Evidencia 6 — S6", "Imprimir 1 copia por aprendiz + hoja de respuestas. Incluye clave consolidada y diagnóstico por sección."],
    ],
    [22, 10, 42, 26]
  ));
  out.push(spacer(200));
  return out;
}

// ─── SECTION 5 — GLOSARIO ─────────────────────────────────────────────────────
function sec5() {
  const out = [];
  out.push(navyHeader("SECCIÓN 5 — GLOSARIO — TOOLBELT: 20 TÉRMINOS TÉCNICOS"));
  out.push(body("Los siguientes 20 términos constituyen el Toolbelt del Workshop Specialist. Las definiciones están en nivel A1.1 — accesibles, concretas y contextualizadas en el taller diesel."));
  out.push(spacer(80));
  out.push(simpleTable(
    ["#", "Término / Term", "Categoría", "Definición A1.1 (EN/ES)"],
    [
      ["1", "workshop", "ENVIRONMENT", "A place where mechanics repair vehicles. / Lugar donde los mecánicos reparan vehículos."],
      ["2", "service bay", "ENVIRONMENT", "The area in the workshop where one vehicle is repaired at a time. / Área del taller donde se repara un vehículo."],
      ["3", "workbench", "ENVIRONMENT", "The flat table where you organize tools and work on parts. / Mesa plana para organizar herramientas y trabajar piezas."],
      ["4", "toolbox", "ENVIRONMENT", "The box or cabinet that holds all your tools. / Caja o gabinete que guarda todas las herramientas."],
      ["5", "wrench", "TOOLS", "A hand tool used to turn bolts and nuts. / Herramienta manual para girar pernos y tuercas."],
      ["6", "ratchet", "TOOLS", "A tool that turns in one direction, fast in tight spaces. / Herramienta que gira en un sentido; eficiente en espacios reducidos."],
      ["7", "socket", "TOOLS", "A piece that attaches to the ratchet to fit different bolt sizes. / Pieza que se acopla al ratchet para distintos tamaños de pernos."],
      ["8", "torque wrench", "TOOLS", "A wrench that applies the exact force to a bolt — no more, no less. / Llave que aplica la fuerza exacta a un perno."],
      ["9", "floor jack", "TOOLS", "A device used to lift a vehicle safely for inspection or repair. / Dispositivo para levantar un vehículo de forma segura."],
      ["10", "PPE", "SAFETY", "Personal Protective Equipment — gloves, goggles, boots, helmet. / Equipo de Protección Personal."],
      ["11", "safety goggles", "SAFETY", "Protective eyewear to shield eyes from sparks, chemicals, and debris. / Gafas protectoras contra chispas, químicos y partículas."],
      ["12", "gloves", "SAFETY", "Protective hand coverings worn during mechanical work. / Guantes de protección usados durante el trabajo mecánico."],
      ["13", "hazard", "SAFETY", "A condition in the workshop that can cause injury or damage. / Condición del taller que puede causar daños o lesiones."],
      ["14", "spill", "SAFETY", "Liquid (oil, coolant) on the floor — a slip hazard. / Líquido (aceite, refrigerante) en el piso — riesgo de caída."],
      ["15", "fire extinguisher", "SAFETY", "A device used to put out fires — must always be accessible. / Dispositivo para extinguir incendios — siempre debe ser accesible."],
      ["16", "preventive maintenance", "MAINTENANCE", "Regular service performed BEFORE a problem occurs. / Servicio regular realizado ANTES de que ocurra un problema."],
      ["17", "corrective maintenance", "MAINTENANCE", "Repair performed AFTER a problem or failure has occurred. / Reparación realizada DESPUÉS de que ocurre un problema."],
      ["18", "work order", "DOCUMENTS", "A document describing what repair to do, on which vehicle, and how. / Documento que describe qué reparar, en qué vehículo y cómo."],
      ["19", "checklist", "DOCUMENTS", "A list of items to verify — each is checked one by one. / Lista de ítems a verificar uno por uno."],
      ["20", "calibration", "DOCUMENTS", "The process of checking that a measuring tool gives accurate readings. / Proceso de verificar que una herramienta de medición sea precisa."],
    ],
    [6, 20, 16, 58]
  ));
  out.push(spacer(200));
  return out;
}

// ─── SECTION 6 — BIBLIOGRAFÍA ──────────────────────────────────────────────────
function sec6() {
  const out = [];
  out.push(navyHeader("SECCIÓN 6 — BIBLIOGRAFÍA"));
  const refs = [
    "1. Isuzu Technical Service. (2022). Diesel engine maintenance manual: 4JJ1 series. Isuzu Motors Ltd.",
    "2. Motor Age Training. (2023). Auto shop safety: Essential practices for diesel technicians. Motor Age.",
    "3. SENA. (2023). GFPI-F-135: Formato guía de aprendizaje. Sistema Nacional de Aprendizaje.",
    "4. Council of Europe. (2020). Common European Framework of Reference for Languages (CEFR): Learning, teaching, assessment. Council of Europe Publishing.",
    "5. Nation, I. S. P. (2001). Learning vocabulary in another language. Cambridge University Press.",
    "6. Willis, J. (1996). A framework for task-based learning. Longman.",
    "7. Marzano, R. J. (2004). Building background knowledge for academic achievement. ASCD.",
  ];
  refs.forEach(r => out.push(body(r)));
  out.push(spacer(200));
  return out;
}

// ─── SECTION 7 — CONTROL DEL DOCUMENTO ───────────────────────────────────────
function sec7() {
  const out = [];
  out.push(navyHeader("SECCIÓN 7 — CONTROL DEL DOCUMENTO"));
  out.push(simpleTable(
    ["Versión", "Fecha", "Elaboró", "Descripción de cambios"],
    [
      ["1.0", "2026-04-15", "LG Factory Engine v2.0 / DIESEL-2026-04-19", "Versión inicial — estructura completa 8 sesiones, 28 actividades, 7 evidencias."],
      ["1.1", "2026-04-17", "LG Factory Engine v2.0 / rev SENA-SELF-CONTAINED", "Revisión mayor: instrucciones en estilo institucional SENA; todo el contenido embebido en la guía; bilingüe EN/ES en dimensiones V+O+C; eliminación de referencias a worksheets externos."],
      ["1.2", "2026-04-18", "LG Factory Engine v2.0 / rev PM-4 INTEGRATION", "Sección 4 actualizada: referencias a PM-4.1 (Paquete de Instrumentos) y PM-4.2 (Cuestionario Consolidado No 6) como documentos impresos acompañantes."],
    ],
    [10, 14, 30, 46]
  ));
  out.push(spacer(200));
  return out;
}

// ─── ASSEMBLE + GENERATE ─────────────────────────────────────────────────────
async function main() {
  console.log("Building PM-3.6 SENA Learning Guide...");

  const sections = [
    ...sec1(),
    ...sec2(),
    ...sec31(),
    ...sec32(),
    ...sec33(),
    ...sec34(),
    ...sec4(),
    ...sec5(),
    ...sec6(),
    ...sec7(),
  ];

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
              new TextRun({ text: "GFPI-F-135  |  Guía de Aprendizaje No 1.1  |  The Workshop Specialist", size: pt(9), font: "Calibri", color: "666666" }),
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
              new TextRun({ text: "SENA  ·  Mantenimiento de Motores Diesel  ·  Versión 1.1  ·  Página ", size: pt(9), font: "Calibri", color: "666666" }),
              new TextRun({ children: [PageNumber.CURRENT], size: pt(9), font: "Calibri", color: "666666" }),
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
          run: { font: "Calibri", size: pt(11) },
          paragraph: { spacing: { line: 276 } },
        },
      },
    },
  });

  const buf = await Packer.toBuffer(doc);

  const OUT1 = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-6-learning-guide.docx";
  const OUT2 = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-6-learning-guide.docx";

  fs.writeFileSync(OUT1, buf);
  fs.writeFileSync(OUT2, buf);

  console.log(`✓ Written ${buf.length} bytes`);
  console.log(`  → ${OUT1}`);
  console.log(`  → ${OUT2}`);
}

main().catch(e => { console.error(e); process.exit(1); });
