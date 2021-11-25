const mongoose = require("mongoose");
//const socket = io();

const chatSchema = new mongoose.Schema({
        message: {
          type: String
        }
    }, {timestamps: true});

//create the user model
const publicChat = mongoose.model("publicchat", chatSchema);


// publicChat.find({chatName: "publicChat"}, async(err, data) => {
//   //const result = data[0];
//   // const assingResult = Object.assign(result)
//   // console.log(assingResult);
// })


// newMsg = new publicChat({
//   message: "Alex: this is the first message ever send to the db"
// }).save()
//   .then((res) => console.log("saved"))
//   .catch(err => console.log(err + " is err"))

const ioConnection = (req, res) => {
    socket.on("connection", socket => {
        console.log("a new connection");
    })
    console.log("visted /chat")
    res.render("../views/home.ejs")
}

module.exports = {ioConnection};