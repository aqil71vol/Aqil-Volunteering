// aqil-volunteering/backend/routes/userDataEntryArchiveRoute.js
const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/userDataEntryArchiveController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET archived entries by user
router.get('/:user_id', authMiddleware, archiveController.getArchivedEntriesByUserId);

// CREATE new archived entry
router.post('/:user_id', authMiddleware, archiveController.createArchivedEntry);

// UPDATE an archived entry
router.put('/:id', authMiddleware, archiveController.updateArchivedEntry);

// SOFT DELETE an archived entry
router.delete('/:id', authMiddleware, archiveController.deleteArchivedEntry);

module.exports = router;
