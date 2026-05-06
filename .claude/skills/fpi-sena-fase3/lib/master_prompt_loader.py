"""
master_prompt_loader.py — Utilidad compartida para cargar master prompts canónicos
con verificación de versión en frontmatter.

Implementa REGLA 19 PASO operacional: antes de generar, leer el master prompt
correspondiente Y verificar que la versión coincide con la canónica vigente.

Versiones canónicas vigentes (al 2026-05-05 · post Mejoras #3+#4 PM-0 + cluster cascade):
  Phase 0:  PM-0.0 == 2.3   · PM-0 == 3.4.1
  Phase 1:  PM-1.1 == 2.9   · PM-1.2 == 4.3.1
  Phase 2:  PM-2.0 == 3.0   · PM-2.1/2 == 3.1   · PM-2.3-10 == 3.0   · PM-2.11 == 3.3
  Phase 3:  PM-3.1 == 2.6   · PM-3.2 == 3.0     · PM-3.3 == 3.0      · PM-3.4 == 4.1
            PM-3.5 == 3.0   · PM-3.6 == 3.7     · PM-3.7 == DEPRECATED (2026-05-02)
  Phase 4:  PM-4.1 == 2.6.5 · PM-4.2 == 3.0

Bumps recientes:
  2026-05-05 tarde: f) skill loader expansion (CC reco) · sync fase3 con fase2 + agregados Phase 0/1
  2026-05-05 tarde: PM-0 v3.4 → v3.4.1 (Mejora #3 REGLA 14 + Iteración 1 audit)
  2026-05-05 mañana: PM-0 v3.3.1 → v3.4 schema formal (Mejora #4)
  2026-05-04: cluster cascade PM-0 v3.3.1 + PM-1.1 v2.9 + PM-1.2 v4.3.1 + PM-0.0 v2.3 paradigm
  2026-05-02: PM-3.7 DEPRECATED (reemplazado por V04 = PM-2.11 v3.1+)
"""

import re
import os
from pathlib import Path

# Registro canónico de versiones vigentes — actualizar cuando suba un master prompt.
# Bump 2026-05-05 tarde · sync masivo fase3 ↔ fase2 + agregados PMs Phase 0/1.
# Drift detectado vs versión 2026-04-29: 12+ PMs con versiones obsoletas.
# Verificado contra frontmatter real · 3 formatos frontmatter soportados (parser multi-format).
VERSIONES_VIGENTES = {
    # Phase 0 (pre-Phase 1) · paradigm shift PM-0.0 + cluster cascade PM-0
    "PM-0.0": "2.3",
    "PM-0": "3.4.1",
    # Phase 1 · cluster cascade
    "PM-1.1": "2.9",
    "PM-1.2": "4.3.1",
    # Phase 2 · canon vigente post-IMARPOR-V2 cascade
    "PM-2.0": "3.0",
    "PM-2.1": "3.1",
    "PM-2.2": "3.1",
    "PM-2.3": "3.0",
    "PM-2.4": "3.0",
    "PM-2.5": "3.0",
    "PM-2.6": "3.0",
    "PM-2.8": "3.0",
    "PM-2.9": "3.0",
    "PM-2.10": "3.0",
    "PM-2.11": "3.3",
    # Phase 3 · canon vigente
    "PM-3.1": "2.6",      # Playbook Outline — Session Map
    "PM-3.2": "3.0",      # Playbook Build-Out (paradigm shift 2 capas)
    "PM-3.3": "3.0",      # Visual Aid Generator student-facing tool-agnostic
    "PM-3.4": "4.1",      # Workbook — Autonomous Work
    "PM-3.5": "3.0",      # Final Mission — Integrative Task
    "PM-3.6": "3.7",      # GFPI-F-135 Integrator (heredancia LITERAL desde PM-3.2 v3.0)
    "PM-3.7": "DEPRECATED",  # GFPI-F-134 Matrix Aggregator · DEPRECATED 2026-05-02 (reemplazado por V04 PM-2.11)
    # Phase 4
    "PM-4.1": "2.6.5",
    "PM-4.2": "3.0"
}

# Mapping pm_id → filename (los nombres de archivo no son uniformes)
MASTER_PROMPT_PATHS = {
    # Phase 0
    "PM-0.0": "PM-0.0 — Matriz Pedagógica Alineadora.md",
    "PM-0": "PM-0 — CEFR Framework & Pedagogical Foundation.md",
    # Phase 1
    "PM-1.1": "PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md",
    "PM-1.2": "PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md",
    # Phase 2
    "PM-2.0": "PM-2.0 — RAP Session Architect.md",
    "PM-2.1": "PM-2.1 — The Spark — Reflexión Inicial.md",
    "PM-2.2": "PM-2.2 — Gap Analysis — Contextualización.md",
    "PM-2.3": "PM-2.3 — Reading — The Master Anchor.md",
    "PM-2.4": "PM-2.4 — Writing — Task-Based.md",
    "PM-2.5": "PM-2.5 — Literacy & Vocabulary Skills.md",
    "PM-2.6": "PM-2.6 — Listening — The Auditory Anchor.md",
    "PM-2.8": "PM-2.8 — Speaking — The Mission.md",
    "PM-2.9": "PM-2.9 — Language Functions — Communicative Competence.md",
    "PM-2.10": "PM-2.10 — Grammar — Structure Use.md",
    "PM-2.11": "PM-2.11 — GFPI-F-134 Row Assembler.md",
    # Phase 3
    "PM-3.1": "PM-3.1 — Playbook Outline — Session Map.md",
    "PM-3.2": "PM-3.2 — Playbook Build-Out — Step by Step.md",
    "PM-3.3": "PM-3.3 — Canva Deck — Visual Support.md",
    "PM-3.4": "PM-3.4 — Workbook — Autonomous Work.md",
    "PM-3.5": "PM-3.5 — Final Mission — Integrative Task.md",
    "PM-3.6": "PM-3.6 — GFPI-F-135 Integrator.md",
    "PM-3.7": "PM-3.7 — GFPI-F-134 Matrix Aggregator.md",
    # Phase 4
    "PM-4.1": "PM-4.1 — Instrumentos de Evaluación Formativa.md",
    "PM-4.2": "PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md"
}


