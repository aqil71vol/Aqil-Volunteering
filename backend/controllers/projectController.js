// aqil-volunteering/backend/controllers/projectController.js
const db = require('../models');

exports.getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const projects = await db.Project.findAll({ where: { user_id: userId, is_deleted: false } });
    res.json(projects || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const project = await db.Project.create({ user_id: userId, ...req.body });
    res.json({ message: 'Project added', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Project.update(req.body, { where: { id, is_deleted: false } });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.Skill.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.is_deleted = true;
    project.deleted_at = new Date();
    await project.save();

    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
