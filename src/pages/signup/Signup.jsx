import { useState } from "react";
import './Signup.css';
import { useNavigate } from "react-router";

const API_URL = 'https://car-mechanic-ten.vercel.app';

const Signup = ({ onGoToLogin }) => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    userType: "plus"
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const passwordsMatch = formData.password === formData.repeatPassword && formData.password !== '';
  const isFormValid = formData.username && formData.email && formData.password && passwordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setError('Please complete all fields correctly');
      return;
    }

    setLoading(true);
    setError('');

    const { repeatPassword, ...signupData } = formData;
    console.log('Submitting signup data:', signupData);
    fetch(`${API_URL}/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(err => {
            throw new Error(err.message || 'Signup failed');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Signup successful:', data);
        localStorage.setItem('userToken', data.token);
        navigate("/dashboard");
      })
      .catch(error => {
        console.error('Signup error:', error);
        setError(error.message || 'Signup failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-header">
          <div className="signup-logo">
            <span className="logo-icon">🔧</span>
          </div>
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join Mechanic App</p>
        </div>

        <div className="signup-form-card">
          <h2 className="form-title">Sign Up</h2>
          
          <form onSubmit={handleSubmit} className="form-content">
            <div className="input-field">
              <label className="input-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-control"
                placeholder="Your username"
              />
            </div>

            <div className="input-field">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-control"
                placeholder="you@example.com"
              />
            </div>

            <div className="input-field">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-control"
                placeholder="Password"
              />
            </div>

            <div className="input-field">
              <label className="input-label">Repeat Password</label>
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="input-control"
                placeholder="Repeat password"
                style={{ 
                  borderColor: formData.repeatPassword && !passwordsMatch ? '#f87171' : '#d1d5db'
                }}
              />
              {formData.repeatPassword && !passwordsMatch && (
                <small style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Passwords don't match
                </small>
              )}
            </div>

            <div className="input-field">
              <label className="input-label">Plan</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="input-control"
              >
                <option value="plus">Plus (10 services)</option>
                <option value="premium">Premium (unlimited)</option>
              </select>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="signup-button"
              disabled={!isFormValid || loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            <div className="form-footer">
              <p className="footer-text">
                Already have an account?{' '}
                <button type="button" onClick={onGoToLogin} className="footer-link-button">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="signup-footer">
          <p>© 2025 Best App - All rights reserved to Nico and Cande</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;