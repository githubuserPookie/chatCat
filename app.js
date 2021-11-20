const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use('/static', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
const routerAuth = require("./auth/routerauth.js");
const routerHome = require("./home/routerHome.js");
const dbURI = "mongodb+srv://cmdrpookie:<password>@chatcat.lwhro.mongodb.net/chatcat?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });
app.use('/home', routerHome);
app.use('/auth', routerAuth);


app.get("/", (req, res) => {
    res.redirect("../auth/login");
});
app.listen(3000);
