const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const queryString = require("querystring");
const ejs = require("ejs");

const renderFun = (req, res) => res.render("../views/register.ejs");

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
        },
        servers: {
          type: Array
        }
    }, {timestamps: true});

//create the user model
const Users = mongoose.model("User", userSchema);

const registerFun = async(req, res) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
     
    //check to see if username and password are valid
    if(!usernameInput || typeof usernameInput !== "string"){
        res.json({sucess: "Invalid Username"});
    }
    if(!passwordInput || typeof passwordInput !== "string"){
        res.json({sucess: "Invalid Password"});
    }
    
    //hash password
    passwordInputHashed = await bcrypt.hash(passwordInput, 10);
    const createdUser = new Users({
        username: usernameInput, 
        password: passwordInputHashed,
        servers: ["publicChat"]}
        )
    //save new user to db
    createdUser.save()
        .then((response) => {
            res.json({sucess: "true"});
        })
        .catch((err) => {
            res.json({sucess: "Username already taken"});
        })  
};

module.exports = {renderFun, registerFun};
