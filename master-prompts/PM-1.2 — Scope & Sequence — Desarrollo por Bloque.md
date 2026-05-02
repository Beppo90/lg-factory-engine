# PM-1.2: SCOPE & SEQUENCE — DESARROLLO POR BLOQUE + CURACIÓN DE MATERIAL AUTÉNTICO

---

**Metadata:**
```yaml
version: 4.2
last_verified: 2026-05-01
status: v4.2 PARADIGM SHIFT scope diferenciado por tipo_bloque heredado de PM-1.1 v2.8 (estructura tripartita) · 3 schemas distintos (APERTURA motivacional+activación · APROPIACIÓN curación POR RAP con _produces_evidencia · TRANSFERENCIA capstone) · 6 validation_checks BLOQUEANTES · traceability _anclaje_matriz heredado v3.2 · anti-prescriptive prompt operacional (cascade Step 1.3 IMARPOR-V2 · post PM-1.1 v2.8)
outputs:
  - pm-1-2.json maestro v4.2 con 6 secciones tripartitas + meta-bloque PRESENTACIÓN L1 onboarding único
  - Scope diferenciado por tipo_bloque (3 schemas distintos)
  - GFPI-F-134 cols 1-5 derivado por bloque APROPIACIÓN
  - Curación de material auténtico SOLO en sub-tipo APROPIACIÓN (Story A/B + vocab + functions + grammar POR RAP)
  - Materiales spark + diagnóstico transversal en APERTURA (NO conocimiento nuevo)
  - Mission brief + 5 sub-fases ABP en TRANSFERENCIA
required_inputs:
  - pm-1-1.json (v2.8 · estructura tripartita · 6 bloques con _anclaje_matriz)
  - pm-0-0-matriz-alineada.json (v1.2 · 8 criterios canon C01-C08)
  - pm-0-context.json (v3.2 · universo + personajes + grammar focus + L1 policy)
  - pm-1-2-input.json (input gates · raps_count · sesiones_count · onboarding_l1_decision)
feeds_into: [PM-2.0 (architect · hereda tipo_bloque), PM-2.1 (consume APERTURA), PM-2.2 (consume APERTURA), PM-2.3-2.10 (consumen APROPIACIÓN del RAP correspondiente), PM-3.5 (consume TRANSFERENCIA), PM-2.11 (Row Assembler · cols 1-5 hereda)]
v4_2_changes:
  - "NEW REGLA 10 input principal pm-1-1.json v2.8 + scope diferenciado por tipo_bloque heredado"
  - "NEW REGLA 11 schema diferenciado por tipo_bloque (3 schemas: APERTURA · APROPIACIÓN · TRANSFERENCIA)"
  - "NEW REGLA 12 traceability _anclaje_matriz heredado v3.2 + _produces_evidencia E1-E6"
  - "NEW REGLA 13 anti-prescriptive prompt operacional (canon §10/§11/§12 PLAN-FASE-1)"
  - "NEW 6 validation_checks BLOQUEANTES"
  - "9 REGLAS v2.6 PRESERVADAS aplicando SOLO a sub-tipo APROPIACIÓN (8 filtros · ficha curación · 20 vocab · etc.)"
  - "NEW restricción APERTURA: NO conocimiento ni habilidades nuevas (motivacional + diagnóstico + activación de previos)"
  - "NEW _produces_evidencia mapping: Story A → E1 · task derivada → E2 · Story B → E3 · speaking task → E4 · functions roleplay → E5"
v2_6_legacy_preserved:
  - "9 REGLAS de diseño v2.6 (DNA · Content Core · 20 vocab · curación · integrative task · eval matrix · coherencia · diversidad géneros · lenguaje híbrido)"
  - "8 filtros de selección"
  - "Ficha de curación por fuente (3 fuentes)"
  - "3 vías de curación (IA · Instructor · Híbrida)"
```

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-1.2 |
| **Nombre** | Scope & Sequence + Curación de Material Auténtico |
| **Subfase guía SENA** | 2. Presentación de la guía |
| **Ubicación en la Guía** | Pre-guía — ficha técnica + stories fundacionales |
| **Tipo de Evidencia SENA** | N/A (herramienta de diseño curricular) |
| **Instrumento** | Ficha técnica completa por guía + 3 fichas de curación |
| **Rol estratégico** | Prompt más crítico del sistema — las decisiones aquí determinan la calidad de PM-2.1 a PM-4.2 |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Ruta Macrotemática (6 bloques) | PM-1.1 |
| Bloque específico a desarrollar | PM-1.1 (uno a la vez) |
| Competencia y RAP literal del programa | Sofía Plus (instructor) |
| Diseño curricular (temas técnicos específicos) | Sofía Plus |
| Material auténtico adicional (opcional) | Instructor puede aportar sus propios textos/URLs |

---

## OUTPUT ESPERADO

