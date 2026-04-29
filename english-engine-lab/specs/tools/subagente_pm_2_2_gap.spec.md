# F2.5 Tool Spec — Gap Analysis · Contextualización

**Tool ID:** `subagente_pm_2_2_gap`

**PM ID:** PM-2.2

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 3.0 (2 modos canonizados)

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S1 (salida)

---

## Purpose

subagente_pm_2_2_gap.py — Subagente CREATIVO PM-2.2 Gap Analysis · Contextualización.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.2 v3.0 canonizada Opción A 2026-04-28 · 2 modos canonizados:
  - mgv_compendio_metodologico (DEFAULT) · 1 arquetipo THE_MIRROR + estructura WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT
  - diesel_secuencia_encadenada (EXTENSIBLE) · 4 arquetipos (A KWL · B Diagnosis visual · C Gap card · D Peer interview)

CONSUMIDOR de PM-2.1 (Spark activa motivación · Gap diagnostica gaps).

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `PM-2.1 output (Spark)`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-2.json (Activity Card)`

## Dependencies

- PM-2.1

## Feeds into

- PM-2.3
- PM-2.5

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- cadena PM-2.1 referenciada
- WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT presentes (mgv)

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_2_gap.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
