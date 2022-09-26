const express = require("express");
const { handleLogin } = require("../controllers/authController");
const { validateEmail } = require("../middlewares/validate");
const authRouter = express.Router();

authRouter.route("/login").post(validateEmail, handleLogin);

module.exports = authRouter;
