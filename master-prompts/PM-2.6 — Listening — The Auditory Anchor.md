---
version: 3.0
last_verified: 2026-05-02
sessions_canon_imarpor: ["S3", "S5", "S7", "S9"]
session_anchor_S5: "produce E3 C03 (anchor)"
sessions_scaffold: ["S3", "S7", "S9"]
session_legacy_v2: 4
tipo_bloque: "APROPIACION"
bloque_anchor_canon: "B2"
rap_target_anchor: "RA2"
dimension_anchor: "procedimental"
dimension_scaffold: "cognitiva"
generates_evidence_anchor: true
generates_evidence_scaffold: false
evidence_type_canon: "Desempeño"
codigo_canon_evidencia_anchor: "E3"
criterio_canon_evaluado_anchor: "C03"
instrumento_canon_anchor: "Lista de Verificación No 3"
contributes_to_cuestionario: true
cuestionario_skill: "Listening"
cuestionario_points: 5
status: v3.0 PARADIGM SHIFT · PM-2.6 hereda cascade Phase 1 v3.x · emite Activity Card v3.0 (típicamente 4 cards · 1 anchor S5 produce E3 + 3 scaffolds S3/S7/S9 NO producen) · pattern multi-modal anchor+scaffolds según _ref_pm12_path._produces_evidencia
v3_0_changes:
  - "session 4 (v2.0) → multi-S [S3,S5,S7,S9] (alineado pm-2-0 · S5 anchor + S3/S7/S9 scaffolds)"
  - "NEW REGLA heredancia cascade Phase 1 v3.x · cada actividad determina aplica según _produces_evidencia heredado"
  - "NEW REGLA emisión N Activity Cards v3.0 (típico 4 IMARPOR · 1 anchor + 3 scaffolds)"
  - "NEW REGLA evidencias canon DUAL: anchor S5 aplica=true E3 C03 Lista Verificación No 3 · scaffolds aplica=false"
  - "NEW REGLA dimension dual: anchor procedimental · scaffolds cognitiva"
  - "Arquetipos v2.0 PRESERVADOS como REFERENCIA"
---

# PM-2.6: LISTENING COMPREHENSION — THE AUDITORY ANCHOR

## FPI SENA — Bilingüismo
## Manual Clínico de Actividades para el Desarrollo de la Comprensión Auditiva

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-2.6 |
| **Nombre** | Listening Comprehension — The Auditory Anchor |
| **Subfase guía SENA** | 3.3 Actividades de apropiación del conocimiento |
| **Ubicación en la Guía** | Sección 3.3 Apropiación |
| **Conjunto** | B — Oral (Listening → Pronunciation → Speaking) |
| **Tipo de Evidencia SENA** | N/A (actividad de input receptivo auditivo) |
| **Instrumento** | Learner's Worksheet |
| **Estructura** | MENÚ DE ARQUETIPOS — el instructor elige y combina |
| **Rol en el sistema** | Recicla el vocabulario y grammar del Conjunto A en formato oral |

---

## FUNDAMENTO NEUROCOGNITIVO

El Listening opera dentro de las limitaciones de la **Memoria de Trabajo** (3-7 piezas de información). La sobrecarga cognitiva es el enemigo #1 de la comprensión auditiva en A1. Por eso:

- **Chunking:** La información se fragmenta en trozos pequeños
- **Esquemas previos:** El pre-listening activa "carpetas mentales" que reducen carga
- **Andamiaje progresivo:** De la palabra aislada → chunk → oración → discurso

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Master Anchor Text (texto ancla para crear paralelo oral) | PM-2.3 |
| Story B (texto auténtico curado para listening) | PM-1.2 |
| Toolbelt consolidado (vocabulario, chunks) | PM-2.5 |
| Communicative functions | PM-1.2 |
| Grammar targets | PM-1.2 (vía PM-2.10) |
| Arquetipos anteriores (Conjunto A) | PM-2.3, PM-2.4, PM-2.5 |
| Nivel CEFR | PM-1.2 |

---

## MODELO DE MENÚ: EL INSTRUCTOR ELIGE

El Listening NO tiene una estructura fija. El instructor elige un arquetipo principal (o combina técnicas de varios) según el tipo de comprensión auditiva que quiere desarrollar y el momentum del Conjunto B.

