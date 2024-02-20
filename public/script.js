var socket = io();
socket.on("from_server", () => {
  console.log("from server message");
});

let btn = document.getElementById("btn");
btn.onclick = function exec() {
  socket.emit("from_client");
};
