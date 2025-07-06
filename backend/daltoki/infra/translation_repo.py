from pathlib import Path
from typing import List

import yaml

from daltoki.domain.enum import Language, Usage
from daltoki.domain.translation_irepo import ITranslationRepository
from daltoki.domain.translation_vo import TranslationElement


class TranslationRepository(ITranslationRepository):
    def __init__(self, yaml_file_path: str = None):
        if yaml_file_path is None:
            current_dir = Path(__file__).parent
            yaml_file_path = current_dir / "translation_data.yaml"

        self.yaml_file_path = yaml_file_path
        self._translations: List[TranslationElement] = []
        self._load_translations()

    def _load_translations(self):
        try:
            with open(self.yaml_file_path, "r", encoding="utf-8") as file:
                data = yaml.safe_load(file)
                self._translations = [
                    TranslationElement(
                        word=item["word"],
                        translations={Language(k): v for k, v in item["translations"].items()},
                        usage=Usage(item["usage"]),
                        sitelen_pona=item["sitelen_pona"],
                    )
                    for item in data["words"]
                ]
        except FileNotFoundError:
            self._translations = []

    def get_translation_by_word(self, word: str) -> TranslationElement | None:
        for translation in self._translations:
            if translation.word == word:
                return translation
        return None

    def get_all_translations(self) -> List[TranslationElement]:
        return self._translations.copy()
