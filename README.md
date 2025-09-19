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
