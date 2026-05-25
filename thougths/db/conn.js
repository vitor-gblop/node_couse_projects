const { Sequelize } = require("sequelize");

// const conn = new Sequelize("thougts", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });
const conn = new Sequelize({
  database: "thougts",
  host: "localhost",
  username: "root",
  password: "",
  dialect: "mysql",
});

try {
  conn.authenticate();
} catch (error) {
  console.log(error);
}

module.exports = conn;
