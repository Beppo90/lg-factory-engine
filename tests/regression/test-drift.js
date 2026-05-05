#!/usr/bin/env node

// Pilar 4 · test-drift — implementa F2.8 schema-drift CI check.
// Spec: english-engine-lab/specs/schema-drift.spec.md
//
// 4 checks declarados en F2.8 + 2 auxiliares (Hito 3 fase B.2 · 6 checks):
//   1. Master prompt frontmatter version vs skill VERSIONES_VIGENTES   ✓
//      (parser soporta --- ... --- delimited y ```yaml embedded)
//   2. Enums registry.yaml ⊆ enums schemas v4                           ✓
//      (tipo_programa + regla_bloques)
//   3. allOf if/then condicional final_mission_scenario                 ✓
//      (verifica field declarado + 2 cláusulas allOf condicionales por modo)
//   4. Activity Card schema_version vigente                             ✓
//   5. Drift-matrix sync                                                ✓ aux
//      (cross-check D-NNN entries marked closed vs detection automática)
//   6. Schema fields v2.0 NEW declarados en master vs presencia en v4/  ✓ aux
//      (cluster cascade Cowork canonizó schemas en master-prompts ·
//      v4/schemas/ pendiente de sync · ver HANDOFF-2026-05-05.md §3)
//
// Severidades F2.8:
//   CRITICAL       bloquea merge (D-001/002/003 son CRITICAL)
//   SIGNIFICATIVO  warning visible, no bloquea
//   MENOR          info, log silencioso
//
// Exit code: 0 si todos PASS, 1 si ≥1 drift detectado (cualquier severidad).
// Hook decide bloqueo según severidad (informativo en Hito 3 per bloqueo opción b).

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FACTORY_ROOT = REPO_ROOT;
const ENGLISH_ENGINE_LAB = path.resolve(REPO_ROOT, '..', 'english-engine-lab');

const drifts = [];

function record(severity, check, detail) {
  drifts.push({ severity, check, detail });
}

// ─── Check 4: Activity Card schema_version vs canon DM v2.7+ ──────────
function checkActivityCardSchemaVersion() {
  const schemaPath = path.join(
    FACTORY_ROOT,
    'v4/schemas/common/activity-card.schema.json'
  );
  const expectedVersion = 'v2.7'; // canon DM v2.7+ per F2.8 §Comprobaciones #4

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch (err) {
    record('CRITICAL', 'activity-card-schema-version', `cannot read ${schemaPath}: ${err.message}`);
    return;
  }

  // Spec dice: schema_version: "v2.7". Buscamos ese valor en el schema.
  // F2.8 puntualiza el field en el _meta de runs · acá verificamos title del schema.
  const titleMatch = (schema.title || '').match(/v(\d+\.\d+)/);
  const titleVer = titleMatch ? `v${titleMatch[1]}` : 'unknown';

  if (titleVer === expectedVersion) {
    return; // PASS
  }

  // Hito 2 ya documentó: runs evolucionaron a v3.0/v3.1 mientras schema dice v2.7.
  // Spec F2.8 declara v2.7 como canon, pero realidad runtime ya es v3.0+.
  record(
    'SIGNIFICATIVO',
    'activity-card-schema-version',
    `schema title declara ${titleVer} · spec F2.8 dice canon v2.7 · runs IMARPOR-V2 emiten activity_card v3.0+. Drift cross-versions canon-vs-runtime sin resolver.`
  );
}

// ─── Check 1: Master prompt frontmatter version vs skill VERSIONES_VIGENTES ──
function parsePythonDict(text, varName) {
  // Extrae el dict { "PM-X.Y": "version", ... } del .py file
  const re = new RegExp(`${varName}\\s*=\\s*\\{([\\s\\S]*?)\\}`, 'm');
  const m = text.match(re);
  if (!m) return null;
  const body = m[1];
  const result = {};
  const entryRe = /["']([^"']+)["']\s*:\s*["']([^"']+)["']/g;
  let entry;
  while ((entry = entryRe.exec(body)) !== null) {
    result[entry[1]] = entry[2];
  }
  return result;
}

