/*
  Warnings:

  - Made the column `shortName` on table `Club` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Club` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Club` MODIFY `shortName` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL;
