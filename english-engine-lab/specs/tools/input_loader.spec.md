# F2.5 Tool Spec — input_loader

**Tool ID:** `input_loader`

**Kind:** helper · carga inputs canónicos run + Activity Cards

---

## Purpose

input_loader.py — Utilidad para cargar inputs canónicos de un run con validación.

Carga pm-0-context.json, pm-1-1.json, pm-1-2.json, pm-2-0.json, arquetipos-elegidos.json
desde un run y valida que existan los campos críticos antes de pasarlos a un subagente.

## Inputs (canonical)

- `run_id`
- `runs_dir`
- `guide_id`

## Outputs (canonical)

- `{pm0_context, pm11, pm12, pm20, activity_cards}`

## Dependencies

- None

## Validation metrics

- enriched gate validation
- fallback raíz si single-guía

## Source

`.claude/skills/fpi-sena-fase2/lib/input_loader.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
