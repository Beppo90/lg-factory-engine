# Pre-flight obligatorio Fase 3 (REGLA 19 + 20 + 21 + 20-shape)

> **STUB Hito 1 Task 1** · contenido completo se desarrolla durante Hitos 2-4 conforme construyo subagentes y descubro patrones.

## Archivos canon a leer en cada sesión Fase 3 (PASOS A-N)

### Master prompts Fase 3 (8 archivos)

- [ ] **PASO A** · `master-prompts/PM-3.1 — Playbook Outline — Session Map.md` (v2.6 · 41.6 KB)
- [ ] **PASO B** · `master-prompts/PM-3.2 — Playbook Build-Out — Step by Step.md` (v2.5 · 30 KB)
- [ ] **PASO C** · `master-prompts/PM-3.3 — Canva Deck — Visual Support.md` (v2.4 · 22.3 KB)
- [ ] **PASO D** · `master-prompts/PM-3.4 — Workbook — Autonomous Work.md` (v2.0 · 8.7 KB)
- [ ] **PASO E** · `master-prompts/PM-3.5 — Final Mission — Integrative Task.md` (v2.6 · 23.8 KB · PRE-GENERATION CHECKLIST obligatorio)
- [ ] **PASO F** · `master-prompts/PM-3.6 — GFPI-F-135 Integrator.md` (v2.6.5 · 48 KB)
- [ ] **PASO G** · `master-prompts/PM-4.1 — Instrumentos.md` (v2.6.5 · referenciar desde fpi-sena-fase2)
- [ ] **PASO H** · `master-prompts/PM-4.2 — Cuestionario S6.md` (v2.0 · referenciar desde fpi-sena-fase2)

### Canon operacional (SOT del JSON real Fase 3)

- [ ] **PASO I** · `runs/MGV-2026-04-20/pm-3-1.json` + `pm-3-2-s1..s8.json` + `pm-3-5.json` + `pm-3-6.json` (canon más maduro)
- [ ] **PASO J** · `runs/DIESEL-2026-04-15/pm-3-3-spec.json` + `pm-3-3-deck.pptx` (único run con PPTX completo)
- [ ] **PASO K** · `runs/IMARPOR-CC-2026-04-27/pm-2-11.json` + 9 Activity Cards enriched (input gating §6.4 Fase 3)

### Plan + canon meta

- [ ] **PASO L** · `master-prompts/PRE-FLIGHT-FASE-3.md` (inventario canon · 257 líneas)
- [ ] **PASO M** · `master-prompts/PLAN-FASE-3-ARQUITECTURA.md` v1.1 (3 decisiones canonizadas · 4 hitos + Hito 5)
- [ ] **PASO N** · `master-prompts/DOCUMENTO MAESTRO ... .md` §11 changelog (DM frontmatter v2.7 + entries v2.11/v2.12 changelog drift conocido)

### Verificación REGLA 20 (cuando audites o niegues existencia)

5 vectores grep ANTES de afirmar invención: master-prompts/PM-*.md · runs/DIESEL-*/ · runs/MGV-*/ · runs/*/scripts/ · master-prompts/PLAN-*.md.

### Verificación REGLA 21 (cuando marques decisión TOMADA en plan)

3 sustentos canónicos válidos: (1) Canon DM zanjado · (2) Confirmación instructor explícita · (3) Evidencia operacional verificable. Sin uno de los 3 → §11.2 gaps pendientes.

### Verificación REGLA 20-shape (heurística personal · cuando trabajes con JSON nuevo)

Antes de asumir keys/paths/nesting de pm-3-1 + pm-3-2-sX + pm-3-5 + pm-3-6 (todos JSONs nuevos sin validation runtime), ejecutar `python -c "import json; d=json.load(open('path')); print(d.keys())"` o `grep` para verificar estructura real.

---

*pre-flight.md fpi-sena-fase3 · STUB v0.1 · Hito 1 Task 1 · 2026-04-29*
