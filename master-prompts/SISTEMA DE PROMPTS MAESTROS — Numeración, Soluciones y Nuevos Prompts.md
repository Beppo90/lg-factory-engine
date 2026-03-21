# SISTEMA DE PROMPTS MAESTROS — FÁBRICA CURRICULAR FPI SENA
### Portafolio del Instructor — Sergio | Bilingüismo SENA
*Versión 2.0 · Soluciones implementadas · Marzo 2026*

---

## NUEVA NUMERACIÓN LIMPIA

La numeración sigue la lógica **FASE.SECUENCIA**, donde el primer dígito indica la fase del desarrollo curricular y el segundo la secuencia dentro de esa fase.

```
FASE 1 — ANÁLISIS (Del diseño curricular a la arquitectura macro)
├── PM-1.1  Ruta Macrotemática (6 Bloques)
└── PM-1.2  Scope & Sequence (Desarrollo por Bloque)

FASE 2 — PLANEACIÓN (Diseño de la Guía de Aprendizaje)
│
├── REFLEXIÓN INICIAL
│   └── PM-2.1  The Spark & Problematic Situation
│
├── CONTEXTUALIZACIÓN
│   └── PM-2.2  The Gap Analysis & Prior Knowledge
│
├── APROPIACIÓN
│   ├── PM-2.3  Reading Comprehension (The Master Anchor & HOTS)
│   ├── PM-2.4  Listening Comprehension (The Auditory Anchor & HOTS)
│   ├── PM-2.5  Vocabulary & Language Function (Literacy Skills)
│   ├── PM-2.6  Pronunciation & Speaking Skills
│   ├── PM-2.7  Grammar & Structure Use (Literacy Skills)
│   └── PM-2.8  Writing Skills & Pragmatics (Task-Based)
│
├── TRANSFERENCIA
│   └── PM-2.9  Speaking Production & Simulation (The Mission) ← NUEVO
│
└── TRANSFERENCIA — EVALUACIÓN
    └── PM-2.10 Examen Escrito (estructura por definir - Sergio)

FASE 3 — EJECUCIÓN (por recibir)

FASE 4 — EVALUACIÓN
├── PM-4.1  Sistema de Evaluación (Matriz + Quiz + Checklist + Rúbrica)
└── PM-4.1§5 Feedback Loop — Retroalimentación al Ciclo ← NUEVO

         ANÁLISIS (PM-1.x)
        ↗                ↘
EVALUACIÓN (PM-4.x)    PLANEACIÓN (PM-2.x)
        ↖                ↙
         EJECUCIÓN (PM-3.x)
```

### Tabla de Equivalencias (Numeración Anterior → Nueva)

| Antes | Ahora | Nombre |
|---|---|---|
| PM-0 | **PM-2.1** | Reflexión Inicial (The Spark) |
| PM-0.5 | **PM-2.2** | Contextualización (The Gap Analysis) |
| PM-2.0 | **PM-2.3** | Reading Comprehension (Master Anchor) |
| PM-2.1 | **PM-2.4** | Listening Comprehension (Auditory Anchor) |
| PM-3 | **PM-2.5** | Vocabulary & Language Function |
| PM-4 | **PM-2.6** | Pronunciation & Speaking Skills |
| PM-5 | **PM-2.7** | Grammar & Structure Use |
| PM-6 | **PM-2.8** | Writing Skills & Pragmatics |
| *(faltante)* | **PM-2.9** | Speaking Production & Simulation ← NUEVO |
| PM-Eval | **PM-4.1** | Sistema de Evaluación |

---

## PARÁMETROS ESTÁNDAR DEL SISTEMA

Estos parámetros aplican a **todos** los prompts del sistema y deben estar interiorizados como contexto permanente.

### 1. Nivel CEFR por Defecto

```
NIVEL ESTÁNDAR:  A1.1 — A1.2
VARIABLE:        Sí (el instructor puede ajustar a A2 en casos excepcionales)
REALIDAD:        El 98% de los aprendices SENA llegan en nivel A- a A1
```

### 2. Duración Estándar por Guía de Aprendizaje

```
ESTRUCTURA ESTÁNDAR:  1 GUÍA = 24 HORAS = 1 MACROTEMÁTICA

PROGRAMAS TÉCNICOS (≈180h):
├── 6 macrotemáticas × 1 guía cada una = 6 GUÍAS
├── Formación directa:  144 horas (6 × 24h)
└── Formación autónoma:  36 horas

PROGRAMAS TECNOLÓGICOS (≈350h):
├── 6 macrotemáticas × 2 guías cada una = 12 GUÍAS
├── Formación directa:  288 horas (12 × 24h)
└── Formación autónoma:  62 horas
```

### 3. Nivel Bloom y Dificultad Técnica

```
BLOOM:           Relativo — depende de la naturaleza de cada actividad,
                 los objetivos de aprendizaje y el outcome esperado.
                 Las actividades NO deben ser monótonas en su nivel cognitivo.

DIFICULTAD TÉCNICA: SIMPLE — Input comprensible dentro de entornos
                    ocupacionales con procesos y procedimientos técnicos
                    de comprensión simple.
```

### 4. Needs Analysis

```
SE OBVIA como paso separado.
RAZÓN: El contenido ya parte del entorno ocupacional del aprendiz,
       analizado y planeado para ser necesario y altamente motivacional.
       Las guías tienen objetivos medibles y entendimientos definidos.
       La Reflexión Inicial (PM-2.1) cumple esa función diagnóstica.
```

### 5. RAPs y Competencia — Regla de Inserción

```
REGLA: Cada prompt debe dejar el ESPACIO para que el instructor
       inserte manualmente la competencia y el RAP.
       Es OPCIONAL en la ejecución (el prompt funciona con o sin ellos),
       pero el espacio siempre debe existir.
NOTA:  La transcripción literal desde Sofía Plus es responsabilidad
       del instructor. El sistema no la parafrasea ni la genera.
```

### 6. Formatos GFPI

```
ESTADO: Pendiente de integración.
PLAN:   Primero se consolida el sistema automatizado completo.
        Luego se ingresa el formato de la guía de aprendizaje
        (GFPI-F-019 / F135) como capa de salida final.
```

---

## CORRECCIÓN TERMINOLÓGICA — PM-2.4 (ex PM-2.1)

En el PM-2.4 (Listening Comprehension), la **Actividad 3** se corrige:

**ANTES (incorrecto):**
> Actividad 3 (Create/Transfer - **The Speaking Blueprint**): Prepara al aprendiz para su futura tarea de Speaking. Pídele que haga un **"Shadowing"** (Sombra auditiva): debe extraer del guion la frase exacta (chunk)...

**AHORA (correcto):**
> Actividad 3 (Create/Transfer - **The Speaking Blueprint**): Prepara al aprendiz para su futura tarea de Speaking. Pídele que realice un ejercicio de **"Noticing & Chunk Extraction"**: debe identificar y extraer del guion la frase exacta (chunk) que el hablante usó para pedir ayuda o dar un reporte, y escribirla en su "Manual de Supervivencia Oral" para usarla después.

**Justificación:** El *Shadowing* es repetición simultánea con el audio. Lo que el prompt requiere es *Noticing* (identificación consciente de patrones) y *Chunk Extraction* (aislamiento de bloques funcionales de lenguaje para reutilización). La técnica es correcta; el nombre técnico era impreciso.

---

## NUEVO PROMPT: PM-2.9 — SPEAKING PRODUCTION & SIMULATION (THE MISSION)

*Este es el eslabón que faltaba entre la Apropiación (PM-2.3 a PM-2.8) y la Evaluación (PM-4.1). Genera el escenario de simulación oral que la Checklist de Desempeño del PM-4.1 va a evaluar.*

---

### 🏭 PM-2.9: GENERADOR DE SPEAKING PRODUCTION & SIMULATION (THE MISSION)

