// aqil-volunteering/backend/routes/projectRoute.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all projects by user
router.get('/:user_id', authMiddleware, projectController.getProjectsByUserId);

// CREATE new project
router.post('/:user_id', authMiddleware, projectController.createProject);

// UPDATE project
router.put('/:id', authMiddleware, projectController.updateProject);

// DELETE project (soft delete)
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
