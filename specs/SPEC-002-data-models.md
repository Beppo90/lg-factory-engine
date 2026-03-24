# SPEC-002: DATA MODELS & PM CONTRACTS — LG FACTORY ENGINE
## Specs-Driven Design · v0.2 DRAFT
## Author: Sergio Cortés Perdomo + Mimo
## Date: 2026-03-22 (Updated 2026-03-24 — Flow v2 correction)
## Changelog:
##   v0.2 — §2: Added ProductCategory, G0, waiting_confirmation
##          §9: Added optional, auto_generate, product_category, auto_archetype_rule, insert_locations to PMDefinition

---

## 0. ABOUT THIS DOCUMENT

This spec defines **every data structure** the engine uses. If SPEC-001 is the "what and why", SPEC-002 is the "what shape does the data take".

**What you'll learn here (architecture fundamentals):**
- **Schemas:** How to define the exact shape of data before writing code
- **Contracts:** Agreements between components — "I give you THIS, you give me THAT"
- **Enums:** Closed sets of valid values — eliminates typos and invalid states
- **Composition:** Building complex types from simple ones
- **Validation:** How schemas enforce correctness automatically

**Design principle:** Every object is defined as a JSON Schema. This means:
- It's language-agnostic (works in Python, TypeScript, Rust, anything)
- It's self-documenting (the schema IS the documentation)
- It's machine-validatable (we can auto-check that data is correct)

---

## 1. TYPE HIERARCHY

```
ProgramConfig
├── units: list[UnitSpec]
│   ├── grammar_targets: list[string]
│   ├── vocabulary: list[VocabTerm]  (20 terms)
│   └── stories: list[Story]  (2 selected from 3 curated)
├── cefr_level: CEFRLevel
├── domain: string
└── institutional: InstitutionalConfig

ArchetypeRegistry
├── archetypes: dict[pm_id, list[Archetype]]
└── profiles: dict[profile_name, ProfileConfig]

PMRegistry
└── pms: dict[pm_id, PMDefinition]
    ├── inputs: InputContract
    ├── outputs: OutputContract
    ├── prompt_template: string (path)
    ├── version: VersionInfo
    ├── dependencies: list[pm_id]
    ├── optional: bool                    # NEW (FLOW-v2)
    ├── auto_generate: bool               # NEW (FLOW-v2)
    ├── product_category: ProductCategory # NEW (FLOW-v2)
    ├── auto_archetype_rule: string|null  # NEW (FLOW-v2)
    └── insert_locations: list[string]    # NEW (FLOW-v2)

RunState
├── program: ProgramConfig
├── current_moment: int                   # NEW (FLOW-v2): 1-6
├── completed: dict[pm_id, PMOutput]
├── decisions: dict[gate_id, HumanDecision]
├── confirmed_products: list[pm_id]       # NEW (FLOW-v2)
├── asked_products: list[pm_id]           # NEW (FLOW-v2)
├── rejected_products: list[pm_id]        # NEW (FLOW-v2)
├── validation: ValidationReport
└── metering: MeteringRecord
```

---

## 2. CORE ENUMS

Enums are closed sets. If a value isn't in the enum, it's invalid. This prevents entire categories of bugs.

