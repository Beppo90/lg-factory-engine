# Troubleshooting — Errores comunes en Fase 2

Anti-patrones documentados con casos históricos reales. Heredados de Fase 1 + nuevos específicos de Fase 2.

---

## ⚠ Anti-patrón 1 — "Falsa invención" (lección 2026-04-28)

**Síntoma:** Claude audita un documento, plan o JSON de Fase 2. Identifica N "invenciones" o "campos sin respaldo en canon". Propone eliminarlos. La auditoría parece rigurosa.

**Problema real:** los "supuestos inventos" se declaran sin haber buscado en los **5 vectores canónicos** del repo. Solo se compararon contra la memoria de trabajo de Claude. Cuando algo no está en mi memoria, tiendo a afirmar "es invención" en lugar de "no recuerdo · déjame buscar".

**Caso histórico (auditoría PLAN-FASE-2-ARQUITECTURA.md v1.1 · 2026-04-28):**

Claude llamó "invenciones" a 6 conceptos. La búsqueda exhaustiva forzada por Sergio reveló que TODOS tenían respaldo canónico real:

| "Invención" declarada | Evidencia canónica REAL |
|---|---|
| `archetype_mode` | DIESEL-2026-04-15/18 pm-2-1.json:10 + pm-2-2.json:10 |
| `bloom_ceiling` | MGV-2026-04-20 pm-2-9.json:64 |
| `integration_all_archetypes_policy` | MGV-2026-04-20 — TODOS los 10 pm-2-*.json |
| `archetype_used` (lista N) | DIESEL — TODOS los pm-2-*.json |
| Directiva "Quiero todos los arquetipos para todos los PM" | MGV pm-2-11.json:574 |
| Directiva "LOS ARQUETIPOS DE ACTIVIDADES DE CADA UNA DE LAS PM2.X LOS QUIERO ELEGIR YO" | MGV pm-2-11.json:574 |

**Score:** 6 de 6 "invenciones" eran canon operacional real. Auditoría 0% precisa.

**Fix:** REGLA 20 obligatoria · ejecutar PASO L (5 vectores grep) ANTES de declarar invención. Documentar los 5 greps con resultados en bloque "Verificación REGLA 20".

**Cómo detectar este anti-patrón en una respuesta de Claude:**
- ¿Empezó con "Verificación REGLA 20 — buscando '<término>' en los 5 vectores canónicos"? Si NO → anti-patrón presente
- ¿Cita evidencia con path + línea? Si NO → anti-patrón presente
- ¿Solo declara invención si los 5 vectores están en 0 hits? Si declara sin buscar → anti-patrón presente

---

## ⚠ Anti-patrón 2 — "Discrepancia inventada" (lección 2026-04-28)

**Síntoma:** Claude detecta que un master prompt y la realidad operacional de runs maduros se contradicen. Declara "discrepancia entre canon y realidad" sugiriendo que el sistema tiene un bug.

**Problema real:** NO es discrepancia · es jerarquía canónica no reconocida. La directiva del instructor (Nivel 1) sobrescribe lo que dice el master prompt antiguo (Nivel 3). Los runs operacionales aplican la directiva, no el master prompt.

**Caso histórico (PLAN-FASE-2-ARQUITECTURA.md v1.1 §11 · 2026-04-28):**

Plan v1.1 declaró "discrepancia DIESEL vs MGV vs canon" sobre PM-2.1/PM-2.2. Realidad: master prompts PM-2.1/2.2 v2.0 estaban desactualizados respecto a directiva del instructor capturada en MGV pm-2-11.json:574 ("Quiero todos los arquetipos para todos los PM"). DIESEL aplicó la directiva · MGV-2026-04-20 conservó interpretación antigua. Ambas legítimas.

**Resolución:** Opción A canonizada · master prompts actualizados a v3.0 · DM v2.12 documenta jerarquía.

**Fix:** antes de declarar discrepancia, ejecutar:

```bash
grep -rn "Quiero todos\|LOS QUIERO\|directiva\|directive" runs/MGV-*/pm-2-11.json runs/MGV-*/pm-2-9.json
```

Si encuentras directiva relacionada: la "discrepancia" es realmente "master prompt desactualizado". Acción: actualizar master prompt (NO ignorar la directiva · NO fixar los runs).

