---
title: KICKOFF — Sesión 2026-04-30 (cierre Fase 2 + arranque pre-flight Fase 3)
proposito: Documento auto-suficiente para retomar el trabajo mañana sin perder contexto
sesion_anterior: 2026-04-28 (cierre Hito 3 al 100% · 9/9 wrappers creativos validados behavioralmente)
quien_continua: Claude (skill fpi-sena-fase2 activa) + Sergio (instructor responsable)
duracion_sesion_anterior: ~5 horas
---

# KICKOFF — Sesión 2026-04-30

## Para Claude (que arranca mañana sin contexto)

Lee este documento completo antes de hacer cualquier cosa. Tiene todo lo que necesitas para retomar exactamente donde quedamos.

---

## 0. ESTADO ACTUAL DEL SISTEMA (al cierre 2026-04-28)

### Lo que está vivo y funcionando

**Fase 1 (Hitos previos):** sin cambios desde KICKOFF 2026-04-29 — ver ese documento §0 para baseline.

**Fase 2 — Hitos cerrados al cierre de hoy:**
- ✅ Hito 1 (pre-trabajo + canonización Opción A) — desde 2026-04-28 sesión arquitectónica
- ✅ Hito 2 (4 subagentes mecánicos PM-2.0/2.11/4.1/4.2) — Semana 2
- ✅ **Hito 3 cerrado al 100% — 9/9 wrappers creativos validados behavioralmente en runtime**
- ⏳ Hito 4 (E2E run real contra IMARPOR-CC) — pendiente

**Skill `fpi-sena-fase2` actual (al cierre 2026-04-28):**
- 13 subagentes funcionales en `.claude/skills/fpi-sena-fase2/subagentes/`:
  - 4 mecánicos (Camino 1 Python): pm_2_0_architect (v1.1 post-fix · 4 TODOs cerrados) · pm_2_11_row_assembler · pm_4_1_instruments · pm_4_2_cuestionario
  - 9 creativos (Camino 2 Task tool): pm_2_1 a pm_2_10 (sin pm_2_7 deprecated)
- `lib/`: master_prompt_loader.py · input_loader.py · check_9_anti_copia.py · task_tool_bundler.py
- references/: pre-flight.md · troubleshooting.md (ambos canonizados con REGLA 19 + REGLA 20)

**Master prompts canon vigentes:** sin cambios estructurales desde 2026-04-29 (ver ese KICKOFF §0).

---

## 1. LO CERRADO EN SESIÓN 2026-04-28 (resumen ejecutivo)

### Tasks completados (10 tasks)

| Task | Descripción | Output clave |
|---|---|---|
| #69 | 4 TODOs PM-2.0 architect fix | subagente v1.0→v1.1 · 4 patrones canónicos (alineacion_1a1 + absorcion_Na1 con N=8/12/16) |
| #70 | Validation behavioral PM-2.5 (Vocabulary · cadena PM-2.3→PM-2.5) | pm-2-5.json · 27 keys · Toolbelt 20/20 terms |
| #71 | Validation behavioral PM-2.1 (Spark · S1 entrada) | pm-2-1.json · 24 keys · EXPLORE/ENGAGE/DISCOVER |
| #72 | Validation behavioral PM-2.2 (Gap · S1 salida) | pm-2-2.json · 29 keys · WHAT_I_KNOW/BLIND_SPOTS/LEARNING_CONTRACT |
| #73 | Test rama `diesel_secuencia_encadenada` PM-2.1 v3.0 (cierre dual mode runtime) | pm21-DIESEL-output · 3 momentos encadenados A/B/C |
| #74 | Validation behavioral PM-2.10 (Grammar · S3 antecedente) | pm-2-10.json · 7 Grammar Targets GT-S3-01..07 |
| #75 | Validation behavioral PM-2.4 (Writing · S3 consumidor cross-half) | pm-2-4.json · 7/7 GT consumed · E2 5pts |
| #76 + #77 | Validation paralelo PM-2.6 (Listening) + PM-2.8 (Speaking) S4 | pm-2-6 (E3 5pts · 187 palabras VHF) + pm-2-8 (E4 5pts · pronunciation absorbida PM-2.7) |
| #78 | Validation behavioral PM-2.9 (Functions · S5 integrativo · cierre Hito 3) | pm-2-9.json · F1-F5 cubiertas · 8 previous_pms · E5 5pts |

