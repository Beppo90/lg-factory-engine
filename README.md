# FPI SENA Factory — Fábrica Curricular de Bilingüismo

Sistema circular de 22 prompts maestros con 52 arquetipos de actividad para automatizar la producción de guías de aprendizaje de inglés técnico (ESP) para programas del SENA.

## Project Structure

```
fpi-sena-factory/
├── master-prompts/          # 22 prompts + 52 arquetipos (4 phases)
├── knowledge-bases/         # ELT/ESP/TBLT theory + SENA curriculum guide
├── guides/                  # Produced learning guides
│   └── ADSO-G1/             # ADSO Program, Guide 1: "The Hardware Specialist"
├── instructor-materials/    # Instructor-facing docs (questionnaires, tests)
├── reference-docs/          # SENA form templates (GFPI-F-135, etc.)
└── DIAGRAMA-MASTER-PROMPTS.html  # Interactive diagram
```

## 4-Phase System

*(Nota: Fases 2 y 4 se ejecutan cíclicamente **por unidad**, mientras que la Fase 3 se ejecuta **globalmente** al final del programa para ensamblar los anexos).*

| Phase | Prompts | Purpose |
|-------|---------|---------|
| FASE 1 — ANÁLISIS | PM-1.1, PM-1.2 | Sofía Plus → macro-themes (5 o 10 guías) → Scope & Sequence |
| FASE 2 — PLANEACIÓN | PM-2.1 to PM-2.10 | Modelado didáctico de las subfases SENA GFPI-F-135 (3.1, 3.2, 3.3) |
| FASE 4 — EVALUACIÓN | PM-4.1, PM-4.2 | Evaluación por unidad + Cuestionario técnico + Feedback Loop a Fase 1 |
| FASE 3 — EJECUCIÓN | PM-3.1 to PM-3.6 | Playbook, Canva deck, Workbook, Misión Final (GFPI 3.4), Documento GFPI-F-135 ensamblado |

## Fase 2 — 3 Conjuntos (orden alternable)

**Triple propósito:** Los arquetipos de Fase 2 (PM-2.3 a PM-2.10) alimentan 3 productos: Guía de Aprendizaje + Workbook + Examen escrito.

| Conjunto | PMs | Arquetipos |
|----------|-----|------------|
| **APERTURA** | PM-2.1 Spark → PM-2.2 Gap Analysis | 5 + 5 = 10 |
| **A — Escritura** | PM-2.3 Reading → PM-2.4 Writing → PM-2.5 Literacy & Vocab | 6 + 5 + 5 = 16 |
| **B — Oral** | PM-2.6 Listening → PM-2.7 Pronunciation → PM-2.8 Speaking | 6 + 5 + 5 = 16 |
| **C — Sistemas** | PM-2.9 Language Functions → PM-2.10 Grammar | 5 + 5 = 10 |

**Total: 52 arquetipos de actividad** con combinabilidad ilimitada.

## Standard Parameters

- **CEFR Range:** A1.1–A2.2 (Progressive scaling based on duration)
- **Duration per guide:** 24 hours
- **Technical programs (~180h):** 5 modules (guides)
- **Technological programs (~350h):** 10 modules (guides)
- **Language:** Hybrid (English communicative tasks + Spanish cognitive instructions in italics)

## Completed Work

- **System Upgrade (V2.0):** Restructured all 22 Master Prompts to strictly map `GFPI-F-135` taxonomy (3.1 to 3.4 subphases). Overhauled Python orchestrator pipeline to evaluate (PM-4.x) linearly at unit boundaries.
- **ADSO Guide 1:** "The Hardware Specialist" — Macro-Temática 1: The Developer's Ecosystem
  - All 20 prompts designed with archetype menu system
  - GFPI-F-135 formal document produced

## Pending

- Automatización de Canva API para PM-3.3
- Deploying the frontend web interface with the Next.js/React framework.
- **(In Progress)** Prueba de fuego con Inglés Marítimo y Portuario.
