import './Form.css'
import Button from '../button/Button'
import { BiShow, BiHide } from 'react-icons/bi'
import { useState } from 'react'
import Loader from '../loader/Loader'
import { useNavigate } from 'react-router'
import { axiosInstance } from '../../config'

const Form = ({ formName, cls, setUser }) => {
  const navigate = useNavigate()
  const [showHidePass, setShowHidePass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState({ email: '', password: '' })

  let data = {}

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      data = await axiosInstance.post(
        '/users/signup',
        {
          email,
          password
        },
        config
      )
      JSON.stringify(data)
      navigate('/login')
    } catch (err) {
      setError(err.response.data)
      setTimeout(() => {
        setError({ email: '', password: '' })
      }, 2000)
    }
    setLoader(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      data = await axiosInstance.post(
        '/users/login',
        {
          email,
          password
        },
        config
      )
      if (data.data._id) {
        navigate('/notes')
        setUser({ email: data.data.email, _id: data.data._id })
      }
    } catch (err) {
      setError(err.response.data)
      setTimeout(() => {
        setError({ email: '', password: '' })
      }, 2000)
    }
    setLoader(false)
  }

  return (
    <div className={`form ${cls}`}>
      <h1>{formName}</h1>
      <form onSubmit={formName === 'SignUp' ? handleSignup : handleLogin}>
        <div className='email'>
          <label htmlFor='email'>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
        </div>
        <div className='password'>
          <label htmlFor='password'>Password</label>
          <div className='form__input-showHideBtn'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showHidePass ? 'text' : 'password'}
            />
            {showHidePass
              ? (
                <BiShow
                  className='passBtn'
                  onClick={() => setShowHidePass(false)}
                />
                )
              : (
                <BiHide
                  className='passBtn'
                  onClick={() => setShowHidePass(true)}
                />
                )}
          </div>
        </div>
        <Button text={loader ? <Loader /> : formName} className='formBtn' />
        <p className='errorMsg'> {error.email} </p>
        <p className='errorMsg'> {error.password} </p>
        <p className='errorMsg'> {error.msg} </p>
      </form>
    </div>
  )
}

export default Form
