-- CreateEnum
CREATE TYPE "CultMemberRole" AS ENUM ('LEADER', 'MEMBER');

-- CreateEnum
CREATE TYPE "CultMembershipStatus" AS ENUM ('ACTIVE', 'LEFT', 'REMOVED');

-- CreateEnum
CREATE TYPE "CultInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'REVOKED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Cult" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultMembership" (
    "id" TEXT NOT NULL,
    "role" "CultMemberRole" NOT NULL DEFAULT 'MEMBER',
    "status" "CultMembershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "cultId" TEXT NOT NULL,
    "creativeProfileId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "CultMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultInvite" (
    "id" TEXT NOT NULL,
    "status" "CultInviteStatus" NOT NULL DEFAULT 'PENDING',
    "cultId" TEXT NOT NULL,
    "invitedByUserId" TEXT NOT NULL,
    "invitedProfileId" TEXT NOT NULL,
    "message" TEXT,
    "respondedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CultInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cult_slug_key" ON "Cult"("slug");

-- CreateIndex
CREATE INDEX "CultMembership_creativeProfileId_idx" ON "CultMembership"("creativeProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "CultMembership_cultId_creativeProfileId_key" ON "CultMembership"("cultId", "creativeProfileId");

-- CreateIndex
CREATE INDEX "CultInvite_invitedProfileId_idx" ON "CultInvite"("invitedProfileId");

-- CreateIndex
CREATE INDEX "CultInvite_cultId_idx" ON "CultInvite"("cultId");

-- AddForeignKey
ALTER TABLE "Cult" ADD CONSTRAINT "Cult_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultMembership" ADD CONSTRAINT "CultMembership_cultId_fkey" FOREIGN KEY ("cultId") REFERENCES "Cult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultMembership" ADD CONSTRAINT "CultMembership_creativeProfileId_fkey" FOREIGN KEY ("creativeProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultInvite" ADD CONSTRAINT "CultInvite_cultId_fkey" FOREIGN KEY ("cultId") REFERENCES "Cult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultInvite" ADD CONSTRAINT "CultInvite_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultInvite" ADD CONSTRAINT "CultInvite_invitedProfileId_fkey" FOREIGN KEY ("invitedProfileId") REFERENCES "CreativeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
