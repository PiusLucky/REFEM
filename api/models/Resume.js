const mongoose = require("mongoose");


const ResumeSchema = new mongoose.Schema(
  {
    initial: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: false,
    },
    format: String,
    hasCV: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: false,
    },
    link: String
  },
  { timestamps: true }
);


module.exports = mongoose.model("resume", ResumeSchema, "Resume Collection");
