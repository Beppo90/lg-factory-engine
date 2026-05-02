---
pm_id: PM-2.0
name: RAP Session Architect · Heredero Cascade Tripartita
phase: 2
session: null
fase_sena: Pre-diseño
type: architect
version: 3.0
created: 2026-04-13
last_verified: 2026-05-02
status: v3.0 PARADIGM SHIFT · architect ya NO inventa distribución sesiones · HEREDA estructura tripartita de pm-1-1 v2.8 + scopes diferenciados de pm-1-2 v4.2 + criterios canon de matriz v1.3+ · cada sesión con tipo_bloque + _anclaje_matriz + _produces_evidencia mapping completo · 8 validation_checks BLOQUEANTES (6 v2.6 preservados + 2 NEW) · anti-prescriptive prompt operacional (cascade Step 1.4 IMARPOR-V2 · post PM-1.2 v4.2 v2)
inputs:
  - pm-1-1.json (v2.8+ · estructura tripartita validada · 6+ bloques con sesiones_anchor + _anclaje_matriz)
  - pm-1-2.json (v4.2+ · scope diferenciado por tipo_bloque · _produces_evidencia mapping E1-E6+E-Misión)
  - pm-0-0-matriz-alineada.json (v1.2+ · 8 criterios canon C01-C08 + saberes distribuidos)
  - pm-0-context.json (v3.2+ · universo + personajes + grammar focus)
  - pm-2-0-input.json (gates input · arquetipos elegidos opcional)
outputs:
  - pm-2-0.json maestro v3.0 (1 archivo · session_blueprint con N sesiones HEREDADAS · cada una con tipo_bloque + bloque_id_referencia + actividades_planeadas heredadas de pm-1-2 + traceability completa)
  - Catálogo arquetipos PM-2.1 a PM-2.10 (preservado v2.6)
depends_on: [pm-1-1.json v2.8+, pm-1-2.json v4.2+, pm-0-0-matriz-alineada.json v1.2+, pm-0-context.json v3.2+]
feeds_into: [PM-2.1, PM-2.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10, PM-2.11, PM-3.5]
v3_0_changes:
  - "NEW REGLA 7 input principal cascade tripartita (NO columnas sueltas)"
  - "NEW REGLA 8 distribución sesiones HEREDADA de pm-1-1.sesiones_anchor (NO hardcoded)"
  - "NEW REGLA 9 schema output diferenciado por tipo_bloque (3 tipos por sesión)"
  - "NEW REGLA 10 heredancia automática _anclaje_matriz + _produces_evidencia + _consumed_by_pm"
  - "NEW REGLA 11 anti-prescriptive prompt operacional (canon §10/§11/§12 PLAN-FASE-1)"
  - "NEW REGLA 12 traceability bidireccional canon"
  - "NEW 8 validation_checks (6 v2.6 preservados + 2 nuevos: tipo_bloque_consistente + traceability_heredada)"
  - "Distribución 8-sesiones-fijas v2.6 DEPRECATED (era para Técnico/Tecnológico hardcoded · v3.0 dinámico)"
v2_6_legacy_preserved:
  - "Catálogo 52 arquetipos PM-2.1-2.10 (Tabla-resumen)"
  - "6 checkpoints validación originales (incorporados en validation_checks v3.0)"
  - "Fases proceso arquitectura 1-6 (referencia · v3.0 las simplifica porque hereda)"
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

---

## EXTENSIÓN v3.0 — ARCHITECT HEREDERO CASCADE TRIPARTITA (2026-05-02)

> [!warning] PARADIGM SHIFT canonizado · Sergio Cortés decisión arquitectónica 2026-05-02
>
> PM-2.0 v2.6 inventaba la distribución de sesiones (estructura 8-sesiones-fijas hardcoded para Técnico/Tecnológico) y asignaba PMs por sesión preset. v3.0 canoniza que el architect ya **NO inventa nada** · es un **secuenciador temporal** que HEREDA estructura tripartita de pm-1-1 v2.8 + scopes diferenciados de pm-1-2 v4.2 + criterios canon de matriz v1.2+.
>
> **Razón:** Sergio canonizó (2026-05-02 Step 1.4 IMARPOR-V2) que después del cascade v3.x (PM-0.0 → PM-0 → PM-1.1 v2.8 → PM-1.2 v4.2) cada bloque tripartito YA tiene `sesiones_anchor` + `pms_destino` + `_anclaje_matriz` + cada elemento de scope YA tiene `_produces_evidencia` + `_consumed_by_pm`. PM-2.0 v3.0 SOLO los expande a un blueprint sesión-a-sesión con traceability completa. Cero invención.