```
EL INSTRUCTOR RECIBE:
"Elige el enfoque de listening para esta guía. Puedes elegir UNO como base
o COMBINAR técnicas de varios."

Opción A — Micro-Skills Foundation  [fonemas, sílabas, segmentación, léxico, sintaxis]
Opción B — Phase-Based Framework   [Pre/While/Post estructurado]
Opción C — TBLT Listening          [Information-gap, Reasoning-gap, Opinion-gap]
Opción D — Bloom Progression       [de Recordar a Crear con demanda cognitiva creciente]
Opción E — Advanced Techniques     [Shadowing, Dictogloss, Predictive Listening]
Opción F — Multimedia Production   [Podcasts, soundscapes, VR, síntesis]

O puedes combinar. Ejemplo: "Quiero el andamiaje del B (Pre/While/Post)
pero las micro-skills del A (Word Boundaries) como actividades during."
```

---

## EL SCRIPT DE AUDIO (The Auditory Anchor)

Independientemente del arquetipo elegido, PM-2.6 produce un **guion de audio** que es el insumo auditivo de la guía.

**Origen del script:**
- **Primario:** Se adapta de Story B (texto auténtico curado en PM-1.2), transformado a formato oral
- **Secundario:** Si Story B no es usable directamente, la IA genera un script nuevo inspirado en el contenido y universo de Story B

**El script DEBE:**
- Reciclar al menos 10 de los 20 términos de vocabulario (ya vistos en Conjunto A)
- Incluir las grammar targets de la guía de forma natural
- Usar personajes DIFERENTES a los del Reading (PM-2.3)
- Ser un género oral auténtico (phone call, voicemail, meeting, interview, radio, podcast)
- Incluir marcadores orales naturales (hey, so, right, ok, uh, well)
- Extensión: 150-180 palabras
- Nivel A1 oral (frases cortas, velocidad moderada)

**TTS Note obligatoria:**
- Velocidad recomendada (0.85x para TTS)
- Pausas marcadas (/)
- Número de voces (1 o 2 speakers)
- Tono y entonación natural

---

## 6 ARQUETIPOS DE LISTENING

### ARQUETIPO A — MICRO-SKILLS FOUNDATION (Habilidades auditivas fundamentales)

**Cuándo funciona:** Cuando los aprendices tienen dificultades con la decodificación auditiva básica (fonemas, límites de palabra, ritmo), cuando el vocabulario técnico contiene sonidos nuevos para hispanohablantes, o cuando se quiere construir una base auditiva sólida.

**Fundamento:** Antes de comprender discursos completos, el aprendiz necesita dominar las micro-habilidades: reconocer fonemas, identificar patrones de sílaba, segmentar el flujo del habla, recuperar léxico y analizar sintaxis básica. Cada micro-skill es un bloque del edificio de la comprensión.

**Micro-skills disponibles (el instructor elige 2-3):**

| Micro-skill | Técnicas |
|-------------|----------|
| **A1. Reconocimiento de fonemas** | Faulty Echo, Write it as you hear it, Spot silent letters, Track the sound |
| **A2. Patrones de sílabas y entonación** | Syllable building blocks, Syllable bingo, Spot the stressed syllable |
| **A3. Segmentación de palabras** | Break the flow, Spot the liaison, Faulty transcript, Word grab |
| **A4. Recuperación léxica** | Sentence bingo, Faulty translation, Spot the nonsense, Tick or cross |
| **A5. Análisis sintáctico (Parsing)** | Sentence puzzle, Fixy echo, Guess the next word |
| **A6. Chunking (Fragmentación)** | Delayed repetition, Delayed dictation |

**Estructura interna:**

```
PRE-LISTENING (activación de esquemas):
- Survival Words del script (3-4 términos clave)
- Predicción: "¿De qué crees que trata este audio?"

WHILE-LISTENING (micro-skill practice):
- Primera escucha: comprensión general (gist)
- Segunda escucha: práctica de micro-skill(s) elegida(s)
  • Fonemas: Faulty Echo o Track the sound
  • Sílabas: Spot the stressed syllable
  • Segmentación: Break the flow o Word grab
  • Léxico: Sentence bingo o Spot the nonsense
  • Sintaxis: Guess the next word
  • Chunking: Delayed repetition

POST-LISTENING (verificación):
- Verificar predicciones
- Reconstruir el script usando las notas
- Reflexión: "¿Qué sonido/palabra fue más difícil de entender?"
```

