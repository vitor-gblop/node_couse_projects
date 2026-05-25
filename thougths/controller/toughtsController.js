const Tought = require("../model/Tought");

class ToughtController {
  static showTought(req, res, next) {
    res.send("tought");
  }
}

module.exports = ToughtController;
