import requests
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.pdf_extractor import extract_text_from_bytes
from app.services.claim_extractor import extract_claims
from app.services.verifier import verify_claim

import base64
import time

router = APIRouter()

class AnalyzeRequest(BaseModel):
    fileData: str
    reportId: Optional[str] = None
    callback_url: Optional[str] = None

def notify_progress(url: str, step: str, progress: dict = None):
    if not url:
        return
    try:
        payload = {"step": step}
        if progress:
            payload["progress"] = progress
        requests.post(url, json=payload, timeout=5)
    except Exception as e:
        print(f"Callback failed: {e}")

@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    try:
        cb = request.callback_url
        
        print("=== ANALYZE ENDPOINT CALLED ===")
        notify_progress(cb, "parsing")
        
        pdf_bytes = base64.b64decode(request.fileData)
        text = extract_text_from_bytes(pdf_bytes)
        print(f"Analyze: extracted text length {len(text)}")
        
        notify_progress(cb, "extracting")
        claims_list = extract_claims(text)
        print(f"Analyze: extracted claims {len(claims_list)}")
        if not claims_list:
            print("Analyze: WARNING - Claims list is empty!")
        
        verified_claims = []
        total = len(claims_list)
        
        notify_progress(cb, "searching", {"done": 0, "total": total})
        
        for i, item in enumerate(claims_list):
            claim_text = item.get("claim")
            if not claim_text:
                continue
                
            print(f"Sleeping 4s before verifying: {claim_text[:30]}...")
            time.sleep(4)
                
            verification_result = verify_claim(claim_text)
            status = verification_result.get("status", "FALSE")
                
            claim_obj = {
                "claim": claim_text,
                "status": status,
                "confidence": verification_result.get("confidence", 0),
                "actualFact": verification_result.get("actualFact", ""),
                "explanation": verification_result.get("explanation", ""),
                "sources": verification_result.get("sources", [])
            }
            verified_claims.append(claim_obj)
            
            notify_progress(cb, "searching", {"done": i + 1, "total": total})
            
        notify_progress(cb, "verifying")
            
        return {
            "claims": verified_claims
        }
    except Exception as e:
        print(f"Error during analysis: {e}")
        return {"error": str(e)}
