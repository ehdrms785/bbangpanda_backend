-- CreateTable
CREATE TABLE "DibsDrawerList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DibsDrawer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dibsDrawerListId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BreadToDibsDrawer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreadToDibsDrawer_AB_unique" ON "_BreadToDibsDrawer"("A", "B");

-- CreateIndex
CREATE INDEX "_BreadToDibsDrawer_B_index" ON "_BreadToDibsDrawer"("B");

-- AddForeignKey
ALTER TABLE "DibsDrawerList" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DibsDrawer" ADD FOREIGN KEY ("dibsDrawerListId") REFERENCES "DibsDrawerList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToDibsDrawer" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToDibsDrawer" ADD FOREIGN KEY ("B") REFERENCES "DibsDrawer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
