"""
LG Factory Engine — Web API v0.2
FastAPI backend for pipeline execution, run management, and file serving.
Updated for 6-moment conversational flow with gates (G0-G6) and confirmations (C-1-C-5).
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

sys.path.insert(0, str(Path(__file__).parent))

from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from engine.models import (
    ProgramConfig, InstitutionalConfig, Instructor, UnitSpec, VocabTerm,
    CEFRLevel, NarrativeUniverse, Character, ArchetypeProfile, RunStatus,
    GateId, HumanDecision, DecisionType, DecisionSource, ProductCategory,
    NextAction, UnitState, Archetype, VersionInfo, Severity, ErrorEntry,
    ProgramType,
)
from engine.orchestrator import (
    run_pipeline, load_registry, load_archetypes, resolve_next,
    resolve_inputs, PHASE_2_ORDER,
)
from engine.state import StateManager, _deserialize_runstate
from engine.checkpoints import CheckpointHandler, CLICheckpointHandler
from engine.adapters.base import LLMAdapter
from engine.pm_runner import run_pm as engine_run_pm


# ─── Config ──────────────────────────────────────────────────────

OUTPUT_DIR = Path(os.environ.get("OUTPUT_DIR", "output"))
STATE_MANAGER = StateManager(OUTPUT_DIR)
_active_runs: dict[str, asyncio.Task] = {}

# Registry and archetypes loaded once
_pm_registry = None
_archetypes_data = None


def _get_registry():
    global _pm_registry
    if _pm_registry is None:
        _pm_registry = load_registry()
    return _pm_registry


def _get_archetypes():
    global _archetypes_data
    if _archetypes_data is None:
        _archetypes_data = load_archetypes()
    return _archetypes_data


# ─── Null Checkpoint Handler (auto-approve everything) ───────────

class NullCheckpointHandler(CheckpointHandler):
    def present_macrotheme_selection(self, suggested, program_type):
        return suggested[0] if suggested else "Default"

    def present_story_selection(self, curated_sources):
        return [s.get("id", f"story-{i}") for i, s in enumerate(curated_sources[:2])]

    def present_archetype_selection(self, pm_id, pm_name, archetypes, unit_name, profile_suggestion=None):
        from engine.models import ArchetypeSelection as AS
        return AS(pm_id=pm_id, unit_number=0,
                  archetype_id=profile_suggestion or (archetypes[0].id if archetypes else "A"),
                  source=DecisionSource.PROFILE_AUTO)

    def present_transversal_map(self, m): return True
    def present_final_mission(self, m): return True
    def present_validation_report(self, r): return "approve"
    def present_export_preview(self, f): return True
    def ask_retry(self, pm_id, e): return False
    def ask_optional_product(self, pm_id, name, cat): return True


# ─── Web Checkpoint Handler (pauses pipeline, waits for API call) ─

class WebCheckpointHandler(CheckpointHandler):
    """
    Instead of CLI prompts, this handler sets state to waiting_human
    and lets the API endpoints resolve the decision.
    """

    def __init__(self, state_manager: StateManager):
        self.sm = state_manager

    def _wait_for_decision(self, state, gate_id: str, default=None):
        """Poll state until a decision is recorded or timeout."""
        import time
        for _ in range(3600):  # 1 hour max
            self.sm.reload(state)
            for d in state.decisions:
                if d.gate.value == gate_id:
                    return d.value
            time.sleep(1)
        return default

    def present_macrotheme_selection(self, suggested, program_type):
        return suggested[0] if suggested else "Default"

    def present_story_selection(self, curated_sources):
        return [s.get("id", f"story-{i}") for i, s in enumerate(curated_sources[:2])]

    def present_archetype_selection(self, pm_id, pm_name, archetypes, unit_name, profile_suggestion=None):
        from engine.models import ArchetypeSelection as AS
        return AS(pm_id=pm_id, unit_number=0,
                  archetype_id=profile_suggestion or (archetypes[0].id if archetypes else "A"),
                  source=DecisionSource.PROFILE_AUTO)

    def present_transversal_map(self, m): return True
    def present_final_mission(self, m): return True
    def present_validation_report(self, r): return "approve"
    def present_export_preview(self, f): return True
    def ask_retry(self, pm_id, e): return False
    def ask_optional_product(self, pm_id, name, cat): return True


# ─── Pydantic Models ─────────────────────────────────────────────

class RunRequest(BaseModel):
    program_id: str
    dry_run: bool = False
    profile: Optional[str] = None
    provider: str = "anthropic"


class RunResponse(BaseModel):
    run_id: str
    program_id: str
    status: str
    message: str


class RunStatusResponse(BaseModel):
    run_id: str
    program_id: str
    status: str
    current_moment: int = 1
    current_unit: Optional[int] = None
    current_pm: Optional[str] = None
    total_tokens: int = 0
    total_api_calls: int = 0
    cost_estimate_usd: float = 0.0
    units_completed: int = 0
    total_units: int = 0
    confirmed_products: list[str] = []
    asked_products: list[str] = []
    rejected_products: list[str] = []
    errors: list[dict] = []
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class ProgramListItem(BaseModel):
    id: str
    name: str
    domain: str
    cefr_level: str
    units: int


class RunListItem(BaseModel):
    run_id: str
    program_id: str
    status: str
    current_moment: int = 1
    created_at: Optional[str] = None


class ProgramUpload(BaseModel):
    id: str
    name: str
    domain: str
    cefr_level: str
    code: Optional[str] = None
    competencia: Optional[str] = None
    resultado_aprendizaje: Optional[str] = None
    institution: dict
    universe: Optional[dict] = None
    units: list[dict]
    sessions_per_unit: int = 8
    hours_per_session: int = 3
    skip_pm_1_1: bool = False
    archetype_profile: str = "manual"
    program_type: Optional[str] = None
    macrotheme: Optional[str] = None


class TopicCreationRequest(BaseModel):
    """Input for PM-1.1: Topic Creation (Momento 1)"""
    program_name: str
    ficha: str
    program_type: str  # "técnica" or "tecnología"
    themes_input: str  # Base themes from curriculum design


class MacrothemeSelectionRequest(BaseModel):
    """Input for G0: Macrotheme Selection"""
    macrotheme: str  # Selected or free-form


class UniverseSetupRequest(BaseModel):
    """Input for PM-1.2: Setting the Universe (Momento 2)"""
    program_name: str
    ficha: str
    macrotheme: str
    cefr_level: str
    competencia: Optional[str] = None
    rap: Optional[str] = None


class TextSelectionRequest(BaseModel):
    """Input for G1: Text Selection"""
    selected_texts: list[str]  # IDs of selected texts


class ArchetypeSelectionRequest(BaseModel):
    """Input for G2: Archetype Selection"""
    archetype_id: str


class ConfirmationRequest(BaseModel):
    """Input for C-1 to C-5: Optional product confirmations"""
    confirmed: bool


class ProgramCreateFromForm(BaseModel):
    """Moment 1: Create program from conversational form"""
    program_name: str
    ficha: str
    program_type: str  # "técnica" or "tecnología"
    themes_input: str
    instructor_name: str = "Instructor"
    institution_name: str = "SENA"


class UniverseUpdateRequest(BaseModel):
    """Moment 2: Update program with universe/scope data"""
    macrotheme: str
    cefr_level: str
    competencia: Optional[str] = None
    rap: Optional[str] = None
    domain: str = "general"
    units: list[dict] = []  # [{number, name, grammar_targets, theme, vocabulary}]


class StepResponse(BaseModel):
    """Response from a pipeline step"""
    action: str  # run_pm, checkpoint, confirm_optional, validate, export, done
    status: str
    moment: int
    pm_id: Optional[str] = None
    pm_name: Optional[str] = None
    unit: Optional[int] = None
    gate: Optional[str] = None
    confirmation_id: Optional[str] = None
    tokens_used: int = 0
    message: str = ""
    preview: Optional[str] = None


# ─── Helpers ──────────────────────────────────────────────────────

def _load_program_config(program_id: str) -> ProgramConfig:
    config_path = Path(__file__).parent / "config" / "programs" / f"{program_id}.json"
    if not config_path.exists():
        raise FileNotFoundError(f"Program config not found: {program_id}")
    data = json.loads(config_path.read_text(encoding='utf-8'))
    return _json_to_program_config(data)


def _json_to_program_config(data: dict) -> ProgramConfig:
    instructor = Instructor(**data["institution"]["instructor"])
    institution = InstitutionalConfig(
        name=data["institution"]["name"],
        format=data["institution"]["format"],
        instructor=instructor,
        center=data["institution"].get("center"),
    )
    universe = None
    if "universe" in data:
        chars = [Character(**c) for c in data["universe"].get("characters", [])]
        universe = NarrativeUniverse(
            company=data["universe"]["company"],
            location=data["universe"]["location"],
            vessel=data["universe"].get("vessel"),
            characters=chars,
            scenarios=data["universe"].get("scenarios", []),
        )
    units = []
    for u in data["units"]:
        vocab = [VocabTerm(**v) for v in u.get("vocabulary", [])]
        units.append(UnitSpec(
            number=u["number"], name=u["name"],
            grammar_targets=u["grammar_targets"],
            theme=u["theme"], vocabulary=vocab,
        ))
    cefr = CEFRLevel(data.get("cefr_level", "A1.1"))
    profile = ArchetypeProfile(data.get("archetype_profile", "manual"))
    prog_type = data.get("program_type")
    if prog_type and prog_type in ("técnica", "tecnología"):
        prog_type_enum = ProgramType(prog_type)
    elif prog_type and prog_type in ("achievers_output", "instructor_playbook"):
        prog_type_enum = None
    else:
        prog_type_enum = None
    return ProgramConfig(
        id=data["id"], name=data["name"], institution=institution,
        domain=data["domain"], cefr_level=cefr, units=units,
        code=data.get("code"), competencia=data.get("competencia"),
        resultado_aprendizaje=data.get("resultado_aprendizaje"),
        universe=universe,
        program_type=prog_type_enum,
        macrotheme=data.get("macrotheme"),
        sessions_per_unit=data.get("sessions_per_unit", 8),
        hours_per_session=data.get("hours_per_session", 3),
        skip_pm_1_1=data.get("skip_pm_1_1", False),
        archetype_profile=profile,
        ficha=data.get("ficha"),
        themes_input=data.get("themes_input"),
    )


def _get_run_state(run_id: str):
    for prog_dir in OUTPUT_DIR.iterdir():
        if not prog_dir.is_dir():
            continue
        run_dir = prog_dir / f"run-{run_id[:8]}"
        state_file = run_dir / "state.json"
        if state_file.exists():
            data = json.loads(state_file.read_text(encoding='utf-8'))
            if data.get("run_id") == run_id:
                return _deserialize_runstate(data), data
    return None, None


def _serialize_run_status(state, raw_data: dict = None) -> RunStatusResponse:
    metering = raw_data.get("metering", {}) if raw_data else {}
    total_units = len(raw_data.get("unit_states", {})) if raw_data else 0
    units_completed = sum(
        1 for us in (raw_data or {}).get("unit_states", {}).values()
        if us.get("status") in ("phase2_complete", "phase4_complete", "validated", "exported")
    )
    errors = []
    for e in (raw_data or {}).get("error_log", []):
        errors.append({
            "timestamp": e.get("timestamp"), "severity": e.get("severity"),
            "message": e.get("message"), "pm_id": e.get("pm_id"),
        })

    return RunStatusResponse(
        run_id=state.run_id,
        program_id=state.program_id,
        status=state.status.value if isinstance(state.status, RunStatus) else state.status,
        current_moment=getattr(state, 'current_moment', 1),
        current_unit=state.current_unit,
        current_pm=state.current_pm,
        total_tokens=metering.get("total_tokens", 0),
        total_api_calls=metering.get("total_api_calls", 0),
        cost_estimate_usd=metering.get("cost_estimate_usd", 0.0),
        units_completed=units_completed,
        total_units=total_units,
        confirmed_products=getattr(state, 'confirmed_products', []),
        asked_products=getattr(state, 'asked_products', []),
        rejected_products=getattr(state, 'rejected_products', []),
        errors=errors,
        created_at=state.created_at.isoformat() if state.created_at else None,
        updated_at=state.updated_at.isoformat() if state.updated_at else None,
    )


# ─── Background Pipeline Runner ──────────────────────────────────

async def _run_pipeline_background(
    run_id: str, program_config: ProgramConfig,
    dry_run: bool, profile: Optional[str], provider: str = "anthropic",
):
    try:
        adapter = None
        if not dry_run:
            if provider == "google":
                from engine.adapters.google import GoogleAdapter
                adapter = GoogleAdapter()
            else:
                from engine.adapters.claude import ClaudeAdapter
                adapter = ClaudeAdapter()

        profile_enum = ArchetypeProfile(profile) if profile else None
        checkpoint = NullCheckpointHandler()

        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: run_pipeline(
                program_config=program_config, adapter=adapter,
                checkpoint_handler=checkpoint, state_manager=STATE_MANAGER,
                dry_run=dry_run, profile=profile_enum, skip_checkpoints=True,
            ),
        )
    except Exception as e:
        import traceback
        print(f"Pipeline error for run {run_id}: {e}")
        traceback.print_exc()
    finally:
        _active_runs.pop(run_id, None)


# ─── FastAPI App ─────────────────────────────────────────────────

app = FastAPI(
    title="LG Factory Engine API v0.2",
    description="Web API for LG Factory Engine — 6-moment conversational flow",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)


# ─── Health ───────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok", "version": "2.0.0", "timestamp": datetime.utcnow().isoformat()}


# ─── Programs ─────────────────────────────────────────────────────

@app.get("/api/programs", response_model=list[ProgramListItem])
async def list_programs():
    programs = []
    prog_dir = Path(__file__).parent / "config" / "programs"
    if prog_dir.exists():
        for f in prog_dir.glob("*.json"):
            data = json.loads(f.read_text(encoding='utf-8'))
            programs.append(ProgramListItem(
                id=data["id"], name=data["name"],
                domain=data.get("domain", ""), cefr_level=data.get("cefr_level", ""),
                units=len(data.get("units", [])),
            ))
    return programs


@app.get("/api/programs/{program_id}")
async def get_program(program_id: str):
    config_path = Path(__file__).parent / "config" / "programs" / f"{program_id}.json"
    if not config_path.exists():
        raise HTTPException(404, f"Program not found: {program_id}")
    return json.loads(config_path.read_text(encoding='utf-8'))


@app.post("/api/programs")
async def upload_program(program: ProgramUpload):
    prog_dir = Path(__file__).parent / "config" / "programs"
    prog_dir.mkdir(parents=True, exist_ok=True)
    config_path = prog_dir / f"{program.id}.json"
    data = program.model_dump()
    config_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
    return {"status": "created", "program_id": program.id}


# ─── PM Registry ──────────────────────────────────────────────────

@app.get("/api/registry")
async def get_pm_registry():
    """Get the complete PM registry with optional/auto flags."""
    reg = _get_registry()
    result = {}
    for pm_id, pm_def in reg.items():
        result[pm_id] = {
            "id": pm_def.id,
            "name": pm_def.name,
            "phase": pm_def.phase,
            "optional": pm_def.optional,
            "auto_generate": pm_def.auto_generate,
            "product_category": pm_def.product_category.value if pm_def.product_category else None,
            "auto_archetype_rule": pm_def.auto_archetype_rule,
            "insert_locations": pm_def.insert_locations,
            "checkpoint": pm_def.checkpoint.value if pm_def.checkpoint else None,
        }
    return result


@app.get("/api/archetypes/{pm_id}")
async def get_archetypes_for_pm(pm_id: str):
    """Get available archetypes for a specific PM."""
    arch_data = _get_archetypes()
    pm_archetypes = arch_data.get("archetypes", {}).get(pm_id, [])
    return {"pm_id": pm_id, "archetypes": pm_archetypes,
            "profiles": arch_data.get("profiles", {})}


# ─── Runs ─────────────────────────────────────────────────────────

@app.post("/api/runs", response_model=RunResponse)
async def start_run(request: RunRequest, background_tasks: BackgroundTasks):
    try:
        program_config = _load_program_config(request.program_id)
    except FileNotFoundError:
        raise HTTPException(404, f"Program not found: {request.program_id}")

    state = STATE_MANAGER.create_run(request.program_id)
    state.program = program_config
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    task = asyncio.create_task(
        _run_pipeline_background(
            run_id=state.run_id, program_config=program_config,
            dry_run=request.dry_run, profile=request.profile,
            provider=request.provider,
        )
    )
    _active_runs[state.run_id] = task

    return RunResponse(
        run_id=state.run_id, program_id=request.program_id,
        status="running",
        message=f"Pipeline started (6-moment flow). Poll /api/runs/{state.run_id}",
    )


@app.get("/api/runs", response_model=list[RunListItem])
async def list_runs(program_id: Optional[str] = None):
    runs = STATE_MANAGER.list_runs(program_id)
    return [
        RunListItem(
            run_id=r["run_id"], program_id=r["program_id"],
            status=r["status"],
            current_moment=r.get("current_moment", 1),
            created_at=r.get("created_at"),
        )
        for r in runs
    ]


@app.get("/api/runs/{run_id}")
async def get_run_status(run_id: str):
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")
    return _serialize_run_status(state, raw_data)


@app.delete("/api/runs/{run_id}")
async def cancel_run(run_id: str):
    if run_id in _active_runs:
        _active_runs[run_id].cancel()
        _active_runs.pop(run_id, None)
        state, raw_data = _get_run_state(run_id)
        if state:
            state.status = RunStatus.ERROR
            STATE_MANAGER.save(state)
        return {"status": "cancelled", "run_id": run_id}
    raise HTTPException(404, f"No active run found: {run_id}")


# ─── Gates (G0-G6) — Mandatory Decision Endpoints ────────────────

@app.post("/api/runs/{run_id}/gate/G0")
async def gate_macrotheme_selection(run_id: str, request: MacrothemeSelectionRequest):
    """G0: Submit macrotheme selection."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    # Check we're in the right state
    if state.current_moment != 1:
        raise HTTPException(400, f"Not in Moment 1 (current: {state.current_moment})")

    # Record decision
    state.decisions.append(HumanDecision(
        gate=GateId.G0,
        decision_type=DecisionType.MACROTHEME_SELECTION,
        value=request.macrotheme,
        timestamp=datetime.utcnow(),
    ))
    if state.program:
        state.program.macrotheme = request.macrotheme
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G0", "macrotheme": request.macrotheme}


