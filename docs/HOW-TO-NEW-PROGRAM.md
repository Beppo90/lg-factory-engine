# HOW TO · Instanciar un programa SENA nuevo en el sistema FPI

> Reemplaza al template legacy `PM-1x — Program Configuration Template.md` (DEPRECATED 2026-05-07). Single source of truth para arrancar programas nuevos post paradigm shift PM-0.0 v2.0 + Mejoras #3+#4 PM-0 v3.4.1.

---

## TL;DR · 3 pasos del cero al primer run

1. **Llenar form web** (`apps/input-form/` en english-engine-lab) → genera `pm-0-0-input.json` + `pm-1-1-input.json` validados contra `form-schema-pm0-pm11.json`
2. **Ejecutar pipeline** Phase 0 → Phase 4 con skills `fpi-sena-fase{1,2,3}` (Claude Desktop + master-prompts canon vigente)
3. **Validar outputs** contra `v4/schemas/` con `tests/regression/test-canon` + `test-phase0` + `test-drift`

---

## Prerequisites

| Asset | Path | Versión vigente |
|---|---|---|
| Form web | `english-engine-lab/apps/input-form/` | live |
| Schema input form | `form-schema-pm0-pm11.json` (root fpi-sena-factory) | v3.0 |
| Skills Claude Desktop | `.claude/skills/fpi-sena-fase{1,2,3}/` | activas |
| Master prompts canon | `master-prompts/` | DM v3.29 · PM-0.0 v2.3 · PM-0 v3.4.1 · PM-1.1 v2.9 · PM-1.2 v4.3.1 |
| Schemas validables | `v4/schemas/` | v3.4 (pm-0-context) · v4.3.1 (pm-1-2) · v3.4 (activity-card) |
| Engine Python deployed | `beppo-app.online` | productivo |

---

## Pipeline overview · 4 phases · output canónico por phase

```
Phase 0 · pm-0-0-input.json     (form web)
         ├─ PM-0.0  →  pm-0-0-matriz-alineada-G<N>.json   (1 per guía · si multi-guía)
         └─ PM-0    →  pm-0-context.json

Phase 1 · pm-1-1-input.json     (form web)
         ├─ PM-1.1  →  pm-1-1.json
         └─ PM-1.2  →  pm-1-2.json

Phase 2 · skill fpi-sena-fase2 (orquestador + 4 mecánicos + 7 creativos-con-gate)
         └─ PM-2.0..2.10 + 2.11  →  pm-2-X.json (Activity Cards v3.x · GFPI-F-134 V04 rows)

Phase 3 · skill fpi-sena-fase3
         └─ PM-3.1..3.6  →  pm-3-X.json + .docx (Playbook + GFPI-F-135)

Phase 4 ·
         └─ PM-4.1 + PM-4.2  →  pm-4-X.json (Instrumentos + Quiz)
```

Cada output downstream consume outputs upstream de su phase y phases anteriores. Trazabilidad explícita via fields `_pm00_matriz_ref`, `_pm0_context_ref`, `_pm11_ref`, `_pm12_ref`.

---

## Step-by-step · arrancar programa nuevo

### Paso 1 · Llenar form web Sección A (Identificación + PM-0 anchors)

Abrir `apps/input-form/` (desplegado en english-engine-lab) y completar:

- **Identificación SENA:** programa, ficha, tipo (`Técnico` / `Tecnológico` / `Curso Especial` / `Curso Complementario`), CEFR range
- **Distribución guías:** `total_guias`, `regla_bloques` (`alineacion_1a1` / `absorcion_Na1` / `desdoblamiento_1aN` / `alineacion_NaM`)
- **Competencias técnicas anchor:** uno o más códigos SENA (multi-comp permitido v2.0+)
- **Universo narrativo:** sector, escenario laboral, personajes recurrentes
- **Proyecto formativo articulador** (Técnico/Tecnológico) **o** `final_mission_scenario` (Curso Especial/Complementario, condicional)