```yaml
# CEFRLevel — European framework levels
CEFRLevel:
  enum: ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1", "B1.2", "B2.1", "B2.2"]

# Phase — the 4 circular phases
Phase:
  enum: [1, 2, 3, 4]

# Conjunto — Phase 2 groupings
Conjunto:
  enum: ["apertura", "A", "B", "C"]

# PMId — all 22 valid PM identifiers
PMId:
  enum:
    - "PM-1.1"   # Ruta Macrotemática
    - "PM-1.2"   # Scope & Sequence
    - "PM-2.1"   # Spark
    - "PM-2.2"   # Gap Analysis
    - "PM-2.3"   # Reading
    - "PM-2.4"   # Writing
    - "PM-2.5"   # Literacy & Vocabulary
    - "PM-2.6"   # Listening
    - "PM-2.7"   # Pronunciation
    - "PM-2.8"   # Speaking
    - "PM-2.9"   # Language Functions (transversal)
    - "PM-2.10"  # Grammar
    - "PM-3.1"   # Playbook Outline
    - "PM-3.2"   # Build-Out
    - "PM-3.3"   # Canva Deck
    - "PM-3.4"   # Workbook
    - "PM-3.5"   # Final Mission
    - "PM-3.6"   # GFPI-F-135 Integrator
    - "PM-4.1"   # Evaluación (Checklist + Rúbrica + Feedback)
    - "PM-4.2"   # Cuestionario Técnico

# GateId — the 7 human checkpoints (G0–G6, from SPEC-001 §6)
GateId:
  enum: ["G0", "G1", "G2", "G3", "G4", "G5", "G6"]

# RunStatus — pipeline state machine
RunStatus:
  enum: ["initializing", "running", "waiting_human", "waiting_confirmation", "validating", "exporting", "complete", "error", "paused"]

# ArchetypeProfile — preset selection strategies (from Decision 2)
ArchetypeProfile:
  enum: ["balanced", "production", "engagement", "manual"]

# Severity — validation error levels
Severity:
  enum: ["critical", "warning", "info"]

# EvidenceType — SENA's triada
EvidenceType:
  enum: ["conocimiento", "desempeño", "producto"]

# ExportFormat — output file types
ExportFormat:
  enum: ["markdown", "docx", "pdf"]

# ProductCategory — NEW (FLOW-v2): who receives the deliverable
ProductCategory:
  enum: ["achievers_output", "instructor_playbook"]
  description: >
    achievers_output: Products the learner receives (Guide, Canva, Workbook, Quiz)
    instructor_playbook: Products the instructor uses (Playbook Outline, Build-Out)

# ProgramType — NEW (FLOW-v2): type of SENA program
ProgramType:
  enum: ["técnica", "tecnología"]
  description: >
    técnica: 6 macrothemes suggested
    tecnología: 10 macrothemes suggested

# ConfirmationId — NEW (FLOW-v2): optional product confirmation prompts
ConfirmationId:
  enum: ["C-1", "C-2", "C-3", "C-4", "C-5"]
  description: >
    C-1: Want PM-3.3 (Canva Deck)?
    C-2: Want PM-3.4 (Workbook)?
    C-3: Want PM-4.2 (Quiz)?
    C-4: Want PM-3.1 (Playbook)?
    C-5: Want PM-3.2 (Build-Out)?
```

---

## 3. PROGRAM CONFIG

This is the **input** that starts everything. One JSON file per program.

```json
{
  "$schema": "ProgramConfig",
  "id": "maritime-g1",
  "name": "Inglés Marítimo y Portuario",
  "code": "123456",
  "institution": {
    "name": "SENA",
    "center": "Centro de Comercio y Servicios — Regional Bolívar",
    "format": "gfpi-f-135",
    "instructor": {
      "name": "Sergio Cortés Perdomo",
      "role": "Instructor de Bilingüismo",
      "email": "sergiocoper@gmail.com"
    }
  },
  "domain": "maritime",
  "cefr_level": "A1.2",
  "competencia": "...",
  "resultado_aprendizaje": "...",
  "program_type": "técnica",
  "macrotheme": "Ship Overview & Port Operations",
  "universe": { ... },
  "units": [ ... ]
}
```

### Schema

```yaml
ProgramConfig:
  type: object
  required: [id, name, domain, cefr_level, units]
  properties:
    id:
      type: string
      pattern: "^[a-z0-9-]+$"
      description: "Unique identifier, e.g., 'maritime-g1'"
    name:
      type: string
      description: "Human-readable program name"
    code:
      type: string
      description: "Ficha/institutional code"
    institution:
      $ref: "#/InstitutionalConfig"
    domain:
      type: string
      description: "Industry domain (maritime, adso, healthcare, etc.)"
    cefr_level:
      $ref: "#/CEFRLevel"
    competencia:
      type: string
      nullable: true
      description: "Competencia del programa (optional)"
    resultado_aprendizaje:
      type: string
      nullable: true
      description: "RAP — Resultado de Aprendizaje (optional)"
    program_type:
      $ref: "#/ProgramType"
      description: "técnica (6 macrothemes) or tecnología (10 macrothemes)"
    macrotheme:
      type: string
      description: "The macrotheme selected in G0 or entered freely"
    universe:
      $ref: "#/NarrativeUniverse"
    units:
      type: array
      items: { $ref: "#/UnitSpec" }
      minItems: 1
      maxItems: 10
    sessions_per_unit:
      type: integer
      default: 8
    hours_per_session:
      type: integer
      default: 3
    skip_pm_1_1:
      type: boolean
      default: false
      description: "If true, skip PM-1.1 and use provided macrotheme directly"
    archetype_profile:
      $ref: "#/ArchetypeProfile"
      default: "manual"
```

---

## 4. UNIT SPEC

Each unit is a thematic division of the program.

```yaml
UnitSpec:
  type: object
  required: [number, name, grammar_targets, theme, vocabulary]
  properties:
    number:
      type: integer
      minimum: 1
    name:
      type: string
      description: "Unit name (e.g., 'Ship Overview')"
    grammar_targets:
      type: array
      items: { type: string }
      description: "Grammar points for this unit (e.g., 'Demonstratives')"
    theme:
      type: string
      description: "Thematic description in Spanish"
    vocabulary:
      type: array
      items: { $ref: "#/VocabTerm" }
      minItems: 20
      maxItems: 20
      description: "Exactly 20 key vocabulary terms"
    stories:
      type: array
      items: { $ref: "#/Story" }
      description: "Authentic stories selected at G1"
```

