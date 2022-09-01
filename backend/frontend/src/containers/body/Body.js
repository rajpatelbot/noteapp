import { Link } from 'react-router-dom'
import homeScreen from '../../assets/homeScreen.svg'
import darkModeHomeScreen from '../../assets/darkModeHomeScreen.svg'
import BodyImg from '../../components/bodyImg/BodyImg'
import Button from '../../components/button/Button'
import './Body.css'

const Body = ({ darkMode }) => {
  return (
    <div className='noteapp__body'>
      <BodyImg
        bodyImg={!darkMode ? homeScreen : darkModeHomeScreen}
        cls='homeImgAnimate'
      />

      <div className='noteapp__body-greeting animate'>
        <h1>
          Welcome to My <span> Notes </span>
        </h1>
        <p>
          A best place to save your future tasks with <span>security</span>{' '}
        </p>
        <Link to='/login'>
          {' '}
          <Button text='Get Started' className='startBtn' />{' '}
        </Link>
      </div>
    </div>
  )
}

export default Body
