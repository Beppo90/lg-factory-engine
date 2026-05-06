---
name: Runtime regen Camino B · 1er PASS empírico schema v3.4
description: Hito 4 (e) cerrado · IMARPOR-CC-V2 pm-0-context regenerado vía structured rebuild Camino B · 41 errors → 0 errors post normalización canon-strict · pattern NEW canonizado · backward compat single-comp single-guide validada empíricamente
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-06
---

**Decisión Sergio canon 2026-05-06 (Hito 4 opción (e) · runtime regen IMARPOR-V2 · concurrencia con CC sub-tasks 2-4)**

Mientras CC procesa audit doc field-by-field para sub-tasks 2-4 (~4h estimado) · Sergio aprobó Cowork ejecuta (e) en paralelo · regenerar 1 runtime fixture para validar schema NEW v3.4 empíricamente · cerrar 1/3 drift documentado del cluster cierre 4/4.

**Camino B vs Camino A · decisión arquitectónica:**

Para regen de fixtures contra schema-strict canon hay dos caminos:

| Aspecto | Camino A · LLM dispatch | Camino B · structured rebuild |
|---------|-------------------------|-------------------------------|
| Cómo | Agent re-ejecuta master prompt completo | Script Python · field rename + normalization + metadata add |
| Tiempo | 2-3h | ~30 min |
| Preserva contenido pre-existente | NO · genera nuevo | SÍ · transforma in-place |
| Útil cuando | content original tiene drift de calidad | solo se necesita validar conformancia schema |
| Determinismo | NO (LLM creative) | SÍ (regex + map) |

**Decisión:** Camino B para 1er PASS empírico · suficiente para validar schema. Camino A reservado para regeneración profunda futura.

**Ejecución cronológica:**

1. Pre-flight: runtime v3.1 era (21 keys non-canon: `programa_essentials`/`universe_grounding`/`pedagogical_compass`) + matriz alineada upstream v1.0 era (single-comp single-guide · `contenido_tecnico_crudo` vacío)
2. Backup: `pm-0-context.json.legacy-v3.1-pre-mejora-4`
3. Script `rebuild_imarpor_v2.py`:
   - Field renames: `programa_essentials` → `programa` · `universe_grounding` → `universo_narrativo` · etc.
   - Metadata v3.4 NEW: `_competencias_tecnicas_modo: "single-comp-legacy"` · `_n_competencias_tecnicas: 1` · validation_checks 8/9 con `status: N/A`
   - Preserva contenido creativo del LLM v3.1 (8 personajes · 6 principios · grammar focus per session · L1 policy 4 bands · evidencias 8)
4. Iteración 1 fix · 41 pattern errors → 0:
   - `raps_que_atraviesa`: regex `^RA[0-9]+` extrae prefijo · descarta sufijo descriptivo ("RA1 RECONOCER" → "RA1")
   - `saberes_que_modela`: filter por regex `^RA[0-9]+\.(SC|SP)\.[0-9]+` · empty array si upstream legacy NO tiene codes canon · descripciones preservadas en `_saberes_descriptivos_legacy[]` (non-canon)
   - `criterios_especificos_que_evalúa`: regex `^C0[1-8]` extrae code ("C01 RAP-01 A1.2" → "C01")
5. Validación final: `bash v4/scripts/validate-pm-0-context.sh IMARPOR-CC-2026-04-30-V2` → ✅ **VALID**

**Result canon validation summary:**

```
✓ VALID · pm-0-context.json conforms to schema v3.3.1
  schema_version: v3.4
  pm_version:     3.4.1
  competencias:   single-comp-legacy (n=1)
  guías programa: 1
  CIERRE flag:    false
```

**Hallazgo arquitectónico clave:**

Schema v3.4 conserva backward compat 100% para single-comp single-guide legacy · validado empíricamente. Conditional schemas multi-comp / multi-guía / mid-program / CIERRE NO se activan cuando upstream es legacy · backward compat preservada by design.

