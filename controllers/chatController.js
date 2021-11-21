const mongoose = require("mongoose");

const ioConnection = (req, res) => {
    io.on("connection", socket => {
        console.log("a new connection");
    })
    console.log("visted /chat")
    res.render("../views/home.ejs")
}

module.exports = {ioConnection};