// aqil-volunteering/backend/routes/experienceRoute.js
const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:user_id', authMiddleware, experienceController.getExperiencesByUserId);
router.post('/', authMiddleware, experienceController.createExperience);
router.put('/:id', authMiddleware, experienceController.updateExperience);
router.delete('/:id', authMiddleware, experienceController.deleteExperience);

module.exports = router;
