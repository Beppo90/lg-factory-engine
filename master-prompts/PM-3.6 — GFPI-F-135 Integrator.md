# PM-3.6: GFPI-F-135 INTEGRATOR

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.6 |
| **Nombre** | GFPI-F-135 Learning Guide Generator |
| **Versión** | 2.7 |
| **Last Verified** | 2026-04-30 |
| **Ubicación** | Fase 4, posterior a PM-3.2 (Playbook Build-Out completo) |
| **Output** | Documento GFPI-F-135 V02 — Guía de Aprendizaje del Aprendiz (redactada en 2ª persona) |
| **Rol en el sistema** | Transforma el Playbook del Instructor (PM-3.2) en la Guía del Aprendiz (GFPI-F-135) |
| **Phase** | 4 |
| **Depends On** | [PM-3.2, PM-2.11] |
| **Trigger** | post_playbook_confirmation |

---

## CAMBIO v2.0 — NUEVA NATURALEZA DE PM-3.6

> [!info] Cambio v2.0 (2026-04-13)
> En v1.x, PM-3.6 integraba los outputs de PM-2.x (worksheets) en la Guía GFPI-F-135.
> 
> En v2.0, PM-3.6 opera de forma diferente:
> - **Input:** Playbook Build-Out completo (PM-3.2) + fila GFPI-F-134 ensamblada (PM-2.11)
> - **Proceso:** Transforma el lenguaje del instructor (Playbook) al lenguaje del aprendiz — reescribe las actividades pedagógicamente diseñadas como instrucciones directas para el estudiante.
> - **Output:** La Guía de Aprendizaje GFPI-F-135 completa, redactada en segunda persona para el aprendiz.
> 
> El Playbook es la fuente de verdad. La Guía es su proyección hacia el aprendiz.

---

## QUÉ HACE ESTE PROMPT

PM-3.6 **genera contenido nuevo** transformando el Playbook del Instructor en la Guía del Aprendiz. No ensambla solo — **reescribe** las actividades de lenguaje pedagógico (instrucción del profesor) a lenguaje del estudiante (instrucciones para el aprendiz).

**Input:** Playbook Build-Out completo (PM-3.2) + Fila GFPI-F-134 ensamblada (PM-2.11)
**Proceso:** Transformación de lenguaje: instructor → aprendiz
**Output:** GFPI-F-135 V02 completo, redactado en segunda persona, nivel CEFR, tono motivador

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| **Playbook Build-Out completo (todas las sesiones)** | **PM-3.2** |
| **Fila GFPI-F-134 ensamblada (desde PM-2.11)** | **PM-2.11** |
| Scope & Sequence (nivel CEFR, vocabulario, universo narrativo) | PM-1.2 |
| Data Contract GFPI-F-135 | Referencia (GFPI-F-135 — Data Contract.md) |
| Datos institucionales | Instructor |

---

## REGLAS DE DISEÑO

### REGLA 1 — TRANSFORMACIÓN DE LENGUAJE (INSTRUCTOR → APRENDIZ)
PM-3.6 NO simplemente ensambla. **Reescribe** cada actividad del Playbook del Instructor en lenguaje directo al aprendiz:
- Instructor (Playbook): *"Haz que los aprendices analicen la estructura del texto usando SQ3R..."*
- Aprendiz (Guía): *"Analyze the text structure using SQ3R. Follow these steps: 1) Survey... 2) Question... 3) Read..."*

El tono cambia de pedagógico a operativo. Las instrucciones van directas al estudiante.

### REGLA 2 — RESPETO AL NIVEL CEFR
Toda instrucción y texto de la Guía respeta el nivel CEFR declarado. El lenguaje es accesible al aprendiz.
- Vocabulario: solo términos ya enseñados en la Guía
- Sintaxis: estructuras aprendidas
- Extensión: instrucciones concisas (máximo 3 oraciones por actividad)
- Apoyo bilingüe: españ solo para supervivencia si nivel ≤ A1.1

### REGLA 3 — ECONOMÍA DE LENGUAJE
Aplicar "Economía" (Data Contract GFPI-F-134):
- Estructura: Verbo + Objeto + Condición
- Máximo 120 caracteres por instrucción de actividad
- Cero explicaciones teóricas
- Cada palabra cuenta

### REGLA 4 — INTEGRACIÓN CON PLAYBOOK Y F-134
Las evidencias (sección 4 de GFPI-F-135) se extraen de la fila F-134 (columna 8). Las actividades (sección 3) se derivan de las sesiones del Playbook Build-Out.

### REGLA 5 — ESTRUCTURA GFPI-F-135 V02
El documento final tiene:
- Sección 1: Identificación (programa, guía, nivel, intensidad)
- Sección 2: Presentación (qué aprenderás, para qué)
- Sección 3: Actividades de Aprendizaje (3.1 Reflexión, 3.2 Contextualización, 3.3 Apropiación, 3.4 Transferencia)
- Sección 4: Evidencias (las 6 obligatorias del RAP, derivadas de F-134)
- Sección 5: Glosario (20 términos clave)
- Sección 6: Referencias Bibliográficas
- Sección 7: Control del Documento
- Sección 8: Control de Cambios

### REGLA 6 — VERIFICACIÓN DE COHERENCIA
Antes de entregar, verifica:
- ¿Cada actividad tiene instrucción clara en 2ª persona?
- ¿Las evidencias se mencionan dentro de las actividades donde se generan?
- ¿El glosario contiene todos los términos usados?
- ¿El nivel CEFR es consistente?
- ¿Las referencias al Playbook son coherentes?

### REGLA 7 — ETIQUETAS DE DIMENSIÓN DE APRENDIZAJE

> [!warning] AVISO PARA EL LLM — Etiquetas de dimensión
> Cada actividad de aprendizaje ya existe en el Playbook. **No crear actividades nuevas.** Solo etiquetar las existentes con su(s) dimensión(es).

Cada actividad debe llevar la etiqueta de la(s) dimensión(es) que moviliza. Las actividades del pipeline ya están bien diseñadas — solo se agrega la etiqueta como marcador explícito:

| Dimensión | Etiqueta | Verbos típicos | Cuándo aplicar |
|-----------|----------|----------------|----------------|
| **COGNITIVA (Saber)** | `[COGNITIVA]` | identificar, clasificar, recordar, comprender, analizar, relacionar | Cuando el aprendiz apropia teorías, conceptos, hechos o principios |
| **PROCEDIMENTAL (Hacer)** | `[PROCEDIMENTAL]` | construir, ejecutar, reparar, operar, redactar, completar, organizar | Cuando el aprendiz ejecuta una tarea práctica paso a paso |
| **ACTITUDINAL (Ser)** | `[ACTITUDINAL]` | valorar, analizar consecuencias, reflexionar, argumentar, asumir | Cuando el aprendiz reflexiona sobre comportamiento, ética, responsabilidad |

**Reglas de etiquetado:**
- Una actividad puede tener 1, 2 o las 3 dimensiones — depende de lo que moviliza, no del formato.
- La etiqueta va ANTES de la instrucción de la actividad.
- No inventar dimensiones ni cambiar la actividad para "completar las tres" — etiquetar lo que genuinamente hace la actividad.
- Una misma actividad puede llevar múltiples etiquetas si moviliza varias dimensiones simultáneamente.

**Ejemplo de actividad etiquetada:**
```
[COGNITIVA] Classify the 20 Toolbelt terms into the five workshop categories using the Word Wall.
[PROCEDIMENTAL] Build your Word Wall by placing each card in its category following the instructor's model.
[ACTITUDINAL] Reflect on why precise technical vocabulary in English matters for safe communication in the diesel workshop.
```

### REGLA 8 — ESPECIFICACIÓN DEL ENTREGABLE

Toda actividad que genere una evidencia formal (E1–E6 o Final Mission) debe cerrar con un bloque de entregable explícito. No todas las actividades generan evidencia — solo las que están marcadas en el mapa de evidencias del RAP.

**Estructura del bloque de entregable:**
```
📋 EVIDENCIA [n] — [Nombre de la evidencia]
• Producto a entregar: [descripción concisa del artefacto]
• Formato: [PDF / DOCX / Audio / Video / Físico-observable]
• Extensión o criterio mínimo: [páginas / duración / número de ítems / criterio observable]
• Entrega: [LMS / instructor / físico en clase / otro]
```

**Principio de alcance:** No todas las actividades tienen entregable. Una secuencia de actividades puede culminar en una sola evidencia. El bloque aparece solo cuando hay evidencia formal — no en actividades de práctica, drills, reflexión interna o plenarias.

