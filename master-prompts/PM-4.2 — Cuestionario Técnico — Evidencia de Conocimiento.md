# PM-4.2: CUESTIONARIO TÉCNICO — EVIDENCIA DE CONOCIMIENTO

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-4.2 |
| **Nombre** | Cuestionario Técnico — Evidencia de Conocimiento |
| **Subfase guía SENA** | 4. Actividades de Evaluación |
| **Ubicación en la Guía** | Sección 3.4 Transferencia (aplicación del instrumento) |
| **Tipo de Evidencia SENA** | Conocimiento |
| **Técnica** | Formulación de preguntas |
| **Instrumento** | Cuestionario escrito de 50 puntos |

---

## INPUT REQUERIDO

Este prompt necesita los outputs de TODOS los prompts anteriores de la guía:

| Input | Fuente |
|-------|--------|
| Nombre del programa, código, guía, macro-temática | PM-1.2 (Scope & Sequence) |
| Vocabulario clave (20 términos) | PM-1.2 (Key Vocabulary Table) |
| Texto ancla de Reading (para generar texto PARALELO, no idéntico) | PM-2.3 (The Master Anchor) |
| Script de Listening (para generar audio PARALELO, no idéntico) | PM-2.6 (The Auditory Anchor) |
| Grammar targets (estructuras gramaticales de la guía) | PM-2.10 (Grammar & Structure Use) |
| Communicative functions (describing, classifying, comparing, etc.) | PM-1.2 (Content Core) |
| Universo narrativo (empresa, personajes, contexto ESP) | Coherencia del ecosistema de la guía |
| Nivel CEFR | Parámetro estándar (default A1.1-A1.2) |

---

## OUTPUT ESPERADO

