-- CreateTable
CREATE TABLE `user_identify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vulnerability_fk` INTEGER NOT NULL,
    `family_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `folder` VARCHAR(191) NULL,
    `archive` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,
    `birthday` VARCHAR(191) NULL,
    `birth_certificate` INTEGER NULL,
    `nis` INTEGER NULL,
    `rg_number` VARCHAR(191) NULL,
    `rg_date_emission` VARCHAR(191) NULL,
    `uf_rg` VARCHAR(191) NULL,
    `emission_rg` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `is_deficiency` BOOLEAN NOT NULL,
    `deficiency` VARCHAR(191) NOT NULL,
    `mother` VARCHAR(191) NOT NULL,
    `father` VARCHAR(191) NOT NULL,
    `marital_status` VARCHAR(191) NOT NULL,
    `escolarity` VARCHAR(191) NOT NULL,
    `initial_date` VARCHAR(191) NOT NULL,
    `final_date` VARCHAR(191) NULL,
    `profission` VARCHAR(191) NULL,
    `income` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `family_representative_fk` INTEGER NOT NULL,
    `address_fk` INTEGER NOT NULL,
    `benefit_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `conditions` VARCHAR(191) NOT NULL,
    `construction_type` VARCHAR(191) NOT NULL,
    `rooms` VARCHAR(191) NOT NULL,
    `rent_value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vulnerability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `irregular_ocupation` BOOLEAN NOT NULL DEFAULT false,
    `alone_child` BOOLEAN NOT NULL DEFAULT false,
    `dependent_elderly` BOOLEAN NOT NULL DEFAULT false,
    `unemployed` BOOLEAN NOT NULL DEFAULT false,
    `deficient` BOOLEAN NOT NULL DEFAULT false,
    `low_income` BOOLEAN NOT NULL DEFAULT false,
    `others` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_identify_fk` INTEGER NOT NULL,
    `technician_fk` INTEGER NOT NULL,
    `solicitation` VARCHAR(191) NOT NULL,
    `providence` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SECRETARY', 'TECHNICIAN') NOT NULL DEFAULT 'TECHNICIAN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technician` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user_fk` INTEGER NOT NULL,

    UNIQUE INDEX `technician_user_fk_key`(`user_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendance_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `type` ENUM('PERIODICO', 'EVENTUAL') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_identify` ADD CONSTRAINT `user_identify_vulnerability_fk_fkey` FOREIGN KEY (`vulnerability_fk`) REFERENCES `vulnerability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_identify` ADD CONSTRAINT `user_identify_family_fk_fkey` FOREIGN KEY (`family_fk`) REFERENCES `family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_address_fk_fkey` FOREIGN KEY (`address_fk`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_benefit_fk_fkey` FOREIGN KEY (`benefit_fk`) REFERENCES `benefits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_user_identify_fk_fkey` FOREIGN KEY (`user_identify_fk`) REFERENCES `user_identify`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_technician_fk_fkey` FOREIGN KEY (`technician_fk`) REFERENCES `technician`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technician` ADD CONSTRAINT `technician_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_attendance_fk_fkey` FOREIGN KEY (`attendance_fk`) REFERENCES `attendance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