---

## 5. VOCABULARY TERM

```yaml
VocabTerm:
  type: object
  required: [term, definition]
  properties:
    term:
      type: string
    definition:
      type: string
    spanish:
      type: string
      nullable: true
    example:
      type: string
      nullable: true
```

---

## 6. NARRATIVE UNIVERSE

The narrative universe provides context for all activities.

```yaml
NarrativeUniverse:
  type: object
  required: [company, location, characters, scenarios]
  properties:
    company:
      type: string
    location:
      type: string
    vessel:
      type: string
      nullable: true
    characters:
      type: array
      items: { $ref: "#/Character" }
      minItems: 4
    scenarios:
      type: array
      items: { type: string }
      minItems: 3

Character:
  type: object
  required: [name, role]
  properties:
    name: { type: string }
    role: { type: string }
    description: { type: string, nullable: true }
```

---

## 7. INSTITUTIONAL CONFIG

```yaml
InstitutionalConfig:
  type: object
  required: [name, format]
  properties:
    name: { type: string }
    format: { type: string, default: "gfpi-f-135" }
    center: { type: string, nullable: true }
    instructor:
      type: object
      properties:
        name: { type: string }
        role: { type: string }
        email: { type: string, nullable: true }
    custom_fields:
      type: object
      additionalProperties: { type: string }
```

---

## 8. ARCHETYPE

```yaml
Archetype:
  type: object
  required: [id, name, pm_id, description]
  properties:
    id:
      type: string
      description: "Letter identifier (A, B, C, ...)"
    name:
      type: string
    pm_id:
      $ref: "#/PMId"
    description:
      type: string
    interactivity:
      enum: ["low", "medium", "high"]
      default: "medium"
    generation_complexity:
      enum: ["simple", "moderate", "complex"]
      default: "moderate"
    student_facing_name:
      type: string
      nullable: true
```

---

## 9. PM DEFINITION

The contract for each of the 22 Master Prompts.

```yaml
PMDefinition:
  type: object
  required: [id, name, phase, prompt_template, inputs, outputs, dependencies]
  properties:
    id:
      $ref: "#/PMId"
    name:
      type: string
    phase:
      $ref: "#/Phase"
    conjunto:
      $ref: "#/Conjunto"
      description: "Only for Phase 2 PMs"
    prompt_template:
      type: string
      description: "Path to the .md prompt template file"
    version:
      $ref: "#/VersionInfo"

    inputs:
      $ref: "#/InputContract"
    outputs:
      $ref: "#/OutputContract"

    archetypes:
      type: array
      items: { type: string }
      nullable: true
      description: "Archetype IDs available for this PM. Null for transversal/auto PMs"

    checkpoint:
      $ref: "#/GateId"
      nullable: true
      description: "Which gate, if any. Null = no human intervention"

    dependencies:
      type: array
      items: { $ref: "#/PMId" }
      description: "PMs that must complete before this one can run"

    is_transversal:
      type: boolean
      default: false
      description: "True for PM-2.9 (output injected into other PMs)"

    is_per_unit:
      type: boolean
      default: true
      description: "False for PM-1.1, PM-3.1-3.4, PM-4.2 which run once for the whole program"

    optional:
      type: boolean
      default: false
      description: "NEW (FLOW-v2): If true, instructor must confirm before generating"

    auto_generate:
      type: boolean
      default: false
      description: "NEW (FLOW-v2): If true, archetypes are selected automatically without human input"

    product_category:
      $ref: "#/ProductCategory"
      nullable: true
      description: "NEW (FLOW-v2): Which product category this deliverable belongs to"

    auto_archetype_rule:
      type: string
      nullable: true
      description: "NEW (FLOW-v2): Description of auto-selection rule (e.g., '2 arquetipos por PM')"

    insert_locations:
      type: array
      items: { type: string }
      default: ["learning_guide"]
      description: "NEW (FLOW-v2): Where to insert the output. PM-4.1 uses ['learning_guide', 'instructor_playbook']"
```

---

## 10. RUN STATE

The persistent record of a pipeline execution.

