"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, HeadingLevel, LevelFormat,
} = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");
const fs = require("fs");

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY   = "1C2B3C";
const ORANGE = "F59316";
const WHITE  = "FFFFFF";
const LGRAY  = "F5F5F5";
const MGRAY  = "D9D9D9";
const TEXT   = "1A2535";

// ── DXA helpers ──────────────────────────────────────────────────────────────
const pt = n => n * 2;
const PAGE_W  = 12240;
const MARGIN  = 1080;
const CONTENT = PAGE_W - MARGIN * 2; // 10080

// ── Border helpers ────────────────────────────────────────────────────────────
const thinBorder  = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const noBorder    = { style: BorderStyle.NONE,   size: 0, color: "FFFFFF" };
const allThin     = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const allNone     = { top: noBorder,   bottom: noBorder,   left: noBorder,   right: noBorder   };
const cellPad     = { top: 100, bottom: 100, left: 140, right: 140 };

// ── Paragraph helpers ─────────────────────────────────────────────────────────
function navyBanner(text, size = 14) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: WHITE, size: pt(size), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 240, after: 120 },
    indent: { left: 120, right: 120 },
  });
}

function orangeLine(text, size = 12) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, color: NAVY, size: pt(size), font: "Arial" })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE } },
    spacing: { before: 300, after: 80 },
  });
}

function body(text, bold = false, color = TEXT) {
  return new Paragraph({
    children: [new TextRun({ text, bold, color, size: pt(11), font: "Calibri" })],
    spacing: { before: 60, after: 60 },
  });
}

function bulletItem(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: pt(11), font: "Calibri", color: TEXT })],
    spacing: { before: 40, after: 40 },
  });
}

function spacer(n = 120) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: n, after: 0 } });
}

function hCell(text, fill, w, bold = true, color = WHITE, size = 10) {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold, color, size: pt(size), font: "Calibri" })],
      alignment: AlignmentType.CENTER,
    })],
    shading: { type: ShadingType.CLEAR, fill },
    width: { size: w, type: WidthType.DXA },
    borders: allThin,
    margins: cellPad,
    verticalAlign: VerticalAlign.CENTER,
  });
}

function dCell(text, fill, w, bold = false, color = TEXT, align = AlignmentType.LEFT) {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold, color, size: pt(10), font: "Calibri" })],
      alignment: align,
    })],
    shading: { type: ShadingType.CLEAR, fill: fill || WHITE },
    width: { size: w, type: WidthType.DXA },
    borders: allThin,
    margins: cellPad,
    verticalAlign: VerticalAlign.CENTER,
  });
}

// ── CEFR Levels Table ─────────────────────────────────────────────────────────
function buildCefrLevelsTable() {
  const cols = [1800, 3600, 4680];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { group: "C2", label: "Mastery", desc: "Uso preciso y fluido con competencia casi nativa.", fill: "2D6A4F", groupFill: "1B4332" },
    { group: "C1", label: "Effective Operational Proficiency", desc: "Dominio amplio con vocabulario extenso.", fill: "40916C", groupFill: "1B4332" },
    { group: "B2", label: "Vantage", desc: "Expresión en formas cada vez más abstractas.", fill: "1D6FA4", groupFill: "023E8A" },
    { group: "B1", label: "Threshold", desc: "Capacidad de mantener conversaciones.", fill: "2980B9", groupFill: "023E8A" },
    { group: "A2", label: "Waystage", desc: "Desempeño en un rango creciente de situaciones sociales.", fill: "E67E22", groupFill: "784212" },
    { group: "A1 ★", label: "Breakthrough", desc: "Expresión en lenguaje simple y básico. NIVEL DEL PROGRAMA FPI SENA.", fill: NAVY, groupFill: NAVY },
  ];
  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        hCell("Nivel", NAVY, cols[0]),
        hCell("Descriptor", NAVY, cols[1]),
        hCell("Competencia global", NAVY, cols[2]),
      ],
    }),
    ...rows_data.map((r, i) => new TableRow({
      children: [
        dCell(r.group, r.fill, cols[0], true, WHITE, AlignmentType.CENTER),
        dCell(r.label, i % 2 === 0 ? LGRAY : WHITE, cols[1], r.group.includes("★"), r.group.includes("★") ? NAVY : TEXT),
        dCell(r.desc,  i % 2 === 0 ? LGRAY : WHITE, cols[2], r.group.includes("★"), r.group.includes("★") ? NAVY : TEXT),
      ],
    })),
  ];
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: cols, rows: tableRows });
}

// ── FPI Guide Map Table ───────────────────────────────────────────────────────
function buildGuideMapTable() {
  const cols = [1440, 1440, 7200];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { guide: "G1", cefr: "A1.1", content: "Ej. Motores Diesel: Herramientas, procedimientos básicos, vocabulario de seguridad y PPE." },
    { guide: "G2", cefr: "A1.2", content: "Ej. Motores Diesel: Mantenimiento preventivo — especificaciones, unidades de medida, procedimientos PM." },
    { guide: "G3", cefr: "A1.3", content: "Ej. Motores Diesel: Inspección de fluidos y sistemas eléctricos — lectura de circuitos, reporte de inspección." },
    { guide: "G4", cefr: "A2.0", content: "Ej. Motores Diesel: Chasis y sistemas de seguridad — diagnóstico, evaluación de riesgos, MSDS." },
    { guide: "G5", cefr: "A2.1", content: "Ej. Motores Diesel: Diagnóstico avanzado — scan tool, análisis RCA, causa raíz." },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("Guía", NAVY, cols[0]),
          hCell("CEFR", NAVY, cols[1]),
          hCell("Contenido técnico del programa (definido en PM-1.x)", NAVY, cols[2]),
        ],
      }),
      ...rows_data.map((r, i) => new TableRow({
        children: [
          dCell(r.guide, i % 2 === 0 ? LGRAY : WHITE, cols[0], true, NAVY, AlignmentType.CENTER),
          dCell(r.cefr,  i % 2 === 0 ? LGRAY : WHITE, cols[1], false, TEXT, AlignmentType.CENTER),
          dCell(r.content, i % 2 === 0 ? LGRAY : WHITE, cols[2], false, "888888"),
        ],
      })),
    ],
  });
}

// ── A1 Descriptors Table ──────────────────────────────────────────────────────
function buildDescriptorsTable() {
  const cols = [2520, 7560];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { cat: "RECEPCIÓN\n(Comprensión oral)", desc: "Puede comprender un discurso muy lento y cuidadosamente articulado, con pausas largas para asimilar el significado." },
    { cat: "RECEPCIÓN\n(Comprensión lectora)", desc: "Puede comprender textos muy cortos y simples, frase por frase, identificando nombres familiares, palabras y frases básicas." },
    { cat: "RECEPCIÓN\n(Lectura para orientación)", desc: "Puede reconocer nombres familiares, palabras y frases muy básicas en avisos simples en situaciones cotidianas comunes." },
    { cat: "INTERACCIÓN\n(Oral general)", desc: "Puede interactuar de manera simple con dependencia de repetición, ritmo lento y reformulación. Puede hacer y responder preguntas simples sobre necesidades inmediatas." },
    { cat: "INTERACCIÓN\n(Conversación)", desc: "Puede presentarse y usar expresiones básicas de saludo y despedida. Puede preguntar cómo están las personas y reaccionar ante noticias." },
    { cat: "INTERACCIÓN\n(Cooperación a metas)", desc: "Puede comprender preguntas e instrucciones dirigidas cuidadosamente y despacio, y seguir instrucciones cortas y simples." },
    { cat: "INTERACCIÓN\n(Intercambio de información)", desc: "Puede hacer y responder preguntas simples sobre sí mismo y otras personas, dónde viven, personas que conocen, cosas que tienen." },
    { cat: "INTERACCIÓN\n(Escrita)", desc: "Puede solicitar o transmitir detalles personales por escrito." },
    { cat: "PRODUCCIÓN\n(Oral)", desc: "Puede producir frases simples, principalmente aisladas, sobre personas y lugares. Puede describirse a sí mismo, lo que hace y dónde vive." },
    { cat: "PRODUCCIÓN\n(Escrita)", desc: "Puede escribir frases y oraciones simples aisladas." },
    { cat: "LINGÜÍSTICA\n(Vocabulario)", desc: "Repertorio básico de palabras y frases aisladas relacionadas con situaciones concretas particulares." },
    { cat: "LINGÜÍSTICA\n(Gramática)", desc: "Muestra control limitado de unas pocas estructuras gramaticales simples y patrones de oraciones en un repertorio aprendido." },
    { cat: "LINGÜÍSTICA\n(Fonología)", desc: "La pronunciación de un repertorio muy limitado de palabras y frases aprendidas puede ser comprendida con esfuerzo por hablantes nativos." },
    { cat: "SOCIOLINGÜÍSTICA", desc: "Puede establecer contacto social básico usando las formas más simples de cortesía: saludos, despedidas, presentaciones, please, thank you, sorry." },
    { cat: "PRAGMÁTICA\n(Coherencia)", desc: "Puede unir palabras o grupos de palabras con conectores lineales muy básicos como 'and' o 'then'." },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("Competencia", NAVY, cols[0]),
          hCell("Descriptor A1 — Breakthrough", NAVY, cols[1]),
        ],
      }),
      ...rows_data.map((r, i) => new TableRow({
        children: [
          dCell(r.cat,  i % 2 === 0 ? LGRAY : WHITE, cols[0], true,  NAVY),
          dCell(r.desc, i % 2 === 0 ? LGRAY : WHITE, cols[1], false, TEXT),
        ],
      })),
    ],
  });
}

