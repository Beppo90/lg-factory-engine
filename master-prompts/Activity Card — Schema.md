---
type: data-contract
version: 2.6.3
created: 2026-04-13
last_verified: 2026-04-20
status: active
---

# Activity Card — Schema

> **⚠️ DOS SCHEMAS DIFERENTES EN ESTE DOCUMENTO**
>
> A partir de v2.6.3 este contrato cubre **dos activity cards distintas**, con roles y consumidores diferentes. No confundir:
>
> | Schema | Dónde vive | Productor | Consumidor | Propósito |
> |---|---|---|---|---|
> | **Activity Card v2.0 (Fase 2, GFPI-F-134)** | Output de cada PM-2.x | PM-2.1..PM-2.10 | PM-2.11 (Row Assembler) | Ensamblar fila GFPI-F-134 columnas 6-10 |
> | **Activity Card v2.6.3 (Fase 4, Learner-Facing)** | `pm-3-6.json.seccion_3_actividades_aprendizaje[*]` | PM-3.6 (GFPI-F-135 Integrator) | `gen_audit_docx.js` → DOCX del aprendiz | Renderizar la actividad con workspace embebido (scaffold_inline) |
>
> - **Secciones 1–8** documentan el schema v2.0 (GFPI-F-134 feed). Sigue vigente sin cambios.
> - **Sección 9 (nueva en v2.6.3)** documenta el schema v2.6.3 (Learner-Facing). Es el contrato que rige lo que el aprendiz ve renderizado en la Guía del Aprendiz.

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
