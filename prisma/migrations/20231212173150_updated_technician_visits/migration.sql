/*
  Warnings:

  - A unique constraint covering the columns `[attendance_fk]` on the table `technician_visits` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `technician_visits` ADD COLUMN `attendance_fk` INTEGER NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `technician_visits_attendance_fk_key` ON `technician_visits`(`attendance_fk`);

-- AddForeignKey
ALTER TABLE `technician_visits` ADD CONSTRAINT `technician_visits_attendance_fk_fkey` FOREIGN KEY (`attendance_fk`) REFERENCES `attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
