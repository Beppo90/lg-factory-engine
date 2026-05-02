---
title: PLAN ARQUITECTÓNICO — Fase 2 (PM-2.0 a PM-2.11) — Skill Orquestador con Subagentes
version: 1.4
status: ACTIVE — PM-2.0 v3.0 architect heredero canonizado · Fase 1 validada en IMARPOR-V2 (cascade tripartita 23/23 PASS) · listo para Step 1.5 PM-2.x downstream
last_updated: 2026-05-02
changelog_v1_4_pm20_v30_heredero:
  - "PM-2.0 v2.6 → v3.0 (paradigm shift architect heredero · cascade Step 1.4 IMARPOR-V2 · post Phase 1 v3.x)"
  - "Architect ya NO inventa distribución sesiones · HEREDA literal de pm-1-1 v2.8 (sesiones_anchor) + pm-1-2 v4.2 (_consumed_by_pm + _produces_evidencia) + matriz v1.2+ (criterios canon)"
  - "Schema output diferenciado por tipo_bloque sesión (3 schemas: APERTURA + APROPIACIÓN + TRANSFERENCIA)"
  - "8 validation_checks BLOQUEANTES (6 v2.6 preservados re-formulados + 2 NEW: tipo_bloque_consistente + traceability_heredada_completa)"
  - "Distribución 8-sesiones-fijas v2.6 DEPRECATED (era hardcoded Técnico/Tecnológico · v3.0 dinámico hereda)"
  - "Catálogo 52 arquetipos PM-2.1-2.10 v2.6 PRESERVADO (selección upfront por instructor · sin cambios)"
  - "Status DRAFT-PLAN → ACTIVE (Fase 1 validada · re-cascade IMARPOR-V2 23/23 PASS · listo PM-2.x downstream Step 1.5+)"
  - "Documentación cascade impact: PM-2.0 v3.0 alimenta PM-2.1/2.2/2.3-2.10/2.11/3.5/4.2 con sesión target heredada"
autor: Sergio Cortés Perdomo + Claude (skill fpi-sena-fase1 · sesión arquitectónica 2026-04-28)
changelog_v1_3_decision_canonizada:
  - "Decisión arquitectónica Sergio 2026-04-28: Opción A canonizada (interpretación DIESEL adoptada como canon)"
  - "PM-2.1.md actualizado v2.0 → v3.0: 2 modos (DEFAULT 'Narrative Scenario' + EXTENSIBLE 4 arquetipos secuencia encadenada)"
  - "PM-2.2.md actualizado v2.0 → v3.0: 2 modos (DEFAULT 'The Mirror' + EXTENSIBLE 4 arquetipos secuencia encadenada)"
  - "DM v2.11 → v2.12: jerarquía canónica documentada (directiva instructor > operacional canonizado > master prompt)"
  - "§11.5 estado: PENDIENTE → RESUELTO ✓"
  - "Hito 2 ahora DESBLOQUEADO para arrancar (cuando Fase 1 esté validada en producción real)"
changelog_v1_2_mea_culpa:
  - "AUDITORÍA v1.1 SUB-INVESTIGÓ: Claude llamó 'invenciones' a 6 conceptos que SÍ tienen origen canónico operacional en runs DIESEL + MGV-2026-04-20. Sergio detectó la sub-investigación y forzó búsqueda exhaustiva real."
  - "EVIDENCIA REAL DE CADA 'invención' falsa:"
  - "  - archetype_mode → SÍ existe: DIESEL pm-2-1.json:10 + pm-2-2.json:10 ('secuencia encadenada — 4 momentos en S1')"
  - "  - bloom_ceiling → SÍ existe: MGV-2026-04-20 pm-2-9.json:64 ('bloom_ceiling_a11')"
  - "  - integration_all_archetypes_policy → SÍ existe: MGV-2026-04-20 en TODOS los 10 pm-2-*.json"
  - "  - archetype_used (lista N arquetipos) → SÍ existe: DIESEL en TODOS los pm-2-*.json (PM-2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10) uniformemente"
  - "  - 'Quiero todos los arquetipos para todos los PM' → directiva canónica del instructor capturada literalmente en MGV pm-2-11.json:574 + pm-2-9.json:825"
  - "  - 'LOS ARQUETIPOS DE ACTIVIDADES DE CADA UNA DE LAS PM2.X LOS QUIERO ELEGIR YO' → directiva del instructor capturada literalmente en MGV pm-2-11.json:574"
  - "INVENCIONES REALES de v1.1 (terminología sin respaldo en runs · ahora corregidas):"
  - "  - Los 5 enums STRINGS LITERALES (DETONANTE_UNICO_FORZADO, etc.) — eliminados · reemplazados por nombres operacionales reales"
  - "  - 'PM-2.10ext' — eliminado · DIESEL pm-2-0.json confirma S5 = solo PM-2.9"
  - "  - 'Patrón A/B/C' nomenclatura — eliminada · reemplazada por 'estilo MGV compendio metodológico' vs 'estilo DIESEL secuencia encadenada'"
  - "  - flow_rotation_suggestion como campo nombrado — eliminado · MGV usa el concepto en texto pero no como campo JSON"
  - "ERROR FACTUAL CORREGIDO: §6.2 v1.1 dijo 'CHECK 9 falta en PM-2.11' — FALSO. PM-2.11 v2.6.3 ejecuta 16 checks · Check 13 = CHECK 9 anti-copia-fantasma desde changelog v2.4 (2026-04-20)"
  - "ERROR DE DEPENDENCIA CORREGIDO: §5.2 v1.1 dijo 'PM-2.5 → PM-2.3' — INVERTIDO. PM-2.3 produce Master Anchor Text · PM-2.5 lo consume (PM-2.5 master prompt línea 41 explícito)"
  - "REESCRITURA §11: NO es 'discrepancia DIESEL vs MGV vs canon'. ES 'master prompt PM-2.1/PM-2.2 v1.0 está DESACTUALIZADO respecto a directiva canónica del instructor capturada operacionalmente en MGV/DIESEL'. Acción requerida: actualizar master prompts PM-2.1 y PM-2.2 a v2.0."
changelog_v1_1_superseded:
  - "Conceptos válidos preservados: archetype_mode (DIESEL) · bloom_ceiling (MGV) · integration_all_archetypes_policy (MGV) · compendio metodológico vs secuencia encadenada como estilos operacionales legítimos"
  - "PM-2.0 sigue clasificado como HÍBRIDO (mecánico blueprint + propositivo catálogo · gate humano)"
  - "Algoritmo orquestador con GATE HUMANO de selección de arquetipos antes del lanzamiento paralelo (§5.3) — preservado"
---

# PLAN ARQUITECTÓNICO — FASE 2 FÁBRICA CURRICULAR FPI SENA

## Documento estable de referencia para construir `fpi-sena-fase2`

---

## 0. Estado y propósito del documento

**Estado:** DRAFT-PLAN. NO es para implementación inmediata. Es la especificación arquitectónica que se ejecutará después de validar Fase 1 en producción real (~2-3 semanas con Nellis y otros instructores).

