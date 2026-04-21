// PM-3.3 — The Workshop Specialist | Guía 1.1
// LG Factory Engine v2.0 | DIESEL-2026-04-15
// pptxgenjs generation script

const pptxgen = require("/usr/local/lib/node_modules_global/lib/node_modules/pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "FPI SENA Factory — LG Engine v2.0";
pres.title = "PM-3.3 | The Workshop Specialist — Guía 1.1";

// ─── PALETTE ───────────────────────────────────────────────────────────────
const C = {
  dark:     "1C2B3C",  // dark steel navy (dominant)
  mid:      "243447",  // slightly lighter navy for cards on dark bgs
  orange:   "F59316",  // construction amber (sharp accent)
  white:    "FFFFFF",
  offwhite: "F3F5F7",  // light bg for content slides
  steel:    "8A9DB5",  // muted blue-grey (captions)
  light:    "D6E0EA",  // pale steel (body text on dark)
  sky:      "0EA5E9",  // reading/listening color
  green:    "22C55E",  // writing color
  purple:   "A855F7",  // language functions color
  red:      "E84545",  // speaking / alert color
  text:     "1A2535",  // dark text for light bgs
};

// Fresh shadow factory — never reuse objects (pptxgenjs mutates in-place)
const sh = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.18 });

// ─── FOOTER helper ─────────────────────────────────────────────────────────
function addFooter(s, dark = false) {
  const bg = dark ? C.orange : C.orange;
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.325, w: 10, h: 0.3, fill: { color: bg }, line: { color: bg } });
  s.addText("PM-3.3  ·  Guía 1.1 — The Workshop Specialist  ·  SENA DIESEL 2026", {
    x: 0.35, y: 5.325, w: 9.3, h: 0.3,
    fontSize: 8.5, fontFace: "Calibri", color: C.dark,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
}

// ─── SLIDE 1 — TITLE ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Left orange column (visual motif — repeated on all dark slides)
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.orange }, line: { color: C.orange } });

  // Top eyebrow
  s.addText("SENA  ·  PROGRAMA DE FORMACIÓN  ·  MANTENIMIENTO DE MOTORES DIESEL", {
    x: 0.45, y: 0.32, w: 9.2, h: 0.28,
    fontSize: 9, fontFace: "Calibri", color: C.steel,
    align: "left", margin: 0, charSpacing: 1,
  });

  // Main title — two lines
  s.addText([
    { text: "THE WORKSHOP", options: { breakLine: true } },
    { text: "SPECIALIST" },
  ], {
    x: 0.45, y: 0.7, w: 9.2, h: 2.0,
    fontSize: 64, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", valign: "top", margin: 0,
  });

  // Subtitle block
  s.addText("Guía 1.1", {
    x: 0.45, y: 2.82, w: 9.2, h: 0.5,
    fontSize: 26, fontFace: "Georgia", color: C.orange,
    italic: true, align: "left", margin: 0,
  });

  s.addText("CEFR A1.1 – A1.2  ·  GFPI-F-134  ·  8 Sessions · 2,880 min  ·  6 Formal Evidences", {
    x: 0.45, y: 3.42, w: 9.2, h: 0.32,
    fontSize: 12, fontFace: "Calibri", color: C.light,
    align: "left", margin: 0,
  });

  // Bottom strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.88, w: 10, h: 0.745, fill: { color: C.orange }, line: { color: C.orange } });
  s.addText("LG FACTORY ENGINE v2.0  ·  FPI SENA FACTORY  ·  RUN: DIESEL-2026-04-15", {
    x: 0.45, y: 4.9, w: 9.2, h: 0.55,
    fontSize: 11, fontFace: "Calibri", color: C.dark,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
}

// ─── SLIDE 2 — PROGRAM AT A GLANCE ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  // Header bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("PROGRAM AT A GLANCE", {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 22, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });

  // 4 stat cards
  const stats = [
    { val: "8",    sub: "Sessions",          detail: "360 min each / 2,880 total" },
    { val: "6",    sub: "Formal Evidences",  detail: "30 pts total + Final Mission" },
    { val: "20",   sub: "Toolbelt Terms",    detail: "5 categories / reusable cards" },
    { val: "A1.2", sub: "CEFR Target",       detail: "Entrance A1.1 → Exit A1.2" },
  ];

  stats.forEach((st, i) => {
    const x = 0.3 + i * 2.37;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.88, w: 2.15, h: 2.05, fill: { color: C.dark }, line: { color: C.dark }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.88, w: 2.15, h: 0.14, fill: { color: C.orange }, line: { color: C.orange } });
    s.addText(st.val, {
      x: x + 0.08, y: 0.98, w: 1.99, h: 0.95,
      fontSize: 48, fontFace: "Arial Black", color: C.orange,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.sub, {
      x: x + 0.08, y: 1.98, w: 1.99, h: 0.3,
      fontSize: 11, fontFace: "Arial Black", color: C.white,
      bold: true, align: "center", margin: 0,
    });
    s.addText(st.detail, {
      x: x + 0.08, y: 2.33, w: 1.99, h: 0.48,
      fontSize: 9, fontFace: "Calibri", color: C.steel,
      align: "center", margin: 0,
    });
  });

  // Description
  s.addText("WHAT IS THIS PROGRAM?", {
    x: 0.4, y: 3.12, w: 9.2, h: 0.32,
    fontSize: 13, fontFace: "Arial Black", color: C.dark,
    bold: true, align: "left", margin: 0,
  });
  s.addText(
    "Guía 1.1 — The Workshop Specialist is a fully scaffolded English language unit for SENA apprentices in Diesel Engine Maintenance. Built on the GFPI-F-134 pedagogical contract, it moves learners through four SENA phases — Análisis, Comprensión, Apropiación, and Transferencia — inside a single immersive narrative: The Diesel Workshop, Bay 2. Every session, material, and evaluation is grounded in authentic workplace communication.",
    {
      x: 0.4, y: 3.5, w: 9.2, h: 1.65,
      fontSize: 12.5, fontFace: "Calibri", color: C.text,
      align: "left", valign: "top", margin: 0,
    }
  );

  addFooter(s);
}

