import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def call_with_fallback(call_func):
    """
    Executes an OpenAI API call, falling back to alternative API keys if the first one fails
    due to rate limits or quotas.
    """
    keys = []
    
    # Check for numbered keys like OPENAI_API_KEY_1, OPENAI_API_KEY_2, etc.
    for i in range(1, 10):
        key = os.getenv(f"OPENAI_API_KEY_{i}")
        if key:
            keys.append(key)
            
    # Also check the default one
    default_key = os.getenv("OPENAI_API_KEY")
    if default_key and default_key not in keys:
        keys.append(default_key)
        
    if not keys:
        raise Exception("No OpenAI API keys found in environment. Please set OPENAI_API_KEY_1, OPENAI_API_KEY_2, etc.")
        
    last_exception = None
    for i, key in enumerate(keys):
        try:
            client = OpenAI(api_key=key)
            # Execute the function using this client
            return call_func(client)
        except Exception as e:
            print(f"Warning: Key {i+1} failed with error: {str(e)[:150]}")
            last_exception = e
            # Try the next key in the list
            continue
            
    # If all keys fail, raise the last exception
    print("CRITICAL ERROR: All configured OpenAI API keys have failed or reached rate limits.")
    raise last_exception
