---
pm_id: PM-2.0
name: RAP Session Architect
phase: 2
session: null
fase_sena: Pre-diseño
type: architect
version: 2.6
created: 2026-04-13
last_verified: 2026-04-20
inputs:
  - PM-1.2 output (RAP completo con los 4 bloques canónicos v2.6: Bloque 0 / A / B / C)
  - pm-0-context.json (Fase 0)
  - program_info (opcional: diseño curricular, proyecto formativo, código competencia, código RAP)
outputs:
  - Session Blueprint (8 sesiones con contratos de horas, PMs asignados, transversales)
  - Confirmación de la distribución de horas antes de ejecutar PM-2.1
  - Catálogo completo de 52 arquetipos (PM-2.1 a PM-2.10) para selección upfront por el instructor (v2.6)
depends_on: [PM-1.2, pm-0-context.json]
feeds_into: [PM-2.1, PM-2.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10]
---

# PM-2.0: RAP SESSION ARCHITECT

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-2.0 |
| **Nombre** | RAP Session Architect |
| **Subfase guía SENA** | 3.1 Programación de actividades |
| **Ubicación en la Guía** | Pre-guía — cartografía de 8 sesiones |
| **Tipo de Evidencia SENA** | N/A (herramienta de diseño) |
| **Instrumento** | Session Blueprint estructurado |
| **Rol estratégico** | Arquitecto fundacional de la Fase 2 — sin este blueprint, PM-2.1 a PM-2.10 no tienen donde ubicarse |

---

## PROPÓSITO

El **Session Architect** es el primer paso de la Fase 2 (Diseño de Actividades). Recibe el output completo del PM-1.2 (RAP con sus saberes, criterios y competencia) y produce el **Session Blueprint**: el plan maestro que distribuye esos saberes en 8 sesiones de formación, mapea qué PM se ejecuta en cada sesión, asigna horas formales, identifica RAPs transversales (inglés obligatorio) y valida que todo el peso educativo cuadre.

Sin el Session Blueprint, los PM-2.x posteriores operan a ciegas.

---

## INPUTS REQUERIDOS

El PM-2.0 necesita que el instructor proporcione:

| Input | Formato | Fuente |
|-------|---------|--------|
| **Competencia laboral** | Texto literal 150 caracteres máx | PM-1.2 (columna 1) |
| **Código y nombre RAP** | "RAP-[CODE]-[NUM]-[AÑO]" | PM-1.2 (columna 2) |
| **Saberes de Conceptos** | Lista 8-10 ítems | PM-1.2 (columna 3) |
| **Saberes de Proceso** | Lista 6-8 ítems procedimentales | PM-1.2 (columna 4) |
| **Criterios de Evaluación** | Lista 4-6 criterios observables | PM-1.2 (columna 5) |
| **Información del programa** (opcional) | Nombre programa, código, nivel CEFR, duración total | SOFIA Plus o instructor |
| **Contexto técnico adicional** (opcional) | Descripción del ambiente productivo, sector, nivel de complejidad | SOFIA Plus o instructor |

---

## PROCESO DE ARQUITECTURA

### Fase 1: Análisis de Carga Cognitiva

1. **Inventariar saberes conceptuales:** Agrupar los saberes de conceptos en bloques temáticos de menor a mayor complejidad (Bloom L1-2 → L3 → L4-6).

2. **Inventariar saberes de proceso:** Agrupar los procedimientos en secuencias realizables en 6 horas (sesión directa).

3. **Mapear criterios contra saberes:** ¿Cada criterio de evaluación tiene soporte en saberes conceptuales y/o procedimentales? Verificar 1:1+.

### Fase 2: Distribución por Sesión

Usar esta estructura fija de 8 sesiones (60 horas = 48 directas + 12 autónomas):

