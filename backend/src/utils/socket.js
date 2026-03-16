const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //using `io` we will receive(listen) the connections
  io.on("connection", (socket) => {

    //Handle events (event handlers )
    socket.on("joinChat", () => {

    });

    socket.on("sendMessage", () => {

    });

    socket.on("disconnect", () => {

    });

  });
};

module.exports = initializeSocket;
