---
title: PLAN-FASE-1-ARQUITECTURA — Phase 1 (Scope) + Phase 0 (Matriz Pedagógica Alineadora)
version: 1.5
last_updated: 2026-05-02
status: v1.5 agrega §15 PM-2.0 v3.0 Architect Heredero (boundary Phase 1→2) · canonizado Step 1.4 IMARPOR-V2 · v1.4 fue §14 PM-1.2 v4.2 Scope Diferenciado · v1.3 fue §13 PM-1.1 Tripartita · v1.2 fue §11+§12 Criterios+Traceability · v1.1 fue §10 Anti-Prescriptive · v1.0 fue NEW workflow Phase 0+1
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

---

## §11 · CRITERIOS ESPECÍFICOS SISTEMA — PATTERN (v1.2 · 2026-05-01)

### §11.1 · Trigger del problema

**Detectado:** 2026-05-01 re-cascade IMARPOR-V2. Después de cerrar §10 (anti-prescriptive), Sergio observó que la matriz alineada (PM-0.0 v1.0) producía solo `saberes_conceptos_y_principios` + `saberes_proceso` + `criterios_evaluacion` SOFÍA básicos. Faltaban los **criterios específicos canon del sistema** con anclas a evidencias E1-E6 + E-Misión, sesiones, instrumentos y subniveles CEFR. Sin ellos, la traceability downstream (cada AC → un criterio específico → una evidencia → un instrumento) no podía cerrarse.

Sergio aportó el set de 8 criterios específicos canónicos:

| ID | RAP target | CEFR | Evidencia | Sesión | Instrumento |
|---|---|---|---|---|---|
| C01 | RA1 | A1.2 | E1 Reading | S3 | Cuestionario No 1 |
| C02 | RA1+RA3 | A1.2-A1.3 | E2 Writing | S4 | Lista de Verificación No 2 |
| C03 | RA2 | A1.3 | E3 Listening | S5 | Lista de Verificación No 3 |
| C04 | RA2+RA3 | A1.3-A2.0 | E4 Speaking parcial | S6 | Escala de Estimación No 4 |
| C05 | RA3 | A2.0 | E4 Speaking final | S8 | Escala de Estimación No 4 |
| C06 | RA3+RA4 | A2.0-A2.1 | E5 Language Functions | S9 | Escala de Estimación No 5 |
| C07 | RA1+RA2+RA3+RA4 (4-way) | consolidación | E6 Cuestionario | S6 | Cuestionario No 6 |
| C08 | RA4 | A2.1 | E-Misión ABP | S12 | Rúbrica ABP |

### §11.2 · Schema canonical

El form xlsx (o el orchestrator) DEBE capturar la sección `criterios_evaluacion_especificos_canon_sistema` en `pm-0-0-input.json`:

```json
"criterios_evaluacion_especificos_canon_sistema": [
  {
    "id": "C01",
    "criterio": "<descripción operacional>",
    "rap_target": "RAP-XX" | ["RAP-XX", "RAP-YY"],
    "cefr_subnivel": "A1.X" | "A1.X-A2.X",
    "evidencia": "E1" | "E2" | ... | "E6" | "E-Misión",
    "evidencia_nombre": "Reading" | "Writing" | "Listening" | "Speaking parcial" | "Speaking final" | "Language Functions" | "Cuestionario Consolidado" | "Misión Final ABP",
    "sesion": "S3" | "S4" | ... | "S12",
    "instrumento": "Cuestionario No N" | "Lista de Verificación No N" | "Escala de Estimación No N" | "Rúbrica ABP X criterios"
  }
]
```

### §11.3 · Distribución por RAP (4 sub-arrays)

PM-0.0 v1.1+ alinea estos criterios a RAPs basándose en `rap_target`. Cada RAP en `pm-0-0-matriz-alineada.json` ahora tiene 4 sub-arrays:

```jsonc
{
  "rap_id": "RA1",
  "saberes_conceptos_y_principios": [...],     // SOFÍA agregados
  "saberes_proceso": [...],                     // SOFÍA agregados
  "criterios_evaluacion": [...],                // SOFÍA generales
  "criterios_evaluacion_especificos_canon_sistema": [   // NEW · subset según rap_target
    {"id": "C01", ...},
    {"id": "C02", ...},   // overlap RA1+RA3
    {"id": "C07", ...}    // overlap 4-way
  ]
}
```

**Overlaps multi-RAP** se documentan explícitamente. Ejemplo IMARPOR-V2: 4 overlaps (C02 RA1+RA3 · C04 RA2+RA3 · C06 RA3+RA4 · C07 4-way RA1+RA2+RA3+RA4). Distribución total: RA1=3 · RA2=3 · RA3=5 · RA4=3 · 14 asignaciones para 8 criterios únicos.

### §11.4 · Trigger interno orchestrator

ANTES de dispatchear PM-0.0:
1. ¿El form/input incluye `criterios_evaluacion_especificos_canon_sistema`? Si NO · STOP · pedirlos a Sergio.
2. ¿Cobertura 100% E1-E6+E-Misión? Si NO · gap → completar antes de PM-0.0.
3. ¿Cada criterio tiene los 8 campos canónicos del schema §11.2? Si NO · validation FAIL.

### §11.5 · NEW validation_check 8 PM-0.0 (BLOQUEANTE)

```python
def check_criterios_especificos_canon_completos(matriz):
    """8 criterios C01-C08 deben estar asignados a >=1 RAP cada uno · cobertura 100%."""
    asignados = set()
    for rap in matriz["raps"]:
        for crit in rap.get("criterios_evaluacion_especificos_canon_sistema", []):
            asignados.add(crit["id"])
    canon_required = {"C01","C02","C03","C04","C05","C06","C07","C08"}
    return {
        "id": 8,
        "name": "criterios_especificos_canon_completos",
        "status": "PASS" if asignados >= canon_required else "FAIL",
        "asignados": sorted(asignados),
        "missing": sorted(canon_required - asignados)
    }
```

---

## §12 · TRACEABILITY PATTERN — `_anclaje_matriz` CROSS-PM (v1.2 · 2026-05-01)

### §12.1 · Trigger del problema

**Detectado:** 2026-05-01 re-cascade IMARPOR-V2. PM-0 v3.1 RE-RUN (post §10) tenía libertad LLM correcta · pero NO vinculaba explícitamente cada elemento (personajes · principios · grammar · final mission · L1 policy · evidencias) a la matriz canon. El lector NO sabía CUÁL saber/criterio específico anclaba a cada elemento. Sergio enfático: *"EL AGENTE TIENE LIBERTAD TOTAL PERO SU LÍMITE SIEMPRE SON LOS SABERES Y CRITERIOS QUE ESTÁN ALINEADOS EN LA MATRIZ."*

### §12.2 · Pattern canonical

