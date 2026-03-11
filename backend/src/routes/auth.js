const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signup api for signing the user
authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    //instance of model and using user.save(), user save data in the database model
    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    // add the token to cookie and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

//login APIs
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //check email in db for login
    const user = await User.findOne({ emailId: emailId });
    //if user is not present
    if (!user) {
      throw new Error("Invalid credentials");
    }

    //check password is valid or not
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create  a JWT token, to hide the data inside the token, "999@Ramit" is a secret key as a password
      const token = await user.getJWT();

      // add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
      // res.send("Login Successful!!!!");
    } else {
      throw new Error("Invalid credentials");
    }

    //sanitise email
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//logout APIs
authRouter.post("/logout", async (req, res) => {
  //set token null and expires the cookies just right there(curr time)
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("user logged out successfully!");
});

module.exports = authRouter;
