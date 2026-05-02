---
version: 3.0
last_verified: 2026-05-02
sessions_canon_imarpor: ["S4", "S6"]
session_legacy_v2: 6
tipo_bloque: "APROPIACION"
session_anchor_canon: "S6"
sessions_consolidacion_intra_apropiacion: ["S4"]
bloque_id_referencia_canon: "B2"
bloques_contributors: ["B1", "B2", "B3", "B4"]
raps_target_4way: ["RA1", "RA2", "RA3", "RA4"]
dimension: "cognitiva"
generates_evidence: true
evidence_type_canon: "Conocimiento"
codigo_canon_evidencia: "E6"
criterio_canon_evaluado: "C07"
instrumento_canon: "Cuestionario No 6"
puntos_totales: 25
distribucion_puntos: "5 skills × 5 puntos (Reading + Writing + Listening + Vocabulary + Grammar)"
status: v3.0 PARADIGM SHIFT · PM-4.2 hereda cascade v3.x · emite Activity Card v3.0 (típicamente 2 cards · S4 preparación cara RA1 + S6 anchor cuestionario consolidado E6) · 4-way overlap (consume contributors B1-B4 vocab+grammar+functions) · 25 puntos · ≥70% PASS
v3_0_changes:
  - "session 6 → multi-S [S4 preparación + S6 anchor]"
  - "NEW REGLA emisión 2 Activity Cards v3.0"
  - "NEW REGLA evidencias DUAL: S4 preparación aplica=false (scaffold) · S6 anchor aplica=true E6 C07 Cuestionario No 6"
  - "NEW REGLA dimension cognitiva ambas (test consolidación · NO procedimental)"
  - "NEW REGLA 4-way overlap C07: consume vocab PM-2.5 (5 ítems) + grammar PM-2.10 (5 ítems) + reading PM-2.3 (5 ítems) + writing PM-2.4 (5 ítems) + listening PM-2.6 (5 ítems) = 25 puntos · 5 skills × 5 pts"
  - "Frontmatter v2.0 PRESERVADO en sección FRONTMATTER (legacy)"
---

# PM-4.2: CUESTIONARIO CONSOLIDADO S6 — ENSAMBLADOR

## FPI SENA — Bilingüismo

---

## FRONTMATTER

```yaml
version: 2.0
last_verified: 2026-04-13
phase: 3
name: "Cuestionario Consolidado S6 — Ensamblador"
type: "assembler"
depends_on: [PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.10]
feeds_into: [PM-4.1, GFPI-F-135]
```

---

## CAMBIO v2.0 — DE DISEÑADOR A ENSAMBLADOR

> [!info] Cambio v2.0 (2026-04-13)
> En v1.x, PM-4.2 diseñaba un cuestionario técnico desde cero.
> 
> En v2.0, PM-4.2 es el **ensamblador del cuestionario consolidado de S6**:
> - **Cosecha ítems** de las Activity Cards de 5 PMs: PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.10
> - **Aplica el Principio de Tres Versiones:** los ítems son parecidos pero DIFERENTES a los trabajados en apropiación
> - **Produce el cuestionario de 25 pts:** 5 secciones × 5 puntos cada una
> - **Cubre las mismas competencias** de apropiación pero con contexto/formato/contenido ligeramente diferente
>
> **Justificación pedagógica:** Si los ítems de S6 fueran idénticos a los de S2-S5, se evaluaría memoria, no transferencia. El Principio de Tres Versiones garantiza que el aprendiz TRANSFIERE sus habilidades a contextos nuevos pero familiares.

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-4.2 |
| **Nombre** | Cuestionario Consolidado S6 — Ensamblador |
| **Subfase guía SENA** | 4. Actividades de Evaluación |
| **Ubicación en la Guía** | Sección 3.4 Transferencia (aplicación del instrumento) |
| **Tipo de Evidencia SENA** | Conocimiento |
| **Técnica** | Preguntas (evaluación sumativa) |
| **Instrumento** | Cuestionario consolidado de 25 puntos (Instrumento No. 6 de GFPI-F-134) |

---