**Propósito:** capturar las decisiones arquitectónicas tomadas en la sesión 2026-04-28 entre Sergio y Claude, después de completar exitosamente Fase 1 para 4 runs (MGV-2026-04-27, IMARPOR-CC-2026-04-27, INGBAS4-2026, INGBAS1-AGRO-2026). Sirve como input directo cuando se arranque la construcción de la skill `fpi-sena-fase2`.

**Pre-requisito de activación:** que Fase 1 haya pasado por al menos 1 ciclo de uso real (Instructor Selection completada por Nellis + revisión de algún colega adicional + lecciones documentadas). Sin esto, construir Fase 2 corre el riesgo de quemar 1-2 semanas en supuestos que se rompen al primer contacto con la realidad.

**Quién mantiene este documento:** Sergio, instructor responsable. Claude actualiza cuando recibe instrucciones directas.

---

## 1. Por qué Fase 2 NO es "más de Fase 1"

Esta sección justifica por qué necesitamos arquitectura diferenciada y no podemos extender el patrón de Fase 1.

### 1.1 Comparación dimensional Fase 1 vs Fase 2

| Dimensión | Fase 1 (PM-0/1.1/1.2) | Fase 2 (PM-2.0 a 2.11) |
|---|---|---|
| **Cantidad de PMs** | 3 (lineales) | 11 (con dependencias cruzadas) |
| **Output por run** | 3 docs por guía | 8 sesiones × 6-10 actividades × N guías = 48+ Activity Cards |
| **Variabilidad output** | Determinística (schema canónico fijo) | 52 arquetipos a elegir entre 6 PMs (combinatoria explosiva) |
| **Creatividad pedagógica requerida** | Baja (estructura + plantillas) | Alta (anchor texts originales, diálogos auténticos, tareas integradoras) |
| **Riesgo "copia-fantasma"** | Bajo (cada PM-1.2 es claramente del run) | **CRÍTICO** — el bug DIESEL G3-G5 fue exactamente esto: pm-2-3/5/6 byte-idénticos entre guías. Repetido 3 veces. |
| **Validaciones** | 27 reglas (9 × 3 PMs) | 4 checks de coherencia GFPI-F-134 + CHECK 9 anti-copia + matriz GFPI completa (11 cols × N filas) |
| **Tiempo por run** | ~30 min generación + 1 día revisión | Días o semanas |
| **Memoria de trabajo simultánea** | 3 master prompts + 1 ref operacional | 11 master prompts + 52 arquetipos + cadena de previous_pms · imposible sin externalizar |

### 1.2 El insight clave

Fase 1 funcionó como skill porque cabe en mi memoria de trabajo con esfuerzo. Fase 2 NO cabe. Sin skill dedicada, voy a derivar (improvisar fuera del canon) — pero peor que en IMARPOR-rework, porque cada error contamina N sesiones de N guías. La skill no es un lujo: es la disciplina externalizada que evita que la creatividad pedagógica se convierta en ruido pedagógico.

---

## 2. Las 4 opciones arquitectónicas evaluadas

### 2.1 Tabla comparativa

| Opción | Cómo | Pro | Con | Riesgo |
|---|---|---|---|---|
| **(1) Monolito** `fpi-sena-fase2` | 1 skill con 11 PMs adentro | Simple invocar | Misma trampa de memoria de trabajo · 11 master prompts NO caben en pre-flight serio | Alto · derivo |
| **(2) Modular** 3-4 skills temáticas | `fase2-architect` + `fase2-receptive` + `fase2-productive` + `fase2-system` | Cada skill tiene 2-3 PMs · pre-flight focalizado | Orquestación entre skills compleja · instructor decide qué skill usar cuándo | Medio |
| **(3) Orquestador con subagentes** | 1 skill que LANZA Task tools en paralelo (1 subagente por PM) | Aprovecha paralelismo · pre-flight global · CHECK 9 automatizable | Más complejo de construir · curva de aprendizaje | Bajo en runtime, alto en construcción |
| **(4) Sin skill** — checklist + plantillas | Lo que hicimos en Fase 1 antes de la skill: scripts gen-*.py + checklist md | Cero overhead | Vuelve a depender de mi memoria de trabajo · ya sabemos que falla | Alto · regreso al patrón pre-2026-04-25 |

### 2.2 Decisión: Opción 3 (Orquestador con subagentes)

Por 4 razones canónicas:

1. **Fase 2 es paralela por naturaleza.** Los 9 PMs de Activity Generation tienen dependencias mínimas entre sí (todos consumen el mismo pm-1-2 + pm-0-context + pm-2-0). Un orquestador puede lanzarlos en paralelo via Task tool, no en serie.

2. **CHECK 9 anti-copia-fantasma se automatiza.** El orquestador hashea con SHA cada `pm-2-3.json` post-generación y compara byte-a-byte con runs anteriores. Si son idénticos (salvo `run_id`): STOP automático. El bug DIESEL G3-G5 ya no se repite.

3. **El orquestador hace pre-flight UNA VEZ.** Lee los 11 master prompts en su propio contexto al inicio. Los subagentes reciben solo lo que necesitan ("acá está el master prompt de PM-2.3 + el ref operacional MGV-2026-04-20-G1"). No tienen que re-leer todo el canon.

4. **Validación centralizada.** El orquestador ejecuta los 4 checks de coherencia GFPI-F-134 al cierre, no cada subagente. Una sola fuente de verdad sobre si el run pasa o no.

---

## 3. Distinción crítica — "skill mecaniza" vs "skill propone + gate humano"

Aclaración de fondo que sutiliza la división de los 11 PMs.

La distinción real **no** es "skill-sí vs skill-no". Es "qué hace la skill en cada PM":

| Tipo de PM | PMs específicos | Qué hace la skill |
|---|---|---|
| **Mecánicos puros** (output determinístico desde inputs) | PM-2.11 row assembler · PM-4.1 instruments derivador · PM-4.2 cuestionario | Skill **genera directo** · validación inline · output autoritativo |
| **Híbridos** (mecánico para blueprint + propositivo para catálogo · gate humano de selección) | **PM-2.0 architect** | Skill genera blueprint mecánico + presenta catálogo de arquetipos al instructor + espera selección flexible (N arquetipos por PM-2.x) → ver §4.5 |
| **Creativos con gate humano** | PM-2.3 reading · PM-2.4 writing · PM-2.6 listening · PM-2.8 speaking · PM-2.9 functions · PM-2.10 grammar · PM-2.1 spark · PM-2.2 gap | Skill **propone draft** con pre-flight serio + validación · marca `enriched: false` · espera que vos/Nellis apruebe/ajuste |

### 3.1 Por qué esto importa

- Los "creativos" NO quedan **fuera** de la skill — quedan **adentro con gate**. Igual que `pm-1-2.json` ahora vive con `enriched: false` esperando Instructor Selection, cada Activity Card de un "creativo" vive en gate hasta que el instructor la apruebe.
- **El instructor NO invoca master prompts directamente** — eso es trabajo de Claude (vía skill). Lo que SÍ hace el instructor es aprobar/rechazar/ajustar lo que Claude propone.
- La creatividad real es la combinación **Claude + canon + juicio humano**, no Claude solo ni instructor solo.

### 3.2 Refinamiento de la apuesta original

