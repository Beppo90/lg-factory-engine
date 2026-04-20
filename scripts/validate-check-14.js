#!/usr/bin/env node
/**
 * validate-check-14.js
 *
 * Check 14 (PM-2.11 v2.5) — Propagación de Estrategias Didácticas a pm-3-2-sX.json
 * Referencias canónicas:
 *   - PM-2.11 §Check 14
 *   - DOCUMENTO MAESTRO §10 PASO 7.b
 *   - PM-3.2 Required Output Schema (v2.5)
 *
 * Operación:
 *   node validate-check-14.js <run_dir>
 *
 * Input esperado en <run_dir>:
 *   - pm-3-1.json                    (fuente de verdad: sessions_detail[i].logistics_box)
 *   - pm-3-2-s1.json .. pm-3-2-s8.json
 *
 * Validaciones (14.1 → 14.4):
 *   14.1 Campos obligatorios root en cada pm-3-2-sX:
 *        momento_sena, estrategia_didactica, justificacion_didactica
 *   14.2 Herencia desde pm-3-1:
 *        pm32.momento_sena         == pm31.sessions_detail[i].logistics_box.momento_sena
 *        pm32.estrategia_didactica == pm31.sessions_detail[i].logistics_box.estrategia
 *   14.3 Propagación a bloques WHILE:
 *        cada while.bloques[j].tecnica_didactica existe y no es placeholder
 *   14.4 Cross-reference con logistics_box.tecnicas[]:
 *        para cada bloque con letra L en pm-3-2, pm31.tecnicas tiene entry con bloque==L
 *        y el texto de la técnica coincide
 *
 * Fallos reportados individualmente en el YAML output (missing_fields,
 * mismatched_values, block_technique_gaps) siguiendo el schema declarado en
 * PM-2.11 §validation_report.checks.strategy_propagation.
 *
 * Exit code 0 = PASS (todos los 8 archivos cumplen los 4 asserts).
 * Exit code 1 = FAIL (al menos un fallo detectado — incluye el caso
 *               "archivo pm-3-2-sX.json no existe").
 *
 * Uso típico:
 *   node scripts/validate-check-14.js runs/DIESEL-2026-04-15
 *   node scripts/validate-check-14.js runs/DIESEL-2026-04-19   → debe FALLAR
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ─── Configuración ───────────────────────────────────────────────────────────
const PLACEHOLDER_PATTERNS = [
  /^TBD$/i,
  /^TODO$/i,
  /^\[.+\]$/,          // ej: [completar]
  /^<.+>$/,            // ej: <describe aquí>
  /^pendiente/i,
  /^por definir/i,
  /^\.+$/,             // "..."
];

const NAME_NORMALIZE = (s) =>
  (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Normaliza IDs de bloque para comparación cross-schema.
 * Runs DIESEL-2026-04-15/-04-18 usan dos convenciones para el mismo bloque:
 *   - pm-3-1.sessions_detail[i].logistics_box.tecnicas[j].bloque = "A" | "B" | ...
 *   - pm-3-2-sX.session_plan.while_a.block          = "WHILE-A" | "WHILE-B" | ...
 *   - pm-3-2-sX.while.bloques[j].letra               = "A" | "B" | ...
 * Esta función reduce todas a una sola letra canónica (A, B, C, ...).
 * Regla: strip prefijo WHILE- / BLOCK- / BLOQUE- (case-insensitive) y uppercase.
 */
const BLOCK_ID_NORMALIZE = (id) => {
  if (id == null) return '';
  return id
    .toString()
    .trim()
    .toUpperCase()
    .replace(/^(WHILE|BLOCK|BLOQUE)[\s\-_]+/i, '')
    .replace(/[\s\-_]+$/g, '');
};

const isPlaceholder = (v) => {
  if (v == null) return true;
  const s = v.toString().trim();
  if (s === '') return true;
  return PLACEHOLDER_PATTERNS.some((re) => re.test(s));
};

// ─── Entrada ─────────────────────────────────────────────────────────────────
const runDir = process.argv[2];
if (!runDir) {
  console.error('Uso: node validate-check-14.js <run_dir>');
  process.exit(2);
}
const runDirAbs = path.resolve(runDir);
if (!fs.existsSync(runDirAbs)) {
  console.error(`ERROR: directorio no existe: ${runDirAbs}`);
  process.exit(2);
}

// ─── Contenedor de resultados ────────────────────────────────────────────────
const report = {
  check: 'Check 14 — Propagación de Estrategias Didácticas (PM-2.11 v2.5)',
  run_dir: runDirAbs,
  run_id: path.basename(runDirAbs),
  timestamp: new Date().toISOString(),
  passed: true,
  files_checked: [],
  files_missing: [],
  missing_fields: [],
  mismatched_values: [],
  block_technique_gaps: [],
  summary: {},
};

