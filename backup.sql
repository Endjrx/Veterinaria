/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.15-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: veterinaria
-- ------------------------------------------------------
-- Server version	10.11.15-MariaDB

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int(11) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`id_administrador`),
  CONSTRAINT `administrador_id_administrador_97d40f3e_fk_auth_user_id` FOREIGN KEY (`id_administrador`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES
(2,'3007821853');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES
(61,'Can add permission',17,'add_permission'),
(62,'Can change permission',17,'change_permission'),
(63,'Can delete permission',17,'delete_permission'),
(64,'Can view permission',17,'view_permission'),
(65,'Can add group',18,'add_group'),
(66,'Can change group',18,'change_group'),
(67,'Can delete group',18,'delete_group'),
(68,'Can view group',18,'view_group'),
(69,'Can add user',19,'add_user'),
(70,'Can change user',19,'change_user'),
(71,'Can delete user',19,'delete_user'),
(72,'Can view user',19,'view_user'),
(73,'Can add content type',16,'add_contenttype'),
(74,'Can change content type',16,'change_contenttype'),
(75,'Can delete content type',16,'delete_contenttype'),
(76,'Can view content type',16,'view_contenttype'),
(77,'Can add log entry',20,'add_logentry'),
(78,'Can change log entry',20,'change_logentry'),
(79,'Can delete log entry',20,'delete_logentry'),
(80,'Can view log entry',20,'view_logentry'),
(81,'Can add session',21,'add_session'),
(82,'Can change session',21,'change_session'),
(83,'Can delete session',21,'delete_session'),
(84,'Can view session',21,'view_session'),
(85,'Can add administrador',22,'add_administrador'),
(86,'Can change administrador',22,'change_administrador'),
(87,'Can delete administrador',22,'delete_administrador'),
(88,'Can view administrador',22,'view_administrador'),
(89,'Can add cita',23,'add_cita'),
(90,'Can change cita',23,'change_cita'),
(91,'Can delete cita',23,'delete_cita'),
(92,'Can view cita',23,'view_cita'),
(93,'Can add cliente',24,'add_cliente'),
(94,'Can change cliente',24,'change_cliente'),
(95,'Can delete cliente',24,'delete_cliente'),
(96,'Can view cliente',24,'view_cliente'),
(97,'Can add veterinario',25,'add_veterinario'),
(98,'Can change veterinario',25,'change_veterinario'),
(99,'Can delete veterinario',25,'delete_veterinario'),
(100,'Can view veterinario',25,'view_veterinario'),
(101,'Can add empleado',26,'add_empleado'),
(102,'Can change empleado',26,'change_empleado'),
(103,'Can delete empleado',26,'delete_empleado'),
(104,'Can view empleado',26,'view_empleado'),
(105,'Can add factura',27,'add_factura'),
(106,'Can change factura',27,'change_factura'),
(107,'Can delete factura',27,'delete_factura'),
(108,'Can view factura',27,'view_factura'),
(109,'Can add historial_de_ vacunas',28,'add_historial_de_vacunas'),
(110,'Can change historial_de_ vacunas',28,'change_historial_de_vacunas'),
(111,'Can delete historial_de_ vacunas',28,'delete_historial_de_vacunas'),
(112,'Can view historial_de_ vacunas',28,'view_historial_de_vacunas'),
(113,'Can add mascota',29,'add_mascota'),
(114,'Can change mascota',29,'change_mascota'),
(115,'Can delete mascota',29,'delete_mascota'),
(116,'Can view mascota',29,'view_mascota'),
(117,'Can add tratamiento',30,'add_tratamiento'),
(118,'Can change tratamiento',30,'change_tratamiento'),
(119,'Can delete tratamiento',30,'delete_tratamiento'),
(120,'Can view tratamiento',30,'view_tratamiento');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES
(2,'pbkdf2_sha256$1000000$Tw8a6tiuY03h2IsVZ9dBzn$VWIOq6pVlkSNoagctgpuhaHlPEEqQBYhSInqDZLoOuI=','2025-11-25 16:44:15.793411',1,'EndjrxDJ','Endys','Parody','endijosueparodi66@gmail.com',1,1,'2025-11-20 18:00:11.000000');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `id_cita` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time(6) NOT NULL,
  `motivo` varchar(200) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `mascota_id` bigint(20) NOT NULL,
  `veterinario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_cita`),
  KEY `cita_mascota_id_ec36f721_fk_mascota_id_mascota` (`mascota_id`),
  KEY `cita_veterinario_id_28245400_fk_veterinario_id_veterinario` (`veterinario_id`),
  CONSTRAINT `cita_mascota_id_ec36f721_fk_mascota_id_mascota` FOREIGN KEY (`mascota_id`) REFERENCES `mascota` (`id_mascota`),
  CONSTRAINT `cita_veterinario_id_28245400_fk_veterinario_id_veterinario` FOREIGN KEY (`veterinario_id`) REFERENCES `veterinario` (`id_veterinario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES
(1,'2025-11-25','01:10:00.000000','Esta enfermo','Programada',2,1),
(2,'2025-11-26','21:30:00.000000','Limpieza General','Pendiente',2,1),
(3,'2025-11-26','12:28:00.000000','Gripa','Pendiente',2,1),
(4,'2025-11-25','12:29:00.000000','SAe enXD','Pendiente',2,1),
(5,'2025-11-26','12:45:00.000000','gripe','Confirmada',2,1);
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES
(2,'Endys XD','Parodys','3007821853','Calle 4A #4-81','endijosueparodi66@gmail.com','Activo');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK (`action_flag` >= 0)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES
(3,'2025-11-20 19:01:42.946304','2','EndjrxDJ',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',19,2);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES
(20,'admin','logentry'),
(22,'administrador','administrador'),
(18,'auth','group'),
(17,'auth','permission'),
(19,'auth','user'),
(23,'cita','cita'),
(24,'cliente','cliente'),
(16,'contenttypes','contenttype'),
(26,'empleado','empleado'),
(25,'empl_veterinario','veterinario'),
(27,'factura','factura'),
(28,'historial_de_vacunas','historial_de_vacunas'),
(29,'mascota','mascota'),
(21,'sessions','session'),
(30,'tratamiento','tratamiento');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES
(28,'contenttypes','0001_initial','2025-11-20 17:38:18.742672'),
(29,'contenttypes','0002_remove_content_type_name','2025-11-20 17:38:18.838903'),
(30,'auth','0001_initial','2025-11-20 17:38:22.064967'),
(31,'auth','0002_alter_permission_name_max_length','2025-11-20 17:38:22.167147'),
(32,'auth','0003_alter_user_email_max_length','2025-11-20 17:38:22.264969'),
(33,'auth','0004_alter_user_username_opts','2025-11-20 17:38:22.371997'),
(34,'auth','0005_alter_user_last_login_null','2025-11-20 17:38:22.473274'),
(35,'auth','0006_require_contenttypes_0002','2025-11-20 17:38:22.573683'),
(36,'auth','0007_alter_validators_add_error_messages','2025-11-20 17:38:22.679248'),
(37,'auth','0008_alter_user_username_max_length','2025-11-20 17:38:22.781097'),
(38,'auth','0009_alter_user_last_name_max_length','2025-11-20 17:38:22.883324'),
(39,'auth','0010_alter_group_name_max_length','2025-11-20 17:38:22.979373'),
(40,'auth','0011_update_proxy_permissions','2025-11-20 17:38:23.088665'),
(41,'auth','0012_alter_user_first_name_max_length','2025-11-20 17:38:23.190199'),
(42,'admin','0001_initial','2025-11-20 17:38:27.156826'),
(43,'admin','0002_logentry_remove_auto_add','2025-11-20 17:38:27.286733'),
(44,'admin','0003_logentry_add_action_flag_choices','2025-11-20 17:38:27.390072'),
(45,'sessions','0001_initial','2025-11-20 17:38:32.920350'),
(46,'administrador','0001_initial','2025-11-20 17:38:38.373367'),
(47,'administrador','0002_remove_administrador_licencia_and_more','2025-11-20 17:38:38.495830'),
(48,'cliente','0001_initial','2025-11-20 17:38:38.654264'),
(49,'mascota','0001_initial','2025-11-20 17:38:38.757294'),
(50,'empleado','0001_initial','2025-11-20 17:38:38.860846'),
(51,'empl_veterinario','0001_initial','2025-11-20 17:38:38.961245'),
(52,'cita','0001_initial','2025-11-20 17:38:39.064328'),
(53,'factura','0001_initial','2025-11-20 17:38:39.166000'),
(54,'historial_de_vacunas','0001_initial','2025-11-20 17:38:39.268222'),
(55,'tratamiento','0001_initial','2025-11-20 17:38:39.364128'),
(56,'cliente','0002_alter_cliente_estado','2025-11-20 18:25:21.925072'),
(57,'factura','0002_alter_factura_administrador_id','2025-11-25 14:34:03.950921');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES
('4lvs6cisc2skcggq2u9iyskttx48sipm','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMWwt:yXfaA2dyBQXKFw5M9rP2GHZSBBaCONziCb2c7xXMFoA','2025-12-05 19:37:39.382862'),
('4xwxun1bhf0qnf42amf05hnb6mcqp6rr','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMzFJ:NVTMYW5r4b6ac7OaZm5dr-ADBfuyk4I1qmM8jkxceH0','2025-12-07 01:50:33.159609'),
('csm86fwrhxrdwvbh72rhwe81061kmrbi','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vNm4v:MjS1iA_D5t7zE1YIjBijXm6brBt6qI6NF1-Qd60qC3k','2025-12-09 05:59:05.792838'),
('cyhnk20yk3h0q3xf4mfxlnvdd879wx4l','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vN0u9:5YeS6f9JGd6TEufTRJZCS9u2JrvhwNOJC-T1wYLIJfc','2025-12-07 03:36:49.089206'),
('d1uwir09e5i8fn3bkq01emwny134ypks','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vNhEf:LH8Tnmyar209Jh-hYf1VF5M9Rf_aWJDon9SetbwxJX8','2025-12-09 00:48:49.347820'),
('dbmp6r1mxe22gcooevomi36j03ln8s8s','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vNDkY:fOqERetTALzVnBGjrQsYDATdBc4nxW0bg78K_CInMbM','2025-12-07 17:19:46.637804'),
('du664dvdculhh59b4jf7qj3ud46zeuxl','.eJxVjDsOwjAQBe_iGlnejb-U9JzBWv9wANlSnFSIu0OkFNC-mXkv5mlbq99GXvyc2JkhO_1ugeIjtx2kO7Vb57G3dZkD3xV-0MGvPeXn5XD_DiqN-q1diJM2TlkpEEEqKCoGHU2WBqYgDWJBZ4yUBTQ4q6hoNRUiEcGCIMXeH60vNoU:1vNnwB:EQY1TBDhcZk3Ma0zrrpexsv1p-dPQnYJm6F7eFMOjDo','2025-12-09 07:58:11.772257'),
('edve8xfsyjim75pmxj99wy8u5xeol1um','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMWvH:W-efuyUqEa7J48u-Xc7wZ2VKAPObFAhlmmtXQg0kR-4','2025-12-05 19:35:59.284821'),
('eoqkhcov0ctsm106mi11k77n0o73y2wx','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMCAL:2aDCjsmcNNd5k7G29ji1JvsSGnleZ079Pdwu5VD9NII','2025-12-04 21:26:09.736312'),
('h444uy8zjbtucptah2uj5d2efuglfr24','.eJxVjMEOwiAQRP-FsyEsUgSP3v0GsstupWpoUtqT8d-VpAed47w381IJt7WkrcmSJlZnZdXhtyPMD6kd8B3rbdZ5rusyke6K3mnT15nledndv4OCrfQ1MVqXAQJ65yDEiAheDGU_BnNi58nJN5QxcgQUMASjs8Nw9AGyVe8P_B84UA:1vNnnl:GCZhdsMLcyCGJGKZJOUJ1MP_juQju7IkGVPqp34ua-Y','2025-12-09 07:49:29.587896'),
('i47vdd4rmufzb5sknh7l4ptzby45zjhw','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMd2b:XEMYoA_2e-oOd0J32lcNN5xCmgoZ7C_xxp7KOVNMbds','2025-12-06 02:07:57.378823'),
('k4hlpo9hawg0879qva7d4jsabdtroo0a','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMWxm:Ah2OSecHdl2D7UvLe-f9byx08dnQZEofpPu_3_PrkpI','2025-12-05 19:38:34.676655'),
('kfkykie3rhzg8qdabr540launsa4gpxj','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMzK3:pOYQ3uZfBaIEN1FclzaJcg5sYam9oS2-kZ2YpOQaOWk','2025-12-07 01:55:27.830137'),
('l3hzwbqwvaw2bmk2vujw7qnv0l36mxrh','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMWHe:FNjBYEdDGPrMNwMsqGehHyFDWGCsV_qUbpGqLbRfiBk','2025-12-05 18:55:02.123432'),
('lkp8ve2sm3tb75levacyzf3zg9q436dz','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMK2T:joVPAzPTqbLKMUJNdE36ktqVBHk0nVq98H5oDAr_q58','2025-12-05 05:50:33.334858'),
('nzdtqtdc8t88v963d9hxcaa7jtfrg2xw','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMd7y:egiz79-Ajf0XHuUIVJrIULMKemO_1Z9etYMelc0DU7g','2025-12-06 02:13:30.256115'),
('pzl8ti9cfxphhbj8d8hn9k1cbom3q83e','.eJxVjDsOwjAQBe_iGlnejb-U9JzBWv9wANlSnFSIu0OkFNC-mXkv5mlbq99GXvyc2JkhO_1ugeIjtx2kO7Vb57G3dZkD3xV-0MGvPeXn5XD_DiqN-q1diJM2TlkpEEEqKCoGHU2WBqYgDWJBZ4yUBTQ4q6hoNRUiEcGCIMXeH60vNoU:1vNw9H:-hF4DbMxJxkXv9BNI0lQssTPPLsgPXSd9XnjjSEEsEE','2025-12-09 16:44:15.895481'),
('qzz7i7o8kr5moej1z6qqmu75wmps7acx','.eJxVjDsOwjAQBe_iGlnejb-U9JzBWv9wANlSnFSIu0OkFNC-mXkv5mlbq99GXvyc2JkhO_1ugeIjtx2kO7Vb57G3dZkD3xV-0MGvPeXn5XD_DiqN-q1diJM2TlkpEEEqKCoGHU2WBqYgDWJBZ4yUBTQ4q6hoNRUiEcGCIMXeH60vNoU:1vNv0v:-j_EvoXU_IN-6TfzURvP73TNjhAMM9-Dqj9Mf33Iudc','2025-12-09 15:31:33.834842'),
('rsm43iv5x84kud68cc2hrdtwkzbfsn5p','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMd9M:mqUsNoqQL5e-OyQN4Nwf3UkcnCby1clhWGTYIXy4kt0','2025-12-06 02:14:56.631389'),
('rxs3pkgezma1lf9723395gbgky2ihckc','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMumL:Gk1vyT2ZM4S6Bb5PNup2sJaznXoFGwQpNTh0NFOi2Yc','2025-12-06 21:04:21.167798'),
('rzdlk6vap3agp236kawowhhvuk6h0qy1','.eJxVjDsOwjAQBe_iGlnejb-U9JzBWv9wANlSnFSIu0OkFNC-mXkv5mlbq99GXvyc2JkhO_1ugeIjtx2kO7Vb57G3dZkD3xV-0MGvPeXn5XD_DiqN-q1diJM2TlkpEEEqKCoGHU2WBqYgDWJBZ4yUBTQ4q6hoNRUiEcGCIMXeH60vNoU:1vNvDW:CWfZVErV9QNjMzAF98t5PoB37-HaBbLEOdK54FJi7Os','2025-12-09 15:44:34.282059'),
('w7yxqmfppv9lghpgma2eib4q2rxjgp4w','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMWv4:urSlmT-7nVWFecNRC4Tara97CQlYFFzxFIGFVG6O7Js','2025-12-05 19:35:46.357553'),
('wfrcti51d09g8o7srhtg35n0b9adrmdh','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMzHn:Gd0MMYNV5ZBm-FnrL2ERfrngywo9XOTDqWjQamncOYI','2025-12-07 01:53:07.235035'),
('xmcqpeiv56y9etfryfnlziyasqw9pnqu','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMX0t:rrA5AWgMOdhVCzfJgOokgDwGU6TIOtTYNUi16GDmtOs','2025-12-05 19:41:47.430301'),
('yf7td929s638bff05srxiqlldvwwjwt7','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMd9w:54cru9wT_USdZbLDAhq87QYJODzXBQv-LQtqaYgyeYA','2025-12-06 02:15:32.863721'),
('znezeysade4hay3nrip1uadsqkxbudw5','.eJxVjMsOwiAQAP-FsyFIKQ-P3v0GsrssUjWQlPZk_HdD0oNeZybzFhH2rcS98xqXJC5Ci9MvQ6An1yHSA-q9SWp1WxeUI5GH7fLWEr-uR_s3KNDL2DIQzOSCdWDszCnh5JXKecLsLFsfnFE-AGUVjNMUAuiMGhkmA2fQ4vMF-wM4aw:1vMWwY:vte2aX03VDx2hS5mkpC4ZbtZE7em2D6YXM5fXCw8694','2025-12-05 19:37:18.839542');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `id_empleado` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES
(1,'Carlos','Rodriguez','300 123 4567');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id_factura` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_emision` date NOT NULL,
  `monto_total` decimal(10,2) NOT NULL,
  `estado_pago` varchar(50) NOT NULL,
  `administrador_id` int(11) NOT NULL,
  `cita_id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `factura_administrador_id_c1ac2529_fk_administr` (`administrador_id`),
  KEY `factura_cita_id_87c57c47_fk_cita_id_cita` (`cita_id`),
  KEY `factura_cliente_id_d6cd70fe_fk_cliente_id_cliente` (`cliente_id`),
  CONSTRAINT `factura_administrador_id_c1ac2529_fk_auth_user_id` FOREIGN KEY (`administrador_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `factura_cita_id_87c57c47_fk_cita_id_cita` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`id_cita`),
  CONSTRAINT `factura_cliente_id_d6cd70fe_fk_cliente_id_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES
(1,'2025-11-25',20.00,'Pendiente',2,2,2);
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_de_vacunas`
--

DROP TABLE IF EXISTS `historial_de_vacunas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_de_vacunas` (
  `id_vacuna` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_vacuna` varchar(100) NOT NULL,
  `fecha_aplic` date NOT NULL,
  `fecha_venc` date NOT NULL,
  `lote` varchar(50) NOT NULL,
  `mascota_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_vacuna`),
  KEY `historial_de_Vacunas_mascota_id_fd1e13ff_fk_mascota_id_mascota` (`mascota_id`),
  CONSTRAINT `historial_de_Vacunas_mascota_id_fd1e13ff_fk_mascota_id_mascota` FOREIGN KEY (`mascota_id`) REFERENCES `mascota` (`id_mascota`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_de_vacunas`
--

LOCK TABLES `historial_de_vacunas` WRITE;
/*!40000 ALTER TABLE `historial_de_vacunas` DISABLE KEYS */;
INSERT INTO `historial_de_vacunas` VALUES
(7,'Rabia','2025-11-25','2025-11-26','102312412',2);
/*!40000 ALTER TABLE `historial_de_vacunas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mascota`
--

DROP TABLE IF EXISTS `mascota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascota` (
  `id_mascota` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(50) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `peso` decimal(5,2) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_mascota`),
  KEY `mascota_cliente_id_df2e0369_fk_cliente_id_cliente` (`cliente_id`),
  CONSTRAINT `mascota_cliente_id_df2e0369_fk_cliente_id_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascota`
--

LOCK TABLES `mascota` WRITE;
/*!40000 ALTER TABLE `mascota` DISABLE KEYS */;
INSERT INTO `mascota` VALUES
(2,'Mono','Perro','Mestizo',2,31.00,2);
/*!40000 ALTER TABLE `mascota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamiento` (
  `id_tratamiento` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `medicamento` varchar(100) NOT NULL,
  `dosis` varchar(50) NOT NULL,
  `duracion` varchar(50) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `cita_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_tratamiento`),
  KEY `tratamiento_cita_id_f2c3581f_fk_cita_id_cita` (`cita_id`),
  CONSTRAINT `tratamiento_cita_id_f2c3581f_fk_cita_id_cita` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`id_cita`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinario`
--

DROP TABLE IF EXISTS `veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinario` (
  `id_veterinario` bigint(20) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  PRIMARY KEY (`id_veterinario`),
  CONSTRAINT `veterinario_id_veterinario_efb1fbb2_fk_empleado_id_empleado` FOREIGN KEY (`id_veterinario`) REFERENCES `empleado` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinario`
--

LOCK TABLES `veterinario` WRITE;
/*!40000 ALTER TABLE `veterinario` DISABLE KEYS */;
INSERT INTO `veterinario` VALUES
(1,'Cirugia Veterinaria');
/*!40000 ALTER TABLE `veterinario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25 17:14:21