### REGLA 9 — AUTOSUFICIENCIA DE LA GUÍA (Recursos embebidos)

> [!warning] REGLA CRÍTICA — La guía es autosuficiente
> El aprendiz NO debe ir a ningún otro documento para completar ninguna actividad de la guía.

Todo material necesario para ejecutar cada actividad debe estar embebido directamente en la guía:
- **Textos de lectura:** El artículo o texto completo, no solo referencia a él.
- **Worksheets y tablas:** Reproducidos completos, listos para completar.
- **Scripts de audio/listening:** Transcritos en la sección de la actividad correspondiente.
- **Role cards y tarjetas de función:** Incluidas completas con todo su contenido.
- **Ejercicios de gramática:** Enunciados completos con espacios o instrucciones.
- **Rúbricas y checklists de auto-evaluación:** Reproducidos para que el aprendiz los use.
- **Glosario de supervivencia por sesión:** Los términos clave de esa sesión, accesibles sin saltar a otra sección.

**Excepción permitida:** Referencias a recursos audiovisuales externos (videos, audios) se mencionan con URL + descripción + versión transcrita o resumen en la guía. El aprendiz siempre tiene el contenido alternativo si el recurso no está disponible.

---

## EXTENSIÓN v2.6 — CANON PROMOVIDO DESDE MGV-2026-04-20

> [!warning] CANON v2.6 — Tres requisitos adicionales mandatorios
> Desde v2.6, toda guía generada por PM-3.6 DEBE cumplir las reglas 10, 11 y 12. Estas fueron iteradas en el run MGV G1 y promovidas a canon para evitar repetir la iteración en futuros programas.

### REGLA 10 — `activity_footer` OBLIGATORIO EN §3 ACTIVIDADES

Cada actividad de §3 (3.1 Reflexión, 3.2 Contextualización, 3.3 Apropiación S2–S5, 3.4 Transferencia) DEBE cerrar con un bloque `activity_footer` de 6 campos canónicos:

```json
{
  "activity_footer": {
    "ambiente": "<descripción operacional del espacio>",
    "estrategia": "<ABP | ABT | Simulación | Evaluación Formativa>",
    "tecnica": "<técnica didáctica específica>",
    "materiales": ["<insumo 1>", "<insumo 2>", "..."],
    "material_apoyo": "<Canva Deck slide # | Workbook §# | audio | rubric>",
    "duracion_horas": <decimal>
  }
}
```

**Render canónico (DOCX):** tabla de 6 filas con barra naranja izquierda (hex `#F59316`), posicionada inmediatamente después del bloque de instrucciones de la actividad y antes de cualquier apéndice referenciado.

**Script canónico:** `enrich_activity_footers.js` — lee `pm-3-6.json`, valida presencia de `activity_footer` en cada `actividades[*]`, enriquece defaults desde `pm-3-1.json.logistics_box` si faltan, y emite `pm-3-6-enriched.json`.

### REGLA 11 — `apendices_embebidos[*].contenido_inline` OBLIGATORIO (7 TIPOS CANÓNICOS)

Todo apéndice referenciado en §3 DEBE tener su `contenido_inline` poblado con uno de los 7 tipos canónicos (dispatchers en el renderer). **No se permiten apéndices con solo `titulo + ubicacion_seccion`** — deben incluir el contenido renderizable inline.

**Tipos canónicos del schema `contenido_inline.tipo`:**

| # | Tipo | Contenido | Usado en |
|---|------|-----------|----------|
| 1 | `reading_text` | Texto completo de lectura + glossary inline | S2 Reading Master Anchor |
| 2 | `writing_model` | Modelo del formulario/producto a escribir | S3 Writing Task |
| 3 | `audio_script` | Transcripción completa del diálogo de listening | S4 Listening TBLT |
| 4 | `word_wall` | Tabla de categorías × términos (matriz vocabulario) | S2 Vocabulary Scaffold |
| 5 | `mission_brief` | Escenario + roles + briefing + deliverable + rules | S6½–S8 Final Mission |
| 6 | `planning_template` | Plantilla estructurada con campos a completar | Sub-fase Plan de Final Mission |
| 7 | `self_assessment` | Rúbrica/checklist de auto-evaluación del aprendiz | S8 Sub-fase Assess |

**Schema:**
```json
{
  "apendices_embebidos": [
    {
      "id": "APX-01",
      "titulo": "Reading Master Anchor — The Workshop Specialist",
      "ubicacion_seccion": "3.3.S2",
      "contenido_inline": {
        "tipo": "reading_text",
        "data": { /* estructura específica al tipo */ }
      }
    }
  ]
}
```

**Script canónico:** `embed_apendices.js` — valida que cada apéndice tiene `contenido_inline.tipo` válido + `data` no vacío; emite warning si encuentra apéndice con solo referencia.

**Renderer canónico:** `renderInlineAppendix(apendice)` en `gen_35_36_docx.js` — dispatcher que enruta al helper específico según `tipo` (7 helpers: `renderReadingText`, `renderWritingModel`, `renderAudioScript`, `renderWordWall`, `renderMissionBrief`, `renderPlanningTemplate`, `renderSelfAssessment`).

### REGLA 12 — `apendices_referenciados` CON DOBLE RENDER

Cada actividad que usa apéndices DEBE declarar `apendices_referenciados` (array de IDs). El renderer produce doble ubicación del apéndice:

1. **Render inline (primario):** El contenido completo del apéndice se inserta ANTES del `activity_footer` de la actividad que lo referencia. El aprendiz encuentra el material al ejecutar la actividad sin saltar de página.
2. **Render índice (secundario):** Al final de la guía, una sección "Apéndices Consolidados" lista todos los apéndices con su ID, título y ubicación de uso (retrievable reference).

**Schema:**
```json
{
  "actividades": [
    {
      "id": "ACT-S2-01",
      "instruccion": "Read the Master Anchor text and identify the 5 workshop categories.",
      "apendices_referenciados": ["APX-01", "APX-02"],
      "activity_footer": { /* 6 campos */ }
    }
  ]
}
```

**Helper renderer canónico:** `activityFooter(actividad)` en `gen_35_36_docx.js` — renderiza en orden: (a) `instruccion`, (b) `[COGNITIVA/PROCEDIMENTAL/ACTITUDINAL]` label, (c) bloque de entregable si aplica (REGLA 8), (d) inline-render de cada apéndice en `apendices_referenciados` vía `renderInlineAppendix()`, (e) `activity_footer` tabla 6 campos.

