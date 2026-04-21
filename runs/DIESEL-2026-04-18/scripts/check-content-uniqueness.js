// ============================================================
// CHECK 9 — Unicidad de contenido entre guías
// Verifica que los archivos de contenido pedagógico de un run
// NO son copias idénticas de la guía anterior.
// Uso: node check-content-uniqueness.js DIESEL-2026-04-18-G3
// ============================================================

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RUNS_BASE = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs";

// Archivos que DEBEN ser originales (no pueden ser copia)
const CONTENT_FILES = [
  "pm-2-3.json",   // Reading anchor text
  "pm-2-4.json",   // Writing task
  "pm-2-5.json",   // Vocabulary + exercises
  "pm-2-6.json",   // Listening dialogue
  "pm-2-8.json",   // Speaking task
  "pm-2-9.json",   // Language functions
  "pm-2-10.json",  // Grammar items
  "pm-3-2-s1.json", "pm-3-2-s2.json", "pm-3-2-s3.json", "pm-3-2-s4.json",
  "pm-3-2-s5.json", "pm-3-2-s6.json", "pm-3-2-s7.json", "pm-3-2-s8.json"
];

// Archivos que SÍ pueden reutilizarse (estructura)
const REUSABLE_FILES = [
  "pm-2-1.json", "pm-2-2.json", "pm-2-11.json",
  "pm-3-1.json", "pm-3-4.json", "pm-4-1.json", "pm-4-2.json"
];

function hashFile(filepath) {
  if (!fs.existsSync(filepath)) return null;
  // Hash ignoring run_id values so we compare actual content, not IDs
  const content = fs.readFileSync(filepath, "utf8")
    .replace(/DIESEL-2026-04-18-G\d+/g, "DIESEL-XXXX")
    .replace(/DIESEL-2026-04-18"/g, '"DIESEL-XXXX"');
  return crypto.createHash("sha256").update(content).digest("hex").substring(0, 16);
}

const targetRun = process.argv[2];
if (!targetRun) {
  console.error("Usage: node check-content-uniqueness.js <RUN-ID>");
  process.exit(1);
}

// Find previous runs (same program, earlier guides)
const allRuns = fs.readdirSync(RUNS_BASE)
  .filter(d => d.startsWith("DIESEL-2026-04-18") && d !== targetRun)
  .sort();

if (allRuns.length === 0) {
  console.log("CHECK 9 — No previous runs to compare against. PASS ✅ (first run)");
  process.exit(0);
}

console.log(`\nCHECK 9 — Content Uniqueness: ${targetRun}`);
console.log(`Comparing against: ${allRuns.join(", ")}\n`);

let failures = 0;
let warnings = 0;

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
    if (otherHash && otherHash === targetHash) {
      copies.push(otherRun);
    }
  }

  if (copies.length > 0) {
    console.log(`  ❌ COPY     ${file} — identical to: ${copies.join(", ")}`);
    failures++;
  } else {
    console.log(`  ✅ ORIGINAL ${file}`);
  }
}

console.log("");
if (failures > 0) {
  console.log(`CHECK 9 FAIL ❌ — ${failures} file(s) are copies of another guide.`);
  console.log("ACTION REQUIRED: Regenerate these files from the content universe of " + targetRun);
  console.log("See pm-1-2.json (key_vocabulary, communicative_functions, curated_sources)");
  process.exit(1);
} else if (warnings > 0) {
  console.log(`CHECK 9 PASS ✅ (with ${warnings} missing file warning(s))`);
} else {
  console.log("CHECK 9 PASS ✅ — All content files are original for this guide.");
}
