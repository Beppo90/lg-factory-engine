# PM-4.1: INSTRUMENTOS DE EVALUACIÓN FORMATIVA

## FPI SENA — Bilingüismo

---

## FRONTMATTER

```yaml
version: 2.6.5
last_verified: 2026-04-21
phase: 3
name: "Instrumentos de Evaluación Formativa — Derivador"
type: "instrument-generator"
depends_on: [PM-2.3, PM-2.4, PM-2.6, PM-2.8, PM-2.9, PM-2.10, PM-2.11]
feeds_into: [PM-3.1, PM-3.6, GFPI-F-135]
previous_versions:
  - 2.0 (2026-04-13)
  - 2.6.4 (2026-04-20)
changelog:
  - 2.6.5 (2026-04-21):
      - Nota arquitectónica: los criterios de PM-4.1 son la fuente ÚNICA de verdad también a nivel de RENDER (no solo de datos). El módulo canónico que los renderiza en el DOCX FINAL es `runs/[RUN-ID]/scripts/lib/render_seccion4_evidencias.js` — ver PM-3.6 REGLA 20.
      - Canon Shared Renderer Pattern (v2.6.5) activo — ningún generador DOCX puede tener una copia inline del render de Sección 4. Esto cierra la clase de bugs donde parches v2.6.4 entraban al review pero no al FINAL (o viceversa).
  - 2.6.4 (2026-04-20):
      - Nota canónica sobre DOBLE-PRESENCIA de criterios (dentro del instrumento Y como col 5 de la Sección 4 del GFPI-F-135).
      - Los criterios de cada instrumento (INST-01 a INST-05) son la FUENTE CANÓNICA ÚNICA consumida por pm-3-6.seccion_4_planteamiento_evidencias.filas_evidencia[].criterios.
      - PROHIBIDO alucinar criterios en la Sección 4 del GFPI-F-135 — deben derivarse literal de este PM (con citación de origen).
      - Ver también: PM-3.6 REGLA 18 + REGLA 19 + CHECK 17 consistencia upstream→downstream.
```

---

## CAMBIO v2.0 — INSTRUMENTOS DERIVADOS DE ACTIVITY CARDS

> [!info] Cambio v2.0 (2026-04-13)
> En v2.0, PM-4.1 opera como **derivador de instrumentos** a partir de las Activity Cards de los PM-2.x.
> Los 6 instrumentos de evaluación corresponden exactamente a las 6 evidencias definidas en la columna 8 de la matriz GFPI-F-134.
> PM-4.1 ya no diseña evidencias independientemente — las toma de las Activity Cards de cada PM de apropiación y construye los instrumentos de medición alineados a ellas.
>
> **Flujo v2.0:**
> 1. PM-2.11 (Row Assembler) ensambla las Activity Cards en la fila GFPI-F-134
> 2. PM-4.1 lee las especificaciones de evidencia de esa fila
> 3. PM-4.1 genera 6 instrumentos, uno por cada evidencia
> 4. PM-4.2 especializa el instrumento No. 6 (cuestionario consolidado)

---

## CAMBIO v2.6.4 — DOBLE-PRESENCIA DE CRITERIOS (INSTRUMENTO + GFPI-F-135 SECCIÓN 4)

