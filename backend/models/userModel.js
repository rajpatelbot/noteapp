const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Enter Your Email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Enter Your Password']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
