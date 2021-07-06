-- CreateTable
CREATE TABLE "MarketOrderFeature" (
    "id" TEXT NOT NULL,
    "filter" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MarketOrderToMarketOrderFeature" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MarketOrderToMarketOrderFeature_AB_unique" ON "_MarketOrderToMarketOrderFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_MarketOrderToMarketOrderFeature_B_index" ON "_MarketOrderToMarketOrderFeature"("B");

-- AddForeignKey
ALTER TABLE "_MarketOrderToMarketOrderFeature" ADD FOREIGN KEY ("A") REFERENCES "MarketOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarketOrderToMarketOrderFeature" ADD FOREIGN KEY ("B") REFERENCES "MarketOrderFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
