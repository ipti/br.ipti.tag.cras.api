-- AlterTable
ALTER TABLE `forwading` ADD COLUMN `edcenso_city_fk` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `forwading` ADD CONSTRAINT `forwading_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
