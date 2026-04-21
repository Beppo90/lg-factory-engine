#!/usr/bin/env node
/**
 * check-generator-parity.js — Canon v2.6.5
 *
 * Validador que protege la fuente única de verdad de renderizado de secciones.
 *
 * Compara la Sección 4 ("Planteamiento de Evidencias") tal como sale en:
 *   - pm-3-6-review.docx   (producido por gen_35_36_docx.js)
 *   - pm-3-6-FINAL-G1.docx (producido por gen_audit_docx.js)
 *
 * Ambos DEBEN extraer el mismo contenido para cada celda de la tabla 6×N,
 * porque ambos importan scripts/lib/render_seccion4_evidencias.js.
 *
 * Si hay drift (alguien volvió a escribir Sección 4 inline en un generador),
 * este check FALLA con el diff de la primera celda divergente.
 *
 * USO:
 *   node scripts/check-generator-parity.js
 *
 * EXIT CODES:
 *   0 = OK, ambos generadores coinciden
 *   1 = drift detectado
 *   2 = archivos faltantes (correr generadores primero)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RUN_DIR = path.resolve(__dirname, '..');
const REVIEW = path.join(RUN_DIR, 'pm-3-6-review.docx');
const FINAL  = path.join(RUN_DIR, 'pm-3-6-FINAL-G1.docx');

function die(code, msg) { console.error(msg); process.exit(code); }

if (!fs.existsSync(REVIEW)) die(2, `[MISS] ${REVIEW} — corre: node scripts/gen_35_36_docx.js`);
if (!fs.existsSync(FINAL))  die(2, `[MISS] ${FINAL} — corre: node scripts/gen_audit_docx.js`);

/**
 * Extrae el texto plano del document.xml dentro de un .docx
 */
function extractDocXml(docxPath) {
  const tmpDir = fs.mkdtempSync('/tmp/parity-');
  try {
    execSync(`unzip -q -o "${docxPath}" -d "${tmpDir}"`);
    return fs.readFileSync(path.join(tmpDir, 'word', 'document.xml'), 'utf8');
  } finally {
    execSync(`rm -rf "${tmpDir}"`);
  }
}

/**
 * Extrae el bloque de texto de Sección 4.
 * Empieza en el título SENA y termina al encontrar el título de Sección 5 / Glosario.
 */
function extractSeccion4Text(xml) {
  // Concatenar todos los <w:t>..</w:t>
  const runs = [];
  const re = /<w:t[^>]*>([^<]*)<\/w:t>/g;
  let m;
  while ((m = re.exec(xml)) !== null) runs.push(m[1]);
  const full = runs.join('\n');
  const startMarker = 'PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN';
  const endMarkers = ['5. Glossary of Key Terms', '5. Glosario'];
  const startIdx = full.indexOf(startMarker);
  if (startIdx < 0) return null;
  let endIdx = full.length;
  for (const em of endMarkers) {
    const i = full.indexOf(em, startIdx + startMarker.length);
    if (i > 0 && i < endIdx) endIdx = i;
  }
  return full.slice(startIdx, endIdx);
}

/**
 * Normaliza whitespace para comparar contenido, no formato.
 */