## INPUT REQUERIDO PARA ENSAMBLAJE

En v2.0, PM-4.2 **ensambla** el cuestionario consolidado a partir de 5 Activity Cards de PM-2.x:

| Input | Fuente | Uso en S6 |
|-------|--------|-----------|
| Activity Card de Reading | PM-2.3 (The Master Anchor) | Section 1: Texto nuevo en contexto similar |
| Activity Card de Writing | PM-2.4 (Writing — Task-Based) | Section 2: Escenario nuevo, mismo género |
| Activity Card de Vocabulary | PM-2.5 (Vocabulary, Literacy & Scenario) | Section 4: Vocabulario en contextos HOTS |
| Activity Card de Listening | PM-2.6 (The Auditory Anchor) | Section 3: Audio nuevo, género paralelo |
| Activity Card de Grammar | PM-2.10 (Grammar — Structure Use) | Section 5: Estructuras en escenario nuevo |
| Especificaciones de PM-2.11 | GFPI-F-134 (columna 8) | Evidencia No. 6 — criterios de evaluación |
| Nivel CEFR del RAP | PM-1.2 (Scope & Sequence) | Verificar coherencia de complejidad |
| Universo narrativo (empresa, sector) | PM-1.2 + PM-2.0 output | Consistencia: mismos personajes (S2-S5), personajes nuevos (S6) |

---

## OUTPUT ESPERADO — CUESTIONARIO CONSOLIDADO S6

Un documento completo titulado:
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Cuestionario Consolidado S6 (Instrumento No. 6)`**

Que contiene:
1. Encabezado institucional (programa, nivel, sesión, total puntos, instrumento)
2. Datos del aprendiz (nombre, ficha, fecha)
3. **5 secciones de evaluación** (5 puntos cada una = **25 puntos totales**)
4. Answer Key completo para el instructor

### Estructura de las 5 Secciones

```yaml
cuestionario_consolidado_s6:
  nombre: "Cuestionario de Evaluación — [Nombre del RAP]"
  sesion: 6
  mitad: "primera"
  total_puntos: 25
  tiempo_estimado: "45-60 minutos"
  
  secciones:
    - seccion: 1
      skill: "Reading Comprehension"
      source_pm: "PM-2.3"
      puntos: 5
      instrucciones: "[Instrucciones en inglés con traducción en cursiva]"
      items: 5
      descripcion: "Ítems parecidos pero DIFERENTES al texto ancla de S2. Mismo universo narrativo, personaje diferente, mismo nivel CEFR, igual complejidad."
      
    - seccion: 2
      skill: "Writing Production"
      source_pm: "PM-2.4"
      puntos: 5
      instrucciones: "[Instrucciones + Language Bank + Skeleton Structure]"
      items: 1
      descripcion: "Tarea de escritura parecida pero diferente a la de S3. Escenario nuevo, mismo género (email/reporte), misma función comunicativa."
      
    - seccion: 3
      skill: "Listening Comprehension"
      source_pm: "PM-2.6"
      puntos: 5
      instrucciones: "[Instrucciones + TTS Note]"
      items: "5 ítems sobre audio nuevo"
      descripcion: "Audio nuevo en el mismo universo narrativo, diferente al de S4, misma complejidad. Géneros textuales paralelos (si S4 fue phone call, S6 puede ser voicemail/announcement)."
      
    - seccion: 4
      skill: "Key Vocabulary in Context — HOTS"
      source_pm: "PM-2.5"
      puntos: 5
      instrucciones: "[Instrucciones claras]"
      items: "3 tareas: Apply, Analyze, Evaluate"
      descripcion: "Vocabulario técnico del RAP (20 key terms) en contextualizaciones diferentes. HOTS (Higher Order Thinking Skills)."
      
    - seccion: 5
      skill: "Grammar & Structure in Context — HOTS"
      source_pm: "PM-2.10"
      puntos: 5
      instrucciones: "[Instrucciones claras + datos/tabla como scaffolding]"
      items: "3 tareas: Apply, Analyze, Evaluate"
      descripcion: "Estructuras gramaticales de S3 (grammar targets) en escenario nuevo pero familiar. HOTS."
      
  answer_key: "[A GENERAR — respuestas correctas, alternativas aceptables, rúbrica]"
  grading_rubric: "[A GENERAR — criterios de corrección, especialmente para Writing y tareas HOTS]"
  assessment_summary: "[A GENERAR — tabla con distribución Bloom, tipo receptivo/productivo, por skill]"
