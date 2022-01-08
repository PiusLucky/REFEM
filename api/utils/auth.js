const UserModel = require("../models/User");
const { validateEmail, strengthChecker, lengthValidator } = require("./logic");
const bcrypt = require("bcrypt");
// Since countryData.json is static, it is okay to use require to read it's JSON content.
let countryData = require("../json/countryData");
const axios = require("axios");
let { IPinfoWrapper } = require("node-ipinfo");
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

dotenv.config();

const getIpInfo = async () => {
  const IPIFY_LINK = process.env.IPIFY_LINK;
  const IP_INFO_KEY = process.env.IP_INFO_KEY;

  let ipInfo = {};

  try {
    const response = await axios.get(IPIFY_LINK);
    if (response.status === 200) {
      const detectedIp = response.data.ip;
      let ipData = new IPinfoWrapper(IP_INFO_KEY);
      let lookup = await ipData.lookupIp(detectedIp);
      if (lookup.ip || lookup.status === 200) {
        ipInfo = {
          ip: detectedIp,
          isoCode: lookup.countryCode,
          country: lookup.country,
        };
        for (let i = 0; i < countryData.length; i++) {
          if (countryData[i].isoCode === lookup.countryCode) {
            const country = countryData[i];
            ipInfo["flag"] = country.flag;
            ipInfo["dialCode"] = country.dialCode;
            return ipInfo;
          }
        }
      }
    }
  } catch (err) {
    return;
  }

  return ipInfo;
};

const saveUserInstanceAndReturnJSON = () => {
  const FRONTEND_LINK = process.env.FRONTEND_LINK;
  const USER = process.env.GMAIL_APP_USER;
  const PASS = process.env.GMAIL_APP_PASSWORD;
  const HOST = process.env.GMAIL_HOST;
  const PORT = process.env.GMAIL_PORT;

  return async (req, res) => {
    const ipData = await getIpInfo();

    if (!ipData?.hasOwnProperty("ip")) {
      return res.status(500).json({
        msg: "Ip-information retriever failed!",
        _help:
          "This issue has been escalated to our technical unit, it will be fixed soon.",
      });
    }

    const {
      username,
      firstname,
      lastname,
      email,
      password,
      repeatPassword,
      phoneNumber,
    } = req.body;

    let user = req.user;

    const usernameLower = username.toLowerCase();
    const emailLower = email.toLowerCase();

    //mapping model to new instance
    user.username = usernameLower;
    user.firstname = firstname.toLowerCase();
    user.lastname = lastname.toLowerCase();
    user.email = emailLower;
    user.password = password;
    user.repeatPassword = repeatPassword;
    user.phoneNumber = phoneNumber;
    user.ipGeo.ip = ipData.ip;
    user.ipGeo.flag = ipData.flag;
    user.ipGeo.isoCode = ipData.isoCode;
    user.ipGeo.country = ipData.country;
    user.ipGeo.dialCode = ipData.dialCode;

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //check if username already exists
    const usernameExist = await UserModel.findOne({
      username: usernameLower,
    });

    if (usernameExist) {
      return res.status(400).json({
        msg: "Username already exists",
        _help:
          "Try a different username combination by appending a digit or symbol to previous username",
      });
    }

    //validate username length
    const realUsername = lengthValidator(username, 20, 6);
    if (!realUsername)
      return res.status(400).json({
        msg: "Username is not valid!",
        _help:
          "Username must have a minimum of 6 and maximium of 20 characters.",
      });

    //validate firstname length
    const realFirstname = lengthValidator(firstname, 20, 2);
    if (!realFirstname)
      return res.status(400).json({
        msg: "First name is not valid!",
        _help:
          "First name must have a minimum of 2 and maximium of 20 characters.",
      });

    //validate lastname length
    const realLastname = lengthValidator(lastname, 20, 2);
    if (!realLastname)
      return res.status(400).json({
        msg: "Last name is not valid!",
        _help:
          "Last name must have a minimum of 2 and maximium of 20 characters.",
      });

    //check if email passes the validation check
    const realEmail = validateEmail(emailLower);

    //check if email already exists
    const emailExist = await UserModel.findOne({
      email: emailLower,
    });

    if (emailExist) {
      return res.status(400).json({
        msg: "Email already exists",
        _help:
          "Try a different email by appending a digit or symbol to previous email",
      });
    }

    if (!realEmail) {
      return res.status(400).json({
        msg: "Email not in correct format",
        _help: "Use email like john_doe@gmail.com",
      });
    }

    //check if password and repeatPassword is same
    if (password !== repeatPassword)
      return res.status(400).json({
        msg: "Passwords do not match!",
        _help:
          "The password should be the same for Password and confirmPassword fields.",
      });

    //validate phone number length
    const realPhone = lengthValidator(phoneNumber, 18, 5);
    if (!realPhone)
      return res.status(400).json({
        msg: "Phone number not valid!",
        _help:
          "Phone number must have a minimum of 5 and maximium of 18 characters.",
      });

    //check for password strength
    const { status } = strengthChecker(password);
    if (status === "strong" || status === "medium") {
      try {
        user.password = hashedPassword;
        user.repeatPassword = hashedPassword;

        const transporter = nodemailer.createTransport({
          host: HOST,
          port: PORT,
          auth: {
            user: USER,
            pass: PASS,
          },
          secure: true,
          // This will prevent "nodejs - error self signed certificate in certificate chain" in development.
          tls: {
            rejectUnauthorized: false,
          },
        });

        crypto.randomBytes(32, async (err, buffer) => {
          if (err) {
            return res.json(err);
          }
          const isVerified = true;
          const token = buffer.toString("hex");
          user.verifyToken = token;
          /** 
            Use this link => https://www.online-toolz.com/tools/date-functions.php
            Reset Token will expire in the next 30 minutes.
          */
          user.vExpireToken = Date.now() + 1800000;

          user = await user.save();

          if (user) {
            const mail = await sendMail(isVerified, user, transporter);
            if (mail.status === 200) {
              res.status(201).json({
                status: 201,
                msg: `Verification link sent successfully!`,
              });
            }
          }
        });
      } catch (err) {
        res.status(400).json({
          msg: "OOPS...",
          _help: "Try different inputs",
        });
      }
    } else {
      return res.status(400).json({
        msg: "Password is very weak",
        _help: "Try something similar to MyPassword$1234",
      });
    }
  };
};

