
const express = require('express');
const productController = require('../controllers/productController');
const auth = require("../middlewares/validateToken");
const router = express.Router();
router.get('/all', auth, productController.getAllProducts);
router.post('/create', auth, productController.createProduct);
router.put('/:productId', auth, productController.updateProduct);
router.delete('/:productId', auth, productController.deleteProduct);

module.exports = router;