// ── Grammar Syllabus Table (comprehensive 17-group) ───────────────────────────
function buildGrammarTable() {
  const cols = [5040, 1008, 1008, 1008, 1008, 1008];
  const total = cols.reduce((a, b) => a + b, 0);
  const CI = "F39C12"; // intro color (orange-ish)
  const CC = "1A6B3C"; // consolida color (green)
  const CA = "1A2535"; // aplica color (navy text)
  const CD = "BBBBBB"; // dash color (gray)

  function valCell(val, fill) {
    const color = val === "Intro" ? CI : val === "Consolida" ? CC : val === "Aplica" ? CA : CD;
    const bold  = val === "Intro";
    return new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: val, bold, color, size: pt(9), font: "Calibri" })],
        alignment: AlignmentType.CENTER,
      })],
      shading: { type: ShadingType.CLEAR, fill: fill || WHITE },
      width: { size: 1008, type: WidthType.DXA },
      borders: allThin, margins: { top: 60, bottom: 60, left: 80, right: 80 },
      verticalAlign: VerticalAlign.CENTER,
    });
  }

  function groupHeader(label) {
    return new TableRow({ children: [
      new TableCell({
        columnSpan: 6,
        children: [new Paragraph({
          children: [new TextRun({ text: label, bold: true, color: WHITE, size: pt(10), font: "Arial" })],
        })],
        shading: { type: ShadingType.CLEAR, fill: NAVY },
        width: { size: total, type: WidthType.DXA },
        borders: allThin, margins: cellPad,
      }),
    ]});
  }

  function dataRow(text, g1, g2, g3, g4, g5, i) {
    const fill = i % 2 === 0 ? LGRAY : WHITE;
    return new TableRow({ children: [
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text, size: pt(9), font: "Calibri", color: TEXT })],
        })],
        shading: { type: ShadingType.CLEAR, fill },
        width: { size: cols[0], type: WidthType.DXA },
        borders: allThin, margins: { top: 60, bottom: 60, left: 100, right: 80 },
        verticalAlign: VerticalAlign.CENTER,
      }),
      valCell(g1, fill), valCell(g2, fill), valCell(g3, fill), valCell(g4, fill), valCell(g5, fill),
    ]});
  }

  const A = "Aplica", I = "Intro", C = "Consolida", D = "—";

  const groups = [
    { label: "Grupo 1 — Verbo be", items: [
      ["Formas contratadas: I'm, you're, he's, she's, it's, we're, they're", I,C,A,A,A],
      ["Formas negativas: isn't, aren't, 'm not", I,C,A,A,A],
      ["Preguntas e inversión: Is he...? Are you...?", I,C,A,A,A],
      ["Respuestas cortas: Yes, I am. / No, it isn't.", I,C,A,A,A],
      ["Be con la edad: He's twelve.", I,C,A,A,A],
      ["Formas pasadas: was / were (afirmativo, negativo, pregunta)", D,I,C,A,A],
    ]},
    { label: "Grupo 2 — Pronombres y adjetivos determinativos", items: [
      ["Pronombres sujeto: I, you, he, she, it, we, they", I,C,A,A,A],
      ["Adjetivos posesivos: my, your, his, her, its, our, their", I,C,A,A,A],
      ["Pronombres demostrativos: this, that, these, those", I,C,A,A,A],
      ["Pronombres objeto: me, you, him, her, it, us, them", D,I,C,A,A],
      ["Posesivo 's y s': Alan's tool / the workers' area", I,C,A,A,A],
    ]},
    { label: "Grupo 3 — Sustantivos y artículos", items: [
      ["Plural regular: -s, -es, -ies", I,C,A,A,A],
      ["Plural irregular: feet, teeth, people, equipment", D,I,C,A,A],
      ["Artículos indefinidos: a / an", I,C,A,A,A],
      ["Artículo definido: the / sin artículo", D,I,C,A,A],
      ["Sustantivos incontables (information, equipment, water)", D,D,I,C,A],
      ["Some / any con contables e incontables", D,I,C,A,A],
      ["Uso de mayúsculas en nombres propios", I,C,A,A,A],
    ]},
    { label: "Grupo 4 — Adjetivos", items: [
      ["Posición del adjetivo: antes del sustantivo", I,C,A,A,A],
      ["Adjetivos invariables en plural (big engines, NOT bigs)", I,C,A,A,A],
      ["Comparativos: bigger / more complex", D,D,I,C,A],
      ["Superlativos: the biggest / the most critical", D,D,D,I,C],
    ]},
    { label: "Grupo 5 — Imperativo", items: [
      ["Imperativo afirmativo: base form (Check / Open / Use)", I,C,A,A,A],
      ["Imperativo negativo: Don't + base form", D,I,C,A,A],
    ]},
    { label: "Grupo 6 — Can y verbos modales", items: [
      ["Can / can't: habilidad", D,I,C,A,A],
      ["Can: permiso, solicitud e invitación (Can I...? Can you...?)", D,I,C,A,A],
      ["Must / mustn't: obligación y prohibición técnica", D,D,I,C,A],
      ["Should / shouldn't: recomendación técnica", D,D,I,C,A],
      ["I'd like / We'd like: solicitud formal cortés", D,D,I,C,A],
      ["Could / might: posibilidad y alternativa de diagnóstico", D,D,D,I,C],
      ["Would: condicional y solicitudes (Would you...?)", D,D,D,I,C],
    ]},
    { label: "Grupo 7 — Have / Has y There is / There are", items: [
      ["Have / has: posesión", D,I,C,A,A],
      ["There is / there are: afirmativo", D,I,C,A,A],
      ["There is / there are: negativo y pregunta + some/any", D,I,C,A,A],
    ]},
    { label: "Grupo 8 — Presente simple", items: [
      ["Afirmativo: I/you/we/they + base form", D,I,C,A,A],
      ["3ra persona singular: he/she/it + -s/-es", D,I,C,A,A],
      ["Negativo: don't / doesn't + base form", D,I,C,A,A],
      ["Preguntas: Do/Does...? + respuestas cortas", D,I,C,A,A],
      ["Preguntas Wh- con presente simple", D,I,C,A,A],
      ["Adverbios de frecuencia: always, usually, often, sometimes, never", D,I,C,A,A],
      ["Preposiciones de tiempo: at, in, on", D,I,C,A,A],
    ]},
    { label: "Grupo 9 — Pasado simple", items: [
      ["Verbos regulares: -ed / -d (checked, drained, replaced)", D,D,I,C,A],
      ["Verbos irregulares de alta frecuencia (got, found, had, went)", D,D,I,C,A],
      ["Negativo: didn't + base form", D,D,I,C,A],
      ["Preguntas: Did...? + base form + respuestas cortas", D,D,I,C,A],
      ["Preguntas Wh-: What did you...? Where did it...?", D,D,I,C,A],
      ["Uso de When con el pasado", D,D,I,C,A],
      ["Números ordinales y fechas", D,D,I,C,A],
    ]},
    { label: "Grupo 10 — Presente continuo", items: [
      ["Afirmativo: is/are + -ing (The engine is running)", D,D,I,C,A],
      ["Negativo y preguntas (Is it working? It isn't starting.)", D,D,I,C,A],
      ["Para planes y arreglos futuros + expresión de tiempo", D,D,D,I,C],
      ["Reglas de spelling -ing: sitting, coming, lying", D,D,I,C,A],
      ["Contraste: presente simple vs. presente continuo", D,D,D,I,C],
    ]},
    { label: "Grupo 11 — Presente perfecto", items: [
      ["Afirmativo: have/has + participio pasado", D,D,D,I,C],
      ["Negativo y preguntas (Has it been serviced? No, it hasn't.)", D,D,D,I,C],
      ["Marcadores: already, yet, just, ever, never", D,D,D,D,I],
      ["Contraste: presente perfecto vs. pasado simple", D,D,D,D,I],
    ]},
    { label: "Grupo 12 — Condicionales", items: [
      ["Tipo 1: If + presente simple, will + base form", D,D,D,I,C],
      ["Tipo 2: If + pasado simple, would + base form", D,D,D,D,I],
    ]},
    { label: "Grupo 13 — Voz pasiva", items: [
      ["Presente: is/are + participio pasado", D,D,D,I,C],
      ["Pasado: was/were + participio pasado", D,D,D,D,I],
    ]},
    { label: "Grupo 14 — Preposiciones", items: [
      ["In: lugar (in the workshop, in a tank, in English)", I,C,A,A,A],
      ["At: lugar específico y hora (at the workbench, at 8 o'clock)", D,I,C,A,A],
      ["Next to / near: relación espacial de componentes", D,I,C,A,A],
      ["On: superficies y transporte (on the surface, on a bus)", D,I,C,A,A],
    ]},
    { label: "Grupo 15 — Conectores y puntuación", items: [
      ["Conectores básicos: and, but, or, because", I,C,A,A,A],
      ["Contracciones: reglas y uso del apóstrofe", I,C,A,A,A],
      ["Puntuación básica: . , ? !", I,C,A,A,A],
      ["Sugerencias: Let's..., How about...?", D,D,I,C,A],
      ["Conectores de secuencia: first, then, next, after that, finally", D,D,I,C,A],
    ]},
    { label: "Grupo 16 — Palabras interrogativas (Wh-)", items: [
      ["What, Where, Who, Why, When", D,I,C,A,A],
      ["How + adjetivo/adverbio (How much? How often? How long?)", D,D,I,C,A],
      ["Which / Whose", D,D,D,I,C],
    ]},
    { label: "Grupo 17 — Temas adicionales específicos del sector (PM-1.x)", items: [
      ["[Tema adicional 1 — definido por el diseñador del programa]", D,D,D,D,D],
      ["[Tema adicional 2]", D,D,D,D,D],
      ["[Tema adicional 3]", D,D,D,D,D],
    ]},
  ];

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      hCell("Estructura gramatical", NAVY, cols[0]),
      hCell("G1\nA1.1", NAVY, cols[1], true, WHITE, 9),
      hCell("G2\nA1.2", NAVY, cols[2], true, WHITE, 9),
      hCell("G3\nA1.3", NAVY, cols[3], true, WHITE, 9),
      hCell("G4\nA2.0", NAVY, cols[4], true, WHITE, 9),
      hCell("G5\nA2.1", NAVY, cols[5], true, WHITE, 9),
    ],
  });

  const rows = [headerRow];
  groups.forEach(g => {
    rows.push(groupHeader(g.label));
    g.items.forEach((item, i) => {
      rows.push(dataRow(item[0], item[1], item[2], item[3], item[4], item[5], i));
    });
  });

  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: cols, rows });
}

