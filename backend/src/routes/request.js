const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");

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

      const emailRes = await sendEmail.run("A new friend request from " + req.user.firstName,
        req.user.firstName + " is " + status + " in " + toUser.firstName
      );
      console.log(emailRes);

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

// POST /request/review/:status/:requestId APIs(work for accept as well as rejects)
//userAuth middleware, for loggedIn like: user should loggedIn to send connection requests
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      //check user is loggedIn or not
      const loggedInUser = req.user;
      //extract status from req.params
      const { status, requestId } = req.params;

      //validations

      //status check
      const allowedStatus = ["accepted", "rejected"];
      //if not allowed status(accpted,rejected)then, throw error
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not allowed!!" });
      }
      //checking requestId is present on db or not..
      //if gaurav is loggedIn then toUserId should be of gaurav  & status should be interested
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId, // request Id should be valid
        toUserId: loggedInUser._id,
        status: "interested",
      });
      //if we don't find connection req
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found!!" });
      }

      //modifying the status
      connectionRequest.status = status;

      const data = await connectionRequest.save();
      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

module.exports = requestRouter;