function normalize(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function main() {
  const reviewXml = extractDocXml(REVIEW);
  const finalXml  = extractDocXml(FINAL);

  const reviewS4 = extractSeccion4Text(reviewXml);
  const finalS4  = extractSeccion4Text(finalXml);

  if (!reviewS4) die(1, `[FAIL] No se encontró "PLANTEAMIENTO DE EVIDENCIAS" en ${path.basename(REVIEW)}`);
  if (!finalS4)  die(1, `[FAIL] No se encontró "PLANTEAMIENTO DE EVIDENCIAS" en ${path.basename(FINAL)}`);

  const rNorm = normalize(reviewS4);
  const fNorm = normalize(finalS4);

  // Comparar longitud y cortes por línea
  const rLines = reviewS4.split('\n').map(normalize).filter(Boolean);
  const fLines = finalS4.split('\n').map(normalize).filter(Boolean);

  // Diferencias esperadas (driven por shims de callout/note/quote — no son drift):
  //   - Review: `callout('📊 CANON DE PUNTUACIÓN', ...)` parte en LABEL + BODY
  //   - Final:  `quote(...)` deja una sola línea "CANON DE PUNTUACIÓN — ..."
  //   - Review: note() vs Final: note() — ambos renderizan "Derivado de:" pero
  //             con formato ligeramente distinto.
  // La regla de paridad operativa: validar que las FILAS DE EVIDENCIA de la tabla
  // coincidan exactamente (product names + criterios + técnica/instrumento).
  // El canon callout se valida por presencia, no por forma exacta.
  const allowedDiffPatterns = [
    /CANON DE PUNTUACIÓN/,
    /E1[-–]E5\s*\(Apropiación\)/,        // línea-cuerpo del canon, dividida en review
    /^E1[-–]E5/,
    /^Derivado de:/,
    /^Misión Final \(Transferencia/,
    /\(Apropiación\) = \d+ pts/,
  ];
  function isAllowedDiff(line) { return allowedDiffPatterns.some(re => re.test(line)); }

  const reviewSet = new Set(rLines);
  const finalSet  = new Set(fLines);

  const onlyInReview = rLines.filter(l => !finalSet.has(l) && !isAllowedDiff(l));
  const onlyInFinal  = fLines.filter(l => !reviewSet.has(l) && !isAllowedDiff(l));

  // Contar productos de evidencia: líneas que comienzan con "E1 — ", "E2 — " etc.
  const evidenceProductRe = /\bE[1-6]\s+[—-]\s+/g;
  const rRows = (reviewS4.match(evidenceProductRe) || []).length;
  const fRows = (finalS4.match(evidenceProductRe) || []).length;

  console.log(`[parity] review Sección 4: ${rLines.length} lines · ${rRows} productos de evidencia`);
  console.log(`[parity] final  Sección 4: ${fLines.length} lines · ${fRows} productos de evidencia`);

  let fail = false;

  // CHECK 1 — canon 55 pts presente en ambos (forma libre)
  const canonStr = 'Total canon = 55';
  if (!rNorm.includes(canonStr)) {
    console.error(`[FAIL] review no contiene "${canonStr}"`); fail = true;
  }
  if (!fNorm.includes(canonStr)) {
    console.error(`[FAIL] final no contiene "${canonStr}"`); fail = true;
  }

  // CHECK 2 — 6 evidencias formales presentes, con mismo nombre de producto
  if (rRows < 6 || fRows < 6) {
    console.error(`[FAIL] Número de productos de evidencia < 6 (review=${rRows} final=${fRows}, canon=6)`);
    fail = true;
  }

  if (onlyInReview.length > 0) {
    console.error(`[FAIL] Líneas SOLO en review (${onlyInReview.length}):`);
    onlyInReview.slice(0, 5).forEach(l => console.error(`   review> ${l.slice(0, 160)}`));
    fail = true;
  }
  if (onlyInFinal.length > 0) {
    console.error(`[FAIL] Líneas SOLO en final (${onlyInFinal.length}):`);
    onlyInFinal.slice(0, 5).forEach(l => console.error(`   final>  ${l.slice(0, 160)}`));
    fail = true;
  }

  if (fail) {
    console.error('');
    console.error('🛑 DRIFT DETECTADO — la Sección 4 no está usando el renderer compartido.');
    console.error('   Ambos gen_35_36_docx.js y gen_audit_docx.js deben llamar a');
    console.error('   renderSeccion4Evidencias() desde scripts/lib/render_seccion4_evidencias.js');
    console.error('   Ver PM-3.6 REGLA 20 y DM v2.6.5.');
    process.exit(1);
  }

  console.log('');
  console.log('✅ PARITY OK — review y final coinciden en Sección 4.');
  console.log(`   Canon v2.6.5 Shared Renderer Pattern funcionando correctamente.`);
}

main();