### REGLA 7 — INPUT PRINCIPAL · CASCADE TRIPARTITA

PM-2.0 v3.0 consume como input PRIMARIO los outputs cascade v3.x:

```json
{
  "pm_1_1_ref": "pm-1-1.json (v2.8+ · estructura tripartita validada · sesiones_anchor por bloque)",
  "pm_1_2_ref": "pm-1-2.json (v4.2+ · scope diferenciado por tipo_bloque · _produces_evidencia mapping)",
  "pm_0_0_matriz_ref": "pm-0-0-matriz-alineada.json (v1.2+ · criterios canon C01-C08 + saberes distribuidos)",
  "pm_0_context_ref": "pm-0-context.json (v3.2+ · universo + personajes + grammar focus)"
}
```

**PM-2.0 NO inventa.** PM-2.0 NO redistribuye sesiones. PM-2.0 NO asigna PMs preset. SOLO secuencia temporal con traceability heredada.

### REGLA 8 — DISTRIBUCIÓN SESIONES HEREDADA (NO HARDCODED)

v2.6 tenía estructura fija 8 sesiones (S1=apertura · S2-S5=apropiación · S6=eval · S6½-S8=transferencia). **v3.0 NO usa estructura fija.** En v3.0:

- Total sesiones = `programa.sesiones_count` heredado de pm-1-1 (12 CC · 8 técnico · 16 tecnológico · etc.)
- Cada sesión `Sn` tiene un `bloque_id_referencia` que apunta al bloque pm-1-1 que contiene `Sn` en su `sesiones_anchor`
- Cada sesión hereda `tipo_bloque` de su bloque referenciado (APERTURA · APROPIACION · TRANSFERENCIA)
- Las sesiones APROPIACIÓN además heredan `rap_target` del bloque

**Ejemplo IMARPOR-V2 (12 sesiones):**

```
S1  ← B0 APERTURA       (bloque B0.sesiones_anchor incluye S1)
S2  ← B1 APROPIACION RA1 (bloque B1.sesiones_anchor incluye S2)
S3  ← B1 APROPIACION RA1 (S3 también en B1)
S4  ← B1 APROPIACION RA1 (S4 también en B1)
S5  ← B2 APROPIACION RA2 (S5 en B2)
S6  ← B2 APROPIACION RA2 (S6 en B2)
S7  ← B3 APROPIACION RA3
S8  ← B3 APROPIACION RA3
S9  ← B4 APROPIACION RA4
S10 ← B4 APROPIACION RA4
S11 ← BT TRANSFERENCIA  (BT.sesiones_anchor=[S11,S12])
S12 ← BT TRANSFERENCIA
```

**Para Técnico** (8 sesiones × 7.5h): heredada similarmente desde pm-1-1 técnico (S1=APERTURA · S2-S7=APROPIACIÓN según RAPs · S8=TRANSFERENCIA). **Para Tecnológico** (16 sesiones): idem 16.

### REGLA 9 — SCHEMA OUTPUT DIFERENCIADO POR `tipo_bloque`

Cada sesión en `session_blueprint` tiene schema diferente según el `tipo_bloque` del bloque heredado:

#### Schema sesión APERTURA

```jsonc
{
  "sesion_id": "S1",
  "tipo_bloque": "APERTURA",
  "bloque_id_referencia": "B0",
  "rap_target": null,
  "transversal": true,
  "horas_directas": 6,
  "pms_destino_canon": ["PM-2.1", "PM-2.2"],   // heredado de pm-1-1.B0.pms_destino
  "actividades_planeadas": [
    {
      "ref_pm12_path": "sub_bloques_tripartitos[0].materiales_spark[0]",
      "consumed_by_pm": "PM-2.1",
      "tipo": "spark_motivacional",
      "_produces_evidencia": null,
      "_anclaje_matriz_heredado": { /* heredado de pm-1-2.B0.materiales_spark[0]._anclaje_matriz */ }
    }
    // ... 4 actividades total (2 PM-2.1 + 2 PM-2.2)
  ]
}
```

