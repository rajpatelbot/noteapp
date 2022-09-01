const Note = require('../models/noteModel')

const noteControllers = {
  getNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user_id: req.verifiedUser._id })
      if (!notes) res.status(404).json({ msg: 'Note found' })
      res.json(notes)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  createNotes: (req, res) => {
    try {
      const { title, description } = req.body

      if (!title || !description) {
        return res.status(500).json({ msg: 'All fields required' })
      }

      const newNote = new Note({
        title,
        description,
        user_id: req.verifiedUser._id
      })
      newNote.save()
      res.status(201).json({ msg: 'Note created' })
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },

  deleteNotes: async (req, res) => {
    try {
      // req.params.id will take the id from the url parameter
      const user_id = req.params.id
      const { _id } = req.body

      const find = await Note.findById({ _id })
      if (!find) return res.status(500).json({ msg: 'Document not found' })

      if (find && find.user_id === user_id) {
        await Note.deleteOne({ _id })
        return res.status(201).json({ msg: 'Note deleted' })
      } else {
        return res.status(500).json({ msg: 'Something Wrong' })
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  updateNotes: async (req, res) => {
    try {
      const { title, description } = req.body

      const user_id = req.params.id
      const { _id } = req.body

      const find = await Note.findById({ _id })
      if (!find) return res.status(500).json({ msg: 'Document not found' })

      if (find && find.user_id === user_id) {
        await Note.findOneAndUpdate(
          { _id },
          {
            title,
            description
          }
        )
        return res.status(201).json({ msg: 'Note updated' })
      }
      return res.status(500).json({ msg: 'Something Wrong' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = noteControllers
