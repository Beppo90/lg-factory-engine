---
type: data-contract
version: 3.0
created: 2026-04-13
last_verified: 2026-05-02
last_updated: 2026-05-02
status: active
v3_0_changes:
  - "NEW dimension enum {cognitiva · procedimental · actitudinal} · UNA dimensión por activity card (canon Sergio 2026-05-02)"
  - "NEW activities[].descripcion multi-párrafo 200-600 palabras · panorama→orientación→equipos→práctica→cierre (canon Sergio 3 ejemplos guía SENA real)"
  - "NEW material_apoyo array de objetos {descripcion, link} · múltiples permitidos · array vacío [] si NO aplica → render 'No aplica' literal"
  - "NEW evidencia.nombre · nombre específico legible (no solo tipo · ej 'Códigos de comunicación portuaria')"
  - "NEW numero_actividad · numeración secuencial acumulada a nivel guía completa (referencia para aprendiz)"
  - "NEW estrategias_didacticas_activas + tecnicas_didacticas como array (incluso si tiene 1 elemento · simplifica renderer)"
  - "NEW ambiente como texto operacional compuesto (NO solo enum · puede ser 'Ambiente pluritecnológico o simulado...')"
  - "NEW heredancia traceability obligatoria: _anclaje_matriz_heredado + _produces_evidencia + _consumed_by_pm + _ref_pm12_path + _ref_pm20_session"
  - "NEW reglas condicionales por tipo_bloque: APERTURA + TRANSFERENCIA → evidencias.aplica=false (render 'No aplica') · APROPIACIÓN puede ser true o false (scaffolds NO · anchors SÍ)"
  - "v2.0/v2.6.3/v2.7 PRESERVADOS como REFERENCIA legacy (back-compat para runs anteriores)"
canon_origin:
  - "Sergio Cortés Perdomo dictó schema canon 2026-05-02 con 3 ejemplos literal de guía aprendizaje SENA modelo (códigos portuarios + riesgos SST + inspección apilador)"
  - "Renombrado activities[].type → activities[].dimension (canon SENA V+O+C dimensiones del aprendizaje)"
  - "Schema v3.0 alineado con cascade Phase 1 v3.x (PM-0.0 v1.2+ + PM-0 v3.2+ + PM-1.1 v2.8+ + PM-1.2 v4.2+ + PM-2.0 v3.0+)"
---

# Activity Card — Schema

> **⚠️ TRES SCHEMAS COEXISTEN EN ESTE DOCUMENTO**
>
> A partir de v2.7 este contrato cubre **tres activity cards distintas**, con roles y consumidores diferentes. No confundir:
>
> | Schema | Dónde vive | Productor | Consumidor | Propósito |
> |---|---|---|---|---|
> | **Activity Card v2.0 (Fase 2, GFPI-F-134)** | Output de cada PM-2.x | PM-2.1..PM-2.10 | PM-2.11 (Row Assembler) | Ensamblar fila GFPI-F-134 columnas 6-10 |
> | **Activity Card v2.6.3 (Fase 4, Learner-Facing)** | `pm-3-6.json.seccion_3_actividades_aprendizaje[*]` | PM-3.6 (GFPI-F-135 Integrator) | `gen_audit_docx.js` → DOCX del aprendiz | Renderizar la actividad con workspace embebido (scaffold_inline) |
> | **Activity Card v2.7 (Fase 4, Learner-Readable)** | `pm-3-6.json.seccion_3_actividades_aprendizaje[*]` con `schema_version: "v2.7"` | PM-3.6 (GFPI-F-135 Integrator) | `pm-3-6-new-gen.js` / `gen_audit_docx.js` → DOCX del aprendiz | Anatomía de 6 bloques Learner-Readable (V+O+C + narrativa + pasos + entregable + evidencia + footer), inspirada en canon SENA-apilador |
>
> - **Secciones 1–8** documentan el schema v2.0 (GFPI-F-134 feed). Sigue vigente sin cambios.
> - **Sección 9 (v2.6.3)** documenta el schema learner-facing con `scaffold_inline` embebido. Sigue vigente para runs legacy.
> - **Sección 10 (nueva en v2.7)** documenta el schema Learner-Readable de 6 bloques. Es el contrato canónico que rige lo que el aprendiz ve renderizado en la Guía del Aprendiz a partir de 2026-04-21. Extensión evolutiva de v2.6.3 — preserva `scaffold_inline`, `entregable`, `activity_footer`; reenmarca el encabezado (V+O+C) y la descripción (narrativa estilo prólogo); promueve `evidencia` a bloque propio.

## Propósito

La Activity Card es el **output estructurado que todo PM-2.x debe emitir** (además de su contenido pedagógico principal). No es un documento separado sino un fragmento de datos en formato YAML/JSON que especifica:

- Qué actividad(es) pedagógica(s) este PM genera
- Cuánto tiempo toma (directo e independiente)
- Qué estrategias y técnicas didácticas se emplean
- Si (y cómo) contribuye a evidencias de evaluación
- Qué ambiente, materiales e instructores requiere

**Propósito funcional:**  
La Activity Card es el "trozo de fila GFPI-F-134" que este PM produce. Es la interfaz entre cada PM-2.x y el ensamblador final (PM-2.11). Sin Activity Cards estructuradas, PM-2.11 no puede producir filas coherentes.

**Productor:** Cada PM-2.x (PM-2.1 hasta PM-2.10)  
**Consumidor:** PM-2.11 (Row Assembler) → ensambla todas las Activity Cards en una fila GFPI-F-134  
**Consumidor secundario:** PM-4.1 (Instrumentos de Evaluación) → usa especificaciones de evidencia para elaborar cuestionarios  
**Consumidor terciario:** PM-4.2 (Question Bank Consolidado) → recibe ítems para el cuestionario S6

---

## Schema Completo de la Activity Card

```yaml
activity_card:
  
  # === IDENTIDAD ===
  pm_id: "PM-2.x"
  pm_name: ""
  session: 1                    # sesión dentro del RAP (1-8)
  phase_sena: ""               # "Reflexión Inicial" | "Contextualización" | 
                                # "Apropiación" | "Transferencia"
  rap_id: ""                   # ID único del RAP del PM-1.2 al que pertenece
  
  # === ACTIVIDADES (Columna 6 de GFPI-F-134) ===
  activities:
    - number: 1
      type: ""                 # "cognitiva" | "procedimental"
      statement: ""            # "Verbo infinitivo + objeto + condición"
                                # máximo 120 caracteres
      didactic_strategy: ""    # Una de: ABP, Aprendizaje colaborativo, 
                                # Aprendizaje basado en proyectos, 
                                # Trabajo colaborativo, TBLT, Simulación, 
                                # Juego de roles, Investigación guiada, 
                                # Content-Based Learning, CLIL
      didactic_technique: ""   # Una o dos de: Dramatización, Exposición y debate,
                                # Simulación, Investigación guiada, Práctica de campo,
                                # Taller, Conversatorio, Análisis de casos, 
                                # Lluvia de ideas, Mapas conceptuales, Juegos 
                                # educativos, Role play, Jigsaw, Think-Pair-Share, 
                                # Panel discussion
  
  # === HORAS (Columna 7 de GFPI-F-134) ===
  hours:
    direct: 0                  # horas trabajo directo para este PM (parte de 48h total)
    autonomous: 0              # horas trabajo independiente para este PM (parte de 12h total)
  
  # === EVIDENCIA (Columna 8 de GFPI-F-134) ===
  # REGLA CRÍTICA: Solo si phase_sena == "Apropiación"
  evidence:
    generates_evidence: false  # true SOLO si phase_sena == "Apropiación"
    type: null                 # "Conocimiento" | "Desempeño" | "Producto" | null
    description: ""            # descripción breve ≤ 250 caracteres (si aplica)
    evaluation_technique: ""   # "Preguntas" | "Observación" | "Verificación del producto" | null
    instrument_number: null    # número del instrumento: 1-6 (si aplica)
    instrument_type: ""        # "Cuestionario" | "Lista de Chequeo" | 
                                # "Lista de verificación" | "Escala de estimación" | null
  
  # === AMBIENTE (Columna 10 de GFPI-F-134) ===
  environment:
    type: ""                   # "Aula" | "Laboratorio" | "Virtual" | 
                                # "Campo/Contextual" | "Híbrido"
    materials: []              # lista de materiales específicos de formación
    instructors: ""            # nombre o rol del instructor responsable
  
  # === METADATA PARA CUESTIONARIO CONSOLIDADO ===
  # (Aplica solo si phase_sena == "Apropiación" y hay ítems para S6)
  contributes_to_consolidated_quiz: false  # true si este PM aporta ítems al 
                                            # cuestionario S6
  quiz_skill: ""               # "Reading" | "Writing" | "Listening" | 
                                # "Vocabulary" | "Grammar" | 
                                # "Language Functions" | null
  quiz_points: 0              # Siempre 5 si aporta, siempre 0 si no aporta
  quiz_item_count: 0          # Número de ítems que este PM proporciona (típicamente 5)
  
  # === ACTIVITY FOOTER (v2.6, opcional aquí — obligatorio en PM-3.5 / PM-3.6) ===
  # Principio 7 del DM §3. Los 6 campos se requieren al pie de CADA actividad
  # renderizada al aprendiz en PM-3.5 (5 sub-fases ABP) y PM-3.6 (todas las
  # actividades de §3 Actividades de Aprendizaje). En Activity Card este bloque
  # es opcional — si se emite aquí, el script enrich_activity_footers.js lo lee
  # directamente; si no, se construye desde environment + didactic_strategy +
  # didactic_technique + hours.
  activity_footer:
    ambiente: ""               # Ej: "Ambiente convencional (aula con mesas agrupadas)"
    estrategia: ""             # Ej: "Aprendizaje Basado en Proyectos (ABP)"
    tecnica: ""                # Ej: "Mesa redonda", "Toolbelt walk-through"
    materiales: ""             # Ej: "Papel bond, lapiceros, diccionario ilustrado"
    material_apoyo: ""         # URL (unsplash/pinterest/behance/youtube) o "no aplica"
    duracion_horas: ""         # Ej: "1.75 horas" (cuarto de hora mínimo)
```

### Detalles de cada sección

#### Identidad
```yaml
pm_id: "PM-2.3"                    # ID del PM que emite esta card
pm_name: "Reading — The Master Anchor"
session: 2                         # Sesión dentro del RAP (1-8)
phase_sena: "Apropiación"         # Fase SENA a la que pertenece
rap_id: "RAP-ING-001-2026"        # ID único del RAP (ej: RAP-[ESPECIALIDAD]-[NUM]-[AÑO])
```

#### Actividades
```yaml
activities:
  - number: 1
    type: "cognitiva"              # Actividades de PM-2.3 son cognitivas
    statement: "Analizar estructura y contenido de texto técnico en inglés usando estrategia SQ3R"
    didactic_strategy: "Content-Based Learning"
    didactic_technique: "Investigación guiada"
  
  - number: 2
    type: "cognitiva"
    statement: "Completar matriz de comprensión sobre temas clave del texto técnico"
    didactic_strategy: "Aprendizaje colaborativo"
    didactic_technique: "Jigsaw"
```

