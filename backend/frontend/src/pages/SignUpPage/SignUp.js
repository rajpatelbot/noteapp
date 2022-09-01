import BodyImg from '../../components/bodyImg/BodyImg'
import Form from '../../components/form/Form'
import authLight from '../../assets/authLight.svg'
import authDark from '../../assets/authDark.svg'

const SignUp = ({ darkMode }) => {
  return (
    <div className='padding loginSigupBody'>
      <Form formName='SignUp' cls='formAnimate' />
      <BodyImg bodyImg={!darkMode ? authLight : authDark} cls='imgAnimate' />
    </div>
  )
}

export default SignUp