// ─── SLIDE 3 — NARRATIVE UNIVERSE ───────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.orange }, line: { color: C.orange } });

  s.addText("THE NARRATIVE UNIVERSE", {
    x: 0.45, y: 0.2, w: 9.1, h: 0.62,
    fontSize: 28, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", margin: 0,
  });
  s.addText("The Diesel Workshop — Bay 2  ·  Monday 7:00 AM  ·  Training day", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.28,
    fontSize: 13, fontFace: "Georgia", color: C.orange,
    italic: true, align: "left", margin: 0,
  });

  const chars = [
    {
      name: "CARLOS MENDOZA", title: "Workshop Supervisor", color: C.orange,
      lines: [
        "Represents workplace authority.",
        "Gives assignments and instructions.",
        "Speaks in imperatives and commands.",
        "Functions: F1 (instruct) · F4 (assign)",
        "Present in: All 8 sessions",
      ],
    },
    {
      name: "VALENTINA CRUZ", title: "Apprentice Technician", color: C.sky,
      lines: [
        "Primary learner-identification character.",
        "Asks questions and requests tools.",
        "Reports findings to the supervisor.",
        "Functions: F2 · F3 · F5",
        "Present in: All 8 sessions",
      ],
    },
    {
      name: "SANTIAGO RÍOS", title: "Senior Technician", color: "94A3B8",
      lines: [
        "Experienced peer and language model.",
        "Bridges novice to expert register.",
        "Demonstrates technical vocabulary.",
        "Functions: F1 · F3 · F4",
        "Present in: S4, S5, S7, S8",
      ],
    },
  ];

  chars.forEach((ch, i) => {
    const x = 0.38 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 2.98, h: 3.85, fill: { color: C.mid }, line: { color: C.mid }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 2.98, h: 0.18, fill: { color: ch.color }, line: { color: ch.color } });
    s.addText(ch.name, {
      x: x + 0.15, y: 1.52, w: 2.68, h: 0.44,
      fontSize: 14, fontFace: "Arial Black", color: C.white,
      bold: true, align: "left", margin: 0,
    });
    s.addText(ch.title, {
      x: x + 0.15, y: 1.99, w: 2.68, h: 0.26,
      fontSize: 10.5, fontFace: "Calibri", color: ch.color,
      bold: true, align: "left", margin: 0,
    });
    // Thin divider
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.32, w: 2.68, h: 0.025, fill: { color: C.steel }, line: { color: C.steel } });
    ch.lines.forEach((ln, j) => {
      s.addText(ln, {
        x: x + 0.15, y: 2.4 + j * 0.47, w: 2.68, h: 0.43,
        fontSize: 10.5, fontFace: "Calibri", color: j < 3 ? C.light : C.steel,
        italic: j >= 3, align: "left", margin: 0,
      });
    });
  });

  addFooter(s);
}