// ── SUCCESS Factors Table ─────────────────────────────────────────────────────
function buildSuccessTable() {
  const cols = [1440, 8640];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { factor: "S — Simplicity",     desc: "Lenguaje técnico presentado en contexto real, sin sobrecarga de metalenguaje." },
    { factor: "U — Unexpectedness", desc: "Escenarios auténticos de taller que generan impacto y sorpresa." },
    { factor: "C — Concreteness",   desc: "Vocabulario técnico concreto, siempre anclado a objetos y procedimientos reales." },
    { factor: "C — Credibility",    desc: "Textos de manuales reales, especificaciones del fabricante, reportes de diagnóstico." },
    { factor: "E — Emotion",        desc: "Personajes recurrentes propios de cada programa que crean resonancia narrativa (definidos en PM-1.x)." },
    { factor: "S — Stories",        desc: "Cada sesión es un episodio de una historia técnica continua que el aprendiz vive." },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("Factor", ORANGE, cols[0], true, NAVY),
          hCell("Aplicación FPI SENA", ORANGE, cols[1], true, NAVY),
        ],
      }),
      ...rows_data.map((r, i) => new TableRow({
        children: [
          dCell(r.factor, i % 2 === 0 ? LGRAY : WHITE, cols[0], true, NAVY),
          dCell(r.desc,   i % 2 === 0 ? LGRAY : WHITE, cols[1]),
        ],
      })),
    ],
  });
}

// ── Session Structure Table ───────────────────────────────────────────────────
function buildSessionTable() {
  const cols = [2160, 1080, 6840];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { block: "SET-UP",       time: "~25 min",   fn: "Check-in, reciclaje de sesión anterior, presentación del contexto técnico, pre-enseñanza de vocabulario." },
    { block: "WHILE — A",   time: "~35 min",   fn: "Presentación de gramática/vocabulario via texto técnico; noticing; cuadro resumen." },
    { block: "WHILE — B",   time: "~35 min",   fn: "Práctica controlada, drilling (choral, sustitución, backchaining), forma y uso." },
    { block: "BREAK",        time: "15 min",    fn: "Pausa activa." },
    { block: "WHILE — C",   time: "~35 min",   fn: "Lectura profunda, pensamiento crítico/diagnóstico, análisis de texto técnico auténtico." },
    { block: "WHILE — D",   time: "~35 min",   fn: "Lenguaje funcional (F1–F5), role play situacional con los personajes del programa (definidos en PM-1.x)." },
    { block: "WHILE — E",   time: "~35 min",   fn: "Producción escrita, writing skill técnico." },
    { block: "WRAP-UP",     time: "~25 min",   fn: "My Turn (producción oral personalizada), autoevaluación, Gap Cards, cierre." },
    { block: "TOTAL",        time: "~240 min",  fn: "" },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("Bloque", NAVY, cols[0]),
          hCell("Tiempo", NAVY, cols[1]),
          hCell("Función pedagógica", NAVY, cols[2]),
        ],
      }),
      ...rows_data.map((r, i) => {
        const isTotal = r.block === "TOTAL";
        const fill = isTotal ? NAVY : (i % 2 === 0 ? LGRAY : WHITE);
        const color = isTotal ? WHITE : NAVY;
        return new TableRow({
          children: [
            dCell(r.block, fill, cols[0], true, color, AlignmentType.CENTER),
            dCell(r.time,  fill, cols[1], isTotal, color, AlignmentType.CENTER),
            dCell(r.fn,    fill, cols[2], isTotal, isTotal ? WHITE : TEXT),
          ],
        });
      }),
    ],
  });
}

// ── Word Stress Examples Table ────────────────────────────────────────────────
function buildWordStressTable() {
  const cols = [2520, 3780, 3780];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { word: "engine",      error: "en-GI-ne",         correct: "EN-gine" },
    { word: "cylinder",    error: "ci-LIN-der",        correct: "CYL-in-der" },
    { word: "maintenance", error: "main-TE-nan-ce",    correct: "MAIN-te-nance" },
    { word: "procedure",   error: "pro-CE-du-re",      correct: "pro-CE-dure" },
    { word: "pressure",    error: "pres-SU-re",        correct: "PRES-sure" },
    { word: "diagnose",    error: "diag-NO-se",        correct: "DI-ag-nose (v.)" },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ tableHeader: true, children: [
        hCell("Término técnico", NAVY, cols[0]),
        hCell("Error frecuente (español-influenciado)", "C0392B", cols[1], true, WHITE),
        hCell("Pronunciación correcta", "1A6B3C", cols[2], true, WHITE),
      ]}),
      ...rows_data.map((r, i) => new TableRow({ children: [
        dCell(r.word,    i % 2 === 0 ? LGRAY : WHITE, cols[0], true, NAVY),
        dCell(r.error,   i % 2 === 0 ? LGRAY : WHITE, cols[1], false, "C0392B"),
        dCell(r.correct, i % 2 === 0 ? LGRAY : WHITE, cols[2], true,  "1A6B3C"),
      ]})),
    ],
  });
}

// ── L1 Use Map Table ──────────────────────────────────────────────────────────
function buildL1UseTable() {
  const cols = [4320, 1440, 4320];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { use: "Explicar una regla gramatical compleja (cuadro resumen)", ok: "✓  Sí", note: "Más eficiente que metalenguaje en L2 no comprendido" },
    { use: "Instrucciones de seguridad críticas en el taller", ok: "✓  Sí", note: "La seguridad no se compromete por principio pedagógico" },
    { use: "Verificar comprensión de un texto técnico con bloqueo total", ok: "~  Cond.", note: "Solo si hay evidencia clara de bloqueo de comprensión" },
    { use: "Apoyo emocional o metacognitivo (Gap Cards, KWL)", ok: "✓  Sí", note: "El pensamiento reflexivo ocurre naturalmente en L1 a nivel A1" },
    { use: "Ejecutar una tarea de producción oral en L1", ok: "✗  No", note: "La tarea pierde su propósito comunicativo" },
    { use: "Responder en español cuando el inglés era posible", ok: "✗  No", note: "Patrón a reducir sistemáticamente con cada guía" },
    { use: "Traducir automáticamente todo el vocabulario nuevo", ok: "✗  No", note: "Usar imagen/gesto primero; la traducción es el último recurso" },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ tableHeader: true, children: [
        hCell("Uso del L1", NAVY, cols[0]),
        hCell("¿Legítimo?", NAVY, cols[1]),
        hCell("Nota", NAVY, cols[2]),
      ]}),
      ...rows_data.map((r, i) => {
        const okColor = r.ok.includes("✓") ? "1A6B3C" : r.ok.includes("~") ? "7D6608" : "C0392B";
        return new TableRow({ children: [
          dCell(r.use,  i % 2 === 0 ? LGRAY : WHITE, cols[0]),
          dCell(r.ok,   i % 2 === 0 ? LGRAY : WHITE, cols[1], true, okColor, AlignmentType.CENTER),
          dCell(r.note, i % 2 === 0 ? LGRAY : WHITE, cols[2], false, "555555"),
        ]});
      }),
    ],
  });
}

