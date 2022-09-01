import './WelcomePage.css'
import Button from '../../components/button/Button'
import { GiSpeaker } from 'react-icons/gi'
import { RiEditBoxFill, RiDeleteBin5Fill } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Loader from '../../components/loader/Loader'
import speakText from '../../utils/voice'
import WelcomeGreeting from '../../components/welcomePage_Greeting/WelcomeGreeting'
import { axiosInstance } from '../../config'

const WelcomePage = ({ darkMode, notes, setNotes }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [error, setError] = useState({ msg: '' })
  const [successMsg, setSuccessMsg] = useState({ msg: '' })

  const [loader, setLoader] = useState(false)
  const [update, setUpdate] = useState(false)

  const [_id, setNote_id] = useState('')
  const [user_id, setUser_id] = useState('')

  const [search, setSearch] = useState('')
  const handleSearch = (target) => setSearch(target.value)

  // for format the date & time
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  // this function execute when user select to note update and the particular value will go in the form
  function handleUpdateInput (note) {
    setTitle(note.title)
    setDescription(note.description)
    setUpdate(true)

    setUser_id(note.user_id)
    setNote_id(note._id)
  }

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // this function will render all the notes when anythin change happened
  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get('/api/notes', config)
      setNotes(res.data)
    } catch (err) {
      setError(err.response.res)
    }
  }

  // this function will execute when user press on create button
  async function handleCreateNote (e) {
    e.preventDefault()
    setLoader(true)
    try {
      const res = await axiosInstance.post(
        '/api/notes',
        { title, description },
        config
      )

      if (res.status === 201) {
        fetchNotes()
      }

      setTitle('')
      setDescription('')
      setSuccessMsg(res.data)
      setTimeout(() => {
        setSuccessMsg({ msg: '' })
      }, 2000)
    } catch (err) {
      setError(err.response.data)
      setTimeout(() => {
        setError({ msg: '' })
      }, 2000)
    }
    setLoader(false)
  }

  // this function will execute when user type their updated content and press on update note button
  async function handleUpdateNote (e) {
    e.preventDefault()
    setLoader(true)
    const updateconfig = {
      headers: {
        'Content-type': 'application/json'
      },
      data: { _id }
    }
    try {
      const res = await axiosInstance.put(
        `api/notes/${user_id}`,
        { _id, title, description },
        updateconfig
      )
      if (res.status === 201) {
        fetchNotes()
        setSuccessMsg(res.data)
        setUser_id('')
        setNote_id('')
        setTitle('')
        setDescription('')
        setTimeout(() => {
          setSuccessMsg({ msg: '' })
        }, 2000)
      } else {
        setError(res.data)
        setTimeout(() => {
          setError({ msg: '' })
        }, 2000)
      }
    } catch (err) {
      setError(err.response.data)
      setTimeout(() => {
        setError({ msg: '' })
      }, 2000)
    }
    setLoader(false)
    setUpdate(false)
  }

  // this function will execute when user delete the note
  async function deleteNote (_id, user_id) {
    setLoader(true)
    const deleteconfig = {
      headers: {
        'Content-type': 'application/json'
      },
      data: { _id }
    }
    try {
      const res = await axiosInstance.delete(
        `api/notes/${user_id}`,
        deleteconfig
      )
      if (res.status === 201) {
        fetchNotes()
        setSuccessMsg(res.data)
        setTimeout(() => {
          setSuccessMsg({ msg: '' })
        }, 2000)
      } else {
        setError(res.data)
        setTimeout(() => {
          setError({ msg: '' })
        }, 2000)
      }
    } catch (err) {
      setError(err.response.data)
      setTimeout(() => {
        setError({ msg: '' })
      }, 2000)
    }
    setLoader(false)
  }

  // this useeffect run when anything will happened
  useEffect(() => {
    async function func () {
      const { error, logged_user } = await fetchLoggedUser()
      if (error) {
        setUser_id({})
        navigate('/')
      } else {
        setUser_id({ email: logged_user.email, id: logged_user._id })
        navigate('/notes')
        fetchNotes()
      }
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, setUser_id])

  return (
    <div className='note__create-form'>
      <form onSubmit={update ? handleUpdateNote : handleCreateNote}>
        <div className='input'>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='input'>
          <textarea
            type='text'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          className='createBtn'
          text={loader ? <Loader /> : !update ? 'Create Note' : 'Update Note'}
        />
        <p className='errorMsg'> {error.msg} </p>
        <p className='welcomePage__msg'> {successMsg.msg} </p>
      </form>

      <div className='noteapp__welcomePage-noteInfo-search-header padding'>
        <h1>Your Notes</h1>
        <input
          type='text'
          placeholder='Search Notes'
          value={search}
          onChange={(e) => handleSearch(e.target)}
        />
      </div>

      <section className='noteapp__welcomePage-noteRender-parent-container padding'>
        {notes.length === 0
          ? (
            <WelcomeGreeting darkMode={darkMode} />
            )
          : (
              notes.map((note) => {
                if (
                  note.title.trim().toLowerCase().includes(search) ||
              note.description.trim().toLowerCase().includes(search)
                ) {
                  return (
                    <div
                      key={note._id}
                      className='noteapp__welcomePage-createdNote'
                    >
                      <div className='noteapp__welcomePage-createdNote-title'>
                        <h1>{note.title}</h1>
                        <GiSpeaker
                          id='speakBtn'
                          onClick={() => speakText(note.title, note.description)}
                          style={{ fontSize: '3rem', cursor: 'pointer' }}
                        />
                      </div>
                      <div className='noteapp__welcomePage-createdNote-desc'>
                        <h1>{note.description}</h1>
                      </div>
                      <div className='noteapp__welcomePage-createdNote-note-info'>
                        <RiEditBoxFill
                          id='editBtn'
                          onClick={() => handleUpdateInput(note)}
                          style={{ cursor: 'pointer' }}
                        />
                        <h1>
                          {new Date(note.createdAt).toLocaleString('en', options)}
                        </h1>
                        {loader
                          ? (
                            <Loader />
                            )
                          : (
                            <RiDeleteBin5Fill
                              id='deleteBtn'
                              onClick={() => deleteNote(note._id, note.user_id)}
                              style={{ cursor: 'pointer' }}
                            />
                            )}
                      </div>
                    </div>
                  )
                } else {
                  return null
                }
              })
            )}
      </section>
    </div>
  )
}

export default WelcomePage

// this function fetch the info about currently logged user
export async function fetchLoggedUser () {
  try {
    let res = await fetch('/users/auth')
    if (res.status === 401) {
      return { error: res.statusText }
    } else {
      res = await res.json()
      return { logged_user: res }
    }
  } catch (error) {
    return { error }
  }
}
