const sessionExpress = require("express-session");
const fs = require("fs");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const mongoose = require("mongoose");

const renderFun = (req, res) => res.render("../views/login.ejs");

const loginFun = (req, res) => {
  console.log("/login requested")
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
                req.session.userName = usernameInput;
                res.json({sucess: "true"})
            }
        }
        //username not found
        else{
            res.json({sucess: "Username not found"})
        }
    })
};

const logoutFun = (req, res) => {
  console.log("/auth/logout requested")
  req.session.userName = null;
  res.redirect("/");
}

const checkIfLogInFun = (req, res) => {
  console.log("check logi");
  if(req.session.userName){
    res.json({sucess: "true", userName: req.session.userName});
  }
  else{
    res.json({sucess: "false"});
  }
}

module.exports = {logoutFun, renderFun, loginFun, checkIfLogInFun};