// ── Subnivel Descriptors Table ────────────────────────────────────────────────
function buildSubnivelDescriptorsTable() {
  const cols = [1800, 2760, 2760, 2760];
  const total = cols.reduce((a, b) => a + b, 0);
  const BLUE11 = "EBF5FB"; const BLUE12 = "D6EAF8"; const BLUE13 = "AED6F1";
  const rows_data = [
    { comp: "Comprensión oral",
      a11: "Comprende instrucciones de 1–2 pasos pronunciadas muy despacio con pausas largas. Reconoce términos técnicos básicos con apoyo visual.",
      a12: "Comprende instrucciones de 2–3 pasos pronunciadas despacio. Comprende valores numéricos y unidades de medida en contexto.",
      a13: "Comprende instrucciones multi-paso. Sigue un briefing técnico breve con apoyo visual. Comprende la idea principal de una explicación simple." },
    { comp: "Comprensión lectora",
      a11: "Reconoce nombres, etiquetas y símbolos en herramientas y equipos. Lee listas con apoyo visual. Identifica números y unidades básicas.",
      a12: "Lee procedimientos simples de mantenimiento (pasos numerados). Identifica valores en especificaciones básicas. Comprende advertencias de seguridad simples.",
      a13: "Lee un reporte de inspección básico. Comprende diagramas con leyendas. Localiza información específica en una especificación técnica de extensión media." },
    { comp: "Interacción oral",
      a11: "Puede saludar, presentarse y responder Sí/No. Puede dar nombre y programa. Puede pedir repetición con frase fija.",
      a12: "Puede describir brevemente lo que está haciendo. Puede pedir aclaración. Puede reportar el estado simple de una tarea.",
      a13: "Puede describir un problema técnico con vocabulario limitado. Puede solicitar información técnica específica. Puede participar en un intercambio estructurado con pares." },
    { comp: "Producción oral",
      a11: "Produce palabras y frases aisladas. Puede nombrar objetos presentes en el entorno laboral.",
      a12: "Produce frases completas simples. Puede describir un procedimiento de 2–3 pasos. Puede reportar un hallazgo simple.",
      a13: "Puede presentar hallazgos de una inspección básica. Puede describir un proceso de 4–5 pasos. Puede hacer recomendaciones simples." },
    { comp: "Producción escrita",
      a11: "Puede completar un formulario con datos personales. Puede escribir listas de palabras o ítems.",
      a12: "Puede completar un formato de reporte con datos técnicos. Puede escribir una lista de verificación básica.",
      a13: "Puede redactar un reporte de inspección básico. Puede completar un formato de diagnóstico estructurado. Puede escribir una nota técnica simple." },
    { comp: "Vocabulario activo",
      a11: "50–100 términos del dominio. Usa palabras de manera aislada o en frases muy fijas.",
      a12: "150–250 términos. Conoce collocations básicas del dominio (check the level / drain the filter).",
      a13: "300–400 términos. Usa collocations con confianza. Comienza a usar expresiones fraseológicas del dominio." },
    { comp: "Gramática",
      a11: "Presente simple afirmativo (I use / He checks). Imperativo básico (Open / Close / Check). Números y unidades básicas.",
      a12: "Presente simple afirmativo, negativo e interrogativo. Imperativo + seguridad. Modal must para obligación. Números ordinales y cardinales.",
      a13: "Presente perfecto para historial de servicio. Condicional tipo 1 para advertencias. Voz pasiva básica. Conectores de secuencia (first, then, next, finally)." },
    { comp: "Fonología",
      a11: "Pronuncia palabras conocidas de manera comprensible con esfuerzo. Identifica el número de sílabas de palabras familiares.",
      a12: "Pronuncia frases cortas con stress correcto en la palabra clave. Produce ritmo reconocible en frases de 3–5 palabras.",
      a13: "Produce frases y oraciones cortas con ritmo reconocible. Aplica stress consistentemente en vocabulario técnico conocido." },
    { comp: "Funciones comunicativas",
      a11: "Saludar, presentarse, agradecer, pedir repetición, nombrar objetos.",
      a12: "Describir acciones en curso, reportar estado, pedir aclaración, dar instrucción simple.",
      a13: "Describir problema, recomendar acción, presentar hallazgos, solicitar información técnica, expresar obligación/necesidad." },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ tableHeader: true, children: [
        hCell("Competencia", NAVY, cols[0]),
        hCell("A1.1 — Breakthrough inicial", "1A5276", cols[1]),
        hCell("A1.2 — Breakthrough consolidado", "1F618D", cols[2]),
        hCell("A1.3 — Breakthrough avanzado", "2874A6", cols[3]),
      ]}),
      ...rows_data.map((r, i) => new TableRow({ children: [
        dCell(r.comp, i % 2 === 0 ? LGRAY : WHITE, cols[0], true, NAVY),
        dCell(r.a11,  i % 2 === 0 ? BLUE11 : WHITE, cols[1], false, TEXT),
        dCell(r.a12,  i % 2 === 0 ? BLUE12 : WHITE, cols[2], false, TEXT),
        dCell(r.a13,  i % 2 === 0 ? BLUE13 : WHITE, cols[3], false, TEXT),
      ]})),
    ],
  });
}

// ── Traceability Section Builder ──────────────────────────────────────────────
function buildTraceabilitySection(letter, title, items, fillHeader) {
  const cols = [480, 6720, 720, 2160];
  const total = cols.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ tableHeader: true, children: [
        hCell(letter, fillHeader, cols[0]),
        hCell(title, fillHeader, cols[1] + cols[2], true, WHITE, 10),
        hCell("Nota", fillHeader, cols[3]),
      ]}),
      ...items.map((item, i) => new TableRow({ children: [
        dCell(item.num, i % 2 === 0 ? LGRAY : WHITE, cols[0], true, NAVY, AlignmentType.CENTER),
        dCell(item.text, i % 2 === 0 ? LGRAY : WHITE, cols[1], false, TEXT),
        dCell("☐", i % 2 === 0 ? LGRAY : WHITE, cols[2], false, NAVY, AlignmentType.CENTER),
        dCell("", i % 2 === 0 ? LGRAY : WHITE, cols[3]),
      ]})),
    ],
  });
}

// ── Traceability Summary Table ────────────────────────────────────────────────
function buildTraceabilitySummaryTable() {
  const cols = [4320, 1440, 1440, 2880];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { sec: "A — Trazabilidad CEFR",       items: "6", aprov: "___", status: "" },
    { sec: "B — Trazabilidad pedagógica",  items: "8", aprov: "___", status: "" },
    { sec: "C — Estructura de sesión",     items: "4", aprov: "___", status: "" },
    { sec: "D — Evaluación",               items: "4", aprov: "___", status: "" },
    { sec: "TOTAL",                        items: "22", aprov: "___", status: "Aprobado si ≥ 20 / 22" },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ tableHeader: true, children: [
        hCell("Sección", NAVY, cols[0]),
        hCell("Ítems", NAVY, cols[1]),
        hCell("Aprobados", NAVY, cols[2]),
        hCell("Estado / Criterio", NAVY, cols[3]),
      ]}),
      ...rows_data.map((r, i) => {
        const isTotal = r.sec === "TOTAL";
        const fill = isTotal ? NAVY : (i % 2 === 0 ? LGRAY : WHITE);
        const col = isTotal ? WHITE : TEXT;
        return new TableRow({ children: [
          dCell(r.sec,    fill, cols[0], isTotal, col),
          dCell(r.items,  fill, cols[1], isTotal, col, AlignmentType.CENTER),
          dCell(r.aprov,  fill, cols[2], false, col, AlignmentType.CENTER),
          dCell(r.status, fill, cols[3], isTotal, isTotal ? WHITE : "1A6B3C"),
        ]});
      }),
    ],
  });
}

// ── Roadmap Table ─────────────────────────────────────────────────────────────
function buildRoadmapTable() {
  const cols = [2160, 1980, 1980, 1980, 1980];
  const total = cols.reduce((a, b) => a + b, 0);
  const rows_data = [
    { dim: "Velocidad del input oral", a11: "Muy lenta — pausas largas frecuentes", a12: "Lenta — pausas frecuentes", a13: "Moderada — pausas ocasionales", a2: "Moderada natural — algunas pausas" },
    { dim: "Extensión de textos", a11: "1–3 oraciones, apoyo visual obligatorio", a12: "3–7 oraciones, apoyo visual frecuente", a13: "Párrafos cortos (5–10 oraciones), apoyo opcional", a2: "Textos multi-párrafo, apoyo visual como enriquecimiento" },
    { dim: "Autonomía del aprendiz", a11: "Alta dependencia del docente — paso a paso", a12: "Dependencia moderada — con andamiaje", a13: "Semi-autónomo en tareas conocidas", a2: "Progresivamente autónomo — directivas abiertas" },
    { dim: "Uso del L1", a11: "Alto — explicación, apoyo y metacognición", a12: "Reducido — L2 en tareas, L1 de respaldo", a13: "Mínimo — L2 como norma de aula", a2: "L2 exclusivo — L1 solo en emergencia" },
    { dim: "Tipos de interacción", a11: "Docente → aprendiz, pares con guión fijo", a12: "Pares con andamiaje, diálogos estructurados", a13: "Grupos pequeños, mingle, semi-espontáneo", a2: "Debate estructurado, presentación, negociación" },
    { dim: "Andamiaje", a11: "Máximo — sentence starters, word banks, frames completos", a12: "Alto — frames parciales, word banks", a13: "Moderado — prompts iniciales", a2: "Mínimo — aprendiz construye sin frames previos" },
    { dim: "Complejidad gramatical", a11: "Presente simple, imperativo básico", a12: "+ Negativo, interrogativo, must", a13: "+ Presente perfecto, Condicional 1, voz pasiva básica", a2: "+ Condicional 2, reported speech, modales de posibilidad" },
    { dim: "Densidad léxica activa", a11: "50–100 términos", a12: "150–250 términos", a13: "300–400 términos", a2: "400–600 términos" },
    { dim: "Feedback predominante", a11: "Inmediato, choral — accuracy prioritario", a12: "Mixto: inmediato en drilling, diferido en fluency", a13: "Diferido post-tarea predominante", a2: "Peer feedback + self-assessment" },
    { dim: "Misión Final", a11: "Oral simple + formulario básico", a12: "Reporte básico + presentación oral estructurada", a13: "Presentación de hallazgos + reporte de diagnóstico", a2: "Diagnóstico complejo + presentación + defensa técnica" },
    { dim: "Pensamiento crítico", a11: "Reconocimiento y clasificación", a12: "Secuenciación y descripción de procedimientos", a13: "Análisis de síntomas, diferenciación causa/efecto", a2: "Diagnóstico, RCA, evaluación y recomendación fundamentada" },
    { dim: "Rol del docente", a11: "Modelo central — driller y fuente de input", a12: "Modelo y andamio — guía la práctica", a13: "Facilitador — estructura el contexto", a2: "Monitor y retroalimentador — el aprendiz lidera" },
  ];
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ tableHeader: true, children: [
        hCell("Dimensión", NAVY, cols[0]),
        hCell("A1.1", "1A5276", cols[1]),
        hCell("A1.2", "1F618D", cols[2]),
        hCell("A1.3", "2874A6", cols[3]),
        hCell("A2.0–A2.1", "117A65", cols[4]),
      ]}),
      ...rows_data.map((r, i) => new TableRow({ children: [
        dCell(r.dim, i % 2 === 0 ? LGRAY : WHITE, cols[0], true, NAVY),
        dCell(r.a11, i % 2 === 0 ? "EBF5FB" : WHITE, cols[1], false, TEXT),
        dCell(r.a12, i % 2 === 0 ? "D6EAF8" : WHITE, cols[2], false, TEXT),
        dCell(r.a13, i % 2 === 0 ? "AED6F1" : WHITE, cols[3], false, TEXT),
        dCell(r.a2,  i % 2 === 0 ? "A9DFBF" : WHITE, cols[4], false, TEXT),
      ]})),
    ],
  });
}

