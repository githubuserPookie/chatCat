const mongoose = require("mongoose");

//create the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    firends: {
        type: Array
    },
    requests: {
        type: Array
    }
}, {timestamps: true});

//create the user model
const Users = mongoose.model("User", userSchema);

//export the model
module.exports = { Users, userSchema};