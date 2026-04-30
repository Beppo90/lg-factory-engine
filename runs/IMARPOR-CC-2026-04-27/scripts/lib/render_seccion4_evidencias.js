/**
 * render_seccion4_evidencias.js
 *
 * CANON v2.6.5 — Shared Renderer Pattern (Fuente Única de Verdad)
 *
 * Este módulo es la UNICA implementación canónica del render de la Sección 4
 * "Planteamiento de Evidencias de Aprendizaje para la Evaluación en el Proceso
 * Formativo" (formato SENA GFPI-F-135, tabla 6 columnas × N filas).
 *
 * Ambos generadores DOCX del pipeline MGV lo importan y usan:
 *   - gen_35_36_docx.js (review rápido sin portada audit)
 *   - gen_audit_docx.js (FINAL con portada branded)
 *
 * REGLA v2.6.5 (ver PM-3.6 REGLA 20): ningún generador puede tener una
 * implementación propia de Sección 4. Si se necesita variante, se agrega un
 * parámetro al contrato de este módulo, no una copia divergente.
 *
 * Contrato:
 *   Input:  data (objeto con seccion_4_planteamiento_evidencias), ctx (deps inyectadas)
 *   Output: Array de Paragraph/Table/TableRow/TableCell listos para Document.children
 *
 * ctx debe incluir:
 *   - docx:     { Paragraph, TextRun, Table, TableRow, TableCell,
 *                 AlignmentType, WidthType, ShadingType }
 *   - palette:  { ORANGE, WHITE, GREY, CREAM, CONTENT_W }
 *   - helpers:  { P, H1, H2, H3, cell, kv, quote, note, makeTable, pageBreak }
 *
 * El llamador puede pasar paletas distintas (ORANGE del audit vs del review)
 * pero la ESTRUCTURA de celdas debe ser idéntica.
 */

'use strict';