Un documento titulado:
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Scope & Sequence + Curación`**

Que contiene **CUATRO bloques canónicos (v2.6)**:

### BLOQUE 0 — PRESENTACIÓN L1 (onboarding al aprendiz)
0. **Presentación:** Un texto motivacional a modo de introducción dirigido al aprendiz, **escrito en español (L1)**. Describe el objeto de estudio y su importancia en el ámbito productivo. Explica cómo será la formación y cuáles son los temas principales que se van a abordar. Texto conciso, **extensión máxima de diez renglones**. Este bloque onboarda al aprendiz al universo narrativo de la guía (personajes, empresa ficticia, sector) antes de cualquier contenido en inglés.

### BLOQUE A — SCOPE + INTEGRATIVE TASK + EVALUATION MATRIX
1. **Identification:** Programa, código, guía, macro-temática, intensidad, nivel CEFR (heredado de `pm-0-context.json.rango_cefr` para esta guía)
2. **Guide Design DNA:** Nombre conceptual, enfoque, entendimientos perdurables
3. **Content Core:** Technical topics, communicative functions, language functions, vocabulary (20 términos)
4. **The Integrative Task:** Proyecto formativo de la guía (descripción de la Misión Final que se ejecuta en S6½-S8)
5. **Evaluation Matrix:** Triada de evidencias SENA (conocimiento, desempeño, producto) + **matriz de 55 pts canónica (v2.6):** E1–E5 × 5pts = 25pts + E6 Cuestionario Consolidado × 25pts + Misión Final × 5pts = 55pts (Misión Final NO suma al total formal de 50pts — v2.3.1 canon)

### BLOQUE B — GFPI-F-134 COLUMNAS 1-5
6. **Competencia (Col 1):** Verbo infinitivo + objeto + contexto laboral (~150 chars)
7. **RAP (Col 2):** Enunciado Bloom L3+ con condición de desempeño
8. **Saberes: Conceptos y Principios (Col 3):** 8-10 conceptos clave con jerarquía
9. **Saberes: Procesos (Col 4):** 6-8 procedimientos secuenciados
10. **Criterios de Evaluación (Col 5):** 4-6 criterios observables

Este bloque es la entrada directa a PM-2.0 (Session Architect) y PM-2.11 (Row Assembler). Las columnas 6-11 se pueblan en Fase 2.

### BLOQUE C — CURACIÓN + UNIVERSO NARRATIVO
11. **Curated Sources:** 3 fichas de curación (cada una con análisis lingüístico-comunicativo completo) — ver §FICHA DE CURACIÓN abajo
12. **Instructor Selection:** Espacio para que el instructor elija 2 stories ganadoras y asigne roles (Story A → Reading, Story B → Listening, Story C → refuerzo)
13. **Universe Foundation:** Mapeo de cómo las 2 stories elegidas + el `pm-0-context.json.universo_narrativo` alimentan el universo narrativo completo de ESTA guía (personajes específicos, escenarios, productos tipicos, terminología del sector)

> **REGLA CRÍTICA v2.3 (recordatorio):** El universo narrativo es **ORIGINAL por guía**. No puede copiarse de otra guía. Los personajes, escenarios y productos deben derivar del sector + del `pm-0-context.json.universo_narrativo` del programa, pero adaptarse al enfoque específico de esta guía (G1 vs G2 vs G3…).

---

## MODELO HÍBRIDO DE CURACIÓN

La curación de material auténtico sigue un modelo de 3 vías:

### Vía 1 — IA busca (predeterminada)
La IA ejecuta web search para encontrar 3 fuentes reales, actuales y verificables sobre el macrotema. Presenta cada fuente con análisis completo. El instructor elige las 2 ganadoras.

### Vía 2 — Instructor aporta
El instructor trae sus propios textos, URLs o material auténtico. La IA los analiza con el mismo formato de ficha de curación. Útil cuando el instructor tiene material comprobado que funciona.

### Vía 3 — Híbrida
Cualquier combinación: la IA busca X fuentes, el instructor aporta Y textos, y juntos completan las 3 fichas de curación.

**Independientemente de la vía, cada texto pasa por el mismo análisis obligatorio.**

---

## 8 FILTROS DE SELECCIÓN

Cada fuente candidata debe pasar por estos 8 criterios:

| # | Filtro | Qué evalúa |
|---|--------|------------|
| 1 | **Autenticidad** | Publicación real, verificable con URL, no generada por IA |
| 2 | **Recencia** | Máximo 3 años de antigüedad (la tecnología se desactualiza rápido) |
| 3 | **Relevancia ESP** | Directamente conectada al macrotema Y al entorno ocupacional del programa |
| 4 | **Accesibilidad lingüística** | El texto original puede ser B1-B2, pero debe contener naturalmente las estructuras gramaticales target de A1-A2 (is/has/need/can) en contexto técnico |
| 5 | **Riqueza de vocabulario técnico** | Contiene al menos 15 de los 20 términos clave que se van a enseñar |
| 6 | **Gancho motivacional** | Algo que un aprendiz técnico joven de 18-22 años en Colombia encuentre interesante (no un white paper académico — algo tipo "A developer's workstation caught fire — here's what IT learned") |
| 7 | **Diversidad de género textual** | Las 3 fuentes deben ser de géneros diferentes: noticia/artículo, blog/tutorial, transcripción de video o caso de estudio |
| 8 | **Potencial visual** | Tiene diagramas, fotos o infografías reutilizables para el Canva deck |

---

## FICHA DE CURACIÓN (por cada fuente)

Para cada una de las 3 fuentes, se genera una ficha con:

```
FICHA DE CURACIÓN — Fuente [#]

METADATOS:
- Título: [título original]
- Autor: [autor si existe]
- Publicación: [medio/fuente]
- Fecha: [fecha de publicación]
- URL: [enlace verificable]
- Género textual: [artículo / blog / transcripción / caso de estudio]

RESUMEN (3 oraciones):
[Resumen conciso del contenido]

ANÁLISIS LINGÜÍSTICO-COMUNICATIVO:

Relevancia ESP:
- Conexión al macrotema: [cómo se conecta]
- Entorno ocupacional: [qué situación laboral representa]

Vocabulario técnico extraíble (10-15 términos):
| # | Término | Contexto en el texto |
|---|---------|---------------------|
| 1 |         |                     |

Funciones comunicativas TBLT que soporta:
- [ ] Describing  [ ] Requesting  [ ] Comparing  [ ] Reporting
- [ ] Classifying  [ ] Negotiating  [ ] Instructing  [ ] Justifying
- [ ] Otra: _______________

Estructuras gramaticales presentes naturalmente:
- [ ] Verb To Be  [ ] Have/Has  [ ] Present Simple  [ ] Demonstratives
- [ ] Articles  [ ] Possessives  [ ] Prepositions  [ ] Comparatives
- [ ] Otra: _______________

Nivel de HOTS que activa en actividades derivadas:
- [ ] Remember  [ ] Understand  [ ] Apply  [ ] Analyze
- [ ] Evaluate  [ ] Create

Rol propuesto:
- [ ] Story A → Base para Reading Anchor (PM-2.3)
- [ ] Story B → Base para Listening Script (PM-2.4)
- [ ] Story C → Backup / Extensión / Evaluación

Notas de adaptación:
- Mantener tal cual: [elementos que no requieren modificación]
- Simplificar para A1: [elementos que requieren adaptación lingüística]
- Potencial visual: [qué elementos gráficos se pueden extraer/reutilizar]
```

---

## FLUJO DE DECISIÓN DEL INSTRUCTOR

Después de ver las 3 fichas de curación:

1. **El instructor elige 2 stories ganadoras** y les asigna roles:
   - "Story A va para Reading Anchor (PM-2.3)"
   - "Story B va para Listening Script (PM-2.4)"
   - Story C queda como backup, extensión o material para evaluación

2. **A partir de esas 2 stories se levanta TODO el universo narrativo:**
   - Empresa ficticia (basada en el contexto de las stories)
   - Personajes (inspirados en los actores de las stories)
   - Escenarios laborales (adaptados de las situaciones reales)
   - Vocabulario técnico (extraído de las stories)
   - Grammar targets (presentes naturalmente en las stories)
   - Funciones comunicativas (las que soportan las stories)

3. **Ese universo se propaga a PM-2.1 → PM-2.9 → PM-4.2 → PM-2.10**

---

## OUTPUT GFPI-F-134 (Columnas 1-5)

Además del Scope & Sequence, PM-1.2 debe producir un bloque estructurado con las primeras 5 columnas de la matriz GFPI-F-134, que será consumido directamente por PM-2.0 (RAP Session Architect) y PM-2.11 (Row Assembler). Este output garantiza que la planeación pedagógica esté alineada desde el diseño curricular hasta los instrumentos de evaluación.

### Schema de salida `gfpi_f134_cols_1_5`

```yaml
gfpi_f134_cols_1_5:
  # Columna 1: COMPETENCIA
  competencia:
    codigo: ""              # Código numérico (ej. 22030101)
    nombre: ""              # Nombre completo de la competencia
    
  # Columna 2: RESULTADO DE APRENDIZAJE (RAP)
  resultado_aprendizaje:
    codigo: ""              # Código del RAP (ej. 220301011)
    descripcion: ""         # Descripción completa del RAP en estructura Bloom L3+
    
  # Columna 3: SABERES DE CONCEPTOS Y PRINCIPIOS
  saberes_conceptos_principios:
    - ""  # Lista de saberes cognitivos (el "saber")
          # Fuente: contenidos temáticos del Scope & Sequence
          # Formato: frases sustantivas, sin verbos
          # Ejemplo: "Norma ISO 1219 para simbología técnica"
          # Máximo 8-10 items
    
  # Columna 4: SABERES DE PROCESO
  saberes_proceso:
    - ""  # Lista de saberes procedimentales (el "saber hacer")
          # Fuente: habilidades y procedimientos del Scope & Sequence
          # Formato: frases con verbo en infinitivo
          # Ejemplo: "Identificar símbolos técnicos en planos industriales"
          # Máximo 6-8 items
          
  # Columna 5: CRITERIOS DE EVALUACIÓN
  criterios_evaluacion:
    - ""  # Lista de criterios de evaluación
          # Fuente: criterios del diseño curricular SENA
          # Formato: Verbo observable + objeto + estándar de calidad
          # Ejemplo: "Identifica correctamente el 90% de símbolos ISO 1219"
          # Máximo 4-6 items, 1:1 con las 6 evidencias de columna 8
          
  # Metadata del bloque
  source_pm: "PM-1.2"
  macrotheme: ""            # Nombre del macrotema (del PM-1.1)
  cefr_level: ""            # Nivel CEFR (ej. A1.1)
  program_type: ""          # "técnico" | "tecnólogo"
```

### Guía de generación de cada columna

**Columna 1 (COMPETENCIA):** Extraída del diseño curricular SENA o del `program_context` si fue proporcionado. Formato: máximo 150 caracteres, estructura verbo infinitivo + objeto + contexto.

**Columna 2 (RAP):** Descripción específica del RAP usando verbos Bloom L3+ (Aplicar, Analizar, Evaluar, Crear). Debe ser evaluable directamente por las 6 evidencias.

**Columna 3 (SABERES CONCEPTOS):** Derivados directamente de los **Technical Topics** del Scope & Sequence. Convertir títulos y temas en conceptos clave organizados jerárquicamente. Máximo 8-10.

**Columna 4 (SABERES PROCESO):** Derivados de las **Communicative Functions** y **Language Functions in Context** del Scope & Sequence. Formular como procedimientos secuenciados. Máximo 6-8.

**Columna 5 (CRITERIOS EVALUACIÓN):** Reflejar los estándares de calidad del diseño curricular y las 6 evidencias obligatorias (Reading, Writing, Listening, Speaking, Language Functions, Cuestionario). Cada criterio debe ser observable, medible y verificable.

---

## 9 REGLAS DE DISEÑO

### REGLA 1 — EL DNA DE LA GUÍA
Cada guía tiene una identidad conceptual clara:
- **Nombre de la Guía:** En inglés, orientado al rol profesional (ej: "The Hardware Specialist")
- **Enfoque y Conceptualización:** Párrafo que explica el "por qué" de esta guía dentro del programa
- **Entendimientos Perdurables:** 3 statements que el aprendiz retendrá después de la guía

### REGLA 2 — CONTENT CORE (EL ADN TÉCNICO)
El contenido técnico se organiza en 4 categorías:
- **Technical Topics:** Lista de temas técnicos específicos del bloque
- **Communicative Functions:** Funciones comunicativas ESP (describing, classifying, comparing, requesting, reporting, etc.)
- **Language Functions in Context:** Estructuras gramaticales que sirven a las funciones comunicativas, con ejemplos en contexto
- **Key Vocabulary:** EXACTAMENTE 20 términos esenciales organizados en categorías

### REGLA 3 — VOCABULARIO: 20 TÉRMINOS, NO MÁS, NO MENOS
La tabla de vocabulario tiene EXACTAMENTE 20 términos. Cada término incluye:
- El término en inglés
- Su categoría (Internal, Output, Connector, Measurement, etc.)
- Los términos deben ser los más frecuentes y útiles en el entorno ocupacional del programa
- Idealmente, los términos se extraen de las stories auténticas curadas

### REGLA 4 — CURACIÓN ANTES DE DISEÑAR
La curación de material auténtico es el paso ANTES de diseñar actividades. Las stories definen:
- Qué vocabulario se enseña (viene de los textos reales)
- Qué grammar targets se trabajan (están presentes en los textos)
- Qué funciones comunicativas se practican (las que usan los textos)
- Qué universo narrativo se construye (se deriva de los textos)

### REGLA 5 — THE INTEGRATIVE TASK
Cada guía culmina en una tarea integradora que:
- Es auténtica al entorno laboral del programa
- Requiere el uso de TODO el vocabulario y las funciones comunicativas de la guía
- Tiene un entregable concreto (documento escrito + presentación oral)
- Evalúa la transferencia real del aprendizaje

### REGLA 6 — EVALUATION MATRIX (TRIADA SENA)
La matriz de evaluación define 3 tipos de evidencia:

| Tipo | Técnica | Instrumento |
|------|---------|-------------|
| Conocimiento | Formulación de preguntas | Cuestionario (PM-4.2) |
| Desempeño | Observación directa | Checklist (PM-4.1) |
| Producto | Valoración de producto | Rúbrica (PM-4.1) |

### REGLA 7 — COHERENCIA CON EL BLOQUE DEL PM-1.1
El Scope & Sequence es el desarrollo detallado de UN bloque específico del PM-1.1. Debe mantener:
- El mismo nombre del bloque
- La misma justificación pedagógica
- El mismo nivel CEFR sugerido
- La conexión con los bloques anterior y siguiente

### REGLA 8 — DIVERSIDAD DE GÉNEROS TEXTUALES
Las 3 fuentes curadas DEBEN ser de géneros diferentes. Si las stories son del mismo género, se pierde riqueza comunicativa. Combinaciones ideales:
- Noticia técnica + Blog/tutorial + Transcripción de video
- Artículo de industria + Caso de estudio + Entrevista/podcast
- Report + FAQ/How-to + Nota de prensa

### REGLA 9 — LENGUAJE HÍBRIDO
Las instrucciones y descricciones están en español (son para el instructor que diseña). El contenido técnico y los ejemplos están en inglés (son el material que se usará con los aprendices).

---

## PROMPT PARA IA

```
ACTÚA COMO: Senior ESP Curriculum Designer & Technical Content Curator. No escribes textos genéricos — localizas, filtras y propones material auténtico (Authentic Materials) que sea actual, relevante y altamente motivador para aprendices técnicos jóvenes. Piensas como un editor de Wired, TechCrunch o IEEE Spectrum, pero con la pedagogía de un instructor de lenguas ESP.

Tu tarea: Generar el SCOPE & SEQUENCE completo + CURACIÓN DE MATERIAL AUTÉNTICO para UNA guía de aprendizaje específica.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código]
- Tipo: [Técnico / Tecnológico]
- Bloque #: [número, del 1 al 6]
- Nombre del bloque (de PM-1.1): [nombre ESP]
- Competencia del programa: [literal de Sofía Plus]
- RAP: [literal de Sofía Plus — opcional]
- Temas técnicos del bloque: [lista del diseño curricular]
- Intensidad: [default 24h directa]
- Nivel CEFR: [default A1.1-A1.2]
- Material auténtico adicional (opcional): [URLs, textos o referencias que el instructor aporta]

