#!/usr/bin/env node
/**
 * rewrite_activities_v27.js
 * ---------------------------------------------------------------
 * Migrador v2.6.3 → v2.7 (Activity Card — Learner-Readable Anatomy)
 *
 * Versión: PILOTO — acotado a 3 actividades representativas
 *   · A3.1.2     → sin evidencia (cognitiva · pre-diagnóstico)
 *   · A3.3.S2.4  → con evidencia E1 (cognitiva · reading quiz)
 *   · A3.4.1     → sin evidencia (FM · planning cognitiva+actitudinal)
 *
 * Modos:
 *   --dry-run      produce migration-report-v27.md sin tocar pm-3-6.json
 *   --apply        escribe pm-3-6.json (crea backup .pre-v27.bak)
 *   --activity ID  procesa sólo una actividad (override del piloto)
 *   --report-only  sólo regenera el .md desde el estado actual
 *
 * Salvaguardas:
 *   · idempotente — si schema_version === "v2.7" el activity se salta
 *   · validación run_id === "MGV-2026-04-20"
 *   · backup obligatorio antes de cualquier --apply
 *
 * Fuente de verdad pedagógica: Activity Card — Schema §10 (v2.7)
 */

const fs = require('fs');
const path = require('path');

// ───────────────────────────────────────────────────────────────────
// Configuración
// ───────────────────────────────────────────────────────────────────

const RUN_ID = 'MGV-2026-04-20';
const RUN_DIR = path.resolve(__dirname, '..');
const PM36_PATH = path.join(RUN_DIR, 'pm-3-6.json');
const REPORT_PATH = path.join(RUN_DIR, 'migration-report-v27.md');
const BACKUP_PATH = path.join(RUN_DIR, 'pm-3-6.json.pre-v27.bak');

const PILOTO_IDS = ['A3.1.2', 'A3.3.S2.4', 'A3.4.1'];

// Batches v2.7 — Paso 4 Escalar migración (piloto → full 30 actividades)
const BATCHES = {
  piloto: PILOTO_IDS,
  A: ['A3.1.1', 'A3.2.1', 'A3.2.2', 'A3.2.3', 'A3.3.S2.1', 'A3.3.S2.2', 'A3.3.S2.3'], // S1 + S2 (7)
  B: ['A3.3.S3.1', 'A3.3.S3.2', 'A3.3.S3.3', 'A3.3.S3.4', 'A3.3.S4.1', 'A3.3.S4.2', 'A3.3.S4.3', 'A3.3.S4.4'], // S3 + S4 (8, incl. E2/E3/E4)
  C: ['A3.3.S5.1', 'A3.3.S5.2', 'A3.3.S5.3', 'A3.3.S5.4', 'A3.3b.1', 'A3.3b.2', 'A3.3b.3', 'A3.3b.4'], // S5 + S6 (8, incl. E5/E6)
  D: ['A3.4.2', 'A3.4.3', 'A3.4.4', 'A3.4.5'], // FM S6½-S8 (4)
};

// ───────────────────────────────────────────────────────────────────
// CLI args
// ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const MODE = {
  dryRun:     args.includes('--dry-run'),
  apply:      args.includes('--apply'),
  reportOnly: args.includes('--report-only'),
  activity:   (() => {
    const i = args.indexOf('--activity');
    return i >= 0 ? args[i + 1] : null;
  })(),
  batch:      (() => {
    const i = args.indexOf('--batch');
    return i >= 0 ? args[i + 1] : null;
  })(),
};

if (!MODE.dryRun && !MODE.apply && !MODE.reportOnly) {
  console.error('ERROR: especifica --dry-run o --apply (o --report-only)');
  process.exit(2);
}

let TARGETS;
if (MODE.activity) {
  TARGETS = [MODE.activity];
} else if (MODE.batch) {
  if (!BATCHES[MODE.batch]) {
    console.error(`ERROR: --batch ${MODE.batch} desconocido. Opciones: ${Object.keys(BATCHES).join(', ')}`);
    process.exit(2);
  }
  TARGETS = BATCHES[MODE.batch];
} else {
  TARGETS = PILOTO_IDS;
}

// ───────────────────────────────────────────────────────────────────
// Heurísticas V+O+C (EN gerund-less · ES infinitivo · ≤200 char)
// ───────────────────────────────────────────────────────────────────
// Estas propuestas son DRAFTS. El usuario las revisa conversacionalmente
// y las aprueba o edita antes del --apply.

