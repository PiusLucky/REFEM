const express = require('express')
const  { saveResumeInstanceAndReturnJSON } = require('../utils/resume')
const  { uploadResume } = require('../controllers/uploadResume')
const  authMiddleware = require('../middleware/authMiddleware')


const router = express.Router()

// Upload Resume Route
// @desc    Upload Resume to Cloudinary
// @route   POST /api/v1/resume-upload
// @access  Private
router.post('/', authMiddleware, uploadResume, saveResumeInstanceAndReturnJSON())

module.exports = router
