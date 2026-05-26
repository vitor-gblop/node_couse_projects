const { DataTypes } = require("sequelize");
const conn = require("../db/conn.js");
const User = require("./User.js");

const Tought = conn.define("tougth", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;
