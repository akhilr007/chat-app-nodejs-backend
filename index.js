const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use("/", express.static(__dirname + "/public"));

const PORT = 8000;

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("msg_send", (data) => {
    console.log(data);
    io.emit("msg_rcvd", data); // all are receiving messages
    //socket.broadcast.emit("msg_rcvd", data); // who is sending will not receive the message
  });
});

server.listen(PORT, () => {
  console.log(`server started and running on ${PORT}`);
});
