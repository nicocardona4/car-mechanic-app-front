import { useState } from "react";
// import { loginUser } from "../services/authService"; // Ajusta la ruta a tu servicio
import './Login.css';


const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({ username, password });

      // ✅ Llamamos al callback si está logueado
      if (onLoginSuccess) {
        onLoginSuccess(response);
      }

    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            placeholder="Tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
