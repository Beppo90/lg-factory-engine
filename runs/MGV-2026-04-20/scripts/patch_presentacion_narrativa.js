#!/usr/bin/env node
/**
 * patch_presentacion_narrativa.js — Ciclo 2.5 (Narrative Prologue)
 * ------------------------------------------------------------------
 * Reescribe seccion_2_presentacion de pm-3-6.json en registro narrativo
 * de "prólogo de libro", manteniendo contenido pedagógico:
 *   - 5 habilidades (Reading/Listening/Writing/Speaking/Workplace)
 *   - 4 miembros del equipo (Sophia/Laura/Diego/Don Pedro)
 *   - Promesa final medible (8 sesiones → presentación de 2 min a Sophia)
 *
 * El tono se mantiene formal-de-instructor pero cálido y cercano:
 * segunda persona directa, ritmo de prosa, imágenes concretas, invitación.
 *
 * Esquema extendido:
 *   prologo_en / prologo_es         → NUEVO (apertura tipo prólogo)
 *   que_aprenderas_en / _es_support → RESCRITO en prosa narrativa
 *   para_que_te_servira             → cada bullet ahora tiene "hook" narrativo
 *   universo_narrativo_aprendiz     → expandido a prosa con escena de apertura
 *   promesa_pedagógica              → reformulada como invitación/juramento
 *
 * Canon: mantiene todas las claves v2.6 existentes (backward compat).
 */

const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';
const PM36_PATH = path.join(RUN_DIR, 'pm-3-6.json');

const data = JSON.parse(fs.readFileSync(PM36_PATH, 'utf8'));

