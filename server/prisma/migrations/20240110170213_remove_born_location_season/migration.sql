/*
  Warnings:

  - You are about to drop the column `bornLocation` on the `PlayerOnSeason` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerOnSeason" (
    "playerId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "headshot" TEXT,
    "occupation" TEXT,
    "residenceLocation" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("playerId", "seasonId"),
    CONSTRAINT "PlayerOnSeason_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerOnSeason_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlayerOnSeason" ("createdAt", "headshot", "notes", "occupation", "playerId", "residenceLocation", "seasonId", "updatedAt") SELECT "createdAt", "headshot", "notes", "occupation", "playerId", "residenceLocation", "seasonId", "updatedAt" FROM "PlayerOnSeason";
DROP TABLE "PlayerOnSeason";
ALTER TABLE "new_PlayerOnSeason" RENAME TO "PlayerOnSeason";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
