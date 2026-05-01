# CHANGELOG — IMARPOR-CC-2026-04-30-V2

## Programa: Inglés Marítimo y Portuario · Curso Complementario · 100h
**Run:** IMARPOR-CC-2026-04-30-V2
**Tipo:** Re-run desde Phase 1 con análisis fresh + paradigm shift PM-0.0
**Sector:** Marítimo y portuario · Puerto Antioquia · Eje Bananero
**Sub-sector:** Banana / fruta refrigerada · cold chain
**CEFR:** A1.2 → A2.1 progresivo
**Instructor:** Sergio Leonardo Cortés · Diana Rocío Samboni

---

## SESIÓN 2026-05-01 — MARATÓN PARADIGM SHIFT PM-0.0

### Decisión arquitectónica fundamental (Sergio Cortés)

Sergio detectó que el sistema diseñaba "de adentro hacia afuera" en teoría (DM declaraba UbD desde v2.0) pero en práctica reconstruía la matriz GFPI-F-134 retroactivamente en PM-2.11 (al final de Fase 2). Implementó NEW PM-0.0 "Matriz Pedagógica Alineadora" como PRIMER subagente del pipeline.

### Workflow ejecutado · 8 hitos maratón ~6h

| Hito | Output | Commit |
|---|---|---|
| 1 | Confirmar arquitectura (naming · output schema dynamic · cascade impact) | — |
| 2 | NEW master prompt PM-0.0 v1.0 (509 lines · 7 REGLAS · 7 validation_checks) | `59489c1` |
| 3 | PM-0 v1.1 → v3.0 simplificado (1077 → ~270 lines operacionales · 5 principios maestros · libertad LLM) | `b57fff2` |
| 4 | DM v2.7 → v3.0 + NEW PLAN-FASE-1-ARQUITECTURA v1.0 (272 lines) | `f1b355f` |
| 5 | subagente_pm_0_0_matriz.py + preparar_bundle_phase0() helper · master_prompt_loader sync | `3f45cfd` |
| 6 | form-schema-pm0-pm11.json bump v3.0 + skill fpi-sena-fase1 EXTENSIÓN v3.0 | `3d53b20` |
| 7 | Test E2E IMARPOR-CC-V2 · 7/7 REGLAS PASS · pm-0-0-matriz-alineada.json generado | (este commit) |
| 8 | CHANGELOG + memory snapshot paradigm shift + commit final | (este commit) |

### Artefactos del run

| Archivo | Status | Tamaño | Descripción |
|---|---|---|---|
| `IMARPOR-CC-input.xlsx` | ✅ Reused | 20 KB | Form xlsx Sergio (Opción A · reused desde V1) |
| `pm-0-0-input.json` | ✅ NEW | 5.6 KB | Sergio dictó directo · 4 RAPs + 26 saberes + 10 procesos + 5 criterios |
| `pm-0-0-matriz-alineada.json` | ✅ NEW v1.0 | 16.4 KB · 21 keys | **Output canon PM-0.0** · matriz alineada 7/7 REGLAS PASS |
| `pm-0-context-input.json` | Reused | 3 KB | Legacy del V1 (referencia) |
| `pm-0-context.json` | Pending re-gen | 36 KB · 41 keys | Generado pre-paradigm shift · debe regenerarse v3.0 con matriz alineada como input |
| `pm-0-context.md` | Pending re-gen | 9.3 KB | Idem |
| `pm-1-1-input.json` | Reused | 5 KB | Legacy del V1 |

### Distribución alineación matriz (PM-0.0 output)

| RAP | Verbo | Saberes Conceptos | Saberes Proceso | Criterios |
|---|---|---|---|---|
| RA1 | RECONOCER | 6 (UNIT 1-2 vocabulario básico + crew) | 2 | 1 |
| RA2 | COMPRENDER | 4 (UNIT 5 SMCP · message markers · spelling) | 3 | 2 |
| RA3 | APLICAR | 8 (gramática transversal UNITS 1-4) | 3 | 1 |
| RA4 | DESCRIBIR | 9 (UNITS 3-4 places · cargo · maneuvering + commands) | 3 | 1 |
| **Total** | — | **27** (1 overlap) | **11** (1 overlap) | **5** |

