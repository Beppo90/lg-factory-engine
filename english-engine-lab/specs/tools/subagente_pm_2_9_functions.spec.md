# F2.5 Tool Spec — Language Functions · Communicative Competence

**Tool ID:** `subagente_pm_2_9_functions`

**PM ID:** PM-2.9

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S5 (integrativo)

---

## Purpose

subagente_pm_2_9_functions.py — Subagente CREATIVO PM-2.9 Language Functions.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.9 v2.0 · 5 arquetipos canónicos (A-E):
  - A — Function Map (Communication Map + clasificación)
  - B — Function Drills / Persuasion & Argumentation
  - C — Integrated Simulation + Synthesis / Social & Interpersonal
  - D — Synthesis Card + Quiz Preview / Gamified Functions
  - E — Academic & Discourse

Único en S5 (sin paralelo dentro de la sesión).
Productor de E5 Language Functions (5 pts · evidencia formal).

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `context S2-S4 (5 outputs slim)`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-9.json · 5 archetypes A-E + functions_F1_to_F5 + E5 Language Functions 5pts`

## Dependencies

- PM-2.3..2.6
- PM-2.8
- PM-2.10

## Feeds into

- PM-2.11
- PM-4.2

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- F1-F5 cubiertas (5/5)
- 8 previous_pms
- rubric E5 5pts

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_9_functions.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
