import { Provider } from 'react-redux'
import './App.css'
import Login from './pages/Login/Login'
import {store} from './store/store'
import Dashboard from './pages/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Signup from './pages/signup/signup'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App