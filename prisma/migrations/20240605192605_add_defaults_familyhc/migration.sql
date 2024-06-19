-- AlterTable
ALTER TABLE `family_on_hc` MODIFY `water_supply_other` VARCHAR(191) NULL DEFAULT '',
    MODIFY `other_eletronics` VARCHAR(191) NULL DEFAULT '',
    MODIFY `other_transport` VARCHAR(191) NULL DEFAULT '',
    MODIFY `social_benefits_which` VARCHAR(191) NULL DEFAULT '',
    MODIFY `family_speaks_other_lang_which` VARCHAR(191) NULL DEFAULT '',
    MODIFY `family_head_ocupation` VARCHAR(191) NULL DEFAULT '',
    MODIFY `family_contribution_who` VARCHAR(191) NULL DEFAULT '',
    MODIFY `residents_0_3_number` INTEGER NULL DEFAULT 0,
    MODIFY `residents_4_6_number` INTEGER NULL DEFAULT 0,
    MODIFY `number_of_cats` INTEGER NULL DEFAULT 0,
    MODIFY `number_of_dogs` INTEGER NULL DEFAULT 0,
    MODIFY `number_of_birds` INTEGER NULL DEFAULT 0,
    MODIFY `other_animals` VARCHAR(191) NULL DEFAULT '',
    MODIFY `family_religion_other` VARCHAR(191) NULL DEFAULT '',
    MODIFY `expectation_pcf` VARCHAR(191) NULL DEFAULT '',
    MODIFY `family_esf_attendance_which` VARCHAR(191) NULL DEFAULT '',
    MODIFY `family_health_agent_visit_which` VARCHAR(191) NULL DEFAULT '';
