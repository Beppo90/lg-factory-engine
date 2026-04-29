# F2.5 Tool Spec — Grammar · Structure Use

**Tool ID:** `subagente_pm_2_10_grammar`

**PM ID:** PM-2.10

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S3 (antecedente · productor para PM-2.4)

---

## Purpose

subagente_pm_2_10_grammar.py — Subagente CREATIVO PM-2.10 Grammar Structure Use.

Camino arquitectónico (2): Task tool con master prompt inyectado.
Master prompt PM-2.10 v2.0 · 5 arquetipos canónicos (A-E):
  - A — Inductive Discovery + Error Log (Discovery First obligatorio)
  - B — Error Log + Grammar Stations
  - C — Grammar Stations / Integrated Production
  - D — Grammar in Real Formats
  - E — (5° · ver master prompt)

PRODUCTOR de Grammar targets que PM-2.4 CONSUME (canon dependencia v1.2).
Se ejecuta en S3 (intro/discovery) y S5 (consolidación).

Sin dependencias previas en S3 · primer...

## Inputs (canonical)

- `pm-0-context (grammar_roadmap)`
- `pm-1-2`
- `pm-2-0`
- `context PM-2.3 (S2 grammar consolida)`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-10.json · 5 archetypes A-E + grammar_targets_for_pm24 (estructuras explícitas con IDs GT-S3-XX)`

## Dependencies

- None

## Feeds into

- PM-2.4

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- Bloom L3 ceiling strict
- grammar groups Intro+Consolida count canonical
- targets enumerated

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_10_grammar.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
