import { useState } from "react"

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Signup data:", formData)
    // Aquí iría la lógica para registrar al usuario localmente
    alert(`User ${formData.fullName} registered successfully!`)
    setFormData({ fullName: "", email: "", password: "" })
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="signup-container p-4 shadow-sm rounded bg-white" style={{ minWidth: "320px", maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <span>Already have an account? </span>
          <button className="btn btn-link p-0" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