```
S1 (7.5h): Reflexión Inicial + Contextualización
  - PMs: PM-2.1 (The Spark) + PM-2.2 (Gap Analysis)
  - Bloom: L1-2 (Recordar, Comprender)
  - Evidencia: No
  - Carga: Activación, enganche, diagnóstico
  
S2 (7.5h): Apropiación — Reading + Vocabulary
  - PMs: PM-2.5 (Vocab Scaffold) + PM-2.3 (Reading Anchor)
  - Bloom: L2-3 (Comprender, Aplicar)
  - Evidencia: Sí — Reading (Conocimiento) + Vocabulary (aporta a Quiz)
  - Carga: Input receptivo masivo
  
S3 (7.5h): Apropiación — Writing + Grammar
  - PMs: PM-2.10 (Grammar Scaffold) + PM-2.4 (Writing Task)
  - Bloom: L2-3 (Comprender, Aplicar)
  - Evidencia: Sí — Writing (Producto) + Grammar (aporta a Quiz)
  - Carga: Output producido escrito
  
S4 (7.5h): Apropiación — Listening + Speaking
  - PMs: PM-2.6 (Listening Anchor) + PM-2.8 (Speaking Mission)
  - Bloom: L3-4 (Aplicar, Analizar)
  - Evidencia: Sí — Listening (Desempeño) + Speaking (Desempeño)
  - Carga: Output producido oral + comprensión auditiva
  
S5 (7.5h): Apropiación — Language Functions + Wrap-up
  - PMs: PM-2.9 (Language Functions) + consolidación
  - Bloom: L3-5 (Aplicar, Analizar, Evaluar)
  - Evidencia: Sí — Language Functions (Desempeño)
  - Carga: Integración pragmática y comunicativa
  
S6 1ª mitad (3.75h): Evaluación Sumativa
  - PM: Cuestionario Consolidado (25 pts)
  - Bloom: L2-3 (Recordar, Comprender)
  - Evidencia: Sí — Cuestionario (Conocimiento)
  - Carga: 5 ítems Reading + 5 Writing + 5 Listening + 5 Vocabulary + 5 Grammar
  
S6 2ª mitad + S7 + S8 (18.75h): Transferencia
  - PMs: PM-3.5 (Final Mission) + Proyecto Formativo
  - Bloom: L4-6 (Analizar, Evaluar, Crear)
  - Evidencia: No formal en GFPI-F-134
  - Carga: Aplicación real en contexto laboral
```

### Fase 3: Asignación de PMs por Sesión

Usar esta tabla obligatoria:

| Sesión | Fase SENA | Horas | PMs Activos | RAP Transversal | Genera Evidencia |
|--------|-----------|-------|---|---|---|
| 1 | Reflexión + Contextualización | 6 + 1.5 | PM-2.1, PM-2.2 | Inglés (engagement) | No |
| 2 | Apropiación | 6 + 1.5 | PM-2.5, PM-2.3 | Inglés (literacy, vocab, reading) | Sí |
| 3 | Apropiación | 6 + 1.5 | PM-2.10, PM-2.4 | Inglés (grammar, writing) | Sí |
| 4 | Apropiación | 6 + 1.5 | PM-2.6, PM-2.8 | Inglés (listening, speaking) | Sí |
| 5 | Apropiación | 6 + 1.5 | PM-2.9 | Inglés (language functions) | Sí |
| 6 1ª | Evaluación | 3.75 + 0.75 | Quiz S6 | Inglés (síntesis conocimiento) | Sí |
| 6 2ª + 7 + 8 | Transferencia | 15 + 3 | PM-3.5 | Inglés (aplicación real) | No |

### Fase 4: Validación de Horas

Suma obligatoria:
- **Trabajo directo:** 6 + 6 + 6 + 6 + 6 + 3.75 + 15 = **48 horas**
- **Trabajo autónomo:** 1.5 + 1.5 + 1.5 + 1.5 + 1.5 + 0.75 + 3 = **12 horas**
- **Total:** 60 horas ✓

Si hay desbalance, ajustar distribución de horas autónomas por sesión (manteniendo 48 directas fijas).

### Fase 5: Mapeo de Transversales

Para cada sesión de Apropiación (S2-S5), identificar:

1. **¿Qué RAP técnico se está trabajando?** → del PM-1.2
2. **¿Qué RAP transversal (inglés) se cruza?** → Siempre presente en S2-S5
3. **¿Cómo se integran?** → El inglés es el MEDIO para aprender el contenido técnico (CLIL), no una materia paralela

**Criterio de Continuidad e Integralidad:** Cada sesión de S2-S5 DEBE mostrar cómo el RAP técnico se aprende EN inglés.

### Fase 6: Identificación de Evidencias

De las 6 evidencias obligatorias del RAP, ubicarlas en el blueprint:

| # | Tipo | Sesión | PM Origen | Descripción breve |
|---|------|--------|-----------|-------------------|
| 1 | Conocimiento | S2 | PM-2.3 | Reading Comprehension |
| 2 | Producto | S3 | PM-2.4 | Written Production |
| 3 | Desempeño | S4 | PM-2.6 | Listening Comprehension |
| 4 | Desempeño | S4 | PM-2.8 | Oral Production (Speaking) |
| 5 | Desempeño | S5 | PM-2.9 | Language Functions |
| 6 | Conocimiento | S6 | Cuestionario consolidado | Síntesis de conocimientos (Reading, Writing, Listening, Vocabulary, Grammar) |

---

## CATÁLOGO DE ARQUETIPOS (v2.6 — Presentación Upfront al Instructor)

**⚠️ REGLA OPERATIVA v2.6:** Antes de ejecutar PM-2.1..PM-2.10, PM-2.0 debe presentar al instructor el catálogo **completo** de arquetipos disponibles (≈52 arquetipos total) **en una sola pasada**. El instructor elige 1 arquetipo por cada PM-2.x **antes** de que el sistema genere contenido.

### Flujo canónico

1. PM-2.0 emite el Session Blueprint (sección OUTPUT REQUERIDO abajo).
2. PM-2.0 emite también el **Catálogo de Arquetipos** — una tabla que lista, para cada PM-2.1 a PM-2.10, los arquetipos disponibles con su descripción breve y cuándo conviene usar cada uno.
3. El instructor selecciona 1 arquetipo por PM-2.x basándose en:
   - El universo narrativo (`pm-1-2.json` Bloque C)
   - El nivel CEFR de la guía (`pm-0-context.json` rango_cefr, grammar_roadmap)
   - El evento pedagógico objetivo (qué habilidad se enfatiza en esta guía)
4. Las 10 elecciones se consignan en un archivo `arquetipos-elegidos.json` en el directorio del run.
5. Solo tras la aprobación del instructor, el sistema ejecuta PM-2.1..PM-2.10.

### Schema de `arquetipos-elegidos.json`

```json
{
  "run_id": "MGV-2026-04-20",
  "guia_id": "G1",
  "elecciones": [
    { "pm": "PM-2.1", "arquetipo": "Sensory Hook", "justificacion": "Activa los 5 sentidos vinculados al diseño visual — apropiado para A1.1 sin demanda lingüística alta" },
    { "pm": "PM-2.2", "arquetipo": "KWL Chart Diagnostic", "justificacion": "…" },
    { "pm": "PM-2.3", "arquetipo": "Investigative Research", "justificacion": "…" },
    { "pm": "PM-2.4", "arquetipo": "Form-Filling (Font Card)", "justificacion": "…" },
    { "pm": "PM-2.5", "arquetipo": "Word Wall Active", "justificacion": "…" },
    { "pm": "PM-2.6", "arquetipo": "Client-Designer Dialogue", "justificacion": "…" },
    { "pm": "PM-2.8", "arquetipo": "Role-Play Brief Presentation", "justificacion": "…" },
    { "pm": "PM-2.9", "arquetipo": "Function Cards (5 functions)", "justificacion": "…" },
    { "pm": "PM-2.10", "arquetipo": "Consciousness-Raising (Present Simple)", "justificacion": "…" }
  ],
  "aprobado_por_instructor": true,
  "fecha_aprobacion": "2026-04-20"
}
```

### Tabla-resumen del catálogo

| PM | # Arquetipos | Ejemplos representativos |
|----|--------------|---------------------------|
| PM-2.1 — The Spark | 4-6 | Sensory Hook, Realia Encounter, Mystery Object, Field Trip Virtual |
| PM-2.2 — Gap Analysis | 4-6 | KWL Chart, Misconception Hunt, Can-Do Self-Check, Collaborative Diagnostic |
| PM-2.3 — Reading | 6 | Investigative Research, Case Study, News Article, Technical Manual, Blog Post, Interview |
| PM-2.4 — Writing | 5-6 | Form-Filling, Report Writing, Technical Description, Incident Log, Email/Memo, RCA Writeup |
| PM-2.5 — Vocabulary | 4-6 | Word Wall Active, Semantic Mapping, Collocations Bank, Visual Flashcards, Frayer Model |
| PM-2.6 — Listening | 6 | Client-Designer Dialogue, Technician Troubleshooting, Safety Briefing, Interview, Podcast Clip, Training Video |
| PM-2.7 — Pronunciation | DEPRECATED | Funcionalidad absorbida en PM-2.8 |
| PM-2.8 — Speaking | 5-6 | Role-Play, Presentation, Information Gap, Debate, Pitch, Simulation |
| PM-2.9 — Language Functions | 4-6 | Function Cards, Dialogue Completion, Scenarios, Realia-Driven Interaction |
| PM-2.10 — Grammar | 4-6 | Consciousness-Raising, Structured Input, Output-Prompted, Noticing Tasks |

