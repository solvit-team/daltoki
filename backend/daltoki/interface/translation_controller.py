from typing import Dict, List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing_extensions import Annotated

from daltoki.application.translation_service import TranslationService
from daltoki.domain.enum import Language, Usage
from daltoki.infra.translation_repo import TranslationRepository


class TranslationRequest(BaseModel):
    text: str


class WordTranslationResponse(BaseModel):
    word: str
    usage: Usage
    sitelen_pona: str
    multilingual_translations: Dict[Language, str]
    part_of_speech: Optional[str] = None


class TranslationResponse(BaseModel):
    original_text: str
    translations: List[WordTranslationResponse]


def get_translation_service() -> TranslationService:
    translation_repo = TranslationRepository()
    return TranslationService(translation_repo)


router = APIRouter(prefix="/translations", tags=["translations"])


@router.post("/translate", response_model=TranslationResponse)
async def translate_text(
    request: TranslationRequest,
    translation_service: Annotated[TranslationService, Depends(get_translation_service)],
):
    translations = translation_service.translate_text(request.text)
    return TranslationResponse(
        original_text=request.text,
        translations=[
            WordTranslationResponse(
                word=translation.word,
                part_of_speech=translation.part_of_speech,
                usage=translation.usage,
                sitelen_pona=translation.sitelen_pona,
                multilingual_translations=translation.translations,
            )
            for translation in translations
        ],
    )
