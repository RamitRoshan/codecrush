const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//send connection request APIs (hit the APIs only when user is loggedIn)
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //read the user
  const user = req.user;

  //sending a connection request
  console.log("sending a connection request");
  res.send(user.firstName + " sent the connection request");
});

module.exports = requestRouter;
