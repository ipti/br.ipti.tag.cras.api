CREATE TABLE `user_attendance_unity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_fk` INT NOT NULL,
  `attendance_unity_fk` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uau_user_unity_unique` (`user_fk`, `attendance_unity_fk`),
  KEY `uau_attendance_unity_fk_idx` (`attendance_unity_fk`),
  CONSTRAINT `uau_user_fk` FOREIGN KEY (`user_fk`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `uau_unity_fk` FOREIGN KEY (`attendance_unity_fk`) REFERENCES `attendance_unity` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
