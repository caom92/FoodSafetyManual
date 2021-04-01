CREATE TABLE `crop_registry_form` (
  `id`(10) int UNSIGNED NOT NULL,
  `submitter_id` int(10) UNSIGNED NOT NULL,
  `zone_id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `crop`  tinytext DEFAULT NULL,
  `variety` tinytext DEFAULT NULL,
  `section` tinytext DEFAULT NULL,
  `block` tinytext DEFAULT NULL,
  `weight` int UNSIGNED DEFAULT NULL,
  `people` int UNSIGNED DEFAULT NULL,
  `hours` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `crop_registry_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submitter_id` (`submitter_id`),
  ADD KEY `zone_id` (`zone_id`);

ALTER TABLE `crop_registry_form`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `crop_registry_form`
  ADD CONSTRAINT `crop_registry_form_ibfk_1` FOREIGN KEY (`submitter_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `crop_registry_form_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`) ON UPDATE CASCADE;