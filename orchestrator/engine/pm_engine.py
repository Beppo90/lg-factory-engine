"""
LG Factory — PM Engine
Calls LLM API with context chaining between PMs.
Supports Claude (Anthropic) and OpenAI.
"""

import json
import os
import time
from pathlib import Path
from typing import Optional

BASE_DIR = Path(__file__).parent.parent
CONFIG_DIR = BASE_DIR / "config"
KNOWLEDGE_DIR = BASE_DIR.parent / "knowledge-bases"

# --- Context Store: passes output of PM N as input to PM N+1 ---

class ContextStore:
    """In-memory context that accumulates through the PM chain."""

    def __init__(self):
        self._store = {}
        self._artifacts = {}

    def set(self, key: str, value):
        self._store[key] = value

    def get(self, key: str, default=None):
        return self._store.get(key, default)

    def has(self, key: str) -> bool:
        return key in self._store

    def set_artifact(self, pm_code: str, artifact_type: str, content: str):
        if pm_code not in self._artifacts:
            self._artifacts[pm_code] = {}
        self._artifacts[pm_code][artifact_type] = content

    def get_artifact(self, pm_code: str, artifact_type: str) -> Optional[str]:
        return self._artifacts.get(pm_code, {}).get(artifact_type)

    def get_all_artifacts(self) -> dict:
        return self._artifacts

    def to_dict(self) -> dict:
        return {"store": self._store, "artifacts": self._artifacts}

    def save(self, path: Path):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False, default=str)

    def load(self, path: Path):
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        self._store = data.get("store", {})
        self._artifacts = data.get("artifacts", {})


# --- PM Prompt Templates ---

PM_TEMPLATES = {
    "PM-1.2": """You are a curriculum designer for SENA bilingual programs (FPI SENA).
Generate the SCOPE & SEQUENCE for this maritime English unit.

PROGRAM: {program_name}
UNIT: {unit_number} — {unit_name}
CEFR: {cefr}
GRAMMAR TARGETS: {grammar_targets}
KEY VOCABULARY (20 terms): {key_vocabulary}
COMMUNICATIVE FUNCTIONS: {functions}
UNIVERSE: {universe_description}
INTEGRATIVE TASK: {integrative_task}

Generate the following sections:
1. GUIDE DESIGN DNA (conceptual name, focus, enduring understandings)
2. CONTENT CORE (technical topics, communicative functions, language functions in context)
3. KEY VOCABULARY TABLE (20 terms with category and pronunciation)
4. THE INTEGRATIVE TASK (name, oral component, product, deliverables)
5. EVALUATION MATRIX (conocimiento/desempeño/producto)

Format output as Markdown. Include GFPI markers:
<!-- GFPI SECTION: 1-IDENTIFICACION --> ... <!-- END GFPI SECTION -->
<!-- GFPI SECTION: 2-PRESENTACION --> ... <!-- END GFPI SECTION -->
<!-- GFPI SECTION: 5-GLOSARIO --> ... <!-- END GFPI SECTION -->
<!-- GFPI SECTION: 6-REFERENTES --> ... <!-- END GFPI SECTION -->
""",

    "PM-2.x": """You are a worksheet generator for SENA bilingual maritime English programs.
Generate a LEARNER'S WORKSHEET for this PM.

PROGRAM: {program_name}
UNIT: {unit_number} — {unit_name}
PM: {pm_code} — {pm_name}
ARCHETYPE(S) SELECTED: {archetype_description}
CEFR: {cefr}
GRAMMAR TARGETS: {grammar_targets}
GRAMMAR CONSTRAINT: Only these structures are allowed: {grammar_constraint}
RESTRICTED (do NOT use): {restricted_structures}
KEY VOCABULARY (20 terms): {key_vocabulary}
COMMUNICATIVE FUNCTIONS: {functions}
UNIVERSE: {universe_description}

CONTEXT FROM PREVIOUS PMs:
{previous_context}

AUTHENTIC SOURCE (if applicable):
{authentic_source}

Generate the complete worksheet with:
- Survival words (4 terms with definition + Spanish)
- All activities from the selected archetype(s)
- Bilingual instructions (English with Spanish support in parentheses)
- Teacher Answer Key at the end
- Zero meta-talk — only operational content

Format as Markdown. Include GFPI marker:
<!-- GFPI SECTION: {gfpi_section_id} -->
... content ...
<!-- END GFPI SECTION -->
""",

    "PM-2.9": """You are a transversal material generator for SENA bilingual programs.
Generate the LANGUAGE FUNCTIONS material for Unit {unit_number}.

PROGRAM: {program_name}
UNIT: {unit_number} — {unit_name}
FUNCTIONS: {functions}
GRAMMAR TARGETS: {grammar_targets}
KEY VOCABULARY: {key_vocabulary}

Generate:
1. Each function with key structures and maritime examples
2. Chunk Bank: ready-made phrases for each function
3. Injection Schedule: which session gets which function
4. Assessment Integration: how functions are tested indirectly

Format as Markdown.
""",

    "PM-3.5": """You are a Final Mission designer for SENA bilingual programs.
Generate the INTEGRATIVE TASK for Unit {unit_number}.

PROGRAM: {program_name}
UNIT: {unit_number} — {unit_name}
ARCHETYPE: {archetype_description}
GRAMMAR TARGETS: {grammar_targets}
KEY VOCABULARY: {key_vocabulary}
INTEGRATIVE TASK: {integrative_task}
UNIVERSE: {universe_description}

Generate three documents:
1. MISSION BRIEF (for learners)
2. OBSERVATION CHECKLIST (10 pts, 5 criteria)
3. PRODUCT RUBRIC (20 pts, 5 criteria × 4 levels)

Format as Markdown. Include GFPI marker:
<!-- GFPI SECTION: 3.4-TRANSFERENCIA-MISSION --> ... <!-- END GFPI SECTION -->
""",
}


