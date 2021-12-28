const mongoose = require("mongoose");
const md5 = require("md5");
const Role = require("../utils/role");
const keyGenerator = require("../utils/keyGenerator");



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


const usageStat = new mongoose.Schema({
  count: {
    type: Number,
    minlength: 0,
    maxlength: process.env.MAX_API_CALL, // MAX_API_CALL
    default: 0
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const UserSchema = new mongoose.Schema(
  {
    //preliminaries
    username: {
      type: String,
      required: true,
      minlength: [6, "Must be at least six(6) characters"],
      maxlength: [20, "Must be at most twenty(20) characters"],
      unique: [true, "Username already exists"],
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
    //contacts
    phoneNumber: {
      type: String,
      minlength: 5,
      maxlength: 18,
      required: true,
    },
    email: {
      type: String,
      maxlength: [40, "Must be at most forty(40) characters"],
      unique: true,
      required: true
    },
    //security
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

    //active_status
    isVerified: {
      type: Boolean,
      default: false,
      required: true
    },
    
    //token of active_status
    verifyToken: String,
    vExpireToken: Date,

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
    },
    //api_key
    apiKey: String,
    usage: {
      type: usageStat,
      default: {},
    },
  },
  { timestamps: true }
);

// Before validating the UserSchema
// Validating is different from saving in the sense that
// pre Validate ==> before validating (checking if the rules specified for a particular field is passed.)
// pre Save => after validating, before saving to database.


UserSchema.pre("save", function(next) {
  let user = this;
  if (!user.apiKey) user.apiKey = keyGenerator();
  next();
});


// get the token
// UserSchema.methods.jwtGenerateToken = function(){
//     return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
//         expiresIn: "3h"
//     });
// }



module.exports = mongoose.model("user", UserSchema, "User Collection");
