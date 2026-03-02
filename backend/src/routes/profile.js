const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//profile view APIs
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//-> /profile/edit APIs
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  //data sanitizations
  try {
    //if profile-data is not valid
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    //edit loggedIn user
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save(); //saving the data in db
    //can use res.send also
    res.json({
        //custom message with firstName
      message: ` ${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser, //send data of user back in patch
    });
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
});

// /profile/password APIs (forgot password APIs)
profileRouter.patch("/profile/password", userAuth, async(req, res) => {

})

module.exports = profileRouter;
