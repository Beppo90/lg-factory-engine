"""
LG Factory Engine — Web API
FastAPI backend for pipeline execution, run management, and file serving.
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

# Ensure engine is importable
sys.path.insert(0, str(Path(__file__).parent))

from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from engine.models import (
    ProgramConfig, InstitutionalConfig, Instructor, UnitSpec, VocabTerm,
    CEFRLevel, NarrativeUniverse, Character, ArchetypeProfile, RunStatus,
)
from engine.orchestrator import run_pipeline
from engine.state import StateManager, _deserialize_runstate
from engine.checkpoints import CheckpointHandler, ArchetypeSelection
from engine.adapters.base import LLMAdapter


# ─── Config ──────────────────────────────────────────────────────

OUTPUT_DIR = Path(os.environ.get("OUTPUT_DIR", "output"))
STATE_MANAGER = StateManager(OUTPUT_DIR)

# Track active runs
_active_runs: dict[str, asyncio.Task] = {}


# ─── Null Checkpoint Handler ─────────────────────────────────────

class NullCheckpointHandler(CheckpointHandler):
    """Auto-approves all gates. Used when skip_checkpoints=True."""

    def present_story_selection(self, curated_sources: list[dict]) -> list[str]:
        return [s.get("id", f"story-{i}") for i, s in enumerate(curated_sources[:2])]

    def present_archetype_selection(
        self, pm_id: str, pm_name: str, archetypes: list,
        unit_name: str, profile_suggestion: str = None,
    ) -> ArchetypeSelection:
        from engine.models import DecisionSource
        arch_id = profile_suggestion or (archetypes[0].id if archetypes else "default")
        return ArchetypeSelection(
            pm_id=pm_id, unit_number=0,
            archetype_id=arch_id,
            source=DecisionSource.PROFILE_AUTO,
        )

    def present_transversal_map(self, injection_map: dict) -> bool:
        return True

    def present_final_mission(self, mission_design: dict) -> bool:
        return True

    def present_validation_report(self, report) -> str:
        return "approve"

    def present_export_preview(self, file_manifest: list[str]) -> bool:
        return True

    def ask_retry(self, pm_id: str, error_msg: str) -> bool:
        return False


# ─── Pydantic Models ─────────────────────────────────────────────

class RunRequest(BaseModel):
    program_id: str
    dry_run: bool = False
    profile: Optional[str] = None  # balanced | production | engagement | manual
    provider: str = "anthropic"  # anthropic | google


class RunResponse(BaseModel):
    run_id: str
    program_id: str
    status: str
    message: str


class RunStatusResponse(BaseModel):
    run_id: str
    program_id: str
    status: str
    current_unit: Optional[int] = None
    current_pm: Optional[str] = None
    total_tokens: int = 0
    total_api_calls: int = 0
    cost_estimate_usd: float = 0.0
    units_completed: int = 0
    total_units: int = 0
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


# ─── Helpers ──────────────────────────────────────────────────────

def _load_program_config(program_id: str) -> ProgramConfig:
    """Load a program config from JSON and convert to dataclass."""
    config_path = Path(__file__).parent / "config" / "programs" / f"{program_id}.json"
    if not config_path.exists():
        raise FileNotFoundError(f"Program config not found: {program_id}")

    data = json.loads(config_path.read_text(encoding='utf-8'))
    return _json_to_program_config(data)


def _json_to_program_config(data: dict) -> ProgramConfig:
    """Convert a JSON dict to ProgramConfig dataclass."""
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
            number=u["number"],
            name=u["name"],
            grammar_targets=u["grammar_targets"],
            theme=u["theme"],
            vocabulary=vocab,
        ))

    cefr = CEFRLevel(data.get("cefr_level", "A1.1"))
    profile = ArchetypeProfile(data.get("archetype_profile", "manual"))

    return ProgramConfig(
        id=data["id"],
        name=data["name"],
        institution=institution,
        domain=data["domain"],
        cefr_level=cefr,
        units=units,
        code=data.get("code"),
        competencia=data.get("competencia"),
        resultado_aprendizaje=data.get("resultado_aprendizaje"),
        universe=universe,
        sessions_per_unit=data.get("sessions_per_unit", 8),
        hours_per_session=data.get("hours_per_session", 3),
        skip_pm_1_1=data.get("skip_pm_1_1", False),
        archetype_profile=profile,
    )


def _get_run_state(run_id: str):
    """Load run state from disk. Tries all programs."""
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
    """Convert RunState to API response."""
    metering = raw_data.get("metering", {}) if raw_data else {}
    total_units = len(raw_data.get("unit_states", {})) if raw_data else 0
    units_completed = sum(
        1 for us in (raw_data or {}).get("unit_states", {}).values()
        if us.get("status") in ("phase4_complete", "validated", "exported")
    )

    errors = []
    for e in (raw_data or {}).get("error_log", []):
        errors.append({
            "timestamp": e.get("timestamp"),
            "severity": e.get("severity"),
            "message": e.get("message"),
            "pm_id": e.get("pm_id"),
        })

    return RunStatusResponse(
        run_id=state.run_id,
        program_id=state.program_id,
        status=state.status.value if isinstance(state.status, RunStatus) else state.status,
        current_unit=state.current_unit,
        current_pm=state.current_pm,
        total_tokens=metering.get("total_tokens", 0),
        total_api_calls=metering.get("total_api_calls", 0),
        cost_estimate_usd=metering.get("cost_estimate_usd", 0.0),
        units_completed=units_completed,
        total_units=total_units,
        errors=errors,
        created_at=state.created_at.isoformat() if state.created_at else None,
        updated_at=state.updated_at.isoformat() if state.updated_at else None,
    )


# ─── Background Pipeline Runner ──────────────────────────────────

async def _run_pipeline_background(
    run_id: str,
    program_config: ProgramConfig,
    dry_run: bool,
    profile: Optional[str],
    provider: str = "anthropic",
):
    """Execute the pipeline in a background thread."""
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

        # Run in thread pool since pipeline is synchronous
        loop = asyncio.get_event_loop()
        state = await loop.run_in_executor(
            None,
            lambda: run_pipeline(
                program_config=program_config,
                adapter=adapter,
                checkpoint_handler=checkpoint,
                state_manager=STATE_MANAGER,
                dry_run=dry_run,
                profile=profile_enum,
                skip_checkpoints=True,
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
    title="LG Factory Engine API",
    description="Web API for the LG Factory Engine — ESP Curriculum Design Pipeline",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Health ───────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


# ─── Programs ─────────────────────────────────────────────────────

@app.get("/api/programs", response_model=list[ProgramListItem])
async def list_programs():
    """List all available program configs."""
    programs = []
    prog_dir = Path(__file__).parent / "config" / "programs"
    if prog_dir.exists():
        for f in prog_dir.glob("*.json"):
            data = json.loads(f.read_text(encoding='utf-8'))
            programs.append(ProgramListItem(
                id=data["id"],
                name=data["name"],
                domain=data.get("domain", ""),
                cefr_level=data.get("cefr_level", ""),
                units=len(data.get("units", [])),
            ))
    return programs


@app.get("/api/programs/{program_id}")
async def get_program(program_id: str):
    """Get a program config by ID."""
    config_path = Path(__file__).parent / "config" / "programs" / f"{program_id}.json"
    if not config_path.exists():
        raise HTTPException(404, f"Program not found: {program_id}")
    return json.loads(config_path.read_text(encoding='utf-8'))


@app.post("/api/programs")
async def upload_program(program: ProgramUpload):
    """Upload a new program config."""
    prog_dir = Path(__file__).parent / "config" / "programs"
    prog_dir.mkdir(parents=True, exist_ok=True)

    config_path = prog_dir / f"{program.id}.json"
    data = program.model_dump()
    config_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
    return {"status": "created", "program_id": program.id}


# ─── Runs ─────────────────────────────────────────────────────────

@app.post("/api/runs", response_model=RunResponse)
async def start_run(request: RunRequest, background_tasks: BackgroundTasks):
    """Start a new pipeline run."""
    try:
        program_config = _load_program_config(request.program_id)
    except FileNotFoundError:
        raise HTTPException(404, f"Program not found: {request.program_id}")

    # Create run state
    state = STATE_MANAGER.create_run(request.program_id)
    state.program = program_config
    state.status = RunStatus.RUNNING
    STATE_MANAGER.save(state)

    # Launch background task
    task = asyncio.create_task(
        _run_pipeline_background(
            run_id=state.run_id,
            program_config=program_config,
            dry_run=request.dry_run,
            profile=request.profile,
            provider=request.provider,
        )
    )
    _active_runs[state.run_id] = task

    return RunResponse(
        run_id=state.run_id,
        program_id=request.program_id,
        status="running",
        message=f"Pipeline started. Poll /api/runs/{state.run_id} for status.",
    )


@app.get("/api/runs", response_model=list[RunListItem])
async def list_runs(program_id: Optional[str] = None):
    """List all runs, optionally filtered by program."""
    runs = STATE_MANAGER.list_runs(program_id)
    return [
        RunListItem(
            run_id=r["run_id"],
            program_id=r["program_id"],
            status=r["status"],
            created_at=r.get("created_at"),
        )
        for r in runs
    ]


@app.get("/api/runs/{run_id}")
async def get_run_status(run_id: str):
    """Get the status of a specific run."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")
    return _serialize_run_status(state, raw_data)


