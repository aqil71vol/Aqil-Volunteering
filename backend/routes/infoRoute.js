// aqil-volunteering/backend/routes/infoRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const infoController = require('../controllers/infoController');
const uploadMiddleware = require('../middlewares/profileUploadMiddleware');

// جميع المسارات محمية بـ JWT
router.get('/me', authMiddleware, infoController.getInfo);
router.post('/', authMiddleware, uploadMiddleware.single('profile_image'), infoController.saveInfo);
router.put('/me', authMiddleware, uploadMiddleware.single('profile_image'), infoController.saveInfo);
router.delete('/me', authMiddleware, infoController.deleteInfo);

module.exports = router;