> [!warning] Cambio v2.6.4 (2026-04-20)
> Los **criterios de evaluación** producidos por PM-4.1 ahora viven en **dos lugares** del paquete del run, con una única fuente de verdad:
>
> **(1) Dentro del instrumento** (uso del instructor):
> - `pm-4-1.json.instrument_1_reading.items[]` — 5 ítems de cuestionario
> - `pm-4-1.json.instrument_2_writing.criteria[]` — 4 criterios de rúbrica analítica (C1 Format + C2 Grammar + C3 Vocabulary + C4 Clarity)
> - `pm-4-1.json.instrument_3_listening.checklist_items[]` — 5 ítems de lista de chequeo
> - `pm-4-1.json.instrument_4_speaking.observation_criteria[]` — 5 criterios de escala de estimación
> - `pm-4-1.json.instrument_5_language_functions.stations[]` — 5 estaciones
>
> **(2) Dentro del GFPI-F-135** (Sección 4, visible al aprendiz y al coordinador del proyecto formativo):
> - `pm-3-6.json.seccion_4_planteamiento_evidencias.filas_evidencia[N].criterios` — texto derivado de (1)
>
> **Regla dura:** la col 5 "Criterios de evaluación" de la Sección 4 del GFPI-F-135 se deriva LITERAL de los campos de PM-4.1 arriba listados. **PROHIBIDO alucinar criterios en esa columna.** Toda celda debe citar su origen al final: `(Fuente: PM-4.1 INST-0X)` para E1-E5 y `(Fuente: PM-4.2)` para E6.
>
> **Flujo v2.6.4:**
> 1. PM-4.1 produce `instrument_1..5` con `criteria` / `checklist_items` / `observation_criteria` / `stations` canónicos.
> 2. `patch_v264_seccion4_y_e2.js` (script pipeline) consume esos campos y los serializa en `pm-3-6.seccion_4_planteamiento_evidencias.filas_evidencia[].criterios` con citación de origen.
> 3. `gen_35_36_docx.js` renderiza la tabla 6-col del GFPI-F-135 leyendo de pm-3-6.json (nunca directamente de pm-4-1.json).
>
> **Consecuencia arquitectónica:** cambiar un criterio en PM-4.1 requiere **re-ejecutar el patch script + regenerar el DOCX** del GFPI-F-135. No se permite editar la col 5 manualmente en el DOCX — la fuente de verdad es PM-4.1.
>
> **CHECK 17 (delegado a PM-3.6):** antes de generar el DOCX final, validar que `pm-3-6.seccion_4.filas_evidencia[N].criterios` no contenga texto que no derive de PM-4.1 o PM-4.2. Ver PM-3.6 REGLA 19.

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-4.1 |
| **Nombre** | Instrumentos de Evaluación Formativa |
| **Subfase guía SENA** | 4. Actividades de Evaluación |
| **Ubicación en la Guía** | Sección 3.3 Evaluación (instrumentos durante la guía) |
| **Tipo de Evidencia SENA** | Desempeño (§3) + Proceso (§5) |
| **Instrumentos** | Checklist de Observación (§3) + Feedback Loop (§5) |

---

## ESTRUCTURA DE PM-4.1 — LOS 6 INSTRUMENTOS DE EVALUACIÓN

PM-4.1 genera **6 instrumentos** que corresponden exactamente a las 6 evidencias definidas en la columna 8 de GFPI-F-134:

| # | Instrumento | Tipo | Técnica | Origen | Sesión | Puntos |
|---|---|---|---|---|---|---|
| **1** | Cuestionario de Reading | Conocimiento | Preguntas | PM-2.3 | S2 | 5 |
| **2** | Lista de Verificación de Writing | Producto | Verificación | PM-2.4 | S3 | 5 |
| **3** | Lista de Chequeo de Listening | Desempeño | Observación | PM-2.6 | S4 | 5 |
| **4** | Lista de Chequeo de Speaking | Desempeño | Observación | PM-2.8 | S4 | 5 |
| **5** | Lista de Chequeo de Language Functions | Desempeño | Observación | PM-2.9 | S5 | 5 |
| **6** | Cuestionario Consolidado S6 | Conocimiento | Preguntas | PM-2.x (5 PMs) | S6 (1ª mitad) | **25** |

**Nota sobre Instrumento No. 6:** El cuestionario consolidado es construido por **PM-4.2**, que actúa como ensamblador especializado. PM-4.1 especifica su estructura; PM-4.2 genera su contenido detallado.

---

### CANON DE PUNTUACIÓN v2.3.1 — FUENTE DE VERDAD

> [!important] PM-4.1 es la FUENTE DE VERDAD del canon de puntuación del sistema.
> Cualquier otro PM (PM-3.1, PM-3.6, PM-4.2, GFPI-F-135 Data Contract, DOCUMENTO MAESTRO) que mencione puntajes debe citar estos valores. No duplicar la definición en otros archivos.

**Distribución canónica de 50 puntos formales:**

| Bloque | Instrumentos | Pts | Acumulado |
|--------|--------------|-----|-----------|
| Instrumentos formativos (apropiación S2–S5) | #1 Reading, #2 Writing, #3 Listening, #4 Speaking, #5 Language Functions | 5 × 5 = **25** | 25 |
| Instrumento sumativo (evaluación S6) | #6 Cuestionario Consolidado S6 (5 secciones × 5 pts) | **25** | **50** |

