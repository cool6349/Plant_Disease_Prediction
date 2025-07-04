from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dictionary of models and class names
MODEL_PATHS = {
    "potato": r"R:/coding/Disease_Prediction/Potato_Disease/models/potato_model/1/1.h5",
    "tomato": r"R:/coding/Disease_Prediction/Potato_Disease/models/tomato_model/3.h5",
    "tomato": r"R:/coding/Disease_Prediction/Potato_Disease/models/corn_model/1.h5",
}

CLASS_NAMES = {
    "potato": ["Early Blight", "Late Blight", "Healthy"],
    "tomato": ['Tomato Bacterial spot','Tomato Early blight','Tomato Late blight','Tomato Leaf Mold','Tomato Tomato mosaic virus','Tomato healthy'],
    "corn": ['Blight', 'Gray_Leaf_Spot', 'Healthy']
}

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    plant_type: str = Form(...)
):
    if plant_type not in MODEL_PATHS:
        return {"error": f"Unsupported plant type '{plant_type}'. Supported: {list(MODEL_PATHS.keys())}"}

    # Load appropriate model and class names
    model_path = MODEL_PATHS[plant_type]
    class_names = CLASS_NAMES[plant_type]

    model = tf.keras.models.load_model(model_path)

    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = model.predict(img_batch)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = float(np.max(predictions))

    return {
        "plant": plant_type,
        "class": predicted_class,
        "confidence": confidence
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8001)
