"""
input_loader.py — Utilidad para cargar inputs canónicos de un run con validación.

Carga pm-0-context.json, pm-1-1.json, pm-1-2.json, pm-2-0.json, arquetipos-elegidos.json
desde un run y valida que existan los campos críticos antes de pasarlos a un subagente.
"""

import json
from pathlib import Path


def load_run_input(run_id, runs_dir, input_name, guide_id=None):
    """
    Carga un input específico del run.
    
    Args:
        run_id: identificador del run (ej. "INGBAS4-2026")
        runs_dir: path al directorio runs/ del repo
        input_name: nombre del archivo (ej. "pm-0-context.json", "pm-1-2.json")
        guide_id: opcional, sub-directorio de guía (ej. "g1") · si se omite, busca en raíz del run
    
    Returns:
        dict con el JSON cargado
    
    Raises:
        FileNotFoundError si el archivo no existe
    """
    base = Path(runs_dir) / run_id
    if guide_id:
        path = base / guide_id / input_name
    else:
        path = base / input_name
    
    if not path.exists():
        raise FileNotFoundError(f"Input no encontrado: {path}")
    
    return json.loads(path.read_text(encoding="utf-8"))


def load_phase2_inputs(run_id, runs_dir, guide_id=None):
    """
    Carga el conjunto canónico de inputs de Fase 1 que necesita Fase 2.
    
    Returns:
        dict con keys: pm0_context, pm11, pm12 (puede ser None si no hay guide_id)
    
    Raises:
        FileNotFoundError si pm0_context o pm11 no existen
    """
    pm0_context = load_run_input(run_id, runs_dir, "pm-0-context.json")
    pm11 = load_run_input(run_id, runs_dir, "pm-1-1.json")
    
    pm12 = None
    if guide_id:
        try:
            pm12 = load_run_input(run_id, runs_dir, "pm-1-2.json", guide_id=guide_id)
        except FileNotFoundError:
            # Para single-guía absorpción, pm-1-2.json puede estar en raíz
            try:
                pm12 = load_run_input(run_id, runs_dir, "pm-1-2.json")
            except FileNotFoundError:
                pm12 = None
    else:
        # Sin guide_id · single-guía absorpción · pm-1-2 vive en raíz directamente
        try:
            pm12 = load_run_input(run_id, runs_dir, "pm-1-2.json")
        except FileNotFoundError:
            pm12 = None
    
    # Validación: pm-1-2 debe tener enriched: true para arrancar Fase 2
    if pm12 and pm12.get("enriched") is not True:
        raise ValueError(
            f"Run {run_id} guide {guide_id} pm-1-2.json tiene enriched={pm12.get('enriched')}. "
            f"Fase 2 NO puede arrancar hasta que Sergio marque enriched: true (gate Fase 1 cumplido)."
        )
    
    return {
        "pm0_context": pm0_context,
        "pm11": pm11,
        "pm12": pm12,
        "run_id": run_id,
        "guide_id": guide_id
    }


def load_arquetipos_elegidos(run_id, runs_dir):
    """Carga el arquetipos-elegidos.json (gate humano 1)."""
    return load_run_input(run_id, runs_dir, "arquetipos-elegidos.json")


def load_pm20_blueprint(run_id, runs_dir):
    """Carga el pm-2-0.json Session Blueprint."""
    return load_run_input(run_id, runs_dir, "pm-2-0.json")


def load_activity_card(run_id, runs_dir, guide_id, pm_id):
    """Carga una Activity Card específica (PM-2.X.json)."""
    pm_filename = f"pm-2-{pm_id.replace('PM-2.', '')}.json"
    return load_run_input(run_id, runs_dir, pm_filename, guide_id=guide_id)


def save_run_output(run_id, runs_dir, output_name, data, guide_id=None):
    """
    Guarda un output canónico en el run con indent=2 y ensure_ascii=False.
    """
    base = Path(runs_dir) / run_id
    if guide_id:
        target_dir = base / guide_id
    else:
        target_dir = base
    
    target_dir.mkdir(parents=True, exist_ok=True)
    path = target_dir / output_name
    
    path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    return str(path)



