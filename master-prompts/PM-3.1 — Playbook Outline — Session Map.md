# PM-3.1: PLAYBOOK OUTLINE — SESSION MAP

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.1 |
| **Nombre** | Playbook Outline — Session Map |
| **Versión** | 2.7 |
| **Last Verified** | 2026-05-07 (v2.7 cierra MED bump del audit Fase A · alinea Outline con PM-3.2 v3.0 paradigm shift 2 capas Pedagogical Anchoring + Practical Implementation · NEW §12 documenta heredancia downstream · v2.6 promovió `pm0_alignment_by_session` canon · BUG-PM31-001 cerrado en DM §11) |
| **Destinatario** | Instructor (documento interno, NO para el aprendiz) |
| **Función** | Distribuir los 9 worksheets de la Fase 2 + el Cuestionario (PM-4.2) en sesiones de clase realistas, con tiempos, agrupaciones, materiales, logística **y pre-carga canónica de pm0_alignment_by_session** |
| **Analogía** | Es el "guion de rodaje" de la guía — convierte los materiales ya escritos en un plan de implementación sesión por sesión |
| **Phase** | 3 |
| **Status** | mandatory |
| **Confirmation Required** | false |
| **Depends On** | [PM-0, PM-2.11, PM-4.1] |
| **Feeds Into** | [PM-3.2] |

---

## CAMBIO v2.0 — DE OPCIONAL A MANDATORIO

> [!info] Cambio v2.0 (2026-04-13)
> PM-3.1 era opcional en v1.x (requería confirmación C-4). A partir de v2.0, el Playbook Outline es **mandatorio** en todos los runs del LG Factory Engine. El Instructor's Playbook es la fuente de verdad del macrotema y base para todos los entregables del aprendiz.

---

## BUG-FIX LOG

### BUG-PM31-001 — PM-0 no declarado como dependencia de PM-3.1 (cerrado v2.5.1)

**Reportado:** 2026-04-20 por instructor Sergio (run MGV-2026-04-20, Fase 3 kickoff).

**Síntoma observado:**
PM-3.1 v2.0 declaraba `Depends On: [PM-2.11, PM-4.1]` y su sección INPUT REQUERIDO omitía PM-0 como insumo. Como consecuencia, el output canónico `pm-3-1.json` (incluso con las extensiones v2.1 §11.1–§11.4) no pre-cargaba los cinco vectores PM-0 que cada `pm-3-2-sX.json` necesita para construir su `pm0_protocol`:

1. **Tabla L1% por sesión** (PM-0 §9.1).
2. **Grupos gramaticales activos con etiqueta Intro/Consolida/Aplica** (PM-0 §9.2 — carga máx 2 Intro/sesión).
3. **Modo de feedback dominante** (accuracy / fluency / mixto — PM-0 §5.11).
4. **Palabras foco de stress + técnica pronunciación** (PM-0 §5.13).
5. **Factores SUCCESS aplicados al vocabulario target** (PM-0 §5.5/§5.10).

**Impacto:** En pipelines previos (ej. DIESEL-2026-04-15), el campo `pm0_protocol` se inyectaba retroactivamente vía `pm-3-2-pm0-patch.js` sobre cada `pm-3-2-sX.json` sin pre-contrato en el Outline. Esto produjo deriva entre sesiones (inconsistencia en L1%, duplicación de grupos Intro, stress focus desalineado) que sólo se detectaba en auditoría G6.

**Raíz:** El DOCUMENTO MAESTRO §3 Principio 5 declara PM-0 como "capa fundacional pedagógica obligatoria antes de cualquier diseño de sesión", pero el prompt operativo PM-3.1 no se actualizó tras v2.1 para reflejar esa obligatoriedad en su contrato de inputs.

**Fix aplicado v2.5.1 (2026-04-20):**
1. `Depends On` actualizado: `[PM-0, PM-2.11, PM-4.1]`.
2. INPUT REQUERIDO expandido con **Entrada 3: Ancla PM-0 del run** (ver sección actualizada abajo).
3. Nueva sección **§11.5 — PM0 ALIGNMENT BY SESSION** añade bloque top-level `pm0_alignment_by_session` al output JSON canónico (array de 8 items, 1 por sesión).
4. PM-3.2 Build-Out hereda `pm0_protocol` desde este bloque en lugar de derivarlo sesión por sesión — elimina deriva.
5. PM-2.11 Check 14 (strategy_propagation) se extiende en v2.5.2 para validar también pm0_propagation del Outline al Build-Out.

**Verificación:** Run MGV-2026-04-20 G1 ejecuta con `pm0_alignment_by_session` nativo en `pm-3-1.json` (no patch retroactivo). Auditoría G6 muestra 0 deriva L1% / grammar carga / stress entre Outline y los 8 `pm-3-2-sX.json`.

**Referencia cruzada:** DOCUMENTO MAESTRO §3 Principio 5, §3 Principio 6, §11 Historial v2.3.

---

## INPUT REQUERIDO

> [!warning] Actualización v2.5.1 (2026-04-20) — BUG-PM31-001
> PM-3.1 ahora requiere **tres entradas** (antes eran dos). La nueva Entrada 3 — Ancla PM-0 — es obligatoria para cerrar el gap documentado en BUG-PM31-001. Sin ella, el output no puede poblar el bloque `pm0_alignment_by_session` (§11.5) y los Build-Outs PM-3.2 tendrían que derivar `pm0_protocol` sesión por sesión sin pre-contrato.

Este prompt necesita tres entradas principales:

### Entrada 1: Fila GFPI-F-134 completa ensamblada
| Input | Fuente |
|-------|--------|
| **Fila GFPI-F-134 completa del RAP** | **PM-2.11 (Row Assembler)** |
| Incluye: Competencia, RAP, Saberes, Criterios, Actividades, Evidencias, Estrategias, Ambientes | |

### Entrada 2: Contenido de los worksheets + metadata
| Input | Fuente |
|-------|--------|
| Scope & Sequence (DNA, Content Core, Vocabulary, Grammar) | PM-1.2 |
| Reflexión Inicial — The Spark | PM-2.1 |
| Contextualización — The Gap Analysis | PM-2.2 |
| Reading — The Master Anchor | PM-2.3 |
| Listening — The Auditory Anchor | PM-2.6 |
| Vocabulary & Language Function | PM-2.5 |
| Structure Use & Grammar | PM-2.10 |
| Writing Skills & Pragmatics | PM-2.4 |
| Speaking Production & Simulation — The Mission | PM-2.8 |
| Language Functions & Communicative Competence | PM-2.9 (material transversal, no sesión propia) |
| Final Mission — Integrative Task | PM-3.5 |
| Cuestionario Técnico (IE-01) | PM-4.2 (si ya fue generado) |
| Intensidad horaria de la guía | PM-1.2 (default: 24h directa + 6h autónoma) |
| Duración estándar de sesión presencial | Parámetro institucional (default: 3 horas) |

