# Prahar Music Zen

Prahar Music Zen is a time-aware, mood-assisted music recommendation system inspired by **Indian classical Prahar theory** and powered by **lightweight Gen-AI**.  
It recommends **Spotify-playable songs** based on the time of day, optional user mood, selected genre, and language.

---

## Overview

Indian classical music associates specific **Raagas** with different times of the day (Prahar).  
This project combines:

- Rule-based Prahar → Raaga mapping (deterministic and explainable)
- Gen-AI–based song recommendation
- A modern React-based frontend

The system ensures **musical correctness first**, using AI only for creative song discovery.

---

## Features

- Automatic Prahar detection using IST timestamp
- Optional mood input (can be skipped)
- Deterministic Raaga selection (no AI hallucination)
- Gen-AI powered song recommendations
- Spotify-compatible search queries
- Clean, modern UI
- Modular backend architecture

---

## Tech Stack

### Frontend
- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

### Backend
- FastAPI
- Python
- Rule-based music logic
- Groq Gen-AI (LLaMA 3 lightweight models)

---

## Project Structure

# Prahar Music Zen

Prahar Music Zen is a time-aware, mood-assisted music recommendation system inspired by **Indian classical Prahar theory** and powered by **lightweight Gen-AI**.  
It recommends **Spotify-playable songs** based on the time of day, optional user mood, selected genre, and language.

---

## Overview

Indian classical music associates specific **Raagas** with different times of the day (Prahar).  
This project combines:

- Rule-based Prahar → Raaga mapping (deterministic and explainable)
- Gen-AI–based song recommendation
- A modern React-based frontend

The system ensures **musical correctness first**, using AI only for creative song discovery.

---

## Features

- Automatic Prahar detection using IST timestamp
- Optional mood input (can be skipped)
- Deterministic Raaga selection (no AI hallucination)
- Gen-AI powered song recommendations
- Spotify-compatible search queries
- Clean, modern UI
- Modular backend architecture

---

## Tech Stack

### Frontend
- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

### Backend
- FastAPI
- Python
- Rule-based music logic
- Groq Gen-AI (LLaMA 3 lightweight models)

---

## Project Structure
```bash
prahar-music-zen/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── app/
│ │ ├── api/
│ │ ├── core/
│ │ ├── data/
│ │ ├── ai/
│ │ └── schemas/
│ ├── requirements.txt
│ └── .env.example
│
├── backend-api-contract.md
└── README.md
```

---

## Architecture Flow

1. Frontend sends:
   - Timestamp
   - Optional mood
   - Selected genre
   - Selected language

2. Backend:
   - Determines Prahar from timestamp
   - Maps mood → Rasa (if provided)
   - Selects Raaga using rule-based logic

3. Gen-AI:
   - Receives Raaga, genre, language
   - Returns Spotify-playable song recommendations

4. Frontend:
   - Displays Raaga
   - Renders recommended songs

---

## Getting Started (Local Setup)

### Prerequisites

- Node.js & npm  
  Install using nvm: https://github.com/nvm-sh/nvm
- Python 3.10 or higher

---

### Clone Repository
```bash
git clone <YOUR_GIT_URL>
cd prahar-music-zen
```
---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```bash
http://localhost:8080
```
---

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```
## Environment Variables

```bash
#Create a .env file using the example:
GROQ_API_KEY=your_api_key_here

#Example file provided:
backend/.env.example

#Run Backend
uvicorn app.main:app --reload

#Backend runs on:
http://127.0.0.1:8000

#Swagger documentation:
http://127.0.0.1:8000/docs
```
---
### GET /api/ai-test

Temporary endpoint to verify Gen-AI output independently.

---

### Architecture Overview

Frontend captures:
- Current IST time
- User mood (optional)
- Genre & language preferences

Backend:
- Computes Prahar from timestamp
- Maps mood → rasa
- Selects raaga using rule-based logic

Gen-AI:
- Receives raaga, genre, language
- Returns Spotify-playable songs

Frontend:
- Displays raaga, prahar, and recommended songs

---

#### Design Decisions

- Raaga selection is rule-based, not AI-generated
- Gen-AI is used only for song discovery
- No medical, healing, or therapeutic claims
- Strict JSON output for reliability
- Lightweight, fast, and explainable system
- Product-first architecture
---

### Security & Git Hygiene

Sensitive files are ignored using .gitignore.

Never commit:
- .env
- API keys
- Cache or build artifacts
  
---

### Future Enhancements

- Spotify Playback SDK integration
- Playlist generation
- User authentication (Clerk)
- Listening history
- Personalized analytics
  
---
### Contribution

- Pull requests and issues are welcome.
- Please keep changes modular and well-documented.
  
---
### License

This project is for educational and experimental use only.

---
