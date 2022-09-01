import './Header.css'
import logoLight from '../../assets/logoLight.svg'
import logoDark from '../../assets/logoDark.svg'
import Button from '../../components/button/Button'
import {
  RiMenu3Line,
  RiCloseLine,
  RiLogoutBoxLine,
  RiStickyNoteLine
} from 'react-icons/ri'
import { FaUserCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

const Header = ({ user, setUser, darkMode, setDarkMode }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleProf, setToggleProf] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const dark = localStorage.getItem('darkMode')
    if (dark === 'true') {
      toggleDarkTheme()
    } else {
      toggleLightTheme()
    }
  })

  // logout
  const handleLogout = async () => {
    const res = await fetch('/users/logout')
    if (res.status === 200) {
      navigate('/')
      setUser({})
    }
  }

  // light mode TO dark mode
  const toggleDarkTheme = () => {
    setDarkMode(document.body.classList.add('darkMode'))
    localStorage.setItem('darkMode', true)
    setDarkMode(true)
  }

  // dark mode TO light mode
  const toggleLightTheme = () => {
    setDarkMode(document.body.classList.remove('darkMode'))
    localStorage.setItem('darkMode', false)
    setDarkMode(false)
  }

  return (
    <>
      <nav className='header padding'>
        <Link to='/'>
          <div className='noteapp__header__logoImg-name'>
            <img src={!darkMode ? logoLight : logoDark} alt='logo' />
            <h1>My Notes</h1>
          </div>
        </Link>

        <div className='noteApp__header__loginSignUp-Btn'>
          {!user.email
            ? (
              <>
                <Link to='/login'>
                  <Button text='Login' className='navBtn' />
                </Link>
                <Link to='/signup'>
                  <Button text='SignUp' />
                </Link>
              </>
              )
            : (
              <>
                <div className='navigationDiv'>
                  <Link to='/notes' className='navigation'>
                    Notes
                  </Link>
                </div>
                <div className='noteapp__header__user-info'>
                  {toggleProf
                    ? (
                      <FaUserCircle
                        className='userProf'
                        size={27}
                        onClick={() => setToggleProf(false)}
                      />
                      )
                    : (
                      <FaUserCircle
                        className='userProf'
                        size={27}
                        onClick={() => setToggleProf(true)}
                      />
                      )}
                  <div
                    className={`noteapp__header__user-info-dropdown ${
                    toggleProf && 'show-UserInfo'
                  }`}
                  >
                    <div className='noteapp__header__user-info-dropdown-option'>
                      <FaUserCircle className='userProf' size={17} />
                      <p>{user.email}</p>
                    </div>
                    <div
                      className='noteapp__header__user-info-dropdown-option'
                      onClick={handleLogout}
                    >
                      <RiLogoutBoxLine size={17} />
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </>
              )}
          <Button
            text={darkMode ? 'Light' : 'Dark'}
            className='darkModeBtn'
            toggleTheme={!darkMode ? toggleDarkTheme : toggleLightTheme}
          />
        </div>

        <div className='noteApp__header_toggleMenu'>
          {toggleMenu
            ? (
              <RiCloseLine
                color='#fff'
                size={27}
                onClick={() => setToggleMenu(false)}
              />
              )
            : (
              <RiMenu3Line
                color='#fff'
                size={27}
                onClick={() => setToggleMenu(true)}
              />
              )}
        </div>
      </nav>
      <div className={`parent__header__popupNavbar ${toggleMenu && 'show'}`}>
        <div className='header__popupNavbar'>
          <div className='header__popupNavbar__loginSignUp-btn'>
            {!user.email
              ? (
                <>
                  <Link to='/login'>
                    <Button text='Login' className='navBtn' />
                  </Link>
                  <Link to='/signup'>
                    <Button text='SignUp' />
                  </Link>
                </>
                )
              : (
                <>
                  <div className='navigationDiv'>
                    <div className='noteapp__header__user-info-dropdown-option'>
                      <FaUserCircle className='userProf' size={17} />
                      <p>{user.email}</p>
                    </div>
                    <Link
                      to='/notes'
                      className='noteapp__header__user-info-dropdown-option'
                    >
                      <RiStickyNoteLine size={17} />
                      <p>Notes</p>
                    </Link>
                  </div>
                  <div
                    className='noteapp__header__user-info-dropdown-option'
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxLine size={17} />
                    <p>Logout</p>
                  </div>
                </>
                )}
            <Button
              text={darkMode ? 'Light' : 'Dark'}
              className='darkModeBtn'
              toggleTheme={!darkMode ? toggleDarkTheme : toggleLightTheme}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
