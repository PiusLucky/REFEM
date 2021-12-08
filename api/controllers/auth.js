const router = require("express").Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/auth");
const { validateEmail, strengthChecker } = require("../utils/logic");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const dotenv = require("dotenv");

dotenv.config();

const SECRET = process.env.SECRET;
const USER = process.env.GMAIL_APP_USER;
const PASS = process.env.GMAIL_APP_PASSWORD;
const HOST = process.env.GMAIL_HOST;
const PORT = process.env.GMAIL_PORT;

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  req.user = new UserModel();
  next();
};

// @desc    Login an existing user
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const user_detect_1 = await UserModel.findOne({
      username: req.body.username_email.toLowerCase(),
    });
    const user_detect_2 = await UserModel.findOne({
      email: req.body.username_email.toLowerCase(),
    });

    !user_detect_1 && !user_detect_2 && res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user_detect_1 ? user_detect_1.password : user_detect_2.password
    );
    !validPassword && res.status(400).json("Wrong password");
    
    // What you specify here is what the payload will look like
    const token = jwt.sign(
      {
        id: user_detect_1
          ? user_detect_1._id
          : user_detect_2._id,
        role: user_detect_1
          ? user_detect_1.role
          : user_detect_2.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(500).json({
      msg: "Sorry, can't log in at this time. Try again later!",
      _help: "Check the internet connectivity (or strength) of your device.",
    });
  }
};

// @desc    Can't remember password? Send mail for reset.
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //check if email passes the validation check
  const realEmail = validateEmail(email);

  if (!realEmail) {
    return res.status(400).json({
      msg: "Email not in correct format",
      _help: "Use email like johndoe@gmail.com",
    });
  }

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    auth: {
      user: USER,
      pass: PASS,
    },
    secure: true,
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      return res.json(err);
    }

    const token = buffer.toString("hex");

    const specific_user = await UserModel.findOne({ email: email });

    if (!specific_user) {
      return res.status(422).json({
        error: `User with email "${email}" does not exist in our database`,
      });
    }

    specific_user.resetToken = token;
    /** 
      Use this link => https://www.online-toolz.com/tools/date-functions.php
      Reset Token will expire in the next one hour.
        1637544994000 = Mon Nov 22 2021 02:36:34 GMT+0100 (West Africa Standard Time)
        1637544994000 + 3600000 = Mon Nov 22 2021 03:36:34 GMT+0100 (West Africa Standard Time)
    */
    specific_user.expireToken = Date.now() + 3600000;

    const sendEmail = await sendMail(specific_user, transporter);

    if (sendEmail.status) {
      return res.json({ message: sendEmail.message });
    }
    return res.json({ message: sendEmail.message });
  });
};

// @desc    Reset an existing user password
// @route   POST /api/v1/auth/password-reset
// @access  Public
const resetPassword = async (req, res) => {
  const query = req.query;
  const sentToken = query.token;
  const password = req.body.password;

  const { status } = strengthChecker(password);
  if (status === "strong" || status === "medium") {
    const user = await UserModel.findOne({
      resetToken: sentToken,
      // Check if the expireToken(in time) in database is greater than the current time.
      expireToken: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(422).json({ error: "Try again session expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      user.password = hashedPassword;
      user.resetToken = "";
      user.expireToken = "";
      updatedUser = await user.save();
      res.status(200).json({
        message: "Password Updated successfully!",
      });
    } catch (err) {
      res.status(400).json({
        message: "Failed to update password",
        err: err,
      });
    }
  }else {
    res.status(400).json({
      message: "Your Password is too weak, try adding symbols!"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
