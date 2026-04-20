# PM-3.6: GFPI-F-135 INTEGRATOR

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.6 |
| **Nombre** | GFPI-F-135 Learning Guide Generator |
| **Versión** | 2.6 |
| **Last Verified** | 2026-04-20 |
| **Ubicación** | Fase 4, posterior a PM-3.2 (Playbook Build-Out completo) |
| **Output** | Documento GFPI-F-135 V02 — Guía de Aprendizaje del Aprendiz (redactada en 2ª persona) |
| **Rol en el sistema** | Transforma el Playbook del Instructor (PM-3.2) en la Guía del Aprendiz (GFPI-F-135) |
| **Phase** | 4 |
| **Depends On** | [PM-3.2, PM-2.11] |
| **Trigger** | post_playbook_confirmation |

---

## CAMBIO v2.0 — NUEVA NATURALEZA DE PM-3.6

> [!info] Cambio v2.0 (2026-04-13)
> En v1.x, PM-3.6 integraba los outputs de PM-2.x (worksheets) en la Guía GFPI-F-135.
> 
> En v2.0, PM-3.6 opera de forma diferente:
> - **Input:** Playbook Build-Out completo (PM-3.2) + fila GFPI-F-134 ensamblada (PM-2.11)
> - **Proceso:** Transforma el lenguaje del instructor (Playbook) al lenguaje del aprendiz — reescribe las actividades pedagógicamente diseñadas como instrucciones directas para el estudiante.
> - **Output:** La Guía de Aprendizaje GFPI-F-135 completa, redactada en segunda persona para el aprendiz.
> 
> El Playbook es la fuente de verdad. La Guía es su proyección hacia el aprendiz.

---

## QUÉ HACE ESTE PROMPT

PM-3.6 **genera contenido nuevo** transformando el Playbook del Instructor en la Guía del Aprendiz. No ensambla solo — **reescribe** las actividades de lenguaje pedagógico (instrucción del profesor) a lenguaje del estudiante (instrucciones para el aprendiz).

**Input:** Playbook Build-Out completo (PM-3.2) + Fila GFPI-F-134 ensamblada (PM-2.11)
**Proceso:** Transformación de lenguaje: instructor → aprendiz
**Output:** GFPI-F-135 V02 completo, redactado en segunda persona, nivel CEFR, tono motivador

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| **Playbook Build-Out completo (todas las sesiones)** | **PM-3.2** |
| **Fila GFPI-F-134 ensamblada (desde PM-2.11)** | **PM-2.11** |
| Scope & Sequence (nivel CEFR, vocabulario, universo narrativo) | PM-1.2 |
| Data Contract GFPI-F-135 | Referencia (GFPI-F-135 — Data Contract.md) |
| Datos institucionales | Instructor |

---

## REGLAS DE DISEÑO

### REGLA 1 — TRANSFORMACIÓN DE LENGUAJE (INSTRUCTOR → APRENDIZ)
PM-3.6 NO simplemente ensambla. **Reescribe** cada actividad del Playbook del Instructor en lenguaje directo al aprendiz:
- Instructor (Playbook): *"Haz que los aprendices analicen la estructura del texto usando SQ3R..."*
- Aprendiz (Guía): *"Analyze the text structure using SQ3R. Follow these steps: 1) Survey... 2) Question... 3) Read..."*

El tono cambia de pedagógico a operativo. Las instrucciones van directas al estudiante.

### REGLA 2 — RESPETO AL NIVEL CEFR
Toda instrucción y texto de la Guía respeta el nivel CEFR declarado. El lenguaje es accesible al aprendiz.
- Vocabulario: solo términos ya enseñados en la Guía
- Sintaxis: estructuras aprendidas
- Extensión: instrucciones concisas (máximo 3 oraciones por actividad)
- Apoyo bilingüe: españ solo para supervivencia si nivel ≤ A1.1

### REGLA 3 — ECONOMÍA DE LENGUAJE
Aplicar "Economía" (Data Contract GFPI-F-134):
- Estructura: Verbo + Objeto + Condición
- Máximo 120 caracteres por instrucción de actividad
- Cero explicaciones teóricas
- Cada palabra cuenta

