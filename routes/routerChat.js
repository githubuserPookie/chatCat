const router = require("express").Router();
const chat = require("../controllers/chatController.js")

router.get("/", chat.ioConnection)

module.exports = router;