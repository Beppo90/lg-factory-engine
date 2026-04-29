# F2.5 Tool Spec — Vocabulary · Literacy & Scenario Setup

**Tool ID:** `subagente_pm_2_5_vocabulary`

**PM ID:** PM-2.5

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S2 (consumidor de PM-2.3)

---

## Purpose

subagente_pm_2_5_vocabulary.py — Subagente CREATIVO PM-2.5 Literacy & Vocabulary Skills.

Camino arquitectónico (2): Task tool con master prompt inyectado · NO Python determinístico.

CONSUMIDOR del Master Anchor Text generado por PM-2.3 (dependencia canon).
Sin pm-2-3.json del mismo run/guide previamente generado, este subagente NO debe lanzarse
(o el bundle se construirá con previous_pms = None · Activity Card resultante será incoherente).

5 arquetipos canónicos (modo extensible):
- A — Word Wall + Phonics
- B — Vocabulary Development + Juego (flashcards + categorías)
- C — Reading Fluency
...

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `PM-2.3 output (Master Anchor + Toolbelt)`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-5.json · 5 archetypes A-E + Toolbelt enriched 20 terms con pronunciation_for_spanish`

## Dependencies

- PM-2.3

## Feeds into

- PM-2.4
- PM-2.9

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- 20/20 toolbelt overlap with PM-2.3
- pronunciation_for_spanish presente

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_5_vocabulary.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
