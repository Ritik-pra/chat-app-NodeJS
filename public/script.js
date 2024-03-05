var socket = io();
socket.on("from_server", () => {
  console.log("from server message");
});

let btn = document.getElementById("btn");
let msginput = document.getElementById("textmsg");
let msgBox = document.getElementById("msgBox");
btn.onclick = function exec() {
  socket.emit("send_msg", { msg: msginput.value });
};

socket.on("received_msg", (data) => {
  let list = document.createElement("li");
  list.innerText = data.msg;
  msgBox.appendChild(list);
});
