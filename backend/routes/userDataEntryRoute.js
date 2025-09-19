// aqil-volunteering/backend/routes/userDataEntryRoute.js
const express = require('express');
const router = express.Router();
const userDataEntryController = require('../controllers/userDataEntryController');

// جلب مدخلات المستخدم
router.get('/:id', userDataEntryController.getEntriesByUserId);

// إضافة مدخل جديد
router.post('/:id', userDataEntryController.createEntry);

module.exports = router;
