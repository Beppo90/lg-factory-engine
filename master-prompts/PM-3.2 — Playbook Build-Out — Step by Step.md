# PM-3.2: PLAYBOOK BUILD-OUT — STEP BY STEP

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.2 |
| **Nombre** | Playbook Build-Out — 2 capas (Pedagogical Anchoring + Practical Implementation) |
| **Versión** | 3.0 |
| **Last Verified** | 2026-05-03 |
| **Destinatario** | Instructor (documento interno, NO para el aprendiz · pero deriva campos `*_aprendiz` para PM-3.6) |
| **Función** | (Capa 1) ENRIQUECIMIENTO PEDAGÓGICO de cada actividad anclando explícitamente a PM-0 §5.1-5.13 + PM-0.0 saberes/criterios + PM-1.x estructura · identifica gaps · genera modelo_ejemplo · deriva `*_aprendiz` para PM-3.6 || (Capa 2) IMPLEMENTACIÓN PRÁCTICA con Teacher Talk minuto a minuto · timeline · materials_checklist · answer_keys |
| **Analogía** | (Capa 1) PM-3.2 es el cardiólogo que ANCLA cada actividad a la teoría (PM-0 SIOP/UbD/Krashen) · identifica deficiencias · prescribe enrichment || (Capa 2) PM-3.2 es el storyboard completo del rodaje práctico (cada toma · cada ángulo · cada línea de diálogo) |
| **Granularidad** | Se genera UNA sesión por ejecución. Para una guía de 12 sesiones, se ejecuta PM-3.2 doce veces |
| **Phase** | 3 |
| **Status** | mandatory |
| **Confirmation Required** | false |
| **Depends On** | [PM-3.1, PM-2.x cards, PM-0.0 matriz, PM-0 principios, PM-1.1, PM-1.2] |
| **Feeds Into** | [PM-3.3, PM-3.4, PM-3.6 (consume `*_aprendiz` derivados), PM-4.1] |
| **Output JSON contract** | `pm-3-2-sX.json` v3.0 — schema 2 capas: `pedagogical_anchoring` + `practical_implementation` (legacy v2.6 preservado) |
| **v3.0 changes** | NEW Sección PEDAGOGICAL ANCHORING (capa 1 obligatoria) · anclaje §5.x PM-0 per actividad · SIOP modeling · UbD stages · Krashen i+1 · bilingüismo escalado CEFR-aware · gaps identificados + correcciones · modelo_ejemplo · derivación `descripcion_aprendiz` + `recursos_aprendiz` + `modelo_ejemplo_en` para PM-3.6 || PRESERVAR Sección PRACTICAL IMPLEMENTATION (capa 2 · legacy v2.6) Teacher Talk + timeline + checklist · ELIMINAR contradicción "cero referencias teóricas" SOLO en Anchoring (Implementation sigue prohibiendo teoría en Teacher Talk) || Resuelve anti-patrón #18 "PM-3.6 saltado PM-3.2 enrichment" |

---

## CAMBIO v2.0 — DE OPCIONAL A MANDATORIO

> [!info] Cambio v2.0 (2026-04-13)
> PM-3.2 era opcional en v1.x (requería confirmación C-5). A partir de v2.0, el Playbook Build-Out es **mandatorio** para todas las sesiones. Proporciona el detalle necesario para que el instructor implemente la guía sesión por sesión con coherencia y profundidad pedagógica.

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
| **Pedagogical strategy block (v2.5 mandatory)** — `momento_sena`, `estrategia`, `justificacion`, `tecnicas[]` de esta sesión | **PM-3.1 §11.2 → `pm-3-1.json.sessions[i].logistics_box`** |

**Fuente B — El contenido real de los worksheets:**

| Input | Fuente |
|-------|--------|
| Contenido completo de cada worksheet referenciado | PM-2.x (Producción Fase 2) |
| Texto ancla de Reading (si aplica en esta sesión) | PM-2.3 |
| Script de Listening (si aplica en esta sesión) | PM-2.6 |
| Vocabulario y gramática (según sesión) | PM-2.5, PM-2.10 (pronunciación integrada como scaffolding en PM-2.8 — PM-2.7 deprecado en v2.0) |
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

