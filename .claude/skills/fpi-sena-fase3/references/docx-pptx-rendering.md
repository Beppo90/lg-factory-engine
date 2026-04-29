# Document rendering · híbrido subprocess node + skill docx/pptx (H.3 canonizado)

> **STUB Hito 1 Task 1** · API específica emerge iterando en Hitos 2-4 (I.2 diseño emergente · Hito 5 refactor pass uniforma)

## Decisión arquitectónica (PLAN v1.1 §11.1 #10)

**H.3:** híbrido subprocess node + skill docx/pptx
- Reusa **418 KB scripts node DIESEL** ya validados producción (~14 archivos)
- Skill `anthropic-skills:docx` + `anthropic-skills:pptx` para PMs nuevos (especialmente PM-3.3 Canva)
- Migration path: PMs heredados → node subprocess · PMs nuevos → Python skill

## Scripts node disponibles (de runs/DIESEL-2026-04-15/scripts/)

| Script | Tamaño | Renderiza |
|---|---|---|
| pm-3-1-gen.js | 70 KB | Playbook Outline DOCX |
| pm-3-2-build-out-gen.js | 62 KB | Build-Out DOCX (8 sesiones) |
| pm-3-3-gen.js + pm-3-3-spec-gen.js | 73 KB | Canva Deck PPTX (hardcoded · refactor v1.x) |
| pm-3-5-gen.js | 33 KB | Final Mission DOCX |
| pm-3-6-assemble.js + pm-3-6-gen.js | 39 KB | GFPI-F-135 DOCX |
| pm-4-1-gen.js | 23 KB | Instrumentos DOCX (ya en fase2) |
| pm-4-2-gen.js | 17 KB | Cuestionario DOCX (ya en fase2) |

## API document_renderer.py (DISEÑO EMERGENTE · I.2)

**STUB inicial:** skeleton vacío en `lib/document_renderer.py` (Hito 1 Task 5).

API específica de las 6 funciones renderer **NO se diseña upfront** — emerge conforme construyo cada subagente Hito 2-3-4. Hito 5 refactor pass (1-2h) uniforma signatures post-construcción.

**Por qué emergente:** REGLA 21 strict · diseñar API ahora sin evidencia operacional es inflación. Bundler v1 sin slim-context es ejemplo de por qué upfront design falla.

---

*docx-pptx-rendering.md fpi-sena-fase3 · STUB v0.1 · Hito 1 Task 1 · 2026-04-29*
