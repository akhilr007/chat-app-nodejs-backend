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

  socket.on("from_client", () => {
    console.log("event coming from client");
  });
  setInterval(() => {
    socket.emit("from_server");
  }, 2000);
});

server.listen(PORT, () => {
  console.log(`server started and running on ${PORT}`);
});