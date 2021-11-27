const mongoose = require("mongoose");
//const socket = io();

const chatSchema = new mongoose.Schema({
        messages: {
          type: Array
        },
        chatName: {
          type: String
        }
    }, {timestamps: true});

//create the user model
const publicChat = mongoose.model("publicchat", chatSchema);


// const createDBPublic = new publicChat({
//   messages: ["Me: first message ever saved!"],
//   chatName: "publicChat"
// }).save()
//   .then((res) => console.log("savec"))
//   .catch(err => console.log(err + " is err"))
const checkFor50 = () => {publicChat.find({chatName: "publicChat"}, async(err, data) => {
  const result = data[0];
  console.log(result);
  const messagesResult = result.messages;
  let newArrResult = [];
  if(messagesResult.length > 100){
    newArrResult = [];
    for(let i = 0; i < 100; i++){
      newArrResult.push(messagesResult[messagesResult.length - i]);
    }
  const messagesArrayDB = messagesResult; 
  console.log(messagesArrayDB + "is arr")
  publicChat.update(
    {
      chatName: "publicChat"
    }, 
    {
      messages: newArrResult
    }, (err, updateData) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(updateData + " sucess removed some messages > 50")
      }
    })
  console.log(result.messages[0] + "are the messages");
}})}

function loadChatContent(req, res){
  //checkFor50();
  console.log("/load chat requested why not woooooooooorking")
  publicChat.find({chatName: "publicChat"}, async(err, data) => {
    const result = data[0];
    console.log(result);
    const messagesResult = result.messages;
    res.json({messages: messagesResult})
    console.log(result.messages[0] + "are the messages");
  })
}

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

const addMessage = (req, res) => {
    checkFor50();
    publicChat.find({chatName: "publicChat"}, async(err, data) => {
    const result = data[0];
    const messagesResult = result.messages;
    
  const messagesArrayDB = messagesResult;
  console.log(messagesArrayDB + "is arr")
  messagesArrayDB.push(req.body.message);
  console.log(messagesArrayDB)
  publicChat.update(
    {
      chatName: "publicChat"
    }, 
    {
      messages: messagesArrayDB
    }, (err, updateData) => {
      if(err){
        res.json({sucess: err})
      }
      else{
        res.json({sucess: "true"})
      }
    })
})
}
module.exports = {loadChatContent, addMessage, ioConnection};