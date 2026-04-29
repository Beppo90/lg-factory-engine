# F2.5 Tool Spec — Reading · The Master Anchor & HOTS

**Tool ID:** `subagente_pm_2_3_reading_anchor`

**PM ID:** PM-2.3

**Kind:** creative (Camino 2 · Task tool subagent)

**Master prompt version:** 2.0

**Subagente version:** 1.0

**Phase:** Phase 2

**Session:** S2 (anchor)

---

## Purpose

subagente_pm_2_3_reading_anchor.py — Subagente CREATIVO PM-2.3 Reading: The Master Anchor.

Camino arquitectónico (2): Task tool con master prompt inyectado · NO Python determinístico.

Este subagente NO genera Activity Card directamente · usa task_tool_bundler.py para
PREPARAR el bundle que el orquestador (Claude) lanza vía Task tool en runtime.

Productor del Master Anchor Text (PM-2.3 master prompt §70-86) que PM-2.5 consume.

6 arquetipos canónicos (modo extensible):
- A — TBLT CYCLE
- B — COMPREHENSION STRATEGIES
- C — INFORMATION GAP
- D — COOPERATIVE
- E — MULTIMODAL
- F — HOTS FOCUS

M...

## Inputs (canonical)

- `pm-0-context`
- `pm-1-2 (incl key_vocabulary 20 terms)`
- `pm-2-0`
- `arquetipos-elegidos.json`

## Outputs (canonical)

- `pm-2-3.json · Master Anchor Text 150-200 palabras + Toolbelt 20 terms × 5 cats + 6 archetypes A-F`

## Dependencies

- None

## Feeds into

- PM-2.5
- PM-2.6
- PM-2.4 (via grammar)

## Human Gates

- Gate Humano 1
- Gate Humano 2

## Validation metrics

- word_count 150-200
- vocabulary coverage ≥12/20
- CEFR strict
- genre auténtico

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_3_reading_anchor.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
