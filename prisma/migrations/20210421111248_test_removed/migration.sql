/*
  Warnings:

  - You are about to drop the column `test` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User.test_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "test";
