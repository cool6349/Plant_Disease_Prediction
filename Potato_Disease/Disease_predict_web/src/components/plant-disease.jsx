"use client"

import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PotatoDisease } from "./DiseasePage/PotatoDisease"
import { TomatoDisease} from "./DiseasePage/TomatoDisease"
import {CornDisease} from "./DiseasePage/CornDisease"
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

export function PlantDiseasePage() {
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

 

  const renderComponent = () => {
    switch (plantName.toLowerCase()) {
      case "potato":
        return <PotatoDisease />
      case "tomato":
        return <TomatoDisease />
      case "corn":
        return <CornDisease />
      case "wheat":
        return <WheatDisease />
      case "apple":
        return <AppleDisease />
      default:
        return <div>Unknown plant: {plantName}</div>
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.")
      return
    }

    

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("plant_type", "tomato")

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
    <div >
      {/* <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate("/")} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          {plantName} Disease Analysis
        </h1>
      </div> */}

     

          {/* Dynamic Analysis Results */}
          

        {/* Common Diseases Section */}
        <div>
          <Card>
            <CardHeader>
              {/* <CardTitle>Common {plantName} Diseases</CardTitle> */}
               {renderComponent()}
            </CardHeader>
          </Card>
        </div>
    
    </div>
  )
}
