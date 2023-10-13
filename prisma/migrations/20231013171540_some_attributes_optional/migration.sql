-- AlterTable
ALTER TABLE `address` MODIFY `reference` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user_identify` MODIFY `surname` VARCHAR(191) NULL,
    MODIFY `deficiency` VARCHAR(191) NULL;
