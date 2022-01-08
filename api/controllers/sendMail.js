const router = require("express").Router();
const MailModel = require("../models/Mail");
const UserModel = require("../models/User");

const sendMail = async (req, res, next) => {
  req.mail = new MailModel();
  next();
};

const retrieveAllMails = () => {
  return async (req, res) => {
    const user = await UserModel.findOne(
      { _id: req.user._id },
      "username mails"
    )
      .select("-_id")
      .populate({ path: "mails", model: MailModel });

    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).json({
      msg: "Something went wrong...",
    });
  };
};

const updateCount = async (user) => {
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { "usage.count": 0, "usage.date": new Date() } },
      { new: true }
    );
};

module.exports = {
  sendMail,
  retrieveAllMails,
  updateCount,
};
