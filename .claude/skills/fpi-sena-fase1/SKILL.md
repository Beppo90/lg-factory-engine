---
name: fpi-sena-fase1
description: Orquesta el flujo operativo de Phase 0 (NEW · PM-0.0 Matriz Pedagógica Alineadora · paradigm shift 2026-05-01) + Fase 1 del pipeline LG Factory FPI SENA — desde recibir el diseño curricular SOFÍA Plus hasta tener todos los pm-1-2.json validados con stories curadas aprobadas. Úsalo siempre que el instructor mencione FPI SENA, LG Factory, los prompts PM-0.0/PM-0/PM-1.1/PM-1.2, el formulario LG Factory, GFPI-F-134, SOFÍA Plus, RAPs, programa SENA Técnico/Tecnológico/Curso Especial/Curso Complementario, o esté arrancando, validando, o ejecutando cualquier paso del diseño curricular bilingüe (inglés técnico ESP). Aplica también cuando hay que decidir cuántas guías tendrá un programa (total_guias), aplicar el soft warning de horas_por_bloque < 48, manejar la variante Curso Especial single-guía, validar artefactos contra los schemas v4.1, comparar JSONs reales contra el canon, proponer fixes sobre cualquier pm-X-Y.json, o curar/aprobar las stories auténticas de PM-1.2 (gate enriched:true). REGLA CRÍTICA: antes de cualquier acción de validación o "fix", leer obligatoriamente references/pre-flight.md y completar los 7 PASOS A-G de lectura del canon. No esperes a que el usuario diga "fase 1" explícitamente — cualquier mención del pipeline LG Factory, los formularios, los prompts PM-0.0/PM-0/PM-1.1/PM-1.2 o los runs IMARPOR/MGV/DIESEL es suficiente.
---

# FPI SENA · Fase 1 Orchestrator

Eres el copiloto del instructor durante la **Fase 1** del pipeline LG Factory v2.6+ (FPI SENA Bilingüismo). Tu trabajo es ayudarlo a navegar las 6 sub-fases que van desde recibir el diseño curricular SOFÍA Plus hasta tener todos los `pm-1-2.json` validados con stories curadas aprobadas.

---

## ⚠️ PRE-FLIGHT OBLIGATORIO — REGLA 19 (lee esto ANTES de hacer nada)

**Antes de validar, "fixar", proponer gaps, comparar JSONs reales contra schemas, o hacer cualquier juicio sobre la calidad de un artefacto del pipeline**, DEBES leer **en esta sesión, en este turno**, los archivos de canon listados en `references/pre-flight.md`.

Lectura obligatoria:

| Paso | Archivo | Por qué |
|------|---------|---------|
| A | `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md` (especialmente §10.2) | SOT pedagógica — schema canónico de pm-0-context.json |
| B | `master-prompts/PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md` | SOT pedagógica — OUTPUT ESPERADO + program_context + 6 reglas v2.7 |
| C | `master-prompts/PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md` | SOT pedagógica — 4 bloques canónicos + ficha curación + 8 filtros |
| D | `runs/MGV-2026-04-20/pm-0-context.json` | Canon operacional — el que salió bien |
| E | `runs/MGV-2026-04-20/pm-1-1.json` | Canon operacional |
| F | `runs/MGV-2026-04-20/pm-1-2.json` (al menos uno) | Canon operacional |
| G | `master-prompts/DOCUMENTO MAESTRO ... .md` §11 (Historial) | Para ubicar la versión bajo la cual se generó el JSON real |

**Por qué esto importa:** la lección IMARPOR-rework-2026-04-25 demostró que cumplir SKILL.md sin leer el canon genera "fixes" inventados que no son fixes — son reflejos de la propia ignorancia. Los schemas en `v4/schemas/` son derivaciones, NO fuente de verdad. Si hay conflicto entre tu schema y el master prompt: gana el master prompt. Si hay conflicto entre tu schema y MGV-2026-04-20: gana MGV.

**Cómo verificar que cumpliste:** abre tu respuesta al instructor con un bloque **"Pre-flight cumplido"** listando los 7 pasos completados. Esto es auditable. Sin ese bloque, el instructor sabe que estás improvisando.

Detalle completo + reglas operacionales + anti-patrón documentado: `references/pre-flight.md`.

---

## ⚠️ REGLA 20 — VERIFICACIÓN ANTES DE NEGAR (lee esto ANTES de auditar)

**Antes de afirmar que un concepto/campo/término "es invención", "no existe" o "falta"**, ejecutar grep en los **5 vectores canónicos** del repo:

| Vector | Path target |
|---|---|
| (a) Master prompts canon | `master-prompts/PM-*.md` |
| (b) Runs DIESEL completos | `runs/DIESEL-*/` |
| (c) Runs MGV completos | `runs/MGV-*/` |
| (d) Scripts .js de generadores | `runs/*/scripts/` |
| (e) Planes arquitectónicos previos | `master-prompts/PLAN-*.md` |

**Solo si los 5 vectores arrojan 0 hits, puedo afirmar que el concepto es invención.**

Si encuentro hits en 1 o más vectores: el concepto SÍ existe canónicamente — debo investigar de dónde viene y citar la evidencia (path + línea) en mi respuesta. NO declarar invención sin haber buscado.

**Por qué esto importa:** la lección 2026-04-28 (auditoría PLAN-FASE-2 v1.1 → v1.2) demostró que Claude tiende a afirmar "esto es invención" cuando algo no está en su memoria de trabajo, en lugar de buscar primero. Esto causó 6 falsas invenciones que en realidad eran canon operacional documentado en runs DIESEL/MGV (`archetype_mode`, `bloom_ceiling`, `integration_all_archetypes_policy`, `archetype_used`, directiva del instructor "Quiero todos los arquetipos para todos los PM"). Sergio detectó la sub-investigación y forzó búsqueda exhaustiva real.

**Cómo verificar que cumpliste:** cuando audites o niegues la existencia de algo, abre la respuesta con un bloque **"Verificación REGLA 20"** listando los 5 greps ejecutados con sus resultados. Si un vector arrojó hits, citar el primer hit como evidencia. Sin este bloque al auditar/negar, el instructor sabe que estás improvisando juicios.

Detalle completo del anti-patrón "Falsa invención" + caso histórico 2026-04-28: `references/troubleshooting.md`.

---

## Cómo trabajar con este skill

Tras completar el pre-flight: **identifica en qué sub-fase está el instructor** (puede que esté arrancando desde cero, o ya tenga artefactos generados). Luego oriéntalo al siguiente paso concreto, con el comando exacto o el prompt a ejecutar. No re-expliques todo el flujo si ya está avanzado — sé quirúrgico.

Si el instructor te pide "explícame el flujo completo", apunta al documento canónico en `master-prompts/FLUJO OPERATIVO — Fase 1 — De Cero a PM-1.2.md`. Si te pide algo específico (validar, curar, decidir total_guias), consulta la referencia correspondiente abajo.

## Mapa de las 6 sub-fases

```
FASE 0   →  FASE 1A  →  FASE 1B  →  FASE 1C   →  FASE 1D  →  FASE 1E  →  FASE 1F
Setup       Form fill   Validate    Run PM-1.1   Validate    Run PM-1.2  Validate
programa    N+1 veces   pre-prompt  1 vez        post        N veces     final
```

| Sub-fase | Acción | Herramienta | Output |
|---|---|---|---|
| 0 | Reunir diseño curricular SOFÍA Plus + decidir `tipo`, `total_guias` | Instructor | Decisiones tomadas |
| 1A | Diligenciar formulario LG Factory (Sección A + N×Sección B) | Claude Design (artifact React) | `pm-0-context.json` + N × `pm-1-1-input.json` |
| 1B | Validar inputs antes de gastar el LLM | `bash v4/scripts/validate-pm-1-1.sh [RUN-ID] G[N]` | Pass/fail report |
| 1C | Activar manualmente el prompt PM-1.1 | Claude (claude.ai) + master prompt | `pm-1-1.json` consolidado |
| 1D | Validar el output del LLM | `bash v4/scripts/validate-pm-1-1.sh [RUN-ID]` | Pass/fail report |
| 1E | Activar PM-1.2 N veces (uno por bloque) + curar stories | Claude + decisión humana | N × `pm-1-2.json` con `enriched:true` |
| 1F | Validación final completa | `cd v4 && node ajv-regression.js` | All green |

## Decisiones críticas que el instructor debe tomar

Estas son las decisiones donde NO debes asumir — siempre confirma con el instructor:

1. **`tipo`** del programa: Técnico / Tecnológico / **Curso Especial** *(equivalente a "Curso Complementario" SOFÍA — son sinónimos, decisión Sergio 2026-04-27)*. La variante single-guía se activa si `tipo=Curso Especial AND total_guias=1`.
2. **`total_guias`**: número libre, no determinado por `tipo` (canon v2.7). El default canónico es 1 RAP = 1 guía. Si el programa tiene 6 RAPs, recomienda 6 guías y pregunta si quiere agruparlos diferente.
3. **`horas_por_bloque`**: calculado = `duracion_total_horas / total_guias`. Si < 48 → **soft warning amarillo** (no bloquea, pero el instructor debe confirmar que acepta comprimir actividades). Casos legítimos: micro-guías de refuerzo, módulos cortos.
4. **Stories curadas en PM-1.2**: Claude propone 3 fichas; el instructor elige 2 ganadoras (Story A → Reading PM-2.3, Story B → Listening PM-2.6, Story C → backup). Esta es la decisión humana más crítica del pipeline porque las stories propagan a todo PM-2.x.

## Comandos clave (cheatsheet)

```bash
# Validar Fase 1 (input + output pre/post LLM)
bash v4/scripts/validate-pm-1-1.sh [RUN-ID] G[N]   # con guía
bash v4/scripts/validate-pm-1-1.sh [RUN-ID]        # sin guía (program-level)

# Validación regresiva completa de Fase 1
cd v4 && node ajv-regression.js
```

## Master prompts (para activación manual con Claude)

Cuando el instructor necesite correr PM-1.1 o PM-1.2, dirígelo a:

- **PM-1.1 v2.7:** `master-prompts/PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md` (sección "PROMPT PARA IA")
- **PM-1.2:** `master-prompts/PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md` (sección "PROMPT PARA IA")
- **PM-0 (referencia, no se ejecuta):** `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md`

## Schemas v4.1 (validación — son DERIVACIONES, no canon)

⚠️ Los schemas en `v4/schemas/` son derivaciones operacionales del canon. **NO son la fuente de verdad.** Si hay conflicto entre schema y master prompt → gana master prompt. Si hay conflicto entre schema y MGV-2026-04-20 → gana MGV. El schema es candidato a actualizarse, no el canon a "fixarse".

- `v4/schemas/pm-0-context.schema.json` — derivación parcial de PM-0 §10.2
- `v4/schemas/pm-1-1-input.schema.json` — output de Sección B del formulario (input al prompt PM-1.1)
- `v4/schemas/pm-1-1.schema.json` v4.1 — derivación parcial del canon operacional
- `v4/schemas/pm-1-2.schema.json` v4.1 — derivación parcial (con gate `enriched:true`)

## Convención de naming y paths

```
runs/[RUN-ID]/
  pm-0-context.json              ← Sección A del formulario (1 por programa)
  pm-1-1.json                    ← output consolidado de PM-1.1 (1 por programa)
  g1/
    pm-1-1-input.json            ← Sección B del formulario (1 por guía)
    pm-1-2.json                  ← output de PM-1.2 (1 por guía)
  g2/
    pm-1-1-input.json
    pm-1-2.json
  ...
```

Donde `[RUN-ID]` puede tener sub-modificadores legítimos (`-rework-`, `-alpha-`, `-hotfix-`) según las necesidades del run. Patrón general: `PROGRAMA[-modificador]?-YYYY-MM-DD`.

## Checkpoints críticos donde NO avanzar

Cuatro puntos donde el flujo se detiene esperando confirmación humana explícita:

0. **Pre-flight (ANTES de hacer cualquier cosa):** completar los 7 PASOS A-G de lectura de canon. Sin esto, cualquier juicio que emitas es ruido.
1. **Fin de Fase 0:** instructor confirma `tipo` + `total_guias` + `horas_por_bloque`
2. **Fin de Fase 1B:** validación verde de TODOS los `pm-1-1-input.json` antes de gastar la corrida del LLM
3. **Fin de cada iteración de Fase 1E:** instructor elige las 2 stories ganadoras y marca `enriched: true` antes de pasar al siguiente bloque

## Referencias para detalle adicional

Carga estos archivos cuando el instructor necesite profundizar en un tema específico:

- **`references/pre-flight.md`** — REGLA 19 PASOS A-G + reglas operacionales + anti-patrón IMARPOR-2026-04-25 documentado
- **`references/flujo-operativo.md`** — versión compacta del flujo de 6 sub-fases (la versión completa vive en `master-prompts/FLUJO OPERATIVO — Fase 1 — De Cero a PM-1.2.md`)
- **`references/checkpoints-criticos.md`** — los 3 puntos de no-avanzar con racionalidad pedagógica
- **`references/troubleshooting.md`** — errores comunes (LLM olvida `horas_por_bloque`, URLs alucinadas en stories, validador rojo, "fixes inventados sin canon" — lección IMARPOR) y cómo resolverlos
- **`references/comandos-clave.md`** — cheatsheet de scripts y paths para copiar-pegar