// ─── SLIDE 4 — THE TOOLBELT ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("THE TOOLBELT — 20 TERMS · 5 CATEGORIES", {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 21, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });

  const cats = [
    { cat: "ENVIRONMENT",      color: C.sky,    terms: ["bay", "workshop", "floor drain", "workbench", "overhead lift"] },
    { cat: "TOOLS & EQUIPMENT", color: C.orange, terms: ["torque wrench", "floor jack", "socket set", "oil drain pan", "pressure gauge"] },
    { cat: "SAFETY",           color: C.red,    terms: ["fire extinguisher", "PPE", "safety goggles", "spill kit", "hazard cone"] },
    { cat: "MAINTENANCE",      color: C.green,  terms: ["preventive maintenance", "calibration", "lubrication", "inspection", "filter replacement"] },
    { cat: "DOCUMENTS",        color: C.purple, terms: ["work order", "inspection checklist", "service log", "parts list", "daily report"] },
  ];

  // Row 1: 3 cards (cols 0-2), Row 2: 2 wider cards (cols 0-1)
  cats.forEach((cat, i) => {
    let x, y, w;
    if (i < 3) {
      x = 0.25 + i * 3.18; y = 0.85; w = 3.0;
    } else {
      x = 0.25 + (i - 3) * 4.88; y = 3.05; w = 4.62;
    }
    const h = 1.98;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.13, h, fill: { color: cat.color }, line: { color: cat.color } });

    s.addText(cat.cat, {
      x: x + 0.22, y: y + 0.1, w: w - 0.28, h: 0.3,
      fontSize: 10, fontFace: "Arial Black", color: cat.color,
      bold: true, align: "left", margin: 0,
    });

    cat.terms.forEach((term, j) => {
      s.addText("▸  " + term, {
        x: x + 0.22, y: y + 0.44 + j * 0.295, w: w - 0.28, h: 0.285,
        fontSize: 10.5, fontFace: "Calibri", color: C.text,
        align: "left", margin: 0,
      });
    });
  });

  addFooter(s);
}

// ─── SLIDE 5 — 5 LANGUAGE FUNCTIONS ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.orange }, line: { color: C.orange } });

  s.addText("5 LANGUAGE FUNCTIONS", {
    x: 0.45, y: 0.18, w: 9.1, h: 0.62,
    fontSize: 28, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", margin: 0,
  });
  s.addText("Core communicative targets — taught, drilled, and evaluated across Sessions 2–8", {
    x: 0.45, y: 0.82, w: 9.1, h: 0.27,
    fontSize: 12, fontFace: "Calibri", color: C.steel,
    align: "left", margin: 0,
  });

  const funcs = [
    { id: "F1", name: "Dar instrucciones",      grammar: "Imperative mood",                    ex: '"Check the oil. Close the valve. Secure the drain pan."',    sessions: "S2 · S5 · S8" },
    { id: "F2", name: "Solicitar herramientas", grammar: "Can / Could + modal request",        ex: '"Can I have the torque wrench, please?"',                     sessions: "S3 · S5 · S8" },
    { id: "F3", name: "Describir condiciones",  grammar: "There is / There are",               ex: '"There is an oil leak near Bay 2. There are two filters."',   sessions: "S2 · S4 · S5 · S8" },
    { id: "F4", name: "Reportar al supervisor", grammar: "Simple present + technical vocab",   ex: '"Bay 2 is ready. All items are checked and documented."',     sessions: "S4 · S5 · S8" },
    { id: "F5", name: "Confirmar comprensión",  grammar: "Clarification + affirmation",        ex: '"Do you mean the floor jack? — Yes, exactly. Understood."',   sessions: "S2 · S5 · S8" },
  ];

  funcs.forEach((f, i) => {
    const y = 1.2 + i * 0.835;

    // ID badge
    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y, w: 0.65, h: 0.68, fill: { color: C.orange }, line: { color: C.orange } });
    s.addText(f.id, {
      x: 0.45, y, w: 0.65, h: 0.68,
      fontSize: 17, fontFace: "Arial Black", color: C.dark,
      bold: true, align: "center", valign: "middle", margin: 0,
    });

    // Card body
    s.addShape(pres.shapes.RECTANGLE, { x: 1.2, y, w: 8.42, h: 0.68, fill: { color: C.mid }, line: { color: C.mid } });

    s.addText(f.name, {
      x: 1.32, y: y + 0.06, w: 2.9, h: 0.28,
      fontSize: 13, fontFace: "Arial Black", color: C.white,
      bold: true, align: "left", margin: 0,
    });
    s.addText(f.grammar, {
      x: 1.32, y: y + 0.37, w: 2.9, h: 0.22,
      fontSize: 10, fontFace: "Calibri", color: C.orange,
      align: "left", margin: 0,
    });
    s.addText(f.ex, {
      x: 4.35, y: y + 0.08, w: 4.65, h: 0.36,
      fontSize: 10.5, fontFace: "Georgia", color: C.light,
      italic: true, align: "left", valign: "middle", margin: 0,
    });
    s.addText("Sessions: " + f.sessions, {
      x: 4.35, y: y + 0.46, w: 4.65, h: 0.17,
      fontSize: 9, fontFace: "Calibri", color: C.steel,
      align: "left", margin: 0,
    });
  });

  addFooter(s);
}

