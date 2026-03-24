# SPEC-001: SYSTEM DESIGN — LG FACTORY ENGINE
## Specs-Driven Design · v0.2 DRAFT
## Author: Sergio Cortés Perdomo + Mimo
## Date: 2026-03-22 (Updated 2026-03-24 — Flow v2 correction)
## Changelog:
##   v0.2 — §3, §5, §6, §7, §8, §11 updated per FLOW-v2 (see specs/FLOW-v2.md)

---

## 0. ABOUT THIS DOCUMENT

This is the **System Design Spec** — the foundational document of LG Factory Engine.
Nothing gets coded until this spec is reviewed and approved.

**What a System Design Spec does:**
- Defines WHAT the system is and WHO it serves (not HOW it's built — that comes in SPEC-002/003)
- Establishes the boundaries: what's in scope, what's out
- Names the components and their responsibilities
- Defines the data flow at a high level
- Sets constraints and non-negotiables

**Why specs-driven:**
- Forces clarity before code — every decision is documented
- Enables review — you can catch architecture mistakes on paper, not in production
- Creates a shared language — when we say "Orchestrator" or "PM Unit", we mean exactly one thing
- Scales with the team — anyone joining later reads the specs, not the code

---

## 1. PROBLEM STATEMENT

Designing English for Specific Purposes (ESP) curriculum is a high-skill, low-throughput process. An experienced instructor needs 40-80 hours to produce a single complete learning guide (guía de aprendizaje) with worksheets, workbook, presentation slides, evaluation instruments, and institutional documentation. The quality is inconsistent, the process is not reproducible, and the output format varies by instructor.

**LG Factory** solves this by encoding the curriculum design expertise into a system of 22 Master Prompts (PMs) organized in 4 phases, with 52 pedagogical archetypes that ensure variety without sacrificing quality. The system has been validated manually with two programs: ADSO (software development) and Maritime English.

**The gap:** Today, LG Factory runs manually — the instructor copies prompts into an AI chat, copies outputs back, and assembles documents by hand. This limits throughput to ~1 guide per week and makes the system non-transferable.

**The opportunity:** Automate the pipeline so that one instructor can produce a complete, publication-ready learning guide in hours instead of days, and make the system usable by any ESP curriculum designer worldwide.

---

## 2. TARGET USER

### Primary: ESP Curriculum Designers
- Instructors at vocational training institutions (SENA Colombia, similar TVET worldwide)
- University ESP program coordinators
- Corporate L&D teams designing English training for specific industries
- Freelance curriculum designers serving niche markets (maritime, healthcare, IT, etc.)

### User Profile
- Has domain expertise in their field (e.g., knows maritime vocabulary)
- Has basic English teaching methodology knowledge
- Does NOT need to be a developer
- Comfortable with web interfaces
- Needs: speed, consistency, institutional compliance, pedagogical quality

### Secondary: Institutional Administrators
- Need standardized documentation (GFPI-F-135 or equivalent)
- Need evidence of curriculum alignment with competency standards
- Need audit trails

---

## 3. PRODUCT VISION

### One-liner
LG Factory Engine is a human-in-the-loop AI pipeline that transforms ESP curriculum inputs into complete, publication-ready learning guides through a conversational step-by-step process.

### The 6 Moments (conversational flow)

The system operates in 6 sequential moments, each requiring instructor input or confirmation:

1. **Topic Creation (PM-1.1)** — The instructor provides program name, ficha, type (técnica/tecnología), and base themes. The system suggests 6 or 10 macrothemes. The instructor selects one (Gate G0).

2. **Setting the Universe (PM-1.2)** — With a macrotheme chosen, the instructor provides CEFR level, competency, and RAP. The system curates authentic texts. The instructor selects texts fulfilling the 4 Cs (Gate G1).

3. **Building the Learning Guide (PM-2.1 → PM-2.10 + PM-4.1)** — The system activates 10 PMs sequentially. For each, the instructor selects an activity archetype. PM-4.1 (Evaluation Instruments) is generated as part of this phase, NOT as a separate step. The result: the **Guía de Aprendizaje** (9 worksheets + evaluation instruments).

4. **Achiever's Outputs (optional)** — The system asks the instructor if they want additional learner-facing products:
   - PM-3.3: Canva Deck text (optional, manual)
   - PM-3.4: Autonomous Workbook (optional, **auto-generated**: 2 archetypes per PM from PM-2.3–2.10)
   - PM-4.2: Technical Quiz IE-01 (optional, **auto-generated**: 1 archetype per PM from PM-2.3–2.10)

5. **Instructor's Playbook (optional)** — The system asks if the instructor wants instructor-facing materials:
   - PM-3.1: Playbook Outline (optional — includes PM-4.1 evaluation instruments)
   - PM-3.2: Playbook Build-Out (optional — requires PM-3.1)

6. **Validation & Export** — The system validates coherence and exports all confirmed deliverables.

### Product Categories

Deliverables are divided into two categories:

| Category | Who receives it | Products |
|----------|----------------|----------|
| **Achiever's Outputs** | The learner | Guía de Aprendizaje (PM-2.1–2.10 + PM-4.1), Canva Deck (PM-3.3), Workbook (PM-3.4), Quiz (PM-4.2) |
| **Instructor's Playbook** | The instructor | Playbook Outline (PM-3.1), Playbook Build-Out (PM-3.2) |

**Note:** PM-4.1 (Evaluation Instruments) lives in BOTH categories — generated once, inserted in the Learning Guide AND the Playbook.

### What it does NOT do (V1)
- Generate audio files (TTS) — deferred to V2
- Replace instructor judgment — every critical decision has a human checkpoint
- Handle multiple languages — English output only in V1 (Spanish meta-language for instructions is hardcoded)
- Auto-generate the Learning Guide — archetype selection for PM-2.1–2.10 is always human-driven

---

## 4. SYSTEM ARCHITECTURE — HIGH LEVEL

```
┌─────────────────────────────────────────────────────┐
│                    LG FACTORY ENGINE                  │
│                                                       │
│  ┌──────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │  CONFIG   │──▶│ ORCHESTRATOR │──▶│  VALIDATOR   │ │
│  │  LAYER    │   │              │   │              │ │
│  └──────────┘   └──────┬───────┘   └──────────────┘ │
│                         │                             │
│            ┌────────────┼────────────┐               │
│            ▼            ▼            ▼               │
│     ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│     │ PM UNITS │ │ ASSEMBLER│ │ EXPORTER │         │
│     │ (22 PMs) │ │          │ │          │         │
│     └──────────┘ └──────────┘ └──────────┘         │
│                                                       │
│  ┌──────────────────────────────────────────────────┐│
│  │              HUMAN CHECKPOINT LAYER               ││
│  │  (G0–G6: macrotheme, stories, archetypes, gates)  ││
│  └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
   ┌──────────┐                  ┌──────────┐
   │ LLM API  │                  │  OUTPUT   │
   │ (Claude) │                  │  FILES    │
   └──────────┘                  └──────────┘
```

### Component Responsibilities

**CONFIG LAYER** — Holds all static definitions:
- Program spec (name, code, units, grammar targets per unit, CEFR level, domain)
- Archetype registry (52 archetypes with metadata)
- PM registry (22 PMs with input/output contracts, optional/auto flags, product categories)
- Template library (GFPI format, institutional headers, etc.)

**ORCHESTRATOR** — The brain:
- Knows the execution order (6 moments, not just 4 phases)
- Manages state: which PMs have run, what their outputs were, which optional products were confirmed
- Routes outputs from one PM as inputs to the next
- Triggers human checkpoints at defined gates (G0–G6) AND confirmation prompts for optional products
- Handles errors and retries

**PM UNITS** — The workers:
- Each PM is an executable unit with typed inputs and typed outputs
- Contains: system prompt, user prompt template, output parser, GFPI section extractor
- Stateless: given the same inputs, produces the same output structure
- Some PMs have `auto_generate: true` — they select archetypes automatically without human input

**ASSEMBLER** — The builder:
- Takes PM outputs and assembles higher-order documents
- Learning Guide: worksheets (PM-2.1–2.10) + evaluation instruments (PM-4.1) — ONE assembly
- Achiever's Outputs: Canva text (PM-3.3), Workbook (PM-3.4), Quiz (PM-4.2) — assembled if confirmed
- Instructor's Playbook: Outline (PM-3.1) + Build-Out (PM-3.2) — assembled if confirmed
- **PM-4.1 is inserted in TWO locations:** Learning Guide AND Playbook

**VALIDATOR** — The quality gate:
- Runs coherence checks (vocabulary, grammar, universe, evidence alignment)
- Reports errors with severity (critical / warning / info)
- Blocks export if critical errors exist

**EXPORTER** — The output formatter:
- Converts internal representations to deliverable formats
- Markdown (canonical), DOCX (institutional), PDF (optional)
- Maintains formatting contracts per output type
- Groups exports by product category: Achiever's vs Instructor's

**HUMAN CHECKPOINT LAYER** — The decision interface:
- Gates G0–G6: mandatory decisions (macrotheme, stories, archetypes, validation, export)
- Confirmation prompts: optional product requests (Canva, Workbook, Quiz, Playbook)
- In V1: CLI prompts. In V2: web UI. The interface is decoupled from the engine.

---

## 5. DATA FLOW

### Complete Pipeline — 6 Moments

```
MOMENTO 1: TOPIC CREATION
  │
  ├─ PM-1.1: Ruta Macrotemática
  │   Input:  program_name, ficha, program_type, themes_input
  │   Output: 6 or 10 suggested macrothemes
  │   Gate:   G0 — SELECT macrotheme (suggested or free)
  │
  ▼
MOMENTO 2: SETTING THE UNIVERSE
  │
  ├─ PM-1.2: Scope & Sequence + Curación
  │   Input:  program_name, ficha, macrotheme, CEFR, [competencia], [RAP]
  │   Output: unit_spec + curated_sources[3]
  │   Gate:   G1 — SELECT authentic texts (4 Cs)
  │
  ▼
MOMENTO 3: BUILDING THE LEARNING GUIDE (per unit)
  │
  ├─ APERTURA
  │   ├─ PM-2.1 Spark         → G2: SELECT archetype (5 options)
  │   └─ PM-2.2 Gap Analysis  → G2: SELECT archetype (5 options)
  │
  ├─ CONJUNTO A (Writing Track)
  │   ├─ PM-2.3 Reading        → G2: SELECT archetype (6 options)
  │   ├─ PM-2.4 Writing        → G2: SELECT archetype (5 options)
  │   └─ PM-2.5 Literacy/Vocab → G2: SELECT archetype (5 options)
  │
  ├─ CONJUNTO B (Oral Track)
  │   ├─ PM-2.6 Listening      → G2: SELECT archetype (6 options)
  │   ├─ PM-2.7 Pronunciation  → G2: SELECT archetype (5 options)
  │   └─ PM-2.8 Speaking       → G2: SELECT archetype (5 options)
  │
  ├─ CONJUNTO C (Language Systems)
  │   ├─ PM-2.9 Functions      → G3: APPROVE transversal map
  │   └─ PM-2.10 Grammar       → G2: SELECT archetype (5 options)
  │
  └─ PM-4.1 Evaluation Instruments (generated WITHIN this phase, not after)
      Output: Checklist + Rubric + Feedback Loop
      Insert: Learning Guide AND (later) Playbook
  │
  ▼
  ╔═══════════════════════════════════════════════════════╗
  ║  PRODUCT: Guía de Aprendizaje (obligatory)           ║
  ║  = 9 worksheets (PM-2.1–2.10) + PM-4.1 instruments  ║
  ╚═══════════════════════════════════════════════════════╝
  │
  ▼
MOMENTO 4: ACHIEVER'S OUTPUTS (optional — instructor confirms each)
  │
  ├─ CONFIRM? → PM-3.3 Canva Deck text (manual generation)
  ├─ CONFIRM? → PM-3.4 Workbook (auto: 2 archetypes/PM from 2.3–2.10)
  └─ CONFIRM? → PM-4.2 Quiz IE-01 (auto: 1 archetype/PM from 2.3–2.10)
                 Answer Key at end of quiz
  │
  ▼
MOMENTO 5: INSTRUCTOR'S PLAYBOOK (optional — instructor confirms each)
  │
  ├─ CONFIRM? → PM-3.1 Playbook Outline (includes PM-4.1 instruments)
  │              │
  │              └─ CONFIRM? → PM-3.2 Playbook Build-Out (requires PM-3.1)
  │
  ▼
MOMENTO 6: VALIDATION & EXPORT
  │
  ├─ VALIDATOR (8 coherence checks)
  │   ├─ Vocabulary check (20 terms consistent across all outputs)
  │   ├─ Grammar check (targets match unit specification)
  │   ├─ Universe check (characters, company, context consistent)
  │   ├─ Evidence check (triada SENA: conocimiento + desempeño + producto)
  │   ├─ Archetype check (every section documents its archetype)
  │   └─ CEFR check (all activities match declared level)
  │
  ├─ G5: Review validation report
  ├─ G6: Final export confirmation
  │
  └─ EXPORTER
      ├─ Achiever's: /output/{program}/learning-guide/
      ├─ Achiever's: /output/{program}/workbook/ (if confirmed)
      ├─ Achiever's: /output/{program}/quiz/ (if confirmed)
      ├─ Achiever's: /output/{program}/canva-spec/ (if confirmed)
      ├─ Instructor's: /output/{program}/playbook/ (if confirmed)
      └─ GFPI: /output/{program}/gfpi-f-135.md
```

---

## 6. HUMAN CHECKPOINTS

### Mandatory Gates (never automated)

| Gate | When | What the human decides |
|------|------|----------------------|
| G0 | After PM-1.1 | Select macrotheme (from suggested or enter free) |
| G1 | During PM-1.2 | Select authentic texts fulfilling 4 Cs |
| G2 | Before each PM-2.x | Select archetype variant |
| G3 | After PM-2.9 | Approve transversal function injection map |
| G4 | After PM-3.5 | Approve Final Mission design |
| G5 | After Validator | Review coherence report, approve or fix |
| G6 | Before Export | Final review of assembled documents |

### Confirmation Prompts (for optional products)

| Prompt | When | What the instructor decides |
|--------|------|---------------------------|
| C-1 | After Learning Guide | Want PM-3.3 Canva Deck text? (yes/no) |
| C-2 | After Learning Guide | Want PM-3.4 Autonomous Workbook? (yes/no) |
| C-3 | After Learning Guide | Want PM-4.2 Technical Quiz? (yes/no) |
| C-4 | After Achiever's | Want PM-3.1 Playbook Outline? (yes/no) |
| C-5 | After PM-3.1 | Want PM-3.2 Playbook Build-Out? (yes/no) |

### Design Principle

Gates G0, G1, G2 represent professional pedagogical judgment — they define quality. Gates G3 CAN be automated with preset profiles. Confirmation prompts C-1 through C-5 are simple yes/no — they control which optional deliverables are generated.

---

## 7. PM UNIT CONTRACT

Every PM Unit conforms to this interface:

```
PMUnit:
  id:               string           # "PM-2.3"
  name:             string           # "Reading — Master Anchor"
  phase:            1 | 2 | 3 | 4
  conjunto:         "apertura" | "A" | "B" | "C" | "execution" | "evaluation"

  inputs:
    required:       dict             # typed inputs this PM needs
    optional:       dict             # optional inputs that enrich output

  outputs:
    worksheet:      Markdown         # the primary deliverable
    gfpi:           GFPISection      # tagged section for GFPI assembly
    metadata:       dict             # archetype used, tokens consumed, etc.

  archetypes:       list[Archetype] | null  # null for PM-2.9 (transversal)

  checkpoint:       Gate | null      # which human gate (G0–G6), if any

  dependencies:     list[string]     # PM IDs that must complete before this one

  # NEW FIELDS (FLOW-v2)
  optional:         bool             # is this product optional?
  auto_generate:    bool             # does this PM auto-select archetypes?
  product_category: "achievers_output" | "instructor_playbook" | null
  auto_archetype_rule: string | null # description of auto-selection rule
  insert_locations: list[string]     # where to insert output (e.g., ["learning_guide", "instructor_playbook"])
```

**Example — PM-2.3 Reading:**

```
PMUnit:
  id: "PM-2.3"
  name: "Reading — Master Anchor"
  phase: 2
  conjunto: "A"

  inputs:
    required:
      unit_spec:        UnitSpec         # from PM-1.2
      selected_stories: list[Story, 2]   # from G1 (human choice)
      grammar_targets:  list[string]     # from program config
      key_vocabulary:   list[string, 20] # from PM-1.2
    optional:
      previous_reading: Worksheet | null # for recycling (circular design)

  outputs:
    worksheet: Markdown  # 3-phase reading lesson (pre/while/post)
    gfpi: GFPISection    # <!-- GFPI SECTION: 3.3-APROPIACION-READING -->
    metadata:
      archetype_used: string
      word_count: int
      cefr_verified: bool

  archetypes:
    - A: "Jigsaw Reading"
    - B: "Annotation Station"
    - C: "Dual-Text Compare"
    - D: "Graphic Organizer"
    - E: "Margin Notes"
    - F: "Treasure Hunt"

  checkpoint: G2
  dependencies: ["PM-1.2"]
  optional: false
  auto_generate: false
  product_category: "achievers_output"
  auto_archetype_rule: null
  insert_locations: ["learning_guide"]
```

**Example — PM-3.4 Workbook (auto-generated, optional):**

```
PMUnit:
  id: "PM-3.4"
  name: "Workbook — Autonomous Work"
  phase: 3
  conjunto: "execution"

  inputs:
    required:
      all_pm2_outputs: dict[str,PMOutput]
      key_vocabulary:  list[VocabTerm]
      grammar_targets: list[str]

  outputs:
    worksheet: Markdown  # REINFORCE + EXTEND + PREPARE
    gfpi: GFPISection
    metadata:
      archetypes_auto_selected: list[string]

  archetypes: null  # auto-selected

  checkpoint: null
  dependencies: ["PM-2.3", "PM-2.4", "PM-2.5", "PM-2.6", "PM-2.7", "PM-2.8", "PM-2.9", "PM-2.10"]
  optional: true
  auto_generate: true
  product_category: "achievers_output"
  auto_archetype_rule: "2 arquetipos cualquiera por cada PM (de PM-2.3 a PM-2.10)"
  insert_locations: ["learning_guide"]
```

---

## 8. STATE MANAGEMENT

The Orchestrator maintains a **Run State** — a persistent record of what has been executed, what's pending, and what decisions the human has made.

```
RunState:
  run_id:               string              # unique run identifier
  program:              ProgramConfig       # the program being generated
  current_moment:       1 | 2 | 3 | 4 | 5 | 6  # which moment of the flow
  current_unit:         int                 # which unit is being processed
  current_phase:        1 | 2 | 3 | 4
  current_pm:           string | null       # PM currently executing

  completed_pms:        dict[string, PMOutput]   # PM-ID → output
  human_decisions:      dict[string, Decision]   # gate → choice made
  confirmed_products:   list[string]              # which optional products were confirmed
  errors:               list[ValidationError]

  status: "running" | "waiting_human" | "waiting_confirmation" | "validating" | "exporting" | "complete" | "error"
```

**Key differences from v0.1:**
- `current_moment` tracks which of the 6 moments is active
- `confirmed_products` tracks which optional deliverables the instructor confirmed
- `waiting_confirmation` is a new status for the C-1 through C-5 prompts (different from `waiting_human` for gates)
- PM-4.1 is completed during Moment 3, not as a separate phase

**Why this matters:**
- If the process is interrupted (API timeout, user steps away), it can resume from the last completed PM
- The complete decision trail is auditable — you can explain WHY each archetype was chosen
- Multiple runs can be compared (e.g., same program with different archetype selections)
- Optional products can be generated in a follow-up run without re-running the core pipeline

---

## 9. CONSTRAINTS & NON-NEGOTIABLES

### Technical
- **LLM-agnostic design:** PM Units send prompts via an adapter. V1 uses Claude API. Swapping to GPT-4 or Gemini should require only a new adapter, not a rewrite.
- **Idempotent PMs:** Same inputs → same output structure (content may vary due to LLM non-determinism, but structure is guaranteed by output parsers).
- **Offline-capable config:** Program definitions, archetype registries, and PM templates are local files (JSON/YAML), not API-dependent.

### Pedagogical
- **52 archetypes are immutable in V1.** They were designed and validated by a domain expert. The system uses them; it doesn't modify them.
- **Grammar constraints are absolute.** If Unit 1 says "Demonstratives + Verb To Be", no PM can introduce Present Perfect.
- **20-term vocabulary contract.** Every unit has exactly 20 key terms. They appear in PM-2.5, are tested in PM-4.2, and are listed in GFPI Section 5.
- **Triada SENA is structural.** Three evidence types (Conocimiento, Desempeño, Producto) map to specific PMs. This is not configurable.

### Business
- **No vendor lock-in.** The system outputs standard formats (Markdown, DOCX). No proprietary format.
- **Human decisions are never discarded.** Every archetype selection and story choice is logged and traceable.
- **Institutional format is pluggable.** GFPI-F-135 is SENA's format. Other institutions have different formats. The Assembler uses templates, not hardcoded structures.
- **PM-4.1 dual insertion is architectural.** Evaluation instruments are generated once and inserted in both the Learning Guide and the Playbook. This is not duplication — it's a single source of truth with two render targets.

---

## 10. FILE STRUCTURE (PROPOSED)

```
lg-factory-engine/
├── specs/                    # You are here
│   ├── SPEC-001-system-design.md
│   ├── SPEC-002-data-models.md
│   ├── SPEC-003-orchestrator.md
│   ├── SPEC-004-validator.md
│   └── FLOW-v2.md            # Flow correction document (source of truth for v0.2)
│
├── config/
│   ├── programs/             # One JSON per program
│   │   ├── adso-g1.json
│   │   └── maritime-g1.json
│   ├── archetypes.json       # 52 archetypes registry
│   ├── pm-registry.json      # 22 PM definitions (with optional/auto/product_category)
│   └── templates/            # Institutional format templates
│       └── gfpi-f-135.md
│
├── engine/
│   ├── orchestrator.py       # Pipeline controller (6-moment flow)
│   ├── pm_runner.py          # Executes a single PM Unit
│   ├── state.py              # RunState management (with confirmed_products)
│   ├── checkpoints.py        # Human interaction layer (G0–G6 + C-1–C-5)
│   ├── validator.py          # Coherence engine
│   ├── assembler.py          # Document assembly (dual-insert for PM-4.1)
│   ├── exporter.py           # Format conversion (MD → DOCX)
│   └── adapters/
│       ├── claude.py         # Claude API adapter
│       └── base.py           # Abstract LLM adapter
│
├── prompts/                  # PM prompt templates (extracted from master-prompts/)
│   ├── pm-1.1.md
│   ├── pm-1.2.md
│   ├── pm-2.1.md
│   ├── ...
│   └── pm-4.2.md
│
├── output/                   # Generated guides
│   ├── adso-g1/
│   └── maritime-g1/
│
├── tests/
│   ├── test_orchestrator.py
│   ├── test_validator.py
│   └── fixtures/             # Sample inputs/outputs for testing
│
├── cli.py                    # Command-line interface (V1)
├── requirements.txt
└── README.md
```

---

## 11. GLOSSARY

| Term | Definition |
|------|-----------|
| **PM** | Master Prompt — an executable curriculum design unit |
| **PM Unit** | The code representation of a PM: prompt template + input contract + output parser |
| **Archetype** | A pedagogical activity pattern (e.g., "Jigsaw Reading", "Endless Complaints") |
| **Unit** | A thematic division of a program (e.g., "Ship Overview" in Maritime) |
| **Guide** | A complete learning guide for one unit (guía de aprendizaje) — includes worksheets + PM-4.1 |
| **Run** | One execution of the pipeline for one program |
| **Gate** | A human checkpoint where the user makes a mandatory decision (G0–G6) |
| **Confirmation** | A yes/no prompt for optional products (C-1–C-5) |
| **Run State** | The persistent record of a pipeline execution |
| **Triada SENA** | Three evidence types required by SENA: Conocimiento, Desempeño, Producto |
| **Data Contract** | The GFPI section format each PM must produce (defined in GFPI-F-135 Data Contract) |
| **Conjunto** | A group of related PMs in Phase 2 (A=Writing, B=Oral, C=Language Systems) |
| **Achiever's Outputs** | Products the learner receives: Guide, Canva Deck, Workbook, Quiz |
| **Instructor's Playbook** | Products the instructor uses: Playbook Outline, Playbook Build-Out |
| **Auto-generate** | PM mode where archetypes are selected automatically without human input |
| **Dual insertion** | PM-4.1 is generated once and inserted in both the Learning Guide and the Playbook |

---

## 12. NEXT SPECS

| Spec | Content | Depends on |
|------|---------|-----------|
| **SPEC-002** | Data Models: ProgramConfig, UnitSpec, Archetype, PMOutput, RunState, ProductCategory schemas | SPEC-001 v0.2 approved |
| **SPEC-003** | Orchestrator: 6-moment execution order, dependency graph, error handling, retry logic, checkpoint protocol | SPEC-001 + SPEC-002 |
| **SPEC-004** | Validator: coherence rules, severity classification, reporting format | SPEC-001 + SPEC-002 |

---

## 13. DESIGN DECISIONS (RESOLVED)

### Decision 1 — Multi-unit orchestration: SEQUENTIAL with Phase 3 parallelism
Units process sequentially: Unit N+1 begins only after Unit N completes Phase 2 (all PM-2.x generated and approved). Rationale: units have implicit semantic dependency (Unit 1 vocabulary is assumed known in Unit 2), and the human-in-the-loop bottleneck makes API parallelism irrelevant. **Exception:** Phase 3 outputs (Playbook, Workbook, Canva Deck) CAN process in parallel across units because they are structurally independent.

### Decision 2 — Archetype profiles: YES, from V1
Three preset profiles ship in V1:

| Profile | Logic | Use case |
|---------|-------|----------|
| `balanced` | Rotates archetypes to maximize variety (A→B→C→D→E) | First guide of a program |
| `production` | Selects fastest-to-generate archetypes (least creative input) | Volume/speed priority |
| `engagement` | Selects highest-interactivity archetypes (Role-Based, Game, Competition) | Kinesthetic/young learner groups |

Profiles auto-fill G2 gates but the human can always override. CLI flag: `--auto-archetypes balanced`. This reduces human gates from 10 to 6 per unit.

### Decision 3 — Institutional formats: TEMPLATE ENGINE (Jinja2), not plugin system
V1 supports GFPI-F-135 via Jinja2 templates in `config/templates/`. To support a new institutional format, the user creates a new `.j2` file — no code changes required. This is "plugins by configuration" without the overhead of a formal plugin architecture. A full plugin system is deferred to V2 only if market demand validates it.

### Decision 4 — Prompt versioning: SEMANTIC + HASH
Each PM carries two version identifiers:
- **Semantic:** `PM-2.3@1.2` — human-readable, increments on logic changes
- **Hash:** SHA-256 of the prompt template content — changes on any modification

RunState records both:
```json
{
  "pm_id": "PM-2.3",
  "pm_version": "1.2",
  "pm_hash": "a3f8c2e1...",
  "generated_at": "2026-03-22T18:00:00Z"
}
```
This enables both "which version generated this guide?" (hash lookup) and "what changed between versions?" (template diff).

### Decision 5 — Pricing: PER-PROGRAM with guide-level metering

| Tier | Price (indicative) | Includes |
|------|-------------------|----------|
| `single-guide` | $29 | 1 unit complete (11 PMs + GFPI + DOCX) |
| `program` | $99 | Full program (up to 8 units) |
| `institutional` | $299/mo | Unlimited programs + custom templates + support |

**Architecture hook:** `state.py` meters `guides_completed: int` per user, not `runs_started`. A run that fails mid-pipeline does not count against the quota.

### Decision 6 — PM-4.1 dual insertion (NEW)
PM-4.1 (Evaluation Instruments) is generated ONCE during Moment 3 (Building the Learning Guide) and inserted in TWO locations:
1. **Learning Guide** — the learner receives the checklist + rubric as part of their guide
2. **Instructor's Playbook** — the instructor receives the same instruments as part of PM-3.1

This is implemented as a single generation with two render targets in the Assembler, not as two separate PM executions.

### Decision 7 — Auto-generation for PM-3.4 and PM-4.2 (NEW)
PM-3.4 (Workbook) and PM-4.2 (Quiz) use automatic archetype selection:
- **PM-3.4:** Selects 2 archetypes per PM from PM-2.3 to PM-2.10 (no human gate)
- **PM-4.2:** Selects 1 archetype per PM from PM-2.3 to PM-2.10 (no human gate)

Selection uses the configured profile (balanced/production/engagement) to pick archetypes. The instructor only confirms whether they want the product generated (C-2, C-3), not which archetypes to use.

---

*SPEC-001: System Design — LG Factory Engine*
*Status: DRAFT v0.2 — Pending review after FLOW-v2 approval*
*Updated: 2026-03-24 per FLOW-v2 corrections*
*Next action: SPEC-002 Data Models (add ProductCategory enum)*
