---
name: PM-0 v3.4.1 REGLA 14 mid-program awareness pedagógica estructural
description: PM-0 v3.3.1 → v3.4 → v3.4.1 · REGLA 14 NEW (7 sub-reglas) + Anexo D INFRATI G2 verbatim + validation_check 9 NEW + schema v3.4 conditional #4+#5 · cierra gap pedagógico intermedio inter-guía · ortogonal REGLA 13 multi-comp · iteración 1 audit cerró 2 HIGH (parser split_strategy + Anexo D G3 multi-comp) + 1 MED (guard rails apertura non-única) · cluster cascade Mejora #3 cierre
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-05
---

**Decisión Sergio canon 2026-05-05 (Mejora #3 PM-0 · REGLA 14 mid-program awareness · cluster cascade post-Mejora #4)**

Tras cerrar Mejora #4 (schema NEW v3.3.1 · DM v3.27) · Sergio aprobó Mejora #3 · canonizar REGLA 14 NEW para cerrar gap pedagógico estructural mid-program (1 < k < N).

**Contexto del problema:**

PM-0 v3.3.1 manejaba correctamente:
- **G1 of N (apertura):** default · LLM diseña sin contexto previo
- **G_n of N CIERRE:** REGLA 13.3 `cierre_programa: true` integra N comps

PERO el caso intermedio (1 < k < N) quedaba sin canon explícito. Resultado:
- PM-0 G_intermedia podía simular CIERRE PROGRAMA prematuramente
- Repetir saberes de G_anteriores
- Abrir Bloom retrocediendo (drift cognitive load)

**Evidence empírico Bloque 1 pre-flight INFRATI G1+G2+G3:**

PM-0.0 v2.x emite `programa_metadata.split_strategy.descripcion_completa` con awareness inter-guía completa como prosa narrativa:

> "G1 = RA6 (COMPRENDER receptivo) + RA3 (EXPLICAR descriptivo) · G2 = RA2 (PRESENTAR procedural) + RA4 (INTERCAMBIAR interactivo) · G3 = RA1 (DISCUTIR argumentativo) + RA5 (IMPLEMENTAR reflexivo) · CIERRE programa"

Este string contiene la awareness pedagógica estructural completa pero queda atrapado como prosa. PM-0 lo recibe pero NO lo estructura.

**REGLA 14 cierra el gap convirtiendo string→field structured:**

7 sub-reglas canónicas:
- **14.1 · Detección automática + parser canónico:** `detectar_position_programa()` + `parse_split_strategy()` (cierra HIGH 1 audit · contrato I/O string→objeto)
- **14.2 · Heredancia saberes anteriores:** lee runtime matrices G1..G(k-1) · fallback a parser string
- **14.3 · Heredancia saberes posteriores:** lee runtime G(k+1)..GN · fallback split_strategy
- **14.4 · Anti-conclusion premature flag:** `NOT es_cierre AND NOT es_unica` · cubre apertura non-única + intermedia (extendido post-MED audit)
- **14.5 · Bloom progression recommendation:** L_{k-1} → L_k monotónico
- **14.6 · validation_check 9 NEW `bloom_progression_monotonica`:** BLOQUEANTE
- **14.7 · Schema NEW field `_position_programa`:** top-level · CONDICIONAL cuando total_guias > 1

**Pattern emergente NEW canon · "string narrativo upstream → structured field downstream":**

Aplicable cross-PM cuando upstream emite prosa rica con info estructural:
1. Identificar string upstream con awareness encapsulada (e.g., `split_strategy.descripcion_completa`)
2. Definir parser canónico que extrae structured fields (regex + segmentación)
3. Documentar fuente (`_fuente: "parser_canon_v3.4_string"`)
4. Mantener forward compat (si upstream futuro emite objeto · retornar as-is)
5. Schema canon-strict consume el structured field · NO el string

Este pattern es valioso porque PM-0.0 cumple REGLA 11 (libertad LLM · prosa narrativa rica) PERO downstream PMs necesitan structure determinista. El parser canónico es el bridge.

**Iteración 1 audit cerró:**

| Severidad | Issue | Cierre |
|-----------|-------|--------|
| HIGH 1 | Drift contrato I/O · `split_strategy` STRING runtime vs OBJECT schema | Parser `parse_split_strategy()` canon en REGLA 14.1 · regex `^([AB])` + segmentación `·` |
| HIGH 2 | Anexo D.1 G3 `competencias_tecnicas_pendientes` subdimensiona multi-comp real (G3 INFRATI = ambos códigos 220501086+220501103 · canon `cierre_programa: true` integra todos) | Anexo D.1 corregido · `["220501086", "220501103"]` + nota `_nota_multi_comp` clarificadora |
| MED | REGLA 14.4 guard rails sólo activos cuando `es_intermedia` · faltaba apertura non-única (G1 de programa multi-guía tampoco cierra) | Extendido a `NOT es_cierre AND NOT es_unica` + tabla caso edge `guide_total === 2` |

LOW residuales documentados como deuda explícita post-bump:
- Bloom plateau (lvl_act === lvl_ant) PASS check 9 (espíritu "creciente" laxo)
- `parse_level()` no maneja `"L0"` explícitamente
- Anexo D.1 verbos cognitivos G3 inferidos desde G2 fuente · clarificar fallback canon

**Ortogonalidad REGLA 14 vs REGLA 13 (multi-comp):**

| Eje | REGLA 13 | REGLA 14 |
|-----|----------|----------|
| Detecta | Cuántas comps técnicas (1 vs N≥2) | Posición temporal (G_k of N) |
| Activa | `competencias[]` tiene N≥2 | `total_guias > 1` |
| Field | `_competencias_tecnicas_modo` | `_position_programa` |
| Check | check 8 multi_comp_compatibility | check 9 bloom_progression_monotonica |

**Composición INFRATI G2:** ambas activas simultáneamente · NO duplican sub-fields · top-level paralelos.
**Composición INFRATI G3 (CIERRE):** REGLA 13.3 prima · REGLA 14 parcial (solo `saberes_acumulados_g_anteriores`) · 14.4 guard rails DESACTIVADOS porque es cierre real.

**Cobertura cross-PM downstream (cascade impact gradual):**

| PM downstream | Uso `_position_programa` |
|---------------|--------------------------|
| PM-1.1 | macrotemáticas G_k NO repiten G_anteriores |
| PM-1.2 | curación fuentes per RAP NO duplica G_anteriores |
| PM-2.0 | Session blueprint G_k abre Bloom donde G(k-1) cerró |
| PM-2.x ACs | actividades referencian saberes G_anteriores como prerequisito |
| PM-3.5 final_mission | scope mid · NO simula CIERRE si es_intermedia |
| PM-3.6 GFPI-F-135 | Sección 1 contexto "Esta es G_k of N" para aprendiz |

REGLAS 14.x propagan gradualmente · field legible-opcional ahora · obligatorio en bumps PM-1.1/1.2/2.0 posteriores (deuda explícita).

**Pre-flight INFRATI evidence (Bloque 1):**

| Hallazgo | Evidence |
|----------|----------|
| Bloom monotónica creciente | G1 (L2 COMPRENDER+EXPLICAR) → G2 (L3 PRESENTAR+INTERCAMBIAR) → G3 (L4-5 DISCUTIR+IMPLEMENTAR) |
| CEFR escalado | A1.1 → A1.2 → A1.3 verbatim split_strategy |
| RAPs explícitos per guía | G1=RA6+RA3 / G2=RA2+RA4 / G3=RA1+RA5 |
| Structured awareness CIERRE existente | `_cobertura_total_programa.cobertura_acumulada_g1_g2_g3` con %s per guía |
| Gap intermedia | G2 NO tiene field análogo declarando "G1 cubrió antes · G3 cubrirá después" |

**Deliverables sesión:**

- `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md` v3.3.1 → v3.4.1
- `v4/schemas/pm-0-context.schema.json` v3.3.1 → v3.4 (5 conditional schemas)
- `v4/scripts/validate-pm-0-context.sh` (header bump cosmético)
- `audits/PM-0-AUDIT-REGLA-14-2026-05-05.md` (audit anti-drift independiente · veredicto PARTIAL → PASS post-iteración 1)
- `memory/feedback_pm0_regla_14_mid_program_awareness.md` (este snapshot)
- DM v3.27 → v3.28 (entrada Mejora #3 + Iteración 1)
- `master-prompts/REGLA-14-DRAFT.md` outputs/ scratch (preserve histórico drafting Bloque 2 · NO copiar a repo final)

**Validación schema runtime:**

- Mid-program example INFRATI G2 simulado: ✅ PASS estructural
- Conditional #4 (es_intermedia → saberes_acumulados required): ✅ PASS detección
- Conditional #5 (NOT cierre AND NOT unica → cierre_programa=false): ✅ PASS detección
- Backward compat IMARPOR-CC-V2 single-guide: ✅ PASS (NO impone `_position_programa`)

**Cluster cascade Mejora #3 + Mejora #4 = 2 mejoras PM-0 cerradas en 1 día:**

| Mejora | Status | DM | Schema |
|--------|--------|-----|--------|
| #4 Schema formal | ✅ Cerrada | v3.27 | v3.3.1 NEW |
| #3 REGLA 14 mid-program | ✅ Cerrada (iter 1) | v3.28 | v3.4 |

*Sergio Cortés Perdomo 2026-05-05 · cluster Mejoras #3+#4 PM-0 cerrado · readiness operacional · listo cascade downstream PM-1.1/1.2/2.0 cuando se decida*
