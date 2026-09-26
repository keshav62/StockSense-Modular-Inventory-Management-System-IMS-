const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(env.PORT, () => {
      console.log(`\n🚀 StockSense API Server`);
      console.log(`   Environment: ${env.NODE_ENV}`);
      console.log(`   Port:        ${env.PORT}`);
      console.log(`   URL:         http://localhost:${env.PORT}`);
      console.log(`   Health:      http://localhost:${env.PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