**Output:** `pm-0-0-input.json` (Phase 0 input · validado contra schema canon).

### Paso 2 · Llenar form web Sección B (PM-1.1 input per-guía)

Una sub-instancia del form por guía (si multi-guía). Captura:

- `guia_numero`, `guia_subnivel_cefr` (A1.1 → B1.2)
- `modo_informacion` (`MODO 1 — Diseño Curricular SOFÍA Plus` o `MODO 2 — Información Externa (Instructor)`)
- Datos modo 1 o modo 2 según corresponda (saberes conceptuales/proceso, criterios evaluación, etc.)
- `final_mission_scenario` si tipo ∈ {Curso Especial, Curso Complementario}

**Output:** `pm-1-1-input.json` (Phase 1 input).

### Paso 3 · Ejecutar Phase 0 · Matriz Pedagógica Alineadora

```
Skill fpi-sena-fase1 + master-prompts/PM-0.0 — Matriz Pedagógica Alineadora.md (v2.3)

Input:    pm-0-0-input.json
Output:   pm-0-0-matriz-alineada-G<N>.json    (1 per guía)
          pm-0-0-matrices-G1-G2-...-CONSOLIDADO.html  (dashboard)
```

**Validation:** PM-0.0 v2.3 emite 12-15 `validation_checks` (12 G1, 13 G2+, 15 multi-comp) · todos deben ser `PASS`. Ejecutar `make test-phase0` post-generation.

**Si multi-guía + última guía:** la matriz debe emitir `_cobertura_total_programa` (REGLA 13.3 PM-0).
**Si multi-guía:** debe emitir `raps_count_total_programa` (REGLA 13.6).

### Paso 4 · Ejecutar Phase 1 · CEFR Framework + Routes

```
PM-0   (master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md v3.4.1)
       Input:    pm-0-0-matriz-alineada-G<N>.json + pm-0-0-input.json
       Output:   pm-0-context.json    (1 per guía · 31 fields top-level)

PM-1.1 (master-prompts/PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md v2.9)
       Input:    pm-1-1-input.json + pm-0-context.json
       Output:   pm-1-1.json

PM-1.2 (master-prompts/PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md v4.3.1)
       Input:    pm-1-1.json + upstream
       Output:   pm-1-2.json    (sub_bloques_tripartitos[] · 1 APERTURA + N APROPIACIÓN + 1 TRANSFERENCIA)
```

PM-1.2 v4.3.1 emite `curacion_3_fuentes` (story_a + story_b + dialogue) por cada sub_bloque APROPIACIÓN per RAP de inglés (REGLA 18.1).

### Paso 5 · Ejecutar Phase 2 · Activity Cards (~12 PMs)

```
Skill fpi-sena-fase2 (orquestador · 4 mecánicos + 7 creativos-con-gate)
PM-2.0 → 2.1, 2.2, 2.3..2.10 → 2.11

Input:    pm-1-2.json + upstream
Output:   pm-2-X.json (Activity Cards v3.x · 6-bloque canon)
          pm-2-11.json (GFPI-F-134 V04 rows · 6 filas tripartitas per RAP)
```

Activity Card v3.x canon: 9 fields required (`headline_voc`, `narrativa_bilingue`, `paso_a_paso`, `entregable`, `evidencia`, `activity_footer`, `descripcion_aprendiz`, `criterios_evaluacion`, `numero_actividad`) + opcionales aprendiz-facing (`recursos_aprendiz`, `materiales_aprendiz_inline`, `worksheets_aprendiz_anexo`).

### Paso 6 · Ejecutar Phase 3 · Playbook + Learning Guide

```
Skill fpi-sena-fase3
PM-3.1 (Playbook Outline) → PM-3.2 (Build-Out per sesión) → PM-3.3 (Canva opcional) → PM-3.4 (Workbook opcional) → PM-3.5 (Final Mission) → PM-3.6 (GFPI-F-135 Learning Guide)

Output:   pm-3-X.json + .docx (instructor + aprendiz-facing)
```

