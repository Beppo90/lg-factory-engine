# PM-2.2: THE GAP ANALYSIS & PRIOR KNOWLEDGE

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-2.2 |
| **Nombre** | The Gap Analysis (The Mirror) |
| **Subfase guía SENA** | 3.2 Actividades de contextualización |
| **Ubicación en la Guía** | Sección 3.2 Contextualización |
| **Tipo de Evidencia SENA** | N/A (actividad diagnóstica) |
| **Instrumento** | Learner's Worksheet |
| **Estructura** | THE MIRROR (Único Diagnóstico) |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Scope & Sequence (vocabulario, grammar targets, tema técnico, stories) | PM-1.2 |
| Nivel CEFR | PM-1.2 |

---

## EL DIAGNÓSTICO ÚNICO: THE MIRROR (SELF-ASSESSMENT)

Siguiendo el estándar y asegurando fluidez tras "The Narrative Scenario" (PM-2.1), esta actividad utiliza un diagnóstico reflexivo, honesto y personal ("The Mirror").

### ESTRUCTURA INTERNA:

```
🔍 THE DIAGNOSTIC TRIGGER
   Tabla de autoevaluación con 5-6 áreas de competencia
   relacionadas con el macrotema. Escala de 1-5.

📋 ACTIVITY 1 — WHAT I KNOW: Mi nivel actual
   Completa la escala para cada área:
   1 = I don't know anything / (No sé nada)
   3 = I know a little / (Sé un poco)
   5 = I'm confident / (Estoy seguro)

📋 ACTIVITY 2 — THE BLIND SPOTS: Mis áreas débiles
   Identifica las 3 áreas donde tienes menor nivel.
   Para cada una: "I need to learn ___ because ___."
   Usa las Survival Words si las necesitas.

📋 ACTIVITY 3 — THE LEARNING CONTRACT: Mis 3 prioridades
   "Las 3 cosas más importantes que quiero aprender:
   1)___ 2)___ 3)___
   Firmo mi compromiso de aprender estas cosas."
```

---

## FORMATO DE SALIDA ESTÁNDAR

```
WORKSHEET: THE GAP ANALYSIS — Contextualización
[Programa] | [Guía #] | [Macro-Temática] | Nivel A1

> 💬 BILINGUAL INSTRUCTION:
> [Mensaje motivacional en inglés simple] (*[español en cursiva]*)

🔍 THE MIRROR - Self-Assessment
[Tabla de evaluación o perfil con 5-6 items vinculados al tema técnico]

📋 ACTIVITY 1 — WHAT I KNOW
[Actividad de autoevaluación individual basada en la tabla]

📋 ACTIVITY 2 — THE BLIND SPOTS
[Identificación de áreas con puntaje más bajo]

📋 ACTIVITY 3 — THE LEARNING CONTRACT
[Contrato educativo que se revisará al final de la guía]

📝 LEARNING CONTRACT
Name: _______________  Signature: _______________  Date: _______________
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________
4. _________________________________________________
```

---

## PROMPT PARA IA

```
ACTÚA COMO: Self-Assessment Designer & ESP Competency Mapper. Creates honest self-evaluation tools that help learners see their own gaps without feeling judged. Your scales are clear, motivating, and actionable.

Tu tarea: Generar el WORKSHEET "THE GAP ANALYSIS" — Contextualización, implementando EXCLUSIVAMENTE el enfoque "The Mirror" (Self-Assessment) para continuar la fluidez diagnóstica de forma natural tras el escenario narrativo.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Tema técnico: [descripción]
- Vocabulario clave: [20 términos de PM-1.2]
- Grammar targets: [estructuras de PM-2.7]
- Nivel CEFR: [default A1.1-A1.2]

### INSTRUCCIONES DE GENERACIÓN:

1. Genera THE DIAGNOSTIC TRIGGER (The Mirror):
   - Tabla de autoevaluación con 5-6 áreas y escala de 1 a 5 enfocada en las destrezas específicas del módulo técnico delineado en The Spark.

2. Genera ACTIVITY 1 — WHAT I KNOW (saberes previos):
   - Instruye a completar y cuantificar la escala por área.

3. Genera ACTIVITY 2 — THE BLIND SPOTS (puntos ciegos):
   - Manda identificar las 3 áreas de competencia (skills o functions) con los puntajes más bajos.
   - Añade prompts: "I need to learn ___ because ___."

4. Genera ACTIVITY 3 — THE LEARNING CONTRACT (contrato):
   - Genera espacio de firma para las metas.
   - Agrega mención explícita a la revisión del "Learning Contract" que ocurrirá en el Assessment.

### RESTRICCIONES:
- Nivel CEFR estricto A1.1-A1.2
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Complete the scale (*Completa la escala*). PROHIBIDO usar bloques repetitivos de 'Instrucciones'.
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Zero Meta-Talk: output listo para imprimir
- Los blind spots deben ser verificables al final de la guía
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.2 | Vocabulario, grammar targets, tema técnico |
| **Alimenta a** | PM-2.3 | El Gap Analysis activa el interés para el Reading |
| **Se relaciona con** | PM-4.1§5 | Los Blind Spots originales se usan en el Feedback Loop |
| **Se ubica en** | GFPI-F-135 Sección 3.2 | Contextualización |

---

*PM-2.2: The Gap Analysis & Prior Knowledge*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
