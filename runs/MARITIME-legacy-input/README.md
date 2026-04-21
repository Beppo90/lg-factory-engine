# MARITIME — Legacy Input (Preservado para Run Futuro)

## Qué es esto

5 archivos `PM-1.2 — Scope & Sequence` del programa **Inglés Marítimo y Portuario**, producidos bajo la arquitectura **v1.x** (pre-Playbook-First, hace ~1 mes). Recuperados del commit `HEAD` antes de commitear el borrado de `guides/MARITIME-G1/`.

## Por qué se preservan

Son **análisis curriculares válidos** (Scope & Sequence, CEFR levels, grammar targets, fuentes auténticas como SMCP/IMO, vocabulario técnico) — input legítimo para un nuevo run bajo la arquitectura **v2.6.6** del LG Factory Engine.

El resto del folder `guides/MARITIME-G1/` (arquetipos por unidad, worksheets, playbook outline, workbook, Guía Completa U1) era **output generado bajo arquitectura obsoleta** y se eliminó — incompatible con el pipeline actual (Activity Cards, GFPI-F-134 Row Assembler, Playbook Build-Out, pm0_protocol, estrategias didácticas, Shared Renderer, paleta SENA).

## Cómo usarlo en el run nuevo

Cuando se arranque el run `MARITIME-YYYY-MM-DD`:

1. Estos 5 archivos alimentan el análisis de contexto del run (5 unidades ≠ 1 RAP estándar — Maritime era programa **tecnológico** de 5 unidades, no técnico).
2. El ejecutor de `PM-1.1` confirma: programa **Técnico** o **Tecnológico** (Maritime fue registrado antes como tecnológico por error — revisar).
3. Los campos reutilizables de cada PM-1.2 legacy son:
   - **Technical Topics** (vocabulario técnico por unidad)
   - **Grammar Targets** (estructuras CEFR objetivo)
   - **Guide Design DNA** (enfoque, entendimientos perdurables)
   - **Fuentes referenciadas** (SMCP, IMO, Life Second Edition)
4. El nuevo `pm-1-2.json` de la unidad destino se genera desde cero siguiendo el schema v2.6.6 — los archivos legacy son **referencia**, no plantilla.

## Archivos

| Unidad | Macro-Temática | Tamaño |
|--------|----------------|--------|
| 1 — Ship Overview | Parts of a Ship, Vessel Types, Safety Equipment | 159 líneas |
| 2 — The Crew | Roles, Hierarchy, Duties on Board | 146 líneas |
| 3 — Places in Port and Position | Port Geography, Navigation, Coordinates | 146 líneas |
| 4 — In Port | Berthing, Cargo Operations, Port Services | 150 líneas |
| 5 — IMO SMCP | Standard Marine Communication Phrases | 160 líneas |

## Estado

- **Origen**: commit `HEAD` del super-repo antes de Nivel B cleanup 2026-04-21
- **Arquitectura original**: v1.x (obsoleta)
- **Acción pendiente**: alimentar nuevo run bajo v2.6.6 (P1 en CHANGELOG.md MGV-2026-04-20)

---

*Preservado durante Nivel B cleanup — 2026-04-21*