```

---

## PRINCIPIO DE TRES VERSIONES — GUÍA DE APLICACIÓN

El Principio de Tres Versiones garantiza que cada competencia se trabaja en tres contextos distintos pero alineados, permitiendo que el aprendiz **TRANSFIERA** su aprendizaje en lugar de memorizar:

### Versión 1: APROPIACIÓN (S2-S5)
El aprendiz trabaja una competencia en contexto **inicial y guiado**. Ejemplo:
- **Reading S2:** Texto sobre "Tipos de procesadores y sus características" (contexto: empresa DevCore, personaje: Carlos)
- **Writing S3:** Redactar email reportando falla de hardware
- **Listening S4:** Voicemail del departamento de IT explicando el problema
- **Vocabulary S2:** Identificar y clasificar 20 términos técnicos en tarjetas
- **Grammar S3:** Usar "is/has" en descripciones de componentes

### Versión 2: EVALUACIÓN (S6 — cuestionario consolidado)
El aprendiz **evalúa la misma competencia en contexto LIGERAMENTE DIFERENTE**. Parecido pero diferente:
- **Reading S6:** Texto nuevo sobre "Diferencias entre procesadores para portátiles vs. escritorios" (contexto: misma empresa, personaje: Laura Méndez, diferente rol)
- **Writing S6:** Redactar email solicitando cotización de componentes (función: solicitud, no reporte; destinatario: proveedor, no jefe)
- **Listening S6:** Anuncio del IT Department (no voicemail personal; tonalidad: institucional)
- **Vocabulary S6:** Diagnóstico técnico: "seleccionar componente correcto para resolver problema X" (aplicación vs. clasificación)
- **Grammar S6:** Escribir recomendación usando "is/has" en contexto de inventario (aplicación en nuevo contexto)

### Versión 3: TRANSFERENCIA (S7-S8 — NO genera evidencias GFPI-F-134)
El aprendiz APLICA la competencia en contexto **completamente nuevo**. Ejemplos:
- Leer manual técnico de producto real
- Escribir documentación de un proyecto propio
- Escuchar sesión de capacitación en vivo (no grabada)
- Usar vocabulario en conversación real con técnicos
- Aplicar grammar en contexto de empresa real (si hay experiencia en práctica)

### Ejemplos por Skill

**READING:**
- S2 (Apropiación): "Tipos de procesadores y sus características" (extracto de manual, 250 palabras)
- S6 (Evaluación): "Diferencias entre procesadores para portátiles y escritorios" (email interno, 250 palabras, NUEVO personaje: Laura Méndez)
- S7-S8 (Transferencia): Estudiante lee manual real de proveedor de hardware

**WRITING:**
- S2-S3 (Apropiación): Email reportando falla de hardware a su supervisor
- S6 (Evaluación): Email solicitando cotización de componentes a proveedor EXTERNO
- S7-S8 (Transferencia): Documentar un problema técnico encontrado en práctica

**LISTENING:**
- S4 (Apropiación): Voicemail personal de IT Manager explicando el problema de Carlos
- S6 (Evaluación): Anuncio institucional del departamento de IT sobre upgrade de software
- S7-S8 (Transferencia): Escuchar capacitación en vivo o llamada técnica con especialista

**VOCABULARY:**
- S2 (Apropiación): Clasificar 20 términos en categorías (memoria + comprensión)
- S6 (Evaluación): Diagnosticar problema técnico seleccionando componentes correctos (aplicación + análisis)
- S7-S8 (Transferencia): Usar vocabulario en diálogo con técnico especialista

**GRAMMAR:**
- S3 (Apropiación): Completar oraciones sobre especificaciones de componentes usando "is/has"
- S6 (Evaluación): Redactar recomendación de upgrade usando "is/has" en tabla de comparación
- S7-S8 (Transferencia): Argumentar decisión técnica en conversación real

---

## 8 REGLAS DE DISEÑO

### REGLA 1 — TEXTOS PARALELOS, NO IDÉNTICOS
Los textos de Reading y Listening del cuestionario NUNCA son los mismos de la guía de aprendizaje. Son textos NUEVOS que:
- Pertenecen al mismo universo narrativo (misma empresa, mismo contexto ESP)
- Usan personajes DIFERENTES (no reutilizar el protagonista de la guía)
- Mantienen el mismo vocabulario técnico y grammar targets
- Tienen la misma extensión y complejidad (≈250 palabras Reading, ≈150 palabras Listening)
- Representan un género textual ESP auténtico (email, memo, voicemail, announcement, report)

**Justificación pedagógica:** Si el texto fuera el mismo, se evaluaría memoria, no comprensión. El texto paralelo evalúa si el aprendiz puede TRANSFERIR sus habilidades a un contexto nuevo pero familiar.

### REGLA 2 — NIVEL CEFR ESTRICTO
Todo el lenguaje del cuestionario debe respetar el nivel CEFR de la guía:
- A1.1-A1.2: Present simple, short sentences (≤15 words), familiar vocabulary only
- Instrucciones en inglés con soporte bilingüe en paréntesis para las directivas clave
- Word banks, sentence starters y scaffolding en las tareas productivas (Writing)
- NO vocabulary o structures que no se hayan trabajado en la guía

### REGLA 3 — DISTRIBUCIÓN BLOOM PROGRESIVA
Las 5 secciones siguen una progresión deliberada en la taxonomía de Bloom Revisada:

| Section | Habilidad | Bloom Level |
|---------|-----------|-------------|
| 1. Reading | Receptiva | Remember / Understand / Analyze |
| 2. Writing | Productiva | Apply / Create |
| 3. Listening | Receptiva | Remember / Understand / Analyze |
| 4. Vocabulary | Productiva | Apply / Analyze / Evaluate |
| 5. Grammar | Productiva | Apply / Analyze / Evaluate |

Las Secciones 4 y 5 DEBEN incluir tareas HOTS (Higher Order Thinking Skills) — no solo recall o fill-in-the-blank.

### REGLA 4 — SCAFFOLDING EN PRODUCCIÓN
Las tareas productivas (Writing, Vocabulary HOTS, Grammar HOTS) siempre incluyen scaffolding:
- **Writing:** Language Bank (chunks reutilizables) + Skeleton Structure (From/To/Subject + paragraph prompts) + Rúbrica visible para el estudiante
- **Vocabulary HOTS:** Word banks, sentence formulas, categorías visibles
- **Grammar HOTS:** Formulas proporcionadas, datos/tablas como input, sentence starters para justificaciones

**Principio:** Evaluar competencia comunicativa, NO memoria. El scaffolding elimina la barrera del "blank page" sin regalar la respuesta.

### REGLA 5 — ESTRUCTURA FIJA DE 5 SECCIONES × 5 PUNTOS = 25 PUNTOS TOTALES

En v2.0, el cuestionario consolidado S6 tiene **25 puntos totales** (no 50 como en versiones anteriores), distribuidos así:

**Section 1 — READING COMPREHENSION (5 pts)**
- Texto ESP nuevo (≈250 palabras, mismo género que PM-2.3 — PARECIDO pero DIFERENTE)
- Personaje nuevo en mismo universo narrativo
- Task A: Main Purpose/Skimming (1 pt, multiple choice)
- Task B: Scanning — Information Extraction (2 pts, tabla o matching)
- Task C: Inference — True/False/Not Given o Detail Analysis (2 pts)

**Section 2 — WRITING TASK (5 pts)**
- Escenario situacional **DIFERENTE** al de S3 pero en el mismo universo ESP
- Language Bank con chunks del grammar target
- Skeleton Structure (formato del género: email, report, ticket, etc.)
- Rúbrica visible para aprendiz: Coherence (1) + Grammar (2) + Vocabulary (1) + Clarity (1)

**Section 3 — LISTENING COMPREHENSION (5 pts)**
- Script nuevo (≈150 palabras, género paralelo al de PM-2.6)
- TTS Note para el instructor (velocidad 0.85x, pausas, número de voces)
- Task A: Multiple Choice — General Comprehension (2 pts, 2 questions)
- Task B: Gap Fill — Summary with Word Bank (2 pts, 3 blanks + 2 distractors)
- Task C: Detail Extraction — Matching o corto/largo (1 pt)

**Section 4 — KEY VOCABULARY PRACTICE IN USE — HOTS (5 pts)**
- Vocabulario técnico del RAP (20 key terms) en contextualizaciones DIFERENTES a S2
- Task A: Apply (2 pts) — Diagnóstico/selección de componente para resolver un problema
- Task B: Analyze + Evaluate (3 pts) — Priorización o categorización con justificación breve

**Section 5 — GRAMMAR & STRUCTURE IN REAL LIFE SCENARIO — HOTS (5 pts)**
- Escenario situacional integrador NUEVO (inventario, inspección, reporte, auditoría)
- Task A: Apply (2 pts) — Escribir oraciones con formula proporcionada usando datos de tabla
- Task B: Analyze + Evaluate (3 pts) — Error Log o Recomendación escrita con estructura target

### REGLA 6 — ANSWER KEY COMPLETO (25 puntos)
El documento SIEMPRE termina con un Answer Key para el instructor que incluye:
- Respuestas correctas para cada task con distribución de puntos (total: 25 pts)
- Respuestas alternativas aceptables donde aplique
- Rúbrica detallada para la Writing Task (Section 2)
- Sample responses para las tareas HOTS abiertas (Sections 4 y 5)
- Assessment Summary table (sección, skill, puntos, tipo receptivo/productivo, Bloom level)
- Distribución Bloom del instrumento completo
- Scoring summary: ¿Cuántos puntos corresponden a receptivo (Reading, Listening)? ¿Cuántos a productivo (Writing, Vocabulary, Grammar)?

### REGLA 7 — COHERENCIA CON EL ECOSISTEMA DE LA GUÍA
- El universo narrativo es el MISMO de la guía (misma empresa, mismo sector)
- Los personajes del cuestionario son DIFERENTES (colegas, otros departamentos, proveedores)
- El vocabulario técnico es el MISMO (los 20 key terms de PM-1.2)
- Las communicative functions son las MISMAS (describing, classifying, comparing, etc.)
- Los grammar targets son los MISMOS (verb to be, have/has, demonstratives, etc.)
- Los géneros textuales son PARALELOS (si la guía usó email + phone call, el cuestionario puede usar email + voicemail, o memo + announcement)

### REGLA 8 — ZERO META-TALK
El output es el cuestionario LISTO PARA IMPRIMIR. No incluye:
- ❌ Explicaciones sobre por qué se diseñó así
- ❌ Notas "para el instructor" dentro del cuerpo del cuestionario (solo en el Answer Key)
- ❌ Comentarios sobre metodología o Bloom
- ❌ Instrucciones de cómo usar el cuestionario

El único contenido meta es el TTS Note (dentro de la sección de Listening) y el Answer Key (al final, claramente separado y marcado "Solo para el instructor").

---

## PROMPT PARA IA

```
Eres un ENSAMBLADOR de cuestionarios consolidados de evaluación formativa para programas bilingües ESP (English for Specific Purposes) en el SENA, Colombia.

