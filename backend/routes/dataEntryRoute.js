// aqil-volunteering/backend/routes/dataEntryRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const dataEntryMiddleware = require('../middlewares/dataEntryMiddleware');
const dataEntryController = require('../controllers/dataEntryController');

// جميع الراوتات محمية بالتحقق من التوكن
router.use(authMiddleware);

// تطبيق ميدل وير خاص بالداتا إنتري
router.use(dataEntryMiddleware);

// CRUD
router.post('/', dataEntryController.createEntry);
router.get('/', dataEntryController.getAllEntries);
router.put('/:id', dataEntryController.updateEntry);
router.put('/:id/restore', dataEntryController.restoreEntry);
router.put('/:id/soft_delete', dataEntryController.softDeleteEntry);
router.delete('/:id', dataEntryController.hardDeleteEntry);

module.exports = router;
