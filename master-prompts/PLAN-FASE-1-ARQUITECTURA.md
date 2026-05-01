---
title: PLAN-FASE-1-ARQUITECTURA — Phase 1 (Scope) + Phase 0 (Matriz Pedagógica Alineadora)
version: 1.0
last_updated: 2026-05-01
status: NEW · documenta workflow Phase 0+1 post-paradigm shift PM-0.0 (DM v3.0)
canon: Sergio Cortés decisión arquitectónica 2026-05-01
---

# PLAN-FASE-1-ARQUITECTURA · Phase 0 + Phase 1

## Propósito

Documenta el workflow operacional de **Phase 0 (NEW · PM-0.0 Matriz Pedagógica Alineadora)** + **Phase 1 (PM-0 simplificado v3.0 + PM-1.1 + PM-1.2)**. Este plan canoniza el paradigm shift introducido por DM v3.0 (2026-05-01).

---

## §1 · Estado pre-v3.0 (problema identificado)

| Limitación v2.x | Causa | Consecuencia |
|---|---|---|
| Diseño "de adentro hacia afuera" solo en teoría | DM declaraba UbD desde v2.0 pero NO existía mecanismo operacional | Matriz GFPI-F-134 reconstruida retroactivamente en PM-2.11 |
| LLM toma decisiones sin alineación RAP | Phase 1 (PM-0/1.1/1.2) consumía info agregada · NO segmentada | Ambigüedad downstream · cada actividad necesita re-decidir RAP target |
| PM-3.7 V04 multi-RAP rows con título solo | RA2-RA4 sin contenido pedagógico real | GFPI-F-134 V04 oficial NO se llenaba · perdía valor canónico |

---

## §2 · Workflow canon Phase 0 + Phase 1 v3.0

