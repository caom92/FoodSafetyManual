-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2016 at 08:07 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `del_cabo`
--
CREATE DATABASE IF NOT EXISTS `del_cabo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `del_cabo`;

-- --------------------------------------------------------

--
-- Table structure for table `access_permissions`
--

DROP TABLE IF EXISTS `access_permissions`;
CREATE TABLE `access_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_name` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `access_permissions`
--

INSERT INTO `access_permissions` (`id`, `permission_name`) VALUES
(1, 'Read'),
(2, 'Write'),
(3, 'None');

-- --------------------------------------------------------

--
-- Table structure for table `certification_programs`
--

DROP TABLE IF EXISTS `certification_programs`;
CREATE TABLE `certification_programs` (
  `id` int(10) UNSIGNED NOT NULL,
  `certification_program_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `certification_programs`
--

INSERT INTO `certification_programs` (`id`, `certification_program_name`) VALUES
(1, 'Programa de Prueba');

-- --------------------------------------------------------

--
-- Table structure for table `company_zones`
--

DROP TABLE IF EXISTS `company_zones`;
CREATE TABLE `company_zones` (
  `id` int(10) UNSIGNED NOT NULL,
  `zone_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_zones`
--

INSERT INTO `company_zones` (`id`, `zone_name`) VALUES
(1, 'Maneadero');

-- --------------------------------------------------------

--
-- Table structure for table `gmp_hand_washing_daily_log`
--

DROP TABLE IF EXISTS `gmp_hand_washing_daily_log`;
CREATE TABLE `gmp_hand_washing_daily_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_profile_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `workplace_area_id` int(10) UNSIGNED NOT NULL,
  `comment` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gmp_hand_washing_daily_log`
--

INSERT INTO `gmp_hand_washing_daily_log` (`id`, `user_profile_id`, `date`, `time`, `workplace_area_id`, `comment`) VALUES
(36, 1, '2016-03-06', '18:00:00', 2, 'domingo'),
(37, 1, '2016-03-07', '18:00:00', 2, 'lunes'),
(38, 1, '2016-03-08', '18:00:00', 2, 'martes'),
(39, 1, '2016-03-09', '18:00:00', 2, 'miercoles'),
(40, 1, '2016-03-10', '18:00:00', 2, 'jueves'),
(41, 1, '2016-03-11', '18:00:00', 2, 'viernes'),
(42, 1, '2016-03-12', '18:00:00', 2, 'sabado'),
(47, 1, '2016-03-14', '01:00:00', 1, 'prueba'),
(48, 1, '2016-03-22', '13:30:00', 2, 'asdf'),
(49, 1, '2016-03-22', '13:30:00', 2, 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `gmp_hand_washing_log`
--

DROP TABLE IF EXISTS `gmp_hand_washing_log`;
CREATE TABLE `gmp_hand_washing_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `daily_log_id` int(10) UNSIGNED NOT NULL,
  `period_log_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gmp_hand_washing_log`
--

INSERT INTO `gmp_hand_washing_log` (`id`, `daily_log_id`, `period_log_id`) VALUES
(1, 36, 34),
(2, 36, 35),
(3, 36, 36),
(4, 36, 37),
(5, 37, 38),
(6, 37, 39),
(7, 37, 40),
(8, 37, 41),
(9, 38, 42),
(10, 38, 43),
(11, 38, 44),
(12, 38, 45),
(13, 39, 46),
(14, 39, 47),
(15, 39, 48),
(16, 39, 49),
(17, 40, 50),
(18, 40, 51),
(19, 40, 52),
(20, 40, 53),
(21, 41, 54),
(22, 41, 55),
(23, 41, 56),
(24, 41, 57),
(25, 42, 58),
(26, 42, 59),
(27, 42, 60),
(28, 42, 61),
(36, 47, 68),
(37, 47, 69),
(38, 47, 70),
(39, 47, 71),
(40, 48, 72),
(41, 48, 73),
(42, 49, 74);

-- --------------------------------------------------------

--
-- Table structure for table `gmp_hand_washing_workday_period_log`
--

DROP TABLE IF EXISTS `gmp_hand_washing_workday_period_log`;
CREATE TABLE `gmp_hand_washing_workday_period_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `workday_period_id` int(10) UNSIGNED NOT NULL,
  `washed_hands` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gmp_hand_washing_workday_period_log`
--

INSERT INTO `gmp_hand_washing_workday_period_log` (`id`, `workday_period_id`, `washed_hands`) VALUES
(34, 1, 1),
(35, 2, 0),
(36, 3, 1),
(37, 4, 1),
(38, 1, 1),
(39, 2, 1),
(40, 3, 1),
(41, 4, 1),
(42, 1, 1),
(43, 2, 1),
(44, 3, 1),
(45, 4, 1),
(46, 1, 1),
(47, 2, 1),
(48, 3, 1),
(49, 4, 1),
(50, 1, 1),
(51, 2, 1),
(52, 3, 1),
(53, 4, 1),
(54, 1, 1),
(55, 2, 1),
(56, 3, 1),
(57, 4, 1),
(58, 1, 1),
(59, 2, 1),
(60, 3, 1),
(61, 4, 1),
(62, 1, 1),
(63, 1, 1),
(68, 1, 1),
(69, 2, 1),
(70, 3, 1),
(71, 4, 1),
(72, 1, 1),
(73, 1, 1),
(74, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pdf_file_paths`
--

DROP TABLE IF EXISTS `pdf_file_paths`;
CREATE TABLE `pdf_file_paths` (
  `id` int(10) UNSIGNED NOT NULL,
  `program_id` int(10) UNSIGNED NOT NULL,
  `title_name` varchar(64) NOT NULL,
  `file_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pdf_file_paths`
--

INSERT INTO `pdf_file_paths` (`id`, `program_id`, `title_name`, `file_name`) VALUES
(1, 1, 'SSOP', 'chicken.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `ssop_sanitation_pre_op_corrective_actions`
--

DROP TABLE IF EXISTS `ssop_sanitation_pre_op_corrective_actions`;
CREATE TABLE `ssop_sanitation_pre_op_corrective_actions` (
  `id` int(10) UNSIGNED NOT NULL,
  `action_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ssop_sanitation_pre_op_corrective_actions`
--

INSERT INTO `ssop_sanitation_pre_op_corrective_actions` (`id`, `action_name`) VALUES
(1, 'Wash/Rinse/Sanitize'),
(2, 'Re-Clean'),
(3, 'None');

-- --------------------------------------------------------

--
-- Table structure for table `ssop_sanitation_pre_op_hardware_logs`
--

DROP TABLE IF EXISTS `ssop_sanitation_pre_op_hardware_logs`;
CREATE TABLE `ssop_sanitation_pre_op_hardware_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `time` time NOT NULL,
  `hardware_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL,
  `corrective_action_id` int(10) UNSIGNED NOT NULL,
  `comment` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ssop_sanitation_pre_op_hardware_logs`
--

INSERT INTO `ssop_sanitation_pre_op_hardware_logs` (`id`, `time`, `hardware_id`, `status`, `corrective_action_id`, `comment`) VALUES
(1, '08:00:00', 1, 1, 3, 'Todo perfecto'),
(2, '07:18:00', 7, 0, 2, 'hola mundo'),
(3, '10:12:00', 8, 1, 3, 'todo perfecto'),
(4, '07:17:00', 7, 0, 2, 'hola mundo'),
(5, '08:17:00', 8, 1, 3, 'todo perfecto');

-- --------------------------------------------------------

--
-- Table structure for table `ssop_sanitation_pre_op_log`
--

DROP TABLE IF EXISTS `ssop_sanitation_pre_op_log`;
CREATE TABLE `ssop_sanitation_pre_op_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `log_info_id` int(10) UNSIGNED NOT NULL,
  `hardware_log_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ssop_sanitation_pre_op_log`
--

INSERT INTO `ssop_sanitation_pre_op_log` (`id`, `log_info_id`, `hardware_log_id`) VALUES
(4, 1, 1),
(5, 2, 2),
(6, 2, 3),
(7, 3, 4),
(8, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `ssop_sanitation_pre_op_logs_info`
--

DROP TABLE IF EXISTS `ssop_sanitation_pre_op_logs_info`;
CREATE TABLE `ssop_sanitation_pre_op_logs_info` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_profile_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ssop_sanitation_pre_op_logs_info`
--

INSERT INTO `ssop_sanitation_pre_op_logs_info` (`id`, `user_profile_id`, `date`) VALUES
(1, 1, '2016-03-14'),
(2, 1, '2016-03-22'),
(3, 1, '2016-04-22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `profile_info_id` int(10) UNSIGNED NOT NULL,
  `company_zone_id` int(10) UNSIGNED NOT NULL,
  `certification_program_id` int(10) UNSIGNED NOT NULL,
  `access_permission_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `profile_info_id`, `company_zone_id`, `certification_program_id`, `access_permission_id`) VALUES
(1, 1, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users_profile_info`
--

DROP TABLE IF EXISTS `users_profile_info`;
CREATE TABLE `users_profile_info` (
  `id` int(10) UNSIGNED NOT NULL,
  `employee_id_num` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `login_name` varchar(32) NOT NULL,
  `login_password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_profile_info`
--

INSERT INTO `users_profile_info` (`id`, `employee_id_num`, `full_name`, `email`, `login_name`, `login_password`) VALUES
(1, 1110027, 'Carlos Alberto Oliva Moreno', 'coliva@delcabo.com', 'coliva', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `workday_periods`
--

DROP TABLE IF EXISTS `workday_periods`;
CREATE TABLE `workday_periods` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_zone_id` int(10) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `period_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workday_periods`
--

INSERT INTO `workday_periods` (`id`, `company_zone_id`, `start_time`, `end_time`, `period_name`) VALUES
(1, 1, '08:00:00', '08:00:00', 'Inicio de jornada'),
(2, 1, '11:00:00', '11:30:00', 'Primer descanso'),
(3, 1, '14:00:00', '14:00:00', 'Regreso de Comida'),
(4, 1, '16:00:00', '16:30:00', 'Segundo descanso');

-- --------------------------------------------------------

--
-- Table structure for table `workplace_areas`
--

DROP TABLE IF EXISTS `workplace_areas`;
CREATE TABLE `workplace_areas` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_zone_id` int(10) UNSIGNED NOT NULL,
  `area_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workplace_areas`
--

INSERT INTO `workplace_areas` (`id`, `company_zone_id`, `area_name`) VALUES
(1, 1, 'Línea Izquierda'),
(2, 1, 'Línea Central'),
(3, 1, 'Línea Derecha');

-- --------------------------------------------------------

--
-- Table structure for table `workplace_area_hardware`
--

DROP TABLE IF EXISTS `workplace_area_hardware`;
CREATE TABLE `workplace_area_hardware` (
  `id` int(10) UNSIGNED NOT NULL,
  `workplace_area_id` int(10) UNSIGNED NOT NULL,
  `hardware_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workplace_area_hardware`
--

INSERT INTO `workplace_area_hardware` (`id`, `workplace_area_id`, `hardware_name`) VALUES
(1, 1, 'Martillo'),
(2, 1, 'Rastrillo'),
(3, 1, 'Piso'),
(4, 1, 'Ventana'),
(5, 2, 'Puerta'),
(6, 2, 'Refigerador'),
(7, 3, 'Desatornillador'),
(8, 3, 'Pinzas'),
(9, 3, 'Montacargas'),
(10, 3, 'Mesa para empaquetado');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_permissions`
--
ALTER TABLE `access_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `certification_programs`
--
ALTER TABLE `certification_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_zones`
--
ALTER TABLE `company_zones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gmp_hand_washing_daily_log`
--
ALTER TABLE `gmp_hand_washing_daily_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `area_id` (`workplace_area_id`),
  ADD KEY `user_profile_id` (`user_profile_id`);

--
-- Indexes for table `gmp_hand_washing_log`
--
ALTER TABLE `gmp_hand_washing_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `daily_log_id` (`daily_log_id`),
  ADD KEY `period_log_id` (`period_log_id`);

--
-- Indexes for table `gmp_hand_washing_workday_period_log`
--
ALTER TABLE `gmp_hand_washing_workday_period_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workday_period_id` (`workday_period_id`);

--
-- Indexes for table `pdf_file_paths`
--
ALTER TABLE `pdf_file_paths`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `ssop_sanitation_pre_op_corrective_actions`
--
ALTER TABLE `ssop_sanitation_pre_op_corrective_actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ssop_sanitation_pre_op_hardware_logs`
--
ALTER TABLE `ssop_sanitation_pre_op_hardware_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hardware_id` (`hardware_id`),
  ADD KEY `corrective_action_id` (`corrective_action_id`);

--
-- Indexes for table `ssop_sanitation_pre_op_log`
--
ALTER TABLE `ssop_sanitation_pre_op_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `log_info_id` (`log_info_id`),
  ADD KEY `hardware_log_id` (`hardware_log_id`);

--
-- Indexes for table `ssop_sanitation_pre_op_logs_info`
--
ALTER TABLE `ssop_sanitation_pre_op_logs_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_profile_id` (`user_profile_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_info_id` (`profile_info_id`),
  ADD KEY `log_in_info_id` (`company_zone_id`),
  ADD KEY `certificate_program_id` (`certification_program_id`),
  ADD KEY `access_permission_id` (`access_permission_id`);

--
-- Indexes for table `users_profile_info`
--
ALTER TABLE `users_profile_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login_name` (`login_name`);

--
-- Indexes for table `workday_periods`
--
ALTER TABLE `workday_periods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_zone_id` (`company_zone_id`);

--
-- Indexes for table `workplace_areas`
--
ALTER TABLE `workplace_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_zone_id` (`company_zone_id`);

--
-- Indexes for table `workplace_area_hardware`
--
ALTER TABLE `workplace_area_hardware`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workplace_area_id` (`workplace_area_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_permissions`
--
ALTER TABLE `access_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `certification_programs`
--
ALTER TABLE `certification_programs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `company_zones`
--
ALTER TABLE `company_zones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `gmp_hand_washing_daily_log`
--
ALTER TABLE `gmp_hand_washing_daily_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `gmp_hand_washing_log`
--
ALTER TABLE `gmp_hand_washing_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `gmp_hand_washing_workday_period_log`
--
ALTER TABLE `gmp_hand_washing_workday_period_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `pdf_file_paths`
--
ALTER TABLE `pdf_file_paths`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ssop_sanitation_pre_op_corrective_actions`
--
ALTER TABLE `ssop_sanitation_pre_op_corrective_actions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ssop_sanitation_pre_op_hardware_logs`
--
ALTER TABLE `ssop_sanitation_pre_op_hardware_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `ssop_sanitation_pre_op_log`
--
ALTER TABLE `ssop_sanitation_pre_op_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `ssop_sanitation_pre_op_logs_info`
--
ALTER TABLE `ssop_sanitation_pre_op_logs_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users_profile_info`
--
ALTER TABLE `users_profile_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `workday_periods`
--
ALTER TABLE `workday_periods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `workplace_areas`
--
ALTER TABLE `workplace_areas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `workplace_area_hardware`
--
ALTER TABLE `workplace_area_hardware`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `gmp_hand_washing_daily_log`
--
ALTER TABLE `gmp_hand_washing_daily_log`
  ADD CONSTRAINT `gmp_hand_washing_daily_log_ibfk_1` FOREIGN KEY (`workplace_area_id`) REFERENCES `workplace_areas` (`id`),
  ADD CONSTRAINT `gmp_hand_washing_daily_log_ibfk_2` FOREIGN KEY (`user_profile_id`) REFERENCES `users_profile_info` (`id`);

--
-- Constraints for table `gmp_hand_washing_log`
--
ALTER TABLE `gmp_hand_washing_log`
  ADD CONSTRAINT `gmp_hand_washing_log_ibfk_1` FOREIGN KEY (`daily_log_id`) REFERENCES `gmp_hand_washing_daily_log` (`id`),
  ADD CONSTRAINT `gmp_hand_washing_log_ibfk_2` FOREIGN KEY (`period_log_id`) REFERENCES `gmp_hand_washing_workday_period_log` (`id`);

--
-- Constraints for table `gmp_hand_washing_workday_period_log`
--
ALTER TABLE `gmp_hand_washing_workday_period_log`
  ADD CONSTRAINT `gmp_hand_washing_workday_period_log_ibfk_1` FOREIGN KEY (`workday_period_id`) REFERENCES `workday_periods` (`id`);

--
-- Constraints for table `pdf_file_paths`
--
ALTER TABLE `pdf_file_paths`
  ADD CONSTRAINT `pdf_file_paths_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `certification_programs` (`id`);

--
-- Constraints for table `ssop_sanitation_pre_op_hardware_logs`
--
ALTER TABLE `ssop_sanitation_pre_op_hardware_logs`
  ADD CONSTRAINT `ssop_sanitation_pre_op_hardware_logs_ibfk_1` FOREIGN KEY (`hardware_id`) REFERENCES `workplace_area_hardware` (`id`),
  ADD CONSTRAINT `ssop_sanitation_pre_op_hardware_logs_ibfk_2` FOREIGN KEY (`corrective_action_id`) REFERENCES `ssop_sanitation_pre_op_corrective_actions` (`id`);

--
-- Constraints for table `ssop_sanitation_pre_op_log`
--
ALTER TABLE `ssop_sanitation_pre_op_log`
  ADD CONSTRAINT `ssop_sanitation_pre_op_log_ibfk_1` FOREIGN KEY (`log_info_id`) REFERENCES `ssop_sanitation_pre_op_logs_info` (`id`),
  ADD CONSTRAINT `ssop_sanitation_pre_op_log_ibfk_2` FOREIGN KEY (`hardware_log_id`) REFERENCES `ssop_sanitation_pre_op_hardware_logs` (`id`);

--
-- Constraints for table `ssop_sanitation_pre_op_logs_info`
--
ALTER TABLE `ssop_sanitation_pre_op_logs_info`
  ADD CONSTRAINT `ssop_sanitation_pre_op_logs_info_ibfk_1` FOREIGN KEY (`user_profile_id`) REFERENCES `users_profile_info` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`profile_info_id`) REFERENCES `users_profile_info` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`company_zone_id`) REFERENCES `company_zones` (`id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`certification_program_id`) REFERENCES `certification_programs` (`id`),
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`access_permission_id`) REFERENCES `access_permissions` (`id`);

--
-- Constraints for table `workplace_areas`
--
ALTER TABLE `workplace_areas`
  ADD CONSTRAINT `workplace_areas_ibfk_1` FOREIGN KEY (`company_zone_id`) REFERENCES `company_zones` (`id`);

--
-- Constraints for table `workplace_area_hardware`
--
ALTER TABLE `workplace_area_hardware`
  ADD CONSTRAINT `workplace_area_hardware_ibfk_1` FOREIGN KEY (`workplace_area_id`) REFERENCES `workplace_areas` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
