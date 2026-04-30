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


# === API EMERGENTE · Hito 5 ===
#
# Hito 5 (2026-04-30) inicia el refactor pass uniformando signatures.
# Signature canónica:
#
#   render_pm_3_X_docx(run_dir: str | Path, output_name: str | None = None) -> dict
#     run_dir: ruta al run (e.g. runs/IMARPOR-CC-2026-04-27)
#     output_name: nombre del docx output (default canon: pm-3-X-FINAL-<RUN-ID>.docx)
#     return: {success, output_path, size_bytes, errors[], stdout, stderr}
#
# Implementación: subprocess al script node `gen_audit_docx.js` del run.
# Cada run mantiene su propio script (port from MGV/IMARPOR-CC con paths adapt).


def render_pm_3_6_docx(run_dir, output_name=None):
    """Render PM-3.6 GFPI-F-135 Guia del Aprendiz a DOCX.

    Canon v2.7: invoca scripts/gen_audit_docx.js del run, espera pm-3-6.json
    presente, genera output con paleta SENA institucional + apendices embebidos.

    Args:
        run_dir: ruta al directorio del run (e.g. 'runs/IMARPOR-CC-2026-04-27')
        output_name: nombre del docx output. Default: 'pm-3-6-FINAL-<RUN-ID>.docx'

    Returns:
        {success, output_path, size_bytes, errors, stdout, stderr}
    """
    run_path = Path(run_dir)
    if not run_path.exists():
        raise FileNotFoundError(f"run_dir no existe: {run_dir}")

    script_path = run_path / 'scripts' / 'gen_audit_docx.js'
    if not script_path.exists():
        raise FileNotFoundError(
            f"gen_audit_docx.js no existe en {script_path} . "
            f"copia desde runs/MGV-2026-04-20/scripts/ y adapta RUN_DIR"
        )

    result = run_node_script(str(script_path), timeout=120)

    run_id = run_path.name
    default_name = f'pm-3-6-FINAL-{run_id}.docx'
    output_path = run_path / (output_name or default_name)

    if not output_path.exists():
        candidates = list(run_path.glob('pm-3-6-FINAL-*.docx'))
        if candidates:
            output_path = candidates[0]

    validation = validate_rendered_docx(str(output_path)) if output_path.exists() else {
        'valid': False, 'size_bytes': 0, 'errors': ['output docx no encontrado post-render']
    }

    return {
        'success': result['success'] and validation['valid'],
        'output_path': str(output_path),
        'size_bytes': validation['size_bytes'],
        'errors': validation['errors'] + ([result['stderr']] if result['stderr'] else []),
        'stdout': result['stdout'],
        'stderr': result['stderr'],
    }


if __name__ == "__main__":
    import sys
    print("document_renderer . self-test")
    print(f"  node_available: {node_available()}")
    print(f"  node version: {get_node_version()}")
    print(f"  validate_rendered_docx('/nonexistent.docx'): {validate_rendered_docx('/nonexistent.docx')}")
    print(f"  validate_rendered_pptx('/nonexistent.pptx'): {validate_rendered_pptx('/nonexistent.pptx')}")

    if len(sys.argv) > 1:
        run_dir = sys.argv[1]
        print(f"\n  render_pm_3_6_docx({run_dir!r}):")
        try:
            r = render_pm_3_6_docx(run_dir)
            print(f"    success: {r['success']}")
            print(f"    output: {r['output_path']} ({r['size_bytes']} bytes)")
            if r['errors']: print(f"    errors: {r['errors']}")
            if r['stdout']: print(f"    stdout: {r['stdout'].strip()}")
        except Exception as e:
            print(f"    FAIL: {type(e).__name__}: {e}")
