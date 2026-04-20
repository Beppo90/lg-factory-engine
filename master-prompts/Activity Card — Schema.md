---
type: data-contract
version: 2.6
created: 2026-04-13
last_verified: 2026-04-20
status: active
---

# Activity Card — Schema

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