### Hallazgos arquitectónicos validados en runtime

1. **Bundler ramificación dual v3.0 funciona**: `arquetipos-elegidos.json` con `estilo` declarado produce outputs estructurales DIFERENTES (`mgv_compendio_metodologico` con EXPLORE/ENGAGE/DISCOVER vs `diesel_secuencia_encadenada` con `momentos[]` + `archetype_used[N]` + `archetype_mode`)
2. **Bundler Gate Humano 1 ALL-or-NONE strict**: si `arquetipos-elegidos.json` existe pero falta entrada para un PM, levanta ValueError. Comportamiento canónico correcto.
3. **Paralelización Task tools funciona**: PM-2.6 ║ PM-2.8 lanzados simultáneamente en single message · ahorro ~45% vs secuencial. Worth scaling para Hito 4 E2E.
4. **Slim-context injection es óptimo**: para PM consumer, inyectar SOLO el bloque productivo del PM previo (e.g., `grammar_targets_for_pm24` + `universe_anchor` summary) en lugar del documento completo. Bundle 43KB completa ~5min · Bundle 88KB tiende a timeout 10min.
5. **PM-2.7 deprecated absorption verificada**: PM-2.8 emite `pronunciation_scaffolding._absorbed_from: "PM-2.7 (DEPRECATED · v2.0 absorption)"` con focus_words maritime + stress patterns + rehearsal techniques.
6. **CHECK 9 anti-copia-fantasma cross-fixture pasa**: 9/9 archivos con SHA distintos · 0 contaminación real (todas menciones MGV/DIESEL están en bloques defensivos `validacion.check9_anti_copia_fantasma` o `archetype_X.anti_mgv_evidence`).

### 4 cadenas pedagógicas validadas runtime

```
S1 entrada→salida:        PM-2.1 ──productor──→ PM-2.2 (consume Spark narrative)
S2:                       PM-2.3 ──Master Anchor──→ PM-2.5 (consume Toolbelt 20/20)
S3 cross-half:            PM-2.10 ──7 Grammar Targets──→ PM-2.4 (consume 7/7 + produce E2)
S4 paralelo (independent): PM-2.6 (E3 Listening) ║ PM-2.8 (E4 Speaking)
S5 integrativo:           PM-2.9 (consume todo S2-S4 · 8 previous_pms · F1-F5)
S1 dual mode test:        PM-2.1 mgv ─║─ PM-2.1 diesel (mismo PM · 2 estructuras canónicas distintas)
```

---

## 2. ESTADO FIXTURE SMOKE-TEST-2026-04-29 (al cierre 2026-04-28)