**Nota:** El catálogo completo con descripción detallada de cada arquetipo vive en los prompts individuales PM-2.1.md a PM-2.10.md, sección "Arquetipos disponibles". PM-2.0 actúa como **agregador** para la decisión upfront.

### Razón arquitectónica

La selección de arquetipos es una **decisión pedagógica crítica** que requiere contexto humano (perfil del aprendiz, sector, momento del programa, fortalezas del instructor). Delegarla al modelo LLM post-generación produce falsos matches y fuerza iteraciones costosas. Seleccionar upfront elimina el retrabajo.

*Lección aprendida MGV-2026-04-20: instructor eligió los 10 arquetipos antes de generar pm-2-1.json..pm-2-10.json. Resultado: 0 iteraciones, 0 retrabajos, catálogo completado en una pasada.*

---

## OUTPUT REQUERIDO: SESSION BLUEPRINT

El PM-2.0 DEBE generar un documento estructurado en YAML con esta forma:

```yaml
session_blueprint:
  
  # IDENTIDAD DEL RAP
  rap_id: "RAP-[CODE]-[NUM]-[AÑO]"
  rap_name: ""
  competencia: ""
  program_info:
    program_name: ""
    program_code: ""
    cefr_level: "A1.1-A1.2"
    sector: ""
  
  # DISTRIBUCIÓN HORARIA GLOBAL
  total_hours: 60
  direct_hours: 48
  autonomous_hours: 12
  
  # BLUEPRINT DE 8 SESIONES
  sessions:
    
    - session: 1
      fase_sena: "Reflexión Inicial + Contextualización"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.1", "PM-2.2"]
      learning_focus: |
        Activación de esquemas previos sobre el tema técnico.
        Identificación de brechas de conocimiento (diagnóstico).
        Enganche motivacional sobre aplicación laboral del RAP.
      transversal_rap: "Inglés — Engagement, Academic Language for Reflection"
      transversal_justification: |
        El aprendiz reflexiona SOBRE EL TEMA en inglés desde el inicio.
        Los términos clave se presentan bilingüemente.
        Se establece el universo narrativo en inglés.
      generates_evidence: false
      evidence_preview: ""
      
    - session: 2
      fase_sena: "Apropiación — Input Receptivo"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.5", "PM-2.3"]
      learning_focus: |
        Introducción masiva de vocabulario técnico (Scaffolding en PM-2.5).
        Comprensión lectora de texto auténtico adaptado (Reading Anchor en PM-2.3).
        Extracción de información y patrones.
      transversal_rap: "Inglés — Literacy, Vocabulary Recognition, Reading Comprehension (A1)"
      transversal_justification: |
        PM-2.5 + PM-2.3 son la puerta de entrada al inglés de la guía.
        El aprendiz lee su primer texto técnico en inglés EN CONTEXTO LABORIERO.
        Los 20 términos se presentan en el Toolbelt del Reading Anchor.
        Los patrones gramaticales básicos (is/has/can) aparecen naturalmente.
      generates_evidence: true
      evidence_preview: |
        Evidencia 1: Reading Comprehension (Conocimiento)
        Técnica: Preguntas sobre texto leído
        Instrumento: Cuestionario No 1 (5 ítems)
        
        + Aporte a Cuestionario S6: Vocabulary (5 ítems del Toolbelt)
      
    - session: 3
      fase_sena: "Apropiación — Output Producido"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.10", "PM-2.4"]
      learning_focus: |
        Introducción a estructuras gramaticales objetivo (Scaffolding en PM-2.10).
        Producción escrita: composición de textos técnicos breves (PM-2.4).
        Aplicación de vocabulario y grammar en contexto de tarea.
      transversal_rap: "Inglés — Grammar in Context, Written Production (Task-Based A1)"
      transversal_justification: |
        PM-2.10 + PM-2.4 desarrollan PRODUCCIÓN ESCRITA.
        El aprendiz usa el vocabulario leído en S2 para escribir.
        Las estructuras gramaticales se inducen del texto de S2 y se practican en tareas.
        Énfasis: escribir para transmitir información técnica, no solo "escribir inglés".
      generates_evidence: true
      evidence_preview: |
        Evidencia 2: Written Production (Producto)
        Técnica: Verificación del producto (rúbrica)
        Instrumento: Lista de verificación No 2 (10 criterios)
        
        + Aporte a Cuestionario S6: Grammar (5 ítems sobre uso en contexto)
      
    - session: 4
      fase_sena: "Apropiación — Comprensión Auditiva + Producción Oral"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.6", "PM-2.8"]
      learning_focus: |
        Comprensión de instrucciones, diálogos técnicos, audio en contexto (PM-2.6).
        Producción oral: habla funcional, descripción de procesos, simulación (PM-2.8).
        Manejo de conversación en contexto técnico laboral.
      transversal_rap: "Inglés — Listening Comprehension + Oral Production, Speaking Skills (A1)"
      transversal_justification: |
        PM-2.6 + PM-2.8 desarrollan las HABILIDADES ORALES.
        El aprendiz escucha diálogos reales/auténticos en contexto técnico.
        El aprendiz produce habla en simulaciones, role-plays y tareas funcionales.
        Se recicladan vocabulario y estructuras de S2-S3 en contexto oral.
      generates_evidence: true
      evidence_preview: |
        Evidencia 3: Listening Comprehension (Desempeño)
        Técnica: Preguntas + Observación
        Instrumento: Cuestionario No 3 (5 ítems) + Lista de Chequeo (4-5 indicadores)
        
        Evidencia 4: Oral Production / Speaking (Desempeño)
        Técnica: Observación
        Instrumento: Escala de estimación No 4 (5-7 criterios)
        
        + Aporte a Cuestionario S6: Listening (5 ítems sobre reconocimiento auditivo)
      
    - session: 5
      fase_sena: "Apropiación — Integración Pragmática"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.9"]
      learning_focus: |
        Dominio de funciones comunicativas contextualizadas (pedir, dar instrucciones,
        debatir, explicar decisiones técnicas).
        Interacción real con compañeros y simulations de contexto laboral.
        Síntesis y transferencia de todo lo aprendido en S1-S4 hacia comunicación real.
      transversal_rap: "Inglés — Language Functions, Communicative Competence (A1)"
      transversal_justification: |
        PM-2.9 INTEGRA todo el aprendizaje de S1-S4.
        No es "más de lo mismo"; es la demostración de que el aprendiz puede
        HACER COSAS EN INGLÉS usando lo aprendido (transfer).
        Las funciones comunicativas emergen de necesidades reales del contexto técnico.
      generates_evidence: true
      evidence_preview: |
        Evidencia 5: Language Functions / Communicative Competence (Desempeño)
        Técnica: Observación + Preguntas
        Instrumento: Escala de estimación No 5 (4-6 criterios)
        
        + Aporte a Cuestionario S6: Language Functions (5 ítems sobre uso pragmático)
      
    - session: 6_primera_mitad
      fase_sena: "Evaluación Sumativa"
      direct_hours: 3.75
      autonomous_hours: 0.75
      pms_active: ["Quiz Consolidado S6"]
      learning_focus: |
        Síntesis y consolidación de conocimiento conceptual (SABER QUÉ).
        Evaluación sumativa de los 5 skills: Reading, Writing, Listening, 
        Vocabulary, Grammar, Language Functions.
        Retroalimentación sobre dominio de RAP transversal (inglés) en nivel A1.
      transversal_rap: "Inglés — Knowledge Synthesis Across All Skills (A1)"
      transversal_justification: |
        El cuestionario consolidado de S6 es el espejo del aprendizaje de S2-S5.
        Recicla vocabulary y patrones del Reading Anchor (S2).
        Recicla estructuras gramaticales de PM-2.10 (S3).
        Recicla contenido auditivo de PM-2.6 (S4).
        Recicla funciones de PM-2.9 (S5).
      generates_evidence: true
      evidence_preview: |
        Evidencia 6: Consolidated Questionnaire / Knowledge Synthesis (Conocimiento)
        Técnica: Preguntas (evaluación sumativa)
        Instrumento: Cuestionario No 6 (25 ítems totales)
        Distribución: 5 Reading + 5 Writing + 5 Listening + 5 Vocabulary + 5 Grammar
      
    - session: 6_7_8
      fase_sena: "Transferencia — Proyecto Final"
      direct_hours: 15
      autonomous_hours: 3
      pms_active: ["PM-3.5", "Final Mission"]
      learning_focus: |
        Aplicación de todo el conocimiento técnico + inglés a un PROYECTO REAL.
        Resolución de problemas auténticos en contexto laboral.
        Elaboración de entregables: reporte técnico + presentación oral.
        Demostración de transferencia (aplicación fuera de aula).
      transversal_rap: "Inglés — Applied Technical Communication in Real Context"
      transversal_justification: |
        No se enseña inglés "sobre" el proyecto; el proyecto ES EN INGLÉS.
        El aprendiz lee documentación técnica en inglés (PM-3.5).
        El aprendiz escribe reportes en inglés (PM-3.5).
        El aprendiz presenta oralmente en inglés (PM-3.5).
        La evaluación del proyecto valida la integración RAP técnico + RAP inglés.
      generates_evidence: false
      evidence_preview: |
        Sin evidencias formales de GFPI-F-134 en este bloque.
        Las evidencias formales (6) se generaron en S2-S6 primera mitad.
        La transferencia (S6 2ª mitad, S7, S8) evalúa PROJECT COMPLETION,
        no criterios de evaluación del diseño.
  
  # VALIDACIÓN DE HORAS
  hours_validation:
    direct_hours:
      expected: 48
      actual: "6+6+6+6+6+3.75+15"
      sum: 48
      status: "✓ VÁLIDO"
    
    autonomous_hours:
      expected: 12
      actual: "1.5+1.5+1.5+1.5+1.5+0.75+3"
      sum: 12
      status: "✓ VÁLIDO"
    
    total_hours:
      expected: 60
      actual: 60
      status: "✓ VÁLIDO"
  
  # VALIDACIÓN DE CRITERIOS SENA
  criteria_validation:
    continuidad_integralidad: |
      ✓ CUMPLE: Cada sesión de S2-S5 cruza RAP técnico + RAP inglés.
      El inglés no es materia paralela; es MEDIO DE INSTRUCCIÓN (CLIL).
      S1 (reflexión bilingüe) → S2-S5 (aprendizaje técnico EN inglés) → 
      S6 (evaluación de síntesis) → S7-S8 (transferencia en proyecto).
    
    antecedente_consecuente: |
      ✓ CUMPLE: Secuencia Bloom ascendente:
      S1 (L1-2: recordar, comprender) → 
      S2-S3 (L2-3: comprender, aplicar) → 
      S4-S5 (L3-5: aplicar, analizar, evaluar) → 
      S6 (L2-3: evaluación sumativa) → 
      S7-S8 (L4-6: transferencia, creación).
    
    economia: |
      ✓ CUMPLE: Descripciones concisas. Cada sesión tiene
      objetivo claro (verbo observable), carga definida, PMs específicos.
    
    evidencias_alineadas: |
      ✓ CUMPLE: 6 evidencias distribuidas en S2-S6:
      - Evidencias #1-5: generadas en S2-S5 (apropiación)
      - Evidencia #6: cuestionario consolidado en S6
      - Cada evidencia responde a criterios de evaluación del RAP.
      - S7-S8 (transferencia) NO generan evidencias GFPI-F-134.

  # PREVISUALIZACIÓN DEL CUESTIONARIO S6
  cuestionario_preview:
    session: 6
    total_points: 25
    total_items: 25
    skills:
      - skill: "Reading"
        source_pm: "PM-2.3"
        source_session: 2
        points: 5
        items: 5
        description: "Preguntas sobre comprensión del Reading Anchor"
      
      - skill: "Writing"
        source_pm: "PM-2.4"
        source_session: 3
        points: 5
        items: 5
        description: "Ítems que evalúan control de estructura y vocabulario escrito"
      
      - skill: "Listening"
        source_pm: "PM-2.6"
        source_session: 4
        points: 5
        items: 5
        description: "Ítems de reconocimiento auditivo basados en audios de PM-2.6"
      
      - skill: "Vocabulary"
        source_pm: "PM-2.5"
        source_session: 2
        points: 5
        items: 5
        description: "5 de los 20 términos clave del Toolbelt en contexto"
      
      - skill: "Grammar"
        source_pm: "PM-2.10"
        source_session: 3
        points: 5
        items: 5
        description: "Estructura gramatical target en contexto técnico"

# RECOMENDACIONES AL INSTRUCTOR ANTES DE EJECUTAR PM-2.1
recommendations: |
  1. VERIFICAR ALINEACIÓN CURRICULAR:
     ¿Este Session Blueprint está alineado con el diseño curricular
     de SOFIA Plus para este programa? ¿Las 60 horas encajan en la
     planeación del instructor?
  
  2. CONFIRMAR DISPONIBILIDAD DE RECURSOS:
     ¿El centro de formación tiene ambientes (Aula, Virtual, Laboratorio)
     disponibles para todas las sesiones?
  
  3. ASIGNAR PARES DE PMs ACTIVOS:
     Cada sesión tiene 1-2 PMs activos. ¿El instructor tiene
     claridad de qué PM ejecutar en qué orden?
  
  4. LISTO PARA PM-2.1:
     Una vez aprobado este blueprint, ejecutar PM-2.1 (The Spark)
     para diseñar actividades de S1. Luego secuencial PM-2.2, PM-2.5, PM-2.3, etc.
```

