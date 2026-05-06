---
name: Skill loader expansion · fase2 + fase3 sync 24/24 PMs
description: master_prompt_loader.py de fpi-sena-fase2 + fpi-sena-fase3 sincronizados con canon vigente · 24 PMs (Phase 0/1/2/3/4) · parser multi-formato (3 formatos frontmatter soportados) · DEPRECATED detection NEW · post Mejoras #3+#4 PM-0 + cluster cascade
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-05
---

**Decisión Sergio canon 2026-05-05 ((f) skill loader fase2 expansion · CC reco post-Hito 3 cierre)**

CC entregó Hito 3 Pilar 4 (F2.8 schema drift CI 6/6 checks) · pregunta orden próxima. Sergio aprobó (f) en paralelo a (d) · concurrencia cross-LLM.

**Trabajo ejecutado · scope ampliado vs estimación inicial:**

Estimación CC: 30 min · solo fase2 + 4 PMs (PM-0/0.0/1.1/1.2). Trabajo real expandió:

| Skill | Antes | Después |
|-------|-------|---------|
| fpi-sena-fase2/lib | 13 PMs (PM-2.0 → PM-2.10 + PM-4.x) | 17 PMs (+ Phase 0/1) |
| fpi-sena-fase3/lib | 22 PMs · drift severo (12+ versiones obsoletas vs canon) | 24 PMs vigentes 100% |

**Drift detectado fase3 pre-bump (versiones 2026-04-29):**

- PM-0.0: 1.0 → 2.3 ❌
- PM-0: 3.0 → 3.4.1 ❌
- PM-2.0: 2.6 → 3.0 ❌
- PM-2.1/2.2: 3.0 → 3.1 ❌
- PM-2.3..2.10: 2.0 → 3.0 ❌
- PM-2.11: 2.6.3 → 3.3 ❌
- PM-3.5: 2.6 → 3.0 ❌
- PM-4.2: 2.0 → 3.0 ❌
- PM-1.1, PM-1.2: NO presentes (NEW agregados)

Total: 12+ entries obsoletas + 2 PMs faltantes = **drift bloqueante para REGLA 19 strict_version**.

**Parser multi-formato canonizado:**

Función `_extract_version()` con 3 formatos canon (verificado contra frontmatter real):

1. **YAML frontmatter:** `version: 2.9` (PM-1.1, PM-1.2, PM-2.x, PM-3.5, PM-4.x)
2. **Markdown bold:** `**Versión:** 3.4.1 — descripción larga` (PM-0)
3. **Markdown table row:** `| **Versión** | 2.3 |` (PM-0.0, PM-3.1, PM-3.2, PM-3.3, PM-3.4, PM-3.6)

Regex captura solo el semver (MAJOR.MINOR[.PATCH]) · descarta descripciones extra. Forward compat: si futuros masters usan formato 4 · agregar nuevo regex sin romper existentes.

**DEPRECATED detection NEW (fase3 only):**

PM-3.7 está marcado DEPRECATED 2026-05-02 (V04 PM-2.11 lo reemplaza). Antes el loader lo trataba como activo · ahora `_extract_version()` detecta `DEPRECATED` en primeros 500 bytes y retorna sentinel string. VERSIONES_VIGENTES["PM-3.7"] = "DEPRECATED" · match check funciona correctamente.

**Smoke test resultados (post-bump):**

- fase2: ✅ 17/17 PMs PASS · todas las versiones canon match
- fase3: ✅ 24/24 PMs PASS · incluyendo PM-3.7 DEPRECATED detection

**Pattern canon emergente NEW · "skill loader sync cross-skill":**

Cuando hay copias paralelas de utilities cross-skill (fase2 + fase3 + posiblemente fase1 + future fases) · el bump de versiones canon REQUIERE sync simultáneo · sino drift silencioso entre skills produce inconsistencia operacional. Aplicable cross-PM:

1. Bumpear master prompt (PM-0 v3.4 → v3.4.1 hoy)
2. Identificar TODAS las copias del loader downstream (`grep VERSIONES_VIGENTES .claude/skills/`)
3. Sync cada copia con dict canon vigente · parser unificado
4. Smoke test cada copia post-sync
5. Memory snapshot documentando sync cross-skill

**Aplicabilidad immediate:**

- Hito 3 (PM-0) · cualquier subagente Python que use REGLA 19 strict_version contra PM-0 ahora valida correctamente v3.4.1 · NO falla con UNKNOWN
- Phase 1 cascade · subagentes que ejecuten PM-1.1 / PM-1.2 ahora pueden validar versiones vigentes
- Phase 0 cascade · `subagente_pm_0_0_matriz.py` (en fase3) ahora puede validar PM-0.0 v2.3

**Cross-LLM coordination:**

Trabajo Cowork ortogonal a (d) sync v4/schemas/ que CC arrancará en branch separada. Convergencia esperada cuando ambas líneas terminen:
- CC (d): v4/schemas/ alineado con master-prompts/ (excepto pm-0-context.schema.json ya alineado)
- Cowork (f): skill loaders alineados con master-prompts/ (canon vigente cargado correctamente)
- = `master-prompts/` ↔ `v4/schemas/` ↔ `.claude/skills/*/lib/master_prompt_loader.py` triángulo coherente

**Deliverables sesión:**

- `.claude/skills/fpi-sena-fase2/lib/master_prompt_loader.py` UPDATED (17 PMs · 8,196 bytes)
- `.claude/skills/fpi-sena-fase3/lib/master_prompt_loader.py` UPDATED (24 PMs · ~9 KB · sync con fase2 + 7 PM-3.x extras)
- `memory/feedback_skill_loader_expansion_2026_05_05.md` (este snapshot)
- Pattern canon emergente NEW "skill loader sync cross-skill"

**Deuda explícita post-bump:**

- Considerar consolidación a 1 sola copia compartida (ahora 2 copias · drift potencial regresará si no se mantienen)
- fpi-sena-fase1 NO tiene copia del loader actualmente · si necesita validar PMs en runtime · agregar
- Behavioral test (Pilar 4) que valide loader.py contra runtime · prevent drift regression

*Sergio Cortés Perdomo 2026-05-05 · skill loader expansion (f) cerrado · concurrencia cross-LLM activa con CC (d)*