const VOC_DRAFTS = {
  'A3.1.2': {
    en: 'Recognize your starting vocabulary level through a 20-term matching pre-diagnostic',
    es: 'Reconocer tu nivel inicial de vocabulario mediante un pre-diagnóstico de emparejamiento de 20 términos',
    rationale: 'cognitiva · diagnostic archetype → verbo "recognize/reconocer"; objeto "vocabulary level"; condición "through 20-term matching"',
  },
  'A3.3.S2.4': {
    en: 'Demonstrate reading comprehension of "The Story of Two Fonts" through a 5-item quiz',
    es: 'Demostrar comprensión lectora del texto "The Story of Two Fonts" mediante un cuestionario de 5 ítems',
    rationale: 'cognitiva · quiz formal E1 → verbo "demonstrate/demostrar" (evaluación); objeto "reading comprehension"; condición "through 5-item quiz"',
  },
  'A3.4.1': {
    en: 'Plan your graphic proposal direction through analysis of Sophia\'s brief',
    es: 'Planear la dirección de tu propuesta gráfica mediante el análisis del brief de Sophia',
    rationale: 'cognitiva+actitudinal · FM planning → verbo "plan/planear"; objeto "proposal direction"; condición "through brief analysis"',
  },

  // ── BATCH A · S1 + S2 ─────────────────────────────────────────
  'A3.1.1': {
    en: 'Activate your designer\u2019s eye by choosing one visual reference and naming it in English with a single precise word',
    es: 'Activar tu mirada de diseñador eligiendo una referencia visual y nombrándola en inglés con una sola palabra precisa',
    rationale: 'cognitiva+actitudinal · Image Walk → verbo "activate/activar" (despertar mirada); objeto "designer\'s eye"; condición "single English word"',
  },
  'A3.2.1': {
    en: 'Situate yourself inside Pixel & Ink studio by identifying the four team members and connecting each one to their role',
    es: 'Situarte dentro del estudio Pixel & Ink identificando a los cuatro miembros del equipo y conectando a cada uno con su rol',
    rationale: 'cognitiva+actitudinal · Studio Tour → verbo "situate/situarte"; objeto "studio team"; condición "identifying 4 members + roles"',
  },
  'A3.2.2': {
    en: 'Differentiate studio roles by rotating through four stations and matching each team member with the action they perform',
    es: 'Diferenciar los roles del estudio rotando por cuatro estaciones y emparejando a cada miembro del equipo con la acción que realiza',
    rationale: 'cognitiva+procedimental · carousel → verbo "differentiate/diferenciar"; objeto "studio roles"; condición "4 stations matching"',
  },
  'A3.2.3': {
    en: 'Articulate why naming visual elements in English matters for a designer through a personal written reflection',
    es: 'Articular por qué nombrar elementos visuales en inglés importa para un diseñador mediante una reflexión escrita personal',
    rationale: 'actitudinal · bridge/reflexión → verbo "articulate/articular"; objeto "why vocabulary matters"; condición "personal written reflection"',
  },
  'A3.3.S2.1': {
    en: 'Build the designer\u2019s Toolbelt by placing twenty visual-language terms into five categories with an English justification',
    es: 'Construir el Toolbelt del diseñador ubicando veinte términos del lenguaje visual en cinco categorías con una justificación en inglés',
    rationale: 'cognitiva+procedimental · Word Wall 5×4 → verbo "build/construir"; objeto "Toolbelt"; condición "20 terms into 5 categories"',
  },
  'A3.3.S2.2': {
    en: 'Decode the Master Anchor text through a jigsaw in which you become an expert in one section and teach it to your base group',
    es: 'Decodificar el texto ancla mediante un rompecabezas en el que te vuelves experto en una sección y se la enseñas a tu grupo base',
    rationale: 'cognitiva+procedimental · Jigsaw reading → verbo "decode/decodificar"; objeto "anchor text"; condición "jigsaw expert → base group"',
  },
  'A3.3.S2.3': {
    en: 'Classify twelve real visual samples as Serif or Sans-Serif and justify each placement with a precise short phrase in English',
    es: 'Clasificar doce muestras visuales reales como Serif o Sans-Serif y justificar cada ubicación con una frase corta y precisa en inglés',
    rationale: 'cognitiva · classification drill → verbo "classify/clasificar"; objeto "12 samples"; condición "Serif/Sans-Serif + justification"',
  },

  // ── BATCH B · S3 + S4 ─────────────────────────────────────────
  'A3.3.S3.1': {
    en: 'Train the two grammar habits of every designer sentence — THIS/THAT + adjective-before-noun — across ten visual prompts',
    es: 'Entrenar los dos hábitos gramaticales de toda oración de diseñador — THIS/THAT + adjetivo-antes-del-sustantivo — con diez estímulos visuales',
    rationale: 'cognitiva+procedimental · consciousness-raising Gr1+Gr4 → verbo "train/entrenar"; objeto "two grammar habits"; condición "10 visual prompts"',
  },
  'A3.3.S3.2': {
    en: 'Decode Andrés\u2019 sample Font Card by highlighting the 4 target grammar pieces with colors and counting each one on the box',
    es: 'Decodificar la Font Card de Andrés subrayando con colores las 4 piezas gramaticales target y contando cada una en el cuadro',
    rationale: 'cognitiva · modelado guiado → verbo "decode/decodificar"; objeto "sample Font Card"; condición "4 colored highlights + count box"',
  },
  'A3.3.S3.3': {
    en: 'Produce your own Font Card by choosing one font from the shelf and filling the template with name, family, three adjectives and target grammar',
    es: 'Producir tu propia Font Card eligiendo una fuente del estante y completando la plantilla con nombre, familia, tres adjetivos y la gramática target',
    rationale: 'procedimental · producción escrita → verbo "produce/producir"; objeto "own Font Card"; condición "template + name + family + 3 adj + grammar"',
  },
  'A3.3.S3.4': {
    en: 'Submit your final Design Decision Email after applying a partner\u2019s five-point peer review with one concrete suggestion',
    es: 'Entregar tu Design Decision Email final después de aplicar la revisión de pares de cinco puntos y una sugerencia concreta de un compañero',
    rationale: 'cognitiva+procedimental+actitudinal · E2 Evidencia → verbo "submit/entregar"; objeto "final Design Decision Email"; condición "5-item peer review + 1 suggestion applied"',
  },
  'A3.3.S4.1': {
    en: 'Label the Color Wheel by matching twelve colors with their English names and classifying each one as warm or cool',
    es: 'Rotular la rueda cromática emparejando doce colores con sus nombres en inglés y clasificando cada uno como cálido o frío',
    rationale: 'cognitiva · activación léxica → verbo "label/rotular"; objeto "Color Wheel"; condición "12 colors matched + warm/cool classification"',
  },
  'A3.3.S4.2': {
    en: 'Capture the Sophia-Laura voice exchange on a listening sheet by recording six colors, six temperatures and three gap sentences',
    es: 'Capturar el intercambio de voz Sophia-Laura en una hoja de escucha registrando seis colores, seis temperaturas y tres oraciones con huecos',
    rationale: 'cognitiva · E3 Evidencia → verbo "capture/capturar"; objeto "Sophia-Laura voice exchange"; condición "6 colors + 6 temps + 3 gaps"',
  },
  'A3.3.S4.3': {
    en: 'Drill the pronunciation of the four designer words — serif, sans-serif, canvas, palette — with IPA, self-recording and peer rating',
    es: 'Entrenar la pronunciación de las cuatro palabras del diseñador — serif, sans-serif, canvas, palette — con AFI, autograbación y coevaluación',
    rationale: 'procedimental · drilling fonético → verbo "drill/entrenar"; objeto "4 designer words"; condición "IPA + self-recording + peer rating"',
  },
  'A3.3.S4.4': {
    en: 'Perform your first studio conversation by playing the Junior Designer presenting one visual reference to Sophia in three clean English turns',
    es: 'Realizar tu primera conversación de estudio haciendo el papel del Junior Designer al presentar una referencia visual a Sophia en tres turnos limpios en inglés',
    rationale: 'procedimental+actitudinal · E4 Evidencia → verbo "perform/realizar"; objeto "first studio conversation"; condición "3-turn roleplay Junior→Sophia in EN"',
  },

  // ── BATCH C · S5 + S6 ─────────────────────────────────────────
  'A3.3.S5.1': {
    en: 'Train your ear on two tiny connectors — AND and BUT — by writing ten designer sentences that respect the addition-versus-opposition rule',
    es: 'Entrenar tu oído con dos conectores diminutos — AND y BUT — escribiendo diez oraciones de diseñador que respeten la regla suma-contra-oposición',
    rationale: 'cognitiva · connector awareness → verbo "train/entrenar"; objeto "two connectors AND/BUT"; condición "10 designer sentences + rule"',
  },
  'A3.3.S5.2': {
    en: 'Cycle through five communicative functions — F1 Greet, F2 Identify, F3 Describe, F4 Instruct, F5 Express likes — capturing your best attempt per function with a rotating partner',
    es: 'Recorrer cinco funciones comunicativas — F1 Saludar, F2 Identificar, F3 Describir, F4 Instruir, F5 Expresar gustos — capturando tu mejor intento por función con un compañero rotativo',
    rationale: 'cognitiva+procedimental · drill rotativo → verbo "cycle/recorrer"; objeto "5 functions F1-F5"; condición "best attempt per function + rotating partner"',
  },
  'A3.3.S5.3': {
    en: 'Perform the five communicative functions live — ninety seconds per station — while the instructor scores your delivery with Escala No 5',
    es: 'Ejecutar las cinco funciones comunicativas en vivo — noventa segundos por estación — mientras el instructor califica tu desempeño con la Escala No 5',
    rationale: 'procedimental+actitudinal · E5 Evidencia → verbo "perform/ejecutar"; objeto "5 functions live"; condición "90 sec per station + Escala No 5"',
  },
  'A3.3.S5.4': {
    en: 'Name the friction by choosing the one communicative function that gave you the most trouble and writing two sentences on what and why',
    es: 'Nombrar la fricción eligiendo la función comunicativa que te costó más y escribiendo dos oraciones sobre cuál y por qué',
    rationale: 'actitudinal · reflexión metacognitiva → verbo "name/nombrar"; objeto "the friction"; condición "which function + why in 2 sentences"',
  },
  'A3.3b.1': {
    en: 'Audit your five pieces of evidence with the instructor by confirming each one is present, signed, and ready for the consolidated quiz',
    es: 'Auditar tus cinco evidencias con el instructor confirmando que cada una esté presente, firmada y lista para el cuestionario consolidado',
    rationale: 'cognitiva+actitudinal · auditoría de portafolio → verbo "audit/auditar"; objeto "5 pieces of evidence"; condición "present + signed + ready"',
  },
  'A3.3b.2': {
    en: 'Demonstrate integrated cognitive mastery by answering the twenty-five-item consolidated quiz across reading, writing, listening, vocabulary, and grammar',
    es: 'Demostrar dominio cognitivo integrado respondiendo el cuestionario consolidado de veinticinco ítems en lectura, escritura, escucha, vocabulario y gramática',
    rationale: 'cognitiva · E6 Evidencia · integrative → verbo "demonstrate/demostrar"; objeto "25-item consolidated quiz"; condición "5 sections × 5 items"',
  },
  'A3.3b.3': {
    en: 'Close the Apropiación phase with peers by presenting your portfolio, awarding one design star, and writing your personal leap sentence from Session 1 to Session 6',
    es: 'Cerrar la fase de Apropiación con los compañeros presentando tu portafolio, otorgando una estrella de diseño y escribiendo tu oración personal del salto de la Sesión 1 a la Sesión 6',
    rationale: 'actitudinal · peer closure → verbo "close/cerrar"; objeto "Apropiación phase with peers"; condición "portfolio + star + leap sentence"',
  },
  'A3.3b.4': {
    en: 'Commit to your Final Mission direction by reading the brief in silence and writing one sentence that starts with "For the Final Mission, I will…"',
    es: 'Comprometerte con el rumbo de tu Misión Final leyendo el brief en silencio y escribiendo una oración que empiece con "For the Final Mission, I will…"',
    rationale: 'actitudinal · puente/compromiso → verbo "commit/comprometerte"; objeto "Final Mission direction"; condición "1 sentence starting with framing"',
  },

  // ── BATCH D · Final Mission S6½-S8 ───────────────────────────
  'A3.4.2': {
    en: 'Hunt down six real visual references — one per category — tagging each with a source and a short English label before a peer scout',
    es: 'Cazar seis referencias visuales reales — una por categoría — etiquetando cada una con fuente y una etiqueta corta en inglés antes de una auditoría de par',
    rationale: 'cognitiva+procedimental · FM design hunt → verbo "hunt down/cazar"; objeto "6 visual references"; condición "source + EN label + peer scout"',
  },
  'A3.4.3': {
    en: 'Build your A3 Mood Board by arranging six references and writing the FINAL English label for each — two to four A1.1 sentences with BE + IN + adjective-before-noun',
    es: 'Construir tu Mood Board en A3 ubicando seis referencias y escribiendo la etiqueta FINAL en inglés para cada una — dos a cuatro oraciones A1.1 con BE + IN + adjetivo-antes-del-sustantivo',
    rationale: 'procedimental · FM build → verbo "build/construir"; objeto "A3 Mood Board"; condición "6 refs + FINAL EN labels + A1.1 grammar"',
  },
  'A3.4.4': {
    en: 'Pitch your Mood Board to Sophia in a live two-minute performance structured as greet, describe three references, and close with one visual recommendation',
    es: 'Presentar tu Mood Board a Sophia en una ejecución en vivo de dos minutos estructurada como saludo, descripción de tres referencias y cierre con una recomendación visual',
    rationale: 'procedimental+actitudinal · FM pitch → verbo "pitch/presentar"; objeto "Mood Board a Sophia"; condición "live 2-min · 3-move structure"',
  },
  'A3.4.5': {
    en: 'Close your Final Mission by self-rating five aspects with emoji, awarding one design star to a peer with a reason, and writing one take-away sentence',
    es: 'Cerrar tu Misión Final autoevaluándote en cinco aspectos con emoji, otorgando una estrella de diseño a un compañero con una razón y escribiendo una oración de aprendizaje',
    rationale: 'actitudinal · closing reflection → verbo "close/cerrar"; objeto "Final Mission"; condición "5 emoji + peer star + 1 take-away"',
  },
};

// ───────────────────────────────────────────────────────────────────
// Heurísticas Descripción narrativa (60–120 palabras · 3 movimientos)
// ───────────────────────────────────────────────────────────────────
// Estructura: movimiento 1 (qué vas a hacer) · movimiento 2 (por qué
// importa) · movimiento 3 (qué sale al final / promesa)

