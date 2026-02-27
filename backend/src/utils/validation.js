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

module.exports = {validateSignupData};