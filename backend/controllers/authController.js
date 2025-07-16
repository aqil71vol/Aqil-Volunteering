const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // تحقق من وجود المستخدم
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "البريد الإلكتروني موجود مسبقاً" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إدخال المستخدم
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ أثناء التسجيل", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "البريد الإلكتروني غير صحيح" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: "تم تسجيل الدخول", token });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول", error: err });
  }
};
