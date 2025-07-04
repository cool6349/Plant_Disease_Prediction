import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LandingPage } from "@/components/landing-page"
import { PlantDiseasePage } from "./components/plant-disease"
import Login from "./components/AuthPage/Login"
import Signup from "./components/AuthPage/Signup"
import ForgotPassword from "./components/AuthPage/ForgotPassword"
import Dashboard from "./components/dashboard"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/plant/:plantName" element={<PlantDiseasePage />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
