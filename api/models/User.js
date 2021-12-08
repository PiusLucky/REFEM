const mongoose = require("mongoose");
const md5 = require("md5");
const Role = require("../utils/role");

const ipInfo = new mongoose.Schema({
  ip: {
    type: String
  },
  flag: {
    type: String
  },
  isoCode: {
    type: String
  },
  country: {
    type: String
  },
  dialCode: {
    type: String
  },
});

const UserSchema = new mongoose.Schema(
  {
    //preliminaries
    username: {
      type: String,
      required: true,
      minlength: [6, "Must be at least six(6) characters"],
      maxlength: [20, "Must be at most twenty(20) characters"],
      unique: true,
    },
    firstname: {
      type: String,
      minlength: [2, "Must be at least two(2) characters"],
      maxlength: [20, "Must be at most twenty(20) characters"],
      required: true
    },
    lastname: {
      type: String,
      minlength: [2, "Must be at least two(2) characters"],
      maxlength: [20, "Must be at most twenty(20) characters"],
      required: true
    },
    email: {
      type: String,
      maxlength: [40, "Must be at most forty(40) characters"],
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: [6, "Must be at least six(6) characters"],
      maxlength: [150, "Must be at most 150 characters"],
      required: true,
    },
    repeatPassword: {
      type: String,
      minlength: [6, "Must be at least six(6) characters"],
      maxlength: [150, "Must be at most 150 characters"],
      required: true,
    },
    phoneNumber: {
      type: String,
      minlength: 5,
      maxlength: 18,
      required: true,
    },
    //admin
    role: {
     type: String,
     required: true,
     enum: [Role.User, Role.Admin],
     default: Role.User,
    },
    //token
    resetToken: String,
    expireToken: Date,
    //relations
    ipGeo: {
      type: ipInfo,
      default: {},
    },
    mails: [{
      type: mongoose.Types.ObjectId,
      ref: "mail"
    }],
    resume: {
      type: mongoose.Types.ObjectId,
      ref: "resume"
    }
  },
  { timestamps: true }
);

// Before validating the UserSchema
// Validating is different from saving in the sense that
// pre Validate ==> before validating (checking if the rules specified for a particular field is passed.)
// pre Save => after validating, before saving to database.

// UserSchema.pre("validate", async (next) => {
//   if (this.email) {
//     const avatar = `http://gravatar.com/avatar/${md5(this.email)}?d=identicon`;
//     this.profilePicture = await avatar;
//   }
//   next();
// });

module.exports = mongoose.model("user", UserSchema, "User Collection");
