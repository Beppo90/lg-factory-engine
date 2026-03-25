"""
LG Factory — GFPI Assembler
Extracts GFPI section markers from PM outputs and assembles the final document.
"""

import re
from pathlib import Path
from typing import Optional

# GFPI section markers
MARKER_START = "<!-- GFPI SECTION: "
MARKER_END = "<!-- END GFPI SECTION -->"

# Expected section order for complete GFPI
EXPECTED_SECTIONS = [
    "1-IDENTIFICACION",
    "2-PRESENTACION",
    "3.1-REFLEXION",
    "3.2-CONTEXTUALIZACION",
    "3.3-APROPIACION-READING",
    "3.3-APROPIACION-WRITING",
    "3.3-APROPIACION-VOCABULARY",
    "3.3-APROPIACION-LISTENING",
    "3.3-APROPIACION-PRONUNCIATION",
    "3.3-APROPIACION-GRAMMAR",
    "3.4-TRANSFERENCIA-SPEAKING",
    "3.4-TRANSFERENCIA-MISSION",
    "4-EVIDENCIAS",
    "5-GLOSARIO",
    "6-REFERENTES",
]

# GFPI section source mapping
SECTION_SOURCES = {
    "1-IDENTIFICACION": "PM-1.2",
    "2-PRESENTACION": "PM-1.2",
    "3.1-REFLEXION": "PM-2.1",
    "3.2-CONTEXTUALIZACION": "PM-2.2",
    "3.3-APROPIACION-READING": "PM-2.3",
    "3.3-APROPIACION-WRITING": "PM-2.4",
    "3.3-APROPIACION-VOCABULARY": "PM-2.5",
    "3.3-APROPIACION-LISTENING": "PM-2.6",
    "3.3-APROPIACION-PRONUNCIATION": "PM-2.7",
    "3.3-APROPIACION-GRAMMAR": "PM-2.10",
    "3.4-TRANSFERENCIA-SPEAKING": "PM-2.8",
    "3.4-TRANSFERENCIA-MISSION": "PM-3.5",
    "4-EVIDENCIAS": "PM-4.1/PM-4.2",
    "5-GLOSARIO": "PM-1.2",
    "6-REFERENTES": "PM-1.2",
}


def extract_gfpi_sections(content: str) -> dict:
    """Extract all GFPI sections from a markdown string."""
    sections = {}
    pattern = re.compile(
        re.escape(MARKER_START) + r"(.+?)" + re.escape(MARKER_END),
        re.DOTALL
    )
    for match in pattern.finditer(content):
        section_id = match.group(1).strip()
        section_content = match.group(0)  # full match including markers
        # Extract content between markers
        inner_content = content[match.start() + len(MARKER_START) + len(section_id):match.end() - len(MARKER_END)].strip()
        sections[section_id] = inner_content
    return sections


def extract_all_from_artifacts(artifacts: dict) -> dict:
    """Extract GFPI sections from all PM artifacts."""
    all_sections = {}
    source_map = {}

    for pm_code, pm_data in artifacts.items():
        output = pm_data.get("output", "")
        if not output:
            continue

        sections = extract_gfpi_sections(output)
        for section_id, content in sections.items():
            if section_id in all_sections:
                print(f"  WARNING: Duplicate GFPI section {section_id} (from {pm_code})")
            all_sections[section_id] = content
            source_map[section_id] = pm_code

    return all_sections, source_map


def assemble_gfpi(sections: dict, program_name: str, unit_name: str,
                   unit_number: str) -> str:
    """Assemble the complete GFPI-F-135 document from extracted sections."""

    lines = []
    lines.append(f"# GFPI-F-135 V02 — {program_name}")
    lines.append(f"## Unidad {unit_number}: {unit_name}")
    lines.append(f"## FPI SENA — Bilingüismo")
    lines.append("")
    lines.append("---")
    lines.append("")

    for section_id in EXPECTED_SECTIONS:
        content = sections.get(section_id, None)
        if content:
            lines.append(f"### Sección: {section_id}")
            lines.append(f"*Source: {SECTION_SOURCES.get(section_id, 'Unknown')}*")
            lines.append("")
            lines.append(content)
            lines.append("")
            lines.append("---")
            lines.append("")
        else:
            lines.append(f"### Sección: {section_id}")
            lines.append(f"*Source: {SECTION_SOURCES.get(section_id, 'Unknown')}*")
            lines.append("")
            lines.append(f"> ⚠️ **MISSING** — This section was not generated.")
            lines.append(f"> Expected from: {SECTION_SOURCES.get(section_id, 'Unknown')}")
            lines.append("")
            lines.append("---")
            lines.append("")

    lines.append("")
    lines.append(f"*GFPI-F-135 V02 — {program_name}*")
    lines.append(f"*Unidad {unit_number}: {unit_name}*")
    lines.append(f"*Assembled by LG Factory Orchestrator*")

    return "\n".join(lines)


def validate_gfpi(sections: dict) -> dict:
    """Validate GFPI completeness. Returns {status, missing, warnings}."""
    missing = []
    warnings = []

    for section_id in EXPECTED_SECTIONS:
        if section_id not in sections:
            missing.append(f"{section_id} (expected from {SECTION_SOURCES[section_id]})")

    # Check for unexpected sections
    known = set(EXPECTED_SECTIONS)
    for section_id in sections:
        if section_id not in known:
            warnings.append(f"Unexpected section: {section_id}")

    status = "COMPLETE" if not missing else "INCOMPLETE"

    return {
        "status": status,
        "total_expected": len(EXPECTED_SECTIONS),
        "total_found": len(sections),
        "missing": missing,
        "warnings": warnings,
        "coverage": f"{len(sections)}/{len(EXPECTED_SECTIONS)} ({100*len(sections)/len(EXPECTED_SECTIONS):.0f}%)"
    }


def save_gfpi(content: str, output_dir: Path, program: str, unit: str):
    """Save the assembled GFPI document."""
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / f"{program} — Unidad {unit} — GFPI-F-135.md"
    path.write_text(content, encoding='utf-8')
    print(f"  GFPI saved: {path}")
    return path
