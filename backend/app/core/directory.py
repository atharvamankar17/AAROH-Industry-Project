from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pathlib import Path
import json
from dotenv import load_dotenv
import google.generativeai as genai
from werkzeug.utils import secure_filename
from urllib.parse import quote
import zipfile
import shutil
import uuid

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=GEMINI_API_KEY)

MUSIC_FOLDER = Path("songs")
MUSIC_FOLDER.mkdir(exist_ok=True)

SYSTEM_PROMPT = """You are a music mood expert that recommends songs based purely on filenames.

Input:
- mood: one of "calm", "happy", "energetic", "sad", "angry", "anxious" (or similar vibe words)
- requested_count: integer (how many songs the user wants)
- filenames: list of song flienames

Rules:
- Judge mood mostly from title words, genre hints in name, known artist vibe
- You may use general knowledge of famous songs when filename is clear
- Return EXACTLY requested_count songs if possible, or all remaining if fewer
- Order: strongest match → weakest good match
- Return ONLY clean JSON — nothing else:

{
  "mood": "happy",
  "requested_count": 10,
  "returned_count": 8,
  "recommendations": [
    {
      "filename": "Pharrell Williams - Happy.mp3",
      "reason": "Iconic upbeat, feel-good anthem with 'happy' in the title"
    },
    ...
  ]
}

Do not add any text outside the JSON object.
Do not explain. Do not add markdown. Output valid JSON only."""

MODEL_NAME = "gemini-2.5-flash"  
DEFAULT_TEMPERATURE = 0.4
MAX_TOKENS = 4096

@app.route("/api/recommend", methods=["POST"])
def recommend():
    mood = request.form.get("mood")
    if not mood:
        return jsonify({"error": "Mood is required"}), 400

    try:
        requested_count = max(1, min(100, int(request.form.get("count", 8))))
    except:
        requested_count = 8

    try:
        temperature = float(request.form.get("temperature", DEFAULT_TEMPERATURE))
        temperature = max(0.0, min(1.0, temperature))
        if temperature < 0.05:
            temperature = 0.05
    except:
        temperature = DEFAULT_TEMPERATURE

    audio_files = []
    for ext in [".mp3"]:
        audio_files.extend(MUSIC_FOLDER.glob(f"*{ext}"))

    if not audio_files:
        return jsonify({"error": "No songs in library yet. Upload some first."}), 400

    filenames = [p.name for p in audio_files]

    filenames_text = "\n".join(f"- {name}" for name in filenames)
    user_prompt = f"""mood: {mood}
requested_count: {requested_count}

Filenames:
{filenames_text}"""

    try:
        model = genai.GenerativeModel(
            model_name=MODEL_NAME,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": MAX_TOKENS,
                "response_mime_type": "application/json"
            },
            system_instruction=SYSTEM_PROMPT
        )

        response = model.generate_content(user_prompt)
        raw = response.text.strip()

        if raw.startswith("```json"):
            raw = raw[7:]
        if raw.endswith("```"):
            raw = raw[:-3]
        raw = raw.replace("```json", "").replace("```", "").strip()

        start = raw.find('{')
        end = raw.rfind('}') + 1
        if start >= 0 and end > start:
            raw = raw[start:end]

        parsed = json.loads(raw)
        recommendations = parsed.get("recommendations", [])

        for rec in recommendations:
            if "filename" in rec:
                rec["file_url"] = f"/songs/{quote(rec['filename'])}"

        if not recommendations and filenames:
            recommendations = [
                {
                    "filename": fname,
                    "reason": "Fallback selection (Gemini did not return strong matches)",
                    "file_url": f"/songs/{quote(fname)}"
                }
                for fname in filenames[:requested_count]
            ]

    except json.JSONDecodeError as parse_err:
        print("[DEBUG] JSON parse failed:", parse_err)
        print("[DEBUG] Raw Gemini output was:")
        print(raw)
        return jsonify({
            "error": "Could not parse Gemini response"
        }), 500
    except Exception as e:
        print("[DEBUG] Gemini / general error:", str(e))
        return jsonify({"error": f"Error: {str(e)}"}), 500

    return jsonify({
        "success": True,
        "mood": mood,
        "count_requested": requested_count,
        "count_returned": len(recommendations),
        "temperature_used": temperature,
        "recommendations": recommendations
    })


@app.route("/api/upload-song", methods=["POST"])
def upload_song():
    if "song" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["song"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    allowed = {".mp3"}
    if not any(file.filename.lower().endswith(ext) for ext in allowed):
        return jsonify({"error": "Only audio files allowed"}), 400

    filename = secure_filename(file.filename)
    destination = MUSIC_FOLDER / filename

    if destination.exists():
        return jsonify({"error": "File with this name already exists"}), 409

    file.save(destination)
    return jsonify({
        "success": True,
        "filename": filename,
        "file_url": f"/songs/{quote(filename)}"
    })


@app.route("/api/upload-zip", methods=["POST"])
def upload_zip():
    if "zipfile" not in request.files:
        return jsonify({"error": "No zip file"}), 400

    zip_file = request.files["zipfile"]
    if not zip_file.filename.lower().endswith(".zip"):
        return jsonify({"error": "File must be .zip"}), 400

    temp_zip = MUSIC_FOLDER / f"temp_{uuid.uuid4().hex[:10]}.zip"
    zip_file.save(temp_zip)

    try:
        added = []
        with zipfile.ZipFile(temp_zip, 'r') as zf:
            for member in zf.namelist():
                if member.lower().endswith((".mp3")):
                    clean_name = secure_filename(Path(member).name)
                    target = MUSIC_FOLDER / clean_name
                    if not target.exists():
                        zf.extract(member, MUSIC_FOLDER)
                        extracted = MUSIC_FOLDER / member
                        if extracted.exists() and extracted != target:
                            shutil.move(extracted, target)
                        added.append(clean_name)

        temp_zip.unlink(missing_ok=True)
        return jsonify({"success": True, "added": added})

    except Exception as e:
        temp_zip.unlink(missing_ok=True)
        return jsonify({"error": f"Zip processing failed: {str(e)}"}), 500


@app.route("/songs/<path:filename>")
def serve_songs(filename):
    try:
        return send_from_directory(MUSIC_FOLDER, filename)
    except:
        return jsonify({"error": "File not found"}), 404


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


if __name__ == "__main__":
    print("Server running at: http://127.0.0.1:5000")
    app.run(debug=True, port=5000, threaded=True)
