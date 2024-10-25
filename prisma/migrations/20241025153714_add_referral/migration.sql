/*
  Warnings:

  - You are about to alter the column `startAt` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endAt` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `startAt` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endAt` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `startAt` TIMESTAMP NULL,
    MODIFY `endAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Game` MODIFY `startAt` TIMESTAMP NULL,
    MODIFY `endAt` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `UserReferral` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `OwnerId` INTEGER UNSIGNED NOT NULL,
    `FriendId` INTEGER UNSIGNED NOT NULL,
    `reward` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserReferral` ADD CONSTRAINT `UserReferral_OwnerId_fkey` FOREIGN KEY (`OwnerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReferral` ADD CONSTRAINT `UserReferral_FriendId_fkey` FOREIGN KEY (`FriendId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
