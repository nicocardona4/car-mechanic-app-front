import './LoginHeader.css';

const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="login-logo">
        <span className="logo-icon">🔧</span>
      </div>
      <h1 className="login-title">Mechanic App</h1>
      <p className="login-subtitle">Welcome</p>
    </div>
  );
};

export default LoginHeader;