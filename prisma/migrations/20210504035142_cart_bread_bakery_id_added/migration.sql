/*
  Warnings:

  - Added the required column `bakeryId` to the `CartBread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartBread" ADD COLUMN     "bakeryId" INTEGER NOT NULL;
