-- CreateEnum
CREATE TYPE "Discipline" AS ENUM ('FILM_VIDEO', 'VFX_3D', 'FASHION_STYLING', 'SOUND_AUDIO', 'DESIGN_BRAND', 'PHOTOGRAPHY', 'MOTION_GRAPHICS');

-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('HOURLY', 'DAILY', 'PROJECT', 'NEGOTIABLE');

-- AlterTable
ALTER TABLE "CreativeProfile" ADD COLUMN     "completedProjects" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "disciplines" "Discipline"[],
ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rateAmount" INTEGER,
ADD COLUMN     "rateType" "RateType",
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tools" TEXT[];

-- AlterTable
ALTER TABLE "PortfolioItem" ADD COLUMN     "category" TEXT;
