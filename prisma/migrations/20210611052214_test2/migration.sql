/*
  Warnings:

  - Made the column `bakeryId` on table `Bread` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bread" ALTER COLUMN "bakeryId" SET NOT NULL;
