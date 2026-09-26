const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate } = require('../middleware/auth.middleware');

// All category routes require authentication
router.use(authenticate);

// GET /api/categories
router.get('/', categoryController.getCategories);

// POST /api/categories
router.post('/', categoryController.createCategory);

// GET /api/categories/:id
router.get('/:id', categoryController.getCategory);

// PUT /api/categories/:id
router.put('/:id', categoryController.updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