Cada elemento de capa pedagógica (en cualquier PM downstream) DEBE incluir sub-campo `_anclaje_matriz` (o nombrado consistentemente) vinculando a saberes/criterios específicos canon:

```jsonc
{
  "personaje": {
    "nombre": "...",
    "_anclaje_matriz": {
      "saberes_que_modela": ["RA1.SC.1"],
      "criterios_especificos_que_evalúa": ["C01", "C04"],
      "raps_que_atraviesa": ["RA1", "RA2"]
    }
  },
  "principio_pedagogico": {
    "principio": "...",
    "_anclaje_matriz": {
      "cefr_progresion_canon": "A1.2 → A2.1",
      "evidencias_anchor": ["E1", "E5"],
      "saberes_progresion": ["RA1.SP.1"]
    }
  },
  "grammar_focus_session": {
    "estructura": "...",
    "_anclaje_matriz": {
      "rap_target": "RA1",
      "criterio_que_demanda": "C01",
      "cefr_subnivel": "A1.2"
    }
  },
  "final_mission": {
    "scenario": "...",
    "_anclaje_matriz": {
      "criterios_específicos_evaluados": ["C08"],
      "saberes_movilizados": ["RA4.SP.3"],
      "evidencia_capstone": "E-Misión"
    }
  }
}
```

### §12.3 · Validation check canonical (cross-PM)

Cada PM downstream agrega un `traceability_matriz_completa` check al final de su validation suite:

```python
def check_traceability(output):
    """Recursivamente cuenta anclajes · 0 elementos pedagógicos sin _anclaje_matriz."""
    anclajes = 0
    sin_anclaje = []
    def walk(obj, path=""):
        nonlocal anclajes
        if isinstance(obj, dict):
            es_pedagogico = any(k in obj for k in ['nombre','rol','principio','estructura','porcentaje','scenario'])
            tiene_anclaje = any(k in obj for k in ['_anclaje_matriz','criterios_especificos_que_evalúa','saberes_movilizados','criterio_específico'])
            if es_pedagogico:
                if tiene_anclaje: anclajes += 1
                else: sin_anclaje.append(path)
            for k, v in obj.items(): walk(v, f"{path}.{k}")
        elif isinstance(obj, list):
            for i, item in enumerate(obj): walk(item, f"{path}[{i}]")
    walk(output)
    return {"name":"traceability_matriz_completa","status":"PASS" if not sin_anclaje else "FAIL",
            "anclajes":anclajes,"sin_anclaje":sin_anclaje}
```

### §12.4 · Tabla aplicabilidad cross-PM

| PM | `_anclaje_matriz` requerido en | Validation check |
|---|---|---|
| **PM-0.0** v1.2 | criterios específicos sistema asignados a RAPs · overlap documentation | check 8 `criterios_especificos_canon_completos` |
| **PM-0** v3.2 | personajes · principios · grammar · L1 · evidencias · final_mission | check 7 `traceability_matriz_completa` |
| **PM-1.1** v2.7.2+ | bloques macrotemáticos → declarar saberes/criterios específicos cubiertos | check `bloque_anclaje_completo` |
| **PM-1.2** v4.2+ | scope per RAP → fuentes auténticas vinculadas a saberes específicos | check `fuentes_ancladas` |
| **PM-2.x ACs** v3.x+ | cada AC → declara `rap_target` + `criterio_específico_que_demanda` + `saberes_que_moviliza` | check `ac_anclaje_explicito` |
| **PM-2.11** v2.7+ | matriz GFPI-F-134 hereda traceability completa | check `gfpi_134_traceability_heredado` |
| **PM-3.6** GFPI-F-135 v2.8+ | cada actividad documentada con anclaje a evidencia E1-E6+E-Misión | check `gfpi_135_evidencias_ancladas` |
| **PM-3.7** V04 v2.1+ | multi-RAP rows con criterios específicos sistema visibles | check `v04_criterios_canon_visibles` |

### §12.5 · Trigger interno orchestrator (3 checks pre-dispatch)

ANTES de dispatchear cualquier PM downstream:

1. **¿La matriz alineada (PM-0.0) incluye `criterios_evaluacion_especificos_canon_sistema`?**
   - Si NO → STOP · re-run PM-0.0 con input completo §11.2

2. **¿Mi prompt al Agent enfatiza TRACEABILITY EXPLÍCITA con ejemplos de `_anclaje_matriz`?**
   - Si NO → refactor prompt (agregar bloque template §12.2)

3. **¿Mi prompt incluye check `traceability_matriz_completa` como bloqueante?**
   - Si NO → agregar al validation suite

### §12.6 · Caso operacional confirmado · IMARPOR-V2 re-cascade

- `pm-0-0-matriz-alineada.json` v1.1 · 22 keys · 8/8 criterios específicos asignados
- `pm-0-context.json` v3.2 · 21 keys · 51,794 bytes · 44 anclajes detectados recursivamente · 7/7 validation PASS
- 8/8 personajes con `_anclaje_matriz`
- 5 principios + P6 emergente con `_anclaje_matriz`
- 9/9 grammar focus per session con `_anclaje_matriz`
- 8/8 evidencias formales mapeadas (S3→E1·C01 ... S12→E-Misión·C08)
- 4 multi-RAP overlaps documentados (C02 RA1+RA3 · C04 RA2+RA3 · C06 RA3+RA4 · C07 4-way)
- Dashboard COMPUESTO v2 · PARTE 1 matriz completa visible (4 RAPs × 4 columnas) · PARTE 2 capa pedagógica con anclajes visibles

### §12.7 · Memoria operacional referenciada

Documentado en `feedback_traceability_anclaje_matriz_canon.md` (memory snapshot · pattern canonical · template reusable cross-PM · trigger interno orchestrator).

**Disciplina canon:** "nada por fuera de la matriz" — el LLM tiene libertad TOTAL pero su límite siempre son los saberes y criterios que están alineados en la matriz.

---

## §13 · PM-1.1 TRIPARTITA WORKFLOW + TIEMPOS CANON UNIVERSALES (v1.3 · 2026-05-01)

### §13.1 · Trigger del paradigm shift PM-1.1

**Detectado:** 2026-05-01 cascade Phase 1 IMARPOR-V2 Step 1.2. PM-1.1 v2.7.1 generaba bloques macrotemáticos uniformes sin diferenciar TIPO pedagógico. Esto causaba:

- Downstream (PM-1.2, PM-2.0) tenía que re-decidir qué bloques son apropiación vs transversales
- La traceability canon se perdía (PM-2.1/PM-2.2 son transversales · PM-2.3 a PM-2.10 son por RAP · PM-3.5 es capstone integrador)
- Las restricciones de tiempo canon universales NO se aplicaban (APERTURA y TRANSFERENCIA tienen tiempos canon · APROPIACIÓN balancea el resto)

Sergio canonizó (2026-05-01):

