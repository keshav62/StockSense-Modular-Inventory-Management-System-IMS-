const Category = require('../models/Category');
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * GET /api/categories
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    sendSuccess(res, 200, 'Categories fetched successfully.', categories);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/categories
 */
const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Check duplicate
    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return sendError(res, 409, 'A category with this name already exists.');
    }

    const category = await Category.create({ name, description });
    sendSuccess(res, 201, 'Category created successfully.', category);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/categories/:id
 */
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendError(res, 404, 'Category not found.');
    }
    sendSuccess(res, 200, 'Category fetched successfully.', category);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/categories/:id
 */
const updateCategory = async (req, res, next) => {
  try {
    const { name, description, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendError(res, 404, 'Category not found.');
    }

    // Check duplicate name if being changed
    if (name && name.toLowerCase() !== category.name.toLowerCase()) {
      const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (existing) {
        return sendError(res, 409, 'A category with this name already exists.');
      }
      category.name = name;
    }

    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    sendSuccess(res, 200, 'Category updated successfully.', category);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/categories/:id
 */
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendError(res, 404, 'Category not found.');
    }

    // Check if any active products reference this category
    const productCount = await Product.countDocuments({ category: req.params.id, isActive: true });
    if (productCount > 0) {
      return sendError(
        res,
        400,
        `Cannot delete category. ${productCount} active product(s) are using this category. Deactivate or reassign them first.`
      );
    }

    // Soft-delete by deactivation
    category.isActive = false;
    await category.save();

    sendSuccess(res, 200, 'Category deactivated successfully.', category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