**Demanda cognitiva:** LOTS (recordar, comprender). Construye la base auditiva.

**Dinámica de interacción:** Individual (escucha) → parejas (verificar) → clase completa (compartir).

**ACTÚA COMO:**
> Listening Micro-Skills Coach & ESP Auditory Foundation Specialist. Builds the foundational auditory skills that make listening comprehension possible. Your activities train the ear before training the brain — because you can't understand what you can't decode.

---

### ARQUETIPO B — PHASE-BASED FRAMEWORK (Estructura Pre/While/Post)

**Cuándo funciona:** Cuando se quiere un flujo estructurado y predecible, cuando el instructor prefiere un andamiaje progresivo claro, o cuando el grupo necesita estabilidad metodológica.

**Fundamento:** El framework de 3 fases (Pre-While-Post) es el estándar de la enseñanza de listening. Cada fase tiene un propósito claro: activar esquemas → extraer significado → consolidar comprensión.

**Técnicas disponibles por fase:**

| Fase | Técnicas |
|------|----------|
| **Pre-Listening** | Brainstorming, predicción con título/imagen, mapeo mental, pre-enseñanza de vocabulario clave |
| **While-Listening** | Toma de notas guiada, verificación de hipótesis, completar organizadores gráficos, reordenar fragmentos |
| **Post-Listening** | Reconstrucción colaborativa del texto, reseña crítica, discusión con preguntas divergentes |

**Estructura interna:**

```
PRE-LISTENING (activación):
- Presentar título/imagen del audio
- Brainstorming: "¿Qué palabras esperas escuchar?"
- Pre-enseñanza SOLO del vocabulario "cuello de botella"
- Mapa mental en pizarra (clase completa)

WHILE-LISTENING (extracción):
- Primera escucha: plantilla de toma de notas (espacios en blanco, organizador gráfico)
- Segunda escucha: completar/verificar información
- El alumno escucha PARA ALGO (no solo "escucha y entiende")

POST-LISTENING (consolidación):
- Reconstrucción colaborativa: en parejas, reconstruir el texto con las notas
- Preguntas divergentes: "¿Qué harías tú en esta situación?"
- Producción: reseña, resumen o debate sobre el tema
```

**Demanda cognitiva:** LOTS a HOTS. Comprensión literal (while) → inferencial y crítica (post).

**Dinámica de interacción:** Clase completa (pre) → individual (while) → parejas/grupos (post).

**ACTÚA COMO:**
> Structured Listening Instructor & ESP Comprehension Architect. Designs listening lessons with a clear before-during-after flow. Your framework turns passive listening into active comprehension — every phase has a purpose, every activity has a verification step.

---

### ARQUETIPO C — TBLT LISTENING (Escucha basada en tareas)

**Cuándo funciona:** Cuando el audio contiene información procesable (datos, opiniones, problemas), cuando se quiere desarrollar escucha activa con propósito comunicativo, o cuando se busca integrar listening con speaking/writing.

**Fundamento:** En TBLT, el aprendiz escucha PARA HACER ALGO — resolver un problema, llenar un vacío de información, tomar una decisión. La comprensión se verifica por el resultado de la tarea, no por preguntas sobre el audio.

**Tipos de tarea disponibles (el instructor elige 1-2):**

| Tipo | Descripción |
|------|-------------|
| **Information-gap** | Jigsaw Listening (cada grupo escucha una parte), Dictogloss Cooperativo (reconstruir texto denso) |
| **Reasoning-gap** | Escuchar opciones y deducir la mejor según restricciones (presupuesto, tiempo, preferencias) |
| **Opinion-gap** | Escuchar un dilema y formular argumento personal (sin respuesta correcta) |

**Estructura interna:**

