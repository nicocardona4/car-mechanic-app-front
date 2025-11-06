import { useState } from "react";
// import { loginUser } from "../services/authService"; // Ajusta la ruta a tu servicio
import './Login.css';
import { API_URL } from "../../api/config";
import { useNavigate } from "react-router";


const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

      setLoading(true);
      setError("");
      const requestBody = { username: username, password: password }
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
          setError("Credenciales invalidas");
        } else {
          console.error("Login error:", error);
          setError("Error en el servidor");
        }
      }).finally(() => {
        setLoading(false);
      })
    }
  

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label htmlFor="username">User</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Cargando..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