*Usa este prompt para diseñar la tarea de producción oral extendida de la Guía de Aprendizaje. Este prompt obliga a la IA a generar un escenario de simulación profesional realista (Role-Play, Presentación Técnica, Reporte Oral) donde el aprendiz integre TODO el input reciclado de la unidad (Reading, Listening, Vocabulary, Grammar) para resolver una misión comunicativa auténtica de su entorno laboral.*

**Copia y pega lo siguiente:**

> **ACTÚA COMO:** Senior ESP Task Designer, Simulation Architect & Master Bilingual Instructor (SENA). Eres experto en Task-Based Language Teaching (TBLT), diseño de simulaciones profesionales y el modelo FPI de Formación Profesional Integral.
>
> **MISIÓN:** Generar un recurso de producción oral extendida (Speaking Simulation Task) que funcione como la MISIÓN FINAL de la fase de Apropiación/Transferencia. El aprendiz debe integrar el vocabulario, la gramática, la pronunciación y las funciones comunicativas trabajadas en toda la unidad para resolver una tarea comunicativa auténtica de su campo ocupacional. Esta simulación será evaluada directamente con la Lista de Chequeo de Desempeño.
>
> **VARIABLES DE ENTRADA:**
> * **Programa:** [INSERTA PROGRAMA, ej: Análisis y Desarrollo de Software - ADSO / Redes Eléctricas]
> * **Competencia / Resultado de Aprendizaje:** [INSERTA RAP LITERAL DE SOFÍA PLUS — opcional pero recomendado]
> * **Tema Técnico / Escenario Laboral:** [INSERTA ESCENARIO, ej: Daily Scrum Meeting / Reporte oral de incidente eléctrico / Soporte técnico por teléfono a un cliente extranjero]
> * **Nivel Objetivo:** A1/A2 Estricto (Frases cortas, vocabulario técnico concreto, inteligibilidad sobre perfección).
> * **Vocabulario y Gramática a Reciclar:** [PEGA AQUÍ LAS PALABRAS CLAVE Y ESTRUCTURAS TRABAJADAS EN PM-2.3 a PM-2.8, ej: Imperativos + Present Simple + vocabulario de troubleshooting: crash, reboot, update, server, log]
> * **Formato de Simulación:** [ELIGE UNO: Role-Play en parejas / Presentación técnica individual / Reporte oral al supervisor / Llamada telefónica / Reunión de equipo simulada]
>
> **REGLAS DE DISEÑO (OBLIGATORIAS):**
>
> 1. **El Escenario (The Mission Brief):** Escribe una descripción del escenario de simulación (máximo 80 palabras) en formato de "Orden de Misión" o "Briefing". El aprendiz debe saber exactamente: ¿Dónde está? ¿Quién es? ¿Con quién habla? ¿Qué problema debe resolver hablando? **REGLA DE ORO TBLT:** El escenario debe contener un vacío de información genuino o un problema que solo se resuelve mediante la comunicación oral. No puede ser un monólogo memorizado.
>
> 2. **Los Roles (The Cast):** Define claramente los roles de la simulación (mínimo 2 participantes). Describe brevemente el perfil de cada rol y su objetivo comunicativo dentro del escenario. Incluye el nivel de autoridad o relación entre los roles (Ej: Técnico Junior → Supervisor / Cliente → Soporte Técnico).
>
> 3. **El Guion Esqueleto (The Skeleton Script):** NO escribas un guion completo. Genera un esqueleto con las fases de la conversación (Apertura → Problema → Negociación → Cierre) y para cada fase incluye 2-3 **frases de arranque** (Starter Phrases) en inglés simple que el aprendiz puede usar como andamiaje. Estas frases deben ser los **chunks reciclados** de los PM-2.3 a PM-2.8. Presenta este esqueleto como una "Cue Card" (Tarjeta de Apoyo) que el aprendiz puede tener durante la simulación.
>
> 4. **La Regla de Comunicación (The Communication Rule):** Incluye una instrucción clara para el aprendiz que establezca: "El objetivo NO es hablar perfecto. El objetivo es que tu compañero/supervisor/cliente **ENTIENDA** el mensaje y el problema se resuelva." Incluye una nota motivacional híbrida (Inglés/Español) recordando que pueden usar gestos, señalar imágenes o pedir ayuda en español si se bloquean, pero deben intentar primero en inglés.
>
> 5. **El Resultado Comunicativo (The Deliverable):** Define explícitamente qué producto comunicativo debe salir de la simulación. No es solo "hablar bien" — es un resultado verificable (Ej: "Al final de la simulación, el equipo debe haber identificado el problema, acordado una solución y el Técnico debe haber dado la instrucción de reinicio al operador"). Este resultado es lo que la Checklist de Desempeño (PM-4.1) evaluará.
>
> 6. **FORMATO DE SALIDA:** Presenta el documento dividido en dos secciones:
>    * **INSTRUCTOR'S GUIDE** (solo para el instructor): El escenario completo, los roles, las posibles variaciones y los criterios de observación.
>    * **LEARNER'S CUE CARD** (para el aprendiz): El briefing de la misión + el guion esqueleto + las frases de arranque. Formato limpio, visual, con instrucciones híbridas (Inglés simple seguido de la traducción al español en cursiva y entre paréntesis).

