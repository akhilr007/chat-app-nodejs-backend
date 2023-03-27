const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const connect = require("./config/database-config");
const Chat = require("./models/chat");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

const PORT = 8000;

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log("joining a room", data.roomId);
    socket.join(data.roomId);
  });

  socket.on("msg_send", async (data) => {
    console.log(data);
    const chat = await Chat.create({
      roomId: data.roomId,
      user: data.username,
      content: data.msg,
    });
    io.to(data.roomId).emit("msg_rcvd", data); // all are receiving messages
    //socket.broadcast.emit("msg_rcvd", data); // who is sending will not receive the message
  });
});

app.get("/chat/:roomId", async (req, res) => {
  const chats = await Chat.find({
    roomId: req.params.roomId,
  }).select("content user");
  res.render("index", {
    name: "akhil",
    roomId: req.params.roomId,
    chats: chats,
  });
});

server.listen(PORT, async () => {
  console.log(`server started and running on ${PORT}`);
  await connect();
});
