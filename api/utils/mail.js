const UserModel = require("../models/User");
const MailModel = require("../models/Mail");
const { validateEmail, lengthValidator } = require("./logic");
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

const getUserData = async (param) => {
  const user = await UserModel.findOne({ _id: param.userId })
    .select([
      "-_id",
      "-__v",
      "-password",
      "-repeatPassword",
      "-resetToken",
      "-expireToken",
    ])
    .populate("ipGeo", "mails", "resume");
  return user;
};

const getUserResumeData = async (param) => {
  const user = await UserModel.findOne({ _id: param.userId })
    .select(["resume"])
    .populate("resume");
  return user;
};

const updateUserWithMails = async (req) => {
  const newMail = await MailModel.create(req.mail);
  const newMailId = await newMail._id;
  const userUpdate = await UserModel.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { mails: newMailId } },
    { new: true }
  );
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

    // try {
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

        const mainSender = await getUserData(req.params);
        const userResume = await getUserResumeData(req.params);

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

        const execEmail = await sendMail(userResume, hybridData, transporter);
        res.status(execEmail.status).json(execEmail);
      }
    // } catch (err) {
    //   res.status(400).json({
    //     msg: "Something went wrong!",
    //     err: err,
    //   });
    // }
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
  // try {
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
  // } catch (err) {
  //   return {
  //     status: 400,
  //     message: "Something went wrong. Try again.",
  //     sent: false,
  //     err: err,
  //   };
  // }
};

module.exports = {
  sendMailInstanceAndReturnJSON,
};
