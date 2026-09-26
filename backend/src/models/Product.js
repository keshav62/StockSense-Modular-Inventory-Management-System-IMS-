const mongoose = require('mongoose');

const UNITS_OF_MEASURE = [
  'PCS', 'KG', 'LB', 'G', 'MG',
  'L', 'ML', 'GAL',
  'M', 'CM', 'MM', 'FT', 'IN',
  'BOX', 'PACK', 'SET', 'PAIR',
  'ROLL', 'SHEET', 'UNIT',
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters'],
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9-]+$/, 'SKU can only contain letters, numbers, and hyphens'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    unitOfMeasure: {
      type: String,
      required: [true, 'Unit of measure is required'],
      enum: {
        values: UNITS_OF_MEASURE,
        message: 'Invalid unit of measure',
      },
    },
    initialStock: {
      type: Number,
      default: 0,
      min: [0, 'Initial stock cannot be negative'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ name: 'text', sku: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
module.exports.UNITS_OF_MEASURE = UNITS_OF_MEASURE;