function parseFrontmatterVersion(mdPath) {
  let text;
  try {
    text = fs.readFileSync(mdPath, 'utf8');
  } catch {
    return null;
  }
  // 4 formatos canon soportados (verificado 2026-05-05 · convergencia con
  // master_prompt_loader.py · captura semver MAJOR.MINOR[.PATCH])
  const semver = '([0-9]+\\.[0-9]+(?:\\.[0-9]+)?)';

  // Formato 1: YAML frontmatter delimitado al inicio (--- ... ---)
  const yamlFrontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (yamlFrontmatter) {
    const m = yamlFrontmatter[1].match(new RegExp(`^version:\\s*["']?${semver}["']?\\s*$`, 'm'));
    if (m) return m[1].trim();
  }
  // Formato 2: bloque yaml embedded ```yaml ... ``` (PM-4.1)
  const yamlBlockRe = /```yaml\r?\n([\s\S]*?)\r?\n```/g;
  let block;
  while ((block = yamlBlockRe.exec(text)) !== null) {
    const m = block[1].match(new RegExp(`^version:\\s*["']?${semver}["']?\\s*$`, 'm'));
    if (m) return m[1].trim();
  }
  // Formato 3: Markdown bold `**Versión:** X.Y[.Z]` (PM-0)
  const boldMatch = text.match(new RegExp(`\\*\\*Versión:\\*\\*\\s*${semver}`));
  if (boldMatch) return boldMatch[1].trim();
  // Formato 4: Markdown table row `| **Versión** | X.Y[.Z] |` (PM-0.0)
  const tableMatch = text.match(new RegExp(`\\|\\s*\\*\\*Versión\\*\\*\\s*\\|\\s*${semver}\\s*\\|`));
  if (tableMatch) return tableMatch[1].trim();

  return null;
}

function checkMasterPromptVersions() {
  const loaderPath = path.join(
    FACTORY_ROOT,
    '.claude/skills/fpi-sena-fase2/lib/master_prompt_loader.py'
  );
  let loaderText;
  try {
    loaderText = fs.readFileSync(loaderPath, 'utf8');
  } catch (err) {
    record('SIGNIFICATIVO', 'master-prompt-versions', `cannot read skill loader: ${err.message}`);
    return;
  }

  const expected = parsePythonDict(loaderText, 'VERSIONES_VIGENTES');
  const paths = parsePythonDict(loaderText, 'MASTER_PROMPT_PATHS');
  if (!expected || !paths) {
    record('SIGNIFICATIVO', 'master-prompt-versions', 'no se pudo parsear VERSIONES_VIGENTES o MASTER_PROMPT_PATHS del skill loader');
    return;
  }

  const masterPromptsDir = path.join(FACTORY_ROOT, 'master-prompts');
  for (const pmId of Object.keys(expected)) {
    const expectedVer = expected[pmId];
    if (expectedVer === 'vigente') continue; // skip placeholder

    const filename = paths[pmId];
    if (!filename) {
      record('MENOR', 'master-prompt-versions', `${pmId}: no hay path en MASTER_PROMPT_PATHS`);
      continue;
    }
    const fullPath = path.join(masterPromptsDir, filename);
    const actualVer = parseFrontmatterVersion(fullPath);
    if (actualVer === null) {
      record('MENOR', 'master-prompt-versions', `${pmId}: master prompt sin frontmatter version (${filename})`);
      continue;
    }
    if (actualVer !== expectedVer) {
      record(
        'SIGNIFICATIVO',
        'master-prompt-versions',
        `${pmId}: frontmatter v${actualVer} vs skill VERSIONES_VIGENTES v${expectedVer}`
      );
    }
  }
}

