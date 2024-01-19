
const express = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require("../middlewares/validateToken");
const router = express.Router();

router.get('/all', auth, categoryController.getAllCategories);
router.post('/create', auth, categoryController.createCategory);
router.put('/:categoryId', auth, categoryController.updateCategory);
router.delete('/:categoryId', auth, categoryController.deleteCategory);

module.exports = router;
