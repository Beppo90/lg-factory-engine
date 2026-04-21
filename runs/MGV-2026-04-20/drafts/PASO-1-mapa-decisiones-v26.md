---
title: PASO 1 — Mapa de Decisiones Canon v2.6
date: 2026-04-20
branch: mgv-g1-pre-rework
commit: 312d1d0
parent_main: cd82ffb
scope: 33 archivos cambiados en master-prompts/ entre main (canon previo) y 312d1d0 (canon v2.6)
---

# PASO 1 — Mapa de Decisiones Canon v2.6

**Para cada archivo → clasifica qué decisión arquitectónica introduce, para que tú decidas:**

- **KEEP** → la decisión es sólida y se queda en el canon
- **REVERT** → volver al estado en `main` (canon anterior)
- **REDO** → la idea es correcta pero la implementación está pobre — rehacer

---

## GRUPO A — Arquitectura nueva (7 archivos añadidos)

| # | Archivo | Decisión arquitectónica introducida | Dependencia de otros cambios | Tu decisión |
|---|---------|--------------------------------------|------------------------------|-------------|
| A1 | `PM-0 — CEFR Framework & Pedagogical Foundation.md` | Capa fundacional CEFR v1.1 + §10 `pm-0-context.json` como **artefacto de instancia por programa** (Fase 0). Fija alcance A1.1→A2.2, silabus 17 grupos gramaticales, principios §5.1–§5.13. | PM-1.1, PM-1.2, PM-2.0 dependen de esto. | ☐ KEEP ☐ REVERT ☐ REDO |
| A2 | `PM-1x — Program Configuration Template.md` | Plantilla para instanciar un programa nuevo (código SENA, horas totales, alcance CEFR, entorno laboral). Se copia y renombra `PM-1.[código] — [Programa].md`. | Usa PM-0 como referencia. | ☐ KEEP ☐ REVERT ☐ REDO |
| A3 | `PM-2.0 — RAP Session Architect.md` | Blueprint de 8 sesiones × 60h ANTES de PM-2.1–2.10. v2.6 añade **catálogo de 52 arquetipos pre-selección upfront por instructor**. | Depende de PM-0 + PM-1.2 (4 bloques v2.6). | ☐ KEEP ☐ REVERT ☐ REDO |
| A4 | `PM-2.11 — GFPI-F-134 Row Assembler.md` | Ensambla las 11 columnas de GFPI-F-134 con **14 checks estructurales**, incl. Check 13 (unicidad SHA256) y Check 14 (propagación de estrategias a pm-3-2-sX). | Depende de PM-2.0 + Activity Cards. | ☐ KEEP ☐ REVERT ☐ REDO |
| A5 | `Activity Card — Schema.md` | Schema del output estructurado que todo PM-2.x debe emitir. Contrato entre diseño (Fase 2) y ensamblaje (PM-2.11). | Consumido por PM-2.11. | ☐ KEEP ☐ REVERT ☐ REDO |
| A6 | `GFPI-F-134 — Data Contract.md` | Especificación de las 11 columnas de la matriz pedagógica SENA. Fuente de verdad para validaciones. | Referenciado por PM-1.2, PM-2.11. | ☐ KEEP ☐ REVERT ☐ REDO |
| A7 | `pm-0-cefr-foundation.docx` | Render binario de PM-0 (para compartir con co-instructores). | Derivado de A1. | ☐ KEEP ☐ REVERT ☐ REDO |

---

## GRUPO B — Promociones v2.6 (4 prompts con decisión arquitectónica pesada)

