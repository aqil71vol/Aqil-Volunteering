// aqil-volunteering/backend/controllers/userDataEntryArchiveController.js
const db = require('../models');

// GET all archived entries for a user
exports.getArchivedEntriesByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const entries = await db.UserDataEntryArchive.findAll({
      where: { created_by_user_id: userId, is_deleted: false }
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE a new archived entry
exports.createArchivedEntry = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const entry = await db.UserDataEntryArchive.create({ created_by_user_id: userId, ...req.body });
    res.json({ message: 'Archived entry created', entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE an archived entry
exports.updateArchivedEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.UserDataEntryArchive.update(req.body, { where: { id, is_deleted: false } });
    if (!updated) return res.status(404).json({ message: 'Archived entry not found' });
    res.json({ message: 'Archived entry updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// SOFT DELETE an archived entry
exports.deleteArchivedEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await db.UserDataEntryArchive.findByPk(id);
    if (!entry) return res.status(404).json({ message: 'Archived entry not found' });

    entry.is_deleted = true;
    entry.deleted_at = new Date();
    await entry.save();

    res.json({ message: 'Archived entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