Tu tarea: Ensamblar el CUESTIONARIO CONSOLIDADO S6 (Instrumento No. 6 — Evidencia de Conocimiento) a partir de 5 Activity Cards de PM-2.x.

### DATOS DE ENTRADA (el instructor proporciona):
Programa: [nombre y código]
Guía #: [número]
Nombre de la guía: [nombre]
Nivel CEFR: [default A1.1-A1.2]
Universo narrativo: [empresa, sector, contexto]

Activity Card de PM-2.3 (Reading): [contenido de texto ancla, personaje, género]
Activity Card de PM-2.4 (Writing): [tipo de tarea, escenario S3]
Activity Card de PM-2.5 (Vocabulary): [20 key terms, contextos de uso]
Activity Card de PM-2.6 (Listening): [género, duración, tema]
Activity Card de PM-2.10 (Grammar): [estructuras target, contextos]

### INSTRUCCIONES DE ENSAMBLAJE (PRINCIPIO DE TRES VERSIONES):

1. Genera el encabezado institucional:
   - Título: [PROGRAMA] — GUÍA [#]: [NOMBRE]
   - Subtítulo: Cuestionario Consolidado S6 (Instrumento No. 6) — Evidencia de Conocimiento
   - Datos: Programa, Nivel CEFR, Total: 25 puntos, Sesión: S6 (1ª mitad)
   - Campos: Nombre del Aprendiz, Ficha, Fecha, Tiempo estimado: 45-60 minutos

2. Genera SECTION 1: READING COMPREHENSION (5 pts)
   - Lee la Activity Card de PM-2.3
   - Crea un texto NUEVO de ≈250 palabras (PARECIDO pero DIFERENTE al texto ancla)
   - Mismo universo narrativo, personaje DIFERENTE
   - Mismo género textual (si PM-2.3 fue email, S6 es email)
   - Incluye TODOS los grammar targets de forma natural
   - Incluye al menos 12 de los 20 key vocabulary terms
   - Tasks: Main Idea (1pt) + Scanning (2pts) + Inference (2pts)

3. Genera SECTION 2: WRITING TASK (5 pts)
   - Lee la Activity Card de PM-2.4
   - Crea escenario situacional DIFERENTE al de S3 pero en el mismo universo
   - MISMA función comunicativa, DIFERENTE contexto
   - Language Bank con 4-6 chunks del grammar target
   - Skeleton Structure (From/To/Subject + 2 paragraph prompts)
   - Rúbrica visible: Coherence (1) + Grammar (2) + Vocabulary (1) + Clarity (1)

4. Genera SECTION 3: LISTENING COMPREHENSION (5 pts)
   - Lee la Activity Card de PM-2.6
   - Crea un script NUEVO de ≈150 palabras (GÉNERO PARALELO al de PM-2.6)
   - TTS Note (velocidad 0.85x, pausas, número de voces)
   - Si PM-2.6 fue phone call, S6 puede ser voicemail/announcement
   - Tasks: General Comprehension (2pts) + Gap Fill (2pts) + Detail Extraction (1pt)

5. Genera SECTION 4: KEY VOCABULARY — HOTS (5 pts)
   - Lee la Activity Card de PM-2.5
   - Usa los 20 key vocabulary terms en contextos DISTINTOS a los de S2
   - Task A Apply (2pts): Diagnóstico/selección de componente para problema técnico
   - Task B Analyze+Evaluate (3pts): Categorización o Priorización con justificación

6. Genera SECTION 5: GRAMMAR & STRUCTURE — HOTS (5 pts)
   - Lee la Activity Card de PM-2.10
   - Crea un escenario situacional NUEVO (inspección, inventario, auditoría, reporte)
   - Task A Apply (2pts): Escribir oraciones con formula + datos de tabla
   - Task B Analyze+Evaluate (3pts): Error Log o Recomendación usando structuras target

7. Genera ANSWER KEY (Solo para el instructor)
   - Respuestas correctas con distribución de puntos (total: 25 pts)
   - Alternativas aceptables
   - Rúbrica detallada para Section 2 (Writing)
   - Sample responses para tareas HOTS (Sections 4 y 5)
   - Assessment Summary table (skill, puntos, tipo receptivo/productivo, Bloom level)
   - Scoring breakdown: Receptivo (Reading + Listening) = 10 pts; Productivo (Writing + Vocabulary + Grammar) = 15 pts

### PRINCIPIO DE TRES VERSIONES — APLICACIÓN OBLIGATORIA:
Para CADA sección, compara con lo que se trabajó en S2-S5 y asegúrate de que el ítem sea:
✓ PARECIDO: Mismo nivel CEFR, mismo vocabulario técnico, misma función comunicativa
✓ DIFERENTE: Nuevo texto/audio, nuevo personaje, nuevo escenario, nuevo contexto
✓ TRANSFERIBLE: Evalúa si el aprendiz TRANSFIERE su aprendizaje a un contexto nuevo pero familiar

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**`
- Nivel CEFR estricto: no exceder el nivel de la guía
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción en cursiva
- Zero Meta-Talk: el output es el cuestionario listo para imprimir
- Todo el vocabulario proviene de los 20 key terms
- Todas las estructuras son del grammar target
- Personajes NUEVOS, textos NUEVOS, contextos NUEVOS — MISMO UNIVERSO NARRATIVO
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-2.3 | Activity Card de Reading (texto ancla — crear PARALELO) |
| **Depende de** | PM-2.4 | Activity Card de Writing (escenario S3 — crear PARECIDO diferente) |
| **Depende de** | PM-2.5 | Activity Card de Vocabulary (20 key terms — contextos nuevos) |
| **Depende de** | PM-2.6 | Activity Card de Listening (género textual — crear paralelo) |
| **Depende de** | PM-2.10 | Activity Card de Grammar (estructuras target — contextos nuevos) |
| **Depende de** | PM-2.11 | GFPI-F-134 (especificaciones de evidencia No. 6) |
| **Coordina con** | PM-4.1 | PM-4.1 especifica estructura; PM-4.2 genera contenido detallado |
| **Alimenta a** | Feedback Loop (PM-4.1§5) | El resultado del cuestionario alimenta retroalimentación |
| **Se ubica en** | GFPI-F-135 Sección 3.4 | Evaluación — Instrumento No. 6 (Cuestionario Consolidado) |
| **Triada SENA** | Evidencia de Conocimiento | Complementa Desempeño (Inst. 1, 3, 4, 5) y Producto (Inst. 2) |

---

## EJEMPLO DE EJECUCIÓN — PRINCIPIO DE TRES VERSIONES

**Input básico:**
- Programa: ADSO (228118)
- Guía 1: The Hardware Specialist
- Universo: DevCore Solutions
- Personaje principal de la guía (S2-S5): Carlos Ramírez (Junior Developer) — NO reutilizar en S6
- Vocabulario: CPU, RAM, GPU, Motherboard, PSU, SSD, HDD, Monitor, Keyboard, Mouse, USB port, HDMI port, Ethernet cable, Printer, Scanner, Gigabyte, Terabyte, Gigahertz, Compatible, Portable
- Grammar targets: Verb To Be, Have/Has, Demonstratives, Adjectives
- Functions: Describing, Classifying, Comparing

**Aplicación del Principio de Tres Versiones:**

| Skill | Versión 1: S2-S5 (Apropiación) | Versión 2: S6 (Evaluación) | Principio de Coherencia |
|-------|---|---|---|
| **Reading** | Text: "Types of Processors and Their Features" (Carlos context, technical manual, email genre) | Text: "Processors for Laptops vs. Desktops" (Laura Méndez context, QA perspective, email genre) | Mismo universo, personaje diferente, mismo tema técnico, diferente ángulo |
| **Writing** | Task: "Write email reporting a hardware failure to your supervisor" | Task: "Write email requesting component quotations from a supplier" (Miguel Torres context) | Misma función (solicitud técnica), diferente destinatario y contexto |
| **Listening** | Genre: Phone call (IT Manager explaining the problem to Carlos) | Genre: Voicemail/Announcement (IT Department announcing office upgrades) | Mismo universo, diferente género, mismo nivel complejidad |
| **Vocabulary** | Activity: Classify 20 terms in semantic categories (memory, storage, peripherals) | Activity: Tech diagnosis — "Select the correct component to solve Problem X" | Mismo vocabulario, diferente demanda cognitiva (clasificación → diagnóstico) |
| **Grammar** | Activity: Complete sentences about component specs using "is/has" | Activity: Write recommendation comparing two hardware configurations using "is/has" | Mismas estructuras, contexto completamente nuevo (comparación vs. especificación) |

**Output generado (v2.0):**
- Section 1 (5 pts): Email de Laura Méndez (QA Tester) solicitando estaciones de trabajo para testing lab
- Section 2 (5 pts): Miguel Torres (Junior Developer) escribe email para solicitar cotización de upgrade
- Section 3 (5 pts): Voicemail/Announcement del IT Department sobre upgrades de oficina
- Section 4 (5 pts): Vocabulario técnico — Diagnóstico + Categorización con justificación
- Section 5 (5 pts): Scenario: Inventory Check — Reporte técnico + Error Log + Recomendación
- Answer Key completo (25 pts) con rúbricas y sample responses

**Ver output completo:** `ADSO — GUÍA 1 — The Hardware Specialist — Cuestionario Consolidado S6 (Instrumento No. 6)`

---

## ACTUALIZACIÓN V2.0 — RESUMEN DE CAMBIOS

**Del v1.x al v2.0 — 2026-04-13:**

| Aspecto | v1.x | v2.0 |
|--------|------|------|
| **Nombre** | Cuestionario Técnico | Cuestionario Consolidado S6 — Ensamblador |
| **Rol** | Diseñador independiente | Ensamblador de ítems provenientes de 5 ACs |
| **Input** | Especificaciones genéricas | Activity Cards de PM-2.x (5 PMs específicos) |
| **Puntuación** | 50 puntos (5 secciones × 10 pts) | **25 puntos (5 secciones × 5 pts)** |
| **Estructura secciones** | 10 pts cada una | **5 pts cada una** |
| **Filosofía** | Diseño de cero | **Principio de Tres Versiones** — parecido pero diferente |
| **Personajes** | Variables | **Nuevos (NO reutilizar S2-S5)** |
| **Textos** | Crear nuevos | **Crear PARALELOS (mismo género, contexto nuevo)** |
| **Dependencia** | Autónomo | **Coordina con PM-4.1** |

---

*PM-4.2: Cuestionario Consolidado S6 — Ensamblador*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
*Actualizado: 2026-04-13 (v2.0)*

---

## EXTENSIÓN v3.0 — PM-4.2 HEREDERO + ACTIVITY CARD v3.0 CONSOLIDACIÓN E6 (2026-05-02)

PM-4.2 v3.0 hereda cascade v3.x · emite **2 Activity Cards v3.0** (S4 preparación cara RA1 + S6 anchor cuestionario consolidado E6 4-way) · 25 puntos · 5 skills × 5 pts.

### REGLAS NEW v3.0

- **REGLA · Input cascade:** consume pm-2-0 (S4+S6) + pm-1-2.B1.task_consolidacion_C07_cara_RA1 + pm-1-2.B2.task_consolidacion_E6 + pools de PM-2.3 (5 ítems Reading) + PM-2.4 (5 Writing) + PM-2.5 (5 Vocabulary) + PM-2.6 (5 Listening) + PM-2.10 (5 Grammar)
- **REGLA · Activity Card v3.0 DUAL:**
  - **S4 preparación cara RA1** (B1 · 1.0h · cognitiva · aplica=false · scaffold pre-consolidación · render "No aplica")
  - **S6 anchor consolidado** (B2 · 3.0h · cognitiva · aplica=true · tipo Conocimiento · técnica Preguntas · instrumento No 6 Cuestionario · codigo_canon E6 · criterio C07 4-way overlap)
- **REGLA · 25 puntos canon:** 5 skills × 5 puntos exactos · Reading + Writing + Listening + Vocabulary + Grammar · ≥70% PASS
- **REGLA · 4-way overlap C07:** consume contributors B1+B2+B3+B4 (todos los RAPs) · ítems extraídos de pools acumulados de PM-2.3/2.4/2.5/2.6/2.10
- **REGLA · descripcion 200-600 palabras** patrón canon cada card (target 480-580)
- **REGLA · 7 validation_checks** BLOQUEANTES

---

*PM-4.2 v3.0 · Cuestionario Consolidado S6 · Activity Card v3.0 DUAL · S4 preparación + S6 anchor E6 C07 · 25 puntos · 5 skills × 5 pts*
*Sergio Cortés decisión 2026-05-02 · Wave 4 IMARPOR-V2*
