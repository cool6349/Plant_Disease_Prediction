"use client"

const Button = ({ type = "button", variant = "primary", fullWidth = false, disabled = false, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  )
}

export default Button