> "LAS ACTIVIDADES DE REFLEXIÓN INICIAL (2) Y DE CONTEXTUALIZACIÓN (2) TOMARÁN MÁXIMO 6 HORAS DIRECTAS. ES DECIR UNA SESIÓN DE TRABAJO. LO MISMO LA ACTIVIDAD DE TRANSFERENCIA (5 sub-fases) DEBE DURAR MÁXIMO 2 SESIONES DE 6 HORAS CADA UNO. NO IMPORTA EL PROGRAMA QUE SEA, SI ES TÉCNICA, TECNOLÓGICA O CURSO ESPECIAL/COMPLEMENTARIO. TODAS LAS DEMÁS SESIONES DEBEN SER DE APROPIACIÓN, DIVIDIDAS POR LOS BLOQUES DE CADA RAP CON SU MATRIZ ALINEADA Y TRAZABLE CON SUS CONTENIDOS DEFINIDOS Y DETALLADOS."

### §13.2 · Estructura tripartita canon

```
┌──────────────────────────────────────────────────────────────────────┐
│ BLOQUE APERTURA  (transversal · 1 bloque único)                       │
│   sesiones: 1 · horas: 6 · canon obligatorio =                       │
│   pms_destino: PM-2.1 (2 arquetipos Spark) + PM-2.2 (2 Gap Analysis) │
│   _anclaje_matriz: alcance "competencia_completa" · raps_atravesados │
│   evidencias_target: [] · criterios_canon: []                        │
├──────────────────────────────────────────────────────────────────────┤
│ BLOQUES APROPIACIÓN (N bloques · 1 por RAP)                          │
│   sesiones: LLM distribuye entre RAPs · horas: total - 6 - ≤12       │
│   pms_destino: PM-2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10                 │
│   _anclaje_matriz: rap_target + saberes + criterios_canon (C01-C07)  │
│   regla_bloques_aplicada: alineacion_1a1 (típico) · etc.             │
│   sesiones_anchor INCLUYE sesiones canon de evidencias del RAP       │
├──────────────────────────────────────────────────────────────────────┤
│ BLOQUE TRANSFERENCIA  (transversal capstone · 1 bloque único)        │
│   sesiones: ≤ 2 · horas: ≤ 12 · canon obligatorio ≤                  │
│   pms_destino: PM-3.5 Final Mission · 5 sub-fases ABP                │
│   _anclaje_matriz: alcance "todos_los_raps_integrados"               │
│   criterios_canon: [C08] · evidencias_target: [E-Misión]             │
└──────────────────────────────────────────────────────────────────────┘
```

**Total bloques** = `1 + N + 1` donde `N = raps_count`.

### §13.3 · Tabla tiempos canon universales (cualquier programa)

| `tipo_bloque` | `sesiones_count` | `horas_directas` | Canon |
|---|---|---|---|
| **APERTURA** | exactamente 1 | exactamente 6h | OBLIGATORIO `=` |
| **APROPIACIÓN** | N (LLM distribuye entre RAPs) | (total_programa − 6 − transferencia_horas) | flexible · LLM balancea |
| **TRANSFERENCIA** | ≤ 2 | ≤ 12h | OBLIGATORIO `≤` ambas condiciones |

**Independiente del tipo programa:** Técnico (8 sesiones) · Tecnológico (16 sesiones) · Curso Especial (12 sesiones) · Curso Complementario (12 sesiones). Las restricciones de APERTURA y TRANSFERENCIA son universales.

### §13.4 · Tabla cross-PM destino por tipo_bloque

| `tipo_bloque` | PMs destino | Arquetipos típicos | Evidencias target |
|---|---|---|---|
| **APERTURA** | PM-2.1, PM-2.2 | 4 (2 Spark + 2 Gap Analysis) | ninguna formal |
| **APROPIACIÓN** | PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10 | ~7 por RAP (Reading + Writing + Vocab + Listening + Speaking + Lang Functions + Grammar) | E1, E2, E3, E4, E5, E6 (subset según RAP) |
| **TRANSFERENCIA** | PM-3.5 | 1 capstone con 5 sub-fases ABP | E-Misión (C08) |

PM-2.7 está deprecated (funcionalidad absorbida en PM-2.8) · NO se incluye en pms_destino APROPIACIÓN.

### §13.5 · Distribución sesiones APROPIACIÓN entre RAPs

El LLM tiene **libertad analítica** sobre cómo distribuir las sesiones APROPIACIÓN entre los N RAPs · CON RESTRICCIÓN: debe respetar las sesiones canon donde caen las evidencias C01-C07 (heredadas de PM-0.0 v1.2):

| Evidencia | Sesión canon | RAP target |
|---|---|---|
| C01 Reading | S3 | RA1 |
| C02 Writing | S4 | RA1+RA3 (overlap) |
| C03 Listening | S5 | RA2 |
| C04 Speaking parcial | S6 | RA2+RA3 (overlap) |
| C05 Speaking final | S8 | RA3 |
| C06 Lang Functions | S9 | RA3+RA4 (overlap) |
| C07 Cuestionario S6 | S6 | 4-way (intra-apropiación) |

Cada bloque APROPIACIÓN debe declarar `sesiones_anchor` que INCLUYA las sesiones canon de los criterios que tiene asignados.

### §13.6 · Workflow operacional Step 1.2

```
Input gates:
  ✓ pm-0-0-matriz-alineada.json v1.1+ (PM-0.0 con 8 criterios C01-C08)
  ✓ pm-0-context.json v3.2+ (PM-0 con _anclaje_matriz)
  ✓ pm-1-1-input.json (tipo programa · sesiones_count · horas_por_sesion)
        ↓
Trigger interno orchestrator (3 checks pre-dispatch):
  1. ¿pm-0-0-matriz-alineada.json incluye criterios_evaluacion_especificos_canon_sistema? Si NO → STOP
  2. ¿Mi prompt al Agent enfatiza ESTRUCTURA TRIPARTITA + TIEMPOS CANON + TRACEABILITY? Si NO → refactor
  3. ¿Mi prompt incluye 9 validation_checks como BLOQUEANTES? Si NO → agregar
        ↓
Dispatch Agent PM-1.1 v2.8 (prompt anti-prescriptive · libertad LLM REAL)
        ↓
Output pm-1-1.json v2.8:
  ├─ bloque APERTURA   (1 · S1 · 6h · pms→{2.1,2.2})
  ├─ bloques APROPIACIÓN (N · sum=resto · pms→{2.3-2.10} · _anclaje C01-C07)
  └─ bloque TRANSFERENCIA (1 · ≤2 sesiones · ≤12h · pms→{3.5} · _anclaje C08)
        ↓
Validation 9/9 PASS:
  1. estructura_tripartita_completa
  2. apropiacion_cobertura_raps_1a1
  3. transversalidad_correcta
  4. cobertura_criterios_canon_completa
  5. pms_destino_correctos_por_tipo
  6. apertura_horas_canon (= 6h / 1 sesión)
  7. transferencia_horas_canon (≤ 12h / ≤ 2 sesiones)
  8. apropiacion_horas_balanced
  9. traceability_matriz_completa (heredado v3.2)
        ↓
Si 9/9 PASS → Step 1.3 PM-1.2 cascade (scope diferenciado por tipo_bloque)
Si CUALQUIER FAIL → re-run con corrección
```

