📦 سكربت قاعدة البيانات

-- =====================
-- 1️⃣ إنشاء قاعدة البيانات
-- =====================
DROP DATABASE IF EXISTS aqil_db;
CREATE DATABASE aqil_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aqil_db;

-- =====================
-- 2️⃣ جدول المستخدمين (users)
-- =====================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0
);

-- =====================
-- 3️⃣ جدول المعلومات الشخصية (user_infos)
-- =====================
CREATE TABLE user_infos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  national_id VARCHAR(50),
  mother_name VARCHAR(255),
  dob DATE,
  gender ENUM('Female','Male','Other'),
  nationality VARCHAR(100),
  country VARCHAR(100),
  previous_address VARCHAR(255),
  current_address VARCHAR(255),
  marital_status VARCHAR(50),
  family_members INT,
  phone VARCHAR(50),
  bio TEXT,
  profile_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- 4️⃣ جدول الخبرات العملية (user_experiences)
-- =====================
CREATE TABLE user_experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  job_title VARCHAR(150) NOT NULL,
  company_name VARCHAR(150),
  location VARCHAR(150),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- 5️⃣ جدول المهارات والهوايات (user_skills)
-- =====================
CREATE TABLE user_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  level ENUM('Beginner','Intermediate','Advanced','Expert') DEFAULT 'Beginner',
  type ENUM('Skill','Hobby') DEFAULT 'Skill',
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- 6️⃣ جدول التدريبات (user_trainings)
-- =====================
CREATE TABLE user_trainings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_name VARCHAR(150) NOT NULL,
  provider VARCHAR(150),
  certificate_url VARCHAR(255),
  start_date DATE,
  end_date DATE,
  description TEXT,
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- 7️⃣ جدول اللغات (user_languages)
-- =====================
CREATE TABLE user_languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  language VARCHAR(100) NOT NULL,
  proficiency ENUM('Basic','Intermediate','Fluent','Native') DEFAULT 'Basic',
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- 8️⃣ جدول المشاريع (user_projects)
-- =====================
CREATE TABLE user_projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_name VARCHAR(150) NOT NULL,
  role VARCHAR(100),
  description TEXT,
  technologies VARCHAR(255),
  start_date DATE,
  end_date DATE,
  project_url VARCHAR(255),
  is_ongoing BOOLEAN DEFAULT FALSE,
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- 9️⃣ جدول الملفات (user_files)
-- =====================
CREATE TABLE user_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size INT,
  file_path VARCHAR(500),
  category ENUM('Profile','Document','Project','Other') DEFAULT 'Other',
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 🔟 جدول إدخالات البيانات (user_data_entries)
-- =====================
CREATE TABLE user_data_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_by_user_id INT NOT NULL, -- المستخدم الذي قام بالإضافة
  target_full_name VARCHAR(255),
  target_email VARCHAR(255),
  target_national_id VARCHAR(50),
  mother_name VARCHAR(255),
  dob DATE,
  gender ENUM('Female','Male','Other'),
  nationality VARCHAR(100),
  country VARCHAR(100),
  previous_address VARCHAR(255),
  current_address VARCHAR(255),
  marital_status VARCHAR(50),
  family_members INT,
  phone VARCHAR(50),
  bio TEXT,
  profile_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE CASCADE
);


📊 Views (الفيوز)

-- =====================
-- الفيوز (Views)
-- =====================

-- 1️⃣ عرض بيانات المستخدم الأساسية مع معلوماته الشخصية
CREATE OR REPLACE VIEW v_user_profile AS
SELECT u.id AS user_id, u.full_name, u.email,
       i.national_id, i.mother_name, i.dob, i.gender, i.nationality,
       i.country, i.previous_address, i.current_address,
       i.marital_status, i.family_members, i.phone, i.bio, i.profile_image,
       u.created_at, u.updated_at
FROM users u
LEFT JOIN user_infos i ON u.id = i.user_id
WHERE u.is_deleted = 0;

-- 2️⃣ عرض الخبرات العملية
CREATE OR REPLACE VIEW v_user_experiences AS
SELECT e.id, e.user_id, u.full_name, e.job_title, e.company_name, e.location,
       e.start_date, e.end_date, e.is_current, e.description
FROM user_experiences e
JOIN users u ON e.user_id = u.id
WHERE e.is_deleted = 0;

