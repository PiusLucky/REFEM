/* eslint-disable no-useless-escape */
const validateEmail = (email) => {
  // The last value {2,7} represents anything after the "." in gmail.
  // Like "com" passes a minimum of two and the maximum of 7 (within range).
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
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

const validateDate = (date) => {
  // You could use a character class ([./-]) so that the seperators can be any of the defined characters
  const re = /^\d{2}([./-])\d{2}\1\d{4}$/;
  return re.test(date);
};

export {
  validateEmail,
  validateDate,
  lengthValidator,
  strengthChecker
};