| # | Archivo | Decisión arquitectónica introducida | Riesgo si se mantiene | Tu decisión |
|---|---------|--------------------------------------|------------------------|-------------|
| B1 | `PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md` (v2.6) | **Regla `alineacion_1a1`**: cuando el programa tiene N RAPs pre-numerados (ej. MGV = 6 RAPs) → N bloques en vez de 5/10 estándar. Campo obligatorio `pm0_anchors_ref`. | Afecta a TODO nuevo programa. Si la regla no aplica siempre, hay que documentar cuándo usar `estandar` vs `alineacion_1a1`. | ☐ KEEP ☐ REVERT ☐ REDO |
| B2 | `PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md` (v2.6) | **Estructura 4-bloques canónicos**: Bloque 0 (identidad) + A (scope técnico) + B (scope lingüístico) + C (curación 3 fuentes). Rompe con estructura libre anterior. | Todos los pm-1-2.json existentes (DIESEL G1–G5, MGV G1) están bajo esta estructura. Revertir obliga a regenerar. | ☐ KEEP ☐ REVERT ☐ REDO |
| B3 | `PM-3.1 — Playbook Outline — Session Map.md` (v2.6) | **`pm0_alignment_by_session` promovido de extensión local MGV a canon**. Cierra BUG-PM31-001 (alineación PM-0 no renderizaba en DOCX). | Todos los pm-3-1.json existentes necesitarán este campo. | ☐ KEEP ☐ REVERT ☐ REDO |
| B4 | `PM-3.5 — Final Mission — Integrative Task.md` (v2.6) | **`activity_footer` obligatorio en las 5 sub-fases ABP** (PLAN/DESIGN/PERFORM/PRESENT/REFLECT). 6 campos: ambiente, estrategia, técnica, materiales, material_apoyo, duración. | Todos los pm-3-5.json existentes necesitan footer en 100% de actividades. | ☐ KEEP ☐ REVERT ☐ REDO |
| B5 | `PM-3.6 — GFPI-F-135 Integrator.md` (v2.6) | **Tres reglas nuevas 10/11/12**: (10) `activity_footer` obligatorio; (11) `contenido_inline` 7 tipos canónicos (reading_text, writing_model, audio_script, word_wall, mission_brief, planning_template, self_assessment); (12) **doble render** de apéndices (inline + índice consolidado). | Afecta el render del documento maestro para el aprendiz. Decisión de mayor peso visual/estructural. | ☐ KEEP ☐ REVERT ☐ REDO |

---

## GRUPO C — Promociones v2.5 / v2.4 (decisión media — ajustes de contrato)

| # | Archivo | Decisión introducida | Tu decisión |
|---|---------|----------------------|-------------|
| C1 | `DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md` (v2.6) | Índice de TODO lo anterior: añade §11 historial con las 6 mejoras, Principios 7 (activity_footer) y 8 (apéndices doble render). Sin este, los demás cambios no tienen marco. | ☐ KEEP ☐ REVERT ☐ REDO |
| C2 | `PM-3.2 — Playbook Build-Out — Step by Step.md` (v2.5) | Propaga estrategias didácticas (momento_sena + estrategia + técnica por bloque WHILE) desde pm-3-1.json. Reglas duras 9–11 (cross-reference PM-0). | ☐ KEEP ☐ REVERT ☐ REDO |
| C3 | `PM-3.3 — Canva Deck — Visual Support.md` (v2.4) | Contrato spec-driven (`pm-3-3-spec.json`). Elimina hardcoding del generador. Refactor del script pendiente. | ☐ KEEP ☐ REVERT ☐ REDO |
| C4 | `PM-4.1 — Instrumentos de Evaluación Formativa.md` (modificado + añadido NFD) | Refinamiento: RAP code 220501096 asignado, Lista de Chequeo N° 1 y 3 en vez de "Cuestionario" para E1/E3, canon 55 pts (E1–E5 = 25 + E6 = 25 + Misión Final = 5). **Nota: hay duplicado Unicode NFC vs NFD del archivo** — limpieza necesaria. | ☐ KEEP ☐ REVERT ☐ REDO |
| C5 | `PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md` (v2.0) | Cuestionario consolidado S6 = 25 pts (5 skills × 5 pts), no 50. RAP code 220501096. | ☐ KEEP ☐ REVERT ☐ REDO |
| C6 | `GFPI-F-135 — Data Contract.md` | Ajustes al contrato de datos de la Learning Guide oficial SENA. | ☐ KEEP ☐ REVERT ☐ REDO |
| C7 | `SISTEMA DE PROMPTS MAESTROS — Numeración, Soluciones y Nuevos Prompts.md` | Índice de numeración actualizado con los 7 archivos nuevos. | ☐ KEEP ☐ REVERT ☐ REDO |

---

## GRUPO D — Ajustes menores en PM-2.x (Activity Card emission)

