const router = require("express").Router();
const bcrypt = require("bcrypt");
const home = require('../controllers/homeControllers.js');

router.get("/", home.renderHome)
router.post("/", home.renderHome)

module.exports = router;