**Overlaps documentados:**
- `MODAL VERBS` → RA3 (regla gramatical) ↔ RA4 (speech acts descriptivos)
- `EXPRESAR E INTERPRETAR ÓRDENES` → RA3 (imperative aplicado) ↔ RA4 (acto descriptivo del rol)

### Validation independiente 7/7 PASS (anti-patrón #14)

| REGLA | Resultado | Evidencia |
|---|---|---|
| 1 · Verbo cognitivo | ✅ 4/4 alineados | RECONOCER/COMPRENDER/APLICAR/DESCRIBIR consistente |
| 2 · Cobertura 100% | ✅ 0 huérfanos | 26/26 + 10/10 + 5/5 |
| 3 · Overlaps documentados | ✅ 2 documentados | rationale pedagógico explícito |
| 4 · Verbatim RAPs | ✅ 4/4 match | rap_titulo literal del input |
| 5 · Rationale 50-200 words | ✅ 4/4 in range | RA1=132 · RA2=128 · RA3=155 · RA4=134 |
| 6 · Orden secuencial | ✅ Respected | RA1<RA2<RA3<RA4 |
| 7 · Dynamic raps_count | ✅ Match input | 4 == 4 |

### Estado actual · Phase 0 cerrada

```
✅ Phase 0 (NEW · PM-0.0 paradigm shift) · COMPLETO · Gate 0 pendiente Sergio
⏳ Phase 1 (PM-0 v3.0 + PM-1.1 + PM-1.2) · pending re-run con matriz alineada
⏳ Phase 2 (PM-2.x ACs + PM-2.11) · pending
⏳ Phase 3 (PM-3.1 + PM-3.2 + PM-3.5 + PM-4.1 + PM-4.2) · pending
⏳ Phase 4 (PM-3.3 + PM-3.4 + PM-3.6 + PM-3.7) · pending
```

### Versions canónicas usadas

| PM | Versión vigente |
|----|----------------|
| **PM-0.0** | **v1.0 NEW** (paradigm shift) |
| **PM-0** | **v3.0 simplificado** |
| PM-1.1 | v2.7.1 (sin cambios) |
| PM-1.2 | v4.1 (sin cambios) |
| PM-2.x · 3.x · 4.x | sin cambios estructurales · cascade light planeado |

### Diff vs IMARPOR-CC-2026-04-27 (V1)

| Aspecto | V1 | V2 |
|---|---|---|
| Phase 0 | ❌ NO existía PM-0.0 | ✅ PM-0.0 v1.0 ejecutado |
| Sub-sector | Contenedores generales · Buenaventura | Banana / cold chain · Puerto Antioquia |
| Avatar aprendiz | Andrea Mosquera (F · Ops Trainee) | Manuel Padilla (M · Reefer Operator + Cold Chain Tech) |
| Personajes | Capitán Restrepo · Captain Lopera | Carolina Vélez (Pilot) · Hernando Ospina (Safety) · Mariana Suárez (Cold Chain + ICA) |
| Cliente externo | Captain Lopera (BUENAVENTURA EXPRESS · contenedores) | Captain Lim Wei-Ming (MV CARIBBEAN STAR · Star Reefers · 9,200 DWT · 580 reefer plugs) |
| Final Mission | Coordinación tripartite VHF · Berth 4 | Pre-Departure Banana Reefer Compliance + Tripartite Handover |
| Tono pedagógico | Concentrado-disciplinado | Colaborativo · debrief circles · peer-pilot rotaciones · stand-down ritual |
| Matriz alineada | Reconstruida retroactivamente PM-2.11 (final Phase 2) | **Alineada explícitamente Phase 0 (PM-0.0)** |

---

## REFERENCIA OPERACIONAL · IMARPOR-CC-V2 ES GROUND TRUTH PM-0.0 v1.0

A partir de esta sesión 2026-05-01 · `runs/IMARPOR-CC-2026-04-30-V2/pm-0-0-matriz-alineada.json` se vuelve **referencia operacional canon** para PM-0.0 v1.0 · primer ejemplar de paradigm shift Phase 1.

Futuros programas (DIESEL upgrade · MGV completion · INGBAS4 · INGBAS1-AGRO · etc.) consumen este como ref op.

---

*CHANGELOG IMARPOR-CC-2026-04-30-V2 · Última actualización 2026-05-01 · Maratón PARADIGM SHIFT PM-0.0 completado · 8 hitos · ~6h · 7/7 REGLAS PASS*
