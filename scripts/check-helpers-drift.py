#!/usr/bin/env python3
"""
check-helpers-drift.py — Gap D.1.5 mitigation · diff helpers shared entre fase2/lib y fase3/lib.

Per PLAN-FASE-3-ARQUITECTURA.md v1.1 §11.1 #9 (D.1.5 canonizado):
"duplicar 5 helpers fase3/lib + cli_parser.py nuevo + drift script · NO lib-shared/ raíz
(respeta task #30 packaging .skill self-contained)."

Los 5 helpers se dividen en 3 categorías:

| Helper                      | ¿Genuinamente shared? | Drift detection      |
|-----------------------------|----------------------|----------------------|
| master_prompt_loader.py     | ✓ Sí (cross-phase)   | Diff strict (este)   |
| check_9_anti_copia.py       | ✓ Sí (cross-phase)   | Diff strict (este)   |
| validation_helpers.py       | ✓ Sí (cross-phase)   | Diff strict (este)   |
| input_loader.py             | ✗ No (phase-specific)| NO diff (divergen)   |
| task_tool_bundler.py        | ⚠ Mayormente sí      | Soft diff (warning)  |

Ejecución sugerida:
  python3 scripts/check-helpers-drift.py
  
Exit codes:
  0 · sin drift detectado
  1 · drift detectado en helpers shared (acción requerida: propagar fix · divergir
       intencionalmente · refactorizar a lib-shared/ si la deuda duele de verdad)
  2 · helpers faltantes (skills no inicializadas correctamente)

Recomendado: pre-commit hook o CI weekly.
"""

import subprocess
import sys
import shutil
from pathlib import Path
from typing import Optional


# === Paths canónicos ===

REPO_ROOT = Path(__file__).resolve().parent.parent
FASE2_LIB = REPO_ROOT / ".claude/skills/fpi-sena-fase2/lib"
FASE3_LIB = REPO_ROOT / ".claude/skills/fpi-sena-fase3/lib"

# Helpers genuinamente shared (cross-phase · diff strict)
GENUINELY_SHARED = [
    "master_prompt_loader.py",
    "check_9_anti_copia.py",
    "validation_helpers.py",
]

# Helpers mayormente shared (diff soft · warning si difieren)
MOSTLY_SHARED = [
    "task_tool_bundler.py",
]

# Helpers phase-specific (NO diff · divergen intencionalmente)
PHASE_SPECIFIC = [
    "input_loader.py",  # load_phase2_inputs ≠ load_phase3_inputs · esquemas distintos
]

# Pin Node version (gap H.3 · subprocess node depende de runtime)
NODE_VERSION_EXPECTED = "v22.22.0"  # detectado runtime 2026-04-29 Hito 1 Task 5


def diff_files(file_a: Path, file_b: Path) -> tuple[bool, str]:
    """Compara 2 archivos con diff -u · retorna (identical, diff_output)."""
    if not file_a.exists():
        return False, f"⚠ {file_a} no existe"
    if not file_b.exists():
        return False, f"⚠ {file_b} no existe"
    
    result = subprocess.run(
        ["diff", "-u", str(file_a), str(file_b)],
        capture_output=True, text=True
    )
    return (result.returncode == 0, result.stdout)


def check_node_pin() -> dict:
    """Verifica versión node coincide con pin canonizado."""
    if not shutil.which("node"):
        return {"installed": False, "version": None, "matches_pin": False, "expected": NODE_VERSION_EXPECTED}
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True, timeout=5)
        version = result.stdout.strip()
        return {
            "installed": True,
            "version": version,
            "matches_pin": version == NODE_VERSION_EXPECTED,
            "expected": NODE_VERSION_EXPECTED,
        }
    except (subprocess.TimeoutExpired, OSError) as e:
        return {"installed": False, "version": None, "matches_pin": False, "expected": NODE_VERSION_EXPECTED, "error": str(e)}


def check_imports_smoke(lib_path: Path) -> dict:
    """Smoke test: los 5 helpers importan sin errores desde lib_path."""
    test_code = f"""
import sys
sys.path.insert(0, '{lib_path}')
try:
    from master_prompt_loader import load_master_prompt
    from input_loader import load_phase2_inputs
    from task_tool_bundler import preparar_bundle
    from check_9_anti_copia import compare_files_3_signals
    from validation_helpers import check_1_horas_directas
    print('OK')
except Exception as e:
    print(f'FAIL: {{e}}')
"""
    result = subprocess.run([sys.executable, "-c", test_code], capture_output=True, text=True)
    return {
        "lib_path": str(lib_path),
        "success": "OK" in result.stdout,
        "output": result.stdout.strip() or result.stderr.strip()
    }


