---
version: 3.1
last_verified: 2026-05-02
session: "S1"
session_legacy_v2: 1
tipo_bloque: "APERTURA"
bloque_id_referencia_canon: "B0"
rap_target_canon: null
fase_sena: "Contextualización"
dimension_canon: "actitudinal_o_cognitiva"
generates_evidence: false
evidence_type: null
contributes_to_cuestionario: false
cuestionario_skill: null
cuestionario_points: 0
status: v3.1 minor bump · PM-2.2 hereda cascade Phase 1 v3.x · emite Activity Card v3.0 canon Sergio · APERTURA Contextualización transversal · evidencias.aplica=false (canon · diagnosticar + activar aprendizajes previos + brindar contexto general · NO conocimiento ni habilidades nuevas · Sergio enfático) · 4 arquetipos v3.0 PRESERVADOS
v3_1_changes:
  - "NEW REGLA heredancia cascade Phase 1 v3.x · consume pm-2-0.S1.actividades_planeadas[consumed_by_pm=PM-2.2] + pm-1-2.B0.materiales_spark/aprendizajes_previos/contexto_general + matriz v1.3 + universo PM-0 v3.2"
  - "NEW REGLA emisión Activity Card v3.0 canon Sergio · 16 campos schema completo"
  - "NEW REGLA evidencias.aplica = false SIEMPRE (canon APERTURA · render 'No aplica' literal)"
  - "NEW REGLA dimension actitudinal o cognitiva (típicamente cognitiva-diagnóstica · activación previos)"
  - "NEW REGLA descripcion multi-párrafo 200-600 palabras (target 480-580 sweet spot · pattern PM-2.3 PILOT validado) patrón canon panorama→orientación→equipos→diagnóstico/activación→contexto general RAPs→cierre"
  - "NEW REGLA aprendizajes_previos_a_activar + contexto_general_raps_presentado obligatorios (canon Sergio · gap analysis genuino)"
  - "session: 1 (v3.0) → S1 (v3.1 alineado pm-2-0)"
  - "activity_type: cognitiva → dimension: actitudinal_o_cognitiva (canon Activity Card v3.0)"
  - "4 arquetipos v3.0 PRESERVADOS (Self-assessment/KWL · Diagnosis visual · Gap card · Peer interview)"
v3_0_legacy_preserved:
  - "Catálogo §44 4 arquetipos canónicos (Self-assessment · Diagnosis visual · Gap card · Peer interview)"
  - "2 modos DEFAULT (The Mirror) + EXTENSIBLE (secuencia encadenada estilo DIESEL)"
  - "Directiva canónica instructor 'Quiero todos los arquetipos disponibles'"
changelog_v3_0:
  - "Canonización Opción A (decisión arquitectónica Sergio 2026-04-28)"
  - "Reconocimiento de jerarquía canónica: directiva del instructor > implementación operacional > master prompt"
  - "Directiva canónica del instructor 'Quiero todos los arquetipos para todos los PM' (capturada en runs/MGV-2026-04-20/pm-2-11.json:574) ahora aplica explícitamente a PM-2.2"
  - "v2.0 declaraba 'Único Diagnóstico' exclusivo · v3.0 documenta 2 modos: DEFAULT (The Mirror) + EXTENSIBLE (4 arquetipos secuencia encadenada estilo DIESEL)"
  - "Nuevo catálogo §44 con 4 arquetipos canónicos extraídos de DIESEL-2026-04-15/18/19: A Self-assessment/KWL · B Diagnosis visual · C Gap card · D Peer interview"
  - "Modo DEFAULT (The Mirror + WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT) preservado como template histórico · ya NO obligatorio"
  - "Instructor declara modo en arquetipos-elegidos.json (estilo: 'mgv_compendio_metodologico' para default · 'diesel_secuencia_encadenada' para extensible)"
---

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
| **Estructura** | 2 MODOS canónicos (v3.0): DEFAULT = THE MIRROR · EXTENSIBLE = 4 arquetipos secuencia encadenada |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Scope & Sequence (vocabulario, grammar targets, tema técnico, stories) | PM-1.2 |
| Nivel CEFR | PM-1.2 |

---

## DOS MODOS CANÓNICOS (v3.0 · Opción A canonizada 2026-04-28)

