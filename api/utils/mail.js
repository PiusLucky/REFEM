const UserModel = require("../models/User");
const MailModel = require("../models/Mail");
const { validateEmail, lengthValidator } = require("./logic");
const Role = require("./role");
const bcrypt = require("bcrypt");
// Since countryData.json is static, it is okay to use "require" to read its JSON content.
let countryData = require("../json/countryData");
const axios = require("axios");
let { IPinfoWrapper } = require("node-ipinfo");
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const USER = process.env.GMAIL_APP_USER;
const PASS = process.env.GMAIL_APP_PASSWORD;
const HOST = process.env.GMAIL_HOST;
const PORT = process.env.GMAIL_PORT;
const MAX_API_HOURS = process.env.MAX_API_HOURS;
// A User can only make 50 API calls in a day.
// Admin can make up to 100,000 API calls every 24 hours. 
const MAX_API_CALL = Role.User? process.env.MAX_API_CALL: process.env.MAX_ADMIN_API_CALL

const getUserData = async (req) => {
  const apiKey = req.headers["api-key"];
  const user = req.user._id
    ? await UserModel.findOne({ _id: req.user._id })
    : await UserModel.findOne({ apiKey })
        .select([
          "-_id",
          "-__v",
          "-password",
          "-repeatPassword",
          "-resetToken",
          "-expireToken",
          "-apiKey",
        ])
        .populate("ipGeo", "mails", "resume");
  return user;
};

const getUserResumeData = async (req) => {
  const apiKey = req.headers["api-key"];
  const user = req.user._id
    ? await UserModel.findOne({ _id: req.user._id })
    : await UserModel.findOne({ apiKey }).select(["resume"]).populate("resume");
  return user;
};

const updateUserWithMails = async (req) => {
  const newMail = await MailModel.create(req.mail);
  const newMailId = await newMail._id;
  const apiKey = req.headers["api-key"];

  const userUpdate = req.user._id
    ? await UserModel.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { mails: newMailId } },
        { new: true }
      )
    : await UserModel.findOneAndUpdate(
        { apiKey },
        { $push: { mails: newMailId } },
        { new: true }
      );
  return userUpdate;
};

const isMaxApiCall = async (req) => {
  const user = req.user._id
    ? await UserModel.findOneAndUpdate({ _id: req.user._id }, { new: true })
    : await UserModel.findOneAndUpdate({ apiKey }, { new: true });

  if (user.usage.count >= MAX_API_CALL) {
    return true;
  }
  return false;
};

const updateUserWithUsageStat = async (req) => {
  const apiKey = req.headers["api-key"];
  const userUpdate = req.user._id
    ? await UserModel.findOneAndUpdate({ _id: req.user._id }, { new: true })
    : await UserModel.findOneAndUpdate({ apiKey }, { new: true });

  const initialDate = userUpdate.usage.date;
  // add 24hours to the initial date of usageStat
  const initialDate24 = initialDate
    .setHours(initialDate.getHours() + MAX_API_HOURS)
    .toString();

  if (initialDate24 <= Date.now().toString()) {
    // Checking if it's up to 24 hours since the last usage.count was recorded.
    req.user._id
      ? await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { "usage.count": 0, "usage.date": new Date() } },
          { new: true }
        )
      : await UserModel.findOneAndUpdate(
          { apiKey },
          { $set: { "usage.count": 0, "usage.date": new Date() } },
          { new: true }
        );
  } else {
    req.user._id
      ? await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          { $inc: { "usage.count": 1 } },
          { new: true }
        )
      : await UserModel.findOneAndUpdate(
          { apiKey },
          { $inc: { "usage.count": 1 } },
          { new: true }
        );
  }
  return userUpdate;
};

