const fs = require("fs");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const mongoose = require("mongoose");

const renderFun = (req, res) => res.render("../public/login.ejs");

const loginFun = (req, res) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    
    const Users = mongoose.model("User");
    //check db for username
    Users.find({username: usernameInput}, async(err, data) => {
        //will check if user exists
        if(data[0]){
            //look for username's encrypted password
            const usernamesPassword = data[0].password;
            //check for matching input password and encrypted password
            const isValid = await bcrypt.compare(passwordInput, usernamesPassword)
            //is password valid?
            if(isValid == false){
                res.json({sucess: "Incorrect password"});
            }
            //else means username found and password matches
            else{
                res.json({sucess: "true"})
            }
        }
        //username not found
        else{
            res.json({sucess: "Username not found"})
        }
    })
};

module.exports = {renderFun, loginFun};
