const express = require('express')
const  { saveResumeInstanceAndReturnJSON } = require('../utils/resume')
const  { uploadResume } = require('../controllers/uploadResume')

const router = express.Router()

// Upload Resume Route
// @desc    Upload Resume to Cloudinary
// @route   POST /api/v1/resume-upload/:userId
// @access  Private
router.post('/:userId', uploadResume, saveResumeInstanceAndReturnJSON())

module.exports = router
