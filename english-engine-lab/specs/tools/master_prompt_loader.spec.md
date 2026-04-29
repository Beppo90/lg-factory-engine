# F2.5 Tool Spec — master_prompt_loader

**Tool ID:** `master_prompt_loader`

**Kind:** helper · cargador master prompt + verificación versión

---

## Purpose

master_prompt_loader.py — Utilidad compartida para cargar master prompts canónicos
con verificación de versión en frontmatter.

Implementa REGLA 19 PASO operacional: antes de generar, leer el master prompt
correspondiente Y verificar que la versión coincide con la canónica vigente.

Versiones canónicas vigentes (al 2026-04-29):
  PM-2.0 == 2.6
  PM-2.1 == 3.0  (canonizada Opción A)
  PM-2.2 == 3.0  (canonizada Opción A)
  PM-2.3 a PM-2.10 == 2.0
  PM-2.11 == 2.6.3
  PM-4.1 == 2.6.4 (o vigente · verificar)
  PM-4.2 == vigente

## Inputs (canonical)

- `pm_id`
- `master_prompts_dir`
- `strict_version`

## Outputs (canonical)

- `{text, version, size_bytes, pm_id}`

## Dependencies

- None

## Validation metrics

- version match VERSIONES_VIGENTES table

## Source

`.claude/skills/fpi-sena-fase2/lib/master_prompt_loader.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
