-- CreateTable
CREATE TABLE "OrderList" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "shippingFee" INTEGER NOT NULL,
    "orderStatus" TEXT NOT NULL DEFAULT E'주문접수',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BreadToOrderList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreadToOrderList_AB_unique" ON "_BreadToOrderList"("A", "B");

-- CreateIndex
CREATE INDEX "_BreadToOrderList_B_index" ON "_BreadToOrderList"("B");

-- AddForeignKey
ALTER TABLE "_BreadToOrderList" ADD FOREIGN KEY ("A") REFERENCES "Bread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreadToOrderList" ADD FOREIGN KEY ("B") REFERENCES "OrderList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