**Apuesta original (Sergio):** "solo 4-5 PMs son candidatos reales para skill, los demás se invocan manualmente desde master prompts".

**Apuesta refinada:** "los 11 PMs van adentro de la skill, pero solo 4-5 son 'go directo' (mecánicos) — los otros 6-7 son 'go con gate' (creativos con aprobación humana antes de propagar al siguiente PM)".

---

## 4. PM-2.0 detallado — qué hace, qué genera

### 4.1 Inputs (3 fuentes canónicas)

```
pm-0-context.json   → anclas pedagógicas (CEFR · L1 curve · grammar 17 grupos · principios §5)
pm-1-1.json         → ruta macrotemática (bloques · regla_bloques · proyecto_formativo / final_mission)
pm-1-2.json         → scope&sequence + 4 bloques canónicos v2.6 (DNA · 20 vocab · stories curadas · GFPI cols 1-5)
```

### 4.2 Qué hace PM-2.0 (RAP Session Architect)

NO genera contenido pedagógico — genera el **blueprint arquitectónico** de N sesiones × M horas que cubre todos los requisitos canon:

| Decisión arquitectónica | Cómo la toma |
|---|---|
| **¿Cuántas sesiones?** | 8 (canon multi-guía) o N (single-guía absorpción: IMARPOR=12, INGBAS4=16, AGRO=8) |
| **¿Cuántas horas por sesión?** | Calculado: `duracion_total_horas / num_sesiones` |
| **¿Qué PM-2.x va en qué sesión?** | Asignación canon (verificada DIESEL-2026-04-19 pm-2-0.json): S1=PM-2.1+PM-2.2 · S2=PM-2.5+PM-2.3 · S3=PM-2.10+PM-2.4 · S4=PM-2.6+PM-2.8 · S5=PM-2.9 · S6=Cuestionario+Misión Final · S7-S8=Misión Final continuación |
| **¿Qué fase SENA va en qué sesión?** | S1=Reflexión+Contextualización · S2-S5=Apropiación · S6=Evaluación · S7-S8=Transferencia |
| **¿Qué evidencia formal va en qué sesión?** | S2=Reading · S3=Writing · S4=Listening+Speaking · S5=Functions · S6=Cuestionario · S7-S8=Misión Final (sin evidencia formal) |
| **¿Cadena antecedente-consecuente entre sesiones?** | S1 ← entrada · S2 ← S1 (vocab) · S3 ← S2 (lectura) · S4 ← S3 (escritura) · S5 ← S4 (escucha) · S6 ← S2-S5 · S7-S8 ← S6 |

### 4.3 Output canónico

```json
{
  "run_id": "...",
  "pm_code": "PM-2.0",
  "session_blueprint": [
    {
      "sesion": 1,
      "fase_sena": "Reflexión Inicial + Contextualización",
      "horas": 6,
      "PMs_a_ejecutar": ["PM-2.1 Spark", "PM-2.2 Gap Analysis"],
      "evidencia_formal": "ninguna",
      "objetivo_pedagogico": "Activar prereq + diagnosticar saberes previos",
      "antecedente": "Ingreso al programa",
      "consecuente": "S2 (Apropiación lectora)",
      "vocab_target_sesion": ["términos del Toolbelt seleccionados"],
      "structures_target_sesion": ["estructuras del silabus 17 activadas"]
    },
    { "sesion": 2, ... }
  ],
  "validacion_blueprint": {
    "suma_horas_correcta": true,
    "evidencias_6_tipos_cubiertas": true,
    "antecedente_consecuente_consistente": true,
    "fases_sena_distribuidas_correcto": true
  }
}
```

### 4.4 PM-2.0 es el primer paso obligatorio de Fase 2

Sin pm-2-0.json, los subagentes PM-2.1 a PM-2.10 NO pueden arrancar — necesitan saber qué sesión están construyendo, qué fase SENA, qué evidencia, qué consecuente, qué vocab/structures target.

---

### 4.5 Catálogo de arquetipos en PM-2.0 — selección flexible N arquetipos por PM (NUEVO v1.1)

PM-2.0 NO solo genera el Session Blueprint. También presenta al instructor el **catálogo completo de los ~52 arquetipos disponibles** entre los 10 PMs creativos (PM-2.1, PM-2.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10) y espera **selección flexible** del instructor.

#### 4.5.1 La selección NO es 1-de-N · es flexible N-de-N

El master prompt PM-2.0 v2.6 §195 documenta el caso "1 arquetipo por PM-2.x" — pero la **realidad operacional** muestra patrones más ricos:

| Run | PM | Arquetipos seleccionados | Política declarada |
|---|---|---|---|
| MGV-2026-04-20 | PM-2.3 | 6 de 6 (A+B+C+D+E+F) | "TODOS LOS 6 ARQUETIPOS INTEGRADOS — decisión del instructor 2026-04-20" |
| MGV-2026-04-20 | PM-2.5 | 5 de 5 (A+B+C+D+E) | "TODOS LOS 5 ARQUETIPOS INTEGRADOS — decisión del instructor 2026-04-20" |
| MGV-2026-04-20 | PM-2.6 | 6 de 6 (A+B+C+D+E+F) | "ALL 6 archetypes A-F documented · instructor picks ONE flow per S4 block · full menu documented for flexibility across cohorts" |
| MGV-2026-04-20 | PM-2.9 | 5 de 5 (A+B+C+D+E) | "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor" |
| MGV-2026-04-20 | PM-2.1 | N/A (single-detonante) | "PM-2.1 usa detonante ÚNICO 'The Narrative Scenario' por diseño · No posee arquetipos seleccionables" |
| MGV-2026-04-20 | PM-2.2 | N/A (single-detonante) | "PM-2.2 usa diagnóstico ÚNICO 'The Mirror' · No hay arquetipos seleccionables" |
| **DIESEL-2026-04-15/18/19** | **PM-2.1** | **4 de 4** (A Visual + B Story + C News + D Debate) | **"secuencia encadenada — 4 momentos en S1"** ⚠️ contradice MGV + master prompt |
| **DIESEL-2026-04-15/18/19** | **PM-2.2** | **4 de 4** (A KWL + B Diagnosis + C Gap card + D Peer interview) | **"secuencia encadenada — cierre de S1"** ⚠️ contradice MGV + master prompt |

**Conclusión:** la selección de arquetipos puede ser de 1, varios o TODOS los disponibles por cada PM-2.x. La skill debe soportar el patrón flexible.

#### 4.5.2 Schema canónico de `arquetipos-elegidos.json` (CORREGIDO v1.2 · nombres operacionales reales)

Schema basado en los **2 estilos operacionales reales** documentados en runs DIESEL y MGV-2026-04-20:

- **Estilo DIESEL — secuencia encadenada:** `archetype_used` (lista N) + `archetype_mode` (descripción modo)
- **Estilo MGV — compendio metodológico:** `integration_all_archetypes_policy` (objeto con applicable + rationale + bloom_ceiling)

