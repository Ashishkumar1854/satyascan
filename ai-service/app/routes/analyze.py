from fastapi import APIRouter
from pydantic import BaseModel
from app.services.pdf_extractor import extract_text
from app.services.claim_extractor import extract_claims
from app.services.verifier import verify_claim

router = APIRouter()

class AnalyzeRequest(BaseModel):
    filePath: str
    reportId: str = None

@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    try:
        text = extract_text(request.filePath)
        claims_list = extract_claims(text)
        
        verified_claims = []
        verified_count = 0
        inaccurate_count = 0
        false_count = 0
        
        for item in claims_list:
            claim_text = item.get("claim")
            if not claim_text:
                continue
                
            verification_result = verify_claim(claim_text)
            status = verification_result.get("status", "FALSE")
            
            if status == "VERIFIED":
                verified_count += 1
            elif status == "INACCURATE":
                inaccurate_count += 1
            else:
                false_count += 1
                
            claim_obj = {
                "claim": claim_text,
                "status": status,
                "confidence": verification_result.get("confidence", 0),
                "actualFact": verification_result.get("actualFact", ""),
                "explanation": verification_result.get("explanation", ""),
                "sources": verification_result.get("sources", [])
            }
            verified_claims.append(claim_obj)
            
        total = verified_count + inaccurate_count + false_count
        
        trust_score = 0
        if total > 0:
            trust_score = int(((verified_count + (inaccurate_count * 0.5)) / total) * 100)
            
        return {
            "trustScore": trust_score,
            "summary": {
                "verified": verified_count,
                "inaccurate": inaccurate_count,
                "false": false_count,
                "total": total
            },
            "claims": verified_claims
        }
    except Exception as e:
        print(f"Error during analysis: {e}")
        return {"error": str(e)}