```yaml
RunState:
  type: object
  required: [run_id, program_id, status, created_at]
  properties:
    run_id:
      type: string
      format: uuid
    program_id:
      type: string
    status:
      $ref: "#/RunStatus"
    created_at:
      type: string
      format: date-time
    updated_at:
      type: string
      format: date-time
    current_moment:
      type: integer
      minimum: 1
      maximum: 6
      description: "NEW (FLOW-v2): Which of the 6 moments is active"
    current_unit:
      type: integer
      nullable: true
    current_pm:
      type: string
      nullable: true

    program:
      $ref: "#/ProgramConfig"

    unit_states:
      type: object
      additionalProperties: { $ref: "#/UnitState" }

    completed_pms:
      type: object
      additionalProperties: { $ref: "#/PMOutput" }

    decisions:
      type: array
      items: { $ref: "#/HumanDecision" }

    confirmed_products:
      type: array
      items: { type: string }
      description: "NEW (FLOW-v2): PM IDs of optional products the instructor confirmed"

    asked_products:
      type: array
      items: { type: string }
      description: "NEW (FLOW-v2): PM IDs of optional products already asked about"

    rejected_products:
      type: array
      items: { type: string }
      description: "NEW (FLOW-v2): PM IDs of optional products the instructor rejected"

    validation:
      $ref: "#/ValidationReport"
      nullable: true

    metering:
      $ref: "#/MeteringRecord"

    error_log:
      type: array
      items: { $ref: "#/ErrorEntry" }
```

### Unit State

```yaml
UnitState:
  type: object
  properties:
    unit_number:
      type: integer
    status:
      enum: ["pending", "in_progress", "phase2_complete", "phase4_complete", "validated", "exported"]
    phase:
      type: integer
    completed_pms:
      type: object
      additionalProperties: { $ref: "#/PMOutput" }
```

---

## 11. PM OUTPUT

```yaml
PMOutput:
  type: object
  required: [pm_id, worksheet, gfpi_section, version, generated_at]
  properties:
    pm_id: { $ref: "#/PMId" }
    unit_number: { type: integer }
    worksheet: { type: string, description: "Markdown content" }
    gfpi_section: { type: string }
    version: { $ref: "#/VersionInfo" }
    generated_at: { type: string, format: date-time }
    archetype_used: { type: string, nullable: true }
    tokens_consumed: { type: integer }
    llm_model: { type: string, nullable: true }
    file_path: { type: string, nullable: true }
```

---

## 12. HUMAN DECISION

```yaml
HumanDecision:
  type: object
  required: [gate, decision_type, value, timestamp]
  properties:
    gate: { $ref: "#/GateId" }
    decision_type:
      enum: ["story_selection", "archetype_selection", "approval", "rejection", "override", "macrotheme_selection"]
    value:
      oneOf:
        - type: string
        - type: array
          items: { type: string }
        - type: object
    timestamp: { type: string, format: date-time }
    options_presented: { type: array, items: { type: string } }
    pm_id: { type: string, nullable: true }
    unit_number: { type: integer, nullable: true }
    source:
      enum: ["human", "profile_auto", "profile_override"]
      default: "human"
```

---

## 13. VALIDATION

```yaml
ValidationReport:
  type: object
  required: [run_id, checked_at, status, checks]
  properties:
    run_id: { type: string }
    checked_at: { type: string, format: date-time }
    status: { enum: ["clean", "warnings", "critical_errors"] }
    checks: { type: array, items: { $ref: "#/ValidationCheck" } }
    total: { type: integer }
    passed: { type: integer }
    warnings: { type: integer }
    critical: { type: integer }

ValidationCheck:
  type: object
  required: [check_id, name, severity, passed]
  properties:
    check_id: { type: string }
    name: { type: string }
    severity: { $ref: "#/Severity" }
    passed: { type: boolean }
    details: { type: string, nullable: true }
    affected_pms: { type: array, items: { type: string } }
    affected_units: { type: array, items: { type: integer } }
```

---

## 14. METERING & ERROR

```yaml
MeteringRecord:
  type: object
  properties:
    run_id: { type: string }
    user_id: { type: string }
    program_id: { type: string }
    tier: { enum: ["single-guide", "program", "institutional"], default: "single-guide" }
    guides_completed: { type: integer }
    total_tokens: { type: integer }
    total_api_calls: { type: integer }
    started_at: { type: string, format: date-time }
    completed_at: { type: string, format: date-time, nullable: true }
    cost_estimate_usd: { type: number }

ErrorEntry:
  type: object
  required: [timestamp, severity, message]
  properties:
    timestamp: { type: string, format: date-time }
    severity: { $ref: "#/Severity" }
    message: { type: string }
    pm_id: { type: string, nullable: true }
    unit_number: { type: integer, nullable: true }
    stack_trace: { type: string, nullable: true }
    recoverable: { type: boolean, default: true }
```

---

*SPEC-002: Data Models & PM Contracts — LG Factory Engine*
*Status: DRAFT v0.2 — Pending review after FLOW-v2 approval*
*Updated: 2026-03-24 per FLOW-v2 corrections*
*Next: Implementation in engine/models.py*
