import { useState } from "react";
// import { loginUser } from "../services/authService"; // Ajusta la ruta a tu servicio
import './Login.css';
import { API_URL } from "../../api/config";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const {register, handleSubmit, reset, formState:{isValid, errors}} = useForm({mode: "onSubmit"});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (requestBody) => {
      setLoading(true);
      setError("");
      fetch(API_URL + "/v1/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        if (response.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        return response.json()
      }).then(data => {
        localStorage.setItem("userToken", data.token);
        navigate("/dashboard");
        return;

      }).catch(error => {
        if (error.message === "UNAUTHORIZED") {
          toast.error("Invalid username or password");
        } else {
          toast.error("Server error. Please try again later.");
        }
      }).finally(() => {
        setLoading(false);
      })
    }
  

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-title">Login</h2>

        <div className="form-group">
  <label htmlFor="username">User</label>
  <input
    {...register("username", { required: "Username is required", maxLength: { value: 20, message: "Maximum 20 characters" }, minLength: { value: 3, message: "Minimum 3 characters" } })}
    type="text"
    id="username"
    placeholder="username"
    disabled={loading}
  />
  {errors.username && (
    <span className="field-error">{errors.username.message}</span>
  )}
</div>

<div className="form-group">
  <label htmlFor="password">Password</label>
  <input
    {...register("password", {     required: "Password is required",
    minLength: { value: 3, message: "Minimum 3 characters" },
    maxLength: { value: 20, message: "Maximum 20 characters" },
      pattern: { value: /^[A-Za-z0-9]+$/ , message: "Only alphanumeric characters are allowed" }
  })}
    type="password"
    id="password"
    placeholder="Password"
    disabled={loading}
  />
  {errors.password && (
    <span className="field-error">{errors.password.message}</span>
  )}
</div>


        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button" disabled={!isValid}>
          {loading ? "Cargando..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