def load_master_prompt(pm_code: str) -> str:
    """Load the master prompt file if it exists."""
    pm_dir = BASE_DIR.parent / "master-prompts"
    pattern = f"{pm_code} — *"
    matches = list(pm_dir.glob(pattern))
    if matches:
        return matches[0].read_text(encoding='utf-8')
    return ""


def load_knowledge_base() -> str:
    """Load knowledge bases for context."""
    kb_parts = []
    for kb_file in KNOWLEDGE_DIR.glob("*.md"):
        kb_parts.append(f"--- {kb_file.name} ---\n{kb_file.read_text(encoding='utf-8')[:2000]}")
    return "\n\n".join(kb_parts)


def build_prompt(pm_code: str, context: ContextStore, unit_config: dict,
                 program_config: dict, archetype_desc: str = "") -> str:
    """Build the full prompt for a PM execution."""

    template_key = "PM-1.2" if pm_code == "PM-1.2" else (
        "PM-2.9" if pm_code == "PM-2.9" else (
            "PM-3.5" if pm_code == "PM-3.5" else "PM-2.x"
        )
    )
    template = PM_TEMPLATES[template_key]

    # Gather previous context
    prev_context_parts = []
    for key in ["spark_worksheet", "gap_analysis_worksheet", "reading_worksheet",
                 "writing_worksheet", "vocab_worksheet", "listening_worksheet",
                 "pronunciation_worksheet", "speaking_worksheet", "grammar_worksheet"]:
        if context.has(key):
            prev_context_parts.append(f"--- {key} ---\n{context.get(key)[:500]}...")
    previous_context = "\n\n".join(prev_context_parts) if prev_context_parts else "No previous PM output yet (this is the first PM)."

    # Auth source
    auth_source = ""
    sources = unit_config.get("authentic_sources", {})
    if "story_a" in sources and "reading" in pm_code.lower():
        auth_source = f"Story A: {sources['story_a']['title']} ({sources['story_a']['source']})"
    elif "story_b" in sources and "listening" in pm_code.lower():
        auth_source = f"Story B: {sources['story_b']['title']} ({sources['story_b']['source']})"

    # Grammar constraint
    gc = unit_config.get("grammar_constraint", {})
    grammar_constraint = ", ".join(gc.get("structures", unit_config.get("grammar_targets", [])))
    restricted = ", ".join(gc.get("restricted", []))

    # Universe
    universe = program_config.get("universe", {})
    chars = "\n".join(universe.get("characters", []))
    universe_desc = f"{universe.get('company', 'N/A')}, {universe.get('location', 'N/A')}\nCharacters:\n{chars}"

    # GFPI section ID
    pm_chain_data = json.loads((CONFIG_DIR / "pm_chain.json").read_text())
    gfpi_id = ""
    for step in pm_chain_data["pm_chain"]:
        if step["pm"] == pm_code:
            gfpi_id = step.get("gfpi_sections", [""])[0] if step.get("gfpi_sections") else ""
            break

    prompt = template.format(
        program_name=program_config.get("name", ""),
        unit_number=unit_config.get("_unit_number", "1"),
        unit_name=unit_config.get("name", ""),
        cefr=program_config.get("cefr", "A1.1-A1.2"),
        grammar_targets=", ".join(unit_config.get("grammar_targets", [])),
        grammar_constraint=grammar_constraint,
        restricted_structures=restricted,
        key_vocabulary=", ".join(unit_config.get("key_vocabulary", [])),
        functions=", ".join(unit_config.get("functions", [])),
        universe_description=universe_desc,
        integrative_task=json.dumps(unit_config.get("integrative_task", {})),
        pm_code=pm_code,
        pm_name=pm_code,
        archetype_description=archetype_desc,
        previous_context=previous_context,
        authentic_source=auth_source,
        gfpi_section_id=gfpi_id,
    )

    # Prepend master prompt content if available
    master = load_master_prompt(pm_code)
    if master:
        prompt = f"[MASTER PROMPT REFERENCE — {pm_code}]\n{master[:3000]}\n\n[END MASTER PROMPT]\n\n{prompt}"

    return prompt


