"""
LG Factory — Content Validator
Checks coherence of generated worksheets against program constraints.
"""

import re
from typing import Optional


def validate_grammar_constraint(content: str, allowed_structures: list,
                                 restricted_structures: list) -> dict:
    """Check that worksheet content respects grammar constraints."""
    issues = []

    # Check for restricted structures (simple heuristic)
    restricted_patterns = {
        "present_simple": [
            (r'\b(he|she|it)\s+(works|runs|goes|makes|does|has|is)\b', "Present Simple 3rd person"),
            (r'\b(every day|always|usually|often)\b.*\b(works|runs|goes)\b', "Present Simple adverb+verb"),
        ],
        "imperative": [
            (r'^(Do|Don\'t|Report|Secure|Check|Follow|Go|Stop|Start|Open|Close)\s', "Imperative command"),
            (r'(?:^|\.\s)([A-Z][a-z]+)\s(all|the)\s', "Possible imperative"),
        ],
        "present_progressive": [
            (r'\b(is|are)\s+\w+ing\b', "Present Progressive"),
        ],
        "modals": [
            (r'\b(can|could|should|must|may|might|will|would)\s+\w+\b', "Modal verb"),
        ],
        "quantifiers": [
            (r'\b(many|much|few|little|a lot of|some|any|several)\s+', "Quantifier"),
        ],
        "tag_questions": [
            (r',\s*(isn\'t|aren\'t|don\'t|doesn\'t|can\'t|won\'t)\s+(it|they|he|she|we|you)\?', "Tag question"),
        ],
        "smcp_phrases": [
            (r'\bMAYDAY\b', "MAYDAY phrase"),
            (r'\bPAN PAN\b', "PAN PAN phrase"),
            (r'\bSECURITÉ\b', "SECURITÉ phrase"),
        ],
        "reported_commands": [
            (r'\b(instructed|ordered|told|asked)\s+\w+\s+to\s+', "Reported command"),
        ],
    }

    for restricted in restricted_structures:
        if restricted in restricted_patterns:
            for pattern, desc in restricted_patterns[restricted]:
                matches = re.findall(pattern, content, re.MULTILINE | re.IGNORECASE)
                if matches:
                    issues.append(f"RESTRICTED FOUND: {desc} ({restricted}) — {len(matches)} occurrence(s)")

    return {
        "valid": len(issues) == 0,
        "issues": issues
    }


def validate_key_vocabulary_usage(content: str, key_vocabulary: list) -> dict:
    """Check that key vocabulary terms appear in the worksheet."""
    content_lower = content.lower()
    found = []
    missing = []

    for term in key_vocabulary:
        if term.lower() in content_lower:
            found.append(term)
        else:
            missing.append(term)

    return {
        "total": len(key_vocabulary),
        "found": len(found),
        "missing": missing,
        "coverage": f"{len(found)}/{len(key_vocabulary)} ({100*len(found)/len(key_vocabulary):.0f}%)",
        "adequate": len(found) >= 12  # at least 12 of 20
    }


def validate_answer_key(content: str) -> dict:
    """Check that worksheet includes an answer key."""
    patterns = [
        r'(?i)teacher\s+answer\s+key',
        r'(?i)answer\s+key',
        r'(?i)soluciones?',
        r'(?i)respuestas?\s+correctas?',
    ]

    has_key = any(re.search(p, content) for p in patterns)

    return {
        "has_answer_key": has_key,
        "status": "OK" if has_key else "MISSING — no answer key found"
    }


def validate_gfpi_markers(content: str) -> dict:
    """Check that GFPI section markers are present and well-formed."""
    start_markers = re.findall(r'<!-- GFPI SECTION: (.+?) -->', content)
    end_markers = content.count("<!-- END GFPI SECTION -->")

    issues = []
    if len(start_markers) != end_markers:
        issues.append(f"Mismatched markers: {len(start_markers)} start vs {end_markers} end")

    return {
        "markers_found": len(start_markers),
        "sections": start_markers,
        "well_formed": len(issues) == 0,
        "issues": issues
    }


