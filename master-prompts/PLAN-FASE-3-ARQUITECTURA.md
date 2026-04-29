---
title: PLAN FASE 3 — Arquitectura · skill `fpi-sena-fase3` · v1.2
proposito: Plan ejecutable de construcción Fase 3 (Playbook + assessment + derivados) basado en PRE-FLIGHT-FASE-3 + canon DM §11 v2.12 changelog entry + lecciones Fase 2
status: v1.2 · corrección REGLA 21 sistémica detectada Hito 2 pre-flight · PM-3.1 + PM-3.6 reclasificados Camino 1 → Camino 2 LLM
fecha_creacion: 2026-04-29
sesion: post-cierre Hito 3 Fase 2 + pre-Hito 4 Fase 2 + pre-construcción Fase 3
prerequisitos: PRE-FLIGHT-FASE-3.md leído + Hito 4 Fase 2 PASS (PLAN-FASE-2 §6.4 estricto)
gating_para_construccion: ✓ CUMPLIDO 2026-04-29 commit 835d74b · ready_for_phase_3: true · 9/9 Activity Cards enriched
quien_escribe: Claude (skill fpi-sena-fase2 activa) + Sergio (decisiones arquitectónicas)
duracion_estimada_construccion: 3-4 semanas (reusando node) · 8-10 semanas (Python puro)
---

# PLAN FASE 3 — Arquitectura · skill `fpi-sena-fase3` · v1.0

## §1. Propósito · contexto · status

### Por qué este plan existe

Fase 3 (Playbook + assessment + derivados estudiantiles) es la última gran fase de la fábrica curricular FPI CD Engine. A diferencia de Fase 2, **Fase 3 ya tiene canon operacional cristalizado** en runs DIESEL-2026-04-15/18/19 + MGV-2026-04-20, incluyendo ~418 KB de scripts node generadores ya validados en producción. Este plan documenta la decisión arquitectónica de **cómo encapsular ese canon en una skill reusable** sin perder la integridad pedagógica que tomó meses construir.

### Status v1.0