const presentacion = {
  titulo_aprendiz: '2. PRESENTATION — Welcome to Pixel & Ink Studio',

  // -------- PRÓLOGO (NUEVO) --------
  prologo_en:
    "Before you open this guide, take a breath. You are about to cross a threshold.\n\n" +
    "Tomorrow morning — in this story, at least — you will walk into a small design studio in Bogotá. Someone will hand you a coffee, point you to a desk, and ask you, in English, what you think of a mood board. You will answer. And in that moment, you will become a designer.\n\n" +
    "This guide is the rehearsal. Eight sessions. Twenty essential words. One final mission. One first real day at work — practiced in a safe place, so that when the real one comes, you are ready.\n\n" +
    "Let's begin.",
  prologo_es_support:
    "(Antes de abrir esta guía, respira. Estás a punto de cruzar un umbral.\n\n" +
    "Mañana — al menos dentro de esta historia — entrarás a un pequeño estudio de diseño en Bogotá. Alguien te pasará un café, te señalará un escritorio, y te preguntará, en inglés, qué piensas de un mood board. Tú responderás. Y en ese momento, te convertirás en diseñador.\n\n" +
    "Esta guía es el ensayo. Ocho sesiones. Veinte palabras esenciales. Una misión final. Un primer día real de trabajo — practicado en un lugar seguro, para que cuando llegue el verdadero, estés listo.\n\n" +
    "Empecemos.)",

  // -------- QUÉ APRENDERÁS (RESCRITO EN PROSA) --------
  que_aprenderas_en:
    "In this guide, you will learn how to SEE and NAME the visual world the way a designer does. " +
    "That is the quiet superpower of our trade: where most people see \"a logo,\" a designer sees a typeface, " +
    "a color family, a grid, a composition choice — and can explain each one out loud.\n\n" +
    "Over eight sessions, you will build a professional vocabulary of 20 essential English words across five areas of design — " +
    "Typography, Color, Shape & Composition, Tools & Software, and Products & Actions. " +
    "You will also learn how to introduce yourself as a Junior Designer and describe what you see in basic but professional English (CEFR A1.1).\n\n" +
    "It is not about speaking perfectly. It is about speaking confidently, with the right word at the right moment — the way a studio expects you to.",
  que_aprenderas_es_supervivencia:
    "(En esta guía aprenderás a MIRAR y NOMBRAR el mundo visual como lo hace un diseñador. Ese es el superpoder silencioso de nuestro oficio: donde la mayoría ve \"un logo,\" un diseñador ve una tipografía, una familia de color, una retícula, una elección de composición — y puede explicar cada una en voz alta.\n\n" +
    "A lo largo de ocho sesiones construirás un vocabulario profesional de 20 palabras esenciales en inglés, distribuidas en cinco áreas del diseño — Tipografía, Color, Forma y Composición, Herramientas y Software, y Productos y Acciones. También aprenderás a presentarte como Junior Designer y a describir lo que ves en inglés básico pero profesional, nivel CEFR A1.1.\n\n" +
    "No se trata de hablar con perfección. Se trata de hablar con seguridad, con la palabra correcta en el momento justo — tal como un estudio espera de ti.)",

  // -------- PARA QUÉ TE SERVIRÁ (CADA BULLET CON HOOK NARRATIVO) --------
  para_que_te_servira: [
    "Reading — When you open Photoshop, Illustrator or Procreate for the first time and see menus full of English commands — \"Layer,\" \"Stroke,\" \"Opacity,\" \"Export\" — you will not freeze. You will recognize them like old friends and keep working. (Cuando abras Photoshop, Illustrator o Procreate por primera vez y veas menús llenos de comandos en inglés, no te vas a congelar — los reconocerás y seguirás trabajando.)",
    "Listening — When your Art Director leans over your shoulder and says \"Can you make this warmer?\" or \"Let's try a sans-serif here,\" you will know exactly what she means — and, more importantly, why. (Cuando tu director de arte se incline sobre tu hombro y diga frases como esas, sabrás exactamente qué quiere decir y por qué.)",
    "Writing — When you upload your first mood board to your portfolio, each reference will carry a short English label that reads like a designer wrote it: precise, technical, confident. (Cuando subas tu primer mood board al portafolio, cada referencia llevará una etiqueta corta en inglés que se lee como si la hubiera escrito un diseñador.)",
    "Speaking — When a client or interviewer asks \"Tell me a bit about yourself,\" you will have 90 seconds of English ready — your name, your studio, what you do, your best recent piece. You will not improvise; you will deliver. (Cuando un cliente o entrevistador te pregunte por ti, tendrás 90 segundos de inglés listos — no improvisarás, entregarás.)",
    "Workplace — And the day your first client is an international brand — Pantone samples, English-only briefs, Zoom calls in a second language — you will not panic. You will show up. That is, in the end, why this matters. (Y el día que tu primer cliente sea una marca internacional, no vas a entrar en pánico — vas a presentarte. Al final, por eso importa todo esto.)",
  ],

  // -------- UNIVERSO NARRATIVO (PROSA DE APERTURA + PERFILES) --------
  universo_narrativo_aprendiz: {
    escena_apertura_en:
      "It is 7:45 a.m. on a Monday in Bogotá. You climb three flights of stairs to a loft above a café on Carrera 11. The door says Pixel & Ink Studio. You push it open.\n\n" +
      "Inside: twelve desks, thirteen designers today — the thirteenth is you. Exposed brick walls. Risograph prints pinned with orange clips. The smell of fresh coffee and a warm laser printer. Somewhere, someone is humming.\n\n" +
      "This is where you will work for the next eight sessions. Welcome.",
    escena_apertura_es_support:
      "(Son las 7:45 a.m. de un lunes en Bogotá. Subes tres pisos hasta un loft sobre un café en la Carrera 11. La puerta dice Pixel & Ink Studio. La empujas.\n\n" +
      "Adentro: doce escritorios, trece diseñadores hoy — el número trece eres tú. Paredes de ladrillo a la vista. Impresiones risográficas sujetas con clips naranja. Olor a café recién hecho y a impresora láser tibia. En algún lugar, alguien tararea.\n\n" +
      "Aquí vas a trabajar durante las próximas ocho sesiones. Bienvenido/a.)",
    tu_estudio:
      "Pixel & Ink Studio — a small design boutique in Bogotá. Twelve designers. Branding, identity and social media for Colombian SMEs. Nothing luxurious. But every project is someone's first real logo, first real business card, first real Instagram grid. (Un pequeño estudio de diseño en Bogotá, 12 diseñadores, branding e identidad para PyMEs colombianas.)",
    tu_rol:
      "You are Andrés (or Andrea). Junior Designer. Today is your first day. You have a freshly-minted SENA portfolio, a small notebook where you have already started writing down new English words, and — although no one needs to know this yet — a slightly shaky hand as you sit down. That is completely normal. (Eres Andrés o Andrea, Junior Designer. Hoy es tu primer día. Tienes un portafolio SENA recién armado, una libreta donde ya estás escribiendo palabras nuevas en inglés, y — aunque nadie tiene que saberlo todavía — la mano un poco temblorosa al sentarte. Es completamente normal.)",
    tu_equipo: [
      "👩‍🎨 Sophia — Art Director assigned to our most important client, La Esquina Bakery. She is fast, bilingual and demanding; she will push you. She is also kind, when she has time. You will work with her most. (Directora de arte del cliente más importante, La Esquina Bakery. Rápida, bilingüe y exigente. Trabajarás con ella casi todo el tiempo.)",
      "👩‍💼 Laura — Creative Director of the studio and your direct mentor. The one who hired you. The one who believes in you. You will learn more from her silences than from her instructions. (Directora creativa del estudio y tu mentora directa. Aprenderás más de sus silencios que de sus instrucciones.)",
      "👨‍🏭 Diego — Print Producer. Twenty-two years in the trade. He knows paper weights, ink coverage and every print shop in Chapinero. When Diego says \"this won't work,\" it will not work. Listen to him. (Productor de impresión, 22 años de oficio. Cuando dice que algo no va a funcionar, no va a funcionar. Escúchalo.)",
      "👨‍🍞 Don Pedro — Owner of La Esquina Bakery, the client you will serve. He wants a rebrand that feels like fresh bread — warm, handmade, real. He does not speak a word of English. But somehow, with Sophia's guidance and your hands, you will design for him anyway. (Dueño de La Esquina Bakery, el cliente que servirás. Quiere un rebrand que se sienta como pan recién horneado. No habla inglés — pero entre Sophia y tú, le vas a diseñar igual.)",
    ],
  },

  // -------- PROMESA PEDAGÓGICA (REFORMULADA COMO INVITACIÓN) --------
  'promesa_pedagógica':
    "Here is what we promise — and what we will hold you to.\n\n" +
    "Eight sessions from now, you will walk back into Pixel & Ink Studio and you will not be the same person who opened this guide. You will introduce yourself in English without hesitating. You will look at a mood board and name six references using the vocabulary of real designers. You will stand two steps away from Sophia — mood board in your hand, voice steady — and you will speak for two minutes, in English, about colors, fonts, compositions, and your recommendation. Sophia will ask one question. You will answer it.\n\n" +
    "And then, walking home that evening, you will know something that nobody can take away from you: I am a designer — and I can work in this language too. (En ocho sesiones volverás a Pixel & Ink Studio y no serás la misma persona que abrió esta guía. Sabrás presentarte, nombrar seis referencias en un mood board, y sostener una presentación de dos minutos frente a Sophia — en inglés. Y esa noche, de regreso a casa, sabrás algo que nadie puede quitarte: soy diseñador, y también puedo trabajar en este idioma.)",
};

