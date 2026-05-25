const { DataTypes } = require("sequelize");
const conn = require("../db/conn");

const User = conn.define("Tougth", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
