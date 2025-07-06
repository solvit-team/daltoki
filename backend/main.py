from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from daltoki.interface.translation_controller import router as translation_router

app = FastAPI(title="Daltoki Translation API")

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
