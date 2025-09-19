┌───────────────────────────────┐
│           users               │
│───────────────────────────────│
│ PK id                         │
│ full_name                     │
│ email                         │
│ password                      │
│ last_ip                       │
│ is_deleted                    │
└─────────────┬─────────────────┘
              │ 1:N
              ▼
┌───────────────────────────────┐
│         user_infos            │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ national_id                   │
│ mother_name                   │
│ dob                           │
│ gender                        │
│ nationality                   │
│ country                       │
│ previous_address              │
│ current_address               │
│ marital_status                │
│ family_members                │
│ phone                         │
│ bio                           │
│ profile_image                 │
└───────────────────────────────┘

users ───1:N───> user_experiences
users ───1:N───> user_skills
users ───1:N───> user_trainings
users ───1:N───> user_languages
users ───1:N───> user_projects
users ───1:N───> user_files
users ───1:N───> user_data_entries (created_by_user_id)

┌───────────────────────────────┐
│     user_experiences          │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ job_title                     │
│ company_name                  │
│ location                      │
│ start_date                    │
│ end_date                      │
│ is_current                    │
│ description                   │
└───────────────────────────────┘

┌───────────────────────────────┐
│        user_skills            │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ skill_name                    │
│ level                         │
│ type (Skill/Hobby)            │
└───────────────────────────────┘

┌───────────────────────────────┐
│      user_trainings           │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ course_name                   │
│ provider                      │
│ certificate_url               │
│ start_date                    │
│ end_date                      │
│ description                   │
└───────────────────────────────┘

┌───────────────────────────────┐
│      user_languages           │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ language                      │
│ proficiency                   │
└───────────────────────────────┘

┌───────────────────────────────┐
│       user_projects           │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ project_name                  │
│ role                          │
│ description                   │
│ technologies                  │
│ start_date                    │
│ end_date                      │
│ project_url                   │
│ is_ongoing                    │
└───────────────────────────────┘

┌───────────────────────────────┐
│        user_files             │
│───────────────────────────────│
│ PK id                         │
│ FK user_id → users.id         │
│ file_name                     │
│ file_type                     │
│ file_size                     │
│ file_path                     │
│ category                      │
└───────────────────────────────┘

┌───────────────────────────────┐
│    user_data_entries          │
│───────────────────────────────│
│ PK id                         │
│ FK created_by_user_id → users.id │
│ target_full_name              │
│ target_email                  │
│ target_national_id            │
│ mother_name                   │
│ dob                           │
│ gender                        │
│ nationality                   │
│ country                       │
│ previous_address              │
│ current_address               │
│ marital_status                │
│ family_members                │
│ phone                         │
│ bio                           │
│ profile_image                 │
└───────────────────────────────┘

======================
🔹 Views (فيوزات)
======================
v_user_profile        : users + user_infos LEFT JOIN
v_user_experiences    : users + user_experiences JOIN
v_user_skills         : users + user_skills JOIN
v_user_trainings      : users + user_trainings JOIN
v_user_languages      : users + user_languages JOIN
v_user_projects       : users + user_projects JOIN
v_user_files          : users + user_files JOIN
v_user_data_entries   : users + user_data_entries JOIN

======================
🔹 Stored Procedures
======================
sp_add_user           : إضافة مستخدم جديد
sp_update_user        : تعديل بيانات مستخدم
sp_delete_user        : حذف مستخدم (Soft Delete)
sp_add_user_info      : إضافة معلومات شخصية
sp_delete_user_info   : حذف معلومات شخصية
sp_add_user_experience: إضافة خبرة
sp_delete_user_experience: حذف خبرة
sp_add_user_skill     : إضافة مهارة/هواية
sp_delete_user_skill  : حذف مهارة
sp_add_user_training  : إضافة تدريب
sp_delete_user_training: حذف تدريب
sp_add_user_language  : إضافة لغة
sp_delete_user_language: حذف لغة
sp_add_user_project   : إضافة مشروع
sp_delete_user_project: حذف مشروع
sp_add_user_file      : إضافة ملف
sp_delete_user_file   : حذف ملف
sp_add_user_data_entry: إضافة إدخال بيانات

======================
🔹 Triggers
======================
trg_before_delete_user:
- يمنع حذف المستخدم إذا كان لديه:
  user_experiences, user_skills, user_projects, user_files, user_infos, user_data_entries

======================
🔹 Events (مهام مجدولة)
======================
ev_clean_deleted_records : حذف سجلات Soft Deleted > 90 يوم
ev_archive_user_data_entries : أرشفة بيانات قديمة > 1 سنة
ev_update_system_stats : تحديث إحصائيات النظام كل 6 ساعات

