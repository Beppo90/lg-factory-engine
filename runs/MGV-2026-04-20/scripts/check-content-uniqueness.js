#!/usr/bin/env node
// ============================================================
// CHECK 9 — Unicidad de contenido entre guías (DM v2.3 §11)
// ------------------------------------------------------------
// Verifica que los archivos de contenido pedagógico de un run
// NO son copias byte-idénticas de otro run del MISMO programa
// (mismo prefijo antes del -G#).
//
// Normaliza run_id antes de hashear: cualquier cadena
// [A-Z]+-YYYY-MM-DD-G\d+ se reemplaza por PROG-XXXX, y cualquier
// PROG-YYYY-MM-DD se reemplaza por PROG-XXXX. Así el hash compara
// CONTENIDO REAL, no identificadores.
//
// Uso: node check-content-uniqueness.js MGV-2026-04-20-G2
//       (asume que MGV-2026-04-20-G1 ya existe — compara contra G1)
//
// Desplegado en Ciclo 1 de mejoras (2026-04-20). Para G1 no aplica
// (no hay guía previa del mismo programa) — retorna PASS por default.
// ============================================================

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RUNS_BASE = "/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs";

// Archivos que DEBEN ser originales (universo pedagógico propio)
const CONTENT_FILES = [
  "pm-2-3.json",   // Reading anchor text
  "pm-2-4.json",   // Writing task
  "pm-2-5.json",   // Vocabulary + exercises
  "pm-2-6.json",   // Listening dialogue
  "pm-2-8.json",   // Speaking task
  "pm-2-9.json",   // Language functions
  "pm-2-10.json",  // Grammar items
  "pm-3-2-s1.json", "pm-3-2-s2.json", "pm-3-2-s3.json", "pm-3-2-s4.json",
  "pm-3-2-s5.json", "pm-3-2-s6.json", "pm-3-2-s7.json", "pm-3-2-s8.json",
];

// Archivos que SÍ pueden reutilizarse (estructura, no contenido)
const REUSABLE_FILES = [
  "pm-2-1.json", "pm-2-2.json", "pm-2-11.json",
  "pm-3-1.json", "pm-4-1.json", "pm-4-2.json",
];

function normalizeRunId(content) {
  // Normaliza run_id en cualquier programa (DIESEL, MGV, ADSO, etc.)
  // Pattern: [A-Z]+-YYYY-MM-DD-G\d+  →  PROG-XXXX
  return content
    .replace(/[A-Z]+-\d{4}-\d{2}-\d{2}-G\d+/g, "PROG-XXXX")
    .replace(/[A-Z]+-\d{4}-\d{2}-\d{2}/g, "PROG-XXXX")
    .replace(/"G\d+"/g, '"GX"')
    .replace(/"guide_number":\s*\d+/g, '"guide_number": 0');
}

function hashFile(filepath) {
  if (!fs.existsSync(filepath)) return null;
  const content = fs.readFileSync(filepath, "utf8");
  const normalized = normalizeRunId(content);
  return crypto.createHash("sha256").update(normalized).digest("hex").substring(0, 16);
}

function programPrefix(runId) {
  // MGV-2026-04-20-G1 → MGV
  const m = runId.match(/^([A-Z]+)-/);
  return m ? m[1] : "";
}

const targetRun = process.argv[2];
if (!targetRun) {
  console.error("Usage: node check-content-uniqueness.js <RUN-ID>");
  console.error("Example: node check-content-uniqueness.js MGV-2026-04-20-G2");
  process.exit(1);
}

const targetDir = path.join(RUNS_BASE, targetRun);
if (!fs.existsSync(targetDir)) {
  console.error(`❌ Target run directory does not exist: ${targetDir}`);
  process.exit(1);
}

const prefix = programPrefix(targetRun);
if (!prefix) {
  console.error(`❌ Cannot parse program prefix from run ID: ${targetRun}`);
  process.exit(1);
}

// Find previous runs of the SAME program
const allRuns = fs.readdirSync(RUNS_BASE)
  .filter(d => d.startsWith(prefix + "-") && d !== targetRun)
  .filter(d => fs.statSync(path.join(RUNS_BASE, d)).isDirectory())
  .sort();

if (allRuns.length === 0) {
  console.log(`\nCHECK 9 — Content Uniqueness: ${targetRun}`);
  console.log(`Program: ${prefix}`);
  console.log("No previous runs of this program to compare against. PASS ✅ (first guide)\n");
  process.exit(0);
}

console.log(`\nCHECK 9 — Content Uniqueness: ${targetRun}`);
console.log(`Program: ${prefix}`);
console.log(`Comparing against: ${allRuns.join(", ")}\n`);

let failures = 0;
let warnings = 0;
let originals = 0;

for (const file of CONTENT_FILES) {
  const targetHash = hashFile(path.join(RUNS_BASE, targetRun, file));
  if (!targetHash) {
    console.log(`  ⚠️  MISSING  ${file} — file not found in ${targetRun}`);
    warnings++;
    continue;
  }

  const copies = [];
  for (const otherRun of allRuns) {
    const otherHash = hashFile(path.join(RUNS_BASE, otherRun, file));
    if (otherHash && otherHash === targetHash) copies.push(otherRun);
  }

  if (copies.length > 0) {
    console.log(`  ❌ COPY     ${file} — byte-identical (normalized) to: ${copies.join(", ")}`);
    failures++;
  } else {
    console.log(`  ✅ ORIGINAL ${file}`);
    originals++;
  }
}

console.log("");
console.log(`Summary: ${originals} original / ${failures} copies / ${warnings} missing`);
console.log("");

if (failures > 0) {
  console.log(`CHECK 9 FAIL ❌ — ${failures} file(s) are copies of another guide of the same program.`);
  console.log(`ACTION REQUIRED: Regenerate these files from the content universe of ${targetRun}.`);
  console.log(`  See pm-1-2.json (key_vocabulary, communicative_functions, curated_sources).`);
  console.log(`  See DM v2.3 §10 PASO 4 — REGLA CRÍTICA UNIVERSO DE CONTENIDO ORIGINAL POR GUÍA.`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`CHECK 9 PASS ✅ (with ${warnings} missing file warning(s))`);
  process.exit(0);
} else {
  console.log("CHECK 9 PASS ✅ — All content files are original for this guide.");
  process.exit(0);
}
