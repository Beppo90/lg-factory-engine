---
title: AUDIT DOC · Schemas downstream sub-tasks 2+3+4 · field-by-field para CC sync
from: Cowork
to: Claude Code
date_generated: 2026-05-06
trigger: HANDOFF-2026-05-05-v2 §4.2 sub-tasks 2-4 · CC esperaba audit Cowork antes de invertir tiempo en drift subjetivo
status: ready_to_consume
related_branch: feature/hito-3-fase-b-test-drift-completo (CC)
---

# AUDIT DOC · 3 schemas downstream · field-by-field

> **Lee ESTO antes de arrancar sub-tasks 2/3/4.** Este doc traduce master prompts vigentes en specs schema-by-schema · field-by-field. Cada sub-task tiene **estrategia recomendada (Camino A/B/C)** · **inventario fields canon** · **action items CC**.

---

## 0. Patrón canon vigente cross-schema

Las 3 sub-tasks comparten misma situación post-cluster cascade + Mejoras #3+#4:

| Schema | Versión schema | Versión master vigente | Gap |
|--------|----------------|------------------------|-----|
| `pm-1-2.schema.json` | v4.0 (2026-04-26) | PM-1.2 v4.3.1 (2026-05-04) | 4 versiones · paradigm shift v4.2 + REGLA 18 v4.3 |
| `common/activity-card.schema.json` | v2.7 (2026-04-21) | AC v3.4 (2026-05-03) | 7 versiones · 5 paradigm shifts |
| `gfpi-f-134-row.schema.json` | NO EXISTE | PM-2.11 v3.3 V04 (2026-05-02) | crear from scratch |

