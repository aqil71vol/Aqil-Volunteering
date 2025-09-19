// aqil-volunteering/backend/controllers/languageController.js
const db = require('../models');

exports.getLanguagesByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const languages = await db.Language.findAll({ where: { user_id: userId, is_deleted: false } });
    res.json(languages || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createLanguage = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const language = await db.Language.create({ user_id: userId, ...req.body });
    res.json({ message: 'Language added', language });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Language.update(req.body, { where: { id, is_deleted: false } });
    if (!updated) return res.status(404).json({ message: 'Language not found' });
    res.json({ message: 'Language updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await db.Language.findByPk(id);
    if (!language) return res.status(404).json({ message: 'Language not found' });

    language.is_deleted = true;
    language.deleted_at = new Date();
    await language.save();

    res.json({ message: 'Language deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
