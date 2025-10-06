// aqil-volunteering/backend/config/db.js
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// ==============================
// ضبط البيئة تلقائيًا
// ==============================
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'; // أو 'development' حسب ما تريد
}

if (!process.env.ENV_PATH) {
  process.env.ENV_PATH = process.env.NODE_ENV === 'production' ? '.env.online' : '.env.local';
}

const envPath = path.resolve(__dirname, '..', process.env.ENV_PATH);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`🔹 Loaded environment variables from ${process.env.ENV_PATH}`);
} else {
  console.warn(`⚠️ ${process.env.ENV_PATH} not found!`);
}

// تحديد إذا كانت بيئة التطوير
const isDev = process.env.NODE_ENV === 'development';

// إعداد اتصال MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    } : {}
  }
);

console.log(isDev ? '🧩 Development mode: MySQL' : '☁️ Production mode: MySQL');

// اختبار الاتصال
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

module.exports = sequelize;




// // aqil-volunteering/backend/config/db.js
// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// // dotenv.config();
// dotenv.config({ path: process.env.ENV_PATH || '.env.local' });

// // =====================
// // 🔹 إنشاء اتصال Sequelize
// // =====================
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     dialect: 'mysql',
//     logging: console.log, 
//     define: {
//       timestamps: true,      
//       underscored: true,
//       collate: 'utf8mb4_unicode_ci',    
//     },
//     dialectOptions: {
//       charset: 'utf8mb4',
//       // collate: 'utf8mb4_unicode_ci',
//     },
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );


// // =====================
// // 🔹 اختبار الاتصال
// // =====================
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connected successfully!');
//   } catch (error) {
//     console.error('❌ Database connection failed:', error.message);
//   }
// })();

// module.exports = sequelize;
