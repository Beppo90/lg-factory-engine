# CHANGELOG — DIESEL-2026-04-19
## Guía 1.1 — The Workshop Specialist (Re-run con Opus 4.6)

**Run base:** DIESEL-2026-04-15 (auditado 2026-04-19)
**Modelo:** claude-opus-4-6
**Enfoque:** Human-in-the-loop — revisión módulo a módulo

---

## PRE-RUN PATCHES (aplicados antes de generar)

| Fix | Archivo | Descripción |
|-----|---------|-------------|
| ISSUE-5 ✅ | `scripts/pm-3-2-pm0-patch.js` | S1 `success_vocabulary`: "deadline", "crash" → "technician", "bay" |
| Run ID ✅ | Todos los scripts | Rutas actualizadas de 04-15/04-18 → 04-19 |
| Fecha ✅ | `scripts/pm-3-6-new-gen.js` | Fecha de Elaboración: 2026-04-15 → 2026-04-19 |

**Issues que NO requieren patch en scripts** (se controlan en generación):
- `tipo_programa`: fluye desde PM-1.1 input (input correcto = "Técnico")
- `autonomous_work` schema: enforcer en prompt de generación de sesiones
- `pm_id` format: enforcer en prompt de generación (`"PM-3.2-S{n}"`)
- `fase_sena` S6: verificar acento en output

---

## PM-0 VALIDATION LOG

### PM-0 — Protocolo Pedagógico
**Status:** ⚠️ APROBADO CON NOTA (2026-04-19)
**Validador:** claude-sonnet-4-6 (Option A — sesión actual)