Todos estos prompts reciben la misma decisión arquitectónica: **emitir una Activity Card estructurada** (schema en A5) para que PM-2.11 pueda ensamblar la fila GFPI-F-134.

| # | Archivo | Cambio resumen | Tu decisión |
|---|---------|----------------|-------------|
| D1 | `PM-2.1 — The Spark — Reflexión Inicial.md` | +66 líneas — emisión de Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D2 | `PM-2.2 — Gap Analysis — Contextualización.md` | +62 líneas — emisión de Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D3 | `PM-2.3 — Reading — The Master Anchor.md` | +83 líneas — Activity Card + reforzamiento HOTS | ☐ KEEP ☐ REVERT ☐ REDO |
| D4 | `PM-2.4 — Writing — Task-Based.md` | +80 líneas — Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D5 | `PM-2.5 — Literacy & Vocabulary Skills.md` | +87 líneas — Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D6 | `PM-2.6 — Listening — The Auditory Anchor.md` | +83 líneas — Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D7 | `PM-2.7 — Pronunciation — Speaking Skills.md` | +12 líneas — marca **DEPRECATED**, funcionalidad movida a PM-2.8 | ☐ KEEP ☐ REVERT ☐ REDO |
| D8 | `PM-2.8 — Speaking — The Mission.md` | +84 líneas — Activity Card + absorción de PM-2.7 (pronunciation scaffolding) | ☐ KEEP ☐ REVERT ☐ REDO |
| D9 | `PM-2.9 — Language Functions — Communicative Competence.md` | +80 líneas — Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D10 | `PM-2.10 — Grammar — Structure Use.md` | +75 líneas — Activity Card | ☐ KEEP ☐ REVERT ☐ REDO |
| D11 | `PM-3.4 — Workbook — Autonomous Work.md` | +17 líneas — pequeño ajuste de referencia (no decisión arquitectónica) | ☐ KEEP ☐ REVERT ☐ REDO |

---

## GRUPO E — Borrados (2 archivos)

| # | Archivo | Razón del borrado | Tu decisión |
|---|---------|-------------------|-------------|
| E1 | `ACTUALIZACIÓN — PM-4.2 al Sistema de Prompts Maestros.md` | Superseded — los cambios fueron absorbidos en PM-4.2 (C5) | ☐ KEEP DELETE ☐ UNDO DELETE |
| E2 | `PLAN DE PRUEBA DE FUEGO — INGLÉS MARÍTIMO Y PORTUARIO.md` | Plan de prueba obsoleto (corrido y cerrado) | ☐ KEEP DELETE ☐ UNDO DELETE |

---

## Resumen ejecutivo por peso arquitectónico

**Decisiones de alto peso (requieren tu atención)**:
- A1 (PM-0) — nuevo pilar fundacional
- B1 (PM-1.1 regla `alineacion_1a1`) — cambia reglas de instanciación para futuros programas
- B2 (PM-1.2 estructura 4-bloques) — cambia el output de toda Fase 1
- B5 (PM-3.6 reglas 10/11/12) — cambia render del documento del aprendiz
- C1 (DM v2.6) — índice; sin esto los cambios anteriores quedan huérfanos

**Decisiones de peso medio**:
- A3, A4 (PM-2.0, PM-2.11) — nuevos puntos de control en Fase 2
- B3 (PM-3.1 `pm0_alignment_by_session`) — resuelve bug real
- B4 (PM-3.5 activity_footer) — mejora trazabilidad
- C2, C3 (PM-3.2, PM-3.3) — propagación de estrategias + spec-driven

**Decisiones de bajo peso (ruido si se revierten)**:
- D1–D11 — emisión Activity Card en PM-2.x; son contratos de output, no cambios de contenido pedagógico
- C4, C5, C6, C7 — ajustes derivados

---

## Tu pregunta de decisión

Antes de tocar los 28 JSONs de G1 (Paso 2) o regenerar DOCX (Paso 3), necesito saber:

1. **¿Quieres revisar cada archivo 1 por 1** (leemos el diff contigo y decides), o
2. **¿Apruebas en bloque** los grupos D y C (bajo/medio peso) y revisamos solo A y B (alto peso)?

La opción 2 es ~12 archivos en vez de 33 — sin perder control sobre lo que importa.