def validate_cefr_level(content: str, cefr: str = "A1") -> dict:
    """Basic check for CEFR level appropriateness."""
    issues = []

    # Check sentence length (A1: max 15 words)
    sentences = re.split(r'[.!?]+', content)
    long_sentences = []
    for s in sentences:
        words = s.strip().split()
        if len(words) > 20:
            long_sentences.append(len(words))

    if long_sentences:
        issues.append(f"{len(long_sentences)} sentence(s) exceed 20 words (max for A1: ~15)")

    # Check for meta-talk
    meta_patterns = [
        r'(?i)teor[ií]a\s+de\s+bloom',
        r'(?i)diseño\s+instruccional',
        r'(?i)marco\s+teórico',
        r'(?i)justificación\s+pedagógica',
    ]
    for p in meta_patterns:
        if re.search(p, content):
            issues.append(f"Meta-talk detected: matches '{p}'")

    return {
        "level": cefr,
        "issues": issues,
        "appropriate": len(issues) == 0
    }


def validate_unit_coherence(unit_outputs: dict) -> dict:
    """Cross-check coherence across all PMs in a unit."""
    issues = []

    # Check that vocabulary is consistent across worksheets
    vocab_usage = {}
    for pm_key, content in unit_outputs.items():
        if not content:
            continue
        # Simple check: count maritime terms
        maritime_terms = len(re.findall(
            r'(?i)\b(bridge|hull|deck|bow|stern|lifeboat|gangway|propeller)\b', content
        ))
        vocab_usage[pm_key] = maritime_terms

    low_usage = [k for k, v in vocab_usage.items() if v < 3 and k not in ["functions_material"]]
    if low_usage:
        issues.append(f"Low maritime vocabulary usage in: {', '.join(low_usage)}")

    # Check that demonstratives appear in Unit 1 worksheets
    demo_usage = {}
    for pm_key, content in unit_outputs.items():
        if not content:
            continue
        demos = len(re.findall(r'(?i)\b(this is|that is|these are|those are)\b', content))
        demo_usage[pm_key] = demos

    return {
        "issues": issues,
        "vocab_distribution": vocab_usage,
        "demo_distribution": demo_usage,
        "coherent": len(issues) == 0
    }


def run_all_validations(content: str, key_vocabulary: list,
                        allowed_structures: list, restricted_structures: list,
                        cefr: str = "A1") -> dict:
    """Run all validations on a single worksheet."""
    return {
        "grammar": validate_grammar_constraint(content, allowed_structures, restricted_structures),
        "vocabulary": validate_key_vocabulary_usage(content, key_vocabulary),
        "answer_key": validate_answer_key(content),
        "gfpi_markers": validate_gfpi_markers(content),
        "cefr": validate_cefr_level(content, cefr),
    }


def print_validation_report(results: dict, pm_code: str):
    """Print a human-readable validation report."""
    print(f"\n{'='*60}")
    print(f"  VALIDATION REPORT — {pm_code}")
    print(f"{'='*60}")

    # Grammar
    g = results["grammar"]
    print(f"\n  Grammar Constraint: {'PASS' if g['valid'] else 'FAIL'}")
    for issue in g["issues"]:
        print(f"    ⚠️  {issue}")

    # Vocabulary
    v = results["vocabulary"]
    print(f"\n  Key Vocabulary: {v['coverage']} — {'OK' if v['adequate'] else 'LOW'}")
    if v["missing"]:
        print(f"    Missing: {', '.join(v['missing'][:5])}")

    # Answer Key
    ak = results["answer_key"]
    print(f"\n  Answer Key: {'OK' if ak['has_answer_key'] else 'MISSING'}")

    # GFPI Markers
    gf = results["gfpi_markers"]
    print(f"\n  GFPI Markers: {gf['markers_found']} found — {'OK' if gf['well_formed'] else 'ISSUES'}")
    for issue in gf["issues"]:
        print(f"    ⚠️  {issue}")

    # CEFR
    c = results["cefr"]
    print(f"\n  CEFR Level: {'OK' if c['appropriate'] else 'ISSUES'}")
    for issue in c["issues"]:
        print(f"    ⚠️  {issue}")

    print(f"\n{'='*60}")
