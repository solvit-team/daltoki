from abc import ABC, abstractmethod
from typing import List

from daltoki.domain.translation_vo import TranslationElement


class ITranslationRepository(ABC):
    @abstractmethod
    def get_translation_by_word(self, word: str) -> TranslationElement | None:
        pass

    @abstractmethod
    def get_all_translations(self) -> List[TranslationElement]:
        pass
