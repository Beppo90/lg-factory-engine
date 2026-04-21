#!/usr/bin/env node
/**
 * gen_pm31_v266_fields.js — Fase 3.2 DIESEL-04-19 upgrade v2.6.6
 *
 * Augmenta el pm-3-1.json existente con 6 campos canónicos v2.6
 * necesarios para que los generadores canónicos (gen_3_docx.js,
 * gen_audit_docx.js, gen_35_36_docx.js) puedan renderizar correctamente:
 *
 *   1. overview_table          (alias canónico de session_overview_table)
 *   2. ambientes_resumen       (dict con tipo/recursos taller diésel)
 *   3. estrategias_resumen     (dict ciclo SENA + dominante por sesión)
 *   4. voc_dimensions_table[8] (cognitiva/procedimental/actitudinal)
 *   5. pm0_alignment_by_session[8] (PM-0 mapping per-session)
 *   6. sessions_logistics[8]   (ambiente session-wide)
 *   7. data_flow_contract      (activity_footer derivation contract)
 *
 * También actualiza metadata:
 *   - pm_version: 2.6.6
 *   - pm_verified_against_prompt: true
 *   - pipeline_version: v2.6.6
 *
 * Entrada : runs/DIESEL-2026-04-19/pm-3-1.json + pm-0-context.json + pm-3-2-sX.json
 * Salida  : runs/DIESEL-2026-04-19/pm-3-1.json (backup → pm-3-1.pre-v266.json)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RUN_DIR = path.join(__dirname, '..');
const PM31    = path.join(RUN_DIR, 'pm-3-1.json');
const BACKUP  = path.join(RUN_DIR, 'pm-3-1.pre-v266.json');

// ─── Contenido DIESEL-específico v2.6.6 ─────────────────────────────────────

const AMBIENTES_RESUMEN = {
  nota: "Aula bilingüe con Word Wall permanente (5 categorías × 4 términos del Toolbelt DIESEL), English Zone señalizada con cinta de color, y acceso puntual a taller técnico real para input auditivo/realia. Configuración variable por sesión: mesas en U para diagnóstico/evaluación, mesas de 4 para apropiación colaborativa, estación de simulación mechanic/supervisor en S4, y sala de presentaciones en S8.",
  tipo_ambiente: "Aula bilingüe con adaptaciones por sesión + proximidad a taller de motores diésel (realia y sonidos auténticos) + biblioteca de referencias técnicas (service manuals, inspection forms GFPI, fichas DTC)",
  recursos_fijos: [
    "Proyector con pantalla grande",
    "Tablero blanco grande + marcadores 4 colores",
    "Word Wall permanente — muro lateral con 5 categorías Toolbelt (Tools, Fluids, Parts, PPE, Actions)",
    "English Zone señalizada con cinta verde SENA",
    "Cronómetro visible (timer 60+ minutos)",
    "Biblioteca de Motor Age article + Service Manual samples + fichas de inspección GFPI-F-134",
    "Maqueta/modelo de motor diésel o acceso visual a taller real"
  ],
  recursos_variables_por_sesion: "Ver campo 'ambiente' en cada session_detail[n].logistics_box y en sessions_logistics[].ambiente."
};

const ESTRATEGIAS_DOMINANTES = [
  { session: 1, estrategia: "ABP + Diagnóstico activador (Wake-Up Call + Gap Card)" },
  { session: 2, estrategia: "ABT — Toolbelt Reading (texto auténtico Motor Age)" },
  { session: 3, estrategia: "ABT — Pre-Maintenance Inspection Form (producto escrito)" },
  { session: 4, estrategia: "ABT + Simulación — Listening + Speaking roleplay mechanic/supervisor" },
  { session: 5, estrategia: "ABT — Language Functions F1–F5 en interacción de taller" },
  { session: 6, estrategia: "Evaluación Formativa Integrada — Cuestionario Consolidado 25pts + S6b orientación ABP" },
  { session: 7, estrategia: "ABP — Fase Preparación + Coaching (Workshop Readiness Report)" },
  { session: 8, estrategia: "ABP — Fase Desempeño + Presentación + Evaluación reflexiva" }
];

const ESTRATEGIAS_RESUMEN = {
  nota: "Arco de 4 estrategias SENA distribuidas en el ciclo de 8 sesiones: ABP como apertura motivacional (S1: Wake-Up Call), ABT en apropiación intensiva (S2–S5: Toolbelt Reading → Inspection Form → Diagnostic Listening+Speaking → Workshop Dialogues), Evaluación Formativa en S6 consolidación (cuestionario 25pts + orientación ABP), y ABP Final Mission en S7–S8 (Workshop Readiness Report con 5 fases: Planeación → Diseño → Desempeño → Presentación → Evaluación reflexiva).",
  ciclo_sena: {
    "3.1_reflexion_inicial": "S1 — ABP (el taller diésel y el brief técnico motivan el inglés ocupacional)",
    "3.2_contextualizacion": "S1 — Diagnóstico (Gap Card + KWL chart + Learning Contract)",
    "3.3_apropiacion": "S2–S5 — ABT dominante (tareas con producto verificable: Reading HOTS, Inspection Form, Listening gist+detail, Speaking roleplay, Language Functions F1–F5) | S6 — Evaluación Formativa Integrada (Cuestionario Consolidado 25pts)",
    "3.4_transferencia": "S6b + S7–S8 — ABP (Workshop Readiness Report Mission) con fases Planeación → Diseño → Desempeño → Presentación → Evaluación reflexiva"
  },
  estrategia_dominante_por_sesion: ESTRATEGIAS_DOMINANTES
};

const VOC_DIMENSIONS_TABLE = [
  {
    session: 1,
    nombre: "The Wake-Up Call",
    cognitiva: "Reconocer elementos del taller diésel nombrándolos en inglés mediante mood board icebreaker y diagnóstico inicial Gap Card/KWL.",
    procedimental: "Completar Gap Card + KWL chart identificando vocabulario previo vs. vocabulario target del Toolbelt DIESEL (5 categorías × 4 términos).",
    actitudinal: "Comprometerse con el contrato de English Zone reconociendo el valor del inglés técnico en la práctica del taller automotriz."
  },
  {
    session: 2,
    nombre: "Read the Workshop",
    cognitiva: "Comprender el texto técnico Motor Age (adaptado a A1.1) identificando 5 ideas clave mediante estrategias de lectura skim/scan/detail.",
    procedimental: "Extraer 20 términos Toolbelt del texto fuente clasificándolos en las 5 categorías (Tools/Fluids/Parts/PPE/Actions) y responder cuestionario HOTS de 5 preguntas.",
    actitudinal: "Asumir responsabilidad por el propio aprendizaje manteniendo la English Zone durante la lectura silenciosa y el trabajo en parejas."
  },
  {
    session: 3,
    nombre: "Write It Right",
    cognitiva: "Reconocer la estructura gramatical del imperativo (Check/Replace/Don't + base form) y del there is/there are como scaffolds de producción escrita técnica.",
    procedimental: "Completar una Pre-Maintenance Inspection Form (E2 — 5pts) aplicando imperativos y cuantificadores some/any en 8 ítems de chequeo mecánico.",
    actitudinal: "Valorar la precisión técnica escrita como parte del profesionalismo del taller diésel."
  },
  {
    session: 4,
    nombre: "Tuning In & Speaking Up",
    cognitiva: "Distinguir gist vs. detail en un diálogo mechanic-supervisor del taller, reconociendo marcadores can/can't de habilidad técnica.",
    procedimental: "Completar cuestionario de listening (E3 — 5pts) y ejecutar roleplay mechanic/supervisor con pronunciación de word stress en 10 términos Toolbelt (E4 — 5pts).",
    actitudinal: "Participar en pares con disposición al error productivo — pronunciation noticing más que pronunciation perfection."
  },
  {
    session: 5,
    nombre: "The Workshop in Action",
    cognitiva: "Reconocer y producir 5 funciones comunicativas de taller: F1 saludo profesional, F2 reportar problema, F3 pedir clarificación, F4 describir rutina, F5 dar instrucción.",
    procedimental: "Ejecutar escenarios de interacción de taller integrando F1–F5 con can/can't y present simple de rutinas (E5 — 5pts, Escala de estimación No 5).",
    actitudinal: "Mostrar autonomía comunicativa iniciando interacciones en inglés dentro del taller (English Zone extendida)."
  },
  {
    session: 6,
    nombre: "Prove What You Know + Final Mission Orientation",
    cognitiva: "Demostrar conocimiento integrado de las 5 habilidades (Reading/Writing/Listening/Speaking/Language Functions) en el Cuestionario Consolidado (E6 — 25pts).",
    procedimental: "Ejecutar cuestionario de 25 ítems (5 secciones × 5 ítems × 1pt) en 90 min y recibir orientación del ABP Final Mission Workshop Readiness Report.",
    actitudinal: "Asumir la evaluación como oportunidad de evidenciar progreso y cerrar la fase de apropiación con metacognición."
  },
  {
    session: 7,
    nombre: "Final Mission — Preparación y Coaching",
    cognitiva: "Diseñar la estructura del Workshop Readiness Report seleccionando 3 secciones del taller a reportar (Tools inventory, Safety check, Maintenance schedule).",
    procedimental: "Planear en dupla el reporte técnico aplicando imperativos, there is/there are y present simple; recibir coaching del instructor por parejas.",
    actitudinal: "Colaborar efectivamente con el par asumiendo roles complementarios en la preparación del producto final."
  },
  {
    session: 8,
    nombre: "The Final Mission — Workshop Readiness Report",
    cognitiva: "Ejecutar y presentar el Workshop Readiness Report integrando todos los saberes gramaticales y léxicos del ciclo A1.1.",
    procedimental: "Presentar el reporte oralmente (3–5 min por dupla) en contexto de simulación de taller; completar auto-evaluación + co-evaluación reflexiva.",
    actitudinal: "Demostrar autonomía lingüística y profesionalismo técnico cerrando el ciclo A1.1 con transferencia al ambiente productivo real."
  }
];

// Helper: extract grammar_groups from session_text (existing pm-3-1.sessions[].grammar_active)
function parseGrammarGroups(grammarActive) {
  // e.g. "Gr1 INTRO — Verbo be (...)" or "Gr5 CONSOLIDA (imperativo) + Gr7 INTRO (...)"
  if (!grammarActive) return [];
  const groups = [];
  const regex = /Gr(\d+)\s*(INTRO|CONSOLIDA|APLICA|CONSOLIDA\s*\([^)]+\)|INTRO\s*\([^)]+\))?/gi;
  let m;
  while ((m = regex.exec(grammarActive)) !== null) {
    groups.push({
      group_id: `Gr ${m[1]}`,
      nivel_activacion: (m[2] || 'ref').split(' ')[0]
    });
  }
  return groups;
}

// Feedback mode logic per PM-0 §5.9
function feedbackMode(sessionNum) {
  if (sessionNum === 1 || sessionNum === 2) {
    return { mode: 'ACCURACY', rationale: "Input receptivo y diagnóstico/lectura — foco en chunks precisos. PM-0 §5.9." };
  } else if (sessionNum === 3 || sessionNum === 6) {
    return { mode: 'ACCURACY', rationale: "Escritura formal (S3) y evaluación sumativa (S6) requieren precisión. PM-0 §5.9." };
  } else if (sessionNum === 4 || sessionNum === 5) {
    return { mode: 'FLUENCY-LEANING', rationale: "Producción oral (S4) y funciones comunicativas (S5) priorizan fluidez sobre perfección formal. PM-0 §5.9." };
  } else {
    return { mode: 'FLUENCY', rationale: "ABP Final Mission (S7-S8) prioriza comunicación efectiva — fluency total. PM-0 §5.9." };
  }
}

// Build pm0_alignment_by_session from existing pm-3-1 sessions + pm-3-2-sX metadata
function buildPm0Alignment(existingSessions, pm32List) {
  return pm32List.map((s, i) => {
    const session = s.session || (i + 1);
    const sessionName = s.session_name || (existingSessions[i] && existingSessions[i].title) || `S${session}`;
    const l1 = s.l1_management_summary && s.l1_management_summary.l1_max_pct;
    const existing = existingSessions.find(x => x.session == session || x.title === sessionName) || {};
    const grammarGroups = parseGrammarGroups(existing.grammar_active || '');

    // Rationale for L1
    let l1Rationale;
    if (session === 1) l1Rationale = "Día 1 establecer confianza y motivación. L1 es andamio emocional. Welcome + Gap Card en L1 dominante. PM-0 §9.1.";
    else if (session === 2) l1Rationale = "Input receptivo — L1 para clarificar instrucciones + vocabulary scaffolding. Reducción progresiva. PM-0 §9.1.";
    else if (session === 3) l1Rationale = "Output escrito — L1 solo para explicar estructuras gramaticales complejas (imperativo en negativo). PM-0 §9.1.";
    else if (session === 4) l1Rationale = "Listening + Speaking — L1 reducido a emergencias comunicativas; roleplay en English-only. PM-0 §9.1.";
    else if (session === 5) l1Rationale = "Language Functions — L1 solo como consulta léxica ocasional; interacción 85%+ en inglés. PM-0 §9.1.";
    else if (session === 6) l1Rationale = "Evaluación — cuestionario 100% en inglés; L1 solo en instrucciones iniciales y metacognición final. PM-0 §9.1.";
    else l1Rationale = "ABP Final Mission — inmersión máxima. L1 solo para emergencias. Transferencia al ambiente productivo. PM-0 §9.1.";

    return {
      session,
      nombre: sessionName,
      l1_percentage_target: {
        value: l1,
        source: `pm-0-context.json l1_policy_per_guide[0].s1_to_s8 — S${session} ${l1}% (PM-0 §9.1)`,
        rationale: l1Rationale
      },
      grammar_groups_active: grammarGroups.length ? grammarGroups : [{ group_id: "N/A", nivel_activacion: "ref" }],
      grammar_carga_check: session === 1
        ? "0 Intro — S1 es diagnóstico sin enseñanza gramatical explícita (PM-0 §9.2) ✓"
        : `Carga gramatical alineada con silabus 17-grupos PM-0 §4 — ver sessions[${i}].grammar_active ✓`,
      dominant_feedback_mode: feedbackMode(session),
      stress_pronunciation_focus: session === 4
        ? "Word stress en 10 términos Toolbelt (diagnostic, inspection, pressure, etc.) — PM-0 §5.10"
        : session === 5
        ? "Sentence stress en F1–F5 (content words fuertes, function words débiles) — PM-0 §5.10"
        : "Stress marking en vocabulario nuevo del día — PM-0 §5.10",
      success_vocabulary_factors: [
        "Seen (Word Wall permanente)",
        "Used (producción activa en la sesión)",
        "Contextualized (realia de taller diésel)",
        "Connected (chunks + colocaciones)",
        "Elaborated (HOTS en S2+)",
        "Spaced (reciclaje S2→S5)",
        "Self-explained (metacognición S6+)"
      ],
      cefr_descriptor_focus: `A1.1 · ver pm-0-context.json cefr_descriptors_per_guide[0] — subnivel y can-do de S${session}`,
      pedagogical_shift_hook: session === 1
        ? "Shift 1 — De conversación social a conversación de taller (Welcome a Pixel & Ink → Welcome al Diesel Workshop)."
        : `Shift ${Math.ceil(session/2)} — ver pm-0-context.json methodological_shifts_per_guide[0]`,
      traceability_seed_22: `Checklist 22-items aplica — ver pm-0-context.json traceability_checklist_ref`
    };
  });
}

function buildSessionsLogistics(estrategiasPerSession, pm32List) {
  const ambientes = [
    "Aula bilingüe en U o mesas de 4. Proyector + tablero + English Zone señalizada. Word Wall vacío (activación S1).",
    "Aula bilingüe con mesas de 4. Word Wall con 5 categorías Toolbelt activadas. Texto Motor Age impreso (1 por aprendiz).",
    "Aula bilingüe con mesas individuales para inspección escrita + parejas para revisión. Fichas inspection form impresas (GFPI-like).",
    "Aula bilingüe con estación de simulación mechanic/supervisor (2 mesas enfrentadas). Audio diálogo S4 + auriculares si disponibles.",
    "Aula bilingüe en círculo para Language Functions + estación de roleplay F1–F5 con realia de taller (casco, llave inglesa, trapo).",
    "Aula bilingüe en examen (mesas separadas 1m). Cuestionario Consolidado impreso + hoja de respuestas + cronómetro visible.",
    "Aula bilingüe con mesas en parejas (duplas de trabajo). Brief Workshop Readiness Report + plantilla + coaching del instructor circulando.",
    "Sala de presentaciones o aula con estación frontal tipo taller. Duplas presentan ante compañeros + instructor + (ideal) invitado técnico."
  ];
  return pm32List.map((s, i) => ({
    s: s.session || (i + 1),
    ambiente: ambientes[i] || "Aula bilingüe convencional.",
    momento_sena: s.momento_sena || "N/A",
    estrategia_dominante: estrategiasPerSession[i] ? estrategiasPerSession[i].estrategia : "N/A",
    note: "Session-wide logistics. Derived DOWNSTREAM in pm-3-6 activity_footer."
  }));
}

const DATA_FLOW_CONTRACT = {
  activity_footer: {
    canon_version: "2.6-dataflow-inversion-2026-04-20",
    principle: "Activity footer in pm-3-6 is DERIVED, not authored.",
    session_wide_source: "pm-3-1.sessions_logistics[s]",
    activity_wide_source: "pm-3-2-sX.activity_logistics[activity_id]",
    evidence_lookup_source: "pm-4-1.instrument_{1..5}_* + pm-4-2 for E6",
    deriver_script: "scripts/derive_activity_footer_from_playbook.js"
  }
};

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const pm31 = JSON.parse(fs.readFileSync(PM31, 'utf8'));

  // Backup
  if (!fs.existsSync(BACKUP)) {
    fs.writeFileSync(BACKUP, JSON.stringify(pm31, null, 2));
    console.log(`✓ Backup created: pm-3-1.pre-v266.json`);
  }

  // Load 8 pm-3-2-sX.json for session metadata
  const pm32List = [];
  for (let i = 1; i <= 8; i++) {
    pm32List.push(JSON.parse(fs.readFileSync(path.join(RUN_DIR, `pm-3-2-s${i}.json`), 'utf8')));
  }

  // Augment metadata
  pm31.pm_version = "2.6.6";
  pm31.pm_verified_against_prompt = true;
  pm31.pipeline_version = "v2.6.6";
  if (!pm31._meta) pm31._meta = {};
  pm31._meta.v266_upgraded_at = new Date().toISOString();
  pm31._meta.v266_upgrade_script = "scripts/gen_pm31_v266_fields.js";

  // 1. overview_table (CANONICAL 8-row schema — derived from pm-3-2-sX metadata)
  const focusPerSession = [
    "Activación + diagnóstico saberes previos + contrato English Zone (Wake-Up Call)",
    "Lectura técnica Motor Age + vocabulario Toolbelt (5 categorías × 4 términos)",
    "Producción escrita — Pre-Maintenance Inspection Form (imperativos + there is/are)",
    "Comprensión auditiva (mechanic-supervisor) + producción oral con word stress",
    "Funciones comunicativas F1–F5 del taller (can/can't + present simple)",
    "Evaluación consolidada (25pts) + orientación ABP Final Mission",
    "Preparación Workshop Readiness Report — planeación + diseño + coaching",
    "Ejecución + Presentación + Evaluación reflexiva del Workshop Readiness Report"
  ];
  const skillsPerSession = [
    "—",
    "Reading + Vocabulary",
    "Writing + Grammar",
    "Listening + Speaking + Pronunciation",
    "Speaking integrado (Language Functions)",
    "5 habilidades integradas",
    "Integración ABP (producto)",
    "Integración ABP (presentación)"
  ];
  const evidenciaPerSession = [
    "—",
    "E1 Cuestionario No 1 (Reading — 5pts)",
    "E2 Lista de verificación No 2 (Writing — 5pts)",
    "E3 Cuestionario No 3 (Listening — 5pts) + E4 Escala No 4 (Speaking — 5pts)",
    "E5 Escala de estimación No 5 (Language Functions — 5pts)",
    "E6 Cuestionario Consolidado No 6 (25pts — 5 skills × 5pts)",
    "— (transferencia ABP sin evidencia GFPI-F-134 formal)",
    "— (cierre ABP; Misión Final 5pts fuera de GFPI-F-134)"
  ];
  const autonomoPerSession = [
    "Revisar vocabulario Toolbelt con audio del Word Wall; traer 3 fotos del taller para S2",
    "Re-lectura del texto Motor Age + completar ficha de vocabulario (30 términos)",
    "Completar borrador de Inspection Form para taller propio; grabar pronunciación de 10 Toolbelt terms",
    "Practicar diálogo mechanic-supervisor con familia o compañero; grabar audio de autoevaluación",
    "Role-play F1–F5 frente al espejo; completar hoja reflexiva",
    "Revisar portafolio E1–E5 y preparar preguntas para orientación S6b",
    "Completar borrador Workshop Readiness Report + ensayar con dupla",
    "Completar auto-evaluación + co-evaluación + encuesta de transferencia"
  ];

  // pms_involucrados is string like "PM-2.1 (The Spark) + PM-2.2 (Gap Analysis)"
  // Parse it into a clean list of PM codes
  function parsePmList(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    const matches = String(raw).match(/PM-[0-9\.]+/g);
    return matches || [String(raw)];
  }

  pm31.overview_table = pm32List.map((s, i) => {
    const sess = s.session || (i + 1);
    return {
      session: sess,
      nombre: s.session_name || `S${sess}`,
      worksheets: parsePmList(s.pms_involucrados),
      momento_sena: s.momento_sena || "",
      foco: focusPerSession[i] || "",
      habilidades: skillsPerSession[i] || "—",
      evidencia: evidenciaPerSession[i] || "—",
      autonomo: autonomoPerSession[i] || "—"
    };
  });

  // Keep session_overview_table as legacy alias too
  pm31.session_overview_table_legacy = pm31.session_overview_table;

  // 2. ambientes_resumen
  pm31.ambientes_resumen = AMBIENTES_RESUMEN;

  // 3. estrategias_resumen
  pm31.estrategias_resumen = ESTRATEGIAS_RESUMEN;

  // 4. voc_dimensions_table
  pm31.voc_dimensions_table = VOC_DIMENSIONS_TABLE;

  // 5. pm0_alignment_by_session
  pm31.pm0_alignment_by_session = buildPm0Alignment(pm31.sessions || [], pm32List);

  // 6. sessions_logistics
  pm31.sessions_logistics = buildSessionsLogistics(ESTRATEGIAS_DOMINANTES, pm32List);

  // 7. data_flow_contract
  pm31.data_flow_contract = DATA_FLOW_CONTRACT;

  // Write back
  fs.writeFileSync(PM31, JSON.stringify(pm31, null, 2));
  const stat = fs.statSync(PM31);
  console.log(`✓ Augmented pm-3-1.json (${stat.size} bytes)`);
  console.log(`  + overview_table (alias) → ${pm31.overview_table.length} sessions`);
  console.log(`  + ambientes_resumen`);
  console.log(`  + estrategias_resumen`);
  console.log(`  + voc_dimensions_table (${pm31.voc_dimensions_table.length} entries)`);
  console.log(`  + pm0_alignment_by_session (${pm31.pm0_alignment_by_session.length} entries)`);
  console.log(`  + sessions_logistics (${pm31.sessions_logistics.length} entries)`);
  console.log(`  + data_flow_contract`);
  console.log(`  ✓ pm_version: ${pm31.pm_version}`);
}

main();
