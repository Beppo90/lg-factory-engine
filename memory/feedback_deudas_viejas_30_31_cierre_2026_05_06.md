---
name: Deudas viejas #30 + #31 cerradas · skill packaging + IMARPOR probe gaps
description: Tasks #30 (skill packaging) + #31 (IMARPOR probe gaps 1+2+3) cerradas · 3 skills empaquetados (.skill files) + GAP 1 regex relajada + GAP 2 ya resuelto + GAP 3 cerrado para pm-0-context (CC trabajará schemas downstream)
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-06
---

**Decisión Sergio canon 2026-05-06 (cierre deudas viejas pendientes desde 2026-04-25/27)**

Tras consolidación memoria · Sergio aprobó cerrar 2 deudas heredadas pendientes desde sesiones IMARPOR-rework (2026-04-25) y skill design (2026-04-27).

## Task #30 · Package skill .skill file · CERRADO

**Trigger:** Skills viven como folders en `.claude/skills/` · ningún `.skill` file empaquetado para distribución.

**Trabajo ejecutado:**
- Creado script canonizado `scripts/skill-packaging/package_skill.sh` (reusable cross-skill)
- Empaqueta como zip con extensión `.skill` · valida SKILL.md at root · excluye noise (__pycache__, .pyc, *.bak, .legacy-*, .DS_Store, node_modules)
- Soporta single skill o `--all` flag

**Resultado · 3 skills empaquetados en `dist/skills/`:**

| Skill | Size | Files | Status |
|-------|------|-------|--------|
| fpi-sena-fase1.skill | 20 KB | 10 (SKILL.md + 5 references + 1 evals) | ✅ |
| fpi-sena-fase2.skill | 91 KB | 32 (SKILL.md + 5 references + 13 subagentes + 5 lib + evals) | ✅ |
| fpi-sena-fase3.skill | 93 KB | 36 (SKILL.md + 5 references + 7 subagentes + 6 lib) | ✅ |

**Pattern canon emergente NEW · "skill packaging via zip + validation":**

1. Validate `SKILL.md` exists at root of skill folder
2. zip recursive con exclusiones canon (`__pycache__/*` · `*.pyc` · `*.bak` · `*.pre-v*-bak` · `.DS_Store` · `*/node_modules/*` · `*.legacy-*` · `*~` · `*.swp`)
3. Output a `dist/skills/<skill-name>.skill`
4. Sanity check: SKILL.md presente en zip root path

Reusable cross-skill cuando se agreguen nuevas skills al sistema.

## Task #31 · IMARPOR probe gaps (1, 2, 3) · CERRADO

Trigger original: probe IMARPOR-rework-2026-04-25 detectó 3 gaps · documentados en `runs/IMARPOR-rework-2026-04-25/gaps-encountered.md`. GAP 4 + 5 ya resueltos en sesiones posteriores (v2.7.1).

### GAP 1 · run_id regex strict · CERRADO

**Issue original:** schema regex `^[A-Z]+-[0-9]{4}-[0-9]{2}-[0-9]{2}$` rechaza sub-modificadores legítimos (CC · IMDER · rework · V2 · AGRO).

**Pre-fix validation:** 13/18 runs reales PASSING (5 fails incluían IMARPOR-CC · IMARPOR-rework · INGBAS).

**Fix aplicado v3:** `v4/schemas/common/run-id.schema.json` regex relajada a:
```
^[A-Z][A-Z0-9]*(-[A-Za-z0-9]+)?-[0-9]{4}(-[0-9]{2}-[0-9]{2})?(-V[0-9]+)?$
```

**Soporta:**
- PROGRAM con dígitos (INGBAS1 · INGBAS4)
- MODIFIER alfanumérico opcional (CC · IMDER · rework · AGRO · V2)
- Date año obligatorio · MM-DD opcional (legacy programs solo año)
- Vn opcional para iteraciones

**Post-fix validation:** 15/18 runs PASS (3 fails restantes son placeholder/legacy intencionales: `IMARPOR-claude-regen-pending` · `MARITIME-legacy-input` · `g1` subdir).

### GAP 2 · `tipo` enum normalization · CERRADO

**Issue original:** JSON real tenía `tipo: "Curso Complementario · expandido pedagógicamente a 240h"` (string descriptivo · no enum value).

**Status:** ya RESUELTO conceptualmente en sesión IMARPOR-CC (canon: "Curso Complementario" === "Curso Especial" · descripción larga va a otro field). JSON real IMARPOR-V2 ya tiene `tipo: "Curso Especial"` post-regen 2026-05-06.

### GAP 3 · Schema v4.1 no captura canon rico · CERRADO PARCIAL

**Issue original:** Schema v4.1 validaba ~10% de los 12+ campos canónicos (syllabus_units · saberes_proceso · criterios · narrative · grammar_roadmap · etc.).

**Status post-Mejoras #3+#4:** Para `pm-0-context.schema.json` v3.4 → **CERRADO** · 12/12 fields ricos validados:
- programa · universo_narrativo · cefr_subnivel_objetivo · principios_pedagogicos_aplicables · final_mission · grammar_focus_per_session · l1_policy_per_session · evidencias_formales_traceability · _competencias_tecnicas_modo · _split_strategy_heredado · _raps_metadata · _position_programa
- 31 property fields total · 5 conditional schemas · 16 required

**Status para schemas downstream:** EN PROGRESO via CC sub-tasks 2-4 (audit doc Cowork ya entregado en `handoffs/AUDIT-SCHEMAS-DOWNSTREAM-2026-05-06.md`):
- pm-1-2.schema.json v4.0 → v4.3.1 (Camino A replace · ~1.5h)
- common/activity-card.schema.json v2.7 → v3.4 (Camino A replace · ~1h)
- gfpi-f-134-row.schema.json (CREATE from scratch · ~1.5h)

Cuando CC cierre sub-tasks 2-4 · GAP 3 cerrará 100%.

## Patterns canon emergentes preservados (cross-cierre)

- **Skill packaging script reusable** (zip + validation + exclusions canon)
- **Schema regex evolución** · de strict-único-formato a permisivo-canonical-with-modifiers (run-id v1 → v3)

## Deliverables sesión

- `scripts/skill-packaging/package_skill.sh` NEW (reusable cross-skill)
- `dist/skills/fpi-sena-fase1.skill` (20 KB)
- `dist/skills/fpi-sena-fase2.skill` (91 KB)
- `dist/skills/fpi-sena-fase3.skill` (93 KB)
- `v4/schemas/common/run-id.schema.json` v3 (regex relajada · cierra GAP 1)
- `memory/feedback_deudas_viejas_30_31_cierre_2026_05_06.md` (este snapshot)

## Cross-references

- Gaps origen: `runs/IMARPOR-rework-2026-04-25/gaps-encountered.md`
- Handoff CC pendiente: `handoffs/AUDIT-SCHEMAS-DOWNSTREAM-2026-05-06.md` (cierra GAP 3 schemas downstream)
- Mejoras #3+#4 schema rich: `audits/VALIDATION-SCHEMA-PM-0-CONTEXT-2026-05-05.md` + `audits/PM-0-AUDIT-REGLA-14-2026-05-05.md`

## Deuda residual

**Ninguna inmediata** del scope #30 + #31. La deuda restante (GAP 3 schemas downstream · 3 schemas) es scope CC y está coordinada via audit doc.

*Sergio Cortés Perdomo · 2026-05-06 · deudas viejas cerradas · cleanup completo de 12+ días de pendientes*
