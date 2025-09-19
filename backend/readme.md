# Aqil Volunteering - Backend

Backend API باستخدام Node.js + Express + MySQL (Sequelize لبعض النماذج)

## المتطلبات
- Node.js >= 18
- MySQL
- npm

## إعداد المشروع

1. استنساخ المشروع:
```bash
git clone <repo-url>
cd aqil-volunteering/backend

2. تثبيت الاعتماديات:
تثبيت الاعتماديات:

3. إعداد قاعدة البيانات:

. إنشاء قاعدة بيانات جديدة في MySQL باسم aqil_db (أو ما تحدده في .env).

4. إعداد ملف .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=aqil_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key_here
PORT=5000

5. تشغيل السيرفر :

npm start

او التطوير مع اعادة التشغيل :

npm run dev

الهيكلية :

backend/
├── api/                  # ملفات API routes (auth, users, profile, ...)
├── config/               # إعدادات قاعدة البيانات
├── controllers/          # وظائف التعامل مع البيانات
├── middlewares/          # Middlewares مثل JWT Auth
├── models/               # نماذج Sequelize
├── routes/               # ربط الكنترولرز بالمسارات
├── server.js             # نقطة البداية للتطبيق
└── .env                  # متغيرات البيئة

aqil-volunteering/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/              ← 🔑 ضع فيه سكربتات التوليد
│   │   ├── generate-jwt-secret.js
│   │   └── generate-password.js
│   ├── server.js
│   └── .env
├─ seed/
│  └─ dataEntry.js      ← هنا يكون الملف


المسارات الأساسية

Auth

POST /api/register - تسجيل مستخدم جديد

POST /api/login - تسجيل دخول

Users

GET /api/users/me - جلب بيانات المستخدم الحالي

PUT /api/users/:id - تعديل بيانات المستخدم

DELETE /api/users/:id - حذف المستخدم

Profile

GET /api/profile/me - جلب بروفايل المستخدم

POST /api/profile/me - إنشاء/تحديث البروفايل

GET/POST /api/profile/experience - إدارة الخبرات

GET/POST /api/profile/jobs - إدارة الوظائف

GET/POST /api/profile/skills - إدارة المهارات والهوايات

GET/POST /api/profile/languages - إدارة اللغات

POST /api/profile/photo - رفع الصورة الشخصية

ملاحظات

جميع المسارات المحمية تحتاج JWT.

يمكنك استخدام Postman أو أي client لاختبار الـ API.




// ==========================
// MODELS (Tables + Columns)
// ==========================
const models = {
  // USERS
  users: {
    columns: [
      "id",
      "full_name",
      "email",
      "password",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  },

  // USER DATA ENTRIES
  user_data_entries: {
    columns: [
      "id",
      "created_by_user_id",
      "target_full_name",
      "target_email",
      "target_national_id",
      "mother_name",
      "dob",
      "gender",
      "nationality",
      "country",
      "previous_address",
      "current_address",
      "marital_status",
      "family_members",
      "phone",
      "bio",
      "profile_image",
      "created_at",
      "updated_at"
    ]
  },

  // USER DATA ENTRIES ARCHIVE
  user_data_entries_archive: {
    columns: [
      "id",
      "created_by_user_id",
      "target_full_name",
      "target_email",
      "target_national_id",
      "mother_name",
      "dob",
      "gender",
      "nationality",
      "country",
      "previous_address",
      "current_address",
      "marital_status",
      "family_members",
      "phone",
      "bio",
      "profile_image",
      "created_at",
      "updated_at"
    ]
  },

  // USER EXPERIENCES
  user_experiences: {
    columns: [
      "id",
      "user_id",
      "job_title",
      "company_name",
      "location",
      "start_date",
      "end_date",
      "is_current",
      "description",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  },

  // USER FILES
  user_files: {
    columns: [
      "id",
      "user_id",
      "file_name",
      "file_type",
      "file_size",
      "file_path",
      "category",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  },

  // USER INFOS
  user_infos: {
    columns: [
      "id",
      "user_id",
      "national_id",
      "mother_name",
      "dob",
      "gender",
      "nationality",
      "country",
      "previous_address",
      "current_address",
      "marital_status",
      "family_members",
      "phone",
      "bio",
      "profile_image",
      "created_at",
      "updated_at"
    ]
  },

  // USER LANGUAGES
  user_languages: {
    columns: [
      "id",
      "user_id",
      "language",
      "proficiency",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  },

  // USER PROJECTS
  user_projects: {
    columns: [
      "id",
      "user_id",
      "project_name",
      "role",
      "description",
      "technologies",
      "start_date",
      "end_date",
      "project_url",
      "is_ongoing",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  },

  // USER SKILLS
  user_skills: {
    columns: [
      "id",
      "user_id",
      "skill_name",
      "level",
      "type",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  },

  // USER TRAININGS
  user_trainings: {
    columns: [
      "id",
      "user_id",
      "course_name",
      "provider",
      "certificate_url",
      "start_date",
      "end_date",
      "description",
      "last_ip",
      "created_at",
      "updated_at",
      "deleted_at",
      "is_deleted"
    ]
  }
};
// نهاية MODELS

// ==========================
// CONTROLLERS
// ==========================
const controllers = [
  "authController.js",
  "experienceController.js",
  "fileController.js",
  "infoController.js",
  "languageController.js",
  "profileController.js",
  "projectController.js",
  "skillController.js",
  "trainingController.js",
  "userController.js",
  "userDataEntryArchiveController.js",
  "userDataEntryController.js",
  "photoController.js"
];
// نهاية CONTROLLERS

// ==========================
// ROUTES
// ==========================
const routes = [
  "authRoute.js",
  "experienceRoute.js",
  "fileRoute.js",
  "infoRoute.js",
  "languageRoute.js",
  "profileRoute.js",
  "projectRoute.js",
  "skillRoute.js",
  "trainingRoute.js",
  "userRouter.js",
  "userDataEntryArchiveRoute.js",
  "userDataEntryRoute.js",
  "photoRoute.js",
  "index.js"
];
// نهاية ROUTES