const NARRATIVA_DRAFTS = {
  'A3.1.2': {
    en: `Before we dive into the Motor Graphic Vehicles universe, you\u2019ll measure where you\u2019re starting from. You will face twenty graphic-design terms — words like kerning, serif, grayscale, palette — and match each one to its visual or definitional pair. This is not an evaluation; it\u2019s a mirror. Knowing which terms already live in your vocabulary lets you notice which new ones you\u2019ll capture across the next sessions. At the end of this pre-diagnostic, you\u2019ll own a personal baseline: the ten or twelve terms that feel shaky today and that you\u2019ll watch grow stronger through the week.`,
    es: `Antes de entrar al universo de Motor Graphic Vehicles, vas a medir desde dónde arrancas. Te vas a encontrar con veinte términos del diseño gráfico — palabras como kerning, serif, grayscale, paleta — y vas a emparejar cada uno con su pareja visual o de significado. Esto no es una evaluación; es un espejo. Saber qué términos ya viven en tu vocabulario te deja notar cuáles vas a capturar en las próximas sesiones. Al terminar este pre-diagnóstico, vas a tener una línea base personal: los diez o doce términos que hoy sientes flojos y que vas a ver crecer durante la semana.`,
    rationale: 'EN=101 palabras · ES=107 palabras · movs: qué (matching 20 términos) / por qué (espejo, no evaluación) / promesa (baseline personal)',
  },
  'A3.3.S2.4': {
    en: `This is the first formal evidence of your guide. You\u2019ll answer a short quiz — five questions, about fifteen minutes — built directly from the reading you worked with in Session 2: "The Story of Two Fonts." The quiz doesn\u2019t ask you to memorize; it asks you to show that you understood the plot, the two font personalities, and the small technical lexicon the story carried. Each question gives you one point, for a total of five. Your instructor will use a checklist to mark your answers, and you\u2019ll receive feedback pointing to which reading skills felt solid and which we\u2019ll reinforce in the next session.`,
    es: `Esta es la primera evidencia formal de tu guía. Vas a responder un cuestionario corto — cinco preguntas, unos quince minutos — construido directamente a partir de la lectura que trabajaste en la Sesión 2: "The Story of Two Fonts." El cuestionario no te pide memorizar; te pide mostrar que entendiste la trama, las dos personalidades tipográficas y el pequeño léxico técnico que el cuento traía. Cada pregunta vale un punto, para un total de cinco. Tu instructor usará una lista de chequeo para marcar tus respuestas, y vas a recibir retroalimentación señalando qué habilidades lectoras te salieron sólidas y cuáles vamos a reforzar en la siguiente sesión.`,
    rationale: 'EN=114 palabras · ES=117 palabras · movs: qué (quiz 5 preguntas) / por qué (no memorizar, comprender) / promesa (feedback + siguiente paso)',
  },
  'A3.4.1': {
    en: `This is where your Final Mission begins. Sophia, the creative director of the studio, has just landed a client brief for Motor Graphic Vehicles, and she\u2019s handing it to you. Your job in this session is not to design yet — it\u2019s to read her brief carefully, identify the three non-negotiable constraints (audience, palette, deadline), and decide what direction your graphic proposal will take. You\u2019ll use the Planning Canvas embedded in Apéndice F to capture your initial positioning. By the end of this activity, you\u2019ll walk out with a clear declaration of where you\u2019re heading — the seed of everything you\u2019ll design across Sessions 7 and 8.`,
    es: `Aquí empieza tu Misión Final. Sophia, la directora creativa del estudio, acaba de recibir un brief de cliente para Motor Graphic Vehicles, y te lo está pasando a ti. Tu trabajo en esta sesión no es diseñar todavía — es leer su brief con cuidado, identificar las tres restricciones no negociables (audiencia, paleta, fecha de entrega) y decidir qué rumbo va a tomar tu propuesta gráfica. Vas a usar el Planning Canvas embebido en el Apéndice F para capturar tu posicionamiento inicial. Al terminar esta actividad, te vas a llevar una declaración clara de hacia dónde apuntas — la semilla de todo lo que vas a diseñar en las Sesiones 7 y 8.`,
    rationale: 'EN=116 palabras · ES=119 palabras · movs: qué (leer brief + Canvas) / por qué (no diseñar aún, posicionar) / promesa (semilla de S7-S8)',
  },

  // ── BATCH A · S1 + S2 ─────────────────────────────────────────
  'A3.1.1': {
    en: `Welcome to the designer\u2019s world. Before anything else — before a brief, a font, or a color palette lands on your desk — you need to learn to look. On the wall there are six visual references: posters, logos, magazine covers. Your job here is not to analyze yet. It\u2019s to notice which one pulls your eye and hold that pull long enough to name it in English with a single precise word. By the end of these few minutes you\u2019ll have your first act as a designer: a personal noticing, committed to language, ready to be compared with a partner\u2019s.`,
    es: `Bienvenido al mundo del diseñador. Antes de cualquier otra cosa — antes de que llegue un brief, una fuente o una paleta a tu mesa — necesitas aprender a mirar. En la pared hay seis referencias visuales: afiches, logos, portadas. Tu trabajo aquí no es analizar todavía. Es notar cuál te atrae y sostener esa atracción lo suficiente para nombrarla en inglés con una sola palabra precisa. Al terminar estos pocos minutos vas a tener tu primer acto como diseñador: un darte cuenta personal, comprometido con el lenguaje, listo para compararse con el de un compañero.`,
    rationale: 'movs: qué (mirar 6 refs, nombrar 1 palabra EN) / por qué (aprender a mirar antes de analizar) / promesa (primer acto de diseñador)',
  },
  'A3.2.1': {
    en: `Pixel & Ink is about to become your work address. It\u2019s the studio where you\u2019ll design, get feedback, and fail forward across the next eight sessions. Today you meet the four people who steer that journey: Sophia the creative director, Laura the senior designer, Diego the junior who came right before you, and Don Pedro the print master. For each one you\u2019ll capture their name, their role, and one word that catches their personality. By the end you\u2019ll walk out knowing who to approach with what question — and you\u2019ll notice quietly which of them feels most like a mentor to you.`,
    es: `Pixel & Ink está por convertirse en tu dirección laboral. Es el estudio donde vas a diseñar, recibir retroalimentación y fallar hacia adelante durante las próximas ocho sesiones. Hoy conoces a las cuatro personas que van a guiar ese recorrido: Sophia la directora creativa, Laura la diseñadora senior, Diego el junior que entró justo antes que tú y Don Pedro el maestro de impresión. Para cada uno vas a capturar su nombre, su rol y una palabra que describa su personalidad. Al salir vas a saber a quién acercarte con qué pregunta — y vas a notar en silencio cuál de ellos se siente más como mentor para ti.`,
    rationale: 'movs: qué (conocer 4 miembros + mini-cards) / por qué (dirección laboral por 8 sesiones) / promesa (saber a quién preguntar + mentor)',
  },
  'A3.2.2': {
    en: `A studio only works when each role does what only that role can do. In this carousel you\u2019ll rotate through four stations — one per team member — and at each one you\u2019ll find a clue card describing an action: someone approving a palette, someone correcting type, someone running a proof. Your job in the group is to read the clue, discuss it for sixty seconds, and match the action to the right member. By the time you\u2019ve visited all four stations, the invisible logic of the studio becomes visible: you\u2019ll know who does what, and — more importantly — what you as Junior Designer will be asked to do.`,
    es: `Un estudio solo funciona cuando cada rol hace lo que solo ese rol puede hacer. En este carrusel vas a rotar por cuatro estaciones — una por cada miembro del equipo — y en cada una vas a encontrar una tarjeta de pista describiendo una acción: alguien aprobando una paleta, alguien corrigiendo tipografía, alguien supervisando una prueba. Tu trabajo en grupo es leer la pista, discutirla durante sesenta segundos y emparejar la acción con el miembro correcto. Cuando hayas visitado las cuatro estaciones, la lógica invisible del estudio se vuelve visible: vas a saber quién hace qué y — más importante — qué se te va a pedir como Junior Designer.`,
    rationale: 'movs: qué (rotar 4 estaciones + match role↔action) / por qué (lógica invisible del estudio) / promesa (saber qué harás como Junior)',
  },
  'A3.2.3': {
    en: `Before the next session opens the Toolbelt of twenty new terms, you need to stop and answer one honest question: why should a designer like you learn to name these things in English? This is a ten-minute reflection — not an essay, not an evaluation. You\u2019ll re-read your own notes from the Studio Tour and the Roles Carousel, find two sentences that say why vocabulary matters in your own work, and share the strongest one in plenary. By the end you won\u2019t just carry vocabulary because the program asks — you\u2019ll carry it because you decided it matters.`,
    es: `Antes de que la próxima sesión abra el Toolbelt de veinte términos nuevos, necesitas detenerte y responder una pregunta honesta: ¿por qué un diseñador como tú debería aprender a nombrar estas cosas en inglés? Esta es una reflexión de diez minutos — no un ensayo, no una evaluación. Vas a releer tus propias notas del Tour del Estudio y del Carrusel de Roles, encontrar dos frases que digan por qué el vocabulario importa en tu trabajo y compartir la más fuerte en plenaria. Al terminar no vas a cargar el vocabulario porque el programa lo pide — lo vas a cargar porque decidiste que importa.`,
    rationale: 'movs: qué (reflexión 10 min · 2 frases) / por qué (sentido personal antes de memorizar) / promesa (vocabulario decidido, no impuesto)',
  },
  'A3.3.S2.1': {
    en: `Every designer carries a working kit of words — a Toolbelt. Today your group builds yours. Twenty vocabulary cards arrive in the mix: kerning, serif, palette, grayscale, gradient, and fifteen more. Your job is to place each one under one of five categories — Typography, Color, Composition, Production, Materials — and write a one-line justification in English for every placement. By the end you won\u2019t just have twenty terms on a wall; you\u2019ll have a structured Toolbelt that shows where each word lives, so that later when you write a Font Card or read a brief, you know exactly which pocket to reach into.`,
    es: `Cada diseñador carga un kit de trabajo de palabras — un Toolbelt. Hoy tu grupo construye el suyo. Llegan veinte tarjetas de vocabulario: kerning, serif, paleta, escala de grises, gradiente, y quince más. Tu trabajo es ubicar cada una bajo una de cinco categorías — Tipografía, Color, Composición, Producción, Materiales — y escribir una justificación de una línea en inglés por cada ubicación. Al terminar no vas a tener solo veinte términos en la pared; vas a tener un Toolbelt estructurado que muestra dónde vive cada palabra, para que más adelante, cuando escribas una Font Card o leas un brief, sepas exactamente en qué bolsillo meter la mano.`,
    rationale: 'movs: qué (20 cards → 5 categorías · justif EN) / por qué (Toolbelt = kit de trabajo) / promesa (saber dónde vive cada palabra)',
  },
  'A3.3.S2.2': {
    en: `"The Story of Two Fonts" is the master anchor text of your whole week — everything you write, say, and evaluate in the next sessions will orbit around it. To own it, the class splits into three expert groups, each one taking one section: the origin of the serif, the rise of sans-serif, and when a designer chooses each. You\u2019ll read your section for ten minutes, pull out three key facts in English, and then — as the expert — teach it to your base group using the template. By the end, your base group holds all nine facts, and you\u2019ve practiced doing what designers do every day: explaining type decisions to other humans.`,
    es: `"The Story of Two Fonts" es el texto ancla de toda tu semana — todo lo que escribas, digas y evalúes en las próximas sesiones va a orbitar a su alrededor. Para apropiártelo, la clase se divide en tres grupos expertos, cada uno tomando una sección: el origen del serif, el ascenso del sans-serif y cuándo un diseñador elige cada uno. Vas a leer tu sección durante diez minutos, sacar tres hechos clave en inglés y luego — como experto — enseñárselos a tu grupo base usando la plantilla. Al terminar, tu grupo base tiene los nueve hechos, y tú practicaste lo que los diseñadores hacen todos los días: explicar decisiones tipográficas a otros humanos.`,
    rationale: 'movs: qué (jigsaw · experto de 1 sección · enseñar 3 hechos) / por qué (texto ancla de toda la semana) / promesa (practicar explicar decisiones tipográficas)',
  },
  'A3.3.S2.3': {
    en: `Designers train their eyes by naming what they see, fast. In this drill twelve real visual samples land on your desk — logos from brands you know, posters, magazine covers. Your pair has one job: for each sample, look at the dominant type and decide — is this Serif or Sans-Serif? Then you write the sample number in the correct column of the T-chart and add one short phrase in English that justifies your call. By the time you\u2019ve sorted all twelve, the distinction stops being theoretical and starts being instinct — you\u2019ll spot serif-or-sans in the wild without thinking.`,
    es: `Los diseñadores entrenan el ojo nombrando lo que ven, rápido. En este drill llegan a tu mesa doce muestras visuales reales — logos de marcas que conoces, afiches, portadas. Tu pareja tiene una sola tarea: para cada muestra, mirar la tipografía dominante y decidir — ¿es Serif o Sans-Serif? Luego escribes el número de la muestra en la columna correcta del T-chart y agregas una frase corta en inglés que justifique tu decisión. Cuando hayas clasificado las doce, la distinción deja de ser teoría y empieza a ser instinto — vas a distinguir serif o sans-serif en la calle sin pensar.`,
    rationale: 'movs: qué (12 samples · T-chart · 1 frase justif) / por qué (entrenar ojo a velocidad) / promesa (distinción de teoría → instinto)',
  },

  // ── BATCH B · S3 + S4 ─────────────────────────────────────────
  'A3.3.S3.1': {
    en: `Every designer sentence in English leans on two tiny grammar habits: pointing with THIS or THAT, and putting the adjective before the noun — "this bold serif," "that warm palette." Today you\u2019ll train those two habits until they stop feeling like rules and start feeling like breath. Ten visual prompts will appear on screen — a font, a color, a layout — and for each one you\u2019ll write one short sentence that respects both habits. By the end of the drill you won\u2019t have written an essay, but you\u2019ll have planted the skeleton that every Font Card, every peer review and every studio comment will hang on.`,
    es: `Toda oración de diseñador en inglés se apoya en dos hábitos gramaticales diminutos: señalar con THIS o THAT y poner el adjetivo antes del sustantivo — "this bold serif," "that warm palette." Hoy vas a entrenar esos dos hábitos hasta que dejen de sentirse como reglas y empiecen a sentirse como respiración. Van a aparecer diez estímulos visuales — una fuente, un color, una diagramación — y para cada uno vas a escribir una oración corta que respete los dos hábitos. Al terminar no vas a haber escrito un ensayo, pero vas a haber plantado el esqueleto del que van a colgar todas tus Font Cards, revisiones de pares y comentarios de estudio.`,
    rationale: 'movs: qué (10 prompts · 2 hábitos gram) / por qué (esqueleto de toda oración de diseñador) / promesa (reglas → respiración)',
  },
  'A3.3.S3.2': {
    en: `Before you write your own Font Card, you need to see a live one with your eyes open. Andrés, a junior who graduated last cohort, left behind a sample card for the font "Merriweather." Your group will read it slowly and then mark, with four colored highlighters, the four grammar pieces at work: pointing words in yellow, adjectives-before-nouns in blue, descriptive phrases in green, technical labels in orange. You\u2019ll count each color into the little box at the bottom of Andrés\u2019 card. By the time you finish, the anatomy of a Font Card is no longer abstract — you hold a concrete template to replicate in the next activity.`,
    es: `Antes de escribir tu propia Font Card necesitas ver una viva con los ojos abiertos. Andrés, un junior que se graduó de la cohorte pasada, dejó una tarjeta de muestra para la fuente "Merriweather." Tu grupo la va a leer despacio y luego va a marcar, con cuatro resaltadores de colores, las cuatro piezas gramaticales en acción: palabras de señalamiento en amarillo, adjetivos-antes-de-sustantivos en azul, frases descriptivas en verde, etiquetas técnicas en naranja. Vas a contar cada color en el cuadro pequeño al pie de la tarjeta de Andrés. Al terminar, la anatomía de una Font Card deja de ser abstracta — tienes una plantilla concreta para replicar en la siguiente actividad.`,
    rationale: 'movs: qué (4 highlighters sobre Font Card de Andrés) / por qué (ver anatomía viva antes de producir) / promesa (plantilla concreta a replicar)',
  },
  'A3.3.S3.3': {
    en: `Now you write yours. On the shelf there are six typefaces to choose from: Bebas Neue, Playfair, Roboto, Garamond, Montserrat, Oswald. Pick the one that pulls your eye — the one you\u2019d actually use on a Motor Graphic Vehicles project. Then fill the Font Card template step by step: the font name, its family (serif, sans-serif, slab, display), three adjectives that capture its personality, and two short sentences using the grammar you trained in S3.1 — THIS/THAT plus adjective-before-noun. By the time you close the card, you\u2019ll hold your first written designer product: a judgement about type, committed to English, ready to defend.`,
    es: `Ahora escribes la tuya. En el estante hay seis tipografías para elegir: Bebas Neue, Playfair, Roboto, Garamond, Montserrat, Oswald. Toma la que te atraiga — la que usarías de verdad en un proyecto de Motor Graphic Vehicles. Luego completas la plantilla Font Card paso por paso: nombre de la fuente, su familia (serif, sans-serif, slab, display), tres adjetivos que capturen su personalidad y dos oraciones cortas con la gramática que entrenaste en S3.1 — THIS/THAT más adjetivo-antes-del-sustantivo. Al cerrar la tarjeta vas a tener tu primer producto escrito como diseñador: una opinión sobre tipografía, comprometida con el inglés, lista para defender.`,
    rationale: 'movs: qué (elegir 1/6 · plantilla · nombre+familia+3 adj+gram) / por qué (primer producto escrito aplicando S3.1+S3.2) / promesa (opinión lista para defender)',
  },
  'A3.3.S3.4': {
    en: `This is your first formal evidence in writing — E2. You\u2019ll write a Design Decision Email: 80–120 words addressed to Sophia explaining which font you chose for the Motor Graphic Vehicles campaign and why. Then something harder happens: a partner reads your email against a five-point checklist — clear recommendation, justified choice, correct grammar, precise vocabulary, professional tone — and gives you one concrete suggestion. Your job is to apply that suggestion before submitting the final version. By the time the evidence goes into your portfolio, you won\u2019t just have written an email; you\u2019ll have learned the real designer skill of iterating on feedback without defensiveness.`,
    es: `Esta es tu primera evidencia formal escrita — E2. Vas a redactar un Design Decision Email: 80–120 palabras dirigidas a Sophia explicando qué fuente elegiste para la campaña Motor Graphic Vehicles y por qué. Luego pasa algo más difícil: un compañero lee tu email con una lista de chequeo de cinco puntos — recomendación clara, decisión justificada, gramática correcta, vocabulario preciso, tono profesional — y te da una sugerencia concreta. Tu trabajo es aplicar esa sugerencia antes de entregar la versión final. Cuando la evidencia entre a tu portafolio, no solo vas a haber escrito un email; vas a haber aprendido la habilidad real del diseñador de iterar con retroalimentación sin ponerse a la defensiva.`,
    rationale: 'movs: qué (DDE 80-120w · peer review 5p · aplicar 1 sugerencia) / por qué (E2 primera evidencia + iterar sin defensa) / promesa (habilidad real de diseñador)',
  },
  'A3.3.S4.1': {
    en: `Typography told Session 3; now it\u2019s color\u2019s turn. The Color Wheel is the second language a designer speaks, and today you learn its first alphabet. Twelve colors appear on the wheel — red, orange, yellow, yellow-green, green, blue-green, blue, blue-violet, violet, red-violet, and the neutrals. Your pair will label each slice with its English name on the printed wheel, and then classify every one of the twelve as warm or cool, writing a W or a C in the margin. By the time the wheel is complete, you\u2019ll own the vocabulary you need to follow tomorrow\u2019s voice exchange between Sophia and Laura about a palette for "La Esquina" coffee shop.`,
    es: `La tipografía contó la Sesión 3; ahora es el turno del color. La rueda cromática es el segundo idioma que un diseñador habla, y hoy aprendes su primer alfabeto. Aparecen doce colores en la rueda — rojo, naranja, amarillo, amarillo-verde, verde, azul-verde, azul, azul-violeta, violeta, rojo-violeta, y los neutros. Tu pareja va a rotular cada gajo con su nombre en inglés sobre la rueda impresa, y luego va a clasificar a cada uno de los doce como cálido o frío, escribiendo una W o una C en el margen. Al completar la rueda, tendrás el vocabulario que necesitas para seguir mañana el intercambio de voz entre Sophia y Laura sobre una paleta para "La Esquina."`,
    rationale: 'movs: qué (rotular 12 · W/C) / por qué (color = 2do idioma del diseñador) / promesa (vocab listo para E3 Sophia-Laura)',
  },
  'A3.3.S4.2': {
    en: `This is your second formal evidence — E3, the listening one. You\u2019ll put on your headphones and listen twice to a three-minute voice exchange between Sophia and Laura as they discuss the palette for "La Esquina," a new coffee shop client. The listening sheet asks three things from you: record the six colors they mention in order, note the temperature Sophia attaches to each one, and complete three gap sentences exactly as you hear them. Your instructor marks the sheet against a checklist, worth five points. When you leave this activity, you\u2019ll have proof that you can follow a live chromatic discussion between two designers — a skill no textbook teaches.`,
    es: `Esta es tu segunda evidencia formal — E3, la de escucha. Vas a ponerte los audífonos y escuchar dos veces un intercambio de voz de tres minutos entre Sophia y Laura mientras discuten la paleta para "La Esquina," un nuevo cliente de cafetería. La hoja de escucha te pide tres cosas: registrar los seis colores que mencionan en orden, anotar la temperatura que Sophia le asigna a cada uno, y completar tres oraciones con huecos exactamente como las oyes. Tu instructor califica la hoja con una lista de chequeo, vale cinco puntos. Al salir de esta actividad tendrás prueba de que puedes seguir una discusión cromática viva entre dos diseñadoras — una habilidad que ningún libro de texto enseña.`,
    rationale: 'movs: qué (2 escuchas · 6 colores + 6 temps + 3 gaps) / por qué (E3 · seguir discusión cromática viva) / promesa (habilidad que ningún libro enseña)',
  },
  'A3.3.S4.3': {
    en: `Before you talk to Sophia in the next session, you need four words in your mouth without stumbles: serif, sans-serif, canvas, palette. These four words travel with you across the whole week — every peer review, every studio comment, every Font Card uses them. Today you\u2019ll drill each one in three passes: first the IPA transcription, spoken slowly; then a self-recording with your phone; finally a partner rates your clarity on a five-point scale. The cycle takes ten minutes per word. By the time the bell rings, the four designer words feel clean in your mouth — ready for the live roleplay with Sophia that closes the session.`,
    es: `Antes de hablarle a Sophia en la siguiente sesión, necesitas cuatro palabras en la boca sin tropiezos: serif, sans-serif, canvas, palette. Estas cuatro palabras viajan contigo toda la semana — cada revisión de pares, cada comentario de estudio, cada Font Card las usa. Hoy vas a entrenar cada una en tres pasadas: primero la transcripción en AFI, hablada despacio; luego una autograbación con tu celular; por último un compañero califica tu claridad en una escala de cinco puntos. El ciclo toma diez minutos por palabra. Cuando suene la campana, las cuatro palabras del diseñador se sienten limpias en tu boca — listas para el roleplay en vivo con Sophia que cierra la sesión.`,
    rationale: 'movs: qué (4 palabras · 3 pasadas IPA+rec+rate) / por qué (palabras de toda la semana) / promesa (boca limpia para E4)',
  },
  'A3.3.S4.4': {
    en: `E4 arrives — your first formal speaking evidence. You\u2019ll play the Junior Designer, and a classmate will play Sophia. Your task is simple but real: present one visual reference from your notebook to her in three clean English turns. Turn one opens — "Sophia, I brought this reference." Turn two describes — three adjectives about its type and palette, using the grammar trained in S3.1. Turn three invites — one question that asks for her feedback. Your instructor listens with a checklist: pronunciation, vocabulary precision, grammar, turn length, professional tone — five points total. When the roleplay ends, you\u2019ll have lived your first real studio conversation with your voice fully on.`,
    es: `Llega E4 — tu primera evidencia formal de oralidad. Tú haces el papel del Junior Designer; una compañera, el de Sophia. Tu tarea es simple pero real: presentarle una referencia visual de tu cuaderno en tres turnos limpios en inglés. El turno uno abre — "Sophia, I brought this reference." El turno dos describe — tres adjetivos sobre su tipografía y paleta, usando la gramática entrenada en S3.1. El turno tres invita — una pregunta que pide su retroalimentación. Tu instructor escucha con una lista de chequeo: pronunciación, precisión léxica, gramática, extensión de turno, tono profesional — cinco puntos en total. Al terminar el roleplay habrás vivido tu primera conversación real de estudio con tu voz plenamente puesta.`,
    rationale: 'movs: qué (roleplay Junior→Sophia · 3 turnos: open+describe+invite) / por qué (E4 primera conversación real de estudio) / promesa (voz plenamente puesta)',
  },

  // ── BATCH C · S5 + S6 ─────────────────────────────────────────
  'A3.3.S5.1': {
    en: `Two words carry most of what a designer says about harmony and tension: AND (harmony — this color AND that texture work together) and BUT (tension — this is bold BUT we need quiet). Today you\u2019ll study eight model sentences, extract the rule, and then use it: ten visual prompts will pop up — a layout, a palette pairing, a typography decision — and for each one you\u2019ll write a full sentence using either AND or BUT, marking it A or B. By the time you share two sentences in plenary, you\u2019ll notice how picking the right connector is already half of sounding like a designer in English.`,
    es: `Dos palabras sostienen casi todo lo que un diseñador dice sobre armonía y tensión: AND (armonía — este color AND esa textura funcionan juntos) y BUT (tensión — esto es atrevido BUT necesitamos silencio). Hoy vas a estudiar ocho oraciones modelo, extraer la regla y luego usarla: van a aparecer diez estímulos visuales — una diagramación, un par de paletas, una decisión tipográfica — y para cada uno vas a escribir una oración completa con AND o con BUT, marcándola A o B. Cuando compartas dos oraciones en plenaria, vas a notar que elegir el conector correcto ya es la mitad de sonar como diseñador en inglés.`,
    rationale: 'movs: qué (8 modelos → regla → 10 prompts) / por qué (AND/BUT = armonía/tensión, corazón del discurso de diseño) / promesa (mitad de sonar como diseñador)',
  },
  'A3.3.S5.2': {
    en: `Tomorrow you\u2019ll perform all five communicative functions in front of your instructor for Evidence 5 — today is the dress rehearsal. With a partner, you\u2019ll cycle through five cards: F1 Greet, F2 Identify, F3 Describe, F4 Instruct, F5 Express likes. Each card gets three minutes of out-loud practice, and you\u2019ll capture your best attempt — one sentence — in the row below. Then you underline the function that felt most comfortable, switch partners, and repeat with the one that felt hardest. By the end of the drill, you\u2019ll walk into the Session 5 station carousel with five sentences already in your mouth.`,
    es: `Mañana vas a ejecutar las cinco funciones comunicativas frente a tu instructor para la Evidencia 5 — hoy es el ensayo general. Con un compañero, vas a recorrer cinco tarjetas: F1 Saludar, F2 Identificar, F3 Describir, F4 Instruir, F5 Expresar gustos. Cada tarjeta recibe tres minutos de práctica en voz alta, y tú vas a capturar tu mejor intento — una oración — en la fila de abajo. Luego subrayas la función que se sintió más cómoda, cambias de pareja y repites con la que se sintió más difícil. Al terminar el drill, entrarás al carrusel de estaciones de la Sesión 5 con cinco oraciones ya en la boca.`,
    rationale: 'movs: qué (5 tarjetas · 3 min c/u · mejor intento) / por qué (ensayo general de E5) / promesa (5 oraciones en la boca antes del carrusel)',
  },
  'A3.3.S5.3': {
    en: `Evidence 5 lands — the biggest live performance of the guide. You\u2019ll rotate through five stations, one per communicative function, and perform each one for ninety seconds with a partner. The instructor walks the circuit with Escala No 5, scoring one criterion per station: accuracy, fluency, grammar, pronunciation, and confidence. No pause between stations — when the bell rings, you rotate clockwise and pick up the next card. After the five rotations, you sit down and fill the self-reflection row: which station felt strongest, which exposed a gap. By the time you stand up, you\u2019ve shown the full range of your Session 5 language.`,
    es: `Llega la Evidencia 5 — la ejecución en vivo más grande de la guía. Vas a rotar por cinco estaciones, una por función comunicativa, y a actuar cada una noventa segundos con un compañero. El instructor recorre el circuito con la Escala No 5, calificando un criterio por estación: precisión, fluidez, gramática, pronunciación y confianza. Sin pausa entre estaciones — cuando suene la campana, rotas en sentido horario y tomas la siguiente tarjeta. Al terminar las cinco rotaciones, te sientas y completas la fila de autorreflexión: qué estación se sintió más fuerte, cuál expuso un vacío. Al ponerte de pie, ya mostraste el rango completo de tu lenguaje de la Sesión 5.`,
    rationale: 'movs: qué (5 estaciones × 90 sec + Escala No 5) / por qué (E5 · la performance más grande de la guía) / promesa (rango completo del lenguaje de S5)',
  },
  'A3.3.S5.4': {
    en: `Before we move into Session 6, take ten minutes to name the friction. You just cycled through five communicative functions — F1 to F5 — in the drill and the carousel. One of them gave you more trouble than the others; you know which one. This reflection is not scored. It is a tool: naming the function where your tongue stumbled is how you prepare to unblock it. You\u2019ll re-read your five attempts, choose the toughest function, and write two sentences — WHICH and WHY. Optional: add one small action you\u2019ll take in Session 6 to work on it.`,
    es: `Antes de pasar a la Sesión 6, tómate diez minutos para nombrar la fricción. Acabas de recorrer las cinco funciones comunicativas — F1 a F5 — en el drill y en el carrusel. Una de ellas te costó más que las otras; tú sabes cuál. Esta reflexión no tiene nota. Es una herramienta: nombrar la función donde tu lengua tropezó es como empiezas a destrabarla. Vas a releer tus cinco intentos, elegir la función más dura y escribir dos oraciones — CUÁL y POR QUÉ. Opcional: agrega una acción pequeña que tomarás en la Sesión 6 para trabajarla.`,
    rationale: 'movs: qué (releer 5 intentos · elegir 1 · 2 oraciones CUÁL+POR QUÉ) / por qué (no es evaluación, es herramienta metacognitiva) / promesa (preparar cómo destrabarla en S6)',
  },
  'A3.3b.1': {
    en: `Before you sit for the consolidated quiz, you and your instructor take ninety minutes to audit your evidence set. Five pieces live in your portfolio: E1 reading quiz, E2 Design Decision Email, E3 listening sheet, E4 speaking roleplay, E5 role carousel. You bring each one in its original form. In the checklist below, you mark each evidence as ✓ ready, ~ needs a minor fix, or ✗ missing. The instructor sits with you for ten minutes, reads through the set, and signs off on what is ready. Before you close, one last line: write one sentence naming the evidence that made you most proud.`,
    es: `Antes de sentarte para el cuestionario consolidado, tú y tu instructor se toman noventa minutos para auditar tu set de evidencias. Cinco piezas viven en tu portafolio: E1 cuestionario de lectura, E2 Design Decision Email, E3 hoja de escucha, E4 roleplay de habla, E5 carrusel de roles. Traes cada una en su forma original. En la lista de abajo marcas cada evidencia como ✓ lista, ~ necesita un ajuste menor, o ✗ faltante. El instructor se sienta contigo diez minutos, lee todo el set y firma lo que está listo. Antes de cerrar, una última línea: escribe una oración nombrando la evidencia que te hizo sentir más orgulloso.`,
    rationale: 'movs: qué (checklist E1-E5 · 10 min con instructor · firma) / por qué (sin sorpresas el día del quiz) / promesa (portafolio auditado + oración de orgullo)',
  },
  'A3.3b.2': {
    en: `Evidence 6 is the integrative cognitive check — the exam that closes the Apropiación phase. Twenty-five items are waiting, organized in five sections of five: Reading, Writing, Listening, Vocabulary, Grammar. Each item is worth one point; every section reflects one of the five evidences you already produced, so the content is not new to you. You\u2019ll get fifteen minutes of pre-reading over your portfolio to prime your memory, then ninety minutes of focused work on the quiz. Answer every item — there is no penalty for attempting. Review your twenty-five answers once before submitting. When you hand in the sheet, the Apropiación is formally closed.`,
    es: `La Evidencia 6 es el cierre cognitivo integrador — el examen que cierra la fase de Apropiación. Veinticinco ítems te esperan, organizados en cinco secciones de cinco: Lectura, Escritura, Escucha, Vocabulario, Gramática. Cada ítem vale un punto; cada sección refleja una de las cinco evidencias que ya produjiste, así que el contenido no es nuevo. Vas a tener quince minutos de pre-lectura sobre tu portafolio para activar la memoria, luego noventa minutos de trabajo concentrado sobre el cuestionario. Responde todos los ítems — no hay penalidad por intentar. Revisa tus veinticinco respuestas una vez antes de entregar. Cuando entregues la hoja, la Apropiación queda formalmente cerrada.`,
    rationale: 'movs: qué (25 ítems · 5 secciones × 5 · 90 min) / por qué (E6 cierre cognitivo integrador, nada nuevo) / promesa (Apropiación formalmente cerrada)',
  },
  'A3.3b.3': {
    en: `The consolidated quiz is in. Now the group closes the Apropiación phase together. In groups of four, you lay out all five evidences on the table and each person presents their portfolio in two minutes — no speeches, just the pieces. Then you award one design star to a peer whose work surprised you, writing a one-sentence reason below their name. After the stars, the group reflects out loud on the biggest leap from Session 1 to Session 6 — where did you each grow the most? You close by writing your own individual leap sentence in the reflection space, a personal sentence you\u2019ll carry into the Final Mission.`,
    es: `El cuestionario consolidado entró. Ahora el grupo cierra la fase de Apropiación en conjunto. En grupos de cuatro, ponen las cinco evidencias sobre la mesa y cada persona presenta su portafolio en dos minutos — sin discursos, solo las piezas. Luego otorgas una estrella de diseño a un compañero cuyo trabajo te sorprendió, escribiendo debajo de su nombre una oración con la razón. Después de las estrellas, el grupo reflexiona en voz alta sobre el salto más grande de la Sesión 1 a la Sesión 6 — ¿dónde creciste más cada uno? Cierras escribiendo tu propia oración individual del salto en el espacio de reflexión, una oración personal que llevarás a la Misión Final.`,
    rationale: 'movs: qué (grupos 4 · portafolios 2 min · estrella + razón) / por qué (cerrar Apropiación juntos, ver el salto) / promesa (oración personal que llevas a la FM)',
  },
  'A3.3b.4': {
    en: `The Apropiación is closed. Now the Final Mission Brief arrives — one page, in your hands. Your job in this bridge activity is small but charged: read the brief once, in silence, without rushing. Let the client, the audience, and the three constraints land in your head. Then, in the commitment space below, write one sentence that starts exactly like this: "For the Final Mission, I will…" — and finish it with your first declaration of direction. Share it in a brief plenary. That single sentence is not a contract; it is a compass bearing that you will refine across Sessions 6½, 7 and 8.`,
    es: `La Apropiación quedó cerrada. Ahora llega el Brief de la Misión Final — una página, en tus manos. Tu trabajo en esta actividad puente es pequeño pero cargado: lee el brief una vez, en silencio, sin prisa. Deja que el cliente, la audiencia y las tres restricciones aterricen en tu cabeza. Luego, en el espacio de compromiso de abajo, escribe una oración que empiece exactamente así: "For the Final Mission, I will…" — y termínala con tu primera declaración de rumbo. Compártela en una plenaria breve. Esa sola oración no es un contrato; es un rumbo de brújula que vas a refinar a lo largo de las Sesiones 6½, 7 y 8.`,
    rationale: 'movs: qué (leer brief en silencio · 1 oración "For the FM, I will…") / por qué (puente a la FM, no contrato sino brújula) / promesa (rumbo a refinar en S6½-S8)',
  },

  // ── BATCH D · Final Mission S6½-S8 ───────────────────────────
  'A3.4.2': {
    en: `Armed with your Planning Canvas, you step into the world to hunt for six visual references — one per category — that will shape your Mood Board. For each find, you capture its source (URL or magazine + page) and write a five-to-seven-word English label saying why you chose it. Then a peer scout audits one of your choices and either confirms your instinct or challenges it. By the time the hunt ends, you walk back with a curated reference folder — the raw material of the Mood Board you\u2019ll build in the next activity.`,
    es: `Con tu Planning Canvas en mano, sales al mundo a cazar seis referencias visuales — una por categoría — que van a darle forma a tu Mood Board. Por cada hallazgo capturas la fuente (URL o revista + página) y escribes una etiqueta en inglés de cinco a siete palabras que diga por qué la elegiste. Luego un compañero audita una de tus elecciones y o confirma tu instinto o lo cuestiona. Al volver al estudio llevas una carpeta curada de referencias — la materia prima del Mood Board que vas a construir en la siguiente actividad.`,
    rationale: 'movs: qué (6 refs · source + EN label · 1 peer scout) / por qué (curar materia prima antes de construir) / promesa (carpeta curada lista para el board)',
  },
  'A3.4.3': {
    en: `Six references, one A3 surface. Today you arrange them with intention — no random scatter, no leftover white space. Each reference earns its spot based on visual weight and the story you want to tell. Then you write the FINAL English label for each one — two to four sentences using the A1.1 grammar you\u2019ve trained all week: BE + IN + two adjectives before the noun + and/but + a/an. You read each label out loud once to check rhythm, save the whole Mood Board as a PDF or photograph, and keep it safe for tomorrow\u2019s two-minute pitch to Sophia.`,
    es: `Seis referencias, una superficie A3. Hoy las acomodas con intención — sin dispersión al azar, sin espacios en blanco sobrantes. Cada referencia se gana su lugar según su peso visual y la historia que quieres contar. Luego escribes la etiqueta FINAL en inglés para cada una — dos a cuatro oraciones con la gramática A1.1 que entrenaste toda la semana: BE + IN + dos adjetivos antes del sustantivo + and/but + a/an. Lees cada etiqueta en voz alta una vez para revisar ritmo, guardas todo el Mood Board como PDF o foto, y lo guardas para el pitch de dos minutos a Sophia mañana.`,
    rationale: 'movs: qué (acomodar 6 · etiqueta FINAL A1.1 · leer en voz alta) / por qué (arte con intención, no dispersión) / promesa (Mood Board listo para pitch)',
  },
  'A3.4.4': {
    en: `Two minutes. That\u2019s the whole pitch. Sophia is watching, the Mood Board is mounted, and the clock starts. You open in twenty seconds — greet her, introduce yourself. You spend eighty seconds describing three of your six references, pointing at each one with eye contact and one clean sentence per reference. You close in twenty seconds with your visual recommendation for La Esquina in one clear sentence. Before the live pitch you rehearse once and time yourself with a stopwatch. After Sophia hears you, the instructor marks the Observation Checklist — five criteria × two points — and you swap roles if you\u2019re paired with a peer playing Sophia.`,
    es: `Dos minutos. Eso es el pitch entero. Sophia te observa, el Mood Board está montado, y el cronómetro arranca. Abres en veinte segundos — la saludas, te presentas. Dedicas ochenta segundos a describir tres de tus seis referencias, señalándolas con contacto visual y una oración limpia por referencia. Cierras en veinte segundos con tu recomendación visual para La Esquina en una oración clara. Antes del pitch en vivo ensayas una vez y te cronometras. Después de que Sophia te escuche, el instructor marca la Lista de Observación — cinco criterios × dos puntos — y cambian de rol si estás en pareja con un compañero haciendo de Sophia.`,
    rationale: 'movs: qué (pitch 2 min · 20+80+20 · 3 movimientos) / por qué (ejecución oral real ante Sophia) / promesa (Checklist Observación · voz puesta)',
  },
  'A3.4.5': {
    en: `The whole journey closes here. You sit with your portfolio one last time and answer five honest emoji questions about your own work — were your Canvas decisions specific, did your references match the mood, did your labels use BE + IN + adj position, did your pitch hold its three-move structure, did you stay within two minutes. Then you award one design star to a peer whose work surprised you, writing a one-sentence reason. The last line is an open reflection: what you take with you from this whole journey, in one honest sentence. If you want, you share it in plenary — the guide ends on your voice.`,
    es: `Todo el camino cierra aquí. Te sientas con tu portafolio una última vez y respondes cinco preguntas emoji honestas sobre tu propio trabajo — si tus decisiones del Canvas fueron específicas, si tus referencias cuadraron con el ánimo, si tus etiquetas usaron BE + IN + posición del adjetivo, si tu pitch sostuvo su estructura de tres movimientos, si te mantuviste en los dos minutos. Luego otorgas una estrella de diseño a un compañero cuyo trabajo te sorprendió, con una oración de razón. La última línea es una reflexión abierta: qué te llevas de todo este camino, en una oración honesta. Si quieres, la compartes en plenaria — la guía cierra con tu voz.`,
    rationale: 'movs: qué (5 emoji + estrella + oración abierta) / por qué (cierre honesto de toda la guía) / promesa (la guía cierra con tu voz)',
  },
};

