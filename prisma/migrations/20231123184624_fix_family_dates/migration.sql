-- AlterTable
ALTER TABLE `family` ADD COLUMN `datePAEFI` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `datePAIF` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
