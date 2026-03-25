# SPEC-005: FRONTEND REACT UI ARCHITECTURE
## Specs-Driven Design · v1.0
## Author: Sergio Cortés Perdomo + Inteligencia Artificial
## Date: 2026-03-25
## Relates to: SPEC-003 (Orchestrator Gates)

---

## 0. ABOUT THIS DOCUMENT
This document outlines the architecture, state management, and component breakdown of the V2 Web UI built for the FPI SENA Factory Engine. The frontend is built as a Single Page Application (SPA) designed to mirror the Orchestrator's internal `RunState` and interface directly with the human gates (G0-G6) and confirmations (C-1 to C-5).

---

## 1. TECHNOLOGY STACK
- **Core Framework:** React v18 + Vite (compiled in `frontend/`)
- **Styling Architecture:** Vanilla CSS global variables (`index.css`)
- **Design Language:** Deep Dark Mode, Glassmorphism panels (`.glass-panel`), fluid micro-animations, glowing interactive buttons (`box-shadow` glows).

---

## 2. STATE MANAGEMENT & DATA FLOW

### The EngineContext (`src/context/EngineContext.jsx`)
The frontend does not maintain independent pipeline logic. It acts as a **dumb terminal** that faithfully renders the Orchestrator's state.

**Key responsibilities:**
1. **Polling:** Subscribes to the backend API (`src/services/api.js`) every 3 seconds to fetch the active `RunState` and the live terminal `consoleLogs`.
2. **Global State Provider:** Exposes the `activeRun` object to all child components.
3. **Dispatching Actions:** Provides `submitDecision` and `startPipeline` functions to asynchronously push decisions back to the Python engine.

---

## 3. CORE COMPONENTS

### A. Dashboard (`src/components/Dashboard.jsx`)
The entry point of the SPA when `activeRun` is null.
- Features a glowing header indicating the Engine's connection status.
- Primary "Launch Factory Engine" button.
- Displays a grid of recent or completed local runs.

### B. Pipeline Wizard (`src/components/PipelineWizard.jsx`)
The main view during an active pipeline run. It uses a CSS Grid split view:
1. **Left Column (The Console):** Uses the `ConsoleLog.jsx` component to render real-time Python print statements. It mimics a hacker terminal with a `.blinking-cursor`.
2. **Right Column (The Gate Manager):** A dynamic Interaction Layer. It uses a Switch Statement on `activeRun.pending_gate` to render specific modals when the Orchestrator halts.

---

## 4. HUMAN INTERACTION GATES (G0-G6)
These components live in `src/components/gates/` and are rendered dynamically by the `PipelineWizard`:

| Component | Target Gate | Description |
|-----------|-------------|-------------|
| **Gate0Macrotheme.jsx** | G0 | Renders candidate macrothemes (Moment 1). User selects one to lay the pipeline foundation. |
| **Gate1TextSelection.jsx** | G1 | Renders candidate authentic story texts (Story A/B/C). User selects exactly 2. |
| **Gate2Archetype.jsx** | G2 | Selects the pedagogical DNA (Archetype) before generating specific PM worksheets (Moment 3). |
| **Gate5Validation.jsx** | G5 | Renders a color-coded Diagnostic Dashboard (Green/Yellow/Red) interpreting the Validator's deterministic output. |
| **Gate6Export.jsx** | G6 | The final manifest confirmation before writing DOCX files to the `/output` folder. |

---

## 5. CONFIRMATION PROMPTS (C-1 to C-5)
Optional documents (Canva Deck, Quiz, Playbook) bypass the gates and use standard confirmations.
- **`ConfirmationPrompt.jsx`**: A generic reusable component that dynamically asks "Yes/No" depending on which `confirmationId` the Orchestrator passes.

---

## 6. LAUNCHING THE FRONTEND
To run the UI in development mode with HMR (Hot Module Replacement):
```bash
cd frontend
npm run dev
```
To compile optimized static assets for production deployment:
```bash
cd frontend
npm run build
```

---
*Fin del documento.*
