#!/usr/bin/env node
/**
 * check-activity-card-schema.js
 *
 * Valida que pm-3-6.json esté conforme al canon v2.6.3:
 *
 *   A. Schema por actividad (30 activities)
 *      A.1  Campos obligatorios presentes:
 *            actividad_id, titulo_en, titulo_es, tipo_actividad_sena,
 *            tiempo_min, agrupacion, voc_dimension, descripcion_aprendiz,
 *            paso_a_paso, scaffold_inline, entregable, activity_footer
 *      A.2  descripcion_aprendiz tiene {en, es} no vacíos
 *      A.3  paso_a_paso es array de 3–8 entradas, cada una con {en, es}
 *      A.4  scaffold_inline.tipo ∈ {matching, checklist, form, t_chart,
 *           writing_template, listening_capture, quiz_preview, speaking_script,
 *           reflection_lines, rating}
 *      A.5  scaffold_inline.estructura coincide con el shape del tipo
 *      A.6  entregable.{producto, formato, criterio_minimo}.{en, es} no vacíos
 *      A.7  tipo_actividad_sena ∈ {Actividad cognitiva, Actividad procedimental,
 *           Actividad actitudinal} (o combinación con " + " separador)
 *
 *   B. Campos obsoletos — deben estar ausentes
 *      B.1  nombre_aprendiz, etiquetas_dimension, instruccion_2pers_en,
 *           instruccion_supervivencia_es
 *
 *   C. Evidencias formales (6 actividades)
 *      C.1  Las 6 actividades E1–E6 mantienen produce_evidencia=true
 *      C.2  Las 6 tienen scaffold_inline.badge que referencia PM-4.1 o PM-4.2
 *      C.3  Las 6 tienen activity_footer.evidencia con {codigo, nombre,
 *           tipo_sena, tecnica_evaluacion, instrumento}
 *
 *   D. Meta
 *      D.1  pm36.meta.activities_schema_version === 'v2.6.3'
 *      D.2  30 actividades totales (sin duplicados de actividad_id)
 *
 * Exit codes:
 *   0  PASS — schema clean
 *   1  FAIL — al menos una actividad viola el canon
 *   2  WARN — advertencias (badge faltante, lineas fuera de rango, etc.)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const PM36_PATH = path.join(ROOT, 'pm-3-6.json');

const SCAFFOLD_TYPES = new Set([
  'matching', 'checklist', 'form', 't_chart', 'writing_template',
  'listening_capture', 'quiz_preview', 'speaking_script',
  'reflection_lines', 'rating'
]);

const TIPO_SENA = new Set([
  'Actividad cognitiva',
  'Actividad procedimental',
  'Actividad actitudinal'
]);

const REQUIRED_FIELDS = [
  'actividad_id', 'titulo_en', 'titulo_es', 'tipo_actividad_sena',
  'tiempo_min', 'agrupacion', 'voc_dimension', 'descripcion_aprendiz',
  'paso_a_paso', 'scaffold_inline', 'entregable', 'activity_footer'
];

const OBSOLETE_FIELDS = [
  'nombre_aprendiz', 'etiquetas_dimension',
  'instruccion_2pers_en', 'instruccion_supervivencia_es'
];

const EVIDENCE_IDS = [
  'A3.3.S2.4', 'A3.3.S3.4', 'A3.3.S4.2',
  'A3.3.S4.4', 'A3.3.S5.3', 'A3.3b.2'
];

// ── Load ───────────────────────────────────────────────────────────────────

if (!fs.existsSync(PM36_PATH)) {
  console.error('✗ pm-3-6.json no encontrado');
  process.exit(1);
}
const pm36 = JSON.parse(fs.readFileSync(PM36_PATH, 'utf8'));

// Collect activities
const acts = [];
(function walk(o) {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) return o.forEach(walk);
  if (o.actividad_id || o.activity_id) acts.push(o);
  for (const k of Object.keys(o)) walk(o[k]);
})(pm36.seccion_3_actividades_aprendizaje);

// ── Accumulators ───────────────────────────────────────────────────────────

const errors = [];
const warnings = [];
const stats = { pass: 0, fail: 0, scaffold_types: {} };

function err(id, msg)  { errors.push(`${id}: ${msg}`); }
function warn(id, msg) { warnings.push(`${id}: ${msg}`); }

// ── D.1 / D.2 ──────────────────────────────────────────────────────────────

if (!pm36.meta || pm36.meta.activities_schema_version !== 'v2.6.3') {
  errors.push(`meta.activities_schema_version ≠ "v2.6.3" (got ${pm36.meta && pm36.meta.activities_schema_version})`);
}
if (acts.length !== 30) {
  errors.push(`Total activities = ${acts.length}, expected 30`);
}
const ids = acts.map(a => a.actividad_id || a.activity_id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) errors.push(`Duplicated actividad_id: ${[...new Set(dupes)].join(', ')}`);

// ── A + B + C per activity ─────────────────────────────────────────────────

function validateScaffoldStructure(id, sc) {
  const est = sc.estructura || {};
  switch (sc.tipo) {
    case 'matching':
      if (!Array.isArray(est.columnas) || !est.columnas.length) err(id, 'scaffold.matching: columnas[] vacío');
      else for (const [i, c] of est.columnas.entries()) {
        if (!c.header_en || !c.header_es) err(id, `scaffold.matching: columna[${i}] sin header_en/header_es`);
      }
      if (!est.filas && !Array.isArray(est.filas_prellenadas)) err(id, 'scaffold.matching: falta filas (N) o filas_prellenadas[]');
      break;
    case 'checklist':
      if (!Array.isArray(est.columnas_check) || !est.columnas_check.length) err(id, 'scaffold.checklist: columnas_check[] vacío');
      if (!Array.isArray(est.terminos) || !est.terminos.length) err(id, 'scaffold.checklist: terminos[] vacío');
      else for (const [i, t] of est.terminos.entries()) {
        if (!t.en || !t.es) err(id, `scaffold.checklist: terminos[${i}] sin en/es`);
      }
      break;
    case 'form':
      if (!Array.isArray(est.campos) || !est.campos.length) err(id, 'scaffold.form: campos[] vacío');
      else for (const [i, f] of est.campos.entries()) {
        if (!f.label_en || !f.label_es) err(id, `scaffold.form: campos[${i}] sin label_en/label_es`);
        if (f.lines != null && (f.lines < 1 || f.lines > 10)) warn(id, `scaffold.form: campos[${i}].lines=${f.lines} fuera de [1,10]`);
      }
      break;
    case 't_chart':
      if (!est.columna_a || !est.columna_b) err(id, 'scaffold.t_chart: columna_a y columna_b requeridas');
      if (!est.filas || est.filas < 2 || est.filas > 12) warn(id, `scaffold.t_chart: filas=${est.filas} recomendado 2–12`);
      break;
    case 'writing_template':
      if (!Array.isArray(est.lineas_gap) || !est.lineas_gap.length) err(id, 'scaffold.writing_template: lineas_gap[] vacío');
      else for (const [i, l] of est.lineas_gap.entries()) {
        if (!l.prompt_en || !l.prompt_es) err(id, `scaffold.writing_template: lineas_gap[${i}] sin prompt_en/prompt_es`);
      }
      break;
    case 'listening_capture':
      if (!Array.isArray(est.secciones) || !est.secciones.length) err(id, 'scaffold.listening_capture: secciones[] vacío');
      else for (const [i, s] of est.secciones.entries()) {
        if (!s.header_en || !s.header_es) err(id, `scaffold.listening_capture: secciones[${i}] sin header_en/header_es`);
        if (!['boxes', 'gap'].includes(s.tipo)) err(id, `scaffold.listening_capture: secciones[${i}].tipo debe ser boxes|gap (got ${s.tipo})`);
      }
      break;
    case 'quiz_preview':
      if (!Array.isArray(est.items) || !est.items.length) err(id, 'scaffold.quiz_preview: items[] vacío');
      else for (const [i, it] of est.items.entries()) {
        if (!it.q_en || !it.q_es) err(id, `scaffold.quiz_preview: items[${i}] sin q_en/q_es`);
        if (!Array.isArray(it.opts) || it.opts.length < 2) err(id, `scaffold.quiz_preview: items[${i}].opts[] debe tener ≥ 2 opciones`);
      }
      break;
    case 'speaking_script':
      if (!Array.isArray(est.turnos) || !est.turnos.length) err(id, 'scaffold.speaking_script: turnos[] vacío');
      else for (const [i, t] of est.turnos.entries()) {
        if (!t.rol) err(id, `scaffold.speaking_script: turnos[${i}] sin rol`);
        if (!t.prompt_en || !t.prompt_es) err(id, `scaffold.speaking_script: turnos[${i}] sin prompt_en/prompt_es`);
      }
      break;
    case 'reflection_lines':
      if (!est.prompt_en || !est.prompt_es) err(id, 'scaffold.reflection_lines: prompt_en/prompt_es requeridos');
      if (!est.lines || est.lines < 2) warn(id, `scaffold.reflection_lines: lines=${est.lines} recomendado ≥ 2`);
      break;
    case 'rating':
      if (!Array.isArray(est.items) || !est.items.length) err(id, 'scaffold.rating: items[] vacío');
      else for (const [i, it] of est.items.entries()) {
        if (!it.prompt_en || !it.prompt_es) err(id, `scaffold.rating: items[${i}] sin prompt_en/prompt_es`);
        if (it.escala !== 'emoji') warn(id, `scaffold.rating: items[${i}].escala="${it.escala}" solo "emoji" soportado`);
      }
      break;
    default:
      err(id, `scaffold.tipo="${sc.tipo}" no reconocido`);
  }
}

for (const a of acts) {
  const id = a.actividad_id || a.activity_id || '(sin id)';
  let activityClean = true;

  // A.1 — required fields
  for (const f of REQUIRED_FIELDS) {
    if (!(f in a)) { err(id, `falta ${f}`); activityClean = false; }
  }
  // B.1 — obsolete fields
  for (const f of OBSOLETE_FIELDS) {
    if (f in a) { err(id, `campo obsoleto presente: ${f}`); activityClean = false; }
  }

  // A.7 — tipo_actividad_sena
  if (a.tipo_actividad_sena) {
    const parts = String(a.tipo_actividad_sena).split(/\s*\+\s*/);
    for (const p of parts) if (!TIPO_SENA.has(p)) {
      err(id, `tipo_actividad_sena inválido: "${p}"`);
      activityClean = false;
    }
  }

  // A.2 — descripcion_aprendiz
  if (a.descripcion_aprendiz) {
    if (!a.descripcion_aprendiz.en || !a.descripcion_aprendiz.es) {
      err(id, 'descripcion_aprendiz.{en, es} incompleto');
      activityClean = false;
    }
  }

  // A.3 — paso_a_paso
  if (Array.isArray(a.paso_a_paso)) {
    if (a.paso_a_paso.length < 3) { err(id, `paso_a_paso con ${a.paso_a_paso.length} pasos (<3)`); activityClean = false; }
    if (a.paso_a_paso.length > 8) { err(id, `paso_a_paso con ${a.paso_a_paso.length} pasos (>8)`); activityClean = false; }
    for (const [i, p] of a.paso_a_paso.entries()) {
      if (!p || typeof p !== 'object' || !p.en || !p.es) {
        err(id, `paso_a_paso[${i}] sin {en, es}`);
        activityClean = false;
      }
    }
  }

  // A.4 + A.5 — scaffold_inline
  if (a.scaffold_inline) {
    if (!a.scaffold_inline.tipo) {
      err(id, 'scaffold_inline.tipo ausente');
      activityClean = false;
    } else if (!SCAFFOLD_TYPES.has(a.scaffold_inline.tipo)) {
      err(id, `scaffold_inline.tipo "${a.scaffold_inline.tipo}" no es canónico`);
      activityClean = false;
    } else {
      stats.scaffold_types[a.scaffold_inline.tipo] = (stats.scaffold_types[a.scaffold_inline.tipo] || 0) + 1;
      validateScaffoldStructure(id, a.scaffold_inline);
    }
    if (!a.scaffold_inline.titulo_en) warn(id, 'scaffold_inline.titulo_en ausente');
    if (!a.scaffold_inline.titulo_es) warn(id, 'scaffold_inline.titulo_es ausente');
  }

  // A.6 — entregable
  if (a.entregable) {
    for (const k of ['producto', 'formato', 'criterio_minimo']) {
      const v = a.entregable[k];
      if (!v || !v.en || !v.es) {
        err(id, `entregable.${k}.{en, es} incompleto`);
        activityClean = false;
      }
    }
  }

  if (activityClean) stats.pass++; else stats.fail++;
}

