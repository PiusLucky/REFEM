const express = require('express')
const  { sendMailInstanceAndReturnJSON, previewMailAndReturnJSON } = require('../utils/mail')
const  { sendMail, previewMail, retrieveAllMails, updateCount } = require('../controllers/sendMail')
const  authMiddleware = require('../middleware/authMiddleware')
const  verifyAccountMiddleware = require('../middleware/verifyAccountMiddleware')

const router = express.Router()

// SendMail Route
// @desc    Send email to recruiters
// @route   POST /api/v1/mail/send
// @access  Private
router.post('/send', authMiddleware, verifyAccountMiddleware, sendMail, sendMailInstanceAndReturnJSON())

// PreviewMail Route
// @desc    Preview raw HTML
// @route   POST /api/v1/mail/preview
// @access  Private
router.post('/preview', authMiddleware, verifyAccountMiddleware, previewMailAndReturnJSON())

// @desc    Get all Mails associated with a particular User.
// @route   GET /api/v1/mail/retrieve
// @access  Private
router.get('/retrieve', authMiddleware, verifyAccountMiddleware, retrieveAllMails())

// @desc    Get all Mails associated with a particular User.
// @route   GET /api/v1/mail/zero-count
// @access  Private
router.get('/zero-count', authMiddleware, verifyAccountMiddleware, updateCount())

module.exports = router

//mail.json
// {
//    "subjectLine":"{{random(['Application Remote'], ['DevOps Application'] ,['Senior Developer Role'])}}",
//    "recruiterName": "{{firstName(['male'])}} {{surname(['female'])}}",
//    "recruiterEmail": "{{email([true])}}",
//    "resumeSubmissionDate": "{{date()}}",
//    "companyName": "{{company()}}",
//    "positionType":"{{random(['Backend'], ['Frontend'], ['Custom'] ,['Fullstack'])}}",
//    "templateType" : "{{random(['Email01'], ['Email02'])}}",
// }

// https://mjml.io/try-it-live/8_UeySZ6WU4
