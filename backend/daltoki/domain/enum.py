from enum import Enum


class Language(str, Enum):
    KOREAN = "korean"
    ENGLISH = "english"
    CHINESE = "chinese"
    JAPANESE = "japanese"


class Usage(str, Enum):
    CORE = "core"
    COMMON = "common"
    OBSCURE = "obscure"
    UNKNOWN = "unknown"
