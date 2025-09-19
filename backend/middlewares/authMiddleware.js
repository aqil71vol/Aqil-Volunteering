// aqil-volunteering/backend/middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  try {
    // مثال بسيط: تحقق من وجود header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    // لو عندك JWT، يمكن إضافته هنا
    // const token = authHeader.split(' ')[1];
    // التحقق من صحة التوكن...

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
