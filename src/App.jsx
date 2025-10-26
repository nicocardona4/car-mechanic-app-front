import { Provider } from 'react-redux'
import './App.css'
import Login from './pages/Login/Login'
import {store} from './store/store'
import Dashboard from './pages/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Signup from './pages/signup/signup'

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