| # | Hallazgo | Severidad | Resolución |
|---|---------|-----------|------------|
| H2 | Gr2 (There is/are): Intro en S3 (patch) vs S2 (§9.2) | Baja | Aprobado — S2 es reading intensivo, desplazar Gr2 a S3 reduce sobrecarga |
| H3 | Gr7 (Can/can't): Intro en S5 (patch) vs S4 (§9.2) | Baja | Aprobado — S4 ya maneja 3 grupos activos; S5 es la sesión natural para modales |
| H6 | "M — Meaning" en S1/S3 no está en schema SUCCESS (§9.3) | Media | Aprobado — extensión justificada para A1.1 día 1 y sesión gramatical; documentar en próx. versión PM-0 como "M — Meaning: solo permitido en S1 y S3 de nivel A1.1" |

**Nota pendiente:** ~~Próxima versión de PM-0 debe incorporar "M — Meaning" como factor opcional del acrónimo SUCCESS para guías A1.1 G1 únicamente.~~ → **RESUELTO: PM-0 v2.0 — ver sección PM-0 v2.0 Update.**

---

## PIPELINE LOG

### MÓDULO 1 — PM-1.1 (Ruta Macrotemática)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-opus-4-6
**Revisión:** Sin notas
**Decisiones:**
- Fix programa: "Mantenimiento de los Motores Diesel" → "Mantenimiento de Motores Diesel"
- Fix cefr_range: "A1.1 — A2.2" → "A1.1 — A2.1" (techo real del Técnico)
- Añadido campo `model`, `universo_narrativo` por bloque, `program_context.provided: true`
- Eliminado `revision_note` (ya no aplica post-fix Técnico/Tecnológico)
**Output:** pm-1-1.json ✅

| Campo | 04-15 | 04-19 | Δ |
|-------|-------|-------|---|
| program | "de los Motores Diesel" | "Motores Diesel" | ✅ Fix |
| cefr_range | A1.1–A2.2 | A1.1–A2.1 | ✅ Ajuste |
| model | no registrado | claude-opus-4-6 | ✅ Trazabilidad |
| universo_narrativo | ausente en bloques | presente | ✅ Mejora |

---

### MÓDULO 2 — PM-1.2 (Scope & Sequence)
**Status:** ⚠️ APROBADO CON NOTA (2026-04-19)
**Modelo:** claude-opus-4-6
**Revisión:** Fuentes curadas: eliminar verificación manual — Claude verifica vía WebSearch
**Decisiones:**
- ISSUE-3 RESUELTO: program_type "tecnológico" → "técnico"
- RAP codigo "PENDIENTE" → "220501096"
- RAP descripcion generada completa
- 3 fuentes curadas REEMPLAZADAS: originales no confirmadas en búsqueda → nuevas verificadas por WebSearch
- Fuentes reemplazadas: Popular Mechanics → Shadow Foam "20 Must Have Mechanic Tools 2024"; Motor Age → SafetyCulture "Safety in Automotive Workshops"; Diesel Tech Forum → Fullbay "Creating the Perfect Diesel Repair Shop Layout"
- Nota pendiente: competencia.codigo sigue como PENDIENTE (requiere consulta Sofía Plus)
**Output:** pm-1-2.json ✅

| Campo | 04-15 | 04-19 | Δ |
|-------|-------|-------|---|
| program_type | **"tecnológico"** | **"técnico"** | ✅ ISSUE-3 |
| RAP codigo | "PENDIENTE" | "220501096" | ✅ Fix |
| fuentes curadas | 3 no verificadas | 3 verificadas (WebSearch) | ✅ Fix |
| verification_status | "pending manual" | logs de búsqueda | ✅ Fix |

---

### MÓDULO 3 — PM-2.0 (RAP Session Architect)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-opus-4-6
**Decisiones:**
- rap_id "PENDIENTE" → "220501096" ✅
- program_type "Tecnológico" → "Técnico" ✅
- program_name "de los Motores Diesel" → "Motores Diesel" ✅
- Fix horas: 48.75/11.25 → 48/12 (S6 1ª mitad: 3.75h → 3h directa, 0.75h → 1.5h autónoma) ✅
- Fuentes cuestionario S6 actualizadas: Popular Mechanics → Shadow Foam; Motor Age → SafetyCulture ✅
- Añadidos: autonomous_work por sesión, bloom_progression, títulos de sesión
**Output:** pm-2-0.json

---

### MÓDULOS 4–12 — PM-2.1 a PM-2.11
**Status:** ⚠️ PENDIENTE REVISIÓN (generados 2026-04-19)
**Modelo:** claude-opus-4-6
**Revisión:** Human-in-the-loop — revisar batch completo

**Decisiones aplicadas (todos los módulos):**
- run_id: "DIESEL-2026-04-15" → "DIESEL-2026-04-19" ✅
- guide: "Guía 1.1" → "Guía 1" ✅
- generated_at: "2026-04-15" → "2026-04-19" ✅
- model: "claude-opus-4-6" (añadido) ✅
- status: "completed" → "pending_review" ✅
- PM-2.7: DEPRECATED — absorbido por PM-2.8 (no se genera) ✅

**Fixes específicos:**

| Módulo | Fix | Descripción |
|--------|-----|-------------|
| PM-2.1 | ✅ | Valentina Cruz "New Apprentice" → "Safety Officer" (universe + momentos) |
| PM-2.1 | ✅ | Headline source: "Motor Age, 2024" → "SafetyCulture — Safety in Automotive Workshops, 2024" |
| PM-2.2 | ✅ | trabajo_autonomo Preview S2: "Popular Mechanics" → "Shadow Foam '20 Must Have Mechanic Tools 2024'" |
| PM-2.3 | ✅ | source: Popular Mechanics → Shadow Foam '20 Must Have Mechanic Tools 2024' |
| PM-2.3 | ✅ | source_url → https://shadowfoam.com/blogs/article/must-have-mechanic-tools |
| PM-2.3 | ✅ | adapted_text_title: "Tools Every Diesel Technician Needs" → "Tools Every Diesel Specialist Needs" |
| PM-2.3 | ✅ | Q4 "What does calibration ensure?" eliminada → nueva Q4 sobre floor jack + specialist |
| PM-2.3 | ✅ | materials: "Imágenes originales Popular Mechanics" → "Imágenes Shadow Foam proyectadas" |
| PM-2.3 | ✅ | trabajo_autonomo: "artículo original Popular Mechanics" → "artículo Shadow Foam" |
| PM-2.5 | ✅ | vocabulary_categories: "Quality": ["calibration"] → "Roles": ["specialist"] |
| PM-2.6 | ✅ | source: "Motor Age Safety" → "SafetyCulture 'Safety in Automotive Workshops'" |
| PM-2.6 | ✅ | source_url añadido (SafetyCulture verificado) |
| PM-2.6 | ✅ | characters[1]: "Valentina Cruz — New Apprentice" → "Valentina Cruz — Safety Officer" |
| PM-2.8 | ✅ | pronunciation_targets: "calibration" → "specialist" |
| PM-2.11 | ✅ | col_2_rap.codigo: "PENDIENTE" → "220501096" |
| PM-2.11 | ✅ | col_2_rap.descripcion: completada con RAP text de PM-2.0 |
| PM-2.11 | ✅ | col_7 horas: S6 3.75h/0.75h → 3h/1.5h; totales_calculados 48.75/11.25 → 48/12 |
| PM-2.11 | ✅ | col_8 Evidencia 1: "Popular Mechanics" → "Shadow Foam" |
| PM-2.11 | ✅ | col_10 actividades 13-16: materiales Shadow Foam (no Popular Mechanics) |
| PM-2.11 | ✅ | col_10 actividades 25-28: SafetyCulture en diálogo |
| PM-2.11 | ✅ | vocabulary_coverage: "calibration" → "specialist" (PM-2.5, PM-2.8, PM-2.3) |
| PM-2.11 | ✅ | validation_report: hours_direct PASS + hours_autonomous PASS |
| PM-2.11 | ✅ | overall_passed: true — "VÁLIDO — Todos los checks pasados" |
| PM-2.11 | ✅ | warnings: [] (eliminadas advertencias de horas) |

**Outputs:** pm-2-1.json ✅ pm-2-2.json ✅ pm-2-3.json ✅ pm-2-4.json ✅ pm-2-5.json ✅ pm-2-6.json ✅ pm-2-8.json ✅ pm-2-9.json ✅ pm-2-10.json ✅ pm-2-11.json ✅

---

---

## ARQUITECTURA — PROMPTS: FUENTE ÚNICA DE VERDAD
**Fecha:** 2026-04-19
**Status:** ✅ COMPLETADO

**Problema:** `prompts/` y `lg-factory-engine/prompts/` eran dos copias separadas. En el momento de la corrección, 10 archivos ya habían divergido (engine tenía versiones de marzo 2026, `prompts/` tenía actualizaciones de abril 2026). Cada modificación manual requería recordar copiar a ambos lugares — fuente de reprocesos.

**Solución aplicada:**
- `lg-factory-engine/prompts/` eliminado
- Reemplazado por symlink: `lg-factory-engine/prompts → ../prompts`
- `prompts/` es la **única fuente de verdad** para todos los templates del factory
- El engine (`pm_runner.py`) sigue usando `PROMPTS_DIR = Path(__file__).parent.parent / "prompts"` sin cambios — el symlink es transparente

**Regla de ahora en adelante:** toda edición de templates se hace en `prompts/` únicamente. El engine la recoge automáticamente.

---

## OPCIÓN B — CORRECCIÓN DEL SISTEMA OPERATIVO `prompts/`
**Fecha:** 2026-04-19
**Status:** ✅ COMPLETADO
**Problema detectado:** Los templates `prompts/pm-2-x.md` no tenían inyección de PM-0. Los campos `didactic_strategy`, `didactic_technique`, `l1_management`, `grammar_groups` y `success_vocabulary` no fluían desde la capa fundacional PM-0 hacia los templates operativos. Resultado: activity card JSONs sin `didactic_strategy`/`didactic_technique` (schema v2.0 non-compliant).

**Archivos creados:**

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `prompts/pm-0.md` | ✅ CREADO | Operative PM-0 context file. Contiene: Grammar Activation Map G1/A1.1, L1% por sesión, Feedback modes (accuracy/fluency), Stress+Pronunciación técnicas, SUCCESS vocabulary factors, Permitted didactic strategies (10), Permitted didactic techniques (15), Session structure, A1.1 level constraints, Trazabilidad checklist. |
| `lg-factory-engine/prompts/pm-0.md` | ✅ CREADO | Copia sincronizada para el engine (PROMPTS_DIR = lg-factory-engine/prompts/). |

**Archivos modificados:**

| Archivo | Cambio |
|---------|--------|
| `prompts/pm-2-1.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S1/Gr1 INTRO) |
| `prompts/pm-2-2.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S1/Gr1 INTRO — diagnóstico) |
| `prompts/pm-2-3.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S2/Gr1 CONSOLIDA + Gr2 INTRO) |
| `prompts/pm-2-4.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S3/Gr5 INTRO) |
| `prompts/pm-2-5.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S2/SUCCESS factors) |
| `prompts/pm-2-6.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S4/Gr7 INTRO) |
| `prompts/pm-2-7.md` | ⛔ DEPRECATED header añadido (absorbed_by PM-2.8; pronunciation now in pm-0.md) |
| `prompts/pm-2-8.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S4/fluency mode) |
| `prompts/pm-2-9.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S5/Gr3 INTRO) |
| `prompts/pm-2-10.md` | PM0_CONTEXT: {{pm0_context}} + ### PM-0 ACTIVE CONSTRAINTS (S3/Grammar/accuracy) |
| `lg-factory-engine/engine/pm_runner.py` | `build_user_prompt()`: carga pm-0.md y lo inyecta en CONTEXT block como PM0_CONTEXT. |
| `lg-factory-engine/prompts/pm-2-7.md` | ⛔ DEPRECATED header sincronizado. |

