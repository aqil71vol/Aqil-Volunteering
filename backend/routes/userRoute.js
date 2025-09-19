// aqil-volunteering/backend/routes/userRouter.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserById, updateUser } = require('../controllers/userController');

// GET /api/user/:id
router.get('/:id', authMiddleware, getUserById);

// PUT /api/user/:id
router.put('/:id', authMiddleware, updateUser);

module.exports = router;

