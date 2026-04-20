#!/usr/bin/env node
/**
 * enrich_activity_footers.js — MGV G1
 * Adds `activity_footer` to every activity in pm-3-5.json and pm-3-6.json.
 *
 * Footer schema (6 fields, renderable as a single compact italic grey line):
 *   {
 *     ambiente,              // Ej: "Ambiente convencional (aula)"
 *     estrategia,            // Ej: "Aprendizaje colaborativo"
 *     tecnica,               // Ej: "Mesa redonda"
 *     materiales,            // Ej: "Papel bond, lapiceros"
 *     material_apoyo,        // URL o "no aplica"
 *     duracion_horas         // Ej: "2 horas"
 *   }
 */

const fs = require('fs');
const path = require('path');
const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/MGV-2026-04-20';

const mmToH = (m) => {
  const h = m / 60;
  if (Math.abs(h - Math.round(h)) < 0.05) return `${Math.round(h)} horas`;
  return `${h.toFixed(2)} horas`;
};

// =====================================================================
// PM-3.5 — 5 sub-fases ABP
// =====================================================================
const FOOTER_PM35 = {
  subfase_1_plan: {
    ambiente: 'Ambiente convencional (aula con mesas agrupadas)',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP)',
    tecnica: 'Planeación estratégica con matriz',
    materiales: 'Mission Brief impreso, Planning Canvas (Apéndice F), lapiceros, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '1.75 horas',
  },
  subfase_2_design: {
    ambiente: 'Laboratorio TIC con acceso a internet',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP) + Búsqueda documental',
    tecnica: 'Curación visual y selección de referencias',
    materiales: 'Computador por aprendiz, carpeta digital personal, auriculares',
    material_apoyo: 'https://unsplash.com · https://pinterest.com · https://behance.net',
    duracion_horas: '1.58 horas',
  },
  subfase_3_perform: {
    ambiente: 'Ambiente convencional tipo taller (aula con mesas amplias)',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP)',
    tecnica: 'Taller práctico de construcción (físico o digital)',
    materiales: 'Cartulina A3, tijeras, pegamento, impresiones de referencias, marcadores; O computador con Canva',
    material_apoyo: 'https://canva.com (opcional modalidad digital)',
    duracion_horas: '1 hora',
  },
  subfase_4_present: {
    ambiente: 'Ambiente convencional con tablero/pantalla y cronómetro visible',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP)',
    tecnica: 'Presentación oral simulada (pitch profesional 2 minutos)',
    materiales: 'Mood board producido, cronómetro, hoja observación para Sophia-instructor',
    material_apoyo: 'no aplica',
    duracion_horas: '1.58 horas',
  },
  subfase_5_assess: {
    ambiente: 'Ambiente convencional (aula en silencio reflexivo)',
    estrategia: 'Aprendizaje reflexivo (autoevaluación + coevaluación)',
    tecnica: 'Ficha de autoevaluación + Design Star peer award',
    materiales: 'Ficha Self-Reflection (Apéndice G), Design Star card, bolígrafo',
    material_apoyo: 'no aplica',
    duracion_horas: '1 hora',
  },
};

