import './WelcomeGreeting.css'
import darkWelcomeGreeting from '../../assets/darkWelcomeGreeting.svg'
import lightWelcomeGreeting from '../../assets/lightWelcomeGreeting.svg'
import Button from '../button/Button'

const WelcomeGreeting = ({ darkMode }) => {
  return (
    <div className='WelcomeGreeting'>
      <img
        src={!darkMode ? lightWelcomeGreeting : darkWelcomeGreeting}
        alt=''
      />

      <div className='WelcomeGreeting__msg'>
        <h1>Let's get started</h1>
        <p>Haven't created any notes?</p>
        <Button text="Let's Start" className='WelcomeGreeting__msg-btn' />
      </div>
    </div>
  )
}

export default WelcomeGreeting
