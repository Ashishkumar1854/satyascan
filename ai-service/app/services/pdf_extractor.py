import fitz

def extract_text(file_data: bytes) -> str:
    try:
        doc = fitz.open(stream=file_data, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        print(f"Extracted {len(text)} characters from PDF.")
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""
