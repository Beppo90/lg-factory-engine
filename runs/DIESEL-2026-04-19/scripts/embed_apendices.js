#!/usr/bin/env node
/**
 * embed_apendices.js — DIESEL G1
 *
 * 1. Populates apendices_embebidos[*].contenido_inline with full structured content
 *    extracted from pm-2-3 (text), pm-2-4 (font card moves), pm-2-6 (audio script),
 *    pm-3-5 (mission brief, self-reflection).
 * 2. Adds `apendices_referenciados: [keys]` to the activities that use them:
 *      A → A3.3.S2.2
 *      B → A3.3.S3.2
 *      C → A3.3.S4.2
 *      D → A3.3.S2.1, A3.3.S2.3
 *      E → A3.3b.4, A3.4.1
 *      F → A3.4.1
 *      G → A3.4.5
 */

const fs = require('fs');
const path = require('path');
const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19';

const load = (f) => JSON.parse(fs.readFileSync(path.join(RUN_DIR, f), 'utf8'));

const p23 = load('pm-2-3.json');
const p24 = load('pm-2-4.json');
const p26 = load('pm-2-6.json');
const p35 = load('pm-3-5.json');
const p36 = load('pm-3-6.json');

// =====================================================================
// Build contenido_inline for each appendix
// =====================================================================

// APPENDIX A — Master Anchor Text (from pm-2-3)
const apA = p23.content.the_master_anchor_text;
const apendice_A_contenido = {
  tipo: 'reading_text',
  source_credit: apA.source_credit,
  genre: apA.genre,
  reading_time: apA.reading_time_estimated,
  text_en: apA.text_en,
  text_es_support: apA.text_es_support_cursiva,
  nota_uso: 'Lee el texto en inglés primero. Si pierdes el sentido, revisa la versión en español entre corchetes como apoyo (solo 1 vez).',
};

// APPENDIX B — Andrés' Sample Font Card (built from pm-2-4 move_structure)
const moves = p24.blueprint_model.move_structure;
const apendice_B_contenido = {
  tipo: 'writing_model',
  titulo_modelo: 'Font Card Andrés — Modelo GOOD',
  nota_uso: 'Este es el modelo que Andrés escribió. Los 5 movimientos (moves) te muestran cómo estructurar tu propio font card.',
  moves_estructura: moves.map(m => ({
    move: m.move,
    ejemplo: m.example_from_universe,
    funcion: m.function,
    nota_gramatical: m.grammar_target || m.register_note || '',
  })),
  anti_modelo_warning: p24.blueprint_model.anti_model_warning ? {
    label: p24.blueprint_model.anti_model_warning.label,
    ejemplo_malo: p24.blueprint_model.anti_model_warning.bad_example,
    por_que_falla: p24.blueprint_model.anti_model_warning.why_it_fails,
    explicacion_es: p24.blueprint_model.anti_model_warning.spanish,
  } : null,
};

// APPENDIX C — Audio Script Sophia & Laura (from pm-2-6)
const aas = p26.auditory_anchor_script;
const apendice_C_contenido = {
  tipo: 'audio_script',
  titulo: aas.title,
  total_words: aas.total_words,
  duration_seconds: aas.duration_estimate_seconds,
  chunks: aas.transcript.map(c => ({
    chunk_n: c.chunk,
    speaker: c.speaker,
    texto: c.text,
  })),
  full_text: aas.full_text_for_tts,
  nota_uso: 'El instructor reproduce el audio 2 veces. Puedes leer el transcript después de la segunda escucha.',
};

// APPENDIX D — Toolbelt 20 Terms (from pm-3-6 glossary, 5 categories × 4 terms)
const apendice_D_contenido = {
  tipo: 'word_wall',
  total_cards: 20,
  categorias: p36.seccion_5_glosario.categorias.map(cat => ({
    categoria: cat.categoria,
    terminos: cat.terminos.map(t => ({
      n: t.n,
      term: t.term,
      espanol: t.espanol,
      definition_en: t.definition_en,
      example_en: t.ejemplo_en,
    })),
  })),
  nota_uso: 'Estas son las 20 palabras Toolbelt que usarás en toda la guía. Pégalas en la pared del aula y consulta según necesites.',
};

// APPENDIX E — Mission Brief (from pm-3-5)
const mb = p35.documento_1_mission_brief;
const apendice_E_contenido = {
  tipo: 'mission_brief',
  titulo: mb.titulo,
  header_bilingual: mb.header_bilingual,
  the_mission: {
    headline_en: mb.the_mission.headline_en,
    scenario_en: mb.the_mission.scenario_familiar_en,
    scenario_es_support: mb.the_mission.scenario_familiar_es_si_a11,
    your_role_en: mb.the_mission.your_role_en,
    your_audience_en: mb.the_mission.your_audience_en,
  },
  the_briefing: {
    headline: mb.the_briefing.que_se_espera_en,
    lista: mb.the_briefing.lista_expectativas_bilingue,
  },
  the_deliverable: {
    headline: mb.the_deliverable.headline_en,
    format_options: mb.the_deliverable.format_options_en,
    obligatory_content: mb.the_deliverable.obligatory_content_en,
    entrega: mb.the_deliverable.entrega_formal,
  },
  the_rules: {
    tiempos: mb.the_rules.tiempos,
    restricciones: mb.the_rules.restricciones,
    criterios_exito: mb.the_rules.criterios_de_exito_en,
  },
};

