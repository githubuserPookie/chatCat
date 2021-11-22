const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use('/public', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const routerAuth = require("./routes/routerAuth.js");
const routerHome = require("./routes/routerHome.js");
const routerChat = require("./routes/routerChat.js");
const router = require("./routes/routerAuth.js");

const dbURI = "mongodb+srv://cmdrpookie:<password>@chatcat.lwhro.mongodb.net/chatcat?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => {
        console.log("connected to db"); 
    })
    .catch((err) => {
        console.log(err);
    });

io.on('connection', (socket) => {
    //gonna have to import a module here instead of writting all this in app.js
    //socket.emit('message', 'Welcome to chat cat')
    //io.emit('message', 'a new user connected');
    socket.on('disconnect', (socket) => {
        // io.emit('message', 'a user left the chat')
    })
    socket.on("clientMessage", msg => {
        io.emit('message', msg)
    })
})

app.use('/home', routerHome);
app.use('/auth', routerAuth);
app.use('/chat', routerChat);


app.get("/", (req, res) => {
    res.redirect("../auth/login");
});

server.listen(3000, () => {console.log("server lsitenning on port 3000")});