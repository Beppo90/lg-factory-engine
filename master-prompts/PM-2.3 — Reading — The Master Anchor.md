---
version: 3.0
last_verified: 2026-05-02
session: "S3"
session_legacy_v2: 2
tipo_bloque: "APROPIACION"
bloque_id_referencia_canon_imarpor: "B1"
rap_target_canon_imarpor: "RA1"
dimension: "cognitiva"
generates_evidence: true
evidence_type_canon: "Conocimiento"
codigo_canon_evidencia: "E1"
criterio_canon_evaluado: "C01"
instrumento_canon: "Cuestionario No 1"
contributes_to_cuestionario: true
cuestionario_skill: "Reading"
cuestionario_points: 5
status: v3.0 PARADIGM SHIFT · PM-2.3 hereda cascade Phase 1 v3.x (pm-2-0 v3.0 + pm-1-2 v4.2 + matriz v1.3) · emite Activity Card v3.0 canon Sergio (16 campos · descripcion multi-párrafo 200-600 palabras patrón panorama→orientación→equipos→práctica→cierre) · evidencia E1 anchor Reading C01 (Cuestionario No 1) · 7 validation_checks BLOQUEANTES · anti-prescriptive prompt operacional · 6 arquetipos v2.0 PRESERVADOS como REFERENCIA (LLM elige · canon Sergio "todos los arquetipos disponibles")
v3_0_changes:
  - "NEW REGLA 8 input cascade Phase 1 v3.x · consume pm-2-0 (S3 target) + pm-1-2.B1.story_a_reading + matriz v1.3 + universo PM-0 v3.2"
  - "NEW REGLA 9 emisión Activity Card v3.0 canon Sergio · 16 campos schema completo"
  - "NEW REGLA 10 descripcion multi-párrafo 200-600 palabras patrón canon (panorama→orientación instructor→equipos/lectura→práctica→cierre/socialización)"
  - "NEW REGLA 11 evidencia obligatoria E1 C01 · tipo Conocimiento · técnica Preguntas · Cuestionario No 1 · APROPIACIÓN B1 RA1"
  - "NEW REGLA 12 anti-prescriptive prompt operacional · libertad LLM en redacción descripción + selección arquetipo · canon estricto en heredancia"
  - "NEW REGLA 13 7 validation_checks BLOQUEANTES (4 schema Activity Card v3.0 + 3 heredancia traceability)"
  - "session: 2 (v2.0) → S3 (v3.0 · alineado con pm-2-0.session_blueprint canon CC 12 sesiones)"
  - "activity_type: cognitiva → dimension: cognitiva (canon Sergio · Activity Card v3.0)"
  - "evidence_type: Conocimiento → evidencias.tipo: Conocimiento (Activity Card v3.0)"
  - "6 arquetipos v2.0 PRESERVADOS como REFERENCIA · LLM elige uno o combinación · canon Sergio 'todos los arquetipos disponibles'"
v2_0_legacy_preserved:
  - "6 arquetipos canon (TBLT CYCLE · COMPREHENSION STRATEGIES · INFORMATION GAP · COOPERATIVE · MULTIMODAL · HOTS FOCUS)"
  - "Modelo de menú instructor elige arquetipo"
  - "Texto Maestro (The Master Anchor Text) · ahora heredado de pm-1-2.B1.story_a_reading"
  - "Estructura sesión legacy 2h directo + 0.5h autónomo (ahora session S3 con horas heredadas pm-2-0)"
---

# PM-2.3: READING COMPREHENSION — THE MASTER ANCHOR & HOTS

## FPI SENA — Bilingüismo
## Manual Clínico de Intervención Didáctica para la Comprensión Lectora

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-2.3 |
| **Nombre** | Reading Comprehension — The Master Anchor & HOTS |
| **Subfase guía SENA** | 3.3 Actividades de apropiación del conocimiento |
| **Ubicación en la Guía** | Sección 3.3 Apropiación |
| **Tipo de Evidencia SENA** | N/A (actividad de input receptivo) |
| **Instrumento** | Learner's Worksheet |
| **Estructura** | MENÚ DE ARQUETIPOS — el instructor elige y combina |
| **Rol en el sistema** | ANCLA MAESTRA — el texto fuente inyecta gramática y vocabulario objetivo |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Scope & Sequence (tema técnico, vocabulario, grammar targets, funciones comunicativas, stories) | PM-1.2 |
| Story A (texto auténtico curado para lectura) | PM-1.2 |
| Universo narrativo (empresa, personajes, contexto ESP) | PM-1.2 |
| Arquetipos elegidos en PM-2.1 y PM-2.2 (para coherencia de momentum) | PM-2.1, PM-2.2 |
| Nivel CEFR | PM-1.2 |

---

## MODELO DE MENÚ: EL INSTRUCTOR ELIGE

La lectura NO tiene una estructura fija. El instructor elige un arquetipo principal (o combina elementos de varios) según el tipo de comprensión que quiere desarrollar y el momentum de la guía.

```
EL INSTRUCTOR RECIBE:
"Elige el enfoque de lectura para esta guía. Puedes elegir UNO como base
o COMBINAR técnicas de varios."

Opción A — TBLT Cycle          [tarea no-lingüística basada en el texto]
Opción B — Comprehension Strategies [DRTA, K-W-L, Reciprocal Teaching, Retelling]
Opción C — Information Gap      [Complete the Text, Draw This, Mingle]
Opción D — Cooperative          [Jigsaw, Literature Circles]
Opción E — Multimodal           [AR, Audio Description]
Opción F — HOTS Focus           [preguntas divergentes, finales alternativos, feedback reflexivo]

O puedes combinar. Ejemplo: "Quiero el pre-reading del B (K-W-L)
y las actividades post-reading del F (HOTS Focus)."
```

---

## EL TEXTO MAESTRO (The Master Anchor Text)

Independientemente del arquetipo elegido, PM-2.3 produce un **texto ancla** que es la fuente de todo el input que se recicla en PM-2.4 a PM-2.9.

**Origen del texto:**
- **Primario:** Se adapta de Story A (texto auténtico curado en PM-1.2), simplificado para A1.1-A1.2
- **Secundario:** Si Story A no es usable directamente, la IA genera un texto nuevo inspirado en el contenido y universo de Story A

