import './App.css'
import { useState, useEffect } from 'react'
import Login from './pages/Login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import NewService from './pages/newService/NewService'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import { store } from './store/store';



function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/newService' element={<NewService/>}/>
          <Route path='*' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App