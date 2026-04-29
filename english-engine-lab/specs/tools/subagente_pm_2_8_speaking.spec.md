# F2.5 Tool Spec — Speaking · The Mission (incl PM-2.7 absorption)

**Tool ID:** `subagente_pm_2_8_speaking`

**PM ID:** PM-2.8

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S4 (mission · paralelo PM-2.6)

---

## Purpose

subagente_pm_2_8_speaking.py — Subagente CREATIVO PM-2.8 Speaking The Mission.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.8 v2.0 · 5 arquetipos canónicos (A-E · incluye pronunciation scaffolding):
  - A — Input + Model
  - B — Stock Cards + Preparation / Rehearsal + Scaffolding (chunk card drilling)
  - C — Live Performance (role play evaluado)
  - D — Pronunciation Scaffold (Chunk Cards)
  - E — (5° · ver master prompt)

NOTA: PM-2.7 deprecated · funcionalidad pronunciation absorbida en PM-2.8.
Paralelo a PM-2.6 en S4 (Listening + Speaking).
Producto...

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `context S2-S3 summary`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-8.json · 5 archetypes A-E + speaking_mission + pronunciation_scaffolding (PM-2.7 absorbida) + E4 Speaking 5pts`

## Dependencies

- None

## Feeds into

- PM-2.9

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- pronunciation_scaffolding._absorbed_from PM-2.7 presente
- rubric E4 5pts

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_8_speaking.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
