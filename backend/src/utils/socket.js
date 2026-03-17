const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  // Generate a unique room ID using a hash function and sha256 algorithm. This ensures that the room ID is unique and secure.
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //using `io` we will receive(listen) the connections
  io.on("connection", (socket) => {
    //Handle events (event handlers )
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      //creating separrate rooms for each user, so that we can send messages to specific users.
      // const roomId = [userId, targetUserId].sort().join("_");
      const roomId = getSecretRoomId({ userId, targetUserId });

      console.log(firstName + " User joined room: ", roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        // const roomId = [userId, targetUserId].sort().join("_");

        // Save messages to the database here.
        try {
          const roomId = getSecretRoomId({ userId, targetUserId });
          console.log(firstName + " " + text);

          // Check if userID and targetUserId are friends, if not, we should not allow them to send messages to each other. This is a security measure to prevent unauthorized access to chats.
          const connectionRequest = await ConnectionRequest.findOne({
            fromUserId: userId,
            toUserId: targetUserId,
            status: "accepted",
          });
          if (!connectionRequest) {
            throw new Error("You can only send messages to your connections!");
          }

          

          let chat = await Chat.findOne({
            // $all means all the people here should be the participants of the chat.
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            timestamp: new Date(),
          });
        } catch (err) {
          throw new Error(
            "Failed to save message to the database: " + err.message,
          );
        }

        // io.to(roomId).emit("messageReceived", { firstName, text });
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
