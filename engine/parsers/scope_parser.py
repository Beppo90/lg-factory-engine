import json
import logging
from engine.models import UnitSpec, VocabTerm
from engine.adapters.google import GoogleAdapter

logger = logging.getLogger("lg_factory")

def build_extraction_prompt(pm_1_2_content: str) -> str:
    return f"""
    You are an expert NLP parser. You must parse the following Markdown curriculum design into a precise JSON structure.
    
    Extract the Unit Name, Theme, Grammar Targets, and exactly 20 Vocabulary Terms from this Scope & Sequence document.
    
    Output strictly in this JSON format (NO extra text, NO markdown code blocks, ONLY valid JSON):
    {{
        "number": 1,
        "name": "Extracted Unit Name (e.g. The Hardware Specialist)",
        "theme": "Extracted Content Core / Theme summary",
        "grammar_targets": ["Grammar Rule 1", "Grammar Rule 2"],
        "vocabulary": [
            {{ "term": "English word", "spanish": "Spanish translation", "definition": "Brief definition or syntactic category" }}
        ]
    }}
    
    If the document provides fewer terms, fill the remainder with logical vocabulary related to the theme to reach exactly 20 terms.
    If it provides more than 20, keep only the top 20 most relevant.
    
    DOCUMENT CONTENT:
    \"\"\"
    {pm_1_2_content[:6000]}
    \"\"\"
    """

def extract_units_from_scope(worksheet_markdown: str) -> list[UnitSpec]:
    """
    Parses the PM-1.2 Markdown output into a structured UnitSpec list.
    """
    prompt = build_extraction_prompt(worksheet_markdown)
    adapter = GoogleAdapter()
    
    # We execute this LLM call internally to bridge Phase 1 to Phase 2
    response = adapter.generate(
        system="You are an automated curriculum parsing engine. You output JSON strictly.",
        user=prompt,
        max_tokens=2048
    )
    
    content = response.content.strip()
    
    # Cleanup Markdown fences if the LLM hallucinated them
    if content.startswith("```json"):
        content = content.replace("```json", "", 1)
    if content.endswith("```"):
        content = content[:-3]
    content = content.strip()
    
    try:
        data = json.loads(content)
        
        vocab = []
        for v in data.get("vocabulary", [])[:20]:
            vocab.append(VocabTerm(
                term=v.get("term", "N/A"),
                spanish=v.get("spanish", "N/A"),
                definition=v.get("definition", "N/A")
            ))
            
        unit = UnitSpec(
            number=data.get("number", 1),
            name=data.get("name", "Generated Unit"),
            theme=data.get("theme", "Generated Theme"),
            grammar_targets=data.get("grammar_targets", []),
            vocabulary=vocab
        )
        return [unit]
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse LLM structured extraction. Content:\n{content}")
        raise ValueError(f"Failed to bridge Phase 1 to Phase 2 JSON: {str(e)}")
