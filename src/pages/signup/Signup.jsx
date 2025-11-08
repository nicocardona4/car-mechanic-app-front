import "./Signup.css";
import { useNavigate } from "react-router";
import { API_URL } from "../../api/config";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      userType: "plus",
    }
  });

  const password = watch("password");

  const onSubmit = (data) => {
    setLoading(true);
    const { repeatPassword, ...requestBody } = data;
    console.log(requestBody);
    fetch(API_URL + "/v1/signup", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json()
          .then(err => {
            throw new Error(err.message || "Signup failed");
          });
        }

        return response.json();
      })
      .then(data => {
        localStorage.setItem("userToken", data.token);
        navigate("/dashboard");
      })
      .catch(err => {
        toast.error(err.message || "Signup failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-header">
          <div className="signup-logo">
            <span className="logo-icon">🔧</span>
          </div>
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join Mechanic App</p>
        </div>

        <div className="signup-form-card">
          <h2 className="form-title">Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="form-content">

            {/* USERNAME */}
            <div className="input-field">
              <label className="input-label">Username</label>
              <input
                type="text"
                className="input-control"
                placeholder="Your username"
                disabled={loading}
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 20, message: "Maximum 20 characters" }
                })}
              />
              {errors.username && <small className="field-error">{errors.username.message}</small>}
            </div>

            {/* EMAIL */}
            <div className="input-field">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input-control"
                placeholder="you@example.com"
                disabled={loading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format"
                  }
                })}
              />
              {errors.email && <small className="field-error">{errors.email.message}</small>}
            </div>

            {/* PASSWORD */}
            <div className="input-field">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-control"
                placeholder="Password"
                disabled={loading}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 20, message: "Maximum 20 characters" }
                })}
              />
              {errors.password && <small className="field-error">{errors.password.message}</small>}
            </div>

            {/* REPEAT PASSWORD */}
            <div className="input-field">
              <label className="input-label">Repeat Password</label>
              <input
                type="password"
                className="input-control"
                placeholder="Repeat password"
                disabled={loading}
                {...register("repeatPassword", {
                  required: "Please repeat the password",
                  validate: (value) =>
                    value === password || "Passwords don't match"
                })}
              />
              {errors.repeatPassword && (
                <small className="field-error">{errors.repeatPassword.message}</small>
              )}
            </div>

            {/* PLAN */}
            <div className="input-field">
              <label className="input-label">Plan</label>
              <select
                className="input-control"
                disabled={loading}
                {...register("userType")}
              >
                <option value="plus">Plus (10 services)</option>
                <option value="premium">Premium (unlimited)</option>
              </select>
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={!isValid || loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <div className="form-footer">
              <p className="footer-text">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="footer-link-button"
                >
                  Login
                </button>
              </p>
            </div>

          </form>
        </div>

        <div className="signup-footer">
          <p>© 2025 Best App - All rights reserved to Nico and Cande</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
