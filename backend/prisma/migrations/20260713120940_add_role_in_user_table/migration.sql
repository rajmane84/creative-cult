-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'CREATIVE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role";
