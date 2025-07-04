import { Link, useNavigate } from "react-router-dom"
import { Leaf } from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "../components/context/AuthContext"

export function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors">
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">PlantCare</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Home
            </Link>

            {isAuthenticated ? (
              <>
               
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}
