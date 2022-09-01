const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const userControllers = {
  signupUser: async (req, res) => {
    try {
      // create a new user
      await User.create(req.body, (err, user) => {
        if (err) {
          // when unique fields/values enter by the client then mongoose wull throw the 11000 code
          if (err.code === 11000) {
            return res.status(500).json({ msg: 'Email is already exists!!' })
          }
          const customErr = {}
          // for getting errors from mongoose dynamically
          Object.values(err.errors).forEach((error) => {
            // console.log(error.properties);
            const { path, message } = error.properties
            customErr[path] = message
          })
          return res.status(400).json(customErr)
        } else {
          res.status(201).send({ _id: user._id })
        }
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body
      // check if the email or password is blank
      if (!email || !password) {
        return res.status(400).json({ msg: 'All Fields Required!' })
      }
      // check email in DB, it is exists or not
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Cradentials!!' })
      }
      // if email is exists then check password and allow to login if password is correct
      const isMatchedPass = user.password === password
      if (!isMatchedPass) {
        return res.status(400).json({ msg: 'Invalid Cradentials!!' })
      } else {
        const webToken = require('../utils/generateJWT-Token')
        const cookie = webToken(user._id, user)
        if (cookie) {
          res.cookie('loginCookie', cookie, {
            expires: new Date(Date.now() + 3600000)
          })
          return res.json({ _id: user._id, email: user.email })
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  authenticatedUser: (req, res) => {
    try {
      const token = req.cookies.loginCookie
      if (!token) return res.send(false)

      jwt.verify(token, process.env.JWT_SECRET, async (err, authenticated) => {
        if (err) return res.send(false)
        const user = await User.findOne({ _id: authenticated._id })
        if (!user) return res.send(false)
        return res.send(user)
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  logoutUser: (req, res) => {
    res.cookie('loginCookie', '', { maxAge: 10 }).send({ success: true })
  }
}

module.exports = userControllers
