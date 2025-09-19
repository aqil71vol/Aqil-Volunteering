// aqil-volunteering/backend/controllers/skillController.js
const db = require('../models');

exports.getSkillsByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const skills = await db.Skill.findAll({ where: { user_id: userId, is_deleted: false } });
    res.json(skills || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const skill = await db.Skill.create({ user_id: userId, ...req.body });
    res.json({ message: 'Skill added', skill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Skill.update(req.body, { where: { id, is_deleted: false } });
    if (!updated) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await db.Skill.findByPk(id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    skill.is_deleted = true;
    skill.deleted_at = new Date();
    await skill.save();

    res.json({ message: 'Skill deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