### REGLA 4 — INTEGRACIÓN CON PLAYBOOK Y F-134
Las evidencias (sección 4 de GFPI-F-135) se extraen de la fila F-134 (columna 8). Las actividades (sección 3) se derivan de las sesiones del Playbook Build-Out.

### REGLA 5 — ESTRUCTURA GFPI-F-135 V02
El documento final tiene:
- Sección 1: Identificación (programa, guía, nivel, intensidad)
- Sección 2: Presentación (qué aprenderás, para qué)
- Sección 3: Actividades de Aprendizaje (3.1 Reflexión, 3.2 Contextualización, 3.3 Apropiación, 3.4 Transferencia)
- Sección 4: Evidencias (las 6 obligatorias del RAP, derivadas de F-134)
- Sección 5: Glosario (20 términos clave)
- Sección 6: Referencias Bibliográficas
- Sección 7: Control del Documento
- Sección 8: Control de Cambios

### REGLA 6 — VERIFICACIÓN DE COHERENCIA
Antes de entregar, verifica:
- ¿Cada actividad tiene instrucción clara en 2ª persona?
- ¿Las evidencias se mencionan dentro de las actividades donde se generan?
- ¿El glosario contiene todos los términos usados?
- ¿El nivel CEFR es consistente?
- ¿Las referencias al Playbook son coherentes?

### REGLA 7 — ETIQUETAS DE DIMENSIÓN DE APRENDIZAJE

> [!warning] AVISO PARA EL LLM — Etiquetas de dimensión
> Cada actividad de aprendizaje ya existe en el Playbook. **No crear actividades nuevas.** Solo etiquetar las existentes con su(s) dimensión(es).

Cada actividad debe llevar la etiqueta de la(s) dimensión(es) que moviliza. Las actividades del pipeline ya están bien diseñadas — solo se agrega la etiqueta como marcador explícito:

| Dimensión | Etiqueta | Verbos típicos | Cuándo aplicar |
|-----------|----------|----------------|----------------|
| **COGNITIVA (Saber)** | `[COGNITIVA]` | identificar, clasificar, recordar, comprender, analizar, relacionar | Cuando el aprendiz apropia teorías, conceptos, hechos o principios |
| **PROCEDIMENTAL (Hacer)** | `[PROCEDIMENTAL]` | construir, ejecutar, reparar, operar, redactar, completar, organizar | Cuando el aprendiz ejecuta una tarea práctica paso a paso |
| **ACTITUDINAL (Ser)** | `[ACTITUDINAL]` | valorar, analizar consecuencias, reflexionar, argumentar, asumir | Cuando el aprendiz reflexiona sobre comportamiento, ética, responsabilidad |

**Reglas de etiquetado:**
- Una actividad puede tener 1, 2 o las 3 dimensiones — depende de lo que moviliza, no del formato.
- La etiqueta va ANTES de la instrucción de la actividad.
- No inventar dimensiones ni cambiar la actividad para "completar las tres" — etiquetar lo que genuinamente hace la actividad.
- Una misma actividad puede llevar múltiples etiquetas si moviliza varias dimensiones simultáneamente.

**Ejemplo de actividad etiquetada:**
```
[COGNITIVA] Classify the 20 Toolbelt terms into the five workshop categories using the Word Wall.
[PROCEDIMENTAL] Build your Word Wall by placing each card in its category following the instructor's model.
[ACTITUDINAL] Reflect on why precise technical vocabulary in English matters for safe communication in the diesel workshop.
```

### REGLA 8 — ESPECIFICACIÓN DEL ENTREGABLE

Toda actividad que genere una evidencia formal (E1–E6 o Final Mission) debe cerrar con un bloque de entregable explícito. No todas las actividades generan evidencia — solo las que están marcadas en el mapa de evidencias del RAP.

**Estructura del bloque de entregable:**
```
📋 EVIDENCIA [n] — [Nombre de la evidencia]
• Producto a entregar: [descripción concisa del artefacto]
• Formato: [PDF / DOCX / Audio / Video / Físico-observable]
• Extensión o criterio mínimo: [páginas / duración / número de ítems / criterio observable]
• Entrega: [LMS / instructor / físico en clase / otro]
```

