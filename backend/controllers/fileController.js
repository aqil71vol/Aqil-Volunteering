// aqil-volunteering/backend/controllers/fileController.js
const db = require('../models');
const path = require('path');
const fs = require('fs');

exports.getFilesByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const files = await db.File.findAll({ where: { user_id: userId, is_deleted: false } });
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const userId = req.params.user_id;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const file = await db.File.create({
      user_id: userId,
      file_name: req.file.filename,
      file_path: req.file.path,
      file_type: req.file.mimetype
    });

    res.json({ message: 'File uploaded', file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await db.File.findByPk(id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    fs.unlinkSync(path.resolve(file.file_path));
    await file.destroy();
    res.json({ message: 'File deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
