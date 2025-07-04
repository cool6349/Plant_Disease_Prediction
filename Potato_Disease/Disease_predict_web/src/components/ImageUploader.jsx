import React from "react";
import axios from "axios";
import { useState } from "react";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [plantType, setPlantType] = useState("potato"); // Or "tomato"
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("plant_type", plantType); // Must match backend

    try {
      const response = await axios.post("http://localhost:8001/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction failed. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Plant Disease Prediction</h2>

      <select value={plantType} onChange={(e) => setPlantType(e.target.value)} >
        <option value="potato">Potato</option>
        <option value="tomato">Tomato</option>
      </select>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePredict}>Predict</button>

      {result && (
        <div>
          <h3>Result</h3>
          <p><strong>Plant:</strong> {result.plant}</p>
          <p><strong>Disease:</strong> {result.class}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