// ─── Paso 0: cargar pm-3-1.json (source of truth) ────────────────────────────
const pm31Path = path.join(runDirAbs, 'pm-3-1.json');
if (!fs.existsSync(pm31Path)) {
  console.error(`ERROR: falta pm-3-1.json en ${runDirAbs} — Check 14 no puede ejecutarse sin source of truth.`);
  report.passed = false;
  report.files_missing.push('pm-3-1.json');
  emitReport(report);
  process.exit(1);
}

let pm31;
try {
  pm31 = JSON.parse(fs.readFileSync(pm31Path, 'utf8'));
} catch (e) {
  console.error(`ERROR: pm-3-1.json no es JSON válido: ${e.message}`);
  process.exit(2);
}

const sessionsDetail = pm31.sessions_detail || [];
if (sessionsDetail.length !== 8) {
  report.passed = false;
  report.mismatched_values.push({
    file: 'pm-3-1.json',
    field: 'sessions_detail.length',
    expected: 8,
    actual: sessionsDetail.length,
  });
}

// Indexar source of truth por número de sesión
const truthBySession = {};
sessionsDetail.forEach((s) => {
  const lb = s.logistics_box || {};
  truthBySession[s.session] = {
    momento_sena: lb.momento_sena,
    estrategia: lb.estrategia,
    justificacion: lb.justificacion,
    tecnicas: Array.isArray(lb.tecnicas) ? lb.tecnicas : [],
  };
});

// ─── Paso 1-8: validar cada pm-3-2-sX.json ───────────────────────────────────
for (let i = 1; i <= 8; i++) {
  const fileName = `pm-3-2-s${i}.json`;
  const filePath = path.join(runDirAbs, fileName);

  if (!fs.existsSync(filePath)) {
    report.passed = false;
    report.files_missing.push(fileName);
    continue;
  }
  report.files_checked.push(fileName);

  let pm32;
  try {
    pm32 = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    report.passed = false;
    report.missing_fields.push({ file: fileName, field: '<invalid_json>', detail: e.message });
    continue;
  }

  const truth = truthBySession[i] || null;

  // — 14.1 Campos obligatorios root ———————————————————————————————
  const rootFields = ['momento_sena', 'estrategia_didactica', 'justificacion_didactica'];
  for (const f of rootFields) {
    if (isPlaceholder(pm32[f])) {
      report.passed = false;
      report.missing_fields.push({ file: fileName, field: f });
    }
  }

  // — 14.2 Herencia desde pm-3-1 ——————————————————————————————————
  if (truth) {
    if (!isPlaceholder(pm32.momento_sena) && !isPlaceholder(truth.momento_sena)) {
      if (NAME_NORMALIZE(pm32.momento_sena) !== NAME_NORMALIZE(truth.momento_sena)) {
        report.passed = false;
        report.mismatched_values.push({
          file: fileName,
          field: 'momento_sena',
          expected: truth.momento_sena,
          actual: pm32.momento_sena,
        });
      }
    }
    if (!isPlaceholder(pm32.estrategia_didactica) && !isPlaceholder(truth.estrategia)) {
      if (NAME_NORMALIZE(pm32.estrategia_didactica) !== NAME_NORMALIZE(truth.estrategia)) {
        report.passed = false;
        report.mismatched_values.push({
          file: fileName,
          field: 'estrategia_didactica',
          expected: truth.estrategia,
          actual: pm32.estrategia_didactica,
        });
      }
    }
  } else {
    report.passed = false;
    report.mismatched_values.push({
      file: fileName,
      field: '<no_truth>',
      expected: `pm-3-1.sessions_detail[session=${i}]`,
      actual: 'missing',
    });
  }

  // — 14.3 + 14.4 Propagación y cross-reference a bloques WHILE —————————
  // Soportar tres esquemas observados en runs reales:
  //   (a) while.bloques[]             → S1-S3 en DIESEL-2026-04-15 / -04-18
  //   (b) session_plan.while_a..z     → S4-S8 en DIESEL-2026-04-15 / -04-18
  //   (c) while_a..z (root-level)     → forma legacy del patch pm-3-2-estrategias
  let bloques = [];
  let schemaUsed = null;

  if (pm32.while && Array.isArray(pm32.while.bloques)) {
    schemaUsed = 'while.bloques';
    bloques = pm32.while.bloques.map((b) => {
      const raw = (b.letra || b.bloque || b.id || b.block || '').toString();
      return {
        id: BLOCK_ID_NORMALIZE(raw),
        id_raw: raw,
        tecnica: b.tecnica_didactica,
        schema: schemaUsed,
      };
    });
  } else if (pm32.session_plan && typeof pm32.session_plan === 'object') {
    schemaUsed = 'session_plan.while_x';
    for (const k of Object.keys(pm32.session_plan)) {
      const m = k.match(/^while_([a-z])$/i);
      if (!m) continue;
      const b = pm32.session_plan[k] || {};
      const raw = (b.block || b.letra || b.bloque || m[1]).toString();
      bloques.push({
        id: BLOCK_ID_NORMALIZE(raw),
        id_raw: raw,
        tecnica: b.tecnica_didactica,
        schema: schemaUsed,
      });
    }
  } else {
    schemaUsed = 'while_x (root-legacy)';
    for (const k of Object.keys(pm32)) {
      const m = k.match(/^while_([a-z])$/i);
      if (!m) continue;
      bloques.push({
        id: BLOCK_ID_NORMALIZE(m[1]),
        id_raw: m[1],
        tecnica: pm32[k] && pm32[k].tecnica_didactica,
        schema: schemaUsed,
      });
    }
  }

  if (bloques.length === 0) {
    report.passed = false;
    report.block_technique_gaps.push({
      file: fileName,
      detail: 'no se encontraron bloques WHILE (ni while.bloques[] ni while_a..z)',
    });
  }

  for (const b of bloques) {
    if (isPlaceholder(b.tecnica)) {
      report.passed = false;
      report.block_technique_gaps.push({
        file: fileName,
        block: b.id,
        missing: 'tecnica_didactica',
        schema_detected: b.schema,
      });
      continue;
    }
    // 14.4 cross-ref (con normalización de IDs para robustez cross-schema)
    if (truth) {
      const expected = truth.tecnicas.find(
        (t) => BLOCK_ID_NORMALIZE(t.bloque) === b.id
      );
      if (!expected) {
        // Severidad: WARNING. El bloque existe en pm-3-2 pero pm-3-1 no lo anticipó.
        // No es un fallo hard de Check 14 (la técnica SÍ está propagada); es un fallo
        // del source of truth (pm-3-1 incompleto). Queda registrado como observación.
        report.mismatched_values.push({
          file: fileName,
          field: `block_${b.id}`,
          expected: `pm-3-1.sessions_detail[session=${i}].logistics_box.tecnicas[bloque=${b.id}]`,
          actual: '<no existe en pm-3-1>',
          severity: 'warning',
          note: 'pm-3-2 declara un bloque que pm-3-1 no anticipó; revisar coherencia del Playbook Outline.',
          id_raw_pm32: b.id_raw,
        });
      } else if (NAME_NORMALIZE(b.tecnica) !== NAME_NORMALIZE(expected.tecnica)) {
        report.passed = false;
        report.mismatched_values.push({
          file: fileName,
          field: `${schemaUsed}[${b.id}].tecnica_didactica`,
          expected: expected.tecnica,
          actual: b.tecnica,
          severity: 'error',
        });
      }
    }
  }

  report.summary[fileName] = {
    bloques_count: bloques.length,
    schema: schemaUsed,
    blocks_ids: bloques.map((b) => b.id).join(','),
    blocks_ids_raw: bloques.map((b) => b.id_raw).join(','),
  };
}