// ───────────────────────────────────────────────────────────────────
// Utilidades
// ───────────────────────────────────────────────────────────────────

function countWords(s) {
  return String(s).trim().split(/\s+/).filter(Boolean).length;
}

function truncPreview(s, n = 120) {
  s = String(s);
  return s.length > n ? s.slice(0, n) + '…' : s;
}

/** Recorre el JSON y devuelve { id → {act, parent, index} } */
function indexActivities(root) {
  const index = {};
  function walk(obj, parent, key) {
    if (Array.isArray(obj)) {
      obj.forEach((v, i) => walk(v, obj, i));
    } else if (obj && typeof obj === 'object') {
      const aid = obj.actividad_id;
      if (typeof aid === 'string' && /^A\d+/.test(aid)) {
        index[aid] = { act: obj, parent, index: key };
      }
      for (const [k, v] of Object.entries(obj)) walk(v, obj, k);
    }
  }
  walk(root, null, null);
  return index;
}

// ───────────────────────────────────────────────────────────────────
// Transformación v2.6.3 → v2.7 por actividad
// ───────────────────────────────────────────────────────────────────

/**
 * Produce el objeto v2.7 y un diff estructurado.
 * No muta el objeto original.
 */
function migrateActivity(act) {
  const id = act.actividad_id;
  const v27 = JSON.parse(JSON.stringify(act));

  const diff = {
    id,
    already_v27: false,
    warnings: [],
    notes: [],
  };

  // Idempotencia
  if (v27.schema_version === 'v2.7') {
    diff.already_v27 = true;
    return { v27, diff };
  }

  // ── Bloque 1: Encabezado V+O+C ────────────────────────────────
  const vocDraft = VOC_DRAFTS[id];
  if (!vocDraft) {
    diff.warnings.push(`No hay VOC_DRAFTS para ${id} — enunciado_voc quedará como REVIEW_REQUIRED sin propuesta`);
  }

  // actividad_tipo_label: longform desde voc_dimension[0]
  const longform = {
    cognitiva:     'Actividad cognitiva',
    procedimental: 'Actividad procedimental',
    actitudinal:   'Actividad actitudinal',
  };
  const firstDim = (v27.voc_dimension && v27.voc_dimension[0]) || 'cognitiva';
  v27.actividad_tipo_label = longform[firstDim] || v27.tipo_actividad_sena || longform.cognitiva;

  v27.enunciado_voc = vocDraft
    ? { en: vocDraft.en, es: vocDraft.es, _review_status: 'DRAFT' }
    : { en: 'REVIEW_REQUIRED', es: 'REVIEW_REQUIRED', _review_status: 'REQUIRED' };

  if (vocDraft) {
    const enLen = vocDraft.en.length;
    const esLen = vocDraft.es.length;
    if (enLen > 200) diff.warnings.push(`enunciado_voc.en = ${enLen} chars (> 200)`);
    if (esLen > 200) diff.warnings.push(`enunciado_voc.es = ${esLen} chars (> 200)`);
    diff.notes.push(`V+O+C: EN=${enLen} chars · ES=${esLen} chars · rationale: ${vocDraft.rationale}`);
  }

  // ── Bloque 2: Descripción narrativa ───────────────────────────
  const narrDraft = NARRATIVA_DRAFTS[id];
  if (narrDraft) {
    const enW = countWords(narrDraft.en);
    const esW = countWords(narrDraft.es);
    v27.descripcion_narrativa = {
      en: narrDraft.en,
      es: narrDraft.es,
      _review_status: 'DRAFT',
    };
    if (enW < 60 || enW > 120) diff.warnings.push(`descripcion_narrativa.en = ${enW} palabras (fuera de 60–120)`);
    if (esW < 60 || esW > 120) diff.warnings.push(`descripcion_narrativa.es = ${esW} palabras (fuera de 60–120)`);
    diff.notes.push(`Narrativa: EN=${enW} palabras · ES=${esW} palabras · rationale: ${narrDraft.rationale}`);
  } else {
    v27.descripcion_narrativa = {
      en: 'REVIEW_REQUIRED',
      es: 'REVIEW_REQUIRED',
      _review_status: 'REQUIRED',
    };
    diff.warnings.push(`No hay NARRATIVA_DRAFTS para ${id}`);
  }

  // Conservamos descripcion_aprendiz como _legacy para trazabilidad
  if (v27.descripcion_aprendiz) {
    v27._legacy = v27._legacy || {};
    v27._legacy.descripcion_aprendiz = v27.descripcion_aprendiz;
    delete v27.descripcion_aprendiz;
    diff.notes.push('descripcion_aprendiz v2.6.3 preservado en _legacy.descripcion_aprendiz');
  }

  // ── Bloque 3: paso_a_paso (preservado · validación 5–7) ──────
  const pasos = v27.paso_a_paso;
  if (!Array.isArray(pasos)) {
    diff.warnings.push('paso_a_paso ausente o no es array');
  } else {
    if (pasos.length < 5) diff.warnings.push(`paso_a_paso = ${pasos.length} (< 5) — considera consolidar/expandir`);
    if (pasos.length > 7) diff.warnings.push(`paso_a_paso = ${pasos.length} (> 7) — considera consolidar`);
    diff.notes.push(`paso_a_paso: ${pasos.length} pasos (preservados)`);
  }

  // ── Bloque 4: entregable (preservado) ─────────────────────────
  if (!v27.entregable) {
    diff.warnings.push('entregable ausente');
  } else {
    diff.notes.push('entregable preservado sin cambios');
  }

  // ── Bloque 5: Evidencia first-class ──────────────────────────
  const footer = v27.activity_footer || {};
  const produce = v27.produce_evidencia === true;
  const footerEvidencia = footer.evidencia;

  if (produce && footerEvidencia) {
    // Ruta B: aplica: true
    v27.evidencia = {
      aplica: true,
      ...footerEvidencia,
    };
    // Limpiamos la subllave del footer (ahora es top-level)
    const { evidencia: _drop, ...footerClean } = footer;
    v27.activity_footer = footerClean;
    diff.notes.push(`evidencia: aplica=true · codigo=${footerEvidencia.codigo || 'N/A'} · extraído desde activity_footer.evidencia → top-level`);
  } else if (produce && !footerEvidencia) {
    v27.evidencia = {
      aplica: true,
      _review_status: 'REQUIRED',
      _note: 'produce_evidencia=true pero activity_footer.evidencia ausente',
    };
    diff.warnings.push('produce_evidencia=true pero no hay activity_footer.evidencia para extraer');
  } else {
    v27.evidencia = { aplica: false };
    diff.notes.push('evidencia: aplica=false (actividad sin evidencia formal)');
  }

  // ── Bloque 6: Footer logístico (6 campos canónicos) ──────────
  const canonicos = ['ambiente', 'estrategia', 'tecnica', 'duracion_horas', 'materiales', 'material_apoyo'];
  const footerActual = v27.activity_footer || {};
  const faltantes = canonicos.filter(c => !(c in footerActual));
  const extras = Object.keys(footerActual).filter(k => !canonicos.includes(k));
  if (faltantes.length) diff.warnings.push(`footer: faltan campos canónicos: ${faltantes.join(', ')}`);
  if (extras.length) diff.warnings.push(`footer: campos no canónicos presentes: ${extras.join(', ')}`);
  diff.notes.push(`footer: ${Object.keys(footerActual).length} campos canónicos (${canonicos.length} esperados)`);

  // ── Marcar schema_version ─────────────────────────────────────
  v27.schema_version = 'v2.7';

  return { v27, diff };
}

