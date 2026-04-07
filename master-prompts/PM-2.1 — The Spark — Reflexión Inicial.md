# PM-2.1: THE SPARK & PROBLEMATIC SITUATION

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-2.1 |
| **Nombre** | The Spark (The Narrative Scenario) |
| **Subfase guía SENA** | 3.1 Actividades de reflexión inicial |
| **Ubicación en la Guía** | Sección 3.1 Reflexión Inicial |
| **Tipo de Evidencia SENA** | N/A (actividad motivacional/diagnóstica) |
| **Instrumento** | Learner's Worksheet |
| **Estructura** | THE NARRATIVE SCENARIO (Único Detonante) |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Scope & Sequence (DNA, Content Core, vocabulario, stories) | PM-1.2 |
| Nombre del programa, guía, macro-temática | PM-1.2 |
| Tema técnico principal de la guía | PM-1.2 |
| Entendimientos perdurables | PM-1.2 |
| Stories auténticas curadas (Story A y Story B) | PM-1.2 |
| Nivel CEFR | PM-1.2 |

---

## EL DETONANTE ÚNICO: THE NARRATIVE SCENARIO

Siguiendo el estándar, PM-2.1 utiliza exclusivamente un "Narrative Detonator" para atrapar la atención. Este detonante usa la historia y el personaje generados en Story A y B para crear un problema realista, humano y técnico.

### ESTRUCTURA INTERNA:

```
🎬 THE SCENARIO (escenario urgente narrativo)
   Un personaje (ej. de Story A) enfrenta 
   una situación laboral real, técnica y problemática. El problema 
   requiere comunicación en inglés técnico para resolverse.

❓ THE STAKES (qué pasa si no se resuelve)
   Consecuencias reales del fallo: pérdida de datos, dinero,
   tiempo, reputación, seguridad.

📋 ACTIVITY 1 — EXPLORE: ¿Qué harías tú?
   El aprendiz piensa en su propia respuesta al escenario.
   Individual, reflexivo.

📋 ACTIVITY 2 — ENGAGE: El diagnóstico grupal
   En grupos, discuten qué saben y qué no saben para resolver
   el problema. Identifican los gaps.

📋 ACTIVITY 3 — DISCOVER: El puente técnico
   Qué necesitan aprender en esta guía para resolver problemas
   como este en inglés.
```

---

## FORMATO DE SALIDA ESTÁNDAR

```
WORKSHEET: THE SPARK — Reflexión Inicial
[Programa] | [Guía #] | [Macro-Temática] | Nivel A1

> 💬 BILINGUAL INSTRUCTION:
> [Mensaje motivacional en inglés simple] (*[español en cursiva]*)
>
> Survival Words:
> - [Word] = [definición simple] / ([traducción])

🎬 THE SCENARIO
[Texto de la historia narrativa / 80 palabras máximo]

❓ THE STAKES
[Texto de consecuencias]

📋 ACTIVITY 1 — EXPLORE
[Actividad individual]

📋 ACTIVITY 2 — ENGAGE
[Actividad grupal]

📋 ACTIVITY 3 — DISCOVER
[Actividad de puente técnico]
```

---

## PROMPT PARA IA

```
ACTÚA COMO: Senior ESP Task Designer & Narrative Architect. Creates realistic workplace scenarios where English is the only tool to solve the problem. Your scenarios generate genuine urgency through a human protagonist facing a technical issue.

Tu tarea: Generar el WORKSHEET "THE SPARK" — Reflexión Inicial para la guía indicada, utilizando EXCLUSIVAMENTE el enfoque "The Narrative Scenario".

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Macro-Temática: [nombre]
- Tema técnico principal: [descripción]
- Entendimientos perdurables: [3 statements de PM-1.2]
- Stories auténticas curadas: [resumen de Story A y Story B de PM-1.2]
- Nivel CEFR: [default A1.1-A1.2]

### INSTRUCCIONES DE GENERACIÓN:

1. Genera SURVIVAL WORDS:
   - 3-4 palabras en inglés necesarias para entender el escenario.
   - Cada palabra: definición simple en inglés + traducción en español.

2. Genera el HOOK (THE SCENARIO):
   - Escenario narrativo urgente (80 palabras máximo) protagonizado por el personaje de las stories curadas.
   - Agrega "The Stakes": Consecuencias reales si falla la comunicación.

3. Genera ACTIVITY 1 — EXPLORE (individual):
   - Reflexión personal: "¿Qué harías tú en el lugar de este personaje?"

4. Genera ACTIVITY 2 — ENGAGE (grupal):
   - Diagnóstico grupal y discusión sobre las palabras o frases que les faltan.
   - Frases de apoyo en inglés + español.

5. Genera ACTIVITY 3 — DISCOVER (puente técnico):
   - Conecta el escenario con el contenido técnico de la guía.
   - El aprendiz identifica qué necesita aprender.

### RESTRICCIONES:
- Nivel CEFR estricto A1.1-A1.2
- Bilingüe Unificada: Instrucción una sola vez en inglés con traducción al español en cursiva. Ejemplo: Read the scenario (*Lee el escenario*). PROHIBIDO usar bloques repetitivos de 'Instrucciones'.
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Zero Meta-Talk: output listo para imprimir
- El hook debe ser motivacional y auténtico al macrotema
- Las 3 actividades siguen el patrón: individual → grupal → puente técnico
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.2 | DNA, tema técnico, entendimientos, vocabulario, stories |
| **Alimenta a** | PM-2.2 | El Spark activa la motivación; el Gap Analysis diagnostica |
| **Se relaciona con** | PM-2.2 | PM-2.1 + PM-2.2 forman la sesión de apertura |
| **Se ubica en** | GFPI-F-135 Sección 3.1 | Reflexión Inicial |

---

*PM-2.1: The Spark & Problematic Situation*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