### Entrada 3: Ancla PM-0 del run *(nueva v2.5.1 — BUG-PM31-001)*
| Input | Fuente |
|-------|--------|
| **CEFR descriptor snapshot de la guía** (subnivel A1.1/A1.2/.../A2.x) | `pm-0-context.json → cefr_descriptors_per_guide[n]` (o PM-0 §4/§6 directamente) |
| **Grammar roadmap de la guía** (grupos Intro/Consolida/Aplica con carga máx 2 Intro/sesión) | `pm-0-context.json → grammar_roadmap.activation_mapping.G[n]` (PM-0 §5.6 + §9.2) |
| **L1 policy por sesión** (progresión S1→S8 por subnivel) | `pm-0-context.json → l1_policy_per_guide[n]` (PM-0 §9.1) |
| **Methodological shift de la guía** (velocidad input, andamiaje, feedback mode, rol docente) | `pm-0-context.json → methodological_shifts_per_guide[n]` (PM-0 §8) |
| **Principios pedagógicos aplicables** (§5.1–§5.13 priorizados para este RAP) | `pm-0-context.json → principios_aplicables` |
| **Ítems del instrumento de trazabilidad 22-items** para sembrar en cada sesión | PM-0 §7 |

**Nota operacional:** Si el run tiene `pm-0-context.json` generado en Fase 1 (pipeline v2.5.1+), PM-3.1 lo consume directamente. Si no existe (runs legacy v2.0/v2.1), el instructor debe extraer los cinco vectores manualmente desde PM-0 maestro antes de ejecutar PM-3.1.

---

## OUTPUT ESPERADO

Un documento titulado:
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Playbook Outline (Session Map)`**

Que contiene:

1. **Encabezado institucional** — programa, guía, intensidad, número de sesiones
2. **Panorama general** — tabla resumen de todas las sesiones (1 fila por sesión)
3. **Mapa detallado por sesión** — cada sesión con su estructura SET-UP / WHILE / WRAP-UP
4. **Mapa de trabajo autónomo** — distribución de las horas de Workbook (PM-3.4)
5. **Lista maestra de materiales** — todo lo que el instructor necesita tener listo antes de empezar

---

## 10 REGLAS DE DISEÑO

### REGLA 1 — LA SESIÓN DE 3 HORAS COMO UNIDAD BASE
Cada sesión presencial dura 3 horas (180 minutos) salvo indicación contraria. Con 24 horas de formación directa, la guía tiene **8 sesiones presenciales**. Si la intensidad cambia, el número de sesiones se recalcula automáticamente.

**Fórmula:** `Número de sesiones = Intensidad directa ÷ Duración de sesión`

### REGLA 2 — ESTRUCTURA TRIPARTITA DE CADA SESIÓN
Toda sesión tiene exactamente 3 momentos:

| Momento | Duración | Función |
|---------|----------|---------|
| **SET-UP** (Apertura) | 15-20 min | Activar conocimiento previo, conectar con sesión anterior, presentar objetivo de hoy |
| **WHILE** (Desarrollo) | 130-150 min | Trabajo con los worksheets: input, práctica, producción |
| **WRAP-UP** (Cierre) | 10-15 min | Síntesis, ticket de salida, preview de próxima sesión, asignación autónoma |

**Principio:** El SET-UP nunca es "pasar lista y ya." Es un warm-up que reactiva el input de la sesión anterior. El WRAP-UP nunca se salta — es donde el aprendiz consolida.

### REGLA 3 — DISTRIBUCIÓN NATURAL, NO MECÁNICA
Los 9 worksheets NO se reparten "1 worksheet = 1 sesión." Se agrupan por afinidad pedagógica y carga cognitiva:

| Agrupación lógica | Worksheets | Razón |
|-------------------|------------|-------|
| **Apertura y diagnóstico** | PM-2.1 + PM-2.2 | Ambos son pre-input: motivación + diagnóstico = una sola sesión de apertura |
| **Input receptivo pesado** | PM-2.3 (solo) | El Reading Anchor es denso: necesita pre-reading, while-reading y post-reading completos |
| **Input auditivo + léxico** | PM-2.6 + PM-2.5 | El Listening alimenta directamente el vocabulario — fluyen naturalmente juntos |
| **Forma lingüística** | PM-2.10 | Gramática como foco de accuracy. La pronunciación ya no es un PM independiente: se integra como scaffolding en PM-2.8 (PM-2.7 deprecado en v2.0) |
| **Producción escrita** | PM-2.4 (solo) | Writing necesita el ciclo completo: model analysis → drafting → peer review → final draft |
| **Producción oral + Misión Final** | PM-2.8 + PM-3.5 | Speaking practice + tarea integradora (desempeño + producto) |
| **Evaluación y cierre** | PM-4.2 + Feedback | El cuestionario + retroalimentación + cierre circular de la guía |

Esto genera un modelo base de **7-8 sesiones**, con la sesión restante (si hay 8) como buffer para ajuste, recuperación, o extensión del Speaking.

### REGLA 4 — CADA SESIÓN TIENE UN NOMBRE COMUNICATIVO
Cada sesión lleva un nombre corto y motivador que el instructor puede usar con los aprendices, no un código técnico.

Ejemplos:
- ✅ *"Session 3: Tuning In"* (Listening + Vocabulary)
- ✅ *"Session 6: Write It Right"* (Writing)
- ❌ *"Session 3: PM-2.4 + PM-2.5"*

### REGLA 5 — TEACHER TALK MÍNIMO EN CADA SESIÓN
Cada sesión incluye un bloque **"Teacher Talk"** — las frases exactas que el instructor dice para las transiciones clave:

- **Opening cue:** "Good morning everyone. Last session we worked on [X]. Today we're going to [Y]."
- **Transition cue:** "Ok, great work on that. Now we're going to switch to [Z]."
- **Closing cue:** "Before we go — can someone tell me one thing you learned today?"

El Teacher Talk está en inglés (con apoyo bilingüe si el nivel es A–A1.1) y usa el vocabulario real de la guía. Máximo 3-4 frases por sesión — no es un script completo.

### REGLA 6 — LOGISTICS BOX POR SESIÓN
Cada sesión incluye un cuadro de logística:

| Campo | Ejemplo |
|-------|---------|
| **Worksheets usados** | PM-2.6 (Listening) + PM-2.5 (Vocabulary) |
| **Materiales adicionales** | Audio file (TTS), speakers/headphones, projector |
| **Agrupación dominante** | Individual → Pairs → Plenary |
| **Recursos Canva** | Slides 8-12 (Listening visuals) |
| **Trabajo autónomo asignado** | Workbook Ch. 3: Vocabulary Reinforcement |

### REGLA 7 — PLAN B (CONTINGENCIA) EN SESIONES CRÍTICAS
Las sesiones que dependen de tecnología (Listening con TTS, Speaking con grabación) o de dinámica grupal (simulación) incluyen un **Plan B** de 1-2 líneas:

- *"Plan B — If audio equipment is unavailable: Instructor reads the script aloud at natural pace. Students follow along with printed transcript."*
- *"Plan B — If class is too large for pair simulation: Use 'fishbowl' format — 2 volunteers perform while the rest observes with checklist."*

### REGLA 8 — PROGRESIÓN VISIBLE DE HABILIDADES
El Outline incluye una **barra de progresión** que muestra qué habilidades se activan en cada sesión:

| Session | R | L | V | P | G | W | S |
|---------|---|---|---|---|---|---|---|
| 1 | — | — | — | — | — | — | — |
| 2 | ● | — | ○ | — | — | — | — |
| 3 | ○ | ● | ● | — | — | — | — |
| 4 | — | — | ○ | ● | ● | — | — |
| 5 | ○ | — | ○ | — | ○ | ● | — |
| 6 | — | — | — | — | — | ○ | ● |
| 7 | ● | ● | ● | — | ● | — | — |

● = Habilidad foco de la sesión | ○ = Habilidad de soporte/reciclaje | — = No activa

**R** = Reading, **L** = Listening, **V** = Vocabulary, **P** = Pronunciation, **G** = Grammar, **W** = Writing, **S** = Speaking

### REGLA 9 — MAPA DE TRABAJO AUTÓNOMO
Las 6 horas de trabajo autónomo se distribuyen como tareas vinculadas a sesiones específicas. Cada asignación autónoma:
- Se asigna en el WRAP-UP de una sesión presencial
- Se revisa en el SET-UP de la sesión siguiente
- Tiene nombre y referencia al Workbook (PM-3.4): "Workbook Ch. 2: Reading Extension"
- Tiene tiempo estimado (30-60 min por asignación)

### REGLA 10 — ZERO META-TALK
El output es el Playbook Outline LISTO PARA USAR. No incluye:
- ❌ Explicaciones sobre por qué se organizó así
- ❌ Notas sobre teoría de diseño instruccional
- ❌ Comentarios sobre Bloom, SIOP o cualquier marco teórico
- ❌ Justificaciones pedagógicas dentro del cuerpo del outline

Las justificaciones viven en este PM-3.1 (el prompt maestro). El output es operativo.

---

## PROMPT PARA IA

```
Eres un diseñador instruccional especializado en formación bilingüe ESP (English for Specific Purposes) en el SENA, Colombia. Tu tarea: generar el PLAYBOOK OUTLINE (Session Map) — el mapa sesión por sesión que el instructor usará para implementar una guía de aprendizaje completa en el aula.

