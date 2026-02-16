from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import os
from pathlib import Path
import json
import google.generativeai as genai
from werkzeug.utils import secure_filename
from urllib.parse import quote
import zipfile
import shutil
import uuid
import re
import random
import logging
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(tags=["music"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=GEMINI_API_KEY)

BASE_DIR = Path(__file__).resolve().parent.parent
MUSIC_FOLDER = BASE_DIR / "songs"
MUSIC_FOLDER.mkdir(exist_ok=True)

SYSTEM_PROMPT = """You are a music mood expert that recommends songs based purely on filenames.

Input:
- mood: one of "calm", "happy", "energetic", "sad", "angry", "anxious"
- requested_count: integer
- filenames: list of song filenames

Rules:
- Return ONLY clean JSON
- Return EXACTLY requested_count songs
- Format: {"mood": "...", "recommendations": [{"filename": "...", "reason": "..."}]}"""

MODEL_NAME = "gemini-2.5-flash"
DEFAULT_TEMPERATURE = 0.4
MAX_FILENAMES_TO_SEND = 80

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/recommend")
async def get_recommendations(
    mood: str = Form(...),
    count: int = Form(8),
    temperature: float = Form(DEFAULT_TEMPERATURE)
):
    if not mood:
        raise HTTPException(status_code=400, detail="Mood is required")

    requested_count = max(1, min(30, count))
    audio_files = list(MUSIC_FOLDER.glob("*.mp3"))
    
    if not audio_files:
        raise HTTPException(status_code=400, detail="No songs in library yet.")

    filenames = [p.name for p in audio_files]
    if len(filenames) > MAX_FILENAMES_TO_SEND:
        filenames = random.sample(filenames, MAX_FILENAMES_TO_SEND)

    filenames_text = "\n".join(f"- {name}" for name in filenames)
    user_prompt = f"mood: {mood}\nrequested_count: {requested_count}\nFilenames:\n{filenames_text}"

    try:
        model = genai.GenerativeModel(
            model_name=MODEL_NAME,
            generation_config={
                "temperature": temperature,
                "response_mime_type": "application/json"
            },
            system_instruction=SYSTEM_PROMPT
        )

        response = model.generate_content(user_prompt)
        raw = response.text.strip()
        raw = re.sub(r'^\s*```json?\s*|\s*```$', '', raw, flags=re.IGNORECASE | re.MULTILINE).strip()

        parsed = json.loads(raw)
        recommendations = parsed.get("recommendations", [])

        for rec in recommendations:
            if "filename" in rec:
                rec["file_url"] = f"/songs/{quote(rec['filename'])}"

        return {
            "success": True,
            "mood": mood,
            "recommendations": recommendations
        }

    except Exception as e:
        logger.error(f"Gemini error: {str(e)}")
        fallback = [{"filename": f.name, "reason": "AI unavailable - random selection", "file_url": f"/songs/{quote(f.name)}"} 
                    for f in audio_files[:requested_count]]
        return {"success": False, "recommendations": fallback}

@router.post("/upload-zip")
async def upload_zip(zip_file: UploadFile = File(...)): 
    if not zip_file.filename.lower().endswith(".zip"):
        raise HTTPException(status_code=400, detail="File must be .zip")

    temp_zip = MUSIC_FOLDER / f"temp_{uuid.uuid4().hex[:10]}.zip"

    try:
        with temp_zip.open("wb") as buffer:
            shutil.copyfileobj(zip_file.file, buffer)

        added = []
        with zipfile.ZipFile(temp_zip, 'r') as zf:
            for member in zf.namelist():
                if member.lower().endswith(".mp3"):
                    clean_name = secure_filename(Path(member).name)
                    target = MUSIC_FOLDER / clean_name

                    zf.extract(member, MUSIC_FOLDER)
                    extracted_file = MUSIC_FOLDER / member
                    if extracted_file.exists():
                        if extracted_file != target:
                            shutil.move(str(extracted_file), str(target))
                        added.append(clean_name)

        return {"success": True, "added": added}

    except Exception as e:
        logger.error(f"Zip processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Zip processing failed: {str(e)}")
    finally:
        if temp_zip.exists():
            temp_zip.unlink()

@router.post("/upload-song")
async def upload_song(song: UploadFile = File(...)):
    if not song.filename.lower().endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only .mp3 allowed")

    filename = secure_filename(song.filename)
    destination = MUSIC_FOLDER / filename
    
    with destination.open("wb") as buffer:
        shutil.copyfileobj(song.file, buffer)

    return {"success": True, "filename": filename, "file_url": f"/songs/{quote(filename)}"}