#### Schema sesión APROPIACIÓN

```jsonc
{
  "sesion_id": "S3",
  "tipo_bloque": "APROPIACION",
  "bloque_id_referencia": "B1",
  "rap_target": "RA1",
  "transversal": false,
  "horas_directas": 6,
  "pms_destino_canon": ["PM-2.3", "PM-2.4", "PM-2.5", "PM-2.6", "PM-2.8", "PM-2.9", "PM-2.10"],   // subset según actividades de la sesión
  "criterios_canon_evaluables_en_sesion": ["C01"],   // canon S3 = E1 Reading
  "actividades_planeadas": [
    {
      "ref_pm12_path": "sub_bloques_tripartitos[1].story_a_reading",
      "consumed_by_pm": "PM-2.3",
      "tipo": "reading_anchor",
      "_produces_evidencia": "E1",
      "_anclaje_matriz_heredado": { /* heredado · saberes_que_demanda + criterios_canon_que_evalua */ }
    },
    {
      "ref_pm12_path": "sub_bloques_tripartitos[1].key_vocabulary_per_rap",
      "consumed_by_pm": "PM-2.5",
      "tipo": "vocabulary_scaffold",
      "_produces_evidencia": null
    }
  ]
}
```

#### Schema sesión TRANSFERENCIA

```jsonc
{
  "sesion_id": "S12",
  "tipo_bloque": "TRANSFERENCIA",
  "bloque_id_referencia": "BT",
  "rap_target": null,
  "transversal": true,
  "capstone": true,
  "horas_directas": 6,
  "pms_destino_canon": ["PM-3.5"],
  "actividades_planeadas": [
    {
      "ref_pm12_path": "sub_bloques_tripartitos[5].mission_brief",
      "consumed_by_pm": "PM-3.5",
      "tipo": "abp_capstone_evaluacion",
      "subfase_abp": [3, 4, 5],   // Desempeño + Presentación + Eval reflexiva
      "_produces_evidencia": "E-Misión",
      "_anclaje_matriz_heredado": { "criterio_canon_capstone": "C08" }
    }
  ]
}
```

### REGLA 10 — HEREDANCIA AUTOMÁTICA TRACEABILITY

PM-2.0 v3.0 NO recrea ni reescribe metadatos de traceability. SOLO los **copia literal** de pm-1-2.json al campo `_anclaje_matriz_heredado` de cada `actividad_planeada`. Cada actividad mantiene:

- `ref_pm12_path`: ruta JSON al elemento original en pm-1-2.json (e.g., `sub_bloques_tripartitos[1].story_a_reading`)
- `consumed_by_pm`: copiado literal de `pm-1-2.{path}._consumed_by_pm`
- `_produces_evidencia`: copiado literal de `pm-1-2.{path}._produces_evidencia` (E1-E6+E-Misión o null)
- `_anclaje_matriz_heredado`: copiado literal de `pm-1-2.{path}._anclaje_matriz`

**ZERO invención.** Si pm-1-2 tiene drift, PM-2.0 hereda drift (auditoría upstream resuelve).

### REGLA 11 — PROMPT OPERACIONAL DEBE RESPETAR LIBERTAD LIMITADA POR CANON

El orchestrator que dispatchea Agent ejecutando PM-2.0 v3.0 DEBE:

SÍ pasar al Agent:
- Master prompt PM-2.0 v3.0 (REGLAS 7-12)
- pm-1-1.json v2.8+ (estructura tripartita)
- pm-1-2.json v4.2+ (scope diferenciado)
- matriz v1.2+ (canon)
- pm-0-context.json v3.2+ (universo)
- 8 validation_checks BLOQUEANTES
- Bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LIMITADA"

NO pasar al Agent:
- Distribución sesiones pre-decidida (LLM hereda de pm-1-1.sesiones_anchor)
- PMs por sesión preset (LLM hereda de pm-1-1.bloques.pms_destino + pm-1-2.elementos._consumed_by_pm)
- Evidencias mapping inventado (LLM hereda literal)

