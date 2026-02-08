/*
  Warnings:

  - You are about to alter the column `status` on the `ProjectStatusHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `step` to the `ProjectStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProjectStatusHistory` ADD COLUMN `step` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('active', 'done') NOT NULL;
