# F2.5 Tool Spec — Instrumentos de Evaluación Formativa

**Tool ID:** `subagente_pm_4_1_instruments`

**PM ID:** PM-4.1

**Kind:** mechanical (Camino 1 · Python determinístico)

**Master prompt version:** 2.6.5

**Subagente version:** 1.0

**Phase:** Phase 3 (instruments)

**Session:** all (derivado)

---

## Purpose

subagente_pm_4_1_instruments.py — Subagente mecánico PM-4.1 Instrumentos de Evaluación.

Deriva 6 instrumentos de evaluación formativa desde las Activity Cards de S2-S5
+ framework del Cuestionario S6.

Master prompt canónico: PM-4.1 v2.6.4 (verificación de versión obligatoria).
Camino arquitectónico: (1) Python con plantillas determinísticas.

Los 6 instrumentos canónicos (PM-4.1 §145-208):
1. Cuestionario de Reading (Evidencia de Conocimiento) — desde PM-2.3 · 5 pts
2. Lista de Verificación de Writing (Evidencia de Producto) — desde PM-2.4 · 5 pts
3. Lista de Chequeo de Listening (Evidencia ...

## Inputs (canonical)

- `Activity Cards con evidence formal`
- `pm-2-0.json`

## Outputs (canonical)

- `pm-4-1.json (6 instrumentos)`

## Dependencies

- PM-2.3
- PM-2.4
- PM-2.6
- PM-2.8
- PM-2.9

## Feeds into

- PM-3.6 GFPI-F-135

## Validation metrics

- 6 instrumentos derivados
- cobertura E1-E6

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_4_1_instruments.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
