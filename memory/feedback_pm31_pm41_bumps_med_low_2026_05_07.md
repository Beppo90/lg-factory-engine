---
name: PM-3.1 v2.7 + PM-4.1 v2.7 · bumps MED+LOW audit Fase A cierre
description: Cierre 2 deudas audit Fase A · PM-3.1 MED bump (alineación Outline → PM-3.2 v3.0 paradigm 2 capas · NEW §12 4 sub-secciones) + PM-4.1 LOW bump (canon refresh consumo `criterios_evaluacion[]` AC v3.x · NEW §11 5 sub-secciones) · ambos refactor consistency only · backward compat 100%
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-07
---

**Decisión Sergio canon 2026-05-07 (bumps MED+LOW audit Fase A · post Mejoras #3+#4 PM-0 + cluster cascade)**

Audit Fase A (2026-05-05) identificó 2 PMs con drift documental pendiente de cierre:
- PM-3.1 v2.6 · MED · 15 días drift pre-PM-3.2 v3.0 paradigm shift 2 capas (2026-05-03)
- PM-4.1 v2.6.5 · LOW · 16 días drift · master más viejo del sistema activo · pre-Activity Card v3.x (2026-05-02)

Ambos refactor consistency · NO paradigm shift · trabajo Cowork puro ~1h focused.

## PM-3.1 v2.6 → v2.7 · MED bump

**Trigger:** PM-3.2 v3.0 introdujo paradigm shift 2 capas (CAPA 1 PEDAGOGICAL ANCHORING + CAPA 2 PRACTICAL IMPLEMENTATION) que resuelve anti-patrón #18. PM-3.1 v2.6 quedó pre-paradigm · Outline emitía campos sin awareness de qué Capa downstream consume cada field.

**NEW §12 ALINEACIÓN PM-3.2 v3.0 · 4 sub-secciones:**

| Sub-sección | Cierre |
|-------------|--------|
| §12.1 | Outline campos alimentan CAPA 1 PEDAGOGICAL ANCHORING (SIOP · UbD · Krashen seeds) · `pm0_alignment_by_session.[Sn].grammar_groups_active` → SIOP comprehensible_input · `cefr_descriptor_focus` → Krashen i+1 brief · `pedagogical_shift_hooks` → UbD Stage 1/2 Evidence · `traceability_seed` → §5.x PM-0 anchor · `logistics_box.estrategia.tecnica_didactica` → SIOP strategies |
| §12.2 | Outline campos alimentan CAPA 2 PRACTICAL IMPLEMENTATION (logística · timeline · materials) · `logistics_box.ambiente` → CAPA 2 setup_section · `tiempo_total_min + tiempo_por_bloque` → CAPA 2 timeline · `materiales[]` → CAPA 2 checklist · `plan_b_contingencia` → CAPA 2 troubleshooting · `agrupacion[]` → CAPA 2 transitions |
| §12.3 | validation_check sugerido `pm31_to_pm32_heredancia_v3` (extensión PM-2.11 Check 14 pendiente) · verifica heredancia explícita upstream→downstream sin reinventar |
| §12.4 | Trade-off · refactor consistency only · backward compat 100% · subagente Python NO requiere refactor · runtime PM-3.2 v3.0 ya espera estos campos |

## PM-4.1 v2.6.5 → v2.7 · LOW bump

**Trigger:** Activity Card v3.0+ canonizó `criterios_evaluacion[]` derivados (2026-05-02 · Wave B regeneró 30 cards IMARPOR-V2). PM-4.1 v2.6.5 quedó pre-canon · documentaba derivación ad-hoc sin awareness de upstream Activity Cards heredancia.

**NEW §11 CONSUMO `criterios_evaluacion[]` HEREDADO · 5 sub-secciones:**

| Sub-sección | Cierre |
|-------------|--------|
| §11.1 | Heredancia upstream AC v3.x → PM-4.1 v2.7 · estructura `criterios_evaluacion[].{criterio, indicador}` consumed literal · cada instrumento declara `_criterios_origen` apuntando a Activity Card específica (fuente_pm + activity_card_id + ac_version + heredancia_directa flag) |
| §11.2 | Disciplina canon · NO alucinación · trazabilidad 1:1 · prohibido inventar/reformular/eliminar criterios · texto literal preservado solo formato visual ajustable |
| §11.3 | Backward compat AC legacy v2.7 (sin `criterios_evaluacion[]`) · best-effort desde `evidencia.criterio_evaluacion` legacy · marca instrumento `_status: legacy_ac_v2.7_pre_v3x` · alerta regeneración futura |
| §11.4 | validation_check sugerido `criterios_heredancia_ac_v3x` (BLOQUEANTE futuro) · verifica `_criterios_origen` MISSING · `heredancia_directa` true cuando AC v3.x · cross-check criterios literal |
| §11.5 | Aplicabilidad cross-PM downstream (PM-3.6 Sección 4 + Canon Shared Renderer + paquete físico) · trade-off refactor consistency only · 100% backward compat |

## Pattern canon emergente NEW · "Heredancia explícita upstream→downstream con `_criterios_origen`"

Aplicable cross-PM cuando hay derivación de canon upstream:
1. Cada output downstream declara `_criterios_origen` (o equivalente field) con metadata fuente
2. Trazabilidad 1:1 verificable post-output
3. Prohibido reformular/inventar contenido del upstream
4. Validation check verifica heredancia explícita
5. Backward compat con legacy upstream sin field (best-effort + status marker)

Replicable para: PM-3.6 Sección 4 (ya canon · usa criterios PM-4.1 literal) · cualquier downstream que consume criterios o saberes upstream.

## Status post-bumps · audit Fase A

| PM | Pre-bump | Post-bump | Acción |
|----|----------|-----------|--------|
| PM-3.1 v2.6 | PARTIAL · MED drift documental 15 días | ✅ PASS canon-validated · §12 NEW | DM v3.29 · memory snapshot |
| PM-4.1 v2.6.5 | PARTIAL · LOW drift documental 16 días | ✅ PASS canon-validated · §11 NEW | DM v3.29 · memory snapshot |

**Audit Fase A 100% cerrado:** post bumps · todos los PMs auditados (PM-0 + PM-0.0 + PM-1.1 + PM-1.2 + PM-3.1 + PM-3.2 + PM-3.6 + PM-3.7 + PM-4.1 + PM-4.2) están PASS canon-validated o marcados DEPRECATED apropiadamente.

## Trade-off ambos · refactor consistency only

- **NO paradigm shift** · ambos bumps documentan alineación con cambios upstream existentes
- **100% backward compat** · runtime existente (IMARPOR-V2 + DIESEL + MGV) sigue funcional
- **Subagentes Python NO requieren refactor** inmediato · canon refresh documental
- **Bandwidth eficiente** · ~1h Cowork puro · cierre completo deuda audit Fase A

## Aplicabilidad downstream

Cuando se ejecute Phase 3 cascade · PM-3.1 v2.7 emitirá Outline con scaffolds canónicos para CAPA 1 + CAPA 2 PM-3.2 v3.0 · validación empírica del pattern. Cuando PM-4.1 v2.7 corra contra AC v3.x · emitirá instrumentos con `_criterios_origen` heredancia plena.

## Deliverables sesión

- `master-prompts/PM-3.1 — Playbook Outline — Session Map.md` v2.6 → v2.7 (NEW §12 · 4 sub-secciones · entry CHANGELOG)
- `master-prompts/PM-4.1 — Instrumentos de Evaluación Formativa.md` v2.6.5 → v2.7 (NEW §11 · 5 sub-secciones · entry changelog YAML)
- `master-prompts/DOCUMENTO MAESTRO ...md` v3.28 → v3.29 (entrada bumps MED+LOW PM-3.1 + PM-4.1)
- `memory/feedback_pm31_pm41_bumps_med_low_2026_05_07.md` (este snapshot)

*Sergio Cortés Perdomo · 2026-05-07 · audit Fase A 100% cerrado · disciplina canon + refactor consistency*
