const mongoose = require('mongoose');
const env = require('../config/env');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const seedData = async () => {
  try {
    console.log('🌱 Starting seed process...\n');

    // Connect to database
    await mongoose.connect(env.MONGO_URI);
    console.log('✅ Database connected.\n');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data.\n');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@stocksense.com',
      password: 'Admin123',
      role: 'admin',
    });
    console.log(`👤 Created admin: ${admin.email} (password: Admin123)`);

    // Create test user
    const testUser = await User.create({
      name: 'John Doe',
      email: 'john@stocksense.com',
      password: 'John1234',
      role: 'user',
    });
    console.log(`👤 Created user: ${testUser.email} (password: John1234)\n`);

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Raw Material', description: 'Basic raw materials for manufacturing' },
      { name: 'Finished Goods', description: 'Completed products ready for sale' },
      { name: 'Office Equipment', description: 'Office furniture and equipment' },
      { name: 'Electronics', description: 'Electronic devices and accessories' },
    ]);
    console.log(`📁 Created ${categories.length} categories`);

    // Map category names to IDs
    const catMap = {};
    categories.forEach((c) => { catMap[c.name] = c._id; });

    // Create products
    const products = await Product.insertMany([
      {
        name: 'Steel Rod',
        sku: 'STR-001',
        category: catMap['Raw Material'],
        unitOfMeasure: 'KG',
        initialStock: 500,
        description: 'Industrial grade steel rod for construction',
      },
      {
        name: 'Steel Sheet',
        sku: 'STS-002',
        category: catMap['Raw Material'],
        unitOfMeasure: 'SHEET',
        initialStock: 200,
        description: 'Galvanized steel sheets 4x8 feet',
      },
      {
        name: 'Office Chair',
        sku: 'OCH-001',
        category: catMap['Office Equipment'],
        unitOfMeasure: 'PCS',
        initialStock: 50,
        description: 'Ergonomic office chair with lumbar support',
      },
      {
        name: 'Office Table',
        sku: 'OTB-001',
        category: catMap['Office Equipment'],
        unitOfMeasure: 'PCS',
        initialStock: 30,
        description: 'Standard office desk with drawers',
      },
      {
        name: 'Laptop',
        sku: 'LAP-001',
        category: catMap['Electronics'],
        unitOfMeasure: 'PCS',
        initialStock: 25,
        description: 'Business laptop 15.6 inch display',
      },
      {
        name: 'Printer',
        sku: 'PRT-001',
        category: catMap['Electronics'],
        unitOfMeasure: 'PCS',
        initialStock: 10,
        description: 'Multi-function laser printer',
      },
    ]);
    console.log(`📦 Created ${products.length} products\n`);

    console.log('═══════════════════════════════════════');
    console.log('  ✅ Seed completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log('\n  Test Credentials:');
    console.log('  Admin: admin@stocksense.com / Admin123');
    console.log('  User:  john@stocksense.com / John1234\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
