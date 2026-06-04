const { request, response } = require("express");

module.exports = function CheckAuth(req = request, res = response, next) {
  const { userId } = req.session;
  if (!userId) {
    req.flash('message', "É necessario estar logado")
    res.redirect("/");
  }
  next();
};
