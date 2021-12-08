const UserModel = require("../models/User");
const { validateEmail, strengthChecker, lengthValidator } = require("./logic");
const bcrypt = require("bcrypt");
// Since countryData.json is static, it is okay to use require to read it's JSON content.
let countryData = require("../json/countryData");
const axios = require("axios");
let { IPinfoWrapper } = require("node-ipinfo");
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require('util');
const dotenv = require("dotenv");

dotenv.config();


const getIpInfo = async () => {
  const IPIFY_LINK = process.env.IPIFY_LINK
  const IP_INFO_KEY = process.env.IP_INFO_KEY

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
  return async (req, res) => {
    const ipData = await getIpInfo();

    if (!ipData.hasOwnProperty("ip")) {
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
      phoneNumber
    } = req.body;
    
    let user = req.user;

    //mapping model to new instance
    user.username = username.toLowerCase();
    user.firstname = firstname.toLowerCase();
    user.lastname = lastname.toLowerCase();
    user.email = email.toLowerCase();
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
      username: username,
    });

    if (usernameExist) {
      return res.status(400).json({
        msg: "Username already exists",
        _help:
          "Try a different username by appending a digit or symbol to previous email",
      });
    }

    //check if email passes the validation check
    const realEmail = validateEmail(email);

    //check if email already exists
    const emailExist = await UserModel.findOne({
      email: email,
    });

    if (emailExist) {
      if (emailExist) {
        return res.status(400).json({
          msg: "Email already exists",
          _help:
            "Try a different email by appending a digit or symbol to previous email",
        });
      }
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
    const realPhone = lengthValidator(phoneNumber, 18, 5)
    if (!realPhone)
      return res.status(400).json({
        msg: "Phone number not valid!",
        _help:
          "Phone number must have a minimum of 5 and maximium of 18 characters.",
      });

    //check for password strength
    const { status } = strengthChecker(password);
    if (status === "strong" || status === "medium") {
      // try {
        user.password = hashedPassword;
        user.repeatPassword = hashedPassword;
        user = await user.save();
        res.status(201).json({
          id: user._id,
        });
      // } catch (err) {
      //   res.status(400).json({
      //     msg: "OOPS...",
      //     _help: "Try different inputs",
      //   });
      // }
    } else {
      return res.status(400).json({
        msg: "Password is very weak",
        _help: "Try something similar to MyPassword$1234",
      });
    }




  };
};




const sendMail = async (user, mailSender) => {
  try {
    const API_LINK = process.env.API_LINK
    const readFile = promisify(fs.readFile);

    let html = await readFile("template/html/email.html", "utf8");

    let template = handlebars.compile(html);

    const savedUser = await user.save();

    const token = savedUser.resetToken


    let data = {
      username: savedUser.username,
      full_link: `${API_LINK}/auth/reset-password?token=${token}`
    };
    let htmlToSend = template(data);
    const mailOptions = {
      from: "REFEM - NIGERIA",
      to: savedUser.email,   
      subject: "Password Reset Request",
      html: htmlToSend
    }
    mailSender.sendMail(mailOptions);
    return { 
      message: "Email Sent succesfully, check your mail inbox (or spam folder).", 
      sent: true
    };
  } catch (err) {
    return { 
      message: "Something went wrong. Try again.", 
      sent: false, 
      err: err 
    };
  }
};



module.exports = {
  saveUserInstanceAndReturnJSON,
  sendMail,
};