**El texto ancla DEBE contener:**
- Al menos 12 de los 20 términos de vocabulario clave
- Todas las grammar targets de la guía de forma natural
- Un personaje con nombre, rol y contexto dentro del universo narrativo
- Género textual auténtico (email, memo, report, manual, noticia)
- Extensión: 150-200 palabras
- Nivel CEFR estricto A1 (oraciones cortas, vocabulario andamiado)

---

## 6 ARQUETIPOS DE LECTURA

### ARQUETIPO A — TBLT CYCLE (Tarea no-lingüística basada en el texto)

**Cuándo funciona:** Macrotemas donde el texto contiene información procesable (datos, pasos, características, comparaciones).

**Fundamento:** El aprendiz lee para ejecutar una tarea no-lingüística. El lenguaje es el medio, no el fin. La comprensión se verifica por el resultado de la tarea, no por preguntas sobre el texto.

**Técnicas disponibles (el instructor elige 1-2):**
- **Listing:** Extraer características/componentes/pasos del texto y listarlos
- **Ordering/Sorting:** Secuenciar eventos o clasificar información del texto
- **Matching:** Emparejar texto con imágenes, definiciones o categorías
- **Comparing:** Contrastar datos de dos secciones del texto o de dos textos
- **Problem Solving:** Usar la información del texto para resolver un dilema lógico
- **Sharing:** Relacionar el texto con experiencias personales del aprendiz

**Estructura interna:**

```
PRE-READING (activación):
- Activación de esquemas previos sobre el tema
- Survival Words (3-4 términos clave del texto)

DURING READING (la tarea):
- El aprendiz lee el Master Anchor Text con un propósito claro:
  "Lee este texto para [listar / ordenar / emparejar / comparar / resolver / compartir]"
- El profesor actúa como facilitador pasivo

POST-READING (reporte + análisis):
- Planning: El grupo prepara un reporte de sus hallazgos
- Reporting: Presentan a la clase
- Language Focus: El profesor disecciona el texto para analizar
  estructuras léxico-gramaticales específicas
```

**Demanda cognitiva:** Transición de LOTS (listar, emparejar) a HOTS (comparar, resolver problemas). Comprensión literal a extrapolativa.

**Dinámica de interacción:** Grupos pequeños (ejecución + planificación) → clase completa (reporte).

**ACTÚA COMO:**
> Senior ESP Task Designer & TBLT Reading Architect. Creates task-based reading activities where learners read for a purpose, not for comprehension questions. Your tasks generate real outcomes — lists, sequences, comparisons, solutions — that prove comprehension through action, not interrogation.

---

### ARQUETIPO B — COMPREHENSION STRATEGIES (Estrategias metacognitivas)

**Cuándo funciona:** Macrotemas con textos narrativos, procesuales o informativos donde el aprendiz necesita aprender a MONITOREAR su propia comprensión.

**Fundamento:** El aprendiz no solo lee — aprende ESTRATEGIAS de lectura que puede transferir a cualquier texto futuro. El foco es el proceso, no solo el producto.

**Técnicas disponibles (el instructor elige 1-2):**
- **Retelling / Story Maps / Story Frames:** Reconstruir la narrativa con andamiaje visual
- **DRTA (Directed Reading-Thinking Activity):** Predecir → leer → comprobar iterativamente
- **K-W-L / I-Chart:** Saber → Quiero saber → Aprendí (con cruce de múltiples fuentes)
- **Reciprocal Teaching / Questioning the Author:** Los alumnos asumen rol del profesor (predecir, clarificar, preguntar, resumir)
- **Synthesis Connections (T-S, T-W, T-T):** Conectar texto con vida, mundo y otros textos

**Estructura interna:**

```
PRE-READING (activación + predicción):
- Activación con la técnica elegida:
  • K-W-L: columna K (lo que sé) + columna W (lo que quiero saber)
  • DRTA: primera predicción basada en título/ilustración
  • Story Map: identificar personaje y escenario antes de leer

DURING READING (monitoreo activo):
- El aprendiz lee con la estrategia activa:
  • DRTA: pausa en puntos estratégicos, predice, lee, comprueba
  • Reciprocal Teaching: predice + clarifica + pregunta + resume
  • K-W-L/I-Chart: va llenando durante la lectura
  • Synthesis: codifica en márgenes (T-S, T-W, T-T)

POST-READING (verificación + reflexión):
- Verificar predicciones (DRTA)
- Completar columna L del K-W-L
- Retelling oral o escrito (con o sin Story Map/Frame)
- Reflexión metacognitiva: "¿Qué estrategia me funcionó mejor?"
```

**Demanda cognitiva:** LOTS a HOTS. La predicción y el monitoreo activo desarrollan comprensión inferencial y metacognición.

**Dinámica de interacción:** Individual (monitoreo) + parejas (retelling) + clase completa (compartir predicciones).

**ACTÚA COMO:**
> Reading Strategy Coach & ESP Metacognition Specialist. Teaches learners HOW to read, not just WHAT to read. Your strategies turn passive readers into active thinkers who monitor their own comprehension and adapt their approach.

---

### ARQUETIPO C — INFORMATION GAP (Vacío de información)

**Cuándo funciona:** Macrotemas con textos que pueden dividirse en partes complementarias, descripciones visuales, o información asimétrica.

**Fundamento:** El aprendiz NO tiene toda la información. Debe comunicarse con un compañero para completar la comprensión. La lectura genera necesidad genuina de comunicación oral.

**Técnicas disponibles (el instructor elige 1-2):**
- **Complete the Text / Dialogue Reconstruction:** Cada alumno tiene la mitad del texto; deben dictarse/parafrasearse para reconstruirlo
- **Spot the Difference:** Textos casi idénticos con variaciones sutiles que descubren por interrogación
- **Draw This / Map Directions / Guess the Picture:** Un alumno lee un texto descriptivo y guía oralmente a su compañero para que dibuje/trace/adivine
- **Mingle / Grocery List / Interviews / Real or Fake:** Movimiento cinestésico en el aula con roles y tareas de lectura/escaneo

**Estructura interna:**