#### Horas
```yaml
hours:
  direct: 2                        # PM-2.3 usa 2 horas de las 48h directas
  autonomous: 0.5                  # PM-2.3 requiere 0.5 horas de estudio independiente
```

#### Evidencia
```yaml
evidence:
  generates_evidence: true         # PM-2.3 de S2 (Apropiación) sí genera evidencia
  type: "Conocimiento"             # Es una evidencia de conocimiento (comprensión)
  description: "El aprendiz demuestra comprensión de textos técnicos en inglés respondiendo preguntas de nivel literal e inferencial"
  evaluation_technique: "Preguntas"
  instrument_number: 1             # Instrumento No 1 de GFPI-F-134
  instrument_type: "Cuestionario"
```

#### Ambiente
```yaml
environment:
  type: "Aula"
  materials:
    - "Proyector"
    - "Computadores con navegador"
    - "Plataforma Moodle acceso a textos técnicos"
    - "Plantilla SQ3R impresa"
  instructors: "Instructor de inglés técnico"
```

#### Metadata para Cuestionario
```yaml
contributes_to_consolidated_quiz: true
quiz_skill: "Reading"              # PM-2.3 aporta ítems de Reading al cuestionario S6
quiz_points: 5                     # Contribuye 5 puntos de los 25 totales
quiz_item_count: 5                 # Proporciona 5 ítems al cuestionario consolidado
```

---

## Mapeo Completo: PM → Sesión → Evidencia → Cuestionario

Tabla de referencia que especifica qué PM genera qué evidencia y cómo aporta al cuestionario consolidado de S6.

| # | PM | Nombre Oficial | Sesión | Fase SENA | Tipo Actividad | Genera Evidencia | Tipo Evidencia | Instrumento | Aporta al Quiz S6 | Skill Quiz | Pts |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | PM-2.0 | RAP Session Architect | — | — | — | No | — | — | No | — | 0 |
| 2 | PM-2.1 | The Spark | 1 | Reflexión Inicial | Cognitiva | No | — | — | No | — | 0 |
| 3 | PM-2.2 | Gap Analysis | 1 | Contextualización | Cognitiva | No | — | — | No | — | 0 |
| 4 | PM-2.3 | Reading — The Master Anchor | 2 | Apropiación | Cognitiva | **Sí** | Conocimiento | Cuestionario No 1 | Sí | Reading | 5 |
| 5 | PM-2.4 | Writing — Task-Based | 3 | Apropiación | Procedimental | **Sí** | Producto | Lista de verificación No 2 | Sí | Writing | 5 |
| 6 | PM-2.5 | Vocabulary, Literacy & Scenario Setup | 2 | Apropiación | Cognitiva | No (scaffolding) | — | — | Sí | Vocabulary | 5 |
| 7 | PM-2.6 | Listening — The Auditory Anchor | 4 | Apropiación | Procedimental | **Sí** | Desempeño | Cuestionario No 3 + Lista de Chequeo | Sí | Listening | 5 |
| 8 | PM-2.7 | Pronunciation — Speaking Skills | — | DEPRECATED | — | — | — | — | — | — | 0 |
| 9 | PM-2.8 | Speaking — The Mission | 4 | Apropiación | Procedimental | **Sí** | Desempeño | Escala de estimación No 4 | No | — | 0 |
| 10 | PM-2.9 | Language Functions & Communicative Competence | 5 | Apropiación | Procedimental | **Sí** | Desempeño | Escala de estimación No 5 | Sí | Language Functions | 5 |
| 11 | PM-2.10 | Grammar — Structure Use | 3 | Apropiación | Cognitiva | No (scaffolding) | — | — | Sí | Grammar | 5 |
| 12 | PM-2.11 | GFPI-F-134 Row Assembler | — | — | — | No | — | — | No | — | 0 |

**Explicación de columnas:**
- **PM / Nombre:** Identificador y título del PM
- **Sesión:** En qué sesión del RAP se ejecuta (1-8, o — si transversal)
- **Fase SENA:** Reflexión Inicial, Contextualización, Apropiación, Transferencia
- **Tipo Actividad:** Cognitiva (teoría, análisis) o Procedimental (ejecución, comunicación)
- **Genera Evidencia:** Sí si es actividad de Apropiación, No si es reflexión, contextualización o transferencia
- **Tipo Evidencia:** Conocimiento (saber qué), Desempeño (capacidad de hacer), Producto (artefacto creado)
- **Instrumento:** Cuestionario, Lista de Chequeo, Lista de verificación, Escala de estimación
- **Aporta al Quiz S6:** Sí si sus contenidos van al cuestionario consolidado, No si no
- **Skill Quiz:** Reading, Writing, Listening, Vocabulary, Grammar, Language Functions (solo si aporta)
- **Pts:** Puntos que aporta al cuestionario consolidado (5 si aporta, 0 si no)

**Total de puntos en cuestionario S6:** 5 + 5 + 5 + 5 + 5 = **25 puntos**

**Ítems en cuestionario S6:** 5 + 5 + 5 + 5 + 5 = **25 ítems** (distribución orientativa: 5 por skill)

---

## Reglas de Validación Obligatorias

Antes de que PM-2.11 acepte una Activity Card, debe pasar estos 7 checks:

### 1. Validación de Identidad
```
✓ pm_id está entre PM-2.1 y PM-2.10 (PM-2.0 y PM-2.11 no emiten Activity Cards)
✓ phase_sena ≠ nulo
✓ rap_id ≠ nulo y tiene formato "RAP-[CODE]-[NUM]-[AÑO]"
```

### 2. Validación de Actividades
```
✓ activities[] no está vacío
✓ activities[] tiene 1-3 elementos (máximo 3 por PM)
✓ Cada activity.statement cumple: Verbo infinitivo + objeto + condición
✓ Cada activity.statement ≤ 120 caracteres
✓ type ∈ {"cognitiva", "procedimental"}
✓ didactic_strategy está en lista permitida
✓ didactic_technique está en lista permitida
```

### 3. Validación de Horas
```
✓ hours.direct ≥ 0
✓ hours.autonomous ≥ 0
✓ hours.direct + hours.autonomous ≤ 12 (máximo horas que este PM puede usar)
```

### 4. Validación de Evidencia (CRÍTICO)
```
SI phase_sena == "Apropiación":
  ✓ generates_evidence DEBE SER true (excepto PM-2.5 y PM-2.10 que son scaffolding)
  ✓ evidence.type ≠ null (Conocimiento | Desempeño | Producto)
  ✓ evidence.description ≤ 250 caracteres
  ✓ evidence.evaluation_technique ∈ {"Preguntas", "Observación", "Verificación del producto"}
  ✓ evidence.instrument_number ∈ {1, 2, 3, 4, 5, 6}
  ✓ evidence.instrument_type ∈ {"Cuestionario", "Lista de Chequeo", "Lista de verificación", "Escala de estimación"}

SI phase_sena ≠ "Apropiación":
  ✓ generates_evidence DEBE SER false
  ✓ evidence.type DEBE SER null
  ✓ evidence.description DEBE SER ""
  ✓ evidence.evaluation_technique DEBE SER ""
  ✓ evidence.instrument_number DEBE SER null
```

### 5. Validación de Ambiente
```
✓ environment.type ∈ {"Aula", "Laboratorio", "Virtual", "Campo/Contextual", "Híbrido"}
✓ environment.materials[] no está vacío
✓ Cada material es específico (no genérico: ej "Computadora con CAD v2024" no "computadora")
✓ environment.instructors ≠ ""
```

### 6. Validación de Cuestionario (CRÍTICO)
```
SI contributes_to_consolidated_quiz == true:
  ✓ quiz_skill ∈ {"Reading", "Writing", "Listening", "Vocabulary", "Grammar", "Language Functions"}
  ✓ quiz_points == 5 (SIEMPRE 5, nunca otro número)
  ✓ quiz_item_count == 5 (SIEMPRE 5 ítems por skill)

SI contributes_to_consolidated_quiz == false:
  ✓ quiz_skill == ""
  ✓ quiz_points == 0
  ✓ quiz_item_count == 0
```

### 7. Validación de Consistencia Cruzada (PM-2.11 valida esto)
```
Sumando todas las Activity Cards de un RAP:
  ✓ Σ hours.direct == 48 (exactamente 48 horas de trabajo directo)
  ✓ Σ hours.autonomous == 12 (exactamente 12 horas de trabajo independiente)
  ✓ Σ quiz_points == 25 (exactamente 25 puntos en cuestionario S6)
  ✓ Hay exactamente 6 generates_evidence == true (6 evidencias obligatorias)
  ✓ Los 6 evidence.instrument_number son {1, 2, 3, 4, 5, 6} sin repetición
```

---

## Ejemplos de Activity Cards Correctas

### Ejemplo 1: PM-2.3 (Reading — The Master Anchor)

```yaml
activity_card:
  pm_id: "PM-2.3"
  pm_name: "Reading — The Master Anchor"
  session: 2
  phase_sena: "Apropiación"
  rap_id: "RAP-ENG-004-2026"
  
  activities:
    - number: 1
      type: "cognitiva"
      statement: "Analizar estructura y contenido de texto técnico en inglés usando estrategia SQ3R"
      didactic_strategy: "Content-Based Learning"
      didactic_technique: "Investigación guiada"
    
    - number: 2
      type: "cognitiva"
      statement: "Completar matriz de comprensión sobre conceptos clave del texto técnico"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Jigsaw"
  
  hours:
    direct: 2.0
    autonomous: 0.5
  
  evidence:
    generates_evidence: true
    type: "Conocimiento"
    description: "El aprendiz demuestra comprensión de textos técnicos en inglés respondiendo preguntas de nivel literal e inferencial en Cuestionario No 1"
    evaluation_technique: "Preguntas"
    instrument_number: 1
    instrument_type: "Cuestionario"
  
  environment:
    type: "Aula"
    materials:
      - "Proyector interactivo"
      - "Computadores con acceso a Moodle"
      - "Plantilla SQ3R impresa (PDF)"
      - "Textos técnicos en inglés (5 extractos)"
    instructors: "Instructor de inglés técnico"
  
  contributes_to_consolidated_quiz: true
  quiz_skill: "Reading"
  quiz_points: 5
  quiz_item_count: 5
```

### Ejemplo 2: PM-2.5 (Vocabulary, Literacy & Scenario Setup)

