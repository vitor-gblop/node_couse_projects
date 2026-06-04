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
  static logout(req = request, res = response) {
    req.session.destroy(() => {});
    res.redirect("/login");
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
      // @ts-ignore - erro de propriedade id
      req.session.userId = user.id;

      req.flash("message", "Registro realizado");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async _login(req = request, res = response) {
    const { email, password } = req.body;

    // Verificar usuario
    const userExists = await User.findOne({
      where: { email },
    });
    console.log(userExists);

    if (!userExists) {
      req.flash("message", "O email não esta registrado");
      res.render("auth/register");

      return;
    }

    // Verificação da senha
    // @ts-ignore - erro de propriedade password
    if (!bcrypt.compareSync(password, userExists.password)) {
      req.flash("message", "Senha incorreta!");
      res.render("auth/login");

      return;
    }

    try {
      // session
      // @ts-ignore - erro de propriedade id
      req.session.userId = userExists.id;

      req.flash("message", "Login realizado");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthController;