function renderSeccion4Evidencias(data, ctx) {
  const s4 = (data && data.seccion_4_planteamiento_evidencias) || {};
  const {
    docx: { Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, ShadingType },
    palette: { ORANGE, WHITE, GREY, CREAM = 'E8F5E3', CONTENT_W = 10080 },
    helpers: { P, H1, H2, H3, cell, kv, quote, note, makeTable, pageBreak },
  } = ctx;

  const out = [];

  // --- Salto de página + título formal SENA ---
  out.push(pageBreak());
  out.push(H1(s4.titulo_formal || '4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO'));
  if (s4.titulo_aprendiz) out.push(H2(s4.titulo_aprendiz));
  if (s4.introduccion) out.push(P(s4.introduccion));

  // --- Schema nuevo v2.6.4+: tabla 6 columnas × N filas ---
  if (Array.isArray(s4.columnas) && Array.isArray(s4.filas_evidencia)) {
    const s4W = [1200, 1500, 2200, 1600, 2100, 1480]; // DXA widths, sum ~ CONTENT_W 10080

    const orangeHeaderCell = (txt, width) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: String(txt), font: 'Calibri', size: 18, bold: true, color: WHITE })],
        alignment: AlignmentType.CENTER,
      })],
      width: { size: width, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: ORANGE, color: 'auto' },
      margins: { top: 120, bottom: 120, left: 100, right: 100 },
    });

    const dashCell = (width) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: '—', font: 'Calibri', size: 20, color: GREY })],
        alignment: AlignmentType.CENTER,
      })],
      width: { size: width, type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
    });

    const blankCell = (width, fill) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: ' ', font: 'Calibri', size: 18 })] })],
      width: { size: width, type: WidthType.DXA },
      shading: fill ? { type: ShadingType.CLEAR, fill: fill, color: 'auto' } : undefined,
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
    });

    const rows = [
      new TableRow({
        tableHeader: true,
        children: s4.columnas.map((h, i) => orangeHeaderCell(h, s4W[i])),
      }),
    ];

    for (const f of s4.filas_evidencia) {
      const hasEvidence = !!f.evidencia;
      const rowFill = hasEvidence ? CREAM : undefined;
      rows.push(new TableRow({
        children: [
          blankCell(s4W[0], rowFill),                                                          // col 1 — Fase PF (manual)
          blankCell(s4W[1], rowFill),                                                          // col 2 — Actividad PF (manual)
          cell(f.actividad_aprendizaje || '—', s4W[2], { bold: hasEvidence, fill: rowFill }),  // col 3 — Actividad de aprendizaje
          hasEvidence ? cell(f.evidencia, s4W[3], { bold: true, fill: rowFill }) : dashCell(s4W[3]),
          hasEvidence ? cell(f.criterios, s4W[4], { fill: rowFill }) : dashCell(s4W[4]),
          hasEvidence ? cell(f.tecnica_instrumento, s4W[5], { fill: rowFill }) : dashCell(s4W[5]),
        ],
      }));
    }

    out.push(new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      rows: rows,
    }));

    // Nota canon de puntuación
    if (s4.canon_reference) {
      const cr = s4.canon_reference;
      const misionFinalPts = cr['misión_final_pts'] ?? cr.mision_final_pts ?? 5;
      const misionFinalNota = cr['misión_final_nota'] ?? cr.mision_final_nota ?? '';
      out.push(P(' '));
      out.push(quote(
        `CANON DE PUNTUACIÓN — E1-E5 (Apropiación) = ${cr.e1_a_e5_pts} pts · ` +
        `E6 (Cuestionario Consolidado, Sesión 6) = ${cr.e6_pts} pts · ` +
        `Misión Final (Transferencia, Sesión 7-8) = ${misionFinalPts} pts. ` +
        `Total canon = ${cr.total_canon} pts. ${misionFinalNota}`
      ));
    }
    if (s4.derived_from) {
      const df = Array.isArray(s4.derived_from) ? s4.derived_from.join(' · ') : s4.derived_from;
      out.push(note(`Derivado de: ${df}`));
    }

    return out;
  }

  // --- Fallback legacy v2.6.3 (schema {evidencias[], tabla_resumen_canon_55, ...}) ---
  // Se mantiene por retrocompatibilidad con runs previos. Los runs nuevos DEBEN usar
  // el schema v2.6.4+ (columnas + filas_evidencia).
  if (Array.isArray(s4.evidencias)) {
    const legacyRows = s4.evidencias.map(e => [
      e.codigo || '—',
      e.nombre_aprendiz || e.nombre || '—',
      e.tipo_sena || '—',
      e.puntaje_canon || (e.puntos != null ? String(e.puntos) + ' pts' : '—'),
      e.cuando_se_genera || e.sesion || '—',
    ]);
    out.push(makeTable(['Código', 'Nombre', 'Tipo SENA', 'Puntaje', 'Cuándo'], legacyRows, [900, 3200, 1800, 1900, 2280]));
    for (const e of s4.evidencias) {
      out.push(H3(`${e.codigo || ''} — ${e.nombre_aprendiz || e.nombre || ''}`));
      if (e.que_es) out.push(kv('Qué es', e.que_es));
      if (e.cuando_se_genera) out.push(kv('Cuándo se genera', e.cuando_se_genera));
      if (e.como_se_evalua) out.push(kv('Cómo se evalúa', e.como_se_evalua));
      if (e.puntaje_canon) out.push(kv('Puntaje', e.puntaje_canon));
      if (e.tipo_sena) out.push(kv('Tipo SENA', e.tipo_sena));
      for (const [k, v] of Object.entries(e)) {
        if (['codigo', 'nombre_aprendiz', 'nombre', 'que_es', 'cuando_se_genera', 'como_se_evalua', 'puntaje_canon', 'tipo_sena'].includes(k)) continue;
        out.push(kv(k.replaceAll('_', ' '), Array.isArray(v) ? v.join(' · ') : (typeof v === 'object' ? JSON.stringify(v) : String(v))));
      }
    }
    return out;
  }

  // --- Último fallback: volcar campos restantes como kv ---
  for (const [k, v] of Object.entries(s4)) {
    if (['titulo_aprendiz', 'titulo_formal', 'introduccion', 'canon_reference', 'derived_from',
         'columnas', 'filas_evidencia', 'total_actividades', 'total_evidencias_formales'].includes(k)) continue;
    out.push(kv(k.replaceAll('_', ' '), typeof v === 'string' ? v : JSON.stringify(v)));
  }
  return out;
}

module.exports = { renderSeccion4Evidencias };