---

## VALIDACIONES OBLIGATORIAS

Antes de entregar el Session Blueprint, verificar estos 6 checkpoints:

### ✓ Checkpoint 1: Horas Directas
```
Suma de direct_hours en S1-S8 = 48h exactos
Si ≠ 48h → ERROR — distribuir de nuevo
```

### ✓ Checkpoint 2: Horas Autónomas
```
Suma de autonomous_hours en S1-S8 = 12h exactos
Si ≠ 12h → ERROR — distribuir de nuevo
```

### ✓ Checkpoint 3: Secuencia Bloom
```
¿S1 < S2-S3 < S4-S5 < S6 < S7-S8 en demanda cognitiva?
¿Cada sesión presupone dominio de la anterior?
Si hay saltos: ajustar focus de sesiones
```

### ✓ Checkpoint 4: Continuidad Transversal
```
¿CADA sesión de S2-S5 tiene RAP transversal (inglés) explícito?
¿Se ve claramente CÓMO el inglés es medio, no materia paralela?
Si hay sesiones "puramente técnicas": ERROR — inyectar inglés
```

### ✓ Checkpoint 5: Distribución de Evidencias
```
¿6 evidencias están ubicadas en S2-S5 + S6?
¿S7-S8 NO tienen evidencias (transferencia limpia)?
¿Los ítems del cuestionario S6 cubren los 5 skills?
Si no: redistribuir PMs o actividades
```

