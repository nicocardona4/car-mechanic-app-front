import { useState } from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';

const API_URL = '';

const Login = ({ onSuccess, onGoToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!username || !password) {
      setError('Please complete all fields');
      return;
    }
    
    setLoading(true);
    setError('');

    fetch(`${API_URL}/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (response.status !== 200) {
          return response.json().then(err => {
            throw new Error(err.message || 'Invalid credentials');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        onSuccess(data);
      })
      .catch(error => {
        console.error('Login error:', error);
        setError(error.message || 'Login failed');
      })
      .finally(() => {
        setLoading(false);
      });
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
          loading={loading}
          handleSubmit={handleSubmit}
          onGoToSignup={onGoToSignup}
        />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;