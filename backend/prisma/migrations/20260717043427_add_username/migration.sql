/*
  Warnings:

  - You are about to drop the column `category` on the `CreativeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `CreativeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `CreativeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `yearsExperience` on the `CreativeProfile` table. All the data in the column will be lost.
  - The `level` column on the `CreativeSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `company` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the `PortfolioItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[creativeProfileId,skillId]` on the table `CreativeSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `skillId` to the `CreativeSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'FREELANCE', 'SELF_EMPLOYED');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('HIGH_SCHOOL', 'DIPLOMA', 'BSC', 'BCA', 'BCOM', 'BA', 'BTECH', 'BE', 'BPHARM', 'LLB', 'MBBS', 'MSC', 'MCA', 'MCOM', 'MA', 'MTECH', 'ME', 'MBA', 'MPHARM', 'LLM', 'MD', 'PHD', 'OTHER');

-- DropForeignKey
ALTER TABLE "PortfolioItem" DROP CONSTRAINT "PortfolioItem_creativeProfileId_fkey";

-- AlterTable
ALTER TABLE "CreativeProfile" DROP COLUMN "category",
DROP COLUMN "currency",
DROP COLUMN "hourlyRate",
DROP COLUMN "yearsExperience";

-- AlterTable
ALTER TABLE "CreativeSkill" ADD COLUMN     "skillId" TEXT NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" "SkillLevel";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "company",
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "currentlyWorking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "PortfolioItem";

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "degree" "Degree" NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "yearOfGraduation" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CreativeSkill_creativeProfileId_skillId_key" ON "CreativeSkill"("creativeProfileId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "CreativeSkill" ADD CONSTRAINT "CreativeSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
