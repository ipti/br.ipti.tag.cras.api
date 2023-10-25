-- CreateTable
CREATE TABLE `user_identify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `family_fk` INTEGER NULL,
    `edcenso_city_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NULL,
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
    `deficiency` VARCHAR(191) NULL,
    `filiation_1` VARCHAR(191) NOT NULL,
    `filiation_2` VARCHAR(191) NULL,
    `marital_status` VARCHAR(191) NOT NULL,
    `escolarity` VARCHAR(191) NOT NULL,
    `initial_date` VARCHAR(191) NOT NULL,
    `final_date` VARCHAR(191) NULL,
    `profission` VARCHAR(191) NULL,
    `signed_portfolio` BOOLEAN NULL,
    `nuclear_family` VARCHAR(191) NULL,
    `income` INTEGER NOT NULL DEFAULT 0,
    `kinship` ENUM('RESPONSAVEL', 'CONJUGE', 'FILHO_A', 'ENTEADO_A', 'NETO_A', 'PAI', 'MAE', 'SOGRO_A', 'IRMAO_A', 'GENRO', 'NORA', 'OUTRO', 'NAO_PARENTE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `family_representative_fk` INTEGER NOT NULL,
    `address_fk` INTEGER NOT NULL,
    `attendance_unity_fk` INTEGER NOT NULL,
    `vulnerability_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_uf_fk` INTEGER NOT NULL,
    `edcenso_city_fk` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NULL,
    `conditions` VARCHAR(191) NOT NULL,
    `construction_type` VARCHAR(191) NOT NULL,
    `rooms` INTEGER NOT NULL,
    `rent_value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vulnerability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
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
    `edcenso_city_fk` INTEGER NOT NULL,
    `user_identify_fk` INTEGER NOT NULL,
    `technician_fk` INTEGER NOT NULL,
    `task_fk` INTEGER NOT NULL,
    `attendance_unity_fk` INTEGER NOT NULL,
    `solicitation` VARCHAR(191) NOT NULL,
    `providence` VARCHAR(191) NOT NULL,
    `result` ENUM('FINALIZADO', 'PENDENTE') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SECRETARY', 'TECHNICIAN', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family_benefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `family_fk` INTEGER NOT NULL,
    `benefits_fk` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technician` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `user_fk` INTEGER NULL,

    UNIQUE INDEX `technician_user_fk_key`(`user_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('PERIODICO', 'EVENTUAL') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `edcenso_uf` (
    `id` INTEGER NOT NULL,
    `acronym` VARCHAR(2) NOT NULL,
    `name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `edcenso_city` (
    `id` INTEGER NOT NULL,
    `edcenso_uf_fk` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `cep_initial` VARCHAR(9) NULL,
    `cep_final` VARCHAR(9) NULL,
    `ddd1` SMALLINT NULL,
    `ddd2` SMALLINT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `edcenso_uf_fk`(`edcenso_uf_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_unity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address_fk` INTEGER NOT NULL,

    UNIQUE INDEX `attendance_unity_address_fk_key`(`address_fk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_identify` ADD CONSTRAINT `user_identify_family_fk_fkey` FOREIGN KEY (`family_fk`) REFERENCES `family`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_identify` ADD CONSTRAINT `user_identify_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_address_fk_fkey` FOREIGN KEY (`address_fk`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_attendance_unity_fk_fkey` FOREIGN KEY (`attendance_unity_fk`) REFERENCES `attendance_unity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_vulnerability_fk_fkey` FOREIGN KEY (`vulnerability_fk`) REFERENCES `vulnerability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_edcenso_uf_fk_fkey` FOREIGN KEY (`edcenso_uf_fk`) REFERENCES `edcenso_uf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vulnerability` ADD CONSTRAINT `vulnerability_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_user_identify_fk_fkey` FOREIGN KEY (`user_identify_fk`) REFERENCES `user_identify`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_technician_fk_fkey` FOREIGN KEY (`technician_fk`) REFERENCES `technician`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_task_fk_fkey` FOREIGN KEY (`task_fk`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_attendance_unity_fk_fkey` FOREIGN KEY (`attendance_unity_fk`) REFERENCES `attendance_unity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_benefits` ADD CONSTRAINT `family_benefits_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_benefits` ADD CONSTRAINT `family_benefits_family_fk_fkey` FOREIGN KEY (`family_fk`) REFERENCES `family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_benefits` ADD CONSTRAINT `family_benefits_benefits_fk_fkey` FOREIGN KEY (`benefits_fk`) REFERENCES `benefits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technician` ADD CONSTRAINT `technician_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technician` ADD CONSTRAINT `technician_user_fk_fkey` FOREIGN KEY (`user_fk`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `benefits` ADD CONSTRAINT `benefits_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `edcenso_city` ADD CONSTRAINT `edcenso_city_fk` FOREIGN KEY (`edcenso_uf_fk`) REFERENCES `edcenso_uf`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `attendance_unity` ADD CONSTRAINT `attendance_unity_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_unity` ADD CONSTRAINT `attendance_unity_address_fk_fkey` FOREIGN KEY (`address_fk`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
