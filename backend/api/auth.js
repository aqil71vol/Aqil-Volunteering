const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ← تأكد من مسار قاعدة البيانات

// ✅ تسجيل المستخدم
router.post('/register', async (req, res) => {
  const { full_name, email, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // تحقق من وجود المستخدم
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // حفظ المستخدم الجديد
    await db.query(
      'INSERT INTO users (full_name, email, password, last_ip) VALUES (?, ?, ?, ?)',
      [full_name, email, password, ip]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ تسجيل الدخول
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    // ✅ تحديث عنوان IP بعد تسجيل الدخول
    await db.query('UPDATE users SET last_ip = ? WHERE id = ?', [ip, user.id]);

    res.status(200).json({ message: 'Login successful', email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