PM-3.2 v3.0 paradigm shift 2 capas: **CAPA 1 PEDAGOGICAL ANCHORING** (anclaje §5.x PM-0 + SIOP + UbD + Krashen) + **CAPA 2 PRACTICAL IMPLEMENTATION** (Teacher Talk + timeline + checklist).

### Paso 7 · Ejecutar Phase 4 · Instrumentos + Quiz

```
PM-4.1 (master-prompts/PM-4.1 — Instrumentos de Evaluación Formativa.md v2.7)
       Input:    upstream complete
       Output:   pm-4-1.json (6 instrumentos formales E1-E6)

PM-4.2 (master-prompts/PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md v3.0)
       Output:   pm-4-2.json (Quiz S6 consolidado)
```

---

## Ejemplo runtime canónico · INFRATI multi-comp + CIERRE PROGRAMA

Programa `INFRATI-2026-05-04` (canon ground truth post-cluster cascade · ver `runs/INFRATI-2026-05-04/`):

| Aspecto | Valor INFRATI |
|---|---|
| programa.tipo | `Tecnológico` |
| programa.total_guias | `3` |
| programa.regla_bloques | `alineacion_1a1` |
| _competencias_tecnicas_modo | `multi-comp` |
| _n_competencias_tecnicas | `2` |
| _competencias_tecnicas_codigos | `["220501086", "220501103"]` |
| Sector | TIC · empresa ficticia UraNet |
| Distribución | Split B canon por complejidad pedagógica · G1=RA6+RA3 receptivo · G2=RA2+RA4 productivo · **G3=RA1+RA5 argumentativo+reflexivo CIERRE** |
| Cobertura G3 (CIERRE) | 100% procesos + saberes + criterios · target ≥90% cumplido con holgura |

Outputs verificables en `runs/INFRATI-2026-05-04/`:
- `pm-0-0-matriz-alineada-G1.json` · 15/15 validation_checks PASS · multi-comp anclaje
- `pm-0-0-matriz-alineada-G2.json` · 15/15 PASS · cross-cascade desde G1
- `pm-0-0-matriz-alineada-G3.json` · 15/15 PASS · CIERRE PROGRAMA (`_cobertura_total_programa` emitido · `cierre_programa: true`)
- `pm-0-context.json` · v3.4 · `_competencias_tecnicas_modo: multi-comp` heredado · `_position_programa.es_intermedia: false` (G3 final)

**Por qué INFRATI es buen ejemplo:**
- Multi-comp técnica (N≥2) · activa REGLA 13.2 + condicional schema #1 multi-comp en `pm-0-context.schema.json` v3.4
- Multi-guía con CIERRE PROGRAMA · activa REGLA 13.3 + condicional schema #3 (cierre_programa) + REGLA 14.7 (`_position_programa`)
- Cross-cascade G1 → G2 → G3 con `_deuda_explicita_para_guia_siguiente`
- 18 saberes cross-comp (anclan a 2 competencias simultáneamente)

Si tu programa es single-comp single-guía (caso simple), **IMARPOR-CC-2026-04-30-V2** es el ejemplo más cercano (Curso Complementario · 1 guía · 4 RAPs absorbidos canon `absorcion_Na1`).

---

## Validation post-pipeline

### Tests automáticos disponibles

```bash
make test-canon       # Activity Cards (Phase 2) vs v4/schemas/
make test-phase0      # PM-0.0 matrices · validation_checks PASS
make test-drift       # F2.8 · 7 checks cross-layer (master ↔ schemas ↔ skill ↔ runtime)
make test-all         # los 3 corren
```

### REGLA 19 pre-flight (obligatorio antes de generar)

Antes de validar/fixar/juzgar JSONs reales, leer en sesión actual los 7 PASOS A-G de canon (master prompts vigentes + golden runs + DM historial + ADRs + specs). Sin esto · anti-patrón "fixes inventados sin canon" (caso IMARPOR-rework-2026-04-25 documentado en memoria).

