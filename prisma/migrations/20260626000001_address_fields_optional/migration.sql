-- Drop FK constraints before making columns nullable
ALTER TABLE `address`
  DROP FOREIGN KEY `address_edcenso_city_fk_fkey`,
  DROP FOREIGN KEY `address_edcenso_uf_fk_fkey`;

-- Make all address fields nullable
ALTER TABLE `address`
  MODIFY `edcenso_city_fk` INT NULL,
  MODIFY `edcenso_uf_fk`   INT NULL,
  MODIFY `address`          VARCHAR(191) NULL,
  MODIFY `telephone`        VARCHAR(191) NULL,
  MODIFY `conditions`       VARCHAR(191) NULL,
  MODIFY `construction_type` VARCHAR(191) NULL,
  MODIFY `rooms`            INT NULL,
  MODIFY `rent_value`       INT NULL;

-- Re-add FK constraints (now nullable)
ALTER TABLE `address`
  ADD CONSTRAINT `address_edcenso_city_fk_fkey`
    FOREIGN KEY (`edcenso_city_fk`) REFERENCES `edcenso_city` (`id`)
    ON UPDATE RESTRICT,
  ADD CONSTRAINT `address_edcenso_uf_fk_fkey`
    FOREIGN KEY (`edcenso_uf_fk`) REFERENCES `edcenso_uf` (`id`)
    ON UPDATE RESTRICT;
