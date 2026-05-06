---
name: PM-0.0 paradigm shift v1.2 → v2.3 · 4 bumps · disciplina 3-iter por severidad validada end-to-end
description: PM-0.0 master bumpeado 4 veces (v2.0 paradigm fusión ESP · v2.1 3 HIGH · v2.2 3 MED · v2.3 LOW+EXTRA) · audit cerrado 0 deuda residual · canon "3-iteraciones bumps por severidad" validado · derivado RECREACION G1+G2 · cierra anti-patrón #19
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory · consolidated 2026-05-06
mirror_date: 2026-05-04 a 2026-05-06
consolidated_from:
  - feedback_pm00_v2_paradigm_shift_fusion_esp.md (2026-05-04)
  - feedback_pm00_v21_post_audit_3_high.md (2026-05-04)
  - feedback_pm00_v22_segunda_iteracion_med.md (2026-05-04)
  - feedback_pm00_v23_tercera_iteracion_low_extra.md (2026-05-04)
---

# PM-0.0 Paradigm Shift Completo · v1.2 → v2.3

Cluster de 4 bumps en 1 día (2026-05-04) · paradigm shift fusión bidireccional ESP + auditor anti-drift independiente + disciplina 3-iter por severidad validada end-to-end. Audit cerrado con **0 deuda residual** post v2.3.

## Iteración 0 · v1.2 → v2.0 · paradigm shift fusión ESP

