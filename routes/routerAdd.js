const router = require("express").Router();
const addControllers = require("../controllers/addControllers.js");

router.get("/server/:serverName", addControllers.addServer);
router.get("/private/:username", addControllers.addPrivateChat);

module.exports = router;