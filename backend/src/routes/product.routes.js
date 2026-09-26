const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} = require('../validators/product.validator');

// All product routes require authentication
router.use(authenticate);

// GET /api/products
router.get('/', validate(productQuerySchema), productController.getProducts);

// POST /api/products
router.post('/', validate(createProductSchema), productController.createProduct);

// GET /api/products/:id
router.get('/:id', productController.getProduct);

// PUT /api/products/:id
router.put('/:id', validate(updateProductSchema), productController.updateProduct);

// DELETE /api/products/:id (soft-delete)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
