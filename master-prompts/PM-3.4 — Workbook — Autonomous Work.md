# PM-3.4: WORKBOOK — AUTONOMOUS WORK
## Fase 3 · Ejecución | Sistema de Prompts Maestros — LG Factory
## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.4 |
| **Nombre** | Workbook — Autonomous Work |
| **Fase** | 3. Ejecución |
| **Destinatario** | Aprendiz (documento para el estudiante) + Instructor (Answer Key separado) |
| **Función** | Generar los capítulos del Workbook que el aprendiz completa como trabajo autónomo entre sesiones presenciales |
| **Analogía** | Es el "gimnasio" de la guía — donde el aprendiz practica solo lo que vio en clase |
| **Volumen** | Un capítulo por sesión presencial que asigna trabajo autónomo (default: 7 capítulos para 8 sesiones) |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Mapa de trabajo autónomo (qué capítulo va después de qué sesión) | PM-3.1 (Playbook Outline) |
| Asignaciones detalladas por capítulo (qué hacer, cuánto tiempo) | PM-3.2 (Build-Out, sección WRAP-UP) |
| Contenido de los worksheets que el autónomo refuerza | PM-2.3 a PM-2.10 (Producción Fase 2) |
| **Arquetipos elegidos en Fase 2** | **PM-2.3 a PM-2.10 — los mismos arquetipos alimentan Guía + Workbook + Examen** |
| Texto ancla de Reading (para actividades de extensión) | PM-2.3 |
| Vocabulario clave (20 términos) | PM-1.2 |
| Grammar targets | PM-2.10 |
| Nivel CEFR | PM-1.2 |

> **NOTA:** Los PM-2.3 a PM-2.10 tienen TRIPLE PROPÓSITO. Los arquetipos que el instructor elige en Fase 2 no solo construyen la Guía de Aprendizaje — también alimentan el Workbook (REINFORCE/EXTEND/PREPARE) y el examen escrito. Un solo conjunto de arquetipos genera los 3 productos del estudiante.

---

## OUTPUT ESPERADO

**Documento 1 — Workbook (Aprendiz):**
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Workbook`**

Contiene 7 capítulos, cada uno con:
1. Encabezado (número de capítulo, título, sesión asociada, tiempo estimado)
2. Instrucciones claras en inglés con soporte bilingüe
3. Espacios para escribir/dibujar
4. Actividades con andamiaje integrado

**Documento 2 — Workbook Answer Key (Instructor):**
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Workbook Answer Key`**

Contiene respuestas para cada capítulo:
- Respuestas correctas donde aplique
- Criterios de evaluación para tareas abiertas
- Rúbricas simplificadas

---

## 10 REGLAS DE DISEÑO

### REGLA 1 — UN CAPÍTULO POR SESIÓN QUE ASIGNA TRABAJO
Cada sesión presencial que tiene trabajo autónomo genera un capítulo. Si una sesión no asigna trabajo (ej. Session 8), no hay capítulo.

**Default:** 7 capítulos (Ch. 1-7) para una guía de 8 sesiones.

### REGLA 2 — FORMATO WORKSHEET, NO EXAMEN
El Workbook es práctica guiada, NO evaluación. El tono es:
- ✅ *"Try this. Check your answers. Learn from mistakes."*
- ❌ *"Answer correctly or lose points."*

No hay nota, no hay puntaje. El aprendiz trabaja para entender, no para aprobar.

### REGLA 3 — BILINGÜE CON INSTRUCCIONES EN INGLÉS
Las instrucciones de cada actividad están en inglés (para exposición auténtica), con apoyo en español entre paréntesis SOLO para:
- Las directivas clave (qué hacer exactamente)
- Las palabras de supervivencia que no se han visto en la guía

Ejemplo:
> *"Write 3 sentences about your computer. / (Escribe 3 oraciones sobre tu computador.)"*

### REGLA 4 — SCAFFOLDING INTEGRADO
Cada actividad incluye andamiaje que el aprendiz puede usar:
- Sentence starters: *"The _______ is _______."*
- Word banks donde aplique
- Modelos de ejemplo
- Formulas de referencia

El scaffolding NO da la respuesta — guía el proceso.

