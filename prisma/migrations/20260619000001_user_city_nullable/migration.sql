-- AlterTable: make edcenso_city_fk optional on user (required for ADMIN without city)
ALTER TABLE `user` MODIFY COLUMN `edcenso_city_fk` INT NULL;