Trigger: post-RECREACION G1+G2 + push arquitectónico pre-INFRATI · Sergio detectó pattern emergente runtime aplicado pero NO canonizado al master (anti-patrón #19).

**7 secciones canon NEW v2.0:**

1. **REGLAS F1-F6 Fusión Bidireccional ESP** (obligatorias)
   - F1: saberes_concepto formato `<inglés> · APLICADO al <saber técnico>`
   - F2: saberes_proceso formato `<proceso lingüístico> · APLICADO a <proceso técnico>`
   - F3: criterios_evaluacion formato `<criterio inglés> EN/AL <situación técnica>`
   - F4: cobertura ≥80% técnico (procesos + saberes)
   - F5: distribución por RAP por dimensión (receptivo · productivo · interactivo · avanzado reflexivo)
   - F6: cero personajes nominados + cero jerga interna en aprendiz-facing

2. **Distribución Multi-Guía por Complejidad CEFR (Opción B canon default)**
   - Guía 1 (A1.1) = receptivo (COMPRENDER · RECONOCER) + descriptivo básico
   - Guía 2 (A1.2/A1.3) = productivo (PRESENTAR · EXPLICAR · INTERCAMBIAR)
   - Guía 3 (A1.3/A2.0) = avanzado (DISCUTIR · IMPLEMENTAR mejoras)
   - Aplicabilidad 2/3/4+ guías

3. **Anclaje Natural CEFR**
   - A1.1 ancla: objetos físicos · lugares · roles · funciones rutinarias · planos básicos
   - A1.2 ancla: procedimientos · descripciones extendidas · interacciones laborales formales
   - A1.3 ancla: marcos legales · normas técnicas · soluciones a problemas · acciones de mejora
   - A2.0+ ancla: análisis estadístico · gestión de proyectos · negociación avanzada

4. **Schema NEW `contenido_tecnico_crudo`** (1 competencia simple O multi-competencias array)
   - Si N=1 → schema legacy con `competencia_tecnica_codigo`
   - Si N≥2 → schema NEW `competencias[]` array con sub-bloques per competencia
   - `_anclaje_fusion_bidireccional` mapping ejemplos guía

5. **Schema NEW `_v2_audit_anclaje_tecnico`** (auditoría obligatoria)
6. **Deuda Explícita cross-cascade** (G1 → G2 → G3 schema `_deuda_explicita_para_guia_siguiente`)
7. **Anti-patrón #19 documentado en master**

DM v3.16 bump.

## Iteración 1 · v2.0 → v2.1 · 3 HIGH del audit anti-drift

Auditor LLM Agent independiente dispatched post-bump · veredicto PARTIAL · 3 HIGH:

| Severidad | Issue | Cierre v2.1 |
|-----------|-------|-------------|
| HIGH 1 | F1.1 concordancia género ES↔EN missing | F1.1 NEW: validación concordancia género/número formato ESP fusión |
| HIGH 2 | Schema OUTPUT 13 fields incompleto | Schema actualizado v2.1 · 13 fields documentados explícitamente |
| HIGH 3 | Heurística split RAPs A/B Bloom no documentada | REGLA F5.1 NEW: Split A (secuencial equilibrado · default canon) · Split B (por complejidad pedagógica · INFRATI especial) |

**Pattern canonizado:** auditor anti-drift post-bump 6 pasos (lee master + lee runtimes ref + grep cobertura · busca contradicciones · categoriza HIGH/MED/LOW · genera report estructurado). Aplicable cross-PM.

## Iteración 2 · v2.1 → v2.2 · 3 MED del audit

Iteración disciplina por severidad · canoniza pattern "bumps incrementales por severidad":

| MED | Issue | Cierre v2.2 |
|-----|-------|-------------|
| MED 1 | validation_checks count y check id 13 NEW (deuda explícita) | check 13 `deuda_explicita_emitida` BLOQUEANTE cuando G < N |
| MED 2 | CHANGELOG erratum cobertura | CHANGELOG bumped · entrada erratum corregida |
| MED 3 | raps_count semantics subset-por-guía vs total programa | raps_count_esta_guia + raps_count_total_programa documentados separados |

## Iteración 3 · v2.2 → v2.3 · LOW + EXTRA · audit cerrado 0 deuda

| LOW | Issue | Cierre v2.3 |
|-----|-------|-------------|
| LOW 1 | REGLA 3.1 NEW overlap pedagógico saberes_conceptos cross-RAP (3 criterios C-OVL-1+2+3) | REGLA 3.1 + tabla overlap canon |
| LOW 2 | Anti-patrón #19 7-item checklist auditable PASS/FAIL ejecutable post-runtime | Checklist canonizado · ejecutable Python |
| EXTRA | Anexo B RA1 RECREACION G1 verbatim como ejemplo de oro | Anexo B NEW · 5KB ejemplo runtime |

**Veredicto final post-v2.3:** ✅ audit anti-drift 0 deuda residual.

## Patterns canon emergentes validados

1. **"Disciplina 3-iter por severidad":** HIGH iter 1 · MED iter 2 · LOW+EXTRA iter 3 · cada iter genera bump menor (v2.0 → v2.1 → v2.2 → v2.3) hasta 0 deuda residual. **Aplicable cross-PM** · validado posteriormente en cluster cascade PM-0/PM-1.1/PM-1.2.

2. **"Auditor anti-drift independiente 6-pasos":** dispatch LLM Agent independiente post-bump · 6 pasos estructurados · genera PARTIAL/PASS veredicto + categorías HIGH/MED/LOW · disciplina iterativa hasta cierre.

3. **"Anti-patrón #19 cierre":** paradigm shifts runtime aplicados DEBEN canonizarse al master prompt · NO solo en runtime · evita reinventar instrucciones manuales en proyecto N+1.

4. **"Anexos verbatim como ejemplos de oro":** runtime real (RECREACION G1 RA1) preservado verbatim en master prompt como referencia operacional · pattern cross-PM (luego replicado en Anexo C INFRATI G3 PM-0 · Anexo D INFRATI G2 PM-0).

## Aplicabilidad downstream

PM-0.0 v2.3 es **fundación canon** que cascade a:
- PM-0 v3.3+ (consume matriz alineada upstream · activa REGLA 13 multi-comp si `competencias[]`)
- PM-1.1 v2.9 (hereda canon distribución multi-guía + Split A/B · REGLA 15 NEW)
- PM-1.2 v4.3 (hereda canon multi-comp · REGLA 18 cross-comp unificado)
- PM-2.x downstream (cascade Activity Cards multi-comp aware)

DM bumps: v3.16 (v2.0) · v3.17-v3.19 (v2.1+v2.2+v2.3 chain).

*Sergio Cortés Perdomo · 2026-05-04 paradigm shift PM-0.0 cluster · canon disciplina 3-iter validado end-to-end · cross-LLM mirror activado*