```
┌──────────────────────────────────────────────────────────────┐
│ PHASE 0 · MATRIZ PEDAGÓGICA ALINEADORA                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Form xlsx Sergio (sin cambio mayor)                         │
│  ↓                                                           │
│  STEP 0.1 · Parse form xlsx → pm-0-0-input.json             │
│  ↓                                                           │
│  STEP 0.2 · subagente_pm_0_0_matriz.py (Camino 2 LLM)       │
│            Master prompt PM-0.0 inyectado                    │
│            Toma agregados (saberes/procesos/criterios)       │
│            ALINEA explícitamente por cada RAP                │
│  ↓                                                           │
│  STEP 0.3 · pm-0-0-matriz-alineada.json (output canónico)   │
│            Schema v1.0 · N RAPs dinámico · 7 validation     │
│  ↓                                                           │
│  GATE 0 · Sergio aprueba alineación matriz                  │
│            (puede pedir re-alineación si hay drift)          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ PHASE 1 · SCOPE                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  STEP 1.1 · PM-0 v3.0 (SIMPLIFICADO)                        │
│             Consume pm-0-0-matriz-alineada.json (input)      │
│             Agrega: universo_narrativo + cefr_subnivel +     │
│                    principios_pedagogicos_aplicables          │
│             NO duplica matriz · solo referencia                │
│  ↓                                                           │
│  STEP 1.2 · pm-0-context.json (8 fields min · LLM libertad)  │
│  ↓                                                           │
│  STEP 1.3 · PM-1.1 (Ruta Macrotemática)                     │
│             Consume matriz alineada + pm-0-context           │
│             Construye ruta POR RAP (NO agregada)             │
│             N bloques (regla_bloques: 1a1 / Na1 / 1aN / NaM) │
│  ↓                                                           │
│  STEP 1.4 · pm-1-1.json (bloques + horas + CEFR per bloque)  │
│  ↓                                                           │
│  STEP 1.5 · PM-1.2 (Scope & Sequence)                       │
│             Consume matriz alineada + pm-1-1 + pm-0-context  │
│             Curación fuentes auténticas POR RAP              │
│             Cols 1-5 GFPI-F-134 (heredados de matriz)        │
│  ↓                                                           │
│  STEP 1.6 · pm-1-2.json (scope per guía + universe extended) │
│  ↓                                                           │
│  GATE 1 · Sergio aprueba pm-1-2 · listo para Phase 2         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## §3 · Componentes canon · NEW + actualizados

### §3.1 · NEW · `master-prompts/PM-0.0 — Matriz Pedagógica Alineadora.md`

Master prompt v1.0 · 509 lines · 7 REGLAS canónicas:
- R1: Alineación por verbo cognitivo del RAP
- R2: Cobertura 100% · cero huérfanos
- R3: Overlaps permitidos · documentados
- R4: Verbatim RAPs · NO paráfrasis
- R5: Rationale pedagógico 50-200 words por RAP
- R6: Orden pedagógico respetado (NO reordenar)
- R7: Dynamic RAP count (1-10+) · NO hardcoded

7 validation_checks bloqueantes · 7 anti-patrones documentados · ejemplo completo IMARPOR-CC con 4 RAPs alineados.

### §3.2 · NEW (próximo hito) · `subagente_pm_0_0_matriz.py`

Wrapper Python · Camino 2 LLM puro · pattern PM-3.1/PM-3.7:
- `preparar_bundle_pm_0_0()` invoca `preparar_bundle_phase0()` (NEW helper)
- Master prompt PM-0.0 v1.0 inyectado
- Inputs: pm-0-0-input.json (parseado de form) o contenido pegado
- Output expected: pm-0-0-matriz-alineada.json (run dir)
- Validation post-hoc: 7 checks bloqueantes

### §3.3 · UPDATED · `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md`

v1.1 → v3.0 · EXTENSIÓN v3.0 (10 REGLAS canon simplificado):
- INPUT principal: pm-0-0-matriz-alineada.json (NO duplicate matriz)
- 5 principios maestros (sintetizados de 13 sub-principios v1.x)
- Gramática sector-relevante (5-8 grupos · NO 17 hardcoded)
- Schema mínimo viable (8 fields esenciales · resto opcional)
- Trazabilidad esencial (6 ítems · NO 22)
- Descriptores CEFR solo subnivel relevante
- Validation 6 checks bloqueantes
- Libertad LLM explícita
- Deprecation path v1.x → v3.0

Legacy v1.x preserved como REFERENCIA (NO requirements).

### §3.4 · CASCADE · PM-1.1 + PM-1.2 + PM-2.0 + PM-2.x + PM-2.11 + PM-3.7

Cada PM downstream consume `pm-0-0-matriz-alineada.json` como input adicional · documenta en su master prompt:
- "Consume matriz alineada por RAP · NO agregada"
- "rap_target field en activity_card / bloque / sesión"
- "Validación cross-PM contra matriz canónica"

PM-2.11 simplifica · ya NO reconstruye matriz · solo agrega horas/instrumentos/ambientes a fila ya alineada.

PM-3.7 V04 multi-RAP rows se llenan con contenido REAL · cada fila R15+ tiene saberes/procesos/criterios del RAP correspondiente (no solo título).

---

## §4 · Form xlsx · canon stable · sin refactor mayor

**Form actual ya captura todo lo necesario:**

| Campo | Sheet · Cell | Status v3.0 |
|---|---|---|
| `nombre_competencia` | B · R8-12 | ✅ stable |
| `raps[]` (4 RAPs absorbidos) | B · R19-22 | ✅ stable |
| `conocimientos_de_saber[]` agregado | B · R23-28 | ✅ stable · PM-0.0 alinea por RAP |
| `conocimientos_de_proceso[]` agregado | B · R29-39 | ✅ stable · PM-0.0 alinea |
| `criterios_de_evaluacion[]` agregado | B · R40-48 | ✅ stable · PM-0.0 alinea |
| `universo_narrativo` (opcional · LLM puede inventar) | A · R50-58 | ✅ stable |
| `grammar_group_17_sector` | A · R59 | ⚠️ Legacy v1.x (PM-0 v3.0 NO obliga 17 grupos · LLM decide 5-8) |
| `principios_pedagogicos_seleccionados` | A · R45 | ⚠️ Legacy v1.x (PM-0 v3.0 LLM aplica 5 principios maestros) |

**Bump menor pendiente** (próximo hito):
- `form-schema-pm0-pm11.json` agregar nota: "saberes/procesos/criterios se entregan agregados · PM-0.0 alinea por RAP"
- `claude-design-prompt.md` actualizar para clarificar nuevo workflow al instructor

---

## §5 · Skill `fpi-sena-fase1` workflow update

Actualmente skill orquesta PM-0 → PM-1.1 → PM-1.2. Update v3.0:

```
TRIGGER: Sergio menciona "Phase 1" / "Fase 1" / "PM-0" / "PM-1.1" / "PM-1.2" / "Scope" / "Ruta Macrotemática" / "matriz pedagógica alineada"

WORKFLOW v3.0:
1. Pre-flight obligatorio (REGLA 19): leer pm-0-0-input.json o equivalent · master prompt PM-0.0 + PM-0 v3.0 + PM-1.1 + PM-1.2
2. STEP 0 · subagente_pm_0_0_matriz.py → pm-0-0-matriz-alineada.json
3. GATE 0 · Sergio aprueba alineación
4. STEP 1.1 · LLM directo PM-0 v3.0 → pm-0-context.json (Camino 2 sin wrapper)
5. STEP 1.3 · LLM directo PM-1.1 → pm-1-1.json
6. STEP 1.5 · LLM directo PM-1.2 → pm-1-2.json
7. GATE 1 · Sergio aprueba pm-1-2 · transition Phase 2

