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
const authRoutes = require('./routes/authRoute');             
const userRoutes = require('./routes/userRoute');            
const infoRoutes = require('./routes/infoRoute');
const experienceRoutes = require('./routes/experienceRoute');
const skillRoutes = require('./routes/skillRoute');
const languageRoutes = require('./routes/languageRoute');
const projectRoutes = require('./routes/projectRoute');
const trainingRoutes = require('./routes/trainingRoute');
const fileRoutes = require('./routes/fileRoute');
const dataEntryRoutes = require('./routes/userDataEntryRoute');
const archiveRoutes = require('./routes/userDataEntryArchiveRoute');

// =====================
// ربط الروتات مع الحماية
// =====================
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);          
app.use('/api/info', authMiddleware, infoRoutes);
app.use('/api/experience', authMiddleware, experienceRoutes);
app.use('/api/skill', authMiddleware, skillRoutes);
app.use('/api/language', authMiddleware, languageRoutes);
app.use('/api/project', authMiddleware, projectRoutes);
app.use('/api/training', authMiddleware, trainingRoutes);
app.use('/api/file', authMiddleware, fileRoutes);
app.use('/api/data-entry', authMiddleware, dataEntryRoutes);
app.use('/api/archive', authMiddleware, archiveRoutes);

// =====================
// اختبار الاتصال بالقاعدة
// =====================
db.sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ DB connection error:', err));

// =====================
// مزامنة الجداول
// =====================
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ All tables synced'))
  .catch(err => console.error('❌ Table sync error:', err));

// =====================
// تشغيل السيرفر
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
