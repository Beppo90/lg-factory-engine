// patch_v264_seccion4_y_e2.js
// v2.6.4 · MGV G1 · Ciclo integrado:
//   (a) Alinea drift E2 a canon upstream "Design Decision Email" (pm-2-4.json + pm-4-1.json INST-02)
//   (b) Reescribe seccion_4_planteamiento_evidencias al formato SENA (tabla 6 cols × 30 filas)
//
// Fuentes canónicas consumidas:
//   pm-2-4.json        → universe_anchor.genre (Design Decision Email)
//   pm-4-1.json        → instrument_1..5 criterios
//   pm-4-2.json        → sections_list (E6 25 pts = 5×5)
//   pm-3-6.json (self) → seccion_3 actividades (IDs + títulos)

const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';
const PM36_PATH = path.join(RUN_DIR, 'pm-3-6.json');
const PM41_PATH = path.join(RUN_DIR, 'pm-4-1.json');
const PM42_PATH = path.join(RUN_DIR, 'pm-4-2.json');

const d = JSON.parse(fs.readFileSync(PM36_PATH, 'utf8'));
const pm41 = JSON.parse(fs.readFileSync(PM41_PATH, 'utf8'));
const pm42 = JSON.parse(fs.readFileSync(PM42_PATH, 'utf8'));

// ============================================================
// (A) DRIFT FIX: E2 Font Card → Design Decision Email
// ============================================================
const s3 = d.seccion_3_actividades_aprendizaje.subseccion_3_3_apropiacion_s2_a_s5.sesion_3_writing_grammar;

// Session title
s3.titulo = 'Session 3 — Writing Like a Designer (Design Decision Email for La Esquina Bakery)';

// Activity renames (keep IDs stable)
const s3Acts = s3.actividades_principales;
for (const a of s3Acts) {
  if (a.actividad_id === 'A3.3.S3.2') {
    a.titulo_es = 'Modelado del Blueprint — El email de Andrés a Sophia';
  } else if (a.actividad_id === 'A3.3.S3.3') {
    a.titulo_es = 'Producción — Escribe tu propio Design Decision Email';
  } else if (a.actividad_id === 'A3.3.S3.4') {
    a.titulo_es = 'EVIDENCIA E2 — Revisión de pares + Design Decision Email final';
  }
}

// ============================================================
// (B) SECCIÓN 4 — Formato SENA (tabla 6 cols × 30 filas)
// ============================================================

// Helper: build evidence row cells from pm-4-1 instruments + pm-4-2
function criterios_E1() {
  return '5 ítems de opción múltiple A/B/C/D sobre el texto ancla "The Story of Two Fonts" (1 literal + 2 inferenciales + 1 vocabulario-en-contexto + 1 pragmático). Mínimo aprobación: 4/5 correctos. (Fuente: PM-4.1 INST-01 items)';
}
function criterios_E2() {
  const c = pm41.instrument_2_writing.criteria;
  return c.map(x => `${x.criterion_code} ${x.criterion_name} · ${x.points_max} pt`).join(' · ') + '. (Fuente: PM-4.1 INST-02)';
}
function criterios_E3() {
  const items = pm41.instrument_3_listening.checklist_items;
  return items.map(x => `Ítem ${x.item}: ${x.criterion} · ${x.points} pt`).join(' · ') + '. (Fuente: PM-4.1 INST-03)';
}
function criterios_E4() {
  const c = pm41.instrument_4_speaking.observation_criteria;
  return c.map(x => `${x.criterion_code} ${x.criterion_name}`).join(' · ') + '. Escala 0/1/2 pts por criterio (no logrado / en proceso / logrado). Total normalizado a 5 pts. (Fuente: PM-4.1 INST-04)';
}
function criterios_E5() {
  const s = pm41.instrument_5_language_functions.stations;
  return s.map(x => `Estación ${x.station} (${x.criterion_code}) ${x.function} · 1 pt`).join(' · ') + '. Chunks target + conector obligatorio por estación. (Fuente: PM-4.1 INST-05)';
}
function criterios_E6() {
  const secs = pm42.canon_structure.sections_list;
  return secs.map(s => `Sec ${s.section} ${s.skill} · ${s.pts} pts (${s.source_pm})`).join(' · ') + '. Formato A/B/C/D opción múltiple, 1 correcta. (Fuente: PM-4.2)';
}