// ─── SLIDE 6 — THE 8-SESSION ARC ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("THE 8-SESSION ARC", {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 22, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });

  // Column headers
  const hdrs = ["#", "SESSION NAME", "SENA PHASE", "SKILL DOMAIN", "EVIDENCE"];
  const colX = [0.22, 0.85, 3.82, 5.68, 8.38];
  const colW = [0.55, 2.9, 1.78, 2.62, 1.4];
  hdrs.forEach((h, i) => {
    s.addText(h, {
      x: colX[i], y: 0.78, w: colW[i], h: 0.28,
      fontSize: 8.5, fontFace: "Arial Black", color: C.steel,
      align: i === 0 ? "center" : "left", margin: 0, charSpacing: 0.5,
    });
  });

  const sessions = [
    { n: "S1", name: "The Workshop Comes Alive",  phase: "Análisis",      skill: "Listening / Oral",      ev: "—",            evColor: null },
    { n: "S2", name: "Read the Workshop",          phase: "Comprensión",   skill: "Reading",               ev: "E1",           evColor: C.sky },
    { n: "S3", name: "Write the Workshop",         phase: "Apropiación",   skill: "Writing",               ev: "E2",           evColor: C.green },
    { n: "S4", name: "Tuning In & Speaking Up",    phase: "Apropiación",   skill: "Listening + Speaking",  ev: "E3 + E4",      evColor: C.red },
    { n: "S5", name: "The Workshop in Action",     phase: "Apropiación",   skill: "Language Functions",    ev: "E5",           evColor: C.purple },
    { n: "S6", name: "Prove What You Know",        phase: "Apropiación",   skill: "All skills (Quiz)",     ev: "E6",           evColor: C.orange },
    { n: "S7", name: "Final Mission Prep",         phase: "Transferencia", skill: "Speaking (rehearsal)",  ev: "—",            evColor: null },
    { n: "S8", name: "The Full Circle",            phase: "Transferencia", skill: "Speaking (performance)", ev: "Final Mission", evColor: C.orange },
  ];

  const phaseColors = { "Análisis": C.sky, "Comprensión": C.green, "Apropiación": C.orange, "Transferencia": C.red };
  const badgeText = { [C.sky]: C.dark, [C.green]: C.dark, [C.orange]: C.dark, [C.red]: C.white, [C.purple]: C.white };

  sessions.forEach((ss, i) => {
    const y = 1.12 + i * 0.52;
    const rowBg = i % 2 === 0 ? "FFFFFF" : "EEF2F6";
    const nColor = phaseColors[ss.phase];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.22, y, w: 9.55, h: 0.46, fill: { color: rowBg }, line: { color: rowBg } });

    // Session badge
    s.addShape(pres.shapes.RECTANGLE, { x: 0.22, y, w: 0.55, h: 0.46, fill: { color: nColor }, line: { color: nColor } });
    s.addText(ss.n, {
      x: 0.22, y, w: 0.55, h: 0.46,
      fontSize: 12, fontFace: "Arial Black", color: badgeText[nColor] || C.dark,
      bold: true, align: "center", valign: "middle", margin: 0,
    });

    s.addText(ss.name, {
      x: 0.85, y: y + 0.06, w: 2.9, h: 0.34,
      fontSize: 11.5, fontFace: "Calibri", color: C.text,
      bold: true, align: "left", valign: "middle", margin: 0,
    });
    s.addText(ss.phase, {
      x: 3.82, y: y + 0.06, w: 1.78, h: 0.34,
      fontSize: 10, fontFace: "Calibri", color: nColor,
      bold: true, align: "left", valign: "middle", margin: 0,
    });
    s.addText(ss.skill, {
      x: 5.68, y: y + 0.06, w: 2.62, h: 0.34,
      fontSize: 10, fontFace: "Calibri", color: C.text,
      align: "left", valign: "middle", margin: 0,
    });

    if (ss.evColor) {
      s.addShape(pres.shapes.RECTANGLE, { x: 8.38, y: y + 0.06, w: 1.35, h: 0.34, fill: { color: ss.evColor }, line: { color: ss.evColor } });
      s.addText(ss.ev, {
        x: 8.38, y: y + 0.06, w: 1.35, h: 0.34,
        fontSize: 9.5, fontFace: "Arial Black", color: badgeText[ss.evColor] || C.dark,
        bold: true, align: "center", valign: "middle", margin: 0,
      });
    } else {
      s.addText("—", {
        x: 8.38, y: y + 0.06, w: 1.35, h: 0.34,
        fontSize: 10, fontFace: "Calibri", color: C.steel,
        align: "center", valign: "middle", margin: 0,
      });
    }
  });

  addFooter(s);
}

