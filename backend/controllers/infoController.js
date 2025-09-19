// aqil-volunteering/backend/controllers/infoController.js
const db = require('../models');

// GET info by user ID
exports.getInfoByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const info = await db.Info.findOne({ where: { user_id: userId } });
    if (!info) return res.status(404).json({ message: 'Info not found' });
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE or UPDATE info
exports.upsertInfo = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const [info, created] = await db.Info.upsert({
      user_id: userId,
      ...req.body
    }, { returning: true });
    res.json({ message: created ? 'Info created' : 'Info updated', info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
