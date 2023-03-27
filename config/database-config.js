const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect("mongodb://localhost/chatapp");
  console.log("monogodb database connected");
};

module.exports = connect;