def load_phase3_inputs(run_id, runs_dir, guide_id=None):
    """
    Carga inputs canónicos de Fase 3 desde Fase 2 cerrada.
    
    Aplica gate canónico §6.4 strict: pm-2-11.ready_for_phase_3 == True
    + 9 Activity Cards con enriched: True (Gate 2 Fase 2 cumplido).
    
    Returns:
        dict con keys:
            pm0_context, pm11, pm12, run_id, guide_id  (de load_phase2_inputs)
            pm20         (Session Blueprint pm-2-0.json)
            pm211        (Row Assembler pm-2-11.json · ready_for_phase_3 validated)
            activity_cards: dict {PM-2.X: card}  (9 PMs creativos · todos enriched)
            pm41         (PM-4.1 Instrumentos · ya generado en Fase 2 mecánico)
            pm42         (PM-4.2 Cuestionario S6 · idem)
    
    Raises:
        ValueError si pm-2-11.ready_for_phase_3 != True (gate canon §6.4)
        ValueError si algún Activity Card .enriched != True (Gate 2 Fase 2 incompleto)
        FileNotFoundError si pm-4-1, pm-4-2, pm-2-0 o pm-2-11 no existen
    """
    # 1. Reusa load_phase2_inputs (pm0 + pm11 + pm12)
    base = load_phase2_inputs(run_id, runs_dir, guide_id=guide_id)
    
    # 2. PM-2.0 Session Blueprint
    pm20 = load_pm20_blueprint(run_id, runs_dir)
    
    # 3. PM-2.11 row + gate §6.4 inline (NO helper · REGLA 21 sutil per Sergio 2026-04-29)
    pm211 = load_run_input(run_id, runs_dir, "pm-2-11.json", guide_id=guide_id)
    if not pm211.get("ready_for_phase_3"):
        raise ValueError(
            f"pm-2-11.ready_for_phase_3 != True · canon §6.4 NO cumplido · "
            f"Hito 4 Fase 2 debe cerrar antes de cargar inputs Fase 3"
        )
    
    # 4. 9 Activity Cards · validar enriched: true cada uno (Gate 2 Fase 2 cumplido)
    PMS_CREATIVOS = ["1", "2", "3", "4", "5", "6", "8", "9", "10"]  # PM-2.7 deprecated
    activity_cards = {}
    for pm_short in PMS_CREATIVOS:
        ac = load_run_input(run_id, runs_dir, f"pm-2-{pm_short}.json", guide_id=guide_id)
        if not ac.get("enriched"):
            raise ValueError(
                f"PM-2.{pm_short}.enriched != True · Gate 2 Fase 2 incompleto · "
                f"instructor debe aprobar Activity Card antes de cargar Fase 3"
            )
        activity_cards[f"PM-2.{pm_short}"] = ac
    
    # 5. PM-4.1 + PM-4.2 (mecánicos · ya en raíz post Step 5 Hito 4)
    pm41 = load_run_input(run_id, runs_dir, "pm-4-1.json", guide_id=guide_id)
    pm42 = load_run_input(run_id, runs_dir, "pm-4-2.json", guide_id=guide_id)
    
    return {
        **base,
        "pm20": pm20,
        "pm211": pm211,
        "activity_cards": activity_cards,
        "pm41": pm41,
        "pm42": pm42,
    }


if __name__ == "__main__":
    # Self-test
    import sys
    base = sys.argv[1] if len(sys.argv) > 1 else "/Users/Beppo/Projects/fpi-sena-factory/runs"
    run_id = sys.argv[2] if len(sys.argv) > 2 else "INGBAS4-2026"
    print(f"=== Cargando inputs Fase 2 de {base}/{run_id} ===")
    try:
        inputs = load_phase2_inputs(run_id, base)
        print(f"  ✓ pm-0-context: programa={inputs['pm0_context'].get('programa_nombre')}")
        print(f"  ✓ pm-1-1: tipo={inputs['pm11'].get('tipo')} · {inputs['pm11'].get('total_guias')} guías")
        print(f"  pm-1-2: {'cargado · enriched=' + str(inputs['pm12'].get('enriched')) if inputs['pm12'] else 'no aplica (sin guide_id)'}")
    except Exception as e:
        print(f"  ✗ ERROR: {e}")
    
    # NEW · Fase 3 self-test (Task 3 · 2026-04-29)
    print(f"\n=== Cargando inputs Fase 3 de {base}/{run_id} ===")
    try:
        p3 = load_phase3_inputs(run_id, base)
        print(f"  ✓ pm0_context.programa_nombre: {p3['pm0_context'].get('programa_nombre')}")
        print(f"  ✓ pm211.ready_for_phase_3: {p3['pm211'].get('ready_for_phase_3')}")
        print(f"  ✓ pm211.veredicto: {p3['pm211'].get('validation_16_checks',{}).get('veredicto','?')}")
        print(f"  ✓ activity_cards: {len(p3['activity_cards'])} loaded · {list(p3['activity_cards'].keys())}")
        enriched_check = all(c.get('enriched') for c in p3['activity_cards'].values())
        print(f"  ✓ all activity_cards.enriched: {enriched_check}")
        print(f"  ✓ pm20 num_sessions: {p3['pm20'].get('session_blueprint',{}).get('num_sessions','?')}")
        print(f"  ✓ pm41: {bool(p3['pm41'])} · pm42: {bool(p3['pm42'])}")
    except FileNotFoundError as e:
        print(f"  · skip Fase 3 (input no disponible · run no llegó a Hito 4 Fase 2): {e}")
    except ValueError as e:
        print(f"  · skip Fase 3 (gating §6.4 NO cumplido): {e}")
    except Exception as e:
        print(f"  ✗ ERROR Fase 3: {type(e).__name__}: {e}")
