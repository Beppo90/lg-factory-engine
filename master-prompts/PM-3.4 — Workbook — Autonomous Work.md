# PM-3.4: WORKBOOK — AUTONOMOUS WORK

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.4 |
| **Nombre** | Workbook — Autonomous Work |
| **Versión** | 4.1 |
| **Last Verified** | 2026-04-30 |
| **Destinatario** | Aprendiz (documento para el estudiante) + Instructor (Answer Key separado) |
| **Función** | Generar los capítulos del Workbook que el aprendiz completa como trabajo autónomo entre sesiones presenciales |
| **Analogía** | Es el "gimnasio" de la guía — donde el aprendiz practica solo lo que vio en clase |
| **Volumen** | Un capítulo por sesión presencial que asigna trabajo autónomo (default: 7 capítulos para 8 sesiones) |
| **Phase** | 4 |
| **Depends On** | [PM-3.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.10] |
| **Trigger** | post_playbook_confirmation |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Mapa de trabajo autónomo (qué capítulo va después de qué sesión) | PM-3.1 (Playbook Outline) |
| Asignaciones detalladas por capítulo (qué hacer, cuánto tiempo) | PM-3.2 (Build-Out, sección WRAP-UP) |
| Contenido de los worksheets que el autónomo refuerza | PM-2.3 a PM-2.10 (Producción Fase 2) |
| **Arquetipos elegidos en Fase 2** | **PM-2.3 a PM-2.10 — los mismos arquetipos alimentan Guía + Workbook + Examen** |
| Texto ancla de Reading (para actividades de extensión) | PM-2.3 |
| Vocabulario clave (20 términos) | PM-1.2 |
| Grammar targets | PM-2.10 |
| Nivel CEFR | PM-1.2 |

> **NOTA:** Los PM-2.3 a PM-2.10 tienen TRIPLE PROPÓSITO. Los arquetipos que el instructor elige en Fase 2 no solo construyen la Guía de Aprendizaje — también alimentan el Workbook (REINFORCE/EXTEND/PREPARE) y el examen escrito. Un solo conjunto de arquetipos genera los 3 productos del estudiante.

---

## OUTPUT ESPERADO

**Documento 1 — Workbook (Aprendiz):**
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Workbook`**

Contiene 7 capítulos, cada uno con:
1. Encabezado (número de capítulo, título, sesión asociada, tiempo estimado)
2. Instrucciones claras en inglés con soporte bilingüe
3. Espacios para escribir/dibujar
4. Actividades con andamiaje integrado

**Documento 2 — Workbook Answer Key (Instructor):**
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Workbook Answer Key`**

Contiene respuestas para cada capítulo:
- Respuestas correctas donde aplique
- Criterios de evaluación para tareas abiertas
- Rúbricas simplificadas

---

## CAMBIO v2.0 — PRINCIPIO DE TRES VERSIONES

> [!info] Cambio v2.0 (2026-04-13)
> A partir de v2.0, el Workbook aplica el **Principio de Tres Versiones**:
> - **Versión 1 (Apropiación S2-S5):** Las tasks originales diseñadas en PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.10 — trabajadas en clase con el instructor.
> - **Versión 2 (Evaluación S6):** El cuestionario consolidado (25 pts) — tasks parecidas pero diferentes, para evaluación formal.
> - **Versión 3 (Workbook — esta versión):** Tasks adicionales de práctica autónoma — parecidas pero diferentes a las anteriores — para trabajo independiente.
> 
> Las tres versiones abordan el mismo contenido desde ángulos ligeramente distintos. No son las mismas tasks copiadas.

---

## EXTENSIÓN v4.0 — REINFORCE/EXTEND/PREPARE ANATOMÍA CANON (2026-04-30)

> [!warning] CANON v4.0 — Cada capítulo del Workbook usa estructura tripartita REINFORCE / EXTEND / PREPARE
> Promovido de operational evidence DIESEL-2026-04-19 (v4.0) + MGV-2026-04-20 (v4.1) a master prompt canon. Master prompt v2.0 quedaba shallow · solo documentaba "encabezado + instrucciones + spaces". Operational reality usa anatomía 3-section canon ya validada en runs DIESEL+MGV.

### REGLA 11 — ANATOMÍA TRIPARTITA POR CAPÍTULO (REINFORCE / EXTEND / PREPARE)