```
PRE-LISTENING (briefing de tarea):
- Presentar la tarea: "Vas a escuchar [audio] para [objetivo]"
- Explicar las restricciones/parámetros de la tarea
- Survival Words si es necesario

WHILE-LISTENING (ejecución de tarea):
- Information-gap: cada grupo/pareja escucha SU porción → toma notas
- Reasoning-gap: escucha las opciones → evalúa contra restricciones
- Opinion-gap: escucha el dilema → forma tu posición
- Primera escucha: captar la tarea
- Segunda escucha: completar detalles

POST-LISTENING (resultado + negociación):
- Information-gap: intercambiar información oralmente → reconstruir completo
- Reasoning-gap: presentar la decisión + justificación
- Opinion-gap: argumentar la posición + debatir
- Reflexión: "¿La tarea fue fácil o difícil? ¿Por qué?"
```

**Demanda cognitiva:** LOTS a HOTS. Comprender (extraer info) → Analizar (evaluar opciones) → Evaluar (argumentar posición).

**Dinámica de interacción:** Clase completa (briefing) → parejas/grupos (tarea) → clase completa (resultado).

**ACTÚA COMO:**
> TBLT Listening Designer & ESP Task Architect. Creates listening tasks where comprehension serves a real purpose. Your tasks don't ask "What did you hear?" — they ask "What will you DO with what you heard?"

---

### ARQUETIPO D — BLOOM PROGRESSION (Progresión cognitiva)

**Cuándo funciona:** Cuando se quiere maximizar la demanda cognitiva del listening, cuando el audio permite múltiples niveles de análisis, o cuando se busca desarrollar pensamiento crítico a través de la escucha.

**Fundamento:** No todo listening es igual. Un audio puede trabajarse a nivel de recordar hechos, o a nivel de evaluar argumentos. Este arquetipo escala deliberadamente la demanda cognitiva.

**Niveles de Bloom disponibles (el instructor elige 2-3):**

| Nivel | Actividad |
|-------|-----------|
| **Recordar** | Preguntas de opción múltiple sobre hechos literales, nombres, fechas |
| **Comprender** | Resumir un audio de 5 min en 3 líneas + inferir la postura del hablante |
| **Aplicar** | Escuchar un problema y aplicar la lógica para resolver un caso diferente |
| **Analizar** | Desglosar un discurso: premisas, evidencias, tono, intención oculta |
| **Evaluar** | Escuchar testimonios cruzados y emitir veredicto justificado (detectar falacias) |
| **Crear** | Sintetizar 3 clips de audio y crear un podcast original combinando fuentes |

**Estructura interna:**

```
PRE-LISTENING (posicionamiento cognitivo):
- Pregunta de apertura según nivel Bloom elegido:
  • Recordar: "Escucha y busca [dato específico]"
  • Evaluar: "Escucha y decide quién tiene razón"
  • Crear: "Escucha 3 fuentes y crea tu propia versión"

WHILE-LISTENING (procesamiento según nivel):
- Primera escucha: nivel base (Recordar/Comprender)
- Segunda escucha: nivel superior (Analizar/Evaluar)
- Andamiaje: organizador gráfico según nivel (tabla para Recordar, mapa de argumentos para Analizar)

POST-LISTENING (producción según nivel):
- Recordar/Comprender: verificación de respuestas literales/paráfrasis
- Aplicar: resolver caso nuevo con la lógica del audio
- Analizar: presentar el mapa de argumentos
- Evaluar: debatir con justificaciones
- Crear: presentar el producto original (podcast, continuación, propuesta)
```

**Demanda cognitiva:** Escalable de LOTS a HOTS. El instructor define el techo cognitivo.

**Dinámica de interacción:** Individual (escucha) → parejas (verificación) → clase completa (producción según nivel).

**ACTÚA COMO:**
> Cognitive Listening Designer & ESP Bloom Specialist. Designs listening activities that scale from basic recall to creative synthesis. Your activities prove that the same audio can be easy or hard — it depends on what you ask the learner to DO with it.

---

### ARQUETIPO E — ADVANCED TECHNIQUES (Técnicas de alto impacto)

**Cuándo funciona:** Cuando los aprendices tienen un nivel base de comprensión y necesitan ir más allá, cuando se quiere desarrollar prosodia y procesamiento automático, o cuando se busca entrenar la memoria de trabajo.

**Fundamento:** Las técnicas avanzadas no sustituyen la comprensión básica — la potencian. Shadowing entrena la prosodia, Dictogloss entrena la memoria y la precisión, Predictive Listening entrena la anticipación.

**Técnicas disponibles (el instructor elige 1-2):**