@app.post("/api/runs/{run_id}/gate/G1")
async def gate_text_selection(run_id: str, request: TextSelectionRequest):
    """G1: Submit text selection."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.decisions.append(HumanDecision(
        gate=GateId.G1,
        decision_type=DecisionType.STORY_SELECTION,
        value=request.selected_texts,
        timestamp=datetime.utcnow(),
    ))
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G1", "selected": request.selected_texts}


@app.post("/api/runs/{run_id}/gate/G2/{pm_id}")
async def gate_archetype_selection(run_id: str, pm_id: str, request: ArchetypeSelectionRequest):
    """G2: Submit archetype selection for a specific PM."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.decisions.append(HumanDecision(
        gate=GateId.G2,
        decision_type=DecisionType.ARCHETYPE_SELECTION,
        value=request.archetype_id,
        timestamp=datetime.utcnow(),
        pm_id=pm_id,
        unit_number=state.current_unit,
    ))
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G2", "pm_id": pm_id, "archetype": request.archetype_id}


@app.post("/api/runs/{run_id}/gate/G3")
async def gate_transversal_approval(run_id: str, request: ConfirmationRequest):
    """G3: Approve/reject transversal function map."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.decisions.append(HumanDecision(
        gate=GateId.G3,
        decision_type=DecisionType.APPROVAL if request.confirmed else DecisionType.REJECTION,
        value="approved" if request.confirmed else "rejected",
        timestamp=datetime.utcnow(),
    ))
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G3", "approved": request.confirmed}


@app.post("/api/runs/{run_id}/gate/G5")
async def gate_validation_approval(run_id: str, request: ConfirmationRequest):
    """G5: Approve/reject validation report."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.decisions.append(HumanDecision(
        gate=GateId.G5,
        decision_type=DecisionType.APPROVAL if request.confirmed else DecisionType.REJECTION,
        value="approved" if request.confirmed else "abort",
        timestamp=datetime.utcnow(),
    ))
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G5", "approved": request.confirmed}


