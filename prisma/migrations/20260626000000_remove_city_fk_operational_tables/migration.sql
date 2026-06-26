-- Arquitetura multi-tenant por banco: cada município tem sua própria database.
-- edcenso_city_fk como filtro de segurança é redundante — o banco já é o escopo.
-- address.edcenso_city_fk é mantido (dado geográfico real do logradouro).

-- user_identify
ALTER TABLE `user_identify`
  DROP FOREIGN KEY `user_identify_edcenso_city_fk_fkey`,
  DROP INDEX `user_identify_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- family
ALTER TABLE `family`
  DROP FOREIGN KEY `family_edcenso_city_fk_fkey`,
  DROP INDEX `family_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- vulnerability
ALTER TABLE `vulnerability`
  DROP FOREIGN KEY `vulnerability_edcenso_city_fk_fkey`,
  DROP INDEX `vulnerability_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- attendance
ALTER TABLE `attendance`
  DROP FOREIGN KEY `attendance_edcenso_city_fk_fkey`,
  DROP INDEX `attendance_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- user (nullable — sem DROP FOREIGN KEY, só DROP INDEX e coluna)
ALTER TABLE `user`
  DROP FOREIGN KEY `user_edcenso_city_fk_fkey`,
  DROP INDEX `user_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- family_benefits
ALTER TABLE `family_benefits`
  DROP FOREIGN KEY `family_benefits_edcenso_city_fk_fkey`,
  DROP INDEX `family_benefits_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- technician
ALTER TABLE `technician`
  DROP FOREIGN KEY `technician_edcenso_city_fk_fkey`,
  DROP INDEX `technician_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- task (nullable)
ALTER TABLE `task`
  DROP FOREIGN KEY `task_edcenso_city_fk_fkey`,
  DROP INDEX `task_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- benefits (nullable)
ALTER TABLE `benefits`
  DROP FOREIGN KEY `benefits_edcenso_city_fk_fkey`,
  DROP INDEX `benefits_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- attendance_unity
ALTER TABLE `attendance_unity`
  DROP FOREIGN KEY `attendance_unity_edcenso_city_fk_fkey`,
  DROP INDEX `attendance_unity_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- group_attendance
ALTER TABLE `group_attendance`
  DROP FOREIGN KEY `group_attendance_edcenso_city_fk_fkey`,
  DROP INDEX `group_attendance_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;

-- forwading (nullable)
ALTER TABLE `forwading`
  DROP FOREIGN KEY `forwading_edcenso_city_fk_fkey`,
  DROP INDEX `forwading_edcenso_city_fk_fkey`,
  DROP COLUMN `edcenso_city_fk`;
