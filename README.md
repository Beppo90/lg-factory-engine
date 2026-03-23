# LG Factory Engine

ESP curriculum design pipeline for SENA bilingual programs. Generates GFPI-F-135 compliant materials using LLM APIs.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Dry run (no API calls)
python3 cli.py run --program maritime-g1 --profile balanced --dry-run

# Live run with Google Gemini
python3 cli.py run --program maritime-g1 --profile balanced --provider google

# Test with 1 unit (saves ~80% tokens)
python3 cli.py run --program maritime-g1 --profile balanced --provider google --units 1
```

## Configuration

Create a `.env` file:

```env
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIzaSy...
```

Get API keys:
- Anthropic: https://console.anthropic.com/settings/keys
- Google: https://aistudio.google.com/apikey

## Providers

| Provider | Flag | Model | Notes |
|----------|------|-------|-------|
| Anthropic | `--provider anthropic` | claude-sonnet-4-20250514 | Requires paid credits |
| Google | `--provider google` | gemini-2.5-flash | Free tier available |

## Web API

```bash
# Start the server
uvicorn api:app --host 0.0.0.0 --port 8000

# Or use Docker
docker compose up -d
```

Dashboard at `http://localhost:8000`

## Docker Deployment

```bash
# Build and run
docker compose up -d --build

# View logs
docker compose logs -f api

# Shell into container
docker compose exec api bash
```

## Project Structure

```
lg-factory-engine/
├── api.py                 # FastAPI backend
├── cli.py                 # Command line interface
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── requirements.txt
├── .env                   # API keys (not in repo)
├── config/
│   ├── programs/          # Program configs (maritime-g1.json)
│   ├── archetypes.json    # 52 archetypes + 3 profiles
│   └── pm-registry.json   # 20 PM definitions
├── engine/
│   ├── adapters/
│   │   ├── base.py        # LLMAdapter abstract class
│   │   ├── claude.py      # Anthropic adapter
│   │   └── google.py      # Google Gemini adapter
│   ├── orchestrator.py    # Pipeline execution
│   ├── pm_runner.py       # Single PM execution
│   ├── state.py           # File-based state management
│   ├── validator.py       # Coherence checks
│   ├── checkpoints.py     # Gate approval system
│   └── models.py          # Data models
├── frontend/
│   └── index.html         # Dashboard UI
├── prompts/               # PM prompt templates
└── output/                # Generated files (not in repo)
```

## CLI Reference

```bash
# List programs
python3 cli.py list

# Run pipeline
python3 cli.py run --program maritime-g1 --profile balanced --provider google

# Options
#   --program      Program ID (required)
#   --provider     anthropic | google
#   --profile      balanced | production | engagement | manual
#   --dry-run      No API calls
#   --units N      Run only first N units
#   --output DIR   Custom output directory

# Workspace management
python3 cli.py workspaces list
python3 cli.py workspaces create "Name"
python3 cli.py workspaces keys create ws_xxx "Key Name"
```

## License

Internal use only.
