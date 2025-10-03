-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: aqil_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_data_entries`
--

DROP TABLE IF EXISTS `user_data_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_data_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `created_by_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_data_entries_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_data_entries_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_data_entries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data_entries`
--

LOCK TABLES `user_data_entries` WRITE;
/*!40000 ALTER TABLE `user_data_entries` DISABLE KEYS */;
INSERT INTO `user_data_entries` VALUES (9,1,'aqil mahdi kareem alkarhi','aqil@example.com','a1','Hana','2000-11-11','Male','iraq','Syria','Syria','jaramana','Single',1,'0991599110','123','bb','ee','cc','ss','ll2000',NULL,'2025-09-29 21:42:49','2025-09-29 21:46:02','2025-09-29 21:46:02',0,'cova71g@gmail.com'),(10,1,'Hadi Mhana Saloom','hadi@gmail.com','A1','Nada','2000-01-05','Female','iraq','Syria','iraq','jaramana','Widowed',2,'0991599110','1234','AAA','BBB','CCC','DDDD','EEE',NULL,'2025-09-30 12:42:54','2025-09-30 12:44:39','2025-09-30 12:44:39',0,'cova71g@gmail.com'),(11,1,'xx','a@gmail.com','xxx','xxx','2000-11-11','Male','iraqi','Syria','Syria','jaramana','Widowed',3,'0991599110','444','dd','dd','dd','dd','dd',NULL,'2025-09-30 12:45:53','2025-09-30 12:47:07','2025-09-30 12:47:07',0,'cova71g@gmail.com'),(12,1,'Fadi Firas SAlman HONI','fadi@gmail.com','f11','Nour Ali','1990-09-22','Male','Ejept','Iraq','Iraq','Baghdad','Divorced',7,'+201234567890','+202212345','Bio_Fadi','Experince_Fadi','Course_Fadi','Skill_Fadi','Language_Fadi',NULL,'2025-09-30 14:34:39','2025-09-30 15:06:18','2025-09-30 15:06:18',1,'cova71g@gmail.com'),(13,1,'Zena Ali Blal','zena@example.com','z11','Zhra','2020-09-22','Female','iraq','Syria','Syria','jaramana','Married',1,'0991599110','123','bb','ee','cc','ss','ll',NULL,'2025-09-30 15:03:46','2025-09-30 15:04:47','2025-09-30 15:04:47',0,'cova71g@gmail.com'),(14,1,'ZZZZZZ77','z@example.com','z1','salma','2025-09-30','Female','ejept','Syria','Syria','Baghdad','Single',1,'0991599110','zzz','zzzzzz','zzzzz','zzzz','zzzz','zzzz',NULL,'2025-09-30 15:16:38','2025-09-30 15:18:26','2025-09-30 15:18:26',0,'cova71g@gmail.com'),(15,1,'mmm','aqil@example.com','1','Hana','2025-09-30','Male','iraq','Syria','Syria','jaramana111','Married',1,'0991599110','55','mm','mmm','mm','mm','mm',NULL,'2025-09-30 15:19:38','2025-09-30 15:19:59','2025-09-30 15:19:59',0,'cova71g@gmail.com'),(16,1,'KKKK9','aqil@example.com','a1','Hana','2025-09-30','Male','iraq','Syria','Syria','Baghdad','Single',1,'0991599110','122','kk','kk','kk','kkk','kk',NULL,'2025-09-30 15:25:21','2025-09-30 15:26:38','2025-09-30 15:26:38',0,'cova71g@gmail.com'),(17,1,'bbbv','aqil@example.com','a1','noor','2025-09-30','Female','iraq','Syria','Syria','jaramana','Married',1,'0991599110','1','vv','vv','vv','vv','vv',NULL,'2025-09-30 15:29:43','2025-09-30 15:30:39','2025-09-30 15:30:39',1,'cova71g@gmail.com'),(18,1,'Vivian Vivo12','vivo@example.com','v1','Sara','2025-09-30','Male','iraq','Syria','Syria','jaramana','Married',1,'0991599110','0991599110','vv','vv','vvvv','vv','vv',NULL,'2025-09-30 19:32:08','2025-09-30 19:33:17','2025-09-30 19:33:17',0,'cova71g@gmail.com'),(19,1,'cccccbbbb','ccc@Example.com','11','salma','2025-09-30','Male','iraq','Syria','Syria','jaramana','Single',2,'0991599110','0991599110','bb','bbbb','bbb','bbb','mmm',NULL,'2025-09-30 20:04:16','2025-09-30 20:04:57','2025-09-30 20:04:57',0,'cova71g@gmail.com'),(20,1,'Salam2025','aqil@example.com','10','Hana','2025-09-30','Male','iraq','Syria','Syria','jaramana','Single',1,'0991599110','0991599110','bbbb','bbb','bbb','bb','bb77',NULL,'2025-09-30 20:09:52','2025-09-30 20:10:12','2025-09-30 20:10:12',1,'cova71g@gmail.com'),(21,1,'zz','aqil@example.com','a1','salma','2025-09-30','Male','iraq','Syria','Syria','jaramana','Single',1,'0991599110','0991599110','bb','bbb','bbb','bbb','bb',NULL,'2025-09-30 20:11:10','2025-09-30 20:11:10',NULL,0,'cova71g@gmail.com');
/*!40000 ALTER TABLE `user_data_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_experiences`
--

DROP TABLE IF EXISTS `user_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_experiences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_experiences_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_experiences_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_experiences`
--

LOCK TABLES `user_experiences` WRITE;
/*!40000 ALTER TABLE `user_experiences` DISABLE KEYS */;
INSERT INTO `user_experiences` VALUES (1,1,'Volunteer','NGOS','Syria','2007-09-27','2025-09-29',1,'ORV',NULL,'2025-09-29 18:42:36','2025-09-29 18:42:36',NULL,0);
/*!40000 ALTER TABLE `user_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_files`
--

DROP TABLE IF EXISTS `user_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_files_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_files_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_files`
--

LOCK TABLES `user_files` WRITE;
/*!40000 ALTER TABLE `user_files` DISABLE KEYS */;
INSERT INTO `user_files` VALUES (2,1,'aqil_153_202.jpeg','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759235597804-aqil_153_202.jpeg','Other',NULL,'2025-09-30 12:33:17','2025-09-30 12:33:17',NULL,0),(3,1,'aqil_153_202.jpeg','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759235667235-aqil_153_202.jpeg','Other',NULL,'2025-09-30 12:34:27','2025-09-30 12:34:37','2025-09-30 12:34:37',1),(5,1,'ØµÙØ±Ø© Ø¹ÙÙÙ 2029-3.pdf','application/pdf',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759235732922-________ ________ 2029-3.pdf','Other',NULL,'2025-09-30 12:35:33','2025-09-30 12:35:33',NULL,0),(6,1,'Ø¬ÙØ§Ø² Ø³ÙØ± Ø¹Ø±Ø§ÙÙ Ø¹ÙÙÙ.jpg','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759265916503-________ ______ __________ ________.jpg','Other',NULL,'2025-09-30 20:58:36','2025-09-30 20:58:36',NULL,0),(7,1,'aqil_1181_1772.JPG','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759265934349-aqil_1181_1772.JPG','Other',NULL,'2025-09-30 20:58:54','2025-09-30 20:58:54',NULL,0),(8,1,'aqil_75p_98p_7k.jpeg','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759268341519-aqil_75p_98p_7k.jpeg','Other',NULL,'2025-09-30 21:39:01','2025-09-30 21:39:01',NULL,0),(9,1,'aqil_75p_98p_7k.jpeg','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759268354364-aqil_75p_98p_7k.jpeg','Other',NULL,'2025-09-30 21:39:14','2025-09-30 21:39:14',NULL,0),(10,1,'aqil_75p_98p_7k.jpeg','image/jpeg',0,'C:\\Users\\Aqil\\Desktop\\Aqil-Volunteering\\backend\\uploads\\files_documents\\1759268363834-aqil_75p_98p_7k.jpeg','Other',NULL,'2025-09-30 21:39:23','2025-09-30 21:39:23',NULL,0);
/*!40000 ALTER TABLE `user_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_infos`
--

DROP TABLE IF EXISTS `user_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_infos_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_infos_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_infos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_infos`
--

LOCK TABLES `user_infos` WRITE;
/*!40000 ALTER TABLE `user_infos` DISABLE KEYS */;
INSERT INTO `user_infos` VALUES (1,1,'a1','aqil mahdi kareem','talia','2025-10-01','Male','iraq','Syria','Syria','jaramana','Single',1,'0991599110','Bio_Aqilo','/uploads/profile_image/1759270282953-240303209.jpeg',NULL,'2025-09-29 18:40:03','2025-09-30 22:11:22',NULL,0);
/*!40000 ALTER TABLE `user_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_languages`
--

DROP TABLE IF EXISTS `user_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `language` varchar(100) NOT NULL,
  `proficiency` enum('Basic','Intermediate','Fluent','Native') DEFAULT 'Basic',
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_languages_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_languages_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_languages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_languages`
--

LOCK TABLES `user_languages` WRITE;
/*!40000 ALTER TABLE `user_languages` DISABLE KEYS */;
INSERT INTO `user_languages` VALUES (1,1,'English','Basic',NULL,'2025-09-29 18:47:39','2025-09-29 18:47:39',NULL,0),(2,1,'Arabic','Native',NULL,'2025-09-29 18:58:41','2025-09-29 18:58:41',NULL,0);
/*!40000 ALTER TABLE `user_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_projects`
--

DROP TABLE IF EXISTS `user_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_projects_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_projects_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_projects`
--

LOCK TABLES `user_projects` WRITE;
/*!40000 ALTER TABLE `user_projects` DISABLE KEYS */;
INSERT INTO `user_projects` VALUES (1,1,'Volunteering','rol','ORV','Tech','2025-09-29','2025-09-29','https://',1,NULL,'2025-09-29 18:45:02','2025-09-29 18:45:02',NULL,0);
/*!40000 ALTER TABLE `user_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_skills`
--

DROP TABLE IF EXISTS `user_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `level` enum('Beginner','Intermediate','Advanced','Expert') DEFAULT 'Beginner',
  `type` enum('Skill','Hobby') DEFAULT 'Skill',
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_skills_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_skills_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_skills`
--

LOCK TABLES `user_skills` WRITE;
/*!40000 ALTER TABLE `user_skills` DISABLE KEYS */;
INSERT INTO `user_skills` VALUES (1,1,'NLP','Beginner','Skill',NULL,'2025-09-29 18:47:12','2025-09-29 18:47:12',NULL,0);
/*!40000 ALTER TABLE `user_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_trainings`
--

DROP TABLE IF EXISTS `user_trainings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_trainings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_trainings_userid_deleted` (`user_id`,`is_deleted`),
  KEY `idx_user_trainings_deleted_at` (`is_deleted`,`deleted_at`),
  CONSTRAINT `user_trainings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_trainings`
--

LOCK TABLES `user_trainings` WRITE;
/*!40000 ALTER TABLE `user_trainings` DISABLE KEYS */;
INSERT INTO `user_trainings` VALUES (1,1,'Trainng Volunteering','Prov','https://','2025-09-29','2025-09-29','Orv',NULL,'2025-09-29 18:46:14','2025-09-29 18:46:14',NULL,0);
/*!40000 ALTER TABLE `user_trainings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_is_deleted` (`is_deleted`,`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'cova71g@gmail.com','$2b$10$AvDiFOjWwaHwnIZTSGnux.qlVJDy0DshfI7IkpDT9MbnUNAGWOaGW',NULL,'2025-09-29 18:28:29','2025-09-29 18:28:29',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_before_delete_user
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    DECLARE related_count INT;
    SELECT COUNT(*) INTO related_count FROM user_infos WHERE user_id = OLD.id AND is_deleted = 0;
    IF related_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'لا يمكن حذف المستخدم لأنه يملك بيانات شخصية';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `v_user_data_entries`
--

DROP TABLE IF EXISTS `v_user_data_entries`;
/*!50001 DROP VIEW IF EXISTS `v_user_data_entries`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_data_entries` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `created_by_name`,
  1 AS `full_name`,
  1 AS `email`,
  1 AS `national_id`,
  1 AS `mother_name`,
  1 AS `dob`,
  1 AS `gender`,
  1 AS `nationality`,
  1 AS `country`,
  1 AS `previous_address`,
  1 AS `current_address`,
  1 AS `marital_status`,
  1 AS `family_members`,
  1 AS `mobile`,
  1 AS `phone`,
  1 AS `bio`,
  1 AS `experiences`,
  1 AS `courses`,
  1 AS `skills`,
  1 AS `languages`,
  1 AS `created_at` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_experiences`
--

DROP TABLE IF EXISTS `v_user_experiences`;
/*!50001 DROP VIEW IF EXISTS `v_user_experiences`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_experiences` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `full_name`,
  1 AS `job_title`,
  1 AS `company_name`,
  1 AS `location`,
  1 AS `start_date`,
  1 AS `end_date`,
  1 AS `is_current`,
  1 AS `description` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_files`
--

DROP TABLE IF EXISTS `v_user_files`;
/*!50001 DROP VIEW IF EXISTS `v_user_files`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_files` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `full_name`,
  1 AS `file_name`,
  1 AS `file_type`,
  1 AS `file_size`,
  1 AS `file_path`,
  1 AS `category`,
  1 AS `created_at` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_languages`
--

DROP TABLE IF EXISTS `v_user_languages`;
/*!50001 DROP VIEW IF EXISTS `v_user_languages`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_languages` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `full_name`,
  1 AS `language`,
  1 AS `proficiency` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_profile`
--

DROP TABLE IF EXISTS `v_user_profile`;
/*!50001 DROP VIEW IF EXISTS `v_user_profile`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_profile` AS SELECT
 1 AS `user_id`,
  1 AS `email`,
  1 AS `full_name`,
  1 AS `national_id`,
  1 AS `mother_name`,
  1 AS `dob`,
  1 AS `gender`,
  1 AS `nationality`,
  1 AS `country`,
  1 AS `previous_address`,
  1 AS `current_address`,
  1 AS `marital_status`,
  1 AS `family_members`,
  1 AS `phone`,
  1 AS `bio`,
  1 AS `profile_image`,
  1 AS `created_at`,
  1 AS `updated_at` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_projects`
--

DROP TABLE IF EXISTS `v_user_projects`;
/*!50001 DROP VIEW IF EXISTS `v_user_projects`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_projects` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `full_name`,
  1 AS `project_name`,
  1 AS `role`,
  1 AS `description`,
  1 AS `technologies`,
  1 AS `start_date`,
  1 AS `end_date`,
  1 AS `project_url`,
  1 AS `is_ongoing` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_skills`
--

DROP TABLE IF EXISTS `v_user_skills`;
/*!50001 DROP VIEW IF EXISTS `v_user_skills`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_skills` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `full_name`,
  1 AS `skill_name`,
  1 AS `level`,
  1 AS `type` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_trainings`
--

DROP TABLE IF EXISTS `v_user_trainings`;
/*!50001 DROP VIEW IF EXISTS `v_user_trainings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_trainings` AS SELECT
 1 AS `id`,
  1 AS `user_id`,
  1 AS `full_name`,
  1 AS `course_name`,
  1 AS `provider`,
  1 AS `certificate_url`,
  1 AS `start_date`,
  1 AS `end_date`,
  1 AS `description` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_user_data_entries`
--

/*!50001 DROP VIEW IF EXISTS `v_user_data_entries`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_data_entries` AS select `e`.`id` AS `id`,`e`.`user_id` AS `user_id`,`i`.`full_name` AS `created_by_name`,`e`.`full_name` AS `full_name`,`e`.`email` AS `email`,`e`.`national_id` AS `national_id`,`e`.`mother_name` AS `mother_name`,`e`.`dob` AS `dob`,`e`.`gender` AS `gender`,`e`.`nationality` AS `nationality`,`e`.`country` AS `country`,`e`.`previous_address` AS `previous_address`,`e`.`current_address` AS `current_address`,`e`.`marital_status` AS `marital_status`,`e`.`family_members` AS `family_members`,`e`.`mobile` AS `mobile`,`e`.`phone` AS `phone`,`e`.`bio` AS `bio`,`e`.`experiences` AS `experiences`,`e`.`courses` AS `courses`,`e`.`skills` AS `skills`,`e`.`languages` AS `languages`,`e`.`created_at` AS `created_at` from (`user_data_entries` `e` left join `user_infos` `i` on(`e`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `e`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_experiences`
--

/*!50001 DROP VIEW IF EXISTS `v_user_experiences`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_experiences` AS select `e`.`id` AS `id`,`e`.`user_id` AS `user_id`,`i`.`full_name` AS `full_name`,`e`.`job_title` AS `job_title`,`e`.`company_name` AS `company_name`,`e`.`location` AS `location`,`e`.`start_date` AS `start_date`,`e`.`end_date` AS `end_date`,`e`.`is_current` AS `is_current`,`e`.`description` AS `description` from (`user_experiences` `e` left join `user_infos` `i` on(`e`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `e`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_files`
--

/*!50001 DROP VIEW IF EXISTS `v_user_files`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_files` AS select `f`.`id` AS `id`,`f`.`user_id` AS `user_id`,`i`.`full_name` AS `full_name`,`f`.`file_name` AS `file_name`,`f`.`file_type` AS `file_type`,`f`.`file_size` AS `file_size`,`f`.`file_path` AS `file_path`,`f`.`category` AS `category`,`f`.`created_at` AS `created_at` from (`user_files` `f` left join `user_infos` `i` on(`f`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `f`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_languages`
--

/*!50001 DROP VIEW IF EXISTS `v_user_languages`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_languages` AS select `l`.`id` AS `id`,`l`.`user_id` AS `user_id`,`i`.`full_name` AS `full_name`,`l`.`language` AS `language`,`l`.`proficiency` AS `proficiency` from (`user_languages` `l` left join `user_infos` `i` on(`l`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `l`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_profile`
--

/*!50001 DROP VIEW IF EXISTS `v_user_profile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_profile` AS select `u`.`id` AS `user_id`,`u`.`email` AS `email`,`i`.`full_name` AS `full_name`,`i`.`national_id` AS `national_id`,`i`.`mother_name` AS `mother_name`,`i`.`dob` AS `dob`,`i`.`gender` AS `gender`,`i`.`nationality` AS `nationality`,`i`.`country` AS `country`,`i`.`previous_address` AS `previous_address`,`i`.`current_address` AS `current_address`,`i`.`marital_status` AS `marital_status`,`i`.`family_members` AS `family_members`,`i`.`phone` AS `phone`,`i`.`bio` AS `bio`,`i`.`profile_image` AS `profile_image`,`u`.`created_at` AS `created_at`,`u`.`updated_at` AS `updated_at` from (`users` `u` left join `user_infos` `i` on(`u`.`id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `u`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_projects`
--

/*!50001 DROP VIEW IF EXISTS `v_user_projects`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_projects` AS select `p`.`id` AS `id`,`p`.`user_id` AS `user_id`,`i`.`full_name` AS `full_name`,`p`.`project_name` AS `project_name`,`p`.`role` AS `role`,`p`.`description` AS `description`,`p`.`technologies` AS `technologies`,`p`.`start_date` AS `start_date`,`p`.`end_date` AS `end_date`,`p`.`project_url` AS `project_url`,`p`.`is_ongoing` AS `is_ongoing` from (`user_projects` `p` left join `user_infos` `i` on(`p`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `p`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_skills`
--

/*!50001 DROP VIEW IF EXISTS `v_user_skills`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_skills` AS select `s`.`id` AS `id`,`s`.`user_id` AS `user_id`,`i`.`full_name` AS `full_name`,`s`.`skill_name` AS `skill_name`,`s`.`level` AS `level`,`s`.`type` AS `type` from (`user_skills` `s` left join `user_infos` `i` on(`s`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `s`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_trainings`
--

/*!50001 DROP VIEW IF EXISTS `v_user_trainings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_trainings` AS select `t`.`id` AS `id`,`t`.`user_id` AS `user_id`,`i`.`full_name` AS `full_name`,`t`.`course_name` AS `course_name`,`t`.`provider` AS `provider`,`t`.`certificate_url` AS `certificate_url`,`t`.`start_date` AS `start_date`,`t`.`end_date` AS `end_date`,`t`.`description` AS `description` from (`user_trainings` `t` left join `user_infos` `i` on(`t`.`user_id` = `i`.`user_id` and `i`.`is_deleted` = 0)) where `t`.`is_deleted` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-03  0:02:39