```yaml
activity_card:
  pm_id: "PM-2.5"
  pm_name: "Vocabulary, Literacy & Scenario Setup"
  session: 2
  phase_sena: "Apropiación"
  rap_id: "RAP-ENG-004-2026"
  
  activities:
    - number: 1
      type: "cognitiva"
      statement: "Identificar y clasificar vocabulario técnico del RAP según taxonomía de campos semánticos"
      didactic_strategy: "CLIL"
      didactic_technique: "Mapas conceptuales"
    
    - number: 2
      type: "procedimental"
      statement: "Pronunciar y usar vocabulario técnico en contexto de escenario simulado"
      didactic_strategy: "Aprendizaje basado en tareas"
      didactic_technique: "Simulación"
  
  hours:
    direct: 1.5
    autonomous: 0.5
  
  evidence:
    generates_evidence: false  # PM-2.5 es SCAFFOLDING, no genera evidencia formal
    type: null
    description: ""
    evaluation_technique: null
    instrument_number: null
    instrument_type: null
  
  environment:
    type: "Aula + Virtual"
    materials:
      - "Glossario interactivo (Quizlet)"
      - "Video técnico con subtítulos en inglés (3 clips, 5 min cada uno)"
      - "Mapa semántico en tablero colaborativo (Miro)"
      - "Fichas de pronunciación (Forvo)"
    instructors: "Instructor de inglés + Técnico especialista"
  
  contributes_to_consolidated_quiz: true
  quiz_skill: "Vocabulary"
  quiz_points: 5
  quiz_item_count: 5
```

### Ejemplo 3: PM-2.8 (Speaking — The Mission)

```yaml
activity_card:
  pm_id: "PM-2.8"
  pm_name: "Speaking — The Mission"
  session: 4
  phase_sena: "Apropiación"
  rap_id: "RAP-ENG-004-2026"
  
  activities:
    - number: 1
      type: "procedimental"
      statement: "Participar en juego de roles: defensor de decisión técnica en inglés bajo presión de debate"
      didactic_strategy: "Juego de roles"
      didactic_technique: "Role play + Dramatización"
  
  hours:
    direct: 1.5
    autonomous: 0.5
  
  evidence:
    generates_evidence: true
    type: "Desempeño"
    description: "El aprendiz demuestra capacidad de comunicación oral en inglés ejecutando rol técnico con fluidez, precisión y adecuación al contexto. Se evalúa pronunciación, control gramatical y gestión de turno conversacional."
    evaluation_technique: "Observación"
    instrument_number: 4
    instrument_type: "Escala de estimación"
  
  environment:
    type: "Aula"
    materials:
      - "Micrófono de diadema (1 por aprendiz)"
      - "Proyector para feedback de video"
      - "Tablet/computadora para grabación (opcional)"
      - "Tarjetas de rol con guiones técnicos"
    instructors: "Instructor de inglés técnico"
  
  contributes_to_consolidated_quiz: false
  quiz_skill: null
  quiz_points: 0
  quiz_item_count: 0
```

### Ejemplo 4: PM-2.1 (The Spark — Reflexión Inicial)

```yaml
activity_card:
  pm_id: "PM-2.1"
  pm_name: "The Spark"
  session: 1
  phase_sena: "Reflexión Inicial"
  rap_id: "RAP-ENG-004-2026"
  
  activities:
    - number: 1
      type: "cognitiva"
      statement: "Reflexionar sobre aplicación laboral del RAP en contexto técnico actual mediante lluvia de ideas"
      didactic_strategy: "Aprendizaje colaborativo"
      didactic_technique: "Lluvia de ideas + Panel discussion"
  
  hours:
    direct: 1.0
    autonomous: 0.25
  
  evidence:
    generates_evidence: false  # Reflexión Inicial no genera evidencia formal
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

## Relaciones con Otros Componentes del Sistema

### Productor
- **PM-2.x:** Cada PM (PM-2.1 hasta PM-2.10) emite 1 Activity Card al finalizar su diseño pedagógico

### Consumidor Primario
- **PM-2.11 (GFPI-F-134 Row Assembler):** Recibe todas las Activity Cards de un RAP y las ensambla en 1 fila GFPI-F-134 completa

### Consumidor Secundario
- **PM-4.1 (Instrumentos de Evaluación):** Lee especificaciones de evidencia de cada Activity Card y elabora:
  - Cuestionarios (Instrumento No 1, 3, 6)
  - Listas de chequeo (Instrumento No 3)
  - Listas de verificación (Instrumento No 2)
  - Escalas de estimación (Instrumento No 4, 5)

### Consumidor Terciario
- **PM-4.2 (Question Bank Consolidado):** Recibe especificaciones de `quiz_skill` y `quiz_item_count` de cada PM que aporta al cuestionario S6, y arma el banco de ítems consolidado

### Flujo de datos
```
PM-2.1 ─────┐
PM-2.2 ─────┤
PM-2.3 ─────┤
...         ├──→ Activity Cards + PM-2.0 output ──→ PM-2.11 ──→ GFPI-F-134 (1 fila)
PM-2.10────┤                                              ↓
PM-2.0 ─────┘                                         PM-4.1 (Instrumentos)
                                                      PM-4.2 (Quiz Bank)
```

---

## Checklist de Implementación para PM-2.x

Cada PM que emita una Activity Card debe verificar:

- [ ] Completé todas las secciones (identidad, actividades, horas, evidencia, ambiente, metadata)
- [ ] Cada activity.statement tiene verbo infinitivo + objeto + condición
- [ ] Cada activity.statement ≤ 120 caracteres
- [ ] La suma de horas (directa + autónoma) ≤ 12 horas para este PM
- [ ] Si es Apropiación: generates_evidence = true y todos los campos de evidence están completos
- [ ] Si NO es Apropiación: generates_evidence = false y campos de evidence están vacíos
- [ ] Los materiales son específicos, no genéricos
- [ ] Especifiqué nombre/rol claro del instructor responsable
- [ ] Si aporta al cuestionario: quiz_points = 5, quiz_item_count = 5, quiz_skill completado
- [ ] Si no aporta: quiz_points = 0, quiz_item_count = 0, quiz_skill = ""
- [ ] Pasé las 7 validaciones anteriores

---

**Versión:** 2.0  
**Vigencia:** A partir del 2026-04-13  
**Última revisión:** 2026-04-13  
**Responsable:** LG Factory Engine — SENA Colombia

---

## 9. Activity Card v2.6.3 — Learner-Facing Schema (pm-3-6.json)

**Nueva en v2.6.3.** Este es el schema que rige lo que el aprendiz ve renderizado en cada actividad de la Guía del Aprendiz (GFPI-F-135). Vive dentro de `pm-3-6.json.seccion_3_actividades_aprendizaje[*]` y sustituye definitivamente la arquitectura v2.6.1 que separaba "instrucción" (cuerpo de la actividad) de "espacio de trabajo" (anexos imprimibles). En v2.6.3 el workspace está **embebido** dentro de la actividad como `scaffold_inline`.

### 9.1 Propósito

El aprendiz abre la guía impresa o digital y encuentra en una sola página:

1. El título de la actividad en inglés (voz del aprendiz) y su traducción ES (small text de referencia).
2. Una descripción bilingüe de 1–2 oraciones de qué se va a hacer.
3. Un paso-a-paso numerado y bilingüe (3–8 pasos, imperativos).
4. (Opcional) Material de input renderizado inline: texto de lectura, transcripción de listening, glosario.
5. **Un scaffold de trabajo** (tabla, formulario, checklist, etc.) donde **físicamente escribe** la respuesta.
6. Un bloque "Entregable" que declara producto + formato + criterio mínimo.
7. El `activity_footer` derivado (ambiente, estrategia, técnica, materiales, duración + evidencia si aplica).

Ningún anexo imprimible separado. Ningún salto de página para escribir.

### 9.2 Schema de cada item en `seccion_3_actividades_aprendizaje[*]`

```json
{
  "actividad_id": "A3.3.S2.4",

  "titulo_en": "Toolbelt Quiz — Reading Check",
  "titulo_es": "Cuestionario Toolbelt — Verificación de Lectura",
  "tipo_actividad_sena": "directa",

  "tiempo_min": 45,
  "agrupacion": "individual",
  "voc_dimension": ["cognitiva"],

  "produce_evidencia": true,

  "descripcion_aprendiz": {
    "en": "Read the Motor Age article and answer 5 comprehension questions.",
    "es": "Lee el artículo de Motor Age y responde 5 preguntas de comprensión."
  },

  "paso_a_paso": [
    { "en": "Read the article once without stopping.", "es": "Lee el artículo una vez sin detenerte." },
    { "en": "Underline the 10 Toolbelt words you find.",  "es": "Subraya las 10 palabras Toolbelt que encuentres." },
    { "en": "Answer the 5 questions in the scaffold below.", "es": "Responde las 5 preguntas en el scaffold de abajo." }
  ],

  "scaffold_inline": {
    "tipo": "quiz_preview",
    "titulo_en": "Reading Comprehension — 5 questions",
    "titulo_es": "Comprensión de Lectura — 5 preguntas",
    "badge": "instrument_1_reading",
    "estructura": {
      "items": [
        { "n": 1, "pregunta_en": "What tool does Mike use first?", "pregunta_es": "¿Qué herramienta usa Mike primero?", "tipo": "abierta" },
        { "n": 2, "pregunta_en": "Why is a torque wrench important?", "pregunta_es": "¿Por qué es importante una llave de torque?", "tipo": "opcion_multiple", "opciones": ["..."] }
      ]
    }
  },

  "entregable": {
    "producto":        { "en": "Completed quiz with 5 answers", "es": "Cuestionario completo con 5 respuestas" },
    "formato":         { "en": "Written on this page",          "es": "Escrito en esta página" },
    "criterio_minimo": { "en": "≥ 4/5 correct",                  "es": "≥ 4/5 correctas" }
  },

  "materiales": ["Motor Age article (inline)", "Pen"],

  "activity_footer": {
    "ambiente": "...",
    "estrategia": "...",
    "tecnica": "...",
    "materiales": "...",
    "material_apoyo": "...",
    "duracion_horas": "0.75 horas",
    "evidencia": {
      "codigo": "E1",
      "nombre": "Cuestionario No 1 — Reading",
      "tipo_sena": "Conocimiento",
      "tecnica_evaluacion": "Preguntas",
      "instrumento": "Cuestionario No 1"
    }
  }
}
```

### 9.3 Campos obligatorios del learner-facing card

| Campo | Tipo | Descripción |
|---|---|---|
| `actividad_id` | string | Identidad estable (ej `A3.3.S2.4`). Preservada del schema anterior. |
| `titulo_en` | string | Título Inglés visible al aprendiz. Voz directa, imperativo o sustantivo. |
| `titulo_es` | string | Traducción ES del título. Se renderiza en small text gris. |
| `tipo_actividad_sena` | enum | `directa` / `directa_con_trabajo_autonomo` / `trabajo_autonomo` |
| `tiempo_min` | number | Duración en minutos (coherente con `activity_footer.duracion_horas`). |
| `agrupacion` | enum | `individual` / `pares` / `grupo_pequeno` / `plenaria` |
| `voc_dimension` | array | Subset de `["cognitiva", "procedimental", "actitudinal"]`. No vacío. |
| `descripcion_aprendiz` | `{en, es}` | Panorama de 1–2 oraciones bilingüe. Voz 2ª persona. |
| `paso_a_paso` | array[`{en, es}`] | 3–8 pasos numerados, imperativos, bilingüe. |
| `scaffold_inline` | `{tipo, titulo_en, titulo_es, badge?, estructura}` | Workspace embebido. Ver §9.4. |
| `entregable` | `{producto, formato, criterio_minimo}.{en, es}` | Qué entrega, en qué formato, criterio mínimo. Bilingüe obligatorio. |
| `activity_footer` | objeto | Derivado desde upstream (v2.6.1). Preservado sin modificación. |

### 9.4 Campos eliminados en v2.6.3

Los siguientes campos v2.6.x **deben estar ausentes** del learner-facing card:

- `nombre_aprendiz` → absorbido por `titulo_en` + `titulo_es`.
- `etiquetas_dimension` → absorbido por `voc_dimension`.
- `instruccion_2pers_en` → absorbido por `descripcion_aprendiz.en` + `paso_a_paso[*].en`.
- `instruccion_supervivencia_es` → absorbido por `descripcion_aprendiz.es` + `paso_a_paso[*].es`.

El validador `check-activity-card-schema.js` falla si alguno sobrevive en pm-3-6.json tras la migración.

### 9.5 Los 10 tipos canónicos de `scaffold_inline.tipo`

Todo valor de `scaffold_inline.tipo` debe ser exactamente uno de estos 10. Cualquier otro valor es error bloqueante.

| `tipo` | Uso pedagógico típico | Estructura mínima |
|---|---|---|
| `matching` | Pre-activación vocabulario, glosario bilingüe, emparejamiento término–definición | `{ items: [ {en, es} \| {term, definition} ] }` |
| `checklist` | Verificación procedural, revisión entre pares, auto-chequeo | `{ items: [ {texto_en, texto_es} ] }` |
| `form` | Captura estructurada (brief, risk assessment, inspection form) | `{ campos: [ {label_en, label_es, tipo, hint?} ] }` |
| `t_chart` | Comparación binaria (ventajas/desventajas, antes/después, pros/cons) | `{ columna_izq: {label_en, label_es, lineas}, columna_der: {...} }` |
| `writing_template` | Producción escrita guiada con plantilla y huecos nombrados | `{ plantilla_en, plantilla_es, slots: [ {nombre, hint_en, hint_es} ] }` |
| `listening_capture` | Notas durante escucha (datos, palabras clave, inferencias) | `{ secciones: [ {label_en, label_es, guia_en, guia_es, lineas} ] }` |
| `quiz_preview` | Pre-test, cuestionario técnico consolidado E6, verificación de lectura E1 | `{ items: [ {n, pregunta_en, pregunta_es, tipo, opciones?} ] }` |
| `speaking_script` | Diálogo pautado, práctica oral con turnos, role-play | `{ turnos: [ {hablante, linea_en, linea_es?} ] }` |
| `reflection_lines` | Reflexión abierta, meta-cognición, self-assessment | `{ prompt_en, prompt_es, lineas }` |
| `rating` | Auto-evaluación, escala Likert, semáforo, rúbrica rápida | `{ items: [...], escala: { min, max, etiquetas_en, etiquetas_es } }` |

**Renderer canónico:** `gen_audit_docx.js` contiene un renderer por tipo (`renderScaffold_matching_v263`, `renderScaffold_checklist_v263`, etc.) despachados por `sc.tipo` en `renderScaffoldInline`. Agregar un tipo nuevo requiere: (a) agregar el tipo al enum aquí, (b) extender el dispatcher en el renderer, (c) extender el validador.

### 9.6 Regla del badge `★ FORMAL INSTRUMENT`

Las 6 actividades del mapping canónico (v2.6.1 §11) deben tener `scaffold_inline.badge` igual al ID de su instrumento:

| `actividad_id` | `scaffold_inline.badge` obligatorio | Instrumento |
|---|---|---|
| `A3.3.S2.4` | `instrument_1_reading` | Cuestionario No 1 — Reading |
| `A3.3.S3.4` | `instrument_2_writing` | Rúbrica analítica No 2 — Writing |
| `A3.3.S4.2` | `instrument_3_listening` | Lista de Chequeo No 3 — Listening |
| `A3.3.S4.4` | `instrument_4_speaking` | Escala de Estimación No 4 — Speaking |
| `A3.3.S5.3` | `instrument_5_language_functions` | Escala de Estimación No 5 — Language Functions |
| `A3.3b.2` | `pm_4_2_consolidado` | Cuestionario Técnico Consolidado (25 pts) |

El renderer pinta el badge en ORANGE (`#F59316`) dentro del encabezado del scaffold, alineando visualmente con la Línea 2 del `activity_footer` (bloque evidencia). El validador **exige** que estas 6 actividades tengan badge y que el valor coincida con su instrumento canónico.

