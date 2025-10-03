// aqil-volunteering/backend/middlewares/dataEntryMiddleware.js
module.exports = (req, res, next) => {
  try {
    if (!req.body) req.body = {};

    if (req.method === 'POST' || req.method === 'PUT') {
      if (!req.body.user_id && req.user) req.body.user_id = req.user.id;

      if (req.method === 'POST' && !req.body.created_by_name && req.user) {
        req.body.created_by_name = req.user.email;
      }
    }

    next();
  } catch (err) {
    console.error('DataEntry Middleware Error:', err);
    res.status(500).json({ message: 'Middleware error', error: err.message });
  }
};
