const jwt = require('jsonwebtoken');

/**
 * ميدل وير للتحقق من التوكن المرسل من المستخدم
 * - يبحث في Header عن: Authorization: Bearer TOKEN
 * - إذا كان التوكن صحيحًا → يمرّر الطلب إلى التالي
 * - إذا لم يكن موجودًا أو منتهيًا → يرجع خطأ
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // التحقق من وجود التوكن
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // تحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // تمرير بيانات المستخدم بعد فك التوكن
    next(); // انتقل للراوتر التالي
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