// ─── Check 2: Enums registry.yaml ⊆ schemas (tipo_programa solo · fase A) ────
function checkEnumTipoPrograma() {
  const registryPath = path.join(
    ENGLISH_ENGINE_LAB,
    'specs/pm-contracts/registry.yaml'
  );
  let registry;
  try {
    registry = yaml.load(fs.readFileSync(registryPath, 'utf8'));
  } catch (err) {
    record('SIGNIFICATIVO', 'enum-tipo_programa', `cannot read registry.yaml: ${err.message}`);
    return;
  }

  const canonValues = registry?.enums?.tipo_programa?.values;
  if (!Array.isArray(canonValues)) {
    record('SIGNIFICATIVO', 'enum-tipo_programa', 'registry.yaml: enums.tipo_programa.values no encontrado');
    return;
  }

  // pm-0-context.schema.json v3.4 refactoró program_scope → programa (top-level)
  // mantenemos múltiples paths candidatos para que el check sobreviva refactors futuros
  const targets = [
    {
      schemaPath: 'v4/schemas/pm-0-context.schema.json',
      enumPaths: [
        ['properties', 'programa', 'properties', 'tipo', 'enum'],         // v3.4+
        ['properties', 'program_scope', 'properties', 'tipo', 'enum'],   // legacy v4.0 spike
      ],
    },
    {
      schemaPath: 'v4/schemas/pm-1-1-input.schema.json',
      enumPaths: [['properties', 'tipo', 'enum']],
    },
  ];

  for (const t of targets) {
    const fullPath = path.join(FACTORY_ROOT, t.schemaPath);
    let schema;
    try {
      schema = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch {
      record('MENOR', 'enum-tipo_programa', `${t.schemaPath}: no existe o no parseable`);
      continue;
    }
    // Probar paths candidatos · primer match gana
    let cursor;
    let matchedPath;
    for (const candidatePath of t.enumPaths) {
      let walker = schema;
      let ok = true;
      for (const k of candidatePath) {
        walker = walker?.[k];
        if (walker === undefined) { ok = false; break; }
      }
      if (ok && Array.isArray(walker)) {
        cursor = walker;
        matchedPath = candidatePath.join('.');
        break;
      }
    }
    if (!Array.isArray(cursor)) {
      record('SIGNIFICATIVO', 'enum-tipo_programa', `${t.schemaPath}: ningún path candidato encontró tipo enum (probados: ${t.enumPaths.map(p => p.join('.')).join(' · ')})`);
      continue;
    }
    const missing = canonValues.filter((v) => !cursor.includes(v));
    if (missing.length > 0) {
      record(
        'CRITICAL',
        'enum-tipo_programa',
        `${t.schemaPath} (${matchedPath}): faltan valores [${missing.join(', ')}] vs canon registry.yaml. (D-001 reabierto)`
      );
    }
  }
}

// ─── Check 2.b: Enum regla_bloques registry.yaml ⊆ schemas (D-002) ──────
function checkEnumReglaBloques() {
  const registryPath = path.join(ENGLISH_ENGINE_LAB, 'specs/pm-contracts/registry.yaml');
  let registry;
  try {
    registry = yaml.load(fs.readFileSync(registryPath, 'utf8'));
  } catch (err) {
    record('SIGNIFICATIVO', 'enum-regla_bloques', `cannot read registry.yaml: ${err.message}`);
    return;
  }

  // En registry.yaml regla_bloques.values es dict (keys = enum values), no array
  const valuesNode = registry?.enums?.regla_bloques?.values;
  if (!valuesNode || typeof valuesNode !== 'object') {
    record('SIGNIFICATIVO', 'enum-regla_bloques', 'registry.yaml: enums.regla_bloques.values no encontrado');
    return;
  }
  const canonValues = Object.keys(valuesNode);

  // pm-0-context.schema.json v3.4 refactoró program_scope → programa
  const targets = [
    {
      schemaPath: 'v4/schemas/pm-0-context.schema.json',
      enumPaths: [
        ['properties', 'programa', 'properties', 'regla_bloques', 'enum'],         // v3.4+
        ['properties', 'program_scope', 'properties', 'regla_bloques', 'enum'],   // legacy
      ],
    },
  ];

  for (const t of targets) {
    const fullPath = path.join(FACTORY_ROOT, t.schemaPath);
    let schema;
    try {
      schema = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch {
      record('MENOR', 'enum-regla_bloques', `${t.schemaPath}: no existe o no parseable`);
      continue;
    }
    let cursor;
    let matchedPath;
    for (const candidatePath of t.enumPaths) {
      let walker = schema;
      let ok = true;
      for (const k of candidatePath) {
        walker = walker?.[k];
        if (walker === undefined) { ok = false; break; }
      }
      if (ok && Array.isArray(walker)) {
        cursor = walker;
        matchedPath = candidatePath.join('.');
        break;
      }
    }
    if (!Array.isArray(cursor)) {
      record('SIGNIFICATIVO', 'enum-regla_bloques', `${t.schemaPath}: ningún path candidato encontró regla_bloques enum`);
      continue;
    }
    const missing = canonValues.filter((v) => !cursor.includes(v));
    const extra = cursor.filter((v) => !canonValues.includes(v));
    if (missing.length > 0) {
      record('CRITICAL', 'enum-regla_bloques', `${t.schemaPath} (${matchedPath}): faltan [${missing.join(', ')}] vs canon registry. (D-002 reabierto)`);
    }
    if (extra.length > 0) {
      record('CRITICAL', 'enum-regla_bloques', `${t.schemaPath} (${matchedPath}): valores stale [${extra.join(', ')}] no canon v2.7.1. (D-002 reabierto)`);
    }
  }
}

// ─── Check 3: final_mission_scenario allOf if/then condicional (D-003) ──
function checkFinalMissionScenarioAllOf() {
  const schemaPath = path.join(FACTORY_ROOT, 'v4/schemas/pm-1-1-input.schema.json');
  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch (err) {
    record('CRITICAL', 'final-mission-scenario-allof', `cannot read pm-1-1-input.schema.json: ${err.message}`);
    return;
  }

  // Field declarado en ambos modos?
  const m1Props = schema?.properties?.modo_1_diseño_curricular?.properties;
  const m2Props = schema?.properties?.modo_2_informacion_externa?.properties;
  const m1HasField = m1Props && 'final_mission_scenario' in m1Props;
  const m2HasField = m2Props && 'final_mission_scenario' in m2Props;

  if (!m1HasField) {
    record('CRITICAL', 'final-mission-scenario-allof', 'modo_1_diseño_curricular.properties no declara final_mission_scenario. (D-003 reabierto)');
  }
  if (!m2HasField) {
    record('CRITICAL', 'final-mission-scenario-allof', 'modo_2_informacion_externa.properties no declara final_mission_scenario. (D-003 reabierto)');
  }

  // 2 cláusulas allOf condicionales: una por modo, condición tipo ∈ {CE, CC} + modo_informacion
  const allOf = Array.isArray(schema?.allOf) ? schema.allOf : [];
  const conditional = allOf.filter((c) => {
    const ifTipo = c?.if?.properties?.tipo?.enum;
    const ifModo = c?.if?.properties?.modo_informacion?.const;
    const tipoMatches = Array.isArray(ifTipo) && ifTipo.includes('Curso Especial') && ifTipo.includes('Curso Complementario');
    return tipoMatches && typeof ifModo === 'string';
  });
  const modos = new Set(conditional.map((c) => c.if.properties.modo_informacion.const));
  const expectedModos = ['MODO 1 — Diseño Curricular SOFÍA Plus', 'MODO 2 — Información Externa (Instructor)'];

  for (const expected of expectedModos) {
    if (!modos.has(expected)) {
      record(
        'CRITICAL',
        'final-mission-scenario-allof',
        `allOf no tiene cláusula condicional para tipo ∈ {CE, CC} + ${expected}. (D-003 reabierto)`
      );
    }
  }
}

// ─── Check 5: drift-matrix sync (cross-check con detección automática) ──
function checkDriftMatrixSync() {
  const matrixPath = path.join(ENGLISH_ENGINE_LAB, 'specs/_inventory/drift-matrix.md');
  let text;
  try {
    text = fs.readFileSync(matrixPath, 'utf8');
  } catch {
    record('MENOR', 'drift-matrix-sync', `cannot read drift-matrix.md: skip cross-check`);
    return;
  }

  // Parsear D-NNN entries y su estado de cierre
  // Buscamos secciones #### D-NNN y luego "**Cierre YYYY-MM-DD:**" en su cuerpo
  const entryRe = /####\s+D-(\d{3})[^\n]*\n([\s\S]*?)(?=####\s+D-|\n###\s|\n##\s|$)/g;
  const entries = {};
  let m;
  while ((m = entryRe.exec(text)) !== null) {
    const id = `D-${m[1]}`;
    const body = m[2];
    const closed = /\*\*Cierre\s+\d{4}-\d{2}-\d{2}:?\*\*/.test(body);
    entries[id] = { closed };
  }

  // Cross-check: ¿algún drift D-NNN aparece en mensajes detectados Y está marcado cerrado?
  // Es signo de regresión (drift cerrado se reabrió).
  // Importante: snapshot del array antes de iterar (evitamos self-loop · mensajes
  // de este check no deben contener "D-NNN" en formato detectable).
  const detectedSoFar = drifts.slice();
  const reabiertos = new Set();
  for (const d of detectedSoFar) {
    const refMatch = d.detail.match(/\bD-(\d{3})\b/);
    if (!refMatch) continue;
    const id = `D-${refMatch[1]}`;
    if (entries[id]?.closed && !reabiertos.has(id)) {
      reabiertos.add(id);
      record(
        'CRITICAL',
        'drift-matrix-sync',
        `Posible regresión: drift [${id}] marcado cerrado en drift-matrix.md pero detección automática lo encontró.`
      );
    }
  }

  const closedCount = Object.values(entries).filter((e) => e.closed).length;
  const openCount = Object.keys(entries).length - closedCount;
  // Info silenciosa via MENOR — no FAIL si solo informativo
  if (Object.keys(entries).length === 0) {
    record('MENOR', 'drift-matrix-sync', 'drift-matrix.md no parseable o sin entradas D-NNN');
  }
  // No record si todo coherente · solo registramos en consola
  if (closedCount > 0 || openCount > 0) {
    console.log(`  ℹ drift-matrix.md: ${closedCount} cerrados · ${openCount} abiertos · cross-check con checks automáticos OK\n`);
  }
}

// ─── Check 6: Schema fields v2.0 NEW declarados en master vs v4/schemas/ ──
// Source: HANDOFF-2026-05-05.md §3 (cluster cascade Cowork 2026-05-04/05)
// Severidad: SIGNIFICATIVO (deuda explícita post-cluster · sync v4/schemas/
// es trabajo Hito 4 opción d · NO hard-block).
//
// Mantenimiento: cada vez que un field se sincronice a v4/schemas/, eliminar
// su entrada de EXPECTED_V2_FIELDS abajo. Cuando array esté vacío → check pasa
// sin reportar nada (deuda cerrada).
const EXPECTED_V2_FIELDS = [
  { field: 'competencias', source: 'PM-0.0 v2.0 multi-comp · array técnicas anchor (N≥2)' },
  { field: '_v2_audit_anclaje_tecnico', source: 'PM-0.0 v2.0 · auditoría cobertura fusión bidireccional ESP' },
  { field: '_deuda_explicita_para_guia_siguiente', source: 'PM-0.0 v2.0 · cross-cascade G1→G2→G3' },
  { field: '_cobertura_total_programa', source: 'PM-0.0 v2.3 · CIERRE PROGRAMA (G3 multi-comp)' },
  { field: '_competencias_tecnicas_modo', source: 'PM-0 v3.3.1 + PM-1.1 v2.9 + PM-1.2 v4.3.1 top-level' },
  { field: '_split_strategy_heredado', source: 'PM-0 v3.3.1 + PM-1.1 v2.9 + PM-1.2 v4.3.1 top-level' },
  { field: '_raps_metadata', source: 'PM-0 v3.3.1 + PM-1.1 v2.9 + PM-1.2 v4.3.1 top-level' },
  { field: '_anclaje_tecnico_competencia', source: 'Multi-PM v2.0+ · per saber/fuente/bloque' },
  { field: 'competencias_tecnicas', source: 'PM-1.1 v2.9 · per bloque tripartito _anclaje_matriz' },
  { field: 'cierre_programa', source: 'PM-0 v3.3.1 + PM-1.1 v2.9 + PM-1.2 v4.3.1 BT (TRANSFERENCIA)' },
];

function checkSchemaFieldsV2New() {
  const schemasDir = path.join(FACTORY_ROOT, 'v4/schemas');
  let allContent = '';
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.schema.json')) {
        try {
          allContent += fs.readFileSync(full, 'utf8') + '\n';
        } catch {
          // skip unreadable
        }
      }
    }
  }
  walk(schemasDir);

  if (allContent === '') {
    record('SIGNIFICATIVO', 'schema-fields-v2-new', `v4/schemas/ no leído o vacío · skip cross-check`);
    return;
  }

  for (const e of EXPECTED_V2_FIELDS) {
    // Buscamos como property key (entre comillas dobles)
    const needle = `"${e.field}"`;
    if (!allContent.includes(needle)) {
      record(
        'SIGNIFICATIVO',
        'schema-fields-v2-new',
        `Field "${e.field}" declarado en master (${e.source}) · NO encontrado en v4/schemas/ · TODO sync Hito 4 opción d.`
      );
    }
  }
}

