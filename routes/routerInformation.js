const router = require("express").Router();
const bcrypt = require("bcrypt");
const information = require('../controllers/informationControllers.js');

router.get("/", information.renderInformation)
router.post("/", information.renderInformation)

module.exports = router;