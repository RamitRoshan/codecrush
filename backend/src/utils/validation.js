const validator = require("validator");

//validation fns
const validateSignupData = (req) => {
  //we'll extract these things from req.body
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  //if emailId is not valid
  else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];
  //loopin all these fields (boolean)
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );
  return isEditAllowed; //return boolean value
};
module.exports = { validateSignupData, validateEditProfileData };
