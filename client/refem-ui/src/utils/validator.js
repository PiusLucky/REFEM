/* eslint-disable no-useless-escape */
const validateEmail = (email) => {
  // The last value {2,4} represents anything after the "." in gmail.
  // Like "com" passes a minimum of two and the maximum of 4 (within range).
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};

const validateDate = (date) => {
  // You could use a character class ([./-]) so that the seperators can be any of the defined characters
  const re = /^\d{2}([./-])\d{2}\1\d{4}$/;
  return re.test(date);
};

export {
  validateEmail,
  validateDate,
};
