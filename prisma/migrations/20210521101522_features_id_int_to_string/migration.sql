/*
  Warnings:

  - The primary key for the `BakeryFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BreadFeatures` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_BakeryToBakeryFeature" DROP CONSTRAINT "_BakeryToBakeryFeature_B_fkey";

-- DropForeignKey
ALTER TABLE "_BreadToBreadFeatures" DROP CONSTRAINT "_BreadToBreadFeatures_B_fkey";

-- AlterTable
ALTER TABLE "BakeryFeature" DROP CONSTRAINT "BakeryFeature_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_BakeryToBakeryFeature" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BreadFeatures" DROP CONSTRAINT "BreadFeatures_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_BreadToBreadFeatures" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_BakeryToBakeryFeature" ADD FOREIGN KEY ("B") REFERENCES "BakeryFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToBreadFeatures" ADD FOREIGN KEY ("B") REFERENCES "BreadFeatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