```
PRE-READING (preparación del gap):
- El instructor prepara los materiales asimétricos
- Explica las reglas: "No puedes mostrar tu papel a tu compañero"
- Survival Words del texto

DURING READING (lectura + comunicación):
- El aprendiz lee SU porción del texto
- Debe comunicar la información a su compañero SIN mostrar el texto
- El compañero debe completar su propia tarea con esa información
- Técnicas: dictado, parafraseo, interrogación, descripción

POST-READING (verificación + análisis):
- Los compañeros comparan resultados finales
- Identifican dónde falló la comunicación
- Análisis: "¿Qué información no pudimos transmitir bien? ¿Por qué?"
- Conexión con grammar targets y vocabulario usado
```

**Demanda cognitiva:** LOTS a HOTS. La comprensión literal del texto se convierte en comprensión inferencial y espacial durante la comunicación.

**Dinámica de interacción:** Exclusivamente en parejas (con movimiento en el caso de Mingle).

**ACTÚA COMO:**
> Information Gap Designer & ESP Communication Architect. Creates asymmetric reading tasks where comprehension depends on genuine communication. Your gaps force learners to negotiate meaning, not just read passively.

---

### ARQUETIPO D — COOPERATIVE (Aprendizaje colaborativo profundo)

**Cuándo funciona:** Macrotemas con textos extensos o complejos que se benefician de la disección grupal, textos con múltiples perspectivas, o cuando se quiere desarrollar autonomía y liderazgo.

**Fundamento:** El grupo se convierte en la unidad de aprendizaje. Cada miembro tiene un rol específico y la comprensión completa solo emerge cuando todos aportan su parte.

**Técnicas disponibles (el instructor elige 1):**
- **Jigsaw:** Texto dividido en segmentos → Expert Groups → Home Groups → enseñanza entre pares
- **Literature Circles:** Clubes de lectura con roles rotativos (Director, Conector, Ilustrador, Crítico, Word Wizard)

**Estructura interna (JIGSAW):**

```
PRE-READING (asignación):
- Texto dividido en 4 segmentos
- Home Groups de 4 personas, cada una recibe un segmento
- "Lee tu segmento. Prepárate para enseñarlo."

DURING READING (Expert Groups):
- Cada alumno lee su segmento
- Se reúnen con otros "expertos" del mismo segmento
- Discuten, resuelven dudas, acuerdan cómo enseñarlo
- Preparan su mini-clase

POST-READING (Home Groups):
- Regresan a sus Home Groups
- Cada "experto" enseña su segmento al resto
- El grupo arma el rompecabezas del texto completo
- Verificación: ¿la comprensión del grupo es correcta?
```

**Estructura interna (LITERATURE CIRCLES):**

```
PRE-READING (roles):
- Cada miembro recibe un rol rotativo:
  • Director de Discusión: genera preguntas abiertas
  • Conector: ancla con mundo real
  • Ilustrador: transforma pasaje en visual
  • Crítico: evalúa decisiones del autor
  • Word Wizard: extrae vocabulario técnico
- Lectura del texto (individual o grupal)

DURING READING (preparación por rol):
- Cada miembro prepara su aporte según su rol
- El Word Wizard lista términos, el Ilustrador dibuja, etc.

POST-READING (círculo de discusión):
- El Director abre la discusión
- Cada rol presenta su análisis
- Discusión abierta y negociación de significado
- Síntesis grupal
```

**Demanda cognitiva:** HOTS en máxima expresión (analizar, evaluar, crear). Comprensión inferencial profunda y crítica.

**Dinámica de interacción:** Expert Groups → Home Groups (Jigsaw) o grupos fijos de 4-5 (Literature Circles).

**ACTÚA COMO:**
> Cooperative Learning Architect & ESP Group Dynamics Specialist. Designs reading activities where teams become the unit of comprehension. Your activities make every member essential — no one understands the full picture alone.

---

### ARQUETIPO E — MULTIMODAL (Integración de formatos)

**Cuándo funciona:** Macrotemas donde el texto puede complementarse con elementos visuales, auditivos o digitales. Cuando el programa técnico tiene componentes visuales fuertes (diagramas, interfaces, hardware).

**Fundamento:** La lectura no es solo texto plano. El aprendiz procesa información de múltiples modalidades (visual, auditiva, digital) y desarrolla alfabetización multimodal.

**Técnicas disponibles (el instructor elige 1):**
- **AR / Textos Digitales:** Lectura interactiva con realidad aumentada o textos hipervinculados
- **Audio Description:** El aprendiz visiona un fragmento audiovisual y redacta una audiodescripción precisa

**Estructura interna (AR / DIGITAL):**

```
PRE-READING (contexto):
- Introducción al tema con recurso visual o digital
- "Vas a leer sobre [tema] y al mismo tiempo interactuar con [recurso]"
- Survival Words

DURING READING (lectura + interacción):
- El aprendiz lee el texto mientras manipula el recurso AR/digital
- Ejemplo: lee sobre componentes de PC mientras ve el modelo 3D
- La comprensión se verifica por la interacción correcta
- Toma notas de lo que descubre

POST-READING (síntesis):
- Comparar lectura tradicional vs. lectura multimodal
- "¿Qué aprendiste con la imagen que el texto solo no te dio?"
- Crear un resumen que integre ambas modalidades
```

**Estructura interna (AUDIO DESCRIPTION):**

```
PRE-READING (contexto):
- El aprendiz visiona un fragmento audiovisual SIN audio
- "Vas a escribir una audiodescripción para personas con
  discapacidad visual"
- Survival Words para descripción visual

DURING READING (análisis + redacción):
- El aprendiz analiza el video frame por frame
- Selecciona léxico exacto para describir
- Redacta guion de audiodescripción que encaje en silencios
- Enfoca en precisión léxica y fraseológica

POST-READING (evaluación):
- Comparar audiodescripciones entre compañeros
- Evaluar: ¿fue precisa? ¿fue completa? ¿usó el vocabulario correcto?
- Conexión con grammar targets (adjectives, prepositions, present simple)
```

**Demanda cognitiva:** LOTS a HOTS. Comprensión literal y espacial (AR) o creación y síntesis (Audio Description).

**Dinámica de interacción:** Individual (interacción humano-dispositivo) o parejas (audiodescripción).

