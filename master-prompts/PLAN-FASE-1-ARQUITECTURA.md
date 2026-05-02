---
title: PLAN-FASE-1-ARQUITECTURA — Phase 1 (Scope) + Phase 0 (Matriz Pedagógica Alineadora)
version: 1.1
last_updated: 2026-05-01
status: v1.1 agrega §10 Anti-Prescriptive Pattern · canonizado del cascade Step 1.1 IMARPOR-V2 (anti-patrón #16) · v1.0 fue NEW workflow Phase 0+1 post-paradigm shift PM-0.0 (DM v3.0)
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
*v1.1 · 2026-05-01 (post-cascade Step 1.1) · agrega §10 Anti-Prescriptive Pattern · anti-patrón #16 canonizado*
*Sergio Cortés · canon strict*

---

## §10 · ANTI-PRESCRIPTIVE PATTERN (v1.1 · 2026-05-01)

### Anti-patrón #16 · prompt operacional prescriptivo contradice libertad LLM

**Detectado:** 2026-05-01 cascade Step 1.1 IMARPOR-V2. Master prompt PM-0 v3.0 declara REGLA 10 LIBERTAD LLM EXPLÍCITA · pero el orchestrator (Claude principal) pasó al Agent un template JSON literal con 25 keys pre-fabricadas + listas cerradas + tono pedagógico decidido. El Agent rellenó · output mecánico-prescriptivo · contradice REGLA 10. Sergio detectó vía REGLA 21 trigger mutual: "FUE MUY MECÁNICO Y NO TUVO LA LIBERTAD DEL LLM?".

**RE-RUN restaurativo** con prompt corregido (8 obligatorios + contexto + libertad explícita) produjo output muy distinto:
- 19 keys vs 25 fijos
- `instructor_briefing` narrativo 1ª persona ~430 words
- 8 personajes (LLM agregó 2 funcionales con justificación gramatical)
- P6 emergente "Cold Chain Integrity como ancla afectiva"
- `pedagogical_compass` narrativa entrelazada (NO 5 keys numbered)
- 6 sector_specific_fields banana-driven

**Lección canonizada:** master prompt declara libertad ≠ prompt operacional respeta libertad.

### §10.1 · Pattern operacional canonical (cross-PM)

Cuando un master prompt declare LIBERTAD LLM (cualquier REGLA explícita), el prompt operacional al Agent DEBE incluir bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL":

```
## INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL

Master prompt [PM-X.Y v_X] declara REGLA N "LIBERTAD LLM EXPLÍCITA". Este
prompt operacional debe respetarla. NO sigas plantilla · NO inventes keys
numbered fijas · NO enumeres listas cerradas si una narrativa funciona mejor.

TIENES LIBERTAD REAL sobre:
- [campo 1: tipo de libertad]
- [campo 2: ...]
- ...

NO TIENES LIBERTAD sobre:
- [N] fields obligatorios canon strict (REGLA M)
- Validation_checks bloqueantes (REGLA M)
- [otras restricciones canon]

Diseña la estructura coherente con [SECTOR/PROGRAMA] · NO sigas template
universal.

## Pista (NO obligatorio · solo ejemplo de libertad)

[ejemplo de cómo PODRÍA verse · clarificando que NO es prescripción]
```

### §10.2 · Trigger interno orchestrator (3 checks pre-dispatch)

ANTES de dispatchear cualquier Agent que ejecute un PM:

1. **¿Master prompt declara libertad LLM en alguna REGLA?**
   - Si SÍ → continuar checks 2-3
   - Si NO → prompt operacional puede ser más prescriptivo

2. **¿Mi prompt al Agent incluye bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL"?**
   - Si NO → STOP · refactor prompt antes de dispatch

3. **¿Mi prompt pasa template JSON literal con keys pre-fabricadas?**
   - Si SÍ → STOP · solo obligatorios mínimos + contexto + libertad explícita
   - Si NO → dispatch OK

### §10.3 · Tabla aplicabilidad cross-PM

| PM | Master prompt declara libertad? | Pattern §10 obligatorio? |
|---|---|---|
| **PM-0.0** v1.1 | SÍ (REGLAS 1, 3, 5 · rationale + decisión analítica) | SÍ |
| **PM-0** v3.1 | SÍ (REGLA 10 LIBERTAD LLM EXPLÍCITA + REGLA 11) | SÍ |
| **PM-1.1** v2.7.1 | SÍ (4 patrones regla_bloques · LLM elige) | SÍ |
| **PM-1.2** v4.1 | SÍ (LLM cura fuentes auténticas · selecciona Story A/B) | SÍ |
| **PM-2.0** v2.6 | SÍ (LLM decide arquetipos session blueprint) | SÍ |
| **PM-2.1-2.10** v2.0-3.0 | SÍ (cada AC es LLM creativo) | SÍ |
| **PM-2.11** v2.6.3 | Parcial (canon strict cols 1-11 · pero LLM síntesis) | SÍ con caveats |
| **PM-3.1** v2.6 | SÍ (LLM diseña flow playbook outline) | SÍ |
| **PM-3.2** v2.6 | SÍ (LLM decide facilitación SET-UP/WHILE/WRAP-UP) | SÍ |
| **PM-3.5** v2.6 | SÍ (LLM diseña final mission scenario) | SÍ |
| **PM-3.3** v3.0 | SÍ (visual aid · LLM decide layout + sections) | SÍ |
| **PM-3.4** v4.1 | SÍ (LLM decide REINFORCE/EXTEND/PREPARE content) | SÍ |
| **PM-3.6** v2.7 | SÍ (LLM decide narrative GFPI-F-135) | SÍ |
| **PM-3.7** v2.0 | Parcial (V04 canon strict · LLM aggregation) | SÍ con caveats |
| **PM-4.1, PM-4.2** v2.x | SÍ (LLM decide 6 instrumentos / cuestionario S6) | SÍ |

**Conclusión:** TODOS los subagentes Phase 0/1/2/3/4 deben recibir prompts operacionales NO prescriptivos. §10 aplica universalmente.

### §10.4 · Caso operacional confirmado · IMARPOR-V2 Step 1.1

**Antes (prescriptive · 2026-05-01 inicial):**
- 25 keys fijos templated
- 5 principios numbered keys
- 6 personajes lista cerrada
- Tono "colaborativo" decidido por orchestrator
- 8 grupos gramaticales enumerados
- L1 policy tabla S1-S3/S4-S8/S9-S12

**Después (libertad · 2026-05-01 RE-RUN):**
- 19 keys (8 obligatorias + 11 emergentes)
- `pedagogical_compass` narrativa entrelazada
- 8 personajes (LLM agregó Yurlenis Tally Clerk + Pipa Refrigeration Tech)
- Tono LLM-decidido desde análisis sector
- Grammar focus emergente del análisis matriz
- `l1_policy_narrativa` con justificación contextual
- 6 innovaciones libres detectadas

**Validation 6/6 PASS en ambos · pero cualitativamente muy distinto.**

### §10.5 · Memoria operacional referenciada

Documentado en `feedback_anti_patron_16_prompt_operacional_prescriptivo.md` (memory snapshot · trigger interno orchestrator · pattern canonical · template reusable cross-PM).