**Recomendación arquitectónica unificada:** aplicar **Pattern canon "schema replacement con backup legacy"** (canonizado en Mejora #4) a las 3 sub-tasks · NO patch in-place.

Pasos canon por schema:
1. Backup legacy con sufijo descriptivo (`*.legacy-vX.Y-pre-<event>`)
2. Schema NEW from scratch desde master vigente
3. Validación sintáctica metaschema 2020-12
4. Validación operacional contra runtime real (IMARPOR-V2)
5. Wrapper script si aplica
6. Memory snapshot + DM bump

---

## 1. SUB-TASK 2 · `pm-1-2.schema.json` v4.0 → v4.3.1

### 1.1 Status del schema actual

```jsonc
{
  "_status": "PARTIAL-CANON-NEEDS-REVALIDATION",   // schema lo ADMITE
  "_warning": "fue derivado parcialmente del canon ... NO ha sido re-validado contra el canon completo del pipeline post-v4.1",
  "_re_derive_pending": true
}
```

**Schema actual self-declares stale.** Validación es safe replacement.

### 1.2 Master canon vigente · 19 reglas

| REGLAS canon | Status schema actual | Acción |
|--------------|---------------------|--------|
| REGLAS 1-9 (v2.6 base · DNA + curación + integrative + evaluation) | parcialmente cubiertas (estructura flat legacy) | reescribir bajo nueva arquitectura tripartita |
| **REGLA 10 + 11 (v4.2 · scope diferenciado tipo_bloque)** | ❌ ausente | NEW · 3 schemas distintos APERTURA / APROPIACIÓN / TRANSFERENCIA |
| **REGLA 12 (v4.2 · `_anclaje_matriz` heredado)** | ❌ ausente | NEW · obligatorio cada sub_bloque |
| REGLAS 13-17 (v4.2 · libertad LLM + validation + estructura output v4.2) | ❌ ausente | reescribir |
| **REGLA 18 NEW v4.3 · curación 3 fuentes per RAP cross-comp** | ❌ ausente | NEW · sub-reglas 18.1-18.6 + validation_check 7 |

### 1.3 Estructura runtime canon (ground truth IMARPOR-V2)

23 top-level keys observados:

```jsonc
{
  // Metadata core (10 fields)
  "pm_id": "PM-1.2", "pm_name": "...", "pm_version": "4.3.1",
  "pm_iteration": "...", "run_id": "IMARPOR-CC-2026-04-30-V2",
  "generated_date": "2026-05-01", "instructor": "...",

  // Trazabilidad upstream (4 fields NEW v4.2)
  "_pm11_ref": "...", "_pm00_matriz_ref": "...",
  "_pm0_context_ref": "...", "_pm12_input_ref": "...",
  "_correction_applied": "...", "_canon_authority": "...",

  // Estructura tripartita CORE (REGLA 10/11 v4.2)
  "meta_bloque_presentacion_l1": { /* APERTURA encuadre L1 · 9 sub-keys */ },
  "sub_bloques_tripartitos": [ /* Array de 6 sub_bloques · 1 APERTURA + 4 APROPIACIÓN + 1 TRANSFERENCIA */ ],

  // Validation + audit (5 fields)
  "validation_checks": [ /* 6 checks v4.2 + check 7 NEW v4.3 */ ],
  "_anti_drift_audit_v2": { /* drift detection */ },
  "_decisiones_libertad_llm_aplicadas": [...],
  "_limites_canon_aplicados_estrictos": [...],
  "_audit": { /* input_sources + version_history */ },

  // Heredancia downstream
  "downstream_consumers": [...],
  "enriched": true,
  "_block_downstream": false,

  // Multi-comp + multi-guía heredados (NEW v4.3 condicional)
  // "_split_strategy_heredado": {...},   // si guide_total > 1
  // "_raps_metadata": {...},              // si guide_total > 1
}
```

### 1.4 Schema diferenciado por `tipo_bloque` (REGLA 11 v4.2)

Cada sub_bloque tiene estructura distinta según `tipo_bloque`:

#### APERTURA (B0)
```jsonc
{
  "tipo_bloque": "APERTURA",
  "rap_ingles": null,                  // NO tiene RAP target (motivacional)
  "scope": "motivacional + diagnóstico + activación previos",
  "_anclaje_matriz": { "raps_que_atraviesa": [...] },
  // NO tiene curacion_3_fuentes (REGLA 18.4)
  // NO produces_evidencia_formal (REGLA 7 PM-1.1 v2.8)
  "_produces_evidencia": null
}
```

#### APROPIACIÓN (B1..Bn-1)
```jsonc
{
  "tipo_bloque": "APROPIACIÓN",
  "rap_ingles": "RA1",                 // 1:1 con RAP de inglés
  "_anclaje_matriz": {
    "rap_target": "RA1",
    "competencias_tecnicas": ["220501086", "220501103"]   // si multi-comp
  },
  "curacion_3_fuentes": {              // OBLIGATORIO REGLA 18.1
    "story_a": {
      "titulo": "...", "tipo": "reading anchor", "fuente": "...",
      "_anclaje_tecnico_competencia": ["220501086", "220501103"],   // NEW v4.3 si multi-comp
      "_anclaje_matriz": { "saberes_que_modela": [...], "criterios_que_evalua": [...] },
      "_produces_evidencia": "E1"
    },
    "story_b": { /* idem · listening anchor · _produces_evidencia: "E3" */ },
    "dialogue": { /* idem · speaking anchor · _produces_evidencia: "E4" */ }
  },
  "_produces_evidencia": ["E1", "E2", "E3", "E4", "E5", "E6"]   // según RAP target
}
```

#### TRANSFERENCIA (Bn)
```jsonc
{
  "tipo_bloque": "TRANSFERENCIA",
  "rap_ingles": null,                  // BT scope ABP capstone
  "scope": "mission brief + 5 sub-fases ABP",
  "_anclaje_matriz": {
    "raps_que_atraviesa": [...],
    "cierre_programa": false,          // true si CIERRE PROGRAMA (REGLA 13.3 PM-0)
    "competencias_tecnicas_integradas": [...]   // si CIERRE + multi-comp
  },
  // NO tiene curacion_3_fuentes
  "_produces_evidencia": null          // Misión es transferencia · NO evidencia formal
}
```

### 1.5 Conditional schemas requeridos (allOf if-then)

| # | Trigger | Then required |
|---|---------|---------------|
| 1 | `tipo_bloque === "APROPIACIÓN"` | `curacion_3_fuentes` con story_a + story_b + dialogue |
| 2 | `tipo_bloque ∈ {"APERTURA", "TRANSFERENCIA"}` | `curacion_3_fuentes` MUST be absent (REGLA 18.4) |
| 3 | matriz upstream multi-comp (heredado pm-0-context._competencias_tecnicas_modo === "multi-comp") | cada fuente declara `_anclaje_tecnico_competencia[]` minItems 1 |
| 4 | `programa.total_guias > 1` (heredado) | top-level `_split_strategy_heredado` + `_raps_metadata` requeridos |
| 5 | `tipo_bloque === "TRANSFERENCIA"` AND multi-comp AND CIERRE | `_anclaje_matriz.competencias_tecnicas_integradas` minItems N |

### 1.6 Validation checks · 7 checks bloqueantes (vs 6 actuales schema v4.0)

```jsonc
"validation_checks": [
  {"id": 1, "name": "pm11_ref_valid"},
  {"id": 2, "name": "tripartita_structure_complete"},
  {"id": 3, "name": "anclaje_matriz_complete"},
  {"id": 4, "name": "no_duplication_pm11"},
  {"id": 5, "name": "produces_evidencia_canon"},
  {"id": 6, "name": "anti_copia_fantasma"},
  {"id": 7, "name": "curacion_per_rap_canonica"}    // NEW v4.3 BLOQUEANTE
]
```

### 1.7 Action items CC sub-task 2

1. **Backup legacy:** `pm-1-2.schema.json` → `pm-1-2.schema.json.legacy-v4-pre-paradigm-tripartita`
2. **Schema NEW v4.3.1 from scratch:**
   - 23 top-level fields
   - `sub_bloques_tripartitos` como array con discriminator `tipo_bloque` (3 schemas distintos via oneOf/if-then)
   - 5 conditional schemas listados §1.5
   - 7 validation_checks enum
3. **Validar contra runtime IMARPOR-V2:** `runs/IMARPOR-CC-2026-04-30-V2/pm-1-2.json` (single-comp legacy · 4 sub_bloques APROPIACIÓN)
4. **Validar contra runtime INFRATI G2 (cuando exista pm-1-2):** multi-comp · 2 sub_bloques APROPIACIÓN · cross-comp `_anclaje_tecnico_competencia` poblado
5. **Coordinar con CC F2.8 Check 6:** después del bump · F2.8 NO debe marcar drift entre PM-1.2 master v4.3.1 + schema v4.3.1

**Cross-references master canon:**
- `master-prompts/PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md` líneas 280-465 (REGLAS 1-9 base) + 463-1100 (REGLA 10-17 v4.2) + 863-1163 (REGLA 18 v4.3)
- `master-prompts/DOCUMENTO MAESTRO ...md` v3.28 entradas v3.24 + v3.25 (PM-1.2 v4.3 + v4.3.1)
- Runtime ground truth: `runs/IMARPOR-CC-2026-04-30-V2/pm-1-2.json` (23 keys verificados)

**Estimación CC:** ~1.5h (más del estimado original 30min · gap es paradigm shift completo · NO incremental)

---

## 2. SUB-TASK 3 · `common/activity-card.schema.json` v2.7 → v3.4

### 2.1 Status del schema actual

Schema documenta "Canon 6 Bloques v2.7" · 7 fields required · estructura: `activity_id` + `headline_voc` + `narrativa_bilingue` + `paso_a_paso` + `entregable` + `evidencia` + `activity_footer`.

**Drift de 7 versiones · 5 paradigm shifts cumulative.**

### 2.2 Bumps cumulative AC v2.7 → v3.4

| Versión | Cambios | Status schema |
|---------|---------|---------------|
| **v3.0** (2026-05-02) | Activity Card v3.0 según canon Sergio · UNA dimensión por card · descripcion multi-párrafo 200-600 palabras patrón panorama→orientación→equipos→práctica→cierre · `material_apoyo[]` array · `evidencia.nombre` · `numero_actividad` acumulado | ❌ ausente |
| **v3.1** (2026-05-02) | NEW campo OBLIGATORIO `criterios_evaluacion[]` · alimenta tabla Sec 4 PM-3.6 GFPI-F-135 | ❌ ausente |
| **v3.2** (2026-05-02) | NEW campos OBLIGATORIOS `descripcion_aprendiz` (80-150 palabras canon SENA · tono impersonal) + `recursos_aprendiz[]` (bullets tangibles · paradigm fix instructor-facing → aprendiz-facing) | ❌ ausente |
| **v3.3** (2026-05-03) | PARADIGM SHIFT recursos diseño vs materiales aprendiz · DEPRECATION SOFT `recursos_aprendiz[]` (migra a PM-3.2 Playbook) · NEW `materiales_aprendiz_inline[]` (scaffolds cortos embebibles) + `worksheets_aprendiz_anexo[]` (recursos largos · render como ANEXO) | ❌ ausente |
| **v3.4** (2026-05-03) | NEW campo OPCIONAL `_anclaje_pedagogico_pm0_pre_pm32` · hook PM-3.2 v3.0 capa 1 (PEDAGOGICAL ANCHORING) · 4 sub-fields: `principios_pm0_pre[]` + `siop_components_pre[]` + `ubd_stage_pre` + `krashen_input_pre` | ❌ ausente |

### 2.3 Schema NEW v3.4 · campos obligatorios + opcionales

```jsonc
{
  "type": "object",
  "required": [
    "activity_id",
    "headline_voc",                       // v2.7 (preserved)
    "narrativa_bilingue",                 // v2.7 (preserved · ES + EN)
    "paso_a_paso",                        // v2.7 (preserved · 3-10 items)
    "entregable",                         // v2.7 (preserved)
    "evidencia",                          // v2.7 (preserved · ahora con nombre v3.0)
    "activity_footer",                    // v2.7 (preserved)
    "descripcion_aprendiz",               // NEW v3.2 OBLIGATORIO
    "recursos_aprendiz",                  // NEW v3.2 (DEPRECATION SOFT v3.3 · mantener required hasta migración Playbook)
    "criterios_evaluacion",               // NEW v3.1 OBLIGATORIO
    "numero_actividad"                    // NEW v3.0 acumulado
  ],
  "properties": {
    // ... v2.7 preserved fields ...

    "descripcion_aprendiz": {
      "type": "string",
      "minLength": 400,                   // ~80 palabras
      "maxLength": 1200,                  // ~150 palabras
      "description": "Canon SENA · tono impersonal · cero personajes · arquetipos visibles · paradigm fix aprendiz-facing"
    },
    "recursos_aprendiz": {
      "type": "array",
      "items": { "type": "string" },
      "description": "DEPRECATION SOFT v3.3 · bullets tangibles preparados por instructor · migra a PM-3.2 Playbook · mantener required hasta cierre migración"
    },
    "criterios_evaluacion": {             // NEW v3.1
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["criterio", "indicador"],
        "properties": {
          "criterio": { "type": "string", "minLength": 10 },
          "indicador": { "type": "string", "minLength": 10 }
        }
      },
      "description": "Alimenta tabla Sección 4 PM-3.6 GFPI-F-135"
    },
    "numero_actividad": {                 // NEW v3.0
      "type": "string",
      "pattern": "^[0-9]+(\\.[0-9]+)?$",
      "description": "Numeración acumulada cross-sesión (ej. 1, 2, 3.1, 3.2, ...)"
    },
    "material_apoyo": {                   // NEW v3.0 OPCIONAL
      "type": "array",
      "items": { "type": "string" }
    },
    "materiales_aprendiz_inline": {       // NEW v3.3 OPCIONAL
      "type": "array",
      "items": {
        "type": "object",
        "required": ["tipo", "contenido"],
        "properties": {
          "tipo": { "type": "string", "enum": ["pregunta_reflexiva", "kwl_bilingue", "checklist", "plantilla_1_cuadrante"] },
          "contenido": { "type": "string", "minLength": 20 }
        }
      },
      "description": "Scaffolds cortos embebibles después de Descripción"
    },
    "worksheets_aprendiz_anexo": {        // NEW v3.3 OPCIONAL
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id_anexo", "titulo", "tipo_recurso", "contenido_renderizable", "cardinality"],
        "properties": {
          "id_anexo": { "type": "string", "pattern": "^A[0-9]+$" },
          "titulo": { "type": "string" },
          "titulo_en": { "type": "string" },
          "tipo_recurso": { "type": "string", "enum": ["template_blank", "catalogo", "texto_paralelo", "diagrama", "rúbrica", "otro"] },
          "contenido_renderizable": { "type": "string", "minLength": 50 },
          "cardinality": { "type": "string", "enum": ["1_por_aprendiz", "1_por_equipo", "1_por_clase"] }
        }
      },
      "description": "Recursos largos · render como ANEXO numerado · referenciado desde la actividad"
    },
    "_anclaje_pedagogico_pm0_pre_pm32": {  // NEW v3.4 OPCIONAL
      "type": "object",
      "description": "Hook PM-3.2 v3.0 capa 1 PEDAGOGICAL ANCHORING · pre-anclaje · evita doble carga subagente PM-3.2",
      "properties": {
        "principios_pm0_pre": {
          "type": "array",
          "items": { "type": "string", "pattern": "^§5\\.[0-9]+(\\.[0-9]+)?$" }
        },
        "siop_components_pre": {
          "type": "array",
          "items": { "type": "string", "enum": ["lesson_preparation", "building_background", "comprehensible_input", "strategies", "interaction", "practice_application", "lesson_delivery", "review_assessment"] }
        },
        "ubd_stage_pre": {
          "type": "string",
          "enum": ["Stage1_Desired_Results", "Stage2_Evidence", "Stage3_Learning_Plan"]
        },
        "krashen_input_pre": {
          "type": "string",
          "minLength": 30,
          "description": "i+1 brief"
        }
      }
    },
    "_anclaje_tecnico_competencia": {      // OPCIONAL · heredado de PM-1.2 v4.3 cuando multi-comp
      "type": "array",
      "items": { "type": "string", "pattern": "^[0-9]{9}$" },
      "description": "Códigos competencias técnicas que la actividad moviliza · heredado upstream pm-1-2"
    }
  }
}
```

### 2.4 Action items CC sub-task 3

1. **Backup legacy:** `activity-card.schema.json` → `activity-card.schema.json.legacy-v2.7-pre-aprendiz-facing`
2. **Schema NEW v3.4 from scratch** · 7 fields v2.7 preserved + 8 fields NEW (4 required + 4 optional)
3. **Validar contra runtime IMARPOR-V2:** `runs/IMARPOR-CC-2026-04-30-V2/pm-2-*.json` (30 ACs)
4. **Validar field-by-field con grep al runtime:**
   - `descripcion_aprendiz` presente en 30/30 cards (post-Wave E preview-fix)
   - `recursos_aprendiz` presente en 30/30 cards (post-Wave E preview-fix-v2)
   - `criterios_evaluacion` presente en 30/30 cards (post-Wave B regenerar)
5. **DEPRECATION SOFT documentation:** `recursos_aprendiz` marcado como deprecation_soft en field description · NO eliminar required hasta migración Playbook completa

**Cross-references master canon:**
- `master-prompts/Activity Card — Schema.md` (1800 líneas · canon completo · v3.4 frontmatter)
- `master-prompts/DOCUMENTO MAESTRO ...md` v3.14 + v3.15 (canonización Nivel 2 reducido AC v3.2 + paradigm shift PM-3.2 v3.0)
- Runtime ground truth: `runs/IMARPOR-CC-2026-04-30-V2/pm-2-*.json` (post-Wave E)

**Estimación CC:** ~1h (incremental complejo · 8 fields NEW · 4 conditional schemas para multi-comp + materials + anchoring)

---

## 3. SUB-TASK 4 · `gfpi-f-134-row.schema.json` CREATE FROM SCRATCH

### 3.1 Status

Schema **NO existe** en `v4/schemas/`. Crear desde cero basado en:
- Master: `master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` v3.3 (2026-05-02 · Wave 5.D)
- Data contract: `master-prompts/GFPI-F-134 — Data Contract.md` v2.0
- Runtime ground truth: `runs/IMARPOR-CC-2026-04-30-V2/pm-2-11.json` (`gfpi_f134_v04_rows` array de 6 filas tripartitas)

### 3.2 Estructura runtime canon V04

PM-2.11 v3.3 emite 6 filas tripartitas (1 APERTURA + 4 APROPIACIÓN + 1 TRANSFERENCIA) en `gfpi_f134_v04_rows[]`. Cada fila tiene 24 fields:

```jsonc
{
  "_orden": 1,
  "_bloque_id": "B0_APERTURA",
  "_tipo_bloque": "APERTURA",            // enum 3 valores
  "_sub_bloque_titulo": "Encuadre + Diagnóstico",
  "_sesiones_anchor": ["S1", "S2"],
  "_cefr_subnivel": "A1.2",
  "_anclaje_matriz_bloque_heredado": {
    "raps_que_atraviesa": [...],
    "competencias_tecnicas": [...]       // si multi-comp
  },

  // GFPI-F-134 oficial columnas (15 columns C1-C15)
  "C1_competencia": "string",
  "C2_rap": "string",
  "C4_saberes_conceptos": ["array"],     // C3 NOT emitted (heredado de C2)
  "C5_saberes_proceso": ["array"],
  "C6_criterios_evaluacion": ["array"],
  "C7_actividades_aprendizaje": [...],   // V+O+C plantilla canon Sergio
  "_C7_total": 5,                        // contador fila (NEW v3.1)
  "C8_horas_directo": 8,
  "C9_horas_independiente": 4,
  "C10_evidencias": [...],               // 3 líneas plantilla canon
  "_C10_total": 6,                       // contador fila
  "C11_estrategias_didacticas": [...],   // por actividad (NEW v3.1)
  "C12_ambiente": "string",
  "C13_materiales_formacion": "string",
  "C14_instructores_responsables": "string",
  "C15_observaciones": "string",

  // Trazabilidad downstream (NEW v3.3)
  "_criterios_por_actividad_bloque": [...]
}
```

### 3.3 Schema NEW from scratch · estructura

```jsonc
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "fpi-sena-factory/v4/schemas/gfpi-f-134-row.schema.json",
  "title": "GFPI-F-134 Row · Canon V04 · 6 filas tripartitas",
  "description": "Canon V04 oficial SENA · multi-RAP rows · agrupación tripartita por sub_bloque · emitido por PM-2.11 v3.3 Row Assembler · consumido por PM-3.7 V04 (xlsx renderer) · cada fila representa 1 sub_bloque pedagógico (APERTURA · APROPIACIÓN per RAP · TRANSFERENCIA)",
  "type": "object",
  "required": [
    "_orden", "_bloque_id", "_tipo_bloque", "_sub_bloque_titulo",
    "_sesiones_anchor", "_cefr_subnivel", "_anclaje_matriz_bloque_heredado",
    "C1_competencia", "C2_rap",
    "C4_saberes_conceptos", "C5_saberes_proceso", "C6_criterios_evaluacion",
    "C7_actividades_aprendizaje", "_C7_total",
    "C8_horas_directo", "C9_horas_independiente",
    "C10_evidencias", "_C10_total",
    "C11_estrategias_didacticas",
    "C12_ambiente", "C13_materiales_formacion",
    "C14_instructores_responsables", "C15_observaciones",
    "_criterios_por_actividad_bloque"
  ],
  "properties": {
    "_orden": { "type": "integer", "minimum": 1 },
    "_bloque_id": { "type": "string", "pattern": "^B[0-9T]_(APERTURA|APROPIACION_RA[0-9]+|TRANSFERENCIA)" },
    "_tipo_bloque": { "type": "string", "enum": ["APERTURA", "APROPIACIÓN", "TRANSFERENCIA"] },
    "_sub_bloque_titulo": { "type": "string", "minLength": 5 },
    "_sesiones_anchor": {
      "type": "array",
      "items": { "type": "string", "pattern": "^S[0-9]+$" },
      "minItems": 1
    },
    "_cefr_subnivel": { "type": "string", "pattern": "^(A1\\.[1-3]|A2\\.[0-2]|B1\\.[0-2])$" },
    "_anclaje_matriz_bloque_heredado": {
      "type": "object",
      "required": ["raps_que_atraviesa"],
      "properties": {
        "raps_que_atraviesa": { "type": "array", "items": { "type": "string", "pattern": "^RA[0-9]+$" } },
        "competencias_tecnicas": { "type": "array", "items": { "type": "string", "pattern": "^[0-9]{9}$" } }
      }
    },
    "C1_competencia": { "type": "string", "minLength": 30 },
    "C2_rap": { "type": "string", "minLength": 30 },
    "C4_saberes_conceptos": { "type": "array", "items": { "type": "string" } },
    "C5_saberes_proceso": { "type": "array", "items": { "type": "string" } },
    "C6_criterios_evaluacion": { "type": "array", "items": { "type": "string" } },
    "C7_actividades_aprendizaje": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["numero", "verbo_obj_cond"],
        "properties": {
          "numero": { "type": "string" },
          "verbo_obj_cond": { "type": "string", "minLength": 20 }
        }
      },
      "description": "Plantilla canon Sergio C7 V+O+C · 1 línea por actividad"
    },
    "_C7_total": { "type": "integer", "minimum": 0 },
    "C8_horas_directo": { "type": "number", "minimum": 0 },
    "C9_horas_independiente": { "type": "number", "minimum": 0 },
    "C10_evidencias": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["evidencia_id", "instrumento", "linea_3"],
        "properties": {
          "evidencia_id": { "type": "string", "pattern": "^E[1-6]|EMision$" },
          "instrumento": { "type": "string" },
          "linea_3": { "type": "string", "minLength": 10 }
        }
      },
      "description": "Plantilla canon Sergio C10 · 3 líneas por evidencia"
    },
    "_C10_total": { "type": "integer", "minimum": 0 },
    "C11_estrategias_didacticas": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["actividad_numero", "estrategia"],
        "properties": {
          "actividad_numero": { "type": "string" },
          "estrategia": { "type": "string", "minLength": 20 }
        }
      },
      "description": "Canon NEW v3.1 · estrategia por actividad (NO por bloque)"
    },
    "C12_ambiente": { "type": "string" },
    "C13_materiales_formacion": { "type": "string" },
    "C14_instructores_responsables": { "type": "string" },
    "C15_observaciones": { "type": "string" },
    "_criterios_por_actividad_bloque": {
      "type": "array",
      "items": { "type": "object" },
      "description": "Heredancia mixta criterios per AC desde Wave B regenerar"
    }
  }
}
```

### 3.4 Conditional schemas

| # | Trigger | Then required |
|---|---------|---------------|
| 1 | `_tipo_bloque === "APERTURA"` | `_bloque_id` matches `^B0_APERTURA` |
| 2 | `_tipo_bloque === "APROPIACIÓN"` | `_bloque_id` matches `^B[0-9]+_APROPIACION_RA[0-9]+` · `_anclaje_matriz_bloque_heredado.raps_que_atraviesa` minItems 1 |
| 3 | `_tipo_bloque === "TRANSFERENCIA"` | `_bloque_id` matches `^BT_TRANSFERENCIA` · last `_orden` |
| 4 | multi-comp heredado | `_anclaje_matriz_bloque_heredado.competencias_tecnicas` minItems 2 |

### 3.5 Action items CC sub-task 4

1. **Crear NEW** `v4/schemas/gfpi-f-134-row.schema.json` (NO existe · NO backup)
2. **24 fields top-level** según §3.3
3. **4 conditional schemas** según §3.4
4. **Validar contra runtime IMARPOR-V2:** `runs/IMARPOR-CC-2026-04-30-V2/pm-2-11.json.gfpi_f134_v04_rows[]` (6 filas tripartitas)
5. **Validar 6 filas:** orden = [1,2,3,4,5,6] · tipos = [APERTURA, APROPIACIÓN, APROPIACIÓN, APROPIACIÓN, APROPIACIÓN, TRANSFERENCIA]
6. **Wrapper script opcional** `validate-gfpi-f-134-rows.sh` (mismo pattern que validate-pm-0-context.sh)

**Cross-references master canon:**
- `master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` v3.3 (66KB · Wave 5.D)
- `master-prompts/GFPI-F-134 — Data Contract.md` v2.0
- Runtime ground truth: `runs/IMARPOR-CC-2026-04-30-V2/pm-2-11.json`

**Estimación CC:** ~1.5h (creación from scratch · 24 fields + 4 conditionals · validación contra runtime)

---

## 4. Resumen ejecutivo · plan de ejecución

| Sub-task | Schema | Estrategia | Backup | Estimación | Prioridad |
|----------|--------|------------|--------|------------|-----------|
| 2 | pm-1-2.schema.json | Camino A · replace | sí (`.legacy-v4-pre-paradigm-tripartita`) | ~1.5h | HIGH (Phase 1 · cluster cascade alignment) |
| 3 | activity-card.schema.json | Camino A · replace | sí (`.legacy-v2.7-pre-aprendiz-facing`) | ~1h | HIGH (downstream propagation PM-3.x) |
| 4 | gfpi-f-134-row.schema.json | Crear | n/a | ~1.5h | MED (xlsx renderer canon V04) |

**Total estimado:** ~4h CC trabajo · branch separada · PR review post.

**Pattern canon vigente confirmado:** los 3 sub-tasks aplican el mismo pattern "schema replacement con backup legacy" canonizado en Mejora #4. Documentar en commit messages para coherencia memory.

**Coordinación post-cierre:**
- F2.8 Check 6 NO debe marcar drift entre los 3 master prompts vigentes y los 3 schemas post-bump
- Cowork puede regenerar runtime fixtures (Hito 4 opción e) · 1+ runtime PASS empírico por schema

---

## 5. Cross-references

- **Handoff predecesor:** `handoffs/HANDOFF-2026-05-05-v2.md` §4.2 (sub-tasks 2-4 enumerados)
- **Mejora #4 reference (pattern aplicado):** `audits/VALIDATION-SCHEMA-PM-0-CONTEXT-2026-05-05.md` + `memory/feedback_pm0_schema_v331_canonization.md`
- **Memory snapshot post-bumps esperado:** `memory/feedback_schemas_downstream_sync_<date>.md` (CC genera al cierre)
- **DM bump esperado:** v3.28 → v3.29 con entrada "schemas downstream sync · sub-tasks 2+3+4 cerradas"

---

*AUDIT DOC · sub-tasks 2+3+4 schemas downstream · 2026-05-06 · Sergio Cortés Perdomo · ready_to_consume by CC*