PM-2.2 v3.0 reconoce 2 modos legítimos de implementación según la directiva canónica del instructor *"Quiero todos los arquetipos para todos los PM"* (MGV pm-2-11.json:574). El instructor elige el modo en `arquetipos-elegidos.json` por run.

### MODO DEFAULT: THE MIRROR (estilo `mgv_compendio_metodologico` con 1 arquetipo)

Patrón histórico (v2.0). Sigue siendo válido y recomendado para cohortes simples o cuando la sesión exige diagnóstico reflexivo personal sin rotación. Activación: `arquetipos-elegidos.json` declara `estilo: "mgv_compendio_metodologico"` con `archetypes_integrated: ["THE_MIRROR"]`.

#### ESTRUCTURA INTERNA (modo default):

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

## MODO EXTENSIBLE: 4 ARQUETIPOS DE SECUENCIA ENCADENADA (estilo `diesel_secuencia_encadenada`)

Patrón canonizado v3.0. Aplica la directiva del instructor con 4 arquetipos rotativos como momentos secuenciales de cierre de S1. Activación: `arquetipos-elegidos.json` declara `estilo: "diesel_secuencia_encadenada"` con `archetype_used: [4 arquetipos]` + `archetype_mode: "secuencia encadenada — cierre de S1"`.

**Evidencia canónica operacional:** DIESEL-2026-04-15 + 04-18 + 04-19 — TODOS los pm-2-2.json usan este patrón.

### CATÁLOGO DE 4 ARQUETIPOS CANÓNICOS:

| ID | Nombre | Foco pedagógico | Aplicabilidad |
|----|--------|-----------------|---------------|
| **A** | Self-assessment/KWL | Autoevaluación reflexiva (Know · Want to know · Learned) — el aprendiz mapea su propio nivel inicial | Diagnóstico individual canónico · base sobre la cual se construyen los siguientes arquetipos |
| **B** | Diagnosis visual | Tabla, mapa o gráfico visual donde el aprendiz coloca sus áreas débiles vs fuertes | Cohortes con preferencia visual · contextos donde la representación gráfica facilita la honestidad diagnóstica |
| **C** | Gap card | Tarjeta de gaps específicos: "Sé X · necesito aprender Y · para lograr Z" | Cohortes que necesitan estructura formal · contextos laborales donde el gap se vuelve compromiso documentado |
| **D** | Peer interview | Entrevista guiada entre pares (3-5 preguntas estandarizadas) sobre saberes previos del macrotema | Cohortes participativas · arranques de programa donde la socialización entre aprendices construye comunidad |

### ESTRUCTURA INTERNA (modo extensible):

```
🔍 4 MOMENTOS SECUENCIALES (cada uno con su archetype específico · cierre de S1)

📋 MOMENTO 1 — ARQUETIPO X (e.g. A — KWL): autoevaluación individual
📋 MOMENTO 2 — ARQUETIPO Y (e.g. B — Diagnosis visual): mapeo gráfico  
📋 MOMENTO 3 — ARQUETIPO Z (e.g. C — Gap card): compromisos documentados
📋 MOMENTO 4 — ARQUETIPO W (e.g. D — Peer interview): socialización entre pares

🎯 SÍNTESIS DE BLOQUE: Los gaps colectivos identificados se convierten
   en el roadmap implícito de los siguientes 4-7 sesiones de Apropiación.
```

El instructor decide qué arquetipos usa y en qué orden (ej. DIESEL canon: A → B → C → D). Los 4 momentos pueden tener duración variable (15-30 min cada uno) según importancia pedagógica.

---

## CÓMO SE DECLARA CADA MODO

En `runs/[RUN-ID]/arquetipos-elegidos.json`:

```json
{
  "elecciones": [
    {
      "pm": "PM-2.2",
      "estilo": "mgv_compendio_metodologico",
      "archetypes_integrated": ["THE_MIRROR"],
      "rationale": "Cohorte simple · diagnóstico reflexivo personal único"
    }
  ]
}
```

O alternativamente:

