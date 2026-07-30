/*
  Warnings:

  - You are about to drop the column `rating` on the `CreativeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `CreativeProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreativeProfile" DROP COLUMN "rating",
DROP COLUMN "reviewCount";

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "reviewerUserId" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_creativeProfileId_idx" ON "Review"("creativeProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_reviewerUserId_creativeProfileId_key" ON "Review"("reviewerUserId", "creativeProfileId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
