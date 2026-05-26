const express = require("express");
const AuthController = require("../controller/authController");
const authRouter = express.Router();

// Frontend
authRouter.get("/login", AuthController.login);
authRouter.get("/register", AuthController.register);
// Backend
authRouter.post("/register", AuthController._register);

module.exports = authRouter;