```json
{
  "elecciones": [
    {
      "pm": "PM-2.2",
      "estilo": "diesel_secuencia_encadenada",
      "archetype_used": [
        "A — Self-assessment/KWL",
        "B — Diagnosis visual",
        "C — Gap card",
        "D — Peer interview"
      ],
      "archetype_mode": "secuencia encadenada — cierre de S1",
      "rationale": "Cohorte participativa · directiva del instructor de aplicar todos los arquetipos"
    }
  ]
}
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
- Grammar targets: [estructuras de PM-2.10]
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

## ACTIVITY CARD OUTPUT

Esta sección define el output estructurado que este PM entrega al PM-2.11 (GFPI-F-134 Row Assembler).

```yaml
activity_card:
  pm_id: "PM-2.2"
  pm_name: "Gap Analysis"
  session: 1
  phase_sena: "Contextualización"
  rap_id: "[A GENERAR — viene del Session Blueprint PM-2.0]"
  
  activities:
    - number: 1
      type: "cognitiva"
      statement: "[A GENERAR — Verbo infinitivo + objeto + condición]"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Análisis de casos"
  
  hours:
    direct: 1.5
    autonomous: 0.5
  
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
      - "Formularios de autoevaluación impresos"
      - "Computadores con acceso a Moodle"
    instructors: "Instructor de inglés + Técnico especialista"
  
  contributes_to_consolidated_quiz: false
  quiz_skill: null
  quiz_points: 0
  quiz_item_count: 0
```

---

*PM-2.2: The Gap Analysis & Prior Knowledge*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*

---

## EXTENSIÓN v3.1 — PM-2.2 HEREDERO CASCADE PHASE 1 v3.x + ACTIVITY CARD v3.0 (2026-05-02)

> [!warning] Bump minor v3.0 → v3.1 · canon Sergio 2026-05-02 · cascade Wave 1 IMARPOR-V2 · gemelo de PM-2.1 v3.1

v3.0 canonizó 2 modos + 4 arquetipos diagnósticos. v3.1 agrega heredancia explícita cascade v3.x + emisión Activity Card v3.0 canon Sergio. PRESERVA 4 arquetipos + 2 modos v3.0 sin cambios.

### REGLA NEW · INPUT CASCADE PHASE 1 v3.x

PM-2.2 v3.1 consume:
- `pm-2-0.json v3.0` (S1 APERTURA · `actividades_planeadas[consumed_by_pm=PM-2.2]` típicamente 2 gap analysis)
- `pm-1-2.json v4.2+` (`B0.materiales_spark` · `B0.aprendizajes_previos_a_activar` · `B0.contexto_general_raps_presentado`)
- `pm-0-0-matriz-alineada.json v1.2+` (4 RAPs cubiertos transversalmente · sin criterio canon específico evaluable en S1)
- `pm-0-context.json v3.2+` (universo + personajes · CRÍTICO para diagnóstico genuino)

### REGLA NEW · EMISIÓN ACTIVITY CARD v3.0 CANON SERGIO

PM-2.2 v3.1 emite N Activity Cards v3.0 (típicamente 2 · una por gap analysis heredada):

```yaml
activity_card:
  pm_id: "PM-2.2"
  pm_name: "The Gap Analysis & Prior Knowledge"
  session: "S1"
  tipo_bloque: "APERTURA"
  bloque_id_referencia: "B0"
  rap_target: null                              # transversal
  numero_actividad: N                            # secuencial guía (típicamente 3-4 después de PM-2.1)

  dimension: "cognitiva"                         # típico gap analysis · cognitiva-diagnóstica
  enunciado: "Diagnosticar [conocimientos previos] mediante [arquetipo elegido] activando [contexto operacional]."
  descripcion: |                               # 200-600 palabras (target 480-580)
    [PANORAMA: qué se diagnostica + por qué importa para el programa]

    [ORIENTACIÓN INSTRUCTOR: presenta el contexto general 4 RAPs + introduce instrumento diagnóstico]

    [CONFORMACIÓN GRUPO + ACCESO: cómo se organizan + acceso al material diagnóstico (KWL · self-assessment · gap card · peer interview)]

    [DIAGNÓSTICO + ACTIVACIÓN PREVIOS: qué hacen los aprendices · activación afectiva sin amenaza · captura honesta de baseline]

    [CIERRE: socialización + bridge a S2 (primera APROPIACIÓN B1 RA1)]

  ambiente: "Aula con proyector + mesas en grupos pequeños"
  estrategias_didacticas_activas: ["Trabajo colaborativo"]
  tecnicas_didacticas: ["Investigación guiada", "Self-assessment"]   # según arquetipo
  materiales_formacion: ["proyector", "tarjetas KWL", "marcadores", "stickers de colores"]
  material_apoyo:
    - descripcion: "[material gap analysis heredado pm-1-2.B0]"
      link: "[URL si aplica · null si no]"

  evidencias:
    aplica: false                              # CANON APERTURA · NO genera evidencia formal
    tipo: null
    nombre: null
    tecnica_evaluacion: null
    instrumento_numero: null
    instrumento_tipo: null
    codigo_canon: null
    criterio_canon_evaluado: null

  duracion_horas: 1.5                          # típico gap analysis · 1.5h por actividad

  _anclaje_matriz_heredado:
    alcance: "competencia_completa"
    raps_atravesados: ["RA1", "RA2", "RA3", "RA4"]
    criterios_canon_que_evalua: []             # transversal
    saberes_proceso_movilizados: []            # diagnóstico puro · no movilización formal
  _produces_evidencia: null                    # APERTURA NO produce E1-E6
  _consumed_by_pm: "PM-2.2"
  _ref_pm12_path: "sub_bloques_tripartitos[0].materiales_spark[N]"
  _ref_pm20_session: "S1"