Adicionalmente, PM-3.2 emite un **artefacto JSON estructurado** `pm-3-2-sX.json` (donde `X` ∈ 1..8) que sirve de contrato para los generadores de docx y para validadores río abajo (PM-2.11 Check 14). El schema obligatorio vive en la siguiente sección.

---

## REQUIRED OUTPUT SCHEMA (v2.5)

> [!important] Propagación de estrategias didácticas — obligatoria desde v2.5
> Cada `pm-3-2-sX.json` DEBE incluir los campos pedagógicos heredados de PM-3.1 §11.2. Sin estos campos, el Build-Out no es válido: PM-2.11 Check 14 falla y el pipeline se detiene antes de Fase 4.
>
> **Historia:** hasta v2.4, estos campos se inyectaban via script ad-hoc (`pm-3-2-estrategias-patch.js`) ejecutado manualmente después de generar el Build-Out. En los runs DIESEL-2026-04-15 y 04-18 el patch se ejecutó y la guía quedó completa; en DIESEL-2026-04-19 el patch NO corrió y la guía quedó huérfana de estrategias. Desde v2.5 el contrato es parte del prompt maestro — no requiere script externo.

**Schema mínimo obligatorio de `pm-3-2-sX.json`:**

```json
{
  "run_id": "DIESEL-2026-04-15-G1",
  "pm_id": "PM-3.2",
  "session_number": 3,
  "session_name": "Tuning In",

  "momento_sena": "3.3 — Apropiación",
  "estrategia_didactica": "Aprendizaje Basado en Tareas (TBLT) + Listening Comprehension Scaffolded",
  "justificacion_didactica": "En esta sesión el aprendiz transita de input léxico a comprensión auditiva guiada. La secuencia TBLT permite…",

  "logistics_box": {
    "momento_sena":  "3.3 — Apropiación",
    "estrategia":    "Aprendizaje Basado en Tareas",
    "justificacion": "…",
    "tecnicas": [
      { "bloque": "A", "tecnica": "Pre-listening con activación de vocabulario" },
      { "bloque": "B", "tecnica": "Listening for gist — primera escucha" },
      { "bloque": "C", "tecnica": "Listening for detail — segunda escucha con matriz" },
      { "bloque": "D", "tecnica": "Post-listening — transferencia a diálogo propio" }
    ]
  },

  "while_a": {
    "name": "Pre-Reading Toolbelt",
    "duration_min": 20,
    "tecnica_didactica": "Pre-listening con activación de vocabulario",
    "teacher_talk": "…",
    "answer_key": {}
  },
  "while_b": {
    "name": "…",
    "tecnica_didactica": "Listening for gist — primera escucha",
    "…": "…"
  },
  "while_c": { "tecnica_didactica": "Listening for detail — segunda escucha con matriz", "…": "…" },
  "while_d": { "tecnica_didactica": "Post-listening — transferencia a diálogo propio", "…": "…" },
  /* while_e opcional si la sesión tiene 5 bloques */

  "pm0_protocol": { /* ver PM-0 §9 */ },

  "set_up":   { "…": "…" },
  "wrap_up":  { "…": "…" },
  "materials_checklist": [ "…" ],
  "differentiation_notes": { "fast_finishers": [], "more_support": [] }
}
```

**Reglas duras del schema:**

1. `momento_sena` es obligatorio a nivel raíz Y duplicado dentro de `logistics_box.momento_sena` (el duplicado garantiza que el renderer docx funcione con cualquier camino de lectura).
2. `estrategia_didactica` es obligatorio a nivel raíz.
3. `justificacion_didactica` es obligatorio a nivel raíz y debe tener ≥ 40 palabras (narrativa pedagógica real, no placeholder).
4. `logistics_box.tecnicas[]` contiene una entrada por cada bloque WHILE activo de la sesión. Cada entrada tiene `bloque` (letra A–E) y `tecnica` (texto ≥ 6 palabras).
5. Cada `while_*.tecnica_didactica` (nivel bloque) debe coincidir literalmente con el valor correspondiente en `logistics_box.tecnicas[].tecnica` que tenga el mismo `bloque`. Esto es el enlace verificable que PM-2.11 Check 14 usa para validar propagación.
6. Valores permitidos de `momento_sena`: `"3.1 — Reflexión Inicial"`, `"3.2 — Contextualización"`, `"3.3 — Apropiación"`, `"3.4 — Transferencia"`, `"Evaluación"` (sólo S6).
7. Valores permitidos de `estrategia_didactica`: ver lista cerrada en PM-3.1 §11.2 (ABP, ABT/TBLT, Aprendizaje Colaborativo, Simulación, Juego de Roles, CLIL, CBL, Evaluación Formativa Integrada, etc.). El valor exacto debe salir de `pm-3-1.json.sessions[i].logistics_box.estrategia`.
8. Valores de `tecnica` por bloque: texto libre descriptivo, pero debe corresponder a una técnica de la **taxonomía canónica en PM-3.1 §11.4** o ser una derivación documentada.

