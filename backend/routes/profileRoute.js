// aqil-volunteering/backend/routes/profile.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/me', authMiddleware, profileController.getMyProfile);
router.put('/me', authMiddleware, profileController.updatePersonalInfo);
router.put('/me/photo', authMiddleware, profileController.updatePhoto);

module.exports = router;