### INSTRUCCIONES DE GENERACIÓN:

**BLOQUE A — SCOPE & SEQUENCE:**

1. Genera la IDENTIFICATION (programa, guía, macro-temática, intensidad, nivel CEFR)

2. Genera el GUIDE DESIGN DNA:
   - Nombre conceptual de la guía (en inglés, orientado al rol profesional)
   - Enfoque y conceptualización (párrafo que explica el "por qué")
   - 3 entendimientos perdurables

3. Genera el CONTENT CORE:
   - Technical Topics (lista de temas técnicos del bloque)
   - Communicative Functions (funciones ESP relevantes)
   - Language Functions in Context (estructuras gramaticales con ejemplos en contexto)
   - Key Vocabulary: EXACTAMENTE 20 términos en tabla con categoría

4. Genera THE INTEGRATIVE TASK:
   - Nombre del proyecto (en inglés)
   - Descripción de la tarea integradora
   - Entregables concretos (escrito + oral)

5. Genera la EVALUATION MATRIX:
   - 3 evidencias (Conocimiento, Desempeño, Producto)
   - Técnica, instrumento y criterios para cada una

**BLOQUE B — OUTPUT GFPI-F-134 (COLUMNAS 1-5):**

6. Genera un bloque estructurado `gfpi_f134_cols_1_5` con las primeras 5 columnas de la matriz GFPI-F-134:
   - **Columna 1 (COMPETENCIA):** Código y nombre literal del diseño curricular (o del `program_context` si fue proporcionado)
   - **Columna 2 (RAP):** Código y descripción del RAP usando verbos Bloom L3+
   - **Columna 3 (SABERES CONCEPTOS):** Extraer 8-10 saberes cognitivos del Content Core (Technical Topics) que generaste. Formato: frases sustantivas sin verbos.
   - **Columna 4 (SABERES PROCESO):** Extraer 6-8 saberes procedimentales de las Communicative Functions y Language Functions que generaste. Formato: frases con verbo en infinitivo.
   - **Columna 5 (CRITERIOS EVALUACIÓN):** Generar 4-6 criterios observables y medibles alineados con las 6 evidencias de evaluación (Reading, Writing, Listening, Speaking, Language Functions, Cuestionario). Formato: Verbo observable + objeto + estándar de calidad.
   
   Incluir también metadata: macrotheme, cefr_level, program_type.
   
   Este bloque se pasa directamente a PM-2.0 (RAP Session Architect) y PM-2.11 (Row Assembler) para que generen las columnas 6-11 de GFPI-F-134.

