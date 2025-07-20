require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// مسارات الـ API
const authRoutes = require('./api/auth');
const userRoutes = require('./api/users');       // لو أنشأته
const projectRoutes = require('./api/projects'); // API المشاريع
const dataEntryRoutes = require('./api/dataEntry'); // إن وُجد

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ الميدل وير
app.use(cors());
app.use(bodyParser.json()); // أو: app.use(express.json());

// ✅ ربط المسارات
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);          // ← إذا عندك ملف users.js
app.use('/api/projects', projectRoutes);    // ← المشاريع
app.use('/api/data-entry', dataEntryRoutes); // ← لو عندك إدخال بيانات
app.use("/api/data-entry", require("./routes/dataEntry"));

// ✅ اختبار الاتصال
app.get('/', (req, res) => {
  res.send('✅ API Server is running!');
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // قاعدة البيانات (Sequelize)
// // ❌ احذف هذا إذا لا تستخدم Sequelize
// // const db = require('./models');

// // ✅ مزامنة الجداول مع Sequelize
// // db.sequelize.sync({ alter: true })
//   // .then(() => console.log("✅ All tables synced successfully"))
//   // .catch(err => console.error("❌ Failed to sync database:", err));

// // ✅ المسارات (routes)
// const authRoutes = require('./routes/auth');
// const dataEntryRoutes = require('./routes/dataEntry');

// app.use('/api/auth', authRoutes);
// app.use('/api/data-entry', dataEntryRoutes);

// // اختبار السيرفر
// app.get("/", (req, res) => {
//   res.send("🎉 Back-end is working!");
// });

// // بدء تشغيل السيرفر
// app.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });

// ///////////////////////////////////////////////

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const authRoutes = require('./api/auth'); // ← ملف auth.js

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(cors()); // السماح لتطبيقات الجوال بالاتصال
// app.use(bodyParser.json());

// // Routes
// app.use('/api/auth', authRoutes); // Example: /api/auth/login

// // Simple check route
// app.get('/', (req, res) => {
//   res.send('API Server is running ✅');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// ///////////////////////////////////////////////

// const userRoutes = require('./api/users');
// const projectRoutes = require('./api/projects');

// app.use('/api/users', userRoutes);       // ← /api/users/
// app.use('/api/projects', projectRoutes); // ← /api/projects/

// ///////////////////////////////////////////////

// const projectRoutes = require('./api/projects');
// app.use('/api/projects', projectRoutes);

// const authRoutes = require('./api/auth');
// app.use('/api/auth', authRoutes);

// ///////////////////////////////////////////////