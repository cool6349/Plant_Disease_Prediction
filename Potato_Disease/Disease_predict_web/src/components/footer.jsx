import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@plantcare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Agriculture St, Farm City, FC 12345</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About PlantCare</h3>
            <p className="text-green-100">
              Advanced plant disease detection using cutting-edge technology to help farmers and gardeners maintain
              healthy crops.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-green-100 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-100">© {new Date().getFullYear()} PlantCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