Cada capítulo del Workbook tiene **3 secciones canónicas** que reflejan el ciclo Apropiación → Autonomía → Pre-activación:

#### Sección 1 · REINFORCE (refuerzo de Apropiación · Bloom L1-L2)

- Revisita el contenido de la sesión presencial recién terminada
- Tasks parecidas a las trabajadas en clase pero DIFERENTES (Principio Tres Versiones · NO copy)
- Bloom Level: L1-L2 (Remember · Understand)
- Activities: labeling · matching · vocabulary_match · reflection · drill básico

```json
"reinforce": {
  "title": "string",
  "instructions_es": "string (bilingüe support)",
  "instructions_en": "string (primary instruction)",
  "duracion_min": int (15-25 min recomendado),
  "bloom_level": "L1-L2 (Remember, Understand)",
  "activities": [
    {
      "id": "ch{N}-r-a{X}",
      "type": "labeling | matching | vocabulary_match | reflection | drill",
      "title": "string",
      "items": [...] // o estructura por tipo
    }
  ]
}
```

#### Sección 2 · EXTEND (extensión HOTS · Bloom L3-L5)

- Lleva el contenido a aplicación · análisis · creación
- Aprendiz transfiere a contexto personal/profesional propio
- Bloom Level: L3-L5 (Apply · Analyze · Evaluate · Create)
- Activities: drawing/mapping · categorization+writing · justification · production

```json
"extend": {
  "title": "string",
  "instructions_es": "string",
  "instructions_en": "string",
  "duracion_min": int (15-25 min recomendado),
  "bloom_level": "L3-L5 (Apply, Analyze, Create)",
  "activities": [
    {
      "id": "ch{N}-e-a{X}",
      "type": "drawing | mapping | categorization | writing | justification | production",
      "title": "string",
      "prompt": "string (HOTS prompt)",
      "scaffolding": [...]
    }
  ]
}
```

#### Sección 3 · PREPARE (pre-activación flipped · sesión siguiente)

- Pre-activa contenido de la sesión PRÓXIMA (flipped learning canon)
- Aprendiz llega a clase con primer contacto al input
- Bloom Level: L1-L2 (Remember · Understand) primer contacto
- Activities: pre-reading + underlining · pre-listening + note-taking · vocabulary preview

```json
"prepare": {
  "title": "Pre-activation for S{N+1} — [tema]",
  "target_session": int (sesión siguiente),
  "instructions_es": "string",
  "instructions_en": "string",
  "duracion_min": int (10-20 min recomendado),
  "bloom_level": "L1-L2 (Remember, Understand) · primer contacto flipped",
  "activities": [
    {
      "id": "ch{N}-p-a{X}",
      "type": "pre_reading | pre_listening | vocabulary_preview",
      "title": "string",
      "content": "string | text | scaffolding"
    }
  ]
}
```

### REGLA 12 — VOLUMEN CANON v4.0 (8 capítulos · NO 7)

**Default canon v4.0:** 8 capítulos para una guía de 8 sesiones (NOT 7 como decía v2.0).

Razón canon v4.0:
- Cada sesión presencial S1-S8 puede tener trabajo autónomo asignado
- Total intensidad autónoma 6 horas distribuida en 8 chapters
- Última sesión S8 tiene "PREPARE for next guide" si aplica · o reflective close

**Para guías con N sesiones diferentes** (ej IMARPOR-CC 12 sesiones · single-guía Curso Complementario): N capítulos canónicos · 1 por sesión · respetando estructura tripartita.

### REGLA 13 — SCHEMA TOP-LEVEL CANON v4.0 (13 keys)

```json
{
  "version": "4.0",
  "pm_id": "PM-3.4",
  "run_id": "string",
  "guide": "string · ej 'Guía 1 — IMARPOR-CC'",
  "generated_at": "ISO-8601",
  "model": "string · LLM utilizado",
  "status": "draft | parametricity_test | completed",
  "header": { /* 9 sub-keys · programa metadata */ },
  "introduction": "string · párrafo motivacional bilingüe al aprendiz",
  "description": "string · qué cubre este Workbook",
  "chapters": [ /* N items · estructura tripartita REGLA 11 */ ],
  "consolidated_answer_key": {
    "note": "Las respuestas viven en documento separado Workbook Answer Key (Instructor)",
    "reinforce_keys_ref": "path/al/answer-key"
  },
  "derivation_source": {
    "playbook_ref": "pm-3-1.json",
    "learner_guide_ref": "pm-3-6.json",
    "activity_cards_ref": ["pm-2-3", "pm-2-4", "pm-2-5", "pm-2-6", "pm-2-10"],
    "final_mission_ref": "pm-3-5.json",
    "notes": "string · trazabilidad upstream"
  }
}
```

