// aqil-volunteering/backend/controllers/photoController.js
const path = require('path');
const fs = require('fs');
const db = require('../models'); // استخدام Sequelize models
const multer = require('multer');

// -------------------------
// ✅ إعداد multer لتخزين الصور
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'profile_photos');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.user.id}${ext}`);
  }
});

const upload = multer({ storage });

// -------------------------
// ✅ تحديث الصورة الشخصية
// -------------------------
const updatePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const photoPath = `uploads/profile_photos/${req.file.filename}`;

  try {
    await db.User.update(
      { photo: photoPath },
      { where: { id: req.user.id } }
    );

    res.json({ message: 'Profile photo updated successfully', photo: photoPath });
  } catch (err) {
    console.error('Photo update error:', err);
    res.status(500).json({ message: 'Server error updating photo' });
  }
};

module.exports = {
  upload,
  updatePhoto
};
