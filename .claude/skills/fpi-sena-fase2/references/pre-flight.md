# PRE-FLIGHT OBLIGATORIO Fase 2 — Lectura de canon antes de cualquier acción

> **Regla dura:** Antes de orquestar subagentes, generar Activity Cards, validar GFPI-F-134, presentar catálogos de arquetipos, o hacer cualquier juicio sobre Fase 2, **DEBES haber leído los archivos de canon listados abajo en esta sesión.** No "los leí en otra sesión." No "los recuerdo de mi entrenamiento." No "el SKILL.md me dice qué hacer." Leerlos AHORA, en este turno.
>
> Esta regla existe porque la lección IMARPOR-rework-2026-04-25 + auditoría PLAN-FASE-2 v1.1 2026-04-28 demostraron que cumplir SKILL.md superficialmente genera "fixes inventados" + "invenciones falsas". Para Fase 2 el riesgo es ~10× mayor por la cantidad de PMs y dependencias.
>
> Esta es REGLA 19 PASOS A-K + REGLA 20 PASO L del DM v2.12 aplicadas literalmente al contexto de Fase 2.

---

## Checklist de pre-flight (los 11 archivos canon de Fase 2 + REGLA 20)

Marcar cada uno solo si lo leíste en ESTA sesión, en ESTE turno.

### Master prompts SOT pedagógica (11 archivos)

- [ ] **PASO A** · `master-prompts/PM-2.0 — RAP Session Architect.md` v2.6
  - Especialmente §86-137 (Distribución por Sesión + Asignación de PMs)
  - Especialmente §173-225 (Catálogo de Arquetipos)
  - Especialmente §211-223 (Tabla resumen del catálogo · ~52 arquetipos máximo)

- [ ] **PASO B** · `master-prompts/PM-2.1 — The Spark — Reflexión Inicial.md` **v3.0** (canonizada 2026-04-28)
  - Especialmente §55-89 (MODO DEFAULT: The Narrative Scenario)
  - Especialmente §90-119 (MODO EXTENSIBLE: 4 arquetipos secuencia encadenada)
  - Especialmente §123-159 (cómo se declara cada modo en arquetipos-elegidos.json)
  - ⚠️ Si la versión NO es v3.0, alguien tocó el canon · validar antes de continuar

- [ ] **PASO C** · `master-prompts/PM-2.2 — Gap Analysis — Contextualización.md` **v3.0** (canonizada 2026-04-28)
  - Especialmente §51-81 (MODO DEFAULT: The Mirror)
  - Especialmente §85-114 (MODO EXTENSIBLE: 4 arquetipos secuencia encadenada)
  - ⚠️ Si la versión NO es v3.0, alguien tocó el canon · validar antes de continuar

- [ ] **PASO D** · `master-prompts/PM-2.3 — Reading — The Master Anchor.md` v2.0
  - Especialmente sección de arquetipos (6 arquetipos A-F)
  - PM-2.3 es PRODUCTOR del Master Anchor Text · PM-2.5 lo CONSUME (dependencia v1.2)

- [ ] **PASO E** · `master-prompts/PM-2.4 — Writing — Task-Based.md` v2.0
  - 5 arquetipos A-E
  - PM-2.4 CONSUME Grammar de PM-2.10

- [ ] **PASO F** · `master-prompts/PM-2.5 — Literacy & Vocabulary Skills.md` v2.0
  - 5 arquetipos A-E
  - Línea 41-43: dependencia explícita de PM-2.3 (Master Anchor Text)

- [ ] **PASO G** · `master-prompts/PM-2.6 — Listening — The Auditory Anchor.md` v2.0
  - 6 arquetipos A-F (mismo que PM-2.3)
  - Story B asignada por PM-1.2

- [ ] **PASO H** · `master-prompts/PM-2.8 — Speaking — The Mission.md` v2.0
  - 5 arquetipos A-E
  - Incluye pronunciation scaffolding (PM-2.7 deprecated · funcionalidad en PM-2.8)

- [ ] **PASO I** · `master-prompts/PM-2.9 — Language Functions — Communicative Competence.md` v2.0
  - 5 arquetipos A-E

- [ ] **PASO J** · `master-prompts/PM-2.10 — Grammar — Structure Use.md` v2.0
  - 5 arquetipos A-E
  - PM-2.10 PRODUCE Grammar targets que PM-2.4 consume

