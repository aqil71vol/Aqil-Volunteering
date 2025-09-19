// aqil-volunteering/backend/routes/languageRoute.js
const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all languages by user
router.get('/:user_id', authMiddleware, languageController.getLanguagesByUserId);

// CREATE new language
router.post('/:user_id', authMiddleware, languageController.createLanguage);

// UPDATE language
router.put('/:id', authMiddleware, languageController.updateLanguage);

// DELETE language (soft delete)
router.delete('/:id', authMiddleware, languageController.deleteLanguage);

module.exports = router;
