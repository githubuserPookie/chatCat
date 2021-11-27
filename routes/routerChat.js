const router = require("express").Router();
const chat = require("../controllers/chatController.js")

router.get("/", (req, res) => {
    res.render("../views/chat.ejs");
})
router.get("/loadData", chat.loadChatContent)
router.post("/addMessage", chat.addMessage)

module.exports = router;