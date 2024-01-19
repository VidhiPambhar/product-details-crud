const Category = require("../models/Category");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ message: "List of all Productss", products });
  } catch (error) {
    console.error("Error getting all products:", error);
    res.status(500).send("Error getting all products");
  }
};
const createProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, category_id } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      imageUrl,
      category_id,
    });
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product");
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, imageUrl, categoryId } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({
      name,
      description,
      imageUrl,
    });
    if (categoryId) {
      const category = await Category.findByPk(categoryId);

      if (category) {
        await product.setCategories([category]);
      }
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();

    res.status(204).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting hproduct");
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
