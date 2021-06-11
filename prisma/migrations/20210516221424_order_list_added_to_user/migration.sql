-- AlterTable
ALTER TABLE "OrderList" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "OrderList" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
