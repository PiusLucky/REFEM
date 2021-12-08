const router = require("express").Router();
const ResumeModel = require("../models/Resume");


const uploadResume = async (req, res, next) => {
  req.resume = new ResumeModel();
  next();
}



module.exports = {
  uploadResume
}