**BLOQUE C — CURACIÓN DE MATERIAL AUTÉNTICO:**

7. Busca 3 fuentes REALES y VERIFICABLES sobre el macrotema usando web search:
   - Cada fuente debe ser de un género textual DIFERENTE (artículo, blog, transcripción/caso de estudio)
   - Máximo 3 años de antigüedad
   - Relevancia directa al macrotema y al entorno ocupacional del programa
   - Gancho motivacional para aprendices técnicos jóvenes de 18-22 años
   - Potencial visual (diagramas, fotos, infografías)

8. Para cada fuente, genera una FICHA DE CURACIÓN con:
   - Metadatos completos (título, autor, publicación, fecha, URL)
   - Género textual
   - Resumen (3 oraciones)
   - Relevancia ESP y conexión al macrotema
   - Vocabulario técnico extraíble (10-15 términos con contexto)
   - Funciones comunicativas TBLT que soporta (marcar las apliquen)
   - Estructuras gramaticales presentes naturalmente (marcar las apliquen)
   - Nivel de HOTS que activa
   - Rol propuesto (Story A → Reading / Story B → Listening / Story C → Backup)
   - Notas de adaptación (qué mantener, qué simplificar para A1, potencial visual)

9. Si el instructor aportó material adicional, analízalo con el mismo formato de ficha.

10. Presenta las 3 fichas y explica por qué cada una es candidata para cada rol.