**Principio de alcance:** No todas las actividades tienen entregable. Una secuencia de actividades puede culminar en una sola evidencia. El bloque aparece solo cuando hay evidencia formal — no en actividades de práctica, drills, reflexión interna o plenarias.

### REGLA 9 — AUTOSUFICIENCIA DE LA GUÍA (Recursos embebidos)

> [!warning] REGLA CRÍTICA — La guía es autosuficiente
> El aprendiz NO debe ir a ningún otro documento para completar ninguna actividad de la guía.

Todo material necesario para ejecutar cada actividad debe estar embebido directamente en la guía:
- **Textos de lectura:** El artículo o texto completo, no solo referencia a él.
- **Worksheets y tablas:** Reproducidos completos, listos para completar.
- **Scripts de audio/listening:** Transcritos en la sección de la actividad correspondiente.
- **Role cards y tarjetas de función:** Incluidas completas con todo su contenido.
- **Ejercicios de gramática:** Enunciados completos con espacios o instrucciones.
- **Rúbricas y checklists de auto-evaluación:** Reproducidos para que el aprendiz los use.
- **Glosario de supervivencia por sesión:** Los términos clave de esa sesión, accesibles sin saltar a otra sección.

**Excepción permitida:** Referencias a recursos audiovisuales externos (videos, audios) se mencionan con URL + descripción + versión transcrita o resumen en la guía. El aprendiz siempre tiene el contenido alternativo si el recurso no está disponible.

---

## EXTENSIÓN v2.6 — CANON PROMOVIDO DESDE MGV-2026-04-20

> [!warning] CANON v2.6 — Tres requisitos adicionales mandatorios
> Desde v2.6, toda guía generada por PM-3.6 DEBE cumplir las reglas 10, 11 y 12. Estas fueron iteradas en el run MGV G1 y promovidas a canon para evitar repetir la iteración en futuros programas.

### REGLA 10 — `activity_footer` OBLIGATORIO EN §3 ACTIVIDADES

Cada actividad de §3 (3.1 Reflexión, 3.2 Contextualización, 3.3 Apropiación S2–S5, 3.4 Transferencia) DEBE cerrar con un bloque `activity_footer` de 6 campos canónicos:

```json
{
  "activity_footer": {
    "ambiente": "<descripción operacional del espacio>",
    "estrategia": "<ABP | ABT | Simulación | Evaluación Formativa>",
    "tecnica": "<técnica didáctica específica>",
    "materiales": ["<insumo 1>", "<insumo 2>", "..."],
    "material_apoyo": "<Canva Deck slide # | Workbook §# | audio | rubric>",
    "duracion_horas": <decimal>
  }
}
```

**Render canónico (DOCX):** tabla de 6 filas con barra naranja izquierda (hex `#F59316`), posicionada inmediatamente después del bloque de instrucciones de la actividad y antes de cualquier apéndice referenciado.

**Script canónico:** `enrich_activity_footers.js` — lee `pm-3-6.json`, valida presencia de `activity_footer` en cada `actividades[*]`, enriquece defaults desde `pm-3-1.json.logistics_box` si faltan, y emite `pm-3-6-enriched.json`.

### REGLA 11 — `apendices_embebidos[*].contenido_inline` OBLIGATORIO (7 TIPOS CANÓNICOS)

Todo apéndice referenciado en §3 DEBE tener su `contenido_inline` poblado con uno de los 7 tipos canónicos (dispatchers en el renderer). **No se permiten apéndices con solo `titulo + ubicacion_seccion`** — deben incluir el contenido renderizable inline.

**Tipos canónicos del schema `contenido_inline.tipo`:**

| # | Tipo | Contenido | Usado en |
|---|------|-----------|----------|
| 1 | `reading_text` | Texto completo de lectura + glossary inline | S2 Reading Master Anchor |
| 2 | `writing_model` | Modelo del formulario/producto a escribir | S3 Writing Task |
| 3 | `audio_script` | Transcripción completa del diálogo de listening | S4 Listening TBLT |
| 4 | `word_wall` | Tabla de categorías × términos (matriz vocabulario) | S2 Vocabulary Scaffold |
| 5 | `mission_brief` | Escenario + roles + briefing + deliverable + rules | S6½–S8 Final Mission |
| 6 | `planning_template` | Plantilla estructurada con campos a completar | Sub-fase Plan de Final Mission |
| 7 | `self_assessment` | Rúbrica/checklist de auto-evaluación del aprendiz | S8 Sub-fase Assess |

