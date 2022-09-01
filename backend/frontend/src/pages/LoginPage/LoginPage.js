import './LoginPage.css'
import authLight from '../../assets/authLight.svg'
import authDark from '../../assets/authDark.svg'
import BodyImg from '../../components/bodyImg/BodyImg'
import Form from '../../components/form/Form'

const LoginPage = ({ darkMode, setUser }) => {
  return (
    <div className='padding loginSigupBody'>
      <Form formName='Login' cls='formAnimate' setUser={setUser} />
      <BodyImg
        bodyImg={!darkMode ? authLight : authDark}
        style={{ '--order': '1' }}
        cls='imgAnimate'
      />
    </div>
  )
}

export default LoginPage
