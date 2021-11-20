const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use('/static', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const routerAuth = require("./routes/routerAuth.js");
const routerHome = require("./routes/routerHome.js");

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
