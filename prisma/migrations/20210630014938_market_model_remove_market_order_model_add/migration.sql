/*
  Warnings:

  - You are about to drop the column `marketId` on the `BakeryFeature` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Bread` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `CartBread` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Market` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Users_dibsMarket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BakeryFeature" DROP CONSTRAINT "BakeryFeature_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Bread" DROP CONSTRAINT "Bread_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_Users_dibsMarket" DROP CONSTRAINT "_Users_dibsMarket_A_fkey";

-- DropForeignKey
ALTER TABLE "_Users_dibsMarket" DROP CONSTRAINT "_Users_dibsMarket_B_fkey";

-- AlterTable
ALTER TABLE "Bakery" ADD COLUMN     "isMarket" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BakeryFeature" DROP COLUMN "marketId";

-- AlterTable
ALTER TABLE "Bread" DROP COLUMN "marketId";

-- AlterTable
ALTER TABLE "CartBread" DROP COLUMN "marketId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "marketId";

-- DropTable
DROP TABLE "Market";

-- DropTable
DROP TABLE "_Users_dibsMarket";

-- CreateTable
CREATE TABLE "MarketOrder" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT,
    "orderName" TEXT NOT NULL,
    "bakeryId" INTEGER,
    "orderStartDate" TIMESTAMP(3) NOT NULL,
    "orderEndDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BreadToMarketOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreadToMarketOrder_AB_unique" ON "_BreadToMarketOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BreadToMarketOrder_B_index" ON "_BreadToMarketOrder"("B");

-- AddForeignKey
ALTER TABLE "MarketOrder" ADD FOREIGN KEY ("bakeryId") REFERENCES "Bakery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToMarketOrder" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToMarketOrder" ADD FOREIGN KEY ("B") REFERENCES "MarketOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
