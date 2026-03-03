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

//connection APIs(when I sent request then it give res, who accepted my request)
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    //get all the connections, both status: accepted but like: elon accpted request bt he send request to donald trump also
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    //clean-up unneccssary and modify data
    const data = connectionRequests.map((row) => {
      //checking each rows
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

//  GET /user/feed - Gets you the profiles of other users on platform

module.exports = userRouter;