Un documento completo titulado:
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Cuestionario Técnico (IE-01)`**

Que contiene:
1. Encabezado institucional (programa, nivel, total puntos, instructor)
2. Datos del aprendiz (nombre, ficha, fecha)
3. 5 secciones de evaluación (10 puntos cada una = 50 total)
4. Answer Key completo para el instructor

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

### REGLA 5 — ESTRUCTURA FIJA DE 5 SECCIONES × 10 PUNTOS

**Section 1 — READING COMPREHENSION (10 pts)**
- Texto ESP nuevo (≈250 palabras, mismo género que PM-2.3)
- Task A: Skimming — Main Purpose (2 pts, multiple choice)
- Task B: Scanning — Information Extraction (3 pts, tabla)
- Task C: Main Ideas — True/False/Not Given (3 pts, 3 statements)
- Task D: Author's Purpose — Detail Analysis (2 pts, multiple choice)

**Section 2 — WRITING TASK (10 pts)**
- Escenario situacional diferente al de la guía pero en el mismo universo ESP
- Language Bank con chunks del grammar target
- Skeleton Structure (formato del género: email, report, ticket, etc.)
- Rúbrica visible: Format (2) + Grammar Accuracy (3) + Vocabulary Use (3) + Communicative Clarity (2)

**Section 3 — LISTENING COMPREHENSION (10 pts)**
- Script nuevo (≈150 palabras, género diferente al de PM-2.4 si es posible)
- TTS Note para el instructor (velocidad 0.85x, pausas, número de voces)
- Task A: Multiple Choice — General Comprehension (3 pts, 3 questions)
- Task B: Gap Fill — Summary with Word Bank (4 pts, 4 blanks + 2 distractors)
- Task C: Detail Extraction — Matching (3 pts, 3 items)

**Section 4 — KEY VOCABULARY PRACTICE IN USE — HOTS (10 pts)**
- Task A: Apply (3 pts) — Diagnóstico/selección de componente para resolver un problema
- Task B: Analyze (4 pts) — Odd One Out + Justificación escrita con grammar target ("The [X] is not a [category] because it is a [correct category]")
- Task C: Evaluate (3 pts) — Priorización con presupuesto limitado + justificación de cada elección

**Section 5 — GRAMMAR & STRUCTURE IN REAL LIFE SCENARIO — HOTS (10 pts)**
- Escenario situacional integrador (inventario, inspección, reporte, auditoría)
- Task A: Apply (3 pts) — Escribir oraciones con formula proporcionada usando datos de una tabla
- Task B: Analyze (4 pts) — Error Log: identificar error + corregir + explicar la regla
- Task C: Evaluate (3 pts) — Recomendación escrita usando demonstratives + comparisons (u otra estructura target de la guía)

### REGLA 6 — ANSWER KEY COMPLETO
El documento SIEMPRE termina con un Answer Key para el instructor que incluye:
- Respuestas correctas para cada task con distribución de puntos
- Respuestas alternativas aceptables donde aplique
- Rúbrica detallada para la Writing Task
- Sample responses para las tareas HOTS abiertas
- Assessment Summary table (sección, topic, puntos, tipo receptivo/productivo)
- Distribución Bloom del instrumento

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
Eres un diseñador de instrumentos de evaluación para formación bilingüe ESP (English for Specific Purposes) en el SENA, Colombia.

Tu tarea: Generar el CUESTIONARIO TÉCNICO (IE-01) — Evidencia de Conocimiento para la guía indicada.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Macro-Temática: [nombre]
- Nivel CEFR: [default A1.1-A1.2]
- Universo narrativo: [empresa, sector, contexto]
- Personaje principal de la guía: [nombre y rol — NO reutilizar]
- Vocabulario clave: [20 términos de PM-1.2]
- Grammar targets: [estructuras de PM-2.10]
- Communicative functions: [funciones de PM-1.2]
- Género textual de Reading en la guía: [email, memo, report, etc.]
- Género textual de Listening en la guía: [phone call, voicemail, etc.]

### INSTRUCCIONES DE GENERACIÓN:

1. Genera el encabezado institucional:
   - Título: [PROGRAMA] — GUÍA [#]: [NOMBRE]
   - Subtítulo: Cuestionario Técnico (IE-01) — Evidencia de Conocimiento
   - Datos: Programa, Nivel CEFR, Total: 50 puntos, Instructor
   - Campos: Nombre del Aprendiz, Ficha, Fecha

2. Genera SECTION 1: READING COMPREHENSION (10 pts)
   - Crea un texto NUEVO de ≈250 palabras en el mismo universo narrativo
   - Usa un personaje DIFERENTE al de la guía
   - Mismo género textual o paralelo (email → email, memo → memo)
   - Incluye TODOS los grammar targets de forma natural
   - Incluye al menos 12 de los 20 key vocabulary terms
   - Genera 4 tasks: Skimming (2pts), Scanning (3pts), T/F/NG (3pts), Author's Purpose (2pts)

3. Genera SECTION 2: WRITING TASK (10 pts)
   - Escenario situacional DIFERENTE pero en el mismo universo
   - Language Bank con 6-8 chunks del grammar target
   - Skeleton Structure (From/To/Subject + 3 paragraph prompts)
   - Espacio para escritura del aprendiz
   - Rúbrica visible: Format (2) + Grammar (3) + Vocabulary (3) + Clarity (2)

4. Genera SECTION 3: LISTENING COMPREHENSION (10 pts)
   - Script NUEVO de ≈150 palabras, género paralelo
   - TTS Note (velocidad 0.85x, pausas, voces)
   - Incluye oral markers naturales (hey, so, right, ok, uh)
   - 3 tasks: Multiple Choice (3pts), Gap Fill con Word Bank +2 distractors (4pts), Matching (3pts)

5. Genera SECTION 4: KEY VOCABULARY — HOTS (10 pts)
   - Task A Apply (3pts): Diagnóstico/selección de componente para problema
   - Task B Analyze (4pts): Odd One Out + justificación escrita con grammar target
   - Task C Evaluate (3pts): Priorización con presupuesto limitado + justificación

6. Genera SECTION 5: GRAMMAR & STRUCTURE — HOTS (10 pts)
   - Escenario situacional integrador (inspección, inventario, auditoría)
   - Task A Apply (3pts): Oraciones con formula + datos de tabla
   - Task B Analyze (4pts): Error Log — identificar + corregir + explicar regla
   - Task C Evaluate (3pts): Recomendación con demonstratives/comparisons + justificación

7. Genera ANSWER KEY (Solo para el instructor)
   - Respuestas correctas con distribución de puntos por task
   - Alternativas aceptables
   - Rúbrica detallada para Writing
   - Sample responses para tareas HOTS abiertas
   - Assessment Summary table
   - Distribución Bloom

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto: no exceder el nivel de la guía
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Read the scenario (*Lee el escenario*). PROHIBIDO usar bloques repeditivos de 'Instrucciones'. donde sea crítico
- Zero Meta-Talk: el output es el cuestionario listo para imprimir
- Todo el vocabulario debe provenir de los 20 key terms de PM-1.2
- Todas las estructuras gramaticales deben ser las del grammar target
- Personajes NUEVOS, textos NUEVOS, mismo universo
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-1.2 | Vocabulario, functions, grammar targets, universo narrativo |
| **Depende de** | PM-2.3 | Referencia del género textual de Reading (para crear paralelo) |
| **Depende de** | PM-2.6 | Referencia del género textual de Listening (para crear paralelo) |
| **Depende de** | PM-2.10 | Grammar targets específicos |
| **Alimenta a** | PM-4.1§5 | El resultado del cuestionario alimenta el Feedback Loop |
| **Se ubica en** | GFPI-F-135 Sección 3.4 | Actividades de Transferencia |
| **Triada SENA** | Evidencia de Conocimiento | Complementa Desempeño (PM-2.8 Speaking) y Producto (PM-2.4 Writing) |

---

## EJEMPLO DE EJECUCIÓN

**Input:**
- Programa: ADSO (228118)
- Guía 1: The Hardware Specialist
- Macro-Temática: The Developer's Ecosystem (Hardware, OS & Environment)
- Universo: DevCore Solutions
- Personaje de la guía: Carlos Ramírez (Junior Developer) — NO reutilizar
- Vocabulario: CPU, RAM, GPU, Motherboard, PSU, SSD, HDD, Monitor, Keyboard, Mouse, USB port, HDMI port, Ethernet cable, Printer, Scanner, Gigabyte, Terabyte, Gigahertz, Compatible, Portable
- Grammar: Verb To Be, Have/Has, Demonstratives, Adjectives
- Functions: Describing, Classifying, Comparing
- Reading género: Internal Tech Request (email)
- Listening género: Phone call

**Output generado:**
- Section 1: Email de Laura Méndez (QA Tester) solicitando workstations para testing lab
- Section 2: Miguel Torres (Junior Developer) escribe email para upgrade de Android Studio
- Section 3: Voicemail del IT Department anunciando upgrades de oficina
- Section 4: Tech Diagnosis + Odd One Out + Budget Priority ($500)
- Section 5: Inventory Check — report + error log + recommendation
- Answer Key completo con rúbricas y sample responses

**Ver output completo:** `ADSO — GUÍA 1 — The Hardware Specialist — Cuestionario Técnico (IE-01)`

---

*PM-4.2: Cuestionario Técnico — Evidencia de Conocimiento*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
