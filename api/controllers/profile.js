const UserModel = require("../models/User");
const { lengthValidator } = require("../utils/logic");

const updateProfile = () => {
  return async (req, res) => {
    const { firstname, lastname, phoneNumber } = req.body;

    let user = req.user;

    firstnameSanitized = firstname.toLowerCase().trim();
    lastnameSanitized = lastname.toLowerCase().trim();

    //validate firstname length
    const realFirstname = lengthValidator(firstnameSanitized, 20, 2);
    if (!realFirstname)
      return res.status(400).json({
        msg: "First name is not valid!",
        _help:
          "First name must have a minimum of 2 and maximium of 20 characters.",
      });

    //validate lastname length
    const realLastname = lengthValidator(lastnameSanitized, 20, 2);
    if (!realLastname)
      return res.status(400).json({
        msg: "Last name is not valid!",
        _help:
          "Last name must have a minimum of 2 and maximium of 20 characters.",
      });

    //validate phone number length
    const realPhone = lengthValidator(phoneNumber, 18, 5);
    if (!realPhone)
      return res.status(400).json({
        msg: "Phone number not valid!",
        _help:
          "Phone number must have a minimum of 5 and maximium of 18 characters.",
      });

    if (realFirstname) {
      user.firstname = firstnameSanitized;
    }

    if (realLastname) {
      user.lastname = lastnameSanitized;
    }

    if (realPhone) {
      user.phoneNumber = phoneNumber;
    }

    user.save();
    res.status(200).json({
      msg: "Profile Updated successfully!",
    });
  };
};



const getProfile = () => {
  return async (req, res) => {
    let user = req.user;
    return res.status(200).json(user);
  };
};



module.exports = {
  updateProfile,
  getProfile,
};
