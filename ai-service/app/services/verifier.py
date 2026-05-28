import os
import json
from google import genai
from google.genai import types
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def verify_claim(claim: str) -> dict:
    try:
        try:
            search_result = tavily_client.search(query=claim, search_depth="basic", max_results=3)
        except Exception as e:
            print(f"Tavily search failed: {e}")
            return {"status": "FALSE", "confidence": 50, "actualFact": "", "explanation": "Search failed.", "sources": []}
            
        evidence_lines = []
        sources = []
        for result in search_result.get("results", []):
            evidence_lines.append(f"Source: {result.get('title', 'Unknown')}\nContent: {result.get('content', '')}\n")
            sources.append({"name": result.get('title', 'Unknown'), "url": result.get('url', '')})
            
        evidence_text = "\n".join(evidence_lines)
        
        with open("app/prompts/verify_claim.txt", "r") as f:
            prompt_template = f.read()
            
        prompt = prompt_template.replace("{claim}", claim).replace("{evidence}", evidence_text)
        
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        
        print(f"Verifier Gemini raw response: {response.text}")
        
        result = json.loads(response.text)
        result["sources"] = sources
        
        print(f"Verifier result status: {result.get('status')}")
        
        return result
    except Exception as e:
        print(f"Error verifying claim: {e}")
        return {"status": "FALSE", "confidence": 50, "actualFact": "", "explanation": "Verification failed due to error.", "sources": []}
