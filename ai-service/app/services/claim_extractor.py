import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def extract_claims(text: str) -> list[dict]:
    try:
        with open("app/prompts/extract_claims.txt", "r") as f:
            prompt_template = f.read()
            
        prompt = prompt_template.replace("{text}", text)
        
        model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"response_mime_type": "application/json"})
        response = model.generate_content(prompt)
        
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