```json
{
  "run_id": "...",
  "fecha_seleccion": "...",
  "instructor": "...",
  "directiva_canonica_aplicada": "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor (MGV pm-2-11.json:574)",
  "elecciones": [
    {
      "pm": "PM-2.1",
      "estilo": "diesel_secuencia_encadenada",
      "archetype_used": [
        "A — Visual/Infografía",
        "B — Story/Narrativa",
        "C — News/Noticia técnica",
        "D — Debate/Encuesta"
      ],
      "archetype_mode": "secuencia encadenada — 4 momentos en S1",
      "rationale": "DIESEL aplica directiva del instructor a PM-2.1 con 4 arquetipos rotativos como momentos secuenciales"
    },
    {
      "pm": "PM-2.3",
      "estilo": "mgv_compendio_metodologico",
      "integration_all_archetypes_policy": {
        "applicable_to_this_pm": true,
        "directive": "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor",
        "archetypes_integrated": ["A", "B", "C", "D", "E", "F"],
        "rationale_a11": "Los 6 arquetipos existen como OPCIONES del instructor. Cada uno presentado con frases fijas + Language Bank + Micro-Cápsulas. Instructor elige FLOW de rotación en aula.",
        "bloom_ceiling_a11": "L3 Apply máximo — ningún arquetipo exige analizar/evaluar/crear sin soporte"
      }
    }
  ],
  "_estilos_operacionales_documentados": [
    {
      "id": "diesel_secuencia_encadenada",
      "evidencia_canonica": "DIESEL-2026-04-15/18/19 — TODOS los pm-2-*.json (PM-2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10) usan archetype_used [N] + archetype_mode 'secuencia encadenada'",
      "uso_recomendado": "cuando se quiere rotar arquetipos como momentos secuenciales dentro de la misma sesión"
    },
    {
      "id": "mgv_compendio_metodologico",
      "evidencia_canonica": "MGV-2026-04-20 — TODOS los pm-2-*.json usan integration_all_archetypes_policy con N arquetipos integrados como compendio metodológico",
      "uso_recomendado": "cuando se quiere documentar TODOS los arquetipos disponibles para que el instructor elija FLOW en aula con flexibilidad por cohorte"
    },
    {
      "id": "mgv_pm21_pm22_no_aplica",
      "evidencia_canonica": "MGV-2026-04-20 pm-2-1.json + pm-2-2.json marcaron applicable_to_this_pm: false — interpretación de MGV: respetar el master prompt PM-2.1/2.2 que dice 'DETONANTE/DIAGNÓSTICO ÚNICO'",
      "estado": "interpretación válida pero contradice directiva del instructor capturada en pm-2-11.json:574 — ver §11"
    }
  ]
}
```

**Nota crítica sobre nomenclatura:**

La versión v1.1 de este plan inventó 5 enums STRINGS (DETONANTE_UNICO_FORZADO, SINGLE_ARCHETYPE, SELECCION_PARCIAL, MULTIPLE_SECUENCIA_ENCADENADA, TODOS_INTEGRADOS) que **NO existen como literales en ningún run** (búsqueda grep en DIESEL + MGV: 0 hits). Los nombres reales operacionales son los 2 estilos documentados arriba (`diesel_secuencia_encadenada` y `mgv_compendio_metodologico`). El campo `flow_rotation_suggestion` también fue invención v1.1 (0 hits) — el concepto existe en MGV como rationale en texto pero no como campo JSON nombrado.

#### 4.5.3 Estilos de output del subagente PM-2.x (CORREGIDO v1.2 · nombres operacionales reales)

El subagente PM-2.x recibe N arquetipos como parámetro y produce output según el estilo declarado en `arquetipos-elegidos.json`. Hay **2 estilos canonizados operacionalmente**:

| Estilo | Evidencia canónica | Cuándo aplicar | Estructura output del subagente |
|---|---|---|---|
| **Estilo DIESEL — secuencia encadenada** | DIESEL-2026-04-15/18/19 — `archetype_used [N]` + `archetype_mode "secuencia encadenada"` en TODOS los pm-2-*.json | Cuando instructor quiere rotar N arquetipos como momentos secuenciales dentro de UNA sesión | 1 Activity Card con N actividades (`activities[i].archetype` específico) + `archetype_mode` declarado + `momentos[]` espejando activities[] |
| **Estilo MGV — compendio metodológico** | MGV-2026-04-20 — `integration_all_archetypes_policy` con N arquetipos integrados en TODOS los pm-2-*.json | Cuando instructor quiere TODOS los arquetipos documentados como menú · elige flow en aula con flexibilidad por cohorte | N Activity Cards completas (1 por arquetipo · ej. `archetype_A_TBLT_CYCLE`, `archetype_B_COMPREHENSION_STRATEGIES`, etc.) + `integration_all_archetypes_policy` con `bloom_ceiling` |

**Nota sobre v1.1:** la nomenclatura "Patrón A / Patrón B / Patrón C" usada en versión anterior fue invención del plan sin respaldo en runs. Los nombres correctos operacionales son los 2 estilos arriba (`diesel_secuencia_encadenada` y `mgv_compendio_metodologico`).

#### 4.5.4 Razón arquitectónica (per master prompt PM-2.0 §227)

> La selección de arquetipos es una **decisión pedagógica crítica** que requiere contexto humano (perfil del aprendiz, sector, momento del programa, fortalezas del instructor). Delegarla al modelo LLM post-generación produce falsos matches y fuerza iteraciones costosas. Seleccionar upfront elimina el retrabajo.

> *Lección aprendida MGV-2026-04-20: instructor eligió los arquetipos antes de generar pm-2-1.json..pm-2-10.json. Resultado: 0 iteraciones, 0 retrabajos, catálogo completado en una pasada.*

---

## 5. Algoritmo del orquestador — distribución paralela de PM-2.1 a PM-2.10

### 5.1 Principio fundamental

La paralelización **NO es "los 9 PMs simultáneos"** — eso rompería la cadena causal antecedente-consecuente. Es paralelización **por niveles de dependencia**.

### 5.2 Diagrama de dependencias intra-guía (1 guía · 8 sesiones · CORREGIDO v1.2)

```
                   ┌─────────────────────────────┐
                   │  Inputs comunes (lectura)    │
                   │  - pm-0-context.json         │
                   │  - pm-1-1.json               │
                   │  - pm-1-2.json               │
                   │  - pm-2-0.json (blueprint)   │
                   └──────────────┬──────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
       ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
       │ NIVEL 1: S1 │    │ NIVEL 2: S2 │    │ NIVEL 3: S3 │
       │ secuencial  │    │ secuencial  │    │ secuencial  │
       └─────────────┘    └─────────────┘    └─────────────┘
              │                   │                   │
       ┌──────┴──────┐     ┌──────┴──────┐     ┌──────┴──────┐
       ▼             ▼     ▼             ▼     ▼             ▼
   PM-2.1 ──→ PM-2.2  PM-2.3 ──→ PM-2.5  PM-2.10 ──→ PM-2.4
   (Spark)  (Gap)    (Reading) (Vocab)  (Grammar) (Writing)
                       ↑ ANCHOR    ↑ CONSUME           ↑ TARGETS  ↑ CONSUME

       ┌─────────────┐    ┌─────────────┐
       │ NIVEL 4: S4 │    │ NIVEL 5: S5 │
       │  PARALELO   │    │ SOLO PM-2.9 │
       └─────────────┘    └─────────────┘
              │                   │
       ┌──────┴──────┐            ▼
       ▼             ▼          PM-2.9
   PM-2.6  ║  PM-2.8           (Funcs)
   (Listen)  (Speak)
```

