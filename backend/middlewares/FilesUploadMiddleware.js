// aqil-volunteering/backend/middlewares/filesUploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// إنشاء المجلد إذا لم يكن موجودًا
const uploadDir = path.join(__dirname, '../uploads/files_documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد التخزين للملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    let originalName = file.originalname.normalize('NFC');
    originalName = originalName.replace(/[^\w\u0600-\u06FF .\-]/g, '_');
    cb(null, `${Date.now()}-${originalName}`);
  },
});

// اختيارية: تحديد أنواع الملفات المسموح بها
const fileFilter = (req, file, cb) => {
  // مثال للسماح بالملفات: pdf, doc, docx, png, jpg
  const allowedTypes = /pdf|doc|docx|png|jpg|jpeg/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
