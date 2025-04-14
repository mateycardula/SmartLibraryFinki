from flask import Flask, request
from PIL import Image
import pytesseract

app = Flask(__name__)


@app.route('/ocr', methods=['GET'])
def ocr_process():
    if request.method == 'POST':
        image_file = request.files['image']
        image_data = Image.open(image_file)
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        # Perform OCR using PyTesseract
        text = pytesseract.image_to_string(image_data)
        return text


if __name__ == '__main__':
    app.run(debug=True)