**LIBERTAD LIMITADA del LLM** (vs PM-1.1/1.2 que tenían libertad amplia):
- Cómo presenta el output JSON (orden de campos · agregar campos auxiliares)
- Agregar `_rationale_secuenciacion_temporal` por sesión explicando por qué qué actividad va en qué momento dentro de las 6h
- Agregar `_decisiones_analiticas_significativas` documentando ajustes
- Cómo distribuye actividades pm-1-2 dentro de las 6h de la sesión (si hay 2 actividades planeadas · LLM decide cuál primero)

**SIN LIBERTAD** (canon estricto):
- Estructura tripartita (heredada)
- Distribución sesiones (heredada)
- Asignación PMs por sesión (heredada)
- `_anclaje_matriz` + `_produces_evidencia` (heredados literal)

### REGLA 12 — TRACEABILITY BIDIRECCIONAL CANON

Cada sesión del session_blueprint v3.0 DEBE poder responder estas preguntas SIN inventar:

**Hacia atrás (¿de dónde viene esta sesión?):**
- ¿Qué bloque tripartito la contiene? → `bloque_id_referencia`
- ¿Qué tipo es? → `tipo_bloque`
- ¿Qué saberes demanda? → unión de `_anclaje_matriz_heredado.saberes_que_demanda` de todas sus actividades

**Hacia adelante (¿adónde va esta sesión?):**
- ¿Qué evidencias produce? → unión de `_produces_evidencia` non-null de sus actividades
- ¿Qué PMs downstream consumen estos insumos? → unión de `_consumed_by_pm`
- ¿Qué criterios canon se pueden evaluar aquí? → `criterios_canon_evaluables_en_sesion`

### REGLA 13 — VALIDATION POST-GENERATION · 8 CHECKS

```jsonc
"validation_checks": [
  // 6 preservados v2.6 (re-formulados v3.0):
  {"id": 1, "name": "horas_directas_match_pm11", "status": "PASS|FAIL", "evidence": "..."},   // sum sesiones = total directo pm-1-1
  {"id": 2, "name": "horas_autonomas_balanceadas", "status": "..."},
  {"id": 3, "name": "secuencia_bloom_progresiva", "status": "..."},   // L1→L2-3→L4-6 a través de tipo_bloque
  {"id": 4, "name": "continuidad_transversal_apertura_transferencia", "status": "..."},
  {"id": 5, "name": "distribucion_evidencias_canon_respetada", "status": "..."},   // E1@S3 · E2@S4 · etc. canon
  {"id": 6, "name": "alineacion_pm12_actividades_planeadas", "status": "..."},
  // 2 NEW v3.0:
  {"id": 7, "name": "tipo_bloque_consistente_por_sesion", "status": "..."},   // cada sesión hereda tipo del bloque pm-1-1
  {"id": 8, "name": "traceability_heredada_completa", "status": "..."}        // cada actividad con _anclaje_matriz_heredado + _produces_evidencia non-empty
]
```

Si CUALQUIER check FAIL · output marcado `enriched: false` · BLOQUEANTE para Step 1.5 (PM-2.x downstream).

### REGLA 14 — ESTRUCTURA OUTPUT pm-2-0.json v3.0 (1 ARCHIVO MAESTRO)

```jsonc
{
  "pm_id": "PM-2.0",
  "pm_name": "RAP Session Architect · Heredero Cascade Tripartita",
  "pm_version": "3.0",
  "run_id": "...",
  "generated_date": "...",

  "_pm11_ref": "pm-1-1.json (v2.8+)",
  "_pm12_ref": "pm-1-2.json (v4.2+)",
  "_pm00_matriz_ref": "pm-0-0-matriz-alineada.json (v1.2+)",

  "programa": {
    "denominacion": "...",
    "tipo": "Curso Complementario|Técnico|Tecnológico|Curso Especial",
    "sesiones_count": 12,
    "horas_por_sesion": 6,
    "horas_directas_total": 72
  },

  "session_blueprint": [
    /* 1 entry por sesión · schema diferenciado según tipo_bloque heredado */
    /* S1 APERTURA · S2-S(N-2) APROPIACIÓN · S(N-1)-SN TRANSFERENCIA */
  ],

  "evidencias_secuencia_temporal": {
    /* Resumen E1-E6+E-Misión con sesión donde se produce + bloque + criterio canon */
    "E1": {"sesion": "S3", "bloque": "B1", "rap": "RA1", "criterio_canon": "C01", "pm": "PM-2.3"},
    "E2": {"sesion": "S4", "bloque": "B1", "rap": "RA1+RA3", "criterio_canon": "C02", "pm": "PM-2.4"},
    /* ... E3-E6 + E-Misión */
  },

  "validation_checks": [...],
  "enriched": true|false
}
```

