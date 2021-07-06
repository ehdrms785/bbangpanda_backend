-- AlterTable
ALTER TABLE "BakeryFeature" ADD COLUMN     "marketId" INTEGER;

-- AlterTable
ALTER TABLE "Bread" ADD COLUMN     "marketId" INTEGER,
ALTER COLUMN "bakeryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CartBread" ADD COLUMN     "marketId" INTEGER,
ALTER COLUMN "bakeryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bakeryId" INTEGER,
ADD COLUMN     "marketId" INTEGER;

-- CreateTable
CREATE TABLE "Market" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "detailDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Users_dibsMarket" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Market.name_unique" ON "Market"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Market_ownerId_unique" ON "Market"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "_Users_dibsMarket_AB_unique" ON "_Users_dibsMarket"("A", "B");

-- CreateIndex
CREATE INDEX "_Users_dibsMarket_B_index" ON "_Users_dibsMarket"("B");

-- AddForeignKey
ALTER TABLE "Bread" ADD FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BakeryFeature" ADD FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_dibsMarket" ADD FOREIGN KEY ("A") REFERENCES "Market"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_dibsMarket" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
