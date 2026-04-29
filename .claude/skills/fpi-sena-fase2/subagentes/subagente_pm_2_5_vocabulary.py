"""
subagente_pm_2_5_vocabulary.py — Subagente CREATIVO PM-2.5 Literacy & Vocabulary Skills.

Camino arquitectónico (2): Task tool con master prompt inyectado · NO Python determinístico.

CONSUMIDOR del Master Anchor Text generado por PM-2.3 (dependencia canon).
Sin pm-2-3.json del mismo run/guide previamente generado, este subagente NO debe lanzarse
(o el bundle se construirá con previous_pms = None · Activity Card resultante será incoherente).

5 arquetipos canónicos (modo extensible):
- A — Word Wall + Phonics
- B — Vocabulary Development + Juego (flashcards + categorías)
- C — Reading Fluency
- D — Writing Scaffolding en formatos reales
- E — (5° arquetipo · ver master prompt PM-2.5)

Modo MGV-style: documenta los 5 arquetipos como compendio metodológico.
Modo DIESEL-style: 3 arquetipos en secuencia encadenada (canon DIESEL pm-2-5.json).

Uso:
    python3 subagente_pm_2_5_vocabulary.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]

Output: bundle JSON listo para Task tool · NO se ejecuta automáticamente.
"""

import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR.parent / "lib"))

from task_tool_bundler import preparar_bundle


PM_ID = "PM-2.5"
SCHEMA_VERSION = "1.0"
DEPENDENCIA_OBLIGATORIA = "PM-2.3"  # productor del Master Anchor Text


def verificar_previous_pms_chain(run_id, runs_dir, guide_id):
    """
    Verifica que pm-2-3.json existe (dependencia obligatoria).
    Retorna dict con info para previous_pms_chain del bundle.
    """
    if guide_id:
        pm23_path = Path(runs_dir) / run_id / guide_id / "pm-2-3.json"
    else:
        pm23_path = Path(runs_dir) / run_id / "pm-2-3.json"
    
    if not pm23_path.exists():
        return {
            "status": "MISSING",
            "pm_dependiente": "PM-2.3",
            "path_buscado": str(pm23_path),
            "warning": (
                f"PM-2.5 es CONSUMIDOR del Master Anchor Text de PM-2.3. "
                f"Sin pm-2-3.json del mismo run/guide, el subagente generará "
                f"vocabulary sin anchor base · contenido pedagógicamente incoherente."
            ),
            "accion_recomendada": "Lanzar subagente_pm_2_3_reading_anchor.py PRIMERO · esperar pm-2-3.json · después PM-2.5"
        }
    
    return {
        "status": "OK",
        "pm_dependiente": "PM-2.3",
        "path": str(pm23_path),
        "size_bytes": pm23_path.stat().st_size
    }


def preparar_bundle_pm_2_5(run_id, runs_dir, master_prompts_dir, repo_root, guide_id=None):
    """
    Prepara bundle de invocación canónica para PM-2.5 vocabulary.
    
    PRE-REQUISITO: pm-2-3.json del mismo run/guide debe existir (Master Anchor Text).
    Si no existe, el bundle incluye warning explícito y previous_pms_chain status MISSING.
    """
    print(f"[PM-2.5 vocabulary] Preparando bundle Task tool...")
    print(f"  run: {run_id} · guide: {guide_id} · runs_dir: {runs_dir}")
    
    # Verificar dependencia obligatoria PM-2.3
    print(f"[PM-2.5] Verificando dependencia PM-2.3 (Master Anchor Text)...")
    chain_info = verificar_previous_pms_chain(run_id, runs_dir, guide_id)
    if chain_info["status"] == "MISSING":
        print(f"  ⚠ DEPENDENCIA FALTANTE: {chain_info['warning']}")
        print(f"     {chain_info['accion_recomendada']}")
    else:
        print(f"  ✓ pm-2-3.json encontrado ({chain_info['size_bytes']:,} bytes)")
    
    # Preparar bundle base
    bundle = preparar_bundle(
        pm_id=PM_ID,
        run_id=run_id,
        runs_dir=runs_dir,
        master_prompts_dir=master_prompts_dir,
        repo_root=repo_root,
        guide_id=guide_id
    )
    
    # Anotaciones específicas de PM-2.5 al bundle
    bundle["pm_id"] = PM_ID
    bundle["subagente_version"] = SCHEMA_VERSION
    bundle["consume_de"] = "Master Anchor Text de PM-2.3"
    bundle["dependencia_obligatoria"] = DEPENDENCIA_OBLIGATORIA
    bundle["previous_pms_chain"] = chain_info
    bundle["dependencias_downstream"] = []  # PM-2.5 es consumidor terminal en S2
    bundle["catalogo_arquetipos_canonico"] = [
        "A — Word Wall + Phonics",
        "B — Vocabulary Development + Juego",
        "C — Reading Fluency",
        "D — Writing Scaffolding en formatos reales",
        "E — (5° arquetipo · ver master prompt PM-2.5)"
    ]
    
    # Si dependencia falta · marcar bundle como BLOCKED
    if chain_info["status"] == "MISSING":
        bundle["status"] = "BLOCKED_MISSING_DEPENDENCY"
        bundle["recommendation"] = "Lanzar subagente_pm_2_3 PRIMERO · esperar output · después relanzar PM-2.5"
    else:
        bundle["status"] = "READY"
    
    print(f"  ✓ Bundle preparado · {bundle['bundle_size_chars']:,} chars")
    print(f"  ✓ Master prompt: {bundle['inputs_loaded']['master_prompt']['pm_id']} v{bundle['inputs_loaded']['master_prompt']['version']}")
    print(f"  ✓ Estilo declarado: {bundle['inputs_loaded']['arquetipos_elegidos']['estilo']}")
    print(f"  ✓ Ref operacional: {bundle['inputs_loaded']['ref_op_path']}")
    print(f"  ✓ Expected output: {bundle['expected_output_file']}")
    print(f"  ✓ Status: {bundle['status']}")
    print(f"")
    print(f"  ⏸ NO se lanza Task tool automáticamente.")
    print(f"     Orquestador (Claude) decide cuándo invocar usando este bundle.")
    
    return bundle


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python subagente_pm_2_5_vocabulary.py <run_id> <runs_dir> <master_prompts_dir> [repo_root] [guide_id]")
        sys.exit(1)
    
    run_id = sys.argv[1]
    runs_dir = sys.argv[2]
    master_prompts_dir = sys.argv[3]
    repo_root = sys.argv[4] if len(sys.argv) > 4 else str(Path(runs_dir).parent)
    guide_id = sys.argv[5] if len(sys.argv) > 5 else None
    
    bundle = preparar_bundle_pm_2_5(run_id, runs_dir, master_prompts_dir, repo_root, guide_id)
    
    print(f"\n=== BUNDLE STRUCTURE (smoke shape · estático · NO se lanza Task tool) ===")
    summary = {
        "subagent_type": bundle["subagent_type"],
        "expected_output_file": bundle["expected_output_file"],
        "bundle_size_chars": bundle["bundle_size_chars"],
        "validations_count": len(bundle["validation_post_hoc"]),
        "consume_de": bundle["consume_de"],
        "previous_pms_chain": bundle["previous_pms_chain"],
        "estilo_declarado": bundle["inputs_loaded"]["arquetipos_elegidos"].get("estilo"),
        "ref_op_path": bundle["inputs_loaded"]["ref_op_path"],
        "status": bundle["status"]
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
