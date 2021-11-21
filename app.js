const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use('/public', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const routerAuth = require("./routes/routerAuth.js");
const routerHome = require("./routes/routerHome.js");
const routerChat = require("./routes/routerChat.js");

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
app.use('/chat', routerChat);


app.get("/", (req, res) => {
    res.redirect("../auth/login");
});

app.listen(3000);