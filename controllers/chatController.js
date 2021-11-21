const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
server.listen(3000);
const io = require("socket.io")(server);

const ioConnection = (req, res) => {
    io.on("connection", socket => {
        console.log("a new connection");
    })
    console.log("visted /chat")
    res.render("../views/home.ejs")
}

module.exports = {ioConnection};