function main() {
  console.log('test-drift · F2.8 schema drift detection (Hito 3 fase B.2 · 6 checks)');
  console.log('');

  checkActivityCardSchemaVersion();
  checkMasterPromptVersions();
  checkEnumTipoPrograma();
  checkEnumReglaBloques();
  checkFinalMissionScenarioAllOf();
  checkSchemaFieldsV2New();
  checkDriftMatrixSync();

  if (drifts.length === 0) {
    console.log('✓ PASS · 0 drifts detectados (6/6 checks PASS)');
    process.exit(0);
  }

  // Group by severity
  const bySev = drifts.reduce((acc, d) => {
    (acc[d.severity] ||= []).push(d);
    return acc;
  }, {});

  const order = ['CRITICAL', 'SIGNIFICATIVO', 'MENOR'];
  for (const sev of order) {
    const list = bySev[sev];
    if (!list || list.length === 0) continue;
    console.log(`▶ ${sev} · ${list.length} drift(s)`);
    list.forEach((d, i) => {
      console.log(`  [${i + 1}] (${d.check}) ${d.detail}`);
    });
    console.log('');
  }

  const counts = order.map((s) => `${s}=${(bySev[s] || []).length}`).join(' · ');
  console.log(`Summary: ${drifts.length} drift(s) total · ${counts}`);
  process.exit(1);
}

main();
