-- ==================================================
-- 📦 سكربت قاعدة بيانات متكامل + Indexes + Views Optimized
-- ==================================================

-- 1️⃣ إنشاء قاعدة البيانات
-- DROP DATABASE IF EXISTS sql8801470;
-- CREATE DATABASE sql8801470 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sql8801470;

-- ==================================================
-- 2️⃣ الجداول (Tables)
-- ==================================================

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0
);

CREATE TABLE user_infos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  national_id VARCHAR(50),
  full_name VARCHAR(255) NOT NULL,
  mother_name VARCHAR(255),
  dob DATE,
  gender ENUM('Female','Male','Other'),
  nationality VARCHAR(100),
  country VARCHAR(100),
  previous_address VARCHAR(255),
  current_address VARCHAR(255),
  marital_status VARCHAR(50),
  family_members INT NOT NULL DEFAULT 0,
  phone VARCHAR(50),
  bio TEXT,
  profile_image VARCHAR(255),
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  level ENUM('Beginner','Intermediate','Advanced','Expert') DEFAULT 'Beginner',
  type ENUM('Skill','Hobby') DEFAULT 'Skill',
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  language VARCHAR(100) NOT NULL,
  proficiency ENUM('Basic','Intermediate','Fluent','Native') DEFAULT 'Basic',
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  file_name VARCHAR(255),
  file_type VARCHAR(50),
  file_size BIGINT DEFAULT 0,
  file_path VARCHAR(500),
  category ENUM('Profile','Document','Project','Other') DEFAULT 'Other',
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_data_entries;

CREATE TABLE user_data_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  full_name VARCHAR(255),
  email VARCHAR(255),
  national_id VARCHAR(50),
  mother_name VARCHAR(255),
  dob DATE,
  gender ENUM('Female','Male','Other'),
  nationality VARCHAR(100),
  country VARCHAR(100),
  previous_address VARCHAR(255),
  current_address VARCHAR(255),
  marital_status VARCHAR(50),
  family_members INT NOT NULL DEFAULT 0,
  mobile VARCHAR(255),
  phone VARCHAR(50),
  bio TEXT,
  experiences TEXT,
  courses TEXT,
  skills TEXT,
  languages TEXT,
  last_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) DEFAULT 0,
  created_by_name VARCHAR(255) NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==================================================
-- 3️⃣ Indexes إضافية
-- ==================================================

-- جدول users
CREATE INDEX idx_users_is_deleted ON users (is_deleted, deleted_at);

-- جدول user_infos
CREATE INDEX idx_user_infos_userid_deleted ON user_infos (user_id, is_deleted);
CREATE INDEX idx_user_infos_deleted_at ON user_infos (is_deleted, deleted_at);

-- جدول user_experiences
CREATE INDEX idx_user_experiences_userid_deleted ON user_experiences (user_id, is_deleted);
CREATE INDEX idx_user_experiences_deleted_at ON user_experiences (is_deleted, deleted_at);

-- جدول user_skills
CREATE INDEX idx_user_skills_userid_deleted ON user_skills (user_id, is_deleted);
CREATE INDEX idx_user_skills_deleted_at ON user_skills (is_deleted, deleted_at);

-- جدول user_trainings
CREATE INDEX idx_user_trainings_userid_deleted ON user_trainings (user_id, is_deleted);
CREATE INDEX idx_user_trainings_deleted_at ON user_trainings (is_deleted, deleted_at);

-- جدول user_languages
CREATE INDEX idx_user_languages_userid_deleted ON user_languages (user_id, is_deleted);
CREATE INDEX idx_user_languages_deleted_at ON user_languages (is_deleted, deleted_at);

-- جدول user_projects
CREATE INDEX idx_user_projects_userid_deleted ON user_projects (user_id, is_deleted);
CREATE INDEX idx_user_projects_deleted_at ON user_projects (is_deleted, deleted_at);

-- جدول user_files
CREATE INDEX idx_user_files_userid_deleted ON user_files (user_id, is_deleted);
CREATE INDEX idx_user_files_deleted_at ON user_files (is_deleted, deleted_at);

-- جدول user_data_entries
CREATE INDEX idx_user_data_entries_userid_deleted ON user_data_entries (user_id, is_deleted);
CREATE INDEX idx_user_data_entries_deleted_at ON user_data_entries (is_deleted, deleted_at);

-- ==================================================
-- 4️⃣ Views (LEFT JOIN + Optimized)
-- ==================================================