// =====================================================================
// PM-3.6 — 30 actividades
// =====================================================================
const FOOTER_PM36 = {
  // 3.1 Reflexión Inicial
  'A3.1.1': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Tareas (ABT)',
    tecnica: 'Image walk / galería visual',
    materiales: 'Imágenes impresas (6 diseños), post-its de colores, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '0.5 horas',
  },
  'A3.1.2': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Evaluación diagnóstica',
    tecnica: 'Cuestionario de pre-diagnóstico escrito',
    materiales: 'Hoja de pre-diagnóstico (20 palabras), lapicero',
    material_apoyo: 'no aplica',
    duracion_horas: '0.42 horas',
  },
  // 3.2 Contextualización
  'A3.2.1': {
    ambiente: 'Ambiente convencional (aula con mapa de estudio)',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP) - Simulación profesional',
    tecnica: 'Tour guiado narrativo (Studio Tour)',
    materiales: 'Mapa impreso Pixel & Ink Studio, post-its, fichas personajes',
    material_apoyo: 'no aplica',
    duracion_horas: '0.75 horas',
  },
  'A3.2.2': {
    ambiente: 'Ambiente convencional (aula con mesas agrupadas)',
    estrategia: 'Aprendizaje colaborativo',
    tecnica: 'Carrusel de roles',
    materiales: '5 role cards (personajes), papelotes, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '0.83 horas',
  },
  'A3.2.3': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Problemas',
    tecnica: 'Discusión guiada puente a sesión 2',
    materiales: 'Pizarrón, marcadores, lista 20 términos',
    material_apoyo: 'no aplica',
    duracion_horas: '0.83 horas',
  },
  // 3.3 Apropiación S2
  'A3.3.S2.1': {
    ambiente: 'Ambiente convencional (aula con pared disponible para Word Wall)',
    estrategia: 'Aprendizaje colaborativo',
    tecnica: 'Construcción de Word Wall en grupos',
    materiales: '20 tarjetas físicas Toolbelt, cinta adhesiva, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '1.67 horas',
  },
  'A3.3.S2.2': {
    ambiente: 'Ambiente convencional (aula con mesas agrupadas 4 personas)',
    estrategia: 'Aprendizaje colaborativo',
    tecnica: 'Jigsaw reading',
    materiales: 'Master Anchor Text impreso (Apéndice A), highlighters, hoja de preguntas',
    material_apoyo: 'no aplica',
    duracion_horas: '1.67 horas',
  },
  'A3.3.S2.3': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Tareas (ABT)',
    tecnica: 'Práctica controlada de clasificación',
    materiales: 'Hoja de drill con imágenes de fuentes reales, lapicero',
    material_apoyo: 'https://fonts.google.com (referencia de fuentes reales)',
    duracion_horas: '1.25 horas',
  },
  'A3.3.S2.4': {
    ambiente: 'Ambiente convencional (aula en silencio)',
    estrategia: 'Evaluación formativa',
    tecnica: 'Cuestionario cerrado — Lista de Chequeo No 1',
    materiales: 'Quiz impreso (10 ítems), lapicero',
    material_apoyo: 'no aplica',
    duracion_horas: '0.42 horas',
  },
  // 3.3 Apropiación S3
  'A3.3.S3.1': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Problemas',
    tecnica: 'Consciousness-raising gramatical',
    materiales: 'Fichas de grammar inductivo (Gr 1/Gr 4), pizarrón, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '1.75 horas',
  },
  'A3.3.S3.2': {
    ambiente: 'Ambiente convencional (aula con pizarrón grande)',
    estrategia: 'Aprendizaje por modelado',
    tecnica: 'Demostración guiada (Andrés sample card)',
    materiales: 'Sample Font Card Andrés (Apéndice B), pizarrón, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '0.83 horas',
  },
  'A3.3.S3.3': {
    ambiente: 'Ambiente convencional (aula en silencio de producción)',
    estrategia: 'Aprendizaje Basado en Tareas (ABT)',
    tecnica: 'Producción escrita individual',
    materiales: 'Template font card impreso, lapicero, regla, borrador',
    material_apoyo: 'no aplica',
    duracion_horas: '2.17 horas',
  },
  'A3.3.S3.4': {
    ambiente: 'Ambiente convencional (aula con mesas en pares)',
    estrategia: 'Aprendizaje colaborativo + Evaluación formativa',
    tecnica: 'Peer review con checklist estructurada',
    materiales: 'Checklist peer review impresa, font cards producidos en S3.3, lapicero',
    material_apoyo: 'no aplica',
    duracion_horas: '1.25 horas',
  },
  // 3.3 Apropiación S4
  'A3.3.S4.1': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Tareas (ABT)',
    tecnica: 'Activación léxica con soporte visual',
    materiales: 'Color wheel impreso, marcadores de colores, swatches de papel',
    material_apoyo: 'https://color.adobe.com (solo demostración, opcional)',
    duracion_horas: '1 hora',
  },
  'A3.3.S4.2': {
    ambiente: 'Ambiente convencional (aula con audio/parlantes)',
    estrategia: 'Evaluación formativa',
    tecnica: 'Listening comprensivo — Lista de Chequeo No 3',
    materiales: 'Archivo audio Sophia-Laura (Apéndice C), parlantes, hoja de respuestas (10 ítems), lapicero',
    material_apoyo: 'no aplica',
    duracion_horas: '1.25 horas',
  },
  'A3.3.S4.3': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Tareas (ABT)',
    tecnica: 'Drilling fonético (stress marking + mirror technique)',
    materiales: 'Tarjetas de 4 palabras target, mini-espejo (opcional), hoja de auto-marca',
    material_apoyo: 'no aplica',
    duracion_horas: '1.17 horas',
  },
  'A3.3.S4.4': {
    ambiente: 'Ambiente convencional (aula con disposición para roleplay en pares)',
    estrategia: 'Evaluación formativa + Simulación profesional',
    tecnica: 'Roleplay en pares (Junior Designer ↔ Sophia)',
    materiales: 'Mood board de referencia, checklist observación, cronómetro',
    material_apoyo: 'no aplica',
    duracion_horas: '1.5 horas',
  },
  // 3.3 Apropiación S5
  'A3.3.S5.1': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Problemas',
    tecnica: 'Consciousness-raising de conectores (and/but)',
    materiales: 'Hoja de conectores con ejemplos auténticos, pizarrón, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '1 hora',
  },
  'A3.3.S5.2': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje Basado en Tareas (ABT)',
    tecnica: 'Drill funcional (5 funciones F1-F5)',
    materiales: 'Hojas F1-F5 con chunks, lapicero, tarjetas de función',
    material_apoyo: 'no aplica',
    duracion_horas: '1.67 horas',
  },
  'A3.3.S5.3': {
    ambiente: 'Ambiente convencional con 5 estaciones rotativas',
    estrategia: 'Evaluación formativa + Simulación profesional',
    tecnica: 'Carrusel de estaciones (5 × 90 segundos)',
    materiales: '5 estaciones temáticas (F1-F5) con prompts, cronómetro, hoja de observación',
    material_apoyo: 'no aplica',
    duracion_horas: '2.17 horas',
  },
  'A3.3.S5.4': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Aprendizaje reflexivo',
    tecnica: 'Diario de cierre guiado',
    materiales: 'Hoja de reflexión con prompts A1.1, lapicero',
    material_apoyo: 'no aplica',
    duracion_horas: '1.17 horas',
  },
  // 3.3.b Consolidación S6
  'A3.3b.1': {
    ambiente: 'Ambiente convencional (aula)',
    estrategia: 'Evaluación formativa',
    tecnica: 'Portfolio review individual con self-check',
    materiales: '5 evidencias previas E1-E5 del aprendiz, hoja self-check, lapicero',
    material_apoyo: 'no aplica',
    duracion_horas: '1.5 horas',
  },
  'A3.3b.2': {
    ambiente: 'Ambiente convencional (aula en silencio estricto)',
    estrategia: 'Evaluación formativa',
    tecnica: 'Cuestionario cerrado consolidado',
    materiales: 'Cuestionario 25 ítems impreso (5 secciones × 5), lapicero, reloj',
    material_apoyo: 'no aplica',
    duracion_horas: '1.5 horas',
  },
  'A3.3b.3': {
    ambiente: 'Ambiente convencional (aula con mesas agrupadas)',
    estrategia: 'Aprendizaje reflexivo + colaborativo',
    tecnica: 'Coevaluación guiada',
    materiales: 'Hoja co-evaluación, post-its, marcadores',
    material_apoyo: 'no aplica',
    duracion_horas: '1.5 horas',
  },
  'A3.3b.4': {
    ambiente: 'Ambiente convencional (aula con videobeam)',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP) - Activación',
    tecnica: 'Briefing profesional (Mission Brief)',
    materiales: 'Mission Brief impreso (Apéndice E), videobeam, fragmento ejemplo mood board',
    material_apoyo: 'no aplica',
    duracion_horas: '1.5 horas',
  },
  // 3.4 Transferencia S7-S8
  'A3.4.1': {
    ambiente: 'Ambiente convencional (aula con mesas agrupadas)',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP)',
    tecnica: 'Planeación estratégica con matriz',
    materiales: 'Mission Brief (Apéndice E), Planning Canvas (Apéndice F), lapicero, marcador',
    material_apoyo: 'no aplica',
    duracion_horas: '1.75 horas',
  },
  'A3.4.2': {
    ambiente: 'Laboratorio TIC con acceso a internet',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP) + Búsqueda documental',
    tecnica: 'Curación visual y selección de referencias',
    materiales: 'Computador por aprendiz, carpeta digital personal, auriculares',
    material_apoyo: 'https://unsplash.com · https://pinterest.com · https://behance.net',
    duracion_horas: '1.58 horas',
  },
  'A3.4.3': {
    ambiente: 'Ambiente convencional tipo taller (aula con mesas amplias)',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP)',
    tecnica: 'Taller práctico de construcción',
    materiales: 'Cartulina A3, tijeras, pegamento, impresiones de referencias, marcadores; o computador con Canva',
    material_apoyo: 'https://canva.com (opcional modalidad digital)',
    duracion_horas: '1 hora',
  },
  'A3.4.4': {
    ambiente: 'Ambiente convencional con tablero/pantalla y cronómetro visible',
    estrategia: 'Aprendizaje Basado en Proyectos (ABP)',
    tecnica: 'Pitch oral simulado (2 minutos)',
    materiales: 'Mood board producido, cronómetro, hoja observación Sophia-instructor',
    material_apoyo: 'no aplica',
    duracion_horas: '1.58 horas',
  },
  'A3.4.5': {
    ambiente: 'Ambiente convencional (aula en silencio reflexivo)',
    estrategia: 'Aprendizaje reflexivo',
    tecnica: 'Ficha de autoevaluación + Design Star peer award',
    materiales: 'Ficha Self-Reflection (Apéndice G), Design Star card, bolígrafo',
    material_apoyo: 'no aplica',
    duracion_horas: '1 hora',
  },
};