@app.delete("/api/runs/{run_id}")
async def cancel_run(run_id: str):
    """Cancel an active run."""
    if run_id in _active_runs:
        task = _active_runs[run_id]
        task.cancel()
        _active_runs.pop(run_id, None)

        # Update state
        state, raw_data = _get_run_state(run_id)
        if state:
            from engine.models import RunStatus as RS
            state.status = RS.ERROR
            STATE_MANAGER.save(state)

        return {"status": "cancelled", "run_id": run_id}

    raise HTTPException(404, f"No active run found: {run_id}")


# ─── Files ────────────────────────────────────────────────────────

@app.get("/api/runs/{run_id}/files")
async def list_run_files(run_id: str):
    """List all output files for a run."""
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
                "name": str(rel),
                "size": f.stat().st_size,
                "modified": datetime.fromtimestamp(f.stat().st_mtime).isoformat(),
            })

    return {"run_id": run_id, "files": files}


@app.get("/api/runs/{run_id}/files/{file_path:path}")
async def download_file(run_id: str, file_path: str):
    """Download a specific output file."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")

    run_dir = OUTPUT_DIR / state.program_id / f"run-{run_id[:8]}"
    target = (run_dir / file_path).resolve()

    # Security: ensure path is within run directory
    if not str(target).startswith(str(run_dir.resolve())):
        raise HTTPException(403, "Access denied")

    if not target.exists():
        raise HTTPException(404, f"File not found: {file_path}")

    # Set appropriate content type for DOCX
    media_type = "application/octet-stream"
    if target.suffix == ".md":
        media_type = "text/markdown"
    elif target.suffix == ".json":
        media_type = "application/json"

    return FileResponse(
        path=str(target),
        filename=target.name,
        media_type=media_type,
    )


# ─── State Inspection ────────────────────────────────────────────

@app.get("/api/runs/{run_id}/state")
async def get_run_state_raw(run_id: str):
    """Get the raw state.json for a run."""
    state, raw_data = _get_run_state(run_id)
    if state is None:
        raise HTTPException(404, f"Run not found: {run_id}")
    return raw_data


# ─── Static Frontend ──────────────────────────────────────────────

FRONTEND_DIR = Path(__file__).parent / "frontend"

if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
