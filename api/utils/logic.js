const dotenv = require("dotenv");

dotenv.config();

const validateEmail = (email) => {
  // The last value {2,4} represents anything after the "." in gmail.
  // Like "com" passes a minimum of two and the maximum of 4 (within range).
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};

const strengthChecker = (password) => {
  // The strong and weak password Regex pattern checker
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  if (strongPassword.test(password)) {
    return {
      status: "strong",
    };
  } else if (mediumPassword.test(password)) {
    return {
      status: "medium",
    };
  } else {
    return {
      status: "weak",
    };
  }
};

const lengthValidator = (str, req_max, req_min) => {
  // str => String
  // req_max => required maximen length specified in the schema
  // req_min => required minimum length specified in the schema\
  if (str) {
    if (str.length >= req_min && str.length <= req_max) {
      return true;
    }
  }
  return false;
};

const cleanBytes = (bytes, decimals = 2) => {
  if (bytes < process.env.MAX_RESUME_UPLOAD_SIZE) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
};

module.exports = {
  validateEmail,
  strengthChecker,
  lengthValidator,
  cleanBytes,
};
