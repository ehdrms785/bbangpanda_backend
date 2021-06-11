/*
  Warnings:

  - Added the required column `largeCategoryId` to the `BreadSmallCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BreadSmallCategory" ADD COLUMN     "largeCategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BreadSmallCategory" ADD FOREIGN KEY ("largeCategoryId") REFERENCES "BreadLargeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