Ver `references/jerarquia-canonica.md` para los 3 niveles.

---

## ⚠ Anti-patrón 3 — "Dependencia invertida" (lección 2026-04-28)

**Síntoma:** Claude afirma que un PM produce un output que otro PM consume, pero invierte la dirección.

**Caso histórico (PLAN-FASE-2 v1.1 §5.2):**

Plan dijo "PM-2.5 → PM-2.3 (vocab antes de reading)" basado en que PM-2.5 está LISTADO primero en S2 según pm-2-0.json. Realidad canónica: PM-2.5 master prompt línea 41-43 declara que PM-2.5 RECIBE el Master Anchor Text de PM-2.3. PM-2.3 es el productor · PM-2.5 lo consume. Dirección correcta: **PM-2.3 → PM-2.5**.

**Causa raíz:** confundir "orden de ejecución en aula" (lo que pm-2-0.json declara) con "orden de generación de Activity Cards" (lo que las dependencias canon declaran).

**Fix:** antes de afirmar una dependencia, leer la sección INPUT REQUERIDO del master prompt del PM consumidor. Buscar referencias explícitas como "Master Anchor Text de PM-2.X" o "Grammar targets de PM-2.X".

**Tabla de dependencias canónicas verificadas:**

| Dependencia | Evidencia |
|---|---|
| PM-2.3 → PM-2.5 (Master Anchor) | PM-2.5 master prompt línea 41-43 |
| PM-2.10 → PM-2.4 (Grammar targets) | PM-2.4 master prompt línea 43 |
| PM-2.1 → PM-2.2 (Spark activa · Gap diagnostica) | PM-2.1 v3.0 §247 |
| PM-2.X → PM-2.11 (todas alimentan al Row Assembler) | PM-2.11 v2.6.3 frontmatter |

---

## ⚠ Anti-patrón 4 — "Versión obsoleta en memoria" (lección 2026-04-28)

**Síntoma:** Claude afirma qué hace un PM basándose en versión antigua que recuerda de turnos anteriores.

**Caso histórico:** Plan v1.1 dijo "PM-2.11 ejecuta 4 checks · falta CHECK 9". Realidad: PM-2.11 v2.6.3 (last_verified 2026-04-20) ejecuta **16 checks** · Check 13 = CHECK 9 anti-copia-fantasma desde changelog v2.4. Trabajé con PM-2.11 mental v2.0 (4 checks) que no era la versión vigente.

**Fix:** antes de afirmar qué hace un PM, verificar `version:` en su frontmatter:

| PM | Versión vigente al 2026-04-28 |
|---|---|
| PM-2.0 | v2.6 |
| PM-2.1 | **v3.0** (canonizada Opción A) |
| PM-2.2 | **v3.0** (canonizada Opción A) |
| PM-2.3 a PM-2.10 | v2.0 |
| PM-2.11 | **v2.6.3** (16 checks · Check 13 = CHECK 9) |

Si la versión que ves NO coincide, alguien tocó el canon · validar antes de proceder.

---

## ⚠ Anti-patrón 5 — "Sub-investigación" (lección 2026-04-28)

**Síntoma:** Claude audita o valida algo leyendo 1-2 fuentes parciales en lugar de buscar exhaustivamente.

**Caso histórico:** Auditoría PLAN-FASE-2 v1.1 leyó SOLO los master prompts PM-2.1.md y PM-2.2.md. NO ejecutó grep en runs DIESEL/MGV. NO leyó otros master prompts. NO buscó en planes previos. Resultado: 6 falsas invenciones declaradas.

**Fix:** cuando Sergio diga "REVISA X" o "BUSCA EN Y", usar el subagente Explore (Task tool · subagent_type "Explore") con thoroughness "very thorough" o "medium". NO leer superficialmente.

**Cuándo lanzar Explore vs hacerlo directamente:**

| Situación | Acción |
|---|---|
| Búsqueda dirigida en 1-2 archivos específicos | Read directo |
| Búsqueda de un patrón en un directorio | Grep tool |
| Auditoría completa contra canon en múltiples paths | Task tool subagent_type "Explore" thoroughness "very thorough" |
| Verificación REGLA 20 (5 vectores grep) | Bash tool con `grep -rn` paralelo en los 5 paths |

