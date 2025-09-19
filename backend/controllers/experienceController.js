// aqil-volunteering/backend/controllers/experienceController.js
const db = require('../models');

exports.getExperiencesByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const experiences = await db.Experience.findAll({ 
      where: { user_id: userId, is_deleted: false } 
    });
    res.json(experiences || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const experience = await db.Experience.create({ user_id: userId, ...req.body });
    res.json({ message: 'Experience added', experience });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Experience.update(req.body, { where: { id, is_deleted: false } });
    if (!updated) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await db.Experience.findByPk(id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    experience.is_deleted = true;
    experience.deleted_at = new Date();
    await experience.save();

    res.json({ message: 'Experience deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
