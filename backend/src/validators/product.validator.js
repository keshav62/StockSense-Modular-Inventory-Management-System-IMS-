const Joi = require('joi');

const createProductSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(200).required()
      .messages({
        'string.min': 'Product name must be at least 2 characters',
        'string.max': 'Product name cannot exceed 200 characters',
        'any.required': 'Product name is required',
      }),
    sku: Joi.string().trim().uppercase().pattern(/^[A-Z0-9-]+$/).required()
      .messages({
        'string.pattern.base': 'SKU can only contain letters, numbers, and hyphens',
        'any.required': 'SKU is required',
      }),
    category: Joi.string().hex().length(24).required()
      .messages({
        'string.hex': 'Invalid category ID',
        'string.length': 'Invalid category ID',
        'any.required': 'Category is required',
      }),
    unitOfMeasure: Joi.string().required()
      .messages({
        'any.required': 'Unit of measure is required',
      }),
    initialStock: Joi.number().min(0).default(0)
      .messages({
        'number.min': 'Initial stock cannot be negative',
      }),
    description: Joi.string().trim().max(1000).allow('').default('')
      .messages({
        'string.max': 'Description cannot exceed 1000 characters',
      }),
    isActive: Joi.boolean().default(true),
  }),
};

const updateProductSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(200)
      .messages({
        'string.min': 'Product name must be at least 2 characters',
        'string.max': 'Product name cannot exceed 200 characters',
      }),
    sku: Joi.string().trim().uppercase().pattern(/^[A-Z0-9-]+$/)
      .messages({
        'string.pattern.base': 'SKU can only contain letters, numbers, and hyphens',
      }),
    category: Joi.string().hex().length(24)
      .messages({
        'string.hex': 'Invalid category ID',
        'string.length': 'Invalid category ID',
      }),
    unitOfMeasure: Joi.string(),
    initialStock: Joi.number().min(0)
      .messages({
        'number.min': 'Initial stock cannot be negative',
      }),
    description: Joi.string().trim().max(1000).allow('')
      .messages({
        'string.max': 'Description cannot exceed 1000 characters',
      }),
    isActive: Joi.boolean(),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update',
  }),
};

const productQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().trim().allow(''),
    category: Joi.string().hex().length(24).allow(''),
    unitOfMeasure: Joi.string().allow(''),
    isActive: Joi.string().valid('true', 'false').allow(''),
    sortBy: Joi.string().valid('name', 'sku', 'createdAt', 'initialStock').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};

module.exports = {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
};