### REGLA 14 — TRAZABILIDAD UPSTREAM (derivation_source)

Cada Workbook DEBE documentar `derivation_source` con paths upstream:
- `playbook_ref` (PM-3.1 outline)
- `learner_guide_ref` (PM-3.6 GFPI-F-135)
- `activity_cards_ref` (lista PMs Fase 2 que alimentaron)
- `final_mission_ref` (PM-3.5)
- `notes` (cualquier decisión arquitectónica)

Esto cierra la cadena Phase 2 → Phase 3 → Phase 4 derivado · auditable.

### REGLA 15 — ANSWER KEY SEPARADO (consolidated_answer_key reference)

El Workbook del aprendiz NO tiene respuestas inline (REGLA 8 v2.0 strict). Pero el JSON canónico v4.0 incluye `consolidated_answer_key` con referencia al documento Answer Key del Instructor. Esto permite:
- Auditoría cross-section
- Generación posterior del Answer Key DOCX
- Validation que cada activity tiene respuesta canon

### REGLA 16 — bloom_level POR SECCIÓN OBLIGATORIO

Cada sección REINFORCE/EXTEND/PREPARE debe declarar `bloom_level` explícitamente:
- REINFORCE: "L1-L2 (Remember, Understand)"
- EXTEND: "L3-L5 (Apply, Analyze, Evaluate, Create)" — específico por activity si varía
- PREPARE: "L1-L2 (Remember, Understand) · primer contacto flipped"

Justificación: progresión Bloom canónica DM (Apropiación L1-2 → Workbook EXTEND L3-5 → Pre-activación L1-2 nuevo ciclo).

### Pipeline canónico v4.0

| Script (futuro · pendiente Hito 5) | Función | Input | Output |
|------|---------|-------|--------|
| `subagente_pm_3_4_workbook.py` | Camino 2 LLM bundle prep | Phase 4 inputs (load_phase4_inputs) | bundle Task tool |
| `validators · check-workbook-schema.js` | Schema validation v4.0 strict | pm-3-4.json | exit 0/1 |
| `lib/docx_renderer.py::render_pm_3_4_workbook` | Render learner DOCX (futuro) | pm-3-4.json | pm-3-4-workbook.docx |
| `lib/docx_renderer.py::render_pm_3_4_answer_key` | Render answer key DOCX | pm-3-4.json + answer key | pm-3-4-answer-key.docx |

### Caso-origen y estado canon v4.0

- **Run origen:** DIESEL-2026-04-19 v4.0 + MGV-2026-04-20 v4.1 (parametricity_test)
- **Capítulos:** 8 (DIESEL completed) · 8 (MGV piloto)
- **REINFORCE/EXTEND/PREPARE:** validado operacional en ambos runs
- **bloom_level por sección:** populated DIESEL · canon promovido v4.0

### Consecuencia arquitectónica v4.0

El Workbook deja de ser "encabezado + instrucciones + spaces" (v2.0 shallow) y pasa a ser **artefacto pedagógicamente estructurado tripartito** con:
- Refuerzo (Bloom L1-L2)
- Extensión HOTS (Bloom L3-L5)
- Pre-activación flipped (Bloom L1-L2 nuevo input)

Esto cierra el loop pedagógico Apropiación → Autonomía → Pre-activación canónicamente.

