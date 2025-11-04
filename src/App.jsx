import './App.css'
import { useState, useEffect } from 'react'
import Login from './pages/Login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Signup from './pages/signup/signup';

const App = () => {
  return (
    <Provider store={store}>
      <Signup />
    <div className='app-container'>
      <Login />
      <Dashboard />
    </div>
    </Provider>
    
  )
}

export default App