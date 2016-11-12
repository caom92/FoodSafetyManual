-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2016 at 07:21 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jfdcfsm`
--

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `program_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the program to which this element is associated',
  `name` varchar(64) NOT NULL COMMENT 'The name of the module'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='The modules in which of each program is divided';

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `program_id`, `name`) VALUES
(1, 1, 'Introduction'),
(2, 1, 'Preventive Maintenance and Mobile Maintenance Program'),
(3, 1, 'Personnel Hygiene'),
(4, 1, 'Facility Sanitation'),
(5, 1, 'Pest Control'),
(6, 1, 'Training Employee/Vendor and Visitor'),
(7, 1, 'Regulatory and Internal Audit'),
(8, 1, 'Trace Back and Recall Program'),
(9, 1, 'Requirements Program'),
(10, 1, 'Packing'),
(11, 1, 'Suppliers'),
(12, 1, 'Biosecurity'),
(13, 1, 'HACCP');

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE `privileges` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` varchar(5) NOT NULL COMMENT 'The name of the privilege'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='The user system privileges';

--
-- Dumping data for table `privileges`
--

INSERT INTO `privileges` (`id`, `name`) VALUES
(1, 'None'),
(2, 'Read'),
(3, 'Write');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` char(3) NOT NULL COMMENT 'The name for each procedure'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Company-especific certification program procedures';

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `name`) VALUES
(2, 'GAP'),
(1, 'GMP');

-- --------------------------------------------------------

--
-- Table structure for table `recovery_tokens`
--

CREATE TABLE `recovery_tokens` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the user to which the token is associated',
  `expiration_date` datetime NOT NULL COMMENT 'Timestamp for when the token was issued',
  `token` char(128) NOT NULL COMMENT 'The unique password recovery token'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Password recovery tokens requested by users';

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` varchar(13) NOT NULL COMMENT 'The name of the user role'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='The roles that users can have in the system';

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Administrator'),
(2, 'Director'),
(4, 'Employee'),
(3, 'Supervisor');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `is_active` tinyint(3) UNSIGNED NOT NULL COMMENT 'Flag that indicates if the user account can be used',
  `role_id` int(10) UNSIGNED NOT NULL COMMENT 'ID of the role for this user',
  `zone_id` int(10) UNSIGNED NOT NULL COMMENT 'The ID of the zone the user is associated to',
  `employee_num` int(10) UNSIGNED NOT NULL COMMENT 'The company-especific unique ID number for each user',
  `first_name` varchar(32) NOT NULL COMMENT 'The user''s first name(s)',
  `last_name` varchar(32) NOT NULL COMMENT 'The user''s last name(s)',
  `email` varchar(32) NOT NULL COMMENT 'The user''s (probably company-especific) e-mail for account administration',
  `login_name` varchar(16) NOT NULL COMMENT 'The user''s account nickname',
  `login_password` char(60) NOT NULL COMMENT 'The user''s password for logging in to his account'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='The users'' account profile information';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `is_active`, `role_id`, `zone_id`, `employee_num`, `first_name`, `last_name`, `email`, `login_name`, `login_password`) VALUES
(1, 1, 1, 1, 0, ' ', ' ', ' ', 'admin', '$2y$10$9GzcttktIMg9JFFXyMiIZOYLaiE2yRE5Ag/Xgn7Z98nsIpb4yNI5K');

-- --------------------------------------------------------

--
-- Table structure for table `users_modules_privileges`
--

CREATE TABLE `users_modules_privileges` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `module_id` int(10) UNSIGNED NOT NULL,
  `privilege_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier for each table element',
  `name` char(3) NOT NULL COMMENT 'The name for each zone element'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Company-especific (geographical or logical) zones';

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`id`, `name`) VALUES
(1, 'AVA'),
(2, 'BCN'),
(3, 'HMO'),
(4, 'HTO'),
(5, 'LAW'),
(6, 'MUL'),
(7, 'SGO'),
(8, 'SJD'),
(9, 'SLG'),
(10, 'SON'),
(11, 'SSF'),
(12, 'TEP'),
(13, 'TOR'),
(14, 'ZAR'),
(15, 'ZIH');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `recovery_tokens`
--
ALTER TABLE `recovery_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_num` (`employee_num`,`email`,`login_name`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `zone_id` (`zone_id`);

--
-- Indexes for table `users_modules_privileges`
--
ALTER TABLE `users_modules_privileges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `privilege_id` (`privilege_id`);

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `recovery_tokens`
--
ALTER TABLE `recovery_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element';
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users_modules_privileges`
--
ALTER TABLE `users_modules_privileges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier for each table element', AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_program_id` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recovery_tokens`
--
ALTER TABLE `recovery_tokens`
  ADD CONSTRAINT `recovery_tokens_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users_modules_privileges`
--
ALTER TABLE `users_modules_privileges`
  ADD CONSTRAINT `users_modules_privileges_module_id` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_modules_privileges_privilege_id` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_modules_privileges_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
