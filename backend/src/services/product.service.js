const Product = require('../models/Product');
const Category = require('../models/Category');
const { buildPagination } = require('../utils/pagination');

/**
 * Create a new product.
 */
const createProduct = async (data) => {
  // Verify category exists
  const category = await Category.findById(data.category);
  if (!category) {
    throw { statusCode: 404, message: 'Category not found.' };
  }
  if (!category.isActive) {
    throw { statusCode: 400, message: 'Cannot assign product to an inactive category.' };
  }

  // Check duplicate SKU
  const existingProduct = await Product.findOne({ sku: data.sku.toUpperCase() });
  if (existingProduct) {
    throw { statusCode: 409, message: 'A product with this SKU already exists.' };
  }

  const product = await Product.create(data);
  return product.populate('category', 'name description');
};

/**
 * Get products with search, filters, sorting, and pagination.
 */
const getProducts = async (query) => {
  const filter = {};

  // Search by name or SKU
  if (query.search) {
    const searchRegex = new RegExp(query.search, 'i');
    filter.$or = [
      { name: searchRegex },
      { sku: searchRegex },
    ];
  }

  // Filter by category
  if (query.category) {
    filter.category = query.category;
  }

  // Filter by unit of measure
  if (query.unitOfMeasure) {
    filter.unitOfMeasure = query.unitOfMeasure;
  }

  // Filter by active status
  if (query.isActive !== undefined && query.isActive !== '') {
    filter.isActive = query.isActive === 'true';
  }

  // Count total documents matching filter
  const total = await Product.countDocuments(filter);

  // Build pagination
  const pagination = buildPagination(query, total);

  // Build sort
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
  const sort = { [sortBy]: sortOrder };

  // Fetch products
  const products = await Product.find(filter)
    .populate('category', 'name')
    .sort(sort)
    .skip(pagination.skip)
    .limit(pagination.limit);

  return { products, pagination };
};

/**
 * Get a single product by ID.
 */
const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category', 'name description');
  if (!product) {
    throw { statusCode: 404, message: 'Product not found.' };
  }
  return product;
};

/**
 * Update a product.
 */
const updateProduct = async (id, data) => {
  const product = await Product.findById(id);
  if (!product) {
    throw { statusCode: 404, message: 'Product not found.' };
  }

  // Check for duplicate SKU if SKU is being changed
  if (data.sku && data.sku.toUpperCase() !== product.sku) {
    const existing = await Product.findOne({ sku: data.sku.toUpperCase() });
    if (existing) {
      throw { statusCode: 409, message: 'A product with this SKU already exists.' };
    }
  }

  // Verify category if being changed
  if (data.category && data.category.toString() !== product.category.toString()) {
    const category = await Category.findById(data.category);
    if (!category) {
      throw { statusCode: 404, message: 'Category not found.' };
    }
    if (!category.isActive) {
      throw { statusCode: 400, message: 'Cannot assign product to an inactive category.' };
    }
  }

  // Update fields
  Object.keys(data).forEach((key) => {
    product[key] = data[key];
  });

  await product.save();
  return product.populate('category', 'name description');
};

/**
 * Soft-delete a product (set isActive = false).
 */
const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw { statusCode: 404, message: 'Product not found.' };
  }

  product.isActive = false;
  await product.save();
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
