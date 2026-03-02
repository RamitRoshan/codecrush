const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

//send connection req APIs POST /request/send/:status/:toUserId(dynamic inter, reject anything can be there), userAuth(middleware ,loggedIn userAuth)
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //leggedIN user and this is user who sends connection
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //toUser exist check(Check valid ObjectId)
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        //if toUser does not exist
        return res.status(400).json({
          message: "User not found!",
        });
      }

      //Status Check
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:" + status });
      }

      // If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Already sent the connection request before" });
      }

      //new instance of a connection req. models
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      //save this connection req models in db
      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request Sent Successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

// POST /request/send/ignored/:toUserId APIs
// requestRouter.post("");

module.exports = requestRouter;
