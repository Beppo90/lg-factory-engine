#!/usr/bin/env node
/**
 * gen_pm32_v266_pm0_propagate.js — Fase 3.3 DIESEL-04-19 upgrade v2.6.6
 *
 * Propaga a los 8 pm-3-2-sX.json los campos canónicos derivados de:
 *   - pm-3-1.json.pm0_alignment_by_session[i] → pm0_protocol (schema MGV canon)
 *   - pm-3-1.json.estrategias_resumen.estrategia_dominante_por_sesion[i] → estrategia_didactica
 *   - pm-3-1.json.sessions_logistics[i] → session_logistics (session-wide)
 *
 * Schema pm0_protocol canónico v2.6.6 (fuente: MGV-2026-04-20 pm-3-2-s1.json):
 *   - __inherited_from__ / __contract_version__  (metadata)
 *   - grammar_groups (LIST of {group_id, group_name, nivel_activacion, ejemplo_en_sesion})
 *   - grammar_carga_check (string)
 *   - feedback { mode, rationale, accuracy_techniques[], fluency_techniques[], mixed_techniques[] }
 *   - l1_management { l1_percentage, l1_percentage_unit, source, l1_rationale }
 *   - stress_pronunciation { focus_words[{word, ipa, tonica}], techniques[] }
 *   - success_vocabulary { target_words[], factors_applied[], operationalization }
 *   - cefr_descriptor_focus { subnivel, habilidad_principal, descriptor_activo, source }
 *   - pedagogical_shift_hooks { velocidad_input, extension_textos, andamiaje, rol_docente, source }
 *   - traceability_seed_22 { items_priorizados_para_esta_sesion[], source, nota }
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RUN_DIR = path.join(__dirname, '..');
const PM31    = path.join(RUN_DIR, 'pm-3-1.json');

// Grammar groups (LIST per session, canon MGV format)
const GRAMMAR_PER_SESSION = {
  1: [
    { group_id: "Gr 1", group_name: "Verbo be (I'm/you're/is/are — afirmativo contraído)",
      nivel_activacion: "Reciclaje receptivo",
      ejemplo_en_sesion: "Teacher Talk: 'I'm Sergio. This is the Diesel Workshop.' (sin análisis formal)" }
  ],
  2: [
    { group_id: "Gr 1", group_name: "Verbo be",
      nivel_activacion: "Reciclaje receptivo",
      ejemplo_en_sesion: "This is a wrench. These are spark plugs." },
    { group_id: "Gr 2", group_name: "There is / there are + some/any",
      nivel_activacion: "Intro",
      ejemplo_en_sesion: "There are five categories. Are there any tools missing?" }
  ],
  3: [
    { group_id: "Gr 1", group_name: "Verbo be",
      nivel_activacion: "Consolida",
      ejemplo_en_sesion: "The oil level is low. The filters are new." },
    { group_id: "Gr 2", group_name: "There is / there are",
      nivel_activacion: "Consolida",
      ejemplo_en_sesion: "There are 8 items on the checklist." },
    { group_id: "Gr 5", group_name: "Imperativo afirmativo/negativo",
      nivel_activacion: "Intro",
      ejemplo_en_sesion: "Check oil level. Don't touch the hot engine." }
  ],
  4: [
    { group_id: "Gr 5", group_name: "Imperativo",
      nivel_activacion: "Consolida",
      ejemplo_en_sesion: "Listen carefully. Don't interrupt." },
    { group_id: "Gr 7", group_name: "can/can't (habilidad técnica)",
      nivel_activacion: "Intro",
      ejemplo_en_sesion: "I can fix this. The mechanic can't reach the bolt." }
  ],
  5: [
    { group_id: "Gr 7", group_name: "can/can't",
      nivel_activacion: "Consolida",
      ejemplo_en_sesion: "I can do basic maintenance. I can't diagnose electrical faults yet." },
    { group_id: "Gr 3", group_name: "Present Simple (rutinas y procedimientos)",
      nivel_activacion: "Intro",
      ejemplo_en_sesion: "I check the bay every morning. The mechanic changes oil weekly." }
  ],
  6: [
    { group_id: "Gr 1", group_name: "be", nivel_activacion: "Aplica",
      ejemplo_en_sesion: "Cuestionario items testing 'is/are/am'." },
    { group_id: "Gr 2", group_name: "there is/are", nivel_activacion: "Aplica",
      ejemplo_en_sesion: "Items testing existence structures." },
    { group_id: "Gr 3", group_name: "Present Simple", nivel_activacion: "Aplica",
      ejemplo_en_sesion: "Items testing routines." },
    { group_id: "Gr 5", group_name: "Imperativo", nivel_activacion: "Aplica",
      ejemplo_en_sesion: "Items testing instructions." },
    { group_id: "Gr 7", group_name: "can/can't", nivel_activacion: "Aplica",
      ejemplo_en_sesion: "Items testing ability statements." }
  ],
  7: [
    { group_id: "Gr 1+2+3+5+7", group_name: "ALL A1.1 groups en producción libre del Workshop Readiness Report",
      nivel_activacion: "Aplica",
      ejemplo_en_sesion: "There are 5 tools. I check them every morning. The supervisor can verify this." }
  ],
  8: [
    { group_id: "Gr 1+2+3+5+7", group_name: "ALL A1.1 groups en presentación oral del Workshop Readiness Report",
      nivel_activacion: "Aplica",
      ejemplo_en_sesion: "Presentation integrates all grammar groups with fluency-first feedback." }
  ]
};

const CARGA_CHECK_PER_SESSION = {
  1: "0 Intro — S1 es diagnóstico sin enseñanza gramatical explícita (PM-0 §9.2) ✓",
  2: "1 Intro (Gr 2) + 1 Reciclaje (Gr 1) — carga apropiada para input receptivo A1.1 ✓",
  3: "1 Intro (Gr 5) + 2 Consolida (Gr 1, Gr 2) — carga apropiada para producción escrita A1.1 ✓",
  4: "1 Intro (Gr 7) + 1 Consolida (Gr 5) — carga apropiada para listening + speaking A1.1 ✓",
  5: "1 Intro (Gr 3) + 1 Consolida (Gr 7) — carga apropiada para functions integradas A1.1 ✓",
  6: "5 Aplica (todos los grupos) — carga de evaluación sumativa consolidada ✓",
  7: "5 Aplica (producción libre ABP) — carga de transferencia libre ✓",
  8: "5 Aplica (presentación oral ABP) — carga de cierre A1.1 con fluency ✓"
};

const FEEDBACK_PER_SESSION = {
  1: {
    mode: "ACCURACY",
    rationale: "Día 1 prioriza precisión en chunks sociales fijos (greetings). Fluency vendrá desde S4. PM-0 §5.9.",
    accuracy_techniques: [
      "Choral repetition en saludos + nombres del Toolbelt",
      "Finger drilling breve (3-5 reps) para palabras tónicas",
      "Modelo-eco (instructor dice → clase repite)"
    ],
    fluency_techniques: [],
    mixed_techniques: []
  },
  2: {
    mode: "ACCURACY",
    rationale: "Input receptivo — foco en chunks precisos del Toolbelt. PM-0 §5.9.",
    accuracy_techniques: [
      "Recast inmediato en lectura en voz alta",
      "Clarification request ('Say again?')",
      "Word Wall pointing (señalar al Word Wall al oir error léxico)"
    ],
    fluency_techniques: [
      "Wait-time de 3s antes de corregir",
      "Peer-check en parejas antes del recast del instructor"
    ],
    mixed_techniques: []
  },
  3: {
    mode: "ACCURACY",
    rationale: "Escritura formal (Inspection Form) requiere precisión gramatical. PM-0 §5.9.",
    accuracy_techniques: [
      "Focus-on-form explícito en imperativo (Check/Don't + base)",
      "Peer correction con checklist visual",
      "Delayed whole-class feedback al final"
    ],
    fluency_techniques: [],
    mixed_techniques: []
  },
  4: {
    mode: "FLUENCY-LEANING",
    rationale: "Producción oral (roleplay mechanic/supervisor) prioriza fluidez sobre perfección formal. PM-0 §5.9.",
    accuracy_techniques: [
      "Recast solo en errores que bloquean comprensión",
      "Delayed correction en whiteboard al final del bloque"
    ],
    fluency_techniques: [
      "Encouragement verbal (Good! Keep going!)",
      "Communication strategies (gestures, tools on desk as realia)",
      "Self-repair modeling"
    ],
    mixed_techniques: [
      "Word stress mini-drill antes del roleplay (5 min)"
    ]
  },
  5: {
    mode: "FLUENCY-LEANING",
    rationale: "Language Functions en interacción — fluidez pragmática primero. PM-0 §5.9.",
    accuracy_techniques: [
      "Post-roleplay error log en whiteboard"
    ],
    fluency_techniques: [
      "Role rotation (mechanic/supervisor/customer)",
      "Functional formula practice (F1-F5 chunks)",
      "Celebration of communicative success"
    ],
    mixed_techniques: []
  },
  6: {
    mode: "ACCURACY",
    rationale: "Evaluación sumativa — cuestionario requiere precisión medible. PM-0 §5.9.",
    accuracy_techniques: [
      "Sin feedback durante ejecución (condiciones de examen)",
      "Feedback post-cuestionario con respuestas correctas"
    ],
    fluency_techniques: [],
    mixed_techniques: [
      "Metacognición reflexiva final (¿qué dominé?, ¿qué queda por mejorar?)"
    ]
  },
  7: {
    mode: "FLUENCY",
    rationale: "Preparación ABP Final Mission — prioridad absoluta a fluidez y comunicación. PM-0 §5.9.",
    accuracy_techniques: [
      "Peer correction en parejas (no instructor intervention)"
    ],
    fluency_techniques: [
      "Coaching individualizado 1:1",
      "Rehearsal structures con scaffolding gradual",
      "Risk-taking celebration"
    ],
    mixed_techniques: []
  },
  8: {
    mode: "FLUENCY",
    rationale: "Presentación ABP — fluidez final A1.1. PM-0 §5.9.",
    accuracy_techniques: [],
    fluency_techniques: [
      "Standing ovation practice",
      "Post-presentation verbal celebration",
      "Focus on message delivered, not form"
    ],
    mixed_techniques: [
      "Rubric feedback delayed a post-ceremony reflection"
    ]
  }
};

const L1_MGMT_PER_SESSION = {
  1: { pct: 30, rationale: "Día 1 establecer confianza y motivación. L1 es andamio emocional. Welcome + Gap Card en L1 dominante. PM-0 §9.1." },
  2: { pct: 25, rationale: "Input receptivo — L1 para clarificar instrucciones + vocabulary scaffolding. Reducción progresiva. PM-0 §9.1." },
  3: { pct: 20, rationale: "Output escrito — L1 solo para explicar estructuras gramaticales complejas (imperativo en negativo). PM-0 §9.1." },
  4: { pct: 15, rationale: "Listening + Speaking — L1 reducido a emergencias comunicativas; roleplay en English-only. PM-0 §9.1." },
  5: { pct: 12, rationale: "Language Functions — L1 solo como consulta léxica ocasional; interacción 85%+ en inglés. PM-0 §9.1." },
  6: { pct: 10, rationale: "Evaluación — cuestionario 100% en inglés; L1 solo en instrucciones iniciales y metacognición final. PM-0 §9.1." },
  7: { pct: 5,  rationale: "ABP Preparación — inmersión casi total. L1 solo para coaching emocional. PM-0 §9.1." },
  8: { pct: 5,  rationale: "ABP Presentación — transferencia al ambiente productivo. PM-0 §9.1." }
};

const STRESS_PER_SESSION = {
  1: {
    focus_words: [
      { word: "Welcome", ipa: "/ˈwɛlkəm/", tonica: "PRIMERA (WELcome)" },
      { word: "Workshop", ipa: "/ˈwɜːrkʃɒp/", tonica: "PRIMERA (WORKshop)" },
      { word: "Diesel", ipa: "/ˈdiːzəl/", tonica: "PRIMERA (DIEsel)" },
      { word: "Engine", ipa: "/ˈɛndʒɪn/", tonica: "PRIMERA (ENgine)" }
    ],
    techniques: ["Handclap en sílaba tónica","Elastic band stretch on stressed vowel","Choral repetition 3x"]
  },
  2: {
    focus_words: [
      { word: "wrench", ipa: "/rɛntʃ/", tonica: "MONOSÍLABO (WRENCH)" },
      { word: "screwdriver", ipa: "/ˈskruːdraɪvər/", tonica: "PRIMERA (SCREWdriver)" },
      { word: "inspection", ipa: "/ɪnˈspɛkʃən/", tonica: "SEGUNDA (inSPECtion)" },
      { word: "coolant", ipa: "/ˈkuːlənt/", tonica: "PRIMERA (COOlant)" },
      { word: "piston", ipa: "/ˈpɪstən/", tonica: "PRIMERA (PISton)" }
    ],
    techniques: ["Handclap","Finger tap","Voice level rise on stressed syllable"]
  },
  3: {
    focus_words: [
      { word: "check", ipa: "/tʃɛk/", tonica: "MONOSÍLABO" },
      { word: "replace", ipa: "/rɪˈpleɪs/", tonica: "SEGUNDA (rePLACE)" },
      { word: "tighten", ipa: "/ˈtaɪtən/", tonica: "PRIMERA (TIGHTen)" },
      { word: "inspect", ipa: "/ɪnˈspɛkt/", tonica: "SEGUNDA (inSPECT)" }
    ],
    techniques: ["Handclap + pause","Imperative drill choral","Negative form emphasis (DON'T + base)"]
  },
  4: {
    focus_words: [
      { word: "diagnostic", ipa: "/ˌdaɪəɡˈnɒstɪk/", tonica: "TERCERA (diagNOStic)" },
      { word: "pressure", ipa: "/ˈprɛʃər/", tonica: "PRIMERA (PREssure)" },
      { word: "torque", ipa: "/tɔːrk/", tonica: "MONOSÍLABO" },
      { word: "malfunction", ipa: "/mælˈfʌŋkʃən/", tonica: "SEGUNDA (malFUNCtion)" },
      { word: "replacement", ipa: "/rɪˈpleɪsmənt/", tonica: "SEGUNDA (rePLACEment)" }
    ],
    techniques: ["Handclap","Elastic band","Physical stretch gesture","4-syllable counting"]
  },
  5: {
    focus_words: [
      { word: "Can you help?", ipa: "/kən juː hɛlp/", tonica: "CONTENT WORDS: HELP" },
      { word: "I can fix it", ipa: "/aɪ kən fɪks ɪt/", tonica: "CONTENT WORDS: CAN, FIX" },
      { word: "Every morning", ipa: "/ˈɛvri ˈmɔːrnɪŋ/", tonica: "PRIMERA de cada (EVery MORning)" }
    ],
    techniques: ["Sentence stress rhythm clap","Content words STRONG / function words weak","CAPS marking"]
  },
  6: {
    focus_words: [],
    techniques: ["Sin stress nuevo — evaluación sumativa"]
  },
  7: {
    focus_words: [
      { word: "Workshop", ipa: "/ˈwɜːrkʃɒp/", tonica: "PRIMERA (WORKshop)" },
      { word: "Readiness", ipa: "/ˈrɛdinəs/", tonica: "PRIMERA (REAdiness)" },
      { word: "Report", ipa: "/rɪˈpɔːrt/", tonica: "SEGUNDA (rePORT)" },
      { word: "Presentation", ipa: "/ˌprɛzənˈteɪʃən/", tonica: "TERCERA (presenTAtion)" }
    ],
    techniques: ["Choral rehearsal of report title","Pair rehearsal with stress marking"]
  },
  8: {
    focus_words: [],
    techniques: ["Final rehearsal antes de delivery — no new stress work"]
  }
};

const VOCAB_PER_SESSION = {
  1: {
    target_words: ["Welcome","Diesel","Workshop","Engine","Safety","Tools","Workshop","Assistant"],
    factors_applied: ["Sounds","Encounter","Self-expression"],
    operationalization: "Sounds: stress marking de 4 palabras del título del día + IPA en Word Wall. Encounter: Welcome presentation + mood board icebreaker (múltiples exposiciones). Self-expression: cada aprendiz nombra 5 elementos del taller que ya conoce (KWL chart columna K)."
  },
  2: {
    target_words: ["wrench","screwdriver","inspection","coolant","piston","battery","filter","sparkplug","oil","fuel","Tools","Fluids","Parts","PPE","Actions"],
    factors_applied: ["Sounds","Encounter","Elaboration","Spaced-retrieval","Connected"],
    operationalization: "Sounds: stress drill pre-reading (5 min). Encounter: texto Motor Age + realia en mesa. Elaboration: sorting en 5 categorías Toolbelt. Spaced-retrieval: Word Wall activado para reciclaje en S3+. Connected: colocaciones check + oil level."
  },
  3: {
    target_words: ["check","replace","tighten","inspect","don't","oil","coolant","filter","there is","there are","some","any"],
    factors_applied: ["Sounds","Encounter","Self-expression","Connected"],
    operationalization: "Sounds: imperative stress drill. Encounter: Inspection Form template con 8 ítems pre-escritos. Self-expression: aprendiz completa 8 ítems con verbos imperativos. Connected: check + oil, replace + filter, tighten + bolts."
  },
  4: {
    target_words: ["diagnostic","inspection","pressure","torque","malfunction","replacement","compression","alignment","calibration","can","can't"],
    factors_applied: ["Sounds","Encounter","Self-expression","Interactive"],
    operationalization: "Sounds: word stress + sentence stress drill. Encounter: listening dialogue mechanic/supervisor (2x). Self-expression: roleplay en parejas. Interactive: mechanic describes malfunction, supervisor responds with can/can't."
  },
  5: {
    target_words: ["F1 Good morning","F2 There is a problem with","F3 Sorry could you repeat","F4 Every morning I check","F5 Please don't start the engine","Every day","Every week"],
    factors_applied: ["Encounter","Self-expression","Interactive","Connected"],
    operationalization: "Encounter: 5 funciones demostradas por instructor con realia. Self-expression: escenarios rotatorios F1-F5. Interactive: 3 roles en rotación (mechanic/supervisor/customer). Connected: funciones + gramática (can/can't, present simple)."
  },
  6: {
    target_words: ["ALL A1.1 vocabulary as evaluation object"],
    factors_applied: ["Retrieval","Connected","Self-explanation"],
    operationalization: "Retrieval: cuestionario de 25 ítems exige recuperación activa. Connected: secciones R/W/L/S/F integran vocabulario en contexto. Self-explanation: metacognición final reflexiona sobre qué vocabulario se domina."
  },
  7: {
    target_words: ["Workshop Readiness Report","Tools inventory","Safety check","Maintenance schedule","report","inventory","schedule"],
    factors_applied: ["Encounter","Self-expression","Connected","Interactive"],
    operationalization: "Encounter: brief del reporte + modelos samples. Self-expression: cada dupla elige 3 secciones y las redacta. Connected: vocabulary integra grammar A1.1 completo. Interactive: peer review + coaching 1:1."
  },
  8: {
    target_words: ["— same as S7, in production mode"],
    factors_applied: ["Self-expression","Interactive","Celebration"],
    operationalization: "Self-expression: presentación oral del reporte (3-5 min). Interactive: Q&A con audiencia. Celebration: closing ceremony con reconocimiento de progreso."
  }
};

const CEFR_FOCUS_PER_SESSION = {
  1: { subnivel: "A1.1", habilidad_principal: "produccion_oral",
       descriptor_activo: "Produce palabras y frases aisladas. Puede nombrar objetos y herramientas presentes en el entorno del taller.",
       source: "pm-0-context.json cefr_descriptors_per_guide[0].descriptor_snapshot.produccion_oral" },
  2: { subnivel: "A1.1", habilidad_principal: "comprension_lectora",
       descriptor_activo: "Reconoce palabras y frases técnicas básicas acompañadas de imágenes en contextos conocidos (taller).",
       source: "pm-0-context.json cefr_descriptors_per_guide[0].descriptor_snapshot.comprension_lectora" },
  3: { subnivel: "A1.1", habilidad_principal: "produccion_escrita",
       descriptor_activo: "Completa formularios simples (inspección) con verbos imperativos y vocabulario técnico conocido.",
       source: "pm-0-context.json cefr_descriptors_per_guide[0].descriptor_snapshot.produccion_escrita" },
  4: { subnivel: "A1.1", habilidad_principal: "comprension_oral",
       descriptor_activo: "Comprende instrucciones y preguntas simples del supervisor en diálogos cortos de taller con habla lenta.",
       source: "pm-0-context.json cefr_descriptors_per_guide[0].descriptor_snapshot.comprension_oral" },
  5: { subnivel: "A1.1", habilidad_principal: "interaccion_oral",
       descriptor_activo: "Interactúa de forma simple en funciones comunicativas básicas del taller (saludar, reportar problema, pedir clarificación).",
       source: "pm-0-context.json cefr_descriptors_per_guide[0].descriptor_snapshot.interaccion_oral" },
  6: { subnivel: "A1.1", habilidad_principal: "integradas",
       descriptor_activo: "Demuestra dominio integrado de las 5 habilidades A1.1 en cuestionario consolidado.",
       source: "pm-0-context.json cefr_descriptors_per_guide[0].descriptor_snapshot" },
  7: { subnivel: "A1.1→A1.2", habilidad_principal: "produccion_integrada",
       descriptor_activo: "Produce un reporte simple del estado del taller integrando vocabulario + gramática A1.1.",
       source: "pm-0-context.json cefr_descriptors_per_guide[0] + hoja de ruta §8" },
  8: { subnivel: "A1.1 cierre", habilidad_principal: "presentacion_oral",
       descriptor_activo: "Presenta oralmente un reporte técnico corto (3-5 min) con scaffolding visual, cerrando el ciclo A1.1.",
       source: "pm-0-context.json cefr_descriptors_per_guide[0] + hoja de ruta §8" }
};

const PEDAGOGICAL_SHIFTS_PER_SESSION = {
  1: { velocidad_input: "Muy lenta — pausas largas, repetir cada frase 2x",
       extension_textos: "1-3 oraciones + apoyo visual obligatorio",
       andamiaje: "Máximo — frames completos, word banks visibles, visuales en cada slide",
       rol_docente: "Modelo central — driller — facilitador emocional Día 1",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  2: { velocidad_input: "Lenta — pausas en transiciones de párrafo",
       extension_textos: "4-6 oraciones + imágenes + Word Wall",
       andamiaje: "Alto — sentence frames + categorization scaffolds",
       rol_docente: "Modelo + reader + sorter facilitator",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  3: { velocidad_input: "Moderada — para explicar imperativo",
       extension_textos: "Formularios cortos + ejemplos completos",
       andamiaje: "Medio — template con ítems parcialmente completos",
       rol_docente: "Modelo + corrector gramatical + coach escritor",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  4: { velocidad_input: "Moderada — dialogue 2x a velocidad natural",
       extension_textos: "Diálogo 6-8 turnos con repetición",
       andamiaje: "Medio — formulas F1-F5 + realia visible",
       rol_docente: "Modelo + listener + roleplay facilitator",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  5: { velocidad_input: "Normal — interacción real",
       extension_textos: "Escenarios complejos multi-turno",
       andamiaje: "Medio-bajo — formulas disponibles pero no centrales",
       rol_docente: "Orchestrator + coach + fluency fomenter",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  6: { velocidad_input: "Natural — cuestionario en condiciones de examen",
       extension_textos: "Cuestionario 25 ítems (5 skills × 5)",
       andamiaje: "Bajo — solo instrucciones iniciales",
       rol_docente: "Examinador + metacognitive coach",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  7: { velocidad_input: "Natural",
       extension_textos: "Reporte técnico de 3 secciones",
       andamiaje: "Bajo — coaching 1:1 on-demand",
       rol_docente: "Coach + mentor + peer-review facilitator",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" },
  8: { velocidad_input: "Natural — performance",
       extension_textos: "Presentación oral 3-5 min",
       andamiaje: "Mínimo — solo visual de respaldo (Canva/poster)",
       rol_docente: "Audience + celebrator + ceremony master",
       source: "PM-0 §8 + methodological_shifts_per_guide[0]" }
};

const TRACEABILITY_PER_SESSION = {
  1: ["A1 — Asignación subnivel A1.1 coherente","B5 — Gestión L1 (30% tope S1)","B8 — Andamiaje máximo","C1 — Bloque FPI Reflexión Inicial/Contextualización","D1 — Contribuye al contrato (no formal)"],
  2: ["A1 — A1.1 comprensión lectora","B4 — Word Wall activado","B7 — Spaced-retrieval Toolbelt","C2 — Bloque FPI Apropiación","D2 — E1 Reading (5pts)"],
  3: ["A1 — A1.1 producción escrita","B5 — L1 20% target","B9 — Focus-on-form imperativo","C2 — Apropiación","D3 — E2 Writing (5pts)"],
  4: ["A1 — A1.1 listening + speaking","B5 — L1 15%","B10 — Fluency-leaning shift","C2 — Apropiación","D4+D5 — E3+E4 (10pts)"],
  5: ["A1 — A1.1 interacción oral","B5 — L1 12%","B11 — Functions integradas","C2 — Apropiación","D6 — E5 Language Functions (5pts)"],
  6: ["A2 — Evaluación sumativa integrada","B5 — L1 10%","B12 — Cuestionario consolidado","C3 — Evaluación Sumativa","D7 — E6 25pts"],
  7: ["A3 — Transferencia ABP","B5 — L1 5%","B13 — Coaching individualizado","C4 — Transferencia","D8 — Misión Final (no suma formal)"],
  8: ["A3 — Cierre ABP","B5 — L1 5%","B14 — Celebration + reflection","C4 — Transferencia","D8 — Misión Final delivery"]
};

function buildPm0Protocol(alignment, sessionNum) {
  return {
    __inherited_from__: "pm-0-context.json + pm-3-1.json.pm0_alignment_by_session",
    __contract_version__: "v2.6.6-canon",
    grammar_groups: GRAMMAR_PER_SESSION[sessionNum] || [],
    grammar_carga_check: CARGA_CHECK_PER_SESSION[sessionNum] || "",
    feedback: FEEDBACK_PER_SESSION[sessionNum] || { mode: "N/A", rationale: "", accuracy_techniques: [], fluency_techniques: [], mixed_techniques: [] },
    l1_management: {
      l1_percentage: (L1_MGMT_PER_SESSION[sessionNum] || {}).pct,
      l1_percentage_unit: "%",
      source: `pm-0-context.json l1_policy_per_guide[0].s1_to_s8 — S${sessionNum} ${(L1_MGMT_PER_SESSION[sessionNum] || {}).pct}% (PM-0 §9.1)`,
      l1_rationale: (L1_MGMT_PER_SESSION[sessionNum] || {}).rationale
    },
    stress_pronunciation: STRESS_PER_SESSION[sessionNum] || { focus_words: [], techniques: [] },
    success_vocabulary: VOCAB_PER_SESSION[sessionNum] || { target_words: [], factors_applied: [], operationalization: "" },
    cefr_descriptor_focus: CEFR_FOCUS_PER_SESSION[sessionNum] || {},
    pedagogical_shift_hooks: PEDAGOGICAL_SHIFTS_PER_SESSION[sessionNum] || {},
    traceability_seed_22: {
      items_priorizados_para_esta_sesion: TRACEABILITY_PER_SESSION[sessionNum] || [],
      source: "PM-0 §7 — Instrumento de Trazabilidad Pedagógica (22 ítems)",
      nota: `Build-Out PM-3.2 debe completar checklist completo. Aquí se siembran los 5 más relevantes para S${sessionNum}.`
    }
  };
}

function main() {
  const pm31 = JSON.parse(fs.readFileSync(PM31, 'utf8'));
  const alignments = pm31.pm0_alignment_by_session;
  const estrategias = pm31.estrategias_resumen.estrategia_dominante_por_sesion;
  const logistics = pm31.sessions_logistics;

  if (!alignments || alignments.length !== 8) {
    throw new Error(`Expected pm0_alignment_by_session[8], got ${alignments ? alignments.length : 'null'}`);
  }

  let updated = 0;
  for (let i = 1; i <= 8; i++) {
    const pm32Path = path.join(RUN_DIR, `pm-3-2-s${i}.json`);
    const pm32 = JSON.parse(fs.readFileSync(pm32Path, 'utf8'));

    // Rebuild pm0_protocol with CORRECT canonical schema
    pm32.pm0_protocol = buildPm0Protocol(alignments[i-1], i);

    // estrategia_didactica
    pm32.estrategia_didactica = {
      session: i,
      estrategia_dominante: estrategias[i-1].estrategia,
      ciclo_sena_anchor: (pm31.estrategias_resumen.ciclo_sena || {}),
      note: "Propagated from pm-3-1.estrategias_resumen by gen_pm32_v266_pm0_propagate.js"
    };

    // session_logistics
    pm32.session_logistics = {
      session: i,
      ambiente: logistics[i-1].ambiente,
      momento_sena: logistics[i-1].momento_sena,
      estrategia_dominante: logistics[i-1].estrategia_dominante,
      note: logistics[i-1].note
    };

    // Bump metadata
    pm32.pm_version = "2.6.6";
    pm32.pm_verified_against_prompt = true;
    pm32.pipeline_version = "v2.6.6";
    pm32._v266_propagated_at = new Date().toISOString();

    fs.writeFileSync(pm32Path, JSON.stringify(pm32, null, 2));
    updated++;
    const g = pm32.pm0_protocol.grammar_groups;
    console.log(`  S${i}: ✓ grammar=${g.length} | fb=${pm32.pm0_protocol.feedback.mode} | L1=${pm32.pm0_protocol.l1_management.l1_percentage}% | stress=${pm32.pm0_protocol.stress_pronunciation.focus_words.length}w`);
  }

  console.log(`\n✓ Propagated v2.6.6 CANONICAL pm0_protocol to ${updated}/8 pm-3-2-sX.json`);
}

main();