// APPENDIX F — Planning Canvas (5 zones)
const apendice_F_contenido = {
  tipo: 'planning_template',
  titulo: 'Planning Canvas — La Esquina Bakery Mood Board',
  formato: '1 página A4 imprimible',
  zonas: [
    { n: 1, label: 'Bakery type', pregunta: 'What kind of bakery is La Esquina? (family / modern / traditional / artisanal)', espacio: '3 líneas' },
    { n: 2, label: 'Mood (3 adjectives)', pregunta: 'Pick 3 English adjectives that describe the feeling you want (warm, friendly, cozy, traditional, modern, classic...)', espacio: '3 líneas' },
    { n: 3, label: 'Typography direction', pregunta: 'Will you choose a serif or sans-serif font? Bold or regular? Why?', espacio: '4 líneas' },
    { n: 4, label: 'Color direction', pregunta: 'Which warm colors will dominate? (brown, cream, orange, red, yellow...) Any cool accent?', espacio: '4 líneas' },
    { n: 5, label: 'References plan', pregunta: 'List 6 references you will search: type (logo/poster/packaging) + source (Unsplash/Pinterest/Behance).', espacio: 'tabla 6 filas × 2 columnas' },
  ],
  nota_uso: 'Llena las 5 zonas en español o inglés simple antes de empezar la búsqueda visual. Esto es TU plan — no el plan final de Sophia.',
};

// APPENDIX G — Self-Reflection Card (from pm-3-5)
const fa = p35.ficha_autoevaluacion_subfase5;
const apendice_G_contenido = {
  tipo: 'self_assessment',
  titulo: fa.titulo,
  instrucciones: fa.instrucciones_aprendiz,
  items: fa.items_a11_emoji_scale.map(it => ({ pregunta: it.q, escala: it.scale })),
  design_star: {
    instrucciones: fa.design_star_peer_evaluation.instrucciones,
    ejemplo: fa.design_star_peer_evaluation.ejemplo_modelo,
  },
};

// =====================================================================
// Write back to pm-3-6.json
// =====================================================================

const ap = p36.apendices_embebidos;
ap.apendice_a_master_anchor_text.contenido_inline = apendice_A_contenido;
ap.apendice_b_andres_sample_font_card.contenido_inline = apendice_B_contenido;
ap.apendice_c_sophia_laura_color_conversation.contenido_inline = apendice_C_contenido;
ap.apendice_d_toolbelt_20_terms_visual.contenido_inline = apendice_D_contenido;
ap.apendice_e_final_mission_brief.contenido_inline = apendice_E_contenido;
ap.apendice_f_sample_planning_canvas.contenido_inline = apendice_F_contenido;
ap.apendice_g_self_reflection_card.contenido_inline = apendice_G_contenido;

// Mapping appendix → activity IDs
const mapping = {
  'A3.3.S2.1': ['apendice_d_toolbelt_20_terms_visual'],
  'A3.3.S2.2': ['apendice_a_master_anchor_text'],
  'A3.3.S2.3': ['apendice_d_toolbelt_20_terms_visual'],
  'A3.3.S3.2': ['apendice_b_andres_sample_font_card'],
  'A3.3.S4.2': ['apendice_c_sophia_laura_color_conversation'],
  'A3.3b.4':   ['apendice_e_final_mission_brief'],
  'A3.4.1':    ['apendice_e_final_mission_brief', 'apendice_f_sample_planning_canvas'],
  'A3.4.5':    ['apendice_g_self_reflection_card'],
};

const sec3 = p36.seccion_3_actividades_aprendizaje;
const apply = (act) => {
  const id = act.actividad_id;
  if (mapping[id]) act.apendices_referenciados = mapping[id];
};

for (const a of sec3.subseccion_3_1_reflexion_inicial_s1.actividades) apply(a);
for (const a of sec3.subseccion_3_2_contextualizacion_s1.actividades) apply(a);
const s33 = sec3.subseccion_3_3_apropiacion_s2_a_s5;
for (const sk of ['sesion_2_reading_vocabulary','sesion_3_writing_grammar','sesion_4_listening_speaking','sesion_5_language_functions']) {
  for (const a of s33[sk].actividades_principales) apply(a);
}
for (const a of sec3.subseccion_3_3b_evaluacion_consolidacion_s6.actividades) apply(a);
for (const a of sec3.subseccion_3_4_transferencia_s7_s8.actividades) apply(a);

fs.writeFileSync(path.join(RUN_DIR, 'pm-3-6.json'), JSON.stringify(p36, null, 2));

// Report
let applied = 0;
for (const [aid, keys] of Object.entries(mapping)) {
  console.log(`  ${aid} → [${keys.join(', ')}]`);
  applied++;
}
console.log(`[pm-3-6] ${applied} activities referenced appendices`);
console.log(`[pm-3-6] 7 appendices populated with contenido_inline`);
console.log(`[done] pm-3-6.json updated`);
