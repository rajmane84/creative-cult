/*
  Warnings:

  - You are about to drop the column `role` on the `Waitlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inviteToken]` on the table `Waitlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinAs` to the `Waitlist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JoinAs" AS ENUM ('FREELANCER', 'COLLECTIVE', 'CLIENT');

-- AlterTable
ALTER TABLE "Waitlist" DROP COLUMN "role",
ADD COLUMN     "inviteToken" TEXT,
ADD COLUMN     "joinAs" "JoinAs" NOT NULL,
ADD COLUMN     "notifiedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_inviteToken_key" ON "Waitlist"("inviteToken");
