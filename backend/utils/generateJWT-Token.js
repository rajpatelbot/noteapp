const jwt = require('jsonwebtoken')

const webToken = (_id, user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '3600000'
    }
  )
}

module.exports = webToken