- [ ] **PASO K** · `master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` **v2.6.3** (last_verified 2026-04-20)
  - Los **16 checks** documentados en líneas 623-984
  - Especialmente Check 13 = CHECK 9 del DM (anti-copia-fantasma · SHA byte-comparison)
  - Check 14 = propagación estrategias didácticas · Check 15 = footer · Check 16 = Activity Card schema v2.6.3
  - ⚠️ Si la versión NO es v2.6.3, alguien tocó el canon · validar antes de continuar

### Refs operacionales canon de facto (mínimo 1 de cada estilo)

- [ ] `runs/MGV-2026-04-20/pm-2-*.json` — al menos pm-2-3 + pm-2-9 + pm-2-11 (estilo `mgv_compendio_metodologico`)
- [ ] `runs/DIESEL-2026-04-19/pm-2-*.json` — al menos pm-2-1 + pm-2-3 + pm-2-11 (estilo `diesel_secuencia_encadenada`)

### Plan arquitectónico + jerarquía canónica

- [ ] `master-prompts/PLAN-FASE-2-ARQUITECTURA.md` v1.3 (especialmente §3 distinción mecánico/híbrido/creativo · §4.5 catálogo arquetipos · §5 algoritmo orquestador · §6 PM-2.11 + 16 checks · §11 jerarquía canónica RESUELTA)
- [ ] `master-prompts/DOCUMENTO MAESTRO ... .md` §11 v2.12 (jerarquía canónica de autoridad documentada · 3 niveles)

---

## REGLA 20 PASO L — Verificación antes de negar (cuando audites)

Cuando estés a punto de afirmar que un concepto/campo/término "no existe" / "es invención" / "falta", ejecutar grep en los **5 vectores canónicos** ANTES de negar:

| Vector | Comando |
|---|---|
| (a) Master prompts canon | `grep -rn "<término>" master-prompts/PM-*.md` |
| (b) Runs DIESEL completos | `grep -rn "<término>" runs/DIESEL-*/` |
| (c) Runs MGV completos | `grep -rn "<término>" runs/MGV-*/` |
| (d) Scripts .js de generadores | `grep -rn "<término>" runs/*/scripts/` |
| (e) Planes arquitectónicos previos | `grep -rn "<término>" master-prompts/PLAN-*.md` |

**Regla dura:** solo si los 5 vectores arrojan 0 hits, puedes afirmar que es invención. Si 1+ vectores tienen hits, el concepto SÍ existe canónicamente · debes citar evidencia (path + línea) y NO declarar invención.

---

## Reglas operacionales del pre-flight Fase 2

### Regla 1 — Jerarquía canónica de autoridad

Cuando hay conflicto entre fuentes, respetar este orden estricto:

```
1. Directiva del instructor (capturada literal en runs maduros · ej. MGV pm-2-11.json:574)
   ↓
2. Implementación operacional canonizada (DIESEL/MGV runs maduros)
   ↓
3. Master prompts canon (deben actualizarse cuando contradigan niveles 1-2)
```

Si un master prompt dice "X" pero los runs maduros (que reflejan directiva del instructor) hacen "Y", **gana el run** · el master prompt es candidato a actualización, NO el run candidato a "fixarse". Ver `references/jerarquia-canonica.md`.

### Regla 2 — Las dependencias entre PMs están en los master prompts, NO inventes

| Dependencia | Evidencia canon |
|---|---|
| PM-2.3 → PM-2.5 (PM-2.3 produce Master Anchor · PM-2.5 lo consume) | PM-2.5 master prompt línea 41-43 |
| PM-2.10 → PM-2.4 (PM-2.10 produce Grammar targets · PM-2.4 los consume) | PM-2.4 master prompt línea 43 |
| PM-2.1 → PM-2.2 (Spark activa motivación · Gap diagnostica) | PM-2.1 v3.0 §247 + PM-2.2 v3.0 §236 |
| PM-2.X → PM-2.11 (todas las Activity Cards alimentan al Row Assembler) | PM-2.11 v2.6.3 frontmatter `depends_on` |

