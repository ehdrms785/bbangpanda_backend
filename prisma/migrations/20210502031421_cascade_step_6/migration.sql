/*
  Warnings:

  - Made the column `ownerId` on table `Bakery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bakeryId` on table `Bread` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `Bread` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bakery" ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Bread" ALTER COLUMN "bakeryId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;