// ───────────────────────────────────────────────────────────────────
// Reporte markdown
// ───────────────────────────────────────────────────────────────────

function formatDiffBlock(id, before, after, diff) {
  const lines = [];

  // ID escueto en línea propia
  lines.push(id);

  if (diff.already_v27) {
    lines.push('');
    lines.push('SKIP — ya está en schema_version v2.7 (idempotencia)');
    lines.push('');
    lines.push('________________________________');
    lines.push('');
    return lines.join('\n');
  }

  // Título original
  lines.push('Título original (v2.6.3):');
  lines.push('');
  lines.push(`*  ${before.titulo_en || 'N/A'}`);
  lines.push(`*  ${before.titulo_es || 'N/A'}`);
  lines.push(' ');

  // Tipo + longform (línea única, sin heading)
  lines.push(` \`${after.actividad_tipo_label}\` (longform de \`${(before.voc_dimension || []).join('+')}\`)`);
  lines.push('');

  // V+O+C EN / ES — directos, sin label
  lines.push(after.enunciado_voc.en);
  lines.push('');
  lines.push(after.enunciado_voc.es);
  lines.push('');
  lines.push('');

  // Descripción bilingüe — sólo labels "Description" / "Descripción"
  lines.push('Description');
  lines.push(after.descripcion_narrativa.en);
  lines.push('');
  lines.push('Descripción');
  lines.push(after.descripcion_narrativa.es);

  // Step-by-step
  lines.push(' Step-by-step');
  lines.push('');
  const pasos = after.paso_a_paso || [];
  pasos.slice(0, 2).forEach((p, i) => {
    const en = typeof p === 'string' ? p : (p.en || p.paso_en || JSON.stringify(p).slice(0, 80));
    lines.push(`* PASO ${i + 1} / STEP ${i + 1}: ${truncPreview(en, 100)}`);
  });
  if (pasos.length > 2) lines.push(`* … (${pasos.length - 2} pasos más)`);

  // Entregable — label minimalista + contenido truncado
  lines.push('Entregable');
  if (after.entregable) {
    const entr = after.entregable;
    const entrStr = typeof entr === 'string' ? entr : JSON.stringify(entr);
    lines.push(`Preservado: ${truncPreview(entrStr, 200)}`);
  } else {
    lines.push('AUSENTE');
  }

  // Evidencia — estilo bullet · minimalista
  lines.push('· Evidencia (first-class)');
  lines.push('');
  const ev = after.evidencia;
  if (ev.aplica) {
    lines.push(`· aplica: true — código \`${ev.codigo || '?'}\` — instrumento \`${ev.instrumento || '?'}\` (ruta B).`);
  } else {
    lines.push('· sin evidencia formal (ruta A).');
  }
  lines.push('');

  // Separador visual
  lines.push('________________________________');
  lines.push('');

  // Footer: 6 campos canónicos inline con backticks
  const f = after.activity_footer || {};
  lines.push(' ' + Object.keys(f).map(k => '`' + k + '`').join(', '));
  lines.push('');

  return lines.join('\n');
}

