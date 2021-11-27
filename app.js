const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use('/public', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
//app.use(cookieParser());
app.use(expressSession({
  secret: "secret-key",
  resave: false,
  saveUninitialized: false
}))

const routerAuth = require("./routes/routerAuth.js");
const routerHome = require("./routes/routerHome.js");
const routerChat = require("./routes/routerChat.js");
const router = require("./routes/routerAuth.js");

const dbURI = "mongodb+srv://cmdrpookie:rKtJyOkUHw52WsZ6@chatcat.lwhro.mongodb.net/chatcat?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => {
        console.log("connected to db"); 
    })
    .catch((err) => {
        console.log(err);
    });

io.on('connection', (socket) => {
  socket.on("clientMessage", msg => {
      io.emit('message', msg)
  })
})

app.use('/home', routerHome);
app.use('/auth', routerAuth);
app.use('/chat', routerChat);


app.get("/", (req, res) => {
    res.redirect("../home");
});

server.listen(3000, () => {console.log("server lsitenning on port 3000")});