### §13.7 · Trigger interno orchestrator (3 checks pre-dispatch)

ANTES de dispatchear Agent PM-1.1 v2.8:

1. **¿La matriz alineada (PM-0.0) incluye `criterios_evaluacion_especificos_canon_sistema`?**
   - Si NO → STOP · re-run PM-0.0 v1.2 (REGLA 9 PM-0.0)

2. **¿Mi prompt al Agent contiene los 3 elementos canónicos v2.8?**
   - Estructura tripartita explícita (1 + N + 1)
   - Tiempos canon explícitos (APERTURA=6h · TRANSFERENCIA≤12h)
   - Traceability `_anclaje_matriz` ejemplos
   - Si falta CUALQUIERA → refactor

3. **¿Mi prompt pasa template literal con bloques pre-fabricados?**
   - Si SÍ → STOP · solo obligatorios + contexto + libertad LLM real
   - El LLM debe DECIDIR distribución sesiones · títulos · regla_bloques aplicada

### §13.8 · Ejemplos canónicos por tipo programa

#### Curso Complementario (12 sesiones × 6h = 72h directas)

```
S1                  APERTURA      6h    1 sesión
S2 — S10            APROPIACIÓN   54h   9 sesiones (4 RAPs · LLM distribuye)
S11 — S12           TRANSFERENCIA 12h   2 sesiones
                                  ───   ──────────
                                  72h   12 sesiones ✓
Bloques: 1 + 4 + 1 = 6
```

#### Programa Técnico (8 sesiones × 7.5h = 60h directas)

```
S1                  APERTURA      6h    1 sesión (canon universal NO 7.5h)
S2 — S7             APROPIACIÓN   42h   6 sesiones (4 RAPs · LLM distribuye)
S8                  TRANSFERENCIA 12h   1 sesión × 12h = 1 sesión doble
                                  ───   ──────────
                                  60h   8 sesiones (con S8 expandida) ✓

Alternativa:
S1                  APERTURA      6h    1 sesión
S2 — S7             APROPIACIÓN   45h   6 sesiones (LLM elige · suma=45h flexible)
S8                  TRANSFERENCIA 9h    1 sesión (LLM elige menos de 12h)
                                  ───   ──────────
                                  60h   8 sesiones ✓
Bloques: 1 + N + 1
```

#### Programa Tecnológico (16 sesiones × 7.5h = 120h directas)

```
S1                  APERTURA      6h    1 sesión
S2 — S14            APROPIACIÓN   97.5h 13 sesiones (6 RAPs · LLM distribuye)
S15 — S16           TRANSFERENCIA 15h   2 sesiones × 7.5h... PERO canon ≤ 12h
                                  
Resolución: TRANSFERENCIA = 2 sesiones × 6h = 12h (sesiones más cortas)
            o = 1 sesión × 12h
            o = 2 sesiones × 6h (canon estricto)

S1                  APERTURA      6h    1 sesión × 6h
S2 — S14            APROPIACIÓN   102h  13 sesiones (parcial 7.5h y/o 6h · LLM ajusta)
S15 — S16           TRANSFERENCIA 12h   2 sesiones × 6h
                                  ───   ──────────
                                  120h  16 sesiones ✓
Bloques: 1 + 6 + 1 = 8
```

**Conclusión:** Las restricciones APERTURA=6h/1s y TRANSFERENCIA≤12h/≤2s pueden requerir ajustar la duración de sesión específica (no toda sesión = horas_por_sesion del programa) · el LLM tiene libertad de proponer ajustes razonables.

### §13.9 · Caso operacional confirmado IMARPOR-V2 (pendiente dispatch)

**Input:**
- `pm-0-0-matriz-alineada.json` v1.1 · 4 RAPs · 8 criterios C01-C08 · 4 overlaps multi-RAP
- `pm-0-context.json` v3.2 · 21 keys · 44 anclajes · 7/7 PASS
- tipo: Curso Complementario · sesiones_count: 12 · horas_por_sesion: 6

**Output esperado pm-1-1.json v2.8:**
- 6 bloques (1 APERTURA + 4 APROPIACIÓN + 1 TRANSFERENCIA)
- Bloque APERTURA (B0) · S1 · 6h · transversal a competencia banana cold chain
- 4 bloques APROPIACIÓN (B1-B4) · S2-S10 · 54h total · 1 por RAP
  - B1 RA1: ej S2-S4 (incluye S3 Reading C01 + S4 Writing C02)
  - B2 RA2: ej S5-S6 (incluye S5 Listening C03 + S6 Speaking parcial C04 + Cuestionario C07)
  - B3 RA3: ej S7-S8 (incluye S8 Speaking final C05)
  - B4 RA4: ej S9-S10 (incluye S9 Lang Functions C06)
- Bloque TRANSFERENCIA (BT) · S11-S12 · 12h · capstone Final Mission C08 E-Misión
- 9/9 validation_checks PASS
- 0 elementos sin `_anclaje_matriz`

### §13.10 · Aplicabilidad cross-program

| Programa | RAPs | Bloques esperados | Distribución típica |
|---|---|---|---|
| IMARPOR-V2 (CC) | 4 | 1+4+1 = 6 | S1 / S2-S10 / S11-S12 |
| MGV (Tecnológico) | 6 | 1+6+1 = 8 | S1 / S2-S14 / S15-S16 |
| INGBAS4-2026 (CC) | 3 | 1+3+1 = 5 | S1 / S2-S10 / S11-S12 |
| INGBAS1-AGRO-2026 (CC) | 2 | 1+2+1 = 4 | S1 / S2-S10 / S11-S12 |
| Técnico ADSO (4 RAPs) | 4 | 1+4+1 = 6 | S1 / S2-S7 / S8 |

**Conclusión:** REGLA 7-12 PM-1.1 v2.8 aplica universalmente. La distribución sesiones APROPIACIÓN/RAP es decisión LLM dentro de tiempos canon.

### §13.11 · Memoria operacional referenciada

Pattern canonical PM-1.1 v2.8 documentado en master prompt PM-1.1 EXTENSIÓN v2.8 (REGLAS 7-14). Esta sección §13 documenta el workflow operacional + cases canónicos + trigger interno orchestrator.

**Cuando dispatchear Agent PM-1.1 v2.8 en cualquier programa nuevo:**
1. Validar 3 input gates
2. Aplicar 3 checks pre-dispatch (§13.7)
3. Construir prompt anti-prescriptive con los 3 elementos canónicos v2.8
4. Dispatchear Agent
5. Validar 9/9 checks PASS
6. Si PASS → Step 1.3 PM-1.2 (bump v2.6 → v4.2 con scope diferenciado por tipo_bloque · COMPLETADO en §14)

