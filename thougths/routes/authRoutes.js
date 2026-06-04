const express = require("express");
const AuthController = require("../controller/authController");
const authRouter = express.Router();

// Frontend
authRouter.get("/login", AuthController.login);
authRouter.get("/register", AuthController.register);
authRouter.get("/logout", AuthController.logout);
// Backend
authRouter.post("/register", AuthController._register);
authRouter.post("/login", AuthController._login);

module.exports = authRouter;