**ACTÚA COMO:**
> Multimodal Literacy Designer & ESP Visual Communication Specialist. Creates reading experiences that go beyond text — integrating visuals, audio, and interactivity. Your activities develop learners who can process and produce information across multiple formats.

---

### ARQUETIPO F — HOTS FOCUS (Pensamiento superior transversal)

**Cuándo funciona:** Macrotemas donde el texto permite interpretaciones múltiples, evaluación crítica, o producción creativa. Cuando se quiere maximizar la demanda cognitiva.

**Fundamento:** El texto es un punto de partida para el pensamiento, no un destino. El aprendiz no solo comprende — evalúa, critica, crea y transforma.

**Técnicas disponibles (el instructor elige 1-2):**
- **Divergent Questions:** Preguntas sin respuesta única (eliminando preguntas de sí/no o recuperación literal)
- **Evaluation of Consistency:** Rastrear falacias lógicas o sesgos en artículos de opinión/ensayos
- **Feedback Reflexivo (Review, Refine, Improve):** Iteración donde el profesor devuelve el análisis para refinamiento
- **Alternative Endings / Analogous Fables:** Extensión creativa del texto manteniendo coherencia narrativa o estructural

**Estructura interna:**

```
PRE-READING (activación crítica):
- Pregunta de apertura que NO tiene respuesta correcta
- "¿Qué opinas sobre [tema controversial del texto]?"
- Posición individual antes de leer

DURING READING (lectura crítica):
- El aprendiz lee con ojo crítico:
  • ¿Estoy de acuerdo con lo que dice?
  • ¿Hay algo que no cuadra?
  • ¿Qué más necesitaría saber?
- Marca pasajes con: ✓ (de acuerdo), ✗ (en desacuerdo), ? (no entiende)

POST-READING (producción HOTS):
- Actividad según técnica elegida:
  • Divergent Questions: "¿Cómo cambiaría si...?"
  • Evaluation of Consistency: identificar 2 falacias/sesgos + justificar
  • Feedback Reflexivo: primer análisis → profesor devuelve → refinar
  • Alternative Endings: escribir continuación coherente del texto
  • Analogous Fables: crear nueva historia con misma estructura/moraleja
```

**Demanda cognitiva:** HOTS pura (evaluar, crear). Comprensión extrapolativa y metacognitiva.

**Dinámica de interacción:** Individual (análisis crítico) + retroalimentación dialógica (profesor-alumno).

**ACTÚA COMO:**
> Critical Thinking Designer & ESP Higher-Order Specialist. Creates reading tasks that push learners beyond comprehension into evaluation, synthesis, and creation. Your tasks have no single right answer — they develop thinkers, not memorizers.

---

## FORMATO DE SALIDA ESTÁNDAR

Independientemente del arquetipo elegido, el worksheet tiene esta estructura base:

```
WORKSHEET: THE MASTER ANCHOR — Reading Comprehension
[Programa] | [Guía #] | [Macro-Temática] | Nivel A1

> 💬 INSTRUCCIÓN BILINGÜE:
> [Mensaje motivacional en inglés simple + español en cursiva]

📖 THE MASTER ANCHOR TEXT
[Texto adaptado de Story A, 150-200 palabras, nivel A1]

🔧 THE TOOLBELT
[20 términos con definición, categoría y ejemplo en contexto]

PRE-READING
[Activación — según arquetipo]

DURING READING
[Actividad principal — según arquetipo]

POST-READING
[Actividad HOTS — según arquetipo]
```

---

## COHERENCIA CON ARQUETIPOS ANTERIORES

El arquetipo de lectura (PM-2.3) debe ser coherente con los arquetipos elegidos en PM-2.1 y PM-2.2:

| Spark + Diagnóstico | Lectura recomendada | Razón |
|---------------------|---------------------|-------|
| Crisis + Scenario | A) TBLT Cycle | La crisis se resuelve con tareas concretas |
| Debate + Scale | B) Comprehension Strategies | El debate se nutre de lectura metacognitiva |
| News + Prediction | C) Information Gap | La noticia se explora con vacío de información |
| Personal + Visual | E) Multimodal | La reflexión personal se enriquece con visual |
| Competition + Group Map | D) Cooperative | La competencia se potencia con colaboración |
| Cualquier combinación | F) HOTS Focus | Para maximizar demanda cognitiva |

**Recomendación, no regla.** El instructor puede combinar como prefiera.

---

## PROMPT PARA IA