---

## §14 · PM-1.2 v4.2 SCOPE DIFERENCIADO POR `tipo_bloque` (v1.4 · 2026-05-01)

### §14.1 · Trigger del paradigm shift PM-1.2

**Detectado:** 2026-05-01 cascade Phase 1 IMARPOR-V2 Step 1.3. PM-1.2 v2.6 generaba scope + curación uniforme por bloque del PM-1.1. Esto causaba:

- Cada bloque recibía mismo tratamiento (curación 3 fuentes · 4 sub-bloques fijos)
- Sin diferenciación entre tipo pedagógico (APERTURA motivacional vs APROPIACIÓN constructiva vs TRANSFERENCIA capstone)
- Sin traceability de qué elemento produce cada evidencia formal E1-E6
- PM-2.x downstream tenía que re-decidir qué insumo del scope corresponde a qué evidencia

Sergio canonizó (2026-05-01):

> "APERTURA: ojo, en las actividades de reflexión inicial es clave el enfoque de PRIMER ACERCAMIENTO a los temas que se van a desarrollar, acá hay un ENFOQUE MOTIVACIONAL clave para el desarrollo de los arquetipos. Las actividades de contextualización son para DIAGNOSTICAR Y ACTIVAR APRENDIZAJES PREVIOS y para poder brindar un contexto claro de los contenidos de la guía y de los raps que se presentan de manera general. ACÁ AÚN NO INICIA LA CONSTRUCCIÓN DE CONOCIMIENTO O HABILIDADES NUEVAS."
>
> "APROPIACIÓN: acá vienen los pm-2.3 hasta pm-2.10. LAS EVIDENCIAS DE APRENDIZAJE SURGEN DE ALGUNAS DE ESTAS ACTIVIDADES DE APRENDIZAJE que se desarrollan y que buscan ser apropiadas por los aprendices."

### §14.2 · Estructura output pm-1-2.json maestro

```
pm-1-2.json v4.2 maestro (1 archivo · single-document pattern como pm-1-1.json)
  ├─ meta_bloque_presentacion_l1 (ÚNICO · onboarding L1 al programa entero · NO duplica)
  └─ sub_bloques_tripartitos (6 sub-bloques heredados de pm-1-1.json):
      ├─ B0 APERTURA          schema APERTURA (motivacional + diagnóstico + activación)
      ├─ B1 APROPIACIÓN RA1   schema APROPIACIÓN (Story A/B + vocab + functions + grammar)
      ├─ B2 APROPIACIÓN RA2   schema APROPIACIÓN
      ├─ B3 APROPIACIÓN RA3   schema APROPIACIÓN
      ├─ B4 APROPIACIÓN RA4   schema APROPIACIÓN
      └─ BT TRANSFERENCIA     schema TRANSFERENCIA (mission brief + 5 sub-fases ABP)
```

**Patrón canon:** 1 archivo maestro (NO N archivos separados) · sigue patrón pm-1-1.json single-document · facilita consumo downstream PM-2.0 architect.

### §14.3 · Tabla 3 schemas diferenciados por tipo_bloque

| tipo_bloque | Elementos del schema | NO contiene | Restricción canon Sergio |
|---|---|---|---|
| **APERTURA** | `materiales_spark[]` (con `enfoque_motivacional` + `primer_acercamiento_a_temas`) · `vocabulario_diagnostico[]` (10-15 NO 20) · `aprendizajes_previos_a_activar[]` · `contexto_general_raps_presentado` · `transversalidad_justificacion` | NO `key_vocabulary_per_rap` · NO `grammar_items_per_rap` · NO Story A/B · NO produce E1-E5 | "Acá NO inicia construcción de conocimiento ni habilidades nuevas" |
| **APROPIACIÓN** | `story_a_reading` (E1) · `story_b_listening` (E3) · `key_vocabulary_per_rap` (20 vocab) · `language_functions_per_rap` (5 functions F1-F5) · `grammar_items_per_rap` · `task_writing_derivada` (E2) · `task_speaking_derivada` (E4) · `analisis_linguistico_cefr` | — (es el bloque más rico) | "Las evidencias de aprendizaje surgen de algunas de estas actividades" |
| **TRANSFERENCIA** | `mission_brief` (con escenario laboral real) · `subfases_abp_context[5]` (Planeación · Diseño · Desempeño · Presentación · Eval reflexiva) · `materiales_simulacion[]` · `rubrica_abp_capstone` (E-Misión) | NO Story A/B clásica · NO produce E1-E5 (solo E-Misión) | Capstone integrador · 5 sub-fases ABP en ≤12h ≤2 sesiones |

### §14.4 · Tabla `_produces_evidencia` mapping (canon traceability evidencias)

| Elemento de scope | Schema origen | `_produces_evidencia` | `_consumed_by_pm` |
|---|---|---|---|
| `story_a_reading` | APROPIACIÓN | E1 | PM-2.3 |
| `task_writing_derivada` | APROPIACIÓN | E2 | PM-2.4 |
| `story_b_listening` | APROPIACIÓN | E3 | PM-2.6 |
| `task_speaking_derivada` | APROPIACIÓN | E4 | PM-2.8 |
| `language_functions_per_rap` (algunas) | APROPIACIÓN | E5 | PM-2.9 |
| `key_vocabulary` + `grammar_items` consolidados | APROPIACIÓN | E6 | PM-4.2 |
| `mission_brief` + `rubrica_abp_capstone` | TRANSFERENCIA | E-Misión | PM-3.5 |
| `materiales_spark` · `vocabulario_diagnostico` · `aprendizajes_previos` | APERTURA | null (NO formal) | PM-2.1 / PM-2.2 |
| `materiales_simulacion` | TRANSFERENCIA | null (auxiliar) | PM-3.5 |

**Canon estricto:** todo elemento productor de evidencia formal DEBE declarar `_produces_evidencia` apuntando a uno de los 7 valores canon (E1, E2, E3, E4, E5, E6, E-Misión). Si NO produce evidencia → `_produces_evidencia: null` explícito.

### §14.5 · Workflow operacional Step 1.3

