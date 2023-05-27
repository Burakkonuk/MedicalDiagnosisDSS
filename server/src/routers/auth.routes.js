const router = require("express").Router();
const cors = require('cors')
const {
  login,
  register,
  me,
  verifyemail,
  addTestGroup,
  addTest,
  addPrediagnoses,
  addStrategy,
  tooarr,
  getUserById
} = require("../controllers/auth.controller");
const authValidation = require("../middlewares/validations/auth.validation");
const { tokenCheck, verifyEmail } = require("../middlewares/auth");

router.post("/login", verifyEmail, authValidation.login, login);

router.post("/register", authValidation.register, register);

router.get("/me", tokenCheck, me);

router.get("/verify-email", verifyemail);

router.post("/add-test-group", addTestGroup)

router.post("/add-test", addTest)

router.post("/add-prediagnoses", addPrediagnoses)

router.post("/add-strategy", addStrategy)

router.get("/temp", tooarr)

router.get("/getUserById", getUserById)


module.exports = router;