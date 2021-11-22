const mongoose = require("mongoose");
//const socket = io();

const ioConnection = (req, res) => {
    socket.on("connection", socket => {
        console.log("a new connection");
    })
    console.log("visted /chat")
    res.render("../views/home.ejs")
}

module.exports = {ioConnection};