NO inventes dependencias adicionales. NO inviertas las existentes. La asignación PM-a-sesión (PM-2.5 listado primero en S2 según pm-2-0.json) es ORDEN DE EJECUCIÓN EN AULA, no orden de generación de Activity Cards.

### Regla 3 — Las versiones de los master prompts son frágiles

Antes de afirmar qué hace un PM, verificar `version:` en su frontmatter:

| PM | Versión vigente al 2026-04-28 |
|---|---|
| PM-2.0 | v2.6 |
| PM-2.1 | **v3.0** (canonizada Opción A 2026-04-28) |
| PM-2.2 | **v3.0** (canonizada Opción A 2026-04-28) |
| PM-2.3 a PM-2.10 | v2.0 |
| PM-2.11 | **v2.6.3** (16 checks · Check 13 = CHECK 9 anti-copia) |

Si la versión que ves NO coincide con la tabla, alguien tocó el canon · validar antes de proceder.

### Regla 4 — Documentar el pre-flight cumplido en el output

Cuando reportes al instructor, abre la respuesta con:

```
## Pre-flight Fase 2 cumplido
- ✓ PM-2.0 v2.6 §173-225 leído (catálogo arquetipos)
- ✓ PM-2.1 v3.0 §55-159 leído (2 modos canonizados)
- ✓ PM-2.11 v2.6.3 líneas 623-984 leído (16 checks)
- ✓ MGV-2026-04-20 pm-2-3.json + pm-2-11.json leídos (estilo mgv_compendio_metodologico)
- ✓ DIESEL-2026-04-19 pm-2-1.json + pm-2-3.json leídos (estilo diesel_secuencia_encadenada)
- ✓ PLAN-FASE-2-ARQUITECTURA.md v1.3 §3-6 + §11 leído
- ✓ DM v2.12 §11 jerarquía canónica leída
- (etc.)
```

Sin este bloque, el instructor sabe que estás operando desde memoria o invención.

### Regla 5 — REGLA 20 obligatoria al auditar/negar

Cuando audites o niegues existencia de algo, ejecutar PASO L (5 greps) ANTES y documentar:

```
## Verificación REGLA 20
Buscando "<término>" en los 5 vectores canónicos:
- (a) master-prompts/PM-*.md → N hits / 0 hits (si hits: PM-X.Y.md:LINEA)
- (b) runs/DIESEL-*/ → N hits / 0 hits
- (c) runs/MGV-*/ → N hits / 0 hits
- (d) runs/*/scripts/ → N hits / 0 hits
- (e) master-prompts/PLAN-*.md → N hits / 0 hits

Veredicto: [INVENCIÓN confirmada — 5/5 vectores en 0] / [CANON confirmado — N hits en vector X]
```

---
---

## REGLA 21 PASO M — Verificación de origen antes de marcar "TOMADA" (cuando escribes plan arquitectónico)

> **Regla dura gemela inversa de REGLA 20:** Antes de promover una recomendación a "Decisión TOMADA" en un plan arquitectónico (PLAN-FASE-X-ARQUITECTURA.md o similar), DEBES haber identificado uno de 3 sustentos canónicos. Sin sustento, la decisión va a "gaps pendientes Sergio", NO a "decisiones tomadas".
>
> Esta regla existe porque la lección PLAN-FASE-3 v1.0 → v1.0.1 (2026-04-29) demostró que escribir planes con confianza sin auditoría de origen genera el anti-patrón gemelo inverso de "Falsa invención": **inflación de autoridad hacia arriba** (recomendaciones del autor disfrazadas de canon).
>
> Esta es REGLA 21 PASO M aplicada al contexto de redacción de planes arquitectónicos en Fase 2 + futuras (Fase 3).

### Los 3 sustentos canónicos válidos para una "Decisión TOMADA"

