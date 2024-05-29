/*
  Warnings:

  - A unique constraint covering the columns `[attendance_unity_fk]` on the table `family_on_hc` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendance_unity_fk` to the `family_on_hc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `family_on_hc` ADD COLUMN `attendance_unity_fk` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `family_on_hc_attendance_unity_fk_key` ON `family_on_hc`(`attendance_unity_fk`);

-- AddForeignKey
ALTER TABLE `family_on_hc` ADD CONSTRAINT `family_on_hc_attendance_unity_fk_fkey` FOREIGN KEY (`attendance_unity_fk`) REFERENCES `attendance_unity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
