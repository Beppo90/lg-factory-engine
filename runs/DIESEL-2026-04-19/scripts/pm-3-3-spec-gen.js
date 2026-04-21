"use strict";
// pm-3-3-spec-gen.js
// Genera pm-3-3-spec.json — especificación slide-por-slide para Canva Deck
// Run: DIESEL-2026-04-19 | Guía 1.1 — The Workshop Specialist
// Fuente de verdad: pm-3-1.json + pm-3-2-s1..s8.json + pm-3-6.json

const fs = require("fs");
const BASE = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19";
const VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const s = v => (v && typeof v === "string") ? v.trim() : "";
const trunc = (v, n) => s(v).length > n ? s(v).slice(0, n) + "…" : s(v);

function slide(num, session, momento, type, block, title, content, layout, design_notes, speaker_notes) {
  return { slide: num, session, momento, type, block: block || null,
    title, content: Array.isArray(content) ? content : [content],
    layout, design_notes: design_notes || "", speaker_notes: speaker_notes || "" };
}

// ─── LOAD SOURCES ────────────────────────────────────────────────────────────
const pm31  = JSON.parse(fs.readFileSync(`${BASE}/pm-3-1.json`, "utf8"));
const pm36  = JSON.parse(fs.readFileSync(`${BASE}/pm-3-6.json`, "utf8"));
const sessions = {};
for (let i = 1; i <= 8; i++) {
  sessions[i] = JSON.parse(fs.readFileSync(`${BASE}/pm-3-2-s${i}.json`, "utf8"));
}

// Helper: get bloque from session (handles old S1-3 and new S4-8 format)
function getBloque(sess, letra) {
  if (sess <= 3) {
    const wh = sessions[sess].while || {};
    return (wh.bloques || []).find(b => b.letra === letra) || {};
  } else {
    const sp = sessions[sess].session_plan || {};
    return sp[`while_${letra.toLowerCase()}`] || {};
  }
}

function getSetUp(sess) { return sessions[sess].set_up || (sessions[sess].session_plan || {}).set_up || {}; }
function getWrapUp(sess) { return sessions[sess].wrap_up || (sessions[sess].session_plan || {}).wrap_up || {}; }