**TOTAL FORMAL EVALUABLE: 50 puntos.**

**Misión Final (PM-3.5):** Transferencia ABP — **NO suma al total formal**. Es aplicación en contexto laboral sin evaluación formal (principio de Transferencia SENA: Sesiones 6½–8). Puede llevar retroalimentación cualitativa o rúbrica de desempeño, pero no se integra al cómputo de 50 pts.

**Reglas derivadas:**
1. Todo texto que diga "Cuestionario 50 pts" en cualquier PM está obsoleto (era el valor de v1.x). Canon actual: **25 pts**.
2. Todo texto que diga "Total 55 pts" o sume la Misión Final es obsoleto. Canon actual: **50 pts formales**.
3. PM-4.2 implementa el Instrumento #6 (25 pts = 5 secciones × 5 pts).
4. PM-3.6 (Learning Guide Generator) debe mostrar al aprendiz el total de 50 pts y explicar que la Misión Final no computa al total.

---

## OUTPUTS ESPERADOS — ESPECIFICACIÓN DE LOS 6 INSTRUMENTOS

### Instrumento No. 1 — Cuestionario de Reading (Evidencia de Conocimiento)
- **Fuente:** Activity Card de PM-2.3 (Reading — The Master Anchor)
- **Técnica:** Preguntas (comprensión de lectura)
- **Formato:** Preguntas de comprensión sobre texto técnico (nivel literal e inferencial)
- **Descripción:** El aprendiz demuestra comprensión de textos técnicos en inglés leyendo un texto nuevo en el mismo universo narrativo de la guía y respondiendo preguntas de diferentes niveles Bloom
- **Criterios de aceptación:** Responde a los criterios de evaluación de la columna 5 de GFPI-F-134 relacionados con comprensión de lectura técnica
- **Orientación:** Texto parecido pero DIFERENTE al texto ancla de S2 (Principio de Tres Versiones)

### Instrumento No. 2 — Lista de Verificación de Writing (Evidencia de Producto)
- **Fuente:** Activity Card de PM-2.4 (Writing — Task-Based)
- **Técnica:** Verificación del producto (checklist + rúbrica)
- **Formato:** Lista de criterios verificables aplicados al texto escrito producido por el aprendiz
- **Criterios de verificación:** 
  - Formato y estructura (encabezados, párrafos, firma)
  - Coherencia y cohesión lógica
  - Vocabulario técnico apropiado (de los 20 key terms)
  - Registro formal y convenciones de género (email, reporte, descripción)
  - Tarea comunicativa completada (propósito alcanzado)
- **Orientación:** Escenario de escritura parecido pero diferente al de S3

### Instrumento No. 3 — Lista de Chequeo de Listening (Evidencia de Desempeño)
- **Fuente:** Activity Card de PM-2.6 (Listening — The Auditory Anchor)
- **Técnica:** Observación durante tarea de escucha
- **Formato:** Lista de comportamientos y resultados observables durante la actividad de escucha
- **Criterios observables:**
  - Comprensión global del audio (identifica tema general)
  - Comprensión específica (extrae información clave)
  - Respuesta a consignas de la tarea (completa notetaking, secuencias, verifica información)
  - Concentración y participación en la actividad
- **Orientación:** Audio nuevo en el mismo universo narrativo, diferente al de S4 pero con igual complejidad

### Instrumento No. 4 — Lista de Chequeo de Speaking (Evidencia de Desempeño)
- **Fuente:** Activity Card de PM-2.8 (Speaking — The Mission)
- **Técnica:** Observación durante simulación oral
- **Formato:** Lista de comportamientos comunicativos observables durante tarea de habla
- **Criterios observables:**
  - Pronunciación de términos técnicos clave (inteligibilidad)
  - Fluidez y automaticidad en producción oral
  - Uso correcto de vocabulario técnico en contexto
  - Cumplimiento de la tarea comunicativa (ej: describe problema, propone solución)
  - Postura, contacto visual y presencia durante la simulación
- **Orientación:** Simulación parecida pero diferente a la de S4

