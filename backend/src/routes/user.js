const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//GET: /user/requests/received: Retrieve a list of received connection requests.
// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    //check user is loggedIn or not(userAuth)
    const loggedInUser = req.user;

    //using find: we do find array of connection requests
    const connectionRequests = await ConnectionRequestModel.find({
      //toUserId should be an loggedIn usersId
      toUserId: loggedInUser._id,
      status: "interested", //it gives user of  interested only
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
