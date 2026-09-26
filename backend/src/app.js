const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const { errorHandler } = require('./middleware/error.middleware');
const { apiLimiter } = require('./middleware/rateLimit.middleware');

// Import Member 1 routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

// ─── Security ────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Body Parsing ────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ─────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Rate Limiting ───────────────────────────────────
app.use('/api', apiLimiter);

// ─── Health Check ────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'StockSense API is running', timestamp: new Date().toISOString() });
});

// ─── Member 1 Routes ─────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// ─── Member 2 Routes (to be implemented) ─────────────
// app.use('/api/warehouses', warehouseRoutes);
// app.use('/api/locations', locationRoutes);
// app.use('/api/stock', stockRoutes);

// ─── Member 3 Routes (to be implemented) ─────────────
// app.use('/api/receipts', receiptRoutes);
// app.use('/api/deliveries', deliveryRoutes);
// app.use('/api/transfers', transferRoutes);
// app.use('/api/adjustments', adjustmentRoutes);
// app.use('/api/ledger', ledgerRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// ─── 404 Handler ─────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ────────────────────────────
app.use(errorHandler);

module.exports = app;
