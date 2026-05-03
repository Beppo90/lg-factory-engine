# PM-3.6: GFPI-F-135 INTEGRATOR · LEARNING GUIDE GENERATOR

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.6 |
| **Nombre** | GFPI-F-135 Learning Guide Generator · Heredero formato canon Sergio narrativo |
| **Versión** | 3.5 |
| **Last Verified** | 2026-05-02 |
| **Ubicación** | Fase 4 · post Playbook (PM-3.2 ×N sesiones) · post PM-2.11 v3.2 |
| **Output** | **1 docx único** GFPI-F-135 (Guía de Aprendizaje del Aprendiz · brújula del estudiante · narrativa pedagógica) · 3 secciones canónicas SENA (1 Identificación + 2 Presentación bilingüe + 3 Formulación Actividades con numeración jerárquica 3.1 reflexión / 3.2 contextualización / 3.3 apropiación con sub-headers RAP / 3.4 transferencia del conocimiento) · numeración POR RAP reset en 3.3 · omisión Evidencias/Instrumentos en 3.1+3.2 · footer "GFPI-F-135 V04" · logo SENA central · tono SENA estandarizado |
| **Rol en el sistema** | Materializa el contenido pedagógico canon (matriz v1.3 + 30 Activity Cards v3.0) en formato narrativo orientado al aprendiz · "traduce todo el trabajo técnico de la planeación pedagógica en una ruta clara, paso a paso, para el aprendiz" (Sergio canon) |
| **Phase** | 4 |
| **Depends On** | [PM-2.11 v3.2 (gfpi_f134_v04_rows[]), 30 Activity Cards v3.0 (PM-2.1...PM-3.5+PM-4.2), PM-1.2 v4.2 (sub_bloques_tripartitos), PM-0.0 (matriz alineada · enunciados RAPs SOFÍA)] |
| **Trigger** | post_playbook_confirmation (Gate 3) · OR direct cascade post PM-2.11 v3.2 si Phase 3 Playbook diferido |
| **Formato canon** | v3.0 narrativo Sergio (3 ejemplos verbatim) — REEMPLAZA "Activity Card anatomy 6-bloque" v2.7 |
| **Status v3.0** | ⚠️ BREAKING CHANGE · v2.7 anatomy 6-bloque DEPRECATED · v3.0 formato canon Sergio narrativo OBLIGATORIO · cross-program forever |

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
| **v3.0** | **2026-05-02** | **⚠️ BREAKING · Formato canon Sergio narrativo (REEMPLAZA anatomy 6-bloque v2.7) · Sección 3 estructura 3 bloques (Reflexión+Contextualización + Apropiación×N RAPs + Transferencia) · 1 docx único · heredancia 1:1 30 Activity Cards v3.0 · REGLAS 28-35** |
| **v3.1** | **2026-05-02** | **Sección 1 IDENTIFICACIÓN canon (logo SENA central + 8 campos heredados) + Sección 2 PRESENTACIÓN bilingüe (texto canon SENA personalizado por programa · ESP+EN paralelos · footer GFPI-F-135 V04) + bilingüismo escalonado por sección + tono minimalista accesible al aprendiz · REGLAS 36-39** |
| **v3.2** | **2026-05-02** | **Sección 3 numeración jerárquica SENA (3.1 reflexión inicial · 3.2 contextualización + identificación conocimientos · 3.3 apropiación con headers RAP · 3.4 transferencia del conocimiento) + numeración POR RAP reset (1, 2, 3... cada RAP) + omisión Evidencias/Instrumentos en 3.1+3.2 + preguntas embebidas en Descripción + tono SENA estandarizado verbos canon · REGLAS 40-48** |
| **v3.3** | **2026-05-02** | **Sección 4 PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN EN EL PROCESO FORMATIVO · tabla 6 columnas canon SENA · solo actividades 3.3 Apropiación (NO 3.1 · NO 3.2 · NO 3.4) · headers RAP separadores · numeración instrumentos ACUMULADA cross-RAP · criterios múltiples por actividad · criterios independientes de evidencia · heredancia desde AC.criterios_evaluacion[] · REGLAS 49-56 · cascade requiere AC v3.1 + PM-2.11 v3.3** |
| **v3.4** | **2026-05-02** | **Check NEW dimension_consistency_seccion_3_vs_4 + REGLA 57 evidencias formales target 2-3 por RAP (NO todas las 30 cards · selectivo · criterios_evaluacion[] sigue obligatorio independiente) + REGLA 58 Sección 5 GLOSARIO bilingüe extenso (4 fields por entrada: EN word/phrase/chunk + EN definition + EN ejemplo contextualizado + ES translation · sin límite arbitrario · vocabulario técnico programa) · REGLAS 57-58** |
| **v3.5** | **2026-05-03** | **APRENDIZ-FACING SHIFT canon (paradigm fix) · REGLA 60 hereda descripcion_aprendiz (NO descripcion legacy) · REGLA 61 recursos_aprendiz canon después de Descripción · REGLA 62 3 secciones materiales separadas (Recursos preparados + Materiales formación + Material apoyo) · REGLA 63 Bilingüismo Opción D escalada CEFR-aware (3.1+3.2 ESP · 3.3+3.4 EN protagonista regular + ES cursiva pequeña scaffold gris #707070) · REGLA 64 Footer info actividad cursiva 9pt color gris discreta (Ambiente · Estrategias · Técnica · Materiales formación · Material apoyo · Evidencias · Instrumentos · Duración) · REGLA 65 Sec 2 Presentación estilo PRÓLOGO cinematográfico (4 párrafos: escena+protagonista+viaje+SENA) · REGLA 66 Logo SENA real centrado en encabezado (PNG real · NO placeholder)** |
*Instructor Sergio Cortés Perdomo · Marzo 2026 · v2.6 promovido 2026-04-20 (MGV) · v3.0 paradigm shift narrativo Sergio 2026-05-02 · v3.1 Secciones 1+2 + bilingüismo Sergio 2026-05-02 PM · v3.2 Sección 3 jerárquica SENA Sergio 2026-05-02 PM (iteración con guía modelo Reach Stacker)*

---

## EXTENSIÓN v3.0 — FORMATO CANON SERGIO NARRATIVO + ESTRUCTURA 3 BLOQUES SECCIÓN 3 (2026-05-02 PM)

### Decisión canónica Sergio (verbatim)

> "La Guía de Aprendizaje es un recurso didáctico escrito que funciona como la brújula del estudiante, facilitando un aprendizaje activo y centrado en él. En el proceso de Gestión de Formación Profesional Integral, sirve para articular la enseñanza, el aprendizaje y la evaluación. A través de ella se orienta el desarrollo de las competencias del programa en sus tres dimensiones: cognitiva (saber), procedimental (hacer) y valorativo-actitudinal (ser).
>
> Es fundamental diseñarla y usarla porque traduce todo el trabajo técnico de la planeación pedagógica en una ruta clara, paso a paso, para el aprendiz. Además, permite estandarizar la calidad de la formación en la institución y asegura que el aprendizaje siga un ciclo didáctico lógico (reflexión, contextualización, apropiación y transferencia) enfocado en resolver problemas reales."
>
> — Sergio · 2026-05-02 PM

### REGLA 28 — Output: 1 docx único

PM-3.6 v3.0 emite **un único docx** GFPI-F-135 (no múltiples). Toda la guía del aprendiz vive en ese documento, cubriendo todos los RAPs del programa con su ciclo didáctico completo.

### REGLA 29 — Estructura canónica Sección 3 (Actividades de Aprendizaje) · 3 bloques

```
SECCIÓN 3 — ACTIVIDADES DE APRENDIZAJE
│
├─ BLOQUE 1: REFLEXIÓN INICIAL + CONTEXTUALIZACIÓN
│      (heredado de pm-1-2.sub_bloques_tripartitos[B0 APERTURA])
│      Actividades formato canon · NO header de RAP
│      Típicamente 2 actividades reflexión + 2 actividades contextualización
│
├─ BLOQUE 2: APROPIACIÓN (dividido entre los N RAPs)
│      (heredado de pm-1-2.sub_bloques_tripartitos[B1..BN APROPIACION])
│      ├─ ▶ RAP 1: <enunciado completo SOFÍA>
│      │      → todas las actividades del bloque B1 en formato canon
│      ├─ ▶ RAP 2: <enunciado completo SOFÍA>
│      │      → todas las actividades del bloque B2 en formato canon
│      ├─ ... ▶ RAP N
│
└─ BLOQUE 3: TRANSFERENCIA / MISIÓN FINAL
       (heredado de pm-1-2.sub_bloques_tripartitos[BT TRANSFERENCIA])
       Actividades capstone formato canon
       Típicamente 5 actividades misión integradora
```

**Orden estricto:** RAP enunciado **PRIMERO** (visible al aprendiz como ancla pedagógica) · luego SUS actividades de apropiación abajo. NO actividades primero · NO RAPs implícitos.

### REGLA 30 — Formato canon de cada actividad (verbatim ejemplos Sergio)

Cada actividad se redacta así (heredado 1:1 de Activity Card v3.0):

```
<numero>. Actividad <dimension>: <enunciado verbo+objeto+condición>

Descripción de la actividad: <narrativa pedagógica multi-párrafo · qué orienta
el instructor · qué hacen los aprendices · paso a paso · links · entregable
final · socialización>

Ambiente requerido: <Convencional | Pluritecnológico | Simulado | combinaciones>

Estrategias didácticas activas: <estrategia>

Técnica didáctica: <técnica>

Materiales de formación: <papel, lapiceros, computadores, equipos...>

Material de apoyo: <PDFs, links, manuales, decretos...>

Evidencias de aprendizaje:
   Evidencia de <tipo>: <nombre>
   Técnica de evaluación: <técnica>
   Instrumento de evaluación No <N>: <tipo instrumento>
   [O si NO aplica:]
   No aplica
   Instrumentos de evaluación: No aplica

Duración de la actividad: <N> horas.
```

### REGLA 31 — Mapping AC v3.0 → render PM-3.6 narrativo (heredancia 1:1 · CERO INVENCIÓN)

| Campo Activity Card v3.0 | Render PM-3.6 v3.0 |
|---|---|
| `numero_actividad` + `dimension` (lowercase) + `enunciado` | Header: `<N>. Actividad <dim>: <enun>` |
| `descripcion` (200-600 palabras canon AC v3.0) | "Descripción de la actividad:" párrafo(s) directo(s) |
| `ambiente` | "Ambiente requerido:" |
| `estrategias_didacticas_activas[]` | "Estrategias didácticas activas:" (joined ' + ' si múltiples) |
| `tecnicas_didacticas[]` | "Técnica didáctica:" (joined ' + ' si múltiples) |
| `materiales[]` | "Materiales de formación:" (joined ', ') |
| `material_apoyo[]` (con descripcion + link cuando aplique) | "Material de apoyo:" (cada item: descripcion · "Link: <url>" si existe) |
| `evidencias.{tipo, nombre, tecnica_evaluacion, instrumento_numero, instrumento_tipo}` | "Evidencias de aprendizaje:" 3-4 líneas estructuradas (o "No aplica" + "Instrumentos de evaluación: No aplica") |
| `duracion_horas` | "Duración de la actividad: <N> horas." |

### REGLA 32 — Headers RAP enunciado (entre actividades de apropiación)

Antes de listar las actividades de cada bloque APROPIACIÓN, se renderiza header con:

```
▶ RAP <N>: <enunciado completo SOFÍA del RAP>
```

Fuente del enunciado: `pm-0-0-matriz-alineada.json.raps[N].enunciado_rap` (matriz canon v1.3+).

NO se omite · NO se abrevia · debe ir el enunciado completo SOFÍA tal cual está en la matriz.

### REGLA 33 — Tono "brújula del aprendiz"

- Redacción en 2ª persona singular ("usted") O impersonal ("el aprendiz") según convención SENA del programa.
- Nivel CEFR adecuado al programa (heredado de pm-1-2.cefr_subnivel del bloque).
- Tono motivador y claro · ruta paso a paso.
- "Descripción de la actividad" cuenta lo que el aprendiz hará y lo que el instructor orientará — NO es metadata, es relato pedagógico.

### REGLA 34 — Cero invención · heredancia upstream estricta

NO se inventa contenido nuevo en PM-3.6 v3.0. Toda la "Descripción de la actividad" viene literal del campo `descripcion` de la Activity Card v3.0 (que ya fue diseñada con narrativa pedagógica 200-600 palabras según canon Sergio AC v3.0).

Si una activity card carece de `descripcion` rica → **STOP** · regresar a Activity Card upstream y enriquecer · NO improvisar en PM-3.6.

### REGLA 35 — v2.7 anatomy 6-bloque DEPRECATED

El esquema "Activity Card anatomy 6-bloque · 17 campos schema v2.7 · 10 tipos scaffold_inline · 5 obsoletos prohibidos" de v2.7 queda **DEPRECATED** desde 2026-05-02. Razones:

1. v2.7 era schema interno fragmentado · v3.0 honra formato verbatim ejemplos Sergio
2. v2.7 mezclaba metadata pipeline con contenido aprendiz · v3.0 separa
3. v2.7 no agrupaba por RAP · v3.0 agrupa por estructura tripartita upstream

Outputs históricos GFPI-F-135 v2.7 en runs (IMARPOR-CC v1) preservados para historial. NO regenerar.

### Ejemplo de salida (verbatim ejemplos Sergio · 3 actividades de Reach Stacker · guía modelo)

#### Ejemplo 1 (cognitiva · con evidencia · ámbito convencional)

```
3. Actividad cognitiva: Reconocer códigos de comunicación portuaria de
acuerdo con normativa.

Descripción de la actividad: Identificar códigos según normatividad
portuaria, referente a señales de comunicación y señalización necesarias
para la operación. Para el desarrollo de la actividad, el instructor
orientará a los aprendices sobre concepto, tipos y características del
código de comunicación portuaria y del sistema baroti, así como del
sistema operativo de terminal. Posteriormente se conformarán equipos de
3 aprendices, quienes darán lectura a los siguientes documentos: Código
internacional de señales, el cual se encuentra disponible en el
siguiente link y en material de apoyo. 2. ¿Cómo identificar la posición
del contenedor a bordo?, el cual se encuentra disponible en el
siguiente link: https://es.scribd.com/presentation/478805289/BAROTI
Seguidamente, los aprendices, a partir del material referenciado,
realizarán simulaciones de pedidos de auxilio, operación terminada u
otras similares, para lo cual deberán utilizar los códigos de señales
establecidas, y según lo indique el instructor. La actividad finaliza
con la entrega de un documento que resuma las señales más utilizadas en
el ámbito portuario, y con la socialización de los aprendizajes
alcanzados en desarrollo de la actividad.

Ambiente requerido: Ambiente convencional.

Estrategias didácticas activas: Aprendizaje colaborativo

Técnica didáctica: simulación

Materiales de formación: papel bond, lapiceros, marcadores, computadores

Material de apoyo: Documento en PDF sobre Código internacional de señales.
Link: https://es.scribd.com/presentation/478805289/BAROTI

Evidencias de aprendizaje:
   Evidencia de producto: Códigos de comunicación portuaria
   Técnica de evaluación: Verificación de producto.
   Instrumentos de evaluación No 2: Lista de verificación.

Duración de la actividad: 4 horas.
```

#### Ejemplo 2 (cognitiva · sin evidencia formal)

```
1. Actividad cognitiva: Diferenciar los riesgos y peligros de acuerdo con
normativa de Seguridad y Salud en el Trabajo.

Descripción de la actividad: Los aprendices se dividirán en grupos de 3
aprendices y se les proporcionará material sobre los conceptos de riesgo
y peligro, así como la normativa SST vigente (Decreto 1443 de 2014, Por
el cual se dictan disposiciones para la implementación del Sistema de
Gestión de la Seguridad y Salud en el Trabajo (SG-SST)), al cual puede
acceder desde el material de apoyo. A través de una investigación guiada
por el instructor, cada grupo consultará sobre los tipos de riesgo
químico, auditivo, ergonómico y físico; posteriormente identificarán de
los tipos riesgos y peligros en la operación del equipo apilador de
contenedores, diferenciando ambos términos y facilitando el intercambio
de ideas y experiencias, a través de la socialización de sus
conclusiones y las mejores prácticas para la gestión de riesgos en el
trabajo.

Ambiente requerido: Ambiente convencional.

Estrategias didácticas activas: Trabajo colaborativo

Técnica didáctica: Investigación guiada

Materiales de formación: Elementos de oficina, computadores

Material de apoyo: Manual de Operación equipo srsc4531g – Reach Stacker,
Decreto 1443 de 2014.

Evidencias de aprendizaje: No aplica
Instrumentos de evaluación: No aplica

Duración de la actividad: 4 horas.
```

#### Ejemplo 3 (procedimental · con evidencia · ámbito mixto)

```
5. Actividad procedimental: Inspeccionar área de operación del equipo
apilador según procedimiento de la organización.

Descripción de la actividad: Para el desarrollo de esta actividad, el
instructor orientará sobre el procedimiento que se debe realizar para
hacer alistamiento de área de operación, para lo cual abordará lo
relacionado a concepto, características, plan de operaciones de ruta de
traslado y técnicas de inspección de obstáculos; posteriormente, y una
vez apropiados los conceptos, se realizará actividad práctica la cual
consiste en: se conformarán equipos de 3 aprendices. Cada equipo deberá
formular un plan para la inspección del área de operación, ya sea en una
terminal portuaria, o en otro sector productivo donde opere el equipo
apilador de contenedores. Los aprendices, con la orientación del
instructor, propondrán un plan de trabajo que incluya las
características requeridas por la organización para la operación del
equipo apilador de contenedores, a través de una lista de chequeo. Se
propone la creación de un plan de disposición del área de operación.
Una vez elaborado el plan, se realizará práctica de campo en ambiente
pluritecnológico, o terminal portuaria, y cada equipo deberá delimitar,
organizar y preparar el área donde se realizará la operación de
apilado. Esto incluye la delimitación de espacios, señalización,
limpieza e iluminación del área, así como ubicación de objetos o
elementos que obstaculicen la operación en las rutas de traslado, a fin
de crear un entorno seguro y eficiente para la operación del equipo. La
actividad finaliza con la aplicación de evidencia de desempeño y
socialización de los aprendizajes logrados en desarrollo del proceso.

Ambiente requerido: Ambiente pluritecnológico o simulado que cuente con
equipo o simulador de apilado de contenedores y contenedores de 20 y 40
pies. Ambiente convencional.

Estrategias didácticas activas: Aprendizaje basado en proyectos

Técnica didáctica: Práctica de campo

Materiales de formación: Elementos de oficina, computadores, equipo
apilador de contenedores y contenedores.

Material de apoyo: Manual de Operación equipo srsc4531g – Reach Stacker

Evidencias de aprendizaje:
   Desempeño: Delimitar áreas de operación y rutas de traslado
   Técnica de evaluación: Observación.
   Instrumentos de evaluación No 3: Lista de Chequeo

Duración de la actividad: 10 horas.
```

### Validation checks v3.0 (NEW · BLOQUEANTES)

- **Check v3.0-A · estructura_seccion_3_3_bloques** · Sección 3 contiene exactamente 3 bloques en este orden: REFLEXIÓN+CONTEXTUALIZACIÓN, APROPIACIÓN, TRANSFERENCIA
- **Check v3.0-B · header_rap_visible_por_bloque_apropiacion** · cada sub-bloque APROPIACIÓN tiene header `▶ RAP <N>: <enunciado>` ANTES de sus actividades · enunciado heredado de matriz v1.3 sin abreviar
- **Check v3.0-C · formato_canon_sergio_actividad** · cada actividad rendereada cumple plantilla 9 campos (header + descripcion + ambiente + estrategias + técnica + materiales + material_apoyo + evidencias + duración)
- **Check v3.0-D · cero_invencion_descripcion** · cada `Descripción de la actividad` proviene literal del campo `descripcion` de la Activity Card upstream · NO improvisada
- **Check v3.0-E · 1_docx_unico** · output es 1 archivo `pm-3-6.docx` (no múltiples archivos por sub-RAP)

### Anti-patrones v3.0 evitados

- ❌ Activity Card anatomy 6-bloque (v2.7 schema fragmentado)
- ❌ Múltiples docx (1 por sub-RAP)
- ❌ Actividades antes de RAP header
- ❌ RAP header abreviado (debe ser enunciado SOFÍA completo de matriz v1.3)
- ❌ Inventar `Descripción de la actividad` (debe heredarse literal de AC.descripcion)
- ❌ Bullets en lugar de plantilla canónica 9 campos

### Cross-PM consistency

PM-3.6 v3.0 honra el mismo formato canon Sergio que PM-2.11 v3.2 (C7+C10+C11), pero en **vista narrativa orientada al aprendiz** (PM-3.6) vs **vista tabular orientada al instructor** (PM-2.11). Misma fuente upstream (30 Activity Cards v3.0) · diferente render según destinatario.

---

*PM-3.6 v3.0 · GFPI-F-135 Learning Guide Generator · formato canon Sergio narrativo · 1 docx único · brújula del aprendiz · cross-program forever*
*Sergio Cortés decisión 2026-05-02 PM · 3 ejemplos verbatim canon establecidos · cascade IMARPOR-V2 Phase 4 · cierre Step 1.6*

---

## EXTENSIÓN v3.1 — SECCIONES 1 + 2 + BILINGÜISMO ESCALONADO + TONO MINIMALISTA (2026-05-02 PM)

### Decisión canónica Sergio (verbatim · 2026-05-02 PM)

> "Necesito profundizar en los detalles del pm-3-6 porque lo necesito muy simple, minimalista, muy accesible y accesible y fácil de entender para el aprendiz. La Guía es bilingüe desde la parte 2 (presentación) y 3 (actividades de aprendizaje)."

### Estructura completa del docx GFPI-F-135 v3.1

```
ENCABEZADO (logo SENA central + título institucional)
"PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL
GUÍA DE APRENDIZAJE"

SECCIÓN 1 — IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
   (solo español · datos estructurales heredados del cascade)

SECCIÓN 2 — PRESENTACIÓN
   (bilingüe ESP + EN paralelos · texto canon SENA personalizado por programa)

SECCIÓN 3 — ACTIVIDADES DE APRENDIZAJE
   (bilingüe escalonado por bloque · ver REGLA 38)
   ├─ Bloque 1: Reflexión Inicial + Contextualización (B0)
   ├─ Bloque 2: Apropiación (▶ RAP 1 · ▶ RAP 2 · ▶ RAP N)
   └─ Bloque 3: Transferencia / Misión Final (BT)

FOOTER (todas las páginas): "GFPI-F-135 V04"
```

### REGLA 36 — SECCIÓN 1 IDENTIFICACIÓN (canon SENA · solo español · logo central)

**Logo SENA central** en encabezado de Sección 1 (institucional · NO opcional).

**Plantilla obligatoria** (8 campos heredados del cascade · SOLO ESPAÑOL):

```
1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE

- Denominación del Programa de Formación: <heredado de pm-0-context.programa_metadata.denominacion>
- Código del Programa de Formación: <heredado de pm-0-context.programa_metadata.codigo>
- Nombre del Proyecto Formativo (si aplica): <pm-1-1 o "No aplica">
- Fase del Proyecto (si aplica): <pm-1-1 o "No aplica">
- Actividad de Proyecto Formativo (si aplica): <pm-1-1 o "No aplica">
- Competencia: <heredado de pm-2-11.gfpi_f134_v04_rows[0].C1_competencia · texto literal SOFÍA>
- Resultados de Aprendizaje:
  - RAP 1: <enunciado SOFÍA matriz v1.3 raps[0].enunciado_rap>
  - RAP 2: <enunciado SOFÍA matriz v1.3 raps[1].enunciado_rap>
  - ... (uno por RAP del programa · típicamente 4 en programas tripartitos)
- Duración de la Guía de Aprendizaje: <heredado de pm-1-1.duracion_total_horas> horas
```

**Reglas Sección 1:**
- Solo español (datos estructurales SOFÍA · NO requieren traducción)
- "No aplica" cuando el campo no aplique al tipo de programa (Curso Especial / Curso Complementario)
- Enunciados RAP completos (NO abreviados) · texto literal SOFÍA
- Logo SENA central en parte superior

### REGLA 37 — SECCIÓN 2 PRESENTACIÓN (bilingüe · personalizada por programa)

**Estructura canon · ESP + EN paralelos:**

```
2. PRESENTACIÓN

[ESP]
Estimado Aprendiz, bienvenido a esta formación SENA en <nombre programa>,
que busca incentivar su interés por nuevos conocimientos y para alcanzar
o mejorar tanto sus habilidades y destrezas demostradas como aquellas
que pueden ser adquiridas.

En desarrollo de la formación se presentan dos momentos en las
actividades de aprendizaje: el trabajo directo y el trabajo independiente
considerado como autoaprendizaje, desde el cual se ofrece material
organizado, para que de la misma manera, sus actividades de aprendizaje
y sus evidencias entregadas, sean sistemáticas, ordenadas y metódicas.
Se sugiere para que organice su tiempo de manera que pueda revisar,
explorar y apropiar tanto los accesos al material de apoyo, como los
documentos descritos en la bibliografía. Por este motivo, se invita
para que realice un aprendizaje colaborativo y al final pueda
evidenciarse el crecimiento integral del grupo.

Para lograr un aprendizaje significativo, puede acceder a la bibliografía
referenciada para su consulta o profundización de los temas y se le
sugiere el uso de acceso al integrador de recursos de información del
SENA, dentro del portal del Sistema de Bibliotecas SENA
https://biblioteca.sena.edu.co.

Bienvenidos.

[EN — Adaptado al sector específico del programa]
Dear Learner, welcome to this SENA training program in <programa adaptado al sector>,
which aims to spark your interest in new knowledge and help you reach or
improve both your demonstrated skills and abilities and those you can
still acquire.

[Traducción adaptada al sector mantiene la intención pedagógica del SENA
y al mismo tiempo refleja el universo del programa específico — sector
marítimo/portuario, motor diesel, banana cold chain, etc.]

Welcome aboard.
```

**Reglas Sección 2:**
- **Personalizada por programa**: el nombre del programa + sector se inserta en ambos idiomas (NO texto genérico)
- **Traducción al inglés adaptada al sector específico** (NO literal palabra por palabra · debe reflejar el universo del programa: marítimo, portuario, agrícola, etc.)
- Bienvenida + estructura formación (trabajo directo + autónomo) + invitación biblioteca SENA
- Footer "GFPI-F-135 V04" visible en pie de página

### REGLA 38 — BILINGÜISMO ESCALONADO POR SECCIÓN

| Sección | Bilingüismo | Lengua principal | Notas |
|---|---|---|---|
| Sección 1 IDENTIFICACIÓN | NO | ESP | Datos estructurales SOFÍA · NO requieren traducción |
| Sección 2 PRESENTACIÓN | SÍ paralelo | ESP + EN | Texto canon SENA personalizado por programa · adaptado al sector |
| Sección 3 BLOQUE 1 (Reflexión + Contextualización) | SÍ | ESP principal · input EN | Activación afectiva · scaffolds en ESP · pueden incluir input en inglés (videos, conceptos disparadores) |
| Sección 3 BLOQUE 2 (Apropiación · 4 RAPs) | SÍ | EN principal · scaffolds ESP | El contenido de aprendizaje **se enseña en EN** (es el objeto de la formación) · scaffolds + instrucciones críticas en ESP cuando ayudan |
| Sección 3 BLOQUE 3 (Transferencia / Misión) | SÍ | EN producto · ESP reflexión | Resultado en EN (Mission integradora) con reflexión final del aprendiz en ESP |
| Footer / Encabezado | NO | ESP | Institucional SENA |

**Razón pedagógica:** programas de bilingüismo SENA enseñan inglés EN inglés (immersive · ESP solo cuando ayuda). La sección 1 es administrativa (no pedagógica). La sección 2 es bienvenida (alta visibilidad · merece traducción paralela completa). La sección 3 escala el inglés según el momento didáctico (input → producción → transferencia).

### REGLA 39 — TONO "MINIMALISTA ACCESIBLE" PARA EL APRENDIZ

**Sergio canon (2026-05-02 PM):** "muy simple, minimalista, muy accesible y accesible y fácil de entender para el aprendiz".

**Reglas operacionales:**

1. **2ª persona "usted"** (formal SENA · NO "tú" informal)
2. **NO jerga pedagógica innecesaria** — términos como "scaffold", "overlap", "anclaje matriz", "tripartito", "consciousness-raising" → traducir a lenguaje del aprendiz
3. **NO términos sistémicos** — no mencionar "PM-2.x", "Activity Card", "cascade", "schema", "validation_check", "metadata", "pm-1-2 sub_bloques_tripartitos" — todo eso es interno · invisible al aprendiz
4. **NO menciones a metadata pipeline** — el aprendiz NO necesita saber el codigo_canon Eévid (E1-E6) ni el numero de activity card cross-RA · solo lo que él hará
5. **Frases cortas + voz activa** — "Usted leerá el documento X" mejor que "El aprendiz procederá a la lectura del documento X"
6. **Estructura visual clara** — espacios en blanco · headers visibles · listas cuando hay pasos secuenciales · NO bloques densos de párrafo
7. **Vocabulario del programa** — usar términos del sector (marítimo, portuario, motor, etc.) · NO vocabulario técnico-pedagógico
8. **Eliminar redundancias** — si la actividad es "Identificar X según Y" no añadir "El propósito de esta actividad es identificar X..."

**Anti-patrones tono v3.1:**
- ❌ "Esta actividad es antecedente de la actividad N+1 mediante reciclaje circular de input"
- ❌ "Las estrategias didácticas activas se materializan en técnicas didácticas tipo simulación"
- ❌ "El criterio canon C04 se evidenciará vía instrumento No 4 escala estimación"
- ✅ "Usted participará en una simulación VHF con sus compañeros · al final entregará el guión escrito · su instructor evaluará con la lista de chequeo"

### Validation checks v3.1 (NEW · BLOQUEANTES)

- **Check v3.1-A · seccion_1_identificacion_completa** — 8 campos heredados presentes · "No aplica" cuando corresponda
- **Check v3.1-B · seccion_2_presentacion_bilingue** — texto ESP + EN ambos presentes · personalizado con nombre programa · sector reflejado en traducción
- **Check v3.1-C · footer_gfpi_f135_v04** — pie de página visible "GFPI-F-135 V04"
- **Check v3.1-D · logo_sena_central** — Sección 1 incluye logo institucional SENA central
- **Check v3.1-E · bilinguismo_escalonado** — bilingüismo aplicado según REGLA 38 (Sección 3 escala EN → producción → transferencia)
- **Check v3.1-F · tono_minimalista_aprendiz** — NO jerga pedagógica · NO términos sistémicos · 2ª persona "usted" · vocabulario del sector

### Anti-patrones v3.1 evitados

- ❌ Sección 1 con campos faltantes ("Proyecto Formativo: -" en lugar de "No aplica")
- ❌ Sección 2 solo en español (rompe naturaleza bilingüe del programa)
- ❌ Sección 2 con texto genérico (no menciona el nombre del programa)
- ❌ Traducción literal palabra-por-palabra (NO refleja sector)
- ❌ Sección 3 toda en español (rompe inmersión inglesa)
- ❌ Sección 3 toda en inglés sin scaffold (rompe accesibilidad A1.x)
- ❌ Footer ausente o versión incorrecta (debe ser GFPI-F-135 V04)
- ❌ Logo SENA ausente en Sección 1
- ❌ Tono académico-pedagógico que aleja al aprendiz

### Cross-cascade · datos requeridos para Secciones 1+2

| Campo Sección 1+2 | Fuente cascade | Status IMARPOR-V2 |
|---|---|---|
| Denominación Programa | pm-0-context.programa_metadata.denominacion | ✅ disponible |
| Código Programa | pm-0-context.programa_metadata.codigo (verificar campo) | ⚠️ verificar existencia campo |
| Proyecto Formativo / Fase / Actividad | pm-1-1.json (asimetría tipo programa) | ✅ "No aplica" si Curso Especial |
| Competencia | pm-2-11.gfpi_f134_v04_rows[0].C1_competencia | ✅ disponible |
| RAPs (4 enunciados) | matriz v1.3.raps[].enunciado_rap | ✅ disponible |
| Duración total | pm-1-1.duracion_total_horas | ✅ disponible |
| Nombre programa para Presentación | pm-0-context.programa_metadata.denominacion | ✅ |
| Sector para traducción adaptada | pm-0-context.programa_metadata.sector_economico | ✅ disponible |

---

*PM-3.6 v3.1 · Secciones 1+2 canon SENA + bilingüismo escalonado + tono minimalista accesible al aprendiz*
*Sergio Cortés decisión 2026-05-02 PM · 4 reglas NEW (36-39) + 6 validation checks bloqueantes · cross-program forever*

---

## EXTENSIÓN v3.2 — SECCIÓN 3 NUMERACIÓN JERÁRQUICA SENA + 9 REGLAS NEW (2026-05-02 PM)

### Decisión canónica Sergio (verbatim · iteración con guía modelo Reach Stacker)

> Sergio aporta guía SENA modelo "Operación de equipo apilador de contenedores" (Reach Stacker · Programa 8441...) · Sección 3 completa · canon GFPI-F-135 V04. Detalla numeración jerárquica · subsecciones canónicas · estructura RAP · omisiones · combinación ambientes · tono SENA estandarizado.

### Estructura completa Sección 3 v3.2 (canon SENA verbatim)

```
3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE

[Descripción de la(s) Actividad(es): párrafo introductorio canon SENA personalizado
con la competencia del programa]

3.1 Actividades de reflexión inicial
   [actividad(es) reflexivas · NO RAP header · NO Evidencias/Instrumentos]

3.2 Actividades de contextualización e identificación de conocimientos
necesarios para el aprendizaje
   [actividad(es) contextualizadoras · preguntas embebidas · NO Evidencias/Instrumentos]

3.3 Actividades de apropiación

   RAP 1: <enunciado SOFÍA completo>
      1. Actividad <dimensión>: <enunciado V+O+C>
         [campos canon completos · CON Evidencias/Instrumentos]
      2. Actividad <dimensión>: <enunciado V+O+C>
         [...]

   RAP 2: <enunciado SOFÍA completo>
      1. Actividad <dimensión>: <enunciado V+O+C>
         [reset numeración desde 1]
      2. ...

   RAP 3: <enunciado SOFÍA completo>
      1. ...

   RAP 4: <enunciado SOFÍA completo>
      1. ...

3.4 Actividades de Transferencia del Conocimiento
   [actividad(es) capstone · CON Evidencias/Instrumentos · si N>1 numerar 1, 2, 3...]
```

### REGLA 40 — Numeración jerárquica SENA (REEMPLAZA "Bloque 1/2/3" v3.0)

Sección 3 usa numeración jerárquica SENA · NO "Bloques":

| Subsección canon | Mapping cascade | Mapping Activity Card |
|---|---|---|
| **3.1 Actividades de reflexión inicial** | B0 APERTURA | cards con `_source_pm: pm-2-1.json` (Spark · reflexión) |
| **3.2 Actividades de contextualización e identificación de conocimientos necesarios para el aprendizaje** | B0 APERTURA | cards con `_source_pm: pm-2-2.json` (Gap Analysis · contextualización) |
| **3.3 Actividades de apropiación** | B1+B2+B3+B4 APROPIACIÓN | cards con bloque_id_referencia ∈ {B1,B2,B3,B4} · agrupadas por RAP |
| **3.4 Actividades de Transferencia del Conocimiento** | BT TRANSFERENCIA | cards con `_source_pm: pm-3-5.json` (Final Mission ABP) |

### REGLA 41 — Header Sección 3 con párrafo introductorio canon SENA

Antes de las subsecciones · texto canon personalizado con la competencia:

```
3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE

Descripción de la(s) Actividad(es): Las actividades de aprendizaje son
las acciones planeadas y estructuradas, de tal forma que los aprendices
pueden lograr la apropiación de conocimientos, el desarrollo de sus
habilidades y destrezas y alcanzar la competencia en <competencia heredada
de pm-2-11.gfpi_f134_v04_rows[0].C1_competencia · texto literal SOFÍA>.
Las actividades que se proponen en esta guía de aprendizaje, están
distribuidas entre actividades a desarrollar antes de aprender, mientras
se aprende y después de aprender.
```

### REGLA 42 — Nombres exactos canon SENA de subsecciones

Texto literal obligatorio (NO abreviar · NO traducir · NO modificar):

- `3.1 Actividades de reflexión inicial`
- `3.2 Actividades de contextualización e identificación de conocimientos necesarios para el aprendizaje`
- `3.3 Actividades de apropiación`
- `3.4 Actividades de Transferencia del Conocimiento`

### REGLA 43 — Header RAP simple (texto plano · canon SENA)

Dentro de 3.3 · antes de las actividades de cada bloque APROPIACIÓN:

```
RAP <N>: <enunciado SOFÍA completo>
```

NO usar arrow Unicode (▶ · → · ►) · NO bullets · NO emojis · texto plano canon SENA. Enunciado heredado literal de matriz v1.3 (`pm-0-0-matriz-alineada.json.raps[N].enunciado_rap`).

### REGLA 44 — Numeración POR RAP reset en 3.3 (NO acumulada cross-RAP)

Las actividades dentro de cada RAP empiezan en **1, 2, 3, ...** (reseteo desde 1 al pasar al siguiente RAP).

Ejemplo IMARPOR-V2:
```
RAP 1: <enunciado RA1>
  1. Actividad cognitiva: ...
  2. Actividad cognitiva: ...
  3. Actividad cognitiva: ...
  4. Actividad procedimental: ...
  5. Actividad cognitiva: ...
  6. Actividad cognitiva: ...

RAP 2: <enunciado RA2>
  1. Actividad cognitiva: ...     ← reset desde 1
  2. Actividad cognitiva: ...
  ...
```

**Implementación render PM-3.6:** ignorar `numero_actividad` acumulado de cards (1-30) · regenerar índice POR bloque APROPIACIÓN.

### REGLA 45 — Omisión absoluta de Evidencias/Instrumentos en 3.1 y 3.2

En 3.1 reflexión inicial y 3.2 contextualización, las líneas "Evidencias de aprendizaje" y "Instrumentos de evaluación" **NO aparecen en absoluto** (líneas eliminadas · NO "No aplica" visible).

| Sección | Líneas Evidencias/Instrumentos |
|---|---|
| 3.1 reflexión inicial | OMITIDAS (no aparecen) |
| 3.2 contextualización | OMITIDAS (no aparecen) |
| 3.3 apropiación · cada actividad | SIEMPRE aparecen (con datos o "No aplica") |
| 3.4 transferencia · cada actividad | SIEMPRE aparecen (con datos o "No aplica") |

**Razón canon:** 3.1 y 3.2 son fase de activación · por diseño NO producen evidencia formal. Mostrar líneas con "No aplica" sería ruido visual innecesario para el aprendiz.

### REGLA 46 — Preguntas embebidas en Descripción de 3.1 y 3.2

Las preguntas reflexivas (3.1) y de identificación (3.2) son **parte de la "Descripción de la actividad"** · NO campos separados. Formato canon:

**3.1 ejemplo:**
```
Descripción de la actividad: Teniendo en cuenta que el programa a desarrollar
es <programa>, ... se solicita que de manera individual, se reflexione sobre
lo siguiente:

¿<pregunta reflexiva 1>?
¿<pregunta reflexiva 2>?
...

Una vez realizada la reflexión, se deberá consolidar la información y en
mesa redonda, socializar las conclusiones con los demás compañeros.
```

**3.2 ejemplo:**
```
Descripción de la actividad: Para el desarrollo de esta actividad, cada
aprendiz, teniendo en cuenta sus conocimientos previos, dará respuesta
a las siguientes preguntas:

¿Sabe usted <pregunta 1>?
¿Conoce usted <pregunta 2>?
...

Posteriormente, ... [siguientes pasos · materiales · socialización]
```

### REGLA 47 — Combinación de Ambientes (cuando aplica)

Cuando una actividad requiere múltiples ambientes (principal + convencional para teoría), formato canon en una sola línea:

```
Ambiente requerido: Ambiente pluritecnológico o simulado que cuente con
<equipos específicos del programa>. Ambiente convencional.
```

NO crear bullets · NO líneas separadas · combinación textual literal.

### REGLA 48 — Tono SENA estandarizado · verbos canon institucionales

Verbos y frases canon SENA (heredados de guía modelo Reach Stacker):

| Categoría | Verbos canon |
|---|---|
| Solicitud al aprendiz | "se solicita" · "se invita" · "se sugiere" |
| Acciones del instructor | "el instructor orientará" · "el instructor proporcionará" · "el instructor explicará" · "iniciará con una exposición" |
| Acciones de los aprendices | "los aprendices darán lectura" · "deberán entregar" · "se conformarán equipos" · "cada equipo deberá" · "se dividirán en grupos" |
| Estructura procedimental | "Posteriormente" · "A continuación" · "Seguidamente" · "Finalmente" · "La actividad culmina" · "La actividad finaliza con" |
| Voz | Pasiva refleja + 2ª persona impersonal |

**Anti-patrones tono v3.2:**
- ❌ "Vas a hacer X" (informal · 2ª persona singular tú)
- ❌ "Hay que..." (impersonal genérico)
- ❌ "El estudiante realizará..." (mejor "los aprendices realizarán..." · canon SENA)
- ❌ Verbos en imperativo directo ("Lee el documento" → mejor "los aprendices darán lectura al documento")
- ✅ "Para el desarrollo de la actividad, el instructor orientará a los aprendices sobre..."
- ✅ "Posteriormente se conformarán equipos de N aprendices, quienes darán lectura a..."

### Formato canon de cada actividad (refinado v3.2)

#### Actividad en 3.3 o 3.4 CON evidencia

```
<N>. Actividad <dimension lowercase>:
<enunciado verbo+objeto+condición>

Descripción de la actividad: <narrativa pedagógica multi-párrafo · tono
SENA · qué orienta el instructor · qué hacen los aprendices · paso a
paso · links · entregable final · socialización>

Ambiente requerido: <Convencional | Pluritecnológico | Simulado | combinaciones>

Estrategias didácticas activas: <estrategia>

Técnica didáctica: <técnica>

Materiales de formación: <papel, lapiceros, computadores, equipos...>

Material de apoyo: <PDFs, links, manuales...>

Evidencias de aprendizaje:
   Evidencia de <tipo lowercase>: <nombre>
Técnica de evaluación: <técnica>
Instrumento de evaluación No <N>: <tipo instrumento>

Duración de la actividad: <N> horas.
```

#### Actividad en 3.3 o 3.4 SIN evidencia (No aplica)

```
<N>. Actividad <dimension lowercase>:
<enunciado verbo+objeto+condición>

Descripción de la actividad: <narrativa>

Ambiente requerido: ...
Estrategias didácticas activas: ...
Técnica didáctica: ...
Materiales de formación: ...
Material de apoyo: ...

Evidencias de aprendizaje: No aplica.
Técnica de evaluación: No aplica.
Instrumento de evaluación: No aplica.

Duración de la actividad: <N> horas.
```

(NOTA: cuando "No aplica", las 3 líneas son separadas · cada una "No aplica" · NO indentadas · NO numeración No N en instrumento)

#### Actividad en 3.1 o 3.2 (sin numeración cuando es 1 sola actividad por subsección)

```
Descripción de la actividad: <narrativa con preguntas embebidas>

Ambiente requerido: ...
Estrategias o técnicas didácticas activas: ...
Técnica didáctica: ...
Materiales de formación: ...
Material de apoyo: ...

Duración de la actividad: <N> horas.
```

(NOTA: NO líneas Evidencias/Instrumentos · OMITIDAS por diseño · ver REGLA 45)

### Bilingüismo aplicado IMARPOR-V2 (REGLA 38 detallado para Sección 3)

| Subsección | Lengua | Razón |
|---|---|---|
| 3.1 Actividades de reflexión inicial | **ESP** | Activación afectiva en lengua materna · scaffold para bajar barrera CEFR A1 (alineado con guía modelo Reach Stacker) |
| 3.2 Actividades de contextualización | **ESP** | Conocimientos previos del aprendiz están en lengua materna · CEFR A1 no permite contextualización compleja en EN |
| 3.3 Actividades de apropiación · 4 RAPs | **EN principal · scaffolds ESP** | Donde vive el inglés del programa · descripción de actividades en EN · scaffolds críticos en ESP |
| 3.4 Actividades de Transferencia | **EN producto · ESP reflexión** | Misión Final ABP en EN (output bilingüe oral/escrito) · reflexión metacognitiva en ESP |

### Validation checks v3.2 (NEW · BLOQUEANTES)

- **Check v3.2-A · numeracion_jerarquica_sena** — Sección 3 usa 3.1, 3.2, 3.3, 3.4 (NO "Bloque 1/2/3")
- **Check v3.2-B · header_descripcion_introductoria** — Sección 3 inicia con párrafo "Descripción de la(s) Actividad(es):" personalizado con competencia
- **Check v3.2-C · nombres_subsecciones_canon** — texto exacto: "Actividades de reflexión inicial" / "Actividades de contextualización..." / "Actividades de apropiación" / "Actividades de Transferencia del Conocimiento"
- **Check v3.2-D · header_rap_simple** — `RAP <N>: <enunciado>` texto plano · NO arrow Unicode
- **Check v3.2-E · numeracion_por_rap_reset** — actividades dentro de cada RAP de 3.3 empiezan en 1 (NO acumulado cross-RAP)
- **Check v3.2-F · omision_evidencias_3_1_3_2** — 3.1 y 3.2 NO contienen líneas "Evidencias de aprendizaje" ni "Instrumentos de evaluación"
- **Check v3.2-G · preguntas_embebidas** — preguntas reflexivas/contextualizadoras dentro de "Descripción de la actividad" (NO campos separados)
- **Check v3.2-H · combinacion_ambientes** — cuando aplica, formato "Ambiente <principal>. Ambiente convencional." en una línea
- **Check v3.2-I · tono_sena_canon** — verbos institucionales SENA presentes ("se solicita" · "el instructor orientará" · "los aprendices darán lectura" · etc.)

### Anti-patrones v3.2 evitados

- ❌ Numeración acumulada cross-RAP (1-30) en lugar de reset POR RAP
- ❌ Headers "Bloque 1/2/3" en lugar de numeración jerárquica SENA
- ❌ Header RAP con arrow Unicode "▶ RAP 1" en lugar de texto plano
- ❌ Líneas "Evidencias de aprendizaje: No aplica" visibles en 3.1 y 3.2 (deben omitirse completamente)
- ❌ Preguntas reflexivas como campos separados (deben ir embebidas en Descripción)
- ❌ Bullets para combinación de ambientes (debe ser una línea textual)
- ❌ Nombres abreviados de subsecciones ("3.2 Contextualización" en lugar del nombre completo SENA)
- ❌ Verbos imperativos directos ("Lee X" en lugar de "los aprendices darán lectura a X")

### Resumen estructura final docx GFPI-F-135 v3.2

```
[Encabezado: logo SENA central + título institucional]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
   (8 campos heredados · solo ESP)

2. PRESENTACIÓN
   (bilingüe ESP+EN paralelos · personalizada por programa · adaptada al sector)

3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE
   [Descripción introductoria canon personalizada con competencia]

   3.1 Actividades de reflexión inicial          [ESP · sin Evidencias/Instrumentos]
   3.2 Actividades de contextualización e
       identificación de conocimientos necesarios
       para el aprendizaje                       [ESP · sin Evidencias/Instrumentos]
   3.3 Actividades de apropiación               [EN principal · scaffolds ESP]
       RAP 1: <enunciado SOFÍA>
         1. Actividad <dim>: <enun>             [reset desde 1]
         2. ...
       RAP 2: <enunciado SOFÍA>
         1. ...                                 [reset desde 1]
       RAP 3, RAP 4 ...
   3.4 Actividades de Transferencia              [EN producto · ESP reflexión]
       del Conocimiento

[Footer todas páginas: "GFPI-F-135 V04"]
```

---

*PM-3.6 v3.2 · Sección 3 numeración jerárquica SENA + 9 reglas NEW (40-48) + 9 validation checks bloqueantes*
*Sergio Cortés decisión 2026-05-02 PM (iteración con guía modelo Reach Stacker) · cross-program forever*

---

## EXTENSIÓN v3.3 — SECCIÓN 4 PLANTEAMIENTO DE EVIDENCIAS · TABLA 6 COLUMNAS CANON SENA (2026-05-02 PM)

### Decisión canónica Sergio (verbatim · 4a iteración con guía modelo Reach Stacker)

> Sergio aporta Sección 4 de la guía SENA modelo · estructura tabular 6 columnas mapeando cada actividad de Apropiación con sus evidencias · criterios SOFÍA · técnicas/instrumentos. Detecta que **CADA actividad necesita un campo `criterios_evaluacion[]`** (1-5 criterios verbal SOFÍA) · cascade impact: bump Activity Card schema v3.0 → v3.1 + PM-2.11 v3.3.

### Estructura completa Sección 4 v3.3

```
4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN
   EN EL PROCESO FORMATIVO

[Tabla con 6 columnas obligatorias · una fila por cada actividad de
3.3 Apropiación · headers RAP como separadores]

| Fase del   | Actividad del | Actividad de  | Evidencias de | Criterios de | Técnicas e          |
| proyecto   | proyecto      | Aprendizaje   | Aprendizaje   | Evaluación   | Instrumentos de     |
| formativo  | formativo     |               |               |              | Evaluación          |
|------------|---------------|---------------|---------------|--------------|---------------------|
| No aplica  | No aplica     | RAP 1: <enunciado>                                                  |
| No aplica  | No aplica     | 1. Actividad  | <evidencia o  | <criterio    | <técnica + No N>    |
|            |               | <dim>:        |  No aplica>   |  o múltiples>|  o "No aplica"      |
|            |               | <enunciado>   |               |              |                     |
| ...        | ...           | 2. ...        | ...           | ...          | ...                 |
| No aplica  | No aplica     | RAP 2: <enunciado>                                                  |
| No aplica  | No aplica     | 1. ...        | ...           | ...          | ...                 |
```

### REGLA 49 — Sección 4 estructura tabular 6 columnas canon SENA

Tabla obligatoria post-Sección 3. Headers exactos:

1. **Fase del proyecto formativo** — "No aplica" si Curso Especial (no proyecto)
2. **Actividad del proyecto formativo** — "No aplica" si idem
3. **Actividad de Aprendizaje** — `<num>. Actividad <dim>: <enunciado>`
4. **Evidencias de Aprendizaje** — `Evidencia de <tipo>: <nombre>` o "No aplica"
5. **Criterios de Evaluación** — frase(s) verbal SOFÍA (1+ criterios) heredados de AC.criterios_evaluacion[]
6. **Técnicas e Instrumentos de Evaluación** — `Técnica: <X>\nInstrumento de Evaluación No <N>: <tipo>` o "No aplica"

### REGLA 50 — Filas Sección 4 = SOLO actividades de 3.3 Apropiación

| Subsección Sección 3 | Aparece en Sección 4 tabla? |
|---|---|
| 3.1 Reflexión inicial | NO (omitida) |
| 3.2 Contextualización | NO (omitida) |
| 3.3 Apropiación (RAP 1-N) | **SÍ · todas las actividades** |
| 3.4 Transferencia del Conocimiento | **NO** (decisión Sergio · aunque tenga evidencia formal) |

**Razón canon:** Sección 4 mapea evidencias de la fase de Apropiación · 3.4 transferencia tiene su propia rúbrica ABP capstone (PM-3.5) · 3.1 y 3.2 no producen evidencia formal.

### REGLA 51 — Headers RAP como separadores tipográficos entre filas

Antes de las filas de cada RAP de 3.3, insertar header en una fila completa que ocupa toda la tabla:

```
| No aplica | No aplica | RAP 1: <enunciado SOFÍA completo>                  |
```

NO usar arrow Unicode · NO bullets · texto plano `RAP <N>: <enunciado>`. El enunciado es heredado literal de matriz v1.3.

### REGLA 52 — Numeración instrumentos ACUMULADA cross-RAP

Los instrumentos de evaluación se numeran de forma ACUMULADA a través de todos los RAPs (NO reset por RAP):

| RAP | Actividades con evidencia formal | Instrumentos asignados |
|---|---|---|
| RAP 1 | Actividad 2, 3, 5, 6 (4 evidencias) | No 1, No 2, No 3, No 4 |
| RAP 2 | Actividad 1, 4 (2 evidencias) | No 5, No 6 |
| RAP 3 | Actividad 2 (1 evidencia) | No 7 |
| RAP 4 | Actividad 1 (1 evidencia) | No 8 |
| **TOTAL** | **8 evidencias** | **No 1 ... No 8 acumulado** |

Contraste · IMPORTANTE:
- **Actividades** en 3.3 → numeración POR RAP reset (1, 2, 3... cada RAP) · REGLA 44
- **Instrumentos** en Sección 4 → numeración ACUMULADA cross-RAP (1, 2, ... 8) · REGLA 52

### REGLA 53 — Criterios múltiples por actividad cuando corresponda

Cuando una actividad tiene `criterios_evaluacion[]` con N>1 elementos, cada criterio va en línea separada dentro de la celda Col 5:

**Ejemplo guía modelo Reach Stacker · RAP 2 actividad #4:**
```
| Actividad de Aprendizaje | Criterios de Evaluación |
|--------------------------|--------------------------|
| 4. Actividad procedimental: | Asegura el contenedor de acuerdo con manual de operación. |
| Asegurar, levantar,         | Iza el contenedor de acuerdo con manual de operación... |
| trasladar y posicionar...   | Traslada el contenedor de acuerdo con normas de seguridad... |
|                             | Posiciona el contenedor de acuerdo con requerimiento... |
```

### REGLA 54 — Criterios independientes de evidencia formal

Una actividad puede tener `criterios_evaluacion[]` aún cuando NO produce evidencia formal (`evidencias.aplica = false`). En ese caso:

| Col 4 Evidencias | Col 5 Criterios | Col 6 Técnicas/Instrumentos |
|---|---|---|
| No aplica | (criterio o múltiples) | No aplica |

**Ejemplo guía modelo · RAP 1 actividad #1 "Portar EPI":**
- Col 4: No aplica
- Col 5: "Utiliza los Elementos de Protección Individual de acuerdo con protocolos de Seguridad y Salud en el Trabajo."
- Col 6: No aplica

### REGLA 55 — Cell Col 6 formato corto "Técnica: X · Instrumento de Evaluación No N: tipo"

Variante de Sección 3 (donde se usa "Técnica de evaluación:" texto completo). En Sección 4 tabla:

```
Técnica: <Formulación de preguntas | Verificación de producto | Observación>
Instrumento de Evaluación No <N>: <Cuestionario | Lista de verificación | Lista de Chequeo>
```

Cuando NO aplica:
```
No aplica
```
(una sola línea · NO 3 líneas separadas como en Sección 3.4 con "No aplica")

### REGLA 56 — Heredancia obligatoria desde Activity Card v3.1 .criterios_evaluacion[]

Los criterios en Col 5 se heredan **literal 1:1** desde:

```
AC v3.1 .criterios_evaluacion[]
     ↓ (cero invención · sin reformular)
PM-2.11 v3.3 .criterios_por_actividad{numero_acumulado: [criterios]}
     ↓
PM-3.6 v3.3 .Sección 4 tabla Col 5 Criterios de Evaluación
```

**Implicación:** las 30 Activity Cards de IMARPOR-V2 deben tener `criterios_evaluacion[]` poblado. Esto es deuda explícita post-bump (regenerar las cards o agregar el campo).

### Validation checks v3.3 (NEW · BLOQUEANTES)

- **Check v3.3-A · seccion_4_tabla_6_cols** — Sección 4 contiene tabla con exactas 6 columnas en orden canon
- **Check v3.3-B · solo_actividades_3_3** — filas de tabla son solo de 3.3 Apropiación (NO 3.1, 3.2, 3.4)
- **Check v3.3-C · headers_rap_separadores** — `RAP <N>: <enunciado>` aparece como separador entre grupos de filas
- **Check v3.3-D · numeracion_instrumentos_acumulada** — instrumentos numerados 1, 2, ... N acumulado cross-RAP (NO reset)
- **Check v3.3-E · criterios_per_activity_heredados** — Col 5 Criterios proviene literal de AC.criterios_evaluacion[] (cero invención)
- **Check v3.3-F · criterios_multiples_inline** — cuando AC.criterios_evaluacion[] tiene N>1, cada criterio en línea separada dentro de Col 5
- **Check v3.3-G · criterios_independientes_evidencia** — actividades con `evidencias.aplica=false` aún muestran criterios en Col 5 si AC.criterios_evaluacion[] no vacío

### Anti-patrones v3.3 evitados

- ❌ Tabla Sección 4 con menos/más de 6 columnas (estructura canon SENA fija)
- ❌ Incluir filas de 3.1, 3.2 o 3.4 en la tabla (decisión Sergio)
- ❌ Numeración de instrumentos POR RAP reset (deben ser acumulados)
- ❌ 1 fila por criterio en lugar de criterios múltiples en una sola celda
- ❌ Inventar criterios (deben heredarse 1:1 de AC.criterios_evaluacion[])
- ❌ Omitir criterios cuando NO hay evidencia formal (criterios independientes)
- ❌ Bullets o emojis en headers RAP (texto plano canon)

### Cascade impact (deuda explícita post-bump)

| Componente | Acción | Estado |
|---|---|---|
| Activity Card schema v3.0 → v3.1 | Bump · NEW campo `criterios_evaluacion[]` | ✅ master prompt actualizado |
| PM-2.11 v3.2 → v3.3 | Bump · NEW campo `criterios_por_actividad` | ✅ master prompt actualizado |
| PM-3.6 v3.2 → v3.3 | Bump · NEW Sección 4 + 8 reglas | ✅ master prompt actualizado |
| 30 Activity Cards IMARPOR-V2 | Regenerar con `criterios_evaluacion[]` | ⚠️ pending dispatch Agent |
| pm-2-11.json + xlsx IMARPOR-V2 | Re-render post-regeneración cards | ⚠️ pending |
| DM v3.11 → v3.12 | Status footnote cascade 4-bumps | ⚠️ pending |

### Resumen estructura final docx GFPI-F-135 v3.3

```
[Encabezado: logo SENA central + título institucional]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
   (8 campos heredados · solo ESP)

2. PRESENTACIÓN
   (bilingüe ESP+EN paralelos · personalizada por programa)

3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE
   3.1 Actividades de reflexión inicial
   3.2 Actividades de contextualización...
   3.3 Actividades de apropiación
       RAP 1: <enunciado>
         1. Actividad ... · 2. Actividad ... · ...
       RAP 2: <enunciado>
         1. ...
       ...
   3.4 Actividades de Transferencia del Conocimiento

4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA LA EVALUACIÓN
   EN EL PROCESO FORMATIVO
   (tabla 6 columnas · solo actividades 3.3 · headers RAP separadores)

[Footer todas páginas: "GFPI-F-135 V04"]
```

---

*PM-3.6 v3.3 · Sección 4 PLANTEAMIENTO DE EVIDENCIAS canon SENA · tabla 6 columnas + 8 reglas NEW (49-56) + 7 validation checks bloqueantes*
*Sergio Cortés decisión 2026-05-02 PM (4a iteración con guía modelo Reach Stacker) · cascade impact AC v3.1 + PM-2.11 v3.3 · cross-program forever*

---

## EXTENSIÓN v3.4 — REGLA EVIDENCIAS SELECTIVAS + SECCIÓN 5 GLOSARIO BILINGÜE EXTENSO + CHECK CONSISTENCY (2026-05-02 PM)

### Decisión canónica Sergio (verbatim · 5a iteración)

> "No todas las 30 actividades necesariamente deben contener evidencias de evaluación formales. Calificar 30 actividades es muy desgastante! Yo digo que unas 3 por cada RAP estaría bien. Total 12 actividades con sus respectivas evidencias de aprendizaje formales."
>
> "En el glosario: debes ser lo más extenso posible, incluir todo lo que considere necesario incluir. Palabras, frases, chunks. Palabra en inglés, definición en inglés. Un ejemplo contextualizado del uso de ese término o frase y finalmente el equivalente en español."
>
> Validation check `dimension_consistency_seccion_3_vs_4` confirmado.

### REGLA 57 — Evidencias formales SELECTIVAS · target 2-3 por RAP (8-12 total)

**Distinción crítica entre dos conceptos:**

| Concepto | Cardinalidad | Cuándo |
|---|---|---|
| **`criterios_evaluacion[]`** (qué se mide) | **OBLIGATORIO 1+ en TODAS las cards de Apropiación** | Siempre presente (REGLA 54 v3.3 · cómo se observa el aprendizaje) |
| **`evidencias.aplica = true`** (evaluación formal con instrumento) | **SELECTIVO · 2-3 por RAP · 8-12 total** | Solo en actividades-anchor (anchor activity ESP) · NO en cada actividad |

**Regla operacional (cascade impact):**

| RAP | Evidencias formales target | Tipo predominante |
|---|---|---|
| RAP 1 | 2-4 (densidad inicial) | Cuestionario + Lista verificación + Lista chequeo (mix tipos) |
| RAP 2 | 2-3 | mix |
| RAP 3 | 1-2 | Lista chequeo + producto |
| RAP 4 | 1-2 | Producto + desempeño final |
| **TOTAL** | **8-12 evidencias formales** | NO 30 evidencias |

**Razón pedagógica Sergio:** "calificar 30 actividades es muy desgastante" · evidencias formales son anchor del proceso, no fricción constante para el instructor. Las demás actividades tienen criterio observable pero NO instrumento formal.

**Anti-patrón evitado:**
- ❌ Marcar `evidencias.aplica = true` en TODAS las 30 cards (sobrecarga al instructor)
- ❌ Eliminar `criterios_evaluacion[]` de las cards sin evidencia formal (confunde · criterios siguen siendo obligatorios)
- ✅ Selectivo: solo cards-anchor llevan instrumento formal · todas llevan criterio observable

**Validación cascade IMARPOR-V2 (Phase 2 ya cerrado):**
- Estado actual: 9 evidencias formales distribuidas asimétricamente (B0=1 · B1=2 · B2=3 · B3=1 · B4=1 · BT=1)
- Target Sergio: 8-12 → ✅ DENTRO del target (9 evidencias)
- NO requiere ajuste retroactivo del cascade · cumple regla v3.4

### REGLA 58 — Sección 5 GLOSARIO bilingüe extenso (canon Sergio)

**Plantilla obligatoria por entrada · 4 fields:**

```
<English term · word | phrase | chunk>
   English definition: <definición técnica clara en inglés>
   Example in context: <oración o párrafo corto mostrando uso real
   en el sector del programa · narrativa contextualizada>
   Equivalente en español: <traducción · puede incluir nota de uso
   o variante regional cuando aplique>
```

**Reglas de composición:**

1. **Entradas amplias** (NO solo single words): incluir `phrases` (verb phrases · noun phrases) y `chunks` (collocations típicas del sector)
2. **Sin límite arbitrario** ("lo más extenso posible") · objetivo: cobertura completa del vocabulario técnico del programa
3. **Definición en inglés** (NO traducción literal · definición técnica)
4. **Ejemplo contextualizado** del sector específico (NO ejemplos genéricos · debe usar el universo del programa: marítimo · portuario · cold chain · motor diesel · etc.)
5. **Equivalente en español** al final (cierra el bilingüismo)
6. **Orden:** alfabético por English term (default) · ALTERNATIVA: agrupado por RAP / categoría temática si justifica pedagógicamente

**Fuentes upstream para el glosario (heredancia 1:1 · cero invención):**

| Fuente | Aporta |
|---|---|
| `pm-1-2.json.sub_bloques_tripartitos[].key_vocabulary_per_rap[]` | ~20 términos canon por RAP × 4 RAPs = 80 términos base |
| `pm-1-2.json.sub_bloques_tripartitos[B0].vocabulario_diagnostico[]` | ~15 términos baseline diagnostic |
| Activity Cards `descripcion`, `enunciado` y `material_apoyo` | Términos técnicos embedded en narrativa pedagógica |
| `pm-0-context.json.programa_metadata.sector_economico` | Términos del sector que aún no estén explícitos |

**Cobertura objetivo IMARPOR-V2** (estimación):
- Vocabulario canon: 4 RAPs × 20 términos = 80 entries
- Vocabulario diagnostic B0: 15 entries
- Vocabulario embebido en cards: ~40-60 entries adicionales
- **TOTAL estimado: 130-150 entradas en el glosario**

### Ejemplo de entrada glosario IMARPOR-V2 (formato canon)

```
Reefer container
   English definition: Refrigerated shipping container designed to maintain
   a controlled temperature for perishable cargo such as bananas,
   pharmaceuticals, or frozen goods.
   Example in context: "The MV CARIBBEAN STAR is loaded with 80 reefer
   containers carrying bananas at 13.3°C bound for the European market."
   Equivalente en español: Contenedor refrigerado · contenedor reefer
   (uso técnico también acepta el anglicismo "reefer" en español).
```

```
SMCP (Standard Marine Communication Phrases)
   English definition: Standardized vocabulary and phrases adopted by the
   International Maritime Organization (IMO) to ensure unambiguous
   communication between ships, ports, and authorities, especially in
   safety-critical situations.
   Example in context: "Captain Lim used SMCP message markers like
   'INSTRUCTION:' and 'WARNING:' during the VHF exchange with the pilot
   approaching Puerto Antioquia."
   Equivalente en español: Frases Estandarizadas de Comunicación Marítima
   (FECM) · adoptadas por la Organización Marítima Internacional (OMI).
```

```
To berth (verb phrase)
   English definition: To bring a ship alongside a wharf, pier, or other
   mooring structure for loading, unloading, or other operations.
   Example in context: "The pilot guided the vessel to berth 14 at the
   Puerto Antioquia banana terminal at 04:30 local time."
   Equivalente en español: Atracar el buque · amarrar el buque al muelle.
```

### Estructura completa Sección 5 v3.4

```
5. GLOSARIO BILINGÜE / BILINGUAL GLOSSARY

[Introducción breve sobre el propósito del glosario · ESP+EN paralelos]

[Entradas ordenadas alfabéticamente por English term · típico 80-150
entradas según programa · cada entrada con 4 fields canon]

A
  <Entry 1>
  <Entry 2>
  ...

B
  <Entry N>
  ...

...

Z
  <Entry M>
```

### REGLA 59 — Check NEW dimension_consistency_seccion_3_vs_4 (validación cross-secciones)

Validation check NEW que detecta inconsistencias de dimensión entre Sección 3 y Sección 4:

```
Para cada actividad de 3.3 Apropiación:
   - Capturar dimension declarada en Sección 3 ("1. Actividad <dim>:")
   - Capturar dimension declarada en Sección 4 tabla Col 3 ("N. Actividad <dim>:")
   - VERIFY: dimension(S3) === dimension(S4)
   - Si NO match: FAIL · reportar inconsistencia (ej: "Reach Stacker activity #3 RAP 1 · S3=cognitiva · S4=procedimental · MISMATCH")
```

**Razón:** la guía modelo Reach Stacker tenía esta inconsistencia (actividad #3 RAP 1 "Reconocer códigos" · S3=cognitiva · S4=procedimental). Es un error humano fácil de cometer · check automatizado lo previene en futuros runs.

### Validation checks v3.4 (NEW · BLOQUEANTES)

- **Check v3.4-A · evidencias_formales_target_2_3_por_rap** — count(`evidencias.aplica=true`) por RAP esté entre 2-4 · total 8-12
- **Check v3.4-B · criterios_evaluacion_independiente_evidencia** — TODAS las cards de Apropiación tienen `criterios_evaluacion[]` ≥1 · INDEPENDIENTE de `evidencias.aplica` (REGLA 54 PRESERVADA · v3.3)
- **Check v3.4-C · seccion_5_glosario_present** — Sección 5 GLOSARIO BILINGÜE presente · ≥50 entradas (mínimo razonable · target 80-150)
- **Check v3.4-D · glosario_4_fields_por_entrada** — cada entrada tiene 4 campos: English term + English definition + Example in context + Equivalente en español
- **Check v3.4-E · glosario_ejemplos_contextualizados** — Example in context usa universo del programa (NO genérico)
- **Check v3.4-F · dimension_consistency_seccion_3_vs_4** (REGLA 59) — dimension declarada en S3 === dimension declarada en S4 para cada actividad de 3.3

### Anti-patrones v3.4 evitados

- ❌ 30 evidencias formales (sobrecarga instructor · contradice canon Sergio)
- ❌ Eliminar `criterios_evaluacion[]` de cards sin evidencia formal (confunde · criterios siguen siendo obligatorios)
- ❌ Glosario corto (≤30 entradas) · "lo más extenso posible" canon Sergio
- ❌ Glosario solo single words (debe incluir phrases + chunks)
- ❌ Definición traducida literal en lugar de definición técnica en inglés
- ❌ Ejemplos genéricos en lugar de contextualizados al sector del programa
- ❌ Inconsistencia silenciosa de dimensión entre Sección 3 y Sección 4 (debe detectarse)

### Cascade impact v3.4 (deuda explícita actualizada)

| Componente | Acción | Estado |
|---|---|---|
| Activity Card schema v3.1 | Sin bump (campo criterios_evaluacion[] ya v3.1) | ✅ |
| PM-2.11 v3.3 | Sin bump (criterios_por_actividad ya v3.3) | ✅ |
| PM-3.6 v3.3 → v3.4 | Bump · 3 reglas NEW (57-59) + 6 validation checks NEW | ✅ master prompt actualizado |
| 30 Activity Cards IMARPOR-V2 | Regenerar TODAS con `criterios_evaluacion[]` · NO modificar `evidencias.aplica` (cascade actual ya cumple target 8-12) | ⚠️ pending dispatch Agent |
| pm-2-11.json + xlsx IMARPOR-V2 | Re-render post-regeneración cards (criterios visibles en Col 5 Sección 4) | ⚠️ pending |
| Sección 5 GLOSARIO IMARPOR-V2 | Construir desde upstream key_vocabulary_per_rap + vocabulario_diagnostico + términos embedded · ~80-150 entradas · 4 fields cada una | ⚠️ pending dispatch Agent |
| DM v3.12 → v3.13 | Status footnote v3.4 cross-bump | ⚠️ pending |

### Resumen estructura final docx GFPI-F-135 v3.4

```
[Encabezado: logo SENA central + título institucional]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE          (8 campos · ESP)
2. PRESENTACIÓN                                       (bilingüe ESP+EN)
3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE     (jerárquico 3.1+3.2+3.3+3.4)
4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE PARA   (tabla 6 cols · evidencias formales selectivas 8-12)
   LA EVALUACIÓN EN EL PROCESO FORMATIVO
5. GLOSARIO BILINGÜE / BILINGUAL GLOSSARY            (NEW v3.4 · 80-150 entradas · 4 fields)

[Footer todas páginas: "GFPI-F-135 V04"]
```

---

*PM-3.6 v3.4 · Evidencias selectivas 2-3 por RAP + Sección 5 GLOSARIO bilingüe extenso + Check dimension consistency*
*Sergio Cortés decisión 2026-05-02 PM (5a iteración con guía modelo Reach Stacker · refinamiento pedagógico) · 3 reglas NEW (57-59) + 6 validation checks bloqueantes · cross-program forever*

---

## EXTENSIÓN v3.5 — APRENDIZ-FACING SHIFT + 7 REGLAS NEW (60-66) (2026-05-03)

### Decisión canónica Sergio (post-validación preview v6 prólogo cinematográfico)

> Sergio detectó 2026-05-02 PM que la versión v3.4 todavía tenía 2 anti-patrones críticos: (1) `descripcion` rendereada literal era 535 palabras instructor-facing meta-pedagógica con jerga + nombres de personajes · (2) `recursos` mencionados pero no listados como tangibles preparados. Solución: 5 layers fix (descripcion_aprendiz · recursos_aprendiz · cleanup personajes · 3 categorías materiales · footer cursivo) + bilingüismo Opción D escalada CEFR-aware + estilo prólogo cinematográfico Sec 2 + logo SENA real. Validación: preview v6 aprobado 2026-05-03.

### REGLA 60 — Heredancia descripcion_aprendiz · NO descripcion legacy

PM-3.6 v3.5 hereda **`descripcion_aprendiz`** (canon AC v3.2) en lugar de `descripcion` (instructor-facing legacy):

| Versión | Audiencia | Consumido en |
|---|---|---|
| `descripcion` legacy | INSTRUCTOR (Playbook PM-3.2) | Build-out v3.x · NO en GFPI-F-135 v3.5 |
| `descripcion_aprendiz` v3.2 | APRENDIZ (Guía SENA) | PM-3.6 v3.5 · Sec 3 obligatorio |

**Anti-patrón evitado:** renderizar `descripcion` 535 palabras instructor-facing con jerga sistémica ("baseline lexical · bridge cognitivo · sparks de Mariana") + nombres de personajes prohibidos.

### REGLA 61 — Bloque "Recursos preparados por el instructor" · después de Descripción

Estructura de cada actividad en Sec 3:

```
<N>. Activity (<dimensión>): <enunciado V+O+C>          ← header
<N>. Actividad <dimensión>: <enunciado>                ← scaffold cursiva (si bilingüe)

Activity description: <descripcion_aprendiz_en>         ← cuerpo principal (regular)
Descripción de la actividad: <descripcion_aprendiz>     ← scaffold cursiva ES (si bilingüe)

Resources prepared by the instructor:                   ← NEW v3.5 ↓
   • <recursos_aprendiz_en[0]>
   • <recursos_aprendiz_en[1]>
   ...
Recursos preparados por el instructor:                  ← scaffold cursiva ES
   • <recursos_aprendiz[0]>
   ...

[FOOTER cursiva discreta · ver REGLA 64]
```

**Heredancia:** `recursos_aprendiz[]` y `recursos_aprendiz_en[]` (AC v3.2) · cardinality match obligatorio.

### REGLA 62 — 3 secciones materiales SEPARADAS (canon SENA distinción)

Sergio canon 2026-05-03: distinción operacional clara entre 3 categorías de material en cada actividad:

| Categoría | Naturaleza | Origen field AC |
|---|---|---|
| **Recursos preparados por el instructor** (NEW v3.5) | Worksheets · tarjetas · sobres · plantillas · sets físicos preparados específicamente | `recursos_aprendiz[]` |
| **Materiales de formación** (componente formativo · CORE) | Insumos/equipos/herramientas/recursos didácticos PRINCIPALES estrictamente OBLIGATORIOS · núcleo técnico indispensable | `materiales_formacion[]` |
| **Material de apoyo** (complementario · ILUSTRAR/PROFUNDIZAR) | Recursos ADICIONALES sugeridos (manuales · videos · artículos · webgrafía · biblioteca SENA) | `material_apoyo[]` |

**Render:**
- Recursos preparados por el instructor: cuerpo principal (después de Descripción · regular)
- Materiales de formación: footer cursiva discreta
- Material de apoyo: footer cursiva discreta

**Anti-patrón evitado:** juntar las 3 categorías en una sola sección (anti-patrón v3.4 corregido v3.5) · confunde al instructor sobre qué preparar específicamente.

### REGLA 63 — Bilingüismo Opción D escalada CEFR-aware

Por sección de la guía:

| Sección | Lengua principal (regular) | Scaffold (cursiva 9pt gris #707070) |
|---|---|---|
| Sec 1 Identificación | ESP | – |
| Sec 2 Presentación | EN protagonista (cinematográfico) | ES cursiva pequeña paralela |
| Sec 3.1 Reflexión inicial (B0 · pre-A1) | ESP | – (sin EN · canon CEFR pre-A1 activación afectiva) |
| Sec 3.2 Contextualización (B0 · pre-A1) | ESP | – (sin EN · idem 3.1) |
| Sec 3.3 Apropiación RAP 1 (B1 · A1.2) | EN A1.2 controlled | ES cursiva pequeña scaffold |
| Sec 3.3 Apropiación RAP 2 (B2 · A1.3) | EN A1.3 controlled | ES cursiva pequeña scaffold |
| Sec 3.3 Apropiación RAP 3 (B3 · A2.0) | EN A2.0 controlled | ES cursiva pequeña scaffold |
| Sec 3.3 Apropiación RAP 4 (B4 · A2.0-A2.1) | EN A2.0-A2.1 controlled | ES cursiva pequeña scaffold |
| Sec 3.4 Transferencia (BT · A2.1) | EN A2.1 terminal integrativo | ES cursiva pequeña scaffold |
| Sec 4 Tabla evidencias | ESP (administrativo) | – |
| Sec 5 Glosario | EN protagonista (4 fields) | ES cursiva en Equivalente español |

**Razón pedagógica:** programas SENA bilingüismo enseñan inglés EN inglés (immersive · ESP solo cuando ayuda). 3.1+3.2 son activación afectiva · ESP funciona pedagógicamente · 3.3+3.4 escalan EN con scaffold ES decreciente.

### REGLA 64 — Footer info actividad cursiva 9pt color gris discreta

Después de "Recursos preparados por el instructor" + scaffold ES, los campos auxiliares de cada actividad van en formato discreto:

| Campo | Format |
|---|---|
| Ambiente requerido | cursiva · 9pt · color #707070 |
| Estrategias didácticas activas | cursiva · 9pt · color #707070 |
| Técnica didáctica | cursiva · 9pt · color #707070 |
| Materiales de formación | cursiva · 9pt · color #707070 |
| Material de apoyo | cursiva · 9pt · color #707070 |
| Evidencias de aprendizaje (header + 3 líneas) | cursiva · 9pt · color #707070 |
| Instrumentos de evaluación (si NO aplica) | cursiva · 9pt · color #707070 |
| Duración de la actividad | cursiva · 9pt · color #707070 |

**Razón visual:** estos son metadatos operacionales del instructor · NO son contenido de aprendizaje · su prominencia visual debe ser discreta para no competir con la descripción + recursos preparados (cuerpo principal del aprendiz).

### REGLA 65 — Sec 2 Presentación estilo PRÓLOGO cinematográfico

Estructura canon 4 párrafos cinematográficos · EN protagonista + ES cursiva paralela:

```
PÁRRAFO 1 · ESCENA APERTURA (sensorial · contextual · stakes)
  EN: situación específica del sector + anclaje universo canon (lugar/hora/sentidos)
  ES: cursiva paralela traducida

PÁRRAFO 2 · APRENDIZ PROTAGONISTA (yours · you are · because you are there)
  EN: el aprendiz como héroe del programa · su rol único
  ES: cursiva paralela traducida

PÁRRAFO 3 · VIAJE PEDAGÓGICO (12 sesiones · CEFR · RAPs · evidencias · misión final)
  EN: la promesa formativa con destino real (empleo/futuro)
  ES: cursiva paralela traducida

PÁRRAFO 4 · MENCIÓN SENA + LLAMADO
  EN: instrucción directa + autoaprendizaje + biblioteca SENA + cierre cinematográfico
  ES: cursiva paralela traducida
```

**Anti-patrón evitado:** texto SENA estándar plano "Estimado Aprendiz, bienvenido a esta formación..." · sin engagement · sin protagonismo · sin promesa.

**Características obligatorias:**
- Anclaje universo canon (lugar específico · personajes generales · objetos icónicos del sector)
- Aprendiz protagonista ("you · yours · your training journey")
- Promesa pedagógica concreta (CEFR · sesiones · evidencias · misión final · destino real)
- Cierre cinematográfico ("Welcome aboard · The ship is waiting" · etc.)
- CEFR-controlled English (A1.2-A2.1 según programa)

### REGLA 66 — Logo SENA real centrado en encabezado

Logo SENA institucional (PNG real · NO placeholder texto) centrado en parte superior de Sec 1.

**Path canon:** `<repo_root>/sena-logo.png` (alternativo: `frontend/public/sena-logo-green.svg`)

**Especificaciones:**
- Tamaño: 80x80 px (proporcional)
- Alineación: centrada
- Posición: encima del título "PROCESO DE GESTIÓN..." en encabezado documento
- Espaciado: 120 spacing after

**Anti-patrón evitado:** placeholder "[LOGO SENA]" o "[LOGO SENA CENTRAL]" texto plano.

### Validation checks v3.5 (NEW · BLOQUEANTES)

- **Check v3.5-A · descripcion_aprendiz_consumed** · PM-3.6 hereda de `descripcion_aprendiz` (NO `descripcion` legacy)
- **Check v3.5-B · recursos_aprendiz_rendered_after_description** · "Recursos preparados por el instructor" aparece después de Descripción y antes del footer cursivo
- **Check v3.5-C · 3_categorias_materiales_separadas** · Recursos preparados (cuerpo) + Materiales formación (footer) + Material apoyo (footer) renderizadas como secciones distintas
- **Check v3.5-D · bilinguismo_opcion_D_escalado** · 3.1+3.2 solo ESP · 3.3+3.4 EN protagonista regular + ES cursiva 9pt #707070 · Sec 2 estilo prólogo bilingüe · Sec 5 EN protagonista
- **Check v3.5-E · footer_cursivo_metadata_actividad** · Ambiente · Estrategias · Técnica · Materiales formación · Material apoyo · Evidencias · Instrumentos · Duración en cursiva 9pt color #707070
- **Check v3.5-F · prologo_cinematografico_4_parrafos** · Sec 2 contiene exactamente 4 párrafos cinematográficos bilingües (escena · protagonista · viaje · SENA)
- **Check v3.5-G · logo_sena_real_centered** · Logo SENA PNG real centrado en encabezado · NO placeholder texto

### Anti-patrones v3.5 evitados

- ❌ Renderizar `descripcion` (instructor-facing 535 palabras) en Sec 3 actividades
- ❌ Mezclar Recursos preparados + Materiales formación + Material apoyo en una sola sección
- ❌ Footer info actividad con visibilidad regular (compite con cuerpo principal)
- ❌ Sec 2 Presentación SENA estándar plano sin engagement cinematográfico
- ❌ Placeholder "[LOGO SENA]" en lugar del logo real
- ❌ Mencionar nombres de personajes en cualquier campo aprendiz-facing

### Cascade impact v3.5 (canonización Nivel 2 reducido + ETL canon library)

| Componente | Acción | Estado |
|---|---|---|
| Activity Card schema v3.1 → v3.2 | Bump · 4 campos NEW (descripcion_aprendiz · recursos_aprendiz · descripcion_aprendiz_en · recursos_aprendiz_en) | ✅ master prompt actualizado |
| PM-3.6 v3.4 → v3.5 | Bump · 7 reglas NEW (60-66) | ✅ master prompt actualizado |
| DM v3.13 → v3.14 | Status footnote canonización Nivel 2 reducido | ⚠️ pending |
| `subagente_pm_3_6_gfpi_f135.py` | Update · consume cards v3.2 + render canon v3.5 | ⚠️ pending |
| Scripts ETL canon library | Mover wave-e-fix-* a `.claude/skills/fpi-sena-fase3/scripts/canon/etl-cards-v32-aprendiz/` | ⚠️ pending |
| Wrappers PM-2.x (11 master prompts) | Bump · próxima fase canonización Nivel 3 (deuda explícita) | 🔵 deferred |

### Resumen estructura final docx GFPI-F-135 v3.5

```
[Encabezado: LOGO SENA REAL centrado · título institucional]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE       (8 campos · ESP)
2. PRESENTACIÓN                                    (PRÓLOGO cinematográfico 4 párrafos · EN protagonista + ES cursiva)
3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE  (jerárquico 3.1+3.2+3.3+3.4)
   3.1 Reflexión inicial          (ESP · sin EN · descripcion_aprendiz + recursos_aprendiz + footer cursivo)
   3.2 Contextualización          (ESP · sin EN · idem)
   3.3 Apropiación RAP 1-4        (EN protagonista + ES cursiva scaffold · descripcion_aprendiz_en + recursos_aprendiz_en + footer cursivo)
   3.4 Transferencia              (EN protagonista + ES cursiva scaffold · idem)
4. PLANTEAMIENTO DE EVIDENCIAS PARA LA EVALUACIÓN  (tabla 6 cols · ESP administrativo)
5. GLOSARIO BILINGÜE / BILINGUAL GLOSSARY          (EN protagonista + ES cursiva en Equivalente)

[Footer todas páginas: "GFPI-F-135 V04" + página]
```

---

*PM-3.6 v3.5 · APRENDIZ-FACING SHIFT canon · 7 reglas NEW (60-66) + 7 validation checks bloqueantes*
*Sergio Cortés decisión 2026-05-03 · post-validación preview v6 prólogo cinematográfico aprobado · canon cross-program forever*
