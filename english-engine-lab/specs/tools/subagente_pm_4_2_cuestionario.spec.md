# F2.5 Tool Spec — Cuestionario Técnico S6 Consolidado

**Tool ID:** `subagente_pm_4_2_cuestionario`

**PM ID:** PM-4.2

**Kind:** mechanical (Camino 1 · Python determinístico)

**Master prompt version:** 2.6.5

**Subagente version:** 1.0

**Phase:** Phase 3 (assessment)

**Session:** S6 (consolidado)

---

## Purpose

subagente_pm_4_2_cuestionario.py — Subagente mecánico PM-4.2 Cuestionario Técnico S6.

Ensambla el Cuestionario Consolidado S6 (Evidencia de Conocimiento sumativa):
- 5 secciones × 5 puntos = 25 puntos totales
- 25 ítems × 1 punto cada uno
- Distribución: Reading 5 + Writing 5 + Listening 5 + Vocabulary 5 + Grammar 5
- Principio de Tres Versiones (Apropiación → Evaluación → Transferencia · canon PM-4.2)

Master prompt canónico: PM-4.2 (verificación de versión obligatoria).
Camino arquitectónico: (1) Python con consolidación algorítmica.

Inputs:
- pm-4-1.json (framework del Cuestionario S6)
- ...

## Inputs (canonical)

- `Activity Cards S2-S5`
- `pm-1-2.key_vocabulary`

## Outputs (canonical)

- `pm-4-2.json (25 pts · 5 skills × 5 pts)`

## Dependencies

- PM-2.3..2.6
- PM-2.8..2.10

## Feeds into

- PM-3.6

## Validation metrics

- 25 puntos total
- 25 ítems
- 5 skills × 5 pts

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_4_2_cuestionario.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
