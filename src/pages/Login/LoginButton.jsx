import './LoginButton.css';

const LoginButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="login-button">
      Ingresar
    </button>
  );
};

export default LoginButton;