```
Input gates:
  ✓ pm-1-1.json v2.8 (estructura tripartita validada · 6 bloques con _anclaje_matriz)
  ✓ pm-0-0-matriz-alineada.json v1.2 (8 criterios canon C01-C08)
  ✓ pm-0-context.json v3.2 (universo + personajes + grammar focus)
  ✓ pm-1-2-input.json (gates input · onboarding_l1_decision)
        ↓
Trigger interno orchestrator (3 checks pre-dispatch):
  1. ¿pm-1-1.json v2.8 está validado 9/9 PASS? Si NO → STOP
  2. ¿Mi prompt al Agent enfatiza SCOPE DIFERENCIADO POR tipo_bloque + 3 SCHEMAS DISTINTOS + _produces_evidencia? Si NO → refactor
  3. ¿Mi prompt incluye 6 validation_checks como BLOQUEANTES? Si NO → agregar
        ↓
Dispatch Agent PM-1.2 v4.2 (prompt anti-prescriptive · libertad LLM REAL · 9 reglas v2.6 preservadas para APROPIACIÓN)
        ↓
Output pm-1-2.json v4.2 maestro:
  ├─ meta_bloque_presentacion_l1 (ÚNICO)
  └─ sub_bloques_tripartitos (6 sub-bloques)
      ├─ B0 APERTURA   (materiales spark + diagnóstico + activación)
      ├─ B1-Bn APROPIACIÓN (curación POR RAP · _produces_evidencia E1-E6 mapping)
      └─ BT TRANSFERENCIA (mission brief + 5 sub-fases ABP · E-Misión)
        ↓
Validation 6/6 PASS:
  1. scope_diferenciado_por_tipo_bloque
  2. apertura_scope_transversal (NO conocimiento nuevo)
  3. apropiacion_scope_completo_por_rap (Story A + B + 20 vocab + 5 functions + grammar + tasks)
  4. transferencia_scope_capstone (mission brief + 5 sub-fases + rúbrica)
  5. cobertura_criterios_canon_heredada (C01-C08 visibles)
  6. traceability_matriz_completa (heredado v3.2 · _anclaje_matriz + _produces_evidencia)
        ↓
Si 6/6 PASS → Step 1.4 PM-2.0 architect cascade (bump v2.x con tipo_bloque heredado)
Si CUALQUIER FAIL → re-run con corrección
```

### §14.6 · Trigger interno orchestrator (3 checks pre-dispatch)

ANTES de dispatchear Agent PM-1.2 v4.2:

1. **¿pm-1-1.json v2.8 está validado 9/9 PASS?**
   - Si NO → STOP · re-run PM-1.1 v2.8 antes de PM-1.2

2. **¿Mi prompt al Agent contiene los 4 elementos canónicos v4.2?**
   - Scope diferenciado por tipo_bloque explícito
   - 3 schemas distintos (APERTURA · APROPIACIÓN · TRANSFERENCIA) con ejemplos
   - `_produces_evidencia` mapping (E1-E6+E-Misión)
   - Restricción canon APERTURA "NO conocimiento nuevo"
   - Si falta CUALQUIERA → refactor

3. **¿Mi prompt pasa template literal con scope pre-fabricado?**
   - Si SÍ → STOP · solo obligatorios + contexto + libertad LLM real (curación · selección fuentes · vocab + grammar emergentes)

### §14.7 · Caso operacional confirmado IMARPOR-V2 (pendiente dispatch Step 1.3.D)

**Input:**
- pm-1-1.json v2.8 · 6 bloques tripartitos (1+4+1) · 9/9 PASS · 41 KB
- pm-0-0-matriz-alineada.json v1.1 · 4 RAPs · 8 criterios C01-C08 · 4 overlaps
- pm-0-context.json v3.2 · 21 keys · 44 anclajes · 7/7 PASS

**Output esperado pm-1-2.json v4.2:**
- 1 meta_bloque PRESENTACIÓN L1 (onboarding único)
- 6 sub_bloques tripartitos:
  - **B0 APERTURA:** 4 materiales_spark contextualizados banana cold chain (real artifacts + videos VHF + imágenes refrigerated container + testimonio Mariana) · ~12 vocab diagnóstico transversal · 4 aprendizajes_previos_a_activar · contexto_general 4 RAPs presentado
  - **B1 APROPIACIÓN RA1 (Reefer Ship Vocabulary):** Story A reefer ship parts text + Story B vessel description audio + 20 vocab RA1 (cold chain · refrigerated container · stowage) + 5 functions F1-F5 (asking part names · etc.) + grammar (verb to be + plural nouns) + task writing inspection report (E2) + task speaking partner description (E4 parcial)
  - **B2 APROPIACIÓN RA2 (SMCP & VHF Voice):** Story A SMCP standard messages + Story B VHF transmission audio + 20 vocab RA2 (message markers · phonetic alphabet) + 5 functions (acknowledging · clarifying) + grammar (imperatives + present simple) + tasks
  - **B3 APROPIACIÓN RA3 (Grammar at Work):** Story A grammar applications text + Story B port commands audio + 20 vocab RA3 (modals · conditionals) + 5 functions (giving instructions · expressing prohibition) + grammar (modals + passive voice) + tasks (E4 final)
  - **B4 APROPIACIÓN RA4 (Describing Roles & Operations):** Story A role descriptions + Story B operations briefing + 20 vocab RA4 (positions · operations) + 5 functions (describing · explaining) + grammar (present progressive + prepositions) + task functions roleplay (E5)
  - **BT TRANSFERENCIA:** mission brief Pre-Departure Banana Reefer Compliance Check (escenario CML port turnaround · panel evaluador heredado de PM-0 v3.2 escenario_hero) + 5 sub-fases ABP (S11 Plan+Diseño · S12 Desempeño+Present+Eval reflexiva) + materiales simulación (compliance checklist template + radio script template) + rúbrica capstone C08 → E-Misión
- 6/6 validation_checks PASS
- Cada elemento con `_anclaje_matriz` + `_produces_evidencia` mapping completo

### §14.8 · Aplicabilidad cross-program

| Programa | RAPs | Sub_bloques tripartitos | Meta_bloque L1 |
|---|---|---|---|
| IMARPOR-V2 (CC) | 4 | 6 (1+4+1) | 1 onboarding L1 |
| MGV (Tecnológico) | 6 | 8 (1+6+1) | 1 onboarding L1 |
| INGBAS4-2026 (CC) | 3 | 5 (1+3+1) | 1 onboarding L1 |
| INGBAS1-AGRO-2026 (CC) | 2 | 4 (1+2+1) | 1 onboarding L1 |
| Técnico ADSO (4 RAPs) | 4 | 6 (1+4+1) | 1 onboarding L1 |

**Conclusión:** REGLA 10-17 PM-1.2 v4.2 aplica universalmente. La curación POR RAP en APROPIACIÓN respeta universo del RAP heredado de matriz alineada.

### §14.9 · Cascade impact downstream

