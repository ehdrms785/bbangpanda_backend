/*
  Warnings:

  - You are about to drop the column `userId` on the `Bread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bread" DROP CONSTRAINT "Bread_userId_fkey";

-- AlterTable
ALTER TABLE "Bread" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bakeryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BreadToCart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreadToCart_AB_unique" ON "_BreadToCart"("A", "B");

-- CreateIndex
CREATE INDEX "_BreadToCart_B_index" ON "_BreadToCart"("B");

-- AddForeignKey
ALTER TABLE "Cart" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD FOREIGN KEY ("bakeryId") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToCart" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToCart" ADD FOREIGN KEY ("B") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
