-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `attendance_user_identify_fk_fkey`;

-- DropForeignKey
ALTER TABLE `benefits` DROP FOREIGN KEY `benefits_edcenso_city_fk_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `task_edcenso_city_fk_fkey`;

-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `forwading_fk` INTEGER NULL,
    MODIFY `user_identify_fk` INTEGER NULL;

-- AlterTable
ALTER TABLE `attendance_unity` ADD COLUMN `type` ENUM('CRAS', 'CREAS') NOT NULL DEFAULT 'CRAS',
    ADD COLUMN `unity_number` INTEGER NULL;

-- AlterTable
ALTER TABLE `benefits` ADD COLUMN `canDelete` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `edcenso_city_fk` INTEGER NULL;

-- AlterTable
ALTER TABLE `family` ADD COLUMN `condicionalities_fk` INTEGER NULL;

-- AlterTable
ALTER TABLE `family_benefits` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `situation` ENUM('ATIVO', 'BLOQUEADO', 'SUSPENSO') NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE `task` ADD COLUMN `canDelete` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isCollective` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `edcenso_city_fk` INTEGER NULL;

-- AlterTable
ALTER TABLE `user_identify` ADD COLUMN `bpc` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `vulnerability` ADD COLUMN `child_shelter_protection` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `child_work` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `psychoactive_substance_violence` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `socio_educational_measures` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `condicionalities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vaccination_schedule` BOOLEAN NOT NULL DEFAULT true,
    `nutritional_status` BOOLEAN NOT NULL DEFAULT true,
    `prenatal` BOOLEAN NOT NULL DEFAULT true,
    `school_frequency` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technician_visits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `technician_fk` INTEGER NOT NULL,
    `family_fk` INTEGER NOT NULL,
    `attendance_unity_fk` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forwarding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `family_fk` INTEGER NOT NULL,
    `isPAIF` BOOLEAN NOT NULL DEFAULT false,
    `isCREAS` BOOLEAN NOT NULL DEFAULT false,
    `isBPC` BOOLEAN NOT NULL DEFAULT false,
    `isPAEFI` BOOLEAN NOT NULL DEFAULT false,
    `cadUnico` BOOLEAN NOT NULL DEFAULT false,
    `cadUnicoType` INTEGER NULL,
    `datePAIF` DATETIME(3) NULL,
    `dateCREAS` DATETIME(3) NULL,
    `dateBPC` DATETIME(3) NULL,
    `datePAEFI` DATETIME(3) NULL,
    `dateCadUnico` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_identify_vulnerability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_identify_fk` INTEGER NOT NULL,
    `intrafamily_violence` BOOLEAN NOT NULL DEFAULT false,
    `drug_users` BOOLEAN NOT NULL DEFAULT false,
    `sexual_abuse` BOOLEAN NOT NULL DEFAULT false,
    `sexual_exploitation` BOOLEAN NOT NULL DEFAULT false,
    `victims_neglect_abandonment` BOOLEAN NOT NULL DEFAULT false,
    `child_work` BOOLEAN NOT NULL DEFAULT false,
    `human_trafficking` BOOLEAN NOT NULL DEFAULT false,
    `discrimination_sexual_orientation` BOOLEAN NOT NULL DEFAULT false,
    `migrants` BOOLEAN NOT NULL DEFAULT false,
    `street_situation` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edcenso_city_fk` INTEGER NOT NULL,
    `attendance_fk` INTEGER NOT NULL,
    `family_fk` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_condicionalities_fk_fkey` FOREIGN KEY (`condicionalities_fk`) REFERENCES `condicionalities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_user_identify_fk_fkey` FOREIGN KEY (`user_identify_fk`) REFERENCES `user_identify`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_forwading_fk_fkey` FOREIGN KEY (`forwading_fk`) REFERENCES `forwarding`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `benefits` ADD CONSTRAINT `benefits_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technician_visits` ADD CONSTRAINT `technician_visits_technician_fk_fkey` FOREIGN KEY (`technician_fk`) REFERENCES `technician`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technician_visits` ADD CONSTRAINT `technician_visits_attendance_unity_fk_fkey` FOREIGN KEY (`attendance_unity_fk`) REFERENCES `attendance_unity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technician_visits` ADD CONSTRAINT `technician_visits_family_fk_fkey` FOREIGN KEY (`family_fk`) REFERENCES `family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `forwarding` ADD CONSTRAINT `forwarding_family_fk_fkey` FOREIGN KEY (`family_fk`) REFERENCES `family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_identify_vulnerability` ADD CONSTRAINT `user_identify_vulnerability_user_identify_fk_fkey` FOREIGN KEY (`user_identify_fk`) REFERENCES `user_identify`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_attendance` ADD CONSTRAINT `group_attendance_edcenso_city_fk_fkey` FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_attendance` ADD CONSTRAINT `group_attendance_attendance_fk_fkey` FOREIGN KEY (`attendance_fk`) REFERENCES `attendance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_attendance` ADD CONSTRAINT `group_attendance_family_fk_fkey` FOREIGN KEY (`family_fk`) REFERENCES `family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