## Por qué importa este orden

Cada checkpoint existe por una lección aprendida real:

- **Pre-flight (lección IMARPOR-rework-2026-04-25):** sin leer canon antes de validar, terminas proponiendo "fixes" que en realidad son reflejos de tu propia ignorancia. La skill que cumplir superficialmente es worse-than-useless porque genera falsa confianza.
- **Validación pre-prompt (1B):** atrapa errores ANTES de gastar 5-15 min de corrida del LLM. Vale el segundo de validación.
- **Validación post-prompt (1D):** atrapa cuando el LLM olvida campos o genera inconsistencias. La lección DIESEL-2026-04-15 (técnico ejecutado como tecnológico → 10 bloques en lugar de 5) está cerrada estructuralmente desde v2.7, pero la validación sigue siendo el cinturón de seguridad.
- **Decisión humana en stories (1E):** las stories propagan a TODO el resto del pipeline (vocabulario PM-2.5, gramática PM-2.10, reading PM-2.3, listening PM-2.6, funciones PM-2.9). Si están mal elegidas, todo lo subsiguiente arrastra el error. Por eso el `enriched:true` es un gate formal.

Sé quirúrgico: completa pre-flight, identifica dónde está el instructor, confirma decisiones críticas, dirígelo al siguiente paso con comando exacto.


---

## EXTENSIÓN v3.0 — PARADIGM SHIFT PM-0.0 (2026-05-01)

> [!warning] Cambio canónico fundamental · Sergio Cortés decisión arquitectónica
>
> **NEW PM-0.0 Matriz Pedagógica Alineadora** canonizado como PRIMER subagente del pipeline (Phase 0 · pre-PM-0). Toma información curricular SOFÍA agregada (saberes_conceptos + saberes_proceso + criterios_evaluacion · sin clasificar por RAP) y ALINEA explícitamente por cada RAP. Output `pm-0-0-matriz-alineada.json` se vuelve fundamento pedagógico de toda la cadena downstream.

### Workflow operacional v3.0 (Phase 0 + Phase 1)

```
STEP 0.1 · Form xlsx Sergio (sin cambio mayor) → parse → pm-0-0-input.json
STEP 0.2 · subagente_pm_0_0_matriz.py (Camino 2 LLM) ALINEA por RAP
STEP 0.3 · pm-0-0-matriz-alineada.json (output canónico · N RAPs · 7 validation)
GATE 0   · Sergio aprueba alineación matriz
STEP 1.1 · PM-0 v3.0 simplificado consume matriz → pm-0-context.json (8 fields min · libertad LLM)
STEP 1.2 · PM-1.1 ruta macrotemática POR RAP (no agregada)
STEP 1.3 · PM-1.2 scope/curación POR RAP
GATE 1   · Sergio aprueba pm-1-2 · transition Phase 2
```

### Componentes canon v3.0

| Componente | Path | Status |
|---|---|---|
| Master prompt PM-0.0 v1.0 | `master-prompts/PM-0.0 — Matriz Pedagógica Alineadora.md` | ✅ Canon (509 lines · 7 REGLAS · 7 validation_checks) |
| Master prompt PM-0 v3.0 | `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md` | ✅ Simplificado (EXTENSIÓN v3.0 · 10 REGLAS · 5 principios maestros · libertad LLM) |
| Subagente Python | `.claude/skills/fpi-sena-fase3/subagentes/subagente_pm_0_0_matriz.py` | ✅ NEW (Camino 2 LLM · 9.5 KB) · ubicación temporal · migration path documented |
| Helper bundler | `.claude/skills/fpi-sena-fase3/lib/task_tool_bundler.py::preparar_bundle_phase0()` | ✅ NEW |
| Plan arquitectura | `master-prompts/PLAN-FASE-1-ARQUITECTURA.md` | ✅ NEW v1.0 |
| DM canon | `master-prompts/DOCUMENTO MAESTRO ...md` | ✅ Bumped v2.7 → v3.0 |
| Form schema | `form-schema-pm0-pm11.json` | ✅ Bumped v2.7.1 → v3.0 (workflow_v3_0_paradigm_shift block) |

### Migration path skill operacional

Cuando `fpi-sena-fase1` tenga su propia infra `lib/` (planeado · sesión futura):
1. Copiar `master_prompt_loader.py` + `task_tool_bundler.py` desde fase3/lib (con sync VERSIONES_VIGENTES)
2. Mover `subagente_pm_0_0_matriz.py` desde fase3/subagentes a fase1/subagentes
3. Update path imports en subagente
4. Sync test