// Build the 30 rows in canonical chronological order
const filas = [];

// Helper to push a row
function row(actividad_id, titulo_es, sesion, evidencia = null, criterios = null, tecnica_instrumento = null) {
  filas.push({
    numero: filas.length + 1,
    fase_pf: '',                 // diligenciamiento manual
    actividad_pf: '',            // diligenciamiento manual
    actividad_aprendizaje: `${actividad_id} — ${titulo_es} (${sesion})`,
    evidencia: evidencia,        // null = "—"
    criterios: criterios,        // null = "—"
    tecnica_instrumento: tecnica_instrumento  // null = "—"
  });
}

// S1 Reflexión Inicial (2)
const s1_ref = d.seccion_3_actividades_aprendizaje.subseccion_3_1_reflexion_inicial_s1.actividades;
for (const a of s1_ref) row(a.actividad_id, a.titulo_es, 'S1');

// S1 Contextualización (3)
const s1_ctx = d.seccion_3_actividades_aprendizaje.subseccion_3_2_contextualizacion_s1.actividades;
for (const a of s1_ctx) row(a.actividad_id, a.titulo_es, 'S1');

// S2 Reading + Vocabulary (4) — A3.3.S2.4 = E1
const s2 = d.seccion_3_actividades_aprendizaje.subseccion_3_3_apropiacion_s2_a_s5.sesion_2_reading_vocabulary.actividades_principales;
for (const a of s2) {
  if (a.actividad_id === 'A3.3.S2.4') {
    row(a.actividad_id, a.titulo_es, 'S2',
      'E1 — Reading Comprehension Quiz (Conocimiento · 5 pts)',
      criterios_E1(),
      'Técnica: Formulación de preguntas · Instrumento: Cuestionario No 1 (PM-4.1)');
  } else row(a.actividad_id, a.titulo_es, 'S2');
}

// S3 Writing + Grammar (4) — A3.3.S3.4 = E2 (use UPDATED title)
const s3_acts = d.seccion_3_actividades_aprendizaje.subseccion_3_3_apropiacion_s2_a_s5.sesion_3_writing_grammar.actividades_principales;
for (const a of s3_acts) {
  if (a.actividad_id === 'A3.3.S3.4') {
    row(a.actividad_id, a.titulo_es, 'S3',
      'E2 — Design Decision Email to Sophia (Producto · 5 pts)',
      criterios_E2(),
      'Técnica: Verificación del producto · Instrumento: Rúbrica analítica No 2 (PM-4.1)');
  } else row(a.actividad_id, a.titulo_es, 'S3');
}

// S4 Listening + Speaking (4) — A3.3.S4.2 = E3, A3.3.S4.4 = E4
const s4 = d.seccion_3_actividades_aprendizaje.subseccion_3_3_apropiacion_s2_a_s5.sesion_4_listening_speaking.actividades_principales;
for (const a of s4) {
  if (a.actividad_id === 'A3.3.S4.2') {
    row(a.actividad_id, a.titulo_es, 'S4',
      'E3 — Listening: Auditory Anchor (Desempeño · 5 pts)',
      criterios_E3(),
      'Técnica: Observación · Instrumento: Lista de Chequeo No 3 (PM-4.1)');
  } else if (a.actividad_id === 'A3.3.S4.4') {
    row(a.actividad_id, a.titulo_es, 'S4',
      'E4 — Speaking: Briefing simulado (Desempeño · 5 pts)',
      criterios_E4(),
      'Técnica: Observación · Instrumento: Escala de Estimación No 4 (PM-4.1)');
  } else row(a.actividad_id, a.titulo_es, 'S4');
}

// S5 Language Functions (4) — A3.3.S5.3 = E5
const s5 = d.seccion_3_actividades_aprendizaje.subseccion_3_3_apropiacion_s2_a_s5.sesion_5_language_functions.actividades_principales;
for (const a of s5) {
  if (a.actividad_id === 'A3.3.S5.3') {
    row(a.actividad_id, a.titulo_es, 'S5',
      'E5 — Language Functions: Role Carousel (Desempeño · 5 pts)',
      criterios_E5(),
      'Técnica: Observación · Instrumento: Escala de Estimación No 5 (PM-4.1)');
  } else row(a.actividad_id, a.titulo_es, 'S5');
}

