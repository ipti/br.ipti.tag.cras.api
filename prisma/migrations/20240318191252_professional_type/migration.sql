-- AlterTable
ALTER TABLE `technician` ADD COLUMN `professional_register` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('ASSISTENTE_SOCIAL', 'PSICOLOGO') NULL DEFAULT 'ASSISTENTE_SOCIAL';