- **Documento ejecutable** (no especulativo) · todas las decisiones arquitectónicas explícitas
- **Gating estricto:** construcción Fase 3 NO arranca hasta Hito 4 Fase 2 cerrado (PLAN-FASE-2 §6.4)
- **Iteración esperada:** v1.1 post-Hito 4 si descubrimos bugs que cambien diseño
- **Source documents:** PRE-FLIGHT-FASE-3.md (inventario canon) + DM `frontmatter v2.7` con changelog §11 entries `v2.11` (2026-04-27) + `v2.12` (2026-04-28) — drift conocido entre frontmatter version y changelog (tasks #39 + #58 bumpearon changelog sin actualizar frontmatter) + PLAN-FASE-2 v1.3 (template estructural + lecciones)

### Diferenciación vs PRE-FLIGHT

| Aspecto | PRE-FLIGHT-FASE-3 | PLAN-FASE-3 v1.0 (este doc) |
|---|---|---|
| Decisiones tomadas | NO · solo defaults sugeridos | SÍ · explícitas con justificación |
| Tasks accionables | NO · solo gaps identificados | SÍ · 4 hitos con tasks estructuradas |
| Schemas | NO · solo descritos | SÍ · contracts canónicos por subagente |
| Gates humanos detallados | NO · solo listados | SÍ · mecánica completa Gate 3 + Gate 4 |
| Anti-patrones | NO | SÍ · lecciones Fase 2 capitalizadas |

---

## §2. Resumen ejecutivo · qué construye Fase 3

### Outputs canónicos de Fase 3 por guía (19+ artefactos)

```
Phase 3 (Playbook + assessment):
  1 Playbook Outline (PM-3.1)              → pm-3-1.json + pm-3-1-FINAL.docx
  8 Build-Outs (PM-3.2 ×8)                 → pm-3-2-s1..s8.json + pm-3-2-FINAL.docx
  1 Final Mission (PM-3.5)                 → pm-3-5.json + pm-3-5-FINAL.docx
  6 Instrumentos (PM-4.1)                  → pm-4-1.json + pm-4-1-instrumentos.docx
  1 Cuestionario S6 (PM-4.2)               → pm-4-2.json + pm-4-2-cuestionario.docx
[Gate 3 · approval Playbook]
Phase 4 (derivados estudiante · post-Gate-3):
  1 Canva Deck (PM-3.3)                    → pm-3-3-spec.json + pm-3-3-deck.pptx
  1 Workbook (PM-3.4)                      → pm-3-4.json + pm-3-4-workbook.docx
  1 GFPI-F-135 (PM-3.6)                    → pm-3-6.json + pm-3-6-learning-guide.docx
[Gate 4 · approval derivados]
```

### Sub-fases canónicas dentro de "Fase 3"

Per master prompts frontmatter (verificado PRE-FLIGHT §1):

- **Phase 3 (Playbook + assessment):** PM-3.1 · PM-3.2 ×8 · PM-3.5 · PM-4.1 · PM-4.2
- **Phase 4 (derivados estudiante):** PM-3.3 · PM-3.4 · PM-3.6 (post-Playbook approval)

Esta separación se canoniza en este plan: la skill `fpi-sena-fase3` cubre AMBAS sub-fases · pero respeta el orden estricto Phase 3 → Gate 3 → Phase 4.

---

## §3. Diferencias estructurales Fase 2 → Fase 3 (8 puntos críticos)

| Dimensión | Fase 2 | Fase 3 |
|---|---|---|
| **Output type** | JSON terminal (Activity Cards) | JSON intermedio + **documentos finales** (docx · pptx · pdf) |
| **Granularidad** | 9 Activity Cards × 1 RAP × 1 sesión | 19+ artefactos por guía (multi-formato) |
| **Renderer del documento final** | N/A (Fase 2 emite JSON terminal) | docx (skill docx + python-docx) · pptx (skill pptx + python-pptx) · markdown · pdf (post-render) |
| **Dependencies** | Linear (PM-2.X → PM-2.Y) | **Mesh con bidirectional enrichment** · activity_footer fluye Fase 2 ↔ PM-3.2 (canon MGV) |
| **Validación** | 16 checks schema-bound (PM-2.11) | **8 checks bloqueantes + 2 warnings** (ver §8) · pedagogical fidelity + format compliance SENA + cross-fase integrity |
| **Bundler reusabilidad** | `task_tool_bundler.py` validated (Camino 2) | Reusable con extensión: master prompts Fase 3 son MÁS narrativos · template-driven · bundler v2.0 con renderer hooks |
| **Camino 1 vs 2 mix** | 4 mecánicos + 9 creativos | 8 PMs Fase 3+4 con mix más complejo · ver §5 |
| **Gates Humanos** | Gate 1 (arquetipos) + Gate 2 (enriched=true) | + **Gate 3** (Playbook approval canon DM §7) + **Gate 4** (derivados estudiante) |

---

## §4. Arquitectura propuesta · skill `fpi-sena-fase3`

### §4.1 — Decisión: skill separada (no submódulo)

**Decisión TOMADA** (canon DM zanjado · PLAN-FASE-2 §11 línea 572 · "mi sugerencia: separada"):

```
.claude/skills/
├─ fpi-sena-fase1/       (Fase 1 · existing)
├─ fpi-sena-fase2/       (Fase 2 · existing · 13 subagentes)
└─ fpi-sena-fase3/       (Fase 3 · NEW · 8 subagentes)
```

**Justificación:**
- Phase 3 outputs son producción de documentos · scope cualitativamente distinto
- Skills separadas mantienen scope claro · onboarding modular
- Skill `fpi-sena-fase3` se carga solo cuando inputs Fase 2 están aprobados (Gate 2)
- Reusabilidad: skill se puede dropear en otro repo sin arrastrar Fase 1+2

### §4.2 — Estructura del skill `fpi-sena-fase3`

```
.claude/skills/fpi-sena-fase3/
├─ SKILL.md                         (manual principal · activado al cargar)
├─ references/
│  ├─ pre-flight.md                 (REGLA 19 · adaptada a inputs Fase 3)
│  ├─ troubleshooting.md            (anti-patrones capitalizados Fase 2)
│  ├─ canon-fase-3.md               (estructura outputs · paths · formatos)
│  ├─ gates-3-4.md                  (mecánica Gate 3 Playbook + Gate 4 derivados)
│  └─ docx-pptx-rendering.md        (cómo renderizar docs finales · skill anthropic-skills:docx + pptx)
├─ subagentes/
│  ├─ subagente_pm_3_1_outline.py
│  ├─ subagente_pm_3_2_build_out.py    (ejecuta 8 veces · 1 por sesión)
│  ├─ subagente_pm_3_3_canva_deck.py
│  ├─ subagente_pm_3_4_workbook.py
│  ├─ subagente_pm_3_5_final_mission.py
│  ├─ subagente_pm_3_6_gfpi_f135.py
│  └─ (PM-4.1 + PM-4.2 ya existen en `fpi-sena-fase2/` · NO duplicar · referenciar)
└─ lib/
   ├─ master_prompt_loader.py       (REUSAR de fpi-sena-fase2 · same module)
   ├─ input_loader.py               (extendido para cargar pm-2-11.json + Activity Cards)
   ├─ task_tool_bundler.py          (REUSAR · validated runtime)
   ├─ document_renderer.py          (NUEVO · wrapper sobre skill docx/pptx + node scripts)
   ├─ check_9_anti_copia.py         (REUSAR + extendido · also detect cross-program leak en docx)
   └─ phase3_validators.py          (NUEVO · 5+ checks pedagogical fidelity)
```

### §4.3 — 8 subagentes Fase 3 (vs 13 en Fase 2)

| Subagente | PM | Kind | Rol |
|---|---|---|---|
| pm_3_1_outline | PM-3.1 | mecánico (Camino 1) | Distribuir 9 worksheets en 8 sesiones · derivar de pm-2-11 + pm-2-0 |
| pm_3_2_build_out | PM-3.2 ×8 | creativo (Camino 2) | Expandir 1 sesión a plan minuto-a-minuto · 8 ejecuciones |
| pm_3_5_final_mission | PM-3.5 | creativo (Camino 2) | Tarea integradora ABP 5 sub-fases · canon v2.6 27 keys |
| pm_3_3_canva_deck | PM-3.3 | híbrido | Spec Camino 1 + slides Camino 2 + render PPTX |
| pm_3_4_workbook | PM-3.4 | creativo (Camino 2) | Capítulos REINFORCE/EXTEND/PREPARE · 1 por sesión |
| pm_3_6_gfpi_f135 | PM-3.6 | mecánico (Camino 1) | Ensamblador GFPI-F-135 · espejo Fase 2 + PM-4 · formato oficial SENA |
| pm_4_1_instruments | PM-4.1 | mecánico (Camino 1) | Construido en Fase 2 build pero `phase: 3` per frontmatter · ubicación física en `fpi-sena-fase2/` · ejecución lógica en Phase 3 |
| pm_4_2_cuestionario | PM-4.2 | mecánico (Camino 1) | Idem · `phase: 3` per frontmatter |

**Total nuevos: 6 subagentes** (PM-4.1+4.2 ubicación física en `fpi-sena-fase2/` · ejecución lógica Phase 3 per master prompt frontmatter)

> **Nota arquitectónica (Issue C resuelto):** PM-4.1 + PM-4.2 master prompts declaran `phase: 3` en frontmatter. Su ubicación en `fpi-sena-fase2/subagentes/` fue decisión de Hito 2 Fase 2 anterior (Semana 2). Esta v1.0 reconoce ambivalencia: **fase lógica = 3 · ubicación física = `fpi-sena-fase2/`**. NO se duplican · son referenciados desde `fpi-sena-fase3/` via cross-skill imports (TBD §11.2 gap D).

---

## §5. Decisión Camino 1 vs Camino 2 por PM

### §5.1 — Justificación por PM

**PM-3.1 Playbook Outline → Camino 2 LLM (CORRECCIÓN v1.2 · 2026-04-29)**
- Inputs canónicos: pm-2-11.json + pm-2-0.json + 9 Activity Cards + pm-1-2.json + pm-0-context.json
- **Output requiere creatividad pedagógica:** universo_narrativo · nombres comunicativos por sesión · foco pedagógico · ejemplos Teacher Talk · pm0_alignment_by_session con grammar_groups + ejemplos en sesión
- **Decision rationale CORRECTA (post-grep evidencia operacional):** scripts node DIESEL `pm-3-1-gen.js` (70 KB) es **renderer DOCX** que CONSUME pm-3-1.json existente · NO genera el JSON. El JSON original fue iteración Sergio+Claude vía master prompt PM-3.1 v2.6
- **REGLA 21 violation reincidente:** PLAN v1.0.1/v1.1 marcó "Camino 1 mecánico" basado en tamaño de script (70 KB) sin grep contenido · clásica inflación REGLA 20-shape aplicada a script architecture

**PM-3.2 Build-Out → Camino 2 (8 ejecuciones)**
- Narrativa pedagógica de aula · Teacher Talk · answer keys
- Requiere coherencia con outline + creatividad bilingüe
- 8 ejecuciones (1 por sesión) · paralelizables (canon Fase 2 §6.3)
- **Decision rationale:** scripts node DIESEL `pm-3-2-build-out-gen.js` (62 KB) tiene templates pero el contenido narrativo lo agrega LLM

**PM-3.5 Final Mission → Camino 2**
- 5 sub-fases ABP · narrativa integradora compleja
- Cada sub-fase con activity_footer canon v2.6 (6 campos)
- **Decision rationale:** master prompt v2.6 con PRE-GENERATION CHECKLIST obligatorio · scripts node DIESEL `pm-3-5-gen.js` (33 KB) es generador docx · contenido viene de LLM via spec

**PM-3.3 Canva Deck → Híbrido**
- `pm-3-3-spec.json` (Camino 1 mecánico · estructura del deck)
- Contenido de slides (Camino 2 · texto + visual descriptions)
- Render PPTX (Camino 1 · script python-pptx o node)
- **Decision rationale:** master prompt v2.4 explícito "prohibido hardcoding en script generador" · spec separado de render

**PM-3.4 Workbook → Camino 2**
- Capítulos REINFORCE/EXTEND/PREPARE creativos
- 1 capítulo por sesión presencial (default 7)
- **Decision rationale:** trabajo autónomo del aprendiz · variedad pedagógica requerida

**PM-3.6 GFPI-F-135 → Camino 2 LLM (CORRECCIÓN v1.2 · 2026-04-29 · cascada PM-3.1)**
- Formato oficial SENA + 2ª persona narrativa derivada del Playbook (PM-3.2) requiere LLM
- **Decision rationale CORRECTA (post-grep verificación):** `pm-3-6-new-gen.js` (36 KB) exporta funciones `sec1, sec2, sec31` que renderizan secciones DOCX · `pm-3-6-assemble.js` (14 KB) importa esas secciones + escribe DOCX. **AMBOS son SOLO renderers DOCX · NO generan pm-3-6.json · NO llaman LLM (cero anthropic/api/fetch).** El pm-3-6.json original fue iteración Sergio+Claude
- **Cascada del fix PM-3.1:** mismo patrón endémico · PLAN v1.0.1/v1.1 inflación basada en KB de scripts · REGLA 21 violation sistémica detectada

### §5.2 — Resumen camino mix

| PM | Camino 1 | Camino 2 | Renderer | Corrección v1.2 |
|---|---|---|---|---|
| PM-3.1 | — | ✓ (LLM puro) | docx (post-render) | CORREGIDO · era Camino 1 mecánico inflado |
| PM-3.2 | — | ✓ ×8 | docx | sin cambio |
| PM-3.3 | ✓ (spec) | ✓ (slides) | pptx | likely · verificar pm-3-3-gen.js |
| PM-3.4 | — | ✓ | docx | sin cambio |
| PM-3.5 | — | ✓ | docx | sin cambio |
| PM-3.6 | — | ✓ (LLM puro) | docx (post-render) | CORREGIDO · cascada PM-3.1 |
| PM-4.1 | ✓ (reuse) | — | docx | sin cambio (mecánico verdadero · derivador) |
| PM-4.2 | ✓ (reuse) | — | docx | sin cambio (mecánico verdadero · ensamblador determinístico) |

**6 nuevos subagentes (1 Camino 1 puro PM-... ¿quizás 0? · 5 Camino 2 + 1 híbrido PM-3.3 spec) + 2 reusados (PM-4.1 + PM-4.2 mecánicos verdaderos) · v1.2 corrección sistémica REGLA 21**

---

## §6. Workflow end-to-end · gates · paralelización

### §6.1 — Orden estricto canónico

```
┌─ Hito Fase 2 cerrado ─────────────────────────────────────────┐
│  9 Activity Cards `enriched: true`                              │
│  pm-2-11.json (16 checks PASS · ready_for_phase_3: true)        │
│  (PM-4.1 + PM-4.2 NO se generan en Fase 2 · son `phase: 3`)     │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─ Phase 3 — Playbook + Assessment ───────────────────────────────┐
│                                                                   │
│  Step 1 (Camino 1 mecánico):                                     │
│    PM-3.1 Outline ─→ pm-3-1.json                                 │
│                                                                   │
│  Step 2 (Camino 2 paralelizable):                                │
│    PM-3.2-s1 ║ PM-3.2-s2 ║ ... ║ PM-3.2-s8 (8 simultáneo)        │
│    ─→ pm-3-2-s1..s8.json                                         │
│                                                                   │
│  Step 3 (Camino 2):                                              │
│    PM-3.5 Final Mission ─→ pm-3-5.json                           │
│                                                                   │
│  Step 4 (Camino 1 mecánicos):                                    │
│    PM-4.1 instruments + PM-4.2 cuestionario (ubicados en          │
│    `fpi-sena-fase2/subagentes/` · ejecutados en Phase 3 lógica)  │
│    ─→ pm-4-1.json + pm-4-2.json                                   │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─ Gate 3 · Sergio aprueba Playbook completo ──────────────────────┐
│  Sergio revisa pm-3-1 + 8× pm-3-2-sX + pm-3-5                    │
│  Aprueba lote o pide regeneración por sesión específica          │
│  Marca pm-3-X.enriched: true en cada uno                         │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─ Phase 4 — Derivados estudiante (paralelo) ──────────────────────┐
│                                                                   │
│  PM-3.3 Canva Deck     ║  PM-3.4 Workbook     ║  PM-3.6 GFPI-F-135│
│  (híbrido · pptx)        (Camino 2 · docx)      (Camino 1 · docx) │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─ Gate 4 · Sergio aprueba derivados ──────────────────────────────┐
│  Sergio revisa pm-3-3 + pm-3-4 + pm-3-6                          │
│  Aprueba o pide regeneración                                      │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
        FASE 3 CERRADA · GUÍA LISTA PARA PRODUCCIÓN
```

### §6.2 — Paralelización runtime estimada

| Step | Subagentes | Tiempo estimado |
|---|---|---|
| Step 1 | PM-3.1 (Camino 1) | ~1-2 min (script) |
| Step 2 | PM-3.2 ×8 paralelo (Task tools) | ~5-10 min (paralelo · sin secuencial sería 40-80min) |
| Step 3 | PM-3.5 | ~5-8 min (Task tool) |
| **Phase 3 total** | | **~15-25 min runtime** |
| Gate 3 humano | Sergio review | ~30-60 min |
| Phase 4 paralelo | PM-3.3 + PM-3.4 + PM-3.6 simultáneo | ~5-10 min |
| Gate 4 humano | Sergio review | ~15-30 min |

**Total guía Fase 3 completa: ~75-120 min runtime + gates** (vs 6-8 semanas manual antes del FPI CD Engine)

---

## §7. Plan de trabajo · 4 hitos (~3-4 semanas con node reuse · 8-10 semanas Python puro)

### Hito 1 — Esqueleto skill + lib extendido (Semana 1)

**Objetivo:** estructura `fpi-sena-fase3/` lista + helpers duplicados (D.1.5) + cli_parser nuevo + drift script + smoke test.

Tasks (secuencia revisada 2026-04-29 post-pushback Sergio):
1. Crear `.claude/skills/fpi-sena-fase3/` con SKILL.md + references stubs
2. Copiar 5 helpers de `fpi-sena-fase2/lib/` → `fpi-sena-fase3/lib/` (D.1.5 ejecución · ~5 min · NO toca código fase2 estable)
3. Adaptar `fpi-sena-fase3/lib/input_loader.py` a esquemas Fase 3 (carga pm-2-11.json + 9 Activity Cards + GFPI-F-134 row)
4. Crear `fpi-sena-fase3/lib/cli_parser.py` (D.1.5 abstracción canon · TODO mecánico Fase 3 lo usa · mata bug guide_id endémico de raíz)
5. Crear `fpi-sena-fase3/lib/document_renderer.py` skeleton VACÍO (I.2 · NO interface upfront · diseño emergente Hito 2-3-4)
6. Crear `fpi-sena-fase3/lib/phase3_validators.py` con 5+ checks iniciales del PLAN §8
7. Crear `scripts/check-helpers-drift.py` (D.1.5 mitigation · diff 3 genuinamente shared entre fase2/lib y fase3/lib · pre-commit hook opcional) + smoke test imports + pin Node version

**Gates:** ninguno (build infra) · skill skeleton cargable + helpers funcionales smoke-tested.

**Pre-arranque obligatorio (Task 0):** este v1.1 plan documenta las 3 decisiones D.1.5 + H.3 + I.2 como TOMADAS con sustento Sergio (REGLA 21 strict). NO arrancar Tasks 1-7 sin haber leído §11.1 actualizado · §7 Hito 5 agendado · y trigger mutual REGLA 21 violation.

### Hito 2 — Subagentes Camino 1 mecánicos (Semana 2)

**Objetivo:** PM-3.1 + PM-3.6 funcionando deterministicamente.

Tasks:
1. Construir `subagente_pm_3_1_outline.py` (puede portar lógica de `pm-3-1-gen.js`)
2. Smoke test PM-3.1 contra fixture · validar pm-3-1.json schema canónico
3. Construir `subagente_pm_3_6_gfpi_f135.py` (ensamblador · puede portar `pm-3-6-assemble.js`)
4. Smoke test PM-3.6 · validar pm-3-6.json espejo de Fase 2+PM-4
5. Reusar PM-4.1 + PM-4.2 desde `fpi-sena-fase2/` (verificar imports cross-skill)

**Gates:** Camino 1 outputs validados schema-conforme.

### Hito 3 — Subagentes Camino 2 creativos (Semana 3)

**Objetivo:** PM-3.2 ×8 + PM-3.5 + PM-3.4 funcionando con bundler v2.0.

Tasks:
1. Extender `task_tool_bundler.py` para Fase 3 (template-driven prompts más narrativos)
2. Construir `subagente_pm_3_2_build_out.py` (1 archivo · ejecuta 8 veces)
3. Validar paralelización runtime PM-3.2 (8 Task tools simultáneo)
4. Construir `subagente_pm_3_5_final_mission.py` (PRE-GENERATION CHECKLIST canon v2.6)
5. Construir `subagente_pm_3_4_workbook.py`
6. Smoke + validation behavioral contra fixture (cada uno produce su Activity Card)

**Gates:** outputs creativos pasan validations behavioral (similar a Fase 2 Hito 3).

### Hito-Fase3-4 — Subagente híbrido + Test E2E Fase 3 (Semana 4)

> **Nota nomenclatura:** este Hito es de la skill `fpi-sena-fase3`. NO confundir con **Hito 4 Fase 2** (gating canónico §6.4 · E2E Fase 2 contra IMARPOR-CC con Activity Cards). Hito-Fase3-4 ocurre DESPUÉS de Hito 4 Fase 2 cerrado.

**Objetivo:** PM-3.3 deck completo + Test E2E contra IMARPOR-CC real.

Tasks:
1. Construir `subagente_pm_3_3_canva_deck.py` (híbrido · spec + slides + PPTX render)
2. Validar PPTX renderable + spec separado de hardcoding (canon v2.4 §)
3. Test E2E completo contra IMARPOR-CC real:
   - Phase 3: PM-3.1 → 8× PM-3.2 → PM-3.5 → Gate 3 simulado
   - Phase 4: PM-3.3 ║ PM-3.4 ║ PM-3.6 → Gate 4 simulado
4. 5 checks pedagogical fidelity PASS
5. Documentar cierre Fase 3 oficialmente (v1.1+ del PLAN si bugs)

**Gates:** Fase 3 cerrada · `fpi-sena-fase3` lista para producción real con instructores.

### Hito 5 — Refactor pass renderer API uniforme (1-2h post-Hito 4)

**Objetivo:** uniformar las 6 funciones del `document_renderer.py` que emergieron iterando en Hitos 2-3-4.

**Tasks (checklist explícito):**
1. Inventariar las 6 funciones renderer reales generadas en Hitos 2-4 (`render_pm_3_1_docx`, `render_pm_3_2_docx`, `render_pm_3_3_pptx`, `render_pm_3_4_docx`, `render_pm_3_5_docx`, `render_pm_3_6_docx`)
2. Comparar signatures · identificar inconsistencias (param naming · return type · error handling)
3. Definir signature canónica unified (probable: `(input_path, output_path, options=None) -> RenderResult`)
4. Migrar las 6 funciones a signature unified · preserve backward-compat shims si necesario
5. Validar runtime contra IMARPOR-CC outputs ya generados
6. Documentar API canónica en `references/document-renderer-api.md`

**Gates:** API uniforme + tests passing.

**Justificación canónica:** Hito 5 es el cumplimiento del caveat I.2 que Sergio pidió 2026-04-29 ("agendado explícito · NO aspiración"). Sin Hito 5, I.2 (diseño emergente) cae en anti-patrón "se difiere indefinidamente". Hito 5 es el seguro contractual que evita esa caída.

---

## §8. Validation · 5+ checks pedagogical fidelity

| Check | Validación | Bloqueante? |
|---|---|---|
| **Check 3.1** | Playbook timing suma horas == pm-2-0.session_blueprint suma | Sí |
| **Check 3.2** | Cada Build-Out tiene Teacher Talk bilingüe (EN primary + ES cursive support) | Sí |
| **Check 3.3** | Workbook chapters count == sessions con autonomous_hours > 0 | Sí |
| **Check 3.4** | Final Mission integra E1-E5 explícitamente en sub-fases ABP | Sí |
| **Check 3.5** | GFPI-F-135 schema v2.6.5 conforme + 2ª persona narrativa | Sí |
| **Check 3.6** | Anti-copia-fantasma cross-program (docx hash distinct + heurísticas texto) | Sí |
| **Check 3.7** | Activity_footer propagation Fase 2 ↔ PM-3.2 consistente | Sí |
| **Check 3.8** | Canva spec sin hardcoding de contenido (canon v2.4) | Sí |
| **Check 3.9** | Bilingüismo cursive support consistente en todos los docx | Warning |
| **Check 3.10** | PPTX deck slides == sessions del Playbook | Warning |

**Total: 8 bloqueantes + 2 warnings** (vs 16 checks PM-2.11 Fase 2)

---

## §9. Output formats · renderer architecture

### §9.1 — Recomendación: híbrido pragmático · PENDIENTE DECISIÓN SERGIO

**Recomendación NO TOMADA:** reusar scripts node existentes via `subprocess.run("node ...")` para casos donde el output docx/pptx ya está perfecto en producción DIESEL/MGV. Escribir wrappers Python que orquesten el flujo + validen post-render.

> ⚠ **Esto es default sugerido (PRE-FLIGHT §5.2), no decisión canonizada.** Promoverlo a TOMADA requiere confirmación explícita de Sergio post-Hito 4 Fase 2 cuando sepamos si los scripts node funcionan correctamente vía subprocess.

**Argumentos a favor:**
- ~418 KB de scripts node ya validados en producción (DIESEL + MGV · cifras §12)
- Reescribir todo en Python = 4-6 semanas adicionales · alto riesgo regression
- Skill `anthropic-skills:docx` + `anthropic-skills:pptx` ya disponibles para casos nuevos
- Híbrido permite migración gradual: PMs nuevos → Python · PMs heredados → node subprocess

**Argumentos en contra (a considerar antes de TOMAR):**
- Subprocess añade dependencia node runtime + complejidad de error handling
- Los scripts node DIESEL pueden tener acoplamientos a estructura específica de su run · portabilidad NO verificada
- Skill `anthropic-skills:docx + pptx` puede ser suficiente para todo · sin necesidad de node

### §9.2 — `document_renderer.py` API

```python
def render_pm_3_1_docx(pm_3_1_json_path, output_path):
    """Renderiza Playbook Outline DOCX · usa script node DIESEL pm-3-1-gen.js subprocess"""

def render_pm_3_2_docx(pm_3_2_sX_json_path, output_path):
    """Renderiza Build-Out sesión X · usa script node DIESEL pm-3-2-build-out-gen.js"""

def render_pm_3_3_pptx(pm_3_3_spec_json_path, output_path):
    """Renderiza Canva Deck PPTX · usa skill anthropic-skills:pptx + spec"""

def render_pm_3_5_docx(pm_3_5_json_path, output_path):
    """Renderiza Final Mission DOCX · usa script node DIESEL pm-3-5-gen.js"""

def render_pm_3_6_docx(pm_3_6_json_path, output_path):
    """Renderiza GFPI-F-135 DOCX · usa script node MGV pm-3-6-new-gen.js"""

def validate_rendered_docx(docx_path, expected_schema):
    """Validation post-render · word count · sections · bilingüismo · anti-MGV"""
```

### §9.3 — Migration path node → Python (futuro v1.1+)

Si decisión arquitectónica futura es reescribir todo en Python:
- Hito 1 v1.1: portar `pm-3-1-gen.js` → `render_pm_3_1.py` con python-docx
- Hito 2 v1.1: portar `pm-3-2-build-out-gen.js` → `render_pm_3_2.py`
- Etc.

NO en v1.0 · scope creep evitado.

---

## §10. Anti-patrones a evitar (lecciones Fase 2)

Capitalizando lo aprendido en Fase 2 cierre Hito 3:

1. **❌ Bundle prompt + instrucciones agent muy detallado → timeout.** Mañana en Fase 3: instrucciones agent < 400 palabras · confiar en master prompt inyectado en bundle.

2. **❌ Inyectar PM previo completo → bloat.** Para Fase 3: slim-context (solo bloque productivo del PM previo: Master Anchor · Grammar Targets · etc.).

3. **❌ Asumir CHECK 9 = solo `validacion.check9` central.** En Fase 3: heurística cubre `archetype_X.anti_mgv_evidence` + sub-bloques distribuidos.

4. **❌ Hardcoding 8 sesiones en checks.** Per fix PM-2.0 architect 2026-04-28: usar pm-1-1.sesiones_por_bloque + ramificación regla_bloques.

5. **❌ Path bugs en validators (ac.evidence vs ac.activity_card.evidence).** Verificar TODOS los paths contra outputs reales antes de cerrar checks.

6. **❌ Inventar checks sin canon.** Cada check Fase 3 debe derivarse de master prompt explícito · NO improvisar.

7. **❌ Saltar Pre-flight REGLA 19.** Cada construcción de subagente Fase 3 debe leer master prompt + canon DIESEL/MGV ANTES de codificar.

8. **❌ Construir Fase 3 sin Hito 4 Fase 2 cerrado.** Canon §6.4 estricto · NO arrancar Hito 1 Fase 3 hasta Activity Cards Fase 2 con `enriched: true`.

9. **❌ Asumir paralelización funciona sin validar.** Lección PM-2.6 ║ PM-2.8: validar runtime con 2 Task tools antes de escalar a 8 (PM-3.2 ×8).

10. **❌ Reescribir scripts node sin razón.** Si script DIESEL `pm-3-X-gen.js` produce output correcto en producción · subprocess es válido. Reescribir solo si hay justificación pedagógica clara.

11. **❌ Asumir Camino 1 mecánico desde tamaño de script (Anti-patrón 12 candidato troubleshooting).** Lección 2026-04-29 Hito 2 pre-flight: `pm-3-1-gen.js` 70 KB · `pm-3-6-new-gen.js` 36 KB · ambos son SOLO renderers DOCX que consumen JSON ya generado por LLM iteración Sergio+Claude. Mi PLAN v1.0.1/v1.1 inflé "Camino 1 mecánico" basado en KB sin grep contenido · clásica REGLA 20-shape aplicada a arquitectura de scripts. **Mitigación: ANTES de afirmar "script-driven · NO LLM", grep contenido · verificar (a) lee JSON existente o lo genera · (b) tiene fetch/anthropic/api calls · (c) writeFileSync target = .json o .docx**.

---

## §11. Decisiones tomadas vs gaps pendientes

### §11.1 — Decisiones TOMADAS en v1.0

| # | Decisión | Justificación |
|---|---|---|
| 1 | Skill separada `fpi-sena-fase3` | Canon DM zanjado · PLAN-FASE-2 §11 |
| 2 | Camino 1 vs Camino 2 mix por PM (con TBDs en §5.1 PM-3.6) | Per master prompt frontmatter + canon DIESEL/MGV (PM-3.6 pendiente verificación pm-3-6-new-gen.js) |
| 3 | 6 nuevos subagentes + 2 reusados de fpi-sena-fase2 | PM-4.1+PM-4.2 son `phase: 3` per frontmatter pero existen como subagentes en `fpi-sena-fase2/` (decisión de ubicación física vs lógica) |
| 4 | Bidirectional enrichment activity_footer | Canon MGV ya validado (scripts `enrich_activity_footers.js` + `derive_activity_footer_from_playbook.js`) |
| 5 | Bilingüismo cursive support | Canon Fase 2 validado runtime |
| 6 | Phase 3 + Phase 4 sub-fases canónicas | Per master prompts frontmatter |
| 7 | 8 checks bloqueantes + 2 warnings | Derivado de master prompts + lecciones Fase 2 |
| 8 | Paralelización PM-3.2 ×8 (Task tools) | Extrapolado de runtime Fase 2 (PM-2.6 ║ PM-2.8 ×2 validado · ×8 sin verificar) |
| 9 | **D.1.5: duplicar 5 helpers fase3/lib + cli_parser.py nuevo + drift script** | Sergio 2026-04-29: pushback contra D.2 lib-shared con 3 argumentos firmes: (a) diagnóstico erróneo guide_id (NO duplicación · ausencia de abstracción · cli_parser mata bug igual en fase3/lib que en lib-shared) · (b) D.2 toca 13 subagentes Fase 2 estables · riesgo en código recién commiteado · (c) D.2 conflict task #30 packaging (.skill self-contained) · REGLA 21 inflada disfrazada. Acepté limpio. |
| 10 | **H.3: renderer híbrido subprocess node + skill docx/pptx** | Sergio 2026-04-29: "✓ Confirmado sin cambios". Reusa 418 KB scripts node DIESEL validados producción · Python skill anthropic-skills:docx+pptx para PMs nuevos (PM-3.3 Canva). Migration path natural · single risk subprocess error handling cross-language tractable. |
| 11 | **I.2: diseño emergente API renderer + Hito 5 refactor pass agendado** | Sergio 2026-04-29: "Acepto I.2 con caveat: que el refactor pass quede agendado explícito como tarea Hito 5 · no como aspiración. Concreto: una línea en §11.2 v1.1". Defer implementación · NO defer canon. API converge iterando · Hito 5 (1-2h) uniforma 6 funciones renderer post-Hito 4 con checklist explícito. |


### §11.2 — Gaps que requieren decisión Sergio explícita

| # | Gap | Default sugerido | Decisión TBD |
|---|---|---|---|
| A | Política versioning Playbook post-aprobación instructor | Append-only versioning | Sergio confirma en Hito 3 |
| B | Mecánica Gate 3 (lote vs por-sesión) | Por-sesión + lote final | Sergio confirma en Hito 3 |
| C | Manejo identidad visual programa (logos · paletas) | PM-3.3 spec lo declara · pm-0-context con hints opcionales | Sergio confirma en Hito 4 |
| D | Política regeneración derivados si Playbook cambia | Regenerar todo o sólo afectados? | TBD post Hito 4 |
| E | Output PDF (post-render docx?) | docx primary · PDF on-demand vía export | TBD post Hito 4 |
| F | Workbook chapters count (default 7 vs configurable) | Default 7 · configurable via pm-1-1 | Sergio en Hito 3 |
| G | Storage de runs Fase 3 (vault sync política) | Sync inmediato post Gate 4 | Sergio en Hito 4 |


---

## §12. Archivos relacionados (paths exactos)

```
master-prompts/
├─ DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md (DM §11 v2.12 changelog entry)
├─ PLAN-FASE-2-ARQUITECTURA.md (template estructural · referencia)
├─ PRE-FLIGHT-FASE-3.md (inventario canon Fase 3)
├─ PLAN-FASE-3-ARQUITECTURA.md (este documento · v1.0)
├─ PM-3.1 — Playbook Outline — Session Map.md (v2.6)
├─ PM-3.2 — Playbook Build-Out — Step by Step.md (v2.5)
├─ PM-3.3 — Canva Deck — Visual Support.md (v2.4)
├─ PM-3.4 — Workbook — Autonomous Work.md (v2.0)
├─ PM-3.5 — Final Mission — Integrative Task.md (v2.6)
├─ PM-3.6 — GFPI-F-135 Integrator.md (v2.6.5)
├─ PM-4.1 — Instrumentos de Evaluación Formativa.md (v2.6.5)
└─ PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md (v2.0)

runs/
├─ MGV-2026-04-20/ (canon operacional · ground truth Fase 3 más completo)
│  ├─ pm-3-1.json + 8× pm-3-2-sX.json + pm-3-5.json + pm-3-4-content.json + pm-3-6.json
│  ├─ docx finales: pm-3-1-FINAL · pm-3-2-FINAL · pm-3-5-FINAL · pm-3-6-FINAL
│  └─ scripts/pm-3-2-pm0-propagate.js (5 KB)
└─ DIESEL-2026-04-15/ (canon operacional · primer run · incluye PPTX)
   ├─ pm-3-1.json + pm-3-2-sX.json + pm-3-3-spec.json + pm-3-3-deck.pptx + pm-3-4 + pm-3-5 + pm-3-6
   └─ scripts/ (14 archivos JS · ~418 KB total · ver PRE-FLIGHT §3 recontado)

english-engine-lab/specs/tools/ (F2.5 specs Fase 2 · referencia para Fase 3 specs futuros)

.claude/skills/fpi-sena-fase3/ (NEW · construir en Hitos 1-4)
```

---

## §13. Changelog · plan iteraciones

### v1.0 · 2026-04-29 · borrador inicial post-PRE-FLIGHT

- Estructura completa: §1-§13
- 10 decisiones tomadas + 7 gaps pendientes Sergio
- Plan 4 hitos secuenciados (~3-4 semanas con node reuse)
- 8 bloqueantes + 2 warnings checks Fase 3
- Anti-patrones capitalizados de lecciones Fase 2
- Gating estricto: NO construcción hasta Hito 4 Fase 2 cerrado

### v1.0.1 · 2026-04-29 · hotfix focalizado · 7 fixes scope (a) revisado por Sergio

**Issues críticos cerrados (anti-patrón "Falsa invención"):**
- **#A** §9.1 + §11 #3 + #10 degradados de "Decisión TOMADA" a "Recomendación · pendiente Sergio post-Hito 4 Fase 2"
- **#B** PM-3.6 categorización Camino 1 puro → "TBD pendiente lectura `pm-3-6-new-gen.js`"
- **#C** PM-4.1 + PM-4.2 reconocidos como `phase: 3` per frontmatter (NO Fase 2) · ubicación física vs lógica documentada

**Inconsistencias estructurales cerradas:**
- **#G** §3 alineada con §8/§11 (8 bloqueantes + 2 warnings · NO "5+ checks")
- **#I** Hito 4 Fase 3 → "Hito-Fase3-4" para evitar confusión con Hito 4 Fase 2

**Cifras corregidas:**
- **#H** 10 archivos JS → 14 archivos · 458 KB → 418 KB (recontado de PRE-FLIGHT inspection real)

**Precisiones canónicas:**
- **#P** "canon §6.4" → "PLAN-FASE-2 §6.4" (specific reference)
- **#Q** "DM v2.12" → DM frontmatter v2.7 + changelog §11 entries v2.11 + v2.12 (drift conocido documentado)

**Defer a v1.1 post-Hito 4 Fase 2:**
- Issues D (cross-skill imports), E (`document_renderer.py` API verificación), F (paralelización ×8 vs ×2)
- Issues menores J, K, L, M, N, O (clarificaciones de definición · no bloquean construcción)

### v1.1 · 2026-04-29 · 3 decisiones canonizadas + Hito 5 + REGLA 21 trigger mutual

**Contexto:** Hito 4 Fase 2 cerrado oficialmente (commit 835d74b · canon §6.4 cumplido · ready_for_phase_3: true). Antes de arrancar construcción Fase 3 Hito 1, Sergio aplicó pushback estricto a las 3 decisiones críticas (D, H, I) usando REGLA 21. Resultado:

**Decisiones canonizadas (movidas de §11.2 gaps a §11.1 TOMADAS):**

- **D.1.5 (no D.2 lib-shared):** duplicar 5 helpers fase3/lib + cli_parser.py nuevo + drift script. Razón concedida: diagnóstico erróneo guide_id (NO duplicación causó el bug · ausencia de abstracción) + D.2 toca código fase2 estable + D.2 conflicta task #30 packaging .skill. **Reincidencia REGLA 21 documentada honestamente** — el mismo día que canonicé la regla, caí en ella otra vez con D.2. Sergio detectó · concedí limpio.

- **H.3 confirmado:** renderer híbrido subprocess node + skill docx/pptx. Sin cambios.

- **I.2 con caveat:** diseño emergente API renderer · CON Hito 5 agendado explícito (no aspiración). Hito 5 = 1-2h refactor pass post-Hito 4 · uniforma 6 funciones renderer · checklist explícito agregado a §7.

**Nuevo Hito 5 agendado §7:** refactor pass renderer API uniforme post-Hito 4 (1-2h · 6 tasks). Es el seguro contractual de I.2.

**REGLA 21 trigger mutual canonizado:** ambas partes (Sergio + Claude) acuerdan invocar "REGLA 21 violation · pausa" cuando detecten inflación en la otra parte. Mejor protocol que self-policing — el blind spot del que infla siempre es del propio. Aplica a Hito 1+ Fase 3 + futuras sesiones.

**Hito 1 secuencia revisada (7 tasks · §7):** Task 0 (este bump v1.1) cumplido hoy · Tasks 1-7 esperando próxima sesión con energía completa (decisión honest "momentum no flow" 2026-04-29 ~16:45).

**Anti-patrón documentado:** REGLA 21 reincidencia el mismo día de canonización demuestra que la regla NO se internaliza solo con escribirla · necesita aplicación reincidente para hacerse hábito. El trigger mutual es la mitigación operacional para esta vulnerabilidad.

### v1.2 · 2026-04-29 · corrección REGLA 21 reincidencia sistémica · PM-3.1 + PM-3.6 reclasificados Camino 2 LLM

**Contexto:** Durante pre-flight focused Hito 2 Task 1 (subagente_pm_3_1_outline.py), Claude self-detectó REGLA 21 violation reincidente en PLAN v1.1 §11.1 #2 + §5.3. La afirmación "PM-3.1 → Camino 1 mecánico · sustentada por scripts node 70 KB" era inflación REGLA 20-shape aplicada a arquitectura de scripts.

**Evidencia operacional REAL (grep contenido scripts node 2026-04-29):**

`pm-3-1-gen.js` (DIESEL-2026-04-15 · 70 KB):
```javascript
const data = JSON.parse(fs.readFileSync("...pm-3-1.json", "utf8"));  ← CONSUME JSON existente
fs.writeFileSync(outFile, buffer);                                   ← escribe DOCX (no JSON)
```
**0 menciones LLM (anthropic/api/fetch/claude/openai).** Es renderer DOCX puro · NO generator JSON.

`pm-3-6-new-gen.js` (DIESEL-2026-04-18 · 36 KB) + `pm-3-6-assemble.js` (14 KB):
- Exportan funciones `sec1, sec2, sec31` que renderizan secciones DOCX
- Assemble importa secciones · escribe DOCX
- **0 menciones LLM** · scripts son SOLO renderers DOCX

**Confirmación Sergio (2026-04-29):**
> "Fue una iteración entre el LLM y yo cuando construí el Master prompt PM-3.1. Realmente termina siendo siempre el LLM invocando el PM-3.1 y lo iba ajustando mientras se iba documentando todo en changelogs y scripts."

Los `pm-3-X.json` originales DIESEL/MGV fueron generados por **LLM (Claude) en sesiones iterativas con Sergio** usando los master prompts PM-3.X como contrato. Los scripts node `pm-3-X-gen.js` son SIEMPRE renderers DOCX que consumen el JSON ya generado · nunca generators del JSON.

**Correcciones canonizadas:**

- §5.2 tabla mix · PM-3.1 + PM-3.6 movidos a Camino 2 LLM con nota CORREGIDO
- §5.3 PM-3.1 · justificación reescrita con evidencia grep
- §5.3 PM-3.6 · justificación reescrita (cascada · mismo patrón endémico)
- §10 Anti-patrón 11 nuevo · "asumir Camino 1 desde tamaño de script · grep contenido antes"
- Anti-patrón 12 candidato troubleshooting fpi-sena-fase3: "Inflación arquitectónica desde KB script"

**Implicancia Hito 2 Task 1 (PM-3.1 outline):**

NO es Camino 1 mecánico. Subagente debe ser Camino 2 análogo a wrappers Fase 2 · usa `task_tool_bundler.py` ya copiado en fase3/lib (Task 2 Hito 1) · genera pm-3-1.json desde inputs Fase 2+3 vía LLM Task tool con master prompt PM-3.1 v2.6 inyectado.

**Trigger mutual REGLA 21:** self-detection funcionó esta vez · Claude detectó propia inflación durante pre-flight focused antes de codificar. NO esperó pushback Sergio. Ejemplo de internalización gradual de REGLA 21 (vs reincidencia anterior Gap D D.2 lib-shared 2026-04-29 que SÍ requirió pushback Sergio).

**Tasks Hito 1 100% completas SIN cambio** · esta corrección NO invalida lib-shared = D.1.5 · NO invalida cli_parser · NO invalida helpers copiados. Solo invalida sub-decisión #2 (Camino 1 vs 2 mix per PM) que era preview de Hitos 2-4.

### v1.2 (esperada · post Hito 1 Fase 3 construcción)

- Refinements basados en construcción real de subagentes (cli_parser edge cases · drift script behavior)
- Adjustments en `document_renderer.py` API según hallazgos diseño emergente
- Posible canonización adicional si emergen patrones reusables

### v1.3+ (esperada · post Hito 4 Fase 3 + Hito 5 refactor pass)

- Documentación API renderer canónica unified (cumplimiento Hito 5 · I.2 caveat)
- Cierre Fase 3 oficial · canon §6.4 análogo para Fase 4 (si aplica)

---

*PLAN-FASE-3-ARQUITECTURA.md v1.2 · escrito 2026-04-29 (corrección REGLA 21 reincidencia sistémica · PM-3.1 + PM-3.6 reclasificados Camino 2 LLM post pre-flight Hito 2)*
*Próximo paso: Hito 4 Fase 2 → v1.1 refinements → Hito 1 Fase 3 (construcción esqueleto skill)*
