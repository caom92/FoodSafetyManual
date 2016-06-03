-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2016 at 08:34 AM
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

CREATE TABLE `access_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_name` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `access_permissions`:
--

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

CREATE TABLE `certification_programs` (
  `id` int(10) UNSIGNED NOT NULL,
  `certification_program_name` varchar(32) NOT NULL,
  `description` varchar(512) NOT NULL,
  `file_name` varchar(64) NOT NULL,
  `url` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `certification_programs`:
--

--
-- Dumping data for table `certification_programs`
--

INSERT INTO `certification_programs` (`id`, `certification_program_name`, `description`, `file_name`, `url`) VALUES
(1, 'Sanitización Preoperativa', 'Antes de comenzar cada turno los supervisores deben de revisar el estado en el que quedaron las instalaciones y herramientas pertenecientes a la zona. Esto se ve reflejado en una lista de comprobación que indica el estado en el que se encontraron los elementos, la acción correctiva tomada en caso de alguna deficiencia y un comentario con las observaciones del capturista.', '05-15-01 Santation Program overview.pdf', 'sanitation_pre_op.html');

-- --------------------------------------------------------

--
-- Table structure for table `company_zones`
--

CREATE TABLE `company_zones` (
  `id` int(10) UNSIGNED NOT NULL,
  `zone_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `company_zones`:
--

--
-- Dumping data for table `company_zones`
--

INSERT INTO `company_zones` (`id`, `zone_name`) VALUES
(1, 'Maneadero'),
(2, 'LAW');

-- --------------------------------------------------------

--
-- Table structure for table `gmp_hand_washing_daily_log`
--

CREATE TABLE `gmp_hand_washing_daily_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_profile_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `workplace_area_id` int(10) UNSIGNED NOT NULL,
  `comment` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `gmp_hand_washing_daily_log`:
--   `workplace_area_id`
--       `workplace_areas` -> `id`
--   `user_profile_id`
--       `users_profile_info` -> `id`
--

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

CREATE TABLE `gmp_hand_washing_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `daily_log_id` int(10) UNSIGNED NOT NULL,
  `period_log_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `gmp_hand_washing_log`:
--   `daily_log_id`
--       `gmp_hand_washing_daily_log` -> `id`
--   `period_log_id`
--       `gmp_hand_washing_workday_period_log` -> `id`
--

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

CREATE TABLE `gmp_hand_washing_workday_period_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `workday_period_id` int(10) UNSIGNED NOT NULL,
  `washed_hands` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `gmp_hand_washing_workday_period_log`:
--   `workday_period_id`
--       `workday_periods` -> `id`
--

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
-- Table structure for table `ssop_sanitation_pre_op_corrective_actions`
--

CREATE TABLE `ssop_sanitation_pre_op_corrective_actions` (
  `id` int(10) UNSIGNED NOT NULL,
  `action_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `ssop_sanitation_pre_op_corrective_actions`:
--

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

CREATE TABLE `ssop_sanitation_pre_op_hardware_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `time` time NOT NULL,
  `hardware_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL,
  `corrective_action_id` int(10) UNSIGNED NOT NULL,
  `comment` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `ssop_sanitation_pre_op_hardware_logs`:
--   `hardware_id`
--       `workplace_area_hardware` -> `id`
--   `corrective_action_id`
--       `ssop_sanitation_pre_op_corrective_actions` -> `id`
--

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

CREATE TABLE `ssop_sanitation_pre_op_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `log_info_id` int(10) UNSIGNED NOT NULL,
  `hardware_log_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `ssop_sanitation_pre_op_log`:
--   `log_info_id`
--       `ssop_sanitation_pre_op_logs_info` -> `id`
--   `hardware_log_id`
--       `ssop_sanitation_pre_op_hardware_logs` -> `id`
--

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

CREATE TABLE `ssop_sanitation_pre_op_logs_info` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_profile_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `ssop_sanitation_pre_op_logs_info`:
--   `user_profile_id`
--       `users_profile_info` -> `id`
--

--
-- Dumping data for table `ssop_sanitation_pre_op_logs_info`
--

INSERT INTO `ssop_sanitation_pre_op_logs_info` (`id`, `user_profile_id`, `date`) VALUES
(1, 1, '2016-03-14'),
(2, 1, '2016-03-22'),
(3, 1, '2016-04-22'),
(4, 1, '2016-02-25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `profile_info_id` int(10) UNSIGNED NOT NULL,
  `company_zone_id` int(10) UNSIGNED NOT NULL,
  `certification_program_id` int(10) UNSIGNED NOT NULL,
  `access_permission_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `users`:
--   `profile_info_id`
--       `users_profile_info` -> `id`
--   `company_zone_id`
--       `company_zones` -> `id`
--   `certification_program_id`
--       `certification_programs` -> `id`
--   `access_permission_id`
--       `access_permissions` -> `id`
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `profile_info_id`, `company_zone_id`, `certification_program_id`, `access_permission_id`) VALUES
(1, 1, 1, 1, 2),
(5, 8, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users_profile_info`
--

CREATE TABLE `users_profile_info` (
  `id` int(10) UNSIGNED NOT NULL,
  `employee_id_num` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `login_name` varchar(32) NOT NULL,
  `login_password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `users_profile_info`:
--

--
-- Dumping data for table `users_profile_info`
--

INSERT INTO `users_profile_info` (`id`, `employee_id_num`, `full_name`, `email`, `login_name`, `login_password`) VALUES
(1, 1110027, 'Carlos Alberto Oliva Moreno', 'coliva@uabc.edu.mx', 'coliva', '5f4dcc3b5aa765d61d8327deb882cf99'),
(8, 12345, 'Victor Miracle Macotela', 'vmiracle@uabc.edu.mx', 'vmiracle', '5f4dcc3b5aa765d61d8327deb882cf99');

-- --------------------------------------------------------

--
-- Table structure for table `workday_periods`
--

CREATE TABLE `workday_periods` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_zone_id` int(10) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `period_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `workday_periods`:
--

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
-- Table structure for table `workplace_area_hardware`
--

CREATE TABLE `workplace_area_hardware` (
  `id` int(10) UNSIGNED NOT NULL,
  `workplace_area_id` int(10) UNSIGNED NOT NULL,
  `hardware_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `workplace_area_hardware`:
--   `workplace_area_id`
--       `workplace_areas` -> `id`
--

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
(10, 3, 'Mesa para empaquetado'),
(11, 4, 'Floors'),
(12, 4, 'Ceiling Lights'),
(13, 4, 'Trash Recepticales'),
(14, 4, 'Equipment Tomatoes'),
(15, 4, 'Stainless Table'),
(16, 4, 'Roll up loading doors'),
(17, 5, 'Floors'),
(18, 5, 'Cool Care Fans'),
(19, 5, 'Ceiling Lights'),
(20, 5, 'Trash Recepticales'),
(21, 5, 'Walls'),
(22, 5, 'Plastic Curtains'),
(23, 5, 'Cooling Units'),
(24, 6, 'Floors'),
(25, 6, 'Ceiling Lights'),
(26, 6, 'Trash Recepticales'),
(27, 6, 'Walls'),
(28, 6, 'Plastic Curtains'),
(29, 6, 'Cooling Units'),
(30, 7, 'Stainless Table 1'),
(31, 7, 'Stainless Table 2'),
(32, 7, 'Sorting Tube 1'),
(33, 7, 'Floors'),
(34, 7, 'Ceiling Lights'),
(35, 7, 'Lights Over 2 Tables'),
(36, 7, 'Trash Recepticales'),
(37, 7, 'Walls'),
(38, 7, 'Plastic Curtains'),
(39, 7, 'Cooling Units'),
(40, 8, 'Floors'),
(41, 8, 'Ceiling Lights'),
(42, 8, 'Trash Recepticales'),
(43, 8, 'Walls'),
(44, 8, 'Plastic Curtains'),
(45, 8, 'Cool Care Fans'),
(46, 8, 'Cooling Units'),
(47, 9, 'Stainless Table 1'),
(48, 9, 'Stainless Table 2'),
(49, 9, 'Stainless Table 3'),
(50, 9, 'Stainless Table 4'),
(51, 9, 'Stainless Table 5'),
(52, 9, 'Stainless Table 6'),
(53, 9, 'Stainless Table 7'),
(54, 9, 'Stainless Table 8'),
(55, 9, 'Handwash Stations'),
(56, 9, 'Floors'),
(57, 9, 'Drain 1'),
(58, 9, 'Drain 2'),
(59, 9, 'Drain 3'),
(60, 9, 'Drain 4'),
(61, 9, 'Trash Recepticales'),
(62, 9, 'Walls'),
(63, 9, 'Ceiling Lights'),
(64, 9, 'Cooling Units'),
(65, 10, 'Floors'),
(66, 10, 'Ceiling Lights'),
(67, 10, 'Trash Recepticales'),
(68, 10, 'Rack Labels'),
(69, 10, 'Walls'),
(70, 10, 'Plastic Curtains'),
(71, 11, 'Floors'),
(72, 11, 'Ceiling Lights'),
(73, 11, 'Trash Recepticales'),
(74, 11, 'Walls'),
(75, 11, 'Plastic Curtains'),
(76, 11, 'Cooling Units'),
(77, 11, 'Floors'),
(78, 11, 'Ceiling Lights'),
(79, 11, 'Trash recepticales'),
(80, 11, 'Walls'),
(81, 11, 'Plastic Curtains'),
(82, 11, 'Cooling Units'),
(83, 12, 'Stainless Table 1'),
(84, 12, 'Stainless Table 2'),
(85, 12, 'Stainless Table 3'),
(86, 12, 'Stainless Table 4'),
(87, 12, 'Stainless Table 5'),
(88, 12, 'Stainless Table 6'),
(89, 12, 'Stainless Table 1'),
(90, 12, 'Stainless Table 2'),
(91, 12, 'Stainless Table 3'),
(92, 12, 'Stainless Table 1'),
(93, 12, 'Stainless Table 2'),
(94, 12, 'Stainless Table 3'),
(95, 12, 'Stainless Table Equipment'),
(96, 12, 'Floors'),
(97, 12, 'Trash Recepticales'),
(98, 12, 'Hand wash station'),
(99, 12, 'Walls'),
(100, 12, 'Plastic Curtains'),
(101, 12, 'Label Equipment'),
(102, 12, 'Overhead Structures'),
(103, 13, 'Toilets'),
(104, 13, 'Sanitary Dispenser'),
(105, 13, 'Floors'),
(106, 13, 'Trash Recepticales'),
(107, 14, 'Toilets'),
(108, 14, 'Sanitary Dispenser'),
(109, 14, 'Floors'),
(110, 14, 'Trash Recepticales'),
(111, 15, 'Floors'),
(112, 15, 'Tables'),
(113, 15, 'Microwaves'),
(114, 15, 'Refrigerator'),
(115, 15, 'Trash Recepticales'),
(116, 15, 'Washer & Drier'),
(117, 15, 'Lockers'),
(118, 16, 'Urinals'),
(119, 16, 'Toilets'),
(120, 16, 'Floors'),
(121, 16, 'Trash Recepticales'),
(122, 17, 'Toilets'),
(123, 17, 'Sanitary Dispenser'),
(124, 17, 'Floors'),
(125, 17, 'Trash Recepticales');

-- --------------------------------------------------------

--
-- Table structure for table `workplace_areas`
--

CREATE TABLE `workplace_areas` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_zone_id` int(10) UNSIGNED NOT NULL,
  `area_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `workplace_areas`:
--   `company_zone_id`
--       `company_zones` -> `id`
--

--
-- Dumping data for table `workplace_areas`
--

INSERT INTO `workplace_areas` (`id`, `company_zone_id`, `area_name`) VALUES
(1, 1, 'Línea Izquierda'),
(2, 1, 'Línea Central'),
(3, 1, 'Línea Derecha'),
(4, 2, 'WHSE'),
(5, 2, 'Cooler #1'),
(6, 2, 'Cooler #2'),
(7, 2, 'Cooler #3'),
(8, 2, 'Cooler #4'),
(9, 2, 'Cooler #5 Packing Room'),
(10, 2, 'WH Annex'),
(11, 2, 'Cooler #6 Department 1&2'),
(12, 2, 'Packing Room #7'),
(13, 2, 'Back Side Restrooms Women #1'),
(14, 2, 'Back Side Restrooms Women #2'),
(15, 2, 'Break'),
(16, 2, 'Restrooms Men'),
(17, 2, 'Restrooms Women');

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
-- Indexes for table `workplace_area_hardware`
--
ALTER TABLE `workplace_area_hardware`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workplace_area_id` (`workplace_area_id`);

--
-- Indexes for table `workplace_areas`
--
ALTER TABLE `workplace_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_zone_id` (`company_zone_id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users_profile_info`
--
ALTER TABLE `users_profile_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `workday_periods`
--
ALTER TABLE `workday_periods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `workplace_area_hardware`
--
ALTER TABLE `workplace_area_hardware`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
--
-- AUTO_INCREMENT for table `workplace_areas`
--
ALTER TABLE `workplace_areas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
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
-- Constraints for table `workplace_area_hardware`
--
ALTER TABLE `workplace_area_hardware`
  ADD CONSTRAINT `workplace_area_hardware_ibfk_1` FOREIGN KEY (`workplace_area_id`) REFERENCES `workplace_areas` (`id`);

--
-- Constraints for table `workplace_areas`
--
ALTER TABLE `workplace_areas`
  ADD CONSTRAINT `workplace_areas_ibfk_1` FOREIGN KEY (`company_zone_id`) REFERENCES `company_zones` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