// ── Document assembly ─────────────────────────────────────────────────────────
const children = [

  // ── COVER ──────────────────────────────────────────────────────────────────
  new Paragraph({
    children: [new TextRun({ text: "PM-0", bold: true, color: ORANGE, size: pt(36), font: "Arial" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "CEFR Framework", bold: true, color: WHITE, size: pt(24), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    indent: { left: 0, right: 0 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "& FPI SENA Pedagogical Foundation", bold: true, color: WHITE, size: pt(18), font: "Arial" })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Capa fundacional del sistema · Versión 1.0 · 2026-04-18", color: "666666", size: pt(10), font: "Calibri" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Alcance CEFR: A1.1 — A1.2 (expansión futura A1.3 → A2.1)", color: ORANGE, bold: true, size: pt(11), font: "Calibri" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 60, after: 480 },
  }),

  // ── SECTION 1 ─────────────────────────────────────────────────────────────
  navyBanner("1. ¿Qué es el Marco Común Europeo de Referencia (MCER / CEFR)?"),
  spacer(80),
  body("El Consejo de Europa desarrolló el Marco Común Europeo de Referencia para las Lenguas: Aprendizaje, Enseñanza, Evaluación (MCER o CEFR en inglés) con el propósito de promover la enseñanza y el aprendizaje de lenguas dentro de Europa y a nivel global."),
  spacer(60),
  body("El CEFR ofrece un marco descriptivo que promueve el desarrollo de habilidades lingüísticas, la conciencia intercultural, la autonomía del aprendiz y el aprendizaje a lo largo de la vida. Es de interés para diseñadores curriculares, autores de materiales, docentes, evaluadores y formadores de formadores."),
  spacer(60),
  body("El CEFR adopta un enfoque basado en lo que el aprendiz puede hacer con el idioma. Provee además un sistema que permite comparar el nivel lingüístico de los individuos de manera objetiva e imparcial."),
  spacer(100),
  orangeLine("Principios clave"),
  bulletItem("Es un conjunto de puntos de referencia comunes, no una prescripción curricular sistemática."),
  bulletItem("Un nivel no equivale a un año de estudio ni a un número fijo de horas de instrucción."),
  bulletItem("Reconoce que los aprendices tienen objetivos distintos y aprenden a ritmos diferentes."),
  bulletItem("No prescribe un método de enseñanza — reconoce la diversidad de métodos según el contexto."),
  bulletItem("Tiene un foco claro en las cuatro habilidades y en desarrollar la capacidad de comunicar, no solo de acumular conocimiento lingüístico."),
  bulletItem("Enfatiza la adquisición de habilidades para el aprendizaje autónomo e independiente."),
  spacer(120),
  orangeLine("Niveles del CEFR"),
  spacer(60),
  buildCefrLevelsTable(),
  spacer(60),
  body("★ El programa FPI SENA opera en el rango A1 Breakthrough — A2 Waystage, con subniveles internos (A1.1, A1.2, A1.3, A2.0, A2.1) para garantizar progresión granular y medible dentro de los programas técnicos y tecnológicos de SENA.", false, NAVY),

  // ── SECTION 2 ─────────────────────────────────────────────────────────────
  spacer(200),
  navyBanner("2. ¿Cómo se corresponde el CEFR con el sistema FPI SENA?"),
  spacer(80),
  body("El sistema FPI SENA (Fluency Program Integration) adopta un enfoque comunicativo-técnico que sitúa el aprendizaje del inglés dentro de escenarios reales del puesto de trabajo. A diferencia de los programas de inglés general, el FPI embebe el desarrollo de la lengua en tareas técnicas auténticas: leer reportes de diagnóstico, escribir listas de verificación de mantenimiento, escuchar briefings del supervisor, y presentar hallazgos a un equipo técnico. Este enfoque refleja directamente el principio fundamental del CEFR: definir la competencia lingüística a través de lo que el aprendiz puede hacer con el idioma en situaciones reales."),
  spacer(100),
  orangeLine("Estructura de guías por nivel CEFR"),
  spacer(60),
  body("El sistema FPI estructura cada programa en guías (unidades didácticas de larga duración), asignando a cada guía un subnivel CEFR específico. El contenido técnico de cada guía es definido por el programa al que pertenece — no por el sistema FPI. El sistema provee la arquitectura; cada programa provee el contenido (ver PM-1.x del programa correspondiente)."),
  spacer(60),
  new Paragraph({
    children: [new TextRun({ text: "Ejemplo de mapeo — Programa de referencia: Mantenimiento de Motores Diesel", italics: true, color: "888888", size: pt(10), font: "Calibri" })],
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: MGRAY } },
    indent: { left: 200 },
    spacing: { before: 40, after: 60 },
  }),
  buildGuideMapTable(),
  spacer(80),
  body("Cada guía consolida las competencias de la guía anterior antes de introducir las nuevas. Cada actividad, instrumento de evaluación y plan de sesión del sistema FPI está mapeado contra los descriptores CEFR del nivel correspondiente, garantizando que lo que se enseña, practica y evalúa corresponde directamente a las competencias comunicativas definidas por el CEFR para ese nivel."),

  // ── SECTION 3 ─────────────────────────────────────────────────────────────
  spacer(200),
  navyBanner("3. ¿Cómo responde este proyecto a los objetivos del CEFR?"),
  spacer(80),
  body("El diseño de vocabulario y gramática del sistema FPI está incrustado en contextos técnicos auténticos — procedimientos de taller, especificaciones de equipo, reportes de diagnóstico — y construye las competencias lingüísticas que los aprendices necesitan para comunicarse en su entorno laboral específico."),
  spacer(80),
  orangeLine("Estructuras gramaticales de alta rentabilidad comunicativa por nivel"),
  spacer(60),
  buildGrammarTable(),
  spacer(100),
  orangeLine("Las cuatro habilidades + Language Functions"),
  body("Las cuatro habilidades — Reading, Writing, Listening y Speaking — se desarrollan en cada guía, con un componente adicional de Language Functions (F1–F5) que refleja los descriptores de competencia pragmática del CEFR. Este componente garantiza que el aprendiz no solo comprende y produce inglés, sino que lo usa para funciones comunicativas específicas del mundo laboral técnico."),
  spacer(80),
  orangeLine("Escenarios auténticos"),
  body("Los escenarios auténticos del entorno laboral — con personajes recurrentes definidos por cada programa (un supervisor, un técnico senior y un aprendiz) — reflejan el énfasis del CEFR en la comunicación en situaciones realistas. El aprendiz no practica inglés abstracto: reporta hallazgos a su supervisor, solicita aclaraciones a su mentor, y presenta resultados a un equipo técnico. Los nombres y roles específicos de estos personajes se definen en el PM-1.x de cada programa."),
  spacer(80),
  orangeLine("Autonomía y autoevaluación"),
  body("Las herramientas de autoevaluación integradas en cada sesión — Gap Cards, KWL, Learning Contract — desarrollan la autonomía del aprendiz y la conciencia metacognitiva, en línea con el énfasis del CEFR en el aprendizaje autónomo y permanente."),
  spacer(80),
  orangeLine("Tarea de transferencia — Final Mission"),
  body("La Misión Final de cada guía (PM-3.5) es la tarea de transferencia que exige al aprendiz integrar todas las competencias acumuladas en una performance auténtica, completa y evaluada — correspondencia directa con la orientación 'can do' del CEFR."),

  // ── SECTION 4 ─────────────────────────────────────────────────────────────
  spacer(200),
  navyBanner("4. CEF Overview — Descriptores A1 (Nivel de referencia del programa)"),
  spacer(80),
  body("A continuación se presentan los descriptores CEFR para el nivel A1 Breakthrough. Cada actividad de aprendizaje diseñada en el sistema FPI debe poder ser trazada a uno o más de estos descriptores."),
  spacer(80),
  buildDescriptorsTable(),

  // ── SECTION 5 — Principios Pedagógicos y Didácticos ─────────────────────
  spacer(200),
  navyBanner("5. Principios Pedagógicos y Didácticos — Capa Fundacional"),
  spacer(60),
  new Paragraph({
    children: [new TextRun({
      text: "Marco adaptado de la metodología Life Second Edition (National Geographic Learning) para el contexto técnico-vocacional del sistema FPI SENA.",
      italics: true, color: "555555", size: pt(10), font: "Calibri",
    })],
    spacing: { before: 40, after: 100 },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: ORANGE } },
    indent: { left: 200 },
  }),

  // 5.1
  orangeLine("5.1  Contenido técnico como punto de partida"),
  body("Al igual que en Life Second Edition el contenido de National Geographic es el punto de partida de cada lección, en el sistema FPI SENA el contenido técnico del programa es el punto de partida de cada sesión. Los temas no son pretextos para practicar gramática: son el motor de la comunicación."),
  spacer(60),
  body("La riqueza de los textos técnicos — manuales de procedimiento, reportes de diagnóstico, listas de verificación, especificaciones del fabricante — garantiza que los aprendices estén tan comprometidos con el contenido que el aprendizaje del inglés se convierte en una necesidad, no en un fin en sí mismo. Este elemento de transferencia — del contenido técnico a la realidad laboral del aprendiz — convierte el input en un vehículo de práctica y producción lingüística mapeado directamente a las escalas CEFR."),
  spacer(80),
  buildGuideMapTable(),

  // 5.2
  spacer(160),
  orangeLine("5.2  Fotografía y realia técnica"),
  body("La realia técnica del taller — fotos de herramientas, diagramas de circuitos, placas de especificaciones, etiquetas de seguridad, instrumentos de diagnóstico — cumple la misma función que la fotografía de National Geographic en Life Second Edition: sirve como punto de entrada afectivo y cognitivo para cada actividad."),
  spacer(60),
  body("Las imágenes y realia técnica en el sistema FPI:"),
  bulletItem("Cuentan una historia procedimental por sí solas"),
  bulletItem("Atraen al aprendiz y generan compromiso emocional con el contenido"),
  bulletItem("Apoyan la comprensión del texto técnico y lo hacen memorable"),
  bulletItem("Provocan discusión diagnóstica y pensamiento técnico crítico"),
  bulletItem("Ayudan a recordar conjuntos léxicos técnicos (lexical sets)"),
  bulletItem("Sirven de apoyo para la enseñanza del lenguaje funcional (F1–F5)"),
  bulletItem("Se prestan a la práctica de estructuras gramaticales específicas del nivel"),
  spacer(60),
  new Paragraph({
    children: [
      new TextRun({ text: "Principio de aula — ", bold: true, color: NAVY, size: pt(11), font: "Calibri" }),
      new TextRun({ text: "Show, don't tell. ", italics: true, bold: true, color: ORANGE, size: pt(11), font: "Calibri" }),
      new TextRun({ text: "Antes de nombrar una herramienta, el docente la muestra. Antes de describir un síntoma, muestra la imagen del equipo. La instrucción visual y por mímica reduce la dependencia del L1 y ancla el vocabulario a referentes concretos.", color: TEXT, size: pt(11), font: "Calibri" }),
    ],
    spacing: { before: 60, after: 60 },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: ORANGE } },
    indent: { left: 200 },
  }),

  // 5.3
  spacer(160),
  orangeLine("5.3  Video e instrucción en vivo (Live Listening)"),
  body("El video y el live listening son herramientas de alto impacto en el aula técnica. Cada guía del sistema FPI incluye componentes audiovisuales que siguen la estructura de tres fases:"),
  spacer(60),
  body("Antes (Before) — Introduce el tema y compromete al aprendiz en una tarea de pre-observación. Pre-enseña vocabulario clave para que el aprendiz pueda comprometerse inmediatamente sin ser bloqueado por léxico desconocido.", true),
  body("Durante (While) — Tareas de comprensión que asisten el procesamiento del video o demostración, tanto en lo que el aprendiz ve como en lo que escucha. Los ejercicios explotan el lenguaje técnico del contexto.", true),
  body("Después (After) — Permite al aprendiz responder al video en su conjunto y participar en una discusión o tarea nacida del contexto técnico observado.", true),
  spacer(60),
  body("Técnicas de variación para video en el aula FPI:"),
  bulletItem("Reproducir sin sonido: el aprendiz predice lo que se describe, luego compara"),
  bulletItem("Reproducir solo audio: el aprendiz predice la escena del taller, luego verifica"),
  bulletItem("Pausar en el momento crítico del procedimiento: el aprendiz predice el siguiente paso"),
  bulletItem("Dar el script del video: el aprendiz diseña qué filmaría, luego compara con el original"),
  spacer(60),
  body("El live listening — el docente habla inglés en tiempo real describiendo un procedimiento, una herramienta, o un diagnóstico — demuestra que el inglés técnico es una habilidad viva y usable en el taller, no solo un texto impreso."),

  // 5.4
  spacer(160),
  orangeLine("5.4  Pensamiento crítico y diagnóstico técnico"),
  body("En el sistema FPI SENA, el pensamiento crítico se manifiesta como razonamiento diagnóstico técnico: la capacidad del aprendiz de leer un reporte, analizar síntomas, evaluar condiciones, y llegar a conclusiones fundamentadas — en inglés. Las tareas de pensamiento crítico en FPI SENA:"),
  bulletItem("Resolución de problemas técnicos en equipo (pairwork, groupwork)"),
  bulletItem("Análisis de causa raíz (RCA) progresivo a través de los niveles"),
  bulletItem("Diferenciación entre síntoma y causa en reportes de diagnóstico"),
  bulletItem("Evaluación de la fiabilidad de una especificación técnica"),
  bulletItem("Identificación de riesgos y medidas preventivas en contexto real"),
  spacer(60),
  body("La progresión pedagógica dentro de cada sesión va de baja a alta complejidad cognitiva: de actividades de verificación y práctica controlada a producción libre, creativa e intelectualmente comprometedora."),

  // 5.5
  spacer(160),
  orangeLine("5.5  Memorización y retención"),
  body("Según Gairns y Redman (Working with Words, Cambridge University Press, 1986), el 80% de lo aprendido se olvida dentro de las primeras 24 horas. El sistema FPI SENA incorpora los factores SUCCESS de memorabilidad:"),
  spacer(60),
  buildSuccessTable(),
  spacer(80),
  body("Para garantizar la retención, el sistema FPI implementa:"),
  bulletItem("Reciclaje de vocabulario y gramática dentro de cada sesión y entre guías"),
  bulletItem("Actividades de revisión al inicio de sesión que reciclan la sesión anterior"),
  bulletItem("Instrumentos de autoevaluación: Gap Cards, KWL, Learning Contract"),
  bulletItem("Word Wall: referencia visual permanente del vocabulario técnico activo"),
  spacer(60),
  body("Principios metodológicos de las actividades de memorización:"),
  bulletItem("Relacionabilidad — el aprendiz aplica el lenguaje nuevo a su propia experiencia laboral"),
  bulletItem("Multisensorial — escuchar, ver, manipular realia, pronunciar, escribir: más de un sentido en la retención"),
  bulletItem("Repetición con variación — el aprendiz recupera ítems de memoria y los aplica a situaciones distintas"),
  bulletItem("Profundidad cognitiva — predicciones y suposiciones activas favorecen el aprendizaje profundo"),
  bulletItem("Utilidad — vocabulario con alta rentabilidad comunicativa en el taller es más fácil de recordar"),
  bulletItem("Sin ansiedad — el aula técnica es segura para el error: el error es datos, no fracaso"),
  bulletItem("Enseñanza entre pares — el aprendiz que explica a otro consolida su propio aprendizaje"),
  bulletItem("Individualidad — la cooperación compensa la variabilidad en los estilos de memorización individual"),

  // 5.6
  spacer(160),
  orangeLine("5.6  Tratamiento de la gramática"),
  body("La gramática target se presenta en las primeras fases de cada sesión FPI a través de textos de lectura o escucha técnicos. Estos textos provienen de fuentes auténticas: manuales de taller, reportes de diagnóstico, listas de verificación de PM."),
  spacer(60),
  body("Principios del tratamiento gramatical en FPI SENA:"),
  bulletItem("El foco principal está en el contenido técnico antes de dirigir la atención a las estructuras gramaticales"),
  bulletItem("Los aprendices son guiados a notar (noticing) estructuras target: resaltado, extracción de oraciones, búsqueda activa en el texto"),
  bulletItem("Cada punto gramatical incluye un cuadro resumen con ejemplos tomados del texto de presentación"),
  bulletItem("Los ejercicios de práctica favorecen actividades de pensamiento profundo sobre producción mecánica"),
  bulletItem("El primer ejercicio está siempre vinculado al tema técnico de la sesión"),
  bulletItem("Los ejercicios subsiguientes se mueven hacia contextos laborales que el aprendiz puede personalizar"),
  bulletItem("Cada sesión culmina con una tarea de producción oral (My Turn) con énfasis en la fluencia"),
  spacer(60),
  body("El drilling explícito — choral drilling, drilling de sustitución, backchaining — fija pronunciación y automatiza estructuras antes de exigir producción libre."),
  spacer(60),
  buildGrammarTable(),

  // 5.7
  spacer(160),
  orangeLine("5.7  Tratamiento del vocabulario"),
  body("El sistema FPI SENA presta especial atención al vocabulario tanto receptivo como productivo. Todos los textos de input han sido revisados para reducir el léxico fuera de nivel manteniendo el sabor técnico y la riqueza del original."),
  spacer(60),
  body("1.  Conjuntos léxicos técnicos (Lexical Sets)", true),
  body("El sistema FPI organiza el vocabulario por dominio: herramientas, medidas, sistemas del motor, PPE, procedimientos de mantenimiento. Aprender palabras en un conjunto requiere menos esfuerzo cognitivo y refleja cómo se almacena la información especializada en la memoria."),
  spacer(60),
  body("2.  Word Wall", true),
  body("Referencia visual permanente del vocabulario técnico activo de cada guía. Provee el término, su pronunciación con marcación de stress, ejemplo en contexto técnico, y collocations del dominio. El vocabulario del Word Wall es el vocabulario de producción activa esperada en la Misión Final."),
  spacer(60),
  body("3.  Glosario técnico por guía (PM-2.5)", true),
  body("Entradas que incluyen: fonética, definición, parte del discurso, ejemplo en contexto técnico, y familia de palabras."),
  spacer(60),
  body("Pre-enseñanza de vocabulario — 4 propósitos:", true),
  bulletItem("Reducir la carga cognitiva durante la actividad principal (reading/listening)"),
  bulletItem("Garantizar que los aprendices puedan comprometerse inmediatamente con el contenido"),
  bulletItem("Introducir el vocabulario que el aprendiz necesitará para producir en la tarea final"),
  bulletItem("Crear anticipación e interés en el tema técnico antes de abordarlo"),

  // 5.8
  spacer(160),
  orangeLine("5.8  Habilidades de aprendizaje autónomo"),
  body("El sistema FPI SENA desarrolla sistemáticamente la autonomía del aprendiz a través de:"),
  bulletItem("Gap Cards — identificación activa de brechas de conocimiento antes y después de la sesión"),
  bulletItem("KWL — Know / Want to know / Learned: metacognición aplicada al inicio y cierre de cada sesión"),
  bulletItem("Learning Contract — compromiso personal con objetivos de aprendizaje específicos y medibles para la guía"),
  bulletItem("Registro de vocabulario — técnicas de registro del léxico técnico para revisión autónoma fuera del aula"),
  bulletItem("Can-do statements — al final de cada sesión, el aprendiz verifica qué puede hacer con el inglés aprendido"),

  // 5.9
  spacer(160),
  orangeLine("5.9  Evaluación"),
  body("El progreso se evalúa de las siguientes maneras:"),
  bulletItem("Cada sesión cierra con can-do statements para autoevaluación formativa continua"),
  bulletItem("Cada guía cierra con la Misión Final (PM-3.5): tarea de transferencia evaluada con rúbrica que mapea a los descriptores CEFR del nivel correspondiente"),
  bulletItem("La rúbrica de la Misión Final mapea directamente a los descriptores CEFR del nivel correspondiente"),
  bulletItem("El Learning Contract al inicio de la guía sirve como línea de base para medir el progreso al final"),

  // 5.10
  spacer(160),
  orangeLine("5.10  Estructura de sesión FPI — Progresión pedagógica"),
  spacer(60),
  buildSessionTable(),
  spacer(80),
  body("Cada sesión cierra con My Turn: tarea de producción oral que habilita al aprendiz a crear su propio output usando el lenguaje target en un contexto técnico significativo, con énfasis en la fluencia dentro del marco gramatical de la tarea."),

  // 5.11 Feedback diferenciado
  spacer(160),
  orangeLine("5.11  Feedback diferenciado: accuracy vs. fluency"),
  body("El feedback es la palanca de mayor impacto en el aprendizaje lingüístico — y también la más usada de manera incorrecta. El error crítico más frecuente en el aula de inglés técnico es corregir siempre, en todo momento, sin distinguir si el aprendiz está trabajando la forma o la comunicación. Ese error destruye la confianza y bloquea la producción oral."),
  spacer(60),
  new Paragraph({
    children: [new TextRun({ text: "Principio fundamental: el tipo de feedback debe corresponder al propósito de la actividad.", bold: true, color: NAVY, size: pt(11), font: "Calibri" })],
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: ORANGE } },
    indent: { left: 200 },
    spacing: { before: 60, after: 80 },
  }),
  body("Modo accuracy (foco en la forma) — aplica durante drilling (WHILE B), cuadro resumen gramatical, ejercicios de práctica controlada.", true),
  bulletItem("Recast (implícito) — el docente repite la producción del aprendiz en forma correcta, sin interrumpir el flujo. El aprendiz recibe el modelo correcto sin ser detenido."),
  bulletItem("Elicitación — el docente señala que hay un error y devuelve la responsabilidad al aprendiz: '¿Puedes intentar de nuevo?' Promueve la auto-corrección."),
  bulletItem("Pista metalingüística — el docente da una clave sin dar la respuesta: 'Cuidado — estamos en pasado.'"),
  bulletItem("Corrección explícita — solo cuando los otros métodos han fallado repetidamente. Siempre seguida de práctica inmediata de la forma correcta."),
  bulletItem("Repetición con entonación ascendente — 'I go?' — señala que algo no está bien sin decirlo directamente."),
  spacer(60),
  body("Modo fluency (foco en la comunicación) — aplica durante role play (WHILE D), My Turn (WRAP-UP), Misión Final, interacciones espontáneas.", true),
  body("Regla en modo fluency: el docente NO interrumpe. Toma nota de errores recurrentes en silencio durante la actividad. Después de la actividad: feedback diferido a nivel de clase."),
  spacer(60),
  body("Feedback diferido post-tarea:", true),
  bulletItem("El docente escribe en la pizarra 2–3 errores frecuentes anónimamente: 'Escuché: I am go to check. ¿Cómo podemos mejorar esto?'"),
  bulletItem("El grupo analiza, corrige y practica la forma correcta brevemente."),
  bulletItem("El docente también destaca 2–3 aciertos comunicativos — refuerza lo que funcionó."),
  spacer(60),
  body("Feedback escrito (WHILE E, reportes):", true),
  bulletItem("Códigos de error: el docente subraya el error con un código (G=grammar, V=vocabulary, Sp=spelling, WO=word order). El aprendiz corrige él mismo. No borra y rescribe — trabaja con su propio texto."),
  bulletItem("Nunca corregir todo: seleccionar los errores más sistémicos o los relacionados con la gramática target de la sesión."),

  // 5.12 Gestión del L1
  spacer(160),
  orangeLine("5.12  Gestión del L1 en el aula técnica"),
  body("La pregunta sobre el uso del español en el aula de inglés técnico es real, compleja, y no tiene una respuesta única. La investigación contemporánea en adquisición de segundas lenguas es clara: el L1 es un recurso cognitivo, no un enemigo. La pregunta correcta no es '¿se puede usar español?' sino '¿para qué se está usando, y en qué momento?'"),
  spacer(80),
  buildL1UseTable(),
  spacer(80),
  body("La reducción progresiva del L1 por subnivel:", true),
  bulletItem("A1.1 — Alto uso del L1 en instrucciones, explicaciones y apoyo emocional. Las tareas de producción son en L2."),
  bulletItem("A1.2 — L1 se reduce. Instrucciones en L2 con soporte visual. Explicaciones preferiblemente en L2, L1 de respaldo."),
  bulletItem("A1.3 — L1 mínimo. Solo para seguridad y casos de bloqueo genuino. La dinámica de clase es en L2."),
  bulletItem("A2.0+ — L2 como norma de aula. L1 solo en emergencias."),
  spacer(60),
  body("Técnicas prácticas:", true),
  bulletItem("'English Zone' visual — señal acordada que indica modo L2. El aprendiz sabe que la expectativa es inglés."),
  bulletItem("'Can you say that in English?' — frase de docente consistente y no punitiva."),
  bulletItem("Show before tell — el docente usa imagen, gesto o demostración antes de recurrir a la traducción."),
  bulletItem("Evitar la traducción refleja — cuando el objeto es visible, no hay necesidad de decir su nombre en español primero."),
  bulletItem("L1 de decodificación, L2 de producción — el aprendiz puede procesar en L1, pero su respuesta debe ser en L2."),
  spacer(60),
  new Paragraph({
    children: [new TextRun({ text: "Riesgo del exceso de restricción: prohibir el L1 completamente a nivel A1.1 genera ansiedad elevada, reduce la participación, y produce aprendices que prefieren el silencio al error.", italics: true, color: "555555", size: pt(10), font: "Calibri" })],
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: MGRAY } },
    indent: { left: 200 },
    spacing: { before: 40, after: 80 },
  }),

  // 5.13 Noticing de stress
  spacer(160),
  orangeLine("5.13  Noticing de stress con soporte físico"),
  body("El inglés es una lengua stress-timed: el ritmo no es igual para cada sílaba — las sílabas acentuadas ocurren a intervalos regulares y las no acentuadas se comprimen o eliden. El español es syllable-timed: cada sílaba recibe un peso temporal similar. Esta diferencia es la causa más frecuente de incomprensión entre hablantes de inglés técnico cuya L1 es español."),
  spacer(60),
  new Paragraph({
    children: [new TextRun({ text: "El trabajo de stress no es opcional ni decorativo — es la diferencia entre ser comprendido y no serlo.", bold: true, color: NAVY, size: pt(11), font: "Calibri" })],
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: ORANGE } },
    indent: { left: 200 },
    spacing: { before: 60, after: 80 },
  }),
  body("Todo término técnico nuevo debe enseñarse con su patrón de stress desde el primer encuentro. Nunca introducir vocabulario sin marcar el stress."),
  spacer(60),
  buildWordStressTable(),
  spacer(80),
  body("Técnicas de soporte físico:", true),
  bulletItem("Finger drilling (dedos) — docente extiende los dedos, uno por sílaba, y golpea más fuerte el que corresponde a la sílaba tónica. Los aprendices replican. El cuerpo registra el stress como información física, no solo auditiva."),
  bulletItem("Clapping / tapping — el grupo aplaude o golpea la mesa siguiendo el patrón rítmico. Las sílabas tónicas reciben un golpe más fuerte."),
  bulletItem("Backchaining desde la sílaba tónica — se construye la palabra hacia atrás empezando siempre en la tónica: '...nance' → '...tenance' → 'maintenance' → 'preventive maintenance'."),
  bulletItem("Marcación en la pizarra — la sílaba tónica en letra visiblemente mayor o con círculo sobre ella: ● ○ ○ / MAIN-te-nance."),
  bulletItem("Choral drilling con gesto físico — docente modela con gesto ascendente-descendente que marca la sílaba tónica. El gesto ancla el patrón en la memoria motriz."),
  spacer(60),
  body("Stress de oración — en inglés las palabras de contenido (sustantivos, verbos principales, adjetivos, adverbios) reciben stress; las palabras de función (artículos, preposiciones, pronombres, auxiliares) se reducen. El aprendiz que no domina esto no puede procesar el listening nativo, porque espera palabras de función con el mismo peso que en español — y han desaparecido.", false, "444444"),

  // ── SECTION 6 ─────────────────────────────────────────────────────────────
  spacer(200),
  navyBanner("6. Descriptores CEFR por Subnivel — Tabla de Referencia para Diseñadores"),
  spacer(80),
  body("Esta tabla es el instrumento operativo central para el diseño de actividades. Cada PM debe poder ser trazado a al menos una celda de esta tabla. Las descripciones corresponden al contexto técnico y vocacional del programa, no al inglés general."),
  spacer(60),
  buildSubnivelDescriptorsTable(),

  // ── SECTION 7 ─────────────────────────────────────────────────────────────
  spacer(200),
  navyBanner("7. Instrumento de Trazabilidad Pedagógica"),
  spacer(80),
  body("Checklist de verificación para diseñadores de PM. Debe completarse para cada PM antes de su aprobación para producción. Un PM que no aprueba este instrumento debe ser revisado antes de avanzar al siguiente."),
  spacer(80),
  buildTraceabilitySection("A", "Trazabilidad CEFR", [
    { num: "A1", text: "El PM está asignado a un subnivel CEFR específico (A1.1 / A1.2 / A1.3 / A2.0 / A2.1)" },
    { num: "A2", text: "Cada actividad del PM puede ser trazada a al menos un descriptor de la Sección 4 de PM-0" },
    { num: "A3", text: "El descriptor citado corresponde al subnivel asignado según la Sección 6 de PM-0" },
    { num: "A4", text: "Las competencias exigidas por las actividades están dentro del alcance del subnivel (no sobreexige)" },
    { num: "A5", text: "El vocabulario activo del PM proviene del Word Wall o del glosario del nivel correspondiente (PM-2.5)" },
    { num: "A6", text: "Los textos de input están adaptados al nivel: longitud, velocidad, densidad léxica" },
  ], "1A5276"),
  spacer(60),
  buildTraceabilitySection("B", "Trazabilidad pedagógica", [
    { num: "B1", text: "El PM incluye pre-enseñanza de vocabulario con al menos uno de los 4 propósitos (§ 5.7)" },
    { num: "B2", text: "El PM incluye drilling explícito (choral, sustitución y/o backchaining) donde corresponde (§ 5.6)" },
    { num: "B3", text: "El PM diferencia explícitamente los momentos de accuracy y fluency (§ 5.11)" },
    { num: "B4", text: "El PM gestiona el uso del L1 de manera consciente y señalada para el nivel (§ 5.12)" },
    { num: "B5", text: "El PM incluye trabajo de stress al introducir vocabulario nuevo (§ 5.13)" },
    { num: "B6", text: "El PM incluye un componente de producción personalizada (My Turn o equivalente) (§ 5.10)" },
    { num: "B7", text: "El PM incluye al menos un instrumento de autoevaluación (can-do / KWL / Gap Card) (§ 5.8)" },
    { num: "B8", text: "El PM proporciona andamiaje apropiado al subnivel (más andamiaje en A1.1, menos en A1.3)" },
  ], "117A65"),
  spacer(60),
  buildTraceabilitySection("C", "Trazabilidad de estructura de sesión", [
    { num: "C1", text: "El PM puede ubicarse en un bloque específico de la estructura de sesión FPI (§ 5.10)" },
    { num: "C2", text: "El tiempo estimado del PM es realista para el bloque al que pertenece" },
    { num: "C3", text: "El PM conecta de manera lógica con el PM precedente y el siguiente en la secuencia de la sesión" },
    { num: "C4", text: "El PM contribuye a la progresión de baja a alta complejidad cognitiva dentro de la sesión" },
  ], "7D6608"),
  spacer(60),
  buildTraceabilitySection("D", "Trazabilidad de evaluación", [
    { num: "D1", text: "El PM contribuye a la Misión Final (PM-3.5) de la guía" },
    { num: "D2", text: "Hay al menos un can-do statement asociado a este PM" },
    { num: "D3", text: "El criterio de evaluación está expresado en términos de desempeño observable ('puede hacer X')" },
    { num: "D4", text: "El criterio de evaluación es consistente con los descriptores CEFR del subnivel" },
  ], "6C3483"),
  spacer(80),
  buildTraceabilitySummaryTable(),
  spacer(60),
  body("Un PM con 1–2 ítems sin aprobar puede avanzar con observación documentada. Un PM con 3 o más ítems sin aprobar debe ser revisado antes de producción.", false, "555555"),

  // ── SECTION 8 ─────────────────────────────────────────────────────────────
  spacer(200),
  navyBanner("8. Hoja de Ruta del Sistema FPI — Alcance A1.1 → A2.x"),
  spacer(80),
  body("Esta sección describe qué cambia metodológicamente al escalar de subnivel. Su propósito es prevenir que diseñadores apliquen los principios de A1.1 a niveles superiores, o que asuman que lo que funciona en A1.3 es adecuado para A1.1."),
  spacer(60),
  buildRoadmapTable(),
  spacer(100),
  orangeLine("Señales de que el diseño está desajustado por nivel"),
  body("Sobreexigencia (el PM pide más de lo que el subnivel permite):", true),
  bulletItem("Textos de más de 10 oraciones en A1.1"),
  bulletItem("Producción libre sin andamiaje en A1.1 o A1.2"),
  bulletItem("Análisis de causa raíz en A1.1"),
  bulletItem("Velocidad de audio natural en A1.1 o A1.2"),
  spacer(60),
  body("Subexigencia (el PM no llega al piso del subnivel):", true),
  bulletItem("Solo reconocimiento de palabras aisladas en A1.2 o A1.3"),
  bulletItem("Ningún componente de producción oral en cualquier guía"),
  bulletItem("Andamiaje total (frames completos) en A1.3 o A2.x"),
  bulletItem("Ausencia de pensamiento crítico desde A1.2 en adelante"),

  // ── Closing banner
  spacer(160),
  new Paragraph({
    children: [new TextRun({
      text: "Este documento es la raíz del sistema FPI SENA. Todo PM que no pueda ser trazado a un descriptor CEFR o a un principio pedagógico de esta capa debe ser revisado antes de producción.",
      bold: true, color: WHITE, size: pt(10), font: "Calibri",
    })],
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    spacing: { before: 140, after: 140 },
    indent: { left: 200, right: 200 },
  }),
];

