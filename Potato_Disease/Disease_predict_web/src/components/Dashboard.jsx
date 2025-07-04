import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"




const plantCategories = [
  {
    name: "Potato",
    image: "potato.jpg",
    description: "Detect common potato diseases like blight and scab",
  },
  {
    name: "Tomato",
    image: "Tomato.jpg",
    description: "Identify tomato diseases including leaf spot and mosaic virus",
  },
  {
    name: "Corn",
    image: "corn.jpg",
    description: "Diagnose corn diseases such as rust and smut",
  },
  {
    name: "Wheat",
    image: "wheat.jpg",
    description: "Detect wheat diseases like stripe rust and powdery mildew",
  },
  {
    name: "Apple",
    image: "apple.jpg",
    description: "Identify apple tree diseases including fire blight and scab",
  },
]

const features = [
  {
    icon: Shield,
    title: "Accurate Detection",
    description: "Advanced AI algorithms provide precise disease identification with high confidence rates.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate analysis and recommendations for your plant health concerns.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Access professional agricultural advice and treatment recommendations.",
  },
]



const Dashboard = () => {

    const navigate = useNavigate()

  const handlePlantClick = (plantName) => {
    navigate(`/plant/${plantName.toLowerCase()}`)
  }

 



  return (
    <div>
     {/* Plant Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select Your Plant Category</h2>
          <p className="text-xl text-gray-600">Choose from our supported plant types to begin disease analysis</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plantCategories.map((plant, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-green-100 group"
              onClick={() => handlePlantClick(plant.name)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  {plant.name}
                </h3>
                <p className="text-sm text-gray-600">{plant.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50 group-hover:border-green-400"
                >
                  Analyze {plant.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
