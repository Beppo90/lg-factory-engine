"""
LG Factory Engine — State Manager
SPEC-003 §7-8: Persistence protocol + resume protocol.

RunState is saved after EVERY significant event.
If the process crashes, it can resume from the last save point.
"""

import json
import os
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from engine.models import (
    RunState, RunStatus, UnitState, PMOutput, HumanDecision,
    ValidationReport, MeteringRecord, ErrorEntry, VersionInfo,
    Severity, DecisionType, DecisionSource, GateId,
)


def _default_serializable(obj):
    """JSON serializer for dataclass objects."""
    if isinstance(obj, datetime):
        return obj.isoformat()
    if hasattr(obj, '__dataclass_fields__'):
        d = {}
        for k, v in obj.__dict__.items():
            if k.startswith('_'):
                continue
            d[k] = v
        return d
    if hasattr(obj, 'value'):  # Enum
        return obj.value
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")


def _deserialize_runstate(data: dict) -> RunState:
    """Reconstruct a RunState from JSON dict."""
    # Deserialize unit_states
    unit_states = {}
    for key, us_data in data.get("unit_states", {}).items():
        completed_pms = {}
        for pm_id, pm_data in us_data.get("completed_pms", {}).items():
            completed_pms[pm_id] = PMOutput(
                pm_id=pm_data["pm_id"],
                unit_number=pm_data["unit_number"],
                worksheet=pm_data.get("worksheet", ""),
                gfpi_section=pm_data.get("gfpi_section", ""),
                version=VersionInfo(
                    semantic=pm_data.get("version", {}).get("semantic", "1.0"),
                    hash=pm_data.get("version", {}).get("hash", ""),
                ),
                generated_at=datetime.fromisoformat(pm_data["generated_at"]) if pm_data.get("generated_at") else None,
                archetype_used=pm_data.get("archetype_used"),
                tokens_consumed=pm_data.get("tokens_consumed", 0),
                llm_model=pm_data.get("llm_model"),
                file_path=pm_data.get("file_path"),
            )
        unit_states[key] = UnitState(
            unit_number=us_data.get("unit_number", int(key)),
            status=us_data.get("status", "pending"),
            phase=us_data.get("phase", 1),
            completed_pms=completed_pms,
        )

    # Deserialize decisions
    decisions = []
    for d in data.get("decisions", []):
        decisions.append(HumanDecision(
            gate=GateId(d["gate"]),
            decision_type=DecisionType(d["decision_type"]),
            value=d["value"],
            timestamp=datetime.fromisoformat(d["timestamp"]) if d.get("timestamp") else None,
            options_presented=d.get("options_presented", []),
            pm_id=d.get("pm_id"),
            unit_number=d.get("unit_number"),
            source=DecisionSource(d.get("source", "human")),
        ))

    # Deserialize errors
    errors = []
    for e in data.get("error_log", []):
        errors.append(ErrorEntry(
            timestamp=datetime.fromisoformat(e["timestamp"]) if e.get("timestamp") else None,
            severity=Severity(e["severity"]),
            message=e["message"],
            pm_id=e.get("pm_id"),
            unit_number=e.get("unit_number"),
            recoverable=e.get("recoverable", True),
        ))

    return RunState(
        run_id=data["run_id"],
        program_id=data["program_id"],
        status=RunStatus(data["status"]),
        created_at=datetime.fromisoformat(data["created_at"]) if data.get("created_at") else None,
        updated_at=datetime.fromisoformat(data["updated_at"]) if data.get("updated_at") else None,
        current_unit=data.get("current_unit"),
        current_pm=data.get("current_pm"),
        unit_states=unit_states,
        decisions=decisions,
        error_log=errors,
        metering=MeteringRecord(
            run_id=data.get("run_id", ""),
            user_id=data.get("metering", {}).get("user_id", "default"),
            program_id=data["program_id"],
            started_at=datetime.fromisoformat(data["metering"]["started_at"]) if data.get("metering", {}).get("started_at") else None,
            total_tokens=data.get("metering", {}).get("total_tokens", 0),
            total_api_calls=data.get("metering", {}).get("total_api_calls", 0),
            guides_completed=data.get("metering", {}).get("guides_completed", 0),
            cost_estimate_usd=data.get("metering", {}).get("cost_estimate_usd", 0.0),
        ) if data.get("metering") else None,
    )


