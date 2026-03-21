# FPI SENA Factory — Fábrica Curricular de Bilingüismo

Sistema circular de 18 prompts maestros para automatizar la producción de guías de aprendizaje de inglés técnico (ESP) para programas del SENA.

## Project Structure

```
fpi-sena-factory/
├── master-prompts/          # 18-prompt master system (4 phases)
├── knowledge-bases/         # ELT/ESP/TBLT theory + SENA curriculum guide
├── guides/                  # Produced learning guides
│   └── ADSO-G1/             # ADSO Program, Guide 1: "The Hardware Specialist"
├── execution/               # Phase 3 execution prompts (playbooks, Canva, workbook)
├── evaluation/              # Phase 4 evaluation instruments (quizzes, rubrics)
├── instructor-materials/    # Instructor-facing docs (questionnaires, tests)
└── reference-docs/          # SENA form templates (GFPI-F-135, etc.)
```

## 4-Phase System

| Phase | Prompts | Purpose |
|-------|---------|---------|
| FASE 1 — ANÁLISIS | PM-1.1, PM-1.2 | Sofía Plus PDF → macro-themes → Scope & Sequence |
| FASE 2 — PLANEACIÓN | PM-2.1 to PM-2.10 | Full guide design (24h per guide) |
| FASE 3 — EJECUCIÓN | PM-3.1 to PM-3.4 | Playbook, Canva deck, Workbook |
| FASE 4 — EVALUACIÓN | PM-4.1 + §5 | Quiz, rubrics, feedback loop |

## Standard Parameters

- CEFR: A1.1–A1.2 (adjustable to A2)
- Duration per guide: 24 hours
- Technical programs (~180h): 6 guides
- Technological programs (~350h): 12 guides
- Language: hybrid (English activities + Spanish instructions in italics)

## Completed Work

- **ADSO Guide 1:** "The Hardware Specialist" — Macro-Temática 1: The Developer's Ecosystem
  - PM-1.2 through PM-2.9 completed
  - GFPI-F-135 formal document produced

## Pending

- PM-2.10: Written exam structure (Sergio to define)
- GFPI format integration (F-019/F-135) as final output layer
- Canva API automation for PM-3.3
- Full system execution with another real program
