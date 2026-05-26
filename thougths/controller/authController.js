const { request, response } = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async _register(req = request, res = response) {
    const { name, email, password, confirmPassword } = req.body;

    // Verificação da senha
    if (password != confirmPassword) {
      req.flash("message", "as senhas não coincidem!");
      res.render("auth/register");

      return;
    }

    // Verificar usuario
    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      req.flash("message", "O email ja esta em uso");
      res.render("auth/register");

      return;
    }

    // Criptografar senha
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });

      // session
      // @ts-ignore erro de propriedade
      req.session.userId = user.id;

      req.flash("message", "Registro realizado");

      req.session.save(() => {
        res.redirect("/");
      });

      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }

  
}

module.exports = AuthController;