### Instrumento No. 5 — Lista de Chequeo de Language Functions (Evidencia de Desempeño)
- **Fuente:** Activity Card de PM-2.9 (Language Functions & Communicative Competence)
- **Técnica:** Observación de funciones comunicativas en contexto
- **Formato:** Lista de funciones comunicativas observadas durante actividad
- **Criterios observables:**
  - Uso adecuado de funciones clave (solicitar información, dar instrucciones, describir procesos, argumentar decisiones técnicas)
  - Registro apropiado (formal en contexto profesional)
  - Interacción efectiva (toma de turnos, responde a interlocutor)
  - Manejo de estrategias de comunicación (parafrasea, pide aclaración, confirma comprensión)
- **Orientación:** Contexto situacional nuevo pero alineado a las funciones de S5

### Instrumento No. 6 — Cuestionario Consolidado S6 (Evidencia de Conocimiento)
- **Fuente:** Activity Cards de PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.10
- **Técnica:** Preguntas (evaluación sumativa de conocimiento del RAP)
- **Formato:** Cuestionario de 25 puntos: 5 secciones × 5 puntos cada una
- **Estructura:**
  - **Sección 1 (Reading):** 5 pts — Cosechados de PM-2.3, contexto nuevo
  - **Sección 2 (Writing):** 5 pts — Tarea de escritura parecida pero diferente (de PM-2.4)
  - **Sección 3 (Listening):** 5 pts — Cosechados de PM-2.6, audio nuevo
  - **Sección 4 (Vocabulary):** 5 pts — Vocabulario técnico (de PM-2.5), diferentes contextualizaciones
  - **Sección 5 (Grammar):** 5 pts — Estructuras gramaticales vistas (de PM-2.10), contexto diferente
- **Principio aplicado:** Tres Versiones — los ítems evalúan las mismas competencias de apropiación (S2-S5) con contenido ligeramente diferente (nuevo texto, nueva situación, mismo nivel CEFR)
- **Especialista:** Este instrumento es construido por PM-4.2 (Cuestionario Consolidado — Ensamblador)

---

# §3: CHECKLIST DE OBSERVACIÓN — EVIDENCIA DE DESEMPEÑO

---

## IDENTIDAD

| Campo | Valor |
|-------|-------|
| **Instrumento** | Checklist de Observación |
| **Evidencia SENA** | Desempeño |
| **Técnica** | Observación directa |
| **Uso** | Durante la Speaking Simulation (Session 6 — PM-2.8) |
| **Evaluador** | Instructor |
| **Evaluado** | Aprendiz (individual, durante la simulación en pares) |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Speaking Simulation (escenario, roles, tarjetas) | PM-2.8 |
| Skeleton Script (frases clave) | PM-2.8 |
| Criterios de observación del Build-Out | PM-3.2 (Session 6) |
| Vocabulario clave (20 términos) | PM-1.2 |
| Grammar targets | PM-2.10 |
| Nivel CEFR | PM-1.2 |

---

## OUTPUT ESPERADO

