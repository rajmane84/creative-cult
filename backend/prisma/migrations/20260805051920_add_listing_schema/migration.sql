-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'ACTIVE', 'CLOSED', 'FILLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('REMOTE', 'ON_SITE', 'HYBRID');

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'DRAFT',
    "locationType" "LocationType" NOT NULL DEFAULT 'REMOTE',
    "location" TEXT,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "rateType" "RateType",
    "discipline" "Discipline",
    "employmentType" "EmploymentType",
    "skills" TEXT[],
    "deadline" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "duration" TEXT,
    "clientProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Listing_clientProfileId_idx" ON "Listing"("clientProfileId");

-- CreateIndex
CREATE INDEX "Listing_status_idx" ON "Listing"("status");

-- CreateIndex
CREATE INDEX "Listing_discipline_idx" ON "Listing"("discipline");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "ClientProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
