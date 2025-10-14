import { useState } from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username || !password) {
      setError('Please complete all fields');
      return;
    }
    
    console.log('Trying login with:', { username, password });
    setError('');
    alert(`Welcome ${username}!`);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <LoginHeader />
        <LoginForm 
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
          handleSubmit={handleSubmit}
        />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;