**Efectos en la siguiente regeneración de PM-2.x JSONs (Opción A):**
- Cada template ahora emite `didactic_strategy` y `didactic_technique` correctos (de las listas permitidas en pm0_context)
- Grammar constraint por sesión es explícita — no puede haber contaminación de grupos fuera del mapa
- L1% está señalado en cada template según la sesión
- Feedback mode (accuracy vs fluency) está diferenciado por actividad
- Stress/pronunciación tiene técnicas específicas inyectadas
- Personajes correctos señalados en todos los templates

**Pendiente:** Opción A — Regenerar los 10 PM-2.x JSONs siguiendo Activity Card Schema v2.0, usando los templates corregidos como referencia. Los JSONs actuales en 04-19 son schema non-compliant.

---

### MÓDULO 13 — PM-3.1 (Playbook Outline)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-sonnet-4-6
**Output:** pm-3-1.json + pm-3-1-playbook.md

---

### MÓDULOS 14–20 — PM-3.2 S1–S8 (Session Build-Outs)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-sonnet-4-6

| Sesión | Título | Status | Duración |
|--------|--------|--------|----------|
| S1 | The Wake-Up Call | ✅ | 300 min |
| S2 | Read the Workshop | ✅ | 300 min |
| S3 | Write It Right | ✅ | 310 min |
| S4 | Tuning In & Speaking Up | ✅ | 310 min |
| S5 | The Workshop in Action | ✅ | 320 min |
| S6a | Prove What You Know | ✅ | 180 min |
| S6b+S7+S8 | The Final Mission | ✅ | 870 min |

