# Catálogo de Arquetipos Canónicos — Fase 2

Catálogo extraído de evidencia operacional real (DIESEL × 3 + MGV-2026-04-20). Estos son los arquetipos que el orquestador presenta al instructor en el Gate Humano 1.

**Conteo total:** 39 arquetipos canonizados (1 + 1 + 6 + 5 + 5 + 6 + 5 + 5 + 5 + 5 = 39 considerando solo el modo extensible canónico de cada PM creativo · master prompt PM-2.0 §211-223 lista hasta 52 si se cuenta máximo de cada rango).

---

## PM-2.1 — The Spark (Reflexión Inicial S1) · v3.0

**2 modos canonizados:**
- **DEFAULT** (`mgv_compendio_metodologico` · 1 arquetipo): The Narrative Scenario (EXPLORE/ENGAGE/DISCOVER)
- **EXTENSIBLE** (`diesel_secuencia_encadenada` · 4 arquetipos secuencia encadenada)

**Catálogo modo EXTENSIBLE (canonizado por DIESEL):**

| ID | Nombre | Foco pedagógico | Aplicabilidad |
|----|--------|-----------------|---------------|
| **A** | Visual/Infografía | Activación visual de problema técnico | Cohortes con baja literacidad inicial |
| **B** | Story/Narrativa | Narrativa breve con personaje y conflicto | Cohortes con interés en lectura |
| **C** | News/Noticia técnica | Titular o noticia real adaptada del sector | Cohortes mayores · realidad del oficio como motor |
| **D** | Debate/Encuesta | Pregunta polarizadora · encuesta rápida | Cohortes participativas |

**Ref operacional:** DIESEL-2026-04-19 pm-2-1.json `archetype_used: ["A — Visual/Infografía", "B — Story/Narrativa", "C — News/Noticia técnica", "D — Debate/Encuesta"]`

---

## PM-2.2 — Gap Analysis (Contextualización S1) · v3.0

**2 modos canonizados:**
- **DEFAULT** (`mgv_compendio_metodologico` · 1 arquetipo): The Mirror (WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT)
- **EXTENSIBLE** (`diesel_secuencia_encadenada` · 4 arquetipos secuencia encadenada)

**Catálogo modo EXTENSIBLE (canonizado por DIESEL):**

| ID | Nombre | Foco pedagógico | Aplicabilidad |
|----|--------|-----------------|---------------|
| **A** | Self-assessment/KWL | Autoevaluación reflexiva (Know · Want · Learned) | Diagnóstico individual canónico · base para los siguientes |
| **B** | Diagnosis visual | Mapa o gráfico visual de áreas débiles vs fuertes | Cohortes con preferencia visual |
| **C** | Gap card | Tarjeta gaps específicos: "Sé X · necesito aprender Y" | Cohortes que necesitan estructura formal |
| **D** | Peer interview | Entrevista guiada entre pares (3-5 preguntas) | Arranques con socialización entre aprendices |

**Ref operacional:** DIESEL-2026-04-19 pm-2-2.json `archetype_used: ["A — Self-assessment/KWL", "B — Diagnosis visual", "C — Gap card", "D — Peer interview"]`

---

## PM-2.3 — Reading: The Master Anchor (S2) · v2.0

**6 arquetipos canónicos** (A-F · canon original del master prompt + uso en MGV/DIESEL):

| ID | Nombre operacional | Evidencia canónica |
|----|--------|---|
| **A** | TBLT CYCLE — Task-Based Reading / Visual Prediction | MGV pm-2-3 + DIESEL pm-2-3 |
| **B** | Comprehension Strategies (K-W-L + Retelling) | MGV pm-2-3 + DIESEL pm-2-3 |
| **C** | Information Gap (Complete the Text + Draw This) | MGV pm-2-3 |
| **D** | Cooperative Jigsaw (5 Toolbelt Categories) / Cooperative Jigsaw lectura experta | MGV pm-2-3 + DIESEL pm-2-3 |
| **E** | (5° arquetipo · ver master prompt PM-2.3 línea 282) | MGV pm-2-3 |
| **F** | (6° arquetipo · ver master prompt PM-2.3 línea 342) | MGV pm-2-3 |

**Para detalle exacto de E y F:** leer master prompt `master-prompts/PM-2.3 — Reading — The Master Anchor.md` §90-342 (cada arquetipo tiene su sub-sección con PRE/WHILE/POST).

---

## PM-2.4 — Writing: Task-Based (S3) · v2.0

**5 arquetipos canónicos** (A-E):

| ID | Nombre operacional |
|----|--------|
| **A** | Genre Analysis (análisis de documentos modelo) |
| **B** | Modeled Writing |
| **C** | Collaborative TBLT / Independent Writing Task |
| **D** | (4° arquetipo · ver master prompt) |
| **E** | Genre-Based Peer Review |

**Refs:** DIESEL-2026-04-19 pm-2-4.json + MGV-2026-04-20 pm-2-4.json (compendio completo).

---

## PM-2.5 — Literacy & Vocabulary Skills (S2) · v2.0

**5 arquetipos canónicos** (A-E):

