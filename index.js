const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.use("/", express.static(__dirname + "/public"));
server.listen(3000, () => {
  console.log("server started");
});

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);

  socket.on("from_client", () => {
    console.log("from client");
  });

  setInterval(() => {
    socket.emit("from_server");
  }, 2000);
});
