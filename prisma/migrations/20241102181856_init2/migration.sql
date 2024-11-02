/*
  Warnings:

  - You are about to alter the column `startAt` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endAt` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `startAt` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endAt` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `startAt` TIMESTAMP NOT NULL,
    MODIFY `endAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Game` MODIFY `startAt` TIMESTAMP NOT NULL,
    MODIFY `endAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `GamePrizePool` MODIFY `winningResult` DOUBLE NULL,
    MODIFY `diff` DOUBLE NULL,
    MODIFY `secondToken` INTEGER UNSIGNED NULL;
