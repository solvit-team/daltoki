from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from daltoki.infra.translation_repo import TranslationRepository
from daltoki.interface.translation_controller import router as translation_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    app.state.translation_repo = TranslationRepository()
    yield
    # Shutdown
    pass


app = FastAPI(title="Daltoki Translation API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translation_router)


def main():
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
