const express = require("express");
const AuthController = require("../controller/authController");
const authRouter = express.Router();

authRouter.get("/login", AuthController.login);
authRouter.get("/register", AuthController.register);

module.exports = authRouter;