def main() -> int:
    print("=" * 70)
    print("check-helpers-drift.py · Gap D.1.5 mitigation · 2026-04-29")
    print("=" * 70)
    
    exit_code = 0
    
    # 1. Verificar ambas skills tienen lib/
    if not FASE2_LIB.exists():
        print(f"\n⚠ FASE2_LIB no existe: {FASE2_LIB}")
        return 2
    if not FASE3_LIB.exists():
        print(f"\n⚠ FASE3_LIB no existe: {FASE3_LIB}")
        return 2
    
    # 2. Diff strict · 3 genuinamente shared
    print("\n─── Diff STRICT · 3 helpers genuinamente shared ───")
    drift_count = 0
    for helper in GENUINELY_SHARED:
        identical, diff = diff_files(FASE2_LIB / helper, FASE3_LIB / helper)
        if identical:
            print(f"  ✓ {helper} · idénticos (sin drift)")
        else:
            drift_count += 1
            exit_code = 1
            print(f"  ⚠ DRIFT DETECTADO · {helper}")
            print(f"    diff (primeras 10 líneas):")
            for line in diff.split("\n")[:10]:
                print(f"      {line}")
    
    # 3. Diff soft · 1 mayormente shared
    print("\n─── Diff SOFT · 1 helper mayormente shared (warning si difiere) ───")
    for helper in MOSTLY_SHARED:
        identical, diff = diff_files(FASE2_LIB / helper, FASE3_LIB / helper)
        if identical:
            print(f"  ✓ {helper} · idénticos · OK")
        else:
            print(f"  ⚠ Diff detected (esperado por topología distinta · revisar manual)")
            print(f"    diff size: {len(diff.split(chr(10)))} líneas")
    
    # 4. Phase-specific · informativo (no diff)
    print("\n─── Phase-specific · NO diff (divergen intencionalmente) ───")
    for helper in PHASE_SPECIFIC:
        f2_size = (FASE2_LIB / helper).stat().st_size if (FASE2_LIB / helper).exists() else 0
        f3_size = (FASE3_LIB / helper).stat().st_size if (FASE3_LIB / helper).exists() else 0
        print(f"  · {helper}: fase2={f2_size}b · fase3={f3_size}b · esperado divergir Hito 1 Task 3")
    
    # 5. Node version pin check
    print("\n─── Node version pin (Gap H.3 subprocess) ───")
    node_info = check_node_pin()
    if not node_info["installed"]:
        print(f"  ⚠ Node NO instalado · subprocess Fase 3 imposible · ver H.3 canon")
        exit_code = 1
    elif node_info["matches_pin"]:
        print(f"  ✓ Node {node_info['version']} · pin canon match")
    else:
        print(f"  ⚠ Node {node_info['version']} ≠ pin {node_info['expected']} · drift node runtime")
    
    # 6. Smoke imports
    print("\n─── Smoke imports · ambas skills ───")
    for lib in [FASE2_LIB, FASE3_LIB]:
        smoke = check_imports_smoke(lib)
        status = "✓" if smoke["success"] else "✗"
        print(f"  {status} {smoke['lib_path']}: {smoke['output'][:80]}")
        if not smoke["success"]:
            exit_code = 1
    
    # 7. Final veredicto
    print("\n" + "=" * 70)
    if exit_code == 0:
        print("✓ NO DRIFT · helpers shared sincronizados · ambas skills imports OK")
    elif exit_code == 1:
        print(f"⚠ DRIFT DETECTADO · {drift_count} helpers shared difieren · acción requerida:")
        print("    (a) propagar fix de uno a otro")
        print("    (b) divergir intencionalmente · documentar razón")
        print("    (c) refactorizar a lib-shared/ si la deuda duele de verdad (cancela task #30)")
    elif exit_code == 2:
        print("✗ Skills no inicializadas correctamente · Hito 1 Task 1+2 incompleto")
    print("=" * 70)
    
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