### 9.7 Orden pedagógico de renderizado

```
┌─ HEADER: actividad_id · tipo_actividad_sena · titulo_en / titulo_es · metadata (tiempo, agrupación, V+O+C)
├─ descripcion_aprendiz (EN + ES)
├─ paso_a_paso (numerado, ORANGE bold)
├─ [INPUT MATERIAL, opcional] apendices_referenciados renderizados inline
│       (texto de lectura v2.6 / transcripción listening / glosario)
├─ [WORKSPACE] scaffold_inline (tabla / form / campos editables)  ← v2.6.3
├─ [ENTREGABLE] producto · formato · criterio mínimo
└─ activity_footer (derivado v2.6.1, 2 líneas: logística + evidencia si aplica)
```

**Regla de flujo:** lee input → trabaja en el scaffold → entrega el producto. La secuencia es estricta; ningún renderer debe invertirla.

### 9.8 Reglas arquitectónicas v2.6.3 (obligatorias)

1. **PROHIBIDO** crear anexos imprimibles separados cuya función sea "espacio de trabajo del aprendiz". Todo workspace va embebido como `scaffold_inline`.
2. **PERMITIDO** conservar apéndices legacy como **material de input** (texto de lectura, guion listening, glosario). Se renderizan inline ANTES del scaffold.
3. **OBLIGATORIO** que cada actividad de `seccion_3_actividades_aprendizaje` tenga `titulo_en`, `titulo_es`, `paso_a_paso` (3–8), `scaffold_inline.tipo ∈ 10 canónicos`, y `entregable.{producto, formato, criterio_minimo}.{en, es}` completo.
4. **OBLIGATORIO** que `meta.activities_schema_version === "v2.6.3"` esté presente en pm-3-6.json.
5. **OBLIGATORIO** que las 6 actividades evidencia tengan `scaffold_inline.badge` con valor canónico.
6. **PROHIBIDO** editar `activity_footer` manualmente; sigue derivándose desde upstream (regla v2.6.1 preservada).

### 9.9 Pipeline canónico de migración/validación

```
scripts/
├── v263-activities-data.js          → 30 specs por actividad (data file)
├── rewrite_activities_v263.js       → migrador: aplica specs a pm-3-6.json (idempotente con backup)
├── check-activity-card-schema.js    → validador schema v2.6.3 + 10 tipos + badges
├── check-no-orphan-footer.js        → validador v2.6.1 (preservado)
└── gen_audit_docx.js                → renderer con renderActivityCard_v263 + 10 renderers + dispatch por titulo_en
```

**Back-compat:** `renderActividades` inspecciona si la actividad tiene `titulo_en`. Si sí → ruta v2.6.3. Si no → ruta legacy preservada. Esto permite que runs pre-v2.6.3 sigan renderizando sin tocarse.

### 9.10 Checklist de implementación para PM-3.6

Antes de emitir `pm-3-6.json`:

- [ ] Cada item de `seccion_3_actividades_aprendizaje` tiene los 12 campos canónicos de §9.3.
- [ ] Ningún item tiene los 4 campos obsoletos de §9.4.
- [ ] Cada `scaffold_inline.tipo` ∈ los 10 canónicos de §9.5.
- [ ] Las 6 actividades evidencia tienen `scaffold_inline.badge` según §9.6.
- [ ] `meta.activities_schema_version === "v2.6.3"`.
- [ ] `node scripts/check-activity-card-schema.js` sale con exit 0 (PASS).
- [ ] `node scripts/check-no-orphan-footer.js` sale con exit 0 (footers coherentes).

---

**Versión v2.6.3:** A partir del 2026-04-20  
**Caso de origen:** MGV-2026-04-20 G1 (The Visual Communicator) — 30/30 actividades migradas, 10 tipos de scaffold usados, 6 badges verificados.  
**Próxima guía que arranca con este contrato:** MGV-G2.

---

## 10. Activity Card v2.7 — Learner-Readable Activity (pm-3-6.json · sucesor de v2.6.3)

**Nueva en v2.7 (2026-04-21).** Extensión evolutiva de v2.6.3 que formaliza **seis bloques visibles al aprendiz** con anatomía inspirada en el formato canónico SENA de actividades GFPI-F-135 (caso de referencia: *"Inspeccionar preoperativamente el equipo apilador de acuerdo con manual de operación"*). Preserva toda la infraestructura de v2.6.3 (`scaffold_inline`, `entregable`, `activity_footer`) pero reenmarca el encabezado y la descripción para que cada actividad lea como **instrucción operacional con voz instructiva cálida** — no como fragmento telegráfico con etiquetas duplicadas.

### 10.1 Los 6 bloques canónicos

Cada actividad renderizada al aprendiz debe contener, en este orden estricto:

| # | Bloque | Campo JSON | Obligatorio | Origen |
|---|---|---|---|---|
| 1 | Encabezado V+O+C | `encabezado` | ✅ | v2.7 nuevo |
| 2 | Descripción narrativa | `descripcion_narrativa` | ✅ | v2.7 nuevo (reemplaza `descripcion_aprendiz`) |
| 3 | Step-by-step · Paso a paso | `paso_a_paso` | ✅ | v2.6.3 preservado |
| 4 | Entregable | `entregable` | ✅ | v2.6.3 preservado |
| 5 | Evidencia de aprendizaje | `evidencia` | ⚠️ condicional (si aplica) | v2.7 promovido desde `activity_footer.evidencia` |
| 6 | Footer logístico | `activity_footer` | ✅ | v2.6.1 preservado (sin subcampo `evidencia`) |

Entre los bloques 2 y 3 el renderer puede intercalar `scaffold_inline` como **input material** (texto de lectura, transcripción, glosario). El workspace `scaffold_inline` sigue viviendo en su propia posición estructural igual que en v2.6.3 — normalmente entre el paso-a-paso y el entregable, según dicte el tipo de scaffold.

### 10.2 Schema completo v2.7

