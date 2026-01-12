import { Routes , Route} from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/Captainsignup'
import { UserDataContext } from './context/userContext'

const App = () => {
  const ans = useContext(UserDataContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App
