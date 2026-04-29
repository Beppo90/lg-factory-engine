# F2.5 Tool Spec — Writing · Task-Based

**Tool ID:** `subagente_pm_2_4_writing`

**PM ID:** PM-2.4

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S3 (consumidor de PM-2.10)

---

## Purpose

subagente_pm_2_4_writing.py — Subagente CREATIVO PM-2.4 Writing Task-Based.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.4 v2.0 · 5 arquetipos canónicos (A-E):
  - A — Genre Analysis
  - B — Modeled Writing
  - C — Collaborative TBLT / Independent Writing Task
  - D — (4° · ver master prompt)
  - E — Genre-Based Peer Review

CONSUMIDOR de PM-2.10 (Grammar targets · canon dependencia v1.2).
Productor de E2 Writing (5 pts · evidencia formal).

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `PM-2.10 output (Grammar Targets)`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-4.json · E2 Writing 5pts + writing_product_specification + grammar_targets_consumed_from_pm210`

## Dependencies

- PM-2.10

## Feeds into

- PM-2.5
- PM-2.9

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- 7/7 grammar targets consumed
- genre maritime/sectorial coherente
- rubric E2 5pts

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_4_writing.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
