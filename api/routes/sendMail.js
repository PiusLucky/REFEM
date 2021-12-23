const express = require('express')
const  { sendMailInstanceAndReturnJSON } = require('../utils/mail')
const  { sendMail, retrieveAllMails } = require('../controllers/sendMail')
const  authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// SendMail Route
// @desc    Send email to recruiters
// @route   POST /api/v1/mail/send/:userId
// @access  Private
router.post('/send', authMiddleware, sendMail, sendMailInstanceAndReturnJSON())

// Get all Mails associated with a particular User.
router.get('/', retrieveAllMails)

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
