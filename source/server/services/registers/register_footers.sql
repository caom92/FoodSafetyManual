CREATE TABLE `register_footers` (
  `id` int(10) UNSIGNED NOT NULL,
  `zone_id` int(10) UNSIGNED NOT NULL,
  `register_id` int(10) UNSIGNED NOT NULL,
  `footer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `register_footers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zone_id` (`zone_id`),
  ADD KEY `register_id` (`register_id`);

ALTER TABLE `register_footers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `register_footers`
  ADD CONSTRAINT `register_footers_ibfk_1` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `register_footers_ibfk_2` FOREIGN KEY (`register_id`) REFERENCES `registers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
