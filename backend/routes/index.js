// aqil-volunteering/backend/routes/index.js
const express = require('express');
const router = express.Router();

const cors = require('cors');

// إضافة CORS لجميع الراوترات
router.use(cors());

// إضافة middleware لفحص ال JWT أو أي شيء عام
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// استدعاء كل الراوترات
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');               // مفرد بعد التحديث
const infoRoute = require('./infoRoute');
const experienceRoute = require('./experienceRoute');
const skillRoute = require('./skillRoute');
const languageRoute = require('./languageRoute');
const projectRoute = require('./projectRoute');
const trainingRoute = require('./trainingRoute');
const fileRoute = require('./fileRoute');
const dataEntryRoute = require('./dataEntryRoute');

// استخدام الراوترات
router.use('/auth', authRoute);
router.use('/user', userRoute);                          // مفرد
router.use('/info', infoRoute);
router.use('/experience', experienceRoute);
router.use('/skill', skillRoute);
router.use('/language', languageRoute);
router.use('/project', projectRoute);
router.use('/training', trainingRoute);
router.use('/file', fileRoute);
router.use('/data_entries', dataEntryRoute);

module.exports = router;