```json
{
  "actividad_id": "A3.3.S2.1",
  "schema_version": "v2.7",

  "tipo_actividad_sena": "directa",
  "tiempo_min": 25,
  "agrupacion": "individual",
  "voc_dimension": ["cognitiva"],

  "encabezado": {
    "actividad_tipo_label": "Actividad cognitiva",
    "enunciado_voc": {
      "en": "Recognize 20 technical design vocabulary items in English through pre-apropiación diagnostic self-assessment",
      "es": "Reconocer 20 términos técnicos de diseño visual en inglés mediante autoevaluación diagnóstica previa a la apropiación léxica"
    }
  },

  "descripcion_narrativa": {
    "en": "Before learning new words, it is worth taking an honest inventory of what you already know. In this activity you will receive a sheet with the 20 terms you will use throughout the guide — the five great territories of design: typography, color, shape & composition, tools & software, and products & actions. This is not an exam. It is a personal map. When you finish, you will know exactly in which areas you start with an advantage and in which ones you will need to lean on the vocabulary of the next sessions.",
    "es": "Antes de aprender palabras nuevas, vale la pena hacer un inventario honesto de lo que ya sabes. En esta actividad recibirás una hoja con los 20 términos que vas a usar durante toda la guía — los cinco grandes territorios del diseño: tipografía, color, forma & composición, herramientas & software, y productos & acciones. No es un examen. Es un mapa personal. Al terminar sabrás exactamente en qué áreas partes con ventaja y en cuáles necesitas apoyarte en el vocabulario de las próximas sesiones."
  },

  "paso_a_paso": [
    { "en": "Receive the diagnostic sheet with 20 design words organized in 5 categories.",  "es": "Recibir la hoja diagnóstica con los 20 términos organizados en 5 categorías." },
    { "en": "Read each word silently. Do NOT translate yet — just notice your first reaction.", "es": "Leer cada palabra en silencio. NO traducir todavía — solo notar tu primera reacción." },
    { "en": "Mark with ✓ the words you already recognize in English.",                        "es": "Marcar con ✓ las palabras que ya reconoces en inglés." },
    { "en": "Mark with ? the words you do not yet know or feel uncertain about.",             "es": "Marcar con ? las palabras que todavía no conoces o te generan duda." },
    { "en": "Count your ✓ marks by category and write the totals on the right column.",       "es": "Contar los ✓ por categoría y escribir los totales en la columna derecha." },
    { "en": "Keep the sheet — you will revisit it in Session 5 to measure your progress.",    "es": "Guardar la hoja — la vas a revisar en la Sesión 5 para medir tu progreso." }
  ],

  "scaffold_inline": {
    "tipo": "checklist",
    "titulo_en": "Vocabulary Diagnostic Sheet — 20 terms × 5 categories",
    "titulo_es": "Hoja Diagnóstica de Vocabulario — 20 términos × 5 categorías",
    "estructura": { /* preservado v2.6.3 */ }
  },

  "entregable": {
    "producto":        { "en": "Diagnostic Sheet with 20 terms marked (✓ or ?) and category totals", "es": "Hoja diagnóstica con 20 términos marcados (✓ o ?) y totales por categoría" },
    "formato":         { "en": "Printed sheet provided by the instructor",                           "es": "Hoja impresa entregada por el instructor" },
    "criterio_minimo": { "en": "All 20 terms marked with exactly one symbol + 5 category totals",    "es": "Los 20 términos marcados con exactamente un símbolo + 5 totales de categoría" }
  },

  "evidencia": {
    "aplica": false
  },

  "activity_footer": {
    "ambiente": "Ambiente convencional (aula)",
    "estrategia": "Aprendizaje Basado en Tareas (ABT)",
    "tecnica": "Diagnóstico léxico marcado",
    "materiales": "Diagnostic Sheet impresa, lapiceros",
    "material_apoyo": "no aplica",
    "duracion_horas": "0.4 horas"
  }
}
```

### 10.3 Bloque 1 — Encabezado V+O+C

**Campo:** `encabezado`

Anatomía:

- **`actividad_tipo_label`** — tag dimensional único y explícito, longform oficial:
  - `"Actividad cognitiva"` — análisis, comprensión, identificación, clasificación
  - `"Actividad procedimental"` — ejecución, comunicación, producción, simulación
  - `"Actividad actitudinal"` — reflexión, auto-evaluación, colaboración, meta-cognición
  - Si la actividad cruza dos dimensiones, se elige la dominante.
  - **Obligatorio exactamente uno.** Elimina el patrón previo `[[COGNITIVA]] Instruction [COGNITIVA]` (doble tag).

- **`enunciado_voc.{en, es}`** — enunciado bilingüe con estructura *Verbo + Objeto + Condición* en infinitivo simétrico:
  - EN sin gerundio de arranque: `"Recognize ... through ..."` · `"Analyze ... using ..."` · `"Inspect ... according to ..."` · `"Produce ... on ..."`
  - ES en infinitivo: `"Reconocer ... mediante ..."` · `"Analizar ... usando ..."` · `"Inspeccionar ... de acuerdo con ..."` · `"Elaborar ... sobre ..."`
  - Máximo **200 caracteres por idioma**.
  - Estructura: `Verbo` + `Objeto del aprendizaje` + `Condición operacional` (instrumento, medio, contexto, marco de referencia).

**Ejemplos canónicos** (todos bilingües simétricos, verbo-condición alineado):

| Actividad típica | EN V+O+C | ES V+O+C |
|---|---|---|
| Diagnóstico léxico | Recognize 20 technical design vocabulary items in English through pre-apropiación diagnostic self-assessment | Reconocer 20 términos técnicos de diseño visual en inglés mediante autoevaluación diagnóstica previa a la apropiación léxica |
| Inspección técnica | Inspect the container reach stacker pre-operatively in accordance with the operation manual | Inspeccionar preoperativamente el equipo apilador de acuerdo con manual de operación |
| Escritura técnica | Produce a risk assessment report on the assigned technical scenario using the canonical template | Elaborar un informe de evaluación de riesgos sobre el escenario técnico asignado usando la plantilla canónica |
| Escucha técnica | Identify five key safety signals in the Bay 2 briefing audio through guided note-taking | Identificar cinco señales clave de seguridad en el audio de Bay 2 mediante toma de notas guiada |
| Oralidad simulada | Deliver a two-minute mood board presentation to the Art Director using target Language Functions F1–F5 | Presentar un mood board de dos minutos al Art Director usando las Funciones Comunicativas F1–F5 |

### 10.4 Bloque 2 — Descripción narrativa

**Campo:** `descripcion_narrativa.{en, es}`

Párrafo continuo — **un solo párrafo, sin listas, sin bullets, sin saltos de línea internos** — de **60 a 120 palabras por idioma**, redactado en segunda persona (`you` / `tú`) con voz instructiva cálida. Es el equivalente conceptual del párrafo narrativo largo en el ejemplo SENA-apilador (*"Esta actividad se centra en la inspección práctica del equipo apilador. Para el desarrollo de la actividad..."*) y se alinea con el tono del prólogo general de la guía (Sección 2 de pm-3-6).

Debe responder tres preguntas implícitas, en este orden:

1. **¿Qué vas a hacer?** — panorama operacional breve (1–2 oraciones).
2. **¿Por qué importa?** — cómo se conecta con la competencia del RAP o el contexto laboral (1–2 oraciones).
3. **¿Cuál es la promesa al terminar?** — qué sabrá o podrá hacer el aprendiz al finalizar (1 oración).

**Prohibido:**
- Listas con bullets o numeración
- Saltos de línea internos (un solo párrafo)
- Prefijos `EN:` / `ES:` — el renderer diferencia por tipografía

### 10.5 Bloque 3 — Step-by-step · Paso a paso

**Campo:** `paso_a_paso` (preservado de v2.6.3 con refinamiento canónico v2.6.2).

- Array de **5 a 7 objetos `{en, es}`**.
- Cada paso: imperativo bilingüe, autocontenido, con verbo + objeto + condición al nivel del micro-paso.
- Renderer canónico (patrón v2.6.2 validado en DIESEL-04-19 Paso 3 barrido): marcador `PASO N · STEP N` en verde SENA `#39A900`, 12pt bold, seguido de EN en navy `#0B2E45` 11pt y ES en grey `#6B7280` 7pt italic.
- **Sin prefijos `EN:`/`ES:`**.
- Autocontención: un aprendiz debe poder ejecutar cada paso leyendo solo ese paso.

### 10.6 Bloque 4 — Entregable

**Campo:** `entregable` (preservado sin cambios desde v2.6.3 §9.3).

Tres subcampos obligatorios `{producto, formato, criterio_minimo}` × `{en, es}`. Cierra la actividad con **evaluabilidad binaria** (entregado / no entregado contra criterio mínimo). El `criterio_minimo` debe ser sincrónico con el criterio correspondiente en `pm-4-1.json` si la actividad produce evidencia formal (regla de dual-presencia DM v2.4).

### 10.7 Bloque 5 — Evidencia de aprendizaje

**Campo:** `evidencia` (promovido desde `activity_footer.evidencia` de v2.6.1 a bloque propio de primer orden).

**Ruta A — si la actividad NO produce evidencia formal:**

```json
"evidencia": { "aplica": false }
```

**Ruta B — si la actividad produce una de las 6 evidencias canónicas (E1..E6) o la Misión Final (FM):**

```json
"evidencia": {
  "aplica": true,
  "codigo": "E1",
  "nombre_canonico": "Cuestionario No 1 — Reading",
  "tipo_sena": "Conocimiento",
  "tecnica_evaluacion": "Preguntas",
  "instrumento": "Cuestionario No 1"
}
```

**Campos:**

| Campo | Tipo | Valores válidos |
|---|---|---|
| `aplica` | boolean | `true` / `false` |
| `codigo` | string | `"E1"` / `"E2"` / `"E3"` / `"E4"` / `"E5"` / `"E6"` / `"FM"` |
| `nombre_canonico` | string | Nombre oficial del instrumento (desde PM-4.1 / PM-4.2) |
| `tipo_sena` | enum | `"Conocimiento"` / `"Desempeño"` / `"Producto"` |
| `tecnica_evaluacion` | enum | `"Preguntas"` / `"Observación"` / `"Verificación del producto"` |
| `instrumento` | string | `"Cuestionario No N"` / `"Lista de Chequeo No N"` / `"Escala de Estimación No N"` / `"Rúbrica analítica No N"` / `"Cuestionario Técnico Consolidado"` |

**Los puntos NO viven en este bloque.** Se derivan del catálogo canónico de PM-4.1/PM-4.2 en tiempo de renderizado:

- **E1–E5**: 5 pts formales cada una (fuente: `pm-4-1.json.instrumentos[*].puntos`)
- **E6**: 25 pts formales (fuente: `pm-4-2.json.puntos_totales`)
- **FM**: 5 pts formativos — no suman al total (fuente: canon FM-1 del DM v2.4 §11)

Esto evita drift entre la actividad y el catálogo de instrumentos — si mañana se reacomoda el canon de puntuación, las actividades no requieren edición individual. El renderer hace la lectura lateral al emitir el bloque.

### 10.8 Bloque 6 — Footer logístico

**Campo:** `activity_footer` (preservado de v2.6.1 con un cambio).

