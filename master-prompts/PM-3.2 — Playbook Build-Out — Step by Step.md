# PM-3.2: PLAYBOOK BUILD-OUT — STEP BY STEP
## Fase 3 · Ejecución | Sistema de Prompts Maestros — LG Factory
## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.2 |
| **Nombre** | Playbook Build-Out — Step by Step |
| **Fase** | 3. Ejecución |
| **Destinatario** | Instructor (documento interno, NO para el aprendiz) |
| **Función** | Expandir UNA sesión del Playbook Outline (PM-3.1) a un plan de clase detallado, minuto a minuto, con Teacher Talk completo, answer keys, notas de facilitación y diferenciación |
| **Analogía** | Si PM-3.1 es el guion de rodaje (qué escenas se filman cada día), PM-3.2 es el storyboard completo (cada toma, cada ángulo, cada línea de diálogo) |
| **Granularidad** | Se genera UNA sesión por ejecución. Para una guía de 8 sesiones, se ejecuta PM-3.2 ocho veces |

---

## INPUT REQUERIDO

Este prompt necesita DOS fuentes:

**Fuente A — La sesión del Outline:**

| Input | Fuente |
|-------|--------|
| Sesión específica a desarrollar (número y nombre) | PM-3.1 (Playbook Outline) |
| Worksheets asignados a esa sesión | PM-3.1 (Overview Table) |
| Bloques y tiempos preliminares (SET-UP / WHILE / WRAP-UP) | PM-3.1 (Mapa detallado) |
| Trabajo autónomo asignado | PM-3.1 (Mapa de trabajo autónomo) |
| Logistics Box de la sesión | PM-3.1 |

**Fuente B — El contenido real de los worksheets:**

| Input | Fuente |
|-------|--------|
| Contenido completo de cada worksheet referenciado | PM-2.x (Producción Fase 2) |
| Texto ancla de Reading (si aplica en esta sesión) | PM-2.3 |
| Script de Listening (si aplica en esta sesión) | PM-2.6 |
| Vocabulario, pronunciación, gramática (según sesión) | PM-2.5, PM-2.7, PM-2.10 |
| Writing task y Speaking simulation (según sesión) | PM-2.4, PM-2.8 |
| Language Functions (material transversal) | PM-2.9 |
| Final Mission (si es sesión integradora) | PM-3.5 |
| Cuestionario Técnico (si es sesión de evaluación) | PM-4.2 |
| Nivel CEFR y universo narrativo | PM-1.2 |

---

## OUTPUT ESPERADO

Un documento titulado:
**`[PROGRAMA] — GUÍA [#] — Session [#]: [NOMBRE] — Build-Out`**

Que contiene:

1. **Session Header** — datos de la sesión (número, nombre, duración, worksheets, habilidades)
2. **Materials Checklist** — lista de verificación de todo lo necesario ANTES de entrar al aula
3. **Board Plan** — qué escribir en el tablero y cuándo
4. **Minute-by-Minute Timeline** — tabla resumen de toda la sesión con franjas de tiempo
5. **SET-UP detallado** — warm-up expandido, Teacher Talk completo, instrucciones paso a paso
6. **WHILE detallado** — cada bloque con: instrucción exacta, Teacher Talk, answer key, facilitation notes, transitions
7. **WRAP-UP detallado** — exit ticket expandido, cierre, asignación autónoma con instrucciones claras
8. **Answer Key Consolidado** — todas las respuestas correctas de la sesión en un solo lugar
9. **Differentiation Notes** — ajustes para aprendices rápidos y aprendices que necesitan más apoyo
10. **Instructor Self-Check** — 5 preguntas de autoevaluación post-sesión

---

## 12 REGLAS DE DISEÑO

### REGLA 1 — UNA SESIÓN POR EJECUCIÓN
Cada ejecución de PM-3.2 produce el Build-Out de UNA sola sesión. Esto permite:
- Revisión y ajuste sesión por sesión
- Detalle suficiente sin comprometer calidad
- Control de coherencia entre el contenido del worksheet y la facilitación

