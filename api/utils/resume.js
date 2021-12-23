const UserModel = require("../models/User");
const ResumeModel = require("../models/Resume");
const { validateEmail, lengthValidator, cleanBytes } = require("./logic");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
//size (Must not be larger than 2MB => 2,097,152 Bytes)
const RESUME_UPLOAD_SIZE = process.env.MAX_RESUME_UPLOAD_SIZE;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});


const updateUserWithResume = async (req, fmt, url) => {
  try {
    const apiKey = req.headers["api-key"];
    //upsert allows mongoose to create a new instance if no resume instance (with initial filter) exists.
    const resumeInstance = await ResumeModel.findOneAndUpdate(
      { initial: false },
      { $set: { initial: true, format: fmt, hasCV: true, link: url } },
      //new:::  return modified data (new document), upsert:::  create new model instance if the filter fails.
      { new: true, upsert: true }
    );

    const newResumeId = resumeInstance._id;
    const userUpdate = req.user._id
      ? await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { resume: newResumeId } },
          { new: true }
        )
      : await UserModel.findOneAndUpdate(
          { apiKey },
          { $set: { resume: newResumeId } },
          { new: true }
        );
    return userUpdate;
  } catch (err) {
    console.log(err);
  }
};

const saveResumeInstanceAndReturnJSON = () => {
  return async (req, res) => {
    const file = await req.files;

    if (!file) {
      return res.status(400).json({
        msg: "File Empty",
        _help: "Please upload a file and try making a request again.",
      });
    }

    const fileData = Object.values(file)[0];

    //mimetype
    const allowedMimeType = ["application/pdf", "image/jpeg", "image/png"];

    const fileSize = fileData.size;

    const user = req.user._id
      ? await UserModel.findOne(
          { _id: req.user._id }
        )
      : await UserModel.findOne(
          { apiKey }
        );
      
    const userId = user._id

    const specFilePath = `resume/users/${userId}`;

    if (
      allowedMimeType.includes(fileData.mimetype) &&
      fileSize < RESUME_UPLOAD_SIZE
    ) {
      //delete existing files uploaded to cloudinary
      cloudinary.uploader.upload(
        fileData.tempFilePath,
        { folder: specFilePath, public_id: "resume", overwrite: true },
        async (err, result) => {
          if (result) {
            const { width, height, format, bytes, url } = await result;
            //update resume and user schema
            updateUserWithResume(req, format, url);

            return res.status(201).json({
              width,
              height,
              format,
              bytes: cleanBytes(bytes),
              url,
            });
          } else {
            return res.status(500).json({
              msg: "Upload failed!",
              _help: "This could be due to server error, try again!",
            });
          }
        }
      );
    } else {
      if (!allowedMimeType.includes(fileData.mimetype)) {
        return res.status(415).json({
          msg: "Unsupported Media Type",
          _help:
            "Upload a file with any of these formats (.pdf, .jpeg or .png)",
        });
      }

      if (fileSize >= RESUME_UPLOAD_SIZE) {
        return res.status(413).json({
          msg: "File Size too large: Your file size must stay below 2MB",
          _help:
            "Use sites like 'https://squoosh.app/' or 'https://www.ilovepdf.com/' to optimize your image or pdf respectively!",
        });
      }
    }
  };
};

module.exports = {
  saveResumeInstanceAndReturnJSON,
};
