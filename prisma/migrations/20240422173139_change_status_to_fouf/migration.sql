/*
  Warnings:

  - You are about to drop the column `status` on the `forwading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `family_or_user_forwarding` ADD COLUMN `status` ENUM('PENDENTE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE `forwading` DROP COLUMN `status`;