data.seccion_2_presentacion = presentacion;

// Meta tracking
data.pm_version = (data.pm_version || '1.0.0').replace(/\d+$/, m => String(+m + 1));
data._ciclo_2_5_patch = {
  applied_at: new Date().toISOString().split('T')[0],
  tipo: 'narrative_prologue_rewrite',
  seccion_afectada: 'seccion_2_presentacion',
  campos_nuevos: ['prologo_en', 'prologo_es_support', 'universo_narrativo_aprendiz.escena_apertura_en', 'universo_narrativo_aprendiz.escena_apertura_es_support'],
  campos_reescritos: ['que_aprenderas_en', 'que_aprenderas_es_supervivencia', 'para_que_te_servira', 'universo_narrativo_aprendiz.tu_estudio', 'universo_narrativo_aprendiz.tu_rol', 'universo_narrativo_aprendiz.tu_equipo', 'promesa_pedagógica'],
  tono: 'prólogo narrativo — segunda persona directa, prosa con imágenes concretas, formal-cálido',
};

fs.writeFileSync(PM36_PATH, JSON.stringify(data, null, 2));
console.log(`✅ Presentación narrativa aplicada — pm-3-6.json pm_version=${data.pm_version}`);
console.log(`   Campos nuevos: ${data._ciclo_2_5_patch.campos_nuevos.join(', ')}`);
console.log(`   Campos reescritos: ${data._ciclo_2_5_patch.campos_reescritos.length}`);