**Correcciones v1.2:**

1. **Nivel 2 invertido:** `PM-2.3 → PM-2.5` (ANTES era `PM-2.5 → PM-2.3` · INCORRECTO). Evidencia canon: PM-2.5 master prompt línea 41 declara que PM-2.5 RECIBE el Master Anchor Text de PM-2.3. PM-2.3 es el productor del anchor; PM-2.5 lo consolida en Toolbelt. La asignación de sesión (PM-2.5 listada primero en S2 según pm-2-0.json) es ORDEN DE EJECUCIÓN EN AULA, no orden de generación de Activity Cards.

2. **Nivel 5 corregido:** S5 = solo PM-2.9 (ANTES decía `PM-2.9 || PM-2.10ext` · INCORRECTO). Evidencia canon: DIESEL-2026-04-19 pm-2-0.json + PM-2.0 master prompt línea 135 confirman S5 = PM-2.9 sin extensión. "PM-2.10ext" no existe en ningún run · fue invención v1.1 (eliminada v1.2).

### 5.3 Algoritmo del orquestador (pseudocódigo · v1.1 con GATE de arquetipos)

```
0. PRE-FLIGHT: Leer 11 master prompts + ref operacional MGV/DIESEL más cercana (UNA VEZ)
1. Lanzar PM-2.0 (subagente híbrido):
   ├─ Output 1: pm-2-0.json (Session Blueprint mecánico)
   └─ Output 2: pm-2-0-arquetipos-catalogo.{md,json} (catálogo flexible · ~52 arquetipos · 10 PMs)

2. ⚠️ GATE HUMANO 1 — Instructor revisa el catálogo y produce arquetipos-elegidos.json
   ├─ Por cada PM-2.x: declara policy + N arquetipos (puede ser 1, varios o TODOS)
   ├─ Validación inline: cada elección con justificación + bloom_ceiling
   └─ Si estilo es "diesel_secuencia_encadenada" → declarar archetype_mode
        Si estilo es "mgv_compendio_metodologico" → declarar integration_all_archetypes_policy con bloom_ceiling

3. Leer pm-0-context + pm-1-1 + pm-1-2 + pm-2-0 + arquetipos-elegidos.json (UNA VEZ)

4. Para cada GUÍA del run:
   a. Lanzar Nivel 1 (S1): subagente(PM-2.1, arquetipos_elegidos[PM-2.1]) → al terminar → subagente(PM-2.2, arquetipos_elegidos[PM-2.2])
   b. Lanzar Nivel 2 (S2): subagente(PM-2.3, arquetipos[PM-2.3]) → al terminar → subagente(PM-2.5, arquetipos[PM-2.5])
      ← CORREGIDO v1.2: PM-2.3 produce Master Anchor Text · PM-2.5 lo consume
   c. Lanzar Nivel 3 (S3): subagente(PM-2.10, arquetipos[PM-2.10]) → al terminar → subagente(PM-2.4, arquetipos[PM-2.4])
   d. Lanzar Nivel 4 (S4): subagente(PM-2.6, arquetipos[PM-2.6]) || subagente(PM-2.8, arquetipos[PM-2.8])
   e. Lanzar Nivel 5 (S5): subagente(PM-2.9, arquetipos[PM-2.9])
      ← CORREGIDO v1.2: solo PM-2.9 · NO existe "PM-2.10ext" (verificado DIESEL pm-2-0.json)
5. Niveles 1-3 son secuenciales DENTRO de cada guía pero PARALELOS ENTRE guías
6. Nivel 4 es paralelo DENTRO de cada guía Y entre guías · Nivel 5 es 1 PM solo (paralelo solo entre guías)

7. Cada subagente PM-2.x:
   ├─ Lee SU estilo (diesel_secuencia_encadenada o mgv_compendio_metodologico) + arquetipos seleccionados de arquetipos-elegidos.json
   ├─ Genera output según estilo (ver §4.5.3 — 2 estilos canónicos operacionales)
   └─ Marca enriched: false (si es PM creativo) o enriched: true (si es PM mecánico)

8. ⚠️ GATE HUMANO 2 — Instructor aprueba en lote las Activity Cards (creativos)
9. PM-2.11 ensambla + 5 checks de cierre
```

### 5.4 Paralelismo real a gran escala — entre guías

**Lo realmente paralelizable a escala: las guías entre sí.**

Ejemplo MGV-2026-04-27 (6 guías), el orquestador puede correr:
- 6 instancias de Nivel 1 simultáneo (G1.S1 || G2.S1 || G3.S1 || G4.S1 || G5.S1 || G6.S1)
- Cada instancia es 2 subagentes secuenciales
- Total: 6 × 2 = 12 subagentes activos en pico

Para single-guía (IMARPOR/INGBAS4/AGRO), no hay paralelismo entre guías — solo el intra-sesión limitado de Niveles 4-5.

### 5.5 Cada subagente recibe SOLO lo que necesita

El orquestador no le pasa al subagente PM-2.3 los 11 master prompts. Le pasa:

```
Inputs al subagente PM-2.3:
- Master prompt PM-2.3 (1 archivo)
- Ref operacional PM-2.3 más cercana (ej: runs/MGV-2026-04-20/G1/pm-2-3.json)
- pm-0-context.json (anclas)
- pm-1-2.json (Story A asignada para esta guía)
- pm-2-0.json (blueprint sesión 2)
- previous_pms_chain (PM-2.5 si va antes, none si es first en S2)
```

Esto resuelve el problema de "memoria de trabajo simultánea": cada subagente tiene scope limitado, el orquestador tiene la visión global.

---

## 6. PM-2.11 + cierre de Fase 2

### 6.1 PM-2.11 (Row Assembler) cierra el ensamblaje

PM-2.11 recoge todas las Activity Cards generadas (PM-2.1 a PM-2.10) + cols 1-5 GFPI de PM-1.2 + blueprint de PM-2.0, y ensambla la **fila completa GFPI-F-134 (11 columnas)**.

Output: 1 fila GFPI completa por guía (alineacion_1a1) o por sub-bloque interno (absorcion_Na1).

### 6.2 PM-2.11 v2.6.3 ejecuta 16 checks (CORREGIDO v1.2)

**Corrección importante v1.2:** la versión v1.1 de este plan trabajó con un PM-2.11 mental v2.0 (4 checks). El canon vigente es **PM-2.11 v2.6.3** (last_verified 2026-04-20) que ejecuta **16 checks** documentados en su master prompt.

PM-2.11 v2.6.3 ejecuta:
- **Checks 1-12 (originales v2.0)** — alineación, cobertura saberes, coherencia arquetipos, tipificación evidencias, etc.
- **Check 13** — CHECK 9 del DOCUMENTO MAESTRO (anti-copia-fantasma · SHA byte-comparison entre runs) — **YA está canonizado en PM-2.11 desde changelog v2.4 (2026-04-20)**
- **Check 14** — propagación de estrategias didácticas
- **Check 15** — footer correcto en Activity Cards
- **Check 16** — Activity Card schema v2.6.3 conforme