// =====================================================================
// MAIN
// =====================================================================
function enrichPM35() {
  const p = path.join(RUN_DIR, 'pm-3-5.json');
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  let count = 0;
  for (const [key, footer] of Object.entries(FOOTER_PM35)) {
    if (d.abp_5_subfases[key]) {
      d.abp_5_subfases[key].activity_footer = footer;
      count++;
    }
  }
  fs.writeFileSync(p, JSON.stringify(d, null, 2));
  console.log(`[pm-3-5] enriched ${count} sub-fases with activity_footer`);
  return count;
}

function enrichPM36() {
  const p = path.join(RUN_DIR, 'pm-3-6.json');
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const sec3 = d.seccion_3_actividades_aprendizaje;
  let count = 0, missed = [];

  const applyFooter = (act) => {
    const id = act.actividad_id;
    if (!id) return;
    if (FOOTER_PM36[id]) {
      act.activity_footer = FOOTER_PM36[id];
      count++;
    } else {
      missed.push(id);
    }
  };

  for (const a of sec3.subseccion_3_1_reflexion_inicial_s1.actividades) applyFooter(a);
  for (const a of sec3.subseccion_3_2_contextualizacion_s1.actividades) applyFooter(a);
  const s33 = sec3.subseccion_3_3_apropiacion_s2_a_s5;
  for (const sk of ['sesion_2_reading_vocabulary','sesion_3_writing_grammar','sesion_4_listening_speaking','sesion_5_language_functions']) {
    for (const a of s33[sk].actividades_principales) applyFooter(a);
  }
  for (const a of sec3.subseccion_3_3b_evaluacion_consolidacion_s6.actividades) applyFooter(a);
  for (const a of sec3.subseccion_3_4_transferencia_s7_s8.actividades) applyFooter(a);

  fs.writeFileSync(p, JSON.stringify(d, null, 2));
  console.log(`[pm-3-6] enriched ${count} activities with activity_footer`);
  if (missed.length) console.log(`[pm-3-6] MISSED ids: ${missed.join(', ')}`);
  return count;
}

const c1 = enrichPM35();
const c2 = enrichPM36();
console.log(`[done] total activities enriched: ${c1 + c2}`);
