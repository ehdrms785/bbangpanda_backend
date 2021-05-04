/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Bread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bread" DROP CONSTRAINT "Bread_ownerId_fkey";

-- AlterTable
ALTER TABLE "Bread" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "bakeryId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_Users_dibsBakery" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Users_dibsBread" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Users_dibsBakery_AB_unique" ON "_Users_dibsBakery"("A", "B");

-- CreateIndex
CREATE INDEX "_Users_dibsBakery_B_index" ON "_Users_dibsBakery"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Users_dibsBread_AB_unique" ON "_Users_dibsBread"("A", "B");

-- CreateIndex
CREATE INDEX "_Users_dibsBread_B_index" ON "_Users_dibsBread"("B");

-- AddForeignKey
ALTER TABLE "_Users_dibsBakery" ADD FOREIGN KEY ("A") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_dibsBakery" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_dibsBread" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_dibsBread" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