@app.post("/api/runs/{run_id}/gate/G6")
async def gate_export_confirmation(run_id: str, request: ConfirmationRequest):
    """G6: Confirm/cancel export."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.decisions.append(HumanDecision(
        gate=GateId.G6,
        decision_type=DecisionType.APPROVAL if request.confirmed else DecisionType.REJECTION,
        value="confirmed" if request.confirmed else "cancelled",
        timestamp=datetime.utcnow(),
    ))
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G6", "confirmed": request.confirmed}


# ─── Confirmations (C-1 to C-5) — Optional Product Endpoints ─────

@app.post("/api/runs/{run_id}/confirm/C-1")
async def confirm_canva(run_id: str, request: ConfirmationRequest):
    """C-1: Confirm Canva Deck (PM-3.3)."""
    return _handle_confirmation(run_id, "PM-3.3", "C-1", request.confirmed)


@app.post("/api/runs/{run_id}/confirm/C-2")
async def confirm_workbook(run_id: str, request: ConfirmationRequest):
    """C-2: Confirm Workbook (PM-3.4)."""
    return _handle_confirmation(run_id, "PM-3.4", "C-2", request.confirmed)


@app.post("/api/runs/{run_id}/confirm/C-3")
async def confirm_quiz(run_id: str, request: ConfirmationRequest):
    """C-3: Confirm Quiz IE-01 (PM-4.2)."""
    return _handle_confirmation(run_id, "PM-4.2", "C-3", request.confirmed)


@app.post("/api/runs/{run_id}/confirm/C-4")
async def confirm_playbook(run_id: str, request: ConfirmationRequest):
    """C-4: Confirm Playbook Outline (PM-3.1)."""
    return _handle_confirmation(run_id, "PM-3.1", "C-4", request.confirmed)


@app.post("/api/runs/{run_id}/confirm/C-5")
async def confirm_buildout(run_id: str, request: ConfirmationRequest):
    """C-5: Confirm Playbook Build-Out (PM-3.2)."""
    return _handle_confirmation(run_id, "PM-3.2", "C-5", request.confirmed)


def _handle_confirmation(run_id: str, pm_id: str, conf_id: str, confirmed: bool):
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.asked_products.append(pm_id)
    if confirmed:
        state.confirmed_products.append(pm_id)
    else:
        state.rejected_products.append(pm_id)

    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {
        "status": "accepted", "confirmation": conf_id,
        "pm_id": pm_id, "confirmed": confirmed,
    }


# ─── Files ────────────────────────────────────────────────────────

@app.get("/api/runs/{run_id}/files")
async def list_run_files(run_id: str):
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    run_dir = OUTPUT_DIR / state.program_id / f"run-{run_id[:8]}"
    if not run_dir.exists():
        raise HTTPException(404, "Run directory not found")

    files = []
    for f in sorted(run_dir.rglob("*")):
        if f.is_file():
            rel = f.relative_to(run_dir)
            files.append({
                "name": str(rel), "size": f.stat().st_size,
                "modified": datetime.fromtimestamp(f.stat().st_mtime).isoformat(),
            })
    return {"run_id": run_id, "files": files}


@app.get("/api/runs/{run_id}/files/{file_path:path}")
async def download_file(run_id: str, file_path: str):
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    run_dir = OUTPUT_DIR / state.program_id / f"run-{run_id[:8]}"
    target = (run_dir / file_path).resolve()

    if not str(target).startswith(str(run_dir.resolve())):
        raise HTTPException(403, "Access denied")
    if not target.exists():
        raise HTTPException(404, f"File not found: {file_path}")

    media_type = "application/octet-stream"
    if target.suffix == ".md": media_type = "text/markdown"
    elif target.suffix == ".json": media_type = "application/json"

    return FileResponse(path=str(target), filename=target.name, media_type=media_type)


# ─── State Inspection ────────────────────────────────────────────

@app.get("/api/runs/{run_id}/state")
async def get_run_state_raw(run_id: str):
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")
    return raw_data


# ─── Conversational Flow Helpers ──────────────────────────────────

def _create_default_institution(inst_name: str, instructor_name: str) -> InstitutionalConfig:
    return InstitutionalConfig(
        name=inst_name, format="gfpi-f-135",
        instructor=Instructor(name=instructor_name, role="Instructor"),
    )


def _build_program_config_from_form(form: ProgramCreateFromForm) -> ProgramConfig:
    """Create a minimal ProgramConfig from Moment 1 form data."""
    import uuid
    prog_id = f"prog-{uuid.uuid4().hex[:8]}"
    return ProgramConfig(
        id=prog_id, name=form.program_name,
        institution=_create_default_institution(form.institution_name, form.instructor_name),
        domain=form.program_type, cefr_level=CEFRLevel.A1_1,
        units=[UnitSpec(number=1, name="Unit 1", grammar_targets=["Basic"], theme="General")],
        ficha=form.ficha, themes_input=form.themes_input,
        program_type=ProgramType.TECNICA if form.program_type == "técnica" else ProgramType.TECNOLOGIA,
    )


def _save_program_config(program: ProgramConfig):
    """Persist ProgramConfig to disk as JSON."""
    prog_dir = Path(__file__).parent / "config" / "programs"
    prog_dir.mkdir(parents=True, exist_ok=True)
    data = {
        "id": program.id, "name": program.name, "domain": program.domain,
        "cefr_level": program.cefr_level.value if hasattr(program.cefr_level, 'value') else str(program.cefr_level),
        "code": program.code, "competencia": program.competencia,
        "resultado_aprendizaje": program.resultado_aprendizaje,
        "ficha": program.ficha, "themes_input": program.themes_input,
        "archetype_profile": program.archetype_profile.value if hasattr(program.archetype_profile, 'value') else str(program.archetype_profile),
        "sessions_per_unit": program.sessions_per_unit,
        "hours_per_session": program.hours_per_session,
        "skip_pm_1_1": program.skip_pm_1_1,
        "macrotheme": program.macrotheme,
        "institution": {
            "name": program.institution.name,
            "format": program.institution.format,
            "center": program.institution.center,
            "instructor": {
                "name": program.institution.instructor.name,
                "role": program.institution.instructor.role,
                "email": program.institution.instructor.email,
            },
        },
        "units": [
            {
                "number": u.number, "name": u.name,
                "grammar_targets": u.grammar_targets, "theme": u.theme,
                "vocabulary": [
                    {"term": v.term, "definition": v.definition, "spanish": v.spanish}
                    for v in u.vocabulary
                ],
            }
            for u in program.units
        ],
    }
    if program.universe:
        data["universe"] = {
            "company": program.universe.company,
            "location": program.universe.location,
            "vessel": program.universe.vessel,
            "characters": [
                {"name": c.name, "role": c.role, "description": c.description}
                for c in program.universe.characters
            ],
            "scenarios": program.universe.scenarios,
        }
    config_path = prog_dir / f"{program.id}.json"
    config_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')


def _run_pm_synchronous(pm_id: str, unit_num: int, state, registry: dict,
                         archetypes_data: dict, adapter=None, dry_run: bool = False):
    """Execute a single PM synchronously and store the result."""
    from datetime import datetime as dt
    from engine.pm_runner import compute_hash

    pm_def = registry.get(pm_id)
    if not pm_def:
        raise ValueError(f"PM {pm_id} not in registry")

    unit_key = str(unit_num) if pm_def.is_per_unit else "global"

    # Archetype selection
    selected_arch, arch_desc = None, ""
    if pm_def.auto_generate:
        arch_desc = f"Auto-generated ({pm_def.auto_archetype_rule})"
    elif pm_def.is_transversal:
        arch_desc = "Transversal"
    else:
        profile = state.program.archetype_profile if state.program else ArchetypeProfile.BALANCED
        profile_rules = archetypes_data.get("profiles", {}).get(
            profile.value if hasattr(profile, 'value') else str(profile), {}
        ).get("rules", {})
        pm_archetypes = archetypes_data.get("archetypes", {}).get(pm_id, [])
        if pm_id in profile_rules and pm_archetypes:
            for arch_id in profile_rules[pm_id]:
                match = next((a for a in pm_archetypes if a["id"] == arch_id), None)
                if match:
                    selected_arch = Archetype(
                        id=match["id"], name=match["name"], pm_id=pm_id,
                        description=match["description"],
                    )
                    arch_desc = f"{match['id']}) {match['name']}"
                    break
        if not selected_arch and pm_archetypes:
            a = pm_archetypes[0]
            selected_arch = Archetype(
                id=a["id"], name=a["name"], pm_id=pm_id, description=a["description"],
            )
            arch_desc = f"{a['id']}) {a['name']}"

    # Resolve inputs
    inputs = resolve_inputs(pm_def, state, unit_num, registry)

    state.current_pm = pm_id
    STATE_MANAGER.save(state)

    # Execute
    output = engine_run_pm(
        pm_def=pm_def, inputs=inputs, adapter=adapter,
        archetype=selected_arch, archetype_desc=arch_desc, dry_run=dry_run,
    )

    # Store
    if pm_def.is_per_unit:
        if unit_key not in state.unit_states:
            state.unit_states[unit_key] = UnitState(unit_number=unit_num)
        state.unit_states[unit_key].completed_pms[pm_id] = output
    else:
        state.completed_pms[pm_id] = output

    # Persist worksheet
    STATE_MANAGER.save_worksheet_content(state, pm_id, unit_num, output.worksheet, output.gfpi_section)

    # Metering
    if state.metering:
        state.metering.total_tokens += output.tokens_consumed
        state.metering.total_api_calls += 1
        state.metering.cost_estimate_usd += output.tokens_consumed * 0.000005

    state.current_pm = None
    STATE_MANAGER.save(state)


# ─── Conversational Flow Endpoints ───────────────────────────────

@app.post("/api/programs/create-from-form")
async def create_program_from_form(form: ProgramCreateFromForm):
    """Moment 1: Create a program config from the conversational form."""
    program = _build_program_config_from_form(form)
    _save_program_config(program)
    return {"status": "created", "program_id": program.id, "program_name": program.name}


@app.post("/api/programs/{program_id}/update-universe")
async def update_program_universe(program_id: str, req: UniverseUpdateRequest):
    """Moment 2: Update program with universe, CEFR, units, and macrotheme."""
    config_path = Path(__file__).parent / "config" / "programs" / f"{program_id}.json"
    if not config_path.exists():
        raise HTTPException(404, f"Program not found: {program_id}")

    data = json.loads(config_path.read_text(encoding='utf-8'))

    # Update fields
    data["macrotheme"] = req.macrotheme
    data["cefr_level"] = req.cefr_level
    if req.competencia:
        data["competencia"] = req.competencia
    if req.rap:
        data["resultado_aprendizaje"] = req.rap
    if req.domain:
        data["domain"] = req.domain
    if req.units:
        data["units"] = req.units

    config_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')

    # Invalidate cached registry
    global _pm_registry
    _pm_registry = None

    return {"status": "updated", "program_id": program_id}


@app.post("/api/runs/step", response_model=StepResponse)
async def pipeline_step(request: RunRequest):
    """Execute one pipeline step (conversational mode). Returns what happened."""
    registry = _get_registry()
    archetypes_data = _get_archetypes()

    # Create run
    state = STATE_MANAGER.create_run(request.program_id)
    try:
        state.program = _load_program_config(request.program_id)
    except FileNotFoundError:
        raise HTTPException(404, f"Program not found: {request.program_id}")
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    # Resolve next action
    action = resolve_next(state, registry)

    # ── DONE ──
    if action.type == "done":
        state.status = RunStatus.COMPLETE
        STATE_MANAGER.save(state)
        return StepResponse(
            action="done", status="complete", moment=state.current_moment,
            message="Pipeline complete! All learning guides have been generated.",
        )

    # ── RUN PM ──
    if action.type == "run_pm":
        unit_num = action.unit or 0
        state.current_unit = unit_num
        STATE_MANAGER.save(state)

        pm_def = registry.get(action.pm_id)
        pm_name = pm_def.name if pm_def else action.pm_id

        # Adapter
        adapter = None
        if not request.dry_run:
            if request.provider == "google":
                from engine.adapters.google import GoogleAdapter
                adapter = GoogleAdapter()
            else:
                from engine.adapters.claude import ClaudeAdapter
                adapter = ClaudeAdapter()

        try:
            _run_pm_synchronous(
                action.pm_id, unit_num, state, registry,
                archetypes_data, adapter, request.dry_run,
            )
            tokens = 0
            preview = ""
            if pm_def and pm_def.is_per_unit:
                us = state.unit_states.get(str(unit_num))
                if us and action.pm_id in us.completed_pms:
                    out = us.completed_pms[action.pm_id]
                    tokens = out.tokens_consumed
                    preview = out.worksheet[:300]
            else:
                if action.pm_id in state.completed_pms:
                    out = state.completed_pms[action.pm_id]
                    tokens = out.tokens_consumed
                    preview = out.worksheet[:300]

            return StepResponse(
                action="run_pm", status="running", moment=state.current_moment,
                pm_id=action.pm_id, pm_name=pm_name, unit=unit_num,
                tokens_used=tokens,
                message=f"Generated: {pm_name}" + (f" (Unit {unit_num})" if unit_num else ""),
                preview=preview,
            )
        except Exception as e:
            return StepResponse(
                action="error", status="error", moment=state.current_moment,
                pm_id=action.pm_id, message=str(e),
            )

    # ── CHECKPOINT ──
    if action.type == "checkpoint":
        state.status = RunStatus.WAITING_HUMAN
        STATE_MANAGER.save(state)
        gate = action.gate.value if action.gate else "?"

        gate_messages = {
            "G0": "Select a macrotheme from the suggestions below, or enter your own.",
            "G1": "Select the authentic texts for your program.",
            "G2": f"Choose an archetype for {action.pm_id}.",
            "G3": "Approve the transversal function map.",
            "G4": "Approve the final mission design.",
            "G5": "Review the validation report.",
            "G6": "Confirm export of all generated files.",
        }

        return StepResponse(
            action="checkpoint", status="waiting_human", moment=state.current_moment,
            gate=gate, pm_id=action.pm_id,
            message=gate_messages.get(gate, f"Gate {gate} — human decision required."),
        )

    # ── CONFIRM OPTIONAL ──
    if action.type == "confirm_optional":
        state.status = RunStatus.WAITING_CONFIRMATION
        STATE_MANAGER.save(state)
        pm_def = registry.get(action.pm_id)
        pm_name = pm_def.name if pm_def else action.pm_id
        category = "Achiever's Output" if action.pm_id in ["PM-3.3", "PM-3.4", "PM-4.2"] else "Instructor's Playbook"

        descriptions = {
            "PM-3.3": "A visual slide deck specification for Canva/PPTX — helps students visualize key concepts.",
            "PM-3.4": "A workbook with autonomous reinforcement activities for students to practice independently.",
            "PM-4.2": "A technical questionnaire (IE-01) covering all unit vocabulary and grammar.",
            "PM-3.1": "A session-by-session mapping of how to use the generated materials in class.",
            "PM-3.2": "A detailed minute-by-minute build-out of the playbook sessions.",
        }

        return StepResponse(
            action="confirm_optional", status="waiting_confirmation",
            moment=state.current_moment,
            pm_id=action.pm_id, pm_name=pm_name,
            confirmation_id=action.confirmation_id,
            message=f"{pm_name} ({category}): {descriptions.get(action.pm_id, 'Optional product.')}",
        )

    # ── VALIDATE ──
    if action.type == "validate":
        state.status = RunStatus.VALIDATING
        STATE_MANAGER.save(state)
        from engine.validator import run_validation
        report = run_validation(state)
        state.validation = report
        state.status = RunStatus.RUNNING
        STATE_MANAGER.save(state)
        return StepResponse(
            action="validate", status="validating", moment=6,
            message=f"Validation: {report.status} — {report.passed}/{report.total} checks passed, "
                    f"{report.warnings} warnings, {report.critical} critical.",
        )

    # ── EXPORT ──
    if action.type == "export":
        state.status = RunStatus.EXPORTING
        STATE_MANAGER.save(state)
        file_count = sum(
            1 for us in state.unit_states.values()
            for po in us.completed_pms.values() if po.file_path
        )
        state.status = RunStatus.COMPLETE
        STATE_MANAGER.save(state)
        return StepResponse(
            action="export", status="complete", moment=6,
            message=f"Export complete! {file_count} files generated. Download from the files section.",
        )

    return StepResponse(action="unknown", status="error", moment=state.current_moment, message="Unknown action")


# ─── Static Frontend ──────────────────────────────────────────────

FRONTEND_DIR = Path(__file__).parent / "frontend_dist"

if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")

# ─── G4 endpoint (added after initial write) ─────────────────────

@app.post("/api/runs/{run_id}/gate/G4")
async def gate_final_mission_approval(run_id: str, request: ConfirmationRequest):
    """G4: Approve/reject Final Mission design."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    state.decisions.append(HumanDecision(
        gate=GateId.G4,
        decision_type=DecisionType.APPROVAL if request.confirmed else DecisionType.REJECTION,
        value="approved" if request.confirmed else "rejected",
        timestamp=datetime.utcnow(),
    ))
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    return {"status": "accepted", "gate": "G4", "approved": request.confirmed}
