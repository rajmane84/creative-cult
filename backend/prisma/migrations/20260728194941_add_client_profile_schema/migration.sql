-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('SOLO', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('ADVERTISING_MARKETING', 'FASHION_APPAREL', 'FILM_TV_ENTERTAINMENT', 'MUSIC_AUDIO', 'GAMING', 'PUBLISHING_MEDIA', 'PHOTOGRAPHY_STUDIO', 'TECHNOLOGY_SOFTWARE', 'ECOMMERCE_RETAIL', 'REAL_ESTATE', 'HOSPITALITY_TRAVEL', 'FOOD_BEVERAGE', 'BEAUTY_COSMETICS', 'HEALTH_WELLNESS', 'SPORTS_FITNESS', 'EDUCATION', 'FINANCE_BANKING', 'NONPROFIT_NGO', 'ARCHITECTURE_INTERIOR_DESIGN', 'AUTOMOTIVE', 'EVENTS_WEDDINGS', 'OTHER');

-- CreateTable
CREATE TABLE "ClientProfile" (
    "id" TEXT NOT NULL,
    "clientType" "ClientType" NOT NULL DEFAULT 'INDIVIDUAL',
    "companyName" TEXT,
    "industry" "Industry",
    "companySize" "CompanySize",
    "foundedYear" TEXT,
    "bio" TEXT,
    "website" TEXT,
    "coverImage" TEXT,
    "location" TEXT,
    "phoneNumber" TEXT,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_userId_key" ON "ClientProfile"("userId");

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
