"""
LG Factory Engine — Google Gemini API Adapter
SPEC-003 §11: Gemini implementation of LLMAdapter.
"""

import os
from engine.adapters.base import LLMAdapter
from engine.models import LLMResponse, TokenUsage

DEFAULT_MODEL = "gemini-2.5-flash"


def _load_dotenv():
    """Load .env file from project root if it exists."""
    from pathlib import Path
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, _, value = line.partition('=')
                os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_dotenv()


class GoogleAdapter(LLMAdapter):
    """Google Gemini API adapter."""

    def __init__(self, api_key: str = None, default_model: str = DEFAULT_MODEL):
        try:
            import google.generativeai as genai
        except ImportError:
            raise ImportError("pip install google-generativeai")

        self.genai = genai
        genai.configure(api_key=api_key or os.environ.get("GOOGLE_API_KEY"))
        self.default_model = default_model

    def generate(self, system: str, user: str, model: str = None, max_tokens: int = 4096) -> LLMResponse:
        model_instance = self.genai.GenerativeModel(
            model_name=model or self.default_model,
            system_instruction=system,
            generation_config=self.genai.GenerationConfig(
                max_output_tokens=max_tokens,
            ),
        )
        response = model_instance.generate_content(user)

        # Gemini doesn't always return usage metadata
        usage = response.usage_metadata
        input_tokens = usage.prompt_token_count if usage else 0
        output_tokens = usage.candidates_token_count if usage else 0

        return LLMResponse(
            content=response.text,
            usage=TokenUsage(
                input_tokens=input_tokens,
                output_tokens=output_tokens,
                total_tokens=input_tokens + output_tokens,
            ),
            model=model or self.default_model,
            stop_reason=str(getattr(response.candidates[0], "finish_reason", "STOP")) if response.candidates else "UNKNOWN",
        )

    def count_tokens(self, text: str) -> int:
        return len(text) // 4
