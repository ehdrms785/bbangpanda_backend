/*
  Warnings:

  - You are about to drop the `_BreadToCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BreadToCart" DROP CONSTRAINT "_BreadToCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_BreadToCart" DROP CONSTRAINT "_BreadToCart_B_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_bakeryId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropTable
DROP TABLE "_BreadToCart";

-- DropTable
DROP TABLE "Cart";

-- CreateTable
CREATE TABLE "CartBread" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "breadId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartBread" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartBread" ADD FOREIGN KEY ("breadId") REFERENCES "Bread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