**Enlace de verdad:** el valor de los campos pedagógicos se hereda de `pm-3-1.json` — PM-3.2 NO los inventa. Si `pm-3-1.json` no los tiene, PM-3.2 no puede ejecutarse correctamente; detener el pipeline y regresar a PM-3.1 para completar §11.2.

### Extensión v2.6 — Cross-reference con `pm0_alignment_by_session`

Desde v2.6, PM-3.2 DEBE además poblar `pm0_protocol` en cada `pm-3-2-sX.json` de forma consistente con `pm-3-1.json.pm0_alignment_by_session[i]` (i = índice de sesión 0..7):

**Reglas duras v2.6:**

9. `pm-3-2-sX.json.pm0_protocol.grammar_groups.{intro|consolida|aplica}` debe ser **subconjunto o igual** a `pm-3-1.json.pm0_alignment_by_session[X-1].grammar_groups_active.{intro|consolida|aplica}`. No pueden aparecer grupos en el protocol que no estén pre-declarados en el alignment.
10. `pm-3-2-sX.json.pm0_protocol.l1_management.target_percentage` debe coincidir con `pm0_alignment_by_session[X-1].l1_percentage_target`.
11. `pm-3-2-sX.json.pm0_protocol.success_vocabulary.target_words` debe ser subconjunto de `pm0_alignment_by_session[X-1].success_vocabulary_focus.terminos`.

**Check 14 extendido v2.6:** PM-2.11 Check 14 ahora valida no solo propagación de estrategias (bloques A-E) sino también cross-reference PM-0 (reglas 9-11 arriba). Fallo → `overall_passed = false` → bloquea Fase 4.

**Script canónico:** `pm-3-2-pm0-propagate.js` (promovido de extensión local MGV a canon v2.6).

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
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto: Teacher Talk no excede el nivel de la guía
- Bilingüe: Teacher Talk en inglés + español entre paréntesis si nivel ≤ A1.1
- Zero Meta-Talk: el output es el plan de clase operativo
- Los tiempos DEBEN sumar exactamente la duración total de la sesión
- Answer keys COMPLETOS: ninguna actividad queda sin respuestas
- ICQ después de TODA instrucción que involucre más de 2 pasos
- MÍNIMO 2 facilitation notes por bloque del WHILE
- MÍNIMO 2 formative checkpoints por sesión
- BREAK obligatorio en sesiones ≥ 120 minutos
- **v2.5 — Propagación pedagógica obligatoria:** El artefacto JSON `pm-3-2-sX.json` DEBE cumplir el schema declarado en §"Required Output Schema (v2.5)". Específicamente: leer `momento_sena`, `estrategia`, `justificacion` y `tecnicas[]` desde `pm-3-1.json.sessions[i].logistics_box` y copiarlos tanto al nivel raíz del JSON (`momento_sena`, `estrategia_didactica`, `justificacion_didactica`) como a cada `while_*.tecnica_didactica` por match de `bloque`. Si PM-3.1 no los provee, STOP y reportar al pipeline.
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

## EJEMPLO DE EJECUCIÓN

