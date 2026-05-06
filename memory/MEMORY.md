# MEMORY.md · fpi-sena-factory · Knowledge Graph Compartido

> Mirror de Cowork memory snapshots al repo compartido. Versionado en git para que Claude Code pueda leer con REGLA 19 + REGLA 20.

## Cómo usar

- **Cowork** genera snapshots en sesión + mirror a este folder al cierre de sesión
- **Claude Code** lee este folder como input REGLA 19 (pre-flight contra canon vigente)
- **Sergio** revisa periódicamente · borrar/consolidar cuando aplique

## Convenciones

- 1 archivo por feedback / project / reference / user memory
- Frontmatter: `name · description · type · originSessionId · mirrored_from · mirror_date` (+ `consolidated_from[]` si fue merge)
- `MEMORY.md` (este archivo) es el índice rápido · 1 línea por entry · ~150 chars

## Entries (cronológico inverso · más reciente primero)

### 2026-05-07 · Bumps MED+LOW audit Fase A · cierre 100% (1 snapshot)

- [PM-3.1 v2.7 + PM-4.1 v2.7 · bumps MED+LOW audit Fase A cierre](feedback_pm31_pm41_bumps_med_low_2026_05_07.md) — 2 deudas audit Fase A cerradas · PM-3.1 MED bump (NEW §12 · alineación Outline → PM-3.2 v3.0 paradigm 2 capas · 4 sub-secciones SIOP+UbD+Krashen seeds + logística CAPA 2) + PM-4.1 LOW bump (NEW §11 · consumo `criterios_evaluacion[]` AC v3.x heredado · 5 sub-secciones + `_criterios_origen` field) · pattern NEW "heredancia explícita upstream→downstream con `_criterios_origen`" · refactor consistency only · backward compat 100%

### 2026-05-06 · Cleanup deudas viejas (#30 + #31) + Hito 4 (e) runtime regen (2 snapshots)

