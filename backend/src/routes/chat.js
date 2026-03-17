const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");

const chatRouter = express.Router();

//userAuth is a middleware function, it will show only the chat when user is logged in, otherwise it will return an error response.
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params; //params is used to get the targetUserId from the URL, which is the ID of the user we want to chat with.

  const userId = req.user._id; // we get the userId from the authenticated user, which is set in the userAuth middleware.

  try {
    // Find the chat between the two users
    let chat = await Chat.findOne({
      // $all means all the people here should be the participants of the chat.
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName", // Select only the firstName and lastName fields of the senderId
    });

    // if chat is not found, we create empty chat with the participants and save it to the database. This ensures that a chat is always available for the two users, even if they haven't exchanged any messages yet.
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    // we use res.json to send the chat object as a response to the client.
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat: " + err.message });
  }
});

module.exports = chatRouter;