| ID | Nombre operacional |
|----|--------|
| **A** | Phonics & Spelling (Mirror Talking + Splat! + Sound Sorting) / Word Wall + Phonics |
| **B** | Vocabulary Development (Semantic Mapping + Word Wall + Self-Collection) + Juego (flashcards + categorías) |
| **C** | Reading Fluency (Reader's Theater + Cloze + Repeated Reading) |
| **D** | Writing Scaffolding (LEA + Dialogue Journal + Guided Writing) en formatos reales |
| **E** | (5° arquetipo · ver master prompt PM-2.5 línea 138) |

**Dependencia crítica:** PM-2.5 CONSUME el Master Anchor Text de PM-2.3 (PM-2.5 master prompt línea 41-43). Por eso en el orquestador PM-2.3 se ejecuta ANTES que PM-2.5 dentro de S2.

---

## PM-2.6 — Listening: The Auditory Anchor (S4) · v2.0

**6 arquetipos canónicos** (A-F · misma cardinalidad que PM-2.3 por simetría receptive skills):

| ID | Nombre operacional |
|----|--------|
| **A** | Micro-Skills Foundation / Scene Setup + Pre-listening |
| **B** | Phase-Based Framework (Pre/While/Post) — first listen + global |
| **C** | TBLT Listening (Task-Based) — comprensión sin script + cuestionario formal |
| **D** | Bloom Progression (Cognitive Scaling) / Role play con script impreso |
| **E** | Advanced Techniques (Shadowing + Dictogloss + Predictive) |
| **F** | Multimedia Production (Audio → Creative Output) |

**Refs:** MGV-2026-04-20 pm-2-6.json `archetypes_integrated.archetype_A_micro_skills` ... `archetype_F_multimedia_production` (compendio completo).

---

## PM-2.8 — Speaking: The Mission (S4) · v2.0

**5 arquetipos canónicos** (A-E · incluye pronunciation scaffolding · PM-2.7 deprecated):

| ID | Nombre operacional |
|----|--------|
| **A** | Input + Model (análisis de reporte modelo + noticing de estructura) |
| **B** | Stock Cards + Preparation / Rehearsal + Scaffolding (chunk card drilling) |
| **C** | Live Performance (role play evaluado) |
| **D** | Pronunciation Scaffold (Chunk Cards) |
| **E** | (5° arquetipo · ver master prompt PM-2.8) |

**Refs:** DIESEL-2026-04-19 pm-2-8.json + MGV pm-2-8.json (5 arquetipos integrados).

---

## PM-2.9 — Language Functions (S5) · v2.0

**5 arquetipos canónicos** (A-E):

| ID | Nombre operacional |
|----|--------|
| **A** | Function Map (Communication Map + clasificación de tarjetas por función) / Information Exchange |
| **B** | Function Drills (drills cortos por función con situaciones reales) / Persuasion & Argumentation |
| **C** | Integrated Simulation + Synthesis / Social & Interpersonal |
| **D** | Synthesis Card + Quiz Preview / Gamified Functions |
| **E** | Academic & Discourse |

**Refs:** DIESEL-2026-04-19 pm-2-9.json + MGV pm-2-9.json `the_5_archetypes` (compendio completo con archetype_a_information_exchange · archetype_b_persuasion_argumentation · archetype_c_social_interpersonal · archetype_d_gamified · archetype_e_academic_discourse).

---

## PM-2.10 — Grammar: Structure Use (S3 + S5) · v2.0

**5 arquetipos canónicos** (A-E):

| ID | Nombre operacional |
|----|--------|
| **A** | Inductive Discovery + Error Log (Discovery First obligatorio) / Inducción desde texto |
| **B** | Error Log + Grammar Stations (rotación por estaciones) |
| **C** | Grammar Stations / Integrated Production (Safety Report con estructuras integradas) |
| **D** | Grammar in Real Formats |
| **E** | (5° arquetipo · ver master prompt PM-2.10 línea 263) |

**Dependencia crítica:** PM-2.10 PRODUCE Grammar targets que PM-2.4 CONSUME (PM-2.4 master prompt línea 43). Por eso en el orquestador PM-2.10 se ejecuta ANTES que PM-2.4 dentro de S3.

**Particularidad:** PM-2.10 se ejecuta en S3 (introducción/discovery) Y en S5 (consolidación). El instructor puede elegir 2 flows distintos · uno para cada sesión.

---

## Conteo total y diferencia con master prompt PM-2.0

| Fuente | Total |
|---|---|
| **Suma estricta de master prompts individuales** | 1 + 1 + 6 + 5 + 5 + 6 + 5 + 5 + 5 + 5 = **44 arquetipos** (contando los 4 nuevos de PM-2.1 v3.0 y PM-2.2 v3.0) |
| Master prompt PM-2.0 §211-223 (tabla resumen) | "~52 arquetipos" (asume rangos máximos · cuenta PM-2.1/2.2 con "4-6 arquetipos" cada uno) |
| Refs operacionales DIESEL (modo extensible) | 4 + 4 + 3-4 + 3 + 3-4 + 3-4 + 3-4 + 3-4 + 3-4 = ~30-32 (instructor elige subconjunto en cada run) |

**No persigas la cifra exacta "52" del master prompt PM-2.0** — es un techo teórico. La cifra real depende de qué arquetipos decida activar el instructor por run en `arquetipos-elegidos.json`.

---

## Cómo el orquestador presenta este catálogo

El subagente PM-2.0 (Hito 2 · Semana 2) genera `pm-2-0-arquetipos-catalogo.{md,json}` con:

1. Una sección por cada PM creativo (PM-2.1 a PM-2.10)
2. Lista de arquetipos disponibles con descripción + cuándo usar
3. Recomendación pedagógica del subagente basado en CEFR + sector + perfil de cohorte
4. Espacio para que el instructor declare estilo + selección en `arquetipos-elegidos.json`

El instructor revisa este catálogo (Gate Humano 1 · ver `references/gates-humanos.md`) y declara sus elecciones.
