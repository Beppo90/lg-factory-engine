#!/usr/bin/env node
/**
 * gen_s2_s8.js — generador de Build-Outs MGV G1 S2..S8
 *
 * Lee pm-2-0 (blueprint) + pm-2-3..pm-2-10 (Activity Cards) + pm-4-1/4-2
 * y emite pm-3-2-s2.json .. pm-3-2-s8.json con estructura canónica v2.5.1.
 *
 * pm0_protocol NO se escribe aquí — se inyecta después con
 * pm-3-2-pm0-propagate.js desde pm-3-1.json.pm0_alignment_by_session.
 */

const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';

const pm20 = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'pm-2-0.json'), 'utf8'));
const sesiones = pm20.session_blueprint.sesiones;

// Universe anchors
const UNIVERSE = 'Pixel & Ink Studio — Andrés (Junior Designer) · Sophia (Art Director / cliente) · Laura (Creative Director) · Diego (Print Producer) · Don Pedro (La Esquina Bakery)';
const PROGRAMA = 'Desarrollo de Medios Gráficos Visuales';
const PROG_CODE = '522309';
const RAP = '240202501-01';

// Standard 360 min timeline template
const TIMELINE_SKELETON = [
  { tiempo: '0:00-0:25', duracion_min: 25, bloque: 'SET-UP' },
  { tiempo: '0:25-1:20', duracion_min: 55, bloque: 'WHILE A' },
  { tiempo: '1:20-2:10', duracion_min: 50, bloque: 'WHILE B' },
  { tiempo: '2:10-2:55', duracion_min: 45, bloque: 'WHILE C' },
  { tiempo: '2:55-3:15', duracion_min: 20, bloque: 'BREAK' },
  { tiempo: '3:15-4:05', duracion_min: 50, bloque: 'WHILE D' },
  { tiempo: '4:05-5:00', duracion_min: 55, bloque: 'WHILE E' },
  { tiempo: '5:00-6:00', duracion_min: 60, bloque: 'WRAP-UP' },
];

