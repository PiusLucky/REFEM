const express = require('express')
const  {getProfile, updateProfile} = require('../controllers/profile')
const  authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// SendMail Route
// @desc    Send email to recruiters
// @route   POST /api/v1/profile
// @access  Private
router.get('/', authMiddleware, getProfile())
router.patch('/edit', authMiddleware, updateProfile())


module.exports = router