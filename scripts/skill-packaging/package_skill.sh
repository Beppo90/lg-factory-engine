#!/usr/bin/env bash
# package_skill.sh — Empaqueta una skill en un archivo .skill (zip)
#
# Usage:
#   bash package_skill.sh <skill-name>            # empaqueta 1 skill
#   bash package_skill.sh --all                    # empaqueta los 3 (fpi-sena-fase1/2/3)
#
# Excluye: __pycache__/ · *.pyc · *.bak · *.pre-v*-bak · .DS_Store · node_modules/
# Output: dist/<skill-name>.skill (zip · root debe contener SKILL.md)
# Validación: SKILL.md existe at root + size razonable

set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'; CYAN='\033[0;36m'; BOLD='\033[1m'; DIM='\033[2m'; RESET='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SKILLS_DIR="$REPO_ROOT/.claude/skills"
DIST_DIR="$REPO_ROOT/dist/skills"
mkdir -p "$DIST_DIR"

package_one() {
    local SKILL_NAME="$1"
    local SRC="$SKILLS_DIR/$SKILL_NAME"
    local OUT="$DIST_DIR/${SKILL_NAME}.skill"

    echo -e "${BOLD}${CYAN}━━━ $SKILL_NAME ━━━${RESET}"

    if [ ! -d "$SRC" ]; then
        echo -e "${RED}✗ NOT FOUND: $SRC${RESET}"; return 1
    fi
    if [ ! -f "$SRC/SKILL.md" ]; then
        echo -e "${RED}✗ Missing SKILL.md at root${RESET}"; return 1
    fi

    # Remove existing
    rm -f "$OUT"

    # Build zip · exclude noise
    cd "$SKILLS_DIR"
    zip -rq "$OUT" "$SKILL_NAME" \
        -x "*/__pycache__/*" "*.pyc" "*.bak" "*.pre-v*-bak" \
        -x "*.DS_Store" "*/node_modules/*" "*.legacy-*" \
        -x "*~" "*.swp"

    # Validate output
    local SIZE=$(stat -c%s "$OUT" 2>/dev/null || stat -f%z "$OUT")
    local FILES=$(unzip -l "$OUT" | tail -1 | awk '{print $2}')

    echo -e "${GREEN}✓ packaged${RESET} · $OUT"
    echo -e "${DIM}  size: $SIZE bytes · files: $FILES${RESET}"

    # Quick sanity: SKILL.md present in zip root
    if unzip -l "$OUT" | grep -q "$SKILL_NAME/SKILL.md"; then
        echo -e "${DIM}  SKILL.md at root: ✓${RESET}"
    else
        echo -e "${RED}  ✗ SKILL.md not at expected root path${RESET}"; return 1
    fi
    echo
}

if [ "$1" = "--all" ]; then
    for s in fpi-sena-fase1 fpi-sena-fase2 fpi-sena-fase3; do
        package_one "$s"
    done
    echo -e "${BOLD}${GREEN}✓ 3 skills packaged in $DIST_DIR${RESET}"
elif [ -n "$1" ]; then
    package_one "$1"
else
    echo "Usage: bash package_skill.sh <skill-name>|--all"
    echo "Available: $(ls $SKILLS_DIR | tr '\n' ' ')"
    exit 2
fi
