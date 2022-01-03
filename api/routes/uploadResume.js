const express = require('express')
const  { saveResumeInstanceAndReturnJSON, retrieveResumeLink } = require('../utils/resume')
const  { uploadResume } = require('../controllers/uploadResume')
const  authMiddleware = require('../middleware/authMiddleware')
const  verifyAccountMiddleware = require('../middleware/verifyAccountMiddleware')


const router = express.Router()

// Upload Resume Route
// @desc    Upload Resume to Cloudinary
// @route   POST /api/v1/resume-upload
// @access  Private
router.post('/', authMiddleware, verifyAccountMiddleware, uploadResume, saveResumeInstanceAndReturnJSON())

// Retrieve Resume Route
// @desc    Retrieve Resume Link
// @route   POST /api/v1/resume-upload/retrieve
// @access  Private
router.get('/retrieve', authMiddleware, verifyAccountMiddleware, retrieveResumeLink())

module.exports = router