```
ACTÚA COMO: [SEGÚN ARQUETIPO ELEGIDO — ver opciones abajo]

Tu tarea: Generar el WORKSHEET "THE MASTER ANCHOR" — Reading Comprehension para la guía indicada.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Tema técnico: [descripción]
- Universo narrativo: [empresa, sector, contexto]
- Story A (texto auténtico curado en PM-1.2): [resumen, fuente, URL]
- Vocabulario clave: [20 términos de PM-1.2]
- Grammar targets: [estructuras de PM-2.10]
- Communicative functions: [funciones de PM-1.2]
- Arquetipos anteriores: [Spark elegido en PM-2.1, Diagnóstico en PM-2.2]
- Arquetipo de lectura elegido: [A / B / C / D / E / F o combinación]
- Combinación personalizada (si aplica): [qué técnicas de qué arquetipos]
- Nivel CEFR: [default A1.1-A1.2]

### ARQUETIPOS DISPONIBLES:

A) TBLT CYCLE — Tarea no-lingüística (Listing, Ordering, Matching, Comparing, Problem Solving, Sharing)
B) COMPREHENSION STRATEGIES — Estrategias metacognitivas (Retelling/Story Maps, DRTA, K-W-L, Reciprocal Teaching, Synthesis)
C) INFORMATION GAP — Vacío de información (Complete the Text, Draw This, Mingle, Real or Fake)
D) COOPERATIVE — Aprendizaje colaborativo (Jigsaw, Literature Circles)
E) MULTIMODAL — Integración de formatos (AR, Audio Description)
F) HOTS FOCUS — Pensamiento superior (Divergent Questions, Evaluation of Consistency, Feedback Reflexivo, Alternative Endings)

### INSTRUCCIONES DE GENERACIÓN:

1. Genera THE MASTER ANCHOR TEXT:
   - Adapta Story A a nivel A1.1-A1.2 (150-200 palabras)
   - Si Story A no es directamente usable, genera texto INSPIRADO en Story A
   - Mantén: personaje, universo narrativo, vocabulario técnico, grammar targets
   - Género textual auténtico
   - Oraciones cortas (≤15 palabras)

2. Genera THE TOOLBELT:
   - 20 términos con definición simple, categoría y ejemplo en contexto
   - Organizado por categoría funcional
   - Ejemplos vienen del texto ancla

3. Genera PRE-READING (según arquetipo):
   - A: Activación de esquemas previos + Survival Words
   - B: K-W-L (columna K+W) o primera predicción DRTA
   - C: Preparación de materiales asimétricos + reglas del gap
   - D: Asignación de roles/segmentos
   - E: Introducción al recurso multimodal
   - F: Pregunta de apertura sin respuesta única + posición individual

4. Genera DURING READING (según arquetipo):
   - A: Tarea no-lingüística clara (listar, ordenar, emparejar, comparar, resolver, compartir)
   - B: Estrategia activa (DRTA con pausas, K-W-L llenando, Reciprocal Teaching roles)
   - C: Lectura + comunicación del gap (dictado, parafraseo, interrogación, descripción)
   - D: Expert Groups (discusión + preparación de mini-clase) o roles de Literature Circles
   - E: Lectura + interacción con recurso o redacción de audiodescripción
   - F: Lectura crítica con marcación (✓, ✗, ?)

5. Genera POST-READING (según arquetipo):
   - A: Planning + Reporting + Language Focus
   - B: Verificación de predicciones + Retelling + reflexión metacognitiva
   - C: Comparación de resultados + análisis de fallas de comunicación
   - D: Home Groups teaching (Jigsaw) o círculo de discusión (Literature Circles)
   - E: Síntesis multimodal o evaluación de audiodescripciones
   - F: Producción HOTS (preguntas divergentes, evaluación de consistencia, feedback reflexivo, finales alternativos)

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto A1.1-A1.2
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Read the scenario (*Lee el escenario*). PROHIBIDO usar bloques repeditivos de 'Instrucciones'.
- Zero Meta-Talk: output listo para imprimir
- El texto ancla es la FUENTE de todo el reciclaje en PM-2.4 a PM-2.9
- Coherencia con arquetipos de PM-2.1 y PM-2.2
- El Toolbelt es CONSOLIDADO (incluye todos los 20 términos con ejemplos del texto)
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.2 | Story A, vocabulario, grammar targets, universo narrativo |
| **Recibe input de** | PM-2.1, PM-2.2 | Arquetipos elegidos (coherencia de momentum) |
| **Alimenta a** | PM-2.4 | Story A adaptada → formato oral (reciclaje) |
| **Alimenta a** | PM-2.5 | Chunks del texto → práctica de vocabulario |
| **Alimenta a** | PM-2.6 | Fonemas del vocabulario → entrenamiento |
| **Alimenta a** | PM-2.10 | Estructuras del texto → inducción gramatical |
| **Alimenta a** | PM-2.8 | El texto como modelo para producción escrita |
| **Alimenta a** | PM-4.2 | Referencia de género textual para crear paralelo |
| **Se ubica en** | GFPI-F-135 Sección 3.3 | Apropiación |

---

## PRINCIPIO DE TRES VERSIONES

PM-2.3 genera todas las variantes del texto de lectura:

1. **Reading task de S2 (evidencia de apropiación):** El Master Anchor Text original y las actividades de lectura con feedback formativo.
2. **Ítems cosechados para el cuestionario S6:** Preguntas similares pero diferentes, derivadas de la misma familia de conceptos del texto.
3. **Ítems del Workbook:** Actividades de refuerzo similares pero en contexto diferente, para práctica independiente.

Todas las variantes emergen de la misma matriz conceptual generada en PM-2.3, asegurando coherencia y validez de la evaluación.

---

## ACTIVITY CARD OUTPUT

Esta sección define el output estructurado que este PM entrega al PM-2.11 (GFPI-F-134 Row Assembler).

```yaml
activity_card:
  pm_id: "PM-2.3"
  pm_name: "Reading — The Master Anchor"
  session: 2
  phase_sena: "Apropiación"
  rap_id: "[A GENERAR — viene del Session Blueprint PM-2.0]"
  
  activities:
    - number: 1
      type: "cognitiva"
      statement: "[A GENERAR — Analizar estructura y contenido de texto técnico en inglés]"
      didactic_strategy: "Content-Based Learning"
      didactic_technique: "Investigación guiada"
    
    - number: 2
      type: "cognitiva"
      statement: "[A GENERAR — Completar matriz de comprensión sobre conceptos clave]"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Jigsaw"
  
  hours:
    direct: 2.0
    autonomous: 0.5
  
  evidence:
    generates_evidence: true
    type: "Conocimiento"
    description: "El aprendiz demuestra comprensión de textos técnicos en inglés respondiendo preguntas de nivel literal e inferencial en Cuestionario No 1"
    evaluation_technique: "Preguntas"
    instrument_number: 1
    instrument_type: "Cuestionario"
  
  environment:
    type: "Aula"
    materials:
      - "Proyector interactivo"
      - "Computadores con acceso a Moodle"
      - "Plantilla SQ3R impresa (PDF)"
      - "Textos técnicos en inglés (5 extractos)"
    instructors: "Instructor de inglés técnico"
  
  contributes_to_consolidated_quiz: true
  quiz_skill: "Reading"
  quiz_points: 5
  quiz_item_count: 5
