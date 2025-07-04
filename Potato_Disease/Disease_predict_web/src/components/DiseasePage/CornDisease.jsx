"use client"

import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, FileImage, CheckCircle, AlertTriangle } from "lucide-react"

const diseaseExamples = {
  potato: [
    {
      name: "Late Blight",
      image: "/placeholder.svg?height=150&width=150",
      description:
        "Dark, water-soaked lesions on leaves that rapidly expand. Can destroy entire crops.",
      severity: "High",
    },
    {
      name: "Early Blight",
      image: "/placeholder.svg?height=150&width=150",
      description: "Circular brown spots with concentric rings on older leaves.",
      severity: "Medium",
    },
    {
      name: "Common Scab",
      image: "/placeholder.svg?height=150&width=150",
      description:
        "Rough, corky lesions on potato tubers affecting appearance and quality.",
      severity: "Low",
    },
  ],
  tomato: [
    {
      name: "Bacterial Spot",
      image: "/placeholder.svg?height=150&width=150",
      description: "Small, dark spots on leaves and fruit with yellow halos.",
      severity: "Medium",
    },
    {
      name: "Mosaic Virus",
      image: "/placeholder.svg?height=150&width=150",
      description: "Mottled yellow and green patterns on leaves with stunted growth.",
      severity: "High",
    },
    {
      name: "Leaf Mold",
      image: "/placeholder.svg?height=150&width=150",
      description: "Yellow spots on upper leaf surface with fuzzy growth underneath.",
      severity: "Medium",
    },
  ],
  corn: [
    {
      name: "Northern Corn Leaf Blight",
      image: "/placeholder.svg?height=150&width=150",
      description: "Long, elliptical gray-green lesions on leaves.",
      severity: "High",
    },
    {
      name: "Common Rust",
      image: "/placeholder.svg?height=150&width=150",
      description: "Small, reddish-brown pustules on both leaf surfaces.",
      severity: "Medium",
    },
    {
      name: "Gray Leaf Spot",
      image: "/placeholder.svg?height=150&width=150",
      description: "Rectangular gray lesions with distinct margins.",
      severity: "Medium",
    },
  ],
  wheat: [
    {
      name: "Stripe Rust",
      image: "/placeholder.svg?height=150&width=150",
      description: "Yellow stripes of pustules parallel to leaf veins.",
      severity: "High",
    },
    {
      name: "Powdery Mildew",
      image: "/placeholder.svg?height=150&width=150",
      description: "White, powdery fungal growth on leaf surfaces.",
      severity: "Medium",
    },
    {
      name: "Septoria Leaf Blotch",
      image: "/placeholder.svg?height=150&width=150",
      description: "Brown lesions with dark borders and light centers.",
      severity: "Medium",
    },
  ],
  apple: [
    {
      name: "Apple Scab",
      image: "/placeholder.svg?height=150&width=150",
      description: "Dark, scabby lesions on leaves and fruit.",
      severity: "High",
    },
    {
      name: "Fire Blight",
      image: "/placeholder.svg?height=150&width=150",
      description: "Blackened, wilted shoots that appear burned.",
      severity: "High",
    },
    {
      name: "Cedar Apple Rust",
      image: "/placeholder.svg?height=150&width=150",
      description: "Orange spots on leaves with spore-producing structures.",
      severity: "Medium",
    },
  ],
}

export function CornDisease() {
  const { plantName } = useParams()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [result, setResult] = useState(null)

  const diseases = diseaseExamples[plantName?.toLowerCase()] || []

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setIsUploaded(false)
      setResult(null)
    } else {
      alert("Please select a valid image file.")
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("plant_type", "corn")

    try {
      const response = await axios.post("http://localhost:8001/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setIsUploaded(true)
      setResult(response.data)
    } catch (error) {
      console.error("Prediction failed:", error)
      alert("Prediction failed. Check console for details.")
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high": return "text-red-600 bg-red-50 border-red-200"
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low": return "text-green-600 bg-green-50 border-green-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "low":
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate("/")} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          {plantName} Disease Analysis
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-green-600" />
                <span>Upload Plant Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                  }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
              >
                <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Drag and drop your plant image here</p>
                <p className="text-gray-500 mb-4">or</p>
                <label htmlFor="fileInput" className="cursor-pointer">
                  <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">

                  </Button>
                </label>
                <input id="fileInput" type="file" onChange={handleFileInputChange} />
                <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG, GIF (Max 10MB)</p>
              </div>

              {previewUrl && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Image Preview:</h3>
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    {isUploaded && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploaded}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isUploaded ? "Uploaded" : "Analyze Image"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dynamic Analysis Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">
                      Disease Detected: {result.class}
                    </h4>
                    <p className="text-green-700 text-sm">
                      Confidence: {(result.confidence * 100).toFixed(2)}% - This is the predicted disease for your{" "}
                      {plantName?.toLowerCase()}.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Recommendations:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Remove and destroy infected leaves</li>
                      <li>• Use disease-resistant varieties</li>
                      <li>• Apply appropriate fungicides if needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Common Diseases Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Common {plantName} Diseases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseases.map((disease, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex space-x-4">
                      <img
                        src={disease.image || "/placeholder.svg"}
                        alt={disease.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{disease.name}</h4>
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(disease.severity)}`}
                          >
                            {getSeverityIcon(disease.severity)}
                            <span>{disease.severity}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{disease.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
