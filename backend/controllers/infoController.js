// aqil-volunteering/backend/controllers/infoController.js
const db = require('../models');
const path = require('path');
const fs = require('fs');

// دالة لتصفية البيانات الواردة وضمان وجود قيم افتراضية
const sanitizeInfoInput = (data) => ({
  national_id: data?.national_id || null,
  full_name: data?.full_name || '',
  mother_name: data?.mother_name || null,
  dob: data?.dob || null,
  gender: data?.gender || null,
  nationality: data?.nationality || null,
  country: data?.country || null,
  previous_address: data?.previous_address || null,
  current_address: data?.current_address || null,
  marital_status: data?.marital_status || null,
  family_members: data?.family_members ? parseInt(data.family_members) : 0,
  phone: data?.phone || null,
  bio: data?.bio || null,
  profile_image: data?.profile_image || null
});

// GET Info للمستخدم الحالي
exports.getInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    let info = await db.Info.findOne({
      where: { user_id: userId, is_deleted: false }
    });

    if (!info) {
      info = {
        user_id: userId,
        national_id: null,
        full_name: '',
        mother_name: null,
        dob: null,
        gender: null,
        nationality: null,
        country: null,
        previous_address: null,
        current_address: null,
        marital_status: null,
        family_members: 0,
        phone: null,
        bio: null,
        profile_image: null,
        last_ip: null,
        created_at: null,
        updated_at: null
      };
    }

    res.json(info);
  } catch (err) {
    console.error('❌ خطأ أثناء تحميل المعلومات الشخصية:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE أو UPDATE Info مع دعم الصور وحذف القديمة
exports.saveInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    let info = await db.Info.findOne({ where: { user_id: userId } });

    // حفظ مسار الصورة القديمة قبل التحديث
    let oldImagePath = info?.profile_image ? path.join(__dirname, '..', info.profile_image) : null;

    // معالجة صورة الملف الجديدة إذا موجودة
    if (req.file) {
      req.body.profile_image = `/uploads/profile_image/${req.file.filename}`;

      // حذف الصورة القديمة إذا موجودة
      if (oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('❌ خطأ أثناء حذف الصورة القديمة:', err);
        });
      }
    }

    const sanitizedData = sanitizeInfoInput(req.body);

    if (info) {
      await info.update(sanitizedData);
      res.json({ message: 'Info updated', info });
    } else {
      info = await db.Info.create({ user_id: userId, ...sanitizedData });
      res.status(201).json({ message: 'Info created', info });
    }

  } catch (err) {
    console.error('❌ خطأ أثناء حفظ المعلومات الشخصية:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE Info
exports.deleteInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const info = await db.Info.findOne({ where: { user_id: userId } });
    if (!info) return res.status(404).json({ message: 'Info not found' });

    // حذف الصورة من السيرفر عند حذف السجل
    if (info.profile_image) {
      const imgPath = path.join(__dirname, '..', info.profile_image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await info.destroy();
    res.json({ message: 'Info deleted' });

  } catch (err) {
    console.error('❌ خطأ أثناء حذف المعلومات الشخصية:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
