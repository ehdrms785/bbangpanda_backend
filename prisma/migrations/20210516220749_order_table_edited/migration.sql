/*
  Warnings:

  - You are about to drop the column `orderNumber` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the column `payAmount` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the column `shippingFee` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the column `orderStatus` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `OrderList` table. All the data in the column will be lost.
  - You are about to drop the `_BreadToOrderList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BreadToOrderList" DROP CONSTRAINT "_BreadToOrderList_A_fkey";

-- DropForeignKey
ALTER TABLE "_BreadToOrderList" DROP CONSTRAINT "_BreadToOrderList_B_fkey";

-- AlterTable
ALTER TABLE "OrderList" DROP COLUMN "orderNumber",
DROP COLUMN "payAmount",
DROP COLUMN "shippingFee",
DROP COLUMN "orderStatus",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "discountAmount",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "OrderList_id_seq";

-- DropTable
DROP TABLE "_BreadToOrderList";

-- CreateTable
CREATE TABLE "Order" (
    "orderNumber" INTEGER NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "shippingFee" INTEGER NOT NULL,
    "orderStatus" TEXT NOT NULL DEFAULT E'주문접수',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderListId" INTEGER,

    PRIMARY KEY ("orderNumber")
);

-- CreateTable
CREATE TABLE "_BreadToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreadToOrder_AB_unique" ON "_BreadToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BreadToOrder_B_index" ON "_BreadToOrder"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("orderListId") REFERENCES "OrderList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToOrder" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToOrder" ADD FOREIGN KEY ("B") REFERENCES "Order"("orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;
