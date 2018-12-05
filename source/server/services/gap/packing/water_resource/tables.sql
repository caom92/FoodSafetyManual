-- Areas table

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `gap_packing_water_resource_areas` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'The unique identifier number for each table item',
  `position` int(10) UNSIGNED NOT NULL,
  `zone_id` int(10) UNSIGNED NOT NULL COMMENT 'The identifier of the zone which this area belongs to',
  `name` tinytext NOT NULL COMMENT 'The name of the area'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `gap_packing_water_resource_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zone_id` (`zone_id`);

ALTER TABLE `gap_packing_water_resource_areas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The unique identifier number for each table item', AUTO_INCREMENT=1;

ALTER TABLE `gap_packing_water_resource_areas`
  ADD CONSTRAINT `areas_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`) ON UPDATE CASCADE;
COMMIT;

-- Items table

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `gap_packing_water_resource_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `area_id` int(10) UNSIGNED NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `position` int(10) UNSIGNED NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `gap_packing_water_resource_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `area_id` (`area_id`);

ALTER TABLE `gap_packing_water_resource_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `gap_packing_water_resource_items`
  ADD CONSTRAINT `gap_packing_water_resource_items_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `gap_packing_water_resource_areas` (`id`) ON UPDATE CASCADE;
COMMIT;

-- Logs table

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `gap_packing_water_resource_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `capture_date_id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED NOT NULL,
  `date` date,
  `is_compliant` tinyint(1),
  `corrective_actions` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `gap_packing_water_resource_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `capture_date_id` (`capture_date_id`),
  ADD KEY `item_id` (`item_id`);

ALTER TABLE `gap_packing_water_resource_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `gap_packing_water_resource_logs`
  ADD CONSTRAINT `gap_packing_water_resource_logs_ibfk_1` FOREIGN KEY (`capture_date_id`) REFERENCES `captured_logs` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `gap_packing_water_resource_logs_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `gap_packing_water_resource_items` (`id`) ON UPDATE CASCADE;
COMMIT;
