import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"

const plantCategories = [
  {
    name: "Potato",
    image: "/images/potato.jpg",
    description: "Detect common potato diseases like blight and scab",
  },
  {
    name: "Tomato",
    image: "/images/tomato.jpg",
    description: "Identify tomato diseases including leaf spot and mosaic virus",
  },
  {
    name: "Corn",
    image: "/images/corn.jpg",
    description: "Diagnose corn diseases such as rust and smut",
  },
  {
    name: "Wheat",
    image: "/images/wheat.jpg",
    description: "Detect wheat diseases like stripe rust and powdery mildew",
  },
  {
    name: "Apple",
    image: "/images/apple.jpg",
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

export function LandingPage() {
  const navigate = useNavigate()

  const handlePlantClick = (plantName) => {
    navigate(`/plant/${plantName.toLowerCase()}`)
  }

  const handleGetStarted = () => {
    navigate("/login")
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/hero.jpg')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Plant Disease Detector</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Protect your crops with AI-powered disease detection. Upload a photo and get instant diagnosis with
              treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={handleGetStarted} size="lg" className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose PlantCare?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our advanced technology helps farmers and gardeners maintain healthy plants with precision and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-green-100">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Protect Your Plants?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers and gardeners who trust PlantCare for accurate disease detection.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3">
            Start Free Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
