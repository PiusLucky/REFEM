const mongoose = require("mongoose");



const MailSchema = new mongoose.Schema(
  {
    subjectLine: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 60,
      trim: true,
    },
    recruiterName: {
      type: String,
      trim: true,
    },
    recruiterEmail: {
      type: String,
      minlength: 6,
      maxlength: 40,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40,
      trim: true,
    },
    positionType: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Fullstack"],
      default: "Frontend",
    },
    templateType: {
      type: String,
      required: true,
      enum: ["Email01", "Email02"],
      default: "Email01",
    },
    resumeSubmissionDate: {
      type: Date,
      required: true,
    },
    timeSinceSubmitted: String,
  },
  { timestamps: true }
);


// ### Snapshot of required subjectLine ###
// Experienced Frontend Engineer
// Front End Engineer
// Node.js Developer
// Senior WordPress Engineer
// iOS Developer
// Senior Ruby on Rails Developer
// Senior Front-End Developer
// Full Stack Developer
// Senior Backend Engineer
// Senior React Native Engineer
// React.js (Node.js) TypeScript FE/FS Engineer

// https://demo.mobiscroll.com/javascript/calendar/half-day-styling#
module.exports = mongoose.model("mail", MailSchema, "Mail Collection");
