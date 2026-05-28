import os
import json
import re
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def extract_claims(text: str) -> list:
    try:
        prompt = f"""Extract factual claims from this text that contain numbers, 
        percentages, statistics, dates, or technical facts.
        Return ONLY a JSON array like: [{{"claim": "claim text here"}}]
        No explanation, no markdown, just the JSON array.
        
        Text: {text[:3000]}"""
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )
        
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