```

### REGLA NEW · evidencias.aplica = false SIEMPRE (canon APERTURA · gemelo PM-2.1)

Canon Sergio: "Las actividades de reflexión inicial · de contextualización y de transferencia no llevan evidencias de aprendizaje para evaluar con técnicas ni instrumentos."

PM-2.2 SIEMPRE emite `evidencias.aplica = false` · campos null · render "No aplica" literal.

### REGLA NEW · aprendizajes_previos_a_activar + contexto_general_raps_presentado obligatorios

Heredados de pm-1-2.B0:
- `aprendizajes_previos_a_activar`: qué espera saber el aprendiz al entrar (lista heredada)
- `contexto_general_raps_presentado`: narrativa que presenta los 4 RAPs sin entrar a apropiación

Ambos deben quedar reflejados en la `descripcion` (integrados narrativamente · NO listas literales).

### REGLA NEW · 4 arquetipos v3.0 PRESERVADOS

LLM elige uno o combinación según universo:
- **A · Self-assessment / KWL:** Know-Want-Learned · auto-evaluación honesta sin amenaza
- **B · Diagnosis visual:** mapa visual de baseline · imagen + iconos
- **C · Gap card:** tarjeta personal con gaps identificados (privado primero · socializado después)
- **D · Peer interview:** entrevista entre pares · descubrir baseline mutual

### REGLA NEW · 7 VALIDATION CHECKS BLOQUEANTES

```jsonc
[
  {"id": 1, "name": "schema_activity_card_v3_completo"},
  {"id": 2, "name": "descripcion_multipárrafo_200_600_palabras"},
  {"id": 3, "name": "evidencias_aplica_false_canon_apertura"},   # CRÍTICO PM-2.2
  {"id": 4, "name": "render_no_aplica_correcto"},
  {"id": 5, "name": "heredancia_pm12_aprendizajes_previos_literal"},
  {"id": 6, "name": "heredancia_pm20_S1_correcta"},
  {"id": 7, "name": "raps_atravesados_4_de_4"}                   # canon transversal
]
```

### REGLA NEW · NO conocimiento ni habilidades nuevas (canon Sergio)

PM-2.2 diagnóstica + activa previos + brinda contexto general. **NO inicia construcción de conocimiento o habilidades nuevas** (esa es función APROPIACIÓN B1-B4 · S2 en adelante).

Si la descripcion empieza a "enseñar" vocabulario nuevo · grammar nuevo · etc. · violación canon Sergio · NO PASS check 3.

---

*PM-2.2 v3.1 · The Gap Analysis Heredero · Activity Card v3.0 canon Sergio · evidencias.aplica=false APERTURA · 4 arquetipos v3.0 PRESERVADOS · NO conocimiento nuevo*
*Sergio Cortés decisión arquitectónica 2026-05-02 · cascade Wave 1 IMARPOR-V2 · gemelo PM-2.1 v3.1*
