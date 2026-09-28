-- Change `nis` from INT to VARCHAR to support NIS numbers with leading zeros
-- and the full 11-digit length (some legacy/PIS-format values overflow INT).
ALTER TABLE `user_identify`
  MODIFY `nis` VARCHAR(191) NULL;
