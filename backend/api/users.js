const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ جلب بيانات المستخدم المحمي بـ JWT
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, full_name, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ تعديل اسم المستخدم
router.put('/:id', authMiddleware, async (req, res) => {
  const { full_name } = req.body;
  const { id } = req.params;

  if (!full_name) {
    return res.status(400).json({ message: 'Full name is required' });
  }

  try {
    await db.execute('UPDATE users SET full_name = ? WHERE id = ?', [full_name, id]);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ حذف مستخدم
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