-- 3️⃣ عرض المهارات والهوايات
CREATE OR REPLACE VIEW v_user_skills AS
SELECT s.id, s.user_id, u.full_name, s.skill_name, s.level, s.type
FROM user_skills s
JOIN users u ON s.user_id = u.id
WHERE s.is_deleted = 0;

-- 4️⃣ عرض التدريبات
CREATE OR REPLACE VIEW v_user_trainings AS
SELECT t.id, t.user_id, u.full_name, t.course_name, t.provider, t.certificate_url,
       t.start_date, t.end_date, t.description
FROM user_trainings t
JOIN users u ON t.user_id = u.id
WHERE t.is_deleted = 0;

-- 5️⃣ عرض اللغات
CREATE OR REPLACE VIEW v_user_languages AS
SELECT l.id, l.user_id, u.full_name, l.language, l.proficiency
FROM user_languages l
JOIN users u ON l.user_id = u.id
WHERE l.is_deleted = 0;

-- 6️⃣ عرض المشاريع
CREATE OR REPLACE VIEW v_user_projects AS
SELECT p.id, p.user_id, u.full_name, p.project_name, p.role, p.description,
       p.technologies, p.start_date, p.end_date, p.project_url, p.is_ongoing
FROM user_projects p
JOIN users u ON p.user_id = u.id
WHERE p.is_deleted = 0;

-- 7️⃣ عرض الملفات
CREATE OR REPLACE VIEW v_user_files AS
SELECT f.id, f.user_id, u.full_name, f.file_name, f.file_type, f.file_size,
       f.file_path, f.category, f.created_at
FROM user_files f
JOIN users u ON f.user_id = u.id
WHERE f.is_deleted = 0;

-- 8️⃣ عرض إدخالات البيانات (directory)
CREATE OR REPLACE VIEW v_user_data_entries AS
SELECT e.id, e.created_by_user_id, u.full_name AS created_by_name,
       e.target_full_name, e.target_email, e.target_national_id,
       e.mother_name, e.dob, e.gender, e.nationality,
       e.country, e.previous_address, e.current_address,
       e.marital_status, e.family_members, e.phone, e.bio, e.profile_image,
       e.created_at
FROM user_data_entries e
JOIN users u ON e.created_by_user_id = u.id;


⚙️ Stored Procedures (الإجراءات)

DELIMITER //