---

## ⚠ Anti-patrón 6 — "Fixes inventados sin canon" (lección IMARPOR-rework 2026-04-25 · heredado de Fase 1)

**Síntoma:** Claude analiza un pm-X-Y.json y propone N "fixes mecánicos" comparando contra schema derivado en `v4/schemas/`.

**Problema:** los schemas son derivaciones, NO canon. Si schema dice una cosa y master prompt dice otra → master prompt gana. Si schema dice una cosa y MGV-2026-04-20 hace otra → MGV gana.

**Fix:** completar pre-flight ANTES de proponer fixes. Ver `references/pre-flight.md`.

---

## ⚠ Anti-patrón 7 — Saltarse Gate Humano 1 (selección de arquetipos upfront)

**Síntoma:** Orquestador genera Activity Cards sin esperar `arquetipos-elegidos.json` del instructor. Asume valores por defecto.

**Por qué:** PM-2.0 §227-229 documenta que la selección de arquetipos es decisión pedagógica crítica que requiere contexto humano. Asumir defaults produce falsos matches y fuerza iteraciones.

**Costo histórico (lección MGV-2026-04-20):** sin upfront → ~1 día de retrabajo por guía. Con upfront → 0 iteraciones.

**Fix:** validar que existe `runs/[RUN-ID]/arquetipos-elegidos.json` con 9 entradas (una por PM creativo) antes de lanzar subagentes. Ver `references/gates-humanos.md`.

---

## ⚠ Anti-patrón 8 — Aprobar lote sin revisión real (Gate Humano 2)

**Síntoma:** Instructor dice "aprobado" sin abrir las Activity Cards. Orquestador marca `enriched: true` en lote.

**Por qué:** sin revisión, errores de copia-fantasma + desajustes de universo se propagan a Fase 3.

**Fix:** orquestador NO debe marcar `enriched: true` automáticamente. El instructor abre las Activity Cards una por una (o al menos un sample) y las modifica si necesario. Solo después se marca `enriched: true` con auditoría.

---

## ⚠ Anti-patrón 9 — Marcar enriched: true cuando algún check de PM-2.11 falló

**Síntoma:** Check 13 (anti-copia-fantasma) reporta FAIL · orquestador igual procede a Fase 3.

**Por qué:** Check 13 FAIL = bug copia-fantasma activo · alguna pm-2-X.json es byte-idéntica a otra. Si se procede, el bug DIESEL G3-G5 se repite.

**Fix:** esperar regeneración del subagente afectado · NO autorizar Fase 3 hasta PASS 16/16 + lote `enriched: true`.

---

## ⚠ Anti-patrón 10 — Re-implementar los 16 checks en el orquestador

**Síntoma:** orquestador implementa SHA byte-comparison directamente, o suma horas manualmente, o valida V+O+C de cada statement.

**Por qué:** PM-2.11 v2.6.3 ya canoniza estos 16 checks. Re-implementar es duplicación que se desincroniza cuando PM-2.11 se actualiza.

**Fix:** orquestador VERIFICA que `pm-2-validation-report.json` existe + lee `veredicto` + actúa según resultados. La lógica vive en PM-2.11. Ver `references/checks-pm-2-11.md`.

---

## ⚠ Anti-patrón 11 — "Decisión inflada en plan arquitectónico" (lección PLAN-FASE-3 v1.0 · 2026-04-29)

**Síntoma:** Claude escribe un documento de plan arquitectónico (PLAN-FASE-X-ARQUITECTURA.md) y promueve sus propias recomendaciones a "Decisión TOMADA" sin tener:
- (a) canon DM zanjado explícito
- (b) confirmación instructor explícita
- (c) evidencia operacional verificable runtime

El plan se ve sólido · ejecutable · con tabla de "decisiones tomadas" robusta. Pero contiene decisiones del autor disfrazadas de canon.

**Problema real:** es la gemela inversa del Anti-patrón 1 (Falsa invención). En Anti-patrón 1, Claude llama "invenciones" a cosas que SÍ son canon. En Anti-patrón 11, Claude llama "TOMADAS" a recomendaciones que NO son canon todavía. Ambos son inflación de autoridad — uno hacia abajo (negar canon real), uno hacia arriba (promover recomendación a canon).

