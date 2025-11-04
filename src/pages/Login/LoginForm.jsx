import './LoginForm.css';
import InputField from './InputField';
import LoginButton from './LoginButton';

const LoginForm = ({ username, password, setUsername, setPassword, error, loading, handleSubmit, onGoToSignup }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="login-form-card">
      <h2 className="form-title">Login</h2>
      
      <div className="form-content">
        <InputField
          id="username"
          label="username"
          type="text"
          icon="👤"
          value={username}
          onChange={setUsername}
          onKeyPress={handleKeyPress}
          placeholder="username"
        />

        <InputField
          id="password"
          label="password"
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
            <span>remember me</span>
          </label>
          <a href="#" className="forgot-password">
            ¿Forgot your passw?
          </a>
        </div>

        <LoginButton onClick={handleSubmit} disabled={loading || !username || !password}>
          {loading ? 'Loading...' : 'Login'}
        </LoginButton>

        <div className="form-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <button onClick={onGoToSignup} className="footer-link-button">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;