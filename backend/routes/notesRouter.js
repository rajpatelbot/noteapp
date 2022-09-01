const router = require('express').Router()
const auth = require('../middleware/authUser')
const noteControllers = require('../controllers/noteControllers')

// this is a chainable route because we use .route()
// defining notes routes for performing crud operations
router
  .route('/')
  .get(auth, noteControllers.getNotes)
  .post(auth, noteControllers.createNotes)

router
  .route('/:id')
  .put(auth, noteControllers.updateNotes)
  .delete(auth, noteControllers.deleteNotes)

module.exports = router
