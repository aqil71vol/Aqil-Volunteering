backend/
├─ config/
│  └─ db.js                     # إعداد قاعدة البيانات (MySQL + Sequelize)
├─ middlewares/
│  └─ authMiddleware.js         # تحقق من JWT لكل الراوترات المحمية
├─ models/
│  ├─ index.js                  # استدعاء جميع الموديلات وتعريف العلاقات
│  ├─ user.js                   # جدول Users
│  │     └─ Fields: id, full_name, email, password, last_ip, is_deleted, created_at, updated_at
│  ├─ info.js                   # جدول Personal Info
│  │     └─ Fields: id, userId (FK), mother_name, dob, gender, nationality, country, previous_address, current_address, marital_status, family_members, photo_url, created_at, updated_at
│  ├─ experience.js             # جدول Experiences
│  │     └─ Fields: id, userId (FK), title, company, start_date, end_date, description, created_at, updated_at
│  ├─ skill.js                  # جدول Skills / Hobbies
│  │     └─ Fields: id, userId (FK), name, level, created_at, updated_at
│  ├─ language.js               # جدول Languages
│  │     └─ Fields: id, userId (FK), name, level, created_at, updated_at
│  ├─ project.js                # جدول Projects
│  │     └─ Fields: id, userId (FK), title, description, start_date, end_date, status, created_at, updated_at
│  └─ file.js                   # جدول الملفات المرفقة
│           └─ Fields: id, userId (FK), file_name, file_path, file_type, created_at, updated_at
├─ controllers/
│  ├─ authController.js         # تسجيل دخول/تسجيل مستخدم
│  ├─ userController.js         # عرض وتحديث بيانات المستخدم
│  ├─ infoController.js         # عرض وتحديث Personal Info
│  ├─ experienceController.js   # CRUD خبرات المستخدم
│  ├─ skillController.js        # CRUD مهارات/هوايات
│  ├─ languageController.js     # CRUD لغات المستخدم
│  ├─ projectController.js      # CRUD المشاريع
│  └─ fileController.js         # رفع وعرض الملفات
├─ routes/
│  ├─ auth.js                   # POST /register, POST /login
│  ├─ users.js                  # GET /users/:id, PUT /users/:id
│  ├─ info.js                   # GET/POST /info
│  ├─ experience.js             # GET/POST/PUT/DELETE /experience
│  ├─ skill.js                  # GET/POST/PUT/DELETE /skills
│  ├─ language.js               # GET/POST/PUT/DELETE /languages
│  ├─ project.js                # GET/POST/PUT/DELETE /projects
│  └─ file.js                   # POST /upload, GET /files
├─ .env                         # إعدادات DB و JWT_SECRET و PORT
└─ server.js                     # نقطة الانطلاق: إعداد Middleware، Routes، DB، بدء السيرفر


# Aqil Volunteering Project

هذا المشروع يتكون من **Backend** و **Frontend** مع قاعدة بيانات MySQL.

---

## 🚀 طريقة التشغيل

### 1. المتطلبات الأساسية
- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/)
- [Git](https://git-scm.com/)

---

### 2. إعداد قاعدة البيانات (MySQL)
1. شغل XAMPP (Apache + MySQL).
2. افتح المتصفح على:

http://localhost/phpmyadmin
3. أنشئ قاعدة بيانات جديدة باسم:
aqil_db
4. استورد ملف قاعدة البيانات الموجود في:
/database/aqil_db.sql
- من داخل phpMyAdmin اختر قاعدة البيانات.
- اضغط **Import**.
- اختر الملف `aqil_db.sql`.
- اضغط **Go**.

---

### 3. إعداد الـ Backend
1. انتقل لمجلد الباك إند:
```bash
cd backend

2. ثبت البكجات:
npm install
3. عدّل ملف إعدادات الاتصال بقاعدة البيانات (مثلاً config.js أو .env) ليكون كالتالي:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=aqil_db
4. شغل السيرفر:
npm start

4. إعداد الـ Frontend

    1. انتقل لمجلد الفرانت إند:
    cd frontend
    2. ثبت البكجات:
    npm install
    3. شغل الفرانت إند:
    npm start

📌 ملاحظات

. الملف database/aqil_db.sql يحتوي نسخة من قاعدة البيانات.

. إذا عدّلت على القاعدة محليًا وتحب ترفع نسخة جديدة:

    1. من phpMyAdmin اعمل Export للقاعدة.

    2. استبدل الملف aqil_db.sql بالنسخة الجديدة.

    3.اعمل commit & push.