### REGLA 15 — DEPRECATION PATH v2.6 → v3.0

Programas con `pm-2-0.json` v2.6 (8 sesiones hardcoded · sin tipo_bloque · sin heredancia):
- KEEP archivos legacy en run dir como `*.legacy-pre-fix-v3-0`
- Generar nuevo pm-2-0.json v3.0 cuando se re-run el programa post-Phase 1 cascade
- Run resultante puede tener AMBOS: legacy v2.6 + v3.0

---

## ESTRUCTURA OPERACIONAL v3.0 (resumen ejecutivo)

```
pm-1-1.json v2.8+ (estructura tripartita 6+ bloques con sesiones_anchor + _anclaje_matriz)
  +
pm-1-2.json v4.2+ (scope diferenciado · cada elemento con _produces_evidencia + _consumed_by_pm + _anclaje_matriz)
  +
pm-0-0-matriz-alineada.json v1.2+ (8 criterios canon C01-C08)
  +
pm-0-context.json v3.2+ (universo + personajes)
  ↓
PM-2.0 v3.0 dispatcher (Agent · libertad LIMITADA · solo secuenciación temporal)
  ↓
pm-2-0.json v3.0 maestro (1 archivo)
  ├─ programa metadata
  ├─ session_blueprint (N sesiones · cada una con tipo_bloque + bloque_id_referencia + actividades_planeadas heredadas + _anclaje_matriz_heredado)
  ├─ evidencias_secuencia_temporal (E1-E6+E-Misión mapping)
  └─ validation_checks (8 BLOQUEANTES)
  ↓
Step 1.5 PM-2.x downstream (PM-2.1 a PM-2.10 + PM-2.11 + PM-3.5 · cada uno hereda su sesión target)
```

---

## CASO OPERACIONAL CONFIRMADO (pendiente Step 1.4.D dispatch IMARPOR-V2)

**Input esperado IMARPOR-V2:**
- pm-1-1.json v2.8 v2 CORREGIDA · 6 bloques tripartitos · 9/9 PASS
- pm-1-2.json v4.2 v2 CORREGIDA · 1 meta + 6 sub_bloques · 6/6 PASS · 23 elementos productores
- matriz v1.3 CORREGIDA · 4 RAPs · 8 criterios canon · 8/8 PASS

**Output esperado pm-2-0.json v3.0:**
- 12 sesiones (S1-S12) · cada una con tipo_bloque + bloque_id_referencia + actividades_planeadas heredadas
- S1 APERTURA · pm-2.1 + pm-2.2 (4 arquetipos)
- S2-S4 APROPIACIÓN B1 RA1 · pm-2.3 (E1 S3) + pm-2.4 (E2 S4) + pm-2.5 + pm-2.10
- S5-S6 APROPIACIÓN B2 RA2 · pm-2.6 (E3 S5) + pm-2.8 (E4-parcial S6) + pm-4.2 (E6 S6)
- S7-S8 APROPIACIÓN B3 RA3 · pm-2.8 (E4-final S8) + pm-2.10
- S9-S10 APROPIACIÓN B4 RA4 · pm-2.9 (E5 S9) + rehearsal S10
- S11-S12 TRANSFERENCIA · pm-3.5 (E-Misión S12)
- 8/8 validation_checks PASS

---

*PM-2.0 v3.0 · RAP Session Architect Heredero Cascade Tripartita · cero invención · secuenciador temporal · traceability bidireccional canon*
*Sergio Cortés decisión arquitectónica 2026-05-02 · cascade Phase 1→2 boundary IMARPOR-V2 · post PM-1.2 v4.2 v2 corregida*
