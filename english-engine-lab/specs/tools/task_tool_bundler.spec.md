# F2.5 Tool Spec — task_tool_bundler

**Tool ID:** `task_tool_bundler`

**Kind:** helper · orquestador Camino 2

---

## Purpose

task_tool_bundler.py — Helper compartido para construir bundles de invocación
canónica del Task tool · Camino arquitectónico (2) para subagentes creativos.

Cada subagente creativo (PM-2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10) usa
este helper para preparar el bundle que el orquestador (Claude) lanza vía Task tool.

El bundle contiene TODO lo que el subagente necesita:
- master prompt completo (texto inyectado · NO path)
- inputs estructurados (pm-0-context, pm-1-2, pm-2-0)
- estilo declarado por instructor (mgv_compendio_metodologico vs diesel_secuencia_encadenada)
- arquetipos seleccionad...

## Inputs (canonical)

- `pm_id`
- `run_id`
- `runs_dir`
- `master_prompts_dir`
- `repo_root`
- `guide_id`

## Outputs (canonical)

- `bundle dict {prompt, expected_output_file, validation_post_hoc, ...}`

## Dependencies

- master_prompt_loader
- input_loader

## Validation metrics

- bundle size chars
- estilo declarado
- ref_op cargado correctamente
- ramificación mgv vs diesel

## Source

`.claude/skills/fpi-sena-fase2/lib/task_tool_bundler.py`

---
*F2.5 Tool Spec · auto-generado 2026-04-29 desde código real*