function buildReport(results) {
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19) + 'Z';
  const out = [];
  out.push('---');
  out.push(`title: Migration Report · Activity Card v2.6.3 → v2.7`);
  out.push(`run_id: ${RUN_ID}`);
  out.push(`generated_at: ${ts}`);
  out.push(`script: rewrite_activities_v27.js`);
  out.push(`mode: ${MODE.apply ? 'APPLY' : 'DRY-RUN'}`);
  out.push(`scope: piloto (${TARGETS.length} actividades)`);
  out.push('---');
  out.push('');
  out.push('# Migration Report v2.7 — Piloto');
  out.push('');
  out.push('Esta es la propuesta de migración **v2.6.3 → v2.7** para las 3 actividades representativas del piloto.');
  out.push('');
  out.push('**Modo:** Report-then-approve. Los campos marcados `DRAFT` / `REVIEW_REQUIRED` esperan');
  out.push('tu aprobación conversacional (visto bueno o edición directa) antes de cualquier `--apply`.');
  out.push('');
  out.push('**Alcance del piloto:**');
  out.push('');
  TARGETS.forEach(id => out.push(`- \`${id}\``));
  out.push('');
  out.push('---');
  out.push('');

  results.forEach(r => {
    if (!r.found) {
      out.push(`## ${r.id}`);
      out.push('');
      out.push(`> **ERROR** — actividad no encontrada en pm-3-6.json`);
      out.push('');
      out.push('---');
      return;
    }
    out.push(formatDiffBlock(r.id, r.before, r.after, r.diff));
    out.push('');
  });

  // Resumen final
  const total = results.length;
  const ok = results.filter(r => r.found && !r.diff.already_v27).length;
  const skip = results.filter(r => r.found && r.diff.already_v27).length;
  const missing = results.filter(r => !r.found).length;
  const warnings = results.reduce((s, r) => s + (r.diff?.warnings?.length || 0), 0);

  out.push('## Resumen');
  out.push('');
  out.push(`- Actividades en scope: ${total}`);
  out.push(`- Migradas (v2.6.3 → v2.7): ${ok}`);
  out.push(`- Saltadas (ya v2.7): ${skip}`);
  out.push(`- No encontradas: ${missing}`);
  out.push(`- Warnings totales: ${warnings}`);
  out.push('');
  out.push('**Próximo paso:** revisa los bloques `DRAFT`, da visto bueno o edita, luego corremos `--apply`.');
  out.push('');

  return out.join('\n');
}

