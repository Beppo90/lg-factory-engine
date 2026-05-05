#!/usr/bin/env node

const Ajv = require('ajv/dist/2020').default;
const addFormats = require('ajv-formats').default;
const fs = require('fs');
const path = require('path');

const SCHEMAS_DIR = path.resolve(__dirname, '..', '..', 'v4', 'schemas');
const FIXTURES_DIR = path.resolve(__dirname, 'fixtures');

const testCases = [
  {
    label: 'DIESEL · pm-2-3 (Reading) vs v4 schema',
    fixture: path.join(FIXTURES_DIR, 'diesel-pm-2-3.json'),
    schemaId: 'fpi-sena-factory/v4/schemas/pm-2-3.schema.json',
  },
  {
    label: 'MGV · pm-2-3 (Reading) vs v4 schema',
    fixture: path.join(FIXTURES_DIR, 'mgv-pm-2-3.json'),
    schemaId: 'fpi-sena-factory/v4/schemas/pm-2-3.schema.json',
  },
  {
    label: 'IMARPOR-CC-V2 · pm-2-3 (Reading) vs v4 schema',
    fixture: path.join(FIXTURES_DIR, 'imarpor-cc-v2-pm-2-3.json'),
    schemaId: 'fpi-sena-factory/v4/schemas/pm-2-3.schema.json',
  },
];

function loadSchemasRecursively(dir) {
  const out = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.schema.json')) {
        out.push({
          path: full,
          content: JSON.parse(fs.readFileSync(full, 'utf8')),
        });
      }
    }
  }
  walk(dir);
  return out;
}

function main() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const schemas = loadSchemasRecursively(SCHEMAS_DIR);
  for (const { path: p, content } of schemas) {
    try {
      ajv.addSchema(content);
    } catch (err) {
      console.error(`SKIP schema ${p}: ${err.message}`);
    }
  }
  console.log(`Loaded ${schemas.length} schemas from v4/schemas/`);
  console.log('');

  let pass = 0;
  let fail = 0;

  for (const tc of testCases) {
    console.log(`▶ ${tc.label}`);
    let fixture;
    try {
      fixture = JSON.parse(fs.readFileSync(tc.fixture, 'utf8'));
    } catch (err) {
      console.log(`  ✗ FAIL · cannot read fixture: ${err.message}`);
      fail++;
      continue;
    }

    const validate = ajv.getSchema(tc.schemaId);
    if (!validate) {
      console.log(`  ✗ FAIL · schema not registered: ${tc.schemaId}`);
      fail++;
      continue;
    }

    const valid = validate(fixture);
    if (valid) {
      console.log('  ✓ PASS · fixture matches schema');
      pass++;
    } else {
      const errs = validate.errors || [];
      console.log(`  ✗ FAIL · ${errs.length} validation errors`);
      const limit = 8;
      errs.slice(0, limit).forEach((err, i) => {
        const where = err.instancePath || '/';
        const detail = err.params ? ` (${JSON.stringify(err.params)})` : '';
        console.log(`    [${i + 1}] ${where} ${err.message}${detail}`);
      });
      if (errs.length > limit) {
        console.log(`    … +${errs.length - limit} more errors`);
      }
      fail++;
    }
    console.log('');
  }

  console.log(`Summary: ${pass} passed · ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

main();
