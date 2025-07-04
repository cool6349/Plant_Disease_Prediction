"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import FormInput from "../Form/FormInput"
import Button from "../Form/Button"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError("")
  }

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Reset password requested for:", email)
        // Here you would typically make an API call to send a reset link
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1000)
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-title">Reset Password</h1>

      {isSubmitted ? (
        <div className="text-center">
          <div className="mb-4 p-2 bg-green-50 text-green-800 rounded-md">
            If an account exists with the email <strong>{email}</strong>, you will receive a password reset link
            shortly.
          </div>
          <Link to="/" className="auth-link">
            Return to login
          </Link>
        </div>
      ) : (
        <>
          <p className="text-center text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleChange}
              required
              error={error}
            />

            <div className="mt-6">
              <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="auth-link text-sm">
              Back to login
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default ForgotPassword