======================
💡 الملاحظات:
- كل علاقة 1:N من users إلى الجداول الأخرى
- user_infos علاقة 1:1
- الفيوزات لتسهيل الاستعلامات المعقدة
- الإجراءات المخزنة لتسهيل عمليات CRUD
- المحفزات لحماية البيانات من الحذف غير المقصود
- الأحداث المجدولة لأتمتة الصيانة
======================

                                     ┌───────────────┐
                                     │    users      │
                                     │───────────────│
                                     │ id (PK)       │
                                     │ full_name     │
                                     │ email         │
                                     │ password      │
                                     │ last_ip       │
                                     │ is_deleted    │
                                     └─────┬─────────┘
                                           │
           ┌───────────────────────────────┼───────────────────────────────┐
           │                               │                               │
           ▼                               ▼                               ▼
   ┌───────────────┐               ┌───────────────┐               ┌───────────────┐
   │  user_infos   │               │ user_experiences│             │  user_skills  │
   │───────────────│               │───────────────│               │───────────────│
   │ id (PK)       │               │ id (PK)       │               │ id (PK)       │
   │ user_id (FK)  │◀───────────── │ user_id (FK)  │◀───────────── │ user_id (FK)  │
   │ national_id   │               │ job_title     │               │ skill_name    │
   │ mother_name   │               │ company_name  │               │ level         │
   │ dob           │               │ location      │               │ type          │
   │ gender        │               │ start_date    │               └───────────────┘
   │ nationality   │               │ end_date      │
   │ country       │               │ is_current    │
   │ previous_addr │               │ description   │
   │ current_addr  │               └───────────────┘
   │ marital_status│
   │ family_members│
   │ phone         │
   │ bio           │
   │ profile_image │
   └───────────────┘
           │
           ▼
   ┌───────────────┐
   │ user_trainings│
   │───────────────│
   │ id (PK)       │
   │ user_id (FK)  │◀────────────── users.id
   │ course_name   │
   │ provider      │
   │ certificate_url│
   │ start_date    │
   │ end_date      │
   │ description   │
   └───────────────┘

           ┌───────────────────────────────┐
           │                               │
           ▼                               ▼
   ┌───────────────┐               ┌───────────────┐
   │ user_languages│               │ user_projects │
   │───────────────│               │───────────────│
   │ id (PK)       │               │ id (PK)       │
   │ user_id (FK)  │◀───────────── │ user_id (FK)  │
   │ language      │               │ project_name  │
   │ proficiency   │               │ role          │
   └───────────────┘               │ description   │
                                   │ technologies  │
                                   │ start_date    │
                                   │ end_date      │
                                   │ project_url   │
                                   │ is_ongoing    │
                                   └───────────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │  user_files   │
                                   │───────────────│
                                   │ id (PK)       │
                                   │ user_id (FK)  │
                                   │ file_name     │
                                   │ file_type     │
                                   │ file_size     │
                                   │ file_path     │
                                   │ category      │
                                   └───────────────┘
                                           │
                                           ▼
                                   ┌────────────────────┐
                                   │ user_data_entries  │
                                   │────────────────────│
                                   │ id (PK)            │
                                   │ created_by_user_id(FK)◀──────── users.id
                                   │ target_full_name   │
                                   │ target_email       │
                                   │ target_national_id │
                                   │ mother_name        │
                                   │ dob                │
                                   │ gender             │
                                   │ nationality        │
                                   │ country            │
                                   │ previous_address   │
                                   │ current_address    │
                                   │ marital_status     │
                                   │ family_members     │
                                   │ phone              │
                                   │ bio                │
                                   │ profile_image      │
                                   └────────────────────┘
======================
==========================
👤 Users (المستخدمون)
==========================
┌───────────┐
│ users     │
│───────────│
│ id (PK)   │
│ full_name │
│ email     │
│ password  │
│ last_ip   │
│ is_deleted│
└─────┬─────┘
      │ 1
      │
      │
==========================
📝 Personal Info (المعلومات الشخصية)
==========================
┌─────────────┐
│ user_infos  │
│─────────────│
│ id (PK)     │
│ user_id(FK) │◀───────── users.id
│ national_id │
│ mother_name │
│ dob         │
│ gender      │
│ nationality │
│ country     │
│ previous_address │
│ current_address  │
│ marital_status   │
│ family_members   │
│ phone            │
│ bio              │
│ profile_image    │
└─────────────────┘

==========================
💼 Experiences & Skills (الخبرات والمهارات)
==========================
┌───────────────┐      ┌────────────┐
│ user_experiences │     │ user_skills │
│───────────────│      │────────────│
│ id (PK)       │      │ id (PK)    │
│ user_id(FK)   │◀─────┘ user_id(FK)│◀───── users.id
│ job_title     │      │ skill_name │
│ company_name  │      │ level      │
│ location      │      │ type       │
│ start_date    │      └────────────┘
│ end_date      │
│ is_current    │
│ description   │
└───────────────┘

==========================
📚 Trainings & Languages (التدريبات واللغات)
==========================
┌───────────────┐      ┌───────────────┐
│ user_trainings│      │ user_languages│
│───────────────│      │───────────────│
│ id (PK)       │      │ id (PK)       │
│ user_id(FK)   │◀─────┘ user_id(FK)   │◀───── users.id
│ course_name   │      │ language      │
│ provider      │      │ proficiency   │
│ certificate_url│     └───────────────┘
│ start_date    │
│ end_date      │
│ description   │
└───────────────┘

==========================
🚀 Projects & Files (المشاريع والملفات)
==========================
┌───────────────┐      ┌─────────────┐
│ user_projects │      │ user_files  │
│───────────────│      │─────────────│
│ id (PK)       │      │ id (PK)     │
│ user_id(FK)   │◀─────┘ user_id(FK)│◀───── users.id
│ project_name  │      │ file_name   │
│ role          │      │ file_type   │
│ description   │      │ file_size   │
│ technologies  │      │ file_path   │
│ start_date    │      │ category    │
│ end_date      │      └─────────────┘
│ project_url   │
│ is_ongoing    │
└───────────────┘

==========================
📥 Data Entries (إدخالات بيانات المستخدمين)
==========================
┌──────────────────┐
│ user_data_entries│
│──────────────────│
│ id (PK)          │
│ created_by_user_id│◀──── users.id
│ target_full_name │
│ target_email     │
│ target_national_id│
│ mother_name      │
│ dob              │
│ gender           │
│ nationality      │
│ country          │
│ previous_address │
│ current_address  │
│ marital_status   │
│ family_members   │
│ phone            │
│ bio              │
│ profile_image    │
└──────────────────┘
======================