"""
LG Factory Engine — Claude API Adapter
SPEC-003 §11: Claude implementation of LLMAdapter.
"""

import os
from pathlib import Path
from engine.adapters.base import LLMAdapter
from engine.models import LLMResponse, TokenUsage

DEFAULT_MODEL = "claude-sonnet-4-20250514"


def _load_dotenv():
    """Load .env file from project root if it exists."""
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, _, value = line.partition('=')
                os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_dotenv()


class ClaudeAdapter(LLMAdapter):
    """Anthropic Claude API adapter."""

    def __init__(self, api_key: str = None, default_model: str = DEFAULT_MODEL):
        try:
            import anthropic
        except ImportError:
            raise ImportError("pip install anthropic")

        self.client = anthropic.Anthropic(api_key=api_key or os.environ.get("ANTHROPIC_API_KEY"))
        self.default_model = default_model

    def generate(self, system: str, user: str, model: str = None, max_tokens: int = 4096) -> LLMResponse:
        response = self.client.messages.create(
            model=model or self.default_model,
            max_tokens=max_tokens,
            system=system,
            messages=[{"role": "user", "content": user}]
        )
        return LLMResponse(
            content=response.content[0].text,
            usage=TokenUsage(
                input_tokens=response.usage.input_tokens,
                output_tokens=response.usage.output_tokens,
                total_tokens=response.usage.input_tokens + response.usage.output_tokens,
            ),
            model=response.model,
            stop_reason=response.stop_reason,
        )

    def count_tokens(self, text: str) -> int:
        # Rough estimate: 1 token ≈ 4 characters
        return len(text) // 4
