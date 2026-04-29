"""
check_9_anti_copia.py — Implementación canónica del CHECK 9 anti-copia-fantasma
del DOCUMENTO MAESTRO §10 (= Check 13 de PM-2.11 v2.6.3).

Compara archivos pm-2-X.json byte-a-byte (excluyendo run_id) entre:
1. Guías del MISMO run (g1.pm-2-X vs g2.pm-2-X)
2. MISMA guía entre runs distintos (NEW.g1.pm-2-X vs MGV-04-20.g1.pm-2-X)

Si encuentra coincidencia byte-idéntica: FAIL (bug copia-fantasma activo).

Bug histórico que previene: DIESEL G3-G5 (2026-04-18) — pm-2-3, pm-2-5, pm-2-6
byte-idénticos entre G3, G4 y G5 del mismo run · contenido pedagógico cruzado.
"""

import hashlib
import json
import re
from pathlib import Path


def normalize_for_hash(json_data):
    """
    Serializa el JSON quitando el campo run_id (que SIEMPRE difiere entre runs).
    También quita campos de timestamp/generation si existen.
    """
    if isinstance(json_data, dict):
        clean = {k: v for k, v in json_data.items() 
                 if k not in ("run_id", "generated_date", "generated_at", "timestamp", "_meta")}
        return json.dumps(clean, indent=2, ensure_ascii=False, sort_keys=True)
    return json.dumps(json_data, indent=2, ensure_ascii=False, sort_keys=True)


def sha256_of_normalized(json_data):
    """Calcula SHA-256 del JSON normalizado (sin run_id)."""
    text = normalize_for_hash(json_data)
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def compare_files(file_a, file_b):
    """
    Compara dos archivos JSON byte-a-byte (excluyendo run_id).
    
    Returns:
        dict con keys: identical (bool), hash_a, hash_b, file_a, file_b
    """
    data_a = json.loads(Path(file_a).read_text(encoding="utf-8"))
    data_b = json.loads(Path(file_b).read_text(encoding="utf-8"))
    hash_a = sha256_of_normalized(data_a)
    hash_b = sha256_of_normalized(data_b)
    return {
        "identical": hash_a == hash_b,
        "hash_a": hash_a,
        "hash_b": hash_b,
        "file_a": str(file_a),
        "file_b": str(file_b)
    }


def check_intra_run(run_dir, pm_pattern="pm-2-*.json"):
    """
    Verifica que NO haya pm-2-X.json byte-idénticos entre guías del mismo run.
    
    Args:
        run_dir: path al directorio del run (ej. runs/INGBAS4-2026/)
        pm_pattern: glob de archivos a comparar
    
    Returns:
        list de dicts con violaciones (vacío = PASS · no-vacío = FAIL)
    """
    run_path = Path(run_dir)
    violations = []
    
    # Listar todas las guías (g1/, g2/, ...)
    guides = sorted([d for d in run_path.iterdir() 
                     if d.is_dir() and re.match(r"^g\d+$", d.name)])
    
    if len(guides) < 2:
        return []  # Single-guía no aplica
    
    # Para cada PM, comparar entre todas las guías
    pm_files_per_guide = {g.name: list(g.glob(pm_pattern)) for g in guides}
    pm_names = set()
    for files in pm_files_per_guide.values():
        for f in files:
            pm_names.add(f.name)
    
    for pm_name in pm_names:
        files_with_pm = [(g, g / pm_name) for g in guides if (g / pm_name).exists()]
        for i in range(len(files_with_pm)):
            for j in range(i + 1, len(files_with_pm)):
                g_a, file_a = files_with_pm[i]
                g_b, file_b = files_with_pm[j]
                result = compare_files(file_a, file_b)
                if result["identical"]:
                    violations.append({
                        "type": "intra_run_copy_fantasma",
                        "pm_file": pm_name,
                        "guide_a": g_a.name,
                        "guide_b": g_b.name,
                        "hash": result["hash_a"],
                        "severity": "CRITICAL"
                    })
    return violations


def check_cross_run(new_run_dir, ref_run_dirs, pm_pattern="pm-2-*.json"):
    """
    Verifica que las pm-2-X.json del run nuevo NO sean byte-idénticas a las
    de runs anteriores (excluyendo el caso legítimo de regeneración intencional).
    
    Args:
        new_run_dir: path al run nuevo
        ref_run_dirs: lista de paths a runs de referencia (MGV/DIESEL)
        pm_pattern: glob de archivos
    
    Returns:
        list de dicts con coincidencias (puede ser legítimo si es regeneración intencional)
    """
    new_path = Path(new_run_dir)
    matches = []
    
    new_guides = sorted([d for d in new_path.iterdir() 
                         if d.is_dir() and re.match(r"^g\d+$", d.name)])
    
    for ref_dir in ref_run_dirs:
        ref_path = Path(ref_dir)
        if not ref_path.exists():
            continue
        ref_guides = sorted([d for d in ref_path.iterdir() 
                             if d.is_dir() and re.match(r"^g\d+$", d.name)])
        
        # Comparar misma guía (g1 vs g1, g2 vs g2, etc.)
        for new_g in new_guides:
            ref_g = ref_path / new_g.name
            if not ref_g.exists():
                continue
            for new_file in new_g.glob(pm_pattern):
                ref_file = ref_g / new_file.name
                if not ref_file.exists():
                    continue
                result = compare_files(new_file, ref_file)
                if result["identical"]:
                    matches.append({
                        "type": "cross_run_match",
                        "pm_file": new_file.name,
                        "guide": new_g.name,
                        "ref_run": ref_path.name,
                        "hash": result["hash_a"],
                        "severity": "WARNING"  # Puede ser legítimo si es regen intencional
                    })
    return matches