CHECKPOINTS EVALUATIVOS (recomendados):
- Post STEP 0.3: review matriz alineada · validar rationales pedagógicos
- Post STEP 1.2: review universe + principios aplicables
- Post STEP 1.4: review macrotemáticas
- Post STEP 1.6: GATE 1 final
```

---

## §6 · Cascade · validación cross-PM v3.0

### §6.1 · PM-0 v3.0 (post PM-0.0)

Validation checks v3.0 (6):
1. `_matriz_alineada_ref` apunta a archivo válido
2. `cefr_subnivel_objetivo` ∈ {A1.1, A1.2, A1.3, A2.0, A2.1, A2.2}
3. `universo_narrativo` non-empty · sector-coherent · personajes >= 2
4. `principios_pedagogicos_aplicables` referencia los 5 principios maestros
5. NO duplicación con matriz alineada
6. Anti-copia-fantasma · 0 cross-program leaks

### §6.2 · PM-1.1 (post PM-0)

Validation checks v3.0 (existing + 1 nuevo):
- Existing: 4 patrones regla_bloques · horas suma · CEFR alignment · etc.
- NEW: bloques alineados con RAPs de matriz alineada (1a1 / Na1 / 1aN / NaM coherente con raps_count)

### §6.3 · PM-1.2 (post PM-1.1)

Validation checks v3.0 (existing + 1 nuevo):
- Existing: cols 1-5 GFPI-F-134 · 3 fuentes auténticas curadas · etc.
- NEW: cols 3-5 (saberes_conceptos · saberes_proceso · criterios) heredan literal de matriz alineada · NO inventan ni agregan

### §6.4 · PM-2.x (post Phase 1)

Cada activity_card debe declarar `rap_target` field referenciando uno de los rap_id de matriz alineada.

### §6.5 · PM-2.11 (post Phase 2)

Simplificado: matriz YA viene alineada de PM-0.0. PM-2.11 solo agrega:
- col_7 (horas directas + autónomas)
- col_9 (instrumentos)
- col_10 (ambientes + materiales + instructores)

NO reconstruye cols 3-5 (vienen literal de matriz).

### §6.6 · PM-3.7 V04 (post Phase 3)

Multi-RAP rows con contenido REAL:
- R15 (RA1): full data
- R18 (RA2): full data (NO solo título)
- R20 (RA3): full data
- R21 (RA4): full data

Sumas SUM(H15:H21) coherentes con horas distribuidas reales por RAP (no concentradas en RA1).

---

## §7 · Migration path runs existentes

| Run | Acción v3.0 |
|-----|-------------|
| IMARPOR-CC-2026-04-27 | Legacy v2.7 · NO upgrade obligatorio · canon histórico |
| IMARPOR-CC-2026-04-30-V2 (en curso) | UPGRADE a v3.0 · re-arrancar Phase 0 con PM-0.0 |
| MGV-2026-04-20 | Legacy v2.7 · upgrade opcional |
| DIESEL-2026-04-19 | Legacy v2.7 · NO upgrade |
| Programas nuevos (INGBAS4 · INGBAS1-AGRO · futuros) | Generar directo v3.0 |

---

## §8 · Próximos hitos del paradigm shift v3.0

| Hito | Status | Output |
|---|---|---|
| ✅ NEW master prompt PM-0.0 | DONE (commit 59489c1) | master-prompts/PM-0.0 — Matriz Pedagógica Alineadora.md (509 lines) |
| ✅ Simplificar PM-0 v1.1 → v3.0 | DONE (commit b57fff2) | EXTENSIÓN v3.0 + 10 REGLAS · libertad LLM |
| ✅ Bump DM v2.7 → v3.0 | DONE | Esta sesión |
| ✅ NEW PLAN-FASE-1-ARQUITECTURA | DONE | Este documento |
| ⏳ NEW subagente_pm_0_0_matriz.py | PENDING | Camino 2 LLM wrapper · próximo hito 5 |
| ⏳ Form schema bump menor + claude-design-prompt | PENDING | Hito 6 |
| ⏳ Skill fpi-sena-fase1 update | PENDING | Hito 6 |
| ⏳ Test E2E IMARPOR-CC-V2 con PM-0.0 | PENDING | Hito 7 |
| ⏳ CHANGELOG + memory snapshots + commit final | PENDING | Hito 8 |

---

## §9 · Disciplina aplicada · anti-patrones canonizados

| Anti-patrón | Aplicación en este plan |
|---|---|
| **#11** NO inflar arquitectura sin sustento | Form xlsx NO refactor mayor · solo bump menor documentación |
| **#13** Scope reduction explícita | Maratón 8 hitos · NO single big change |
| **#14** Validation independiente post-Agent | 7 validation_checks bloqueantes en PM-0.0 + 6 en PM-0 v3.0 |
| **#15** Master prompt bumpeado ANTES de implementar | Master prompts canon-strict ANTES de subagente Python |

---

*PLAN-FASE-1-ARQUITECTURA v1.0 · escrito 2026-05-01*
*Documenta workflow Phase 0 (NEW · PM-0.0) + Phase 1 (PM-0 v3.0 simplificado + PM-1.1 + PM-1.2) post-paradigm shift DM v3.0*
*Sergio Cortés · canon strict*
