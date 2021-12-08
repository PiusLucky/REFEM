const router = require("express").Router();
const MailModel = require("../models/Mail");
const UserModel = require("../models/User");


const sendMail = async (req, res, next) => {
  req.mail = new MailModel();
  next();
}

const retrieveAllMails = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.userId }, 'username mails').populate({path: "mails", model: UserModel})
  if(user) {
      res.status(200).json(user)
  } 
  res.status(400).json({
      msg:"Something went wrong..."
  })
}






module.exports = {
  sendMail,
  retrieveAllMails
}