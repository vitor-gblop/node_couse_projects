const { request, response } = require("express");
const Tought = require("../model/Tought");
const User = require("../model/User");
const { where, Op } = require("sequelize");

class ToughtController {
  static async showTought(req = request, res = response, next) {
    let search = "";
    if (req.query.search) {
      // @ts-ignore
      search = req.query.search;
    }
    let order = "DESC"
    if (req.query.order)
    {
      // @ts-ignore
      order = req.query.order
    }

    try {
      const allToughts = await Tought.findAll({
        where: {
          title: { [Op.like]: `%${search}%` },
        },
        include: User,
      });

      const toughts = allToughts.map((item) => item.dataValues).reverse();
      // console.log(allToughts.map((item) => item.dataValues));
      // console.log(allToughts.map((item) => item.dataValues.user.dataValues));
      const qtdResults = toughts.length

      res.render("home", { toughts, qtdResults });
    } catch (error) {
      console.log(error);
    }
  }
  static async dashboard(req = request, res = response, next) {
    // @ts-ignore
    const userId = req.session.userId;

    // prettier-ignore
    try {
      const userExist = await User.findOne({
        where: {
          id: userId,
        },
        include: Tought,
      });

      if (!userExist) {
        res.render("auth/login");
        return;
      }

      const toughts = userExist.dataValues.tougths.map((item) => item.dataValues)
      // console.log(userExist);
      // console.log(toughts);

      let empty = false
      if (toughts.length <= 0) {
        empty = true
      }

      res.render("dashboard", { toughts, empty });
    }
    catch (error) {
      console.log(error);
    }
  }

  static addTought(req = request, res = response, next) {
    res.render("toughts/addTought");
  }

  static async editTought(req = request, res = response, next) {
    const { id } = req.params;

    // prettier-ignore
    try {
      const tought = await Tought.findOne({
        where: {
          id: id
        }
      })
      const title = tought.dataValues.title
      // console.log(tought.dataValues.title);

      res.render("toughts/editTought", { id, title });
    }
    catch (error) {
      console.log(error);

    }
  }

  // ---------------------------------------------------------

  static _createTought(req = request, res = response, next) {
    const { title } = req.body;

    // prettier-ignore
    try {
      const response = Tought.create({
        title: title,
        // @ts-ignore
        userId: req.session.userId,
      });

      req.flash("message", "Pensamento criado com sucesso!");
      res.redirect("/toughts/dashboard");
    }
    catch (error) {
      console.log(error);
    }
  }

  static _editTought(req = request, res = response, next) {
    const { title, id } = req.body;

    // prettier-ignore
    try {
      const response = Tought.update(
        { title }, {
        where: {
          id: id
        }
      });

      req.flash("message", "Pensamento atualizado com sucesso!");
      res.redirect("/toughts/dashboard");
    }
    catch (error) {
      console.log(error);
    }
  }

  static _deleteTought(req = request, res = response, next) {
    const { id } = req.body;
    console.log("\n\nue");

    // prettier-ignore
    try {
      const response = Tought.destroy({
        where: {
          id: id
        }
      })

      req.flash("message", "Pensamento removido com sucesso!");
      res.redirect("/toughts/dashboard");
    }
    catch (error) {
      console.log(error);
    }
  }
}

module.exports = ToughtController;
