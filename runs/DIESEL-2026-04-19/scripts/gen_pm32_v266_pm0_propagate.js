#!/usr/bin/env node
/**
 * gen_pm32_v266_pm0_propagate.js — Fase 3.3 DIESEL-04-19 upgrade v2.6.6
 *
 * Propaga a los 8 pm-3-2-sX.json los campos canónicos derivados de:
 *   - pm-3-1.json.pm0_alignment_by_session[i] → pm0_protocol (schema completo)
 *   - pm-3-1.json.estrategias_resumen.estrategia_dominante_por_sesion[i] → estrategia_didactica
 *   - pm-3-1.json.sessions_logistics[i] → session_logistics (session-wide)
 *
 * Reemplaza el placeholder { __pending_fase_3__: true } puesto en Fase 2.
 *
 * Schema pm0_protocol canónico v2.6.6 (fuente: PM-0 §9, MGV precedente):
 *   - grammar_groups        { intro[], consolida[], aplica[] }
 *   - feedback              { dominant_mode, accuracy_techniques, fluency_techniques }
 *   - l1_management         { l1_max_pct, english_zone, legitimate_uses, reduction_strategy }
 *   - stress_pronunciation  { focus_words, physical_techniques, board_marking }
 *   - success_vocabulary    { target_terms, success_factors_applied }
 *   - cefr_descriptor_focus (string)
 *   - pedagogical_shift_hook (string)
 *   - traceability_seed_22 (string)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RUN_DIR = path.join(__dirname, '..');
const PM31    = path.join(RUN_DIR, 'pm-3-1.json');

// DIESEL-specific content per session ────────────────────────────────────────

// Grammar groups structured per session
// Format: { intro:[...], consolida:[...], aplica:[...] }
const GRAMMAR_PER_SESSION = {
  1: {
    intro: [{ group_id: "Gr 1", group_name: "Verbo be (I'm/you're/is/are — afirmativo contraído)",
              ejemplo: "Teacher Talk: 'I'm Sergio. This is the Diesel Workshop.'" }],
    consolida: [],
    aplica: []
  },
  2: {
    intro: [{ group_id: "Gr 2", group_name: "There is / there are + some/any (existencia con Toolbelt)",
              ejemplo: "There are five categories in the Toolbelt. Are there any tools?" }],
    consolida: [{ group_id: "Gr 1", group_name: "Verbo be",
                  ejemplo: "This is a wrench. These are spark plugs." }],
    aplica: []
  },
  3: {
    intro: [{ group_id: "Gr 5", group_name: "Imperativo afirmativo/negativo (Check/Don't touch)",
              ejemplo: "Check oil level. Don't touch the hot engine." }],
    consolida: [
      { group_id: "Gr 1", group_name: "be", ejemplo: "The oil level is low." },
      { group_id: "Gr 2", group_name: "there is/are", ejemplo: "There are 8 items on the checklist." }
    ],
    aplica: []
  },
  4: {
    intro: [{ group_id: "Gr 7", group_name: "can/can't (habilidad técnica)",
              ejemplo: "I can fix this. The mechanic can't reach the bolt." }],
    consolida: [{ group_id: "Gr 5", group_name: "Imperativo",
                  ejemplo: "Listen carefully. Don't interrupt." }],
    aplica: [
      { group_id: "Gr 1", group_name: "be", ejemplo: "This is loud. The engine is noisy." },
      { group_id: "Gr 2", group_name: "there is/are", ejemplo: "There is a problem with the oil." }
    ]
  },
  5: {
    intro: [{ group_id: "Gr 3", group_name: "Present Simple (rutinas y procedimientos)",
              ejemplo: "I check the bay every morning. The mechanic changes oil weekly." }],
    consolida: [{ group_id: "Gr 7", group_name: "can/can't",
                  ejemplo: "I can do basic maintenance. I can't diagnose electrical faults yet." }],
    aplica: [
      { group_id: "Gr 1", group_name: "be", ejemplo: "He is the supervisor." },
      { group_id: "Gr 2", group_name: "there is/are", ejemplo: "There are three mechanics on duty." },
      { group_id: "Gr 5", group_name: "Imperativo", ejemplo: "Please wait. Don't start the engine." }
    ]
  },
  6: {
    intro: [],
    consolida: [],
    aplica: [
      { group_id: "Gr 1", group_name: "be", ejemplo: "Cuestionario items testing 'is/are/am'." },
      { group_id: "Gr 2", group_name: "there is/are", ejemplo: "Items testing existence structures." },
      { group_id: "Gr 3", group_name: "Present Simple", ejemplo: "Items testing routines." },
      { group_id: "Gr 5", group_name: "Imperativo", ejemplo: "Items testing instructions." },
      { group_id: "Gr 7", group_name: "can/can't", ejemplo: "Items testing ability statements." }
    ]
  },
  7: {
    intro: [],
    consolida: [],
    aplica: [
      { group_id: "Gr 1+2+3+5+7", group_name: "ALL A1.1 groups en producción libre del Workshop Readiness Report",
        ejemplo: "There are 5 tools. I check them every morning. The supervisor can verify this." }
    ]
  },
  8: {
    intro: [],
    consolida: [],
    aplica: [
      { group_id: "Gr 1+2+3+5+7", group_name: "ALL A1.1 groups en presentación oral del Workshop Readiness Report",
        ejemplo: "Presentation integrates all grammar groups with fluency-first feedback." }
    ]
  }
};

const FEEDBACK_TECHNIQUES = {
  ACCURACY: {
    accuracy_techniques: [
      "Recast inmediato (repetir forma correcta sin señalar error)",
      "Clarification request ('Sorry, can you repeat?')",
      "Prompting con scaffolding visual (señalar al Word Wall)"
    ],
    fluency_techniques: [
      "Wait-time de 3 segundos antes de corregir",
      "Error log posterior (no interrumpir producción)"
    ]
  },
  "FLUENCY-LEANING": {
    accuracy_techniques: [
      "Recast solo en errores que bloquean comprensión",
      "Delayed correction en whiteboard al final del bloque"
    ],
    fluency_techniques: [
      "Encouragement verbal y no verbal (nodding, thumbs up)",
      "Reformulación modelada sin señalar error",
      "Fomentar communication strategies (gestures, synonyms)"
    ]
  },
  FLUENCY: {
    accuracy_techniques: [
      "Post-task feedback general (no individual durante la ejecución)",
      "Peer correction en fase reflexiva"
    ],
    fluency_techniques: [
      "Celebración del riesgo comunicativo",
      "Focus en mensaje y efecto pragmático",
      "Fomentar self-repair y circumlocution"
    ]
  }
};

const L1_MANAGEMENT_PER_SESSION = {
  1: { english_zone_dominance: "30/70 L1/L2", legitimate_uses: ["Welcome warmth","Learning contract expectations","Gap Card vocabulary elicitation"], reduction_strategy: "Progresivo S1→S8" },
  2: { english_zone_dominance: "25/75 L1/L2", legitimate_uses: ["Instructions for Toolbelt task","Pre-reading vocabulary clarification"], reduction_strategy: "Mayoría de input en L2 + scaffold visual" },
  3: { english_zone_dominance: "20/80 L1/L2", legitimate_uses: ["Grammar meta-explanation (imperativo negativo)","Inspection Form task clarification"], reduction_strategy: "L1 solo para aha moments gramaticales" },
  4: { english_zone_dominance: "15/85 L1/L2", legitimate_uses: ["Emergency repair of comprehension breakdown"], reduction_strategy: "Roleplay mechanic/supervisor English-only" },
  5: { english_zone_dominance: "12/88 L1/L2", legitimate_uses: ["Consulta léxica ocasional F1–F5"], reduction_strategy: "Functions practice en interacción autónoma" },
  6: { english_zone_dominance: "10/90 L1/L2", legitimate_uses: ["Instrucciones iniciales del cuestionario","Metacognición reflexiva final"], reduction_strategy: "Cuestionario 100% en L2" },
  7: { english_zone_dominance: "5/95 L1/L2", legitimate_uses: ["Coaching emocional puntual"], reduction_strategy: "Preparación ABP casi inmersiva" },
  8: { english_zone_dominance: "5/95 L1/L2", legitimate_uses: ["Coaching emocional puntual","Cierre emocional en L1"], reduction_strategy: "Presentación y evaluación en L2" }
};

const STRESS_FOCUS_PER_SESSION = {
  1: { focus_words: ["Welcome","Workshop","Diesel","Engine","Toolbelt"],
       physical_techniques: ["Handclap en sílaba tónica","Elastic band stretch on stressed vowel"],
       board_marking: "Círculo rojo alrededor de sílaba tónica" },
  2: { focus_words: ["wrench","screwdriver","inspection","coolant","piston","cylinder","battery","filter","sparkplug","gasket"],
       physical_techniques: ["Handclap","Finger tap on desk","Voice level rise on stressed syllable"],
       board_marking: "Círculo rojo + acento visual encima del fonema" },
  3: { focus_words: ["check","replace","tighten","inspect","replace","don't","engine","oil"],
       physical_techniques: ["Handclap + pause","Imperative drill choral"],
       board_marking: "Círculo rojo en imperativo inicial" },
  4: { focus_words: ["diagnostic","inspection","pressure","torque","adjustment","malfunction","replacement","compression","alignment","calibration"],
       physical_techniques: ["Handclap","Elastic band","Physical stretch gesture"],
       board_marking: "Círculo rojo + número de sílabas arriba (4 sílabas, stress 2)" },
  5: { focus_words: ["Can you help?","I can fix it","I can't see","Every morning","Every day"],
       physical_techniques: ["Sentence stress rhythm clap","Content words STRONG / function words weak"],
       board_marking: "CAPS para content words + strike-through para function words" },
  6: { focus_words: ["N/A — evaluation day, no new stress work"],
       physical_techniques: [],
       board_marking: "—" },
  7: { focus_words: ["Workshop","Readiness","Report","Presentation","Evaluation"],
       physical_techniques: ["Choral rehearsal of report title","Stress rehearsal in pairs"],
       board_marking: "Título proyectado + stress marking" },
  8: { focus_words: ["— continued from S7 —"],
       physical_techniques: ["Final rehearsal before delivery"],
       board_marking: "—" }
};

const SUCCESS_FACTORS = [
  "Seen (Word Wall permanente — 5 cats × 4 términos)",
  "Used (producción activa en la sesión)",
  "Contextualized (realia de taller diésel)",
  "Connected (chunks + colocaciones Toolbelt)",
  "Elaborated (HOTS desde S2)",
  "Spaced (reciclaje circular S2→S6)",
  "Self-explained (metacognición S6+)"
];

const TARGET_VOCAB_PER_SESSION = {
  1: ["Welcome","Diesel","Workshop","Engine","Safety","Tools"],
  2: ["Tools(4)","Fluids(4)","Parts(4)","PPE(4)","Actions(4)","wrench","screwdriver","coolant","piston","gasket","battery","filter","sparkplug","oil","fuel"],
  3: ["check","replace","tighten","inspect","don't","there is","there are","some","any","oil","coolant","filter"],
  4: ["can/can't","diagnostic","inspection","pressure","torque","malfunction","replacement","compression","alignment","calibration"],
  5: ["F1 greeting","F2 reporting","F3 clarifying","F4 routines","F5 instructing","every morning","every day","every week"],
  6: ["ALL A1.1 vocabulary as evaluation object"],
  7: ["Workshop Readiness Report","Tools inventory","Safety check","Maintenance schedule"],
  8: ["— same as S7, production mode"]
};

// ─── Main ───────────────────────────────────────────────────────────────────

function buildPm0Protocol(pm31Alignment, s, sessionNum) {
  const feedbackMode = pm31Alignment.dominant_feedback_mode.mode;
  const feedbackTech = FEEDBACK_TECHNIQUES[feedbackMode] || FEEDBACK_TECHNIQUES.ACCURACY;

  return {
    grammar_groups: GRAMMAR_PER_SESSION[sessionNum] || { intro: [], consolida: [], aplica: [] },
    feedback: {
      dominant_mode: feedbackMode,
      rationale: pm31Alignment.dominant_feedback_mode.rationale,
      accuracy_techniques: feedbackTech.accuracy_techniques,
      fluency_techniques: feedbackTech.fluency_techniques
    },
    l1_management: {
      l1_max_pct: pm31Alignment.l1_percentage_target.value,
      english_zone_dominance: (L1_MANAGEMENT_PER_SESSION[sessionNum] || {}).english_zone_dominance || "N/A",
      legitimate_uses: (L1_MANAGEMENT_PER_SESSION[sessionNum] || {}).legitimate_uses || [],
      reduction_strategy: (L1_MANAGEMENT_PER_SESSION[sessionNum] || {}).reduction_strategy || "",
      rationale: pm31Alignment.l1_percentage_target.rationale
    },
    stress_pronunciation: STRESS_FOCUS_PER_SESSION[sessionNum] || {},
    success_vocabulary: {
      target_terms: TARGET_VOCAB_PER_SESSION[sessionNum] || [],
      success_factors_applied: SUCCESS_FACTORS
    },
    cefr_descriptor_focus: pm31Alignment.cefr_descriptor_focus,
    pedagogical_shift_hook: pm31Alignment.pedagogical_shift_hook,
    traceability_seed_22: pm31Alignment.traceability_seed_22
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
    const backup = pm32Path.replace('.json', '.pre-v266.json');
    if (!fs.existsSync(backup)) {
      fs.writeFileSync(backup, JSON.stringify(pm32, null, 2));
    }

    // Build pm0_protocol
    pm32.pm0_protocol = buildPm0Protocol(alignments[i-1], pm32, i);

    // Propagate estrategia_didactica
    pm32.estrategia_didactica = {
      session: i,
      estrategia_dominante: estrategias[i-1].estrategia,
      ciclo_sena_anchor: (pm31.estrategias_resumen.ciclo_sena || {}),
      note: "Propagated from pm-3-1.estrategias_resumen by gen_pm32_v266_pm0_propagate.js"
    };

    // Propagate session_logistics (session-wide ambient)
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
    console.log(`  S${i}: pm0_protocol ✓ | estrategia ✓ | session_logistics ✓ | mode=${pm32.pm0_protocol.feedback.dominant_mode} | L1=${pm32.pm0_protocol.l1_management.l1_max_pct}%`);
  }

  console.log(`\n✓ Propagated v2.6.6 canon to ${updated}/8 pm-3-2-sX.json`);
}

main();
