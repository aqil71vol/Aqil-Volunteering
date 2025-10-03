-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 09:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aqil_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user` (IN `p_email` VARCHAR(150), IN `p_password` VARCHAR(255), IN `p_last_ip` VARCHAR(45))   BEGIN
    INSERT INTO users(email, password, last_ip)
    VALUES(p_email, p_password, p_last_ip);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_user` (IN `p_id` INT)   BEGIN
    UPDATE users
    SET is_deleted = 1, deleted_at = NOW()
    WHERE id = p_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 'cova71g@gmail.com', '$2b$10$AvDiFOjWwaHwnIZTSGnux.qlVJDy0DshfI7IkpDT9MbnUNAGWOaGW', NULL, '2025-09-29 18:28:29', '2025-09-29 18:28:29', NULL, 0);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `trg_before_delete_user` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
    DECLARE related_count INT;
    SELECT COUNT(*) INTO related_count FROM user_infos WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'لا يمكن حذف المستخدم لأنه يملك بيانات شخصية';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_data_entries`
--

CREATE TABLE `user_data_entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `national_id` varchar(50) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Female','Male','Other') DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `previous_address` varchar(255) DEFAULT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `marital_status` varchar(50) DEFAULT NULL,
  `family_members` int(11) NOT NULL DEFAULT 0,
  `mobile` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `experiences` text DEFAULT NULL,
  `courses` text DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `languages` text DEFAULT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_by_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_data_entries`
--

INSERT INTO `user_data_entries` (`id`, `user_id`, `full_name`, `email`, `national_id`, `mother_name`, `dob`, `gender`, `nationality`, `country`, `previous_address`, `current_address`, `marital_status`, `family_members`, `mobile`, `phone`, `bio`, `experiences`, `courses`, `skills`, `languages`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`, `created_by_name`) VALUES
(9, 1, 'aqil mahdi kareem alkarhi', 'aqil@example.com', 'a1', 'Hana', '2000-11-11', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana', 'Single', 1, '0991599110', '123', 'bb', 'ee', 'cc', 'ss', 'll2000', NULL, '2025-09-29 21:42:49', '2025-09-29 21:46:02', '2025-09-29 21:46:02', 0, 'cova71g@gmail.com'),
(10, 1, 'Hadi Mhana Saloom', 'hadi@gmail.com', 'A1', 'Nada', '2000-01-05', 'Female', 'iraq', 'Syria', 'iraq', 'jaramana', 'Widowed', 2, '0991599110', '1234', 'AAA', 'BBB', 'CCC', 'DDDD', 'EEE', NULL, '2025-09-30 12:42:54', '2025-09-30 12:44:39', '2025-09-30 12:44:39', 0, 'cova71g@gmail.com'),
(11, 1, 'xx', 'a@gmail.com', 'xxx', 'xxx', '2000-11-11', 'Male', 'iraqi', 'Syria', 'Syria', 'jaramana', 'Widowed', 3, '0991599110', '444', 'dd', 'dd', 'dd', 'dd', 'dd', NULL, '2025-09-30 12:45:53', '2025-09-30 12:47:07', '2025-09-30 12:47:07', 0, 'cova71g@gmail.com'),
(12, 1, 'Fadi Firas SAlman HONI', 'fadi@gmail.com', 'f11', 'Nour Ali', '1990-09-22', 'Male', 'Ejept', 'Iraq', 'Iraq', 'Baghdad', 'Divorced', 7, '+201234567890', '+202212345', 'Bio_Fadi', 'Experince_Fadi', 'Course_Fadi', 'Skill_Fadi', 'Language_Fadi', NULL, '2025-09-30 14:34:39', '2025-09-30 15:06:18', '2025-09-30 15:06:18', 1, 'cova71g@gmail.com'),
(13, 1, 'Zena Ali Blal', 'zena@example.com', 'z11', 'Zhra', '2020-09-22', 'Female', 'iraq', 'Syria', 'Syria', 'jaramana', 'Married', 1, '0991599110', '123', 'bb', 'ee', 'cc', 'ss', 'll', NULL, '2025-09-30 15:03:46', '2025-09-30 15:04:47', '2025-09-30 15:04:47', 0, 'cova71g@gmail.com'),
(14, 1, 'ZZZZZZ77', 'z@example.com', 'z1', 'salma', '2025-09-30', 'Female', 'ejept', 'Syria', 'Syria', 'Baghdad', 'Single', 1, '0991599110', 'zzz', 'zzzzzz', 'zzzzz', 'zzzz', 'zzzz', 'zzzz', NULL, '2025-09-30 15:16:38', '2025-09-30 15:18:26', '2025-09-30 15:18:26', 0, 'cova71g@gmail.com'),
(15, 1, 'mmm', 'aqil@example.com', '1', 'Hana', '2025-09-30', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana111', 'Married', 1, '0991599110', '55', 'mm', 'mmm', 'mm', 'mm', 'mm', NULL, '2025-09-30 15:19:38', '2025-09-30 15:19:59', '2025-09-30 15:19:59', 0, 'cova71g@gmail.com'),
(16, 1, 'KKKK9', 'aqil@example.com', 'a1', 'Hana', '2025-09-30', 'Male', 'iraq', 'Syria', 'Syria', 'Baghdad', 'Single', 1, '0991599110', '122', 'kk', 'kk', 'kk', 'kkk', 'kk', NULL, '2025-09-30 15:25:21', '2025-09-30 15:26:38', '2025-09-30 15:26:38', 0, 'cova71g@gmail.com'),
(17, 1, 'bbbv', 'aqil@example.com', 'a1', 'noor', '2025-09-30', 'Female', 'iraq', 'Syria', 'Syria', 'jaramana', 'Married', 1, '0991599110', '1', 'vv', 'vv', 'vv', 'vv', 'vv', NULL, '2025-09-30 15:29:43', '2025-09-30 15:30:39', '2025-09-30 15:30:39', 1, 'cova71g@gmail.com'),
(18, 1, 'Vivian Vivo12', 'vivo@example.com', 'v1', 'Sara', '2025-09-30', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana', 'Married', 1, '0991599110', '0991599110', 'vv', 'vv', 'vvvv', 'vv', 'vv', NULL, '2025-09-30 19:32:08', '2025-09-30 19:33:17', '2025-09-30 19:33:17', 0, 'cova71g@gmail.com'),
(19, 1, 'cccccbbbb', 'ccc@Example.com', '11', 'salma', '2025-09-30', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana', 'Single', 2, '0991599110', '0991599110', 'bb', 'bbbb', 'bbb', 'bbb', 'mmm', NULL, '2025-09-30 20:04:16', '2025-09-30 20:04:57', '2025-09-30 20:04:57', 0, 'cova71g@gmail.com'),
(20, 1, 'Salam2025', 'aqil@example.com', '10', 'Hana', '2025-09-30', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana', 'Single', 1, '0991599110', '0991599110', 'bbbb', 'bbb', 'bbb', 'bb', 'bb77', NULL, '2025-09-30 20:09:52', '2025-09-30 20:10:12', '2025-09-30 20:10:12', 1, 'cova71g@gmail.com'),
(21, 1, 'zz', 'aqil@example.com', 'a1', 'salma', '2025-09-30', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana', 'Single', 1, '0991599110', '0991599110', 'bb', 'bbb', 'bbb', 'bbb', 'bb', NULL, '2025-09-30 20:11:10', '2025-09-30 20:11:10', NULL, 0, 'cova71g@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_experiences`
--

CREATE TABLE `user_experiences` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `job_title` varchar(150) NOT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_current` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_experiences`
--

INSERT INTO `user_experiences` (`id`, `user_id`, `job_title`, `company_name`, `location`, `start_date`, `end_date`, `is_current`, `description`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 1, 'Volunteer', 'NGOS', 'Syria', '2007-09-27', '2025-09-29', 1, 'ORV', NULL, '2025-09-29 18:42:36', '2025-09-29 18:42:36', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_files`
--

CREATE TABLE `user_files` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `file_size` bigint(20) DEFAULT 0,
  `file_path` varchar(500) DEFAULT NULL,
  `category` enum('Profile','Document','Project','Other') DEFAULT 'Other',
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_files`
--

INSERT INTO `user_files` (`id`, `user_id`, `file_name`, `file_type`, `file_size`, `file_path`, `category`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(2, 1, 'aqil_153_202.jpeg', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759235597804-aqil_153_202.jpeg', 'Other', NULL, '2025-09-30 12:33:17', '2025-09-30 12:33:17', NULL, 0),
(3, 1, 'aqil_153_202.jpeg', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759235667235-aqil_153_202.jpeg', 'Other', NULL, '2025-09-30 12:34:27', '2025-09-30 12:34:37', '2025-09-30 12:34:37', 1),
(5, 1, 'ØµÙØ±Ø© Ø¹ÙÙÙ 2029-3.pdf', 'application/pdf', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759235732922-________ ________ 2029-3.pdf', 'Other', NULL, '2025-09-30 12:35:33', '2025-09-30 12:35:33', NULL, 0),
(6, 1, 'Ø¬ÙØ§Ø² Ø³ÙØ± Ø¹Ø±Ø§ÙÙ Ø¹ÙÙÙ.jpg', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759265916503-________ ______ __________ ________.jpg', 'Other', NULL, '2025-09-30 20:58:36', '2025-09-30 20:58:36', NULL, 0),
(7, 1, 'aqil_1181_1772.JPG', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759265934349-aqil_1181_1772.JPG', 'Other', NULL, '2025-09-30 20:58:54', '2025-09-30 20:58:54', NULL, 0),
(8, 1, 'aqil_75p_98p_7k.jpeg', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759268341519-aqil_75p_98p_7k.jpeg', 'Other', NULL, '2025-09-30 21:39:01', '2025-09-30 21:39:01', NULL, 0),
(9, 1, 'aqil_75p_98p_7k.jpeg', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759268354364-aqil_75p_98p_7k.jpeg', 'Other', NULL, '2025-09-30 21:39:14', '2025-09-30 21:39:14', NULL, 0),
(10, 1, 'aqil_75p_98p_7k.jpeg', 'image/jpeg', 0, 'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759268363834-aqil_75p_98p_7k.jpeg', 'Other', NULL, '2025-09-30 21:39:23', '2025-09-30 21:39:23', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_infos`
--

CREATE TABLE `user_infos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `national_id` varchar(50) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Female','Male','Other') DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `previous_address` varchar(255) DEFAULT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `marital_status` varchar(50) DEFAULT NULL,
  `family_members` int(11) NOT NULL DEFAULT 0,
  `phone` varchar(50) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_infos`
--

INSERT INTO `user_infos` (`id`, `user_id`, `national_id`, `full_name`, `mother_name`, `dob`, `gender`, `nationality`, `country`, `previous_address`, `current_address`, `marital_status`, `family_members`, `phone`, `bio`, `profile_image`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 1, 'a1', 'aqil mahdi kareem', 'talia', '2025-10-01', 'Male', 'iraq', 'Syria', 'Syria', 'jaramana', 'Single', 1, '0991599110', 'Bio_Aqilo', '/uploads/profile_image/1759270282953-240303209.jpeg', NULL, '2025-09-29 18:40:03', '2025-09-30 22:11:22', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_languages`
--

CREATE TABLE `user_languages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `language` varchar(100) NOT NULL,
  `proficiency` enum('Basic','Intermediate','Fluent','Native') DEFAULT 'Basic',
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_languages`
--

INSERT INTO `user_languages` (`id`, `user_id`, `language`, `proficiency`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 1, 'English', 'Basic', NULL, '2025-09-29 18:47:39', '2025-09-29 18:47:39', NULL, 0),
(2, 1, 'Arabic', 'Native', NULL, '2025-09-29 18:58:41', '2025-09-29 18:58:41', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_projects`
--

CREATE TABLE `user_projects` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_name` varchar(150) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `technologies` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `is_ongoing` tinyint(1) DEFAULT 0,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_projects`
--

INSERT INTO `user_projects` (`id`, `user_id`, `project_name`, `role`, `description`, `technologies`, `start_date`, `end_date`, `project_url`, `is_ongoing`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 1, 'Volunteering', 'rol', 'ORV', 'Tech', '2025-09-29', '2025-09-29', 'https://', 1, NULL, '2025-09-29 18:45:02', '2025-09-29 18:45:02', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

CREATE TABLE `user_skills` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `level` enum('Beginner','Intermediate','Advanced','Expert') DEFAULT 'Beginner',
  `type` enum('Skill','Hobby') DEFAULT 'Skill',
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_skills`
--

INSERT INTO `user_skills` (`id`, `user_id`, `skill_name`, `level`, `type`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 1, 'NLP', 'Beginner', 'Skill', NULL, '2025-09-29 18:47:12', '2025-09-29 18:47:12', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_trainings`
--

CREATE TABLE `user_trainings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_name` varchar(150) NOT NULL,
  `provider` varchar(150) DEFAULT NULL,
  `certificate_url` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_trainings`
--

INSERT INTO `user_trainings` (`id`, `user_id`, `course_name`, `provider`, `certificate_url`, `start_date`, `end_date`, `description`, `last_ip`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(1, 1, 'Trainng Volunteering', 'Prov', 'https://', '2025-09-29', '2025-09-29', 'Orv', NULL, '2025-09-29 18:46:14', '2025-09-29 18:46:14', NULL, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_data_entries`
-- (See below for the actual view)
--
CREATE TABLE `v_user_data_entries` (
`id` int(11)
,`user_id` int(11)
,`created_by_name` varchar(255)
,`full_name` varchar(255)
,`email` varchar(255)
,`national_id` varchar(50)
,`mother_name` varchar(255)
,`dob` date
,`gender` enum('Female','Male','Other')
,`nationality` varchar(100)
,`country` varchar(100)
,`previous_address` varchar(255)
,`current_address` varchar(255)
,`marital_status` varchar(50)
,`family_members` int(11)
,`mobile` varchar(255)
,`phone` varchar(50)
,`bio` text
,`experiences` text
,`courses` text
,`skills` text
,`languages` text
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_experiences`
-- (See below for the actual view)
--
CREATE TABLE `v_user_experiences` (
`id` int(11)
,`user_id` int(11)
,`full_name` varchar(255)
,`job_title` varchar(150)
,`company_name` varchar(150)
,`location` varchar(150)
,`start_date` date
,`end_date` date
,`is_current` tinyint(1)
,`description` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_files`
-- (See below for the actual view)
--
CREATE TABLE `v_user_files` (
`id` int(11)
,`user_id` int(11)
,`full_name` varchar(255)
,`file_name` varchar(255)
,`file_type` varchar(50)
,`file_size` bigint(20)
,`file_path` varchar(500)
,`category` enum('Profile','Document','Project','Other')
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_languages`
-- (See below for the actual view)
--
CREATE TABLE `v_user_languages` (
`id` int(11)
,`user_id` int(11)
,`full_name` varchar(255)
,`language` varchar(100)
,`proficiency` enum('Basic','Intermediate','Fluent','Native')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_profile`
-- (See below for the actual view)
--
CREATE TABLE `v_user_profile` (
`user_id` int(11)
,`email` varchar(150)
,`full_name` varchar(255)
,`national_id` varchar(50)
,`mother_name` varchar(255)
,`dob` date
,`gender` enum('Female','Male','Other')
,`nationality` varchar(100)
,`country` varchar(100)
,`previous_address` varchar(255)
,`current_address` varchar(255)
,`marital_status` varchar(50)
,`family_members` int(11)
,`phone` varchar(50)
,`bio` text
,`profile_image` varchar(255)
,`created_at` timestamp
,`updated_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_projects`
-- (See below for the actual view)
--
CREATE TABLE `v_user_projects` (
`id` int(11)
,`user_id` int(11)
,`full_name` varchar(255)
,`project_name` varchar(150)
,`role` varchar(100)
,`description` text
,`technologies` varchar(255)
,`start_date` date
,`end_date` date
,`project_url` varchar(255)
,`is_ongoing` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_skills`
-- (See below for the actual view)
--
CREATE TABLE `v_user_skills` (
`id` int(11)
,`user_id` int(11)
,`full_name` varchar(255)
,`skill_name` varchar(100)
,`level` enum('Beginner','Intermediate','Advanced','Expert')
,`type` enum('Skill','Hobby')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_user_trainings`
-- (See below for the actual view)
--
CREATE TABLE `v_user_trainings` (
`id` int(11)
,`user_id` int(11)
,`full_name` varchar(255)
,`course_name` varchar(150)
,`provider` varchar(150)
,`certificate_url` varchar(255)
,`start_date` date
,`end_date` date
,`description` text
);

-- --------------------------------------------------------

--
-- Structure for view `v_user_data_entries`
--
DROP TABLE IF EXISTS `v_user_data_entries`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_data_entries`  AS SELECT `e`.`id` AS `id`, `e`.`user_id` AS `user_id`, `i`.`full_name` AS `created_by_name`, `e`.`full_name` AS `full_name`, `e`.`email` AS `email`, `e`.`national_id` AS `national_id`, `e`.`mother_name` AS `mother_name`, `e`.`dob` AS `dob`, `e`.`gender` AS `gender`, `e`.`nationality` AS `nationality`, `e`.`country` AS `country`, `e`.`previous_address` AS `previous_address`, `e`.`current_address` AS `current_address`, `e`.`marital_status` AS `marital_status`, `e`.`family_members` AS `family_members`, `e`.`mobile` AS `mobile`, `e`.`phone` AS `phone`, `e`.`bio` AS `bio`, `e`.`experiences` AS `experiences`, `e`.`courses` AS `courses`, `e`.`skills` AS `skills`, `e`.`languages` AS `languages`, `e`.`created_at` AS `created_at` FROM (`user_data_entries` `e` left join `user_infos` `i` on(`e`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `e`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_experiences`
--
DROP TABLE IF EXISTS `v_user_experiences`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_experiences`  AS SELECT `e`.`id` AS `id`, `e`.`user_id` AS `user_id`, `i`.`full_name` AS `full_name`, `e`.`job_title` AS `job_title`, `e`.`company_name` AS `company_name`, `e`.`location` AS `location`, `e`.`start_date` AS `start_date`, `e`.`end_date` AS `end_date`, `e`.`is_current` AS `is_current`, `e`.`description` AS `description` FROM (`user_experiences` `e` left join `user_infos` `i` on(`e`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `e`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_files`
--
DROP TABLE IF EXISTS `v_user_files`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_files`  AS SELECT `f`.`id` AS `id`, `f`.`user_id` AS `user_id`, `i`.`full_name` AS `full_name`, `f`.`file_name` AS `file_name`, `f`.`file_type` AS `file_type`, `f`.`file_size` AS `file_size`, `f`.`file_path` AS `file_path`, `f`.`category` AS `category`, `f`.`created_at` AS `created_at` FROM (`user_files` `f` left join `user_infos` `i` on(`f`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `f`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_languages`
--
DROP TABLE IF EXISTS `v_user_languages`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_languages`  AS SELECT `l`.`id` AS `id`, `l`.`user_id` AS `user_id`, `i`.`full_name` AS `full_name`, `l`.`language` AS `language`, `l`.`proficiency` AS `proficiency` FROM (`user_languages` `l` left join `user_infos` `i` on(`l`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `l`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_profile`
--
DROP TABLE IF EXISTS `v_user_profile`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_profile`  AS SELECT `u`.`id` AS `user_id`, `u`.`email` AS `email`, `i`.`full_name` AS `full_name`, `i`.`national_id` AS `national_id`, `i`.`mother_name` AS `mother_name`, `i`.`dob` AS `dob`, `i`.`gender` AS `gender`, `i`.`nationality` AS `nationality`, `i`.`country` AS `country`, `i`.`previous_address` AS `previous_address`, `i`.`current_address` AS `current_address`, `i`.`marital_status` AS `marital_status`, `i`.`family_members` AS `family_members`, `i`.`phone` AS `phone`, `i`.`bio` AS `bio`, `i`.`profile_image` AS `profile_image`, `u`.`created_at` AS `created_at`, `u`.`updated_at` AS `updated_at` FROM (`users` `u` left join `user_infos` `i` on(`u`.`id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `u`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_projects`
--
DROP TABLE IF EXISTS `v_user_projects`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_projects`  AS SELECT `p`.`id` AS `id`, `p`.`user_id` AS `user_id`, `i`.`full_name` AS `full_name`, `p`.`project_name` AS `project_name`, `p`.`role` AS `role`, `p`.`description` AS `description`, `p`.`technologies` AS `technologies`, `p`.`start_date` AS `start_date`, `p`.`end_date` AS `end_date`, `p`.`project_url` AS `project_url`, `p`.`is_ongoing` AS `is_ongoing` FROM (`user_projects` `p` left join `user_infos` `i` on(`p`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `p`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_skills`
--
DROP TABLE IF EXISTS `v_user_skills`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_skills`  AS SELECT `s`.`id` AS `id`, `s`.`user_id` AS `user_id`, `i`.`full_name` AS `full_name`, `s`.`skill_name` AS `skill_name`, `s`.`level` AS `level`, `s`.`type` AS `type` FROM (`user_skills` `s` left join `user_infos` `i` on(`s`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `s`.`is_deleted` = 0 ;

-- --------------------------------------------------------

--
-- Structure for view `v_user_trainings`
--
DROP TABLE IF EXISTS `v_user_trainings`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user_trainings`  AS SELECT `t`.`id` AS `id`, `t`.`user_id` AS `user_id`, `i`.`full_name` AS `full_name`, `t`.`course_name` AS `course_name`, `t`.`provider` AS `provider`, `t`.`certificate_url` AS `certificate_url`, `t`.`start_date` AS `start_date`, `t`.`end_date` AS `end_date`, `t`.`description` AS `description` FROM (`user_trainings` `t` left join `user_infos` `i` on(`t`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) WHERE `t`.`is_deleted` = 0 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_is_deleted` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_data_entries`
--
ALTER TABLE `user_data_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_data_entries_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_data_entries_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_experiences`
--
ALTER TABLE `user_experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_experiences_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_experiences_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_files`
--
ALTER TABLE `user_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_files_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_files_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_infos`
--
ALTER TABLE `user_infos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_infos_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_infos_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_languages`
--
ALTER TABLE `user_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_languages_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_languages_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_projects`
--
ALTER TABLE `user_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_projects_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_projects_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_skills_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_skills_deleted_at` (`is_deleted`,`deleted_at`);

--
-- Indexes for table `user_trainings`
--
ALTER TABLE `user_trainings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_trainings_userid_deleted` (`user_id`,`is_deleted`),
  ADD KEY `idx_user_trainings_deleted_at` (`is_deleted`,`deleted_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_data_entries`
--
ALTER TABLE `user_data_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_experiences`
--
ALTER TABLE `user_experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_files`
--
ALTER TABLE `user_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_infos`
--
ALTER TABLE `user_infos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_languages`
--
ALTER TABLE `user_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_projects`
--
ALTER TABLE `user_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_skills`
--
ALTER TABLE `user_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_trainings`
--
ALTER TABLE `user_trainings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_data_entries`
--
ALTER TABLE `user_data_entries`
  ADD CONSTRAINT `user_data_entries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_experiences`
--
ALTER TABLE `user_experiences`
  ADD CONSTRAINT `user_experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_files`
--
ALTER TABLE `user_files`
  ADD CONSTRAINT `user_files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_infos`
--
ALTER TABLE `user_infos`
  ADD CONSTRAINT `user_infos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_languages`
--
ALTER TABLE `user_languages`
  ADD CONSTRAINT `user_languages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_projects`
--
ALTER TABLE `user_projects`
  ADD CONSTRAINT `user_projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_trainings`
--
ALTER TABLE `user_trainings`
  ADD CONSTRAINT `user_trainings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `ev_clean_deleted_records` ON SCHEDULE EVERY 1 DAY STARTS '2025-09-29 21:00:59' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    DELETE FROM user_experiences WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_skills WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_trainings WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_languages WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_projects WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_files WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_infos WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    DELETE FROM user_data_entries WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 90 DAY;
    -- جدول users يبقى soft delete فقط
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
