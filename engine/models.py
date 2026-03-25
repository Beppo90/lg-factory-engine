"""
LG Factory Engine — Data Models v0.2
Based on SPEC-002: Data Models & PM Contracts (FLOW-v2 update).

All types are defined as dataclasses with validation.
These are the contracts between components.
"""

from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import uuid4


# ─── ENUMS (SPEC-002 §2 — FLOW-v2) ─────────────────────────────

class CEFRLevel(str, Enum):
    A1_1 = "A1.1"
    A1_2 = "A1.2"
    A2_1 = "A2.1"
    A2_2 = "A2.2"
    B1_1 = "B1.1"
    B1_2 = "B1.2"
    B2_1 = "B2.1"
    B2_2 = "B2.2"


class Phase(int, Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4


class Conjunto(str, Enum):
    APERTURA = "apertura"
    A = "A"
    B = "B"
    C = "C"


class PMId(str, Enum):
    PM_1_1 = "PM-1.1"
    PM_1_2 = "PM-1.2"
    PM_2_1 = "PM-2.1"
    PM_2_2 = "PM-2.2"
    PM_2_3 = "PM-2.3"
    PM_2_4 = "PM-2.4"
    PM_2_5 = "PM-2.5"
    PM_2_6 = "PM-2.6"
    PM_2_7 = "PM-2.7"
    PM_2_8 = "PM-2.8"
    PM_2_9 = "PM-2.9"
    PM_2_10 = "PM-2.10"
    PM_3_1 = "PM-3.1"
    PM_3_2 = "PM-3.2"
    PM_3_3 = "PM-3.3"
    PM_3_4 = "PM-3.4"
    PM_3_5 = "PM-3.5"
    PM_3_6 = "PM-3.6"
    PM_4_1 = "PM-4.1"
    PM_4_2 = "PM-4.2"


class GateId(str, Enum):
    G0 = "G0"
    G1 = "G1"
    G2 = "G2"
    G3 = "G3"
    G4 = "G4"
    G5 = "G5"
    G6 = "G6"


class RunStatus(str, Enum):
    INITIALIZING = "initializing"
    RUNNING = "running"
    WAITING_HUMAN = "waiting_human"
    WAITING_CONFIRMATION = "waiting_confirmation"
    VALIDATING = "validating"
    EXPORTING = "exporting"
    COMPLETE = "complete"
    ERROR = "error"
    PAUSED = "paused"


class ArchetypeProfile(str, Enum):
    BALANCED = "balanced"
    PRODUCTION = "production"
    ENGAGEMENT = "engagement"
    MANUAL = "manual"


class Severity(str, Enum):
    CRITICAL = "critical"
    WARNING = "warning"
    INFO = "info"


class EvidenceType(str, Enum):
    CONOCIMIENTO = "conocimiento"
    DESEMPENO = "desempeño"
    PRODUCTO = "producto"


class ExportFormat(str, Enum):
    MARKDOWN = "markdown"
    DOCX = "docx"
    PDF = "pdf"


class Interactivity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class GenerationComplexity(str, Enum):
    SIMPLE = "simple"
    MODERATE = "moderate"
    COMPLEX = "complex"


class DecisionType(str, Enum):
    STORY_SELECTION = "story_selection"
    ARCHETYPE_SELECTION = "archetype_selection"
    APPROVAL = "approval"
    REJECTION = "rejection"
    OVERRIDE = "override"
    MACROTHEME_SELECTION = "macrotheme_selection"


class DecisionSource(str, Enum):
    HUMAN = "human"
    PROFILE_AUTO = "profile_auto"
    PROFILE_OVERRIDE = "profile_override"


class ProductCategory(str, Enum):
    ACHIEVERS_OUTPUT = "achievers_output"
    INSTRUCTOR_PLAYBOOK = "instructor_playbook"


class ProgramType(str, Enum):
    TECNICA = "técnica"
    TECNOLOGIA = "tecnología"


# ─── CORE DATA MODELS (SPEC-002 §3-14) ──────────────────────────

@dataclass
class VocabTerm:
    term: str
    definition: str
    spanish: Optional[str] = None
    example: Optional[str] = None


@dataclass
class Character:
    name: str
    role: str
    description: Optional[str] = None


@dataclass
class NarrativeUniverse:
    company: str
    location: str
    vessel: Optional[str] = None
    characters: list[Character] = field(default_factory=list)
    scenarios: list[str] = field(default_factory=list)


@dataclass
class Instructor:
    name: str
    role: str
    email: Optional[str] = None


@dataclass
class InstitutionalConfig:
    name: str
    format: str
    instructor: Instructor
    center: Optional[str] = None
    custom_fields: dict[str, str] = field(default_factory=dict)


@dataclass
class CuratedSource:
    title: str
    url: str
    genre: str
    filters_passed: list[str] = field(default_factory=list)
    instructor_notes: Optional[str] = None


@dataclass
class Story:
    id: str
    title: str
    genre: str
    source_url: str
    summary: str
    curation_score: Optional[float] = None
    selected: bool = False


@dataclass
class UnitSpec:
    number: int
    name: str
    grammar_targets: list[str]
    theme: str
    vocabulary: list[VocabTerm] = field(default_factory=list)
    stories: list[Story] = field(default_factory=list)
    curated_sources: list[CuratedSource] = field(default_factory=list)


@dataclass
class ProgramConfig:
    id: str
    name: str
    institution: InstitutionalConfig
    domain: str
    cefr_level: CEFRLevel
    units: list[UnitSpec]
    code: Optional[str] = None
    competencia: Optional[str] = None
    resultado_aprendizaje: Optional[str] = None
    universe: Optional[NarrativeUniverse] = None
    program_type: Optional[ProgramType] = None
    macrotheme: Optional[str] = None
    sessions_per_unit: int = 8
    hours_per_session: int = 3
    skip_pm_1_1: bool = False
    archetype_profile: ArchetypeProfile = ArchetypeProfile.MANUAL
    # Conversational flow fields
    ficha: Optional[str] = None
    themes_input: Optional[str] = None


@dataclass
class Archetype:
    id: str
    name: str
    pm_id: str
    description: str
    interactivity: Interactivity = Interactivity.MEDIUM
    generation_complexity: GenerationComplexity = GenerationComplexity.MODERATE
    student_facing_name: Optional[str] = None


@dataclass
class ArchetypeSelection:
    pm_id: str
    unit_number: int
    archetype_id: str
    source: DecisionSource
    profile_used: Optional[ArchetypeProfile] = None


@dataclass
class VersionInfo:
    semantic: str
    hash: str
    updated_at: Optional[datetime] = None


@dataclass
class InputContract:
    required: dict[str, str] = field(default_factory=dict)
    optional: dict[str, str] = field(default_factory=dict)


@dataclass
class OutputContract:
    worksheet_format: str = "markdown"
    worksheet_sections: list[str] = field(default_factory=list)
    gfpi_tag: Optional[str] = None
    gfpi_content_type: Optional[str] = None


@dataclass
class PMDefinition:
    id: str
    name: str
    phase: int
    prompt_template: str
    inputs: InputContract
    outputs: OutputContract
    dependencies: list[str] = field(default_factory=list)
    conjunto: Optional[Conjunto] = None
    archetypes: Optional[list[Archetype]] = None
    checkpoint: Optional[GateId] = None
    is_transversal: bool = False
    is_per_unit: bool = True
    version: Optional[VersionInfo] = None
    max_output_tokens: int = 6000
    # FLOW-v2 new fields
    optional: bool = False
    auto_generate: bool = False
    product_category: Optional[ProductCategory] = None
    auto_archetype_rule: Optional[str] = None
    insert_locations: list[str] = field(default_factory=lambda: ["learning_guide"])


@dataclass
class PMOutput:
    pm_id: str
    unit_number: int
    worksheet: str
    gfpi_section: str
    version: VersionInfo
    generated_at: datetime
    archetype_used: Optional[str] = None
    tokens_consumed: int = 0
    llm_model: Optional[str] = None
    file_path: Optional[str] = None


@dataclass
class HumanDecision:
    gate: GateId
    decision_type: DecisionType
    value: str | list[str] | dict
    timestamp: datetime
    options_presented: list[str] = field(default_factory=list)
    pm_id: Optional[str] = None
    unit_number: Optional[int] = None
    source: DecisionSource = DecisionSource.HUMAN


@dataclass
class ValidationCheck:
    check_id: str
    name: str
    severity: Severity
    passed: bool
    details: Optional[str] = None
    affected_pms: list[str] = field(default_factory=list)
    affected_units: list[int] = field(default_factory=list)


@dataclass
class ValidationReport:
    run_id: str
    checked_at: datetime
    status: str  # "clean" | "warnings" | "critical_errors"
    checks: list[ValidationCheck]
    total: int = 0
    passed: int = 0
    warnings: int = 0
    critical: int = 0


@dataclass
class MeteringRecord:
    run_id: str
    user_id: str
    program_id: str
    tier: str = "single-guide"
    guides_completed: int = 0
    total_tokens: int = 0
    total_api_calls: int = 0
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    cost_estimate_usd: float = 0.0


@dataclass
class ErrorEntry:
    timestamp: datetime
    severity: Severity
    message: str
    pm_id: Optional[str] = None
    unit_number: Optional[int] = None
    stack_trace: Optional[str] = None
    recoverable: bool = True


@dataclass
class UnitState:
    unit_number: int
    status: str = "pending"  # pending | in_progress | phase2_complete | phase4_complete | validated | exported
    phase: int = 1
    completed_pms: dict[str, PMOutput] = field(default_factory=dict)


@dataclass
class RunState:
    run_id: str
    program_id: str
    status: RunStatus
    created_at: datetime
    program: Optional[ProgramConfig] = None
    updated_at: Optional[datetime] = None
    current_moment: int = 1  # FLOW-v2: 1-6
    current_unit: Optional[int] = None
    current_pm: Optional[str] = None
    unit_states: dict[str, UnitState] = field(default_factory=dict)
    completed_pms: dict[str, PMOutput] = field(default_factory=dict)  # global PMs
    decisions: list[HumanDecision] = field(default_factory=list)
    # FLOW-v2: optional product tracking
    confirmed_products: list[str] = field(default_factory=list)
    asked_products: list[str] = field(default_factory=list)
    rejected_products: list[str] = field(default_factory=list)
    validation: Optional[ValidationReport] = None
    metering: Optional[MeteringRecord] = None
    error_log: list[ErrorEntry] = field(default_factory=list)

    @staticmethod
    def create(program_id: str) -> RunState:
        now = datetime.utcnow()
        return RunState(
            run_id=str(uuid4()),
            program_id=program_id,
            status=RunStatus.INITIALIZING,
            created_at=now,
            updated_at=now,
            current_moment=1,
            metering=MeteringRecord(
                run_id="",
                user_id="default",
                program_id=program_id,
                started_at=now,
            ),
        )


# ─── ADAPTER TYPES (SPEC-003 §11) ──────────────────────────────

@dataclass
class TokenUsage:
    input_tokens: int
    output_tokens: int
    total_tokens: int


@dataclass
class LLMResponse:
    content: str
    usage: TokenUsage
    model: str
    stop_reason: str


@dataclass
class NextAction:
    type: str  # "run_pm" | "checkpoint" | "confirm_optional" | "validate" | "export" | "done"
    pm_id: Optional[str] = None
    unit: Optional[int] = None
    gate: Optional[GateId] = None
    confirmation_id: Optional[str] = None  # FLOW-v2: "C-1" through "C-5"
