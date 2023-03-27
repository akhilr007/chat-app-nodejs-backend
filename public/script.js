var socket = io();

let btn = document.getElementById("btn");
let inputMsg = document.getElementById("newmsg");
let messageList = document.getElementById("msglist");

btn.onclick = function exec() {
  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
};

socket.on("msg_rcvd", (data) => {
  let limsg = document.createElement("li");
  limsg.innerText = data.msg;
  messageList.appendChild(limsg);
});