**Caso histórico (auditoría PLAN-FASE-3-ARQUITECTURA.md v1.0 · 2026-04-29):**

Sergio pidió revisión a fondo del v1.0. Auto-auditoría disciplinada reveló 3 issues críticos donde recomendaciones del autor se habían promovido a "Decisión TOMADA":

| Decisión "TOMADA" en v1.0 | Origen real | Estado canónico real |
|---|---|---|
| §9.1 + §11 #3 + #10: "Híbrido node + Python pragmático" | PRE-FLIGHT §5.2 lo lista como "default sugerido" (NO decidido) | Recomendación · pendiente Sergio post-Hito 4 Fase 2 |
| §5.1 PM-3.6 → "Camino 1 mecánico ensamblador puro" | Tamaño de scripts node 95 KB → asumí Camino 1 puro | NO leí pm-3-6-new-gen.js · narrativa 2ª persona puede requerir LLM (Camino 2) |
| §11.1 #9 "Paralelización PM-3.2 ×8 (Task tools) validada" | Runtime Fase 2 PM-2.6 ║ PM-2.8 = ×2 validado | ×8 es extrapolación · NO validación |

**Score:** 3 de 10 "decisiones tomadas" eran inflaciones (30% del bloque §11.1). El v1.0 fue corregido a v1.0.1 hotfix con 7 fixes scope (a) revisado.