**NOTA PARA EL INSTRUCTOR:**
Después de ver las 3 fichas, elige 2 stories ganadoras y asigna roles.
A partir de esas 2 stories se levantará TODO el universo narrativo de la guía.

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Vocabulario: exactamente 20 términos (idealmente extraídos de las stories)
- Nivel CEFR: A1.1-A1.2
- Las 3 fuentes DEBEN ser de géneros textuales diferentes
- Cada ficha DEBE incluir el análisis lingüístico-comunicativo completo
- Las fuentes deben ser reales, verificables con URL
- Coherencia con el diseño curricular de Sofía Plus
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.1 | Un bloque de la ruta macro-temática + `program_context` (opcional) |
| **Alimenta a** | PM-2.0 | Columnas 1-5 de GFPI-F-134 (competencia, RAP, saberes, criterios) |
| **Alimenta a** | PM-2.1 a PM-2.10 | El DNA, vocabulario, grammar targets, universo narrativo Y las stories auténticas se heredan |
| **Alimenta a** | PM-2.3 | Story A → base para el Reading Anchor |
| **Alimenta a** | PM-2.4 | Story B → base para el Listening Script |
| **Alimenta a** | PM-2.11 | Columnas 1-5 de GFPI-F-134 como punto de partida para ensamble de fila completa |
| **Alimenta a** | PM-3.1 | El Scope & Sequence define la estructura del Playbook |
| **Alimenta a** | PM-3.3 | El potencial visual de las stories alimenta el Canva deck |
| **Alimenta a** | PM-4.1, PM-4.2 | La Evaluation Matrix define los instrumentos |
| **Se ubica en** | Flujo operativo SENA | Actividad 4 (Desarrollar scope por bloque) |

---

*PM-1.2: Scope & Sequence — Desarrollo por Bloque + Curación de Material Auténtico*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*

---

## EXTENSIÓN v4.2 — SCOPE DIFERENCIADO POR `tipo_bloque` HEREDADO DE PM-1.1 v2.8 (2026-05-01)

> [!warning] PARADIGM SHIFT canonizado · Sergio Cortés decisión arquitectónica 2026-05-01
>
> PM-1.2 v2.6 generaba scope + curación uniforme por bloque del PM-1.1. v4.2 canoniza scope DIFERENCIADO según `tipo_bloque` heredado de PM-1.1 v2.8 (estructura tripartita): APERTURA (motivacional + diagnóstico + activación · NO conocimiento nuevo) · APROPIACIÓN (curación POR RAP · vivero de evidencias formales E1-E6) · TRANSFERENCIA (capstone · mission brief + 5 sub-fases ABP).
>
> **Razón:** Sergio canonizó (2026-05-01) la realidad pedagógica de la pipeline: cada `tipo_bloque` requiere scope cualitativamente distinto · NO hay un schema universal · forzar uniformidad pierde traceability canon.
>
> **REGLAS v2.6** (1-9) permanecen como REFERENCIA aplicando SOLO a sub-tipo APROPIACIÓN. Las nuevas REGLAS 10-13 son canon obligatorio v4.2.

### REGLA 10 — INPUT PRINCIPAL · pm-1-1.json v2.8 + scope diferenciado por tipo_bloque

PM-1.2 v4.2 consume como input PRIMARIO:

```json
{
  "pm_1_1_ref": "pm-1-1.json (v2.8 · 6 bloques tripartitos · _anclaje_matriz por bloque)",
  "pm_0_0_matriz_ref": "pm-0-0-matriz-alineada.json (v1.2 · 8 criterios canon C01-C08)",
  "pm_0_context_ref": "pm-0-context.json (v3.2 · universo + personajes + grammar focus)"
}
```

**PM-1.2 NO reconstruye estructura tripartita.** PM-1.2 toma los 6 bloques heredados y para cada uno PRODUCE scope según su `tipo_bloque`.

### REGLA 11 — SCHEMA DIFERENCIADO POR `tipo_bloque` (3 SCHEMAS DISTINTOS)

#### Schema APERTURA (transversal · sub-bloque ÚNICO en pm-1-2.json)

```jsonc
{
  "bloque_id": "B0",
  "tipo_bloque": "APERTURA",
  "scope_diferenciado": "transversal_motivacional_diagnostico",

  "_restriccion_canon": "Acá NO inicia construcción de conocimiento ni habilidades nuevas. Solo motivacional + diagnóstico + activación de aprendizajes previos.",

  "materiales_spark": [
    {
      "arquetipo_target": "PM-2.1 Spark #1",
      "tipo_recurso": "real_artifact|video|imagen|testimonio|simulacion",
      "descripcion": "...",
      "fuente": "...",
      "duracion_estimada_min": 15,
      "enfoque_motivacional": "...",        // CLAVE Sergio: por qué este artefacto motiva al aprendiz
      "primer_acercamiento_a_temas": ["..."], // qué temas del programa "huele" el aprendiz aquí
      "_anclaje_matriz": {
        "alcance": "competencia_completa",
        "raps_atravesados": ["RA1","RA2","RA3","RA4"]
      }
    }
    // ... 4 arquetipos total (2 Spark PM-2.1 + 2 Gap Analysis PM-2.2)
  ],

  "vocabulario_diagnostico": [
    {
      "termino": "...",
      "definicion_l1_o_visual": "...",
      "_proposito": "diagnostico_NO_apropiacion",  // marca canon · NO se enseña
      "_anclaje_matriz": {"raps_atravesados": ["..."]}
    }
    // ~10-15 términos diagnósticos (NO los 20 canon de APROPIACIÓN)
  ],

  "aprendizajes_previos_a_activar": [
    {
      "saber_previo": "...",                       // qué espera saber el aprendiz al entrar
      "como_se_diagnostica": "...",                // técnica de diagnóstico (NO eval formal)
      "_anclaje_matriz": {"raps_target": ["..."]}
    }
  ],

  "contexto_general_raps_presentado": {
    "narrativa_introduccion": "...",               // historia/escenario que presenta los 4 RAPs
    "raps_overview": [
      {"rap_id": "RA1", "presentacion_corta": "...", "rol_en_pipeline": "..."},
      // ... RA2 RA3 RA4
    ]
  },

  "transversalidad_justificacion": "...",
  "_anclaje_matriz_bloque": { /* heredado de pm-1-1.json B0 */ }
}
```

**Validaciones canon APERTURA:**
- NO contiene `key_vocabulary_per_rap` (eso es APROPIACIÓN)
- NO contiene `grammar_items_per_rap` (eso es APROPIACIÓN)
- NO contiene `story_a_reading` ni `story_b_listening` clásica (eso es APROPIACIÓN)
- NO produce evidencias formales E1-E6
- Cada material tiene `enfoque_motivacional` non-empty (SERGIO canon)
- Cada arquetipo declara `primer_acercamiento_a_temas`

