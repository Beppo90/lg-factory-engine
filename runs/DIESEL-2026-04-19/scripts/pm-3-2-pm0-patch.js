"use strict";
// PM-0 Protocol Patch — DIESEL-2026-04-19
// Inyecta pm0_protocol en pm-3-2-s1.json .. pm-3-2-s8.json

const fs   = require("fs");
const BASE = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19";

// ─── PM-0 DATA POR SESIÓN ────────────────────────────────────────────────────
const PM0 = {

  // ── S1: The Wake-Up Call ─────────────────────────────────────────────────
  1: {
    grammar_groups: [
      "Grupo 1 — Verbo be: exposición receptiva (escuchar/leer). Sin producción exigida aún.",
      "Estructuras esperadas en input: 'I'm [nombre]', 'He's the [rol]', 'There's a problem.'"
    ],
    feedback: {
      mode: "FLUENCY — sesión diagnóstica. NO interrumpir producción espontánea.",
      accuracy_techniques: [],
      fluency_techniques: [
        "Post-task delayed feedback: al cierre del Bloque, no durante.",
        "Error codes escritos (V = vocabulario, G = gramática) en tarjeta del instructor — revisar en S2 warm-up.",
        "Nunca corregir durante el debate de la Pregunta Polémica ni durante el KWL."
      ],
      notes: "Prioridad: que el aprendiz hable, no que hable perfecto. Silenciar el filtro afectivo."
    },
    l1_management: {
      l1_percentage: "≤ 30 % L1 (A1.1 baseline). Esta sesión es la más tolerante — es día 1.",
      english_zone_declaration: "Declarar English Zone al abrir tablero: escribir 'ENGLISH ZONE 🔵' en esquina superior derecha. Señalarlo antes del SET-UP.",
      l1_allowed_for: [
        "Instrucciones complejas de procedimiento (primeras 2 veces que se dan).",
        "Metacognición en KWL y Learning Contract.",
        "Gestión emocional si un aprendiz muestra bloqueo severo."
      ],
      reduction_strategy: "En S2 se reduce al 25 %. Recordarlo al final del wrap-up: 'Next session — more English, less Spanish.'"
    },
    stress_pronunciation: {
      focus_words: ["workshop", "diesel", "maintenance", "safety", "specialist"],
      techniques: [
        "Modelado de instructor únicamente — sin drill formal aún.",
        "Board marking: escribir las palabras foco con sílaba tónica en MAYÚSCULA (WORK-shop, DIE-sel).",
        "Repetición coral suave al presentar cada personaje (Carlos, Valentina, Santiago)."
      ],
      board_marking: "Sílaba tónica en MAYÚSCULA en la Word Wall desde el inicio.",
      notes: "S1 introduce el concepto de stress sin metalenguaje. El drill sistemático empieza en S3."
    },
    success_vocabulary: {
      target_words: ["workshop", "safety", "maintenance", "specialist", "technician", "bay"],
      factors_applied: [
        "S — Sounds: instructor modela pronunciación de cada Survival Word.",
        "M — Meaning: definición con gesto + traducción breve en S1 únicamente.",
        "E — Encounter: aprendices leen las palabras en el escenario (PM-2.1).",
        "C — Conceptualize: mapa mental KWL — ¿qué sé de este campo?"
      ]
    }
  },

  // ── S2: Reading the Workshop ─────────────────────────────────────────────
  2: {
    grammar_groups: [
      "Grupo 1 — Verbo be: lectura de estructuras afirmativas y negativas en el titular y el artículo.",
      "Exposición a: 'The engine IS overheating.', 'The bay IS NOT safe.', 'There ARE three technicians.'",
      "Sin producción gramatical formal — el foco es Reading + Vocabulary."
    ],
    feedback: {
      mode: "FLUENCY para comprensión lectora. ACCURACY leve para respuestas escritas en worksheet.",
      accuracy_techniques: [
        "Rising intonation: repetir la respuesta del aprendiz con entonación ascendente en el error → aprendiz autocorrige. ('The engine are hot?' ↗)",
        "Elicitación: 'Almost — The engine… ?' → pausa → aprendiz completa."
      ],
      fluency_techniques: [
        "No interrumpir durante lectura silenciosa ni durante pair discussion.",
        "Post-task: 3 observaciones globales al cierre (sin nombrar a nadie). 1 fortaleza, 1 área de mejora, 1 patrón de error frecuente."
      ],
      notes: "Error más esperado: omisión del verbo be en descripciones ('The engine hot' → 'The engine IS hot'). Usar elicitación."
    },
    l1_management: {
      l1_percentage: "≤ 25 % L1. Reducción de 5 puntos vs S1.",
      english_zone_declaration: "Recordar English Zone al inicio. Añadir regla: 'In the While blocks — English only for answers and pair discussion.'",
      l1_allowed_for: [
        "Instrucciones nuevas (primera vez únicamente).",
        "Vocabulario técnico que no tiene equivalente comprensible en A1 (usar L1 + inglés juntos).",
        "Verificación de comprensión de ICQs críticas."
      ],
      reduction_strategy: "Usar técnica de scaffolding: dar la primera palabra en inglés, esperar que el aprendiz complete. Reducir andamiaje gradualmente durante la sesión."
    },
    stress_pronunciation: {
      focus_words: ["overheating", "contaminated", "extinguisher", "technician", "procedure"],
      techniques: [
        "Board marking: 5 palabras del Toolbelt con sílaba tónica marcada en MAYÚSCULA.",
        "Finger drilling: instructor dobla un dedo por sílaba al modelar cada palabra del Toolbelt.",
        "Repetición coral × 3 al presentar cada palabra nueva en el board."
      ],
      board_marking: "Toolbelt en tablero: o-VER-heat-ing  |  con-TAM-i-nat-ed  |  ex-TIN-guish-er",
      notes: "Primer uso sistemático del finger drilling — modelar lentamente, pedir que los aprendices doblen dedos junto al instructor."
    },
    success_vocabulary: {
      target_words: ["overheating", "contaminated", "fire extinguisher", "floor jack", "PPE", "bay"],
      factors_applied: [
        "S — Sounds: finger drilling + board marking de cada término.",
        "U — Use: los aprendices ven los términos en el titular (contexto real auténtico).",
        "C — Conceptualize: imagen del taller + aprendices identifican visualmente cada elemento.",
        "C — Creativity: nombrar el elemento señalado en la imagen sin mirarlo ('What is this?' → 'It's a fire extinguisher.').",
        "E — Encounter again: los términos reaparecen en el artículo y en el worksheet.",
        "S — Self-expression: aprendices escriben una oración propia con 1 término en el Exit Ticket."
      ]
    }
  },

  // ── S3: Write It Right ───────────────────────────────────────────────────
  3: {
    grammar_groups: [
      "Grupo 1 — Verbo be: INTRO formal + CONSOLIDA. Afirmativo, negativo, preguntas, respuestas cortas.",
      "Estructuras target: 'The engine is/isn't…', 'Is the bay safe? — Yes, it is / No, it isn't.'",
      "Grupo 2 — There is / There are: INTRO. 'There is an oil spill.', 'There are three zones.'"
    ],
    feedback: {
      mode: "ACCURACY — gramática es el foco central de S3. Máxima atención a forma.",
      accuracy_techniques: [
        "Recast: reformular silenciosamente la producción incorrecta en voz alta. ('I write report' → instructor: 'Ah, YOU WRITE the report — good idea.')",
        "Elicitación: incomplete utterance con pausa. ('The bay… ?' → aprendiz completa con 'is contaminated').",
        "Metalinguistic cue: señalar la categoría del error sin dar la forma. ('Careful — verb be. Third person singular.')",
        "Corrección explícita SOLO si el error bloquea la comunicación o se repite 3+ veces."
      ],
      fluency_techniques: [
        "Durante el Writing Task final (producción extendida): no interrumpir. Dar feedback escrito en el borrador.",
        "Usar error codes en los borradores: G = grammar, V = vocabulary, WO = word order, Sp = spelling."
      ],
      notes: "Regla de oro S3: en ejercicios de gramática → ACCURACY. En el writing task → FLUENCY. No mezclar los modos en la misma actividad."
    },
    l1_management: {
      l1_percentage: "≤ 20 % L1. Los ejercicios gramaticales se dan en inglés con ejemplos en tablero.",
      english_zone_declaration: "Reforzar English Zone: 'Today we do grammar — everything in English. I'll write the examples on the board so you can follow.'",
      l1_allowed_for: [
        "Explicación del concepto nuevo (be verb) — una sola vez en L1 si 80%+ parece perdido.",
        "Preguntas de aprendiz sobre diferencia gramatical compleja (ej: 'is' vs 'are')."
      ],
      reduction_strategy: "Usar tablero + color coding (be en rojo, sujeto en azul) para reducir dependencia de L1 en explicaciones. La pizarra habla, no el instructor en español."
    },
    stress_pronunciation: {
      focus_words: ["isn't", "aren't", "there's", "there are", "contaminated", "extinguisher"],
      techniques: [
        "Backchaining de formas negativas: '-n't → isn't → The bay isn't → The bay isn't safe.' Construir de atrás hacia adelante.",
        "Finger drilling: separar la contracción en sílabas (IS-n't, AR-en't).",
        "Clapping del ritmo: palmas en sílaba tónica durante drills corales.",
        "Board marking: escribir IS-n't con el apóstrofo en color diferente — el inglés reduce, no añade."
      ],
      board_marking: "IS-n't  |  AR-en't  |  THERE'S  |  THERE ARE (marcado de stress con negrita/color)",
      notes: "Contraste stress-timed (inglés) vs syllable-timed (español): demostrar con palmas. 'En español: to-dos-tie-nen-el-mis-mo-tiem-po. En inglés: THERE'S an OIL spill in BAY two.' Solo las sílabas fuertes cuentan."
    },
    success_vocabulary: {
      target_words: ["safe", "unsafe", "contaminated", "spill", "zone", "report"],
      factors_applied: [
        "S — Sounds: drill de pares mínimos safe/unsafe — aprendices escuchan y distinguen.",
        "M — Meaning: safety vs danger — mapa visual en tablero con iconos.",
        "E — English equivalent: cognados útiles (contaminated ≈ contaminado — señalar similitud).",
        "C — Creativity: aprendices inventan 2 oraciones propias con be + adjetivo de seguridad.",
        "S — Self-expression: writing task — describir su propio lugar de trabajo en inglés."
      ]
    }
  },

  // ── S4: Tuning In & Speaking Up ─────────────────────────────────────────
  4: {
    grammar_groups: [
      "Grupo 1 — Verbo be: APLICA en producción oral. Role-play y Safety Briefing.",
      "Grupo 2 — There is / There are: CONSOLIDA. Describir el taller en el briefing.",
      "Grupo 5 — Imperativos: INTRO receptiva. 'Put on your PPE.', 'Check the floor jack.', 'Do NOT enter bay 2.'"
    ],
    feedback: {
      mode: "MIXTO — ACCURACY para ejercicios de escucha discriminativa; FLUENCY para role-play y Evidence 4.",
      accuracy_techniques: [
        "Rising intonation: durante check de comprensión del audio. ('He says put on the… ?' ↗)",
        "Recast inmediato en micro-drills de pronunciación (Chunk Cards).",
        "Elicitación: durante corrección de respuestas del worksheet — no dar la respuesta directa.",
        "Metalinguistic cue: para errores de imperativo. ('Careful — imperative, no subject.')"
      ],
      fluency_techniques: [
        "Evidence 4 (oral briefing): CERO interrupciones. El aprendiz habla de corrido.",
        "Observación con nota en planilla. Feedback colectivo al finalizar TODOS los briefings.",
        "Error codes: G (grammar), WO (word order), V (vocabulary) — anotar en planilla privada del instructor."
      ],
      notes: "CRÍTICO: Evidence 4 es evaluación sumativa. Cambiar explícitamente al modo fluency: 'Now I'm listening — no corrections until everyone is done.'"
    },
    l1_management: {
      l1_percentage: "≤ 15 % L1. S4 exige mayor autonomía en inglés.",
      english_zone_declaration: "English Zone reforzada: 'Hoy vamos al 85% inglés. Si no sabes una palabra, señala el Word Wall. Si sigues sin encontrarla, pregúntame en inglés: What does… mean?'",
      l1_allowed_for: [
        "Instrucciones de seguridad con implicaciones físicas (usar equipo de PPE real).",
        "Si un aprendiz expresa confusión total (nivel de ansiedad visible)."
      ],
      reduction_strategy: "Técnica English Zone activa: cuando un aprendiz habla en español, señalar el rótulo 'ENGLISH ZONE 🔵' en silencio, sin interrumpir. Esperar. No traducir."
    },
    stress_pronunciation: {
      focus_words: ["fire extinguisher", "floor jack", "put on your PPE", "do not enter", "safety briefing"],
      techniques: [
        "Backchaining completo: 'guish-er → ex-tin-guish-er → fire ex-tin-guish-er'. Obligatorio para este término.",
        "Finger drilling: 5 dedos = 5 sílabas de 'fire extinguisher' (FIRE-ex-TIN-guish-er).",
        "Clapping del ritmo de los imperativos: PUT on your PPE (3 golpes fuertes: PUT / PPE / ←).",
        "Board marking de los Chunk Cards: sílaba tónica en mayúscula + barra de ritmo (/).",
        "Drill orquestal × 3 por Chunk Card: instructor → mitad clase → clase completa."
      ],
      board_marking: "FIRE ex-TIN-guish-er  |  FLOOR jack  |  PUT on your PPE  |  DO not EN-ter",
      notes: "S4 es la sesión de pronunciación más intensa del programa. Dedicar mínimo 15 min al drill de Chunk Cards antes del role-play."
    },
    success_vocabulary: {
      target_words: ["fire extinguisher", "floor jack", "PPE", "oil spill", "bay door", "checklist"],
      factors_applied: [
        "S — Sounds: backchaining + finger drilling de cada término de seguridad.",
        "U — Use: términos en contexto real del Bay 2 Safety Briefing (audio auténtico).",
        "C — Conceptualize: imagen del taller — aprendices identifican y señalan cada elemento físico.",
        "C — Creativity: aprendices escriben su propio cheklist de 5 ítems para el bay.",
        "E — Encounter again: términos reaparecen en role-play + Evidence 4.",
        "S — Self-expression: Evidence 4 — el aprendiz da el briefing con sus propias palabras."
      ]
    }
  },

  // ── S5: The Workshop in Action ───────────────────────────────────────────
  5: {
    grammar_groups: [
      "Grupo 1 — Verbo be: APLICA en funciones comunicativas. Integración plena.",
      "Grupo 2 — There is / There are: APLICA. Describir condiciones del taller.",
      "Grupo 5 — Imperativos: CONSOLIDA. Dar instrucciones de seguridad.",
      "Grupo 7 — Can / Can't (ability): INTRO. 'Can you check the engine? — Yes, I can.'"
    ],
    feedback: {
      mode: "FLUENCY dominante — tareas comunicativas integradas. ACCURACY selectiva para funciones lingüísticas.",
      accuracy_techniques: [
        "Elicitación para errores de función comunicativa. ('I can to check…' → '…I can…?')",
        "Metalinguistic cue: 'That's a modal — no infinitive with TO after can/can't.'",
        "Recast suave en simulaciones — reformular sin interrumpir el flujo comunicativo."
      ],
      fluency_techniques: [
        "Simulaciones y role-plays: modo fluency total. Anotación privada de errores.",
        "Evidence 5 (Language Functions): no interrumpir. Feedback post-performance colectivo.",
        "Refuerzo positivo visible: thumbs up / gesture cuando una función comunicativa se usa correctamente."
      ],
      notes: "S5 consolida las funciones F1–F5. El error de función más frecuente esperado: confundir 'Can I help you?' con 'I can help you?' — explicar la diferencia pragmática."
    },
    l1_management: {
      l1_percentage: "≤ 12 % L1. Aproximándose al cierre de guía — autonomía alta esperada.",
      english_zone_declaration: "English Zone estricta durante simulaciones. Fuera de simulación: inglés con soporte de Word Wall.",
      l1_allowed_for: [
        "Aclaración de criterios de evaluación de Evidence 5.",
        "Momento de auto-reflexión al final (Exit Ticket metacognitivo puede ser en español)."
      ],
      reduction_strategy: "Peer scaffolding: aprendices más fuertes en inglés como 'language coaches' de sus pares durante simulaciones. El instructor coordina, no traduce."
    },
    stress_pronunciation: {
      focus_words: ["Can you…?", "I can / I can't", "Could you please…?", "Sorry, I don't understand."],
      techniques: [
        "Drill de pares mínimos: CAN (afirmativo, schwa /kən/) vs CAN'T (negativo, vocal larga /kɑːnt/).",
        "Clapping: CAN you CHECK the EN-gine? — solo las palabras de contenido reciben golpe.",
        "Backchaining de fórmula de cortesía: 'please → you please → Could you please → Could you please check?'",
        "Board marking: CAN /kən/ — vocal reducida en inglés rápido."
      ],
      board_marking: "CAN /kən/ (rápido)  vs  CAN'T /kɑːnt/ (fuerte, vocal larga). Contrastar en tablero.",
      notes: "Error fonológico crítico A1.1: aprendices hispanohablantes pronuncian 'can' como 'can't' por vocal plena. El contraste CAN/CAN'T es seguridad comunicativa."
    },
    success_vocabulary: {
      target_words: ["Can I help you?", "Could you please…?", "I don't understand.", "Let me check.", "I'll report it."],
      factors_applied: [
        "S — Sounds: drill de las 5 funciones comunicativas con entonación natural.",
        "U — Use: aprendices usan cada función en la simulación dentro de 10 minutos de aprenderla.",
        "C — Creativity: aprendices crean un mini-diálogo nuevo con las 5 funciones.",
        "E — Encounter again: las funciones aparecen en la simulación, en el role-play y en Evidence 5.",
        "S — Self-expression: Evidence 5 — comunicación real en contexto de taller."
      ]
    }
  },

  // ── S6: Prove What You Know ──────────────────────────────────────────────
  6: {
    grammar_groups: [
      "Todos los grupos introducidos (1, 2, 5, 7): evaluación integrada.",
      "Foco en Grupo 1 (be) y Grupo 2 (there is/are) — mayor peso en el cuestionario.",
      "Repaso de Grupo 5 (imperativos) en ejercicio de escritura."
    ],
    feedback: {
      mode: "ACCURACY — sesión de evaluación. Feedback post-cuestionario, no durante.",
      accuracy_techniques: [
        "CERO feedback durante el Cuestionario Consolidado (Evidence 6).",
        "Post-cuestionario: revisión colectiva con respuestas en proyector. Explicación de cada ítem.",
        "Metalinguistic cue al revisar: nombrar la regla gramatical asociada a cada error frecuente.",
        "Corrección explícita permitida durante el repaso — no es producción, es consolidación."
      ],
      fluency_techniques: [
        "Review games (si hay tiempo extra): modo fluency para reducir ansiedad post-cuestionario.",
        "Conversación de cierre de guía: modo fluency, celebrar progreso."
      ],
      notes: "Orden crítico: (1) Cuestionario en silencio, (2) recoger todos los cuestionarios, (3) SOLO ENTONCES proyectar respuestas. Nunca dar respuestas antes de recoger."
    },
    l1_management: {
      l1_percentage: "≤ 10 % L1. Meta: aprendices responden el cuestionario en inglés sin apoyo L1.",
      english_zone_declaration: "English Zone máxima durante el cuestionario. Solo instructor puede usar L1 para aclarar instrucciones de formato.",
      l1_allowed_for: [
        "Instrucciones de formato del cuestionario (número de respuestas, tiempo).",
        "Situación de emergencia o confusión total de algún aprendiz."
      ],
      reduction_strategy: "Logro de S6: que el aprendiz pueda leer, entender y responder preguntas técnicas en inglés sin traducción. Celebrar este hito explícitamente."
    },
    stress_pronunciation: {
      focus_words: [],
      techniques: [
        "No hay drill de pronunciación en S6 — es sesión de evaluación escrita.",
        "Si hay tiempo en el repaso: lectura coral de oraciones correctas del cuestionario para refuerzo fonológico."
      ],
      board_marking: "N/A — cuestionario escrito.",
      notes: "Pronunciación se retoma en S7 con foco en la presentación oral de la Final Mission."
    },
    success_vocabulary: {
      target_words: ["contaminated", "extinguisher", "maintenance", "specialist", "procedure", "report"],
      factors_applied: [
        "E — Encounter again: todos los términos del Toolbelt aparecen en el cuestionario.",
        "S — Self-expression: ítem de escritura libre — aprendiz describe el taller en 3 oraciones."
      ]
    }
  },

  // ── S7: Final Mission Preparation ────────────────────────────────────────
  7: {
    grammar_groups: [
      "Grupos 1, 2, 5, 7: producción integrada en el borrador de la Final Mission.",
      "Revisión de Grupo 1 (be) como estructura de anclaje para la presentación oral.",
      "Checklist gramatical: ¿usé be correctamente? ¿There is/are? ¿Imperativos? ¿Can/can't?"
    ],
    feedback: {
      mode: "COACHING — feedback formativo orientado a mejorar el borrador. Mezcla de accuracy y fluency.",
      accuracy_techniques: [
        "Feedback escrito en el borrador: usar error codes (G, V, WO, Sp) con comentario específico.",
        "Peer feedback estructurado: aprendiz A corrige borrador de B con el mismo error code system.",
        "Metalinguistic cue en conferencia individual: señalar el tipo de error, aprendiz busca la regla en PM-0."
      ],
      fluency_techniques: [
        "Rehearsal oral de la Final Mission: modo fluency completo. Instructor observa sin interrumpir.",
        "Self-assessment con rúbrica: aprendiz evalúa su propio borrador antes de la conferencia."
      ],
      notes: "S7 es preparación, no evaluación. El aprendiz DEBE cometer errores aquí — es el momento seguro para fallar y corregir antes de S8."
    },
    l1_management: {
      l1_percentage: "≤ 10 % L1. Aprendices deben poder dar el ensayo de su presentación completamente en inglés.",
      english_zone_declaration: "English Zone estricta durante todos los rehearsals. 'Si olvidas una palabra — paraphrase. Di algo diferente en inglés. No cambies al español.'",
      l1_allowed_for: [
        "Conferencia individual de feedback escrito si hay error conceptual grave.",
        "Auto-reflexión metacognitiva al final (puede ser en español)."
      ],
      reduction_strategy: "Técnica de paraphrase: cuando el aprendiz se bloquea en inglés, instructor pregunta '¿Cómo lo dirías diferente en inglés?' — no acepta la traducción directa."
    },
    stress_pronunciation: {
      focus_words: ["workshop specialist", "maintenance report", "safety procedure", "I recommend", "in conclusion"],
      techniques: [
        "Rehearsal con grabación de voz: aprendices se graban en celular y escuchan su propio stress.",
        "Backchaining de la oración de apertura de la presentación.",
        "Clapping del ritmo de la frase de conclusión: 'In CON-clu-sion, the WORK-shop IS now SAFE.'",
        "Peer pronunciation coach: un aprendiz escucha y señala con pulgar arriba/abajo si el stress es correcto."
      ],
      board_marking: "Frase de apertura con marcado de stress: 'I AM the WORK-shop SPE-cial-ist for BAY TWO.'",
      notes: "El nerviosismo en S8 hace que el aprendiz hable rápido y pierda el stress. S7 es el momento de anclar el ritmo."
    },
    success_vocabulary: {
      target_words: ["In conclusion…", "I recommend…", "The problem is…", "The solution is…", "In my opinion…"],
      factors_applied: [
        "S — Sounds: drill de las frases de transición con entonación de presentación.",
        "U — Use: aprendices incorporan cada frase en su borrador durante S7.",
        "C — Creativity: crear una apertura y cierre personalizados para su presentación.",
        "S — Self-expression: el borrador ES la voz del aprendiz sobre su taller específico."
      ]
    }
  },

  // ── S8: The Full Circle ──────────────────────────────────────────────────
  8: {
    grammar_groups: [
      "Todos los grupos del silabus A1.1: producción en condiciones de evaluación sumativa.",
      "Autoevaluación de uso gramatical: el aprendiz identifica sus propias estructuras en la grabación.",
      "Inicio de transición A1.2: instructor señala 1-2 estructuras nuevas que verán en la siguiente guía."
    ],
    feedback: {
      mode: "FLUENCY TOTAL durante la Final Mission. Post-performance: feedback holístico con rúbrica.",
      accuracy_techniques: [],
      fluency_techniques: [
        "CERO interrupciones durante la Final Mission oral (Evidence 7).",
        "Grabación de la presentación para triangulación de evidencias.",
        "Feedback holístico post-performance: rúbrica con 4 dimensiones (pronunciación, gramática, vocabulario, comunicación).",
        "Devolver rúbrica completada a cada aprendiz — es su mapa para A1.2."
      ],
      notes: "S8 celebra el progreso. El feedback debe ser 70% fortalezas + 30% áreas de mejora. Nunca al revés en el cierre de guía."
    },
    l1_management: {
      l1_percentage: "≤ 5 % L1. La Final Mission es 100% en inglés — condición de evidencia.",
      english_zone_declaration: "English Zone al máximo. 'Today you show what you know. Everything in English — I believe in you.'",
      l1_allowed_for: [
        "Instrucciones de formato de la evaluación (antes de empezar, una sola vez).",
        "Momento de cierre emocional al finalizar la guía — reconocer el logro en español está permitido."
      ],
      reduction_strategy: "Logro de cierre: el aprendiz puede dar una presentación de 3-5 minutos sobre su área de trabajo en inglés, sin apoyo de L1. Celebrar este hito como la meta real del programa."
    },
    stress_pronunciation: {
      focus_words: ["In conclusion", "The workshop is now safe", "I recommend", "Thank you for listening"],
      techniques: [
        "Warm-up de pronunciación antes de las presentaciones: 5 min de drill coral de las frases de transición.",
        "Self-monitoring: aprendices escuchan su grabación y marcan en una plantilla dónde perdieron el stress.",
        "Cierre de guía: instructor destaca 1 logro fonológico colectivo ('In S1 you said DIE-sel. Now you say DIE-sel — same! But your rhythm improved.')."
      ],
      board_marking: "Frase de cierre modelo: 'THANK you for LIS-tening. I am the WORK-shop SPE-cial-ist.'",
      notes: "S8 consolida la conciencia fonológica. El aprendiz ya no necesita que el instructor marque el stress — empieza a auto-monitorearse."
    },
    success_vocabulary: {
      target_words: ["All 20 Toolbelt terms — full mastery check"],
      factors_applied: [
        "E — Encounter again: todos los términos aparecen en la Final Mission.",
        "S — Self-expression: el aprendiz usa los 20 términos en contexto real de presentación.",
        "Cierre SUCCESS: '¿Recuerdas la primera vez que viste 'fire extinguisher'? Ahora lo dices de corrido. Eso ES el aprendizaje.'"
      ]
    }
  }
};

// ─── PARCHEAR CADA JSON ───────────────────────────────────────────────────────
for (let i = 1; i <= 8; i++) {
  const filePath = `${BASE}/pm-3-2-s${i}.json`;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.pm0_protocol = PM0[i];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`✅  S${i} — pm0_protocol inyectado`);
}

console.log("\n🎯  Todos los JSONs actualizados. Ejecuta el generador para regenerar el DOCX.");
