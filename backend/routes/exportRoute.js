// aqil-volunteering/backend/routes/exportRoute.js
const express = require("express");
const router = express.Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// 🔹 مسار الخط العربي
const arabicFontPath = path.join(__dirname, "../fonts/Amiri-Regular.ttf");

// 🟦 Helper: عنوان قسم منسق
function styledSectionTitle(doc, text, isArabic) {
  doc.moveDown(1);
  doc.rect(50, doc.y, doc.page.width - 100, 25).fill("#f0f4ff").stroke();
  doc.fillColor("#007BFF").fontSize(14).text(text, 55, doc.y - 20, { align: isArabic ? "right" : "left" });
  doc.moveDown();
  doc.fillColor("black");
}

// 🟦 Helper: خط فاصل أنيق
function sectionDivider(doc) {
  doc.moveDown(0.5);
  doc.strokeColor("#cccccc").lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();
  doc.moveDown();
}

// 🟦 مسار معاينة CV
router.get("/cv/:lang/preview", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { lang } = req.params;
  const isArabic = lang === "ar";

  try {
    // بيانات المستخدم الأساسية
    const [info] = await sequelize.query(
      `SELECT * FROM v_user_profile WHERE user_id = :userId`,
      { replacements: { userId }, type: QueryTypes.SELECT }
    );
    if (!info) return res.status(404).send("❌ لا توجد بيانات للسيرة الذاتية");

    // باقي الأقسام
    const [projects, experiences, trainings, skills, languages] = await Promise.all([
      sequelize.query(`SELECT * FROM v_user_projects WHERE user_id = :userId`, { replacements: { userId }, type: QueryTypes.SELECT }),
      sequelize.query(`SELECT * FROM v_user_experiences WHERE user_id = :userId`, { replacements: { userId }, type: QueryTypes.SELECT }),
      sequelize.query(`SELECT * FROM v_user_trainings WHERE user_id = :userId`, { replacements: { userId }, type: QueryTypes.SELECT }),
      sequelize.query(`SELECT * FROM v_user_skills WHERE user_id = :userId`, { replacements: { userId }, type: QueryTypes.SELECT }),
      sequelize.query(`SELECT * FROM v_user_languages WHERE user_id = :userId`, { replacements: { userId }, type: QueryTypes.SELECT }),
    ]);

    // إعداد PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="cv_${lang}_${Date.now()}.pdf"`);

    const doc = new PDFDocument({ margin: 50 });

    // تسجيل الخط العربي إذا موجود
    if (isArabic && fs.existsSync(arabicFontPath)) {
      doc.registerFont("Arabic", arabicFontPath);
      doc.font("Arabic");
    }

    doc.pipe(res);

    // العنوان الرئيسي
    const mainTitle = isArabic ? "السيرة الذاتية" : "Curriculum Vitae";
    doc.fontSize(22).fillColor("#333333").text(mainTitle, { align: "center" });
    doc.moveDown();

    // صورة شخصية
    if (info.profile_image) {
      try {
        const imgPath = path.join(__dirname, `..${info.profile_image}`);
        if (fs.existsSync(imgPath)) {
          doc.image(imgPath, doc.page.width / 2 - 50, doc.y, { width: 100, height: 100 });
          doc.moveDown(2);
        }
      } catch (err) {
        console.warn("⚠️ لم أستطع تحميل الصورة:", err.message);
      }
    }

    // المعلومات الشخصية
    if (info.full_name || info.national_id || info.dob || info.nationality || info.current_address || info.phone) {
      styledSectionTitle(doc, isArabic ? "المعلومات الشخصية" : "Personal Information", isArabic);
      if (info.full_name) doc.fontSize(12).text(`${isArabic ? "الاسم الكامل" : "Full Name"}: ${info.full_name}`, { align: isArabic ? "right" : "left" });
      if (info.national_id) doc.text(`${isArabic ? "الرقم الوطني" : "National ID"}: ${info.national_id}`, { align: isArabic ? "right" : "left" });
      if (info.dob) doc.text(`${isArabic ? "تاريخ الميلاد" : "Date of Birth"}: ${info.dob}`, { align: isArabic ? "right" : "left" });
      if (info.nationality) doc.text(`${isArabic ? "الجنسية" : "Nationality"}: ${info.nationality}`, { align: isArabic ? "right" : "left" });
      if (info.current_address) doc.text(`${isArabic ? "العنوان الحالي" : "Current Address"}: ${info.current_address}`, { align: isArabic ? "right" : "left" });
      if (info.phone) doc.text(`${isArabic ? "الهاتف" : "Phone"}: ${info.phone}`, { align: isArabic ? "right" : "left" });
      sectionDivider(doc);
    }

    // النبذة
    if (info.bio) {
      styledSectionTitle(doc, isArabic ? "نبذة" : "Bio", isArabic);
      doc.fontSize(12).text(info.bio, { align: isArabic ? "right" : "justify" });
      sectionDivider(doc);
    }

    // التعليم / التدريب
    if (trainings.length > 0) {
      styledSectionTitle(doc, isArabic ? "التعليم والتدريب" : "Education & Training", isArabic);
      trainings.forEach(t => {
        const dates = t.start_date && t.end_date ? ` (${t.start_date} - ${t.end_date})` : "";
        const courseLine = `${t.course_name}${t.provider ? ` - ${t.provider}` : ""}${dates}`;
        doc.fontSize(12).text(courseLine, { align: isArabic ? "right" : "left" });
      });
      sectionDivider(doc);
    }

    // الخبرات
    if (experiences.length > 0) {
      styledSectionTitle(doc, isArabic ? "الخبرات" : "Experience", isArabic);
      experiences.forEach(e => {
        const dates = e.start_date && e.end_date ? ` (${e.start_date} - ${e.end_date})` : "";
        const jobLine = `${e.job_title}${e.company_name ? ` - ${e.company_name}` : ""}${dates}`;
        doc.fontSize(12).text(jobLine, { align: isArabic ? "right" : "left" });
        if (e.description) doc.text(e.description, { align: isArabic ? "right" : "justify" });
        doc.moveDown(0.5);
      });
      sectionDivider(doc);
    }

    // المهارات
    if (skills.length > 0) {
      styledSectionTitle(doc, isArabic ? "المهارات" : "Skills", isArabic);
      skills.forEach(s => {
        if (s.skill_name) {
          const skillLine = `- ${s.skill_name}${s.level ? ` (${s.level})` : ""}`;
          doc.fontSize(12).text(skillLine, { align: isArabic ? "right" : "left" });
        }
      });
      sectionDivider(doc);
    }

    // اللغات
    if (languages.length > 0) {
      styledSectionTitle(doc, isArabic ? "اللغات" : "Languages", isArabic);
      languages.forEach(l => {
        if (l.language) {
          const langLine = `- ${l.language}${l.proficiency ? `: ${l.proficiency}` : ""}`;
          doc.fontSize(12).text(langLine, { align: isArabic ? "right" : "left" });
        }
      });
      sectionDivider(doc);
    }

    // المشاريع
    if (projects.length > 0) {
      styledSectionTitle(doc, isArabic ? "المشاريع" : "Projects", isArabic);
      projects.forEach(p => {
        const dates = p.start_date && p.end_date ? ` (${p.start_date} - ${p.end_date})` : "";
        const projectLine = `${p.project_name}${p.role ? ` - ${p.role}` : ""}${dates}`;
        doc.fontSize(12).text(projectLine, { align: isArabic ? "right" : "left" });
        if (p.description) doc.text(p.description, { align: isArabic ? "right" : "justify" });
        doc.moveDown(0.5);
      });
    }

    doc.end();
  } catch (err) {
    console.error("❌ خطأ أثناء إنشاء PDF:", err);
    res.status(500).send("Server error while generating CV");
  }
});

module.exports = router;
