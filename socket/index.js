const io = require("socket.io")(4400, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected.");
  io.emit("welcome", "hello this is socket server!");
});
