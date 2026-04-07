"""
LG Factory Engine — PM Runner
SPEC-003 §4: Executes a single PM Unit.

The PM Runner is the ONLY component that talks to the LLM.
It is stateless: given the same inputs, produces the same output structure.
"""

import re
import hashlib
from pathlib import Path
from datetime import datetime

from engine.models import (
    PMDefinition, PMOutput, VersionInfo, TokenUsage,
    LLMResponse, Archetype,
)
from engine.adapters.base import LLMAdapter


PROMPTS_DIR = Path(__file__).parent.parent / "prompts"

# Master prompts live in the parent project
MASTER_PROMPTS_DIR = Path(__file__).parent.parent.parent / "master-prompts"


def load_prompt_template(pm_id: str) -> str:
    """Load prompt template. Falls back to master-prompts if local not found."""
    # Try local first
    local = PROMPTS_DIR / f"{pm_id.lower().replace('.', '-')}.md"
    if local.exists():
        return local.read_text(encoding='utf-8')

    # Fall back to master-prompts directory
    if MASTER_PROMPTS_DIR.exists():
        for f in MASTER_PROMPTS_DIR.glob(f"PM-{pm_id.split('-')[1]}*.md"):
            if pm_id in f.name:
                return f.read_text(encoding='utf-8')

    return ""


def compute_hash(content: str) -> str:
    """SHA-256 hash of prompt template content."""
    return hashlib.sha256(content.encode('utf-8')).hexdigest()


def build_system_prompt(pm_def: PMDefinition) -> str:
    """Build the system prompt for a PM execution."""
    return f"""You are an expert curriculum designer for SENA bilingual programs (FPI SENA).
You are executing PM {pm_def.id}: {pm_def.name}.

RULES:
- Output ONLY the requested worksheet/document
- Include GFPI markers exactly as specified: <!-- GFPI SECTION: X-XXXX --> ... <!-- END GFPI SECTION -->
- Use bilingual instructions (English with Spanish support in parentheses)
- Include a Teacher Answer Key at the end
- Zero meta-talk: no pedagogical explanations, no Bloom references, no SIOP mentions
- Respect the CEFR level strictly
- Use the key vocabulary from the unit in all activities
- Stay within the grammar constraints — do NOT introduce structures from other units
"""


def build_user_prompt(pm_def: PMDefinition, inputs: dict, archetype_desc: str = "") -> str:
    """Build the user prompt by combining template with inputs."""
    template = load_prompt_template(pm_def.id)

    if template:
        # Use template, inject inputs as context
        prompt = f"""CONTEXT FOR PM {pm_def.id}:

PROGRAM: {inputs.get('program_name', 'N/A')}
UNIT: {inputs.get('unit_number', 'N/A')} — {inputs.get('unit_name', 'N/A')}
CEFR: {inputs.get('cefr', 'A1.1-A1.2')}
GRAMMAR TARGETS: {inputs.get('grammar_targets', 'N/A')}
GRAMMAR CONSTRAINT: {inputs.get('grammar_constraint', 'N/A')}
KEY VOCABULARY (20 terms): {inputs.get('key_vocabulary', 'N/A')}
FUNCTIONS: {inputs.get('functions', 'N/A')}
UNIVERSE: {inputs.get('universe', 'N/A')}
ARCHETYPE: {archetype_desc or 'N/A'}

AUTHENTIC SOURCE: {inputs.get('authentic_source', 'N/A')}
PREVIOUS PM CONTEXT: {inputs.get('previous_context', 'N/A')}

MASTER PROMPT REFERENCE:
{template[:4000]}

---
Generate the complete worksheet now. Remember to include GFPI markers.
"""
    else:
        # Fallback: build prompt from scratch using inputs
        prompt = f"""Generate a worksheet for PM {pm_def.id}: {pm_def.name}.

PROGRAM: {inputs.get('program_name', 'N/A')}
UNIT: {inputs.get('unit_number', 'N/A')} — {inputs.get('unit_name', 'N/A')}
CEFR: {inputs.get('cefr', 'A1.1-A1.2')}
GRAMMAR TARGETS: {inputs.get('grammar_targets', 'N/A')}
KEY VOCABULARY: {inputs.get('key_vocabulary', 'N/A')}
ARCHETYPE: {archetype_desc or 'N/A'}
UNIVERSE: {inputs.get('universe', 'N/A')}

Generate the worksheet in Markdown format.
Include GFPI markers: <!-- GFPI SECTION: ... --> ... <!-- END GFPI SECTION -->
Include Teacher Answer Key at the end.
"""

    return prompt