// ─── SLIDE 7 — 6 FORMAL EVIDENCES ───────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.orange }, line: { color: C.orange } });

  s.addText("6 FORMAL EVIDENCES + FINAL MISSION", {
    x: 0.45, y: 0.18, w: 9.1, h: 0.6,
    fontSize: 26, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", margin: 0,
  });
  s.addText("Each evidence activates a distinct skill domain  ·  5 pts each = 30 pts total  ·  + 5 pts Final Mission capstone", {
    x: 0.45, y: 0.8, w: 9.1, h: 0.27,
    fontSize: 11.5, fontFace: "Calibri", color: C.steel,
    align: "left", margin: 0,
  });

  const evs = [
    { id: "E1", name: "Reading Comprehension",   sess: "S2", inst: "Lista de chequeo No 1",     pts: "5 pts", color: C.sky,
      detail: "5 MC items · No Word Wall · Tests main idea, vocab in context, True/False, inference, structure" },
    { id: "E2", name: "Technical Writing",        sess: "S3", inst: "Lista de verificación No 2", pts: "5 pts", color: C.green,
      detail: "10 criteria × 0.5 pt · Daily Inspection Checklist + Work Order · Word Wall visible (product)" },
    { id: "E3", name: "Listening Comprehension",  sess: "S4", inst: "Lista de chequeo No 3",     pts: "5 pts", color: C.orange,
      detail: "5 MC items · 18-turn dialogue played once · No materials · Bay 2 Safety Briefing" },
    { id: "E4", name: "Speaking — Workshop Report", sess: "S4", inst: "Escala de estimación No 4", pts: "5 pts", color: C.red,
      detail: "5 holistic criteria · 60-65 sec report · Word Wall visible · 2 follow-up questions from bank" },
    { id: "E5", name: "Language Functions Simulation", sess: "S5", inst: "Escala de estimación No 5", pts: "5 pts", color: C.purple,
      detail: "5 criteria · Groups of 3 · 3-4 min simulation · Instructor + peer evaluation · F1–F5 assessed" },
    { id: "E6", name: "Cuestionario Consolidado", sess: "S6", inst: "Cuestionario No 6",         pts: "5 pts", color: C.red,
      detail: "25 items · 5 skill sections · 90 min · Zero materials · Reading / Vocab / Grammar / Listening / Functions" },
  ];

  evs.forEach((ev, i) => {
    const y = 1.15 + i * 0.695;

    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y, w: 0.72, h: 0.58, fill: { color: ev.color }, line: { color: ev.color } });
    s.addText(ev.id, {
      x: 0.45, y, w: 0.72, h: 0.58,
      fontSize: 17, fontFace: "Arial Black", color: C.dark,
      bold: true, align: "center", valign: "middle", margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 1.27, y, w: 8.33, h: 0.58, fill: { color: C.mid }, line: { color: C.mid } });

    s.addText(ev.name, {
      x: 1.38, y: y + 0.04, w: 3.2, h: 0.26,
      fontSize: 12, fontFace: "Arial Black", color: C.white,
      bold: true, align: "left", margin: 0,
    });
    s.addText(ev.sess + "  ·  " + ev.inst + "  ·  " + ev.pts, {
      x: 1.38, y: y + 0.33, w: 3.5, h: 0.2,
      fontSize: 9, fontFace: "Calibri", color: ev.color,
      align: "left", margin: 0,
    });
    s.addText(ev.detail, {
      x: 4.95, y: y + 0.08, w: 4.5, h: 0.42,
      fontSize: 9.5, fontFace: "Calibri", color: C.light,
      align: "left", valign: "middle", margin: 0,
    });
  });

  addFooter(s);
}

