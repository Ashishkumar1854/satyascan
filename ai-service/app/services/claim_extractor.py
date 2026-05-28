import os
import json
import re
from app.services.openai_client import call_with_fallback

def extract_claims(text: str) -> list:
    try:
        prompt = f"""Extract factual claims from this text that contain numbers, 
        percentages, statistics, dates, or technical facts.
        Return ONLY a JSON array like: [{{"claim": "claim text here"}}]
        No explanation, no markdown, just the JSON array.
        
        Text: {text[:3000]}"""
        
        def _api_call(client):
            return client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
            )
            
        response = call_with_fallback(_api_call)
        
        raw = response.choices[0].message.content
        print(f"OPENAI RAW RESPONSE: {raw}")
        
        # Clean markdown if present
        raw = raw.strip()
        if raw.startswith("```"):
            raw = re.sub(r"```json|```", "", raw).strip()
        
        claims = json.loads(raw)
        print(f"CLAIMS PARSED: {len(claims)}")
        return claims
    except Exception as e:
        print(f"Error extracting claims: {e}")
        return []
