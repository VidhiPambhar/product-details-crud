const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newCategory = await Category.create({
      name,
      type,
    });
    res
      .status(201)
      .json({ message: "Category added successfully", newCategory });
  } catch (error) {
    console.error("Error creating categoryy", error);
    res.status(500).send("Error while creating category");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, type } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.update({
      name,
      type,
    });

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Error whi;le updating category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();

    res.status(204).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Error deleting category");
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ message: "List of all Category", categories });
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).send("Error getting all categories");
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