**Nunca generar 2+ sesiones en una sola ejecución.**

### REGLA 2 — TIMELINE MINUTO A MINUTO
La sesión tiene una tabla resumen con franjas de tiempo exactas:

| Tiempo | Duración | Bloque | Actividad | Agrupación |
|--------|----------|--------|-----------|------------|
| 0:00-0:15 | 15 min | SET-UP | Warm-up: Quick Recall | Pairs → Plenary |
| 0:15-0:35 | 20 min | WHILE-A | Pre-Reading: Toolbelt | Plenary |
| ... | ... | ... | ... | ... |

Los tiempos DEBEN sumar exactamente la duración total de la sesión (default 180 min). Se incluye siempre un bloque de BREAK de 10-15 minutos entre los bloques más pesados.

### REGLA 3 — TEACHER TALK COMPLETO
A diferencia de PM-3.1 (que tiene 3-4 frases), PM-3.2 incluye el Teacher Talk EXPANDIDO para cada momento clave:

**Tipos de Teacher Talk:**
- **Opening Script** (2-3 oraciones): Cómo abre la sesión, conecta con la anterior, presenta el objetivo
- **Instruction Giving** (paso a paso): Cómo explica cada actividad con ICQ (Instruction Checking Questions)
- **Transition Cues** (1-2 oraciones): Cómo pasa de un bloque al siguiente
- **Error Correction Cues**: Frases para corregir sin interrumpir flujo ("Good try! Almost — listen again...")
- **Encouragement Cues**: Frases de motivación natural ("You're doing great. Keep going.")
- **Closing Script** (2-3 oraciones): Cómo cierra, qué asigna, qué anticipa

**Formato:** El Teacher Talk va en *cursiva* y entre comillas. Si el nivel es ≤ A1.1, incluye soporte en español entre paréntesis.

**ICQ (Instruction Checking Questions):** Después de dar instrucciones para una actividad, el instructor verifica comprensión:
- "So — are you working alone or in pairs?" (esperan respuesta)
- "How many sentences do you need to write?" (esperan respuesta)
- "Do you write in English or Spanish?" (esperan respuesta)

### REGLA 4 — ANSWER KEY INTEGRADO Y CONSOLIDADO
Cada actividad que tiene respuestas correctas incluye el answer key en DOS lugares:
- **In-line**: Inmediatamente después de la actividad (para referencia rápida mientras circula)
- **Consolidado**: Al final del documento, en una sección única "Answer Key — Session [#]" (para revisión rápida pre-clase)

El answer key incluye:
- Respuestas exactas para fill-in-the-blank, matching, T/F
- Respuestas alternativas aceptables
- Distribución de puntos (si aplica)
- Sample responses para tareas abiertas (producción escrita, justificaciones)

### REGLA 5 — FACILITATION NOTES (💡)
Cada bloque incluye 1-3 notas de facilitación marcadas con 💡. Estas son consejos prácticos para el instructor:

- 💡 *"Los aprendices suelen confundir 'has' con 'is' en esta actividad. Escriba ambas formulas en el tablero como referencia visual permanente."*
- 💡 *"Si un grupo termina antes, pídales que escriban 2 oraciones adicionales usando vocabulario diferente. No dejar aprendices sin tarea."*
- 💡 *"En esta actividad, circule y tome nota de 3 errores comunes. No corrija en el momento — úselos en el debrief."*

Las notas son prácticas, no teóricas. Cero referencia a Bloom, SIOP, o marcos pedagógicos.

### REGLA 6 — BOARD PLAN
Cada sesión incluye un plan de tablero que indica:
- Qué se escribe ANTES de que lleguen los aprendices (objetivo del día, vocabulario clave)
- Qué se agrega DURANTE la sesión (respuestas colectivas, errores para corregir)
- Qué permanece todo el tiempo (formulas gramaticales, chunks útiles)

**Formato:**

