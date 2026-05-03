# PM-3.7: GFPI-F-134 MATRIX AGGREGATOR · ⚠️ DEPRECATED 2026-05-02

## FPI SENA — Bilingüismo

---

## ⛔ ESTE PROMPT MODULE ESTÁ DEPRECATED · NO USAR EN RUNS NUEVOS

> **Decisión arquitectónica Sergio 2026-05-02 PM:**
> El xlsx `GFPI-F-134-V04-REFERENCIA-formato-Sergio.xlsx` (subido 2026-05-02) **REEMPLAZA** la plantilla `GFPI-F-134_Vf.xlsx` (April 2022) que PM-3.7 consumía. La nueva plantilla V04 es el formato oficial SENA actual.
>
> **PM-2.11 v3.1+ ya genera el xlsx V04 oficial** con agrupación tripartita por RA (gfpi_f134_v04_rows[] · 6 filas heredadas 1:1 de pm-1-2 sub_bloques_tripartitos) en formato canon Sergio C7+C10+C11 (v3.2).
>
> **PM-3.7 queda obsoleto** porque:
> 1. Su plantilla source (Vf April 2022) ya no es canon SENA
> 2. Su rol "agregador multi-RAP post-Playbook" se cumple ya en PM-2.11 v3.1+ (6 sub-filas tripartitas equivalen funcionalmente al multi-RAP rollup que Vf intentaba)
> 3. Mantenerlo activo crea **drift de formato** entre lo que produce Phase 2 (V04 canon) y Phase 4 (Vf obsoleto)
>
> **Reemplazo canónico:**
> - **Use:** `PM-2.11 v3.2` para generar el xlsx GFPI-F-134 V04 oficial SENA por RAP
> - **Para multi-RAP futuro** (programas con N RAPs): ejecutar PM-2.11 v3.2 N veces · agregar resultados manualmente o crear `PM-2.11-multi-RAP` (NEW · NO renombrar PM-3.7) si se justifica volumen
>
> **Estado de assets PM-3.7:**
> - Master prompt: este archivo · marcado DEPRECATED · preservado para historial
> - Subagente Python: `.claude/skills/fpi-sena-fase3/subagentes/subagente_pm_3_7_gfpi_f134_matrix.py` · marcar DEPRECATED · NO ejecutar en nuevos runs
> - lib/xlsx_renderer.py función V04: REUSABLE · ya migró a scripts canon de PM-2.11 v3.1 (`pm-2-11-v3-1-render-xlsx-6-rows.py`)
> - Outputs históricos en runs (IMARPOR-CC v1 · pm-3-7.json/.xlsx): preservados para historial · NO regenerar
>
> **Cross-PM downstream cleanup pending:**
> - DM v3.8 → v3.9 (deprecation footnote)
> - PLAN-FASE-3 v1.5 → v1.6 (PM-3.7 eliminado de Hito-Fase3-4)
> - PM-2.11 v3.2 (remover PM-3.7 de cross-PM canonization downstream list)
> - PM-3.3 / PM-0 / PM-0.0 / PM-1.1 (remover referencias PM-3.7 si las hay)

**Si llegaste aquí buscando generar GFPI-F-134 oficial → usa PM-2.11 v3.2 (Row Assembler · v3.1 agrupación tripartita 6 filas · v3.2 formato canon Sergio C7+C10+C11).**

---



## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.7 |
| **Nombre** | GFPI-F-134 Matrix Aggregator + xlsx Renderer |
| **Versión** | 2.0 |
| **Last Verified** | 2026-04-30 |
| **Ubicación** | Fase 4 (derivado estudiante/instructor) · paralelo a PM-3.3 + PM-3.4 + PM-3.6 · post Gate 3 |
| **Output** | (1) `pm-3-7.json` · datos organizados per 14 cols xlsx Vf canon · (2) `pm-3-7.xlsx` · plantilla GFPI-F-134_Vf.xlsx hoja 2 poblada |
| **Rol en el sistema** | Agrega información distribuida en Phase 1+2+3 outputs · sintetiza por columna xlsx Vf · renderiza plantilla oficial SENA lista para entrega instructor |
| **Phase** | 4 |
| **Depends On** | [PM-0, PM-2.3..2.10, PM-2.11, PM-3.1, PM-3.2, PM-4.1, PM-4.2] |
| **Trigger** | post_playbook_confirmation (Gate 3 cerrado · Sergio aprueba Playbook completo) |

---

## ⚠️ PRE-GENERATION CHECKLIST — CANON v1.0 OBLIGATORIO

