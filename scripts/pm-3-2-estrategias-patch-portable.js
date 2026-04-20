#!/usr/bin/env node
/**
 * pm-3-2-estrategias-patch-portable.js
 *
 * Variante portátil del `pm-3-2-estrategias-patch.js` original
 * (runs/DIESEL-2026-04-15/scripts/pm-3-2-estrategias-patch.js).
 *
 * Diferencias:
 *   - Acepta run_dir como argumento (no hay paths hardcoded a sesiones).
 *   - No toca build-out-gen.js ni regenera docx (fuera de scope Check 14).
 *   - No escribe al vault (el sandbox actual no tiene acceso).
 *   - Idempotente — re-correrlo no genera diffs si los JSONs ya están en
 *     el estado canónico.
 *
 * Uso:
 *   node scripts/pm-3-2-estrategias-patch-portable.js runs/DIESEL-2026-04-15
 *
 * Qué hace (exactamente la misma lógica del script canónico, sección 2):
 *   1. Lee pm-3-1.json del run.
 *   2. Para cada pm-3-2-sX.json (1..8):
 *      a. Copia logistics_box.{momento_sena, estrategia, justificacion}
 *         a los campos root-level: momento_sena / estrategia_didactica /
 *         justificacion_didactica.
 *      b. Para cada técnica en logistics_box.tecnicas[], inyecta
 *         tecnica_didactica en el bloque WHILE correspondiente
 *         (while.bloques[].letra para S1-S3, session_plan.while_x para S4-S8).
 *
 * Límite estructural: el patch SOLO puede propagar técnicas que pm-3-1.json
 * declara. Si pm-3-2 tiene bloques que pm-3-1 no anticipó, el patch no puede
 * rellenarlos — eso es responsabilidad de regenerar pm-3-1 §11.2.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const runDir = process.argv[2];
if (!runDir) {
  console.error('Uso: node pm-3-2-estrategias-patch-portable.js <run_dir>');
  process.exit(2);
}
const runDirAbs = path.resolve(runDir);
const pm31Path = path.join(runDirAbs, 'pm-3-1.json');
if (!fs.existsSync(pm31Path)) {
  console.error(`ERROR: no existe ${pm31Path}`);
  process.exit(2);
}

const pm31 = JSON.parse(fs.readFileSync(pm31Path, 'utf8'));
const sessionsDetail = pm31.sessions_detail || pm31.sessions || [];

// ─── 1. Construir mapa session → estrategia (igual que script canónico) ──────
const estMap = {};
for (const s of sessionsDetail) {
  if (s.logistics_box && s.logistics_box.estrategia) {
    estMap[s.session] = {
      momento_sena: s.logistics_box.momento_sena,
      estrategia_didactica: s.logistics_box.estrategia,
      justificacion: s.logistics_box.justificacion,
      tecnicas: Array.isArray(s.logistics_box.tecnicas) ? s.logistics_box.tecnicas : [],
    };
  }
}
console.log(`Estrategias cargadas para sesiones: ${Object.keys(estMap).join(', ')}`);
console.log();

// ─── 2. Parchear cada pm-3-2-sX.json ─────────────────────────────────────────
const report = { patched: [], skipped: [], changes: {} };

for (let i = 1; i <= 8; i++) {
  const fp = path.join(runDirAbs, `pm-3-2-s${i}.json`);
  if (!fs.existsSync(fp)) {
    report.skipped.push({ session: i, reason: 'file_missing' });
    continue;
  }
  const est = estMap[i];
  if (!est) {
    report.skipped.push({ session: i, reason: 'no_estrategia_in_pm31' });
    continue;
  }

  const beforeRaw = fs.readFileSync(fp, 'utf8');
  const d = JSON.parse(beforeRaw);
  const changes = [];

  // a. Campos root
  if (d.momento_sena !== est.momento_sena) {
    changes.push(`momento_sena: "${d.momento_sena||''}" → "${est.momento_sena}"`);
    d.momento_sena = est.momento_sena;
  }
  if (d.estrategia_didactica !== est.estrategia_didactica) {
    changes.push(`estrategia_didactica: "${(d.estrategia_didactica||'').slice(0,30)}..." → "${est.estrategia_didactica.slice(0,30)}..."`);
    d.estrategia_didactica = est.estrategia_didactica;
  }
  if (d.justificacion_didactica !== est.justificacion) {
    changes.push(`justificacion_didactica: updated`);
    d.justificacion_didactica = est.justificacion;
  }

  // b. Tecnicas por bloque — lookup por letra canónica
  const tecByLetra = {};
  for (const t of est.tecnicas) {
    const letra = (t.bloque || '').toString().toUpperCase().replace(/^(WHILE|BLOCK|BLOQUE)[\s\-_]+/i, '');
    tecByLetra[letra] = t.tecnica;
  }

  if (d.while && Array.isArray(d.while.bloques)) {
    // Formato old: while.bloques[]
    for (const b of d.while.bloques) {
      const letra = (b.letra || '').toString().toUpperCase();
      if (letra && tecByLetra[letra]) {
        if (b.tecnica_didactica !== tecByLetra[letra]) {
          changes.push(`while.bloques[${letra}].tecnica_didactica: patched`);
          b.tecnica_didactica = tecByLetra[letra];
        }
      }
    }
  } else if (d.session_plan && typeof d.session_plan === 'object') {
    // Formato new: session_plan.while_a..e
    for (const letterLower of ['a','b','c','d','e']) {
      const key = `while_${letterLower}`;
      const letra = letterLower.toUpperCase();
      if (d.session_plan[key] && tecByLetra[letra]) {
        if (d.session_plan[key].tecnica_didactica !== tecByLetra[letra]) {
          changes.push(`session_plan.${key}.tecnica_didactica: patched`);
          d.session_plan[key].tecnica_didactica = tecByLetra[letra];
        }
      }
    }
  }

  const afterRaw = JSON.stringify(d, null, 2);
  if (afterRaw !== beforeRaw) {
    fs.writeFileSync(fp, afterRaw);
    report.patched.push({ session: i, changes_count: changes.length });
    report.changes[`pm-3-2-s${i}.json`] = changes;
  } else {
    report.patched.push({ session: i, changes_count: 0, note: 'idempotent_noop' });
  }
}

// ─── 3. Resumen ──────────────────────────────────────────────────────────────
console.log('--- PATCH REPORT ---');
console.log(`run_dir: ${runDirAbs}`);
console.log(`patched: ${report.patched.length} files`);
console.log(`skipped: ${report.skipped.length} files`);
console.log();
for (const p of report.patched) {
  const tag = p.changes_count === 0 ? '(no-op)' : `(${p.changes_count} cambios)`;
  console.log(`  S${p.session} ${tag}`);
  if (report.changes[`pm-3-2-s${p.session}.json`]) {
    for (const c of report.changes[`pm-3-2-s${p.session}.json`]) {
      console.log(`    · ${c}`);
    }
  }
}
if (report.skipped.length) {
  console.log();
  console.log('skipped:');
  for (const s of report.skipped) console.log(`  S${s.session}: ${s.reason}`);
}