CREATE OR REPLACE VIEW v_user_profile AS
SELECT u.id AS user_id, u.email,
       i.full_name, i.national_id, i.mother_name, i.dob, i.gender, i.nationality,
       i.country, i.previous_address, i.current_address,
       i.marital_status, i.family_members, i.phone, i.bio, i.profile_image,
       u.created_at, u.updated_at
FROM users u
LEFT JOIN user_infos i ON u.id = i.user_id AND i.is_deleted = 0
WHERE u.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_experiences AS
SELECT e.id, e.user_id, i.full_name, e.job_title, e.company_name, e.location,
       e.start_date, e.end_date, e.is_current, e.description
FROM user_experiences e
LEFT JOIN user_infos i ON e.user_id = i.user_id AND i.is_deleted = 0
WHERE e.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_skills AS
SELECT s.id, s.user_id, i.full_name, s.skill_name, s.level, s.type
FROM user_skills s
LEFT JOIN user_infos i ON s.user_id = i.user_id AND i.is_deleted = 0
WHERE s.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_trainings AS
SELECT t.id, t.user_id, i.full_name, t.course_name, t.provider, t.certificate_url,
       t.start_date, t.end_date, t.description
FROM user_trainings t
LEFT JOIN user_infos i ON t.user_id = i.user_id AND i.is_deleted = 0
WHERE t.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_languages AS
SELECT l.id, l.user_id, i.full_name, l.language, l.proficiency
FROM user_languages l
LEFT JOIN user_infos i ON l.user_id = i.user_id AND i.is_deleted = 0
WHERE l.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_projects AS
SELECT p.id, p.user_id, i.full_name, p.project_name, p.role, p.description,
       p.technologies, p.start_date, p.end_date, p.project_url, p.is_ongoing
FROM user_projects p
LEFT JOIN user_infos i ON p.user_id = i.user_id AND i.is_deleted = 0
WHERE p.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_files AS
SELECT f.id, f.user_id, i.full_name,
       f.file_name, f.file_type, f.file_size, f.file_path, f.category, f.created_at
FROM user_files f
LEFT JOIN user_infos i ON f.user_id = i.user_id AND i.is_deleted = 0
WHERE f.is_deleted = 0;

CREATE OR REPLACE VIEW v_user_data_entries AS
SELECT 
    e.id,
    e.user_id,
    i.full_name AS created_by_name,
    e.full_name,
    e.email,
    e.national_id,
    e.mother_name,
    e.dob,
    e.gender,
    e.nationality,
    e.country,
    e.previous_address,
    e.current_address,
    e.marital_status,
    e.family_members,
    e.mobile,
    e.phone,
    e.bio,
    e.experiences,
    e.courses,
    e.skills,
    e.languages,
    e.created_at
FROM user_data_entries e
LEFT JOIN user_infos i ON e.user_id = i.user_id AND i.is_deleted = 0
WHERE e.is_deleted = 0;

-- ==================================================
-- 5️⃣ Procedures
-- ==================================================

DELIMITER //

CREATE PROCEDURE sp_add_user(
    IN p_email VARCHAR(150),
    IN p_password VARCHAR(255),
    IN p_last_ip VARCHAR(45)
)
BEGIN
    INSERT INTO users(email, password, last_ip)
    VALUES(p_email, p_password, p_last_ip);
END //

CREATE PROCEDURE sp_delete_user(IN p_id INT)
BEGIN
    UPDATE users
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id;
END //

DELIMITER ;

-- ==================================================
-- 6️⃣ Triggers (بدون إيموجي) لاتضاف على نت
-- ==================================================

DROP TRIGGER IF EXISTS trg_before_delete_user;
DELIMITER //

CREATE TRIGGER trg_before_delete_user
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    DECLARE related_count INT;
    SELECT COUNT(*) INTO related_count FROM user_infos WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'لا يمكن حذف المستخدم لأنه يملك بيانات شخصية';
    END IF;
END //

DELIMITER ;

-- ==================================================
-- 7️⃣ Events (حذف فقط للجداول الثانوية) لاتضاف على النت
-- ==================================================

SET GLOBAL event_scheduler = ON;

DELIMITER //

CREATE EVENT IF NOT EXISTS ev_clean_deleted_records
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    DELETE FROM user_experiences WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_skills WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_trainings WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_languages WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_projects WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_files WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_infos WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_data_entries WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    -- جدول users يبقى soft delete فقط
END //

DELIMITER ;


ALTER TABLE user_data_entries
ADD COLUMN created_by_name VARCHAR(255) NULL AFTER is_deleted;


SHOW CREATE TABLE user_infos;
SHOW CREATE TABLE user_files;
SHOW CREATE TABLE user_data_entries;