---

### 💡 Por qué este prompt cierra el sistema:

1. **Vacío de información TBLT (Regla 1):** A diferencia de un diálogo memorizado, el aprendiz debe *negociar* significado en tiempo real. Si el "cliente" da una falla que el "técnico" no esperaba, debe improvisar con los recursos lingüísticos que tiene.

2. **El Guion Esqueleto (Regla 3):** Resuelve el terror de la página en blanco oral. El aprendiz A1 no sale a improvisar desnudo — tiene su Cue Card con los chunks exactos que ya practicó en Reading, Listening, Vocabulary, Pronunciation y Grammar. Es como un actor que tiene su libreto de referencia pero debe actuar con naturalidad.

3. **Resultado Comunicativo verificable (Regla 5):** La Checklist de Desempeño del PM-4.1 evalúa si el problema se resolvió comunicativamente, no si el acento es perfecto. Esto alinea la evaluación con el principio de inteligibilidad del Lingua Franca Core.

4. **Conexión directa con PM-4.1:** El instructor observa la simulación con la Lista de Chequeo en mano. Los ítems de la checklist ("Ejecuta los pasos del procedimiento técnico en el orden correcto" / "Pronuncia los comandos de forma inteligible") se verifican en tiempo real durante esta misión.

---

## NUEVA SECCIÓN DEL PM-4.1: §5 — FEEDBACK LOOP (RETROALIMENTACIÓN AL CICLO)

*Esta sección se añade al final del PM-4.1 (Sistema de Evaluación), después de las 4 Reglas de Oro del Evaluador. Es la pieza que cierra la espiral y convierte el sistema en circular.*

---

Añadir al PM-4.1 la siguiente sección:

> #### 🔄 5. FEEDBACK LOOP — RETROALIMENTACIÓN AL CICLO (THE SPIRAL CLOSE)
>
> **Uso:** Este es el momento de reflexión del INSTRUCTOR (no del aprendiz). Después de aplicar los instrumentos de evaluación, el instructor analiza los resultados para alimentar el siguiente ciclo de Análisis (PM-1.1).
>
> **Output obligatorio:**
>
> **5A. Tres Preguntas de Reflexión Docente:**
>
> Genera tres preguntas de reflexión que obliguen al instructor a analizar sus propios resultados de evaluación:
> * Una pregunta sobre **efectividad del contenido:** ¿Los temas técnicos y el vocabulario ESP seleccionados fueron relevantes y suficientes para que los aprendices completaran las tareas?
> * Una pregunta sobre **calibración del nivel:** ¿El nivel de dificultad lingüístico (A1/A2) fue apropiado? ¿Hubo frustración excesiva o, al contrario, la tarea fue demasiado fácil?
> * Una pregunta sobre **transferencia real:** ¿Los aprendices demostraron capacidad de usar lo aprendido en un contexto que se acerque a su realidad laboral, o solo reprodujeron mecánicamente?
>
> **5B. Tabla de Retroalimentación al Ciclo:**
>
> Genera una tabla con el siguiente formato:
>
> | ¿Qué funcionó bien? | ¿Qué brecha persiste? | ¿Qué ajustar en el PM-1.1 del próximo ciclo? |
> |---|---|---|
> | *(Ej: El vocabulario de troubleshooting fue altamente motivacional y los aprendices lo retuvieron)* | *(Ej: La simulación oral reveló que los aprendices no lograron formular preguntas, solo responder)* | *(Ej: En el próximo ciclo, incluir "Question Formation" como función comunicativa prioritaria desde el PM-1.2)* |
> | | | |
> | | | |
>
> **5C. Declaración de Cierre Circular:**
>
> Incluye la siguiente nota al pie del instrumento:
>
> *"Los hallazgos de esta tabla alimentan directamente la Fase 1 — Análisis del siguiente ciclo formativo. El instructor debe revisar el PM-1.1 (Ruta Macrotemática) y el PM-1.2 (Scope & Sequence) a la luz de estos resultados antes de iniciar la planeación de la siguiente guía o del siguiente grupo."*

---

### 💡 Por qué el Feedback Loop cierra la espiral:

1. **Rompe la linealidad:** Sin esta sección, el sistema termina en "Evaluar" y el instructor archiva las notas. Con el Feedback Loop, los resultados de la evaluación se convierten en el nuevo **insumo de análisis** del próximo ciclo.

2. **Formaliza la mejora continua:** El SENA exige mejora continua (Actividad 21 del flujo operativo: "Realizar acciones de mejora curricular"). Esta tabla es exactamente eso: evidencia documentada de reflexión y ajuste.

3. **Conecta con el modelo circular:**

```
PM-1.1 (Análisis: Ruta Macrotemática)
        ↓
PM-1.2 → PM-2.1 → PM-2.2 → ... → PM-2.9
        ↓
PM-4.1 (Evaluación: Instrumentos)
        ↓
PM-4.1§5 (Feedback Loop)
        ↓
→ REGRESA A PM-1.1 con datos enriquecidos ←
```

---

## CADENA COMPLETA DEL SISTEMA (POST-SOLUCIONES)

```
FASE 1 — ANÁLISIS
PM-1.1 ──→ PM-1.2
  │                              PARÁMETROS ESTÁNDAR
  │                              ├── CEFR: A1.1-A1.2 (variable)
  │                              ├── Guía: 24h estándar
  ▼                              ├── Técnicas: 6 guías
FASE 2 — PLANEACIÓN              ├── Tecnológicas: 12 guías
PM-2.1 ──→ PM-2.2               ├── Bloom: relativo/variado
  │                              └── Input técnico: simple
  ▼
PM-2.3 ──→ PM-2.4 ──→ PM-2.5 ──→ PM-2.6 ──→ PM-2.7 ──→ PM-2.8
  │    (Reciclaje Circular de Input conecta todos estos prompts)
  ▼
PM-2.9 (The Mission — Speaking Simulation)
  │
  ▼
PM-2.10 (Examen Escrito — estructura por definir, Sergio)
  │
  ▼
FASE 4 — EVALUACIÓN
PM-4.1 (Matriz + Quiz + Checklist + Rúbrica)
  │
  ▼
PM-4.1§5 (Feedback Loop)
  │
  ▼
→ REGRESA A PM-1.1 ←
```

**Total de prompts del sistema: 14**
- Fase 1: 2 prompts
- Fase 2: 10 prompts (9 existentes + 1 nuevo)
- Fase 3: por recibir
- Fase 4: 1 prompt + 1 sección de cierre circular

---

*Sistema de Prompts Maestros — Fábrica Curricular FPI SENA*
*Portafolio Instructor Bilingüismo SENA — Sergio · 2026*