```
runs/_smoke/SMOKE-TEST-2026-04-29/
├─ pm-0-context.json
├─ pm-1-1.json (clon IMARPOR-CC · regla=absorcion_Na1 · 12 sesiones · 72d+28a=100h)
├─ pm-1-2.json (clon · enriched: true forzado para test)
├─ pm-2-0.json (architect · 12 sesiones × 6h direct · adaptation_required: true)
├─ arquetipos-elegidos.json (6 entradas: PM-2.1 diesel + PM-2.10/2.4/2.6/2.8/2.9 mgv)
├─ SMOKE-REPORT.md (4 BUGS PM-2.0 documentados · status post-cierre)
└─ g1/
   ├─ pm-2-1.json (Spark · S1 entrada · mgv default)
   ├─ pm-2-1.mgv.json (backup · cuando rama diesel reescribió pm-2-1.json en test #73)
   ├─ pm-2-2.json (Gap · S1 salida)
   ├─ pm-2-3.json (Reading · S2 anchor · "Andrea's First Morning" 188 palabras)
   ├─ pm-2-4.json (Writing · S3 consumer · Pre-Shift Vessel Inspection Form)
   ├─ pm-2-5.json (Vocabulary · S2 consumer · Toolbelt 20/20)
   ├─ pm-2-6.json (Listening · S4 anchor · VHF radio call 187 palabras)
   ├─ pm-2-8.json (Speaking · S4 mission · Radio simulation SMCP · pronunciation absorbida)
   ├─ pm-2-9.json (Functions · S5 integrativo · F1-F5 covered)
   ├─ pm-2-10.json (Grammar · S3 antecedente · 7 GT-S3-01..07)
   ├─ pm-4-1.json (mecánico · 6 instrumentos)
   └─ pm-4-2.json (mecánico · cuestionario S6 25pts)
```

**Total fixture:** 13 archivos en g1/ + 5 archivos a nivel run.
**CHECK 9 hashes (9/9 distintos):** PM-2.1 656137c5 · PM-2.2 aabd40b2 · PM-2.3 da2a559d · PM-2.4 961f46e7 · PM-2.5 d02dfe90 · PM-2.6 b909b681 · PM-2.8 2a03f977 · PM-2.9 a90030e5 · PM-2.10 10ce5f4d.

---

## 3. QUÉ ESTÁ PENDIENTE (3 categorías)

### Categoría A — Cerrar Fase 2 al 100% (Hito 4)

1. **Re-correr PM-2.11 Row Assembler contra fixture completa** — Ahora que las 9 Activity Cards reales existen, ejecutar el subagente mecánico PM-2.11 contra el fixture y validar que produce GFPI-F-134 row con 16 checks PASS. Esto nunca se ha probado runtime con Activity Cards reales.
2. **F2.5 Tool Specs** — documentar APIs reales de los 13 subagentes en `english-engine-lab/specs/tools/` (pendiente desde sesión 2026-04-28 según conversación). Ver §3 PLAN-FASE-2 para artifacts SDD F2.
3. **Test E2E IMARPOR-CC completo (Hito 4)** — correr Fase 1 → Fase 2 completa contra el run REAL IMARPOR-CC-2026-04-27 (no el clon SMOKE), con 4 checks PASS + todas Activity Cards `enriched: true` post Gate Humano 2. Esto cierra Fase 2 oficialmente.

### Categoría B — Plan Fase 3 (paralelo · sin bloquear construcción)

4. **PRE-FLIGHT-FASE-3.md** — documento de descubrimiento que mapea el canon operacional Fase 3 existente (DIESEL g1..g5 + MGV g1..g6 ya tienen pm-3-* implementado manualmente con scripts node). Este documento NO es el plan v1.0 · es el inventario del canon antes de plan. Ver propuesta 2026-04-28: lectura de los 8 master prompts PM-3.1..3.6 + PM-4.1/4.2 + inspección de scripts node existentes (pm-3-2-build-out-gen.js · pm-3-3-gen.js · pm-3-6-assemble.js · etc.) + identificación de gaps a decidir.
5. **PLAN-FASE-3-ARQUITECTURA.md v1.0** — borrador del plan (post pre-flight · cabeza fresca · 2-3h dedicadas según trabajo equivalente al PLAN-FASE-2 v1.3 que llevó 4-6h iteradas).

### Categoría C — Higiene del repo

