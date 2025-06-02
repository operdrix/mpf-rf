/*
  Warnings:

  - You are about to drop the column `club` on the `Competitor` table. All the data in the column will be lost.
  - You are about to alter the column `category` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `ageCategory` on the `Performance` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `clubId` to the `Competitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Competitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Competitor` DROP COLUMN `club`,
    ADD COLUMN `clubId` INTEGER NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL;

-- AlterTable
ALTER TABLE `Event` MODIFY `category` ENUM('MALE', 'FEMALE', 'MIXED') NOT NULL;

-- AlterTable
ALTER TABLE `Performance` MODIFY `ageCategory` ENUM('B', 'M', 'C', 'J', 'S', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL;

-- CreateTable
CREATE TABLE `Club` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `license` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Club_license_key`(`license`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Competitor` ADD CONSTRAINT `Competitor_clubId_fkey` FOREIGN KEY (`clubId`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