def run_check_9(run_dir, ref_run_dirs=None):
    """
    Ejecuta CHECK 9 completo: intra-run (CRITICAL) + cross-run (WARNING).
    
    Returns:
        dict con keys: status (PASS/FAIL), violations, warnings
    """
    intra = check_intra_run(run_dir)
    cross = check_cross_run(run_dir, ref_run_dirs or []) if ref_run_dirs else []
    
    status = "PASS" if not intra else "FAIL"
    
    return {
        "check_id": "CHECK 9 (= Check 13 de PM-2.11 v2.6.3)",
        "name": "Uniqueness of Pedagogical Content Universe",
        "status": status,
        "violations_critical": intra,
        "warnings_cross_run": cross,
        "total_violations": len(intra),
        "total_warnings": len(cross),
        "rationale": "PASS = ningún pm-2-X.json es byte-idéntico entre guías del mismo run. "
                     "FAIL = bug copia-fantasma activo (estilo DIESEL G3-G5 2026-04-18) · regenerar subagente afectado."
    }


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Uso: python check_9_anti_copia.py <run_dir> [ref_run_dir1] [ref_run_dir2] ...")
        sys.exit(1)
    
    run_dir = sys.argv[1]
    ref_dirs = sys.argv[2:] if len(sys.argv) > 2 else []
    
    result = run_check_9(run_dir, ref_dirs)
    print(f"=== {result['check_id']} ===")
    print(f"Status: {result['status']}")
    print(f"Violaciones CRITICAL (intra-run): {result['total_violations']}")
    print(f"Warnings (cross-run): {result['total_warnings']}")
    if result['violations_critical']:
        print("\nDetalles CRITICAL:")
        for v in result['violations_critical']:
            print(f"  - {v['pm_file']} · {v['guide_a']} ↔ {v['guide_b']} · hash={v['hash'][:16]}...")


# ═══════════════════════════════════════════════════════════════════════════════
# INSTRUMENTACIÓN — 3 señales para diagnóstico de whitespace (smoke 2026-04-29)
# ═══════════════════════════════════════════════════════════════════════════════

def normalize_whitespace_aggressive(text):
    """Normaliza whitespace agresivamente para diagnóstico (NO para producción)."""
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def hash_with_3_signals(json_data):
    """
    Calcula 3 señales de hash para diagnóstico de whitespace.
    
    Returns:
        dict con keys:
        - hash_strict (current behavior · normaliza solo orden de keys + indent + run_id stripped)
        - hash_whitespace_normalized (adicionalmente colapsa todo whitespace en strings)
        - signals_differ (bool · True si los 2 hashes difieren)
    """
    # Strict: normaliza estructura JSON pero preserva contenido textual
    text_strict = normalize_for_hash(json_data)
    h_strict = hashlib.sha256(text_strict.encode("utf-8")).hexdigest()
    
    # Whitespace-normalized: además colapsa whitespace dentro de strings
    text_ws = normalize_whitespace_aggressive(text_strict)
    h_ws = hashlib.sha256(text_ws.encode("utf-8")).hexdigest()
    
    return {
        "hash_strict": h_strict,
        "hash_whitespace_normalized": h_ws,
        "signals_differ": h_strict != h_ws
    }


def compare_files_3_signals(file_a, file_b):
    """Compara 2 archivos con las 3 señales · detecta casos donde strict miss-detecta whitespace."""
    data_a = json.loads(Path(file_a).read_text(encoding="utf-8"))
    data_b = json.loads(Path(file_b).read_text(encoding="utf-8"))
    
    signals_a = hash_with_3_signals(data_a)
    signals_b = hash_with_3_signals(data_b)
    
    strict_match = signals_a["hash_strict"] == signals_b["hash_strict"]
    ws_match = signals_a["hash_whitespace_normalized"] == signals_b["hash_whitespace_normalized"]
    diff_strict_vs_normalized = strict_match != ws_match  # disagree = caso interesante
    
    return {
        "file_a": str(file_a),
        "file_b": str(file_b),
        "strict_match": strict_match,
        "whitespace_normalized_match": ws_match,
        "diff_strict_vs_normalized": diff_strict_vs_normalized,
        "interesting_case": diff_strict_vs_normalized,
        "hash_a_strict": signals_a["hash_strict"][:16],
        "hash_a_ws": signals_a["hash_whitespace_normalized"][:16],
        "hash_b_strict": signals_b["hash_strict"][:16],
        "hash_b_ws": signals_b["hash_whitespace_normalized"][:16]
    }