// ── Header / Footer ───────────────────────────────────────────────────────────
const header = new Header({
  children: [new Paragraph({
    children: [
      new TextRun({ text: "PM-0 · CEFR Framework & FPI SENA Pedagogical Foundation", size: pt(9), font: "Calibri", color: "888888" }),
      new TextRun({ text: "    |    FPI SENA Factory · LG Engine v2.0", size: pt(9), font: "Calibri", color: "AAAAAA" }),
    ],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ORANGE } },
    spacing: { after: 60 },
  })],
});

const footer = new Footer({
  children: [new Paragraph({
    children: [
      new TextRun({ text: "SENA · Sistema FPI — Capa Fundacional · Documento de referencia del sistema    |    ", size: pt(9), font: "Calibri", color: "888888" }),
      new TextRun({ text: "Pág. ", size: pt(9), font: "Calibri", color: "888888" }),
      new TextRun({ children: [PageNumber.CURRENT], size: pt(9), font: "Calibri", color: NAVY }),
    ],
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: ORANGE } },
    spacing: { before: 60 },
  })],
});

// ── Build & write ─────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 480, hanging: 240 } } },
      }],
    }],
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: pt(11), color: TEXT } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: 15840 },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    headers: { default: header },
    footers: { default: footer },
    children,
  }],
});

const OUT_RUN   = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/master-prompts/pm-0-cefr-foundation.docx";
const OUT_VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/pm-0-cefr-foundation.docx";

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT_RUN,   buf);
  fs.writeFileSync(OUT_VAULT, buf);
  console.log("✅  PM-0 written →", OUT_VAULT);
}).catch(err => { console.error("❌", err.message); process.exit(1); });
