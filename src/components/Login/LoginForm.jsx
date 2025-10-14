import './LoginForm.css';
import InputField from './InputField';
import LoginButton from './LoginButton';

const LoginForm = ({ username, password, setUsername, setPassword, error, handleSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-form-card">
      <h2 className="form-title">Login</h2>
      
      <div className="form-content">
        <InputField
          id="username"
          label="Usuario"
          type="text"
          icon="👤"
          value={username}
          onChange={setUsername}
          onKeyPress={handleKeyPress}
          placeholder="username"
        />

        <InputField
          id="password"
          label="Contraseña"
          type="password"
          icon="🔒"
          value={password}
          onChange={setPassword}
          onKeyPress={handleKeyPress}
          placeholder="pass"
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" className="checkbox" />
            <span>Recordarme</span>
          </label>
          <a href="#" className="forgot-password">
            ¿Forgot your passw?
          </a>
        </div>

        <LoginButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginForm;