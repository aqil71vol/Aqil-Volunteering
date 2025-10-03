// aqil-volunteering/backend/controllers/dataEntryController.js
const { DataEntry } = require('../models');

// إنشاء سجل جديد
exports.createEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const created_by_name = req.user.email;
    const entryData = { ...req.body, user_id: userId, created_by_name };
    const newEntry = await DataEntry.create(entryData);
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create entry', error: err.message });
  }
};

// جلب جميع السجلات للمستخدم الحالي
exports.getAllEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await DataEntry.findAll({ where: { user_id: userId } });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch entries', error: err.message });
  }
};

// تحديث سجل
exports.updateEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const entry = await DataEntry.findOne({ where: { id, user_id: userId } });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    const { created_by_name, user_id: ignoredUserId, ...updateData } = req.body;
    await entry.update(updateData);
    res.json({ message: 'Entry updated successfully', entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update entry', error: err.message });
  }
};

// الحذف الناعم
exports.softDeleteEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const entry = await DataEntry.findOne({ where: { id, user_id: userId } });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    await entry.update({ is_deleted: true, deleted_at: new Date() });
    res.json({ message: 'Entry soft deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to soft delete', error: err.message });
  }
};

// الاسترجاع
exports.restoreEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const entry = await DataEntry.findOne({ where: { id, user_id: userId } });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    await entry.update({ is_deleted: false, deleted_at: null });
    res.json({ message: 'Entry restored' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to restore entry', error: err.message });
  }
};

// الحذف النهائي (Hard Delete)
exports.hardDeleteEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const entry = await DataEntry.findOne({ where: { id, user_id: userId } });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    await entry.destroy();
    res.json({ message: '✅ Entry permanently deleted from database' });
  } catch (err) {
    console.error("Hard Delete Error:", err);
    res.status(500).json({ message: 'Failed to hard delete', error: err.message });
  }
};
