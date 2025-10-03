// aqil-volunteering/backend/routes/fileRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/filesUploadMiddleware');
const fileController = require('../controllers/fileController');

// مسارات الملفات
router.get('/', authMiddleware, fileController.getMyFiles);
router.get('/:user_id', authMiddleware, fileController.getFilesByUserId);
router.post('/', authMiddleware, upload.single('file'), fileController.uploadFile);
router.delete('/:id', authMiddleware, fileController.deleteFile);

module.exports = router;
