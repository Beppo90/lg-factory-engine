#!/usr/bin/env node

// Pilar 4 · test-phase0 — valida matrices PM-0.0 (Phase 0) verificando que
// el campo validation_checks[] emitido por el LLM tiene todos status === "PASS"
// y que el conteo es coherente (12 para G1, 13 para G2+ con check id 13 deuda).
//
// Source of truth: master-prompts/PM-0.0 — Matriz Pedagógica Alineadora.md v2.3
// (sección VALIDATION CHECKS · 13 BLOQUEANTES). El LLM emite los flags al generar
// la matriz; este test verifica que ningún flag quedó FAIL/WARN.
//
// No-bloqueante en CI hasta Hito 4 Opción C (per plan Pilar 4).

const fs = require('fs');
const path = require('path');

const FIXTURES_DIR = path.resolve(__dirname, 'fixtures');

const testCases = [
  {
    label: 'RECREACION-IMDER · pm-0-0-matriz G1 (Técnico · 1ra guía)',
    fixture: path.join(FIXTURES_DIR, 'recreacion-pm-0-0-matriz-G1.json'),
    expected_min_checks: 12,
    is_g1: true,
  },
  {
    label: 'RECREACION-IMDER · pm-0-0-matriz G2 (Técnico · 2da guía)',
    fixture: path.join(FIXTURES_DIR, 'recreacion-pm-0-0-matriz-G2.json'),
    expected_min_checks: 13,
    is_g1: false,
  },
  {
    label: 'INFRATI · pm-0-0-matriz G1 (Tecnólogo multi-comp · 1ra guía)',
    fixture: path.join(FIXTURES_DIR, 'infrati-pm-0-0-matriz-G1.json'),
    expected_min_checks: 12,
    is_g1: true,
  },
  {
    label: 'INFRATI · pm-0-0-matriz G2 (Tecnólogo multi-comp · 2da guía)',
    fixture: path.join(FIXTURES_DIR, 'infrati-pm-0-0-matriz-G2.json'),
    expected_min_checks: 13,
    is_g1: false,
  },
  {
    label: 'INFRATI · pm-0-0-matriz G3 (Tecnólogo multi-comp · CIERRE)',
    fixture: path.join(FIXTURES_DIR, 'infrati-pm-0-0-matriz-G3.json'),
    expected_min_checks: 13,
    is_g1: false,
  },
];

function main() {
  let pass = 0;
  let fail = 0;

  console.log('PM-0.0 matrices — validation_checks emitted by LLM at runtime');
  console.log('Source of truth: master-prompts/PM-0.0.md v2.3 §VALIDATION CHECKS · 13 bloqueantes');
  console.log('');

  for (const tc of testCases) {
    console.log(`▶ ${tc.label}`);

    let matrix;
    try {
      matrix = JSON.parse(fs.readFileSync(tc.fixture, 'utf8'));
    } catch (err) {
      console.log(`  ✗ FAIL · cannot read fixture: ${err.message}`);
      fail++;
      continue;
    }

    const checks = matrix.validation_checks;
    if (!Array.isArray(checks)) {
      console.log('  ✗ FAIL · matrix.validation_checks ausente o no es array');
      fail++;
      console.log('');
      continue;
    }

    const total = checks.length;
    const statuses = checks.reduce((acc, c) => {
      const s = c.status || 'MISSING';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const issues = [];
    if (total < tc.expected_min_checks) {
      issues.push(`count ${total} < expected min ${tc.expected_min_checks}`);
    }
    if ((statuses.PASS || 0) !== total) {
      issues.push(`not all PASS: ${JSON.stringify(statuses)}`);
    }
    const nonPass = checks.filter((c) => c.status !== 'PASS');
    if (nonPass.length > 0) {
      issues.push(
        `non-PASS checks: ${nonPass
          .map((c) => `#${c.id}(${c.name}=${c.status})`)
          .join(', ')}`
      );
    }

    if (issues.length === 0) {
      console.log(`  ✓ PASS · ${total}/${total} validation_checks status=PASS`);
      pass++;
    } else {
      console.log(`  ✗ FAIL · ${issues.length} issue(s)`);
      issues.forEach((iss, i) => console.log(`    [${i + 1}] ${iss}`));
      fail++;
    }
    console.log('');
  }

  console.log(`Summary: ${pass} passed · ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

main();
