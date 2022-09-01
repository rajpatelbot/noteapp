import './styles/DarkMode.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUp from './pages/SignUpPage/SignUp'
import WelcomePage from './pages/welcomePage/WelcomePage'
import { useEffect, useState } from 'react'
import Header from './containers/header/Header'
import Body from './containers/body/Body'
import { axiosInstance } from './config'

function App () {
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  // check always the valid user when the page is reload OR navigate to other page by user
  useEffect(
    () =>
      (async () => {
        const res = await axiosInstance.get('/users/auth')
        if (!res) return setUser({})
        setUser(res.data)
      })(),
    [setUser]
  )

  return (
    <BrowserRouter>
      <Header
        user={user}
        setUser={setUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Routes>
        <Route exact path='/' element={<Body darkMode={darkMode} />} />
        <Route exact path='/signup' element={<SignUp darkMode={darkMode} />} />
        <Route
          exact
          path='/login'
          element={<LoginPage darkMode={darkMode} setUser={setUser} />}
        />
        <Route
          exact
          path='/notes'
          element={
            <WelcomePage
              user={user}
              setUser={setUser}
              darkMode={darkMode}
              notes={notes}
              setNotes={setNotes}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