```

---

*PM-2.3: Reading Comprehension — The Master Anchor & HOTS*
*Manual Clínico de Intervención Didáctica para la Comprensión Lectora*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*

---

## EXTENSIÓN v3.0 — PM-2.3 HEREDERO CASCADE PHASE 1 v3.x + ACTIVITY CARD v3.0 (2026-05-02)

> [!warning] PARADIGM SHIFT canonizado · Sergio Cortés decisión arquitectónica 2026-05-02
>
> PM-2.3 v2.0 era manual clínico con 6 arquetipos · instructor elegía. v3.0 canoniza PM-2.3 como **emisor de Activity Card v3.0** que HEREDA literal de cascade Phase 1 v3.x (pm-2-0 v3.0 + pm-1-2 v4.2 + matriz v1.3) y produce evidencia E1 anchor Reading C01.
>
> **6 arquetipos v2.0 PRESERVADOS como REFERENCIA** · LLM elige el arquetipo dominante o combinación · canon Sergio "todos los arquetipos disponibles para todos los PM".

### REGLA 8 — INPUT CASCADE PHASE 1 v3.x

PM-2.3 v3.0 consume como input PRIMARIO:

```json
{
  "pm_2_0_ref": "pm-2-0.json (v3.0+ · session_blueprint heredero · sesión target S3 APROPIACIÓN B1 RA1)",
  "pm_1_2_ref": "pm-1-2.json (v4.2+ · sub_bloques_tripartitos[1].story_a_reading · _produces_evidencia: E1 · _consumed_by_pm: PM-2.3)",
  "pm_0_0_matriz_ref": "pm-0-0-matriz-alineada.json (v1.2+ · RA1 saberes_conceptos + criterios C01+C02+C07)",
  "pm_0_context_ref": "pm-0-context.json (v3.2+ · universo banana cold chain · personajes Manuel/Carolina/Mariana/Lim/Yurlenis)"
}
```

**PM-2.3 NO inventa** Story A Reading · LO HEREDA literal de pm-1-2.B1.story_a_reading. PM-2.3 NO redistribuye sesión · LA HEREDA de pm-2-0 (S3 canon C01).

### REGLA 9 — EMISIÓN ACTIVITY CARD v3.0 CANON SERGIO

PM-2.3 v3.0 DEBE emitir Activity Card v3.0 con los 16 campos canon Sergio (ver Activity Card Schema §11.2):

```yaml
activity_card:
  pm_id: "PM-2.3"
  pm_name: "Reading Comprehension — The Master Anchor & HOTS"
  session: "S3"                                # heredado pm-2-0
  tipo_bloque: "APROPIACION"                   # heredado pm-2-0
  bloque_id_referencia: "B1"                   # heredado pm-2-0
  rap_target: "RA1"                            # heredado pm-1-1.B1.rap_target (vía pm-2-0)
  numero_actividad: N                          # secuencial acumulado guía (LLM asigna · típicamente 5-7 en S3)

  dimension: "cognitiva"                       # canon PM-2.3 · Reading es cognitiva
  enunciado: "Comprender [story_a.titulo] mediante [arquetipo elegido] aplicando estrategia SQ3R"
                                                # V+O+C ≤200 chars · LLM redacta desde universo + arquetipo
  descripcion: |                              # multi-párrafo 200-600 palabras patrón canon Sergio
    [PANORAMA: qué se identifica/comprende del texto técnico + contexto operacional]

    [ORIENTACIÓN INSTRUCTOR: qué explica antes (concepto · estrategia SQ3R · vocabulario clave)]

    [CONFORMACIÓN EQUIPOS + LECTURA: cómo se organizan + acceso al Story A Reading heredado de pm-1-2]

    [PRÁCTICA/COMPRENSIÓN: qué hacen con el texto · arquetipo elegido (TBLT/Comprehension Strategies/etc.)]

    [CIERRE/SOCIALIZACIÓN: qué entregan + Cuestionario No 1 (E1 evidencia) + socialización aprendizajes]

  ambiente: "Aula con proyector + computadores con acceso a Moodle"
                                                # texto operacional · LLM ajusta según contexto programa
  estrategias_didacticas_activas:               # array · LLM elige según arquetipo
    - "Content-Based Learning"                  # típico arquetipo A TBLT CYCLE
    # o "Aprendizaje colaborativo" (arquetipo D COOPERATIVE)
    # o "Aprendizaje basado en problemas" (arquetipo F HOTS)
  tecnicas_didacticas:                          # array · LLM elige según arquetipo
    - "Investigación guiada"                    # típico arquetipo B
    # o "Jigsaw" (arquetipo D)
    # o "SQ3R guided reading" (arquetipo A)
  materiales_formacion:                         # array · típico Reading
    - "Proyector"
    - "Computadores con acceso a Moodle"
    - "Plantilla SQ3R impresa"
    - "Texto Story A impreso (5 copias por equipo)"
  material_apoyo:                               # array de objetos · heredado pm-1-2.B1.story_a_reading.fuente
    - descripcion: "Story A Reading: [titulo heredado pm-1-2]"
      link: "[URL fuente auténtica heredada pm-1-2]"

  evidencias:
    aplica: true                               # CANON PM-2.3 APROPIACIÓN B1 RA1 · siempre genera E1
    tipo: "Conocimiento"                        # canon Reading anchor
    nombre: "[Nombre legible específico · ej 'Comprensión lectora del artículo Maersk Reefer Vessel Inspection']"
    tecnica_evaluacion: "Preguntas"
    instrumento_numero: 1
    instrumento_tipo: "Cuestionario"
    codigo_canon: "E1"                          # heredado pm-1-2.B1.story_a_reading._produces_evidencia
    criterio_canon_evaluado: "C01"              # heredado pm-2-0.evidencias_secuencia_temporal.E1.criterio_canon

  duracion_horas: [4 típico · heredado pm-2-0.session_blueprint.S3.actividades_planeadas[story_a_reading].horas]

  _anclaje_matriz_heredado:                    # LITERAL COPY de pm-1-2.B1.story_a_reading._anclaje_matriz
    rap_target: "RA1"
    saberes_que_demanda: [...]                  # subset 8 saberes RA1 que demanda este Story A
    criterios_canon_que_evalua: ["C01"]
    saberes_proceso_movilizados: ["IDENTIFICAR Y EXTRAER INFORMACIÓN PRECISA EN INGLÉS GENERADA EN EL INTERCAMBIO ORAL Y/O ESCRITO"]

  _produces_evidencia: "E1"                    # literal copy
  _consumed_by_pm: "PM-2.3"                    # self-reference
  _ref_pm12_path: "sub_bloques_tripartitos[1].story_a_reading"
  _ref_pm20_session: "S3"
```

### REGLA 10 — DESCRIPCIÓN MULTI-PÁRRAFO PATRÓN CANON SERGIO

La `descripcion` debe seguir el patrón pedagógico canon de los 3 ejemplos Sergio (NO template literal · GUÍA estructural · libertad LLM):

```
Párrafo 1 (PANORAMA · 30-50 palabras):
  Qué se comprende del texto técnico Story A + contexto operacional banana cold chain