#### Schema APROPIACIÓN (por RAP · N sub-bloques en pm-1-2.json)

```jsonc
{
  "bloque_id": "B1",
  "tipo_bloque": "APROPIACION",
  "scope_diferenciado": "completo_por_rap",
  "rap_target": "RA1",

  "story_a_reading": {
    "titulo": "...",
    "texto_o_url": "...",
    "extension_palabras": 200,
    "cefr_subnivel": "A1.2",
    "filtros_aplicados_8": [...],                  // ver REGLA v2.6 #6
    "ficha_curacion": { /* ver REGLA v2.6 #4 ficha completa */ },
    "_produces_evidencia": "E1",                   // CANON v4.2 · trazabilidad de evidencias
    "_consumed_by_pm": "PM-2.3",
    "_anclaje_matriz": {
      "rap_target": "RA1",
      "saberes_que_demanda": ["RA1.SC.1","RA1.SC.2"],
      "criterios_canon_que_evalua": ["C01"]
    }
  },

  "story_b_listening": {
    "titulo": "...",
    "audio_o_url": "...",
    "duracion_segundos": 90,
    "transcript": "...",
    "filtros_aplicados_8": [...],
    "ficha_curacion": { /* ficha completa */ },
    "_produces_evidencia": "E3",
    "_consumed_by_pm": "PM-2.6",
    "_anclaje_matriz": {
      "rap_target": "RA1",
      "saberes_que_demanda": ["..."],
      "criterios_canon_que_evalua": ["..."]
    }
  },

  "key_vocabulary_per_rap": [
    {
      "termino": "...",
      "definicion": "...",
      "ejemplo_uso": "...",
      "_anclaje_matriz": {"saber_concepto": "RA1.SC.1"}
    }
    // 20 términos canon (REGLA v2.6 #3)
  ],

  "language_functions_per_rap": [
    {
      "funcion": "F1: requesting clarification",
      "exponentes": ["Could you say that again?", "..."],
      "_produces_evidencia": "E5",                 // si esta función va a roleplay E5
      "_anclaje_matriz": {"saber_proceso": "RA1.SP.1"}
    }
    // 5 funciones canon F1-F5
  ],

  "grammar_items_per_rap": [
    {
      "estructura": "Verb to be · descripción equipo",
      "patron_canonical": "[subject] + is/are + [equipment]",
      "ejemplos_contextualizados": ["..."],
      "_anclaje_matriz": {"cefr_subnivel": "A1.2", "criterio_canon": "C01"}
    }
  ],

  "task_writing_derivada": {
    "descripcion": "...",                          // task que produce E2
    "input_origen": "story_a_reading",
    "_produces_evidencia": "E2",
    "_consumed_by_pm": "PM-2.4"
  },

  "task_speaking_derivada": {
    "descripcion": "...",                          // task que produce E4 parcial/final
    "input_origen": "story_b_listening + language_functions",
    "_produces_evidencia": "E4",
    "_consumed_by_pm": "PM-2.8"
  },

  "analisis_linguistico_cefr": {
    "subnivel_objetivo": "A1.2",
    "puede_hacer_descriptors": ["..."],
    "input_lectura_difficulty": "...",
    "input_listening_difficulty": "..."
  },

  "_anclaje_matriz_bloque": { /* heredado de pm-1-1.json B1 */ }
}
```

