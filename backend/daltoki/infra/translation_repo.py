from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
import yaml

from daltoki.domain.enum import Language, Usage
from daltoki.domain.translation_irepo import ITranslationRepository
from daltoki.domain.translation_vo import TranslationElement


class DummyTranslationRepository(ITranslationRepository):
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


class TranslationRepository(ITranslationRepository):
    def __init__(self):
        self.api_url = "https://api.linku.la/v1/words"
        self._cache: Optional[Dict[str, Any]] = None

    def _fetch_all_words(self) -> Dict[str, Any]:
        try:
            response = requests.get(self.api_url)
            response.raise_for_status()
            self._cache = response.json()
            return self._cache
        except requests.RequestException:
            return {}

    def _convert_to_translation_element(self, word: str, word_data: Dict[str, Any]) -> TranslationElement:
        translations = {}

        if "translations" in word_data:
            api_translations = word_data["translations"]

            # Get English definition as fallback
            en_definition = api_translations.get("en", {}).get("definition", "") if "en" in api_translations else ""

            # Iterate over supported languages
            language_mapping = {
                "en": Language.ENGLISH,
                "fr": Language.FRENCH,
                "de": Language.GERMAN,
                "eo": Language.ESPERANTO,
                "ko": Language.KOREAN,
            }

            for lang_code, lang_enum in language_mapping.items():
                if lang_code in api_translations:
                    definition = api_translations[lang_code].get("definition", "")
                    if definition:
                        translations[lang_enum] = definition
                    else:
                        translations[lang_enum] = en_definition
                else:
                    translations[lang_enum] = en_definition

        usage = word_data.get("usage_category")
        if usage not in Usage:
            usage = Usage.OBSCURE

        sitelen_pona = word_data["representations"]["ucsur"]

        print(usage, translations)
        return TranslationElement(
            word=word,
            translations=translations,
            usage=usage,
            sitelen_pona=sitelen_pona,
        )

    def get_translation_by_word(self, word: str) -> TranslationElement | None:
        if self._cache is None:
            self._fetch_all_words()

        word_data = self._cache.get(word.lower()) if self._cache else None
        if word_data:
            return self._convert_to_translation_element(word, word_data)
        return None

    def get_all_translations(self) -> List[TranslationElement]:
        if self._cache is None:
            self._fetch_all_words()

        if not self._cache:
            return []

        return [self._convert_to_translation_element(word, word_data) for word, word_data in self._cache.items()]
