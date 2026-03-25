"""
LG Factory Engine — LLM Adapter Base
SPEC-003 §11: Abstract LLM adapter for provider-agnostic design.
"""

from abc import ABC, abstractmethod
from engine.models import LLMResponse


class LLMAdapter(ABC):
    """Abstract base for LLM API adapters."""

    @abstractmethod
    def generate(self, system: str, user: str, model: str, max_tokens: int) -> LLMResponse:
        """Send prompt to LLM and return structured response."""
        ...

    @abstractmethod
    def count_tokens(self, text: str) -> int:
        """Estimate token count for a string."""
        ...