*Lección aprendida 2026-04-30 (audit disciplinado anti-patrón #15): Master prompt v2.0 quedaba shallow vs operational reality v4.0. Bump documenta canon ya operativo · cierra documental drift detectado en pre-flight 5 layers.*

---

## EXTENSIÓN v4.1 — PARITY CON PM-3.6 v2.7 ANATOMY 6-BLOQUE (2026-04-30)

> [!warning] CANON v4.1 — Cada actividad dentro de REINFORCE/EXTEND/PREPARE usa el mismo Activity Card schema v2.7 que PM-3.6 (anatomía 6-bloque learner-readable)
> Promovido por Sergio (audit anti-patrón #14): el Workbook (PM-3.4) y el Learning Guide (PM-3.6) son ambos documentos LEARNER-FACING · deben tener consistencia visual + estructural total. Renderer canónico v2.7 (`gen_audit_docx.js::renderActivityCard_v27`) puede reusarse para ambos.

### REGLA 17 — ACTIVITY CARD SCHEMA v2.7 PARITY (REINFORCE / EXTEND / PREPARE)

Cada `activities[*]` dentro de REINFORCE/EXTEND/PREPARE de cada chapter DEBE cumplir el schema canon v2.7 documentado en PM-3.6 §EXTENSIÓN v2.7 (REGLAS 22-27). Los **18 campos canónicos v2.7 OBLIGATORIOS** por activity:

```json
{
  "actividad_id":           "ch{N}-{r|e|p}-a{X}",   // ej "ch1-r-a1" · estructura chapter+section+activity
  "schema_version":         "v2.7",
  "titulo_en":              "string",
  "titulo_es":              "string",
  "tipo_actividad_sena":    "Actividad cognitiva | procedimental | actitudinal | combinaciones con ' + '",
  "actividad_tipo_label":   "label friendly · same as tipo_actividad_sena o variante",
  "tiempo_min":             int (subset de section.duracion_min),
  "agrupacion":             "individual | pares | grupo_pequeno | plenaria",
  "voc_dimension":          ["cognitiva", "procedimental", "actitudinal"],
  "produce_evidencia":      false,    // Workbook NO genera evidencia formal · siempre false
  "enunciado_voc": {
    "en": "Verbo + Objeto + Condición · gerund-less · ≤200 char",
    "es": "Verbo infinitivo + Objeto + Condición · ≤200 char",
    "_review_status": "DRAFT"
  },
  "descripcion_narrativa": {
    "en": "60-120 palabras · 3 movimientos: (1) Qué vas a hacer (2) Por qué importa (3) Promesa pedagógica · 2ª persona",
    "es": "Traducción support natural · NO equivalente literal · renderer pone italic DKGREY auto"
  },
  "paso_a_paso": [
    {"en": "...", "es": "..."},
    // 5-7 pasos canon v2.7
  ],
  "scaffold_inline": {
    "tipo": "matching | checklist | form | t_chart | writing_template | listening_capture | quiz_preview | speaking_script | reflection_lines | rating",
    "titulo_en": "...",
    "titulo_es": "...",
    "estructura": { /* específica al tipo · 10 canónicos */ }
  },
  "entregable": {
    "producto": {"en": "...", "es": "..."},
    "formato": {"en": "...", "es": "..."},
    "criterio_minimo": {"en": "...", "es": "..."}
  },
  "materiales": ["recurso 1", "recurso 2"],
  "evidencia": null,    // Workbook NO genera evidencia first-class · siempre null
  "activity_footer": {
    "ambiente": "string · espacio autónomo (casa · biblioteca · plataforma virtual)",
    "estrategia": "Trabajo Autónomo Guiado | ABT autónoma | Reflexión metacognitiva",
    "tecnica": "string · técnica didáctica específica de la activity",
    "materiales": "string concatenado",
    "material_apoyo": "Workbook Ch. X | audio recording | platform link | no aplica",
    "duracion_horas": "X.Y horas"
  }
}
```

### REGLA 18 — CAMPOS OBSOLETOS PROHIBIDOS (v4.1 strict · alineado con PM-3.6 REGLA 24)

Los siguientes campos NUNCA aparecen en PM-3.4 v4.1 activities (heredados de PM-3.6 REGLA 24):

| Campo obsoleto | Reemplazado por | Razón |
|----------------|------------------|-------|
| `nombre_aprendiz` | `titulo_en` + `titulo_es` | Bilingüismo first-class |
| `etiquetas_dimension` | `voc_dimension` (lowercase array) | Datos estructurados sin syntax label |
| `instruccion_2pers_en` | `descripcion_narrativa.en` + `paso_a_paso[].en` | Anatomía 6-bloque (descripción + pasos separados) |
| `instruccion_supervivencia_es` | `descripcion_narrativa.es` + `paso_a_paso[].es` | Anatomía 6-bloque bilingüe simétrica |
| `descripcion_aprendiz` | `descripcion_narrativa` | Cambio nombre canónico v2.6.3 → v2.7 |

Plus PM-3.4-specific shallow fields que se REEMPLAZAN por v2.7:
- ❌ `id` shallow → ✅ `actividad_id` canon
- ❌ `type` shallow → ✅ `tipo_actividad_sena` + `scaffold_inline.tipo` (split)
- ❌ `items` shallow → ✅ `scaffold_inline.estructura` per tipo canónico
- ❌ `prompt` flat → ✅ `enunciado_voc` + `descripcion_narrativa` + `paso_a_paso`
- ❌ `scaffold` string → ✅ `scaffold_inline` dict canon

### REGLA 19 — META OBLIGATORIO v4.1

```json
{
  "meta": {
    "activities_schema_version": "v2.7",
    "workbook_canon_version": "v4.1",
    "activities_rewritten_at": "ISO-8601",
    "anatomy_parity_with_pm36": true,
    "renderer_compatible": "gen_audit_docx.js::renderActivityCard_v27"
  }
}
```

### REGLA 20 — VISUAL RENDERING PATTERN v2.6.2 (idéntico PM-3.6)

PM-3.4 hereda el visual rendering pattern v2.6.2 de PM-3.6:

| Pattern | Aplicación |
|---------|------------|
| **EN-dominant + ES subordinado** | Inglés primary · español italic DKGREY auto-renderizado |
| **V+O+C invisible** | `enunciado_voc` JSON · NO renderizado como header visible (opcional · per master prompt) |
| **Breadcrumb dimensional sutil** | `voc_dimension` etiqueta visual mínima · NO bracket-syntax legacy |
| **Step numbers verde SENA** | `paso_a_paso` numeración renderizada en GREEN #39A900 |

### REGLA 21 — PALETA SENA v3.3 (idéntica PM-3.6 v2.6.6)

PM-3.4 DOCX renderer DEBE aplicar paleta SENA institucional:
- **Verde SENA `#39A900`** · accents · CTAs · step numbers · headers tablas
- **Azul oscuro SENA `#0B2E45`** · navyHeader · titles
- **DKGREY** · español italic subordinado
- **CREAM `#FFF6E8`** · evidencia formal cells (cuando aplique)

### REGLA 22 — PRINCIPIO TRES VERSIONES STRICT (alineado v4.0)

Reaffirma REGLA original v2.0 + REGLA 11 v4.0:
- **Versión 1 (Apropiación · PM-2.x · in-class):** tasks originales
- **Versión 2 (Evaluación S6 · PM-4.2):** cuestionario consolidado 25pts
- **Versión 3 (Workbook · PM-3.4):** tasks DIFERENTES de V1 y V2

Las activity cards v2.7 (REGLA 17) deben respetar este principio · NO copy literal de PM-3.6 actividades · son tasks NUEVAS pero canon-conforme schema.

### Pipeline canónico v4.1

| Script (futuro · Hito 5) | Función | Input | Output |
|------|---------|-------|--------|
| `subagente_pm_3_4_workbook.py` | Camino 2 LLM v4.1 strict | load_phase4_inputs + canon v2.7 anatomy strict | bundle Task tool |
| `validators · check-workbook-schema.js` | Schema v4.1 + v2.7 anatomy parity | pm-3-4.json | exit 0/1 |
| `lib/docx_renderer.py::render_pm_3_4_workbook` | Render learner DOCX (futuro · reuse PM-3.6 renderer) | pm-3-4.json | pm-3-4-workbook.docx |
| `gen_audit_docx.js::renderActivityCard_v27` | **MISMO renderer que PM-3.6** · canon v2.7 anatomy | activity card v2.7 | rendered card |

### Caso-origen v4.1

- **Run origen:** IMARPOR-CC-2026-04-27 v4.1 (NEW · primer run con anatomy 6-bloque parity)
- **Triggered por:** Sergio audit pregunta 2026-04-30 "PM-3.4 debe tener mismas configuraciones de formato y estructura que PM-3.6"
- **Anti-patrón #14 mitigation:** audit shallow no detectó parity gap · v4.1 documenta canon explícito

### Consecuencia arquitectónica v4.1

PM-3.4 (Workbook) y PM-3.6 (Learning Guide) ahora son **gemelos canon v2.7** desde el punto de vista de Activity Card schema:
- Mismo schema 18 fields anatomy 6-bloque
- Mismo renderer canónico (gen_audit_docx.js::renderActivityCard_v27)
- Misma paleta SENA + visual pattern v2.6.2
- Diferentes documentos · misma forma activity card

Esto cierra la consistencia learner-facing E2E · el aprendiz ve mismo formato visual en clase (Learning Guide · seccion_3) y en autonomía (Workbook · REINFORCE+EXTEND+PREPARE activities).

*Lección aprendida 2026-04-30 (anti-patrón #14 strict applied 2nd time): Mi audit "PASS canon v4.0 strict" verificó top-level schema + REINFORCE/EXTEND/PREPARE structure pero NO verificó parity de Activity Card anatomy con PM-3.6 v2.7. Sergio detectó · forzó bump v4.0 → v4.1 documentando parity OBLIGATORIA.*

---

## 10 REGLAS DE DISEÑO

### REGLA 1 — UN CAPÍTULO POR SESIÓN QUE ASIGNA TRABAJO
Cada sesión presencial que tiene trabajo autónomo genera un capítulo. Si una sesión no asigna trabajo (ej. Session 8), no hay capítulo.

**Default:** 7 capítulos (Ch. 1-7) para una guía de 8 sesiones.

### REGLA 2 — FORMATO WORKSHEET, NO EXAMEN
El Workbook es práctica guiada, NO evaluación. El tono es:
- ✅ *"Try this. Check your answers. Learn from mistakes."*
- ❌ *"Answer correctly or lose points."*

No hay nota, no hay puntaje. El aprendiz trabaja para entender, no para aprobar.

### REGLA 3 — BILINGÜE CON INSTRUCCIONES EN INGLÉS
Las instrucciones de cada actividad están en inglés (para exposición auténtica), con apoyo en español entre paréntesis SOLO para:
- Las directivas clave (qué hacer exactamente)
- Las palabras de supervivencia que no se han visto en la guía

Ejemplo:
> *"Write 3 sentences about your computer. / (Escribe 3 oraciones sobre tu computador.)"*

### REGLA 4 — SCAFFOLDING INTEGRADO
Cada actividad incluye andamiaje que el aprendiz puede usar:
- Sentence starters: *"The _______ is _______."*
- Word banks donde aplique
- Modelos de ejemplo
- Formulas de referencia

El scaffolding NO da la respuesta — guía el proceso.

### REGLA 5 — TIEMPO ESTIMADO POR CAPÍTULO
Cada capítulo indica el tiempo estimado de trabajo (30-60 min). La suma de todos los capítulos debe ser ≈6 horas (intensidad autónoma default).

### REGLA 6 — VINCULACIÓN EXPLÍCITA CON LA SESIÓN
Cada capítulo referencia la sesión presencial a la que está vinculado:
- "Assigned after Session X"
- "We will review this in Session X+1"

Esto crea la cadena de coherencia: clase → tarea → revisión en clase siguiente.

### REGLA 7 — ACTIVIDADES VARIADAS
Los capítulos NO son todos "fill in the blank." Variedad de tipos:
- Dibujo/etiquetado (Ch. 1)
- Lectura + subrayado (Ch. 2)
- Categorización + escritura (Ch. 3)
- Drill gramatical (Ch. 4)
- Escritura libre con revisión (Ch. 5)
- Reflexión metacognitiva (Ch. 6)
- Corrección de errores (Ch. 7)

### REGLA 8 — ANSWER KEY SEPARADO
Las respuestas NUNCA aparecen en el documento del aprendiz. Van en un documento separado para el instructor. El instructor usa el Answer Key para:
- Revisar rápidamente en la sesión siguiente
- Identificar patrones de error
- Dar feedback colectivo

### REGLA 9 — ESPACIO PARA ESCRIBIR/RESPONDER
Cada actividad tiene espacio designado para respuestas:
- Líneas para escribir (_______________)
- Cajas para clasificar
- Espacio amplio para párrafos
- Espacio para dibujar (si aplica)

### REGLA 10 — ZERO META-TALK
El output del Workbook es LISTO PARA USAR por el aprendiz. No incluye:
- ❌ Justificaciones pedagógicas
- ❌ Notas sobre por qué se diseñó así
- ❌ Referencias a marcos teóricos

Las justificaciones viven en PM-3.4 (este documento). El output es operativo.

---

## PROMPT PARA IA

```
Eres un diseñador de materiales didácticos para formación bilingüe ESP en el SENA, Colombia. Tu tarea: generar el WORKBOOK DE TRABAJO AUTÓNOMO — los capítulos que el aprendiz completa fuera del aula.

### DATOS DE ENTRADA (el instructor proporciona):

**Datos del programa:**
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Nivel CEFR: [default A1.1-A1.2]
- Intensidad autónoma: [default 6 horas]

**Mapa de trabajo autónomo (de PM-3.1):**
| Capítulo | Asignado en | Revisado en | Actividad | Tiempo |
|----------|-------------|-------------|-----------|--------|

**Contenido relevante de los worksheets (de PM-2.x):**
- Texto ancla de Reading (PM-2.3) — para actividades de extensión
- 20 términos clave (PM-1.2) — para categorización y práctica
- Grammar targets (PM-2.10) — para drills
- Writing model (PM-2.4) — para revisión guiada

### INSTRUCCIONES DE GENERACIÓN:

Para CADA capítulo genera:

#### CHAPTER [#]: [TÍTULO]
**Assigned after:** Session [#]
**We review this in:** Session [#]
**Estimated time:** [XX] minutes

**Instrucciones en inglés + español:**
[Actividades con instrucciones claras, bilingües, con scaffolding integrado]

**Espacios para respuestas:**
[Líneas, cajas, espacio para dibujar]

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto: no exceder el nivel de la guía
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Read the scenario (*Lee el escenario*). PROHIBIDO usar bloques repeditivos de 'Instrucciones'.
- Zero Meta-Talk: el output es el workbook listo para usar
- Scaffolding integrado: sentence starters, word banks, modelos
- Tiempo total ≈6 horas
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-3.1 | Mapa de trabajo autónomo (qué capítulo después de qué sesión) |
| **Depende de** | PM-3.2 | Asignaciones detalladas en cada WRAP-UP |
| **Depende de** | PM-2.3 | Texto ancla para actividades de extensión |
| **Depende de** | PM-1.2 | Vocabulario, grammar targets, nivel CEFR |
| **Alimenta a** | PM-3.2 (SET-UP) | El instructor revisa el Workbook en el SET-UP de la sesión siguiente |

---

*PM-3.4: Workbook — Autonomous Work — v4.0*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026 · v4.0 bump 2026-04-30 (operational canon promoted)*

---

## CHANGELOG MASTER PROMPT

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v2.0 | 2026-04-13 | Principio Tres Versiones · 7 capítulos default · estructura simple (encabezado + instrucciones + spaces) |
| **v4.0** | **2026-04-30** | **REINFORCE/EXTEND/PREPARE anatomía tripartita canon · 8 capítulos default (NOT 7) · bloom_level per sección · derivation_source trazabilidad · consolidated_answer_key separate · schema 13 top-level keys canon · REGLAS 11-16 documentadas (promoted from operational evidence DIESEL v4.0 + MGV v4.1)** |
| **v4.1** | **2026-04-30** | **PARITY CON PM-3.6 v2.7 ANATOMY 6-BLOQUE · Activity Card schema v2.7 OBLIGATORIO en cada activities[*] · 18 fields canon (actividad_id · schema_version · titulo_en/es · tipo_actividad_sena · actividad_tipo_label · tiempo_min · agrupacion · voc_dimension · produce_evidencia · enunciado_voc · descripcion_narrativa · paso_a_paso · scaffold_inline · entregable · materiales · evidencia · activity_footer) · 5 obsoletos PROHIBIDOS · meta.activities_schema_version: v2.7 · paleta SENA v3.3 + visual pattern v2.6.2 · renderer compatible gen_audit_docx.js::renderActivityCard_v27 · REGLAS 17-22 documentadas (anti-patrón #14 mitigation post-audit Sergio)** |

**v3.x skipped:** versions 3.x existieron como drafts internos en runs DIESEL/MGV pero nunca se documentaron formalmente en master prompt. v4.0 absorbe la evolución completa post-v2.0 hasta operational reality.