> **NACIMIENTO PM-3.7 (2026-04-29):** Sergio detectó que la plantilla oficial SENA `GFPI-F-134_Vf.xlsx` (April 2022) tiene 14 columnas lógicas en hoja 2 "PLANEACIÓN" · DM canon documenta 11 columnas · drift aparente. Sergio clarificó: NO es drift · es vista agregada · todos los campos viven en upstream PMs distribuidos. PM-3.7 nace para agregar/sintetizar/renderizar sin afectar canon existente (DM 11 cols stays · pm-2-11 schema stays · NEW PM agrega · don't modify).

**ANTES de generar pm-3-7.json para CUALQUIER programa/guía, completar este checklist:**

- [ ] **PASO A · Leer este master prompt completo** (especialmente §INPUT REQUERIDO + §OUTPUT ESPERADO 14 cols + §MAPPING xlsx Vf hoja 2 + §REGLAS 1-7)
- [ ] **PASO B · Leer plantilla xlsx Vf** (`GFPI-F-134_Planeacion_Pedagógica_Proyecto_Formativo_Vf.xlsx` · hoja 2 "2. PLANEACIÓN" · row 23-24 headers · row 25+ ejemplo poblado)
- [ ] **PASO C · Leer inputs canónicos Phase 1+2+3:**
  - pm-0-context.json (Fase Proyecto + Actividad Proyecto + Saberes derivables)
  - pm-2-11.json (gfpi_f134_row_complete · col_7_horas + col_9_instrumentos + col_10_ambientes populated)
  - 9 Activity Cards (pm-2-1 .. pm-2-10 · estrategias didácticas embedded en content + activity_card)
  - pm-3-1.json (estrategias_resumen + ambientes_resumen + voc_dimensions_table · YA agregados)
  - 8× pm-3-2-sX.json (sessions detail contextual)
  - pm-4-1.json + pm-4-2.json (Instrumentos formales + Cuestionario S6)
- [ ] **PASO D · Validar 14 cols xlsx Vf cubiertas** (ver §MAPPING abajo)
- [ ] **PASO E · Validar síntesis no-redundante** (ESTRATEGIAS DIDÁCTICAS NO es lista de 9 ACs separadas · es agregación pedagógica coherente)
- [ ] **PASO F · Validar 12 checks PASS** (ver §VALIDATION CHECKS)
- [ ] **PASO G · Validar canon §15.20 anti-copia-fantasma** (cero contaminación cast cross-program · CHECK 9)
- [ ] **PASO H · Validar xlsx renderer target accessible** (template existe · output path writable)

---

## CAMBIO v1.0 — NACIMIENTO PM-3.7

> [!info] Justificación arquitectónica (2026-04-29)
> 
> **Problema observado:** instructor SENA recibe outputs Phase 3 como JSON (pm-2-11.json + pm-3-1.json + 8× pm-3-2-sX.json) · pero el formato oficial de entrega curricular SENA es la plantilla `GFPI-F-134_Vf.xlsx` (Procedimiento Planeación Pedagógica · April 2022). Sin agregador, instructor debe copiar/pegar manualmente fields cross-JSON al xlsx · error-prone · pierde formato canon.
> 
> **Decisión arquitectónica (Sergio · 2026-04-29):** crear NEW PM-3.7 como artefacto agregador/exportador · vive en Phase 4 · paralelo a PM-3.6 GFPI-F-135 · consume todos los outputs upstream + renderiza xlsx Vf hoja 2 directamente. NO modifica canon existente (DM 11 cols + pm-2-11 schema permanecen sin cambio). 
> 
> **REGLA 21 trigger mutual aplicado:** PM-3.7 = NUEVO master prompt + NUEVO wrapper + NUEVO xlsx renderer = código nuevo · architectural change · merece bump PLAN-FASE-3 v1.3 → v1.4 · NO solo scheduling.
> 
> **Distinción canon vs vista agregada:**
> - DM 11 cols (canon pedagógico) ← contrato pedagógico interno · validación cross-PM · pm-2-11.gfpi_f134_row_complete
> - xlsx Vf 14 cols (vista oficial SENA) ← formato entrega externa · agregación cross-PM · pm-3-7.json + pm-3-7.xlsx
> 
> Ambos coexisten. PM-3.7 traduce de canon interno a vista oficial.

---

## INPUT REQUERIDO

| Input | Fuente | Aporta a xlsx col |
|-------|--------|---------------------|
| **PM-0 Context** (`pm-0-context.json`) | Fase 1 | Cols 1-2 (Fase Proyecto + Actividad Proyecto) · Saberes (Conceptos + Procesos · derivables de programa_nombre + universo_narrativo + grammar_group_17_sector) · datos institucionales |
| **PM-2.11 Row** (`pm-2-11.json`) | Fase 2 mecánico | Col 3 Competencia · Col 4 RAP · Col 6+7 Horas (col_7_horas · directo + autónomo) · Col 9 Ambientes (col_10 · types/materials/instructors) · Col 9 Instrumentos (col_9 · referencia PM-4.1+4.2) |
| **9 Activity Cards** (`pm-2-1.json` .. `pm-2-10.json` · sin pm-2-7 deprecated) | Fase 2 creativo | Col 5 Actividades de Aprendizaje (síntesis pedagógica de las actividades de apropiación S2-S5) · Col 8 Estrategias Didácticas Activas (embedded en content + activity_card) |
| **PM-3.1 Outline** (`pm-3-1.json`) | Fase 3 | Col 8 Estrategias Didácticas (`estrategias_resumen` · YA agregado por sesión) · Col 9 Ambiente (`ambientes_resumen` · YA agregado) · sintetizable como single value |
| **8× PM-3.2 Build-Outs** (`pm-3-2-s1.json` .. `pm-3-2-s8.json`) | Fase 3 | Col 5 Actividades (sessions detail contextual · refinamiento del listado) · Col 14 Observaciones (notas contextuales por sesión) |
| **PM-4.1 Instrumentos** (`pm-4-1.json`) | Fase 3 mecánico | Col 13 Descripción de la Evidencia (instrumentos de evaluación formal · 6 evidencias canon · referencias) |
| **PM-4.2 Cuestionario S6** (`pm-4-2.json`) | Fase 3 mecánico | Col 13 Descripción Evidencia (cuestionario consolidado S6 · 25 pts) |
| **Plantilla xlsx Vf** (`GFPI-F-134_Planeacion_Pedagógica_Proyecto_Formativo_Vf.xlsx`) | Canon SENA April 2022 | Template estructural · hoja 2 · cells coordinates + merged cells preserved |

---

## OUTPUT ESPERADO

PM-3.7 produce **DOS artefactos** complementarios:

### Artefacto 1 — `pm-3-7.json` (Datos Organizados)

JSON canónico con shape mirror de las 14 columnas lógicas xlsx Vf hoja 2. Sirve como:
- Single source of truth aggregator (consumible por wrappers/scripts downstream)
- Input al xlsx renderer (Artefacto 2)
- Documento de revisión instructor antes de xlsx final

### Artefacto 2 — `pm-3-7.xlsx` (Plantilla Poblada)

Copia de `GFPI-F-134_Vf.xlsx` con hoja 2 "PLANEACIÓN" poblada celdas:
- Headers row 23-24 preservados (NO modificar)
- Metadata rows 4-21 (Fecha, Programa, Modalidad, Código, Proyecto, Instructor, Regional) populadas desde pm-0-context
- Data rows 25+ pobladas con 1 fila por RAP (single-guía absorpción) o 1 fila por sesión apropiación según decisión instructor
- Merged cells preserved per template original
- Format/styling preserved (font, colors, borders)
- Filename: `runs/<RUN-ID>/pm-3-7-gfpi-f134-matrix.xlsx`

### Schema canónico pm-3-7.json (26+ keys · v1.0)

Lista canónica:

1-13. Metadata block:
- `pm_id` · `pm_name` · `pm_version` · `run_id` · `guide_id` (si aplica)
- `generated_date` · `instructor` · `phase` · `subfase_sena`
- `genera_evidencia_formal_gfpi_f134` (False · este es exportador no productor)
- `tipo_artefacto_sena` ("vista_agregada_oficial")
- `xlsx_render_target` · `xlsx_template_source` (path GFPI-F-134_Vf.xlsx)

14-27. Data 14 cols xlsx Vf:
- `col_1_fase_proyecto` (str · de pm-0-context · derived)
- `col_2_actividad_proyecto` (str · de pm-0-context · derived)
- `col_3_competencia` (str · de pm-2-11.col_1_competencia o pm-1-2)
- `col_4_resultado_aprendizaje` (str · de pm-2-11.col_2_resultado_aprendizaje o pm-1-2.RAP)
- `col_5_actividades_aprendizaje_a_desarrollar` (list[dict] · síntesis 9 ACs apropiación S2-S5 + pm-3-2-sX context)
- `col_6_horas_trabajo_directo` (int · de pm-2-11.col_7_horas.direct_total · default suma per_session · validar contra pm-1-1.duracion_total)
- `col_7_horas_trabajo_independiente` (int · de pm-2-11.col_7_horas.autonomous_total)
- `col_8_estrategias_didacticas_activas` (list[str] · síntesis pm-3-1.estrategias_resumen + 9 ACs estrategias embedded · NO copy-paste 9 separadas · agregación pedagógica)
- `col_9_ambiente` (str · de pm-2-11.col_10_ambientes.types o pm-3-1.ambientes_resumen.tipo_ambiente)
- `col_10_materiales_formacion` (str/list · de pm-2-11.col_10_ambientes.materials o pm-3-1.ambientes_resumen.recursos_fijos+recursos_variables)
- `col_11_instructores_responsables` (str · de pm-2-11.col_10_ambientes.instructors o pm-0-context.instructor metadata)
- `col_12_criterios_evaluacion` (list[str] · de pm-2-11.col_5_criterios_evaluacion + pm-2-11.col_11_criterios_detallados)
- `col_13_descripcion_evidencia_aprendizaje` (str · síntesis pm-2-11.col_8_evidencias + pm-4-1 instrumentos + pm-4-2 cuestionario S6)
- `col_14_observaciones` (str · contextual notes · de pm-3-2-sX o pm-3-1.siguiente_paso)

Plus saberes (conceptos / procesos · NOT in xlsx Vf hoja 2 directly · pero útiles para contexto + posible inclusión en col_14):
- `saberes_conceptos_y_principios` (list[str] · de pm-0-context derived + pm-1-2 grammar_targets + universo_narrativo conceptos técnicos)
- `saberes_procesos` (list[str] · de pm-0-context + ACs activity descriptions)

28+. Validation block:
- `validation_checks` (dict · 12 checks PASS/FAIL)
- `cross_references` (dict · alimenta_a + consume_de)
- `enriched: false` (Gate Humano 4 Derivados approval pendiente)
- `_enriched_false_rationale` (str)

---

## REGLAS DE DISEÑO

### REGLA 1 — APROPIACIÓN PHASE FOCUS

xlsx Vf hoja 2 documenta primariamente actividades de **APROPIACIÓN** (S2-S5 en ciclo SENA · donde vive evidencia formal). Las actividades de Reflexión (S1) · Evaluación (S6) · Transferencia (S7-S8) son **contextuales** · pueden mencionarse en Col 5 + Col 14 pero no dominan.

Per DM canon: 6 evidencias formales viven en S2-S5 (Reading + Writing + Listening + Speaking + Language Functions + Cuestionario S6 consolidado).

### REGLA 2 — SÍNTESIS NO-REDUNDANTE

Cuando 9 Activity Cards aportan estrategias didácticas, **agrupar/sintetizar** en lista pedagógica coherente · **NO listar 9 separadas**. La col 8 ESTRATEGIAS DIDÁCTICAS ACTIVAS es vista agregada · no inventario.

Ejemplo correcto (agregado):
> "Aprendizaje Basado en Tareas (TBLT) · Aprendizaje Basado en Proyectos (ABP) · Reflexión metacognitiva · Trabajo colaborativo en parejas/grupos · Uso de realia portuaria/marítima · Pre-enseñanza léxica vía Toolbelt"

Ejemplo incorrecto (lista 9 ACs):
> "PM-2.1 The Spark · PM-2.2 Gap Analysis · PM-2.3 Reading Master Anchor · PM-2.4 Writing Task-Based · PM-2.5 Vocabulary Scaffold · PM-2.6 Listening TBLT · PM-2.8 Speaking Mission · PM-2.9 Language Functions · PM-2.10 Grammar Structure Use"

### REGLA 3 — VERBOS INFINITIVOS CANÓNICOS SENA

Estilo SENA usa verbos infinitivos en RAP + actividades:
- "Comprender" · "Identificar" · "Aplicar" · "Discutir" · "Demostrar" · "Interactuar"
- NO usar imperativos ("Comprende") · NO segunda persona ("Comprendes")
- Coherente con estilo xlsx Vf ejemplo (programa 122152 "Comprender el proceso administrativo")

### REGLA 4 — BILINGÜISMO EN CELDAS

xlsx oficial SENA es primary español. Para programa de Bilingüismo:
- Celdas administrativas (Programa · Modalidad · Código · Proyecto): español
- Celdas pedagógicas (Actividades · Estrategias · Ambientes): español primary · inglés cuando aplique para vocabulario técnico inevitable
- Cita literal de RAP/Competencia: respetar idioma original SOFÍA Plus

### REGLA 5 — CONSISTENCIA CON DM CANON

Cuando xlsx col mapea directamente a DM 11-col, mantener exact alignment:
- xlsx Col 3 (Competencia) ≡ DM Col 1 ≡ pm-2-11.col_1_competencia
- xlsx Col 4 (RAP) ≡ DM Col 2 ≡ pm-2-11.col_2_resultado_aprendizaje
- xlsx Col 12 (Criterios) ≡ DM Col 5 + Col 11 ≡ pm-2-11.col_5 + col_11

NO inventar texto · NO sustituir · usar fuente exacta upstream.

### REGLA 6 — DERIVATIONS DOCUMENTADAS

Cuando un xlsx col NO tiene fuente directa upstream (e.g., Saberes Conceptos cuando pm-0-context no los surface as named field), DERIVAR explícitamente · documentar derivación en `pm-3-7.json` campo `derivations_log` · transparente para auditoría.

Ejemplos:
- `col_1_fase_proyecto`: derivada de pm-0-context.programa_nombre + pm-0-context.fase_0_metadata.proyecto_formativo (si aplica)
- `saberes_conceptos`: derivados de pm-1-2.grammar_targets + pm-0-context.universo_narrativo.conceptos_tecnicos
- `col_8_estrategias_didacticas`: síntesis de pm-3-1.estrategias_resumen.estrategia_dominante_por_sesion + 9 ACs

### REGLA 7 — VALIDACIÓN xlsx RENDERER

El xlsx Vf template tiene merged cells (E23:E24 · F23:G23 · I23:K23 · etc.). Renderer DEBE:
- Preservar merged cells (NO desensamblar accidentalmente)
- Preservar styles (font · borders · fill · alignment)
- Escribir solo en cells de data (row 25+) NO en headers (row 1-24)
- Validar output xlsx abre correctamente en Excel/LibreOffice
- Filename canónico: `pm-3-7-gfpi-f134-matrix.xlsx` (NO sobreescribir template original)

---

## MAPPING xlsx Vf hoja 2 ↔ pm-3-7.json (DETALLADO)

| xlsx Col | xlsx Header (R23-24) | pm-3-7.json key | Fuente upstream |
|----------|----------------------|-------------------|-----------------|
| 1 | FASE DE PROYECTO | `col_1_fase_proyecto` | pm-0-context (derived) |
| 2 | ACTIVIDAD DE PROYECTO | `col_2_actividad_proyecto` | pm-0-context (derived) |
| 3 | COMPETENCIA | `col_3_competencia` | pm-2-11.col_1_competencia o pm-1-2 |
| 4 | RESULTADOS DE APRENDIZAJE | `col_4_resultado_aprendizaje` | pm-2-11.col_2 o pm-1-2.RAP |
| 5 | ACTIVIDADES DE APRENDIZAJE A DESARROLLAR | `col_5_actividades_aprendizaje_a_desarrollar` | 9 ACs + pm-3-2-sX (síntesis S2-S5) |
| 6 | HORAS TRABAJO DIRECTO | `col_6_horas_trabajo_directo` | pm-2-11.col_7_horas.direct_total |
| 7 | HORAS TRABAJO INDEPENDIENTE | `col_7_horas_trabajo_independiente` | pm-2-11.col_7_horas.autonomous_total |
| 8 | ESTRATEGIAS DIDÁCTICAS ACTIVAS | `col_8_estrategias_didacticas_activas` | pm-3-1.estrategias_resumen + 9 ACs (síntesis) |
| 9 | AMBIENTE | `col_9_ambiente` | pm-2-11.col_10.types o pm-3-1.ambientes_resumen.tipo_ambiente |
| 10 | MATERIALES DE FORMACIÓN | `col_10_materiales_formacion` | pm-2-11.col_10.materials o pm-3-1.recursos |
| 11 | INSTRUCTORES RESPONSABLES | `col_11_instructores_responsables` | pm-2-11.col_10.instructors o pm-0-context.instructor |
| 12 | CRITERIOS DE EVALUACIÓN | `col_12_criterios_evaluacion` | pm-2-11.col_5 + col_11 |
| 13 | DESCRIPCIÓN DE LA EVIDENCIA DE APRENDIZAJE | `col_13_descripcion_evidencia_aprendizaje` | pm-2-11.col_8 + pm-4-1 + pm-4-2 |
| 14 | OBSERVACIONES | `col_14_observaciones` | pm-3-2-sX context o pm-3-1.siguiente_paso |

**Cells xlsx coordinates (template Vf · validar contra real cells):**
- Row 25 = primera fila data RAP 1 (ejemplo programa 122152 línea base)
- Row 26-30 = filas adicionales si multi-RAP
- Cols A-N = 14 columnas data (excluding O-V que pueden tener metadata adicional · validar)

---

## XLSX RENDERER REQUIREMENTS

### Tecnología recomendada
- **Python `openpyxl`** (canon Python · ya en sandbox)
- Template-based: load `GFPI-F-134_Vf.xlsx` · modify hoja 2 cells · save as new file
- Preserve merged cells via `ws.merged_cells.ranges`
- Preserve styles via `cell.font`, `cell.alignment`, `cell.fill`, `cell.border` (deep copy si necesario)

### Pseudocódigo canónico

```python
import openpyxl
from copy import copy

# 1. Load template
wb = openpyxl.load_workbook('master-prompts/canon/GFPI-F-134_Vf.xlsx', data_only=False)
ws = wb['2. PLANEACIÓN']

# 2. Populate metadata (rows 4-21)
ws['E4'] = pm37_data['generated_date']
ws['E5'] = pm0_context['programa_nombre']
ws['E6'] = 'Presencial'  # or from pm-0
ws['E7'] = pm0_context['programa_codigo_sofia'] + ' versión ' + pm0_context['programa_version']
ws['E8'] = pm37_data['col_2_actividad_proyecto']
# ... (complete metadata block)

# 3. Populate data row(s) starting row 25
data_row = 25
ws.cell(row=data_row, column=1, value=pm37_data['col_1_fase_proyecto'])
ws.cell(row=data_row, column=2, value=pm37_data['col_2_actividad_proyecto'])
ws.cell(row=data_row, column=3, value=pm37_data['col_3_competencia'])
# ... (complete 14 cols)

# 4. Save (NEVER overwrite template)
output_path = f'runs/{run_id}/pm-3-7-gfpi-f134-matrix.xlsx'
wb.save(output_path)
```

### Caveats renderer
- Template `GFPI-F-134_Vf.xlsx` debe vivir canon location (e.g., `master-prompts/canon/`) NO en runs · es shared canon SENA
- Si multi-RAP en single-guía absorpción → multiple data rows (uno por RAP) · respetar merged cells col_1 (FASE PROYECTO) que abarca filas 25-66
- Validar output xlsx con `openpyxl.load_workbook` re-read antes de declarar PASS

---

## VALIDATION CHECKS (12)

| # | Check | Bloqueante? |
|---|-------|-------------|
| 1 | 14 cols xlsx Vf populated (no nulls en cols 3, 4, 6, 7, 12, 13 obligatorias) | Sí |
| 2 | Horas suma correcta: col_6 + col_7 == pm-2-11.col_7_horas.direct_total + autonomous_total | Sí |
| 3 | Estrategias didácticas son síntesis · NO copy-paste 9 ACs (length(col_8) ≤ 8 items) | Sí |
| 4 | Competencia (col_3) + RAP (col_4) exact match con pm-2-11 | Sí |
| 5 | Ambiente + Materiales + Instructores cross-validate vs pm-2-11.col_10 (no inventar) | Sí |
| 6 | Criterios evaluación (col_12) coherentes con evidencias (col_13) · cross-reference | Sí |
| 7 | CHECK 9 anti-copia-fantasma vs MGV xlsx (si existe ref op) · 0 universe leaks | Sí |
| 8 | xlsx render target valid path · file writable · NO sobreescribir template | Sí |
| 9 | Tono SENA formal: verbos infinitivos · sin coloquialismos · sin segunda persona | Sí |
| 10 | CEFR level consistente con pm-1-2.cefr_level | Sí |
| 11 | enriched: false marcado (Gate Humano 4 Derivados pendiente) | Sí |
| 12 | cross_references populadas (alimenta_a + consume_de PMs upstream) | Sí |

**Veredicto:** 12/12 PASS para considerar pm-3-7 generado correctamente. Cualquier FAIL bloquea xlsx render.

---

## CROSS_REFERENCES

### `cross_references` schema obligatorio en pm-3-7.json

```json
{
  "alimenta_a": [
    "Instructor (entrega curricular oficial SENA · xlsx Vf)",
    "Coordinación académica (revisión Gate 4)",
    "Auditoría SENA SOFÍA Plus (si requerida)"
  ],
  "consume_de": {
    "pm0_context": "Fase Proyecto · Actividad Proyecto · Saberes derivables · datos institucionales",
    "pm211": "Competencia · RAP · Horas · Ambientes · Instrumentos (col_9)",
    "activity_cards_9": "Estrategias didácticas embedded · Actividades de apropiación",
    "pm31": "estrategias_resumen YA agregado · ambientes_resumen YA agregado",
    "pm32_sessions_8": "Contextual sessions detail · observaciones",
    "pm41": "Instrumentos formales · 6 evidencias canon",
    "pm42": "Cuestionario S6 consolidado 25 pts"
  },
  "no_consume_de": ["pm33", "pm34", "pm35", "pm36"]
}
```

`no_consume_de` documenta paralelismo Phase 4: PM-3.7 NO depende de outputs PM-3.3/3.4/3.5/3.6 (todos paralelos en Hito-Fase3-4 · pueden generarse independientemente post Gate 3).

---

## ERRORES HISTÓRICOS A NO REPETIR

> v1.0 · sin historia operacional aún. Esta sección crece con learnings posteriores.

**Errores anticipables (basados en patterns Fase 2/3):**

1. **❌ Copy-paste 9 ACs estrategias en col_8** sin síntesis pedagógica (REGLA 2 violation)
2. **❌ Sobrescribir template xlsx Vf canon** en lugar de save-as nuevo file (REGLA 7 violation)
3. **❌ Inventar texto en cells cuando upstream PM tiene null/empty** (use derivations_log para transparencia · REGLA 6)
4. **❌ Mezclar idiomas inconsistentemente** (REGLA 4 · español primary · inglés solo donde indispensable)
5. **❌ Asumir 11 cols DM = 14 cols xlsx Vf** (NO equivalencia 1-a-1 · usar §MAPPING tabla strict)
6. **❌ Generar pm-3-7 antes de Gate 3 cerrado** (depende Playbook completo aprobado · igual que PM-3.6)

---

## CHANGELOG

### v1.0 · 2026-04-29 · NACIMIENTO PM-3.7

- **Contexto:** Sergio uploaded `GFPI-F-134_Planeacion_Pedagógica_Proyecto_Formativo_Vf.xlsx` (canon SENA April 2022 · plantilla oficial Procedimiento Planeación Pedagógica)
- **Hallazgo pre-flight:** xlsx Vf hoja 2 = 14 cols lógicas vs DM canon = 11 cols · drift aparente
- **Clarificación arquitectónica Sergio:** NO es drift · es vista agregada · todos los campos en upstream PMs · solo no estaban agregados
- **Decisión:** crear NEW PM-3.7 · NO modificar canon existente (DM 11 cols stays · pm-2-11 schema stays)
- **Naturaleza:** Camino 2 LLM puro · creative aggregation + transformación pedagógica + xlsx renderer
- **Phase:** 4 derivado · paralelo a PM-3.3 + PM-3.4 + PM-3.6 · post Gate 3
- **Inputs:** load_phase4_inputs (existente) + pm-0-context (ya en base load_phase2_inputs)
- **Outputs:** pm-3-7.json (datos organizados) + pm-3-7.xlsx (plantilla poblada)
- **REGLA 21 trigger mutual aplicado:** PM-3.7 = código nuevo · architectural · merece bump PLAN-FASE-3 v1.3 → v1.4
- **Workflow placement:** Hito-Fase3-4 task list (paralelo a PM-3.3 + PM-3.4 + PM-3.6) · pendiente bump PLAN
- **xlsx renderer tech:** Python openpyxl · template-based · preserve merged cells + styles
- **Validation:** 12 checks PASS obligatorios para PM-3.7 generation correcta

### v1.1+ (esperada · post construcción wrapper subagente_pm_3_7)

- Refinements basados en construcción real de wrapper (template path canon location)
- Adjustments en xlsx renderer signature según hallazgos diseño emergente
- Posibles errores históricos documentados post-primera-ejecución

---

## ANTI-PATRONES A EVITAR

Heredados de PLAN-FASE-3 §10 + específicos PM-3.7:

1. **❌ Asumir Camino 1 mecánico desde xlsx renderer simplicity.** xlsx renderer es mecánico (openpyxl) · pero pm-3-7.json generation es Camino 2 LLM puro (síntesis cross-PM). Wrapper subagente_pm_3_7 = LLM bundle prep · renderer xlsx = post-LLM mechanical step.

2. **❌ Smoke deuda como excusa (Anti-patrón 12).** No codificar wrapper si xlsx Vf template no está en canon location · no postergar template setup.

3. **❌ Modificar pm-2-11 schema para "alinear con xlsx Vf".** Sergio explícitamente: "para no afectar el desarrollo del trabajo". PM-3.7 traduce · NO modifica upstream.

4. **❌ Saltar Pre-flight REGLA 19.** Pre-generation checklist 7 pasos obligatorio · cualquier nuevo run ejecuta los 7.

5. **❌ Single-RAP assumption.** Single-guía absorpción puede tener N RAPs en mismo guide · xlsx data rows pueden ser múltiples · validar contra pm-1-1.tipo + pm-1-2 estructura.

---

## FORMATO DE SALIDA ESTÁNDAR

```
runs/<RUN-ID>/<guide_id-if-applicable>/
├── pm-3-7.json                              # Datos organizados 14 cols + metadata
└── pm-3-7-gfpi-f134-matrix.xlsx             # Plantilla Vf poblada (Artefacto 2)

(canon location · NOT en runs)
master-prompts/canon/
└── GFPI-F-134_Vf.xlsx                        # Template oficial SENA April 2022 (read-only)
```

---

*PM-3.7 v1.0 · escrito 2026-04-29 (nacimiento · post Hito 2 Fase 3 cerrado · pre PLAN bump v1.4)*
*Próximo paso: build wrapper `subagente_pm_3_7_gfpi_f134_matrix.py` (Hito-Fase3-4 post Hito 3) + xlsx renderer `lib/xlsx_renderer.py` + bump PLAN-FASE-3 v1.3 → v1.4*

---

## EXTENSIÓN v2.0 — CANON V04 OFICIAL SENA (2026-04-30)

> [!warning] Decisión arquitectónica · V04 reemplaza Vf como canon oficial
>
> **Trigger:** Sergio detectó que el formato oficial SENA actualizado es **GFPI-F-134 V04** (no Vf · Vf era versión April 2022 ahora obsoleta). El 2026-04-30 Sergio compartió plantilla V04 con datos manualmente diligenciados para IMARPOR-CC como ground truth de cómo debe verse pm-3-7.xlsx output.
>
> **Decisión (Opción III):** V04 es CANON OFICIAL · Vf permanece como reference legacy para programas pre-2026-04 que ya consumieron PM-3.7 v1.0. Programas nuevos generan con v2.0 strict.

### REGLA 8 — V04 SHAPE: 1 HOJA · MULTI-RAP ROWS

| Aspecto | Canon Vf (v1.0 · legacy) | Canon V04 (v2.0 · OFICIAL) |
|---|---|---|
| Hojas | 5 (`ANALISIS`, `PLANEACIÓN`, `EJECUCION`, `EVALUACION`, `INSTRUCTIVO`) | **1 sola** (`PLANEACIÓN POR RAPS`) |
| Estructura datos | 14 cols · single-row 1 RAP | 14 cols · **multi-row · 1 row por RAP** (R15+) |
| Header rows | R23-R24 hoja 2 | R13-R14 hoja única |
| Data rows | R25 (single) | R15, R16, R17, ... R21 (one per RAP) |
| Sumas horas | manual | **fórmulas SUM(H15:H21) automáticas R22** |
| Tamaño template | 22 cols × 66 rows | 24 cols × 38 rows |
| Merged ranges | ~150+ | 48 |

### REGLA 9 — pm-3-7.json shape v2.0 · MULTI-RAP

```json
{
  "schema_version": "v2.0",
  "format_canon": "V04",  // NEW · "Vf" para legacy
  "guide_id": "...",
  "rows": [               // NEW · array de RAPs · cada uno con 14 cols
    {
      "rap_id": "RA1",
      "rap_titulo": "RECONOCER VOCABLOS Y EXPRESIONES BÁSICAS",
      "col_1_fase_proyecto": "...",
      "col_2_actividad_proyecto": "...",
      "col_3_competencia": "...",
      "col_4_resultado_aprendizaje": "RA 1 RECONOCER...",
      "col_5_actividades_aprendizaje_a_desarrollar": "...",
      "col_6_horas_trabajo_directo": 72,
      "col_7_horas_trabajo_independiente": 28,
      "col_8_estrategias_didacticas_activas": "...",
      "col_9_ambiente": "...",
      "col_10_materiales_formacion": "...",
      "col_11_instructores_responsables": "...",
      "col_12_criterios_evaluacion": "...",
      "col_13_descripcion_evidencia_aprendizaje": "...",
      "col_14_observaciones": "..."
    },
    { "rap_id": "RA2", ... },
    { "rap_id": "RA3", ... },
    { "rap_id": "RA4", ... }
  ],
  "totals": {              // NEW · sumas verificación contra fórmulas SUM
    "horas_directas_total": 72,
    "horas_independientes_total": 28
  },
  // metadata + saberes + validation_checks (mantienen v1.0 shape)
  ...
}
```

### REGLA 10 — Multi-RAP DERIVATION RULES

Cuando `pm-1-1.tipo === "Curso Complementario"` y `pm-1-2.rap_origen` declara absorpción multi-RAP (ej: `"absorbe RAP-01 a RAP-04"`), genera **1 row por cada RAP origen** preservando:

- **Cols 1-3 compartidas** (Fase Proyecto · Actividad Proyecto · Competencia): pueden ser idénticas across RAPs si pertenecen al mismo programa SENA
- **Col 4 RAP-specific** (Resultado de Aprendizaje): único per row · texto exacto del SOFÍA Plus
- **Cols 5-14 RAP-specific**: actividades + horas + estrategias + ambientes + evidencias específicas a cada RAP
- **Col 9 (Ambiente)** suele ser **shared** entre RAPs si es el mismo aula bilingüe

### REGLA 11 — Single-RAP fallback (back-compat)

Si `pm-1-2.rap_origen` declara 1 solo RAP · `rows[]` tiene 1 entry · estructura idéntica · sumas R22 = valores únicos.

### REGLA 12 — xlsx render target V04

- Template canon: `master-prompts/canon/GFPI-F-134_V04.xlsx` (empty · 16 KB)
- Output: `runs/<RUN-ID>/pm-3-7-gfpi-f134-matrix.xlsx` (filled V04)
- Renderer: `lib/xlsx_renderer.py::render_gfpi_f134_v04_matrix(pm_3_7_data, template_path, output_path)`
- Population: rows[] del JSON → cells R15+ secuencial · una fila xlsx por RAP

### REGLA 13 — Migration path Vf → V04

Programas que tienen pm-3-7.json v1.0 (Vf shape · single-row):
1. Leer pm-1-2.rap_origen para detectar count RAPs
2. Si single-RAP: migrar formato directo (`format_canon: "Vf"` → `"V04"` · wrap data en `rows[0]`)
3. Si multi-RAP: re-run subagente PM-3.7 v2.0 con LLM (multi-RAP requires creative aggregation)
4. Re-render xlsx con `render_gfpi_f134_v04_matrix()`

### REGLA 14 — Pre-generation checklist v2.0 (extends v1.0)

- [ ] **PASO I · Validar `format_canon` decision** (V04 default · Vf solo si Sergio explicit)
- [ ] **PASO J · Detect multi-RAP from pm-1-2** (`rap_origen` parse "absorbe RAP-XX a RAP-YY")
- [ ] **PASO K · Validate sumas R22** (suma rows[] horas == valor declarado totals)
- [ ] **PASO L · Validate merged cells preserved** (V04 template tiene 48 merged ranges)

### REGLA 15 — Validation checks v2.0 (suma a 12 de v1.0 = 16 checks)

13. **Format canon match** · `format_canon` ∈ {"V04", "Vf"} · default V04
14. **Multi-RAP shape** · `rows[]` array · count > 0 · cada entry tiene 14 cols + rap_id + rap_titulo
15. **Sumas consistency** · `totals.horas_directas_total === sum(rows[].col_6)`
16. **xlsx render target** · template V04 existe + writable + 48 merged ranges preservadas

### Operacional canon — IMARPOR-CC ground truth

Sergio compartió 2026-04-30 plantilla V04 manualmente diligenciada para IMARPOR-CC con:
- 4 RAPs (RA1 + RA2 + RA3 + RA4)
- COMPETENCIA shared: "INTERACTUAR CON OTROS EN IDIOMA EXTRANJERO..."
- Horas directas: 72 (R15) · independientes: 28 (R15) · sumas SUM aplicadas
- Ambiente shared: "Aula convencional bilingüe con adaptaciones..."
- Materiales shared: "Proyector con pantalla grande + tablero..."
- Instructores: "EL PROGRAMA REQUIERE DE UN INSTRUCTOR C..."

Esa plantilla diligenciada es **referencia operacional** para futuros runs · live en `runs/IMARPOR-CC-2026-04-27/pm-3-7-input-V04-authoritative.xlsx`.

---

*PM-3.7 v2.0 · escrito 2026-04-30 (canon V04 oficial SENA · multi-RAP · IMARPOR-CC ground truth)*
*Bumps: master prompt PM-3.7 v1.0 → v2.0 · pm-3-7.json schema v1.0 → v2.0 · template canon Vf → V04*
