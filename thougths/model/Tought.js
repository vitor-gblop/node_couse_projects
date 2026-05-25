const { DataTypes } = require("sequelize");
const conn = require("../db/conn.js");
const User = require("./User.js");

const Tought = conn.define("Tougth", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// @ts-ignore
Tought.belongsTo(User);
// @ts-ignore
User.hasMany(Tought);

module.exports = Tought;