| Sustento | Forma de cita | Ejemplo |
|---|---|---|
| **(1) Canon DM zanjado** | path + § + line del DOCUMENTO MAESTRO | `DM §11 v2.12 entry:877 — "PM-2.1/PM-2.2 v3.0 con 2 modos canonizados"` |
| **(2) Confirmación instructor explícita** | turno conversacional + cita literal | `Sergio 2026-04-28 18:42: "Vamos con A — disciplinado · cierro Hito 4 primero"` |
| **(3) Evidencia operacional verificable** | path + line de runs/* + comando reproducible | `runs/MGV-2026-04-20/pm-2-1.json:64 → bloom_ceiling_a11 (verificable: grep -n "bloom_ceiling")` |

Si una decisión NO encaja en ninguno de los 3 → es **recomendación del autor** · va a §11.2 "gaps pendientes Sergio" del plan, NO a §11.1 "decisiones tomadas".

### PASO M · ejecutar al escribir cada item de §11.1 "Decisiones TOMADAS"

Para cada item del bloque "decisiones tomadas":

1. **Identificar sustento:** ¿cuál de los 3 aplica?
2. **Verificar la cita:** path + § + line existe realmente · texto matches lo afirmado
3. **Si falla la verificación:** mover a §11.2 "gaps pendientes" como "Recomendación · pendiente Sergio"
4. **Documentar la cita:** la justificación de §11.1 debe incluir el sustento explícito

### Regla 6 — REGLA 21 obligatoria al escribir plan arquitectónico

Cuando escribas un plan arquitectónico y vayas a marcar decisiones como "TOMADAS", ejecutar PASO M y documentar:

```
## Verificación REGLA 21
Auditando §11.1 "Decisiones TOMADAS" del plan:

| # | Decisión | Sustento canónico | Cita |
|---|---|---|---|
| 1 | Skill separada `fpi-sena-fase3` | (1) Canon DM | DM §x + PLAN-FASE-2 §11 línea 572 |
| 2 | Híbrido node + Python | NINGUNO de los 3 | → mover a §11.2 gaps |
| 3 | ... | ... | ... |

Veredicto: N/M decisiones con sustento canónico válido · K decisiones movidas a gaps
```

Sin este bloque al escribir el plan, el instructor sabe que estás inflando autoridad. Las decisiones sin sustento contaminan el siguiente Hito de construcción.

**Lección 2026-04-29 (PLAN-FASE-3 v1.0):** auditoría post-hoc reveló 3 de 10 "decisiones tomadas" eran inflaciones (30%):
- §9.1 "Híbrido node + Python pragmático" — origen: PRE-FLIGHT §5.2 default sugerido
- §5.1 PM-3.6 → "Camino 1 puro" — origen: tamaño de scripts asumido (NO leí código)
- §11 #9 "Paralelización ×8 validada" — origen: extrapolación de ×2 runtime

Costo: 1 ciclo de auto-auditoría + hotfix v1.0 → v1.0.1 con 7 fixes scope (a) revisado por Sergio.

### Diferenciación REGLA 20 vs REGLA 21

| Aspecto | REGLA 20 (PASO L) | REGLA 21 (PASO M) |
|---|---|---|
| **Contexto** | Auditando JSONs/planes existentes | Escribiendo plan arquitectónico nuevo |
| **Verbo gatillo** | "afirmar invención" / "negar existencia" | "marcar como TOMADA" |
| **Inflación que evita** | Hacia abajo (negar canon real) | Hacia arriba (promover recomendación a canon) |
| **Bloque de auditoría** | "Verificación REGLA 20" (5 vectores grep) | "Verificación REGLA 21" (3 sustentos por decisión) |
| **Fix de fallo** | Citar evidencia con path + línea | Mover decisión a §11.2 gaps |


## Anti-patrones a evitar (heredados Fase 1 + nuevos Fase 2)

Ver `references/troubleshooting.md` para detalle:

1. **Falsa invención** (lección 2026-04-28) — declarar invenciones sin REGLA 20 · score 6/6 falsas en caso histórico
2. **Discrepancia inventada** (lección 2026-04-28) — formular "discrepancia entre fuentes" sin reconocer jerarquía canónica
3. **Dependencia invertida** (lección 2026-04-28) — afirmar PM-2.5 → PM-2.3 cuando real es PM-2.3 → PM-2.5
4. **Versión obsoleta en memoria** (lección 2026-04-28) — trabajar con PM-2.11 v2.0 (4 checks) cuando vigente es v2.6.3 (16 checks)
5. **Sub-investigación** (lección 2026-04-28) — auditar leyendo 1-2 fuentes parciales en lugar de buscar exhaustivamente
6. **Fixes inventados sin canon** (lección IMARPOR-rework 2026-04-25) — proponer fixes contra schemas derivados en lugar de master prompts