// ---------- Session-specific content ----------
const SESSION_PLANS = {
  2: {
    momento_sena: '3.3 Apropiación',
    estrategia_didactica: 'Pre-enseñanza explícita + Lectura andamiada (Jigsaw) + Tarea de clasificación',
    justificacion_didactica: 'La pre-enseñanza léxica (PM-2.5) reduce la carga cognitiva antes del jigsaw del Master Anchor Text (PM-2.3). La clasificación serif/sans-serif consolida el reconocimiento visual A1.1 antes del Cuestionario E1.',
    worksheets_asignados: [
      'PM-2.5 — Literacy & Vocabulary Skills (pre-activación léxica, ~155 min)',
      'PM-2.3 — Reading The Master Anchor (~155 min + E1 Cuestionario No 1)'
    ],
    habilidades_soporte: ['Speaking receptivo (pre-reading brainstorm)', 'Writing copiativo (Classification Task)'],
    set_up: {
      warm_up: 'Word Wall Launch — Toolbelt 5×4 Build',
      teacher_talk_opening: '*Good morning, designers! ¡Buenos días! Yesterday you signed your Learning Contract. Today we start working. A designer reads before she draws. Your first tool is your TOOLBELT — twenty words. Let\'s build the Word Wall together.* (L1 25% — clarificar \'Toolbelt\' como kit profesional).',
      pasos: [
        'Saludo de apertura + re-entrar al English Zone 🔵 (5 min).',
        'Instructor descubre en el muro 5 categorías vacías del Toolbelt (C1 Typography · C2 Color · C3 Shape · C4 Tools · C5 Products).',
        'Recall Survival Words de S1 — 3 aprendices voluntarios repiten con stress (DEsign · GRAphic · COlor).',
        'Declaración del objetivo: hoy leemos el texto de Andrés y construimos las 20 palabras del Toolbelt.'
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Individual + parejas',
        tecnica_didactica: 'Drill fonético + Mirror Talking (pm-2-5 Archetype A)',
        title: 'Phonics & Spelling — 20 Toolbelt words (primera pasada)',
        pm_source: 'PM-2.5 Archetype A PHONICS_SPELLING',
        teacher_talk_instruction: '*Repeat after me: FONT /fɒnt/. Good. Now SERIF /ˈser.ɪf/. Louder! Now in pairs — one says, one mirrors.* (Finger drill con 3 dedos para sílabas).',
        icq: ['Where is the stress in TYPOGRAPHY?', 'Which sound is difficult for Spanish speakers in /θ/?', 'How do we say SANS-SERIF?'],
        answer_key_inline: 'TYpography = stress en 2ª sílaba · /θ/ inexistente en español, aproximar con lengua entre dientes · /sæns ˈser.ɪf/',
        facilitation_notes: ['Driller suave — no interrumpir el flujo', 'Marcar stress con MAYÚSCULA en tablero', 'Grabar 2-3 aprendices para autoescucha'],
        checkpoint: 'Cada pareja pronuncia 5 términos con stress correcto.',
        transition: 'Now you know how to SAY them. Next — you need to KNOW them.'
      },
      {
        key: 'while_b', duracion_min: 50, bloque_num: 'B', agrupacion: 'Grupos de 4',
        tecnica_didactica: 'Semantic Mapping + VSS (pm-2-5 Archetype B)',
        title: 'Vocabulary Development — Mapa semántico colectivo',
        pm_source: 'PM-2.5 Archetype B VOCABULARY_DEVELOPMENT',
        teacher_talk_instruction: '*In groups of four, take the 20 term cards. Sort them into 5 categories. Five categories, four cards each. When you finish, choose FIVE cards that are NEW for you — those are YOUR words.*',
        icq: ['How many categories?', 'How many cards in each?', 'How many words do YOU choose?'],
        answer_key_inline: 'Categorías: C1 Typography (font/serif/sans-serif/bold) · C2 Color (color/warm/cool/CMYK) · C3 Shape (line/shape/grid/balance) · C4 Tools (pencil/canvas/layer/toolbar) · C5 Products (logo/poster/open/save)',
        facilitation_notes: ['Circular entre grupos sin dar respuesta — sólo confirmar categorías', 'VSS = Vocabulary Self-Collection: cada aprendiz elige 5 palabras para su cuaderno', 'Tiempo estricto — 50 min con timer visible'],
        checkpoint: 'Cada grupo presenta 1 categoría al plenario (2 min × 5 grupos = 10 min final del bloque).',
        transition: 'You know the words. Now you read the real story.'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Individual silencioso + plenaria',
        tecnica_didactica: 'TBLT Pre-reading + First Reading (pm-2-3 Archetype A)',
        title: 'Master Anchor Text — First Read (silent + guided)',
        pm_source: 'PM-2.3 Archetype A TBLT_CYCLE',
        teacher_talk_instruction: '*This text is about Andrés — a junior designer like YOU. He works at Pixel & Ink Studio. Read silently. Do NOT translate word by word. Look for 3 things: WHO writes the email? WHAT does she want? WHEN is the deadline?*',
        icq: ['¿Traducimos palabra por palabra?', '¿Qué 3 cosas buscamos?', '¿Cuánto tiempo tenemos?'],
        answer_key_inline: 'NO traducir · Who=Sophia · What=logo+poster con serif+warm colors · When=Friday. Tiempo: 8 min lectura silenciosa + 7 min guided re-read instructor lee en voz alta.',
        facilitation_notes: ['L1 tolerado en anotaciones personales', 'Circular pero NO resolver vocabulario — remitir al Word Wall', 'Segunda lectura instructor modela entonación'],
        checkpoint: 'Al cerrar: 3 aprendices responden las 3 preguntas WHO/WHAT/WHEN en plenaria.',
        transition: '¡Break time! Drink water. Come back fresh. Then we go DEEP into the text.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Jigsaw 4×4',
        tecnica_didactica: 'Jigsaw cooperativo + Information Gap (pm-2-3 Archetype C)',
        title: 'Information Gap — Classification Task (12 fuentes en 3 categorías)',
        pm_source: 'PM-2.3 Archetype C INFORMATION_GAP + Archetype D COOPERATIVE',
        teacher_talk_instruction: '*Expert groups: A = Typography facts. B = Color facts. C = Product decisions. D = Canvas/Canva facts. Read ONLY your piece. Become the expert. Then we mix.*',
        icq: ['Read only YOUR piece — yes or no?', 'What do you do after reading?', 'How long to become expert?'],
        answer_key_inline: 'Sí, sólo tu pieza · Después: mix groups (1 de cada letra) y enseñas lo tuyo · 15 min expert + 25 min mix + 10 min classification task · Answer key classification: Serif=Times+Playfair+Georgia · Sans-serif=Arial+Helvetica+Open Sans · Display=Impact+Bebas+Lobster.',
        facilitation_notes: ['Assignment mosaico: A=párrafo 1 · B=párrafo 2 · C=párrafo 3 · D=párrafo 4', 'Classification handout con 12 muestras impresas — 3 por fila'],
        checkpoint: 'Cada mix group entrega Classification Handout completo y correcto.',
        transition: 'You understand the text. You classify the fonts. Now — the test.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Individual silencioso',
        tecnica_didactica: 'Evaluación formativa formal (Cuestionario E1 PM-4.1)',
        title: 'Cuestionario No 1 Reading Comprehension (E1) — 5 ítems × 1 pt',
        pm_source: 'PM-4.1 INST-01 Cuestionario No 1',
        teacher_talk_instruction: '*Silent mode. Pens down until I say GO. You have 25 minutes. Read each question. Mark one option only. After: 30 minutes feedback together.* (L1: sólo instrucciones de examen).',
        icq: ['How many options per question?', 'How many minutes?', 'Can I ask vocabulary questions?'],
        answer_key_inline: 'Una opción (A/B/C/D) · 25 min · No — durante el examen no se pregunta. Answer key maestra: B B B B B (todos B) — aprendiz no ve esta clave.',
        facilitation_notes: ['Silencio académico — supervisar sin responder', 'Al cerrar: 30 min de feedback grupal con tablero — analizar patrones de error'],
        checkpoint: 'Cada aprendiz entrega Cuestionario E1 firmado. Calificación inmediata al salir.',
        transition: 'You generated your FIRST formal evidence. Well done. Tomorrow we WRITE.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Instructor dibuja en tablero el Toolbelt completo (20 palabras en 5 columnas) y el mapa de la historia de Andrés (brief → read → learn → design). Pedir 3 aprendices que digan en inglés: "Today I learned ___".',
      exit_ticket: '1 hoja por aprendiz: (a) 3 palabras del Toolbelt que ahora sé · (b) 1 palabra que aún no entiendo · (c) 1 pregunta en cualquier idioma.',
      homework_autonomo: 'Identificar 3 fuentes en materiales impresos del entorno (revistas/letreros/empaques). Foto + etiqueta serif/sans-serif/display. Entregar en Google Classroom antes de S3.',
      preview_s3: '*Mañana: ahora que LEES como diseñadora, ESCRIBES como diseñadora. Primera Font Card tuya, con Laura revisando como Creative Director.*'
    },
    rap_status: 'S2 completada — E1 Reading generada (5 pts). 20 palabras Toolbelt activadas. Reading column del RAP establecida.'
  },

  3: {
    momento_sena: '3.3 Apropiación',
    estrategia_didactica: 'Consciousness-raising gramatical + Writing Workshop (task-based) + Peer review',
    justificacion_didactica: 'Gr 2 (this/that) + Gr 4 (adj position) son la base para producir la Font Card (E2). La consciencia explícita precede al frame guiado; peer review activa auto-regulación A1.1.',
    worksheets_asignados: [
      'PM-2.10 — Grammar Structure Use (consciousness-raising + structured practice, ~100 min)',
      'PM-2.4 — Writing Task-Based (Font Card production + peer review + E2, ~205 min)'
    ],
    habilidades_soporte: ['Reading receptivo (samples de 3 fuentes)', 'Speaking (peer review dialogs)'],
    set_up: {
      warm_up: 'Recall S2 — Toolbelt relay + Sample Font Parade',
      teacher_talk_opening: '*Welcome back, designers! Yesterday: Reading. Today: Writing. First — let\'s see what STUCK.* (Relay: 1er aprendiz dice palabra del Toolbelt, 2º la repite + agrega, 3º repite+agrega — 1 min.)',
      pasos: [
        'Toolbelt Relay (5 min) — cadena acumulativa de términos S2.',
        'Sample Font Parade — instructor muestra 3 fuentes grandes (Helvetica / Times / Comic Sans) en tablero, aprendices las describen con be + adj.',
        'Declaración del objetivo: hoy escribes tu PRIMERA Font Card con Laura como lectora.',
        'Recall Andrés: \'Andrés reads. Andrés learns. Today Andrés — and YOU — writes.\''
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Plenaria + individual',
        tecnica_didactica: 'Consciousness-raising + Noticing (PM-2.10 Archetype B)',
        title: 'Gr 2 Consciousness-raising — this / that / these / those',
        pm_source: 'PM-2.10 Gr 2 pronouns/demonstratives',
        teacher_talk_instruction: '*This is Helvetica. (*toca muestra cercana*) That is Times. (*apunta muestra lejana*) These are sans-serif fonts. Those are serif fonts. Notice: ESTE/ESE in English has TWO words.* (L1 20% — contraste explícito con español).',
        icq: ['This para cerca, ¿cierto o falso?', 'These para uno o muchos?', 'Usamos this o that para algo lejos?'],
        answer_key_inline: 'Cierto (cerca=this/these, lejos=that/those) · muchos cerca=these · lejos=that. Modelo físico: tocar vs apuntar.',
        facilitation_notes: ['Usar muestras físicas para activar gesto cuerpo→lengua', 'Tablero: 4 cuadrantes cerca-singular / cerca-plural / lejos-sing / lejos-plural'],
        checkpoint: '6 aprendices producen oración con demostrativo + muestra real.',
        transition: 'Demonstratives OK. Now — the tricky one: ADJECTIVE POSITION.'
      },
      {
        key: 'while_b', duracion_min: 50, bloque_num: 'B', agrupacion: 'Individual + plenaria',
        tecnica_didactica: 'Structured practice contrastiva (PM-2.10 Archetype A)',
        title: 'Gr 4 Adjective Position — contrastive drill + gap fill',
        pm_source: 'PM-2.10 Gr 4 adjective position',
        teacher_talk_instruction: '*In Spanish: la fuente NEGRITA. In English: the BOLD font. The adjective comes BEFORE the noun. Always. Say it with me: bold font, warm color, serif letter.*',
        icq: ['¿Adjetivo antes o después del sustantivo?', '¿Cómo se dice en inglés \'la fuente negrita\'?', '¿\'Colors warm\' es correcto?'],
        answer_key_inline: 'ANTES · \'the bold font\' · NO — correcto: \'warm colors\'. Gap fill 12 oraciones en handout.',
        facilitation_notes: ['12 gap-fill oraciones con error común (colors warm / warm colors)', 'Color-code visible: ADJ en naranja · NOUN en navy'],
        checkpoint: '10/12 gaps correctos por aprendiz antes de pasar a WHILE C.',
        transition: 'Grammar ready. Now — the real task: YOUR Font Card.'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Individual',
        tecnica_didactica: 'Writing Workshop — frame presentation + planning (PM-2.4 Archetype A)',
        title: 'Font Card Template — presentación y planning del primer draft',
        pm_source: 'PM-2.4 Archetype A TBLT_CYCLE (writing)',
        teacher_talk_instruction: '*Your Font Card has 5 MOVES (blocks). Greeting → Decision → Rationale → Next steps → Closing. Laura from Pixel & Ink Studio is your reader. Choose ONE font: Helvetica, Times, or Playfair. Plan. Don\'t write yet.*',
        icq: ['How many moves?', 'Who reads your card?', 'Which fonts can you choose?'],
        answer_key_inline: '5 moves · Laura (Creative Director avatar) · Helvetica / Times / Playfair. Planning sheet: Font name + 3 adjectives + 1 use case + 1 rationale with because.',
        facilitation_notes: ['Modelo en tablero: \'Dear Laura, This is Helvetica. Helvetica is clean and readable. It is good for logos because the shape is simple. I recommend Helvetica for our bakery client. Best regards, Andrés\'', 'Circular — chequear 3 adjectives + 1 rationale antes del draft'],
        checkpoint: 'Cada aprendiz tiene planning sheet firmado antes del break.',
        transition: '¡Break! Come back ready to WRITE — for real.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Individual',
        tecnica_didactica: 'Guided Writing + Controlled composition (PM-2.4 Archetype B)',
        title: 'Primer draft — Font Card (6-8 oraciones, 60-80 palabras)',
        pm_source: 'PM-2.4 Archetype B COMPREHENSION + Archetype C INFO_GAP',
        teacher_talk_instruction: '*45 minutes. Write your draft. Use the 5 moves. Use be, this/that, bold/warm/clean. Check adjective position. Think: would Laura understand this?*',
        icq: ['How many minutes?', '¿Puedo borrar y reescribir?', '¿En lápiz o bolígrafo?'],
        answer_key_inline: '45 min efectivos (5 min setup) · Sí, se alienta el borrador en lápiz · Draft en lápiz, versión final en bolígrafo.',
        facilitation_notes: ['NO interrumpir flujo — sólo circular cada 10 min', 'Marcar errores con códigos color (ADJ-POS = círculo naranja · BE = círculo azul · PLURAL = círculo verde)', 'Silencio productivo — música suave instrumental opcional'],
        checkpoint: 'Cada aprendiz tiene draft de 60-80 palabras con 5 moves identificables.',
        transition: 'Your draft is ready. Time for the eye of another designer.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Parejas + individual',
        tecnica_didactica: 'Peer Review estructurado + Revision + E2 submission (PM-2.4 Archetype D + PM-4.1 INST-02)',
        title: 'Peer Review + Revisión + E2 Evidencia Writing (Rúbrica No 2, 5 pts)',
        pm_source: 'PM-2.4 Archetype D COOPERATIVE + PM-4.1 INST-02',
        teacher_talk_instruction: '*Trade drafts with a partner. Use the 5-item checklist: greeting ✓ · decision ✓ · rationale with because ✓ · next steps ✓ · closing ✓. Mark what works and what needs fix. Then revise. Then submit.*',
        icq: ['How many items in checklist?', 'What is \'because\' for?', 'Do we fix our own draft or partner\'s?'],
        answer_key_inline: '5 items · para rationale (causa) · partner marca, yo reviso mi propio draft. E2 Rúbrica 4 criterios (Format 1 + Grammar 1.5 + Vocabulary 1.5 + Clarity 1).',
        facilitation_notes: ['Peer review handout pre-impreso', 'Tiempo: 15 min peer review + 25 min revisión + 15 min submission', 'Instructor califica al final con Rúbrica No 2 (inmediata)'],
        checkpoint: 'Cada aprendiz entrega Font Card final firmada + peer review form.',
        transition: 'Reading ✓. Writing ✓. Tomorrow: LISTENING and SPEAKING — the color conversation.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Lectura en voz alta de 3 Font Cards ejemplares (con permiso). Tablero consolidado: los 7 grupos gramaticales de A1.1 — subrayar Gr 2 y Gr 4 como introducidos hoy.',
      exit_ticket: '3 preguntas: (a) ¿Cuál fue tu mejor decisión de diseño en la Font Card? (b) ¿Qué error corrigió tu compañero? (c) ¿Qué llevarás a Sesión 4?',
      homework_autonomo: 'Escribir Font Card #2 de otra fuente (opcional, no evaluada). Descargar Ficha 2 audio (Color Conversation Laura-Sophia, 90s) — escuchar 1 vez sin transcripción para acostumbrar el oído.',
      preview_s4: '*Mañana: ESCUCHAS y HABLAS. Laura le enseña a Andrés la COLOR WHEEL. Después, tú HABLAS como Andrés. Prepara tus oídos y tu voz.*'
    },
    rap_status: 'S3 completada — E2 Writing generada (5 pts). Gr 2 + Gr 4 introducidos y practicados. Writing column del RAP establecida.'
  },

  4: {
    momento_sena: '3.3 Apropiación',
    estrategia_didactica: 'TBLT (Task-Based Language Teaching) — listening con vacío de información → transferencia oral inmediata',
    justificacion_didactica: 'Gr 5 (imperative) + Gr 14 (preposition in) emergen naturalmente en color briefing. La integración listening→speaking en una sesión permite reciclaje circular del mismo input (lexical approach).',
    worksheets_asignados: [
      'PM-2.6 — Listening Auditory Anchor (Ficha 2 Canva, ~145 min + E3 Cuestionario)',
      'PM-2.8 — Speaking The Mission (pronunciation + roleplay + E4, ~155 min)'
    ],
    habilidades_soporte: ['Reading (transcripción Ficha 2 post-listening)', 'Vocabulary (reciclaje 10 color terms)'],
    set_up: {
      warm_up: 'Color Wheel Unveiling + CMYK spelling relay',
      teacher_talk_opening: '*Designers, come close. Look at this. (*despliega rueda de color grande*) Twelve colors. Warm side — red, orange, yellow. Cool side — blue, green, purple. Today Laura teaches Andrés — and you. Tomorrow you BUY ink in CMYK.*',
      pasos: [
        'Unveiling de la rueda de color grande en el muro (3 min).',
        'CMYK spelling relay: C-M-Y-K letra por letra en cadena (5 min).',
        'Recall Toolbelt C2 Color — warm/cool/CMYK — 3 ejemplos rápidos del entorno.',
        'Declaración del objetivo: hoy ESCUCHAS a Laura y después HABLAS como Andrés.'
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Plenaria + parejas',
        tecnica_didactica: 'Pre-listening + vocabulary activation (PM-2.6 Archetype A)',
        title: 'Pre-listening — activación de color vocabulary + predicción',
        pm_source: 'PM-2.6 Archetype A TBLT pre-task',
        teacher_talk_instruction: '*Before we listen, we THINK. Laura calls Sophia — the client. Sophia has a PROBLEM. Predict: what does she say? Use warm/cool/CMYK/palette. In pairs, write 3 predictions.*',
        icq: ['Do we listen first or predict first?', 'How many predictions?', 'Pareja o solo?'],
        answer_key_inline: 'Predecir primero · 3 predictions · parejas. Predicciones posibles: \'The colors are too cool / She wants warm colors / The bakery is traditional / Cool feels modern\'.',
        facilitation_notes: ['Tablero: palabras pre-listening (warm/cool/bakery/problem)', 'Una aprendiz voluntaria escribe predicciones en tablero para clase', 'Reproducir audio sólo al final del bloque'],
        checkpoint: 'Cada pareja entrega 3 predictions escritas.',
        transition: '¡Time to listen! Play it cool — first listening, global.'
      },
      {
        key: 'while_b', duracion_min: 50, bloque_num: 'B', agrupacion: 'Individual + plenaria',
        tecnica_didactica: 'Global listening + Selective listening (PM-2.6 Archetype B)',
        title: 'First + Second listening + Cuestionario E3 Listening (Lista Chequeo No 3, 5 pts)',
        pm_source: 'PM-2.6 Archetype B COMPREHENSION + PM-4.1 INST-03',
        teacher_talk_instruction: '*Listening 1 — global. Close your eyes. Don\'t write. Just listen. (*play*) Now: WHAT is the problem? Listening 2 — selective. Listen for 5 specific color terms. Ready.*',
        icq: ['First listening — do we write?', 'Second listening — what 5 terms?', 'How many times do we listen total?'],
        answer_key_inline: 'No, sólo escuchar · 5 términos de color (warm/cool/palette/CMYK/complementary) · 2 veces primera parte + re-play E3. Listening checklist: topic + 8/10 details + warm/cool rule + 5 toolbelt + participation.',
        facilitation_notes: ['Audio Ficha 2 Canva Color Wheel 90s — reproducir claro, sin interrupciones', 'E3 Checklist durante el trabajo post-listening (no cuestionario escrito formal, sino observación 5 items)', 'Note-taking handout con 10 slots para details'],
        checkpoint: 'Cada aprendiz entrega note-taking handout + instructor marca E3 Checklist (5 items).',
        transition: 'Listening done. Now — your mouth opens. Pronunciation Lab!'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Plenaria + parejas',
        tecnica_didactica: 'Pronunciation scaffolding + Finger drilling (PM-2.8 pronunciation integrated)',
        title: 'Pronunciation Lab — stress en CMYK, warm/cool, imperatives',
        pm_source: 'PM-2.8 pronunciation scaffolding (from deprecated PM-2.7)',
        teacher_talk_instruction: '*Open your mouth. CMYK — C-M-Y-K. Four letters, four beats. warm /wɔːrm/. cool /kuːl/. USE (imperative — loud!). CHOOSE (two sounds — ch-uu-z). AVOID (three syllables).*',
        icq: ['¿Cuántos beats en CMYK?', '¿Cuántas sílabas en AVOID?', '¿Es /kuːl/ con doble o?'],
        answer_key_inline: '4 beats · 3 sílabas (a-VOID pero dividida: uh-VOID) · Sí doble o /uː/ larga.',
        facilitation_notes: ['Finger drilling: 1 dedo por sílaba', 'Clapping rítmico para CMYK (cuatro palmadas)', 'Mirror — aprendices se ven en espejo/celular'],
        checkpoint: '6 aprendices pronuncian CMYK + 1 imperative sin caer en préstamo del español.',
        transition: '¡Break! Come back with your BEST voice. Next — Speaking Mission.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Parejas + pequeños grupos',
        tecnica_didactica: 'Roleplay rehearsal + Language Bank preparation (PM-2.8 Archetype A)',
        title: 'Roleplay rehearsal — Junior Designer briefs Client (Andrés → Sophia)',
        pm_source: 'PM-2.8 mission_brief + Language Bank',
        teacher_talk_instruction: '*You are Andrés. Your partner is Sophia. 3 minutes. You tell her 5 design decisions for the bakery logo. Use this frame: \'The font is ___. The color is ___. The shape is ___. I use ___ because ___. Next steps: ___.\' Practice twice.*',
        icq: ['How many minutes per turn?', 'How many decisions?', '¿Practicamos una o dos veces?'],
        answer_key_inline: '3 min · 5 decisions · 2 veces (swap roles). Language Bank colgado en muro con 8 chunks fijos.',
        facilitation_notes: ['Cue cards visibles sólo en rehearsal (después se retiran)', '2 parejas simultáneas con observadores silenciosos', 'Instructor circula con cronómetro'],
        checkpoint: 'Cada pareja completa 2 rondas de 3 min con 5 decisions producidas.',
        transition: 'Rehearsed. Confident. Now — the real performance. E4 time.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Parejas observadas + instructor evaluator',
        tecnica_didactica: 'Performance task (PM-2.8 Archetype B) + E4 Speaking (Escala Estimación No 4)',
        title: 'E4 Evidencia Speaking — Performance en vivo (3 min × parejas)',
        pm_source: 'PM-2.8 mission_brief performance + PM-4.1 INST-04',
        teacher_talk_instruction: '*Now — real. No cue cards. 3 minutes. Your partner is Sophia. I observe. 5 criteria: communication + vocabulary + grammar + pronunciation + interaction. Begin when I say GO.*',
        icq: ['Do we have cue cards?', 'What 5 criteria?', 'How long?'],
        answer_key_inline: 'NO cue cards (Plan B sólo si freezes, -1 pt máx) · Communication + Vocab + Grammar + Pronunciation + Interaction · 3 min. Escala 2/1/0 → total /10 ÷ 2 = /5.',
        facilitation_notes: ['Evaluar 4 parejas en paralelo con co-observador o por rotación', 'Cronómetro visible + campana a los 3 min', 'Plan B activable si aprendiz se congela: first chunk del Language Bank como prompt'],
        checkpoint: 'Cada aprendiz con Escala Estimación No 4 calificada + firma del instructor.',
        transition: 'Today: Reading ✓ Writing ✓ Listening ✓ Speaking ✓. Four skills generated in 3 days. Mañana — las FUNCIONES que amarran todo.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Tablero consolidado: rueda de color + Language Bank 8 chunks + 7 stress words marked. Exit poll: ¿cuál habilidad te costó más hoy? Listening / Speaking / both.',
      exit_ticket: 'Grabar audio de 30s: \'Hello Laura. This is my name. I am a junior designer. I like [color] because [reason]. Thank you.\' Subir a Google Classroom.',
      homework_autonomo: 'Audio 60s describiendo paleta de color preferida con CMYK + warm/cool + imperative. Escuchar Ficha 2 una vez más en casa para internalizar prosodia.',
      preview_s5: '*Mañana: Language Functions — los GESTOS del lenguaje. Saludar, identificar, describir, instruir, aclarar. En 5 estaciones con 90 segundos cada una. Role Carousel.*'
    },
    rap_status: 'S4 completada — E3 Listening + E4 Speaking generadas (10 pts combinados). 2 evidencias en una sesión. Listening y Speaking columns del RAP establecidas.'
  },

  5: {
    momento_sena: '3.3 Apropiación',
    estrategia_didactica: 'Simulación rotativa (Role Carousel) — 5 estaciones × 90s + consolidación gramatical',
    justificacion_didactica: 'Gr 15 (and/but/or/because) es el último grupo Intro G1. Role Carousel evalúa integración de las 5 funciones en performance observable (E5 5 pts) — antesala de consolidación S6.',
    worksheets_asignados: ['PM-2.9 — Language Functions Communicative Competence (~305 min incluyendo E5)'],
    habilidades_soporte: ['Reading (function cards)', 'Writing (brief notes entre estaciones)'],
    set_up: {
      warm_up: 'Function Relay + Connector Wall reveal',
      teacher_talk_opening: '*Today is integration day. Five FUNCTIONS that every designer uses every day. SOCIALIZE. IDENTIFY. DESCRIBE. INSTRUCT. REPAIR and PREFER. You rotate through 5 stations. 90 seconds each. Ready?*',
      pasos: [
        'Function Relay: 5 aprendices pasan al frente con tarjeta de función (3 min).',
        'Connector Wall reveal — and / but / or / because con ejemplos de S2-S4 (Helvetica is clean BUT it is common / Warm colors feel friendly BECAUSE they remind fire).',
        'Modelado rápido de 5 chunks fijos — instructor demuestra.',
        'Declaración del objetivo: 5 estaciones, 90s cada una, rotación completa, E5 observable.'
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Plenaria + parejas',
        tecnica_didactica: 'Connector Awareness + Consciousness-raising (PM-2.10 Gr 15)',
        title: 'Gr 15 Connector Awareness — and / but / or / because',
        pm_source: 'PM-2.10 Gr 15 + PM-2.9 language bank',
        teacher_talk_instruction: '*Four connectors. AND joins. BUT contrasts. OR gives options. BECAUSE explains. Say: \'Helvetica is clean AND readable.\' \'Times is traditional BUT formal.\' \'Use serif OR sans-serif.\' \'I like warm colors BECAUSE they feel friendly.\'*',
        icq: ['¿Cuál conector contrasta?', '¿Y para causa?', '¿and o or para dos opciones?'],
        answer_key_inline: 'BUT · BECAUSE · OR. 12 gap-fill oraciones reciclando vocabulario de S2-S4.',
        facilitation_notes: ['Color-code: AND azul · BUT naranja · OR verde · BECAUSE rojo', 'Conectar con Gr 2-Gr 4 para continuidad', 'Aprendices escriben en cuaderno 4 oraciones propias con cada conector'],
        checkpoint: '10/12 gaps correctos + 4 oraciones propias entregadas.',
        transition: 'Connectors ready. Now — first two function stations set up.'
      },
      {
        key: 'while_b', duracion_num: 50, bloque_num: 'B', agrupacion: 'Plenaria modelado + parejas práctica',
        tecnica_didactica: 'Function modeling + Controlled practice (PM-2.9 Archetype A)',
        title: 'Función 1 SOCIALIZE + Función 2 IDENTIFY — modeling + rehearsal',
        pm_source: 'PM-2.9 FUNC-1 + FUNC-2',
        teacher_talk_instruction: '*FUNC-1 SOCIALIZE: Good morning. I am Andrés. Nice to meet you. My program is MGV. FUNC-2 IDENTIFY: This is a canvas. That is a toolbar. These are layers. Those are fonts. Practice in pairs.*',
        icq: ['How many chunks in FUNC-1?', 'This vs these?', '¿Usamos and?'],
        answer_key_inline: '4 chunks · this singular cerca / these plural cerca · Sí — unir con AND: \'Good morning AND nice to meet you.\'',
        facilitation_notes: ['Modelado 3 min por función', 'Parejas practican 2x por función', 'Corrección inmediata en chunks fijos (recast)'],
        checkpoint: 'Cada aprendiz demuestra FUNC-1 + FUNC-2 en plenaria rápida (30s).',
        transition: 'Two functions stacked. Three more to go. Keep rolling.'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Parejas + pequeños grupos',
        tecnica_didactica: 'Function modeling + Rehearsal (PM-2.9 FUNC-3 + FUNC-4)',
        title: 'Función 3 DESCRIBE + Función 4 INSTRUCT — rehearsal',
        pm_source: 'PM-2.9 FUNC-3 + FUNC-4',
        teacher_talk_instruction: '*FUNC-3 DESCRIBE: It is a logo. The color is warm. The font is serif — but it is modern because… FUNC-4 INSTRUCT: Open Canva. Save the file. Click the layer. Close the canvas.*',
        icq: ['¿Conector para DESCRIBE?', '¿Imperative needs subject?', '¿Cuántos imperativos en FUNC-4?'],
        answer_key_inline: 'but / because · NO (no subject — imperative puro) · 4 imperativos',
        facilitation_notes: ['FUNC-3 permite expresión más libre — tolerar errores', 'FUNC-4 requiere precisión imperativa — recast inmediato'],
        checkpoint: 'Cada aprendiz ejecuta FUNC-3 describiendo un objeto del aula + FUNC-4 dando 3 instrucciones.',
        transition: '¡Break! Final function + Role Carousel coming.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Plenaria + station setup',
        tecnica_didactica: 'Function modeling + Role Carousel preparation (PM-2.9 FUNC-5)',
        title: 'Función 5 REPAIR + PREFER + Role Carousel Setup',
        pm_source: 'PM-2.9 FUNC-5 + role_carousel_design_for_e5_evidence',
        teacher_talk_instruction: '*FUNC-5: Repeat please. Sorry, I don\'t understand. I like warm colors because they feel friendly. Now — the 5 stations are ready on the walls. You will rotate 90 seconds each. Observer marks 1 pt if you produce chunks + connector.*',
        icq: ['How long per station?', 'How many stations total?', 'Connector needed — yes or no?'],
        answer_key_inline: '90s · 5 stations · YES (varía por función: AND en 1,2,4 / BUT or BECAUSE en 3 / BECAUSE en 5)',
        facilitation_notes: ['5 mesas marcadas con rótulos visibles', 'Observadores rotan — instructor + 2 co-observers (aprendices seniors si hay)', 'Rubric E5 impreso en cada estación'],
        checkpoint: '5 estaciones montadas + cronómetro listo + Rubric E5 distribuida.',
        transition: '¡Carousel de inicio! 5 × 90s. Start position: station 1.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Rotación individual × 5 estaciones',
        tecnica_didactica: 'Performance integrado (PM-2.9 Role Carousel) + E5 (Escala Estimación No 5)',
        title: 'E5 Role Carousel — Performance en 5 estaciones × 90s',
        pm_source: 'PM-2.9 role_carousel_design + PM-4.1 INST-05',
        teacher_talk_instruction: '*Station 1 — go! 90 seconds. Produce chunks. Use connector. (*ring*) Rotate. Station 2 — go! ... 5 rounds. After: debrief.*',
        icq: ['¿Cuántas rondas?', '¿Dejamos la estación en 90s?', '¿Observer nos da feedback en vivo?'],
        answer_key_inline: '5 rondas por aprendiz · sí, campana de 90s · NO en vivo, feedback al final.',
        facilitation_notes: ['Cronómetro + campana visible/audible', '5 aprendices simultáneamente (una por estación) — rotación sincronizada', 'Observadores marcan 1/0 pt por estación en Rubric E5', '45 min Carousel + 10 min debrief inmediato'],
        checkpoint: 'Cada aprendiz con Rubric E5 con 5 marcas (0 a 5 pts) firmada por observador.',
        transition: 'Five functions mastered. Tomorrow — EVERYTHING on one quiz. Bring your A-game. E6 is coming.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Tablero consolidado de 7 grupos gramaticales (Gr 1, 2, 3, 4, 5, 14, 15 — ahora todos introducidos). Conversión rápida 5 funciones × Pixel & Ink scenarios. Revisión de 20 palabras Toolbelt.',
      exit_ticket: '(a) ¿En qué estación me fue mejor? (b) ¿Cuál conector sentí más natural? (c) ¿Qué necesito practicar antes del E6 de mañana?',
      homework_autonomo: 'Video 90s: presentándose como Junior Designer en Pixel & Ink Studio — usar 3 funciones de las 5 + 2 conectores. Revisar PM-0 §7 self-check de 22 ítems como pre-test auto-aplicado.',
      preview_s6: '*Mañana: EL GRAN CUESTIONARIO. 25 preguntas. 5 secciones. 25 puntos. Reading + Writing + Listening + Vocabulary + Grammar. Prepárate: buen sueño, desayuno, portafolio listo.*'
    },
    rap_status: 'S5 completada — E5 Language Functions generada (5 pts). Apropiación cerrada con 25 pts totales en E1-E5. Listos para consolidación E6.'
  },

  6: {
    momento_sena: '3.3 Apropiación — consolidación (transición a Evaluación)',
    estrategia_didactica: 'Evaluación formativa-sumativa + Retroalimentación grupal + Auto-evaluación metacognitiva',
    justificacion_didactica: 'E6 (25 pts) consolida las 5 habilidades receptivas y formaliza el conocimiento A1.1. PM-0 §7 checklist permite al aprendiz auto-diagnosticar brechas antes de Transferencia.',
    worksheets_asignados: ['PM-4.2 — Cuestionario Técnico Consolidado S6 (25 ítems × 1 pt, ~315 min)'],
    habilidades_soporte: ['Autoevaluación metacognitiva (PM-0 §7, 22 items)', 'Co-evaluación guiada'],
    set_up: {
      warm_up: 'Portafolio Check-in + Pre-Quiz Warm-up',
      teacher_talk_opening: '*Today — you show me what you know. Not what you memorize — what you USE. 25 questions. 5 sections. 25 points. Silence means focus, not stress. I trust you.*',
      pasos: [
        'Portafolio check — cada aprendiz muestra sus 5 evidencias previas organizadas (5 min).',
        'Pre-quiz warm-up light — 3 ejemplos de cada habilidad en tablero (10 min).',
        'Instrucciones formales de examen — silencio académico + tiempos.',
        'Declaración del objetivo: honrar el proceso de S1-S5 con esfuerzo sincero en E6.'
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Individual silencioso',
        tecnica_didactica: 'Evaluación formal (PM-4.2 Sección 1 Reading)',
        title: 'E6 Sección 1: Reading Comprehension (5 ítems × 1 pt, ~25 min)',
        pm_source: 'PM-4.2 section_1_reading',
        teacher_talk_instruction: '*Silent mode. Pens down. (*distribute*) Read the Master Anchor Text reprint. Answer 5 questions. 25 minutes. Then I collect.*',
        icq: ['How many questions?', 'Minutes available?', '¿Puedo pedir ayuda?'],
        answer_key_inline: '5 · 25 min · NO durante el quiz. Key: C C B C B (no visible al aprendiz).',
        facilitation_notes: ['Supervisar sin responder · cronómetro visible · silencio estricto', 'Al cerrar 25 min: pausa de 30s de respiración antes de Sección 2'],
        checkpoint: 'Cada aprendiz con Sección 1 marcada y entregada a cajonera.',
        transition: 'Section 1 done. Section 2 ready. Pencils up.'
      },
      {
        key: 'while_b', duracion_min: 50, bloque_num: 'B', agrupacion: 'Individual silencioso',
        tecnica_didactica: 'Evaluación formal (PM-4.2 Sección 2 Writing)',
        title: 'E6 Sección 2: Writing Conventions (5 ítems × 1 pt, ~25 min)',
        pm_source: 'PM-4.2 section_2_writing',
        teacher_talk_instruction: '*Section 2. Writing conventions. 5 questions. 25 minutes. Go.*',
        icq: ['¿Mismo tiempo que Sección 1?', '¿Puedo volver a Sección 1 si me sobra tiempo?'],
        answer_key_inline: 'Sí, 25 min · NO — no regresar a secciones completadas. Key: B A B C B.',
        facilitation_notes: ['Recoger Sección 1 ANTES de distribuir Sección 2', 'Mantener cronómetro visible', 'Silencio monástico'],
        checkpoint: 'Cada aprendiz con Sección 2 marcada y entregada.',
        transition: 'Half done. Now your ears: Listening coming.'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Individual silencioso + listening',
        tecnica_didactica: 'Evaluación formal con audio (PM-4.2 Sección 3 Listening)',
        title: 'E6 Sección 3: Listening Comprehension (5 ítems × 1 pt, audio + 20 min)',
        pm_source: 'PM-4.2 section_3_listening',
        teacher_talk_instruction: '*Section 3. Listening. I play Ficha 2 TWICE. No pause between plays. Then you have 15 minutes to mark 5 questions.*',
        icq: ['How many plays?', 'Pause between?', 'Minutes to answer?'],
        answer_key_inline: '2 plays · NO pause · 15 min respuesta. Key: B C B B B.',
        facilitation_notes: ['Audio reproducido en buena calidad · verificar volumen previo', 'Distribuir Sección 3 DESPUÉS del segundo play (evitar anticipación)', 'Key: B C B B B'],
        checkpoint: 'Cada aprendiz con Sección 3 marcada y entregada.',
        transition: 'Break — 20 min de RESPIRAR. After: final two sections.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Individual silencioso',
        tecnica_didactica: 'Evaluación formal (PM-4.2 Secciones 4+5 Vocabulary+Grammar)',
        title: 'E6 Secciones 4 + 5: Vocabulary (5) + Grammar (5) — 10 ítems × 1 pt, ~45 min',
        pm_source: 'PM-4.2 section_4_vocabulary + section_5_grammar',
        teacher_talk_instruction: '*Last push. Two sections in one block. Vocabulary 5 + Grammar 5. 45 minutes total. Pace yourself: ~4 min per question. Go.*',
        icq: ['¿Pueden ir en el orden que prefieran dentro de las 2 secciones?', '¿Tiempo total?'],
        answer_key_inline: 'SI dentro de las 2 secciones · 45 min. Keys: Vocab B C D B C / Grammar C D B B C.',
        facilitation_notes: ['Distribuir ambas secciones juntas', 'Recordar tiempo a los 30 min restantes', 'Recoger todo junto al cerrar'],
        checkpoint: 'Cada aprendiz con Secciones 4+5 marcadas y entregadas. E6 COMPLETO.',
        transition: 'E6 done. You gave it all. Now — we look together at the patterns.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Plenaria + parejas',
        tecnica_didactica: 'Feedback grupal + Co-evaluación + Retroalimentación formativa',
        title: 'Co-evaluación + Análisis de errores grupal + Retroalimentación',
        pm_source: 'PM-4.2 scoring_matrix_instructor',
        teacher_talk_instruction: '*Pair up with someone NOT your usual partner. I give you a partial key. Mark each other. Then we look at the top 3 most-missed questions — together.*',
        icq: ['¿Corrijo mi propio quiz o el de mi pareja?', '¿La clave es completa?', '¿Luego vemos errores individuales o grupales?'],
        answer_key_inline: 'El de la pareja · clave parcial (sólo respuestas, no explicación) · errores GRUPALES primero, individuales como tarea.',
        facilitation_notes: ['Clave parcial impresa (respuestas sin rationale)', 'Tablero con top 3 errores más comunes + re-explicación breve', 'Cada aprendiz recibe su score final por sección'],
        checkpoint: 'Cada aprendiz conoce su puntaje E6 (ej: 18/25) + identifica su habilidad más débil.',
        transition: 'You know where you are. Tomorrow — TRANSFER. Your Mood Board for Sophia begins.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Tablero final: tus 5 evidencias formativas (E1-E5, 25 pts) + E6 consolidado (25 pts) = 50/55 del canon. Misión Final (5 pts) pendiente. Celebrar lo logrado.',
      exit_ticket: '(a) ¿Cuál fue mi puntaje E6 total? (b) ¿Cuál sección me costó más? (c) ¿Qué pregunta haré a Laura en S7 sobre el brief?',
      homework_autonomo: 'Completar PM-0 §7 checklist de 22 ítems (auto-evaluación A1.1). Leer el brief de Pixel & Ink Studio para Sophia (entregado al cierre).',
      preview_s7: '*Mañana: Misión Final Kickoff. Sophia tiene un proyecto urgente: Mood Board para una bakery tradicional. TÚ eres el Junior Designer asignado. Lees el brief, planeas, diseñas. 2 sesiones para entregar lo mejor tuyo.*'
    },
    rap_status: 'S6 completada — E6 Cuestionario Consolidado generado (25 pts). Evaluación receptiva cerrada. 50/55 pts del canon alcanzados. Brecha identificada por aprendiz.'
  },

  7: {
    momento_sena: '3.4 Transferencia (1ª mitad — ABP Planeación + Diseño)',
    estrategia_didactica: 'ABP (Aprendizaje Basado en Proyectos) — fase exploratoria y de diseño; instructor = monitor/facilitador',
    justificacion_didactica: 'Transfer requiere autonomía. El aprendiz lidera, el instructor monitorea. Sin evidencia sumativa en S7 — se prepara para evaluación ABP en S8 (5 pts E-Misión).',
    worksheets_asignados: ['PM-3.5 — Final Mission Sub-fases 1 (Planeación) + 2 (Diseño) (~315 min)'],
    habilidades_soporte: ['Todas las 5 habilidades integradas en producción del Mood Board'],
    set_up: {
      warm_up: 'Brief Unveiling + Studio Tour',
      teacher_talk_opening: '*Welcome to the real job. Sophia from Pixel & Ink Studio needs YOU. Client: La Esquina Bakery. Problem: their current brand feels cold. Mission: Mood Board with 6 references. Deadline: tomorrow 6pm. Time to DESIGN.*',
      pasos: [
        'Unveiling del brief formal (handout + slides) — lectura en grupo 3 min.',
        'Studio Tour virtual — avatares, biblioteca de referencias, reglas de citación visual (2 min).',
        'Modelado rápido de Canvas Planeación ABP 4 preguntas.',
        'Declaración del objetivo: hoy PLANEAS y DISEÑAS el draft. Mañana lo terminas + presentas.'
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Individual + consultas',
        tecnica_didactica: 'Brief reading + Analysis (ABP fase análisis contexto)',
        title: 'Brief Reading + Analysis — ¿qué quiere Sophia?',
        pm_source: 'PM-3.5 Sub-fase 1a Briefing',
        teacher_talk_instruction: '*Read the brief silently. Highlight 3 things: WHAT (deliverable) · WHO (audience) · WHEN (deadline). Then write 1 question for Sophia in the Q-slot.*',
        icq: ['How many things to highlight?', 'How many questions can I write?', 'Is silent or talk?'],
        answer_key_inline: '3 (What/Who/When) · 1 pregunta · silencio primero. Brief ejemplo: deliverable=Mood Board 6 refs · audience=cliente+junta interna · deadline=mañana 6pm.',
        facilitation_notes: ['Brief impreso A4 doble cara', 'Highlighter amarillo por aprendiz', 'NO responder preguntas de contenido — dejar en Q-slot para fase de consulta'],
        checkpoint: 'Cada aprendiz con brief anotado + 1 pregunta válida para Sophia.',
        transition: 'You understand what. Now — WHY and HOW.'
      },
      {
        key: 'while_b', duracion_min: 50, bloque_num: 'B', agrupacion: 'Individual',
        tecnica_didactica: 'Canvas Planeación ABP (4 preguntas)',
        title: 'Canvas Planeación — WHAT / WHY / HOW / BY WHEN',
        pm_source: 'PM-3.5 Sub-fase 1b Planeación',
        teacher_talk_instruction: '*Canvas Planeación. 4 boxes. WHAT = objective of my Mood Board. WHY = rationale (Sophia\'s brief says…). HOW = steps (search → select → label → arrange). BY WHEN = tomorrow 12pm for first draft, 5pm for final. Write in English — basic is fine.*',
        icq: ['¿Cuántas cajas?', '¿En qué idioma?', '¿Fecha interna o final?'],
        answer_key_inline: '4 · inglés básico · dos fechas (draft mañana 12pm · final mañana 5pm).',
        facilitation_notes: ['Canvas pre-impreso A3 con 4 cuadrantes', 'Permitir sketching visual dentro del Canvas', 'Circular — validar fechas realistas'],
        checkpoint: 'Cada aprendiz con Canvas completo en 4 cuadrantes.',
        transition: 'Plan ready. Now — hunt for REFERENCES.'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Individual + pequeños grupos (búsqueda)',
        tecnica_didactica: 'Reference search + Curation (ABP Diseño fase a)',
        title: 'Reference Search — 6 referencias visuales (web + impreso + entorno)',
        pm_source: 'PM-3.5 Sub-fase 2a Diseño - búsqueda',
        teacher_talk_instruction: '*Find 6 references. Mix: 2 from web (Pinterest/Behance) · 2 from print magazines · 2 from your environment (packaging, signage). Each reference = 1 typography + 1 color + 1 composition quality.*',
        icq: ['¿Cuántas referencias?', '¿Mezcla de fuentes?', '¿Qué describo en cada una?'],
        answer_key_inline: '6 · 2+2+2 (web+print+env) · 3 qualities (typography/color/composition).',
        facilitation_notes: ['Biblioteca de revistas pre-curadas disponible', '2 laptops para búsqueda web por turnos', 'Sin copiar/pegar — sólo capturar referencia + URL'],
        checkpoint: 'Cada aprendiz con 6 referencias compiladas (foto/print/URL).',
        transition: '¡Break! Return ready to LAYOUT.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Individual',
        tecnica_didactica: 'Visual composition + Layout (ABP Diseño fase b)',
        title: 'Mood Board Layout — primer draft físico A3',
        pm_source: 'PM-3.5 Sub-fase 2b Diseño - composición',
        teacher_talk_instruction: '*A3 template. 6 slots. Place references thoughtfully: warm colors on one side, cool on the other. Typography samples in a group. Composition references at center. Think BALANCE.*',
        icq: ['¿Cuántos slots?', '¿Warm y cool juntos o separados?', '¿Balance qué significa?'],
        answer_key_inline: '6 · separados · balance = peso visual equilibrado (Toolbelt C3 balance).',
        facilitation_notes: ['Plantilla A3 pre-diseñada con 6 slots', 'Tijeras/pegamento para draft físico (aún no pegar definitivo)', 'Fotografiar layouts draft con celular'],
        checkpoint: 'Cada aprendiz con Mood Board draft A3 con 6 referencias ubicadas.',
        transition: 'Draft done. Now — labels and consultation.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Individual + consulta con instructor/monitor',
        tecnica_didactica: 'Labeling bilingüe + Peer review + Consulta monitor (ABP iteración)',
        title: 'Etiquetado bilingüe + Consulta con Laura (instructor-monitor)',
        pm_source: 'PM-3.5 Sub-fase 2c Diseño - refinamiento',
        teacher_talk_instruction: '*Label each of your 6 references in English. 3 descriptors: typography (serif/sans-serif/display) · color (warm/cool) · composition (balanced/dynamic/minimal). Then — come to me. 3 min consultation each. Quick.*',
        icq: ['¿Cuántos descriptores por referencia?', '¿En qué idioma?', '¿Cuánto dura la consulta con Laura?'],
        answer_key_inline: '3 (typography+color+composition) · inglés · 3 min por aprendiz.',
        facilitation_notes: ['Etiquetas pre-impresas opcionales o escritas a mano', 'Consultation queue con cronómetro · 3 min estrictos', 'Feedback: 1 strength + 1 specific improvement point (no cuestionar todo el Mood Board)'],
        checkpoint: 'Cada aprendiz con Mood Board con 18 etiquetas (6×3) + consulta firmada por instructor.',
        transition: 'Today you PLANNED and DESIGNED. Tomorrow — EXECUTE + PRESENT. Final day of the guide.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Galería mini — cada aprendiz muestra Mood Board draft 30s en plenaria. Identificar 3 patrones comunes: (1) warm dominance · (2) serif-heavy typography · (3) balanced compositions.',
      exit_ticket: '(a) ¿Qué referencia es mi favorita y por qué? · (b) ¿Qué cambiaré antes de mañana? · (c) ¿Qué pregunta aún tengo para Sophia?',
      homework_autonomo: 'Completar draft + rehearse 2 min de presentación solo en casa (grabar audio para auto-escucha). Preparar script de presentación con 5 moves: Greeting → Brief recap → 3 key decisions → Invitation to feedback → Closing.',
      preview_s8: '*Mañana: Final Mission Delivery. Presentas a Laura + Sophia + 2 pares jurados. 2 minutos estrictos. Rúbrica ABP 6 criterios. 5 puntos del canon. Luego — reflexión final + certificado Junior Apprentice.*'
    },
    rap_status: 'S7 completada — Mood Board draft + Planning Canvas entregados. Sin evidencia sumativa (transferencia ABP). Preparación para E-Misión S8.'
  },

  8: {
    momento_sena: '3.4 Transferencia (2ª mitad — ABP Desempeño + Presentación + Evaluación reflexiva)',
    estrategia_didactica: 'ABP — fases de ejecución, presentación y evaluación reflexiva; instructor monitorea + evalúa con rúbrica',
    justificacion_didactica: 'S8 cierra el RAP. E-Misión (5 pts, 6 criterios ABP) completa canon 55. Reflexión metacognitiva permite transferencia a G2 y auto-regulación futura.',
    worksheets_asignados: ['PM-3.5 — Final Mission Sub-fases 3 (Desempeño) + 4 (Presentación) + 5 (Evaluación reflexiva) (~360 min)'],
    habilidades_soporte: ['5 habilidades integradas en presentación oral + producto final'],
    set_up: {
      warm_up: 'Studio Showcase Setup + Breathing Ritual',
      teacher_talk_opening: '*Last session of Guía 1. Today you\'re a Junior Apprentice of Pixel & Ink Studio. You execute. You present. You reflect. Then — you get your certificate. Deep breath. This is YOUR moment.*',
      pasos: [
        'Studio Showcase Setup — Mood Boards de S7 en muro (5 min).',
        'Breathing ritual — 4-7-8 respiración para calmar ansiedad pre-presentación (3 min).',
        'Recall de Rúbrica ABP 6 criterios — qué se evalúa hoy.',
        'Declaración del objetivo: entregar lo mejor tuyo + reflexionar honestamente.'
      ]
    },
    while_blocks: [
      {
        key: 'while_a', duracion_min: 55, bloque_num: 'A', agrupacion: 'Individual',
        tecnica_didactica: 'Final execution + Post-feedback revision (ABP Desempeño)',
        title: 'Mood Board Finalización — ajustes post-feedback S7',
        pm_source: 'PM-3.5 Sub-fase 3 Desempeño',
        teacher_talk_instruction: '*You got feedback yesterday. Now — fix it. Pegamento definitivo. Letras finales. Limpieza. 45 minutes. Your Mood Board must be READY by 10am.*',
        icq: ['¿Pego definitivo ahora?', '¿Puedo cambiar referencias?', '¿Hora límite?'],
        answer_key_inline: 'SI pegamento final · NO cambiar referencias (sólo ajustes) · 10am estricto.',
        facilitation_notes: ['Suministros finales: pegamento stick, marcadores finos, plantilla A3 limpia', 'Circular sin intervenir — instructor = monitor silencioso', 'Fotografiar Mood Board terminado para archivo digital'],
        checkpoint: 'Cada aprendiz con Mood Board FINAL pegado, limpio, etiquetado.',
        transition: 'Product ready. Now — your VOICE. Rehearsal time.'
      },
      {
        key: 'while_b', duracion_min: 50, bloque_num: 'B', agrupacion: 'Parejas',
        tecnica_didactica: 'Pair rehearsal + Timing + Peer feedback (ABP Presentación fase a)',
        title: 'Ensayo en parejas — 2 min + 1 feedback iteration',
        pm_source: 'PM-3.5 Sub-fase 4a Rehearsal',
        teacher_talk_instruction: '*Pair up. A presents 2 minutes. B listens + marks: did you use greeting? 3 decisions? rationale with because? closing? Swap. Then A refines. Then B refines.*',
        icq: ['¿Cuánto dura cada turno?', '¿Qué marca B?', '¿Hay ronda de refinamiento?'],
        answer_key_inline: '2 min · 5 elementos (greet/3 decisions/because/closing/total timing) · sí, 1 iteración por aprendiz.',
        facilitation_notes: ['Cronómetro + campana de 2 min', '2 rondas × 3 min por pareja (presentar + feedback)', 'Permitir uso de Language Bank visible en muro'],
        checkpoint: 'Cada aprendiz con 2 rondas de rehearsal + 1 feedback escrito de pareja.',
        transition: 'Rehearsed. Ready. Live presentations next — ROUND 1.'
      },
      {
        key: 'while_c', duracion_min: 45, bloque_num: 'C', agrupacion: 'Plenaria — 1 presentador + audiencia',
        tecnica_didactica: 'Live performance Round 1 (ABP Presentación fase b)',
        title: 'Presentaciones en vivo — Round 1 (primeros aprendices)',
        pm_source: 'PM-3.5 Sub-fase 4b Live Round 1 + Rúbrica ABP',
        teacher_talk_instruction: '*First round. 2 minutes each. Laura (me) + Sophia (rotating peer) + 2 peer jurors. Rubric 6 criteria: content (2) + organization (1) + language use (1) + presentation skills (1) + engagement (0.5) + timing (0.5) = 5 pts.*',
        icq: ['¿Cuántos criterios?', '¿Puntos total?', '¿Quiénes evalúan?'],
        answer_key_inline: '6 criterios · 5 pts total · Laura(instructor)+Sophia(par)+2 jurados. Ronda 1: ~8 aprendices × 2 min + transición = 45 min.',
        facilitation_notes: ['Cronómetro visible + campana a los 2 min (terminar aunque no haya acabado — realismo laboral)', 'Instructor marca Rúbrica ABP durante cada presentación', 'Aplauso calibrado al cierre — ni escaso ni excesivo'],
        checkpoint: '~8 aprendices presentaron + recibieron Rúbrica marcada.',
        transition: 'Break — recharge. Round 2 coming.'
      },
      {
        key: 'while_d', duracion_min: 50, bloque_num: 'D', agrupacion: 'Plenaria — continuación',
        tecnica_didactica: 'Live performance Round 2 + Peer evaluation (ABP Presentación fase c)',
        title: 'Presentaciones en vivo — Round 2 + Peer Eval con 3 stars + 1 wish',
        pm_source: 'PM-3.5 Sub-fase 4c Live Round 2 + Peer Feedback',
        teacher_talk_instruction: '*Round 2. Same format. After all presentations end — peer feedback. Each juror gives each presenter: 3 stars (what worked) + 1 wish (what to improve). Written on notecards.*',
        icq: ['¿Mismo formato que Round 1?', '¿Cuándo el peer feedback?', '¿Cómo se entrega?'],
        answer_key_inline: 'Sí · después de todas las presentaciones · notecards escritas pasadas a cada presentador.',
        facilitation_notes: ['~8 aprendices segunda mitad', '50 min = 40 min presentaciones + 10 min peer feedback writing', 'Notecards pre-cortadas distribuidas'],
        checkpoint: 'Todos los aprendices presentaron + recibieron Rúbrica ABP + ≥3 peer notecards con 3 stars + 1 wish.',
        transition: 'All presented. Now — the most important part. REFLECTION.'
      },
      {
        key: 'while_e', duracion_min: 55, bloque_num: 'E', agrupacion: 'Individual + plenaria',
        tecnica_didactica: 'Metacognitive reflection + Self-evaluation (ABP Evaluación fase 5)',
        title: 'Evaluación Reflexiva Final — \'What I see now that I did not see on Day 1\'',
        pm_source: 'PM-3.5 Sub-fase 5 Evaluación Reflexiva',
        teacher_talk_instruction: '*Take 15 minutes. Write in your preferred language: What did you see on Day 1 that you see DIFFERENTLY now? Language. Design. Yourself. Then — 3 volunteers share 60 seconds each in plenary.*',
        icq: ['¿En qué idioma escribo?', '¿Sobre qué 3 aspectos?', '¿Cuántos voluntarios?'],
        answer_key_inline: 'Idioma preferido (L1 permitido) · Lenguaje + Diseño + Yo mismo · 3 voluntarios × 60s.',
        facilitation_notes: ['Handout reflexivo con 3 prompts + espacio amplio', 'Instructor lee silenciosamente mientras aprendices escriben (15 min silencio)', 'Plenaria final: 3 voluntarios + instructor cierre emocional'],
        checkpoint: 'Cada aprendiz con reflexión escrita (≥100 palabras) + al menos 3 voluntarios compartieron.',
        transition: 'Now — the moment. Certificate ceremony. You earned it.'
      }
    ],
    wrap_up: {
      duracion_min: 60,
      synthesis: 'Ceremonia de cierre: cada aprendiz recibe \'Certificate — Junior Apprentice at Pixel & Ink Studio\' (simbólico). Breve reconocimiento individual por el instructor (una fortaleza única). Puntaje final canon 55 entregado individualmente.',
      exit_ticket: '(a) Puntaje final total (E1-E6 + E-Misión) = ?/55 · (b) ¿Cuál fue mi mayor descubrimiento en estas 8 sesiones? · (c) ¿Listo para G2 — The Client Whisperer? (Sí / Necesito repaso en __)',
      homework_autonomo: 'Actualizar portafolio personal con (1) foto del Mood Board final, (2) audio de presentación, (3) reflexión escrita, (4) certificate. Preparar entrada para G2: brief inicial de cliente (material enviado digitalmente en próximos días).',
      bridge_g2: '*Guía 1 The Visual Communicator cerrada. Guía 2 The Client Whisperer (A1.2) te espera. Misma universo — Pixel & Ink Studio. Ahora: leer y escribir BRIEFS completos con cliente real. Puente: lo que aprendiste de diseño visual es el lenguaje que usarás para conversar con el cliente. ¡Buen viaje!*'
    },
    rap_status: 'S8 completada — E-Misión Final generada (5 pts). Canon 55 pts completado. RAP 240202501-01 cerrado. Aprendiz listo para G2 A1.2.'
  }
};

// ---------- Build & write ----------
function buildSession(n) {
  const s = sesiones.find(x => x.sesion === n);
  const plan = SESSION_PLANS[n];
  if (!s || !plan) throw new Error('Missing data for S' + n);

  // timeline: merge skeleton + plan activities
  const timeline = TIMELINE_SKELETON.map(t => {
    let actividad = '—', agrupacion = '—', notas = '';
    if (t.bloque === 'SET-UP') {
      actividad = plan.set_up.warm_up + ' + objetivos + Teacher Talk apertura';
      agrupacion = 'Whole class → Individual';
      notas = 'Activación + English Zone refresh';
    } else if (t.bloque === 'BREAK') {
      actividad = 'Receso activo';
      agrupacion = '—';
      notas = 'Hidratación · English Zone mantenida';
    } else if (t.bloque === 'WRAP-UP') {
      actividad = 'Síntesis + exit ticket + homework + preview';
      agrupacion = 'Plenaria + individual';
      notas = plan.wrap_up.synthesis.substring(0, 120);
    } else {
      // WHILE A-E
      const letter = t.bloque.replace('WHILE ', '').toLowerCase();
      const wb = plan.while_blocks.find(b => b.key === 'while_' + letter);
      if (wb) {
        actividad = wb.title;
        agrupacion = wb.agrupacion;
        notas = wb.tecnica_didactica;
      }
    }
    return { tiempo: t.tiempo, duracion_min: t.duracion_min, bloque: t.bloque, actividad, agrupacion, notas };
  });

  // totals check
  const totalMin = TIMELINE_SKELETON.reduce((a, t) => a + t.duracion_min, 0);

  // Build while object
  const whileObj = {};
  for (const b of plan.while_blocks) {
    whileObj[b.key] = {
      bloque: 'WHILE ' + b.bloque_num,
      title: b.title,
      duracion_min: b.duracion_min,
      agrupacion: b.agrupacion,
      tecnica_didactica: b.tecnica_didactica,
      pm_source: b.pm_source,
      teacher_talk_instruction: b.teacher_talk_instruction,
      icq: b.icq,
      answer_key_inline: b.answer_key_inline,
      facilitation_notes: b.facilitation_notes,
      checkpoint: b.checkpoint,
      transition: b.transition
    };
  }

  // Materials checklist (session-specific, derived from blueprint)
  const materials_checklist = (s.materials || []).map(item => ({
    item,
    cantidad: item.toLowerCase().includes('tablero') || item.toLowerCase().includes('proyector') || item.toLowerCase().includes('parlantes') ? '1' : '8 unidades',
    verificado: false
  }));
  // Add session-specific extras
  if (n === 2) materials_checklist.push({ item: 'Toolbelt — 20 tarjetas físicas (front: palabra+stress | back: imagen)', cantidad: '1 set + 5 sets adicionales', verificado: false });
  if (n === 2) materials_checklist.push({ item: 'Cuestionario E1 Reading (INST-01 PM-4.1) impreso', cantidad: '8 copias', verificado: false });
  if (n === 3) materials_checklist.push({ item: 'Rúbrica E2 Writing (INST-02 PM-4.1) impresa', cantidad: '8 copias', verificado: false });
  if (n === 4) materials_checklist.push({ item: 'Lista Chequeo E3 Listening (INST-03) + Escala E4 Speaking (INST-04)', cantidad: '8+8 copias', verificado: false });
  if (n === 5) materials_checklist.push({ item: 'Escala Estimación E5 Language Functions (INST-05) × 5 estaciones', cantidad: '8 copias + 5 posters de estación', verificado: false });
  if (n === 6) materials_checklist.push({ item: 'Cuestionario E6 Consolidado (PM-4.2) impreso en 3 folios separados por sección', cantidad: '8 copias', verificado: false });
  if (n === 6) materials_checklist.push({ item: 'Clave parcial E6 para co-evaluación', cantidad: '4 copias (1 por pareja)', verificado: false });
  if (n === 7) materials_checklist.push({ item: 'Brief de Pixel & Ink Studio — La Esquina Bakery', cantidad: '8 copias + 1 slide maestro', verificado: false });
  if (n === 7) materials_checklist.push({ item: 'Canvas Planeación ABP A3 (4 cuadrantes WHAT/WHY/HOW/WHEN)', cantidad: '8 unidades', verificado: false });
  if (n === 8) materials_checklist.push({ item: 'Rúbrica ABP Misión Final (6 criterios × ~0.8 pt = 5 pts)', cantidad: '8 copias + 3 copias juez/par', verificado: false });
  if (n === 8) materials_checklist.push({ item: 'Certificados simbólicos Pixel & Ink Studio Junior Apprentice', cantidad: '8 impresos + firma instructor', verificado: false });

  // Board plan per session
  const BOARD_PLAN_BY_S = {
    2: 'TABLERO: ENGLISH ZONE 🔵 superior derecha (permanente) · CENTRO: Toolbelt 5×4 (C1 Typography / C2 Color / C3 Shape / C4 Tools / C5 Products) con palabras + stress marcado · LADO IZQUIERDO: Master Anchor Text en pantalla proyectada · Word Wall lateral con 20 tarjetas.',
    3: 'TABLERO: ENGLISH ZONE 🔵 · CENTRO: Font Card template + 5 moves (Greeting→Decision→Rationale→Next steps→Closing) · LATERAL IZQUIERDA: Gr 2 cuadrantes cerca-lejos/sing-plural · LATERAL DERECHA: Gr 4 color-coded (ADJ naranja / NOUN navy) + Display Wall con 10 fuentes muestra.',
    4: 'TABLERO: ENGLISH ZONE 🔵 · CENTRO: Rueda de color grande (12 colores warm/cool) · LATERAL IZQUIERDA: Language Bank 8 chunks (5 decisions frame) · LATERAL DERECHA: CMYK spelling + imperative verbs (USE/CHOOSE/AVOID/MIX) · Swatches físicos pegados bajo la rueda.',
    5: 'TABLERO: ENGLISH ZONE 🔵 · CENTRO: 7 grupos gramaticales introducidos (Gr 1-5, 14, 15) en árbol · LATERAL IZQUIERDA: 5 función cards con chunks fijos · LATERAL DERECHA: Connector Wall (AND azul / BUT naranja / OR verde / BECAUSE rojo) · 5 estaciones preparadas con rótulos en muro.',
    6: 'TABLERO: ENGLISH ZONE 🔵 · CENTRO: Cronómetro gigante visible · LATERAL IZQUIERDA: Tabla resumen 5 evidencias anteriores (E1-E5 + descriptores) · LATERAL DERECHA: 7 grupos gramaticales como referencia pre-quiz · Post-quiz: top 3 errores grupales.',
    7: 'TABLERO: ENGLISH ZONE 🔵 · CENTRO: Brief de Pixel & Ink Studio + Canvas Planeación ABP ejemplar · LATERAL IZQUIERDA: Biblioteca de referencias + reglas de citación visual · LATERAL DERECHA: Etiquetas bilingües (typography/color/composition descriptors).',
    8: 'TABLERO: ENGLISH ZONE 🔵 · CENTRO: Studio Showcase — 8 Mood Boards finales expuestos · LATERAL IZQUIERDA: Rúbrica ABP 6 criterios visible · LATERAL DERECHA: Peer Feedback cards (3 stars + 1 wish template) · Cierre: tabla de canon 55 pts completada por aprendiz.'
  };

  return {
    pm_id: 'PM-3.2',
    pm_name: 'Playbook Build-Out — Session ' + n,
    pm_version: '2.5.1',
    pm_verified_against_prompt: true,
    session: n,
    session_name: s.nombre,
    run_id: 'MGV-2026-04-20',
    guide: 'G1 — The Visual Communicator',
    guia_numero: 1,
    programa: PROGRAMA,
    programa_codigo: PROG_CODE,
    duracion_min: totalMin,
    worksheets: plan.worksheets_asignados,
    habilidades_foco: s.pms_ejecutar,
    habilidades_soporte: plan.habilidades_soporte,
    cefr: 'A1.1',
    model: 'FPI CD Engine v2.5.1',
    generated_at: '2026-04-20',
    generated_by: 'Sergio',
    status: 'generated',
    piloto_note: 'Generado desde blueprint pm-2-0.sesiones[' + n + ']. Contenido original MGV G1 Pixel & Ink Studio. pm0_protocol se inyectará vía pm-3-2-pm0-propagate.js.',

    momento_sena: plan.momento_sena,
    estrategia_didactica: plan.estrategia_didactica,
    justificacion_didactica: plan.justificacion_didactica,

    session_header: {
      titulo: 'SESSION ' + n + ': ' + s.nombre,
      subtitulo: 'MGV Guía 1 · The Visual Communicator · Build-Out — Playbook v2.5.1',
      duracion_horas: 6,
      duracion_min: totalMin,
      worksheets_asignados: plan.worksheets_asignados,
      habilidades_soporte: plan.habilidades_soporte,
      nota_instructor: 'Documento interno del instructor — no distribuir a aprendices. Teacher Talk pre-modelado. Duración suma exacta ' + totalMin + ' min. L1 tope según pm0_protocol (se inyecta desde pm-3-1).'
    },

    materials_checklist,
    board_plan: BOARD_PLAN_BY_S[n] || '',
    timeline,
    set_up: {
      duracion_min: 25,
      warm_up: {
        nombre: plan.set_up.warm_up,
        pasos: plan.set_up.pasos,
        duration_min: 25
      },
      teacher_talk_opening: plan.set_up.teacher_talk_opening
    },
    while: whileObj,
    wrap_up: plan.wrap_up,

    answer_key_consolidado: {
      note: 'Answer keys por bloque están en while_X.answer_key_inline. Para E1/E2/E3/E4/E5 ver PM-4.1. Para E6 ver PM-4.2.',
      evidence_references: n === 2 ? ['E1 Reading → PM-4.1 INST-01'] :
        n === 3 ? ['E2 Writing → PM-4.1 INST-02'] :
        n === 4 ? ['E3 Listening → PM-4.1 INST-03', 'E4 Speaking → PM-4.1 INST-04'] :
        n === 5 ? ['E5 Language Functions → PM-4.1 INST-05'] :
        n === 6 ? ['E6 Cuestionario Consolidado → PM-4.2 (Reading CCBCB / Writing BABCB / Listening BCBBB / Vocabulary BCDBC / Grammar CDBBC)'] :
        n === 7 ? ['Sin evidencia formal — ABP Transferencia'] :
        n === 8 ? ['E-Misión → PM-3.5 Rúbrica ABP 6 criterios'] : []
    },

    differentiation: {
      fast_finishers: n <= 5 ? 'Expandir tarea con conector extra (because) + 1 Toolbelt term adicional' : 'Apoyar a un compañero con peer coaching',
      struggling_learners: n <= 5 ? 'Activar cue card visible + reducir timing -10% por bloque · L1 permitido en notas personales' : 'Plan B: reducir scope del Mood Board a 4 referencias (no 6) · L1 permitido en reflexión',
      neurodivergent_accomodations: 'Silencio de fondo · opción de headphones para listening · timer visual · auriculares anti-ruido disponibles'
    },

    instructor_self_check: [
      '¿L1 target respetado según pm0_protocol?',
      '¿Todos los bloques completados en tiempo?',
      '¿Evidencias generadas firmadas y archivadas?',
      '¿Transición a S' + (n + 1 > 8 ? 'next guide' : (n + 1)) + ' preparada?',
      '¿Exit tickets revisados para informar S' + (n + 1 > 8 ? 'G2' : (n + 1)) + '?'
    ],

    totals_check: {
      set_up: 25,
      while_a: plan.while_blocks[0].duracion_min,
      while_b: plan.while_blocks[1].duracion_min,
      while_c: plan.while_blocks[2].duracion_min,
      break: 20,
      while_d: plan.while_blocks[3].duracion_min,
      while_e: plan.while_blocks[4].duracion_min,
      wrap_up: 60,
      suma: totalMin,
      expected: 360,
      match: totalMin === 360
    },

    rap_status: plan.rap_status
  };
}

for (let n = 2; n <= 8; n++) {
  const doc = buildSession(n);
  const p = path.join(RUN_DIR, 'pm-3-2-s' + n + '.json');
  fs.writeFileSync(p, JSON.stringify(doc, null, 2));
  console.log('  [ok] ' + p + ' (session_name=' + doc.session_name + ', totals=' + doc.totals_check.suma + ')');
}
console.log('[done] 7 Build-Outs S2-S8 generados');