**Corrección a v1.1:** la versión anterior afirmó incorrectamente que "CHECK 9 falta en PM-2.11 master prompt — fue agregado al canon DESPUÉS · El orquestador debe ejecutarlo además". Esto es **falso**. CHECK 9 = Check 13 de PM-2.11 desde abril 2026. El orquestador NO necesita ejecutarlo aparte — solo necesita verificar que PM-2.11 lo aplicó correctamente.

### 6.3 Secuencia completa de cierre Fase 2 (CORREGIDA v1.2)

```
1. Todos los PM-2.1 → PM-2.10 generaron Activity Cards (subagentes en niveles)
2. PM-2.11 ensambla fila GFPI-F-134 + ejecuta los 16 checks (incluyendo Check 13 = CHECK 9 anti-copia-fantasma)
3. ORQUESTADOR verifica que PM-2.11 reportó PASS en los 16 checks
4. ORQUESTADOR genera reporte consolidado (incluyendo evidencia byte-hash de Check 13)
5. Si todos PASS → Fase 2 marca status: "validated · ready for Fase 3"
6. Si algún FAIL → orquestador identifica qué subagente debe regenerar y por qué
   - Especialmente Check 13 FAIL = bug copia-fantasma · regenerar PM-2.x afectado desde universo correcto
7. Todas las Activity Cards "creativas" siguen con enriched: false → Sergio aprueba en lote
8. Una vez todas enriched: true → autorizar arranque Fase 3 (Playbook PM-3.1 + PM-3.2)
```

### 6.4 Cuándo Fase 2 se considera cerrada

Fase 2 cierra cuando:

| Condición | Estado esperado |
|---|---|
| Activity Cards generadas | 10 por guía (PM-2.1 a PM-2.10) |
| GFPI-F-134 fila completa | 11 columnas pobladas por guía |
| **16 checks de PM-2.11 v2.6.3** (incluye Check 13 = CHECK 9 anti-copia) | PASS 16/16 |
| Activity Cards de PMs creativos | enriched: true (lote aprobado por Sergio) |
| Reporte consolidado | Generado en `runs/[RUN-ID]/pm-2-validation-report.json` |

Solo entonces se autoriza Fase 3 (Playbook).

---

## 7. Plan de trabajo (4 hitos · ~6-8 semanas en total cuando arranquemos)

### Hito 1 — Pre-trabajo (1 semana)

**Objetivo:** capturar las plantillas operacionales reales antes de inventar.

```
- Inventariar TODOS los outputs de Fase 2 que ya existen (DIESEL + MGV-04-20)
  para extraer plantillas operacionales reales (no inventadas)
- Documentar las 4 dependencias críticas:
  - Anti-copia-fantasma (CHECK 9 byte-hash)
  - Cadena causal antecedente-consecuente
  - Triada de evidencias (6 tipos)
  - Coherencia GFPI-F-134 (4 checks)
- Capturar lecciones de uso real de Fase 1 (Nellis post-revisión)
- Documentar gaps que NO fueron previstos en este plan
```

**Entregable:** documento `master-prompts/REFS-OPERACIONALES-FASE-2.md` + `lecciones-fase-1-uso-real.md`.

### Hito 2 — Construir orquestador + subagentes mecánicos (2 semanas)

**Objetivo:** levantar la infraestructura + automatizar lo determinístico.

```
- Skill `fpi-sena-fase2` con pre-flight global de los 11 master prompts
- Subagentes para los 4 PMs MECÁNICOS:
  - PM-2.0 architect (genera blueprint de N sesiones)
  - PM-2.11 row assembler (ensambla GFPI-F-134 11 cols)
  - PM-4.1 instruments derivador
  - PM-4.2 cuestionario S6
- CHECK 9 automatizado (SHA hash entre runs)
- 4 checks de coherencia GFPI-F-134
```

**Entregable:** skill instalable + 4 subagentes mecánicos funcionando contra 1 run de Fase 1 enriched=true.

### Hito 3 — Construir subagentes de PMs CREATIVOS con gate (2 semanas)

**Objetivo:** completar los 7 PMs creativos con disciplina de gate.

```
- Subagentes que GENERAN draft + marcan enriched: false:
  - PM-2.3 reading anchor (con Story A asignada)
  - PM-2.4 writing task-based
  - PM-2.6 listening auditory anchor (con Story B asignada)
  - PM-2.8 speaking task + pronunciation
  - PM-2.9 language functions communicative competence
  - PM-2.10 grammar structure use
  - PM-2.1 spark reflexión inicial
  - PM-2.2 gap analysis contextualización
- Cada uno valida CHECK 9 anti-copia y produce Activity Card schema
- Cada uno espera Instructor Selection antes de propagar al siguiente
```

**Entregable:** 7 subagentes creativos funcionando con gate humano.

### Hito 4 — Probar con 1 run real (1 semana)

**Objetivo:** validar arquitectura contra realidad.

```
- Correr Fase 2 contra 1 run de Fase 1 que esté enriched=true
- Validar paralelización real (medir tiempo serial vs paralelo)
- Ajustar gates · documentar gaps
- Empaquetar como `.skill` instalable
```

**Entregable:** skill `fpi-sena-fase2.skill` + reporte de prueba + gaps para iteración v1.1.

---

## 8. Recomendación pragmática (la importante)

**No construyas Fase 2 todavía.**

| Lo que tenemos hoy | Lo que falta validar |
|---|---|
| 4 runs Fase 1 generados (MGV-04-20 + MGV-04-27 + IMARPOR + INGBAS4 + AGRO) | NINGUNO ha llegado a aula real todavía |
| 5 paquetes en gate `enriched: false` esperando Instructor Selection | Nellis no ha visto los paquetes Nellis aún |
| Skill `fpi-sena-fase1` con disciplina externalizada | NO sabemos cómo se comporta cuando otro instructor (no Sergio) la usa |
| 4 patrones canónicos `regla_bloques` documentados | Solo 2 (`absorcion_Na1` + `alineacion_1a1`) probados en runs reales |

### Lo recomendado en este orden

1. **Próximas 2-3 semanas — uso real.** Que Nellis revise los 2 paquetes Nellis. Que pasen a Fase 2 manualmente con el approach actual (Sergio + Claude colaborativo, sin skill). Documentar TODO lo que falle, lo que confunda, lo que se rompa.

2. **Capturar las lecciones reales.** Probablemente descubrirás que:
   - Algún campo de Fase 1 no era el correcto (corregir master prompt, no skill)
   - Nellis necesita un README más claro (o más simple)
   - Algún arquetipo de Fase 2 nunca se usa (bórralo del catálogo)
   - Algunos PMs de Fase 2 no necesitan automatización (son inherentemente del instructor)
   - Aparece algún patrón nuevo que no anticipaste

3. **DESPUÉS construir Fase 2** — siguiendo este plan, ajustado por las lecciones reales.

4. **Mientras tanto — fortalecer Fase 1, no expandir.** Cosas que rinden mucho con poco esfuerzo:
   - Empaquetar `fpi-sena-fase1` como `.skill` instalable para Nellis y otros instructores
   - Crear plantillas de README-REVIEW pulidas (lo que se armó es prototipo)
   - Probar `fpi-sena-fase1` con un patrón nuevo (`desdoblamiento_1aN` o `alineacion_NaM`) que aún no ha aparecido — para descubrir gaps antes de que sean caros

