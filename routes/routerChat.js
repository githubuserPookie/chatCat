const router = require("express").Router();
const chat = require("../controllers/chatController.js")

router.get("/", (req, res) => {
    res.render("../views/chat.ejs");
})

module.exports = router;