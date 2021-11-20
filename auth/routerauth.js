const router = require("express").Router();
const bcrypt = require("bcrypt");
const login = require('./loginfunctions.js');
const register = require('./registerfunctions.js');

router.get("/login", login.renderFun);
router.get("/register", register.renderFun);


router.post("/checkRegister", register.registerFun);
router.post("/checkLogin", login.loginFun);

module.exports = router;
