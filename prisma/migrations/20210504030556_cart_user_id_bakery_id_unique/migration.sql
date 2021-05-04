/*
  Warnings:

  - A unique constraint covering the columns `[userId,bakeryId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart.userId_bakeryId_unique" ON "Cart"("userId", "bakeryId");
