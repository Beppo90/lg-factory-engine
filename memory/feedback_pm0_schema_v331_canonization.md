---
name: PM-0 schema v3.3.1 canonization · v4.0 spike replaced
description: v4/schemas/pm-0-context.schema.json reescrito v3.3.1 from scratch · reemplaza legacy v4.0 spike 2026-04-22 · backup preservado · 30 fields + 3 conditional schemas · 13 reglas + Anexo C codificadas · wrapper script + smoke test PASS · cross-LLM CC F2.8 alignment
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-05
---

**Decisión Sergio canon 2026-05-05 (Mejora #4 PM-0 · Camino A schema replacement)**

Tras cerrar cluster HIGH bump cascade 4/4 sesiones (PM-0 v3.3.1 + PM-1.1 v2.9 + PM-1.2 v4.3.1) · Sergio aprobó Mejora #4 · generar `v4/schemas/pm-0-context.schema.json` formal y completo (Camino A · replace legacy completamente).

**Contexto del problema:**

`v4/schemas/pm-0-context.schema.json` existía pero era **v4.0 spike del 2026-04-22** · pre-paradigm shift PM-0 v3.0 simplificación. Documentaba:
- 13 principios prescriptivos (deprecados · master vigente declara REGLA 2 = 5 maestros)
- 17 grupos gramaticales hardcoded (deprecados · REGLA 3 v3.0 anti-prescriptive)
- 22 ítems trazabilidad (deprecados · REGLA 5 v3.0 simplifica a 6)
- ZERO fields multi-comp v2.0 (paradigm shift posterior)
- ZERO traceability `_anclaje_matriz` (REGLA 12 posterior)

Resultado: schema v4 que **contradice** el master v3.3.1 vigente. Cualquier validation downstream usaría el schema obsoleto y aceptaría outputs deprecados como válidos.

**Camino A ejecutado:**

1. ✅ **Backup preservado:** `pm-0-context.schema.json.legacy-v4-spike-pre-paradigm` (11,294 bytes · referencia histórica · NO eliminado por canon disciplina REGLA 9)
2. ✅ **Schema NEW v3.3.1 from scratch:** 20,733 bytes · 30 property fields · 3 conditional schemas (allOf/if-then) · JSON Schema draft 2020-12
3. ✅ **Validación sintáctica:** PASS metaschema 2020-12 · jsonschema 4.26.0
4. ✅ **Validación operacional:** 4 fixtures históricos FAIL como esperado (drift documentado · NO drift master)
5. ✅ **Wrapper script:** `v4/scripts/validate-pm-0-context.sh` (mismo pattern que validate-pm-1-1.sh) · ajv-2020 · output formateado + drift hints
6. ✅ **Smoke-test wrapper:** ejecuta correctamente contra IMARPOR-CC-V2 · reporta 8 errors con mensaje "Drift expected · NOT a master-prompt bug"

**Cobertura canon REGLAS 1-13.7:**

| Regla | Schema field |
|-------|--------------|
| 1 INPUT | `_matriz_alineada_ref` (required + pattern) |
| 2 5 principios | `principios_pedagogicos_aplicables` (5≤items≤6) |
| 3 grammar libre | `grammar_focus_per_session` patternProperties (NO enum cerrado) |
| 4 8 fields esenciales | required array de 13 fields top-level |
| 5 trazabilidad 6 ítems | `validation_checks` minItems 6 |
| 6 CEFR único nivel | `cefr_subnivel_objetivo` enum 9 subniveles |
| 7 6 validation checks | enum names base 6 |
| 11 libertad LLM | `additionalProperties: true` · grammar libre |
| 12 `_anclaje_matriz` | required en personajes · principios · grammar · L1 · final_mission |
| 12 check 7 | enum incluye traceability_matriz_completa |
| 13.1-13.4 multi-comp | `_competencias_tecnicas_modo` enum + conditional allOf #1 |
| 13.3 CIERRE | `final_mission._anclaje_matriz.cierre_programa` + conditional allOf #3 |
| 13.5 Split A/B | `_split_strategy_heredado` con valor_canon enum [A,B] · conditional allOf #2 |
| 13.6 raps subset | `_raps_metadata` con count_esta_guia + count_total_programa · conditional allOf #2 |
| 13 check 8 | enum incluye multi_comp_compatibility |
| Anexo C INFRATI G3 | run_id pattern + competencia codes 9 dígitos |

**Hallazgo arquitectónico canon: drift creativo LLM REGLA 11 era pre-canon v3.2:**

Runtime IMARPOR-CC-V2 (v3.1 era) emitió field names creativos:
- `programa_essentials` en vez de canónico `programa`
- `universe_grounding` en vez de canónico `universo_narrativo`
- `pedagogical_compass` en vez de canónico `principios_pedagogicos_aplicables`

Esto fue **válido en v3.1** porque REGLA 11 declaraba libertad de field names. **Inválido en v3.3.1** porque REGLA 12 + schema strict ahora canonizan names obligatorios. Decisión arquitectónica: schema canon-strict · runs futuros DEBEN usar names canónicos · runs históricos FAIL validation por diseño (drift documentado).

**Pattern canon emergente: "schema replacement con backup legacy":**

Aplicable a cualquier schema downstream cuando paradigm shift en master deja schema obsoleto:
1. NO patch in-place (preservar canon historical)
2. Backup legacy con sufijo descriptivo (`.legacy-<era>-pre-<event>`)
3. Schema NEW from scratch desde master vigente
4. Validation sintáctica metaschema → operacional fixtures → wrapper smoke
5. Documentar drift fixture esperado en validation report

**Cross-LLM coordination CC F2.8 schema drift CI:**

CC Hito 3 cerrará validando master-prompts/ ↔ v4/schemas/. Cuando F2.8 corra post-bump:
- ✅ NO debe marcar drift entre PM-0 master v3.3.1 + schema v3.3.1 (alineados)
- ⚠️ Marcará otros 9+ schemas v2.0 NEW como drift residual (pendiente Hito 4)

**Aplicabilidad cross-PM:**

Pattern "schema canon replacement" replicable para:
- `pm-0-0-matriz-alineada.schema.json` (si existe spike legacy similar)
- `pm-1-1.schema.json` (v4.1 alineado)
- `pm-1-2.schema.json` (v4.1)
- `activity-card.schema.json` (v3.x cascade)
- `gfpi-f-134-row.schema.json` (V04 canon)

Cada bump master HIGH del paradigm shift family debería revisar si schema downstream necesita replacement vs in-place patch.

**Deliverables sesión:**

- `v4/schemas/pm-0-context.schema.json` v3.3.1 NEW (20,733 bytes)
- `v4/schemas/pm-0-context.schema.json.legacy-v4-spike-pre-paradigm` (11,294 bytes backup)
- `v4/scripts/validate-pm-0-context.sh` (6,012 bytes wrapper)
- `audits/VALIDATION-SCHEMA-PM-0-CONTEXT-2026-05-05.md` (validation report)
- `memory/feedback_pm0_schema_v331_canonization.md` (este snapshot)
- DM bump v3.26 → v3.27 (entrada Mejora #4)

**Deuda explícita (MED):**

- Regenerar `pm-0-context.json` IMARPOR-CC-V2 vía PM-0 v3.3.1 para tener 1 runtime PASS empírico
- Footnote en master PM-0 referenciando schema NEW location (post-bump menor)
- (Otros schemas similar drift) — auditar `pm-1-1.schema.json` etc. para patrón legacy v4.0 spike

*Sergio Cortés Perdomo 2026-05-05 · schema canonization cluster cierre · cross-LLM ready · listo Hito 4 CC bidireccional*