**Outputs:** pm-3-2-s1.md · pm-3-2-s2.md · pm-3-2-s3.md · pm-3-2-s4.md · pm-3-2-s5.md · pm-3-2-s6a.md · pm-3-2-s6b-s8.md
**Suma total:** 2590 min verificada ✅

---

### MÓDULO 21 — PM-3.5 (Final Mission)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-sonnet-4-6
**Decisiones:**
- Archetype A — Professional Simulation (no gamificado)
- Evaluation: FORMATIVA únicamente — NO genera evidencias GFPI-F-134 adicionales
- Observation Checklist oral: 5 criterios × 2 pts = 10 pts formativo
- Product Rubric escrito: 5 criterios × 4 niveles = 20 pts formativo
- Bay assignment protocol incluido (con Plan B sin acceso a bay real)
**Outputs:** pm-3-5.json · pm-3-5-mission.md (3 partes: Brief aprendiz + Checklist instructor + Rubric instructor)

---

### MÓDULO 22 — PM-4.1 (Instrumentos de Evaluación)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-sonnet-4-6
**Decisiones:**
- 5 instrumentos: INS-01 Reading, INS-02 Writing, INS-03 Listening, INS-04 Speaking, INS-05 Language Functions
- Writing (INS-02) y Speaking (INS-04): NO contribuyen al Cuestionario Consolidado
- Scoring: Reading(5) + Vocabulary(5) + Grammar(5) + Listening(5) + LangFunc(5) = 25/25 ✅
**Outputs:** pm-4-1.json · pm-4-1-instruments.md

---

### MÓDULO 23 — PM-4.2 (Cuestionario Consolidado)
**Status:** ✅ APROBADO (2026-04-19)
**Modelo:** claude-sonnet-4-6
**Decisiones:**
- Reading text: "The Morning Protocol at The Diesel Workshop" (Carlos Mendoza, 88 words) — nuevo escenario, anti-duplication ✅
- Listening script: "Bay 1 Readiness Check" (Santiago + Carlos, 92 words) — diferente de INS-03 Bay 2/Valentina ✅
- 25 ítems × 1 pt. Bloom: 10×L1 + 14×L2 + 1×L3. Pass: 15/25.
- Answer key: Reading b·c·b·c·FALSE | Vocabulary b·b·b·c·c | Grammar b·a·b·b·b | Listening b·b·b·c·b | Functions b·c·a·c·b
**Outputs:** pm-4-2.json · pm-4-2-quiz.md

---

### MÓDULO 24 — PM-3.3 (Canva Spec)
**Status:** ✅ COMPLETADO (2026-04-19)
**Modelo:** claude-sonnet-4-6
**Decisiones:**
- Schema: deck-spec-v2.0
- Platform: agnostic (Canva 1920×1080px + PowerPoint 33.87cm×19.05cm — dual setup sections)
- 45 slides covering all 8 sessions + cover, overview, closing
- Design system: navy #1C2B3C + orange #F59316, 4 master layouts (cover/session_title/content/minimal)
- Evidence slides (E1-E6 → slides 14/21/25/28/33/37): ALL MINIMAL layout
- Reusable slides: 2 (overview), 11 (word wall), 30 (communication map)
- 10 design rules documented including "Slides support the instructor — they are NOT the lesson"
- Image guide: Unsplash + Pexels + Shadow Foam, 6 required images specified
**Output:** pm-3-3-spec.json ✅

