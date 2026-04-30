---
version: 3.0
last_verified: 2026-04-28
session: 1
fase_sena: "Reflexión Inicial"
activity_type: "cognitiva"
generates_evidence: false
evidence_type: null
contributes_to_cuestionario: false
cuestionario_skill: null
cuestionario_points: 0
changelog_v3_0:
  - "Canonización Opción A (decisión arquitectónica Sergio 2026-04-28)"
  - "Reconocimiento de jerarquía canónica: directiva del instructor > implementación operacional > master prompt"
  - "Directiva canónica del instructor 'Quiero todos los arquetipos para todos los PM' (capturada en runs/MGV-2026-04-20/pm-2-11.json:574) ahora aplica explícitamente a PM-2.1"
  - "v2.0 declaraba 'Único Detonante' exclusivo · v3.0 documenta 2 modos: DEFAULT (Narrative Scenario) + EXTENSIBLE (4 arquetipos secuencia encadenada estilo DIESEL)"
  - "Nuevo catálogo §48 con 4 arquetipos canónicos extraídos de DIESEL-2026-04-15/18/19: A Visual/Infografía · B Story/Narrativa · C News/Noticia técnica · D Debate/Encuesta"
  - "Modo DEFAULT (Narrative Scenario + EXPLORE/ENGAGE/DISCOVER) preservado como template histórico · ya NO obligatorio"
  - "Instructor declara modo en arquetipos-elegidos.json (estilo: 'mgv_compendio_metodologico' para default · 'diesel_secuencia_encadenada' para extensible)"
---

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
| **Estructura** | 2 MODOS canónicos (v3.0): DEFAULT = THE NARRATIVE SCENARIO · EXTENSIBLE = 4 arquetipos secuencia encadenada |

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

## DOS MODOS CANÓNICOS (v3.0 · Opción A canonizada 2026-04-28)

PM-2.1 v3.0 reconoce 2 modos legítimos de implementación según la directiva canónica del instructor *"Quiero todos los arquetipos para todos los PM"* (MGV pm-2-11.json:574). El instructor elige el modo en `arquetipos-elegidos.json` por run.

### MODO DEFAULT: THE NARRATIVE SCENARIO (estilo `mgv_compendio_metodologico` con 1 arquetipo)

Patrón histórico (v2.0). Sigue siendo válido y recomendado para cohortes simples o cuando la sesión exige foco narrativo único. Activación: `arquetipos-elegidos.json` declara `estilo: "mgv_compendio_metodologico"` con `archetypes_integrated: ["NARRATIVE_SCENARIO"]`.

#### ESTRUCTURA INTERNA (modo default):

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

## MODO EXTENSIBLE: 4 ARQUETIPOS DE SECUENCIA ENCADENADA (estilo `diesel_secuencia_encadenada`)

Patrón canonizado v3.0. Aplica la directiva del instructor con 4 arquetipos rotativos como momentos secuenciales en S1. Activación: `arquetipos-elegidos.json` declara `estilo: "diesel_secuencia_encadenada"` con `archetype_used: [4 arquetipos]` + `archetype_mode: "secuencia encadenada — 4 momentos en S1"`.

**Evidencia canónica operacional:** DIESEL-2026-04-15 + 04-18 + 04-19 — TODOS los pm-2-1.json usan este patrón.

### CATÁLOGO DE 4 ARQUETIPOS CANÓNICOS:

| ID | Nombre | Foco pedagógico | Aplicabilidad |
|----|--------|-----------------|---------------|
| **A** | Visual/Infografía | Activación visual de problema técnico mediante infografía o diagrama del incidente/escenario | Cohortes con baja literacidad inicial · contextos donde la imagen comunica más rápido que el texto |
| **B** | Story/Narrativa | Narrativa breve (1-2 párrafos) del escenario laboral con personaje y conflicto | Cohortes con interés en lectura · narrativa empática que conecta con experiencia del aprendiz |
| **C** | News/Noticia técnica | Titular o noticia real adaptada del sector técnico que evoca el problema | Cohortes mayores · contextos donde la realidad del oficio es el motor (ej. "Workshop fire — what IT learned") |
| **D** | Debate/Encuesta | Pregunta provocadora o encuesta rápida que polariza posiciones del grupo | Cohortes participativas · arranques de sesión donde la discusión genera energía social |

### ESTRUCTURA INTERNA (modo extensible):

```
🎬 4 MOMENTOS SECUENCIALES (cada uno con su archetype específico)

📋 MOMENTO 1 — ARQUETIPO X (e.g. C — News): titular técnico
📋 MOMENTO 2 — ARQUETIPO Y (e.g. A — Visual): infografía o diagrama  
📋 MOMENTO 3 — ARQUETIPO Z (e.g. B — Story): narrativa del escenario
📋 MOMENTO 4 — ARQUETIPO W (e.g. D — Debate): polaridad y discusión

🎯 SÍNTESIS DE BLOQUE: ¿Qué necesitamos aprender en esta guía
   para responder a esto en inglés?
```

El instructor decide qué arquetipos usa y en qué orden (ej. DIESEL canon: C → A → B → D). Los 4 momentos pueden tener duración variable (15-30 min cada uno) según importancia pedagógica.

---

## CÓMO SE DECLARA CADA MODO

En `runs/[RUN-ID]/arquetipos-elegidos.json`:

```json
{
  "elecciones": [
    {
      "pm": "PM-2.1",
      "estilo": "mgv_compendio_metodologico",
      "archetypes_integrated": ["NARRATIVE_SCENARIO"],
      "rationale": "Cohorte simple · foco narrativo único"
    }
  ]
}
```

O alternativamente:

```json
{
  "elecciones": [
    {
      "pm": "PM-2.1",
      "estilo": "diesel_secuencia_encadenada",
      "archetype_used": [
        "A — Visual/Infografía",
        "B — Story/Narrativa",
        "C — News/Noticia técnica",
        "D — Debate/Encuesta"
      ],
      "archetype_mode": "secuencia encadenada — 4 momentos en S1",
      "rationale": "Cohorte participativa · directiva del instructor de aplicar todos los arquetipos"
    }
  ]
}
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

## ACTIVITY CARD OUTPUT

Esta sección define el output estructurado que este PM entrega al PM-2.11 (GFPI-F-134 Row Assembler).

```yaml
activity_card:
  pm_id: "PM-2.1"
  pm_name: "The Spark"
  session: 1
  phase_sena: "Reflexión Inicial"
  rap_id: "[A GENERAR — viene del Session Blueprint PM-2.0]"
  
  activities:
    - number: 1
      type: "cognitiva"
      statement: "[A GENERAR — Verbo infinitivo + objeto + condición]"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Lluvia de ideas"
    
    - number: 2
      type: "cognitiva"
      statement: "[A GENERAR — Verbo infinitivo + objeto + condición]"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Panel discussion"
  
  hours:
    direct: 1.0
    autonomous: 0.25
  
  evidence:
    generates_evidence: false
    type: null
    description: ""
    evaluation_technique: null
    instrument_number: null
    instrument_type: null
  
  environment:
    type: "Aula"
    materials:
      - "Proyector"
      - "Pizarrón / Papel grande (flip chart)"
      - "Marcadores"
    instructors: "Instructor de inglés + Técnico especialista"
  
  contributes_to_consolidated_quiz: false
  quiz_skill: null
  quiz_points: 0
  quiz_item_count: 0
```

---

*PM-2.1: The Spark & Problematic Situation*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