**Fix:** REGLA 21 obligatoria · ejecutar PASO M (auditoría de origen) ANTES de marcar cualquier decisión como "TOMADA" en plan arquitectónico. Cada decisión debe tener uno de 3 sustentos:
1. **Canon DM zanjado:** cita literal con § + line del DM
2. **Confirmación Sergio explícita:** cita de turno conversacional con timestamp
3. **Evidencia operacional verificable:** path + line de runs/* + comando reproducible

Si NO tiene ninguno de los 3 · va a §11.2 "gaps pendientes Sergio", NO a §11.1 "decisiones tomadas".

**Cómo detectar este anti-patrón en una respuesta de Claude (escribiendo plan):**
- ¿Cada item de §11.1 cita uno de los 3 sustentos canónicos? Si NO → anti-patrón presente
- ¿El bloque "Justificación" termina con "trade-off costo vs riesgo" o "sentido común" sin canon? Si SÍ → anti-patrón presente
- ¿Hay decisiones que el lector pueda contestar "y eso quién lo decidió"? Si SÍ → anti-patrón presente
- ¿Las decisiones controversiales están en §11.1 (TOMADAS) o §11.2 (TBD)? Si controversial en §11.1 → anti-patrón presente

**Implicación arquitectónica:** los planes arquitectónicos son contratos pedagógicos · contaminarlos con decisiones del autor disfrazadas de canon corrompe el siguiente Hito de construcción que parte de ellos. Una recomendación canonizada incorrectamente se vuelve hardcoded en código del subagente · la deuda técnica es difícil de recuperar.

**Diferenciación vs Anti-patrón 1 (Falsa invención):**

| Aspecto | Anti-patrón 1 (Falsa invención) | Anti-patrón 11 (Decisión inflada) |
|---|---|---|
| Contexto | Auditoría de JSONs / planes existentes | Escritura de planes nuevos |
| Dirección de inflación | Hacia abajo (niega canon real) | Hacia arriba (promueve recomendación a canon) |
| Fix | REGLA 20 · 5 vectores grep antes de negar | REGLA 21 · auditoría origen antes de afirmar TOMADA |
| Detección | Bloque "Verificación REGLA 20" | Bloque "Verificación REGLA 21" |

---

## Cómo el instructor detecta cualquiera de estos anti-patrones

Si Claude responde sin:
- Bloque "Pre-flight Fase 2 cumplido" listando los 11 PASOS A-K
- Bloque "Verificación REGLA 20" cuando audita o niega existencia (Anti-patrón 1)
- Bloque "Verificación REGLA 21" cuando escribe plan arquitectónico (Anti-patrón 11)
- Citación de master prompts y refs operacionales con path + línea
- Verificación de `version:` antes de afirmar qué hace un PM

→ Anti-patrón presente. Sergio responde: "Ejecuta pre-flight + REGLA 20/21 antes de continuar."

---

## ⚠ Bugs PM-2.0 architect detectados en smoke 2026-04-29 (TODOs · arreglar antes de Semana 5 E2E)

| ID | Bug | Severidad | Fix recomendado |
|---|---|---|---|
| **TODO-2** | PM-2.0 hardcodea 8 sesiones · IMARPOR-CC necesita 12 (single-guía absorpción) | HIGH | Consultar `pm0_context.numero_sesiones_competencia` para N |
| **TODO-3** | PM-2.0 NO consulta `regla_bloques` para ramificar single-guía vs multi-guía | MEDIUM | Ramificar según `pm-1-1.regla_bloques` |
| **TODO-4** | Single-guía absorpción NO carga pm-1-2 desde raíz | MEDIUM | Detectar `regla_bloques == absorcion_Na1` · cargar de raíz |
| **TODO-5** | Distribución horas 80/20 fija · IMARPOR-CC canon es 72/28 | MEDIUM | Detectar tipo de programa · usar canon específico |

Reporte completo en `runs/_smoke/SMOKE-TEST-2026-04-29/SMOKE-REPORT.md`.

**Status:** documentados · NO bloquean Semana 3 (subagentes creativos no consumen pm-2-0.session_blueprint todavía). Arreglar antes de Semana 5 E2E.

### ✅ TODOs 2-5 RESUELTOS — 2026-04-28

Subagente `subagente_pm_2_0_architect.py` v1.0 → **v1.1** con 4 fixes aplicados y validados:

| TODO | Fix aplicado | Verificado contra |
|---|---|---|
| **TODO-2** | `determinar_num_sesiones(pm11)` ahora lee `pm-1-1.sesiones_por_bloque` (NO `pm0_context.numero_sesiones_competencia` — campo inconsistente entre runs · MGV=48 total programa · ausente en IMARPOR-CC) | IMARPOR-CC=12 · INGBAS4=16 · INGBAS1-AGRO=8 · MGV/g1=8 |
| **TODO-3** | `calcular_distribucion_horas(pm11, num, regla_bloques)` ramifica · `alineacion_1a1` aplica canon estricto 48d+12a · `absorcion_Na1` usa valores reales de pm-1-1 | 4 patrones canónicos validados |
| **TODO-4** | `input_loader.load_phase2_inputs` ya tenía fallback raíz cuando `g1/pm-1-2.json` no existe (single-guía absorpción canon) — verificado funciona contra smoke fixture (pm-1-2 en raíz · enriched=true cargado correctamente) | SMOKE-TEST-2026-04-29 |
| **TODO-5** | Eliminado `total * 0.8 / total * 0.2` hardcoded · ahora usa `horas_directas_total` y `horas_autonomas_total` reales del pm-1-1. Validación `horas_match_pm11: true` con tolerancia 0.01 (precisión float 6 decimales) | 72d+28a IMARPOR-CC · 48d+0a INGBAS · 48d+12a MGV |

**Funcionalidad nueva agregada:**

- **`human_adaptation_required` flag**: emitido en blueprint cuando N≠8 (single-guía absorpción 12/16). Mapea N físicas → 8 fases canónicas proporcionalmente, marca cada sesión con `fase_canonica_origen` + `adaptation_note`. Instructor revisa el mapeo antes de Fase 3.
- **`deviation_from_canon`**: emitido en blueprint cuando multi-guía (alineacion_1a1) tiene `horas_por_bloque ≠ 60` (canon estricto PM-2.0 v2.6).
- **Validación `horas_match_pm11`**: suma de horas asignadas a sesiones debe coincidir con `horas_directas_total + horas_autonomas_total` del pm-1-1.

**Source of truth canónica documentada en docstring del subagente:**

```
pm-1-1.json.regla_bloques            ∈ {"alineacion_1a1", "absorcion_Na1"}
pm-1-1.json.sesiones_por_bloque       — N sesiones POR GUÍA
pm-1-1.json.horas_directas_total      — horas directas reales por guía
pm-1-1.json.horas_autonomas_total     — horas autónomas reales por guía
pm-1-1.json.horas_por_bloque          — horas totales por guía
```