**Schema:**
```json
{
  "apendices_embebidos": [
    {
      "id": "APX-01",
      "titulo": "Reading Master Anchor — The Workshop Specialist",
      "ubicacion_seccion": "3.3.S2",
      "contenido_inline": {
        "tipo": "reading_text",
        "data": { /* estructura específica al tipo */ }
      }
    }
  ]
}
```

**Script canónico:** `embed_apendices.js` — valida que cada apéndice tiene `contenido_inline.tipo` válido + `data` no vacío; emite warning si encuentra apéndice con solo referencia.

**Renderer canónico:** `renderInlineAppendix(apendice)` en `gen_35_36_docx.js` — dispatcher que enruta al helper específico según `tipo` (7 helpers: `renderReadingText`, `renderWritingModel`, `renderAudioScript`, `renderWordWall`, `renderMissionBrief`, `renderPlanningTemplate`, `renderSelfAssessment`).

### REGLA 12 — `apendices_referenciados` CON DOBLE RENDER

Cada actividad que usa apéndices DEBE declarar `apendices_referenciados` (array de IDs). El renderer produce doble ubicación del apéndice:

1. **Render inline (primario):** El contenido completo del apéndice se inserta ANTES del `activity_footer` de la actividad que lo referencia. El aprendiz encuentra el material al ejecutar la actividad sin saltar de página.
2. **Render índice (secundario):** Al final de la guía, una sección "Apéndices Consolidados" lista todos los apéndices con su ID, título y ubicación de uso (retrievable reference).

**Schema:**
```json
{
  "actividades": [
    {
      "id": "ACT-S2-01",
      "instruccion": "Read the Master Anchor text and identify the 5 workshop categories.",
      "apendices_referenciados": ["APX-01", "APX-02"],
      "activity_footer": { /* 6 campos */ }
    }
  ]
}
```

**Helper renderer canónico:** `activityFooter(actividad)` en `gen_35_36_docx.js` — renderiza en orden: (a) `instruccion`, (b) `[COGNITIVA/PROCEDIMENTAL/ACTITUDINAL]` label, (c) bloque de entregable si aplica (REGLA 8), (d) inline-render de cada apéndice en `apendices_referenciados` vía `renderInlineAppendix()`, (e) `activity_footer` tabla 6 campos.

