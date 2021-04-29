/*
  Warnings:

  - A unique constraint covering the columns `[test]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "test" TEXT NOT NULL DEFAULT E'hello';

-- CreateIndex
CREATE UNIQUE INDEX "User.test_unique" ON "User"("test");