-- =====================
-- 1️⃣ المستخدمين
-- =====================
CREATE PROCEDURE sp_add_user(
    IN p_full_name VARCHAR(255),
    IN p_email VARCHAR(150),
    IN p_password VARCHAR(255),
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO users(full_name, email, password, last_ip)
    VALUES(p_full_name, p_email, p_password, p_last_ip);
END //

CREATE PROCEDURE sp_update_user(
    IN p_id INT,
    IN p_full_name VARCHAR(255),
    IN p_email VARCHAR(150),
    IN p_last_ip VARCHAR(45)
)
BEGIN
    UPDATE users
    SET full_name = p_full_name,
        email = p_email,
        last_ip = p_last_ip
    WHERE id = p_id AND is_deleted = 0;
END //

CREATE PROCEDURE sp_delete_user(IN p_id INT)
BEGIN
    UPDATE users
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id;
END //

-- =====================
-- 2️⃣ المعلومات الشخصية
-- =====================
CREATE PROCEDURE sp_add_user_info(
    IN p_user_id INT,
    IN p_national_id VARCHAR(50),
    IN p_mother_name VARCHAR(255),
    IN p_dob DATE,
    IN p_gender ENUM('Female','Male','Other'),
    IN p_nationality VARCHAR(100),
    IN p_country VARCHAR(100),
    IN p_previous_address VARCHAR(255),
    IN p_current_address VARCHAR(255),
    IN p_marital_status VARCHAR(50),
    IN p_family_members INT,
    IN p_phone VARCHAR(50),
    IN p_bio TEXT,
    IN p_profile_image VARCHAR(255)
)
BEGIN
    INSERT INTO user_infos(user_id, national_id, mother_name, dob, gender, nationality,
                           country, previous_address, current_address, marital_status,
                           family_members, phone, bio, profile_image)
    VALUES(p_user_id, p_national_id, p_mother_name, p_dob, p_gender, p_nationality,
           p_country, p_previous_address, p_current_address, p_marital_status,
           p_family_members, p_phone, p_bio, p_profile_image);
END //

CREATE PROCEDURE sp_delete_user_info(IN p_user_id INT)
BEGIN
    DELETE FROM user_infos WHERE user_id = p_user_id;
END //

-- =====================
-- 3️⃣ الخبرات
-- =====================
CREATE PROCEDURE sp_add_user_experience(
    IN p_user_id INT,
    IN p_job_title VARCHAR(150),
    IN p_company_name VARCHAR(150),
    IN p_location VARCHAR(150),
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_is_current BOOLEAN,
    IN p_description TEXT,
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO user_experiences(user_id, job_title, company_name, location, start_date,
                                 end_date, is_current, description, last_ip)
    VALUES(p_user_id, p_job_title, p_company_name, p_location, p_start_date,
           p_end_date, p_is_current, p_description, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user_experience(IN p_id INT, IN p_user_id INT)
BEGIN
    UPDATE user_experiences
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id AND user_id = p_user_id;
END //

-- =====================
-- 4️⃣ المهارات
-- =====================
CREATE PROCEDURE sp_add_user_skill(
    IN p_user_id INT,
    IN p_skill_name VARCHAR(100),
    IN p_level ENUM('Beginner','Intermediate','Advanced','Expert'),
    IN p_type ENUM('Skill','Hobby'),
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO user_skills(user_id, skill_name, level, type, last_ip)
    VALUES(p_user_id, p_skill_name, p_level, p_type, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user_skill(IN p_id INT, IN p_user_id INT)
BEGIN
    UPDATE user_skills
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id AND user_id = p_user_id;
END //

-- =====================
-- 5️⃣ التدريبات
-- =====================
CREATE PROCEDURE sp_add_user_training(
    IN p_user_id INT,
    IN p_course_name VARCHAR(150),
    IN p_provider VARCHAR(150),
    IN p_certificate_url VARCHAR(255),
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_description TEXT,
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO user_trainings(user_id, course_name, provider, certificate_url,
                               start_date, end_date, description, last_ip)
    VALUES(p_user_id, p_course_name, p_provider, p_certificate_url,
           p_start_date, p_end_date, p_description, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user_training(IN p_id INT, IN p_user_id INT)
BEGIN
    UPDATE user_trainings
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id AND user_id = p_user_id;
END //

-- =====================
-- 6️⃣ اللغات
-- =====================
CREATE PROCEDURE sp_add_user_language(
    IN p_user_id INT,
    IN p_language VARCHAR(100),
    IN p_proficiency ENUM('Basic','Intermediate','Fluent','Native'),
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO user_languages(user_id, language, proficiency, last_ip)
    VALUES(p_user_id, p_language, p_proficiency, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user_language(IN p_id INT, IN p_user_id INT)
BEGIN
    UPDATE user_languages
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id AND user_id = p_user_id;
END //

-- =====================
-- 7️⃣ المشاريع
-- =====================
CREATE PROCEDURE sp_add_user_project(
    IN p_user_id INT,
    IN p_project_name VARCHAR(150),
    IN p_role VARCHAR(100),
    IN p_description TEXT,
    IN p_technologies VARCHAR(255),
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_project_url VARCHAR(255),
    IN p_is_ongoing BOOLEAN,
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO user_projects(user_id, project_name, role, description, technologies,
                              start_date, end_date, project_url, is_ongoing, last_ip)
    VALUES(p_user_id, p_project_name, p_role, p_description, p_technologies,
           p_start_date, p_end_date, p_project_url, p_is_ongoing, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user_project(IN p_id INT, IN p_user_id INT)
BEGIN
    UPDATE user_projects
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id AND user_id = p_user_id;
END //

-- =====================
-- 8️⃣ الملفات
-- =====================
CREATE PROCEDURE sp_add_user_file(
    IN p_user_id INT,
    IN p_file_name VARCHAR(255),
    IN p_file_type VARCHAR(50),
    IN p_file_size INT,
    IN p_file_path VARCHAR(500),
    IN p_category ENUM('Profile','Document','Project','Other'),
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO user_files(user_id, file_name, file_type, file_size, file_path,
                           category, last_ip)
    VALUES(p_user_id, p_file_name, p_file_type, p_file_size, p_file_path,
           p_category, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user_file(IN p_id INT, IN p_user_id INT)
BEGIN
    UPDATE user_files
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id AND user_id = p_user_id;
END //

-- =====================
-- 9️⃣ إدخالات البيانات (directory)
-- =====================
CREATE PROCEDURE sp_add_user_data_entry(
    IN p_created_by_user_id INT,
    IN p_target_full_name VARCHAR(255),
    IN p_target_email VARCHAR(255),
    IN p_target_national_id VARCHAR(50),
    IN p_mother_name VARCHAR(255),
    IN p_dob DATE,
    IN p_gender ENUM('Female','Male','Other'),
    IN p_nationality VARCHAR(100),
    IN p_country VARCHAR(100),
    IN p_previous_address VARCHAR(255),
    IN p_current_address VARCHAR(255),
    IN p_marital_status VARCHAR(50),
    IN p_family_members INT,
    IN p_phone VARCHAR(50),
    IN p_bio TEXT,
    IN p_profile_image VARCHAR(255)
)
BEGIN
    INSERT INTO user_data_entries(created_by_user_id, target_full_name, target_email,
                                  target_national_id, mother_name, dob, gender,
                                  nationality, country, previous_address, current_address,
                                  marital_status, family_members, phone, bio, profile_image)
    VALUES(p_created_by_user_id, p_target_full_name, p_target_email,
           p_target_national_id, p_mother_name, p_dob, p_gender,
           p_nationality, p_country, p_previous_address, p_current_address,
           p_marital_status, p_family_members, p_phone, p_bio, p_profile_image);
END //

DELIMITER ;


⚡ Triggers (المحفزات)

DROP TRIGGER IF EXISTS trg_before_delete_user;


DELIMITER //

CREATE TRIGGER trg_before_delete_user
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    DECLARE related_count INT;

    -- تحقق إذا عنده خبرات
    SELECT COUNT(*) INTO related_count 
    FROM user_experiences 
    WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = '❌ لا يمكن حذف المستخدم لأنه يملك خبرات مسجلة';
    END IF;

    -- تحقق إذا عنده مهارات
    SELECT COUNT(*) INTO related_count 
    FROM user_skills 
    WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = '❌ لا يمكن حذف المستخدم لأنه يملك مهارات مسجلة';
    END IF;

    -- تحقق إذا عنده مشاريع
    SELECT COUNT(*) INTO related_count 
    FROM user_projects 
    WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = '❌ لا يمكن حذف المستخدم لأنه يملك مشاريع مسجلة';
    END IF;

    -- تحقق إذا عنده ملفات
    SELECT COUNT(*) INTO related_count 
    FROM user_files 
    WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = '❌ لا يمكن حذف المستخدم لأنه يملك ملفات مرفوعة';
    END IF;

    -- تحقق إذا عنده معلومات شخصية
    SELECT COUNT(*) INTO related_count 
    FROM user_infos 
    WHERE user_id = OLD.id;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = '❌ لا يمكن حذف المستخدم لأنه يملك معلومات شخصية';
    END IF;

    -- تحقق إذا عنده إدخالات بيانات
    SELECT COUNT(*) INTO related_count 
    FROM user_data_entries 
    WHERE user_id = OLD.id;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = '❌ لا يمكن حذف المستخدم لأنه يملك إدخالات بيانات';
    END IF;

END //

DELIMITER ;


🕒 Events (المهام المجدولة)

لازم تكون Event Scheduler مفعّل في MySQL:
SET GLOBAL event_scheduler = ON;


1️⃣ تنظيف السجلات المحذوفة (Soft Delete → حذف فعلي بعد 90 يوم)

DELIMITER //

CREATE EVENT IF NOT EXISTS ev_clean_deleted_records
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    -- حذف الخبرات
    DELETE FROM user_experiences 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;

    -- حذف المهارات
    DELETE FROM user_skills 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;

    -- حذف التدريبات
    DELETE FROM user_trainings 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;

    -- حذف اللغات
    DELETE FROM user_languages 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;

    -- حذف المشاريع
    DELETE FROM user_projects 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;

    -- حذف الملفات
    DELETE FROM user_files 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;

    -- حذف المستخدمين
    DELETE FROM users 
    WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
END //

DELIMITER //


2️⃣ أرشفة إدخالات البيانات القديمة (user_data_entries)

-- جدول للأرشفة

DELIMITER //

CREATE TABLE IF NOT EXISTS user_data_entries_archive LIKE user_data_entries;

DELIMITER ;

CREATE EVENT IF NOT EXISTS ev_archive_user_data_entries
ON SCHEDULE EVERY 1 MONTH
DO
BEGIN
    INSERT INTO user_data_entries_archive
    SELECT * FROM user_data_entries
    WHERE created_at < NOW() - INTERVAL 1 YEAR;

    DELETE FROM user_data_entries
    WHERE created_at < NOW() - INTERVAL 1 YEAR;
END //
DELIMITER ;

3️⃣ تحديث إحصائيات سريعة (للتقارير / Dashboard)

-- جدول إحصائيات
CREATE TABLE IF NOT EXISTS system_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_users INT,
    total_experiences INT,
    total_skills INT,
    total_projects INT,
    total_files INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

DROP EVENT IF EXISTS ev_update_system_stats //

CREATE EVENT ev_update_system_stats
ON SCHEDULE EVERY 6 HOUR
DO
    INSERT INTO system_stats (
        total_users, 
        total_experiences, 
        total_skills, 
        total_projects, 
        total_files, 
        last_updated
    )
    SELECT 
        (SELECT COUNT(*) FROM users WHERE is_deleted = 0),
        (SELECT COUNT(*) FROM user_experiences WHERE is_deleted = 0),
        (SELECT COUNT(*) FROM user_skills WHERE is_deleted = 0),
        (SELECT COUNT(*) FROM user_projects WHERE is_deleted = 0),
        (SELECT COUNT(*) FROM user_files WHERE is_deleted = 0),
        NOW() //

DELIMITER ;

-- =====================


تمام ✅
ERD (Entity Relationship Diagram) مبسط وواضح، يعرض العلاقات بين الجداول اللي عندك بعد تحسين القاعدة.

🔗 الكيانات (Entities) والعلاقات
👤 users

id (PK)

full_name

email

password

last_ip

is_deleted

📌 العلاقات:

1️⃣ → N مع user_infos (مستخدم له سجل شخصي واحد أو أكثر إذا أردت)

1️⃣ → N مع user_experiences

1️⃣ → N مع user_skills

1️⃣ → N مع user_trainings

1️⃣ → N مع user_languages

1️⃣ → N مع user_projects

1️⃣ → N مع user_files

1️⃣ → N مع user_data_entries (باعتبار المستخدم يضيف بيانات عن مستخدمين آخرين)

📝 user_infos

id (PK)

user_id (FK → users.id)

national_id

dob

gender

phone … إلخ

📌 العلاقة: كل مستخدم له سجل شخصي واحد أساسي (1:1).

💼 user_experiences

id (PK)

user_id (FK → users.id)

job_title

company_name

start_date / end_date

is_current

📌 العلاقة: مستخدم واحد يملك عدة خبرات (1:N).

🎯 user_skills

id (PK)

user_id (FK → users.id)

skill_name

level

type (Skill/Hobby)

📌 العلاقة: مستخدم واحد يملك عدة مهارات/هوايات (1:N).

📚 user_trainings

id (PK)

user_id (FK → users.id)

course_name

provider

certificate_url

📌 العلاقة: مستخدم واحد يملك عدة تدريبات (1:N).

🌍 user_languages

id (PK)

user_id (FK → users.id)

language

proficiency

📌 العلاقة: مستخدم واحد يملك عدة لغات (1:N).

🚀 user_projects

id (PK)

user_id (FK → users.id)

project_name

role

technologies

is_ongoing

📌 العلاقة: مستخدم واحد يملك عدة مشاريع (1:N).

📂 user_files

id (PK)

user_id (FK → users.id)

file_name

file_path

category

📌 العلاقة: مستخدم واحد يملك عدة ملفات (1:N).

📥 user_data_entries

id (PK)

user_id (FK → users.id → صاحب الإدخال)

full_name / national_id / dob … إلخ

📌 العلاقة:

كل user يمكن أن يضيف عدد غير محدود من data_entries (1:N).

هذا الجدول يمثل إدخالات عن أشخاص آخرين (وليس المستخدم نفسه).

🎨 ERD (تمثيل نصي مبسط)
users (1) ────< user_infos (1:1)
   │
   ├───< user_experiences (1:N)
   ├───< user_skills (1:N)
   ├───< user_trainings (1:N)
   ├───< user_languages (1:N)
   ├───< user_projects (1:N)
   ├───< user_files (1:N)
   └───< user_data_entries (1:N)



   ERD رسومي (رسم تخطيطي صورة) بصيغة صورة عشان تقدر تستخدمه بالـ documentation أو تشاركه مع الفريق؟

   