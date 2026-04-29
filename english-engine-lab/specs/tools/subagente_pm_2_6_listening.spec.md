# F2.5 Tool Spec — Listening · The Auditory Anchor

**Tool ID:** `subagente_pm_2_6_listening`

**PM ID:** PM-2.6

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S4 (anchor · paralelo PM-2.8)

---

## Purpose

subagente_pm_2_6_listening.py — Subagente CREATIVO PM-2.6 Listening Auditory Anchor.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.6 v2.0 · 6 arquetipos canónicos (A-F):
  - A — Micro-Skills Foundation / Scene Setup
  - B — Phase-Based Framework (Pre/While/Post)
  - C — TBLT Listening (Task-Based)
  - D — Bloom Progression (Cognitive Scaling) / Role play
  - E — Advanced Techniques (Shadowing + Dictogloss + Predictive)
  - F — Multimedia Production (Audio → Creative Output)

Story B asignada por PM-1.2 (Listening script).
Paralelo a PM-2.8 en S4 (Listeni...

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2`
- `pm-2-0`
- `context S2-S3 summary`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-6.json · 6 archetypes A-F + listening_anchor_dialogue + E3 Listening 5pts`

## Dependencies

- None

## Feeds into

- PM-2.9

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- dialogue word_count appropriate
- genre auténtico (VHF / briefing / podcast)
- rubric E3 5pts

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_6_listening.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
