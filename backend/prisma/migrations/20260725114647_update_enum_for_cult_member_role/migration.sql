/*
  Warnings:

  - The values [LEADER] on the enum `CultMemberRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CultMemberRole_new" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');
ALTER TABLE "public"."CultMembership" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "CultMembership" ALTER COLUMN "role" TYPE "CultMemberRole_new" USING ("role"::text::"CultMemberRole_new");
ALTER TYPE "CultMemberRole" RENAME TO "CultMemberRole_old";
ALTER TYPE "CultMemberRole_new" RENAME TO "CultMemberRole";
DROP TYPE "public"."CultMemberRole_old";
ALTER TABLE "CultMembership" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;
