/*
  Warnings:

  - You are about to drop the `AllianceEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TribeEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Tribe" ADD COLUMN "color" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AllianceEvent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TribeEvent";
PRAGMA foreign_keys=on;
