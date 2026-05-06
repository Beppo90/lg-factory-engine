#!/usr/bin/env bash
# ────────────────────────────────────────────────────────────────────────────
# validate-pm-0-context.sh — Focused validator for pm-0-context.json output.
#
# Validates runs/[RUN-ID]/pm-0-context.json against the canonical
# v4/schemas/pm-0-context.schema.json (v3.3.1 paradigm shift · 2026-05-05).
#
# Usage:
#   bash validate-pm-0-context.sh <RUN-ID> [<FILE-OVERRIDE>]
#
# Examples:
#   bash validate-pm-0-context.sh IMARPOR-CC-2026-04-30-V2
#   bash validate-pm-0-context.sh INFRATI-2026-05-04
#   bash validate-pm-0-context.sh INFRATI-2026-05-04 pm-0-context-G3.json
#
# Exit codes:
#   0 = valid · 1 = invalid · 2 = setup error
#
# Schema canon: v3.4 (REGLAS 1-14.7 + Anexos C+D INFRATI G3+G2 + multi-comp + CIERRE PROGRAMA + mid-program awareness)
# Coordinated with CC F2.8 schema drift CI Hito 4.
# ────────────────────────────────────────────────────────────────────────────

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

if [ $# -lt 1 ]; then
  echo -e "${RED}${BOLD}Error:${RESET} missing <RUN-ID> argument"
  echo ""
  echo "Usage:   bash validate-pm-0-context.sh <RUN-ID> [<FILE-OVERRIDE>]"
  echo ""
  echo "Examples:"
  echo "  bash validate-pm-0-context.sh IMARPOR-CC-2026-04-30-V2"
  echo "  bash validate-pm-0-context.sh INFRATI-2026-05-04 pm-0-context-G3.json"
  exit 2
fi

RUN_ID="$1"
FILE_OVERRIDE="${2:-pm-0-context.json}"

# Resolve repo root from script location (this file lives in v4/scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SCHEMA_FILE="$REPO_ROOT/v4/schemas/pm-0-context.schema.json"
TARGET_FILE="$REPO_ROOT/runs/$RUN_ID/$FILE_OVERRIDE"

# Sanity checks
if [ ! -f "$SCHEMA_FILE" ]; then
  echo -e "${RED}Error:${RESET} schema not found at $SCHEMA_FILE"
  exit 2
fi

if [ ! -d "$REPO_ROOT/runs/$RUN_ID" ]; then
  echo -e "${RED}Error:${RESET} run directory not found: $REPO_ROOT/runs/$RUN_ID"
  echo ""
  echo "Available runs:"
  ls -1 "$REPO_ROOT/runs/" 2>/dev/null | head -20
  exit 2
fi

# Ensure ajv is installed (one-time setup)
if ! (cd "$REPO_ROOT/v4" && node -e "require('ajv/dist/2020')" 2>/dev/null); then
  echo -e "${YELLOW}Setup:${RESET} installing ajv + ajv-formats in v4/ (one-time)..."
  cd "$REPO_ROOT/v4"
  if [ ! -f "package.json" ]; then
    npm init -y > /dev/null 2>&1
  fi
  npm install ajv@^8 ajv-formats@^3 --silent 2>&1 | tail -3
  echo ""
fi

echo ""
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}  PM-0 Context · Schema Validator (v3.3.1 canon)${RESET}"
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${DIM}  Run:    ${RESET}${RUN_ID}"
echo -e "${DIM}  File:   ${RESET}runs/${RUN_ID}/${FILE_OVERRIDE}"
echo -e "${DIM}  Schema: ${RESET}v4/schemas/pm-0-context.schema.json"
echo ""

if [ ! -f "$TARGET_FILE" ]; then
  echo -e "${RED}✗ MISSING file: ${RESET}${TARGET_FILE}"
  echo ""
  echo "Available pm-0-context*.json in run dir:"
  ls -1 "$REPO_ROOT/runs/$RUN_ID/" 2>/dev/null | grep -E '^pm-0-context.*\.json$' || echo "  (none)"
  exit 1
fi

# Run the validator inline (no separate js helper needed for single-file case)
cd "$REPO_ROOT/v4"
node -e '
const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const fs = require("fs");

const schemaPath = process.argv[1];
const targetPath = process.argv[2];

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const data = JSON.parse(fs.readFileSync(targetPath, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

let validate;
try {
  validate = ajv.compile(schema);
} catch (err) {
  console.error("\x1b[31m✗ Schema compile error:\x1b[0m", err.message);
  process.exit(2);
}

const valid = validate(data);

if (valid) {
  console.log("\x1b[32m\x1b[1m✓ VALID\x1b[0m · pm-0-context.json conforms to schema v3.3.1");
  console.log("");
  // Quick canon summary
  const mode = data._competencias_tecnicas_modo || "(no modo declared)";
  const n = data._n_competencias_tecnicas || 1;
  const nGuides = data.programa?.total_guias || data._raps_metadata?.guide_total || 1;
  const cierre = !!data.final_mission?._anclaje_matriz?.cierre_programa;
  console.log("\x1b[2m  Canon summary:\x1b[0m");
  console.log("\x1b[2m    schema_version:\x1b[0m", data.schema_version);
  console.log("\x1b[2m    pm_version:    \x1b[0m", data.pm_version);
  console.log("\x1b[2m    competencias:  \x1b[0m", `${mode} (n=${n})`);
  console.log("\x1b[2m    guías programa:\x1b[0m", nGuides);
  console.log("\x1b[2m    CIERRE flag:   \x1b[0m", cierre ? "true" : "false");
  process.exit(0);
} else {
  console.log("\x1b[31m\x1b[1m✗ INVALID\x1b[0m · " + validate.errors.length + " error(s):");
  console.log("");
  for (const err of validate.errors) {
    const loc = err.instancePath || "(root)";
    console.log("  \x1b[31m•\x1b[0m \x1b[1m" + loc + "\x1b[0m " + err.message);
    if (err.params && Object.keys(err.params).length > 0) {
      console.log("    \x1b[2mparams: " + JSON.stringify(err.params) + "\x1b[0m");
    }
  }
  console.log("");
  console.log("\x1b[33m  → Schema is canon-strict v3.3.1. Pre-canon fixtures (v3.1, v1.x) will FAIL by design.\x1b[0m");
  console.log("\x1b[33m    Drift expected · NOT a master-prompt bug · regenerate via PM-0 v3.3.1 to align.\x1b[0m");
  process.exit(1);
}
' "$SCHEMA_FILE" "$TARGET_FILE"