// ─── SLIDE 8 — CUESTIONARIO CONSOLIDADO ─────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("CUESTIONARIO CONSOLIDADO No 6 — EVIDENCE 6", {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 19, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });

  // Left: 5 sections
  s.addText("5 SKILL SECTIONS · 25 ITEMS TOTAL", {
    x: 0.35, y: 0.84, w: 4.8, h: 0.28,
    fontSize: 11, fontFace: "Arial Black", color: C.dark,
    bold: true, align: "left", margin: 0,
  });

  const sects = [
    { sec: "Section 1", name: "Reading",             items: "5 items · 5 pts", color: C.sky },
    { sec: "Section 2", name: "Vocabulary",           items: "5 items · 5 pts", color: C.green },
    { sec: "Section 3", name: "Grammar",              items: "5 items · 5 pts", color: C.orange },
    { sec: "Section 4", name: "Listening",            items: "5 items · 5 pts", color: C.red },
    { sec: "Section 5", name: "Language Functions",   items: "5 items · 5 pts", color: C.purple },
  ];

  sects.forEach((sec, i) => {
    const y = 1.2 + i * 0.76;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.7, h: 0.65, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.13, h: 0.65, fill: { color: sec.color }, line: { color: sec.color } });
    s.addText(sec.sec + " — " + sec.name, {
      x: 0.58, y: y + 0.08, w: 3.5, h: 0.26,
      fontSize: 12, fontFace: "Arial Black", color: C.text,
      bold: true, align: "left", margin: 0,
    });
    s.addText(sec.items + " · Multiple Choice", {
      x: 0.58, y: y + 0.38, w: 3.5, h: 0.2,
      fontSize: 9.5, fontFace: "Calibri", color: C.steel,
      align: "left", margin: 0,
    });
    s.addText("5", {
      x: 4.2, y: y + 0.08, w: 0.75, h: 0.47,
      fontSize: 26, fontFace: "Arial Black", color: sec.color,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
  });

  // Right: score bands
  s.addText("SCORE BANDS", {
    x: 5.5, y: 0.84, w: 4.1, h: 0.28,
    fontSize: 11, fontFace: "Arial Black", color: C.dark,
    bold: true, align: "left", margin: 0,
  });

  const bands = [
    { range: "23 – 25", label: "DESTACADO",  color: C.green },
    { range: "18 – 22", label: "COMPETENTE", color: C.sky },
    { range: "13 – 17", label: "BÁSICO",     color: C.orange },
    { range: "8 – 12",  label: "EN PROCESO", color: C.purple },
    { range: "0 – 7",   label: "NO LOGRADO", color: C.red },
  ];

  bands.forEach((b, i) => {
    const y = 1.2 + i * 0.76;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 4.1, h: 0.65, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 0.13, h: 0.65, fill: { color: b.color }, line: { color: b.color } });
    s.addText(b.range, {
      x: 5.72, y: y + 0.12, w: 1.5, h: 0.4,
      fontSize: 18, fontFace: "Arial Black", color: b.color,
      bold: true, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.label, {
      x: 7.3, y: y + 0.12, w: 2.15, h: 0.4,
      fontSize: 13, fontFace: "Calibri", color: C.text,
      bold: true, align: "left", valign: "middle", margin: 0,
    });
  });

  s.addText("90 min  ·  Zero materials  ·  Session 6  ·  Per-section remediation path if score < 3/5", {
    x: 0.35, y: 5.07, w: 9.3, h: 0.21,
    fontSize: 9, fontFace: "Calibri", color: C.steel,
    italic: true, align: "left", margin: 0,
  });

  addFooter(s);
}

