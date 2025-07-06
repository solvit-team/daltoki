from dataclasses import dataclass
from typing import Dict, Optional

from daltoki.domain.enum import Language, Usage


@dataclass(frozen=True)
class TranslationElement:
    word: str
    translations: Dict[Language, str]
    usage: Usage
    sitelen_pona: str
    part_of_speech: Optional[str] = None

    def get_translation(self, language: Language) -> str:
        return self.translations.get(language, self.word)
