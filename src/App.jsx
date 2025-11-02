import './App.css'
import { useState, useEffect } from 'react'
import Login from './pages/Login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setCurrentView('dashboard');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log('Login successful, user data:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentView('login');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <>
      {currentView === 'login' && (
        <Login 
          onSuccess={handleLoginSuccess}
          onGoToSignup={() => setCurrentView('signup')}
        />
      )}
      
      {currentView === 'signup' && (
        <Signup 
          onSuccess={handleLoginSuccess}
          onGoToLogin={() => setCurrentView('login')}
        />
      )}
      
      {currentView === 'dashboard' && user && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}

export default App