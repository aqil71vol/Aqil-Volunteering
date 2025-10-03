// aqil-volunteering/backend/config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// =====================
// 🔹 إنشاء اتصال Sequelize
// =====================
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, 
    define: {
      timestamps: true,      
      underscored: true,     
    },
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);


// =====================
// 🔹 اختبار الاتصال
// =====================
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
})();

module.exports = sequelize;
