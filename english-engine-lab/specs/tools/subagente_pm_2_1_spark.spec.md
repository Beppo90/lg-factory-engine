# F2.5 Tool Spec — The Spark · Reflexión Inicial

**Tool ID:** `subagente_pm_2_1_spark`

**PM ID:** PM-2.1

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 3.0 (2 modos canonizados)

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S1 (entrada)

---

## Purpose

subagente_pm_2_1_spark.py — Subagente CREATIVO PM-2.1 The Spark · Reflexión Inicial.

Camino arquitectónico (2): Task tool con master prompt inyectado · NO Python determinístico.
Master prompt PM-2.1 v3.0 canonizada Opción A 2026-04-28 · 2 modos canonizados:
  - mgv_compendio_metodologico (DEFAULT) · 1 arquetipo NARRATIVE_SCENARIO + estructura EXPLORE/ENGAGE/DISCOVER
  - diesel_secuencia_encadenada (EXTENSIBLE) · 4 arquetipos secuencia encadenada (A Visual · B Story · C News · D Debate)

Sin dependencias previas (PM-2.1 es primer Spark de S1 · activa motivación).
Alimenta a PM-2.2 (Gap Analysi...

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-1.json (Activity Card)`

## Dependencies

- None

## Feeds into

- PM-2.2

## Human Gates

- Gate Humano 1: arquetipo seleccionado
- Gate Humano 2: enriched=true

## Validation metrics

- estilo_aplicado correcto
- archetype_mode correcto
- CEFR strict
- CHECK 9 hash distinct

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_1_spark.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