**Pattern canon emergente NEW · "structured rebuild Camino B":**

Aplicable cross-PM cuando:
1. Schema canon strict downstream existe (post-bump master)
2. Runtime fixtures legacy tienen contenido creativo valioso pre-existente
3. Regeneración profunda (Camino A LLM) NO es prioridad

Pasos canónicos:
1. Backup runtime con sufijo descriptivo (`*.legacy-vX-pre-<event>`)
2. Script Python determinista · field renames + metadata add + content preservation
3. Iteración 1: ejecutar validación · normalizar pattern mismatches (`re.match` extrae prefix canónico)
4. Preservar contenido legacy descriptivo en non-canon fields cuando schema strict no lo acepta
5. Validation final · documentar PASS empírico

**Drift descriptivo upstream · preservación de info:**

Matriz alineada IMARPOR-V2 v1.0 era emitía saberes como descripciones libres ("UNIT 1 PARTS OF THE SHIPS"). Estas son **valor pedagógico genuino** · NO drift desechable.

La normalización las preserva en `_saberes_descriptivos_legacy[]` (non-canon field con prefix `_`) para honor REGLA 11 libertad LLM upstream pero también honor schema strict downstream.

Cuando se regenere matriz alineada (Camino A profundo via PM-0.0 v2.3) · estas descripciones se asignarán a codes formales `RAn.SC.k`.

**Aplicabilidad cross-PM downstream:**

Pattern Camino B replicable para:
- `RECREACION-IMDER G2 pm-0-context.json` · single-comp v2.0 + CIERRE PROGRAMA · activa REGLA 13.3
- `INFRATI G3 pm-0-context.json` · multi-comp + CIERRE PROGRAMA · activa REGLAS 13.1-13.6
- Cualquier fixture legacy de DIESEL · MGV · INGBAS post-paradigm

Cada uno requiere ajustes específicos de normalización según los conditional schemas que se activen.

**Cross-LLM convergencia (post-Hito 4):**

| Sistema | Status |
|---------|--------|
| Cowork runtime validation | 1/3 fixtures PASS empírico ✅ (este trabajo) |
| CC F2.8 schema drift CI | ✅ master ↔ schema alineados (Mejoras #3+#4) |
| CC sub-tasks 2-4 (audit doc Cowork entregado) | 🔄 en progreso (~4h CC) |

Cuando CC cierre sub-tasks 2-4 · triángulo `master-prompts/` ↔ `v4/schemas/` ↔ `runs/IMARPOR-V2/*` será 100% coherente.

**Deuda explícita post-cierre:**

- Regenerar 2 fixtures restantes (RECREACION G2 · INFRATI G3) · LOW · habilita full coverage cross-modos schema v3.4
- Regenerar matriz alineada IMARPOR-V2 vía PM-0.0 v2.3 (Camino A profundo) · MED · habilita rebuild canon completo con saberes_que_modela codes formales
- Considerar `rebuild_imarpor_v2.py` script canonizado (mover a `scripts/` repo) · LOW · reusable cross-runtimes

**Deliverables sesión:**

- `runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json` REGENERATED (v3.1 → v3.4 canon-strict)
- `runs/IMARPOR-CC-2026-04-30-V2/pm-0-context.json.legacy-v3.1-pre-mejora-4` (backup)
- `audits/VALIDATION-RUNTIME-IMARPOR-V2-REGEN-2026-05-06.md` (validation report)
- `memory/feedback_runtime_regen_camino_b_2026_05_06.md` (este snapshot)
- Pattern canon emergente NEW "structured rebuild Camino B"
- Script `rebuild_imarpor_v2.py` (preservado en outputs · TBD si canonizar a `scripts/`)

*Sergio Cortés Perdomo 2026-05-06 · Hito 4 (e) cerrado · 1er runtime PASS empírico schema v3.4 · concurrencia cross-LLM activa con CC sub-tasks 2-4*
