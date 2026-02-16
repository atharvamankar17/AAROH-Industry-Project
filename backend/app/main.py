from dotenv import load_dotenv
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.core.directory import router as music_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
MUSIC_FOLDER = BASE_DIR / "songs"
MUSIC_FOLDER.mkdir(exist_ok=True)

app.mount("/songs", StaticFiles(directory=str(MUSIC_FOLDER)), name="songs")

app.include_router(music_router, prefix="/api")

@app.get("/debug")
async def debug_routes():
    return [{"path": route.path} for route in app.routes]
