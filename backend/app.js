// aqil-volunteering/backend/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// =====================
// إنشاء التطبيق
// =====================
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// =====================
// استيراد الموديلات
// =====================
const db = require('./models');

// =====================
// استيراد الميدل وير
// =====================
const authMiddleware = require('./middlewares/authMiddleware');

// =====================
// استيراد الروتات
// =====================
const authRoutes = require('./api/auth');             // تسجيل دخول / تسجيل
const userRoutes = require('./api/users');            // CRUD المستخدمين
const experienceRoutes = require('./routes/experienceRoutes');
const skillRoutes = require('./routes/skillRoutes');
const languageRoutes = require('./routes/languageRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

// =====================
// ربط الروتات
// =====================
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);          // حماية JWT
app.use('/api/experiences', authMiddleware, experienceRoutes);
app.use('/api/skills', authMiddleware, skillRoutes);
app.use('/api/languages', authMiddleware, languageRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/files', authMiddleware, fileRoutes);
app.use('/api/trainings', authMiddleware, trainingRoutes);

// =====================
// اختبار الاتصال بالقاعدة
// =====================
db.sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ DB connection error:', err));

// =====================
// مزامنة الجداول (اختياري)
// =====================
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ All tables synced'))
  .catch(err => console.error('❌ Table sync error:', err));

// =====================
// السيرفر
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