// S6 Evaluación (4) — A3.3b.2 = E6
const s6 = d.seccion_3_actividades_aprendizaje.subseccion_3_3b_evaluacion_consolidacion_s6.actividades;
for (const a of s6) {
  if (a.actividad_id === 'A3.3b.2') {
    row(a.actividad_id, a.titulo_es, 'S6',
      'E6 — Cuestionario Técnico Consolidado (Conocimiento · 25 pts)',
      criterios_E6(),
      'Técnica: Formulación de preguntas · Instrumento: Cuestionario consolidado No 6 (PM-4.2)');
  } else row(a.actividad_id, a.titulo_es, 'S6');
}

// S7-S8 Transferencia (5) — sin evidencias formales
const s78 = d.seccion_3_actividades_aprendizaje.subseccion_3_4_transferencia_s7_s8.actividades;
for (const a of s78) row(a.actividad_id, a.titulo_es, 'S7-S8');

// Sanity: we expect 30 rows total
if (filas.length !== 30) {
  console.error(`❌ Expected 30 rows, got ${filas.length}`);
  process.exit(1);
}

// Replace seccion_4_planteamiento_evidencias with the new SENA schema
d.seccion_4_planteamiento_evidencias = {
  titulo_formal: '4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO',
  titulo_aprendiz: '4. Planteamiento de Evidencias de Aprendizaje',
  introduccion: 'Esta tabla reúne las 30 actividades de aprendizaje de la guía en orden cronológico. De estas, 6 actividades generan evidencias formales (E1–E6, 55 pts canon). Las columnas 1 (Fase del proyecto formativo) y 2 (Actividad del proyecto formativo) son de diligenciamiento manual por el coordinador del proyecto formativo; dependen del contexto del programa. Las columnas 4, 5 y 6 solo se llenan cuando la actividad tiene una evidencia formal asociada; en las demás filas aparece "—".',
  columnas: [
    'Fase del proyecto formativo',
    'Actividad del proyecto formativo',
    'Actividad de aprendizaje',
    'Evidencias de Aprendizaje',
    'Criterios de evaluación',
    'Técnicas e instrumentos de evaluación'
  ],
  filas_evidencia: filas,
  total_actividades: filas.length,
  total_evidencias_formales: filas.filter(f => f.evidencia).length,
  canon_reference: {
    e1_a_e5_pts: 25,
    e6_pts: 25,
    misión_final_pts: 5,
    total_canon: 55,
    misión_final_nota: 'La Misión Final (Sesión 7-8) NO es evidencia formal del RAP. Es demostración de transferencia integrada. Sus 5 pts no suman al canon de 55 (se evalúan con rúbrica separada).'
  },
  derived_from: {
    pm_2_4_upstream: 'pm-2-4.json · universe_anchor.genre → Design Decision Email',
    pm_4_1_instruments: 'pm-4-1.json · instrument_1..5 criterios (no alucinación)',
    pm_4_2_cuestionario: 'pm-4-2.json · canon_structure.sections_list',
    pm_3_6_activities: 'pm-3-6.json · seccion_3 actividades IDs + títulos'
  }
};

// Update trazabilidad
d._ciclo_2_5_patch = d._ciclo_2_5_patch || {};
d._ciclo_2_5_patch.v264 = {
  applied_date: new Date().toISOString().split('T')[0],
  changes: [
    'E2 drift fix: S3 title + A3.3.S3.2 + A3.3.S3.3 + A3.3.S3.4 renamed from "Font Card" to "Design Decision Email" (canon upstream pm-2-4.json)',
    'seccion_4_planteamiento_evidencias reescrita al formato SENA: tabla 6 cols × 30 filas',
    'Criterios de evaluación col 5 derivados de pm-4-1.json + pm-4-2.json (no alucinación)'
  ],
  backward_compat: 'Campos anteriores (evidencias[], evidencia_complementaria_no_formal, tabla_resumen_canon_55) removidos de seccion_4_planteamiento_evidencias'
};

// Write back
fs.writeFileSync(PM36_PATH, JSON.stringify(d, null, 2) + '\n', 'utf8');
console.log(`✅ pm-3-6.json updated:`);
console.log(`   - E2 drift: S3 title + 3 activities renamed to Design Decision Email`);
console.log(`   - Sección 4: ${filas.length} filas (${filas.filter(f => f.evidencia).length} con evidencia formal)`);
console.log(`   - Canon 55 pts: E1-E5=${25} + E6=${25} + Misión Final=${5}`);