def call_llm(prompt: str, provider: str = "anthropic", model: str = None) -> str:
    """Call the LLM API and return the response text."""

    if provider == "anthropic":
        return _call_anthropic(prompt, model or "claude-sonnet-4-20250514")
    elif provider == "openai":
        return _call_openai(prompt, model or "gpt-4o")
    else:
        raise ValueError(f"Unknown provider: {provider}")


def _call_anthropic(prompt: str, model: str) -> str:
    """Call Anthropic Claude API."""
    try:
        import anthropic
    except ImportError:
        raise ImportError("pip install anthropic")

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise EnvironmentError("Set ANTHROPIC_API_KEY environment variable")

    client = anthropic.Anthropic(api_key=api_key)

    response = client.messages.create(
        model=model,
        max_tokens=8000,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text


def _call_openai(prompt: str, model: str) -> str:
    """Call OpenAI API."""
    try:
        import openai
    except ImportError:
        raise ImportError("pip install openai")

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise EnvironmentError("Set OPENAI_API_KEY environment variable")

    client = openai.OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model=model,
        max_tokens=8000,
        messages=[
            {"role": "system", "content": "You are an expert curriculum designer for SENA bilingual programs."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content


def execute_pm(pm_code: str, context: ContextStore, unit_config: dict,
               program_config: dict, archetype_desc: str = "",
               provider: str = "anthropic", dry_run: bool = False) -> str:
    """Execute a single PM and store the result in context."""

    prompt = build_prompt(pm_code, context, unit_config, program_config, archetype_desc)

    if dry_run:
        print(f"\n[DRY RUN] PM: {pm_code}")
        print(f"Prompt length: {len(prompt)} chars")
        print(f"First 200 chars: {prompt[:200]}...")
        return f"[DRY RUN OUTPUT for {pm_code}]"

    print(f"\n[EXECUTING] PM: {pm_code} via {provider}...")
    start = time.time()
    output = call_llm(prompt, provider=provider)
    elapsed = time.time() - start
    print(f"[DONE] {pm_code} — {len(output)} chars in {elapsed:.1f}s")

    # Store in context
    artifact_key = {
        "PM-1.2": "scope_sequence",
        "PM-2.1": "spark_worksheet",
        "PM-2.2": "gap_analysis_worksheet",
        "PM-2.3": "reading_worksheet",
        "PM-2.4": "writing_worksheet",
        "PM-2.5": "vocab_worksheet",
        "PM-2.6": "listening_worksheet",
        "PM-2.7": "pronunciation_worksheet",
        "PM-2.8": "speaking_worksheet",
        "PM-2.9": "functions_material",
        "PM-2.10": "grammar_worksheet",
        "PM-3.1": "playbook_outline",
        "PM-3.2": "build_out",
        "PM-3.3": "canva_spec",
        "PM-3.4": "workbook",
        "PM-3.5": "final_mission",
        "PM-3.6": "gfpi_f_135",
        "PM-4.1": "evaluation",
        "PM-4.2": "questionnaire",
    }.get(pm_code, pm_code.lower().replace("-", "_"))

    context.set(artifact_key, output)
    context.set_artifact(pm_code, "output", output)
    context.set_artifact(pm_code, "prompt", prompt)

    return output
