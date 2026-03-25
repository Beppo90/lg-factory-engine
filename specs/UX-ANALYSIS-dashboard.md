# UX ANALYSIS: LG Factory Dashboard
## Functional Design — User Journey vs. Pipeline Architecture
## Author: Sergio Cortés Perdomo + Claude
## Date: 2026-03-23

---

## 1. THE CORE PROBLEM

The current dashboard exposes the **engine's internal structure** (programs, providers, profiles, dry run) instead of modeling the **user's actual task**: "I need to produce a complete learning guide for my ESP program."

The user is an ESP curriculum designer (SPEC-001 §2). They think in terms of:
- "What program am I building?" (e.g., Maritime English, ADSO)
- "What will my guide look like?" (worksheets, workbook, evaluation)
- "Where am I in the process?" (how many units done, what's next)
- "Can I see and download what's been generated?"

They do NOT think in terms of: providers, profiles, JSON uploads, run IDs, or API calls.

---

## 2. CURRENT STATE — WHAT'S WRONG

### Screenshot analysis (2026-03-23):

```
┌──────────────────────────────────────────┐
│ LG Factory                    ● connected│
│                                          │
│ Automated Learning Guide Generator...    │
│                                          │
│ [Generate]  Programs  Runs               │
│                                          │
│ STEP 1 — CHOOSE A PROGRAM               │
│ ┌──────────────────────────────────────┐ │
│ │ Inglés Marítimo y Portuario    A1.2  │ │
│ │ maritime — 5 units                   │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ STEP 2 — CONFIGURE & GENERATE           │
│ ┌──────────────────────────────────────┐ │
│ │ [Claude ▼] [Balanced ▼]             │ │
│ │                                      │ │
│ │ [Generate Learning Guides]  □ Test   │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### Problems identified:

| # | Problem | Root cause | Impact |
|---|---------|-----------|--------|
| P1 | Only 1 program visible — looks like a maritime-only tool | No sample programs, no onboarding | New user thinks "this isn't for me" |
| P2 | "Teaching Style" (Balanced/Production/Engagement) is meaningless to user | Engine concept leaked into UI | User picks randomly or ignores it |
| P3 | No visibility into WHAT will be generated | No preview of the 22 PMs / pipeline structure | User can't set expectations |
| P4 | "Generate" fires and forgets — no real progress narrative | Progress bar shows units but not the pedagogical journey | User doesn't understand what's happening |
| P5 | No way to see, browse, or preview outputs during generation | Files only visible after completion | User waits blindly |
| P6 | "Programs" tab is just upload JSON — no way to create a program in the UI | Requires technical JSON knowledge | Non-developer users blocked |
| P7 | Run history shows raw IDs, no context | No program name, no summary, no download | History is useless |
| P8 | No connection to the 4-phase circular design that IS the product | The 4 phases (Análisis → Planeación → Ejecución → Evaluación) are invisible | The USP of the product is hidden |
| P9 | 6 Human Gates (G1-G6) are auto-approved in web mode | NullCheckpointHandler skips all gates | The "human-in-the-loop" value proposition is nullified |
| P10 | No indication of what a "Learning Guide" actually contains | No deliverable preview | User can't articulate the product's value |

---

## 3. USER JOURNEY — AS IT SHOULD BE

Based on SPEC-001 (Product Vision), SPEC-003 (Orchestrator), and the 4-phase circular design:

### Phase 0: Onboarding (new user)
```
USER THINKS: "What can this tool do for me?"

DASHBOARD SHOWS:
→ Hero explanation: "Create complete ESP learning guides in hours, not weeks"
→ What you get: 10 worksheets + workbook + playbook + evaluation + GFPI document
→ Sample output preview (maritime-g1 as example)
→ CTA: "Create your first program" or "Try with sample program"
```

### Phase 1: Program Definition
```
USER THINKS: "I need to set up my program — name, units, vocabulary, CEFR level"

DASHBOARD SHOWS:
→ Program wizard OR JSON upload (advanced)
→ Fields: program name, domain, CEFR level, number of units
→ Per unit: name, theme, grammar targets, 20 vocabulary terms
→ Optional: narrative universe (company, characters, scenarios)
→ Preview: "Your program will generate X worksheets across Y units"
```

### Phase 2: Generation Configuration
```
USER THINKS: "How do I want my guides to be generated?"

DASHBOARD SHOWS:
→ Teaching Style explained visually:
  • Balanced: "Each unit uses a different activity style for variety"
  • Production: "Fastest generation, straightforward activities"
  • Engagement: "Game-based, role-play, high-interaction activities"
→ AI Provider (technical, can be hidden under "Advanced")
→ Clear summary: "This will generate 160 files across 5 units using 22 master prompts"
→ Cost estimate: "~$4.20 in API costs (or free in test mode)"
```

### Phase 3: Live Generation Dashboard
```
USER THINKS: "What's happening? How far along are we?"

DASHBOARD SHOWS:
→ Visual pipeline: 4 PHASES shown as circular/linear progress
  FASE 1: ANÁLISIS    [████████████] ✓ Complete
  FASE 2: PLANEACIÓN  [████████░░░░] 67% — Generating PM-2.6 (Listening)
  FASE 3: EJECUCIÓN   [░░░░░░░░░░░░] Pending
  FASE 4: EVALUACIÓN  [░░░░░░░░░░░░] Pending

→ Current unit detail:
  Unit 3 of 5: "Emergency Procedures"
  Current PM: PM-2.6 — Listening: The Auditory Anchor
  Archetype: "Gap-Fill Dictation" (auto-selected by Balanced profile)

→ Units overview:
  ✓ Unit 1: Ship Overview (16/16 PMs complete)
  ✓ Unit 2: Navigation (16/16 PMs complete)
  ◉ Unit 3: Emergency Procedures (8/16 PMs...)
  ○ Unit 4: Cargo Operations
  ○ Unit 5: Port Communications

→ Live file tree (expandable):
  unit-1/
    ✓ pm-2.1-spark.md
    ✓ pm-2.2-gap-analysis.md
    ✓ pm-2.3-reading.md (click to preview)
    ...

→ Stats: 45,000 tokens | 12 API calls | $1.35 cost
```

### Phase 4: Human Gates (CRITICAL — currently missing in web)
```
USER THINKS: "I want to choose the activity styles for my worksheets"

DASHBOARD SHOWS (when a gate is triggered):
→ G1 — Story Selection:
  "We found 3 authentic texts for Unit 1. Choose 2:"
  [Article about ship navigation] [IMO safety bulletin] [Maritime case study]

→ G2 — Archetype Selection:
  "Choose the activity style for PM-2.3 Reading (Unit 1):"
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ Jigsaw       │ │ Annotation   │ │ Treasure Hunt│
  │ Reading      │ │ Station      │ │              │
  │              │ │              │ │              │
  │ Students     │ │ Students     │ │ Students     │
  │ read parts   │ │ annotate     │ │ search for   │
  │ & teach      │ │ shared text  │ │ specific     │
  │ each other   │ │ with notes   │ │ information  │
  │              │ │              │ │              │
  │ ★★★ Inter.  │ │ ★★ Inter.   │ │ ★★★ Inter.  │
  └──────────────┘ └──────────────┘ └──────────────┘

  [Or let the system choose: Balanced profile suggests "Dual-Text Compare"]

→ G4 — Final Mission approval
→ G5 — Validation report review
→ G6 — Export confirmation
```

### Phase 5: Review & Download
```
USER THINKS: "Let me see what was generated and download it"

DASHBOARD SHOWS:
→ Complete file tree organized by deliverable type:
  📚 Worksheets (10 per unit × 5 units = 50 files)
  📖 Workbook (autonomous practice)
  📋 Playbook (session plans for instructor)
  🎯 Evaluation (checklist + rubric + quiz)
  📄 GFPI-F-135 (institutional document)

→ Preview any file inline (markdown rendered)
→ Download individual files or complete ZIP
→ Run validation report
→ Export to DOCX
```

---

## 4. GAP ANALYSIS — CURRENT vs. IDEAL

| Feature | Current state | Ideal state | Priority | Effort |
|---------|--------------|-------------|----------|--------|
| Onboarding/hero | None | Explanation + sample + CTA | HIGH | Low |
| Program creation wizard | JSON upload only | Step-by-step form | HIGH | Medium |
| 4-phase visual pipeline | Hidden | Central to the experience | HIGH | Medium |
| Per-PM progress with names | Generic progress bar | Named PMs with phase context | HIGH | Low |
| Human gates in web | All auto-approved | Interactive modal selection | CRITICAL | High |
| File preview during generation | None | Live file tree with preview | MEDIUM | Medium |
| File preview/download post-run | Basic file list | Organized by deliverable type | MEDIUM | Low |
| Teaching Style explanation | Dropdown with labels | Visual cards with description | LOW | Low |
| Cost estimation pre-run | None | Token/cost preview | LOW | Low |
| Run history with context | Raw ID + status | Program name + summary + download | MEDIUM | Low |
| Deliverable overview | None | "What you get" preview | HIGH | Low |

---

## 5. RECOMMENDED IMPLEMENTATION PHASES

### V2.1 — Quick wins (can ship this week)
1. **Onboarding section** on Generate tab: "What LG Factory creates" with deliverable list
2. **4-phase progress indicator** during generation (map PMs to phases)
3. **Better run cards** in Runs tab (program name, phase reached, file count)
4. **Teaching Style** as visual cards, not dropdown
5. **Pre-run summary**: "This will generate X files using Y API calls (~$Z)"

### V2.2 — Program Creation (next week)
6. **Program creation form** (not just JSON upload): name, domain, CEFR, units, vocabulary
7. **Sample program library**: maritime, ADSO, healthcare, IT as starting templates
8. **Program duplication**: "Clone Maritime and customize for your domain"

### V2.3 — Human Gates in Web (key differentiator)
9. **WebSocket checkpoint handler** that replaces NullCheckpointHandler
10. **G2 archetype selection modal** with visual archetype cards
11. **G1 story selection** with article previews
12. **G4/G5/G6 approval screens**
13. **Override option**: "Let the system choose for me" (falls back to profile auto)

### V2.4 — Output Experience
14. **Live file tree** during generation
15. **Inline Markdown preview** for any generated worksheet
16. **Organized download** by deliverable type
17. **ZIP export** of complete guide
18. **DOCX export** integration

---

## 6. ARCHITECTURE IMPLICATIONS

### Current API endpoints needed for dashboard improvements:

| Endpoint | Exists? | Changes needed |
|----------|---------|---------------|
| `GET /api/health` | ✓ | None |
| `GET /api/programs` | ✓ | Add deliverable count preview |
| `POST /api/programs` | ✓ | Add form-based creation (not just raw JSON) |
| `GET /api/runs/{id}` | ✓ | Add phase info, PM names, archetype used |
| `GET /api/runs/{id}/files` | ✓ | Add file categorization (worksheet/workbook/eval) |
| `GET /api/runs/{id}/files/{name}` | ✓ | Add inline preview (render markdown) |
| `WS /api/runs/{id}/live` | ✗ | WebSocket for real-time progress |
| `WS /api/runs/{id}/gate` | ✗ | WebSocket for human gate interaction |
| `POST /api/runs/{id}/gate/{gate_id}` | ✗ | Submit human decision for a gate |
| `GET /api/runs/{id}/validation` | ✗ | Get validation report |
| `POST /api/runs/{id}/export` | ✗ | Trigger DOCX/ZIP export |
| `GET /api/templates` | ✗ | List sample program templates |

### CheckpointHandler replacement:

```
CURRENT:
  NullCheckpointHandler → auto-approves everything

NEEDED:
  WebCheckpointHandler:
    - When gate is triggered → save gate state to RunState
    - Set status = "waiting_human"
    - Frontend polls or WebSocket detects gate
    - Frontend presents options to user
    - User submits decision via POST /api/runs/{id}/gate/{gate_id}
    - Pipeline resumes
```

This means the pipeline architecture already supports this (SPEC-003 §5 defines the CheckpointHandler as abstract). The only missing piece is a web-aware implementation.

---

## 7. THE 4-PHASE VISUAL MODEL

This is the **heart of the product** and should be the central UI element:

```
         FASE 1              FASE 2
        ANÁLISIS           PLANEACIÓN
      ┌─────────┐        ┌─────────┐
      │ PM-1.1  │        │ PM-2.1  │  The Spark
      │ PM-1.2  │───────▶│ PM-2.2  │  Gap Analysis
      │         │        │ PM-2.3  │  Reading
      │ Ruta    │        │ PM-2.4  │  Writing
      │ Macro-  │        │ PM-2.5  │  Vocabulary
      │ temática│        │ PM-2.6  │  Listening
      │   +     │        │ PM-2.7  │  Pronunciation
      │ Scope & │        │ PM-2.8  │  Speaking
      │ Sequence│        │ PM-2.9  │  Functions
      └─────────┘        │ PM-2.10 │  Grammar
                         └────┬────┘
                              │
         FASE 4              │            FASE 3
       EVALUACIÓN            │          EJECUCIÓN
      ┌─────────┐           │         ┌─────────┐
      │ PM-4.1  │◀──────────┼─────────│ PM-3.1  │  Playbook
      │ PM-4.2  │           │         │ PM-3.2  │  Build-Outs
      │         │           │         │ PM-3.3  │  Canva Deck
      │Checklist│           └────────▶│ PM-3.4  │  Workbook
      │ Rubric  │                     │ PM-3.5  │  Final Mission
      │  Quiz   │                     │ PM-3.6  │  GFPI Assembly
      └─────────┘                     └─────────┘
```

Each phase should light up as the pipeline progresses. Each PM should show its name (not just "PM-2.3" but "Reading — The Master Anchor"). The user should see WHAT is being generated, not just a progress bar.

---

## 8. KEY METRICS TO TRACK IN UI

| Metric | Where | Why |
|--------|-------|-----|
| PMs completed / total | Progress bar | User knows how far along |
| Current phase name | Phase indicator | User understands the pedagogical flow |
| Current PM name + description | Status line | User knows what's being generated NOW |
| Archetype selected per PM | Run detail | User can review choices made |
| Files generated | Live tree | User sees tangible output |
| Tokens consumed | Stats | Cost awareness |
| Estimated time remaining | Progress | Expectation management |
| Validation status | After completion | Quality confidence |

---

*UX Analysis: LG Factory Dashboard*
*Status: DRAFT — Ready for review*
*Next: Implement V2.1 quick wins*
