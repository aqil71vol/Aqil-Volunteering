// aqil-volunteering/backend/routes/fileRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// المسارات
router.get('/:user_id', authMiddleware, fileController.getFilesByUserId);
router.post('/:user_id', authMiddleware, upload.single('file'), fileController.uploadFile);
router.delete('/:id', authMiddleware, fileController.deleteFile);

module.exports = router;