// ─── SLIDE 9 — FINAL MISSION ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.orange }, line: { color: C.orange } });

  s.addText("THE FINAL MISSION", {
    x: 0.45, y: 0.18, w: 9.1, h: 0.6,
    fontSize: 28, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", margin: 0,
  });
  s.addText("Bay 2  ·  Monday 7:00 AM  ·  A Training Coordinator arrives at the workshop", {
    x: 0.45, y: 0.8, w: 9.1, h: 0.27,
    fontSize: 12, fontFace: "Georgia", color: C.orange,
    italic: true, align: "left", margin: 0,
  });

  // Left: task requirements
  s.addText("TASK REQUIREMENTS", {
    x: 0.45, y: 1.2, w: 4.65, h: 0.28,
    fontSize: 11, fontFace: "Arial Black", color: C.orange,
    bold: true, align: "left", margin: 0,
  });

  const reqs = [
    "Duration: 3 – 4 minutes per team",
    "Toolbelt terms: ≥ 15 of 20",
    "Exchanges: ≥ 3 per person",
    "There is / There are: × 3 minimum",
    "Imperatives: ≥ 2 instances",
    "Bay identification + clean close",
    "No reading from cards or scripts",
    "Follow-up question from instructor",
  ];

  reqs.forEach((r, i) => {
    s.addText("▸  " + r, {
      x: 0.45, y: 1.55 + i * 0.38, w: 4.65, h: 0.35,
      fontSize: 11, fontFace: "Calibri", color: C.light,
      align: "left", margin: 0,
    });
  });

  // Right: role cards
  s.addText("TEAM ROLES", {
    x: 5.4, y: 1.2, w: 4.25, h: 0.28,
    fontSize: 11, fontFace: "Arial Black", color: C.orange,
    bold: true, align: "left", margin: 0,
  });

  const roles = [
    { name: "Carlos Mendoza", title: "Workshop Supervisor",  funcs: "F1 (instruct) · F4 (report) · ≥ 4 instances" },
    { name: "Valentina Cruz",  title: "Apprentice Technician", funcs: "F2 (request) · F3 (describe) · F5 (confirm)" },
    { name: "Santiago Ríos",  title: "Senior Technician",   funcs: "F1 · F3 · F4 · ≥ 3 instances each" },
  ];

  roles.forEach((r, i) => {
    const y = 1.55 + i * 1.02;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y, w: 4.25, h: 0.88, fill: { color: C.mid }, line: { color: C.mid }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y, w: 0.12, h: 0.88, fill: { color: C.orange }, line: { color: C.orange } });
    s.addText(r.name, {
      x: 5.62, y: y + 0.08, w: 3.9, h: 0.3,
      fontSize: 14, fontFace: "Arial Black", color: C.white,
      bold: true, align: "left", margin: 0,
    });
    s.addText(r.title, {
      x: 5.62, y: y + 0.41, w: 3.9, h: 0.2,
      fontSize: 10, fontFace: "Calibri", color: C.orange,
      bold: true, align: "left", margin: 0,
    });
    s.addText(r.funcs, {
      x: 5.62, y: y + 0.62, w: 3.9, h: 0.18,
      fontSize: 9, fontFace: "Calibri", color: C.steel,
      align: "left", margin: 0,
    });
  });

  // Evaluation banner
  s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 4.65, w: 9.1, h: 0.5, fill: { color: C.mid }, line: { color: C.mid } });
  s.addText("Evaluation: Escala de estimación No 6  ·  6 criteria  ·  Holistic average 1–5  ·  ~8 min per team  ·  One prompt allowed (bay number only)", {
    x: 0.58, y: 4.67, w: 8.85, h: 0.46,
    fontSize: 10.5, fontFace: "Calibri", color: C.light,
    align: "left", valign: "middle", margin: 0,
  });

  addFooter(s);
}

