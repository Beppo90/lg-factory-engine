/**
 * rewrite_activities_v263.js
 *
 * Aplica las specs v2.6.3 (v263-activities-data.js) a pm-3-6.json.
 *
 * Para cada actividad coincidente por actividad_id:
 *   - Escribe: titulo_en, titulo_es, tipo_actividad_sena, voc_dimension,
 *              descripcion_aprendiz, paso_a_paso, scaffold_inline, entregable
 *   - Actualiza (si la spec trae valor): tiempo_min, agrupacion
 *   - Preserva: actividad_id, produce_evidencia, materiales, activity_footer
 *   - Elimina campos v2.6.1/v2.6.2 reemplazados:
 *       nombre_aprendiz, etiquetas_dimension,
 *       instruccion_2pers_en, instruccion_supervivencia_es
 *
 * Uso:  node scripts/rewrite_activities_v263.js
 * Salida: pm-3-6.json actualizado in-place + reporte en consola.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT          = path.join(__dirname, '..');
const PM36_PATH     = path.join(ROOT, 'pm-3-6.json');
const BACKUP_PATH   = path.join(ROOT, 'pm-3-6.backup-pre-v263.json');
const SPECS         = require('./v263-activities-data.js');

// ────────────────────────────────────────────────────────────────────────────
// 1. Cargar y respaldar
// ────────────────────────────────────────────────────────────────────────────

if (!fs.existsSync(PM36_PATH)) {
  console.error('✗ pm-3-6.json no encontrado en', PM36_PATH);
  process.exit(1);
}

const original = fs.readFileSync(PM36_PATH, 'utf8');
const pm36     = JSON.parse(original);

if (!fs.existsSync(BACKUP_PATH)) {
  fs.writeFileSync(BACKUP_PATH, original, 'utf8');
  console.log('✓ Backup creado: pm-3-6.backup-pre-v263.json');
} else {
  console.log('• Backup pre-existente conservado.');
}

// ────────────────────────────────────────────────────────────────────────────
// 2. Indexar actividades del JSON por actividad_id
// ────────────────────────────────────────────────────────────────────────────

const indexed = new Map();   // id → referencia al objeto mutable

(function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach(walk);
  const id = node.actividad_id || node.activity_id;
  if (id) indexed.set(id, node);
  for (const k of Object.keys(node)) walk(node[k]);
})(pm36.seccion_3_actividades_aprendizaje);

console.log(`• Actividades indexadas en pm-3-6.json: ${indexed.size}`);
console.log(`• Specs v2.6.3 provistas:               ${SPECS.length}`);

// ────────────────────────────────────────────────────────────────────────────
// 3. Aplicar specs
// ────────────────────────────────────────────────────────────────────────────

const OLD_FIELDS = [
  'nombre_aprendiz',
  'etiquetas_dimension',
  'instruccion_2pers_en',
  'instruccion_supervivencia_es'
];

const NEW_FIELDS = [
  'titulo_en',
  'titulo_es',
  'tipo_actividad_sena',
  'voc_dimension',
  'descripcion_aprendiz',
  'paso_a_paso',
  'scaffold_inline',
  'entregable'
];

const stats = {
  applied:    [],
  missing:    [],
  skipped:    [],
  timeChanged:[],
  groupChanged:[]
};

for (const spec of SPECS) {
  const id   = spec.actividad_id;
  const node = indexed.get(id);

  if (!node) {
    stats.missing.push(id);
    continue;
  }

  // 3.a — Eliminar campos obsoletos
  for (const f of OLD_FIELDS) {
    if (f in node) delete node[f];
  }

  // 3.b — Escribir campos v2.6.3 (orden canónico)
  //       Reconstruimos el objeto preservando actividad_id al inicio
  //       y activity_footer al final.
  const rebuilt = {};
  rebuilt.actividad_id = id;

  // Identidad bilingüe
  rebuilt.titulo_en            = spec.titulo_en;
  rebuilt.titulo_es            = spec.titulo_es;
  rebuilt.tipo_actividad_sena  = spec.tipo_actividad_sena;

  // Logística (puede venir de la spec o conservarse del node)
  if (spec.tiempo_min !== undefined && spec.tiempo_min !== node.tiempo_min) {
    stats.timeChanged.push(`${id}: ${node.tiempo_min}→${spec.tiempo_min}`);
  }
  rebuilt.tiempo_min  = spec.tiempo_min  !== undefined ? spec.tiempo_min  : node.tiempo_min;

  if (spec.agrupacion !== undefined && spec.agrupacion !== node.agrupacion) {
    stats.groupChanged.push(`${id}: ${node.agrupacion}→${spec.agrupacion}`);
  }
  rebuilt.agrupacion  = spec.agrupacion  !== undefined ? spec.agrupacion  : node.agrupacion;

  rebuilt.voc_dimension = spec.voc_dimension || [];

  // Preservar flag de evidencia
  if ('produce_evidencia' in node) rebuilt.produce_evidencia = node.produce_evidencia;

  // Bloque aprendiz-facing
  rebuilt.descripcion_aprendiz = spec.descripcion_aprendiz;
  rebuilt.paso_a_paso          = spec.paso_a_paso;
  rebuilt.scaffold_inline      = spec.scaffold_inline;
  rebuilt.entregable           = spec.entregable;

  // Materiales (conservar)
  if ('materiales' in node) rebuilt.materiales = node.materiales;

  // Footer al final (inmutable, derivado por otro script)
  if ('activity_footer' in node) rebuilt.activity_footer = node.activity_footer;

  // Cualquier otro campo no clasificado: conservarlo al final (defensivo)
  for (const k of Object.keys(node)) {
    if (!(k in rebuilt)) rebuilt[k] = node[k];
  }

  // Reemplazar contenido del node in-place manteniendo referencia
  for (const k of Object.keys(node)) delete node[k];
  for (const k of Object.keys(rebuilt)) node[k] = rebuilt[k];

  stats.applied.push(id);
}

// Actividades que existen en pm-3-6 pero no tienen spec
for (const [id] of indexed) {
  if (!SPECS.find(s => s.actividad_id === id)) stats.skipped.push(id);
}

// ────────────────────────────────────────────────────────────────────────────
// 4. Validación mínima in-line
// ────────────────────────────────────────────────────────────────────────────

const validationErrors = [];
for (const spec of SPECS) {
  const id = spec.actividad_id;
  const n  = indexed.get(id);
  if (!n) continue;
  for (const f of NEW_FIELDS) {
    if (!(f in n)) validationErrors.push(`${id}: falta ${f}`);
  }
  if (n.paso_a_paso && !Array.isArray(n.paso_a_paso))        validationErrors.push(`${id}: paso_a_paso no es array`);
  if (n.paso_a_paso && n.paso_a_paso.length < 3)             validationErrors.push(`${id}: paso_a_paso < 3 pasos (${n.paso_a_paso.length})`);
  if (n.paso_a_paso && n.paso_a_paso.length > 8)             validationErrors.push(`${id}: paso_a_paso > 8 pasos (${n.paso_a_paso.length})`);
  if (n.scaffold_inline && !n.scaffold_inline.tipo)          validationErrors.push(`${id}: scaffold_inline.tipo ausente`);
  if (n.entregable) {
    for (const k of ['producto', 'formato', 'criterio_minimo']) {
      if (!n.entregable[k] || !n.entregable[k].en || !n.entregable[k].es) {
        validationErrors.push(`${id}: entregable.${k}.{en,es} incompleto`);
      }
    }
  }
  for (const f of OLD_FIELDS) {
    if (f in n) validationErrors.push(`${id}: campo obsoleto sobreviviente: ${f}`);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// 5. Actualizar metadata del documento
// ────────────────────────────────────────────────────────────────────────────

if (!pm36.meta) pm36.meta = {};
pm36.meta.activities_schema_version = 'v2.6.3';
pm36.meta.activities_rewritten_at   = new Date().toISOString();

// ────────────────────────────────────────────────────────────────────────────
// 6. Persistir
// ────────────────────────────────────────────────────────────────────────────

fs.writeFileSync(PM36_PATH, JSON.stringify(pm36, null, 2) + '\n', 'utf8');

// ────────────────────────────────────────────────────────────────────────────
// 7. Reporte
// ────────────────────────────────────────────────────────────────────────────

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  REPORTE — Rewrite v2.6.3 aplicado a pm-3-6.json');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log(`✓ Aplicadas: ${stats.applied.length} / ${SPECS.length}`);
if (stats.applied.length <= 10) console.log('  ', stats.applied.join(', '));
console.log('');

if (stats.missing.length) {
  console.log(`⚠ Specs sin match en pm-3-6 (${stats.missing.length}):`);
  console.log('  ', stats.missing.join(', '));
  console.log('');
}

if (stats.skipped.length) {
  console.log(`⚠ Actividades en pm-3-6 sin spec (${stats.skipped.length}):`);
  console.log('  ', stats.skipped.join(', '));
  console.log('');
}

if (stats.timeChanged.length) {
  console.log(`• tiempo_min ajustado en ${stats.timeChanged.length} actividades:`);
  stats.timeChanged.forEach(s => console.log('   -', s));
  console.log('');
}

if (stats.groupChanged.length) {
  console.log(`• agrupacion ajustada en ${stats.groupChanged.length} actividades:`);
  stats.groupChanged.forEach(s => console.log('   -', s));
  console.log('');
}

if (validationErrors.length) {
  console.log(`✗ Errores de validación in-line: ${validationErrors.length}`);
  validationErrors.slice(0, 20).forEach(e => console.log('   -', e));
  if (validationErrors.length > 20) console.log(`   … y ${validationErrors.length - 20} más`);
  process.exitCode = 2;
} else {
  console.log('✓ Validación in-line: 0 errores');
}

console.log('');
console.log(`✓ pm-3-6.json reescrito (schema: v2.6.3)`);
console.log(`  Backup: pm-3-6.backup-pre-v263.json`);