| Técnica | Qué desarrolla |
|---------|----------------|
| **Shadowing** | Fluidez prosódica: repetir con desfase mínimo, imitando entonación y ritmo exactos |
| **Dictogloss** | Memoria + precisión: escuchar texto denso, tomar notas clave, reconstruir en grupo |
| **Predictive Listening** | Anticipación: pausar discurso con marcadores (however, moreover) y predecir lo que sigue |
| **Listening Journals** | Metacognición: documentar estrategias usadas, dificultades encontradas, plan de mejora |
| **Visual Support** | Reducción de carga cognitiva: videos, infografías, esquemas como andamiaje simultáneo |

**Estructura interna:**

```
PRE-LISTENING (preparación avanzada):
- Explicar la técnica elegida y su propósito
- "Hoy vamos a [shadowing/dictogloss/etc.] porque..."
- Survival Words + contexto del audio

WHILE-LISTENING (técnica en acción):
- Shadowing: escuchar con audífonos → repetir con desfase mínimo (2-3 palabras)
  • Primera pasada: intentar mantener el ritmo
  • Segunda pasada: enfocar en entonación
  • Tercera pasada: enfocar en enlaces sonoros
- Dictogloss: escuchar texto denso 2 veces → tomar notas clave → reconstruir en grupo
- Predictive Listening: escuchar → pausar en marcador → predecir → continuar → verificar
- Listening Journals: escuchar → documentar estrategias, dificultades, plan
- Visual Support: ver video/infografía mientras escucha → conectar modalidades

POST-LISTENING (evaluación de la técnica):
- Comparar producción del alumno con el original
- Reflexión: "¿La técnica me ayudó? ¿Cómo?"
- Autoevaluación: "¿Mejoró mi [fluidez/memoria/anticipación]?"
```

**Demanda cognitiva:** HOTS. La técnica misma implica procesamiento complejo (imitación, reconstrucción, predicción).

**Dinámica de interacción:** Individual (shadowing, journals) → parejas/grupos (dictogloss) → clase completa (comparación).

**ACTÚA COMO:**
> Advanced Listening Trainer & ESP Prosody Specialist. Uses high-impact techniques that push learners beyond basic comprehension. Your techniques don't just test listening — they TRAIN it, building the neural pathways that make fluent listening automatic.

---

### ARQUETIPO F — MULTIMEDIA PRODUCTION (Producción y síntesis)

**Cuándo funciona:** Cuando se quiere integrar listening con producción creativa, cuando el programa técnico tiene componentes multimedia, o cuando se busca desarrollar competencia del siglo XXI.

**Fundamento:** El listening no termina en la comprensión — puede generar producción. El aprendiz escucha, procesa y CREA algo nuevo: un podcast, una continuación, una evaluación crítica, una recreación sonora.

**Producciones disponibles (el instructor elige 1):**

| Producción | Descripción |
|------------|-------------|
| **Podcast Debate/Roundtable** | 3-4 alumnos simulan panel de discusión basado en fuentes de audio previas |
| **Podcast Solo/Monologue** | Un estudiante expone argumento estructurado respondiendo al audio |
| **Podcast Educational** | Estudiantes explican concepto complejo a audiencia más joven |
| **Podcast Meta-Analytic** | Escuchar podcast real → grabar audio revisando/criticando/summarizando |
| **Sound Design** | Escuchar soundscapes → desglosar componentes → recrear digitalmente o análogamente |
| **Interview Simulation** | Un estudiante asume rol del personaje del audio → clase le hace preguntas improvisadas |
| **Spin-offs** | Idear secuelas/precuelas/tramas derivadas del audio (creativo) |

**Estructura interna:**

```
PRE-LISTENING (input + propósito):
- Escuchar el audio (script de PM-2.6) con propósito de producción
- "Después de escuchar, vas a [crear un podcast / entrevistar / diseñar sonido]"
- Anotar: datos clave, opiniones, vocabulario útil

WHILE-LISTENING (extraction for production):
- Primera escucha: comprensión general
- Segunda escucha: tomar notas específicas para la producción planeada
  • Para podcast: argumentos, datos, quotes
  • Para interview: personaje, datos biográficos, situación
  • Para spin-off: personajes, conflicto, resolución

POST-LISTENING (producción):
- Preparación: planificar la producción (guión, roles, estructura)
- Ejecución: grabar/presentar la producción
- Evaluación cruzada: los compañeros evalúan la producción
- Reflexión: "¿Qué aprendí al CREAR algo basado en lo que escuché?"
```

