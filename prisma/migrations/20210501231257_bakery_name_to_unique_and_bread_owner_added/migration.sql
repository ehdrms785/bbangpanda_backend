/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Bakery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bread" ADD COLUMN     "ownerId" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Bakery.name_unique" ON "Bakery"("name");

-- AddForeignKey
ALTER TABLE "Bread" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
