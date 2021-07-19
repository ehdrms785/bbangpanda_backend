-- CreateTable
CREATE TABLE "_BakeryToBreadLargeCategory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BakeryToBreadSmallCategory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BakeryToBreadLargeCategory_AB_unique" ON "_BakeryToBreadLargeCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BakeryToBreadLargeCategory_B_index" ON "_BakeryToBreadLargeCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BakeryToBreadSmallCategory_AB_unique" ON "_BakeryToBreadSmallCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BakeryToBreadSmallCategory_B_index" ON "_BakeryToBreadSmallCategory"("B");

-- AddForeignKey
ALTER TABLE "_BakeryToBreadLargeCategory" ADD FOREIGN KEY ("A") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BakeryToBreadLargeCategory" ADD FOREIGN KEY ("B") REFERENCES "BreadLargeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BakeryToBreadSmallCategory" ADD FOREIGN KEY ("A") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BakeryToBreadSmallCategory" ADD FOREIGN KEY ("B") REFERENCES "BreadSmallCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