const sendMailInstanceAndReturnJSON = () => {
  return async (req, res) => {
    const {
      subjectLine,
      recruiterName,
      recruiterEmail,
      resumeSubmissionDate,
      companyName,
      positionType,
      templateType,
    } = req.body;

    //Validators
    const validateSubjectLine = lengthValidator(subjectLine, 60, 6);
    const validateRecruiterName = lengthValidator(recruiterName, 40, 2);
    const validateRecruiterEmail = lengthValidator(recruiterEmail, 40, 6);
    const validateCompanyName = lengthValidator(companyName, 40, 2);

    if (!validateSubjectLine) {
      return res.status(400).json({
        msg: "Enter a valid Subject line",
        _help:
          "SubjectLine must have a minimum of 6 and a maximum of 60 characters",
      });
    }
    if (!validateRecruiterName) {
      return res.status(400).json({
        msg: "Enter a valid recruiterName",
        _help:
          "RecruiterName must have a minimum of 2 and a maximum of 40 characters",
      });
    }
    if (!validateRecruiterEmail) {
      return res.status(400).json({
        msg: "Enter a valid recruiterEmail",
        _help:
          "RecruiterEmail must have a minimum of 6 and a maximum of 40 characters",
      });
    }

    if (!validateCompanyName) {
      return res.status(400).json({
        msg: "Enter a valid companyName",
        _help:
          "CompanyName must have a minimum of 2 and a maximum of 40 characters",
      });
    }

    let mail = req.mail;

    //mapping model to new instance
    mail.subjectLine = subjectLine;
    mail.recruiterName = recruiterName;
    mail.recruiterEmail = recruiterEmail;
    mail.resumeSubmissionDate = resumeSubmissionDate;
    mail.companyName = companyName;
    mail.positionType = positionType;
    mail.templateType = templateType;

    try {
    updateUserWithMails(req);
    if (
      subjectLine &&
      recruiterEmail &&
      resumeSubmissionDate &&
      companyName &&
      positionType &&
      templateType
    ) {
      const transporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        auth: {
          user: USER,
          pass: PASS,
        },
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      });

      const recruiter = recruiterName ? ` ${recruiterName},` : ",";
      const positionTypeStatus =
        positionType === "Frontend"
          ? "user interfaces and great experiences"
          : "applications";

      const emailData = {
        positionType,
        positionTypeStatus,
        subjectLine,
        recruiter,
        recruiterEmail,
        resumeSubmissionDate,
        companyName,
        templateType,
      };

      const mainSender = await getUserData(req);
      const userResume = await getUserResumeData(req);

      const senderData = {
        name: `${mainSender.firstname} ${mainSender.lastname}`,
        phone: mainSender.phoneNumber,
        mail: mainSender.email,
        ...(userResume.resume && {
          attachment: {
            name: `Resume.${userResume.resume.format}`,
            link: userResume.resume.link,
          },
        }),
      };
      const hybridData = {
        email: emailData,
        sender: senderData,
      };

      const maxApiCall = await isMaxApiCall(req);

      if (maxApiCall) {
        return res.status(429).json({
          msg: "Maximum API Calls exceeded!",
          _help: `Here at REFEM, we offer ${MAX_API_CALL} API calls for every ${MAX_API_HOURS} hours`,
        });
      }

      const execEmail = await sendMail(userResume, hybridData, transporter);
      updateUserWithUsageStat(req);
      return res.status(execEmail.status).json(execEmail);
    }
    } catch (err) {
      res.status(400).json({
        msg: "Something went wrong!",
        err: err,
      });
    }
  };
};

const sendMail = async (ms, data, mailSender) => {
  /*  @params
      ms => mainSender async function
      data => Object holding all data to be passed to mail template.
        {
          hybridData //Object
        }
      mailSender => The nodemailer transporter Object
    */
  try {
  const readFile = promisify(fs.readFile);
  let html =
    data.email.templateType === "Email01"
      ? await readFile(`template/employerEmail/email.html`, "utf8")
      : await readFile(`template/employerEmail/email2.html`, "utf8");

  let template = handlebars.compile(html);

  let htmlToSend = template(data);
  const mailOptions = {
    from: "APPLICANT - JOB POSTING <refem.applicants@gmail.com>",
    // An email address that will appear on the Reply-To: field
    replyTo: data.sender.mail,
    to: data.email.recruiterEmail,
    subject: data.email.subjectLine,
    html: htmlToSend,
    ...(ms.resume && {
      attachments: [
        {
          filename: data.sender.attachment.name,
          path: data.sender.attachment.link,
        },
      ],
    }),
  };
  mailSender.sendMail(mailOptions, (err, info) => {
    if (err) {
      return {
        status: 400,
        message: "Opps...Sending Email failed!",
        sent: false,
        err: err,
      };
    }
    return {
      status: 200,
      message:
        "Email Sent succesfully. You can check your dashboard to see Mail History!",
      sent: true,
    };
  });
  return {
    status: 200,
    message:
      "Email Sent succesfully. You can check your dashboard to see Mail History!",
    sent: true,
  };
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong. Try again.",
      sent: false,
      err: err,
    };
  }
};

module.exports = {
  sendMailInstanceAndReturnJSON,
};
