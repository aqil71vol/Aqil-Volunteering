// aqil-volunteering/backend/controllers/authController.js
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // التحقق من وجود مستخدم بنفس الإيميل
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      full_name,
      email,
      password: hashedPassword,
      last_ip: req.ip
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
