const mongoose = require("mongoose");

const privateChatSchema = new mongoose.Schema({
  messages: {
    type: Array
  },
  chatName: {
    type: Array,
    unique: true
  },
  users: {
    type: Array
  }
}, { timestamps: true });

const publicChatSchema = new mongoose.Schema({
  messages: {
    type: Array
  },
  chatName: {
    type: Array,
    unique: true
  },
  users: {
    type: Array
  }
}, { timestamps: true });

const privateChat = mongoose.model("privatechat", privateChatSchema);
const publicChat = mongoose.model("publicchat");
const Users = mongoose.model("User");

const addServer = (req, res) => {
  publicChat.find({chatName: req.params.serverName}, async(err, data) => {
    console.log(req.params.privateChat);
    if(err || data[0] == undefined) {
      console.log(err);
      res.status(404).json({sucess: "false"});
    }
    else {
      const newChat = new Users({})
      console.log(data + "is public chat data");
      res.status(200).json({sucess: "true"});
    }
  });
}

const addPrivateChat = (req, res) => {
  Users.find({username: req.params.username}, async(err, data) => {
    console.log(req.params.publicChat);
    if(err || data[0] == undefined) {
      console.log(err);
      res.status(404).json({sucess: "false"});
    }
    else {
      data = data[0];
      const newPrivateChat = new privateChat({
        chatName: [req.session.userName, req.params.username],
        messages: [],
        users: [req.session.userName, req.params.username]
      }).save();
      res.status(200).json({sucess: "true"})
    }
  });
}

module.exports = {addServer, addPrivateChat}