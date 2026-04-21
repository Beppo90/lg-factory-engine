#!/usr/bin/env node
/**
 * bump_versions.js — Normaliza pm_version y pipeline_version a "2.6"
 * en todos los JSON del run DIESEL-2026-04-19 que participan en los 4 FINAL DOCX.
 * Canon v2.6 promovido 2026-04-20.
 */
const fs = require('fs');
const path = require('path');

const RUN_DIR = '/sessions/focused-cool-dirac/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19';
const TARGET = '2.6';

const files = [
  'pm-3-1.json', 'pm-3-5.json', 'pm-3-6.json',
  'pm-3-2-s1.json', 'pm-3-2-s2.json', 'pm-3-2-s3.json', 'pm-3-2-s4.json',
  'pm-3-2-s5.json', 'pm-3-2-s6.json', 'pm-3-2-s7.json', 'pm-3-2-s8.json',
];

let total = 0;
for (const f of files) {
  const p = path.join(RUN_DIR, f);
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const before = { pm_version: d.pm_version, pipeline_version: d.pipeline_version };
  let changed = false;
  if ('pm_version' in d && d.pm_version !== TARGET) { d.pm_version = TARGET; changed = true; }
  if ('pipeline_version' in d && d.pipeline_version !== TARGET) { d.pipeline_version = TARGET; changed = true; }
  if (changed) {
    fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
    total++;
    console.log(`  [updated] ${f}  ${JSON.stringify(before)} -> pm=${d.pm_version}${d.pipeline_version ? ' pipeline='+d.pipeline_version : ''}`);
  } else {
    console.log(`  [ok]      ${f}  pm=${d.pm_version}`);
  }
}
console.log(`\n${total} archivo(s) actualizados a canon v${TARGET}.`);
