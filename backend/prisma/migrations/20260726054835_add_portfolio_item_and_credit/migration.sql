-- CreateEnum
CREATE TYPE "PortfolioOwnerType" AS ENUM ('FREELANCER', 'CULT');

-- CreateEnum
CREATE TYPE "PortfolioCreditStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImageUrl" TEXT,
    "mediaUrls" TEXT[],
    "tags" TEXT[],
    "projectDate" TIMESTAMP(3),
    "ownerType" "PortfolioOwnerType" NOT NULL,
    "ownerCreativeProfileId" TEXT,
    "ownerCultId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioItemCredit" (
    "id" TEXT NOT NULL,
    "role" TEXT,
    "status" "PortfolioCreditStatus" NOT NULL DEFAULT 'PENDING',
    "portfolioItemId" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioItemCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioItem_ownerCreativeProfileId_idx" ON "PortfolioItem"("ownerCreativeProfileId");

-- CreateIndex
CREATE INDEX "PortfolioItem_ownerCultId_idx" ON "PortfolioItem"("ownerCultId");

-- CreateIndex
CREATE INDEX "PortfolioItemCredit_creativeProfileId_idx" ON "PortfolioItemCredit"("creativeProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioItemCredit_portfolioItemId_creativeProfileId_key" ON "PortfolioItemCredit"("portfolioItemId", "creativeProfileId");

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_ownerCreativeProfileId_fkey" FOREIGN KEY ("ownerCreativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_ownerCultId_fkey" FOREIGN KEY ("ownerCultId") REFERENCES "Cult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItemCredit" ADD CONSTRAINT "PortfolioItemCredit_portfolioItemId_fkey" FOREIGN KEY ("portfolioItemId") REFERENCES "PortfolioItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItemCredit" ADD CONSTRAINT "PortfolioItemCredit_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- A portfolio item belongs to exactly one owner (a freelancer's profile, or
-- a cult) -- never both, never neither -- and ownerType must agree with
-- whichever FK is actually set.
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_single_owner_check" CHECK (
  (
    "ownerType" = 'FREELANCER'
    AND "ownerCreativeProfileId" IS NOT NULL
    AND "ownerCultId" IS NULL
  )
  OR
  (
    "ownerType" = 'CULT'
    AND "ownerCultId" IS NOT NULL
    AND "ownerCreativeProfileId" IS NULL
  )
);
