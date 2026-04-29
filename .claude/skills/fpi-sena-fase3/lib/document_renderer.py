"""
document_renderer.py — Wrapper híbrido subprocess node + skill docx/pptx (H.3 canonizado PLAN v1.1 §11.1 #10).

⚠ ESQUELETO INICIAL · Hito 1 Task 5 · 2026-04-29
La API específica de las 6 funciones renderer (render_pm_3_1_docx, etc.) NO se diseña
upfront. Per I.2 canonizado (PLAN v1.1 §11.1 #11): diseño emergente · cada función nace
con justificación operacional cuando el subagente correspondiente la necesita en
Hito 2-3-4. **Hito 5 refactor pass (1-2h post-Hito 4) uniforma signatures.**

Lo único que va aquí en Hito 1 son helpers GENÉRICOS sin asumir API específica:
- node_available() · check si node está instalado para subprocess
- run_node_script() · invocador genérico (usado por render_pm_3_X_* futuras)
- validate_rendered_docx() · validation post-render genérica
- validate_rendered_pptx() · idem para pptx

NO definir aquí: render_pm_3_1_docx · render_pm_3_2_docx · etc.
Esas emergen en subagentes correspondientes.
"""

import shutil
import subprocess
from pathlib import Path
from typing import Optional


# === Helpers GENÉRICOS · seguros para Hito 1 (no inflan diseño emergente I.2) ===

def node_available() -> bool:
    """Check if node runtime está disponible para subprocess.
    
    Usado por funciones render_pm_3_X_* futuras (emergentes Hito 2-4).
    """
    return shutil.which('node') is not None


def get_node_version() -> Optional[str]:
    """Retorna versión node si disponible, None si no.
    
    Útil para drift script (Task 7) y validation cross-environment.
    """
    if not node_available():
        return None
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True, timeout=5)
        return result.stdout.strip() if result.returncode == 0 else None
    except (subprocess.TimeoutExpired, OSError):
        return None


def run_node_script(script_path: str, *args: str, timeout: int = 60) -> dict:
    """Invoca un script node con args · captura stdout/stderr · check returncode.
    
    Helper genérico para render_pm_3_X_* funciones futuras que reusen scripts node DIESEL.
    
    Returns:
        {success: bool, stdout: str, stderr: str, returncode: int}
    
    Raises:
        FileNotFoundError si script_path no existe
        RuntimeError si node no está disponible
    """
    if not node_available():
        raise RuntimeError("node runtime no disponible · subprocess imposible · ver H.3 canon")
    
    script = Path(script_path)
    if not script.exists():
        raise FileNotFoundError(f"Script node no existe: {script_path}")
    
    result = subprocess.run(
        ['node', str(script), *args],
        capture_output=True,
        text=True,
        timeout=timeout
    )
    return {
        'success': result.returncode == 0,
        'stdout': result.stdout,
        'stderr': result.stderr,
        'returncode': result.returncode
    }


def validate_rendered_docx(docx_path: str) -> dict:
    """Validation genérica post-render DOCX.
    
    Validations mínimas:
    - Archivo existe y tiene tamaño > 0
    - Es archivo .docx válido (extension match)
    - (TODO Hito 2+) abrir con python-docx y validar word_count > 0
    
    Returns:
        {valid: bool, size_bytes: int, errors: list[str]}
    """
    p = Path(docx_path)
    errors = []
    if not p.exists():
        errors.append(f"docx no existe: {docx_path}")
        return {'valid': False, 'size_bytes': 0, 'errors': errors}
    
    size = p.stat().st_size
    if size == 0:
        errors.append("docx tamaño 0 bytes")
    if not docx_path.endswith('.docx'):
        errors.append(f"extension no es .docx: {docx_path}")
    
    return {
        'valid': len(errors) == 0,
        'size_bytes': size,
        'errors': errors
    }


def validate_rendered_pptx(pptx_path: str) -> dict:
    """Validation genérica post-render PPTX.
    
    Mismo patrón que validate_rendered_docx pero para .pptx.
    """
    p = Path(pptx_path)
    errors = []
    if not p.exists():
        errors.append(f"pptx no existe: {pptx_path}")
        return {'valid': False, 'size_bytes': 0, 'errors': errors}
    
    size = p.stat().st_size
    if size == 0:
        errors.append("pptx tamaño 0 bytes")
    if not pptx_path.endswith('.pptx'):
        errors.append(f"extension no es .pptx: {pptx_path}")
    
    return {
        'valid': len(errors) == 0,
        'size_bytes': size,
        'errors': errors
    }


# === API EMERGENTE (NO DEFINIR AQUÍ) ===
#
# Las funciones específicas render_pm_3_1_docx, render_pm_3_2_docx, render_pm_3_3_pptx,
# render_pm_3_4_docx, render_pm_3_5_docx, render_pm_3_6_docx emergen en cada subagente
# correspondiente conforme Hito 2-3-4. NO definir signatures aquí · esto es I.2 strict.
#
# Hito 5 refactor pass (1-2h) uniforma las 6 funciones a signature canónica unified
# después de que la API converja iterando.


if __name__ == "__main__":
    print(f"document_renderer · self-test")
    print(f"  node_available: {node_available()}")
    print(f"  node version: {get_node_version()}")
    print(f"  validate_rendered_docx('/nonexistent.docx'): {validate_rendered_docx('/nonexistent.docx')}")
    print(f"  validate_rendered_pptx('/nonexistent.pptx'): {validate_rendered_pptx('/nonexistent.pptx')}")
