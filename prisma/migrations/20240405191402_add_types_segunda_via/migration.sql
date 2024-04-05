/*
  Warnings:

  - The values [SEGUNDA_VIA] on the enum `forwading_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `forwading` MODIFY `type` ENUM('INCLUSAO', 'ATUALIZACAO', 'ACESSO', 'ENCAMINHAMENTO', 'ACOMPANHAMENTO', 'SEGUNDA_VIA_NASCIMENTO', 'SEGUNDA_VIA_CASAMENTO', 'SEGUNDA_VIA_OBITO') NOT NULL DEFAULT 'ENCAMINHAMENTO';
