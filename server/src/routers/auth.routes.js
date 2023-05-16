const router = require("express").Router();
const { login, register, me, main, algorithm} = require("../controllers/auth.controller");
const authValidation = require("../middlewares/validations/auth.validation");
const {tokenCheck} = require("../middlewares/auth")

router.post("/login", authValidation.login, login);

router.post("/register", authValidation.register, register);

router.post("/algorithm",algorithm);

router.get("/me", tokenCheck, me);



module.exports = router;
