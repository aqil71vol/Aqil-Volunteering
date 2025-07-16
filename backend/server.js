require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// قاعدة البيانات (Sequelize)
// ❌ احذف هذا إذا لا تستخدم Sequelize
// const db = require('./models');

// ✅ مزامنة الجداول مع Sequelize
// db.sequelize.sync({ alter: true })
  // .then(() => console.log("✅ All tables synced successfully"))
  // .catch(err => console.error("❌ Failed to sync database:", err));

// ✅ المسارات (routes)
const authRoutes = require('./routes/auth');
const dataEntryRoutes = require('./routes/dataEntry');

app.use('/api/auth', authRoutes);
app.use('/api/data-entry', dataEntryRoutes);

// اختبار السيرفر
app.get("/", (req, res) => {
  res.send("🎉 Back-end is working!");
});

// بدء تشغيل السيرفر
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