**Índice final:** Sección automática "Apéndices Consolidados" que lista `APX-01`, `APX-02`, ..., `APX-N` con tabla de 3 columnas (ID, Título, Ubicación de uso — hipervínculo al §3.x.S# donde se rendereó inline).

### Reglas duras v2.6 (resumen integrado)

| # | Regla | Scope | Validada por |
|---|-------|-------|--------------|
| 10 | `activity_footer` 6 campos poblados (sin `null`) | Cada `actividades[*]` en §3 | PM-2.11 Check 15 (nuevo) |
| 11 | `contenido_inline.tipo` ∈ {7 tipos canónicos} + `data` no vacío | Cada `apendices_embebidos[*]` | PM-2.11 Check 15 |
| 12 | Doble render: inline antes de `activity_footer` + índice al final | Renderer DOCX | Test visual smoke test |

### Scripts canónicos del pipeline v2.6

| Script | Función | Input | Output |
|--------|---------|-------|--------|
| `enrich_activity_footers.js` | Pobla `activity_footer` en cada actividad | `pm-3-6.json` | `pm-3-6-enriched.json` |
| `embed_apendices.js` | Valida y enriquece `apendices_embebidos[*].contenido_inline` | `pm-3-6-enriched.json` | `pm-3-6-final.json` |
| `gen_35_36_docx.js` | Renderer DOCX con helpers `renderInlineAppendix()` + `activityFooter()` | `pm-3-6-final.json` | `pm-3-6.docx` |

### Consecuencia arquitectónica v2.6

La Guía del Aprendiz (GFPI-F-135) emitida por PM-3.6 ahora tiene **paridad operativa total** con el Instructor's Playbook (PM-3.2): mismo bloque `activity_footer` visible, mismo contenido de apéndice inline, misma coherencia entre qué ve el instructor y qué ejecuta el aprendiz. Se eliminan los documentos fantasma (actividad referencia apéndice que no existe) y los saltos de navegación (aprendiz tiene que buscar el texto de lectura en otra sección).

---

## FORMATO DE SALIDA

**Documento único: GFPI-F-135 V02** (Guía del Aprendiz)

```
PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL
FORMATO GUÍA DE APRENDIZAJE
GFPI-F-135 V02

English Learning Guide #[n]: [Nombre de la Guía]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
[Programa, código, nivel CEFR, intensidad, duración]

2. PRESENTACIÓN
[Qué aprenderás en esta guía, por qué, para qué contexto laboral]

3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE
  3.1. Actividades de Reflexión Inicial (S1)
  [Reescrito en 2ª persona desde PM-2.1]
  
  3.2. Actividades de Contextualización (S1)
  [Reescrito en 2ª persona desde PM-2.2]
  
  3.3. Actividades de Apropiación (S2-S5)
  [Reescrito en 2ª persona desde PM-2.3 a PM-2.10, organizadas por sesión]
  [Cada actividad menciona cuándo genera evidencia]
  
  3.4. Actividades de Transferencia (S6-S8)
  [Reescrito en 2ª persona desde PM-3.5: Final Mission]
  [Explica roles, deliverables, criterios de éxito]

4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE
[Las 6 evidencias formales de la fila F-134, descritas en lenguaje del aprendiz]
[Especifica: qué es cada evidencia, cuándo se genera, cómo se evalúa]

5. GLOSARIO DE TÉRMINOS (KEY VOCABULARY)
[20 términos clave con definiciones simples en inglés + imagen/ejemplo]

6. REFERENTES BIBLIOGRÁFICOS
[Historias curadas, recursos, artículos sugeridos por tema]

7. CONTROL DEL DOCUMENTO
| Nombre | Cargo | Dependencia | Fecha |
|--------|-------|-------------|-------|
| [instructor] | INSTRUCTOR | [SENA centro] | [fecha] |

8. CONTROL DE CAMBIOS
| Nombre | Cargo | Dependencia | Fecha | Razón |
|--------|-------|-------------|-------|-------|
| (vacío — primera versión) | | | | |
```

---

## PROMPT PARA IA

```
ACTÚA COMO: Learning Guide Author & Instructional Translator. Tu tarea: generar el GFPI-F-135 V02 — la Guía de Aprendizaje del Aprendiz — transformando el Playbook del Instructor (PM-3.2) al lenguaje directo del estudiante.

Tu trabajo es REESCRIBIR, NO ENSAMBLAR.

### DATOS DE ENTRADA:
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Nivel CEFR: [default A1.1-A1.2]
- Instructor: [nombre, cargo, centro SENA]
- Fecha: [fecha de generación]
- **Playbook Build-Out completo:** [PEGAR AQUÍ todas las sesiones de PM-3.2]
- **Fila GFPI-F-134 ensamblada:** [PEGAR AQUÍ la fila completa de PM-2.11]
- Scope & Sequence (PM-1.2): [PEGAR datos de nivel, vocabulario, universo narrativo]

### INSTRUCCIONES:

**PASO 1 — TRANSFORMACIÓN DE LENGUAJE:**
Lee cada sesión del Playbook Build-Out (PM-3.2) y reescribe las instrucciones del instructor como instrucciones DIRECTAS para el aprendiz:

Instructor (Playbook): *"Instructor explica que van a escuchar un audio. Pide que los aprendices escriban palabras clave mientras escuchan."*
Aprendiz (Guía): *"Listen to the phone call. Write down 5 key words you hear. You have 3 minutes."*

**PASO 2 — REDACCIÓN DE SECCIONES:**
1. **Sección 1:** Datos del programa y la guía
2. **Sección 2:** Presentación — qué aprendes, por qué, aplicación laboral
3. **Sección 3.1:** Actividades de Reflexión (S1) — reescrito en 2ª persona
4. **Sección 3.2:** Actividades de Contextualización (S1) — reescrito en 2ª persona
5. **Sección 3.3:** Actividades de Apropiación (S2-S5) — organizadas por sesión, reescritas en 2ª persona. **Menciona dónde genera evidencia.**
6. **Sección 3.4:** Actividades de Transferencia (S6-S8) — la Final Mission reescrita en 2ª persona
7. **Sección 4:** Evidencias — las 6 evidencias de F-134 descritas para el aprendiz (qué es, cuándo se genera, cómo se evalúa)
8. **Sección 5:** Glosario — 20 términos clave con definición simple + ejemplo
9. **Sección 6:** Referencias Bibliográficas — recursos sugeridos
10. **Sección 7:** Control del Documento
11. **Sección 8:** Control de Cambios (vacío)

**PASO 3 — ETIQUETAR DIMENSIONES:**
Por cada actividad, añadir la etiqueta de dimensión antes de la instrucción:
- `[COGNITIVA]` si apropia conceptos, clasifica, analiza o comprende
- `[PROCEDIMENTAL]` si ejecuta, construye, completa o produce algo tangible
- `[ACTITUDINAL]` si reflexiona, valora o argumenta sobre comportamiento/responsabilidad
- Una actividad puede llevar 1, 2 o 3 etiquetas. No inventar dimensiones — solo etiquetar lo que genuinamente hace la actividad.

**PASO 4 — AGREGAR BLOQUE DE ENTREGABLE (solo donde hay evidencia formal):**
Cuando una actividad o secuencia de actividades genera una evidencia E1–E6 o Final Mission, cerrar con:
```
📋 EVIDENCIA [n] — [Nombre]
• Producto a entregar: [artefacto]
• Formato: [PDF / Audio / Video / Físico-observable]
• Extensión o criterio mínimo: [páginas / duración / ítems]
• Entrega: [LMS / instructor / en clase]
```
NO agregar bloque en actividades de práctica, drills o reflexión sin evidencia formal.

**PASO 5 — APLICAR ECONOMÍA Y AUTOSUFICIENCIA:**
- Estructura: Verbo + Objeto + Condición
- Nivel CEFR: vocabulario y sintaxis accesible
- Cero teoría — solo operativo
- **CRÍTICO: Embeber todos los materiales.** El aprendiz NO va a otro documento. Incluir completos: textos de lectura, worksheets, scripts de audio, role cards, tablas, ejercicios, rúbricas de autoevaluación.

**PASO 6 — VERIFICACIÓN FINAL:**
- ¿Cada actividad tiene instrucción clara en 2ª persona?
- ¿Cada actividad tiene etiqueta de dimensión [COGNITIVA/PROCEDIMENTAL/ACTITUDINAL]?
- ¿Las evidencias formales tienen bloque de entregable (Producto/Formato/Criterio)?
- ¿Todos los materiales están embebidos (sin referencias a documentos externos)?
- ¿Las evidencias se mencionan donde se generan?
- ¿El glosario cubre todos los términos?
- ¿El nivel CEFR es consistente?

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil).
- Nivel CEFR estricto A1.1-A1.2
- Lenguaje: 2ª persona singular/plural según contexto ("You will...", "You are going to...")
- Bilingüe: instrucciones en inglés, traducción en español solo para palabras clave si nivel ≤ A1.1
- Mantener formato markdown consistente
- NO generéis explicaciones teóricas — solo instrucciones operativas
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-3.2 | Playbook Build-Out — fuente principal (lenguaje a transformar) |
| **Recibe input de** | PM-2.11 | Fila GFPI-F-134 ensamblada — evidencias y actividades |
| **Recibe input de** | PM-1.2 | Scope & Sequence, nivel CEFR, vocabulario, universo narrativo |
| **Recibe input de** | PM-4.1 + PM-4.2 | Especificaciones de evidencias (sección 4) |
| **Referencia** | GFPI-F-135 Data Contract | Formato de secciones y estructura oficial |
| **Alimenta** | SIGA / Documento institucional | Documento final listo para entrega al aprendiz |
| **Se ubica en** | Flujo operativo SENA | Fase 4 — Primer entregable derivado del Playbook |

---

*PM-3.6: GFPI-F-135 Integrator — v2.6*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026 · v2.6 promovido 2026-04-20 (MGV)*