// C — Evidencias formales
for (const id of EVIDENCE_IDS) {
  const a = acts.find(x => (x.actividad_id || x.activity_id) === id);
  if (!a) { errors.push(`[EVIDENCE] Actividad ${id} no encontrada`); continue; }
  if (a.produce_evidencia !== true) err(id, 'C.1 produce_evidencia ≠ true');
  if (!a.scaffold_inline || !a.scaffold_inline.badge) err(id, 'C.2 scaffold_inline.badge ausente');
  else if (!/PM-4\.(1|2)/.test(a.scaffold_inline.badge)) warn(id, `C.2 badge sin referencia PM-4.x: "${a.scaffold_inline.badge}"`);
  const ev = a.activity_footer && a.activity_footer.evidencia;
  if (!ev) err(id, 'C.3 activity_footer.evidencia ausente');
  else {
    for (const f of ['codigo', 'nombre', 'tipo_sena', 'tecnica_evaluacion', 'instrumento']) {
      if (!ev[f]) err(id, `C.3 activity_footer.evidencia.${f} ausente`);
    }
  }
}

// ── Report ─────────────────────────────────────────────────────────────────

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  check-activity-card-schema.js — canon v2.6.3');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log(`Total activities:   ${acts.length}`);
console.log(`Schema clean:       ${stats.pass} / ${acts.length}`);
console.log(`Schema with error:  ${stats.fail}`);
console.log('');
console.log('Scaffold type distribution:');
for (const [t, n] of Object.entries(stats.scaffold_types).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(22)} ${n}`);
}

if (errors.length) {
  console.log('');
  console.log(`✗ ERRORS (${errors.length}):`);
  errors.slice(0, 40).forEach(e => console.log('   -', e));
  if (errors.length > 40) console.log(`   … y ${errors.length - 40} más`);
}
if (warnings.length) {
  console.log('');
  console.log(`⚠ WARNINGS (${warnings.length}):`);
  warnings.slice(0, 20).forEach(w => console.log('   -', w));
  if (warnings.length > 20) console.log(`   … y ${warnings.length - 20} más`);
}

console.log('');
if (errors.length) {
  console.log('✗ FAIL — corregir errores antes de regenerar DOCX');
  process.exit(1);
} else if (warnings.length) {
  console.log('⚠ PASS con advertencias — OK para generar DOCX');
  process.exit(2);
} else {
  console.log('✓ PASS — 30/30 actividades conformes al canon v2.6.3');
  process.exit(0);
}