Los 6 campos canónicos se mantienen: `ambiente`, `estrategia`, `tecnica`, `materiales`, `material_apoyo`, `duracion_horas`. Sigue siendo **derivado desde upstream** (`pm-3-1.json.sessions_logistics` + `pm-3-2-sX.json.activity_logistics`) y se renderiza como línea inline sutil al pie de la actividad — no es una tabla gigante (regla confirmada en iteración 04-21).

**Cambio v2.7:** el subcampo `activity_footer.evidencia` queda **deprecado** — toda la información de evidencia migra al bloque `evidencia` de §10.7. El footer es estrictamente logístico. El validador `check-no-orphan-footer.js` se actualiza para rechazar un subcampo `evidencia` dentro de `activity_footer`.

### 10.9 Reglas de migración v2.6.3 → v2.7

| Campo v2.6.3 | Acción en v2.7 | Regla |
|---|---|---|
| `titulo_en`, `titulo_es` | Reencuadrar en `encabezado.enunciado_voc.{en, es}` | Conversión asistida: el script `rewrite_activities_v27.js` propone V+O+C desde el título + contexto del PM upstream, el instructor aprueba. |
| — (nuevo) | `encabezado.actividad_tipo_label` | Derivar de `voc_dimension[0]` con longform. |
| `descripcion_aprendiz.{en, es}` | Expandir a `descripcion_narrativa.{en, es}` | El script genera un párrafo 60–120 palabras desde la descripción corta + el objetivo pedagógico del PM upstream. Revisión humana obligatoria. |
| `tipo_actividad_sena` | Preservado | — |
| `tiempo_min`, `agrupacion`, `voc_dimension` | Preservados | — |
| `paso_a_paso` | Preservado + normalizado a 5–7 pasos | Si < 5, el script expande con micro-pasos derivados del scaffold. Si > 7, consolida manualmente. |
| `scaffold_inline` | Preservado sin cambios | — |
| `entregable` | Preservado sin cambios | — |
| `activity_footer.evidencia` | Mover a `evidencia` bloque propio | Extracción automática; drop del subcampo `evidencia` dentro de `activity_footer`. |
| `activity_footer` (otros 6 campos) | Preservado | — |

**Campo `schema_version`:** obligatorio en v2.7, valor exacto `"v2.7"`.

### 10.10 Back-compat

El renderer (`pm-3-6-new-gen.js` / `pm-3-6-new-gen2.js` / `gen_audit_docx.js`) inspecciona `schema_version`:

- Si `== "v2.7"` → ruta nueva `renderActivityV27`.
- Si `== "v2.6.3"` o ausente → ruta legacy `renderActivityCard_v263` o legacy v2.6.1 preservada.

Esto permite que MGV-2026-04-20 (v2.6.3) y DIESEL-2026-04-19 (v2.6.2 post-rewrite) sigan renderizando mientras se migran por separado.

### 10.11 Pipeline canónico v2.7

```
scripts/
├── rewrite_activities_v27.js       → migrador v2.6.3 → v2.7 (idempotente con backup .pre-v27.bak)
├── check-activity-anatomy-v27.js   → validador: 6 bloques + schema_version + V+O+C + word count narrativa 60–120 + 5–7 pasos
├── pm-3-6-new-gen.js + new-gen2.js → renderer DIESEL con renderActivityV27
├── gen_audit_docx.js               → renderer MGV con renderActivityV27
├── check-no-orphan-footer.js       → actualizado para rechazar activity_footer.evidencia
└── check-activity-card-schema.js   → preservado para runs v2.6.3 legacy
```

### 10.12 Checklist de implementación PM-3.6 v2.7

Antes de emitir `pm-3-6.json` con `schema_version: "v2.7"`:

- [ ] Cada actividad tiene los 6 bloques en el orden canónico (§10.1).
- [ ] `encabezado.actividad_tipo_label` ∈ los 3 longform (`"Actividad cognitiva"` / `"Actividad procedimental"` / `"Actividad actitudinal"`).
- [ ] `encabezado.enunciado_voc.{en, es}` ≤ 200 caracteres cada uno, infinitivo simétrico, sin prefijos.
- [ ] `descripcion_narrativa.{en, es}` entre 60 y 120 palabras cada uno, un solo párrafo, segunda persona.
- [ ] `paso_a_paso` tiene entre 5 y 7 elementos, cada uno bilingüe imperativo.
- [ ] `entregable.{producto, formato, criterio_minimo}.{en, es}` todos poblados y ≤ 250 caracteres.
- [ ] `evidencia.aplica` presente. Si `true`, los 5 campos subsecuentes (`codigo`, `nombre_canonico`, `tipo_sena`, `tecnica_evaluacion`, `instrumento`) están poblados y son coherentes con PM-4.1/PM-4.2.
- [ ] `activity_footer` NO contiene subcampo `evidencia` (migrado al bloque propio).
- [ ] `schema_version === "v2.7"`.
- [ ] `node scripts/check-activity-anatomy-v27.js` sale con exit 0 (PASS).
- [ ] `node scripts/check-no-orphan-footer.js` sale con exit 0 (footer coherente sin subcampo evidencia).

---

**Versión v2.7:** A partir del 2026-04-21
**Caso de origen:** MGV-2026-04-20 G1 (The Visual Communicator) — reescritura piloto de las 30 actividades con anatomía Learner-Readable inspirada en GFPI-F-135 canon SENA.
**Próxima guía:** DIESEL-2026-04-19 G1 (The Workshop Specialist) — portará v2.7 tras validación en MGV.

---

## 11. Activity Card v3.0 — CANON SERGIO 2026-05-02 (sucesor de v2.0 para Fase 2 GFPI-F-134 feed)

**Nueva en v3.0 (2026-05-02).** Sergio Cortés Perdomo dictó el schema canónico con 3 ejemplos literal de guía de aprendizaje SENA modelo · alineado con cascade Phase 1 v3.x (matriz v1.3 + pm-1-1 v2.8 + pm-1-2 v4.2 + pm-2-0 v3.0). Esta versión **reemplaza** el schema v2.0 de Fase 2 para todo programa post-cascade v3.x. v2.0 + v2.6.3 + v2.7 preservados como REFERENCIA legacy para back-compat.

### 11.1 Propósito v3.0

Cada PM-2.x downstream (PM-2.1 a PM-2.10) emite **una o más Activity Cards v3.0** que serán:

- **Renderizadas en la guía del aprendiz GFPI-F-135** con el formato exacto de los 3 ejemplos canon (panorama → orientación → equipos/lectura → práctica → cierre/socialización)
- **Consumidas por PM-2.11 Row Assembler** para ensamblar columnas 6-11 de GFPI-F-134
- **Consumidas por PM-4.1** para elaborar instrumentos de evaluación (cuando `evidencias.aplica = true`)

### 11.2 Schema completo v3.0

```yaml
activity_card:
  # === IDENTIDAD (heredada de PM-2.0 v3.0 session_blueprint) ===
  pm_id: "PM-2.x"                              # PM emisor (PM-2.1 a PM-2.10)
  pm_name: "Reading — The Master Anchor"
  session: "S3"                                # heredado de pm-2-0
  tipo_bloque: "APROPIACION"                   # APERTURA | APROPIACION | TRANSFERENCIA · heredado pm-2-0
  bloque_id_referencia: "B1"                   # B0|B1|B2|...|BT · heredado pm-1-1
  rap_target: "RA1"                            # heredado pm-1-1 · null si transversal (APERTURA/TRANSFERENCIA)
  numero_actividad: 3                          # NEW v3.0 · numeración secuencial ACUMULADA a nivel guía completa (1, 2, 3, ..., N total)

  # === DIMENSIÓN + ENUNCIADO + DESCRIPCIÓN ===
  dimension: "cognitiva"                       # NEW v3.0 · UNA: cognitiva | procedimental | actitudinal
                                                # canon Sergio: "No siempre la activity card debe contener todas las dimensiones"
                                                # típicamente actitudinal en APERTURA (reflexión inicial/contextualización)
  enunciado: "Reconocer códigos de comunicación portuaria de acuerdo con normativa."
                                                # V+O+C estructura · ≤200 caracteres · canon SENA
  descripcion: |
    Identificar códigos según normatividad portuaria, referente a señales de comunicación
    y señalización necesarias para la operación.

    Para el desarrollo de la actividad, el instructor orientará a los aprendices sobre
    concepto, tipos y características del código de comunicación portuaria y del sistema
    baroti, así como del sistema operativo de terminal.

    Posteriormente se conformarán equipos de 3 aprendices, quienes darán lectura a los
    siguientes documentos: ...

    Seguidamente, los aprendices, a partir del material referenciado, realizarán
    simulaciones de pedidos de auxilio, operación terminada u otras similares...

    La actividad finaliza con la entrega de un documento que resuma las señales más
    utilizadas en el ámbito portuario, y con la socialización de los aprendizajes
    alcanzados en desarrollo de la actividad.
                                                # NEW v3.0 · multi-párrafo 200-600 palabras
                                                # patrón canon: panorama → orientación → equipos/lectura → práctica → cierre/socialización
                                                # render literal en guía (saltos `\n\n` preservados)

  # === LOGÍSTICA ===
  ambiente: "Ambiente convencional"            # texto operacional · puede ser compuesto
                                                # ej: "Ambiente pluritecnológico o simulado que cuente con equipo apilador y contenedores 20/40 pies"
                                                # NO enum cerrado (canon SENA permite descripciones operacionales)
  estrategias_didacticas_activas:              # NEW v3.0 · array (siempre · 1+ elementos)
    - "Aprendizaje colaborativo"
                                                # enum: Aprendizaje colaborativo, Trabajo colaborativo, Aprendizaje basado en proyectos,
                                                # ABP, ABT, TBLT, CLIL, Content-Based Learning, Aprendizaje basado en problemas,
                                                # Investigación guiada, Simulación, Juego de roles
  tecnicas_didacticas:                         # NEW v3.0 · array (siempre · 1+ elementos)
    - "Simulación"
                                                # enum: Simulación, Práctica de campo, Investigación guiada, Dramatización,
                                                # Exposición y debate, Role play, Jigsaw, Think-Pair-Share, Mapas conceptuales,
                                                # Análisis de casos, Lluvia de ideas, Mesa redonda, Conversatorio, Taller, Panel discussion
  materiales_formacion:                        # array
    - "papel bond"
    - "lapiceros"
    - "marcadores"
    - "computadores"
                                                # materiales TANGIBLES de aula (no recursos de apoyo · esos son material_apoyo)
  material_apoyo:                              # NEW v3.0 · array de objetos · MÚLTIPLES permitidos
    - descripcion: "Documento en PDF sobre Código internacional de señales"
      link: "https://es.scribd.com/presentation/478805289/BAROTI"
                                                # array vacío `[]` si NO aplica → render "No aplica" literal
                                                # cada objeto tiene descripcion + link (URL o "no aplica" si descripcion sin link)

  # === EVIDENCIAS (CONDICIONAL · render "No aplica" literal si aplica=false) ===
  evidencias:
    aplica: true                               # boolean · APERTURA+TRANSFERENCIA siempre false · APROPIACIÓN variable
    tipo: "Producto"                           # Producto | Conocimiento | Desempeño · null si !aplica
    nombre: "Códigos de comunicación portuaria"   # NEW v3.0 · nombre específico legible para aprendiz
    tecnica_evaluacion: "Verificación de producto"   # Preguntas | Observación | Verificación de producto · null si !aplica
    instrumento_numero: 2                      # 1-6 (heredado del canon PM-4.1) · null si !aplica
    instrumento_tipo: "Lista de verificación"  # Cuestionario | Lista de Chequeo | Lista de verificación | Escala de estimación | null si !aplica
    codigo_canon: "E2"                         # NEW v3.0 · heredado de pm-1-2._produces_evidencia (E1-E6+E-Misión)
    criterio_canon_evaluado: "C02"             # NEW v3.0 · heredado de pm-2-0.evidencias_secuencia_temporal

  # === DURACIÓN ===
  duracion_horas: 4                            # numérico · debe coincidir con tiempo asignado en pm-2-0.session_blueprint

  # === HEREDANCIA TRACEABILITY (literal copy de pm-1-2 + pm-2-0) ===
  _anclaje_matriz_heredado:                    # NEW v3.0 · literal copy de pm-1-2.elementos[ref_pm12_path]._anclaje_matriz
    rap_target: "RA1"
    saberes_que_demanda: ["UNIT 1: SHIP OVERVIEW", "PARTS OF THE SHIPS"]   # subset saberes_conceptos del RAP
    criterios_canon_que_evalua: ["C02"]        # subset C01-C08 del bloque
    saberes_proceso_movilizados: ["IDENTIFICAR Y EXTRAER INFORMACIÓN PRECISA EN INGLÉS..."]   # subset saberes_proceso del RAP
  _produces_evidencia: "E2"                    # NEW v3.0 · literal copy
  _consumed_by_pm: "PM-2.4"                    # NEW v3.0 · self-reference
  _ref_pm12_path: "sub_bloques_tripartitos[1].task_writing_derivada"   # NEW v3.0 · trazabilidad explícita
  _ref_pm20_session: "S4"                      # NEW v3.0 · sesión target en pm-2-0.session_blueprint
```

