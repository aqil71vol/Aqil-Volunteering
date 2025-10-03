// aqil-volunteering/backend/middlewares/profileUploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// إنشاء مجلد uploads/profile_image إذا لم يكن موجود
const uploadDir = path.join(__dirname, '../uploads/profile_image');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// إعداد Multer لتخزين الصور مع دعم جميع الامتدادات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // السماح بأي امتداد صورة
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Invalid file type. Only images are allowed.'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
