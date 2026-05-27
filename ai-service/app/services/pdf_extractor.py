import fitz

def extract_text(file_path: str) -> str:
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        print(f"Extracted {len(text)} characters from PDF.")
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""
