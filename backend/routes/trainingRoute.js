// aqil-volunteering/backend/routes/trainingRoute.js
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all trainings by user
router.get('/:user_id', authMiddleware, trainingController.getTrainingsByUserId);

// CREATE new training
router.post('/', authMiddleware, trainingController.createTraining);

// UPDATE training
router.put('/:id', authMiddleware, trainingController.updateTraining);

// DELETE training (soft delete)
router.delete('/:id', authMiddleware, trainingController.deleteTraining);

module.exports = router;