class StateManager:
    """Manages RunState persistence to disk."""

    def __init__(self, base_output_dir: Path = None):
        self.base_dir = base_output_dir or Path("output")

    def get_run_dir(self, program_id: str, run_id: str) -> Path:
        return self.base_dir / program_id / f"run-{run_id[:8]}"

    def get_state_path(self, program_id: str, run_id: str) -> Path:
        return self.get_run_dir(program_id, run_id) / "state.json"

    def create_run(self, program_id: str) -> RunState:
        """Create a new RunState and persist it."""
        state = RunState.create(program_id)
        state.metering.run_id = state.run_id
        self.save(state)
        return state

    def save(self, state: RunState):
        """Persist RunState to disk."""
        state.updated_at = datetime.utcnow()
        run_dir = self.get_run_dir(state.program_id, state.run_id)
        run_dir.mkdir(parents=True, exist_ok=True)

        # Serialize
        data = {
            "run_id": state.run_id,
            "program_id": state.program_id,
            "status": state.status.value if isinstance(state.status, RunStatus) else state.status,
            "created_at": state.created_at.isoformat() if state.created_at else None,
            "updated_at": state.updated_at.isoformat() if state.updated_at else None,
            "current_unit": state.current_unit,
            "current_pm": state.current_pm,
            "unit_states": {},
            "decisions": [],
            "error_log": [],
            "metering": None,
        }

        # Serialize unit_states
        for key, us in state.unit_states.items():
            data["unit_states"][str(key)] = {
                "unit_number": us.unit_number,
                "status": us.status,
                "phase": us.phase,
                "completed_pms": {},
            }
            for pm_id, pm_out in us.completed_pms.items():
                data["unit_states"][str(key)]["completed_pms"][pm_id] = {
                    "pm_id": pm_out.pm_id,
                    "unit_number": pm_out.unit_number,
                    "worksheet": pm_out.worksheet[:500] + "..." if len(pm_out.worksheet) > 500 else pm_out.worksheet,
                    "worksheet_length": len(pm_out.worksheet),
                    "gfpi_section": pm_out.gfpi_section[:200] + "..." if len(pm_out.gfpi_section) > 200 else pm_out.gfpi_section,
                    "version": {"semantic": pm_out.version.semantic, "hash": pm_out.version.hash} if pm_out.version else None,
                    "generated_at": pm_out.generated_at.isoformat() if pm_out.generated_at else None,
                    "archetype_used": pm_out.archetype_used,
                    "tokens_consumed": pm_out.tokens_consumed,
                    "llm_model": pm_out.llm_model,
                    "file_path": pm_out.file_path,
                }

        # Serialize decisions
        for d in state.decisions:
            data["decisions"].append({
                "gate": d.gate.value if isinstance(d.gate, GateId) else d.gate,
                "decision_type": d.decision_type.value if isinstance(d.decision_type, DecisionType) else d.decision_type,
                "value": d.value,
                "timestamp": d.timestamp.isoformat() if d.timestamp else None,
                "options_presented": d.options_presented,
                "pm_id": d.pm_id,
                "unit_number": d.unit_number,
                "source": d.source.value if isinstance(d.source, DecisionSource) else d.source,
            })

        # Serialize errors
        for e in state.error_log:
            data["error_log"].append({
                "timestamp": e.timestamp.isoformat() if e.timestamp else None,
                "severity": e.severity.value if isinstance(e.severity, Severity) else e.severity,
                "message": e.message,
                "pm_id": e.pm_id,
                "unit_number": e.unit_number,
                "recoverable": e.recoverable,
            })

        # Serialize metering
        if state.metering:
            data["metering"] = {
                "run_id": state.metering.run_id,
                "user_id": state.metering.user_id,
                "program_id": state.metering.program_id,
                "tier": state.metering.tier,
                "guides_completed": state.metering.guides_completed,
                "total_tokens": state.metering.total_tokens,
                "total_api_calls": state.metering.total_api_calls,
                "started_at": state.metering.started_at.isoformat() if state.metering.started_at else None,
                "completed_at": state.metering.completed_at.isoformat() if state.metering.completed_at else None,
                "cost_estimate_usd": state.metering.cost_estimate_usd,
            }

        state_path = self.get_state_path(state.program_id, state.run_id)
        state_path.write_text(json.dumps(data, indent=2, ensure_ascii=False, default=_default_serializable), encoding='utf-8')

    def save_worksheet(self, state: RunState, unit_number: int, pm_id: str, content: str) -> Path:
        """Save a PM worksheet as a standalone markdown file."""
        run_dir = self.get_run_dir(state.program_id, state.run_id)
        unit_dir = run_dir / f"unit-{unit_number}"
        unit_dir.mkdir(parents=True, exist_ok=True)

        path = unit_dir / f"{pm_id.lower().replace('.', '-')}.md"
        path.write_text(content, encoding='utf-8')
        return path

    def load(self, program_id: str, run_id: str) -> RunState:
        """Load an existing RunState from disk."""
        state_path = self.get_state_path(program_id, run_id)
        if not state_path.exists():
            raise FileNotFoundError(f"No state found at {state_path}")

        data = json.loads(state_path.read_text(encoding='utf-8'))
        return _deserialize_runstate(data)

    def list_runs(self, program_id: str = None) -> list[dict]:
        """List all runs, optionally filtered by program."""
        runs = []
        search_dir = self.base_dir
        if program_id:
            search_dir = search_dir / program_id

        if not search_dir.exists():
            return runs

        for state_file in search_dir.rglob("state.json"):
            data = json.loads(state_file.read_text(encoding='utf-8'))
            runs.append({
                "run_id": data["run_id"],
                "program_id": data["program_id"],
                "status": data["status"],
                "created_at": data.get("created_at"),
                "path": str(state_file),
            })

        return sorted(runs, key=lambda r: r.get("created_at", ""), reverse=True)

    def save_worksheet_content(self, state: RunState, pm_id: str, unit_number: int,
                                worksheet: str, gfpi_section: str) -> dict[str, Path]:
        """Save both worksheet and GFPI section to disk."""
        run_dir = self.get_run_dir(state.program_id, state.run_id)
        unit_dir = run_dir / f"unit-{unit_number}"
        unit_dir.mkdir(parents=True, exist_ok=True)

        pm_filename = pm_id.lower().replace('.', '-')

        ws_path = unit_dir / f"{pm_filename}.md"
        ws_path.write_text(worksheet, encoding='utf-8')

        gfpi_path = unit_dir / f"{pm_filename}-gfpi.md"
        gfpi_path.write_text(gfpi_section, encoding='utf-8')

        return {"worksheet": ws_path, "gfpi": gfpi_path}
