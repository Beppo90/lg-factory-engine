# VALIDATION REPORT · Runtime regen IMARPOR-CC-V2 · 1er PASS empírico schema v3.4

**Fecha:** 2026-05-06
**Trigger:** Hito 4 opción (e) · convergencia cross-LLM con CC sub-tasks 2-4
**Camino:** B (structured rebuild · NO LLM dispatch)
**Status:** ✅ **PASS empírico** · primera fixture canon-conforme post Mejoras #3+#4

---

## 1. Resumen ejecutivo

Cluster cierre 4/4 (2026-05-05) documentó **3 drift fixture** en runtimes históricos como deuda regenerable. Esta sesión cierra **1 de 3** mediante structured rebuild Camino B · genera primer runtime PASS empírico contra schema v3.4 NEW (Mejora #4) post-Mejora #3 REGLA 14.

**Resultado:** `runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json` conforme a schema v3.4 canon-strict · 0 errors · backup legacy preservado.

## 2. Trabajo ejecutado · Camino B structured rebuild

| Step | Acción | Resultado |
|------|--------|-----------|
| 1 | Pre-flight runtime actual (v3.1 era · 21 keys non-canon) + matriz alineada upstream (v1.0 era · single-comp single-guide) | ✅ |
| 2 | Backup legacy → `pm-0-context.json.legacy-v3.1-pre-mejora-4` | ✅ |
| 3 | Script `rebuild_imarpor_v2.py` · transformación determinista non-canon → canon | ✅ |
| 4 | Field renames: `programa_essentials` → `programa` · `universe_grounding` → `universo_narrativo` · `pedagogical_compass.principios` → top-level · `grammar_focus_canon_aligned` → `grammar_focus_per_session` · `l1_policy_canon_aligned` → `l1_policy_per_session` | ✅ |
| 5 | Metadata v3.4 NEW: `_competencias_tecnicas_modo: single-comp-legacy` · `_n_competencias_tecnicas: 1` · validation_checks 8+9 con status `N/A` | ✅ |
| 6 | Normalización canon-strict patterns: `raps_que_atraviesa` (RA{n} extraído de "RA1 RECONOCER") + `criterios_especificos_que_evalúa` (C0X extraído de "C01 RAP-01 A1.2") | ✅ |
| 7 | Validación final via `validate-pm-0-context.sh IMARPOR-CC-2026-04-30-V2` | ✅ **VALID** |

## 3. Iteración técnica · 41 errors → 0 errors

Primera ejecución del rebuild produjo 41 errors de pattern mismatch:

```
/universo_narrativo/personajes/N/_anclaje_matriz/raps_que_atraviesa/M
  must match pattern "^RA[0-9]+$"
  got: "RA1 RECONOCER"

/universo_narrativo/personajes/N/_anclaje_matriz/saberes_que_modela/M
  must match pattern "^RA[0-9]+\.(SC|SP)\.[0-9]+.*$"
  got: "UNIT 1 PARTS OF THE SHIPS"
```

**Causa raíz:** matriz upstream v1.0 era IMARPOR-V2 emite saberes como descripciones libres ("UNIT 1 PARTS OF THE SHIPS") · NO codes canon (`RA1.SC.1`). Schema v3.4 enforce strict regex.

**Iteración 1 fix:** normalización determinista:
- `raps_que_atraviesa`: regex `^RA[0-9]+` extrae prefijo numérico · descarta sufijo descriptivo
- `saberes_que_modela`: filter por regex `^RA[0-9]+\.(SC|SP)\.[0-9]+` · empty array si upstream no tiene codes canon · descripciones legacy preservadas en `_saberes_descriptivos_legacy[]` (non-canon field)
- `criterios_especificos_que_evalúa`: regex `^C0[1-8]` extrae code

**Resultado:** 41 → 0 errors · validation PASS.

## 4. Stats fixture regenerada

| Sección | Cantidad |
|---------|----------|
| Top-level fields | 26 |
| Personajes | 8 (todos con `_anclaje_matriz` REGLA 12) |
| Principios pedagógicos | 6 (5 maestros + P6 emergente sectorial) |
| Grammar focus per session | S1-S12 (12 sesiones) |
| L1 policy bands | 4 (S1-S3 30% · S4-S6 20% · S7-S9 10% · S10-S12 0%) |
| Evidencias mapping | 8 (E1-E6 + E4parcial + E-Misión) |
| Validation checks | 9 (7 PASS + 2 N/A para REGLAS 13/14) |

## 5. Hallazgos arquitectónicos

### 5.1 Single-comp single-guide es path simple para schema v3.4

IMARPOR-CC es `total_guias: 1` + `single-comp-legacy` · ningún conditional schema NEW v3.3.1/v3.4 se activa:
- ❌ multi-comp conditional (REGLA 13) → no aplica
- ❌ multi-guía conditional (REGLA 13.5/13.6) → no aplica
- ❌ mid-program conditional (REGLA 14) → no aplica
- ❌ CIERRE PROGRAMA conditional → no aplica

**Schema v3.4 conserva backward compat 100% para single-comp single-guide legacy** · validado empíricamente.

### 5.2 Pattern emergente NEW · "structured rebuild Camino B vs LLM dispatch"

Para regen de fixtures contra schema-strict canon:
- **Camino B (structured rebuild):** transformación determinista field rename + normalization + metadata add · ~30 min · preserva contenido creativo · útil cuando solo se necesita validar conformancia
- **Camino A (LLM dispatch):** Agent re-ejecuta master prompt completo · ~2-3h · genera contenido nuevo · útil cuando contenido original tiene drift de calidad

**Trade-off:** Camino B es más rápido pero pierde la oportunidad de mejorar contenido. Para "1 runtime PASS empírico" · Camino B es suficiente. Para regeneración profunda · Camino A.

### 5.3 Drift descriptivo upstream · descripciones legacy preservadas

Matriz alineada IMARPOR-V2 v1.0 era emitía saberes como descripciones libres ("UNIT 1 PARTS OF THE SHIPS"). Estas son **valor pedagógico genuino** · NO drift desechable. La normalización las preserva en `_saberes_descriptivos_legacy[]` (non-canon field) para no perder info aunque el canon strict requiera codes.

Esto implica que cuando se regenere matriz alineada IMARPOR-V2 vía PM-0.0 v2.3 (Camino A · paradigm shift completo) · se debe asignar codes formales `RAn.SC.k` a estas descripciones existentes.

## 6. Cross-LLM coordination status

| Sistema | Detección post-rebuild |
|---------|------------------------|
| Cowork validation runtime (este trabajo) | ✅ 1 fixture PASS (IMARPOR-V2) · 2 fixtures pending (RECREACION G2 · INFRATI G3) |
| CC F2.8 schema drift CI | ✅ master ↔ schema alineados (Mejoras #3+#4) |
| CC sub-tasks 2-4 (en progreso) | 🔄 schemas pm-1-2 + activity-card + gfpi-f-134-row pendientes (audit doc Cowork ya entregado) |

**Convergencia cross-LLM esperada al cierre día:**
- Cowork: 1 runtime PASS empírico ✅ (este reporte)
- CC: 4 schemas alineados con master prompts vigentes
- = `master-prompts/` ↔ `v4/schemas/` ↔ `runs/IMARPOR-V2/*` triángulo coherente

## 7. Deuda explícita post-cierre

**Regenerar 2 fixtures restantes** (LOW · futura sesión):
- `RECREACION-IMDER-2026-05-04 G2` · single-comp v2.0 + cierre programa · activa REGLA 13.3 + condicional CIERRE
- `INFRATI-2026-05-04 G3` · multi-comp + CIERRE PROGRAMA · activa REGLAS 13.1-13.6 + condicional multi-comp + CIERRE

**Regenerar matriz alineada IMARPOR-V2** (Camino A profundo · futura):
- Matriz actual v1.0 era · sin canonical RAn.SC.k codes
- Re-run vía PM-0.0 v2.3 paradigm shift fusión bidireccional ESP
- Habilita rebuild canon completo de `pm-0-context.json` con saberes_que_modela poblados

## 8. Cross-references

- **Schema canon:** `v4/schemas/pm-0-context.schema.json` v3.4 (Mejoras #3+#4)
- **Wrapper validador:** `v4/scripts/validate-pm-0-context.sh`
- **Backup legacy preservado:** `runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json.legacy-v3.1-pre-mejora-4`
- **Script rebuild canónico:** `outputs/regen-imarpor-v2/rebuild_imarpor_v2.py` (deber preservarse en repo si se aplicará a futuros runs)
- **Sesión 4/4 cluster cierre:** `audits/VALIDATION-RUNTIME-CLUSTER-2026-05-05.md` (3 drift fixture documentados · este cierra el primero)
- **DM v3.28** (entradas Mejoras #3+#4)

## 9. Bottom line

✅ **1er runtime PASS empírico schema v3.4 cerrado** · IMARPOR-CC-V2 conforme · backup preservado · pattern Camino B canonizado para futuros rebuilds.

✅ **Backward compat single-comp single-guide validada empíricamente** · schema v3.4 NO impone REGLAS 13/14 cuando upstream legacy.

🔄 **Próximos pasos** (cuando aplique):
- Cowork: regenerar 2 fixtures restantes (RECREACION G2 · INFRATI G3) cuando se necesite full coverage cross-modos
- CC: cerrar sub-tasks 2-4 · entonces F2.8 + Cowork validation + master prompts triángulo 100% coherente

---

*VALIDATION REPORT runtime regen IMARPOR-V2 · 2026-05-06 · Camino B structured rebuild · Sergio Cortés Perdomo*
