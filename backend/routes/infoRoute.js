// aqil-volunteering/backend/routes/infoRoute.js
const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET info
router.get('/:user_id', authMiddleware, infoController.getInfoByUserId);

// CREATE or UPDATE info
router.post('/:user_id', authMiddleware, infoController.upsertInfo);

module.exports = router;
