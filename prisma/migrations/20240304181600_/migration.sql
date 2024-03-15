-- AlterTable
ALTER TABLE `user_identify` MODIFY `cpf` VARCHAR(191) NULL DEFAULT '00000000000',
    MODIFY `filiation_1` VARCHAR(191) NULL DEFAULT 'Não declarado',
    MODIFY `marital_status` VARCHAR(191) NULL DEFAULT 'Não informada';
