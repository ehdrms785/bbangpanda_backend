-- AlterTable
CREATE SEQUENCE "orderlist_id_seq";
ALTER TABLE "OrderList" ALTER COLUMN "id" SET DEFAULT nextval('orderlist_id_seq');
ALTER SEQUENCE "orderlist_id_seq" OWNED BY "OrderList"."id";

-- CreateTable
CREATE TABLE "BakeryFeature" (
    "id" INTEGER NOT NULL,
    "filter" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreadFeatures" (
    "id" INTEGER NOT NULL,
    "filter" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BreadToBreadFeatures" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BakeryToBakeryFeature" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreadToBreadFeatures_AB_unique" ON "_BreadToBreadFeatures"("A", "B");

-- CreateIndex
CREATE INDEX "_BreadToBreadFeatures_B_index" ON "_BreadToBreadFeatures"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BakeryToBakeryFeature_AB_unique" ON "_BakeryToBakeryFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_BakeryToBakeryFeature_B_index" ON "_BakeryToBakeryFeature"("B");

-- AddForeignKey
ALTER TABLE "_BreadToBreadFeatures" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToBreadFeatures" ADD FOREIGN KEY ("B") REFERENCES "BreadFeatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BakeryToBakeryFeature" ADD FOREIGN KEY ("A") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BakeryToBakeryFeature" ADD FOREIGN KEY ("B") REFERENCES "BakeryFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