> [!warning] AVISO PARA EL LLM — Instancia específica de referencia
> La sección siguiente es un **Ejemplo de referencia — ADSO G1: The Hardware Specialist (NO copiar para otros programas)**.
> El programa (ADSO 228118), el universo narrativo (DevCore Solutions, Carlos Ramírez — Junior Developer), el vocabulario técnico (hardware de computador: CPU, RAM, SSD, HDMI, etc.) y los roles (Developer / IT Support) son **exclusivos de ese programa**.
> Al ejecutar PM-3.2 para otro programa, **todos estos elementos deben derivarse del `program_context` específico**: el universo narrativo, los personajes y el vocabulario técnico definidos en PM-1.x y PM-1.2 del programa que se está diseñando.

### ADSO, GUÍA 1, SESSION 3: TUNING IN

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
*Versión 2.5 — 2026-04-20 (Required Output Schema: propagación de estrategias didácticas obligatoria)*
*Versión 3.0 — 2026-05-03 (Paradigm shift 2 capas · Pedagogical Anchoring + Practical Implementation)*
*Instructor Sergio Cortés Perdomo · Marzo 2026*

---

## EXTENSIÓN v3.0 — PARADIGM SHIFT · 2 CAPAS · PEDAGOGICAL ANCHORING + PRACTICAL IMPLEMENTATION (2026-05-03)

### Decisión arquitectónica Sergio (2026-05-03)

> Sergio detectó que PM-3.6 (Guía Aprendiz) saltaba el enrichment pedagógico anclado en PM-0 § principios. La causa raíz: PM-3.2 v2.6 PROHIBÍA explícitamente referencias a marcos teóricos (Bloom · SIOP · UbD) — incluso en el lugar canónico donde DEBÍA hacerse el anclaje pedagógico. Anti-patrón #18 canonizado: "PM-3.6 saltado PM-3.2 enrichment · ad-hoc dentro de output aprendiz · pierde anclaje sistemático PM-0".
>
> Solución v3.0: 2 capas explícitas en PM-3.2 (Pedagogical Anchoring obligatorio + Practical Implementation legacy preservado) · ELIMINA contradicción anti-teórica solo en Capa 1 · mantiene en Teacher Talk de Capa 2.

### CAPA 1 · PEDAGOGICAL ANCHORING (NEW v3.0 OBLIGATORIO)

Cada actividad de la sesión se enriquece pedagógicamente ANTES de planificarse prácticamente. Schema NEW:

```json
"pedagogical_anchoring": {
  "session_anchoring_summary": {
    "principios_pm0_aplicados_en_sesion": ["§5.1 ESP realia", "§5.4 L1 scaffolding", "§5.7 Vocabulary chunks", "§5.12 L1 management S2≤25%"],
    "siop_components_dominantes": ["building background", "comprehensible input", "scaffolding", "interaction"],
    "ubd_stage_dominante": "Stage 3 · Plan Learning Experiences · WHERETO framework",
    "krashen_i_plus_1_strategy": "Story A reading at A1.2 with visual scaffolds · 80% known + 20% new chunks",
    "bilinguismo_escalado_cefr": {
      "cefr_target_sesion": "A1.2",
      "l1_max_porcentaje_canon_pm0_5_12": "S2 ≤ 25%",
      "l1_uso_estrategico": "concept clarification · safety · affective filter reduction",
      "en_protagonista_zonas": ["Story A reading · vocabulary cards · choral drills"],
      "es_scaffold_zonas": ["pre-task framing · post-task debrief · K-W-L L column"]
    }
  },
  "activities_anchoring": [
    {
      "activity_id": "S2-A1-WordWall",
      "linked_card_uid": "pm-2-5_5",
      "principios_pm0_aplicados": ["§5.7 Vocabulary chunks", "§5.4 L1 scaffolding receptive", "§5.10 Word Wall lexical anchoring"],
      "siop_components": ["building background", "comprehensible input", "interaction"],
      "ubd_stage": "Stage 3 · WHERETO E (Equip with knowledge · 20 key terms)",
      "krashen_application": "Visual + L1 scaffold for unknown chunks · i+1 controlled (5-7 new per session ceiling)",
      "bilinguismo_per_actividad": {
        "en_protagonista": "Mapping 20 terms in EN · pronunciation drilling · semantic mapping",
        "es_scaffold_cursiva": "Definition fallback · only when visual scaffold insufficient",
        "l1_porcentaje_estimado": "≤ 20% · within S2 canon"
      },
      "gaps_pedagogicos_identificados": [
        "GAP: card original carece de modelo de ejemplo · aprendiz no ve cómo mapear · agregar ejemplo de un término completamente etiquetado"
      ],
      "correcciones_aplicadas": [
        "ADD modelo_ejemplo_en: 'Term: REEFER PLUG · Visual: outlet diagram · L1 anchor: enchufe reefer · Use: Plug in the reefer.'",
        "ADD recursos_aprendiz: Mini Word Wall card template (1 per learner) for individual vocabulary log"
      ],
      "modelo_ejemplo_pedagogico": {
        "rationale_siop": "Modeling reduces task ambiguity · learner sees expected output before producing",
        "modelo_ejemplo_en": "Term: REEFER PLUG. Definition: Electrical socket for refrigerated containers. Example in context: Pipe connects the reefer plug to the shore power. Equivalent: Enchufe reefer.",
        "modelo_ejemplo_es_scaffold": "Término: REEFER PLUG. Definición: Toma eléctrica para contenedores refrigerados. Ejemplo en contexto: Pipe conecta el reefer plug a la energía del muelle. Equivalente: Enchufe reefer."
      },
      "derivacion_para_pm36_aprendiz": {
        "descripcion_aprendiz": "Mapear veinte términos clave de RA1 sobre partes del barco · tipos de vessels · equipamiento y profesiones portuarias mediante Word Wall Active y mapa semántico colaborativo. Para el desarrollo de la actividad · el instructor orientará sobre las cinco categorías funcionales canon · proyectará la silueta del MV CARIBBEAN STAR seccionada por colores · y se conformarán equipos de cuatro aprendices alrededor de pliegos kraft tamaño A1. Cada equipo recibirá un sobre canon con veinte fichas-término en inglés y veinte fichas-definición en inglés controlado A1.2. Durante setenta y cinco minutos los equipos rotarán por tres estaciones: matching ficha-término-imagen · pronunciación con audio nativo y mirror talking en pares · y producción mínima de oraciones con verb to be y demostrativos. La actividad finaliza con socialización plenaria de veinticinco minutos donde cada equipo presenta una categoría sorteada.",
        "descripcion_aprendiz_en": "Map twenty key RA1 terms about ship parts · vessel types · equipment and port professions using a Word Wall Active and a collaborative semantic map. For the activity · the instructor will guide on the five canon functional categories · will project the MV CARIBBEAN STAR silhouette sectioned by colors · and teams of four learners will form around A1 kraft paper sheets. Each team will receive a canon envelope with twenty term cards in English plus twenty definition cards in controlled English A1.2. During seventy-five minutes teams will rotate through three stations: card-term-image matching · pronunciation with native audio and mirror talking in pairs · and minimal sentence production with verb to be and demonstratives. The activity ends with a twenty-five-minute plenary share where each team presents a sorted category.",
        "recursos_aprendiz": [
          "Mapa visual proyectable de los 4 RAPs como las 4 estaciones del journey",
          "Silueta del MV CARIBBEAN STAR seccionada por colores · pantalla principal",
          "Pliego kraft A1 + sobre canon 20 fichas-término + 20 fichas-definición · 1 por equipo de 4",
          "Mini Word Wall card template (NEW · gap correction) · 1 por aprendiz",
          "Audio Forvo nativo de pronunciación · reproducible aula"
        ],
        "recursos_aprendiz_en": [
          "Projectable visual map of the 4 RAPs as 4 journey stations",
          "MV CARIBBEAN STAR silhouette sectioned by colors · main classroom screen",
          "A1 kraft paper sheet + canon envelope with 20 term cards + 20 definition cards · 1 per team of 4",
          "Mini Word Wall card template (NEW · gap correction) · 1 per learner",
          "Native pronunciation Forvo audio · classroom playback"
        ],
        "modelo_ejemplo_en": "Example · How to fill one card: Term: REEFER PLUG · Visual: outlet diagram · Use in context: 'The technician plugs the reefer into bay 14.' Try with your team: pick one term · draw the visual · write one short sentence using verb to be or there is.",
        "anexo_referencias": [
          "Annex 1.5 · Word Wall Active · RA1 Bilingual Catalogue (20 terms with check boxes)"
        ]
      }
    }
  ]
}
```