### Anti-patrón #19 · 7-item checklist post-bump

Si bumpás un master prompt durante el run, ejecutar checklist 7-item (ver PM-0.0 v2.3 §ANTI-PATRÓN #19) PASS/FAIL antes de cerrar sesión.

---

## Troubleshooting · casos comunes

### Mi `pm-0-0-input.json` falla validación schema

Verificar contra `form-schema-pm0-pm11.json` (root fpi-sena-factory). Errores comunes:
- `tipo` no es uno de los 4 valores canon (`Técnico`, `Tecnológico`, `Curso Especial`, `Curso Complementario`)
- `regla_bloques` no es uno de los 4 patrones canon
- Programa con dígitos en nombre (ej. `INGBAS1-AGRO`) requiere regex `run-id v3` permisiva (`v4/schemas/common/run-id.schema.json`)

### `validation_checks` matriz PM-0.0 reporta FAIL

Cada check tiene `name` + `evidence` + `status`. Buscar el primer FAIL · su `evidence` indica el gap canon. Patterns frecuentes:
- Cobertura procesos/saberes < 80% (REGLA F4) → enriquecer matriz con saberes faltantes
- Personajes nominados > 0 (REGLA F6) → eliminar nombres propios · usar solo roles funcionales

### Multi-comp programa: schema field `competencias[]` ausente

Solo PM-0.0 v2.0+ emite `competencias[]`. Verificar versión master prompt. `_n_competencias_tecnicas: 1` es válido para single-comp legacy · `_n_competencias_tecnicas: 2+` requiere `competencias[]` array y `_competencias_tecnicas_modo: multi-comp`.

### Runtime fixture legacy NO valida contra schema vigente

Esperado si fixture pre-canon. Decisión Sergio canon 2026-05-06: "**ground truth pedagógico legacy · regenerable on-demand cuando programas se re-ejecuten · NO regenerar solo por verde cosmético**". Aceptar como deuda informativa hasta que el programa se re-ejecute organically.

---

## References canon

| Tema | Path |
|---|---|
| DM (decision log + jerarquía canónica) | `master-prompts/DOCUMENTO MAESTRO ...md` v3.29 |
| Anti-patrones documentados | DM §ANTI-PATRONES + memory snapshots `feedback_*.md` |
| Auditor anti-drift 6-pasos | memory `feedback_pm00_v21_post_audit_3_high.md` |
| Disciplina bumps incrementales 3-iter | memory `feedback_pm00_v22_segunda_iteracion_med.md` |
| F2.8 schema-drift CI spec | `english-engine-lab/specs/schema-drift.spec.md` (7 checks) |
| Pattern schema replacement con backup legacy | memory `feedback_pattern-schema-replacement-con-backup-legacy.md` |
| Validación bidireccional cross-LLM | memory `project_sesion-2026-05-06-snapshot.md` |
| Skill fpi-sena-fase2 (Phase 2 orquestador) | `.claude/skills/fpi-sena-fase2/` (13 subagentes) |

---

## Migration de PM-1x template legacy

Si tenés un `PM-1.[código] — [Programa].md` instanciado del template legacy:

1. **Conservar el archivo** como referencia histórica
2. **Re-instanciar via form web** (Pasos 1-2 de este HOW-TO)
3. **Comparar outputs JSON** con el template legacy (identificación, universo, personajes deben matchear)
4. **Re-ejecutar pipeline** desde Phase 0 con outputs JSON canon

Las references cross-master a "PM-1.x correspondiente" (PM-0, PM-3.2, PM-4.1) son semánticamente compatibles · refieren a "info propia de cada programa" cuyo storage migró de markdown template a JSON canon (`pm-0-context.json` + `pm-1-1.json` + `pm-1-2.json`).

---

*HOW-TO-NEW-PROGRAM v1.0 · 2026-05-07 · Reemplaza PM-1x template legacy DEPRECATED · Sergio Cortés Perdomo*
