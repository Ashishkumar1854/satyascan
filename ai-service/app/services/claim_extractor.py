import os
import json
import re
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def extract_claims(text: str) -> list:
    try:
        prompt = f"""Extract factual claims from this text that contain numbers, 
        percentages, statistics, dates, or technical facts.
        Return ONLY a JSON array like: [{{"claim": "claim text here"}}]
        No explanation, no markdown, just the JSON array.
        
        Text: {text[:3000]}"""
        
        response = client.models.generate_content(
            model="gemini-1.5-flash-latest",
            contents=prompt
        )
        
        raw = response.text
        print(f"GEMINI RAW RESPONSE: {raw}")
        
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
