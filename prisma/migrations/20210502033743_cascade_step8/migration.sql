-- AlterTable
ALTER TABLE "Bakery" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Bread" ALTER COLUMN "bakeryId" DROP NOT NULL;