6. **Persistir scripts y subagentes a vault** (DM §10 PASO obligatorio · "scripts como artefacto del run"): copiar `.claude/skills/fpi-sena-fase2/` completo a `fpi-sena-factory-vault/skills/fpi-sena-fase2/`.
7. **Actualizar troubleshooting.md skill fpi-sena-fase2** con los 4 hallazgos arquitectónicos del cierre Hito 3 (paralelización · slim-context · timeout limit · ramificación dual runtime).
8. **Limpiar pm-2-1.mgv.json del fixture** (es backup del test #73 · no debe persistir como artifact canónico) — decisión Sergio: borrar o documentar como "test artifact" en SMOKE-REPORT.md.

---

## 4. LAS 3 PRIMERAS INSTRUCCIONES PARA ARRANCAR

Ejecutar en este orden estricto · NO saltar pasos · NO improvisar.

### Instrucción 1 — Pre-flight obligatorio (REGLA 19)

**Antes de cualquier acción**, leer estos 4 archivos en esta sesión:

```
1. master-prompts/KICKOFF-SESION-2026-04-30.md (este documento)
2. master-prompts/KICKOFF-SESION-2026-04-29.md (sesión previa · §0 baseline)
3. master-prompts/PLAN-FASE-2-ARQUITECTURA.md v1.3 §6.4 + §7 (gating Fase 3 + plan de Hitos)
4. master-prompts/DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md §11 (changelog v2.12)
```

Documentar pre-flight cumplido al inicio del primer output con:
```
## Pre-flight cumplido (2026-04-30)
- ✓ KICKOFF-SESION-2026-04-30 leído (este doc)
- ✓ KICKOFF-SESION-2026-04-29 §0 leído
- ✓ PLAN-FASE-2 §6.4+§7 leídos
- ✓ DM v2.12 §11 leído
```

### Instrucción 2 — Decidir Camino A vs Camino B con Sergio

Sergio ya planteó la disyuntiva el 2026-04-28:

| Camino | Descripción | Trade-off |
|---|---|---|
| **A — Disciplinado** | Cerrar Hito 4 Fase 2 ANTES de arrancar plan Fase 3. Enfocar 100% en: PM-2.11 re-run + F2.5 + E2E IMARPOR-CC. ~1-2 semanas hasta arrancar plan Fase 3. | Garantiza canon §6.4 ("Solo entonces se autoriza Fase 3"). Plan Fase 3 espera. |
| **B — Pragmático** | Construcción Fase 3 espera el gate, pero **PRE-FLIGHT-FASE-3.md** corre paralelo con cierre Hito 4. ~ahorro 1 semana. | Plan respeta gate (no construcción · solo investigación arqueológica del canon). |

**Pregunta a Sergio antes de actuar**: "¿Camino A (disciplinado · Hito 4 first) o Camino B (paralelo · pre-flight Fase 3 + cierre Hito 4)?"

NO arrancar trabajo hasta confirmación explícita.

### Instrucción 3 — Si Sergio confirma, arrancar con la primera tarea concreta

**Si Camino A**: arrancar con **Instrucción 1.A — Re-correr PM-2.11 Row Assembler contra fixture completa**:
```bash
cd /Users/Beppo/Projects/fpi-sena-factory
python3 .claude/skills/fpi-sena-fase2/subagentes/subagente_pm_2_11_row_assembler.py \
    SMOKE-TEST-2026-04-29 runs/_smoke master-prompts g1
```
Validar que produce `pm-2-11.json` con 16 checks PASS · revisar output. Si falla algún check, documentar y decidir fix.

**Si Camino B**: arrancar con **Instrucción 1.B — Pre-flight Fase 3** (lectura disciplinada · NO escribir plan v1.0):

Leer en esta sesión, en este orden, sin escribir nada:
```
1. master-prompts/PM-3.1 — Playbook Outline — Session Map.md
2. master-prompts/PM-3.2 — Playbook Build-Out — Step by Step.md
3. master-prompts/PM-3.3 — Canva Deck — Visual Support.md
4. master-prompts/PM-3.4 — Workbook — Autonomous Work.md
5. master-prompts/PM-3.5 — Final Mission — Integrative Task.md
6. master-prompts/PM-3.6 — GFPI-F-135 Integrator.md
7. master-prompts/PM-4.1 — Instrumentos de Evaluación Formativa.md (re-leer)
8. master-prompts/PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md (re-leer)
```

Después inspeccionar canon operacional:
```bash
ls runs/DIESEL-2026-04-19/g1/pm-3-*.* runs/DIESEL-2026-04-19/scripts/*.js
ls runs/MGV-2026-04-20/g1/pm-3-*.* runs/MGV-2026-04-20/scripts/*.js
```

Output esperado de la sesión: `master-prompts/PRE-FLIGHT-FASE-3.md` (~150-200 líneas · inventario de canon + gaps a decidir + diferencias estructurales Fase 2→Fase 3).

---

## 5. NOTAS DE CONTINUIDAD

### Decisiones tomadas hoy que quedan canon

1. **Bundler Gate Humano 1 = ALL or NONE** (confirmado runtime · no hot-fix · es comportamiento correcto)
2. **Slim-context injection pattern** para subagentes consumer (extraer solo bloque productivo del PM previo · no documento completo · evita timeout en bundles 80KB+)
3. **Paralelización Task tools** validada para PMs independientes dentro de misma sesión (S4 PM-2.6 ║ PM-2.8)
4. **PM-2.7 absorption en PM-2.8** verificada en runtime (`pronunciation_scaffolding._absorbed_from`)

### Anti-patrones a NO repetir mañana

- ❌ **Bundle prompt + instructions agent muy detallado** → timeout. Mañana: instrucciones agent < 400 palabras · confiar en master prompt inyectado en bundle.
- ❌ **Inyectar PM previo completo** → bloat. Mañana: extraer SOLO grammar_targets/universe_anchor/master_anchor_summary del PM productor.
- ❌ **Asumir CHECK 9 = solo `validacion.check9`** → cobertura defensiva puede vivir en `archetype_X.anti_mgv_evidence` también. Mañana: heurística debe cubrir ambos paths.

### Tasks abiertos al cierre (para limpiar mañana)

- #30 [pending] Package skill as .skill file (de Fase 1 · sin urgencia)
- #31 [pending] Resolve IMARPOR probe gaps (1, 2, 3) (de Fase 1 · sin urgencia)

Resto cerrados. Ningún task `in_progress` al cierre.

### Mood/contexto Sergio

Sergio mostró en esta sesión:
- Disciplina por cerrar gaps de runtime detectados (rama diesel) · no avanzar sin cobertura
- Pragmatismo: prefiere validar 1-2 cadenas en cada sesión vs maratonear 9 wrappers
- Skepticism saludable: detectó que mi promesa "planear Fase 3 hoy mismo" era phrasing débil · forzó separación entre pre-flight (lectura del canon) vs plan v1.0 (escritura · cabeza fresca · 2-3h dedicadas)

Trabajar en mañana respetando esa disciplina: pre-flight antes de plan, gate antes de construcción, una cosa a la vez.

---

## 6. ARCHIVOS RELACIONADOS QUE PUEDEN NECESITARSE

```
.claude/skills/fpi-sena-fase2/
├─ SKILL.md
├─ references/
│  ├─ pre-flight.md (REGLA 19)
│  ├─ troubleshooting.md (anti-patrones · pendiente actualizar con hallazgos hoy)
│  ├─ invocacion-master-prompts.md
│  └─ camino-arquitectonico.md
├─ subagentes/ (13 archivos)
└─ lib/ (4 archivos: master_prompt_loader · input_loader · check_9_anti_copia · task_tool_bundler)

runs/_smoke/SMOKE-TEST-2026-04-29/ (fixture validation completo)
runs/IMARPOR-CC-2026-04-27/ (run real para Hito 4 E2E)
runs/MGV-2026-04-20/ (canon operacional ref op para mgv style)
runs/DIESEL-2026-04-19/ (canon operacional ref op para diesel style + scripts node Fase 3)
```

---

*KICKOFF Sesión 2026-04-30 · escrito al cierre 2026-04-28*
*Hito 3 Fase 2 cerrado al 100% · 9/9 wrappers creativos validados behavioralmente*