// ─── SLIDE DEFINITIONS ───────────────────────────────────────────────────────
const slides = [];
let n = 0; // slide counter

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — PORTADA
// ══════════════════════════════════════════════════════════════════════════════
slides.push(slide(++n, 0, "PORTADA", "cover", null,
  "The Workshop Specialist",
  [
    "Mantenimiento de Motores Diesel",
    "Guía de Aprendizaje No 1.1 — CEFR A1.1",
    "RAP 220501096 — Comunicar información técnica en inglés",
    "SENA · Programa: Mantenimiento de Motores Diesel",
  ],
  "cover",
  "Fondo navy #1C2B3C. Título en blanco bold 48pt. Subtítulo naranja #F59316 36pt. Logo SENA esquina inferior derecha. Imagen de fondo: taller diesel con mecánico en PPE (translucent overlay 40%).",
  "Primera slide — proyectar mientras los aprendices entran al taller."
));

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — RUTA DE 8 SESIONES
// ══════════════════════════════════════════════════════════════════════════════
slides.push(slide(++n, 0, "PANORAMA", "overview", null,
  "Our 8-Session Journey",
  [
    "S1  The Wake-Up Call         →  Análisis",
    "S2  Reading the Workshop     →  Comprensión     E1 Reading",
    "S3  Write It Right           →  Apropiación     E2 Writing",
    "S4  Tuning In & Speaking Up  →  Apropiación     E3 Listening + E4 Speaking",
    "S5  The Workshop in Action   →  Apropiación     E5 Functions",
    "S6  Prove What You Know      →  Evaluación      E6 Consolidado (25 pts)",
    "S7  Final Mission Prep       →  Transferencia",
    "S8  The Full Circle          →  Transferencia   Final Mission",
  ],
  "table",
  "Tabla 2 columnas. Sesiones con evidencia marcadas en naranja. Fondo blanco, encabezado navy. Fuente Calibri 20pt.",
  "Mostrar al inicio del curso y al inicio de cada sesión nueva — el instructor señala 'Hoy estamos aquí'."
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 1 — The Wake-Up Call
// ══════════════════════════════════════════════════════════════════════════════
const s1 = sessions[1];
const s1_su = getSetUp(1);
const s1_wu = getWrapUp(1);
const s1_bA = getBloque(1, "A");
const s1_bB = getBloque(1, "B");
const s1_bC = getBloque(1, "C");
const s1_bD = getBloque(1, "D");
const s1_bE = getBloque(1, "E");

// S1 Title
slides.push(slide(++n, 1, "APERTURA", "session_title", null,
  "Session 1: The Wake-Up Call",
  [
    "Momento SENA: Reflexión Inicial",
    "Objetivo: Activar conocimiento previo del taller diesel",
    "Estrategia: Aprendizaje Basado en Problemas + Estudio de Casos",
    "Habilidades foco: Speaking · Listening",
    "Duración: 6 horas · 5 bloques",
  ],
  "title",
  "Fondo navy completo. Título blanco 40pt. Bullet points naranja 24pt. Número de sesión en esquina superior izquierda en naranja grande (S1).",
  "Proyectar al inicio de la sesión 1. Instructor lee objetivo en voz alta."
));

// S1 SET-UP
slides.push(slide(++n, 1, "SET-UP", "set_up", null,
  "SET-UP: Welcome to the Bay",
  [
    "Teacher Talk: \"Look around — this is a diesel workshop.\"",
    "\"What do you see? What do you know?\"",
    "\"Today we meet the workshop — and the team.\"",
    "► Warm-up: 3 things you can name in English — GO!",
    "Time: 20 min | Whole group",
  ],
  "content",
  "Fondo blanco. Título navy 32pt. Teacher talk en italics. Flecha naranja para instrucción de actividad. Imagen pequeña: taller diesel.",
  "Instructor anuncia la actividad de warm-up. No corrección — solo activación."
));

// S1 Bloque A — Safety
slides.push(slide(++n, 1, "WHILE", "while", "A",
  "[A] Safety First: The Hazard Hunt",
  [
    "Técnica: Análisis de situación problémica",
    trunc(s1_bA.objetivo, 120),
    "► Task: Find 3 hazards in the workshop image. Name them in English.",
    "Time: 50 min | Pairs → Plenary",
    "Key words: hazard · spill · PPE · fire extinguisher",
  ],
  "content",
  "Imagen grande: workshop con hazards marcados con círculos rojos. Vocabulario en caja naranja lateral. Instrucciones bold.",
  "Si no hay imagen del taller real, usar foto de taller diesel genérico de Creative Commons."
));

// S1 Bloque B — Workshop Geography
slides.push(slide(++n, 1, "WHILE", "while", "B",
  "[B] The Workshop Map",
  [
    "Técnica: Observación activa y descripción guiada",
    "Areas: service bay · workbench · toolbox · storage",
    "Grammar: 'The [tool] is IN/ON/NEXT TO the [area].'",
    "► Task: Label the workshop map. Use the Word Wall.",
    "Time: 60 min | Groups of 3",
  ],
  "split",
  "Layout split: izquierda = mapa del taller (imagen etiquetable). Derecha = tabla de preposiciones navy. Palabras clave en naranja.",
  "El mapa puede ser un diagrama simple dibujado — no necesita ser fotografía."
));

// S1 Bloque C-D — Characters + Diagnosis
slides.push(slide(++n, 1, "WHILE", "while", "C",
  "[C] Meet the Team",
  [
    "Carlos Mendoza — Supervisor",
    "Valentina Cruz — Apprentice",
    "Santiago Ríos — Senior Technician",
    "Técnica: Debate argumentativo",
    "► 'Who is responsible for safety in the bay?' — Discuss.",
    "Time: 70 min | Groups → Plenary",
  ],
  "content",
  "Tres tarjetas de personaje lado a lado: foto placeholder + nombre + rol. Fondo blanco. Nombres en navy bold. Pregunta debate en caja naranja.",
  "Los personajes aparecerán en todas las sesiones — establecer desde S1."
));

slides.push(slide(++n, 1, "WHILE", "while", "D",
  "[D] KWL + Gap Analysis",
  [
    "Técnica: KWL Chart / Diagnóstico / Entrevista de pares",
    "K — What I KNOW about diesel maintenance in English",
    "W — What I WANT to learn",
    "L — What I will LEARN (fill at end of guide)",
    "► Interview your partner: 'Do you know how to say ___?'",
    "Time: 70 min | Individual → Pairs",
  ],
  "table",
  "Tabla KWL 3 columnas en slide. Columna L vacía — se llena en S8. Encabezados navy, filas alternadas gris claro.",
  "Distribuir la hoja KWL impresa del workbook. La slide es el modelo."
));

// S1 WRAP-UP
const s1_wu_et = s1_wu.exit_ticket || {};
slides.push(slide(++n, 1, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 1 Checkpoint",
  [
    "Exit Ticket: Write OR draw 1 English word you learned today.",
    "Trabajo autónomo: Workbook Cap. 1 — REINFORCE (30 min)",
    "Preview S2: 'Next session — we READ the workshop.'",
    "► Bay is closed for S1. ✓",
  ],
  "content",
  "Fondo navy suave. Ícono de check en naranja. Exit ticket en caja blanca con borde naranja. Preview en italics.",
  "Instructor recoge el exit ticket físico antes de que salgan."
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 2 — Reading the Workshop
// ══════════════════════════════════════════════════════════════════════════════
const s2 = sessions[2];
const s2_wu = getWrapUp(2);
const s2_art = s2.motor_age_article || {};

// S2 Title
slides.push(slide(++n, 2, "APERTURA", "session_title", null,
  "Session 2: Reading the Workshop",
  [
    "Momento SENA: Reflexión Inicial → Contextualización",
    "Objetivo: Leer y comprender texto técnico A1.1",
    "Estrategia: Aprendizaje Basado en Tareas",
    "Habilidades foco: Reading (E1)",
    "Evidencia: E1 — Lista de Chequeo No 1 (5 pts)",
  ],
  "title",
  "Fondo navy. S2 naranja esquina superior. Evidencia E1 resaltada en caja naranja.",
  ""
));

// S2 Word Wall
slides.push(slide(++n, 2, "WHILE", "while", "A",
  "[A] Toolbelt: 20 Essential Terms",
  [
    "ENVIRONMENT:  workshop · service bay · workbench · toolbox",
    "TOOLS:        wrench · ratchet · socket · torque wrench · floor jack",
    "SAFETY:       PPE · safety goggles · gloves · hazard · spill · fire extinguisher",
    "MAINTENANCE:  preventive maintenance · corrective maintenance",
    "DOCUMENTS:    work order · checklist · calibration",
    "Técnica: Flashcard Battle — individual → pairs → speed round",
    "Time: 60 min",
  ],
  "table",
  "Tabla 5 categorías con código de color: ENVIRONMENT=azul, TOOLS=naranja, SAFETY=rojo, MAINTENANCE=verde, DOCUMENTS=gris. Fuente Calibri 18pt. Fondo blanco.",
  "Esta slide es la Word Wall maestra — aparece como referencia durante toda la sesión."
));

// S2 Reading Article
slides.push(slide(++n, 2, "WHILE", "while", "B",
  "[B] Reading: Tools Every Diesel Technician Needs",
  [
    "Source: Adapted from Motor Age · CEFR A1.1",
    "Section 1: Hand Tools — The Basics",
    "Section 2: Power Tools and Safety",
    "Section 3: Measuring and Documents",
    "► Jigsaw: each group reads ONE section → teaches the class.",
    "Time: 70 min | Groups of 3",
  ],
  "content",
  "Imagen: portada Motor Age (o placeholder de revista técnica). Tres secciones en tarjetas de color (una por grupo). Instrucciones jigsaw en caja naranja.",
  "Distribuir el texto impreso. Esta slide introduce la actividad — NO proyectar el texto completo."
));

// S2 Category Race
slides.push(slide(++n, 2, "WHILE", "while", "C",
  "[C] Category Race + Gap Fill",
  [
    "► Sort the 20 terms into 5 categories — FASTEST PAIR WINS.",
    "► Then: complete the sentences — use the article, NOT the Word Wall.",
    "Example: 'The _______ lifts the vehicle safely.' (floor jack)",
    "Técnica: Competencia colaborativa de clasificación",
    "Time: 60 min | Pairs → Plenary review",
  ],
  "content",
  "Cronómetro visual grande. Tabla de categorías vacía (para completar). Instrucción en naranja bold.",
  ""
));

// S2 Cuestionario E1
slides.push(slide(++n, 2, "WHILE", "while", "D",
  "[D] Evidencia 1 — Lista de Chequeo No 1",
  [
    "► CLOSE your article. CLOSE your Word Wall.",
    "5 questions — multiple choice — individual — silent.",
    "Time: 20 min | No notes allowed.",
    "⚠️ This is Evidencia 1 (E1) — 5 points.",
    "When done: place face-down on desk.",
  ],
  "minimal",
  "Slide mínima: solo instrucciones clave. Fondo blanco. Ícono de candado indicando 'closed notes'. Sin vocabulario visible.",
  "El instructor distribuye el instrumento impreso PM-4.1. Recoger ANTES de revisar respuestas."
));

// S2 Wrap-up
slides.push(slide(++n, 2, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 2 Checkpoint",
  [
    "Exit Ticket: 'Name 1 TOOL and 1 SAFETY item from the article.'",
    "Revisión rápida: instrumento E1 — respuestas orales en plenary.",
    "Trabajo autónomo: Workbook Cap. 2 — REINFORCE (30 min)",
    "Preview S3: 'Next — we WRITE the workshop.'",
    "► Bay is closed for S2. ✓",
  ],
  "content",
  "Fondo navy. Check naranja. Preview en italics.",
  ""
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 3 — Write It Right
// ══════════════════════════════════════════════════════════════════════════════
const s3 = sessions[3];
const s3_wu = getWrapUp(3);

slides.push(slide(++n, 3, "APERTURA", "session_title", null,
  "Session 3: Write It Right",
  [
    "Momento SENA: Contextualización",
    "Objetivo: Producir texto técnico escrito en inglés",
    "Estrategia: Aprendizaje Basado en Tareas",
    "Habilidades foco: Writing (E2)",
    "Evidencia: E2 — Lista de Verificación No 2 (5 pts / 10 criterios)",
  ],
  "title",
  "Fondo navy. S3 naranja. E2 en caja naranja.",
  ""
));

slides.push(slide(++n, 3, "WHILE", "while", "A",
  "[A] Writing Model: Work Order",
  [
    "A work order has 4 parts:",
    "1. Vehicle info  (make · model · year · VIN)",
    "2. Problem reported  ('The engine does not start.')",
    "3. Work to do  ('Check fuel system. Replace filter.')",
    "4. Technician signature  + date",
    "► Study the model — then write your own.",
    "Time: 70 min | Individual",
  ],
  "split",
  "Layout split: izquierda = modelo de work order completo. Derecha = trabajo del estudiante (en blanco con líneas). Partes numeradas con iconos.",
  "El workbook tiene la plantilla impresa. Esta slide es el modelo de referencia."
));

slides.push(slide(++n, 3, "WHILE", "while", "B",
  "[B] Checklist Writing Task",
  [
    "Write a PREVENTIVE MAINTENANCE checklist for a diesel engine.",
    "Minimum 8 items. Use action verbs: check · replace · inspect · clean · test",
    "Format: ☐ Check engine oil level",
    "Técnica: Escritura guiada con andamiaje léxico",
    "Time: 60 min | Individual → Peer review",
  ],
  "content",
  "Ícono de checklist grande. Lista de verbos de acción en caja azul. Ejemplo de ítem en verde.",
  ""
));

slides.push(slide(++n, 3, "WHILE", "while", "C",
  "[C] Peer Editing + Evidencia 2",
  [
    "► Exchange checklists with your partner.",
    "Evaluar: ¿Tiene 8+ ítems? ¿Usa verbos de acción? ¿Inglés correcto?",
    "Lista de Verificación No 2 — 10 criterios — instructor evalúa.",
    "⚠️ Evidencia 2 (E2) — 5 puntos.",
    "Time: 70 min | Pairs → Instructor collection",
  ],
  "content",
  "Tabla de 10 criterios resumida (mini). Ícono de lápiz de revisión. Instrucción en naranja.",
  ""
));

// S3 Wrap-up
slides.push(slide(++n, 3, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 3 Checkpoint",
  [
    "Exit Ticket: 'Write 2 items for a safety checklist — 10 seconds.'",
    "Trabajo autónomo: Workbook Cap. 3 — REINFORCE (30 min)",
    "Preview S4: 'Next — we LISTEN and SPEAK.'",
    "► Bay is closed for S3. ✓",
  ],
  "content",
  "Fondo navy. Check naranja.",
  ""
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 4 — Tuning In & Speaking Up
// ══════════════════════════════════════════════════════════════════════════════
const s4 = sessions[4];
const s4_sp = s4.session_plan || {};

slides.push(slide(++n, 4, "APERTURA", "session_title", null,
  "Session 4: Tuning In & Speaking Up",
  [
    "Momento SENA: Apropiación",
    "Objetivo: Comprender diálogo técnico + producir habla contextualizada",
    "Estrategia: Tareas + Simulaciones",
    "Habilidades foco: Listening (E3) · Speaking (E4)",
    "Evidencias: E3 — Lista de Chequeo No 3 · E4 — Escala No 4 (10 pts)",
  ],
  "title",
  "Fondo navy. S4 naranja. Dos evidencias en cajas naranja lado a lado.",
  ""
));

slides.push(slide(++n, 4, "WHILE", "while", "A",
  "[A] Pre-Listening: Scene Setup",
  [
    "Técnica: Activación de esquemas previos / Predicción",
    "Characters: Carlos (Supervisor) · Valentina (Apprentice)",
    "Location: Service Bay 3 — Monday morning",
    "Topic: Workshop Readiness Check",
    "► Predict: What does Carlos say to Valentina? Write 1 sentence.",
    "Time: 35 min | Individual → Pairs",
  ],
  "content",
  "Imagen de escena: supervisor y aprendiz en taller. Personajes etiquetados. Caja de predicción en blanco.",
  ""
));

slides.push(slide(++n, 4, "WHILE", "while", "B",
  "[B] Listen 1 — Global Comprehension",
  [
    "🎧 Listen 1: What is the topic of the conversation?",
    "(a) Engine repair  (b) Safety check  (c) Work order  (d) Tool inventory",
  ],
  "minimal",
  "Slide mínima. Ícono auriculares grande centrado. Una sola pregunta. Fondo blanco sin distractores. Fuente 32pt.",
  "SILENCIO total durante la escucha. No proyectar vocabulario."
));

slides.push(slide(++n, 4, "WHILE", "while", "B",
  "[B] Listen 2 — Specific Information",
  [
    "🎧 Listen 2: What 3 items does Carlos check on the list?",
    "Write the items — use the exact words you hear.",
  ],
  "minimal",
  "Igual que anterior. Dos líneas para escribir respuesta.",
  "Segunda escucha — más detalle. Estudiantes escriben mientras escuchan."
));

slides.push(slide(++n, 4, "WHILE", "while", "C",
  "[C] Evidencia 3 — Lista de Chequeo No 3",
  [
    "⚠️ CLOSED NOTES — NO AUDIO AGAIN.",
    "5 questions — multiple choice — individual — silent.",
    "Based on the dialogue you heard.",
    "Time: 20 min | Evidencia 3 (E3) — 5 points.",
  ],
  "minimal",
  "Slide mínima. Ícono candado. Sin contexto adicional que ayude.",
  "El instructor distribuye instrumento PM-4.1. Recoger antes de continuar."
));

slides.push(slide(++n, 4, "WHILE", "while", "D",
  "[D] Workshop Readiness Check — Speaking Task",
  [
    "Técnica: Simulación comunicativa",
    "Role A: Supervisor Carlos — run the checklist.",
    "Role B: Apprentice Valentina — answer and confirm.",
    "Use: 'Is the __ ready?' / 'Yes, it is.' / 'Not yet — I need to ___.'",
    "⚠️ Evidencia 4 (E4) — Escala de Estimación No 4 — 5 pts.",
    "Time: 80 min | Pairs — instructor observes + rates",
  ],
  "split",
  "Layout split: izquierda = dialogue frame con frases modelo. Derecha = checklist de roles. Borde naranja.",
  "El instructor evalúa con Escala No 4 mientras circula. Mínimo 2 pares por instructor."
));

slides.push(slide(++n, 4, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 4 Checkpoint",
  [
    "Exit Ticket: 'Name 1 phrase you used in the Speaking task.'",
    "Trabajo autónomo: Workbook Cap. 4 — REINFORCE (30 min)",
    "Preview S5: 'Next — Language in Action: 5 Functions.'",
    "► Bay is closed for S4. ✓  (E3 + E4 collected)",
  ],
  "content",
  "Fondo navy. Dos checks naranjas indicando E3 y E4 completadas.",
  ""
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 5 — The Workshop in Action
// ══════════════════════════════════════════════════════════════════════════════
const s5 = sessions[5];
const s5_sp = s5.session_plan || {};

slides.push(slide(++n, 5, "APERTURA", "session_title", null,
  "Session 5: The Workshop in Action",
  [
    "Momento SENA: Apropiación",
    "Objetivo: Usar las 5 Funciones Comunicativas en contexto real",
    "Estrategia: Simulaciones + Tareas",
    "Habilidades foco: Speaking · Language Functions (E5)",
    "Evidencia: E5 — Escala de Estimación No 5 (5 pts)",
  ],
  "title",
  "Fondo navy. S5 naranja. E5 en caja naranja.",
  ""
));

slides.push(slide(++n, 5, "WHILE", "while", "A",
  "[A] The 5 Functions — Language Toolkit",
  [
    "F1  Dar instrucciones     'Check the oil level first.'",
    "F2  Solicitar acción      'Can you hand me the torque wrench?'",
    "F3  Describir condiciones 'The engine is making a strange noise.'",
    "F4  Reportar al supervisor 'The floor jack is not working.'",
    "F5  Confirmar comprensión 'Got it. I'll replace the filter now.'",
    "Técnica: Modelado + práctica guiada",
    "Time: 50 min | Whole group → Pairs",
  ],
  "table",
  "Tabla 2 columnas: Función | Ejemplo. Cada función en color diferente. Fuente 20pt. Ejemplos en italics.",
  "Esta tabla aparece como referencia en varias actividades — mantener visible."
));

slides.push(slide(++n, 5, "WHILE", "while", "B",
  "[B] Function Cards — Matching + Production",
  [
    "► Match the situation to the correct function (F1–F5).",
    "► Then: create your own sentence for each function.",
    "Context: Carlos and Valentina — Monday inspection of Bay 3.",
    "Técnica: Aprendizaje basado en tareas comunicativas",
    "Time: 80 min | Individual → Pairs → Plenary",
  ],
  "content",
  "Tarjetas de situación en pantalla (5 situaciones). Espacio de producción en el workbook.",
  ""
));

slides.push(slide(++n, 5, "WHILE", "while", "C",
  "[C] Simulation — The Full Inspection",
  [
    "Scenario: Valentina is new. Carlos runs the full inspection.",
    "Use ALL 5 functions during the simulation.",
    "⚠️ Evidencia 5 (E5) — Escala de Estimación No 5 — 5 pts.",
    "Instructor rates: fluency · vocabulary · functions used.",
    "Time: 100 min | Groups of 3 — instructor observes",
  ],
  "content",
  "Diagrama de roles: tres personajes con flechas de interacción. Escala de evaluación mini en lateral.",
  "El instructor evalúa con Escala No 5 mientras circula. Si hay grupos de 4, Santiago Ríos se añade como observador."
));

slides.push(slide(++n, 5, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 5 Checkpoint",
  [
    "Exit Ticket: 'Write 1 sentence for F3 (Describe a condition).'",
    "Trabajo autónomo: Workbook Cap. 5 — REINFORCE + EXTEND (45 min)",
    "Preview S6: 'Next — Prove What You Know. Cuestionario 25 pts.'",
    "► Bay is closed for S5. ✓  (E5 collected)",
  ],
  "content",
  "Fondo navy. Check naranja E5. Preview en negrita.",
  ""
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 6 — Prove What You Know
// ══════════════════════════════════════════════════════════════════════════════
const s6 = sessions[6];
const s6_sp = s6.session_plan || {};

slides.push(slide(++n, 6, "APERTURA", "session_title", null,
  "Session 6: Prove What You Know",
  [
    "Momento SENA: Apropiación — Evaluación Formativa Integradora",
    "Objetivo: Consolidar las 5 habilidades en evaluación integradora",
    "Estrategia: Seminario Investigativo + Evaluación Formativa",
    "Habilidades: Reading · Writing · Listening · Speaking · Functions",
    "Evidencia: E6 — Cuestionario Consolidado No 6 — 25 pts",
  ],
  "title",
  "Fondo navy. S6 naranja. E6 en caja naranja GRANDE — es la evidencia mayor.",
  ""
));

slides.push(slide(++n, 6, "WHILE", "while", "A",
  "[A] Review Stations — Skill Rotation",
  [
    "Station 1: Vocabulary — Toolbelt 20 terms flashcard review",
    "Station 2: Reading — skim text, answer 2 questions",
    "Station 3: Functions — match situation to F1–F5",
    "Station 4: Listening — listen once, note 2 key words",
    "Station 5: Writing — complete the work order (1 field each)",
    "Time: 80 min | 16 min per station | Groups rotate",
  ],
  "table",
  "Tabla 5 estaciones con iconos. Flecha de rotación. Tiempo en naranja bold.",
  ""
));

slides.push(slide(++n, 6, "WHILE", "while", "B",
  "[B] Consolidation — Santiago's Debrief",
  [
    "Santiago Ríos: 'Before the big test — ask your last question.'",
    "Q&A round: 10 min open questions — any topic from S1–S5.",
    "Technique: Hot Seat — instructor answers as Santiago Ríos.",
    "Técnica: Seminario investigativo",
    "Time: 60 min | Whole group",
  ],
  "content",
  "Foto/ícono Santiago Ríos en hot seat. Fondo con pregunta mark grande. Ambiente distendido.",
  "El instructor puede salir del rol de Santiago si la pregunta no tiene respuesta en el nivel A1.1."
));

slides.push(slide(++n, 6, "WHILE", "while", "C",
  "[C] Evidencia 6 — Cuestionario Consolidado No 6",
  [
    "⚠️ 25 POINTS — 5 SECTIONS — 5 ITEMS EACH — INDIVIDUAL.",
    "Section 1: Vocabulary (5 pts)  Section 2: Reading (5 pts)",
    "Section 3: Listening (5 pts)  Section 4: Writing (5 pts)",
    "Section 5: Functions (5 pts)",
    "CLOSED NOTES — CLOSED BOOK — 60 MINUTES.",
    "When done: place face-down. DO NOT SHARE ANSWERS.",
  ],
  "minimal",
  "Slide de instrucciones MÍNIMA. Texto grande, sin imágenes. Número 25 en naranja GRANDE central. Fondo blanco.",
  "Distribuir PM-4.2. Silencio total. El instructor supervisa activamente."
));

slides.push(slide(++n, 6, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 6 — Score Bands",
  [
    "23–25 pts: Destacado    — Dominio sólido A1.1",
    "18–22 pts: Competente   — A1.1 logrado con áreas menores",
    "13–17 pts: Básico       — A1.1 parcial — refuerzo recomendado",
    " 8–12 pts: En proceso   — Revisión específica necesaria",
    " 0– 7 pts: No logrado   — Acompañamiento individualizado",
    "Preview S7: 'Final Mission preparation begins.'",
  ],
  "table",
  "Tabla de bandas 3 columnas. Colores: verde=Destacado, azul=Competente, amarillo=Básico, naranja=En proceso, rojo=No logrado. Fuente 20pt.",
  "Instructor NO lee los resultados individuales en voz alta. Se entregan en privado."
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 7 — Final Mission Preparation
// ══════════════════════════════════════════════════════════════════════════════
const s7 = sessions[7];
const s7_sp = s7.session_plan || {};

slides.push(slide(++n, 7, "APERTURA", "session_title", null,
  "Session 7: Final Mission Preparation",
  [
    "Momento SENA: Transferencia — Preparación",
    "Objetivo: Preparar la Misión Final — integrar las 5 habilidades",
    "Estrategia: Simulaciones + Aprendizaje Basado en Tareas",
    "Habilidades: All skills integrated",
    "Sin evidencia formal — es preparación y ensayo.",
  ],
  "title",
  "Fondo navy. S7 naranja. 'No formal evidence' en gris claro — no en naranja.",
  ""
));

slides.push(slide(++n, 7, "WHILE", "while", "A",
  "[A] Mission Brief — The Full Inspection Report",
  [
    "MISSION: You are the Workshop Specialist.",
    "You must: (1) Inspect Bay 3, (2) Write the Work Order,",
    "(3) Report to supervisor in English, (4) Confirm with apprentice.",
    "Products: written report + oral presentation + peer checklist.",
    "► Read the Mission Brief in PM-3.5. Highlight your role.",
    "Time: 70 min | Individual read → Group discussion",
  ],
  "content",
  "Ícono de misión (estrella o badge). Mission brief en caja con borde naranja. Pasos numerados en navy.",
  ""
));

slides.push(slide(++n, 7, "WHILE", "while", "B",
  "[B] Rehearsal — Dress Run",
  [
    "► Run the Full Inspection — with feedback.",
    "Observer checklist: Did they use F1–F5? All 5 Toolbelt categories?",
    "Feedback: 'You used F1 and F3 well. Practice F4 — reporting.'",
    "Técnica: Simulación con retroalimentación entre pares",
    "Time: 80 min | Groups of 3 — rotate roles",
  ],
  "content",
  "Diagrama de roles rotación. Caja de feedback con lápiz ícono.",
  ""
));

slides.push(slide(++n, 7, "WRAP-UP", "wrap_up", null,
  "WRAP-UP: Session 7 — Final Checklist",
  [
    "Before S8 — confirm you can:",
    "☐ Name 20 Toolbelt terms without the Word Wall",
    "☐ Write a work order with 4 sections",
    "☐ Use F1–F5 in real workshop situations",
    "☐ Report to supervisor in English — clear and confident",
    "Trabajo autónomo: Workbook EXTEND — Full Mission Prep (45 min)",
  ],
  "content",
  "Checklist visual con cuadros para marcar. Fondo blanco. Check items en navy. Tarea autónoma en caja naranja.",
  ""
));

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 8 — The Full Circle
// ══════════════════════════════════════════════════════════════════════════════
const s8 = sessions[8];
const s8_sp = s8.session_plan || {};

slides.push(slide(++n, 8, "APERTURA", "session_title", null,
  "Session 8: The Full Circle",
  [
    "Momento SENA: Transferencia — Performance Final",
    "Objetivo: Demostrar dominio integrado A1.1 en contexto real",
    "Estrategia: Simulación Auténtica",
    "Evidencia: E7 — Misión Final — Escala de Estimación No 6 (5 pts / 6 criterios)",
    "Total acumulado: 55 puntos",
  ],
  "title",
  "Fondo navy. S8 naranja. 'THE FULL CIRCLE' en blanco grande 44pt. E7 + 55 pts en caja naranja.",
  ""
));

slides.push(slide(++n, 8, "WHILE", "while", "A",
  "[A] Final Mission — The Workshop Specialist",
  [
    "SCENARIO: Bay 3 — Full Monday Inspection.",
    "Your role: Workshop Specialist — you run the show.",
    "TASK 1: Inspect and document — write the Work Order.",
    "TASK 2: Report to Carlos (Supervisor) — oral + formal.",
    "TASK 3: Debrief Valentina — confirm understanding.",
    "⚠️ Instructor evaluates with Escala No 6 — 6 criteria.",
  ],
  "content",
  "Imagen del taller. Badge de Workshop Specialist. Tres tareas en cajas numeradas navy. Escala resumida en lateral.",
  "El instructor evalúa mientras circula con Escala No 6 del PM-4.1. NO interrumpir la simulación."
));

slides.push(slide(++n, 8, "WHILE", "while", "B",
  "[B] KWL Closing + Reflection",
  [
    "Remember the KWL from S1?",
    "L — What did you LEARN? Complete the last column now.",
    "'I came in knowing: ___. I leave knowing: ___.'",
    "'In English, I can now: ___.'",
    "Técnica: Cierre metacognitivo",
    "Time: 60 min | Individual → Sharing circle",
  ],
  "content",
  "Tabla KWL con columna L para completar. Imagen de círculo de reflexión.",
  ""
));

// Final closing slide
slides.push(slide(++n, 8, "CIERRE", "closing", null,
  "Bay is closed. Checklist: complete.",
  [
    "✓  E1 Reading       ✓  E2 Writing",
    "✓  E3 Listening     ✓  E4 Speaking",
    "✓  E5 Functions     ✓  E6 Consolidado (25 pts)",
    "✓  E7 Final Mission",
    "Total: 55 points — DIESEL-2026-04-19 — The Workshop Specialist",
    "SENA · Mantenimiento de Motores Diesel · Guía 1.1",
  ],
  "closing",
  "Fondo navy oscuro. Checks en naranja uno por uno. Línea final en blanco italic. Logo SENA centrado en inferior. Sin imágenes — solo tipografía elegante.",
  "Última slide. Proyectar durante el aplauso final y mientras el grupo sale."
));

// ─── GENERATE SPEC JSON ──────────────────────────────────────────────────────
const spec = {
  pm_id: "PM-3.3",
  run_id: "DIESEL-2026-04-19",
  guide: "Guía 1.1 — The Workshop Specialist",
  programa: "Mantenimiento de Motores Diesel",
  cefr: "A1.1",
  rap_code: "220501096",
  generated_at: new Date().toISOString().slice(0, 10),
  total_slides: slides.length,
  brand: {
    primary: "#1C2B3C",
    accent: "#F59316",
    white: "#FFFFFF",
    light_gray: "#F2F2F2",
    fonts: { heading: "Arial Bold", body: "Calibri" },
    logo: "SENA — esquina inferior derecha en todas las slides",
    min_font_size_pt: 20,
  },
  slide_types: {
    cover: "Portada del programa — 1 slide",
    overview: "Panorama de 8 sesiones — 1 slide",
    session_title: "Apertura de cada sesión — fondo navy completo",
    set_up: "Warm-up y apertura de sesión",
    while: "Actividades del WHILE — bloques A-E",
    wrap_up: "Cierre de sesión — exit ticket + preview",
    minimal: "Cuestionario/evidencia — solo instrucciones, sin distractores",
    closing: "Slide final del programa",
  },
  design_rules: [
    "1 presentación por guía — no separar por sesión",
    "Máximo 7 líneas de texto por slide",
    "Slides de evidencia formal (E1-E7): mínimas — sin vocabulario visible",
    "Word Wall (S2-A): tabla de categorías con código de color",
    "Funciones (S5-A): tabla fija — volver a ella cuando sea necesario",
    "Listening slides: SOLO pregunta guía + ícono auriculares",
    "Título de sesión: fondo navy completo + S# naranja grande",
    "Logo SENA: todas las slides, esquina inferior derecha",
    "Contraste mínimo 4.5:1 para accesibilidad",
    "Fuente mínima 20pt — legible desde el fondo del salón",
  ],
  canva_integration: {
    design_type: "presentation",
    suggested_dimensions: "1920x1080 (16:9)",
    brand_kit: "SENA-FPI — navy #1C2B3C, orange #F59316",
    template_note: "Crear 4 master layouts: cover / session_title / content / minimal. Todos los slides derivan de estos 4.",
  },
  slides,
};

// ─── OUTPUT ──────────────────────────────────────────────────────────────────
const json = JSON.stringify(spec, null, 2);
const OUT1 = `${BASE}/pm-3-3-spec.json`;
const OUT2 = `${VAULT}/pm-3-3-spec.json`;

fs.writeFileSync(OUT1, json);
fs.writeFileSync(OUT2, json);

console.log(`✓ PM-3.3 Spec generated — ${slides.length} slides`);
console.log(`  → ${OUT1}`);
console.log(`  → ${OUT2}`);

// Print summary
const bySession = {};
slides.forEach(sl => {
  const k = sl.session === 0 ? "General" : `S${sl.session}`;
  bySession[k] = (bySession[k] || 0) + 1;
});
console.log("\nSlide count by session:");
Object.entries(bySession).forEach(([k, v]) => console.log(`  ${k}: ${v} slides`));
