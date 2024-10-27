/*
  Warnings:

  - You are about to drop the column `Iteration` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referralToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[OwnerId,FriendId]` on the table `UserReferral` will be added. If there are existing duplicate values, this will fail.
  - Made the column `startAt` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endAt` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startAt` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endAt` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `referralToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `startAt` TIMESTAMP NOT NULL,
    MODIFY `endAt` TIMESTAMP NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Game` DROP COLUMN `Iteration`,
    ADD COLUMN `iteration` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    MODIFY `type` VARCHAR(128) NOT NULL,
    MODIFY `startAt` TIMESTAMP NOT NULL,
    MODIFY `endAt` TIMESTAMP NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `referralToken` VARCHAR(64) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserEvent` MODIFY `university` VARCHAR(255) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserGame` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserReferral` MODIFY `updatedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_referralToken_key` ON `User`(`referralToken`);

-- CreateIndex
CREATE UNIQUE INDEX `UserReferral_OwnerId_FriendId_key` ON `UserReferral`(`OwnerId`, `FriendId`);
