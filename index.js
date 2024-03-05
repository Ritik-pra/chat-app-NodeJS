const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const connect = require("./config/database-connect");
const Chat = require("./models/chat");

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomid", async (req, res) => {
  const chats = await Chat.find({
    roomId: req.params.roomid,
  }).select("content user");
  console.log(chats);
  res.render("index", { name: "sanket", id: req.params.roomid, chats: chats });
});

server.listen(3000, async () => {
  console.log("server started");
  await connect();
});

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);

  socket.on("send_msg", async (data) => {
    io.to(data.roomid).emit("received_msg", data);
    await Chat.create({
      content: data.msg,
      user: data.username,
      roomId: data.roomid,
    });
  });

  socket.on("typing", (data) => {
    socket.broadcast.to(data.roomid).emit("someoneTyping");
  });

  socket.on("join_room", (data) => {
    socket.join(data.roomid);
  });
});