---

### MÓDULO 25 — PM-3.6 (GFPI-F-135 Learning Guide)
**Status:** ✅ COMPLETADO (2026-04-19)
**Modelo:** claude-sonnet-4-6
**Output:** pm-3-6-learning-guide.md ✅ (1,242 líneas)

#### DECISIÓN DE DISEÑO FUNDAMENTAL — PM-3.6: GUÍA AUTOCONTENIDA

> **Registrado:** 2026-04-19 — instrucción explícita del instructor de programa

**Principio:** La Guía de Aprendizaje (GFPI-F-135) es un recurso didáctico **autocontenido**. El aprendiz puede desarrollar **todas** las actividades de aprendizaje de forma autónoma, sin necesidad del acompañamiento presencial del instructor, porque la guía provee **todos** los elementos de forma y fondo requeridos.

**Implicaciones para la generación:**

| Elemento | Decisión |
|----------|---------|
| Textos de lectura | **INCLUIR completo** en el cuerpo de la guía (no referenciar externamente) |
| Scripts de audio (Listening) | **INCLUIR transcripción completa** — el aprendiz puede leer el script si no hay acceso al audio |
| Plantillas de entregables | **INCLUIR dentro de la actividad** (Daily Inspection Checklist template, Work Order header, etc.) |
| Vocabulario / Toolbelt | **INCLUIR tabla completa** dentro de cada actividad que lo requiera (no solo en el glosario) |
| Chunk Banks F1–F5 | **INCLUIR dentro de cada actividad** que los usa (no solo en PM-2.9) |
| Formula Box gramática | **INCLUIR** en la actividad de gramática (no asumir que el aprendiz tiene otro documento) |
| Stock Cards A/B | **INCLUIR** en la actividad de Speaking (PM-2.8) |
| Criterios de evaluación | **INCLUIR** en la actividad que genera evidencia (no solo en PM-4.1) |
| Instrucciones | V+O+C bilingüe (EN/ES) — ejecutables sin mediación del instructor |

**Lo que NO incluye PM-3.6:**
- Protocolos de administración del instructor (esos van en PM-3.2 y PM-3.5)
- Claves de respuesta (esas van en PM-4.1 y PM-4.2 — solo para el instructor)
- Escala de estimación No 4/5 (instrumentos del instructor en PM-4.1)

**Fuente primaria para la generación:** `pm-3-6-master-prompt.md` del run DIESEL-2026-04-15 (LG Factory Engine v2.0), actualizado para 04-19 con el principio de autocontención explícito.

---

### PM-0 v2.0 UPDATE — M — Meaning-before-Form
**Fecha:** 2026-04-19
**Status:** ✅ COMPLETADO
**Alcance:** Todas las guías / todos los niveles CEFR — NO solo A1.1 G1
**Decisión:** El factor M se eleva de "nota de diseño" a **normativo** en PM-0.

**Cambios aplicados en `prompts/pm-0.md` y `lg-factory-engine/prompts/pm-0.md`:**

| Elemento | Cambio |
|----------|--------|
| Versión | 1.0 → **2.0** |
| Scope | "G1 / A1.1" → **"All Guides / All CEFR levels"** |
| Schema SUCCESS | 6 factores → **7 factores (SUCCESS+M)** |
| Factor M | Definición operativa completa + tabla de implementación por tipo de actividad |
| Restricción M | No aplica en S6a (evaluación sumativa) ni S6b–S8 (Misión Final) |
| Escalado CEFR | A1.x / A2.x / B1.x+ — implementación diferenciada documentada |
| Trazabilidad | 3 checks M añadidos: M1 (vocabulario), M2 (gramática), M3 (listening) |

**Impacto en próximos runs:**
- Todo PM-2.x generado para G2 en adelante debe cumplir checks M1, M2, M3
- El `pm_runner.py` inyecta el pm-0.md actualizado — sin cambios al engine
- Los PM-2.x de DIESEL G1 (ya aprobados) NO se regeneran — el principio ya estaba presente implícitamente

---

### VALIDACIÓN — G5
**Status:** ✅ COMPLETADO — 13/13 PASS (2026-04-19)
**Output:** `g5-validation-report.json`
**Validador:** `g5_validate.py` v2.0 — 13 dimensiones

