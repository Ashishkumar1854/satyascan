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

📹 Demo Video: Add your video link here

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

## How It Works

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
