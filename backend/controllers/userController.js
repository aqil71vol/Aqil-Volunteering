// aqil-volunteering/backend/controllers/userController.js
const db = require('../models');
const bcrypt = require('bcrypt');

// جلب بيانات مستخدم
exports.getUserById = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id, is_deleted: false },
      attributes: { exclude: ['password'] },
      include: [
        { model: db.Info, as: 'info' },
        { model: db.Experience, as: 'experiences' },
        { model: db.Skill, as: 'skills' },
        { model: db.Language, as: 'languages' },
        { model: db.Project, as: 'projects' },
        { model: db.File, as: 'files' },
      ],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// تحديث بيانات مستخدم
exports.updateUser = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.full_name) updateData.full_name = req.body.full_name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) updateData.password = await bcrypt.hash(req.body.password, 10);

    const [updated] = await db.User.update(updateData, { where: { id: req.params.id, is_deleted: false } });
    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
