const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const sequelize = require("./db");
const cors = require('cors')
const app = express();
const port = 3000;
app.use(cors({
    "origin":"*"
}))
app.use(bodyParser.json());

//db reuire
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");
Category.hasMany(Product, { foreignKey: "category_id", as: "CategoriesId" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
