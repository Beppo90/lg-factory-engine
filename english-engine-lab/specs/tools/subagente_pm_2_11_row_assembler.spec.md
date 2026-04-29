# F2.5 Tool Spec — GFPI-F-134 Row Assembler

**Tool ID:** `subagente_pm_2_11_row_assembler`

**PM ID:** PM-2.11

**Kind:** mechanical (Camino 1 · Python determinístico)

**Master prompt version:** 2.6.3

**Subagente version:** 1.0

**Phase:** POST-Phase-2 (assembler)

**Session:** all (row)

---

## Purpose

subagente_pm_2_11_row_assembler.py — Subagente mecánico PM-2.11 GFPI-F-134 Row Assembler.

Ensambla la fila completa GFPI-F-134 (11 columnas) desde:
- Las 9 Activity Cards (PM-2.1 a PM-2.10)
- Cols 1-5 GFPI de PM-1.2
- Session Blueprint de PM-2.0

Ejecuta los 16 checks canónicos de PM-2.11 v2.6.3 (líneas 623-984):
- Checks 1-12: validaciones originales v2.0
- Check 13: CHECK 9 anti-copia-fantasma (delegado a check_9_anti_copia.py)
- Check 14: propagación estrategias didácticas
- Check 15: footer correcto en Activity Cards
- Check 16: Activity Card schema v2.6.3 conforme

Master prompt canónico...

## Inputs (canonical)

- `9 Activity Cards (PM-2.1 a PM-2.10 sin 2.7)`
- `pm-1-2.json`
- `pm-2-0.json`

## Outputs (canonical)

- `pm-2-11.json (GFPI-F-134 row 11 cols)`
- `pm-2-validation-report.json (16 checks)`

## Dependencies

- PM-2.0..2.10

## Feeds into

- Phase 3 (PM-3.x)

## Human Gates

- 16 checks PASS canonical (incl CHECK 9 anti-copia-fantasma)

## Validation metrics

- ready_for_phase_3 boolean
- pass/fail/skip counts

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_11_row_assembler.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