| Check | Resultado | Detalle |
|-------|-----------|---------|
| CHECK-1 Session Timing | ✅ PASS | 48h directa + 12h autónoma = 60h |
| CHECK-2 Evidence Alignment | ✅ PASS | 50/50 pts formales · 25/25 ítems quiz |
| CHECK-3 Toolbelt Coverage | ✅ PASS | 20 términos · 5 categorías · "specialist" ✓ · "calibration" ausente ✓ |
| CHECK-4 Language Functions F1–F5 | ✅ PASS | Todas las funciones presentes en pm-2-9, INS-05, pm-3-5 |
| CHECK-5 Autonomous Hours | ✅ PASS | 12h autónomas confirmadas |
| CHECK-6 File Completeness | ✅ PASS | 33/33 archivos presentes (JSON + MD + DOCX + CHANGELOG) |
| CHECK-7 Schema v2.0 | ✅ PASS | `activity-card-v2.0` en todos los PM-2.x |
| CHECK-8 PM-0 Injection | ✅ PASS | `pm0_constraints_applied` con gramática + L1% en todos los PM-2.x |
| CHECK-9 Source Verification | ✅ PASS | Sin fuentes baneadas · Shadow Foam / SafetyCulture / Fullbay presentes |
| CHECK-10 Quiz Totals | ✅ PASS | 25 pts · Writing excluida correctamente |
| CHECK-11 Character Consistency | ✅ PASS | Valentina Cruz = Safety Officer · S1 sin "deadline"/"crash" |
| CHECK-12 Grammar Activation Map | ✅ PASS | Sin contaminación cross-session |
| CHECK-13 PM-0 v2.0 Integrity | ✅ PASS | SUCCESS+M · M1/M2/M3 · symlink intacto |

**Nota:** Los 4 FAILs iniciales eran bugs del validador (no del pipeline):
- CHECK-2: buscaba `items[]` top-level en pm-4-2.json → en realidad está en `sections[n].items`
- CHECK-3: esperaba lista de objetos `{category, term}` → en realidad `vocabulary_toolbelt.categories` (dict)
- CHECK-6: DOCX no regenerados en esta sesión → regenerados y XML-fixed ✅
- CHECK-9: escaneaba el propio `g5-validation-report.json` y el `curated_sources_verification_log` (audit log) → ambos excluidos del scan

---

---

## REGENERACIÓN SCHEMA v2.0 — PM-2.x COMPLETO (2026-04-19)

**Trigger:** Los 10 PM-2.x originales del run 04-19 tenían Activity Card Schema obsoleto (copiado del 04-15).
**Método:** Human-in-the-loop — batch por batch con validación Python después de cada batch.

### Fixes aplicados en todos los PM-2.x regenerados:
| Issue | Fix |
|-------|-----|
| Hasta 4 actividades por PM (max 3) | Merged intelligently: actividades cognitivas próximas o menos centrales consolidadas |
| `contributes_to_cuestionario` → `contributes_to_consolidated_quiz` | Renombrado según schema v2.0 |
| `cuestionario_skill/points` → `quiz_skill/points/item_count` | Renombrado + nuevo campo `quiz_item_count` |
| Missing `_meta` block | Agregado en todos |
| Missing `pm_name`, `rap_id` | Agregados en todos |
| Missing `didactic_strategy`, `didactic_technique` | Agregados (desde lista permitida en pm-0.md) |
| Horas a nivel sesión → nivel PM | PM-level hours que suman al total de sesión |
| `instrument_type: "Lista de chequeo"` en PM-2.6 | Corregido → `"Cuestionario"` (5 preguntas, no checklist de observación) |
| PM-2.4 Writing como quiz contributor (30 pts total) | Corregido → `contributes=false` (Writing es evidencia Producto, no quiz) |
| Statements > 120 chars en PM-2.9 Act 3 y PM-2.10 Acts 1+3 | Acortados a ≤120 chars |

### Resultado validación final (Python schema validator):

