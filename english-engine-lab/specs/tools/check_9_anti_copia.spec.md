# F2.5 Tool Spec — check_9_anti_copia

**Tool ID:** `check_9_anti_copia`

**Kind:** helper · CHECK 9 anti-copia-fantasma (DM v2.4+)

---

## Purpose

check_9_anti_copia.py — Implementación canónica del CHECK 9 anti-copia-fantasma
del DOCUMENTO MAESTRO §10 (= Check 13 de PM-2.11 v2.6.3).

Compara archivos pm-2-X.json byte-a-byte (excluyendo run_id) entre:
1. Guías del MISMO run (g1.pm-2-X vs g2.pm-2-X)
2. MISMA guía entre runs distintos (NEW.g1.pm-2-X vs MGV-04-20.g1.pm-2-X)

Si encuentra coincidencia byte-idéntica: FAIL (bug copia-fantasma activo).

Bug histórico que previene: DIESEL G3-G5 (2026-04-18) — pm-2-3, pm-2-5, pm-2-6
byte-idénticos entre G3, G4 y G5 del mismo run · contenido pedagógico cruzado.

## Inputs (canonical)

- `Activity Cards`
- `ref_run_dirs`

## Outputs (canonical)

- `{status, hashes_3_signals, byte_identical_warnings}`

## Dependencies

- None

## Validation metrics

- SHA strict + whitespace_normalized + diff (3 señales)

## Source

`.claude/skills/fpi-sena-fase2/lib/check_9_anti_copia.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
