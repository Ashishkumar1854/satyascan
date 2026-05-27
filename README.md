# SatyaScan — AI Fact-Checking Agent

SatyaScan is an AI-powered web application that automatically fact-checks PDF documents using LLMs and live web verification.

Upload any PDF, and the system:
- Extracts factual claims
- Searches live web sources
- Verifies each claim
- Flags them as:
  - Verified
  - Inaccurate
  - False

The final report includes confidence scores, corrected facts, and evidence sources.

---

## Live Demo

🚀 Live App: https://satyascan-beta.vercel.app

📹 Demo Video: https://drive.google.com/file/d/1dG_kXYxsk-X9OEQO79JVPm1XDJag07vq/view?usp=drivesdk

💻 GitHub Repository:
https://github.com/Ashishkumar1854/satyascan

---

## Problem Statement

Marketing reports, research PDFs, and business documents often contain:
- Fake statistics
- Outdated numbers
- Misleading claims
- Incorrect growth data

Manually verifying them takes time.

SatyaScan automates this process using AI + live web search.

---
<img width="1440" height="900" alt="Screenshot 2026-05-27 at 11 07 55" src="https://github.com/user-attachments/assets/6a969126-88f7-4197-89a8-af6ca63a1eed" />
<img width="1440" height="900" alt="Screenshot 2026-05-27 at 11 08 02" src="https://github.com/user-attachments/assets/1fc37617-6779-4eee-9edf-197d1bb8da40" />
<img width="1440" height="900" alt="Screenshot 2026-05-27 at 11 08 11" src="https://github.com/user-attachments/assets/11fc3488-7e3f-45e9-86d3-0e7ddc2a9638" />
<img width="1440" height="900" alt="Screenshot 2026-05-27 at 11 08 18" src="https://github.com/user-attachments/assets/76164c45-f347-4272-9f81-ca04cabd6922" />
<img width="1440" height="900" alt="Screenshot 2026-05-27 at 11 07 40" src="https://github.com/user-attachments/assets/099f6bab-8709-44a2-ac85-b400dd521e3c" />

# How It Works

```text
PDF Upload
   ↓
React Frontend
   ↓
Node.js Backend
   ↓
Python AI Service
   ↓
Gemini extracts factual claims
   ↓
Tavily searches live web evidence
   ↓
Gemini verifies each claim
   ↓
Fact-check report generated
```

---

# Features

- PDF upload support
- AI-powered claim extraction
- Live web verification
- Fact classification system
- Trust score generation
- Confidence scoring
- Source-based verification
- Modern responsive UI

---

# Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| AI Service | Python + FastAPI |
| Database | MongoDB Atlas |
| AI Model | Gemini 1.5 Flash |
| Search Engine | Tavily API |
| Deployment | Vercel + Render |

---

# Project Architecture

```text
Frontend (React)
        ↓
Backend API (Node.js)
        ↓
AI Service (FastAPI)
        ↓
Gemini + Tavily
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/Ashishkumar1854/satyascan.git

cd satyascan
```

---

## 2. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:3001
```

---

## 4. AI Service Setup

```bash
cd ai-service

pip install -r requirements.txt

uvicorn app.main:app --reload
```

AI Service runs on:

```text
http://localhost:8000
```

---

# Environment Variables

## Backend `.env`

```env
PORT=3001

MONGODB_URI=your_mongodb_uri

AI_SERVICE_URL=http://localhost:8000

GEMINI_API_KEY=your_gemini_api_key
```

---

## AI Service `.env`

```env
GEMINI_API_KEY=your_gemini_api_key

TAVILY_API_KEY=your_tavily_api_key
```

---

# requirements.txt

```txt
fastapi
uvicorn
pymupdf
requests
google-genai
python-multipart
python-dotenv
tavily-python
```

---

# API Flow

## Upload PDF

```http
POST /api/upload
```

## Check Processing Status

```http
GET /api/report/:id/status
```

## Get Final Report

```http
GET /api/report/:id
```

## Get Report History

```http
GET /api/reports
```

---

# Example Output

```json
{
  "claim": "India GDP grew 12% in 2024",
  "status": "FALSE",
  "confidence": 91,
  "actualFact": "IMF data shows India GDP grew 6.8% in 2024"
}
```

---

# Gemini API Quota Notice

This project currently uses the free tier of Google's Gemini API.

During development and testing, multiple PDF uploads were used to debug and improve the verification pipeline, which exhausted the current daily quota.

The application was successfully tested earlier and correctly:
- Extracted factual claims
- Detected fake statistics
- Verified real claims
- Generated trust reports

If the live app temporarily shows API quota errors, evaluators can:
- Wait for the daily quota reset
- Check the demo video linked above
- Review the source code and architecture

---

# Folder Structure

```text
satyascan/
│
├── frontend/
├── backend/
├── ai-service/
├── docs/
└── README.md
```

---

# Future Improvements

- OCR support for scanned PDFs
- Multi-language verification
- Citation highlighting inside PDFs
- User authentication
- PDF report export
- Batch document processing