**Demanda cognitiva:** HOTS (analizar, evaluar, crear). La comprensión del audio es el INPUT para la producción.

**Dinámica de interacción:** Individual (escucha + notas) → grupos (preparación + producción) → clase completa (presentación + evaluación).

**ACTÚA COMO:**
> Multimedia Listening Producer & ESP Creative Output Specialist. Turns listening input into creative output. Your activities prove that listening is not the end of learning — it's the beginning of creation.

---

## FORMATO DE SALIDA ESTÁNDAR

Independientemente del arquetipo elegido, el worksheet tiene esta estructura base:

```
WORKSHEET: THE AUDITORY ANCHOR — Listening Comprehension
[Programa] | [Guía #] | [Macro-Temática] | Nivel A1

> 💬 INSTRUCCIÓN BILINGÜE:
> [Mensaje motivacional en inglés simple + español en cursiva]

🎧 AUDIO CONTEXT
[Descripción de la situación auditiva: quién, dónde, qué pasa]

📝 TTS NOTE (Solo para el instructor)
[Velocidad 0.85x / pausas / número de voces / tono]

📖 THE AUDITORY ANCHOR SCRIPT
[Guion de audio, 150-180 palabras, adaptado de Story B]

PRE-LISTENING
[Activación + predicción — según arquetipo]

WHILE-LISTENING
[Actividad principal — según arquetipo]

POST-LISTENING
[Consolidación + producción — según arquetipo]
```

---

## COHERENCIA CON ARQUETIPOS ANTERIORES

El arquetipo de listening (PM-2.6) debe ser coherente con los arquetipos del Conjunto A:

| Reading (PM-2.3) | Writing (PM-2.4) | Literacy (PM-2.5) | Listening recomendado (PM-2.6) |
|------------------|------------------|-------------------|-------------------------------|
| TBLT Cycle | Collaborative TBLT | Interactive Literacy | C) TBLT Listening |
| Comprehension Strategies | Academic/Formal | Vocabulary Development | D) Bloom Progression |
| Information Gap | Genre-Based | Reading Fluency | A) Micro-Skills Foundation |
| Cooperative | AI-Mediated | Writing Scaffolding | B) Phase-Based Framework |
| Multimodal | Exploratory | Phonics & Spelling | E) Advanced Techniques |
| HOTS Focus | Academic/Formal | Vocabulary Development | F) Multimedia Production |

**Recomendación, no regla.**

---

## PROMPT PARA IA