**Índice final:** Sección automática "Apéndices Consolidados" que lista `APX-01`, `APX-02`, ..., `APX-N` con tabla de 3 columnas (ID, Título, Ubicación de uso — hipervínculo al §3.x.S# donde se rendereó inline).

### Reglas duras v2.6 (resumen integrado)

| # | Regla | Scope | Validada por |
|---|-------|-------|--------------|
| 10 | `activity_footer` 6 campos poblados (sin `null`) | Cada `actividades[*]` en §3 | PM-2.11 Check 15 (nuevo) |
| 11 | `contenido_inline.tipo` ∈ {7 tipos canónicos} + `data` no vacío | Cada `apendices_embebidos[*]` | PM-2.11 Check 15 |
| 12 | Doble render: inline antes de `activity_footer` + índice al final | Renderer DOCX | Test visual smoke test |

### Scripts canónicos del pipeline v2.6

| Script | Función | Input | Output |
|--------|---------|-------|--------|
| `enrich_activity_footers.js` | Pobla `activity_footer` en cada actividad | `pm-3-6.json` | `pm-3-6-enriched.json` |
| `embed_apendices.js` | Valida y enriquece `apendices_embebidos[*].contenido_inline` | `pm-3-6-enriched.json` | `pm-3-6-final.json` |
| `gen_35_36_docx.js` | Renderer DOCX con helpers `renderInlineAppendix()` + `activityFooter()` | `pm-3-6-final.json` | `pm-3-6.docx` |

### Consecuencia arquitectónica v2.6

La Guía del Aprendiz (GFPI-F-135) emitida por PM-3.6 ahora tiene **paridad operativa total** con el Instructor's Playbook (PM-3.2): mismo bloque `activity_footer` visible, mismo contenido de apéndice inline, misma coherencia entre qué ve el instructor y qué ejecuta el aprendiz. Se eliminan los documentos fantasma (actividad referencia apéndice que no existe) y los saltos de navegación (aprendiz tiene que buscar el texto de lectura en otra sección).

---

## EXTENSIÓN v2.6.1 — DATA-FLOW INVERSION DEL `activity_footer`

> [!warning] CANON v2.6.1 — El `activity_footer` es DERIVADO, no autoreado
> Desde v2.6.1, PM-3.6 NO genera `activity_footer` directamente. El bloque vive como dato derivado desde upstream.

**Regla:** PM-3.6 emite `pm-3-6.json` SIN `activity_footer` en cada actividad. El footer se inyecta post-hoc por el script `derive_activity_footer_from_playbook.js` leyendo:

- Campos sesión-wide → `pm-3-1.sessions_logistics[s].{ambiente, momento_sena, estrategia_dominante}`
- Campos actividad-wide → `pm-3-2-sX.activity_logistics[act_id].{estrategia (override), tecnica, duracion_horas, materiales, material_apoyo}`
- Bloque evidencia (solo para 6 actividades de evidencia formal) → `pm-4-1.instrument_{1..5}_*` o `pm-4-2` (E6)

**Prohibido:** editar `activity_footer` manualmente en `pm-3-6.json`. Toda modificación va a PM-3.1 o PM-3.2-sX, seguida de re-derive.

**Validador:** `check-no-orphan-footer.js` (exit 1 si algún footer diverge de su fuente upstream; obligatorio antes de emitir DOCX).

**Mapping canónico de los 6 activities con bloque `evidencia`:**

| `activity_id` | E# | Instrumento | Técnica SENA | Tipo |
|---|---|---|---|---|
| `A3.3.S2.4` | E1 | Cuestionario No 1 — Reading | Preguntas | Conocimiento |
| `A3.3.S3.4` | E2 | Rúbrica analítica No 2 — Writing | Verificación del producto | Producto |
| `A3.3.S4.2` | E3 | Lista de Chequeo No 3 — Listening | Observación | Desempeño |
| `A3.3.S4.4` | E4 | Escala de Estimación No 4 — Speaking | Observación | Desempeño |
| `A3.3.S5.3` | E5 | Escala de Estimación No 5 — Language Functions | Observación | Desempeño |
| `A3.3b.2` | E6 | Cuestionario Técnico Consolidado (25 pts) | Preguntas | Conocimiento |

---

## EXTENSIÓN v2.6.3 — ACTIVITY CARD SCHEMA CON `scaffold_inline` EMBEBIDO

> [!warning] CANON v2.6.3 — El workspace del aprendiz vive DENTRO de la actividad
> Desde v2.6.3, cada actividad de §3 `seccion_3_actividades_aprendizaje` debe embeber su espacio de trabajo como `scaffold_inline`. PROHIBIDO crear anexos imprimibles separados como workspace.

### REGLA 13 — ACTIVITY CARD v2.6.3 (LEARNER-FACING SCHEMA)

Cada item de `seccion_3_actividades_aprendizaje` debe cumplir el schema v2.6.3 documentado en **Activity Card — Schema.md §9** (Learner-Facing). Los **12 campos canónicos** obligatorios son:

```json
{
  "actividad_id":         "A3.3.S2.4",
  "titulo_en":            "Toolbelt Quiz — Reading Check",
  "titulo_es":            "Cuestionario Toolbelt — Verificación de Lectura",
  "tipo_actividad_sena":  "directa | directa_con_trabajo_autonomo | trabajo_autonomo",
  "tiempo_min":           45,
  "agrupacion":           "individual | pares | grupo_pequeno | plenaria",
  "voc_dimension":        ["cognitiva", "procedimental", "actitudinal"],
  "descripcion_aprendiz": { "en": "...", "es": "..." },
  "paso_a_paso":          [ { "en": "...", "es": "..." }, ... ],   // 3–8 pasos
  "scaffold_inline":      { "tipo": "...", "titulo_en": "...", "titulo_es": "...", "badge": "...", "estructura": { ... } },
  "entregable":           { "producto": {en,es}, "formato": {en,es}, "criterio_minimo": {en,es} },
  "activity_footer":      { /* derivado v2.6.1 */ }
}
```

**Campos obsoletos eliminados** (ausentes en pm-3-6.json):
- `nombre_aprendiz` → absorbido por `titulo_en` / `titulo_es`
- `etiquetas_dimension` → absorbido por `voc_dimension`
- `instruccion_2pers_en` → absorbido por `descripcion_aprendiz.en` + `paso_a_paso[*].en`
- `instruccion_supervivencia_es` → absorbido por `descripcion_aprendiz.es` + `paso_a_paso[*].es`

**Meta del documento:** `pm-3-6.json.meta.activities_schema_version === "v2.6.3"` obligatorio.

### REGLA 14 — LOS 10 TIPOS CANÓNICOS DE `scaffold_inline.tipo`

Todo valor de `scaffold_inline.tipo` debe ser exactamente uno de estos 10. Cualquier otro valor es error bloqueante:

| `tipo` | Uso pedagógico típico | Estructura mínima |
|---|---|---|
| `matching` | Pre-activación vocabulario, glosario bilingüe | `{ items: [ {en, es} ] }` |
| `checklist` | Verificación procedural, revisión entre pares | `{ items: [ {texto_en, texto_es} ] }` |
| `form` | Captura estructurada (brief, risk assessment, inspection) | `{ campos: [ {label_en, label_es, tipo, hint?} ] }` |
| `t_chart` | Comparación binaria (ventajas/desventajas) | `{ columna_izq: {...}, columna_der: {...} }` |
| `writing_template` | Producción escrita guiada con huecos | `{ plantilla_en, plantilla_es, slots: [...] }` |
| `listening_capture` | Notas durante escucha | `{ secciones: [ {label_en, label_es, guia, lineas} ] }` |
| `quiz_preview` | Pre-test / Cuestionario Técnico Consolidado / Reading E1 | `{ items: [ {n, pregunta_en, pregunta_es, tipo, opciones?} ] }` |
| `speaking_script` | Diálogo pautado con turnos | `{ turnos: [ {hablante, linea_en, linea_es?} ] }` |
| `reflection_lines` | Reflexión abierta / meta-cognición | `{ prompt_en, prompt_es, lineas }` |
| `rating` | Auto-evaluación / escala Likert / semáforo | `{ items: [...], escala: {...} }` |

Agregar un tipo nuevo requiere: (a) ampliar el enum en Activity Card — Schema.md §9.5, (b) extender el dispatcher `renderScaffoldInline` en `gen_audit_docx.js`, (c) extender el validador `check-activity-card-schema.js`.

### REGLA 15 — BADGE `★ FORMAL INSTRUMENT` EN 6 EVIDENCIAS

Las 6 actividades de evidencia formal (mapping v2.6.1) DEBEN tener `scaffold_inline.badge` con el ID canónico de su instrumento:

| `activity_id` | `scaffold_inline.badge` | Instrumento |
|---|---|---|
| `A3.3.S2.4` | `instrument_1_reading` | Cuestionario No 1 — Reading |
| `A3.3.S3.4` | `instrument_2_writing` | Rúbrica analítica No 2 — Writing |
| `A3.3.S4.2` | `instrument_3_listening` | Lista de Chequeo No 3 — Listening |
| `A3.3.S4.4` | `instrument_4_speaking` | Escala de Estimación No 4 — Speaking |
| `A3.3.S5.3` | `instrument_5_language_functions` | Escala de Estimación No 5 — Language Functions |
| `A3.3b.2` | `pm_4_2_consolidado` | Cuestionario Técnico Consolidado (25 pts) |

El renderer pinta el badge en ORANGE (`#F59316`) dentro del encabezado del scaffold, alineado visualmente con la Línea 2 del `activity_footer` (bloque evidencia).

### REGLA 16 — ORDEN PEDAGÓGICO DE RENDERIZADO

El renderer v2.6.3 (`renderActivityCard_v263` en `gen_audit_docx.js`) renderiza cada actividad en este orden **estricto**:

```
┌─ HEADER: actividad_id · tipo_actividad_sena · titulo_en / titulo_es · metadata (tiempo, agrupación, V+O+C)
├─ descripcion_aprendiz (EN + ES)
├─ paso_a_paso (numerado, ORANGE bold)
├─ [INPUT MATERIAL] apendices_referenciados renderizados inline (texto lectura, guion listening) ← v2.6
├─ [WORKSPACE] scaffold_inline ← v2.6.3
├─ [ENTREGABLE] producto · formato · criterio mínimo
└─ activity_footer ← v2.6.1
```

Flujo pedagógico: **lee input → trabaja en el scaffold → entrega el producto**. Ningún renderer debe invertir esta secuencia.

### REGLA 17 — PROHIBICIONES ARQUITECTÓNICAS v2.6.3

1. **PROHIBIDO** crear anexos imprimibles separados cuya función sea "espacio de trabajo del aprendiz". Todo workspace va embebido como `scaffold_inline` dentro de la actividad.
2. **PERMITIDO** conservar apéndices legacy (v2.6) como **material de input** (texto de lectura, guion de listening, glosario). Se renderizan inline ANTES del scaffold.
3. **PROHIBIDO** reintroducir cualquiera de los 4 campos obsoletos (`nombre_aprendiz`, `etiquetas_dimension`, `instruccion_2pers_en`, `instruccion_supervivencia_es`).
4. **PROHIBIDO** cambiar `meta.activities_schema_version` a un valor distinto de `"v2.6.3"`.

### Reglas duras v2.6.3 (resumen)

| # | Regla | Scope | Validada por |
|---|-------|-------|--------------|
| 13 | Activity card schema v2.6.3 (12 campos) en cada `seccion_3_actividades_aprendizaje[*]` | `pm-3-6.json` | `check-activity-card-schema.js` + PM-2.11 Check 16 |
| 14 | `scaffold_inline.tipo` ∈ 10 canónicos | Cada actividad | `check-activity-card-schema.js` |
| 15 | 6 actividades evidencia con `scaffold_inline.badge` canónico | 6 activities | `check-activity-card-schema.js` |
| 16 | Orden de renderizado: input → scaffold → entregable → footer | Renderer DOCX | Smoke test visual |
| 17 | Ningún campo obsoleto + meta version correcta | `pm-3-6.json` | `check-activity-card-schema.js` |

### Pipeline canónico v2.6.3

| Script | Función | Input | Output |
|--------|---------|-------|--------|
| `v263-activities-data.js` | Specs por actividad (30 en G1 MGV) | — | Data file, exportado via `module.exports` |
| `rewrite_activities_v263.js` | Migrador idempotente: aplica specs a pm-3-6.json (con backup) | `pm-3-6.json` + `v263-activities-data.js` | `pm-3-6.json` (schema v2.6.3) |
| `check-activity-card-schema.js` | Validador schema + 10 tipos + badges + meta | `pm-3-6.json` | exit 0 PASS / 1 FAIL |
| `check-no-orphan-footer.js` | Validador footer (v2.6.1 preservado) | `pm-3-6.json` + upstream | exit 0 / 1 |
| `gen_audit_docx.js` | Renderer con `renderActivityCard_v263` + 10 renderers de scaffold + dispatch por `titulo_en` | `pm-3-6.json` | `pm-3-6-FINAL-G*.docx` |

**Back-compat:** `renderActividades` despacha según `titulo_en`. Si está presente → v2.6.3. Si no → legacy v2.6. Runs pre-v2.6.3 renderizan sin modificaciones.

### Caso-origen y estado actual

- **Run origen:** MGV-2026-04-20 G1 (The Visual Communicator)
- **Actividades migradas:** 30/30
- **Distribución de tipos:** form 11 · matching 4 · checklist 3 · reflection_lines 3 · quiz_preview 2 · writing_template 2 · speaking_script 2 · t_chart 1 · listening_capture 1 · rating 1
- **Badges verificados:** 6/6
- **Validadores:** PASS sin errores
- **DOCX FINAL:** `pm-3-6-FINAL-G1.docx` 86.7 KB (+40% vs v2.6 por scaffolds embebidos)

### Consecuencia arquitectónica v2.6.3

La Guía del Aprendiz ahora es **verdaderamente autosuficiente por página**: cada actividad contiene en una sola unidad visual la instrucción + el input + el workspace + el entregable + la logística. El aprendiz no vuelve atrás para re-leer mientras escribe, no busca anexos separados, no pregunta "¿dónde hago esto?". El instructor no imprime un paquete de anexos aparte. La guía impresa o digital funciona como documento único.

*Lección aprendida MGV-2026-04-20 G1 Fase 4: v2.6.1 separaba instrucción (cuerpo) de workspace (anexo). En simulación de ejecución, el 100% de los aprendices volteaba páginas hacia atrás para re-leer mientras escribía. v2.6.3 cierra ese loop: instrucción a 2 cm del workspace.*

---

## EXTENSIÓN v2.6.4 — SECCIÓN 4 FORMATO SENA + ALINEACIÓN DE CANON UPSTREAM→DOWNSTREAM

### REGLA 18 — SECCIÓN 4 DEBE USAR EL FORMATO OFICIAL SENA (TABLA 6 COLUMNAS)

A partir de v2.6.4, la **Sección 4 de la Guía del Aprendiz (GFPI-F-135)** debe titularse literalmente:

> **4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO**

Y contener una **tabla única de 6 columnas × N filas** (1 fila por cada actividad de aprendizaje de la guía, en orden cronológico de S1 → S7-S8). Para una guía de 8 sesiones canónica, N=30.

#### Schema canónico `seccion_4_planteamiento_evidencias` (v2.6.4)

```json
{
  "titulo_formal": "4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO",
  "titulo_aprendiz": "4. Planteamiento de Evidencias de Aprendizaje",
  "introduccion": "<párrafo explicativo que aclare: 30 actividades, solo 6 con evidencia formal, cols 1-2 de diligenciamiento manual, cols 4-5-6 vacías (—) cuando no aplica>",
  "columnas": [
    "Fase del proyecto formativo",
    "Actividad del proyecto formativo",
    "Actividad de aprendizaje",
    "Evidencias de Aprendizaje",
    "Criterios de evaluación",
    "Técnicas e instrumentos de evaluación"
  ],
  "filas_evidencia": [
    {
      "numero": 1,
      "fase_pf": "",                          // manual
      "actividad_pf": "",                     // manual
      "actividad_aprendizaje": "<actividad_id> — <titulo_es> (<sesion>)",
      "evidencia": null,                      // null = "—" en DOCX
      "criterios": null,
      "tecnica_instrumento": null
    },
    {
      "numero": 9,
      "fase_pf": "",
      "actividad_pf": "",
      "actividad_aprendizaje": "A3.3.S2.4 — EVIDENCIA E1 — Quiz de lectura (S2)",
      "evidencia": "E1 — Reading Comprehension Quiz (Conocimiento · 5 pts)",
      "criterios": "5 ítems de opción múltiple A/B/C/D... (Fuente: PM-4.1 INST-01 items)",
      "tecnica_instrumento": "Técnica: Formulación de preguntas · Instrumento: Cuestionario No 1 (PM-4.1)"
    }
    // ... 28 filas más
  ],
  "total_actividades": 30,
  "total_evidencias_formales": 6,
  "canon_reference": {
    "e1_a_e5_pts": 25,
    "e6_pts": 25,
    "misión_final_pts": 5,
    "total_canon": 55,
    "misión_final_nota": "La Misión Final NO es evidencia formal. Sus 5 pts no suman al canon de 55."
  },
  "derived_from": {
    "pm_2_4_upstream": "pm-2-4.json · universe_anchor.genre (canon)",
    "pm_4_1_instruments": "pm-4-1.json · instrument_1..5 criterios (no alucinación)",
    "pm_4_2_cuestionario": "pm-4-2.json · canon_structure.sections_list",
    "pm_3_6_activities": "pm-3-6.json · seccion_3 actividades IDs + títulos"
  }
}
```

#### Reglas duras v2.6.4

- **Col 5 (`criterios`) PROHIBIDA DE INVENTAR.** Debe derivar literal de `pm-4-1.json` (INST-01 a INST-05) para E1-E5 y de `pm-4-2.json.canon_structure.sections_list` para E6. Cada celda cita su origen al final: `(Fuente: PM-4.1 INST-0X)` o `(Fuente: PM-4.2)`.
- **Col 6 (`tecnica_instrumento`) usa nomenclatura canónica SENA:** tres técnicas oficiales (Formulación de preguntas · Observación · Verificación del producto) × 6 instrumentos nombrados canónicamente (Cuestionario No 1 · Rúbrica analítica No 2 · Lista de Chequeo No 3 · Escala de Estimación No 4 · Escala de Estimación No 5 · Cuestionario consolidado No 6).
- **Cols 1-2 son celdas vacías** (para diligenciamiento manual por el coordinador del proyecto formativo). En el DOCX se rinden con shading del color de la fila (crema si es evidencia, blanco si no), pero sin texto.
- **Filas sin evidencia muestran `—`** explícito en cols 4-5-6, centrado. No se omite la fila — toda actividad debe aparecer.
- **Filas de evidencia (6) tienen fondo crema (`#FFF6E8`)** y texto en negrita en col 3 y col 4 para destacar la formalidad. Header naranja institucional (`#F59316`).

#### Campos ELIMINADOS de `seccion_4_planteamiento_evidencias` (pre-v2.6.4)

- ❌ `evidencias[]` (array de 6 objetos con codigo/nombre_aprendiz/que_es/...) — **reemplazado por `filas_evidencia[]`**
- ❌ `evidencia_complementaria_no_formal` — **info migrada a `canon_reference.misión_final_nota`**
- ❌ `tabla_resumen_canon_55` — **info migrada a `canon_reference`**

#### Revisión v3.2 — Granularidad Opción A (parent activities · 12 filas) + Canon FM-1 (50 pts) + Paleta SENA

A partir de v3.2 (DIESEL-2026-04-19 · 2026-04-21), la REGLA 18 admite **dos granularidades válidas** según la densidad pedagógica de la guía:

| Granularidad | Filas | Cuándo usar | Ejemplo canon |
|---|---|---|---|
| **Opción A — parent activities** | 12 | Una fila por actividad padre (no por sub-actividad). Para guías markdown-native donde cada PM-2.x genera 1-2 actividades agregadas. | DIESEL-2026-04-19 (Workshop Specialist) |
| **Opción B — full activity map** | 30 | Una fila por cada sub-actividad. Para guías JSON-native con `pm-3-6.json` completo y 28-30 actividades atómicas. | MGV-2026-04-20 (Visual Communicator) |

**Canon FM-1 (aplicable a ambas granularidades):**

- La Misión Final es **evaluación de transferencia formativa**, NO formal.
- Puntaje total = **E1 + E2 + E3 + E4 + E5 + E6 = 5+5+5+5+5+25 = 50 pts** (NO 55).
- La Misión Final genera retroalimentación con puntaje /5 usando la Escala de Estimación No 6 (PM-4.1) pero **no suma** al canon.
- `canon_reference.total_canon` = 50; `canon_reference.misión_final_pts` = 5 (formativo, no sumativo).

**Paleta de header de la tabla canónica (v3.2 SENA institucional):**

- Header de la tabla de 6 columnas: **verde SENA `#39A900`** (reemplaza el naranja `#F59316` de v2.6.4).
- Títulos de sección (navyHeader): **azul oscuro SENA `#0B2E45`** (reemplaza el navy `#1C2B3C` de v2.6.4).
- Celdas de evidencia formal: mantener fondo crema (`#FFF6E8`) o equivalente claro.

**Ruta de implementación canónica (v3.2):**

Para guías markdown-native (Opción A), la REGLA 18 se aplica editando directamente la Sección 4 del archivo `pm-3-6-learning-guide.md` y actualizando `scripts/pm-3-6-assemble.js::sec4()` para generar el DOCX equivalente. Para guías JSON-native (Opción B), se mantiene el flujo original via `pm-3-6.json.seccion_4_planteamiento_evidencias` → `pm-3-6-gen.js`.

**Script canónico DIESEL (v3.2 · Opción A):**

```
runs/DIESEL-2026-04-19/scripts/pm-3-6-assemble.js::sec4()
```

Incluye el helper `simpleTable(headers, rows, colWidths, { headerFill })` que acepta color de fondo de header como opción — permite verde SENA para la tabla canónica Sección 4 mientras el resto de tablas del documento conservan el navy institucional.

### REGLA 19 — CONSISTENCIA UPSTREAM→DOWNSTREAM (CHECK 17)

El learner-facing guide (`pm-3-6.json`) debe ser **espejo fiel** de las decisiones arquitectónicas tomadas en Fase 2 (`pm-2-X.json`) y Fase 3 (`pm-4-1.json`, `pm-4-2.json`). Cualquier drift downstream (rename de producto, cambio de criterios, alteración de puntajes) es un **BUG**, no una feature.

#### CHECK 17 — validación obligatoria en pre-generación

Antes de ejecutar `gen_35_36_docx.js`, se debe validar:

1. **Nombre del producto de cada evidencia en `seccion_3`** = nombre del producto en `pm-2-X.activity_card.universe_anchor.genre` (o equivalente campo upstream).
2. **Criterios de evaluación de col 5** = literal de `pm-4-1.instrument_X.criteria` / `.checklist_items` / `.observation_criteria` / `.stations` (o `pm-4-2.canon_structure.sections_list` para E6).
3. **Puntajes por evidencia** consistentes entre `pm-3-6.seccion_4.canon_reference` y `pm-4-1` + `pm-4-2` + el `canon_55_reference` del run.
4. **Títulos de sesión en `seccion_3`** coherentes con el producto canónico (ej: Sesión 3 con producto "email" no puede titularse "Font Card").

*Caso-origen MGV-2026-04-20 G1 v2.6.4: `pm-2-4.json` canonizó "Design Decision Email" como producto E2 desde Fase 2 (5 arquetipos A-E, genre analysis, blueprint model, integración con S4 Listening). `pm-4-1.json` derivó correctamente la rúbrica INST-02 sobre email (4 criterios × 1/1.5/1.5/1 pt = 5 pts). Sin embargo, en la generación v2.5 de `pm-3-6.json` se renombró E2 a "Font Card" en seccion_3 (títulos S3 + 3 actividades) y en seccion_4.evidencias[1]. Detectado por CHECK 17 durante v2.6.4. Remediado: rename A3.3.S3.2 + A3.3.S3.3 + A3.3.S3.4 + título sesión a "Design Decision Email". Documentado en `_ciclo_2_5_patch.v264` de pm-3-6.json.*

### Reglas duras v2.6.4 (resumen)

1. Sección 4 se titula literal "PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO".
2. Tabla única de 6 columnas (orden fijo: Fase PF | Actividad PF | Actividad aprendizaje | Evidencias | Criterios | Técnicas e instrumentos).
3. Una fila por actividad en orden cronológico (S1 → S7-S8). Total filas = total actividades de la guía (30 en canon 8-sesiones).
4. Cols 4-5-6 vacías (`—`) en actividades sin evidencia formal. Pobladas solo en las 6 filas de evidencia (E1-E6).
5. Col 5 **prohibida de inventar** — derivada de PM-4.1 / PM-4.2, con citación de origen `(Fuente: ...)`.
6. CHECK 17 pre-generación: verificar consistencia upstream (pm-2-X) ↔ downstream (pm-3-6) para nombres de producto, criterios y puntajes.

### Pipeline canónico v2.6.4

```
pm-2-4.json.universe_anchor.genre       ─┐
pm-4-1.json.instrument_X                 ├─> patch_v264_seccion4_y_e2.js ─> pm-3-6.json
pm-4-2.json.canon_structure              │       (reescribe seccion_4)
pm-3-6.json.seccion_3.actividades[]     ─┘
                                             │
                                             ▼
                                     gen_35_36_docx.js (updated)
                                             │
                                             ▼
                                     pm-3-6-FINAL-G1.docx
                                     (tabla SENA 6 cols × 31 rows)
```

*Lección aprendida MGV-2026-04-20 G1 v2.6.4: la Sección 4 v2.6.3 renderizaba 3 sub-secciones (evidencias[] + complementaria + tabla resumen 55) que ocupaban ~6 páginas y no se mapeaban al formato oficial SENA esperado por la Secretaría Académica. v2.6.4 consolida en 1 tabla canónica que cumple el formato GFPI-F-135 V02 oficial.*

---

## EXTENSIÓN v2.6.5 — SHARED RENDERER PATTERN (FUENTE ÚNICA DE VERDAD POR SECCIÓN)

### REGLA 20 — NINGUNA SECCIÓN PUEDE VIVIR DUPLICADA EN 2 GENERADORES

**Problema operacional diagnosticado (caso MGV-2026-04-20 G1, 2026-04-21):**

El pipeline de MGV emite dos artefactos DOCX por guía:

| Artefacto | Generador | Propósito |
|-----------|-----------|-----------|
| `pm-3-6-review.docx` | `scripts/gen_35_36_docx.js` | Revisión rápida (sin portada audit) |
| `pm-3-6-FINAL-G1.docx` | `scripts/gen_audit_docx.js` | FINAL para auditoría (con portada branded) |

Durante v2.6.4 se parcheó la Sección 4 al nuevo formato SENA (6 columnas × 30 filas) **solo en `gen_35_36_docx.js`**. El FINAL quedó desactualizado porque el render de Sección 4 vivía duplicado inline en `gen_audit_docx.js`. Resultado: el aprendiz/auditor recibió un DOCX FINAL sin los cambios v2.6.4 — **drift silencioso** entre generadores.

**REGLA 20 (canon v2.6.5):**

> Ninguna sección de la Guía GFPI-F-135 que aparezca en más de un output DOCX puede vivir duplicada inline. Toda sección renderizada en ≥2 generadores **debe** extraerse a `runs/[RUN-ID]/scripts/lib/render_*.js` y ser importada como módulo. El inline render inline-en-dos-archivos queda explícitamente prohibido.

### ARQUITECTURA CANÓNICA v2.6.5

```
scripts/
├── lib/
│   └── render_seccion4_evidencias.js      ← FUENTE ÚNICA DE VERDAD
│                                             (renderSeccion4Evidencias(data, ctx))
├── gen_35_36_docx.js                      ← importa lib/render_seccion4_evidencias
├── gen_audit_docx.js                      ← importa lib/render_seccion4_evidencias
└── check-generator-parity.js              ← valida que ambos generadores
                                             produzcan contenido idéntico
```

### CONTRATO DEL RENDERER COMPARTIDO

```js
// scripts/lib/render_seccion4_evidencias.js

function renderSeccion4Evidencias(data, ctx) {
  // Input:
  //   data = pm-3-6.json completo (lee data.seccion_4_planteamiento_evidencias)
  //   ctx  = {
  //     docx:    { Paragraph, TextRun, Table, TableRow, TableCell,
  //                AlignmentType, WidthType, ShadingType },
  //     palette: { ORANGE, WHITE, GREY, CREAM, CONTENT_W },
  //     helpers: { P, H1, H2, H3, cell, kv, quote, note, makeTable, pageBreak }
  //   }
  // Output: Array<Paragraph|Table> listo para Document.children
}

module.exports = { renderSeccion4Evidencias };
```

El llamador es responsable de inyectar las dependencias (`docx` API, paleta, helpers). Esto permite que cada generador use su propia paleta sin perder el contrato estructural común.

### VALIDADOR OBLIGATORIO — CHECK DE PARIDAD

El script `scripts/check-generator-parity.js` se ejecuta después de regenerar los DOCX:

```bash
node scripts/gen_35_36_docx.js
node scripts/gen_audit_docx.js
node scripts/check-generator-parity.js   # FALLA si hay drift
```

**Qué valida:**

1. Ambos DOCX contienen el texto canon `Total canon = 55` en Sección 4.
2. Ambos DOCX contienen las 6 evidencias formales (E1..E6) con el mismo nombre de producto.
3. Ninguna línea de Sección 4 vive exclusivamente en un DOCX (módulo diff tolerante a diferencias de shim callout/quote conocidas).

**Exit codes:** `0 = OK`, `1 = drift detectado`, `2 = archivos faltantes`.

### CUÁNDO EXTRAER UNA NUEVA SECCIÓN AL SHARED RENDERER

Aplicar REGLA 20 **proactivamente** cada vez que una sección entre a aparecer en más de un generador. Indicadores:

- La sección se menciona en `grep -l "seccion_N_" scripts/gen_*.js` y devuelve ≥2 archivos.
- El prompt PM-3.X de esa sección cambia el schema → hay riesgo de drift.
- El renderer inline de esa sección supera ~30 líneas — replicarlo manualmente es frágil.

Regla de pulgar: **si una sección se renderiza en review + FINAL, vive en `lib/`**.

### IMPLEMENTACIÓN CANÓNICA — Run MGV-2026-04-20

| Archivo | Rol |
|---------|-----|
| `scripts/lib/render_seccion4_evidencias.js` | **Fuente de verdad** — lógica de render Sección 4 (95 líneas) |
| `scripts/gen_35_36_docx.js` | Consume el renderer vía `require('./lib/render_seccion4_evidencias')` |
| `scripts/gen_audit_docx.js` | Consume el renderer vía `require('./lib/render_seccion4_evidencias')` |
| `scripts/check-generator-parity.js` | Validador de drift |

*Lección aprendida MGV-2026-04-20 G1 v2.6.5 (2026-04-21): durante la aplicación de v2.6.4 se detectó que Sección 4 tenía 2 implementaciones independientes en 2 generadores DOCX. Cuando el instructor revisó el FINAL-G1, encontró que no tenía los cambios de formato SENA que sí aparecían en el review. Sin shared renderer, el drift es inevitable a escala (22 PMs × 8 sesiones × 8 guías × múltiples schemas). v2.6.5 cierra esta clase de bug de forma arquitectónica.*

---

## EXTENSIÓN v2.6.6 — PALETA SENA INSTITUCIONAL

> [!warning] CANON v2.6.6 (2026-04-21) — Paleta SENA institucional reemplaza Pixel branding
> Toda guía generada por PM-3.6 desde v2.6.6 hereda la paleta canónica SENA.

### REGLA 21 — PALETA SENA CANÓNICA

La paleta institucional SENA es OBLIGATORIA en todo render DOCX/PPTX/XLSX:

| Color | Hex | Rol canon | Uso |
|-------|-----|-----------|-----|
| **Verde SENA** | `#39A900` | Header tablas + accents protagonistas | Header Sección 4 · CEFR badges A1/A2 · accents pedagógicos |
| **Azul oscuro SENA** | `#0B2E45` | Headings + títulos sección | H1/H2/H3 · `navyHeader` |
| **Verde oscuro SENA** | `#007832` | Highlights secundarios | Subheadings + dividers |

### Cambios v2.6.6 (vs v2.6.5)

- Header tabla Sección 4: naranja `#F59316` → **verde `#39A900`**
- Headings sección (navyHeader): navy `#1C2B3C` → **azul oscuro SENA `#0B2E45`**
- Celdas de evidencia formal: mantener fondo crema (`#FFF6E8`) o equivalente claro
- Nombres legacy preservados (`NAVY/ORANGE`) por backward compat · solo el VALOR remapea

### Implementación canónica v2.6.6

Aplicada en MGV-2026-04-20 G1 a:
- `scripts/gen_audit_docx.js`
- `scripts/gen_35_36_docx.js`
- `scripts/gen_3_docx.js`
- `scripts/lib/render_seccion4_evidencias.js` (shared renderer · single source of truth)

Backup pre-paleta preservado en `scripts/backup-pre-sena-palette-20260421-052405/`.

### Consecuencia arquitectónica v2.6.6

Todos los runs futuros heredan paleta SENA institucional · cero residuales naranja/navy/cream legacy.

*Lección aprendida MGV-2026-04-20 G1 v2.6.6 (2026-04-21): la paleta Pixel & Ink era branding del programa MGV-G1 (estudio gráfico ficticio del universo narrativo), NO branding institucional SENA. Coordinación académica solicitó marca institucional canónica. v2.6.6 promueve verde+azul SENA como canon permanente para todos los programas.*

---

## EXTENSIÓN v2.7 — LEARNER-READABLE ACTIVITY · ANATOMÍA 6-BLOQUE

> [!warning] CANON v2.7 (2026-04-22) — Anatomía learner-readable de 6 bloques + supresión metadata pipeline
> Migración completa del schema activity card v2.6.3 → v2.7. **Schema v2.6.3 deprecado** · v2.7 es canon vigente.

### REGLA 22 — ANATOMÍA 6-BLOQUE LEARNER-READABLE

Cada actividad de §3 `seccion_3_actividades_aprendizaje` debe renderizar la siguiente anatomía visual de 6 bloques pedagógicamente coherente:

```
┌─ BLOQUE 1 · ENCABEZADO V+O+C ───────────────────────────────────┐
│  enunciado_voc.{en, es} — Verbo + Objeto + Condición             │
│  titulo_en / titulo_es                                           │
│  Metadata: tiempo_min · agrupacion · tipo_actividad_sena         │
├─ BLOQUE 2 · DESCRIPCIÓN NARRATIVA (60–120 palabras) ────────────┤
│  descripcion_narrativa.{en, es} — 3 movimientos:                 │
│    (1) Qué vas a hacer                                          │
│    (2) Por qué importa                                          │
│    (3) Promesa pedagógica (qué dominas al final)                │
├─ BLOQUE 3 · STEP-BY-STEP (5–7 pasos) ───────────────────────────┤
│  paso_a_paso[].{en, es} — Verbos imperativos · economía         │
├─ BLOQUE 4 · ENTREGABLE ─────────────────────────────────────────┤
│  entregable.{producto, formato, criterio_minimo}.{en, es}        │
├─ BLOQUE 5 · EVIDENCIA FIRST-CLASS (solo si produce_evidencia) ──┤
│  evidencia.{codigo, nombre, tipo_sena, tecnica, instrumento, ...}│
├─ BLOQUE 6 · FOOTER LOGÍSTICO ───────────────────────────────────┤
│  activity_footer.{ambiente, estrategia, tecnica, materiales,    │
│                   material_apoyo, duracion_horas}                │
└──────────────────────────────────────────────────────────────────┘
```

### REGLA 23 — SCHEMA v2.7 (CAMPOS CANÓNICOS)

**17 campos canónicos por actividad** (reemplaza schema v2.6.3 de 12 campos):

```json
{
  "actividad_id":           "A3.3.S2.4",
  "schema_version":         "v2.7",
  "titulo_en":              "string",
  "titulo_es":              "string",
  "tipo_actividad_sena":    "Actividad cognitiva | Actividad procedimental | Actividad actitudinal | combinaciones con ' + '",
  "actividad_tipo_label":   "label friendly para render",
  "tiempo_min":             45,
  "agrupacion":             "individual | pares | grupo_pequeno | plenaria | combinaciones",
  "voc_dimension":          ["cognitiva", "procedimental", "actitudinal"],
  "produce_evidencia":      true | false,
  "enunciado_voc":          { "en": "...", "es": "...", "_review_status": "DRAFT|APPROVED" },
  "descripcion_narrativa":  { "en": "60–120 palabras 3 movimientos", "es": "..." },
  "paso_a_paso":            [{ "en": "...", "es": "..." }, ...],   // 5–7 pasos
  "scaffold_inline":        { "tipo": "...", "titulo_en": "...", "titulo_es": "...", "estructura": {...}, "badge"?: "..." },
  "entregable":             { "producto": {en,es}, "formato": {en,es}, "criterio_minimo": {en,es} },
  "materiales":             ["...", "..."],
  "evidencia":              null | { "codigo": "E1", "nombre": "...", "tipo_sena": "...", "tecnica_evaluacion": "...", "instrumento": "..." },
  "activity_footer":        { /* derived v2.6.1 · 6 campos */ },
  "_legacy"?:               { /* snapshot pre-migration · preserved */ }
}
```

### REGLA 24 — CAMPOS OBSOLETOS PROHIBIDOS (v2.7 estricto)

Los siguientes campos están **PROHIBIDOS** desde v2.7 (deben estar AUSENTES):

| Campo obsoleto | Reemplazado por | Razón |
|----------------|------------------|-------|
| `nombre_aprendiz` | `titulo_en` + `titulo_es` | Bilingüismo first-class |
| `etiquetas_dimension` (e.g. `"[COGNITIVA]"`) | `voc_dimension` (e.g. `["cognitiva"]`) | Datos estructurados sin syntax label |
| `instruccion_2pers_en` | `descripcion_narrativa.en` + `paso_a_paso[].en` | Anatomía 6-bloque (descripción + pasos separados) |
| `instruccion_supervivencia_es` | `descripcion_narrativa.es` + `paso_a_paso[].es` | Anatomía 6-bloque bilingüe simétrica |
| `descripcion_aprendiz` (v2.6.3) | `descripcion_narrativa` | Cambio nombre canónico v2.6.3 → v2.7 |

### REGLA 25 — META OBLIGATORIO

`pm-3-6.json.meta.activities_schema_version === "v2.7"` obligatorio.

```json
{
  "meta": {
    "activities_schema_version": "v2.7",
    "activities_rewritten_at": "ISO-8601",
    "v27_piloto_ids"?: [...],   // si rollout incremental
    "v27_full_ids"?: [...]      // si rollout completo
  }
}
```

### REGLA 26 — SUPRESIÓN PIPELINE METADATA EN DOCX APRENDIZ

Los siguientes campos se preservan en JSON pero **SE SUPRIMEN** del DOCX que ve el aprendiz:

- `fuente_pm_*` (referencias upstream pipeline)
- `cross_references`
- `voc_dimension` (datos · pero NO etiqueta visible · se etiqueta vía `tipo_actividad_sena` user-friendly)
- `schema_version`

Renderer canónico DEBE filtrar estos campos en output DOCX learner-facing. JSON conserva todo (machine-readable · auditoría · pipeline downstream).

### REGLA 27 — 10 TIPOS CANÓNICOS scaffold_inline (PRESERVED FROM v2.6.3)

Los 10 tipos canónicos REGLA 14 v2.6.3 se mantienen en v2.7:

| `tipo` | Uso |
|---|---|
| `matching` | Pre-activación vocabulario, glosario bilingüe |
| `checklist` | Verificación procedural |
| `form` | Captura estructurada |
| `t_chart` | Comparación binaria |
| `writing_template` | Producción escrita guiada |
| `listening_capture` | Notas durante escucha |
| `quiz_preview` | Pre-test / Cuestionario |
| `speaking_script` | Diálogo pautado |
| `reflection_lines` | Reflexión abierta |
| `rating` | Auto-evaluación / escala |

### Pipeline canónico v2.7

| Script | Función | Input | Output |
|--------|---------|-------|--------|
| `rewrite_activities_v27.js` | Migrador idempotente v2.6.3 → v2.7 (con backup) | `pm-3-6.json` (v2.6.3) | `pm-3-6.json` (v2.7) |
| `check-activity-card-schema.js` (v2.7) | Validador 17 campos + 5 obsoletos AUSENTES + tipos canónicos | `pm-3-6.json` | exit 0 PASS / 1 FAIL |
| `derive_activity_footer_from_playbook.js` | activity_footer v2.6.1 derivation (preserved) | `pm-3-6.json` + upstream | `pm-3-6.json` enriched |
| `gen_audit_docx.js` (v2.7) | Renderer DOCX con `renderActivityCard_v27` (anatomía 6-bloque) + supresión pipeline metadata | `pm-3-6.json` | `pm-3-6-FINAL-G*.docx` |

**Modos del migrador `rewrite_activities_v27.js`:**
- `--dry-run` produce migration-report-v27.md sin tocar pm-3-6.json
- `--apply` escribe pm-3-6.json (backup .pre-v27.bak obligatorio)
- `--activity ID` procesa una sola actividad (override)
- `--batch {piloto,A,B,C,D}` procesa batch específico

**Salvaguardas:**
- Idempotente · si schema_version === "v2.7" la actividad se salta
- Validación run_id explícita
- Backup obligatorio antes de --apply

### Caso-origen y estado actual v2.7

- **Run origen:** MGV-2026-04-20 G1 (The Visual Communicator)
- **Actividades migradas:** 30/30 (rollout en 4 batches: piloto 3 + A 7 + B 8 + C 8 + D 4)
- **DOCX final:** `pm-3-6-FINAL-G1.docx` 103.7 KB (+13% vs v2.6.6 por anatomía narrativa)
- **0 fugas de jerga de pipeline** en DOCX aprendiz (`fuente_pm_*` · `cross_references` · `schema_version` filtrados)
- **JSON preserva todo** (machine-readable · pipeline downstream consume metadata)

### Consecuencia arquitectónica v2.7

La Guía del Aprendiz alcanza **paridad completa con expectativa pedagógica SENA**: cada actividad como capsula de 6 bloques visualmente coherentes · narrativa motivacional ANTES de los pasos · evidencia first-class (no escondida en footer) · 0 fugas de metadata pipeline. El instructor puede entregar el DOCX directo al aprendiz · cero edición manual.

*Lección aprendida MGV-2026-04-20 G1 Fase 4 v2.7 (2026-04-22): el v2.6.3 schema renderizaba "instrucción + scaffold + footer" sin contexto narrativo · aprendices reportaron "no entiendo POR QUÉ hago esto". v2.7 anatomía 6-bloque incluye descripción narrativa 60-120 palabras en 3 movimientos (qué/por qué/promesa) ANTES de los pasos · genera engagement + claridad pedagógica antes del scaffolding ejecutivo.*

### Compatibilidad backward v2.7

- v2.6.3 marcado **DEPRECATED** · pero schema_version no-v2.7 permitido en runs legacy con backup preservado
- `_legacy` field preserva snapshot pre-migration (auditabilidad)
- Renderers v2.7 dispatch por `schema_version`: v2.7 usa anatomía 6-bloque · v2.6.3 fallback al renderer legacy

---

## FORMATO DE SALIDA

**Documento único: GFPI-F-135 V02** (Guía del Aprendiz)

```
PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL
FORMATO GUÍA DE APRENDIZAJE
GFPI-F-135 V02

English Learning Guide #[n]: [Nombre de la Guía]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
[Programa, código, nivel CEFR, intensidad, duración]

2. PRESENTACIÓN
[Qué aprenderás en esta guía, por qué, para qué contexto laboral]

3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE
  3.1. Actividades de Reflexión Inicial (S1)
  [Reescrito en 2ª persona desde PM-2.1]
  
  3.2. Actividades de Contextualización (S1)
  [Reescrito en 2ª persona desde PM-2.2]
  
  3.3. Actividades de Apropiación (S2-S5)
  [Reescrito en 2ª persona desde PM-2.3 a PM-2.10, organizadas por sesión]
  [Cada actividad menciona cuándo genera evidencia]
  
  3.4. Actividades de Transferencia (S6-S8)
  [Reescrito en 2ª persona desde PM-3.5: Final Mission]
  [Explica roles, deliverables, criterios de éxito]

4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE
[Las 6 evidencias formales de la fila F-134, descritas en lenguaje del aprendiz]
[Especifica: qué es cada evidencia, cuándo se genera, cómo se evalúa]

5. GLOSARIO DE TÉRMINOS (KEY VOCABULARY)
[20 términos clave con definiciones simples en inglés + imagen/ejemplo]

6. REFERENTES BIBLIOGRÁFICOS
[Historias curadas, recursos, artículos sugeridos por tema]

7. CONTROL DEL DOCUMENTO
| Nombre | Cargo | Dependencia | Fecha |
|--------|-------|-------------|-------|
| [instructor] | INSTRUCTOR | [SENA centro] | [fecha] |

8. CONTROL DE CAMBIOS
| Nombre | Cargo | Dependencia | Fecha | Razón |
|--------|-------|-------------|-------|-------|
| (vacío — primera versión) | | | | |
```

---

## PROMPT PARA IA

```
ACTÚA COMO: Learning Guide Author & Instructional Translator. Tu tarea: generar el GFPI-F-135 V02 — la Guía de Aprendizaje del Aprendiz — transformando el Playbook del Instructor (PM-3.2) al lenguaje directo del estudiante.

Tu trabajo es REESCRIBIR, NO ENSAMBLAR.

### DATOS DE ENTRADA:
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Nivel CEFR: [default A1.1-A1.2]
- Instructor: [nombre, cargo, centro SENA]
- Fecha: [fecha de generación]
- **Playbook Build-Out completo:** [PEGAR AQUÍ todas las sesiones de PM-3.2]
- **Fila GFPI-F-134 ensamblada:** [PEGAR AQUÍ la fila completa de PM-2.11]
- Scope & Sequence (PM-1.2): [PEGAR datos de nivel, vocabulario, universo narrativo]

### INSTRUCCIONES:

**PASO 1 — TRANSFORMACIÓN DE LENGUAJE:**
Lee cada sesión del Playbook Build-Out (PM-3.2) y reescribe las instrucciones del instructor como instrucciones DIRECTAS para el aprendiz:

Instructor (Playbook): *"Instructor explica que van a escuchar un audio. Pide que los aprendices escriban palabras clave mientras escuchan."*
Aprendiz (Guía): *"Listen to the phone call. Write down 5 key words you hear. You have 3 minutes."*

**PASO 2 — REDACCIÓN DE SECCIONES:**
1. **Sección 1:** Datos del programa y la guía
2. **Sección 2:** Presentación — qué aprendes, por qué, aplicación laboral
3. **Sección 3.1:** Actividades de Reflexión (S1) — reescrito en 2ª persona
4. **Sección 3.2:** Actividades de Contextualización (S1) — reescrito en 2ª persona
5. **Sección 3.3:** Actividades de Apropiación (S2-S5) — organizadas por sesión, reescritas en 2ª persona. **Menciona dónde genera evidencia.**
6. **Sección 3.4:** Actividades de Transferencia (S6-S8) — la Final Mission reescrita en 2ª persona
7. **Sección 4:** Evidencias — las 6 evidencias de F-134 descritas para el aprendiz (qué es, cuándo se genera, cómo se evalúa)
8. **Sección 5:** Glosario — 20 términos clave con definición simple + ejemplo
9. **Sección 6:** Referencias Bibliográficas — recursos sugeridos
10. **Sección 7:** Control del Documento
11. **Sección 8:** Control de Cambios (vacío)

**PASO 3 — ETIQUETAR DIMENSIONES:**
Por cada actividad, añadir la etiqueta de dimensión antes de la instrucción:
- `[COGNITIVA]` si apropia conceptos, clasifica, analiza o comprende
- `[PROCEDIMENTAL]` si ejecuta, construye, completa o produce algo tangible
- `[ACTITUDINAL]` si reflexiona, valora o argumenta sobre comportamiento/responsabilidad
- Una actividad puede llevar 1, 2 o 3 etiquetas. No inventar dimensiones — solo etiquetar lo que genuinamente hace la actividad.

**PASO 4 — AGREGAR BLOQUE DE ENTREGABLE (solo donde hay evidencia formal):**
Cuando una actividad o secuencia de actividades genera una evidencia E1–E6 o Final Mission, cerrar con:
```
📋 EVIDENCIA [n] — [Nombre]
• Producto a entregar: [artefacto]
• Formato: [PDF / Audio / Video / Físico-observable]
• Extensión o criterio mínimo: [páginas / duración / ítems]
• Entrega: [LMS / instructor / en clase]
```
NO agregar bloque en actividades de práctica, drills o reflexión sin evidencia formal.

**PASO 5 — APLICAR ECONOMÍA Y AUTOSUFICIENCIA:**
- Estructura: Verbo + Objeto + Condición
- Nivel CEFR: vocabulario y sintaxis accesible
- Cero teoría — solo operativo
- **CRÍTICO: Embeber todos los materiales.** El aprendiz NO va a otro documento. Incluir completos: textos de lectura, worksheets, scripts de audio, role cards, tablas, ejercicios, rúbricas de autoevaluación.

**PASO 6 — VERIFICACIÓN FINAL:**
- ¿Cada actividad tiene instrucción clara en 2ª persona?
- ¿Cada actividad tiene etiqueta de dimensión [COGNITIVA/PROCEDIMENTAL/ACTITUDINAL]?
- ¿Las evidencias formales tienen bloque de entregable (Producto/Formato/Criterio)?
- ¿Todos los materiales están embebidos (sin referencias a documentos externos)?
- ¿Las evidencias se mencionan donde se generan?
- ¿El glosario cubre todos los términos?
- ¿El nivel CEFR es consistente?

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil).
- Nivel CEFR estricto A1.1-A1.2
- Lenguaje: 2ª persona singular/plural según contexto ("You will...", "You are going to...")
- Bilingüe: instrucciones en inglés, traducción en español solo para palabras clave si nivel ≤ A1.1
- Mantener formato markdown consistente
- NO generéis explicaciones teóricas — solo instrucciones operativas
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-3.2 | Playbook Build-Out — fuente principal (lenguaje a transformar) |
| **Recibe input de** | PM-2.11 | Fila GFPI-F-134 ensamblada — evidencias y actividades |
| **Recibe input de** | PM-1.2 | Scope & Sequence, nivel CEFR, vocabulario, universo narrativo |
| **Recibe input de** | PM-4.1 + PM-4.2 | Especificaciones de evidencias (sección 4) |
| **Referencia** | GFPI-F-135 Data Contract | Formato de secciones y estructura oficial |
| **Alimenta** | SIGA / Documento institucional | Documento final listo para entrega al aprendiz |
| **Se ubica en** | Flujo operativo SENA | Fase 4 — Primer entregable derivado del Playbook |

---

*PM-3.6: GFPI-F-135 Integrator — v2.7*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*

---

## CHANGELOG MASTER PROMPT

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v2.0 | 2026-04-13 | Nueva naturaleza · Playbook → Guía Aprendiz transformación |
| v2.6 | 2026-04-20 | activity_footer + apendices_embebidos + apendices_referenciados (REGLAS 10-12) |
| v2.6.1 | 2026-04-20 | activity_footer DERIVADO (no autoreado) · derive_activity_footer_from_playbook.js |
| v2.6.3 | 2026-04-20 | Activity Card v2.6.3 · 12 campos + 10 tipos scaffold + REGLAS 13-17 |
| v2.6.4 | 2026-04-21 | Sección 4 formato SENA (6 cols × N filas) · CHECK 17 upstream-downstream (REGLAS 18-19) |
| v2.6.5 | 2026-04-21 | Shared Renderer Pattern · render_seccion4_evidencias.js fuente única (REGLA 20) |
| **v2.6.6** | **2026-04-21** | **Paleta SENA institucional (verde #39A900 + azul oscuro #0B2E45) · REGLA 21** |
| **v2.7** | **2026-04-30** | **Learner-Readable Activity · Anatomía 6-bloque · 17 campos schema v2.7 · 5 obsoletos PROHIBIDOS · supresión pipeline metadata · REGLAS 22-27 · v2.6.3 deprecated** |
*Instructor Sergio Cortés Perdomo · Marzo 2026 · v2.6 promovido 2026-04-20 (MGV)*
