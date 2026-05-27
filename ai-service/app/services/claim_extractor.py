import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def extract_claims(text: str) -> list[dict]:
    try:
        with open("app/prompts/extract_claims.txt", "r") as f:
            prompt_template = f.read()
            
        prompt = prompt_template.replace("{text}", text)
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        
        result = json.loads(response.text)
        if isinstance(result, list):
            return result
        elif isinstance(result, dict) and "claims" in result:
            return result["claims"]
        else:
            return []
    except Exception as e:
        print(f"Error extracting claims: {e}")
        return []
