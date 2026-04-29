# F2.5 Tool Specs — FPI CD Engine · skill `fpi-sena-fase2`

**Generado:** 2026-04-29
**Total tools:** 18 (13 subagentes + 5 helpers)
**Source skill:** `.claude/skills/fpi-sena-fase2/`

Este directorio documenta las **APIs reales** de cada subagente/helper de la skill `fpi-sena-fase2`. Es el artefacto SDD F2 (Software Design Document Fase 2) que describe lo que cada herramienta consume, produce, y bajo qué validaciones opera.

## Mapa de Tools

### Subagentes mecánicos (Camino 1 · Python determinístico)

| Tool | PM | Phase / Session | Kind |
|---|---|---|---|
| [subagente_pm_2_0_architect](subagente_pm_2_0_architect.spec.md) | PM-2.0 | PRE-Phase-2 | architect |
| [subagente_pm_2_11_row_assembler](subagente_pm_2_11_row_assembler.spec.md) | PM-2.11 | POST-Phase-2 | assembler · 16 checks |
| [subagente_pm_4_1_instruments](subagente_pm_4_1_instruments.spec.md) | PM-4.1 | Phase 3 | derivador · 6 instrumentos |
| [subagente_pm_4_2_cuestionario](subagente_pm_4_2_cuestionario.spec.md) | PM-4.2 | Phase 3 | ensamblador Quiz S6 25pts |

### Subagentes creativos (Camino 2 · Task tool con master prompt inyectado)

| Tool | PM | Session | Productor / Consumidor |
|---|---|---|---|
| [subagente_pm_2_1_spark](subagente_pm_2_1_spark.spec.md) | PM-2.1 | S1 entrada | productor |
| [subagente_pm_2_2_gap](subagente_pm_2_2_gap.spec.md) | PM-2.2 | S1 salida | consumidor PM-2.1 |
| [subagente_pm_2_3_reading_anchor](subagente_pm_2_3_reading_anchor.spec.md) | PM-2.3 | S2 anchor | productor (Master Anchor) |
| [subagente_pm_2_5_vocabulary](subagente_pm_2_5_vocabulary.spec.md) | PM-2.5 | S2 | consumidor PM-2.3 |
| [subagente_pm_2_10_grammar](subagente_pm_2_10_grammar.spec.md) | PM-2.10 | S3 antecedente | productor (Grammar Targets) |
| [subagente_pm_2_4_writing](subagente_pm_2_4_writing.spec.md) | PM-2.4 | S3 consumidor | consumidor PM-2.10 |
| [subagente_pm_2_6_listening](subagente_pm_2_6_listening.spec.md) | PM-2.6 | S4 anchor | productor (paralelo PM-2.8) |
| [subagente_pm_2_8_speaking](subagente_pm_2_8_speaking.spec.md) | PM-2.8 | S4 mission | productor (incluye PM-2.7 absorption) |
| [subagente_pm_2_9_functions](subagente_pm_2_9_functions.spec.md) | PM-2.9 | S5 integrativo | consumidor S2-S4 |

### Helpers (lib/)

| Tool | Role |
|---|---|
| [task_tool_bundler](task_tool_bundler.spec.md) | Orquestador Camino 2 · ramificación mgv vs diesel |
| [master_prompt_loader](master_prompt_loader.spec.md) | Cargador master prompt + verificación versión |
| [input_loader](input_loader.spec.md) | Carga inputs canónicos run + Activity Cards |
| [check_9_anti_copia](check_9_anti_copia.spec.md) | CHECK 9 anti-copia-fantasma (DM v2.4+) |
| [validation_helpers](validation_helpers.spec.md) | Helpers para 16 checks de PM-2.11 |

## Dependency Graph (Phase 2 chain)

```
PM-2.0 architect ──→ blueprint
                       │
                       ▼
            ┌── PM-2.1 (S1 entrada)
            ▼
            PM-2.2 (S1 salida)
            │
            ▼
PM-2.3 ──productor──→ PM-2.5 (S2)
            │
            ▼
PM-2.10 ──productor──→ PM-2.4 (S3 cross-half)
            │
            ▼
PM-2.6 ║ PM-2.8 (S4 paralelo)
            │
            ▼
PM-2.9 (S5 integra todo S2-S4)
            │
            ▼
PM-2.11 row assembler ──→ GFPI-F-134 row + 16 checks
                              │
                              ▼
                          [Phase 3 gates]
PM-4.1 instruments + PM-4.2 cuestionario S6 (en paralelo)
```

## Ramificación canónica del bundler

Cada subagente creativo ramifica según `arquetipos-elegidos.json[pm_id].estilo`:

- **`mgv_compendio_metodologico`** (default) → Activity Card con `integration_all_archetypes_policy` + `content.archetype_X_NAME` (uno por arquetipo · tipo menú metodológico)
- **`diesel_secuencia_encadenada`** → Activity Card con `archetype_used [N]` + `archetype_mode` + `momentos[]` (secuencia encadenada · DIESEL canon)

## Gates Humanos del workflow

- **Gate 1** — Selección de arquetipos upfront (`arquetipos-elegidos.json` poblada · ALL or NONE)
- **Gate 2** — Aprobación de Activity Cards (instructor marca `enriched: true`)
- **Gate 3** — Aprobación del Playbook (Phase 3 · futuro)
- **Gate 4** — Aprobación de derivados (Phase 4 · futuro)

---

*F2.5 Tool Specs · auto-generado 2026-04-29 · 18 tools documentados desde código real*
