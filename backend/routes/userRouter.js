const router = require('express').Router()
const userCtrl = require('../controllers/userControllers')
const authUser = require('../middleware/authUser')

// SignUp
router.post('/signup', userCtrl.signupUser)

// Login
router.post('/login', userCtrl.loginUser)

// authenticate
router.get('/auth', authUser, userCtrl.authenticatedUser)

// logout
router.route('/logout').get(userCtrl.logoutUser)

module.exports = router
