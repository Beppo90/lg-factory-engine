# ETL Cards v3.2 Aprendiz · Canon Library

**Version:** 1.0
**Created:** 2026-05-03
**Origin:** runs/IMARPOR-CC-2026-04-30-V2/scripts/wave-e-fix-* (canonizados)
**Canon authority:** Activity Card Schema v3.2 + PM-3.6 v3.5

## Propósito

Pipeline ETL **cross-program** que migra Activity Cards v3.0/v3.1 → v3.2 (APRENDIZ-FACING SHIFT) cuando los wrappers PM-2.x todavía no nacen v3.2.

### ¿Cuándo usar este pipeline?

- ✅ Run con cards generadas por wrappers PM-2.x v3.0/v3.1 (sin descripcion_aprendiz · recursos_aprendiz[] · descripcion_aprendiz_en · recursos_aprendiz_en[])
- ✅ Antes del subagente PM-3.6 v3.5 que CONSUME esos campos
- ❌ Una vez que wrappers PM-2.x sean bumpeados a v3.2 (próxima fase Nivel 3) este pipeline será DEPRECATED

### Pipeline secuencial · 6 pasos

```
01. extract-descripciones-input.py        → descripciones-30-cards-input.json
02. apply-descripcion-aprendiz.py         → apply LLM-generated descripcion_aprendiz
03. apply-recursos-aprendiz.py            → apply LLM-extracted recursos_aprendiz[]
04. clean-personajes-material.py          → mecánico clean cast names en material_apoyo + evidencias.nombre
05. clean-sergio-cross-cards.py           → mecánico clean "Sergio" → "el instructor"
06. apply-translations-en.py              → apply LLM CEFR-controlled EN (solo APROPIACIÓN+TRANSFERENCIA)
```

### Outputs Agent dispatch (entre pasos)

Los pasos 02 · 03 · 06 requieren LLM Agent dispatch que produce JSON intermedio (Sergio canonizó prompts en runs/IMARPOR-CC-2026-04-30-V2/agent-prompts-canon/).

## Referencias canon

- Activity Card Schema v3.2: master-prompts/Activity Card — Schema.md § 13
- PM-3.6 v3.5 EXTENSIÓN: master-prompts/PM-3.6 — GFPI-F-135 Integrator.md
- DM v3.14: status canonización Nivel 2 reducido

## Backups obligatorios

Cada script crea automáticamente backup .pre-wave-e-fix-vN antes de modificar cards.

## Deuda explícita post-canon (próxima fase Nivel 3)

Una vez que wrappers PM-2.x (11 master prompts) sean bumpeados a v3.2 · este pipeline ETL queda DEPRECATED.

---

*Canon library establecida 2026-05-03 post-validación preview v6 prólogo cinematográfico aprobado Sergio*