### 11.3 Reglas condicionales canon por `tipo_bloque`

| `tipo_bloque` | `dimension` típica | `evidencias.aplica` | Render evidencias |
|---|---|---|---|
| **APERTURA** (PM-2.1 spark · PM-2.2 gap analysis) | actitudinal o cognitiva (motivacional/diagnóstico) | **siempre `false`** (canon Sergio: "Las actividades de reflexión inicial y contextualización no llevan evidencias") | `"No aplica"` literal |
| **APROPIACIÓN** (PM-2.3-2.10) | cognitiva o procedimental | **variable** (anchors → `true` · scaffolds → `false`) · canon Sergio: "no todas las evidencias de apropiación tienen que tener evidencias de aprendizaje a evaluar" | `true` → render completo · `false` → "No aplica" literal |
| **TRANSFERENCIA** (PM-3.5) | procedimental + actitudinal | **siempre `false`** en este schema · E-Misión vive en rúbrica capstone separada (no es "evidencia de aprendizaje" tipificada SENA estándar) | `"No aplica"` literal |

### 11.4 Patrón estructural canon de `descripcion` (multi-párrafo)

La descripción debe seguir el patrón pedagógico SENA observado en los 3 ejemplos canon de Sergio · NO como template literal sino como GUÍA estructural (Anti-patrón #16 respetado · libertad LLM real):

```
Párrafo 1 (PANORAMA): qué se identifica/aplica/describe + contexto operacional breve
Párrafo 2 (ORIENTACIÓN INSTRUCTOR): qué explica el instructor (concepto, características, tipos)
Párrafo 3 (CONFORMACIÓN EQUIPOS + INPUT): cómo se organizan + qué leen/consultan/escuchan
Párrafo 4 (PRÁCTICA/SIMULACIÓN): qué hacen con el material referenciado · simulación, ejercicio, investigación, práctica de campo
Párrafo 5 (CIERRE + SOCIALIZACIÓN): qué entregan + socialización aprendizajes + (si aplica) aplicación de evidencia formal
```

**Voz:** descriptiva (3ª persona · "el instructor orientará..." · "se conformarán equipos de 3..." · "los aprendices realizarán...").

**Longitud:** 200-600 palabras típico · multi-párrafo permitido (saltos `\n\n` preservados literalmente en render).

**Universo:** debe estar contextualizado al universo del programa heredado de pm-0-context.json (banana cold chain · CML port · personajes · etc.).

### 11.5 3 Ejemplos canónicos · referencia Sergio 2026-05-02

#### Ejemplo 1 · Actividad cognitiva (APROPIACIÓN · genera evidencia Producto)

```yaml
activity_card:
  pm_id: "PM-2.x"
  numero_actividad: 3
  dimension: "cognitiva"
  enunciado: "Reconocer códigos de comunicación portuaria de acuerdo con normativa."
  descripcion: |
    Identificar códigos según normatividad portuaria, referente a señales de comunicación y señalización necesarias para la operación.

    Para el desarrollo de la actividad, el instructor orientará a los aprendices sobre concepto, tipos y características del código de comunicación portuaria y del sistema baroti, así como del sistema operativo de terminal.

    Posteriormente se conformarán equipos de 3 aprendices, quienes darán lectura a los siguientes documentos: Código internacional de señales, el cual se encuentra disponible en el siguiente link y en material de apoyo. ¿Cómo identificar la posición del contenedor a bordo?, el cual se encuentra disponible en el siguiente link: https://es.scribd.com/presentation/478805289/BAROTI

    Seguidamente, los aprendices, a partir del material referenciado, realizarán simulaciones de pedidos de auxilio, operación terminada u otras similares, para lo cual deberán utilizar los códigos de señales establecidas, y según lo indique el instructor.

    La actividad finaliza con la entrega de un documento que resuma las señales más utilizadas en el ámbito portuario, y con la socialización de los aprendizajes alcanzados en desarrollo de la actividad.
  ambiente: "Ambiente convencional"
  estrategias_didacticas_activas: ["Aprendizaje colaborativo"]
  tecnicas_didacticas: ["Simulación"]
  materiales_formacion: ["papel bond", "lapiceros", "marcadores", "computadores"]
  material_apoyo:
    - descripcion: "Documento en PDF sobre Código internacional de señales"
      link: "https://es.scribd.com/presentation/478805289/BAROTI"
  evidencias:
    aplica: true
    tipo: "Producto"
    nombre: "Códigos de comunicación portuaria"
    tecnica_evaluacion: "Verificación de producto"
    instrumento_numero: 2
    instrumento_tipo: "Lista de verificación"
  duracion_horas: 4
```

#### Ejemplo 2 · Actividad cognitiva (APROPIACIÓN · NO genera evidencia · scaffold)

```yaml
activity_card:
  pm_id: "PM-2.x"
  numero_actividad: 4
  dimension: "cognitiva"
  enunciado: "Diferenciar los riesgos y peligros de acuerdo con normativa de Seguridad y Salud en el Trabajo."
  descripcion: |
    Los aprendices se dividirán en grupos de 3 aprendices y se les proporcionará material sobre los conceptos de riesgo y peligro, así como la normativa SST vigente (Decreto 1443 de 2014, Por el cual se dictan disposiciones para la implementación del Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST)), al cual puede acceder desde el material de apoyo.

    A través de una investigación guiada por el instructor, cada grupo consultará sobre los tipos de riesgo químico, auditivo, ergonómico y físico; posteriormente identificarán de los tipos riesgos y peligros en la operación del equipo apilador de contenedores, diferenciando ambos términos y facilitando el intercambio de ideas y experiencias, a través de la socialización de sus conclusiones y las mejores prácticas para la gestión de riesgos en el trabajo.
  ambiente: "Ambiente convencional"
  estrategias_didacticas_activas: ["Trabajo colaborativo"]
  tecnicas_didacticas: ["Investigación guiada"]
  materiales_formacion: ["Elementos de oficina", "computadores"]
  material_apoyo:
    - descripcion: "Manual de Operación equipo srsc4531g – Reach Stacker"
      link: null
    - descripcion: "Decreto 1443 de 2014"
      link: null
  evidencias:
    aplica: false              # NO genera evidencia formal · scaffold cognitivo
    tipo: null
    nombre: null
    tecnica_evaluacion: null
    instrumento_numero: null
    instrumento_tipo: null
  duracion_horas: 4
```

**Render esperado en guía:**
```
Evidencias de aprendizaje: No aplica
Instrumentos de evaluación: No aplica
```

#### Ejemplo 3 · Actividad procedimental (APROPIACIÓN · genera evidencia Desempeño)

```yaml
activity_card:
  pm_id: "PM-2.x"
  numero_actividad: 5
  dimension: "procedimental"
  enunciado: "Inspeccionar área de operación del equipo apilador según procedimiento de la organización."
  descripcion: |
    Para el desarrollo de esta actividad, el instructor orientará sobre el procedimiento que se debe realizar para hacer alistamiento de área de operación, para lo cual abordará lo relacionado a concepto, características, plan de operaciones de ruta de traslado y técnicas de inspección de obstáculos; posteriormente, y una vez apropiados los conceptos, se realizará actividad práctica la cual consiste en:

    Se conformarán equipos de 3 aprendices.

    Cada equipo deberá formular un plan para la inspección del área de operación, ya sea en una terminal portuaria, o en otro sector productivo donde opere el equipo apilador de contenedores. Los aprendices, con la orientación del instructor, propondrán un plan de trabajo que incluya las características requeridas por la organización para la operación del equipo apilador de contenedores, a través de una lista de chequeo. Se propone la creación de un plan de disposición del área de operación.

    Una vez elaborado el plan, se realizará práctica de campo en ambiente pluritecnológico, o terminal portuaria, y cada equipo deberá delimitar, organizar y preparar el área donde se realizará la operación de apilado. Esto incluye la delimitación de espacios, señalización, limpieza e iluminación del área, así como ubicación de objetos o elementos que obstaculicen la operación en las rutas de traslado, a fin de crear un entorno seguro y eficiente para la operación del equipo.

    La actividad finaliza con la aplicación de evidencia de desempeño y socialización de los aprendizajes logrados en desarrollo del proceso.
  ambiente: "Ambiente pluritecnológico o simulado que cuente con equipo o simulador de apilado de contenedores y contenedores de 20 y 40 pies. Ambiente convencional."
  estrategias_didacticas_activas: ["Aprendizaje basado en proyectos"]
  tecnicas_didacticas: ["Práctica de campo"]
  materiales_formacion: ["Elementos de oficina", "computadores", "equipo apilador de contenedores", "contenedores"]
  material_apoyo:
    - descripcion: "Manual de Operación equipo srsc4531g – Reach Stacker"
      link: null
  evidencias:
    aplica: true
    tipo: "Desempeño"
    nombre: "Delimitar áreas de operación y rutas de traslado"
    tecnica_evaluacion: "Observación"
    instrumento_numero: 3
    instrumento_tipo: "Lista de Chequeo"
  duracion_horas: 10
```

### 11.6 Reglas de validación obligatorias v3.0

```
✓ pm_id ∈ {PM-2.1, PM-2.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10}
✓ session = "S1"-"SN" (heredado de pm-2-0)
✓ tipo_bloque ∈ {APERTURA, APROPIACION, TRANSFERENCIA} (heredado pm-2-0)
✓ bloque_id_referencia matches pm-1-1.bloques[].bloque_id
✓ rap_target = pm-1-1.bloques[bloque_id_referencia]._anclaje_matriz.rap_target (null si transversal)
✓ numero_actividad ≥ 1 · secuencial · sin gaps a nivel guía completa
✓ dimension ∈ {cognitiva, procedimental, actitudinal} · UN solo valor
✓ enunciado ≤ 200 caracteres · estructura V+O+C (Verbo + Objeto + Condición)
✓ descripcion ≥ 200 palabras Y ≤ 600 palabras · multi-párrafo permitido (\n\n)
✓ ambiente non-empty
✓ estrategias_didacticas_activas array len ≥ 1
✓ tecnicas_didacticas array len ≥ 1
✓ materiales_formacion array len ≥ 1
✓ material_apoyo array (puede ser vacío `[]` si NO aplica · render "No aplica")
✓ Cada material_apoyo[] tiene descripcion non-empty (link puede ser null)

REGLAS CONDICIONALES por tipo_bloque:
SI tipo_bloque == "APERTURA" o tipo_bloque == "TRANSFERENCIA":
  ✓ evidencias.aplica DEBE SER false
  ✓ evidencias.{tipo, nombre, tecnica_evaluacion, instrumento_numero, instrumento_tipo} DEBEN SER null

SI tipo_bloque == "APROPIACION":
  SI evidencias.aplica == true:
    ✓ evidencias.tipo ∈ {Producto, Conocimiento, Desempeño}
    ✓ evidencias.nombre non-empty
    ✓ evidencias.tecnica_evaluacion ∈ {Preguntas, Observación, Verificación de producto}
    ✓ evidencias.instrumento_numero ∈ {1, 2, 3, 4, 5, 6}
    ✓ evidencias.instrumento_tipo ∈ {Cuestionario, Lista de Chequeo, Lista de verificación, Escala de estimación}
    ✓ evidencias.codigo_canon ∈ {E1, E2, E3, E4-parcial, E4-final, E5, E6, E-Misión}
    ✓ evidencias.criterio_canon_evaluado ∈ {C01, C02, ..., C08}
  SI evidencias.aplica == false:
    ✓ evidencias.{tipo, nombre, tecnica_evaluacion, instrumento_numero, instrumento_tipo} DEBEN SER null
    ✓ evidencias.{codigo_canon, criterio_canon_evaluado} pueden ser null o referenciales (scaffolding contributivo)

✓ duracion_horas > 0 · numérico
✓ duracion_horas coincide con horas asignadas en pm-2-0.session_blueprint[session_id]

REGLAS HEREDANCIA TRACEABILITY:
✓ _anclaje_matriz_heredado non-empty
✓ _anclaje_matriz_heredado.rap_target == rap_target
✓ _anclaje_matriz_heredado.saberes_que_demanda ⊆ pm-0-0-matriz-alineada.raps[rap_target].saberes_conceptos_y_principios
✓ _anclaje_matriz_heredado.criterios_canon_que_evalua ⊆ pm-1-1.bloques[bloque_id_referencia]._anclaje_matriz.criterios_canon_assigned
✓ _produces_evidencia coincide con evidencias.codigo_canon (o ambos null)
✓ _ref_pm12_path apunta a path JSON válido en pm-1-2.json
✓ _ref_pm20_session == session
```

### 11.7 Render esperado en guía del aprendiz (formato canon Sergio)

```
3. Actividad cognitiva:
Reconocer códigos de comunicación portuaria de acuerdo con normativa.

Descripción de la actividad:
Identificar códigos según normatividad portuaria, referente a señales de comunicación y señalización necesarias para la operación.

Para el desarrollo de la actividad, el instructor orientará a los aprendices sobre concepto, tipos y características del código de comunicación portuaria y del sistema baroti, así como del sistema operativo de terminal.

Posteriormente se conformarán equipos de 3 aprendices...
[continúa multi-párrafo de la descripción]

Ambiente requerido: Ambiente convencional.
Estrategias didácticas activas: Aprendizaje colaborativo
Técnica didáctica: Simulación
Materiales de formación: papel bond, lapiceros, marcadores, computadores
Material de apoyo: Documento en PDF sobre Código internacional de señales.
Link: https://es.scribd.com/presentation/478805289/BAROTI

Evidencias de aprendizaje: Evidencia de producto: Códigos de comunicación portuaria
Técnica de evaluación: Verificación de producto.
Instrumentos de evaluación No 2: Lista de verificación.

Duración de la actividad: 4 horas.
```

**Renderer canónico** debe respetar:
- Numeración secuencial (3, 4, 5, ...) con punto + espacio
- "Actividad [dimension]:" como subtítulo (Actividad cognitiva | Actividad procedimental | Actividad actitudinal)
- Enunciado V+O+C en línea separada después del subtítulo
- "Descripción de la actividad:" header explícito · seguido del texto multi-párrafo literal
- Logística en líneas con header bold (Ambiente / Estrategias / Técnica / Materiales / Material de apoyo)
- Si `material_apoyo[]` no vacío: render "Material de apoyo: [descripcion]." + nueva línea "Link: [url]" (si link non-null)
- "Evidencias de aprendizaje:" + (si aplica → "Evidencia de [tipo]: [nombre]" · si no aplica → "No aplica")
- "Técnica de evaluación: [tecnica]." (o "No aplica")
- "Instrumentos de evaluación No [N]: [tipo]." (o "No aplica")
- "Duración de la actividad: [N] horas." al final

### 11.8 Heredancia obligatoria de cascade Phase 1 v3.x

Cada Activity Card v3.0 DEBE poder responder estas preguntas SIN inventar:

**Hacia atrás (¿de dónde viene?):**
- ¿Qué saberes_concepto demanda? → `_anclaje_matriz_heredado.saberes_que_demanda` (subset literal de matriz v1.3)
- ¿Qué saber_proceso ejecuta? → `_anclaje_matriz_heredado.saberes_proceso_movilizados`
- ¿De qué bloque viene? → `bloque_id_referencia` (referencia pm-1-1)
- ¿De qué elemento de scope viene? → `_ref_pm12_path` (ruta JSON literal en pm-1-2)
- ¿En qué sesión va? → `_ref_pm20_session` (sesión en pm-2-0)

**Hacia adelante (¿adónde va?):**
- ¿Qué evidencia produce? → `_produces_evidencia` (E1-E6+E-Misión o null)
- ¿Qué criterio canon evalúa? → `evidencias.criterio_canon_evaluado` (C01-C08)
- ¿Qué instrumento se usa? → `evidencias.instrumento_numero + instrumento_tipo`
- ¿Quién renderiza? → `_consumed_by_pm` (PM-2.x emisor + downstream PM-2.11/PM-3.6)

Si CUALQUIER respuesta es "inventado" o "vacío" injustificado · la actividad VIOLA "nada por fuera de la matriz".

### 11.9 Pipeline canónico v3.0

```
pm-2-0.json v3.0 (session_blueprint heredero)
  ↓ por cada actividad_planeada
PM-2.x v3.x (PM-2.1 a PM-2.10) genera Activity Card v3.0:
  - Hereda _anclaje_matriz literal de pm-1-2.elementos[ref_pm12_path]
  - Redacta dimension + enunciado V+O+C + descripcion multi-párrafo (libertad LLM Anti-patrón #16)
  - Define logística (ambiente + estrategias + técnicas + materiales + material_apoyo)
  - Si tipo_bloque=APROPIACION y produce evidencia: completa bloque evidencias
  - Si tipo_bloque=APERTURA o TRANSFERENCIA: evidencias.aplica=false (canon Sergio)
  ↓
Activity Card v3.0 → consumida por:
  - PM-2.11 Row Assembler (cols 6-11 GFPI-F-134)
  - PM-3.6 Learning Guide Generator (render learner-readable en GFPI-F-135)
  - PM-4.1 Instrumentos (cuando evidencias.aplica=true · usa nombre + tipo + instrumento_numero)
```

### 11.10 Checklist implementación PM-2.x v3.x

Antes de emitir Activity Card v3.0:

- [ ] `pm_id` correcto · `session` heredado pm-2-0 · `tipo_bloque` heredado · `bloque_id_referencia` válido · `rap_target` heredado pm-1-1
- [ ] `numero_actividad` secuencial sin gaps a nivel guía
- [ ] `dimension` UN solo valor (cognitiva | procedimental | actitudinal)
- [ ] `enunciado` ≤ 200 chars con estructura V+O+C
- [ ] `descripcion` 200-600 palabras multi-párrafo siguiendo patrón canon (panorama→orientación→equipos→práctica→cierre)
- [ ] `ambiente` operacional (puede ser compuesto)
- [ ] `estrategias_didacticas_activas` array len ≥ 1
- [ ] `tecnicas_didacticas` array len ≥ 1
- [ ] `materiales_formacion` array len ≥ 1
- [ ] `material_apoyo` array (vacío `[]` o con objetos `{descripcion, link}`)
- [ ] `evidencias.aplica` consistente con tipo_bloque (APERTURA/TRANSFERENCIA → false)
- [ ] Si `evidencias.aplica = true`: tipo + nombre + tecnica + instrumento + codigo_canon + criterio_canon_evaluado completos
- [ ] `duracion_horas` numérico > 0 coincide con pm-2-0.session_blueprint
- [ ] `_anclaje_matriz_heredado` literal copy de pm-1-2 + saberes ⊆ matriz v1.3
- [ ] `_produces_evidencia` consistente con evidencias.codigo_canon
- [ ] `_consumed_by_pm` self-reference correcto
- [ ] `_ref_pm12_path` apunta a path válido en pm-1-2.json
- [ ] `_ref_pm20_session` == session

---

**Versión v3.0:** A partir del 2026-05-02
**Caso de origen:** Sergio Cortés Perdomo dictó schema canon con 3 ejemplos literal de guía aprendizaje SENA modelo (códigos portuarios + riesgos SST + inspección apilador) · alineado con cascade Phase 1 v3.x post-IMARPOR-V2
**Próximo dispatch:** Step 1.5.PILOT PM-2.3 IMARPOR-V2 (primera Activity Card v3.0 en run real)
**Versiones legacy preserved:** v2.0 (Fase 2 GFPI-F-134 feed) · v2.6.3 (Fase 4 Learner-Facing) · v2.7 (Fase 4 Learner-Readable 6 bloques)
