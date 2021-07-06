-- CreateTable
CREATE TABLE "_MarketOrderSignitureBreads" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MarketOrderSignitureBreads_AB_unique" ON "_MarketOrderSignitureBreads"("A", "B");

-- CreateIndex
CREATE INDEX "_MarketOrderSignitureBreads_B_index" ON "_MarketOrderSignitureBreads"("B");

-- AddForeignKey
ALTER TABLE "_MarketOrderSignitureBreads" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarketOrderSignitureBreads" ADD FOREIGN KEY ("B") REFERENCES "MarketOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