### ✓ Checkpoint 6: Alineación PM-1.2
```
¿El blueprint honra los saberes de PM-1.2?
¿La secuencia de sesiones refleja antecedente-consecuente
de los saberes?
Si hay desalineación: ajustar learning_focus de sesiones
```

---

## INSTRUCCIÓN AL LLM

```
ACTÚA COMO: RAP Session Architect — Senior Curriculum Blueprint Designer.

Tu trabajo: Recibir el output completo del PM-1.2 (RAP con saberes, criterios, 
competencia) y producir el Session Blueprint que organiza las 8 sesiones de 
formación para ese RAP específico, ANTES de que se diseñen actividades individuales.

Sin tu Session Blueprint, los 10 PMs de Fase 2 no tienen donde ubicarse.
Tu output ES EL MAPA MAESTRO.

### DATOS DE ENTRADA:
- Competencia laboral (PM-1.2, columna 1)
- Código y nombre RAP (PM-1.2, columna 2)
- Saberes de Conceptos (PM-1.2, columna 3) — 8-10 ítems
- Saberes de Proceso (PM-1.2, columna 4) — 6-8 ítems
- Criterios de Evaluación (PM-1.2, columna 5) — 4-6 criterios
- Información del programa (opcional): nombre, código, nivel CEFR, contexto técnico

### INSTRUCCIONES:

1. ANALIZAR CARGA COGNITIVA:
   Inventariar saberes conceptuales de menor a mayor complejidad.
   Inventariar saberes de proceso en secuencias realizables.
   Mapear criterios contra saberes (1:1+).

2. DISTRIBUIR EN 8 SESIONES:
   Usar estructura fija: S1 (6h dir + 1.5h aut) × 8 sesiones = 60h total.
   Asignar PMs específicos a cada sesión según la tabla obligatoria.
   Validar horas: 48 directo, 12 autónomo.

3. MAPEAR TRANSVERSALES (INGLÉS):
   Para cada S2-S5, indicar:
   - ¿Qué inglés se enseña?
   - ¿Cómo se integra con el RAP técnico? (CLIL: medio, no materia)
   
   REGLA: Cada sesión de S2-S5 DEBE mostrar Continuidad e Integralidad.

4. IDENTIFICAR EVIDENCIAS:
   Ubicar las 6 evidencias obligatorias:
   - Evidencia 1: Reading (S2)
   - Evidencia 2: Writing (S3)
   - Evidencia 3: Listening (S4)
   - Evidencia 4: Speaking (S4)
   - Evidencia 5: Language Functions (S5)
   - Evidencia 6: Cuestionario consolidado (S6 1ª mitad)
   
   S7-S8 (transferencia): sin evidencias GFPI-F-134.

5. PRODUCIR BLUEPRINT:
   Generar YAML estructurado con:
   - Identidad del RAP
   - 8 sesiones con focus, PMs, horas, evidencias
   - Validación de horas
   - Validación de criterios SENA
   - Previsualización del cuestionario S6
   - Recomendaciones finales

6. VALIDAR:
   ✓ Horas directas = 48
   ✓ Horas autónomas = 12
   ✓ Bloom ascendente
   ✓ Continuidad transversal en S2-S5
   ✓ 6 evidencias distribuidas
   ✓ Alineación con PM-1.2

### RESTRICCIONES:
- Formato YAML limpio y legible
- Descripciones de learning_focus: máximo 200 caracteres
- Lenguaje: español (instrucción), ejemplos técnicos en inglés
- Tono: arquitectónico, preciso, sin ambigüedad
- Zero Meta-Talk: output listo para que el instructor lo entienda y apruebe
```

