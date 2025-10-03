// aqil-volunteering/backend/controllers/fileController.js
const db = require('../models');
const path = require('path');
const fs = require('fs');

// =====================
// 🔹 ملفات المستخدم الحالي
// =====================
exports.getMyFiles = async (req, res) => {
  try {
    const files = await db.File.findAll({
      where: { user_id: req.user.id, is_deleted: false },
      order: [['created_at', 'DESC']]
    });
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// =====================
// 🔹 ملفات أي مستخدم (Admin)
// =====================
exports.getFilesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const files = await db.File.findAll({
      where: { user_id, is_deleted: false },
      order: [['created_at', 'DESC']]
    });
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// =====================
// 🔹 رفع ملف مع دعم الأسماء العربية
// =====================
exports.uploadFile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // تحويل الاسم لضمان دعم UTF-8
    const originalName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');

    // عند رفع الملف
    const file = await db.File.create({
      user_id: userId,
      file_name: req.file.originalname, // اسم الملف الأصلي مع العربية
      file_path: req.file.path,
      file_type: req.file.mimetype
    });

    // إعادة إرسال الملف المحدث للقائمة بدون رفريش
    res.json({ message: 'File uploaded', file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// =====================
// 🔹 حذف ملف
// =====================
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const mode = req.query.mode || "soft";
    const file = await db.File.findByPk(id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (mode === "hard") {
      // حذف الملف فعليًا من مجلد uploads إذا موجود
      const filePath = path.resolve(file.file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await file.destroy(); // حذف السجل من قاعدة البيانات
      res.json({ message: 'File permanently deleted' });
    } else {
      file.is_deleted = true;
      file.deleted_at = new Date();
      await file.save();
      res.json({ message: 'File soft deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