### DATOS DE ENTRADA (el instructor proporciona):

**Datos del programa:**
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Nivel CEFR: [default A1.1-A1.2]
- Intensidad: [default 24h directa + 6h autónoma]
- Duración de sesión: [default 3 horas / 180 minutos]

**Contenido de la guía (Producción Fase 2 completa):**
- PM-2.1: [descripción breve del Spark y las 3 actividades de reflexión]
- PM-2.2: [descripción del diagnóstico visual, saberes previos, blind spots, learning contract]
- PM-2.3: [género del texto ancla, personaje, tema, extensión]
- PM-2.6: [género del audio, personaje, situación, extensión]
- PM-2.5: [20 términos clave, actividades de vocabulario]
- PM-2.10: [grammar targets, número de estructuras, tipo de práctica]
- PM-2.4: [género de escritura, modelo, tipo de tarea final]
- PM-2.8: [tipo de simulación, roles, cue cards]
- PM-2.9: [material transversal — funciones comunicativas inyectadas en sesiones]
- PM-3.5: [misión final — tipo de tarea integradora, producto esperado]

### INSTRUCCIONES DE GENERACIÓN:

**PARTE 1 — ENCABEZADO INSTITUCIONAL**
Genera:
- Título: [PROGRAMA] — GUÍA [#]: [NOMBRE] — PLAYBOOK OUTLINE
- Subtítulo: Instructor's Session Map
- Datos: Programa, Nivel CEFR, Intensidad, Número de sesiones, Duración por sesión
- Nota: "Este documento es SOLO para el instructor. No distribuir a los aprendices."

**PARTE 2 — PANORAMA GENERAL (OVERVIEW TABLE)**
Genera una tabla resumen con 1 fila por sesión:

| Session | Nombre | Worksheets | Foco | Habilidades | Autónomo |
|---------|--------|------------|------|-------------|----------|

Donde:
- Session = número (1, 2, 3...)
- Nombre = título comunicativo de la sesión
- Worksheets = códigos PM usados
- Foco = descripción en 1 línea de lo que pasa en la sesión
- Habilidades = códigos de la barra de progresión (R/L/V/P/G/W/S con ●/○)
- Autónomo = tarea asignada (si aplica)

**PARTE 3 — MAPA DETALLADO POR SESIÓN**
Para CADA sesión genera:

#### SESSION [#]: [NOMBRE COMUNICATIVO]
**Worksheets:** PM-X.X + PM-X.X
**Duración:** [X] minutos
**Habilidades foco:** [●] / **Soporte:** [○]

**SET-UP (XX min)**
- Warm-up: [actividad específica que reactiva la sesión anterior]
- Objective: [lo que el aprendiz podrá hacer al final de esta sesión]
- Teacher Talk: "[Frase de apertura exacta]"

**WHILE (XX min)**
- Bloque A ([XX min]): [Actividad + worksheet + agrupación + instrucción clave]
- Bloque B ([XX min]): [Actividad + worksheet + agrupación + instrucción clave]
- Bloque C ([XX min]): [Si aplica]
- Transición: Teacher Talk: "[Frase de transición]"

**WRAP-UP (XX min)**
- Exit Ticket: [Pregunta o mini-tarea de cierre]
- Teacher Talk: "[Frase de cierre]"
- Trabajo Autónomo: [Asignación + referencia Workbook + tiempo estimado]

**LOGISTICS BOX**
| Campo | Detalle |
|-------|---------|
| Worksheets | [códigos] |
| Materiales | [lista] |
| Agrupación | [Individual → Pairs → Plenary, etc.] |
| Recursos Canva | [Slides #-#] |
| Plan B | [Solo si la sesión depende de tecnología o dinámica especial] |

**PARTE 4 — SKILLS PROGRESSION MAP**
Genera la tabla de progresión de habilidades:

| Session | R | L | V | P | G | W | S |
|---------|---|---|---|---|---|---|---|

Con ● (foco) y ○ (soporte).

**PARTE 5 — MAPA DE TRABAJO AUTÓNOMO**
Genera tabla:

| Asignado en | Revisado en | Actividad | Referencia Workbook | Tiempo |
|-------------|-------------|-----------|---------------------|--------|

**PARTE 6 — LISTA MAESTRA DE MATERIALES**
Genera lista agrupada por categoría:

- **Impresos:** [worksheets, cue cards, etc.]
- **Digitales:** [audio files, slides, etc.]
- **Equipamiento:** [speakers, projector, etc.]
- **Aula:** [disposición de mesas, espacios, etc.]

### REGLAS DE DISTRIBUCIÓN DE WORKSHEETS:

Usa esta agrupación como modelo base (ajustable según intensidad):

| Session | Worksheets | Lógica |
|---------|------------|--------|
| 1 | PM-2.1 + PM-2.2 | Apertura: motivación + diagnóstico |
| 2 | PM-2.3 | Input pesado: Reading Anchor completo |
| 3 | PM-2.4 + PM-2.5 | Input auditivo → vocabulario (flujo natural) |
| 4 | PM-2.6 + PM-2.10 | Listening + Grammar (pronunciación como scaffolding en PM-2.8) |
| 5 | PM-2.8 | Producción escrita: ciclo completo |
| 6 | PM-2.9 | Producción oral: preparación + simulación |
| 7 | PM-4.2 + Feedback | Evaluación: cuestionario + retroalimentación |
| 8 | Buffer/Extensión | Recuperación, extensión Speaking, o cierre circular |

Si la guía tiene menos de 24 horas, comprime las sesiones fusionando bloques afines. Si tiene más de 24 horas, expande Reading y Speaking (los más densos).

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto: el Teacher Talk respeta el nivel de la guía
- Bilingüe: Teacher Talk en inglés con soporte español si nivel ≤ A1.1
- Zero Meta-Talk: el output es el playbook operativo, no un ensayo pedagógico
- Los tiempos deben sumar exactamente la duración de la sesión (ej. 180 min)
- Cada worksheet aparece EXACTAMENTE 1 vez como foco (puede reaparecer como reciclaje)
- El Cuestionario (PM-4.2) SIEMPRE va en una sesión dedicada, nunca fragmentado
```

---

## §11 — CAMPOS EXTENDIDOS DEL OUTPUT JSON (Pipeline v2.1+)

> [!info] Versión 2.1 — Campos adicionales obligatorios en `pm-3-1.json`
> A partir de v2.1, el output de PM-3.1 incluye cuatro bloques de datos adicionales que los scripts de patch (`pm-3-1-amb-patch.js`, `pm-3-1-estrategias-patch.js`, `pm-3-1-voc-patch.js`) inyectan en el JSON canónico. Estos campos deben generarse como parte del mismo proceso PM-3.1.

---

### §11.1 — AMBIENTE DE APRENDIZAJE por sesión

Cada `session_detail[n].logistics_box` debe incluir el campo `ambiente`:

```json
"logistics_box": {
  "ambiente": "Descripción precisa del espacio físico requerido, condiciones y configuración específica de la sesión.",
  "materiales": ["item 1", "item 2", "..."],
  "agrupacion": "Flujo de agrupación dominante",
  "recursos_canva": "Slides #-# (descripción)",
  "plan_b": "Solo si la sesión depende de tecnología o dinámica grupal crítica."
}
```

El bloque top-level `ambientes_resumen` documenta el patrón general:

```json
"ambientes_resumen": {
  "nota": "Descripción del patrón general (ej. 'Aula convencional con adaptaciones por sesión').",
  "tipo_ambiente": "Tipo genérico (ej. 'Aula convencional con adaptaciones')",
  "recursos_fijos": ["Proyector", "Pizarra", "Word Wall permanente", "..."],
  "recursos_variables_por_sesion": "Ver campo 'ambiente' en cada logistics_box."
}
```

**Regla de diseño:** El ambiente debe ser **descriptivo y operacional** — el instructor lo lee y sabe exactamente cómo disponer el salón antes de que lleguen los aprendices.

---

### §11.2 — ESTRATEGIAS DIDÁCTICAS ACTIVAS + CICLO SENA por sesión

> [!warning] AVISO PARA EL LLM
> Las **estrategias y el ciclo SENA** (§11.2) son marcos pedagógicos universales — aplicar siempre. Las **justificaciones y técnicas por bloque** son instancias específicas de cada programa: derivarlas desde el contenido real del RAP, no reproducir las de DIESEL G1. La tabla "Ciclo SENA estándar para 8 sesiones" al final de esta sección es una referencia de distribución, no una prescripción fija.

Cada `session_detail[n].logistics_box` debe incluir:

```json
"momento_sena":         "3.x — Nombre del momento (e.g. '3.1 — Reflexión Inicial')",
"estrategia":           "Nombre de la estrategia activa (ver tabla abajo)",
"justificacion":        "Por qué esta estrategia en esta sesión: qué activa cognitivamente y cómo conecta con el producto de la sesión.",
"tecnicas": [
  { "bloque": "A", "actividad": "Nombre de la actividad", "tecnica": "Técnica didáctica específica" },
  { "bloque": "B", "actividad": "...",                     "tecnica": "..." }
]
```

El bloque top-level `estrategias_resumen` documenta el ciclo SENA completo:

```json
"estrategias_resumen": {
  "nota": "Resumen del arco de estrategias del programa.",
  "ciclo_sena": {
    "3.1_reflexion_inicial": "Sesiones + estrategia",
    "3.2_contextualizacion": "Sesiones + estrategia",
    "3.3_apropiacion":       "Sesiones + estrategia",
    "3.4_transferencia":     "Sesiones + estrategia"
  }
}
```

**Estrategias canónicas para programas técnicos SENA:**

| Estrategia | Cuándo usar |
|-----------|-------------|
| Aprendizaje Basado en Problemas (ABP) | Sesión de apertura — el problema motiva la necesidad del inglés técnico |
| Aprendizaje Basado en Tareas (ABT) | Sesiones de input + producción con producto verificable |
| Simulaciones | Sesiones de transferencia oral y producción integrada |
| Evaluación Formativa Integrada | Sesión de cuestionario + metacognición |
| Seminario Investigativo | Alternativa para sesiones de reflexión crítica |

**Ciclo SENA estándar para una guía de 8 sesiones:**

| Momento SENA | Sesiones | Estrategia dominante |
|--------------|----------|----------------------|
| 3.1 — Reflexión Inicial | S1–S2 | ABP + ABT |
| 3.2 — Contextualización | S3 | ABT |
| 3.3 — Apropiación | S4–S6 | ABT + Simulaciones + Evaluación Formativa |
| 3.4 — Transferencia | S7–S8 | Simulaciones |

---

### §11.3 — TABLA V+O+C (Dimensiones de Aprendizaje) por sesión

> [!warning] AVISO PARA EL LLM
> Los valores del campo V+O+C son **completamente específicos al programa y sesión**. Al generar V+O+C para un nuevo programa, construir los descriptores desde cero basándose en el RAP, el vocabulario del Toolbelt y el producto de la sesión de ese programa. No copiar descriptores de DIESEL G1.

El bloque top-level `voc_dimensions_table` es un array con 1 objeto por sesión:

```json
"voc_dimensions_table": [
  {
    "session": 1,
    "nombre": "Nombre comunicativo de la sesión",
    "cognitiva":     "Verbo_cognitivo + objeto_específico_del_RAP + condición",
    "procedimental": "Verbo_procedimental + objeto_específico_del_RAP + condición",
    "actitudinal":   "Verbo_actitudinal + objeto_específico_del_RAP + condición"
  }
]
```

**Fórmula V+O+C:** `Verbo (infinitivo) + Objeto + Condición`

El verbo es el **primer token** de cada instrucción y determina la dimensión:

| Dimensión | Color en renders | Verbos canónicos |
|-----------|-----------------|------------------|
| **COGNITIVA — Saber** | Azul `#1565C0` | identificar, clasificar, recordar, comprender, analizar, interpretar, relacionar |
| **PROCEDIMENTAL — Hacer** | Verde `#2E7D32` | construir, operar, producir, organizar, completar, realizar, presentar, aplicar, redactar |
| **ACTITUDINAL — Ser** | Morado `#7B1FA2` | valorar, argumentar, reflexionar, demostrar, comprometerse, reconocer, celebrar |

**Principio de alineación:** Las tres dimensiones de cada sesión deben apuntar al MISMO producto o tarea de la sesión. El **objeto** en las tres instrucciones debe ser el mismo (el producto de la sesión): si la sesión produce un reporte técnico, Cognitiva identifica sus partes, Procedimental lo redacta, Actitudinal reconoce su importancia profesional.

> **Ejemplo de referencia — DIESEL G1, S3 "Write It Right" (NO copiar literalmente para otros programas):**
> Cognitiva: *"Identificar las tres estructuras gramaticales en el texto técnico de la Sesión 2 mediante marcación por colores."*
> Procedimental: *"Producir un Daily Inspection Checklist y un Work Order completo en inglés aplicando las tres estructuras gramaticales."*
> Actitudinal: *"Reconocer la precisión gramatical en inglés como condición necesaria para la documentación técnica segura en el taller diesel."*
>
> Notar: el objeto ("Daily Inspection Checklist / Work Order") es específico del taller diesel. Para un programa de Contabilidad sería "Balance Sheet / Financial Report". Para Enfermería sería "Patient Assessment Form / Nursing Notes".

---

### §11.4 — TÉCNICAS DIDÁCTICAS — Taxonomía canónica

Referencia rápida para asignar `tecnica` por actividad:

| Técnica | Descripción corta | Contexto típico |
|---------|-------------------|-----------------|
| Análisis de situación problémica | Lectura crítica de un caso/noticia que genera conflicto cognitivo | Apertura ABP |
| KWL chart | Know-Want-Learned: diagnóstico y cierre de saberes | S1 SET-UP / WRAP-UP |
| Construcción de organizador visual (Word Wall) | Clasificación física de tarjetas en categorías en pared | Vocabulario S2 |
| Lectura cooperativa Jigsaw | Grupos expertos leen secciones distintas, cruzan información | Reading |
| Carrera de categorías | Clasificación en tiempo real por equipos | Vocabulario |
| Inducción gramatical por descubrimiento de colores | Marcación por color de estructuras en texto auténtico | Grammar |
| Estaciones de práctica rotativas | 3-4 estaciones con ejercicios distintos, rotación cronometrada | Grammar / Vocabulary |
| Escritura modelada co-construida | Instructor + aprendices producen texto juntos en pizarra | Pre-writing |
| Escucha activa secuencial | Primera escucha (comprensión global) → segunda escucha (detalle) | Listening |
| Demostración oral en vivo / Role-play | Performance evaluada ante audiencia real o par | Speaking / S4/S7/S8 |
| Mapa de funciones comunicativas | Organizador gráfico relacional de funciones F1-Fn | S5 / Language Functions |
| Drills de práctica estímulo-respuesta | Repetición controlada por función comunicativa | Speaking |
| Simulación integrada de role-play | 3-4 personajes en contexto de taller, evaluación integrada | S5/S8 |
| Cuestionario de comprensión | Items de selección múltiple o V/F sobre texto/audio | Evaluación |
| Diagnóstico reflexivo + gráfico de progresión | Análisis de resultados + auto-diagnóstico por habilidad | S6 |
| Reflexión circular de cierre | Compara estado inicial (Gap Cards) con estado final | S8 |

---

### §11.5 — PM0 ALIGNMENT BY SESSION *(nuevo v2.5.1 — cierra BUG-PM31-001)*

> [!info] Propósito
> Este bloque es la **pre-carga canónica** del `pm0_protocol` que cada `pm-3-2-sX.json` necesita en Fase 3. Antes de v2.5.1, cada Build-Out derivaba `pm0_protocol` independientemente, lo que producía deriva entre sesiones. A partir de v2.5.1, el Outline es el **contrato PM-0 del run** y PM-3.2 sólo lo materializa con el detalle de facilitación.

El output `pm-3-1.json` incluye obligatoriamente un bloque top-level `pm0_alignment_by_session`:

```json
"pm0_alignment_by_session": [
  {
    "session": 1,
    "nombre": "Nombre comunicativo de la sesión",

    "l1_percentage_target": {
      "value": 30,
      "source": "pm-0-context.json l1_policy_per_guide[n].s1_to_s8 (PM-0 §9.1)",
      "rationale": "Por qué este porcentaje en esta sesión (ej. 'Día 1 establecer confianza')"
    },

    "grammar_groups_active": [
      {
        "group_id": "Gr 1",
        "group_name": "Verbo be (afirmativo contraído, negativo, preguntas, respuestas cortas)",
        "nivel_activacion": "Intro|Consolida|Aplica",
        "ejemplo_en_sesion": "Instancia concreta de la estructura en el contenido de esta sesión"
      }
    ],
    "grammar_carga_check": "X/2 Intro máximos (PM-0 §9.2)",

    "dominant_feedback_mode": {
      "mode": "ACCURACY|FLUENCY|MIXTO",
      "rationale": "Por qué este modo en esta sesión según methodological_shifts_per_guide + §5.11",
      "techniques": [
        "Recast / Elicitación / Metalinguistic cue / Choral drill / Error codes / Post-task delayed feedback / Peer feedback"
      ]
    },

    "stress_focus": {
      "target_words": [
        { "word": "palabra", "ipa": "/ˈtranscripción/", "tonica": "SÍlaba" }
      ],
      "techniques": [
        "Finger drilling / Backchaining / Clapping rítmico / Board marking (MAYÚSCULA = sílaba tónica) / Choral drill"
      ],
      "source": "PM-0 §5.13 — Noticing de stress con soporte físico"
    },

    "success_factors_priorized": {
      "target_vocabulary": ["término1", "término2", "..."],
      "factors_applied": ["Sounds", "Use", "Conceptualize", "Creativity", "Encounter", "Self-expression"],
      "operationalization": "Cómo se aplican concretamente los factores SUCCESS en el vocabulario de esta sesión",
      "source": "PM-0 §5.5 (Memorización) + §5.10 (Factor SUCCESS)"
    },

    "cefr_descriptor_focus": {
      "subnivel": "A1.1|A1.2|A1.3|A2.0|A2.1",
      "habilidad_principal": "comprension_oral|comprension_lectora|interaccion_oral|produccion_oral|produccion_escrita",
      "descriptor_activo": "Descriptor CEFR específico que esta sesión trabaja (citado de cefr_descriptors_per_guide o PM-0 §4/§6)",
      "source": "pm-0-context.json cefr_descriptors_per_guide[n].descriptor_snapshot.[habilidad]"
    },

    "pedagogical_shift_hooks": {
      "velocidad_input": "Muy lenta / Lenta / Moderada / Natural — según methodological_shifts_per_guide",
      "extension_textos": "Rango específico de la sesión",
      "andamiaje": "Máximo / Alto / Moderado / Mínimo / Cero",
      "rol_docente": "Modelo central / Modelo y andamio / Facilitador / Monitor / Monitor + retroalimentador / Evaluador externo",
      "source": "PM-0 §8 — Hoja de ruta A1.1 → A2.x"
    },

    "traceability_seed_22": {
      "items_priorizados_para_esta_sesion": [
        "A3 — Trazabilidad a descriptores §4/§6",
        "B1 — Pre-enseñanza vocabulario",
        "B3 — Accuracy/fluency mode",
        "B5 — Gestión L1",
        "C1 — Bloque FPI correcto",
        "D2 — Can-do asociado"
      ],
      "source": "PM-0 §7 — Instrumento de Trazabilidad Pedagógica (22 ítems)",
      "nota": "No exhaustivo; Build-Out PM-3.2 debe completar checklist completo"
    }
  }
]
```

**Principio de diseño §11.5:**

- **Verdad única**: El Outline declara el contrato PM-0; el Build-Out lo materializa, no lo redefine.
- **Trazabilidad**: Cada campo incluye `source` citando la ubicación normativa de PM-0 (o `pm-0-context.json` si existe).
- **Progresión explícita**: `l1_percentage_target`, `grammar_groups_active` y `dominant_feedback_mode` deben mostrar progresión coherente de S1 a S8 (ej. L1 descendente; Intro → Consolida → Aplica; ACCURACY → MIXTO → FLUENCY).
- **Carga respetada**: `grammar_carga_check` explicita que `|nivel_activacion=Intro| ≤ 2` (PM-0 §9.2).
- **Sin overlap con §11.1–§11.4**: §11.5 es pedagogía pura (PM-0); §11.1 es logística física; §11.2 es ciclo SENA; §11.3 es V+O+C; §11.4 es taxonomía de técnicas. Son dimensiones ortogonales.

**Propagación hacia PM-3.2:**

PM-3.2 Build-Out v2.5.1 hereda `pm0_alignment_by_session[n]` y lo transforma en `pm0_protocol` de `pm-3-2-sX.json` (expandiendo cada campo con el detalle de facilitación: Teacher Talk específico, materiales físicos, alternativas Plan B). El script canónico es `pm-3-2-pm0-propagate.js` (a crear por run) que toma `pm-3-1.json.pm0_alignment_by_session[n]` y lo inyecta en el JSON de la sesión n.

**Validación downstream (PM-2.11 Check 14 extendida v2.5.2):**

Check 14 se extiende para validar, además de `momento_sena + estrategia_didactica + justificacion + tecnica_didactica`, también:
- `l1_percentage_target.value` (Outline) == `pm0_protocol.l1_management.l1_percentage` (Build-Out)
- `grammar_groups_active[*].group_id` (Outline) ⊆ `pm0_protocol.grammar_groups[*].group_id` (Build-Out)
- `dominant_feedback_mode.mode` (Outline) == `pm0_protocol.feedback.mode` (Build-Out)
- `stress_focus.target_words` (Outline) ⊆ `pm0_protocol.stress_pronunciation.focus_words` (Build-Out)

Si alguna validación falla, el run debe corregir el Build-Out (no el Outline) — el Outline es la fuente de verdad.

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | **PM-0** *(nuevo v2.5.1)* | Ancla pedagógica fundacional: CEFR descriptors, grammar roadmap, L1 policy, methodological shifts, principios §5.1–§5.13, 22-item checklist §7. Consumido vía `pm-0-context.json` del run (pipeline v2.5.1+) o extraído manualmente del prompt maestro (runs legacy). |
| **Depende de** | PM-1.2 | Intensidad, vocabulario, grammar targets, functions |
| **Depende de** | PM-2.1 a PM-2.10 + PM-3.5 | Los worksheets + misión final que se distribuyen en sesiones |
| **Depende de** | PM-2.11 | Fila GFPI-F-134 completa ensamblada (contrato pedagógico) |
| **Depende de** | PM-4.2 | El Cuestionario que se ubica en la sesión de evaluación |
| **Alimenta a** | PM-3.2 | El Build-Out toma UNA sesión del Outline y la desarrolla en detalle completo. **v2.5.1:** hereda `pm0_alignment_by_session[n]` → `pm0_protocol` sin redefinirlo. |
| **Alimenta a** | PM-3.3 | El template Canva se organiza según el orden de sesiones del Outline |
| **Alimenta a** | PM-3.4 | El Workbook Autónomo se estructura según el mapa de trabajo autónomo del Outline |
| **Se relaciona con** | GFPI-F-135 | El Outline es la operacionalización de las Actividades de Aprendizaje (§3.1-3.4) |

---

## EJEMPLO DE EJECUCIÓN — ADSO, GUÍA 1: THE HARDWARE SPECIALIST

**Input:**
- Programa: ADSO (228118)
- Guía 1: The Hardware Specialist
- Nivel CEFR: A1.1 — A1.2
- Intensidad: 24h directa + 6h autónoma
- Sesión: 3 horas (180 min)
- Número de sesiones: 8

**Contenido de la guía:**
- PM-2.1: Spark — escenario del developer sin PC funcional, debate sobre qué hardware pedir
- PM-2.2: Gap Analysis — diagnóstico visual hardware, blind spots, learning contract
- PM-2.3: Reading — Internal Tech Request Email de Carlos Ramírez (Junior Developer)
- PM-2.6: Listening — Phone call entre Carlos y soporte técnico pidiendo componentes
- PM-2.5: Vocabulary — 20 hardware terms (CPU, RAM, GPU...) + toolbelt + gap fill
- PM-2.10: Grammar — To Be + Have/Has + Demonstratives + Adjectives, syntax bugs, fill ticket
- *Pronunciation scaffolding (/æ/ vs /ʌ/, fonética para latinos, chunking drill) integrado como parte interna de PM-2.8 desde v2.0 — PM-2.7 deprecado*
- PM-2.4: Writing — Tech Request email, blueprint + drafting + auditor's checklist
- PM-2.8: Speaking — Help Desk simulation, cue cards
- PM-2.9: Language Functions — material transversal inyectado en sesiones 2-5
- PM-3.5: Final Mission — tarea integradora (desempeño oral + producto Spec Sheet)
- PM-4.2: Cuestionario Consolidado S6 — 25 pts (5 secciones × 5 pts) — personajes de ejemplo: Laura Méndez QA, Miguel Torres, IT voicemail. Canon de puntuación: ver PM-4.1 §Canon v2.3.1.

**Output generado (panorama):**

| Session | Nombre | Worksheets | Foco | Habilidades |
|---------|--------|------------|------|-------------|
| 1 | The Wake-Up Call | PM-2.1 + PM-2.2 | Motivación: el developer sin PC + diagnóstico de saberes previos | — |
| 2 | Read the Request | PM-2.3 | Input pesado: Tech Request Email de Carlos Ramírez | R● V○ |
| 3 | Tuning In | PM-2.6 + PM-2.5 | Listening de la llamada + trabajo de vocabulario hardware | L● V● R○ |
| 4 | Say It Right, Build It Right | PM-2.10 (+ pronunciation scaffolding integrado en PM-2.8) | Gramática: To Be, Have/Has, Demonstratives + práctica oral con atención a pronunciación | G● P○ V○ |
| 5 | Write It Right | PM-2.4 | Producción escrita: redactar Tech Request propio | W● G○ V○ R○ |
| 6 | The Help Desk — Final Mission | PM-2.8 + PM-3.5 | Simulación oral integradora + entrega de producto (Spec Sheet) | S● V○ G○ W○ |
| 7 | Prove What You Know | PM-4.2 | Cuestionario Consolidado S6 (25 pts, ver canon PM-4.1) + retroalimentación | R● L● V● G● W● |
| 8 | The Full Circle | Review + Closure | Recuperación, extensión, cierre circular, feedback loop | — |

**Ejemplo de sesión detallada — Session 3: Tuning In**

**Worksheets:** PM-2.6 (Listening) + PM-2.5 (Vocabulary)
**Duración:** 180 minutos
**Habilidades foco:** L● V● | **Soporte:** R○

**SET-UP (20 min)**
- Warm-up: "Quick Recall" — En parejas, cada aprendiz nombra 3 componentes que recuerda del email de Carlos (reciclaje PM-2.3)
- Objective: "Today you will listen to a phone call about hardware and learn 20 key vocabulary words."
- Teacher Talk: "Good morning everyone. Last session we read Carlos's email. Today we're going to LISTEN to Carlos on the phone — and learn the exact words you need for hardware."

**WHILE (145 min)**
- Bloque A (50 min): Listening — Pre-listening prediction → First listen (gist) → Second listen (detail) → Third listen (task completion). Agrupación: Individual → Pairs for checking.
- Bloque B (15 min): Break / Transition. Teacher Talk: "Great job with the listening. Now we're going to focus on the vocabulary — the words Carlos used on the phone."
- Bloque C (60 min): Vocabulary — Toolbelt visual categorization → Association matching → Gap fill with word bank → Micro-production (describe your own workstation using 5 terms). Agrupación: Individual → Small groups → Plenary sharing.
- Bloque D (20 min): Reciclaje — Volver al texto de Reading (PM-2.3) y subrayar los 20 key terms. Comparar con las palabras del Listening.

**WRAP-UP (15 min)**
- Exit Ticket: "Write 3 hardware components and 1 sentence about each using 'has' or 'is'."
- Teacher Talk: "Before we go — write down three components and one sentence for each. Next session we'll work on pronunciation and grammar."
- Trabajo Autónomo: Workbook Ch. 3 — Vocabulary Reinforcement: categorization + crossword + "My Ideal Workstation" paragraph (45 min estimado)

**LOGISTICS BOX**

| Campo | Detalle |
|-------|---------|
| Worksheets | PM-2.4 (printed) + PM-2.5 (printed) |
| Materiales | Audio file (TTS at 0.85x), speakers or individual headphones |
| Agrupación | Individual → Pairs → Small groups → Plenary |
| Recursos Canva | Slides 8-14 (Listening visuals + vocabulary images) |
| Plan B | If audio unavailable: Instructor reads script at natural pace, students follow printed transcript |

---

## §12 — ALINEACIÓN PM-3.2 v3.0 PARADIGM SHIFT 2 CAPAS (NEW v2.7 · 2026-05-07)

> [!info] MED bump audit Fase A · cierre drift documental pre-paradigm shift PM-3.2 v3.0 (2026-05-03)
>
> PM-3.2 v3.0 introdujo paradigm shift 2 capas (CAPA 1 PEDAGOGICAL ANCHORING + CAPA 2 PRACTICAL IMPLEMENTATION) · resuelve anti-patrón #18 (PM-3.6 saltando enrichment ad-hoc · pierde anclaje sistemático PM-0). PM-3.1 v2.6 quedó pre-paradigm · Outline campos producía sin awareness explícito de qué Capa downstream consume cada field. **§12 cierra ese drift documental.**

### §12.1 — Outline campos alimentan CAPA 1 PEDAGOGICAL ANCHORING de PM-3.2

PM-3.2 v3.0 CAPA 1 ancla cada actividad con:
- Principios §5.x PM-0 explícitos (e.g., §5.1 Krashen i+1 · §5.4 Sheltered)
- SIOP components (8 enum: lesson_preparation · building_background · comprehensible_input · strategies · interaction · practice_application · lesson_delivery · review_assessment)
- UbD stage (Stage 1 Desired Results · Stage 2 Evidence · Stage 3 Learning Plan)
- Krashen i+1 brief (input hypothesis specific brief)

**Outline campos heredados upstream** (PM-3.1 → PM-3.2 CAPA 1 hooks):
- `pm0_alignment_by_session.[Sn].grammar_groups_active[]` → seed para SIOP `comprehensible_input`
- `pm0_alignment_by_session.[Sn].cefr_descriptor_focus[]` → seed para Krashen i+1 brief
- `pm0_alignment_by_session.[Sn].pedagogical_shift_hooks[]` → seed para UbD Stage 1/2 Evidence
- `pm0_alignment_by_session.[Sn].traceability_seed` → anchor §5.x PM-0 referenciable
- `logistics_box.estrategia.tecnica_didactica` → seed SIOP `strategies` específica

**Disciplina canon:** Outline NO genera contenido CAPA 1 directamente · provee SEED structurado · PM-3.2 v3.0 elabora anchoring per actividad.

### §12.2 — Outline campos alimentan CAPA 2 PRACTICAL IMPLEMENTATION de PM-3.2

PM-3.2 v3.0 CAPA 2 (legacy v2.6 preservado) genera Teacher Talk samples + timeline minutos + checklist materiales. **Outline provee scaffold logístico:**

- `logistics_box.ambiente` → seed para CAPA 2 `setup_section`
- `logistics_box.tiempo_total_min` + `tiempo_por_bloque[]` → seed para CAPA 2 timeline distribution
- `logistics_box.materiales[]` → seed para CAPA 2 checklist materiales
- `plan_b_contingencia` (REGLA 7) → seed para CAPA 2 `troubleshooting_section`
- `agrupacion[]` por bloque → seed para CAPA 2 transitions narrative

**Disciplina canon:** Outline NO genera Teacher Talk · CAPA 2 lo elabora · pero Outline provee logística structurada que CAPA 2 consume literal (NO reinventa).

### §12.3 — Validación heredancia upstream-downstream PM-3.1 → PM-3.2

NEW validation_check sugerido (para PM-2.11 Check 14 extension · pendiente):

```python
def check_pm31_to_pm32_heredancia(pm31_output, pm32_outputs):
    """Verifica que PM-3.2 v3.0 CAPA 1+2 hereda Outline scaffolds (NO reinventa)."""
    failures = []
    for s_id in range(1, 9):
        outline_session = pm31_output.get('pm0_alignment_by_session', [])[s_id-1]
        build_out = pm32_outputs.get(f's{s_id}', {})

        # CAPA 1 anchoring
        if outline_session.get('grammar_groups_active') and not build_out.get('capa_1_pedagogical_anchoring', {}).get('siop_components'):
            failures.append(f's{s_id} · grammar_groups_active heredado · CAPA 1 SIOP NO emitido')

        # CAPA 2 practical
        if outline_session.get('logistics_box', {}).get('ambiente') and not build_out.get('capa_2_practical_implementation', {}).get('setup_section'):
            failures.append(f's{s_id} · ambiente heredado · CAPA 2 setup_section NO emitido')

    return {
        'name': 'pm31_to_pm32_heredancia_v3',
        'status': 'PASS' if len(failures) == 0 else 'FAIL',
        'failures': failures
    }
```

### §12.4 — Trade-off: Outline v2.7 NO requiere paradigm shift

**Refactor consistency only.** PM-3.1 v2.7 mantiene 100% backward compat con runtime existente IMARPOR-V2 + DIESEL + MGV. La diferencia v2.6 → v2.7 es **documental** (alinea expectativas PM-3.2 v3.0 downstream) · NO funcional. Subagente Python `subagente_pm_3_1_outline.py` NO requiere refactor.

**Cuando se ejecute:** PM-3.1 v2.7 es invocable directamente · runtime PM-3.2 v3.0 ya espera estos campos heredados · alineación se verifica empíricamente cuando se hace cascade Phase 3 completa post-Phase 2.

---

## CHANGELOG

### v2.7 — 2026-05-07 — MED bump audit Fase A · alineación PM-3.2 v3.0 paradigm shift 2 capas

- **Trigger:** PM Card audit Fase A (2026-05-05) flagged drift documental MED · PM-3.1 v2.6 last_verified 2026-04-20 pre-PM-3.2 v3.0 paradigm shift 2 capas (2026-05-03 · 13 días drift).
- **Cierre:** NEW §12 (4 sub-secciones) documenta alineación Outline → CAPA 1 PEDAGOGICAL ANCHORING + CAPA 2 PRACTICAL IMPLEMENTATION downstream.
  - §12.1 · Outline campos alimentan CAPA 1 anchoring (SIOP · UbD · Krashen seeds)
  - §12.2 · Outline campos alimentan CAPA 2 practical (logística · timeline · materials)
  - §12.3 · validation_check NEW sugerido `pm31_to_pm32_heredancia_v3` (extensión PM-2.11 Check 14)
  - §12.4 · Trade-off · refactor consistency only · NO paradigm shift · backward compat 100%
- **Disciplina canon:** Outline NO genera contenido CAPA 1/2 directamente · provee SEED structurado · PM-3.2 v3.0 elabora downstream sin reinventar.
- **Aplicabilidad:** PM-3.1 v2.7 invocable directamente · cascade Phase 3 verifica empíricamente cuando aplique.
- **DM bump:** v3.28 → v3.29 (entrada bumps MED+LOW PM-3.1 + PM-4.1).
- **Memory snapshot:** `memory/feedback_pm31_pm41_bumps_med_low_2026_05_07.md`

### v2.5.1 — 2026-04-20 — Cierre BUG-PM31-001 (run MGV-2026-04-20 G1)

- **BUG-PM31-001** documentado en sección BUG-FIX LOG: PM-0 no estaba declarado como dependencia de PM-3.1; pm-3-1.json no pre-cargaba vectores PM-0 (L1%, grammar carga, feedback mode, stress, SUCCESS) para herencia en PM-3.2.
- **Depends On** actualizado: `[PM-0, PM-2.11, PM-4.1]` (antes: `[PM-2.11, PM-4.1]`).
- **INPUT REQUERIDO** ampliado con **Entrada 3: Ancla PM-0 del run** — consume `pm-0-context.json` si existe, o PM-0 maestro en runs legacy.
- **§11.5 — PM0 ALIGNMENT BY SESSION** añadida como nueva sección canónica: bloque top-level `pm0_alignment_by_session` en `pm-3-1.json` (array de 8 items con L1 target, grammar groups active, feedback mode, stress focus, SUCCESS factors, CEFR descriptor focus, pedagogical shift hooks, traceability seed).
- **Propagación a PM-3.2** formalizada: Build-Out hereda Outline — sin redefinir `pm0_protocol`.
- **PM-2.11 Check 14 extendida** (pendiente v2.5.2): validar pm0_propagation además de strategy_propagation.

### v2.1 — 2026-04-13 — Extensiones §11.1–§11.4

- §11.1 Ambiente de aprendizaje por sesión (logistics_box.ambiente).
- §11.2 Estrategia didáctica + momento SENA por sesión.
- §11.3 Tabla V+O+C (Cognitiva/Procedimental/Actitudinal) por sesión.
- §11.4 Taxonomía canónica de técnicas didácticas.

### v2.0 — 2026-04-13 — Mandatorio

- PM-3.1 pasó de opcional (v1.x) a mandatorio. Playbook Outline es ahora fuente de verdad antes de cualquier derivado estudiantil.

---

*PM-3.1: Playbook Outline — Session Map*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026 (v2.5.1 Abril 2026)*
