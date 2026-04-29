"""
master_prompt_loader.py — Utilidad compartida para cargar master prompts canónicos
con verificación de versión en frontmatter.

Implementa REGLA 19 PASO operacional: antes de generar, leer el master prompt
correspondiente Y verificar que la versión coincide con la canónica vigente.

Versiones canónicas vigentes (al 2026-04-29):
  PM-2.0 == 2.6
  PM-2.1 == 3.0  (canonizada Opción A)
  PM-2.2 == 3.0  (canonizada Opción A)
  PM-2.3 a PM-2.10 == 2.0
  PM-2.11 == 2.6.3
  PM-4.1 == 2.6.4 (o vigente · verificar)
  PM-4.2 == vigente
"""

import re
import os
from pathlib import Path

# Registro canónico de versiones vigentes — actualizar cuando suba un master prompt
VERSIONES_VIGENTES = {
    "PM-2.0": "2.6",
    "PM-2.1": "3.0",
    "PM-2.2": "3.0",
    "PM-2.3": "2.0",
    "PM-2.4": "2.0",
    "PM-2.5": "2.0",
    "PM-2.6": "2.0",
    "PM-2.8": "2.0",
    "PM-2.9": "2.0",
    "PM-2.10": "2.0",
    "PM-2.11": "2.6.3",
    "PM-4.1": "2.6.5",   # actualizado 2026-04-29 post smoke-test (frontmatter real es v2.6.5)
    "PM-4.2": "vigente"  # verificar contra frontmatter real
}

# Mapping pm_id → glob path (los nombres de archivo no son uniformes)
MASTER_PROMPT_PATHS = {
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
    "PM-4.1": "PM-4.1 — Instrumentos de Evaluación Formativa.md",
    "PM-4.2": "PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md"
}


def load_master_prompt(pm_id, master_prompts_dir, strict_version=True):
    """
    Carga el master prompt completo del PM indicado.
    
    Args:
        pm_id: identificador del PM (ej. "PM-2.0", "PM-2.11")
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
    
    # Extraer version del frontmatter YAML
    version_match = re.search(r"^version:\s*(.+?)$", text, re.MULTILINE)
    version_actual = version_match.group(1).strip().strip('"').strip("'") if version_match else "UNKNOWN"
    
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