**Validaciones canon APROPIACIÓN:**
- TIENE `story_a_reading` + `story_b_listening` (Story A/B canon)
- TIENE 20 términos `key_vocabulary_per_rap` (REGLA v2.6 #3)
- TIENE 5 funciones `language_functions_per_rap` (F1-F5)
- TIENE `grammar_items_per_rap` derivado del CEFR del RAP
- Cada elemento productor declara `_produces_evidencia` apuntando a E1-E6 (canon v4.2 traceability evidencias)
- Cada elemento productor declara `_consumed_by_pm` apuntando a PM-2.x destino
- Cada elemento tiene `_anclaje_matriz` ligando a saberes/criterios canon del RAP

#### Schema TRANSFERENCIA (capstone · sub-bloque ÚNICO en pm-1-2.json)

```jsonc
{
  "bloque_id": "BT",
  "tipo_bloque": "TRANSFERENCIA",
  "scope_diferenciado": "capstone_abp_integrador",

  "mission_brief": {
    "titulo": "Final Mission · ...",
    "escenario_laboral_real": "...",               // contexto auténtico de trabajo
    "rol_aprendiz_asignado": "...",                // qué rol asume el aprendiz
    "stakeholders_simulados": ["..."],
    "producto_final_esperado": "...",
    "criterios_de_exito": ["..."],
    "_anclaje_matriz": {
      "raps_movilizados": ["RA1","RA2","RA3","RA4"],
      "criterio_canon_capstone": "C08",
      "evidencia_capstone": "E-Misión"
    }
  },

  "subfases_abp_context": [
    {
      "fase": 1,
      "nombre": "Planeación",
      "duracion_horas": 1.5,
      "actividades_aprendiz": ["..."],
      "deliverable_intermedio": "...",
      "scaffolding_instructor": "..."
    },
    // fases 2-5 (Diseño · Desempeño · Presentación · Eval reflexiva)
  ],

  "materiales_simulacion": [
    {
      "tipo": "template_documento|formato|checklist|asset_visual",
      "descripcion": "...",
      "_anclaje_matriz": {"raps_movilizados": ["..."]}
    }
  ],

  "rubrica_abp_capstone": {
    "criterios_evaluacion": [
      {"criterio": "...", "niveles_desempeño": [...], "ponderacion": 25}
    ],
    "_consumed_by_pm": "PM-3.5",
    "_produces_evidencia": "E-Misión"
  },

  "_anclaje_matriz_bloque": { /* heredado de pm-1-1.json BT */ }
}
```

**Validaciones canon TRANSFERENCIA:**
- TIENE `mission_brief` con escenario auténtico
- TIENE 5 sub-fases ABP (Planeación · Diseño · Desempeño · Presentación · Eval reflexiva)
- TIENE `materiales_simulacion` (templates · formatos)
- TIENE `rubrica_abp_capstone` ancla a C08 + E-Misión
- NO tiene Story A/B clásica (eso es APROPIACIÓN)
- NO produce E1-E5 (solo E-Misión)

### REGLA 12 — TRACEABILITY `_anclaje_matriz` HEREDADO v3.2 + `_produces_evidencia` MAPPING

Cada elemento del scope (en cualquier sub-bloque) DEBE tener `_anclaje_matriz` con:
- Para APERTURA: `alcance` + `raps_atravesados` (transversal)
- Para APROPIACIÓN: `rap_target` + `saberes_que_demanda` + `criterios_canon_que_evalua`
- Para TRANSFERENCIA: `raps_movilizados` + `criterio_canon_capstone` + `evidencia_capstone`

**NEW v4.2 — `_produces_evidencia` mapping (canon traceability evidencias):**

| Elemento de scope | `_produces_evidencia` | `_consumed_by_pm` |
|---|---|---|
| `story_a_reading` (APROPIACIÓN) | E1 | PM-2.3 |
| `task_writing_derivada` (APROPIACIÓN) | E2 | PM-2.4 |
| `story_b_listening` (APROPIACIÓN) | E3 | PM-2.6 |
| `task_speaking_derivada` (APROPIACIÓN) | E4 | PM-2.8 |
| `language_functions_per_rap` (algunas · APROPIACIÓN) | E5 | PM-2.9 |
| `key_vocabulary_per_rap` + `grammar_items_per_rap` consolidados | E6 | PM-4.2 |
| `mission_brief` + `rubrica_abp_capstone` (TRANSFERENCIA) | E-Misión | PM-3.5 |

Si un elemento NO produce evidencia formal (e.g., `aprendizajes_previos_a_activar` en APERTURA · `materiales_simulacion` en TRANSFERENCIA), declara `_produces_evidencia: null`.

### REGLA 13 — PROMPT OPERACIONAL DEBE RESPETAR LIBERTAD LLM (heredado §10/§11/§12 PLAN-FASE-1)

El orchestrator que dispatchea Agent ejecutando PM-1.2 v4.2 DEBE:

SÍ pasar al Agent:
- Master prompt PM-1.2 v4.2 completo (REGLAS 10-13)
- pm-1-1.json v2.8 (estructura tripartita · 6 bloques con `_anclaje_matriz`)
- pm-0-0-matriz-alineada.json v1.2 (8 criterios canon)
- pm-0-context.json v3.2 (universo + personajes + grammar focus)
- pm-1-2-input.json (gates input)
- 6 validation_checks BLOQUEANTES
- Bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL" explícito

NO pasar al Agent:
- Template literal con scope pre-fabricado por bloque
- Elección de fuentes auténticas pre-decidida (LLM cura via 8 filtros)
- 20 términos vocab pre-listados (LLM extrae del universo + matriz)
- 5 funciones F1-F5 pre-redactadas
- Mission brief pre-redactado (LLM diseña desde escenario_hero del PM-0 v3.2)
- Sub-fases ABP pre-detalladas (LLM contextualiza al sector)

**LIBERTAD LLM REAL** sobre:
- Curación de fuentes (3 vías v2.6 · LLM elige)
- Selección de Story A vs Story B candidatas (8 filtros v2.6)
- Vocabulario diagnóstico APERTURA (cantidad + términos · LLM ajusta)
- Materiales spark APERTURA (tipos de recursos · LLM diseña según universo)
- Grammar items APROPIACIÓN (LLM elige del CEFR del RAP)
- Mission brief TRANSFERENCIA (escenario laboral · LLM contextualiza)
- 5 sub-fases ABP (duración + actividades · LLM balancea ≤12h total)

**LIBERTAD LLM SOBRE NADA (canon estricto):**
- Estructura 6 sub-bloques tripartitos (REGLA 11 · 1+N+1 + meta-bloque PRESENTACIÓN L1)
- Schemas diferenciados por tipo_bloque (REGLA 11 · 3 schemas)
- `_anclaje_matriz` obligatorio en cada elemento (REGLA 12)
- `_produces_evidencia` mapping canon (REGLA 12 · E1-E6+E-Misión)
- 6 validation_checks BLOQUEANTES (REGLA 14)
- 9 REGLAS v2.6 preservadas dentro de APROPIACIÓN (8 filtros · 20 vocab · 5 funciones · etc.)

### REGLA 14 — VALIDATION POST-GENERATION · 6 CHECKS

```jsonc
"validation_checks": [
  {"id": 1, "name": "scope_diferenciado_por_tipo_bloque", "status": "PASS|FAIL"},
  {"id": 2, "name": "apertura_scope_transversal", "status": "PASS|FAIL"},        // NO conocimiento nuevo · sí motivacional + diagnóstico
  {"id": 3, "name": "apropiacion_scope_completo_por_rap", "status": "PASS|FAIL"}, // Story A + Story B + 20 vocab + 5 functions + grammar + tasks E2/E4
  {"id": 4, "name": "transferencia_scope_capstone", "status": "PASS|FAIL"},      // mission brief + 5 sub-fases ABP + materiales + rúbrica
  {"id": 5, "name": "cobertura_criterios_canon_heredada", "status": "PASS|FAIL"},// C01-C08 visibles en _anclaje_matriz de elementos
  {"id": 6, "name": "traceability_matriz_completa", "status": "PASS|FAIL"}        // _anclaje_matriz + _produces_evidencia en cada elemento (heredado v3.2)
]
```

Si CUALQUIER check FAIL · output marcado `enriched: false` · BLOQUEANTE para Step 1.4 (PM-2.0 architect cascade).

### REGLA 15 — ESTRUCTURA OUTPUT pm-1-2.json v4.2

Output schema:

```jsonc
{
  "pm_id": "PM-1.2",
  "pm_name": "Scope & Sequence + Curación · Tripartita Diferenciada",
  "pm_version": "4.2",
  "run_id": "...",
  "generated_date": "...",

  "_pm11_ref": "pm-1-1.json (v2.8 · 6 bloques tripartitos)",
  "_pm00_matriz_ref": "pm-0-0-matriz-alineada.json",
  "_pm0_context_ref": "pm-0-context.json",

  "meta_bloque_presentacion_l1": {                 // ÚNICO · onboarding L1 al programa entero
    "tipo": "META_BLOQUE_ONBOARDING",
    "narrativa_l1": "...",
    "objetivos_l1": [...],
    "encuadre_l1": "...",
    "_aplicabilidad": "previo_a_S1_apertura"
  },

  "sub_bloques_tripartitos": [
    { /* B0 APERTURA · schema APERTURA */ },
    { /* B1 APROPIACIÓN RA1 · schema APROPIACIÓN */ },
    { /* B2 APROPIACIÓN RA2 · schema APROPIACIÓN */ },
    { /* ... */ },
    { /* BT TRANSFERENCIA · schema TRANSFERENCIA */ }
  ],

  "validation_checks": [...],
  "enriched": true|false
}
```

### REGLA 16 — RELACIÓN CON OTROS PROMPTS v4.2

| Relación | Prompt | Cambio v4.2 |
|----------|--------|-------------|
| **Consume de (NEW · CRÍTICO)** | PM-1.1 v2.8 | estructura tripartita 6 bloques con _anclaje_matriz |
| **Consume de** | PM-0.0 v1.2 | matriz alineada con 8 criterios canon |
| **Consume de** | PM-0 v3.2 | universo + personajes + grammar focus |
| **Alimenta a** | PM-2.0 architect (NEW v2.x) | session blueprint hereda tipo_bloque + scopes diferenciados |
| **Alimenta a** | PM-2.1 | toma `materiales_spark` + `enfoque_motivacional` del bloque APERTURA |
| **Alimenta a** | PM-2.2 | toma `aprendizajes_previos_a_activar` + `contexto_general_raps_presentado` del bloque APERTURA |
| **Alimenta a** | PM-2.3 | toma `story_a_reading` + `key_vocabulary_per_rap` del bloque APROPIACIÓN del RAP |
| **Alimenta a** | PM-2.4 | toma `task_writing_derivada` (E2) + grammar |
| **Alimenta a** | PM-2.5 | toma `key_vocabulary_per_rap` + scaffolds |
| **Alimenta a** | PM-2.6 | toma `story_b_listening` (E3) |
| **Alimenta a** | PM-2.8 | toma `task_speaking_derivada` (E4) |
| **Alimenta a** | PM-2.9 | toma `language_functions_per_rap` (E5) |
| **Alimenta a** | PM-2.10 | toma `grammar_items_per_rap` |
| **Alimenta a** | PM-2.11 | Cols 1-5 GFPI-F-134 derivado de matriz heredada |
| **Alimenta a** | PM-3.5 | toma `mission_brief` + `subfases_abp_context` + `rubrica_abp_capstone` del bloque TRANSFERENCIA |

### REGLA 17 — DEPRECATION PATH v2.6 → v4.2

Programas con `pm-1-2.json` v2.6 (sin estructura tripartita · sin `_produces_evidencia` · sin scope diferenciado):
- KEEP los archivos legacy en run dir (NO eliminar)
- Generar nuevo `pm-1-2.json` v4.2 cuando se re-run el programa
- Marcar artefactos v2.6 como `*.legacy-v2-6` (sufijo informativo)

Run resultante puede tener AMBOS: legacy v2.6 (auditoría) + v4.2 (operacional).

---

## ESTRUCTURA OPERACIONAL v4.2 (resumen ejecutivo)

```
pm-1-1.json v2.8 (6 bloques tripartitos · _anclaje_matriz por bloque)
  +
pm-0-0-matriz-alineada.json v1.2 (8 criterios canon)
  +
pm-0-context.json v3.2 (universo + personajes)
  +
pm-1-2-input.json (gates input)
  ↓
PM-1.2 v4.2 dispatcher (Agent con prompt anti-prescriptive · libertad LLM REAL)
  ↓
pm-1-2.json v4.2 maestro
  ├─ meta_bloque_presentacion_l1 (ÚNICO · onboarding L1)
  └─ sub_bloques_tripartitos:
      ├─ B0 APERTURA   (motivacional + diagnóstico + activación · NO conocimiento nuevo)
      ├─ B1-Bn APROPIACIÓN (Story A + B + vocab + functions + grammar + tasks · _produces_evidencia E1-E5)
      └─ BT TRANSFERENCIA (mission brief + 5 sub-fases ABP + rúbrica · _produces_evidencia E-Misión)
  ↓
6 validation_checks (5 estructurales + 1 traceability heredado)
  ↓
Step 1.4 PM-2.0 architect cascade (session blueprint hereda tipo_bloque)
```

---

## CASO OPERACIONAL CONFIRMADO (pendiente Step 1.3.D dispatch IMARPOR-V2)

**Input esperado IMARPOR-V2:**
- pm-1-1.json v2.8 · 6 bloques tripartitos (1 + 4 + 1) con _anclaje_matriz validados
- pm-0-0-matriz-alineada.json v1.1 · 4 RAPs · 8 criterios C01-C08 · 4 overlaps
- pm-0-context.json v3.2 · 21 keys · universo banana cold chain
- tipo: Curso Complementario · sesiones_count: 12

**Output esperado pm-1-2.json v4.2:**
- 1 meta_bloque PRESENTACIÓN L1
- 6 sub_bloques tripartitos:
  - B0 APERTURA: 4 materiales_spark contextualizados banana cold chain + ~12 vocab diagnóstico + 4 aprendizajes_previos_a_activar + contexto_general 4 RAPs
  - B1 APROPIACIÓN RA1: Story A reefer ship vocabulary + Story B SMCP audio + 20 vocab RA1 + 5 functions + grammar + task writing E2 + task speaking E4-parcial
  - B2 APROPIACIÓN RA2: Story A SMCP messages + Story B VHF transmission + 20 vocab RA2 + 5 functions + grammar + tasks
  - B3 APROPIACIÓN RA3: Story A grammar applications + Story B port commands + 20 vocab RA3 + 5 functions + grammar + tasks
  - B4 APROPIACIÓN RA4: Story A role descriptions + Story B operations briefing + 20 vocab RA4 + 5 functions + grammar + tasks
  - BT TRANSFERENCIA: mission brief Pre-Departure Banana Reefer Compliance Check + 5 sub-fases ABP S11+S12 + materiales simulación + rúbrica capstone C08
- 6/6 validation_checks PASS
- Cada elemento con `_anclaje_matriz` + `_produces_evidencia` mapping completo

---

*PM-1.2 v4.2 · Scope & Sequence Tripartita Diferenciada · 3 schemas distintos por tipo_bloque · `_produces_evidencia` mapping canon · Anti-prescriptive prompt operacional*
*Sergio Cortés decisión arquitectónica 2026-05-01 · cascade Phase 1 Step 1.3 IMARPOR-V2 · post PM-1.1 v2.8*