const sendMail = async (isVerify, user, mailSender) => {
  // try {
    const FRONTEND_LINK = process.env.FRONTEND_LINK;
    const readFile = promisify(fs.readFile);

    let html = await readFile("template/html/email.html", "utf8");

    let template = handlebars.compile(html);

    const savedUser = await user.save();

    const token = isVerify ? savedUser.verifyToken : savedUser.resetToken;
    const email = savedUser.email

    const urlPart = isVerify ? "email-verify" : "password-reset";

    let data = {
      username: savedUser.username,
      full_link: `${FRONTEND_LINK}/${urlPart}?email=${email}&token=${token}`,
      frontend_link: FRONTEND_LINK,
      emailType: !isVerify ? "Reset Password" : "Verify Email",
      headerType: !isVerify ? "PASSWORD RESET" : "VERIFICATION",
      action: !isVerify ? "Password Reset" : "Account Verification",
      tokenExpiration: isVerify ? "30 minutes " : "1 hour ",
    };
    let htmlToSend = template(data);
    const mailOptions = {
      from: "APPLICANT - JOB POSTING <refem.applicants@gmail.com>",
      to: savedUser.email,
      subject: !isVerify ? "Password Reset Request" : "Verify Email",
      html: htmlToSend,
    };
    mailSender.sendMail(mailOptions);
    return {
      status: 200,
      msg:
        "Email Sent succesfully, check your mail inbox (or spam folder).",
      sent: true,
    };
  // } catch (err) {
  //   return {
  //     status: 400,
  //     msg: "Something went wrong. Try again.",
  //     sent: false,
  //     err: err,
  //   };
  // }
};

const setHttpOnlyCookie = async(access, res) => {
  const ENVIRONMENT = process.env.NODE_ENV;
  const options = {
    httpOnly: true,
    // expires in the next 3hours
    expires: new Date(Date.now() + 10800000),
    secure: ENVIRONMENT !== "development",
  };

  res.cookie("authToken", access.token, options);
};

const createCookieCumStatus = async (access, statusCode, res) => {
  await setHttpOnlyCookie(access, res)
  res.status(200).json({
    msg: "Success, Redirecting now..."
  });
};

module.exports = {
  saveUserInstanceAndReturnJSON,
  sendMail,
  createCookieCumStatus,
  setHttpOnlyCookie
};