### REGLA 5 — TIEMPO ESTIMADO POR CAPÍTULO
Cada capítulo indica el tiempo estimado de trabajo (30-60 min). La suma de todos los capítulos debe ser ≈6 horas (intensidad autónoma default).

### REGLA 6 — VINCULACIÓN EXPLÍCITA CON LA SESIÓN
Cada capítulo referencia la sesión presencial a la que está vinculado:
- "Assigned after Session X"
- "We will review this in Session X+1"

Esto crea la cadena de coherencia: clase → tarea → revisión en clase siguiente.

### REGLA 7 — ACTIVIDADES VARIADAS
Los capítulos NO son todos "fill in the blank." Variedad de tipos:
- Dibujo/etiquetado (Ch. 1)
- Lectura + subrayado (Ch. 2)
- Categorización + escritura (Ch. 3)
- Drill gramatical (Ch. 4)
- Escritura libre con revisión (Ch. 5)
- Reflexión metacognitiva (Ch. 6)
- Corrección de errores (Ch. 7)

### REGLA 8 — ANSWER KEY SEPARADO
Las respuestas NUNCA aparecen en el documento del aprendiz. Van en un documento separado para el instructor. El instructor usa el Answer Key para:
- Revisar rápidamente en la sesión siguiente
- Identificar patrones de error
- Dar feedback colectivo

### REGLA 9 — ESPACIO PARA ESCRIBIR/RESPONDER
Cada actividad tiene espacio designado para respuestas:
- Líneas para escribir (_______________)
- Cajas para clasificar
- Espacio amplio para párrafos
- Espacio para dibujar (si aplica)

### REGLA 10 — ZERO META-TALK
El output del Workbook es LISTO PARA USAR por el aprendiz. No incluye:
- ❌ Justificaciones pedagógicas
- ❌ Notas sobre por qué se diseñó así
- ❌ Referencias a marcos teóricos

Las justificaciones viven en PM-3.4 (este documento). El output es operativo.

---

## PROMPT PARA IA

```
Eres un diseñador de materiales didácticos para formación bilingüe ESP en el SENA, Colombia. Tu tarea: generar el WORKBOOK DE TRABAJO AUTÓNOMO — los capítulos que el aprendiz completa fuera del aula.

### DATOS DE ENTRADA (el instructor proporciona):

**Datos del programa:**
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Nivel CEFR: [default A1.1-A1.2]
- Intensidad autónoma: [default 6 horas]

**Mapa de trabajo autónomo (de PM-3.1):**
| Capítulo | Asignado en | Revisado en | Actividad | Tiempo |
|----------|-------------|-------------|-----------|--------|

**Contenido relevante de los worksheets (de PM-2.x):**
- Texto ancla de Reading (PM-2.3) — para actividades de extensión
- 20 términos clave (PM-1.2) — para categorización y práctica
- Grammar targets (PM-2.10) — para drills
- Writing model (PM-2.4) — para revisión guiada

### INSTRUCCIONES DE GENERACIÓN:

Para CADA capítulo genera:

#### CHAPTER [#]: [TÍTULO]
**Assigned after:** Session [#]
**We review this in:** Session [#]
**Estimated time:** [XX] minutes

**Instrucciones en inglés + español:**
[Actividades con instrucciones claras, bilingües, con scaffolding integrado]

**Espacios para respuestas:**
[Líneas, cajas, espacio para dibujar]

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Nivel CEFR estricto: no exceder el nivel de la guía
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Read the scenario (*Lee el escenario*). PROHIBIDO usar bloques repeditivos de 'Instrucciones'.
- Zero Meta-Talk: el output es el workbook listo para usar
- Scaffolding integrado: sentence starters, word banks, modelos
- Tiempo total ≈6 horas
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-3.1 | Mapa de trabajo autónomo (qué capítulo después de qué sesión) |
| **Depende de** | PM-3.2 | Asignaciones detalladas en cada WRAP-UP |
| **Depende de** | PM-2.3 | Texto ancla para actividades de extensión |
| **Depende de** | PM-1.2 | Vocabulario, grammar targets, nivel CEFR |
| **Alimenta a** | PM-3.2 (SET-UP) | El instructor revisa el Workbook en el SET-UP de la sesión siguiente |

---

*PM-3.4: Workbook — Autonomous Work*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