```
ACTÚA COMO: [SEGÚN ARQUETIPO ELEGIDO — ver opciones abajo]

Tu tarea: Generar el WORKSHEET "THE AUDITORY ANCHOR" — Listening Comprehension para la guía indicada.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Tema técnico: [descripción]
- Universo narrativo: [empresa, sector, contexto]
- Story B (texto auténtico curado en PM-1.2): [resumen, fuente, URL]
- Master Anchor Text (PM-2.3): [género, resumen — para NO repetir]
- Toolbelt (PM-2.5): [20 términos — para reciclar en formato oral]
- Grammar targets: [estructuras de PM-2.10]
- Género textual sugerido para Listening: [phone call, voicemail, meeting, etc. — DIFERENTE al Reading]
- Arquetipos anteriores: [Conjunto A]
- Arquetipo de listening elegido: [A / B / C / D / E / F o combinación]
- Combinación personalizada (si aplica): [qué técnicas de qué arquetipos]
- Nivel CEFR: [default A1.1-A1.2]

### ARQUETIPOS DISPONIBLES:

A) MICRO-SKILLS FOUNDATION — Fonemas, sílabas, segmentación, léxico, sintaxis, chunking
B) PHASE-BASED FRAMEWORK — Pre/While/Post estructurado con técnicas por fase
C) TBLT LISTENING — Information-gap, Reasoning-gap, Opinion-gap
D) BLOOM PROGRESSION — De Recordar a Crear con demanda cognitiva creciente
E) ADVANCED TECHNIQUES — Shadowing, Dictogloss, Predictive Listening, Listening Journals
F) MULTIMEDIA PRODUCTION — Podcasts, interviews, sound design, spin-offs

### INSTRUCCIONES DE GENERACIÓN:

1. Genera AUDIO CONTEXT:
   - Descripción de la situación auditiva (quién, dónde, qué pasa)
   - Género oral auténtico DIFERENTE al del Reading
   - Instrucciones bilingües

2. Genera TTS NOTE:
   - Velocidad (0.85x), pausas (/), número de voces, tono

3. Genera THE AUDITORY ANCHOR SCRIPT:
   - Adapta Story B a formato oral (150-180 palabras)
   - Personajes DIFERENTES a los del Reading
   - Recicla ≥10 de los 20 términos del Toolbelt
   - Marcadores orales naturales (hey, so, right, ok)
   - Grammar targets presentes naturalmente

4. Genera PRE-LISTENING (según arquetipo):
   - A: Survival Words + predicción fonética
   - B: Brainstorming + mapa mental + pre-enseñanza de vocabulario "cuello de botella"
   - C: Briefing de tarea + restricciones
   - D: Pregunta de apertura según nivel Bloom
   - E: Explicación de técnica + contexto
   - F: Propósito de producción + qué buscar

5. Genera WHILE-LISTENING (según arquetipo):
   - A: Micro-skill practice (elegir 2-3 de Faulty Echo, Track sound, Break flow, Sentence bingo, Guess next word, Delayed repetition)
   - B: Plantilla de toma de notas + verificación de hipótesis
   - C: Ejecución de tarea (Jigsaw, Dictogloss, deducción lógica, argumento personal)
   - D: Procesamiento según nivel (tabla de hechos, resumen, mapa de argumentos, veredicto)
   - E: Técnica en acción (Shadowing con 3 pasadas, Dictogloss, Predictive pausado)
   - F: Notas específicas para producción

6. Genera POST-LISTENING (según arquetipo):
   - A: Verificar predicciones + reconstruir script + reflexión
   - B: Reconstrucción colaborativa + reseña/debate
   - C: Resultado de tarea + justificación + negociación
   - D: Producción según nivel (verificación → aplicación → debate → creación)
   - E: Comparar con original + autoevaluación de técnica
   - F: Preparar + ejecutar + evaluar la producción

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto A1.1-A1.2
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Read the scenario (*Lee el escenario*). PROHIBIDO usar bloques repeditivos de 'Instrucciones'.
- Zero Meta-Talk: output listo para imprimir
- El script recicla vocabulario del Conjunto A (≥10 de 20 términos)
- Género oral DIFERENTE al del Reading
- TTS Note siempre incluida para el instructor
- Coherencia con arquetipos del Conjunto A
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.2 | Story B, vocabulario, grammar targets |
| **Recibe input de** | PM-2.3 | Master Anchor Text (para NO repetir género) |
| **Recibe input de** | PM-2.5 | Toolbelt consolidado (para reciclar en oral) |
| **Alimenta a** | PM-2.8 | Los chunks, fonemas y patrones del audio alimentan la producción oral y el scaffolding de pronunciación (integrado en PM-2.8 desde v2.0 — antes PM-2.7, deprecado) |
| **Se relaciona con** | PM-4.2 | Referencia de género textual para crear paralelo |
| **Se ubica en** | GFPI-F-135 Sección 3.3 | Apropiación |

---

## PRINCIPIO DE TRES VERSIONES

PM-2.6 genera todas las variantes de la tarea de listening:

1. **Listening task de S4 (evidencia de desempeño):** El script de audio original y las actividades de comprensión con feedback formativo.
2. **Ítems cosechados para el cuestionario S6:** Preguntas similares pero diferentes, derivadas del mismo audio técnico.
3. **Ítems del Workbook:** Actividades de refuerzo con audio similar en contexto diferente, para práctica independiente.

Todas las variantes mantienen el mismo vocabulario central y patrones prosódicos, asegurando validez de la evaluación.

---

## ACTIVITY CARD OUTPUT

Esta sección define el output estructurado que este PM entrega al PM-2.11 (GFPI-F-134 Row Assembler).

```yaml
activity_card:
  pm_id: "PM-2.6"
  pm_name: "Listening — The Auditory Anchor"
  session: 4
  phase_sena: "Apropiación"
  rap_id: "[A GENERAR — viene del Session Blueprint PM-2.0]"
  
  activities:
    - number: 1
      type: "procedimental"
      statement: "[A GENERAR — Comprensión de contenido oral técnico en inglés]"
      didactic_strategy: "Aprendizaje basado en tareas"
      didactic_technique: "Investigación guiada"
    
    - number: 2
      type: "procedimental"
      statement: "[A GENERAR — Responder preguntas sobre información específica del audio]"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Think-Pair-Share"
  
  hours:
    direct: 2.0
    autonomous: 0.5
  
  evidence:
    generates_evidence: true
    type: "Desempeño"
    description: "El aprendiz demuestra comprensión de contenido oral en inglés respondiendo preguntas y completando tareas de escucha"
    evaluation_technique: "Observación"
    instrument_number: 3
    instrument_type: "Lista de Chequeo"
  
  environment:
    type: "Aula"
    materials:
      - "Proyector con audio"
      - "Computadores con acceso a video técnico (3 clips, 5 min cada uno)"
      - "Audífonos para trabajo individual"
      - "Plantilla de notas (Notetaking)"
      - "Plataforma Moodle para descargar audio"
    instructors: "Instructor de inglés técnico"
  
  contributes_to_consolidated_quiz: true
  quiz_skill: "Listening"
  quiz_points: 5
  quiz_item_count: 5
