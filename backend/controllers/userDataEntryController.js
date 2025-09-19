// aqil-volunteering/backend/controllers/userDataEntryController.js
const db = require('../models');

exports.getEntriesByUserId = async (req, res) => {
  try {
    const entries = await db.UserDataEntry.findAll({
      where: { created_by_user_id: req.params.id }
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEntry = async (req, res) => {
  try {
    const entry = await db.UserDataEntry.create({
      created_by_user_id: req.params.id,
      ...req.body
    });
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const [updated] = await db.UserDataEntry.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const deleted = await db.UserDataEntry.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
