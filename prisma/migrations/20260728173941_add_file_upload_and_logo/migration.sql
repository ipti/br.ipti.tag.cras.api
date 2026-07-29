-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_edcenso_city_fk_fkey`;

-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_edcenso_uf_fk_fkey`;

-- DropForeignKey
ALTER TABLE `user_attendance_unity` DROP FOREIGN KEY `uau_unity_fk`;

-- DropForeignKey
ALTER TABLE `user_attendance_unity` DROP FOREIGN KEY `uau_user_fk`;

-- AlterTable
ALTER TABLE `attendance_unity` ADD COLUMN `logo_fk` INTEGER NULL;

-- CreateTable
CREATE TABLE `file_upload` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blob_url` TEXT NOT NULL,
    `blob_name` VARCHAR(191) NOT NULL,
    `original_name` VARCHAR(191) NOT NULL,
    `mime_type` VARCHAR(191) NOT NULL,
    `size_bytes` INTEGER NOT NULL,
    `container` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `file_upload_blob_name_key`(`blob_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `attendance_unity_logo_fk_fkey` ON `attendance_unity`(`logo_fk`);

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_edcenso_uf_fk_fkey` FOREIGN KEY (`edcenso_uf_fk`) REFERENCES `edcenso_uf`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_attendance_unity` ADD CONSTRAINT `user_attendance_unity_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_attendance_unity` ADD CONSTRAINT `user_attendance_unity_attendance_unity_fk_fkey` FOREIGN KEY (`attendance_unity_fk`) REFERENCES `attendance_unity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_unity` ADD CONSTRAINT `attendance_unity_logo_fk_fkey` FOREIGN KEY (`logo_fk`) REFERENCES `file_upload`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `user_attendance_unity_user_fk_attendance_unity_fk_key` ON `user_attendance_unity`(`user_fk`, `attendance_unity_fk`);
DROP INDEX `uau_user_unity_unique` ON `user_attendance_unity`;
