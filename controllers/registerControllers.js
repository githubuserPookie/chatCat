const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const queryString = require("querystring");
const ejs = require("ejs");
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
const Users = mongoose.model("User", userSchema);
//const {Users} = require("../schemas/userSchema.js"); not working

const renderFun = (req, res) => res.render("../public/register.ejs");

const registerFun = async(req, res) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    if(!usernameInput || typeof usernameInput !== "string"){
        res.json({sucess: "Invalid Username"});
    }
    if(!passwordInput || typeof passwordInput !== "string"){
        res.json({sucess: "Invalid Password"});
    }
    passwordInputHashed = await bcrypt.hash(passwordInput, 10);
    const jhon = new Users({
        username: usernameInput, 
        password: passwordInputHashed})
    jhon.save()
        .then((response) => {
            res.json({sucess: "true"});
            console.log("sucess!");
        })
        .catch((err) => {
            res.json({sucess: "Username already taken"});
            console.log(err)
        })  
};

module.exports = {renderFun, registerFun};