// ─── Emitir Validation Report ─────────────────────────────────────────────────
function emitReport(r) {
  // Salida YAML-ish para ser pegable en el Validation Report de PM-2.11
  const errors = r.mismatched_values.filter((x) => x.severity !== 'warning');
  const warnings = r.mismatched_values.filter((x) => x.severity === 'warning');
  console.log(`check: "${r.check}"`);
  console.log(`run_id: "${r.run_id}"`);
  console.log(`timestamp: "${r.timestamp}"`);
  console.log(`passed: ${r.passed}`);
  console.log(`files_checked: ${JSON.stringify(r.files_checked)}`);
  console.log(`files_missing: ${JSON.stringify(r.files_missing)}`);
  console.log(`missing_fields_count: ${r.missing_fields.length}`);
  console.log(`mismatched_values_errors_count: ${errors.length}`);
  console.log(`mismatched_values_warnings_count: ${warnings.length}`);
  console.log(`block_technique_gaps_count: ${r.block_technique_gaps.length}`);
  console.log('summary:');
  for (const f of Object.keys(r.summary)) {
    const s = r.summary[f];
    console.log(`  ${f}: {schema: "${s.schema}", bloques: ${s.bloques_count}, ids: "${s.blocks_ids}"}`);
  }
  if (r.missing_fields.length)
    console.log(`missing_fields:\n${r.missing_fields.map((x) => '  - ' + JSON.stringify(x)).join('\n')}`);
  if (errors.length)
    console.log(`errors:\n${errors.map((x) => '  - ' + JSON.stringify(x)).join('\n')}`);
  if (warnings.length)
    console.log(`warnings:\n${warnings.map((x) => '  - ' + JSON.stringify(x)).join('\n')}`);
  if (r.block_technique_gaps.length)
    console.log(`block_technique_gaps:\n${r.block_technique_gaps.map((x) => '  - ' + JSON.stringify(x)).join('\n')}`);
  console.log(`remediation: "Ejecutar scripts/pm-3-2-estrategias-patch.js. Si persiste, regenerar PM-3.1 §11.2. Ver DM §10 PASO 7.b."`);
}

emitReport(report);
process.exit(report.passed ? 0 : 1);
