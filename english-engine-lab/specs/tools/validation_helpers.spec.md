# F2.5 Tool Spec — validation_helpers

**Tool ID:** `validation_helpers`

**Kind:** helper · helpers para 16 checks de PM-2.11

---

## Purpose

validation_helpers.py — Helpers para validaciones canónicas usadas por subagentes
de Fase 2 (especialmente PM-2.11 row assembler con sus 16 checks).

Implementa los checks 1-12 + 14-16 de PM-2.11 v2.6.3 (líneas 623-984).
Check 13 (anti-copia-fantasma) está en check_9_anti_copia.py por ser más complejo.

## Inputs (canonical)

- `Activity Cards`
- `pm20_blueprint (opt)`

## Outputs (canonical)

- `{check_id, name, status PASS/FAIL/SKIP, actual, expected, detail}`

## Dependencies

- None

## Validation metrics

- ramificación human_adaptation_required → SKIP

## Source

`.claude/skills/fpi-sena-fase2/lib/validation_helpers.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
