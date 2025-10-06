// aqil-volunteering/backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized: No token' });

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid token format' });

    let decoded;

    try {
      // المحاولة الأساسية: JWT ثابت من السيرفر
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      console.warn('⚠️ JWT verification failed with JWT_SECRET:', err.message);
      return res.status(401).json({ message: 'Invalid/expired token', error: err.message });
    }

  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(500).json({ message: 'Middleware error', error: err.message });
  }
};

module.exports = authMiddleware;





// aqil-volunteering/backend/middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log("🔎 Incoming Authorization header:", authHeader); // 👈 للتأكد

//     if (!authHeader) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     const parts = authHeader.split(' ');
//     if (parts.length !== 2 || parts[0] !== 'Bearer') {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
//     }

//     const token = parts[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // نضع بيانات المستخدم في req.user
//     next();
//   } catch (err) {
//     console.error('JWT verification error:', err);
//     res.status(401).json({ message: 'Invalid token', error: err.message });
//   }
// };

// module.exports = authMiddleware;
