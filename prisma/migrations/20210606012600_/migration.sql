-- AlterTable
ALTER TABLE "Bread" ADD COLUMN     "breadLargeCategoryId" TEXT,
ADD COLUMN     "breadSmallCategoryId" TEXT;

-- CreateTable
CREATE TABLE "BreadLargeCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreadSmallCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bread" ADD FOREIGN KEY ("breadLargeCategoryId") REFERENCES "BreadLargeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bread" ADD FOREIGN KEY ("breadSmallCategoryId") REFERENCES "BreadSmallCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
