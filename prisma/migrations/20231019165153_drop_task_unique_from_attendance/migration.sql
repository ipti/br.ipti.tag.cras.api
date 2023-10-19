-- Remove Unique Constraint From Attendance
ALTER TABLE `attendance`
ADD INDEX `attendance_task_fk_key` (`task_fk`),
DROP INDEX `attendance_task_fk_key`;