- [Deudas viejas #30 + #31 cerradas · skill packaging + IMARPOR probe gaps](feedback_deudas_viejas_30_31_cierre_2026_05_06.md) — 3 skills empaquetados `.skill` (fpi-sena-fase1/2/3) · script reusable `package_skill.sh` · GAP 1 regex relajada (run-id v3) · GAP 2 ya resuelto · GAP 3 cerrado para pm-0-context (schemas downstream EN PROGRESO via CC sub-tasks 2-4)
- [Runtime regen Camino B · 1er PASS empírico schema v3.4](feedback_runtime_regen_camino_b_2026_05_06.md) — Structured rebuild (vs LLM dispatch) · 41 errors → 0 errors post normalización canon-strict · pattern NEW canonizado · backward compat single-comp single-guide validada empíricamente

### 2026-05-05 · Mejoras #3 + #4 PM-0 · Cluster cascade post-cierre · skill loader (3 snapshots)

- [Skill loader expansion · fase2 + fase3 sync 24/24 PMs](feedback_skill_loader_expansion_2026_05_05.md) — `master_prompt_loader.py` fpi-sena-fase2 (13→17) + fase3 (drift severo → 24 PMs vigentes) · parser multi-formato 3 formatos · DEPRECATED detection · pattern NEW "skill loader sync cross-skill"
- [PM-0 v3.4.1 REGLA 14 mid-program awareness pedagógica estructural](feedback_pm0_regla_14_mid_program_awareness.md) — REGLA 14 NEW (7 sub-reglas) + Anexo D INFRATI G2 verbatim + validation_check 9 · schema v3.4 (5 conditional schemas) · iteración 1 audit cerró 2 HIGH + 1 MED · pattern NEW "string narrativo upstream → structured field downstream"
- [PM-0 schema v3.3.1 canonization · v4.0 spike replaced](feedback_pm0_schema_v331_canonization.md) — `v4/schemas/pm-0-context.schema.json` reescrito v3.3.1 (Camino A · 30 fields + 3 conditional schemas) · backup legacy preservado · wrapper script `validate-pm-0-context.sh` · pattern NEW "schema canon replacement con backup legacy"

### 2026-05-04 a 2026-05-06 · Cluster HIGH cascade PM-0 + PM-1.1 + PM-1.2 + cierre 100% (1 snapshot consolidado)

- [Cluster cascade HIGH bump · PM-0 + PM-1.1 + PM-1.2 + sesión 4/4 cierre 100%](feedback_cluster_cascade_pm0_pm11_pm12_2026_05_04_05.md) — 4 sesiones · REGLA 13 multi-comp NEW + REGLA 15 PM-1.1 heredancia + REGLA 18 PM-1.2 cross-comp + REGLA 18.7 evidence-before-canon · validación papel-y-lápiz cierre · 4 patterns canon emergentes NEW (auditor 6-pasos · disciplina 3-iter · heredancia is cheap · evidence before canon · validación papel-y-lápiz)

### 2026-05-04 · Framework canónico evaluación PMs (1 snapshot · post-audit Fase A)

- [PROCESS-PM-EVALUATION-CRITERIA v1.0 framework canónico](feedback_process_pm_evaluation_criteria_v1.md) — Master prompt NEW · 7 capas de criterios + PM Card schema YAML/Markdown + Anexo A verbatim PM-0.0 v2.3 · trigger T1-T5 · disciplina REGLA 19/20 + Anti-patrón #19 checklist · cross-PM cross-LLM aplicable

### 2026-05-04 · PM-0.0 paradigm shift completo · v1.2 → v2.3 (1 snapshot consolidado)

- [PM-0.0 paradigm shift v1.2 → v2.3 · 4 bumps · disciplina 3-iter validada](feedback_pm00_paradigm_shift_v2_a_v23_completo.md) — paradigm shift fusión bidireccional ESP · 7 secciones canon NEW · auditor anti-drift independiente · 3 iteraciones HIGH+MED+LOW+EXTRA · audit cerrado 0 deuda residual · derivado RECREACION G1+G2

### 2026-05-04 · Anti-patrón meta-arquitectónico (1 snapshot durable)

- [Anti-patrón #19 repetición no-canonizada](feedback_anti_patron_19_repeticion_no_canonizada.md) — paradigm shifts runtime aplicados pero NO canonizados al master · obligan reinventar instrucciones manuales en proyecto N+1 · meta-anti-patrón arquitectónico cross-PM

## Snapshots adicionales en Cowork memory privada (NO mirrored)

Los siguientes snapshots viven solo en `~/Library/Application Support/Claude/local-agent-mode-sessions/.../memory/` y NO están mirrored porque cubren temas anteriores ya estables o no afectan canon arquitectónico vigente. Si necesitan mirror, generar handoff específico:

- Sergio user profile · feedback REGLAs 19/20/21/canon Sergio · anti-patrones #11–#16 · pattern bundler · TRACEABILITY anclaje · PM-1.1 v2.8 tripartita · PM-1.2 v4.2 scope diferenciado · cadena pedagógica UbD · PM-2.0 v3.0 architect · Activity Card v3.0+ · PM-2.11 v3.1 · GFPI-F-134 V04 formato · PM-3.7 deprecated · PM-3.6 v3.7 · PM-3.2 v3.0 paradigm shift 2 capas · APRENDIZ-FACING shift · run fixtures map · repo layout reference

## Cross-references

- Master prompts canon: `master-prompts/`
- DM (single source of truth global): `master-prompts/DOCUMENTO MAESTRO ...md` (v3.28 actual)
- Audit reports: `audits/AUDIT-*.md` y `audits/VALIDATION-*.md`
- Handoffs cross-LLM: `handoffs/HANDOFF-YYYY-MM-DD*.md` y `handoffs/AUDIT-SCHEMAS-DOWNSTREAM-*.md`

---

*Mirror inicial 2026-05-04 · Consolidación 2026-05-06 (16→9 files · 4 patterns canon preservados) · solución estructural cross-LLM sync activa*
