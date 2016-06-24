-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2016 at 02:51 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `espresso`
--
CREATE DATABASE IF NOT EXISTS `espresso` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `espresso`;

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE `privileges` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` tinytext NOT NULL COMMENT 'The name of the privilege'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='The user system privileges';

--
-- RELATIONS FOR TABLE `privileges`:
--

--
-- Dumping data for table `privileges`
--

INSERT INTO `privileges` (`id`, `name`) VALUES
(1, 'None'),
(2, 'Read'),
(3, 'Write');

-- --------------------------------------------------------

--
-- Table structure for table `procedures`
--

CREATE TABLE `procedures` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` tinytext NOT NULL COMMENT 'The name for each procedure',
  `description` text COMMENT 'Optional description for each procedure'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Company-especific certification program procedures';

--
-- RELATIONS FOR TABLE `procedures`:
--

-- --------------------------------------------------------

--
-- Table structure for table `recovering_passwords`
--

CREATE TABLE `recovering_passwords` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the user to which the token is associated',
  `expiration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp for when the token was issued',
  `token` tinytext NOT NULL COMMENT 'The unique password recovery token'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='List of user passwords that requested to be recovered';

--
-- RELATIONS FOR TABLE `recovering_passwords`:
--   `user_id`
--       `user_profiles` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_procedure_privileges`
--

CREATE TABLE `user_procedure_privileges` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the user to which the privilege is associated',
  `zone_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the zone to which the procedure is associated',
  `procedure_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the procedure to which the user is associated',
  `privilege_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the privilege assigned to this user-zone-procedure combination'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Privileges that each user has for a particular procedure';

--
-- RELATIONS FOR TABLE `user_procedure_privileges`:
--   `user_id`
--       `user_profiles` -> `id`
--   `zone_id`
--       `zones` -> `id`
--   `procedure_id`
--       `procedures` -> `id`
--   `privilege_id`
--       `privileges` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `employee_num` int(10) UNSIGNED NOT NULL COMMENT 'The company-especific unique ID number for each user',
  `first_name` tinytext NOT NULL COMMENT 'The user''s first name(s)',
  `last_name` tinytext NOT NULL COMMENT 'The user''s last name(s)',
  `email` tinytext NOT NULL COMMENT 'The user''s (probably company-especific) e-mail for account administration',
  `account_nickname` tinytext NOT NULL COMMENT 'The user''s account nickname',
  `login_password` tinytext NOT NULL COMMENT 'The user''s password for logging in to his account'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='The users'' account profile information';

--
-- RELATIONS FOR TABLE `user_profiles`:
--

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` tinytext NOT NULL COMMENT 'The name for each zone element',
  `description` text COMMENT 'Optional description for each zone element'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Company-especific (geographical or logical) zones';

--
-- RELATIONS FOR TABLE `zones`:
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `procedures`
--
ALTER TABLE `procedures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recovering_passwords`
--
ALTER TABLE `recovering_passwords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_procedure_privileges`
--
ALTER TABLE `user_procedure_privileges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `zone_id` (`zone_id`),
  ADD KEY `procedure_id` (`procedure_id`),
  ADD KEY `privilege_id` (`privilege_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `procedures`
--
ALTER TABLE `procedures`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element';
--
-- AUTO_INCREMENT for table `recovering_passwords`
--
ALTER TABLE `recovering_passwords`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element';
--
-- AUTO_INCREMENT for table `user_procedure_privileges`
--
ALTER TABLE `user_procedure_privileges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element';
--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element';
--
-- AUTO_INCREMENT for table `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element';
--
-- Constraints for dumped tables
--

--
-- Constraints for table `recovering_passwords`
--
ALTER TABLE `recovering_passwords`
  ADD CONSTRAINT `recovering_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`);

--
-- Constraints for table `user_procedure_privileges`
--
ALTER TABLE `user_procedure_privileges`
  ADD CONSTRAINT `user_procedure_privileges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`),
  ADD CONSTRAINT `user_procedure_privileges_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`),
  ADD CONSTRAINT `user_procedure_privileges_ibfk_3` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`),
  ADD CONSTRAINT `user_procedure_privileges_ibfk_4` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
