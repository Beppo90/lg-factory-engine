#!/usr/bin/env node
/**
 * v4.0 Regression: compile all schemas under v4/schemas/ and validate known
 * golden fixtures. Stays green across Paso 2 as new schemas are added.
 *
 * Golden fixtures (v3.7):
 *   - pm-0-context.json  → pm-0-context.schema.json  (must VALIDATE)
 *   - pm-1-1.json        → pm-1-1.schema.json        (must VALIDATE)
 *   - pm-1-2.json        → pm-1-2.schema.json        (must FAIL — E2 step 1)
 */

const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname);
const COMMON = path.join(ROOT, "schemas", "common");
const SCHEMAS = path.join(ROOT, "schemas");
const FIXTURES = path.join(ROOT, "..", "runs", "DIESEL-2026-04-19");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

// Register all common sub-schemas
let commonCount = 0;
for (const f of fs.readdirSync(COMMON).filter(x => x.endsWith(".schema.json"))) {
  const s = JSON.parse(fs.readFileSync(path.join(COMMON, f), "utf8"));
  ajv.addSchema(s, `common/${f}`);
  commonCount++;
}
console.log(`✓ ${commonCount} common sub-schemas registered`);

// Compile all top-level PM schemas
const pmSchemas = fs.readdirSync(SCHEMAS).filter(f => f.endsWith(".schema.json"));
const compiled = {};
for (const f of pmSchemas) {
  const s = JSON.parse(fs.readFileSync(path.join(SCHEMAS, f), "utf8"));
  try {
    compiled[f] = ajv.compile(s);
    console.log(`✓ compiled ${f}`);
  } catch (e) {
    console.log(`✗ FAILED to compile ${f}: ${e.message}`);
    process.exit(1);
  }
}

console.log("\n── Golden Fixture Regression ──");

const cases = [
  { schema: "pm-0-context.schema.json", fixture: "pm-0-context.json", expect: "valid" },
  { schema: "pm-1-1.schema.json",       fixture: "pm-1-1.json",       expect: "valid" },
  { schema: "pm-1-2.schema.json",       fixture: "pm-1-2.json",       expect: "valid"   },
  { schema: "pm-2-0.schema.json",       fixture: "pm-2-0.json",       expect: "invalid" },
  { schema: "pm-2-1.schema.json",       fixture: "pm-2-1.json",       expect: "invalid" },
  { schema: "pm-2-2.schema.json",       fixture: "pm-2-2.json",       expect: "invalid" },
  { schema: "pm-2-3.schema.json",       fixture: "pm-2-3.json",       expect: "invalid" },
  { schema: "pm-2-4.schema.json",       fixture: "pm-2-4.json",       expect: "invalid" },
  { schema: "pm-2-5.schema.json",       fixture: "pm-2-5.json",       expect: "invalid" },
  { schema: "pm-2-6.schema.json",       fixture: "pm-2-6.json",       expect: "invalid" },
  { schema: "pm-2-8.schema.json",       fixture: "pm-2-8.json",       expect: "invalid" },
  { schema: "pm-2-9.schema.json",       fixture: "pm-2-9.json",       expect: "invalid" },
  { schema: "pm-2-10.schema.json",      fixture: "pm-2-10.json",      expect: "invalid" },
  { schema: "pm-3-1.schema.json",       fixture: "pm-3-1.json",       expect: "valid"   },
  { schema: "pm-3-2.schema.json",       fixture: "pm-3-2-s1.json",    expect: "invalid" },
  { schema: "pm-3-3.schema.json",       fixture: "pm-3-3-spec.json",  expect: "invalid" },
  { schema: "pm-3-4.schema.json",       fixture: "pm-3-4.json",       expect: "valid"   },
  { schema: "pm-3-6.schema.json",       fixture: "pm-3-6.json",       expect: "valid"   },
];

let failures = 0;
for (const c of cases) {
  const v = compiled[c.schema];
  if (!v) { console.log(`✗ ${c.schema} not compiled`); failures++; continue; }
  const fixturePath = path.join(FIXTURES, c.fixture);
  if (!fs.existsSync(fixturePath)) { console.log(`(skip) ${c.fixture} not found`); continue; }
  const data = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  const ok = v(data);
  const got = ok ? "valid" : "invalid";
  const pass = got === c.expect;
  console.log(`${pass ? "✓" : "✗"} ${c.fixture} → ${c.schema}: expected ${c.expect}, got ${got}`);
  if (!pass) {
    failures++;
    if (!ok && c.expect === "valid") {
      for (const err of v.errors.slice(0, 5)) console.log(`    ${err.instancePath} ${err.message}`);
    }
  }
}

if (failures > 0) {
  console.log(`\n✗ ${failures} regression failures`);
  process.exit(1);
}
console.log("\n✓ all regressions green");

// ── Cross-file post-checks (Ajv cannot do these) ──
console.log("\n── Cross-file checks ──");
const { execFileSync } = require("child_process");
const crossChecks = [
  { script: "checks/check-17-vocab-coverage.js", args: [FIXTURES], label: "CHECK 17 · vocab coverage" }
];
let crossFailures = 0;
for (const c of crossChecks) {
  try {
    execFileSync("node", [path.join(ROOT, c.script), ...c.args], { stdio: "inherit" });
  } catch (e) {
    console.log(`✗ ${c.label} FAILED`);
    crossFailures++;
  }
}
if (crossFailures > 0) {
  console.log(`\n✗ ${crossFailures} cross-file check failures`);
  process.exit(1);
}
console.log("\n✓ all cross-file checks green");
