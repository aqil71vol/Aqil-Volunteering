// aqil-volunteering/backend/routes/skillRoute.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all skills by user
router.get('/:user_id', authMiddleware, skillController.getSkillsByUserId);

// CREATE new skill
router.post('/:user_id', authMiddleware, skillController.createSkill);

// UPDATE skill
router.put('/:id', authMiddleware, skillController.updateSkill);

// DELETE skill (soft delete)
router.delete('/:id', authMiddleware, skillController.deleteSkill);

module.exports = router;