def _extract_version(text):
    """
    Extrae la versión del frontmatter del master prompt.

    Soporta 3 formatos canon (verificado 2026-05-05):
      1. YAML frontmatter:   `version: 2.9`
                              (PM-1.1, PM-1.2, PM-2.x, PM-3.5, PM-4.x)
      2. Markdown bold:      `**Versión:** 3.4.1 — descripción larga...`
                              (PM-0)
      3. Markdown table row: `| **Versión** | 2.3 |`
                              (PM-0.0, PM-3.1, PM-3.2, PM-3.3, PM-3.4, PM-3.6)

    Retorna primer match · captura solo el semver (MAJOR.MINOR[.PATCH]),
    descarta descripciones extra que sigan al número.

    Returns:
        str con versión limpia · "UNKNOWN" si ningún formato matcheó · "DEPRECATED" si el archivo está marcado deprecated
    """
    # Detect deprecation primero (PM-3.7)
    if re.search(r"DEPRECATED", text[:500], re.IGNORECASE):
        return "DEPRECATED"

    # Formato 1: YAML frontmatter `version: X.Y[.Z]`
    m = re.search(r"^version:\s*([0-9]+\.[0-9]+(?:\.[0-9]+)?)\s*$", text, re.MULTILINE)
    if m:
        return m.group(1).strip()

    # Formato 2: Markdown bold `**Versión:** X.Y[.Z]` · captura solo el semver inicial
    m = re.search(r"\*\*Versión:\*\*\s*([0-9]+\.[0-9]+(?:\.[0-9]+)?)", text)
    if m:
        return m.group(1).strip()

    # Formato 3: Markdown table row `| **Versión** | X.Y[.Z] |`
    m = re.search(r"\|\s*\*\*Versión\*\*\s*\|\s*([0-9]+\.[0-9]+(?:\.[0-9]+)?)\s*\|", text)
    if m:
        return m.group(1).strip()

    return "UNKNOWN"


def load_master_prompt(pm_id, master_prompts_dir, strict_version=True):
    """
    Carga el master prompt completo del PM indicado.

    Args:
        pm_id: identificador del PM (ej. "PM-0", "PM-1.1", "PM-2.0", "PM-3.6")
        master_prompts_dir: path al directorio master-prompts/ del repo
        strict_version: si True, lanza ValueError si la versión del frontmatter
                        no coincide con VERSIONES_VIGENTES[pm_id]

    Returns:
        dict con keys: text (str completo), version (str del frontmatter),
                       version_canonica (str esperada), version_match (bool),
                       path (Path)

    Raises:
        FileNotFoundError si el archivo no existe
        ValueError si strict_version y la versión no coincide
    """
    if pm_id not in MASTER_PROMPT_PATHS:
        raise KeyError(f"PM_id desconocido: {pm_id}. Conocidos: {list(MASTER_PROMPT_PATHS.keys())}")

    filename = MASTER_PROMPT_PATHS[pm_id]
    path = Path(master_prompts_dir) / filename

    if not path.exists():
        raise FileNotFoundError(f"Master prompt no encontrado: {path}")

    text = path.read_text(encoding="utf-8")

    # Extraer version usando parser multi-formato
    version_actual = _extract_version(text)

    version_esperada = VERSIONES_VIGENTES.get(pm_id, "vigente")
    coincide = (version_actual == version_esperada) if version_esperada != "vigente" else True

    if strict_version and not coincide:
        raise ValueError(
            f"Master prompt {pm_id} versión inconsistente: "
            f"frontmatter dice '{version_actual}', canónica vigente es '{version_esperada}'. "
            f"Alguien tocó el canon · validar antes de generar. "
            f"Path: {path}"
        )

    return {
        "pm_id": pm_id,
        "text": text,
        "version": version_actual,
        "version_canonica": version_esperada,
        "version_match": coincide,
        "path": str(path),
        "size_bytes": len(text)
    }


def get_master_prompt_summary(pm_id, master_prompts_dir):
    """Atajo: retorna solo metadata del master prompt sin cargar el texto completo."""
    info = load_master_prompt(pm_id, master_prompts_dir, strict_version=False)
    return {
        "pm_id": info["pm_id"],
        "version": info["version"],
        "version_canonica": info["version_canonica"],
        "version_match": info["version_match"],
        "size_bytes": info["size_bytes"]
    }


if __name__ == "__main__":
    # Self-test
    import sys
    base = sys.argv[1] if len(sys.argv) > 1 else "/Users/Beppo/Projects/fpi-sena-factory/master-prompts"
    print(f"=== Verificando versiones canónicas vigentes en {base} ===")
    for pm_id in MASTER_PROMPT_PATHS.keys():
        try:
            info = get_master_prompt_summary(pm_id, base)
            sym = "✓" if info["version_match"] else "✗"
            print(f"  {sym} {pm_id} v{info['version']} (esperada: v{info['version_canonica']}) · {info['size_bytes']:,} bytes")
        except FileNotFoundError as e:
            print(f"  ✗ {pm_id} NOT FOUND")
        except Exception as e:
            print(f"  ✗ {pm_id} ERROR: {e}")
