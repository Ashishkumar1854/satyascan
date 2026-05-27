from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze

import os

app = FastAPI()

api_key = os.environ.get("GEMINI_API_KEY")
print(f"GEMINI_API_KEY present: {api_key is not None}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)

@app.get("/health")
def health():
    return {"status": "ok"}
