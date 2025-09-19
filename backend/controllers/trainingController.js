// aqil-volunteering/backend/controllers/trainingController.js
const db = require('../models');

// GET trainings by user ID
exports.getTrainingsByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const trainings = await db.Training.findAll({ 
      where: { user_id: userId, is_deleted: false } 
    });
    res.json(trainings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE a training
exports.createTraining = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const training = await db.Training.create({ user_id: userId, ...req.body });
    res.json({ message: 'Training added', training });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE a training
exports.updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Training.update(req.body, { 
      where: { id, is_deleted: false } 
    });
    if (!updated) return res.status(404).json({ message: 'Training not found' });
    res.json({ message: 'Training updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE a training (soft delete)
exports.deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const training = await db.Training.findByPk(id);
    if (!training) return res.status(404).json({ message: 'Training not found' });

    training.is_deleted = true;
    training.deleted_at = new Date();
    await training.save();

    res.json({ message: 'Training deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
