"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import FormInput from "../Form/FormInput"
import Button from "../Form/Button"
import axios from "axios"


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  if (validateForm()) {
    setIsSubmitting(true)

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })

      console.log("Signup successful:", response.data)

      // Optional: Navigate to login page or dashboard
      // navigate("/login") // if using useNavigate

      alert("Signup successful! Please log in.")
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message)
      if (error.response?.data?.error) {
        alert(error.response.data.error)
      } else {
        alert("Signup failed. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }
}


  return (
    <div className="auth-card">
      <h1 className="auth-title">Create Account</h1>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
        />

        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={errors.confirmPassword}
        />

        <div className="mt-6">
          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="auth-link font-medium">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default Signup
