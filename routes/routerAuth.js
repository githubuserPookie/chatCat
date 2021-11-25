const router = require("express").Router();
const bcrypt = require("bcrypt");

const login = require('../controllers/loginControllers.js');
const register = require('../controllers/registerControllers.js');

router.get("/login", login.renderFun);
router.get("/register", register.renderFun);
router.get("/checkIfLogin", login.checkIfLogInFun);
router.get("/logout", login.logoutFun);

router.post("/checkRegister", register.registerFun);
router.post("/checkLogin", login.loginFun);

module.exports = router;