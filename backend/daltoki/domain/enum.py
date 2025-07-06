from enum import Enum


class Language(str, Enum):
    ENGLISH = "en"
    FRENCH = "fr"
    GERMAN = "de"
    ESPERANTO = "eo"
    KOREAN = "ko"


class Usage(str, Enum):
    CORE = "core"
    COMMON = "common"
    OBSCURE = "obscure"
    UNKNOWN = "unknown"
