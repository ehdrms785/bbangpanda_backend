-- CreateTable
CREATE TABLE "_Users_dibsMarketOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Users_dibsMarketOrder_AB_unique" ON "_Users_dibsMarketOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_Users_dibsMarketOrder_B_index" ON "_Users_dibsMarketOrder"("B");

-- AddForeignKey
ALTER TABLE "_Users_dibsMarketOrder" ADD FOREIGN KEY ("A") REFERENCES "MarketOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_dibsMarketOrder" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