Párrafo 2 (ORIENTACIÓN INSTRUCTOR · 40-80 palabras):
  Qué explica el instructor antes (concepto + estrategia de comprensión + vocabulario clave del RAP)

Párrafo 3 (CONFORMACIÓN EQUIPOS + LECTURA · 50-100 palabras):
  Cómo se organizan los aprendices + cómo acceden al Story A heredado + lectura inicial (silenciosa o en voz alta)

Párrafo 4 (PRÁCTICA/COMPRENSIÓN · 50-150 palabras):
  Qué hacen con el texto según arquetipo elegido (TBLT task / Comprehension strategies / Information gap / etc.)
  Referencia explícita a Story A heredado + activación gramática + identificación key vocabulary RA1

Párrafo 5 (CIERRE/SOCIALIZACIÓN · 30-80 palabras):
  Aplicación Cuestionario No 1 (E1 · evidencia formal · 5 puntos) + socialización aprendizajes + bridge a S4 (Writing E2)
```

**Voz:** 3ª persona ("el instructor orientará..." · "los aprendices identificarán..." · "se conformarán equipos de 3...").

**Universo:** contextualizado al universo del programa (banana cold chain · CML port · personajes heredados de pm-0-context.json).

**Multi-párrafo:** saltos `\n\n` preservados literal en render.

### REGLA 11 — EVIDENCIA OBLIGATORIA E1 C01 ANCHOR READING

PM-2.3 SIEMPRE genera evidencia formal E1 cuando opera en su sesión canon S3 (anchor Reading). Esto es CANON estricto:

- `evidencias.aplica` = **true** (no opcional)
- `evidencias.tipo` = "Conocimiento" (canon Reading anchor SENA)
- `evidencias.tecnica_evaluacion` = "Preguntas" (canon Reading)
- `evidencias.instrumento_numero` = **1** (Cuestionario No 1 canon PM-4.1)
- `evidencias.instrumento_tipo` = "Cuestionario"
- `evidencias.codigo_canon` = **"E1"** (heredado pm-1-2)
- `evidencias.criterio_canon_evaluado` = **"C01"** (heredado pm-2-0)
- `evidencias.nombre` = LIBERTAD LLM legible específico (ej "Comprensión lectora del artículo IMARPOR Reefer Vessel Inspection")

**Excepción:** PM-2.3 puede ser invocado en sesiones APROPIACIÓN scaffold (e.g., S7 RA3 según pm-2-0.S7) donde NO produce evidencia formal · en ese caso `evidencias.aplica = false` y campos null. Esto se determina por `_ref_pm12_path` heredado:
- Si `_ref_pm12_path` apunta a `story_a_reading` con `_produces_evidencia: "E1"` → SÍ genera (S3 canon)
- Si `_ref_pm12_path` apunta a `story_a_reading` con `_produces_evidencia: null` → NO genera (S7 scaffold canon)

### REGLA 12 — PROMPT OPERACIONAL ANTI-PRESCRIPTIVE (Anti-patrón #16)

El orchestrator que dispatchea Agent ejecutando PM-2.3 v3.0 DEBE:

SÍ pasar al Agent:
- Master prompt PM-2.3 v3.0 (REGLAS 8-13 EXTENSIÓN v3.0)
- pm-2-0.json v3.0 (session_blueprint · indicar S3 target)
- pm-1-2.json v4.2 (recurso primario: B1.story_a_reading + B1 contexto completo)
- matriz v1.3 (RA1 saberes + C01-C07 canon)
- pm-0-context.json v3.2 (universo banana cold chain · personajes)
- Schema Activity Card v3.0 (16 campos · §11 del Schema)
- 3 ejemplos canon Sergio (referencia estructural · NO template literal)
- 7 validation_checks BLOQUEANTES

NO pasar al Agent:
- Descripción pre-redactada (LLM redacta libre siguiendo patrón canon)
- Arquetipo pre-decidido (LLM elige uno o combinación de los 6)
- Materiales hardcoded (LLM cura según contexto)
- Nombre de evidencia pre-redactado

**LIBERTAD LLM:**
- Selección arquetipo de los 6 (TBLT/Comprehension/Information Gap/Cooperative/Multimodal/HOTS) · puede combinar
- Redacción `descripcion` siguiendo patrón canon (panorama→orientación→equipos→práctica→cierre)
- Selección estrategias_didacticas + tecnicas_didacticas según arquetipo
- Materiales formación específicos
- `nombre` específico legible de evidencia (contextualizado a Story A heredado)
- Numeración secuencial (LLM asigna basado en posición en guía)

**SIN LIBERTAD (canon estricto):**
- Schema 16 campos Activity Card v3.0
- evidencias canon (E1 · C01 · Cuestionario No 1) cuando es S3 anchor
- Heredancia traceability literal (5 campos `_*`)
- saberes_que_demanda ⊆ matriz RA1 · criterios_canon_que_evalua ⊆ {C01, C02, C07}

### REGLA 13 — VALIDATION POST-GENERATION · 7 CHECKS BLOQUEANTES

```jsonc
"validation_checks": [
  // 4 schema Activity Card v3.0:
  {"id": 1, "name": "schema_activity_card_v3_completo", "status": "PASS|FAIL", "evidence": "16 campos canon"},
  {"id": 2, "name": "descripcion_multipárrafo_200_600_palabras", "status": "...", "evidence": "..."},
  {"id": 3, "name": "evidencias_canonical_E1_C01", "status": "...", "evidence": "tipo=Conocimiento·instrumento=1"},
  {"id": 4, "name": "render_no_aplica_ausente", "status": "...", "evidence": "S3 anchor genera evidencia · 'No aplica' NO debe aparecer"},
  // 3 heredancia traceability:
  {"id": 5, "name": "heredancia_pm12_literal", "status": "...", "evidence": "_anclaje_matriz_heredado matches pm-1-2.B1.story_a_reading"},
  {"id": 6, "name": "heredancia_pm20_sesion_correcta", "status": "...", "evidence": "session=S3 · tipo_bloque=APROPIACION · bloque_ref=B1"},
  {"id": 7, "name": "saberes_subset_matriz_v13", "status": "...", "evidence": "saberes_que_demanda ⊆ matriz.RA1.saberes_conceptos"}
]
```

Si CUALQUIER check FAIL · output marcado `enriched: false` · BLOQUEANTE para Wave 2 (PM-2.4 cascade).

### REGLA 14 — ESTRUCTURA OUTPUT pm-2-3.json v3.0

```jsonc
{
  "pm_id": "PM-2.3",
  "pm_name": "Reading Comprehension — The Master Anchor & HOTS",
  "pm_version": "3.0",
  "run_id": "...",
  "generated_date": "...",

  "_pm20_ref": "pm-2-0.json (v3.0+ · S3 target)",
  "_pm12_ref": "pm-1-2.json (v4.2+ · B1.story_a_reading)",
  "_pm00_matriz_ref": "pm-0-0-matriz-alineada.json (v1.2+)",
  "_pm0_context_ref": "pm-0-context.json (v3.2+)",

  "arquetipo_seleccionado": "TBLT CYCLE | COMPREHENSION STRATEGIES | INFORMATION GAP | COOPERATIVE | MULTIMODAL | HOTS FOCUS | combinación",
  "arquetipo_rationale": "...",   // LLM justifica selección

  "activity_card": { /* 16 campos schema v3.0 (§11.2 Activity Card Schema) */ },

  "validation_checks": [...],
  "enriched": true|false
}
```

### REGLA 15 — RELACIÓN CON OTROS PROMPTS v3.0

| Relación | Prompt | Cambio v3.0 |
|----------|--------|-------------|
| **Consume de (NEW · CRÍTICO)** | PM-2.0 v3.0 | session_blueprint heredero (S3 target) |
| **Consume de (NEW · CRÍTICO)** | PM-1.2 v4.2+ | B1.story_a_reading literal (Story A · ficha curación · _produces_evidencia E1) |
| **Consume de** | PM-0.0 v1.2+ | matriz RA1 saberes + criterios canon C01-C07 |
| **Consume de** | PM-0 v3.2+ | universo banana cold chain + personajes |
| **Alimenta a** | PM-2.5 | key_vocabulary del Story A (vocab scaffold scaffold S2 + reinforcement S3) |
| **Alimenta a** | PM-2.11 | Activity Card v3.0 → cols 6-11 GFPI-F-134 |
| **Alimenta a** | PM-3.6 | Activity Card v3.0 → render learner-readable GFPI-F-135 |
| **Alimenta a** | PM-4.1 | evidencias.{tipo, nombre, instrumento} → Cuestionario No 1 (E1) |
| **Alimenta a** | PM-4.2 | quiz_skill: Reading + 5 ítems → Cuestionario consolidado E6 |

### REGLA 16 — DEPRECATION PATH v2.0 → v3.0

Programas con `pm-2-3.json` v2.0 (sin Activity Card v3.0 · sin heredancia · session: 2 hardcoded):
- KEEP archivos legacy en run dir como `*.legacy-pre-v3-0`
- Generar nuevo pm-2-3.json v3.0 cuando se re-run el programa post-cascade Phase 1 v3.x
- Run resultante puede tener AMBOS: legacy v2.0 + v3.0

---

## ESTRUCTURA OPERACIONAL v3.0 (resumen ejecutivo)

```
pm-2-0.json v3.0 (session_blueprint · S3 APROPIACIÓN B1 RA1 · actividad story_a_reading)
  +
