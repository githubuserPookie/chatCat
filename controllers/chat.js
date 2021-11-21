const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer().listen(3000);
const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("a new connection");
})