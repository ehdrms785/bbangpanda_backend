/*
  Warnings:

  - You are about to drop the `_BreadToDibsDrawer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BreadToDibsDrawer" DROP CONSTRAINT "_BreadToDibsDrawer_A_fkey";

-- DropForeignKey
ALTER TABLE "_BreadToDibsDrawer" DROP CONSTRAINT "_BreadToDibsDrawer_B_fkey";

-- DropTable
DROP TABLE "_BreadToDibsDrawer";

-- CreateTable
CREATE TABLE "_DibsDrawers_Bread_Relation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DibsDrawers_Bread_Relation_AB_unique" ON "_DibsDrawers_Bread_Relation"("A", "B");

-- CreateIndex
CREATE INDEX "_DibsDrawers_Bread_Relation_B_index" ON "_DibsDrawers_Bread_Relation"("B");

-- AddForeignKey
ALTER TABLE "_DibsDrawers_Bread_Relation" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DibsDrawers_Bread_Relation" ADD FOREIGN KEY ("B") REFERENCES "DibsDrawer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
