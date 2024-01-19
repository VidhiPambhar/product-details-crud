const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("product-management", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
  });

module.exports = sequelize;
