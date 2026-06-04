const express = require("express");
const ToughtController = require("../controller/toughtsController.js");
const toughtRouter = express.Router();

toughtRouter.get("/", ToughtController.showTought);

module.exports = toughtRouter;
