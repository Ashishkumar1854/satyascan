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
<img width="1428" height="789" alt="2 pdf" src="https://github.com/user-attachments/assets/4449d791-720c-4dc5-9dbf-a50e12efa819" />
<img width="1433" height="815" alt="3 pdf" src="https://github.com/user-attachments/assets/a7079af1-14fb-4b70-80f0-60e87bba7be7" />
<img width="1395" height="804" alt="4 pdf" src="https://github.com/user-attachments/assets/3f26add8-d1c3-4f68-9517-724407086f86" />
<img width="1433" height="801" alt="5 pdf" src="https://github.com/user-attachments/assets/9e66a661-acaa-42ff-9967-0b6cbe2a4637" />
<img width="1425" height="781" alt="1 pdf" src="https://github.com/user-attachments/assets/1e9a12bc-bcbe-47ad-a4a7-e7755ac7fa2a" />


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

