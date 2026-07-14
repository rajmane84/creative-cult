-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'NOT_AVAILABLE');

-- CreateTable
CREATE TABLE "CreativeProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "headline" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "category" TEXT,
    "yearsExperience" INTEGER,
    "hourlyRate" DECIMAL(10,2),
    "currency" TEXT DEFAULT 'USD',
    "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreativeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreativeSkill" (
    "id" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT,

    CONSTRAINT "CreativeSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "id" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "mediaUrl" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreativeProfile_userId_key" ON "CreativeProfile"("userId");

-- AddForeignKey
ALTER TABLE "CreativeProfile" ADD CONSTRAINT "CreativeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreativeSkill" ADD CONSTRAINT "CreativeSkill_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
