const express = require("express");
const ToughtController = require("../controller/toughtsController.js");
const toughtRouter = express.Router();

const checkAuth = require("../helpers/checkAuth.js");

toughtRouter.get("/create", checkAuth, ToughtController.addTought);
toughtRouter.get("/edit/:id", checkAuth, ToughtController.editTought);
toughtRouter.get("/dashboard", checkAuth, ToughtController.dashboard);
//
toughtRouter.post("/create", checkAuth, ToughtController._createTought);
toughtRouter.post("/edit", checkAuth, ToughtController._editTought);
toughtRouter.post("/delete", checkAuth, ToughtController._deleteTought);

module.exports = toughtRouter;