---

## EJEMPLO DE OUTPUT (Parcial)

Para un RAP ficticio sobre "Interpretación de Planos Técnicos en Inglés":

```yaml
session_blueprint:
  rap_id: "RAP-ADM-2024-001"
  rap_name: "Analizar planos técnicos en contexto industrial aplicando simbología normalizada"
  competencia: "Interpretar planos técnicos en contexto industrial..."
  
  total_hours: 60
  direct_hours: 48
  autonomous_hours: 12
  
  sessions:
    - session: 1
      fase_sena: "Reflexión Inicial + Contextualización"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.1", "PM-2.2"]
      learning_focus: "Activación sobre aplicación laboral de lectura de planos..."
      transversal_rap: "Inglés — Engagement, Academic Language for Technical Reflection"
      generates_evidence: false
      
    - session: 2
      fase_sena: "Apropiación — Input Receptivo"
      direct_hours: 6
      autonomous_hours: 1.5
      pms_active: ["PM-2.5", "PM-2.3"]
      learning_focus: "Vocabulario técnico + lectura de primer plano anotado..."
      transversal_rap: "Inglés — Technical Vocabulary, Reading of Annotated Diagrams (A1)"
      generates_evidence: true
      evidence_preview: "Evidencia 1 (Reading) + aporte al Quiz (Vocabulary)"
    
    # ... (sesiones 3-8)
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.2 | RAP completo (saberes, criterios, competencia) |
| **Alimenta a** | PM-2.1, PM-2.2, ... PM-2.10 | El blueprint dice qué PM ejecutar en qué sesión |
| **Alimenta a** | PM-2.11 | El blueprint valida que PM-2.x están bien distribuidos |
| **Consume** | PM-1.2 output | Columnas 1-5 de GFPI-F-134 |
| **Genera** | Session Blueprint | Input obligatorio antes de PM-2.1 |

---

*PM-2.0: RAP Session Architect*  
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*  
*Versión 2.0 — 2026-04-13*
