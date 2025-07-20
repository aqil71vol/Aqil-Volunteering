const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const DataEntry = require('../models/DataEntry');

// 🔐 هذا هو المسار المحمي
router.post('/data-entry', authMiddleware, async (req, res) => {
  try {
    const {
      full_name,
      id_number,
      gender,
      nationality,
      email,
      phone,
      address
    } = req.body;

    const newEntry = new DataEntry({
      full_name,
      id_number,
      gender,
      nationality,
      email,
      phone,
      address,
      deleted: false
    });

    await newEntry.save();
    res.status(201).json({ message: "✅ Data saved successfully", data: newEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error saving data entry" });
  }
});

module.exports = router;