```

---

*PM-2.6: Listening Comprehension — The Auditory Anchor*
*Manual Clínico de Actividades para el Desarrollo de la Comprensión Auditiva*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*

---

## EXTENSIÓN v3.0 — PM-2.6 HEREDERO CASCADE PHASE 1 v3.x + ACTIVITY CARD v3.0 (2026-05-02)

PM-2.6 v3.0 hereda cascade Phase 1 v3.x · emite Activity Card v3.0 con **pattern dual anchor+scaffolds** · típicamente N cards (1 anchor S5 produce E3 + N-1 scaffolds que NO producen evidencia formal).

### REGLAS NEW v3.0 (pattern DUAL · más complejo que PM-2.3/2.4)

- **REGLA · Input cascade:** consume pm-2-0 (multi-S) + pm-1-2.Bn.story_b_listening (varios bloques)
- **REGLA · Activity Card v3.0 DUAL:**
  - **Anchor S5 (B2 RA2):** `dimension: procedimental` · `evidencias.aplica=true` · `tipo: "Desempeño"` · `tecnica_evaluacion: "Observación"` · `instrumento_numero: 3` · `instrumento_tipo: "Lista de Chequeo"` · `codigo_canon: "E3"` · `criterio_canon_evaluado: "C03"`
  - **Scaffolds S3/S7/S9:** `dimension: cognitiva` · `evidencias.aplica=false` · campos null · render "No aplica" literal
- **REGLA · Determinación anchor vs scaffold:** lectura de `_produces_evidencia` heredado de pm-2-0.actividad target. Si `"E3"` → anchor S5. Si `null` → scaffold.
- **REGLA · descripcion 200-600 palabras patrón canon** (target 480-580 sweet spot)
- **REGLA · Heredancia traceability:** `_anclaje_matriz_heredado` literal copy de pm-1-2.Bn.story_b_listening
- **REGLA · 7 validation_checks** BLOQUEANTES (con check 3 dual: anchor → aplica=true E3 · scaffold → aplica=false)
- **Arquetipos v2.0 PRESERVADOS** como REFERENCIA

### Caso operacional esperado IMARPOR-V2

- Input: pm-2-0 4 actividades (S3 scaffold RA1 + S5 anchor RA2 E3 + S7 scaffold RA3 + S9 scaffold RA4)
- Output esperado: 4 Activity Cards v3.0 · 1 anchor (E3 C03) + 3 scaffolds (No aplica) · 7/7 PASS

---

*PM-2.6 v3.0 · Listening Anchor+Scaffolds Heredero · Activity Card v3.0 canon Sergio · pattern DUAL · evidencia E3 C03 anchor S5 + scaffolds S3/S7/S9*
*Sergio Cortés decisión arquitectónica 2026-05-02 · cascade Wave 2 IMARPOR-V2*
