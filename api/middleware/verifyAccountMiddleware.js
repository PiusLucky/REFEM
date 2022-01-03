const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyAccountMiddleware = async (req, res, next) => {
    const user = req.user
    if (user.isVerified) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({
        msg: "Unverified Account",
        _help:
          "Please verify your account by using the LINK sent to you via mail.",
      });
    }
};

module.exports = verifyAccountMiddleware;
