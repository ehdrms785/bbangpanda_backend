/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Bakery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Bakery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_bakeryId_fkey";

-- AlterTable
ALTER TABLE "Bakery" ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "detailDescription" TEXT;

-- AlterTable
ALTER TABLE "Bread" ADD COLUMN     "detailDescription" TEXT,
ADD COLUMN     "isSigniture" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "Store";

-- CreateIndex
CREATE UNIQUE INDEX "Bakery_ownerId_unique" ON "Bakery"("ownerId");

-- AddForeignKey
ALTER TABLE "Bakery" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bread" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