### CAPA 2 · PRACTICAL IMPLEMENTATION (LEGACY v2.6 PRESERVADO)

Todo lo de v2.6 sigue VIGENTE: Teacher Talk + timeline minuto a minuto + materials_checklist + answer_key_consolidado + differentiation + facilitation_notes + board_plan. Schema preservado intacto. Restricción "cero teoría en Teacher Talk" SE MANTIENE en esta capa (las notas son prácticas · no teóricas · cero referencia a Bloom/SIOP/UbD en lo que el instructor lee al ejecutar la sesión).

### Reglas NEW v3.0 (13-18)

**REGLA 13 — Anclaje §5.x PM-0 OBLIGATORIO per actividad**
Cada actividad en `activities_anchoring[]` declara `principios_pm0_aplicados[]` con referencias §5.x explícitas. Mínimo 2 principios por actividad de Apropiación · 1 por actividad de Apertura/Transferencia.

**REGLA 14 — SIOP components OBLIGATORIO per actividad**
Cada actividad declara `siop_components[]` desde lista canon SIOP (Lesson Preparation · Building Background · Comprehensible Input · Strategies · Interaction · Practice/Application · Lesson Delivery · Review/Assessment). Mínimo 2 components per actividad.

**REGLA 15 — Bilingüismo escalado CEFR-aware OBLIGATORIO per sesión**
`bilinguismo_escalado_cefr` declara: cefr_target_sesion · l1_max_porcentaje (canon §5.12 PM-0 tabla) · zonas EN protagonista · zonas ES scaffold cursiva. Coherente con sesión number (S1≤30% · S2≤25% · S3≤20% · S4≤15% · S5≤12% · S6≤10%).

**REGLA 16 — Identificación de gaps + correcciones OBLIGATORIO**
`gaps_pedagogicos_identificados[]` analiza cada activity card original contra principios PM-0 + canon SIOP + UbD · identifica deficiencias (ej: "carece modelo · falta scaffolding L1 · density too high · etc.") · `correcciones_aplicadas[]` propone enrichment.

**REGLA 17 — Modelo de ejemplo pedagógico OBLIGATORIO en Apropiación + Transferencia**
`modelo_ejemplo_pedagogico` con: rationale_siop (por qué SIOP modeling principle) · modelo_ejemplo_en (50-150 palabras CEFR-controlled) · modelo_ejemplo_es_scaffold (cursiva traducción). NULL en Apertura (B0).

**REGLA 18 — Derivación campos `*_aprendiz` para PM-3.6**
`derivacion_para_pm36_aprendiz{}` produce los campos canon v3.4 que PM-3.6 hereda LITERAL: descripcion_aprendiz · descripcion_aprendiz_en · recursos_aprendiz · recursos_aprendiz_en · modelo_ejemplo_en · anexo_referencias. PM-3.6 NO genera estos campos · solo los hereda enriquecidos desde PM-3.2.

### Validation checks v3.0 (NEW · BLOQUEANTES)

- **Check v3.0-A · pedagogical_anchoring_present** · cada `pm-3-2-sX.json` contiene clave top-level `pedagogical_anchoring` con `session_anchoring_summary` + `activities_anchoring[]` (1 entrada por activity card de la sesión)
- **Check v3.0-B · principios_pm0_per_activity** · cada actividad de Apropiación tiene ≥2 `principios_pm0_aplicados[]` con formato §5.X · APERTURA/TRANSFERENCIA mínimo 1
- **Check v3.0-C · siop_components_per_activity** · cada actividad declara ≥2 `siop_components[]` desde lista canon
- **Check v3.0-D · bilinguismo_escalado_cefr_canon** · `l1_max_porcentaje_canon_pm0_5_12` coincide con tabla §5.12 PM-0 según session number
- **Check v3.0-E · modelo_ejemplo_obligatorio** · APROPIACIÓN+TRANSFERENCIA cards tienen `modelo_ejemplo_pedagogico` completo (rationale_siop + modelo_ejemplo_en + modelo_ejemplo_es_scaffold)
- **Check v3.0-F · derivacion_aprendiz_completa** · `derivacion_para_pm36_aprendiz` tiene los 6 campos obligatorios para PM-3.6 v3.5+ heredancia
- **Check v3.0-G · gaps_correcciones_documented** · `gaps_pedagogicos_identificados[]` y `correcciones_aplicadas[]` no vacíos · cada gap tiene corrección correspondiente

