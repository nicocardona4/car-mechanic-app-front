import './LoginButton.css';

const LoginButton = ({ onClick, disabled, children }) => {
  return (
    <button 
      onClick={onClick} 
      className="login-button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LoginButton;