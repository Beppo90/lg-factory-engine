"""
cli_parser.py — Abstracción canónica argv parsing para subagentes mecánicos Fase 3+.

Per PLAN-FASE-3-ARQUITECTURA.md v1.1 §11.1 #9 (D.1.5 canonizado): este módulo mata
el bug guide_id endémico (4-de-4 mecánicos Fase 2) **por abstracción · NO por ubicación
del archivo**. Ningún subagente mecánico Fase 3+ vuelve a re-implementar argv parsing.

Diagnóstico Sergio 2026-04-29 (PLAN v1.1 §11.1 #9): el bug guide_id NO fue causado por
duplicación de código. Fue causado por **ausencia de abstracción** — cada uno de los 4
mecánicos Fase 2 (input_loader, PM-2.11, PM-4.1, PM-4.2) escribió argv parsing
independiente que casualmente convergió al mismo error (guide_id obligatorio · single-guía
absorpción no soportado). El fix arquitectónico correcto es la abstracción que documenta
canon una vez · NO la deduplicación de código.

⚠ DISCIPLINA REGLA 21 STRICT: este módulo resistió 4 NO's explícitos durante diseño
(documentados PLAN v1.1 §11.1 #9 · acordados con Sergio):

  ❌ NO argparse.ArgumentParser (overhead · canon Fase 2 nunca lo usó · cambio cultural)
  ❌ NO subcomandos · flags --validate-only · --dry-run (sin evidencia operacional · YAGNI)
  ❌ NO logging estructurado · multi-format output (mecánicos solo necesitan parse simple)
  ❌ NO env vars override (cero casos de uso reportados · YAGNI)

API expandida emerge cuando aparezca evidencia operacional · NO antes.
"""

import os
import sys
from typing import NamedTuple, Optional


class SubagenteArgs(NamedTuple):
    """Args canónicos parsed para todo subagente mecánico Fase 3+.
    
    Convención canónica acordada D.1.5 (PLAN v1.1 §11.1 #9):
        python <script> <run_id> <runs_dir> <master_prompts_dir> [guide_id]
    
    guide_id es OPCIONAL. None permite single-guía absorpción
    (per fix Step 0 + Step 4 + Step 5 Hito 4 Fase 2 · 2026-04-29).
    """
    run_id: str
    runs_dir: str
    master_prompts_dir: str
    guide_id: Optional[str]


def parse_subagente_args(script_name: str) -> SubagenteArgs:
    """Parse argv canónico para subagentes mecánicos Fase 3+.
    
    Args:
        script_name: nombre del script para mensaje de uso. Acepta __file__ directo
                     (extrae basename automáticamente per refinamiento Sergio #3 2026-04-29)
                     o nombre simple "subagente_pm_3_X.py".
    
    Returns:
        SubagenteArgs(run_id, runs_dir, master_prompts_dir, guide_id)
        guide_id será None si no se pasó argv[4] (single-guía absorpción)
    
    Raises:
        SystemExit(1) si argv insuficiente · imprime uso canónico antes
    """
    pretty_name = os.path.basename(script_name)
    
    if len(sys.argv) < 4:
        print(f"Uso: python {pretty_name} <run_id> <runs_dir> <master_prompts_dir> [guide_id]")
        print(f"  guide_id opcional · single-guía absorpción carga inputs desde raíz")
        print(f"  Convención canónica D.1.5 (PLAN-FASE-3 v1.1 §11.1 #9)")
        sys.exit(1)
    
    return SubagenteArgs(
        run_id=sys.argv[1],
        runs_dir=sys.argv[2],
        master_prompts_dir=sys.argv[3],
        guide_id=sys.argv[4] if len(sys.argv) > 4 else None,
    )


# === Smoke test inline (3 casos) ===

if __name__ == "__main__":
    # Save original argv to restore between tests
    original_argv = sys.argv.copy()
    
    print("cli_parser.py · self-test")
    
    # Test 1 · args válidos sin guide_id (single-guía absorpción)
    sys.argv = ['test', 'IMARPOR-CC-2026-04-27', 'runs', 'master-prompts']
    args = parse_subagente_args('subagente_pm_3_1_outline.py')
    assert args.run_id == 'IMARPOR-CC-2026-04-27', f"run_id mismatch: {args.run_id}"
    assert args.runs_dir == 'runs'
    assert args.master_prompts_dir == 'master-prompts'
    assert args.guide_id is None, f"guide_id should be None: {args.guide_id}"
    print(f"  ✓ Test 1 · single-guía args OK · {args}")
    
    # Test 2 · args válidos con guide_id (multi-guía)
    sys.argv = ['test', 'MGV-2026-04-27', 'runs', 'master-prompts', 'g3']
    args = parse_subagente_args('/Users/Beppo/Projects/fpi/.../subagente_pm_3_6_gfpi.py')
    assert args.run_id == 'MGV-2026-04-27'
    assert args.guide_id == 'g3', f"guide_id mismatch: {args.guide_id}"
    print(f"  ✓ Test 2 · multi-guía args + basename OK · {args}")
    
    # Test 3 · args insuficientes (debe SystemExit 1)
    print(f"  · Test 3 · args insuficientes (SystemExit esperado · captura subprocess):")
    sys.argv = ['test', 'IMARPOR-CC-2026-04-27', 'runs']  # falta master_prompts_dir
    try:
        parse_subagente_args('test_script.py')
        print(f"    ✗ FAIL · debería haber salido con SystemExit(1)")
    except SystemExit as e:
        assert e.code == 1, f"exit code mismatch: {e.code}"
        print(f"    ✓ SystemExit(1) correcto · uso impreso")
    
    # Restore argv
    sys.argv = original_argv
    print(f"\n✓ Self-test 3/3 PASS · API minimal canónica D.1.5 funcional")
