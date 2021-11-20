const fs = require("fs");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const mongoose = require("mongoose");

const renderFun = (req, res) => res.render("../public/login.ejs");

const loginFun = (req, res) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    const Users = mongoose.model("User");
    Users.find({username: usernameInput}, async(err, data) => {
        if(data[0]){
            const usernamesPassword = data[0].password;
            async function runtThisSynchronously() {
                const validPasswrord = await bcrypt.compare(passwordInput, usernamesPassword)
                return validPasswrord;
            }
            const isValid = await runtThisSynchronously();
            console.log(isValid);
            if(isValid == false){
                res.json({sucess: "Incorrect password"});
            }
            else{
                res.json({sucess: "true"})
            }
        }
        else{
            res.json({sucess: "Username not found"})
        }
    })
};

module.exports = {renderFun, loginFun};
