const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    reminderTime: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Note', noteSchema)
