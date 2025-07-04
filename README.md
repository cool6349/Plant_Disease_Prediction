# 🌿 Plant Disease Prediction using Deep Learning

A web application that predicts plant diseases using a Convolutional Neural Network (CNN) model trained on leaf images. The project provides a user-friendly interface for farmers to upload images and get instant predictions with disease details and treatment guidance.

---

## 🚀 Features

- 🧠 Deep Learning-based disease prediction (CNN)
- 📷 Upload leaf images and get instant results
- 🌾 Disease database with name, description & treatment
- 🌐 Web-based interface built with React.js & Node.js
- 💾 Model trained on PlantVillage dataset

---

## 📂 Project Structure

Disease_Prediction/
├── Disease_predict_backend/ # Flask/Node backend with prediction API
├── Disease_predict_web/ # React frontend
├── models/ # Trained ML model files (.h5, .pkl)
├── Tomato_img/ # Image dataset (ignored in Git)
├── Training/ # Notebooks/scripts for training
├── .gitignore
├── README.md




---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Flask / Node.js + Express
- **ML Framework:** TensorFlow / Keras
- **Database (Optional):** MongoDB / MySQL
- **Model Format:** `.h5`, `.pkl`

---

## 📦 Requirements

### 🔹 Backend (Python Flask)
- Python 3.x
- pip

```bash
# Create virtual environment
python -m venv myenv
myenv\Scripts\activate   # Windows
# or
source myenv/bin/activate  # macOS/Linux

# Install required packages
pip install -r requirements.txt


🔹 Frontend (React)

cd Disease_predict_web

# Install dependencies
npm install

# Run frontend
npm start


▶️ Running the Project


Start Backend
cd Disease_predict_backend
python app.py
# using FastApi
2. Start Frontend
bash
Copy code
cd Disease_predict_web
npm start


## 📸 Screenshots

### 🔍 Prediction Interface
![Prediction UI](assets/Screenshot(362).png)
![Prediction UI](assets/Screenshot(363).png)
![Prediction UI](assets/Screenshot(364).png)
![Prediction UI](assets/Screenshot(365).png)
![Prediction UI](assets/Screenshot(366).png)

### 📚 Disease Info Page
![Disease Details](assets/Screenshot (368).png)