```
✅ PM-2.1 (The Spark) — S1 Reflexión Inicial           3.5h/0.75h | 3 acts | quiz: False
✅ PM-2.2 (Gap Analysis) — S1 Contextualización         2.5h/0.75h | 3 acts | quiz: False
✅ PM-2.3 (Reading — The Master Anchor) — S2            4.0h/0.75h | 3 acts | quiz: Reading
✅ PM-2.4 (Writing — Task-Based Production) — S3        3.0h/0.75h | 3 acts | quiz: False
✅ PM-2.5 (Vocabulary, Literacy & Scenario Setup) — S2  2.0h/0.75h | 3 acts | quiz: Vocabulary
✅ PM-2.6 (Listening — The Auditory Anchor) — S4        3.0h/0.75h | 3 acts | quiz: Listening
✅ PM-2.8 (Speaking — The Mission) — S4                 3.0h/0.75h | 3 acts | quiz: False
✅ PM-2.9 (Language Functions) — S5                     6.0h/1.5h  | 3 acts | quiz: Language Functions
✅ PM-2.10 (Grammar — Structure Use) — S3               3.0h/0.75h | 3 acts | quiz: Grammar

Horas por sesión: S1 6.0/1.5 ✅ | S2 6.0/1.5 ✅ | S3 6.0/1.5 ✅ | S4 6.0/1.5 ✅ | S5 6.0/1.5 ✅
Cuestionario Consolidado: 5+5+5+5+5 = 25/25 pts ✅
RESULTADO: TODOS LOS CHECKS PASADOS ✅
```

### PM-2.11 (GFPI-F-134 Row Assembler) — también actualizado:
- `_meta` block agregado
- Evidence 3 `instrumento_tipo` corregido: "Lista de chequeo" → "Cuestionario"
- `col_6_actividades_aprendizaje`: 36 → 27 actividades (3 por PM × 9 PMs)
- `col_9_tecnicas_instrumentos`: referencias de actividades renumeradas (1–27)
- `col_10_ambientes`: rangos de actividades actualizados
- Conteos validación: `total_activities: 36 → 27`, `count_cognitive: 18 → 16`, `count_procedural: 18 → 11`
- `trazabilidad.fuentes_pms_2x`: "4 actividades" → "3 actividades" en todas las entradas
- `quiz_total` en validation_report: corregido para excluir Writing de los 25 pts del quiz

---

## DECISIONES GLOBALES

*(Se registran aquí las decisiones que afectan múltiples módulos)*

| Fecha | Decisión | Módulos afectados |
|-------|----------|------------------|
| 2026-04-19 | S6 autonomous_work = 0h (Option A — sesión evaluación) | S6, total autónomo |
| 2026-04-19 | pm_id format: "PM-3.2-S{n}" para todas las sesiones | S1–S8 |
| 2026-04-19 | success_vocabulary S1: "technician", "bay" reemplazan "deadline", "crash" | S1 pm0 |
| 2026-04-19 | PM-2.4 Writing: contributes_to_consolidated_quiz=false (quiz es Reading/Vocab/Grammar/Listening/LangFunc) | PM-2.4, PM-2.11 |
| 2026-04-19 | Cuestionario Consolidado S6 = 25 pts: 5 skills × 5 pts, Writing evaluada por Producto (Lista de verificación No 2) | PM-2.4, PM-2.11, PM-4.2 |
| 2026-04-19 | PM-2.7 DEPRECATED — Pronunciation absorbida por PM-2.8 + PM-0 constraints layer | PM-2.7, PM-2.8 |

---

## COMPARACIÓN CON RUN BASE (DIESEL-2026-04-15)

*(Se llena a medida que se generan módulos)*

| Módulo | Cambio vs 04-15 | Valoración |
|--------|----------------|------------|
| — | — | — |

---

## PRÓXIMA SESIÓN

> **Instrucción para el LLM:** Lee SOLO esta sección para arrancar. No re-leas el CHANGELOG completo ni pidas contexto adicional. Empieza directamente con las instrucciones de arranque al final.

---

### Estado actual — cierre de sesión 2026-04-19

**Run:** DIESEL-2026-04-19 · Guía 1 — *The Workshop Specialist* · CEFR A1.1 → A1.2
**Pipeline:** Completo y validado. G5 Validation: **13/13 PASS**.

#### Lo que está hecho y en qué archivo vive