// ─── SLIDE 10 — PEDAGOGICAL ARCHITECTURE ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("PEDAGOGICAL ARCHITECTURE", {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 22, fontFace: "Arial Black", color: C.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });

  // Left: SENA phases
  s.addText("SENA PHASES", {
    x: 0.35, y: 0.84, w: 4.7, h: 0.28,
    fontSize: 11, fontFace: "Arial Black", color: C.dark,
    bold: true, align: "left", margin: 0,
  });

  const phases = [
    { phase: "Análisis",       color: C.sky,    desc: "S1 — Activating prior knowledge · Gap Card pre-assessment · Narrative context launch" },
    { phase: "Comprensión",    color: C.green,  desc: "S2 — Receptive input · Word Wall construction · Reading evidence (E1)" },
    { phase: "Apropiación",    color: C.orange, desc: "S3–S6 — All productive skills · 4 formal evidences (E2–E5) · Cuestionario (E6)" },
    { phase: "Transferencia",  color: C.red,    desc: "S7–S8 — Dress rehearsal + live Final Mission · Full Circle reflection · Gap Card delta" },
  ];

  phases.forEach((p, i) => {
    const y = 1.18 + i * 0.95;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.65, h: 0.82, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.13, h: 0.82, fill: { color: p.color }, line: { color: p.color } });
    s.addText(p.phase, {
      x: 0.58, y: y + 0.1, w: 4.3, h: 0.27,
      fontSize: 13, fontFace: "Arial Black", color: p.color,
      bold: true, align: "left", margin: 0,
    });
    s.addText(p.desc, {
      x: 0.58, y: y + 0.42, w: 4.3, h: 0.35,
      fontSize: 9.5, fontFace: "Calibri", color: C.text,
      align: "left", margin: 0,
    });
  });

  // Right: design principles
  s.addText("DESIGN PRINCIPLES", {
    x: 5.35, y: 0.84, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: "Arial Black", color: C.dark,
    bold: true, align: "left", margin: 0,
  });

  const principles = [
    { title: "Tripartite Structure",    desc: "SET-UP (~25') · WHILE (5 blocks + BREAK 15') · WRAP-UP (~25') = exactly 360 min per session" },
    { title: "Economía Principle",      desc: "Reusable materials: Word Wall → Stock Cards → Gap Cards → Role Cards. Zero waste, maximum reactivation." },
    { title: "4 Activity Archetypes",   desc: "A: Genre Analysis · B: Modeled Performance · C: Independent Task · D: Peer Review / Simulation" },
    { title: "Full Circle Motif",       desc: "Same Gap Cards in S1 and S8 — learners re-rate themselves and calculate their own growth delta." },
  ];

  principles.forEach((p, i) => {
    const y = 1.18 + i * 0.95;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 4.3, h: 0.82, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }, shadow: sh() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 0.13, h: 0.82, fill: { color: C.orange }, line: { color: C.orange } });
    s.addText(p.title, {
      x: 5.58, y: y + 0.1, w: 3.95, h: 0.27,
      fontSize: 12, fontFace: "Arial Black", color: C.dark,
      bold: true, align: "left", margin: 0,
    });
    s.addText(p.desc, {
      x: 5.58, y: y + 0.42, w: 3.95, h: 0.35,
      fontSize: 9.5, fontFace: "Calibri", color: C.text,
      align: "left", margin: 0,
    });
  });

  addFooter(s);
}

// ─── SLIDE 11 — CLOSING / FULL CIRCLE ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.orange }, line: { color: C.orange } });

  // Large pull quote
  s.addText([
    { text: "\u201cSame cards.", options: { breakLine: true } },
    { text: "Same chart.", options: { breakLine: true } },
    { text: "Different person.\u201d", options: {} },
  ], {
    x: 0.55, y: 0.45, w: 9.0, h: 2.5,
    fontSize: 44, fontFace: "Georgia", color: C.white,
    italic: true, align: "left", valign: "top", margin: 0,
  });

  // Attribution
  s.addText("The Full Circle Principle — Session 8, Guía 1.1", {
    x: 0.55, y: 3.08, w: 9.0, h: 0.32,
    fontSize: 14, fontFace: "Calibri", color: C.orange,
    bold: true, align: "left", margin: 0,
  });

  // Body
  s.addText(
    "Apprentices end where they began — Bay 2, Monday 7:00 AM — but now they can speak, write, listen, and lead in English. The Gap Cards they rated in Session 1 become proof of growth in Session 8. Every material was designed to travel the full distance.",
    {
      x: 0.55, y: 3.5, w: 9.0, h: 1.15,
      fontSize: 13.5, fontFace: "Calibri", color: C.light,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Final banner
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.82, w: 10, h: 0.805, fill: { color: C.orange }, line: { color: C.orange } });
  s.addText("\u201cBay is closed. Checklist: complete.\u201d", {
    x: 0.45, y: 4.84, w: 9.2, h: 0.62,
    fontSize: 22, fontFace: "Arial Black", color: C.dark,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
}

// ─── WRITE FILE ─────────────────────────────────────────────────────────────
const OUT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-15/pm-3-3-deck.pptx";

pres.writeFile({ fileName: OUT })
  .then(() => console.log("✅  PM-3.3 deck written → " + OUT))
  .catch((err) => { console.error("❌  Error:", err); process.exit(1); });