### El riesgo de construir Fase 2 ya

Quemar 1-2 semanas en arquitectura que se revela mal el día que Nellis encuentre que algo de Fase 1 no estaba bien pensado. Lo barato es esperar.

### El riesgo de NO construir nada de Fase 2

Ninguno por 1 mes. Después, alto si los runs empiezan a derivar y CHECK 9 falla.

---

## 9. Decisiones diferidas (a resolver cuando arranque construcción)

| Decisión | Cuándo resolver | Quién decide |
|---|---|---|
| Empaquetado de la skill (formato `.skill` vs marketplace plugin) | Hito 4 | Sergio |
| Política de retención de drafts `enriched: false` (cuántos días/semanas) | Hito 3 | Sergio |
| Mecanismo de Instructor Selection en lote (UI vs CLI vs notebook) | Hito 3 | Sergio + feedback Nellis |
| Si CHECK 9 falla, ¿bloquea o solo advierte? | Hito 2 | Sergio |
| ¿PM-3.x (Playbook) entra en `fpi-sena-fase2` o en `fpi-sena-fase3` separada? | Hito 1 | Sergio (mi sugerencia: separada) |
| ¿Cómo se versiona la skill cuando subimos canon DM (v2.11 → v2.12)? | Hito 4 | Sergio |
| Política de fallback si paralelización falla (1 subagente cae) | Hito 2 | Claude propone, Sergio aprueba |
| **Formato presentación catálogo arquetipos** (tabla MD navegable · JSON crudo · widget interactivo) | Hito 2 | Sergio + feedback Nellis |
| **¿Resolver discrepancia DIESEL vs MGV vs master prompt PM-2.1/2.2?** (ver §11) | Hito 1 | Sergio — decisión arquitectónica crítica |
| **Default policy** (qué pasa si instructor NO declara · ¿se asume DETONANTE_UNICO o se exige declaración explícita?) | Hito 2 | Sergio |

---

## 10. Cómo retomar este documento

Cuando estés listo para arrancar Fase 2 (después de validación Fase 1 en producción), abre este documento y arranca por el **Hito 1**.

Pasos sugeridos para retomar:

1. Leer este documento completo (especialmente §1, §3, §5, §6 que son las decisiones arquitectónicas).
2. Revisar el inventario de outputs Fase 2 existentes en `runs/MGV-2026-04-20/` y `runs/DIESEL-2026-04-15/`.
3. Capturar lecciones de uso real de Fase 1 que aparecieron en las semanas previas.
4. Decidir si las lecciones cambian alguna decisión arquitectónica de §2-§6 (si sí, actualizar este documento PRIMERO antes de construir).
5. Arrancar Hito 1 con un nuevo TaskCreate dedicado.

### Archivos relacionados

- `master-prompts/DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md` v2.11 (canon general)
- `master-prompts/PM-2.0 — RAP Session Architect.md` (input para Hito 2)
- `master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` (input para Hito 2)
- `master-prompts/Activity Card — Schema.md` (output de los subagentes creativos)
- `master-prompts/GFPI-F-134 — Data Contract.md` (referencia para los 4 checks)
- `runs/MGV-2026-04-20/pm-2-*.json` (refs operacionales para subagentes — estilo `mgv_compendio_metodologico` con `integration_all_archetypes_policy`)
- `runs/DIESEL-2026-04-15/pm-2-*.json` + `DIESEL-2026-04-18` + `DIESEL-2026-04-19` (refs operacionales — estilo `diesel_secuencia_encadenada` con `archetype_used [N]` + `archetype_mode` · ver §11 sobre interpretación canónica)

---

## 11. Master prompts PM-2.1/PM-2.2 desactualizados respecto a directiva canónica (REESCRITA v1.2) ⚠️

**Reescritura crítica v1.2:** la versión v1.1 formuló esta sección como "discrepancia entre canon y realidad operacional" sugiriendo que las 3 fuentes (master prompt, MGV, DIESEL) se contradecían. **Esa formulación era incorrecta.** Lo que realmente sucede es que la **directiva canónica del instructor** (capturada en runs operacionales) **sobrescribe** lo que dicen los master prompts PM-2.1 y PM-2.2 — esos master prompts están desactualizados.

### 11.1 Jerarquía canónica de autoridad (descubierta v1.2)

```
NIVEL 1 — DIRECTIVA DEL INSTRUCTOR (autoridad máxima)
   Capturada literalmente en MGV-2026-04-20:
   - pm-2-11.json:574 → "'LOS ARQUETIPOS DE ACTIVIDADES DE CADA UNA DE LAS PM2.X LOS QUIERO ELEGIR YO'"
   - pm-2-11.json:574 → "'Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor'"
   - pm-2-9.json:825 → "PM-2.11 debe respetar que las Activity Cards contienen los N arquetipos integrados como compendio metodológico, sin forzar la elección de uno solo"
        ↓
NIVEL 2 — IMPLEMENTACIÓN OPERACIONAL CANONIZADA (refleja directiva)
   - DIESEL-2026-04-15/18/19: aplica directiva uniformemente a TODOS los PMs (incluyendo PM-2.1/2.2)
     mediante archetype_used [N] + archetype_mode "secuencia encadenada"
   - MGV-2026-04-20: aplica directiva a PM-2.3/2.4/2.5/2.6/2.8/2.9/2.10
     mediante integration_all_archetypes_policy con TODOS los arquetipos integrados
   - MGV-2026-04-20: declara PM-2.1/2.2 como applicable_to_this_pm: false
     (interpretación de MGV: respetar el master prompt original PM-2.1/2.2 que dice "ÚNICO")
        ↓
NIVEL 3 — MASTER PROMPTS CANON (DESACTUALIZADOS · necesitan update)
   - PM-2.1 master prompt v1.0 §47: "EL DETONANTE ÚNICO: THE NARRATIVE SCENARIO"
   - PM-2.2 master prompt v1.0 §43: "EL DIAGNÓSTICO ÚNICO: THE MIRROR"
   ↑ Estos master prompts NO reflejan la directiva del instructor del nivel 1
```

### 11.2 Lo que realmente sucede en cada run

| Run | Implementación PM-2.1/PM-2.2 | Interpretación de la directiva |
|---|---|---|
| **DIESEL-2026-04-15/18/19** | `archetype_used: [4 arquetipos]` + `archetype_mode: "secuencia encadenada"` en PM-2.1 y PM-2.2 | Aplica la directiva del instructor literalmente a TODOS los PMs sin excepción. Asume que la directiva sobrescribe el master prompt original. |
| **MGV-2026-04-20** | `integration_all_archetypes_policy.applicable_to_this_pm: false` en PM-2.1 y PM-2.2 (con compendio metodológico aplicado a los otros 8 PMs) | Aplica la directiva pero respeta el master prompt original PM-2.1/2.2 que dice "ÚNICO". Interpretación conservadora: directiva no aplica donde el canon es explícito sobre exclusividad. |

