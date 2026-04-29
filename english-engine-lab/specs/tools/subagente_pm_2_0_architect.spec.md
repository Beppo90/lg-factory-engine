# F2.5 Tool Spec — RAP Session Architect

**Tool ID:** `subagente_pm_2_0_architect`

**PM ID:** PM-2.0

**Kind:** mechanical (Camino 1 · Python determinístico)

**Master prompt version:** 2.6

**Subagente version:** 1.1

**Phase:** PRE-Phase-2 (architect)

**Session:** all (blueprint)

---

## Purpose

subagente_pm_2_0_architect.py — Subagente mecánico PM-2.0 RAP Session Architect.

Genera Session Blueprint (8/12/16 sesiones según run · derivado de pm-1-1.sesiones_por_bloque)
+ catálogo de arquetipos (presentado al instructor en Gate Humano 1 — generación
delegada a subagente_pm_2_0_archetype_catalog.py).

Master prompt canónico: PM-2.0 v2.6 (verificación de versión obligatoria).
Camino arquitectónico: (1) Python determinístico · sin LLM.

Source of truth canónica para parámetros de blueprint (verificado 2026-04-28):
    pm-1-1.json.regla_bloques            ∈ {"alineacion_1a1", "absorcion_Na...

## Inputs (canonical)

- `pm-0-context.json`
- `pm-1-1.json`
- `pm-1-2.json (opt)`

## Outputs (canonical)

- `pm-2-0.json`

## Dependencies

- None

## Feeds into

- PM-2.1..2.10
- PM-2.11

## Validation metrics

- num_sessions match pm-1-1.sesiones_por_bloque
- sum hours == pm-1-1.horas_*_total
- human_adaptation_required flag if N≠8

## Source

`.claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_0_architect.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
