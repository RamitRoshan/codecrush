const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //role of middleware is to READ the token from the req cookies

  try {
    //checking, if token is present or not
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    //validate the token
    const decodedObj = await jwt.verify(token, "999@Ramit");

    const { _id } = decodedObj;

    //if _id is present
    const user = await User.findById(_id);
    //if user is not present
    if (!user) {
      throw new Error("User not found");
    }
    //next is called to move on req handler
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
