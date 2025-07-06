import re

from daltoki.domain.enum import Usage
from daltoki.domain.translation_irepo import ITranslationRepository
from daltoki.domain.translation_vo import TranslationElement


class TranslationService:
    def __init__(self, translation_repo: ITranslationRepository):
        self.translation_repo = translation_repo

    def translate_text(self, paragraph: str) -> list[TranslationElement]:
        words = paragraph.split()
        translations = []

        for word in words:
            word_clean = word.strip()

            # Keep only lowercase English letters
            word_clean = re.sub(r"[^a-z]", "", word_clean.lower())
            translation = self.translation_repo.get_translation_by_word(word_clean)

            if not translation:
                translation = TranslationElement(
                    word=word_clean,
                    translations={},
                    usage=Usage.UNKNOWN,
                    sitelen_pona="__",
                )

            translations.append(translation)

        return translations