pm-1-2.json v4.2 (B1.story_a_reading · _produces_evidencia: E1 · _consumed_by_pm: PM-2.3)
  +
matriz v1.3 (RA1 8 saberes + C01-C07 canon)
  +
pm-0-context v3.2 (universo banana cold chain)
  ↓
PM-2.3 v3.0 dispatcher (Agent · libertad LLM en redacción · canon estricto en heredancia)
  ↓
pm-2-3.json v3.0
  ├─ arquetipo_seleccionado + rationale (LLM elige de los 6 v2.0)
  ├─ activity_card v3.0 (16 campos canon Sergio · descripcion multi-párrafo · E1 C01)
  └─ validation_checks (7 BLOQUEANTES)
  ↓
Activity Card v3.0 → consumida por PM-2.5 + PM-2.11 + PM-3.6 + PM-4.1 + PM-4.2
```

---

## CASO OPERACIONAL ESPERADO IMARPOR-V2 (Step 1.5.PILOT.B dispatch)

**Input:**
- pm-2-0.json v3.0 (S3 target · APROPIACIÓN B1 RA1 · actividad story_a_reading)
- pm-1-2.json v4.2 v2 (B1.story_a_reading "Maersk Reefer Vessel Inspection" · 215p A1.2 · _produces E1 → PM-2.3)
- matriz v1.3 (RA1: 8 saberes UNIT 1+UNIT 2 · canon C01+C02+C07)
- universo PM-0 v3.2 (banana cold chain · CML CARIBBEAN STAR · Manuel/Carolina/Mariana)

**Output esperado pm-2-3.json v3.0:**
- arquetipo_seleccionado: "TBLT CYCLE" o "COMPREHENSION STRATEGIES" (LLM decide)
- activity_card v3.0 con:
  - dimension: "cognitiva"
  - enunciado: "Comprender artículo Maersk Reefer Vessel Inspection mediante estrategia SQ3R aplicada a partes del barco" (≤200 chars V+O+C)
  - descripcion: 200-600 palabras patrón canon Sergio · contextualizado banana cold chain
  - evidencias.aplica=true · tipo=Conocimiento · nombre="Comprensión lectora del artículo Maersk..." · instrumento No 1 Cuestionario · codigo E1 · criterio C01
  - heredancia traceability completa (saberes RA1 · ref_pm12 path · ref_pm20 S3)
- 7/7 validation_checks PASS
- enriched: true

---

*PM-2.3 v3.0 · Reading Anchor Heredero · Activity Card v3.0 canon Sergio · evidencia E1 C01 · 6 arquetipos v2.0 PRESERVADOS para libertad LLM*
*Sergio Cortés decisión arquitectónica 2026-05-02 · cascade Step 1.5.PILOT IMARPOR-V2*