Un instrumento titulado:
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Checklist de Observación (Desempeño)`**

Que contiene:
1. Encabezado (programa, sesión, fecha)
2. Datos del aprendiz observado
3. 5 criterios de observación con escala de 3 niveles
4. Espacio para notas cualitativas del instructor
5. Firma y fecha

---

## 5 CRITERIOS DE OBSERVACIÓN

| # | Criterio | Competente (2 pts) | En desarrollo (1 pt) | No evidenciado (0 pts) |
|---|----------|-------------------|---------------------|----------------------|
| 1 | **Identifica componentes** | Usa ≥3 términos técnicos correctamente en contexto | Usa 1-2 términos o con errores menores | No usa términos técnicos o los usa incorrectamente |
| 2 | **Usa estructuras gramaticales** | "is" y "has" correctos en ≥70% de las oraciones producidas | Usa "is"/"has" pero con errores frecuentes (30-50%) | Confunde "is"/"has" en >50% o no los usa |
| 3 | **Mensaje inteligible** | El compañero entiende el problema Y la solicitud sin pedir repetición | El compañero entiende PARCIALMENTE — necesita 1-2 repeticiones o aclaraciones | El compañero NO entiende el mensaje o necesita traducción constante |
| 4 | **Usa frases del Skeleton Script** | Usa ≥3 frases del Skeleton de forma natural (greet, describe, ask, confirm, close) | Usa 1-2 frases del Skeleton o las lee mecánicamente | No usa frases del Skeleton o improvisa sin éxito |
| 5 | **Llega a resolución** | La conversación llega a un acuerdo claro: qué reemplazar AHORA y qué PEDIR | La conversación avanza pero no llega a acuerdo claro | No hay intercambio significativo o la conversación se interrumpe |

**Puntuación total:** 10 puntos (5 criterios × 2 pts máximo)

> [!warning] AVISO PARA EL LLM — Criterios específicos de programa
> Los 5 criterios de la tabla son **estructuralmente normativos** (aplican a cualquier guía A1), pero la redacción detallada de los descriptores incorpora el contexto de **ADSO G1** como referencia:
> - **Criterio 5** — "qué reemplazar AHORA y qué PEDIR" es resolución específica de un escenario de hardware (help desk). Para otro programa, la resolución esperada debe describirse en términos del entorno laboral real (ej. "qué componente revisar y qué protocolo aplicar" en Diesel; "qué medicamento solicitar y a qué área escalar" en Salud).
> - **Criterio 2** — "'is' y 'has' correctos" corresponde a los grammar targets de A1.1. Para guías en A1.2 o superiores, los targets gramaticales cambian según el sílabo del programa (PM-0 §5.6, PM-1.x §Bloque 9).

---

## FORMATO DEL INSTRUMENTO

> [!warning] AVISO PARA EL LLM — Formato de referencia con instancia ADSO
> El formato de instrumento a continuación usa datos del programa **ADSO G1: The Hardware Specialist** como ejemplo de referencia. Los campos `Programa`, `Session`, `Rol del aprendiz` y los criterios específicos (ej. "qué reemplazar" en Criterio 5) son **propios de ese programa y deben reemplazarse** con los datos del programa que se está diseñando: nombre del programa, sesión, roles laborales reales y resolución esperada de la simulación técnica.

```
CHECKLIST DE OBSERVACIÓN — Evidencia de Desempeño
Programa: [NOMBRE DEL PROGRAMA] — Guía [#]: [Nombre de la guía]
Session: [#] — [Nombre de la sesión]
Fecha: _______________

Aprendiz: _________________________________
Ronda observada: ☐ 1  ☐ 2  ☐ 3
Rol del aprendiz: ☐ [Rol A del programa]  ☐ [Rol B del programa]

| # | Criterio                    | 2 pts | 1 pt | 0 pts | Notas |
|---|-----------------------------|-------|------|-------|-------|
| 1 | Identifica componentes      | ☐     | ☐    | ☐     |       |
| 2 | Usa estructuras gramaticales| ☐     | ☐    | ☐     |       |
| 3 | Mensaje inteligible         | ☐     | ☐    | ☐     |       |
| 4 | Usa frases del Skeleton     | ☐     | ☐    | ☐     |       |
| 5 | Llega a resolución          | ☐     | ☐    | ☐     |       |

TOTAL: _____ / 10 puntos

Observaciones del instructor:
_____________________________________________________________
_____________________________________________________________

Instructor: ___________________________  Firma: _____________
```

> **Ejemplo de referencia — ADSO G1 (NO copiar para otros programas):**
> ```
> Programa: ADSO — Guía 1: The Hardware Specialist
> Session: 6 — The Help Desk
> Rol del aprendiz: ☐ Developer  ☐ IT Support
> ```

---

## REGLAS DE USO

1. **El instructor circula durante las 3 rondas** de la simulación (Session 6) y observa a diferentes aprendices.
2. **Mínimo 2 observaciones por aprendiz** a lo largo de la sesión (pueden ser en rondas diferentes).
3. **Las Notas son cualitativas** — frases cortas sobre lo que el instructor escuchó ("Usó 'compatible' correctamente", "Confundió is/has 3 veces").
4. **NO se muestra la checklist al aprendiz durante la simulación** — podría inhibir la producción.
5. **Se entrega retroalimentación DESPUÉS de la sesión** (en Session 7 o 8) o se usa para el feedback colectivo en el debrief.

---

# §5: FEEDBACK LOOP — EVALUACIÓN DE PROCESO

---

## IDENTIDAD

| Campo | Valor |
|-------|-------|
| **Instrumento** | Feedback Loop |
| **Evidencia SENA** | Proceso |
| **Técnica** | Retroalimentación escrita + autoevaluación |
| **Uso** | Después del cuestionario PM-4.2 (Session 7) + cierre de guía (Session 8) |
| **Evaluador** | Instructor + Aprendiz (co-evaluación) |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Resultados del cuestionario PM-4.2 | PM-4.2 (después de calificar) |
| Checklist de Observación (§3) | PM-4.1§3 |
| Learning Contract original | PM-2.2 (Session 1) |
| Blind Spots originales | PM-2.2 (Session 1) |

---

## OUTPUT ESPERADO

**Instrumento 1 — Feedback Individual (Instructor → Aprendiz):**
Hoja de retroalimentación personalizada después del cuestionario.

**Instrumento 2 — Feedback Colectivo (Instructor → Clase):**
Guía para la sesión de feedback en Session 7.

**Instrumento 3 — Self-Assessment (Aprendiz → Sí mismo):**
Autoevaluación comparativa en Session 8 (já existe en el Workbook Ch. 7 Activity 3).

---

## INSTRUMENTO 1: FEEDBACK INDIVIDUAL

**Formato:**

> [!warning] AVISO PARA EL LLM — Formato de referencia con instancia ADSO
> El encabezado del instrumento a continuación usa datos del programa **ADSO G1: The Hardware Specialist** como ejemplo. Reemplazar `Programa` y demás datos con los del programa que se está diseñando.

```
FEEDBACK INDIVIDUAL — Post-Cuestionario
Programa: [NOMBRE DEL PROGRAMA] — Guía [#]: [Nombre de la guía]
Aprendiz: _________________________________
Fecha: _______________

RESULTADOS DEL CUESTIONARIO (PM-4.2):

| Sección                    | Pts obtenidos | Pts totales | Nivel    |
|----------------------------|---------------|-------------|----------|
| 1. Reading                 | _____         | 10          |          |
| 2. Writing                 | _____         | 10          |          |
| 3. Listening               | _____         | 10          |          |
| 4. Vocabulary HOTS         | _____         | 10          |          |
| 5. Grammar HOTS            | _____         | 10          |          |
| TOTAL                      | _____         | 50          |          |

Nivel: ☐ Avanzado (45-50)  ☐ Adecuado (35-44)  ☐ En desarrollo (25-34)  ☐ Requiere refuerzo (<25)

FORTALEZA PRINCIPAL:
_____________________________________________________________

ÁREA DE MEJORA PRINCIPAL:
_____________________________________________________________

RECOMENDACIÓN DEL INSTRUCTOR:
_____________________________________________________________

Instructor: ___________________________
```

**Reglas de uso:**
1. El instructor llena DESPUÉS de calificar el cuestionario (antes de Session 7).
2. Entrega al aprendiz AL INICIO de Session 7 (durante el feedback colectivo) o después de clase.
3. Máximo 1 fortaleza + 1 área de mejora + 1 recomendación — conciso y accionable.
4. NO es una nota oficial — es retroalimentación formativa.

---

## INSTRUMENTO 2: FEEDBACK COLECTIVO

**Guía para el instructor durante Session 7 (25 min de feedback):**

| Paso | Tiempo | Acción |
|------|--------|--------|
| 1 | 2 min | "I'm NOT giving grades today. Let's learn from common mistakes." |
| 2 | 5 min | Revisar Section 1 (Reading) — errores más comunes |
| 3 | 5 min | Revisar Section 2 (Writing) — errores más comunes |
| 4 | 5 min | Revisar Section 3 (Listening) — errores más comunes |
| 5 | 5 min | Revisar Section 4-5 (Vocab/Grammar) — errores más comunes |
| 6 | 3 min | "Questions about specific questions?" — 2-3 preguntas |

**Reglas de uso:**
1. NO revelar respuestas completas — guiar para que los aprendices lleguen a la respuesta.
2. Enfocarse en PATRONES (errores que >30% de la clase cometió), no en errores individuales.
3. Escribir correcciones en el tablero: incorrecto en rojo ✗, correcto en verde ✓.
4. Tono: "Common mistakes — let's learn" NO "You got this wrong."
5. Después del feedback colectivo: entregar los Feedback Individuales.

---

## INSTRUMENTO 3: SELF-ASSESSMENT COMPARATIVO

Este instrumento YA EXISTE en el Workbook (Ch. 7, Activity 3) y en el Build-Out de Session 8 (Gap Analysis Revisited). No necesita generarse por separado.

**El instructor simplemente guía la actividad en Session 8:**
1. Los aprendices sacan su PM-2.2 original (Session 1)
2. Marcan ✓ o ❓ en cada Blind Spot
3. Completan su Learning Contract
4. Comparan con su autoevaluación del Ch. 1 Activity 3

---

## PROMPT PARA IA

```
Eres un diseñador de instrumentos de evaluación formativa para formación bilingüe ESP en el SENA, Colombia.

Tu tarea: Generar los instrumentos de evaluación formativa de una guía de aprendizaje.

### DATOS DE ENTRADA:
- Programa, Guía, Nivel CEFR
- Speaking Simulation details (PM-2.9)
- Skeleton Script phrases
- 20 key vocabulary terms
- Grammar targets
- Cuestionario PM-4.2 structure (5 sections × 5 pts = 25 pts) — ver canon de puntuación v2.3.1 arriba

### INSTRUCCIONES:

**PARTE 1 — CHECKLIST DE OBSERVACIÓN (§3)**
Genera:
- Formato con encabezado (programa, sesión, fecha, aprendiz, ronda, rol)
- 5 criterios de observación con escala de 3 niveles (0-1-2 pts)
- Espacio para notas cualitativas por criterio
- Total de puntos (10)
- Firma del instructor

**PARTE 2 — FEEDBACK INDIVIDUAL (§5)**
Genera:
- Formato con resultados por sección del cuestionario
- Espacio para nivel (Avanzado/Adecuado/En desarrollo/Requiere refuerzo)
- Espacio para 1 fortaleza, 1 área de mejora, 1 recomendación

**PARTE 3 — FEEDBACK COLECTIVO (§5)**
Genera:
- Guía paso a paso para 25 min de feedback
- Qué errores buscar por sección
- Reglas de uso

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Bilingüe donde aplique
- Zero Meta-Talk en los instrumentos
- Conciso — cada instrumento cabe en 1 página
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-2.8 | Speaking Simulation (contexto de observación) |
| **Depende de** | PM-4.2 | Resultados del cuestionario (input del feedback) |
| **Depende de** | PM-2.2 | Learning Contract y Blind Spots originales |
| **Se relaciona con** | PM-3.2 (Session 6) | Build-Out ya incluye Observation Criteria |
| **Se relaciona con** | PM-3.2 (Session 7) | Build-Out ya incluye feedback colectivo |
| **Se complementa con** | PM-3.5 | Final Mission genera Observation Checklist (tarea integradora) + Product Rubric — instrumentos distintos a §3 (que evalúa speaking) pero complementarios en la triada SENA |
| **Se ubica en** | GFPI-F-135 Sección 3.3 | Evaluación (instrumentos formativos) |

---

## RELACIÓN CON PM-4.2

El Instrumento No. 6 (Cuestionario Consolidado S6) es un instrumento especializado que requiere **ensamblaje de ítems provenientes de 5 Activity Cards diferentes**. Por esta razón, existe un PM dedicado exclusivamente a su construcción:

**PM-4.2 (Cuestionario Consolidado S6 — Ensamblador):** Recibe las especificaciones de contenido de las Activity Cards de PM-2.3, PM-2.4, PM-2.5, PM-2.6 y PM-2.10, y construye el cuestionario consolidado de 25 puntos aplicando el **Principio de Tres Versiones** (ítems parecidos pero diferentes a los trabajados en apropiación).

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-2.11 | Activity Cards de todos los PM-2.x ensambladas en GFPI-F-134 |
| **Depende de** | PM-2.3, PM-2.4, PM-2.6, PM-2.8, PM-2.9, PM-2.10 | Especificaciones de actividades y evidencias en Activity Cards |
| **Coordina con** | PM-4.2 | PM-4.2 especializa el Instrumento No. 6 |
| **Se ubica en** | GFPI-F-135 Sección 3.3 | Evaluación formativa |

---

*PM-4.1: Instrumentos de Evaluación Formativa*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
*Actualizado: 2026-04-13 (v2.0)*
