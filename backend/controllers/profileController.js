// aqil-volunteering/backend/controllers/profileController.js
const db = require('../models');

exports.getMyProfile = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.user.id },
      include: ['info','experiences','skills','languages','projects','files','trainings'],
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'Profile not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePersonalInfo = async (req, res) => {
  try {
    const { full_name } = req.body;
    if (!full_name) return res.status(400).json({ message: 'full_name is required' });

    await db.User.update({ full_name }, { where: { id: req.user.id } });
    res.json({ message: 'Personal info updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// تحديث صورة البروفايل
exports.updatePhoto = async (req, res) => {
  try {
    const { photoUrl } = req.body;
    if (!photoUrl) return res.status(400).json({ message: 'photoUrl is required' });

    await db.User.update({ photo: photoUrl }, { where: { id: req.user.id } });
    res.json({ message: 'Profile photo updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
