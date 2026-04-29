# CEFR Framework & FPI SENA Pedagogical Foundation — Contexto del Run IMARPOR-CC

**Run ID:** `IMARPOR-CC-2026-04-27`  
**PM Code:** `PM-0`  
**Generado:** 2026-04-27  
**Pipeline:** 2.11 (form-schema v2.7.1 · master prompt PM-0 v1.1)  
**PM-0 source:** 1.1 (2026-04-20 · canon DM v2.11)

---

## Propósito del artefacto

Fijar anclas PM-0 normativas para la guía única (single-guía absorcion_Na1) del programa Curso Complementario IMARPOR. Es el insumo obligatorio para pm-1-1 (los 4 RAPs absorbidos), pm-1-2 (key vocabulary y textos adaptados) y pm-3-2-sX (pm0_protocol por sesión, 12 sesiones × 6h).

---

## 1. Program Scope (PM-0 §10.2)

| Campo | Valor |
|---|---|
| programa_id | `IMARPOR-CC-2026-04-27` |
| programa_nombre | Inglés Marítimo y Portuario (Curso Complementario) |
| programa_codigo_sofia | 12340002 |
| tipo | **Curso Complementario** (sinónimo arquitectónico de Curso Especial · v2.7.1) |
| duracion_total_horas | 100h |
| rango_cefr | A1.2 → A2.1 |
| numero_guias | **1** (single-guía) |
| regla_bloques | `absorcion_Na1` (4 RAPs absorbidos en 1 guía) |
| progresion_cefr_decision | Otro — progresión INTERNA en 1 guía (sin sub-niveles separados por guías) |

**Justificación de la progresión CEFR:**

> Single-guía absorbe 4 RAPs (RAP-01 vocablos básicos, RAP-02 SMCP, RAP-03 gramática puerto-buque, RAP-04 descripción de funciones). Atraviesa A1.2→A2.1 internamente en 12 sesiones × 6h directas. Sin guías separadas por subnivel — la progresión vive dentro de la guía única, distribuida pedagógicamente por bloque interno (4 bloques de 3 sesiones c/u, uno por RAP).

---

## 2. PM-0 Section Mapping (auto-referencial)

Mapeo entre secciones del PM-0 master prompt y secciones de este `pm-0-context.json`:

| Sección PM-0 | Aplicación a IMARPOR-CC |
|---|---|
| `§4_descriptores_A1_generales` | Aplican como prereq A1.1 (curso asume base previa cubierta) y a Bloque Interno 1 (A1.2) — ver cefr_descriptors_per_guide |
| `§5.1_a_§5.13_principios_pedagogicos` | Aplican a la guía única — ver sección principios_aplicables (13 principios contextualizados al sector marítimo-portuario + curso intensivo 100h) |
| `§5.6_silabus_gramatical_17_grupos` | Aplica a la guía única distribuido en 4 bloques internos (1 por RAP) — ver grammar_roadmap.activation_mapping_internal_blocks |
| `§6_descriptores_por_subnivel` | Aplica por BLOQUE INTERNO (no por guía, porque es single-guía atravesando A1.2→A2.1) — ver cefr_descriptors_per_guide[0].descriptor_snapshot_por_bloque_interno |
| `§7_instrumento_trazabilidad_22_items` | Debe completarse para cada PM antes de producción · criterio aprobación ≥ 20/22 — ver traceability_checklist_ref |
| `§8_hoja_de_ruta_A1.1_a_A2.x` | Aplica desde A1.2 (prereq A1.1 cubierto) — ver shifts_metodologicos por bloque interno |
| `§9.1_L1_percentage_per_session` | Aplica a la guía única con 12 sesiones (ajustado de 8 canon) — ver l1_percentage_per_session.single_guide_12_sessions con curva A1.2→A2.1 |
| `§9.2_grammar_group_activation` | Aplica a cada pm-3-2-sX.json (12 sesiones) — ver grammar_roadmap.activation_mapping_internal_blocks · principio de carga ≤ 2 grupos Intro/sesión |
| `§9.3_pm0_protocol_json_schema` | Obligatorio en cada pm-3-2-sX.json del run — ver pm0_protocol_template_per_session · schema canónico desde pipeline v2.1 |
| `§10.2_schema_canonico` | Schema base de este pm-0-context.json — campos planos (programa_id, tipo, etc.) per master prompt §10.2 |
| `§10.5_grupo_17_sector_especifico` | Adaptado a maritime SMCP + NATO Phonetic + Message markers + estructuras ocupacionales — ver grammar_group_17_sector |

---

## 3. Universo Narrativo (PM-0 §10.2)

- **Empresa ficticia:** Puerto de Buenaventura · Terminal de Contenedores
- **Sector:** Marina Mercante Colombia · operaciones marítimo-portuarias · curso intensivo 100h
- **Escenario principal:** Andrea Mosquera (Port Operations Trainee · 1ª semana) atraviesa 12 sesiones intensivas de inglés marítimo-portuario en una sola guía de 100h. Visita el BUENAVENTURA EXPRESS en sesiones tempranas; coordina operaciones VHF y berthing en sesiones medias; cierra como Port Operations Professional con pitch ante panel.

### Personajes

- **Andrea Mosquera** — *Port Operations Trainee (avatar aprendiz · A1.1 inicial)*  
  22 años, Buenaventura, técnica recién egresada SENA. Sus miedos y victorias reflejan los del aula.

- **Capitán Restrepo** — *Port Captain (autoridad · B1 técnico)*  
  50+ años, supervisor general del puerto. Da instrucciones y evalúa desempeño.

- **Captain Lopera** — *Vessel Master cliente externo (lingua franca B1)*  
  45 años, chino-singapurense. Capitán del BUENAVENTURA EXPRESS. Cliente externo permanente. Representa el inglés real no-nativo del sector marítimo internacional.


**Productos típicos:** VHF radio communication, Berthing coordination, SMCP exchanges, Cargo handling reports, Port operations pitch

**Terminología sector:** bollard, berth, pilot, tugboat, container, manifest, VHF, SMCP, stevedore, draft

---

## 4. Final Mission Scenario (canon v2.7.1 — reemplaza proyecto_formativo en cursos cortos)

> Simulación de Operaciones: The CML Port Turnaround — Andrea coordina la operación completa de atraque, descarga y despacho del CML CARRIER (vessel ficticio) en turno de 12 horas, demostrando los 4 RAPs absorbidos: vocabulario portuario (RAP-01), comunicación SMCP por VHF (RAP-02), aplicación gramatical en coordinación bidireccional (RAP-03), y presentación final de su rol y procesos (RAP-04) ante panel.

---

## 5. Grammar Roadmap (PM-0 §5.6 + §9.2)

**Source:** PM-0 §5.6 — Silabus FPI SENA de 17 grupos (derivado de Life Second Edition, National Geographic Learning) + reconciliado con gramática de cada RAP IMARPOR
**Carga principle:** PM-0 §9.2 — Máximo 2 grupos nuevos (Intro) por sesión. En single-guía con 12 sesiones, distribución: ~3 sesiones por bloque interno (1 RAP cada uno) + S12 consolidación.

### Activación por Bloque Interno (single-guía 12 sesiones)

#### Bloque Interno 1 S1-S3 RAP01 A1.2 VocablosBasicos

**Intro:**
  - Gr 1 — Verbo be (afirm. contraído, neg., preguntas Yes/No, respuestas cortas)
  - Gr 2 — Pronombres sujeto + posesivos + demostrativos
  - Gr 3 — Plural regular -s/-es/-ies + artículos a/an
  - Gr 5 — Imperativo afirmativo (Open / Check / Move)
  - Gr 14 — Preposición In + at/on/next to/near (lugares portuarios)

#### Bloque Interno 2 S4-S6 RAP02 A1.3 SMCP

