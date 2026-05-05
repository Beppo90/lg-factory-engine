#!/usr/bin/env node

// Pilar 4 · test-drift — implementa F2.8 schema-drift CI check.
// Spec: english-engine-lab/specs/schema-drift.spec.md
//
// 4 checks declarados en F2.8:
//   1. Master prompt frontmatter version vs skill VERSIONES_VIGENTES        ✓ implemented
//   2. Enums registry.yaml ⊆ enums schemas v4                                ✓ tipo_programa solo (Hito 3 fase A)
//   3. allOf if/then condicional final_mission_scenario en pm-1-1-input      ⏳ TODO Hito 3 fase B
//   4. Activity Card schema_version vigente                                  ✓ implemented
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
  // Frontmatter entre primeros --- ... ---
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const versionMatch = fm[1].match(/^version:\s*["']?([^"'\n]+?)["']?\s*$/m);
  return versionMatch ? versionMatch[1].trim() : null;
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

  const targets = [
    { schemaPath: 'v4/schemas/pm-0-context.schema.json', enumPath: ['properties', 'program_scope', 'properties', 'tipo', 'enum'] },
    { schemaPath: 'v4/schemas/pm-1-1-input.schema.json', enumPath: ['properties', 'tipo', 'enum'] },
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
    let cursor = schema;
    for (const k of t.enumPath) {
      cursor = cursor?.[k];
      if (cursor === undefined) break;
    }
    if (!Array.isArray(cursor)) {
      record('SIGNIFICATIVO', 'enum-tipo_programa', `${t.schemaPath}: ${t.enumPath.join('.')} no encontrado o no es array`);
      continue;
    }
    const missing = canonValues.filter((v) => !cursor.includes(v));
    if (missing.length > 0) {
      record(
        'CRITICAL',
        'enum-tipo_programa',
        `${t.schemaPath}: faltan valores [${missing.join(', ')}] vs canon registry.yaml. (D-001 abierto)`
      );
    }
  }
}

// ─── TODO fase B ──────────────────────────────────────────────────────
//   - Resto de enums: regla_bloques (D-002), archetype_mode, evidence_type, etc.
//   - Check 3: pm-1-1-input.schema.json debe tener allOf if/then para
//     final_mission_scenario condicional cuando tipo ∈ {Curso Especial, Curso
//     Complementario}. (D-003 abierto)
//   - drift-matrix.md sync: leer _inventory/drift-matrix.md y verificar que
//     drifts marcados "abierto" coincidan con detección automática.

function main() {
  console.log('test-drift · F2.8 schema drift detection (Hito 3 fase A · 3/4 checks)');
  console.log('');

  checkActivityCardSchemaVersion();
  checkMasterPromptVersions();
  checkEnumTipoPrograma();

  if (drifts.length === 0) {
    console.log('✓ PASS · 0 drifts detectados (3/3 checks PASS)');
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
  console.log('TODO fase B: enum regla_bloques · final_mission_scenario allOf · drift-matrix sync');
  process.exit(1);
}

main();
