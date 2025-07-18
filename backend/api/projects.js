// api/projects.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ إنشاء مشروع جديد
router.post('/', async (req, res) => {
  const { user_id, name, description } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: 'user_id and name are required' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO projects (user_id, name, description) VALUES (?, ?, ?)',
      [user_id, name, description || null]
    );

    res.status(201).json({ message: 'Project created successfully', project_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ جلب المشاريع الخاصة بمستخدم
router.get('/user/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const [projects] = await db.execute(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );

    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