| Output | Archivo | Estado |
|--------|---------|--------|
| CEFR Foundation + Silabus | `prompts/pm-0.md` v2.0 | ✅ SUCCESS+M normativo |
| Ruta macrotemática | `pm-1-1.json` | ✅ |
| Scope & Sequence + fuentes | `pm-1-2.json` | ✅ Fuentes curadas (Shadow Foam, SafetyCulture, Fullbay) |
| Activity Cards (10 PMs) | `pm-2-1.json` … `pm-2-11.json` | ✅ Schema v2.0 · PM-0 injected |
| Playbook Outline | `pm-3-1.json` + `pm-3-1-playbook-outline.docx` | ✅ amb + estrategias + V+O+C |
| Build-Out 7 sesiones | `pm-3-2-s1.md` … `pm-3-2-s6b-s8.md` + `pm-3-2-session-build-outs.docx` | ✅ pm0_protocol en todos |
| Deck spec (Canva/PPTX) | `pm-3-3-spec.json` | ✅ spec lista · **deck NO generado aún** |
| Workbook del aprendiz | — | ⚠️ **AUSENTE en 04-19** (presente en 04-15 como pm-3-4-workbook.docx) |
| Misión Final | `pm-3-5.json` + `pm-3-5-mission.md` | ✅ |
| Guía de Aprendizaje | `pm-3-6-learning-guide.md` + `pm-3-6-learning-guide.docx` | ✅ |
| Instrumentos formativos | `pm-4-1.json` + `pm-4-1-instruments.md` | ✅ 5 instrumentos |
| Cuestionario Consolidado | `pm-4-2.json` + `pm-4-2-quiz.md` | ✅ 25 ítems reales |

#### Arquitectura — dos cambios permanentes introducidos en esta sesión

1. **`prompts/` = fuente única de verdad.** `lg-factory-engine/prompts` es un symlink a `../prompts`. No editar nunca dentro de `lg-factory-engine/prompts/` directamente.
2. **PM-0 v2.0 — SUCCESS+M.** El factor M (Meaning-before-Form) es normativo para TODAS las guías desde G2 en adelante. Checklists M1/M2/M3 obligatorios en cualquier PM-2.x nuevo.

#### Variables que el usuario llenará manualmente

- `competencia_codigo` — buscar en Sofía Plus
- `Código del Programa` — buscar en Sofía Plus
- Aparece en: `pm-3-6-learning-guide.md` §1, `pm-2-11.json`, `pm-4-1.json`

---

### Pendiente — en orden de prioridad

| # | Tarea | Contexto |
|---|-------|---------|
| **P1** | **PM-3.3 — Generar el deck** | `pm-3-3-spec.json` ya existe (48 KB, ~45 slides especificadas). Falta generar el `.pptx`. El usuario quería probar Canva Y PowerPoint. Confirmar formato antes de generar. |
| **P2** | **PM-3.4 — Workbook del aprendiz** | Ausente en 04-19. En 04-15 existe `pm-3-4-workbook.docx`. ¿Se deprecó intencionalmente o es un gap? Confirmar con el usuario antes de generar. |
| **P3** | **Refactorizar scripts — bloque CFG** | Todos los scripts `.js` en la raíz tienen rutas hardcodeadas a `DIESEL-2026-04-15`. Refactorizar para usar un bloque `CFG` configurable en el tope de cada script. |
| **P4** | **`pm-3-3-gen.js` → data-driven** | Actualmente el generador del deck no lee desde `pm-3-3-spec.json`. Convertirlo según PM-3.3 §11.5. |
| **P5** | **G2 — The Safety Auditor** | Siguiente guía del programa Diesel. CEFR A1.2. Empieza desde PM-1.1 con nuevo scope. PM-0 v2.0 aplica desde el inicio. |
| **P6** | **Tabla COMPARACIÓN CON RUN BASE** | La tabla en `## COMPARACIÓN CON RUN BASE` está vacía. Llenar como cierre documentario de G1. |

---

### Instrucciones de arranque — primeras 3 acciones de la próxima sesión

**1. Confirmar PM-3.4 (Workbook)**
Preguntar al usuario: *"PM-3.4 Workbook del aprendiz está ausente en el run 04-19 pero presente en 04-15. ¿Lo generamos, lo deprecamos o lo portamos del 04-15?"* No avanzar a P1 hasta tener respuesta.

**2. Confirmar formato del deck (P1)**
Preguntar: *"Para el deck (PM-3.3): ¿generamos `.pptx` directo, o primero exportamos a Canva via JSON?"* Si el usuario ya decidió en una sesión intermedia, leer la respuesta en el contexto antes de preguntar.

**3. Generar el deck con el skill PPTX**
Una vez confirmado el formato, leer `/sessions/*/mnt/.claude/skills/pptx/SKILL.md` primero, luego construir el deck desde `pm-3-3-spec.json`. El spec tiene estructura de slides por sesión — seguirlo slide a slide, no re-interpretar.

---

> **Archivos clave para contexto rápido (leer en este orden si necesitas más contexto):**
> 1. `prompts/pm-0.md` — restricciones pedagógicas normativas
> 2. `pm-3-1.json` → `.sessions_detail[]` — estructura de las 8 sesiones
> 3. `pm-3-3-spec.json` → `.slides[]` — contenido del deck a generar