PM-1.2 v4.2 alimenta a:
- **PM-2.0 architect** (Step 1.4 · bump pendiente · session blueprint hereda tipo_bloque + scopes diferenciados)
- **PM-2.1** (consume `materiales_spark` + `enfoque_motivacional` del bloque APERTURA)
- **PM-2.2** (consume `aprendizajes_previos_a_activar` + `contexto_general_raps_presentado` del bloque APERTURA)
- **PM-2.3** (consume `story_a_reading` del bloque APROPIACIÓN del RAP correspondiente)
- **PM-2.4** (consume `task_writing_derivada` E2)
- **PM-2.5** (consume `key_vocabulary_per_rap` del RAP)
- **PM-2.6** (consume `story_b_listening` E3 del RAP)
- **PM-2.8** (consume `task_speaking_derivada` E4 del RAP)
- **PM-2.9** (consume `language_functions_per_rap` E5 del RAP)
- **PM-2.10** (consume `grammar_items_per_rap` del RAP)
- **PM-2.11** (Cols 1-5 GFPI-F-134 derivado de matriz heredada · scope per RAP)
- **PM-3.5** (consume `mission_brief` + `subfases_abp_context` + `rubrica_abp_capstone` del bloque TRANSFERENCIA)
- **PM-4.2** (consume vocab + grammar + functions consolidados para Cuestionario S6 E6)

### §14.10 · Memoria operacional referenciada

Pattern canonical PM-1.2 v4.2 documentado en master prompt PM-1.2 EXTENSIÓN v4.2 (REGLAS 10-17). Esta sección §14 documenta el workflow operacional + cases canónicos + trigger interno orchestrator.

**Cuando dispatchear Agent PM-1.2 v4.2 en cualquier programa nuevo:**
1. Validar 4 input gates (pm-1-1 v2.8 · pm-0-0 matriz · pm-0 context · pm-1-2-input)
2. Aplicar 3 checks pre-dispatch (§14.6)
3. Construir prompt anti-prescriptive con los 4 elementos canónicos v4.2
4. Dispatchear Agent
5. Validar 6/6 checks PASS
6. Si PASS → Step 1.4 PM-2.0 architect (bump v2.6 → v3.0 con heredancia cascade tripartita · COMPLETADO en §15)

---

## §15 · PM-2.0 v3.0 ARCHITECT HEREDERO (BOUNDARY PHASE 1→2) (v1.5 · 2026-05-02)

### §15.1 · Trigger del paradigm shift PM-2.0

**Detectado:** 2026-05-02 cascade Step 1.4 IMARPOR-V2. PM-2.0 v2.6 inventaba la distribución de sesiones (estructura 8-sesiones-fijas hardcoded para Técnico/Tecnológico) y asignaba PMs por sesión preset. Esto causaba:

- NO compatible con CC (12 sesiones × 6h) ni con Tecnológico (16 sesiones × 7.5h)
- Duplicaba la información que YA viene en pm-1-1 v2.8 (sesiones_anchor por bloque) y pm-1-2 v4.2 (`_consumed_by_pm` por elemento)
- Inventaba evidencias mapping cuando YA viene en pm-1-2.elementos.`_produces_evidencia`
- Rompía la disciplina canon "nada por fuera de la matriz" porque inventaba

Sergio canonizó (2026-05-02):

> "PM-2.0 architect bump (session blueprint hereda tipo_bloque + scopes diferenciados + `_produces_evidencia` mapping). Las actividades concretas PM-2.3-2.10 luego materializarán la cadena con instrucciones detalladas."

### §15.2 · Esencia v3.0 · architect como secuenciador temporal

PM-2.0 v3.0 ya **NO inventa nada**. Es un **secuenciador temporal** que:

1. Toma la estructura tripartita de pm-1-1.json (6+ bloques con `sesiones_anchor`)
2. Toma los elementos de scope de pm-1-2.json (cada uno con `_consumed_by_pm` + `_produces_evidencia` + `_anclaje_matriz`)
3. Los expande a un blueprint sesión-a-sesión con traceability heredada literal
4. Cero invención · libertad LIMITADA del LLM (solo presentación + rationale temporal)

### §15.3 · Distribución sesiones HEREDADA (NO hardcoded)

v2.6 tenía estructura fija 8 sesiones. **v3.0 NO usa estructura fija.**

Cada sesión `Sn` del blueprint:
- Tiene `bloque_id_referencia` apuntando al bloque pm-1-1 que contiene `Sn` en `sesiones_anchor`
- Hereda `tipo_bloque` (APERTURA · APROPIACIÓN · TRANSFERENCIA)
- Sesiones APROPIACIÓN heredan `rap_target` del bloque

**Ejemplo IMARPOR-V2 (12 sesiones · CC):**

```
S1  ← B0 APERTURA (transversal)
S2,S3,S4 ← B1 APROPIACIÓN RA1
S5,S6 ← B2 APROPIACIÓN RA2
S7,S8 ← B3 APROPIACIÓN RA3
S9,S10 ← B4 APROPIACIÓN RA4
S11,S12 ← BT TRANSFERENCIA (capstone)
```

**Ejemplo Técnico (8 sesiones × 7.5h):**

```
S1     ← B0 APERTURA
S2-S7  ← B1-B4 APROPIACIÓN (4 RAPs · LLM distribuye en pm-1-1 v2.8)
S8     ← BT TRANSFERENCIA
```

**Ejemplo Tecnológico (16 sesiones):**

```
S1     ← B0 APERTURA
S2-S14 ← B1-B6 APROPIACIÓN (6 RAPs)
S15-S16 ← BT TRANSFERENCIA
```

### §15.4 · Tabla 3 schemas diferenciados por tipo_bloque (sesión)

| tipo_bloque sesión | Campos clave | Heredados de |
|---|---|---|
| **APERTURA** | `pms_destino_canon`, `actividades_planeadas` (4 spark + diagnóstico) · `transversal: true` · sin evidencias formales | pm-1-1.B0 + pm-1-2.B0 (materiales_spark · vocab_diagnostico · etc.) |
| **APROPIACIÓN** | `rap_target` · `pms_destino_canon` (subset 2.3-2.10) · `criterios_canon_evaluables_en_sesion` · `actividades_planeadas` con `_produces_evidencia` E1-E6 mapping | pm-1-1.B[N] + pm-1-2.B[N] (story_a_reading · story_b_listening · vocab · functions · grammar · tasks) |
| **TRANSFERENCIA** | `capstone: true` · `pms_destino_canon` ([PM-3.5]) · `actividades_planeadas` con `_produces_evidencia: E-Misión` + `subfase_abp` (1-5) | pm-1-1.BT + pm-1-2.BT (mission_brief · subfases_abp · materiales_simulacion · rubrica_capstone) |

### §15.5 · Heredancia automática traceability (REGLA 10 PM-2.0)

PM-2.0 v3.0 NO recrea metadata. SOLO copia literal de pm-1-2 a `_anclaje_matriz_heredado`:

```jsonc
{
  "actividades_planeadas": [
    {
      "ref_pm12_path": "sub_bloques_tripartitos[1].story_a_reading",
      "consumed_by_pm": "PM-2.3",            // literal copy de pm-1-2.story_a._consumed_by_pm
      "_produces_evidencia": "E1",           // literal copy de pm-1-2.story_a._produces_evidencia
      "_anclaje_matriz_heredado": { /* literal copy de pm-1-2.story_a._anclaje_matriz */ }
    }
  ]
}
```

**ZERO invención.** Si pm-1-2 tiene drift, PM-2.0 hereda drift (auditoría upstream resuelve).

### §15.6 · Workflow operacional Step 1.4

```
Input gates:
  ✓ pm-1-1.json v2.8+ (validado 9/9 PASS · estructura tripartita)
  ✓ pm-1-2.json v4.2+ (validado 6/6 PASS · scope diferenciado)
  ✓ pm-0-0-matriz-alineada.json v1.2+ (8 criterios canon)
  ✓ pm-0-context.json v3.2+ (universo)
        ↓
Trigger interno orchestrator (3 checks pre-dispatch):
  1. ¿pm-1-1 + pm-1-2 ambos validados PASS? Si NO → STOP
  2. ¿Mi prompt enfatiza HEREDANCIA + secuenciación temporal + libertad LIMITADA? Si NO → refactor
  3. ¿Mi prompt incluye 8 validation_checks BLOQUEANTES? Si NO → agregar
        ↓
Dispatch Agent PM-2.0 v3.0 (prompt anti-prescriptive · libertad LIMITADA)
        ↓
Output pm-2-0.json v3.0 maestro:
  ├─ programa metadata
  ├─ session_blueprint (N sesiones · cada una con tipo_bloque + actividades heredadas)
  ├─ evidencias_secuencia_temporal (E1-E6+E-Misión mapping ordenado)
  └─ validation_checks
        ↓
Validation 8/8 PASS:
  1-6 (preservados v2.6 re-formulados) · 7-8 (NEW v3.0)
        ↓
Si 8/8 PASS → Step 1.5 PM-2.x downstream cascade (PM-2.1-2.10 + PM-2.11 + PM-3.5)
```

### §15.7 · Trigger interno orchestrator (3 checks pre-dispatch)

ANTES de dispatchear Agent PM-2.0 v3.0:

1. **¿pm-1-1.json v2.8+ Y pm-1-2.json v4.2+ están validados PASS?**
   - Si NO → STOP · re-run upstream antes de PM-2.0

2. **¿Mi prompt al Agent contiene los 4 elementos canónicos v3.0?**
   - HEREDANCIA explícita (sesiones_anchor + pms_destino + _anclaje_matriz + _produces_evidencia)
   - SECUENCIACIÓN temporal (cómo distribuir actividades dentro de las 6h de cada sesión)
   - LIBERTAD LIMITADA explicita (vs PM-1.1/1.2 amplia)
   - Cero invención (LLM NO inventa distribución · NO inventa evidencias · NO inventa PMs preset)

3. **¿Mi prompt incluye 8 validation_checks como BLOQUEANTES?**
   - Si NO → agregar (especialmente checks 7-8 nuevos: tipo_bloque_consistente + traceability_heredada_completa)

### §15.8 · Caso operacional confirmado IMARPOR-V2 (pendiente Step 1.4.D dispatch)

**Input:**
- pm-1-1.json v2.8 v2 CORREGIDA · 6 bloques (B0+B1-B4+BT) · 9/9 PASS
- pm-1-2.json v4.2 v2 CORREGIDA · 1 meta + 6 sub_bloques · 6/6 PASS · 23 elementos productores
- matriz v1.3 CORREGIDA · 4 RAPs · 8 criterios canon · 8/8 PASS
- pm-0-context.json v3.2 · 21 keys · 44 anclajes · 7/7 PASS

**Output esperado pm-2-0.json v3.0:**
- 12 sesiones (S1-S12) · cada una con tipo_bloque + bloque_id_referencia + actividades_planeadas heredadas
- Evidencias_secuencia_temporal: E1@S3 · E2@S4 · E3@S5 · E4-parcial@S6 · E6@S6 · E4-final@S8 · E5@S9 · E-Misión@S12
- 8/8 validation_checks PASS

### §15.9 · Aplicabilidad cross-program

| Programa | Sesiones | Distribución heredada |
|---|---|---|
| IMARPOR-V2 (CC) | 12 | S1 / S2-S10 / S11-S12 |
| MGV (Tecnológico) | 16 | S1 / S2-S14 / S15-S16 |
| INGBAS4-2026 (CC) | 12 | S1 / S2-S10 / S11-S12 |
| INGBAS1-AGRO-2026 (CC) | 12 | S1 / S2-S10 / S11-S12 |
| Técnico ADSO (4 RAPs) | 8 | S1 / S2-S7 / S8 |

### §15.10 · Cascade impact downstream

PM-2.0 v3.0 alimenta a:
- **PM-2.1** (S1 APERTURA · consume `actividades_planeadas[type=spark]`)
- **PM-2.2** (S1 APERTURA · consume `actividades_planeadas[type=gap_analysis]`)
- **PM-2.3** (S3 APROPIACIÓN B1 · consume `actividades_planeadas[ref_pm12_path=*story_a_reading]` · produce E1)
- **PM-2.4** (S4 APROPIACIÓN B1 · consume `task_writing_derivada` · produce E2)
- **PM-2.5** (varias S APROPIACIÓN · consume `key_vocabulary_per_rap`)
- **PM-2.6** (S5 APROPIACIÓN B2 · consume `story_b_listening` · produce E3)
- **PM-2.8** (S6 + S8 APROPIACIÓN B2/B3 · consume `task_speaking_derivada` · produce E4)
- **PM-2.9** (S9 APROPIACIÓN B4 · consume `task_speaking_derivada` Role Carousel · produce E5)
- **PM-2.10** (varias S APROPIACIÓN · consume `grammar_items_per_rap`)
- **PM-2.11** (Row Assembler · agrega cols 1-11 GFPI-F-134 desde session_blueprint)
- **PM-3.5** (S11-S12 TRANSFERENCIA · consume `mission_brief + rubrica_capstone` · produce E-Misión)
- **PM-4.2** (S6 · consume `task_consolidacion_E6` · produce E6 Cuestionario S6)

### §15.11 · Memoria operacional referenciada

Pattern canonical PM-2.0 v3.0 documentado en master prompt PM-2.0 EXTENSIÓN v3.0 (REGLAS 7-15). Esta sección §15 documenta workflow operacional + cases canónicos + trigger interno orchestrator.

**Cuando dispatchear Agent PM-2.0 v3.0 en cualquier programa nuevo:**
1. Validar 4 input gates (pm-1-1 v2.8+ · pm-1-2 v4.2+ · matriz · contexto)
2. Aplicar 3 checks pre-dispatch (§15.7)
3. Construir prompt anti-prescriptive con énfasis HEREDANCIA (libertad LIMITADA)
4. Dispatchear Agent
5. Validar 8/8 checks PASS
6. Si PASS → Step 1.5 PM-2.x downstream cascade