```
┌─────────────────────────────────────────────────────┐
│ SESSION 3: TUNING IN                                │
│                                                     │
│ Today's Objective:                                  │
│ "Listen to a phone call + learn 20 hardware words"  │
│                                                     │
│ [FORMULA ZONE - permanente]     [LIVE ZONE - vacío] │
│ _____ is a _____               (se llena durante    │
│ _____ has _____                 la sesión)           │
│ This is a _____ / That is a _____                   │
│                                                     │
│ [VOCABULARY WALL]                                   │
│ (20 terms con categorías - pre-escrito)             │
└─────────────────────────────────────────────────────┘
```

### REGLA 7 — AGRUPACIONES CON TRANSICIÓN EXPLÍCITA
Cada cambio de agrupación incluye:
- La instrucción exacta para el cambio ("Ok, now turn to the person next to you...")
- El tiempo que toma la transición (máximo 2 minutos, incluido en el timeline)
- La señal de que la nueva agrupación está lista ("Everyone has a partner? Good. Here's what you do...")

**Patrones comunes:**
- Individual → Pairs: "Turn to your neighbor" (30 seg)
- Pairs → Groups of 4: "Join the pair behind you" (1 min)
- Groups → Plenary: "Eyes on me / Look at the board" (30 seg)
- Plenary → Individual: "Ok, now this is YOUR work. No talking." (30 seg)

### REGLA 8 — BREAKS OBLIGATORIOS
Sesiones de 180 minutos incluyen MÍNIMO 1 break de 10-15 minutos, ubicado:
- Después del primer bloque pesado (idealmente entre minuto 70-90)
- NUNCA justo antes del WRAP-UP
- NUNCA durante una actividad de producción

El break tiene nombre en el timeline: "BREAK — Stretch & Recharge"

### REGLA 9 — FORMATIVE ASSESSMENT CHECKPOINTS (✓)
Cada sesión incluye 2-3 checkpoints de evaluación formativa, marcados con ✓ en el timeline. No son exámenes — son micro-verificaciones:

- ✓ **Thumbs Up/Down**: "Do you understand? Thumbs up or thumbs down." (10 seg)
- ✓ **Quick Write**: "Write ONE sentence using 'has'. Show me." (2 min)
- ✓ **Pair Check**: "Compare your answer with your partner. Same or different?" (2 min)
- ✓ **Board Check**: Instructor writes 2 sentences on board — one correct, one with error. "Which one is correct? Why?" (3 min)

Los checkpoints permiten al instructor detectar si necesita re-enseñar algo ANTES de avanzar.

### REGLA 10 — DIFFERENTIATION NOTES
Cada sesión termina con una sección de diferenciación:

**Para aprendices avanzados (Fast Finishers):**
- Extensiones de cada actividad (escribir más oraciones, crear variaciones)
- Rol de peer tutor (ayudar a compañeros)
- Challenge tasks (tareas opcionales de mayor complejidad)

**Para aprendices que necesitan más apoyo:**
- Simplificaciones (reducir número de ítems, proporcionar más scaffolding)
- Pair with stronger partner
- Visual aids adicionales
- Uso permitido de diccionario/traductor en momentos específicos

### REGLA 11 — MATERIALS CHECKLIST VERIFICABLE
La sesión abre con una checklist que el instructor marca ANTES de entrar al aula:

- [ ] Worksheets impresos (PM-2.X) — cantidad: ___
- [ ] Audio file cargado y probado — ✓ funciona
- [ ] Canva slides abiertas en Slide [#]
- [ ] Tablero preparado (Board Plan)
- [ ] Cue cards / tarjetas cortadas (si aplica)
- [ ] Timer visible en pantalla (si aplica)

### REGLA 12 — ZERO META-TALK
El output es el plan de clase LISTO PARA USAR. No incluye:
- ❌ Explicaciones de por qué se diseñó así
- ❌ Referencias a marcos teóricos (Bloom, SIOP, UbD)
- ❌ Justificaciones pedagógicas
- ❌ Notas sobre cómo se generó con IA

Las facilitation notes (💡) son prácticas, no teóricas.

---

## PROMPT PARA IA

```
Eres un coach de instructores de inglés ESP (English for Specific Purposes) en el SENA, Colombia. Tu tarea: generar el BUILD-OUT DETALLADO de UNA sesión de clase — el plan minuto a minuto que el instructor sigue en el aula.

### DATOS DE ENTRADA (el instructor proporciona):

**Datos de la sesión (del PM-3.1 Outline):**
- Programa: [nombre y código]
- Guía #: [número]
- Session #: [número]
- Nombre de la sesión: [nombre comunicativo]
- Duración: [default 180 min]
- Worksheets asignados: [PM-2.X + PM-2.X]
- Habilidades foco: [●] / Soporte: [○]
- Trabajo autónomo asignado: [Workbook Ch. X]

**Contenido de los worksheets (de la Producción Fase 2):**
[Pegar aquí el contenido COMPLETO de cada worksheet asignado a esta sesión]

**Parámetros globales:**
- Nivel CEFR: [default A1.1-A1.2]
- Universo narrativo: [empresa, personajes, contexto ESP]
- Grammar targets: [estructuras de la guía]
- Key vocabulary: [20 términos]

### INSTRUCCIONES DE GENERACIÓN:

**PARTE 1 — SESSION HEADER**
Genera:
- Título: SESSION [#]: [NOMBRE]
- Subtítulo: [PROGRAMA] — GUÍA [#] — Build-Out
- Datos: Duración, Worksheets, Habilidades foco/soporte
- Nota: "Este documento es SOLO para el instructor."

**PARTE 2 — MATERIALS CHECKLIST**
Genera una checklist verificable con checkbox para cada material:
- [ ] Worksheets con cantidad
- [ ] Audio/video files con nota de verificación
- [ ] Slides con números específicos
- [ ] Tablero preparado
- [ ] Materiales especiales (tarjetas, timer, etc.)

**PARTE 3 — BOARD PLAN**
Genera un diagrama ASCII del tablero mostrando:
- Qué se escribe ANTES de la clase (objetivo, formulas, vocabulario)
- Dónde queda la LIVE ZONE (espacio vacío que se llena durante la sesión)
- Qué permanece visible toda la sesión

**PARTE 4 — MINUTE-BY-MINUTE TIMELINE**
Genera tabla resumen:

| Tiempo | Dur. | Bloque | Actividad | Agrupación | Notas |
|--------|------|--------|-----------|------------|-------|

Los tiempos deben sumar EXACTAMENTE la duración total.
Incluir BREAK de 10-15 min.
Marcar checkpoints formativos con ✓.

**PARTE 5 — SET-UP (detallado)**
Genera:
- **Warm-up** expandido con instrucciones paso a paso
- **Teacher Talk — Opening Script**: 2-3 oraciones completas en el nivel CEFR
- **Objective**: en inglés, escrito también en el tablero
- **ICQ**: 1-2 preguntas de verificación de comprensión
- 💡 Facilitation Note (si aplica)

**PARTE 6 — WHILE (detallado, bloque por bloque)**
Para CADA bloque del WHILE genera:

#### BLOQUE [LETRA] — [NOMBRE] ([XX] min)
**Worksheet:** PM-2.X, Actividad [#]
**Agrupación:** [tipo]
**Objetivo del bloque:** [qué logra el aprendiz al final]

**Instrucciones paso a paso:**
1. [Instructor hace X]
2. [Aprendices hacen Y]
3. [Instructor verifica con Z]

**Teacher Talk — Instruction Giving:**
*"[Instrucciones exactas en el nivel CEFR]"*

**ICQ:**
- "[Pregunta de verificación]" → Esperan: "[respuesta esperada]"

**Answer Key (in-line):**
[Respuestas correctas de esta actividad]

**💡 Facilitation Notes:**
- [Nota práctica 1]
- [Nota práctica 2]

**✓ Checkpoint (si aplica):**
[Micro-verificación formativa]

**Transition → Bloque siguiente:**
*Teacher Talk: "[Frase de transición]"*
*Cambio de agrupación: [instrucción específica]*

---

**BREAK — Stretch & Recharge (10-15 min)**
Ubicar entre bloques pesados. Teacher Talk: *"Ok, take a break. 10 minutes. Come back ready to [actividad siguiente]."*

---

**PARTE 7 — WRAP-UP (detallado)**
Genera:
- **Exit Ticket** expandido con instrucciones y criterio de éxito
- **Teacher Talk — Closing Script**: 2-3 oraciones de cierre
- **Trabajo Autónomo**: instrucciones detalladas (qué hacer, cuánto tiempo, qué entregar, cuándo)
- **Preview**: anticipación de la siguiente sesión (1 oración)
- 💡 Facilitation Note (si aplica)

**PARTE 8 — ANSWER KEY CONSOLIDADO**
Genera TODAS las respuestas de la sesión en un bloque único:

| Actividad | Ítem | Respuesta Correcta | Alternativas | Pts |
|-----------|------|---------------------|--------------|-----|

Incluir sample responses para tareas abiertas.

**PARTE 9 — DIFFERENTIATION NOTES**
Genera:

**Fast Finishers:**
- [Extensión 1]
- [Extensión 2]
- [Rol de peer tutor]

**More Support Needed:**
- [Simplificación 1]
- [Scaffolding adicional]
- [Apoyo visual]

**PARTE 10 — INSTRUCTOR SELF-CHECK**
Genera 5 preguntas de autoevaluación post-sesión:
1. ¿Todos los aprendices completaron el Exit Ticket? ¿Cuántos lo hicieron correctamente?
2. ¿Hubo algún momento donde la mayoría parecía perdida? ¿En qué actividad?
3. ¿Los tiempos se cumplieron o hubo desfases? ¿Dónde?
4. ¿Qué errores comunes observé que debo retomar en la siguiente sesión?
5. ¿El trabajo autónomo asignado es realista para mis aprendices?

### RESTRICCIONES:
- Nivel CEFR estricto: Teacher Talk no excede el nivel de la guía
- Bilingüe: Teacher Talk en inglés + español entre paréntesis si nivel ≤ A1.1
- Zero Meta-Talk: el output es el plan de clase operativo
- Los tiempos DEBEN sumar exactamente la duración total de la sesión
- Answer keys COMPLETOS: ninguna actividad queda sin respuestas
- ICQ después de TODA instrucción que involucre más de 2 pasos
- MÍNIMO 2 facilitation notes por bloque del WHILE
- MÍNIMO 2 formative checkpoints por sesión
- BREAK obligatorio en sesiones ≥ 120 minutos
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-3.1 | La sesión específica, sus tiempos, bloques y worksheets asignados |
| **Depende de** | PM-2.1 a PM-2.10 + PM-3.5 | El contenido real de los worksheets para esa sesión |
| **Depende de** | PM-4.2 | Si es sesión de evaluación (cuestionario) |
| **Depende de** | PM-1.2 | Nivel CEFR, vocabulario, grammar targets, universo narrativo |
| **Alimenta a** | PM-3.3 | Las referencias a slides Canva (números y contenido) orientan el diseño de la presentación |
| **Alimenta a** | PM-3.4 | Las asignaciones autónomas detalladas alimentan los capítulos del Workbook |
| **Es complementado por** | PM-3.1 | El Outline da la vista panorámica; el Build-Out da el zoom |

---

## EJEMPLO DE EJECUCIÓN — ADSO, GUÍA 1, SESSION 3: TUNING IN

**Input:**
- Programa: ADSO (228118)
- Guía 1: The Hardware Specialist
- Session 3: Tuning In
- Duración: 180 min
- Worksheets: PM-2.6 (Listening) + PM-2.5 (Vocabulary)
- Habilidades foco: L● V● | Soporte: R○
- Trabajo autónomo: Workbook Ch. 3 — Vocabulary Reinforcement (60 min)
- Nivel CEFR: A1.1-A1.2
- Universo: DevCore Solutions, Carlos Ramírez (Junior Developer)

**Output generado (fragmento del SET-UP):**

---

**SESSION 3: TUNING IN**
ADSO — GUÍA 1: The Hardware Specialist — Build-Out

**MATERIALS CHECKLIST:**
- [ ] PM-2.6 Listening worksheet (1 por estudiante) — IMPRESO
- [ ] PM-2.5 Vocabulary worksheet (1 por estudiante) — IMPRESO
- [ ] Audio file: Phone Call TTS (0.85x speed, 2 voices) — VERIFICAR que funciona
- [ ] Speakers / headphones — VERIFICAR sonido
- [ ] Canva slides 8-14 abiertas y listas
- [ ] Tablero preparado según Board Plan
- [ ] Timer visible en pantalla

**BOARD PLAN:**
```
┌───────────────────────────────────────────────────────────┐
│ SESSION 3: TUNING IN                                      │
│ Today: "Listen to Carlos on the phone + learn 20 words"   │
│                                                           │
│ [FORMULA ZONE]              [LIVE ZONE]                   │
│ _____ is a _____            (vacío — se llena con          │
│ _____ has _____              respuestas del listening)     │
│ The _____ is _____                                        │
│                                                           │
│ [KEY CHUNKS]                                              │
│ "My _____ is not working"                                 │
│ "I need a new _____"                                      │
│ "The _____ has _____ GB"                                  │
│                                                           │
│ [VOCAB WALL — pre-escrito con 20 terms en categorías]     │
│ INPUT: keyboard, mouse, scanner                           │
│ OUTPUT: monitor, printer                                  │
│ STORAGE: SSD, HDD                                         │
│ INTERNAL: CPU, RAM, GPU, motherboard, PSU                 │
│ CONNECTIVITY: USB port, HDMI port, Ethernet cable         │
│ SPECS: Gigabyte, Terabyte, Gigahertz, Compatible, Portable│
└───────────────────────────────────────────────────────────┘
```

**SET-UP (20 min) — 0:00 a 0:20**

**Warm-up: "Quick Recall" (8 min)**
1. Instructor dice: *"Good morning everyone. Turn to the person next to you."* (30 seg transición)
2. *"Last session we read Carlos's email. With your partner — name 3 hardware components from the email. You have 2 minutes. Go."*
3. Timer: 2 minutos. Instructor circula, escucha.
4. *"Ok, stop. Now — can you say them in a sentence? Use 'is' or 'has'. Example: 'The CPU is fast.' Try with your partner. 2 more minutes."*
5. Timer: 2 minutos.
6. *"Great. Let's hear some. Who wants to share?"* — 3 voluntarios, 1 oración cada uno. Instructor escribe en LIVE ZONE.

💡 *Si los aprendices no recuerdan 3 componentes, diga: "Open your PM-2.3 worksheet — look at the email for 30 seconds, then close it." Esto activa la memoria sin convertirse en relectura.*

**Teacher Talk — Opening Script:**
*"Good morning everyone. Last session we READ Carlos's email — we saw his problem and decided what to do. Today we're going to LISTEN to Carlos on the phone. He's calling IT Support. And after the phone call, we learn the 20 key words you need for hardware. Ready?"*

**Objective (escrito en tablero):**
*"Today you will: (1) listen to a phone call about hardware, and (2) learn 20 key vocabulary words."*

**ICQ:**
- *"Are we reading today or listening?"* → Esperan: "Listening"
- *"How many vocabulary words will we learn?"* → Esperan: "20"

✓ **Checkpoint:** Thumbs up si recuerdan el nombre del personaje del email (Carlos). Thumbs down si no. Si >30% thumbs down, recapitular en 1 minuto.

---

**Ver output completo:** Este fragmento muestra el nivel de detalle esperado. El Build-Out completo de Session 3 tendría ~800-1000 líneas con los 7 bloques del WHILE, WRAP-UP, Answer Key consolidado, Differentiation Notes e Instructor Self-Check.

---

*PM-3.2: Playbook Build-Out — Step by Step*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