**No es discrepancia entre canon y realidad — son DOS interpretaciones legítimas de cómo conciliar la directiva con master prompts desactualizados.**

### 11.3 Decisión arquitectónica que debe tomar Sergio (Hito 1)

**Pregunta:** ¿la directiva "Quiero todos los arquetipos para todos los PM" aplica también a PM-2.1 y PM-2.2 (interpretación DIESEL), o se respeta el "ÚNICO" del master prompt original (interpretación MGV)?

**Opción A — Canonizar interpretación DIESEL (recomendada por uniformidad)**
- Actualizar master prompts PM-2.1 y PM-2.2 a v2.0 reflejando la directiva del instructor
- Listar arquetipos canonizados (los 4 de DIESEL son la baseline operacional):
  - PM-2.1: A — Visual/Infografía · B — Story/Narrativa · C — News/Noticia técnica · D — Debate/Encuesta
  - PM-2.2: A — Self-assessment/KWL · B — Diagnosis visual · C — Gap card · D — Peer interview
- Marcar "EL DETONANTE ÚNICO" / "EL DIAGNÓSTICO ÚNICO" como **default histórico** (mantener para single-archetype runs · no obligatorio)
- Pro: alinea master prompt con directiva del instructor + cubre patrón DIESEL operacional
- Pro: uniformidad — TODOS los 10 PMs creativos admiten arquetipos múltiples
- Con: requiere update de 2 master prompts (PM-2.1.md, PM-2.2.md) + bump DM v2.11 → v2.12

**Opción B — Canonizar interpretación MGV (respetar exclusividad original)**
- Mantener master prompts PM-2.1 y PM-2.2 con "ÚNICO"
- Documentar oficialmente que PM-2.1/2.2 son la excepción a la directiva del instructor
- DIESEL queda como patrón "no canónico para PM-2.1/2.2" (los runs operacionales tendrían que regenerarse o documentarse como histórico)
- Pro: respeta la palabra escrita del master prompt original
- Con: invalida los 3 runs DIESEL para PM-2.1/2.2 · requiere notificar el cambio
- Con: contradice la directiva del instructor en su forma más literal

**Opción C — Patrón doble explícito (default + extensible)**
- Master prompt PM-2.1/2.2 v2.0 documenta AMBOS modos:
  - **Modo default:** "DETONANTE/DIAGNÓSTICO ÚNICO" (1 arquetipo · estilo MGV-respetuoso)
  - **Modo extensible:** "secuencia encadenada N arquetipos" (estilo DIESEL · activable explícitamente)
- El instructor declara cuál modo aplica en `arquetipos-elegidos.json` por run
- Pro: cubre AMBAS interpretaciones sin invalidar runs anteriores
- Con: complejiza el master prompt y el subagente

### 11.4 Recomendación de Claude (CORREGIDA v1.2)

**Opción A (canonizar interpretación DIESEL).** Razones (más fuertes que en v1.1 · ahora con evidencia real):

1. **Uniformidad operacional.** La directiva del instructor "Quiero todos los arquetipos para todos los PM" es categórica: aplica a TODOS los PMs. Hacer excepción para PM-2.1/2.2 fragmenta la arquitectura.

2. **Backward-compatibility.** Los 3 runs DIESEL ya funcionan con esta interpretación. No invalida nada.

3. **MGV puede actualizarse retroactivamente.** Si se canoniza la interpretación DIESEL, MGV pm-2-1.json/pm-2-2.json puede regenerarse con `applicable_to_this_pm: true` cuando se ejecute Fase 2 sobre MGV en producción real.

4. **El master prompt original es de la versión inicial del sistema.** La directiva del instructor surgió DESPUÉS · es lógico que el master prompt necesite update.

5. **Catálogo DIESEL ya está validado pedagógicamente.** Los 4 arquetipos de PM-2.1 (Visual, Story, News, Debate) y los 4 de PM-2.2 (KWL, Diagnosis, Gap card, Peer interview) son educativamente sólidos · están en runs reales.

**Si Sergio prefiere Opción C (patrón doble),** el plan también lo soporta porque el schema corregido v1.2 (`§4.5.2`) ya documenta los 2 estilos canónicos operacionales. Solo requiere agregar el modo "DETONANTE_UNICO" como tercer estilo opcional.

### 11.5 Decisión arquitectónica · ESTADO: RESUELTO 2026-04-28 ✓

**Decisión Sergio 2026-04-28:** **Opción A canonizada** — interpretación DIESEL adoptada como canon.

**Acciones completadas el 2026-04-28:**

```
✓ [Sergio decidió] Opción A (canonizar interpretación DIESEL)
✓ [Claude actualizó] master-prompts/PM-2.1 — The Spark — Reflexión Inicial.md
    v2.0 → v3.0 con 2 modos canonizados (DEFAULT + EXTENSIBLE)
    + catálogo de 4 arquetipos: A Visual · B Story · C News · D Debate
✓ [Claude actualizó] master-prompts/PM-2.2 — Gap Analysis — Contextualización.md
    v2.0 → v3.0 con 2 modos canonizados (DEFAULT + EXTENSIBLE)
    + catálogo de 4 arquetipos: A KWL · B Diagnosis visual · C Gap card · D Peer interview
✓ [Claude actualizó] DOCUMENTO MAESTRO ... .md
    v2.11 → v2.12 con sección dedicada a la decisión + jerarquía canónica documentada
    (directiva instructor > operacional canonizado > master prompt)
✓ [Claude actualizó] Esta sección §11.5 con estado RESUELTO
```

**Implicaciones para Hito 2:**

- Hito 2 ahora **desbloqueado** para arrancar (cuando Fase 1 esté validada en producción real · ~2-3 semanas)
- Subagentes PM-2.1 y PM-2.2 ya tienen master prompts actualizados con 2 modos · pueden ramificar según `estilo` declarado en `arquetipos-elegidos.json`
- MGV-2026-04-20 pm-2-1.json + pm-2-2.json siguen válidos como histórico · pueden regenerarse retroactivamente en modo extensible si se requiere para producción real
- Los 3 runs DIESEL (2026-04-15/18/19) quedan validados como implementación canónica del modo extensible

---

## Sesión arquitectónica — 2026-04-28

Este documento captura una conversación entre Sergio y Claude después de completar exitosamente Fase 1 para 4 runs distintos (5 con MGV-2026-04-20 que es referencia operacional madura). La conversación se dio inmediatamente después de verificar que la skill `fpi-sena-fase1` funcionó como herramienta de disciplina externalizada — no como herramienta de creatividad.

**Insight central de la sesión:** la skill no es lo que hace el trabajo. Es lo que evita que Claude derive cuando el trabajo crece más allá de lo que cabe en memoria de trabajo. Para Fase 2, esa disciplina debe escalar — y la única arquitectura honesta para escalar es subagentes con scope limitado coordinados por un orquestador con visión global.

**Decisión final pendiente:** validar Fase 1 en producción real antes de construir Fase 2. Sin esa validación, este plan es ingeniería especulativa.

---

*Plan arquitectónico Fase 2 · v1.0 · 2026-04-28 · estado: DRAFT-PLAN*
*Sergio Cortés Perdomo (instructor responsable) · Claude (skill `fpi-sena-fase1`)*
