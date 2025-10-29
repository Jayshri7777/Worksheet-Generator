import os
import google.generativeai as genai

try:
    # 1. Get your API key from the environment
    api_key = os.environ.get("GOOGLE_API_KEY")
    
    if not api_key:
        print("---!!! ERROR !!!---")
        print("Your GOOGLE_API_KEY is not set in this terminal.")
        print("Please set it first, like this:")
        print("$env:GOOGLE_API_KEY = 'Your-Key-Here'")
    else:
        genai.configure(api_key=api_key)
        
        print("--- Finding available models for your key... ---")
        
        # 2. List all models
        for m in genai.list_models():
            # 3. Check which ones can be used for 'generateContent'
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
                
        print("-------------------------------------------------")
        print("Please copy one of the model names from the list above (e.g., 'models/gemini-...')")
        print("and paste it into the chat.")

except Exception as e:
    print(f"An error occurred: {e}")