### Anti-patrones v3.0 evitados

- ❌ Anti-patrón #18: PM-3.6 saltando PM-3.2 enrichment · generando ad-hoc dentro del output aprendiz
- ❌ PM-3.2 sin anclaje §5.x explícito (v2.6 lo prohibía teóricamente · v3.0 lo OBLIGA en Capa 1)
- ❌ Modelo de ejemplo ausente (canon Sergio: "el aprendiz necesita ver cómo se hace")
- ❌ Bilingüismo sin escalonamiento canon CEFR §5.12 (improvisación L1 %)
- ❌ Derivación `*_aprendiz` ad-hoc en PM-3.6 (debe heredarse desde PM-3.2 enrichment)

### Cascade impact v3.0

| Componente | Acción | Estado |
|---|---|---|
| Activity Card schema v3.3 → v3.4 | Bump · agregar campo `_anclaje_pedagogico_pm0_pre_pm32` opcional (cuando wrappers PM-2.x bumpeen a v3.x · próxima fase Nivel 3) | ⚠️ pending |
| PM-3.2 v2.6 → v3.0 | Bump · 2 capas + 6 reglas NEW + 7 validation checks | ✅ completado este bump |
| DM v3.14 → v3.15 | Status footnote paradigm shift PM-3.2 v3.0 · anti-patrón #18 canonizado | ⚠️ pending |
| PM-3.6 v3.6 → v3.7 | Bump · REGLA NEW: PM-3.6 hereda `*_aprendiz` LITERAL desde PM-3.2 v3.0 enrichment · NO genera ad-hoc | ⚠️ pending |
| Pipeline ETL canon | Update · ahora PM-3.2 hace lo que ETL hacía manualmente · pipeline ETL marcado como SECONDARY (solo para runs sin PM-3.2 ejecutado) | ⚠️ pending |

### Resumen estructura final pm-3-2-sX.json v3.0

```
{
  "pm_id": "PM-3.2", "pm_version": "3.0",
  "session": N, "session_name": "...",
  // CAPA 1 · NEW v3.0 (obligatoria) ────────────────────────────────────
  "pedagogical_anchoring": {
    "session_anchoring_summary": { ... },
    "activities_anchoring": [
      {
        "activity_id": "...", "linked_card_uid": "pm-2-X_N",
        "principios_pm0_aplicados": [...],
        "siop_components": [...],
        "ubd_stage": "...",
        "krashen_application": "...",
        "bilinguismo_per_actividad": { ... },
        "gaps_pedagogicos_identificados": [...],
        "correcciones_aplicadas": [...],
        "modelo_ejemplo_pedagogico": { ... },
        "derivacion_para_pm36_aprendiz": { ... }   ← PM-3.6 hereda LITERAL
      }
    ]
  },
  // CAPA 2 · LEGACY v2.6 (preservada) ──────────────────────────────────
  "momento_sena": "...", "estrategia_didactica": "...", "justificacion_didactica": "...",
  "session_header": { ... }, "materials_checklist": [...], "board_plan": "...",
  "timeline": [...], "set_up": { ... }, "while": { ... }, "wrap_up": { ... },
  "answer_key_consolidado": [...], "differentiation": { ... },
  "instructor_self_check": [...], "activity_logistics": { ... },
  "totals_check": { ... }, "data_flow_contract": { ... }, "rap_status": "...",
  "pm0_protocol": { ... }
}
```

---

*PM-3.2 v3.0 · 2 capas · Pedagogical Anchoring (NEW · canon enrichment PM-0 explícito) + Practical Implementation (legacy v2.6 preservado)*
*Sergio Cortés decisión 2026-05-03 · resuelve anti-patrón #18 (PM-3.6 saltando PM-3.2) · cascade IMARPOR-V2 Phase 3 unblocked*