def extract_worksheet(content: str) -> str:
    """Extract the main worksheet content from LLM response."""
    # If content has GFPI markers, everything before the first marker is the worksheet
    marker = "<!-- GFPI SECTION:"
    if marker in content:
        before = content[:content.index(marker)].strip()
        if before:
            return before
        # LLM put everything inside GFPI markers — extract inner content
        # Strip the GFPI wrapper tags from the full content
        pattern = re.compile(
            r'<!-- GFPI SECTION: .*? -->\s*\n?(.*?)\n?\s*<!-- END GFPI SECTION -->',
            re.DOTALL,
        )
        parts = pattern.findall(content)
        if parts:
            return "\n\n".join(p.strip() for p in parts if p.strip())
    return content.strip()


def extract_gfpi_sections(content: str) -> str:
    """Extract all GFPI section content from LLM response."""
    sections = []
    pattern = re.compile(
        r'<!-- GFPI SECTION: (.+?) -->.*?<!-- END GFPI SECTION -->',
        re.DOTALL
    )
    for match in pattern.finditer(content):
        sections.append(match.group(0))
    return "\n\n".join(sections)


def run_pm(
    pm_def: PMDefinition,
    inputs: dict,
    adapter: LLMAdapter,
    archetype: Archetype = None,
    archetype_desc: str = "",
    dry_run: bool = False,
    semantic_version: str = "1.0",
) -> PMOutput:
    """Execute a single PM and return structured output."""

    archetype_used = archetype.id if archetype else None
    if archetype and not archetype_desc:
        archetype_desc = f"{archetype.id}) {archetype.name} — {archetype.description}"

    # Build prompts
    system_prompt = build_system_prompt(pm_def)
    user_prompt = build_user_prompt(pm_def, inputs, archetype_desc)

    # Compute hash
    prompt_hash = compute_hash(user_prompt)

    # Get GFPI tag from outputs contract if available
    gfpi_tag = "DRAFT"
    if pm_def.outputs and hasattr(pm_def.outputs, 'gfpi_tag') and pm_def.outputs.gfpi_tag:
        gfpi_tag = pm_def.outputs.gfpi_tag

    if dry_run:
        print(f"  [DRY RUN] {pm_def.id} — {len(user_prompt)} chars in prompt")
        return PMOutput(
            pm_id=pm_def.id,
            unit_number=inputs.get("unit_number", 0),
            worksheet=f"[DRY RUN — {pm_def.id} worksheet]",
            gfpi_section=f"<!-- GFPI SECTION: {gfpi_tag} -->\n[DRY RUN]\n<!-- END GFPI SECTION -->",
            version=VersionInfo(semantic=semantic_version, hash=prompt_hash),
            generated_at=datetime.utcnow(),
            archetype_used=archetype_used,
            tokens_consumed=0,
            llm_model="dry-run",
        )

    # Call LLM with retry
    response = None
    last_error = None
    import time
    for attempt in range(4):
        try:
            response = adapter.generate(
                system=system_prompt,
                user=user_prompt,
                max_tokens=pm_def.max_output_tokens,
            )
            break
        except Exception as e:
            last_error = e
            print(f"  [RETRY {attempt+1}/4] {pm_def.id}: {e}")
            if attempt == 3:
                raise RuntimeError(f"PM {pm_def.id} failed after 4 attempts: {last_error}")
            
            # API backoff: 5s, 15s, 45s
            sleep_time = 5 * (3 ** attempt)
            print(f"  Waiting {sleep_time}s before retrying...")
            time.sleep(sleep_time)

    # Parse output
    full_content = response.content
    worksheet = extract_worksheet(full_content)
    gfpi_section = extract_gfpi_sections(full_content)

    # Validate markers exist
    if not gfpi_section:
        print(f"  [WARNING] {pm_def.id}: No GFPI markers found in output")

    return PMOutput(
        pm_id=pm_def.id,
        unit_number=inputs.get("unit_number", 0),
        worksheet=worksheet,
        gfpi_section=gfpi_section,
        version=VersionInfo(
            semantic=semantic_version,
            hash=prompt_hash,
            updated_at=datetime.utcnow(),
        ),
        generated_at=datetime.utcnow(),
        archetype_used=archetype_used,
        tokens_consumed=response.usage.total_tokens,
        llm_model=response.model,
    )