// ───────────────────────────────────────────────────────────────────
// Main
// ───────────────────────────────────────────────────────────────────

function main() {
  console.log(`rewrite_activities_v27.js · mode=${MODE.apply ? 'APPLY' : 'DRY-RUN'} · scope=${TARGETS.join(', ')}`);

  // Validación run
  if (!fs.existsSync(PM36_PATH)) {
    console.error(`ERROR: no existe ${PM36_PATH}`);
    process.exit(2);
  }
  const raw = fs.readFileSync(PM36_PATH, 'utf-8');
  const data = JSON.parse(raw);
  if (data.run_id !== RUN_ID) {
    console.error(`ERROR: run_id mismatch (file=${data.run_id}, expected=${RUN_ID})`);
    process.exit(2);
  }

  const index = indexActivities(data);
  const results = [];

  for (const id of TARGETS) {
    const found = index[id];
    if (!found) {
      console.warn(`  [${id}] NOT FOUND`);
      results.push({ id, found: false });
      continue;
    }
    const before = JSON.parse(JSON.stringify(found.act));
    const { v27, diff } = migrateActivity(found.act);
    console.log(`  [${id}] ${diff.already_v27 ? 'SKIP (ya v2.7)' : 'MIGRATED'} · warnings=${diff.warnings.length}`);
    if (diff.warnings.length) diff.warnings.forEach(w => console.log(`       ⚠ ${w}`));
    results.push({ id, found: true, before, after: v27, diff, ref: found });
  }

  // Escribir reporte (siempre en dry-run y apply)
  const report = buildReport(results);
  fs.writeFileSync(REPORT_PATH, report, 'utf-8');
  console.log(`\n→ reporte: ${REPORT_PATH}`);

  if (MODE.reportOnly) {
    console.log('→ --report-only: no se escribe pm-3-6.json');
    return;
  }

  if (MODE.apply) {
    // Backup obligatorio
    if (!fs.existsSync(BACKUP_PATH)) {
      fs.copyFileSync(PM36_PATH, BACKUP_PATH);
      console.log(`→ backup: ${BACKUP_PATH}`);
    } else {
      console.log(`→ backup ya existe: ${BACKUP_PATH} (se preserva el original)`);
    }

    // Aplicar en-place
    for (const r of results) {
      if (!r.found || r.diff.already_v27) continue;
      const { parent, index: key } = r.ref;
      parent[key] = r.after;
    }

    // Actualizar meta
    data.meta = data.meta || {};
    data.meta.activities_schema_version = 'v2.7 (piloto)';
    data.meta.activities_rewritten_at = new Date().toISOString();
    data.meta.v27_piloto_ids = TARGETS;

    fs.writeFileSync(PM36_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`→ pm-3-6.json actualizado (${results.filter(r => r.found && !r.diff.already_v27).length} actividades migradas)`);
  } else {
    console.log('→ --dry-run: no se tocó pm-3-6.json');
  }
}

main();