**Intro:**
  - Gr 5 (extension) — Imperativo negativo (Don't approach, Do not enter)
  - Gr 6 — Modal must (Vessel must wait at anchorage)
  - Gr 8 — Presente simple todas las formas + Wh-questions
  - Gr 17 — Grupo sector específico SMCP (Roger, Wilco, Affirmative, Negative, Standby, Spell) + NATO Phonetic Alphabet

**Consolida:**
  - Gr 1, 2, 3, 5, 14 del Bloque Interno 1

#### Bloque Interno 3 S7-S9 RAP03 A2.0 GramaticaPuertoBuque

**Intro:**
  - Gr 4 — Comparativos (faster than, more critical than)
  - Gr 6 (extension) — Should/shouldn't, Could/might, I'd like (You should approach starboard)
  - Gr 9 — Pasado simple (regulares + irregulares + Wh-)
  - Gr 10 — Presente continuo (Vessel is approaching, We are securing)
  - Gr 11 — Presente perfecto (The pilot has boarded)
  - Gr 12 — Condicional tipo 1 (If wind drops, we will berth)
  - Gr 13 — Voz pasiva presente (The cargo is inspected by customs)

**Consolida:**
  - Gr 6 must, Gr 8 presente simple, Gr 17 SMCP del Bloque Interno 2

**Aplica:**
  - Gr 1, 2, 3, 5, 14 de bloques previos

#### Bloque Interno 4 S10-S12 RAP04 A2.1 DescripcionFunciones

**Intro:**
  - Gr 4 (extension) — Superlativos (the most critical operation is berthing)
  - Gr 11 (extension) — Presente perfecto + marcadores already/yet/just/ever/never
  - Gr 13 (extension) — Voz pasiva pasada (The cargo was inspected yesterday)
  - Gr 16 — Tag questions PRODUCCIÓN ACTIVA (You're the supervisor, aren't you?)
  - Gr 17 (extension) — Estructuras ocupacionales (I'm responsible for, My role involves, I have experience with)

**Consolida:**
  - Gr 4 comparativos, Gr 6 modales, Gr 9 past simple, Gr 10 presente continuo, Gr 11 present perfect, Gr 12 condicional 1, Gr 13 voz pasiva del Bloque Interno 3

**Aplica:**
  - Todo lo anterior (Gr 1-15) en pitch profesional

---

## 6. Grammar Group 17 — Sector Específico Marítimo (PM-0 §10.5)

**Nombre:** Maritime SMCP + Navigation imperatives + Occupational structures

**SMCP key phrases:** Roger, Wilco, Affirmative, Negative, Standby, Out, Over, Say again, Spell that, Repeat your last message, I read you back as...

**NATO Phonetic Alphabet:** Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu

**Message markers:** Question, Answer, Request, Information, Warning, Advice, Instruction, Intention

**Estructuras ocupacionales A2.1 (Bloque 4):**
  - `I'm responsible for [coordination of yard operations]`
  - `My role involves [supervising container handling]`
  - `I have experience with [10+ vessel arrivals]`
  - `I am skilled at [VHF communication]`
  - `I specialize in [berthing during low-tide conditions]`

**Aplicabilidad:** Programa marítimo-portuario IMARPOR — comandos SMCP estandarizados OMI + NATO Phonetic Alphabet (Bloque Interno 2 RAP-02) + estructuras ocupacionales (Bloque Interno 4 RAP-04)

---

## 7. L1 Percentage per Session (PM-0 §9.1 adaptado)

**Source:** PM-0 §9.1 — Política de L1 normativa (porcentajes) + §9.1 progresión por subnivel + adaptación IMARPOR-CC single-guía 12 sesiones
**Rationale adaptación:** El canon §9.1 define curvas para A1.1, A1.2, A1.3, A2.x con 8 sesiones por guía. IMARPOR-CC tiene 12 sesiones en una sola guía atravesando A1.2→A2.1 internamente. Aplicamos la curva normativa por bloque interno (3 sesiones por bloque, 4 bloques) con escalada progresiva.

| Bloque interno | Sesión | L1 máximo |
|---|---|---|
| Bloque Interno 1 RAP01 A1.2 | S1 | ≤ 25 % |
| Bloque Interno 1 RAP01 A1.2 | S2 | ≤ 20 % |
| Bloque Interno 1 RAP01 A1.2 | S3 | ≤ 15 % |
| Bloque Interno 2 RAP02 A1.3 | S4 | ≤ 12 % |
| Bloque Interno 2 RAP02 A1.3 | S5 | ≤ 10 % |
| Bloque Interno 2 RAP02 A1.3 | S6 | ≤ 8 % |
| Bloque Interno 3 RAP03 A2.0 | S7 | ≤ 5 % |
| Bloque Interno 3 RAP03 A2.0 | S8 | ≤ 3 % |
| Bloque Interno 3 RAP03 A2.0 | S9 | 0 % (L2 norma) |
| Bloque Interno 4 RAP04 A2.1 | S10 | 0 % (L2 exclusivo) |
| Bloque Interno 4 RAP04 A2.1 | S11 | 0 % (L2 exclusivo) |
| Bloque Interno 4 RAP04 A2.1 | S12 | 0 % (Misión Final 100% L2) |

**Rationale curva progresiva:** S1 al 25% asume A1.1 prereq cubierto (curva más agresiva que MGV G1 que parte 30% sin prereq). Reducción acelerada porque single-guía exige inmersión rápida. Bloque 4 (S10-S12) en L2 puro porque la Misión Final es 100% L2.

---

## 8. Shifts Metodológicos por Bloque Interno (PM-0 §8 adaptado)

### Bloque Interno 1 (S1-S3, A1.2)
**Descriptor:** Velocidad lenta · pausas frecuentes · andamiaje alto (frames parciales, word banks portuarios) · feedback mixto: choral en drilling vocabulario
**Implicación pedagógica:** Andrea reconoce vocabulario marítimo-portuario básico con apoyo visual obligatorio. Rol docente: modelo central + driller activo en pronunciación SMCP-precursor.

### Bloque Interno 2 (S4-S6, A1.3)
**Descriptor:** Velocidad moderada · interferencia VHF simulada · andamiaje moderado (prompts iniciales, ejemplos SMCP estandarizados) · feedback diferido en SMCP
**Implicación pedagógica:** Andrea decodifica frases SMCP y responde con la frase correcta. Foco en accuracy de SMCP estandarizadas (cualquier error de Wilco/Roger es bloqueante; gramática general puede tener errores).

### Bloque Interno 3 (S7-S9, A2.0)
**Descriptor:** Velocidad moderada-natural · interferencia VHF + ruido ambiente realista · andamiaje mínimo · feedback peer + self-assessment + instructor diferido
**Implicación pedagógica:** Andrea coordina operaciones tripartitas. Foco en gramática aplicada (modales, condicionales, voz pasiva en operaciones reales).

### Bloque Interno 4 (S10-S12, A2.1)
**Descriptor:** Velocidad natural · sin pausas pedagógicas · cero andamiaje · evaluación por criterios profesionales
**Implicación pedagógica:** Andrea presenta rol completo, narra incidentes reales, justifica decisiones con estructuras ocupacionales. Rol docente: evaluador externo (simula empleador).

---

## 9. Principios Pedagógicos Aplicables (PM-0 §5.1-§5.13)

**Source:** PM-0 §5.1-§5.13 — 13 principios pedagógicos contextualizados al sector marítimo-portuario colombiano + curso intensivo 100h

- §5.1 Contenido técnico como punto de partida — el universo curricular SOFÍA (4 RAPs marítimo-portuarios) es el motor de cada bloque interno
- §5.2 Fotografía y realia técnica — fotos del muelle Buenaventura, grabaciones VHF reales adaptadas, señalética portuaria
- §5.3 Video e instrucción en vivo — videos de operaciones portuarias colombianas, simulaciones VHF, entrevistas a personal portuario
- §5.4 Pensamiento crítico y diagnóstico técnico — central en Bloques Internos 3 (coordinación con modales) y 4 (incident analysis con tag questions)
- §5.5 Memorización y retención — Toolbelt portuario + 30 SMCP key phrases + 100 collocations operativos · factor SUCCESS aplicado
- §5.6 Tratamiento de la gramática — silabus 17 grupos activado por bloque interno (ver grammar_roadmap)
- §5.7 Tratamiento del vocabulario — Word Wall del programa (12 sesiones) + Toolbelt portuario + SMCP Reference Card laminada + NATO Phonetic Reference Card
- §5.8 Habilidades de aprendizaje autónomo — Gap Cards · KWL · Learning Contract · Radio Log diario
- §5.9 Evaluación — Formativa (6 instrumentos en bloque interno final) + sumativa (Cuestionario S6 25 pts + Misión Final 5 pts = 30 pts en single-guía)
- §5.10 Estructura de sesión FPI — 12 sesiones × 6h directas + 28h autónomas. ADAPTACIÓN: la estructura canónica 8 sesiones × 7.5h se ajusta a 12 × 6h manteniendo proporciones SET-UP/WHILE/WRAP
- §5.11 Feedback diferenciado accuracy vs fluency — ver shifts_metodologicos arriba (curva por bloque interno)
- §5.12 Gestión del L1 — ver l1_percentage_per_session arriba (curva más agresiva que A1.1 estándar por prereq cubierto)
- §5.13 Noticing de stress con soporte físico — STRESS EN SMCP ES CRÍTICO (Wilco vs Will-co · Affirmative vs Affirmative) + NATO phonetic stress (NoVEMber vs NOvember) · finger drilling + backchaining + clapping

---

## 10. Descriptores CEFR por Bloque Interno (PM-0 §6 adaptado a single-guía)

**Guía única:** IMARPOR-CC Single-Guía: Andrea's Maritime Journey
**RAPs absorbidos:** RAP-01 a RAP-04
**CEFR inicial → final:** A1.2 → A2.1

**Rationale:** Esta guía única atraviesa A1.2→A2.1 internamente vía 4 bloques internos (3 sesiones c/u). Los descriptores PM-0 §6 se aplican al bloque interno correspondiente:

### Bloque Interno 1 S1-S3 RAP01 A1.2

- **comprension oral:** Comprende instrucciones de 1-2 pasos sobre operaciones básicas del muelle (Check the bollard · Open the gate · Move the forklift). Reconoce términos marítimo-portuarios con apoyo visual.
- **comprension lectora:** Reconoce nombres y etiquetas en señalética portuaria (NO SMOKING · MUSTER STATION · HARD HAT AREA). Identifica números (vessel call sign · berth number · container ID).
- **produccion oral:** Produce palabras y frases aisladas. Nombra elementos visibles del muelle.
- **vocabulario activo:** 50-100 términos del dominio portuario (Toolbelt-30 + colaterales)
- **gramatica:** Verb to be · pronombres + demonstratives · plurales · imperativo afirmativo · preposición IN + at/on/next to/near

### Bloque Interno 2 S4-S6 RAP02 A1.3

- **comprension oral:** Comprende instrucciones de 2-3 pasos via VHF (con interferencia simulada). Decodifica intent en frases SMCP (Vessel inbound · Request pilot · Standby for berthing instructions).
- **produccion oral:** Confirma recepción usando SMCP (Roger · Wilco · Affirmative · Negative). Pide clarificación específica (Repeat course · Spell call sign).
- **vocabulario activo:** 150-250 términos. Toolbelt + 30 SMCP key phrases + crew terms + 50 collocations operativos
- **gramatica:** + Imperativo negativo · Modal must · Presente simple Wh-questions · NATO Phonetic Alphabet (Gr 17)

### Bloque Interno 3 S7-S9 RAP03 A2.0

- **comprension oral:** Sigue instrucciones multi-paso en operaciones puerto-buque (berthing · cargo handling · departure).
- **produccion oral:** Coordina operación tripartita simultánea. Expresa prohibición/permisión/posibilidad/pedidos con modales.
- **vocabulario activo:** 300-400 términos. Collocations con confianza + expresiones fraseológicas (in case of · with reference to · prior to)
- **gramatica:** + Comparativos · Modales should/could/might · Pasado simple · Presente continuo · Presente perfecto · Condicional tipo 1 · Voz pasiva presente

### Bloque Interno 4 S10-S12 RAP04 A2.1

- **comprension oral:** Comprende presentaciones técnicas a ritmo natural. Comprende preguntas de panel sobre rol profesional.
- **produccion oral:** Pitch profesional formal de 3 min: introducción + funciones habituales + funciones momentáneas + cierre. Tag questions producción activa.
- **vocabulario activo:** 500-600 términos consolidados + 50 nuevos ocupacionales (job titles · responsibilities · career narrative)
- **gramatica:** + Superlativos · Presente perfecto con marcadores · Voz pasiva pasada · Tag questions producción activa · estructuras ocupacionales (Gr 17 ext)

---

## 11. PM0 Protocol Template (PM-0 §9.3)

**Propósito:** Template de referencia para que cada pm-3-2-sX.json del run incluya pm0_protocol consistente con su sesión y bloque interno. Schema canónico per PM-0 §9.3 — obligatorio desde pipeline v2.1.

**Campos obligatorios:**
  - grammar_groups
  - feedback (mode, accuracy_techniques, fluency_techniques, notes)
  - l1_management (l1_percentage, english_zone_declaration, l1_allowed_for, reduction_strategy)
  - stress_pronunciation (focus_words, techniques, board_marking, notes)
  - success_vocabulary (target_words, factors_applied SUCCESS)

**Schema canónico:** PM-0 §9.3 — leer literal del master prompt para implementación

---

## 12. Traceability Checklist (PM-0 §7 — 22 ítems)

**Source:** PM-0 §7 — Instrumento de Trazabilidad Pedagógica (22 ítems)
**Uso:** Cada PM-2.x y PM-3.x del run debe completar este checklist antes de producción. Criterio de aprobación: ≥ 20/22 ítems aprobados.

- **A trazabilidad cefr** — 6 ítems · subnivel · descriptores §4/§6 (con ajuste IMARPOR prereq A1.1) · vocab del Word Wall · input adaptado por bloque interno
- **B trazabilidad pedagogica** — 8 ítems · pre-enseñanza vocab · drilling · accuracy/fluency mix · gestión L1 · stress (especialmente SMCP + NATO) · producción personalizada · autoevaluación · andamiaje por bloque interno
- **C trazabilidad estructura sesion** — 4 ítems · bloque FPI · tiempo realista (12 sesiones × 6h) · cadena previous_pms · complejidad cognitiva progresiva intra-guía
- **D trazabilidad evaluacion** — 4 ítems · contribuye Misión Final · can-do asociado · criterio observable · consistente con descriptor CEFR del bloque interno + criterios C01-C05 SOFÍA

---

## 13. Próximo paso en el pipeline

- **Next PM:** PM-1.1 IMARPOR-CC (single-guía absorpción 4 RAPs)
- **Input esperado:** Este pm-0-context.json + pm-1-1-input.json del structuring (ya generado en runs/IMARPOR-CC-2026-04-27/pm-1-1-input.json)
- **Output esperado de PM-1.1:** pm-1-1.md + pm-1-1.json con 1 bloque (single-guía) + 4 RAPs absorbidos + universo narrativo derivado + sin proyecto_formativo_articulador (asimetría v2.7.1)

---

## Metadata Fase 0

| Campo | Valor |
|---|---|
| fecha_generacion | 2026-04-27 |
| version | 1.0 |
| version_form_schema | 2.7.1 |
| version_canon_dm | v2.11 |
| generado_por | Claude (skill fpi-sena-fase1 + pre-flight obligatorio cumplido) |
| derivacion_canonica | Schema base derivado de PM-0 §10.2. Contenido derivado de PM-0 §3 (CEFR), §5.1-§5.13 (13 principios), §6 (descriptores subnivel), §9.1 (L1 policy), §9.2 (grammar roadmap silabus 17), §9.3 (pm0_protocol). Adaptación: single-guía 12 sesiones con progresión interna A1.2→A2.1 vía 4 bloques internos (3 sesiones c/u, uno por RAP absorbido). |
| aprobado_por_instructor | False |
| ultima_revision | 2026-04-27 |

---

*Generado por Claude (skill `fpi-sena-fase1`) · Pre-flight cumplido · Derivación canónica desde PM-0 master prompt v1.1*
